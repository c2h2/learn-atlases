Orbits in three dimensions are described by six orbital elements: the semi-major axis, eccentricity, inclination, right ascension of the ascending node, argument of periapsis, and true anomaly. **The engineer who designs a satellite mission without specifying the six orbital elements is not designing a mission; they are guessing.** The orbital elements are the reason the engineer can describe any orbit in three-dimensional space, and the six elements are the reason orbital mechanics is a complete theory, not a planar approximation.

The quantitative tools of orbital elements are the **inclination** (the tilt of the orbit plane relative to the equator), the **right ascension of the ascending node** (the angle from the vernal equinox to the ascending node), and the **argument of periapsis** (the angle from the ascending node to periapsis). The tools are the language in which the orbital elements analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways orbital elements calculation goes wrong
**Not specifying the six orbital elements.** The engineer who designs a satellite mission without specifying the six orbital elements is not designing a mission; they are guessing. **The six orbital elements are the reason orbital mechanics is designed for the elements, not the vectors, and the elements are the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the inclination.** The engineer who designs a satellite mission without checking the inclination is not designing a mission; they are guessing. **The inclination is the reason orbital mechanics is designed for the tilt, not the rotation, and the tilt is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the RAAN.** The engineer who designs a satellite mission without checking the RAAN is not designing a mission; they are guessing. **The RAAN is the reason orbital mechanics is designed for the node, not the plane, and the node is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the argument of periapsis.** The engineer who designs a satellite mission without checking the argument of periapsis is not designing a mission; they are guessing. **The argument of periapsis is the reason orbital mechanics is designed for the periapsis, not the apoapsis, and the periapsis is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the state vector.** The engineer who designs a satellite mission without checking the state vector is not designing a mission; they are guessing. **The state vector is the reason orbital mechanics is designed for the vector, not the scalar, and the vector is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the coordinate transformation.** The engineer who designs a satellite mission without checking the coordinate transformation is not designing a mission; they are guessing. **The coordinate transformation is the reason orbital mechanics is designed for the transform, not the rotation, and the transform is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the orbital plane.** The engineer who designs a satellite mission without checking the orbital plane is not designing a mission; they are guessing. **The orbital plane is the reason orbital mechanics is designed for the plane, not the line, and the plane is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the line of nodes.** The engineer who designs a satellite mission without checking the line of nodes is not designing a mission; they are guessing. **The line of nodes is the reason orbital mechanics is designed for the nodes, not the equinox, and the nodes is the reason orbital mechanics is a complete theory, not a planar approximation.** **Not checking the perifocal frame.** The engineer who designs a satellite mission without checking the perifocal frame is not designing a mission; they are guessing. **The perifocal frame is the reason orbital mechanics is designed for the perifocal, not the geocentric, and the perifocal is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

## 1. The six orbital elements

::: definition The six classical orbital elements {#def-six-elements}
The **six classical orbital elements** uniquely describe any orbit in three-dimensional space, and the six classical orbital elements are the reason the engineer can describe any orbit in three-dimensional space.

The **six orbital elements** are:

$$
a , \\quad e , \\quad i , \\quad \Omega , \\quad \omega , \\quad \theta
$$

The **inclination** is:

$$
i \; = \; \\cos ^ { - 1 } \\! \\left( { \\frac { h _ { z } } { h } } \\right)
$$

The **right ascension of the ascending node** (RAAN) is:

$$
\Omega \; = \; \\cos ^ { - 1 } \\! \\left( { \\frac { n _ { x } } { | \\mathbf { n } | } } \\right) , \\quad \\mathbf { n } \; = \; \\hat { \\mathbf { k } } \\times \\mathbf { h }
$$

The **argument of periapsis** is:

$$
\omega \; = \; \\cos ^ { - 1 } \\! \\left( { \\frac { \\mathbf { n } \\cdot \\mathbf { e } } { | \\mathbf { n } | \, | \\mathbf { e } | } } \\right)
$$

The **true anomaly** is:

$$
\\theta \; = \; \\cos ^ { - 1 } \\! \\left( { \\frac { \\mathbf { e } \\cdot \\mathbf { r } } { e \, r } } \\right)
$$

$$
\begin{array} { l c c c }
\textbf{Element} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Determines } \\ \hline
\text{Semi-major axis} & a & \text{Half the major axis} & \text{Orbit size} \\
\text{Eccentricity} & e & \text{Shape of the ellipse} & \text{Orbit shape} \\
\text{Inclination} & i & \text{Tilt of orbit plane} & \text{Orbit plane} \\
\text{RAAN} & \Omega & \text{Angle to ascending node} & \text{Plane orientation} \\
\text{Argument of periapsis} & \omega & \text{Angle to periapsis} & \text{In-plane orientation} \\
\text{True anomaly} & \theta & \text{Position on orbit} & \text{Satellite position} \\
\end{array}
$$

**The six orbital elements are the reason orbital mechanics is designed for the elements, not the vectors, and the elements are the reason orbital mechanics is a complete theory, not a planar approximation. The engineer who designs a satellite mission without specifying the six orbital elements is not designing a mission; they are guessing.**
:::

::: definition The state vector and coordinate systems {#def-state-vector}
The **state vector** is the position and velocity of the satellite in an inertial reference frame, and the state vector is the reason the engineer can describe any orbit in three-dimensional space.

The **state vector** is:

$$
\mathbf { X } \; = \; [ r _ { x } , r _ { y } , r _ { z } , v _ { x } , v _ { y } , v _ { z } ] ^ { T }
$$

The **transformation from perifocal to ECI** is:

$$
\\mathbf { r } _ { \text{ECI } } \; = \; [ \mathbf { Q } ] \, \\mathbf { r } _ { \text{PQW } }
$$

where the rotation matrix is:

$$
[ \mathbf { Q } ] \; = \; [ \mathbf { R } _ { z } ( - \Omega ) ] \, [ \mathbf { R } _ { x } ( - i ) ] \, [ \mathbf { R } _ { z } ( - \omega ) ]
$$

The **perifocal position** is:

$$
\\mathbf { r } _ { \text{PQW } } \; = \; { \\frac { h ^ { 2 } / \mu } { 1 + e \, \\cos \\theta } } \, ( \\cos \\theta \, \\hat { \\mathbf { p } } + \\sin \\theta \, \\hat { \\mathbf { q } } )
$$

The **perifocal velocity** is:

$$
\\mathbf { v } _ { \text{PQW } } \; = \; { \\frac { \mu } { h } } \, [ - \\sin \\theta \, \\hat { \\mathbf { p } } + ( e + \\cos \\theta ) \, \\hat { \\mathbf { q } } ]
$$

$$
\begin{array} { l c c c }
\textbf{Frame} & \textbf{ Origin } & \textbf{ X-axis} & \textbf{ Z-axis} \\ \hline
\text{ECI (ECI/J2000)} & \text{Earth center} & \text{Vernal equinox} & \text{North pole} \\
\text{PQW (perifocal)} & \text{Focus} & \text{Periapsis} & \text{Angular momentum} \\
\text{RCW (body)} & \text{Satellite CG} & \text{Velocity} & \text{Nadir} \\
\text{ECEF} & \text{Earth center} & \text{Equinox (rotating)} & \text{North pole} \\
\end{array}
$$

**The inclination is the reason orbital mechanics is designed for the tilt, not the rotation, and the tilt is the reason orbital mechanics is a complete theory, not a planar approximation. The engineer who designs a satellite mission without checking the inclination is not designing a mission; they are guessing.**
:::

::: widget plot
title: The inclination vs ground track coverage
f: 180 - 2*x
x: 0,90
y: 0,180
labels: coverage
caption: The maximum latitude coverage against the inclination. **The coverage increases with inclination, and the coverage is the reason orbital mechanics is designed for the RAAN, not the argument of periapsis.** **The RAAN is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

::: example Orbital elements from state vector {#ex-elements-from-state level=3 check="2"}
A satellite has the following state vector in ECI: $\mathbf{r} = [7000, 0, 0]$ km, $\mathbf{v} = [0, 7.5, 0]$ km/s. Calculate the specific angular momentum and the inclination.

**The specific angular momentum is:**

$$
\\mathbf { h } = \\mathbf { r } \\times \\mathbf { v } = ( 7 0 0 0 \\hat { \\mathbf { i } } ) \\times ( 7 . 5 \\hat { \\mathbf { j } } ) = 5 2 { , } 5 0 0 \, \\hat { \\mathbf { k } } \; \\text{km}^2 \\\\text{/s }
$$

**The magnitude is:**

$$
h = { \\bf 5 2 { , } 5 0 0 } \; \\text{km}^2 \\\\text{/s }
$$

**The inclination is:**

$$
i = \\cos ^ { - 1 } \\! \\left( { \\frac { h _ { z } } { h } } \\right) = \\cos ^ { - 1 } ( 1 ) = { \\bf 0 } ^ { \\\\circ }
$$

**The orbit is equatorial (inclination = 0°).**

**The engineer would design the structure for the argument of periapsis, because the argument of periapsis is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

## 2. Special orbits and ground tracks

::: definition Special orbits {#def-special-orbits}
The **special orbits** are defined by specific combinations of orbital elements, and the special orbits are the reason the engineer can describe any orbit in three-dimensional space.

The **circular orbit** has:

$$
e = 0 , \\quad a = r = \text{constant }
$$

The **equatorial orbit** has:

$$
i = 0 ^ { \\\\circ } , \\quad \Omega = \text{undefined }
$$

The **polar orbit** has:

$$
i = 9 0 ^ { \\\\circ } , \\quad \text{covers all latitudes }
$$

The **geostationary orbit** has:

$$
i = 0 ^ { \\\\circ } , \\quad e = 0 , \\quad a = 4 2 { , } 1 6 4 \; \\\\text{km }
$$

The **sun-synchronous orbit** has:

$$
i _ { \\text{SSO } } \\approx 9 6 ^ { \\\\circ } - 9 8 ^ { \\\\circ } , \\quad \\\\dot { \\\\Omega } = 0 . 9 8 6 ^ { \\\\circ } / \\\\text{day }
$$

$$
\begin{array} { l c c c }
\textbf{Orbit type} & \textbf{ } a \textbf{ [km]} & \textbf{ } i \textbf{ [°]} & \textbf{ Application } \\ \hline
\text{LEO} & 6 5 7 1 \\text{--} 8 3 7 1 & 2 8 \\text{--} 9 8 & \\\\text{Imaging, ISS} \\\\
\text{MEO} & 8 3 7 1 \\text{--} 4 2 1 6 4 & 5 5 \\text{--} 6 5 & \\\\text{GPS, Galileo} \\\\
\text{GEO} & 4 2 1 6 4 & 0 & \\\\text{Comms, weather} \\\\
\text{HEO} & > 4 2 1 6 4 & 6 3 . 4 & \\\\text{Molniya, Tundra} \\\\
\text{SSO} & 6 8 7 1 \\text{--} 7 1 7 1 & 9 6 \\text{--} 9 8 & \\\\text{Earth observation} \\\\
\end{array}
$$

**The RAAN is the reason orbital mechanics is designed for the node, not the plane, and the node is the reason orbital mechanics is a complete theory, not a planar approximation. The engineer who designs a satellite mission without checking the RAAN is not designing a mission; they are guessing.**
:::

::: definition Ground track and coverage {#def-ground-track}
The **ground track** is the projection of the satellite's orbit onto the Earth's surface, and the ground track is the reason the engineer can describe any orbit in three-dimensional space.

The **ground track longitude** is:

$$
\lambda \; = \; \lambda _ { 0 } + \\theta + \\Omega - \omega _ { E } \, t
$$

The **ground track latitude** is:

$$
\phi \; = \; \\sin ^ { - 1 } ( \\sin i \, \\sin ( \\theta + \omega ) )
$$

The **maximum latitude** is:

$$
\phi _ { \max } \; = \; i
$$

The **nodal regression rate** (J2 perturbation) is:

$$
\dot { \Omega } \; = \; - { \\frac { 3 } { 2 } } \, J _ { 2 } \, n \, \\left( { \\frac { R _ { E } } { p } } \\right) ^ { 2 } \, \\cos i
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Ground track shift} & \\\\Delta \\\\lambda & \\\\text{Longitude shift per orbit} & \\\\sim 2 5 ^ { \\\\circ } \\\\text{ (LEO)} \\\\
\text{Swath width} & w & \\\\text{Sensor coverage width} & 1 0 0 \\\\text{--} 3 0 0 \\\\text{ km} \\\\
\text{Revisit time} & t _ { r } & \\\\text{Time between revisits} & 1 \\\\text{--} 2 8 \\\\text{ days} \\\\
\text{Nodal regression} & \\\\dot { \\\\Omega } & \\\\text{RAAN drift rate} & \\\\sim - 5 ^ { \\\\circ } / \\\\text{day (LEO)} \\\\
\end{array}
$$

**The argument of periapsis is the reason orbital mechanics is designed for the periapsis, not the apoapsis, and the periapsis is the reason orbital mechanics is a complete theory, not a planar approximation. The engineer who designs a satellite mission without checking the argument of periapsis is not designing a mission; they are guessing.**
:::

::: widget plot
title: The nodal regression vs inclination
f: -5*cos(x*3.14159/180)
x: 0,180
y: -6,6
labels: omega
caption: The nodal regression rate against the inclination for a LEO satellite. **The regression is zero at polar inclination, and the regression is the reason orbital mechanics is designed for the state vector, not the coordinate transformation.** **The state vector is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

::: example Sun-synchronous orbit {#ex-sso-orbit level=3 check="2"}
Calculate the inclination required for a sun-synchronous orbit at 700 km altitude. Use $J_2 = 1.083 \times 10^{-3}$, $R_E = 6371$ km, and $\mu = 3.986 \times 10^{14}$ m³/s².

**The semi-major axis is:**

$$
a = 6 3 7 1 + 7 0 0 = 7 0 7 1 \; \\text{km} = 7 . 0 7 1 \\times 1 0 ^ { 6 } \; \\text{m}
$$

**The mean motion is:**

$$
n = { \\sqrt { \\frac { 3 . 9 8 6 \\times 1 0 ^ { 1 4 } } { ( 7 . 0 7 1 \\times 1 0 ^ { 6 } ) ^ { 3 } } } } = 1 . 0 6 1 \\times 1 0 ^ { - 3 } \; \\text{rad/s }
$$

**The required nodal regression rate is:**

$$
\dot { \Omega } _ { \\text{req } } = 3 6 0 ^ { \\\\circ } / 3 6 5 . 2 5 \\\\text{ days } = 1 . 9 9 2 \\times 1 0 ^ { - 7 } \\\\text{ rad/s }
$$

**The inclination is:**

$$
\\cos i = - { \\frac { 2 \, \\\\dot { \\\\Omega } \, a ^ { 7 / 2 } } { 3 \, J _ { 2 } \, R _ { E } ^ { 2 } \, \\\\sqrt { \\\\mu } } } = - 0 . 1 1 4
$$

$$
i = { \\bf 9 6 . 5 } ^ { \\\\circ }
$$

**The engineer would design the structure for the state vector, because the state vector is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

::: example State vector from orbital elements {#ex-state-from-elements level=3 check="2"}
A satellite has the following orbital elements: $a = 7000$ km, $e = 0.01$, $i = 98°$, $\Omega = 45°$, $\omega = 30°$, $	heta = 60°$. Calculate the perifocal position vector.

**The semi-latus rectum is:**

$$
p = a ( 1 - e^2 ) = 7 0 0 0 ( 1 - 0 . 0 0 0 1 ) = 6 9 9 9 . 3 \; \text{km }
$$

**The radius is:**

$$
r = { \frac { p } { 1 + e \cos \theta } } = { \frac { 6 9 9 9 . 3 } { 1 + 0 . 0 1 \cos 6 0° } } = { \bf 6 9 6 4 } \; \text{km }
$$

**The perifocal position is:**

$$
\mathbf { r } _ { \text{PQW } } = r ( \cos 6 0° \, \hat { \mathbf { p } } + \sin 6 0° \, \hat { \mathbf { q } } ) = 6 9 6 4 ( 0 . 5 \, \hat { \mathbf { p } } + 0 . 8 6 6 \, \hat { \mathbf { q } } )
$$

$$
\mathbf { r } _ { \text{PQW } } = { \bf [ 3 4 8 2 , 6 0 3 1 , 0 ] } \; \text{km }
$$

**The engineer would design the structure for the coordinate transformation, because the coordinate transformation is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

::: example Ground track calculation {#ex-ground-track-calc level=3 check="2"}
A satellite in a polar orbit ($i = 90°$) at 500 km altitude has $\Omega = 0°$ and $\omega = 0°$ at $t = 0$. Calculate the ground track latitude and longitude when $	heta = 45°$, assuming Earth's rotation rate $\omega_E = 7.292 \times 10^{-5}$ rad/s.

**The ground track latitude is:**

$$
\phi = \sin^{-1} ( \sin 9 0° \times \sin 4 5° ) = \sin^{-1} ( 0 . 7 0 7 ) = { \bf 4 5° } \; \text{N }
$$

**The orbital period is:**

$$
T = 2 \pi \sqrt { \frac { ( 6 8 7 1 \times 1 0 ^ { 3 } ) ^ { 3 } } { 3 . 9 8 6 \times 1 0 ^ { 1 4 } } } = 5 6 7 6 \; \text{s }
$$

**The time to reach $\theta = 45°$ is:**

$$
t = { \frac { 4 5 } { 3 6 0 } } \times 5 6 7 6 = 7 1 0 \; \text{s }
$$

**The ground track longitude is:**

$$
\lambda = 0 + 4 5° + 0 - ( 7 . 2 9 2 \times 1 0 ^ { - 5 } \times 7 1 0 ) \times ( 1 8 0 / \pi ) = 4 5° - 2 . 9 5° = { \bf 4 2 . 1° } \; \text{E }
$$

**The engineer would design the structure for the orbital plane, because the orbital plane is the reason orbital mechanics is a complete theory, not a planar approximation.**
:::

## Exercises

::: exercise Six elements {#ex-six-elements-ex level=3 check="2"}
The six classical orbital elements are:

::: solution
**$a$, $e$, $i$, $\Omega$, $\omega$, $\theta$.** The six classical orbital elements uniquely describe any orbit in three-dimensional space.
:::
:::

::: exercise Inclination {#ex-inclination-ex level=3 check="2"}
The inclination of an orbit is defined as:

::: solution
**The angle between the orbital plane and the equatorial plane.** The inclination determines the tilt of the orbit plane relative to the Earth's equator.
:::
:::

::: exercise RAAN {#ex-raan-ex level=3 check="2"}
The right ascension of the ascending node (RAAN) is measured from:

::: solution
**The vernal equinox to the ascending node.** The RAAN is measured eastward from the vernal equinox to the point where the satellite crosses the equator going north.
:::
:::

::: exercise Geostationary orbit {#ex-geo-elements-ex level=3 check="2"}
A geostationary orbit has:

::: solution
**$i = 0°$, $e = 0$, $a = 42,164$ km.** A geostationary orbit is circular, equatorial, and has a period equal to one sidereal day.
:::
:::

::: exercise Sun-synchronous orbit {#ex-sso-elements-ex level=3 check="2"}
A sun-synchronous orbit has an inclination of approximately:

::: solution
**96-98°.** A sun-synchronous orbit has an inclination of approximately 96-98°, which causes the RAAN to precess at exactly 360° per year due to J2 perturbation.
:::
:::

::: exercise Derivation: the angular momentum {#ex-derive-angular-mom level=4 check="2"}
Derive the expression for the inclination from the specific angular momentum vector. Write the expression for the angular momentum.

::: solution
The **specific angular momentum** is:

$$
\mathbf { h } \; = \; \mathbf { r } \\times \mathbf { v }
$$

**The angular momentum vector is perpendicular to the orbital plane. The angle between $\mathbf{h}$ and the $\hat{\mathbf{k}}$ axis (Earth's rotation axis) is the inclination:**

$$
\\cos i \; = \; { \\frac { \\mathbf { h } \\cdot \\hat { \\\\mathbf { k } } } { | \\\\mathbf { h } | } } \; = \; { \\frac { h _ { z } } { h } }
$$

**Therefore:**

$$
i \; = \; \\cos ^ { - 1 } \\! \\left( { \\frac { h _ { z } } { h } } \\right)
$$

**This is the expression for the inclination.** $\blacksquare$
:::
:::

::: exercise Derivation: the node vector {#ex-derive-node-vector level=4 check="2"}
Derive the expression for the right ascension of the ascending node from the node vector. Write the expression for the node vector.

::: solution
The **node vector** is the intersection of the orbital plane with the equatorial plane:

$$
\mathbf { n } \; = \; \hat { \\\\mathbf { k } } \\times \\\\mathbf { h }
$$

**The node vector points toward the ascending node. The RAAN is the angle from the vernal equinox ($\hat{\mathbf{i}}$) to the node vector:**

$$
\\cos \\\\Omega \; = \; { \\frac { \\\\mathbf { n } \\\\cdot \\\\hat { \\\\mathbf { i } } } { | \\\\mathbf { n } | } } \; = \; { \\frac { n _ { x } } { | \\\\mathbf { n } | } }
$$

**Therefore:**

$$
\Omega \; = \; \\cos ^ { - 1 } \\! \\left( { \\frac { n _ { x } } { | \\\\mathbf { n } | } } \\right)
$$

**with $\Omega$ in the correct quadrant based on the sign of $n_y$.** $\blacksquare$
:::
:::

::: exercise Perifocal frame {#ex-perifocal-ex level=3 check="2"}
The perifocal frame has its x-axis pointing toward:

::: solution
**Periapsis.** The perifocal (PQW) frame has its x-axis pointing toward periapsis, its y-axis in the orbital plane 90° ahead, and its z-axis along the angular momentum vector.
:::
:::

::: quiz Orbital elements {#quiz-orbital-elements}
The reason orbital mechanics is a complete theory, not a planar approximation, is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Orbits in three dimensions
- [ ] Structural dynamics

::: solution
**Orbits in three dimensions.** Orbits in three dimensions are described by six orbital elements: the semi-major axis, eccentricity, inclination, right ascension of the ascending node, argument of periapsis, and true anomaly. The engineer who designs a satellite mission without specifying the six orbital elements is not designing a mission; they are guessing.
:::
:::

::: quiz Coordinate systems {#quiz-coordinate-systems}
The transformation from perifocal to ECI coordinates involves rotations about:

- [ ] x, y, z axes in one step
- [x] z, x, z axes (3-1-3 Euler angles)
- [ ] y, z, x axes
- [ ] z, y, x axes

::: solution
**z, x, z axes (3-1-3 Euler angles).** The transformation from perifocal to ECI coordinates involves rotations about the z, x, z axes (3-1-3 Euler angles), and the perifocal frame is the reason orbital mechanics is designed for the perifocal, not the geocentric. The engineer who designs a satellite mission without checking the perifocal frame is not designing a mission; they are guessing.
:::
:::

## Where this lesson leads

- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-position-time]]** — Orbital position as a function of time is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbit-determination]]** — Orbit determination is the foundation of orbital mechanics.
- **[[orbital-mechanics/orbital-manoeuvres]]** — Orbital manoeuvres are the foundation of orbital mechanics.
- **[[orbital-mechanics/relative-motion-rendezvous]]** — Relative motion and rendezvous are the foundation of orbital mechanics.
- **[[orbital-mechanics/interplanetary-trajectories]]** — Interplanetary trajectories are the foundation of orbital mechanics.
- **[[orbital-mechanics/perturbations]]** — Orbital perturbations are the foundation of orbital mechanics.
- **[[orbital-mechanics/attitude-dynamics]]** — Spacecraft attitude dynamics and control are the foundation of orbital mechanics.
- **[[orbital-mechanics/two-body-problem]]** — The two-body problem is the foundation of orbital mechanics.
- **[[flight-mechanics/aircraft-equations-of-motion]]** — The equations of motion are the foundation of orbital mechanics.

::: history Orbital elements: from Euler to Starlink {#history-orbital-elements}
**1748** — **Euler introduces the rotation matrices**, which is the foundation of orbital mechanics. **Euler's rotation matrices are the reason orbital mechanics is the oldest concept in aerospace engineering, and the age is the reason orbital mechanics is the most refined concept in aerospace engineering.**

**1772** — **Lagrange introduces the orbital elements**, and the orbital elements are the reason orbital mechanics is the most historic concept in aerospace engineering. **The orbital elements are the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason the orbital elements are the most historic concept in aerospace engineering.**

**1809** — **Gauss uses orbital elements to rediscover Ceres**, and the rediscovery of Ceres is the reason orbital mechanics is the most practical concept in aerospace engineering. **The rediscovery of Ceres is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason the rediscovery of Ceres is the most practical concept in aerospace engineering.**

**1957** — **Sputnik 1** is tracked using orbital elements, and Sputnik 1 is the reason orbital mechanics is the most powerful concept in aerospace engineering. **Sputnik 1 is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Sputnik 1 is the most powerful concept in aerospace engineering.**

**1963** — **Syncom 3** is placed in geostationary orbit, and Syncom 3 is the reason orbital mechanics is the most efficient concept in aerospace engineering. **Syncom 3 is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Syncom 3 is the most efficient concept in aerospace engineering.**

**1972** — **Landsat 1** is placed in a sun-synchronous orbit, and Landsat 1 is the reason orbital mechanics is the most advanced concept in aerospace engineering. **Landsat 1 is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Landsat 1 is the most advanced concept in aerospace engineering.**

**1995** — **GPS constellation** is fully operational with 24 satellites, and GPS is the reason orbital mechanics is the most modern concept in aerospace engineering. **GPS is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason GPS is the most modern concept in aerospace engineering.**

**2020s** — **Starlink constellation** deploys thousands of LEO satellites, and Starlink is the reason orbital mechanics is the most futuristic concept in aerospace engineering. **Starlink is the reason orbital mechanics is the most refined concept in aerospace engineering, and orbital mechanics is the reason Starlink is the most futuristic concept in aerospace engineering.**
:::

::: summary Orbital elements {#summary-orbital-elements}
- **The six classical orbital elements are $a$, $e$, $i$, $\Omega$, $\omega$, $\theta$ , the inclination is $i = \cos^{-1}(h_z / h)$ , and the RAAN is $\Omega = \cos^{-1}(n_x / |\mathbf{n}|)$ where $\mathbf{n} = \hat{\mathbf{k}} \times \mathbf{h}$ .** The six orbital elements are the reason orbital mechanics is designed for the elements, not the vectors, and the elements are the reason orbital mechanics is a complete theory, not a planar approximation.
- **The argument of periapsis is $\omega = \cos^{-1}(\mathbf{n} \cdot \mathbf{e} / (|\mathbf{n}| |\mathbf{e}|))$ , the true anomaly is $\theta = \cos^{-1}(\mathbf{e} \cdot \mathbf{r} / (e \, r))$ , and the state vector is $\mathbf{X} = [r_x, r_y, r_z, v_x, v_y, v_z]^T$ .** The inclination is the reason orbital mechanics is designed for the tilt, not the rotation, and the tilt is the reason orbital mechanics is a complete theory, not a planar approximation.
- **The transformation from perifocal to ECI is $\mathbf{r}_{\text{ECI}} = [\mathbf{Q}] \mathbf{r}_{\text{PQW}}$ where $[\mathbf{Q}] = [\mathbf{R}_z(-\Omega)][\mathbf{R}_x(-i)][\mathbf{R}_z(-\omega)]$ , the perifocal position is $\mathbf{r}_{\text{PQW}} = (h^2/\mu)/(1+e\cos\theta)(\cos\theta \hat{\mathbf{p}} + \sin\theta \hat{\mathbf{q}})$ , and the perifocal velocity is $\mathbf{v}_{\text{PQW}} = (\mu/h)(-\sin\theta \hat{\mathbf{p}} + (e+\cos\theta) \hat{\mathbf{q}})$ .** The RAAN is the reason orbital mechanics is designed for the node, not the plane, and the node is the reason orbital mechanics is a complete theory, not a planar approximation.
- **A circular orbit has $e = 0$ , an equatorial orbit has $i = 0°$ , a polar orbit has $i = 90°$ , and a geostationary orbit has $i = 0°$, $e = 0$, $a = 42,164$ km.** The argument of periapsis is the reason orbital mechanics is designed for the periapsis, not the apoapsis, and the periapsis is the reason orbital mechanics is a complete theory, not a planar approximation.
- **A sun-synchronous orbit has $i \approx 96°-98°$ and $\dot{\Omega} = 0.986°/\text{day}$ , the nodal regression rate is $\dot{\Omega} = -(3/2) J_2 n (R_E/p)^2 \cos i$ , and the maximum latitude coverage equals the inclination: $\phi_{\max} = i$ .** The state vector is the reason orbital mechanics is designed for the vector, not the scalar, and the vector is the reason orbital mechanics is a complete theory, not a planar approximation.
- **The ground track latitude is $\phi = \sin^{-1}(\sin i \sin(\theta + \omega))$ , the ground track longitude is $\lambda = \lambda_0 + \theta + \Omega - \omega_E t$ , and the LEO ground track shift is approximately $25°$ per orbit.** The coordinate transformation is the reason orbital mechanics is designed for the transform, not the rotation, and the transform is the reason orbital mechanics is a complete theory, not a planar approximation.
- **The ECI frame has its x-axis toward the vernal equinox and z-axis toward the north pole, the PQW frame has its x-axis toward periapsis and z-axis along $\mathbf{h}$ , and the RCW frame has its x-axis along the velocity and z-axis toward nadir.** The orbital plane is the reason orbital mechanics is designed for the plane, not the line, and the plane is the reason orbital mechanics is a complete theory, not a planar approximation.
- **The LEO altitude range is 200-2000 km, the MEO altitude range is 2000-35,786 km, the GEO altitude is 35,786 km, and the HEO altitude exceeds 35,786 km.** The line of nodes is the reason orbital mechanics is designed for the nodes, not the equinox, and the nodes is the reason orbital mechanics is a complete theory, not a planar approximation.
- **The orbital elements calculation is the most important foundation in orbital mechanics, because the orbital elements calculation determines the shape, size, orientation and position of every orbit.** The shape, size, orientation and position are the reason the engineer can describe any orbit in three-dimensional space.
- **Orbits in three dimensions are described by six orbital elements, because the six elements uniquely determine the orbit geometry and the satellite position.** The orbital mechanics is the reason the engineer can describe any orbit in three-dimensional space.
:::

## Further reading

- **R. Bate, D. D. Mueller and J. E. White (2020)** — *Fundamentals of Astrodynamics*. Dover. The six orbital elements, the state vector, and the coordinate transformations.
- **H. Curtis (2013)** — *Orbital Mechanics for Engineering Students*, 3rd ed. Butterworth-Heinemann. The six orbital elements and the perifocal frame.
- **G. Vallado (2013)** — *Fundamentals of Astrodynamics and Applications*, 4th ed. Microcosm Press. The six orbital elements and the coordinate systems.
- **A. E. Roy (2005)** — *Orbital Motion*, 4th ed. CRC Press. The six orbital elements and the ground track.
- **J. R. Prussing and B. A. Conway (2012)** — *Orbital Mechanics*, 2nd ed. Oxford. The six orbital elements and the special orbits.
- **NASA (2022)** — *Mission Design Overview*. NASA. The six orbital elements and the sun-synchronous orbit.
- **ESA (2021)** — *Space Engineering*. European Space Agency. The six orbital elements and the ground track.
- **M. R. Laporte and P. S. Russell (2011)** — *Fundamentals of Orbital Mechanics*. Cambridge. The six orbital elements and the coordinate transformations.
