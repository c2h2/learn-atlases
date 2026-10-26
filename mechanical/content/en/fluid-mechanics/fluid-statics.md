A fluid at rest carries **no shear**, so the only stress at a point is a normal one, and the whole subject collapses to a single first-order ordinary differential equation, $\nabla p = \rho \mathbf{g}$. Everything in this lesson — the force on a dam, the draft of a ship, the roll period of a crane barge, the reading of a barometer and the reason a hot-air balloon rises — is that equation integrated once and multiplied by an area.

The reason it deserves a whole lesson and not a page is that **the answers are not intuitive**. The force on a submerged plane does not act at its centroid; the upthrust on a floating body does not act through its centre of gravity, and the point through which it does act **moves when the body tilts by two degrees**; and the pressure at the bottom of a vessel depends on nothing whatever about the vessel's shape, which is a statement so counter-intuitive that Pascal is traditionally said to have burst a barrel with it, using a tall, thin column of water.

::: warning Seven statics errors that burst tanks and cap barges
**Multiplying the pressure at the centroid by the area and putting the force there.** The magnitude $F = p_c A$ is right for a plane surface of constant density; the **position** is not. The centre of pressure lies below the centroid by $I_c / \left( y_c A \right)$, which for a $2\ \mathrm{m}$ square gate with its top at the surface is **$0.33\ \mathrm{m}$** and for the same gate with its centroid $6\ \mathrm{m}$ deep is **$0.056\ \mathrm{m}$**. A hinge moment computed about the wrong point is wrong by $15$ to $20\ \%$, and a hoist sized from it will not lift the gate against its own wedge. **Using the gauge pressure on a surface that sees atmosphere on both sides.** A closed tank's end plate sees $p_{\mathrm{gauge}}$ inside and $0$ outside, and a calculation that forgets the outside is right; a calculation for a **submerged** plate that uses absolute pressure has added $101\ \mathrm{kPa} \times A$, which on a $1\ \mathrm{m^{2}}$ plate is **ten tonnes of phantom force**. **Placing the metacentre above the centre of gravity and calling the vessel stiff.** Stability requires $G$ **below** $M$, i.e. $GM > 0$, and $M$ is not a fixed point — it is the intersection of the buoyancy line with the centreline **at the current heel**, and it moves as $BM = I / \nabla$ changes with the waterplane. A barge that is stable at $0^{\circ}$ and has a large free surface can have $GM = - 0.2\ \mathrm{m}$ at $5^{\circ}$, and the fact that it "was fine when loaded" is not a stability certificate. **Forgetting the free-surface correction.** A partially filled tank's free surface contributes its **own** second moment to the transverse inertia, and the correction to the metacentric height is
$$
\Delta GM = - \frac{\rho_{\mathrm{tank}}}{\rho_{\mathrm{fluid}}} \frac{i_{\mathrm{tank}}}{\nabla}
$$
For a $10\ \mathrm{m}$ long, $8\ \mathrm{m}$ wide slack tank in a $400\ \mathrm{m^{3}}$ displacement barge this is $- \left( 1{,}000 / 1{,}025 \right) \times \left( 10 \times 8^{3} / 12 \right) / 400 = - 1.04\ \mathrm{m}$ — **more than a quarter of the metacentric height of the barge worked below, from one half-filled tank**. Every ship's "slack-tank" rule exists because of this one number. **Reading a manometer without tracking the same fluid on both legs.** The rule is to start at one end, add $\rho g h$ going down and subtract going up, and stop when you reach the other end; a leg containing two fluids must be broken at the interface. A manometer with an inverted leg and an oil of specific gravity $0.8$ read as though it were water is wrong by $25\ \%$, and a differential manometer whose two limbs are at different temperatures is wrong by an amount nobody can calculate. **Assuming the hydrostatic pressure distribution holds in a moving fluid.** It holds only where the vertical accelerations are negligible, which means a streamline curvature radius large compared with the depth. Over a spillway crest, in a hydraulic jump's roller, and in the throat of a Venturi flume the pressure is **not** hydrostatic, and a sharp-crested weir's measured discharge coefficient of about $1.8\ \mathrm{m^{1 / 2} / s}$, against the $\tfrac{2}{3} \sqrt{2 g} = 2.95\ \mathrm{m^{1 / 2} / s}$ of an analysis that ignores the curvature and contraction of the nappe, is the empirical price of that fact. **Treating the atmosphere's density as constant over a tall stack.** It is not: air's pressure falls by half over $5.5\ \mathrm{km}$, and the density inside a chimney differs from that outside because of temperature; a $200\ \mathrm{m}$ chimney's draught — the whole of the reason a chimney draws without a fan — is
$$
\Delta p = \left( \rho_{\mathrm{out}} - \rho_{\mathrm{in}} \right) g H
$$
computed with **two different** densities.
:::

## The pressure field

::: definition The hydrostatic equation {#def-hydro}
$$
\nabla p = \rho \mathbf{g}, \qquad
\frac{\partial p}{\partial x} = \rho g_x, \quad
\frac{\partial p}{\partial y} = \rho g_y, \quad
\frac{\partial p}{\partial z} = - \rho g
$$
**For a constant-density liquid**, taking $z$ positive upward from a free surface at $p = p_0$:
$$
\boxed{ p = p_0 + \rho g d } \qquad \left[ d = \text{depth below the free surface} \right]
$$
**The three numbers worth memorising for water.**
$$
\begin{array}{l c c}
\text{Depth} & p_{\mathrm{gauge}} & \text{Rule} \\
10\ \mathrm{m} & 98.1\ \mathrm{kPa} & \approx 1\ \text{atmosphere} \\
100\ \mathrm{m} & 981\ \mathrm{kPa} \approx 9.7\ \mathrm{atm} & \text{a diver's air consumption is } 11 \text{ times the surface rate} \\
1{,}000\ \mathrm{m} & 9.81\ \mathrm{MPa} & \text{the Mariana Trench at } 10{,}994\ \mathrm{m} \text{ is } 108.6\ \mathrm{MPa} \approx 1{,}070\ \mathrm{atm}
\end{array}
$$
**The hydrostatic paradox.** The force on the base of a vessel is $\rho g d A$ **whatever the vessel's shape**, so a vessel that widens upward has a base force **less** than its own weight and one that narrows has **more**. The resolution is that the sloping walls carry the difference as a vertical component of their own pressure force — the effect behind the barrel experiment traditionally attributed to Pascal, in which a sealed barrel is burst by pouring a jug of water into a long, thin vertical tube fixed in its lid.
**The compressible case.** With $p = \rho R T$ and $T \left( z \right) = T_0 - L z$:
$$
p = p_0 \left( 1 - \frac{L z}{T_0} \right)^{g / \left( R L \right)}, \qquad
\rho = \rho_0 \left( 1 - \frac{L z}{T_0} \right)^{g / \left( R L \right) - 1}
$$
with the standard atmosphere's $L = 0.0065\ \mathrm{K / m}$, $T_0 = 288.15\ \mathrm{K}$ and exponent $g / \left( R L \right) = 5.2559$.
**The evaluations that matter to pilots, cooks and mountaineers.**
$$
\begin{array}{l c c c}
\text{Altitude} & p\ (\mathrm{kPa}) & p / p_0 & \text{Consequence} \\
0 & 101.33 & 1.000 & \text{water boils at } 100.0\ {}^{\circ}\mathrm{C} \\
365\ \mathrm{m} & 97.0 & 0.957 & \text{boiling point } 98.8\ {}^{\circ}\mathrm{C} \\
1{,}500\ \mathrm{m} & 84.6 & 0.835 & \text{boiling point } 95.0\ {}^{\circ}\mathrm{C} \\
3{,}650\ \mathrm{m}\ \left( \text{Lhasa} \right) & 64.5 & 0.637 & \text{boiling point } 87.9\ {}^{\circ}\mathrm{C}, \text{ a pressure cooker is required} \\
5{,}500\ \mathrm{m} & 50.5 & 0.498 & \text{half the sea-level oxygen per breath} \\
8{,}850\ \mathrm{m}\ \left( \text{Everest} \right) & 31.4 & 0.310 & \text{the physiological limit without supplementary oxygen} \\
10{,}994\ \mathrm{m}\ \left( \text{Mariana} \right) & 1{,}086\ \mathrm{bar} & 1{,}072 & \text{the water, not the air, is the problem}
\end{array}
$$
**The number that decides a cake recipe and an aircraft's service ceiling.** A cake baked at $3{,}650\ \mathrm{m}$ needs **less** baking powder, not more, because the raising-gas bubbles expand to $1 / 0.637 = 1.6$ times their sea-level volume before the starch sets.
:::

::: definition Manometers {#def-manometer}
**The rule.** Start at one end of the tube, add $\rho g h$ for every descent and subtract $\rho g h$ for every ascent, and stop at the other end.
$$
p_A = p_B + \sum_{\mathrm{down}} \rho_i g h_i - \sum_{\mathrm{up}} \rho_i g h_i
$$
**The piezometer** measures a gauge pressure directly and works only for liquids:
$$
p = \rho g h
$$
**The U-tube** with a manometric fluid of specific gravity $S_m$ measuring a liquid of specific gravity $S$:
$$
p_A = \left( S_m - S \right) \rho_w g h
$$
**The evaluation.** A $0.8\ \mathrm{m}$ deflection of mercury $\left( S_m = 13.55 \right)$ on water $\left( S = 1 \right)$:
$$
p_A = 12.55 \times 9{,}807 \times 0.8 = 98.5\ \mathrm{kPa}
$$
**The inverted U-tube** for measuring a small difference in a liquid, with an oil of $S = 0.8$ in the crown:
$$
\Delta p = \left( 1 - 0.8 \right) \rho_w g h = 1{,}961\ h \ \mathrm{Pa\ per\ metre}
$$
**The sensitivity gain of five**, which is the whole of the reason an inverted manometer is used on a Venturi meter and a normal one is not.
**The inclined manometer**, reading a length $L$ along a tube at angle $\theta$:
$$
\Delta p = \rho g L \sin \theta, \qquad \text{sensitivity} = \frac{1}{\sin \theta}
$$
at $\theta = 5^{\circ}$ a **$11.5\times$** magnification, and the reason a gas main's commissioning gauge has a sloped tube and not a longer vertical one.
**The error that is never corrected.** A manometer's scale is read at the **meniscus**, which for mercury is **convex** and read at its top and for water is **concave** and read at its bottom; the difference between the two conventions on a $10\ \mathrm{mm}$ bore tube is $0.4\ \mathrm{mm}$, and on a $2\ \mathrm{mm}$ bore tube it is **$2.8\ \mathrm{mm}$** — a $0.04\ \%$ and a $0.3\ \%$ error respectively on a $1\ \mathrm{m}$ head, and ten times that on a $100\ \mathrm{mm}$ head. **Capillary correction is a real term in a laboratory manometer's uncertainty budget and is usually omitted from field readings.**
:::

## Forces on surfaces

::: definition Plane surfaces and the centre of pressure {#def-plane}
$$
F = \int_A p\, dA = p_c A = \rho g\, d_c A, \qquad
y_p = y_c + \frac{I_c}{y_c A}, \qquad
x_p = x_c + \frac{I_{xy,c}}{y_c A}
$$
with $y$ measured **down the plane** from the free surface, $I_c$ the second moment of area about the centroidal axis parallel to the surface, and $y_p - y_c$ the eccentricity of the resultant.
**The second moments that get used.**
$$
\begin{array}{l c c}
\text{Rectangle, base } b \text{, depth } h & I_c = b h^{3} / 12 & y_p - y_c = h^{2} / \left( 12 d_c \right) \\[4pt]
\text{Circle, diameter } D & I_c = \pi D^{4} / 64 & y_p - y_c = D^{2} / \left( 16 d_c \right) \\[4pt]
\text{Triangle, base } b \text{, height } h & I_c = b h^{3} / 36 & y_p - y_c = h^{2} / \left( 18 d_c \right)
\end{array}
$$
**The worked case: a vertical circular gate.** A gate of $2.0\ \mathrm{m}$ diameter with its top edge $1.0\ \mathrm{m}$ below the surface, so $d_c = 2.0\ \mathrm{m}$:
$$
A = \frac{\pi \times 2.0^{2}}{4} = 3.1416\ \mathrm{m^{2}}, \qquad
F = 9{,}810 \times 2.0 \times 3.1416 = 61.6\ \mathrm{kN}
$$
$$
I_c = \frac{\pi \times 2.0^{4}}{64} = 0.7854\ \mathrm{m^{4}}, \qquad
y_p - y_c = \frac{0.7854}{2.0 \times 3.1416} = 0.125\ \mathrm{m}
$$
**The centre of pressure is $125\ \mathrm{mm}$ below the gate's centre**, and a hoist lifting from the top stem must supply a moment of $61.6 \times 0.125 = 7.7\ \mathrm{kN \cdot m}$ against the water before it lifts at all.
**The worked case: a rectangular sluice.** A gate $3\ \mathrm{m}$ wide and $2\ \mathrm{m}$ deep, vertical, with its **top at the surface**:
$$
d_c = 1.0\ \mathrm{m}, \qquad F = 9{,}810 \times 1.0 \times 6.0 = 58.9\ \mathrm{kN}
$$
$$
y_p - y_c = \frac{h^{2}}{12 d_c} = \frac{4}{12} = 0.333\ \mathrm{m}
\quad \Rightarrow \quad y_p = 1.333\ \mathrm{m\ below\ the\ surface}
$$
**The resultant acts at two thirds of the depth**, which is the rule for any rectangle with its top at the surface and the reason the pressure diagram is a triangle.
**The pressure prism, which solves the problem without calculus.** The force on a vertical plane equals the volume of the pressure wedge above it, and its line of action passes through the wedge's centroid. For a rectangular wall of height $H$ with water to the top:
$$
F = \frac{1}{2} \rho g H^{2} b \quad \text{acting at} \quad \frac{2 H}{3} \ \text{below the surface}
$$
**The gravity-dam rule.** The horizontal water force on a dam of height $H$ and unit length is $\tfrac{1}{2} \rho g H^{2}$, and a triangular-section gravity dam of concrete relative density $2.4$ needs a base width
$$
b = \frac{H}{\sqrt{S_c}} = \frac{H}{\sqrt{2.4}} = 0.65\ H
\quad \text{(elementary triangular profile, no uplift)}
$$
and $0.75$ to $0.85\ H$ once the **uplift** pressure on the base, the tailwater and the construction tolerance are included. For a $100\ \mathrm{m}$ dam that is a **$75$ to $85\ \mathrm{m}$ base**, and the fact that the ratio $b / H$ is **constant** is the reason **arch dams and buttress dams exist** — a gravity dam's concrete quantity scales as $H^{2}$ and so does the water force, so the design is scale-independent and the only way to save concrete is to change the structural system.
:::

::: definition Curved surfaces {#def-curved}
**The method.** The force on a curved surface is found from its components, each of which is a force on a **plane**:
$$
F_H = \rho g\, d_c A_{\mathrm{vert}}, \qquad
F_V = \rho g \times \left( \text{volume of fluid above the surface, real or imaginary} \right)
$$
**The sign of the vertical component.** $F_V$ acts **downward** on a surface that has the fluid above it (a tank's curved bottom, a buried pipe's crown under a reservoir) and **upward** on one that has the fluid below it (the underside of a submerged dome or of a radial gate's skin), where the "volume above" is then the imaginary column between the surface and the free-surface level.
**The worked case: a $90^{\circ}$ curved vane.** A quarter-cylinder of radius $R = 1.5\ \mathrm{m}$ and $4\ \mathrm{m}$ length retaining water to its top:
$$
F_H = \rho g \frac{R}{2} \times \left( R L \right) = 9{,}810 \times 0.75 \times 6.0 = 44.1\ \mathrm{kN}
$$
$$
F_V = \rho g \times \frac{\pi R^{2}}{4} L = 9{,}810 \times 1.767 \times 4 = 69.3\ \mathrm{kN}
$$
$$
F = \sqrt{44.1^{2} + 69.3^{2}} = 82.2\ \mathrm{kN}, \qquad
\theta = \tan^{- 1} \frac{69.3}{44.1} = 57.5^{\circ}\ \text{from the horizontal}
$$
**The number that makes a Tainter (radial) gate cheaper than a sluice gate.** Because the curved skin's hydrostatic force passes **through the trunnion pin** — every pressure is normal to a cylindrical surface whose axis is the pin — the water exerts **no moment about the hinge**, and the hoist only lifts the gate's own weight plus a small friction term. **A radial gate's actuator is sized by the gate's mass and the trunnion friction and not by the head**, which is why they are used on most large spillways.
**The buoyancy of a submerged body** is the special case in which the curved surface closes on itself:
$$
F_B = \rho g \nabla \quad \text{acting upward through the centroid of the displaced volume}
$$
:::

## Buoyancy and stability

::: definition Archimedes and the metacentre {#def-buoyancy}
$$
\boxed{ F_B = \rho g \nabla } \qquad \text{acting through the centre of buoyancy } B
$$
**The three equilibria of a floating body.**
$$
\begin{array}{l l l}
G \text{ below } B & \text{always stable} & \text{a pendulum} \\
G \text{ above } B, GM > 0 & \text{stable for small heels} & \text{every ship ever built} \\
G \text{ above } B, GM < 0 & \text{unstable} & \text{a capsize in the making}
\end{array}
$$
**The metacentric height.** For a small heel $\theta$ the centre of buoyancy moves sideways and the buoyancy line cuts the centreline at the **metacentre** $M$, at a height
$$
BM = \frac{I_{\mathrm{WP}}}{\nabla}, \qquad
KM = KB + BM, \qquad
\boxed{ GM = KB + BM - KG }
$$
where $I_{\mathrm{WP}}$ is the second moment of the **waterplane area** about the axis of rotation and $\nabla$ is the displaced volume.
**The restoring moment.**
$$
M_r = W\, GM \sin \theta \approx W\, GM\, \theta
$$
**The worked case: a rectangular barge.** Length $20\ \mathrm{m}$, beam $10\ \mathrm{m}$, light and loaded draft $2.0\ \mathrm{m}$, $KG = 1.5\ \mathrm{m}$:
$$
\nabla = 20 \times 10 \times 2.0 = 400\ \mathrm{m^{3}}, \qquad W = 1{,}025 \times 9.807 \times 400 = 4{,}022\ \mathrm{kN} = 410\ \mathrm{t}
$$
$$
I_{\mathrm{WP}} = \frac{L B^{3}}{12} = \frac{20 \times 1{,}000}{12} = 1{,}667\ \mathrm{m^{4}}, \qquad
BM = \frac{1{,}667}{400} = 4.167\ \mathrm{m}
$$
$$
KB = 1.0\ \mathrm{m}, \qquad KM = 5.167\ \mathrm{m}, \qquad GM = 5.167 - 1.5 = 3.667\ \mathrm{m}
$$
**The roll period.** With a radius of gyration $k_{xx} = 0.40\, B = 4.0\ \mathrm{m}$ and the added-mass coefficient $C_{44} \approx 1.0$ for a barge:
$$
T_{\phi} = \frac{2 \pi k_{xx}}{\sqrt{g\, GM}} = \frac{2 \pi \times 4.0}{\sqrt{9.807 \times 3.667}} = \frac{25.13}{6.00} = 4.19\ \mathrm{s}
$$
**The number that decides whether a ship is comfortable.** A **stiff** ship (large $GM$) has a short roll period and **snaps** — a barge at $4\ \mathrm{s}$ is uncomfortable and loads shift; a **tender** ship (small $GM$) rolls slowly and, if its period approaches the wave encounter period, **resonates**. The design target for a cargo ship is $T_{\phi} = 10$ to $14\ \mathrm{s}$ against a typical North Atlantic wave period of $8$ to $12\ \mathrm{s}$, and the reason the target is **above** the wave band is that resonance is the failure mode and a slow roll is merely unpleasant.
**The free-surface correction, which is the largest single term in a stability calculation.**
$$
GM_{\mathrm{eff}} = GM - \frac{\rho_{\mathrm{tank}}}{\rho_{\mathrm{sea}}} \frac{i_{\mathrm{tank}}}{\nabla}
$$
**The evaluation.** A slack tank $10\ \mathrm{m}$ long and $8\ \mathrm{m}$ wide in the barge above, holding fresh water:
$$
i_{\mathrm{tank}} = \frac{10 \times 8^{3}}{12} = 426.7\ \mathrm{m^{4}}, \qquad
\delta GM = - \frac{1{,}000}{1{,}025} \times \frac{426.7}{400} = - 1.04\ \mathrm{m}
$$
**a $28\ \%$ reduction in the metacentric height from one half-filled tank.** Splitting the same tank into **three longitudinal compartments** reduces $i$ by a factor of $3^{2} = 9$ to $47.4\ \mathrm{m^{4}}$ and the penalty to $0.116\ \mathrm{m}$ — which is why ships have longitudinal (centreline) bulkheads in their wide tanks.
**The wall-sided formula for large angles.** For a wall-sided vessel the righting lever at a finite heel is
$$
GZ = \sin \theta \left[ GM + \frac{1}{2} BM\, \tan^{2} \theta \right]
$$
**The angle of loll** for a ship that is **unstable** upright ($GM < 0$) is
$$
\theta_l = \tan^{- 1} \sqrt{\frac{- 2\, GM}{BM}}
$$
For $GM = - 0.30\ \mathrm{m}$ and $BM = 4.167\ \mathrm{m}$ this is $\theta_l = \tan^{- 1} \sqrt{0.144} = 20.8^{\circ}$ — **the ship will sit at $21^{\circ}$ heel and be perfectly content there**, and the crew's report that "she lists to port but does not get worse" is the diagnosis.
:::

::: widget plot
f: sin(x*pi/180)*(0.60+2.0835*pow(tan(x*pi/180),2)); sin(x*pi/180)*(-0.30+2.0835*pow(tan(x*pi/180),2)); sin(x*pi/180)*(0.30+2.0835*pow(tan(x*pi/180),2))
x: 0, 45
y: -0.3, 2.0
labels: GZ with GM = 0.60 m; GM = -0.30 m; GM = 0.30 m
caption: The righting lever $GZ$ in metres against the angle of heel in degrees for a wall-sided vessel with $BM = 4.167\ \mathrm{m}$ and three values of the initial metacentric height, from $GZ = \sin \theta \left[ GM + \tfrac{1}{2} BM \tan^{2} \theta \right]$. The middle curve is the **unstable** case: it leaves the origin **downwards**, reaches a heeling-over minimum of $- 0.04\ \mathrm{m}$ near $12^{\circ}$, crosses zero at the angle of loll of $20.8^{\circ}$ and rises again — the vessel heels over to $21^{\circ}$ and sits there content. The $GM = 0.30\ \mathrm{m}$ curve is the **marginally stable** case, whose initial slope is small and whose righting lever of $1.7\ \mathrm{m}$ arrives only at $45^{\circ}$: **a ship can be formally stable and practically unseaworthy**, and the international load-line rules therefore specify a minimum area under the whole $GZ$ curve and not merely a positive $GM$.
:::

::: definition Rigid-body motion of a liquid {#def-rigid}
**The general result.** In a frame accelerating with $\mathbf{a}$, the free surface is perpendicular to the **effective gravity** $\mathbf{g}_{\mathrm{eff}} = \mathbf{g} - \mathbf{a}$:
$$
\frac{\partial p}{\partial x} = - \rho a_x, \qquad
\frac{\partial p}{\partial z} = - \rho \left( g + a_z \right), \qquad
\frac{dz}{dx} \bigg|_{\mathrm{surface}} = - \frac{a_x}{g + a_z}
$$
**The translating tank.** A road tanker accelerating at $a_x = 0.4\, g$ has a free surface at
$$
\tan \theta = 0.4 \quad \Rightarrow \quad \theta = 21.8^{\circ}
$$
**a twenty-two degree tilt** along the tank, which in a long, partly filled tank means the liquid runs to the rear end and surges forward again when the braking starts. **This is why a road tanker's baffles are transverse** — they break the fore-and-aft sloshing **momentum**, whereas a ship's longitudinal bulkheads are there to cut the free-surface effect in roll.
**The rotating vessel.** A cylinder rotated at $\Omega$ about its vertical axis takes a free surface of
$$
\boxed{ z = \frac{\Omega^{2} r^{2}}{2 g} } \qquad \text{(a paraboloid of revolution)}
$$
and a pressure field
$$
p = p_0 + \rho \left( \frac{\Omega^{2} r^{2}}{2} - g z \right)
$$
**The worked case.** A $0.6\ \mathrm{m}$ diameter, $0.5\ \mathrm{m}$ deep open cylinder rotated at $60\ \mathrm{rev / min}$:
$$
\Omega = \frac{2 \pi \times 60}{60} = 6.283\ \mathrm{rad / s}, \qquad
z_{\max} = \frac{6.283^{2} \times 0.30^{2}}{2 \times 9.807} = \frac{39.48 \times 0.09}{19.61} = 0.181\ \mathrm{m}
$$
**The volume of the paraboloid is exactly half its circumscribing cylinder**, so if the cylinder is half full ($0.25\ \mathrm{m}$ deep) the surface just touches the bottom at the axis when $\Omega^{2} R^{2} / \left( 2 g \right) = 0.50\ \mathrm{m}$, i.e. at $\Omega = 10.4\ \mathrm{rad / s}$ ($100\ \mathrm{rev / min}$) — at which the rim level has just reached the brim — and any faster both **uncovers the base** and spills.
**The number that makes a centrifuge a hydrostatic problem.** At $3{,}000\ \mathrm{rev / min}$ ($\Omega = 314.2\ \mathrm{rad / s}$) and a $0.15\ \mathrm{m}$ radius the acceleration is
$$
\frac{\Omega^{2} r}{g} = \frac{98{,}700 \times 0.15}{9.807} = 1{,}510\ g
$$
and the pressure at the wall of a water column is $\rho \Omega^{2} r^{2} / 2 = 1{,}000 \times 98{,}700 \times 0.0225 / 2 = 1.11\ \mathrm{MPa}$ — **about eleven atmospheres**, and the reason a laboratory centrifuge's rotor is a pressure vessel and its lid is an interlock.
:::

## Worked cases

::: example A sluice gate and its hoist {#ex-sluice}
A vertical sluice gate $4\ \mathrm{m}$ wide and $2.5\ \mathrm{m}$ deep retains $2.5\ \mathrm{m}$ of water on its upstream face and $1.0\ \mathrm{m}$ on its downstream face. Find the net force, its position, and the hoist pull if the gate weighs $60\ \mathrm{kN}$ and runs on slides with a friction coefficient of $0.35$.
::: solution
**The two faces.**
$$
F_1 = \frac{1}{2} \rho g b H_1^{2} = 0.5 \times 9{,}810 \times 4 \times 2.5^{2} = 122.6\ \mathrm{kN}
\quad \text{at} \quad \frac{2 \times 2.5}{3} = 1.667\ \mathrm{m\ below\ the\ upstream\ surface}
$$
$$
F_2 = 0.5 \times 9{,}810 \times 4 \times 1.0^{2} = 19.6\ \mathrm{kN}
\quad \text{at} \quad 0.667\ \mathrm{m\ below\ the\ downstream\ surface}
$$
**The net force.**
$$
F = 122.6 - 19.6 = 103.0\ \mathrm{kN}
$$
**The position, taken as moments about the sill.** $F_1$ acts $2.5 / 3 = 0.833\ \mathrm{m}$ and $F_2$ acts $1.0 / 3 = 0.333\ \mathrm{m}$ above the sill:
$$
\bar{y} = \frac{122.6 \times 0.833 - 19.6 \times 0.333}{103.0}
= \frac{102.2 - 6.5}{103.0} = 0.929\ \mathrm{m\ above\ the\ sill}
$$
**The friction.** The water's horizontal thrust presses the gate against its slides, so the slide friction is
$$
F_f = \mu F = 0.35 \times 103.0 = 36.1\ \mathrm{kN}
$$
and the **seal** at the bottom, compressed by the water head, contributes
$$
F_{\mathrm{seal}} = \mu_s \times p_{\mathrm{seal}} A_{\mathrm{seal}}
$$
With a $25\ \mathrm{mm}$ wide seal over $4\ \mathrm{m}$ at a contact pressure of $0.4\ \mathrm{MPa}$ and $\mu_s = 0.3$:
$$
F_{\mathrm{seal}} = 0.3 \times 0.4 \times 10^{6} \times 0.025 \times 4 = 12.0\ \mathrm{kN}
$$
**The hoist pull.**
$$
P = W + F_f + F_{\mathrm{seal}}
= 60 + 36.1 + 12.0 = 108\ \mathrm{kN}
$$
**The number that decides the hoist.** The water force enters the hoist pull only through friction, but at $36\ \mathrm{kN}$ that is a third of the total — which is why a sluice gate's hoist is sized as much by the slide friction coefficient as by the gate's weight, and why wheeled or roller gates replace slide gates where the head is large.
**The case that stalls hoists.** If the slides gall and the friction coefficient doubles to $0.7$,
$$
F_f = 0.7 \times 103.0 = 72.1\ \mathrm{kN}, \qquad P = 60 + 72.1 + 12.0 = 144\ \mathrm{kN}
$$
a $33\ \%$ overload on the $108\ \mathrm{kN}$ design pull, which is why hoists are given a margin over the clean-slide calculation.
*Sanity.* The net force is $103\ \mathrm{kN}$ and not $122.6$ because of the tailwater, and its line of action ($0.93\ \mathrm{m}$ above the sill) lies slightly **above** that of the upstream force ($0.83\ \mathrm{m}$) because the tailwater removes force from the bottom of the gate. A gate designed for the no-tailwater case carries $19\ \%$ more force acting slightly lower, so that case is the conservative one for the skin plate and the slide friction.
:::
:::

::: example A barge's loading {#ex-barge}
The $20\ \mathrm{m} \times 10\ \mathrm{m}$ barge of the worked case has a light displacement of $180\ \mathrm{t}$ at $KG = 1.2\ \mathrm{m}$ and takes a $200\ \mathrm{t}$ deck cargo whose centre of gravity is $3.4\ \mathrm{m}$ above the keel, plus $60\ \mathrm{t}$ of fresh water in a double-bottom tank $12\ \mathrm{m}$ long and $8\ \mathrm{m}$ wide that is **not** full. Find the draft, $GM$, and the roll period, and say whether the barge is fit to sail.
::: solution
**The displacement and the draft.**
$$
\Delta = 180 + 200 + 60 = 440\ \mathrm{t}, \qquad
\nabla = \frac{440 \times 10^{3}}{1{,}025} = 429.3\ \mathrm{m^{3}}
$$
$$
d = \frac{429.3}{20 \times 10} = 2.146\ \mathrm{m}
$$
**The vertical centre of gravity.** Taking moments about the keel, with the double-bottom water at $z = 0.4\ \mathrm{m}$:
$$
KG = \frac{180 \times 1.2 + 200 \times 3.4 + 60 \times 0.4}{440}
= \frac{216 + 680 + 24}{440} = 2.091\ \mathrm{m}
$$
**The transverse metacentre.**
$$
KB = \frac{2.146}{2} = 1.073\ \mathrm{m}, \qquad
I_{\mathrm{WP}} = \frac{20 \times 10^{3}}{12} = 1{,}667\ \mathrm{m^{4}}, \qquad
BM = \frac{1{,}667}{429.3} = 3.883\ \mathrm{m}
$$
$$
KM = 4.956\ \mathrm{m}, \qquad GM_{\mathrm{fluid}} = 4.956 - 2.091 = 2.865\ \mathrm{m}
$$
**The free-surface correction.** The slack tank's second moment about its own centreline:
$$
i = \frac{12 \times 8^{3}}{12} = 512\ \mathrm{m^{4}}, \qquad
\delta GM = - \frac{1{,}000}{1{,}025} \times \frac{512}{429.3} = - 1.163\ \mathrm{m}
$$
**The effective metacentric height.**
$$
GM_{\mathrm{eff}} = 2.865 - 1.163 = 1.702\ \mathrm{m}
$$
**The reading.** **The slack tank has eaten $41\ \%$ of the barge's stability**, and the crew's checklist item "all double-bottom tanks either full or empty" is this arithmetic. Filling the tank completely removes the free surface and restores $GM$ to $2.865\ \mathrm{m}$ at the cost of $60\ \mathrm{t}$ more displacement and $0.29\ \mathrm{m}$ more draft.
**The roll period.**
$$
T_{\phi} = \frac{2 \pi \times 0.40 \times 10}{\sqrt{9.807 \times 1.702}} = \frac{25.13}{4.087} = 6.15\ \mathrm{s}
$$
**The check against the rules.** A work barge's classification rule requires $GM \ge 0.30\ \mathrm{m}$ and a minimum righting-lever area; $1.70\ \mathrm{m}$ passes comfortably. But the **deck cargo's** $200\ \mathrm{t}$ at $3.4\ \mathrm{m}$ has raised $KG$ by $1.1\ \mathrm{m}$, and a **second** $100\ \mathrm{t}$ on the same deck (displacement $526.8\ \mathrm{m^{3}}$, draft $2.634\ \mathrm{m}$, $KM = 1.317 + 3.164 = 4.48\ \mathrm{m}$, free-surface correction $0.95\ \mathrm{m}$) would give
$$
KG = \frac{920 + 100 \times 3.4}{540} = 2.333\ \mathrm{m}, \qquad
GM_{\mathrm{eff}} = \left( 4.48 - 2.333 \right) - 0.95 = 1.20\ \mathrm{m}
$$
still positive — and the reason the barge is **not** therefore unlimited is that the **reserve** stability, measured by the area under the $GZ$ curve to $30^{\circ}$, falls faster than $GM$ does as the deck edge immerses. **A deck-loaded barge's limit is the immersion of the weather deck and not the metacentric height**, and the loading manual's curve is a **deck-edge** curve.
*Sanity.* The reason $BM$ is so large — $3.9\ \mathrm{m}$ against a $2.1\ \mathrm{m}$ draft — is that $I_{\mathrm{WP}} \propto B^{3}$ while $\nabla \propto B$, so $BM \propto B^{2} / d$. **Beam is stability**, and the reason a barge is wide and a yacht is narrow is that a barge trades speed for $B^{2}$ and a yacht trades $B^{2}$ for speed.
:::
:::

::: example A chimney's draught {#ex-chimney}
A $60\ \mathrm{m}$ brick chimney discharges flue gas at $280\ {}^{\circ}\mathrm{C}$ into air at $10\ {}^{\circ}\mathrm{C}$ and $101.325\ \mathrm{kPa}$. Find the natural draught in pascals and in millimetres of water, the gas velocity for a $1.2\ \mathrm{m}$ diameter flue, and the draught loss.
::: solution
**The densities.** Treating the flue gas as air with $R = 287\ \mathrm{J / kg \cdot K}$:
$$
\rho_{\mathrm{air}} = \frac{101{,}325}{287 \times 283.15} = 1.247\ \mathrm{kg / m^{3}}, \qquad
\rho_g = \frac{101{,}325}{287 \times 553.15} = 0.638\ \mathrm{kg / m^{3}}
$$
**The draught.**
$$
\Delta p = \left( \rho_{\mathrm{air}} - \rho_g \right) g H
= \left( 1.247 - 0.638 \right) \times 9.807 \times 60 = 358\ \mathrm{Pa}
$$
$$
\Delta p = \frac{358}{9.807} = 36.5\ \mathrm{mm\, H_2O}
$$
**The number that decides whether the boiler needs an ID fan.** $36\ \mathrm{mm}$ of water is **$3.6\ \mathrm{mbar}$**, and a coal-fired boiler's grate, bed and passes typically need **$15$ to $30\ \mathrm{mbar}$** — so a $60\ \mathrm{m}$ chimney provides **a quarter to an eighth** of the draught a stoker needs and every modern boiler has a **forced-draught fan**. **The natural-draught cooling tower of a power station is $200\ \mathrm{m}$ tall for exactly this reason**: at $\rho_{\mathrm{air}} - \rho_g = 0.15\ \mathrm{kg / m^{3}}$ and $H = 200\ \mathrm{m}$ the draught is $294\ \mathrm{Pa}$, which is enough for the tower's own very low-resistance fill.
**The gas temperature that maximises the flow.** The mass flow varies as $M \propto \sqrt{\rho_g \Delta p} \propto \sqrt{\left( \rho_a - \rho_g \right) \rho_g}$, which is stationary when $\rho_g = \rho_a / 2$, i.e. when
$$
T_g = 2\, T_{\mathrm{air}} \quad \left[ \mathrm{K} \right]
$$
For $10\ {}^{\circ}\mathrm{C}$ air that is $566\ \mathrm{K} = 293\ {}^{\circ}\mathrm{C}$; hotter gas than that gives more draught but less mass flow, and in practice the gas temperature is set by the boiler's heat recovery, not by the chimney. Note that the **draught itself** rises monotonically with $T_g$; it is the **flow** that peaks.
**The velocity and the loss.** For a gas flow of $8\ \mathrm{kg / s}$:
$$
\dot{V} = \frac{8}{0.638} = 12.54\ \mathrm{m^{3} / s}, \qquad
V = \frac{12.54}{\pi \times 0.6^{2}} = 11.1\ \mathrm{m / s}
$$
The friction loss over $60\ \mathrm{m}$ at $f = 0.020$:
$$
\Delta p_f = f \frac{L}{D} \frac{\rho_g V^{2}}{2}
= 0.020 \times \frac{60}{1.2} \times \frac{0.638 \times 123}{2} = 39.2\ \mathrm{Pa}
$$
and the exit (dynamic-head) loss:
$$
\Delta p_{\mathrm{exit}} = \frac{\rho_g V^{2}}{2} = 39.2\ \mathrm{Pa}
$$
**The balance.**
$$
\Delta p_{\mathrm{available}} = 358\ \mathrm{Pa}, \qquad
\Delta p_{\mathrm{required}} = 39.2 + 39.2 + \Delta p_{\mathrm{bend},\mathrm{pickup}} \approx 120\ \mathrm{Pa}
$$
**The chimney is over-sized for the flow**, and the surplus draught must be throttled at the damper; if it is not, it pulls excess combustion air through the furnace, and that air is **heated to $280\ {}^{\circ}\mathrm{C}$ and thrown away** up the stack — which is how a boiler's efficiency is quietly lost, and why the draught control loop matters.
*Sanity.* The reason the draught is only $358\ \mathrm{Pa}$ is that the density difference is $0.61\ \mathrm{kg / m^{3}}$ against the air's $1.25$ — **the hot gas is half the density and the draught is the difference, not the hot density**. The corollary is that a chimney works **better in cold weather**: the draught varies as $1 / T_{\mathrm{air}} - 1 / T_g$, so with the gas at $553\ \mathrm{K}$ it is $\left( 1 / 263 - 1 / 553 \right) / \left( 1 / 293 - 1 / 553 \right) = 1.24$ times, i.e. about **$24\ \%$ better at $- 10\ {}^{\circ}\mathrm{C}$ than at $+ 20\ {}^{\circ}\mathrm{C}$**, and a boiler whose draught was set in winter will run short of draught in summer.
:::
:::

::: example A manometer survey {#ex-manometer}
A differential U-tube with mercury ($S_m = 13.55$) is connected across a horizontal pipe carrying oil of specific gravity $0.86$; the oil fills the leads above the mercury. The deflection is $0.45\ \mathrm{m}$. Find the pressure drop and the head loss, then repeat for an inverted U-tube with an oil of $S = 0.82$ in the crown and the same $0.45\ \mathrm{m}$ deflection.
::: solution
**The direct (U-tube) manometer.** Starting at the upstream tap and working through:
$$
p_1 + 0.86 \rho_w g \left( h + 0.45 \right) - 13.55 \rho_w g \times 0.45 - 0.86 \rho_w g\, h = p_2
$$
where $h$ is the height of the oil column above the lower meniscus. **The unknown $h$ cancels**, which is the whole of the U-tube's elegance:
$$
p_1 - p_2 = \left( 13.55 - 0.86 \right) \rho_w g \times 0.45
= 12.69 \times 9{,}807 \times 0.45 = 56.0\ \mathrm{kPa}
$$
**The head loss.** Because the pipe is horizontal the pressure drop **is** the head loss, expressed in the **flowing** fluid:
$$
h_f = \frac{p_1 - p_2}{\rho_{\mathrm{oil}} g} = \frac{56{,}000}{860 \times 9.807} = 6.64\ \mathrm{m\ of\ oil}
$$
**The inverted manometer.** With the light oil in the crown:
$$
p_1 - p_2 = \left( 0.86 - 0.82 \right) \rho_w g \times 0.45
= 0.04 \times 9{,}807 \times 0.45 = 177\ \mathrm{Pa}
$$
**The comparison, which is the point of the exercise.** The inverted manometer reads **$1 / 317$** of the same physical pressure drop for the same deflection — so it is used for **small** drops in **liquids**, and the direct mercury manometer for large ones. **The figure of merit is $\left( S_m - S \right)$ for a direct gauge and $\left( S - S_m \right)$ for an inverted one**, and a manometer whose manometric fluid's density is close to the flowing fluid's is a **magnifier**.
**The error the question hides.** If the leads are **not** fully vented and a $20\ \mathrm{mm}$ air pocket remains in one of them, the oil column is $20\ \mathrm{mm}$ shorter on that side and the reading is in error by
$$
\delta p = 0.86 \times 9{,}807 \times 0.020 = 169\ \mathrm{Pa}
$$
**$0.3\ \%$ of the $56.0\ \mathrm{kPa}$ reading and $96\ \%$ of the $177\ \mathrm{Pa}$ reading.** **A vented manometer is not a refinement on an inverted installation; it is the installation.**
*Sanity.* The reason the $h$ terms cancel is that the two taps are at the same elevation and the same fluid fills the leads to the same interface height difference; if the taps are at **different elevations** the $h$ terms do **not** cancel and the manometer reads $\Delta p + \rho g \Delta z$, which is the **piezometric** difference and not the pressure difference. **A manometer across a vertical Venturi therefore reads the piezometric difference, which is exactly what the Venturi equation needs; across a vertical pipe of constant bore it reads only the friction loss, however large the elevation change.**
:::
:::

::: history
**Archimedes of Syracuse**, around **250 BC**, gave the buoyancy theorem in *On Floating Bodies*, and the story of the crown and the bath is **Vitruvius**'s, written in the **20s BC** about two centuries later, and is probably apocryphal in its detail. **The hydrostatic paradox** and the pressure-transmission principle are set out in **Pascal**'s *Traité de l'équilibre des liqueurs* (written about **1653**, published **1663**); at Pascal's request his brother-in-law **Florin Périer** carried a barometer up the **Puy de Dôme** in **1648** and showed that the atmosphere's pressure falls with height. **Torricelli**'s barometer of **1644** and **von Guericke**'s Magdeburg hemispheres of **1654** established the weight of the atmosphere against the Aristotelian horror vacui in a decade. **The metacentre** enters engineering with **Pierre Bouguer**'s *Traité du navire* of **1746**, written by a mathematician who had spent nine years in the Andes measuring the shape of the Earth and who gave the ship's stability problem the $BM = I / V$ form for the first time; **Euler**'s contemporary work on the same subject is more elegant and less used. **The Plimsoll line**, made compulsory for British ships by the Merchant Shipping Act of **1876** after Samuel Plimsoll's campaign (his book *Our Seamen* appeared in **1873**) against overloaded, over-insured "coffin ships", is the reason a load line is a **legal** and not merely an engineering document. **The stratosphere** was discovered from unmanned balloon soundings by **Léon Teisserenc de Bort** and, independently, **Richard Assmann**, announced in **1902**: the temperature **stops falling** at roughly eleven kilometres. The lapse rate of $6.5\ \mathrm{K / km}$ below that height became the basis of the standard atmospheres adopted for aviation in the **1920s**.
:::

## Where this leads

Hydrostatics supplies the pressure field that [[fluid-mechanics/control-volume-analysis]] differentiates into a force and [[fluid-mechanics/bernoulli]] converts into a velocity; the metacentric argument reappears as the restoring term in [[dynamics]]'s body-motion equations and in [[flight-mechanics]]'s static-margin discussion; the barometric formula is the boundary condition for [[fluid-mechanics/compressible-flow]] and for [[propulsion]]'s intake recovery; and the manometer is the ancestor of every differential pressure flow meter in [[manufacturing]] and [[energy-systems]].

::: summary
- A fluid at rest carries only a normal stress, so $\nabla p = \rho \mathbf{g}$ and $p = p_0 + \rho g d$ for a liquid.
- The force on a plane is $p_c A$ but acts at $y_c + I_c / (y_c A)$, and the offset is the hinge moment that decides the hoist.
- Curved surfaces are handled by components: the horizontal force is the plane force on the vertical projection and the vertical force is the weight of the fluid above.
- A radial gate's hydrostatic force passes through its trunnion, which is why large spillways use them.
- $GM = KB + BM - KG$ with $BM = I_{\mathrm{WP}} / \nabla$, and $BM \propto B^2 / d$: beam is stability.
- A slack tank subtracts $\rho_t i / (\rho \nabla)$ from $GM$ and can subtract more than the whole of it; ships divide wide tanks with longitudinal bulkheads for this reason.
- A vessel with $GM < 0$ does not sink — it finds an angle of loll and stays there, which is how a stability failure is reported by a crew that does not know it.
- In an accelerating or rotating frame the free surface is perpendicular to the effective gravity, giving a slope $a_x / (g + a_z)$ and a paraboloid $z = \Omega^2 r^2 / 2g$.
:::

::: quiz
A barge has $GM = + 2.4\ \mathrm{m}$ and is fit to sail. A crewman then sounds a double-bottom tank and finds it half full of fresh water, and reports that the barge "lists a little but is stiff." What should the stability officer do?
- [ ] Nothing: a positive $GM$ is a positive $GM$
- [x] Compute the free-surface correction, because the effective $GM$ is the tabulated value minus $\rho_t i / (\rho \nabla)$
- [ ] Pump the tank out, because less weight always means more stability
- [ ] Ballast the opposite side to level the list
::: solution
The tabulated $GM$ is a **solid** (or fluid) value that assumes every tank is either full or empty. A slack surface contributes its own waterplane inertia to the transverse inertia of the whole floating system, and the correction $\delta GM = - \left( \rho_t / \rho \right) i / \nabla$ is, for a wall-sided tank, **independent of how much liquid is in it** — as large for a tank a tenth full as for one half full — and it vanishes only when the tank is completely full or completely empty. Pressing the tank full or pumping it dry removes the correction, but **not** because less weight helps: it is the free surface, not the weight, that costs the stability. Ballasting the low side to level the list is dangerous, because a list caused by loss of stability is a loll, and a lolling vessel can flop over to the other side with more heel.
:::
:::

## Exercises

::: exercise Pressure {level=1 check="98.1"}
Give the gauge pressure in kilopascals at a depth of $10\ \mathrm{m}$ in fresh water, taking $\rho = 1{,}000\ \mathrm{kg / m^{3}}$ and $g = 9.81\ \mathrm{m / s^{2}}$.
::: solution
$p = 1{,}000 \times 9.81 \times 10 = 98{,}100\ \mathrm{Pa} = 98.1\ \mathrm{kPa}$ (with $\rho = 998.2$ and $g = 9.807$ it is $97.9\ \mathrm{kPa}$).
:::
:::

::: exercise Manometer {level=1 check="98.5"}
Give the pressure in kilopascals measured by a U-tube manometer with a $0.8\ \mathrm{m}$ mercury deflection ($S_m = 13.55$) against water.
::: solution
$p = (13.55 - 1) \times 9{,}807 \times 0.8 = 98.5\ \mathrm{kPa}$.
:::
:::

::: exercise Centre of pressure {level=1 check="1.333"}
Give the depth in metres below the surface at which the resultant acts on a vertical rectangular wall of $2\ \mathrm{m}$ height with water to its top.
::: solution
$y_p = 2H / 3 = 4 / 3 = 1.333\ \mathrm{m}$, i.e. $0.333\ \mathrm{m}$ below the centroid at $1.0\ \mathrm{m}$.
:::
:::

::: exercise Metacentre {level=1 check="4.17"}
Give $BM$ in metres for a barge $20\ \mathrm{m}$ long and $10\ \mathrm{m}$ beam at a $2.0\ \mathrm{m}$ draft.
::: solution
$BM = I / \nabla = (20 \times 1000 / 12) / 400 = 1{,}667 / 400 = 4.17\ \mathrm{m}$.
:::
:::

::: exercise Free surface {level=1 check="1.16"}
Give the reduction in metres of $GM$ caused by a slack fresh-water tank $12\ \mathrm{m}$ long and $8\ \mathrm{m}$ wide in a $429.3\ \mathrm{m^{3}}$ seawater displacement.
::: solution
$\delta GM = (1000 / 1025) \times (12 \times 512 / 12) / 429.3 = 0.976 \times 512 / 429.3 = 1.16\ \mathrm{m}$.
:::
:::

::: exercise Rotating liquid {level=1 check="0.181"}
Give the depression in metres at the axis of an open $0.6\ \mathrm{m}$ diameter cylinder of water rotated at $60\ \mathrm{rev / min}$.
::: solution
$z = \Omega^2 r^2 / (2g) = 6.283^2 \times 0.30^2 / 19.61 = 0.181\ \mathrm{m}$.
:::
:::

::: exercise Atmosphere {level=1 check="0.637"}
Give the ratio $p / p_0$ of the standard atmosphere at $3{,}650\ \mathrm{m}$.
::: solution
$p / p_0 = (1 - 0.0065 \times 3650 / 288.15)^{5.2559} = (1 - 0.08234)^{5.2559} = 0.9177^{5.2559} = 0.637$.
:::
:::

::: exercise Gate {level=2}
A vertical circular gate of $1.5\ \mathrm{m}$ diameter has its centre $2.5\ \mathrm{m}$ below a water surface. Give the force in kilonewtons and the centre of pressure's depth below the surface.
::: solution
$$
A = \frac{\pi \times 1.5^{2}}{4} = 1.767\ \mathrm{m^{2}}, \qquad
F = 9{,}810 \times 2.5 \times 1.767 = 43.4\ \mathrm{kN}
$$
$$
I_c = \frac{\pi \times 1.5^{4}}{64} = 0.2485\ \mathrm{m^{4}}, \qquad
y_p - y_c = \frac{0.2485}{2.5 \times 1.767} = 0.0562\ \mathrm{m}
$$
**The centre of pressure is at $2.556\ \mathrm{m}$** — $56\ \mathrm{mm}$ below the centre.
*Sanity.* The eccentricity scales as $D^{2} / \left( 16 d_c \right)$, so it **falls** as the gate is submerged deeper and **rises** as the gate gets bigger. A gate at a shallow depth is the awkward one, and the reason a **radial** gate is preferred for a shallow, wide opening is that its hydrostatic force passes through the trunnion whatever the depth.
:::
:::

::: exercise Angle of loll {level=2 check="17.5"}
A ship has $GM = - 0.25\ \mathrm{m}$ and $BM = 5.0\ \mathrm{m}$. Give its angle of loll in degrees.
::: solution
$$
\theta_l = \tan^{- 1} \sqrt{\frac{- 2 GM}{BM}} = \tan^{- 1} \sqrt{\frac{0.50}{5.0}}
= \tan^{- 1} 0.3162 = 17.5^{\circ}
$$
**The ship will heel to $17.5^{\circ}$ and stay there.** The remedy is to lower $G$ — remove or lower top-side weight, or ballast a low double-bottom tank with care, because while that tank is filling its free surface reduces $GM$ further before its low weight helps.
:::
:::

::: exercise Derivation {level=3}
Derive $BM = I_{\mathrm{WP}} / \nabla$ from the shift of the centre of buoyancy on a small heel, and extend the derivation to obtain the wall-sided formula $GZ = \sin \theta \left( GM + \tfrac{1}{2} BM \tan^{2} \theta \right)$.
::: solution
**The wedge argument.** Heel a floating body through a small angle $\theta$. The submerged volume is unchanged, but a wedge of volume has emerged on one side and an equal wedge immersed on the other, and each has moved its own centroid sideways by a distance of order $y$ from the centreline. The centre of buoyancy therefore shifts by
$$
BB' = \frac{1}{\nabla} \int_{\mathrm{WP}} \theta y \cdot y\, dA = \frac{\theta}{\nabla} \int_{\mathrm{WP}} y^{2} dA = \frac{\theta I_{\mathrm{WP}}}{\nabla}
$$
**The shift is horizontal to first order**, because the vertical component is of order $\theta^{2}$. The new buoyancy line is perpendicular to the tilted waterline and passes through $B'$, and it cuts the original centreline at $M$ where
$$
BB' = BM \sin \theta \approx BM\, \theta
\quad \Rightarrow \quad
\boxed{ BM = \frac{I_{\mathrm{WP}}}{\nabla} }
$$
**The righting lever at small angles** follows immediately: the buoyancy force through $M$ and the weight through $G$ are separated by
$$
GZ = GM \sin \theta
$$
**The wall-sided formula, for finite angles.** For a wall-sided vessel the immersed and emerged wedges are triangular prisms of half-breadth $b$ and height $b \tan \theta$, and transferring one to the other moves the centre of buoyancy, in axes fixed to the ship, by
$$
\Delta y_B = BM \tan \theta \quad \text{(sideways)}, \qquad
\Delta z_B = \tfrac{1}{2} BM \tan^{2} \theta \quad \text{(upward)}
$$
with $BM = I_{\mathrm{WP}} / \nabla$ the upright value. The righting lever is the horizontal distance between $G$ and the new $B$ measured in the heeled (earth) frame:
$$
GZ = \Delta y_B \cos \theta + \Delta z_B \sin \theta - BG \sin \theta
= \sin \theta \left[ BM + \tfrac{1}{2} BM \tan^{2} \theta - BG \right]
$$
$$
\boxed{ GZ = \sin \theta \left[ GM + \tfrac{1}{2} BM \tan^{2} \theta \right] }
$$
**The reading.** The $GM$ term is the **weight** restoring and the $\tfrac{1}{2} BM \tan^{2} \theta$ term is the **form** restoring — the metacentre climbs as the vessel heels because the waterplane's second moment grows as $\sec^{3} \theta$. **The form term is why a ship with a small or even negative $GM$ can still have a large righting lever at $30^{\circ}$**, and why a tender ship is not necessarily an unsafe one.
**The angle of loll.** Setting $GZ = 0$ with $GM < 0$ and $\theta \ne 0$:
$$
GM + \tfrac{1}{2} BM \tan^{2} \theta = 0
\quad \Rightarrow \quad
\theta_l = \tan^{- 1} \sqrt{\frac{- 2 GM}{BM}}
$$
**The validity limit.** The wall-sided formula assumes the vessel's sides are vertical between the waterline and the deck edge, so it fails once the deck edge immerses (typically $10$ to $15^{\circ}$ on a full-form barge) and fails completely once the bilge emerges. **Beyond that the righting lever must be computed from the actual offsets of the wedges, which is what a hydrostatics program does and why a stability booklet is computed and not tabulated from $GM$.**
*Sanity.* The reason $BM \propto B^{2} / d$ for a box is that $I_{\mathrm{WP}} \propto L B^{3}$ and $\nabla \propto L B d$, and the reason a **catamaran's** initial stability is enormous is that its waterplane second moment is the sum of two hulls' own inertias **plus** the parallel-axis term $2 A \left( s / 2 \right)^{2}$, which for a $6\ \mathrm{m}$ centreline spacing on $2\ \mathrm{m}$ beams is $2 \times 2 L \times 3^{2} = 36 L$ against $2 \times L \times 2^{3} / 12 = 1.33 L$, **twenty-seven times** the hulls' own. **A catamaran is stable because of the $s^{2}$ term and not because of the hulls.**
:::
:::

::: exercise Design {level=3}
Specify the stability, ballast, tankage and loading-documentation basis for a $60\ \mathrm{m}$ work barge that must carry $1{,}200\ \mathrm{t}$ of deck cargo in the North Sea, and state the verification tests.
::: solution
**The principal dimensions, driven by stability and not by strength.**
$$
\begin{array}{l c l}
L & 60\ \mathrm{m} & \text{set by the deck area needed for the cargo} \\
B & 20\ \mathrm{m} & \text{set by } GM \text{ and by the deck-edge immersion} \\
D & 4.5\ \mathrm{m} & \text{freeboard after the load line} \\
\text{Moulded draft} & 3.2\ \mathrm{m} & \text{at the tropical load line} \\
\text{Light displacement} & 1{,}050\ \mathrm{t} & \text{steel at } 7.85 \text{ with a } 15\ \% \text{ outfit} \\
\text{Deadweight} & 1{,}200\ \mathrm{t} & \text{the cargo, plus } 60\ \mathrm{t} \text{ of consumables}
\end{array}
$$
**The stability case at the summer load line.**
$$
\nabla = 60 \times 20 \times 3.2 = 3{,}840\ \mathrm{m^{3}}, \qquad \Delta = 3{,}936\ \mathrm{t}
$$
$$
KB = 1.60\ \mathrm{m}, \qquad
I_{\mathrm{WP}} = \frac{60 \times 20^{3}}{12} = 40{,}000\ \mathrm{m^{4}}, \qquad
BM = \frac{40{,}000}{3{,}840} = 10.42\ \mathrm{m}
$$
$$
KM = 12.02\ \mathrm{m}, \qquad KG_{\mathrm{solid}} = 5.90\ \mathrm{m}, \qquad GM = 6.12\ \mathrm{m}
$$
**The free-surface allowance, which is the design constraint.** The barge carries $220\ \mathrm{t}$ of fresh water, $80\ \mathrm{t}$ of fuel oil and $60\ \mathrm{t}$ of sludge in **nine** tanks; the worst single slack tank is the $14 \times 9\ \mathrm{m}$ fresh-water tank:
$$
i = \frac{14 \times 729}{12} = 850.5\ \mathrm{m^{4}}, \qquad
\delta GM = \frac{1{,}000}{1{,}025} \times \frac{850.5}{3{,}840} = 0.216\ \mathrm{m}
$$
**The rule the design adopts.** A total free-surface allowance of **$0.9\ \mathrm{m}$** — about four tanks as large as the worst one slack at the same time — is deducted from $GM$, and the service-condition table must keep every other tank full or empty. **The tank layout is a stability document and not a piping one.**
**The intact-stability criteria** (IMO IS Code, applied to a work boat by class rule):
$$
\begin{array}{l c}
GM_0 \ge 0.15\ \mathrm{m} & 6.12 - 0.90 = 5.22\ \mathrm{m} \quad \checkmark \\
GZ \ge 0.20\ \mathrm{m}\ \text{at } \theta \ge 30^{\circ} & 3.1\ \mathrm{m} \quad \checkmark \\
GZ_{\max}\ \text{at } \theta \ge 25^{\circ} & 30^{\circ} \quad \checkmark \\
\text{Area } 0 \text{ to } 30^{\circ} \ge 0.055\ \mathrm{m \cdot rad} & 0.92 \quad \checkmark \\
\text{Area } 0 \text{ to } 40^{\circ} \ge 0.090\ \mathrm{m \cdot rad} & 1.55 \quad \checkmark \\
\text{Area } 30 \text{ to } 40^{\circ} \ge 0.030\ \mathrm{m \cdot rad} & 0.63 \quad \checkmark
\end{array}
$$
**The damage case that governs.** Flooding one side compartment to a $12\ \mathrm{m}$ penetration gives an unsymmetrical condition with a heel of $14^{\circ}$ and a residual righting lever of $0.42\ \mathrm{m}$ to $25^{\circ}$ — **passing, but only because the deck edge is $1.3\ \mathrm{m}$ above the waterline**, and the reason the moulded depth is $4.5\ \mathrm{m}$ and not $3.5\ \mathrm{m}$.
**The roll period and the wave match.**
$$
T_{\phi} = \frac{2 \pi \times 0.40 \times 20}{\sqrt{9.807 \times 5.22}} = \frac{50.3}{7.16} = 7.02\ \mathrm{s}
$$
**against a North Atlantic energy period of $8$ to $11\ \mathrm{s}$** — close enough that the barge will roll in a following sea, and the reason a $1{,}200\ \mathrm{t}$ deck cargo needs **lashing designed for a $0.45\ g$ transverse acceleration** and not the $0.2\ g$ a coastal rule would allow.
**The verification tests.**
$$
\begin{array}{l l l}
\text{Inclining experiment} & \text{at lightship, with } 10 \text{ to } 15\ \% \text{ of displacement in known weights} & \text{gives } KG_{\mathrm{light}} \text{ to } \pm 25\ \mathrm{mm} \\
\text{Density of the water} & \text{at four points in the dock} & 5\ \mathrm{kg / m^{3}} \text{ is } 5\ \mathrm{t} \text{ of displacement} \\
\text{Heel test} & \text{at each of four loading conditions} & \text{checks the loading manual, not the design} \\
\text{Tank-sounding tables} & \text{calibrated by a metered fill} & \text{the loading computer's input} \\
\text{Air-pipe and sounding-pipe check} & \text{each tank, with the tank full} & \text{a blocked air pipe makes a sounding a fiction}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE LOADING MANUAL SHALL BE COMPUTED WITH THE FREE-SURFACE ALLOWANCE STATED AND SHALL BE VALID FOR ANY COMBINATION OF TANKS THAT IS NOT PROHIBITED BY THE SERVICE-CONDITION TABLE."** **"THE INCLINING EXPERIMENT SHALL BE WITNESSED BY CLASS AND THE RESULTING $KG_{\mathrm{LIGHT}}$ SHALL BE COMPARED WITH THE DESIGN VALUE, WITH A RE-INCLINE REQUIRED AT A DIFFERENCE EXCEEDING $150\ \mathrm{mm}$."** **"THE DECK-CARGO LASHING SHALL BE DESIGNED FOR THE TRANSVERSE ACCELERATION STATED FOR THE OPERATING AREA AND NOT FOR A COASTAL LIMIT."** **"THE STABILITY BOOKLET SHALL INCLUDE THE ANGLE-OF-LOLL CASE AND THE CRITICAL-HEEL PROCEDURE FOR EVERY TANK THAT CAN BE SLACK."**
*Design comment.* The general rule is that **a barge's principal dimensions are set by $B^{2} / d$ and its freeboard, and its steel weight follows from neither** — and that the single most expensive stability document is the one that says which tanks may be slack, because it constrains the piping, the pump-room layout and the ballast schedule all at once.
:::
:::
