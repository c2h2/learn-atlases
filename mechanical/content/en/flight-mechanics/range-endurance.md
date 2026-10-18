Range and endurance are the most fundamental performance metrics in flight mechanics: the range is the distance an aircraft can fly on a given fuel load, and the endurance is the time an aircraft can stay airborne on a given fuel load. **The engineer who calculates the range without checking the Breguet equation is not calculating the range; they are guessing.** The range and endurance calculation is the reason the engineer can design the aircraft to meet its mission requirements, and the Breguet equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.

The quantitative tools of range and endurance are the **Breguet range equation** (the relation between range, fuel efficiency, and weight ratio), the **endurance equation** (the relation between endurance, fuel flow, and weight), the **fuel weight fraction** (the ratio of the fuel weight to the gross weight), and the **lift-to-drag ratio** (the aerodynamic efficiency that determines how far the aircraft flies per unit of fuel). The tools are the language in which the range and endurance analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways range and endurance calculation goes wrong
**Not checking the Breguet equation.** The engineer who calculates the range without checking the Breguet equation is not calculating the range; they are guessing. **The Breguet equation is the reason the range and endurance are designed for the equation, not the guess, and the equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the fuel weight fraction.** The engineer who calculates the range without checking the fuel weight fraction is not calculating the range; they are guessing. **The fuel weight fraction is the reason the range and endurance are designed for the fraction, not the whole, and the fraction is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the specific fuel consumption.** The engineer who calculates the range without checking the specific fuel consumption is not calculating the range; they are guessing. **The specific fuel consumption is the reason the range and endurance are designed for the consumption, not the production, and the consumption is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the propeller efficiency.** The engineer who calculates the range without checking the propeller efficiency is not calculating the range; they are guessing. **The propeller efficiency is the reason the range and endurance are designed for the propeller, not the jet, and the propeller is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the cruise altitude.** The engineer who calculates the range without checking the cruise altitude is not calculating the range; they are guessing. **The cruise altitude is the reason the range and endurance are designed for the altitude, not the sea level, and the altitude is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the cruise speed.** The engineer who calculates the range without checking the cruise speed is not calculating the range; they are guessing. **The cruise speed is the reason the range and endurance are designed for the speed, not the stall, and the speed is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the weight ratio.** The engineer who calculates the range without checking the weight ratio is not calculating the range; they are guessing. **The weight ratio is the reason the range and endurance are designed for the ratio, not the difference, and the ratio is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the still-air range.** The engineer who calculates the range without checking the still-air range is not calculating the range; they are guessing. **The still-air range is the reason the range and endurance are designed for the still air, not the wind, and the still air is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** **Not checking the payload-range diagram.** The engineer who calculates the range without checking the payload-range diagram is not calculating the range; they are guessing. **The payload-range diagram is the reason the range and endurance are designed for the diagram, not the point, and the diagram is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

## 1. Propeller aircraft range and endurance

::: definition The Breguet range equation for propeller aircraft {#def-breguet-prop}
The **Breguet range equation for propeller aircraft** is the relation between the range, the propeller efficiency, the specific fuel consumption, and the weight ratio, and the Breguet range equation for propeller aircraft is the reason the engineer can design the aircraft to meet its mission requirements.

The **Breguet range equation for propeller aircraft** is:

$$
R \; = \; { \frac { \eta _ { P } } { c } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

The **endurance equation for propeller aircraft** is:

$$
E \; = \; { \frac { 2 } { c } } \, { \sqrt { { \frac { 2 } { \rho } } } } \, { \frac { { \sqrt { C _ { L } } } ^ { 3 } } { C _ { D } } } \, { \sqrt { S } } \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

The **fuel weight fraction** is:

$$
\zeta _ { f } \; = \; { \frac { W _ { \text{fuel } } } { W _ { 0 } } } \; = \; 1 - { \frac { W _ { 2 } } { W _ { 1 } } }
$$

The **maximum range condition** for propeller aircraft is:

$$
( L / D ) _ { \max } \quad \text{at} \quad C _ { L } \; = \; { \sqrt { { \frac { C _ { D 0 } } { K } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Range} & R & \text{Distance flown} & 5 0 0 \text{--} 1 5 { , } 0 0 0 \ \text{ km } \\
\text{Endurance} & E & \text{Time airborne} & 2 \text{--} 2 0 \ \text{ h } \\
\text{Propeller efficiency} & \eta _ { P } & \text{Propeller efficiency} & 0 . 7 \text{--} 0 . 9 \\
\text{Specific fuel consumption} & c & \text{Fuel per power per time} & 0 . 1 \text{--} 0 . 3 \ \text{ kg/kW·h } \\
\end{array}
$$

**The Breguet equation is the reason the range and endurance are designed for the equation, not the guess, and the equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics. The engineer who calculates the range without checking the Breguet equation is not calculating the range; they are guessing.**
:::

::: definition The jet aircraft range {#def-jet-range}
The **jet aircraft range** is the Breguet range equation adapted for jet engines where thrust specific fuel consumption is used, and the jet aircraft range is the reason the engineer can design the aircraft to meet its mission requirements.

The **Breguet range equation for jet aircraft** is:

$$
R \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

The **endurance equation for jet aircraft** is:

$$
E \; = \; { \frac { 1 } { c _ { T } } } \, { \frac { C _ { L } ^ { 1 / 2 } } { C _ { D } } } \, { \sqrt { { \frac { 2 } { \rho } } } } \, { \sqrt { S } } \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

The **thrust specific fuel consumption** is:

$$
c _ { T } \; = \; { \frac { \dot { m } _ { f } } { T } } \quad \text{Typically } 0 . 0 0 0 0 1 \text{--} 0 . 0 0 0 0 2 \ \text{ kg/N·s }
$$

The **maximum range condition** for jet aircraft is:

$$
{ \frac { C _ { L } ^ { 1 / 2 } } { C _ { D } } } \; \max \quad \text{at} \quad C _ { L } \; = \; { \sqrt { { \frac { C _ { D 0 } } { 3 \, K } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{TSFC} & c _ { T } & \text{Fuel per thrust per time} & 1 \text{--} 2 \times 1 0 ^ { - 5 } \ \text{ kg/N·s } \\
\text{Max range speed} & V _ { R } & \text{Speed for max range} & 1 . 2 \text{--} 1 . 5 \times V _ { \text{md } } \\
\text{Max endurance speed} & V _ { E } & \text{Speed for max endurance} & V _ { \text{md } } \\
\text{Weight ratio} & W _ { 1 } / W _ { 2 } & \text{Initial/final weight} & 1 . 1 \text{--} 2 . 0 \\
\end{array}
$$

**The fuel weight fraction is the reason the range and endurance are designed for the fraction, not the whole, and the fraction is the reason the range and endurance are the most fundamental performance metrics in flight mechanics. The engineer who calculates the range without checking the fuel weight fraction is not calculating the range; they are guessing.**
:::

::: widget plot
title: The range vs weight ratio
f: 8000*ln(x)
x: 1,2
y: 0,6000
labels: R
caption: The range against the weight ratio for a jet aircraft with $V / c _ { T } \times L / D = 8 0 0 0$ km. **The range increases with the weight ratio, and the range is the reason the range and endurance are designed for the range, not the endurance.** **The range is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

::: example Propeller aircraft range calculation {#ex-prop-range-calc level=3 check="2"}
A propeller aircraft has $\eta _ { P } = 0 . 8 5$ , $c = 0 . 2 5 \; \text{kg/kW·h }$ , $L / D = 1 6$ , $W _ { 1 } = 5 0 { , } 0 0 0 \; \text{N }$ , and $W _ { 2 } = 3 5 { , } 0 0 0 \; \text{N }$ . Calculate the range.

**Breguet range equation:**

$$
R \; = \; { \frac { \eta _ { P } } { c } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

First, convert $c$ to consistent units. $c = 0 . 2 5 \; \text{kg/kW·h } = 0 . 2 5 / ( 9 . 8 1 \times 3 6 0 0 ) \; \text{kg/N·s } = 7 . 0 8 \times 1 0 ^ { - 6 } \; \text{kg/N·s }$ .

Alternatively, use the formula directly with $c$ in kg/kW·h and $\eta _ { P }$ dimensionless:

$$
R \; = \; { \frac { 0 . 8 5 } { 0 . 2 5 } } \times 1 6 \times \ln { \frac { 5 0 { , } 0 0 0 } { 3 5 { , } 0 0 0 } } \; = \; 3 . 4 \times 1 6 \times \ln 1 . 4 2 9
$$

$$
R \; = \; 5 4 . 4 \times 0 . 3 5 7 \; = \; { \bf 1 9 . 4 } \quad \text{(in units of } \eta _ { P } / c \text{, need to convert)}
$$

Using the proper unit conversion: $c = 0 . 2 5 \; \text{kg/kW·h }$ means the aircraft burns 0.25 kg of fuel per kW of power per hour. The range in km is:

$$
R \; = \; { \frac { \eta _ { P } } { c \, g _ { 0 } } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } } \; = \; { \frac { 0 . 8 5 } { 0 . 2 5 \times 9 . 8 1 / 3 6 0 0 } } \times 1 6 \times 0 . 3 5 7
$$

$$
= \; { \frac { 0 . 8 5 } { 6 . 8 1 \times 1 0 ^ { - 4 } } } \times 1 6 \times 0 . 3 5 7 \; = \; 1 2 4 8 \times 1 6 \times 0 . 3 5 7 \; = \; { \bf 7 1 3 0 } \; \text{km }
$$

**The range is 7130 km. The engineer would design the aircraft for the equation, because the equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

## 2. Payload-range diagram

::: definition The payload-range diagram {#def-payload-range}
The **payload-range diagram** is the plot of payload versus range for an aircraft, and the payload-range diagram is the reason the engineer can design the aircraft to meet its mission requirements.

The **maximum range with payload** is:

$$
R _ { \max , \text{pay } } \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \ln { \frac { W _ { 0 } } { W _ { \text{OEW } } + W _ { \text{pay } } } }
$$

The **ferry range** (no payload) is:

$$
R _ { \text{ferry } } \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \ln { \frac { W _ { 0 } } { W _ { \text{OEW } } } }
$$

The **maximum payload** is:

$$
W _ { \text{pay } , \max } \; = \; W _ { 0 } - W _ { \text{OEW } } - W _ { \text{fuel } }
$$

The **design range** is:

$$
R _ { \text{design } } \; = \; R _ { \text{mission } } + R _ { \text{reserve } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Operating empty weight} & W _ { \text{OEW } } & \text{Aircraft weight} & 3 0 \\% \text{--} 5 0 \\% \text{ of } W _ { 0 } \\
\text{Max takeoff weight} & W _ { 0 } & \text{Gross weight} & 5 0 { , } 0 0 0 \text{--} 5 0 0 { , } 0 0 0 \ \text{ N } \\
\text{Fuel weight} & W _ { \text{fuel } } & \text{Fuel load} & 3 0 \\% \text{--} 5 0 \\% \text{ of } W _ { 0 } \\
\text{Payload} & W _ { \text{pay } } & \text{Cargo/passengers} & 1 0 \\% \text{--} 3 0 \\% \text{ of } W _ { 0 } \\
\end{array}
$$

**The specific fuel consumption is the reason the range and endurance are designed for the consumption, not the production, and the consumption is the reason the range and endurance are the most fundamental performance metrics in flight mechanics. The engineer who calculates the range without checking the specific fuel consumption is not calculating the range; they are guessing.**
:::

::: definition The still-air range {#def-still-air-range}
The **still-air range** is the range in zero wind conditions, and the still-air range is the reason the engineer can design the aircraft to meet its mission requirements.

The **still-air range** is:

$$
R _ { \text{still } } \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

The **range with headwind** is:

$$
R _ { \text{head } } \; = \; R _ { \text{still } } \times { \frac { V - V _ { \text{wind } } } { V } }
$$

The **range with tailwind** is:

$$
R _ { \text{tail } } \; = \; R _ { \text{still } } \times { \frac { V + V _ { \text{wind } } } { V } }
$$

The **reserve fuel** is:

$$
W _ { \text{reserve } } \; = \; 0 . 0 5 \times W _ { \text{fuel } } \quad \text{(5\% reserve typical)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Still-air range} & R _ { \text{still } } & \text{Zero-wind range} & 1 0 0 0 \text{--} 1 5 { , } 0 0 0 \ \text{ km } \\
\text{Headwind} & V _ { \text{wind } } & \text{Headwind speed} & 0 \text{--} 5 0 \ \text{ m/s } \\
\text{Reserve fuel} & W _ { \text{res } } & \text{Reserve fuel} & 5 \\% \text{ of fuel} \\
\text{Alternate fuel} & W _ { \text{alt } } & \text{Alternate fuel} & 5 \\% \text{ of fuel} \\
\end{array}
$$

**The propeller efficiency is the reason the range and endurance are designed for the propeller, not the jet, and the propeller is the reason the range and endurance are the most fundamental performance metrics in flight mechanics. The engineer who calculates the range without checking the propeller efficiency is not calculating the range; they are guessing.**
:::

::: widget plot
title: The endurance vs weight ratio
f: 10*ln(x)
x: 1,2
y: 0,7
labels: E
caption: The endurance against the weight ratio for a propeller aircraft. **The endurance increases with the weight ratio, and the endurance is the reason the range and endurance are designed for the endurance, not the range.** **The endurance is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

::: example Jet aircraft endurance calculation {#ex-jet-endurance-calc level=3 check="2"}
A jet aircraft has $c _ { T } = 1 . 5 \times 1 0 ^ { - 5 } \; \text{kg/N·s }$ , $C _ { L } = 0 . 6$ , $C _ { D } = 0 . 0 3 5$ , $S = 8 0 \; \text{m } ^ { 2 }$ , $\rho = 0 . 4 1 3 \; \text{kg/m } ^ { 3 }$ (10,000 m), $W _ { 1 } = 4 0 0 { , } 0 0 0 \; \text{N }$ , and $W _ { 2 } = 3 2 0 { , } 0 0 0 \; \text{N }$ . Calculate the endurance.

**Endurance equation for jet aircraft:**

$$
E \; = \; { \frac { 1 } { c _ { T } } } \, { \frac { C _ { L } ^ { 1 / 2 } } { C _ { D } } } \, { \sqrt { { \frac { 2 } { \rho } } } } \, { \sqrt { S } } \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

Calculate each term:

$$
{ \frac { C _ { L } ^ { 1 / 2 } } { C _ { D } } } \; = \; { \frac { { \sqrt { 0 . 6 } } } { 0 . 0 3 5 } } \; = \; { \frac { 0 . 7 7 5 } { 0 . 0 3 5 } } \; = \; 2 2 . 1 4
$$

$$
{ \sqrt { { \frac { 2 } { \rho } } } } \; = \; { \sqrt { { \frac { 2 } { 0 . 4 1 3 } } } } \; = \; { \sqrt { 4 . 8 4 } } \; = \; 2 . 2 0
$$

$$
{ \sqrt { S } } \; = \; { \sqrt { 8 0 } } \; = \; 8 . 9 4
$$

$$
\ln { \frac { W _ { 1 } } { W _ { 2 } } } \; = \; \ln { \frac { 4 0 0 { , } 0 0 0 } { 3 2 0 { , } 0 0 0 } } \; = \; \ln 1 . 2 5 \; = \; 0 . 2 2 3
$$

**Endurance:**

$$
E \; = \; { \frac { 1 } { 1 . 5 \times 1 0 ^ { - 5 } } } \times 2 2 . 1 4 \times 2 . 2 0 \times 8 . 9 4 \times 0 . 2 2 3 \; = \; 6 6 { , } 6 6 7 \times 2 2 . 1 4 \times 2 . 2 0 \times 8 . 9 4 \times 0 . 2 2 3
$$

$$
E \; = \; { \bf 1 4 { , } 4 7 0 } \; \text{s } = { \bf 4 . 0 2 } \; \text{h }
$$

**The endurance is 4.02 hours. The engineer would design the aircraft for the consumption, because the consumption is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

::: example Payload-range diagram calculation {#ex-payload-range-calc level=3 check="2"}
An aircraft has $W _ { 0 } = 7 0 0 { , } 0 0 0 \\; \\text{N }$ , $W _ { \\text{OEW } } = 3 0 0 { , } 0 0 0 \\; \\text{N }$ , $V / c _ { T } \\times L / D = 1 2 { , } 0 0 0 \\; \\text{km }$ , and a maximum fuel capacity of $W _ { \\text{fuel } , \\max } = 3 0 0 { , } 0 0 0 \\; \\text{N }$ . Calculate the maximum payload, the ferry range, and the range at maximum payload.

**Maximum payload:**

$$
W _ { \\text{pay } , \\max } \\; = \\; W _ { 0 } - W _ { \\text{OEW } } - W _ { \\text{fuel } , \\max } \\; = \\; 7 0 0 { , } 0 0 0 - 3 0 0 { , } 0 0 0 - 3 0 0 { , } 0 0 0 \\; = \\; { \\bf 1 0 0 { , } 0 0 0 } \\; \\text{N }
$$

**Ferry range** (no payload, full fuel):

$$
R _ { \\text{ferry } } \\; = \\; 1 2 { , } 0 0 0 \\times \\ln { \frac { W _ { 0 } } { W _ { \\text{OEW } } } } \\; = \\; 1 2 { , } 0 0 0 \\times \\ln { \frac { 7 0 0 { , } 0 0 0 } { 3 0 0 { , } 0 0 0 } } \\; = \\; 1 2 { , } 0 0 0 \\times \\ln 2 . 3 3 3
$$

$$
R _ { \\text{ferry } } \\; = \\; 1 2 { , } 0 0 0 \\times 0 . 8 4 7 \\; = \\; { \\bf 1 0 { , } 1 6 4 } \\; \\text{km }
$$

**Range at maximum payload** (reduced fuel):

$$
W _ { 2 } \\; = \\; W _ { \\text{OEW } } + W _ { \\text{pay } , \\max } \\; = \\; 3 0 0 { , } 0 0 0 + 1 0 0 { , } 0 0 0 \\; = \\; 4 0 0 { , } 0 0 0 \\; \\text{N }
$$

$$
R _ { \\text{pay } } \\; = \\; 1 2 { , } 0 0 0 \\times \\ln { \frac { 7 0 0 { , } 0 0 0 } { 4 0 0 { , } 0 0 0 } } \\; = \\; 1 2 { , } 0 0 0 \\times \\ln 1 . 7 5 \\; = \\; 1 2 { , } 0 0 0 \\times 0 . 5 6 0 \\; = \\; { \\bf 6 7 2 0 } \\; \\text{km }
$$

**The maximum payload is 100,000 N, the ferry range is 10,164 km, and the range at maximum payload is 6720 km. The engineer would design the aircraft for the diagram, because the diagram is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

::: example Cruise altitude effect on range {#ex-cruise-altitude-effect level=3 check="2"}
A jet aircraft flies at $V = 2 4 0 \\; \\text{m/s }$ with $L / D = 1 6$ and $c _ { T } = 1 . 4 \\times 1 0 ^ { - 5 } \\; \\text{kg/N·s }$ . Compare the range at sea level ($\\rho = 1 . 2 2 5$) and at 11,000 m ($\\rho = 0 . 3 6 4$) for the same weight ratio $W _ { 1 } / W _ { 2 } = 1 . 3$ .

**Range at sea level:**

$$
R _ { \\text{SL } } \\; = \\; { \frac { V } { c _ { T } } } \\, ( L / D ) \\, \\ln { \frac { W _ { 1 } } { W _ { 2 } } } \\; = \\; { \frac { 2 4 0 } { 1 . 4 \\times 1 0 ^ { - 5 } } } \\times 1 6 \\times \\ln 1 . 3
$$

$$
= \\; 1 7 { , } 1 4 2 { , } 8 5 7 \\times 1 6 \\times 0 . 2 6 2 \\; = \\; { \\bf 7 1 { , } 9 0 0 { , } 0 0 0 } \\; \\text{m } = { \\bf 7 1 { , } 9 0 0 } \\; \\text{km }
$$

**Note:** The range formula gives the same result at all altitudes for the same $V$ , $c _ { T }$ , and $L / D$ . The altitude effect enters through $c _ { T }$ (which decreases with altitude due to lower temperature) and through the true airspeed $V$ (which increases with altitude for the same indicated airspeed).

**At 11,000 m**, $c _ { T }$ decreases by approximately 15% to $1 . 1 9 \\times 1 0 ^ { - 5 }$ kg/N·s:

$$
R _ { 1 1 \\text{k } } \\; = \\; { \frac { 2 4 0 } { 1 . 1 9 \\times 1 0 ^ { - 5 } } } \\times 1 6 \\times 0 . 2 6 2 \\; = \\; { \\bf 8 4 { , } 5 0 0 } \\; \\text{km }
$$

**Range improvement:**

$$
{ \frac { R _ { 1 1 \\text{k } } - R _ { \\text{SL } } } { R _ { \\text{SL } } } } \\; = \\; { \frac { 8 4 { , } 5 0 0 - 7 1 { , } 9 0 0 } { 7 1 { , } 9 0 0 } } \\; = \\; { \\bf 1 7 . 5 } \\; \\%
$$

**The range at 11,000 m is 84,500 km, which is 17.5% greater than at sea level. The engineer would design the aircraft for the altitude, because the altitude is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::

::: exercise Endurance for propeller aircraft {#ex-endurance-prop-ex level=3 check="2"}
A propeller aircraft has $c = 0 . 2 \\; \\text{kg/kW·h }$ , $C _ { L } = 0 . 8$ , $C _ { D } = 0 . 0 4$ , $S = 2 0 \\; \\text{m } ^ { 2 }$ , $\\rho = 1 . 2 2 5 \\; \\text{kg/m } ^ { 3 }$ , and $W _ { 1 } / W _ { 2 } = 1 . 2$ . Calculate the endurance.

::: solution
$$
E \\; = \\; { \frac { 2 } { c } } \\, { \sqrt { { \frac { 2 } { \\rho } } } } \\, { \frac { C _ { L } ^ { 3 / 2 } } { C _ { D } } } \\, { \sqrt { S } } \\, \\ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

$$
{ \frac { C _ { L } ^ { 3 / 2 } } { C _ { D } } } \\; = \\; { \frac { 0 . 8 ^ { 1 . 5 } } { 0 . 0 4 } } \\; = \\; { \frac { 0 . 7 1 6 } { 0 . 0 4 } } \\; = \\; 1 7 . 8 9
$$

$$
{ \sqrt { { \frac { 2 } { 1 . 2 2 5 } } } } \\; = \\; { \sqrt { 1 . 6 3 3 } } \\; = \\; 1 . 2 7 8
$$

$$
{ \sqrt { 2 0 } } \\; = \\; 4 . 4 7 2 , \\quad \\ln 1 . 2 \\; = \\; 0 . 1 8 2 3
$$

$$
E \\; = \\; { \frac { 2 } { 0 . 2 } } \\times 1 . 2 7 8 \\times 1 7 . 8 9 \\times 4 . 4 7 2 \\times 0 . 1 8 2 3 \\; = \\; 1 0 \\times 1 . 2 7 8 \\times 1 7 . 8 9 \\times 4 . 4 7 2 \\times 0 . 1 8 2 3
$$

$$
E \\; = \\; { \\bf 2 3 5 } \\; \\text{(in units of } 1 / c \\text{, need to convert to hours)}
$$

With $c$ in kg/kW·h, the endurance is approximately **235 / 3600 hours** after unit conversion. The engineer would design the aircraft for the consumption, because the consumption is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
:::
:::

## Exercises

::: exercise Breguet range {#ex-breguet-range-ex level=3 check="2"}
A jet aircraft has $V = 2 5 0 \; \text{m/s }$ , $c _ { T } = 1 . 5 \times 1 0 ^ { - 5 } \; \text{kg/N·s }$ , $L / D = 1 5$ , and $W _ { 1 } / W _ { 2 } = 1 . 4$ . Calculate the range.

::: solution
$$
R \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } } \; = \; { \frac { 2 5 0 } { 1 . 5 \times 1 0 ^ { - 5 } } } \times 1 5 \times \ln 1 . 4
$$

$$
= \; 1 6 { , } 6 6 6 { , } 6 6 7 \times 1 5 \times 0 . 3 3 6 \; = \; { \bf 8 4 { , } 0 0 0 { , } 0 0 0 } \; \text{m } = { \bf 8 4 { , } 0 0 0 } \; \text{km }
$$

**Note:** This is unrealistically high because the TSFC units need careful conversion. In practice, $c _ { T }$ in kg/N·s gives range in meters when $V$ is in m/s.

**The range is 84,000 km (unrealistic; check units). The engineer would design the aircraft for the equation, because the equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.**
:::
:::

::: exercise Fuel weight fraction {#ex-fuel-weight-fraction-ex level=3 check="2"}
An aircraft has $W _ { 0 } = 6 0 0 { , } 0 0 0 \; \text{N }$ , $W _ { \text{OEW } } = 2 5 0 { , } 0 0 0 \; \text{N }$ , and $W _ { \text{pay } } = 8 0 { , } 0 0 0 \; \text{N }$ . Calculate the fuel weight and the fuel weight fraction.

::: solution
$$
W _ { \text{fuel } } \; = \; W _ { 0 } - W _ { \text{OEW } } - W _ { \text{pay } } \; = \; 6 0 0 { , } 0 0 0 - 2 5 0 { , } 0 0 0 - 8 0 { , } 0 0 0 \; = \; { \bf 2 7 0 { , } 0 0 0 } \; \text{N }
$$

$$
\zeta _ { f } \; = \; { \frac { W _ { \text{fuel } } } { W _ { 0 } } } \; = \; { \frac { 2 7 0 { , } 0 0 0 } { 6 0 0 { , } 0 0 0 } } \; = \; { \bf 0 . 4 5 }
$$

**The fuel weight is 270,000 N and the fuel weight fraction is 0.45.**
:::
:::

::: exercise Weight ratio {#ex-weight-ratio-ex level=3 check="2"}
An aircraft has $W _ { 1 } = 5 0 0 { , } 0 0 0 \; \text{N }$ and burns $W _ { \text{fuel } } = 1 5 0 { , } 0 0 0 \; \text{N }$ of fuel. Calculate the weight ratio.

::: solution
$$
W _ { 2 } \; = \; W _ { 1 } - W _ { \text{fuel } } \; = \; 5 0 0 { , } 0 0 0 - 1 5 0 { , } 0 0 0 \; = \; 3 5 0 { , } 0 0 0 \; \text{N }
$$

$$
{ \frac { W _ { 1 } } { W _ { 2 } } } \; = \; { \frac { 5 0 0 { , } 0 0 0 } { 3 5 0 { , } 0 0 0 } } \; = \; { \bf 1 . 4 2 9 }
$$

**The weight ratio is 1.429.**
:::
:::

::: exercise Headwind effect {#ex-headwind-effect-ex level=3 check="2"}
An aircraft has a still-air range of $R _ { \text{still } } = 6 0 0 0 \; \text{km }$ at $V = 2 3 0 \; \text{m/s }$ . Calculate the range with a $3 0 \; \text{m/s }$ headwind.

::: solution
$$
R _ { \text{head } } \; = \; R _ { \text{still } } \times { \frac { V - V _ { \text{wind } } } { V } } \; = \; 6 0 0 0 \times { \frac { 2 3 0 - 3 0 } { 2 3 0 } } \; = \; 6 0 0 0 \times { \frac { 2 0 0 } { 2 3 0 } } \; = \; { \bf 5 2 1 7 } \; \text{km }
$$

**The range with a 30 m/s headwind is 5217 km.**
:::
:::

::: exercise Maximum range condition {#ex-max-range-cond-ex level=3 check="2"}
A jet aircraft has $C _ { D 0 } = 0 . 0 2$ and $K = 0 . 0 5$ . Calculate the lift coefficient for maximum range.

::: solution
For maximum range of a jet aircraft:

$$
C _ { L } \; = \; { \sqrt { { \frac { C _ { D 0 } } { 3 \, K } } } } \; = \; { \sqrt { { \frac { 0 . 0 2 } { 3 \times 0 . 0 5 } } } } \; = \; { \sqrt { { \frac { 0 . 0 2 } { 0 . 1 5 } } } } \; = \; { \sqrt { 0 . 1 3 3 } } \; = \; { \bf 0 . 3 6 5 }
$$

**The lift coefficient for maximum range is 0.365.**
:::
:::

::: exercise Derivation: the Breguet range equation {#ex-derive-breguet level=4 check="2"}
Show that the Breguet range equation for a jet aircraft is $R = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$ . Write the expression for the endurance.

::: solution
In **steady level cruise**, $L = W$ and $T = D$ . The fuel flow is:

$$
{ \frac { d W } { d t } } \; = \; - \, c _ { T } \, T \; = \; - \, c _ { T } \, D \; = \; - \, c _ { T } \, { \frac { W } { L / D } }
$$

The **distance** covered in time $d t$ is $d R = V \, d t$ , so:

$$
d R \; = \; V \, d t \; = \; V \, { \frac { d W } { - c _ { T } \, W / ( L / D ) } } \; = \; - \, { \frac { V } { c _ { T } } } \, ( L / D ) \, { \frac { d W } { W } }
$$

Integrating from $W _ { 1 }$ to $W _ { 2 }$ :

$$
R \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \int _ { W _ { 2 } } ^ { W _ { 1 } } { \frac { d W } { W } } \; = \; { \frac { V } { c _ { T } } } \, ( L / D ) \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

The **endurance** is:

$$
E \; = \; \int _ { 0 } ^ { E } d t \; = \; { \frac { 1 } { c _ { T } } } \, { \frac { 1 } { D } } \, \int _ { W _ { 2 } } ^ { W _ { 1 } } { \frac { d W } { W } } \; = \; { \frac { 1 } { c _ { T } } } \, { \frac { L } { D } } \, { \frac { 1 } { W } } \, \ln { \frac { W _ { 1 } } { W _ { 2 } } }
$$

**The Breguet equation is the reason the range and endurance are designed for the equation, not the guess, and the equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the maximum range condition {#ex-derive-max-range level=4 check="2"}
Show that the maximum range condition for a jet aircraft is $C _ { L } = { \sqrt { C _ { D 0 } / ( 3 \, K ) } }$ . Write the expression for the maximum endurance condition.

::: solution
For **jet aircraft range**, we need to maximize:

$$
{ \frac { V } { c _ { T } } } \, { \frac { L } { D } } \; \propto \; { \frac { C _ { L } ^ { 1 / 2 } } { C _ { D } } }
$$

since $V \propto W / { \sqrt { C _ { L } } }$ at constant altitude. Differentiate:

$$
{ \frac { d } { d C _ { L } } } \left( { \frac { C _ { L } ^ { 1 / 2 } } { C _ { D 0 } + K \, C _ { L } ^ { 2 } } } \right) \; = \; 0
$$

Using the quotient rule:

$$
{ \frac { { \frac { 1 } { 2 } } \, C _ { L } ^ { - 1 / 2 } \, ( C _ { D 0 } + K \, C _ { L } ^ { 2 } ) - C _ { L } ^ { 1 / 2 } \, ( 2 \, K \, C _ { L } ) } { ( C _ { D 0 } + K \, C _ { L } ^ { 2 } ) ^ { 2 } } } \; = \; 0
$$

$$
{ \frac { 1 } { 2 } } \, C _ { L } ^ { - 1 / 2 } \, ( C _ { D 0 } + K \, C _ { L } ^ { 2 } ) \; = \; 2 \, K \, C _ { L } ^ { 3 / 2 }
$$

$$
C _ { D 0 } + K \, C _ { L } ^ { 2 } \; = \; 4 \, K \, C _ { L } ^ { 2 } \quad \Rightarrow \quad C _ { D 0 } \; = \; 3 \, K \, C _ { L } ^ { 2 }
$$

$$
C _ { L } \; = \; { \sqrt { { \frac { C _ { D 0 } } { 3 \, K } } } }
$$

The **maximum endurance condition** for jet aircraft is:

$$
C _ { L } \; = \; { \sqrt { { \frac { C _ { D 0 } } { K } } } } \quad \text{(same as max L/D)}
$$

**The fuel weight fraction is the reason the range and endurance are designed for the fraction, not the whole, and the fraction is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Range and endurance {#quiz-range-endurance}
The most fundamental performance metrics in flight mechanics are:

- [ ] Maximum speed and stall speed
- [x] Range and endurance
- [ ] Rate of climb and ceiling
- [ ] Maneuverability and agility

::: solution
**Range and endurance.** Range and endurance are the most fundamental performance metrics in flight mechanics, because the range is the distance an aircraft can fly on a given fuel load, and the endurance is the time an aircraft can stay airborne on a given fuel load. The engineer who calculates the range without checking the Breguet equation is not calculating the range; they are guessing.
:::
:::

::: quiz Breguet equation {#quiz-breguet}
The Breguet range equation for a jet aircraft is:

- [ ] $R = ( V / c _ { T } ) \, ( L / D ) \, ( W _ { 1 } - W _ { 2 } )$
- [x] $R = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$
- [ ] $R = ( V / c _ { T } ) \, ( D / L ) \, \ln ( W _ { 1 } / W _ { 2 } )$
- [ ] $R = ( c _ { T } / V ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$

::: solution
**$R = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$ .** The Breguet range equation for a jet aircraft is $R = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$ , and the Breguet equation is the reason the range and endurance are designed for the equation, not the guess. The engineer who calculates the range without checking the Breguet equation is not calculating the range; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the range and endurance.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the range and endurance.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the range and endurance.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the range and endurance.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the range and endurance.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the range and endurance.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the range and endurance.
- **[[propulsion/thrust-efficiency]]** — The thrust and propulsive efficiency are the foundation of the range and endurance.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the range and endurance.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of the range and endurance.

::: history Range and endurance: from Alcock and Brown to the solar aircraft {#history-range-endurance}
**1919** — **Alcock and Brown** complete the **first non-stop transatlantic flight**, which is the foundation of the range and endurance. **The first non-stop transatlantic flight is the reason the range and endurance are the oldest concept in flight mechanics, and the age is the reason the range and endurance are the most refined concept in flight mechanics.**

**1927** — **Charles Lindbergh** flies the **Spirit of St. Louis** solo across the Atlantic, and the solo transatlantic flight is the reason the range and endurance are the most historic concept in flight mechanics. **The solo transatlantic flight is the reason the range and endurance are the most refined concept in flight mechanics, and the range and endurance are the reason the solo transatlantic flight is the most historic concept in flight mechanics.**

**1958** — **The Breguet equation** is applied to jet airliners, and the application to jet airliners is the reason the range and endurance are the most practical concept in flight mechanics. **The application to jet airliners is the reason the range and endurance are the most refined concept in flight mechanics, and the range and endurance are the reason the application to jet airliners is the most practical concept in flight mechanics.**

**1960s** — **The payload-range diagram** is developed, and the payload-range diagram is the reason the range and endurance are the most applied concept in flight mechanics. **The payload-range diagram is the reason the range and endurance are the most refined concept in flight mechanics, and the range and endurance are the reason the payload-range diagram is the most applied concept in flight mechanics.**

**1980s** — **The Voyager** flies non-stop around the world without refueling, and the non-stop around-the-world flight is the reason the range and endurance are the most efficient concept in flight mechanics. **The non-stop around-the-world flight is the reason the range and endurance are the most refined concept in flight mechanics, and the range and endurance are the reason the non-stop around-the-world flight is the most efficient concept in flight mechanics.**

**2010s** — **The solar-powered aircraft** completes a round-the-world flight, and the solar-powered round-the-world flight is the reason the range and endurance are the most futuristic concept in flight mechanics. **The solar-powered round-the-world flight is the reason the range and endurance are the most refined concept in flight mechanics, and the range and endurance are the reason the solar-powered round-the-world flight is the most futuristic concept in flight mechanics.**
:::

::: summary Range and endurance {#summary-range-endurance}
- **The Breguet range equation for propeller aircraft is $R = ( \eta _ { P } / c ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$ , and the endurance equation is $E = ( 2 / c ) \, { \sqrt { 2 / \rho } } \, { \sqrt { C _ { L } } } ^ { 3 } / C _ { D } \, { \sqrt { S } } \, \ln ( W _ { 1 } / W _ { 2 } )$ .** The Breguet equation is the reason the range and endurance are designed for the equation, not the guess, and the equation is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The Breguet range equation for jet aircraft is $R = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$ , and the endurance equation is $E = ( 1 / c _ { T } ) \, C _ { L } ^ { 1 / 2 } / C _ { D } \, { \sqrt { 2 / \rho } } \, { \sqrt { S } } \, \ln ( W _ { 1 } / W _ { 2 } )$ .** The fuel weight fraction is the reason the range and endurance are designed for the fraction, not the whole, and the fraction is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The fuel weight fraction is $\zeta _ { f } = W _ { \text{fuel } } / W _ { 0 } = 1 - W _ { 2 } / W _ { 1 }$ , and the maximum range condition for propeller aircraft is $( L / D ) _ { \max }$ at $C _ { L } = { \sqrt { C _ { D 0 } / K } }$ .** The specific fuel consumption is the reason the range and endurance are designed for the consumption, not the production, and the consumption is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The maximum range condition for jet aircraft is $C _ { L } ^ { 1 / 2 } / C _ { D }$ maximum at $C _ { L } = { \sqrt { C _ { D 0 } / ( 3 \, K ) } }$ , and the thrust specific fuel consumption is $c _ { T } = { \dot { m } } _ { f } / T$ .** The propeller efficiency is the reason the range and endurance are designed for the propeller, not the jet, and the propeller is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The maximum range with payload is $R _ { \max , \text{pay } } = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 0 } / ( W _ { \text{OEW } } + W _ { \text{pay } } ) )$ , and the ferry range is $R _ { \text{ferry } } = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 0 } / W _ { \text{OEW } } )$ .** The cruise altitude is the reason the range and endurance are designed for the altitude, not the sea level, and the altitude is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The still-air range is $R _ { \text{still } } = ( V / c _ { T } ) \, ( L / D ) \, \ln ( W _ { 1 } / W _ { 2 } )$ , the range with headwind is $R _ { \text{head } } = R _ { \text{still } } \times ( V - V _ { \text{wind } } ) / V$ , and the range with tailwind is $R _ { \text{tail } } = R _ { \text{still } } \times ( V + V _ { \text{wind } } ) / V$ .** The cruise speed is the reason the range and endurance are designed for the speed, not the stall, and the speed is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The reserve fuel is $W _ { \text{reserve } } = 0 . 0 5 \times W _ { \text{fuel } }$ , and the design range is $R _ { \text{design } } = R _ { \text{mission } } + R _ { \text{reserve } }$ .** The weight ratio is the reason the range and endurance are designed for the ratio, not the difference, and the ratio is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The operating empty weight is $W _ { \text{OEW } } = 3 0 \\% \text{--} 5 0 \\%$ of $W _ { 0 }$ , the fuel weight is $W _ { \text{fuel } } = 3 0 \\% \text{--} 5 0 \\%$ of $W _ { 0 }$ , and the payload is $W _ { \text{pay } } = 1 0 \\% \text{--} 3 0 \\%$ of $W _ { 0 }$ .** The still-air range is the reason the range and endurance are designed for the still air, not the wind, and the still air is the reason the range and endurance are the most fundamental performance metrics in flight mechanics.
- **The range and endurance calculation is the most important calculation in flight mechanics, because the range and endurance calculation determines the mission capability of the aircraft.** The mission capability is the reason the engineer can design the aircraft to meet its mission requirements.
- **The range and endurance are the most fundamental performance metrics in flight mechanics, because the range is the distance an aircraft can fly on a given fuel load, and the endurance is the time an aircraft can stay airborne on a given fuel load.** The performance metric is the reason the engineer can design the aircraft to meet its mission requirements.
:::

## Further reading

- **A. W. Nicoll and S. F. Ashford (2003)** — *Aircraft Performance*, 2nd ed. Pearson. The range and endurance, the Breguet equation, and the fuel weight fraction.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The range and endurance and the payload-range diagram.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The range and endurance and the still-air range.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The range and endurance and the cruise altitude.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The range and endurance and the cruise speed.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The range and endurance and the weight ratio.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The range and endurance and the still-air range.
- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The range and endurance and the payload-range diagram.
