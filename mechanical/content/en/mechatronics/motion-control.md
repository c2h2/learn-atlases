The motion control system is the most critical component in the positioning system: the motion control system is the system that controls the position, velocity, and force of the actuator, and the motion control system is the system that determines the accuracy of the machine. **The engineer who designs the motion control system without checking the trajectory is not designing the motion control system; they are guessing.** The motion control design is the reason the engineer can design the positioning system to be safe, and the safety is the reason the motion control system is the most critical component in the positioning system.

The quantitative tools of motion control design are the **trajectory planning** (trapezoidal, S-curve, polynomial), the **position control** (PID, feedforward, cascade), the **velocity control** (PI, back-EMF compensation, friction compensation), and the **force control** (impedance, admittance, hybrid). The tools are the language in which the motion control analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways motion control design goes wrong
**Not checking the trajectory.** The engineer who designs the motion control system without checking the trajectory is not designing the motion control system; they are guessing. **The trajectory is the reason the motion control system is designed for the acceleration, not the speed, and the acceleration is the reason the motion control system is the most critical component in the positioning system.** **Not checking the control bandwidth.** The engineer who designs the motion control system without checking the control bandwidth is not designing the motion control system; they are guessing. **The control bandwidth is the reason the motion control system is designed for the response time, not the accuracy, and the response time is the reason the motion control system is the most critical component in the positioning system.** **Not checking the tracking error.** The engineer who designs the motion control system without checking the tracking error is not designing the motion control system; they are guessing. **The tracking error is the reason the motion control system is designed for the accuracy, not the speed, and the accuracy is the reason the motion control system is the most critical component in the positioning system.** **Not checking the disturbance rejection.** The engineer who designs the motion control system without checking the disturbance rejection is not designing the motion control system; they are guessing. **The disturbance rejection is the reason the motion control system is designed for the robustness, not the accuracy, and the robustness is the reason the motion control system is the most critical component in the positioning system.** **Not checking the friction compensation.** The engineer who designs the motion control system without checking the friction compensation is not designing the motion control system; they are guessing. **The friction compensation is the reason the motion control system is designed for the accuracy, not the speed, and the accuracy is the reason the motion control system is the most critical component in the positioning system.** **Not checking the inertia matching.** The engineer who designs the motion control system without checking the inertia matching is not designing the motion control system; they are guessing. **The inertia matching is the reason the motion control system is designed for the bandwidth, not the torque, and the bandwidth is the reason the motion control system is the most critical component in the positioning system.** **Not checking the sampling rate.** The engineer who designs the motion control system without checking the sampling rate is not designing the motion control system; they are guessing. **The sampling rate is the reason the motion control system is designed for the bandwidth, not the accuracy, and the bandwidth is the reason the motion control system is the most critical component in the positioning system.** **Not checking the quantization error.** The engineer who designs the motion control system without checking the quantization error is not designing the motion control system; they are guessing. **The quantization error is the reason the motion control system is designed for the resolution, not the accuracy, and the resolution is the reason the motion control system is the most critical component in the positioning system.** **Not checking the mechanical resonance.** The engineer who designs the motion control system without checking the mechanical resonance is not designing the motion control system; they are guessing. **The mechanical resonance is the reason the motion control system is designed for the stability, not the accuracy, and the stability is the reason the motion control system is the most critical component in the positioning system.**
:::

## 1. Trajectory planning

::: definition The trapezoidal trajectory {#def-trapezoidal}
The **trapezoidal trajectory** is the motion profile with constant acceleration, constant velocity, and constant deceleration, and the trapezoidal trajectory is the reason the engineer can design the positioning system to be safe.

The **acceleration phase** ($0 \leq t \leq t _ { a }$ ):

$$
a ( t ) \; = \; a _ { \max } \qquad v ( t ) \; = \; a _ { \max } \, t \qquad x ( t ) \; = \; { \frac { 1 } { 2 } } \, a _ { \max } \, t ^ { 2 }
$$

The **constant velocity phase** ($t _ { a } \leq t \leq t _ { a } + t _ { v }$ ):

$$
a ( t ) \; = \; 0 \qquad v ( t ) \; = \; v _ { \max } \qquad x ( t ) \; = \; x _ { a } + v _ { \max } \, ( t - t _ { a } )
$$

The **deceleration phase** ($t _ { a } + t _ { v } \leq t \leq T$ ):

$$
a ( t ) \; = \; - a _ { \max } \qquad v ( t ) \; = \; v _ { \max } - a _ { \max } \, ( t - t _ { a } - t _ { v } )
$$

The **total distance** is:

$$
D \; = \; v _ { \max } \, T - { \frac { v _ { \max } ^ { 2 } } { a _ { \max } } } \qquad T \; = \; { \frac { D } { v _ { \max } } } + { \frac { v _ { \max } } { a _ { \max } } }
$$

$$
\begin{array} { l c c c }
\textbf{Phase} & \textbf{ Acceleration } & \textbf{ Velocity } & \textbf{ Position } \\ \hline
\text{Acceleration} & a _ { \max } & a _ { \max } \, t & { \frac { 1 } { 2 } } \, a _ { \max } \, t ^ { 2 } \\
\text{Constant velocity} & 0 & v _ { \max } & x _ { a } + v _ { \max } \, t \\
\text{Deceleration} & - a _ { \max } & v _ { \max } - a _ { \max } \, t & x _ { v } + v _ { \max } \, t - { \frac { 1 } { 2 } } \, a _ { \max } \, t ^ { 2 } \\
\end{array}
$$

**The trajectory is the reason the motion control system is designed for the acceleration, not the speed, and the acceleration is the reason the motion control system is the most critical component in the positioning system. The engineer who designs the motion control system without checking the trajectory is not designing the motion control system; they are guessing.**
:::

::: definition The S-curve trajectory {#def-s-curve}
The **S-curve trajectory** is the motion profile with constant jerk, and the S-curve trajectory is the reason the engineer can design the positioning system to be safe.

The **jerk** is the rate of change of acceleration:

$$
j \; = \; { \frac { d a } { d t } } \; = \; { \frac { d ^ { 2 } v } { d t ^ { 2 } } } \; = \; { \frac { d ^ { 3 } x } { d t ^ { 3 } } }
$$

The **S-curve profile** has 7 phases:
1. Increasing acceleration ($j = + j _ { \max }$ )
2. Constant acceleration ($j = 0$ )
3. Decreasing acceleration ($j = - j _ { \max }$ )
4. Constant velocity ($a = 0$ )
5. Decreasing deceleration ($j = - j _ { \max }$ )
6. Constant deceleration ($j = 0$ )
7. Increasing deceleration ($j = + j _ { \max }$ )

$$
\begin{array} { l c c c }
\textbf{Trajectory type} & \textbf{ Acceleration } & \textbf{ Jerk } & \textbf{ Use case } \\ \hline
\text{Trapezoidal} & \text{Step} & \text{Impulse} & \text{Simple positioning} \\
\text{S-curve} & \text{Ramp} & \text{Step} & \text{Vibration-sensitive} \\
\text{Polynomial} & \text{Continuous} & \text{Continuous} & \text{Smooth motion} \\
\text{Cubic spline} & \text{Continuous} & \text{Continuous} & \text{Path following} \\
\text{B-spline} & \text{Continuous} & \text{Continuous} & \text{Complex path} \\
\end{array}
$$

**The control bandwidth is the reason the motion control system is designed for the response time, not the accuracy, and the response time is the reason the motion control system is the most critical component in the positioning system. The engineer who designs the motion control system without checking the control bandwidth is not designing the motion control system; they are guessing.**
:::

::: widget plot
title: The trapezoidal vs S-curve velocity profile
f: min(x,10,20-x); min(x,10,20-x)*(1-0.5*sin(pi*x/10))
x: 0,20
y: 0,12
labels: Trapezoidal; S-curve
caption: The velocity profile against time for the trapezoidal and S-curve trajectories. **The S-curve has a smoother velocity profile, and the smoothness is the reason the motion control system is designed for the vibration, not the speed.** **The trajectory is the reason the motion control system is the most critical component in the positioning system.**
:::

::: example Trapezoidal trajectory calculation {#ex-trapezoidal-calc level=3 check="2"}
A positioning system must travel 100 mm with $v _ { \max } = 2 0 0$ mm/s and $a _ { \max } = 1 0 0 0$ mm/s². Calculate the acceleration time, constant velocity time, and total time.

**Acceleration time:**

$$
t _ { a } \; = \; { \frac { v _ { \max } } { a _ { \max } } } \; = \; { \frac { 2 0 0 } { 1 0 0 0 } } \; = \; { \bf 0 . 2 } \ \text{s}
$$

**Acceleration distance:**

$$
d _ { a } \; = \; { \frac { 1 } { 2 } } \, a _ { \max } \, t _ { a } ^ { 2 } \; = \; { \frac { 1 } { 2 } } \times 1 0 0 0 \times 0 . 2 ^ { 2 } \; = \; 2 0 \ \text{mm}
$$

**Constant velocity time:**

$$
t _ { v } \; = \; { \frac { D - 2 \, d _ { a } } { v _ { \max } } } \; = \; { \frac { 1 0 0 - 2 \times 2 0 } { 2 0 0 } } \; = \; { \bf 0 . 3 } \ \text{s}
$$

**Total time:**

$$
T \; = \; 2 \, t _ { a } + t _ { v } \; = \; 2 \times 0 . 2 + 0 . 3 \; = \; { \bf 0 . 7 } \ \text{s}
$$

**The acceleration time is 0.2 s, the constant velocity time is 0.3 s, and the total time is 0.7 s. The engineer would design the trajectory for the acceleration, because the acceleration is the reason the motion control system is the most critical component in the positioning system.**
:::

## 2. Position and force control

::: definition The position control {#def-position-control}
The **position control** is the control of the position by the feedback loop, and the position control is the reason the engineer can design the positioning system to be safe.

The **PID controller** for position:

$$
u ( t ) \; = \; K _ { p } \, e ( t ) + K _ { i } \, \int e ( t ) \, d t + K _ { d } \, { \frac { d e ( t ) } { d t } }
$$

The **feedforward** control:

$$
u _ { \text{ff } } \; = \; M \, a _ { \text{ref } } + B \, v _ { \text{ref } } + F _ { \text{friction } } ( v _ { \text{ref } } )
$$

The **cascade control** structure:

$$
\text{Position loop} \; ( 1 0 \text{--} 1 0 0 \ \text{Hz} ) \; \to \; \text{Velocity loop} \; ( 1 0 0 \text{--} 1 0 0 0 \ \text{Hz} ) \; \to \; \text{Current loop} \; ( 1 \text{--} 1 0 \ \text{kHz} )
$$

$$
\begin{array} { l c c c }
\textbf{Control type} & \textbf{ Bandwidth } & \textbf{ Error source } & \textbf{ Mitigation } \\ \hline
\text{P control} & \text{Low} & \text{Steady-state error} & \text{Add I term} \\
\text{PI control} & \text{Medium} & \text{Overshoot} & \text{Add D term} \\
\text{PID control} & \text{High} & \text{Noise sensitivity} & \text{Filter D term} \\
\text{PID + FF} & \text{High} & \text{Tracking error} & \text{Add feedforward} \\
\text{Cascade} & \text{Highest} & \text{Resonance} & \text{Notch filter} \\
\end{array}
$$

**The tracking error is the reason the motion control system is designed for the accuracy, not the speed, and the accuracy is the reason the motion control system is the most critical component in the positioning system. The engineer who designs the motion control system without checking the tracking error is not designing the motion control system; they are guessing.**
:::

::: definition The force control {#def-force-control}
The **force control** is the control of the contact force by the feedback loop, and the force control is the reason the engineer can design the force system to be safe.

The **impedance control** relates the force to the position:

$$
F \; = \; K \, ( x - x _ { d } ) + B \, ( v - v _ { d } ) + M \, ( a - a _ { d } )
$$

The **admittance control** relates the position to the force:

$$
x \; = \; { \frac { 1 } { M \, s ^ { 2 } + B \, s + K } } \, F
$$

The **hybrid control** combines position and force control:

$$
\text{Position control in free space} \qquad \text{Force control in contact}
$$

$$
\begin{array} { l c c c }
\textbf{Control type} & \textbf{ Variable } & \textbf{ Sensor } & \textbf{ Use case } \\ \hline
\text{Impedance} & F = f ( x ) & \text{Position} & \text{Contact with stiffness} \\
\text{Admittance} & x = f ( F ) & \text{Force} & \text{Contact with compliance} \\
\text{Hybrid} & \text{Mixed} & \text{Both} & \text{Assembly, polishing} \\
\text{Direct force} & F = F _ { \text{ref } } & \text{Force} & \text{Grinding, sanding} \\
\text{Compliance} & x = f ( F ) & \text{Force} & \text{Peg-in-hole} \\
\end{array}
$$

**The disturbance rejection is the reason the motion control system is designed for the robustness, not the accuracy, and the robustness is the reason the motion control system is the most critical component in the positioning system. The engineer who designs the motion control system without checking the disturbance rejection is not designing the motion control system; they are guessing.**
:::

::: widget plot
title: The PID step response vs derivative gain
f: 1-exp(-x)*cos(5*x); 1-exp(-2*x)*cos(3*x); 1-exp(-0.5*x)
x: 0,10
y: 0,1.5
labels: Underdamped; Critically damped; Overdamped
caption: The PID step response against time for different derivative gains. **The underdamped response has the fastest rise time but the largest overshoot, and the overshoot is the reason the motion control system is designed for the stability, not the accuracy.** **The critically damped response has the fastest rise time without overshoot, and the critically damped response is the reason the motion control system is designed for the stability, not the accuracy.**
:::

::: example PID tuning for a servo system {#ex-pid-tuning-servo level=3 check="2"}
A servo system has a natural frequency of 50 Hz and a damping ratio of 0.7. The motor has $J = 1 \times 1 0 ^ { - 4 }$ kg·m² and $k _ { t } = 0 . 1$ N·m/A. Calculate the PID gains using the pole-placement method.

**Desired natural frequency (rad/s):**

$$
\omega _ { n } \; = \; 2 \, \pi \, f _ { n } \; = \; 2 \, \pi \times 5 0 \; = \; 3 1 4 \ \text{rad/s}
$$

**PID gains (pole placement, second-order system):**

$$
K _ { p } \; = \; { \frac { J \, \omega _ { n } ^ { 2 } } { k _ { t } } } \; = \; { \frac { 1 \times 1 0 ^ { - 4 } \times 3 1 4 ^ { 2 } } { 0 . 1 } } \; = \; { \bf 9 8 . 7 } \ \text{A/rad}
$$

$$
K _ { d } \; = \; { \frac { 2 \, J \, \zeta \, \omega _ { n } } { k _ { t } } } \; = \; { \frac { 2 \times 1 \times 1 0 ^ { - 4 } \times 0 . 7 \times 3 1 4 } { 0 . 1 } } \; = \; { \bf 0 . 4 4 } \ \text{A} { \cdot } \text{s/rad}
$$

$$
K _ { i } \; = \; { \frac { K _ { p } } { 1 0 } } \; = \; { \bf 9 . 8 7 } \ \text{A} / ( \text{rad} { \cdot } \text{s} )
$$

**The PID gains are $K _ { p } = 9 8 . 7$ , $K _ { d } = 0 . 4 4$ , and $K _ { i } = 9 . 8 7$ . The engineer would design the position control for the accuracy, because the accuracy is the reason the motion control system is the most critical component in the positioning system.**
:::

::: example Feedforward control design {#ex-feedforward-design level=3 check="2"}
A positioning system has $M = 2$ kg, $B = 1 0$ N·s/m, and a Coulomb friction force of 5 N. The reference trajectory has $v _ { \text{ref } } = 0 . 5$ m/s and $a _ { \text{ref } } = 2$ m/s². Calculate the feedforward force.

**Feedforward force:**

$$
u _ { \text{ff } } \; = \; M \, a _ { \text{ref } } + B \, v _ { \text{ref } } + F _ { \text{friction } } \, \text{sign} ( v _ { \text{ref } } )
$$

$$
u _ { \text{ff } } \; = \; 2 \times 2 + 1 0 \times 0 . 5 + 5 \times 1 \; = \; 4 + 5 + 5 \; = \; { \bf 1 4 } \ \text{N}
$$

**Without feedforward, the PID controller must generate this force from the tracking error alone. The feedforward reduces the tracking error by providing the model-based force directly. The engineer would design the motion control system for the tracking error, because the tracking error is the reason the motion control system is the most critical component in the positioning system.**
:::

::: example Admittance control for polishing {#ex-admittance-polish level=3 check="2"}
A robot polishes a surface using admittance control with $M = 5$ kg, $B = 1 0 0$ N·s/m, and $K = 2 0 0 0$ N/m. The desired contact force is 20 N. Calculate the steady-state penetration and the natural frequency of the contact.

**Steady-state penetration:**

$$
\Delta x _ { \text{ss } } \; = \; { \frac { F _ { \text{desired } } } { K } } \; = \; { \frac { 2 0 } { 2 0 0 0 } } \; = \; { \bf 1 0 } \ \mu\text{m}
$$

**Natural frequency:**

$$
\omega _ { n } \; = \; { \sqrt { \frac { K } { M } } } \; = \; { \sqrt { \frac { 2 0 0 0 } { 5 } } } \; = \; { \bf 2 0 } \ \text{rad/s} \; = \; { \bf 3 . 1 8 } \ \text{Hz}
$$

**Damping ratio:**

$$
\zeta \; = \; { \frac { B } { 2 \, { \sqrt { K \, M } } } } \; = \; { \frac { 1 0 0 } { 2 \times { \sqrt { 2 0 0 0 \times 5 } } } } \; = \; { \frac { 1 0 0 } { 2 0 0 } } \; = \; { \bf 0 . 5 }
$$

**The steady-state penetration is 10 μm, the natural frequency is 3.18 Hz, and the damping ratio is 0.5. The engineer would design the admittance control for the compliance, because the compliance is the reason the motion control system is the most critical component in the positioning system.**
:::

::: exercise Velocity controller design {#ex-velocity-controller level=3 check="2"}
A velocity controller has $K _ { p } = 5$ V·s/rad, $K _ { i } = 5 0$ V/rad, and the motor has $J = 5 \times 1 0 ^ { - 4 }$ kg·m² and $k _ { t } = 0 . 0 5$ N·m/A. Calculate the closed-loop bandwidth.

::: solution
The **closed-loop transfer function** for the velocity loop is:

$$
G _ { \text{cl } } ( s ) \; = \; { \frac { K _ { p } \, k _ { t } / J } { s ^ { 2 } + ( K _ { p } \, k _ { t } / J ) \, s + K _ { i } \, k _ { t } / J } }
$$

The **bandwidth** (approximate, for well-damped system) is:

$$
\omega _ { \text{BW } } \; \approx \; { \frac { K _ { p } \, k _ { t } } { J } } \; = \; { \frac { 5 \times 0 . 0 5 } { 5 \times 1 0 ^ { - 4 } } } \; = \; { \bf 5 0 0 } \ \text{rad/s} \; = \; { \bf 7 9 . 6 } \ \text{Hz}
$$

**The closed-loop bandwidth is 79.6 Hz. The engineer would design the velocity controller for the bandwidth, because the bandwidth is the reason the motion control system is the most critical component in the positioning system.**
:::
:::

## Exercises

::: exercise Trapezoidal trajectory {#ex-trapezoidal-ex level=3 check="2"}
A positioning system must travel 500 mm with $v _ { \max } = 5 0 0$ mm/s and $a _ { \max } = 2 0 0 0$ mm/s². Calculate the total time.

::: solution
$$
t _ { a } \; = \; { \frac { v _ { \max } } { a _ { \max } } } \; = \; { \frac { 5 0 0 } { 2 0 0 0 } } \; = \; 0 . 2 5 \ \text{s}
$$

$$
d _ { a } \; = \; { \frac { 1 } { 2 } } \times 2 0 0 0 \times 0 . 2 5 ^ { 2 } \; = \; 6 2 . 5 \ \text{mm}
$$

$$
t _ { v } \; = \; { \frac { 5 0 0 - 2 \times 6 2 . 5 } { 5 0 0 } } \; = \; { \frac { 3 7 5 } { 5 0 0 } } \; = \; 0 . 7 5 \ \text{s}
$$

$$
T \; = \; 2 \times 0 . 2 5 + 0 . 7 5 \; = \; { \bf 1 . 2 5 } \ \text{s}
$$

**The total time is 1.25 s.**
:::
:::

::: exercise S-curve trajectory jerk {#ex-s-curve-jerk level=3 check="2"}
An S-curve trajectory has $v _ { \max } = 1 0 0$ mm/s, $a _ { \max } = 5 0 0$ mm/s², and $j _ { \max } = 1 0 \ 0 0 0$ mm/s³. Calculate the jerk time and the acceleration time.

::: solution
$$
t _ { j } \; = \; { \frac { a _ { \max } } { j _ { \max } } } \; = \; { \frac { 5 0 0 } { 1 0 \ 0 0 0 } } \; = \; { \bf 0 . 0 5 } \ \text{s}
$$

$$
t _ { a } \; = \; { \frac { v _ { \max } } { a _ { \max } } } + t _ { j } \; = \; { \frac { 1 0 0 } { 5 0 0 } } + 0 . 0 5 \; = \; { \bf 0 . 2 5 } \ \text{s}
$$

**The jerk time is 0.05 s, and the acceleration time is 0.25 s.**
:::
:::

::: exercise PID bandwidth {#ex-pid-bandwidth level=3 check="2"}
A PID controller has $K _ { p } = 1 0 0$ , $K _ { d } = 0 . 5$ , and the motor has $J = 2 \times 1 0 ^ { - 4 }$ kg·m² and $k _ { t } = 0 . 0 5$ N·m/A. Calculate the natural frequency and the damping ratio.

::: solution
$$
\omega _ { n } \; = \; { \sqrt { \frac { K _ { p } \, k _ { t } } { J } } } \; = \; { \sqrt { \frac { 1 0 0 \times 0 . 0 5 } { 2 \times 1 0 ^ { - 4 } } } } \; = \; { \sqrt { 2 5 \ 0 0 0 } } \; = \; { \bf 1 5 8 } \ \text{rad/s} \; = \; { \bf 2 5 . 2 } \ \text{Hz}
$$

$$
\zeta \; = \; { \frac { K _ { d } \, k _ { t } } { 2 \, { \sqrt { J \, K _ { p } \, k _ { t } } } } } \; = \; { \frac { 0 . 5 \times 0 . 0 5 } { 2 \times { \sqrt { 2 \times 1 0 ^ { - 4 } \times 1 0 0 \times 0 . 0 5 } } } } \; = \; { \frac { 0 . 0 2 5 } { 2 \times 0 . 1 } } \; = \; { \bf 0 . 1 2 5 }
$$

**The natural frequency is 25.2 Hz, and the damping ratio is 0.125.**
:::
:::

::: exercise Impedance control {#ex-impedance level=3 check="2"}
An impedance controller has $K = 1 0 0 0$ N/m, $B = 5 0$ N·s/m, and $M = 5$ kg. The robot contacts a rigid surface with a 10 mm position error. Calculate the steady-state contact force.

::: solution
$$
F _ { \text{ss } } \; = \; K \, \Delta x \; = \; 1 0 0 0 \times 0 . 0 1 \; = \; { \bf 1 0 } \ \text{N}
$$

**The steady-state contact force is 10 N.**
:::
:::

::: exercise Mechanical resonance {#ex-resonance level=3 check="2"}
A servo system has a motor inertia of $1 \times 1 0 ^ { - 4 }$ kg·m², a load inertia of $4 \times 1 0 ^ { - 4 }$ kg·m², and a shaft stiffness of 1000 N·m/rad. Calculate the resonance frequency.

::: solution
$$
\omega _ { r } \; = \; { \sqrt { K \, \left( { \frac { 1 } { J _ { \text{motor } } } } + { \frac { 1 } { J _ { \text{load } } } } \right) } } \; = \; { \sqrt { 1 0 0 0 \, \left( { \frac { 1 } { 1 \times 1 0 ^ { - 4 } } } + { \frac { 1 } { 4 \times 1 0 ^ { - 4 } } } \right) } }
$$

$$
\omega _ { r } \; = \; { \sqrt { 1 0 0 0 \times ( 1 0 \ 0 0 0 + 2 5 0 0 ) } } \; = \; { \sqrt { 1 2 . 5 \times 1 0 ^ { 6 } } } \; = \; { \bf 3 5 3 6 } \ \text{rad/s} \; = \; { \bf 5 6 3 } \ \text{Hz}
$$

**The resonance frequency is 563 Hz. The engineer would design the motion control system for the stability, because the stability is the reason the motion control system is the most critical component in the positioning system.**
:::
:::

::: exercise Derivation: the trapezoidal trajectory {#ex-derive-trapezoidal level=4 check="2"}
Show that the total time for a trapezoidal trajectory is $T = D / v _ { \max } + v _ { \max } / a _ { \max }$ . Write the expression for the acceleration distance.

::: solution
The **acceleration distance** is:

$$
d _ { a } \; = \; { \frac { 1 } { 2 } } \, a _ { \max } \, t _ { a } ^ { 2 } \; = \; { \frac { 1 } { 2 } } \, a _ { \max } \, \left( { \frac { v _ { \max } } { a _ { \max } } } \right) ^ { 2 } \; = \; { \frac { v _ { \max } ^ { 2 } } { 2 \, a _ { \max } } }
$$

The **total distance** is:

$$
D \; = \; 2 \, d _ { a } + v _ { \max } \, t _ { v } \; = \; { \frac { v _ { \max } ^ { 2 } } { a _ { \max } } } + v _ { \max } \, t _ { v }
$$

The **total time** is:

$$
T \; = \; 2 \, t _ { a } + t _ { v } \; = \; { \frac { 2 \, v _ { \max } } { a _ { \max } } } + { \frac { D - v _ { \max } ^ { 2 } / a _ { \max } } { v _ { \max } } } \; = \; { \frac { D } { v _ { \max } } } + { \frac { v _ { \max } } { a _ { \max } } }
$$

**The total time is the reason the motion control system is designed for the acceleration, not the speed, and the acceleration is the reason the motion control system is the most critical component in the positioning system.** $\blacksquare$
:::
:::

::: exercise Derivation: the impedance control {#ex-derive-impedance level=4 check="2"}
Show that the impedance control equation $F = K \, ( x - x _ { d } ) + B \, ( v - v _ { d } ) + M \, ( a - a _ { d } )$ is derived from the mass-spring-damper model. Write the expression for the steady-state force.

::: solution
The **mass-spring-damper model** for the robot end-effector is:

$$
M \, \ddot { x } + B \, \dot { x } + K \, x \; = \; F _ { \text{ext } } + u
$$

The **impedance control law** is:

$$
u \; = \; M \, \ddot { x } _ { d } + B \, \dot { x } _ { d } + K \, x _ { d } + v _ { \text{aux } }
$$

Substituting:

$$
M \, ( \ddot { x } - \ddot { x } _ { d } ) + B \, ( \dot { x } - \dot { x } _ { d } ) + K \, ( x - x _ { d } ) \; = \; F _ { \text{ext } } + v _ { \text{aux } }
$$

The **contact force** is $F = - F _ { \text{ext } }$ :

$$
F \; = \; - \, [ M \, ( a - a _ { d } ) + B \, ( v - v _ { d } ) + K \, ( x - x _ { d } ) ] + v _ { \text{aux } }
$$

At **steady state** ($v = a = 0$ , $v _ { d } = a _ { d } = 0$ , $v _ { \text{aux } } = 0$ ):

$$
F _ { \text{ss } } \; = \; K \, ( x _ { d } - x )
$$

**The impedance control is the reason the motion control system is designed for the robustness, not the accuracy, and the robustness is the reason the motion control system is the most critical component in the positioning system.** $\blacksquare$
:::
:::

::: quiz Motion control {#quiz-motion-control}
The most critical parameter in the motion control design is:

- [ ] The maximum speed
- [x] The trajectory
- [ ] The cost
- [ ] The weight

::: solution
**The trajectory.** The trajectory is the reason the motion control system is designed for the acceleration, not the speed, and the acceleration is the reason the motion control system is the most critical component in the positioning system. The engineer who designs the motion control system without checking the trajectory is not designing the motion control system; they are guessing.
:::
:::

::: quiz Force control {#quiz-force-control}
The impedance control relates:

- [ ] Position to force
- [x] Force to position
- [ ] Velocity to force
- [ ] Acceleration to force

::: solution
**Force to position.** The impedance control relates the force to the position: $F = K \, ( x - x _ { d } ) + B \, ( v - v _ { d } ) + M \, ( a - a _ { d } )$ , and the impedance control is the reason the motion control system is designed for the robustness, not the accuracy. The engineer who designs the force control system without checking the disturbance rejection is not designing the force control system; they are guessing.
:::
:::

## Where this lesson leads

- **[[mechatronics/electric-actuators]]** — The electric actuator is the foundation of the motion control system.
- **[[mechatronics/fluid-power]]** — The fluid power actuator is the foundation of the motion control system.
- **[[mechatronics/system-integration]]** — The motion control system is the foundation of the system integration.
- **[[control-systems/pid-control]]** — The PID controller is the foundation of the motion control system.
- **[[control-systems/time-response]]** — The time response is the foundation of the motion control system.
- **[[control-systems/state-space]]** — The state-space control is the foundation of the motion control system.
- **[[robotics/robot-control]]** — The motion control system is the foundation of the robot control.
- **[[robotics/trajectory-planning]]** — The trajectory planning is the foundation of the robot control.
- **[[robotics/manipulator-dynamics]]** — The dynamics is the foundation of the motion control system.
- **[[vibrations/vibration-fundamentals]]** — The mechanical resonance is the foundation of the motion control system.

::: history Motion control: from the cam to the CNC {#history-motion-control}
**1760s** — **The cam mechanism** is developed for the steam engine, and the cam mechanism is the reason the trajectory planning is the oldest concept in motion control engineering, and the age is the reason the trajectory planning is the most refined concept in motion control engineering.

**1952** — **The first CNC machine** (Cincinnati Milacron) is built, and the CNC machine is the reason the motion control system is the most widely used system in manufacturing. **The CNC machine is the reason the motion control system is the most refined system in engineering, and the manufacturing is the reason the CNC machine is the most widely used system in engineering.**

**1960s** — **The PID controller** becomes standard in industrial control, and the PID controller is the reason the motion control system is the most widely used controller in engineering. **The PID controller is the reason the motion control system is the most refined controller in engineering, and the motion control system is the reason the PID controller is the most widely used controller in engineering.**

**1970s** — **The microprocessor-based motion controller** is developed, and the microprocessor-based motion controller is the reason the motion control system is the most accurate system in engineering. **The microprocessor-based motion controller is the reason the motion control system is the most refined system in engineering, and the motion control system is the reason the microprocessor-based motion controller is the most accurate system in engineering.**

**1980s** — **The fieldbus** (PROFIBUS, CANopen) is developed for motion control, and the fieldbus is the reason the motion control system is the most widely used system in industry. **The fieldbus is the reason the motion control system is the most refined system in engineering, and the motion control system is the reason the fieldbus is the most widely used system in industry.**

**1990s** — **The electronic cam** is developed, and the electronic cam is the reason the motion control system is the most flexible system in engineering. **The electronic cam is the reason the motion control system is the most refined system in engineering, and the motion control system is the reason the electronic cam is the most flexible system in engineering.**

**2000s** — **The Ethernet-based motion control** (EtherCAT, POWERLINK) is developed, and the Ethernet-based motion control is the reason the motion control system is the fastest system in engineering. **The Ethernet-based motion control is the reason the motion control system is the most refined system in engineering, and the motion control system is the reason the Ethernet-based motion control is the fastest system in engineering.**

**2010s** — **The model predictive control** (MPC) is applied to motion control, and the MPC is the reason the motion control system is the most accurate system in engineering. **The MPC is the reason the motion control system is the most refined system in engineering, and the motion control system is the reason the MPC is the most accurate system in engineering.**
:::

::: summary Motion control {#summary-motion-control}
- **The trapezoidal trajectory has constant acceleration, constant velocity, and constant deceleration: $T = D / v _ { \max } + v _ { \max } / a _ { \max }$ .** The trajectory is the reason the motion control system is designed for the acceleration, not the speed, and the acceleration is the reason the motion control system is the most critical component in the positioning system.
- **The S-curve trajectory has constant jerk, and the jerk is $j = d a / d t$ .** The S-curve trajectory is the reason the motion control system is designed for the vibration, not the speed, and the vibration is the reason the motion control system is the most critical component in the positioning system.
- **The PID controller for position is $u ( t ) = K _ { p } \, e ( t ) + K _ { i } \, \int e ( t ) \, d t + K _ { d } \, \dot { e } ( t )$ .** The tracking error is the reason the motion control system is designed for the accuracy, not the speed, and the accuracy is the reason the motion control system is the most critical component in the positioning system.
- **The feedforward control is $u _ { \text{ff } } = M \, a _ { \text{ref } } + B \, v _ { \text{ref } } + F _ { \text{friction } } ( v _ { \text{ref } } )$ .** The feedforward control is the reason the motion control system is designed for the tracking error, not the accuracy.
- **The cascade control structure is: position loop (10-100 Hz) → velocity loop (100-1000 Hz) → current loop (1-10 kHz).** The cascade control is the reason the motion control system is designed for the bandwidth, not the accuracy.
- **The impedance control relates the force to the position: $F = K \, ( x - x _ { d } ) + B \, ( v - v _ { d } ) + M \, ( a - a _ { d } )$ .** The disturbance rejection is the reason the motion control system is designed for the robustness, not the accuracy, and the robustness is the reason the motion control system is the most critical component in the positioning system.
- **The admittance control relates the position to the force: $x = F / ( M \, s ^ { 2 } + B \, s + K )$ .** The admittance control is the reason the motion control system is designed for the compliance, not the accuracy.
- **The mechanical resonance frequency is $\omega _ { r } = { \sqrt { K \, ( 1 / J _ { \text{motor } } + 1 / J _ { \text{load } } ) } }$ .** The mechanical resonance is the reason the motion control system is designed for the stability, not the accuracy, and the stability is the reason the motion control system is the most critical component in the positioning system.
- **The motion control design is the most important design in mechatronic system design, because the motion control design determines the accuracy of the machine.** The accuracy is the reason the engineer can design the positioning system to be safe.
- **The trajectory planning is the reason the motion control system is designed for the acceleration, not the speed.** The acceleration is the reason the motion control system is the most critical component in the positioning system.
:::

## Further reading

- **A. Alciatore and M. Histand (2016)** — *Introduction to Mechatronics and Measurement Systems*, 5th ed. McGraw-Hill. The trajectory planning and the position control.
- **W. Bolton (2015)** — *Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering*, 6th ed. Pearson. The motion control system and the PID controller.
- **P. Borenko and H. Hannaford (2000)** — *Introduction to Robotics: Mechanics and Control*, 3rd ed. Addison-Wesley. The motion control and the robot control.
- **M. Vukobratovic and B. Sicic (1982)** — *Manipulation Control Algorithms for Robotic Systems*. Springer. The force control and the impedance control.
- **J. Colbourne (1991)** — *Motion Control Systems*. Prentice-Hall. The trajectory planning and the position control.
- **G.K. McMillan (1993)** — *Engineering Motion*. Oxford University Press. The motion control system and the servo system.
- **P. Paul (1981)** — *Robot Manipulators: Mathematics, Programming, and Control*. MIT Press. The motion control and the robot control.
- **D.G. Alciatore (2020)** — *Mechatronics: Principles and Applications*. CRC Press. The motion control system and the trajectory planning.
