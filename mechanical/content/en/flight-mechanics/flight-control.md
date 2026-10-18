Introduction to flight control is the most fundamental control analyses in flight mechanics: the flight control is the system that allows the pilot to command the aircraft attitude and trajectory, and the fly-by-wire is the electronic replacement of mechanical linkages between the pilot and the control surfaces. **The engineer who calculates the flight control without checking the stick-force gradient is not calculating the flight control; they are guessing.** The flight control calculation is the reason the engineer can design the aircraft to have acceptable handling qualities, and the control surface effectiveness is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.

The quantitative tools of flight control are the **control surfaces** (the ailerons, elevator, and rudder that generate aerodynamic moments), the **stick-force gradient** (the rate of change of stick force with airspeed), the **fly-by-wire system** (the electronic control system that replaces mechanical linkages), and the **control law** (the mathematical relationship between the pilot input and the control surface deflection). The tools are the language in which the flight control analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways flight control calculation goes wrong
**Not checking the stick-force gradient.** The engineer who calculates the flight control without checking the stick-force gradient is not calculating the flight control; they are guessing. **The stick-force gradient is the reason the introduction to flight control is designed for the gradient, not the force, and the gradient is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the control surface effectiveness.** The engineer who calculates the flight control without checking the control surface effectiveness is not calculating the flight control; they are guessing. **The control surface effectiveness is the reason the introduction to flight control is designed for the effectiveness, not the deflection, and the effectiveness is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the hinge moment.** The engineer who calculates the flight control without checking the hinge moment is not calculating the flight control; they are guessing. **The hinge moment is the reason the introduction to flight control is designed for the moment, not the force, and the moment is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the control law.** The engineer who calculates the flight control without checking the control law is not calculating the flight control; they are guessing. **The control law is the reason the introduction to flight control is designed for the law, not the surface, and the law is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the fly-by-wire.** The engineer who calculates the flight control without checking the fly-by-wire is not calculating the flight control; they are guessing. **The fly-by-wire is the reason the introduction to flight control is designed for the wire, not the cable, and the wire is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the control surface area.** The engineer who calculates the flight control without checking the control surface area is not calculating the flight control; they are guessing. **The control surface area is the reason the introduction to flight control is designed for the area, not the span, and the area is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the control surface deflection.** The engineer who calculates the flight control without checking the control surface deflection is not calculating the flight control; they are guessing. **The control surface deflection is the reason the introduction to flight control is designed for the deflection, not the angle, and the deflection is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the control surface hinge moment.** The engineer who calculates the flight control without checking the control surface hinge moment is not calculating the flight control; they are guessing. **The control surface hinge moment is the reason the introduction to flight control is designed for the moment, not the torque, and the moment is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** **Not checking the control system bandwidth.** The engineer who calculates the flight control without checking the control system bandwidth is not calculating the flight control; they are guessing. **The control system bandwidth is the reason the introduction to flight control is designed for the bandwidth, not the frequency, and the bandwidth is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

## 1. Control surfaces

::: definition The control surfaces {#def-control-surfaces}
The **control surfaces** are the hinged aerodynamic surfaces that generate the moments needed to control the aircraft attitude, and the control surfaces are the reason the engineer can design the aircraft to have acceptable handling qualities.

The **elevator** generates the pitching moment:

$$
C _ { m _ { \delta _ { e } } } \; = \; - { \frac { V _ { H } \, C _ { L _ { \alpha _ { t } } } \, \tau _ { e } } { \bar { c } } }
$$

The **aileron** generates the rolling moment:

$$
C _ { \ell _ { \delta _ { a } } } \; = \; { \frac { \partial C _ { \ell } } { \partial \delta _ { a } } }
$$

The **rudder** generates the yawing moment:

$$
C _ { n _ { \delta _ { r } } } \; = \; - { \frac { V _ { V } \, C _ { L _ { \alpha _ { v } } } \, \tau _ { r } } { b } }
$$

The **control surface effectiveness** is:

$$
\tau \; = \; { \frac { \partial \alpha _ { \text{eff } } } { \partial \delta } } \; = \; { \frac { C _ { l _ { \delta } } } { C _ { l _ { \alpha } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Elevator deflection} & \delta _ { e } & \text{Pitch control} & - 2 5 ^ { \circ } \text{--} + 2 5 ^ { \circ } \\
\text{Aileron deflection} & \delta _ { a } & \text{Roll control} & - 2 0 ^ { \circ } \text{--} + 2 0 ^ { \circ } \\
\text{Rudder deflection} & \delta _ { r } & \text{Yaw control} & - 3 0 ^ { \circ } \text{--} + 3 0 ^ { \circ } \\
\text{Control effectiveness} & \tau & \text{Lift slope ratio} & 0 . 8 \text{--} 0 . 9 8 \\
\end{array}
$$

**The stick-force gradient is the reason the introduction to flight control is designed for the gradient, not the force, and the gradient is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics. The engineer who calculates the flight control without checking the stick-force gradient is not calculating the flight control; they are guessing.**
:::

::: definition The hinge moment {#def-hinge-moment}
The **hinge moment** is the aerodynamic moment about the control surface hinge line, and the hinge moment is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **hinge moment coefficient** is:

$$
C _ { h } \; = \; { \frac { H } { { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { \delta } \, c _ { \delta } } }
$$

The **hinge moment** is:

$$
H \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { \delta } \, c _ { \delta } \, ( C _ { h _ { \alpha } } \, \alpha + C _ { h _ { \delta } } \, \delta + C _ { h _ { \xi } } \, \xi )
$$

The **stick force** is:

$$
F _ { \text{stick } } \; = \; { \frac { H } { G } } \; = \; { \frac { H } { \text{gear ratio } } }
$$

The **stick-force gradient** is:

$$
{ \frac { \partial F _ { \text{stick } } } { \partial V } } \; = \; { \frac { 1 } { G } } \, { \frac { \partial H } { \partial V } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Hinge moment} & H & \text{Aerodynamic moment} & 1 0 \text{--} 1 0 { , } 0 0 0 \ \text{ N m } \\
\text{Hinge moment coeff} & C _ { h } & \text{Non-dimensional} & - 0 . 5 \text{--} 0 . 5 \\
\text{Stick force} & F _ { \text{stick } } & \text{Pilot force} & 1 0 \text{--} 1 0 0 \ \text{ N } \\
\text{Gear ratio} & G & \text{Mechanical advantage} & 2 \text{--} 1 0 \\
\end{array}
$$

**The control surface effectiveness is the reason the introduction to flight control is designed for the effectiveness, not the deflection, and the effectiveness is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics. The engineer who calculates the flight control without checking the control surface effectiveness is not calculating the flight control; they are guessing.**
:::

::: widget plot
title: The stick force vs airspeed
f: 50+0.5*(x-100)
x: 60,250
y: 0,150
labels: F_stick
caption: The stick force against the airspeed for a typical transport aircraft. **The stick force increases with the airspeed, and the stick force is the reason the introduction to flight control is designed for the gradient, not the force.** **The gradient is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

::: example Hinge moment calculation {#ex-hinge-moment-calc level=3 check="2"}
An elevator has $S _ { \delta } = 3 \; \text{m } ^ { 2 }$ , $c _ { \delta } = 0 . 8 \; \text{m }$ , $C _ { h _ { \alpha } } = - 0 . 0 0 5$ per degree, $C _ { h _ { \delta } } = - 0 . 0 0 8$ per degree, $\alpha = 5 ^ { \circ }$ , $\delta _ { e } = - 3 ^ { \circ }$ , $V = 1 0 0 \; \text{m/s }$ , and $\rho = 1 . 0 \; \text{kg/m } ^ { 3 }$ . Calculate the hinge moment and stick force for a gear ratio of $G = 5$ .

**Hinge moment coefficient:**

$$
C _ { h } \; = \; C _ { h _ { \alpha } } \, \alpha + C _ { h _ { \delta } } \, \delta _ { e } \; = \; ( - 0 . 0 0 5 ) \times 5 + ( - 0 . 0 0 8 ) \times ( - 3 )
$$

$$
C _ { h } \; = \; - 0 . 0 2 5 + 0 . 0 2 4 \; = \; - 0 . 0 0 1
$$

**Dynamic pressure:**

$$
q \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \; = \; { \frac { 1 } { 2 } } \times 1 . 0 \times 1 0 0 ^ { 2 } \; = \; 5 0 0 0 \; \text{Pa }
$$

**Hinge moment:**

$$
H \; = \; q \, S _ { \delta } \, c _ { \delta } \, C _ { h } \; = \; 5 0 0 0 \times 3 \times 0 . 8 \times ( - 0 . 0 0 1 ) \; = \; { \bf - 1 2 } \; \text{N m }
$$

**Stick force:**

$$
F _ { \text{stick } } \; = \; { \frac { H } { G } } \; = \; { \frac { - 1 2 } { 5 } } \; = \; { \bf - 2 . 4 } \; \text{N }
$$

**The hinge moment is -12 N·m and the stick force is -2.4 N (pull). The engineer would design the aircraft for the moment, because the moment is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

## 2. Fly-by-wire

::: definition The fly-by-wire system {#def-fly-by-wire}
The **fly-by-wire system** is the electronic control system that replaces mechanical linkages between the pilot and the control surfaces, and the fly-by-wire system is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **control law** is:

$$
\delta _ { \text{cmd } } \; = \; K _ { \text{fb } } \, ( \theta _ { \text{cmd } } - \theta _ { \text{actual } } ) + K _ { \text{ff } } \, \theta _ { \text{cmd } }
$$

The **transfer function** is:

$$
G ( s ) \; = \; { \frac { \delta _ { \text{surface } } ( s ) } { \delta _ { \text{pilot } } ( s ) } } \; = \; { \frac { K } { ( \tau _ { 1 } \, s + 1 ) ( \tau _ { 2 } \, s + 1 ) } }
$$

The **control system bandwidth** is:

$$
\omega _ { \text{BW } } \; = \; { \frac { 1 } { \tau _ { \max } } }
$$

The **stability augmentation** is:

$$
\delta _ { \text{aug } } \; = \; - K _ { q } \, q - K _ { \alpha } \, \alpha - K _ { \beta } \, \beta
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Control law gain} & K _ { \text{fb } } & \text{Feedback gain} & 0 . 1 \text{--} 1 0 \\
\text{Bandwidth} & \omega _ { \text{BW } } & \text{System bandwidth} & 1 \text{--} 2 0 \ \text{ rad/s } \\
\text{Time constant} & \tau & \text{Actuator lag} & 0 . 0 1 \text{--} 0 . 1 \ \text{ s } \\
\text{Augmentation gain} & K _ { q } & \text{Pitch rate feedback} & 0 . 1 \text{--} 5 \\
\end{array}
$$

**The hinge moment is the reason the introduction to flight control is designed for the moment, not the force, and the moment is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics. The engineer who calculates the flight control without checking the hinge moment is not calculating the flight control; they are guessing.**
:::

::: definition The control law {#def-control-law}
The **control law** is the mathematical relationship between the pilot input and the control surface deflection, and the control law is the reason the engineer can design the aircraft to have acceptable handling qualities.

The **pitch control law** is:

$$
\delta _ { e } \; = \; K _ { \theta } \, ( \theta _ { \text{cmd } } - \theta ) - K _ { q } \, q
$$

The **roll control law** is:

$$
\delta _ { a } \; = \; K _ { \phi } \, ( \phi _ { \text{cmd } } - \phi ) - K _ { p } \, p
$$

The **load factor control law** is:

$$
\delta _ { e } \; = \; K _ { n } \, ( n _ { \text{cmd } } - n _ { z } ) - K _ { q } \, q
$$

The **auto-pilot** is:

$$
\delta _ { \text{AP } } \; = \; K _ { P } \, e + K _ { I } \, \int e \, d t + K _ { D } \, { \frac { d e } { d t } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pitch gain} & K _ { \theta } & \text{Attitude feedback} & 0 . 5 \text{--} 5 \\
\text{Rate gain} & K _ { q } & \text{Pitch rate feedback} & 0 . 1 \text{--} 5 \\
\text{Load factor gain} & K _ { n } & \text{Load factor feedback} & 1 \text{--} 1 0 \\
\text{PID proportional} & K _ { P } & \text{Proportional gain} & 0 . 1 \text{--} 1 0 \\
\end{array}
$$

**The control law is the reason the introduction to flight control is designed for the law, not the surface, and the law is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics. The engineer who calculates the flight control without checking the control law is not calculating the flight control; they are guessing.**
:::

::: widget plot
title: The control system bandwidth vs time constant
f: 1/x
x: 0.01,1
y: 0,100
labels: omega_BW
caption: The control system bandwidth against the time constant. **The bandwidth decreases with the time constant, and the bandwidth is the reason the introduction to flight control is designed for the bandwidth, not the frequency.** **The bandwidth is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

::: example Control law calculation {#ex-control-law-calc level=3 check="2"}
A pitch control law has $K _ { \theta } = 2 . 0$ , $K _ { q } = 1 . 5$ , $\theta _ { \text{cmd } } = 5 ^ { \circ }$ , $\theta = 3 ^ { \circ }$ , and $q = 0 . 1 \; \text{rad/s }$ . Calculate the elevator command.

**Pitch control law:**

$$
\delta _ { e } \; = \; K _ { \theta } \, ( \theta _ { \text{cmd } } - \theta ) - K _ { q } \, q
$$

**Attitude error:**

$$
\theta _ { e } \; = \; \theta _ { \text{cmd } } - \theta \; = \; 5 - 3 \; = \; 2 ^ { \circ }
$$

**Attitude term:**

$$
K _ { \theta } \, \theta _ { e } \; = \; 2 . 0 \times 2 \; = \; 4 . 0 \; \text{deg }
$$

**Rate damping term:**

$$
K _ { q } \, q \; = \; 1 . 5 \times 0 . 1 \; = \; 0 . 1 5 \; \text{deg }
$$

**Elevator command:**

$$
\delta _ { e } \; = \; 4 . 0 - 0 . 1 5 \; = \; { \bf 3 . 8 5 ^ { \circ } }
$$

**Note:** The rate damping term reduces the elevator command by 3.75%, providing pitch rate damping to prevent overshoot.

**The elevator command is 3.85°. The engineer would design the aircraft for the wire, because the wire is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

::: example Aileron sizing calculation {#ex-aileron-sizing-calc level=3 check="2"}
An aircraft needs $C _ { \\ell _ { \\delta _ { a } } } = 0 . 0 0 0 4$ per degree for adequate roll control. The aileron has $\\tau _ { a } = 0 . 3$ (fraction of wing span), $C _ { l _ { \\alpha } } = 0 . 1$ per degree, and $C _ { l _ { \\delta } } = 0 . 0 0 4$ per degree. Calculate the required aileron span fraction.

**Rolling moment coefficient from aileron:**

$$
C _ { \\ell _ { \\delta _ { a } } } \\; = \\; { \frac { C _ { l _ { \\delta } } \\, \\tau _ { a } \\, ( b _ { a } / b ) ^ { 2 } } { 2 } }
$$

where $b _ { a } / b$ is the aileron span fraction.

**Solve for aileron span fraction:**

$$
( b _ { a } / b ) ^ { 2 } \\; = \\; { \frac { 2 \\, C _ { \\ell _ { \\delta _ { a } } } } { C _ { l _ { \\delta } } \\, \\tau _ { a } } } \\; = \\; { \frac { 2 \\times 0 . 0 0 0 4 } { 0 . 0 0 4 \\times 0 . 3 } } \\; = \\; { \frac { 0 . 0 0 0 8 } { 0 . 0 0 1 2 } } \\; = \\; 0 . 6 6 7
$$

$$
b _ { a } / b \\; = \\; { \sqrt { 0 . 6 6 7 } } \\; = \\; { \\bf 0 . 8 1 6 }
$$

**Note:** The aileron span fraction of 0.816 is unrealistically large. In practice, the aileron span fraction is 0.1-0.3, and the rolling moment is enhanced by using differential ailerons or spoilers.

**Using a more realistic aileron span fraction of 0.2:**

$$
C _ { \\ell _ { \\delta _ { a } } } \\; = \\; { \frac { 0 . 0 0 4 \\times 0 . 3 \\times 0 . 2 ^ { 2 } } { 2 } } \\; = \\; { \frac { 0 . 0 0 4 \\times 0 . 3 \\times 0 . 0 4 } { 2 } } \\; = \\; { \frac { 0 . 0 0 0 0 4 8 } { 2 } } \\; = \\; { \\bf 2 . 4 \\times 1 0 ^ { - 5 } }
$$

**The required aileron span fraction is 0.816 (unrealistic), and the actual $C _ { \\ell _ { \\delta _ { a } } }$ for $b _ { a } / b = 0 . 2$ is $2 . 4 \\times 1 0 ^ { - 5 }$ per degree. The engineer would design the aircraft for the area, because the area is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

::: example PID autopilot calculation {#ex-pid-autopilot-calc level=3 check="2"}
An altitude autopilot has $K _ { P } = 3 . 0$ , $K _ { I } = 0 . 5$ , $K _ { D } = 1 . 0$ , and the altitude error is $e = 5 0 \\; \\text{m }$ with $\\dot { e } = - 1 0 \\; \\text{m/s }$ and $\\int e \\, d t = 2 0 0 \\; \\text{m s }$ . Calculate the control surface command.

**PID control law:**

$$
\\delta _ { \\text{AP } } \\; = \\; K _ { P } \\, e + K _ { I } \\, \\int e \\, d t + K _ { D } \\, { \frac { d e } { d t } }
$$

**Proportional term:**

$$
K _ { P } \\, e \\; = \\; 3 . 0 \\times 5 0 \\; = \\; 1 5 0
$$

**Integral term:**

$$
K _ { I } \\, \\int e \\, d t \\; = \\; 0 . 5 \\times 2 0 0 \\; = \\; 1 0 0
$$

**Derivative term:**

$$
K _ { D } \\, \\dot { e } \\; = \\; 1 . 0 \\times ( - 1 0 ) \\; = \\; - 1 0
$$

**Total command:**

$$
\\delta _ { \\text{AP } } \\; = \\; 1 5 0 + 1 0 0 + ( - 1 0 ) \\; = \\; { \\bf 2 4 0 }
$$

**Note:** The derivative term is negative because the error is decreasing ($\\dot { e } < 0$ ), which provides damping to prevent overshoot.

**Percentage contributions:**

$$
\\text{P} \\; = \\; { \frac { 1 5 0 } { 2 4 0 } } \\times 1 0 0 \\; = \\; { \\bf 6 2 . 5 } \\; \\%
$$

$$
\\text{I} \\; = \\; { \frac { 1 0 0 } { 2 4 0 } } \\times 1 0 0 \\; = \\; { \\bf 4 1 . 7 } \\; \\%
$$

$$
\\text{D} \\; = \\; { \frac { - 1 0 } { 2 4 0 } } \\times 1 0 0 \\; = \\; { \\bf - 4 . 2 } \\; \\%
$$

**The PID command is 240, with P contributing 62.5%, I contributing 41.7%, and D contributing -4.2%. The engineer would design the aircraft for the deflection, because the deflection is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.**
:::

::: exercise Elevator effectiveness {#ex-elevator-effectiveness-fc-ex level=3 check="2"}
An elevator has $V _ { H } = 0 . 7$ , $C _ { L _ { \\alpha _ { t } } } = 0 . 0 9$ per degree, $\\tau _ { e } = 0 . 9 5$ , and $\\bar { c } = 2 . 5 \\; \\text{m }$ . Calculate the elevator effectiveness.

::: solution
$$
C _ { m _ { \\delta _ { e } } } \\; = \\; - { \frac { V _ { H } \\, C _ { L _ { \\alpha _ { t } } } \\, \\tau _ { e } } { \\bar { c } } } \\; = \\; - { \frac { 0 . 7 \\times 0 . 0 9 \\times 0 . 9 5 } { 2 . 5 } } \\; = \\; - { \frac { 0 . 0 5 9 8 5 } { 2 . 5 } } \\; = \\; { \\bf - 0 . 0 2 3 9 } \\; \\text{per degree }
$$

**The elevator effectiveness is -0.0239 per degree.**
:::
:::

## Exercises

::: exercise Control surface effectiveness {#ex-cs-effectiveness-ex level=3 check="2"}
An elevator has $C _ { l _ { \delta } } = 0 . 0 4$ per degree and $C _ { l _ { \alpha } } = 0 . 1$ per degree. Calculate the control effectiveness $\tau$ .

::: solution
$$
\tau \; = \; { \frac { C _ { l _ { \delta } } } { C _ { l _ { \alpha } } } } \; = \; { \frac { 0 . 0 4 } { 0 . 1 } } \; = \; { \bf 0 . 4 }
$$

**The control effectiveness is 0.4.**
:::
:::

::: exercise Hinge moment {#ex-hinge-moment-ex level=3 check="2"}
A control surface has $q = 8 0 0 0 \; \text{Pa }$ , $S _ { \delta } = 2 \; \text{m } ^ { 2 }$ , $c _ { \delta } = 0 . 6 \; \text{m }$ , and $C _ { h } = - 0 . 0 0 3$ . Calculate the hinge moment.

::: solution
$$
H \; = \; q \, S _ { \delta } \, c _ { \delta } \, C _ { h } \; = \; 8 0 0 0 \times 2 \times 0 . 6 \times ( - 0 . 0 0 3 ) \; = \; { \bf - 2 8 . 8 } \; \text{N m }
$$

**The hinge moment is -28.8 N·m.**
:::
:::

::: exercise Stick force {#ex-stick-force-ex level=3 check="2"}
An aircraft has $H = 5 0 \; \text{N m }$ and a gear ratio of $G = 4$ . Calculate the stick force.

::: solution
$$
F _ { \text{stick } } \; = \; { \frac { H } { G } } \; = \; { \frac { 5 0 } { 4 } } \; = \; { \bf 1 2 . 5 } \; \text{N }
$$

**The stick force is 12.5 N.**
:::
:::

::: exercise Control system bandwidth {#ex-cs-bandwidth-ex level=3 check="2"}
A control system has an actuator time constant of $\tau = 0 . 0 2$ s. Calculate the control system bandwidth.

::: solution
$$
\omega _ { \text{BW } } \; = \; { \frac { 1 } { \tau } } \; = \; { \frac { 1 } { 0 . 0 2 } } \; = \; { \bf 5 0 } \; \text{rad/s }
$$

**The control system bandwidth is 50 rad/s.**
:::
:::

::: exercise Stability augmentation {#ex-stab-aug-ex level=3 check="2"}
A stability augmentation system has $K _ { q } = 2 . 0$ and $q = 0 . 3 \; \text{rad/s }$ . Calculate the augmentation deflection.

::: solution
$$
\delta _ { \text{aug } } \; = \; - K _ { q } \, q \; = \; - 2 . 0 \times 0 . 3 \; = \; { \bf - 0 . 6 } \; \text{rad} = { \bf - 3 4 . 4 ^ { \circ } }
$$

**The augmentation deflection is -34.4°.**
:::
:::

::: exercise Derivation: the stick-force gradient {#ex-derive-stick-force level=4 check="2"}
Show that the stick force is $F _ { \text{stick } } = H / G$ where $H$ is the hinge moment and $G$ is the gear ratio. Write the expression for the stick-force gradient.

::: solution
The **hinge moment** is the aerodynamic moment about the control surface hinge line:

$$
H \; = \; { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { \delta } \, c _ { \delta } \, C _ { h }
$$

The **stick force** is the hinge moment divided by the mechanical gear ratio:

$$
F _ { \text{stick } } \; = \; { \frac { H } { G } }
$$

The **stick-force gradient** is the rate of change of stick force with airspeed:

$$
{ \frac { \partial F _ { \text{stick } } } { \partial V } } \; = \; { \frac { 1 } { G } } \, { \frac { \partial H } { \partial V } } \; = \; { \frac { \rho \, V \, S _ { \delta } \, c _ { \delta } \, C _ { h } } { G } }
$$

For **positive stability**, the stick-force gradient must be positive (pull to fly faster):

$$
{ \frac { \partial F _ { \text{stick } } } { \partial V } } \; > \; 0
$$

**The fly-by-wire is the reason the introduction to flight control is designed for the wire, not the cable, and the wire is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the control law {#ex-derive-control-law level=4 check="2"}
Show that the pitch control law is $\delta _ { e } = K _ { \theta } \, ( \theta _ { \text{cmd } } - \theta ) - K _ { q } \, q$ . Write the expression for the load factor control law.

::: solution
The **pitch control law** combines attitude feedback and rate damping:

The **attitude error** is:

$$
e _ { \theta } \; = \; \theta _ { \text{cmd } } - \theta
$$

The **proportional term** (attitude feedback):

$$
\delta _ { \text{prop } } \; = \; K _ { \theta } \, e _ { \theta } \; = \; K _ { \theta } \, ( \theta _ { \text{cmd } } - \theta )
$$

The **derivative term** (rate damping):

$$
\delta _ { \text{deriv } } \; = \; - K _ { q } \, q
$$

The **total elevator command** is:

$$
\delta _ { e } \; = \; K _ { \theta } \, ( \theta _ { \text{cmd } } - \theta ) - K _ { q } \, q
$$

The **load factor control law** replaces attitude with load factor:

$$
\delta _ { e } \; = \; K _ { n } \, ( n _ { \text{cmd } } - n _ { z } ) - K _ { q } \, q
$$

**The control surface area is the reason the introduction to flight control is designed for the area, not the span, and the area is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Flight control {#quiz-flight-control}
The most fundamental control analyses in flight mechanics are:

- [ ] Steady flight performance
- [x] Introduction to flight control
- [ ] Range and endurance
- [ ] Structural analysis

::: solution
**Introduction to flight control.** Introduction to flight control is the most fundamental control analyses in flight mechanics, because the flight control is the system that allows the pilot to command the aircraft attitude and trajectory, and the fly-by-wire is the electronic replacement of mechanical linkages between the pilot and the control surfaces. The engineer who calculates the flight control without checking the stick-force gradient is not calculating the flight control; they are guessing.
:::
:::

::: quiz Fly-by-wire {#quiz-fbw}
The fly-by-wire system is:

- [ ] A mechanical linkage system
- [x] An electronic control system that replaces mechanical linkages
- [ ] A hydraulic boost system
- [ ] A manual control system

::: solution
**An electronic control system that replaces mechanical linkages.** The fly-by-wire system is the electronic control system that replaces mechanical linkages between the pilot and the control surfaces, and the fly-by-wire system is the reason the engineer can design the aircraft to have acceptable handling qualities. The engineer who calculates the flight control without checking the fly-by-wire is not calculating the flight control; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the flight control.
- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the flight control.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the flight control.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the flight control.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the flight control.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The aircraft equations of motion are the foundation of the flight control.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the flight control.
- **[[control-systems/pid-control]]** — The PID control is the foundation of the flight control.
- **[[control-systems/state-space]]** — The state-space control is the foundation of the flight control.
- **[[mechatronics/microcontrollers]]** — The microcontrollers are the foundation of the flight control.

::: history Flight control: from the Wright brothers to fly-by-wire {#history-flight-control}
**1903** — **The Wright brothers** achieve the **first controlled flight**, which is the foundation of the flight control. **The first controlled flight is the reason the flight control is the oldest concept in flight mechanics, and the age is the reason the flight control is the most refined concept in flight mechanics.**

**1910s** — **The aileron** is invented, and the aileron is the reason the flight control is the most historic concept in flight mechanics. **The aileron is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the aileron is the most historic concept in flight mechanics.**

**1930s** — **The hydraulic boost** is developed, and the hydraulic boost is the reason the flight control is the most practical concept in flight mechanics. **The hydraulic boost is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the hydraulic boost is the most practical concept in flight mechanics.**

**1950s** — **The power control unit** is developed, and the power control unit is the reason the flight control is the most powerful concept in flight mechanics. **The power control unit is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the power control unit is the most powerful concept in flight mechanics.**

**1970s** — **The F-8 Digital Fly-By-Wire** is tested, and the F-8 Digital Fly-By-Wire is the reason the flight control is the most advanced concept in flight mechanics. **The F-8 Digital Fly-By-Wire is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the F-8 Digital Fly-By-Wire is the most advanced concept in flight mechanics.**

**1980s** — **The Airbus A320** enters service with **full fly-by-wire**, and the Airbus A320 is the reason the flight control is the most modern concept in flight mechanics. **The Airbus A320 is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the Airbus A320 is the most modern concept in flight mechanics.**

**1990s** — **The Boeing 777** enters service with **fly-by-wire**, and the Boeing 777 is the reason the flight control is the most efficient concept in flight mechanics. **The Boeing 777 is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the Boeing 777 is the most efficient concept in flight mechanics.**

**2000s** — **The active control technology** is developed, and the active control technology is the reason the flight control is the most futuristic concept in flight mechanics. **The active control technology is the reason the flight control is the most refined concept in flight mechanics, and the flight control is the reason the active control technology is the most futuristic concept in flight mechanics.**
:::

::: summary Introduction to flight control {#summary-flight-control}
- **The elevator generates the pitching moment $C _ { m _ { \delta _ { e } } } = - V _ { H } \, C _ { L _ { \alpha _ { t } } } \, \tau _ { e } / \bar { c }$ , the aileron generates the rolling moment $C _ { \ell _ { \delta _ { a } } } = \partial C _ { \ell } / \partial \delta _ { a }$ , and the rudder generates the yawing moment $C _ { n _ { \delta _ { r } } } = - V _ { V } \, C _ { L _ { \alpha _ { v } } } \, \tau _ { r } / b$ .** The stick-force gradient is the reason the introduction to flight control is designed for the gradient, not the force, and the gradient is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The control surface effectiveness is $\tau = \partial \alpha _ { \text{eff } } / \partial \delta = C _ { l _ { \delta } } / C _ { l _ { \alpha } }$ , the elevator deflection is $\delta _ { e } = - 2 5 ^ { \circ } \text{--} + 2 5 ^ { \circ }$ , and the aileron deflection is $\delta _ { a } = - 2 0 ^ { \circ } \text{--} + 2 0 ^ { \circ }$ .** The control surface effectiveness is the reason the introduction to flight control is designed for the effectiveness, not the deflection, and the effectiveness is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The hinge moment coefficient is $C _ { h } = H / ( { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { \delta } \, c _ { \delta } )$ , the hinge moment is $H = { \frac { 1 } { 2 } } \, \rho \, V ^ { 2 } \, S _ { \delta } \, c _ { \delta } \, ( C _ { h _ { \alpha } } \, \alpha + C _ { h _ { \delta } } \, \delta + C _ { h _ { \xi } } \, \xi )$ , and the stick force is $F _ { \text{stick } } = H / G$ .** The hinge moment is the reason the introduction to flight control is designed for the moment, not the force, and the moment is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The stick-force gradient is $\partial F _ { \text{stick } } / \partial V = ( 1 / G ) \, \partial H / \partial V$ , the control law is $\delta _ { \text{cmd } } = K _ { \text{fb } } \, ( \theta _ { \text{cmd } } - \theta _ { \text{actual } } ) + K _ { \text{ff } } \, \theta _ { \text{cmd } }$ , and the transfer function is $G ( s ) = K / ( ( \tau _ { 1 } \, s + 1 ) ( \tau _ { 2 } \, s + 1 ) )$ .** The control law is the reason the introduction to flight control is designed for the law, not the surface, and the law is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The control system bandwidth is $\omega _ { \text{BW } } = 1 / \tau _ { \max }$ , the stability augmentation is $\delta _ { \text{aug } } = - K _ { q } \, q - K _ { \alpha } \, \alpha - K _ { \beta } \, \beta$ , and the pitch control law is $\delta _ { e } = K _ { \theta } \, ( \theta _ { \text{cmd } } - \theta ) - K _ { q } \, q$ .** The fly-by-wire is the reason the introduction to flight control is designed for the wire, not the cable, and the wire is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The roll control law is $\delta _ { a } = K _ { \phi } \, ( \phi _ { \text{cmd } } - \phi ) - K _ { p } \, p$ , the load factor control law is $\delta _ { e } = K _ { n } \, ( n _ { \text{cmd } } - n _ { z } ) - K _ { q } \, q$ , and the auto-pilot is $\delta _ { \text{AP } } = K _ { P } \, e + K _ { I } \, \int e \, d t + K _ { D } \, d e / d t$ .** The control surface area is the reason the introduction to flight control is designed for the area, not the span, and the area is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The control law gain is $K _ { \text{fb } } = 0 . 1 \text{--} 1 0$ , the bandwidth is $\omega _ { \text{BW } } = 1 \text{--} 2 0$ rad/s, and the time constant is $\tau = 0 . 0 1 \text{--} 0 . 1$ s.** The control surface deflection is the reason the introduction to flight control is designed for the deflection, not the angle, and the deflection is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The augmentation gain is $K _ { q } = 0 . 1 \text{--} 5$ , the pitch gain is $K _ { \theta } = 0 . 5 \text{--} 5$ , and the rate gain is $K _ { q } = 0 . 1 \text{--} 5$ .** The control surface hinge moment is the reason the introduction to flight control is designed for the moment, not the torque, and the moment is the reason the introduction to flight control is the most fundamental control analyses in flight mechanics.
- **The flight control calculation is the most important control calculation in flight mechanics, because the flight control calculation determines the handling qualities of the aircraft.** The handling qualities are the reason the engineer can design the aircraft to have acceptable handling qualities.
- **Introduction to flight control is the most fundamental control analyses in flight mechanics, because the flight control is the system that allows the pilot to command the aircraft attitude and trajectory, and the fly-by-wire is the electronic replacement of mechanical linkages between the pilot and the control surfaces.** The control analysis is the reason the engineer can design the aircraft to have acceptable handling qualities.
:::

## Further reading

- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The introduction to flight control, the control surfaces, and the stick-force gradient.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The introduction to flight control and the control surface effectiveness.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The introduction to flight control and the hinge moment.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The introduction to flight control and the control law.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The introduction to flight control and the fly-by-wire.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The introduction to flight control and the control surface area.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The introduction to flight control and the control surface deflection.
- **W. Nelson (1998)** — *Flight Stability and Automatic Control*, 2nd ed. McGraw-Hill. The introduction to flight control and the control system bandwidth.
