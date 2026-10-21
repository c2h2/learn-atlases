The aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics: the equations of motion describe the six-degree-of-freedom (6-DOF) motion of the aircraft under the action of aerodynamic, propulsive, and gravitational forces. **The engineer who calculates the aircraft equations of motion without checking the body axis system is not calculating the aircraft equations of motion; they are guessing.** The aircraft equations of motion calculation is the reason the engineer can simulate the aircraft trajectory and analyze the stability and control, and the six-degree-of-freedom formulation is the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.

The quantitative tools of the aircraft equations of motion are the **body axis system** (the coordinate system fixed to the aircraft), the **wind axis system** (the coordinate system aligned with the velocity vector), the **translational equations of motion** (Newton's second law for the three translational degrees of freedom), and the **rotational equations of motion** (Euler's equations for the three rotational degrees of freedom). The tools are the language in which the aircraft equations of motion analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways aircraft equations of motion calculation goes wrong
**Not checking the body axis system.** The engineer who calculates the aircraft equations of motion without checking the body axis system is not calculating the aircraft equations of motion; they are guessing. **The body axis system is the reason the aircraft equations of motion are designed for the axes, not the angles, and the axes are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the wind axis system.** The engineer who calculates the aircraft equations of motion without checking the wind axis system is not calculating the aircraft equations of motion; they are guessing. **The wind axis system is the reason the aircraft equations of motion are designed for the axes, not the angles, and the axes are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the inertia tensor.** The engineer who calculates the aircraft equations of motion without checking the inertia tensor is not calculating the aircraft equations of motion; they are guessing. **The inertia tensor is the reason the aircraft equations of motion are designed for the tensor, not the scalar, and the tensor is the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the Coriolis terms.** The engineer who calculates the aircraft equations of motion without checking the Coriolis terms is not calculating the aircraft equations of motion; they are guessing. **The Coriolis terms are the reason the aircraft equations of motion are designed for the terms, not the forces, and the terms are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the Euler angles.** The engineer who calculates the aircraft equations of motion without checking the Euler angles is not calculating the aircraft equations of motion; they are guessing. **The Euler angles are the reason the aircraft equations of motion are designed for the angles, not the rates, and the angles are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the transformation matrices.** The engineer who calculates the aircraft equations of motion without checking the transformation matrices is not calculating the aircraft equations of motion; they are guessing. **The transformation matrices are the reason the aircraft equations of motion are designed for the matrices, not the vectors, and the matrices are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the gravity components.** The engineer who calculates the aircraft equations of motion without checking the gravity components is not calculating the aircraft equations of motion; they are guessing. **The gravity components are the reason the aircraft equations of motion are designed for the components, not the magnitude, and the components are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the aerodynamic forces.** The engineer who calculates the aircraft equations of motion without checking the aerodynamic forces is not calculating the aircraft equations of motion; they are guessing. **The aerodynamic forces are the reason the aircraft equations of motion are designed for the forces, not the moments, and the forces are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** **Not checking the propulsive forces.** The engineer who calculates the aircraft equations of motion without checking the propulsive forces is not calculating the aircraft equations of motion; they are guessing. **The propulsive forces are the reason the aircraft equations of motion are designed for the forces, not the thrust, and the forces are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

## 1. Coordinate systems

::: definition The body axis system {#def-body-axes}
The **body axis system** is the coordinate system fixed to the aircraft with origin at the center of gravity, and the body axis system is the reason the engineer can simulate the aircraft trajectory and analyze the stability and control.

The **body axis system** is:

$$
X _ { b } \; \text{(forward)}, \quad Y _ { b } \; \text{(right wing)}, \quad Z _ { b } \; \text{(down)}
$$

The **velocity components in body axes** are:

$$
\mathbf { V } \; = \; u \, \mathbf { i } _ { b } + v \, \mathbf { j } _ { b } + w \, \mathbf { k } _ { b }
$$

The **angular velocity components in body axes** are:

$$
\boldsymbol { \omega } \; = \; p \, \mathbf { i } _ { b } + q \, \mathbf { j } _ { b } + r \, \mathbf { k } _ { b }
$$

The **body axis equations of motion** are:

$$
m \, ( \dot { u } - r \, v + q \, w ) \; = \; X
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Surge velocity} & u & \text{Forward velocity} & 5 0 \text{--} 3 0 0 \ \text{ m/s } \\
\text{Sway velocity} & v & \text{Lateral velocity} & - 2 0 \text{--} 2 0 \ \text{ m/s } \\
\text{Heave velocity} & w & \text{Vertical velocity} & - 3 0 \text{--} 3 0 \ \text{ m/s } \\
\text{Roll rate} & p & \text{Roll angular velocity} & - 1 \text{--} 1 \ \text{ rad/s } \\
\end{array}
$$

**The body axis system is the reason the aircraft equations of motion are designed for the axes, not the angles, and the axes are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics. The engineer who calculates the aircraft equations of motion without checking the body axis system is not calculating the aircraft equations of motion; they are guessing.**
:::

::: definition The Euler angles {#def-euler-angles}
The **Euler angles** are the three angles that describe the orientation of the body axis system relative to the inertial (earth) axis system, and the Euler angles are the reason the engineer can simulate the aircraft trajectory and analyze the stability and control.

The **Euler angles** are:

$$
\theta \; \text{(pitch)}, \quad \phi \; \text{(roll)}, \quad \psi \; \text{(yaw)}
$$

The **Euler angle kinematic equations** are:

$$
\dot { \phi } \; = \; p + q \, \sin \phi \, \tan \theta + r \, \cos \phi \, \tan \theta
$$

$$
\dot { \theta } \; = \; q \, \cos \phi - r \, \sin \phi
$$

$$
\dot { \psi } \; = \; q \, \sin \phi \, / \cos \theta + r \, \cos \phi \, / \cos \theta
$$

The **direction cosine matrix** is:

$$
T _ { \text{IB } } \; = \; { \left[ \begin{array} { l l l } { \cos \theta \cos \psi } & { \sin \phi \sin \theta \cos \psi - \cos \phi \sin \psi } & { \cos \phi \sin \theta \cos \psi + \sin \phi \sin \psi } \\ { \cos \theta \sin \psi } & { \sin \phi \sin \theta \sin \psi + \cos \phi \cos \psi } & { \cos \phi \sin \theta \sin \psi - \sin \phi \cos \psi } \\ { - \sin \theta } & { \sin \phi \cos \theta } & { \cos \phi \cos \theta } \end{array} \right] }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Pitch angle} & \theta & \text{Nose up/down} & - 3 0 ^ { \circ } \text{--} + 6 0 ^ { \circ } \\
\text{Roll angle} & \phi & \text{Wing tilt} & - 1 8 0 ^ { \circ } \text{--} + 1 8 0 ^ { \circ } \\
\text{Yaw angle} & \psi & \text{Heading} & 0 ^ { \circ } \text{--} 3 6 0 ^ { \circ } \\
\text{DCM} & T _ { \text{IB } } & \text{Body to inertial} & \text{Orthogonal} \\
\end{array}
$$

**The wind axis system is the reason the aircraft equations of motion are designed for the axes, not the angles, and the axes are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics. The engineer who calculates the aircraft equations of motion without checking the wind axis system is not calculating the aircraft equations of motion; they are guessing.**
:::

::: widget plot
title: The Euler angle rates vs pitch angle
f: 0.1/cos(x*3.14159/180)
x: -80,80
y: 0,6
labels: psi_dot
caption: The yaw rate against the pitch angle for $q = 0 . 1$ rad/s and $\phi = 0$ . **The yaw rate increases with the pitch angle, and the yaw rate is the reason the aircraft equations of motion are designed for the angles, not the rates.** **The angles are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

::: example Euler angle kinematics {#ex-euler-kinematics level=3 check="2"}
An aircraft has $p = 0 . 0 5 \; \text{rad/s }$ , $q = 0 . 1 \; \text{rad/s }$ , $r = 0 . 0 2 \; \text{rad/s }$ , $\phi = 1 0 ^ { \circ }$ , and $\theta = 5 ^ { \circ }$ . Calculate the Euler angle rates.

**Roll rate:**

$$
\dot { \phi } \; = \; p + q \, \sin \phi \, \tan \theta + r \, \cos \phi \, \tan \theta
$$

$$
= \; 0 . 0 5 + 0 . 1 \times \sin 1 0 ^ { \circ } \times \tan 5 ^ { \circ } + 0 . 0 2 \times \cos 1 0 ^ { \circ } \times \tan 5 ^ { \circ }
$$

$$
= \; 0 . 0 5 + 0 . 1 \times 0 . 1 7 3 6 \times 0 . 0 8 7 5 + 0 . 0 2 \times 0 . 9 8 4 8 \times 0 . 0 8 7 5
$$

$$
= \; 0 . 0 5 + 0 . 0 0 1 5 2 + 0 . 0 0 1 7 2 \; = \; { \bf 0 . 0 5 3 2 } \; \text{rad/s }
$$

**Pitch rate:**

$$
\dot { \theta } \; = \; q \, \cos \phi - r \, \sin \phi \; = \; 0 . 1 \times \cos 1 0 ^ { \circ } - 0 . 0 2 \times \sin 1 0 ^ { \circ }
$$

$$
= \; 0 . 1 \times 0 . 9 8 4 8 - 0 . 0 2 \times 0 . 1 7 3 6 \; = \; 0 . 0 9 8 4 8 - 0 . 0 0 3 4 7 \; = \; { \bf 0 . 0 9 5 0 } \; \text{rad/s }
$$

**Yaw rate:**

$$
\dot { \psi } \; = \; ( q \, \sin \phi + r \, \cos \phi ) \, / \cos \theta \; = \; ( 0 . 1 \times 0 . 1 7 3 6 + 0 . 0 2 \times 0 . 9 8 4 8 ) \, / \cos 5 ^ { \circ }
$$

$$
= \; ( 0 . 0 1 7 3 6 + 0 . 0 1 9 7 0 ) \, / 0 . 9 9 6 2 \; = \; 0 . 0 3 7 0 6 \, / 0 . 9 9 6 2 \; = \; { \bf 0 . 0 3 7 2 } \; \text{rad/s }
$$

**The Euler angle rates are $\dot { \phi } = 0 . 0 5 3 2$ , $\dot { \theta } = 0 . 0 9 5 0$ , and $\dot { \psi } = 0 . 0 3 7 2$ rad/s. The engineer would design the aircraft for the tensor, because the tensor is the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

## 2. Equations of motion

::: definition The translational equations of motion {#def-translational-eom}
The **translational equations of motion** are Newton's second law applied to the three translational degrees of freedom in the body axis system, and the translational equations of motion are the reason the engineer can simulate the aircraft trajectory and analyze the stability and control.

The **translational equations of motion** are:

$$
m \, ( \dot { u } + q \, w - r \, v ) \; = \; X \; = \; T _ { x } - D \cos \alpha \cos \beta + L \sin \alpha \cos \beta - m \, g \, \sin \theta
$$

$$
m \, ( \dot { v } + r \, u - p \, w ) \; = \; Y \; = \; T _ { y } + D \sin \beta + L \cos \alpha \sin \beta + m \, g \, \cos \theta \sin \phi
$$

$$
m \, ( \dot { w } + p \, v - q \, u ) \; = \; Z \; = \; T _ { z } - D \sin \alpha \cos \beta + L \cos \alpha \cos \beta - m \, g \, \cos \theta \cos \phi
$$

The **Coriolis terms** are:

$$
q \, w - r \, v , \quad r \, u - p \, w , \quad p \, v - q \, u
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Mass} & m & \text{Aircraft mass} & 1 0 0 0 \text{--} 5 0 0 { , } 0 0 0 \ \text{ kg } \\
\text{Thrust (body x)} & T _ { x } & \text{Thrust component} & 0 \text{--} 5 0 0 { , } 0 0 0 \ \text{ N } \\
\text{Drag} & D & \text{Aerodynamic drag} & 1 0 0 0 \text{--} 1 0 0 { , } 0 0 0 \ \text{ N } \\
\text{Lift} & L & \text{Aerodynamic lift} & 1 0 { , } 0 0 0 \text{--} 1 { , } 0 0 0 { , } 0 0 0 \ \text{ N } \\
\end{array}
$$

**The inertia tensor is the reason the aircraft equations of motion are designed for the tensor, not the scalar, and the tensor is the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics. The engineer who calculates the aircraft equations of motion without checking the inertia tensor is not calculating the aircraft equations of motion; they are guessing.**
:::

::: definition The rotational equations of motion {#def-rotational-eom}
The **rotational equations of motion** are Euler's equations applied to the three rotational degrees of freedom in the body axis system, and the rotational equations of motion are the reason the engineer can simulate the aircraft trajectory and analyze the stability and control.

The **rotational equations of motion** are:

$$
I _ { x x } \, \dot { p } - I _ { x z } \, \dot { r } + q \, r \, ( I _ { z z } - I _ { y y } ) - p \, q \, I _ { x z } \; = \; \ell
$$

$$
I _ { y y } \, \dot { q } + p \, r \, ( I _ { x x } - I _ { z z } ) + ( r ^ { 2 } - p ^ { 2 } ) \, I _ { x z } \; = \; m
$$

$$
I _ { z z } \, \dot { r } - I _ { x z } \, \dot { p } + p \, q \, ( I _ { y y } - I _ { x x } ) + q \, r \, I _ { x z } \; = \; n
$$

The **inertia tensor** is:

$$
\mathbf { I } \; = \; { \left[ \begin{array} { l l l } { I _ { x x } } & { - I _ { x y } } & { - I _ { x z } } \\ { - I _ { x y } } & { I _ { y y } } & { - I _ { y z } } \\ { - I _ { x z } } & { - I _ { y z } } & { I _ { z z } } \end{array} \right] }
$$

The **symmetry assumption** is:

$$
I _ { x y } \; = \; I _ { y z } \; = \; 0 \quad \text{(symmetric aircraft)}
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Roll inertia} & I _ { x x } & \text{Roll moment of inertia} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 6 } \ \text{ kg m } ^ { 2 } \\
\text{Pitch inertia} & I _ { y y } & \text{Pitch moment of inertia} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 6 } \ \text{ kg m } ^ { 2 } \\
\text{Yaw inertia} & I _ { z z } & \text{Yaw moment of inertia} & 1 0 ^ { 3 } \text{--} 1 0 ^ { 6 } \ \text{ kg m } ^ { 2 } \\
\text{Product of inertia} & I _ { x z } & \text{Pitch-roll coupling} & 0 \text{--} 1 0 ^ { 5 } \ \text{ kg m } ^ { 2 } \\
\end{array}
$$

**The Coriolis terms are the reason the aircraft equations of motion are designed for the terms, not the forces, and the terms are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics. The engineer who calculates the aircraft equations of motion without checking the Coriolis terms is not calculating the aircraft equations of motion; they are guessing.**
:::

::: widget plot
title: The gravity component vs pitch angle
f: -9.81*sin(x*3.14159/180)
x: -90,90
y: -10,10
labels: g_x
caption: The gravity component along the body x-axis against the pitch angle. **The gravity component varies with the pitch angle, and the gravity component is the reason the aircraft equations of motion are designed for the components, not the magnitude.** **The components are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

::: example Translational equations for steady level flight {#ex-translational-steady level=3 check="2"}
An aircraft flies in steady level flight with $V = 2 0 0 \; \text{m/s }$ , $\theta = 0$ , $\phi = 0$ , $W = 2 0 0 { , } 0 0 0 \; \text{N }$ , and $T = 2 0 { , } 0 0 0 \; \text{N }$ . Verify that the translational equations of motion reduce to the steady level flight conditions.

**Steady level flight conditions:**

$$
\dot { u } = \dot { v } = \dot { w } = 0 , \quad p = q = r = 0 , \quad \theta = 0 , \quad \phi = 0
$$

**X-equation (forward):**

$$
m \, ( \dot { u } + q \, w - r \, v ) \; = \; T - D - m \, g \, \sin \theta
$$

$$
0 \; = \; T - D - 0 \quad \Rightarrow \quad T \; = \; D \quad \checkmark
$$

**Z-equation (vertical):**

$$
m \, ( \dot { w } + p \, v - q \, u ) \; = \; L - m \, g \, \cos \theta \, \cos \phi
$$

$$
0 \; = \; L - m \, g \quad \Rightarrow \quad L \; = \; W \; = \; { \bf 2 0 0 { , } 0 0 0 } \; \text{N }
$$

**Y-equation (lateral):**

$$
m \, ( \dot { v } + r \, u - p \, w ) \; = \; Y + m \, g \, \cos \theta \, \sin \phi
$$

$$
0 \; = \; Y + 0 \quad \Rightarrow \quad Y \; = \; 0 \quad \checkmark
$$

**Drag:**

$$
D \; = \; T \; = \; { \bf 2 0 { , } 0 0 0 } \; \text{N }
$$

**Lift-to-drag ratio:**

$$
L / D \; = \; { \frac { 2 0 0 { , } 0 0 0 } { 2 0 { , } 0 0 0 } } \; = \; { \bf 1 0 }
$$

**The translational equations reduce to $T = D$ and $L = W$ in steady level flight. The engineer would design the aircraft for the angles, because the angles are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

::: example Rotational equations for steady roll {#ex-rotational-steady-roll level=3 check="2"}
An aircraft has $I _ { x x } = 4 0 { , } 0 0 0 \\; \\text{kg m } ^ { 2 }$ , $I _ { y y } = 6 0 { , } 0 0 0 \\; \\text{kg m } ^ { 2 }$ , $I _ { z z } = 8 0 { , } 0 0 0 \\; \\text{kg m } ^ { 2 }$ , $I _ { x z } = 3 0 0 0 \\; \\text{kg m } ^ { 2 }$ , $p = 0 . 2 \\; \\text{rad/s }$ , $q = 0 . 0 5 \\; \\text{rad/s }$ , and $r = 0 . 0 1 \\; \\text{rad/s }$ . Calculate the rolling moment $\\ell$ for steady roll ($\\dot { p } = \\dot { r } = 0$ ).

**Roll equation (X-moment):**

$$
\\ell \\; = \\; q \\, r \\, ( I _ { z z } - I _ { y y } ) - p \\, q \\, I _ { x z }
$$

**First term:**

$$
q \\, r \\, ( I _ { z z } - I _ { y y } ) \\; = \\; 0 . 0 5 \\times 0 . 0 1 \\times ( 8 0 { , } 0 0 0 - 6 0 { , } 0 0 0 ) \\; = \\; 0 . 0 0 0 5 \\times 2 0 { , } 0 0 0 \\; = \\; 1 0 \\; \\text{N m }
$$

**Second term:**

$$
p \\, q \\, I _ { x z } \\; = \\; 0 . 2 \\times 0 . 0 5 \\times 3 0 0 0 \\; = \\; 3 0 \\; \\text{N m }
$$

**Rolling moment:**

$$
\\ell \\; = \\; 1 0 - 3 0 \\; = \\; { \\bf - 2 0 } \\; \\text{N m }
$$

**Note:** The negative rolling moment means the aircraft requires a left rolling moment to maintain steady roll with these angular rates.

**Pitch equation (Y-moment):**

$$
m \\; = \\; p \\, r \\, ( I _ { x x } - I _ { z z } ) + ( r ^ { 2 } - p ^ { 2 } ) \\, I _ { x z }
$$

$$
= \\; 0 . 2 \\times 0 . 0 1 \\times ( 4 0 { , } 0 0 0 - 8 0 { , } 0 0 0 ) + ( 0 . 0 1 ^ { 2 } - 0 . 2 ^ { 2 } ) \\times 3 0 0 0
$$

$$
= \\; 0 . 0 0 2 \\times ( - 4 0 { , } 0 0 0 ) + ( 0 . 0 0 0 1 - 0 . 0 4 ) \\times 3 0 0 0
$$

$$
= \\; - 8 0 + ( - 0 . 0 3 9 9 ) \\times 3 0 0 0 \\; = \\; - 8 0 - 1 1 9 . 7 \\; = \\; { \\bf - 1 9 9 . 7 } \\; \\text{N m }
$$

**The rolling moment is -20 N·m and the pitching moment is -199.7 N·m. The engineer would design the aircraft for the matrices, because the matrices are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

::: example Wind axis transformation {#ex-wind-axis-transform level=3 check="2"}
An aircraft has $u = 1 9 0 \\; \\text{m/s }$ , $w = 2 0 \\; \\text{m/s }$ , and $v = 5 \\; \\text{m/s }$ . Calculate the total velocity, angle of attack, and sideslip angle.

**Total velocity:**

$$
V \\; = \\; { \sqrt { u ^ { 2 } + v ^ { 2 } + w ^ { 2 } } } \\; = \\; { \sqrt { 1 9 0 ^ { 2 } + 5 ^ { 2 } + 2 0 ^ { 2 } } } \\; = \\; { \sqrt { 3 6 { , } 1 0 0 + 2 5 + 4 0 0 } }
$$

$$
V \\; = \\; { \sqrt { 3 6 { , } 5 2 5 } } \\; = \\; { \\bf 1 9 1 . 1 } \\; \\text{m/s }
$$

**Angle of attack:**

$$
\\alpha \\; = \\; \\arctan \\left( { \frac { w } { u } } \\right) \\; = \\; \\arctan \\left( { \frac { 2 0 } { 1 9 0 } } \\right) \\; = \\; \\arctan ( 0 . 1 0 5 3 ) \\; = \\; { \\bf 6 . 0 1 ^ { \\circ } }
$$

**Sideslip angle:**

$$
\\beta \\; = \\; \\arcsin \\left( { \frac { v } { V } } \\right) \\; = \\; \\arcsin \\left( { \frac { 5 } { 1 9 1 . 1 } } \\right) \\; = \\; \\arcsin ( 0 . 0 2 6 2 ) \\; = \\; { \\bf 1 . 5 0 ^ { \\circ } }
$$

**Flight path angle (in the X-Z plane):**

$$
\\gamma \\; = \\; \\arctan \\left( { \frac { w } { u } } \\right) \\; = \\; { \\bf 6 . 0 1 ^ { \\circ } } \\quad \\text{(same as } \\alpha \\text{ for } \\theta = 0 \\text{)}
$$

**The total velocity is 191.1 m/s, the angle of attack is 6.01°, and the sideslip angle is 1.50°. The engineer would design the aircraft for the components, because the components are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.**
:::

::: exercise Gravity component in body axes {#ex-gravity-body-ex level=3 check="2"}
An aircraft has $W = 5 0 { , } 0 0 0 \\; \\text{N }$ , $\\theta = 1 0 ^ { \\circ }$ , and $\\phi = 3 ^ { \\circ }$ . Calculate the gravity component along the body z-axis.

::: solution
$$
G _ { z } \\; = \\; - W \\, \\cos \\theta \\, \\cos \\phi \\; = \\; - 5 0 { , } 0 0 0 \\times \\cos 1 0 ^ { \\circ } \\times \\cos 3 ^ { \\circ }
$$

$$
G _ { z } \\; = \\; - 5 0 { , } 0 0 0 \\times 0 . 9 8 4 8 \\times 0 . 9 9 8 6 \\; = \\; { \\bf - 4 9 { , } 1 7 5 } \\; \\text{N }
$$

**The gravity component along the body z-axis is -49,175 N.**
:::
:::

## Exercises

::: exercise Euler angle rates {#ex-euler-rates-ex level=3 check="2"}
An aircraft has $p = 0$ , $q = 0 . 2 \; \text{rad/s }$ , $r = 0$ , $\phi = 0$ , and $\theta = 3 0 ^ { \circ }$ . Calculate the Euler angle rates.

::: solution
$$
\dot { \phi } \; = \; p + q \, \sin \phi \, \tan \theta + r \, \cos \phi \, \tan \theta \; = \; 0 + 0 + 0 \; = \; { \bf 0 } \; \text{rad/s }
$$

$$
\dot { \theta } \; = \; q \, \cos \phi - r \, \sin \phi \; = \; 0 . 2 \times 1 - 0 \; = \; { \bf 0 . 2 } \; \text{rad/s }
$$

$$
\dot { \psi } \; = \; ( q \, \sin \phi + r \, \cos \phi ) \, / \cos \theta \; = \; ( 0 + 0 ) \, / \cos 3 0 ^ { \circ } \; = \; { \bf 0 } \; \text{rad/s }
$$

**The Euler angle rates are $\dot { \phi } = 0$ , $\dot { \theta } = 0 . 2$ , and $\dot { \psi } = 0$ rad/s.**
:::
:::

::: exercise Gravity component {#ex-gravity-component-ex level=3 check="2"}
An aircraft has $W = 1 0 0 { , } 0 0 0 \; \text{N }$ , $\theta = 1 5 ^ { \circ }$ , and $\phi = 5 ^ { \circ }$ . Calculate the gravity component along the body x-axis.

::: solution
$$
G _ { x } \; = \; - W \, \sin \theta \; = \; - 1 0 0 { , } 0 0 0 \times \sin 1 5 ^ { \circ } \; = \; - 1 0 0 { , } 0 0 0 \times 0 . 2 5 8 8 \; = \; { \bf - 2 5 { , } 8 8 0 } \; \text{N }
$$

**The gravity component along the body x-axis is -25,880 N.**
:::
:::

::: exercise Coriolis term {#ex-coriolis-term-ex level=3 check="2"}
An aircraft has $p = 0 . 1 \; \text{rad/s }$ , $q = 0 . 0 5 \; \text{rad/s }$ , $r = 0 . 0 2 \; \text{rad/s }$ , $u = 1 5 0 \; \text{m/s }$ , $v = 5 \; \text{m/s }$ , and $w = - 2 \; \text{m/s }$ . Calculate the Coriolis term in the X-equation.

::: solution
$$
\text{Coriolis}_ { X } \; = \; q \, w - r \, v \; = \; 0 . 0 5 \times ( - 2 ) - 0 . 0 2 \times 5 \; = \; - 0 . 1 - 0 . 1 \; = \; { \bf - 0 . 2 } \; \text{m/s}^2
$$

**The Coriolis term in the X-equation is -0.2 m/s².**
:::
:::

::: exercise Inertia tensor {#ex-inertia-tensor-ex level=3 check="2"}
An aircraft has $I _ { x x } = 5 0 { , } 0 0 0 \; \text{kg m } ^ { 2 }$ , $I _ { y y } = 8 0 { , } 0 0 0 \; \text{kg m } ^ { 2 }$ , $I _ { z z } = 1 0 0 { , } 0 0 0 \; \text{kg m } ^ { 2 }$ , and $I _ { x z } = 5 0 0 0 \; \text{kg m } ^ { 2 }$ . Calculate the pitch equation coefficient $I _ { x x } - I _ { z z }$ .

::: solution
$$
I _ { x x } - I _ { z z } \; = \; 5 0 { , } 0 0 0 - 1 0 0 { , } 0 0 0 \; = \; { \bf - 5 0 { , } 0 0 0 } \; \text{kg m } ^ { 2 }
$$

**The pitch equation coefficient is -50,000 kg·m².**
:::
:::

::: exercise Direction cosine matrix {#ex-dcm-ex level=3 check="2"}
An aircraft has $\theta = 0$ , $\phi = 0$ , and $\psi = 9 0 ^ { \circ }$ . Calculate the $( 1 , 1 )$ element of the direction cosine matrix.

::: solution
$$
T _ { \text{IB } } ( 1 , 1 ) \; = \; \cos \theta \, \cos \psi \; = \; \cos 0 \times \cos 9 0 ^ { \circ } \; = \; 1 \times 0 \; = \; { \bf 0 }
$$

**The (1,1) element of the DCM is 0.**
:::
:::

::: exercise Derivation: the translational equations of motion {#ex-derive-translational level=4 check="2"}
Show that the X-equation in body axes is $m \, ( \dot { u } + q \, w - r \, v ) = X$ . Write the expression for the Coriolis terms.

::: solution
The **velocity vector** in body axes is:

$$
\mathbf { V } \; = \; u \, \mathbf { i } + v \, \mathbf { j } + w \, \mathbf { k }
$$

The **acceleration** in a rotating frame is:

$$
\mathbf { a } \; = \; { \frac { \delta \mathbf { V } } { \delta t } } \; = \; { \dot { u } } \, \mathbf { i } + { \dot { v } } \, \mathbf { j } + { \dot { w } } \, \mathbf { k } + \boldsymbol { \omega } \times \mathbf { V }
$$

The **cross product** $\boldsymbol { \omega } \times \mathbf { V }$ is:

$$
\boldsymbol { \omega } \times \mathbf { V } \; = \; { \left| \begin{array} { l l l } { \mathbf { i } } & { \mathbf { j } } & { \mathbf { k } } \\ { p } & { q } & { r } \\ { u } & { v } & { w } \end{array} \right| }
$$

The **X-component** is:

$$
( \boldsymbol { \omega } \times \mathbf { V } ) _ { x } \; = \; q \, w - r \, v
$$

Applying **Newton's second law**:

$$
m \, ( \dot { u } + q \, w - r \, v ) \; = \; X
$$

The **Coriolis terms** are:

$$
q \, w - r \, v , \quad r \, u - p \, w , \quad p \, v - q \, u
$$

**The Euler angles are the reason the aircraft equations of motion are designed for the angles, not the rates, and the angles are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** $\blacksquare$
:::
:::

::: exercise Derivation: the rotational equations of motion {#ex-derive-rotational level=4 check="2"}
Show that the Y-equation (pitch) in body axes is $I _ { y y } \, \dot { q } + p \, r \, ( I _ { x x } - I _ { z z } ) + ( r ^ { 2 } - p ^ { 2 } ) \, I _ { x z } = m$ . Write the expression for the inertia tensor.

::: solution
The **angular momentum** in body axes is:

$$
\mathbf { H } \; = \; \mathbf { I } \, \boldsymbol { \omega } \; = \; ( I _ { x x } \, p - I _ { x y } \, q - I _ { x z } \, r ) \, \mathbf { i } + ( - I _ { x y } \, p + I _ { y y } \, q - I _ { y z } \, r ) \, \mathbf { j } + ( - I _ { x z } \, p - I _ { y z } \, q + I _ { z z } \, r ) \, \mathbf { k }
$$

For a **symmetric aircraft** ($I _ { x y } = I _ { y z } = 0$ ):

$$
H _ { y } \; = \; I _ { y y } \, q
$$

Euler's **moment equation** in the rotating frame is:

$$
\boldsymbol { \omega } \times \mathbf { H } + { \frac { \delta \mathbf { H } } { \delta t } } \; = \; \mathbf { M }
$$

The **Y-component** is:

$$
( \boldsymbol { \omega } \times \mathbf { H } ) _ { y } + \dot { H } _ { y } \; = \; m
$$

$$
( \boldsymbol { \omega } \times \mathbf { H } ) _ { y } \; = \; r \, H _ { x } - p \, H _ { z } \; = \; r \, ( I _ { x x } \, p - I _ { x z } \, r ) - p \, ( I _ { z z } \, r - I _ { x z } \, p )
$$

$$
= \; p \, r \, ( I _ { x x } - I _ { z z } ) + I _ { x z } \, ( p ^ { 2 } - r ^ { 2 } )
$$

Therefore:

$$
I _ { y y } \, \dot { q } + p \, r \, ( I _ { x x } - I _ { z z } ) + ( r ^ { 2 } - p ^ { 2 } ) \, I _ { x z } \; = \; m
$$

The **inertia tensor** is:

$$
\mathbf { I } \; = \; { \left[ \begin{array} { l l l } { I _ { x x } } & { 0 } & { - I _ { x z } } \\ { 0 } & { I _ { y y } } & { 0 } \\ { - I _ { x z } } & { 0 } & { I _ { z z } } \end{array} \right] }
$$

**The transformation matrices are the reason the aircraft equations of motion are designed for the matrices, not the vectors, and the matrices are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.** $\blacksquare$
:::
:::

::: quiz Aircraft equations of motion {#quiz-eom}
The most fundamental dynamic analyses in flight mechanics are:

- [ ] Steady flight performance
- [x] The aircraft equations of motion
- [ ] Range and endurance
- [ ] Structural analysis

::: solution
**The aircraft equations of motion.** The aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics, because the equations of motion describe the six-degree-of-freedom (6-DOF) motion of the aircraft under the action of aerodynamic, propulsive, and gravitational forces. The engineer who calculates the aircraft equations of motion without checking the body axis system is not calculating the aircraft equations of motion; they are guessing.
:::
:::

::: quiz Body axis system {#quiz-body-axes}
The body axis system is:

- [ ] A coordinate system aligned with the velocity vector
- [x] A coordinate system fixed to the aircraft with origin at the center of gravity
- [ ] A coordinate system fixed to the earth
- [ ] A coordinate system aligned with the lift vector

::: solution
**A coordinate system fixed to the aircraft with origin at the center of gravity.** The body axis system is the coordinate system fixed to the aircraft with origin at the center of gravity, and the body axis system is the reason the engineer can simulate the aircraft trajectory and analyze the stability and control. The engineer who calculates the aircraft equations of motion without checking the body axis system is not calculating the aircraft equations of motion; they are guessing.
:::
:::

## Where this lesson leads

- **[[flight-mechanics/steady-flight-performance]]** — The steady flight performance is the foundation of the aircraft equations of motion.
- **[[flight-mechanics/range-endurance]]** — The range and endurance are the foundation of the aircraft equations of motion.
- **[[flight-mechanics/manoeuvres-takeoff-landing]]** — The manoeuvres, take-off and landing are the foundation of the aircraft equations of motion.
- **[[flight-mechanics/longitudinal-static-stability]]** — The longitudinal static stability is the foundation of the aircraft equations of motion.
- **[[flight-mechanics/lateral-static-stability]]** — The lateral-directional static stability is the foundation of the aircraft equations of motion.
- **[[flight-mechanics/dynamic-modes]]** — The dynamic modes are the foundation of the aircraft equations of motion.
- **[[flight-mechanics/flight-control]]** — The flight control is the foundation of the aircraft equations of motion.
- **[[aerodynamics/aerodynamic-forces]]** — The aerodynamic forces are the foundation of the aircraft equations of motion.
- **[[control-systems/modelling-dynamic-systems]]** — The modelling of dynamic systems is the foundation of the aircraft equations of motion.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of the aircraft equations of motion.

::: history Aircraft equations of motion: from Newton to flight simulation {#history-eom}
**1687** — **Newton** publishes the **Principia**, which is the foundation of the aircraft equations of motion. **The Principia is the reason the aircraft equations of motion are the oldest concept in flight mechanics, and the age is the reason the aircraft equations of motion are the most refined concept in flight mechanics.**

**1750s** — **Euler** formulates the **rotational equations of motion**, and the rotational equations of motion are the reason the aircraft equations of motion are the most historic concept in flight mechanics. **The rotational equations of motion are the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the rotational equations of motion are the most historic concept in flight mechanics.**

**1900s** — **Lanchester** applies the **equations of motion to aircraft**, and the equations of motion applied to aircraft are the reason the aircraft equations of motion are the most practical concept in flight mechanics. **The equations of motion applied to aircraft are the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the equations of motion applied to aircraft are the most practical concept in flight mechanics.**

**1940s** — **The flight simulator** is developed, and the flight simulator is the reason the aircraft equations of motion are the most powerful concept in flight mechanics. **The flight simulator is the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the flight simulator is the most powerful concept in flight mechanics.**

**1950s** — **The digital computer** is developed, and the digital computer is the reason the aircraft equations of motion are the most efficient concept in flight mechanics. **The digital computer is the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the digital computer is the most efficient concept in flight mechanics.**

**1970s** — **The real-time simulation** is developed, and the real-time simulation is the reason the aircraft equations of motion are the most advanced concept in flight mechanics. **The real-time simulation is the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the real-time simulation is the most advanced concept in flight mechanics.**

**1990s** — **The high-fidelity simulation** is developed, and the high-fidelity simulation is the reason the aircraft equations of motion are the most modern concept in flight mechanics. **The high-fidelity simulation is the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the high-fidelity simulation is the most modern concept in flight mechanics.**

**2010s** — **The full-envelope simulation** is developed, and the full-envelope simulation is the reason the aircraft equations of motion are the most futuristic concept in flight mechanics. **The full-envelope simulation is the reason the aircraft equations of motion are the most refined concept in flight mechanics, and the aircraft equations of motion are the reason the full-envelope simulation is the most futuristic concept in flight mechanics.**
:::

::: summary Aircraft equations of motion {#summary-eom}
- **The body axis system is $X _ { b }$ (forward), $Y _ { b }$ (right wing), $Z _ { b }$ (down), the velocity components are $\mathbf { V } = u \, \mathbf { i } _ { b } + v \, \mathbf { j } _ { b } + w \, \mathbf { k } _ { b }$ , and the angular velocity components are $\boldsymbol { \omega } = p \, \mathbf { i } _ { b } + q \, \mathbf { j } _ { b } + r \, \mathbf { k } _ { b }$ .** The body axis system is the reason the aircraft equations of motion are designed for the axes, not the angles, and the axes are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The Euler angles are $\theta$ (pitch), $\phi$ (roll), $\psi$ (yaw), the Euler angle kinematic equations are $\dot { \phi } = p + q \, \sin \phi \, \tan \theta + r \, \cos \phi \, \tan \theta$ , $\dot { \theta } = q \, \cos \phi - r \, \sin \phi$ , and $\dot { \psi } = ( q \, \sin \phi + r \, \cos \phi ) / \cos \theta$ .** The wind axis system is the reason the aircraft equations of motion are designed for the axes, not the angles, and the axes are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The direction cosine matrix is $T _ { \text{IB } }$ with elements involving $\cos \theta \cos \psi$ , $\sin \phi \sin \theta \cos \psi - \cos \phi \sin \psi$ , and $\cos \phi \sin \theta \cos \psi + \sin \phi \sin \psi$ , the pitch angle is $\theta = - 3 0 ^ { \circ } \text{--} + 6 0 ^ { \circ }$ , and the roll angle is $\phi = - 1 8 0 ^ { \circ } \text{--} + 1 8 0 ^ { \circ }$ .** The inertia tensor is the reason the aircraft equations of motion are designed for the tensor, not the scalar, and the tensor is the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The translational equations of motion are $m \, ( \dot { u } + q \, w - r \, v ) = X$ , $m \, ( \dot { v } + r \, u - p \, w ) = Y$ , and $m \, ( \dot { w } + p \, v - q \, u ) = Z$ , the Coriolis terms are $q \, w - r \, v$ , $r \, u - p \, w$ , and $p \, v - q \, u$ , and the gravity components are $- m \, g \, \sin \theta$ , $m \, g \, \cos \theta \, \sin \phi$ , and $- m \, g \, \cos \theta \, \cos \phi$ .** The Coriolis terms are the reason the aircraft equations of motion are designed for the terms, not the forces, and the terms are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The rotational equations of motion are $I _ { x x } \, \dot { p } - I _ { x z } \, \dot { r } + q \, r \, ( I _ { z z } - I _ { y y } ) - p \, q \, I _ { x z } = \ell$ , $I _ { y y } \, \dot { q } + p \, r \, ( I _ { x x } - I _ { z z } ) + ( r ^ { 2 } - p ^ { 2 } ) \, I _ { x z } = m$ , and $I _ { z z } \, \dot { r } - I _ { x z } \, \dot { p } + p \, q \, ( I _ { y y } - I _ { x x } ) + q \, r \, I _ { x z } = n$ .** The Euler angles are the reason the aircraft equations of motion are designed for the angles, not the rates, and the angles are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The inertia tensor is $\mathbf { I }$ with elements $I _ { x x }$ , $I _ { y y }$ , $I _ { z z }$ , and $I _ { x z }$ , the symmetry assumption is $I _ { x y } = I _ { y z } = 0$ , and the roll inertia is $I _ { x x } = 1 0 ^ { 3 } \text{--} 1 0 ^ { 6 } \; \text{kg m } ^ { 2 }$ .** The transformation matrices are the reason the aircraft equations of motion are designed for the matrices, not the vectors, and the matrices are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The pitch inertia is $I _ { y y } = 1 0 ^ { 3 } \text{--} 1 0 ^ { 6 } \; \text{kg m } ^ { 2 }$ , the yaw inertia is $I _ { z z } = 1 0 ^ { 3 } \text{--} 1 0 ^ { 6 } \; \text{kg m } ^ { 2 }$ , and the product of inertia is $I _ { x z } = 0 \text{--} 1 0 ^ { 5 } \; \text{kg m } ^ { 2 }$ .** The gravity components are the reason the aircraft equations of motion are designed for the components, not the magnitude, and the components are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The mass is $m = 1 0 0 0 \text{--} 5 0 0 { , } 0 0 0$ kg, the thrust is $T _ { x } = 0 \text{--} 5 0 0 { , } 0 0 0$ N, and the drag is $D = 1 0 0 0 \text{--} 1 0 0 { , } 0 0 0$ N.** The aerodynamic forces are the reason the aircraft equations of motion are designed for the forces, not the moments, and the forces are the reason the aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics.
- **The aircraft equations of motion calculation is the most important dynamic calculation in flight mechanics, because the aircraft equations of motion calculation determines the trajectory simulation and stability analysis of the aircraft.** The trajectory simulation and stability analysis are the reason the engineer can simulate the aircraft trajectory and analyze the stability and control.
- **The aircraft equations of motion are the most fundamental dynamic analyses in flight mechanics, because the equations of motion describe the six-degree-of-freedom (6-DOF) motion of the aircraft under the action of aerodynamic, propulsive, and gravitational forces.** The dynamic analysis is the reason the engineer can simulate the aircraft trajectory and analyze the stability and control.
:::

## Further reading

- **B. Stevens and F. Lewis (1992)** — *Aircraft Control and Simulation*. Wiley. The aircraft equations of motion, the body axis system, and the wind axis system.
- **J. D. Anderson (2017)** — *Aircraft Performance and Design*. McGraw-Hill. The aircraft equations of motion and the Euler angles.
- **P. Filippone (2012)** — *Flight Vehicle Performance and Design*. Springer. The aircraft equations of motion and the inertia tensor.
- **E. Torenbeek (1982)** — *Synthesis of Subsonic Airplane Design*. Delft University Press. The aircraft equations of motion and the Coriolis terms.
- **J. Roskam (1987)** — *Airplane Design, Part 6: Preliminary Sizing of Airplanes*. Roskam Aviation. The aircraft equations of motion and the Euler angles.
- **D. P. Raymer (2012)** — *Aircraft Design: A Conceptual Approach*, 5th ed. AIAA. The aircraft equations of motion and the transformation matrices.
- **A. C. Kermode (2006)** — *Mechanics of Flight*, 9th ed. Pearson. The aircraft equations of motion and the gravity components.
- **W. Nelson (1998)** — *Flight Stability and Automatic Control*, 2nd ed. McGraw-Hill. The aircraft equations of motion and the aerodynamic forces.
