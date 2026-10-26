A drawing is a **compression of a solid into a plane**, and it can be decompressed only if the reader knows the code. That code goes back to **Gaspard Monge's** descriptive geometry — two perpendicular planes of projection, hinged open flat — and almost every engineering drawing today is either a **first-angle** or a **third-angle** unfolding of it. Read a drawing in the wrong convention and the part is **mirrored**: a mirrored bracket is not a slightly wrong bracket, it is one that will not bolt on.

The craft is not drawing the views; it is **choosing** them. The right set of views shows every feature at its true shape in one view and edge-on in another; the wrong set makes the reader reconstruct the object in their head, and a reader who is reconstructing is a reader who may guess.

::: warning Seven projection errors that produce mirrored or unmakeable parts
**Mixing the conventions on one drawing.** A drawing with a third-angle symbol and a top view placed **below** the front view is contradictory; the layout and the symbol must agree. **An inclined face with no auxiliary view.** A face sloped at $25^{\circ}$ to the horizontal, with its slope seen edge-on in the front view, appears in the top view at $90.6\ \%$ of its true size along the slope and in the side view at $42.3\ \%$; a hole drilled **normal** to it is a true circle in **none** of the three. **A view that shows a feature foreshortened when another could show it true.** If a plate's outline can be drawn at true shape in one view, that view carries the outline and the others support it. **Dimensions placed on a foreshortened view.** A $20\ \mathrm{mm}$ distance along a $25^{\circ}$ slope appears as $18.1\ \mathrm{mm}$ in the top view, a $9.4\ \%$ discrepancy between what is drawn and what is meant. **Hidden lines where a section belongs.** Several crossing hidden lines in one view are a sign that a section would be clearer. **No viewing direction for a non-standard view.** A view that is not in its projected position must be identified by an arrow and a letter, or the reader cannot tell which way it was seen. **An auxiliary view with no reference.** An auxiliary view is a projection only because its depths are transferred from a stated **reference (folding) line**; without the reference and a label it is just another sketch.
:::

## Monge's two planes and the two conventions

::: definition The unfolding, and why there are two answers {#def-monge}
Take two mutually perpendicular planes, a **vertical plane** VP and a **horizontal plane** HP, meeting in the **reference line** $XY$. They divide space into four quadrants ("angles"). The object is projected orthogonally onto VP to give the **front view** (elevation) and onto HP to give the **top view** (plan), and then HP is rotated about $XY$ into the plane of VP so that both views can be drawn on one sheet.
$$
\begin{array}{l l l}
\text{Convention} & \text{Arrangement} & \text{Result} \\
\text{First angle} & \text{the object lies between the observer and the plane of projection} & \text{top view BELOW the front view} \\
\text{Third angle} & \text{the plane of projection lies between the observer and the object} & \text{top view ABOVE the front view}
\end{array}
$$
**The rule that never fails.** In **third angle** a view is placed on the **same side** of the front view as the direction from which it is seen: look from above, draw it above; look from the left, draw it on the left. In **first angle** it is placed on the **opposite side**: look from above, draw it below; look from the left, draw it on the right. The views themselves are identical; only their positions differ.
**The symbols.** Each convention is identified by a symbol showing a **truncated cone** in two views — a side elevation (a trapezoid) and an end view (two concentric circles) — arranged according to that convention itself. The two symbols therefore differ in which side of the trapezoid the circles appear on, and the symbol is placed in or near the title block (ISO 5456-2; ISO 128).
**Where each is used.** Third angle is standard in the United States and Canada and in Japan (JIS); first angle is traditional in most of continental Europe, in China and in India. ISO standards permit both, provided the method is indicated. **A drawing with no projection symbol is a drawing that must be queried.**
:::

::: definition Choosing the views {#def-choose}
**The minimum set is the one in which every feature is true-shape in one view and edge-on in another.** Typical counts:
$$
\begin{array}{l c l}
\text{Body of revolution} & 1 & \text{one view with a centre line and } \varnothing \text{ dimensions} \\
\text{Plate with a flat outline} & 1 + \text{note} & \text{the outline true-shape, the thickness by a note or a second view} \\
\text{Simple block} & 2\text{–}3 & \text{two if the third view adds nothing} \\
\text{Bracket with an inclined face} & 2\text{–}3 + 1 & \text{plus one auxiliary view} \\
\text{Housing with internal features} & 2 + \text{sections} & \text{external views plus sections where the inside matters} \\
\text{Shaft with keyways and threads} & 1 + \text{details} & \text{one side view, sections through keyways, enlarged details}
\end{array}
$$
**The front view is chosen for information, not position.** It should show the **most characteristic shape with the fewest hidden lines**, and where possible the part in its functional, manufacturing or assembled position. Where the assembly orientation matters, say so with a note or a reference arrow.
**The rules of correspondence.**
1. **Widths align vertically** between the front and top views.
2. **Heights align horizontally** between the front and side views.
3. **Depths are equal** in the top and side views, transferred by a $45^{\circ}$ mitre line or by measuring from a reference line.
4. **A feature's distance from a reference plane is the same** in every view that shows that plane as an edge.
:::

::: definition Auxiliary views: the arithmetic of an inclined face {#def-aux}
A plane face whose normal makes an angle $\varphi$ with the viewing direction projects with
$$
\text{apparent area} = A \cos \varphi ,
$$
and it appears **edge-on** — as a line — in any view whose direction lies **in** the face.
**The standard case.** A face sloped at $\theta$ from the horizontal, with the slope running left to right, appears as an **edge** (a line at $\theta$) in the **front** view. In the **top** view its dimension along the slope is foreshortened by $\cos\theta$, and in the **side** view by $\sin\theta$; its dimension across the slope is true in both.
$$
\begin{array}{c c c c}
\theta\ (\text{slope from horizontal}) & \text{top-view factor} & \text{side-view factor} & \text{auxiliary needed?} \\
0^{\circ} & 1.000 & 0\ (\text{edge}) & \text{no} \\
10^{\circ} & 0.985 & 0.174 & \text{if holes or true dimensions are needed} \\
15^{\circ} & 0.966 & 0.259 & \text{usually} \\
25^{\circ} & 0.906 & 0.423 & \text{yes} \\
30^{\circ} & 0.866 & 0.500 & \text{yes} \\
45^{\circ} & 0.707 & 0.707 & \text{yes} \\
60^{\circ} & 0.500 & 0.866 & \text{yes}
\end{array}
$$
**The construction of a primary auxiliary view.** Given the front view in which the inclined face is an edge:
1. Draw a **reference (folding) line** parallel to that edge, at a convenient distance.
2. From every corner and hole centre, project lines **perpendicular** to the reference line.
3. Set off along each projector the point's **depth**, measured in the **top** (or side) view from that view's own reference line — the depths come from a view adjacent to the one you project from.
4. The face appears at its **true shape**, and a hole drilled normal to it is a **true circle**.
**The oblique case.** A face that is edge-on in **none** of the principal views is **oblique**: a **primary** auxiliary, looking along a true-length line drawn in the face, shows the face as an edge; a **secondary** auxiliary, looking perpendicular to that edge, shows its true shape.
:::

::: widget plot
f: cos(x*pi/180); sin(x*pi/180)
x: 0, 90
y: 0, 1
labels: top-view factor; side-view factor
caption: The foreshortening factors, along the slope, for a face sloped at $x$ degrees from the horizontal and seen edge-on in the front view. At $25^{\circ}$ the top view is only $9.4\ \%$ short and looks almost true — which is what makes a gently inclined face dangerous — while the side view shows $42\ \%$. The two curves cross at $45^{\circ}$, and neither view shows the face at true size unless it is parallel to that view's plane.
:::

::: definition True length, true angle and point view {#def-truelen}
A line with components $(\Delta x,\ \Delta y,\ \Delta z)$ — $x$ to the right, $y$ away from the observer of the front view, $z$ up — has true length
$$
L = \sqrt{\Delta x^{2} + \Delta y^{2} + \Delta z^{2}}
$$
and apparent lengths $\sqrt{\Delta x^{2} + \Delta z^{2}}$ in the front view, $\sqrt{\Delta x^{2} + \Delta y^{2}}$ in the top view and $\sqrt{\Delta y^{2} + \Delta z^{2}}$ in the side view. Its inclinations to the horizontal and frontal planes are
$$
\sin \alpha_{H} = \frac{\Delta z}{L}, \qquad \sin \alpha_{V} = \frac{\Delta y}{L} .
$$
**A line shows its true length only in a view whose plane is parallel to it.** A primary auxiliary with its reference line parallel to the line's **top-view** projection shows the true length and the true angle to the horizontal; a secondary auxiliary with its reference line **perpendicular** to that true-length view shows the line as a **point**.
**The dihedral angle between two planes** is seen in the view that shows **both** planes as edges, i.e. the **point view of their line of intersection**. If that line is already true length in a principal view, one auxiliary is enough; otherwise two are needed (true length first, then point view).
:::

::: example A line in three views {#ex-truelen}
A hole is drilled from $A(10,\ 20,\ 5)$ to $B(60,\ 45,\ 40)$ in millimetres, with $x$ to the right, $y$ away from the observer of the front view and $z$ up. Give the true length, the three apparent lengths and the two inclinations, and say which view shows the true length.
::: solution
**The components.** $\Delta x = 50$, $\Delta y = 25$, $\Delta z = 35$.
**The true length.**
$$
L = \sqrt{50^{2} + 25^{2} + 35^{2}} = \sqrt{4350} = 65.95\ \mathrm{mm} .
$$
**The apparent lengths.**
$$
\text{front } (xz) = \sqrt{2500 + 1225} = 61.03, \quad
\text{top } (xy) = \sqrt{2500 + 625} = 55.90, \quad
\text{side } (yz) = \sqrt{625 + 1225} = 43.01\ \mathrm{mm}.
$$
**The inclinations.**
$$
\sin \alpha_{H} = \frac{35}{65.95} = 0.531 \ \Rightarrow\ \alpha_{H} = 32.05^{\circ}, \qquad
\sin \alpha_{V} = \frac{25}{65.95} = 0.379 \ \Rightarrow\ \alpha_{V} = 22.27^{\circ} .
$$
**Which view.** **None of the three.** The line is oblique to all three planes. A primary auxiliary with its reference line parallel to the top-view projection of $AB$ shows the true length and the $32.05^{\circ}$ inclination; a secondary auxiliary perpendicular to that gives the **point view**, in which the hole is seen end-on as a circle.
**The error of measuring the front view.** $61.03\ \mathrm{mm}$ is $92.5\ \%$ of the true $65.95$, so a length taken from the front view is $7.5\ \%$ short.

*Check.* The direction cosines are $50/65.95 = 0.758$, $25/65.95 = 0.379$ and $35/65.95 = 0.531$, and $0.758^{2} + 0.379^{2} + 0.531^{2} = 1.000$. $\checkmark$

*Sanity.* The front view drops the $y$-component, which is the smallest of the three, so it is the least foreshortened of the principal views; the side view drops the largest component ($x$) and is the most foreshortened, at $65\ \%$ of true.
:::
:::

::: example The auxiliary view of a bracket {#ex-aux}
A bracket has an inclined face $80\ \mathrm{mm}$ wide (across the slope, along $y$) and $50\ \mathrm{mm}$ long (along the slope), sloped $25^{\circ}$ from the horizontal and seen edge-on in the front view. It carries two $\varnothing 11$ clearance holes drilled normal to the face, each $20\ \mathrm{mm}$ along the slope from an end. Give the face's apparent size in the top and side views, the holes' apparent shapes, and the auxiliary construction.
::: solution
**The face.** Its true area is $80 \times 50 = 4000\ \mathrm{mm^{2}}$.
$$
\text{top view: } 80 \times (50 \cos 25^{\circ}) = 80 \times 45.32 = 3625\ \mathrm{mm^{2}} \ (90.6\ \%),
$$
$$
\text{side view: } 80 \times (50 \sin 25^{\circ}) = 80 \times 21.13 = 1690\ \mathrm{mm^{2}} \ (42.3\ \%),
$$
and in the front view the face is a line $50\ \mathrm{mm}$ long at $25^{\circ}$.
**The holes.** A $\varnothing 11$ hole normal to the face appears as
$$
\text{top view: an ellipse } 11 \times 11 \cos 25^{\circ} = 11 \times 9.97\ \mathrm{mm}, \qquad
\text{side view: an ellipse } 11 \times 11 \sin 25^{\circ} = 11 \times 4.65\ \mathrm{mm}.
$$
Neither is a circle; in the front view the hole appears as a pair of hidden lines perpendicular to the edge of the face.
**The hole positions.** The $20\ \mathrm{mm}$ is measured **along the slope**. In the top view it appears as $20 \cos 25^{\circ} = 18.13\ \mathrm{mm}$ and in the side view as $20 \sin 25^{\circ} = 8.45\ \mathrm{mm}$. The top view therefore shows the distance $1.87\ \mathrm{mm}$ ($9.4\ \%$) shorter than it is; and a drafter who laid out $20\ \mathrm{mm}$ in the top view would put the hole $20 / \cos 25^{\circ} = 22.07\ \mathrm{mm}$ along the slope, $2.07\ \mathrm{mm}$ too far.
**The auxiliary construction.**
1. In the front view the face is an **edge** at $25^{\circ}$. Draw the reference line parallel to it.
2. From each corner and each hole centre, project perpendicular to the reference line.
3. Transfer the **depths** ($y$-distances) from the **top** view, measured from its own reference line.
4. The face appears at its true $80 \times 50$, the holes as true $\varnothing 11$ circles and the hole distances as a true $20\ \mathrm{mm}$.
5. Usually a **partial** auxiliary view of the inclined face alone is drawn, identified by an arrow and a letter if it is not in its projected position, and the face is dimensioned **only** there.

*Check.* $3625 / 4000 = 0.906 = \cos 25^{\circ}$ and $1690 / 4000 = 0.423 = \sin 25^{\circ}$. $\checkmark$

*Sanity.* The $25^{\circ}$ face is dangerous precisely because the top view is only $9\ \%$ short: it looks right. The auxiliary view removes the doubt at the cost of one more view.
:::
:::

::: example First or third angle? {#ex-angle}
A drawing shows the front view, a view **below** it that looks like a plan, and a view to the **left** of the front view. The title block carries no projection symbol. Determine the convention and the risk.
::: solution
**The ambiguity.** A view placed **below** the front view is either a **first-angle top view** (seen from above, placed below) or a **third-angle bottom view** (seen from below, placed below). A view on the **left** is either a **first-angle view from the right** or a **third-angle view from the left**.
**The resolution.** Read the views **together** with the front view. If the lower view shows the features that are on the object's **top** — the tops of bosses, the opening of a pocket that the front view shows on the top face — it is a first-angle top view. If it shows the **bottom** features — mounting feet, a drain hole — it is a third-angle bottom view.
**The second test.** Find an **asymmetric** feature, such as a notch visible in the front view on one side of the part. In the view on the left, check whether the notch appears as it would when seen **from the left** (third angle) or **from the right** (first angle).
**The risk.** If a first-angle drawing is read as third angle, the side and plan views are interpreted as seen from the wrong side, and an asymmetric part can be made as its **mirror image**. A symmetric part survives the error — which is why it can go unnoticed for many drawings before an asymmetric one is scrapped.
**The professional response.** Do not guess: query the drawing and have the projection symbol added at the next issue. Drawing standards require the method of projection to be indicated precisely because of this ambiguity.

*Sanity.* Both conventions describe the same geometry; the only information that distinguishes them is the placement of the views, which is why the symbol matters so much.
:::
:::

::: example How many views does this need? {#ex-nviews}
A cast housing: a $120 \times 90 \times 70\ \mathrm{mm}$ body with a stepped $\varnothing 40$ bore running front-to-back through the $90\ \mathrm{mm}$ depth, four $\varnothing 9$ bolt holes in the front flange parallel to the bore, an internal rib network, and a $\varnothing 12$ oil hole drilled from a machined pad on the top face, inclined at $18^{\circ}$ to the vertical in a vertical plane that is at $30^{\circ}$ to the front plane. Give the view set.
::: solution
**The feature inventory.**
$$
\begin{array}{l l l}
\text{Bore } \varnothing 40 & \text{axis along } y\ (\text{front to back}) & \text{true circle in the front view} \\
\text{Four } \varnothing 9 & \text{axes along } y & \text{true circles in the front view} \\
\text{Bore steps, seal groove, ribs} & \text{internal} & \text{need a section} \\
\text{Oil hole } \varnothing 12 & \text{inclined, in a plane not parallel to VP or the profile plane} & \text{needs an auxiliary view} \\
\text{Machined pad} & 40 \times 30\ \text{on the top face} & \text{true shape in the top view}
\end{array}
$$
**The view set.**
1. **Front view** — the bore and the bolt holes as **true circles**, with the bolt-hole pattern dimensioned here. This is the most characteristic view.
2. **Side view in full section $A\text{–}A$** through the bore axis — the bore's steps, the shoulder, the seal groove, the wall thicknesses and the ribs (cut ribs left unhatched by the usual convention).
3. **Top view** — the machined pad at true shape and the plan position of the oil hole.
4. **Partial auxiliary view** looking normal to the vertical plane that contains the oil hole — the hole's **true angle** of $18^{\circ}$ and its true length.
5. **Detail view $B$ at $2:1$** of the seal groove, which is too small to dimension legibly at the main scale.
**What is deliberately not drawn.** A **bottom view**, if the bottom is a plain machined face that a note and the other views fully describe. A **rear view**, if it shows nothing new. A pictorial on the dimensioned sheet, which adds nothing to the specification.
**The test.** Can every feature be found true-shape or edge-on in some view, and can every dimension be attached to a visible feature? Here: three principal views (one of them sectioned), one auxiliary and one detail.

*Design comment.* The number of views is usually set by the internal and inclined features, not by the external shape.
:::
:::

::: history
**Gaspard Monge** (1746–1818) developed the methods of what he called **descriptive geometry** while teaching at the military engineering school at **Mézières** from the 1760s, using them for fortification problems; the methods were for a time treated as a military secret. He taught them publicly at the new **École normale** in **1794–95** — the lectures were printed in its proceedings — and they appeared as the book *Géométrie descriptive* in **1799**. Monge's method projects the object onto two perpendicular planes and rotates one into the other, which is why first-angle and third-angle drawings differ only in the placement of the views. Both arrangements were used in nineteenth-century practice: continental Europe settled on first angle, and American practice on third angle. National standards followed in the twentieth century — in Britain **BS 308** (first published in **1927**), in the United States the American Standards Association's Y14 drawing standards — and internationally the projection methods are now set out in **ISO 128** and **ISO 5456-2** (**1996**), which accept both first and third angle provided the method is shown by its symbol.
:::

## Where this leads

The views carry the geometry; the **dimensions** that make it manufacturable are [[engineering-graphics/dimensioning]], the **fits** that make it assemble are [[engineering-graphics/tolerances-fits]], and the **datum structure** that makes it inspectable is [[engineering-graphics/geometric-tolerancing]].

::: summary
- Orthographic drawings come from Monge's perpendicular planes hinged flat; first and third angle differ only in where each view is placed, and the drawing must carry the projection symbol.
- In third angle a view goes on the side from which it is seen; in first angle on the opposite side.
- Choose the front view for its information content, not for the object's position in space.
- A face sloped at $\theta$ and edge-on in the front view appears at $\cos\theta$ along the slope in the top view and $\sin\theta$ in the side view; at $25^{\circ}$ the top view is only $9\ \%$ short, which is the danger.
- A hole normal to an inclined face is a true circle in no principal view and needs an auxiliary view.
- An oblique face needs a primary auxiliary for its edge view and a secondary auxiliary for its true shape; a dihedral angle needs the point view of the intersection line.
:::

::: quiz
A drawing shows a view directly below the front view, and that lower view clearly shows the object's mounting feet and drain holes on its underside. What is the convention?
- [ ] First angle — the top view goes below
- [x] Third angle — it is a bottom view, placed below
- [ ] First angle — the bottom view goes below
- [ ] The convention cannot be determined
::: solution
Third angle. In first angle the view placed below the front view is the **top** view and would show the top features; this view shows the **underside**, so it is a view from below — which third angle places below, on the side from which it is seen. The position alone is ambiguous; the content of the view settles it.
:::
:::

## Exercises

::: exercise Conventions {level=1 check="1"}
In which convention is the top view placed below the front view? (Enter 1 for first angle or 3 for third angle.)
::: solution
$1$ — first angle.
:::
:::

::: exercise Foreshortening {level=1 check="0.906"}
A face is sloped $25^{\circ}$ from the horizontal and seen edge-on in the front view. Give the top-view foreshortening factor along the slope. (Enter a ratio.)
::: solution
$\cos 25^{\circ} = 0.906$.
:::
:::

::: exercise Equal foreshortening {level=1 check="45"}
At what slope from the horizontal are the top and side views of such a face equally foreshortened? (Enter the angle in degrees.)
::: solution
$45^{\circ}$, where $\cos\theta = \sin\theta = 0.707$.
:::
:::

::: exercise True length {level=1 check="65.95"}
Give the true length of a line with components $(50,\ 25,\ 35)\ \mathrm{mm}$. (Enter the value in millimetres.)
::: solution
$\sqrt{4350} = 65.95\ \mathrm{mm}$.
:::
:::

::: exercise Views {level=1 check="1"}
What is the minimum number of views for a plain turned part drawn with a centre line and $\varnothing$ dimensions? (Enter a number.)
::: solution
One.
:::
:::

::: exercise Auxiliary {level=2 check="6.84"}
A $\varnothing 16$ hole is drilled normal to a face sloped $32^{\circ}$ from the horizontal, the face being edge-on in the front view. Give the hole's apparent shape in the top and side views, and the error, along the slope, if a $45\ \mathrm{mm}$ centre distance were laid out from its top-view appearance. (Enter the error in millimetres.)
::: solution
$$
\text{top: } 16 \times 16 \cos 32^{\circ} = 16 \times 13.57\ \mathrm{mm}, \qquad
\text{side: } 16 \times 16 \sin 32^{\circ} = 16 \times 8.48\ \mathrm{mm}.
$$
The centre distance appears as $45 \cos 32^{\circ} = 38.16\ \mathrm{mm}$ in the top view, so a dimension of $45$ measured in that view asks for $45 - 38.16 = 6.84\ \mathrm{mm}$ more than is drawn — a $15.2\ \%$ error.
*Sanity.* This is why a face's dimensions are placed on the view that shows it at true size, which for an inclined face is the auxiliary view.
:::
:::

::: exercise Direction cosines {level=2 check="44"}
A hole's axis has direction cosines $0.60$ (with $x$), $0.35$ (with $y$) and an unknown positive value with $z$ (vertical). Find the third, the angle of the axis to the vertical, and the principal view in which the axis appears shortest. (Enter the angle to the vertical in degrees.)
::: solution
$$
n = \sqrt{1 - 0.36 - 0.1225} = \sqrt{0.5175} = 0.719, \qquad \cos^{-1} 0.719 = 44.0^{\circ}.
$$
The axis appears shortest in the view that looks **along** its largest component. The $z$-component is the largest, so the **top** view (looking along $z$) foreshortens it most, to $\sqrt{1 - 0.5175} = 0.695$ of its true length.
*Sanity.* The view that looks along a feature tends to show it as a point; the view that looks across it shows it at nearly true length and is the one to dimension from.
:::
:::

::: exercise Derivation {level=3}
Derive the apparent-area factor $\left| \boldsymbol{n} \cdot \boldsymbol{v} \right|$ for a plane figure, and from it explain why an oblique face needs two auxiliary views.
::: solution
**The area factor.** Let the figure be spanned locally by vectors $\boldsymbol{a}$ and $\boldsymbol{b}$, so its area vector is $\boldsymbol{a} \times \boldsymbol{b} = A \boldsymbol{n}$. Projecting orthogonally along the unit vector $\boldsymbol{v}$ onto the plane normal to $\boldsymbol{v}$ gives $\boldsymbol{a}' = \boldsymbol{a} - (\boldsymbol{a} \cdot \boldsymbol{v}) \boldsymbol{v}$ and $\boldsymbol{b}' = \boldsymbol{b} - (\boldsymbol{b} \cdot \boldsymbol{v}) \boldsymbol{v}$. Expanding, every term of $\boldsymbol{a}' \times \boldsymbol{b}'$ that contains $\boldsymbol{v}$ is perpendicular to $\boldsymbol{v}$, so
$$
\left( \boldsymbol{a}' \times \boldsymbol{b}' \right) \cdot \boldsymbol{v} = \left( \boldsymbol{a} \times \boldsymbol{b} \right) \cdot \boldsymbol{v} = A\, \boldsymbol{n} \cdot \boldsymbol{v} .
$$
Since $\boldsymbol{a}'$ and $\boldsymbol{b}'$ lie in the image plane, their cross product is parallel to $\boldsymbol{v}$, and its magnitude is the projected area: $A' = A \left| \boldsymbol{n} \cdot \boldsymbol{v} \right|$. $\checkmark$
**The construction.** The true shape needs $\left| \boldsymbol{n} \cdot \boldsymbol{v} \right| = 1$, i.e. a viewing direction along the face normal. A principal view has $\boldsymbol{v}$ along a coordinate axis, and an oblique face's normal has three non-zero components, so no principal view gives it. An auxiliary view projected from a principal view has its viewing direction perpendicular to that view's direction (the projectors run parallel to the old image plane), so each step can rotate the viewing direction by $90^{\circ}$ about one axis only:
1. **Primary auxiliary.** Choose the viewing direction along a true-length line in the face. Then $\boldsymbol{n} \cdot \boldsymbol{v} = 0$ and the face appears as an **edge**.
2. **Secondary auxiliary.** From the edge view, look perpendicular to the edge, so that $\boldsymbol{v}$ is along $\boldsymbol{n}$; the face appears at its **true shape**.
One step cannot do both, because a viewing direction perpendicular to a principal direction can coincide with an arbitrary oblique normal only if that normal is itself perpendicular to the principal direction — which is the definition of an inclined (not oblique) face.
*Sanity.* An inclined face, edge-on in a principal view, needs one auxiliary; an oblique face needs two. In a 3D CAD model the same result is obtained by orienting the view normal to the face.
:::
:::

::: exercise Design {level=3}
Specify the view set, sections and notes for an injection-moulded plastic housing $140 \times 90 \times 45\ \mathrm{mm}$ with four internal screw bosses, a $0.8\ \mathrm{mm}$ wall, $1.5^{\circ}$ of draft and a cosmetic top face.
::: solution
**The views.**
1. **Top view** — the cosmetic **A-surface**, with the **parting line** drawn and labelled, and the permitted gate and ejector-pin zones shown.
2. **Front view in full section $A\text{–}A$** through two bosses — the wall, the boss roots and the rib junctions, which is where sink marks form.
3. **End view**, with the draft shown on the external walls.
4. **Detail at $4:1$** of a boss root — its fillet, the boss wall (commonly about $60\ \%$ of the nominal wall, to limit sink) and its draft — because the radii that decide mouldability cannot be dimensioned legibly at the main scale.
**The notes that are the real specification.**
$$
\begin{array}{l l}
\text{Draft} & 1.5^{\circ}\ \text{on all walls, from the draw direction, unless otherwise stated} \\
\text{Wall} & 0.8\ \mathrm{mm}\ \text{nominal, with the tolerance agreed with the moulder} \\
\text{Radii} & \text{internal corners } R 0.4\ (0.5 \times \text{wall}),\ \text{external } R 1.2\ \text{so that the wall stays uniform} \\
\text{Mould marks} & \text{no gate, ejector mark or parting line on the A-surface} \\
\text{Material} & \text{PC/ABS, UV-stabilised, colour and texture by reference (e.g. VDI 3400 Ref 27)} \\
\text{Dimensions} & \text{apply to the moulded part after conditioning; shrinkage allowance is the toolmaker's} \\
\text{Weld lines} & \text{not permitted within } 8\ \mathrm{mm}\ \text{of a boss}
\end{array}
$$
**Three drawing decisions unique to moulding.** **Mind dimensions across the parting line**, which also contain the mismatch between the two tool halves; locate functional features from datums in one tool half where possible. **Draft is part of the geometry**: on a $45\ \mathrm{mm}$ wall a $1.5^{\circ}$ draft changes the width by $45 \tan 1.5^{\circ} = 1.18\ \mathrm{mm}$ per side, so the drawing must say where on the wall a dimension applies. **The A-surface is defined largely by notes**, because "no ejector mark here" cannot be drawn.
**The view deliberately omitted.** A pictorial on the dimensioned sheet; if the moulder needs one, it belongs on a separate sheet or in the 3D model.

*Design comment.* A drawing for a process-dominated part is largely a statement of the process's limits: the views locate the features the process can move — parting line, gate, sink, weld lines, draft.
:::
:::
