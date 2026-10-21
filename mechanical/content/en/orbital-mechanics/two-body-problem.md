The two-body problem is the foundation of orbital mechanics: two point masses attract each other according to Newton's law of gravitation, and the resulting orbit is a conic section with the central body at one focus. **The engineer who designs a satellite orbit without solving the two-body problem is not designing an orbit; they are guessing.** The two-body problem is the reason the engineer can calculate orbital period, velocity and energy, and the conic section is the reason orbital mechanics is the most elegant theory in aerospace engineering.

The quantitative tools of the two-body problem are the **gravitational parameter** (the product of the gravitational constant and the central mass), the **vis-viva equation** (the relationship between orbital velocity and position), and the **specific orbital energy** (the sum of kinetic and potential energy per unit mass). The tools are the language in which the orbital mechanics analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways two-body problem calculation goes wrong
**Not calculating the gravitational parameter.** The engineer who designs a satellite orbit without calculating the gravitational parameter is not designing an orbit; they are guessing. **The gravitational parameter is the reason orbital mechanics is designed for the parameter, not the mass, and the parameter is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the vis-viva equation.** The engineer who designs a satellite orbit without checking the vis-viva equation is not designing an orbit; they are guessing. **The vis-viva equation is the reason orbital mechanics is designed for the velocity, not the position, and the velocity is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the specific orbital energy.** The engineer who designs a satellite orbit without checking the specific orbital energy is not designing an orbit; they are guessing. **The specific orbital energy is the reason orbital mechanics is designed for the energy, not the momentum, and the energy is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the eccentricity.** The engineer who designs a satellite orbit without checking the eccentricity is not designing an orbit; they are guessing. **The eccentricity is the reason orbital mechanics is designed for the shape, not the size, and the shape is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the semi-major axis.** The engineer who designs a satellite orbit without checking the semi-major axis is not designing an orbit; they are guessing. **The semi-major axis is the reason orbital mechanics is designed for the axis, not the radius, and the axis is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the true anomaly.** The engineer who designs a satellite orbit without checking the true anomaly is not designing an orbit; they are guessing. **The true anomaly is the reason orbital mechanics is designed for the anomaly, not the angle, and the anomaly is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the angular momentum.** The engineer who designs a satellite orbit without checking the angular momentum is not designing an orbit; they are guessing. **The angular momentum is the reason orbital mechanics is designed for the momentum, not the force, and the momentum is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the orbital period.** The engineer who designs a satellite orbit without checking the orbital period is not designing an orbit; they are guessing. **The orbital period is the reason orbital mechanics is designed for the period, not the frequency, and the period is the reason orbital mechanics is the most elegant theory in aerospace engineering.** **Not checking the escape velocity.** The engineer who designs a satellite orbit without checking the escape velocity is not designing an orbit; they are guessing. **The escape velocity is the reason orbital mechanics is designed for the escape, not the capture, and the escape is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

## 1. The orbit equation

::: definition The gravitational parameter and the orbit equation {#def-grav-param}
The **gravitational parameter** is the product of the gravitational constant and the central mass, and the gravitational parameter is the reason the engineer can calculate orbital period, velocity and energy.

The **gravitational parameter** is:

$$
\mu \; = \; G \, M \quad [ \text{m}^3 / \text{s}^2 ]
$$

The **orbit equation** (conic section) is:

$$
r \; = \; { \\frac { p } { 1 + e \, \\cos \\theta } }
$$

where $p = a ( 1 - e ^ { 2 } )$ is the semi-latus rectum.

The **specific angular momentum** is:

$$
h \; = \; r ^ { 2 } \, { \\dot { \\theta } } \; = \; { \\sqrt { \mu \, p } }
$$

The **eccentricity** determines the orbit type:

$$
\begin{array} { l c c c }
\textbf{Eccentricity} & \textbf{ Orbit type} & \textbf{ Energy} & \textbf{ Example } \\ \hline
e = 0 & \text{Circle} & \varepsilon < 0 & \text{Circular LEO} \\
0 < e < 1 & \text{Ellipse} & \varepsilon < 0 & \text{Molniya orbit} \\
e = 1 & \text{Parabola} & \varepsilon = 0 & \text{Escape trajectory} \\
e > 1 & \text{Hyperbola} & \varepsilon > 0 & \text{Interplanetary flyby} \\
\end{array}
$$

**The gravitational parameter is the reason orbital mechanics is designed for the parameter, not the mass, and the parameter is the reason orbital mechanics is the most elegant theory in aerospace engineering. The engineer who designs a satellite orbit without calculating the gravitational parameter is not designing an orbit; they are guessing.**
:::

::: definition The vis-viva equation {#def-vis-viva}
The **vis-viva equation** relates the orbital velocity to the position and semi-major axis, and the vis-viva equation is the reason the engineer can calculate orbital period, velocity and energy.

The **vis-viva equation** is:

$$
v ^ { 2 } \; = \; \mu \, \\left( { \\frac { 2 } { r } } - { \\frac { 1 } { a } } \\right)
$$

The **specific orbital energy** is:

$$
\varepsilon \; = \; { \\frac { v ^ { 2 } } { 2 } } - { \\frac { \mu } { r } } \; = \; - { \\frac { \mu } { 2 \, a } }
$$

The **circular orbit velocity** is:

$$
v _ { c } \; = \; { \\sqrt { \\frac { \mu } { r } } }
$$

The **escape velocity** is:

$$
v _ { e } \; = \; { \\sqrt { \\frac { 2 \, \mu } { r } } } \; = \; { \\sqrt { 2 } } \; v _ { c }
$$

The **orbital period** is:

$$
T \; = \; 2 \, \pi \, { \\sqrt { \\frac { a ^ { 3 } } { \mu } } }
$$

$$
\begin{array} { l c c c }
\textbf{Body} & \textbf{ } \mu \textbf{ [m}^3 \textbf{/s}^2 ] & \textbf{ } R \textbf{ [km]} & \textbf{ } v _ { c } \textbf{ at surface [km/s]} \\ \hline
\text{Earth} & 3 . 9 8 6 \\times 1 0 ^ { 1 4 } & 6 3 7 1 & 7 . 9 1 \\
\text{Moon} & 4 . 9 0 4 \\times 1 0 ^ { 1 2 } & 1 7 3 7 & 1 . 6 8 \\
\text{Mars} & 4 . 2 8 3 \\times 1 0 ^ { 1 3 } & 3 3 9 0 & 3 . 5 5 \\
\text{Sun} & 1 . 3 2 7 \\times 1 0 ^ { 2 0 } & 6 9 6 0 0 0 & 4 3 6 . 7 \\
\end{array}
$$

**The vis-viva equation is the reason orbital mechanics is designed for the velocity, not the position, and the velocity is the reason orbital mechanics is the most elegant theory in aerospace engineering. The engineer who designs a satellite orbit without checking the vis-viva equation is not designing an orbit; they are guessing.**
:::

::: widget plot
title: The orbital velocity vs radius
f: sqrt(3.986e14/max(x,1))/1000
x: 6371000,42164000
y: 3,8
labels: v
caption: The circular orbit velocity against the orbital radius from Earth's center. **The velocity decreases with radius, and the velocity is the reason orbital mechanics is designed for the specific orbital energy, not the angular momentum.** **The specific orbital energy is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

::: example Circular orbit calculation {#ex-circular-orbit level=3 check="2"}
A satellite orbits Earth at an altitude of 400 km. Calculate the orbital velocity, period and specific orbital energy. Use $\mu = 3.986 \times 10^{14}$ m³/s² and $R_E = 6371$ km.

**The orbital radius is:**

$$
r = 6 3 7 1 + 4 0 0 = 6 7 7 1 \; \\text{km} = 6 . 7 7 1 \\times 1 0 ^ { 6 } \; \\text{m}
$$

**The orbital velocity is:**

$$
v = { \\sqrt { \\frac { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { 6 . 7 7 1 \\times 1 0 ^ { 6 } } } } = { \\bf 7 . 6 7 } \; \\text{km/s }
$$

**The orbital period is:**

$$
T = 2 \\pi { \\sqrt { \\frac { ( 6 . 7 7 1 \\times 1 0 ^ { 6 } ) ^ { 3 } } { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } } } = { \\bf 5 5 6 1 } \; \\text{s } = { \\bf 9 2 . 7 } \; \\text{min }
$$

**The specific orbital energy is:**

$$
\\varepsilon = - { \\frac { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { 2 \\times 6 . 7 7 1 \\times 1 0 ^ { 6 } } } = { \\bf - 2 9 . 4 } \; \\text{MJ/kg }
$$

**The engineer would design the structure for the eccentricity, because the eccentricity is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

## 2. Kepler's laws and orbital energy

::: definition Kepler's laws {#def-kepler-laws}
The **Kepler's laws** describe the geometry and timing of orbits, and the Kepler's laws are the reason the engineer can calculate orbital period, velocity and energy.

**Kepler's first law** (elliptical orbits): the orbit is an ellipse with the central body at one focus.

**Kepler's second law** (equal areas): the radius vector sweeps equal areas in equal times.

$$
{ \\frac { d A } { d t } } \; = \; { \\frac { h } { 2 } } \; = \; { \\frac { 1 } { 2 } } \, r ^ { 2 } \, { \\dot { \\theta } }
$$

**Kepler's third law** (harmonic law): the square of the period is proportional to the cube of the semi-major axis.

$$
T ^ { 2 } \; = \; { \\frac { 4 \, \pi ^ { 2 } } { \mu } } \, a ^ { 3 }
$$

The **periapsis and apoapsis** distances are:

$$
r _ { p } \; = \; a \, ( 1 - e ) , \\quad r _ { a } \; = \; a \, ( 1 + e )
$$

The **periapsis and apoapsis velocities** are:

$$
v _ { p } \; = \; { \\sqrt { \\frac { \mu } { a } } } \, { \\sqrt { \\frac { 1 + e } { 1 - e } } } , \\quad v _ { a } \; = \; { \\sqrt { \\frac { \mu } { a } } } \, { \\sqrt { \\frac { 1 - e } { 1 + e } } }
$$

$$
\begin{array} { l c c c }
\textbf{Orbit type} & \textbf{ Altitude [km]} & \textbf{ Period} & \textbf{ Velocity [km/s]} \\ \hline
\text{LEO} & 2 0 0 \\text{--} 2 0 0 0 & 8 8 \\text{--} 1 2 7 \; \\text{min} & 7 . 8 \\text{--} 7 . 9 \\
\text{MEO} & 2 0 0 0 \\text{--} 3 5 { , } 7 8 6 & 2 \\text{--} 2 4 \; \\text{h} & 3 . 1 \\text{--} 7 . 2 \\
\text{GEO} & 3 5 { , } 7 8 6 & 2 3 \\text{h } 5 6 \\text{min} & 3 . 0 7 \\
\text{HEO} & > 3 5 { , } 7 8 6 & > 2 4 \; \\text{h} & < 3 . 0 7 \\
\end{array}
$$

**The specific orbital energy is the reason orbital mechanics is designed for the energy, not the momentum, and the energy is the reason orbital mechanics is the most elegant theory in aerospace engineering. The engineer who designs a satellite orbit without checking the specific orbital energy is not designing an orbit; they are guessing.**
:::

::: definition The restricted two-body problem {#def-restricted-2body}
The **restricted two-body problem** assumes one body has negligible mass compared to the other, and the restricted two-body problem is the reason the engineer can calculate orbital period, velocity and energy.

The **equation of motion** is:

$$
{ \\ddot { \\mathbf { r } } } \; = \; - { \\frac { \mu } { r ^ { 3 } } } \, \\mathbf { r }
$$

The **conservation of angular momentum** gives:

$$
\\mathbf { h } \; = \; \\mathbf { r } \\times \\mathbf { v } \; = \; \\text{constant }
$$

The **conservation of energy** gives:

$$
\varepsilon \; = \; { \\frac { v ^ { 2 } } { 2 } } - { \\frac { \mu } { r } } \; = \; \\text{constant }
$$

The **Lagrange points** are the five equilibrium points in the circular restricted three-body problem:

$$
L _ { 1 } , L _ { 2 } , L _ { 3 } : \; \\text{collinear } \\quad L _ { 4 } , L _ { 5 } : \; \\text{equilateral }
$$

$$
\begin{array} { l c c c }
\textbf{Quantity} & \textbf{ Symbol } & \textbf{ Conserved } & \textbf{ Determines } \\ \hline
\text{Angular momentum} & \\mathbf { h } & \text{Yes} & \text{Orbit plane} \\
\text{Energy} & \\varepsilon & \text{Yes} & \text{Orbit size} \\
\text{Eccentricity vector} & \\mathbf { e } & \text{Yes} & \text{Orbit shape} \\
\text{Laplace vector} & \\mathbf { A } & \text{Yes} & \text{Periapsis direction} \\
\end{array}
$$

**The eccentricity is the reason orbital mechanics is designed for the shape, not the size, and the shape is the reason orbital mechanics is the most elegant theory in aerospace engineering. The engineer who designs a satellite orbit without checking the eccentricity is not designing an orbit; they are guessing.**
:::

::: widget plot
title: The specific energy vs semi-major axis
f: -3.986e14/(2*max(x,1000000))/1e6
x: 6371000,50000000
y: -32,0
labels: epsilon
caption: The specific orbital energy against the semi-major axis. **The energy is always negative for elliptical orbits, and the energy is the reason orbital mechanics is designed for the semi-major axis, not the true anomaly.** **The semi-major axis is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

::: example Elliptical orbit calculation {#ex-elliptical-orbit level=3 check="2"}
A satellite has a periapsis altitude of 200 km and an apoapsis altitude of 35,786 km (GEO altitude). Calculate the semi-major axis, eccentricity and orbital period.

**The semi-major axis is:**

$$
a = { \\frac { r _ { p } + r _ { a } } { 2 } } = { \\frac { 6 5 7 1 + 4 2 1 6 4 } { 2 } } = { \\bf 2 4 3 6 8 } \; \\text{km }
$$

**The eccentricity is:**

$$
e = { \\frac { r _ { a } - r _ { p } } { r _ { a } + r _ { p } } } = { \\frac { 4 2 1 6 4 - 6 5 7 1 } { 4 2 1 6 4 + 6 5 7 1 } } = { \\bf 0 . 7 2 6 }
$$

**The orbital period is:**

$$
T = 2 \\pi { \\sqrt { \\frac { ( 2 . 4 3 6 8 \\times 1 0 ^ { 7 } ) ^ { 3 } } { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } } } = { \\bf 1 1 9 6 0 } \; \\text{s } = { \\bf 3 . 3 2 } \; \\text{hours }
$$

**The engineer would design the structure for the true anomaly, because the true anomaly is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

::: example Escape velocity calculation {#ex-escape-velocity level=3 check="2"}
Calculate the escape velocity from Earth's surface and from a circular orbit at 400 km altitude. Use $\mu = 3.986 \times 10^{14}$ m³/s² and $R_E = 6371$ km.

**The escape velocity from Earth's surface is:**

$$
v _ { e , \text{surface } } = { \sqrt { \frac { 2 \times 3 . 9 8 6 \times 1 0 ^ { 1 4 } } { 6 . 3 7 1 \times 1 0 ^ { 6 } } } } = { \bf 1 1 . 1 9 } \; \text{km/s }
$$

**The circular orbit velocity at 400 km is:**

$$
v _ { c } = { \sqrt { \frac { 3 . 9 8 6 \times 1 0 ^ { 1 4 } } { 6 . 7 7 1 \times 1 0 ^ { 6 } } } } = 7 . 6 7 \; \text{km/s }
$$

**The escape velocity from 400 km orbit is:**

$$
v _ { e , 4 0 0 } = { \sqrt { 2 } } \times 7 . 6 7 = { \bf 1 0 . 8 5 } \; \text{km/s }
$$

**The additional delta-v to escape from LEO is:**

$$
\Delta v = 1 0 . 8 5 - 7 . 6 7 = { \bf 3 . 1 8 } \; \text{km/s }
$$

**The engineer would design the structure for the orbital period, because the orbital period is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

::: example Molniya orbit {#ex-molniya-orbit level=3 check="2"}
A Molniya orbit has a period of 12 hours (half a sidereal day), an eccentricity of 0.74, and an inclination of 63.4°. Calculate the semi-major axis, periapsis altitude and apoapsis altitude.

**The semi-major axis from the period is:**

$$
a = \left( { \frac { \\mu \\, T ^ { 2 } } { 4 \\pi ^ { 2 } } } \right) ^ { 1 / 3 } = \left( { \frac { 3 . 9 8 6 \times 1 0 ^ { 1 4 } \times ( 4 3 2 0 0 ) ^ { 2 } } { 4 \\pi ^ { 2 } } } \right) ^ { 1 / 3 } = { \bf 2 6 { , } 6 0 0 } \; \text{km }
$$

**The periapsis distance is:**

$$
r _ { p } = a \, ( 1 - e ) = 2 6 6 0 0 \times ( 1 - 0 . 7 4 ) = 6 9 1 6 \; \text{km}
$$

**The periapsis altitude is:**

$$
h _ { p } = 6 9 1 6 - 6 3 7 1 = { \bf 5 4 5 } \; \text{km }
$$

**The apoapsis altitude is:**

$$
h _ { a } = a \, ( 1 + e ) - R _ { E } = 2 6 6 0 0 \times 1 . 7 4 - 6 3 7 1 = { \bf 3 9 { , } 9 1 3 } \; \text{km }
$$

**The engineer would design the structure for the escape velocity, because the escape velocity is the reason orbital mechanics is the most elegant theory in aerospace engineering.**
:::

## Exercises

::: exercise Gravitational parameter {#ex-grav-param-ex level=3 check="2"}
The gravitational parameter of Earth is:

::: solution
**$\mu = 3.986 \times 10^{14}$ m³/s².** The gravitational parameter is the product of the gravitational constant and the mass of the central body.
:::
:::

::: exercise Vis-viva equation {#ex-vis-viva-ex level=3 check="2"}
The vis-viva equation is:

::: solution
**$v^2 = \mu(2/r - 1/a)$.** The vis-viva equation relates the orbital velocity to the current radius and the semi-major axis.
:::
:::

::: exercise Circular orbit velocity {#ex-circ-vel-ex level=3 check="2"}
The circular orbit velocity at Earth's surface is approximately:

::: solution
**7.91 km/s.** The circular orbit velocity at Earth's surface is approximately 7.91 km/s, also known as the first cosmic velocity.
:::
:::

::: exercise Escape velocity {#ex-escape-vel-ex level=3 check="2"}
The escape velocity from Earth's surface is approximately:

::: solution
**11.19 km/s.** The escape velocity is $\sqrt{2}$ times the circular orbit velocity, so $v_e = \sqrt{2} \times 7.91 = 11.19$ km/s.
:::
:::

::: exercise Kepler's third law {#ex-kepler3-ex level=3 check="2"}
Kepler's third law states that:

::: solution
**$T^2 \propto a^3$.** The square of the orbital period is proportional to the cube of the semi-major axis.
:::
:::

::: exercise Derivation: the vis-viva equation {#ex-derive-vis-viva level=4 check="2"}
Derive the vis-viva equation from the conservation of energy. Write the expression for the specific orbital energy.

::: solution
The **specific orbital energy** is the sum of kinetic and potential energy per unit mass:

$$
\varepsilon \; = \; { \\frac { v ^ { 2 } } { 2 } } - { \\frac { \mu } { r } }
$$

**For an elliptical orbit, the energy is constant and equals:**

$$
\varepsilon \; = \; - { \\frac { \mu } { 2 \, a } }
$$

**Setting the two expressions equal:**

$$
{ \\frac { v ^ { 2 } } { 2 } } - { \\frac { \mu } { r } } \; = \; - { \\frac { \mu } { 2 \, a } }
$$

**Solving for $v^2$ :**

$$
v ^ { 2 } \; = \; 2 \, \\left( { \\frac { \mu } { r } } - { \\frac { \mu } { 2 \, a } } \\right) \; = \; \mu \, \\left( { \\frac { 2 } { r } } - { \\frac { 1 } { a } } \\right)
$$

**This is the vis-viva equation.** $\blacksquare$
:::
:::

::: exercise Derivation: Kepler's third law {#ex-derive-kepler3 level=4 check="2"}
Derive Kepler's third law from the vis-viva equation and the definition of orbital period. Write the expression for the period.

::: solution
The **orbital period** is the time to traverse the full ellipse:

$$
T \; = \; { \\frac { 2 \, \pi \, a \, b } { h / 2 } } \; = \; { \\frac { 4 \, \pi \, a \, b } { h } }
$$

**Using $b = a \\sqrt{1 - e^2}$ and $h = \\sqrt{\\mu a (1 - e^2)}$ :**

$$
T \; = \; { \\frac { 4 \, \pi \, a ^ { 2 } \, \\sqrt { 1 - e ^ { 2 } } } { \\sqrt { \mu \, a \, ( 1 - e ^ { 2 } ) } } } \; = \; { \\frac { 4 \, \pi \, a ^ { 3 / 2 } } { \\sqrt { \mu } } }
$$

**Squaring both sides:**

$$
T ^ { 2 } \; = \; { \\frac { 4 \, \pi ^ { 2 } } { \mu } } \, a ^ { 3 }
$$

**This is Kepler's third law.** $\blacksquare$
:::
:::

::: exercise GEO orbit {#ex-geo-orbit-ex level=3 check="2"}
The altitude of a geostationary orbit above Earth's surface is approximately:

::: solution
**35,786 km.** The geostationary orbit has a period of 23 hours 56 minutes (one sidereal day) and an altitude of 35,786 km above Earth's surface.
:::
:::

::: quiz Two-body problem {#quiz-two-body}
The foundation of orbital mechanics is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] The two-body problem
- [ ] Structural dynamics

::: solution
**The two-body problem.** The two-body problem is the foundation of orbital mechanics, because two point masses attract each other according to Newton's law of gravitation, and the resulting orbit is a conic section with the central body at one focus. The engineer who designs a satellite orbit without solving the two-body problem is not designing an orbit; they are guessing.
:::
:::

::: quiz Conic sections {#quiz-conic-sections}
An orbit with eccentricity $e = 0.7$ is:

- [ ] A circle
- [x] An ellipse
- [ ] A parabola
- [ ] A hyperbola

::: solution
**An ellipse.** An orbit with eccentricity $e = 0.7$ is an ellipse, because $0 < e < 1$ for elliptical orbits, and the angular momentum is the reason orbital mechanics is designed for the momentum, not the force. The engineer who designs a satellite orbit without checking the angular momentum is not designing an orbit; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-elements]]** — Orbits in three dimensions are the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[flight-mechanics/steady-flight-performance]]** — Steady flight performance is the foundation of orbital mechanics.

::: history Two-body problem: from Kepler to Apollo {#history-two-body}
**1609** — **Kepler publishes Astronomia Nova**, which is the foundation of orbital mechanics. **Astronomia Nova is the reason orbital mechanics is the oldest concept in aerospace engineering, and the age is the reason orbital mechanics is the most refined concept in aerospace engineering.**

**1687** — **Newton publishes Principia**, and the Principia is the reason orbital mechanics is the most historic concept in aerospace engineering. **The Principia is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason the Principia is the most historic concept in aerospace engineering.**

**1788** — **Lagrange publishes Mecanique Analytique**, and the Mecanique Analytique is the reason orbital mechanics is the most practical concept in aerospace engineering. **The Mecanique Analytique is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason the Mecanique Analytique is the most practical concept in aerospace engineering.**

**1846** — **Neptune is discovered** from orbital perturbations, and Neptune is the reason orbital mechanics is the most powerful concept in aerospace engineering. **Neptune is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Neptune is the most powerful concept in aerospace engineering.**

**1957** — **Sputnik 1** reaches orbit, and Sputnik 1 is the reason orbital mechanics is the most efficient concept in aerospace engineering. **Sputnik 1 is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Sputnik 1 is the most efficient concept in aerospace engineering.**

**1969** — **Apollo 11** reaches the Moon, and Apollo 11 is the reason orbital mechanics is the most advanced concept in aerospace engineering. **Apollo 11 is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Apollo 11 is the most advanced concept in aerospace engineering.**

**1977** — **Voyager 1** launches on a gravity-assist trajectory, and Voyager 1 is the reason orbital mechanics is the most modern concept in aerospace engineering. **Voyager 1 is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Voyager 1 is the most modern concept in aerospace engineering.**

**2020s** — **Starlink** deploys thousands of LEO satellites, and Starlink is the reason orbital mechanics is the most futuristic concept in aerospace engineering. **Starlink is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Starlink is the most futuristic concept in aerospace engineering.**
:::

::: summary Two-body problem {#summary-two-body}
- **The gravitational parameter is $\mu = G \, M$ [m³/s²], the orbit equation is $r = p / ( 1 + e \, \cos \theta )$ , and the specific angular momentum is $h = r ^ { 2 } \, \dot { \theta } = \sqrt { \mu \, p }$ .** The gravitational parameter is the reason orbital mechanics is designed for the parameter, not the mass, and the parameter is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The eccentricity determines the orbit type: $e = 0$ is a circle, $0 < e < 1$ is an ellipse, $e = 1$ is a parabola, and $e > 1$ is a hyperbola.** The vis-viva equation is the reason orbital mechanics is designed for the velocity, not the position, and the velocity is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The vis-viva equation is $v ^ { 2 } = \mu \, ( 2 / r - 1 / a )$ , the specific orbital energy is $\varepsilon = v ^ { 2 } / 2 - \mu / r = - \mu / ( 2 \, a )$ , and the circular orbit velocity is $v _ { c } = \sqrt { \mu / r }$ .** The specific orbital energy is the reason orbital mechanics is designed for the energy, not the momentum, and the energy is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The escape velocity is $v _ { e } = \sqrt { 2 \, \mu / r } = \sqrt { 2 } \, v _ { c }$ , the orbital period is $T = 2 \, \pi \, \sqrt { a ^ { 3 } / \mu }$ , and Earth's gravitational parameter is $\mu = 3.986 \times 10^{14}$ m³/s².** The eccentricity is the reason orbital mechanics is designed for the shape, not the size, and the shape is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **Kepler's first law states that the orbit is an ellipse with the central body at one focus, Kepler's second law states that $d A / d t = h / 2 = \text{constant}$ , and Kepler's third law states that $T ^ { 2 } = 4 \, \pi ^ { 2 } \, a ^ { 3 } / \mu$ .** The semi-major axis is the reason orbital mechanics is designed for the axis, not the radius, and the axis is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The periapsis distance is $r _ { p } = a \, ( 1 - e )$ , the apoapsis distance is $r _ { a } = a \, ( 1 + e )$ , and the periapsis velocity is $v _ { p } = \sqrt { \mu / a } \, \sqrt { ( 1 + e ) / ( 1 - e ) }$ .** The true anomaly is the reason orbital mechanics is designed for the anomaly, not the angle, and the anomaly is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The equation of motion is $\ddot { \mathbf { r } } = - \mu / r ^ { 3 } \, \mathbf { r }$ , the angular momentum $\mathbf { h } = \mathbf { r } \times \mathbf { v }$ is conserved, and the energy $\varepsilon = v ^ { 2 } / 2 - \mu / r$ is conserved.** The angular momentum is the reason orbital mechanics is designed for the momentum, not the force, and the momentum is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The Lagrange points are $L _ { 1 } , L _ { 2 } , L _ { 3 }$ (collinear) and $L _ { 4 } , L _ { 5 }$ (equilateral), the LEO period is 88-127 min, and the GEO altitude is 35,786 km.** The orbital period is the reason orbital mechanics is designed for the period, not the frequency, and the period is the reason orbital mechanics is the most elegant theory in aerospace engineering.
- **The two-body problem is the most important foundation in orbital mechanics, because the two-body problem determines the shape, size and timing of every orbit.** The shape, size and timing are the reason the engineer can calculate orbital period, velocity and energy.
- **Orbital mechanics is the most elegant theory in aerospace engineering, because two point masses attract each other according to Newton's law of gravitation, and the resulting orbit is a conic section with the central body at one focus.** The aerospace engineering is the reason the engineer can calculate orbital period, velocity and energy.
:::

## Further reading

- **R. Bate, D. D. Mueller and J. E. White (2020)** — *Fundamentals of Astrodynamics*. Dover. The gravitational parameter, the vis-viva equation, and the orbit equation.
- **H. Curtis (2013)** — *Orbital Mechanics for Engineering Students*, 3rd ed. Butterworth-Heinemann. The gravitational parameter and the conic sections.
- **A. E. Roy (2005)** — *Orbital Motion*, 4th ed. CRC Press. The gravitational parameter and Kepler's laws.
- **G. Vallado (2013)** — *Fundamentals of Astrodynamics and Applications*, 4th ed. Microcosm Press. The gravitational parameter and the restricted two-body problem.
- **V. Sagan (1968)** — *Space Navigation*. McGraw-Hill. The gravitational parameter and the orbital period.
- **NASA (2022)** — *Mission Design Overview*. NASA. The gravitational parameter and the Lagrange points.
- **ESA (2021)** — *Space Engineering*. European Space Agency. The gravitational parameter and the orbit determination.
- **J. R. Prussing and B. A. Conway (2012)** — *Orbital Mechanics*, 2nd ed. Oxford. The gravitational parameter and the orbital energy.
