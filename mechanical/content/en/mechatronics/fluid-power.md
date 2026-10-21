The fluid power actuator is the most critical component in the force system: the fluid power actuator is the device that converts the fluid energy into the mechanical energy, and the fluid power actuator is the device that determines the force of the machine. **The engineer who selects the fluid power actuator without checking the force-velocity curve is not selecting the fluid power actuator; they are guessing.** The fluid power actuator selection is the reason the engineer can design the force system to be safe, and the safety is the reason the fluid power actuator is the most critical component in the force system.

The quantitative tools of fluid power design are the **hydraulic cylinder** (force, velocity, pressure), the **hydraulic motor** (torque, speed, displacement), the **pneumatic cylinder** (force, speed, air consumption), and the **valve control** (flow, pressure, response time). The tools are the language in which the fluid power analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways fluid power actuator selection goes wrong
**Not checking the force-velocity curve.** The engineer who selects the fluid power actuator without checking the force-velocity curve is not selecting the fluid power actuator; they are guessing. **The force-velocity curve is the reason the fluid power actuator is designed for the force, not the speed, and the force is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the pressure rating.** The engineer who selects the fluid power actuator without checking the pressure rating is not selecting the fluid power actuator; they are guessing. **The pressure rating is the reason the fluid power actuator is designed for the pressure, not the flow, and the pressure is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the flow rate.** The engineer who selects the fluid power actuator without checking the flow rate is not selecting the fluid power actuator; they are guessing. **The flow rate is the reason the fluid power actuator is designed for the speed, not the force, and the speed is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the valve response time.** The engineer who selects the fluid power actuator without checking the valve response time is not selecting the fluid power actuator; they are guessing. **The valve response time is the reason the fluid power actuator is designed for the bandwidth, not the force, and the bandwidth is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the fluid contamination.** The engineer who selects the fluid power actuator without checking the fluid contamination is not selecting the fluid power actuator; they are guessing. **The fluid contamination is the reason the fluid power actuator is designed for the reliability, not the performance, and the reliability is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the cavitation.** The engineer who selects the fluid power actuator without checking the cavitation is not selecting the fluid power actuator; they are guessing. **The cavitation is the reason the fluid power actuator is designed for the pressure, not the flow, and the pressure is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the air consumption.** The engineer who selects the pneumatic actuator without checking the air consumption is not selecting the pneumatic actuator; they are guessing. **The air consumption is the reason the pneumatic actuator is designed for the operating cost, not the force, and the operating cost is the reason the pneumatic actuator is the most critical component in the force system.** **Not checking the leakage.** The engineer who selects the fluid power actuator without checking the leakage is not selecting the fluid power actuator; they are guessing. **The leakage is the reason the fluid power actuator is designed for the efficiency, not the force, and the efficiency is the reason the fluid power actuator is the most critical component in the force system.** **Not checking the heat dissipation.** The engineer who selects the fluid power actuator without checking the heat dissipation is not selecting the fluid power actuator; they are guessing. **The heat dissipation is the reason the fluid power actuator is designed for the thermal limit, not the force, and the thermal limit is the reason the fluid power actuator is the most critical component in the force system.**
:::

## 1. Hydraulic actuators

::: definition The hydraulic cylinder {#def-hydraulic-cylinder}
The **hydraulic cylinder** is the linear actuator that converts the hydraulic energy into the linear mechanical energy, and the hydraulic cylinder is the reason the engineer can design the force system to be safe.

The **force** is:

$$
F \; = \; P \, A \; = \; P \, { \frac { \pi \, d ^ { 2 } } { 4 } } \quad \text{(cap end)} \qquad F _ { \text{rod } } \; = \; P \, { \frac { \pi } { 4 } } \, ( d ^ { 2 } - d _ { r } ^ { 2 } ) \quad \text{(rod end)}
$$

The **velocity** is:

$$
v \; = \; { \frac { Q } { A } } \; = \; { \frac { 4 \, Q } { \pi \, d ^ { 2 } } }
$$

The **power** is:

$$
P _ { \text{hyd } } \; = \; P \, Q \; = \; F \, v
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Unit } & \textbf{ Typical value } \\ \hline
\text{Pressure} & P & \text{MPa} & 7 \text{--} 3 5 \\
\text{Bore diameter} & d & \text{mm} & 2 0 \text{--} 5 0 0 \\
\text{Rod diameter} & d _ { r } & \text{mm} & 1 0 \text{--} 3 0 0 \\
\text{Flow rate} & Q & \text{L/min} & 1 \text{--} 5 0 0 \\
\text{Force} & F & \text{kN} & 1 \text{--} 1 0 \ 0 0 0 \\
\text{Velocity} & v & \text{m/s} & 0 . 0 1 \text{--} 2 \\
\end{array}
$$

**The force-velocity curve is the reason the fluid power actuator is designed for the force, not the speed, and the force is the reason the fluid power actuator is the most critical component in the force system. The engineer who selects the fluid power actuator without checking the force-velocity curve is not selecting the fluid power actuator; they are guessing.**
:::

::: definition The hydraulic motor {#def-hydraulic-motor}
The **hydraulic motor** is the rotary actuator that converts the hydraulic energy into the rotary mechanical energy, and the hydraulic motor is the reason the engineer can design the torque system to be safe.

The **torque** is:

$$
T \; = \; { \frac { \Delta p \, D } { 2 \, \pi } } \, \eta _ { m }
$$

where $D$ is the displacement per revolution and $\eta _ { m }$ is the mechanical efficiency.

The **speed** is:

$$
n \; = \; { \frac { Q } { D } } \, \eta _ { v }
$$

where $\eta _ { v }$ is the volumetric efficiency.

The **power** is:

$$
P _ { \text{hyd } } \; = \; \Delta p \, Q \; = \; T \, \omega
$$

$$
\begin{array} { l c c c c }
\textbf{Motor type} & \textbf{ Displacement } & \textbf{ Pressure } & \textbf{ Efficiency } & \textbf{ Use case } \\ \hline
\text{Gear motor} & 0 . 5 \text{--} 2 0 0 \ \text{cc/rev} & 2 0 \text{--} 2 5 \ \text{MPa} & 8 0 \ \% & \text{Low cost} \\
\text{Vane motor} & 5 \text{--} 2 0 0 \ \text{cc/rev} & 1 5 \text{--} 2 0 \ \text{MPa} & 8 5 \ \% & \text{Smooth operation} \\
\text{Piston motor} & 5 \text{--} 5 0 0 \ \text{cc/rev} & 3 5 \text{--} 7 0 \ \text{MPa} & 9 0 \ \% & \text{High pressure} \\
\text{Orbital motor} & 5 0 \text{--} 5 0 0 \ \text{cc/rev} & 1 5 \text{--} 2 5 \ \text{MPa} & 7 5 \ \% & \text{High torque, low speed} \\
\end{array}
$$

**The pressure rating is the reason the fluid power actuator is designed for the pressure, not the flow, and the pressure is the reason the fluid power actuator is the most critical component in the force system. The engineer who selects the fluid power actuator without checking the pressure rating is not selecting the fluid power actuator; they are guessing.**
:::

::: widget plot
title: The hydraulic cylinder force vs pressure
f: 3.14159*0.05^2/4*x*1e6/1000; 3.14159*0.1^2/4*x*1e6/1000
x: 1,35
y: 0,1000
labels: 50 mm bore; 100 mm bore
caption: The hydraulic cylinder force against the pressure for different bore diameters. **The force is proportional to the pressure and the square of the bore diameter, and the proportionality is the reason the fluid power actuator is designed for the force, not the speed.** **The force-velocity curve is the reason the fluid power actuator is the most critical component in the force system.**
:::

::: example Hydraulic cylinder sizing {#ex-hydraulic-sizing level=3 check="2"}
A hydraulic cylinder must lift a 50 kN load at 0.1 m/s. The system pressure is 20 MPa. Calculate the bore diameter, flow rate, and hydraulic power.

**Bore area:**

$$
A \; = \; { \frac { F } { P } } \; = \; { \frac { 5 0 \ 0 0 0 } { 2 0 \times 1 0 ^ { 6 } } } \; = \; 2 . 5 \times 1 0 ^ { - 3 } \ \text{m} ^ { 2 }
$$

**Bore diameter:**

$$
d \; = \; { \sqrt { \frac { 4 \, A } { \pi } } } \; = \; { \sqrt { \frac { 4 \times 2 . 5 \times 1 0 ^ { - 3 } } { \pi } } } \; = \; { \bf 5 6 . 4 } \ \text{mm} \quad \text{(use 63 mm standard)}
$$

**Flow rate:**

$$
Q \; = \; A \, v \; = \; 2 . 5 \times 1 0 ^ { - 3 } \times 0 . 1 \; = \; 2 . 5 \times 1 0 ^ { - 4 } \ \text{m} ^ { 3 } / \text{s} \; = \; { \bf 1 5 } \ \text{L/min}
$$

**Hydraulic power:**

$$
P _ { \text{hyd } } \; = \; P \, Q \; = \; 2 0 \times 1 0 ^ { 6 } \times 2 . 5 \times 1 0 ^ { - 4 } \; = \; { \bf 5 } \ \text{kW}
$$

**The bore diameter is 56.4 mm (use 63 mm), the flow rate is 15 L/min, and the hydraulic power is 5 kW. The engineer would select the hydraulic cylinder for the force, because the force is the reason the fluid power actuator is the most critical component in the force system.**
:::

## 2. Pneumatic actuators and valve control

::: definition The pneumatic cylinder {#def-pneumatic-cylinder}
The **pneumatic cylinder** is the linear actuator that converts the pneumatic energy into the linear mechanical energy, and the pneumatic cylinder is the reason the engineer can design the force system to be safe.

The **force** is:

$$
F \; = \; P \, A \; = \; P \, { \frac { \pi \, d ^ { 2 } } { 4 } } \quad \text{(cap end)} \qquad F _ { \text{rod } } \; = \; P \, { \frac { \pi } { 4 } } \, ( d ^ { 2 } - d _ { r } ^ { 2 } ) \quad \text{(rod end)}
$$

The **air consumption** (free air) is:

$$
Q _ { \text{free } } \; = \; Q _ { \text{actual } } \, { \frac { P _ { \text{abs } } } { P _ { \text{atm } } } } \; = \; A \, v \, { \frac { P + P _ { \text{atm } } } { P _ { \text{atm } } } }
$$

The **speed** is:

$$
v \; = \; { \frac { Q } { A } } \; = \; { \frac { 4 \, Q } { \pi \, d ^ { 2 } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Unit } & \textbf{ Typical value } \\ \hline
\text{Pressure} & P & \text{bar (gauge)} & 2 \text{--} 1 0 \\
\text{Bore diameter} & d & \text{mm} & 6 \text{--} 3 2 0 \\
\text{Stroke} & L & \text{mm} & 1 0 \text{--} 2 0 0 0 \\
\text{Force} & F & \text{N} & 1 \text{--} 5 0 \ 0 0 0 \\
\text{Velocity} & v & \text{m/s} & 0 . 1 \text{--} 5 \\
\text{Air consumption} & Q _ { \text{free } } & \text{L/min} & 0 . 1 \text{--} 1 0 0 \\
\end{array}
$$

**The flow rate is the reason the fluid power actuator is designed for the speed, not the force, and the speed is the reason the fluid power actuator is the most critical component in the force system. The engineer who selects the fluid power actuator without checking the flow rate is not selecting the fluid power actuator; they are guessing.**
:::

::: definition The valve control {#def-valve-control}
The **valve control** is the control of the fluid flow and pressure by the valve, and the valve control is the reason the engineer can design the force system to be safe.

The **valve flow** (laminar, orifice equation):

$$
Q \; = \; C _ { d } \, A _ { v } \, { \sqrt { \frac { 2 \, \Delta p } { \rho } } }
$$

The **valve response time** is:

$$
T _ { \text{response } } \; = \; T _ { \text{electrical } } + T _ { \text{mechanical } } + T _ { \text{hydraulic } }
$$

The **valve bandwidth** is:

$$
f _ { \text{valve } } \; = \; { \frac { 1 } { 2 \, \pi \, T _ { \text{response } } } }
$$

$$
\begin{array} { l c c c c }
\textbf{Valve type} & \textbf{ Response time } & \textbf{ Bandwidth } & \textbf{ Flow } & \textbf{ Use case } \\ \hline
\text{Solenoid (on/off)} & 1 0 \text{--} 5 0 \ \text{ms} & 5 \text{--} 2 0 \ \text{Hz} & \text{High} & \text{Simple control} \\
\text{Proportional} & 1 0 \text{--} 5 0 \ \text{ms} & 5 \text{--} 2 0 \ \text{Hz} & \text{High} & \text{Process control} \\
\text{Servo valve} & 1 \text{--} 5 \ \text{ms} & 5 0 \text{--} 2 0 0 \ \text{Hz} & \text{Medium} & \text{Precision control} \\
\text{Piezo valve} & 0 . 1 \text{--} 1 \ \text{ms} & 2 0 0 \text{--} 1 0 0 0 \ \text{Hz} & \text{Low} & \text{High-speed control} \\
\text{Digital valve} & 1 \text{--} 1 0 \ \text{ms} & 2 0 \text{--} 2 0 0 \ \text{Hz} & \text{Medium} & \text{Energy efficient} \\
\end{array}
$$

**The valve response time is the reason the fluid power actuator is designed for the bandwidth, not the force, and the bandwidth is the reason the fluid power actuator is the most critical component in the force system. The engineer who selects the fluid power actuator without checking the valve response time is not selecting the fluid power actuator; they are guessing.**
:::

::: widget plot
title: The pneumatic cylinder force vs pressure
f: 3.14159*0.032^2/4*x*1e5/1000; 3.14159*0.063^2/4*x*1e5/1000
x: 1,10
y: 0,5000
labels: 32 mm bore; 63 mm bore
caption: The pneumatic cylinder force against the pressure for different bore diameters. **The force is proportional to the pressure and the square of the bore diameter, and the proportionality is the reason the fluid power actuator is designed for the force, not the speed.** **The force-velocity curve is the reason the fluid power actuator is the most critical component in the force system.**
:::

::: example Pneumatic cylinder selection {#ex-pneumatic-selection level=3 check="2"}
A pneumatic cylinder must push a 500 N load at 0.5 m/s. The supply pressure is 6 bar (gauge). Calculate the bore diameter and the air consumption.

**Bore area:**

$$
A \; = \; { \frac { F } { P } } \; = \; { \frac { 5 0 0 } { 6 \times 1 0 ^ { 5 } } } \; = \; 8 . 3 3 \times 1 0 ^ { - 4 } \ \text{m} ^ { 2 }
$$

**Bore diameter:**

$$
d \; = \; { \sqrt { \frac { 4 \, A } { \pi } } } \; = \; { \sqrt { \frac { 4 \times 8 . 3 3 \times 1 0 ^ { - 4 } } { \pi } } } \; = \; { \bf 3 2 . 6 } \ \text{mm} \quad \text{(use 32 mm standard)}
$$

**Actual flow rate:**

$$
Q _ { \text{actual } } \; = \; A \, v \; = \; 8 . 3 3 \times 1 0 ^ { - 4 } \times 0 . 5 \; = \; 4 . 1 7 \times 1 0 ^ { - 4 } \ \text{m} ^ { 3 } / \text{s}
$$

**Free air consumption:**

$$
Q _ { \text{free } } \; = \; Q _ { \text{actual } } \, { \frac { P + P _ { \text{atm } } } { P _ { \text{atm } } } } \; = \; 4 . 1 7 \times 1 0 ^ { - 4 } \times { \frac { 6 + 1 . 0 1 3 } { 1 . 0 1 3 } } \; = \; { \bf 2 . 9 } \ \text{L/s} \; = \; { \bf 1 7 4 } \ \text{L/min}
$$

**The bore diameter is 32.6 mm (use 32 mm), and the free air consumption is 174 L/min. The engineer would select the pneumatic cylinder for the force, because the force is the reason the fluid power actuator is the most critical component in the force system.**
:::

::: example Hydraulic motor selection {#ex-hydraulic-motor-selection level=3 check="2"}
A hydraulic motor must deliver 500 N·m at 100 rpm. The displacement is 200 cc/rev and the mechanical efficiency is 90%. Calculate the required pressure drop and the flow rate.

**Required pressure drop:**

$$
\Delta p \; = \; { \frac { 2 \, \pi \, T } { D \, \eta _ { m } } } \; = \; { \frac { 2 \, \pi \times 5 0 0 } { 2 0 0 \times 1 0 ^ { - 6 } \times 0 . 9 } } \; = \; { \bf 1 7 . 5 } \ \text{MPa}
$$

**Flow rate (assuming $\eta _ { v } = 0 . 9 5$ ):**

$$
Q \; = \; { \frac { n \, D } { \eta _ { v } } } \; = \; { \frac { ( 1 0 0 / 6 0 ) \times 2 0 0 \times 1 0 ^ { - 6 } } { 0 . 9 5 } } \; = \; { \bf 3 . 5 1 } \times 1 0 ^ { - 4 } \ \text{m} ^ { 3 } / \text{s} \; = \; { \bf 2 1 } \ \text{L/min}
$$

**Hydraulic power:**

$$
P _ { \text{hyd } } \; = \; \Delta p \, Q \; = \; 1 7 . 5 \times 1 0 ^ { 6 } \times 3 . 5 1 \times 1 0 ^ { - 4 } \; = \; { \bf 6 . 1 4 } \ \text{kW}
$$

**The required pressure drop is 17.5 MPa, the flow rate is 21 L/min, and the hydraulic power is 6.14 kW. The engineer would select the hydraulic motor for the torque, because the torque is the reason the fluid power actuator is the most critical component in the force system.**
:::

::: example Hydraulic system efficiency {#ex-hydraulic-efficiency level=3 check="2"}
A hydraulic system has a pump with 85% efficiency, a valve with 95% efficiency, and a cylinder with 90% efficiency. The motor input power is 10 kW. Calculate the overall efficiency and the useful output power.

**Overall efficiency:**

$$
\eta _ { \text{overall } } \; = \; \eta _ { \text{pump } } \times \eta _ { \text{valve } } \times \eta _ { \text{cylinder } } \; = \; 0 . 8 5 \times 0 . 9 5 \times 0 . 9 0 \; = \; { \bf 0 . 7 2 7 } \; = \; 7 2 . 7 \ \%
$$

**Useful output power:**

$$
P _ { \text{out } } \; = \; \eta _ { \text{overall } } \times P _ { \text{in } } \; = \; 0 . 7 2 7 \times 1 0 \; = \; { \bf 7 . 2 7 } \ \text{kW}
$$

**Power loss (heat):**

$$
P _ { \text{loss } } \; = \; P _ { \text{in } } - P _ { \text{out } } \; = \; 1 0 - 7 . 2 7 \; = \; { \bf 2 . 7 3 } \ \text{kW}
$$

**The overall efficiency is 72.7%, the useful output power is 7.27 kW, and the heat dissipation is 2.73 kW. The engineer would design the hydraulic system for the heat dissipation, because the heat dissipation is the reason the fluid power actuator is the most critical component in the force system.**
:::

::: exercise Hydraulic cylinder velocity {#ex-hydraulic-velocity level=3 check="2"}
A hydraulic cylinder has a bore of 100 mm and a rod of 70 mm. The pump flow is 40 L/min. Calculate the extension velocity and the retraction velocity.

::: solution
$$
v _ { \text{extend } } \; = \; { \frac { 4 \, Q } { \pi \, d ^ { 2 } } } \; = \; { \frac { 4 \times 4 0 \times 1 0 ^ { - 3 } / 6 0 } { \pi \times 0 . 1 ^ { 2 } } } \; = \; { \bf 0 . 0 8 5 } \ \text{m/s}
$$

$$
v _ { \text{retract } } \; = \; { \frac { 4 \, Q } { \pi \, ( d ^ { 2 } - d _ { r } ^ { 2 } ) } } \; = \; { \frac { 4 \times 4 0 \times 1 0 ^ { - 3 } / 6 0 } { \pi \, ( 0 . 1 ^ { 2 } - 0 . 0 7 ^ { 2 } ) } } \; = \; { \bf 0 . 1 6 7 } \ \text{m/s}
$$

**The extension velocity is 0.085 m/s, and the retraction velocity is 0.167 m/s. The engineer would design the hydraulic cylinder for the speed, because the speed is the reason the fluid power actuator is the most critical component in the force system.**
:::
:::

## Exercises

::: exercise Hydraulic cylinder force {#ex-hydraulic-force level=3 check="2"}
A hydraulic cylinder has a bore of 80 mm and a rod of 50 mm. The system pressure is 15 MPa. Calculate the cap-end force and the rod-end force.

::: solution
$$
F _ { \text{cap } } \; = \; P \, { \frac { \pi \, d ^ { 2 } } { 4 } } \; = \; 1 5 \times 1 0 ^ { 6 } \times { \frac { \pi \times 0 . 0 8 ^ { 2 } } { 4 } } \; = \; { \bf 7 5 . 4 } \ \text{kN}
$$

$$
F _ { \text{rod } } \; = \; P \, { \frac { \pi } { 4 } } \, ( d ^ { 2 } - d _ { r } ^ { 2 } ) \; = \; 1 5 \times 1 0 ^ { 6 } \times { \frac { \pi } { 4 } } \, ( 0 . 0 8 ^ { 2 } - 0 . 0 5 ^ { 2 } ) \; = \; { \bf 4 5 . 9 } \ \text{kN}
$$

**The cap-end force is 75.4 kN, and the rod-end force is 45.9 kN.**
:::
:::

::: exercise Hydraulic motor torque {#ex-hydraulic-torque level=3 check="2"}
A hydraulic motor has a displacement of 100 cc/rev and a pressure drop of 20 MPa. The mechanical efficiency is 90%. Calculate the torque.

::: solution
$$
T \; = \; { \frac { \Delta p \, D } { 2 \, \pi } } \, \eta _ { m } \; = \; { \frac { 2 0 \times 1 0 ^ { 6 } \times 1 0 0 \times 1 0 ^ { - 6 } } { 2 \, \pi } } \times 0 . 9 \; = \; { \bf 2 8 6 } \ \text{N} { \cdot } \text{m}
$$

**The torque is 286 N·m.**
:::
:::

::: exercise Valve flow rate {#ex-valve-flow level=3 check="2"}
A valve has $C _ { d } = 0 . 6$ , $A _ { v } = 1 0$ mm², and $\Delta p = 1 0$ MPa. The fluid density is 870 kg/m³. Calculate the flow rate.

::: solution
$$
Q \; = \; C _ { d } \, A _ { v } \, { \sqrt { \frac { 2 \, \Delta p } { \rho } } } \; = \; 0 . 6 \times 1 0 \times 1 0 ^ { - 6 } \times { \sqrt { \frac { 2 \times 1 0 \times 1 0 ^ { 6 } } { 8 7 0 } } }
$$

$$
Q \; = \; 6 \times 1 0 ^ { - 6 } \times { \sqrt { 2 2 \ 9 8 9 } } \; = \; 6 \times 1 0 ^ { - 6 } \times 1 5 1 . 6 \; = \; { \bf 0 . 9 1 } \ \text{L/s} \; = \; { \bf 5 4 . 6 } \ \text{L/min}
$$

**The flow rate is 54.6 L/min.**
:::
:::

::: exercise Servo valve bandwidth {#ex-servo-valve-bw level=3 check="2"}
A servo valve has a response time of 2 ms. Calculate the bandwidth.

::: solution
$$
f _ { \text{valve } } \; = \; { \frac { 1 } { 2 \, \pi \, T _ { \text{response } } } } \; = \; { \frac { 1 } { 2 \, \pi \times 2 \times 1 0 ^ { - 3 } } } \; = \; { \bf 7 9 . 6 } \ \text{Hz}
$$

**The bandwidth is 79.6 Hz.**
:::
:::

::: exercise Pneumatic air consumption {#ex-pneumatic-air level=3 check="2"}
A pneumatic cylinder with a 50 mm bore and 200 mm stroke extends in 1 second. The supply pressure is 5 bar (gauge). Calculate the free air consumption per cycle.

::: solution
$$
V _ { \text{cylinder } } \; = \; { \frac { \pi \, d ^ { 2 } } { 4 } } \, L \; = \; { \frac { \pi \times 0 . 0 5 ^ { 2 } } { 4 } } \times 0 . 2 \; = \; 3 . 9 3 \times 1 0 ^ { - 4 } \ \text{m} ^ { 3 }
$$

$$
Q _ { \text{free } } \; = \; V _ { \text{cylinder } } \times { \frac { P + P _ { \text{atm } } } { P _ { \text{atm } } } } \; = \; 3 . 9 3 \times 1 0 ^ { - 4 } \times { \frac { 5 + 1 . 0 1 3 } { 1 . 0 1 3 } } \; = \; { \bf 2 . 3 3 } \times 1 0 ^ { - 3 } \ \text{m} ^ { 3 }
$$

$$
Q _ { \text{free } } \; = \; { \bf 2 . 3 3 } \ \text{L/cycle}
$$

**The free air consumption is 2.33 L/cycle.**
:::
:::

::: exercise Derivation: the hydraulic cylinder force-velocity curve {#ex-derive-force-velocity level=4 check="2"}
Show that the hydraulic cylinder force-velocity curve is derived from the continuity equation and the force balance. Write the expression for the maximum force and the maximum velocity.

::: solution
The **continuity equation** for the cylinder is:

$$
Q \; = \; A \, v \qquad \Rightarrow \qquad v \; = \; { \frac { Q } { A } }
$$

The **force balance** on the piston is:

$$
F \; = \; P \, A - F _ { \text{load } } \; = \; 0 \qquad \Rightarrow \qquad P \; = \; { \frac { F _ { \text{load } } } { A } }
$$

The **pressure-flow relationship** for the pump is:

$$
P \; = \; P _ { \max } - { \frac { P _ { \max } } { Q _ { \max } } } \, Q
$$

Substituting:

$$
F _ { \text{load } } \; = \; A \, \left( P _ { \max } - { \frac { P _ { \max } } { Q _ { \max } } } \, A \, v \right) \; = \; F _ { \max } - { \frac { F _ { \max } } { v _ { \max } } } \, v
$$

**Maximum force** ($v = 0$ ): $F _ { \max } = P _ { \max } \, A$ .

**Maximum velocity** ($F = 0$ ): $v _ { \max } = Q _ { \max } / A$ .

**The force-velocity curve is the reason the fluid power actuator is designed for the force, not the speed, and the force is the reason the fluid power actuator is the most critical component in the force system.** $\blacksquare$
:::
:::

::: exercise Derivation: the valve orifice equation {#ex-derive-orifice level=4 check="2"}
Show that the valve orifice equation $Q = C _ { d } \, A _ { v } \, { \sqrt { 2 \, \Delta p / \rho } }$ is derived from the Bernoulli equation. Write the expression for the discharge coefficient.

::: solution
The **Bernoulli equation** between the upstream (1) and the orifice (2) is:

$$
P _ { 1 } + { \frac { 1 } { 2 } } \, \rho \, v _ { 1 } ^ { 2 } \; = \; P _ { 2 } + { \frac { 1 } { 2 } } \, \rho \, v _ { 2 } ^ { 2 }
$$

Assuming $v _ { 1 } \approx 0$ :

$$
v _ { 2 } \; = \; { \sqrt { \frac { 2 \, ( P _ { 1 } - P _ { 2 } ) } { \rho } } } \; = \; { \sqrt { \frac { 2 \, \Delta p } { \rho } } }
$$

The **ideal flow rate** is:

$$
Q _ { \text{ideal } } \; = \; A _ { v } \, v _ { 2 } \; = \; A _ { v } \, { \sqrt { \frac { 2 \, \Delta p } { \rho } } }
$$

The **actual flow rate** accounts for the vena contracta and friction:

$$
Q \; = \; C _ { d } \, A _ { v } \, { \sqrt { \frac { 2 \, \Delta p } { \rho } } }
$$

where $C _ { d }$ is the **discharge coefficient** ($C _ { d } = 0 . 6 \text{--} 0 . 8$ for a sharp-edged orifice).

**The valve orifice equation is the reason the fluid power actuator is designed for the flow, not the pressure, and the flow is the reason the fluid power actuator is the most critical component in the force system.** $\blacksquare$
:::
:::

::: quiz Fluid power {#quiz-fluid-power}
The most critical parameter in the hydraulic cylinder selection is:

- [ ] The stroke length
- [x] The force-velocity curve
- [ ] The weight
- [ ] The cost

::: solution
**The force-velocity curve.** The force-velocity curve is the reason the fluid power actuator is designed for the force, not the speed, and the force is the reason the fluid power actuator is the most critical component in the force system. The engineer who selects the fluid power actuator without checking the force-velocity curve is not selecting the fluid power actuator; they are guessing.
:::
:::

::: quiz Pneumatic actuators {#quiz-pneumatic}
The free air consumption for a pneumatic cylinder at 6 bar (gauge) is:

- [ ] Equal to the actual flow rate
- [x] 7 times the actual flow rate
- [ ] 6 times the actual flow rate
- [ ] 1/7 of the actual flow rate

::: solution
**7 times the actual flow rate.** The free air consumption is $Q _ { \text{free } } = Q _ { \text{actual } } \times ( P + P _ { \text{atm } } ) / P _ { \text{atm } } = Q _ { \text{actual } } \times 7 . 0 1$ at 6 bar gauge, and the air consumption is the reason the pneumatic actuator is designed for the operating cost, not the force. The engineer who selects the pneumatic actuator without checking the air consumption is not selecting the pneumatic actuator; they are guessing.
:::
:::

## Where this lesson leads

- **[[mechatronics/sensors]]** — The pressure sensor is the foundation of the fluid power system.
- **[[mechatronics/signal-conditioning]]** — The signal conditioning is the foundation of the fluid power system.
- **[[mechatronics/microcontrollers]]** — The microcontroller is the foundation of the valve control.
- **[[mechatronics/motion-control]]** — The fluid power actuator is the foundation of the motion control system.
- **[[mechatronics/system-integration]]** — The fluid power actuator is the foundation of the system integration.
- **[[control-systems/pid-control]]** — The valve control is the foundation of the PID controller.
- **[[fluid-mechanics/bernoulli]]** — The Bernoulli equation is the foundation of the valve orifice equation.
- **[[fluid-mechanics/pipe-flow]]** — The pipe flow is the foundation of the hydraulic system.
- **[[machine-design/clutches-brakes-belts]]** — The hydraulic system is the foundation of the machine design.
- **[[thermodynamics/first-law-closed]]** — The energy balance is the foundation of the hydraulic system.

::: history Fluid power: from the water wheel to the servo valve {#history-fluid-power}
**1850s** — **The first hydraulic press** is built by **Joseph Bramah**, and the hydraulic press is the reason the hydraulic actuator is the oldest concept in fluid power engineering, and the age is the reason the hydraulic actuator is the most refined concept in fluid power engineering.

**1905** — **The first hydraulic turbine** is developed, and the hydraulic turbine is the reason the hydraulic motor is the most widely used motor in engineering. **The hydraulic turbine is the reason the hydraulic motor is the most refined motor in engineering, and the hydraulic motor is the reason the hydraulic turbine is the most widely used motor in engineering.**

**1940s** — **The hydraulic servo valve** is developed for radar antennas, and the servo valve is the reason the hydraulic actuator is the most accurate actuator in engineering. **The servo valve is the reason the hydraulic actuator is the most refined actuator in engineering, and the hydraulic actuator is the reason the servo valve is the most accurate actuator in engineering.**

**1950s** — **The mobile hydraulic system** is developed for construction equipment, and the mobile hydraulic system is the reason the hydraulic actuator is the most widely used actuator in engineering. **The mobile hydraulic system is the reason the hydraulic actuator is the most refined actuator in engineering, and the hydraulic actuator is the reason the mobile hydraulic system is the most widely used actuator in engineering.**

**1960s** — **The electro-hydraulic servo system** is developed for aerospace testing, and the electro-hydraulic servo system is the reason the hydraulic actuator is the most powerful actuator in engineering. **The electro-hydraulic servo system is the reason the hydraulic actuator is the most refined actuator in engineering, and the hydraulic actuator is the reason the electro-hydraulic servo system is the most powerful actuator in engineering.**

**1970s** — **The proportional valve** is developed, and the proportional valve is the reason the hydraulic actuator is the most widely used actuator in industry. **The proportional valve is the reason the hydraulic actuator is the most refined actuator in engineering, and the hydraulic actuator is the reason the proportional valve is the most widely used actuator in industry.**

**1980s** — **The pneumatic proportional valve** is developed, and the pneumatic proportional valve is the reason the pneumatic actuator is the most widely used actuator in automation. **The pneumatic proportional valve is the reason the pneumatic actuator is the most refined actuator in engineering, and the pneumatic actuator is the reason the pneumatic proportional valve is the most widely used actuator in automation.**

**2000s** — **The digital hydraulic valve** is developed, and the digital hydraulic valve is the reason the hydraulic actuator is the most energy-efficient actuator in engineering. **The digital hydraulic valve is the reason the hydraulic actuator is the most refined actuator in engineering, and the hydraulic actuator is the reason the digital hydraulic valve is the most energy-efficient actuator in engineering.**
:::

::: summary Hydraulic and pneumatic actuators {#summary-fluid-power}
- **The hydraulic cylinder force is $F = P \, A = P \, \pi \, d ^ { 2 } / 4$ (cap end).** The force-velocity curve is the reason the fluid power actuator is designed for the force, not the speed, and the force is the reason the fluid power actuator is the most critical component in the force system.
- **The hydraulic cylinder velocity is $v = Q / A = 4 \, Q / ( \pi \, d ^ { 2 } )$ .** The flow rate is the reason the fluid power actuator is designed for the speed, not the force, and the speed is the reason the fluid power actuator is the most critical component in the force system.
- **The hydraulic power is $P _ { \text{hyd } } = P \, Q = F \, v$ .** The hydraulic power is the reason the fluid power actuator is designed for the force, not the speed.
- **The hydraulic motor torque is $T = \Delta p \, D \, \eta _ { m } / ( 2 \, \pi )$ , and the speed is $n = Q \, \eta _ { v } / D$ .** The pressure rating is the reason the fluid power actuator is designed for the pressure, not the flow, and the pressure is the reason the fluid power actuator is the most critical component in the force system.
- **The pneumatic cylinder force is $F = P \, A$ , and the free air consumption is $Q _ { \text{free } } = Q _ { \text{actual } } \, ( P + P _ { \text{atm } } ) / P _ { \text{atm } }$ .** The air consumption is the reason the pneumatic actuator is designed for the operating cost, not the force, and the operating cost is the reason the pneumatic actuator is the most critical component in the force system.
- **The valve flow is $Q = C _ { d } \, A _ { v } \, { \sqrt { 2 \, \Delta p / \rho } }$ , and the valve bandwidth is $f _ { \text{valve } } = 1 / ( 2 \, \pi \, T _ { \text{response } } )$ .** The valve response time is the reason the fluid power actuator is designed for the bandwidth, not the force, and the bandwidth is the reason the fluid power actuator is the most critical component in the force system.
- **The servo valve response time is 1-5 ms, and the bandwidth is 50-200 Hz.** The servo valve is the most accurate valve in engineering, and the accuracy is the reason the servo valve is the most widely used valve in the precision control system.
- **The piezo valve response time is 0.1-1 ms, and the bandwidth is 200-1000 Hz.** The piezo valve is the fastest valve in engineering, and the speed is the reason the piezo valve is the most widely used valve in the high-speed control system.
- **The fluid power actuator selection is the most important selection in mechatronic system design, because the fluid power actuator selection determines the force of the machine.** The force is the reason the engineer can design the force system to be safe.
- **The fluid power system is the reason the fluid power actuator is designed for the force, not the speed.** The force is the reason the fluid power actuator is the most critical component in the force system.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The hydraulic cylinder, the pneumatic cylinder, and the valve control.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The fluid power actuator and the valve control.
- **A. Esposito (2000)** — *Fluid Power with Applications*, 7th ed. Prentice-Hall. The hydraulic cylinder, the hydraulic motor, and the valve control.
- **N.P. Moghaddam (2012)** — *Fundamentals and Applications of Fluid Power*. CRC Press. The fluid power actuator and the valve control.
- **H.E. Meritt (1967)** — *Hydraulic Control Systems*. Wiley. The hydraulic servo system and the valve control.
- **D.R. Baehr and K.W. Schlicht (2005)** — *Hydraulic Control Systems*. Springer. The hydraulic actuator and the valve control.
- **J.J. O'Brien (2010)** — *Pneumatics: Basic and Advanced*. Festo Didactic. The pneumatic actuator and the valve control.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The fluid power actuator and the valve control.
