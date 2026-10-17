A section is a **lie that tells the truth**: the drawing shows metal that has been sawn through and does not exist, and it is the only way to describe an internal feature without a forest of hidden lines. The convention is two centuries old, and its rules are not decoration — every one of them exists because somebody machined a part from a misread drawing.

The section's power and its danger are the same thing. A section reveals the inside and **destroys the outside**: the cutting plane erases the very faces that locate the features, and the reader must reconstruct the solid from a slice. The craft is choosing the **fewest cuts** that reveal everything, and labelling them so that no reader has to guess which half was thrown away.

::: warning Seven sectioning errors that get parts made wrong
**Sectioning a rib, a web, a spoke or a shaft longitudinally.** A rib cut along its length and hatched reads as a **solid boss** filling the whole space, and the reader cannot tell a $6\ \mathrm{mm}$ rib from a $60\ \mathrm{mm}$ wall. The rule is absolute: **a rib, web, spoke, rim, shaft, key, pin, bolt, nut, washer, screw, rivet, gear tooth or ball, sectioned lengthwise, is drawn unhatched.** **Hatching a thin section as a hatch.** A $1.5\ \mathrm{mm}$-wall section at a $1 : 1$ scale cannot hold $3\ \mathrm{mm}$-pitch hatch lines; the standard says **paint it solid black** and leave a $2\ \mathrm{mm}$ gap either side of the cutting plane, or lead the hatch out beside the view. **Two adjacent parts hatched the same way.** In an assembly section the whole point of the hatch is to separate the parts, and two parts with the same $45\ {}^{\circ}$ hatch at the same pitch are **one part** to every reader. **An unlabelled cutting plane.** A section with no $A\text{–}A$ label and no arrows is a section whose direction of sight is unknown, and a section viewed from the wrong side is a **mirror image**. **Hidden lines left in a section.** Once a feature is revealed by the cut its hidden lines are noise, and the noise buries the one hidden line that is still needed. **A dimension taken from a section that could be taken from the outside.** A section shows the inside and hides the outside; a diameter that appears as a true circle in the end view belongs there and not on the section. **A developed or aligned section with no note.** A cutting plane that bends through $90\ {}^{\circ}$ to follow a chain of holes and is then drawn **straight** is a lie about geometry, and unless the view is marked **"DEVELOPED"** or **"UNFOLDED"** the reader will look for a bend that is not there.
:::

## The section family

::: definition The eleven sections {#def-sections}
$$
\begin{array}{l l l l}
\text{Section} & \text{Cut} & \text{Used for} & \text{Note} \\
\text{Full} & \text{one plane, right through} & \text{asymmetric internals} & \text{the default} \\
\text{Half} & \text{a quarter removed} & \text{symmetric parts} & \text{external view and section in one} \\
\text{Offset} & \text{a stepped plane} & \text{a chain of holes off-centre} & \text{drawn as if straight} \\
\text{Broken-out} & \text{a small area, freebreak edge} & \text{one local feature} & \text{no cutting-plane line at all} \\
\text{Revolved} & \text{a profile rotated into the view} & \text{rolled and extruded shapes} & \text{drawn on the view, in thin lines} \\
\text{Removed} & \text{a profile taken out and placed aside} & \text{a small profile at a larger scale} & \text{can be rotated freely} \\
\text{Aligned} & \text{a plane that bends, drawn flat} & \text{radial arms, a bolt circle} & \text{must be marked} \\
\text{Auxiliary} & \text{a plane parallel to an inclined face} & \text{an inclined internal feature} & \text{follows the auxiliary view} \\
\text{Part / local} & \text{a portion, bounded by a break} & \text{a long part with one feature} & \text{combines a break and a cut} \\
\text{Conventional break} & \text{no cut, a zig-zag} & \text{a long uniform length} & \text{the length dimension is unchanged} \\
\text{Assembly} & \text{any of the above, on an assembly} & \text{how parts fit} & \text{extra rules, below}
\end{array}
$$
**The half-section is the biggest saving on the sheet.** A symmetric bearing housing needs one view with a half-section instead of one external view plus one full section — **two views become one** — and the axis of symmetry becomes the break line, drawn as a **centre line** and not a zig-zag.
**The conventional break is a lie about length and nobody minds.** A $3\ \mathrm{m}$ turned shaft with features at each end is drawn at $1 : 5$ as $600\ \mathrm{mm}$ of paper with two zig-zags and a dimension of $3000$; the break shortens the **drawing** and never the **dimension**. The rule is that the break must be placed where **nothing** is, and never across a chamfer, a thread run-out or a keyway.
**The revolved section** is drawn **on top of** the view, bounded by a thin freebreak, and its hatch is the same as a normal section. It is how an I-beam, an angle or a rolled channel is shown: the elevation gives the length and the revolved profile at the middle gives the section.
:::

::: definition What is never hatched {#def-never}
Sectioned **longitudinally** — that is, with the cutting plane running **along** the axis or the length — these are drawn **unhatched**, with their outlines in a type-A line:
$$
\begin{array}{l l}
\text{Shafts, rods, pins, axles} & \text{a hatched shaft reads as a plate} \\
\text{Ribs, webs, spokes, rims, arms} & \text{a hatched rib reads as a solid wall} \\
\text{Bolts, screws, studs, nuts, washers} & \text{a fastener is a known shape and needs no proof} \\
\text{Keys, dowels, pins, rivets} & \\
\text{Gear teeth, cogs, ratchet teeth, chains} & \text{the tooth profile is a standard and is never shown cut} \\
\text{Balls, rollers, rolling-element races} & \text{the balls are drawn unhatched, the races hatched} \\
\text{Nails, bolts in a wall, connecting rods} & \text{(the last by older conventions only)}
\end{array}
$$
**The exception that proves the rule.** A rib **cut transversely** — across its thickness — **is** hatched, and when a longitudinal cut passes through a rib the standard offers two remedies: a **removed section** through the rib showing its profile, or a **local section** hatched with a **double line** and no hatch. The reason the rule exists is quantitative: a $6\ \mathrm{mm}$ rib between two $20\ \mathrm{mm}$-deep pockets, hatched, is indistinguishable from a $46\ \mathrm{mm}$ solid.
**The thin-section rule.** A section whose cut width is **less than $2\ \mathrm{mm}$** at the drawing scale is drawn **solid black**, with a $2\ \mathrm{mm}$ gap left at the cutting plane, or the hatch is drawn **outside** the view with two leader lines. A $1.5\ \mathrm{mm}$ wall at $1 : 1$ with $3\ \mathrm{mm}$-pitch hatch is a black smear.
:::

::: definition Hatch lines and what they mean {#def-hatch}
$$
\begin{array}{l l l}
\text{Symbol} & \text{Material} & \text{Note} \\
\text{Thin lines at } 45\ {}^{\circ},\ 2\text{–}4\ \mathrm{mm}\ \text{pitch} & \text{general, metal unspecified} & \text{the default} \\
\text{Same at } 30\ {}^{\circ}\ \text{or } 60\ {}^{\circ} & \text{general, when } 45\ {}^{\circ} \text{ would parallel an edge} & \\
\text{Cross-hatch at } 45\ {}^{\circ}\ \text{and } 135\ {}^{\circ} & \text{non-ferrous, bronze, brass} & \\
\text{Horizontal lines} & \text{thermal insulation} & \\
\text{Vertical lines} & \text{electrical insulation} & \\
\text{Alternating long and short horizontals} & \text{brick, masonry} & \\
\text{Diagonals with small crosses} & \text{concrete} & \\
\text{Diagonals with dots and triangles} & \text{reinforced concrete} & \\
\text{Wavy horizontal lines} & \text{water} & \\
\text{Black, no hatch} & \text{thin section} & \\
\text{No hatch, outline only} & \text{shaft, rib, fastener, ball, tooth} & \\
\text{Zig-zag band} & \text{wood, with the grain drawn} &
\end{array}
$$
**The four hatch rules.** **The pitch is $2$ to $4\ \mathrm{mm}$ on the paper and not on the part** — at $1 : 2$ a $4\ \mathrm{mm}$ pitch on the paper is $8\ \mathrm{mm}$ on the part. **The hatch never parallels a visible outline or an axis** where it could be confused with one; change to $30\ {}^{\circ}$ or $60\ {}^{\circ}$. **A hatch line that crosses a dimension line is broken**, and a dimension inside a hatched area is a last resort. **Adjacent parts get different hatches**, and the four ways of making them differ are the **angle** ($45\ {}^{\circ}$ against $135\ {}^{\circ}$), the **pitch**, the **offset** (the same pitch shifted by half) and the **type**.
**The count.** Four distinguishable hatches means an assembly section can show **four parts** unambiguously; a fifth must reuse an angle at a different offset, and a sixth is where the standard says to use **lead numbers and a legend** instead.
:::

::: definition Assembly sections {#def-assembly}
An assembly section has three extra rules and they are all about fasteners.
1. **A fastener is drawn as if it were not cut.** A bolt, nut, washer, pin, shaft or key lying in the cutting plane is drawn **whole**, with its outline and no hatch, even though the plane passes through it.
2. **Two adjacent parts are hatched in opposite directions**, and a third at the same angle but a different pitch.
3. **A clearance is drawn exaggerated.** A $\phi 20\ \mathrm{H}7 / \mathrm{g}6$ fit has a maximum clearance of $0.028\ \mathrm{mm}$ and is drawn as a **$0.5\ \mathrm{mm}$-wide gap on each side**, because a drawing that shows the truth at $1 : 1$ shows a single line and the reader cannot tell a clearance from a line-contact fit.
**The thread-in-a-section convention.** A bolt in a tapped hole, sectioned: the **crest** line of the external thread is **thick** and runs **into** the hole to the thread run-out; the **root** line of the internal thread is **thin** and runs only to the **depth of the thread engagement**; the two are **not** drawn coincident, and the **unthreaded hole depth is drawn deeper than the thread depth** by at least two thread pitches, because that is what a drill does.
$$
\begin{array}{l c l}
\text{Feature} & \text{Line} & \text{Depth for an } M 12 \times 1.75 \text{ into aluminium} \\
\text{Drill depth} & \text{thin, closed at the bottom} & 22\ \mathrm{mm} \\
\text{Thread depth} & \text{thin, at the root diameter} & 18\ \mathrm{mm} \ \left( 1.5\,d \right) \\
\text{Bolt crest} & \text{thick} & \text{to the run-out, } 16\ \mathrm{mm} \\
\text{Bearing face} & \text{thick, at the shoulder} & 15\ \mathrm{mm}
\end{array}
$$
**The four rules that stop an assembly drawing being a work of fiction.** **No part is drawn that is not in the cutting plane or immediately behind it.** **Hidden lines are omitted entirely.** **The fasteners are drawn in the position they will be in when the assembly is complete and not in the order they were fitted.** **A section through a ball bearing shows the balls unhatched, the races hatched, and the cage either omitted or drawn in thin lines with a note.**
:::

::: widget plot
f: 45; 135; 45; 45; 45
x: 1, 5
y: 0, 180
labels: part 1 at 45 deg; part 2 at 135 deg; part 3 at 45 deg, half pitch; part 4 at 45 deg, half offset; part 5 at 45 deg, quarter pitch
caption: The four ways of distinguishing the hatch of adjacent parts in one assembly section. Part 1 and part 2 differ in **angle**; parts 1 and 3 in **pitch** ($4\ \mathrm{mm}$ against $2\ \mathrm{mm}$); parts 1 and 4 in **offset** (the same $4\ \mathrm{mm}$ pitch shifted by $2\ \mathrm{mm}$, which is the hardest to see and the last one to use); and part 5 at a quarter pitch, which reads as a tone rather than a hatch. Beyond four parts the standard says to abandon the hatch and use **lead numbers with a legend**.
:::

## Auxiliary and special views

::: definition The auxiliary view family {#def-auxfam}
$$
\begin{array}{l l l}
\text{View} & \text{How obtained} & \text{Reference from which dimensions transfer} \\
\text{Primary auxiliary} & \text{one fold from a principal view} & \text{the other principal view} \\
\text{Secondary auxiliary} & \text{one fold from the primary} & \text{the principal view not used before} \\
\text{Tertiary auxiliary} & \text{one fold from the secondary} & \text{alternating} \\
\text{Oblique auxiliary} & \text{two folds for a doubly-inclined face} & \text{alternating} \\
\text{Partial auxiliary} & \text{only the feature, bounded by a break} & \text{as above} \\
\text{Detail view} & \text{enlarged portion, marked with a letter} & \text{the parent view} \\
\text{Removed section} & \text{a profile taken out} & \text{the parent view} \\
\text{Rotated view} & \text{a feature rotated into the plane of the paper} & \text{the parent view, with a note}
\end{array}
$$
**The transfer rule, which is the whole construction.** The distance of a point from the **new** folding line equals its distance from the **old** folding line measured in the view you did **not** project from. A primary auxiliary taken from the front view takes its **depths** from the **top** view; a secondary taken from the primary takes its **widths** from the front view. Get this wrong and the auxiliary is a mirror image, and it will look right.
**The rotated view** is the modern shortcut for an inclined face that does not justify a full auxiliary: the face is drawn **rotated** into the plane of the paper, enclosed in a **rectangular frame of type-C lines**, and marked with a **rotation arrow** and the word **"ROTATED"** or the abbreviation. It is legitimate for shape and never for a dimension that depends on the true angle.
**The developed view** unfolds a bent or folded part into one plane — a sheet-metal **flat pattern**, a pipe run, a chain of holes on a bent arm — and must be marked **"DEVELOPED"**, **"UNFOLDED"** or **"FLAT"**, with the bend lines, bend angles, inside radii and the **developed length** all shown.
:::

::: definition Sheet-metal development arithmetic {#def-develop}
A flat pattern's length is the sum of the **straight legs** plus the **bend allowance** of each bend, and the bend allowance is measured on the **neutral axis**, which for a bend inside an **acute** angle of $90\ {}^{\circ}$ or less sits at the **mid-thickness** and for a sharp bend migrates inward.
$$
\text{Bend allowance } BA = \frac{\pi}{180}\, \theta \left( R + K t \right) , \qquad
\text{Setback (miter line) } SB = \left( R + t \right) \tan \frac{\alpha}{2} , \qquad
\text{Bend deduction } BD = 2\, SB - BA
$$
where $\theta$ is the **included** angle through which the metal is bent, $\alpha$ the **complement**, $R$ the inside radius, $t$ the thickness and $K$ the neutral-axis fraction, $0.3$ to $0.5$.
$$
\begin{array}{l c c c c}
\text{Process} & K & \text{Typical } R / t & \text{Bend deduction, } t = 1.5\ \mathrm{mm},\ 90\ {}^{\circ} \\
\text{Air bend, mild steel} & 0.33 & 1.0 & 2.6\ \mathrm{mm} \\
\text{Air bend, stainless} & 0.36 & 1.5 & 3.4\ \mathrm{mm} \\
\text{Bottom bend} & 0.42 & 0.8 & 3.1\ \mathrm{mm} \\
\text{Coin bend} & 0.50 & 0.4 & 3.0\ \mathrm{mm} \\
\text{Fold (a living hinge)} & 0.50 & 0.1 & 1.6\ \mathrm{mm}
\end{array}
$$
**The rule that saves the part.** The **minimum inside radius** for a $90\ {}^{\circ}$ bend across the rolling direction is $1.0$ to $1.5$ times the thickness for mild steel, $2.0$ to $3.0$ for $6\mathrm{xxx}$ aluminium and $0.8$ for dead-soft copper; a bend at $R 0.4$ in $3\ \mathrm{mm}$ aluminium does not crack on the outside, it **cracks on the inside of the outside face**, which is the same crack and a worse place to find it.
:::

::: example A chain of holes and the offset section {#ex-offset}
A bearing end-cover has six $\phi 13$ bolt holes on a $180\ \mathrm{mm}$ bolt circle and a $\phi 60$ centre bore. A drafter wants one section showing **three** bolt holes and the centre bore. Give the cutting-plane geometry and the note.
::: solution
**The problem.** A straight cutting plane through the axis passes through **two** opposite holes at most, and the other four are hidden. A plane through the axis and one hole misses the other two that the reader wants to see.
**The offset section.** The cutting plane is drawn as **three collinear-in-projection segments**: a radial segment from the outside to the bolt circle at $0\ {}^{\circ}$, a **chord** segment along the bolt circle from $0\ {}^{\circ}$ to $60\ {}^{\circ}$, and a radial segment out at $60\ {}^{\circ}$ — plus the mirror-image pair on the far side. The plane is **stepped**, and the section is drawn **as though the steps were in one plane**.
**The chord's true position.** The chord from $0\ {}^{\circ}$ to $60\ {}^{\circ}$ on a $90\ \mathrm{mm}$ radius lies at a perpendicular distance
$$
90 \cos 30\ {}^{\circ} = 77.94\ \mathrm{mm}
$$
from the axis, and **not** at $90\ \mathrm{mm}$. The section therefore shows the two holes at their **true** $\phi 13$ and the material between them at a section depth of $77.94\ \mathrm{mm}$ and not $90\ \mathrm{mm}$ — which is exactly what an offset section is allowed to do and exactly why it must be labelled.
**The note.** The view is captioned
$$
\text{SECTION } A\text{–}A\ \text{(OFFSET)}, \qquad \text{or for a bent plane} \qquad \text{SECTION } A\text{–}A\ \text{(DEVELOPED)}
$$
and the cutting-plane line is drawn as a **thick type-A line with $90\ {}^{\circ}$ steps**, with the letters $A$ at both ends and arrows pointing in the direction of sight.
**The alternative the standard prefers.** Draw a **full section** through two holes and add a **partial auxiliary** or a **removed section** at the third, or simply draw the bolt circle in the **end view** — where all six holes appear as true circles — and reserve the section for the axial features. **A bolt circle is dimensioned in the view along its axis and never in a section.**

*Check.* The chord's perpendicular distance $90 \cos 30\ {}^{\circ} = 77.94$ and its half-length $90 \sin 30\ {}^{\circ} = 45$, so the chord is $90\ \mathrm{mm}$ long and the two holes are $90\ \mathrm{mm}$ apart — which is the chord length of a $60\ {}^{\circ}$ arc on a $90\ \mathrm{mm}$ radius, and equals the radius. $\checkmark$

*Sanity.* The chord length equalling the radius on a $60\ {}^{\circ}$ arc is the reason a six-bolt circle is the commonest in engineering: the holes can be stepped off with a compass at the radius and the pattern checks itself.
:::
:::

::: example A long shaft and the conventional break {#ex-break}
A ground-and-turned steel shaft is $2{,}800\ \mathrm{mm}$ long, $\phi 60$ for $2{,}200\ \mathrm{mm}$, with a $\phi 55$ journal at each end and an $18 \times 70$ keyway $120\ \mathrm{mm}$ from the left end. Give the drawing layout at $1 : 10$ with a conventional break, and the dimensions.
::: solution
**Without a break.** At $1 : 10$ the shaft is $280\ \mathrm{mm}$ long — which fits an A3 sheet, so a break is **not needed** and the honest drawing is the whole shaft.
**At $1 : 5$** it would be $560\ \mathrm{mm}$ and would not fit an A3's $390\ \mathrm{mm}$ printable width, so a break is required. Two breaks are placed in the plain $\phi 60$ length, $400\ \mathrm{mm}$ apart on the paper:
$$
\underbrace{\text{journal}}_{11\ \mathrm{mm}} \ \underbrace{\text{plain } \phi 60}_{\text{break}} \ \underbrace{\text{keyway region}}_{25\ \mathrm{mm}} \ \underbrace{\text{plain } \phi 60}_{\text{break}} \ \underbrace{\text{journal}}_{11\ \mathrm{mm}}
$$
**The rules.** The break is a **type-G** wavy line or a **type-F** zig-zag, drawn **only in the plain $\phi 60$ length**, never across the keyway, the journal, a chamfer or a thread run-out. The **dimension is the true $2{,}800\ \mathrm{mm}$** and is never the measured paper length. The two breaks are drawn **parallel** to each other so the reader reads a translation and not a taper.
**The dimensions.**
$$
\begin{array}{l l}
2{,}800 & \text{overall, between the two breaks and dimensioned as if unbroken} \\
\phi 60\ \mathrm{h6}\ \left( \begin{smallmatrix} - 0.019 \ 0 \end{smallmatrix} \right) & \text{the body} \\
\phi 55\ \mathrm{g6}\ \left( \begin{smallmatrix} - 0.009 \ - 0.029 \end{smallmatrix} \right) & \text{each journal, with a } 1 : 10 \text{ taper at the shoulder} \\
18\ \mathrm{N}9 \times 70\ \mathrm{h}11 \text{ keyway} & 120\ \text{from the left face, to the keyway's centre} \\
2 \times 45\ {}^{\circ} \times 1.5 & \text{chamfers} \\
\mathrm{Ra}\ 0.8\ \text{on the journals},\ \mathrm{Ra}\ 1.6\ \text{on the body} & \text{and the grind relief groove } R 0.5
\end{array}
$$
**The one thing that must not be done.** A break placed so that the **keyway's position** has to be dimensioned **across** a break. The $120\ \mathrm{mm}$ must be measurable on the drawing between two real edges, and a break between them makes the dimension unverifiable — which is permitted but must be avoided.

*Sanity.* The reason a break is legal at all is that a dimension on a drawing is a **prescription and not a measurement**; the drawing is not a map and the reader never scales it. The break is therefore harmless for dimensions and fatal for **proportions** — and any note on the drawing that says "as shown" or "proportional to the figure" becomes a lie across a break.
:::
:::

::: example An assembly section: a bearing in a housing {#ex-assembly}
A $6210$ deep-groove ball bearing is pressed into a cast housing and retained by a machined cover plate and six screws. Give the section and every convention it must obey.
::: solution
**The bearing's dimensions.** A $6210$: $\phi 50$ bore, $\phi 90$ outside, $20\ \mathrm{mm}$ wide, with $r_{\min} = 1.1\ \mathrm{mm}$ at the corners.
**The section, and its eleven rules.**
1. **The cutting plane** passes through the bearing axis and two of the six cover screws, which are at $60\ {}^{\circ}$ — so the plane is **offset** or the screws are drawn as a **rotated** pair with a note.
2. **The races are hatched; the balls are not.** Four balls appear in the section (two on each side) and are drawn as **complete circles** of the ball diameter, unhatched, even though the plane passes through their centres.
3. **The cage is omitted** or drawn in type-C thin lines with the note "CAGE OMITTED".
4. **The six cover screws are drawn whole and unhatched**, with their hexagon heads shown in the section as the **across-corners** width, which is the convention and not the across-flats.
5. **The housing and the cover plate are hatched at $45\ {}^{\circ}$ and $135\ {}^{\circ}$** respectively.
6. **The bearing's fits are drawn exaggerated**: the $\phi 90\ \mathrm{H}7$ housing bore against the $\phi 90\ \mathrm{m}6$ outer race is an **interference** fit of $2$ to $33\ \mu\mathrm{m}$ and is drawn as a **single heavy line**, because a visible gap would be a lie; the $\phi 50\ \mathrm{H}7$ shaft against the $\phi 50$ inner race clearance is drawn as a $0.4\ \mathrm{mm}$ gap.
7. **The shaft is drawn unhatched** and extends beyond the housing with a **conventional break**.
8. **The retaining ring, the key and the shaft are unhatched.**
9. **No hidden lines anywhere.**
10. **The bearing's axial location is dimensioned** from the housing's machined face and not from the casting's as-cast face, and the drawing shows the **$2\ \mathrm{mm}$ machined pad** on the casting.
11. **A detail view at $4 : 1$** of the corner, showing the $r 1.1$ fillet relief so the race's corner radius can be seated — the commonest bearing-housing error in the trade, and invisible at $1 : 1$.
**The two things the section cannot show and a note must.** **The bearing's mounting sequence** — "PRESS THE OUTER RACE INTO THE HOUSING AT $90\ {}^{\circ}$, THEN FREEZE THE SHAFT AND ASSEMBLE" — and **the grease quantity and the vent**, because a section that shows the grease would be hatched as a solid.

*Design comment.* The general rule is that **an assembly section is a communication of the fit and the assembly sequence and not of the shapes**, because the shapes are already known from the component drawings. The section earns its place by showing which surfaces locate which, and every convention on the list above exists to make one of those locations legible.
:::
:::

::: example A sheet-metal bracket and its flat pattern {#ex-flat}
A $1.5\ \mathrm{mm}$ mild-steel bracket has three legs of $80$, $40$ and $60\ \mathrm{mm}$ measured to the outside corners, with two $90^{\circ}$ bends at an inside radius of $1.5\ \mathrm{mm}$. Give the flat pattern, the bend notes and the section that shows the bend.
::: solution
**The flat length.** With $K = 0.33$ for an air bend in mild steel:
$$
SB = (R + t) \tan 45^{\circ} = 1.5 + 1.5 = 3.00\ \mathrm{mm}, \qquad
BA = \frac{\pi}{2} (R + Kt) = \frac{\pi}{2} (1.5 + 0.495) = 3.134\ \mathrm{mm}
$$
$$
BD = 2\,SB - BA = 6.00 - 3.134 = 2.87\ \mathrm{mm} \ \text{per bend}, \qquad
L = 180 - 2 \times 2.87 = 174.3\ \mathrm{mm} .
$$
**The bend layout, which the press brake needs and the flat length does not give.** The **miter line** — the point the operator centres the bend on — is at
$$
80 - SB = 77.0\ \mathrm{mm} \quad \text{and} \quad 77.0 + 40 - 2\,SB = 111.0\ \mathrm{mm}
$$
from the flat's leading edge, and the drawing shows **both** the flat length and the two miter dimensions, because a brake operator bends to the miter line and not to the flat length.
**The bend notes.**
$$
\begin{array}{l l}
\text{Bend radius} & R\ 1.5\ \text{typ., min. } 1.0\ \text{(across the grain)} \\
\text{Bend angle} & 90^{\circ} \pm 0.5^{\circ} \\
\text{Inside dimension} & \text{the drawing dimensions the } \textbf{inside} \text{ legs, because that is what the brake controls} \\
\text{Hole distance} & \text{every hole is dimensioned from the } \textbf{bend relief} \text{ face and never across a bend} \\
\text{Hole to bend} & \ge 2t = 3.0\ \mathrm{mm}; \text{ a hole at } 2.0\ \mathrm{mm} \text{ becomes an ellipse} \\
\text{Material} & \text{grain direction noted; a bend } \textbf{with} \text{ the grain cracks at } R\ 1.5
\end{array}
$$
**The section that shows the bend.** A **removed section** at $2 : 1$ through each bend, drawn **unhatched** because the $1.5\ \mathrm{mm}$ cut is below the $2\ \mathrm{mm}$ thin-section limit — and if the section is drawn at $1 : 1$ it is **painted solid black** with a $2\ \mathrm{mm}$ gap at the cutting plane.
**The one thing that must not be dimensioned.** The **diagonal** from the end of leg $1$ to the end of leg $3$. It is a derived value, it changes with the $K$ factor, and a dimension on it is a second instruction that contradicts the two bends.
*Sanity.* The $2.87\ \mathrm{mm}$ bend deduction is $1.9$ times the thickness, and the $K$ factor's plausible range of $0.33$ to $0.50$ moves it to $3.13$ — a $9\ \%$ change, or $0.5\ \mathrm{mm}$ over two bends. That is why a first article is always bent, measured and the $K$ factor recalculated, and why the drawing says "$R\ 1.5\ \text{typ.}$" and not "$R\ 1.50 \pm 0.05$".
:::
:::

::: history
The section convention descends from the **17th-century military engineers**' "plan de coupe" for fortifications, in which a **horizontal** cut through a bastion at a stated height was the only way to show the internal galleries; **Sébastien Le Prestre de Vauban**'s 17th-century drawings already use the hatched cut face and the arrow of sight. **Gaspard Monge**'s 1795 *Géométrie descriptive* gave the section its geometry, and the **$45\ {}^{\circ}$ hatch at a fixed pitch** was settled in the **British Standards Institution**'s 1901 provisional general-terms specification, whose practical motive was that a rolled-up drawing had to be legible at arm's length through a gap in a bundle. **The "never hatch a rib or a shaft" rule** is attributed to the **1890s American machine-shop practice** codified in **John Brown**'s and **Charles MacCord's** 1890 *Mechanical Drawing and Elementary Machine Design*, which records that the rule was adopted after a boiler-maker built a **solid** bedplate from a drawing whose ribs had been hatched. **The assembly-section fastener rule** — that a bolt in the cutting plane is drawn whole — is in **Thomas Ewing**'s 1878 *Handbook of Mechanical Drawing* and is unchanged. **The thread convention** — the crest thick, the root thin, the hole deeper than the thread — was standardised by the **ASA** (now **ASME**) **Y14.6** of 1940 and the **ISO 6410** series of 1982, after two decades in which American and European drawings drew the **root** thick and the **crest** thin, which is to say, exactly backwards. **The developed sheet-metal pattern** and its neutral-axis arithmetic descend from **the sheet-metal trades'** 19th-century **stretch-out** practice and were put on a quantitative footing by the **K** factor studies of **Almen** and **Bentz** at **US Steel** in 1931, whose "bendability" data are still the basis of every press-brake catalogue.
:::

## Where this leads

The section reveals the geometry that [[engineering-graphics/orthographic-projection]] projects; the dimensions on it are governed by [[engineering-graphics/dimensioning]], the fits it exaggerates are [[engineering-graphics/tolerances-fits]], and the datum from which its features are located is [[engineering-graphics/geometric-tolerancing]].

::: summary
- A section is a deliberate lie that reveals the inside and destroys the outside; use the fewest cuts that reveal everything.
- Ribs, webs, spokes, shafts, keys, fasteners, balls and gear teeth are never hatched when cut lengthwise.
- A section thinner than $2\ \mathrm{mm}$ on the paper is painted black, not hatched.
- Adjacent parts differ by hatch angle, then pitch, then offset, then type — and beyond four parts, by lead numbers.
- An offset or developed cutting plane is drawn straight and must be labelled, or the reader hunts for a bend that is not there.
- An assembly section is a statement of fits and sequence: fasteners whole, races hatched, balls not, clearances exaggerated, hidden lines none.
:::

::: quiz
A cutting plane passes lengthwise through a bolt, the shaft it clamps and a cast rib. Which of these are hatched?
- [ ] All three, since all three are cut
- [x] None of the three
- [ ] The bolt and the shaft only
- [ ] The rib only
::: solution
None of the three. A bolt, a shaft and a rib are all on the "never hatch when cut lengthwise" list: a hatched bolt reads as a solid sleeve, a hatched shaft as a plate, and a hatched rib as a solid wall filling the space between the pockets. The races of a bearing, the housing and any part cut **across** are hatched; these three are drawn with their outlines only.
:::
:::

## Exercises

::: exercise Ribs {level=1 check="0"}
A rib $8\ \mathrm{mm}$ thick is cut lengthwise by a section plane. How many hatch lines are drawn across it?
::: solution
None — a rib cut lengthwise is left unhatched.
:::
:::

::: exercise Thin sections {level=1 check="2"}
Below what cut width in millimetres on the paper is a section painted solid black?
::: solution
$2\ \mathrm{mm}$.
:::
:::

::: exercise Hatch angles {level=1 check="45"}
Give the default hatch angle in degrees.
::: solution
$45\ {}^{\circ}$.
:::
:::

::: exercise Neutral axis {level=1 check="0.5"}
Give the neutral-axis fraction $K$ for a coin bend.
::: solution
$0.5$ — the mid-thickness.
:::
:::

::: exercise Half section {level=1 check="1"}
How many views does a half-section replace for a symmetric part?
::: solution
One — it merges the external view and the full section into a single view.
:::
:::

::: exercise Bend deduction {level=2}
Give the flat-pattern length of a $1.5\ \mathrm{mm}$ mild-steel bracket with two $90\ {}^{\circ}$ bends, legs of $80$, $40$ and $60\ \mathrm{mm}$ measured to the outside corners, an inside radius of $1.5\ \mathrm{mm}$ and a bend deduction of $2.6\ \mathrm{mm}$.
::: solution
$$
L = \left( 80 + 40 + 60 \right) - 2 \times 2.6 = 180 - 5.2 = 174.8\ \mathrm{mm} .
$$
*Sanity.* Each bend removes $2.6\ \mathrm{mm}$ because the two outside-corner legs double-count the corner region: the setback is $\left( R + t \right) \tan 45\ {}^{\circ} = 3.0\ \mathrm{mm}$ per leg and the bend allowance is $\frac{\pi}{2}\left( 1.5 + 0.33 \times 1.5 \right) = 3.11\ \mathrm{mm}$, so the deduction is $2 \times 3.0 - 3.11 = 2.89\ \mathrm{mm}$ against the quoted $2.6$ — a $10\ \%$ difference that is entirely the $K$ factor, and the reason a first article is always made.
:::
:::

::: exercise Bolt circle {level=2}
Eight $\phi 11$ holes are on a $240\ \mathrm{mm}$ bolt circle. Give the chord between adjacent holes, and the perpendicular distance of an offset cutting plane's chord segment from the axis if the plane steps from one hole to the next.
::: solution
$$
\text{chord} = 2 \times 120 \sin 22.5\ {}^{\circ} = 240 \times 0.3827 = 91.8\ \mathrm{mm}, \qquad
d = 120 \cos 22.5\ {}^{\circ} = 110.9\ \mathrm{mm} .
$$
*Sanity.* The offset plane's chord lies $9\ \mathrm{mm}$ inside the bolt circle, so the section shows the wall at a depth of $110.9$ and not $120\ \mathrm{mm}$ — and a reader who assumes the section is at the bolt circle will read the wall thickness $9\ \mathrm{mm}$ further out than it is. This is the whole argument for labelling an offset section.
:::
:::

::: exercise Derivation {level=3}
Derive the bend allowance, setback and bend-deduction formulas from the neutral-axis position, and evaluate them for a $2\ \mathrm{mm}$ stainless $90\ {}^{\circ}$ bend at $R 3$ with $K = 0.36$.
::: solution
**The geometry.** Two flat legs meet at an inside radius $R$. The **outside corner** of the two legs is at the intersection of the two outer faces, at a distance $R + t$ from the centre of the bend radius along the bisector.
**The setback.** The setback (the "miter line" distance) is the distance from the outside corner, measured along a leg, to the point where the **tangent** to the bend arc meets that leg:
$$
SB = \left( R + t \right) \tan \frac{\alpha}{2} ,
$$
where $\alpha = 90\ {}^{\circ} - \theta_{\text{bend}}$ is the angle between the two legs' extensions. For a $90\ {}^{\circ}$ bend, $\alpha = 90\ {}^{\circ}$ and $\tan 45\ {}^{\circ} = 1$, so $SB = R + t$.
**The bend allowance.** The arc length on the **neutral axis**, at a radius $R + Kt$ through the included bend angle $\theta = 180\ {}^{\circ} - \alpha$:
$$
BA = \frac{\pi \theta}{180} \left( R + K t \right) .
$$
**The deduction.** The flat length is the sum of the outside-corner legs **less** the two setbacks **plus** the arc:
$$
L = \sum l_{i} - 2\, SB + BA \ \equiv\ \sum l_{i} - BD , \qquad \boxed{ BD = 2\, SB - BA } .
$$
**Evaluation.** $R = 3$, $t = 2$, $K = 0.36$, $\theta = 90\ {}^{\circ}$:
$$
SB = 3 + 2 = 5.00\ \mathrm{mm}, \qquad
BA = \frac{\pi}{2} \left( 3 + 0.72 \right) = 5.843\ \mathrm{mm}, \qquad
BD = 10.00 - 5.843 = 4.16\ \mathrm{mm} .
$$
*Sanity.* The neutral axis has moved inward from the mid-thickness ($K = 0.5$ would give $BA = 6.28$) because the inside of the bend is compressed and the outside is stretched, and in a **tension-dominant** material such as work-hardening stainless the neutral axis migrates toward the **compression** side. The $7\ \%$ change in $BA$ is $0.44\ \mathrm{mm}$ per bend, and on a bracket with six bends $2.6\ \mathrm{mm}$ — which is why the $K$ factor is measured and not looked up.
:::
:::

::: exercise Design {level=3}
Specify the sections and views for a hydraulic manifold block $200 \times 140 \times 90\ \mathrm{mm}$ drilled with $18$ intersecting passages, four $\phi 14$ port bores on the front face and a cartridge cavity from the top.
::: solution
**The problem.** A drilled manifold's whole geometry is **internal**, and $18$ passages drawn as hidden lines is unreadable at any scale. The drawing is therefore **all section and almost no external view**.
**The view set.**
1. **Front view, external**, showing the four $\phi 14$ ports and the bolt holes at true shape — the **only** external view, because the outside is a box.
2. **Section $A \text{–} A$ horizontal at the port-centre height**, showing the four port bores, their lands and the passages they feed.
3. **Section $B \text{–} B$ vertical through the cartridge cavity**, showing the cavity, its $\phi$ steps, its $60\ {}^{\circ}$ seat, the O-ring gland and the exhaust cross-drilling.
4. **Two further sections $C \text{–} C$ and $D \text{–} D$ at the two remaining passage heights**, each a **partial** section bounded by a break, because a full section through a manifold shows passages that belong to other planes.
5. **Three removed sections at $2 : 1$** of the O-ring glands, where a $2.4\ \mathrm{mm}$-wide groove must be dimensioned.
6. **A 3D cutaway on a separate sheet**, marked "REFERENCE ONLY — NOT FOR MANUFACTURE", because a manifold is the one part where the pictorial genuinely helps and genuinely gets dimensioned by mistake.
**The five notes that carry the function.**
$$
\begin{array}{l l}
\text{Deburr} & \text{all passages; no sharp edge or burr on any intersection; visual inspection at } 10\times \\
\text{Cleanliness} & \text{flush to ISO } 4406\ 16\text{/}14\text{/}11;\ \text{no residual drill slurry} \\
\text{Plug} & \text{all drilling cross-drills plugged with a } \mathrm{M} 10 \text{ square-head plug, Loctite } 567 \\
\text{Test} & \text{prove each passage to } 1.5 \times \text{ working pressure; no external leak for } 5\ \mathrm{min} \\
\text{Radii} & \text{no internal radius below } R 0.5 \text{ at a passage intersection}
\end{array}
$$
**The three drawing decisions unique to a drilled block.** **Every passage is dimensioned from a machined face and never from another hole**, because a drilled hole's position is $\pm 0.3\ \mathrm{mm}$ and a stack of two is $\pm 0.6$. **The wall thickness between passages is a note and not a dimension** — "minimum $3\ \mathrm{mm}$ wall between any two passages, verified by section" — because the dimension is on the faces and the wall is a consequence. **The drill entry and exit points are shown**, because a $\phi 6$ drill wandering $0.5\ \mathrm{mm}$ at a $140\ \mathrm{mm}$ depth breaks out on a port face and the part is scrap.
**The one thing deliberately not drawn.** A section through **all** $18$ passages. It cannot exist as a plane, and an offset section that pretends it can will be read as a real drilling.

*Design comment.* The general rule is that **a drawing whose subject is internal is a set of sections with one external view for attachment**, and that the manufacturing notes — deburr, cleanliness, proof pressure — do more to determine whether the part works than any dimension on it.
:::
:::
