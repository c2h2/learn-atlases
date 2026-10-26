Before you can draw a shear-force diagram you must know where a distributed load pushes. Before you can check a retaining wall you must know how hard the water pushes and at what height. Before you can find a second moment of area you must know where the centroid is. The centroid is the single most-used point in mechanics after the centre of mass, and it is a purely geometric idea: the area-weighted average position of a region.

The subject repays care because it is where statics hands over to the design of real structures. A load that varies along a beam is not a nuisance to be replaced by an equivalent point load; it is the actual physics, and the equivalent load is a bookkeeping device that is valid for reactions and invalid for internal shear. A pressure that varies with depth is not averaged naively. And the centroid of a built-up steel section is the reference from which every subsequent property is measured, so an error of a millimetre there propagates into every stress in the member.

::: warning The centroid is not the centre of gravity unless the material is uniform
The centre of mass is the mass-weighted average position; the centroid is the *area* (or volume, or length) weighted average. They coincide when the density is uniform, and they do not when it is not — a concrete beam with steel reinforcement, a composite wing, a soil profile with a water table. The **centre of gravity** is the point through which the resultant weight acts — the average position weighted by the local weight $g\, \mathrm{d}m$ — and it differs from the centre of mass only where $g$ varies appreciably across the body, which for engineering bodies is never. In practice: use "centre of mass" when mass matters (dynamics), "centroid" when only geometry matters (section properties), and stop worrying about the distinction that only matters for satellites.
:::

## Centroids

::: definition Centroid of an area, a line and a volume {#def-centroid}
The centroid $(\bar{x}, \bar{y}, \bar{z})$ of a region is its first-moment-weighted mean position. For an area $A$ in the $x y$ plane,
$$
\bar{x} = \frac{1}{A} \int_A x\, \mathrm{d} A = \frac{Q_y}{A}, \qquad
\bar{y} = \frac{1}{A} \int_A y\, \mathrm{d} A = \frac{Q_x}{A},
$$
where $Q_x$ and $Q_y$ are the **first moments of area**. Analogous definitions hold for a line (replace $\mathrm{d} A$ by $\mathrm{d} L$) and a volume (by $\mathrm{d} V$). If a region has an axis of symmetry, the centroid lies on it.
:::

::: proposition Composite areas {#prop-composite}
For a region made of $n$ simple parts, with part $i$ of area $A_i$ and centroid $(x_i, y_i)$, and with holes given negative area,
$$
\bar{x} = \frac{\sum A_i x_i}{\sum A_i}, \qquad
\bar{y} = \frac{\sum A_i y_i}{\sum A_i} .
$$
The parts need not touch, need not be convex, and may overlap provided the overlapping area is subtracted once.
:::

::: proof
The first moment of a union of disjoint regions is the sum of their first moments, because integration is additive over the domain:
$$
\int_{A_1 \cup A_2} x\, \mathrm{d} A = \int_{A_1} x\, \mathrm{d} A + \int_{A_2} x\, \mathrm{d} A .
$$
For each simple part the integral is $A_i x_i$ by the definition of that part's own centroid. A hole is the set difference $A \setminus H$, whose first moment is $A x_A - H x_H$, which is the same as assigning the hole an area $-H$. Dividing the summed first moment by the summed area gives the result. The additivity is what makes the method work for any decomposition, including decompositions in which the parts overlap and the overlaps are subtracted — a trick that turns an awkward shape into three rectangles and a circle.
:::

::: algorithm Finding a centroid {#alg-centroid}
1. **Choose a datum** and draw the shape to scale. A datum on a symmetry axis or on an outer edge keeps every coordinate the same sign.
2. **Decompose** into rectangles, triangles, circles and quarter-circles whose centroids you know. Assign holes negative area.
3. **Tabulate** $A_i$, $x_i$, $y_i$ and the products $A_i x_i$, $A_i y_i$. Do the arithmetic in a table, never in your head.
4. **Sum** and divide.
5. **Check** that the answer lies inside the shape if the shape is convex, and on the correct side of the datum. A centroid outside a concave shape is legitimate — for a C-section, an I-beam's flange tip or a crescent it is normal — but a centroid on the wrong side of a symmetry axis is an arithmetic error.
:::

::: example T-section {#ex-tee}
A T-section has a flange $150\ \mathrm{mm}$ wide by $20\ \mathrm{mm}$ deep and a web $20\ \mathrm{mm}$ thick by $180\ \mathrm{mm}$ deep below the flange. Find the centroid.
::: solution
Take the datum at the top of the flange, with $y$ measured downwards. The section is symmetric about the vertical centreline, so $\bar{x}$ is on it and only $\bar{y}$ is needed.

| Part | $A\ (\mathrm{mm^{2}})$ | $y\ (\mathrm{mm})$ | $A y\ (\mathrm{mm^{3}})$ |
|---|---|---|---|
| Flange $150 \times 20$ | 3000 | 10 | 30 000 |
| Web $20 \times 180$ | 3600 | 110 | 396 000 |
| **Total** | **6600** | | **426 000** |

$$
\bar{y} = \frac{426\,000}{6600} = 64.5\ \mathrm{mm}\ \text{below the top of the flange}.
$$
*Check.* The centroid must lie between the two part centroids, $10 \le 64.5 \le 110$, and it does. It lies $64.5\ \mathrm{mm}$ from the top and $135.5\ \mathrm{mm}$ from the bottom, so it is closer to the flange than to the bottom of the web — as it must be, since the flange is the wider element.

*Sanity.* The flange is $45$ per cent of the area but contributes only $7$ per cent of the first moment about the datum, because it sits close to the datum. This is the whole reason I-beams put their material far from the middle: the first moment, and hence the second moment of the next chapter, is dominated by distance, not by area.
:::
:::

::: example Plate with a hole {#ex-plate-hole}
A rectangular plate $120\ \mathrm{mm}$ wide by $200\ \mathrm{mm}$ deep has a circular hole of $40\ \mathrm{mm}$ diameter whose centre is $40\ \mathrm{mm}$ below the top edge. Find the centroid.
::: solution
Datum at the bottom edge, $y$ upwards. The plate is symmetric about its vertical centreline.

| Part | $A\ (\mathrm{mm^{2}})$ | $y\ (\mathrm{mm})$ | $A y\ (\mathrm{mm^{3}})$ |
|---|---|---|---|
| Plate $120 \times 200$ | 24 000 | 100 | 2 400 000 |
| Hole $\pi \times 20^{2}$ | $-1256.6$ | 160 | $-201\,062$ |
| **Total** | **22 743** | | **2 198 938** |

$$
\bar{y} = \frac{2\,198\,938}{22\,743} = 96.7\ \mathrm{mm}\ \text{above the bottom edge}.
$$
*Check.* The hole removes material from the top, so the centroid must drop below $100\ \mathrm{mm}$; it drops by $3.3\ \mathrm{mm}$, which is $3.3$ per cent of the depth for a hole that is $5.2$ per cent of the area — the shift should be roughly the removed fraction times the distance from the hole to the centroid, $0.0523 \times 60 = 3.1\ \mathrm{mm}$. Close.

*Sanity.* That estimate is not a coincidence. For a small hole of area $a$ at distance $d$ from the centroid of the uncut area $A$, the shift is exactly $a d / (A - a) \approx a d / A$. Use it as a sanity check on every drilled section: if the computed shift is not about $a d / A$, the arithmetic is wrong.
:::
:::

::: theorem Pappus's two theorems {#thm-pappus}
Let a plane curve or plane region with centroid $G$ be revolved through an angle $\theta$ (in radians) about an axis in its plane that does not cross it, the centroid being at distance $\bar{r}$ from the axis. Then
$$
\textbf{Surface:}\quad S = \theta\, \bar{r}\, L, \qquad
\textbf{Volume:}\quad V = \theta\, \bar{r}\, A ,
$$
where $L$ is the length of the curve and $A$ the area of the region. For a full revolution, $\theta = 2 \pi$.
:::

::: proof
Parametrise the generating curve by arc length $s$, with the distance from the axis $r(s)$. An element $\mathrm{d} s$ sweeps an arc of length $\theta r(s)$, so the swept surface is
$$
S = \int \theta r(s)\, \mathrm{d} s = \theta \int r\, \mathrm{d} s = \theta \bar{r} L ,
$$
because $\int r\, \mathrm{d} s / L$ is by definition the centroidal distance $\bar{r}$ of the curve. For the volume, an element of area $\mathrm{d} A$ at distance $r$ sweeps a ring of volume $\theta r\, \mathrm{d} A$, so
$$
V = \int \theta r\, \mathrm{d} A = \theta \bar{r} A .
$$
Both results require the axis not to intersect the generator: if it does, the two sides of the axis contribute volumes of opposite sign and the theorem gives the *algebraic* difference, which is not the physical volume. The theorems also give centroids backwards — a known volume of revolution yields $\bar{r} = V / (2 \pi A)$ without any integration at all, which is the classical way the centroid of a semicircular area was found.
:::

::: example Pappus: torus and hemisphere {#ex-pappus}
Use Pappus to find (a) the volume and surface area of a torus generated by revolving a circle of radius $a = 40\ \mathrm{mm}$ whose centre is $R = 150\ \mathrm{mm}$ from the axis, and (b) the distance of the centroid of a quarter-circle of radius $b = 90\ \mathrm{mm}$ from either straight edge, using the known volume of a hemisphere.
::: solution
**(a) Torus.** The generating circle has $A = \pi a^{2}$ and $L = 2 \pi a$, both with centroid at $R$:
$$
V = 2 \pi R \times \pi a^{2} = 2 \pi^{2} R a^{2}
= 2 \pi^{2} \times 150 \times 1600 = 4.737 \times 10^{6}\ \mathrm{mm^{3}} = 4737\ \mathrm{cm^{3}},
$$
$$
S = 2 \pi R \times 2 \pi a = 4 \pi^{2} R a
= 4 \pi^{2} \times 150 \times 40 = 2.369 \times 10^{5}\ \mathrm{mm^{2}} = 2369\ \mathrm{cm^{2}} .
$$
**(b) Quarter-circle centroid.** A solid hemisphere of radius $b$ is generated by revolving a quarter-circle of area $\pi b^{2} / 4$ about one of its straight edges. Its volume is $\tfrac{2}{3} \pi b^{3}$, so Pappus gives the distance of the quarter-circle's centroid from that edge,
$$
\bar{x} = \frac{V}{2 \pi A} = \frac{\tfrac{2}{3} \pi b^{3}}{2 \pi \times \pi b^{2} / 4} = \frac{4 b}{3 \pi} = 0.4244 \, b ,
$$
and with $b = 90\ \mathrm{mm}$, $\bar{x} = 38.2\ \mathrm{mm}$ from each straight edge.

*Sanity.* The quarter-circle's centroid is $0.424 b$ from each straight edge, less than half the radius, which is right because the area fattens towards the corner. A semicircular *area* has its centroid at the same $4 r / (3 \pi) = 0.424 r$ from its diameter — it is two quarter-circles side by side — while the semicircular *arc* is at $2 r / \pi = 0.637 r$, further out because all the material is at the rim. Note that Pappus gives the centroid of the generating area, not of the solid: the solid hemisphere's own centroid is at $3 b / 8 = 0.375 b = 33.8\ \mathrm{mm}$ from its flat face, which needs an integration. Memorise $4 / (3 \pi)$ for semicircular and quarter-circular areas and $2 / \pi$ for arcs, and check every centroid against them.
:::
:::

::: example Centroid of a bent wire {#ex-wire}
A wire is bent into three straight segments forming a symmetric "hat" shape in the $x y$ plane: a horizontal base from $(0, 0)$ to $(200, 0)$, a left leg from $(0, 0)$ to $(60, 100)$ and a right leg from $(200, 0)$ to $(140, 100)$. Find the centroid of the wire.
::: solution
The shape is symmetric about $x = 100\ \mathrm{mm}$, so $\bar{x} = 100\ \mathrm{mm}$ and only $\bar{y}$ is needed. Each leg has length $\sqrt{60^{2} + 100^{2}} = 116.6\ \mathrm{mm}$ and its midpoint at $y = 50\ \mathrm{mm}$; the base has length $200\ \mathrm{mm}$ at $y = 0$.

| Part | $L\ (\mathrm{mm})$ | $y\ (\mathrm{mm})$ | $L y\ (\mathrm{mm^{2}})$ |
|---|---|---|---|
| Base | 200 | 0 | 0 |
| Left leg | 116.6 | 50 | 5830 |
| Right leg | 116.6 | 50 | 5830 |
| **Total** | **433.2** | | **11 660** |

$$
\bar{y} = \frac{11\,660}{433.2} = 26.9\ \mathrm{mm}.
$$
*Check.* The centroid must lie between $0$ and $50\ \mathrm{mm}$, and it is at a little over half the height of the legs' midpoints, because the base — half the total length — sits at $y = 0$ and pulls it down.

*Sanity.* A wire frame's centroid is found from lengths, not areas, and using the wrong measure is a real error: the trapezoidal plate enclosed by the wire has its centroid at $42.9\ \mathrm{mm}$, not $26.9\ \mathrm{mm}$. The rule is that a **line** centroid weights by $\mathrm{d} L$, an **area** centroid by $\mathrm{d} A$ and a **volume** centroid by $\mathrm{d} V$; a wireframe model of a space truss uses the line centroid, and a sheet-metal bracket uses the area centroid, and the two differ by centimetres on a real component.
:::
:::

## Distributed loads

::: definition Line load, pressure and their resultants {#def-distload}
A load spread along a line is a **line load** or load intensity $w(x)$ in $\mathrm{N / m}$; a load spread over an area is a **pressure** $p$ in $\mathrm{N / m^{2}}$. The resultant of a line load over a span $L$ is the area under the load diagram, and its line of action passes through the centroid of that area:
$$
R = \int_0^L w(x)\, \mathrm{d} x, \qquad
\bar{x} = \frac{\int_0^L x\, w(x)\, \mathrm{d} x}{\int_0^L w(x)\, \mathrm{d} x} .
$$
For a pressure over an area $A$, $R = \int_A p\, \mathrm{d} A$ and the point of application is the centroid of the pressure distribution.
:::

::: proposition Standard load resultants {#prop-loadresultants}
A uniform load of intensity $w$ over $L$ gives $R = w L$ at $L / 2$. A triangular load rising from zero to $w_{\max}$ gives $R = w_{\max} L / 2$ at $2 L / 3$ from the zero end. A trapezoidal load from $w_1$ to $w_2$ gives $R = (w_1 + w_2) L / 2$ at
$$
\bar{x} = \frac{L}{3} \cdot \frac{2 w_2 + w_1}{w_2 + w_1}
$$
measured from the $w_1$ end. A hydrostatic pressure of a liquid of density $\rho$ on a vertical plane surface gives a triangular load with $R = \tfrac{1}{2} \rho g d^{2} b$ for a surface of width $b$ and depth $d$, acting at $2 d / 3$ below the free surface.
:::

::: proof
Each is the area and centroid of the load diagram. Uniform: rectangle, area $w L$, centroid at mid-span. Triangular: area $\tfrac{1}{2} w_{\max} L$; the centroid of a triangle lies on the median at one third of the way from its base, hence $2 L / 3$ from the apex. Trapezoidal: split into a rectangle $w_1 L$ at $L / 2$ and a triangle $\tfrac{1}{2} (w_2 - w_1) L$ at $2 L / 3$, then combine:
$$
\bar{x} = \frac{w_1 L \cdot \frac{L}{2} + \frac{1}{2} (w_2 - w_1) L \cdot \frac{2 L}{3}}{(w_1 + w_2) L / 2}
= \frac{L \left( \frac{w_1}{2} + \frac{w_2 - w_1}{3} \right)}{(w_1 + w_2) / 2}
= \frac{L}{3} \cdot \frac{w_1 + 2 w_2}{w_1 + w_2} .
$$
Hydrostatic: the pressure at depth $h$ is $p = \rho g h$, so on a strip of width $b$ and height $\mathrm{d} h$ the force is $\rho g h b\, \mathrm{d} h$, and
$$
R = \rho g b \int_0^d h\, \mathrm{d} h = \tfrac{1}{2} \rho g b d^{2}, \qquad
\bar{h} = \frac{\int_0^d h \cdot \rho g b h\, \mathrm{d} h}{R} = \frac{\rho g b d^{3} / 3}{\rho g b d^{2} / 2} = \frac{2 d}{3},
$$
using $\int_0^d h^{2}\, \mathrm{d} h = d^{3} / 3$. Note that the liquid's density and the width cancel from the location, so the centre of pressure of a fully submerged vertical rectangle is always at two thirds of the depth whatever the fluid.
:::

::: example Beam with a compound load {#ex-beamload}
A beam $A B$ of span $6\ \mathrm{m}$ carries a load that increases uniformly from $10\ \mathrm{kN / m}$ at $A$ to $40\ \mathrm{kN / m}$ at $B$. Find the resultant and its position, and the reactions.
::: solution
Split into a rectangle of $10\ \mathrm{kN / m}$ and a triangle rising from $0$ to $30\ \mathrm{kN / m}$:
$$
R_1 = 10 \times 6 = 60\ \mathrm{kN}\ \text{at}\ 3.0\ \mathrm{m}, \qquad
R_2 = \tfrac{1}{2} \times 30 \times 6 = 90\ \mathrm{kN}\ \text{at}\ 4.0\ \mathrm{m},
$$
$$
R = 150\ \mathrm{kN}, \qquad
\bar{x} = \frac{60 \times 3.0 + 90 \times 4.0}{150} = \frac{180 + 360}{150} = 3.60\ \mathrm{m}\ \text{from}\ A .
$$
*Check with the trapezoid formula*, $w_1 = 10$, $w_2 = 40$:
$$
\bar{x} = \frac{6}{3} \cdot \frac{10 + 80}{50} = 2 \times 1.80 = 3.60\ \mathrm{m}. \checkmark
$$
**Reactions.** Taking moments about $A$,
$$
\textstyle \sum M_A = 6 B_y - 150 \times 3.60 = 0 \quad\Longrightarrow\quad B_y = 90.0\ \mathrm{kN},
$$
$$
\textstyle \sum F_y = A_y + 90.0 - 150 = 0 \quad\Longrightarrow\quad A_y = 60.0\ \mathrm{kN}.
$$
*Sanity.* The load is heavier towards $B$, so $B_y > A_y$; the ratio $90 / 60 = 1.5$ equals the ratio $\bar{x} / (L - \bar{x}) = 3.60 / 2.40$. Had the load been uniform at $25\ \mathrm{kN / m}$ — the same total — both reactions would have been $75\ \mathrm{kN}$, so the *distribution* changes the reactions by $15\ \mathrm{kN}$ each while leaving the total unchanged. That is the reason load diagrams, not just totals, are what you are given.
:::
:::

::: example Hydrostatic force on a gate {#ex-gate}
A vertical rectangular sluice gate $2.0\ \mathrm{m}$ wide holds water to a depth of $3.0\ \mathrm{m}$ on one side. Find the force on the gate and the depth of its centre of pressure, and the force if the water is doubled to $6.0\ \mathrm{m}$.
::: solution
With $\rho g = 9.81\ \mathrm{kN / m^{3}}$, the load intensity on the gate is a line load of $w = \rho g h b$, reaching
$$
w_{\max} = 9.81 \times 3.0 \times 2.0 = 58.86\ \mathrm{kN / m}
$$
at the base. The force is the area of the triangular diagram,
$$
R = \tfrac{1}{2} \times 58.86 \times 3.0 = 88.3\ \mathrm{kN},
$$
acting at $2 / 3$ of the depth, that is $2.00\ \mathrm{m}$ below the surface.

Doubling the depth gives $R = \tfrac{1}{2} \times 9.81 \times 6.0^{2} \times 2.0 = 353.2\ \mathrm{kN}$, four times as much, while the centre of pressure stays at $2 / 3$ of the depth, $4.00\ \mathrm{m}$.

*Check by direct integration*, with $h$ measured down from the surface:
$$
R = \int_0^3 \rho g h b\, \mathrm{d} h = 9.81 \times 2.0 \times \frac{3^{2}}{2} = 88.3\ \mathrm{kN}. \checkmark
$$
*Sanity.* The force grows as the *square* of the depth, so a flood that raises a reservoir by $50$ per cent raises the load on its gates by $125$ per cent. Gate hinges and lifting gear are designed for the maximum water level, not the normal one, and this is the standard cause of gate failures in floods. Note also that the centre of pressure is at two thirds of the depth, well below the middle: a gate hinged at the top is therefore hard to hold and easy to slam, which is why sluice gates are hinged or guided near the centre of pressure and lifted against the water rather than released by it.
:::
:::

::: widget plot
f: 9.81*2*x^2/2
x: 0, 6
y: 0, 360
labels: \text{hydrostatic force on a 2 m gate}
caption: Total hydrostatic force $R = \tfrac{1}{2} \rho g b d^{2}$ on a $2\ \mathrm{m}$ wide vertical gate against water depth $d$. The curve is a parabola: $88\ \mathrm{kN}$ at $3\ \mathrm{m}$, $199\ \mathrm{kN}$ at $4.5\ \mathrm{m}$, $353\ \mathrm{kN}$ at $6\ \mathrm{m}$. Doubling the depth quadruples the load, and the centre of pressure stays at two thirds of the depth whatever the level — which is why a gate's lifting gear, its hinges and its seat are all designed against the highest water the reservoir can reach, not against the water it usually holds.
:::

::: warning Equivalent loads are valid for reactions only
Replacing a distributed load by its resultant gives the correct support reactions and the correct overall equilibrium, and nothing else. The shear force and bending moment at a section *inside* the loaded region are wrong if you use the resultant, because the load between the section and the support has been moved. Use the resultant to find reactions; then, for internal forces, restore the distributed load and integrate it from the end. The habit of replacing a load by its resultant and then cutting a beam under it produces shear diagrams that do not integrate to the right answer and bending moments that are wrong by the moment of the load you removed.
:::

::: history
The word *centroid* is a nineteenth-century English coinage for the centre of gravity of a figure, but the results are far older. Archimedes found the centroids of the triangle and the parabolic segment in *On the Equilibrium of Planes*, and in *The Method* described how he discovered areas and volumes by slicing figures into strips and balancing them on a lever — the composite-area method in all but name. Pappus of Alexandria stated the theorems on surfaces and volumes of revolution around 320 AD, in Book VII of his *Collection*; Paul Guldin restated them in his *Centrobaryca* (1635–41), and they are still called the theorems of Pappus–Guldin. Stevin's *De Beghinselen des Waterwichts* (1586) had already computed the force of water on a vertical wall, Blaise Pascal's *Traité de l'équilibre des liqueurs* (written in the 1650s, published 1663) set out the transmission of pressure in a liquid, and the engineers of the eighteenth-century French school — Couplet, Bélidor and Coulomb — applied these results to retaining walls and harbour works.
:::

::: quiz
A vertical rectangular gate holds water of depth $d$. If the depth is doubled, what happens to the total hydrostatic force and to the depth of the centre of pressure below the surface?
- [ ] Force doubles; centre of pressure doubles
- [x] Force quadruples; centre of pressure doubles
- [ ] Force quadruples; centre of pressure stays at $2 d / 3$
- [ ] Force doubles; centre of pressure stays put
::: solution
The force is $\tfrac{1}{2} \rho g b d^{2}$, so it quadruples; the centre of pressure is at $\tfrac{2}{3}$ of the *new* depth, so its depth below the surface doubles. The third option is the tempting one, and it is wrong because "$2 d / 3$" scales with $d$: what stays fixed is the *fraction* of the depth, not the depth. This is why raising a reservoir raises both the load on a gate and the height at which that load acts, and why the moment on the gate's lifting beam grows as the cube of the water level.
:::
:::

## Where this leads

The centroid is the reference for every second moment in [[statics/area-moments]] and for the bending and torsion stresses of [[mechanics-of-materials/bending-stress]] and [[mechanics-of-materials/torsion]]. Shear and moment diagrams built from distributed loads are the subject of [[mechanics-of-materials/shear-moment-diagrams]], and hydrostatic loads on bodies and gates are developed in [[fluid-mechanics/fluid-statics]].

::: summary
- The centroid is the area-weighted mean position; it coincides with the centre of mass only for uniform material, and lies on every axis of symmetry.
- Composite areas: tabulate $A_i$, $x_i$, $y_i$; give holes negative area; the shift caused by a small hole is $a d / A$.
- Pappus: a surface or volume of revolution equals the generator's length or area times the path of its own centroid, $S = 2 \pi \bar{r} L$, $V = 2 \pi \bar{r} A$; it also gives centroids from known volumes.
- The resultant of a distributed load is the area under the load diagram and acts through that diagram's centroid: $w L$ at $L / 2$, $w L / 2$ at $2 L / 3$, hydrostatic force $\tfrac{1}{2} \rho g b d^{2}$ at $2 d / 3$.
- Equivalent resultants give correct reactions and wrong internal forces; restore the distributed load before cutting a beam.
:::

## Exercises

::: exercise Rectangle centroid {level=1 check="100"}
A rectangle $120\ \mathrm{mm}$ wide by $200\ \mathrm{mm}$ deep has its centroid at $\bar{y}$ measured from the bottom edge. What is $\bar{y}$ in mm?
::: solution
$\bar{y} = 200 / 2 = 100\ \mathrm{mm}$. The centroid of a rectangle is at half the depth measured from the datum; the width does not enter, because the section is symmetric about the horizontal centreline whatever its width.
:::
:::

::: exercise Angle section {level=1 check="21.4"}
An unequal angle $150 \times 90 \times 12\ \mathrm{mm}$ has its long leg vertical. Approximating it as two rectangles, find the distance of the centroid from the outer face of the long leg, in mm.
::: solution
Take the datum on the outer face of the vertical leg, $x$ horizontal. Vertical leg $12 \times 150$: $A = 1800$, $x = 6$. Horizontal leg $78 \times 12$ (the overlap with the vertical leg removed): $A = 936$, $x = 12 + 39 = 51$. Then
$$
\bar{x} = \frac{1800 \times 6 + 936 \times 51}{2736} = \frac{10\,800 + 47\,736}{2736} = 21.4\ \mathrm{mm}.
$$
*Note.* Tabulated values for rolled angles differ slightly from this because of the root and toe radii, which the two-rectangle model ignores. Never trust a hand-computed section property to better than a few per cent against a table.
:::
:::

::: exercise Semicircular arc {level=1 check="63.7"}
A wire is bent into a semicircle of radius $100\ \mathrm{mm}$. Find the distance of its centroid from the centre, in mm.
::: solution
$\bar{x} = 2 r / \pi = 200 / \pi = 63.7\ \mathrm{mm}$. The centroid of an arc is further out than that of the corresponding area ($4 r / 3 \pi = 42.4\ \mathrm{mm}$) because all the wire is at the rim.
:::
:::

::: exercise Trapezoidal load {level=2}
A beam of $8\ \mathrm{m}$ carries a load rising uniformly from $5\ \mathrm{kN / m}$ at one end to $25\ \mathrm{kN / m}$ at the other. Find the resultant and its position, and the reactions.
::: solution
$$
R = \frac{(5 + 25) \times 8}{2} = 120\ \mathrm{kN},
$$
$$
\bar{x} = \frac{8}{3} \cdot \frac{5 + 2 \times 25}{5 + 25} = \frac{8}{3} \times \frac{55}{30} = 4.89\ \mathrm{m}\ \text{from the light end}.
$$
Reactions: $R_B = 120 \times 4.89 / 8 = 73.3\ \mathrm{kN}$ and $R_A = 46.7\ \mathrm{kN}$.
*Check.* Split into a rectangle $40\ \mathrm{kN}$ at $4\ \mathrm{m}$ and a triangle $80\ \mathrm{kN}$ at $16 / 3 = 5.33\ \mathrm{m}$: $\bar{x} = (160 + 426.7) / 120 = 4.89\ \mathrm{m}$. $\checkmark$ The heavier reaction is at the heavier-load end, as it must be.
:::
:::

::: exercise Built-up section {level=2}
An I-section is built from three plates: two flanges $200 \times 20\ \mathrm{mm}$ and a web $12 \times 260\ \mathrm{mm}$ running between them, so the overall depth is $300\ \mathrm{mm}$. Find the distance from the bottom of the lower flange to the centroid, in mm.
::: solution
Datum at the bottom of the lower flange, $y$ upwards.

| Part | $A\ (\mathrm{mm^{2}})$ | $y\ (\mathrm{mm})$ | $A y\ (\mathrm{mm^{3}})$ |
|---|---|---|---|
| Bottom flange $200 \times 20$ | 4000 | 10 | 40 000 |
| Web $12 \times 260$ | 3120 | 150 | 468 000 |
| Top flange $200 \times 20$ | 4000 | 290 | 1 160 000 |
| **Total** | **11 120** | | **1 668 000** |

$$
\bar{y} = \frac{1\,668\,000}{11\,120} = 150.0\ \mathrm{mm}.
$$
*Check.* The section is symmetric about mid-depth, so the centroid must be at $150\ \mathrm{mm}$ exactly. The exercise is worth doing anyway: the *first moment* $\sum A y = 1.668 \times 10^{6}\ \mathrm{mm^{3}}$ about the bottom is not zero and is not the same as the first moment about the centroid, which is zero by definition. Confusing the two is the commonest error in the next chapter's parallel-axis calculation.
:::
:::

::: exercise Torus by Pappus {level=2 check="1480"}
A torus is generated by revolving a circle of radius $25\ \mathrm{mm}$ whose centre is $120\ \mathrm{mm}$ from the axis. Find its volume in $\mathrm{cm^{3}}$.
::: solution
$V = 2 \pi R \times \pi a^{2} = 2 \pi^{2} \times 120 \times 625 = 1.480 \times 10^{6}\ \mathrm{mm^{3}} = 1480\ \mathrm{cm^{3}}$.
*Check.* The tube's mean circumference is $2 \pi \times 120 = 754\ \mathrm{mm}$ and its cross-section is $1963\ \mathrm{mm^{2}}$; the product is $1.48 \times 10^{6}\ \mathrm{mm^{3}}$, which is exactly what Pappus says — the volume is the cross-sectional area times the path of the centroid. For a thin tube ($a \ll R$) the same product gives the volume of a pipe bend or an O-ring.
:::
:::

::: exercise Sliding gate {level=3}
A rectangular gate $1.5\ \mathrm{m}$ wide stands vertically with water at $2.4\ \mathrm{m}$ depth on one side and $1.2\ \mathrm{m}$ on the other. Find the net horizontal force and the height above the base of its line of action.
::: solution
The two sides give opposing triangular load diagrams. High side:
$$
R_1 = \tfrac{1}{2} \times 9.81 \times 1.5 \times 2.4^{2} = 42.4\ \mathrm{kN}
$$
acting $2.4 / 3 = 0.80\ \mathrm{m}$ above the base. Low side:
$$
R_2 = \tfrac{1}{2} \times 9.81 \times 1.5 \times 1.2^{2} = 10.6\ \mathrm{kN}
$$
acting $1.2 / 3 = 0.40\ \mathrm{m}$ above the base. Net force
$$
R = 42.4 - 10.6 = 31.8\ \mathrm{kN}.
$$
Taking moments about the base to find the height $\bar{h}$ of the net resultant,
$$
\bar{h} = \frac{42.4 \times 0.80 - 10.6 \times 0.40}{31.8} = \frac{33.9 - 4.24}{31.8} = 0.933\ \mathrm{m}.
$$
*Sanity.* The low-side water cancels a quarter of the high-side force, so the net load depends on both levels, $\tfrac{1}{2} \rho g b (h_1^{2} - h_2^{2})$. This is why a lock gate is designed for the largest difference in levels and why a cofferdam that is flooded on both sides is nearly unloaded — and why the dangerous moment for a temporary dam is the instant the far side is pumped out, not the moment of peak flood.
:::
:::

::: exercise Derivation {level=3}
Derive the centroid of a triangle of base $b$ and height $h$ from the base by integration, and then show that the centroid of any triangle is the average of its three vertices.
::: solution
Place the base on the $x$ axis from $0$ to $b$ and the apex at height $h$. At height $y$ the width is $b (1 - y / h)$ by similar triangles, so
$$
A = \int_0^h b \left( 1 - \frac{y}{h} \right) \mathrm{d} y = b \left( h - \frac{h}{2} \right) = \frac{b h}{2},
$$
$$
\int_0^h y \cdot b \left( 1 - \frac{y}{h} \right) \mathrm{d} y
= b \left( \frac{h^{2}}{2} - \frac{h^{2}}{3} \right) = \frac{b h^{2}}{6},
\qquad
\bar{y} = \frac{b h^{2} / 6}{b h / 2} = \frac{h}{3}.
$$
The centroid lies on the median at one third of the height from the base, which is the same as two thirds of the way from the vertex to the base's midpoint.

For the vertex-average result, take the triangle's vertices at $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$. An affine map takes the reference triangle $(0, 0)$, $(b, 0)$, $(0, h)$ to any triangle, and an affine map takes centroids to centroids because it preserves ratios of lengths along a line and ratios of areas. The centroid of the reference triangle is at $(b / 3, h / 3)$, which is the average of its three vertices $((0 + b + 0) / 3, (0 + 0 + h) / 3)$. Since the average of the vertices is itself an affine-invariant construction, the centroid of the general triangle is
$$
\bar{x} = \frac{x_1 + x_2 + x_3}{3}, \qquad \bar{y} = \frac{y_1 + y_2 + y_3}{3}.
$$
*Why this matters.* This is the reason finite-element codes compute element centroids as the arithmetic mean of the nodal coordinates — exact for triangles and tetrahedra, and only approximate for quadrilaterals, which is one of several reasons a badly distorted quadrilateral element behaves worse than a triangle.
:::
:::
