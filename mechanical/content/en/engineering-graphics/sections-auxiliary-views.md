A section is a **useful fiction**: the drawing shows the part as if it had been sawn through, and it is the clearest way to describe an internal feature without a forest of hidden lines. Its conventions are not decoration — each one exists so that a reader can tell solid from space, one part from another, and which way the cut was viewed.

The section's power and its danger are the same thing. A section reveals the inside and **removes part of the outside**: the cutting plane takes away faces that locate the features, and the reader must reconstruct the solid from a slice. The craft is choosing the **fewest cuts** that reveal everything, and labelling them so that no reader has to guess which part was removed.

::: warning Seven sectioning errors that get parts made wrong
**Hatching a rib, web, spoke or shaft cut lengthwise.** A rib cut along its length and hatched reads as a **solid wall** filling the whole space, and the reader cannot tell a $6\ \mathrm{mm}$ rib from a solid block. By convention, **ribs, webs, spokes, shafts, keys, pins, bolts, nuts, washers, rivets and rolling elements cut lengthwise are not hatched.** **Hatching a section too thin to hatch.** A thin cut area — a sheet-metal wall, a gasket, a thin-walled tube at small scale — may be **filled solid**, and adjacent filled sections are separated by a white gap of at least $0.7\ \mathrm{mm}$ (ISO 128). **Two adjacent parts hatched alike.** In an assembly section the hatching separates the parts; two adjacent parts with the same angle and spacing read as **one part**. **An unlabelled cutting plane.** Where the position of a section is not obvious, the cutting plane must be shown, lettered and given arrows for the direction of sight; a section viewed from the wrong side is a **mirror image**. **Hidden lines left in a section.** Once the cut reveals a feature its hidden lines are noise, and they bury any hidden line that is still needed. **A dimension placed on a section that belongs on an external view.** A bolt-circle diameter appears as a true circle in the end view and belongs there. **A stepped or bent cutting plane that is not shown.** An offset or aligned section is drawn as if the plane were flat; if the cutting-plane line with its changes of direction is not drawn, the reader cannot know which features came from which plane.
:::

## The section family

::: definition The kinds of section {#def-sections}
$$
\begin{array}{l l l l}
\text{Section} & \text{Cut} & \text{Used for} & \text{Note} \\
\text{Full} & \text{one plane, right through} & \text{asymmetric internals} & \text{the default} \\
\text{Half} & \text{a quarter removed} & \text{symmetric parts} & \text{external view and section in one} \\
\text{Offset} & \text{parallel planes joined by steps} & \text{features not in one plane} & \text{drawn as if one plane} \\
\text{Broken-out (local)} & \text{a small area bounded by a freehand line} & \text{one local feature} & \text{no cutting-plane line needed} \\
\text{Revolved} & \text{a profile rotated into the view} & \text{arms, spokes, rolled sections} & \text{outlined in thin lines on the view} \\
\text{Removed} & \text{a profile taken out and placed aside} & \text{a small profile, often enlarged} & \text{labelled and placed near its plane} \\
\text{Aligned} & \text{two intersecting planes, one rotated into the other} & \text{radial arms, holes on a circle} & \text{cutting plane shown with its bend} \\
\text{Auxiliary} & \text{a plane at an angle to the principal planes} & \text{an inclined internal feature} & \text{follows the auxiliary view} \\
\text{Assembly} & \text{any of the above, on an assembly} & \text{how parts fit} & \text{extra rules, below}
\end{array}
$$
**The half-section saves a view.** A symmetric bearing housing needs one view with a half-section instead of one external view plus one full section; the axis of symmetry is drawn as a **centre line**, not as a visible edge, and hidden lines are omitted from both halves.
**The conventional break shortens the drawing, never the dimension.** A $2.8\ \mathrm{m}$ shaft with features at its ends can be drawn with its plain middle removed; the overall dimension still states the true length. The break is placed where **nothing** is — never across a chamfer, a thread run-out or a keyway.
**The revolved section** is drawn **on** the view, outlined in thin continuous lines; it is how an arm, a spoke or a rolled section is shown: the elevation gives the length and the revolved profile gives the cross-section.
:::

::: definition What is not hatched {#def-never}
Cut **lengthwise** — with the cutting plane running along the axis or the length — these are conventionally drawn **unhatched**:
$$
\begin{array}{l l}
\text{Shafts, spindles, pins, axles} & \text{a hatched shaft reads like a hollow part or a plate} \\
\text{Ribs, webs, spokes, arms} & \text{a hatched rib reads as a solid wall} \\
\text{Bolts, screws, studs, nuts, washers, rivets, keys, dowels} & \text{standard parts, fully described elsewhere} \\
\text{Balls and rollers of rolling bearings} & \text{the rings are hatched, the rolling elements are not}
\end{array}
$$
**Cut across** — a rib cut through its thickness, a shaft cut perpendicular to its axis — these **are** hatched, because the cut then shows the cross-section that the reader needs.
**Making an unhatched rib visible.** Where it matters to show that a rib lies in the cutting plane, ASME practice allows **alternate hatching**: every other hatch line of the adjacent section is continued across the rib, and the rib's edge is drawn as a hidden line. ISO practice usually relies on a removed or revolved section through the rib to show its thickness.
**Thin sections.** Cut areas too narrow to hatch may be filled solid; adjacent filled areas are separated by a gap of at least $0.7\ \mathrm{mm}$ so that they still read as separate parts.
:::

::: definition Hatching {#def-hatch}
**General hatching** is drawn with thin continuous lines, normally at $45^{\circ}$ to the main outline or to an axis of symmetry, with a spacing chosen to suit the size of the area (ISO 128). Material is **not** reliably conveyed by hatching style — it is stated in the title block or the parts list — although some industries and older standards use symbolic patterns for non-metals, insulation, concrete and the like.
**The hatching rules.**
1. **One part, one hatching**: the same angle and spacing in every section of that part on the drawing.
2. **Adjacent parts, different hatching**: change the **direction** first ($45^{\circ}$ against $135^{\circ}$), then the **spacing**, or offset the lines; a third part next to two others can use $30^{\circ}$ or $60^{\circ}$.
3. **Avoid hatching parallel to an outline** of the area; change the angle so that the hatching does not merge with an edge.
4. **Interrupt the hatching** for a dimension value or a note placed within it, rather than letting lines cross the text.
5. **Large areas** may be hatched only along their boundary.
:::

::: definition Assembly sections {#def-assembly}
An assembly section shows how the parts fit together, and adds three rules.
1. **Standard parts are not cut.** Bolts, nuts, washers, pins, keys and shafts lying in the cutting plane are drawn **whole** and unhatched.
2. **Adjacent parts are hatched differently**, as above.
3. **Fits are drawn at nominal size.** A $\varnothing 20\ \mathrm{H}7/\mathrm{g}6$ running fit has a maximum clearance of only $0.041\ \mathrm{mm}$, invisible at any drawing scale, so the shaft and bore are drawn as **one line**; the fit is stated by its tolerance class, not shown by a gap. Clearance holes, by contrast, are drawn at their real, visible size.
**The thread convention (ISO 6410-1).** For an **external** thread, the crests (major diameter) are drawn with thick continuous lines and the roots (minor diameter) with thin continuous lines. For an **internal** thread in section, the crests (minor diameter) are thick and the roots (major diameter) thin, and the hatching runs to the crest line. The end of the full thread is a thick line. In an assembly, the **external thread covers the internal thread**: where a screw is in a tapped hole, only the screw's thread is drawn. A blind tapped hole is drawn with the drilled hole deeper than the thread and the drill point as a $120^{\circ}$ cone.
$$
\begin{array}{l l l}
\text{Feature} & \text{Line} & \text{Example: } M 12 \text{ in aluminium, } 24\ \mathrm{mm}\ \text{full thread} \\
\text{Drilled hole} & \text{thick (the crest of the internal thread), with the } 120^{\circ} \text{ point} & \varnothing 10.2\ \text{to a depth of about } 30\ \mathrm{mm} \\
\text{Full-thread depth} & \text{thick thread-limit line} & 24\ \mathrm{mm}\ (2d) \\
\text{Thread roots} & \text{thin, at the major diameter } 12 & \text{to the thread limit}
\end{array}
$$
**Further practice in assembly sections.** Hidden lines are omitted. Rolling bearings may be drawn in the simplified or symbolic representation of ISO 8826-1 instead of in full detail. Parts behind the cutting plane are shown only where they help.
:::

::: widget plot
f: 6 - (pi/2)*(1.5 + 1.5*x)
x: 0.3, 0.5
y: 2.3, 3.0
labels: bend deduction (mm)
caption: The bend deduction of a $90^{\circ}$ bend in $1.5\ \mathrm{mm}$ sheet at an inside radius of $1.5\ \mathrm{mm}$, against the neutral-axis factor $K$ on the horizontal axis. Moving $K$ from $0.33$ to $0.50$ lowers the deduction from $2.87$ to $2.47\ \mathrm{mm}$ — $0.4\ \mathrm{mm}$ per bend, or $0.8\ \mathrm{mm}$ on a part with two bends — which is why a flat pattern's $K$ is confirmed on a first article rather than trusted from a table.
:::

## Auxiliary and special views

::: definition The auxiliary view family {#def-auxfam}
$$
\begin{array}{l l l}
\text{View} & \text{How obtained} & \text{Distances transferred from} \\
\text{Primary auxiliary} & \text{projected from a principal view} & \text{a principal view adjacent to that one} \\
\text{Secondary auxiliary} & \text{projected from a primary auxiliary} & \text{the view the primary was projected from} \\
\text{Partial auxiliary} & \text{only the inclined feature, bounded by a break} & \text{as above} \\
\text{Detail view} & \text{an enlarged portion, labelled with a letter and scale} & \text{the parent view} \\
\text{Removed section} & \text{a profile taken out and placed aside} & \text{the parent view} \\
\text{Rotated view} & \text{a view rotated on the sheet, with a note} & \text{the parent view}
\end{array}
$$
**The transfer rule, which is the whole construction.** A point's distance from the **new** reference line equals its distance from the **previous** reference line measured in the view **two steps back** — the view adjacent to the one you are projecting from. A primary auxiliary projected from the front view takes its **depths** from the top view; a secondary auxiliary projected from that primary takes its distances from the **front** view. Measured from the wrong view, the auxiliary comes out distorted or mirrored and may still look plausible.
**The rotated view.** A view that is not in its projected position, or that has been turned on the sheet, is identified by a letter and, where necessary, the angle and direction of rotation, so that the reader can relate it to the other views. It is fine for shape; dimensions that depend on the true angle should not be scaled from it.
**The developed view** unfolds a bent or formed part into one plane — a sheet-metal **flat pattern**, a pipe run — and shows the bend lines, the bend angles and inside radii, and the developed length.
:::

::: definition Sheet-metal development arithmetic {#def-develop}
A flat pattern's length is the sum of the **flat lengths** of the legs plus the **bend allowance** of each bend. The bend allowance is the arc length of the **neutral axis**, which in bending shifts from the mid-thickness towards the inside of the bend; its position is expressed by the factor $K$ ($0 < K \le 0.5$), the fraction of the thickness from the inside surface.
$$
BA = \frac{\pi}{180}\, \theta \left( R + K t \right) , \qquad
SB = \left( R + t \right) \tan \frac{\theta}{2} , \qquad
BD = 2\, SB - BA ,
$$
where $\theta$ is the **bend angle** (the angle through which the sheet is bent, $90^{\circ}$ for a right-angle bracket), $R$ the inside radius, $t$ the thickness, $SB$ the **outside setback** (from the virtual sharp of the outside surfaces to the tangent points) and $BD$ the **bend deduction**, subtracted from the sum of the outside-dimensioned legs.
Illustrative values for $t = 1.5\ \mathrm{mm}$ and a $90^{\circ}$ bend (actual $K$ depends on material, tooling and $R/t$):
$$
\begin{array}{l c c c c}
\text{Process} & K & R / t & R\ (\mathrm{mm}) & BD\ (\mathrm{mm}) \\
\text{Air bend, mild steel} & 0.33 & 1.0 & 1.5 & 2.87 \\
\text{Air bend, stainless} & 0.36 & 1.5 & 2.25 & 3.12 \\
\text{Bottom bend} & 0.42 & 0.8 & 1.2 & 2.53
\end{array}
$$
**The rule that saves the part.** Every sheet material has a **minimum inside bend radius**, depending on alloy, temper, thickness and the bend direction relative to the rolling direction; it is roughly $1t$ or less for mild steel and considerably larger for hard aluminium tempers. A radius below the minimum cracks the **outside** of the bend, and the crack is usually worse when the bend line runs parallel to the rolling direction.
:::

::: example Holes on a bolt circle and the aligned section {#ex-offset}
A bearing end cover has six $\varnothing 13$ bolt holes, equally spaced on a $180\ \mathrm{mm}$ bolt circle, and a $\varnothing 60$ centre bore. The drafter wants one section that shows the centre bore and the bolt-hole form. Give the cutting plane and the conventions.
::: solution
**The simple answer.** With six equally spaced holes, a straight plane through the axis passes through **two diametrically opposite holes** (at $0^{\circ}$ and $180^{\circ}$). A full section on that plane shows the bore and two holes at their true form and true radius — nothing more is needed.
**The aligned section.** With an odd number of holes (five, say), no straight plane through the axis passes through two holes. The convention is then an **aligned section**: the cutting plane runs through the axis and bends to pass through a hole, and the part of the plane through that hole is **rotated** into the main plane before projecting. The hole then appears at its **true radius** from the axis, as if it were diametrically opposite another — a deliberate departure from true projection that makes the section easier to read.
**The offset section** is the alternative for features that do not lie on radial lines: the plane is stepped through them with parallel segments joined by right-angled steps, and the section is drawn as though the segments were one plane.
**The cutting-plane line.** ISO 128 shows the cutting plane by a long-dashed dotted **narrow** line, made **thick** at its ends and at every change of direction, with the letters $A$ at the ends and arrows for the direction of sight; the section is titled $A\text{–}A$.
**Where the bolt circle is dimensioned.** In the **end view**, where all six holes appear as true circles: "$6 \times \varnothing 13$ EQUALLY SPACED ON $\varnothing 180$". Not on the section.

*Check.* For six holes the chord between neighbours is $2 \times 90 \sin 30^{\circ} = 90\ \mathrm{mm}$ — equal to the radius — and the chord lies $90 \cos 30^{\circ} = 77.94\ \mathrm{mm}$ from the axis. $\checkmark$

*Sanity.* The chord of a $60^{\circ}$ arc equalling the radius is why a six-hole pattern can be stepped out with dividers set to the radius.
:::
:::

::: example A long shaft and the conventional break {#ex-break}
A ground steel shaft is $2{,}800\ \mathrm{mm}$ long: a $\varnothing 60$ body $2{,}200\ \mathrm{mm}$ long between two $\varnothing 55$ journals, each $300\ \mathrm{mm}$ long, and a keyway for an $18\ \mathrm{mm}$ key, $70\ \mathrm{mm}$ long, centred $450\ \mathrm{mm}$ from the left end (in the body). Give the layout with a conventional break, and the main dimensions.
::: solution
**Is a break needed?** At $1:10$ the shaft is $280\ \mathrm{mm}$ long on the paper, which fits on an A3 sheet; the whole shaft can be drawn, but the $\varnothing 55$/$\varnothing 60$ steps would be tiny, so details at a larger scale would still be needed. At $1:5$ it is $560\ \mathrm{mm}$ and does not fit an A3 sheet ($420\ \mathrm{mm}$ wide), so a break is needed.
**The break at $1:5$.** Remove part of the plain body between the keyway (which ends at $485\ \mathrm{mm}$) and the right-hand journal (which starts at $2{,}500\ \mathrm{mm}$) — for example $1{,}500\ \mathrm{mm}$ of shaft — leaving $1{,}300\ \mathrm{mm}$, i.e. $260\ \mathrm{mm}$ of paper. The break lines are narrow freehand or zigzag lines (ISO 128-2 line type 01.1), drawn only across the plain body.
**The dimensions.**
$$
\begin{array}{l l}
2{,}800 & \text{overall, dimensioned across the break as if unbroken} \\
\varnothing 60\ \mathrm{h}6\ (0 / - 0.019) & \text{the body, if it carries a hub} \\
\varnothing 55\ \mathrm{g}6\ (- 0.010 / - 0.029) & \text{each journal (for example in plain bearings)} \\
300 & \text{each journal length, from the shaft ends} \\
\text{keyway } 18\ \mathrm{N}9,\ \text{depth } 7.0,\ \text{length } 70 & \text{centred } 450\ \text{from the left end} \\
1.5 \times 45^{\circ} & \text{end chamfers} \\
Ra\ 0.4\text{–}0.8\ \text{on the journals} & \text{with undercuts at the shoulders for the grinding wheel}
\end{array}
$$
The keyway's width and depth follow the key standard for a $\varnothing 60$ shaft (for example DIN 6885-1: key $18 \times 11$, shaft keyway depth $7.0$); a removed section through the keyway shows its depth.
**The one thing that must not be done.** Placing the break between the keyway and the left end, so that the keyway's $450\ \mathrm{mm}$ position has to be dimensioned across the break when it could be dimensioned on unbroken shaft.

*Sanity.* A break is harmless for dimensions because a drawing is never scaled; it is the **proportions** that it falsifies, which is why it is used only on plain, uniform lengths.
:::
:::

::: example An assembly section: a bearing in a housing {#ex-assembly}
A $6210$ deep-groove ball bearing on a rotating shaft sits in a cast housing and is retained by a cover plate and six equally spaced screws. Give the section and the conventions it must obey.
::: solution
**The bearing.** A $6210$: $\varnothing 50$ bore, $\varnothing 90$ outside diameter, $20\ \mathrm{mm}$ wide, ring chamfer $r_{s\,\min} = 1.1\ \mathrm{mm}$.
**The section.**
1. **The cutting plane** passes through the shaft axis. With six equally spaced screws, a plane through the axis also passes through two opposite screws, so a single straight plane suffices.
2. **The rings are hatched, the balls are not.** One ball appears on each side of the axis, drawn as a full unhatched circle; alternatively the bearing is drawn in the simplified representation of ISO 8826-1.
3. **The screws and the shaft are drawn whole and unhatched.**
4. **The housing and the cover are hatched in opposite directions**, and the bearing rings in a third hatching (different spacing or angle).
5. **The fits are drawn at nominal size.** The inner ring rotates with the shaft, so the shaft seat is $\varnothing 50\ \mathrm{k}5$ ($+0.013/+0.002$), an interference of $2$ to $25\ \mu\mathrm{m}$ with the bore ($0/-0.012$); the outer ring is stationary, so the housing bore is $\varnothing 90\ \mathrm{H}7$ ($+0.035/0$), a clearance of $0$ to $50\ \mu\mathrm{m}$ with the outer ring ($0/-0.015$). Both are drawn as single lines and stated by their tolerance classes.
6. **No hidden lines.**
7. **The bearing's axial location** is dimensioned from the housing's machined face.
8. **A detail view at $4:1$** of the shoulder corner, showing a fillet radius no larger than $1\ \mathrm{mm}$ (smaller than the ring chamfer of $1.1$), so that the ring seats against the shoulder rather than riding on the fillet.
**What a note must say.** The mounting method — for example "HEAT THE BEARING TO NOT MORE THAN $120\ {}^{\circ}\mathrm{C}$ TO FIT IT ON THE SHAFT; DO NOT TRANSMIT MOUNTING FORCE THROUGH THE BALLS" — and the lubricant and its quantity.

*Design comment.* The component drawings define the shapes; the assembly section shows which surfaces locate which, and every convention above exists to make those relationships legible.
:::
:::

::: example A sheet-metal bracket and its flat pattern {#ex-flat}
A $1.5\ \mathrm{mm}$ mild-steel bracket has three legs of $80$, $40$ and $60\ \mathrm{mm}$ measured to the outside corners, with two $90^{\circ}$ bends at an inside radius of $1.5\ \mathrm{mm}$. Take $K = 0.33$. Give the flat pattern and the bend-line positions.
::: solution
**The flat length.**
$$
SB = (R + t) \tan 45^{\circ} = 1.5 + 1.5 = 3.00\ \mathrm{mm}, \qquad
BA = \frac{\pi}{2} (R + Kt) = \frac{\pi}{2} (1.5 + 0.495) = 3.134\ \mathrm{mm},
$$
$$
BD = 2\,SB - BA = 6.00 - 3.134 = 2.87\ \mathrm{mm} \ \text{per bend}, \qquad
L = 180 - 2 \times 2.87 = 174.3\ \mathrm{mm} .
$$
**The bend positions.** The flat portions are $80 - 3 = 77.0$, $40 - 6 = 34.0$ and $60 - 3 = 57.0\ \mathrm{mm}$, with a $3.134\ \mathrm{mm}$ bend zone after each of the first two. From the left edge of the flat:
$$
\begin{array}{l c c c}
& \text{Bend zone starts} & \text{Bend line (centre)} & \text{Bend zone ends} \\
\text{Bend 1} & 77.0 & 78.6 & 80.1 \\
\text{Bend 2} & 114.1 & 115.7 & 117.3
\end{array}
$$
and the flat ends at $117.3 + 57.0 = 174.3\ \mathrm{mm}$. The flat-pattern drawing shows the bend lines (thin lines, labelled with the bend direction, angle and inside radius); whether the press-brake operator works to the bend centre line or to a tangent line is agreed with the shop.
**The bend notes.**
$$
\begin{array}{l l}
\text{Bend radius} & R 1.5\ \text{inside, typical} \\
\text{Bend angle} & 90^{\circ} \pm 0.5^{\circ}\ (\text{or as the general tolerance}) \\
\text{Holes near bends} & \text{keep holes at least about } 2t + R\ \text{from the bend, or they distort} \\
\text{Bend relief} & \text{where a bend ends at an edge, a relief notch prevents tearing} \\
\text{Rolling direction} & \text{noted where it matters: bends across the rolling direction tolerate smaller radii}
\end{array}
$$
**The section that shows the bend.** A removed section through each bend, enlarged (say $2:1$) so that the inside radius and thickness can be dimensioned; at full scale the $1.5\ \mathrm{mm}$ cut area may be filled solid.
**The dimension not to add.** The diagonal from the end of leg 1 to the end of leg 3: it is derived, and it would be a second instruction that might contradict the leg lengths and bend angles.

*Sanity.* With $K = 0.50$ the bend deduction would be $2.47\ \mathrm{mm}$ instead of $2.87$, and the flat would be $0.8\ \mathrm{mm}$ longer. That uncertainty is why the first article is bent and measured and the $K$ factor adjusted.
:::
:::

::: history
Sectional views were used in engineering and architectural drawing long before they were standardised, and the systematic geometry of projection behind them goes back to **Gaspard Monge's** *Géométrie descriptive* (**1799**). National standards codified the conventions in the twentieth century — in Britain **BS 308** (from **1927**, replaced by **BS 8888** from **2000**), in the United States the ASA (later ANSI and ASME) **Y14** series. Internationally, sections were covered by ISO 128-40, ISO 128-44 and ISO 128-50 until these were consolidated into **ISO 128-3:2022**; the representation of screw threads is given in **ISO 6410-1**, and the simplified representation of rolling bearings in **ISO 8826-1**.
:::

## Where this leads

The section reveals the geometry that [[engineering-graphics/orthographic-projection]] projects; the dimensions on it are governed by [[engineering-graphics/dimensioning]], the fits it shows by tolerance class are [[engineering-graphics/tolerances-fits]], and the datums from which its features are located are [[engineering-graphics/geometric-tolerancing]].

::: summary
- A section reveals the inside and removes part of the outside; use the fewest cuts that reveal everything, and show and label the cutting plane when its position is not obvious.
- Ribs, webs, spokes, shafts, keys, fasteners and rolling elements cut lengthwise are not hatched; cut across, they are.
- Thin cut areas may be filled solid, with at least $0.7\ \mathrm{mm}$ between adjacent filled areas.
- Adjacent parts are distinguished by hatching direction, then spacing or offset; one part keeps one hatching throughout.
- Fits are drawn at nominal size and specified by tolerance class; threads follow ISO 6410-1, with the external thread covering the internal one in assembly.
- A primary auxiliary takes its distances from the view adjacent to its parent; a secondary takes them from the view the primary was projected from.
- A flat pattern adds a bend allowance $\frac{\pi\theta}{180}(R + Kt)$ per bend, or subtracts a bend deduction $2\,SB - BA$ from the outside dimensions.
:::

::: quiz
A cutting plane passes lengthwise through a bolt, the shaft it clamps and a cast rib. Which of these are hatched?
- [ ] All three, since all three are cut
- [x] None of the three
- [ ] The bolt and the shaft only
- [ ] The rib only
::: solution
None of the three. Bolts, shafts and ribs cut lengthwise are conventionally left unhatched: a hatched bolt reads as a sleeve, a hatched shaft as a plate, and a hatched rib as a solid wall. Parts cut **across**, and the housing around them, are hatched.
:::
:::

## Exercises

::: exercise Ribs {level=1 check="0"}
A rib $8\ \mathrm{mm}$ thick is cut lengthwise by a section plane. How many hatch lines are drawn across it? (Enter a number.)
::: solution
None — a rib cut lengthwise is left unhatched.
:::
:::

::: exercise Thin sections {level=1 check="0.7"}
What is the minimum gap between adjacent thin sections that are filled solid? (Enter the value in millimetres.)
::: solution
$0.7\ \mathrm{mm}$ (ISO 128).
:::
:::

::: exercise Hatch angles {level=1 check="45"}
Give the usual angle of general hatching to the main outline or axis. (Enter the angle in degrees.)
::: solution
$45^{\circ}$.
:::
:::

::: exercise Bend allowance {level=1 check="3.77"}
Give the bend allowance of a $90^{\circ}$ bend with inside radius $2\ \mathrm{mm}$ in $1\ \mathrm{mm}$ sheet, with $K = 0.4$. (Enter the value in millimetres.)
::: solution
$BA = \frac{\pi}{2}(2 + 0.4 \times 1) = 3.77\ \mathrm{mm}$.
:::
:::

::: exercise Half section {level=1 check="1"}
A half-section of a symmetric part combines its external view and its full section into how many views? (Enter a number.)
::: solution
One.
:::
:::

::: exercise Bend deduction {level=2 check="174.8"}
Give the flat-pattern length of a $1.5\ \mathrm{mm}$ mild-steel bracket with two $90^{\circ}$ bends, legs of $80$, $40$ and $60\ \mathrm{mm}$ measured to the outside corners, if the shop's measured bend deduction is $2.6\ \mathrm{mm}$. (Enter the length in millimetres.)
::: solution
$$
L = (80 + 40 + 60) - 2 \times 2.6 = 180 - 5.2 = 174.8\ \mathrm{mm} .
$$
*Sanity.* With $R = 1.5$, $SB = 3.0$, and $BD = 2.6$ means $BA = 6.0 - 2.6 = 3.4\ \mathrm{mm}$, i.e. $R + Kt = 3.4/(\pi/2) = 2.165$ and $K = 0.44$. The table value $K = 0.33$ gives $BD = 2.87$; the measured deduction corresponds to a larger $K$, which is exactly the kind of correction a first article provides.
:::
:::

::: exercise Bolt circle {level=2 check="91.8"}
Eight $\varnothing 11$ holes are equally spaced on a $240\ \mathrm{mm}$ bolt circle. Give the chord between adjacent holes and the distance of that chord from the axis. (Enter the chord in millimetres.)
::: solution
$$
\text{chord} = 2 \times 120 \sin 22.5^{\circ} = 91.8\ \mathrm{mm}, \qquad
d = 120 \cos 22.5^{\circ} = 110.9\ \mathrm{mm} .
$$
*Sanity.* The chord lies about $9\ \mathrm{mm}$ inside the bolt circle; an offset cutting-plane segment along it would cut the part at radius $110.9$, not $120$, and the section must not be read as if it showed the material at the bolt circle.
:::
:::

::: exercise Derivation {level=3 check="4.16"}
Derive the bend allowance, setback and bend-deduction formulas from the neutral-axis position, and evaluate the bend deduction for a $2\ \mathrm{mm}$ stainless $90^{\circ}$ bend at $R 3$ with $K = 0.36$. (Enter the bend deduction in millimetres.)
::: solution
**The geometry.** Two flat legs are joined by an arc of inside radius $R$ through the bend angle $\theta$. The outer surfaces of the legs, extended, meet at the **outside virtual sharp**.
**The setback.** The bend arc's centre lies on the bisector of the angle between the legs. The tangent point of the outer surface (radius $R + t$) is at distance $(R + t)\tan(\theta / 2)$ from the virtual sharp along each leg:
$$
SB = (R + t) \tan \frac{\theta}{2} .
$$
For $\theta = 90^{\circ}$, $SB = R + t$.
**The bend allowance.** The neutral axis, at radius $R + Kt$, keeps its length during bending, so the arc it describes is the length of flat sheet consumed by the bend:
$$
BA = \frac{\pi \theta}{180} (R + K t) .
$$
**The deduction.** With the legs $l_i$ measured to the virtual sharps, each bend shortens the two adjacent flats by $SB$ and adds the arc $BA$:
$$
L = \sum l_i - \sum (2\,SB - BA) \qquad \Rightarrow \qquad \boxed{BD = 2\,SB - BA} .
$$
**Evaluation.** $R = 3$, $t = 2$, $K = 0.36$, $\theta = 90^{\circ}$:
$$
SB = 5.00\ \mathrm{mm}, \qquad BA = \frac{\pi}{2}(3 + 0.72) = 5.843\ \mathrm{mm}, \qquad BD = 10.00 - 5.843 = 4.16\ \mathrm{mm} .
$$
*Sanity.* With the neutral axis at mid-thickness ($K = 0.5$) the allowance would be $6.28\ \mathrm{mm}$, $0.44$ more. The neutral axis moves inwards because the inside of the bend is compressed and the outside stretched, and the shift is larger for tight radii (small $R/t$).
:::
:::

::: exercise Design {level=3}
Specify the sections and views for a hydraulic manifold block $200 \times 140 \times 90\ \mathrm{mm}$ drilled with $18$ intersecting passages, four ports on the front face and a cartridge-valve cavity from the top.
::: solution
**The problem.** A drilled manifold's geometry is almost all **internal**, and $18$ passages drawn as hidden lines are unreadable. The drawing is mostly sections.
**The view set.**
1. **Front view, external**, showing the four ports and the mounting holes at true shape.
2. **Section $A\text{–}A$** through the port centres, showing the port bores, their sealing faces and the passages they feed.
3. **Section $B\text{–}B$** through the cartridge cavity, showing its diameters and steps, its seat and the cross-drillings; the cavity form itself is usually specified by reference to the valve maker's cavity drawing or standard.
4. **Further sections or partial sections** at the other passage levels, each limited to the passages it is meant to show.
5. **Enlarged details** of sealing grooves and port faces.
6. **A 3D view or cutaway on a separate sheet**, marked as for reference only — a drilled manifold is one part where a pictorial genuinely helps the reader.
**The notes that carry the function.**
$$
\begin{array}{l l}
\text{Deburring} & \text{all passages and intersections free of burrs and loose material} \\
\text{Cleanliness} & \text{to a stated ISO 4406 code, e.g. 16/14/11, after final cleaning} \\
\text{Plugs} & \text{cross-drilling entries closed with the specified plugs and sealing method} \\
\text{Pressure test} & \text{each passage proof-tested to a stated multiple of working pressure; no external leakage} \\
\text{Minimum wall} & \text{a stated minimum wall between passages, verified on first articles}
\end{array}
$$
**Three drawing decisions unique to a drilled block.** **Dimension every passage from datum faces**, not from other holes, so that drilling errors do not accumulate. **State the minimum wall between passages as a requirement**, because it follows from the passage positions and is otherwise checked by nobody. **Show the drill entry points** and lengths, because a long, small drill wanders and can break into a neighbouring passage or through a face.
**What is deliberately not drawn.** A single section through all $18$ passages: no plane contains them, and an offset section that pretends to would mislead.

*Design comment.* For a part whose subject is internal, the drawing is a set of sections with one external view for orientation, and the process notes — deburring, cleanliness, proof testing — decide whether the part works as much as any dimension.
:::
:::
