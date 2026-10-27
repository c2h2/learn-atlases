A dimension is an **instruction**, and the difference between a drawing that works and one that does not is whether every instruction can be **measured**, is **not contradicted** by another instruction, and is attached to a **real edge** the machinist can touch with a probe. Geometry that is correct but badly dimensioned is a **dangerous** drawing, because it reads as finished.

The arithmetic of dimensioning is the arithmetic of tolerance accumulation, and it is the one place on a drawing where a drafter's choice changes whether a part assembles without changing a single tolerance value. **Chain** dimensioning of a row of twelve holes at $\pm 0.02$ per link allows the last hole to be up to $\pm 0.22\ \mathrm{mm}$ from where it should be; **baseline** or ordinate dimensioning from a datum holds every hole to $\pm 0.02$. The two drawings look equally professional and one of them may not assemble.

::: warning Seven dimensioning errors that cannot be fixed after the first article
**A dimension to a hidden line.** The reader cannot see the edge, so the dimension is hard to read and hard to check; dimension to a visible edge or to a centre line in a view or section where the feature is visible. **A repeated or redundant dimension.** Two dimensions from which a third can be computed, plus the third, are **two instructions that may disagree**; the shop has to guess which one governs. Give each feature's size and location once; a derived value, if shown at all, is a **reference dimension** in brackets. **A dimension between features that cannot be found.** A hole-to-hole dimension is measurable only if the part has a defined datum from which the first hole is located and oriented. **A dimension taken from a foreshortened view.** A $40\ \mathrm{mm}$ length on a face inclined at $25^{\circ}$ appears as $40 \cos 25^{\circ} = 36.3\ \mathrm{mm}$ in a view where it is foreshortened; dimension it in the view where it is true length. **A tight tolerance on everything.** A blanket tight tolerance says that no feature matters more than any other and costs money on every feature; the general tolerance should be as **loose** as function allows and only the **critical** dimensions toleranced individually. **A dimension the shop cannot measure.** A position tolerance to a datum that is buried in an assembly, or a "true position" with no stated datum reference frame, will either be signed off without being checked or argued about at inspection. **A dimension left as a calculation.** "The machinist will work it out" is how a drawing acquires an undocumented tolerance stack; if a dimension is functionally important, put it on the drawing with its tolerance, and dimension the other features so that it is not also implied by a chain.
:::

## The grammar

::: definition The kinds of dimension {#def-kinds}
| Kind | Example | Meaning |
|---|---|---|
| Equal bilateral | $40 \pm 0.1$ | limits $39.9$ and $40.1$ |
| Unequal bilateral | $40\,{}^{+0.2}_{-0.1}$ | limits $39.9$ and $40.2$ |
| Unilateral | $40\,{}^{+0.2}_{\ \ 0}$ | the zone lies on one side of the nominal |
| Limit dimensions | $\begin{smallmatrix} 40.2 \\ 39.8 \end{smallmatrix}$ | upper limit above lower limit, no nominal |
| Tolerance class | $\varnothing 40\ \mathrm{H}7$ | limits from ISO 286 |
| Theoretically exact (basic) | $\boxed{40}$ | no tolerance of its own; the tolerance is in a geometric tolerance frame |
| Reference (auxiliary) | $(40)$ | information only, not toleranced and not inspected |
| Not to scale | $\underline{40}$ | the value is correct but the feature is not drawn to scale |
| Untoleranced | $40$ | covered by the general tolerance note in the title block |

**The common symbols.** ISO 129-1 and ASME Y14.5 share most of them:

| Symbol | Meaning | Example |
|---|---|---|
| $\varnothing$ | diameter | $\varnothing 12\ \mathrm{H}7$ |
| $R$ | radius | $R 6$ |
| $S\varnothing$, $SR$ | spherical diameter, spherical radius | $S\varnothing 20$, $SR 12$ |
| $\square$ | square | $\square 20$ |
| ⌒ over the value | arc length | $\overset{\frown}{34}$ |
| $C2$ or $2 \times 45^{\circ}$ | $45^{\circ}$ chamfer | $C2$ |
| ⌴ | counterbore or spotface | $4 \times \varnothing 9$ ⌴ $\varnothing 15$ ↧ $6$ |
| ⌵ | countersink | $4 \times \varnothing 9$ ⌵ $\varnothing 18 \times 90^{\circ}$ |
| ↧ | depth | $\varnothing 6.8$ ↧ $22$ |
| ▷ (taper), ⊿ (slope) | conical taper, slope | $1 : 20$ |

**The radius rule.** An arc of **less than** a semicircle is dimensioned by its radius; a full circle, or an arc of more than a semicircle, by its diameter, because the diameter is what is made (by a drill, a boring bar or a turning operation) and what is measured (by a gauge or across two points).
**The depth rule.** A tapped blind hole needs **two** depths: the **full-thread** depth and the **drill** depth, the drill depth being deeper to leave room for the tap's chamfer and for chips. A single depth on a tapped hole leaves the shop to guess how much of the hole is threaded.
:::

::: definition Placement: the rules and the reasons {#def-place}
1. **Dimension in the view that shows the feature's true shape.** A hole's diameter and position go on the view where it is a circle (or on a section through it).
2. **Dimension outside the view** wherever it can be read clearly.
3. **Avoid dimensioning to hidden lines.**
4. **Do not repeat a dimension**, and do not give one that can be derived from others unless it is marked as a reference.
5. **Place the smaller dimensions nearest the view** and the larger outside them, so that dimension lines do not cross extension lines unnecessarily.
6. **A dimension line should not be crossed by another dimension line**, and it should not be a continuation of an outline or a centre line.
7. **Extension (projection) lines start with a small gap from the feature** and extend a little beyond the dimension line (ISO 129-1 gives about $8$ times the line width beyond it).
8. **Dimension values are written to read from the bottom or from the right** of the sheet (ISO 129-1, method 1), and are never crossed by a line.
9. **A leader to a set of identical holes carries the quantity first**: $6 \times \varnothing 9$.
10. **A dimension is never scaled from the drawing**; the drawing gives its scale and the dimensions are authoritative.
**Terminations.** ISO 129-1 allows several terminations of a dimension line — closed filled or open arrowheads (included angle typically $15^{\circ}$ to $30^{\circ}$), an **oblique stroke** drawn at $45^{\circ}$, and a dot — but one drawing should use one style consistently, except where a stroke or a dot is used in a confined space. An **open circle** marks the origin of a running dimension.
**The text height.** ISO 3098 lettering in the preferred heights $2.5$, $3.5$, $5$, $7\ \mathrm{mm}$ (a ratio of $\sqrt{2}$, matching the A-series paper sizes); $3.5\ \mathrm{mm}$ is common for dimensions on A3 and A4 sheets and $2.5\ \mathrm{mm}$ is the practical minimum.
:::

## The three dimensioning schemes

::: definition Chain, baseline and ordinate {#def-schemes}
$$
\begin{array}{l l l l}
\text{Scheme} & \text{How} & \text{Error of feature } n \text{ relative to feature } 1 & \text{Used for} \\
\text{Chain} & A \to B \to C \to D & \pm (n - 1)\, t\ (\text{WC}),\ \pm t \sqrt{n - 1}\ (\text{RSS}) & \text{where only adjacent spacing matters} \\
\text{Baseline} & \text{all from one datum} & \pm 2t\ (\text{WC}),\ \pm t \sqrt{2}\ (\text{RSS}) & \text{features related to one face} \\
\text{Ordinate} & \text{baseline written as running values} & \text{as baseline} & \text{hole patterns, CNC programming}
\end{array}
$$
**The arithmetic that decides the scheme.** With $n$ features and a tolerance of $\pm t$ on each dimension, chain dimensioning puts $n - 1$ links between the first and last features, so the worst-case error of the last relative to the first is $(n - 1)\, t$; relative to the datum it is still only $\pm t$ under baseline dimensioning.
**The numbers.** Twelve holes at a $25\ \mathrm{mm}$ pitch, $\pm 0.02$ per dimension:
$$
\text{chain, worst case} = 11 \times 0.02 = \pm 0.22\ \mathrm{mm}, \qquad
\text{chain, RSS} = 0.02 \sqrt{11} = \pm 0.066\ \mathrm{mm}, \qquad
\text{baseline} = \pm 0.02\ \mathrm{mm}.
$$
**The rule.** Chain dimension where the **spacing between neighbours** is what matters — a row of slots, a conveyor's roller pitch. Dimension from a datum where the **position relative to a reference** matters — every hole that mates with another part. And remember that baseline dimensioning loosens the spacing between neighbours: two adjacent holes, each $\pm 0.02$ from the datum, can be up to $0.04$ out relative to each other.
:::

::: definition Dimensioning a hole pattern {#def-pattern}
$$
\begin{array}{l l l}
\text{Way} & \text{Drawing} & \text{Tolerance zone of each hole} \\
\text{Coordinate from two edges} & \text{two toleranced dimensions per hole} & \text{a square (or rectangle)} \\
\text{Bolt circle} & \text{the circle's diameter, the angle, "EQUALLY SPACED"} & \text{a sector of an annulus} \\
\text{Position with a datum frame} & \text{basic dimensions and a } \varnothing \text{ position tolerance} & \text{a circle (a cylinder in 3D)}
\end{array}
$$
**The bolt-circle rule.** A bolt circle is dimensioned by its **diameter**, the angular position of one hole and a note such as "$6 \times \varnothing 9$ EQUALLY SPACED"; the **chord** between holes is not dimensioned as well, because it is derived and would be a second instruction.
**Position versus coordinates, quantified.** A hole at a basic $(40,\ 25)$ with a $\varnothing 0.4$ position tolerance may lie anywhere in a circle of radius $0.2$. Dimensioned $40 \pm 0.2$ and $25 \pm 0.2$ it may lie anywhere in a $0.4 \times 0.4$ square, whose corners are $0.283$ from the nominal — $41\ \%$ more radial error than the circle permits. Conversely, the coordinate square that guarantees the same $0.2$ radial error is $\pm 0.141$, and the $\varnothing 0.4$ circle has $\pi / 2 = 1.57$ times its area: **$57\ \%$ more usable tolerance for the same functional guarantee**, because a mating pin cares about radial distance, not about $x$ and $y$ separately.
**The quantity note.** $6 \times \varnothing 9$ on a leader to one hole replaces six dimensions. A note that a dimension is "typical" must be unambiguous about which features it covers; exceptions are dimensioned individually.
:::

::: widget plot
f: 0.02*sqrt(x); 0.02*x; 0.02
x: 1, 14
y: 0, 0.3
labels: chain, RSS; chain, worst case; from a datum
caption: The tolerance accumulated at the end of a chain of $x$ links, each at $\pm 0.02\ \mathrm{mm}$. The worst-case stack grows **linearly** and reaches $\pm 0.28\ \mathrm{mm}$ at fourteen links; the root-sum-square estimate grows as $\sqrt{x}$ and reaches $\pm 0.075$. A feature dimensioned directly from the datum stays at $\pm 0.02$ however many features there are.
:::

::: definition Dimensions and cost {#def-cost}
Tighter tolerances need more accurate processes, more careful setups and more inspection, and the cost rises steeply as the tolerance approaches what the process can barely hold. Published cost–tolerance curves differ from shop to shop and from material to material, so any table of multipliers is illustrative; the **shape** of the curve is what holds everywhere — roughly flat for tolerances the basic process holds easily, and rising sharply once a finishing operation (grinding, honing, lapping) or a controlled environment is needed.
**The general tolerance.** Untoleranced dimensions are covered by a **general-tolerance note**. For machined parts ISO 2768-1 gives four classes — f (fine), m (medium), c (coarse), v (very coarse) — with linear tolerances that grow with size; for class m:
$$
\begin{array}{l c c c c c c c}
\text{Nominal size (mm)} & 0.5\text{–}3 & 3\text{–}6 & 6\text{–}30 & 30\text{–}120 & 120\text{–}400 & 400\text{–}1000 & 1000\text{–}2000 \\
\text{ISO 2768-m}\ (\pm\,\mathrm{mm}) & 0.1 & 0.1 & 0.2 & 0.3 & 0.5 & 0.8 & 1.2
\end{array}
$$
The geometric general tolerances of the former ISO 2768-2 (classes H, K, L) were withdrawn in 2021 and replaced by **ISO 22081:2021**, so a modern ISO drawing writes, for example, "ISO 2768-m" for linear and angular dimensions and refers to ISO 22081 for general geometrical tolerances. **Write the loosest general tolerance the function allows and tolerance the critical features individually**, never the reverse.
**Notes that save money.** **"REMOVE ALL BURRS AND SHARP EDGES"** (or "BREAK EDGES $0.2$–$0.5$"), so that deburring does not have to be specified edge by edge. **A general casting-tolerance note** on a casting drawing (ISO 8062-3, a tolerance grade for the as-cast faces and a machining-allowance grade), so that the as-cast faces carry the foundry's tolerance and only the machined faces carry tight ones. **"DRAFT ANGLES $1^{\circ}$ UNLESS OTHERWISE STATED"** on a casting or moulding, so that draft does not have to be drawn on every face.
:::

::: example Twelve holes, three drawings {#ex-twelve}
A plate carries a row of twelve $\varnothing 9.2$ holes at a $25\ \mathrm{mm}$ pitch, to fit over twelve $\varnothing 9.0$ pins on a mating part whose pins are each located to $\pm 0.05$ from that part's datum. Each dimension on the plate can be held to $\pm 0.02$. Dimension the plate three ways and decide which assembles.
::: solution
**The clearance.** A $\varnothing 9.2$ hole on a $\varnothing 9.0$ pin allows $(9.2 - 9.0)/2 = 0.10\ \mathrm{mm}$ of radial misalignment.
**Scheme 1 — chain.** The first hole from the datum edge, then eleven links of $25 \pm 0.02$.
$$
\text{worst case at the last hole} = 0.02 + 11 \times 0.02 = \pm 0.24\ \mathrm{mm}\ \text{from the datum}, \qquad
\text{relative to the first hole} = \pm 0.22 .
$$
Against a pin that may be $0.05$ off in the other direction, the mismatch can reach $0.22 + 0.05 = 0.27\ \mathrm{mm}$ (taking the pattern as aligned on its first hole) — more than the $0.10$ clearance. **Not guaranteed to assemble.**
**Scheme 2 — baseline from one datum edge.** Every hole at $25 n \pm 0.02$ from the datum.
$$
\text{error of any hole} = \pm 0.02, \qquad \text{mismatch} \le 0.02 + 0.05 = 0.07\ \mathrm{mm} < 0.10 . \quad \textbf{It assembles.}
$$
**Scheme 3 — ordinate.** The same as baseline, written as running values from a zero point, which is compact on the drawing and maps directly onto a CNC program. The arithmetic is identical.
**Scheme 4 — position.** The better answer still: give the holes basic dimensions from the datums and $\oplus\ \varnothing 0.04$ (the circle that contains the $\pm 0.02$ square would be $\varnothing 0.057$), and do the same on the pin part, so the assembly condition is stated directly.

*Check.* $11 \times 0.02 = 0.22$ and $0.02\sqrt{11} = 0.066$: the worst case is $\sqrt{11} = 3.3$ times the RSS value. The RSS figure is an estimate of the spread of a large batch, not a guarantee. $\checkmark$

*Sanity.* Chain dimensioning matches how a manual machinist steps from feature to feature, which is why it survives on old drawings; but for a pattern that mates with another part, the position relative to the datum is what matters, and that is what baseline or position dimensioning controls.
:::
:::

::: example A tapped hole, dimensioned properly {#ex-tap}
Dimension four $M 8$ coarse tapped holes with $18\ \mathrm{mm}$ of full thread in a $25\ \mathrm{mm}$-thick aluminium plate, for screws passing through a $10\ \mathrm{mm}$ cover.
::: solution
**The callout.**
$$
4 \times M 8 - 6\mathrm{H},\ \text{thread depth } 18, \qquad \text{drill } \varnothing 6.8,\ \text{depth } 22
$$
On the drawing the depths are written with the depth symbol ↧. The thread depth and the drill depth are both stated (on many drawings the tap drill is left to the shop, but the drill depth must still allow for the thread).
**The tap drill.** For an $M 8 \times 1.25$ thread the basic minor diameter of the internal thread is
$$
D_1 = D - 1.0825\, P = 8 - 1.353 = 6.647\ \mathrm{mm}.
$$
A common shop rule expresses the **percentage of thread** as $(D - d_{\mathrm{drill}}) / (1.299\, P) \times 100\ \%$, where $1.299 P$ is twice the basic thread height. For $70\ \%$ thread:
$$
d_{\mathrm{drill}} = 8 - 0.70 \times 1.299 \times 1.25 = 6.86\ \mathrm{mm},
$$
and the standard $\varnothing 6.8$ tap drill gives $(8 - 6.8)/(1.299 \times 1.25) = 74\ \%$. Little strength is gained above about $75\ \%$, while tapping torque and tap breakage rise quickly.
**The engagement.** For a steel screw in an aluminium alloy, design guides typically ask for an engagement of about $1.5$ to $2$ diameters so that the internal thread does not strip before the screw breaks; $18\ \mathrm{mm}$ is $2.25\,d$.
**The drill depth.** A plug tap has a chamfer of about three pitches with incomplete thread, so the drill depth is roughly the thread depth plus three pitches:
$$
18 + 3 \times 1.25 = 21.75 \ \Rightarrow\ 22\ \mathrm{mm}
$$
(measured to the full drill diameter, excluding the drill point). A drawing that says only "depth $18$" invites a hole that is threaded to $18$ but drilled no deeper, so that the screw meets incomplete thread.
**The clearance hole in the cover.** ISO 273 gives, for $M 8$, $\varnothing 8.4$ (fine), $\varnothing 9$ (medium) and $\varnothing 10$ (coarse); $\varnothing 9$ is the usual choice, and its clearance sets the position tolerance the two parts may share (see [[engineering-graphics/geometric-tolerancing]]).
**Two more things for the drawing.** If the cover's top surface is rough, a **spotface** under each screw head; and the faces that are clamped together are flat enough for the joint's function (a sealing joint needs a flatness requirement).

*Sanity.* The minor diameter $6.647$ is smaller than the $6.8$ drill: the drilled hole is slightly larger than the theoretical $100\ \%$ thread would need, which is exactly what produces the roughly three-quarter thread that tapping practice wants.
:::
:::

::: example Dimensioning a machined casting {#ex-casting}
A sand-cast grey-iron (EN-GJL-250) gearbox housing, $240 \times 180 \times 160\ \mathrm{mm}$, with four machined faces, a $\varnothing 80\ \mathrm{H}7$ bearing bore and twelve machined bolt pads. Dimension it.
::: solution
**Three tolerance systems on one drawing.**
$$
\begin{array}{l l l}
\text{As-cast faces} & \text{ISO 8062-3, e.g. DCTG 9 with a stated RMAG} & \text{the foundry's tolerance and machining allowance} \\
\text{General machined} & \text{ISO 2768-m} & \pm 0.2 \text{ to } \pm 0.5\ \text{at these sizes} \\
\text{Critical} & \text{individually toleranced} & \varnothing 80\ \mathrm{H}7,\ \text{position and perpendicularity},\ Ra\ 1.6
\end{array}
$$
The general-tolerance block of the drawing says which applies where, e.g. "UNTOLERANCED AS-CAST DIMENSIONS ISO 8062-3 DCTG 9; UNTOLERANCED MACHINED DIMENSIONS ISO 2768-m".
**Datum-driven dimensioning.**
1. **Datum $A$** — the machined mounting face. Machined features are dimensioned from $A$; nothing is chained from an as-cast face.
2. **Datum $B$** — a machined end face.
3. **Datum $C$** — a machined side face.
4. The $\varnothing 80\ \mathrm{H}7$ bore is located by **basic** dimensions from $A$, $B$ and $C$ with $\oplus\ \varnothing 0.03\ A|B|C$, and oriented by $\perp\ \varnothing 0.02\ A$ if its squareness to the mounting face matters more than its location.
**One link between the two worlds.** The first machining operation must locate the casting from **as-cast** features. The drawing therefore gives a small set of **casting datums** (often datum targets on as-cast surfaces) from which the first machined face is positioned, so that the machining allowance is shared sensibly and no machined face "cleans up" on one side and leaves black spots on the other.
**Conventions for a casting drawing.** The as-cast outline of a machined face may be shown in a **long-dashed double-dotted narrow line** (ISO 128-2 line type 05.1) so that the allowance is visible. The **draft** is given in a note and the parting line is shown. Machining allowances follow the required machining-allowance grade (RMAG) of ISO 8062-3 unless stated per face.
**The dimension usually left to the foundry.** Wall thicknesses of unmachined walls, which are controlled by the pattern and cores; a minimum wall may be stated as a note.

*Design comment.* A casting drawing is two drawings superimposed — the pattern-maker's and the machinist's — and the datum structure, the casting datums and the general-tolerance notes are what keep them consistent.
:::
:::

::: example The dimension count {#ex-count}
A $120 \times 80 \times 12\ \mathrm{mm}$ plate has a $\varnothing 20$ bore at its centre, four $\varnothing 9$ holes whose centres are $10\ \mathrm{mm}$ from the two adjacent edges at each corner, and a $2 \times 45^{\circ}$ chamfer on all edges. Dimension it with the minimum complete set.
::: solution
**The minimum set.**
$$
\begin{array}{l c l}
120,\ 80 & 2 & \text{the outline, on the true-shape view} \\
12 & 1 & \text{the thickness, on the edge view} \\
\varnothing 20 & 1 & \text{the bore, on the true-shape view} \\
4 \times \varnothing 9 & 1 & \text{the holes' size, on a leader} \\
10,\ 10 & 2 & \text{one corner hole's position from the two datum edges} \\
\hline
\text{Dimensions} & 7 & \\
\text{Note 1} & & \text{"HOLE PATTERN AND BORE SYMMETRICAL ABOUT THE CENTRE LINES"} \\
\text{Note 2} & & \text{"CHAMFER } 2 \times 45^{\circ} \text{ ALL EDGES"}
\end{array}
$$
The symmetry can also be shown by drawing the two centre lines and dimensioning the hole spacing symmetrically about them ($100$ and $60$), in which case the $10,\ 10$ become redundant.
**Dimensions that must not appear in addition.** The hole spacings $100$ and $60$ (derivable from $120 - 2 \times 10$ and $80 - 2 \times 10$), the bore-to-hole offsets $50$ and $30$, the diagonal, and a separate position for every hole.
**The test.** Remove any one of the seven and something is undefined; add any derivable one and two instructions may disagree.
**The datum choice.** The two edges from which the holes are dimensioned should be the edges that locate the plate in the assembly, and they should be identified as datums.

*Sanity.* A beginner dimensions every edge; a professional dimensions every **independent** size and location — here the outline (three sizes), two feature sizes, one pattern location, and the symmetry and chamfer by note.
:::
:::

::: history
Dimensioned orthographic drawings with stated tolerances spread with interchangeable manufacture in the nineteenth and early twentieth centuries, and national drawing standards followed: **BS 308** (1927) in Britain and the American Standards Association's drawing standards in the United States, whose dimensioning and tolerancing part became **ASA Y14.5** in **1957**. The statistical treatment of tolerance stacks rests on the work at Western Electric and Bell Telephone Laboratories: **Walter A. Shewhart** proposed the control chart in an internal memorandum of **1924**, and **Harold F. Dodge** and **Harry G. Romig** published their sampling-inspection methods in the *Bell System Technical Journal* from **1929**. Internationally, dimensioning practice is set out in **ISO 129-1** (current edition **2018**), lettering in the **ISO 3098** series, and general tolerances in **ISO 2768-1:1989**, with the general geometrical tolerances of ISO 2768-2 replaced by **ISO 22081:2021**.
:::

## Where this leads

Dimensions state the geometry that [[engineering-graphics/orthographic-projection]] projects and [[engineering-graphics/sections-auxiliary-views]] cuts; their **numbers** are set by the fits of [[engineering-graphics/tolerances-fits]] and their **structure** by the datums of [[engineering-graphics/geometric-tolerancing]].

::: summary
- A dimension must be measurable, non-contradictory and attached to a visible feature; a redundant dimension is a potential contradiction.
- Chain dimensioning accumulates: $(n - 1)\,t$ worst case from first to last feature; dimensioning from a datum holds each feature to $\pm t$ from it.
- A hole pattern that mates with another part is dimensioned from datums; spacing that only matters between neighbours may be chained.
- A $\varnothing t$ position zone has $57\ \%$ more area than the coordinate square giving the same radial error, and a $\pm t/2$ square allows $41\ \%$ more radial error than $\varnothing t$.
- The general tolerance note (ISO 2768-1, ISO 22081, ISO 8062-3 for castings) covers untoleranced dimensions; write it loose and tolerance the critical features individually.
- A tapped hole needs a thread depth and a drill depth; a plug tap needs about three pitches beyond the full thread.
- The right number of dimensions is the number of independent sizes and locations: none can be removed and none added without contradiction.
:::

::: quiz
A row of twelve holes at a $25\ \mathrm{mm}$ pitch is chain-dimensioned with $\pm 0.02$ on each link. What is the worst-case error of the last hole relative to the first?
- [ ] $\pm 0.02\ \mathrm{mm}$
- [ ] $\pm 0.066\ \mathrm{mm}$
- [x] $\pm 0.22\ \mathrm{mm}$
- [ ] $\pm 0.24\ \mathrm{mm}$
::: solution
Twelve holes have eleven gaps, and eleven links of $\pm 0.02$ accumulate to $\pm 0.22\ \mathrm{mm}$ at worst case. $\pm 0.066$ is the RSS estimate, a statistical spread rather than a guarantee; $\pm 0.24$ counts twelve links — the classic off-by-one error in a stack.
:::
:::

## Exercises

::: exercise Links {level=1 check="11"}
How many chain dimensions are needed to space a row of twelve holes from one another? (Enter a number.)
::: solution
Eleven — one for each gap between neighbouring holes.
:::
:::

::: exercise General tolerance {level=1 check="0.3"}
What is the ISO 2768-m tolerance on an untoleranced $50\ \mathrm{mm}$ linear dimension? (Enter the value of $\pm t$ in millimetres.)
::: solution
$\pm 0.3\ \mathrm{mm}$ — $50$ lies in the range over $30$ up to $120\ \mathrm{mm}$.
:::
:::

::: exercise Stack {level=1 check="0.06"}
Give the RSS stack of nine links at $\pm 0.02$ each. (Enter the value of $\pm t$ in millimetres.)
::: solution
$0.02 \sqrt{9} = 0.06\ \mathrm{mm}$.
:::
:::

::: exercise Minor diameter {level=1 check="6.647"}
Give the basic minor diameter of an $M 8 \times 1.25$ internal thread. (Enter the value in millimetres.)
::: solution
$D_1 = 8 - 1.0825 \times 1.25 = 6.647\ \mathrm{mm}$.
:::
:::

::: exercise Foreshortening {level=1 check="36.3"}
A $40\ \mathrm{mm}$ edge on a face inclined at $25^{\circ}$ to the plane of projection is measured off the drawing. What length does it appear to have? (Enter the value in millimetres.)
::: solution
$40 \cos 25^{\circ} = 36.3\ \mathrm{mm}$ — a $9.4\ \%$ error if it were scaled from that view, which is why it is dimensioned in a view that shows it at true length.
:::
:::

::: exercise Zone area {level=2 check="57"}
A hole was dimensioned $\pm 0.141$ in $x$ and $y$. It is redrawn with a $\varnothing 0.4$ position tolerance, which permits the same maximum radial error. By what percentage is the tolerance area increased? (Enter the percentage.)
::: solution
$$
A_{\mathrm{circle}} = \frac{\pi}{4} \times 0.4^{2} = 0.1257\ \mathrm{mm^{2}}, \qquad
A_{\mathrm{square}} = 0.283^{2} = 0.0800\ \mathrm{mm^{2}},
$$
a ratio of $\pi/2 = 1.571$, i.e. $57\ \%$ more area.
*Sanity.* The square that **contains** the circle, $\pm 0.2$, has $0.16\ \mathrm{mm^{2}}$ — more area than the circle — but its corners allow a radial error of $0.283$, so it no longer guarantees the fit.
:::
:::

::: exercise Drill depth {level=2 check="30"}
An $M 12 \times 1.75$ tapped hole must have $24\ \mathrm{mm}$ of full thread, cut with a plug tap. Give the tap-drill diameter for $70\ \%$ thread and the percentage given by the standard $\varnothing 10.2$ drill, and the drill depth rounded up to a whole millimetre. (Enter the drill depth in millimetres.)
::: solution
$$
d_{\mathrm{drill}} = 12 - 0.70 \times 1.299 \times 1.75 = 10.41\ \mathrm{mm}, \qquad
\frac{12 - 10.2}{1.299 \times 1.75} = 79\ \%,
$$
$$
\text{drill depth} \approx 24 + 3 \times 1.75 = 29.25 \ \Rightarrow\ 30\ \mathrm{mm}.
$$
*Sanity.* The extra $6\ \mathrm{mm}$ is room for the tap's chamfered lead and for chips; a hole drilled only to $24$ would have incomplete thread over its last few millimetres and the screw would meet it before the joint was tight.
:::
:::

::: exercise Derivation {level=3 check="237"}
Derive the worst-case and RSS stack formulas and state when RSS is valid. Then take a five-part axial stack, each part $\pm 0.1$, inside a housing bore length of $\pm 0.1$; the gap must be $0.4 \pm 0.3$ and is nominally $0.4$. Treating every tolerance as $\pm 3\sigma$ of a normal distribution, compute the fraction of assemblies outside the gap specification. (Enter the result in parts per million.)
::: solution
**Worst case.** For $S = \sum x_i$ with each $x_i$ at its extreme, $\Delta S_{\mathrm{WC}} = \sum \Delta x_i = n\, \Delta x$.
**RSS.** If the $x_i$ are **independent** and each $\Delta x_i = 3 \sigma_i$, then $\sigma_S^{2} = \sum \sigma_i^{2}$ and
$$
\Delta S_{\mathrm{RSS}} = 3 \sqrt{\sum \sigma_i^{2}} = \sqrt{\sum \left( \Delta x_i \right)^{2}} = \sqrt{n}\, \Delta x .
$$
**The condition.** RSS needs statistically independent contributions that are centred in their tolerances; it fails when errors are correlated (several features from the same fixture error) or when processes run off-centre.
**Evaluation.** $\Delta S_{\mathrm{RSS}} = 0.1\sqrt{5} = 0.224\ \mathrm{mm}$, so $\sigma_S = 0.0745$; the housing has $\sigma_B = 0.0333$. The gap $G = B - S$ has
$$
\sigma_G = \sqrt{0.0745^{2} + 0.0333^{2}} = 0.0816\ \mathrm{mm},
$$
and the specification $\pm 0.3$ is $\pm 3.68\,\sigma_G$. The two-sided normal tail beyond $3.68\sigma$ is $2.37 \times 10^{-4}$, i.e. about **$237$ parts per million**.
**Worst case** gives $\Delta G = 0.5 + 0.1 = 0.6 > 0.3$: it shows that out-of-specification assemblies are **possible**, not that they are common. Worst-case analysis is used where any failure is unacceptable (safety, or a preload that must never be lost); RSS where an occasional reject is cheaper than tight tolerances.
*Sanity.* $237\ \mathrm{ppm}$ assumes centred, normal, independent processes; a process running off-centre by one standard deviation would make the reject rate many times larger, which is why RSS designs are paired with process-capability requirements.
:::
:::

::: exercise Design {level=3}
Dimension and note a welded steel machine base: a $1{,}200 \times 800 \times 600\ \mathrm{mm}$ frame of $100 \times 100 \times 8$ square hollow section with an $8\ \mathrm{mm}$ top plate, four machined pads for the levelling feet and two machined mounting rails on top for a linear guide.
::: solution
**The datum structure.** **Datum $A$** — the machined top surfaces of the two rails, on which the linear guides sit (or the machined foot pads, if the base's stance is the primary function). **Datum $B$** — the machined reference edge of one rail, against which the guide is pushed. **Datum $C$** — a machined end face or a reamed hole at one end.
**The dimensions.**
$$
\begin{array}{l l l}
1200,\ 800,\ 600 & \text{general tolerance for weldments} & \text{e.g. ISO 13920 class B for the as-welded frame} \\
\text{Rail top faces} & \text{flatness, and profile to } A & \text{the guide maker's value for the chosen accuracy class} \\
\text{Second rail} & \text{parallelism to } B\ \text{and a basic spacing} & \text{guide maker's value} \\
\text{Foot pads} & \text{profile of a surface to } A & \text{so that the four pads are coplanar within a stated zone} \\
\text{Tapped holes for the guides} & \text{basic dimensions from } A|B|C\ \text{and a position tolerance} & \text{ordinate, not chained}
\end{array}
$$
**The notes that make it a weldment.**
$$
\begin{array}{l l}
\text{Welding} & \text{welds to the welding symbols; quality to ISO 5817 level C unless noted} \\
\text{Stress relief} & \text{stress-relieve (or vibratory-relieve) after welding and before machining} \\
\text{Machining sequence} & \text{machine datum } A \text{ first, frame supported without distortion; then all other machined features} \\
\text{Finish} & \text{paint after machining; mask the machined rail faces, pads and tapped holes}
\end{array}
$$
**The decisions unique to a weldment.** **Machine after stress relief**: welding leaves residual stresses, and machining a stressed frame releases them unevenly so that the machined faces move afterwards. **Use a weldment general tolerance** (such as ISO 13920) for the as-welded dimensions rather than a machining tolerance. **Machine the functional faces to the weldment**, not to the nominal tube sizes, and give generous machining allowance on the pads.
**The tolerance that will be argued.** The coplanarity of the four foot pads. Write it as a **profile of a surface** (or a flatness applied to the four pads as one feature) relative to datum $A$, so that the zone is defined and measurable.

*Design comment.* A weldment drawing is a sequence of operations as much as a set of dimensions: the stress relief, the machining sequence and the masking notes decide the accuracy more than any tolerance value on the sheet.
:::
:::
