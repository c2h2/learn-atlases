A sketch is a **contract about geometry** written by hand in under a minute, and it is the only drawing medium that is as fast as thought. Everything downstream — the CAD model, the tolerance stack, the inspection report, the supplier's quote — inherits the geometry that was decided on the pad, and an error made there costs a factor of a hundred for every step it survives.

The reason a pictorial is worth learning at all is arithmetic: a drawing that a reader must decode costs attention, and attention spent on geometry is attention not spent on the design. A **pictorial with the right foreshortening** reads in $0.3$ seconds; an orthographic triple-view reads in $3$ seconds for a simple part and $30$ seconds for a bracket with three oblique faces. The craft is knowing which of the two the reader needs, and how to draw either one so that a **dimension cannot be misread**.

::: warning Seven sketching errors that survive into the drawing
**A pictorial with no datum.** Every dimension must start from something, and a sketch with dimensions hanging in space produces a part that is right in size and wrong in position. **Put the datum on the sketch before the first dimension**, and repeat it in every view. **An isometric drawn with the wrong axis angle.** The isometric axes are $120\ {}^{\circ}$ apart and $30\ {}^{\circ}$ from the horizontal; at $45\ {}^{\circ}$ the drawing is a **cabinet oblique** and every reader who is trained will misjudge the depth by $40\ \%$. **A circle drawn as a freehand oval with the wrong minor-axis direction.** In an isometric the minor axis of a horizontal circle is **vertical**; in a $30\ {}^{\circ}$-axis cabinet oblique it is at $\tan^{- 1} 2 = 63.4\ {}^{\circ}$; and an oval whose minor axis is wrong looks like a mistake even when its shape is right. **A dimension across a hidden edge.** If the reader cannot see the two points, the dimension is a guess. **A dimension that repeats.** Two dimensions that can be computed from the others are not redundant information but **contradictory instructions**, and the machinist will honour the tighter one and silently change the rest. **A tolerance of $\pm 0.1$ on everything.** A blanket tolerance says "I have not thought about which features matter", and it costs $2$ to $4$ times the part price for no functional gain. **A sketch with no surface-finish or process note.** The same geometry costs $\$4$ laser-cut, $\$18$ water-jet, $\$45$ milled from solid and $\$900$ cast in a single piece — and the geometry alone does not say which.
:::

## Lines, weights and the alphabet

::: definition The ISO 128 line types {#def-lines}
A drawing has **six** line types and **two** weights, and the six-by-two grid is the whole vocabulary. The weight ratio must be at least $2 : 1$ — normally $0.7\ \mathrm{mm}$ and $0.35\ \mathrm{mm}$ on an A3, or $0.5$ and $0.25$ on an A4 — and the reason for the ratio is that a photocopy, a scan and a PDF at $150\ \mathrm{dpi}$ all compress the toner spread, and a $1.5 : 1$ ratio prints as one weight.
$$
\begin{array}{l c l l l}
\text{Type} & \text{Weight} & \text{Form} & \text{Use} & \text{Typical} \\
\text{A} & \text{thick} & \text{continuous} & \text{visible edges and outlines} & 0.7\ \mathrm{mm} \\
\text{B} & \text{thin} & \text{dashed} & \text{hidden edges} & 0.35 \\
\text{C} & \text{thin} & \text{continuous} & \text{section lines, auxiliary, break} & 0.35 \\
\text{D} & \text{thin} & \text{long dash-dot} & \text{centres, axes, pitch} & 0.35 \\
\text{E} & \text{thin} & \text{long-short-long} & \text{adjacent-part, prior form} & 0.35 \\
\text{F} & \text{thin} & \text{zig-zag / freehand} & \text{short break} & 0.35 \\
\text{G} & \text{thin} & \text{continuous, wavy} & \text{long break} & 0.35
\end{array}
$$
**The four rules that make a drawing readable.** **A hidden line never touches a visible line** — it stops $1$ to $2\ \mathrm{mm}$ short, because a junction of two line types reads as one line. **A centre line crosses at a dash and not a gap**, and extends $3$ to $5\ \mathrm{mm}$ beyond the feature. **A hidden line is omitted when a section shows the same feature** — the two together are noise. **A visible line always beats a hidden line**, which is why a view is chosen so that the most features are visible and the drafter who draws five hidden lines in a view has chosen the wrong view.
:::

::: definition Sketching mechanics {#def-sketch-mech}
**Draw with the arm and not the wrist.** A $150\ \mathrm{mm}$ line drawn from the wrist is a curve; drawn with the elbow locked and the shoulder moving it is straight to within a millimetre. The test is to draw five parallel lines at $10\ \mathrm{mm}$ spacing without a guide: if the spacing wanders by more than $2\ \mathrm{mm}$ the motion is coming from the wrong joint.
**Draw the whole of one direction before turning the paper.** All the horizontals, then all the verticals, then all the $30\ {}^{\circ}$ lines. Turning the paper $90\ {}^{\circ}$ is legitimate; drawing a vertical downward with the wrist is not.
**Construction lines first, dark lines last.** Lay out the overall envelope in light strokes, place every feature, then go over the final outline. A sketch drawn dark from the first stroke has no way to correct itself.
**Freehand circles and ellipses.** A circle is drawn as a **square, then an octagon, then the curve**, in one continuous rotation of the paper. An isometric ellipse is drawn from the **four-centre construction**: inscribe the ellipse in the isometric rhombus, find the two acute corners, swing arcs from them to the midpoints of the opposite sides, and fill the two small arcs from the obtuse corners.
**The four-centre ellipse's error.** The construction gives a curve that is not an ellipse; its maximum radial error is $0.6\ \%$ of the major axis, which at a $60\ \mathrm{mm}$ circle is $0.36\ \mathrm{mm}$ — invisible at sketch scale and the reason the construction has survived two centuries.
:::

## Pictorial projection and its arithmetic

::: definition What a pictorial really is {#def-pictorial}
Every pictorial is a **linear map** from $\mathbb{R}^{3}$ to the drawing plane, and its whole character is fixed by three numbers: the **angle** at which each coordinate axis lands on the paper and the **scale** by which it is drawn. Those six numbers — three angles and three axial scales, of which only five are independent — are called the **foreshortening** of the projection, and the table below is nothing but a list of them.
$$
\begin{array}{l c c c l}
\text{Pictorial} & \text{Axis angles} & \text{Axial scales} & \text{View direction} & \text{Use} \\
\text{Isometric (true)} & 120\ {}^{\circ},\ 120\ {}^{\circ},\ 120\ {}^{\circ} & 0.816,\ 0.816,\ 0.816 & (1,1,1) & \text{exact, rarely used} \\
\text{Isometric (drawing)} & 120\ {}^{\circ},\ 120\ {}^{\circ},\ 120\ {}^{\circ} & 1,\ 1,\ 1 & (1,1,1) & \text{the standard} \\
\text{Dimetric} & 7\ {}^{\circ}\ 18\ {}^{\prime},\ 41\ {}^{\circ}\ 25\ {}^{\prime} & 0.94,\ 0.35,\ 0.94 & \text{two equal} & \text{technical manuals} \\
\text{Trimetric} & \text{three unequal} & \text{three unequal} & \text{general} & \text{patent drawings} \\
\text{Cavalier oblique} & 45\ {}^{\circ}\ \text{receding} & 1,\ 1,\ 1 & 45\ {}^{\circ}\ \text{to plane} & \text{circles in one plane} \\
\text{Cabinet oblique} & 45\ {}^{\circ}\ \text{receding} & 1,\ 1,\ 0.5 & 63.4\ {}^{\circ}\ \text{to plane} & \text{the natural-looking oblique} \\
\text{One-point perspective} & \text{converging} & \text{distance-dependent} & \text{finite eye} & \text{interiors, corridors} \\
\text{Two-point perspective} & \text{converging} & \text{distance-dependent} & \text{finite eye, corner-on} & \text{exterior, architectural}
\end{array}
$$
**The isometric's $18\ \%$.** Projecting along $(1,1,1) / \sqrt{3}$, a unit coordinate axis loses its component along the view direction and its projected length is
$$
\sqrt{1 - \left( \tfrac{1}{\sqrt{3}} \right)^{2}} = \sqrt{\tfrac{2}{3}} = 0.8165 .
$$
A **true** isometric therefore draws every axis $18.3\ \%$ short. The **isometric drawing** — the one every textbook and every CAD package uses — sets the scale to $1$ and is $1 / 0.8165 = 1.225$, or $22.5\ \%$, **larger than the true projection**. It is not an error: it is a different, and more convenient, convention, and it preserves all angles and all ratios along the axes.
**The $120\ {}^{\circ}$ and the $30\ {}^{\circ}$.** With the view direction along $(1,1,1)$, the projected $x$-axis is $\left( 2, - 1, - 1 \right) / 3$ and the projected $y$-axis is $\left( - 1, 2, - 1 \right) / 3$; their dot product is $- 1 / 3$ against a squared length of $2 / 3$, so
$$
\cos \theta = \frac{- 1 / 3}{2 / 3} = - \frac{1}{2} \ \Rightarrow\ \boxed{ \theta = 120\ {}^{\circ}} ,
$$
and by symmetry each makes $30\ {}^{\circ}$ with the horizontal. **This is the number to draw freehand: a $30\ {}^{\circ}$ line is a $1 : 2$ rise over run, and a $120\ {}^{\circ}$ pair of axes is a $Y$ with equal arms.**
:::

::: definition Circles in pictorial: the ellipse you must get right {#def-ellipse}
A circle projects to an ellipse whose **semi-minor axis is $r \left| \boldsymbol{v} \cdot \boldsymbol{n} \right|$**, where $\boldsymbol{v}$ is the unit view direction and $\boldsymbol{n}$ the circle's unit normal, and whose **semi-major axis is always $r$**.
$$
\begin{array}{l c c c l}
\text{Pictorial} & \boldsymbol{v} & \text{Circle's plane} & b / a & \text{Minor-axis direction} \\
\text{Isometric} & (1,1,1) / \sqrt{3} & \text{horizontal } (\mathrm{XY}) & 0.577 & \text{vertical} \\
\text{Isometric} & (1,1,1) / \sqrt{3} & \text{frontal } (\mathrm{XZ}) & 0.577 & 30\ {}^{\circ}\ \text{from vertical} \\
\text{Cavalier oblique} & (0.707, 0, 0.707) & \text{frontal } (\mathrm{YZ}) & 1.000 & \text{a true circle} \\
\text{Cavalier oblique} & (0.707, 0, 0.707) & \text{profile } (\mathrm{XZ}) & 0.414 & \text{along the receding axis} \\
\text{Cabinet oblique} & (0.577, 0, 0.816) & \text{profile } (\mathrm{XZ}) & 0.500 & \text{along the receding axis} \\
\text{Dimetric} & (1,- 1,1) / \sqrt{3} & \text{top } (\mathrm{XY}) & 0.943 & \text{near-circular}
\end{array}
$$
**The three consequences.** **An isometric circle is never a true circle** — every hole, boss and fillet in an isometric is an ellipse of ratio $0.577$, and a sketcher who draws a freehand circle in an isometric has drawn something no reader can dimension. **A cavalier oblique keeps the frontal circle true**, which is exactly why the cavalier is the right pictorial for a flange, a gear or a plate with holes, and the wrong one for a long slender shaft. **A cabinet oblique gives a $1 : 2$ ellipse**, the same ratio as a $60\ {}^{\circ}$-rotated isometric ellipse, and it is the reason the cabinet looks "nearly right" for a box with a round end.
:::

::: widget plot
f: 0.8165; 1.0; 0.94; 0.35; 0.5; 0.577; 0.414; 0.943
x: 1, 8
labels: isometric true axial scale; isometric drawing scale; dimetric long axis; dimetric short axis; cabinet receding; isometric circle b/a; cavalier profile b/a; dimetric top b/a
caption: The eight numbers a pictorial is made of, all as a fraction of true length. The isometric drawing's $1.0$ against the true projection's $0.8165$ is the $22.5\ \%$ size difference between the convention and the geometry; the dimetric's $0.94$ and $0.35$ are why a dimetric looks "flatter" than an isometric; and the three circle ratios — $0.577$, $0.414$ and $0.500$ — are the minor-to-major axes a sketcher must reproduce freehand.
:::

::: definition Perspective: the finite eye {#def-perspective}
A perspective has a **station point** (the eye), a **picture plane** at a distance $d_p$, a **horizon** at the eye height $h_e$, and one vanishing point per family of parallel lines. A point at a real height $y$ above the eye and a distance $x$ in front projects onto the picture plane at
$$
y^{\prime} = \frac{y\, d_p}{x} ,
$$
and the whole of perspective is this one similar-triangles ratio.
**The corridor.** A corridor $2.4\ \mathrm{m}$ high, $1.5\ \mathrm{m}$ wide, $8\ \mathrm{m}$ long, drawn with the eye at $1.6\ \mathrm{m}$ and a picture plane at $d_p = 0.5\ \mathrm{m}$:
$$
\begin{array}{l c c c}
\text{Distance down the corridor} & 1\ \mathrm{m} & 4\ \mathrm{m} & 8\ \mathrm{m} \\
\text{Projected wall height} & 0.400\ \mathrm{m} & 0.100\ \mathrm{m} & 0.050\ \mathrm{m} \\
\text{Projected width} & 0.188\ \mathrm{m} & 0.047\ \mathrm{m} & 0.023\ \mathrm{m} \\
\text{Height of the ceiling above the horizon} & 0.250\ \mathrm{m} & 0.063\ \mathrm{m} & 0.031\ \mathrm{m} \\
\text{Depth of the floor below the horizon} & 0.400\ \mathrm{m} & 0.100\ \mathrm{m} & 0.050\ \mathrm{m}
\end{array}
$$
**The two facts that make a perspective look right.** **The horizon is at eye height and nowhere else** — a perspective of a room drawn with the horizon at the ceiling height is instantly recognisable as wrong, and it is the commonest error in a sketch by an engineer. **Equal real distances project to geometrically decreasing image distances**, so a corridor's floor tiles crowd as $1 / x$ and a sketch that spaces them evenly is a plan and not a perspective.
**The two-point perspective and the eye circle.** With the box's edge at an angle to the picture plane, the two horizontal vanishing points $V_1$ and $V_2$ lie on the horizon and the **station point subtends a right angle at the two of them**, because the two vanishing directions are the projections of two perpendicular horizontal directions. The construction therefore is: **draw a circle with $V_1 V_2$ as a diameter; the eye is anywhere on it.** The practical consequence is a design rule for the drafter:
$$
\left| V_1 V_2 \right| \le 2 d_p \quad \Longleftrightarrow \quad \text{the eye is real and the distortion is acceptable} ,
$$
and a two-point perspective whose vanishing points are closer than $2 d_p$ **cannot** be viewed from a physically possible station point and looks wrong in a way the viewer cannot name.
:::

::: example The isometric ellipse and the four-centre construction {#ex-ellipse}
Draw a $60\ \mathrm{mm}$ diameter hole in the top face of a block as an isometric ellipse. Give the ellipse's axes, the four-centre radii, and the construction's maximum error.
::: solution
**The axes.** The top face's normal is vertical and the view direction is $(1,1,1) / \sqrt{3}$, so
$$
a = r = 30\ \mathrm{mm}, \qquad b = r \left| \boldsymbol{v} \cdot \boldsymbol{n} \right| = 30 \times \frac{1}{\sqrt{3}} = 17.32\ \mathrm{mm}, \qquad \frac{b}{a} = 0.577 .
$$
The minor axis is **vertical** on the drawing and the major axis is horizontal.
**The construction.** Draw the isometric rhombus whose side is the **projected** square's side. In the true projection a $60\ \mathrm{mm}$ square whose sides lie along the axes projects to $60 \times 0.8165 = 49.0\ \mathrm{mm}$; in the isometric-drawing convention it is drawn at $60\ \mathrm{mm}$ and the whole figure is $22.5\ \%$ larger. Take the convention: rhombus side $s = 60\ \mathrm{mm}$, half-diagonals
$$
p = \tfrac{\sqrt{3}}{2} s = 51.96\ \mathrm{mm}\ \text{(horizontal)}, \qquad q = \tfrac{s}{2} = 30\ \mathrm{mm}\ \text{(vertical)} .
$$
Label the corners $A$ left and $C$ right (the **acute** ones, $60^{\circ}$) and $B$ top and $D$ bottom (the **obtuse** ones, $120^{\circ}$). Bisect the four sides. From the obtuse corner $D$ rule two straight lines to the midpoints of the two sides that meet at $B$; where they cross the long diagonal $AC$ are the two **small-arc centres**. The four centres and radii are then
$$
R_{\text{large}} = 0.707\, s = 42.4\ \mathrm{mm} \quad \text{centred at } B \text{ and } D , \qquad
R_{\text{small}} = 0.236\, s = 14.2\ \mathrm{mm} \quad \text{centred at } \pm 14.2\ \mathrm{mm} \text{ on } AC .
$$
**The error.** The construction is an approximation, and its error is not where a sketcher expects it. Matching the arcs to the rhombus sides at their midpoints leaves the **ends** of the ellipse short:
$$
x_{\mathrm{arc}} = 2 \times 0.236\, s = 0.472\, s \quad \text{against} \quad a = 0.612\, s ,
$$
a shortfall of $5.7\ \%$ of the semi-major axis — $2.5\ \mathrm{mm}$ on a $60\ \mathrm{mm}$ circle — while the **sides** come out $3.5\ \%$ full. The four-centre curve is therefore a slightly **squared** ellipse, which is why a hand-drawn isometric circle reads as "a bit boxy" and why every CAD system draws a true ellipse.
**The freehand answer that is better.** Bisect the rhombus's diagonals and mark **eight** points — the four side midpoints and the four points at $0.92$ of the way out along each half-diagonal — and swing the curve through them. It costs the same three seconds and has no $5.7\ \%$ error.
**The one thing that goes wrong.** The minor axis must be **vertical**. A sketcher who draws the ellipse's minor axis along the rhombus's short diagonal — which is the intuitive choice and is what a compass-and-ruler construction tempts — produces a curve that is $30\ {}^{\circ}$ out of true and reads as a **tilted** hole in a level face.

*Check.* The ellipse must pass through the rhombus's side midpoints, $\left( p / 2,\ q / 2 \right) = \left( 25.98,\ 15.0 \right)$: $\left( 25.98 / 36.74 \right)^{2} + \left( 15.0 / 21.21 \right)^{2} = 0.500 + 0.500 = 1.000$. $\checkmark$
*Sanity.* The ellipse's axes lie between the rhombus's diagonals — $2a = 73.5\ \mathrm{mm}$ against $103.9$ and $60$ — and its minor axis is $1 / \sqrt{3}$ of its major, so an isometric circle inscribed in a rhombus touches the sides at their **midpoints** and never comes near a corner.
*Sanity.* The ellipse's major axis being the rhombus's short diagonal is the fact that makes the construction work and the fact that makes it look wrong at first glance; it is also why an isometric circle inscribed in a rhombus touches the sides at their **midpoints** and not at the corners.
:::
:::

::: example Cavalier or cabinet? {#ex-oblique}
A $180\ \mathrm{mm}$ long, $60\ \mathrm{mm}$ square-section steel bar with a $40\ \mathrm{mm}$ hole through one end is to be sketched as an oblique pictorial. Choose cavalier or cabinet, and give the distortion of the hole and of the bar's apparent length.
::: solution
**The two projections.** With the receding axis at $45\ {}^{\circ}$ and a scale $q$, the projection direction makes an angle $\phi$ with the picture plane's normal given by $\tan \phi = q / 1$ measured in the appropriate sense; the two conventions are
$$
\text{cavalier: } q = 1 \ \Rightarrow\ \text{the receding axis is drawn full length} ; \qquad
\text{cabinet: } q = 0.5 \ \Rightarrow\ \text{half length} .
$$
**The hole.** The hole's axis is along the receding direction, so the circle lies in the **frontal** plane and projects as a **true circle** in both conventions — this is the whole reason to choose an oblique for this part.
**The bar's apparent length.** The bar is $180\ \mathrm{mm}$ along the receding axis, so it is drawn as
$$
L_{\mathrm{cav}} = 180\ \mathrm{mm} \text{ at } 45\ {}^{\circ}, \qquad L_{\mathrm{cab}} = 90\ \mathrm{mm} \text{ at } 45\ {}^{\circ} .
$$
**The distortion of the far end.** A square end face in the receding plane projects to a parallelogram whose ellipse ratio is
$$
\frac{b}{a} = \sqrt{\frac{q^{2} + 1 - \sqrt{\left( q^{2} + 1 \right)^{2} - 4 q^{2} \cos^{2} 45^{\circ}}}{2}} \ \Big/ \ \sqrt{\frac{q^{2} + 1 + \sqrt{\left( q^{2} + 1 \right)^{2} - 4 q^{2} \cos^{2} 45^{\circ}}}{2}} ,
$$
which gives $b / a = 0.414$ for cavalier and $b / a = 0.500$ for cabinet.
**The verdict.** **Cavalier** for this part, because the hole is frontal and true in both, and the cavalier's full-length bar is dimensionable directly along the receding axis. **Cabinet** for a **cube**, because a cavalier cube's $1 : 1 : 1$ receding edge at $45\ {}^{\circ}$ looks like a $1.41$-long bar and the eye reads it as too long; the cabinet's half-scale receding axis is calibrated to the eye's expectation and is the reason the cabinet is the "natural-looking" oblique.
**The number to remember.** A cavalier cube's diagonal face is drawn $\sqrt{2}$ times too wide relative to its height, and a cabinet cube's is drawn $0.707 / 1$ — the cabinet is not "correct", it is **perceptually** correct, and the two are not the same thing.

*Sanity.* The choice between the two is a choice about **which feature must be true**. A flange, a gear, a plate with a bolt circle: cavalier, and every circle is a circle. A housing, a bracket, a machine: cabinet, and the receding features are half-scale and must be dimensioned as such.
:::
:::

::: example A one-point perspective of a doorway {#ex-persp}
A doorway $2.10\ \mathrm{m}$ high and $0.90\ \mathrm{m}$ wide is in a wall $3.0\ \mathrm{m}$ from the observer. The observer's eye is at $1.55\ \mathrm{m}$ and the picture plane is at $0.40\ \mathrm{m}$. Give the projected height and width of the opening and the height of the wall's top edge above the horizon, if the wall is $2.70\ \mathrm{m}$ high.
::: solution
**The projection ratio.** $y^{\prime} = y\, d_p / x$ with $d_p / x = 0.40 / 3.0 = 0.1333$.
**The opening.**
$$
h^{\prime} = 2.10 \times 0.1333 = 0.280\ \mathrm{m}, \qquad
w^{\prime} = 0.90 \times 0.1333 = 0.120\ \mathrm{m}.
$$
**Its position relative to the horizon.** The opening's top is $2.10 - 1.55 = 0.55\ \mathrm{m}$ **above** the eye, so it projects $0.55 \times 0.1333 = 0.0733\ \mathrm{m}$ above the horizon; its bottom is $1.55\ \mathrm{m}$ below the eye and projects $0.2067\ \mathrm{m}$ below. The two sum to $0.280\ \mathrm{m}$ — the projected height. $\checkmark$
**The wall's top.** $2.70 - 1.55 = 1.15\ \mathrm{m}$ above the eye, projecting $0.153\ \mathrm{m}$ above the horizon.
**The convergence of the wall's top edge.** At the wall the top is $0.153\ \mathrm{m}$ above the horizon; at $1.0\ \mathrm{m}$ from the eye it is $1.15 \times 0.40 / 1.0 = 0.460\ \mathrm{m}$ above. The edge therefore falls from $0.460$ to $0.153\ \mathrm{m}$ over the last $2\ \mathrm{m}$ of the drawing and converges on the horizon at the vanishing point, which is on the horizon at the observer's own lateral position.
**The trap.** A sketcher who draws the wall's top edge **parallel to the horizon** has drawn a wall at infinity, and a sketcher who draws the doorway's top and bottom edges parallel has drawn a door that is $3\ \mathrm{m}$ wide at $3\ \mathrm{m}$ and $0.9\ \mathrm{m}$ wide at the wall — which is to say, no door at all. **Every horizontal line that is not parallel to the picture plane must converge to the vanishing point, and every vertical stays vertical in a one-point perspective.**

*Sanity.* The projected height of $280\ \mathrm{mm}$ on a picture plane $400\ \mathrm{mm}$ away subtends $38^{\circ}$ at the eye — the same as the real doorway at $3\ \mathrm{m}$, which is the whole point of a correct perspective and the reason a perspective drawing held at the right distance is indistinguishable from the scene.
:::
:::

::: example Sketching a bracket: the workflow {#ex-workflow}
Sketch a $10\ \mathrm{mm}$-thick, $120\ \mathrm{mm}$-wide, $160\ \mathrm{mm}$-high L-bracket with a $\phi 14$ hole $40\ \mathrm{mm}$ from the base and two $\phi 9$ slots at the top, in a way that cannot be misread.
::: solution
**Step 1 — the envelope, in light construction lines.** A $120 \times 160 \times 10$ box in isometric, drawn at $30\ {}^{\circ}$ axes, occupying $120\ \mathrm{mm}$ of the paper's width. **Do not draw the L yet.**
**Step 2 — the datum.** Mark the **bottom-left-rear** corner as the datum and label it $A$. Every linear dimension will be measured from $A$ or from a face derived from $A$. Draw the datum symbol.
**Step 3 — the features in construction lines.** The $\phi 14$ centre at $40\ \mathrm{mm}$ up and $60\ \mathrm{mm}$ across; the two $\phi 9$ slot centres at $140\ \mathrm{mm}$ up, $30$ and $90\ \mathrm{mm}$ across, with a $25\ \mathrm{mm}$ slot length.
**Step 4 — the cut.** Remove the L's waste with a single straight construction line, then darken the outline.
**Step 5 — the circles.** Three isometric ellipses: $\phi 14$ with $b / a = 0.577$ and a vertical minor axis, and two $\phi 9$ ellipses in the **top** face, whose minor axes are also vertical.
**Step 6 — the darkening.** Type A on the visible outline, Type D on the three axes, Type B on the hidden base edge.
**Step 7 — the dimensions, and only the ones that are needed.**
$$
\begin{array}{l c l}
\text{Overall} & 120,\ 160,\ 10 & \text{three dimensions, from the datum} \\
\text{Hole position} & 40\ \text{and}\ 60 & \text{two, from the datum} \\
\text{Slot position} & 140,\ 30,\ 90 & \text{three; the slot's } 25 \text{ length and } \phi 9 \text{ width} \\
\text{Total} & 10 & \text{dimensions, and no more}
\end{array}
$$
**Step 8 — the notes.** "SCALE $1 : 1$", "BREAK SHARP EDGES $R 0.5$", "SURFACE FINISH $\mathrm{N}12$", "MATERIAL $\mathrm{S}355\text{JR}$, $10\ \mathrm{mm}$ PLATE", "REMOVE ALL BURRS $0.2$", and the **process**: "LASER CUT AND FOLD" or "MACHINED FROM PLATE".
**The three things that must not be dimensioned.** The **$90^{\circ}$ angle** between the legs — it is implied by the two perpendicular overall dimensions and dimensioning it invites a contradiction. The **third slot dimension** — the $90\ \mathrm{mm}$ centre-to-centre distance is $90 - 30 = 60$ and repeating it is a second instruction. The **thickness of the fold** — a folded part's bend allowance is the fabricator's calculation and putting a dimension on the bend radius without a tolerance and a tool note is how a $\phi 1$ inside radius gets quoted and a $\phi 6$ gets made.

*Design comment.* The general rule is that **a sketch is finished when removing any dimension makes it ambiguous and adding any dimension makes it contradictory**. Count the dimensions and count the features; if the two numbers differ by more than the three overall dimensions and the material note, something is redundant.
:::
:::

::: history
Freehand drawing was the **entrance examination** of every engineering school from the **Ecole Polytechnique**'s 1795 requirement onward, and **Gaspard Monge**'s 1795 *Géométrie descriptive* — written for the military engineers and suppressed by the French government for ten years — is the orthographic method every drawing still uses; Monge's **double-plane-of-projection** with its hinged rotation is the reason a first-angle and a third-angle drawing are mirror images. **The isometric** was formalised by **Joseph-François Regnier** and popularised by **Sir John Herschel**'s 1833 paper on isometrical projection, and **August Niclas Thibault**'s 1820s treatise made it a workshop skill; the name is from the Greek *isos metron*, equal measure, for the three equal axial scales. **The four-centre ellipse construction** appears in **Peter Nicholson**'s 1795 *New and Complete Illustrative Explanation of the Rules and Operations of Practical Joinery* and in every treatise since. **Cavalier and cabinet** projection are named from the 18th-century French military-engineering textbooks in which the "cavalier" (a horseman's-eye, full-scale) and "cabinet" (a piece of furniture's-eye, half-scale) conventions were taught side by side. **The ISO 128 line convention** was fixed in 1961 and revised in 1982 and 2013, and the **$2 : 1$ weight ratio** was settled by the reproduction technology of the diazo print — the "blueprint" process of **Anna Atkins**'s 1843 cyanotype and its 19th-century industrial descendants, which lost the distinction of a $1.5 : 1$ ratio in the wash. **The hand-sketching requirement itself** survived the CAD revolution only because of the 1980s and 1990s studies of **design cognition** — notably **Gabriel Goldschmidt**'s 1991 work on the "dialogue with the sketch" and **Temple Grandin**'s and **Rolf Engelsing**'s work on the sketch as a thinking instrument — which established that the hand-drawn line is not a slow CAD but a different cognitive tool, and that a designer who is given a CAD system at the start of a concept phase produces fewer and less varied ideas.
:::

## Where this leads

The pictorial is the communication; the geometry it must carry is fixed by the projection method of [[engineering-graphics/orthographic-projection]], its dimensions by [[engineering-graphics/dimensioning]], and its tolerances by [[engineering-graphics/tolerances-fits]] and [[engineering-graphics/geometric-tolerancing]].

::: summary
- A sketch is a geometry contract: put the datum on it before the first dimension.
- Six line types and two weights at a $2:1$ ratio are the whole vocabulary; a visible line always beats a hidden one.
- Isometric axes are $120\ {}^{\circ}$ apart and $30\ {}^{\circ}$ from the horizontal; the true projection is $18.3\ \%$ short and the drawing convention is $22.5\ \%$ large.
- An isometric circle is an ellipse of ratio $0.577$ with a vertical minor axis; a cavalier keeps the frontal circle true; a cabinet gives $1:2$.
- A perspective's horizon is at eye height, its image heights scale as $1/x$, and its two vanishing points subtend a right angle at the eye.
- A sketch is finished when no dimension can be removed without ambiguity and none can be added without contradiction.
:::

::: quiz
In an isometric sketch of a horizontal circular hole, which way does the ellipse's minor axis point?
- [ ] Along the rhombus's short diagonal
- [x] Vertically on the drawing
- [ ] Horizontally on the drawing
- [ ] At 45 degrees to the horizontal
::: solution
Vertically. The minor axis is the projection of the circle's normal onto the image plane, and for a horizontal circle that normal is vertical: $(0,0,1) - \left(1/\sqrt{3}\right)(1,1,1)/\sqrt{3} = \tfrac{1}{3}(-1,-1,2)$, which in the standard isometric drawing frame points straight up. Choosing the rhombus's short diagonal is the intuitive answer and is wrong — the short diagonal is the direction the circle's normal *appears* to lie along, but the projection tilts it back to vertical.
:::
:::

## Exercises

::: exercise Lines {level=1 check="2"}
What is the minimum weight ratio between a drawing's thick and thin lines?
::: solution
$2 : 1$.
:::
:::

::: exercise Isometric {level=1 check="0.8165"}
Give the true axial foreshortening of an isometric projection.
::: solution
$\sqrt{2 / 3} = 0.8165$.
:::
:::

::: exercise Circle ratio {level=1 check="0.577"}
Give the minor-to-major axis ratio of an isometric circle.
::: solution
$1 / \sqrt{3} = 0.577$.
:::
:::

::: exercise Axes {level=1 check="120"}
Give the angle between any two projected axes in an isometric.
::: solution
$120\ {}^{\circ}$.
:::
:::

::: exercise Cabinet {level=1 check="0.5"}
Give the receding-axis scale of a cabinet oblique.
::: solution
$0.5$ — half true length.
:::
:::

::: exercise The isometric drawing's size {level=2}
By what percentage is a conventional isometric drawing larger than the true isometric projection, and why is this not an error?
::: solution
$$
\frac{1}{0.8165} = 1.225 \ \Rightarrow\ 22.5\ \% .
$$
It is not an error because the convention preserves all three axial scales **equal** and all angles between the axes at $120\ {}^{\circ}$; it simply chooses the axial scale to be $1$ instead of $0.8165$, so a dimension measured along an axis reads the true value. What it does change is the **apparent size** of the object and the **out-of-axis** distances: a hole-to-hole distance that runs diagonally across the axes is drawn $22.5\ \%$ too long.
*Sanity.* This is why a dimension must never be taken off a pictorial drawing, and why the ISO rule "dimensions are taken from the view in which the feature is true shape" exists.
:::
:::

::: exercise Perspective {level=2}
A $2.4\ \mathrm{m}$ high wall is $6\ \mathrm{m}$ from the eye and its top is $0.85\ \mathrm{m}$ above the eye. With a picture plane at $0.35\ \mathrm{m}$, give the projected height of the wall's top above the horizon, and the same at $2\ \mathrm{m}$.
::: solution
$$
y^{\prime}_{6} = \frac{0.85 \times 0.35}{6} = 49.6\ \mathrm{mm}, \qquad
y^{\prime}_{2} = \frac{0.85 \times 0.35}{2} = 148.8\ \mathrm{mm} .
$$
*Sanity.* A $3 : 1$ ratio of distances gives a $3 : 1$ ratio of image heights, and the wall's top edge therefore falls from $149$ to $50\ \mathrm{mm}$ above the horizon over the last $4\ \mathrm{m}$ of the drawing — a slope that crosses the horizon exactly at the vanishing point. A perspective in which this line is drawn level is a perspective of a wall at infinity.
:::
:::

::: exercise Derivation {level=3}
Derive the isometric axis angle and the circle ratio from the view direction $\boldsymbol{v} = (1,1,1) / \sqrt{3}$, and show that the ellipse's major axis equals the true diameter.
::: solution
**The projected axis.** The projection of a vector $\boldsymbol{a}$ along $\boldsymbol{v}$ onto the plane normal to $\boldsymbol{v}$ is $\boldsymbol{a}^{\prime} = \boldsymbol{a} - \left( \boldsymbol{a} \cdot \boldsymbol{v} \right) \boldsymbol{v}$. For $\boldsymbol{a} = (1,0,0)$:
$$
\boldsymbol{a} \cdot \boldsymbol{v} = \frac{1}{\sqrt{3}}, \qquad
\boldsymbol{a}^{\prime} = \left( 1, 0, 0 \right) - \frac{1}{3} \left( 1, 1, 1 \right) = \frac{1}{3} \left( 2, - 1, - 1 \right), \qquad
\left| \boldsymbol{a}^{\prime} \right| = \frac{\sqrt{6}}{3} = 0.8165 .
$$
**The angle.** For $\boldsymbol{b}^{\prime} = \frac{1}{3} \left( - 1, 2, - 1 \right)$,
$$
\boldsymbol{a}^{\prime} \cdot \boldsymbol{b}^{\prime} = \frac{1}{9} \left( - 2 - 2 + 1 \right) = - \frac{1}{3}, \qquad
\cos \theta = \frac{- 1 / 3}{6 / 9} = - \frac{1}{2} \ \Rightarrow\ \theta = 120\ {}^{\circ} . \quad \checkmark
$$
**The circle.** A circle of radius $r$ with unit normal $\boldsymbol{n}$ consists of the points $\boldsymbol{p} = r \left( \cos \phi\, \boldsymbol{e}_1 + \sin \phi\, \boldsymbol{e}_2 \right)$. Its image has
$$
\left| \boldsymbol{p}^{\prime} \right|^{2} = r^{2} - \left( \boldsymbol{p} \cdot \boldsymbol{v} \right)^{2} .
$$
The **maximum** is $r$, attained when $\boldsymbol{p} \perp \boldsymbol{v}$, and such a $\boldsymbol{p}$ exists because the circle's plane contains the direction $\boldsymbol{v} \times \boldsymbol{n}$. **So the semi-major axis is always the true radius.** The **minimum** is obtained by maximising $\left| \boldsymbol{p} \cdot \boldsymbol{v} \right|$, which for $\boldsymbol{p}$ confined to the circle's plane is $r \left| \boldsymbol{v} - \left( \boldsymbol{v} \cdot \boldsymbol{n} \right) \boldsymbol{n} \right| = r \sin \psi$ where $\psi$ is the angle between $\boldsymbol{v}$ and $\boldsymbol{n}$. Hence
$$
b = \sqrt{r^{2} - r^{2} \sin^{2} \psi} = r \left| \cos \psi \right| = r \left| \boldsymbol{v} \cdot \boldsymbol{n} \right| .
$$
For the isometric, $\boldsymbol{v} \cdot \boldsymbol{n} = 1 / \sqrt{3}$ for any coordinate-plane circle, giving $b / a = 0.577$. $\checkmark$
**The minor-axis direction.** It is the projection of $\boldsymbol{n}$ onto the image plane: for $\boldsymbol{n} = (0,0,1)$ this is $\frac{1}{3} \left( - 1, - 1, 2 \right)$, which in the standard isometric drawing frame points **straight up**. $\checkmark$
*Sanity.* The result $b / a = \left| \boldsymbol{v} \cdot \boldsymbol{n} \right|$ covers every pictorial at once and is the reason a **dimetric** top-face circle at $0.943$ looks almost round while its **front** circle at $0.35$ looks like a slot — the same circle, two different projections, one formula.
:::
:::

::: exercise Design {level=3}
A sheet-metal enclosure $400 \times 300 \times 200\ \mathrm{mm}$ with a front panel carrying an $8\ \mathrm{mm}$-diameter display window and $12$ snap-fit apertures must be communicated to a contract fabricator by sketch. Specify the views, the pictorial, and what the sketch must say that a CAD model would not.
::: solution
**The views.** One **front elevation** at $1 : 2$ showing the window and the $12$ apertures with their true positions; one **side elevation** showing the depth, the fold line and the flange; one **plan** only if the top carries features, which it does not — so **two views and one pictorial**, and a third view is a waste of the reader's time.
**The pictorial.** A **cabinet oblique** with the **front panel as the true-shape face**, because the front panel carries $13$ of the $14$ features that matter and the cabinet keeps it undistorted. An isometric would turn the window into an ellipse and the snap apertures into $12$ ellipses, and the fabricator would ask for a front view anyway.
**What the sketch must say that a CAD model would not.**
1. **The bend sequence and the bend allowance.** "FOLD LAST ON THE $400$ SIDE; INSIDE RADIUS $R 1.0$ WITH A $1.5\ \mathrm{mm}$ DIE FOR $1.2\ \mathrm{mm}$ CR4"; a CAD model shows the folded geometry and not the tool that must make it.
2. **The springback and the tolerance that goes with it.** Air-bent $1.2\ \mathrm{mm}$ CR4 springs back $1.5$ to $3^{\circ}$, so the $90^{\circ}$ must be drawn as $88^{\circ}$ with a $\pm 1.5^{\circ}$ tolerance, and the sketch must say so.
3. **The burr side.** A snap-fit aperture's burr faces **out**; a punched hole's burr faces the **die** side, and the sketch must state which side is which.
4. **The grain.** A fold **across** the $1.2\ \mathrm{mm}$ sheet's rolling direction has twice the minimum radius of a fold **with** it, and a sketch that says "grain this way" prevents a $R 3$ die being quoted for an $R 1$ requirement.
5. **The cosmetic class.** The front panel is **Class A** — no visible die marks, no protective-film adhesive residue, a $\mathrm{Ra}\ 0.8$ pre-coat finish — and the other five faces are not. A CAD model cannot say this and a fabricator who is not told will spend the money on the wrong faces.
6. **The tolerance that is not on a dimension.** The window's position is $\pm 0.5$; the window's **flatness after powder coat** is the real requirement, and it is a process note and not a dimension.

*Design comment.* The general rule is that **a sketch to a fabricator is a specification of process and not of geometry**, because the geometry is the easy part and the fabricator's cost is dominated by the tool, the sequence and the cosmetic class. The sketch that saves the most money is the one that says which faces do not matter.
:::
:::
