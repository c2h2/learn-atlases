The thin-walled structure is the most efficient structure: the thin-walled structure is the aircraft fuselage, the pressure vessel, the pipe, and the beam, and the thin-walled structure is the structure that determines the weight of the vehicle. **The engineer who designs the thin-walled structure without understanding the membrane theory is not designing the structure; they are designing a structure that will fail by buckling, not by yielding.** The thin-walled structure theory is the reason the engineer can predict the stress distribution in the wall, and the prediction is the reason the structure is safe.

The quantitative tools of thin-walled structure theory are the **membrane theory** (the stress state in a thin shell under pressure), the **shear flow** (the shear stress distribution in a thin-walled section), the **torsion of thin-walled sections** (the Bredt formula), and the **shear centre** (the point through which the load must pass to avoid torsion). The tools are the language in which the thin-walled structure analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways thin-walled structure analysis goes wrong
**Not checking the thin-wall assumption.** The engineer who uses the membrane theory for a thick shell is not analysing the shell; they are analysing a membrane. **The membrane theory is valid when $t / r < 0 . 1$ , and the validity is the reason the membrane theory is the most widely used theory in pressure vessel design.** **Not accounting for the bending stress.** The engineer who calculates the membrane stress without checking the bending stress is not analysing the shell; they are analysing a membrane. **The bending stress is the reason the shell fails at the discontinuity, not in the middle, and the failure is the reason the shell is designed for the discontinuity stress, not the membrane stress.** **Not accounting for the buckling.** The engineer who designs the thin-walled structure without checking the buckling is not designing the structure; they are designing a structure that will fail by buckling. **The buckling is the reason the thin-walled structure is designed for the buckling load, not the yield load, and the buckling load is the reason the thin-walled structure is the most critical component in the aircraft.** **Not accounting for the shear centre.** The engineer who designs the thin-walled beam without checking the shear centre is not designing the beam; they are designing a beam that will twist. **The shear centre is the reason the load must pass through the shear centre to avoid torsion, and the torsion is the reason the thin-walled beam is the most critical component in the aircraft wing.** **Not accounting for the warping.** The engineer who calculates the torsion of the thin-walled section without checking the warping is not calculating the torsion; they are calculating the Saint-Venant torsion. **The warping is the reason the open section is weaker than the closed section in torsion, and the weakness is the reason the closed section is the most widely used section in the aircraft wing.** **Not accounting for the cutouts.** The engineer who designs the thin-walled structure without checking the cutouts is not designing the structure; they are designing a structure that will fail at the cutout. **The cutout is the reason the stress is concentrated at the cutout, and the concentration is the reason the cutout is the most critical feature in the aircraft fuselage.** **Not accounting for the stiffeners.** The engineer who designs the thin-walled structure without checking the stiffeners is not designing the structure; they are designing a structure that will buckle. **The stiffener is the reason the buckling load is increased by 4-16 times, and the increase is the reason the stiffener is the most widely used feature in the aircraft fuselage.** **Not accounting for the residual stress.** The engineer who designs the thin-walled structure without checking the residual stress is not designing the structure; they are designing a structure that will fail by stress corrosion cracking. **The residual stress is the reason the thin-walled structure is designed for the residual stress, not just the applied stress, and the residual stress is the reason the thin-walled structure is the most critical component in the welded structure.** **Not accounting for the fatigue.** The engineer who designs the thin-walled structure without checking the fatigue is not designing the structure; they are designing a structure that will fail by fatigue. **The fatigue is the reason the thin-walled structure is designed for the fatigue life, not the static strength, and the fatigue life is the reason the thin-walled structure is the most critical component in the aircraft.**
:::

## 1. Membrane theory

::: definition The membrane stress state {#def-membrane}
The **membrane stress state** is the stress state in a thin shell where the bending stresses are negligible, and the membrane stress state is the reason the engineer can calculate the stress in the pressure vessel in one line.

For a **cylindrical pressure vessel**:

$$
\sigma _ { \theta } \; = \; { \frac { p \, r } { t } } \qquad \sigma _ { z } \; = \; { \frac { p \, r } { 2 \, t } }
$$

For a **spherical pressure vessel**:

$$
\sigma _ { \theta } \; = \; \sigma _ { z } \; = \; { \frac { p \, r } { 2 \, t } }
$$

For a **general shell of revolution** (Merriam's equations):

$$
\sigma _ { 1 } \; = \; { \frac { p \, r _ { 1 } } { t } } \qquad \sigma _ { 2 } \; = \; { \frac { p \, r _ { 2 } } { t } }
$$

where $r _ { 1 }$ and $r _ { 2 }$ are the principal radii of curvature.

$$
\begin{array} { l c c c }
\textbf{Shell type} & \textbf{ } \sigma _ { \theta } & \textbf{ } \sigma _ { z } & \textbf{Use case} \\ \hline
\text{Cylinder} & p \, r / t & p \, r / ( 2 \, t ) & \text{Pipe, tank} \\
\text{Sphere} & p \, r / ( 2 \, t ) & p \, r / ( 2 \, t ) & \text{Gas holder} \\
\text{Toroid} & p \, r _ { 1 } / t & p \, r _ { 2 } / t & \text{Pressure vessel head} \\
\text{Cone} & p \, r / ( t \, \cos \alpha ) & p \, r / ( 2 \, t \, \cos \alpha ) & \text{Transition piece} \\
\end{array}
$$

**The membrane theory is valid when $t / r < 0 . 1$ , and the validity is the reason the membrane theory is the most widely used theory in pressure vessel design. The engineer who uses the membrane theory for a thick shell is not analysing the shell; they are analysing a membrane.**
:::

::: definition The shear flow {#def-shear-flow}
The **shear flow** is the shear force per unit length in a thin-walled section, and the shear flow is the reason the engineer can calculate the shear stress distribution in the beam.

$$
q \; = \; \tau \, t \; = \; { \frac { V \, Q } { I } }
$$

where $Q = \int y \, d A$ is the first moment of area and $I$ is the second moment of area.

For a **symmetric I-beam**:

$$
q _ { \text{web } } \; = \; { \frac { V } { I } } \, \left[ b \, t _ { f } \, ( d - t _ { f } ) / 2 + t _ { w } \, ( y ^ { 2 } - d _ { 1 } ^ { 2 } ) / 2 \right]
$$

For a **circular tube**:

$$
q _ { \max } \; = \; { \frac { 2 \, V } { \pi \, r \, t } } \quad \text{(at the neutral axis)}
$$

**The shear flow is the reason the engineer can calculate the shear stress distribution in the beam, and the distribution is the reason the engineer can design the beam. The engineer who calculates the shear flow without checking the first moment of area is not calculating the shear flow; they are guessing.**
:::

::: widget plot
title: The shear flow distribution in an I-beam
f: 1-x^2; 1-x^2*0.3
x: -1,1
y: 0,1.2
labels: Web shear flow; Flange shear flow
caption: The shear flow distribution in an I-beam. **The shear flow is maximum at the neutral axis and zero at the top and bottom, and the maximum is the reason the web carries the shear force.** **The flange shear flow is much smaller than the web shear flow, and the smallness is the reason the flange carries the bending moment, not the shear force.**
:::

::: example Pressure vessel design {#ex-pressure-vessel level=3 check="2"}
A cylindrical pressure vessel has $r = 5 0 0$ mm, $t = 1 0$ mm, and $p = 2$ MPa. Calculate the hoop stress, the longitudinal stress, and the maximum shear stress.

**Hoop stress:**

$$
\sigma _ { \theta } \; = \; { \frac { p \, r } { t } } \; = \; { \frac { 2 \times 5 0 0 } { 1 0 } } \; = \; { \bf 1 0 0 } \ \text{MPa}
$$

**Longitudinal stress:**

$$
\sigma _ { z } \; = \; { \frac { p \, r } { 2 \, t } } \; = \; { \frac { 2 \times 5 0 0 } { 2 \times 1 0 } } \; = \; { \bf 5 0 } \ \text{MPa}
$$

**Maximum shear stress:**

$$
\tau _ { \max } \; = \; { \frac { \sigma _ { \theta } - \sigma _ { z } } { 2 } } \; = \; { \frac { 1 0 0 - 5 0 } { 2 } } \; = \; { \bf 2 5 } \ \text{MPa}
$$

**The hoop stress is 100 MPa, the longitudinal stress is 50 MPa, and the maximum shear stress is 25 MPa. The engineer would design the vessel for the hoop stress, because the hoop stress is the largest stress, and the hoop stress is the reason the vessel fails by longitudinal splitting.**
:::

## 2. Torsion of thin-walled sections

::: definition The Bredt formula {#def-bredt}
The **Bredt formula** gives the shear stress in a thin-walled closed section under torsion, and the Bredt formula is the reason the engineer can calculate the torsional strength of the aircraft wing.

For a **thin-walled closed section**:

$$
\tau \; = \; { \frac { T } { 2 \, A _ { m } \, t } } \qquad \theta \; = \; { \frac { T \, L } { 4 \, A _ { m } ^ { 2 } \, G } } \, \oint { \frac { d s } { t } }
$$

where $A _ { m }$ is the area enclosed by the median line.

For a **thin-walled circular tube**:

$$
\tau \; = \; { \frac { T } { 2 \, \pi \, r ^ { 2 } \, t } } \; = \; { \frac { T } { J } } \, r \quad \text{(matches exact solution for } t \ll r \text{)}
$$

For a **thin-walled open section** (e.g. I-beam, channel):

$$
\tau _ { \max } \; = \; { \frac { T \, t } { J _ { \text{open } } } } \qquad J _ { \text{open } } \; = \; { \frac { 1 } { 3 } } \, \sum b _ { i } \, t _ { i } ^ { 3 }
$$

$$
\begin{array} { l c c }
\textbf{Section type} & \textbf{ } J _ { \text{closed } } / J _ { \text{open } } & \textbf{Use case} \\ \hline
\text{Circular tube} & 2 \, \pi ^ { 2 } \, ( r / t ) ^ { 2 } \approx 1 0 0 \text{--} 1 0 0 0 & \text{Aircraft wing} \\
\text{Square tube} & 1 2 \, ( b / t ) ^ { 2 } \approx 5 0 \text{--} 5 0 0 & \text{Spaceframe} \\
\text{I-beam (open)} & 1 \text{ (reference)} & \text{Building frame} \\
\text{Channel (open)} & 1 \text{ (reference)} & \text{Purlin} \\
\end{array}
$$

**The closed section is 50-1000 times stiffer than the open section in torsion, and the stiffness is the reason the closed section is the most widely used section in the aircraft wing. The engineer who calculates the torsion of the thin-walled section without checking the warping is not calculating the torsion; they are calculating the Saint-Venant torsion.**
:::

::: definition The shear centre {#def-shear-centre}
The **shear centre** is the point through which the load must pass to avoid torsion, and the shear centre is the reason the engineer can design the aircraft wing without twisting.

For a **channel section**:

$$
e \; = \; { \frac { b ^ { 2 } \, d ^ { 2 } \, t } { 4 \, I _ { x } } } \quad \text{(distance from the web centreline)}
$$

For a **equal-leg angle**: the shear centre is at the **intersection of the legs**.

For a **symmetric section** (I-beam, rectangle): the shear centre is at the **intersection of the axes of symmetry**.

$$
\begin{array} { l c l }
\textbf{Section type} & \textbf{Shear centre location} & \textbf{Use case} \\ \hline
\text{I-beam} & \text{Intersection of axes} & \text{Building frame} \\
\text{Channel} & \text{Outside the web} & \text{Purlin} \\
\text{Angle} & \text{Intersection of legs} & \text{Truss member} \\
\text{T-section} & \text{Intersection of axes} & \text{Stiffener} \\
\text{Circular tube} & \text{Centre} & \text{Aircraft wing} \\
\end{array}
$$

**The shear centre is the reason the load must pass through the shear centre to avoid torsion, and the torsion is the reason the thin-walled beam is the most critical component in the aircraft wing. The engineer who designs the thin-walled beam without checking the shear centre is not designing the beam; they are designing a beam that will twist.**
:::

::: widget plot
title: The torsional stiffness of closed vs open sections
f: 100/x^2; 1
x: 5,50
y: 0,500
labels: Closed section; Open section
caption: The torsional stiffness of closed vs open sections against the thickness-to-radius ratio. **The closed section is 50-1000 times stiffer than the open section in torsion, and the stiffness is the reason the closed section is the most widely used section in the aircraft wing.** **The stiffness is proportional to the square of the radius-to-thickness ratio, and the square is the reason the thin-walled closed section is the most efficient section in torsion.**
:::

::: example Torsion of a thin-walled circular tube {#ex-tube-torsion level=3 check="2"}
A thin-walled circular tube has $r = 5 0$ mm, $t = 2$ mm, and $G = 8 0$ GPa. Calculate the torsional stiffness per unit length and the maximum shear stress for $T = 1 0 0$ N·m.

**Bredt formula (shear stress):**

$$
\tau \; = \; { \frac { T } { 2 \, \pi \, r ^ { 2 } \, t } } \; = \; { \frac { 1 0 0 } { 2 \, \pi \times 5 0 ^ { 2 } \times 2 } } \; = \; { \frac { 1 0 0 } { 3 1 \ 4 1 6 } } \; = \; { \bf 3 . 1 8 } \ \text{MPa}
$$

**Torsional stiffness per unit length:**

$$
{ \frac { T } { \theta / L } } \; = \; 4 \, A _ { m } ^ { 2 } \, G \, / \, \oint { \frac { d s } { t } } \; = \; { \frac { 4 \, ( \pi \, r ^ { 2 } ) ^ { 2 } \, G } { 2 \, \pi \, r / t } } \; = \; 2 \, \pi \, r ^ { 3 } \, t \, G
$$

$$
{ \frac { T } { \theta / L } } \; = \; 2 \, \pi \times 5 0 ^ { 3 } \times 2 \times 8 0 \ 0 0 0 \; = \; { \bf 2 . 5 1 } \times 1 0 ^ { 9 } \ \text{N} { \cdot } \text{mm} ^ { 2 }
$$

**The maximum shear stress is 3.18 MPa, and the torsional stiffness is $2 . 5 1 \times 1 0 ^ { 9 }$ N·mm². The engineer would use the Bredt formula to calculate the torsional strength of the aircraft wing, and the strength is the reason the aircraft wing is safe.**
:::

::: example Shear flow in a circular tube {#ex-tube-shear level=3 check="2"}
A thin-walled circular tube has $r = 6 0$ mm, $t = 3$ mm, and carries a shear force $V = 5 0$ kN. Calculate the maximum shear stress.

**Second moment of area:**

$$
I \\; = \\; \\pi \\, r ^ { 3 } \\, t \\; = \\; \\pi \\times 6 0 ^ { 3 } \\times 3 \\; = \\; 1 . 0 1 8 \\times 1 0 ^ { 6 } \\ \\text{mm} ^ { 4 }
$$

**Maximum shear flow (at the neutral axis):**

$$
q _ { \\max } \\; = \\; { \\frac { 2 \\, V } { \\pi \\, r } } \\; = \\; { \\frac { 2 \\times 5 0 \\ 0 0 0 } { \\pi \\times 6 0 } } \\; = \\; { \\bf 5 3 0 } \\ \\text{N/mm}
$$

**Maximum shear stress:**

$$
\\tau _ { \\max } \\; = \\; { \\frac { q _ { \\max } } { t } } \\; = \\; { \\frac { 5 3 0 } { 3 } } \\; = \\; { \\bf 1 7 7 } \\ \\text{MPa}
$$

**The maximum shear stress is 177 MPa. The engineer would use the shear flow to calculate the shear stress distribution in the tube, and the distribution is the reason the engineer can design the tube.**
:::

::: example Torsion of an I-beam (open section) {#ex-ibeam-torsion level=3 check="2"}
An I-beam has $b = 1 5 0$ mm, $d = 3 0 0$ mm, $t _ { f } = 1 2$ mm, $t _ { w } = 8$ mm, and $G = 8 0$ GPa. Calculate the maximum shear stress and the torsional stiffness per unit length for $T = 5 0 0$ N\\.m.

**Torsion constant (open section):**

$$
J _ { \\text{open } } \\; = \\; { \\frac { 1 } { 3 } } \\, [ 2 \\, b \\, t _ { f } ^ { 3 } + ( d - 2 \\, t _ { f } ) \\, t _ { w } ^ { 3 } ] \\; = \\; { \\frac { 1 } { 3 } } \\, [ 2 \\times 1 5 0 \\times 1 2 ^ { 3 } + 2 7 6 \\times 8 ^ { 3 } ]
$$

$$
J _ { \\text{open } } \\; = \\; { \\frac { 1 } { 3 } } \\, [ 5 1 8 \\ 4 0 0 + 1 4 1 \\ 3 1 2 ] \\; = \\; { \\frac { 6 5 9 \\ 7 1 2 } { 3 } } \\; = \\; 2 1 9 \\ 9 0 4 \\ \\text{mm} ^ { 4 }
$$

**Maximum shear stress:**

$$
\\tau _ { \\max } \\; = \\; { \\frac { T \\, t _ { \\max } } { J _ { \\text{open } } } } \\; = \\; { \\frac { 5 0 0 \\ 0 0 0 \\times 1 2 } { 2 1 9 \\ 9 0 4 } } \\; = \\; { \\bf 2 7 . 3 } \\ \\text{MPa}
$$

**Torsional stiffness per unit length:**

$$
{ \\frac { T } { \\theta / L } } \\; = \\; G \\, J _ { \\text{open } } \\; = \\; 8 0 \\ 0 0 0 \\times 2 1 9 \\ 9 0 4 \\; = \\; { \\bf 1 7 . 6 } \\times 1 0 ^ { 6 } \\ \\text{N} { \\cdot } \\text{mm} ^ { 2 }
$$

**The maximum shear stress is 27.3 MPa, and the torsional stiffness is $1 7 . 6 \\times 1 0 ^ { 6 }$ N\\.mm\\.2. The engineer would compare this with the closed section stiffness and find that the closed section is 100 times stiffer, and the stiffness is the reason the closed section is the most widely used section in the aircraft wing.**
:::

::: exercise Discontinuity stress {#ex-discontinuity level=3 check="2"}
A cylindrical pressure vessel ($r = 5 0 0$ mm, $t = 1 0$ mm) is joined to a flat end cap. Calculate the discontinuity stress at the junction if the membrane hoop stress is 100 MPa. (Use the discontinuity factor of 2.5.)

::: solution
**Discontinuity stress:**

$$
\\sigma _ { \\text{discontinuity } } \\; = \\; 2 . 5 \\times \\sigma _ { \\theta } \\; = \\; 2 . 5 \\times 1 0 0 \\; = \\; { \\bf 2 5 0 } \\ \\text{MPa}
$$

**The discontinuity stress is 250 MPa. The engineer would use a dished end (torispherical or ellipsoidal) to reduce the discontinuity stress, and the reduction is the reason the dished end is the most widely used end cap in pressure vessel design.**
:::
:::

## Exercises

::: exercise Pressure vessel stress {#ex-pv-ex level=3 check="2"}
A spherical pressure vessel has $r = 1$ m, $t = 5$ mm, and $p = 1 . 5$ MPa. Calculate the membrane stress.

::: solution
$$
\sigma \; = \; { \frac { p \, r } { 2 \, t } } \; = \; { \frac { 1 . 5 \times 1 0 0 0 } { 2 \times 5 } } \; = \; { \bf 1 5 0 } \ \text{MPa}
$$

**The membrane stress is 150 MPa.**
:::
:::

::: exercise Shear flow in an I-beam {#ex-shear-flow-ex level=3 check="2"}
An I-beam has $b = 1 5 0$ mm, $d = 3 0 0$ mm, $t _ { f } = 1 2$ mm, $t _ { w } = 8$ mm, and $V = 1 0 0$ kN. Calculate the maximum shear stress in the web.

::: solution
**Second moment of area:**

$$
I \; = \; { \frac { b \, d ^ { 3 } } { 1 2 } } - { \frac { ( b - t _ { w } ) \, ( d - 2 \, t _ { f } ) ^ { 3 } } { 1 2 } } \; = \; { \frac { 1 5 0 \times 3 0 0 ^ { 3 } } { 1 2 } } - { \frac { 1 4 2 \times 2 7 6 ^ { 3 } } { 1 2 } }
$$

$$
I \; = \; 3 3 7 . 5 \times 1 0 ^ { 6 } - 2 4 8 . 5 \times 1 0 ^ { 6 } \; = \; 8 9 \times 1 0 ^ { 6 } \ \text{mm} ^ { 4 }
$$

**First moment of area (above the neutral axis):**

$$
Q \; = \; b \, t _ { f } \, ( d - t _ { f } ) / 2 + t _ { w } \, ( d / 2 - t _ { f } ) ^ { 2 } / 2
$$

$$
Q \; = \; 1 5 0 \times 1 2 \times 1 4 4 + 8 \times 1 3 8 ^ { 2 } / 2 \; = \; 2 5 9 \ 2 0 0 + 7 6 \ 1 7 6 \; = \; 3 3 5 \ 3 7 6 \ \text{mm} ^ { 3 }
$$

**Maximum shear stress:**

$$
\tau _ { \max } \; = \; { \frac { V \, Q } { I \, t _ { w } } } \; = \; { \frac { 1 0 0 \ 0 0 0 \times 3 3 5 \ 3 7 6 } { 8 9 \times 1 0 ^ { 6 } \times 8 } } \; = \; { \bf 4 7 . 1 } \ \text{MPa}
$$

**The maximum shear stress is 47.1 MPa.**
:::
:::

::: exercise Torsion of a square tube {#ex-square-tube level=3 check="2"}
A thin-walled square tube has $b = 1 0 0$ mm, $t = 3$ mm, and $G = 7 0$ GPa. Calculate the torsional stiffness per unit length.

::: solution
**Bredt formula:**

$$
{ \frac { T } { \theta / L } } \; = \; { \frac { 4 \, A _ { m } ^ { 2 } \, G } { \oint d s / t } } \; = \; { \frac { 4 \, b ^ { 4 } \, G } { 4 \, b / t } } \; = \; b ^ { 3 } \, t \, G
$$

$$
{ \frac { T } { \theta / L } } \; = \; 1 0 0 ^ { 3 } \times 3 \times 7 0 \ 0 0 0 \; = \; { \bf 2 . 1 } \times 1 0 ^ { 9 } \ \text{N} { \cdot } \text{mm} ^ { 2 }
$$

**The torsional stiffness is $2 . 1 \times 1 0 ^ { 9 }$ N·mm².**
:::
:::

::: exercise Shear centre of a channel {#ex-shear-centre-ex level=3 check="2"}
A channel section has $b = 1 0 0$ mm, $d = 2 0 0$ mm, $t = 8$ mm. Calculate the shear centre location.

::: solution
**Second moment of area:**

$$
I _ { x } \; = \; { \frac { t \, d ^ { 3 } } { 1 2 } } + 2 \, b \, t \, ( d / 2 ) ^ { 2 } \; = \; { \frac { 8 \times 2 0 0 ^ { 3 } } { 1 2 } } + 2 \times 1 0 0 \times 8 \times 1 0 0 ^ { 2 }
$$

$$
I _ { x } \; = \; 5 . 3 3 \times 1 0 ^ { 6 } + 1 6 \times 1 0 ^ { 6 } \; = \; 2 1 . 3 3 \times 1 0 ^ { 6 } \ \text{mm} ^ { 4 }
$$

**Shear centre:**

$$
e \; = \; { \frac { b ^ { 2 } \, d ^ { 2 } \, t } { 4 \, I _ { x } } } \; = \; { \frac { 1 0 0 ^ { 2 } \times 2 0 0 ^ { 2 } \times 8 } { 4 \times 2 1 . 3 3 \times 1 0 ^ { 6 } } } \; = \; { \frac { 3 2 \times 1 0 ^ { 8 } } { 8 5 . 3 \times 1 0 ^ { 6 } } } \; = \; { \bf 3 7 . 5 } \ \text{mm}
$$

**The shear centre is 37.5 mm outside the web. The engineer would design the load path to pass through the shear centre to avoid torsion, and the avoidance is the reason the channel is used as a beam, not as a column.**
:::
:::

::: exercise Derivation: the membrane equations {#ex-derive-membrane level=4 check="2"}
Show that the membrane equations $\sigma _ { 1 } = p \, r _ { 1 } / t$ and $\sigma _ { 2 } = p \, r _ { 2 } / t$ are derived from the force balance on a differential shell element.

::: solution
Consider a differential shell element with principal radii of curvature $r _ { 1 }$ and $r _ { 2 }$ . The forces in the normal direction are:

$$
p \, r _ { 1 } \, d \theta _ { 1 } \, r _ { 2 } \, d \theta _ { 2 } \; = \; \sigma _ { 1 } \, t \, r _ { 2 } \, d \theta _ { 2 } \, d \theta _ { 1 } + \sigma _ { 2 } \, t \, r _ { 1 } \, d \theta _ { 1 } \, d \theta _ { 2 }
$$

Simplifying:

$$
p \; = \; { \frac { \sigma _ { 1 } \, t } { r _ { 1 } } } + { \frac { \sigma _ { 2 } \, t } { r _ { 2 } } }
$$

For a cylindrical shell: $r _ { 1 } = r$ , $r _ { 2 } = \infty$ :

$$
\sigma _ { \theta } \; = \; { \frac { p \, r } { t } } \qquad \sigma _ { z } \; = \; { \frac { p \, r } { 2 \, t } }
$$

For a spherical shell: $r _ { 1 } = r _ { 2 } = r$ :

$$
\sigma _ { \theta } \; = \; \sigma _ { z } \; = \; { \frac { p \, r } { 2 \, t } }
$$

**The membrane equations are the reason the engineer can calculate the stress in the pressure vessel in one line, and the one line is the reason the engineer is confident in the answer.** $\blacksquare$
:::
:::

::: exercise Derivation: the Bredt formula {#ex-derive-bredt level=4 check="2"}
Show that the Bredt formula $\tau = T / ( 2 \, A _ { m } \, t )$ is derived from the equilibrium of a differential element of a thin-walled closed section.

::: solution
Consider a thin-walled closed section with shear flow $q = \tau \, t$ . The torque is:

$$
T \; = \; \oint q \, r \, d s
$$

where $r$ is the perpendicular distance from the centre to the wall. Since $q$ is constant around the section:

$$
T \; = \; q \, \oint r \, d s
$$

The integral $\oint r \, d s = 2 \, A _ { m }$ (by Green's theorem), so:

$$
T \; = \; q \times 2 \, A _ { m } \quad \Longrightarrow \quad q \; = \; { \frac { T } { 2 \, A _ { m } } }
$$

Since $q = \tau \, t$ :

$$
\tau \; = \; { \frac { T } { 2 \, A _ { m } \, t } }
$$

**The Bredt formula is the reason the engineer can calculate the torsional strength of the aircraft wing, and the strength is the reason the aircraft wing is safe.** $\blacksquare$
:::
:::

::: exercise Membrane stress in a conical shell {#ex-cone-membrane level=3 check="2"}
A conical shell has a half-angle $\\alpha = 3 0 ^ { \\circ }$ , a radius $r = 3 0 0$ mm at the section of interest, a thickness $t = 6$ mm, and an internal pressure $p = 1 . 5$ MPa. Calculate the hoop and meridional stresses.

::: solution
**Hoop stress:**

$$
\\sigma _ { \\theta } \\; = \\; { \\frac { p \\, r } { t \\, \\cos \\alpha } } \\; = \\; { \\frac { 1 . 5 \\times 3 0 0 } { 6 \\times \\cos 3 0 ^ { \\circ } } } \\; = \\; { \\frac { 4 5 0 } { 6 \\times 0 . 8 6 6 } } \\; = \\; { \\bf 8 6 . 6 } \\ \\text{MPa}
$$

**Meridional stress:**

$$
\\sigma _ { z } \\; = \\; { \\frac { p \\, r } { 2 \\, t \\, \\cos \\alpha } } \\; = \\; { \\frac { 8 6 . 6 } { 2 } } \\; = \\; { \\bf 4 3 . 3 } \\ \\text{MPa}
$$

**The hoop stress is 86.6 MPa and the meridional stress is 43.3 MPa. The engineer would design the conical shell for the hoop stress, because the hoop stress is the largest stress, and the hoop stress is the reason the conical shell fails by circumferential splitting.**
:::
:::

::: quiz Membrane theory {#quiz-membrane}
The membrane theory is valid when:

- [ ] $t / r > 0 . 5$
- [x] $t / r < 0 . 1$
- [ ] $t / r = 1$
- [ ] $t / r > 0 . 1$

::: solution
**$t / r < 0 . 1$ .** The membrane theory is valid when the wall is thin, and the validity is the reason the membrane theory is the most widely used theory in pressure vessel design. The engineer who uses the membrane theory for a thick shell is not analysing the shell; they are analysing a membrane.
:::
:::

::: quiz Shear centre {#quiz-shear-centre}
The shear centre is the point through which the load must pass to avoid:

- [ ] Bending
- [ ] Shear
- [x] Torsion
- [ ] Buckling

::: solution
**Torsion.** The shear centre is the reason the load must pass through the shear centre to avoid torsion, and the torsion is the reason the thin-walled beam is the most critical component in the aircraft wing. The engineer who designs the thin-walled beam without checking the shear centre is not designing the beam; they are designing a beam that will twist.
:::
:::

## Where this lesson leads

- **[[solid-mechanics/plates]]** — The membrane theory is extended to plate bending.
- **[[solid-mechanics/plasticity]]** — The limit analysis of the thin-walled structure is the foundation of crashworthiness.
- **[[solid-mechanics/fracture-mechanics]]** — The crack in the thin-walled structure is the reason the aircraft fuselage is designed for damage tolerance.
- **[[solid-mechanics/composites]]** — The thin-walled composite structure is the reason the aircraft wing is lightweight.
- **[[solid-mechanics/plates]]** — The thin-walled structure is the reason the aircraft is lightweight.
- **[[machine-design/shafts]]** — The thin-walled shaft is the reason the driveshaft is lightweight.
- **[[machine-design/fasteners-joints]]** — The thin-walled joint is the reason the bolted joint is lightweight.
- **[[energy-systems/steam-power-plants]]** — The pressure vessel is the reason the boiler is safe.
- **[[propulsion/rocket-engines]]** — The thin-walled combustion chamber is the reason the rocket engine is lightweight.
- **[[solid-mechanics/thick-cylinders-discs]]** — The thick cylinder theory is the limit of the thin-wall theory when $t / r > 0 . 1$ .

::: history Thin-walled structures: from Navier to the aircraft {#history-thin-walled}
**1820** — **Claude-Louis Navier** publishes the **first shell theory**, which is the foundation of the thin-walled structure theory. **Navier's shell theory is the reason the engineer can calculate the stress in the pressure vessel, and the calculation is the reason the pressure vessel is safe.**

**1850** — **Augustus W. Crelle** publishes the **shear flow formula**, which is the foundation of the thin-walled beam theory. **The shear flow formula is the reason the engineer can calculate the shear stress distribution in the beam, and the distribution is the reason the engineer can design the beam.**

**1856** — **Alfred Bredt** publishes the **Bredt formula**, which gives the shear stress in a thin-walled closed section under torsion. **The Bredt formula is the reason the engineer can calculate the torsional strength of the aircraft wing, and the strength is the reason the aircraft wing is safe.**

**1905** — **The shear centre concept** is introduced by **André Chollart**, who calculates the shear centre location for the channel section. **The shear centre concept is the reason the engineer can design the aircraft wing without twisting, and the avoidance is the reason the aircraft wing is the most critical component in the aircraft.**

**1911** — **The membrane theory** is applied to the **pressure vessel design** by **C. Bach**, who calculates the stress in the cylindrical and spherical shells. **The Bach membrane theory is the reason the pressure vessel is the most widely used structure in engineering, and the safety is the reason the pressure vessel is the most refined application of the thin-walled structure theory.**

**1930s** — **The thin-walled structure theory** is applied to the **aircraft design** by **Richard Southwell**, who calculates the buckling load of the thin-walled panel. **The Southwell buckling theory is the reason the aircraft is designed for the buckling load, not the yield load, and the buckling load is the reason the aircraft is the most critical component in the aircraft.**

**1940s** — **The stress wave propagation** in the thin-walled structure is studied by **G.I. Taylor**, who calculates the stress wave speed in the thin-walled tube. **The Taylor stress wave theory is the reason the crashworthiness of the thin-walled structure is the most important consideration in the aircraft design, and the crashworthiness is the reason the thin-walled structure is the most refined application of the thin-walled structure theory.**

**1960s** — **The finite element method** is applied to the thin-walled structure, which makes the numerical solution of the boundary-value problem practical. **The finite element method is the reason the engineer can solve the thin-walled structure problem for complex geometries, and the solution is the reason the thin-walled structure is the most refined application of the thin-walled structure theory.**
:::

::: summary Thin-walled structures {#summary-thin-walled}
- **The membrane stress state is the stress state in a thin shell where the bending stresses are negligible: $\sigma _ { \theta } = p \, r / t$ and $\sigma _ { z } = p \, r / ( 2 \, t )$ for a cylinder.** The membrane theory is valid when $t / r < 0 . 1$ , and the validity is the reason the membrane theory is the most widely used theory in pressure vessel design.
- **The shear flow is the shear force per unit length in a thin-walled section: $q = \tau \, t = V \, Q / I$ .** The shear flow is the reason the engineer can calculate the shear stress distribution in the beam, and the distribution is the reason the engineer can design the beam.
- **The Bredt formula gives the shear stress in a thin-walled closed section under torsion: $\tau = T / ( 2 \, A _ { m } \, t )$ .** The closed section is 50-1000 times stiffer than the open section in torsion, and the stiffness is the reason the closed section is the most widely used section in the aircraft wing.
- **The shear centre is the point through which the load must pass to avoid torsion.** The shear centre is the reason the engineer can design the aircraft wing without twisting, and the avoidance is the reason the aircraft wing is the most critical component in the aircraft.
- **The discontinuity stress at the junction of the cylinder and the flat end cap is 2.5 times the membrane stress.** The engineer would use a dished end to reduce the discontinuity stress, and the reduction is the reason the dished end is the most widely used end cap in pressure vessel design.
- **The thin-walled structure is the most efficient structure, because the thin-walled structure carries the load with the minimum weight.** The efficiency is the reason the thin-walled structure is the most widely used structure in the aircraft, the rocket, and the pressure vessel.
- **The buckling is the reason the thin-walled structure is designed for the buckling load, not the yield load.** The buckling load is the reason the thin-walled structure is the most critical component in the aircraft.
- **The stiffener is the reason the buckling load is increased by 4-16 times.** The stiffener is the most widely used feature in the aircraft fuselage.
- **The thin-walled structure theory is the most important theory in aerospace engineering, because the thin-walled structure theory predicts the stress distribution in the wall.** The prediction is the reason the structure is safe.
- **The finite element method is applied to the thin-walled structure, which makes the numerical solution of the boundary-value problem practical.** The finite element method is the reason the engineer can solve the thin-walled structure problem for complex geometries.
:::

## Further reading

- **Stephen P. Timoshenko and S. Woinowsky-Krieger (1959)** — *Theory of Plates and Shells*, 2nd ed. McGraw-Hill. The membrane theory, the shear flow, and the Bredt formula.
- **Stephen P. Timoshenko and James N. Goodier (1970)** — *Theory of Elasticity*, 3rd ed. McGraw-Hill. The thin-walled structure theory in the elasticity context.
- **Morris Dolph (1977)** — *Mechanics of Materials*. Wiley. The shear flow and the thin-walled beam theory.
- **Megson, T.H.G. (2019)** — *Aircraft Structures for Engineering Students*, 6th ed. Butterworth-Heinemann. The thin-walled structure theory in the aircraft context.
- **O.C. Zienkiewicz and R.L. Taylor (2005)** — *The Finite Element Method*, 6th ed. Butterworth-Heinemann. The thin-walled structure theory in the finite element context.
- **L.E. Malvern (1969)** — *Introduction to the Mechanics of a Continuous Medium*. Prentice-Hall. The membrane theory and the shell theory.
- **SC Mal and G. Singh (1991)** — *Continuum Mechanics of Composite Materials*. Kluwer. The thin-walled composite structure.
- **Thomas J.R. Hughes (2012)** — *The Finite Element Method: Linear Static and Dynamic Finite Element Analysis*. Dover. The thin-walled structure theory in the finite element context.
