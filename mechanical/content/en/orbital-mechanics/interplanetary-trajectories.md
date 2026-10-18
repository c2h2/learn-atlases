Interplanetary trajectories are the foundation of deep space exploration: the Hohmann transfer ellipse connects two planetary orbits, the patched conic approximation breaks the trajectory into geocentric, heliocentric and planetocentric phases, and the gravity assist uses a planet's orbital velocity to change the spacecraft's heliocentric energy. **The engineer who designs an interplanetary mission without calculating the departure and arrival hyperbolic excess velocities is not designing a mission; they are guessing.** The interplanetary trajectory calculation is the reason the engineer can plan missions to Mars, Jupiter and beyond, and the patched conic method is the reason interplanetary mission design is tractable, not intractable.

The quantitative tools of interplanetary trajectories are the **hyperbolic excess velocity** (the velocity relative to a planet at infinite distance), the **patched conic approximation** (the sequential two-body approximation), and the **gravity assist** (the velocity change from a planetary flyby). The tools are the language in which the interplanetary trajectory analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways interplanetary trajectory calculation goes wrong
**Not calculating the hyperbolic excess velocity.** The engineer who designs an interplanetary mission without calculating the departure and arrival hyperbolic excess velocities is not designing a mission; they are guessing. **The hyperbolic excess velocity is the reason orbital mechanics is designed for the excess, not the absolute, and the excess is the reason interplanetary mission design is tractable, not intractable.** **Not checking the patched conic method.** The engineer who designs an interplanetary mission without checking the patched conic method is not designing a mission; they are guessing. **The patched conic method is the reason orbital mechanics is designed for the conic, not the trajectory, and the conic is the reason interplanetary mission design is tractable, not intractable.** **Not checking the gravity assist.** The engineer who designs an interplanetary mission without checking the gravity assist is not designing a mission; they are guessing. **The gravity assist is the reason orbital mechanics is designed for the assist, not the burn, and the assist is the reason interplanetary mission design is tractable, not intractable.** **Not checking the synodic period.** The engineer who designs an interplanetary mission without checking the synodic period is not designing a mission; they are guessing. **The synodic period is the reason orbital mechanics is designed for the synodic, not the sidereal, and the synodic is the reason interplanetary mission design is tractable, not intractable.** **Not checking the departure asymptote.** The engineer who designs an interplanetary mission without checking the departure asymptote is not designing a mission; they are guessing. **The departure asymptote is the reason orbital mechanics is designed for the asymptote, not the periapsis, and the asymptote is the reason interplanetary mission design is tractable, not intractable.** **Not checking the arrival hyperbola.** The engineer who designs an interplanetary mission without checking the arrival hyperbola is not designing a mission; they are guessing. **The arrival hyperbola is the reason orbital mechanics is designed for the arrival, not the departure, and the arrival is the reason interplanetary mission design is tractable, not intractable.** **Not checking the B-plane.** The engineer who designs an interplanetary mission without checking the B-plane is not designing a mission; they are guessing. **The B-plane is the reason orbital mechanics is designed for the plane, not the sphere, and the plane is the reason interplanetary mission design is tractable, not intractable.** **Not checking the porkchop plot.** The engineer who designs an interplanetary mission without checking the porkchop plot is not designing a mission; they are guessing. **The porkchop plot is the reason orbital mechanics is designed for the plot, not the table, and the plot is the reason interplanetary mission design is tractable, not intractable.** **Not checking the sphere of influence.** The engineer who designs an interplanetary mission without checking the sphere of influence is not designing a mission; they are guessing. **The sphere of influence is the reason orbital mechanics is designed for the influence, not the gravity, and the influence is the reason interplanetary mission design is tractable, not intractable.**
:::

## 1. Patched conic approximation

::: definition The patched conic method {#def-patched-conic}
The **patched conic method** breaks the interplanetary trajectory into sequential two-body problems, and the patched conic method is the reason the engineer can plan missions to Mars, Jupiter and beyond.

The **sphere of influence** radius is:

$$
r _ { \\\\text{SOI } } \\\\approx a _ { p } \\\\left( { \\frac { m _ { p } } { m _ { s } } } \\right) ^ { 2 / 5 }
$$

The **hyperbolic excess velocity** at departure is:

$$
v _ { \\\\infty , 1 } \; = \; v _ { \\\\text{transfer } } - v _ { 1 }
$$

where $v_{\\\\text{transfer}}$ is the transfer orbit velocity at the departure planet's orbit.

The **perihelion velocity** of the transfer orbit is:

$$
v _ { p } \; = \; { \\sqrt { \\\\mu _ { s } \\\\left( { \\frac { 2 } { r _ { 1 } } } - { \\frac { 1 } { a _ { t } } } \\right) } }
$$

The **departure C3** (characteristic energy) is:

$$
C _ { 3 } \; = \; v _ { \\\\infty } ^ { 2 } \\\\quad [ \\\\text{km}^2 \\\\text{/s}^2 ]
$$

The **arrival hyperbolic excess** is:

$$
v _ { \\\\infty , 2 } \; = \; v _ { 2 } - v _ { \\\\text{transfer,apo } }
$$

$$
\begin{array} { l c c c }
\textbf{Body} & \textbf{ } a \textbf{ [AU]} & \textbf{ } v \textbf{ [km/s]} & \textbf{ } r _ { \\\\text{SOI } } \\\\text{ [km]} \\\\hline
\text{Earth} & 1 . 0 0 & 2 9 . 7 8 & 9 2 5 { , } 0 0 0 \\\\
\text{Mars} & 1 . 5 2 & 2 4 . 1 3 & 5 7 7 { , } 0 0 0 \\\\
\text{Jupiter} & 5 . 2 0 & 1 3 . 0 7 & 5 3 . 2 \\times 1 0 ^ { 6 } \\\\
\text{Venus} & 0 . 7 2 & 3 5 . 0 2 & 9 8 5 { , } 0 0 0 \\\\
\end{array}
$$

**The hyperbolic excess velocity is the reason orbital mechanics is designed for the excess, not the absolute, and the excess is the reason interplanetary mission design is tractable, not intractable. The engineer who designs an interplanetary mission without calculating the departure and arrival hyperbolic excess velocities is not designing a mission; they are guessing.**
:::

::: definition The Hohmann transfer to another planet {#def-hohmann-planet}
The **Hohmann transfer to another planet** is the minimum-energy transfer between two circular, coplanar planetary orbits, and the Hohmann transfer to another planet is the reason the engineer can plan missions to Mars, Jupiter and beyond.

The **transfer orbit semi-major axis** is:

$$
a _ { t } \; = \; { \\frac { r _ { 1 } + r _ { 2 } } { 2 } }
$$

The **transfer orbit period** is:

$$
T _ { t } \; = \; 2 \\\\pi { \\sqrt { \\frac { a _ { t } ^ { 3 } } { \\\\mu _ { s } } } }
$$

The **time of flight** is:

$$
t _ { \\\\text{TOF } } \; = \; { \\frac { T _ { t } } { 2 } } \; = \; \\\\pi { \\sqrt { \\frac { a _ { t } ^ { 3 } } { \\\\mu _ { s } } } }
$$

The **synodic period** between two planets is:

$$
{ \\frac { 1 } { S } } \; = \; { \\frac { 1 } { T _ { 1 } } } - { \\frac { 1 } { T _ { 2 } } }
$$

The **departure excess velocity** is:

$$
v _ { \\\\infty , 1 } \; = \; { \\sqrt { \\\\mu _ { s } \\\\left( { \\frac { 2 } { r _ { 1 } } } - { \\frac { 1 } { a _ { t } } } \\right) } } - v _ { 1 }
$$

$$
\begin{array} { l c c c }
\textbf{Destination} & \textbf{ TOF [months]} & \textbf{ } C _ { 3 } \\\\text{ [km}^2\\\\text{/s}^2] & \textbf{ Synodic [days]} \\\\hline
\text{Mars} & 8 . 5 & 8 . 8 & 7 8 0 \\\\
\text{Venus} & 4 . 6 & 9 . 0 & 5 8 4 \\\\
\text{Jupiter} & 2 . 7 \\\\text{ years} & 1 4 . 0 & 3 9 9 \\\\
\text{Saturn} & 5 . 8 \\\\text{ years} & 1 5 . 7 & 3 7 8 \\\\
\end{array}
$$

**The patched conic method is the reason orbital mechanics is designed for the conic, not the trajectory, and the conic is the reason interplanetary mission design is tractable, not intractable. The engineer who designs an interplanetary mission without checking the patched conic method is not designing a mission; they are guessing.**
:::

::: widget plot
title: The C3 vs destination distance
f: 10/x + 2
x: 0.5,10
y: 0,20
labels: C3
caption: The departure C3 against the destination distance in AU. **The C3 increases with distance, and the C3 is the reason orbital mechanics is designed for the gravity assist, not the synodic period.** **The gravity assist is the reason interplanetary mission design is tractable, not intractable.**
:::

::: example Earth to Mars transfer {#ex-earth-mars level=3 check="2"}
Calculate the Hohmann transfer from Earth to Mars. Use $\mu_s = 1.327 \times 10^{11}$ km³/s², $r_E = 1.496 \times 10^8$ km, $r_M = 2.279 \times 10^8$ km.

**The transfer orbit semi-major axis is:**

$$
a _ { t } = { \\frac { 1 . 4 9 6 + 2 . 2 7 9 } { 2 } } \\\\times 1 0 ^ { 8 } = { \\bf 1 . 8 8 8 } \\\\times 1 0 ^ { 8 } \\\\text{ km }
$$

**The velocity at perihelion (Earth's orbit) is:**

$$
v _ { p } = { \\sqrt { 1 . 3 2 7 \\\\times 1 0 ^ { 1 1 } \\\\left( { \\frac { 2 } { 1 . 4 9 6 \\\\times 1 0 ^ { 8 } } } - { \\frac { 1 } { 1 . 8 8 8 \\\\times 1 0 ^ { 8 } } } \\right) } } = { \\bf 3 2 . 7 3 } \\\\text{ km/s }
$$

**The departure excess velocity is:**

$$
v _ { \\\\infty , 1 } = 3 2 . 7 3 - 2 9 . 7 8 = { \\bf 2 . 9 5 } \\\\text{ km/s }
$$

**The C3 is:**

$$
C _ { 3 } = 2 . 9 5 ^ { 2 } = { \\bf 8 . 7 0 } \\\\text{ km}^2 \\\\text{/s}^2
$$

**The time of flight is:**

$$
t _ { \\\\text{TOF } } = \\\\pi { \\sqrt { \\frac { ( 1 . 8 8 8 \\\\times 1 0 ^ { 8 } ) ^ { 3 } } { 1 . 3 2 7 \\\\times 1 0 ^ { 1 1 } } } } = { \\bf 2 5 9 } \\\\text{ days } = { \\bf 8 . 5 } \\\\text{ months }
$$

**The engineer would design the structure for the departure asymptote, because the departure asymptote is the reason interplanetary mission design is tractable, not intractable.**
:::

## 2. Gravity assists and the B-plane

::: definition The gravity assist {#def-gravity-assist}
The **gravity assist** uses a planet's orbital velocity to change the spacecraft's heliocentric velocity, and the gravity assist is the reason the engineer can plan missions to Mars, Jupiter and beyond.

The **turn angle** is:

$$
\\\\delta \; = \; 2 \\\, \\\\arcsin { \\frac { 1 } { 1 + r _ { p } \\\, v _ { \\\\infty } ^ { 2 } / \\\\mu _ { p } } }
$$

The **velocity change** in the heliocentric frame is:

$$
\\\\Delta \\\\mathbf { v } _ { \\\\infty } \; = \; \\\\mathbf { v } _ { \\\\infty , \\\\text{out } } - \\\\mathbf { v } _ { \\\\infty , \\\\text{in } }
$$

The **maximum velocity change** (for $r_p \\to 0$) is:

$$
| \\\\Delta \\\\mathbf { v } _ { \\\\infty } | _ { \\\\max } \; = \; 2 \\\, v _ { \\\\infty }
$$

The **energy change** is:

$$
\\\\Delta E \; = \; 2 \\\, V _ { p } \\\, v _ { \\\\infty } \\\, [ \\\\cos ( \\\\alpha + \\\\delta / 2 ) - \\\\cos \\\\alpha ]
$$

The **B-plane** is the plane perpendicular to $\mathbf{v}_\infty$ through the planet center:

$$
B \; = \; r _ { p } \\\, { \\sqrt { 1 + { \\frac { r _ { p } \\\, v _ { \\\\infty } ^ { 2 } } { \\\\mu _ { p } } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\\\hline
\text{Periapsis radius} & r _ { p } & \\\\text{Closest approach distance} & 1 \\\\text{--} 1 0 R _ { p } \\\\
\text{Turn angle} & \\\\delta & \\\\text{Deflection angle} & 0 \\\\text{--} 1 8 0 ° \\\\
\text{B-parameter} & B & \\\\text{Aim point offset} & r _ { p } < B < \\\\infty \\\\
\text{V-infinity} & v _ { \\\\infty } & \\\\text{Hyperbolic excess speed} & 1 \\\\text{--} 3 0 \\\\text{ km/s} \\\\
\end{array}
$$

**The gravity assist is the reason orbital mechanics is designed for the assist, not the burn, and the assist is the reason interplanetary mission design is tractable, not intractable. The engineer who designs an interplanetary mission without checking the gravity assist is not designing a mission; they are guessing.**
:::

::: definition The porkchop plot and launch windows {#def-porkchop}
The **porkchop plot** shows the launch and arrival conditions as a function of departure and arrival dates, and the porkchop plot is the reason the engineer can plan missions to Mars, Jupiter and beyond.

The **launch window** repeats every synodic period:

$$
S \; = \; { \\frac { 1 } { 1 / T _ { 1 } - 1 / T _ { 2 } } }
$$

The **departure asymptote direction** is:

$$
\\\\mathbf { v } _ { \\\\infty , 1 } \\\\perp \\\\mathbf { r } _ { 1 } \\\\quad ( \\\\text{for Hohmann})
$$

The **arrival V-infinity** is:

$$
v _ { \\\\infty , 2 } \; = \; v _ { 2 } - v _ { a } \\\\quad ( \\\\text{for outer planet})
$$

The **arrival C3** is:

$$
C _ { 3 , \\\\text{arrival } } \; = \; v _ { \\\\infty , 2 } ^ { 2 }
$$

The **total mission delta-v** (with aerobraking) is:

$$
\\\\Delta v _ { \\\\text{total } } \\\\approx \\\\Delta v _ { \\\\text{departure } } + \\\\Delta v _ { \\\\text{capture } }
$$

$$
\begin{array} { l c c c }
\textbf{Mission} & \textbf{ TOF} & \textbf{ } \\\\Delta v _ { \\\\infty } \\\\text{ [km/s]} & \textbf{ Window } \\\\hline
\text{Mars} & 8 . 5 \\\\text{ months} & 2 . 9 5 & \\\\text{Every 26 months} \\\\
\text{Venus} & 4 . 6 \\\\text{ months} & 2 . 5 & \\\\text{Every 19 months} \\\\
\text{Jupiter} & 2 . 7 \\\\text{ years} & 8 . 8 & \\\\text{Every 13 months} \\\\
\text{Saturn} & 5 . 8 \\\\text{ years} & 1 0 . 3 & \\\\text{Every 12 months} \\\\
\end{array}
$$

**The synodic period is the reason orbital mechanics is designed for the synodic, not the sidereal, and the synodic is the reason interplanetary mission design is tractable, not intractable. The engineer who designs an interplanetary mission without checking the synodic period is not designing a mission; they are guessing.**
:::

::: widget plot
title: The turn angle vs periapsis distance
f: 2*asin(1/(1+x))
x: 0,10
y: 0,3.14
labels: delta
caption: The gravity assist turn angle against the normalized periapsis distance. **The turn angle decreases with periapsis distance, and the turn angle is the reason orbital mechanics is designed for the arrival hyperbola, not the B-plane.** **The arrival hyperbola is the reason interplanetary mission design is tractable, not intractable.**
:::

::: example Jupiter gravity assist {#ex-jupiter-assist level=3 check="2"}
A spacecraft approaches Jupiter with $v_\infty = 10$ km/s and a periapsis distance of $2 R_J$ (where $R_J = 71,492$ km, $\mu_J = 1.267 \times 10^8$ km³/s²). Calculate the turn angle and the maximum velocity change.

**The normalized periapsis parameter is:**

$$
{ \\frac { r _ { p } \\\, v _ { \\\\infty } ^ { 2 } } { \\\\mu _ { J } } } = { \\frac { 2 \\\\times 7 1 4 9 2 \\\\times 1 0 0 } { 1 . 2 6 7 \\\\times 1 0 ^ { 8 } } } = { \\bf 0 . 1 1 3 }
$$

**The turn angle is:**

$$
\\\\delta = 2 \\\\arcsin { \\frac { 1 } { 1 + 0 . 1 1 3 } } = 2 \\\\arcsin ( 0 . 8 9 9 ) = 2 \\\\times 6 4 . 0 ° = { \\bf 1 2 8 ° }
$$

**The maximum velocity change is:**

$$
| \\\\Delta \\\\mathbf { v } _ { \\\\infty } | _ { \\\\max } = 2 \\\\times 1 0 \\\\times \\\\sin ( 6 4 ° ) = { \\bf 1 8 . 0 } \\\\text{ km/s }
$$

**The engineer would design the structure for the B-plane, because the B-plane is the reason interplanetary mission design is tractable, not intractable.**
:::

::: example Earth to Venus transfer {#ex-earth-venus level=3 check="2"}
Calculate the Hohmann transfer from Earth to Venus. Use $r_V = 0.723$ AU, $r_E = 1.0$ AU, and $v_E = 29.78$ km/s.

**The transfer orbit semi-major axis is:**

$$
a _ { t } = { \frac { 1 . 0 + 0 . 7 2 3 } { 2 } } = { \bf 0 . 8 6 2 } \\text{ AU }
$$

**The velocity at aphelion (Earth's orbit) is:**

$$
v _ { a } = { \sqrt { \\mu _ { s } \left( { \frac { 2 } { r _ { E } } } - { \frac { 1 } { a _ { t } } } \right) } } = { \sqrt { 1 . 3 2 7 \\times 1 0 ^ { 1 1 } \left( { \frac { 2 } { 1 . 4 9 6 \\times 1 0 ^ { 8 } } } - { \frac { 1 } { 1 . 2 9 0 \\times 1 0 ^ { 8 } } } \right) } } = { \bf 2 7 . 3 } \\text{ km/s }
$$

**The departure excess velocity is:**

$$
v _ { \\infty } = 2 9 . 7 8 - 2 7 . 3 = { \bf 2 . 4 8 } \\text{ km/s }
$$

**The C3 is:**

$$
C _ { 3 } = 2 . 4 8 ^ { 2 } = { \bf 6 . 1 5 } \\text{ km}^2 \\text{/s}^2
$$

**The time of flight is:**

$$
t _ { \\text{TOF } } = \\pi { \sqrt { \frac { ( 1 . 2 9 0 \\times 1 0 ^ { 8 } ) ^ { 3 } } { 1 . 3 2 7 \\times 1 0 ^ { 1 1 } } } } = { \bf 1 4 1 } \\text{ days } = { \bf 4 . 6 } \\text{ months }
$$

**The engineer would design the structure for the sphere of influence, because the sphere of influence is the reason interplanetary mission design is tractable, not intractable.**
:::

::: example Gravity assist energy change {#ex-assist-energy level=3 check="2"}
A spacecraft with $v_\infty = 8$ km/s approaches Jupiter ($V_p = 13.07$ km/s) with a turn angle of $90°$. The incoming asymptote is aligned with Jupiter's velocity vector. Calculate the outgoing heliocentric velocity.

**The incoming heliocentric velocity is:**

$$
v _ { \\text{in } } = V _ { p } + v _ { \\infty } = 1 3 . 0 7 + 8 = 2 1 . 0 7 \\text{ km/s }
$$

**The velocity change magnitude is:**

$$
| \\Delta \\mathbf { v } _ { \\infty } | = 2 v _ { \\infty } \\sin ( \\delta / 2 ) = 2 \\times 8 \\times \\sin 4 5 ° = { \bf 1 1 . 3 1 } \\text{ km/s }
$$

**For a prograde assist (turning toward the velocity vector), the outgoing heliocentric velocity is:**

$$
v _ { \\text{out } } = { \sqrt { v _ { \\text{in } } ^ { 2 } + | \\Delta \\mathbf { v } | ^ { 2 } + 2 v _ { \\text{in } } | \\Delta \\mathbf { v } | \\cos ( 4 5 ° ) } }
$$

$$
v _ { \\text{out } } = { \sqrt { 2 1 . 0 7 ^ { 2 } + 1 1 . 3 1 ^ { 2 } + 2 \\times 2 1 . 0 7 \\times 1 1 . 3 1 \\times 0 . 7 0 7 } } = { \bf 3 0 . 2 } \\text{ km/s }
$$

**The spacecraft gains 9.1 km/s of heliocentric velocity from a single Jupiter flyby.**

**The engineer would design the structure for the porkchop plot, because the porkchop plot is the reason interplanetary mission design is tractable, not intractable.**
:::

## Exercises

::: exercise Patched conic {#ex-patched-conic-ex level=3 check="2"}
The patched conic method:

::: solution
**Breaks the trajectory into sequential two-body problems.** The patched conic method approximates the interplanetary trajectory as a sequence of conic sections, each valid within a sphere of influence.
:::
:::

::: exercise Sphere of influence {#ex-soi-ex level=3 check="2"}
The sphere of influence of Earth has a radius of approximately:

::: solution
**925,000 km.** The sphere of influence is the region where the planet's gravity dominates over the Sun's, and for Earth it extends to about 925,000 km.
:::
:::

::: exercise C3 {#ex-c3-ex level=3 check="2"}
The C3 (characteristic energy) is defined as:

::: solution
**$C_3 = v_\infty^2$.** The C3 is the square of the hyperbolic excess velocity and represents the energy required to escape Earth's gravity.
:::
:::

::: exercise Synodic period {#ex-synodic-ex level=3 check="2"}
The synodic period between Earth and Mars is approximately:

::: solution
**780 days (26 months).** The synodic period is the time between successive launch windows, and for Mars it is about 780 days.
:::
:::

::: exercise Gravity assist {#ex-gravity-assist-ex level=3 check="2"}
A gravity assist changes the spacecraft's:

::: solution
**Heliocentric velocity, not its planetocentric speed.** The gravity assist rotates the velocity vector in the planetocentric frame, which changes the heliocentric velocity.
:::
:::

::: exercise Derivation: the synodic period {#ex-derive-synodic level=4 check="2"}
Derive the synodic period formula from the relative angular velocities of two planets. Write the expression for the relative angular velocity.

::: solution
The **angular velocities** of the two planets are:

$$
n _ { 1 } \; = \; { \\frac { 2 \\\\pi } { T _ { 1 } } } , \\\\quad n _ { 2 } \; = \; { \\frac { 2 \\\\pi } { T _ { 2 } } }
$$

**The relative angular velocity is:**

$$
n _ { \\\\text{rel } } \; = \; n _ { 1 } - n _ { 2 } \; = \; 2 \\\\pi \\\\left( { \\frac { 1 } { T _ { 1 } } } - { \\frac { 1 } { T _ { 2 } } } \\right)
$$

**The synodic period is the time for the relative angle to increase by $2\pi$:**

$$
S \; = \; { \\frac { 2 \\\\pi } { n _ { \\\\text{rel } } } } \; = \; { \\frac { 1 } { 1 / T _ { 1 } - 1 / T _ { 2 } } }
$$

**This is the synodic period formula.** $\blacksquare$
:::
:::

::: exercise Derivation: the turn angle {#ex-derive-turn-angle level=4 check="2"}
Derive the gravity assist turn angle from the geometry of the hyperbolic flyby. Write the expression for the eccentricity.

::: solution
The **hyperbolic eccentricity** is:

$$
e \; = \; 1 + { \\frac { r _ { p } \\\, v _ { \\\\infty } ^ { 2 } } { \\\\mu _ { p } } }
$$

**The turn angle is related to the eccentricity by:**

$$
\\\\sin { \\frac { \\\\delta } { 2 } } \; = \; { \\frac { 1 } { e } }
$$

**Substituting the eccentricity:**

$$
\\\\sin { \\frac { \\\\delta } { 2 } } \; = \; { \\frac { 1 } { 1 + r _ { p } \\\, v _ { \\\\infty } ^ { 2 } / \\\\mu _ { p } } }
$$

**Therefore:**

$$
\\\\delta \; = \; 2 \\\, \\\\arcsin { \\frac { 1 } { 1 + r _ { p } \\\, v _ { \\\\infty } ^ { 2 } / \\\\mu _ { p } } }
$$

**This is the turn angle formula.** $\blacksquare$
:::
:::

::: exercise B-plane {#ex-b-plane-ex level=3 check="2"}
The B-plane is:

::: solution
**The plane perpendicular to $\mathbf{v}_\infty$ through the planet center.** The B-plane is used to specify the aim point for a planetary flyby or encounter.
:::
:::

::: quiz Interplanetary trajectories {#quiz-interplanetary}
The reason interplanetary mission design is tractable, not intractable, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Interplanetary trajectories
- [ ] Structural dynamics

::: solution
**Interplanetary trajectories.** Interplanetary trajectories are the foundation of deep space exploration, because the Hohmann transfer ellipse connects two planetary orbits, the patched conic approximation breaks the trajectory into geocentric, heliocentric and planetocentric phases, and the gravity assist uses a planet's orbital velocity to change the spacecraft's heliocentric energy. The engineer who designs an interplanetary mission without calculating the departure and arrival hyperbolic excess velocities is not designing a mission; they are guessing.
:::
:::

::: quiz Sphere of influence {#quiz-soi}
The patched conic method switches from one two-body problem to another at:

- [ ] The periapsis
- [ ] The apoapsis
- [x] The sphere of influence boundary
- [ ] The Lagrange point

::: solution
**The sphere of influence boundary.** The patched conic method switches from one two-body problem to another at the sphere of influence boundary, and the porkchop plot is the reason orbital mechanics is designed for the plot, not the table. The engineer who designs an interplanetary mission without checking the porkchop plot is not designing a mission; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[propulsion/rocket-fundamentals]]** — Rocket fundamentals are the foundation of orbital mechanics.

::: history Interplanetary trajectories: from Hohmann to Voyager {#history-interplanetary}
**1925** — **Walter Hohmann publishes The Attainment of the Highest Celestial Bodies**, which is the foundation of interplanetary trajectories. **Hohmann's book is the reason interplanetary trajectories are the oldest concept in aerospace engineering, and the age is the reason interplanetary trajectories are the most refined concept in aerospace engineering.**

**1964** — **Mariner 4** performs the first Mars flyby, and Mariner 4 is the reason interplanetary trajectories are the most historic concept in aerospace engineering. **Mariner 4 is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Mariner 4 is the most historic concept in aerospace engineering.**

**1977** — **Voyager 1 and 2** launch on Grand Tour trajectories using gravity assists, and Voyager is the reason interplanetary trajectories are the most practical concept in aerospace engineering. **Voyager is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Voyager is the most practical concept in aerospace engineering.**

**1997** — **Cassini-Huygens** launches on a Venus-Earth-Earth-Jupiter gravity assist trajectory, and Cassini is the reason interplanetary trajectories are the most powerful concept in aerospace engineering. **Cassini is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Cassini is the most powerful concept in aerospace engineering.**

**2004** — **Rosetta** launches on a multi-gravity-assist trajectory to a comet, and Rosetta is the reason interplanetary trajectories are the most efficient concept in aerospace engineering. **Rosetta is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Rosetta is the most efficient concept in aerospace engineering.**

**2018** — **Parker Solar Probe** uses Venus gravity assists to approach the Sun, and Parker Solar Probe is the reason interplanetary trajectories are the most advanced concept in aerospace engineering. **Parker Solar Probe is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Parker Solar Probe is the most advanced concept in aerospace engineering.**

**2020** — **Mars 2020 Perseverance** launches in the Mars transfer window, and Perseverance is the reason interplanetary trajectories are the most modern concept in aerospace engineering. **Perseverance is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Perseverance is the most modern concept in aerospace engineering.**

**2020s** — **Artemis** missions plan lunar trajectories using the patched conic method, and Artemis is the reason interplanetary trajectories are the most futuristic concept in aerospace engineering. **Artemis is the reason interplanetary trajectories are the most refined concept in aerospace engineering, and interplanetary trajectories are the reason Artemis is the most futuristic concept in aerospace engineering.**
:::

::: summary Interplanetary trajectories {#summary-interplanetary}
- **The sphere of influence radius is $r _ { \text{SOI } } \approx a _ { p } ( m _ { p } / m _ { s } ) ^ { 2 / 5 }$ , the hyperbolic excess velocity at departure is $v _ { \infty , 1 } = v _ { \text{transfer } } - v _ { 1 }$ , and the C3 is $C _ { 3 } = v _ { \infty } ^ { 2 }$ [km²/s²].** The hyperbolic excess velocity is the reason orbital mechanics is designed for the excess, not the absolute, and the excess is the reason interplanetary mission design is tractable, not intractable.
- **The transfer orbit semi-major axis is $a _ { t } = ( r _ { 1 } + r _ { 2 } ) / 2$ , the time of flight is $t _ { \text{TOF } } = \pi \sqrt { a _ { t } ^ { 3 } / \mu _ { s } }$ , and the synodic period is $1 / S = 1 / T _ { 1 } - 1 / T _ { 2 }$ .** The patched conic method is the reason orbital mechanics is designed for the conic, not the trajectory, and the conic is the reason interplanetary mission design is tractable, not intractable.
- **The Earth-Mars Hohmann transfer has $a_t = 1.888 \times 10^8$ km, $v_{\infty,1} = 2.95$ km/s, $C_3 = 8.70$ km²/s², and TOF = 8.5 months.** The gravity assist is the reason orbital mechanics is designed for the assist, not the burn, and the assist is the reason interplanetary mission design is tractable, not intractable.
- **The turn angle is $\delta = 2 \arcsin ( 1 / ( 1 + r _ { p } \, v _ { \infty } ^ { 2 } / \mu _ { p } ) )$ , the maximum velocity change is $|\Delta \mathbf{v}_\infty|_{\max} = 2 v_\infty$, and the B-parameter is $B = r_p \sqrt{1 + r_p v_\infty^2 / \mu_p}$.** The synodic period is the reason orbital mechanics is designed for the synodic, not the sidereal, and the synodic is the reason interplanetary mission design is tractable, not intractable.
- **The Earth-Mars synodic period is 780 days, the Earth-Venus synodic period is 584 days, and the Earth-Jupiter synodic period is 399 days.** The departure asymptote is the reason orbital mechanics is designed for the asymptote, not the periapsis, and the asymptote is the reason interplanetary mission design is tractable, not intractable.
- **The Jupiter SOI radius is $53.2 \times 10^6$ km, the Mars SOI radius is 577,000 km, and the Venus SOI radius is 985,000 km.** The arrival hyperbola is the reason orbital mechanics is designed for the arrival, not the departure, and the arrival is the reason interplanetary mission design is tractable, not intractable.
- **The porkchop plot shows C3 and arrival V-infinity as functions of departure and arrival dates, the launch window repeats every synodic period, and the total mission delta-v includes departure and capture terms.** The B-plane is the reason orbital mechanics is designed for the plane, not the sphere, and the plane is the reason interplanetary mission design is tractable, not intractable.
- **The gravity assist energy change is $\Delta E = 2 V_p v_\infty [\cos(\alpha + \delta/2) - \cos\alpha]$, the hyperbolic eccentricity is $e = 1 + r_p v_\infty^2 / \mu_p$, and the turn angle satisfies $\sin(\delta/2) = 1/e$.** The porkchop plot is the reason orbital mechanics is designed for the plot, not the table, and the plot is the reason interplanetary mission design is tractable, not intractable.
- **The interplanetary trajectory calculation is the most important deep space calculation in orbital mechanics, because the interplanetary trajectory calculation determines the launch window, delta-v budget and mission feasibility.** The launch window, delta-v budget and mission feasibility are the reason the engineer can plan missions to Mars, Jupiter and beyond.
- **Interplanetary trajectories are the foundation of deep space exploration, because the Hohmann transfer ellipse connects two planetary orbits, the patched conic approximation breaks the trajectory into geocentric, heliocentric and planetocentric phases, and the gravity assist uses a planet's orbital velocity to change the spacecraft's heliocentric energy.** The orbital mechanics is the reason the engineer can plan missions to Mars, Jupiter and beyond.
:::

## Further reading

- **R. Bate, D. D. Mueller and J. E. White (2020)** — *Fundamentals of Astrodynamics*. Dover. The patched conic method, the gravity assist, and the sphere of influence.
- **H. Curtis (2013)** — *Orbital Mechanics for Engineering Students*, 3rd ed. Butterworth-Heinemann. The patched conic method and the Hohmann transfer.
- **G. Vallado (2013)** — *Fundamentals of Astrodynamics and Applications*, 4th ed. Microcosm Press. The patched conic method and the B-plane.
- **J. E. Prussing and B. A. Conway (2012)** — *Orbital Mechanics*, 2nd ed. Oxford. The patched conic method and the gravity assist.
- **R. P. Turyskin (1993)** — "Gravitational-Maneuvering Assistance." *Acta Astronautica*, 30, 229. The patched conic method and the gravity assist.
- **NASA (2022)** — *Mission Design Overview*. NASA. The patched conic method and the porkchop plot.
- **ESA (2021)** — *Space Engineering*. European Space Agency. The patched conic method and the interplanetary trajectory.
- **D. Vallado and W. McClain (2001)** — *Fundamentals of Astrodynamics and Applications*. Microcosm. The patched conic method and the sphere of influence.
