An aircraft wing is a box made of sheet metal or composite skin a few millimetres thick, stiffened by stringers and closed by spars, spanning many metres and carrying lift, weight and twisting moment. A car's chassis rail, a ship's hull girder, a cold-formed steel purlin and a bicycle frame tube are built the same way: the material is put as far from the centroid as possible, in walls much thinner than the section is wide. Such **thin-walled** members are extraordinarily efficient in bending, and either extraordinarily stiff or extraordinarily flimsy in torsion, depending on one detail — whether the section is closed. A steel tube of $50\ \mathrm{mm}$ radius and $2\ \mathrm{mm}$ wall, slit along its length, loses more than 99.9 % of its torsional stiffness.

This chapter develops the theory of thin-walled beams in the form used in aircraft and vehicle structures. Three ideas carry it: the **general (unsymmetric) bending formula**, which drops the assumption of [[mechanics-of-materials/bending-stress]] that the load lies in a plane of symmetry; **shear flow**, the shear force per unit length of wall, which turns shear and torsion problems into bookkeeping around the wall; and the **shear centre**, the point through which a transverse load must pass if the beam is to bend without twisting.

**Coordinates and conventions.** The beam axis is $x$; the cross-section lies in the $y$–$z$ plane with origin at the centroid. $s$ is a coordinate measured along the mid-line of the wall, $t(s)$ the wall thickness. Second moments of area: $I_{yy} = \int z^2\,dA$, $I_{zz} = \int y^2\,dA$, product $I_{yz} = \int yz\,dA$. Bending moments $M_y$ and $M_z$ are taken positive when they produce tension at points with positive $z$ and positive $y$ respectively. Tensile direct stress is positive.

::: definition Thin-walled section and shear flow {#def-shear-flow}
A section is **thin-walled** when the wall thickness $t$ is small compared with the other dimensions of the section (in practice $t/b \lesssim 0.1$). Stresses are then taken as uniform through the thickness, and the shear stress is tangent to the mid-line. The **shear flow** is
$$
q(s) = \tau(s)\,t(s),
$$
the shear force per unit length of mid-line, in $\mathrm{N/mm}$. A section is **open** if its mid-line has free ends (a channel, an I, an angle, a slit tube) and **closed** if the mid-line forms one or more closed loops (a tube, a box, a multi-cell wing box).
:::

The point of $q$ is that it is conserved along the wall in the way current is conserved in a wire. A small element of wall $dx \times ds$ in a member with no axial stress gradient has shear forces $q\,dx$ on its two edges $s$ and $s + ds$; equilibrium in $x$ makes them equal. So in pure torsion $q$ is constant around a closed cell, and where walls meet at a junction the shear flows in must equal the shear flows out.

## Unsymmetric bending

If a beam's section has no axis of symmetry — an angle, a Z-section, a wing box with unequal spar heights — a moment about one axis bends it about both. The engineering bending formula $\sigma = My/I$ then gives the wrong stress, sometimes by a factor of two.

::: theorem General bending formula {#thm-unsym}
For a straight beam of linear-elastic material whose plane sections remain plane, with centroidal axes $y$, $z$ (not necessarily principal), the direct stress due to bending moments $M_y$ and $M_z$ is
$$
\sigma_x = \frac{(M_z I_{yy} - M_y I_{yz})\,y + (M_y I_{zz} - M_z I_{yz})\,z}{I_{yy}I_{zz} - I_{yz}^2} .
$$ {#eq-unsym}
The neutral axis ($\sigma_x = 0$) passes through the centroid at angle $\alpha$ to the $y$-axis, where $\tan\alpha = -\dfrac{M_zI_{yy} - M_yI_{yz}}{M_yI_{zz} - M_zI_{yz}}$. If $I_{yz} = 0$ the formula reduces to $\sigma_x = M_y z/I_{yy} + M_z y/I_{zz}$.
:::

::: proof
Plane sections remaining plane means the axial strain is a linear function over the section, $\varepsilon_x = \varepsilon_0 + \kappa_z y + \kappa_y z$, and Hooke's law with no lateral stress gives $\sigma_x = E\varepsilon_x$. The resultants must be zero axial force and the applied moments:
$$
N = \int\sigma_x\,dA = E(\varepsilon_0 A + \kappa_z\!\int y\,dA + \kappa_y\!\int z\,dA) = E\varepsilon_0 A = 0,
$$
because the first moments vanish about centroidal axes; so $\varepsilon_0 = 0$. Then
$$
M_y = \int\sigma_x z\,dA = E(\kappa_z I_{yz} + \kappa_y I_{yy}), \qquad M_z = \int\sigma_x y\,dA = E(\kappa_z I_{zz} + \kappa_y I_{yz}).
$$
Solving the $2\times2$ system by Cramer's rule,
$$
E\kappa_y = \frac{M_yI_{zz} - M_zI_{yz}}{I_{yy}I_{zz} - I_{yz}^2}, \qquad E\kappa_z = \frac{M_zI_{yy} - M_yI_{yz}}{I_{yy}I_{zz} - I_{yz}^2},
$$
and $\sigma_x = E(\kappa_zy + \kappa_yz)$ is [[#eq-unsym]]. The neutral axis is the line $\kappa_z y + \kappa_y z = 0$ through the origin, giving the stated slope. The assumptions: plane sections (no warping restraint effects), linear elasticity, and loads that cause no twisting — that is, applied through the shear centre (below).
:::

The alternative is to find the **principal axes** of the section, where $I_{yz} = 0$, resolve the moment along them and add two symmetric-bending stresses. Both routes give the same answer; [[#eq-unsym]] avoids computing the principal angle.

::: example A Z-section purlin {#ex-zsection}
A Z-section has a vertical web of height $h = 100\ \mathrm{mm}$ and two horizontal flanges of width $b = 50\ \mathrm{mm}$, one pointing to $+y$ at the top and one to $-y$ at the bottom; all walls are $t = 4\ \mathrm{mm}$ thick (dimensions to the mid-line; ignore terms in $t^3$). It carries a sagging moment of $2.0\ \mathrm{kN\,m}$ about the horizontal axis (tension at the bottom). Find the direct stress at the web–flange junctions and at the flange tips, and the direction of the neutral axis.
::: solution
The section is antisymmetric, so the centroid is at the centre of the web. Put the web on $-50 \le z \le 50$ at $y = 0$, the top flange from $(0, 50)$ to $(50, 50)$, the bottom flange from $(0, -50)$ to $(-50, -50)$.
$$
\begin{aligned}
I_{yy} &= \frac{t h^3}{12} + 2(bt)\left(\frac h2\right)^2 = 333\,333 + 1\,000\,000 = 1.333\times10^{6}\ \mathrm{mm^4},\\
I_{zz} &= 2\cdot\frac{t b^3}{3} = 3.333\times10^{5}\ \mathrm{mm^4},\\
I_{yz} &= \int_0^{50}(y)(50)\,t\,dy + \int_{-50}^0 (y)(-50)\,t\,dy = 250\,000 + 250\,000 = 5.000\times10^{5}\ \mathrm{mm^4}.
\end{aligned}
$$
Tension at the bottom (negative $z$) means $M_y = -2.0\times10^{6}\ \mathrm{N\,mm}$; $M_z = 0$. The denominator is $I_{yy}I_{zz} - I_{yz}^2 = 4.444\times10^{11} - 2.500\times10^{11} = 1.944\times10^{11}\ \mathrm{mm^8}$, and
$$
\sigma_x = \frac{-M_yI_{yz}\,y + M_yI_{zz}\,z}{1.944\times10^{11}} = \frac{(1.0\times10^{12})\,y - (6.667\times10^{11})\,z}{1.944\times10^{11}} = 5.143\,y - 3.429\,z\ \ (\mathrm{MPa}).
$$
At the top web–flange junction $(0, 50)$: $\sigma_x = -171.4\ \mathrm{MPa}$; at the top flange tip $(50, 50)$: $257.1 - 171.4 = +85.7\ \mathrm{MPa}$. By antisymmetry the bottom junction carries $+171.4\ \mathrm{MPa}$ and the bottom tip $-85.7\ \mathrm{MPa}$. The neutral axis is $5.143y = 3.429z$, i.e. $z = 1.5y$: inclined at $56.3^\circ$ to the horizontal.

Sanity check: treating the section as if it bent about the horizontal axis alone would give $\sigma = Mz/I_{yy} = 2\times10^{6}\times50/1.333\times10^{6} = 75\ \mathrm{MPa}$ everywhere on the flanges. The true peak is $2.3$ times larger, and the flange tips are stressed in the *opposite* sense to their junctions. The beam also deflects sideways as well as downward, which is why Z-purlins on a sloping roof need sag rods or restraint from the sheeting.
:::
:::

## Shear flow in open sections

A transverse shear force varies the bending moment along the beam, so the direct stress at a point of the wall changes with $x$. That imbalance must be carried along the wall by shear flow, in the same way as in the derivation of $\tau = VQ/It$ in [[mechanics-of-materials/transverse-shear]] — but now for any thin-walled shape.

::: proposition Shear flow due to shear forces {#prop-shear-flow}
For a thin-walled beam carrying shear forces $S_y = dM_z/dx$ and $S_z = dM_y/dx$ applied through the shear centre (no twisting), the shear flow at position $s$ along the wall is
$$
q(s) = q_0 - \frac{S_yI_{yy} - S_zI_{yz}}{I_{yy}I_{zz} - I_{yz}^2}\int_0^s t\,y\,ds - \frac{S_zI_{zz} - S_yI_{yz}}{I_{yy}I_{zz} - I_{yz}^2}\int_0^s t\,z\,ds,
$$ {#eq-shear-flow}
where $q_0$ is the shear flow at $s = 0$. In an open section, start $s$ at a free edge, where $q_0 = 0$. For a section symmetric about the $y$-axis ($I_{yz} = 0$) with only $S_z$, this is $q = -S_zQ_y(s)/I_{yy}$ with $Q_y(s) = \int_0^s tz\,ds$ the first moment of the wall between the free edge and $s$.
:::

::: proof
Take an element of wall $dx \times ds$. On its faces $x$ and $x + dx$ act direct forces $\sigma_x t\,ds$ and $(\sigma_x + \partial\sigma_x/\partial x\,dx)\,t\,ds$; on its edges $s$ and $s + ds$ act shear forces $q\,dx$ and $(q + \partial q/\partial s\,ds)\,dx$ in the $x$-direction (by the symmetry of shear stresses, the shear flow along the wall equals the longitudinal shear flow on a cut across the wall). Equilibrium in $x$:
$$
\frac{\partial q}{\partial s} + t\frac{\partial\sigma_x}{\partial x} = 0 .
$$
Differentiate [[#eq-unsym]] along the beam, using $dM_y/dx = S_z$ and $dM_z/dx = S_y$ (and constant section properties):
$$
\frac{\partial\sigma_x}{\partial x} = \frac{(S_yI_{yy} - S_zI_{yz})\,y + (S_zI_{zz} - S_yI_{yz})\,z}{I_{yy}I_{zz} - I_{yz}^2}.
$$
Substitute and integrate from $0$ to $s$ to obtain [[#eq-shear-flow]]. At a free edge there is no adjacent material to carry a longitudinal shear force, so $q_0 = 0$. The assumption that the load passes through the shear centre is needed because otherwise an additional, torsional shear flow must be superposed.
:::

::: warning Signs in shear flow: let the physics decide
Formula [[#eq-shear-flow]] gives $q$ positive in the direction of increasing $s$, but whether that is "up the web" or "down the web" depends on how $S_y$, $S_z$ are signed relative to the loads, and textbooks differ. The safe procedure: compute the *magnitudes* with $|Q|$, then fix each direction by two physical checks — the vertical components of the shear flows must add up to the applied vertical shear force, and at every junction the flows in must equal the flows out (like currents at a node). A shear-flow diagram that fails either check has a sign error. A second common mistake is to use $VQ/It$ with $Q$ measured from the neutral axis in an *unsymmetric* section: there, both terms of [[#eq-shear-flow]] are needed.
:::

### The shear centre

In a channel loaded by a vertical force through its web, the flange shear flows produce equal and opposite horizontal forces, $F$, a distance $h$ apart: a couple. Nothing else on the section can balance it, so the channel twists. If the load is moved off the web, to the side away from the flanges, its moment about the web can cancel the couple; at one particular position the beam bends without twisting. That position is the **shear centre**.

::: definition Shear centre {#def-shear-centre}
The **shear centre** of a cross-section is the point through which the resultant of the transverse loads must pass for the beam to bend without twisting. Equivalently, it is the point about which the moment of the shear flows produced by any shear force (computed with [[#eq-shear-flow]] as if there were no twist) equals the moment of that shear force. It lies on every axis of symmetry of the section; for a section made of straight walls meeting at a single point (an angle, a T, a cruciform), it lies at that point.
:::

::: proposition Shear centre of a channel {#prop-channel}
A channel of web height $h$ and flange width $b$ (both measured to the mid-line) with uniform thickness $t$ has its shear centre on the axis of symmetry at a distance
$$
e = \frac{3b^2}{h + 6b}
$$
from the web mid-line, on the side away from the flanges.
:::

::: proof
The second moment of area about the axis of symmetry (neglecting $t^3$ terms) is $I = \tfrac{th^3}{12} + 2bt\left(\tfrac h2\right)^2 = \tfrac{th^2}{12}(h + 6b)$. Apply a vertical shear force $V$. In the top flange, measuring $s$ from the free tip, the first moment of the wall beyond the cut is $Q = ts\,(h/2)$, so the shear flow is $q = Vts h/(2I)$, growing linearly to $Vtbh/(2I)$ at the corner. The flange force is
$$
F = \int_0^b q\,ds = \frac{Vtb^2h}{4I}.
$$
The bottom flange carries the same force in the opposite direction, and the web carries the vertical shear $V$ (check: the web flow integrates to $V$ because the flanges carry no vertical force). Take moments about the mid-point of the web: the web flow has no moment arm; the two flange forces form a couple $Fh$. For no twist, the load $V$ applied at distance $e$ from the web must have the same moment: $Ve = Fh$, so
$$
e = \frac{tb^2h^2}{4I} = \frac{tb^2h^2}{4}\cdot\frac{12}{th^2(h + 6b)} = \frac{3b^2}{h + 6b}. 
$$
:::

::: widget plot
f: 3x^2/(1 + 6x); x/2
x: 0, 1.5
y: 0, 0.8
labels: e/h\ \text{(shear centre from web)}; b/(2h)\ \text{(centroid from web, approx.)}
points: 0.4, 0.2353
caption: Shear-centre offset $e/h$ of a uniform-thickness channel against the flange ratio $b/h$, with a rough indicator of the flange extent. The marked point is the channel of [[#ex-channel]] ($b/h = 0.4$, $e = 0.235h$). The shear centre is always outside the section, on the far side of the web from the flanges, and moves further out as the flanges grow; for wide flanges ($b \gg h$) it tends to $b/2$. A load through the web of a channel therefore always twists it — which is why channels are used back to back, or loaded through a bracket that reaches the shear centre.
:::

::: example Shear stresses and shear centre of a channel {#ex-channel}
A channel with $h = 200\ \mathrm{mm}$, $b = 80\ \mathrm{mm}$, $t = 5\ \mathrm{mm}$ (mid-line dimensions) carries a vertical shear force $V = 20\ \mathrm{kN}$. Find the shear stress at the flange–web corner and at the neutral axis, and the position of the shear centre.
::: solution
$I = \tfrac{th^2}{12}(h + 6b) = \tfrac{5\times200^2}{12}\times680 = 1.133\times10^{7}\ \mathrm{mm^4}$.

At the corner, $Q = tb\,(h/2) = 5\times80\times100 = 40\,000\ \mathrm{mm^3}$:
$$
q = \frac{VQ}{I} = \frac{20\,000\times40\,000}{1.133\times10^{7}} = 70.6\ \mathrm{N/mm}, \qquad \tau = q/t = 14.1\ \mathrm{MPa}.
$$
At the neutral axis add the upper half of the web, $Q = 40\,000 + 5\times100\times50 = 65\,000\ \mathrm{mm^3}$: $q = 114.7\ \mathrm{N/mm}$, $\tau_{\max} = 22.9\ \mathrm{MPa}$.

Shear centre: $e = 3\times80^2/(200 + 480) = 28.2\ \mathrm{mm}$ from the web mid-line, outside the channel. Check from the flange force: $F = Vtb^2h/(4I) = 20\,000\times5\times6400\times200/(4\times1.133\times10^{7}) = 2824\ \mathrm{N}$, and $Fh/V = 2824\times200/20\,000 = 28.2\ \mathrm{mm}$. ✓

Sanity check: the average web shear stress $V/(ht) = 20\ \mathrm{MPa}$ lies between the corner value and the peak, as expected for a parabolic web distribution on top of a constant; the flanges carry no net vertical force, so the web takes all of $V$.
:::
:::

## Torsion of closed sections

Twist a closed thin-walled tube. With no axial stress gradient, the element argument above gives $\partial q/\partial s = 0$: **the shear flow is the same at every point of the wall** of a single closed cell, whatever the variation of thickness. Where the wall is thin, the stress is high; the force per unit length is constant.

::: theorem Bredt–Batho formulas {#thm-bredt}
A single-cell closed thin-walled section under torque $T$ (no restraint of warping) carries a constant shear flow
$$
q = \frac{T}{2A},
$$ {#eq-bredt}
where $A$ is the area enclosed by the mid-line of the wall, and twists at the rate
$$
\frac{d\theta}{dx} = \frac{T}{4A^2G}\oint\frac{ds}{t}, \qquad\text{so that}\qquad J = \frac{4A^2}{\oint ds/t}.
$$ {#eq-bredt-twist}
:::

::: proof
Constancy of $q$ was shown above. The torque of the shear flow about any point $O$ in the plane of the section is $\oint q\,p\,ds$, where $p$ is the perpendicular distance from $O$ to the tangent of the mid-line. But $\tfrac12p\,ds$ is the area of the thin triangle with apex $O$ and base $ds$, so $\oint p\,ds = 2A$, and $T = q\cdot2A$. (The result is independent of $O$, as it must be for a pure couple.)

For the twist rate, use energy. The shear stress $\tau = q/t$ stores strain energy $\tau^2/(2G)$ per unit volume, so per unit length of beam
$$
U' = \oint\frac{q^2}{2Gt^2}\,t\,ds = \frac{q^2}{2G}\oint\frac{ds}{t} = \frac{T^2}{8A^2G}\oint\frac{ds}{t}.
$$
This equals the work done by the torque per unit length, $\tfrac12T\,d\theta/dx$, which gives [[#eq-bredt-twist]]. Assumptions: thin wall, linear elasticity, the cross-section keeps its shape (it may warp out of plane freely), and $\tau$ uniform through $t$.
:::

### Torsion of open sections

An open section cannot carry torque by a shear flow circulating around the section — there is no closed path. Instead each thin wall acts like a thin rectangular strip in torsion, with shear stress varying linearly through the thickness and changing sign at the mid-line: the "shear flow" circulates within the thickness, with a tiny lever arm of order $t$.

::: proposition Torsion of thin open sections {#prop-open}
A thin open section made of walls of lengths $b_i$ and thicknesses $t_i$ has torsion constant and maximum shear stress
$$
J = \sum_i\frac{b_it_i^3}{3}, \qquad \frac{d\theta}{dx} = \frac{T}{GJ}, \qquad \tau_{\max} = \frac{T\,t_{\max}}{J}.
$$
:::

::: proof
For a single strip of width $b \gg t$, away from the ends of the strip the Prandtl stress function depends only on the through-thickness coordinate $n$: $\phi = G\theta'(t^2/4 - n^2)$, which satisfies $\nabla^2\phi = -2G\theta'$ and vanishes on the faces $n = \pm t/2$. Then $\tau = -\partial\phi/\partial n = 2G\theta'n$, maximum $G\theta't$ at the faces, and the torque $T = 2\int\phi\,dA = 2G\theta' b\int_{-t/2}^{t/2}(t^2/4 - n^2)\,dn = G\theta'\,bt^3/3$. (The factor 2 in $T = 2\int\phi\,dA$ includes the contribution of the short-edge shear stresses, which carry half the torque despite acting over a tiny area.) Hence $J = bt^3/3$ and $\tau_{\max} = G\theta't = Tt/J$. For a section of several walls twisting together at the same rate, the torques add: $T = G\theta'\sum b_it_i^3/3$. The approximation ignores the corners and ends, which is acceptable when every $b_i/t_i$ is large.
:::

::: example A slit tube against a closed tube {#ex-slit}
A steel tube ($G = 80\ \mathrm{GPa}$) has mean radius $R = 50\ \mathrm{mm}$ and wall $t = 2\ \mathrm{mm}$ and carries a torque of $500\ \mathrm{N\,m}$. Find the shear stress and the twist per metre (a) for the closed tube, (b) if the tube is slit along its length. What torque could the slit tube carry for the same shear stress?
::: solution
(a) Closed: $A = \pi R^2 = 7854\ \mathrm{mm^2}$, $q = T/2A = 5\times10^{5}/15\,708 = 31.8\ \mathrm{N/mm}$, $\tau = 15.9\ \mathrm{MPa}$. $J = 4A^2/(2\pi R/t) = 2\pi R^3t = 1.571\times10^{6}\ \mathrm{mm^4}$, and
$$
\frac{d\theta}{dx} = \frac{T}{GJ} = \frac{5\times10^{5}}{80\,000\times1.571\times10^{6}} = 3.98\times10^{-6}\ \mathrm{rad/mm} = 0.228^\circ/\mathrm{m}.
$$
(b) Slit: one strip of width $2\pi R = 314.2\ \mathrm{mm}$: $J = 314.2\times2^3/3 = 837.8\ \mathrm{mm^4}$. At the same torque, $\tau = Tt/J = 5\times10^{5}\times2/837.8 = 1194\ \mathrm{MPa}$ — the tube would yield long before — and the twist rate would be $1875$ times larger. For the same stress of $15.9\ \mathrm{MPa}$, the slit tube carries only $T = \tau J/t = 15.9\times837.8/2 = 6.67\ \mathrm{N\,m}$.

The ratios are general: $J_\text{closed}/J_\text{open} = 3(R/t)^2 = 1875$ and $\tau_\text{open}/\tau_\text{closed} = 3R/t = 75$. Sanity check: the closed-tube result agrees with the solid-shaft formula $J = \tfrac{\pi}{2}(R_o^4 - R_i^4)$ for $R_o = 51$, $R_i = 49\ \mathrm{mm}$: $1.572\times10^{6}\ \mathrm{mm^4}$.
:::
:::

::: widget plot
f: log10(3x^2); log10(3x)
x: 2, 60
y: 0, 4.2
labels: \log_{10}(J_\text{closed}/J_\text{open}); \log_{10}(\tau_\text{open}/\tau_\text{closed})
caption: How much a longitudinal slit costs a thin circular tube, against the radius-to-thickness ratio $R/t$ (logarithmic vertical scale: 3 means a factor of 1000). The stiffness ratio $3(R/t)^2$ passes 1000 at $R/t \approx 18$; the stress ratio $3R/t$ grows more slowly. Typical aircraft fuselage skins have $R/t$ in the hundreds — which is why every cut-out for a door or a hatch must be framed so that the torsion box stays closed.
:::

## Shear and torsion of closed sections

A shear force applied to a closed section produces a shear flow that cannot be found from [[#eq-shear-flow]] alone, because there is no free edge where $q_0$ is known. The procedure is to **cut** the wall at a convenient point, compute the open-section shear flow $q_b(s)$ from that cut, and add an unknown constant shear flow $q_{s,0}$ around the cell. The constant is fixed by one extra condition: the moment of the total shear flow about any point must equal the moment of the applied load about that point (and, if the load is not through the shear centre, the twist rate follows from [[#eq-bredt-twist]]-type integrals). By symmetry the cut can often be placed where $q = 0$.

::: example Shear stress in a thin circular tube {#ex-tube-shear}
A thin tube of mean radius $R$ and thickness $t$ carries a transverse shear force $V$ through its centre. Show that the largest shear stress is $2V/A_\text{wall}$, twice the average, and evaluate it for $V = 15\ \mathrm{kN}$, $R = 40\ \mathrm{mm}$, $t = 3\ \mathrm{mm}$.
::: solution
Let $V$ act along $z$ and measure the angle $\phi$ from the top of the tube. By symmetry about the $z$-axis the shear flow is zero at the top and bottom, so a "cut" at $\phi = 0$ has $q_0 = 0$. With $I = \pi R^3t$ and $z = R\cos\phi$:
$$
q(\phi) = \frac{V}{I}\int_0^\phi t\,(R\cos\psi)\,R\,d\psi = \frac{VR^2t\sin\phi}{\pi R^3t} = \frac{V\sin\phi}{\pi R}.
$$
The maximum is at $\phi = 90^\circ$ (the neutral axis): $q_{\max} = V/(\pi R)$, $\tau_{\max} = V/(\pi Rt) = 2V/(2\pi Rt) = 2V/A_\text{wall}$. Check: the vertical component of the shear flows, $2\int_0^\pi q\sin\phi\,R\,d\phi = \tfrac{2V}{\pi}\cdot\tfrac{\pi}{2} = V$. ✓

Numbers: $A_\text{wall} = 2\pi\times40\times3 = 754\ \mathrm{mm^2}$, $\tau_{\max} = 2\times15\,000/754 = 39.8\ \mathrm{MPa}$.
:::
:::

### Multi-cell sections

A wing box usually has two or three spars, forming two or more cells. Under torque, each cell $i$ carries its own constant shear flow $q_i$; an interior web shared by cells $i$ and $j$ carries $q_i - q_j$. There are now more unknowns than torque equilibrium can fix, so the extra equations are compatibility: all cells twist at the same rate, because the section rotates as a rigid body in its plane.

::: algorithm Torsion of an $n$-cell section {#alg-multicell}
1. Assign an unknown constant shear flow $q_i$ (anticlockwise positive) to each cell. A wall between cells $i$ and $j$ carries $q_i - q_j$ (positive in cell $i$'s sense).
2. Torque equilibrium: $T = \sum_i 2A_iq_i$.
3. Twist rate of each cell, from Bredt's second formula written for one cell: $\dfrac{d\theta}{dx} = \dfrac{1}{2A_iG}\oint_i\dfrac{q\,ds}{t}$, where the integral runs round cell $i$ with the shear flow actually present in each wall.
4. Set the $n$ twist rates equal; solve the $n + 1$ linear equations for $q_1, \dots, q_n$ and $d\theta/dx$. Then $J = T/(G\,d\theta/dx)$ and $\tau = q/t$ in each wall.
:::

::: example A two-cell wing box {#ex-twocell}
A two-cell aluminium-alloy box ($G = 27\ \mathrm{GPa}$) is $300\ \mathrm{mm}$ wide and $100\ \mathrm{mm}$ deep (mid-line), divided by an interior web $200\ \mathrm{mm}$ from the left side, so that cell 1 is $200\times100$ and cell 2 is $100\times100\ \mathrm{mm}$. All walls are $2\ \mathrm{mm}$ thick. Find the shear flows and the twist rate under $T = 10\ \mathrm{kN\,m}$, and compare with the box without the interior web.
::: solution
$A_1 = 20\,000\ \mathrm{mm^2}$, $A_2 = 10\,000\ \mathrm{mm^2}$. Cell 1's outer walls total $500\ \mathrm{mm}$, cell 2's $300\ \mathrm{mm}$, the shared web $100\ \mathrm{mm}$; all $t = 2\ \mathrm{mm}$.
$$
\begin{aligned}
&T: && 40\,000\,q_1 + 20\,000\,q_2 = 10^{7}\ \mathrm{N\,mm},\\
&\text{cell 1}: && \theta' = \frac{1}{2A_1G}\left[\frac{500}{2}q_1 + \frac{100}{2}(q_1 - q_2)\right] = \frac{300q_1 - 50q_2}{2A_1G},\\
&\text{cell 2}: && \theta' = \frac{1}{2A_2G}\left[\frac{300}{2}q_2 + \frac{100}{2}(q_2 - q_1)\right] = \frac{200q_2 - 50q_1}{2A_2G}.
\end{aligned}
$$
Equating the twist rates: $(300q_1 - 50q_2)/2 = 200q_2 - 50q_1$, so $q_1 = 1.125\,q_2$. With the torque equation: $q_2 = 153.8\ \mathrm{N/mm}$, $q_1 = 173.1\ \mathrm{N/mm}$, and the interior web carries $q_1 - q_2 = 19.2\ \mathrm{N/mm}$. Shear stresses: $86.5$, $76.9$ and $9.6\ \mathrm{MPa}$. The twist rate is
$$
\theta' = \frac{300(173.1) - 50(153.8)}{2(20\,000)(27\,000)} = 4.10\times10^{-5}\ \mathrm{rad/mm} = 2.35^\circ/\mathrm{m}.
$$
Without the interior web (one $300\times100$ cell): $q = T/2A = 166.7\ \mathrm{N/mm}$, $\tau = 83.3\ \mathrm{MPa}$, $\theta' = T\oint ds/t/(4A^2G) = 10^{7}\times400/(4\times30\,000^2\times27\,000) = 4.12\times10^{-5}\ \mathrm{rad/mm}$.

The interior web changes the torsional stiffness by less than 1 % and carries little torque: it is there for shear (it is a spar) and for stability, not for torsion. Check: $2A_1q_1 + 2A_2q_2 = 6.92 + 3.08 = 10.0\ \mathrm{kN\,m}$. ✓
:::
:::

::: application Structural idealisation in aircraft
In a stiffened wing or fuselage, the stringers and spar caps carry most of the direct stress, while the thin skin between them carries mainly shear. Aircraft stress analysts therefore **idealise** the section into concentrated areas, or **booms**, which carry all the direct stress, joined by skin panels that carry only shear flow. Between two booms the shear flow is then constant, and [[#eq-shear-flow]] becomes a sum: crossing a boom of area $B_r$ at $(y_r, z_r)$ changes $q$ by $-(S_y$-term$)B_ry_r - (S_z$-term$)B_rz_r$. The method, developed at length by Megson, is how wing boxes are sized by hand before a finite element model exists, and how the model's answers are checked. Real aircraft structures are certified against airworthiness regulations by qualified engineers; the hand methods teach what the numbers should look like.
:::

::: history
The formula $q = T/2A$ for the torsion of thin-walled closed tubes was published by the German engineer Rudolf Bredt in 1896, in the journal of the Verein Deutscher Ingenieure, and is often called the Bredt–Batho formula after later work by Cyril Batho. The shear centre — the point through which loads on a channel must pass to avoid twisting — was identified in the early 1920s; the Swiss engineer Robert Maillart's 1921 papers in the *Schweizerische Bauzeitung* introduced the concept to engineering practice. The general theory of thin-walled open beams, including the warping stresses that arise when the free warping assumed here is restrained, was developed by the Soviet engineer Vasily Vlasov, whose book on thin-walled elastic beams appeared in 1940.
:::

::: quiz
A closed thin-walled section has walls of two thicknesses, $2\ \mathrm{mm}$ and $4\ \mathrm{mm}$. Under pure torsion, which statement is correct?
- [ ] The shear stress is the same in all walls.
- [x] The shear flow is the same in all walls; the shear stress is twice as large in the thinner walls.
- [ ] The thicker walls carry twice the shear flow.
::: solution
Longitudinal equilibrium of a wall element forces $\partial q/\partial s = 0$ in a single closed cell under pure torsion, so $q = T/2A$ everywhere and $\tau = q/t$ is largest where the wall is thinnest.
:::
:::

::: quiz
Where is the shear centre of an equal-leg angle section?
- [ ] At its centroid.
- [x] At the corner where the two legs meet.
- [ ] Outside the section, on the axis of symmetry, beyond the corner.
::: solution
The shear flows in both legs act along the legs' mid-lines, which both pass through the corner; their resultants therefore have no moment about the corner, so a load through the corner causes no twist ([[#def-shear-centre]]).
:::
:::

::: summary
- In thin-walled sections, work with the shear flow $q = \tau t$; in a wall with no axial stress gradient it is constant along the wall, and at junctions flows in equal flows out.
- Unsymmetric bending: $\sigma_x = [(M_zI_{yy} - M_yI_{yz})y + (M_yI_{zz} - M_zI_{yz})z]/(I_{yy}I_{zz} - I_{yz}^2)$; the neutral axis is generally not perpendicular to the plane of the moment.
- Shear flow in open sections comes from $\partial q/\partial s = -t\,\partial\sigma_x/\partial x$, integrated from a free edge where $q = 0$.
- The shear centre is where a load must act to cause bending without twist; for a channel $e = 3b^2/(h + 6b)$ from the web, outside the section.
- Closed sections: $q = T/2A$, $d\theta/dx = (T/4A^2G)\oint ds/t$. Open sections: $J = \sum bt^3/3$, $\tau_{\max} = Tt/J$. Closing a section multiplies its torsional stiffness by a factor of order $(R/t)^2$.
- Closed sections under shear: cut, compute the open-section flow, add a constant fixed by moment equilibrium. Multi-cell sections under torsion: one $q$ per cell, equal twist rates.
:::

## Exercises

::: exercise Shear stress in a rectangular tube {level=1 check="50"}
A closed rectangular tube has mid-line dimensions $100\ \mathrm{mm}\times50\ \mathrm{mm}$ and wall thickness $2\ \mathrm{mm}$. Find the shear stress due to a torque of $1.0\ \mathrm{kN\,m}$. (Enter it in MPa.)
::: solution
$A = 5000\ \mathrm{mm^2}$; $q = T/2A = 10^{6}/10\,000 = 100\ \mathrm{N/mm}$; $\tau = q/t = 50\ \mathrm{MPa}$.
:::
:::

::: exercise A flat strip in torsion {level=1 check="100"}
A flat steel strip $60\ \mathrm{mm}$ wide and $3\ \mathrm{mm}$ thick carries a torque of $18\ \mathrm{N\,m}$. Find the maximum shear stress. (Enter it in MPa.)
::: solution
$J = bt^3/3 = 60\times27/3 = 540\ \mathrm{mm^4}$; $\tau_{\max} = Tt/J = 18\,000\times3/540 = 100\ \mathrm{MPa}$.
:::
:::

::: exercise Channel shear centre {level=1 check="22.5"}
A channel of uniform thickness has web height $120\ \mathrm{mm}$ and flange width $60\ \mathrm{mm}$ (mid-line). How far from the web mid-line is the shear centre? (Enter the distance in mm.)
::: solution
$e = 3b^2/(h + 6b) = 3\times3600/(120 + 360) = 22.5\ \mathrm{mm}$, on the side of the web away from the flanges.
:::
:::

::: exercise The cost of a slit {level=2 check="1875"}
A thin circular tube has $R/t = 25$. By what factor does slitting it along its length reduce its torsional stiffness? (Enter the ratio $J_\text{closed}/J_\text{open}$.)
::: solution
$J_\text{closed} = 2\pi R^3t$, $J_\text{open} = 2\pi Rt^3/3$, ratio $3(R/t)^2 = 3\times625 = 1875$.
:::
:::

::: exercise Twist of a rectangular tube {level=2 check="0.01875"}
For the tube of the first exercise, made of steel with $G = 80\ \mathrm{GPa}$, find the rate of twist. (Enter it in rad/m.)
::: solution
$\oint ds/t = 300/2 = 150$; $d\theta/dx = T\oint ds/t/(4A^2G) = 10^{6}\times150/(4\times5000^2\times80\,000) = 1.875\times10^{-5}\ \mathrm{rad/mm} = 0.01875\ \mathrm{rad/m}$ ($1.07^\circ$/m).
:::
:::

::: exercise An unequal-leg angle {level=2}
An angle section has a vertical leg of $100\ \mathrm{mm}$ and a horizontal leg of $60\ \mathrm{mm}$ (mid-line lengths from the corner), both $5\ \mathrm{mm}$ thick. It carries a moment of $1.0\ \mathrm{kN\,m}$ about the horizontal axis, with tension in the top of the vertical leg. Find the centroid, $I_{yy}$, $I_{zz}$, $I_{yz}$ and the direct stress at the top of the vertical leg, the tip of the horizontal leg and the corner. Compare with $Mz/I_{yy}$.
::: solution
Put the corner at the origin, the vertical leg along $+z$, the horizontal leg along $+y$. Areas $500$ and $300\ \mathrm{mm^2}$; centroid $\bar y = 300\times30/800 = 11.25\ \mathrm{mm}$, $\bar z = 500\times50/800 = 31.25\ \mathrm{mm}$. About the centroid (thin-wall approximations):
$I_{yy} = 5\times100^3/12 + 500(50 - 31.25)^2 + 300(31.25)^2 = 416\,667 + 175\,781 + 292\,969 = 8.854\times10^{5}\ \mathrm{mm^4}$;
$I_{zz} = 5\times60^3/12 + 300(30 - 11.25)^2 + 500(11.25)^2 = 90\,000 + 105\,469 + 63\,281 = 2.588\times10^{5}\ \mathrm{mm^4}$;
$I_{yz} = 500(-11.25)(18.75) + 300(18.75)(-31.25) = -105\,469 - 175\,781 = -2.813\times10^{5}\ \mathrm{mm^4}$.
With $M_y = 10^{6}\ \mathrm{N\,mm}$, $M_z = 0$, denominator $8.854\times10^{5}\times2.588\times10^{5} - (2.813\times10^{5})^2 = 1.500\times10^{11}$: $\sigma = (-M_yI_{yz}y + M_yI_{zz}z)/1.500\times10^{11} = 1.875y + 1.725z$ (MPa, $y, z$ from the centroid). Top of vertical leg $(-11.25, 68.75)$: $-21.1 + 118.6 = 97.5\ \mathrm{MPa}$. Tip of horizontal leg $(48.75, -31.25)$: $91.4 - 53.9 = 37.5\ \mathrm{MPa}$. Corner $(-11.25, -31.25)$: $-21.1 - 53.9 = -75.0\ \mathrm{MPa}$. The naive $Mz/I_{yy}$ gives $77.6\ \mathrm{MPa}$ at the top and $-35.3\ \mathrm{MPa}$ at the corner and the horizontal-leg tip — wrong in magnitude and, at the tip, in sign.
:::
:::

::: exercise Shear centre of a slit tube {level=3}
A thin circular tube of mean radius $R$ and thickness $t$ is slit along one generator. Show that its shear centre lies on the axis of symmetry at a distance $2R$ from the centre of the tube, on the side opposite the slit. Explain why this means that a slit tube loaded through its centre twists.
::: solution
Put the slit at $\phi = 0$ (angle measured from the slit around the tube), the axis of symmetry along the line through the slit and the centre, and apply a shear force $V$ perpendicular to that axis. Take $z = R\sin\phi$ in the direction of $V$ (zero at the slit and at $\phi = \pi$). $I = \pi R^3t$. From the free edge at the slit,
$$
q(\phi) = \frac{V}{I}\int_0^\phi tR\sin\psi\,R\,d\psi = \frac{V(1 - \cos\phi)}{\pi R}.
$$
Every element of shear flow acts tangentially at radius $R$, so its moment about the centre is $qR\,R\,d\phi$, and the total is
$$
\int_0^{2\pi}\frac{V(1 - \cos\phi)}{\pi R}R^2\,d\phi = \frac{VR}{\pi}\cdot2\pi = 2VR.
$$
For no twist the load must produce the same moment about the centre: $Ve = 2VR$, so $e = 2R$, on the side away from the slit (where the shear flow is largest). A load through the centre therefore leaves an unbalanced torque $2VR$, and since $J_\text{open}$ is tiny, the twist is large. Closing the slit lets the cell carry a constant shear flow $q_{s,0}$ that cancels this torque, moving the shear centre to the centre of the tube.
:::
:::

::: exercise Open or closed for a chassis rail {level=3}
A light trailer's chassis rail must resist twisting from uneven ground as well as bending. You can use either a cold-formed channel $150\times60\times4\ \mathrm{mm}$ or a rectangular hollow section $150\times60\times4\ \mathrm{mm}$ (both outside dimensions, similar mass per metre). Estimate the ratio of their torsional stiffnesses and maximum shear stresses for the same torque, and discuss the practical consequences: attachment of cross-members, corrosion, cost, and whether a torsionally flexible frame might sometimes be preferable.
::: solution
Mid-line dimensions about $146\times56\ \mathrm{mm}$ for both. Channel: $J = \sum bt^3/3 = (146 + 2\times56)\times64/3 = 5504\ \mathrm{mm^4}$. Box: $A = 146\times56 = 8176\ \mathrm{mm^2}$, $\oint ds/t = 2(146 + 56)/4 = 101$, $J = 4A^2/101 = 2.647\times10^{6}\ \mathrm{mm^4}$: about **480 times** stiffer. Stresses for torque $T$: channel $\tau = Tt/J = T\times4/5504 = 7.27\times10^{-4}T$; box $\tau = T/(2At) = T/65\,408 = 1.53\times10^{-5}T$: the open section is about 48 times more highly stressed (with $T$ in N mm, $\tau$ in MPa). A good answer then weighs: the channel's shear centre is outside the web, so vertical loads through the web also twist it unless cross-members restrain it; open channels are easy to bolt to, inspect and paint inside, whereas closed sections need drain holes and internal corrosion protection; closed sections give a much stiffer frame, but a deliberately torsionally flexible ladder frame (open channels) lets all wheels stay on rough ground and keeps loads out of the joints, which is why many truck and trailer frames use channels. Joint design (warping restraint at welded cross-members causes local stresses that this chapter's free-warping theory ignores) usually governs fatigue life; frames are designed to the applicable vehicle standards.
:::
:::
