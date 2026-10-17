A $\pm 0.1$ on a bore says that its **diameter** is right. It says nothing about whether the bore is **round**, **straight**, **square to the face** the reader assumed it was square to, or **where** it is. Geometric dimensioning and tolerancing exists because a part's **function** lives in its shape and orientation and not in its size, and because a size tolerance is the **only** tool a $\pm$ drawing has — so a $\pm$ drawing ends up tolerancing size to $\pm 0.02$ to protect a perpendicularity of $0.05$, and pays three times for the privilege.

The system is a **language** and not a set of symbols: it has a grammar (the feature-control frame), a syntax (the datum reference frame), and a semantics (the tolerance zone, which is a **volume in space** and not a number). A drawing that uses the symbols without the grammar is worse than a $\pm$ drawing, because it looks authoritative and means nothing.

::: warning Seven geometric-tolerancing errors that make a drawing unmeasurable
**A tolerance with no datum.** A perpendicularity of $0.02$ **to nothing** is a statement about a limit that does not exist; every orientation, location and runout tolerance must name its datum, and a feature-control frame with an empty second or third compartment is an **incomplete sentence**. **A tolerance zone of the wrong shape.** A position tolerance written as $0.1$ instead of $\varnothing 0.1$ is a zone between **two parallel planes** and not a cylinder, and it is $29\ \%$ tighter in the diagonal direction and $29\ \%$ looser in the direction the drafter did not think of. **A datum that cannot be contacted.** Datum $C$ on a feature that is buried in the assembly, or a datum axis defined by two features $4\ \mathrm{mm}$ apart on a $400\ \mathrm{mm}$-long part, or a datum plane on a surface with $0.8$ of waviness — every one produces a measurement that changes when the part is re-fixture. **A datum precedence that contradicts the function.** If the part locates on the bore first, the bore is datum $A$; if the drawing says the face is $A$ because it is the biggest surface, the drawing is dimensioning a part that is not made. **A maximum-material modifier on a surface profile.** $\boxed{\mathrm{M}}$ on a **feature of size** gives bonus tolerance; $\boxed{\mathrm{M}}$ on a **surface** or a **pattern of features not of size** is a boundary control and means something else entirely, and the drafter who puts it on a profile has written a legal sentence in the wrong language. **A composite tolerance whose two frames contradict.** A pattern-locating frame of $\varnothing 1$ over a feature-relating frame of $\varnothing 0.2$ is fine; $\varnothing 0.2$ over $\varnothing 1$ is a **contradiction**, because the inner frame must always be the tighter. **A tolerance the shop can measure and the metrology cannot interpret.** A profile of a surface on a free-form blade with a $0.2$ tolerance and no datum, checked on a CMM by best-fit, is a part whose pass/fail depends on the **alignment algorithm** and not on the blade.
:::

## The grammar

::: definition The fourteen characteristics {#def-char}
$$
\begin{array}{l l l l}
\text{Class} & \text{Symbol} & \text{Characteristic} & \text{Zone} \\
\text{Form} & - & \text{straightness} & \text{two parallel lines or a cylinder} \\
& \square & \text{flatness} & \text{two parallel planes} \\
& \bigcirc & \text{circularity (roundness)} & \text{two concentric circles in each section} \\
& \text{\raisebox{-0.4ex}{$\smile$}} & \text{cylindricity} & \text{two coaxial cylinders} \\
\text{Orientation} & \perp & \text{perpendicularity} & \text{two parallel planes, or a cylinder, at } 90\ {}^{\circ}\ \text{to a datum} \\
& \angle & \text{angularity} & \text{as above, at a stated angle} \\
& \parallel & \text{parallelism} & \text{two parallel planes to a datum} \\
& \text{\raisebox{-0.4ex}{$\bigcirc\!\!\!-$}} & \text{profile of a line} & \text{two circles of } t \text{ along the profile} \\
\text{Location} & \boxed{\text{\raisebox{-0.4ex}{$\oplus$}}} & \text{position} & \text{a cylinder, or two planes, about true position} \\
& \triangleright & \text{concentricity} & \text{a cylinder about a datum axis} \\
& \odot & \text{symmetry} & \text{two planes about a datum centre plane} \\
\text{Profile} & \smile & \text{profile of a surface} & \text{two envelopes of the true surface} \\
\text{Runout} & \nearrow & \text{circular runout} & \text{a circle in one section, about a datum axis} \\
& \text{\raisebox{-0.4ex}{$\nearrow\!\!\nearrow$}} & \text{total runout} & \text{two parallel planes over the whole surface}
\end{array}
$$
**The four classes and what each needs.** **Form** tolerances need **no datum** — flatness, straightness, circularity and cylindricity are statements about a feature alone. **Orientation, location, profile and runout all need at least one datum**, and a frame that omits one is not a loose tolerance but a **missing sentence**.
**The zone shape is the whole point.** A position tolerance of $\varnothing 0.1$ is a **cylinder** of diameter $0.1$; the same tolerance written without the $\varnothing$ is a zone between two **planes** $0.1$ apart, and the two are not comparable: the cylinder's area is $\pi \times 0.05^{2} = 7.85 \times 10^{- 3}\ \mathrm{mm^{2}}$ and the slab's is $0.1 \times \infty$, and in the **restricted** direction the slab is $0.1$ wide and the cylinder $0.1$ across, but the cylinder is $0.1$ across **every** direction and the slab is $0.1$ across one and unlimited along the other.
:::

::: definition The feature-control frame {#def-frame}
$$
\boxed{\begin{array}{c|c|c|c|c}
\perp & 0.05 & \boxed{\mathrm{M}} & A & \boxed{\mathrm{M}} \\
\text{characteristic} & \text{tolerance zone} & \text{zone modifier} & \text{primary datum} & \text{datum modifier}
\end{array}}
$$
**The five compartments and the three modifiers.**
$$
\begin{array}{l l l}
\boxed{\mathrm{M}} & \text{maximum material condition} & \text{the stated tolerance applies at MMC; bonus is available} \\
\boxed{\mathrm{L}} & \text{least material condition} & \text{the tolerance applies at LMC; used for a wall, never for a clearance} \\
\boxed{\mathrm{P}} & \text{projected tolerance zone} & \text{the zone is a cylinder of height } h \text{ above the face} \\
\text{ST} & \text{statistical tolerance} & \text{the tolerance is achieved statistically, not by the machine} \\
\text{CF} & \text{continuous feature} & \text{the surface is one milled surface and not two features}
\end{array}
$$
**The projected zone, which is the most-used and least-understood.** A bolt through a $\phi 9$ clearance hole in a $12\ \mathrm{mm}$ plate, with a $20\ \mathrm{mm}$-thick bracket behind it, needs its axis controlled **over the $20\ \mathrm{mm}$**, not over the $12$. Without $\boxed{\mathrm{P}}$ the $\varnothing 0.5$ zone is $12\ \mathrm{mm}$ tall and a hole that is **straight through the plate** and $2^{\circ}$ off in the bracket passes. With $\boxed{\mathrm{P}\, 20}$ the zone is a $\varnothing 0.5$ cylinder $20\ \mathrm{mm}$ tall above the plate's face, and the drawing means what it says.
**The projected zone's cost.** A $\varnothing 0.5$ zone over $12\ \mathrm{mm}$ allows an angular error of $0.5 / 12 = 42\ \mathrm{mrad} = 2.4^{\circ}$; over $20\ \mathrm{mm}$ it allows $1.43^{\circ}$. **The projected zone is a $40\ \%$ tightening of the angular tolerance and costs nothing on the drawing.**
:::

::: definition The datum reference frame {#def-drf}
**The 3-2-1 rule.** A rigid body has six degrees of freedom and a datum reference frame constrains them in a fixed order:
$$
\begin{array}{l c l l}
A & 3 & \text{one translation, two rotations} & \text{the largest, flattest, most functional surface} \\
B & 2 & \text{one translation, one rotation} & \text{the second-most functional, at } 90\ {}^{\circ}\ \text{to } A \\
C & 1 & \text{one translation} & \text{the third, at } 90\ {}^{\circ}\ \text{to both} \\
\hline
& 6 & \text{total} &
\end{array}
$$
**The degrees of freedom, in the order they are killed.**
$$
\begin{array}{l c c c}
& A\ (\text{plane}) & B\ (\text{plane}) & C\ (\text{plane}) \\
\text{translate } x & & & \bullet \\
\text{translate } y & & \bullet & \\
\text{translate } z & \bullet & & \\
\text{rotate about } x & \bullet & \bullet & \\
\text{rotate about } y & \bullet & & \\
\text{rotate about } z & & \bullet &
\end{array}
$$
**The three rules of datum selection.** **The datum is the surface the part **locates on in service**.** A bearing housing locates on its mounting feet, so the feet are $A$; a shaft locates on its two journals, so the two journals **together** are datum $A$ (a **common datum**, written $\boxed{A \mid B}$ or $\boxed{AB}$). **The datum features are ordered by how much they constrain.** **A datum feature of size gets a size lock** — the $\boxed{\mathrm{M}}$ or $\boxed{\mathrm{L}}$ or $\boxed{\mathrm{S}}$ on the datum letter — which says whether the datum axis is the **actual** axis or the axis of a **perfect features-of-size boundary**.
**The number that decides a datum.** A $120 \times 80$ plate located by a $\phi 10$ pin and a $\phi 10$ slot: the pin is datum $B$ and the slot datum $C$, and the drawing must say which, because reversing them changes the plate's angular position by
$$
\Delta\theta = \frac{0.2}{80} = 2.5\ \mathrm{mrad} = 0.14\ {}^{\circ}
$$
for $0.2\ \mathrm{mm}$ of pin clearance — and at a $400\ \mathrm{mm}$ reach that is $1.7\ \mathrm{mm}$.
:::

::: definition Bonus tolerance and the boundary {#def-bonus}
**The rule.** A position tolerance with $\boxed{\mathrm{M}}$ applies at the feature's **maximum-material size**, and the feature may deviate from true position by the tolerance **plus** however far it is from MMC:
$$
t_{\mathrm{actual}} = t_{\mathrm{stated}} + \left( d_{\mathrm{actual}} - d_{\mathrm{MMC}} \right) \quad \text{(internal feature)}
$$
**The evaluation.** A $\phi 10\ \mathrm{H}7$ hole $\left( 0 / + 0.015 \right)$ with a position tolerance of $\varnothing 0.2\ \boxed{\mathrm{M}}$:
$$
\begin{array}{c c c}
\text{Hole size} & \text{Bonus} & \text{Total position tolerance} \\
9.985\ (\text{MMC}) & 0 & \varnothing 0.200 \\
10.000 & 0.015 & \varnothing 0.215 \\
10.015\ (\text{LMC}) & 0.030 & \varnothing 0.230
\end{array}
$$
**The zero-tolerance-at-MMC boundary.** A **rigid** or **floating** boundary is specified by putting the **boundary size** in the tolerance compartment:
$$
\boxed{\begin{array}{c|c|c}\boxed{\oplus} & \phi\, 10.0\ \boxed{\mathrm{M}} & A \end{array}}
\qquad \text{means: the feature's surface must not violate a } \phi 10.0 \text{ cylinder at MMC,}
$$
so a $\phi 9.8$ hole has a $\varnothing 0.2$ position tolerance and a $\phi 9.9$ hole a $\varnothing 0.1$ one, and a hole at $\phi 10.0$ must be **exactly** on position. **This is the only way to guarantee a clearance fit at every size**, and it is the reason a bolted structural joint is toleranced this way and a bearing seat never is.
**The datum shift.** When a **datum feature of size** is referenced at $\boxed{\mathrm{M}}$, the datum's own position tolerance is **bonus-eligible** too, and a tolerance can inherit bonus from a datum it is measured against. The consequence is that a part can be **simultaneously** within its position tolerance and outside it, depending on the size of its datum — which is not a paradox but a **boundary intersection**, and the reason a $\boxed{\mathrm{M}}$ report must state the sizes at which it was measured.
:::

::: widget plot
f: 0.2 + (x - 9.985); 0.2; x
x: 9.98, 10.02
y: 9.9, 10.3
labels: total position tolerance; stated tolerance at MMC; the MMC line
caption: The position tolerance available to a $\phi 10\ \mathrm{H}7$ hole carrying $\varnothing 0.2\ \boxed{\mathrm{M}}$. At the maximum-material size of $9.985$ the available zone is exactly $\varnothing 0.2$; at the least-material size of $10.015$ it is $\varnothing 0.230$. The **bonus** is the horizontal distance between the diagonal and the flat line, and it is free: the hole is **easier to place** the **bigger** it is, because a bigger hole has more clearance and the clearance is what the position tolerance is protecting.
:::

## The arithmetic of position

::: definition The floating and fixed fastener formulas {#def-fastener}
**The floating fastener** — a bolt through two clearance holes — allows each hole to move by the **clearance** and the **pattern** tolerance independently. The positional tolerance $t$ per hole is
$$
\boxed{ t = \frac{T - P}{\sqrt{2}} } , \qquad T = H_{\min} - F_{\max}
$$
where $T$ is the **diametral clearance** between the minimum hole and the maximum fastener and $P$ is the **pattern** tolerance (the tolerance on the hole-to-hole dimensions).
**The evaluation.** An $M 8$ bolt through two $\phi 9$ holes drilled to a pattern tolerance of $\phi 0.5$:
$$
T = 9.0 - 8.0 = 1.0\ \mathrm{mm}, \qquad
t = \frac{1.0 - 0.5}{\sqrt{2}} = 0.354\ \mathrm{mm} .
$$
So each hole may be at $\varnothing 0.35$ from true position and the cover still drops on.
**The fixed fastener** — a bolt threaded into one of the parts — has no clearance in one hole, and the formula becomes
$$
\boxed{ t = \frac{T - \left( P_{1} + P_{2} \right)}{\sqrt{2}} }
$$
where $P_{1}$ and $P_{2}$ are the two patterns' tolerances. **The fixed-fastener joint is the reason a bolted cover with one tapped hole is dimensioned from a datum and not chained.**
**The comparison that decides the design.** The same cover with **four** $M 8$ bolts:
$$
\begin{array}{l c c c}
\text{Arrangement} & T & P & t \\
\text{Four clearance holes, floating} & 1.0 & 0.5 & 0.354 \\
\text{Two tapped, two clearance (fixed)} & 1.0 & 0.5 + 0.5 & 0.00 \Rightarrow \text{infeasible} \\
\text{Two } \phi 9 \text{ dowels, two } \phi 9.2 \text{ clearance} & 1.2\ (\text{clearance hole}) & 0.05\ (\text{dowels locate}) & 0.82
\end{array}
$$
**The last row is the answer.** Two close dowels **absorb the pattern tolerance** and the clearance holes then have $0.82$ of positional tolerance instead of $0.35$ — and the drawing is cheaper to make, not dearer, because the dowels are reamed and the holes are drilled.
:::

::: definition Position tolerance versus coordinate tolerance {#def-posvscoord}
**The translation.** A position tolerance of $\varnothing t$ at MMC is **not** equivalent to $\pm t / 2$ in $x$ and $\pm t / 2$ in $y$; the **inscribed square** is
$$
\pm \frac{t}{2 \sqrt{2}}\ \text{in each axis} \qquad \left( \varnothing 0.4 \Rightarrow \pm 0.141 \text{ and not } \pm 0.200 \right)
$$
and the **circumscribed square** is $\pm t / 2$. So:
$$
\begin{array}{l c c c}
\text{Spec} & \text{Zone} & \text{Area} & \text{Worst radial error} \\
\varnothing 0.4\ \text{position} & \text{circle} & 0.1257 & 0.200 \\
\pm 0.2 / \pm 0.2\ \text{coordinate} & \text{square} & 0.1600 & 0.283 \\
\pm 0.141 / \pm 0.141\ \text{coordinate} & \text{square} & 0.0796 & 0.200
\end{array}
$$
**The two conclusions.** **A $\varnothing 0.4$ position tolerance is $41\ \%$ more area than a $\pm 0.141$ coordinate tolerance at the same worst-case radial error** — the ratio $\pi / 2 = 1.571$ of the circle to its inscribed square, and the whole commercial argument for GD&T in one number. **A $\pm 0.2$ coordinate tolerance permits a radial error of $0.283$ and is therefore $41\ \%$ looser than the $\varnothing 0.4$ position tolerance the drafter thought was equivalent.**
**The bonus multiplier.** With $\boxed{\mathrm{M}}$ and a $0.03$ bonus, a $\varnothing 0.4$ position tolerance becomes $\varnothing 0.43$ and its area becomes $0.145$, which is $15\ \%$ more area for a $7.5\ \%$ increase in diameter — the reason $\boxed{\mathrm{M}}$ is on almost every position tolerance on a production drawing.
:::

::: definition Composite tolerancing {#def-composite}
A **composite** feature-control frame puts two frames in one compartment stack:
$$
\boxed{\begin{array}{c|c|c}
\boxed{\oplus} & \varnothing 1.0 & A \\
\hline
\boxed{\oplus} & \varnothing 0.25 & \left[ A \mid B \mid C \right]
\end{array}}
$$
**The upper frame** is the **pattern-locating** tolerance: it controls the **group** of features relative to the **primary** datum only, and it is the **looser** of the two. **The lower frame** is the **feature-relating** (or **feature-position**) tolerance: it controls **each** feature's position relative to the **whole** datum reference frame, and it is the **tighter**.
**The arithmetic.** A pattern of six holes with an upper $\varnothing 1.0$ to $A$ and a lower $\varnothing 0.25$ to $ABC$:
$$
\begin{array}{l c l}
\text{The pattern's position on the part} & \varnothing 1.0 & \text{the whole pattern may float by } 1.0 \\
\text{Each hole to its true position} & \varnothing 0.25 & \text{and the holes are } 0.25 \text{ to each other} \\
\text{The hole-to-hole tolerance} & \varnothing 0.25 & \text{the lower frame, not the upper}
\end{array}
$$
**The rule.** The lower frame must be **tighter** than the upper, and the upper frame **never** controls the hole-to-hole spacing. **The reason composite tolerancing exists** is that a bolted cover's pattern must be **free to move as a group** (so the cover fits the casting's $\pm 1$) and **tight to itself** (so the bolts go in), and a single frame cannot say both.
:::

::: definition Profile, runout and the practical set {#def-profile}
**Profile of a surface** is the workhorse: one symbol that controls **size, form, orientation and location** of any surface, curved or flat, in one frame.
$$
\boxed{\begin{array}{c|c|c|c}\smile & 0.4 & \pm 0.2\ \text{or } 0.4\,\boxed{\uparrow}\downarrow & A \mid B \mid C\end{array}}
$$
**The unequal disposition.** A $0.4$ profile **centred** on the true surface allows $\pm 0.2$; the same $0.4$ **all inside** (notated $0.4\, /\, 0\, /\, - 0.4$) allows the surface to be **only smaller**, which is the correct call on an **aerofoil** where material outside the envelope is a **clearance** violation and material inside is only a **weight** penalty.
**The three things profile does that nothing else does.** It tolerances a **free-form** surface with one frame. It tolerances a **pattern of holes of different sizes** with one frame. It tolerances a **surface that is not a feature of size** — a vane, a blade, a moulding — to a datum.
**Runout, and why total runout is almost always the right one.**
$$
\begin{array}{l l l}
\text{Circular runout} & \text{one indicator, one section, part rotated} & \text{catches eccentricity, misses straightness} \\
\text{Total runout} & \text{indicator traversed along the surface} & \text{catches eccentricity, straightness, taper, profile}
\end{array}
$$
**The number.** A $\phi 40$ journal $120\ \mathrm{mm}$ long with a circular runout of $0.02$ and a **bend** of $0.05$ at the middle passes circular runout at both ends and **fails** a total runout of $0.02$ by $0.05$. **A rotating part longer than about twice its diameter needs total runout**, and the reason is that a circular runout is a **one-dimensional** measurement of a **three-dimensional** feature.
:::

::: example A bolted cover, toleranced three ways {#ex-cover}
A $200 \times 140 \times 10$ cover is bolted by eight $M 6$ screws through $\phi 6.6$ clearance holes on a $180 \times 120$ pattern to a housing with $M 6$ tapped holes at the same pattern. Give the coordinate and the geometric tolerancing, and the resulting cost.
::: solution
**The function.** The cover must **drop on** without pushing any screw through a hole, and its **gasket face** must be flat and parallel to the housing's within the gasket's compression range.
**Way 1 — coordinate.** Eight holes at $\pm 0.1$ in $x$ and $\pm 0.1$ in $y$ from two datum edges, the tapped pattern at $\pm 0.1$, the face at $\pm 0.1$ flatness "by general tolerance".
$$
T_{\mathrm{clearance}} = 6.6 - 6.0 = 0.6\ \mathrm{mm}, \qquad
P = \sqrt{0.1^{2} + 0.1^{2}} \times 2 = 0.283\ \mathrm{mm}\ \text{(worst-case pattern error per hole)}
$$
$$
\text{available radial play} = \frac{0.6}{2} = 0.30\ \mathrm{mm}, \qquad
\text{required} = 0.283 + 0.283 = 0.566\ \mathrm{mm}
$$
**The cover does not drop on.** The coordinate drawing has spent the entire clearance on the two patterns and has nothing left.
**Way 2 — geometric, single frame.** The cover's holes at $\boxed{\oplus \mid \varnothing 0.2 \mid A \mid B \mid C}$ and the housing's at $\boxed{\oplus \mid \varnothing 0.2 \mid A \mid B \mid C}$.
$$
t = 0.2\ \text{per hole, so the worst-case mismatch is } 0.2 + 0.2 = 0.4\ \text{diametral}, \qquad
T = 0.6\ \mathrm{mm} \ \Rightarrow\ \text{margin } 0.2\ \mathrm{mm}. \checkmark
$$
**Way 3 — geometric, composite, with dowels.** Two $\phi 6\ \mathrm{H}7 / \mathrm{m}6$ **dowel** holes at $\boxed{\oplus \mid \varnothing 0.05 \mid A \mid B \mid C}$ and six $\phi 6.6$ clearance holes at
$$
\boxed{\begin{array}{c|c|c}\boxed{\oplus} & \varnothing 1.0 & A \ \boxed{\oplus} & \varnothing 0.5 & \left[ A \mid B \mid C \right]\end{array}}
$$
**The dowels locate the cover to $0.05$ and the clearance holes are allowed $\varnothing 0.5$ each**, because they no longer locate anything.
**The cost.**
$$
\begin{array}{l c c c}
\text{Way} & \text{Hole tolerance} & \text{Operation} & \text{Relative cost} \\
\text{Coordinate} & \pm 0.1\ (\varnothing 0.283) & \text{jig-bore, both parts} & 2.4 \\
\text{Single frame} & \varnothing 0.2 & \text{CNC drill and ream, both parts} & 1.6 \\
\text{Composite + dowels} & \varnothing 0.5\ \text{on the clearance holes} & \text{CNC drill, ream four dowel holes} & 1.0
\end{array}
$$
**The choice.** **Way 3**, because it moves the accuracy to **four** reamed holes instead of **sixteen** drilled ones, and a reamed hole costs $0.6$ and a jig-bored hole $1.6$.
**The face.** The gasket face gets $\boxed{\square \mid 0.05}$ and $\boxed{\parallel \mid 0.1 \mid A}$ — the flatness for the gasket's compression and the parallelism for the **bolt load uniformity**, because a face that is flat but $0.3$ out of parallel to the bolt axis compresses the gasket unevenly and weeps at the far corner.

*Check.* The floating-fastener formula on Way 3: $T = 6.6 - 6.0 = 0.6$, $P = 0$ for the clearance holes because the dowels set the pattern, so $t = 0.6 / \sqrt{2} = 0.42$ — and the drawing specifies $\varnothing 0.5$, which is $19\ \%$ **looser** than the formula allows. The correct specification is $\varnothing 0.4$, and the $0.1$ difference is the difference between a cover that drops on every time and one that needs a screw pushed through. $\checkmark$

*Sanity.* The reason the dowel version is **cheaper** and not dearer is that accuracy in a hole costs roughly the **square** of the reciprocal of its tolerance, and the dowels let fourteen of the sixteen holes be made at $\varnothing 0.4$ instead of $\varnothing 0.28$.
:::
:::

::: example A shaft with two journals {#ex-shaft}
A ground steel shaft has two $\phi 40\ \mathrm{k}5$ journals $300\ \mathrm{mm}$ apart carrying two bearings, a $\phi 35\ \mathrm{g}6$ seal journal, and a gear seat. Give the geometric tolerancing.
::: solution
**The datum.** The two journals **together** are datum $\boxed{AB}$ — a **common datum axis**, because the shaft rotates in both bearings and neither journal alone defines the axis.
$$
\boxed{\begin{array}{c|c|c}\text{runout} & 0.02 & AB\end{array}} \quad \text{on each journal, and} \quad
\boxed{\begin{array}{c|c|c}\text{total runout} & 0.03 & AB\end{array}} \quad \text{on the seal journal}
$$
**The gear seat.** $\boxed{\begin{array}{c|c|c}\perp & 0.02 & AB\end{array}}$ on its **thrust shoulder**, because the gear's own runout is caused by a shoulder that is not square to the axis, and a shoulder $0.05$ out of square over a $30\ \mathrm{mm}$ shoulder width gives the gear $1.7\ \mathrm{mrad}$ of runout at its pitch circle — enough to ring a gearbox at $3{,}000\ \mathrm{rpm}$.
**The keyway.** $\boxed{\begin{array}{c|c|c}\boxed{\oplus} & \varnothing 0.05 & AB \mid D\end{array}}$ where $D$ is the **width** datum of the keyway's slot, and the keyway's **profile** is $\boxed{\smile \mid 0.05}$ to the seat.
**The three decisions.**
1. **Total runout on the seal journal and circular on the bearings.** The seal runs on the **whole** land and a bend under the lip causes a leak; the bearing's own out-of-roundness is absorbed by its race.
2. **The shoulder's perpendicularity and not the gear seat's position.** The gear is located axially by the shoulder, and its **angular** error is entirely the shoulder's.
3. **No size tolerance on the journals tighter than $\mathrm{k}5$.** The $0.02$ runout does the roundness work, and a $\bigcirc 0.004$ would be redundant with it.
**The measurement.** The shaft is put between centres, an indicator is placed at each journal, and the shaft rotated — which is exactly what the datum says, and the reason the datum is $\boxed{AB}$ and not a single journal.
**The one thing that is always omitted.** The **straightness of the axis between the journals**. A shaft with two perfect journals and a $0.05$ bow in the middle runs its gear $0.05$ off at the pitch line, and the note is $\boxed{- \mid 0.01}$ on the **axis** as a derived median line, which is legal and almost never drawn.

*Sanity.* The $0.02$ total runout on a $\phi 35$ seal journal is $10\ \mu\mathrm{m}$ of radial runout, and a rotary lip seal tolerates about $0.1\ \mathrm{mm}$ of total indicator runout — so $0.03$ is **conservative by a factor of three**, and the reason it is written that way is that the seal's own bore runs on a $\phi 45$ spigot that adds its own runout.
:::
:::

::: example A welded bracket and a datum that does not exist {#ex-weld}
A welded bracket: a $200 \times 120 \times 12$ base plate, a $100$-high $10$-thick web, and a machined $\phi 50\ \mathrm{H}7$ boss on the web. Give the datum structure and the tolerances.
::: solution
**The trap.** The obvious datum $A$ is the base plate's **bottom** face, because it is the biggest surface. The **functional** datum is the base plate's **top** face, because the bracket's **load path** and the mating part both reference the top.
**The datum structure.**
$$
A = \text{the machined top face of the base} \quad (3\ \text{DOF}), \qquad
B = \text{the machined end face} \quad (2\ \text{DOF}), \qquad
C = \text{the machined side face} \quad (1\ \text{DOF})
$$
**The tolerances.**
$$
\begin{array}{l l l}
\text{Base top face} & \square\ 0.1 & \text{the datum itself must be flat or the datum is fiction} \\
\text{Boss bore} & \varnothing 50\ \mathrm{H}7,\ \ \boxed{\oplus}\ \varnothing 0.3\ ABC,\ \perp 0.05\ A & \\
\text{Boss face} & \perp 0.03\ \text{to the bore's datum axis} & \\
\text{Four } \phi 13\ \text{base holes} & \boxed{\begin{array}{c|c|c}\boxed{\oplus} & \varnothing 1.5 & A \mid B \mid C\end{array}}\ \boxed{\mathrm{M}} & \text{a floating } M 12 \text{ in a } \phi 13.5 \text{ clearance} \\
\text{Web's flatness} & \text{no tolerance} & \text{a } 10\text{-thick welded web cannot hold flatness and a note to try is a claim}
\end{array}
$$
**The three notes that make it weldable.** **"MACHINE DATUM $A$ FIRST, IN ONE SETUP, WITH THE BRACKET CLAMPED ON ITS AS-CAST BOTTOM AND STRESSED AS IT WILL BE BOLTED."** A welded bracket clamped free and then machined is **$0.3$ out of flat when the clamps come off**, and the note that says "machine in the bolted condition" is worth more than every tolerance on the drawing. **"STRESS-RELIEVE AFTER WELDING AND BEFORE MACHINING."** **"WELD PER ISO 5817 LEVEL C; NO WELD ON THE MACHINED SURFACE SIDE WITHIN $5\ \mathrm{mm}$ OF DATUM $A$."**
**The floating-fastener check.** $T = 13.5 - 12.0 = 1.5$, $P = 0$ (the pattern is datum-referenced and not chained), so
$$
t = \frac{1.5}{\sqrt{2}} = 1.06\ \mathrm{mm}
$$
and the drawing specifies $\varnothing 1.5$, which is **$41\ \%$ looser than the formula allows**. The correct value is $\varnothing 1.0$, and the $0.5$ is the amount by which the cover will not line up.
**The one tolerance that must not be there.** A **parallelism** on the web to the base. A $10$-thick web welded to a $12$-thick plate moves $1$ to $2\ \mathrm{mm}$ at the top under welding heat, and a $0.5$ parallelism on the web is a **$25\ \%$ scrap rate** on a feature that does no work.

*Design comment.* The general rule is that **a datum is a manufacturing instruction as much as an inspection one**, and on a weldment the datum's **clamping condition** is part of the specification. A drawing that specifies a datum and not a clamping condition has specified a shape and not a part.
:::
:::

::: example A moulded plastic cover {#ex-mould}
An injection-moulded ABS cover, $180 \times 120 \times 3$ wall, with four snap-fits, a $\phi 30$ spigot and a visible Class-A surface. Tolerance it.
::: solution
**The datum.** **Datum $A$** — the **parting line** is not a datum; the datum is the **functional mating face**, which is the spigot's **bearing shoulder**. A moulded part's datum must be a **moulded** feature and never a **trimmed** one, because a trimmed edge varies by $0.3$ and a moulded shoulder by $0.05$.
**The tolerance structure.**
$$
\begin{array}{l l l}
\text{General} & \text{ISO } 20457\ \text{class } \mathrm{m} & \pm 0.3\ \text{on } 100\ \mathrm{mm} \\
\text{Spigot} & \varnothing 30\ {}^{- 0.15}_{- 0.35},\ \boxed{\oplus}\ \varnothing 0.3\ ABC & \text{a moulded core pin, shrinkage } 0.5\ \% \\
\text{Snap fits} & \boxed{\smile}\ 0.25\ ABC\ \text{all around the catch} & \text{profile, because the arm deflects} \\
\text{Class-A surface} & \boxed{\smile}\ 0.3\ \text{to the CAD surface, no datum} & \text{Class A is checked by a gauge, not a CMM} \\
\text{Wall} & 3\ {}^{+ 0.2}_{- 0.2}\ \text{nominal, with a note} & \text{the wall is the mould's, not the drawing's}
\end{array}
$$
**The four notes that are the drawing.**
$$
\begin{array}{l l}
\text{Shrinkage} & \text{nominal shrinkage } 0.5\ \%\ \text{allowance applied to the tool; the drawing is at the dry-as-moulded condition} \\
\text{Condition} & \text{dimensions apply at } 23\ {}^{\circ}\mathrm{C},\ 50\ \%\ \text{RH, } 24\ \mathrm{h}\ \text{after moulding} \\
\text{Warpage} & \text{total warp of the } A \text{ face } 0.8\ \text{max over } 180,\ \text{checked on a surface plate with no clamp} \\
\text{Gate and ejector} & \text{gate and ejector-pin locations per the tool drawing; no mark on the Class-A surface}
\end{array}
$$
**The three things unique to a moulding.** **The tolerance applies at a stated temperature and humidity**, because nylon-66 absorbs $2.5\ \%$ water and grows $0.4\ \%$ — $0.7\ \mathrm{mm}$ on $180$ — which is more than every tolerance on the drawing. **The warpage is a separate tolerance from the profile**, because a part can be within a $0.3$ profile **to a best-fit surface** and be $1.5$ out of flat, and a best-fit alignment **hides** a warp. **The Class-A surface is toleranced to the CAD surface and not to a datum**, because its job is optical and an optical surface's enemy is a **low-frequency wave** that a datum-referenced profile measures as nothing.
**The one thing that must not be drawn.** A **flatness** on the Class-A face. A Class-A surface is **allowed to be curved** — that is its purpose — and a flatness note on it is a note that says the drafter has not seen the styling.

*Sanity.* The $0.5\ \%$ shrinkage on $180\ \mathrm{mm}$ is $0.9\ \mathrm{mm}$, and the shrinkage **variation** from a $\pm 15\ {}^{\circ}\mathrm{C}$ melt-temperature change is $\pm 0.15\ \%$, which is $\pm 0.27\ \mathrm{mm}$ — **the same order as the general tolerance**. This is why a moulded part's general tolerance is $\pm 0.3$ and never $\pm 0.1$, and why a moulding drawing that specifies $\pm 0.1$ is a drawing that will be signed off on samples and failed in production.
:::
:::

::: history
The **geometric** idea begins with **Charles Le Maistre Taylor**'s 1905 address and with the **1916 British Munitions Supply Board** report, but the modern system is the work of **Stanley H. Parker** and **James E. Fessler** at **Bendix Aviation**, whose 1957 SAE paper "A New System for Dimensioning and Tolerancing for Interchange" proposed **true-position tolerancing with a cylindrical zone and a maximum-material bonus**, and whose 1958 SAE paper "New System Simplifies Gaging, Inspection" made the case in the language of cost. Parker had been a **Gaige** protégé at **Ford** in the 1930s and had run the **Bendix** gauge department during the Second World War, and the system's **datum** concept is a direct descendant of the **Ford** "master gauge" practice of the 1920s. The **ANSI Y14.5** standard was first issued in **1962** as a **Mil** standard, adopted by **ASME** in **1971**, and rewritten in **1982**, **1994**, **2009** and **2018**; the **1994** revision's introduction of **composite tolerancing** and the **2009** revision's **datum shift** and **profile** clarifications are the two changes that mattered. The **ISO** took a parallel and deliberately more conservative path: **ISO R1101** of **1969** and its **ISO 1101** descendants define the same fourteen characteristics but **do not** recognise the maximum-material **bonus** on a position tolerance until **ISO 2768** and the **ISO/TC 211** work of the 1990s, and the **ISO** and **ASME** readings of the same symbol still differ on **profile with a datum at $\boxed{\mathrm{M}}$** and on **the simultaneous application of size and geometry** — which is why an international drawing must state **"PER ASME Y14.5-2018"** or **"PER ISO 1101:2017"** and not "per GD&T". The **floating and fixed fastener formulas** are in the **1982** Y14.5 appendix and were derived by **John W. Dally** in his 1969 **Society of Automotive Engineers** paper on tolerance analysis for bolted assemblies.
:::

## Where this leads

Geometric tolerancing extends the numbers of [[engineering-graphics/dimensioning]] and the fits of [[engineering-graphics/tolerances-fits]] from size to shape; its datums are the **setup** of [[manufacturing/machining]], its stacks are the statistics of [[design-process/design-for-manufacture]], and its gauging is the subject of [[manufacturing/metrology-quality]].

::: summary
- A size tolerance cannot control shape; a $\pm$ drawing tolerances size tightly to protect geometry and pays three times.
- The tolerance zone is a volume in space, and $\varnothing 0.1$ is a cylinder while $0.1$ is a slab — the symbol is the meaning.
- A datum reference frame kills six degrees of freedom in the order 3-2-1, and the order is the assembly sequence.
- A maximum-material modifier gives bonus tolerance, and a zero-tolerance-at-MMC boundary is the only way to guarantee a clearance at every size.
- A $\varnothing 0.4$ position tolerance gives $57\ \%$ more zone area than the inscribed $\pm 0.141$ coordinate square, and $41\ \%$ less than the circumscribed $\pm 0.2$ one.
- A projected zone controls a bolt's axis over the thickness of the part behind it; a total runout controls a long shaft and a circular runout does not.
- On a weldment the datum's clamping condition is part of the specification, and on a moulding its temperature and humidity are.
:::

::: quiz
A hole pattern is toleranced $\boxed{\oplus}\ \varnothing 0.25$ to $ABC$ by coordinate dimensions $\pm 0.2$ in each axis. How does the geometric zone compare with the coordinate zone at the same worst-case radial error?
- [ ] They are identical
- [x] The circular zone gives $57\ \%$ more area than the inscribed square
- [ ] The circular zone gives $41\ \%$ less area
- [ ] The coordinate zone is always larger
::: solution
The circular zone of diameter $t$ has area $\pi t^{2} / 4$; the square that fits inside it has side $t / \sqrt{2}$ and area $t^{2} / 2$, so the circle is $\pi / 2 = 1.57$ times larger — $57\ \%$ more tolerance area for exactly the same worst-case radial error of $t / 2$. The $\pm 0.2$ coordinate square the drafter replaced has a diagonal of $0.566$ and therefore permits a radial error of $0.283$ against the $\varnothing 0.4$ circle's $0.200$: the coordinate drawing was $41\ \%$ looser than the drafter believed.
:::
:::

## Exercises

::: exercise Form {level=1 check="0"}
How many datums does a flatness tolerance require?
::: solution
None — flatness is a form tolerance and refers to the feature alone.
:::
:::

::: exercise Degrees of freedom {level=1 check="3"}
How many degrees of freedom does a primary datum plane constrain?
::: solution
Three — one translation and two rotations.
:::
:::

::: exercise Zone area {level=1 check="1.57"}
Give the ratio of the area of a $\varnothing t$ circular position zone to that of its inscribed square.
::: solution
$\pi / 2 = 1.57$.
:::
:::

::: exercise Bonus {level=1 check="0.06"}
A $\phi 12 \pm 0.03$ shaft carries $\boxed{\oplus} \varnothing 0.2\ \boxed{\mathrm{M}}$. Give the bonus tolerance available in millimetres at the least-material size.
::: solution
The shaft's maximum-material size is $12.03$ and its least-material size is $11.97$, so at LMC the bonus is $12.03 - 11.97 = 0.06\ \mathrm{mm}$ and the total available position tolerance is $\varnothing 0.26$.
:::
:::

::: exercise Runout {level=1 check="0.03"}
A $\phi 40$ journal $120\ \mathrm{mm}$ long carries a total runout of $0.03$. Give the maximum permitted bend in millimetres.
::: solution
$0.03\ \mathrm{mm}$ — total runout over the whole surface bounds the bend directly.
:::
:::

::: exercise Floating fastener {level=2}
An $M 10$ bolt passes through two $\phi 11$ clearance holes whose pattern is toleranced at $\phi 0.4$ each. Give the positional tolerance available per hole.
::: solution
$$
T = 11.0 - 10.0 = 1.0\ \mathrm{mm}, \qquad
t = \frac{T - P}{\sqrt{2}} = \frac{1.0 - 0.4}{1.414} = 0.424\ \mathrm{mm} .
$$
*Sanity.* The $\sqrt{2}$ is because the two holes' errors add as the **diagonal** of a square, and a drafter who omits it specifies a tolerance $41\ \%$ too loose — which is exactly the amount by which the cover will not drop on.
:::
:::

::: exercise Projected zone {level=2}
A bolt passes through a $15$-thick plate and threads into a bracket $25\ \mathrm{mm}$ deep behind it. A $\varnothing 0.4$ position tolerance without a projected zone allows how much angular error, and with $\boxed{\mathrm{P}\, 25}$ how much?
::: solution
$$
\theta_{\text{no P}} = \frac{0.4}{15} = 26.7\ \mathrm{mrad} = 1.53\ {}^{\circ}, \qquad
\theta_{\text{with P}} = \frac{0.4}{25} = 16.0\ \mathrm{mrad} = 0.92\ {}^{\circ} .
$$
*Sanity.* The projected zone is a **$38\ \%$ tightening** of the angular tolerance and costs nothing on the drawing — which is why it is used on every bolt that threads into something behind a clearance hole, and why a drafter who omits it has specified a bolt that can be $1.5^{\circ}$ out and still pass.
:::
:::

::: exercise Derivation {level=3}
Derive the floating-fastener formula $t = \left( T - P \right) / \sqrt{2}$ from the geometry of two clearance holes and a bolt.
::: solution
**The condition for assembly.** The bolt's axis must lie inside the **intersection** of the two holes' clearance cylinders. In the worst case the two holes are displaced in **opposite** directions by their positional tolerance $e$ each, and the bolt's diameter $F$ must pass through both.
**The one-hole condition.** A hole of diameter $H$ whose axis is displaced by $e$ from the bolt's axis passes a bolt of diameter $F$ if
$$
F \le H - 2 e .
$$
**Two holes.** With the two holes displaced by $e_1$ and $e_2$ in opposite directions, the **relative** displacement is $e_1 + e_2$, and the bolt must pass a **single equivalent hole** of diameter $H$ displaced by $e_1 + e_2$:
$$
F \le H - 2 \left( e_1 + e_2 \right) \quad \Rightarrow \quad e_1 + e_2 \le \frac{H - F}{2} = \frac{T}{2} .
$$
**The pattern tolerance.** The two holes' **pattern** is itself toleranced: the drawing's hole-to-hole dimension has a tolerance $P$, so the **actual** displacement of each hole from its **true** position includes a pattern component of $P / 2$ in the worst case, and the **positional** tolerance $t$ is what is **left**:
$$
e = \frac{P}{2} + e_{\mathrm{pos}} .
$$
**The combination.** The pattern error and the positional error are **independent** and combine as the **diagonal**, because the pattern tolerance is a **square** zone and the positional tolerance a **circular** one:
$$
e_{\mathrm{total}} = \sqrt{ \left( \frac{P}{2} \right)^{2} + t^{2} } \quad \text{(per hole)} .
$$
Setting the two-hole sum to $T / 2$ with $e_1 = e_2$:
$$
2 \sqrt{ \left( \frac{P}{2} \right)^{2} + t^{2} } \ \text{is not the usual form; the standard treats the pattern as a} \quad \text{diametral} \quad \text{quantity, giving}
$$
$$
P + 2 t \le T \quad \Rightarrow \quad t \le \frac{T - P}{2} \quad \text{(worst case, aligned)} .
$$
**The $\sqrt{2}$.** The standard's $\sqrt{2}$ arises because the **positional tolerance $t$ is a diametral zone** $\varnothing t$ and the **pattern tolerance $P$ is a square** of side $P$, and the **worst-case radial** error of the pattern is $P / \sqrt{2}$ and not $P / 2$:
$$
\boxed{ t = \frac{T - P}{\sqrt{2}} } \qquad \text{with } P \text{ interpreted as the square zone's side.}
$$
**Evaluation.** $T = 1.0$, $P = 0.5$: $t = 0.5 / 1.414 = 0.354\ \mathrm{mm}$.
*Sanity.* The formula's **assumption** is that the bolt is a **rigid cylinder** and the holes **coaxial-perfect**; it does **not** account for the holes' **perpendicularity**, which is why a floating-fastener joint with a projected zone needs a separate angular check, and why a bolted joint with a thick plate behind it is nearly always given a $\boxed{\mathrm{P}}$.
:::
:::

::: exercise Design {level=3}
Geometrically tolerance a machined aluminium housing for a $40\ \mathrm{mm}$-bore hydraulic pump: a $160 \times 120 \times 90$ body, a $\phi 80\ \mathrm{H}7$ shaft bore, a pilot $\phi 60\ \mathrm{f}7$, four $M 8$ tapped holes and a flat gasket face.
::: solution
**The datum structure.** **Datum $A$** — the **gasket face**, because the pump locates on it and the gasket's compression is measured from it. **Datum $B$** — the **$\phi 60$ pilot bore**, a datum feature of size at $\boxed{\mathrm{M}}$, because the pilot is the **locating** feature and its axis is the pump's axis. **Datum $C$** — one **machined side face**, to kill the last rotation.
$$
\boxed{A \mid B \left[ \mathrm{M} \right] \mid C} \qquad \text{with } A \text{ constraining } z, \theta_x, \theta_y;\ B \text{ constraining } x, y;\ C \text{ constraining } \theta_z
$$
**The tolerances.**
$$
\begin{array}{l l l}
\text{Gasket face } A & \square\ 0.05 & \text{a datum that is not flat is a datum that is fiction} \\
\phi 80\ \mathrm{H}7\ \text{bore} & \boxed{\perp\ 0.03\ A},\ \bigcirc\ 0.008,\ \text{Ra}\ 0.8 & \text{the bore's axis must be square to the mounting face} \\
\phi 60\ \mathrm{f}7\ \text{pilot} & \text{datum } B,\ \perp 0.02\ A,\ \bigcirc\ 0.008 & \text{the pilot is the axis, so it is the tightest thing here} \\
\text{Four } M 8 & \boxed{\begin{array}{c|c|c}\boxed{\oplus} & \varnothing 0.4 & A \mid B \left[ \mathrm{M} \right] \mid C\end{array}}\ \boxed{\mathrm{M}},\ \boxed{\mathrm{P}\ 15} & \text{the projected zone over the } 15\text{-mm flange} \\
\text{Gasket face profile} & \boxed{\smile\ 0.15\ A} & \text{covers the face's waviness and its parallelism in one frame} \\
\text{Bore's depth} & 45\ \pm\ 0.1 & \text{from } A,\ \text{because the pump's shaft penetration is the fit}
\end{array}
$$
**The floating-fastener check.** $T = 9.0 - 8.0 = 1.0$ (the mating part has $\phi 9$ clearance holes), $P = 0$ because the pattern is datum-referenced, so $t = 1.0 / \sqrt{2} = 0.71$ and the drawing specifies $\varnothing 0.4$ — a **$44\ \%$ margin**, which is deliberate, because the projected zone of $15\ \mathrm{mm}$ has already spent the angular budget.
**The four notes.** **"THE $\phi 60$ PILOT AND THE $\phi 80$ BORE ARE MACHINED IN ONE SETUP AND THEIR COMMON AXIS IS THE ASSEMBLY DATUM."** **"THE GASKET FACE IS MACHINED IN THE SAME SETUP AND ITS FLATNESS IS CHECKED UNCLAMPED."** **"NO BURRS ON THE PILOT'S LEADING EDGE; CHAMFER $0.5 \times 45\ {}^{\circ}$."** **"PROVE EACH PASSAGE TO $1.5 \times$ WORKING PRESSURE."**
**The two decisions that are unique to this part.** **The pilot is datum $B$ and not the bolt pattern**, because a pump locates on its pilot and the bolts clamp it — and a drawing that makes the bolt pattern the datum has made the **clamp** the **locator**, which is how a pump's shaft seizes. **The $\boxed{\mathrm{M}}$ on the datum $B$**, because the pilot is a **clearance** fit ($\mathrm{f}7$) and the pump **rattles** on it by up to $0.074$; the $\boxed{\mathrm{M}}$ says the datum axis is the **axis of the pilot at its maximum-material size**, which is what the **assembled** pump's axis actually is, and without it the tapped holes' position tolerance would be measured against a datum that moves.
**The one thing deliberately not toleranced.** The **outside** of the housing. It is a die-cast or a sawn block, it clears nothing, and a tolerance on it invites an argument and a cost.

*Design comment.* The general rule is that **the datum precedence of a flanged assembly is the assembly sequence**, and that a hydraulic housing assembles on its **pilot** and is then **clamped** — so the pilot is the higher-precedence datum than the bolt pattern even though the bolts carry the load. A drawing that reverses them is not wrong on paper and is wrong on the bench.
:::
:::
