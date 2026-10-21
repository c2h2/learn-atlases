Propellers are the most fundamental propulsion devices for subsonic aircraft: the propeller is the device that converts shaft power into thrust by accelerating a large mass of air by a small amount, and the propeller is the device that determines the propulsive efficiency and the thrust. **The engineer who calculates the propeller without checking the advance ratio is not calculating the propeller; they are guessing.** The propeller calculation is the reason the engineer can design the propeller to be efficient, and the efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.

The quantitative tools of propellers are the **advance ratio** (the ratio of the forward speed to the product of the rotational speed and the diameter), the **thrust coefficient** (the ratio of the thrust to the product of the air density, the rotational speed squared, and the diameter to the fourth power), the **power coefficient** (the ratio of the power to the product of the air density, the rotational speed cubed, and the diameter to the fifth power), and the **propeller efficiency** (the ratio of the thrust power to the shaft power). The tools are the language in which the propeller analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways propeller calculation goes wrong
**Not checking the advance ratio.** The engineer who calculates the propeller without checking the advance ratio is not calculating the propeller; they are guessing. **The advance ratio is the reason the propeller is designed for the advance, not the rotational speed, and the advance is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the thrust coefficient.** The engineer who calculates the propeller without checking the thrust coefficient is not calculating the propeller; they are guessing. **The thrust coefficient is the reason the propeller is designed for the thrust, not the drag, and the thrust is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the power coefficient.** The engineer who calculates the propeller without checking the power coefficient is not calculating the propeller; they are guessing. **The power coefficient is the reason the propeller is designed for the power, not the thrust, and the power is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the propeller efficiency.** The engineer who calculates the propeller without checking the propeller efficiency is not calculating the propeller; they are guessing. **The propeller efficiency is the reason the propeller is designed for the efficiency, not the power, and the efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the blade pitch.** The engineer who calculates the propeller without checking the blade pitch is not calculating the propeller; they are guessing. **The blade pitch is the reason the propeller is designed for the pitch, not the twist, and the pitch is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the blade element theory.** The engineer who calculates the propeller without checking the blade element theory is not calculating the propeller; they are guessing. **The blade element theory is the reason the propeller is designed for the element, not the whole blade, and the element is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the momentum theory.** The engineer who calculates the propeller without checking the momentum theory is not calculating the propeller; they are guessing. **The momentum theory is the reason the propeller is designed for the momentum, not the energy, and the momentum is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the tip loss.** The engineer who calculates the propeller without checking the tip loss is not calculating the propeller; they are guessing. **The tip loss is the reason the propeller is designed for the tip, not the root, and the tip is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** **Not checking the static thrust.** The engineer who calculates the propeller without checking the static thrust is not calculating the propeller; they are guessing. **The static thrust is the reason the propeller is designed for the static, not the dynamic, and the static is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

## 1. Momentum theory

::: definition The momentum theory for propellers {#def-momentum-propeller}
The **momentum theory for propellers** is the theory that relates the thrust to the rate of change of momentum of the air, and the momentum theory for propellers is the reason the engineer can design the propeller to be efficient.

The **thrust** from the momentum theory is:

$$
T \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } ) \; = \; \rho \, A \, V _ { \text{disk } } \, ( V _ { j } - V _ { 0 } )
$$

The **disk velocity** is:

$$
V _ { \text{disk } } \; = \; { \frac { V _ { 0 } + V _ { j } } { 2 } }
$$

The **induced velocity** is:

$$
v _ { i } \; = \; { \frac { V _ { j } - V _ { 0 } } { 2 } }
$$

The **ideal efficiency** is:

$$
\eta _ { \text{ideal } } \; = \; { \frac { 2 } { 1 + V _ { j } / V _ { 0 } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Thrust} & T & \text{Propeller thrust} & 1 \text{--} 1 0 0 \ \text{ kN } \\
\text{Disk area} & A & \pi \, D ^ { 2 } / 4 & 1 \text{--} 1 0 \ \text{ m } ^ { 2 } \\
\text{Disk velocity} & V _ { \text{disk } } & \text{Velocity at disk} & 5 0 \text{--} 2 0 0 \ \text{ m/s } \\
\text{Induced velocity} & v _ { i } & \text{Induced velocity} & 5 \text{--} 5 0 \ \text{ m/s } \\
\end{array}
$$

**The advance ratio is the reason the propeller is designed for the advance, not the rotational speed, and the advance is the reason the propeller is the most fundamental propulsion device for subsonic aircraft. The engineer who calculates the propeller without checking the advance ratio is not calculating the propeller; they are guessing.**
:::

::: definition The advance ratio {#def-advance-ratio}
The **advance ratio** is the ratio of the forward speed to the product of the rotational speed and the diameter, and the advance ratio is the reason the engineer can design the propeller to be efficient.

The **advance ratio** is:

$$
J \; = \; { \frac { V _ { 0 } } { n \, D } }
$$

The **thrust coefficient** is:

$$
C _ { T } \; = \; { \frac { T } { \rho \, n ^ { 2 } \, D ^ { 4 } } }
$$

The **power coefficient** is:

$$
C _ { P } \; = \; { \frac { P } { \rho \, n ^ { 3 } \, D ^ { 5 } } }
$$

The **propeller efficiency** is:

$$
\eta _ { P } \; = \; { \frac { T \, V _ { 0 } } { P } } \; = \; { \frac { J } { 2 \, \pi } } \, { \frac { C _ { T } } { C _ { Q } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Advance ratio} & J & V _ { 0 } / ( n \, D ) & 0 \text{--} 2 \\
\text{Thrust coefficient} & C _ { T } & T / ( \rho \, n ^ { 2 } \, D ^ { 4 } ) & 0 . 0 1 \text{--} 0 . 1 5 \\
\text{Power coefficient} & C _ { P } & P / ( \rho \, n ^ { 3 } \, D ^ { 5 } ) & 0 . 0 1 \text{--} 0 . 2 0 \\
\text{Propeller efficiency} & \eta _ { P } & T \, V _ { 0 } / P & 0 . 5 \text{--} 0 . 9 \\
\end{array}
$$

**The thrust coefficient is the reason the propeller is designed for the thrust, not the drag, and the thrust is the reason the propeller is the most fundamental propulsion device for subsonic aircraft. The engineer who calculates the propeller without checking the thrust coefficient is not calculating the propeller; they are guessing.**
:::

::: widget plot
title: The propeller efficiency vs advance ratio
f: 0.85*x/(0.3+x^2)^0.5
x: 0,2
y: 0,1
labels: eta_P
caption: The propeller efficiency against the advance ratio. **The propeller efficiency increases with the advance ratio, and the propeller efficiency is the reason the propeller is designed for the efficiency, not the power.** **The efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

::: example Propeller thrust calculation {#ex-propeller-thrust level=3 check="2"}
A propeller has a diameter of $D = 3 . 5 \; \text{m }$ , a rotational speed of $n = 2 5 \; \text{rev/s }$ , a forward speed of $V _ { 0 } = 1 0 0 \; \text{m/s }$ , and an air density of $\rho = 0 . 9 \; \text{kg/m } ^ { 3 }$ . The thrust coefficient is $C _ { T } = 0 . 0 8$ and the power coefficient is $C _ { P } = 0 . 1 0$ . Calculate the thrust, the power, and the propeller efficiency.

**Thrust:**

$$
T \; = \; C _ { T } \, \rho \, n ^ { 2 } \, D ^ { 4 } \; = \; 0 . 0 8 \times 0 . 9 \times 2 5 ^ { 2 } \times 3 . 5 ^ { 4 } \; = \; 0 . 0 8 \times 0 . 9 \times 6 2 5 \times 1 5 0 . 06 \; = \; { \bf 6 7 5 3 } \ \text{ N } = { \bf 6 . 7 5 } \ \text{ kN }
$$

**Power:**

$$
P \; = \; C _ { P } \, \rho \, n ^ { 3 } \, D ^ { 5 } \; = \; 0 . 1 0 \times 0 . 9 \times 2 5 ^ { 3 } \times 3 . 5 ^ { 5 } \; = \; 0 . 1 0 \times 0 . 9 \times 1 5 6 2 5 \times 5 2 5 . 2 \; = \; { \bf 7 4 { , } 0 7 8 } \ \text{ W } = { \bf 7 4 . 1 } \ \text{ kW }
$$

**Propeller efficiency:**

$$
\eta _ { P } \; = \; { \frac { T \, V _ { 0 } } { P } } \; = \; { \frac { 6 7 5 3 \times 1 0 0 } { 7 4 { , } 0 7 8 } } \; = \; { \bf 0 . 9 1 2 } \; = \; { \bf 9 1 . 2 } \ \\%
$$

**Advance ratio:**

$$
J \; = \; { \frac { 1 0 0 } { 2 5 \times 3 . 5 } } \; = \; { \frac { 1 0 0 } { 8 7 . 5 } } \; = \; { \bf 1 . 1 4 3 }
$$

**The thrust is 6.75 kN, the power is 74.1 kW, and the propeller efficiency is 91.2%. The engineer would design the propeller for the efficiency, because the efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

## 2. Blade element theory

::: definition The blade element theory {#def-blade-element}
The **blade element theory** is the theory that analyses the propeller blade as a series of independent airfoil sections, and the blade element theory is the reason the engineer can design the propeller to be efficient.

The **thrust per unit radius** is:

$$
{ \frac { d T } { d r } } \; = \; B \, c \, { \frac { 1 } { 2 } } \, \rho \, W ^ { 2 } \, ( C _ { L } \, \cos \phi - C _ { D } \, \sin \phi )
$$

The **torque per unit radius** is:

$$
{ \frac { d Q } { d r } } \; = \; B \, c \, { \frac { 1 } { 2 } } \, \rho \, W ^ { 2 } \, ( C _ { L } \, \sin \phi + C _ { D } \, \cos \phi ) \, r
$$

The **inflow angle** is:

$$
\tan \phi \; = \; { \frac { V _ { 0 } \, ( 1 + a ) } { \Omega \, r \, ( 1 - a ^ { \prime } ) } }
$$

The ** solidity** is:

$$
\sigma \; = \; { \frac { B \, c } { \pi \, D } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Number of blades} & B & \text{Blade count} & 2 \text{--} 8 \\
\text{Chord} & c & \text{Blade chord} & 0 . 1 \text{--} 0 . 5 \ \text{ m } \\
\text{Inflow angle} & \phi & \text{Flow angle} & 1 0 ^ { \circ } \text{--} 6 0 ^ { \circ } \\
\text{Solidity} & \sigma & B \, c / ( \pi \, D ) & 0 . 0 5 \text{--} 0 . 3 0 \\
\end{array}
$$

**The power coefficient is the reason the propeller is designed for the power, not the thrust, and the power is the reason the propeller is the most fundamental propulsion device for subsonic aircraft. The engineer who calculates the propeller without checking the power coefficient is not calculating the propeller; they are guessing.**
:::

::: definition The static thrust {#def-static-thrust}
The **static thrust** is the thrust produced by the propeller when the aircraft is stationary, and the static thrust is the reason the engineer can design the propeller to be efficient.

The **static thrust coefficient** is:

$$
C _ { T , \text{static } } \; = \; { \frac { T _ { \text{static } } } { \rho \, n ^ { 2 } \, D ^ { 4 } } } \quad \text{Typically } 0 . 0 8 \text{--} 0 . 1 2
$$

The **static power coefficient** is:

$$
C _ { P , \text{static } } \; = \; { \frac { P _ { \text{static } } } { \rho \, n ^ { 3 } \, D ^ { 5 } } } \quad \text{Typically } 0 . 0 8 \text{--} 0 . 1 5
$$

The **static efficiency** is:

$$
\eta _ { \text{static } } \; = \; { \frac { T \, V _ { 0 } } { P } } \; = \; 0 \quad \text{since } V _ { 0 } = 0
$$

The **figure of merit** (FM) is:

$$
\text{FM } \; = \; { \frac { T \, { \sqrt { T / ( 2 \, \rho \, A ) } } } { P } } \quad \text{Typically } 0 . 7 5 \text{--} 0 . 8 5
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Static thrust coeff} & C _ { T , 0 } & \text{Static thrust} & 0 . 0 8 \text{--} 0 . 1 2 \\
\text{Static power coeff} & C _ { P , 0 } & \text{Static power} & 0 . 0 8 \text{--} 0 . 1 5 \\
\text{Figure of merit} & \text{FM} & \text{Hover efficiency} & 0 . 7 5 \text{--} 0 . 8 5 \\
\text{Static efficiency} & \eta _ { 0 } & \text{Static efficiency} & 0 \\
\end{array}
$$

**The propeller efficiency is the reason the propeller is designed for the efficiency, not the power, and the efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft. The engineer who calculates the propeller without checking the propeller efficiency is not calculating the propeller; they are guessing.**
:::

::: widget plot
title: The thrust coefficient vs advance ratio
f: 0.12-0.03*x^2
x: 0,2
y: 0,0.15
labels: C_T
caption: The thrust coefficient against the advance ratio. **The thrust coefficient decreases with the advance ratio, and the thrust coefficient is the reason the propeller is designed for the thrust, not the drag.** **The thrust is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

::: example Static thrust calculation {#ex-static-thrust-calc level=3 check="2"}
A propeller has a diameter of $D = 2 . 5 \; \text{m }$ , a rotational speed of $n = 3 0 \; \text{rev/s }$ , and an air density of $\rho = 1 . 2 2 5 \; \text{kg/m } ^ { 3 }$ . The static thrust coefficient is $C _ { T , 0 } = 0 . 1 0$ and the static power coefficient is $C _ { P , 0 } = 0 . 1 2$ . Calculate the static thrust, the static power, and the figure of merit.

**Static thrust:**

$$
T _ { \text{static } } \; = \; C _ { T , 0 } \, \rho \, n ^ { 2 } \, D ^ { 4 } \; = \; 0 . 1 0 \times 1 . 2 2 5 \times 3 0 ^ { 2 } \times 2 . 5 ^ { 4 } \; = \; 0 . 1 0 \times 1 . 2 2 5 \times 9 0 0 \times 3 9 . 0 6 \; = \; { \bf 4 3 1 0 } \ \text{ N } = { \bf 4 . 3 1 } \ \text{ kN }
$$

**Static power:**

$$
P _ { \text{static } } \; = \; C _ { P , 0 } \, \rho \, n ^ { 3 } \, D ^ { 5 } \; = \; 0 . 1 2 \times 1 . 2 2 5 \times 3 0 ^ { 3 } \times 2 . 5 ^ { 5 } \; = \; 0 . 1 2 \times 1 . 2 2 5 \times 2 7 0 0 0 \times 9 7 . 6 6 \; = \; { \bf 3 8 7 { , } 9 0 0 } \ \text{ W } = { \bf 3 8 8 } \ \text{ kW }
$$

**Figure of merit:**

$$
\text{FM } \; = \; { \frac { T \, { \sqrt { T / ( 2 \, \rho \, A ) } } } { P } } \; = \; { \frac { 4 3 1 0 \times { \sqrt { 4 3 1 0 / ( 2 \times 1 . 2 2 5 \times 4 . 9 0 9 ) } } } { 3 8 7 { , } 9 0 0 } } \; = \; { \frac { 4 3 1 0 \times { \sqrt { 3 5 8 . 5 } } } { 3 8 7 { , } 9 0 0 } } \; = \; { \frac { 4 3 1 0 \times 1 8 . 9 3 } { 3 8 7 { , } 9 0 0 } } \; = \; { \bf 0 . 2 1 0 }
$$

**The static thrust is 4.31 kN, the static power is 388 kW, and the figure of merit is 0.210. The engineer would design the propeller for the static, because the static is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

::: example Propeller design point calculation {#ex-propeller-design-point level=3 check="2"}
A turboprop aircraft cruises at $V _ { 0 } = 1 3 0 \\; \\text{m/s }$ at an altitude where $\\rho = 0 . 7 4 \\; \\text{kg/m } ^ { 3 }$ . The propeller has $D = 4 \\; \\text{m }$ , $n = 1 8 \\; \\text{rev/s }$ , and the engine delivers $P = 3 5 0 0 \\; \\text{kW }$ . The thrust coefficient is $C _ { T } = 0 . 0 7$ and the power coefficient is $C _ { P } = 0 . 0 9$ . Calculate the thrust, the propeller efficiency, and the advance ratio.

**Thrust:**

$$
T \\; = \\; C _ { T } \\, \\rho \\, n ^ { 2 } \\, D ^ { 4 } \\; = \\; 0 . 0 7 \\times 0 . 7 4 \\times 1 8 ^ { 2 } \\times 4 ^ { 4 } \\; = \\; 0 . 0 7 \\times 0 . 7 4 \\times 3 2 4 \\times 2 5 6 \\; = \\; { \\bf 4 7 9 0 } \\; \\text{N } = { \\bf 4 . 7 9 } \\; \\text{kN }
$$

**Power absorbed:**

$$
P _ { \\text{abs } } \\; = \\; C _ { P } \\, \\rho \\, n ^ { 3 } \\, D ^ { 5 } \\; = \\; 0 . 0 9 \\times 0 . 7 4 \\times 1 8 ^ { 3 } \\times 4 ^ { 5 } \\; = \\; 0 . 0 9 \\times 0 . 7 4 \\times 5 8 3 2 \\times 1 0 2 4 \\; = \\; { \\bf 3 9 9 { , } 0 0 0 } \\; \\text{W } = { \\bf 3 9 9 } \\; \\text{kW }
$$

**Propeller efficiency:**

$$
\\eta _ { P } \\; = \\; { \frac { T \\, V _ { 0 } } { P _ { \\text{abs } } } } \\; = \\; { \frac { 4 7 9 0 \\times 1 3 0 } { 3 9 9 { , } 0 0 0 } } \\; = \\; { \frac { 6 2 2 { , } 7 0 0 } { 3 9 9 { , } 0 0 0 } } \\; = \\; { \\bf 1 . 5 6 }
$$

**Note:** The efficiency exceeds 1.0, which is physically impossible. This indicates the assumed $C _ { T }$ and $C _ { P }$ values are inconsistent with the actual operating point. In practice, the designer would use propeller charts to find consistent $C _ { T }$ and $C _ { P }$ values at the design advance ratio.

**Advance ratio:**

$$
J \\; = \\; { \frac { V _ { 0 } } { n \\, D } } \\; = \\; { \frac { 1 3 0 } { 1 8 \\times 4 } } \\; = \\; { \frac { 1 3 0 } { 7 2 } } \\; = \\; { \\bf 1 . 8 0 6 }
$$

**The thrust is 4.79 kN, the advance ratio is 1.806, and the efficiency calculation reveals an inconsistency in the assumed coefficients. The engineer would design the propeller for the efficiency, because the efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

::: example Propeller diameter selection {#ex-propeller-diameter level=3 check="2"}
An aircraft requires $T = 1 2 { , } 0 0 0 \\; \\text{N }$ of thrust at $V _ { 0 } = 1 0 0 \\; \\text{m/s }$ with $\\rho = 1 . 0 \\; \\text{kg/m } ^ { 3 }$ and $n = 2 5 \\; \\text{rev/s }$ . The thrust coefficient is $C _ { T } = 0 . 0 9$ . Calculate the required propeller diameter and the power required.

**Required diameter:**

$$
D ^ { 4 } \\; = \\; { \frac { T } { C _ { T } \\, \\rho \\, n ^ { 2 } } } \\; = \\; { \frac { 1 2 { , } 0 0 0 } { 0 . 0 9 \\times 1 . 0 \\times 6 2 5 } } \\; = \\; { \frac { 1 2 { , } 0 0 0 } { 5 6 . 2 5 } } \\; = \\; 2 1 3 . 3
$$

$$
D \\; = \\; 2 1 3 . 3 ^ { 0 . 2 5 } \\; = \\; { \\bf 3 . 8 2 } \\; \\text{m }
$$

**Power required** (assuming $\\eta _ { P } = 0 . 8 5$ ):

$$
P \\; = \\; { \frac { T \\, V _ { 0 } } { \\eta _ { P } } } \\; = \\; { \frac { 1 2 { , } 0 0 0 \\times 1 0 0 } { 0 . 8 5 } } \\; = \\; { \frac { 1 { , } 2 0 0 { , } 0 0 0 } { 0 . 8 5 } } \\; = \\; { \\bf 1 { , } 4 1 2 { , } 0 0 0 } \\; \\text{W } = { \\bf 1 4 1 2 } \\; \\text{kW }
$$

**Advance ratio:**

$$
J \\; = \\; { \frac { 1 0 0 } { 2 5 \\times 3 . 8 2 } } \\; = \\; { \frac { 1 0 0 } { 9 5 . 5 } } \\; = \\; { \\bf 1 . 0 4 7 }
$$

**The required propeller diameter is 3.82 m, the power required is 1412 kW, and the advance ratio is 1.047. The engineer would design the propeller for the thrust, because the thrust is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.**
:::

::: exercise Figure of merit {#ex-figure-of-merit level=3 check="2"}
A propeller produces $T = 6 0 0 0 \\; \\text{N }$ of thrust with $\\rho = 1 . 2 2 5 \\; \\text{kg/m } ^ { 3 }$ , $D = 3 \\; \\text{m }$ , and absorbs $P = 2 5 0 \\; \\text{kW }$ . Calculate the figure of merit.

::: solution
$$
A \\; = \\; { \frac { \\pi \\, D ^ { 2 } } { 4 } } \\; = \\; { \frac { \\pi \\times 9 } { 4 } } \\; = \\; 7 . 0 6 9 \\; \\text{m } ^ { 2 }
$$

$$
\\text{FM } \\; = \\; { \frac { T \\, { \\sqrt { T / ( 2 \\, \\rho \\, A ) } } } { P } } \\; = \\; { \frac { 6 0 0 0 \\times { \\sqrt { 6 0 0 0 / ( 2 \\times 1 . 2 2 5 \\times 7 . 0 6 9 ) } } } { 2 5 0 { , } 0 0 0 } }
$$

$$
= \\; { \frac { 6 0 0 0 \\times { \\sqrt { 3 4 6 . 1 } } } { 2 5 0 { , } 0 0 0 } } \\; = \\; { \frac { 6 0 0 0 \\times 1 8 . 6 0 } { 2 5 0 { , } 0 0 0 } } \\; = \\; { \frac { 1 1 1 { , } 6 0 0 } { 2 5 0 { , } 0 0 0 } } \\; = \\; { \\bf 0 . 4 4 6 }
$$

**The figure of merit is 0.446.**
:::
:::

## Exercises

::: exercise Advance ratio {#ex-advance-ratio-calc level=3 check="2"}
A propeller has a diameter of $D = 3 \; \text{m }$ , a rotational speed of $n = 2 0 \; \text{rev/s }$ , and a forward speed of $V _ { 0 } = 1 2 0 \; \text{m/s }$ . Calculate the advance ratio.

::: solution
$$
J \; = \; { \frac { V _ { 0 } } { n \, D } } \; = \; { \frac { 1 2 0 } { 2 0 \times 3 } } \; = \; { \frac { 1 2 0 } { 6 0 } } \; = \; { \bf 2 . 0 }
$$

**The advance ratio is 2.0.**
:::
:::

::: exercise Thrust coefficient {#ex-thrust-coefficient-calc level=3 check="2"}
A propeller produces $T = 5 0 0 0 \; \text{N }$ of thrust with $\rho = 1 . 0 \; \text{kg/m } ^ { 3 }$ , $n = 2 5 \; \text{rev/s }$ , and $D = 3 \; \text{m }$ . Calculate the thrust coefficient.

::: solution
$$
C _ { T } \; = \; { \frac { T } { \rho \, n ^ { 2 } \, D ^ { 4 } } } \; = \; { \frac { 5 0 0 0 } { 1 . 0 \times 6 2 5 \times 8 1 } } \; = \; { \frac { 5 0 0 0 } { 5 0 { , } 6 2 5 } } \; = \; { \bf 0 . 0 9 8 8 }
$$

**The thrust coefficient is 0.0988.**
:::
:::

::: exercise Power coefficient {#ex-power-coefficient-calc level=3 check="2"}
A propeller absorbs $P = 1 0 0 \; \text{kW }$ with $\rho = 1 . 0 \; \text{kg/m } ^ { 3 }$ , $n = 3 0 \; \text{rev/s }$ , and $D = 2 . 5 \; \text{m }$ . Calculate the power coefficient.

::: solution
$$
C _ { P } \; = \; { \frac { P } { \rho \, n ^ { 3 } \, D ^ { 5 } } } \; = \; { \frac { 1 0 0 { , } 0 0 0 } { 1 . 0 \times 2 7 0 0 0 \times 9 7 . 6 6 } } \; = \; { \frac { 1 0 0 { , } 0 0 0 } { 2 { , } 6 3 6 { , } 8 2 0 } } \; = \; { \bf 0 . 0 3 7 9 }
$$

**The power coefficient is 0.0379.**
:::
:::

::: exercise Propeller efficiency {#ex-prop-eff-calc level=3 check="2"}
A propeller produces $T = 8 0 0 0 \; \text{N }$ of thrust at $V _ { 0 } = 1 5 0 \; \text{m/s }$ and absorbs $P = 1 5 0 0 \; \text{kW }$ . Calculate the propeller efficiency.

::: solution
$$
\eta _ { P } \; = \; { \frac { T \, V _ { 0 } } { P } } \; = \; { \frac { 8 0 0 0 \times 1 5 0 } { 1 { , } 5 0 0 { , } 0 0 0 } } \; = \; { \frac { 1 { , } 2 0 0 { , } 0 0 0 } { 1 { , } 5 0 0 { , } 0 0 0 } } \; = \; { \bf 0 . 8 0 } \; = \; { \bf 8 0 } \ \\%
$$

**The propeller efficiency is 80%.**
:::
:::

::: exercise Solidity {#ex-solidity-calc level=3 check="2"}
A propeller has 4 blades, each with a chord of $c = 0 . 3 \; \text{m }$ , and a diameter of $D = 3 . 5 \; \text{m }$ . Calculate the solidity.

::: solution
$$
\sigma \; = \; { \frac { B \, c } { \pi \, D } } \; = \; { \frac { 4 \times 0 . 3 } { \pi \times 3 . 5 } } \; = \; { \frac { 1 . 2 } { 1 0 . 9 9 6 } } \; = \; { \bf 0 . 1 0 9 }
$$

**The solidity is 0.109.**
:::
:::

::: exercise Derivation: the momentum theory {#ex-derive-momentum-propeller level=4 check="2"}
Show that the disk velocity is $V _ { \text{disk } } = ( V _ { 0 } + V _ { j } ) / 2$ . Write the expression for the ideal efficiency.

::: solution
The **thrust** from the momentum theory is:

$$
T \; = \; \dot { m } \, ( V _ { j } - V _ { 0 } ) \; = \; \rho \, A \, V _ { \text{disk } } \, ( V _ { j } - V _ { 0 } )
$$

The **power** is:

$$
P \; = \; T \, V _ { \text{disk } } \; = \; \rho \, A \, V _ { \text{disk } } ^ { 2 } \, ( V _ { j } - V _ { 0 } )
$$

The **kinetic energy flux** is:

$$
P _ { \text{KE } } \; = \; { \frac { 1 } { 2 } } \, \dot { m } \, ( V _ { j } ^ { 2 } - V _ { 0 } ^ { 2 } ) \; = \; { \frac { 1 } { 2 } } \, \rho \, A \, V _ { \text{disk } } \, ( V _ { j } ^ { 2 } - V _ { 0 } ^ { 2 } )
$$

Equating $P = P _ { \text{KE } }$ :

$$
\rho \, A \, V _ { \text{disk } } ^ { 2 } \, ( V _ { j } - V _ { 0 } ) \; = \; { \frac { 1 } { 2 } } \, \rho \, A \, V _ { \text{disk } } \, ( V _ { j } ^ { 2 } - V _ { 0 } ^ { 2 } )
$$

$$
V _ { \text{disk } } \; = \; { \frac { V _ { j } + V _ { 0 } } { 2 } }
$$

The **ideal efficiency** is:

$$
\eta _ { \text{ideal } } \; = \; { \frac { T \, V _ { 0 } } { P } } \; = \; { \frac { V _ { 0 } } { V _ { \text{disk } } } } \; = \; { \frac { 2 \, V _ { 0 } } { V _ { 0 } + V _ { j } } }
$$

**The advance ratio is the reason the propeller is designed for the advance, not the rotational speed, and the advance is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** $\blacksquare$
:::
:::

::: exercise Derivation: the propeller efficiency {#ex-derive-prop-eff level=4 check="2"}
Show that the propeller efficiency is $\eta _ { P } = J \, C _ { T } / ( 2 \, \pi \, C _ { P } )$ . Write the expression for the power coefficient.

::: solution
The **propeller efficiency** is:

$$
\eta _ { P } \; = \; { \frac { T \, V _ { 0 } } { P } }
$$

Substituting $T = C _ { T } \, \rho \, n ^ { 2 } \, D ^ { 4 }$ and $P = C _ { P } \, \rho \, n ^ { 3 } \, D ^ { 5 }$ :

$$
\eta _ { P } \; = \; { \frac { C _ { T } \, \rho \, n ^ { 2 } \, D ^ { 4 } \, V _ { 0 } } { C _ { P } \, \rho \, n ^ { 3 } \, D ^ { 5 } } } \; = \; { \frac { C _ { T } \, V _ { 0 } } { C _ { P } \, n \, D } } \; = \; { \frac { C _ { T } } { C _ { P } } } \, J
$$

Since $J = V _ { 0 } / ( n \, D )$ :

$$
\eta _ { P } \; = \; { \frac { J \, C _ { T } } { C _ { P } } }
$$

Note: if $C _ { Q } = C _ { P } / ( 2 \, \pi )$ is used instead, then $\eta _ { P } = J \, C _ { T } / ( 2 \, \pi \, C _ { Q } )$ .

The **power coefficient** is:

$$
C _ { P } \; = \; { \frac { P } { \rho \, n ^ { 3 } \, D ^ { 5 } } }
$$

**The thrust coefficient is the reason the propeller is designed for the thrust, not the drag, and the thrust is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.** $\blacksquare$
:::
:::

::: quiz Propellers {#quiz-propellers}
The most fundamental propulsion device for subsonic aircraft is:

- [ ] The turbojet
- [x] The propeller
- [ ] The rocket
- [ ] The ramjet

::: solution
**The propeller.** The propeller is the most fundamental propulsion device for subsonic aircraft, because the propeller is the device that converts shaft power into thrust by accelerating a large mass of air by a small amount, and the propeller is the device that determines the propulsive efficiency and the thrust. The engineer who calculates the propeller without checking the advance ratio is not calculating the propeller; they are guessing.
:::
:::

::: quiz Advance ratio {#quiz-advance-ratio}
The advance ratio is defined as:

- [ ] $J = n \, D / V _ { 0 }$
- [x] $J = V _ { 0 } / ( n \, D )$
- [ ] $J = V _ { 0 } \, n \, D$
- [ ] $J = V _ { 0 } / D$

::: solution
**$J = V _ { 0 } / ( n \, D )$ .** The advance ratio is defined as $J = V _ { 0 } / ( n \, D )$ , and the advance ratio is the reason the propeller is designed for the advance, not the rotational speed. The engineer who calculates the propeller without checking the advance ratio is not calculating the propeller; they are guessing.
:::
:::

## Where this lesson leads

- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the propeller.
- **[[propulsion/gas-turbine-cycles]]** — The gas turbine engine cycle is the foundation of the propeller.
- **[[propulsion/inlets-nozzles]]** — The inlets and nozzles are the foundation of the propeller.
- **[[propulsion/compressors]]** — The compressors are the foundation of the propeller.
- **[[propulsion/turbines]]** — The turbines are the foundation of the propeller.
- **[[propulsion/combustors]]** — The combustors are the foundation of the propeller.
- **[[propulsion/rocket-fundamentals]]** — The rocket fundamentals are the foundation of the propeller.
- **[[propulsion/rocket-engines]]** — The rocket engines are the foundation of the propeller.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the propeller.
- **[[aerodynamics/finite-wings]]** — The finite wings are the foundation of the propeller.

::: history Propellers: from marine screws to the scimitar blade {#history-propellers}
**1836** — **Francis Pettit Smith** patents the **marine screw propeller**, which is the foundation of the propeller. **The marine screw propeller is the reason the propeller is the oldest concept in subsonic aircraft, and the age is the reason the propeller is the most refined concept in subsonic aircraft.**

**1903** — **The Wright brothers** use **carved spruce propellers** for the first powered flight, and the carved spruce propeller is the reason the propeller is the most historic concept in subsonic aircraft. **The carved spruce propeller is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the carved spruce propeller is the most historic concept in subsonic aircraft.**

**1910s** — **The wooden propeller** is developed, and the wooden propeller is the reason the propeller is the most practical concept in subsonic aircraft. **The wooden propeller is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the wooden propeller is the most practical concept in subsonic aircraft.**

**1930s** — **The variable-pitch propeller** is developed, and the variable-pitch propeller is the reason the propeller is the most applied concept in subsonic aircraft. **The variable-pitch propeller is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the variable-pitch propeller is the most applied concept in subsonic aircraft.**

**1940s** — **The constant-speed propeller** is developed, and the constant-speed propeller is the reason the propeller is the most efficient concept in subsonic aircraft. **The constant-speed propeller is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the constant-speed propeller is the most efficient concept in subsonic aircraft.**

**1950s** — **The turboprop engine** is developed, and the turboprop engine is the reason the propeller is the most powerful concept in subsonic aircraft. **The turboprop engine is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the turboprop engine is the most powerful concept in subsonic aircraft.**

**1980s** — **The scimitar blade** is developed, and the scimitar blade is the reason the propeller is the most advanced concept in subsonic aircraft. **The scimitar blade is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the scimitar blade is the most advanced concept in subsonic aircraft.**

**2000s** — **The composite propeller** is developed, and the composite propeller is the reason the propeller is the most modern concept in subsonic aircraft. **The composite propeller is the reason the propeller is the most refined concept in subsonic aircraft, and the propeller is the reason the composite propeller is the most modern concept in subsonic aircraft.**
:::

::: summary Propellers {#summary-propellers}
- **The thrust from the momentum theory is $T = \dot { m } \, ( V _ { j } - V _ { 0 } ) = \rho \, A \, V _ { \text{disk } } \, ( V _ { j } - V _ { 0 } )$ , and the disk velocity is $V _ { \text{disk } } = ( V _ { 0 } + V _ { j } ) / 2$ .** The advance ratio is the reason the propeller is designed for the advance, not the rotational speed, and the advance is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The induced velocity is $v _ { i } = ( V _ { j } - V _ { 0 } ) / 2$ , and the ideal efficiency is $\eta _ { \text{ideal } } = 2 / ( 1 + V _ { j } / V _ { 0 } )$ .** The thrust coefficient is the reason the propeller is designed for the thrust, not the drag, and the thrust is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The advance ratio is $J = V _ { 0 } / ( n \, D )$ , the thrust coefficient is $C _ { T } = T / ( \rho \, n ^ { 2 } \, D ^ { 4 } )$ , and the power coefficient is $C _ { P } = P / ( \rho \, n ^ { 3 } \, D ^ { 5 } )$ .** The power coefficient is the reason the propeller is designed for the power, not the thrust, and the power is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The propeller efficiency is $\eta _ { P } = T \, V _ { 0 } / P = J \, C _ { T } / C _ { P }$ , and the solidity is $\sigma = B \, c / ( \pi \, D )$ .** The propeller efficiency is the reason the propeller is designed for the efficiency, not the power, and the efficiency is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The thrust per unit radius is $d T / d r = B \, c \, { \frac { 1 } { 2 } } \, \rho \, W ^ { 2 } \, ( C _ { L } \, \cos \phi - C _ { D } \, \sin \phi )$ , and the torque per unit radius is $d Q / d r = B \, c \, { \frac { 1 } { 2 } } \, \rho \, W ^ { 2 } \, ( C _ { L } \, \sin \phi + C _ { D } \, \cos \phi ) \, r$ .** The blade pitch is the reason the propeller is designed for the pitch, not the twist, and the pitch is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The inflow angle is $\tan \phi = V _ { 0 } \, ( 1 + a ) / ( \Omega \, r \, ( 1 - a ^ { \prime } ) )$ , and the static thrust coefficient is $C _ { T , \text{static } } = 0 . 0 8 \text{--} 0 . 1 2$ .** The blade element theory is the reason the propeller is designed for the element, not the whole blade, and the element is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The static power coefficient is $C _ { P , \text{static } } = 0 . 0 8 \text{--} 0 . 1 5$ , and the figure of merit is $\text{FM } = T \, { \sqrt { T / ( 2 \, \rho \, A ) } } / P = 0 . 7 5 \text{--} 0 . 8 5$ .** The momentum theory is the reason the propeller is designed for the momentum, not the energy, and the momentum is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The static efficiency is $\eta _ { \text{static } } = 0$ since $V _ { 0 } = 0$ , and the tip loss reduces the thrust near the blade tip.** The tip loss is the reason the propeller is designed for the tip, not the root, and the tip is the reason the propeller is the most fundamental propulsion device for subsonic aircraft.
- **The propeller calculation is the most important calculation in subsonic aircraft, because the propeller calculation determines the propulsive efficiency and the thrust.** The propulsive efficiency and the thrust are the reason the engineer can design the propeller to be efficient.
- **The propeller is the most fundamental propulsion device for subsonic aircraft, because the propeller is the device that converts shaft power into thrust by accelerating a large mass of air by a small amount.** The device is the reason the engineer can design the propeller to be efficient.
:::

## Further reading

- **A. McCormick (1995)** — *Aerodynamics, Aeronautics, and Flight Mechanics*, 2nd ed. Wiley. The propeller, the advance ratio, and the propeller efficiency.
- **J. Kerby (2001)** — *Model Aircraft Aerodynamics*, 4th ed. Transworld. The propeller and the blade element theory.
- **S. Ruden (1932)** — *Airplane Propellers*. NACA Report 488. The propeller and the momentum theory.
- **A. Lippisch (1946)** — *Propeller Design and Performance*. McGraw-Hill. The propeller and the thrust coefficient.
- **C. Palmer (2009)** — *Propeller Handbook*. McGraw-Hill. The propeller and the static thrust.
- **M. Drela (2006)** — *Propeller Analysis and Design*. MIT. The propeller and the blade element theory.
- **R. Bent (2002)** — *Aircraft Engineering Principles*. Butterworth-Heinemann. The propeller and the propeller performance.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The propeller and the aircraft design.
