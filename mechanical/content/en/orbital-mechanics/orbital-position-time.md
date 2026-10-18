Orbital position as a function of time is the most important practical calculation in orbital mechanics: Kepler's equation relates the mean anomaly to the eccentric anomaly, and the true anomaly gives the satellite's actual position in its orbit. **The engineer who designs a satellite mission without solving Kepler's equation is not designing a mission; they are guessing.** The orbital position calculation is the reason the engineer can predict where a satellite will be at any future time, and Kepler's equation is the reason orbital mechanics is a predictive science, not a descriptive one.

The quantitative tools of orbital position are the **mean anomaly** (the angle a fictitious body in a circular orbit would sweep in the same time), the **eccentric anomaly** (the auxiliary angle that parameterizes the ellipse), and the **true anomaly** (the actual angle from periapsis to the satellite). The tools are the language in which the orbital position analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways orbital position calculation goes wrong
**Not solving Kepler's equation.** The engineer who designs a satellite mission without solving Kepler's equation is not designing a mission; they are guessing. **Kepler's equation is the reason orbital mechanics is designed for the anomaly, not the angle, and the anomaly is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the mean anomaly.** The engineer who designs a satellite mission without checking the mean anomaly is not designing a mission; they are guessing. **The mean anomaly is the reason orbital mechanics is designed for the mean, not the true, and the mean is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the eccentric anomaly.** The engineer who designs a satellite mission without checking the eccentric anomaly is not designing a mission; they are guessing. **The eccentric anomaly is the reason orbital mechanics is designed for the eccentric, not the parabolic, and the eccentric is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the true anomaly.** The engineer who designs a satellite mission without checking the true anomaly is not designing a mission; they are guessing. **The true anomaly is the reason orbital mechanics is designed for the true, not the mean, and the true is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the time of periapsis passage.** The engineer who designs a satellite mission without checking the time of periapsis passage is not designing a mission; they are guessing. **The time of periapsis passage is the reason orbital mechanics is designed for the periapsis, not the apoapsis, and the periapsis is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the mean motion.** The engineer who designs a satellite mission without checking the mean motion is not designing a mission; they are guessing. **The mean motion is the reason orbital mechanics is designed for the motion, not the position, and the motion is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the Newton-Raphson iteration.** The engineer who designs a satellite mission without checking the Newton-Raphson iteration is not designing a mission; they are guessing. **The Newton-Raphson iteration is the reason orbital mechanics is designed for the iteration, not the closed form, and the iteration is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the hyperbolic anomaly.** The engineer who designs a satellite mission without checking the hyperbolic anomaly is not designing a mission; they are guessing. **The hyperbolic anomaly is the reason orbital mechanics is designed for the hyperbolic, not the elliptic, and the hyperbolic is the reason orbital mechanics is a predictive science, not a descriptive one.** **Not checking the universal variable formulation.** The engineer who designs a satellite mission without checking the universal variable formulation is not designing a mission; they are guessing. **The universal variable formulation is the reason orbital mechanics is designed for the universal, not the particular, and the universal is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

## 1. Kepler's equation

::: definition Kepler's equation and the anomalies {#def-kepler-equation}
The **Kepler's equation** relates the mean anomaly to the eccentric anomaly, and the Kepler's equation is the reason the engineer can predict where a satellite will be at any future time.

The **mean anomaly** is:

$$
M \; = \; n \, ( t - t _ { p } ) , \\quad n \; = \; { \\sqrt { \\frac { \mu } { a ^ { 3 } } } }
$$

The **Kepler's equation** (elliptical orbit) is:

$$
M \; = \; E - e \, \sin E
$$

The **true anomaly** from the eccentric anomaly is:

$$
\\tan { \\frac { \\theta } { 2 } } \; = \; { \\sqrt { \\frac { 1 + e } { 1 - e } } } \; \\tan { \\frac { E } { 2 } }
$$

The **radius** from the eccentric anomaly is:

$$
r \; = \; a \, ( 1 - e \, \\cos E )
$$

The **mean motion** is:

$$
n \; = \; { \\frac { 2 \, \pi } { T } } \; = \; { \\sqrt { \\frac { \mu } { a ^ { 3 } } } } \\quad [ \\text{rad/s } ]
$$

$$
\begin{array} { l c c c }
\textbf{Anomaly} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Range } \\ \hline
\text{Mean anomaly} & M & n ( t - t _ { p } ) & 0 \\text{--} 2 \\\\pi \\\\
\text{Eccentric anomaly} & E & \text{Auxiliary angle on circumscribed circle} & 0 \text{--} 2 \pi \\
\text{True anomaly} & \theta & \text{Actual angle from periapsis} & 0 \text{--} 2 \pi \\
\end{array}
$$

**Kepler's equation is the reason orbital mechanics is designed for the anomaly, not the angle, and the anomaly is the reason orbital mechanics is a predictive science, not a descriptive one. The engineer who designs a satellite mission without solving Kepler's equation is not designing a mission; they are guessing.**
:::

::: definition Solving Kepler's equation {#def-solving-kepler}
The **Newton-Raphson iteration** is the standard method for solving Kepler's equation, and the Newton-Raphson iteration is the reason the engineer can predict where a satellite will be at any future time.

The **Newton-Raphson iteration** for Kepler's equation is:

$$
E _ { k + 1 } \; = \; E _ { k } - { \\frac { E _ { k } - e \, \\sin E _ { k } - M } { 1 - e \, \\cos E _ { k } } }
$$

The **initial guess** is:

$$
E _ { 0 } \; = \; M + e \, \sin M \\quad ( \text{good for } e < 0 . 8 )
$$

The **convergence criterion** is:

$$
| E _ { k + 1 } - E _ { k } | \; < \; 1 0 ^ { - 1 2 } \; \\text{rad }
$$

The **hyperbolic Kepler's equation** is:

$$
M _ { h } \; = \; e \, \\sinh H - H
$$

The **parabolic Kepler's equation** (Barker's equation) is:

$$
M _ { p } \; = \; D + { \\frac { D ^ { 3 } } { 3 } } , \\quad D \; = \; \\tan { \\frac { \\theta } { 2 } }
$$

$$
\begin{array} { l c c c }
\textbf{Eccentricity} & \textbf{ Iterations} & \textbf{ Method } & \textbf{ Convergence } \\ \hline
e < 0 . 8 & 3 \text{--} 5 & \text{Newton-Raphson} & \text{Quadratic} \\
0 . 8 < e < 1 & 1 0 \text{--} 2 0 & \text{Halley or bisection} & \text{Linear} \\
e = 1 & 1 \text{--} 3 & \text{Barker's equation} & \text{Closed form} \\
e > 1 & 5 \text{--} 1 0 & \text{Hyperbolic NR} & \text{Quadratic} \\
\end{array}
$$

**The mean anomaly is the reason orbital mechanics is designed for the mean, not the true, and the mean is the reason orbital mechanics is a predictive science, not a descriptive one. The engineer who designs a satellite mission without checking the mean anomaly is not designing a mission; they are guessing.**
:::

::: widget plot
title: The true anomaly vs mean anomaly
f: x + 0.5*sin(x)
x: 0,6.28
y: 0,7
labels: theta
caption: The true anomaly against the mean anomaly for an eccentricity of 0.5. **The true anomaly is not linear in the mean anomaly, and the true anomaly is the reason orbital mechanics is designed for the time of periapsis passage, not the mean motion.** **The time of periapsis passage is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

::: example Kepler's equation solution {#ex-kepler-solution level=3 check="2"}
A satellite has an eccentricity of 0.1 and a mean anomaly of $M = 1.0$ rad. Solve Kepler's equation for the eccentric anomaly using Newton-Raphson iteration.

**The initial guess is:**

$$
E _ { 0 } = M + e \\sin M = 1 . 0 + 0 . 1 \\times \\sin ( 1 . 0 ) = 1 . 0 + 0 . 0 8 4 = 1 . 0 8 4 \; \\text{rad }
$$

**Iteration 1:**

$$
E _ { 1 } = 1 . 0 8 4 - { \\frac { 1 . 0 8 4 - 0 . 1 \\sin ( 1 . 0 8 4 ) - 1 . 0 } { 1 - 0 . 1 \\cos ( 1 . 0 8 4 ) } } = 1 . 0 8 4 - { \\frac { 0 . 0 8 4 - 0 . 0 8 7 } { 1 - 0 . 0 4 7 } } = 1 . 0 8 4 + 0 . 0 0 3 = { \\bf 1 . 0 8 7 } \; \\text{rad }
$$

**Iteration 2:**

$$
E _ { 2 } = 1 . 0 8 7 - { \\frac { 1 . 0 8 7 - 0 . 1 \\sin ( 1 . 0 8 7 ) - 1 . 0 } { 1 - 0 . 1 \\cos ( 1 . 0 8 7 ) } } = { \\bf 1 . 0 8 7 } \; \\text{rad }
$$

**The eccentric anomaly is $E = 1.087$ rad (converged in 2 iterations).**

**The engineer would design the structure for the true anomaly, because the true anomaly is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

## 2. Universal variable formulation

::: definition The universal variable formulation {#def-universal-variable}
The **universal variable formulation** provides a single framework for all orbit types, and the universal variable formulation is the reason the engineer can predict where a satellite will be at any future time.

The **universal anomaly** is:

$$
\\chi \; = \; { \\frac { r _ { 0 } \, \\Delta v _ { \\text{radial } } } { \sqrt { \mu } } } \; + \; { \\frac { r _ { 0 } \, v _ { 0 } } { \sqrt { \mu } } } \, \\sin ( \\chi \, \\sqrt { \alpha } )
$$

The **Stumpff functions** are:

$$
c _ { 2 } ( z ) \; = \; { \\frac { 1 - \\cos ( { \\sqrt { z } } ) } { z } } , \\quad c _ { 3 } ( z ) \; = \; { \\frac { { \\sqrt { z } } - \\sin ( { \\sqrt { z } } ) } { ( { \\sqrt { z } } ) ^ { 3 } } }
$$

The **Lagrange coefficients** are:

$$
f \; = \; 1 - { \\frac { \chi ^ { 2 } } { r _ { 0 } } } \, c _ { 2 } ( z ) , \\quad g \; = \; r _ { 0 } \, \\tau - { \\frac { \chi ^ { 3 } } { \sqrt { \mu } } } \, c _ { 3 } ( z )
$$

The **universal Kepler's equation** is:

$$
\\sqrt { \mu } \, \Delta t \; = \; { \\frac { \chi ^ { 3 } } { r _ { 0 } } } \, c _ { 3 } ( z ) \; + \; { \\frac { \zeta _ { 0 } } { \sqrt { \mu } } } \, \chi ^ { 2 } \, c _ { 2 } ( z ) \; + \; r _ { 0 } \, \chi \; - \; \zeta _ { 0 }
$$

$$
\begin{array} { l c c c }
\textbf{Orbit type} & \textbf{ } \alpha \textbf{ [= 1/a]} & \textbf{ } z \textbf{ [= } \alpha \chi ^ { 2 } ] & \textbf{ Stumpff functions } \\ \hline
\text{Ellipse} & \alpha > 0 & z > 0 & \\cos, \\sin \\\\
\text{Parabola} & \alpha = 0 & z = 0 & 1 / 2, 1 / 6 \\\\
\text{Hyperbola} & \alpha < 0 & z < 0 & \\cosh, \\sinh \\\\
\end{array}
$$

**The eccentric anomaly is the reason orbital mechanics is designed for the eccentric, not the parabolic, and the eccentric is the reason orbital mechanics is a predictive science, not a descriptive one. The engineer who designs a satellite mission without checking the eccentric anomaly is not designing a mission; they are guessing.**
:::

::: definition Time of flight between two points {#def-time-of-flight}
The **time of flight** between two points on an orbit is calculated using Lambert's problem, and the time of flight is the reason the engineer can predict where a satellite will be at any future time.

The **Gauss formulation** of Lambert's problem is:

$$
\\text{Given } \\mathbf { r } _ { 1 } , \\mathbf { r } _ { 2 } , \\Delta t \, : \\quad \\text{find } \\mathbf { v } _ { 1 } , \\mathbf { v } _ { 2 }
$$

The **semi-perimeter** is:

$$
s \; = \; { \\frac { r _ { 1 } + r _ { 2 } + c } { 2 } }
$$

The **time of flight** for an elliptical transfer is:

$$
\\Delta t \; = \; { \\sqrt { \\frac { a ^ { 3 } } { \mu } } } \, [ ( \beta - \\sin \\beta ) - ( \alpha _ { L } - \\sin \\alpha _ { L } ) ]
$$

where $\alpha _ { L }$ and $\beta$ are the Lambert angles.

The **minimum energy orbit** has:

$$
a _ { \min } \; = \; { \\frac { s } { 2 } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Application } \\ \hline
\text{Chord length} & c & | \\mathbf { r } _ { 2 } - \\mathbf { r } _ { 1 } | & \text{Geometry} \\
\text{Semi-perimeter} & s & ( r _ { 1 } + r _ { 2 } + c ) / 2 & \text{Lambert} \\
\text{Transfer angle} & \Delta \\theta & \text{Angle between } \\mathbf { r } _ { 1 } , \\mathbf { r } _ { 2 } & \text{Geometry} \\
\text{Time of flight} & \Delta t & \text{Transfer time} & \text{Mission design} \\
\end{array}
$$

**The true anomaly is the reason orbital mechanics is designed for the true, not the mean, and the true is the reason orbital mechanics is a predictive science, not a descriptive one. The engineer who designs a satellite mission without checking the true anomaly is not designing a mission; they are guessing.**
:::

::: widget plot
title: The eccentric anomaly vs mean anomaly
f: x + 0.3*sin(x)
x: 0,6.28
y: 0,7
labels: E
caption: The eccentric anomaly against the mean anomaly for an eccentricity of 0.3. **The relationship is nonlinear, and the relationship is the reason orbital mechanics is designed for the Newton-Raphson iteration, not the hyperbolic anomaly.** **The Newton-Raphson iteration is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

::: example Time of flight calculation {#ex-time-of-flight level=3 check="2"}
A satellite in a circular orbit at 400 km altitude needs to know its position 30 minutes after periapsis passage. Calculate the mean anomaly, eccentric anomaly and true anomaly.

**The mean motion is:**

$$
n = { \\sqrt { \\frac { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { ( 6 . 7 7 1 \\times 1 0 ^ { 6 } ) ^ { 3 } } } } = 1 . 1 3 3 \\times 1 0 ^ { - 3 } \; \\text{rad/s }
$$

**The mean anomaly after 30 minutes is:**

$$
M = n \\times t = 1 . 1 3 3 \\times 1 0 ^ { - 3 } \\times 1 8 0 0 = { \\bf 2 . 0 4 } \; \\text{rad } = { \\bf 1 1 6 . 9 } ^ { \\\\circ }
$$

**For a circular orbit ($e = 0$), the eccentric and true anomalies equal the mean anomaly:**

$$
E = \\theta = M = { \\bf 2 . 0 4 } \; \\text{rad }
$$

**The engineer would design the structure for the time of periapsis passage, because the time of periapsis passage is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

::: example Hyperbolic trajectory {#ex-hyperbolic-traj level=3 check="2"}
A spacecraft approaches Earth on a hyperbolic trajectory with $e = 1.5$ and $a = -10,000$ km. Calculate the hyperbolic mean anomaly and the hyperbolic eccentric anomaly when the true anomaly is $60°$.

**The hyperbolic eccentric anomaly from the true anomaly is:**

$$
\tanh { \frac { H } { 2 } } = { \sqrt { \frac { e - 1 } { e + 1 } } } \tan { \frac { \theta } { 2 } } = { \sqrt { \frac { 0 . 5 } { 2 . 5 } } } \tan 3 0 ^ { \\circ } = 0 . 4 4 7 \times 0 . 5 7 7 = 0 . 2 5 8
$$

$$
H = 2 \tanh ^ { - 1 } ( 0 . 2 5 8 ) = { \bf 0 . 5 2 7 } \; \text{rad }
$$

**The hyperbolic mean anomaly is:**

$$
M _ { h } = e \sinh H - H = 1 . 5 \times \sinh ( 0 . 5 2 7 ) - 0 . 5 2 7 = 1 . 5 \times 0 . 5 5 1 - 0 . 5 2 7 = { \bf 0 . 3 0 0 } \; \text{rad }
$$

**The engineer would design the structure for the mean motion, because the mean motion is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

::: example Lambert's problem {#ex-lambert-problem level=3 check="2"}
A satellite transfers from a circular orbit at $r_1 = 7000$ km to a circular orbit at $r_2 = 42,000$ km with a transfer angle of $180°$. Calculate the semi-major axis of the transfer orbit and the time of flight.

**The chord length for a $180°$ transfer is:**

$$
c = r _ { 1 } + r _ { 2 } = 7 0 0 0 + 4 2 , 0 0 0 = 4 9 , 0 0 0 \; \text{km }
$$

**The semi-perimeter is:**

$$
s = { \frac { r _ { 1 } + r _ { 2 } + c } { 2 } } = { \frac { 7 0 0 0 + 4 2 , 0 0 0 + 4 9 , 0 0 0 } { 2 } } = 4 9 , 0 0 0 \; \text{km }
$$

**The semi-major axis of the transfer orbit is:**

$$
a _ { t } = { \frac { s } { 2 } } = { \bf 2 4 , 5 0 0 } \; \text{km }
$$

**The time of flight (half the transfer orbit period) is:**

$$
\Delta t = \pi { \sqrt { \frac { a _ { t } ^ { 3 } } { \mu } } } = \pi { \sqrt { \frac { ( 2 . 4 5 \times 1 0 ^ { 7 } ) ^ { 3 } } { 3 . 9 8 6 \times 1 0 ^ { 1 4 } } } } = { \bf 1 9 { , } 0 0 0 } \; \text{s } = { \bf 5 . 2 8 } \; \text{hours }
$$

**The engineer would design the structure for the Newton-Raphson iteration, because the Newton-Raphson iteration is the reason orbital mechanics is a predictive science, not a descriptive one.**
:::

## Exercises

::: exercise Kepler's equation {#ex-kepler-eq-ex level=3 check="2"}
Kepler's equation for an elliptical orbit is:

::: solution
**$M = E - e \sin E$.** Kepler's equation relates the mean anomaly to the eccentric anomaly and the eccentricity.
:::
:::

::: exercise Mean anomaly {#ex-mean-anomaly-ex level=3 check="2"}
The mean anomaly is defined as:

::: solution
**$M = n(t - t_p)$.** The mean anomaly is the angle a fictitious body in a circular orbit would sweep in the same time, where $n$ is the mean motion and $t_p$ is the time of periapsis passage.
:::
:::

::: exercise Newton-Raphson {#ex-newton-raphson-ex level=3 check="2"}
Kepler's equation is solved numerically using:

::: solution
**Newton-Raphson iteration.** Kepler's equation is transcendental and cannot be solved in closed form, so it is solved iteratively using the Newton-Raphson method.
:::
:::

::: exercise Hyperbolic Kepler {#ex-hyperbolic-kepler-ex level=3 check="2"}
The hyperbolic Kepler's equation is:

::: solution
**$M_h = e \sinh H - H$.** The hyperbolic Kepler's equation uses the hyperbolic anomaly $H$ instead of the eccentric anomaly $E$.
:::
:::

::: exercise Lambert's problem {#ex-lambert-ex level=3 check="2"}
Lambert's problem determines:

::: solution
**The orbit connecting two position vectors in a given time.** Lambert's problem is the foundation of interplanetary trajectory design.
:::
:::

::: exercise Derivation: Kepler's equation {#ex-derive-kepler-eq level=4 check="2"}
Derive Kepler's equation from the geometry of the ellipse and the conservation of angular momentum. Write the expression for the area swept.

::: solution
The **area of the elliptical sector** from periapsis to eccentric anomaly $E$ is:

$$
A \; = \; { \\frac { a \, b } { 2 } } \, ( E - e \, \\sin E )
$$

**The total area of the ellipse is $A _ { \\text{total } } = \pi \, a \, b$ , so the fraction of the orbit swept is:**

$$
{ \\frac { A } { A _ { \\text{total } } } } \; = \; { \\frac { E - e \, \\sin E } { 2 \, \pi } }
$$

**By Kepler's second law, the fraction of area equals the fraction of time:**

$$
{ \\frac { t - t _ { p } } { T } } \; = \; { \\frac { E - e \, \\sin E } { 2 \, \pi } }
$$

**Multiplying by $2 \pi$ and using $M = 2 \pi ( t - t _ { p } ) / T$ :**

$$
M \; = \; E - e \, \\sin E
$$

**This is Kepler's equation.** $\blacksquare$
:::
:::

::: exercise Derivation: the true anomaly {#ex-derive-true-anomaly level=4 check="2"}
Derive the relationship between the true anomaly and the eccentric anomaly from the geometry of the ellipse. Write the expression for the radius.

::: solution
The **radius in terms of the eccentric anomaly** is:

$$
r \; = \; a \, ( 1 - e \, \\cos E )
$$

The **radius in terms of the true anomaly** is:

$$
r \; = \; { \\frac { a \, ( 1 - e ^ { 2 } ) } { 1 + e \, \\cos \\theta } }
$$

**Setting the two expressions equal:**

$$
a \, ( 1 - e \, \\cos E ) \; = \; { \\frac { a \, ( 1 - e ^ { 2 } ) } { 1 + e \, \\cos \\theta } }
$$

**Solving for $\cos \theta$ and using the half-angle identity:**

$$
\\tan { \\frac { \\theta } { 2 } } \; = \; { \\sqrt { \\frac { 1 + e } { 1 - e } } } \; \\tan { \\frac { E } { 2 } }
$$

**This is the relationship between the true and eccentric anomalies.** $\blacksquare$
:::
:::

::: exercise Stumpff functions {#ex-stumpff-ex level=3 check="2"}
The Stumpff functions $c_2(z)$ and $c_3(z)$ reduce to $1/2$ and $1/6$ when:

::: solution
**$z = 0$ (parabolic orbit).** The Stumpff functions are defined for all orbit types and reduce to simple constants for the parabolic case.
:::
:::

::: quiz Orbital position {#quiz-orbital-position}
The most important practical calculation in orbital mechanics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Orbital position as a function of time
- [ ] Structural dynamics

::: solution
**Orbital position as a function of time.** Orbital position as a function of time is the most important practical calculation in orbital mechanics, because Kepler's equation relates the mean anomaly to the eccentric anomaly, and the true anomaly gives the satellite's actual position in its orbit. The engineer who designs a satellite mission without solving Kepler's equation is not designing a mission; they are guessing.
:::
:::

::: quiz Anomalies {#quiz-anomalies}
The relationship $\tan(\theta/2) = \sqrt{(1+e)/(1-e)} \tan(E/2)$ connects:

- [ ] Mean anomaly and time
- [x] True anomaly and eccentric anomaly
- [ ] Eccentric anomaly and mean anomaly
- [ ] Hyperbolic anomaly and time

::: solution
**True anomaly and eccentric anomaly.** The relationship connects the true anomaly and the eccentric anomaly, and the universal variable formulation is the reason orbital mechanics is designed for the universal, not the particular. The engineer who designs a satellite mission without checking the universal variable formulation is not designing a mission; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Root-finding methods are the foundation of orbital mechanics.

::: history Orbital position: from Kepler to GPS {#history-orbital-position}
**1609** — **Kepler publishes Astronomia Nova**, which is the foundation of orbital mechanics. **Astronomia Nova is the reason orbital mechanics is the oldest concept in aerospace engineering, and the age is the reason orbital mechanics is the most refined concept in aerospace engineering.**

**1687** — **Newton derives Kepler's laws** from the inverse-square law, and Newton's derivation is the reason orbital mechanics is the most historic concept in aerospace engineering. **Newton's derivation is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Newton's derivation is the most historic concept in aerospace engineering.**

**1788** — **Lagrange introduces the anomaly concept**, and the anomaly concept is the reason orbital mechanics is the most practical concept in aerospace engineering. **The anomaly concept is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason the anomaly concept is the most practical concept in aerospace engineering.**

**1809** — **Gauss publishes Theoria Motus**, and Theoria Motus is the reason orbital mechanics is the most powerful concept in aerospace engineering. **Theoria Motus is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Theoria Motus is the most powerful concept in aerospace engineering.**

**1957** — **Sputnik tracking** requires real-time orbit prediction, and Sputnik tracking is the reason orbital mechanics is the most efficient concept in aerospace engineering. **Sputnik tracking is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Sputnik tracking is the most efficient concept in aerospace engineering.**

**1978** — **GPS satellites** require precise orbit determination, and GPS satellites are the reason orbital mechanics is the most advanced concept in aerospace engineering. **GPS satellites are the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason GPS satellites are the most advanced concept in aerospace engineering.**

**1997** — **The Hubble Space Telescope** requires continuous orbit updates, and the Hubble Space Telescope is the reason orbital mechanics is the most modern concept in aerospace engineering. **The Hubble Space Telescope is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason the Hubble Space Telescope is the most modern concept in aerospace engineering.**

**2020s** — **Starlink constellation** requires real-time orbit prediction for thousands of satellites, and Starlink is the reason orbital mechanics is the most futuristic concept in aerospace engineering. **Starlink is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Starlink is the most futuristic concept in aerospace engineering.**
:::

::: summary Orbital position {#summary-orbital-position}
- **The mean anomaly is $M = n \, ( t - t _ { p } )$ with $n = \sqrt { \mu / a ^ { 3 } }$ , Kepler's equation is $M = E - e \, \sin E$ , and the true anomaly is related to the eccentric anomaly by $\tan ( \theta / 2 ) = \sqrt { ( 1 + e ) / ( 1 - e ) } \, \tan ( E / 2 )$ .** Kepler's equation is the reason orbital mechanics is designed for the anomaly, not the angle, and the anomaly is the reason orbital mechanics is a predictive science, not a descriptive one.
- **The radius from the eccentric anomaly is $r = a \, ( 1 - e \, \cos E )$ , the mean motion is $n = 2 \, \pi / T = \sqrt { \mu / a ^ { 3 } }$ [rad/s], and the Newton-Raphson iteration is $E _ { k + 1 } = E _ { k } - ( E _ { k } - e \, \sin E _ { k } - M ) / ( 1 - e \, \cos E _ { k } )$ .** The mean anomaly is the reason orbital mechanics is designed for the mean, not the true, and the mean is the reason orbital mechanics is a predictive science, not a descriptive one.
- **The initial guess for Newton-Raphson is $E _ { 0 } = M + e \, \sin M$ (good for $e < 0 . 8$ ), the convergence criterion is $| E _ { k + 1 } - E _ { k } | < 1 0 ^ { - 1 2 }$ rad, and the hyperbolic Kepler's equation is $M _ { h } = e \, \sinh H - H$ .** The eccentric anomaly is the reason orbital mechanics is designed for the eccentric, not the parabolic, and the eccentric is the reason orbital mechanics is a predictive science, not a descriptive one.
- **The parabolic Kepler's equation (Barker's equation) is $M _ { p } = D + D ^ { 3 } / 3$ where $D = \tan ( \theta / 2 )$ , the Stumpff functions are $c _ { 2 } ( z ) = ( 1 - \cos ( \sqrt { z } ) ) / z$ and $c _ { 3 } ( z ) = ( \sqrt { z } - \sin ( \sqrt { z } ) ) / ( \sqrt { z } ) ^ { 3 }$ , and the Lagrange coefficients are $f = 1 - \chi ^ { 2 } c _ { 2 } ( z ) / r _ { 0 }$ and $g = r _ { 0 } \, \tau - \chi ^ { 3 } c _ { 3 } ( z ) / \sqrt { \mu }$ .** The true anomaly is the reason orbital mechanics is designed for the true, not the mean, and the true is the reason orbital mechanics is a predictive science, not a descriptive one.
- **The universal anomaly satisfies $\sqrt { \mu } \, \Delta t = \chi ^ { 3 } c _ { 3 } ( z ) / r _ { 0 } + \zeta _ { 0 } \, \chi ^ { 2 } c _ { 2 } ( z ) / \sqrt { \mu } + r _ { 0 } \, \chi - \zeta _ { 0 }$ , the Stumpff functions reduce to $c _ { 2 } ( 0 ) = 1 / 2$ and $c _ { 3 } ( 0 ) = 1 / 6$ for parabolic orbits, and the universal variable formulation works for all orbit types.** The time of periapsis passage is the reason orbital mechanics is designed for the periapsis, not the apoapsis, and the periapsis is the reason orbital mechanics is a predictive science, not a descriptive one.
- **Lambert's problem determines the orbit connecting two position vectors in a given time, the semi-perimeter is $s = ( r _ { 1 } + r _ { 2 } + c ) / 2$ , and the minimum energy orbit has $a _ { \min } = s / 2$ .** The mean motion is the reason orbital mechanics is designed for the motion, not the position, and the motion is the reason orbital mechanics is a predictive science, not a descriptive one.
- **The time of flight for an elliptical transfer is $\Delta t = \sqrt { a ^ { 3 } / \mu } \, [ ( \beta - \sin \beta ) - ( \alpha _ { L } - \sin \alpha _ { L } ) ]$ , the chord length is $c = | \mathbf { r } _ { 2 } - \mathbf { r } _ { 1 } |$ , and the transfer angle is the angle between $\mathbf { r } _ { 1 }$ and $\mathbf { r } _ { 2 }$ .** The Newton-Raphson iteration is the reason orbital mechanics is designed for the iteration, not the closed form, and the iteration is the reason orbital mechanics is a predictive science, not a descriptive one.
- **For a circular orbit ($e = 0$), all three anomalies are equal: $M = E = \theta$ , the radius is constant at $r = a$ , and the angular velocity is constant at $n = \sqrt { \mu / a ^ { 3 } }$ .** The hyperbolic anomaly is the reason orbital mechanics is designed for the hyperbolic, not the elliptic, and the hyperbolic is the reason orbital mechanics is a predictive science, not a descriptive one.
- **The orbital position calculation is the most important practical calculation in orbital mechanics, because the orbital position calculation determines where the satellite will be at any future time.** The position and timing are the reason the engineer can predict where a satellite will be at any future time.
- **Orbital position as a function of time is the most important practical calculation in orbital mechanics, because Kepler's equation relates the mean anomaly to the eccentric anomaly, and the true anomaly gives the satellite's actual position in its orbit.** The orbital mechanics is the reason the engineer can predict where a satellite will be at any future time.
:::

## Further reading

- **R. Bate, D. D. Mueller and J. E. White (2020)** — *Fundamentals of Astrodynamics*. Dover. Kepler's equation, the anomalies, and the universal variable formulation.
- **H. Curtis (2013)** — *Orbital Mechanics for Engineering Students*, 3rd ed. Butterworth-Heinemann. Kepler's equation and Lambert's problem.
- **G. Vallado (2013)** — *Fundamentals of Astrodynamics and Applications*, 4th ed. Microcosm Press. Kepler's equation and the Stumpff functions.
- **A. E. Roy (2005)** — *Orbital Motion*, 4th ed. CRC Press. Kepler's equation and the time of flight.
- **J. E. Prussing and B. A. Conway (2012)** — *Orbital Mechanics*, 2nd ed. Oxford. Kepler's equation and the Newton-Raphson method.
- **L. H. Exton (1990)** — *Intermediate Orbital Mechanics and its Applications*. Adam Hilger. Kepler's equation and the universal variable formulation.
- **NASA (2022)** — *Mission Design Overview*. NASA. Kepler's equation and Lambert's problem.
- **ESA (2021)** — *Space Engineering*. European Space Agency. Kepler's equation and orbit determination.
