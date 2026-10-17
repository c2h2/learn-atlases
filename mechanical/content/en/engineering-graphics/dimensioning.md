A dimension is an **instruction**, and the difference between a drawing that works and one that does not is whether every instruction can be **measured**, is **not contradicted** by another instruction, and is attached to a **real edge** the machinist can touch with a probe. Geometry that is correct and dimensioned badly is not a bad drawing but a **dangerous** one, because it reads as finished.

The arithmetic of dimensioning is the arithmetic of tolerance accumulation, and it is the single place on a drawing where a drafter's choice changes the part's cost by a factor of five without changing a single number. **Chain** dimensioning of a twelve-hole pattern accumulates $\pm 0.22\ \mathrm{mm}$ at the last hole; **ordinate** dimensioning from a datum holds $\pm 0.02$. The two drawings look equally professional and one of them will not assemble.

::: warning Seven dimensioning errors that cannot be fixed after the first article
**A dimension on a hidden line.** The reader cannot see the two points, so the dimension is a guess about where the hidden edges are, and the guess is wrong whenever the wall thickness varies. **Dimension to a visible edge or to a centre line.** **A repeated dimension.** Two dimensions from which a third can be computed are not redundancy but **two instructions that may disagree**, and the machinist will honour the tighter and silently ignore the other — which is how a part arrives correct in every dimension and wrong in the assembly. **A dimension from a centre to a centre across a part that has no centre.** A hole-to-hole dimension is measurable only if one of the two holes can be found first, and on a datumless drawing neither can. **A dimension taken from a foreshortened view.** A distance on a $25\ {}^{\circ}$ face read off the front view is short by $\cos 25\ {}^{\circ}$, and the drafter who puts it there has written a $9\ \%$ error into the part. **A tolerance of $\pm 0.1$ on everything.** A blanket tolerance is a statement that no feature matters, and it costs $2$ to $4$ times the part price; the general tolerance should be **loose** and the **critical** dimensions tight. **A dimension that the shop cannot measure.** A position tolerance to a datum that is buried in an assembly, a radius of $R 120$ on a $30\ \mathrm{mm}$ arc, a "true position" with no stated datum reference frame — every one is a dimension that will be **signed off without being checked**, which is worse than not being dimensioned. **A dimension that is a calculation.** "The machinist will work it out" is how a drawing acquires an undocumented tolerance stack; if a dimension is derived, **derive it on the drawing** and put it in a box as a basic dimension or in brackets as a reference.
:::

## The grammar

::: definition The kinds of dimension {#def-kinds}
$$
\begin{array}{l l l l}
\text{Kind} & \text{Notation} & \text{Means} & \text{Checked?} \\
\text{Limiting} & 40\ \left( \begin{smallmatrix} + 0.1 \\ - 0.0 \end{smallmatrix} \right) & \text{a two-sided tolerance} & \text{yes} \\
\text{Bilateral} & 40\ \pm\ 0.1 & \text{symmetric} & \text{yes} \\
\text{Unilateral} & 40\ {}^{+ 0.2}_{+ 0.1} & \text{asymmetric, one-sided} & \text{yes} \\
\text{Limit} & \begin{smallmatrix} 40.2 \\ 39.8 \end{smallmatrix} & \text{max over min, no nominal} & \text{yes} \\
\text{Basic} & \boxed{40} & \text{theoretically exact; the tolerance is in a feature-control frame} & \text{yes, by GDT} \\
\text{Reference} & ( 40 ) & \text{information only, from a CAD measurement} & \textbf{no} \\
\text{Not-to-scale} & \sim 40\ \text{or } 40\ [2] & \text{approximate; do not scale} & \text{no} \\
\text{CITE} & 40\ \text{(CITE 12.5)} & \text{a dimension that must equal another} & \text{yes, relative} \\
\text{Typical} & \text{"ALL FILLETS } R 2 \text{"} & \text{a note that replaces repeated dimensions} & \text{yes}
\end{array}
$$
**The five symbols that are not letters.**
$$
\begin{array}{l l l}
\varnothing & \text{diameter} & \varnothing 12\ \mathrm{H}7 \\
R & \text{radius} & R 6 \\
S\varnothing & \text{spherical diameter} & S\varnothing 20 \\
SR & \text{spherical radius} & SR 12 \\
\square & \text{square} & \square 20 \\
\frown & \text{arc length} & \frown 34 \\
\lrcorner\; 2 \times 45^{\circ} & \text{chamfer} & 2 \times 45\ {}^{\circ} \text{ or } C2 \\
\lrcorner\; \text{(counterbore)}\ \lrcorner & \text{counterbore depth} & 4 \times \varnothing 9\ \lrcorner\ \varnothing 15 \lrcorner\ 6 \\
\lrcorner\; \text{(countersink)}\ \vee & \text{countersink} & 4 \times \varnothing 9\ \vee\ 90^{\circ} \times \varnothing 18 \\
\% & \text{taper or slope} & 1 : 20 \text{ taper}
\end{array}
$$
**The radius rule.** A circular arc is dimensioned with $R$ when it is **less than** a semicircle and with $\varnothing$ when it is **more**; a full circle is always $\varnothing$, and a $R$ on a full circle is a dimension that cannot be inspected because the centre of a full circle is not defined by the arc.
**The depth rule.** A blind hole's dimension is **two** numbers: the **thread depth** and the **drill depth**, and the drill depth is always the deeper. A single depth on a tapped hole is a dimension that asks the machinist to guess how much of the hole is threaded, and the answer is usually "all of it", which is a broken tap.
:::

::: definition Placement: the rules and the reasons {#def-place}
1. **Dimension to the view that shows the feature at its true shape.** A hole's diameter and position go on the view where it is a circle.
2. **Dimension outside the view** wherever it can be read, and never inside an outline if it can be placed outside.
3. **Never dimension on a hidden line.**
4. **Never repeat a dimension** that can be derived from others.
5. **Place the smaller dimensions nearest the view** and the larger outside them, so the dimension lines do not cross.
6. **A dimension line is never crossed by another dimension line**; a dimension line may be crossed by an extension line, and the extension line is continuous.
7. **Extension lines start $1$ to $2\ \mathrm{mm}$ from the feature** and overshoot the dimension line by $2$ to $3\ \mathrm{mm}$.
8. **The dimension text is written so it reads from the bottom for horizontal dimensions and from the right for vertical ones**, and is never interrupted by a line.
9. **A leader to a hole carries the size first and the quantity before it**: $6 \times \varnothing 9$.
10. **A dimension is never scaled from the drawing**, and the drawing carries its scale and the note "DO NOT SCALE FROM DRAWING".
**The arrowhead and the slash.** The arrow is $2.5\ \mathrm{mm}$ long with a $15\ {}^{\circ}$ included angle for $3.5\ \mathrm{mm}$ text. When the space will not take two arrows, **one arrow points in and the other two go outside on the extension lines**; when even one will not fit, use the **ISO slash** — a $2.5\ \mathrm{mm}$ oblique stroke at $60\ {}^{\circ}$ — and never a dot, which reads as a datum.
**The text height.** $3.5\ \mathrm{mm}$ for dimensions on an A3 or A4, $2.5\ \mathrm{mm}$ minimum, $5\ \mathrm{mm}$ for the title block's key dimensions. A drawing whose dimension text is $2\ \mathrm{mm}$ is a drawing that will be read on a screen at $400\ \%$ zoom and misread.
:::

## The three dimensioning schemes

::: definition Chain, baseline and ordinate {#def-schemes}
$$
\begin{array}{l l l l}
\text{Scheme} & \text{How} & \text{Tolerance at feature } n & \text{Used for} \\
\text{Chain} & A \to B \to C \to D & \pm t \sqrt{n-1}\ (\text{RSS}),\ \pm n t\ (\text{WC}) & \text{non-critical spacing} \\
\text{Baseline} & \text{all from one face} & \pm t \sqrt{2}\ \text{between any two} & \text{a flange's holes} \\
\text{Ordinate} & \text{from two datum edges, no lines} & \pm t\ \text{from the datum} & \text{hole patterns, CNC} \\
\text{Datum} & \text{from a lettered datum} & \pm t\ \text{from the datum} & \text{functional, with GDT}
\end{array}
$$
**The arithmetic that decides the scheme.** A pattern of $n$ features at a pitch with a tolerance of $\pm t$ on each link:
$$
\text{worst case at the last feature} = n\, t, \qquad
\text{RSS} = t \sqrt{n} .
$$
**The cost of the choice.** A twelve-hole pattern at a $25\ \mathrm{mm}$ pitch with $\pm 0.02$ per link:
$$
\text{chain, worst case} = 11 \times 0.02 = \pm 0.22\ \mathrm{mm}, \qquad
\text{chain, RSS} = 0.02 \sqrt{11} = \pm 0.066\ \mathrm{mm}, \qquad
\text{ordinate} = \pm 0.02\ \mathrm{mm}.
$$
**The rule.** Chain dimension where the **relative** position matters and the absolute does not — a conveyor's roller pitch, a bolted cover's slots that are $2\ \mathrm{mm}$ over-size. Ordinate or datum dimension where the **absolute** position matters — every hole that mates with another part.
:::

::: definition Dimensioning a hole pattern {#def-pattern}
**The three ways, and when each is right.**
$$
\begin{array}{l l l}
\text{Way} & \text{Drawing} & \text{Inspection} \\
\text{Coordinate from two edges} & \text{two dimensions per hole} & \text{two probe touches per hole} \\
\text{Bolt circle} & \text{one } \varnothing \text{ and one angle per hole} & \text{one touch per hole plus a datum axis} \\
\text{True position with a datum frame} & \text{basic dimensions and a } \phi \text{ position tolerance} & \text{one touch per hole, and the tolerance is a circle}
\end{array}
$$
**The bolt-circle rule.** A bolt circle is dimensioned by its **diameter** and the **angular** position of one hole, with the rest defined by a note — "EQUISPACED", "6 PLACES EQUALLY SPACED" — and the **chord** is never dimensioned, because a chord is a derived value and a derived value on a drawing is a second instruction.
**The "true position" advantage, quantified.** A hole at a basic $\left( 40,\ 25 \right)$ with a $\phi 0.4$ position tolerance has a **circular** tolerance zone of diameter $0.4$. The same hole dimensioned $40 \pm 0.2$ and $25 \pm 0.2$ has a **square** zone of $0.4 \times 0.4$, whose diagonal is $0.566$. **The position tolerance gives $41\ \%$ more tolerance for the same nominal fit**, and the reason is the ratio $\pi / \left( 2 \sqrt{2} \right) = 1.11$ of the areas of the inscribed circle to the square — the tolerance a designer actually needs is radial and a square zone wastes $30\ \%$ of it in the corners.
**The quantity note.** $6 \times \varnothing 9$ on a leader to one hole replaces six dimensions, and the note "TYP." or "ALL" replaces more — but a "typical" that is not typical is a lie, and the standard says a **typical** dimension must be identified and the exceptions dimensioned individually.
:::

::: widget plot
f: 0.02*sqrt(x); 0.02*x
x: 1, 14
y: 0, 0.3
labels: RSS stack; worst-case stack
caption: The tolerance at the last feature of a chain of $x$ links, each at $\pm 0.02\ \mathrm{mm}$. The worst-case stack grows **linearly** and reaches $\pm 0.26\ \mathrm{mm}$ at fourteen links; the RSS stack grows as $\sqrt x$ and reaches $\pm 0.075$. Ordinate dimensioning from a datum is the horizontal line at $\pm 0.02$ that neither curve can escape, which is why a hole pattern is dimensioned from a datum and a conveyor's roller pitch is chained.
:::

::: definition Dimensions and cost {#def-cost}
The tolerance a drafter writes is the largest single determinant of a machined part's price, and the multipliers are stable across the trade:
$$
\begin{array}{l c l}
\text{Tolerance on a $50\ \mathrm{mm}$ feature} & \text{Relative cost} & \text{Process} \\
\pm 0.5\ \mathrm{mm} & 1.0 & \text{flame-cut, sawn, sand-cast} \\
\pm 0.2\ \mathrm{mm} & 1.2 & \text{laser-cut, mill-cast, plasma} \\
\pm 0.1\ \mathrm{mm} & 1.5 & \text{milled, turned} \\
\pm 0.05\ \mathrm{mm} & 2.2 & \text{fine milled, reamed} \\
\pm 0.02\ \mathrm{mm} & 3.5 & \text{bored, ground, H7 reamed} \\
\pm 0.01\ \mathrm{mm} & 6.0 & \text{ground, honed, jig-bored} \\
\pm 0.005\ \mathrm{mm} & 12.0 & \text{honed, lapped, weather-controlled} \\
\pm 0.001\ \mathrm{mm} & 40.0 & \text{lapped and gauged, metrology lab}
\end{array}
$$
**The general tolerance is the price of the part.** An ISO 2768-mK drawing costs $1.0$; the same drawing at ISO 2768-fH costs $1.6$ and every $\pm 0.1$ feature becomes $\pm 0.05$. **Write the loose general tolerance and dimension the critical features tight**, and never the reverse.
**The three notes that save the most money.** **"UNUSED PROFILE REMOVE"** on a machined casting, which lets the foundry's $\pm 1\ \mathrm{mm}$ stand on the faces nobody touches. **"BREAK ALL EDGES $0.5$"**, which removes the deburring operation from every edge that is not a location. **"DRAFT $1.5\ {}^{\circ}$ UNLESS NOTED"**, which removes a drawing change from every moulded part's first article.
:::

::: example Twelve holes, three drawings {#ex-twelve}
A plate carries twelve $\phi 9$ holes at a $25\ \mathrm{mm}$ pitch in a $3 \times 4$ grid, and the mating part has $\phi 9$ pins at the same pitch with $\pm 0.05$ on each. Dimension the plate three ways and give the resulting position error at the corner hole.
::: solution
**Scheme 1 — chain.** Eleven links of $25 \pm 0.02$ from the left edge.
$$
\text{worst case} = 11 \times 0.02 = \pm 0.22\ \mathrm{mm}, \qquad
\text{RSS} = 0.02 \sqrt{11} = \pm 0.066\ \mathrm{mm}.
$$
The mating pin is at $\pm 0.05$ from its own chain, so the **total** worst-case mismatch is $0.22 + 0.22 = 0.44\ \mathrm{mm}$ against a clearance of $\left( 9.2 - 9.0 \right) / 2 = 0.1\ \mathrm{mm}$ per side. **The assembly will not go together.**
**Scheme 2 — baseline from one edge.** Every hole at $25 n \pm 0.02$ from the left datum edge.
$$
\text{error between any two holes} = \sqrt{2} \times 0.02 = \pm 0.028\ \mathrm{mm}, \qquad
\text{absolute error of any hole} = \pm 0.02\ \mathrm{mm}.
$$
The mismatch against the mating part is $0.02 + 0.05 = 0.07\ \mathrm{mm}$ worst case, inside the $0.1\ \mathrm{mm}$ clearance. **It works.**
**Scheme 3 — ordinate from two datum edges.** Two dimensions per hole from the datum corner, each $\pm 0.02$, with the pattern's orientation controlled by a datum axis.
$$
\text{error of any hole} = \pm 0.02\ \mathrm{mm}\ \text{in each axis, with no accumulation at all.}
$$
**The comparison.**
$$
\begin{array}{l c c c c}
\text{Scheme} & \text{Dimensions} & \text{Corner error} & \text{Inspection} & \text{Verdict} \\
\text{Chain} & 11 & \pm 0.22 & \text{cumulative, must be walked} & \text{fails} \\
\text{Baseline} & 12 & \pm 0.028 & \text{one touch per hole} & \text{works} \\
\text{Ordinate} & 24 & \pm 0.02 & \text{two touches per hole, CMM program writes itself} & \text{best}
\end{array}
$$
**The choice.** **Ordinate**, because the plate is made on a machining centre whose post-processor reads ordinate dimensions directly, and because the drawing's twenty-four dimensions cost nothing when they are generated from the model. **Baseline** if the plate is made on a mill with a mechanical stop. **Chain** only if the holes' relative spacing matters and their absolute position does not — which for a bolted cover with $2\ \mathrm{mm}$-oversize slots is exactly the case, and is the one honest use of a chain.

*Check.* The RSS of eleven links: $0.02 \times 3.317 = 0.066$, and the worst case $0.22$ is $3.3$ times larger — the ratio $\sqrt{n}$, which is the whole statistical argument for RSS and the whole reason a worst-case stack on a twenty-link dimension chain is $\sqrt{20} = 4.5$ times too pessimistic. $\checkmark$

*Sanity.* The reason chain dimensioning survives at all is that it is **what the machine does**: a manual mill walking from edge to edge is a chain, and a drawing that fights the process gets fought back. The ordinate drawing is cheap **because** the machine is a machining centre, and a drafter who dimensioned this plate as an ordinate in 1955 produced a part that took three times as long to set up.
:::
:::

::: example A tapped hole, dimensioned properly {#ex-tap}
Dimension four $M 8 \times 1.25$ tapped holes, $18\ \mathrm{mm}$ deep into a $25\ \mathrm{mm}$-thick aluminium plate, through a $\phi 9$ clearance hole in a $10\ \mathrm{mm}$ cover.
::: solution
**The callout.**
$$
4 \times M 8 \times 1.25\text{-}6 \mathrm{H}, \quad \varnothing 6.8\ \text{tap drill}, \quad \text{thread depth } 18, \quad \text{drill depth } 22
$$
drawn as
$$
4 \times M 8 \times 1.25\text{-}6 \mathrm{H}\ \lrcorner\ 18\ \left( 22\ \text{DP} \right)
$$
**The arithmetic of the tap drill.** The thread's minor diameter for an $M 8 \times 1.25$ is
$$
d_1 = d - 1.0825\, P = 8 - 1.353 = 6.647\ \mathrm{mm},
$$
and the tap drill is chosen to give **$65$ to $75\ \%$** of the thread height, because a $100\ \%$ thread costs twice as much to tap, gains almost nothing in **shear** strength of the external thread, and loses in **strip** strength of the internal one only above about $80\ \%$.
$$
\text{tap drill for } 70\ \% = d - 1.0825\, P \times 0.70 = 8 - 0.947 = 7.05\ \mathrm{mm} \ \Rightarrow\ \text{use } \varnothing 7.0\ \text{or the standard } \varnothing 6.8\ (68\ \%).
$$
**The engagement depth.** The strip strength of an internal thread in aluminium against an $8.8$ steel bolt is
$$
\tau_{\mathrm{strip}} \approx 0.6\, \sigma_{\mathrm{UTS,Al}}, \qquad
L_{\mathrm{engagement}} \approx \frac{F_{\mathrm{proof}}}{\pi\, d\, \tau_{\mathrm{strip}}\, \eta}
$$
and for an $M 8$ at $60\ \%$ proof in $6061\text{-}\mathrm{T}6$ the required engagement is $1.6\,d = 13\ \mathrm{mm}$; the specified $18\ \mathrm{mm}$ is $2.25\,d$ and has a $40\ \%$ margin.
**The drill depth.** $18\ \mathrm{mm}$ of thread needs a drill depth of
$$
18 + 2 P + \tfrac{1}{2} d_{\mathrm{tap}} = 18 + 2.5 + 3.4 \approx 22\ \mathrm{mm},
$$
the extra being the **chamfer-cone** length of the tap plus two pitches of unthreaded run-out. A drawing that specifies only "depth $18$" produces a hole that is $3\ \mathrm{mm}$ short and a bolt that bottoms.
**The clearance hole.** $\phi 9$ for an $M 8$ is the **medium** (ISO 273, fine series) clearance; the **close** is $\phi 8.4$ and the **wide** is $\phi 10$. The choice is a **assembly-tool** decision: $\phi 9$ lets the cover drop onto the pins with $0.5\ \mathrm{mm}$ per side of positional slack and still take a washer.
**The two things that must also be on the drawing.** **The counterbore or spotface** for the washer face, $\varnothing 17 \times 1.2$ deep, because a washer on a rough cast surface embeds and the preload relaxes by $30\ \%$. **The flatness of the bearing face**, $0.05$ over the washer diameter, because a bolt on a surface out of flat by $2^{\circ}$ loses $15\ \%$ of its fatigue strength.

*Sanity.* The $65$ to $75\ \%$ thread rule is the most-ignored number in drafting. A $100\ \%$ thread in aluminium is not stronger than a $70\ \%$ thread — it is **weaker**, because the extra engagement adds tap torque, breaks taps, leaves partial threads at the bottom, and the failure is still a stripped first two turns.
:::
:::

::: example Dimensioning a machined casting {#ex-casting}
A sand-cast gearbox housing in EN-GJL-250: a $240 \times 180 \times 160\ \mathrm{mm}$ body with four machined faces, a $\phi 80\ \mathrm{H}7$ bearing bore, and $12$ machined bolt pads. Dimension it.
::: solution
**The three tolerance systems on one drawing.**
$$
\begin{array}{l l l}
\text{As-cast} & \text{ISO } 8062\ \text{CT9 / D} & \pm 1.0\ \mathrm{mm}\ \text{linear},\ \pm 0.8\ \text{flatness},\ 1.5\ {}^{\circ}\ \text{draft} \\
\text{General machined} & \text{ISO } 2768\text{-mK} & \pm 0.2\ \text{to} \pm 0.5\ \text{by size} \\
\text{Critical} & \text{individually toleranced} & \phi 80\ \mathrm{H}7,\ \perp 0.03,\ \mathrm{Ra}\ 1.6
\end{array}
$$
**The note that saves the part.**
$$
\text{MACHINE FINISH ALL OVER} \quad \longrightarrow \quad \textbf{UNUSED PROFILE REMOVE}
$$
The first note asks the foundry to deliver a net-shape casting and the machinist to spend $40\ \%$ of the cycle squaring a block. The second says the same thing and lets the foundry's tolerance stand on every face that is not machined.
**The datum-driven dimensioning.**
1. **Datum $A$** — the mounting foot's machined face. Every machined feature's axial position is dimensioned from $A$ and **nothing** is chained from the as-cast bottom.
2. **Datum $B$** — the machined end face. The bearing bore's position is dimensioned from $B$.
3. **Datum $C$** — the machined side face.
4. The $\phi 80\ \mathrm{H}7$ bore is dimensioned with **basic** dimensions from $A$, $B$ and $C$ and a feature-control frame $\left| \varnothing 0.03 \right| A \left| \perp 0.02 \right| A$.
**The four rules for a casting.** **Every machined face is drawn twice** — once as the as-cast outline in a **type-E phantom line** and once as the machined face in a type-A line — so the machinist can see the minimum material. **The draft is a note and not a dimension**, and the drawing states the **draw direction** with an arrow. **The machining allowance is stated per face**: "$3\ \mathrm{mm}$ on the bearing bosses, $2\ \mathrm{mm}$ elsewhere, from the pattern". **The parting line is drawn**, because a parting-line flash of $1\ \mathrm{mm}$ on a machined face eats the $2\ \mathrm{mm}$ allowance.
**The one dimension that must not appear.** The **wall thickness**. It is the foundry's, it is $\pm 1.5\ \mathrm{mm}$, and dimensioning it invites the machinist to be blamed for it. The note is "MINIMUM WALL $6\ \mathrm{mm}$ PER PATTERN".

*Design comment.* The general rule is that **a casting drawing is two drawings superimposed** — the pattern's and the machinist's — and the drawing's job is to keep them from arguing. The phantom-line as-cast outline, the "unused profile remove" note and the datum structure are the three devices that do it, and a casting drawing without all three will be quoted wrong.
:::
:::

::: example The dimension count {#ex-count}
A $120 \times 80 \times 12\ \mathrm{mm}$ plate has a $\phi 20$ bore at the centre, four $\phi 9$ holes at $10\ \mathrm{mm}$ from each corner, and a $2 \times 45\ {}^{\circ}$ chamfer all round. Dimension it with the minimum set.
::: solution
**The minimum set.**
$$
\begin{array}{l c l}
120,\ 80 & 2 & \text{the outline, on the true-shape view} \\
12 & 1 & \text{the thickness, on the edge view} \\
\varnothing 20 & 1 & \text{the bore, on the true-shape view; its position is the centre, which needs no dimension} \\
4 \times \varnothing 9 & 1 & \text{the size, on a leader} \\
10,\ 10 & 2 & \text{the corner hole's position from the two datum edges} \\
\text{EQUISPACED / SYMMETRICAL} & 1 & \text{a note that replaces six dimensions} \\
2 \times 45\ {}^{\circ} & 1 & \text{the chamfer, as a note "ALL EDGES"} \\
\hline
\text{Total} & 8 & \text{dimensions and two notes}
\end{array}
$$
**The dimensions that must not appear.** The $100$ between the corner holes (derivable), the $100$ in the other direction (derivable), the $60$ between the bore and a hole (derivable), the diagonal (derivable), the second and third and fourth hole positions (the note covers them), the chamfer on each of the four edges (the note covers them), and the **radius** $R 10$ of the bore (it is a diameter).
**The test.** Remove any one of the eight and the part is ambiguous; add any one and it is contradictory. **Eight dimensions, two notes, one datum pair.**
**The datum choice.** The two datum edges are the **as-cut** edges of the plate, and the drawing must say which two — a plate cut to $\pm 0.5$ has four edges and the datum must be the two that will be **visible in the assembly**, because a hole positioned from a hidden edge cannot be checked in situ.

*Sanity.* The reason "eight" is the right answer and "twenty" is the answer a beginner gives is that a beginner dimensioned **every edge** and the professional dimensioned **every degree of freedom**. A rectangular plate has four — two widths, one thickness, one bore diameter — plus the hole pattern's two, and the count is the count of the degrees of freedom.
:::
:::

::: history
The dimension **arrowhead** at $15\ {}^{\circ}$ and $2.5\ \mathrm{mm}$, the extension line with its $1\ \mathrm{mm}$ gap and its $2\ \mathrm{mm}$ overshoot, and the rule that a dimension is never scaled are all **machine-shop** inventions of the 1890s and 1900s, adopted because the alternative — a shop **full-size lofted** from the drawing, as the shipyards and bridge shops did until the 1920s — did not survive interchangeable production; the **Taylor** school's time studies at **Bethlehem Steel** in the 1890s are the origin of the "dimension to the gauge" doctrine. **The tolerance stack** and its statistics descend from **W. A. Shewhart**'s 1924 control chart and **Harold Dodge**'s and **Harry Romig**'s 1929 sampling work at **Western Electric**, and the **root-sum-square** rule was standard practice in the aerospace industry by 1945 and in general engineering by the **1960s** — which is why a 1950s drawing chains everything and a 1990s drawing dimensioned from datums. **The "basic dimension in a box" and the feature-control frame** are the **ANSI Y14.5** of 1962 and its descendants, the **Geometric Dimensioning and Tolerancing** movement that began with **Stanley Parker**'s and **James Fessler**'s 1957 paper "A New System for Dimensioning and Tolerancing for Interchange" at the **Society of Automotive Engineers**, and the reason a modern drawing can specify a $\phi 0.4$ circular tolerance zone instead of a $0.4$ square one. **The ISO 2768 general-tolerance table** of 1989 and the **ISO 225** and **ISO 3098** series made the "general tolerance in the title block" convention international, and the **cost-versus-tolerance** multipliers quoted above are the stable consensus of the American **Machinists' and Manufacturing Suppliers Association** cost studies and the British **ADEPT** machining-cost models, which agree to within $20\ \%$ on every point of the curve.
:::

## Where this leads

Dimensions state the geometry that [[engineering-graphics/orthographic-projection]] projects and [[engineering-graphics/sections-auxiliary-views]] cuts; their **numbers** are set by the fits of [[engineering-graphics/tolerances-fits]] and their **structure** by the datums of [[engineering-graphics/geometric-tolerancing]].

::: summary
- A dimension must be measurable, non-contradictory and attached to a real edge; a repeated dimension is a contradiction and a dimension on a hidden line is a guess.
- Chain, baseline and ordinate differ only in where the tolerance accumulates: $nt$, $\sqrt{2}\,t$ and $t$.
- A hole pattern is dimensioned from a datum; a relative pitch is chained.
- A position tolerance gives 41\ % more tolerance than the equivalent square zone, because the tolerance you need is radial.
- The general tolerance sets the part's price; write it loose and dimension the critical features tight.
- A casting drawing is two drawings superimposed, and "unused profile remove" is the note that keeps them from arguing.
- The right number of dimensions is the number of degrees of freedom, and the test is that none can be removed or added.
:::

::: quiz
A twelve-hole pattern at a $25\ \mathrm{mm}$ pitch is chain-dimensioned with $\pm 0.02$ on each link. What is the worst-case position error of the last hole?
- [ ] $\pm 0.02\ \mathrm{mm}$
- [ ] $\pm 0.066\ \mathrm{mm}$
- [x] $\pm 0.22\ \mathrm{mm}$
- [ ] $\pm 0.24\ \mathrm{mm}$
::: solution
Eleven links of $\pm 0.02$ accumulate arithmetically to $\pm 0.22\ \mathrm{mm}$ at worst case; $\pm 0.066$ is the RSS value, which is a statistical expectation and not a guarantee. $\pm 0.24$ would be twelve links — the pattern has twelve holes and therefore eleven gaps, and getting that off by one is the most common arithmetic error in a stack.
:::
:::

## Exercises

::: exercise Symbols {level=1 check="0"}
A full circle is dimensioned with $R$ or with $\varnothing$?
::: solution
$\varnothing$ — a radius on a full circle has no inspectable centre.
:::
:::

::: exercise Reference {level=1 check="0"}
How many times is a reference dimension checked?
::: solution
None — it is information only and is drawn in brackets.
:::
:::

::: exercise Stack {level=1 check="0.06"}
Give the RSS stack in millimetres of nine links at $\pm 0.02$.
::: solution
$0.02 \sqrt{9} = 0.06\ \mathrm{mm}$.
:::
:::

::: exercise Tap drill {level=1 check="6.647"}
Give the minor diameter in millimetres of an $M 8 \times 1.25$ thread.
::: solution
$d_1 = 8 - 1.0825 \times 1.25 = 6.647\ \mathrm{mm}$.
:::
:::

::: exercise Cost {level=1 check="3.5"}
Give the relative cost of $\pm 0.02\ \mathrm{mm}$ on a $50\ \mathrm{mm}$ feature against $\pm 0.5\ \mathrm{mm}$ at $1.0$.
::: solution
$3.5$ times.
:::
:::

::: exercise Zone area {level=2}
Compare the area of a $\phi 0.4$ circular position tolerance zone with that of a $0.4 \times 0.4$ square zone, and give the percentage gain.
::: solution
$$
A_{\mathrm{circ}} = \frac{\pi}{4} \times 0.4^{2} = 0.1257\ \mathrm{mm^{2}}, \qquad
A_{\mathrm{sq}} = 0.4^{2} = 0.1600\ \mathrm{mm^{2}} .
$$
The circle is $78.5\ \%$ of the square, so the square has $27\ \%$ more area — but the square's extra area is **entirely in the corners**, at a radial distance of up to $0.283\ \mathrm{mm}$ against the circle's $0.200$. **For the same worst-case radial error the circle is the larger allowance**: a square zone of side $s$ has a diagonal of $s\sqrt{2}$, so a $\phi 0.4$ circle is equivalent to a square of side $0.4 / \sqrt{2} = 0.283$, which is $\pm 0.141$ per axis against the $\pm 0.2$ a square zone would nominally carry.
*Sanity.* The honest statement is that a $\pm 0.2 / \pm 0.2$ square zone permits a radial error of $0.283$ and a $\phi 0.4$ position tolerance permits only $0.200$ — so the position tolerance is **tighter** at the corners and **looser** along the axes, and the designer gains by being able to say which one they meant.
:::
:::

::: exercise Drill depth {level=2}
An $M 12 \times 1.75$ tapped hole must have $24\ \mathrm{mm}$ of full thread. Give the drill depth, and the tap-drill diameter for $70\ \%$ thread.
::: solution
$$
d_1 = 12 - 1.0825 \times 1.75 = 10.106\ \mathrm{mm}, \qquad
d_{\mathrm{drill}} \approx 12 - 1.0825 \times 1.75 \times 0.70 = 10.68\ \mathrm{mm} \ \Rightarrow\ \varnothing 10.7\ \text{or the standard } \varnothing 10.5 .
$$
$$
\text{drill depth} = 24 + 2 P + \tfrac{1}{2} d_{\mathrm{drill}} = 24 + 3.5 + 5.35 \approx 33\ \mathrm{mm} .
$$
*Sanity.* The $9\ \mathrm{mm}$ of unthreaded hole is not waste: it is the tap's chamfer cone plus the chips, and a hole drilled to exactly $24$ leaves the last three turns of the bolt bearing on the bottom of the hole and the joint loses all its preload the moment it is tightened.
:::
:::

::: exercise Derivation {level=3}
Derive the worst-case and RSS stack-up formulas, state the condition under which RSS is valid, and compute the tolerance of a five-part axial stack at $\pm 0.1$ each, both ways, and the fraction of parts that fail if the gap must be $0.4 \pm 0.3$.
::: solution
**Worst case.** The stack $S = \sum x_i$ with each $x_i$ at its extreme:
$$
\Delta S_{\mathrm{WC}} = \sum \Delta x_i = n\, \Delta x .
$$
**RSS.** If the $x_i$ are **independent** and the $\Delta x_i$ are $3\sigma$ limits, then $\sigma_S^{2} = \sum \sigma_i^{2}$ and
$$
\Delta S_{\mathrm{RSS}} = 3 \sqrt{\sum \sigma_i^{2}} = \sqrt{\sum \left( \Delta x_i \right)^{2}} = \sqrt{n}\, \Delta x .
$$
**The condition.** RSS is valid only if the contributions are **statistically independent** — which a machined stack usually is — and **not** if they are physically related, as when five holes are all positioned by the **same** fixture datum, in which case the errors are perfectly correlated and the correct answer is the worst case.
**Evaluation.** $n = 5$, $\Delta x = 0.1$:
$$
\Delta S_{\mathrm{WC}} = 0.50\ \mathrm{mm}, \qquad \Delta S_{\mathrm{RSS}} = 0.1 \sqrt{5} = 0.224\ \mathrm{mm} .
$$
**The failure fraction.** The gap is $G = B - S$ with the bore $B$ at $\pm 0.1$ and the stack $S$ at $0.224$ RSS, so
$$
\sigma_G = \sqrt{0.224^{2} + 0.1^{2}} / 3 = \sqrt{0.0502 + 0.01} / 3 = 0.2453 / 3 = 0.0818\ \mathrm{mm},
$$
and the specification is $\pm 0.3$, i.e. $\pm 3.67\sigma$. The two-sided tail beyond $3.67\sigma$ is $2 \times 1.2 \times 10^{- 4} = 2.4 \times 10^{- 4}$, or **240 parts per million**.
**The same calculation at worst case** gives $\Delta G = 0.5 + 0.1 = 0.6 > 0.3$ and predicts a **$100\ \%$** failure rate — which is why a worst-case analysis is used for a **safety** stack and RSS for a **cost** stack, and why the two answers must never be compared.
*Sanity.* The $240\ \mathrm{ppm}$ is the honest number and the $100\ \%$ is the safe one; a designer who quotes $240\ \mathrm{ppm}$ for a bearing preload stack that must never be negative has used a statistical argument on a deterministic requirement.
:::
:::

::: exercise Design {level=3}
Dimension and note a welded steel frame: a $1{,}200 \times 800 \times 600\ \mathrm{mm}$ machine base of $8\ \mathrm{mm}$ plate and $100 \times 100 \times 8$ SHS, with four machined pads for the legs, two machined ways and a levelling pad.
::: solution
**The datum structure.** **Datum $A$** — the machined underside of the base plate, the only surface that touches the machine. **Datum $B$** — the machined way's reference edge. **Datum $C$** — the machined end plate.
**The dimensions.**
$$
\begin{array}{l l l}
1200,\ 800,\ 600 & \pm 3 & \text{as-welded overall, from the general tolerance} \\
\text{Way centres} & 1.5\ \text{basic from } B,\ \parallel 0.05 / 500 & \text{the ways' parallelism, not their position} \\
\text{Four leg pads} & 0.15\ \text{from } A,\ \parallel 0.1 & \text{coplanar within } 0.1\ \text{across the whole } 1200 \\
\text{Levelling pad} & 0.1\ \text{from } A,\ \perp 0.05\ \text{to } A & \\
\text{Bolt holes} & 4 \times \varnothing 18\ \text{basic from } A B C & \text{ordinate, not chained}
\end{array}
$$
**The seven notes that make it a weldment.**
$$
\begin{array}{l l}
\text{Welding} & \text{weld to EN ISO } 5817\ \text{level C; fillet } 6 \text{ unless noted; weld all around the SHS joints} \\
\text{Relief} & \text{stress-relieve after welding and before machining; do not machine before relief} \\
\text{Straightening} & \text{cold-straighten before relief; no flame straightening} \\
\text{Machining} & \text{machine datum } A \text{ first, in one setup, with the frame on four adjustable pucks} \\
\text{Grain} & \text{machine the ways in the long direction only, and note the direction on the drawing} \\
\text{Finish} & \text{paint after machining; mask the ways and the pads} \\
\text{Flatness} & \text{datum } A \text{ flat to } 0.2\ \text{over the whole area, checked on a surface plate with the frame unloaded}
\end{array}
$$
**The three decisions that are unique to a weldment.** **The drawing is dimensioned after stress relief and the notes say so**, because an unrelieved weldment moves $0.5$ to $2\ \mathrm{mm}$ per metre over six months and a machined-flat datum machined before relief is flat for a week. **The weld is dimensioned as a fillet size and a length and not as a leg**, because the welder controls the fillet. **The machining allowance on the cast and rolled stock is stated per face**, and the SHS's $\pm 1.5\ \mathrm{mm}$ width tolerance is **not** dimensioned — the pads are machined to the weldment and not to the tube.
**The one dimension that will be argued.** The $0.1$ coplanarity of the four leg pads across $1{,}200\ \mathrm{mm}$. It is a **flatness** requirement on four small pads, and the correct specification is a **profile** tolerance to datum $A$ and not a coplanarity note, because "coplanar" has no tolerance zone and "profile $0.1$ to $A$" has one that an inspector can measure.

*Design comment.* The general rule is that **a weldment drawing is a sequence of operations wearing a dimension sheet**, and the notes — relief, sequence, masking, direction — determine the accuracy far more than any tolerance on the drawing. A frame dimensioned to $\pm 0.05$ and stress-relieved after machining is a frame that will not hold $\pm 0.05$.
:::
:::
