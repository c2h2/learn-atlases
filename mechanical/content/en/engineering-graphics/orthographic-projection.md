A drawing is a **lossless compression of a solid into a plane**, and the compression is lossless only if the reader knows the code. That code is **Monge's method** — two perpendicular planes, hinged open flat — invented in 1795 for military engineers and suppressed by the French government for a decade, and every drawing on earth since is either a **third-angle** or a **first-angle** unfolding of it. Get the code wrong and the part is **mirrored**, and a mirrored bracket is not a wrong bracket but a bracket that will not bolt on.

The craft is not drawing the views; it is **choosing** them. The right set of views makes every feature appear at its true shape in exactly one view and edge-on in another, and the wrong set makes the reader construct the object in their head — which costs seconds per feature, and a reader who is constructing is a reader who is guessing.

::: warning Seven projection errors that produce mirrored or unmakeable parts
**Mixing the angle conventions on one drawing.** A drawing with a third-angle title-block symbol and a top view placed **below** the front is not ambiguous, it is **contradictory**, and the machinist will make what the layout says and not what the symbol says. **The layout is the drawing.** **An inclined face with no auxiliary.** A face at $25\ {}^{\circ}$ appears in the front view at $90.6\ \%$ of its true size and in the top view at $42.3\ \%$, and a hole drilled **normal to it** appears as a true circle in **neither** view. Every inclined face demands an auxiliary view, and every drafter who omits one gets a part drilled at the wrong angle. **A view that shows a feature foreshortened when it could show it true.** If a plate's outline can be drawn at true shape in one view, that view is the outline view and every other view is a support. **Dimensions taken from a foreshortened view.** A dimension on a $25\ {}^{\circ}$ face read off the front view is short by $\cos 25\ {}^{\circ}$, and the drafter who puts it there has written a $10\ \%$ error into the part. **A hidden line where a section belongs.** Five hidden lines crossing in a view is a confession that the view is wrong; a section is free and a hidden-line tangle is not. **A missing "this way up" or view-direction arrow.** A symmetric-looking bracket with four views and no projection arrows is a bracket that can be read in four orientations, and only one of them is right. **An auxiliary view with no folding line and no label.** An auxiliary view floats; the **folding line** (the reference edge from which the depths are transferred) is what makes it a projection and not a second sketch, and an unlabelled auxiliary is undimensionable.
:::

## Monge's two planes and the two conventions

::: definition The unfolding, and why there are two answers {#def-monge}
Put the object between an observer and two mutually perpendicular planes: a **vertical plane** VP and a **horizontal plane** HP, meeting at the **reference line** $XY$. Project the object onto VP to get the **front view** and onto HP to get the **top view**. The two views live on perpendicular planes and cannot be drawn together until one plane is **rotated about $XY$** into the other's plane — and there are exactly two ways to rotate.
$$
\begin{array}{l c c l}
\text{Convention} & \text{Object sits in} & \text{Rotation} & \text{Result} \\
\text{Third angle} & \text{between observer and plane} & \text{HP folded up and back} & \text{top view ABOVE the front} \\
\text{First angle} & \text{behind both planes} & \text{HP folded down and away} & \text{top view BELOW the front}
\end{array}
$$
**The rule that never fails.** In **third angle** the view is placed on the **same side as the direction from which it was seen**: look from above and the view goes above. In **first angle** the view is placed on the **opposite side**: look from above and the view goes below. The two layouts are **point-mirror images** of each other about the front view, and the left-side view of one is the right-side view of the other.
**The symbols.** The projection symbol is the front view of a **truncated cone** lying on the drawing's plane, seen from the left, drawn twice: once as the cone itself and once as its **side elevation** — two trapezoids joined by a horizontal line. In the **third-angle** symbol the **small** end of the frustum points to the **left**, the observer's side; in the **first-angle** symbol it points to the **right**. The two symbols are identical except for that reversal, and the way to remember them is that the symbol is drawn **in the same convention as the drawing**, so a third-angle drawing carries a third-angle symbol and the small end faces the way the views are pushed.
**The one that bites.** The United States, Canada, Mexico and (by custom) Japan use third angle; Europe, China, India and the ISO default use first angle. **A drawing with no symbol is a drawing that must be argued about**, and the ISO standard requires the symbol in the title block or an adjacent note.
:::

::: definition Choosing the views {#def-choose}
**The minimum set is the one in which every feature is true-shape in one view and edge-on in another.** The counting rules:
$$
\begin{array}{l c l}
\text{Body of revolution} & 1 & \text{one view with a centre line and } \phi \text{ dimensions} \\
\text{Plate with a flat outline} & 1 + 1 & \text{the outline true-shape, plus one edge view for the thickness} \\
\text{Simple block} & 2\text{–}3 & \text{two if the third dimension is a single number} \\
\text{Bracket with an inclined face} & 3 + 1 & \text{three plus one auxiliary} \\
\text{Housing with internal features} & 2 + 2\text{–}3 & \text{two external plus two or three sections} \\
\text{Shaft with keyways and threads} & 1 + 1 + \text{details} & \text{the side view, one end view, and detail views at a larger scale}
\end{array}
$$
**The front view is chosen by shape and not by position.** The standard says the front view should show the **most features with the fewest hidden lines**, which for a bracket lying on a bench usually means the view from the **side** and not the view from the front of the machine it will be bolted into. Where the assembly orientation is essential, use the **working-position** view and add a **direction arrow** labelled with a letter.
**The four rules of correspondence.**
1. **Widths align vertically** between the front and top views.
2. **Heights align horizontally** between the front and any side or auxiliary view taken from the same direction.
3. **Depths are equal** between the top view and the side view, and are transferred by a **mitre line** at $45\ {}^{\circ}$ or by measuring.
4. **A feature's distance from a reference edge is preserved** in every view that shows that reference edge.
:::

::: definition Auxiliary views: the arithmetic of an inclined face {#def-aux}
A face whose normal makes an angle $\theta$ with the viewing direction projects at
$$
\text{apparent area} = A \cos \theta , \qquad \text{apparent length along the slope} = L \cos \theta ,
$$
and it appears **edge-on** — as a line — in the view whose direction is **perpendicular** to the face's normal, that is, in the view that looks **along** the face.
**The construction of a primary auxiliary.** Given a front view in which the inclined face appears as an edge (a line at $\theta$ to the horizontal):
1. Draw a **folding line** $FF$ parallel to that edge, at a convenient distance.
2. From every corner, project a line **perpendicular to $FF$**.
3. Set each point's distance from $FF$ equal to its distance from the **front-view reference line** in the **top view** — the depths come from the view you are **not** projecting from.
4. The result is the face at its **true shape**, and every hole in it is a **true circle**.
**The two-auxiliary case.** A face that appears as an edge in **neither** the front nor the top view is **oblique**, and its true shape needs two steps: a **primary** auxiliary taken with a folding line **perpendicular** to a true-length line drawn in the face (which gives the face as an edge), then a **secondary** auxiliary with a folding line **parallel** to that edge (which gives the true shape).
**The workhorse numbers.**
$$
\begin{array}{l c c c}
\theta\ (\text{face slope from horizontal}) & \text{front view scale} & \text{top view scale} & \text{auxiliary needed?} \\
0\ {}^{\circ} & 1.000 & 1.000 & \text{no} \\
10\ {}^{\circ} & 0.985 & 0.174 & \text{only if a hole is drilled normal to it} \\
15\ {}^{\circ} & 0.966 & 0.259 & \text{yes} \\
25\ {}^{\circ} & 0.906 & 0.423 & \text{yes} \\
30\ {}^{\circ} & 0.866 & 0.500 & \text{yes} \\
45\ {}^{\circ} & 0.707 & 0.707 & \text{yes, and neither view is trustworthy} \\
60\ {}^{\circ} & 0.500 & 0.866 & \text{yes}
\end{array}
$$
**The rule of thumb.** If a hole is drilled **normal** to a face whose slope exceeds $15\ {}^{\circ}$, the auxiliary view is not optional: in the front view the hole's centre is right but its axis is foreshortened, and in the top view the hole is an ellipse and its centre may be right while its position along the slope is not.
:::

::: widget plot
f: cos(x); sin(x)
x: 0, 90
y: 0, 1
labels: front-view scale; top-view scale
caption: The two foreshortening factors for a face sloped at $x$ degrees from the horizontal. At $25\ {}^{\circ}$ the front view is only $9.4\ \%$ short and looks almost true — which is exactly why an inclined face is the most dangerous feature on a drawing — while the top view is at $42\ \%$. The two curves cross at $45\ {}^{\circ}$, where neither view can be trusted, and either one reaches $1.0$ only when the face is parallel to that view's plane.
:::

::: definition True length, true angle, and the auxiliary sequence {#def-truelen}
A line with components $\left( \Delta x,\ \Delta y,\ \Delta z \right)$ has a true length
$$
L = \sqrt{\Delta x^{2} + \Delta y^{2} + \Delta z^{2}}
$$
and apparent lengths $\sqrt{\Delta x^{2} + \Delta z^{2}}$ in the front view, $\sqrt{\Delta x^{2} + \Delta y^{2}}$ in the top view and $\sqrt{\Delta y^{2} + \Delta z^{2}}$ in the side view. Its inclination to the horizontal and vertical planes is
$$
\sin \alpha_{H} = \frac{\Delta z}{L}, \qquad \sin \alpha_{V} = \frac{\Delta y}{L} .
$$
**A line shows its true length in a view only when it is parallel to that view's plane**, and a **primary auxiliary with a folding line parallel to the line's top-view projection** gives the true length and the true angle to the horizontal in one step.
**The dihedral angle between two planes** requires the **edge view of both**, which requires a folding line parallel to the **line of intersection** of the two planes. A single auxiliary gives it when the intersection line is horizontal or frontal; otherwise it is a two-auxiliary problem.
:::

::: example A line in three views {#ex-truelen}
A hole is drilled from $A \left( 10,\ 20,\ 5 \right)$ to $B \left( 60,\ 45,\ 40 \right)$ in millimetres, where $x$ is right, $y$ is into the page and $z$ is up. Give the true length, the three apparent lengths and the two inclinations, and say which view to dimension it from.
::: solution
**The components.** $\Delta x = 50$, $\Delta y = 25$, $\Delta z = 35$.
**The true length.**
$$
L = \sqrt{50^{2} + 25^{2} + 35^{2}} = \sqrt{2500 + 625 + 1225} = \sqrt{4350} = 65.95\ \mathrm{mm} .
$$
**The apparent lengths.**
$$
\text{front } (x z) = \sqrt{2500 + 1225} = 61.03, \quad
\text{top } (x y) = \sqrt{2500 + 625} = 55.90, \quad
\text{side } (y z) = \sqrt{625 + 1225} = 43.01 .
$$
**The inclinations.**
$$
\sin \alpha_{H} = \frac{35}{65.95} = 0.5307 \ \Rightarrow\ \alpha_{H} = 32.05\ {}^{\circ}, \qquad
\sin \alpha_{V} = \frac{25}{65.95} = 0.3791 \ \Rightarrow\ \alpha_{V} = 22.27\ {}^{\circ} .
$$
**Which view.** **None of the three.** The line is oblique to all of them, so its true length appears in no standard view and its true angle appears in none. The construction is a **primary auxiliary with a folding line parallel to the top-view projection** of $AB$, which gives the true length and the $32.05\ {}^{\circ}$ inclination to the horizontal directly; a **secondary auxiliary with a folding line perpendicular** to that gives the **point view** of the line, which is what you need to show a hole end-on.
**The error if you dimension from the front view.** The front view's $61.03\ \mathrm{mm}$ is $7.5\ \%$ short of the true $65.95$, and a hole length or a face position taken from it is wrong by that much.

*Check.* $\cos^{2} \alpha_{H} + \cos^{2} \alpha_{V}$ is not $1$ for these two angles because $\alpha_H$ and $\alpha_V$ are measured to **planes** and not to axes; the direction cosines are $50 / 65.95 = 0.758$, $25 / 65.95 = 0.379$ and $35 / 65.95 = 0.531$, and $0.758^{2} + 0.379^{2} + 0.531^{2} = 0.575 + 0.144 + 0.282 = 1.001$. $\checkmark$

*Sanity.* The largest direction cosine is the $x$-component, and correspondingly the **front** view is the least wrong at $92.5\ \%$ of true — the general rule that the view whose plane is most nearly parallel to a feature is the one to trust, and the one that will still quietly mislead you by $7\ \%$.
:::
:::

::: example The auxiliary view of a bracket {#ex-aux}
A bracket has a face $80\ \mathrm{mm}$ wide and $50\ \mathrm{mm}$ long, sloped $25\ {}^{\circ}$ from the horizontal, carrying two $\phi 11$ clearance holes at $20\ \mathrm{mm}$ from each end along the slope. Give the face's apparent size in the front and top views, the hole's apparent shape in each, and the auxiliary construction.
::: solution
**The face.** Its true area is $80 \times 50 = 4000\ \mathrm{mm^{2}}$.
$$
\text{front view: } 80 \times \left( 50 \cos 25\ {}^{\circ} \right) = 80 \times 45.32 = 3626\ \mathrm{mm^{2}} \ \left( 90.6\ \% \right)
$$
$$
\text{top view: } 80 \times \left( 50 \sin 25\ {}^{\circ} \right) = 80 \times 21.13 = 1691\ \mathrm{mm^{2}} \ \left( 42.3\ \% \right)
$$
**The holes.** A $\phi 11$ hole drilled **normal** to the face appears as:
$$
\text{front view: an ellipse } 11 \times 11 \cos 25\ {}^{\circ} = 11 \times 9.97\ \mathrm{mm}, \qquad
\text{top view: an ellipse } 11 \times 11 \sin 25\ {}^{\circ} = 11 \times 4.65\ \mathrm{mm}.
$$
**Neither is a circle**, and a drafter who draws a circle in the front view has drawn a hole that is $5.3\ \%$ oval and drilled at $25\ {}^{\circ}$ off the face normal.
**The hole positions.** The $20\ \mathrm{mm}$ from each end is measured **along the slope**. In the front view it appears as $20 \cos 25\ {}^{\circ} = 18.13\ \mathrm{mm}$ and in the top view as $20 \sin 25\ {}^{\circ} = 8.45\ \mathrm{mm}$. A dimension of $20$ placed on the front view therefore asks for a hole $1.87\ \mathrm{mm}$ further along the slope than intended.
**The auxiliary construction.**
1. In the front view the face is an **edge** (a line at $25\ {}^{\circ}$). Draw the folding line $FF$ parallel to it, $40\ \mathrm{mm}$ away.
2. From each corner and each hole centre, project a line **perpendicular to $FF$**.
3. Transfer the **depths** — the $y$-distances — from the **top view**, measuring from the top view's own folding line $XY$.
4. The face appears at $80 \times 50$ true, the holes as $\phi 11$ true circles, and the $20\ \mathrm{mm}$ spacings as $20\ \mathrm{mm}$ true.
5. Label the view **"AUXILIARY FROM A"** with an arrow on the front view, and dimension the face **only** in the auxiliary.

*Check.* The auxiliary's area $4000\ \mathrm{mm^{2}}$ against the front view's $3626$: $3626 / 4000 = 0.9065 = \cos 25\ {}^{\circ}$. $\checkmark$

*Sanity.* The $25\ {}^{\circ}$ face is the drawing's most dangerous feature precisely because the front view is only $9\ \%$ wrong. A drafter eyeballing the front view will not notice, and the part will arrive with holes $1.9\ \mathrm{mm}$ out and $5\ \%$ oval — close enough to be argued about and far enough to fail assembly.
:::
:::

::: example First or third angle? {#ex-angle}
A drawing shows the front view, a view **below** it that looks like a top view, and a view to the **left** of the front that shows the left-hand profile. The title block carries no projection symbol. Determine the convention and the risk.
::: solution
**The test.** A view placed **below** the front view is either a **first-angle top view** (looked from above, placed below) or a **third-angle bottom view** (looked from below, placed below). A view to the **left** of the front is either a **first-angle right-side view** or a **third-angle left-side view**.
**The resolution.** The two views must be read **together**. If the lower view shows the object's **top** features — the tops of bosses, the opening of a pocket — it is a first-angle top view and the drawing is **first angle**. If it shows the object's **bottom** features — a mounting foot, a drain hole, a machined pad — it is a third-angle bottom view and the drawing is **third angle**.
**The second test, and the one that never fails.** Look for an **asymmetric** feature — a notch on one side. In first angle the left-side view of the object appears on the **right** of the front view; in third angle it appears on the **left**. So: a view on the **left** of the front that shows the **left** profile is third angle; a view on the **left** that shows the **right** profile is first angle.
**The risk.** If the drawing is first angle and is read as third, the part is **mirrored left-to-right**, and a mirrored bracket with an offset boss and an asymmetric hole pattern will not fit. If the part is a **shaft or a symmetric plate**, nothing happens at all — which is why the error survives a hundred drawings and then stops an assembly.
**The professional response.** Do not guess. **Ask, and get it in writing**, and add the projection symbol to the drawing when you re-issue it. The ISO drawing-frame standard makes the symbol mandatory precisely because the cost of the ambiguity is a scrapped machining run.

*Sanity.* The reason the two conventions survived a century of standardisation attempts is that each is **mechanically natural** in its own tradition: first angle is "the shadow on the far wall" and third angle is "the trace on the near glass", and a drafter trained on one cannot quite believe the other. The compromise the standards settled on — allow both, require the symbol — is the correct engineering answer and depends entirely on the symbol being drawn.
:::
:::

::: example How many views does this need? {#ex-nviews}
A cast housing: a $120 \times 90 \times 70\ \mathrm{mm}$ body with a $\phi 40$ bore through the $90\ \mathrm{mm}$ dimension, four $\phi 9$ bolt holes in the ends, an internal rib network, and a $\phi 12$ oil hole drilled at $18\ {}^{\circ}$ from a machined pad on the top face. Give the view set.
::: solution
**The feature inventory.**
$$
\begin{array}{l l l}
\text{Bore } \phi 40 & \text{axis along } y & \text{true circle in the side view} \\
\text{Four } \phi 9 & \text{axes along } y & \text{true circles in the side view} \\
\text{Rib network} & \text{internal, in the } xz \text{ plane} & \text{needs a section} \\
\text{Oil hole } \phi 12 & \text{at } 18^{\circ} \text{ from vertical} & \text{oblique; needs an auxiliary} \\
\text{Machined pad} & 40 \times 30\ \text{on the top face} & \text{true shape in the top view}
\end{array}
$$
**The view set — five views and one detail.**
1. **Front view, partly sectioned.** The body's outline, the bore as hidden lines, and a **broken-out section** over the ribs so the rib network reads without a full section.
2. **Side view (the end view).** The $\phi 40$ bore and the four $\phi 9$ holes as **true circles**, with the bolt-circle position dimensioned here. This is the **principle view** and the front view is chosen to be consistent with it.
3. **Top view.** The machined pad at true shape, the oil hole's **plan** position, and the overall $120 \times 90$.
4. **Section $A\text{–}A$ through the bore axis.** The bore's steps, the shoulder, the seal groove and the wall thicknesses, with the ribs cut through.
5. **Auxiliary view from the arrow on the top view**, showing the $18^{\circ}$ oil hole **end-on** and the pad at true shape with the hole's true position.
6. **Detail view $B$ at $2 : 1$** of the seal groove, because a $1.5\ \mathrm{mm}$-wide groove cannot be dimensioned legibly at $1 : 2$.
**The three things deliberately not drawn.** A **bottom view** — the bottom is a single machined face and one note, "MACHINED FLAT, $\mathrm{Ra}\ 3.2$", replaces it. A **rear view** — nothing is there. A **pictorial** — the housing is a casting and the pattern-maker will want one, but the pictorial belongs on a **separate** sheet, because a pictorial on a dimensioned drawing invites a dimension to be taken from it.
**The count.** Five views, one detail, one section, one auxiliary — and the answer to "is that enough?" is the test in the definition: **can every feature be found true-shape or edge-on in some view, and can every dimension be attached to a real edge?**

*Design comment.* The general rule is that **the number of views is set by the internal features and not by the external shape**. A housing whose outside is a box and whose inside is a maze needs two views of the box and four sections of the maze, and the drafter who draws six external views of the box has drawn the drawing nobody needs.
:::
:::

::: history
**Gaspard Monge**'s *Géométrie descriptive* was begun in 1770, taught at the **Mézières** military school in 1794, and published in 1799 only after the French government lifted the classification that had kept it secret for a decade as a state instrument of fortification design; its **double plane of projection** and its **hinged rotation about the ground line** are the reason a first-angle and a third-angle drawing are mirror images and nothing else. **The angle dispute** is a 19th-century industrial schism: the **English and American** shops, drawing the object between the observer and the glass, developed third angle; the **French and German** shops, drawing the shadow on the far wall, kept first angle; **Buckminster Fuller**'s 1920s-30s campaigns for a single American standard and the **ANSI Y14.3** revision of 1958 that made the **projection symbol mandatory** in the title block are the reason the symbol exists. **The auxiliary view** and the whole apparatus of descriptive geometry — the point view of a line, the edge view of a plane, the true shape of an oblique face — is **Monge**'s and his student **Jean-Nicolas Poncelet**'s, and was taught as a year-long course to every engineer until the 1960s, when it was cut from curricula on the argument that a computer could do it; the recurring 21st-century complaint from manufacturing engineers that graduates cannot read a drawing is the invoice for that cut. **The section convention** — the $45\ {}^{\circ}$ cross-hatch at a $3\ \mathrm{mm}$ pitch, standardised so that a section could be recognised at a glance through a stack of rolled-up drawings — dates from the **British Standards Institution**'s 1901 provisional general-terms specification and the **ASA** Y14 series of 1940, itself a wartime standardisation drive. **The view-selection rule** "the front view shows the most features with the fewest hidden lines" is from **John William Courtney**'s and **Thomas Ewing**'s 19th-century drafting texts and was restated in every edition of **Hill**'s and **Hall**'s *Mechanical Drawing* between 1914 and 1960.
:::

## Where this leads

The views carry the geometry; the **dimensions** that make it manufacturable are [[engineering-graphics/dimensioning]], the **fits** that make it assemble are [[engineering-graphics/tolerances-fits]], and the **datum structure** that makes it inspectable is [[engineering-graphics/geometric-tolerancing]].

::: summary
- A drawing is Monge's two planes hinged open, and the hinge direction is the first-angle or third-angle convention; the layout, not the symbol, is what the machinist reads.
- Choose the front view for shape and feature count, not for the object's position in space.
- A face at $\theta$ projects at $\cos\theta$ in one view and $\sin\theta$ in the other; at $25\ {}^\circ$ the front view is only $9\ \%$ wrong, which is the danger.
- A hole normal to an inclined face is a true circle in no standard view and demands an auxiliary.
- A line or face oblique to all three planes needs a primary auxiliary for the edge view and a secondary for the true shape.
- The number of views is set by the internal features, and a hidden-line tangle is a sign that a section is cheaper.
:::

::: quiz
A drawing shows a view directly below the front view, and that lower view clearly shows the object's mounting feet and drain holes. What is the convention?
- [ ] First angle — the top view goes below
- [x] Third angle — it is a bottom view, placed below
- [ ] First angle — the bottom view goes below
- [ ] The convention cannot be determined
::: solution
Third angle. In first angle the view placed below the front view is the **top** view, so it would show the top features; here it shows the **bottom** features, so it is a third-angle **bottom** view, which third angle places below because the view goes on the same side as the direction of sight. The rule is that the lower view is either a first-angle top view or a third-angle bottom view, and the **content** of the view and not its position settles which.
:::
:::

## Exercises

::: exercise Conventions {level=1 check="1"}
In which convention is the top view placed below the front view?
::: solution
First angle.
:::
:::

::: exercise Foreshortening {level=1 check="0.906"}
Give the front-view scale of a face sloped $25\ {}^{\circ}$ from the horizontal.
::: solution
$\cos 25\ {}^{\circ} = 0.906$.
:::
:::

::: exercise Oblique face {level=1 check="0.707"}
At what slope from the horizontal are the front and top views of a face equally foreshortened?
::: solution
$45\ {}^{\circ}$, where both are at $0.707$.
:::
:::

::: exercise True length {level=1 check="65.95"}
Give the true length in millimetres of a line with components $\left( 50, 25, 35 \right)$.
::: solution
$\sqrt{4350} = 65.95\ \mathrm{mm}$.
:::
:::

::: exercise Views {level=1 check="1"}
What is the minimum number of views for a body of revolution with a centre line and $\phi$ dimensions?
::: solution
One.
:::
:::

::: exercise Auxiliary {level=2}
A $\phi 16$ hole is drilled normal to a face sloped $32\ {}^{\circ}$ from the horizontal. Give its apparent shape and size in the front and top views, and the error in a $45\ \mathrm{mm}$ centre distance measured along the slope if it is dimensioned from the front view.
::: solution
$$
\text{front: } 16 \times 16 \cos 32\ {}^{\circ} = 16 \times 13.56\ \mathrm{mm}, \qquad
\text{top: } 16 \times 16 \sin 32\ {}^{\circ} = 16 \times 8.48\ \mathrm{mm}.
$$
The centre distance appears as $45 \cos 32\ {}^{\circ} = 38.17\ \mathrm{mm}$ in the front view, so a dimension of $45$ placed there asks for a hole $45 - 38.17 = 6.83\ \mathrm{mm}$ too far along the slope — a $15\ \%$ error.
*Sanity.* This is the arithmetic behind the rule that **no dimension is ever taken from a foreshortened view**, and it is why the auxiliary view carries the face's dimensions and nothing else does.
:::
:::

::: exercise Direction cosines {level=2}
A hole's axis has direction cosines $0.60$, $0.35$ and unknown. Find the third, the angle to the vertical, and the view in which the axis appears shortest.
::: solution
$$
l^{2} + m^{2} + n^{2} = 1 \ \Rightarrow\ n = \sqrt{1 - 0.36 - 0.1225} = \sqrt{0.5175} = 0.7194 ,
$$
so the angle to the vertical ($z$) is $\cos^{- 1} 0.7194 = 44\ {}^{\circ}$. The axis appears **shortest** in the view along which its component is **largest** — the $z$-component of $0.719$ is the largest, so the **top view** (looking along $z$) foreshortens it most, to $\sqrt{1 - 0.5175} = 0.695$ of its true length.
*Sanity.* The rule is counter-intuitive and worth fixing: the view that looks **along** the feature is the one that shows it as a **point**, and the view that looks **across** it is the one to dimension from.
:::
:::

::: exercise Derivation {level=3}
Derive the apparent-area factor $A \cos \theta$ for a plane figure, and from it the two-auxiliary construction for the true shape of an oblique face.
::: solution
**The area factor.** A plane figure of area $A$ with unit normal $\boldsymbol{n}$, projected along the unit direction $\boldsymbol{v}$ onto a plane normal to $\boldsymbol{v}$, has
$$
A^{\prime} = A \left| \boldsymbol{n} \cdot \boldsymbol{v} \right| .
$$
Proof: the figure's area vector is $\boldsymbol{A} = A \boldsymbol{n}$, and the projected area is the component of that vector along the projection direction, because the projection of a parallelogram spanned by $\boldsymbol{a}$ and $\boldsymbol{b}$ onto the plane normal to $\boldsymbol{v}$ is spanned by $\boldsymbol{a}^{\prime} = \boldsymbol{a} - \left( \boldsymbol{a} \cdot \boldsymbol{v} \right) \boldsymbol{v}$ and $\boldsymbol{b}^{\prime}$, whose cross product's component along $\boldsymbol{v}$ is
$$
\left( \boldsymbol{a}^{\prime} \times \boldsymbol{b}^{\prime} \right) \cdot \boldsymbol{v} = \left( \boldsymbol{a} \times \boldsymbol{b} \right) \cdot \boldsymbol{v} ,
$$
which is the signed area times $\cos$ of the angle between the figure's normal and $\boldsymbol{v}$. $\checkmark$
**The construction.** The true shape requires $\left| \boldsymbol{n} \cdot \boldsymbol{v} \right| = 1$, i.e. a viewing direction **along the face normal**. A standard view has $\boldsymbol{v}$ along a coordinate axis, and an oblique face's normal has all three components non-zero, so **no** standard view gives it. The two-step construction reaches it by rotations:
1. **Primary auxiliary.** Rotate the viewing direction within the horizontal plane until it is **perpendicular** to $\boldsymbol{n}$ — achievable by taking a folding line **perpendicular to the top-view projection of a true-length line drawn in the face**. The face then satisfies $\boldsymbol{n} \cdot \boldsymbol{v} = 0$ and appears at $A \cos 90\ {}^{\circ} = 0$: an **edge**.
2. **Secondary auxiliary.** From the edge view, take a folding line **parallel** to the edge, which puts the new viewing direction along $\boldsymbol{n}$, and the face appears at $A \cos 0 = A$: the **true shape**.
**The number of auxiliary views an oblique face needs is therefore two, and never one** — because one rotation can bring the normal into the image plane but not onto the viewing direction.
*Sanity.* This is why a drafter confronted with a doubly-curved or oblique face says "I need two auxiliaries", and why the same face on a **model** is trivial: the model has no projection at all.
:::
:::

::: exercise Design {level=3}
Specify the complete view set, sections and notes for an injection-moulded plastic housing $140 \times 90 \times 45\ \mathrm{mm}$ with four internal bosses, a $0.8\ \mathrm{mm}$ wall, $1.5\ {}^{\circ}$ of draft, and a visible top face.
::: solution
**The views.**
1. **Top view** — the **A-face**, cosmetic, with the mould's **parting line** drawn as a type-E phantom line and the ejector-pin and gate locations shown as **reference** dimensions in parentheses.
2. **Front view, full section $A\text{–}A$** through the four bosses, showing the wall, the boss roots, the rib junctions and the **sink-mark risk** zones.
3. **End view** with the draft angles shown on the two external walls.
4. **Detail at $4 : 1$** of a boss root: the $0.5\ \mathrm{mm}$ fillet, the $60\ \%$ root wall and the $1.5\ {}^{\circ}$ draft, because a mouldability defect lives at that radius and cannot be dimensioned at $1 : 2$.
**The notes that are the real specification.**
$$
\begin{array}{l l}
\text{Draft} & 1.5\ {}^{\circ}\ \text{on all walls, measured from the draw direction, } \pm 0.5^{\circ} \\
\text{Wall} & 0.8\ \mathrm{mm}\ \text{nominal, } \pm 0.08\ \mathrm{mm}\ \text{on the A-face, } \pm 0.15\ \text{elsewhere} \\
\text{Radii} & \text{internal } R 0.4\ (\ge 0.5 \times \text{wall}), \text{ external } R 0.8\ \text{concentric with the internal} \\
\text{Mould marks} & \text{no gate, ejector pin or parting line on the A-face} \\
\text{Material} & \text{PC/ABS, UV-stabilised, colour RAL 7035, texture VDI 27} \\
\text{Shrink} & 0.5\ \%\ \text{linear; all dimensions scaled and toleranced after shrink} \\
\text{Weld lines} & \text{no weld line within } 8\ \mathrm{mm} \text{ of a boss or a screw}
\end{array}
$$
**The three drawing decisions that are unique to moulding.** **The drawing is dimensioned at the parting line**, because that is where the two halves of the tool meet and a dimension taken across it accumulates the mismatch tolerance of $\pm 0.1\ \mathrm{mm}$. **The draft is a dimension and not a modelling assumption** — a wall drawn at $90\ {}^{\circ}$ and moulded at $1.5\ {}^{\circ}$ is a part whose dimensions at the top are $1.2\ \mathrm{mm}$ off on a $45\ \mathrm{mm}$ height. **The A-face is defined by a note and not by a view**, because the drawing cannot say "no ejector pin here" except in words.
**The one view deliberately omitted.** A pictorial. A moulding drawing with a pictorial on it will be quoted from the pictorial by a supplier who has not read the section, and the section is where the part actually is.

*Design comment.* The general rule is that **a drawing for a process-dominated part is a statement of the process and its defects**, and the views are there to locate the features that the process can move — the parting line, the gate, the sink, the weld line, the draft — and not the features it cannot.
:::
:::
