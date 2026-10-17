Bending puts a beam's fibres into tension and compression; shear puts them sliding past each other. In a slender beam the shear stress is usually a fraction of the bending stress and can be ignored, and in a deep beam, a short coupling link, a glued joint or a bolted splice it is the whole problem. Knowing which case you are in is the skill; the formula is one line.

The formula comes from the same place as the flexure formula. Two adjacent longitudinal fibres at different bending stresses must be held together by a longitudinal shear stress, and complementary shear says that stress appears on the transverse plane too. Requiring a slice of beam between two sections to be in horizontal force balance gives the **shear flow** $q = V Q / I$, and dividing by the width at which you choose to cut gives the shear stress. The choice of width is the whole art: the same $q$ divided by a thin web gives a large stress, and divided by a wide flange gives almost none.

::: warning $\tau = VQ/It$ is an estimate outside the thin web
The formula assumes the shear stress is uniform across the thickness $t$ at the level where you cut. That is excellent in a thin web, where $\tau$ is nearly constant over the gauge, and only approximate elsewhere: in a rectangular beam it is within a few per cent of exact, in a circular section it is exact on the neutral axis, and in a thick flange or a solid block it can be $10$ to $20$ per cent out. More importantly, it says nothing about the stress **concentration** at a web-to-flange toe or a bolt hole, where the real peak may be twice the computed value. Use it to size a web, a glue line or a row of fasteners; do not use it to fatigue-rate a weld.
:::

## Shear flow

::: definition Shear flow and shear stress {#def-shear-flow}
For a beam of second moment $I$ carrying a shear force $V$, the **shear flow** at a level whose **first moment of area** is $Q$ is
$$
q = \frac{V Q}{I} \quad \left[ \mathrm{N / m} \right], \qquad
\tau = \frac{V Q}{I t} \quad \left[ \mathrm{Pa} \right],
$$
where $Q = \int_{A'} y \, \mathrm{d} A = A' \bar y'$ is taken over the area $A'$ **between the cut and the free surface**, and $\bar y'$ is the distance from the neutral axis to that area's centroid. The shear flow $q$ is a force per unit **length along the beam**, and it is the quantity you multiply by a fastener spacing to get the force on one fastener.
:::

::: proof
Take a slice of beam between sections at $x$ and $x + \mathrm{d} x$, and cut it horizontally at a level $y_1$, isolating the top part of area $A'$. The bending stress on that part is $\sigma = M y / I$ on the left face and $(M + \mathrm{d} M) y / I$ on the right, so the net horizontal force pushing the block forward is
$$
\int_{A'} \frac{(M + \mathrm{d} M) y}{I} \mathrm{d} A - \int_{A'} \frac{M y}{I} \mathrm{d} A
= \frac{\\mathrm{d} M}{I} \int_{A'} y \, \mathrm{d} A = \frac{\\mathrm{d} M}{I} Q .
$$
The block is in equilibrium, so a horizontal shear force of the same magnitude must act along the cut. Its intensity per unit length is
$$
q = \frac{1}{\\mathrm{d} x} \\cdot \\frac{\\mathrm{d} M}{I} Q = \\frac{V Q}{I} ,
$$
using $\\mathrm{d} M / \\mathrm{d} x = V$. Dividing by the cut width $t$ gives $\\tau = V Q / I t$. The complementary shear stress on the transverse plane equals the longitudinal one, which is why a beam split lengthways along a horizontal plane is the classic demonstration: the two halves slide past each other under load.
:::

::: proposition Shear-stress shape factors {#prop-shape-shear}
For the common solid sections the maximum shear stress, on the neutral axis, is a fixed multiple of the average $V / A$:
$$
\\tau_{\\max} = \\frac{3}{2} \\frac{V}{A} \\text{ (rectangle)}, \\qquad
\\tau_{\\max} = \\frac{4}{3} \\frac{V}{A} \\text{ (circle)}, \\qquad
\\tau_{\\max} \\approx \\frac{V}{A_{\\text{web}}} \\text{ to } 1.25 \\frac{V}{A_{\\text{web}}} \\text{ (I-section)} .
$$
For a rolled steel I-section the web alone carries $90$ to $95$ per cent of the shear, and the ratio of peak to mean web shear is $1.2$ to $1.3$.
:::

::: proof
For a **rectangle** of width $b$ and depth $d$, at distance $y$ from the neutral axis the first moment of the area below is $Q = b (d / 2 - y) \\times \\tfrac{1}{2} (d / 2 + y) = \\tfrac{b}{2} \\left( d^{2} / 4 - y^{2} \\right)$, so with $I = b d^{3} / 12$,
$$
\\tau = \\frac{V Q}{I b} = \\frac{6 V}{b d^{3}} \\left( \\frac{d^{2}}{4} - y^{2} \\right),
$$
a parabola with $\\tau = 0$ at the surfaces and
$$
\\tau_{\\max} = \\frac{6 V}{b d^{3}} \\cdot \\frac{d^{2}}{4} = \\frac{3 V}{2 b d} = \\frac{3}{2} \\frac{V}{A} .
$$
For a **circle**, $Q = \\tfrac{2}{3} \\left( R^{2} - y^{2} \\right)^{3 / 2}$ and $b = 2 \\sqrt{R^{2} - y^{2}}$, giving $\\tau = 4 V (R^{2} - y^{2}) / (3 \\pi R^{4})$ and $\\tau_{\\max} = 4 V / (3 \\pi R^{2}) = \\tfrac{4}{3} V / A$. For an **I-section**, $Q$ is dominated by the flanges' contribution, which is nearly constant over the web depth, so $\\tau = V Q / I t_w$ varies only slightly across the web and the peak sits at the neutral axis.
:::

::: example Rectangular beam {#ex-timber-shear}
A timber beam $100\\ \\mathrm{mm}$ wide and $200\\ \\mathrm{mm}$ deep carries a shear of $40\\ \\mathrm{kN}$. Find the maximum shear stress and compare it with the maximum bending stress if the beam's span-to-depth ratio is $12$ with a central load.
::: solution
$$
\\tau_{\\max} = \\frac{3 V}{2 A} = \\frac{3 \\times 40\,000}{2 \\times 100 \\times 200} = 3.0\\ \\mathrm{MPa},
$$
against a mean of $V / A = 2.0\\ \\mathrm{MPa}$. For a central load on a span $L$, $M_{\\max} = P L / 4$ and $V = P / 2$, so with $L = 12 d = 2400\\ \\mathrm{mm}$ and $P = 80\\ \\mathrm{kN}$,
$$
M_{\\max} = \\frac{80 \\times 2.4}{4} = 48\\ \\mathrm{kN\,m}, \\qquad
\\sigma_{\\max} = \\frac{6 M}{b d^{2}} = \\frac{6 \\times 48 \\times 10^{6}}{100 \\times 200^{2}} = 7.2\\ \\mathrm{MPa}.
$$
*Sanity.* The shear stress is $42$ per cent of the bending stress, which is far higher than the designer's instinct. Timber is unusually weak in horizontal shear — parallel to the grain the shear strength is only $0.6$ to $1.0$ times the bending strength in many species, against a ratio of $0.58$ for tension in steel — so a short, heavily loaded timber beam fails by **horizontal shear** along the neutral axis, not by bending. This is why notched beams fail at the corner of the notch, why a bolt hole near the soffit of a deep glulam beam splits it lengthways, and why Eurocode and the National Design Specification both require a separate shear check at a change of depth.
:::
:::

::: example Rolled I-section {#ex-i-shear}
For the $254 \\times 102\\ \\mathrm{UB}\\ 22$ of the previous chapter ($I_x = 28.2 \\times 10^{6}\\ \\mathrm{mm^{4}}$, depth $254.9\\ \\mathrm{mm}$, flange $101.7 \\times 8.4\\ \\mathrm{mm}$, web $6.0\\ \\mathrm{mm}$), find the shear stress at the neutral axis and just above the flange–web junction for $V = 150\\ \\mathrm{kN}$.
::: solution
**First moment at the neutral axis.** Take the area above the neutral axis: the flange plus the web down to the axis,
$$
Q = \\underbrace{101.7 \\times 8.4 \\times 123.25}_{\\text{flange}} + \\underbrace{6.0 \\times 119.05 \\times 59.5}_{\\text{half web}}
= 105.4 \\times 10^{3} + 42.5 \\times 10^{3} = 147.9 \\times 10^{3}\\ \\mathrm{mm^{3}},
$$
$$
\\tau_{\\max} = \\frac{150\,000 \\times 147.9 \\times 10^{3}}{28.2 \\times 10^{6} \\times 6.0} = 131\\ \\mathrm{MPa}.
$$
**Just above the junction**, only the flange contributes, $Q = 105.4 \\times 10^{3}\\ \\mathrm{mm^{3}}$, and the width is the web thickness:
$$
\\tau_{\\text{junction, web side}} = \\frac{150\,000 \\times 105.4 \\times 10^{3}}{28.2 \\times 10^{6} \\times 6.0} = 93.3\\ \\mathrm{MPa}.
$$
**Just inside the flange**, the same $Q$ divided by the flange width $101.7\\ \\mathrm{mm}$ gives
$$
\\tau = 5.5\\ \\mathrm{MPa}.
$$
**Mean web shear** over the clear web depth $238.1\\ \\mathrm{mm}$ is $150\,000 / (6.0 \\times 238.1) = 105\\ \\mathrm{MPa}$, so the peak is $1.25$ times the mean.

*Sanity.* Three things to notice. The stress **jumps by a factor of $17$** across the flange–web junction, because $Q$ is continuous but the width changes by $101.7 / 6.0$ — and that jump is a real stress concentration at the weld or roll junction, which is where an I-beam's web sometimes tears. The web carries essentially all the shear: the flanges contribute $105 / 148 = 71$ per cent of $Q$ but almost none of the shear force, because their stress is resolved mostly along their own thin axis. And $131\\ \\mathrm{MPa}$ against a yield shear of $0.58 \\times 355 = 206\\ \\mathrm{MPa}$ means this section is at $64$ per cent of its web shear capacity while its bending capacity is barely touched — which is why a **beam with a heavy bearing reaction and a short span** is checked for web bearing and web buckling, not for bending.
:::
:::

::: widget plot
f: 131*(1-(x/127.45)^2)
x: -127.45, 127.45
y: 0, 135
labels: \text{shear stress (MPa) across a rectangular section}
caption: Parabolic shear stress distribution for a rectangular section, here drawn to the same peak as the I-section of Example 2 for comparison. The stress is zero at the outer fibres, where $Q$ vanishes, and $1.5$ times the mean at the neutral axis. Overlay the I-section's distribution and the difference is instructive: the I-section's curve is nearly flat across the web and drops abruptly in the flanges, because $Q$ grows very little between the junction and the neutral axis while the width collapses from $101.7$ to $6.0\\ \\mathrm{mm}$.
:::

::: definition Shear centre {#def-shear-centre}
The **shear centre** (or centre of twist) of a cross-section is the point in its plane through which the transverse load must pass so that the beam bends **without twisting**. It is a purely geometric property of the section, found by equating the moment of the internal shear flows about a reference point to the moment of the resultant shear force. It coincides with the centroid only for sections with two or more axes of symmetry; for a channel it lies outside the material, on the concave side of the web; for a single angle or a slit tube it lies at the intersection of the centre-lines of the elements, which for a slit tube is on the far side of the section from the slit.
:::

::: proposition Shear deflection {#prop-shear-deflection}
The transverse deflection of a beam has two parts. The bending part is $\mathrm{d} w_b / \mathrm{d} x = \int M / E I$; the shear part adds
$$
\frac{\mathrm{d} w_s}{\mathrm{d} x} = \frac{V}{k A G}, \qquad
k = \frac{6}{5} \cdot \frac{(b d^{2} / 4)^{2}}{\int \tau^{2} b \, \mathrm{d} A} = \frac{5}{6} \text{ (rectangle)}, \; \frac{9}{10} \text{ (circle)},
$$
where $k$ is the **shear correction factor**. For a simply supported beam of span $L$ under a central load $P$,
$$
\frac{\delta_s}{\delta_b} = \frac{3}{20} \frac{E}{G} \left( \frac{d}{L} \right)^{2} \approx 0.43 \left( \frac{d}{L} \right)^{2} \text{ for steel},
$$
so the shear term is under $2$ per cent for a beam deeper than one seventh of its span and over $10$ per cent for one shorter than about $L / d = 3.7$.
:::

::: proof
The strain energy of the shear stress field over a length $\mathrm{d} x$ is
$$
\int_A \frac{\tau^{2}}{2 G} \, \mathrm{d} A \, \mathrm{d} x
= \frac{1}{2 G} \int_A \left( \frac{V Q}{I b} \right)^{2} \mathrm{d} A \, \mathrm{d} x
= \frac{V^{2}}{2 G} \left( \int_A \frac{Q^{2}}{I^{2} b} \, \mathrm{d} A \right) \mathrm{d} x .
$$
Equating this to the energy of the equivalent uniform shear $V / (k A G)$ gives
$$
\frac{1}{k A G} = \frac{1}{G} \int_A \frac{Q^{2}}{I^{2} b} \, \mathrm{d} A
\quad\Longrightarrow\quad
k = \frac{A}{\int_A Q^{2} / \left( I^{2} b \right) \mathrm{d} A} .
$$
For a rectangle the integral evaluates to $6 A / 5$, giving $k = 5 / 6$; for a circle, $k = 9 / 10$; for an I-section with all the area in the web, $k \approx A / A_w$, which can be $2$ to $3$. Integrating $\mathrm{d} w_s / \mathrm{d} x = V / k A G$ for a central point load gives $\delta_s = P L / (4 k A G)$ against $\delta_b = P L^{3} / (48 E I)$, and their ratio follows immediately.
:::

::: example Shear deflection {#ex-shear-deflection}
A short beam of $60\ \mathrm{mm}$ square section and $180\ \mathrm{mm}$ span carries a central load of $10\ \mathrm{kN}$. Find the bending, shear and total deflections for $E = 200\ \mathrm{GPa}$, $G = 77\ \mathrm{GPa}$.
::: solution
$$
\delta_b = \frac{P L^{3}}{48 E I}
= \frac{10\,000 \times 180^{3}}{48 \times 200\,000 \times 1.08 \times 10^{6}} = 0.056\ \mathrm{mm},
$$
$$
\delta_s = \frac{P L}{4 k A G}
= \frac{10\,000 \times 180}{4 \times 0.833 \times 3600 \times 77\,000} = 0.012\ \mathrm{mm},
$$
$$
\delta_{\text{total}} = 0.068\ \mathrm{mm},
$$
so the shear term is $21$ per cent of the total.

*Sanity.* At $L / d = 3$ the shear contribution is $21$ per cent, and the ratio grows as the square of $d / L$: at $L / d = 10$ it is $1.3$ per cent and at $L / d = 30$ it is $0.15$ per cent. This is why beam theory serves machine design so well and fails for the deep coupling beams of a shear-wall building, the short links of an eccentrically braced frame, elastomeric bearings, rubber mounts and every short fibre-reinforced plastic rib — where the interlaminar shear strength is low and the shear deformation is large, and where a design made on Euler beams is wrong in both stiffness and stress.
:::
:::

## Fasteners, glue lines and shear centres

::: algorithm Fastener spacing in a built-up beam {#alg-shearflow}
1. Compute $I$ and $Q$ for the **connected** part — the area that would slide off if the fasteners failed — about the neutral axis of the whole transformed section.
2. Compute the shear flow $q = V Q / I$ in $\\mathrm{N / mm}$.
3. Divide the fastener's **single-shear** capacity $F$ by $q$ to get the spacing: $s \\le F / q$. If the fasteners are in $n$ rows, use $n F$.
4. Check the fastener in the **other** direction too: a nail in the flange of a bending beam also sees the vertical shear, and a bolt group sees both shear and the moment of any eccentricity.
5. Check the **member** as well as the connector: the wood or plate between fasteners fails by bearing, by splitting along the grain, or by a plug tearing out, and in timber these usually govern before the fastener's own strength.
:::

::: example Nailed built-up beam {#ex-nailed}
A built-up beam has a $20 \\times 250\\ \\mathrm{mm}$ plywood web with two $140 \\times 30\\ \\mathrm{mm}$ flanges, giving $I = 191.3 \\times 10^{6}\\ \\mathrm{mm^{4}}$. It is nailed with two rows of nails of $1.5\\ \\mathrm{kN}$ single-shear capacity at the flange–web interfaces. Find the nail spacing for a shear of $30\\ \\mathrm{kN}$.
::: solution
The flange's first moment about the neutral axis is
$$
Q = 140 \\times 30 \\times 140 = 588 \\times 10^{3}\\ \\mathrm{mm^{3}},
$$
with $\\bar y' = 125 + 15 = 140\\ \\mathrm{mm}$. The shear flow at each interface is
$$
q = \\frac{V Q}{I} = \\frac{30\,000 \\times 588 \\times 10^{3}}{191.3 \\times 10^{6}} = 92.2\\ \\mathrm{N / mm}.
$$
With two rows of nails the resistance per unit length is $2 \\times 1500 / s$, so
$$
s \\le \\frac{2 \\times 1500}{92.2} = 32.5\\ \\mathrm{mm}.
$$
Use $30\\ \\mathrm{mm}$ centres.

*Sanity.* $30\\ \\mathrm{mm}$ centres is dense, and it is why a nailed built-up beam is a poor substitute for a rolled section: the nails must be closely spaced near the ends where the shear is high, and the labour cost swamps the material saving. Real practice tapers the spacing towards the supports, where $V$ is large, and opens it at mid-span, where $V$ is nearly zero — the same logic as a leaf spring's graduated clips or a steel girder's web stiffeners. Note also that the calculation gives the force **along** the beam; the nail must also resist the vertical shear that tries to split the flange off, and in timber the governing mode is usually the flange splitting, not the nail shearing.
:::
:::

::: example Shear centre of a channel {#ex-shear-centre}
A channel $150\\ \\mathrm{mm}$ deep with $50\\ \\mathrm{mm}$ flanges has a $6\\ \\mathrm{mm}$ web and $8\\ \\mathrm{mm}$ flanges. Find the shear centre.
::: solution
The shear flow in a flange at distance $s$ from its free tip is $q (s) = V (t_f s) (h / 2) / I$, so the total force in one flange is
$$
F = \\int_0^b q \, \\mathrm{d} s = \\frac{V t_f h b^{2}}{4 I} .
$$
The two flange forces form a couple about the web's centreline, and the shear centre lies at $e$ from the web where $V e = F h$:
$$
e = \\frac{t_f h^{2} b^{2}}{4 I} .
$$
With $I = t_w h^{3} / 12 + 2 b t_f (h / 2)^{2} = 6 \\times 150^{3} / 12 + 2 \\times 50 \\times 8 \\times 75^{2} = 1.688 \\times 10^{6} + 4.500 \\times 10^{6} = 6.188 \\times 10^{6}\\ \\mathrm{mm^{4}}$,
$$
e = \\frac{8 \\times 150^{2} \\times 50^{2}}{4 \\times 6.188 \\times 10^{6}} = 18.2\\ \\mathrm{mm}
$$
on the side **away** from the flanges' open face — equivalently, $e = 3 b^{2} t_f / \\left( 6 b t_f + h t_w \\right) = 60\,000 / 3300 = 18.2\\ \\mathrm{mm}$. $\checkmark$

*Sanity.* A load applied through the centroid, $18.2\\ \\mathrm{mm}$ from the shear centre, applies a torque of $18.2\\ \\mathrm{mm}$ times the shear, and the beam twists as well as bends. For a thin-walled channel the eccentricity is of the order of the flange width, so a channel used as a beam with a load hanging from its top flange — the natural thing to do — is **always** torsionally loaded, and codes require either a strap across the top or an allowance for the twisting. This is why purlins are tied to the roof deck, why a cantilevered channel bracket is loaded through its web and not its tip, and why closed sections, whose shear centre is well defined and often inside the section, are preferred wherever load position cannot be controlled.
:::
:::

::: example Glued laminated beam {#ex-glulam}
A glulam beam is made of five $32 \times 240\ \mathrm{mm}$ laminations glued face-to-face. The glue lines have a design shear resistance of $120\ \mathrm{N}$ per $\mathrm{mm}$ of beam length. What shear force may the beam carry, and how does that compare with its bending capacity on a span whose maximum moment is twice its maximum shear?
::: solution
The section is $240\ \mathrm{mm}$ wide and $160\ \mathrm{mm}$ deep, so
$$
I = \frac{240 \times 160^{3}}{12} = 81.92 \times 10^{6}\ \mathrm{mm^{4}} .
$$
The **worst glue line** is the one nearest the neutral axis, $16\ \mathrm{mm}$ from it. The area between that line and the near surface is $240 \times 96\ \mathrm{mm}$ with its centroid $32\ \mathrm{mm}$ from the neutral axis, so
$$
Q = 240 \times 96 \times 32 = 737.3 \times 10^{3}\ \mathrm{mm^{3}},
$$
$$
q = \frac{V Q}{I} = \frac{737.3 \times 10^{3}}{81.92 \times 10^{6}} V = 9.00 \times 10^{-3} V \ \mathrm{N / mm \text{ per } N} .
$$
Setting $q = 120\ \mathrm{N / mm}$,
$$
V_{\text{allow}} = \frac{120}{9.00 \times 10^{-3}} = 13.3\ \mathrm{kN}.
$$
**Bending comparison.** With an allowable bending stress of $24\ \mathrm{MPa}$,
$$
M_{\text{allow}} = \frac{24 \times 240 \times 160^{2}}{6} = 24.6\ \mathrm{kN\,m}
\quad\Longrightarrow\quad
V = \frac{M}{2} = 12.3\ \mathrm{kN}.
$$
**Bending governs, but only by $8$ per cent.**

*Sanity.* A glue line that looks indestructible is within $8$ per cent of being the critical element, and that is the normal situation in a glued built-up member: the adhesive is not a safety margin, it is a co-equal design check. Note how the numbers scale. $Q$ at the worst glue line goes as the square of the outer block's depth, so a beam made of **many thin laminations** has a far lower glue-line shear flow than one made of a few thick ones — a forty-ply $4\ \mathrm{mm}$ layup of the same depth has a worst glue line $2\ \mathrm{mm}$ from the neutral axis and a shear flow $64$ times smaller. This is why glulam for structural use comes in $16$ to $42\ \mathrm{mm}$ laminations and never in $100\ \mathrm{mm}$ timbers, why plywood webs are cross-grained, and why the stitch bonds in a bonded steel–concrete composite deck are spaced by a shear-flow calculation and not by convenience.
:::
:::

::: warning Long beams and short beams
Euler–Bernoulli beam theory, and therefore $\\sigma = M c / I$ and $\\tau = V Q / I t$ as derived from it, is exact only in the limit of a long, slender beam. For a beam shorter than about five depths, the assumption that plane sections remain plane becomes poor, the shear stress is not parabolic, and the deflection from shear deformation is comparable with that from bending. The correction is Timoshenko beam theory, which adds a shear-rotation term
$$
\\frac{\\mathrm{d} w}{\\mathrm{d} x} = \\theta + \\frac{V}{k A G}, \\qquad k = \\frac{5}{6} \\text{ for a rectangle}, \\; \\frac{10}{9} \\text{ for a circle},
$$
and it matters in practice for deep reinforced concrete coupling beams between shear walls, for short fibre-composite beams where the interlaminar shear strength is low, for rubber and elastomeric bearings, and for the deep "links" in eccentrically braced steel frames. A rule of thumb: if the shear deflection exceeds about $10$ per cent of the bending deflection, use Timoshenko; the ratio is of order $\\left( E / G \\right) \\left( A / A_w \\right) (d / L)^{2}$, which reaches $10$ per cent at $L / d$ near $5$ for steel and near $8$ for a composite.
:::

::: history
The need for a shear-flow formula arose from a specific engineering failure mode: the longitudinal splitting of built-up timber girders. Ithiel Town's lattice truss of 1820 and the Burr arch truss of 1817 trussed laminated timber with trunnels — wooden trunnels pegging the planks together — and bridges trussed that way failed along horizontal planes at the neutral axis, well away from the joints the designers were worried about. Caleb Wilkins and Zadock Thompson were documenting exactly those failures in American bridge reports of the 1830s, and the first published derivation of the shear flow expression is generally credited to the American engineer D. W. Johnson, who in 1853 worked out the horizontal thrust between the laminæ of a wooden girder. It was restated for iron rails by J. A. J. Couling in 1851 in the context of the rail web, and it reached the engineering mainstream through William John Macquorn Rankine's *Manual of the Civil Engineering* of 1858, where the horizontal shear between the layers of a beam is treated explicitly and the fastener-spacing rule is given in the form still used.

The **shear centre** belongs to a later and very different industry. Thin-walled open sections only became primary structure with the stressed-skin metal monoplane of the 1920s, and the discovery that a channel or an angle twists under a load applied through its centroid — that the "correct" line of action is not the centroid at all — was worked out in the British aircraft laboratories of the early 1930s and systematised by Stephen Timoshenko and S. Woinowsky-Krieger in their *Theory of Plates and Shells* and *Theory of Elasticity*, whose chapters on the torsion of thin-walled bars are still the standard reference. Timoshenko's other contribution to this chapter, the beam theory that carries his name and admits shear deformation, dates from 1921 and was motivated by exactly the same problem: the vibration of short, deep members whose measured frequencies were lower than Euler's theory predicted.
:::

::: quiz
A cantilever of length $L$ and rectangular section carries a tip load. Where is the bending stress zero and the shear stress maximum?
- [ ] At the fixed end
- [ ] At the free end
- [x] At the neutral axis of every section
- [ ] At the top and bottom surfaces
::: solution
At the neutral axis of every section. The bending stress is $\sigma = M y / I$, which vanishes wherever $y = 0$ regardless of the moment, while the shear stress $\tau = V Q / I t$ is maximum there because $Q$ is largest. So on the neutral surface of a loaded beam there is a **pure shear** stress and no normal stress — which makes it the one place in the beam where the principal stresses are exactly $\pm \tau$ at $45^\circ$ to the axis. That is why a beam that fails in shear shows a diagonal crack at about $45^\circ$ near the support, why reinforced concrete needs stirrups rather than longitudinal bars alone, and why the classic photoelastic picture of a loaded beam shows an isoclinic fan running out from the load point.
:::
:::

## Where this leads

Shear stress combines with bending stress in the principal-stress calculation of [[mechanics-of-materials/stress-transformation]], and the deflection it produces is added to the bending deflection in [[mechanics-of-materials/beam-deflection]]. Fastener group design under combined shear and moment is in [[machine-design/fasteners-joints]], welded joints under shear in [[manufacturing/joining]], and the shear lag and warping of thin-walled sections in [[solid-mechanics/thin-walled-structures]].

::: summary
- Shear flow $q = V Q / I$ is a force per unit length along the beam; the shear stress is $q$ divided by the width at the level of the cut.
- $Q$ is the first moment of the area between the cut and the free surface; it vanishes at the outer fibres, so the shear stress is zero there and maximum at the neutral axis.
- Peak shear is $1.5 V / A$ for a rectangle, $1.33 V / A$ for a circle, and about $1.25 V / A_{\\text{web}}$ for an I-section, whose web carries $90$ per cent or more of the shear.
- The stress jumps at a change of width by the ratio of the widths, which is why I-beams tear at the flange–web junction.
- Fastener spacing follows from $s \\le n F / q$; taper it towards the supports where the shear is large.
- A load not applied through the **shear centre** twists the beam; for a channel the eccentricity is of the order of the flange width.
:::

## Exercises

::: exercise Maximum shear {level=1 check="26.5"}
A circular bar of $40\\ \\mathrm{mm}$ diameter carries $25\\ \\mathrm{kN}$ of shear. Find the maximum shear stress in MPa.
::: solution
$A = 1257\\ \\mathrm{mm^{2}}$, $\\tau_{\\max} = \\tfrac{4}{3} V / A = \\tfrac{4}{3} \\times 25\,000 / 1257 = 26.5\\ \\mathrm{MPa}$.
*Note.* The mean is $19.9\\ \\mathrm{MPa}$; the peak is a third higher, on the neutral axis.
:::
:::

::: exercise Rectangle {level=1 check="4.0"}
A $75 \\times 150\\ \\mathrm{mm}$ rectangular beam carries $30\\ \\mathrm{kN}$ of shear. Find the maximum shear stress in MPa.
::: solution
$\\tau_{\\max} = 3 V / (2 A) = 3 \\times 30\,000 / (2 \\times 75 \\times 150) = 4.0\\ \\mathrm{MPa}$.
*Note.* The answer is $4.0\\ \\mathrm{MPa}$, which is close to the parallel-to-grain shear strength of many softwoods — a reminder that timber beams are shear-critical at spans where a steel beam would never be checked for shear.
:::
:::

::: exercise Shear flow {level=1 check="60"}
A built-up section has $I = 120 \\times 10^{6}\\ \\mathrm{mm^{4}}$ and the connected flange has $Q = 240 \\times 10^{3}\\ \\mathrm{mm^{3}}$. What is the shear flow for $V = 30\\ \\mathrm{kN}$, in $\\mathrm{N / mm}$?
::: solution
$q = V Q / I = 30\,000 \\times 240 \\times 10^{3} / (120 \\times 10^{6}) = 60\\ \\mathrm{N / mm}$.
:::
:::

::: exercise Fastener spacing {level=2}
For the beam of the previous exercise, what nail spacing is needed if each nail carries $1.2\\ \\mathrm{kN}$ in single shear, with one row each side?
::: solution
$s = F / q = 1200 / 60 = 20\\ \\mathrm{mm}$.
*Sanity.* $20\\ \\mathrm{mm}$ centres is below the minimum edge and end distance for most nails, so the connection is not feasible as drawn: the designer must use two rows, higher-capacity fasteners, or a glued joint. Shear flow calculations in timber routinely produce this answer, which is why glulam and plywood webs replaced nailed built-up sections.
:::
:::

::: exercise I-section {level=2}
For the $254 \\times 102\\ \\mathrm{UB}\\ 22$ of Example 2, find the shear force that produces a web shear stress of $100\\ \\mathrm{MPa}$, and compare it with the section's design shear capacity of $215\\ \\mathrm{kN}$.
::: solution
From $\\tau = V Q / I t_w$ with $Q = 147.9 \\times 10^{3}\\ \\mathrm{mm^{3}}$,
$$
V = \\frac{100 \\times 28.2 \\times 10^{6} \\times 6.0}{147.9 \\times 10^{3}} = 114.5\\ \\mathrm{kN}.
$$
The design capacity of $215\\ \\mathrm{kN}$ corresponds to a mean web stress of $215\,000 / (6.0 \\times 238.1) = 151\\ \\mathrm{MPa}$, which is $0.58 \\times 355 / 1.35$ — the code's shear yield divided by the partial factor. The peak is $1.25$ times that, $189\\ \\mathrm{MPa}$, still below shear yield.
*Sanity.* Codes design the web on the **mean** stress, not the peak, because the peak is local and the material redistributes. That is the same argument that makes a stress concentration harmless under static load in a ductile section.
:::
:::

::: exercise Shear centre {level=2}
Find the shear centre of a channel $200\\ \\mathrm{mm}$ deep with $70\\ \\mathrm{mm}$ flanges, $8\\ \\mathrm{mm}$ flange thickness and $6\\ \\mathrm{mm}$ web thickness.
::: solution
$$
e = \\frac{3 b^{2} t_f}{6 b t_f + h t_w}
= \\frac{3 \\times 70^{2} \\times 8}{6 \\times 70 \\times 8 + 200 \\times 6}
= \\frac{117\,600}{3360 + 1200} = 25.6\\ \\mathrm{mm}.
$$
A load applied at the centroid, $25.6\\ \\mathrm{mm}$ from the web, applies a torque of $0.0256 V$; for a $50\\ \\mathrm{kN}$ shear that is $1.28\\ \\mathrm{kN\,m}$, which is not a rounding error.
:::
:::

::: exercise Design {level=3}
A glulam beam $120\\ \\mathrm{mm}$ wide and $360\\ \\mathrm{mm}$ deep spans $4.8\\ \\mathrm{m}$ simply supported and carries a central load of $45\\ \\mathrm{kN}$. Check bending for an allowable $24\\ \\mathrm{MPa}$ and horizontal shear for an allowable $2.0\\ \\mathrm{MPa}$. Then check a $60\\ \\mathrm{mm}$ deep notch $120\\ \\mathrm{mm}$ long at mid-span on the soffit.
::: solution
$M_{\\max} = 45 \\times 4.8 / 4 = 54\\ \\mathrm{kN\,m}$, $V = 22.5\\ \\mathrm{kN}$.
**Bending.**
$$
\\sigma = \\frac{6 M}{b d^{2}} = \\frac{6 \\times 54 \\times 10^{6}}{120 \\times 360^{2}} = 20.8\\ \\mathrm{MPa} < 24 \\quad \\checkmark
$$
**Shear, unnotched.**
$$
\\tau = \\frac{3 V}{2 b d} = \\frac{3 \\times 22\,500}{2 \\times 120 \\times 360} = 0.78\\ \\mathrm{MPa} < 2.0 \\quad \\checkmark
$$
**Notched.** At the notch the remaining depth is $300\\ \\mathrm{mm}$ and the horizontal shear stress at the neutral axis of the reduced section is
$$
\\tau = \\frac{3 V}{2 b d'} = \\frac{3 \\times 22\,500}{2 \\times 120 \\times 300} = 0.94\\ \\mathrm{MPa},
$$
but the notch also creates a **perpendicular-to-grain tension** at its inner corner. The standard estimate for that stress is
$$
f_{t,\\perp} = \\frac{1.5 V}{b d'} \\left( \\frac{d}{d'} \\right)^{2} \\frac{e_r}{d} \\times 3
$$
with $e_r$ the horizontal distance from the load or reaction to the notch corner; here $e_r = 2400 - 120 = 2280\\ \\mathrm{mm}$ gives a large value, and the notch must be detailed with a radius and a steel plate, or moved to the support where the bending is low.

*Design comment.* The beam is at $87$ per cent of its bending capacity and $39$ per cent of its shear capacity, so the notch — which costs nothing in shear and everything in tension perpendicular to the grain — is what fails. Glulam splits perpendicular to the grain at $0.5$ to $1.0\\ \\mathrm{MPa}$, and a square-cornered notch at mid-span of a fully stressed beam reliably produces a crack that runs horizontally to the nearest support and drops the load. The rule is: never notch a glulam beam in the middle third of the span, and if you must, radius the corner and reinforce it.
:::
:::

::: exercise Derivation {level=3}
Derive the parabolic shear stress distribution for a rectangular section, show that each half of the section carries half the total shear force, and obtain the shear flow acting on the horizontal plane through the neutral axis. Use the result to explain why two loosely stacked planks are worth far less than one plank of the same total depth.
::: solution
At distance $y$ from the neutral axis the first moment of the area above the cut is
$$
Q = b \\left( \\frac{d}{2} - y \\right) \\cdot \\frac{1}{2} \\left( \\frac{d}{2} + y \\right)
= \\frac{b}{2} \\left( \\frac{d^{2}}{4} - y^{2} \\right),
$$
so with $I = b d^{3} / 12$ and $t = b$,
$$
\\tau (y) = \\frac{V Q}{I b} = \\frac{6 V}{b d^{3}} \\left( \\frac{d^{2}}{4} - y^{2} \\right).
$$
The shear force carried above the neutral axis is
$$
\\int_0^{d/2} \\tau b \, \\mathrm{d} y
= \\frac{6 V}{d^{3}} \\left[ \\frac{d^{2} y}{4} - \\frac{y^{3}}{3} \\right]_0^{d/2}
= \\frac{6 V}{d^{3}} \\left( \\frac{d^{3}}{8} - \\frac{d^{3}}{24} \\right)
= \\frac{6 V}{d^{3}} \\cdot \\frac{d^{3}}{12} = \\frac{V}{2} .
$$
By symmetry each half carries half the shear; the shear stress **transmitted across the horizontal interface at the neutral axis** is the peak value $\\tau_{\\max} = 3 V / (2 b d)$ integrated over nothing, and the shear flow on that plane is $q = V Q_{\\max} / I = 3 V / (2 d)$.

The shear flow on the neutral plane is therefore
$$
q = \frac{V Q_{\max}}{I} = \frac{V \times b d^{2} / 8}{b d^{3} / 12} = \frac{3 V}{2 d} .
$$

*Why it matters.* Two planks stacked loosely and simply resting on each other act as two independent beams, each taking half the load and each stressed to $\\sigma = 6 (P / 2) / (b (d / 2)^{2})$, four times the stress of the composite section. To make them act together, the connection must transmit the shear flow $q = 3 V / (2 d)$ along the interface — a substantial force, concentrated on a plane where the two planks want to slide past each other by the largest relative amount. This is why a bolted or glued built-up beam must be designed for slip, why Eurocode 5 requires a deformation check with a slip modulus for a nailed or bolted composite beam, and why a beam whose connectors are sized only for the vertical shear is a beam that will not composite.
:::
:::
