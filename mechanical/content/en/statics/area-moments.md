The centroid tells you where a section is. This chapter tells you how strongly it resists being bent, and the answer is not how much material there is but how far that material sits from the centroid. Two sections with exactly the same area — a solid rectangle and an I-beam cut from the same amount of steel — can differ in bending stiffness by a factor of five, and the whole of the difference is in the second moment of area.

Second moments are the place where statics most obviously becomes arithmetic, and they are worth doing carefully once, because they recur in bending stress, in column buckling, in the deflection of every beam you will ever size, in the torsion of thin walls and in the section properties that a finite-element program computes for every element. The formulas are few; the errors are many, and almost all of them are arithmetic or bookkeeping. The discipline is a table, a datum, and a check against a published section property.

::: warning Every parallel-axis step needs the centroidal moment
The single most common error in this subject is applying the parallel-axis theorem to a moment of area that was never taken about a centroidal axis. $I = \bar{I} + A d^{2}$ holds only when $\bar{I}$ is the moment about the part's *own centroid*, parallel to the target axis. Taking $b d^{3} / 12$ for a rectangle and adding $A d^{2}$ where $d$ is measured from the wrong reference — from the base rather than from the rectangle's own centre, or from the whole section's centroid rather than the part's — gives an answer that is wrong by $A d$ rather than $A d^{2}$ and that no check will catch, because it is positive and plausible. Write $\bar{I}$ and $d$ in the same line, and define $d$ as "from the part's centroid to the target axis".
:::

## Second moments of area

::: definition Second moment of area and radius of gyration {#def-second-moment}
The **second moments of area** (moments of inertia of an area) of a plane area $A$ about the $x$ and $y$ axes are
$$
I_x = \int_A y^{2}\, \mathrm{d} A, \qquad I_y = \int_A x^{2}\, \mathrm{d} A,
$$
and the **product of inertia** is
$$
I_{xy} = \int_A x y\, \mathrm{d} A .
$$
The **radius of gyration** $r$ is defined by $I = A r^{2}$, so that
$$
r_x = \sqrt{I_x / A}, \qquad r_y = \sqrt{I_y / A} .
$$
Units are $\mathrm{m^{4}}$ or, in practice, $\mathrm{mm^{4}}$; the **section modulus** is $Z = I / y_{\max}$, with units $\mathrm{m^{3}}$ or $\mathrm{cm^{3}}$.
:::

::: proposition Standard second moments {#prop-standard-i}
About its own centroidal axes,
$$
\text{rectangle } b \times d: \quad I = \frac{b d^{3}}{12}, \quad Z = \frac{b d^{2}}{6};
\qquad
\text{triangle, base } b, \text{ height } h: \quad I_{\text{base}} = \frac{b h^{3}}{12}, \quad I_{\text{centroid}} = \frac{b h^{3}}{36};
$$
$$
\text{circle of radius } r: \quad I = \frac{\pi r^{4}}{4} = \frac{\pi D^{4}}{64};
\qquad
\text{semicircle about its diameter}: \quad I = \frac{\pi r^{4}}{8};
$$
$$
\text{thin-walled circle, mean radius } t \gg \text{thickness } \tau: \quad I \approx \pi \tau t^{3}.
$$
For all of these the product of inertia about the centroidal axes of symmetry is zero.
:::

::: proof
Rectangle, about its centroidal $x$ axis: take a strip of width $b$ at height $y$ and thickness $\mathrm{d} y$, so $\mathrm{d} A = b\, \mathrm{d} y$ and
$$
I_x = \int_{-d/2}^{d/2} y^{2} b\, \mathrm{d} y = b \left[ \frac{y^{3}}{3} \right]_{-d/2}^{d/2} = \frac{b d^{3}}{12} .
$$
Note that the depth is *cubed* while the width appears only to the first power: doubling the depth quadruples $I$, doubling the width only doubles it. This single fact explains the I-beam, the joist, the corrugated sheet, the hollow tube and the shape of every long-span structure.

Circle: use a polar element, $\mathrm{d} A = \rho\, \mathrm{d} \rho\, \mathrm{d} \theta$, and $x^{2} + y^{2} = \rho^{2}$, so
$$
I_x + I_y = \int_0^{2 \pi} \int_0^{r} \rho^{2} \cdot \rho\, \mathrm{d} \rho\, \mathrm{d} \theta = \frac{\pi r^{4}}{2},
$$
and by symmetry $I_x = I_y = \pi r^{4} / 4$.

Thin-walled circle: put $\mathrm{d} A = 2 \pi t\, \mathrm{d} t$ between $t - \tau / 2$ and $t + \tau / 2$, or note that $I = \pi (t_o^{4} - t_i^{4}) / 64$ for the annulus and expand; the result $I = \pi \tau t^{3}$ shows that for a given area of material $A = 2 \pi \tau t$ the stiffness is proportional to $t^{2}$, so a larger-diameter thin tube is stiffer than a small thick one of the same weight — the reason bicycle frames, aircraft stringers and scaffolding tubes are all thin and large.
:::

::: theorem Parallel-axis theorem {#thm-parallel}
Let $\bar{I}_x$ be the second moment of an area about its own centroidal axis parallel to the $x$ axis, let $A$ be the area and $d_y$ the perpendicular distance between the two axes. Then
$$
I_x = \bar{I}_x + A d_y^{2}, \qquad I_{xy} = \bar{I}_{xy} + A d_x d_y .
$$
The moment about any axis is therefore at least as large as the moment about the parallel centroidal axis, and the centroidal axis is the unique axis of minimum second moment.
:::

::: proof
Let $\bar{y}$ be the distance of an element from the centroidal axis, so that its distance from the target axis is $y = \bar{y} + d_y$. Then
$$
I_x = \int (\bar{y} + d_y)^{2}\, \mathrm{d} A = \int \bar{y}^{2}\, \mathrm{d} A + 2 d_y \int \bar{y}\, \mathrm{d} A + d_y^{2} \int \mathrm{d} A .
$$
The middle term vanishes because $\int \bar{y}\, \mathrm{d} A$ is the first moment about the centroidal axis, which is zero by the definition of the centroid. What remains is $\bar{I}_x + A d_y^{2}$. The same expansion for the product gives $\bar{I}_{xy} + A d_x d_y$. Since $A d^{2} \ge 0$, the centroidal value is the minimum, and it is unique because $A d^{2}$ is strictly increasing in $|d|$.

The corollary is important and often missed: **never** add second moments about non-coincident axes. $I_1 + I_2$ computed about two different axes is meaningless; every term in a sum must be transferred to the same target axis first.
:::

::: algorithm Built-up section properties {#alg-builtup}
1. Find the **centroid** of the whole section by the composite-area method of the last chapter. Do this first and do it right; every subsequent number depends on it.
2. For each part, record $A_i$, the distance $d_i$ from the part's own centroid to the *whole section's* centroidal axis, and the part's own $\bar{I}_i$.
3. Form $I = \sum (\bar{I}_i + A_i d_i^{2})$, treating holes as negative.
4. Compute $r = \sqrt{I / A}$ and $Z = I / y_{\max}$, and check $Z$ against a published table if the section is a standard rolled shape.
5. **Check the magnitude.** A useful bound: for any section, $I / (A y_{\max}^{2})$ lies between $1 / 12$ (a rectangle bent about its weak axis) and $1$ (all the material at the extreme fibre). A value outside that range is an arithmetic error, and a value near $1$ means an efficient section.
:::

::: example Built-up I-section {#ex-isect}
An I-section is built from two flanges $200 \times 20\ \mathrm{mm}$ and a web $12 \times 260\ \mathrm{mm}$ between them, giving an overall depth of $300\ \mathrm{mm}$. Find $I_x$, $r_x$ and $Z_x$, and compare the efficiency with a solid $200 \times 300\ \mathrm{mm}$ rectangle.
::: solution
The section is symmetric, so the centroidal axis is at mid-depth, $150\ \mathrm{mm}$ from the bottom. Each flange's centroid is $150 - 10 = 140\ \mathrm{mm}$ from that axis.

| Part | $A\ (\mathrm{mm^{2}})$ | $d\ (\mathrm{mm})$ | $\bar{I}\ (\mathrm{mm^{4}})$ | $A d^{2}\ (\mathrm{mm^{4}})$ |
|---|---|---|---|---|
| Flange (each) | 4000 | 140 | 133 333 | 78 400 000 |
| Web | 3120 | 0 | 14 638 000 | 0 |

Summing $\bar{I} + A d^{2}$ over all three parts,
$$
I_x = 2 \left[ \frac{200 \times 20^{3}}{12} + 4000 \times 140^{2} \right] + \frac{12 \times 260^{3}}{12}
= 2 \times 78\,533\,333 + 14\,638\,000 = 171.7 \times 10^{6}\ \mathrm{mm^{4}} .
$$
Then
$$
r_x = \sqrt{\frac{171.7 \times 10^{6}}{11\,120}} = 124.3\ \mathrm{mm}, \qquad
Z_x = \frac{171.7 \times 10^{6}}{150} = 1.145 \times 10^{6}\ \mathrm{mm^{3}} = 1145\ \mathrm{cm^{3}} .
$$
**Comparison.** The solid $200 \times 300$ rectangle has $I = 200 \times 300^{3} / 12 = 450 \times 10^{6}\ \mathrm{mm^{4}}$ and $A = 60\,000\ \mathrm{mm^{2}}$, so
$$
\frac{I}{A} = 7500\ \mathrm{mm^{3} / mm^{2}} \quad \text{versus} \quad
\frac{171.7 \times 10^{6}}{11\,120} = 15\,440\ \mathrm{mm^{3} / mm^{2}} .
$$
The I-beam gives **twice the stiffness per unit area** — and per unit weight, since both are steel — while using $19$ per cent of the material.

*Sanity.* The flanges contribute $91$ per cent of the second moment from $72$ per cent of the area, because their $A d^{2}$ term dominates: $78.4 \times 10^{6}$ each against a web $\bar{I}$ of $14.6 \times 10^{6}$. The efficiency check gives $I / (A y_{\max}^{2}) = 171.7 \times 10^{6} / (11\,120 \times 150^{2}) = 0.686$, comfortably inside $[1 / 12, 1]$ and close to the I-beam's theoretical ceiling.
:::
:::

::: example Weak axis of the same I-section {#ex-weakaxis}
For the built-up I-section of Example 1, find $I_y$ and $I_x / I_y$.
::: solution
About the vertical centroidal axis the flanges are rectangles $10$ deep by $200$ wide with their centroids *on* the axis, so they contribute no transfer term, and the web is $260$ deep by $12$ wide, also centred on the axis:
$$
I_y = 2 \times \frac{20 \times 200^{3}}{12} + \frac{260 \times 12^{3}}{12}
= 2 \times 13.33 \times 10^{6} + 0.037 \times 10^{6} = 26.71 \times 10^{6}\ \mathrm{mm^{4}} .
$$
Then
$$
\frac{I_x}{I_y} = \frac{171.7}{26.71} = 6.43 .
$$
*Check.* The web contributes $0.14$ per cent of $I_y$ — it lies almost exactly on the axis, so its $12\ \mathrm{mm}$ width makes it worthless about that axis. Every bit of the weak-axis stiffness is in the flanges.

*Sanity.* A factor of $6.4$ between the two axes is typical of an I-section, and it is the number that governs lateral-torsional buckling, strut design and the choice of which way round to install a joist. The same section used as a column will buckle about $y$ at $1 / 6.4$ of the load at which it yields in strong-axis bending, which is why compression members are boxes, tubes or tees rather than I-sections, and why a table's legs are tubes.
:::
:::

::: example Product of inertia and principal axes of a Z-section {#ex-zsection}
A Z-section is made from three plates: a top flange $100 \times 10\ \mathrm{mm}$ centred at $(0, 100)$, a web $10 \times 190\ \mathrm{mm}$ centred at the origin, and a bottom flange $100 \times 10\ \mathrm{mm}$ centred at $(-50, -100)$, all in mm. Find the centroidal second moments, $I_{xy}$ and the principal moments.
::: solution
**Centroid.** Areas $1000$, $1900$, $1000$, total $3900\ \mathrm{mm^{2}}$:
$$
\bar{x} = \frac{1000 \times 0 + 1900 \times 0 + 1000 \times (-50)}{3900} = -12.82\ \mathrm{mm}, \qquad
\bar{y} = \frac{1000 \times 100 + 1000 \times (-100)}{3900} = 0 .
$$
**Second moments.** Using $I = \bar{I} + A d^{2}$ for each plate, with $\bar{I}_{xy} = 0$ for every rectangle about its own axes,
$$
I_x = 2 \left[ \frac{100 \times 10^{3}}{12} + 1000 \times 100^{2} \right] + \frac{10 \times 190^{3}}{12} = 25.73 \times 10^{6}\ \mathrm{mm^{4}},
$$
$$
I_y = \left[ \frac{10 \times 100^{3}}{12} + 1000 \times 12.82^{2} \right]
+ \left[ \frac{190 \times 10^{3}}{12} + 1900 \times 12.82^{2} \right]
+ \left[ \frac{10 \times 100^{3}}{12} + 1000 \times 37.18^{2} \right] = 3.54 \times 10^{6}\ \mathrm{mm^{4}},
$$
$$
I_{xy} = \sum A_i\, d_{x i} d_{y i}
= 1000 (12.82)(100) + 1900 (12.82)(0) + 1000 (-37.18)(-100) = 5.00 \times 10^{6}\ \mathrm{mm^{4}} .
$$
**Principal moments.**
$$
I_{\text{avg}} = \frac{25.73 + 3.54}{2} = 14.64 \times 10^{6}, \qquad
\frac{I_x - I_y}{2} = 11.09 \times 10^{6}, \qquad
R = \sqrt{11.09^{2} + 5.00^{2}} = 12.17 \times 10^{6},
$$
$$
I_1 = 26.81 \times 10^{6}\ \mathrm{mm^{4}}, \qquad I_2 = 2.47 \times 10^{6}\ \mathrm{mm^{4}},
$$
$$
\tan 2 \theta_p = - \frac{5.00}{11.09} = -0.4509 \quad \Longrightarrow \quad \theta_p = -12.1^\circ .
$$
*Check.* $I_1 + I_2 = 26.81 + 2.47 = 29.28 = 25.73 + 3.54 = I_x + I_y$. $\checkmark$

*Sanity.* The principal axes are tilted $12^\circ$ from the flanges, so a Z-purlin loaded vertically (in the plane of the roof) bends about an axis that is neither its geometric $x$ nor its geometric $y$, and it twists unless the load passes through the shear centre — which for a Z-section lies outside the material. This is the well-known reason Z-purlins must be installed with their top and bottom flanges correctly identified, and why lapping them at the wrong end reverses the eccentricity instead of cancelling it.
:::
:::

::: proposition Polar second moment and section modulus {#prop-polar}
The **polar second moment of area** about an axis perpendicular to the plane through the origin $O$ is
$$
J_O = \int_A r^{2}\, \mathrm{d} A = \int_A \left( x^{2} + y^{2} \right) \mathrm{d} A = I_x + I_y ,
$$
and about the centroid, $J_C = \bar{I}_x + \bar{I}_y$; the transfer law is $J_O = J_C + A \rho^{2}$ where $\rho$ is the distance $O C$. The **section modulus** is $Z = I / y_{\max}$, so that the extreme-fibre bending stress is $\sigma_{\max} = M / Z$, and $Z$ is the quantity tabulated for rolled shapes because it is one step closer to the stress than $I$ is.
:::

$J$ is the same invariant that appears in the torsion of circular shafts, which is why a solid circle has $J = 2 I$ and why the polar quantity is what a shaft needs while the rectangular quantity is what a beam needs. Note that $J$ is *not* the torsion constant for non-circular sections: for a rectangle the torsion constant is $K = \beta b d^{3}$ with $\beta$ between $0.141$ and $0.333$, never $J / 2$, and using $J$ there over-predicts the stiffness of a rectangular torsion bar by up to $40$ per cent.

## Rotation of axes and principal moments

::: theorem Transformation of second moments {#thm-i-transform}
When the axes $x y$ are rotated through an angle $\theta$ about the common origin to give $u v$,
$$
I_u = \frac{I_x + I_y}{2} + \frac{I_x - I_y}{2} \cos 2 \theta - I_{xy} \sin 2 \theta ,
$$
$$
I_v = \frac{I_x + I_y}{2} - \frac{I_x - I_y}{2} \cos 2 \theta + I_{xy} \sin 2 \theta ,
$$
$$
I_{uv} = \frac{I_x - I_y}{2} \sin 2 \theta + I_{xy} \cos 2 \theta .
$$
The sum $I_u + I_v = I_x + I_y$ is invariant under rotation.
:::

::: proof
An element at $(x, y)$ has coordinates $u = x \cos \theta + y \sin \theta$ and $v = - x \sin \theta + y \cos \theta$ in the rotated frame. Then
$$
I_u = \int v^{2}\, \mathrm{d} A = \sin^{2} \theta \int x^{2}\, \mathrm{d} A + \cos^{2} \theta \int y^{2}\, \mathrm{d} A - 2 \sin \theta \cos \theta \int x y\, \mathrm{d} A
= I_x \sin^{2} \theta + I_y \cos^{2} \theta - 2 I_{xy} \sin \theta \cos \theta .
$$
Substituting $\sin^{2} \theta = (1 - \cos 2 \theta) / 2$, $\cos^{2} \theta = (1 + \cos 2 \theta) / 2$ and $2 \sin \theta \cos \theta = \sin 2 \theta$ gives the first result; $I_v$ follows by replacing $\theta$ with $\theta + 90^{\circ}$. Adding the two, the $\cos 2 \theta$ and $\sin 2 \theta$ terms cancel and $I_u + I_v = I_x + I_y$, which is also immediate from $I_u + I_v = \int (u^{2} + v^{2})\, \mathrm{d} A = \int (x^{2} + y^{2})\, \mathrm{d} A = J$, the polar second moment.
:::

::: theorem Principal axes and Mohr's circle for inertia {#thm-principal}
The moments of inertia are stationary when
$$
\tan 2 \theta_p = - \frac{I_{xy}}{(I_x - I_y) / 2} ,
$$
and on those axes $I_{uv} = 0$. The **principal moments** are
$$
I_{1,2} = \frac{I_x + I_y}{2} \pm \sqrt{ \left( \frac{I_x - I_y}{2} \right)^{2} + I_{xy}^{2} } .
$$
Mohr's circle for inertia is drawn with $I$ as abscissa and $I_{xy}$ as ordinate, centre $\left( (I_x + I_y) / 2, 0 \right)$ and radius equal to the square root above; angles on the circle are twice the physical angles.
:::

::: proof
Differentiating $I_u$ with respect to $\theta$ and setting the derivative to zero,
$$
\frac{\mathrm{d} I_u}{\mathrm{d} \theta} = - (I_x - I_y) \sin 2 \theta - 2 I_{xy} \cos 2 \theta = 0
\quad \Longrightarrow \quad
\tan 2 \theta_p = - \frac{I_{xy}}{(I_x - I_y) / 2} .
$$
Substituting back gives the two stationary values, one a maximum and one a minimum, and $I_{uv} = 0$ at the same angle because $\mathrm{d} I_u / \mathrm{d} \theta = - 2 I_{uv}$ — so the axes of stationary moment are exactly the axes of zero product. The circle follows by plotting the parametric equations for $I_u$ and $I_{uv}$ against the parameter $2 \theta$: both are sinusoidal in $2 \theta$ with the same amplitude and in quadrature, which is a circle of the stated centre and radius. An axis of symmetry makes $I_{xy} = 0$ because for every element at $(x, y)$ there is a matching element at $(x, -y)$ whose product cancels, so **a symmetry axis is always a principal axis**, and if there are two of them the section is isotropic in bending.
:::

::: example Principal moments of an angle {#ex-principal}
For a rolled angle section, tabulated centroidal properties are $I_x = 200 \times 10^{6}\ \mathrm{mm^{4}}$, $I_y = 80 \times 10^{6}\ \mathrm{mm^{4}}$ and $I_{xy} = -60 \times 10^{6}\ \mathrm{mm^{4}}$. Find the principal moments and the orientation of the principal axes.
::: solution
$$
I_{\text{avg}} = \frac{200 + 80}{2} = 140 \times 10^{6}\ \mathrm{mm^{4}}, \qquad
\frac{I_x - I_y}{2} = 60 \times 10^{6}\ \mathrm{mm^{4}},
$$
$$
R = \sqrt{60^{2} + 60^{2}} \times 10^{6} = 84.85 \times 10^{6}\ \mathrm{mm^{4}},
$$
$$
I_1 = 140 + 84.85 = 224.9 \times 10^{6}\ \mathrm{mm^{4}}, \qquad
I_2 = 140 - 84.85 = 55.1 \times 10^{6}\ \mathrm{mm^{4}} .
$$
The orientation follows from
$$
\tan 2 \theta_p = - \frac{-60}{60} = 1 \quad \Longrightarrow \quad 2 \theta_p = 45^{\circ}, \quad \theta_p = 22.5^{\circ} .
$$
*Check.* $I_1 + I_2 = 224.9 + 55.1 = 280 = 200 + 80 = I_x + I_y$. $\checkmark$ The invariant holds, so the arithmetic is consistent.

*Sanity.* The principal moments differ by a factor of $4.1$, so this angle is more than four times as stiff about one principal axis as about the other — and neither of those axes is the $x$ or $y$ axis of the table. A load applied along a geometric axis of an unsymmetric section therefore produces bending about *both* principal axes, and the beam twists as well as bends unless the load passes through the shear centre. This is the reason angles are rarely used as beams and the reason a channel used as a beam must be loaded through its web.
:::
:::

::: widget plot
f: 140+sqrt(3600+3600*sin(x*2*pi/180)^2)
x: 0, 90
y: 130, 235
labels: \text{principal maximum } I_1(\theta)
caption: Second moment $I_u$ about an axis rotated through $\theta$ for the angle section of Example 4, drawn on Mohr's circle: $I_{\text{avg}} = 140 \times 10^{6}\ \mathrm{mm^{4}}$, radius $84.9 \times 10^{6}$. The maximum $224.9 \times 10^{6}$ occurs at $\theta = 22.5^{\circ}$ and the minimum $55.1 \times 10^{6}$ at $67.5^{\circ}$; the curve is periodic in $180^{\circ}$ and symmetric about $45^{\circ}$, which is the signature of the $2 \theta$ dependence that makes Mohr's circle for inertia use doubled angles.
:::

::: example Rectangular hollow section {#ex-rhs}
A rectangular hollow section $200 \times 100 \times 8\ \mathrm{mm}$ (outside depth $200$, outside width $100$, wall $8$) is bent about its strong axis. Find $I_x$, $Z_x$ and the percentage of the solid rectangle's stiffness it retains.
::: solution
Subtract the inner rectangle from the outer. The inner box is $(200 - 16) \times (100 - 16) = 184 \times 84\ \mathrm{mm}$:
Computing the outer and inner terms separately, $100 \times 200^{3} / 12 = 66.67 \times 10^{6}$ and $84 \times 184^{3} / 12 = 43.54 \times 10^{6}$, so
$$
I_x = 66.67 - 43.54 = 23.13 \times 10^{6}\ \mathrm{mm^{4}}, \qquad
Z_x = \frac{23.13 \times 10^{6}}{100} = 231.3 \times 10^{3}\ \mathrm{mm^{3}} .
$$
The area is $100 \times 200 - 84 \times 84 = 20\,000 - 7056 = 12\,944\ \mathrm{mm^{2}}$, against the solid rectangle's $20\,000\ \mathrm{mm^{2}}$, so
$$
\frac{I_{\text{RHS}}}{I_{\text{solid}}} = \frac{23.13}{66.67} = 34.7\ \text{per cent}
\quad \text{from} \quad
\frac{A_{\text{RHS}}}{A_{\text{solid}}} = 64.7\ \text{per cent of the material}.
$$
*Check.* The efficiency ratio is $0.347 / 0.647 = 0.54$, so the hollow section is $1.9$ times as efficient per unit weight as the solid bar.

*Sanity.* Removing the middle $65$ per cent of the depth in each direction costs $65$ per cent of the stiffness but only $35$ per cent of the weight — the trade is favourable, which is why every frame, roll cage, spaceframe and bicycle is tubular. Push it further and the wall becomes so thin that local buckling of the flat faces intervenes: real RHS walls are limited to about $t \ge b / 40$, and the optimum is set by buckling, not by bending.
:::
:::

::: warning Weak-axis, strong-axis and the trap of the table
Section-property tables give $I$ about two axes, conventionally labelled the major (strong, $x$–$x$) and minor (weak, $y$–$y$) axes, and the numbers can differ by an order of magnitude. Reading the wrong column is a classic cause of structural failure, and the labelling convention is not universal: European and British tables take $y$–$y$ as the strong axis while American tables take $x$–$x$. Two further traps. First, $Z$ is not proportional to $I$: for an I-section the ratio $Z / (I / y_{\max})$ is exactly $1$ for elastic bending, but the *plastic* modulus $Z_p$ is $1.1$ to $1.15$ times larger for an I-section and $1.5$ times for a rectangle, and mixing the two gives a $50$ per cent error. Second, the tabulated $I$ is about the centroid, and a bolted or welded connection rarely loads a section through its centroid — an eccentricity of even $20\ \mathrm{mm}$ on a $200\ \mathrm{kN}$ force adds $4\ \mathrm{kN\,m}$ of moment that the section property alone never predicted.
:::

::: history
The second moment of area enters engineering through the bending theory, and its history is that of the beam. Leonardo da Vinci and Galileo both measured the strength of beams and both got the neutral axis wrong, Galileo placing it at the bottom fibre of a cantilever and predicting a strength proportional to the square of the depth rather than to the depth itself. Edme Mariotte corrected the neutral-axis position in 1682 and found the linear strain distribution; Jacob Bernoulli introduced the "elastic curve" in 1694 and, in the work published posthumously in 1713, used what is essentially the second moment of the cross-section. Leonhard Euler gave the buckling load in 1744 and 1757 with $E I$ appearing explicitly, and Coulomb's 1773 memoir on the strength of materials stated the linear stress distribution across a section. Thomas Young named and quantified the modulus of elasticity in 1807, and Navier's *Résumé des leçons* of 1826 assembled the modern bending formula $\sigma = M y / I$ together with the deflection theory, at the École des Ponts et Chaussées where the practical need to size iron girders made section properties a first-class engineering quantity. The parallel-axis theorem itself is a special case of the transfer theorem for second moments that Lagrange had already used in the mechanics of rigid bodies, where the corresponding quantity is the moment of inertia of a mass and the transfer term is $M d^{2}$ rather than $A d^{2}$.
:::

::: quiz
Two sections have the same area. Section A is a solid rectangle $60 \times 240\ \mathrm{mm}$; section B is the same rectangle cut into four equal strips of $60 \times 60$ and re-arranged side by side at the same overall depth. Which is stiffer in bending about the strong axis?
- [ ] They are equal, because the area is unchanged
- [x] Section A, because its material lies further from the neutral axis on average
- [ ] Section B, because it has more surfaces
- [ ] Neither can be compared without knowing the material
::: solution
Section A. Cutting and re-arranging into four $60 \times 60$ strips side by side keeps the area but moves most of the material towards the middle, and $I$ weights by $y^{2}$. Concretely, $I_A = 60 \times 240^{3} / 12 = 69.1 \times 10^{6}\ \mathrm{mm^{4}}$, while four independent strips give $4 \times 60 \times 60^{3} / 12 = 4.32 \times 10^{6}\ \mathrm{mm^{4}}$ — sixteen times weaker, which is $4^{2}$, the square of the depth reduction as the theorem predicts. This is also why a laminated spring works and why a stack of loose plates is useless as a beam unless they are bolted or glued so that they act as one: the parallel-axis term only counts if the section is prevented from sliding between its layers.
:::
:::

## Where this leads

Second moments are the input to bending stress and deflection in [[mechanics-of-materials/bending-stress]] and [[mechanics-of-materials/beam-deflection]], to the critical load in [[mechanics-of-materials/buckling]], and to the torsional section constant in [[mechanics-of-materials/torsion]]. Principal axes of area are the analogue of principal stress in [[mechanics-of-materials/stress-transformation]], and the plastic modulus used in limit design is developed in [[solid-mechanics/plasticity]].

::: summary
- The second moment of area weights material by the *square* of its distance from the axis, so depth, not area, buys stiffness: $I \propto d^{3}$ for a rectangle.
- Standard values: $b d^{3} / 12$ for a rectangle, $\pi D^{4} / 64$ for a circle, $\pi \tau t^{3}$ for a thin tube, $b h^{3} / 36$ for a triangle about its own centroid.
- Parallel axis: $I = \bar{I} + A d^{2}$, with $\bar{I}$ about the part's own centroid and $d$ measured to the target axis; never add moments taken about different axes.
- Under rotation, $I_u + I_v$ is invariant; principal axes make $I_{uv} = 0$ and give $I_{1,2} = I_{\text{avg}} \pm R$, read directly from Mohr's circle with doubled angles.
- A symmetry axis is always a principal axis; an unsymmetric section bends and twists unless loaded through its shear centre.
- Hollow and I-shaped sections put material far from the neutral axis and are typically twice as efficient per unit weight as solid bars of the same material.
:::

## Exercises

::: exercise Rectangle {level=1 check="180"}
Find the second moment of area, in $\mathrm{cm^{4}}$, of a $100 \times 60\ \mathrm{mm}$ rectangle about its weak (centroidal) axis.
::: solution
The weak axis is the one about which the depth is smallest, so $b = 100\ \mathrm{mm}$ and $d = 60\ \mathrm{mm}$:
$$
I = \frac{100 \times 60^{3}}{12} = 1.8 \times 10^{6}\ \mathrm{mm^{4}} = 180\ \mathrm{cm^{4}} .
$$
About the strong axis it is $60 \times 100^{3} / 12 = 5.0 \times 10^{6}\ \mathrm{mm^{4}} = 500\ \mathrm{cm^{4}}$, $2.8$ times larger. A flat bar bent the wrong way is nearly three times as flexible, which is why a shelf bracket uses the deep orientation and why a ruler is easy to flex face-on and hard edge-on.
:::
:::

::: exercise Circle {level=1 check="63.6"}
Find the second moment of area of a solid circular bar of $60\ \mathrm{mm}$ diameter about a diameter, in $\mathrm{cm^{4}}$.
::: solution
$I = \pi D^{4} / 64 = \pi \times 60^{4} / 64 = 636\,173\ \mathrm{mm^{4}} = 63.6\ \mathrm{cm^{4}}$.
*Note.* The polar second moment is twice this, $J = \pi D^{4} / 32 = 1.272 \times 10^{6}\ \mathrm{mm^{4}}$, which is the quantity used in torsion. Confusing $I$ with $J$ — a factor of two — is a common and consequential error, and it is the reason a shaft's torsion formula and a beam's bending formula look almost alike but differ by exactly that factor.
:::
:::

::: exercise Parallel axis {level=1 check="245"}
A rectangle $60 \times 10\ \mathrm{mm}$ has its centroid $20\ \mathrm{mm}$ from a horizontal axis parallel to its long side. Find $I$ about that axis in $10^{3}\ \mathrm{mm^{4}}$.
::: solution
$\bar{I} = 60 \times 10^{3} / 12 = 5000\ \mathrm{mm^{4}}$, $A = 600\ \mathrm{mm^{2}}$, $A d^{2} = 600 \times 400 = 240\,000\ \mathrm{mm^{4}}$, so
$$
I = 5000 + 240\,000 = 245\,000\ \mathrm{mm^{4}} = 245 \times 10^{3}\ \mathrm{mm^{4}} .
$$
The transfer term is $48$ times the section's own moment: at $20\ \mathrm{mm}$ from a $10\ \mathrm{mm}$ deep strip, the parallel-axis term is everything and $\bar{I}$ is negligible. That is exactly why flanges dominate an I-beam and why a stiffener's own thickness barely matters compared with where it is placed.
:::
:::

::: exercise Radius of gyration {level=2}
For the built-up I-section of Example 1, find $r_x$ and the ratio $r_x / (d / 2)$, where $d = 300\ \mathrm{mm}$.
::: solution
$r_x = \sqrt{171.7 \times 10^{6} / 11\,120} = 124.3\ \mathrm{mm}$, so $r_x / (d / 2) = 124.3 / 150 = 0.829$.
*Interpretation.* The radius of gyration is $83$ per cent of the half-depth, meaning the section behaves as if its whole area were concentrated at $0.83$ of the extreme-fibre distance. A solid rectangle has $r / (d / 2) = 1 / \sqrt{3} = 0.577$, and a thin-walled circle has essentially $1.0$. The ratio is a good single-number measure of section efficiency, and it is also what governs buckling: the slenderness ratio is $L / r$, so an efficient bending section is automatically an efficient column about the same axis.
:::
:::

::: exercise Weak and strong axis {level=2}
A $150 \times 75 \times 18$ equal angle has $I_x = I_y = 5.48 \times 10^{6}\ \mathrm{mm^{4}}$ and $I_{xy} = -3.24 \times 10^{6}\ \mathrm{mm^{4}}$ about its centroidal axes parallel to the legs. Find the principal moments.
::: solution
$$
I_{\text{avg}} = 5.48 \times 10^{6}, \qquad \frac{I_x - I_y}{2} = 0, \qquad
R = \sqrt{0 + 3.24^{2}} \times 10^{6} = 3.24 \times 10^{6},
$$
$$
I_1 = (5.48 + 3.24) \times 10^{6} = 8.72 \times 10^{6}\ \mathrm{mm^{4}}, \qquad
I_2 = (5.48 - 3.24) \times 10^{6} = 2.24 \times 10^{6}\ \mathrm{mm^{4}} .
$$
Since $I_x = I_y$, $\tan 2 \theta_p$ is infinite, so $2 \theta_p = 90^{\circ}$ and $\theta_p = 45^{\circ}$: the principal axes are along and across the bisector of the angle, as symmetry requires. The ratio $I_1 / I_2 = 3.9$, so an angle used as a strut is nearly four times as likely to buckle about its weak principal axis — and the tabulated $I_x$ and $I_y$ tell you nothing about it, because neither is a principal value.
:::
:::

::: exercise Circular hollow section {level=2 check="196.5"}
A circular hollow section of $100\ \mathrm{mm}$ outside diameter and $6\ \mathrm{mm}$ wall has $I = \pi (D_o^{4} - D_i^{4}) / 64$. Find $I$ in $\mathrm{cm^{4}}$.
::: solution
$D_i = 100 - 12 = 88\ \mathrm{mm}$, so
$$
I = \frac{\pi (100^{4} - 88^{4})}{64} = \frac{\pi (10^{8} - 5.997 \times 10^{7})}{64}
= \frac{\pi \times 4.003 \times 10^{7}}{64} = 1.965 \times 10^{6}\ \mathrm{mm^{4}} = 196.5\ \mathrm{cm^{4}} .
$$
*Check with the thin-wall formula.* $I \approx \pi \tau t^{3} = \pi \times 6 \times 47^{3} = 1.966 \times 10^{6}\ \mathrm{mm^{4}}$, within $0.1$ per cent, since $t / \tau = 7.8$ is comfortably thin. A solid $100\ \mathrm{mm}$ bar has $I = 4.91 \times 10^{6}\ \mathrm{mm^{4}}$ from five times the area, so the tube is $1.3$ times as efficient per unit weight — less dramatic than for an I-section, because a circular tube cannot put its material as far from one particular axis.
:::
:::

::: exercise Design {level=3}
A beam must have $I_x \ge 85 \times 10^{6}\ \mathrm{mm^{4}}$ about its strong axis and is limited to a depth of $250\ \mathrm{mm}$. Compare a solid rectangular section of width $b$ with a rolled I-section of mass $37\ \mathrm{kg / m}$ and $I_x = 136 \times 10^{6}\ \mathrm{mm^{4}}$, and state which to choose and why.
::: solution
**Solid rectangle.** $I = b d^{3} / 12$ requires
$$
b = \frac{12 \times 85 \times 10^{6}}{250^{3}} = \frac{1.02 \times 10^{9}}{1.5625 \times 10^{7}} = 65.3\ \mathrm{mm},
$$
giving $A = 65.3 \times 250 = 16\,320\ \mathrm{mm^{2}}$ and a mass of $16\,320 \times 10^{-6} \times 7850 = 128\ \mathrm{kg / m}$.

**Rolled I-section.** $I_x = 136 \times 10^{6}\ \mathrm{mm^{4}}$ exceeds the requirement by $60$ per cent, at $37\ \mathrm{kg / m}$.

The I-section is **$3.5$ times lighter** for the same stiffness, and it also has more reserve. Choose the I-section.

*Design comment.* Three things would change the answer. If the beam is laterally unsupported, the I-section's weak-axis $I_y$ and its torsional rigidity govern, and it may buckle laterally before reaching its bending capacity — a solid rectangle or a box section has no weak axis and no lateral-torsional buckling mode. If the load is applied to the top flange without bearing stiffeners, the web will crush. And if the member is a column rather than a beam, the weak-axis radius of gyration controls and the I-section's advantage shrinks. Section selection is never a matter of $I_x$ alone, which is why tables print $I_y$, $r_y$, $J$ and the plastic modulus alongside it.
:::
:::

::: exercise Derivation {level=3}
Derive $I_x = b h^{3} / 36$ for a triangle of base $b$ and height $h$ about its centroidal axis parallel to the base, starting from $I_{\text{base}} = b h^{3} / 12$.
::: solution
From the last chapter the centroid lies at $h / 3$ from the base, and the area is $A = b h / 2$. The parallel-axis theorem gives
$$
I_{\text{base}} = \bar{I} + A d^{2}
\quad \Longrightarrow \quad
\bar{I} = \frac{b h^{3}}{12} - \frac{b h}{2} \left( \frac{h}{3} \right)^{2}
= \frac{b h^{3}}{12} - \frac{b h^{3}}{18} = \frac{b h^{3}}{36} .
$$
*Check by direct integration.* At height $y$ above the base the width is $b (1 - y / h)$, so about the base
$$
I_{\text{base}} = \int_0^h y^{2} b \left( 1 - \frac{y}{h} \right) \mathrm{d} y
= b \left( \frac{h^{3}}{3} - \frac{h^{3}}{4} \right) = \frac{b h^{3}}{12},
$$
which confirms the starting value, and about the centroidal axis at $y = h / 3$,
$$
\bar{I} = \int_0^h \left( y - \frac{h}{3} \right)^{2} b \left( 1 - \frac{y}{h} \right) \mathrm{d} y = \frac{b h^{3}}{36},
$$
as required.

*Why it matters.* The triangle is the load diagram of a triangularly distributed load and the cross-section of a wedge, a fillet weld and a concrete gravity dam's profile, so $b h^{3} / 36$ and $b h^{3} / 12$ are both in constant use — and the ratio of $3$ between them is a good reminder that the parallel-axis term for a triangle is two thirds of the total, so a dam analysed about its base rather than its centroid understates its own stiffness by a factor of three.
:::
:::
