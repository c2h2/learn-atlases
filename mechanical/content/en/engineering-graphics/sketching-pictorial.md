A sketch is a **statement about geometry** made by hand in a minute or two, and it is the fastest drawing medium there is. Much of what follows — the CAD model, the tolerance analysis, the supplier's quote — inherits decisions first made on a sketch pad, and an error made there is cheapest to correct there.

A pictorial is worth learning because it is easier to read than a set of orthographic views: it shows the object roughly as the eye sees it. Orthographic views are what define the part precisely; a pictorial helps the reader understand them. The craft is knowing which the reader needs, and drawing either so that nothing in it can be misread.

::: warning Seven sketching errors that survive into the drawing
**A dimensioned sketch with no datum.** Every dimension must start from something; dimensions hanging in space produce a part that is right in size and wrong in position. Mark the datum faces before the first dimension. **Isometric axes at the wrong angle.** The isometric axes are $120^{\circ}$ apart, the two receding axes at $30^{\circ}$ to the horizontal; drawn at $45^{\circ}$ the sketch is an oblique pictorial with a different set of rules. **Ellipses with the wrong orientation.** In isometric, the **minor axis** of the ellipse that represents a circle always lies along the projected **axis of the hole** (the circle's normal): vertical for a hole in a horizontal face, along the $30^{\circ}$ receding axis for a hole in a vertical face. An ellipse that is the right shape but wrongly oriented reads as a tilted hole. **A dimension to a hidden edge.** If the reader cannot see the two points, the dimension is hard to read and easy to misplace. **A redundant dimension.** A dimension that can be computed from others is a second instruction that may disagree with them. **A tight tolerance on everything.** A blanket tight tolerance says that the designer has not decided which features matter, and it costs money on every feature. **A sketch with no material or process note.** The same outline may be laser-cut, machined from solid or cast, at very different costs and with different achievable tolerances; the geometry alone does not say which is meant.
:::

## Lines, weights and the alphabet

::: definition The line types {#def-lines}
ISO 128-2 defines the basic line types by a two-part code (type and width); traditional British practice (BS 308) used letters, which are still met on older drawings. Two widths are used, **wide** and **narrow**, in the ratio $2:1$ (for example $0.7$ and $0.35\ \mathrm{mm}$, or $0.5$ and $0.25\ \mathrm{mm}$).

| ISO 128-2 | Form and width | Typical uses | BS 308 letter |
|---|---|---|---|
| 01.2 | continuous, wide | visible edges and outlines | A |
| 01.1 | continuous, narrow | dimension and projection lines, leaders, hatching, outlines of revolved sections, short centre lines | B |
| 01.1 (freehand or zigzag) | continuous narrow, freehand or with zigzags | limits of partial views and sections, breaks | C (freehand), D (zigzag) |
| 02.1 | dashed, narrow | hidden edges and outlines | F (E for the thick form) |
| 04.1 | long-dashed dotted, narrow | centre lines, lines of symmetry, pitch circles | G |
| 04.1 with 04.2 at ends | as above, wide at the ends and changes of direction | cutting planes | H |
| 04.2 | long-dashed dotted, wide | surfaces with a special requirement (e.g. a limited heat-treatment zone) | J |
| 05.1 | long-dashed double-dotted, narrow | adjacent parts, extreme positions of moving parts, initial outlines before forming | K |

**Rules that keep a drawing readable.** **Visible outlines take precedence** over hidden lines, which take precedence over centre lines, where lines coincide. **Centre lines cross at a dash**, not at a gap, and extend a short distance beyond the feature. **Hidden lines are omitted** where a section or another view already shows the feature clearly. **A view with many hidden lines** is usually a sign that another view or a section would be better.
:::

::: definition Sketching mechanics {#def-sketch-mech}
**Draw long lines with the arm, not the wrist.** A long line drawn by pivoting the wrist becomes an arc; moving the forearm from the elbow and shoulder keeps it straight. Short, light strokes along a line, then one firm stroke over them, also work well.
**Draw one direction at a time.** All the lines in one direction, then the next; turning the paper so that every stroke is a comfortable one is legitimate.
**Construction lines first, dark lines last.** Lay out the overall envelope in light strokes, place every feature, then go over the final outline. A sketch drawn dark from the first stroke cannot be corrected.
**Freehand circles and ellipses.** Sketch the enclosing square (or, in isometric, the enclosing rhombus), mark the midpoints of its sides and points on its diagonals, and draw the curve through them. A circle touches its square at the four side midpoints and crosses each half-diagonal at $1/\sqrt{2} = 0.71$ of the way from the centre to the corner; the same proportions hold for an isometric ellipse in its rhombus, because the isometric projection is a linear map.
**The four-centre construction.** A compass approximation to an isometric ellipse made of four circular arcs. It is quick, but it is not an ellipse: as the example below shows, its ends fall about $6\ \%$ short of the true ellipse.
:::

## Pictorial projection and its arithmetic

::: definition What a pictorial really is {#def-pictorial}
A parallel pictorial is a **linear map** from 3D space to the drawing plane, fixed by the direction in which each coordinate axis is drawn and the scale along it.
$$
\begin{array}{l c c c l}
\text{Pictorial} & \text{Receding-axis angles} & \text{Axial scales} & \text{Projection} & \text{Use} \\
\text{Isometric (true projection)} & 30^{\circ},\ 30^{\circ} & 0.816,\ 0.816,\ 0.816 & \text{orthographic along } (1,1,1) & \text{rarely drawn} \\
\text{Isometric drawing} & 30^{\circ},\ 30^{\circ} & 1,\ 1,\ 1 & \text{as above, enlarged} & \text{the usual convention} \\
\text{Dimetric } (1 : \tfrac{1}{2} : 1) & 7^{\circ}11',\ 41^{\circ}25' & 0.943,\ 0.471,\ 0.943 & \text{orthographic, two scales equal} & \text{often drawn } 1,\ \tfrac{1}{2},\ 1 \\
\text{Trimetric} & \text{unequal} & \text{three unequal} & \text{orthographic, general} & \text{freely chosen views} \\
\text{Cavalier oblique} & 45^{\circ} & 1,\ 1,\ 1 & \text{oblique, projectors at } 45^{\circ} \text{ to the plane} & \text{frontal circles true} \\
\text{Cabinet oblique} & 45^{\circ} & 1,\ 1,\ 0.5 & \text{oblique, projectors at } 63.4^{\circ} \text{ to the plane} & \text{more natural-looking depth} \\
\text{Perspective} & \text{converging} & \text{distance-dependent} & \text{central, from a finite eye} & \text{presentation, architecture}
\end{array}
$$
**The isometric's $0.816$.** Projecting orthogonally along $(1,1,1)/\sqrt{3}$, a unit vector along a coordinate axis loses its component along the view direction, and its projected length is
$$
\sqrt{1 - \left( \tfrac{1}{\sqrt{3}} \right)^{2}} = \sqrt{\tfrac{2}{3}} = 0.8165 .
$$
A **true** isometric projection draws every axis $18.4\ \%$ short. The **isometric drawing** sets the axial scale to $1$, so it is $1 / 0.8165 = 1.225$ times — $22.5\ \%$ — larger than the true projection. That is a convention, not an error: distances along the axes are drawn at true length and can be measured directly.
**The $120^{\circ}$.** With the view direction along $(1,1,1)$, the projected $x$- and $y$-axes are $(2, -1, -1)/3$ and $(-1, 2, -1)/3$; their dot product is $-1/3$ and each has squared length $2/3$, so
$$
\cos \theta = \frac{- 1 / 3}{2 / 3} = - \frac{1}{2} \ \Rightarrow\ \boxed{ \theta = 120^{\circ}} ,
$$
and with the $z$-axis vertical the other two make $30^{\circ}$ with the horizontal.
:::

::: definition Circles in pictorial: the ellipse you must get right {#def-ellipse}
In an **orthographic** pictorial (isometric, dimetric, trimetric) a circle of radius $r$ projects to an ellipse with semi-major axis $a = r$ (in the true projection) and semi-minor axis $b = r \left| \boldsymbol{v} \cdot \boldsymbol{n} \right|$, where $\boldsymbol{v}$ is the unit view direction and $\boldsymbol{n}$ the circle's unit normal; the minor axis lies along the projection of $\boldsymbol{n}$, i.e. along the drawn axis of the hole.
$$
\begin{array}{l c c l}
\text{Pictorial} & \text{Circle in} & b / a & \text{Minor-axis direction} \\
\text{Isometric} & \text{any coordinate plane} & 1/\sqrt{3} = 0.577 & \text{along the axis normal to that plane} \\
\text{Dimetric } (1 : \tfrac12 : 1) & \text{plane normal to the short axis} & 0.882 & \text{along the short axis} \\
\text{Dimetric } (1 : \tfrac12 : 1) & \text{the other two planes} & 0.333 & \text{along their normals} \\
\text{Cavalier or cabinet} & \text{the frontal plane} & 1 & \text{a true circle} \\
\text{Cavalier} & \text{a receding plane} & 0.414 & \text{oblique; major axis } 1.31\, r \\
\text{Cabinet} & \text{a receding plane} & 0.310 & \text{oblique; major axis } 1.07\, r
\end{array}
$$
(An oblique projection is not orthogonal, so the formula $b = r|\boldsymbol{v}\cdot\boldsymbol{n}|$ does not apply to it; the oblique ratios come from the singular values of the $2 \times 2$ map of the receding plane.)
**Three consequences.** **An isometric circle is never drawn as a circle** — every hole, boss and fillet is an ellipse of ratio $0.577$. **An oblique pictorial keeps frontal circles true**, which makes it the quickest pictorial for a flange, a gear or a plate with holes, provided the circular features are put in the frontal plane. **Circles in the receding planes of an oblique are awkward ellipses**, so a part with holes on several faces is better drawn in isometric.
:::

::: widget plot
f: cos(x*pi/180)
x: 0, 90
y: 0, 1
labels: ellipse ratio b/a
caption: The minor-to-major ratio of the ellipse that represents a circle in an orthographic pictorial, against the angle $x$ (degrees) between the view direction and the circle's normal. In isometric that angle is $54.7^{\circ}$ for every coordinate plane, giving $0.577$; in a $1 : \tfrac12 : 1$ dimetric it is $28.1^{\circ}$ (ratio $0.882$) for one plane and $70.5^{\circ}$ (ratio $0.333$) for the other two. At $0^{\circ}$ the circle is seen face-on and at $90^{\circ}$ edge-on, as a line.
:::

::: definition Perspective: the finite eye {#def-perspective}
A perspective has a **station point** (the eye), a **picture plane** at a distance $d_p$ in front of it, a **horizon** at eye height, and one vanishing point for each family of parallel lines that is not parallel to the picture plane. A point at height $y$ above (or below) the eye and at distance $x$ in front of it projects onto the picture plane at
$$
y^{\prime} = \frac{y\, d_p}{x} ,
$$
and most of perspective is this one similar-triangles ratio.
**The corridor.** A corridor $2.4\ \mathrm{m}$ high and $1.5\ \mathrm{m}$ wide, drawn with the eye at $1.6\ \mathrm{m}$ and a picture plane at $d_p = 0.5\ \mathrm{m}$ (sizes on the picture plane):
$$
\begin{array}{l c c c}
\text{Distance in front of the eye} & 1\ \mathrm{m} & 4\ \mathrm{m} & 8\ \mathrm{m} \\
\text{Wall height} & 1.200\ \mathrm{m} & 0.300\ \mathrm{m} & 0.150\ \mathrm{m} \\
\text{Corridor width} & 0.750\ \mathrm{m} & 0.188\ \mathrm{m} & 0.094\ \mathrm{m} \\
\text{Ceiling above the horizon} & 0.400\ \mathrm{m} & 0.100\ \mathrm{m} & 0.050\ \mathrm{m} \\
\text{Floor below the horizon} & 0.800\ \mathrm{m} & 0.200\ \mathrm{m} & 0.100\ \mathrm{m}
\end{array}
$$
**Two facts that make a perspective look right.** **The horizon is at eye height**: an engineer's perspective with the horizon at the wrong height looks subtly wrong. **Equal real distances give decreasing image distances**, as $1/x$, so evenly spaced floor tiles crowd together towards the vanishing point; a sketch that spaces them evenly is not a perspective.
**Two-point perspective and the eye circle.** For a box turned at an angle to the picture plane, its two horizontal edge directions have vanishing points $V_1$ and $V_2$ on the horizon. Because those directions are perpendicular, the lines from the station point (in plan) to $V_1$ and $V_2$ meet at a right angle, so the station point lies on the circle with $V_1 V_2$ as diameter. Since the station point is $d_p$ from the picture plane, that circle must reach $d_p$ from the line $V_1 V_2$:
$$
\left| V_1 V_2 \right| \ge 2 d_p .
$$
Vanishing points placed closer together than $2 d_p$ correspond to no possible eye position, and the drawing looks violently distorted.
:::

::: example The isometric ellipse and the four-centre construction {#ex-ellipse}
Draw a $\varnothing 60\ \mathrm{mm}$ hole in the top face of a block as an isometric-drawing ellipse. Give the true ellipse's axes, the four-centre radii and the construction's error.
::: solution
**The true ellipse.** In the isometric drawing (axial scale $1$) the true projection is enlarged by $1.225$, so for a horizontal circle of radius $30$:
$$
a = 30 \times 1.225 = 36.74\ \mathrm{mm}, \qquad b = \frac{a}{\sqrt{3}} = 21.21\ \mathrm{mm}, \qquad \frac{b}{a} = 0.577 ,
$$
with the major axis horizontal and the minor axis **vertical** (along the hole's axis).
**The rhombus.** The circle's enclosing square is drawn as a rhombus of side $s = 60\ \mathrm{mm}$ with half-diagonals
$$
p = \tfrac{\sqrt{3}}{2} s = 51.96\ \mathrm{mm}\ (\text{horizontal}), \qquad q = \tfrac{s}{2} = 30\ \mathrm{mm}\ (\text{vertical}) .
$$
Label the acute ($60^{\circ}$) corners $A$ (left) and $C$ (right), and the obtuse ($120^{\circ}$) corners $B$ (top) and $D$ (bottom).
**The four-centre construction.** From $D$ draw lines to the midpoints of the two sides that meet at $B$, and from $B$ to the midpoints of the sides that meet at $D$; these lines are perpendicular to the sides they meet. The two **large arcs** are centred at $B$ and $D$, with radius equal to the rhombus's altitude; the two **small arcs** are centred where those lines cross the long diagonal $AC$:
$$
R_{\text{large}} = \tfrac{\sqrt{3}}{2} s = 51.96\ \mathrm{mm}, \qquad
R_{\text{small}} = \tfrac{s}{2\sqrt{3}} = 17.32\ \mathrm{mm}, \quad \text{centred at } \pm 17.32\ \mathrm{mm} \text{ on } AC .
$$
**The error.** The four arcs touch the rhombus at its side midpoints, as the true ellipse does, but they are not an ellipse. The ends of the curve lie at $17.32 + 17.32 = 34.64\ \mathrm{mm}$ from the centre against the true $a = 36.74$ — **$2.10\ \mathrm{mm}$, or $5.7\ \%$, short** — while the top and bottom lie at $51.96 - 30 = 21.96\ \mathrm{mm}$ against the true $b = 21.21$, $3.5\ \%$ full. The four-centre curve is visibly "rounder" than the true ellipse, which is why CAD systems draw a true ellipse.
**A better freehand answer.** Mark eight points — the four side midpoints and the four points at $0.71$ of the way from the centre to each corner along the diagonals (where the true ellipse crosses them: $36.74/51.96 = 21.21/30 = 0.707$) — and draw the curve through them.

*Check.* The true ellipse passes through the side midpoint $(p/2,\ q/2) = (25.98,\ 15.0)$: $(25.98/36.74)^{2} + (15.0/21.21)^{2} = 0.500 + 0.500 = 1.000$. $\checkmark$

*Sanity.* The ellipse's major axis ($73.5\ \mathrm{mm}$) lies along the rhombus's long diagonal ($103.9\ \mathrm{mm}$) and its minor axis ($42.4\ \mathrm{mm}$) along the short one ($60\ \mathrm{mm}$); it touches the sides only at their midpoints and never comes near a corner.
:::
:::

::: example Cavalier or cabinet? {#ex-oblique}
A steel bar $180\ \mathrm{mm}$ long with a $60 \times 60\ \mathrm{mm}$ square section has a $\varnothing 40$ hole through one of its long faces, near one end. Sketch it as an oblique pictorial: how should it be oriented, and should the receding axis be cavalier or cabinet?
::: solution
**Orientation.** Put the **long face containing the hole in the frontal plane**: the hole is then a true circle and the $180\ \mathrm{mm}$ length is drawn true along the horizontal. Only the $60\ \mathrm{mm}$ depth recedes.
**The receding depth.**
$$
\text{cavalier: } 60\ \mathrm{mm}\ \text{at } 45^{\circ}, \qquad \text{cabinet: } 30\ \mathrm{mm}\ \text{at } 45^{\circ} .
$$
**What if the hole were put in a receding face instead?** Its circle would become an oblique ellipse: in cavalier with $b/a = 0.414$ and a major axis of $1.31 \times 40 = 52\ \mathrm{mm}$, in cabinet with $b/a = 0.310$ and a major axis of $1.07 \times 40 = 43\ \mathrm{mm}$ — awkward to sketch and easy to misread. That is the argument for the orientation above.
**The verdict.** **Cabinet** is usually preferred, because full-length receding lines in cavalier make the depth look exaggerated; here the receding depth is short, so either works, and cabinet gives the more natural impression of a square section.
**The rule.** In an oblique pictorial, put the **circles and the most complex outline** in the frontal plane, and the **longest dimension** along the horizontal if possible, so that the receding direction carries as little as possible.

*Sanity.* The cavalier receding axis is drawn at full scale although real depth would appear foreshortened to the eye; the cabinet's half scale is a perceptual correction, not a geometric one.
:::
:::

::: example A one-point perspective of a doorway {#ex-persp}
A doorway $2.10\ \mathrm{m}$ high and $0.90\ \mathrm{m}$ wide is in a wall $3.0\ \mathrm{m}$ in front of the observer, the wall parallel to the picture plane. The observer's eye is at $1.55\ \mathrm{m}$, the picture plane $0.40\ \mathrm{m}$ in front of the eye, and the room is $2.70\ \mathrm{m}$ high. Give the projected size of the opening, its position relative to the horizon, and how the side walls' top edges are drawn.
::: solution
**The projection ratio.** $d_p / x = 0.40 / 3.0 = 0.1333$.
**The opening.**
$$
h^{\prime} = 2.10 \times 0.1333 = 0.280\ \mathrm{m}, \qquad
w^{\prime} = 0.90 \times 0.1333 = 0.120\ \mathrm{m}.
$$
**Its position.** The head of the opening is $2.10 - 1.55 = 0.55\ \mathrm{m}$ above the eye and projects $0.073\ \mathrm{m}$ above the horizon; the sill (floor) is $1.55\ \mathrm{m}$ below the eye and projects $0.207\ \mathrm{m}$ below. Together: $0.280\ \mathrm{m}$. $\checkmark$
**The end wall.** It is parallel to the picture plane, so its edges are **not** foreshortened in direction: the top of the end wall ($1.15\ \mathrm{m}$ above the eye) is a horizontal line $0.153\ \mathrm{m}$ above the horizon, and the doorway is a true rectangle at reduced scale.
**The side walls.** Their top edges run **perpendicular** to the picture plane and converge to the single vanishing point, which lies on the horizon directly in front of the eye. At $1.0\ \mathrm{m}$ from the eye a side wall's top edge is $1.15 \times 0.40 / 1.0 = 0.460\ \mathrm{m}$ above the horizon; at the end wall ($3.0\ \mathrm{m}$) it is $0.153\ \mathrm{m}$.
**The rule.** In one-point perspective, lines parallel to the picture plane keep their directions (verticals stay vertical, horizontals across the view stay horizontal); only lines perpendicular to the picture plane converge, to the one vanishing point.

*Sanity.* The opening's projection subtends $\tan^{-1}(0.073/0.40) + \tan^{-1}(0.207/0.40) = 10.4^{\circ} + 27.3^{\circ} = 37.7^{\circ}$ at the eye — the same angle as the real doorway at $3\ \mathrm{m}$, which is what makes a correctly constructed perspective, viewed from the station point, match the scene.
:::
:::

::: example Sketching a bracket: the workflow {#ex-workflow}
Sketch in isometric a $10\ \mathrm{mm}$-thick L-bracket, $120\ \mathrm{mm}$ wide, with a vertical leg $160\ \mathrm{mm}$ high and a base leg $80\ \mathrm{mm}$ deep. The vertical leg has a $\varnothing 14$ hole centred across the width, $40\ \mathrm{mm}$ above the underside of the base; the base leg has two slots, $9\ \mathrm{mm}$ wide and $25\ \mathrm{mm}$ long. Do it so that it cannot be misread.
::: solution
**Step 1 — the envelope, in light lines.** An isometric box $120 \times 80 \times 160$ (width, depth, height) on $30^{\circ}$ axes. **Do not draw the L yet.**
**Step 2 — the datums.** Mark the underside of the base, the back face of the vertical leg and one side face as datums $A$, $B$, $C$; all locations will be given from them.
**Step 3 — the L.** Cut the box down to the two $10\ \mathrm{mm}$ legs with light lines.
**Step 4 — the features in construction lines.** The $\varnothing 14$ centre at $40$ up from $A$ and $60$ from $C$; the two slot centrelines at $30$ and $90$ from $C$, at a stated distance from $B$.
**Step 5 — the ellipses.** The $\varnothing 14$ hole is in a **vertical** face, so its ellipse has $b/a = 0.577$ with the minor axis along the hole's axis — the $30^{\circ}$ receding axis normal to that face, **not** vertical. The slots are in the **horizontal** base, so their rounded ends have vertical minor axes.
**Step 6 — darken.** Visible outlines wide, centre lines narrow chain, hidden lines only where they help.
**Step 7 — the dimensions.** Overall $120$, $160$, $80$; thickness $10$ (one note covers both legs); the hole $\varnothing 14$ with its $40$ and $60$; the slots' width, length and the positions of their centrelines.
**Step 8 — the notes.** Material and thickness (e.g. "S355JR, $10\ \mathrm{mm}$ PLATE"), the process ("LASER CUT AND BENT" or "MACHINED FROM SOLID"), "REMOVE ALL BURRS AND SHARP EDGES", and the general tolerance.
**What not to dimension.** The $90^{\circ}$ between the legs — it is implied by the views and covered by the general angular tolerance unless function needs it tighter. A slot-to-slot distance as well as both slot positions from $C$ — one of the three is redundant. If the bracket is bent from plate, the inside bend radius **is** specified (it depends on the tooling and the material), but the bend allowance is the fabricator's calculation.

*Design comment.* A sketch is finished when removing any dimension makes it ambiguous and adding any dimension makes it redundant.
:::
:::

::: history
Monge's descriptive geometry (published as *Géométrie descriptive* in **1799**) supplied the theory of orthographic projection on which engineering drawing rests. **Isometric drawing** as a systematic engineering method was introduced by **William Farish**, professor at Cambridge, in his paper "On Isometrical Perspective", read in **1820** and published in the first volume of the *Transactions of the Cambridge Philosophical Society* (**1822**); Farish used it to draw the apparatus for his lectures. The interest of design researchers in sketching as a **thinking tool**, rather than merely a slow way of drawing, grew in the 1980s and 1990s; **Gabriela Goldschmidt**'s "The dialectics of sketching" (*Creativity Research Journal*, **1991**) is a much-cited example, describing the designer's alternation between "seeing as" and "seeing that" in a sketch. Line types are standardised today in **ISO 128-2**, which superseded the letter-coded line types of the former British Standard **BS 308**.
:::

## Where this leads

The pictorial is the communication; the geometry it must carry is fixed by the projection method of [[engineering-graphics/orthographic-projection]], its dimensions by [[engineering-graphics/dimensioning]], and its tolerances by [[engineering-graphics/tolerances-fits]] and [[engineering-graphics/geometric-tolerancing]].

::: summary
- Put the datums on a dimensioned sketch before the first dimension.
- ISO 128-2 line types come in two widths in a $2:1$ ratio; visible outlines take precedence over hidden and centre lines.
- Isometric axes are $120^{\circ}$ apart and $30^{\circ}$ from the horizontal; the true projection is $0.816$ scale, and the usual isometric drawing is $22.5\ \%$ larger.
- An isometric circle is an ellipse of ratio $0.577$ whose minor axis lies along the hole's axis; an oblique pictorial keeps frontal circles true.
- The four-centre construction falls about $6\ \%$ short at the ends of the ellipse; an eight-point freehand ellipse is closer.
- In perspective the horizon is at eye height, image sizes scale as $1/x$, and two vanishing points must be at least $2 d_p$ apart.
:::

::: quiz
In an isometric sketch of a circular hole drilled into a vertical face, which way does the ellipse's minor axis point?
- [ ] Vertically on the drawing
- [x] Along the receding isometric axis normal to that face, at $30^{\circ}$ to the horizontal
- [ ] Horizontally on the drawing
- [ ] At $45^{\circ}$ to the horizontal
::: solution
Along the receding axis normal to the face. The minor axis is the projection of the circle's normal — the hole's axis — and the normal of a vertical face in isometric is drawn along one of the $30^{\circ}$ axes. Only for a hole in a **horizontal** face is the minor axis vertical.
:::
:::

## Exercises

::: exercise Lines {level=1 check="2"}
What is the ratio of the wide to the narrow line width in ISO 128-2? (Enter the ratio as a single number.)
::: solution
$2$ — for example $0.7$ and $0.35\ \mathrm{mm}$.
:::
:::

::: exercise Isometric {level=1 check="0.8165"}
Give the axial scale factor of a true isometric projection. (Enter a ratio.)
::: solution
$\sqrt{2/3} = 0.8165$.
:::
:::

::: exercise Circle ratio {level=1 check="0.577"}
Give the minor-to-major axis ratio of a circle drawn in isometric. (Enter a ratio.)
::: solution
$1/\sqrt{3} = 0.577$.
:::
:::

::: exercise Axes {level=1 check="120"}
Give the angle between any two projected axes in isometric. (Enter the angle in degrees.)
::: solution
$120^{\circ}$.
:::
:::

::: exercise Cabinet {level=1 check="0.5"}
Give the receding-axis scale of a cabinet oblique. (Enter a ratio.)
::: solution
$0.5$ — half true length.
:::
:::

::: exercise The isometric drawing's size {level=2 check="22.5"}
By what percentage is a conventional isometric drawing larger than the true isometric projection, and why is this not an error? (Enter the percentage.)
::: solution
$$
\frac{1}{0.8165} = 1.225 \ \Rightarrow\ 22.5\ \% .
$$
The convention keeps the three axial scales equal and the axes at $120^{\circ}$; it only chooses the scale $1$ instead of $0.8165$, so distances along the axes can be drawn and measured at true length. Distances **not** parallel to an axis are not at true length in either version — a diagonal across a face is distorted — which is why dimensions are taken from orthographic views, not from a pictorial.
:::
:::

::: exercise Perspective {level=2 check="49.6"}
The top edge of a wall running away from the observer is $0.85\ \mathrm{m}$ above the eye. With the picture plane $0.35\ \mathrm{m}$ in front of the eye, how far above the horizon is that edge drawn at a point $6\ \mathrm{m}$ from the eye, and at $2\ \mathrm{m}$? (Enter the value at $6\ \mathrm{m}$, in millimetres.)
::: solution
$$
y^{\prime}_{6} = \frac{0.85 \times 0.35}{6} = 0.0496\ \mathrm{m} = 49.6\ \mathrm{mm}, \qquad
y^{\prime}_{2} = \frac{0.85 \times 0.35}{2} = 148.8\ \mathrm{mm} .
$$
*Sanity.* A $3:1$ ratio of distances gives a $3:1$ ratio of image heights; extended, the edge reaches the horizon at the vanishing point.
:::
:::

::: exercise Derivation {level=3}
Derive the isometric axis angle and the circle ratio from the view direction $\boldsymbol{v} = (1,1,1)/\sqrt{3}$, and show that in an orthographic projection the ellipse's semi-major axis equals the circle's radius.
::: solution
**The projected axis.** The projection of $\boldsymbol{a}$ onto the plane normal to $\boldsymbol{v}$ is $\boldsymbol{a}' = \boldsymbol{a} - (\boldsymbol{a} \cdot \boldsymbol{v})\, \boldsymbol{v}$. For $\boldsymbol{a} = (1,0,0)$:
$$
\boldsymbol{a}' = (1, 0, 0) - \tfrac{1}{3}(1, 1, 1) = \tfrac{1}{3}(2, -1, -1), \qquad |\boldsymbol{a}'| = \tfrac{\sqrt{6}}{3} = 0.8165 .
$$
**The angle.** With $\boldsymbol{b}' = \tfrac{1}{3}(-1, 2, -1)$,
$$
\boldsymbol{a}' \cdot \boldsymbol{b}' = \tfrac{1}{9}(-2 - 2 + 1) = -\tfrac{1}{3}, \qquad
\cos \theta = \frac{-1/3}{6/9} = -\tfrac{1}{2} \ \Rightarrow\ \theta = 120^{\circ} . \ \checkmark
$$
**The circle.** Points of a circle of radius $r$ with unit normal $\boldsymbol{n}$ are $\boldsymbol{p} = r(\cos\phi\, \boldsymbol{e}_1 + \sin\phi\, \boldsymbol{e}_2)$, with $\boldsymbol{e}_1, \boldsymbol{e}_2$ orthonormal in the circle's plane. Their images satisfy $|\boldsymbol{p}'|^{2} = r^{2} - (\boldsymbol{p} \cdot \boldsymbol{v})^{2}$. The **maximum** is $r$, reached where $\boldsymbol{p} \perp \boldsymbol{v}$ — such a $\boldsymbol{p}$ exists because the direction $\boldsymbol{v} \times \boldsymbol{n}$ lies in the circle's plane. **So the semi-major axis equals the true radius.** The **minimum** comes where $|\boldsymbol{p} \cdot \boldsymbol{v}|$ is largest, i.e. $r$ times the length of the component of $\boldsymbol{v}$ in the circle's plane, $r \sin\psi$, where $\psi$ is the angle between $\boldsymbol{v}$ and $\boldsymbol{n}$:
$$
b = \sqrt{r^{2} - r^{2} \sin^{2}\psi} = r\, |\cos\psi| = r\, |\boldsymbol{v} \cdot \boldsymbol{n}| .
$$
For isometric, $\boldsymbol{v} \cdot \boldsymbol{n} = 1/\sqrt{3}$ for every coordinate plane, giving $b/a = 0.577$. $\checkmark$
**The minor-axis direction** is that of the projected normal: for $\boldsymbol{n} = (0,0,1)$, $\boldsymbol{n}' = \tfrac{1}{3}(-1, -1, 2)$, which is the drawn vertical.
*Sanity.* The same formula covers every orthographic pictorial: in a $1 : \tfrac12 : 1$ dimetric, $\boldsymbol{v} = (0.333,\ 0.882,\ 0.333)$, so circles normal to the short axis have $b/a = 0.882$ and look nearly round, while the others have $0.333$ and look like slots.
:::
:::

::: exercise Design {level=3}
A sheet-metal enclosure $400 \times 300 \times 200\ \mathrm{mm}$, with a front panel carrying an $80\ \mathrm{mm}$-diameter display window and $12$ snap-fit apertures, must be communicated to a contract fabricator by sketch. Specify the views, the pictorial and what the sketch must say that the geometry alone does not.
::: solution
**The views.** A **front view** showing the window and the $12$ apertures at their true positions; a **side view** showing the depth, the folds and the flanges; a top view only if the top carries features.
**The pictorial.** An **oblique** pictorial with the **front panel in the frontal plane**, so that the window and apertures stay true shapes; in isometric they would all become ellipses.
**What the sketch must say.**
1. **Material and thickness**, e.g. "$1.2\ \mathrm{mm}$ DC01 cold-rolled steel".
2. **Inside bend radius and bend tolerance.** The drawing states the finished angle, e.g. $90^{\circ} \pm 1^{\circ}$; compensating for springback (by over-bending) is the fabricator's job and is not drawn.
3. **Burr side.** Punched or laser-cut edges have a burr side, and on a snap-fit aperture it matters which face it is on.
4. **Rolling direction**, where tight bends are needed: a bend line parallel to the rolling direction needs a larger minimum radius than one across it.
5. **Cosmetic faces.** The front panel is the visible face — no tooling marks, protective film to remain until assembly — and the other faces are not; without this note the fabricator treats all faces alike.
6. **Requirements after finishing**, such as the flatness of the front panel after powder coating, as a note.

*Design comment.* A sketch to a fabricator is as much a specification of process and appearance as of geometry: the geometry is the easy part, and the cost is set by tooling, sequence and the cosmetic class.
:::
:::
