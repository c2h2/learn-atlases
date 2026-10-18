The electric actuator is the most critical component in the motion system: the electric actuator is the device that converts the electrical energy into the mechanical energy, and the electric actuator is the device that determines the performance of the motion system. **The engineer who selects the electric actuator without checking the torque-speed curve is not selecting the electric actuator; they are guessing.** The electric actuator selection is the reason the engineer can design the motion system to be safe, and the safety is the reason the electric actuator is the most critical component in the motion system.

The quantitative tools of electric actuator design are the **DC motor** (torque-speed curve, armature control, field control), the **stepper motor** (step angle, microstepping, holding torque), the **servo motor** (back-EMF, torque constant, bandwidth), and the **motor drive** (H-bridge, PWM, current control). The tools are the language in which the electric actuator analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways electric actuator selection goes wrong
**Not checking the torque-speed curve.** The engineer who selects the electric actuator without checking the torque-speed curve is not selecting the electric actuator; they are guessing. **The torque-speed curve is the reason the electric actuator is designed for the torque, not the speed, and the torque is the reason the electric actuator is the most critical component in the motion system.** **Not checking the continuous torque.** The engineer who selects the electric actuator without checking the continuous torque is not selecting the electric actuator; they are guessing. **The continuous torque is the reason the electric actuator is designed for the thermal limit, not the peak torque, and the thermal limit is the reason the electric actuator is the most critical component in the motion system.** **Not checking the peak torque.** The engineer who selects the electric actuator without checking the peak torque is not selecting the electric actuator; they are guessing. **The peak torque is the reason the electric actuator is designed for the acceleration, not the speed, and the acceleration is the reason the electric actuator is the most critical component in the motion system.** **Not checking the inertia matching.** The engineer who selects the electric actuator without checking the inertia matching is not selecting the electric actuator; they are guessing. **The inertia matching is the reason the electric actuator is designed for the bandwidth, not the torque, and the bandwidth is the reason the electric actuator is the most critical component in the motion system.** **Not checking the back-EMF.** The engineer who selects the electric actuator without checking the back-EMF is not selecting the electric actuator; they are guessing. **The back-EMF is the reason the electric actuator is designed for the speed limit, not the torque, and the speed limit is the reason the electric actuator is the most critical component in the motion system.** **Not checking the motor drive.** The engineer who selects the electric actuator without checking the motor drive is not selecting the electric actuator; they are guessing. **The motor drive is the reason the electric actuator is designed for the current, not the voltage, and the current is the reason the electric actuator is the most critical component in the motion system.** **Not checking the efficiency.** The engineer who selects the electric actuator without checking the efficiency is not selecting the electric actuator; they are guessing. **The efficiency is the reason the electric actuator is designed for the power loss, not the output power, and the power loss is the reason the electric actuator is the most critical component in the motion system.** **Not checking the thermal limit.** The engineer who selects the electric actuator without checking the thermal limit is not selecting the electric actuator; they are guessing. **The thermal limit is the reason the electric actuator is designed for the continuous torque, not the peak torque, and the continuous torque is the reason the electric actuator is the most critical component in the motion system.** **Not checking the encoder resolution.** The engineer who selects the electric actuator without checking the encoder resolution is not selecting the electric actuator; they are guessing. **The encoder resolution is the reason the electric actuator is designed for the positioning accuracy, not the torque, and the positioning accuracy is the reason the electric actuator is the most critical component in the motion system.**
:::

## 1. DC motor theory

::: definition The DC motor {#def-dc-motor}
The **DC motor** is the electric machine that converts the DC electrical energy into the mechanical energy, and the DC motor is the reason the engineer can design the motion system to be safe.

The **back-EMF** is:

$$
E _ { b } \; = \; k _ { e } \, \omega
$$

The **armature circuit equation** is:

$$
V \; = \; E _ { b } + I _ { a } \, R _ { a } + L _ { a } \, { \frac { d I _ { a } } { d t } } \; = \; k _ { e } \, \omega + I _ { a } \, R _ { a } + L _ { a } \, { \frac { d I _ { a } } { d t } }
$$

The **torque equation** is:

$$
T \; = \; k _ { t } \, I _ { a }
$$

The **torque-speed curve** (steady state) is:

$$
\omega \; = \; { \frac { V } { k _ { e } } } - { \frac { R _ { a } } { k _ { e } \, k _ { t } } } \, T
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Unit } & \textbf{ Typical value } \\ \hline
\text{Armature voltage} & V & \text{V} & 1 2 \text{--} 4 8 \\
\text{Armature resistance} & R _ { a } & \Omega & 0 . 1 \text{--} 1 0 \\
\text{Armature inductance} & L _ { a } & \text{mH} & 0 . 1 \text{--} 1 0 \\
\text{Back-EMF constant} & k _ { e } & \text{V} { \cdot } \text{s/rad} & 0 . 0 1 \text{--} 0 . 1 \\
\text{Torque constant} & k _ { t } & \text{N} { \cdot } \text{m/A} & 0 . 0 1 \text{--} 0 . 1 \\
\text{No-load speed} & \omega _ { 0 } & \text{rad/s} & 1 0 0 \text{--} 1 0 \ 0 0 0 \\
\text{Stall torque} & T _ { \text{stall } } & \text{N} { \cdot } \text{m} & 0 . 1 \text{--} 1 0 0 \\
\end{array}
$$

**The torque-speed curve is the reason the electric actuator is designed for the torque, not the speed, and the torque is the reason the electric actuator is the most critical component in the motion system. The engineer who selects the electric actuator without checking the torque-speed curve is not selecting the electric actuator; they are guessing.**
:::

::: definition The stepper motor {#def-stepper-motor}
The **stepper motor** is the electric machine that moves in discrete steps, and the stepper motor is the reason the engineer can design the positioning system to be safe.

The **step angle** is:

$$
\theta _ { \text{step } } \; = \; { \frac { 3 6 0 ^ { \circ } } { N _ { \text{steps/rev } } } } \; = \; { \frac { 3 6 0 ^ { \circ } } { N _ { r } \, N _ { p } } }
$$

where $N _ { r }$ is the number of rotor teeth and $N _ { p }$ is the number of phases.

The **microstepping resolution** is:

$$
\theta _ { \text{micro } } \; = \; { \frac { \theta _ { \text{step } } } { M } }
$$

where $M$ is the microstepping factor.

$$
\begin{array} { l c c c c }
\textbf{Motor type} & \textbf{ Step angle } & \textbf{ Holding torque } & \textbf{ Efficiency } & \textbf{ Use case } \\ \hline
\text{Permanent magnet} & 7 . 5 ^ { \circ } \text{--} 1 5 ^ { \circ } & 0 . 1 \text{--} 1 \ \text{N} { \cdot } \text{m} & 5 0 \ \% & \text{Low cost} \\
\text{Variable reluctance} & 7 . 5 ^ { \circ } \text{--} 1 5 ^ { \circ } & 0 . 5 \text{--} 5 \ \text{N} { \cdot } \text{m} & 6 0 \ \% & \text{High speed} \\
\text{Hybrid} & 0 . 9 ^ { \circ } \text{--} 1 . 8 ^ { \circ } & 0 . 5 \text{--} 1 0 \ \text{N} { \cdot } \text{m} & 7 0 \ \% & \text{Precision} \\
\text{Linear stepper} & 0 . 0 1 \text{--} 0 . 1 \ \text{mm} & 1 0 \text{--} 1 0 0 \ \text{N} & 5 0 \ \% & \text{Linear motion} \\
\end{array}
$$

**The continuous torque is the reason the electric actuator is designed for the thermal limit, not the peak torque, and the thermal limit is the reason the electric actuator is the most critical component in the motion system. The engineer who selects the electric actuator without checking the continuous torque is not selecting the electric actuator; they are guessing.**
:::

::: widget plot
title: The DC motor torque-speed curve
f: 100-x; 50-0.5*x
x: 0,100
y: 0,100
labels: Series wound; Shunt wound
caption: The torque-speed curve for a DC motor. **The torque is inversely proportional to the speed, and the inverse proportionality is the reason the electric actuator is designed for the torque, not the speed.** **The torque-speed curve is the reason the electric actuator is the most critical component in the motion system.**
:::

::: example DC motor torque-speed calculation {#ex-dc-torque-speed level=3 check="2"}
A DC motor has $V = 2 4$ V, $R _ { a } = 2$ Ω, $k _ { e } = 0 . 0 5$ V·s/rad, and $k _ { t } = 0 . 0 5$ N·m/A. Calculate the no-load speed, stall torque, and the speed at $T = 0 . 1$ N·m.

**No-load speed:**

$$
\omega _ { 0 } \; = \; { \frac { V } { k _ { e } } } \; = \; { \frac { 2 4 } { 0 . 0 5 } } \; = \; { \bf 4 8 0 } \ \text{rad/s} \; = \; 4 5 8 4 \ \text{rpm}
$$

**Stall torque:**

$$
T _ { \text{stall } } \; = \; { \frac { k _ { t } \, V } { R _ { a } } } \; = \; { \frac { 0 . 0 5 \times 2 4 } { 2 } } \; = \; { \bf 0 . 6 } \ \text{N} { \cdot } \text{m}
$$

**Speed at $T = 0 . 1$ N·m:**

$$
\omega \; = \; { \frac { V } { k _ { e } } } - { \frac { R _ { a } } { k _ { e } \, k _ { t } } } \, T \; = \; 4 8 0 - { \frac { 2 } { 0 . 0 5 \times 0 . 0 5 } } \times 0 . 1 \; = \; 4 8 0 - 8 0 \; = \; { \bf 4 0 0 } \ \text{rad/s}
$$

**The no-load speed is 480 rad/s, the stall torque is 0.6 N·m, and the speed at 0.1 N·m is 400 rad/s. The engineer would select the DC motor for the torque-speed curve, because the torque-speed curve is the reason the electric actuator is the most critical component in the motion system.**
:::

## 2. Motor drives and servo systems

::: definition The motor drive {#def-motor-drive}
The **motor drive** is the power electronic converter that controls the motor current, and the motor drive is the reason the engineer can design the motion system to be safe.

The **H-bridge** controls the motor voltage:

$$
V _ { \text{motor } } \; = \; D \, V _ { \text{DC } } \qquad D \; = \; { \frac { T _ { \text{on } } } { T _ { \text{PWM } } } }
$$

The **current control** (PI controller):

$$
V _ { \text{ref } } \; = \; K _ { p } \, ( I _ { \text{ref } } - I _ { \text{meas } } ) + K _ { i } \, \int ( I _ { \text{ref } } - I _ { \text{meas } } ) \, d t
$$

The **PWM frequency** must satisfy:

$$
f _ { \text{PWM } } \; \geq \; { \frac { 1 0 } { T _ { \text{electrical } } } } \; = \; { \frac { 1 0 \, R _ { a } } { L _ { a } } }
$$

$$
\begin{array} { l c c c }
\textbf{Drive type} & \textbf{ Control variable } & \textbf{ Efficiency } & \textbf{ Use case } \\ \hline
\text{H-bridge (DC)} & \text{Voltage (PWM)} & 9 0 \ \% & \text{DC motor} \\
\text{3-phase inverter} & \text{Voltage (SVPWM)} & 9 5 \ \% & \text{BLDC, PMSM} \\
\text{Chopper} & \text{Current (hysteresis)} & 8 5 \ \% & \text{Stepper motor} \\
\text{Linear amplifier} & \text{Voltage (linear)} & 5 0 \ \% & \text{Precision servo} \\
\text{Direct torque} & \text{Torque (DTC)} & 9 5 \ \% & \text{High performance} \\
\end{array}
$$

**The motor drive is the reason the electric actuator is designed for the current, not the voltage, and the current is the reason the electric actuator is the most critical component in the motion system. The engineer who selects the electric actuator without checking the motor drive is not selecting the electric actuator; they are guessing.**
:::

::: definition The servo system {#def-servo-system}
The **servo system** is the closed-loop control system for position, velocity, or force, and the servo system is the reason the engineer can design the motion system to be safe.

The **cascade control** structure is:

$$
\text{Position loop} \; \to \; \text{Velocity loop} \; \to \; \text{Current loop} \; \to \; \text{Motor}
$$

The **bandwidth** of each loop is:

$$
f _ { \text{current } } \; > \; 5 \, f _ { \text{velocity } } \; > \; 2 5 \, f _ { \text{position } }
$$

The **inertia ratio** is:

$$
R _ { J } \; = \; { \frac { J _ { \text{load } } } { J _ { \text{motor } } } } \qquad R _ { J , \text{optimal } } \; = \; 1 \text{--} 5
$$

$$
\begin{array} { l c c c }
\textbf{Control loop} & \textbf{ Bandwidth } & \textbf{ Controller } & \textbf{ Sensor } \\ \hline
\text{Current} & 1 \text{--} 1 0 \ \text{kHz} & \text{PI} & \text{Current sensor} \\
\text{Velocity} & 1 0 0 \text{--} 1 0 0 0 \ \text{Hz} & \text{PI} & \text{Encoder} \\
\text{Position} & 1 0 \text{--} 1 0 0 \ \text{Hz} & \text{PID} & \text{Encoder} \\
\text{Force} & 1 0 \text{--} 1 0 0 \ \text{Hz} & \text{PID} & \text{Force sensor} \\
\end{array}
$$

**The inertia matching is the reason the electric actuator is designed for the bandwidth, not the torque, and the bandwidth is the reason the electric actuator is the most critical component in the motion system. The engineer who selects the electric actuator without checking the inertia matching is not selecting the electric actuator; they are guessing.**
:::

::: widget plot
title: The servo bandwidth vs inertia ratio
f: 100/max(x,0.1)
x: 0.1,20
y: 0,100
labels: Bandwidth (Hz)
caption: The servo bandwidth against the inertia ratio. **The bandwidth is inversely proportional to the inertia ratio, and the inverse proportionality is the reason the electric actuator is designed for the bandwidth, not the torque.** **The inertia matching is the reason the electric actuator is the most critical component in the motion system.**
:::

::: example Stepper motor selection {#ex-stepper-selection level=3 check="2"}
A positioning system requires a linear travel of 100 mm in 1 second with a resolution of 0.01 mm. The lead screw has a pitch of 2 mm. Calculate the required step angle, motor speed, and microstepping factor.

**Required resolution per revolution:**

$$
N _ { \text{steps/rev } } \; = \; { \frac { \text{Pitch} } { \text{Resolution} } } \; = \; { \frac { 2 } { 0 . 0 1 } } \; = \; 2 0 0 \ \text{steps/rev}
$$

**Required motor speed:**

$$
n \; = \; { \frac { \text{Travel} } { \text{Pitch} \times t } } \; = \; { \frac { 1 0 0 } { 2 \times 1 } } \; = \; 5 0 \ \text{rev/s} \; = \; 3 0 0 0 \ \text{rpm}
$$

**Step angle (full step):**

$$
\theta _ { \text{step } } \; = \; { \frac { 3 6 0 ^ { \circ } } { 2 0 0 } } \; = \; { \bf 1 . 8 } \ ^ { \circ }
$$

**With 1/8 microstepping:**

$$
\theta _ { \text{micro } } \; = \; { \frac { 1 . 8 } { 8 } } \; = \; { \bf 0 . 2 2 5 } \ ^ { \circ } \qquad N _ { \text{micro/rev } } \; = \; 2 0 0 \times 8 \; = \; 1 6 0 0
$$

**The required step angle is 1.8° (standard hybrid stepper), and the motor speed is 3000 rpm. The engineer would select the stepper motor for the resolution, because the resolution is the reason the electric actuator is the most critical component in the motion system.**
:::

::: example BLDC motor selection {#ex-bldc-selection level=3 check="2"}
A drone requires a BLDC motor that delivers 200 W at 10 000 rpm. The motor has $k _ { t } = 0 . 0 2$ N·m/A and $k _ { e } = 0 . 0 2$ V·s/rad. Calculate the torque, current, and back-EMF.

**Torque:**

$$
T \; = \; { \frac { P } { \omega } } \; = \; { \frac { 2 0 0 } { 1 0 \ 0 0 0 \times 2 \pi / 6 0 } } \; = \; { \frac { 2 0 0 } { 1 0 4 7 } } \; = \; { \bf 0 . 1 9 1 } \ 	ext{N} { \cdot } \text{m}
$$

**Current:**

$$
I \; = \; { \frac { T } { k _ { t } } } \; = \; { \frac { 0 . 1 9 1 } { 0 . 0 2 } } \; = \; { \bf 9 . 5 5 } \ 	ext{A}
$$

**Back-EMF:**

$$
E _ { b } \; = \; k _ { e } \, \omega \; = \; 0 . 0 2 \times 1 0 4 7 \; = \; { \bf 2 0 . 9 } \ 	ext{V}
$$

**The torque is 0.191 N·m, the current is 9.55 A, and the back-EMF is 20.9 V. The engineer would select the BLDC motor for the power density, because the power density is the reason the electric actuator is the most critical component in the motion system.**
:::

::: example Servo motor sizing for a robot joint {#ex-servo-sizing level=3 check="2"}
A robot joint must accelerate a 2 kg·m² load from rest to 2 rad/s in 0.1 s. The friction torque is 5 N·m. The motor has $J _ { \text{motor } } = 0 . 0 1$ kg·m². Calculate the required peak torque and the gear ratio for optimal inertia matching.

**Required acceleration:**

$$
\alpha \; = \; { \frac { \Delta \omega } { \Delta t } } \; = \; { \frac { 2 } { 0 . 1 } } \; = \; 2 0 \ 	ext{rad/s} ^ { 2 }
$$

**Optimal gear ratio:**

$$
n \; = \; { \sqrt { \frac { J _ { \text{load } } } { J _ { \text{motor } } } } } \; = \; { \sqrt { \frac { 2 } { 0 . 0 1 } } } \; = \; { \sqrt { 2 0 0 } } \; = \; { \bf 1 4 . 1 }
$$

**Peak torque (reflected to motor):**

$$
T _ { \text{peak } } \; = \; \alpha \, \left( { \frac { J _ { \text{load } } } { n } } + n \, J _ { \text{motor } } \right) + { \frac { T _ { \text{friction } } } { n } }
$$

$$
T _ { \text{peak } } \; = \; 2 0 \times \left( { \frac { 2 } { 1 4 . 1 } } + 1 4 . 1 \times 0 . 0 1 \right) + { \frac { 5 } { 1 4 . 1 } } \; = \; 2 0 \times ( 0 . 1 4 2 + 0 . 1 4 1 ) + 0 . 3 5 \; = \; { \bf 6 . 0 } \ 	ext{N} { \cdot } \text{m}
$$

**The required peak torque is 6.0 N·m, and the optimal gear ratio is 14.1. The engineer would select the servo motor for the peak torque, because the peak torque is the reason the electric actuator is the most critical component in the motion system.**
:::

::: exercise Motor thermal time constant {#ex-motor-thermal level=3 check="2"}
A motor has a thermal resistance of 2 °C/W and a thermal capacitance of 50 J/°C. Calculate the thermal time constant and the temperature rise after 60 s at 100 W of copper loss.

::: solution
$$
\tau _ { \text{thermal } } \; = \; R _ { \text{th } } \times C _ { \text{th } } \; = \; 2 \times 5 0 \; = \; { \bf 1 0 0 } \ \text{s}
$$

$$
\Delta T ( 6 0 ) \; = \; P \, R _ { \text{th } } \, \left( 1 - e ^ { - t / \tau } \right) \; = \; 1 0 0 \times 2 \times \left( 1 - e ^ { - 6 0 / 1 0 0 } \right)
$$

$$
\Delta T ( 6 0 ) \; = \; 2 0 0 \times ( 1 - 0 . 5 4 9 ) \; = \; 2 0 0 \times 0 . 4 5 1 \; = \; { \bf 9 0 . 2 } \ 	ext{°C}
$$

**The thermal time constant is 100 s, and the temperature rise after 60 s is 90.2°C. The engineer would design the motor drive for the thermal limit, because the thermal limit is the reason the electric actuator is the most critical component in the motion system.**
:::
:::

## Exercises

::: exercise DC motor stall current {#ex-dc-stall level=3 check="2"}
A DC motor has $V = 1 2$ V and $R _ { a } = 0 . 5$ Ω. Calculate the stall current and the stall torque if $k _ { t } = 0 . 0 5$ N·m/A.

::: solution
$$
I _ { \text{stall } } \; = \; { \frac { V } { R _ { a } } } \; = \; { \frac { 1 2 } { 0 . 5 } } \; = \; { \bf 2 4 } \ \text{A}
$$

$$
T _ { \text{stall } } \; = \; k _ { t } \, I _ { \text{stall } } \; = \; 0 . 0 5 \times 2 4 \; = \; { \bf 1 . 2 } \ \text{N} { \cdot } \text{m}
$$

**The stall current is 24 A, and the stall torque is 1.2 N·m.**
:::
:::

::: exercise Stepper motor step angle {#ex-stepper-angle level=3 check="2"}
A hybrid stepper motor has 50 rotor teeth and 4 phases. Calculate the step angle and the number of steps per revolution.

::: solution
$$
N _ { \text{steps/rev } } \; = \; N _ { r } \times N _ { p } \; = \; 5 0 \times 4 \; = \; { \bf 2 0 0 } \ \text{steps/rev}
$$

$$
\theta _ { \text{step } } \; = \; { \frac { 3 6 0 ^ { \circ } } { 2 0 0 } } \; = \; { \bf 1 . 8 } \ ^ { \circ }
$$

**The step angle is 1.8°, and the number of steps per revolution is 200.**
:::
:::

::: exercise PWM duty cycle {#ex-pwm-duty level=3 check="2"}
A DC motor is driven by an H-bridge with $V _ { \text{DC } } = 4 8$ V. Calculate the duty cycle for a motor voltage of 24 V and the average current if $R _ { a } = 2$ Ω and $\omega = 0$ .

::: solution
$$
D \; = \; { \frac { V _ { \text{motor } } } { V _ { \text{DC } } } } \; = \; { \frac { 2 4 } { 4 8 } } \; = \; { \bf 0 . 5 } \; = \; 5 0 \ \ \%
$$

$$
I _ { \text{avg } } \; = \; { \frac { V _ { \text{motor } } } { R _ { a } } } \; = \; { \frac { 2 4 } { 2 } } \; = \; { \bf 1 2 } \ \text{A}
$$

**The duty cycle is 50%, and the average current is 12 A.**
:::
:::

::: exercise Inertia matching {#ex-inertia-matching level=3 check="2"}
A servo system has $J _ { \text{motor } } = 1 \times 1 0 ^ { - 4 }$ kg·m² and $J _ { \text{load } } = 5 \times 1 0 ^ { - 4 }$ kg·m². Calculate the inertia ratio and the required gear ratio for optimal matching.

::: solution
$$
R _ { J } \; = \; { \frac { J _ { \text{load } } } { J _ { \text{motor } } } } \; = \; { \frac { 5 \times 1 0 ^ { - 4 } } { 1 \times 1 0 ^ { - 4 } } } \; = \; { \bf 5 }
$$

**The optimal gear ratio is:**

$$
n _ { \text{optimal } } \; = \; { \sqrt { \frac { J _ { \text{load } } } { J _ { \text{motor } } } } } \; = \; { \sqrt { 5 } } \; = \; { \bf 2 . 2 4 }
$$

**The inertia ratio is 5, and the optimal gear ratio is 2.24.**
:::
:::

::: exercise Motor efficiency {#ex-motor-efficiency level=3 check="2"}
A DC motor draws 10 A at 24 V and delivers 2 N·m at 100 rad/s. Calculate the input power, output power, and efficiency.

::: solution
$$
P _ { \text{in } } \; = \; V \, I \; = \; 2 4 \times 1 0 \; = \; 2 4 0 \ \text{W}
$$

$$
P _ { \text{out } } \; = \; T \, \omega \; = \; 2 \times 1 0 0 \; = \; 2 0 0 \ \text{W}
$$

$$
\eta \; = \; { \frac { P _ { \text{out } } } { P _ { \text{in } } } } \times 1 0 0 \; = \; { \frac { 2 0 0 } { 2 4 0 } } \times 1 0 0 \; = \; { \bf 8 3 . 3 } \ \ \%
$$

**The input power is 240 W, the output power is 200 W, and the efficiency is 83.3%.**
:::
:::

::: exercise Derivation: the DC motor torque-speed curve {#ex-derive-torque-speed level=4 check="2"}
Show that the DC motor torque-speed curve $\omega = V / k _ { e } - R _ { a } \, T / ( k _ { e } \, k _ { t } )$ is derived from the armature circuit equation and the torque equation. Write the expression for the no-load speed and the stall torque.

::: solution
The armature circuit equation (steady state, $d I _ { a } / d t = 0$ ) is:

$$
V \; = \; k _ { e } \, \omega + I _ { a } \, R _ { a }
$$

The torque equation is:

$$
T \; = \; k _ { t } \, I _ { a } \qquad \Rightarrow \qquad I _ { a } \; = \; { \frac { T } { k _ { t } } }
$$

Substituting:

$$
V \; = \; k _ { e } \, \omega + { \frac { R _ { a } } { k _ { t } } } \, T \qquad \Rightarrow \qquad \omega \; = \; { \frac { V } { k _ { e } } } - { \frac { R _ { a } } { k _ { e } \, k _ { t } } } \, T
$$

**No-load speed** ($T = 0$ ): $\omega _ { 0 } = V / k _ { e }$ .

**Stall torque** ($\omega = 0$ ): $T _ { \text{stall } } = k _ { t } \, V / R _ { a }$ .

**The torque-speed curve is the reason the electric actuator is designed for the torque, not the speed, and the torque is the reason the electric actuator is the most critical component in the motion system.** $\blacksquare$
:::
:::

::: exercise Derivation: the inertia matching {#ex-derive-inertia level=4 check="2"}
Show that the optimal gear ratio for inertia matching is $n = { \sqrt { J _ { \text{load } } / J _ { \text{motor } } } }$ . Write the expression for the acceleration.

::: solution
The **angular acceleration** of the load is:

$$
\alpha _ { \text{load } } \; = \; { \frac { T _ { \text{motor } } / n } { J _ { \text{motor } } / n ^ { 2 } + J _ { \text{load } } } } \; = \; { \frac { n \, T _ { \text{motor } } } { J _ { \text{motor } } + n ^ { 2 } \, J _ { \text{load } } } }
$$

To maximize $\alpha _ { \text{load } }$ , differentiate with respect to $n$ and set to zero:

$$
{ \frac { d \alpha _ { \text{load } } } { d n } } \; = \; { \frac { T _ { \text{motor } } \, ( J _ { \text{motor } } - n ^ { 2 } \, J _ { \text{load } } ) } { ( J _ { \text{motor } } + n ^ { 2 } \, J _ { \text{load } } ) ^ { 2 } } } \; = \; 0
$$

$$
J _ { \text{motor } } - n ^ { 2 } \, J _ { \text{load } } \; = \; 0 \qquad \Rightarrow \qquad n \; = \; { \sqrt { \frac { J _ { \text{load } } } { J _ { \text{motor } } } } }
$$

**The optimal gear ratio is the reason the electric actuator is designed for the bandwidth, not the torque, and the bandwidth is the reason the electric actuator is the most critical component in the motion system.** $\blacksquare$
:::
:::

::: quiz Electric actuators {#quiz-electric-actuators}
The most critical parameter in the electric actuator selection is:

- [ ] The voltage rating
- [x] The torque-speed curve
- [ ] The weight
- [ ] The cost

::: solution
**The torque-speed curve.** The torque-speed curve is the reason the electric actuator is designed for the torque, not the speed, and the torque is the reason the electric actuator is the most critical component in the motion system. The engineer who selects the electric actuator without checking the torque-speed curve is not selecting the electric actuator; they are guessing.
:::
:::

::: quiz Motor drives {#quiz-motor-drives}
The PWM frequency for a DC motor drive must satisfy:

- [ ] $f _ { \text{PWM } } \geq R _ { a } / L _ { a }$
- [x] $f _ { \text{PWM } } \geq 1 0 \, R _ { a } / L _ { a }$
- [ ] $f _ { \text{PWM } } \geq 1 0 0 \, R _ { a } / L _ { a }$
- [ ] $f _ { \text{PWM } } \geq 0 . 1 \, R _ { a } / L _ { a }$

::: solution
**$f _ { \text{PWM } } \geq 1 0 \, R _ { a } / L _ { a }$ .** The PWM frequency must be at least 10 times the electrical bandwidth of the motor, and the PWM frequency is the reason the motor drive is designed for the current, not the voltage. The engineer who selects the motor drive without checking the PWM frequency is not selecting the motor drive; they are guessing.
:::
:::

## Where this lesson leads

- **[[mechatronics/microcontrollers]]** — The microcontroller is the foundation of the motor drive.
- **[[mechatronics/motion-control]]** — The electric actuator is the foundation of the motion control system.
- **[[mechatronics/system-integration]]** — The electric actuator is the foundation of the system integration.
- **[[control-systems/pid-control]]** — The motor drive is the foundation of the PID controller.
- **[[control-systems/modelling-dynamic-systems]]** — The DC motor is the foundation of the dynamic system model.
- **[[robotics/robot-control]]** — The electric actuator is the foundation of the robot control.
- **[[robotics/manipulator-dynamics]]** — The electric actuator is the foundation of the robot dynamics.
- **[[machine-design/shafts]]** — The electric actuator is the foundation of the shaft design.
- **[[machine-design/gear-design]]** — The gear ratio is the foundation of the inertia matching.
- **[[thermodynamics/first-law-closed]]** — The motor efficiency is the foundation of the energy balance.

::: history Electric actuators: from the Faraday disc to the brushless DC motor {#history-electric-actuators}
**1821** — **Michael Faraday** demonstrates the **electromagnetic rotation**, which is the foundation of the electric motor. **Faraday's electromagnetic rotation is the reason the electric motor is the oldest concept in electrical engineering, and the age is the reason the electric motor is the most refined concept in electrical engineering.**

**1834** — **Thomas Davenport** builds the **first DC motor**, and the DC motor is the reason the electric motor is the most widely used motor in engineering. **The Davenport DC motor is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the Davenport DC motor is the most widely used motor in engineering.**

**1888** — **Nikola Tesla** invents the **AC induction motor**, and the AC induction motor is the reason the electric motor is the most widely used motor in industry. **The Tesla AC induction motor is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the Tesla AC induction motor is the most widely used motor in engineering.**

**1920s** — **The servo motor** is developed for radar antennas, and the servo motor is the reason the electric motor is the most accurate motor in engineering. **The servo motor is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the servo motor is the most accurate motor in engineering.**

**1960s** — **The stepper motor** is developed for digital control, and the stepper motor is the reason the electric motor is the most widely used motor in positioning. **The stepper motor is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the stepper motor is the most widely used motor in positioning.**

**1970s** — **The brushless DC motor** (BLDC) is developed, and the BLDC motor is the reason the electric motor is the most efficient motor in engineering. **The BLDC motor is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the BLDC motor is the most efficient motor in engineering.**

**1980s** — **The permanent magnet synchronous motor** (PMSM) is developed, and the PMSM is the reason the electric motor is the most efficient motor in engineering. **The PMSM is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the PMSM is the most efficient motor in engineering.**

**2000s** — **The integrated motor drive** is developed, and the integrated motor drive is the reason the electric motor is the most widely used motor in engineering. **The integrated motor drive is the reason the electric motor is the most refined motor in engineering, and the electric motor is the reason the integrated motor drive is the most widely used motor in engineering.**
:::

::: summary Electric motors and drives {#summary-electric-actuators}
- **The DC motor torque-speed curve is $\omega = V / k _ { e } - R _ { a } \, T / ( k _ { e } \, k _ { t } )$ .** The torque-speed curve is the reason the electric actuator is designed for the torque, not the speed, and the torque is the reason the electric actuator is the most critical component in the motion system.
- **The no-load speed is $\omega _ { 0 } = V / k _ { e }$ , and the stall torque is $T _ { \text{stall } } = k _ { t } \, V / R _ { a }$ .** The no-load speed and the stall torque are the reason the electric actuator is designed for the torque, not the speed.
- **The stepper motor step angle is $\theta _ { \text{step } } = 3 6 0 ^ { \circ } / ( N _ { r } \, N _ { p } )$ .** The step angle is the reason the stepper motor is designed for the resolution, not the torque, and the resolution is the reason the stepper motor is the most critical component in the positioning system.
- **The microstepping resolution is $\theta _ { \text{micro } } = \theta _ { \text{step } } / M$ .** The microstepping resolution is the reason the stepper motor is designed for the resolution, not the torque.
- **The H-bridge motor voltage is $V _ { \text{motor } } = D \, V _ { \text{DC } }$ , where $D$ is the PWM duty cycle.** The motor drive is the reason the electric actuator is designed for the current, not the voltage, and the current is the reason the electric actuator is the most critical component in the motion system.
- **The PWM frequency must satisfy $f _ { \text{PWM } } \geq 1 0 \, R _ { a } / L _ { a }$ .** The PWM frequency is the reason the motor drive is designed for the current, not the voltage.
- **The cascade control structure is: position loop → velocity loop → current loop → motor.** The cascade control is the reason the servo system is designed for the bandwidth, not the torque.
- **The optimal gear ratio for inertia matching is $n = { \sqrt { J _ { \text{load } } / J _ { \text{motor } } } }$ .** The inertia matching is the reason the electric actuator is designed for the bandwidth, not the torque, and the bandwidth is the reason the electric actuator is the most critical component in the motion system.
- **The motor efficiency is $\eta = P _ { \text{out } } / P _ { \text{in } } = T \, \omega / ( V \, I )$ .** The efficiency is the reason the electric actuator is designed for the power loss, not the output power, and the power loss is the reason the electric actuator is the most critical component in the motion system.
- **The electric actuator selection is the most important selection in mechatronic system design, because the electric actuator selection determines the performance of the motion system.** The performance is the reason the engineer can design the motion system to be safe.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The DC motor, the stepper motor, and the motor drive.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The electric actuator and the motor drive.
- **P. Pillay (2012)** — *Electric Motor Statements and Drives*. CRC Press. The DC motor, the stepper motor, and the servo motor.
- **N. Mohan, T. Undeland, and W. Robbins (2003)** — *Power Electronics: Converters, Applications, and Design*, 3rd ed. Wiley. The motor drive and the power electronics.
- **R. Krishnan (2001)** — *Electric Motor Drives: Modeling, Analysis, and Control*. Prentice-Hall. The electric actuator and the motor drive.
- **T. Kenjo and S. Nagamori (1985)** — *Permanent Magnet and Brushless DC Motors*. Oxford University Press. The BLDC motor and the PMSM.
- **G.R. Walker (2011)** — *Industrial Electronics*. Taylor & Francis. The motor drive and the power electronics.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The electric actuator and the motor drive.
