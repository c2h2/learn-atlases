Stress tells you whether a beam breaks; deflection tells you whether it works. A floor beam that carries twice its load without yielding and still bounces enough to crack the plaster is a failed beam, and a machine frame that is rigid at the design load and deflects three millimetres under the running load will put its gears out of mesh. In practice more steel is bought to satisfy $L / 360$ than to satisfy $165\ \mathrm{MPa}$, and more machine frames are stiffened against vibration than are strengthened against yield.

The whole of classical beam deflection rests on one differential equation,
$$
E I \frac{\mathrm{d}^{2} v}{\mathrm{d} x^{2}} = M(x),
$$
and on knowing four ways to solve it. Direct integration is exact and tedious. Superposition is fast and covers ninety per cent of practical cases. The moment-area theorems and the conjugate-beam method trade integration for geometry and are the quickest way to a slope at a point where the loading changes. Castigliano's energy theorem is the only one of the four that works on a frame, a curved bar, a truss or a statically indeterminate structure without a struggle, and it is the ancestor of every finite-element code you will ever use.

::: warning $EI v'' = M$ assumes small deflections
The curvature of a curve is $1 / \rho = v^{\prime \prime} / \left[ 1 + v^{\prime 2} \right]^{3 / 2}$, and the equation drops the $v^{\prime 2}$ term. That is legitimate while the slope is under about $0.1$ radians, which for a beam means a deflection under about $L / 20$. Beyond that the equation is wrong, and the errors are not small: a cantilever deflected to its own length shortens its effective lever arm by a third, and a column carrying a load eccentric by an amount comparable with its depth is $50$ per cent weaker than the linear theory says. The correction is the large-deflection or beam-column theory, and it matters for leaf springs, thin strips, flexible couplings, snap-fit cantilevers and every slender member loaded close to its buckling load.
:::

## The differential equation

::: definition The elastic curve {#def-elastic-curve}
For a prismatic beam of constant $E I$ with $v$ positive upward, $x$ to the right and the distributed load $w$ positive downward,
$$
E I \frac{\mathrm{d}^{2} v}{\mathrm{d} x^{2}} = M(x), \qquad
E I \frac{\mathrm{d}^{3} v}{\mathrm{d} x^{3}} = V(x), \qquad
E I \frac{\mathrm{d}^{4} v}{\mathrm{d} x^{4}} = - w(x),
$$
with the sign of $M$ taken positive for sagging. Integrating from $x = 0$ gives
$$
E I v^{\prime} = \int M \, \mathrm{d} x + C_1, \qquad
E I v = \iint M \, \mathrm{d} x \mathrm{d} x + C_1 x + C_2 ,
$$
and the two constants come from **boundary conditions**: $v = 0$ at a support, $v^{\prime} = 0$ at a fixed end or at a point of symmetry, $M = 0$ at a hinge or free end, and $V = 0$ at a free end. A beam of $n$ spans with $n + 1$ supports needs $2 n$ conditions, and getting them right is the whole difficulty.
:::

::: proof
From the flexure theory, a fibre at distance $y$ from the neutral axis has strain $\varepsilon = y / \rho$, so $\sigma = E y / \rho$ and
$$
M = \int_A \sigma y \, \mathrm{d} A = \frac{E I}{\rho} .
$$
For small slopes the curvature of the deflected curve is $1 / \rho = v^{\prime \prime}$, giving $E I v^{\prime \prime} = M$. Differentiating once and using $\mathrm{d} M / \mathrm{d} x = V$ from [[mechanics-of-materials/shear-moment-diagrams]] gives the third-order form; differentiating again and using $\mathrm{d} V / \mathrm{d} x = - w$ gives the fourth. The fourth-order form is the one used in practice by matrix methods, because it needs no prior calculation of the moment diagram.
:::

::: proposition Standard deflections {#prop-standard-deflections}
For a prismatic beam of span $L$ and constant $E I$:

- **Simply supported, central load $P$:** $\delta_{\max} = P L^{3} / (48 E I)$ at mid-span; $\theta_{\text{end}} = P L^{2} / (16 E I)$.
- **Simply supported, uniform load $w$:** $\delta_{\max} = 5 w L^{4} / (384 E I)$; $\theta_{\text{end}} = w L^{3} / (24 E I)$.
- **Simply supported, couple $C$ at one end:** $\delta_{\max} = C L^{2} / (9 \sqrt{3} E I)$ at $x = L \left( 1 - 1 / \sqrt{3} \right)$ from the loaded end; end slopes $C L / (3 E I)$ and $C L / (6 E I)$.
- **Cantilever, tip load $P$:** $\delta_{\max} = P L^{3} / (3 E I)$; $\theta_{\max} = P L^{2} / (2 E I)$.
- **Cantilever, uniform load $w$:** $\delta_{\max} = w L^{4} / (8 E I)$; $\theta_{\max} = w L^{3} / (6 E I)$.
- **Fixed-ended, uniform load $w$:** $\delta_{\max} = w L^{4} / (384 E I)$ at mid-span; $M_{\text{end}} = w L^{2} / 12$.
- **Propped cantilever, uniform load $w$:** prop reaction $3 w L / 8$; $M_{\text{wall}} = w L^{2} / 8$; $\delta_{\max} = w L^{4} / (185 E I)$.

The ratios between these are worth more than the formulas: fixing both ends makes a uniformly loaded beam five times stiffer than pinning them, and a propped cantilever is $185 / 76.8 = 2.4$ times stiffer than a simply supported beam.
:::

::: example Double integration {#ex-double-integration}
Derive the mid-span deflection of a simply supported beam carrying a central load $P$.
::: solution
By symmetry the reactions are $P / 2$ and the slope is zero at mid-span, so integrate over the left half only, where $M = P x / 2$:
$$
E I v^{\prime \prime} = \frac{P x}{2}, \qquad
E I v^{\prime} = \frac{P x^{2}}{4} + C_1, \qquad
E I v = \frac{P x^{3}}{12} + C_1 x + C_2 .
$$
**Boundary conditions.** $v (0) = 0$ gives $C_2 = 0$. $v^{\prime} (L / 2) = 0$ gives $C_1 = - P L^{2} / 16$. Hence
$$
v (x) = \frac{P x}{12 E I} \left( x^{2} - \frac{3 L^{2}}{4} \right),
$$
$$
\delta_{\max} = - v \left( \frac{L}{2} \right) = - \frac{P L}{24 E I} \left( \frac{L^{2}}{4} - \frac{3 L^{2}}{4} \right) = \frac{P L^{3}}{48 E I},
$$
$$
\theta_{\text{end}} = \left| v^{\prime} (0) \right| = \frac{P L^{2}}{16 E I} .
$$
($v$ is negative because the beam deflects downward.) *Check.* The expression is valid only over the left half. A clean check is the moment-area theorem: the tangent at mid-span is horizontal, so the deviation of the support from that tangent is the mid-span deflection; the area of the $M / E I$ diagram over the half-span is $\tfrac{1}{2} \times \tfrac{L}{2} \times \tfrac{P L}{4 E I} = \tfrac{P L^{2}}{16 E I}$ with its centroid $L / 3$ from the support, giving $\delta = \tfrac{P L^{2}}{16 E I} \times \tfrac{L}{3} = \tfrac{P L^{3}}{48 E I}$. $\checkmark$

*Sanity.* Note the two boundary conditions used — one displacement and one slope — and that the symmetry condition $v^{\prime} (L / 2) = 0$ replaced a second displacement condition. This is the standard trick and it halves the algebra every time. It works only for symmetric loading; for an unsymmetric load you must integrate over the whole span or use Macaulay's brackets.
:::
:::

::: example Cantilever {#ex-cantilever-deflect}
A cantilever of $2\ \mathrm{m}$ span, $I = 80 \times 10^{6}\ \mathrm{mm^{4}}$ and $E = 200\ \mathrm{GPa}$ carries a tip load of $20\ \mathrm{kN}$. Find the tip deflection and slope, and the load that would make the tip deflection equal to $1 / 200$ of the length.
::: solution
$$
\delta = \frac{P L^{3}}{3 E I}
= \frac{20\,000 \times 2000^{3}}{3 \times 200\,000 \times 80 \times 10^{6}} = 3.33\ \mathrm{mm},
$$
$$
\theta = \frac{P L^{2}}{2 E I}
= \frac{20\,000 \times 2000^{2}}{2 \times 200\,000 \times 80 \times 10^{6}} = 2.50 \times 10^{-3}\ \mathrm{rad} = 0.143^{\circ}.
$$
For $\delta = L / 200 = 10\ \mathrm{mm}$,
$$
P = \frac{3 E I \delta}{L^{3}} = \frac{3 \times 200\,000 \times 80 \times 10^{6} \times 10}{2000^{3}} = 60\ \mathrm{kN}.
$$
*Sanity.* $60\ \mathrm{kN}$ is a large load for a $2\ \mathrm{m}$ cantilever, and the check that matters is not the deflection but the stress: at $60\ \mathrm{kN}$ the moment is $120\ \mathrm{kN\,m}$, and unless the section modulus exceeds $120 \times 10^{6} / 165 = 727 \times 10^{3}\ \mathrm{mm^{3}}$ the beam yields long before it reaches $L / 200$. A rolled I-section with $I = 80 \times 10^{6}\ \mathrm{mm^{4}}$ and a depth of about $350\ \mathrm{mm}$ has $Z = 2 I / d \approx 457 \times 10^{3}\ \mathrm{mm^{3}}$, so this is a **strength** problem, not a stiffness problem: it would yield at about $75\ \mathrm{kN\,m}$, or a tip load near $38\ \mathrm{kN}$. Short, heavily loaded cantilevers are usually governed by strength; long, lightly loaded spans by deflection.
:::
:::

::: widget plot
f: x*(x^2-27)/10
x: 0, 3
y: -6, 0
labels: \text{deflected shape, } v / \left( P / 12 EI \right)
caption: Deflected curve of the left half of the simply supported beam of Example 1, plotted as $v \left( x \right) \times 12 E I / P = x \left( x^{2} - 3 L^{2} / 4 \right)$ for $L = 6\ \mathrm{m}$, divided by $10$ to fit the axes. The curve is a cubic, zero slope at mid-span and steepest at the support, and the ratio of end slope to mid-span deflection is $3 / L$ for a central load and $3.2 / L$ for a uniform load — nearly independent of the loading, which is why a single slope reading at a support gives a fair estimate of the mid-span deflection.
:::

## Superposition, moment-area and conjugate beam

::: algorithm Choosing a method {#alg-methods}
- **Superposition** — use it whenever the loading is a sum of standard cases and the beam is statically determinate. Fastest, least error-prone, and it is what every handbook and every software check is built on.
- **Macaulay's brackets** — use for a determinate beam with several point loads and couples. One expression for $M$ over the whole span, one integration, two boundary conditions.
- **Moment-area theorems** — use when you need a slope or a deflection at one point and the $M / E I$ diagram is made of simple areas. No integration at all, only areas and centroids.
- **Conjugate beam** — use for slopes and deflections of beams with simple supports, where the conjugate beam's shear and moment stand in for the real beam's slope and deflection. Elegant, and unbeatable for a fixed-ended beam.
- **Castigliano / unit load** — use for frames, curved members, combined bending and torsion, trusses, and anything statically indeterminate.
:::

::: theorem Moment-area theorems {#thm-moment-area}
For a beam between points $A$ and $B$,
$$
\theta_B - \theta_A = \int_A^B \frac{M}{E I} \, \mathrm{d} x, \qquad
t_{B / A} = \int_A^B \frac{M}{E I} x \, \mathrm{d} x ,
$$
where $t_{B / A}$ is the vertical deviation of $B$ from the tangent drawn at $A$, evaluated as the first moment of the $M / E I$ area about $B$. Both follow directly from $\mathrm{d} \theta = M \, \mathrm{d} x / E I$ and the geometry of the elastic curve.
:::

::: example Moment-area {#ex-moment-area}
A cantilever of length $L$ carries a uniform load $w$. Use the moment-area theorems to find the slope and deflection at the free end.
::: solution
The $M$ diagram is a parabola of value $- w L^{2} / 2$ at the wall and zero at the tip, with area
$$
\int_0^L M \, \mathrm{d} x = - \frac{w L^{3}}{6}
$$
(the area of a parabolic spandrel is one third of base times height, $\tfrac{1}{3} \times L \times \tfrac{w L^{2}}{2} = \tfrac{w L^{3}}{6}$, which is $\int_0^L \tfrac{1}{2} w x^{2} \mathrm{d} x$).

**First theorem.** With $\theta_{\text{wall}} = 0$,
$$
\theta_{\text{tip}} = \frac{1}{E I} \int_0^L \left( - \frac{w x^{2}}{2} \right) \mathrm{d} x = - \frac{w L^{3}}{6 E I} .
$$
**Second theorem.** Taking moments of the $M / E I$ area about the tip, where the lever arm of the element at $x$ is $x$,
$$
t_{\text{tip} / \text{wall}} = \frac{1}{E I} \int_0^L \frac{w x^{2}}{2} \cdot x \, \mathrm{d} x = \frac{w L^{4}}{8 E I} .
$$
Since the wall's tangent is horizontal, this deviation **is** the tip deflection.

*Sanity.* The whole calculation is two one-line integrals with no constants of integration, because the fixed end supplies both boundary conditions for free. Compare with the double-integration route, which needs $M (x)$, two integrations, two constants and two boundary conditions. For a cantilever the moment-area method is roughly three times less work, and the advantage grows when the loading is discontinuous, because you never write an expression for $M (x)$ — you only draw its diagram and take areas.
:::
:::

::: example Off-centre point load {#ex-offcentre}
A simply supported beam of $5\ \mathrm{m}$ span with $E I = 1.5 \times 10^{4}\ \mathrm{kN\,m^{2}}$ carries $25\ \mathrm{kN}$ at $1.5\ \mathrm{m}$ from the left-hand support. Find the end slopes, the deflection under the load and the maximum deflection.
::: solution
With $a = 1.5\ \mathrm{m}$, $b = 3.5\ \mathrm{m}$:
$$
\theta_A = \frac{P b \left( L^{2} - b^{2} \right)}{6 E I L}
= \frac{25 \times 3.5 \times \left( 25 - 12.25 \right)}{6 \times 1.5 \times 10^{4} \times 5} = 2.48 \times 10^{-3}\ \mathrm{rad},
$$
$$
\theta_B = \frac{P a \left( L^{2} - a^{2} \right)}{6 E I L}
= \frac{25 \times 1.5 \times \left( 25 - 2.25 \right)}{4.5 \times 10^{5}} = 1.90 \times 10^{-3}\ \mathrm{rad},
$$
$$
\delta_{\text{under load}} = \frac{P a^{2} b^{2}}{3 E I L}
= \frac{25 \times 2.25 \times 12.25}{3 \times 1.5 \times 10^{4} \times 5} = 3.06\ \mathrm{mm}.
$$
**Maximum deflection.** It occurs at $x_1 = \sqrt{\left( L^{2} - b^{2} \right) / 3} = \sqrt{12.75 / 3} = 2.06\ \mathrm{m}$ from $A$, and
$$
\delta_{\max} = \frac{P b \left( L^{2} - b^{2} \right)^{3 / 2}}{9 \sqrt{3} E I L} = 3.40\ \mathrm{mm}.
$$
*Check.* $\theta_A / \theta_B = 2.48 / 1.90 = 1.31$, and the exact ratio is $b \left( L^{2} - b^{2} \right) / a \left( L^{2} - a^{2} \right) = 1115 / 853 = 1.31$. $\checkmark$ The larger slope is at the end **nearer** the load, which is the end whose moment diagram has the larger area near it.

*Sanity.* The maximum deflection, $3.40\ \mathrm{mm}$, is $11$ per cent greater than the deflection under the load and occurs $0.56\ \mathrm{m}$ away from it, on the long-span side. For a symmetrically loaded beam those two numbers coincide and the distinction is forgotten; for an eccentric load it is not, and a deflection limit checked at the load point is unconservative — by $11$ per cent here, and by more as the load moves towards a support ($30$ per cent at $a = 0.2 L$), although the deflections themselves are then smaller. The rule is that for any off-centre load, check the deflection at $\sqrt{\left( L^{2} - b^{2} \right) / 3}$ from the support nearer the load, not under the load.
:::
:::

## Energy methods and indeterminate beams

::: theorem Castigliano's theorem {#thm-castigliano}
For an elastic structure of total strain energy $U$, the displacement in the direction of a force $P$ is
$$
\delta_P = \frac{\partial U}{\partial P},
$$
and for bending, shear and torsion respectively,
$$
U = \int \frac{M^{2}}{2 E I} \mathrm{d} s + \int \frac{V^{2}}{2 k A G} \mathrm{d} s + \int \frac{T^{2}}{2 G J} \mathrm{d} s .
$$
For a **redundant** reaction $R$ with no displacement at its support, $\partial U / \partial R = 0$ gives the compatibility equation directly. Equivalently, the **unit load method** gives
$$
\delta = \int \frac{M m}{E I} \mathrm{d} s ,
$$
where $m$ is the moment diagram due to a unit load applied where the deflection is wanted.
:::

::: example Frame deflection by Castigliano {#ex-frame}
A bracket is made of a vertical leg $A B$ of $1.5\ \mathrm{m}$ rigidly fixed at $A$, and a horizontal arm $B C$ of $2\ \mathrm{m}$ carrying a vertical load of $10\ \mathrm{kN}$ at $C$. Both parts have $I = 60 \times 10^{6}\ \mathrm{mm^{4}}$ and $E = 200\ \mathrm{GPa}$. Find the vertical deflection of $C$.
::: solution
Take $x$ along the arm from $C$ and $y$ up the leg from $B$.
**Arm:** $M = P x$, $\partial M / \partial P = x$.
**Leg:** $M = P b$ (constant, $b = 2\ \mathrm{m}$), $\partial M / \partial P = b$.
$$
\delta_C = \int_0^b \frac{P x \cdot x}{E I} \mathrm{d} x + \int_0^a \frac{P b \cdot b}{E I} \mathrm{d} y
= \frac{P b^{3}}{3 E I} + \frac{P b^{2} a}{E I} .
$$
Numerically, with $P = 10\,000\ \mathrm{N}$, $b = 2000\ \mathrm{mm}$, $a = 1500\ \mathrm{mm}$,
$$
\frac{P b^{3}}{3 E I} = \frac{10\,000 \times 8.0 \times 10^{9}}{3 \times 200\,000 \times 60 \times 10^{6}} = 2.22\ \mathrm{mm},
$$
$$
\frac{P b^{2} a}{E I} = \frac{10\,000 \times 4.0 \times 10^{6} \times 1500}{200\,000 \times 60 \times 10^{6}} = 5.00\ \mathrm{mm},
$$
$$
\delta_C = 7.22\ \mathrm{mm}.
$$
*Sanity.* The **leg** contributes $69$ per cent of the deflection even though the load is carried on the arm, because the arm's moment tapers to zero at the tip while the leg's is constant at $P b$ over its whole length. This is the single most useful result in bracket design: to stiffen a bracket, shorten the leg or thicken it, not the arm. It is also why a wall-mounted jib crane is designed with a diagonal strut — the strut turns the leg's bending into axial force, and an axial member's compliance $L / (A E)$ is far smaller than a bent member's.
:::
:::

::: example Propped cantilever {#ex-propped}
Find the prop reaction of a cantilever of length $L$ carrying a uniform load $w$ and propped at the free end.
::: solution
Take the prop reaction $R$ as the redundant. With $x$ from the prop, the bending moment is
$$
M (x) = R x - \frac{w x^{2}}{2}, \qquad \frac{\partial M}{\partial R} = x .
$$
Castigliano's compatibility condition, $\partial U / \partial R = \int (M / E I) \left( \partial M / \partial R \right) \mathrm{d} x = 0$, gives
$$
\int_0^L \left( R x^{2} - \frac{w x^{3}}{2} \right) \mathrm{d} x = 0
\quad\Longrightarrow\quad
\frac{R L^{3}}{3} = \frac{w L^{4}}{8},
$$
$$
R = \frac{3 w L}{8}.
$$
The wall then carries $5 w L / 8$ and a moment $w L^{2} / 8$, and the maximum deflection is $w L^{4} / (185 E I)$ at $x = 0.42 L$ from the prop.

*Sanity.* Compare the three cases for the same $w L$: simply supported carries $w L / 2$ at each end with $M = w L^{2} / 8$; propped cantilever carries $3 w L / 8$ and $5 w L / 8$ with $M = w L^{2} / 8$ at the wall; fixed-ended carries $w L / 2$ with $M = w L^{2} / 12$ at each end. The propped cantilever has the same maximum moment as the simply supported beam but $2.4$ times the stiffness, and the fixed-ended beam has $67$ per cent of the moment and five times the stiffness. That last factor is why a continuous or fixed beam is used wherever it can be detailed properly — and why it is often not used, because the fixity that buys the stiffness also buys sensitivity to settlement, to temperature and to construction tolerances, and a "fixed" end that rotates by a few milliradians gives back most of the benefit.
:::
:::

::: warning Deflection is not always a serviceability limit
For a slender compression member the deflection **is** the strength. A column carrying an axial load $P$ with an initial crookedness $v_0$ deflects to
$$
v = \frac{v_0}{1 - P / P_E},
$$
so the moment is amplified by $1 / \left( 1 - P / P_E \right)$ and the member fails when the stress reaches yield at a load well below the squash load. The same amplification appears in a beam-column, in a beam on an elastic foundation under a moving load, and in any member whose load is applied through its own deflected shape — a flagpole, a drill string, a saw blade, a belt in tension. The rule is that once $P / P_E$ exceeds about $0.2$, deflection and stress must be computed together, and the linear superposition of this chapter is no longer valid.
:::

::: history
The problem of the deflected beam is older than the theory of elasticity. Jacob (James) Bernoulli published his solution of the elastic curve of a bent strip in the *Acta Eruditorum* in 1694, taking the curvature proportional to the bending moment. Leonhard Euler, prompted by Daniel Bernoulli's suggestion that the elastica minimises the integral of the squared curvature, classified the elastic curves in an appendix to his *Methodus inveniendi* of 1744 and derived there the buckling load of a column. The **moment-area** and **conjugate-beam** ideas came a century later with graphical statics: Otto Mohr showed in 1868 that the deflected shape of a beam is the bending-moment diagram of a fictitious beam loaded by its $M / E I$ diagram, and Charles E. Greene of the University of Michigan published the moment-area theorems in 1873. **Castigliano's** theorems, set out by Alberto Castigliano in his 1873 thesis at Turin and in his book of 1879, *Théorie de l'équilibre des systèmes élastiques et ses applications*, are the pivot: they turned statically indeterminate structural analysis into a matter of differentiating an energy expression, and their direct descendants are the principle of minimum potential energy and the stiffness method that every finite-element program implements.
:::

## Where this leads

Deflection limits are the design basis of [[machine-design/shafts]], where the slope at a bearing governs, and of [[machine-design/springs]], where the deflection is the product. The energy methods used here generalise to [[solid-mechanics/energy-methods]] and to the matrix stiffness method of [[finite-element-method/direct-stiffness]], and the large-deflection warning becomes the whole subject of [[solid-mechanics/plates]] post-buckling and of [[vibrations/free-vibration]] natural frequencies.

::: summary
- $E I v^{\prime \prime} = M$ is valid for small slopes only; the fourth-derivative form $E I v^{\prime \prime \prime \prime} = w$ avoids drawing the moment diagram.
- Two boundary conditions per beam segment; use symmetry ($v^{\prime} = 0$ at mid-span) to halve the work.
- Memorise the standard cases and use **superposition** for anything that is a sum of them.
- Moment-area and conjugate-beam methods replace integration with areas and centroids and are unbeatable for a cantilever or a fixed-ended beam.
- Castigliano's theorem handles frames, curved members and redundants; for a bracket, the leg usually contributes more deflection than the arm.
- Deflection is a serviceability limit for a beam and a **strength** limit for a column: once $P / P_E$ exceeds about $0.2$, stress and deflection must be computed together.
:::

::: quiz
Two geometrically similar cantilevers, one twice as long as the other, carry the same tip load and are made of the same material. Which is stiffer in the sense of having the smaller **ratio** of tip deflection to length?
- [x] The longer one, because it carries relatively less load
- [ ] They are the same, because both scale with $L^{3}$
- [ ] The shorter one, because deflection grows with length
- [ ] Neither, because deflection is not a stiffness measure
::: solution
The longer one. For geometrically similar cantilevers of scale factor $\lambda$, $I \propto b d^{3} \propto \lambda^{4}$, and with $P$ held fixed $\delta \propto L^{3} / I \propto \lambda^{3} / \lambda^{4} = 1 / \lambda$, so even the **absolute** deflection falls as the member gets bigger, and $\delta / L \propto 1 / \lambda^{2}$: the cantilever twice as long has a quarter of the relative deflection. The comparison changes if the loads are scaled to give the same bending stress: then $P \propto Z / L \propto \lambda^{2}$ and $\delta / L = \sigma L / (3 E c)$, the same for both. Under self-weight, which grows as $\lambda^{3}$, the bigger member is relatively **less** stiff ($\delta / L \propto \lambda$) — which is why large structures are stiffened by depth, and why a scale model is not automatically a valid stiffness model of the prototype.
:::
:::

## Exercises

::: exercise Standard case {level=1 check="4.0"}
A simply supported steel beam of $4\ \mathrm{m}$ span with $E I = 1.0 \times 10^{4}\ \mathrm{kN\,m^{2}}$ carries $30\ \mathrm{kN}$ at mid-span. Find the mid-span deflection in mm.
::: solution
$\delta = P L^{3} / (48 E I) = 30 \times 4^{3} / (48 \times 1.0 \times 10^{4}) = 4.0 \times 10^{-3}\ \mathrm{m} = 4.0\ \mathrm{mm}$.
*Note.* In N and mm, $E I = 10^{4}\ \mathrm{kN\,m^{2}} = 10^{13}\ \mathrm{N\,mm^{2}}$ and $\delta = 30\,000 \times 4000^{3} / (48 \times 10^{13}) = 4.0\ \mathrm{mm}$. The answer is $4.0\ \mathrm{mm}$, against a $L / 360$ limit of $11.1\ \mathrm{mm}$ — comfortably stiff.
:::
:::

::: exercise Ratio {level=1 check="8"}
By what factor does the tip deflection of a cantilever change if its length is doubled, load and section unchanged?
::: solution
By $2^{3} = 8$, because $\delta \propto L^{3}$. If instead the load were a uniform load, the factor would be $2^{4} = 16$.
:::
:::

::: exercise Fixity {level=1 check="0.2"}
What is the ratio of the mid-span deflection of a fixed-ended beam to that of the same beam simply supported, under uniform load? (Enter the ratio as a decimal.)
::: solution
$\left( w L^{4} / 384 \right) / \left( 5 w L^{4} / 384 \right) = 1 / 5 = 0.2$, so the fixed-ended beam deflects **five times less**. For comparison, a cantilever of the same span deflects $(w L^{4} / 8) / (w L^{4} / 384) = 48$ times as much as the fixed-ended beam.
:::
:::

::: exercise Superposition {level=2}
A simply supported beam of $6\ \mathrm{m}$ span with $E I = 2.0 \times 10^{4}\ \mathrm{kN\,m^{2}}$ carries $20\ \mathrm{kN / m}$ uniformly and $30\ \mathrm{kN}$ at mid-span. Find the mid-span deflection.
::: solution
$$
\delta_w = \frac{5 w L^{4}}{384 E I} = \frac{5 \times 20 \times 6^{4}}{384 \times 2.0 \times 10^{4}} = 0.0169\ \mathrm{m} = 16.9\ \mathrm{mm},
$$
$$
\delta_P = \frac{P L^{3}}{48 E I} = \frac{30 \times 216}{48 \times 2.0 \times 10^{4}} = 0.00675\ \mathrm{m} = 6.8\ \mathrm{mm},
$$
$$
\delta = 23.6\ \mathrm{mm}.
$$
*Sanity.* The uniform load contributes $71$ per cent of the deflection from $80$ per cent of the total load: kilonewton for kilonewton, a central point load deflects the beam $(1 / 48) / (5 / 384) = 1.6$ times as much as the same load spread uniformly.
:::
:::

::: exercise Moment-area {level=2}
A simply supported beam carries a couple $C_0$ at the left support. Use the moment-area theorems to find the slope at each end and the location and value of the maximum deflection.
::: solution
The moment diagram is linear from $C_0$ at $A$ to zero at $B$, area $C_0 L / 2$, centroid at $L / 3$ from $A$.
**First theorem:** $\theta_B - \theta_A = C_0 L / (2 E I)$.
**Second theorem:** the deviation of $B$ from the tangent at $A$ is $t_{B / A} = \left( C_0 L / 2 E I \right) \times \left( 2 L / 3 \right) = C_0 L^{2} / (3 E I)$, and since $v_A = v_B = 0$ this equals $L \left( - \theta_A \right)$, so
$$
\theta_A = - \frac{C_0 L}{3 E I}, \qquad
\theta_B = \frac{C_0 L}{2 E I} - \frac{C_0 L}{3 E I} = + \frac{C_0 L}{6 E I}.
$$
The slope vanishes where the $M / E I$ area from $A$ equals $- \theta_A$: $C_0 \left( x - x^{2} / 2 L \right) = C_0 L / 3$, that is at $x = L \left( 1 - 1 / \sqrt{3} \right) = 0.423 L$ from $A$, where
$$
\delta_{\max} = \frac{C_0 L^{2}}{9 \sqrt{3} E I} = 0.0642 \frac{C_0 L^{2}}{E I}.
$$
*Check.* The end slopes have opposite signs, as they must for a beam bent in single curvature, and $|\theta_A| = 2 |\theta_B|$, consistent with the centroid being at $L / 3$ from $A$. $\checkmark$
:::
:::

::: exercise Indeterminate {level=2}
A fixed-ended beam of span $L$ carries a central point load $P$. Find the end moments and the mid-span deflection.
::: solution
By symmetry the redundant end moment $M_0$ is the same at both ends. With $M = P x / 2 - M_0$ over the left half and the condition $\theta = 0$ at the support, the moment-area theorem gives
$$
\int_0^{L / 2} \left( \frac{P x}{2} - M_0 \right) \mathrm{d} x = 0
\quad\Longrightarrow\quad
\frac{P L^{2}}{16} = \frac{M_0 L}{2}
\quad\Longrightarrow\quad
M_0 = \frac{P L}{8}.
$$
The mid-span moment is $P L / 4 - P L / 8 = P L / 8$, so the maximum moment is $P L / 8$ against $P L / 4$ for the simply supported beam — a $50$ per cent saving. The deflection is
$$
\delta_{\max} = \frac{P L^{3}}{192 E I},
$$
one quarter of the simply supported value.
*Sanity.* Fixity halves the moment and quarters the deflection, and it costs a support detail that must deliver a moment. A "fixed" end made with two bolts in slotted holes delivers about a third of the assumed fixity, gives back most of the benefit, and — worse — introduces an eccentricity the design never accounted for.
:::
:::

::: exercise Design {level=3}
A machine bed cross-beam of $1.2\ \mathrm{m}$ span is simply supported and carries a central load of $40\ \mathrm{kN}$. The deflection under the load must not exceed $0.1\ \mathrm{mm}$, and the box section's width is limited to $150\ \mathrm{mm}$ with a wall thickness of $12\ \mathrm{mm}$. Find the required depth, and check the bending stress.
::: solution
$$
I_{\text{req}} = \frac{P L^{3}}{48 E \delta}
= \frac{40\,000 \times 1200^{3}}{48 \times 200\,000 \times 0.1}
= 72.0 \times 10^{6}\ \mathrm{mm^{4}} .
$$
For a square hollow section of outside width $b = 150$ and inside $b_i = 126$,
$$
I = \frac{150 d^{3} - 126 \left( d - 24 \right)^{3}}{12} = 72.0 \times 10^{6} .
$$
Trying $d = 240\ \mathrm{mm}$: $I = \left( 2073.6 - 1269.8 \right) \times 10^{6} / 12 = 67.0 \times 10^{6}\ \mathrm{mm^{4}}$ — just short. Trying $d = 250$: $I = \left( 2343.8 - 1454.4 \right) \times 10^{6} / 12 = 74.1 \times 10^{6}\ \mathrm{mm^{4}}$, adequate, giving $\delta = 0.097\ \mathrm{mm}$. **Select $d = 250\ \mathrm{mm}$.**

**Stress check.**
$$
M = \frac{40 \times 1.2}{4} = 12\ \mathrm{kN\,m}, \qquad
\sigma = \frac{12 \times 10^{6} \times 125}{74.1 \times 10^{6}} = 20.2\ \mathrm{MPa}.
$$
*Design comment.* The stiffness requirement gives a stress of only $20\ \mathrm{MPa}$, about an eighth of a typical allowable of $165\ \mathrm{MPa}$, so the beam is entirely deflection-governed — as machine structures almost always are. Note also what the $0.1\ \mathrm{mm}$ limit is really for: a machine tool's positional accuracy is set by the deflection of its structure under cutting force, and a $0.1\ \mathrm{mm}$ deflection at the tool point is a $0.1\ \mathrm{mm}$ error on the machined part. That is why machine beds are made of heavily ribbed cast iron or polymer concrete with $E I$ far in excess of what strength requires, and why a designer who sizes a machine frame on stress produces a frame that is light, cheap and inaccurate.
:::
:::

::: exercise Derivation {level=3}
Use Castigliano's theorem to find the horizontal reactions of a symmetric two-pinned portal frame of height $h$ and span $L$, rigid-jointed and loaded by a vertical force $W$ at the middle of the beam, and state the assumptions on which the result depends.
::: solution
By symmetry each vertical reaction is $W / 2$. Take the horizontal reaction $H$ at the hinges as the redundant:
$$
\frac{\partial U}{\partial H} = \frac{1}{E I} \int M \frac{\partial M}{\partial H} \mathrm{d} s = 0 .
$$
On each column $M = H y$ with $\partial M / \partial H = y$ ($y$ up from the hinge), and on each half of the beam $M = H h - W x / 2$ with $\partial M / \partial H = h$ ($x$ from the eave), taking moments that put the inside of the frame in tension as positive. Hence
$$
2 \int_0^h H y^{2} \mathrm{d} y + 2 \int_0^{L / 2} \left( H h - \frac{W x}{2} \right) h \, \mathrm{d} x = 0 ,
$$
$$
\frac{2 H h^{3}}{3} + H h^{2} L - \frac{W h L^{2}}{8} = 0
\quad\Longrightarrow\quad
H = \frac{3 W h L^{2}}{8 \left( 2 h^{3} + 3 h^{2} L \right)}
= \frac{3 W L^{2}}{8 h \left( 2 h + 3 L \right)} .
$$
**Assumptions:** linear elastic material; small deflections so that equilibrium is written on the undeflected geometry; uniform $E I$ in all members; rigid beam-to-column joints transmitting moment without rotation; axially rigid members, so no sway from axial shortening; and no support settlement.

*Comment.* Every one of those assumptions is violated in a real building frame. The joints are semi-rigid, the members are not axially rigid, the loads are unsymmetric, the foundations settle and the whole thing sways. That is why frame design is done by approximate methods at concept stage and by matrix analysis at detail stage, and why the answer to a frame problem is a **distribution** of forces that depends on relative stiffness, not a single value from statics. The same is true of the arch: its thrust depends entirely on the assumption that the hinges do not spread, and a hinge that spreads by $5\ \mathrm{mm}$ in a $10\ \mathrm{m}$ span changes the thrust by tens of per cent.
:::
:::
