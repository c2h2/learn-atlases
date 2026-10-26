Bending is what structures mostly do. A joist, a crankshaft, a wing spar, a leaf spring, a diving board, a shelf bracket: none of them is loaded along its axis, all of them carry a moment, and in every one of them the material near the surface is doing almost all the work while the material near the middle does almost none. That single observation explains the shape of an I-beam, the hollow section of a bicycle frame, the laminated leaf of a spring, the tapered wing of a glider and the fact that a drinking straw is stronger than a rod of the same mass of plastic.

The theory is short. Plane sections stay plane, so the longitudinal strain is linear in the distance from a surface called the **neutral axis**; the material is linear elastic, so the stress is linear too; and the two equilibrium conditions — zero net axial force and a net moment equal to $M$ — locate the neutral axis at the centroid and give $\sigma = M y / I$. Two facts follow that engineers spend the rest of their careers exploiting: the stress is zero at the centroid and maximum at the outermost fibre, and the resistance scales with the second moment of area, which weights material by the **square** of its distance from the axis.

::: warning $\sigma = My/I$ has three conditions, and all three bite
The formula requires (i) **linear elastic** material, so it fails for a timber beam at high load or any beam that has yielded; (ii) loading in a **plane of symmetry**, so it fails for an angle or a channel bent about an unsymmetric axis, where the beam bends and twists in a direction nobody predicted; and (iii) a beam **not too short and not too thin**, so it fails for deep coupling links, for thin-walled open sections that warp, and within one depth of a concentrated load. It also assumes the neutral axis passes through the **centroid**, which is true only when the material is the same above and below the axis — a reinforced concrete beam, a bimorph and a wood-steel flitch all have their neutral axis somewhere else.
:::

## The flexure formula

::: definition Bending stress {#def-flexure}
For a prismatic beam of homogeneous linear elastic material bent by a moment $M$ about an axis through its centroid,
$$
\sigma_x = \frac{M y}{I}, \qquad
\sigma_{\max} = \frac{M c}{I} = \frac{M}{Z}, \qquad
Z = \frac{I}{c},
$$
where $y$ is measured from the **centroidal** axis, $c$ is the distance to the outermost fibre, $I$ is the second moment of area about the neutral axis, and $Z$ is the **section modulus**. The curvature is
$$
\frac{1}{\rho} = \frac{M}{E I},
$$
so the beam's bending **stiffness** is set by $E I$ and its bending **strength** by $\sigma_{\text{allow}} Z$ — a distinction that matters because the material that maximises one is not always the material that maximises the other.
:::

::: proof
**Geometry.** Assume plane sections remain plane and the beam deforms into a circular arc of radius $\rho$. A fibre at distance $y$ from the neutral surface has length $(\rho + y) \mathrm{d} \theta$ against the neutral fibre's $\rho \, \mathrm{d} \theta$, so
$$
\varepsilon_x = \frac{(\rho + y) \mathrm{d} \theta - \rho \, \mathrm{d} \theta}{\rho \, \mathrm{d} \theta} = \frac{y}{\rho},
$$
linear in $y$ and zero on the neutral surface.

**Physics.** Hooke's law gives $\sigma_x = E y / \rho$, also linear.

**Equilibrium.** Zero net axial force requires
$$
\int_A \sigma_x \, \mathrm{d} A = \frac{E}{\rho} \int_A y \, \mathrm{d} A = 0 ,
$$
and since $E / \rho$ is not zero, $\int y \, \mathrm{d} A = 0$: the neutral axis passes through the **centroid**. Moment equilibrium gives
$$
M = \int_A \sigma_x y \, \mathrm{d} A = \frac{E}{\rho} \int_A y^{2} \, \mathrm{d} A = \frac{E I}{\rho} .
$$
Eliminating $\rho$ between the stress and moment expressions gives $\sigma_x = M y / I$ and the curvature relation $1 / \rho = M / E I$.
:::

::: proposition Material efficiency in bending {#prop-efficiency}
For a given cross-sectional area, the section modulus $Z$ is maximised by placing all the material as far from the neutral axis as possible. The shape factors for a fixed area $A$ are
$$
\frac{Z_{\text{rectangle, depth } 2 \times \text{ width}}}{Z_{\text{square}}} = 1.41, \qquad
\frac{Z_{\text{I-section}}}{Z_{\text{round of same area}}} \approx 3 \text{ to } 5,
$$
since $Z = A d / 6$ for any rectangle of area $A$, and a rectangle twice as deep as it is wide is $\sqrt{2}$ times as deep as the square of the same area. The cost of efficiency is instability: the further the material is pushed from the axis, the more likely the compression flange is to buckle sideways or the web to buckle in shear, and real sections are the compromise between the two.
:::

::: example Rectangular timber beam {#ex-timber}
A timber beam of $100\ \mathrm{mm}$ width and $200\ \mathrm{mm}$ depth spans $3\ \mathrm{m}$ simply supported and carries a central load of $20\ \mathrm{kN}$. Find the maximum bending stress. What does it become if the beam is turned on its side?
::: solution
$$
M_{\max} = \frac{P L}{4} = \frac{20 \times 3}{4} = 15\ \mathrm{kN\,m},
$$
$$
Z = \frac{b d^{2}}{6} = \frac{100 \times 200^{2}}{6} = 666.7 \times 10^{3}\ \mathrm{mm^{3}},
\qquad
\sigma = \frac{15 \times 10^{6}}{666.7 \times 10^{3}} = 22.5\ \mathrm{MPa}.
$$
Turned on its side, $b = 200$, $d = 100$, $Z = 333.3 \times 10^{3}\ \mathrm{mm^{3}}$ and
$$
\sigma = 45.0\ \mathrm{MPa}.
$$
*Sanity.* Turning the beam on its side **doubles** the stress, because $Z \propto d^{2}$ and the depth halved. This is the reason a floor joist is installed with its long dimension vertical, the reason a ruler snaps easily when loaded flatwise, and the reason a $100 \times 50$ shelf bracket is four times as stiff edge-on as flat ($I \propto b d^{3}$, so the ratio is $(100 / 50)^{2}$). The area is identical in both orientations; only the distribution of that area about the axis has changed, and $I$ weights by $y^{2}$.
:::
:::

::: example Rolled I-section {#ex-isection}
An I-section with flanges $101.7\ \mathrm{mm}$ wide has $I_x = 32.7 \times 10^{6}\ \mathrm{mm^{4}}$, depth $254.9\ \mathrm{mm}$, flange thickness $8.4\ \mathrm{mm}$ and web thickness $6.0\ \mathrm{mm}$. Find the extreme-fibre stress and the stress at the flange–web junction for $M = 40\ \mathrm{kN\,m}$, and the fraction of the moment carried by the flanges.
::: solution
$$
\sigma_{\max} = \frac{M c}{I} = \frac{40 \times 10^{6} \times 127.45}{32.7 \times 10^{6}} = 155.8\ \mathrm{MPa},
$$
$$
\sigma_{\text{junction}} = 155.8 \times \frac{119.05}{127.45} = 145.6\ \mathrm{MPa}.
$$
**Flange contribution.** Each flange has area $101.7 \times 8.4 = 854\ \mathrm{mm^{2}}$ at a lever arm of $(254.9 - 8.4) / 2 = 123.25\ \mathrm{mm}$, so treating the flange stress as uniform at its centroidal value,
$$
M_{\text{flanges}} \approx 2 \times 854 \times 150.7 \times 0.12325 = 31.7\ \mathrm{kN\,m},
$$
taking the flange stress at mid-thickness, $155.8 \times 123.25 / 127.45 = 150.7\ \mathrm{MPa}$. That is $79$ per cent of the total from $54$ per cent of the area.

*Sanity.* The web carries only about a fifth of the bending moment, yet it is essential, because it holds the flanges apart, transfers the shear, and prevents the compression flange from buckling out. A section made of two flanges and no web is unstable; a section made of a web and no flanges is weak. This is why the proportioning rules in every steel handbook look arbitrary until you see that the flanges are sized for moment and the web for shear and buckling, and why a plate girder's web is thin and stiffened while its flanges are thick and narrow.
:::
:::

::: widget plot
f: 40e6*x/32.7e6
x: -127.45, 127.45
y: -170, 170
labels: \text{bending stress (MPa) against distance from the neutral axis (mm)}
caption: Linear bending stress distribution across the depth of the I-section of Example 2 for $M = 40\ \mathrm{kN\,m}$: zero at the centroid, $\pm 155.8\ \mathrm{MPa}$ at the outer fibres, $\pm 145.6\ \mathrm{MPa}$ at the flange–web junction. The stress at a flange's mid-thickness times the flange area gives the flange force. Note that the diagram is drawn as if the section were solid; in the web the actual stress follows the same straight line but acts on very little area, which is exactly why the web contributes so little to $I$.
:::

::: proposition Depth is bought, not free {#prop-economical-depth}
For a rectangular section of fixed area $A = b d$, the section modulus is $Z = A d / 6$, so the bending **strength** is directly proportional to the depth. The second moment is $I = A d^{2} / 12$, so the **stiffness** is proportional to the square of the depth. But the deflection of a span $L$ under a fixed total load is
$$
\delta \propto \frac{1}{I} \propto \frac{1}{d^{2}},
$$
while the compression flange, carrying a larger share of a larger moment with no more lateral stiffness, becomes more prone to buckling sideways. Doubling a beam's depth at constant weight therefore doubles its strength and quadruples its stiffness, but makes it more dependent on lateral restraint.
:::

::: proof
With $A$ fixed, $Z = b d^{2} / 6 = A d / 6$ and $I = b d^{3} / 12 = A d^{2} / 12$, both immediate. For lateral-torsional buckling of a doubly symmetric I-beam loaded in the plane of its web, the critical moment is approximately
$$
M_{cr} \approx \frac{\pi}{L_c} \sqrt{E I_y G J} ,
$$
and $I_y$ of the compression flange is essentially independent of the depth while the lever arm between the flanges grows as $d$, so the elastic buckling resistance of the whole section falls off as the flanges are pushed further apart and unrestrained. The three effects pull in opposite directions, and the practical consequence is that the optimum depth of a real beam is set not by $\sigma = M c / I$ but by the ratio of span to depth: about $L / 15$ to $L / 20$ for a rolled steel floor beam, and deeper, about $L / 10$ to $L / 15$, for a plate girder whose thin web is stiffened against the buckling that would otherwise govern.
:::

::: example Uniform-strength cantilever {#ex-uniform-strength}
A cantilever of length $L$ and constant depth $d$ is cut in plan as a triangle of root width $b_0$ and zero width at the tip, and carries a tip load $P$. Show that the bending stress is constant along the length and find its value. What does the deflection become?
::: solution
At distance $x$ from the tip the width is $b (x) = b_0 x / L$ and the moment is $M (x) = P x$, so
$$
\sigma (x) = \frac{6 M}{b d^{2}} = \frac{6 P x}{\left( b_0 x / L \right) d^{2}}
= \frac{6 P L}{b_0 d^{2}},
$$
independent of $x$: every section is stressed to exactly the same value, which is the definition of a **uniform-strength** or **equal-strength** beam.

The weight is half that of the smallest prismatic beam of the same depth, since the plan area is halved. The tip deflection, however, is
$$
\delta = \frac{3}{2} \cdot \frac{P L^{3}}{3 E I_{\max}} = \frac{P L^{3}}{2 E I_{\max}},
$$
where $I_{\max} = b_0 d^{3} / 12$ is the second moment at the root — $1.5$ times the deflection of the prismatic beam of root section.

*Sanity.* Nature discovered this first: a tree trunk, a fish rib, a leaf midrib and a bird's wing bone are all tapered roughly as the bending moment requires, which is why they are light. Engineers use the same idea in leaf springs (a triangular plate, or a series of graduated leaves), in the tapered blades of a turbine, in the tapered leaf of a cantilever road sign and in the haunch of a steel or timber frame. The trade-off is that a tapered beam is stiffer where it is already stiff enough and softer where it is not, so a uniform-strength design is a **strength** optimisation that costs deflection — and in practice the taper is stopped short of the tip anyway, because the end needs to carry something.
:::
:::

## Built-up and unsymmetric sections

::: algorithm Sections that are not standard {#alg-builtup}
1. **Split** the section into rectangles and take each one's area and centroid.
2. **Locate the neutral axis** from $\bar y = \sum A_i y_i / \sum A_i$. For a homogeneous section this is the centroid; for a **transformed** composite section, first scale each material's width by the modular ratio $n = E_2 / E_1$.
3. **Compute $I$ about the neutral axis** using the parallel-axis theorem, $I = \sum (I_i + A_i d_i^{2})$, where $d_i$ is measured to the **neutral axis**, not to the sub-rectangle's own convenient reference.
4. **Measure $c$ to the extreme fibre in tension and in compression separately.** For an unsymmetric section they differ, and the governing stress is $\max (M c_t / I, M c_c / I)$.
5. **Check the axis of loading.** If the moment is not applied about a principal axis, resolve it into the principal components and use $\sigma = (M_y I_z \pm M_z I_y) / (I_y I_z - I_{yz}^{2})$ — or the beam will bend in a direction your drawing does not show.
:::

::: example Flitched beam {#ex-flitch}
A flitched beam consists of two timber joists $100 \times 200\ \mathrm{mm}$ with a steel plate $180\ \mathrm{mm}$ deep and $10\ \mathrm{mm}$ thick bolted between them. Take $E_s = 200\ \mathrm{GPa}$, $E_w = 10\ \mathrm{GPa}$. Find the maximum stresses in each material for a moment of $30\ \mathrm{kN\,m}$.
::: solution
**Transform to timber.** With $n = E_s / E_w = 20$, the steel plate becomes a timber plate $20 \times 10 = 200\ \mathrm{mm}$ wide and $180\ \mathrm{mm}$ deep, centred on the same mid-depth as the two $100 \times 200\ \mathrm{mm}$ joists, and
$$
I_{\text{tr}} = \frac{2 \times 100 \times 200^{3}}{12} + \frac{200 \times 180^{3}}{12} = 133.3 \times 10^{6} + 97.2 \times 10^{6} = 230.5 \times 10^{6}\ \mathrm{mm^{4}} .
$$
The section is symmetric, so the neutral axis is at mid-depth and
$$
\sigma_{w, \max} = \frac{30 \times 10^{6} \times 100}{230.5 \times 10^{6}} = 13.0\ \mathrm{MPa} \text{ in timber},
$$
$$
\sigma_{s, \max} = n \times \frac{30 \times 10^{6} \times 90}{230.5 \times 10^{6}}
= 20 \times 11.71 = 234\ \mathrm{MPa} \text{ in steel}.
$$
*Check.* The steel's stress at its own outer fibre is $20$ times the timber stress at the same strain, and the strain is continuous across the plate — that is the whole method. $\checkmark$

*Sanity.* The steel is at $234\ \mathrm{MPa}$ while the timber is only $13.0\ \mathrm{MPa}$, which is the point: the steel is placed where the strain is large, and being $20$ times as stiff it takes $20$ times the stress at the same strain. But note the trap — the steel plate is only $180\ \mathrm{mm}$ deep, so it never sees the extreme-fibre strain, and the plate carries only $42$ per cent of the moment ($97.2 / 230.5$) even though its transformed width equals that of both joists together. A flitch plate should be nearly as deep as the joists, or the steel's stiffness is wasted near the neutral axis. The same arithmetic governs reinforced concrete, where the transformed area of steel is $n \approx 7$ times its real area and the concrete above the neutral axis is ignored entirely because it is cracked.
:::
:::

::: example Cast-iron T-section {#ex-t-section}
A cast-iron T-section has a flange $100 \times 20\ \mathrm{mm}$ at the top and a web $20 \times 120\ \mathrm{mm}$ below it. The allowable stresses are $30\ \mathrm{MPa}$ in tension and $80\ \mathrm{MPa}$ in compression. Find the maximum sagging moment.
::: solution
**Centroid.** Areas $2000$ and $2400\ \mathrm{mm^{2}}$ at $10\ \mathrm{mm}$ and $80\ \mathrm{mm}$ from the top:
$$
\bar y = \frac{2000 \times 10 + 2400 \times 80}{4400} = 48.2\ \mathrm{mm} \text{ from the top}.
$$
**Second moment.**
$$
I = \left[ \frac{100 \times 20^{3}}{12} + 2000 (48.2 - 10)^{2} \right]
+ \left[ \frac{20 \times 120^{3}}{12} + 2400 (80 - 48.2)^{2} \right]
= 8.29 \times 10^{6}\ \mathrm{mm^{4}} .
$$
**Fibre distances.** Top fibre $c_c = 48.2\ \mathrm{mm}$, bottom fibre $c_t = 91.8\ \mathrm{mm}$.
**Governing check.** For a sagging moment the top is in compression and the bottom in tension:
$$
M \le \frac{80 \times 8.29 \times 10^{6}}{48.2} = 13.8\ \mathrm{kN\,m} \text{ (compression)},
$$
$$
M \le \frac{30 \times 8.29 \times 10^{6}}{91.8} = 2.71\ \mathrm{kN\,m} \text{ (tension)}.
$$
**Tension governs: $M_{\text{allow}} = 2.71\ \mathrm{kN\,m}$.**

*Sanity.* The allowable moment is set by the **tension** fibre at the bottom, almost twice as far out as the compression fibre, and the compression capacity is only $20$ per cent used. Cast iron is weak in tension and strong in compression, so the ideal section puts most of its material near the top — which is exactly what a T does, but this one is proportioned the wrong way round for a sagging moment. Flip it upside down and the numbers become $M \le 80 \times 8.29 \times 10^{6} / 91.8 = 7.22\ \mathrm{kN\,m}$ in compression and $30 \times 8.29 \times 10^{6} / 48.2 = 5.16\ \mathrm{kN\,m}$ in tension, so the inverted T carries $90$ per cent more. Cast-iron frames, machine beds and old bridge girders were proportioned with the flange at the bottom for precisely this reason, and a contractor who installs one upside down has halved its capacity.
:::
:::

::: example Cracked reinforced concrete {#ex-rcc}
A reinforced concrete beam $200\ \mathrm{mm}$ wide with an effective depth of $400\ \mathrm{mm}$ carries $1000\ \mathrm{mm^{2}}$ of steel. Take the modular ratio $n = 15$ and neglect the concrete's tensile strength. Find the cracked second moment and the stresses at a moment of $60\ \mathrm{kN\,m}$.
::: solution
**Neutral axis.** Equating the first moment of area of the compressed concrete about the neutral axis to the transformed steel area's:
$$
\frac{200 x^{2}}{2} = 15 \times 1000 (400 - x)
\quad\Longrightarrow\quad
x^{2} + 150 x - 60\,000 = 0 ,
$$
$$
x = \frac{- 150 + \sqrt{22\,500 + 240\,000}}{2} = \frac{- 150 + 512.3}{2} = 181.2\ \mathrm{mm}.
$$
**Cracked second moment.**
$$
I_{cr} = \frac{200 \times 181.2^{3}}{3} + 15 \times 1000 \times (400 - 181.2)^{2}
= 3.97 \times 10^{8} + 7.18 \times 10^{8} = 1.115 \times 10^{9}\ \mathrm{mm^{4}} .
$$
**Stresses.**
$$
\sigma_c = \frac{60 \times 10^{6} \times 181.2}{1.115 \times 10^{9}} = 9.75\ \mathrm{MPa},
\qquad
\sigma_s = \frac{60 \times 10^{6} \times 15 \times 218.8}{1.115 \times 10^{9}} = 176\ \mathrm{MPa}.
$$
*Check.* The concrete force is $\tfrac{1}{2} \times 9.75 \times 200 \times 181.2 = 176.6\ \mathrm{kN}$ and the steel force is $176 \times 1000 = 176\ \mathrm{kN}$; they are equal and opposite, and their lever arm is $400 - 181.2 / 3 = 339.6\ \mathrm{mm}$, giving $176.6 \times 0.3396 = 59.9\ \mathrm{kN\,m}$. $\checkmark$

*Sanity.* The neutral axis sits at $45$ per cent of the depth, far below the mid-depth a homogeneous section would give, because the cracked concrete below it carries nothing and the transformed steel is $15$ times its geometric area. The concrete is at $9.75\ \mathrm{MPa}$ against a cylinder strength of $30$ or more, while the steel is at $176\ \mathrm{MPa}$ against a yield of $500$: the section is **under-reinforced**, which is exactly what codes require, because an under-reinforced beam cracks, deflects and gives warning before it fails, while an over-reinforced one shatters. The whole working-stress method of concrete design is this transformed-area calculation, and it is why a beam's capacity is quoted in terms of its steel area and not its concrete.
:::
:::

::: warning Why beams fail sideways
$\sigma = M c / I$ assumes the compression flange stays put. In a real beam the top flange is a strut loaded in compression and free to bow out of the plane of bending unless something restrains it. If it is unrestrained over a length $L_c$, the beam may **laterally-torsionally buckle** at a moment $M_{cr}$ well below its yield moment, and it does so suddenly, with warning only in the form of a visible twist. The controlling parameters are the unbraced length, the section's torsional stiffness $G J$ and its warping stiffness $E I_w$, and the practical consequence is that a steel beam's capacity is a **function of how often it is braced**: a fully braced rolled I-beam can develop its full plastic moment, while the same section unbraced over a long span may buckle at half of it or less. A design that computes $\sigma = M c / I$ and stops has not designed the beam; it has designed a beam that will not fall over.
:::

::: history
The question of how a beam resists bending was posed by Galileo in the *Discorsi e dimostrazioni matematiche* of 1638, where he treated a cantilever as a bundle of fibres all pivoting about the bottom corner at the wall and, assuming every fibre resisted equally, derived a resistance proportional to $b d^{2} / 2$. The dependence on $b d^{2}$ is right, but the coefficient is three times the elastic value $b d^{2} / 6$, because Galileo knew nothing of elasticity. Edme Mariotte, in work published in 1686, assumed that the fibres stretch in proportion to their distance from the pivot, which reduced Galileo's figure; Antoine Parent (1713) and Charles-Augustin de Coulomb, in his memoir of 1773, placed the neutral axis correctly and wrote the equilibrium of the section in essentially its modern form, while Jacob Bernoulli and Leonhard Euler supplied the theory of the elastic curve. Their results were little used in practice until Navier's lectures of 1826 made $\sigma = M y / I$ part of engineering teaching. The empirical discovery that made iron ships and railway bridges possible — that a web-and-flange section is enormously better than a plate of the same weight — belongs to the ironmasters and engineers of the first half of the nineteenth century: John Birkinshaw patented rolled wrought-iron rails in 1820, and the first rolled wrought-iron I-beams appeared in France in the late 1840s. The I-section is an invention of the shop floor that theory explained afterwards.
:::

::: quiz
A beam of a given cross-sectional area is made in four shapes, all with the same area and all bent about the same axis: a solid square, a rectangle twice as deep as it is wide, an I-section and a circular tube. Which has the largest section modulus?
- [ ] The solid square
- [ ] The rectangle twice as deep as wide
- [x] The I-section
- [ ] They are all equal
::: solution
The I-section. For a fixed area the section modulus rises as material is moved away from the neutral axis, and the ranking follows how far each shape pushes its area out: square $1.00$, rectangle $1.41$, circular tube about $2.5$, I-section $3$ to $5$. The limit would be two point areas infinitely far apart, which is why a plate girder with two flange plates and a thin web approaches the theoretical maximum — and why the design stops there: beyond a certain slenderness the compression flange buckles laterally and the web buckles in shear, so the achievable shape factor of a real rolled section is a compromise between bending efficiency and stability.
:::
:::

## Where this leads

Bending stress combines with shear stress in [[mechanics-of-materials/transverse-shear]] and with axial load in [[solid-mechanics/stress-strain-3d]]; the deflection that follows from $1 / \rho = M / E I$ is developed in [[mechanics-of-materials/beam-deflection]], and the plastic limit that $\sigma = M c / I$ cannot reach is treated in [[solid-mechanics/plasticity]]. Section selection for real structures is in [[machine-design/shafts]] and [[machine-design/springs]].

::: summary
- Plane sections remain plane, so strain and stress are linear in $y$ and the neutral axis passes through the centroid of a homogeneous section.
- $\sigma = M y / I$ with $\sigma_{\max} = M / Z$; strength depends on the section modulus $Z = I / c$, stiffness on $E I$.
- Bending resistance is bought by moving area away from the neutral axis: $Z \propto d^{2}$, so depth is worth far more than width and a hollow or I-shaped section beats a solid one of the same weight.
- For built-up or composite sections, use the parallel-axis theorem about the **neutral axis** and transform widths by the modular ratio $n = E_2 / E_1$.
- For unsymmetric sections compute the extreme-fibre distances in tension and compression separately and check both against their own allowable; the material's weakness, not the geometry, usually decides.
- $\sigma = M c / I$ says nothing about lateral-torsional buckling, which is often the real limit on a steel beam's capacity.
:::

## Exercises

::: exercise Stress {level=1 check="125"}
A rectangular beam $60\ \mathrm{mm}$ wide by $120\ \mathrm{mm}$ deep carries $M = 18\ \mathrm{kN\,m}$. Find the maximum stress in MPa.
::: solution
$Z = b d^{2} / 6 = 60 \times 120^{2} / 6 = 144 \times 10^{3}\ \mathrm{mm^{3}}$, so
$$
\sigma = \frac{18 \times 10^{6}}{144 \times 10^{3}} = 125\ \mathrm{MPa}.
$$
*Note.* The answer is $125\ \mathrm{MPa}$. Doubling the depth to $240\ \mathrm{mm}$ would give $Z = 576 \times 10^{3}\ \mathrm{mm^{3}}$ and $31.3\ \mathrm{MPa}$ — a factor of four for twice the depth and twice the weight.
:::
:::

::: exercise Section modulus {level=1 check="21.2"}
Find the section modulus of a $60\ \mathrm{mm}$ diameter solid circular shaft in $\mathrm{cm^{3}}$.
::: solution
$Z = \pi D^{3} / 32 = \pi \times 60^{3} / 32 = 21.2 \times 10^{3}\ \mathrm{mm^{3}} = 21.2\ \mathrm{cm^{3}}$.
:::
:::

::: exercise Allowable load {level=1 check="5.4"}
A simply supported $150 \times 75\ \mathrm{mm}$ rectangular timber beam of $2.5\ \mathrm{m}$ span has an allowable bending stress of $12\ \mathrm{MPa}$. Find the maximum central load in kN, neglecting self-weight.
::: solution
$Z = 75 \times 150^{2} / 6 = 281.3 \times 10^{3}\ \mathrm{mm^{3}}$, $M_{\text{allow}} = 12 \times 281.3 \times 10^{3} = 3.375\ \mathrm{kN\,m}$, and $P = 4 M / L = 4 \times 3.375 / 2.5 = 5.4\ \mathrm{kN}$.
*Note.* The self-weight is $0.15 \times 0.075 \times 2.5 \times 5\ \mathrm{kN / m^{3}} \approx 0.14\ \mathrm{kN}$, contributing $w L^{2} / 8 = 0.056 \times 2.5^{2} / 8 = 0.044\ \mathrm{kN\,m}$, about $1.3$ per cent — negligible here, but not on a long span.
:::
:::

::: exercise Compare sections {level=2}
Compare the strong-axis bending strength of (a) a solid $60 \times 40\ \mathrm{mm}$ rectangular bar, (b) a $60 \times 40 \times 5\ \mathrm{mm}$ rectangular hollow section used with the $60\ \mathrm{mm}$ side vertical, and (c) the same tube used with the $40\ \mathrm{mm}$ side vertical. Give the section moduli, the areas and the strength per unit mass.
::: solution
**(a) Solid.**
$$
I = \frac{40 \times 60^{3}}{12} = 720 \times 10^{3}\ \mathrm{mm^{4}}, \qquad
Z = \frac{720 \times 10^{3}}{30} = 24.0 \times 10^{3}\ \mathrm{mm^{3}}, \qquad A = 2400\ \mathrm{mm^{2}} .
$$
**(b) Tube, strong way.**
$$
I = \frac{40 \times 60^{3} - 30 \times 50^{3}}{12}
= \frac{8.640 \times 10^{6} - 3.750 \times 10^{6}}{12} = 407.5 \times 10^{3}\ \mathrm{mm^{4}},
$$
$$
Z = \frac{407.5 \times 10^{3}}{30} = 13.6 \times 10^{3}\ \mathrm{mm^{3}}, \qquad A = 2400 - 1500 = 900\ \mathrm{mm^{2}} .
$$
**(c) Tube, weak way.**
$$
I' = \frac{60 \times 40^{3} - 50 \times 30^{3}}{12} = 207.5 \times 10^{3}\ \mathrm{mm^{4}},
\qquad Z' = \frac{207.5 \times 10^{3}}{20} = 10.4 \times 10^{3}\ \mathrm{mm^{3}} .
$$
**Strength per unit mass**, taking $Z / A$ in $\mathrm{mm^{2}}$:
$$
\text{(a) } 10.0, \qquad \text{(b) } 15.1, \qquad \text{(c) } 11.5 .
$$
*Sanity.* The tube is $57$ per cent as strong as the solid bar it replaces from $37.5$ per cent of the material, so it is $1.5$ times as efficient per kilogram — and it is still $15$ per cent more efficient than the solid bar even when bent about its **weak** axis. This is the whole case for hollow sections in frames, spaceframes and vehicle structures, and the whole reason a bicycle frame is tubes and not bars. The corollary is that hollow sections fail in ways solid ones do not: local buckling of the compression wall, and ovalisation at a welded joint.
:::
:::

::: exercise Built-up {level=2}
A plate girder is made by welding two $300 \times 20\ \mathrm{mm}$ flange plates to a $600 \times 12\ \mathrm{mm}$ web. Find $I_x$ and the moment to produce $150\ \mathrm{MPa}$ at the outer fibre.
::: solution
$$
I_x = \frac{300 \times 640^{3}}{12} - \frac{(300 - 12) \times 600^{3}}{12}
= 6.554 \times 10^{9} - 5.184 \times 10^{9} = 1.370 \times 10^{9}\ \mathrm{mm^{4}},
$$
$$
M = \frac{150 \times 1.370 \times 10^{9}}{320} = 642\ \mathrm{kN\,m}.
$$
*Check.* The flanges alone give $2 \times 6000 \times 310^{2} = 1.153 \times 10^{9}$ and the web $12 \times 600^{3} / 12 = 2.16 \times 10^{8}$; the sum $1.369 \times 10^{9}$ matches. $\checkmark$ The flanges carry $84$ per cent.
:::
:::

::: exercise Unsymmetric {level=2}
For the T-section of Example 5, find the maximum **hogging** moment (top in tension) that may be applied.
::: solution
For hogging, the bottom fibre is in compression at $c_c = 91.8\ \mathrm{mm}$ and the top in tension at $c_t = 48.2\ \mathrm{mm}$:
$$
M \le \frac{80 \times 8.29 \times 10^{6}}{91.8} = 7.22\ \mathrm{kN\,m}, \qquad
M \le \frac{30 \times 8.29 \times 10^{6}}{48.2} = 5.16\ \mathrm{kN\,m}.
$$
**Tension governs: $5.16\ \mathrm{kN\,m}$**, nearly twice the sagging capacity of $2.71\ \mathrm{kN\,m}$.
*Sanity.* The same section carries $90$ per cent more in one sense of bending than the other. Any beam whose moment changes sign — a continuous beam over a support, a crane runway, a connecting rod — must be checked in both senses, and if the section is unsymmetric the two capacities are different numbers, not one number with a $\pm$.
:::
:::

::: exercise Design {level=3}
Select the lightest universal beam for a simply supported span of $7.5\ \mathrm{m}$ carrying a uniform dead load of $18\ \mathrm{kN / m}$ (including self-weight) and a live load of $12\ \mathrm{kN / m}$, with an allowable bending stress of $165\ \mathrm{MPa}$ and a maximum deflection of $L / 360$. Take $E = 205\ \mathrm{GPa}$.
::: solution
$$
w = 30\ \mathrm{kN / m}, \qquad
M_{\max} = \frac{30 \times 7.5^{2}}{8} = 211\ \mathrm{kN\,m}, \qquad
Z_{\text{req}} = \frac{211 \times 10^{6}}{165} = 1279 \times 10^{3}\ \mathrm{mm^{3}} .
$$
The deflection limit $L / 360 = 20.8\ \mathrm{mm}$ requires $I \ge 5 w L^{4} / (384 E \times 20.8) = 289 \times 10^{6}\ \mathrm{mm^{4}}$. From the UK section tables (BS 4-1), a $457 \times 152\ \mathrm{UB}\ 67$ has $Z_x \approx 1263 \times 10^{3}\ \mathrm{mm^{3}}$ and $I_x \approx 289 \times 10^{6}\ \mathrm{mm^{4}}$: it just fails the stress check at $167\ \mathrm{MPa}$.

Try a $457 \times 191\ \mathrm{UB}\ 67$ of the same mass: $Z_x \approx 1296 \times 10^{3}\ \mathrm{mm^{3}}$, $I_x \approx 294 \times 10^{6}\ \mathrm{mm^{4}}$.
$$
\sigma = \frac{211 \times 10^{6}}{1296 \times 10^{3}} = 163\ \mathrm{MPa} < 165 \quad \checkmark
$$
$$
\delta = \frac{5 w L^{4}}{384 E I}
= \frac{5 \times 30 \times 7500^{4}}{384 \times 205\,000 \times 294 \times 10^{6}}
= 20.5\ \mathrm{mm} < \frac{L}{360} = 20.8\ \mathrm{mm} \quad \checkmark
$$
**Select $457 \times 191\ \mathrm{UB}\ 67$.**

*Design comment.* Both checks are close to critical here: the selected beam meets the stress limit with $1$ per cent and the deflection limit with $2$ per cent to spare. On longer spans the deflection limit takes over, because the required $I$ grows as $L^{4}$ while the required $Z$ grows only as $L^{2}$. Serviceability, not strength, sizes most long-span floor beams — which is why a building's steelweight is set by deflection and vibration, and why a designer who checks only the stress produces a safe but uneconomic frame or, more often, an unsafe one that bounces. Note also that the deflection limit is a **serviceability** requirement driven by the finishes: a plastered ceiling cracks at about $L / 240$ to $L / 360$, a glass partition at $L / 180$, and a bare steel frame supporting nothing but itself has no limit at all short of vibration.
:::
:::

::: exercise Derivation {level=3}
Show that for a rectangular section the ratio of plastic to elastic moment is $1.5$ and for a circular section $1.7$, and explain why the shape factor of a rolled I-section is only $1.12$ to $1.15$. Why does the shape factor matter to a designer using allowable-stress design?
::: solution
For a rectangle the elastic section modulus is $Z_e = b d^{2} / 6$ and the **plastic** section modulus, obtained by taking the first moment of area about the equal-area axis, is
$$
Z_p = \frac{b d^{2}}{4}
\quad\Longrightarrow\quad
\frac{Z_p}{Z_e} = \frac{6}{4} = 1.5 .
$$
For a circle $Z_e = \pi D^{3} / 32$ and
$$
Z_p = \frac{D^{3}}{6}
\quad\Longrightarrow\quad
\frac{Z_p}{Z_e} = \frac{32}{6 \pi} = 1.70 .
$$
For an I-section, most of the area already sits at the extreme fibres, so the elastic and plastic moduli are nearly equal: with all the area concentrated at $\pm d / 2$, both are $A d / 2$ and the ratio tends to $1.0$. Rolled sections come out at $1.12$ to $1.15$.

*Why it matters.* The shape factor is the reserve between first yield and full plastic collapse. A rectangular timber beam or a circular shaft can carry $50$ to $70$ per cent more than the moment at which $\sigma = M c / I$ first reaches the yield stress, so an allowable-stress design is genuinely conservative and redistribution is available. A slender I-section has almost no such reserve, and worse, its compression flange may buckle before the plastic moment is reached — so the same $1.12$ that makes an I-section efficient makes it unforgiving, and it is why steel design codes check lateral-torsional buckling explicitly while a machine-designer working to $\sigma = M c / I$ on a shaft rarely needs to.
:::
:::
