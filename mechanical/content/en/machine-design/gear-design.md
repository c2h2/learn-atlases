Open any gearbox — a car's transmission, a wind-turbine drive train, a lathe headstock, an industrial reducer — and you find pairs of toothed wheels passing torque from one shaft to another at a fixed speed ratio. A gear pair is a remarkably efficient and compact machine element: a well-lubricated spur mesh loses only one or two per cent of the power it carries, and a pinion the size of a fist can transmit tens of kilowatts. That compactness has a price. Each tooth is a short, stubby cantilever loaded at a moving point by a large force, once per revolution, millions or billions of times; and the force passes between the teeth through a contact band a fraction of a millimetre wide, where the surface pressure reaches a gigapascal.

Gear teeth therefore fail in two characteristic ways. A tooth can **break** at its root by bending fatigue — usually the more dangerous failure, because the gear stops transmitting at once and the broken pieces wreck the rest of the gearbox. Or the flanks can **pit**: small craters spall out of the working surfaces by contact (rolling) fatigue, the profile is gradually destroyed, the gear gets noisy, and in the end teeth crack from the damaged surface. Rating a gear means checking both: a bending stress at the tooth root against a bending fatigue strength, and a contact stress on the flank against a surface fatigue strength. This chapter derives the two classical stress formulas — Wilfred Lewis's bending equation and Heinrich Hertz's contact stress — and then shows how the modern rating standards build on them.

The kinematics of gearing — the fundamental law of gearing, the involute profile, interference and undercutting — are developed in [[mechanisms/gears]], and gear trains in [[mechanisms/gear-trains]]. Here we recall only the geometry the stress analysis needs. The loads that a mesh puts on its shafts and bearings, found in the force analysis below, are the inputs to [[machine-design/shafts]] and [[machine-design/bearings]], and the fatigue concepts used throughout are those of [[machine-design/fatigue]].

Notation follows Budynas and Nisbett, *Shigley's Mechanical Engineering Design* (11th edition), in its SI form: module $m$, numbers of teeth $z_P$ (pinion) and $z_G$ (gear), pitch diameter $d$, pressure angle $\phi$, face width $F$, transmitted (tangential) load $W_t$, factor of safety $n$, and the AGMA factors $K_o$, $K_v$, $K_s$, $K_H$, $K_B$, $Y_J$, $Z_I$, $Y_N$, $Z_N$, $S_F$, $S_H$ introduced later. The **pinion** is the smaller gear of a pair; the speed ratio is $m_G = z_G/z_P \ge 1$.

## Spur-gear geometry in brief

A spur gear has straight teeth parallel to its axis. Two meshing gears behave kinematically like two cylinders rolling without slip — the **pitch cylinders**, whose cross-sections are the **pitch circles** — and the teeth are shaped so that this rolling is reproduced exactly, at a constant angular velocity ratio, whatever the position of the teeth.

::: definition Metric spur-gear nomenclature {#def-nomenclature}
For a spur gear with $z$ teeth:
- the **module** is $m = d/z$, the pitch diameter per tooth, in millimetres; meshing gears must have the same module;
- the **pitch diameter** is $d = mz$ and the **circular pitch**, the distance between corresponding points of adjacent teeth along the pitch circle, is $p = \pi d/z = \pi m$;
- the **pressure angle** $\phi$ is the angle between the line of action (the common normal to the tooth profiles at the contact point) and the common tangent to the pitch circles; the standard value is $\phi = 20°$;
- the **base circle**, from which the involute profile is unwound, has radius $r_b = (d/2)\cos\phi$, and the **base pitch** is $p_b = p\cos\phi = \pi m\cos\phi$;
- for standard full-depth teeth (ISO 53 basic rack) the **addendum** (pitch circle to tip) is $h_a = m$ and the **dedendum** (pitch circle to root) is $h_f = 1.25m$, so the tip diameter is $d_a = d + 2m$, the root diameter $d_f = d - 2.5m$, the whole depth $2.25m$ and the bottom clearance $0.25m$;
- two standard gears mesh at the **centre distance** $C = (d_P + d_G)/2 = m(z_P + z_G)/2$.
:::

The module plays the role of a size scale: doubling $m$ at a fixed number of teeth doubles every linear dimension of the tooth. Preferred values are standardised in ISO 54 — first choice $1$, $1.25$, $1.5$, $2$, $2.5$, $3$, $4$, $5$, $6$, $8$, $10\ \mathrm{mm}$ and so on, with a second series ($1.75$, $2.25$, $2.75$, $3.5$, $4.5$, …) to be used only if necessary. In the United States gears are also specified by the **diametral pitch** $P = z/d$ in teeth per inch, the reciprocal concept: $m = 25.4/P$ millimetres.

The involute profile has two properties that the rest of this chapter relies on (both are proved in [[mechanisms/gears]]). First, the contact point always lies on one straight line, the **line of action**, tangent to both base circles and inclined at $\phi$ to the pitch-line tangent, so the force between frictionless teeth always acts along that line, at the constant angle $\phi$. Second, the radius of curvature of an involute at any point equals the length of the tangent from that point to the base circle; at the pitch point it is $(d/2)\sin\phi$. Small pinions are limited by **undercutting**: a standard 20° full-depth pinion generated by a rack cutter needs at least $2/\sin^2\phi = 17.1$, i.e. 18, teeth to avoid it.

### Contact ratio

For smooth running, a new pair of teeth must come into contact before the previous pair leaves. The **contact ratio** $m_c$ is the average number of tooth pairs in contact.

::: proposition Contact ratio of external spur gears {#prop-contact-ratio}
For two external spur gears with tip radii $r_{aP}$, $r_{aG}$, base radii $r_{bP}$, $r_{bG}$, working pressure angle $\phi$ and centre distance $C$, the length of the path of contact is
$$
Z = \sqrt{r_{aP}^2 - r_{bP}^2} + \sqrt{r_{aG}^2 - r_{bG}^2} - C\sin\phi,
$$ {#eq-path}
and the contact ratio is
$$
m_c = \frac{Z}{p_b} = \frac{Z}{\pi m\cos\phi}.
$$ {#eq-contact-ratio}
:::

::: proof
**Assumptions.** Involute teeth, rigid and perfectly spaced; contact begins and ends where the line of action meets the two tip circles (no tip relief, no interference).

The line of action is the common internal tangent of the two base circles; let $T_P$ and $T_G$ be its points of tangency. The distance $T_PT_G$ is the projection of the centre line on the line of action. The centre line has length $C$ and makes the angle $90° - \phi$ with the line of action, so $T_PT_G = C\sin\phi$.

Contact starts at the point $A$ where the gear's tip circle cuts the line of action and ends at the point $B$ where the pinion's tip circle cuts it. Because $O_GT_G$ is perpendicular to the line of action, the right triangle $O_G T_G A$ gives $T_GA = \sqrt{r_{aG}^2 - r_{bG}^2}$; similarly $T_PB = \sqrt{r_{aP}^2 - r_{bP}^2}$. The two segments overlap by $AB$, so
$$
AB = T_GA + T_PB - T_PT_G = \sqrt{r_{aP}^2 - r_{bP}^2} + \sqrt{r_{aG}^2 - r_{bG}^2} - C\sin\phi,
$$
which is [[#eq-path]].

Successive involute profiles of one gear are parallel curves, all normal to the line of action where they cross it, and they are spaced along every common normal by the arc between them on the base circle, the base pitch $p_b = 2\pi r_b/z = \pi m\cos\phi$. So one pair of teeth stays in contact while the contact point travels the length $Z$, and a new pair starts every $p_b$; on average $Z/p_b$ pairs are in contact, which is [[#eq-contact-ratio]].
:::

A contact ratio of $1.6$ means that for 60 % of the time two pairs of teeth share the load and for 40 % one pair carries it alone. Gears should not be designed with contact ratios below about $1.2$; standard 20° gears in the usual range of tooth numbers have $m_c$ between about $1.4$ and $1.8$. A contact ratio above 1 is also why the "tip load" assumed by Lewis below is conservative: when one tooth is loaded at its tip, another pair is usually also in mesh.

::: example Geometry and contact ratio of a gear pair {#ex-geometry}
A pinion with $z_P = 20$ teeth drives a gear with $z_G = 40$ teeth; module $m = 4\ \mathrm{mm}$, $\phi = 20°$, standard full-depth teeth at the standard centre distance. Find the pitch, tip, root and base diameters, the centre distance and the contact ratio.
::: solution
**Diameters.** $d_P = mz_P = 80\ \mathrm{mm}$, $d_G = 160\ \mathrm{mm}$. Tip diameters $d_a = d + 2m$: $88$ and $168\ \mathrm{mm}$, so $r_{aP} = 44\ \mathrm{mm}$, $r_{aG} = 84\ \mathrm{mm}$. Root diameters $d - 2.5m$: $70$ and $150\ \mathrm{mm}$. Base radii $r_b = (d/2)\cos 20°$: $r_{bP} = 40\times0.93969 = 37.588\ \mathrm{mm}$, $r_{bG} = 75.175\ \mathrm{mm}$.

**Centre distance.** $C = (80 + 160)/2 = 120\ \mathrm{mm}$, and $C\sin\phi = 120\times0.34202 = 41.042\ \mathrm{mm}$.

**Path of contact.** From [[#eq-path]],
$$
Z = \sqrt{44^2 - 37.588^2} + \sqrt{84^2 - 75.175^2} - 41.042 = 22.873 + 37.479 - 41.042 = 19.309\ \mathrm{mm}.
$$
**Contact ratio.** $p_b = \pi\times4\times\cos20° = 11.809\ \mathrm{mm}$, so $m_c = 19.309/11.809 = 1.64$.

**Sanity check.** The value lies in the usual band $1.4$–$1.8$ and above the minimum of about $1.2$. A larger module with the same tooth numbers scales $Z$ and $p_b$ alike and leaves $m_c$ unchanged; more teeth (at the same module) would raise it.
:::
:::

## Force analysis of a mesh

The free-body diagram of a spur pinion shows: the driving torque $T$ from its shaft; the force $W$ exerted on the pinion tooth by the gear tooth, acting at the pitch point along the line of action; and the reaction of the shaft at the gear centre, equal and opposite to $W$. The friction force between the teeth is small (the coefficient in a lubricated mesh is of the order of $0.05$, and it reverses direction at the pitch point) and is neglected in the force analysis. It is convenient to resolve $W$ into a **tangential** component $W_t$, perpendicular to the line of centres, which transmits the torque, and a **radial** component $W_r$, along the line of centres, which only pushes the gears apart.

::: proposition Forces in a spur-gear mesh {#prop-forces}
For a spur gear of pitch diameter $d$ transmitting a torque $T$ (or a power $H$ at pitch-line velocity $V$), with frictionless involute teeth of pressure angle $\phi$,
$$
W_t = \frac{2T}{d} = \frac{H}{V}, \qquad W_r = W_t\tan\phi, \qquad W = \frac{W_t}{\cos\phi},
$$ {#eq-spur-forces}
where $V = \omega d/2 = \pi d n/60$ for $n$ in rev/min. The same $W_t$ acts on both gears of the pair; the torques are in the ratio of the pitch diameters, $T_G/T_P = d_G/d_P = m_G$.
:::

::: proof
**Assumptions.** Frictionless teeth, rigid gears, the load carried at the pitch point (where the moment arm of $W_t$ is exactly $d/2$; at other contact points the involute geometry gives the same torque, because the moment arm of $W$ about the gear centre is always the base radius), steady rotation so that the gear's angular acceleration is zero.

The tooth force acts along the line of action, inclined at $\phi$ to the pitch-line tangent, so its components are $W_t = W\cos\phi$ and $W_r = W\sin\phi$, which gives $W_r = W_t\tan\phi$ and $W = W_t/\cos\phi$. Moments about the gear centre: $W_r$ passes through the centre and $W_t$ has arm $d/2$, so for equilibrium of the steadily rotating gear $T = W_t d/2$. The power is $H = T\omega = W_t(d/2)\omega = W_tV$. By Newton's third law the gear tooth carries the same force reversed; its torque is $W_t d_G/2$, so $T_G/T_P = d_G/d_P$.
:::

With $H$ in watts and $V$ in m/s, $W_t$ comes out in newtons. The **direction** of the forces follows from the free body: on the driving pinion, $W_t$ opposes the rotation; on the driven gear it acts in the direction of rotation; on both, $W_r$ points towards the gear's own centre.

::: example Tooth forces in a reducer {#ex-forces}
The pinion of [[#ex-geometry]] ($d_P = 80\ \mathrm{mm}$) is driven by an electric motor delivering $H = 15\ \mathrm{kW}$ at $n = 1440\ \mathrm{rev/min}$. Find the transmitted load, the radial load, the total tooth force, the pitch-line velocity and the output torque.
::: solution
**Torque.** $\omega = 2\pi\times1440/60 = 150.80\ \mathrm{rad/s}$, so $T_P = H/\omega = 15\,000/150.80 = 99.47\ \mathrm{N\,m}$.

**Transmitted load.** $W_t = 2T_P/d_P = 2\times99.47/0.080 = 2487\ \mathrm{N}$. Check by power: $V = \omega d_P/2 = 150.80\times0.040 = 6.032\ \mathrm{m/s}$, and $H/V = 15\,000/6.032 = 2487\ \mathrm{N}$.

**Radial and total load.** $W_r = 2487\tan 20° = 905\ \mathrm{N}$; $W = 2487/\cos20° = 2646\ \mathrm{N}$.

**Output.** $T_G = W_t d_G/2 = 2487\times0.080 = 198.9\ \mathrm{N\,m}$ at $1440/2 = 720\ \mathrm{rev/min}$ — twice the torque at half the speed, as it must be with friction neglected.

**Sanity check.** The pinion shaft must carry the resultant $2.65\ \mathrm{kN}$ as a bending load (shared between its bearings) in addition to the torque; the radial component is $36$ % of the tangential one ($\tan20° = 0.364$).
:::
:::

### Helical, bevel and worm gears

**Helical gears** have teeth cut on a helix of angle $\psi$ (measured at the pitch cylinder from the axis). Contact starts at one end of a tooth and spreads gradually across the face, so helical gears run more quietly and carry more load than spur gears of the same size. Two pressure angles now matter: the **normal** pressure angle $\phi_n$, in a plane perpendicular to the tooth, which is the angle of the cutter (usually $20°$), and the **transverse** pressure angle $\phi_t$, in the plane of rotation. Likewise the normal module $m_n$ (the cutter's) and the transverse module $m_t = m_n/\cos\psi$, with $d = m_t z$.

::: proposition Forces on a helical gear {#prop-helical}
For a helical gear with helix angle $\psi$ and normal pressure angle $\phi_n$, the transverse pressure angle satisfies
$$
\tan\phi_n = \tan\phi_t\cos\psi,
$$ {#eq-helical-angle}
and the tooth force has components
$$
W_t = \frac{2T}{d}, \qquad W_r = W_t\tan\phi_t, \qquad W_a = W_t\tan\psi, \qquad W = \frac{W_t}{\cos\phi_n\cos\psi}.
$$ {#eq-helical-forces}
:::

::: proof
**Assumptions.** Frictionless teeth; the resultant force acts normal to the tooth surface at the pitch cylinder.

The force $W$ is normal to the tooth surface. In the normal plane it makes the angle $\phi_n$ with the pitch-cylinder tangent plane, so its radial component is $W_r = W\sin\phi_n$ and its component in the tangent plane is $W\cos\phi_n$. In the tangent plane, that component is perpendicular to the helix, which is inclined at $\psi$ to the axis, so it splits into $W_t = W\cos\phi_n\cos\psi$ (circumferential) and $W_a = W\cos\phi_n\sin\psi$ (axial). Hence $W = W_t/(\cos\phi_n\cos\psi)$ and $W_a = W_t\tan\psi$. In the transverse plane the force components are $W_t$ and $W_r$, so $\tan\phi_t = W_r/W_t = \sin\phi_n/(\cos\phi_n\cos\psi) = \tan\phi_n/\cos\psi$, which is [[#eq-helical-angle]]; and $W_r = W_t\tan\phi_t$. As for the spur gear, the torque is $W_t d/2$ because $W_r$ and $W_a$ have no moment about the axis.
:::

The axial thrust $W_a$ is the price of helical teeth: it has to be taken by a thrust-capable bearing ([[machine-design/bearings]]), or cancelled by a double-helical (herringbone) gear whose two halves have opposite hands. Helix angles of $15$–$30°$ are usual.

::: example Helical version of the reducer {#ex-helical}
The pinion of [[#ex-forces]] is replaced by a helical pinion with $\phi_n = 20°$ and $\psi = 25°$, carrying the same $W_t = 2487\ \mathrm{N}$. Find $\phi_t$ and the force components. If the normal module is $4\ \mathrm{mm}$ and $z_P = 20$, what is the pitch diameter?
::: solution
**Transverse pressure angle.** $\tan\phi_t = \tan20°/\cos25° = 0.36397/0.90631 = 0.40160$, so $\phi_t = 21.88°$.

**Forces.** $W_r = 2487\times0.40160 = 999\ \mathrm{N}$; $W_a = 2487\tan25° = 2487\times0.46631 = 1160\ \mathrm{N}$; $W = 2487/(\cos20°\cos25°) = 2487/0.85165 = 2920\ \mathrm{N}$. Check: $\sqrt{2487^2 + 999^2 + 1160^2} = 2920\ \mathrm{N}$.

**Diameter.** $m_t = 4/\cos25° = 4.414\ \mathrm{mm}$, $d_P = 4.414\times20 = 88.3\ \mathrm{mm}$ — a helical gear with the same normal module and tooth count is larger than the spur gear, so for the same torque $W_t$ would actually fall slightly; here we kept $W_t$ fixed to compare the components.

**Sanity check.** The axial thrust is nearly half the transmitted load; the bearing arrangement of the shaft must locate it axially.
:::
:::

**Straight bevel gears** connect intersecting shafts; their pitch surfaces are cones. The forces are usually computed at the midpoint of the face, where the pitch radius is $r_{av}$: $W_t = T/r_{av}$, and with pitch-cone angle $\gamma$ of the gear considered, $W_r = W_t\tan\phi\cos\gamma$ and $W_a = W_t\tan\phi\sin\gamma$ (Budynas and Nisbett, §13-15). **Worm gearing** connects crossed shafts at large ratios in one stage; because the worm thread slides along the wheel tooth, friction is no longer negligible. With lead angle $\lambda$, normal pressure angle $\phi_n$ and coefficient of friction $f$, the same force resolution with a friction force added gives the efficiency of a worm driving its wheel,
$$
e = \frac{\cos\phi_n - f\tan\lambda}{\cos\phi_n + f\cot\lambda},
$$ {#eq-worm-efficiency}
(Budynas and Nisbett, §13-17), which falls steeply at small lead angles; a worm drive with a small lead angle may be self-locking. By contrast, NASA tests on spur gears by N. E. Anderson and S. H. Loewenthal (around 1980) found mesh efficiencies generally above 98 % except at very light loads, with no-load (churning and windage) losses a significant part of the total. Bevel and worm gears are rated by their own AGMA and ISO standards and are not treated further here.

## Bending stress: the Lewis equation

Look at a single tooth from the side. It is a short cantilever fixed to the rim, wider at the root than at the tip, loaded at its flank by the force $W$ along the line of action. The worst case Lewis considered is the whole load at the tip of one tooth. The radial component $W_r$ compresses the tooth slightly and the tangential component $W_t$ bends it; the bending dominates. Where is the critical section? Lewis's insight was that a cantilever whose depth varies so that the bending stress is the same at every section — a beam of uniform strength — has a parabolic profile. Inscribe such a parabola in the tooth, with its vertex at the point where the load line crosses the tooth centreline and its sides tangent to the root fillets: the tooth is stronger than the parabola everywhere except at the two tangent points, so the section through those points is the weakest.

::: proposition Lewis bending equation {#prop-lewis}
Let a spur-gear tooth of face width $F$ and module $m$ carry the transmitted load $W_t$ at its tip, and let the inscribed parabola touch the root fillets at the section of thickness $t$, a height $l$ below the load point. The bending stress at that section is
$$
\sigma = \frac{W_t}{F\,m\,Y}, \qquad Y = \frac{2x}{3m}, \quad x = \frac{t^2}{4l},
$$ {#eq-lewis}
where the **Lewis form factor** $Y$ depends only on the shape of the tooth — on the number of teeth and the tooth system — and not on its size.
:::

::: proof
**Assumptions.** (1) The full load is carried by one tooth and acts at its tip (no load sharing). (2) Only the tangential component $W_t$ is considered; the compression from $W_r$ is neglected. (3) The load is uniformly distributed across the face width $F$. (4) The tooth is a cantilever and elementary beam theory applies, $\sigma = Mc/I$, ignoring the stress concentration in the root fillet. (5) The gears are rigid and accurately made, so there are no dynamic loads.

At the critical section the bending moment is $M = W_t l$ and the section is a rectangle $F \times t$, with $I/c = Ft^2/6$. So
$$
\sigma = \frac{6W_tl}{Ft^2}.
$$
A cantilever of rectangular section with stress $6W_t\lambda/(F t(\lambda)^2)$ at a distance $\lambda$ from the load is of uniform strength when $t(\lambda)^2 \propto \lambda$, i.e. its half-thickness grows as the square root of the distance: a parabola with vertex at the load point. The parabola inscribed in the tooth touches it at the critical section, half-thickness $t/2$ at distance $l$ below the vertex.

Now draw the line from the vertex to the tangent point and, from the tangent point, a line perpendicular to it, meeting the tooth centreline at a distance $x$ below the critical section. The two right triangles formed with the centreline are similar: one has legs $l$ (along the centreline) and $t/2$, the other $t/2$ and $x$. Hence
$$
\frac{t/2}{x} = \frac{l}{t/2}, \qquad x = \frac{t^2}{4l},
$$
so $t^2/l = 4x$ and
$$
\sigma = \frac{6W_t}{F}\cdot\frac{l}{t^2} = \frac{6W_t}{4Fx} = \frac{3W_t}{2Fx}.
$$
Multiplying numerator and denominator by the module, $\sigma = W_t/\big(F m \cdot \tfrac{2x}{3m}\big) = W_t/(FmY)$ with $Y = 2x/(3m)$. Because every dimension of a tooth of given tooth number and form scales with $m$, $x/m$ — and therefore $Y$ — is independent of the module.
:::

The form factor is found by drawing the tooth (or computing its geometry) and constructing the parabola. Its values for the standard tooth system, as tabulated by Budynas and Nisbett (Table 14-2, for $\phi = 20°$ full-depth teeth with load at the tip), are:

| $z$ | $Y$ | $z$ | $Y$ | $z$ | $Y$ | $z$ | $Y$ |
|---|---|---|---|---|---|---|---|
| 12 | 0.245 | 18 | 0.309 | 26 | 0.346 | 60 | 0.422 |
| 13 | 0.261 | 19 | 0.314 | 28 | 0.353 | 75 | 0.435 |
| 14 | 0.277 | 20 | 0.322 | 30 | 0.359 | 100 | 0.447 |
| 15 | 0.290 | 21 | 0.328 | 34 | 0.371 | 150 | 0.460 |
| 16 | 0.296 | 22 | 0.331 | 38 | 0.384 | 300 | 0.472 |
| 17 | 0.303 | 24 | 0.337 | 43 | 0.397 | 400 | 0.480 |
|  |  |  |  | 50 | 0.409 | rack | 0.485 |

For tooth numbers between the entries, interpolate linearly: for $z = 40$, $Y = 0.384 + \tfrac{2}{5}(0.397 - 0.384) = 0.389$. (This $Y$ is defined with respect to the module. Some older texts use $y = Y/\pi$, defined with respect to the circular pitch, so that $\sigma = W_t/(Fpy)$; check which one a table gives.)

::: widget plot
f: 0.245 + 0.016*(x - 12) - 0.003*max(0, x - 14) - 0.007*max(0, x - 15) + 0.001*max(0, x - 16) - 0.001*max(0, x - 17) - 0.001*max(0, x - 18) + 0.003*max(0, x - 19) - 0.002*max(0, x - 20) - 0.003*max(0, x - 21) + 0.0015*max(0, x - 24) - 0.001*max(0, x - 26) - 0.0005*max(0, x - 28) + 0.00025*max(0, x - 34) - 0.00065*max(0, x - 38) - 0.000885714*max(0, x - 43) - 0.000414286*max(0, x - 50) - 0.000433333*max(0, x - 60) - 0.000386667*max(0, x - 75) - 0.00022*max(0, x - 100); 0.485
x: 10, 155
y: 0.2, 0.5
points: 12,0.245; 13,0.261; 14,0.277; 15,0.29; 16,0.296; 17,0.303; 18,0.309; 19,0.314; 20,0.322; 21,0.328; 22,0.331; 24,0.337; 26,0.346; 28,0.353; 30,0.359; 34,0.371; 38,0.384; 43,0.397; 50,0.409; 60,0.422; 75,0.435; 100,0.447; 150,0.46
labels: Y(z)\ \text{(linear interpolation)}; \text{rack, } Y = 0.485
tangent: 20
caption: The Lewis form factor $Y$ against the number of teeth $z$ for 20° full-depth teeth; the dots are the tabulated values (Budynas and Nisbett, Table 14-2) and the line joins them linearly; the horizontal line is the rack value. Drag the tangent point to see how fast $Y$ changes: between 12 and 20 teeth it rises by about 0.01 per tooth, so a small pinion is markedly weaker in bending; beyond about 50 teeth extra teeth gain very little. Teeth below 18 on a pinion cut by a rack cutter are undercut, which thins the root further.
:::

Two corrections turned Lewis's formula into a practical design equation. The first was for **speed**. Teeth that are not perfectly spaced or profiled meet with small impacts, and the dynamic tooth load grows with the pitch-line velocity. An empirical **velocity factor**, which Budynas and Nisbett attribute to Carl G. Barth in the nineteenth century, multiplies the Lewis stress:
$$
\sigma = \frac{K_vW_t}{FmY}, \qquad K_v = \frac{3.05 + V}{3.05}\ \ \text{(cast iron, cast profile)}, \qquad K_v = \frac{6.1 + V}{6.1}\ \ \text{(cut or milled profile)},
$$ {#eq-barth}
with $V$ in m/s. For more accurately made gears the same source gives the later AGMA forms $K_v = (3.56 + \sqrt V)/3.56$ for hobbed or shaped profiles and $K_v = (5.56 + \sqrt V)/5.56$ for shaved or ground profiles. These factors are crude — they contain nothing about the mass of the gears or the stiffness of the teeth — but they capture the essential trend. (In older books the velocity factor is written as the reciprocal, $K_v < 1$, dividing an allowable stress instead of multiplying the applied one.)

The second correction was for **fatigue**. The Lewis stress is a nominal stress; the fillet at the root concentrates it, and the tooth is loaded once per revolution (repeatedly, from zero to maximum, for a gear driving in one direction; fully reversed for an idler gear, which is bent first one way and then the other). Today these corrections are made by the geometry factor and the strength data of the rating standards, below. The Lewis equation with $K_v$ remains useful for a quick first estimate of the size of a gear — and the structure $W_t/(FmY)$ survives inside the standards.

A practical proportion for spur gears is a face width of $3$ to $5$ circular pitches, $3\pi m \le F \le 5\pi m$ (Budynas and Nisbett, §14-1): narrower gears waste the shaft and bearing arrangement, wider ones are hard to align so that the load spreads evenly across the face.

::: example Lewis bending stress in the reducer {#ex-lewis}
The reducer of [[#ex-forces]] ($m = 4\ \mathrm{mm}$, $z_P = 20$, $z_G = 40$, $W_t = 2487\ \mathrm{N}$, $V = 6.032\ \mathrm{m/s}$) has hobbed gears of face width $F = 40\ \mathrm{mm}$. Find the Lewis bending stress in the pinion and in the gear, and the factor of safety against yield if both are made of cold-drawn AISI 1040 steel ($S_y = 490\ \mathrm{MPa}$, Budynas and Nisbett Table A-20).
::: solution
**Velocity factor.** Hobbed profile: $K_v = (3.56 + \sqrt{6.032})/3.56 = (3.56 + 2.456)/3.56 = 1.690$.

**Face width.** $F/(\pi m) = 40/12.57 = 3.2$ circular pitches — inside the range $3$–$5$.

**Pinion.** $Y = 0.322$ for $z = 20$:
$$
\sigma_P = \frac{K_vW_t}{FmY} = \frac{1.690\times2487}{40\times4\times0.322} = \frac{4203}{51.52} = 81.6\ \mathrm{MPa}.
$$
**Gear.** $Y = 0.389$ for $z = 40$ (interpolated): $\sigma_G = 81.6\times0.322/0.389 = 67.5\ \mathrm{MPa}$.

**Factor of safety against yield.** $n = 490/81.6 = 6.0$ for the pinion.

**Sanity check.** Without $K_v$ the pinion stress would be $48.3\ \mathrm{MPa}$: speed adds 69 %. The pinion is the more highly stressed member in bending because its teeth are thinner at the root (smaller $Y$) and it makes twice as many load cycles. A factor of 6 on yield looks generous, but the tooth is loaded more than $10^9$ times in a long life and the root fillet concentrates the stress; the rating method below shows whether that is enough.
:::
:::

## Contact stress: Hertz theory

The mating flanks of two teeth touch along a line across the face. Near the pitch point each flank is, locally, a cylinder whose radius is the radius of curvature of the involute there; the contact of two teeth is therefore, to a good approximation, the contact of two parallel cylinders pressed together by the normal force $W$. Under load the cylinders flatten into a narrow rectangular band of contact, and the pressure across that band is far higher than any bending stress in the tooth.

::: proposition Hertz contact of two parallel cylinders {#prop-hertz}
Two long parallel cylinders of radii $r_1$, $r_2$, length $l$, Young's moduli $E_1$, $E_2$ and Poisson's ratios $\nu_1$, $\nu_2$ are pressed together by a force $F$. They touch over a band of half-width
$$
b = \sqrt{\frac{4F}{\pi l}\cdot\frac{\dfrac{1 - \nu_1^2}{E_1} + \dfrac{1 - \nu_2^2}{E_2}}{\dfrac{1}{r_1} + \dfrac{1}{r_2}}},
$$ {#eq-hertz-b}
the pressure across the band is elliptical, $p(x) = p_{\max}\sqrt{1 - x^2/b^2}$, and its maximum is
$$
p_{\max} = \frac{2F}{\pi bl}, \qquad p_{\max}^2 = \frac{F}{\pi l}\cdot\frac{\dfrac{1}{r_1} + \dfrac{1}{r_2}}{\dfrac{1 - \nu_1^2}{E_1} + \dfrac{1 - \nu_2^2}{E_2}}.
$$ {#eq-hertz-p}
:::

::: proof
**Assumptions.** (1) The materials are homogeneous, isotropic and linearly elastic. (2) The contact half-width is small compared with the radii, so each body may be treated, for computing its deformation, as an elastic half-space (here a half-plane, since the cylinders are long and in plane strain). (3) The surfaces are smooth and frictionless, so only normal pressure is transmitted. (4) The axes are parallel and the load is uniform along the length.

**Geometry.** Take $x$ across the band, centred on the first point of contact. Before loading, the gap between the two surfaces is approximately $h(x) = x^2/(2r_1) + x^2/(2r_2) = x^2/(2R)$ with $1/R = 1/r_1 + 1/r_2$ (each circle approximated by its osculating parabola). Under load, the bodies approach by a rigid-body distance $\delta$ and the surfaces are pressed in by elastic displacements $u_1(x)$ and $u_2(x)$ (positive into each body). Inside the band the surfaces coincide:
$$
u_1(x) + u_2(x) = \delta - \frac{x^2}{2R}, \qquad\text{so}\qquad \frac{d(u_1 + u_2)}{dx} = -\frac{x}{R} \quad (|x| < b).
$$

**Displacement of a half-plane.** For a half-plane in plane strain loaded by a surface pressure $p(s)$, the slope of the surface normal displacement is (Johnson, *Contact Mechanics*, 1985, §2.7)
$$
\frac{du}{dx} = -\frac{2(1 - \nu^2)}{\pi E}\,\mathrm{PV}\!\!\int_{-b}^{b}\frac{p(s)}{x - s}\,ds,
$$
where PV denotes the Cauchy principal value. Try the elliptical pressure $p(s) = p_{\max}\sqrt{1 - s^2/b^2}$. With $s = b\tau$, and the standard principal-value integral $\mathrm{PV}\!\int_{-1}^{1}\sqrt{1 - \tau^2}/(\xi - \tau)\,d\tau = \pi\xi$ for $|\xi| < 1$,
$$
\mathrm{PV}\!\!\int_{-b}^{b}\frac{p(s)}{x - s}\,ds = p_{\max}\,\pi\frac{x}{b}, \qquad \frac{du_i}{dx} = -\frac{2(1 - \nu_i^2)}{E_i}\cdot\frac{p_{\max}x}{b}.
$$
The slope is linear in $x$, exactly as the geometry requires — which is why the elliptical distribution is the solution.

**Matching.** Adding for the two bodies and equating to $-x/R$:
$$
\frac{2p_{\max}}{b}\left(\frac{1 - \nu_1^2}{E_1} + \frac{1 - \nu_2^2}{E_2}\right) = \frac{1}{R}, \qquad\text{so}\qquad p_{\max} = \frac{b}{2R\Sigma}, \quad \Sigma = \frac{1 - \nu_1^2}{E_1} + \frac{1 - \nu_2^2}{E_2}.
$$
**Equilibrium.** The pressure must balance the load: $F = l\int_{-b}^{b}p\,dx = l\,p_{\max}\,\pi b/2$ (the area of a half-ellipse), so $p_{\max} = 2F/(\pi bl)$.

**Solving.** Equating the two expressions for $p_{\max}$: $b^2 = 4FR\Sigma/(\pi l)$, which is [[#eq-hertz-b]] with $R = 1/(1/r_1 + 1/r_2)$. Then $p_{\max}^2 = b^2/(4R^2\Sigma^2) = F/(\pi lR\Sigma)$, which is [[#eq-hertz-p]]. The pressure falls to zero at $x = \pm b$, consistent with smooth surfaces separating tangentially.
:::

Two features of this result shape gear design. First, $p_{\max} \propto \sqrt F$: the contact stress grows only as the square root of the load. Second, the most highly stressed point is not on the surface. Beneath the contact the material is in triaxial compression, and the maximum shear stress, about $0.30\,p_{\max}$, occurs at a depth of about $0.78\,b$ (Johnson, §4.2). Contact fatigue cracks start near that depth or at surface defects, grow, and release the small flakes that leave a **pit**. Because the stress is a compressive pressure, the "contact stress" of gear rating is compared with an empirical **surface fatigue strength**, found from gear tests, not with the tensile or yield strength.

The two elastic constants of each material enter only in the combination $\Sigma$, so AGMA defines the **elastic coefficient**
$$
Z_E = \sqrt{\frac{1}{\pi\left(\dfrac{1 - \nu_P^2}{E_P} + \dfrac{1 - \nu_G^2}{E_G}\right)}},
$$ {#eq-ze}
in $\sqrt{\mathrm{MPa}}$ when $E$ is in MPa (written $C_p$ in US customary units). For steel on steel with $E = 207\ \mathrm{GPa}$ and $\nu = 0.30$:
$$
Z_E = \sqrt{\frac{1}{\pi\times2\times0.91/207\,000}} = \sqrt{36\,200\ \mathrm{MPa}} = 190.3\ \sqrt{\mathrm{MPa}},
$$
and Budynas and Nisbett (Table 14-8) tabulate $191\ \sqrt{\mathrm{MPa}}$ (from $2300\ \sqrt{\mathrm{psi}}$). A cast-iron or bronze gear, with a lower modulus, gives a smaller $Z_E$ and a lower contact stress for the same load — but also has a much lower surface strength.

### Applying Hertz to gear teeth

::: proposition Contact stress at the pitch point {#prop-gear-contact}
For an external spur pair with pinion pitch diameter $d_P$, speed ratio $m_G = d_G/d_P$, pressure angle $\phi$, face width $F$ and transmitted load $W_t$, the Hertz contact stress at the pitch point is
$$
\sigma_C = Z_E\sqrt{\frac{W_t}{F\cos\phi}\left(\frac{1}{r_1} + \frac{1}{r_2}\right)} = Z_E\sqrt{\frac{W_t}{d_PF\,Z_I}}, \qquad r_1 = \frac{d_P\sin\phi}{2},\quad r_2 = \frac{d_G\sin\phi}{2},
$$ {#eq-gear-contact}
where the **pitting geometry factor** is
$$
Z_I = \frac{\cos\phi\sin\phi}{2}\cdot\frac{m_G}{m_G + 1}.
$$ {#eq-zi}
:::

::: proof
**Assumptions.** Those of [[#prop-hertz]]; one pair of teeth carries the load (the pitch point usually lies in the zone of single-tooth contact for ordinary contact ratios); load uniform across the face; frictionless teeth.

The normal force between the teeth is $W = W_t/\cos\phi$ ([[#eq-spur-forces]]), acting over the length $F$. The radius of curvature of an involute at a point is its tangent distance to the base circle; at the pitch point this is $\sqrt{(d/2)^2 - r_b^2} = (d/2)\sin\phi$, giving $r_1$ and $r_2$. Substituting $F \to W_t/\cos\phi$, $l \to F$ in [[#eq-hertz-p]] and using [[#eq-ze]] gives the first form. For the second,
$$
\frac{1}{r_1} + \frac{1}{r_2} = \frac{2}{\sin\phi}\left(\frac{1}{d_P} + \frac{1}{m_Gd_P}\right) = \frac{2}{d_P\sin\phi}\cdot\frac{m_G + 1}{m_G},
$$
so
$$
\frac{W_t}{F\cos\phi}\left(\frac{1}{r_1} + \frac{1}{r_2}\right) = \frac{W_t}{d_PF}\cdot\frac{2(m_G + 1)}{m_G\cos\phi\sin\phi} = \frac{W_t}{d_PF\,Z_I}.
$$
:::

For an internal gear (ring gear) the two flanks curve the same way, $1/r_1 + 1/r_2$ becomes $1/r_1 - 1/r_2$ and $m_G/(m_G + 1)$ becomes $m_G/(m_G - 1)$ — a conforming contact with lower stress (see [[#ex-internal]]). For 20° teeth, $\cos\phi\sin\phi/2 = 0.1607$; for $m_G = 2$, $Z_I = 0.1071$. In AGMA's US-customary notation $Z_I$ is written $I$.

The form $\sigma_C = Z_E\sqrt{W_t/(d_PFZ_I)}$ shows the main design levers. Since $W_t = 2T/d_P$, $\sigma_C \propto \sqrt{T/(d_P^2F)}$: the surface durability depends on the pinion diameter and face width — the size of the gear — and **not** on the module. The bending stress, by contrast, depends strongly on the module. This difference is the subject of the next figure.

::: widget plot
f: 190*sqrt(2000*T/(D*D*W*0.1205)); 2000*T*x/(W*D*D*(0.245 + 0.016*(x - 12) - 0.003*max(0, x - 14) - 0.007*max(0, x - 15) + 0.001*max(0, x - 16) - 0.001*max(0, x - 17) - 0.001*max(0, x - 18) + 0.003*max(0, x - 19) - 0.002*max(0, x - 20) - 0.003*max(0, x - 21) + 0.0015*max(0, x - 24) - 0.001*max(0, x - 26) - 0.0005*max(0, x - 28) + 0.00025*max(0, x - 34) - 0.00065*max(0, x - 38) - 0.000885714*max(0, x - 43) - 0.000414286*max(0, x - 50) - 0.000433333*max(0, x - 60)))
x: 14, 60
y: 0, 1200
sliders: T=200:50:500:10, D=80:40:160:5, W=40:15:80:1
labels: \sigma_C\ \text{(Hertz, pitch point)}; \sigma\ \text{(Lewis, } K_v = 1)
caption: Contact and bending stress (MPa) in a 20° steel pinion against its number of teeth $z_P$, at a fixed pinion pitch diameter $d_P$ (slider $D$, mm), torque $T$ (N·m) and face width $F$ (slider $W$, mm), for a speed ratio of 3 ($Z_I = 0.1205$, $Z_E = 190\ \sqrt{\mathrm{MPa}}$). At fixed diameter the module is $m = d_P/z_P$. The contact stress does not depend on $z_P$ at all, while the bending stress rises as the teeth get finer, roughly in proportion to $z_P/Y$. Try halving $T$: the bending stress halves, the contact stress falls only by $1/\sqrt2$. Then raise $D$: both fall, the contact stress as $1/d_P$. For steel gears the allowable contact stress is typically three to four times the allowable bending stress, so a well-balanced design uses the largest number of teeth (finest module) that bending still allows — that gives smoother, quieter running for the same pitting resistance.
:::

::: example Contact stress in the reducer {#ex-contact}
For the reducer of [[#ex-lewis]] (steel pinion and gear, $E = 207\ \mathrm{GPa}$, $\nu = 0.30$; $d_P = 80\ \mathrm{mm}$, $d_G = 160\ \mathrm{mm}$, $F = 40\ \mathrm{mm}$, $W_t = 2487\ \mathrm{N}$, $K_v = 1.690$), find the radii of curvature at the pitch point, the contact half-width and the contact stress including the velocity factor.
::: solution
**Radii.** $r_1 = (80/2)\sin20° = 13.681\ \mathrm{mm}$, $r_2 = 27.362\ \mathrm{mm}$; $1/r_1 + 1/r_2 = 0.07310 + 0.03655 = 0.10964\ \mathrm{mm^{-1}}$, $R = 9.121\ \mathrm{mm}$.

**Load.** With the velocity factor applied to the load as in [[#eq-barth]]: $K_vW_t = 1.690\times2487 = 4203\ \mathrm{N}$, and the normal load is $4203/\cos20° = 4472\ \mathrm{N}$ on $40\ \mathrm{mm}$ of face.

**Contact stress.** From [[#eq-gear-contact]],
$$
\sigma_C = 190.3\sqrt{\frac{4203}{40\times0.93969}\times0.10964} = 190.3\sqrt{12.26} = 666\ \mathrm{MPa}.
$$
The second form gives the same: $Z_I = 0.1607\times2/3 = 0.10713$ and $190.3\sqrt{4203/(80\times40\times0.10713)} = 190.3\times3.501 = 666\ \mathrm{MPa}$.

**Half-width.** From [[#eq-hertz-b]] with $\Sigma = 2\times0.91/207\,000 = 8.792\times10^{-6}\ \mathrm{MPa^{-1}}$:
$b = \sqrt{4\times4472\times9.121\times8.792\times10^{-6}/(\pi\times40)} = 0.107\ \mathrm{mm}$. Check: $2\times4472/(\pi\times0.107\times40) = 666\ \mathrm{MPa}$.

**Sanity check.** The contact stress is eight times the bending stress of [[#ex-lewis]], on a band only about $0.2\ \mathrm{mm}$ wide, and the maximum subsurface shear ($0.30\times666 \approx 200\ \mathrm{MPa}$) lies about $0.08\ \mathrm{mm}$ ($0.78b$) below the surface — which is why surface hardening to a depth of a millimetre or so is so effective for gears. Through-hardened steel at $300\ \mathrm{HB}$ has a contact fatigue strength of about $866\ \mathrm{MPa}$ at $10^7$ cycles ([[#eq-strengths]]), so before any further factors the margin is already small.
:::
:::

::: warning Common mistakes in gear stress calculations
- **Comparing the two factors of safety directly.** Bending stress is proportional to load, contact stress to the square root of load. A contact factor of safety $S_H = 1.2$ (on stress) means only $1.2^2 = 1.44$ on load. Compare $S_F$ with $S_H^2$ to see which mode governs (for crowned teeth with point contact, $\sigma_C \propto W^{1/3}$ and the comparison is with $S_H^3$).
- **Mixing up the two form factors.** The Lewis $Y$ (no stress concentration, tip load) and the AGMA geometry factor $Y_J$ (which includes the fillet stress concentration and load sharing) are different numbers and are used in different equations. Likewise, $Y$ defined on the module is $\pi$ times $y$ defined on the circular pitch.
- **Using the wrong velocity-factor convention.** In current books $K_v \ge 1$ multiplies the load; in older ones it is $\le 1$ and divides it.
- **Using the transverse values in a helical gear's normal plane** (or vice versa): $d = m_tz$, not $m_nz$, and the cutter's pressure angle is $\phi_n$.
- **Forgetting the gear.** The pinion usually governs bending, but the gear, with fewer cycles and often a softer material, may govern pitting; both members must be checked with their own strengths and life factors.
- **Units.** With $W_t$ in N and lengths in mm, stresses are in $\mathrm{N/mm^2} = \mathrm{MPa}$ and $Z_E$ must be in $\sqrt{\mathrm{MPa}}$.
:::

## Gear rating: the AGMA and ISO methods

Lewis's equation and Hertz's formula are the cores of the two stress equations used by every modern rating method. In the United States gears are rated to ANSI/AGMA 2001-D04, *Fundamental Rating Factors and Calculation Methods for Involute Spur and Helical Gear Teeth* (metric edition ANSI/AGMA 2101-D04); internationally, and in Europe and China, to ISO 6336 (parts 1 to 3, 2019 editions, cover the basic principles, surface durability and tooth bending strength; part 5 the material strengths). The two methods differ in their detailed factors but have the same structure: compute a bending stress and a contact stress for the real gear under its real duty, by multiplying the nominal stresses by **load factors** that account for everything the simple theories leave out; compute allowable stresses from material strengths measured on gears, corrected for life, temperature and reliability; and form their ratios. The summary below follows the AGMA SI form as presented by Budynas and Nisbett (§14-3 to §14-5). It teaches what the factors mean; a real gear must be rated with the full standard and its tables, charts and conditions of validity.

AGMA writes the **bending stress** and the **contact stress** as
$$
\sigma = W_tK_oK_vK_s\,\frac{1}{F\,m_t}\,\frac{K_HK_B}{Y_J},
$$ {#eq-agma-bending}
$$
\sigma_C = Z_E\sqrt{W_tK_oK_vK_s\,\frac{K_H}{d_PF}\,\frac{Z_R}{Z_I}},
$$ {#eq-agma-contact}
where $m_t$ is the transverse module and the factors are:

- $K_o$, the **overload factor**: allowance for loads above the nominal $W_t$ from the driving and driven machines (shock from a reciprocating engine or a crusher, for instance). $K_o = 1$ for uniform driver and load; higher values come from tables in the standard or from measured load spectra.
- $K_v$, the **dynamic factor**: the AGMA successor of Barth's factor, depending on the pitch-line velocity and on the transmission accuracy grade $Q_v$ (higher $Q_v$ = more accurate gear). Budynas and Nisbett (eq. 14-27) give it as
$$
K_v = \left(\frac{A + \sqrt{200V}}{A}\right)^B, \qquad A = 50 + 56(1 - B), \qquad B = 0.25(12 - Q_v)^{2/3},
$$ {#eq-agma-kv}
with $V$ in m/s, valid up to $V_{\max} = [A + (Q_v - 3)]^2/200$ m/s.
- $K_s$, the **size factor**: allowance for the lower strength of large teeth (larger stressed volume, less favourable heat treatment). AGMA advises $K_s = 1$ unless there is a reason otherwise; Budynas and Nisbett give an estimate based on the Lewis $Y$.
- $K_H$ (written $K_m$ in US customary units), the **load-distribution factor**: the ratio of the peak load per unit face width to the average, caused by shaft and housing deflections, misalignment and lead errors. It typically lies between about $1.1$ and $2$, rising with face width, and is often the largest uncertainty in a rating.
- $K_B$, the **rim-thickness factor**: $1$ for a solid gear or a thick rim; larger when a thin rim bends with the tooth.
- $Y_J$ (US $J$), the **bending geometry factor**: it replaces Lewis's $Y$ and includes the root-fillet stress concentration and the sharing of load between teeth, with the critical load at the highest point of single-tooth contact. It is read from charts (AGMA 908) or computed; for 20° full-depth spur pinions of 20–40 teeth it is of the order of $0.3$–$0.4$.
- $Z_I$ (US $I$), the **pitting geometry factor**, [[#eq-zi]] for spur gears (with $m_N = 1$; for helical gears it is divided by the load-sharing ratio $m_N$), and $Z_R$ (US $C_f$), the **surface condition factor**, $1$ for normal finishes.

The allowable stresses are
$$
\sigma_{\text{all}} = \frac{S_t}{S_F}\,\frac{Y_N}{Y_\theta Y_Z}, \qquad \sigma_{C,\text{all}} = \frac{S_c}{S_H}\,\frac{Z_NZ_W}{Y_\theta Y_Z},
$$ {#eq-agma-allow}
where $S_t$ and $S_c$ are the AGMA bending and contact **strengths** (allowable stress numbers), measured on gears for unidirectional loading, $10^7$ cycles and 99 % reliability; $Y_N$ and $Z_N$ are the **stress-cycle factors** that adjust them to other lives; $Y_\theta$ (US $K_T$) is the temperature factor, $1$ below about $120\ °\mathrm{C}$; $Y_Z$ (US $K_R$) the reliability factor, $1$ at 99 %; and $Z_W$ (US $C_H$) the hardness-ratio factor, which gives a small credit to a softer gear running against a harder pinion. The **factors of safety** are defined as stress ratios,
$$
S_F = \frac{S_tY_N/(Y_\theta Y_Z)}{\sigma}, \qquad S_H = \frac{S_cZ_NZ_W/(Y_\theta Y_Z)}{\sigma_C}.
$$ {#eq-sf-sh}
For a first estimate, Budynas and Nisbett (Figs. 14-2 and 14-5) fit the strengths of through-hardened steel of AGMA grade 1 by
$$
S_t = 0.533H_B + 88.3\ \mathrm{MPa}, \qquad S_c = 2.22H_B + 200\ \mathrm{MPa},
$$ {#eq-strengths}
with Brinell hardness $H_B$, and the stress-cycle factors for steel beyond about $3\times10^6$ cycles (their Figs. 14-14 and 14-15, upper curves) by
$$
Y_N = 1.3558\,N^{-0.0178}, \qquad Z_N = 1.4488\,N^{-0.023}.
$$ {#eq-life-factors}
Case-carburised and hardened steels (58–64 HRC at the surface) are far stronger at the surface: the same source gives $S_c$ of about $1240\ \mathrm{MPa}$ for grade 1.

::: algorithm Rating a spur-gear pair (AGMA structure) {#alg-rating}
1. From the duty, fix the power, speeds, life in cycles for each member, reliability and operating temperature. Compute $W_t$ and $V$ ([[#prop-forces]]).
2. Fix the geometry: $m$, $z_P$, $z_G$, $F$, $\phi$; check undercutting and the contact ratio ([[#prop-contact-ratio]]) and the proportion $3\pi m \le F \le 5\pi m$.
3. Choose the load factors: $K_o$ from the driver and load, $K_v$ from [[#eq-agma-kv]] for the accuracy grade, $K_s$, $K_H$ from the mounting, $K_B$ from the rim.
4. For each member, find $Y_J$ and compute $\sigma$ from [[#eq-agma-bending]]; find $Z_I$, $Z_E$ and compute $\sigma_C$ from [[#eq-agma-contact]] (one value for the pair).
5. For each member, find $S_t$, $S_c$ for the material and heat treatment, the life factors $Y_N$, $Z_N$ for its own number of cycles, $Y_\theta$, $Y_Z$, $Z_W$; compute $S_F$ and $S_H$ from [[#eq-sf-sh]].
6. Compare $S_F$ with $S_H^2$ to find the governing mode. If either is too low, increase the face width or diameter (contact) or the module (bending), or choose a harder material or surface treatment, and repeat.
:::

::: example Rating the reducer pinion {#ex-agma}
Rate the pinion of the reducer of [[#ex-lewis]] ($m = 4\ \mathrm{mm}$, $z_P = 20$, $z_G = 40$, $F = 40\ \mathrm{mm}$, $W_t = 2487\ \mathrm{N}$, $V = 6.032\ \mathrm{m/s}$) for a life of $20\,000$ hours at $1440\ \mathrm{rev/min}$. Take $K_o = 1.25$ (electric motor, moderate shock in the driven machine), accuracy grade $Q_v = 7$, $K_s = 1$, $K_H = 1.3$, $K_B = 1$, $Z_R = 1$, $Z_W = 1$, and the geometry factor supplied for this tooth form, $Y_J = 0.33$. The pinion is through-hardened steel of $300\ \mathrm{HB}$, grade 1, at 99 % reliability and below $120\ °\mathrm{C}$ ($Y_\theta = Y_Z = 1$).
::: solution
**Dynamic factor.** $B = 0.25\times5^{2/3} = 0.7310$, $A = 50 + 56\times0.2690 = 65.06$, and
$$
K_v = \left(\frac{65.06 + \sqrt{200\times6.032}}{65.06}\right)^{0.7310} = \left(\frac{65.06 + 34.73}{65.06}\right)^{0.7310} = 1.367.
$$
($V_{\max} = (65.06 + 4)^2/200 = 23.8\ \mathrm{m/s}$, so the formula applies.)

**Bending stress.** $W_tK_oK_vK_s = 2487\times1.25\times1.367 = 4250\ \mathrm{N}$;
$$
\sigma = \frac{4250}{40\times4}\times\frac{1.3\times1}{0.33} = 26.56\times3.939 = 104.6\ \mathrm{MPa}.
$$
**Contact stress.** $Z_I = 0.10713$ (from [[#ex-contact]]), $Z_E = 190.3\ \sqrt{\mathrm{MPa}}$:
$$
\sigma_C = 190.3\sqrt{\frac{4250\times1.3}{80\times40\times0.10713}} = 190.3\sqrt{16.12} = 764\ \mathrm{MPa}.
$$
**Strengths.** From [[#eq-strengths]]: $S_t = 0.533\times300 + 88.3 = 248.2\ \mathrm{MPa}$, $S_c = 2.22\times300 + 200 = 866\ \mathrm{MPa}$. Pinion cycles: $N = 1440\times60\times20\,000 = 1.728\times10^9$, so $Y_N = 1.3558\times(1.728\times10^9)^{-0.0178} = 0.928$ and $Z_N = 1.4488\times(1.728\times10^9)^{-0.023} = 0.888$.

**Factors of safety.**
$$
S_F = \frac{248.2\times0.928}{104.6} = 2.20, \qquad S_H = \frac{866\times0.888}{764} = 1.01.
$$
**Which governs?** $S_H^2 = 1.01$ against $S_F = 2.20$: on a load basis the pinion has more than twice the margin against tooth breakage that it has against pitting. Pitting governs, and the margin is essentially nil.

**Remedy.** The bending capacity is ample, so the module need not change. Raising the face width helps only as $\sqrt F$ and is limited by $K_H$. The efficient fix is surface hardening: a case-carburised pinion with $S_c \approx 1240\ \mathrm{MPa}$ gives $S_H = 1240\times0.888/764 = 1.44$, $S_H^2 = 2.08$ — now the two modes are balanced. The gear (with half as many cycles, and its own $Y_J$) must be rated the same way.

**Sanity check.** The Lewis estimate of [[#ex-lewis]] gave $81.6\ \mathrm{MPa}$ for the same tooth; the AGMA stress is higher by the overload and load-distribution factors ($1.25\times1.3 = 1.63$) and by the change from $Y$ to $Y_J$ (stress concentration, partly offset by load sharing; a small change here), and lower by the smaller dynamic factor of an accurate gear ($1.367$ against $1.690$).
:::
:::

::: quiz
The transmitted torque on a spur-gear pair is doubled, with nothing else changed. By what factor does the pitch-point contact stress change?
- [ ] It doubles.
- [x] It rises by a factor of $\sqrt2 \approx 1.41$.
- [ ] It rises by a factor of $2^{1/3} \approx 1.26$.
- [ ] It does not change, because the contact width grows.
::: solution
From [[#eq-gear-contact]], $\sigma_C \propto \sqrt{W_t}$, and $W_t \propto T$. The contact band widens as $\sqrt{W_t}$, which is why the peak pressure grows more slowly than the load. (The $2^{1/3}$ law applies to point contact, as between two balls.) The bending stress, by contrast, doubles.
:::
:::

::: quiz
An AGMA rating of a pinion gives $S_F = 1.5$ in bending and $S_H = 1.1$ in pitting. Which failure mode is closer?
- [ ] Bending, because $1.1 < 1.5$ means nothing for bending.
- [x] Pitting, because the load margin against pitting is $S_H^2 = 1.21$, below $1.5$.
- [ ] Bending, because $S_H^2 = 1.21$ is a stress margin and must be compared with $\sqrt{S_F}$.
- [ ] They are equally close.
::: solution
$S_F$ is a ratio of stresses that is also a ratio of loads, because bending stress is proportional to load. $S_H$ is a ratio of stresses, but contact stress goes as the square root of load, so the load that would cause pitting is $S_H^2 = 1.21$ times the design load. Increasing the load by 21 % would bring the flanks to their pitting limit, while the teeth could take 50 % more before reaching their bending limit.
:::
:::

## Materials and surface treatment

Gear materials are chosen for both strengths at once: bending fatigue at the root, which needs a tough core and good fillet surfaces, and contact fatigue on the flank, which needs a hard surface. The main choices, in increasing order of capacity and cost, are:

- **Cast iron** (grey or ductile) and **bronzes**: quiet, cheap, good in poor lubrication; bronze is the usual worm-wheel material against a hardened steel worm. Low strength.
- **Polymers** (acetal, nylon, often glass-filled): light, quiet, self-lubricating, for small loads at modest temperatures; rated by their own methods because their strength depends strongly on temperature.
- **Through-hardened steels** (carbon and alloy steels quenched and tempered to roughly $200$–$400\ \mathrm{HB}$): the teeth can be cut after heat treatment, so the gear stays accurate, but the hardness — and hence $S_c$ — is limited. Pinions are often made $30$–$50\ \mathrm{HB}$ harder than their gears, which evens out wear and gives the gear the hardness-ratio credit $Z_W$.
- **Surface-hardened steels**: **carburising** (low-carbon alloy steel enriched with carbon at the surface, quenched to about $58$–$64\ \mathrm{HRC}$ at the surface with a tough core), **nitriding** (a thinner, very hard case with little distortion) and **induction or flame hardening** of medium-carbon steel. A hard case deeper than the depth of maximum subsurface shear stress — the depth $0.78b$ found above, multiplied by a generous margin — roughly doubles the contact strength and also improves bending strength through compressive residual stresses at the root. Carburised gears distort in quenching and are usually ground afterwards, which also raises the accuracy grade.

**Shot peening** of the root fillets adds compressive residual stress and raises bending fatigue strength, as for springs. Lubrication matters as much as the material: the oil film separates the flanks, carries heat away, and, if it breaks down at high speed and load, the flanks weld locally and tear — **scuffing**, a failure mode separate from pitting that the standards check by a flash-temperature or integral-temperature criterion (ISO/TS 6336-20 and -21).

::: application Wind-turbine gearboxes
A multi-megawatt wind turbine drives its generator through a gearbox that increases the rotor speed (around $10$–$15$ rev/min) by a factor of the order of 100, usually with a planetary first stage ([[mechanisms/gear-trains]]) and parallel-shaft helical stages after it. The gears are case-carburised and ground, rated to ISO 6336 with the wind-industry design standard IEC 61400-4, and checked against a load spectrum derived from simulations of turbulent wind rather than one design load: the cumulative damage from many load levels is assessed with the life factors $Y_N$ and $Z_N$ and Miner's rule ([[machine-design/fatigue]]). Field experience showed that many gearbox failures started not in the teeth but in the bearings, and that the load-distribution factor — how evenly the load spreads across the face when the structure deflects — is decisive for tooth life.
:::

::: history
The involute tooth profile was analysed by Leonhard Euler in the mid-eighteenth century, but it displaced the cycloidal profile only once gears could be generated accurately by machine (see [[mechanisms/gears]]). The first quantitative strength calculation for a gear tooth was Wilfred Lewis's: in an address to the Engineers' Club of Philadelphia on 15 October 1892, published as "Investigation of the Strength of Gear Teeth" in the club's *Proceedings* in 1893, he modelled the tooth as a cantilever, located its weakest section with an inscribed parabola and tabulated the form factor. Heinrich Hertz's paper "Über die Berührung fester elastischer Körper" (*Journal für die reine und angewandte Mathematik*, vol. 92, 1882) solved the contact of elastic bodies; the problem arose from his study of the interference fringes between glass lenses pressed together. The American Gear Manufacturers Association was founded in 1916. In the 1920s an ASME research committee led by Earle Buckingham measured the dynamic loads on gear teeth with a testing machine built by Lewis, and published the report *Dynamic Loads on Gear Teeth* in 1931; Buckingham's *Analytical Mechanics of Gears* (McGraw-Hill, 1949) became the standard reference on gear geometry and loading. The rating methods used today, ANSI/AGMA 2001-D04 and ISO 6336, are the descendants of the Lewis and Hertz analyses, refined with decades of gear testing; this chapter teaches the principles behind them, not a substitute for them.
:::

::: summary
- Metric spur gears: $d = mz$, $p = \pi m$, addendum $m$, dedendum $1.25m$, base radius $(d/2)\cos\phi$, $C = m(z_P + z_G)/2$; contact ratio $m_c = Z/(\pi m\cos\phi)$, at least about $1.2$ ([[#prop-contact-ratio]]).
- Forces: $W_t = 2T/d = H/V$, $W_r = W_t\tan\phi$; helical gears add $W_a = W_t\tan\psi$, with $\tan\phi_n = \tan\phi_t\cos\psi$.
- Bending (Lewis): $\sigma = K_vW_t/(FmY)$, from a cantilever with an inscribed parabola of uniform strength; $Y$ from the table, $0.322$ at 20 teeth, $0.485$ for a rack.
- Contact (Hertz): $p_{\max}^2 = \dfrac{F}{\pi l}\dfrac{1/r_1 + 1/r_2}{\Sigma(1 - \nu^2)/E}$; for gears $\sigma_C = Z_E\sqrt{W_t/(d_PFZ_I)}$, $Z_E \approx 190\ \sqrt{\mathrm{MPa}}$ for steel on steel, $Z_I = \tfrac12\cos\phi\sin\phi\,m_G/(m_G + 1)$.
- Bending stress scales with load and depends on the module; contact stress scales with the square root of load and depends on the pinion diameter and face width.
- Rating (ANSI/AGMA 2001-D04, ISO 6336): stresses multiplied by $K_o$, $K_v$, $K_s$, $K_H$, $K_B$, with geometry factors $Y_J$, $Z_I$; strengths corrected by $Y_N$, $Z_N$, $Y_\theta$, $Y_Z$, $Z_W$; compare $S_F$ with $S_H^2$.
- Surface hardening (carburising, nitriding, induction) is the main way to raise pitting resistance.
:::

## Exercises

::: exercise Gear dimensions {level=1 check="96"}
A standard 20° full-depth spur gear has $m = 3\ \mathrm{mm}$ and $z = 30$ teeth. Find its pitch, tip, root and base diameters and its circular pitch. (Enter the tip diameter in mm.)
::: solution
$d = mz = 90\ \mathrm{mm}$; $d_a = d + 2m = 96\ \mathrm{mm}$; $d_f = d - 2.5m = 82.5\ \mathrm{mm}$; $d_b = d\cos20° = 84.57\ \mathrm{mm}$; $p = \pi m = 9.425\ \mathrm{mm}$. Here the base circle lies above the root circle, as it does for any standard gear with fewer than about 42 teeth ($z(1 - \cos20°) < 2.5$); the part of the flank below the base circle cannot be involute and is shaped by the fillet.
:::
:::

::: exercise Transmitted load {level=1 check="2000"}
A gear transmits $10\ \mathrm{kW}$ at a pitch-line velocity of $5\ \mathrm{m/s}$; $\phi = 20°$. Find the transmitted and radial loads. (Enter the transmitted load in N.)
::: solution
$W_t = H/V = 10\,000/5 = 2000\ \mathrm{N}$; $W_r = 2000\tan20° = 728\ \mathrm{N}$; the resultant is $2000/\cos20° = 2128\ \mathrm{N}$.
:::
:::

::: exercise Lewis stress {level=1 check="50"}
A 50-tooth spur gear with $m = 4\ \mathrm{mm}$ and $F = 30\ \mathrm{mm}$ carries $W_t = 2454\ \mathrm{N}$ at low speed. Find the Lewis bending stress, ignoring the velocity factor. (Enter the stress in MPa.)
::: solution
From the table, $Y = 0.409$ for $z = 50$: $\sigma = W_t/(FmY) = 2454/(30\times4\times0.409) = 2454/49.08 = 50.0\ \mathrm{MPa}$.
:::
:::

::: exercise Contact ratio of equal gears {level=2}
Two identical standard 20° full-depth gears with $z = 30$ and $m = 5\ \mathrm{mm}$ mesh at the standard centre distance. Find the contact ratio.
::: solution
$r = 75\ \mathrm{mm}$, $r_a = 80\ \mathrm{mm}$, $r_b = 75\cos20° = 70.477\ \mathrm{mm}$, $C = 150\ \mathrm{mm}$. $Z = 2\sqrt{80^2 - 70.477^2} - 150\sin20° = 2\times37.854 - 51.303 = 24.41\ \mathrm{mm}$; $p_b = 5\pi\cos20° = 14.761\ \mathrm{mm}$; $m_c = 1.65$. Compare [[#ex-geometry]] (20/40 teeth, $1.64$): the contact ratio depends on the tooth numbers, not on the module.
:::
:::

::: exercise Helical-gear forces {level=2}
A helical gear with $\phi_n = 20°$ and $\psi = 30°$ transmits $W_t = 3000\ \mathrm{N}$. Find the transverse pressure angle and the radial, axial and total forces.
::: solution
$\tan\phi_t = \tan20°/\cos30° = 0.36397/0.86603 = 0.42028$, $\phi_t = 22.80°$. $W_r = 3000\times0.42028 = 1261\ \mathrm{N}$; $W_a = 3000\tan30° = 1732\ \mathrm{N}$; $W = 3000/(\cos20°\cos30°) = 3686\ \mathrm{N}$. Check: $\sqrt{3000^2 + 1261^2 + 1732^2} = 3686\ \mathrm{N}$.
:::
:::

::: exercise Face width for lower contact stress {level=2 check="1.5625"}
A pinion's contact stress is to be reduced by 20 % by widening the face, with the load, diameters and load factors unchanged. By what factor must the face width be increased? (Enter the factor.)
::: solution
$\sigma_C \propto 1/\sqrt F$, so $\sqrt{F_1/F_2} = 0.8$ and $F_2/F_1 = 1/0.64 = 1.5625$. In practice $K_H$ rises with face width, so the real increase needed is larger — and a $56$ % wider face may break the $3$–$5$ circular-pitch guideline. A larger pinion diameter is usually the better lever, since $\sigma_C \propto 1/d_P$ at fixed torque.
:::
:::

::: exercise Allowable load with Barth's factor {level=2 check="1738.8"}
A 20-tooth cut steel pinion with $m = 3\ \mathrm{mm}$ and $F = 36\ \mathrm{mm}$ runs at a pitch-line velocity of $6.1\ \mathrm{m/s}$. The allowable bending stress is $100\ \mathrm{MPa}$. Using the Lewis equation with Barth's factor for a cut profile, find the allowable transmitted load. (Enter the load in N.)
::: solution
$K_v = (6.1 + 6.1)/6.1 = 2$; $Y = 0.322$. $W_t = \sigma_{\text{all}}FmY/K_v = 100\times36\times3\times0.322/2 = 1738.8\ \mathrm{N}$. The corresponding power is $1738.8\times6.1 = 10.6\ \mathrm{kW}$. A ground pinion of the same size ($K_v = (5.56 + \sqrt{6.1})/5.56 = 1.444$) could carry 38 % more.
:::
:::

::: exercise Elastic coefficient for steel on cast iron {level=2}
Find $Z_E$ for a steel pinion ($E = 207\ \mathrm{GPa}$, $\nu = 0.30$) running against a grey cast-iron gear ($E = 100\ \mathrm{GPa}$, $\nu = 0.26$), and the ratio of the contact stress to that of a steel–steel pair under the same load.
::: solution
$\Sigma = 0.91/207\,000 + 0.9324/100\,000 = 4.396\times10^{-6} + 9.324\times10^{-6} = 1.372\times10^{-5}\ \mathrm{MPa^{-1}}$; $Z_E = 1/\sqrt{\pi\times1.372\times10^{-5}} = 152.3\ \sqrt{\mathrm{MPa}}$. The contact stress is $152.3/190.3 = 0.80$ of the steel–steel value: the softer gear flattens more and spreads the load over a wider band. Whether the pair is better or worse depends on the surface strength of the cast iron, which is much lower than that of hardened steel.
:::
:::

::: exercise Internal gears {#ex-internal level=3}
(a) Repeat the proof of [[#prop-gear-contact]] for a pinion meshing inside an internal (ring) gear, where the flank of the ring gear is concave, and show that $Z_I = \tfrac12\cos\phi\sin\phi\,m_G/(m_G - 1)$. (b) For $m_G = 3$, by what factor is the contact stress lower than for an external gear of the same ratio, pinion and load? (c) Why does this make planetary gearboxes attractive for high torque?
::: solution
(a) At the pitch point the ring gear's flank has radius of curvature $r_2 = (d_G/2)\sin\phi$ but curves the same way as the pinion flank, so in Hertz's gap function $1/R = 1/r_1 - 1/r_2$. Then $1/r_1 - 1/r_2 = \dfrac{2}{d_P\sin\phi}\left(1 - \dfrac{1}{m_G}\right) = \dfrac{2(m_G - 1)}{d_P m_G\sin\phi}$, and the same algebra as before gives $Z_I = \dfrac{\cos\phi\sin\phi}{2}\cdot\dfrac{m_G}{m_G - 1}$.
(b) $\sigma_C \propto 1/\sqrt{Z_I}$, so the ratio is $\sqrt{(m_G - 1)/(m_G + 1)} = \sqrt{2/4} = 0.707$: about 29 % lower.
(c) In a planetary stage the planets mesh with the sun (external, convex–convex) and with the ring (internal, convex–concave); the ring meshes are the lightly stressed ones. More importantly the load is shared among several planets, so a planetary stage transmits a given torque in a much smaller volume ([[mechanisms/gear-trains]]); the sun–planet external meshes usually govern.
:::
:::

::: exercise Design a gear pair {level=3}
A pinion with $z_P = 20$ teeth, driven by an electric motor at $960\ \mathrm{rev/min}$, transmits $5\ \mathrm{kW}$ to a gear with $z_G = 60$ teeth. Required life $10^9$ pinion revolutions; $K_o = 1.25$, $Q_v = 7$, $K_H = 1.3$, $K_s = K_B = Z_R = Z_W = Y_\theta = Y_Z = 1$, $Y_J = 0.33$ for the pinion; steel on steel. Choose a module (ISO 54 values) and face width ($3\pi m \le F \le 5\pi m$) so that the pinion has $S_F \ge 1.5$ and $S_H \ge 1.2$, (a) with through-hardened $300\ \mathrm{HB}$ steel, (b) with a case-carburised pinion ($S_t \approx 380\ \mathrm{MPa}$, $S_c \approx 1240\ \mathrm{MPa}$). Compare the sizes, and list what else must be checked before the design is complete.
::: solution
**Common data.** $Z_I = 0.1607\times3/4 = 0.1205$; $Y_N = 1.3558\times(10^9)^{-0.0178} = 0.938$, $Z_N = 1.4488\times(10^9)^{-0.023} = 0.900$; for $Q_v = 7$, $A = 65.06$, $B = 0.7310$.

**(a) Through-hardened, $S_t = 248.2$, $S_c = 866\ \mathrm{MPa}$.** Try $m = 3$, $F = 36\ \mathrm{mm}$: $d_P = 60\ \mathrm{mm}$, $V = 3.016\ \mathrm{m/s}$, $W_t = 1658\ \mathrm{N}$, $K_v = 1.264$. $\sigma = 1658\times1.25\times1.264/(36\times3)\times1.3/0.33 = 95.5\ \mathrm{MPa}$, $S_F = 2.44$; $\sigma_C = 190.3\sqrt{1658\times1.25\times1.264\times1.3/(60\times36\times0.1205)} = 688\ \mathrm{MPa}$, $S_H = 866\times0.900/688 = 1.13$ — too low. Widening the face to the limit $5\pi m = 47\ \mathrm{mm}$ would give $S_H \approx 1.13\sqrt{47/36} = 1.29$ on paper, but $K_H$ grows with face width; a larger diameter is the surer lever. Go up to $m = 3.5$ (second series), $F = 35\ \mathrm{mm}$: $d_P = 70\ \mathrm{mm}$, $W_t = 1421\ \mathrm{N}$, $K_v = 1.284$, $\sigma = 73.3\ \mathrm{MPa}$, $S_F = 3.17$; $\sigma_C = 603\ \mathrm{MPa}$, $S_H = 1.29$. Or with first-series $m = 4$, $F = 40\ \mathrm{mm}$ ($d_P = 80\ \mathrm{mm}$): $S_F = 4.67$, $S_H = 1.57$. Pitting governs throughout; bending is far from critical.

**(b) Carburised pinion.** $m = 2.5$, $F = 30\ \mathrm{mm}$: $d_P = 50\ \mathrm{mm}$, $V = 2.513\ \mathrm{m/s}$, $W_t = 1989\ \mathrm{N}$, $K_v = 1.242$, $\sigma = 162.2\ \mathrm{MPa}$, $S_F = 380\times0.938/162.2 = 2.20$; $\sigma_C = 897\ \mathrm{MPa}$, $S_H = 1240\times0.900/897 = 1.24$. The pinion diameter falls from $70$ to $50\ \mathrm{mm}$ and the centre distance from $140$ to $100\ \mathrm{mm}$ — the gearbox volume roughly halves, at the cost of carburising and grinding.

**Still to check.** The gear (its own $Y_J$, material and $Z_W$, $3.3\times10^8$ cycles); undercutting (20 teeth is above the minimum of 18) and contact ratio; the shafts and bearings with the forces $W_t$, $W_r$ ([[machine-design/shafts]], [[machine-design/bearings]]); lubrication and scuffing; the real $K_H$ from the shaft deflections; tolerances and accuracy grade; and, for a real product, a full rating to ISO 6336 or ANSI/AGMA 2001-D04 rather than these estimates.
:::
:::
