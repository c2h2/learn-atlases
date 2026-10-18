Sheet-metal forming is the process family that makes the largest number of metal parts in the world and the least understood: a car body is 350 pieces of it, an aircraft is 2,000, a washing machine is forty, and a laptop case is six. It is also the family in which the *material* decides the design most brutally, because a sheet is not a solid. In [[manufacturing/bulk-forming|bulk forming]] the work is confined, triaxially compressed, and free to be pushed into any shape the die can cut; a sheet is a **two-dimensional object loaded in its own plane**, and it has exactly two ways to fail — **it wrinkles where it is compressed and it tears where it is stretched** — and a good drawing die spends its whole life holding the sheet precisely at the boundary between those two.

Everything in this lesson follows from that one sentence. Wrinkling is buckling, and buckling gets worse as the sheet gets thinner, so thin sheets are wonderful for drawing and hopeless for stretching. Tearing is a neck, and a neck stops growing only if the metal work-hardens, so **drawability is measured by two metallurgical constants — the strain-hardening exponent $n$, which decides whether a neck stops growing, and the plastic strain ratio $\bar { r }$ , which decides whether the sheet thins or thickens** — both of them metallurgical quantities that a steelworks controls by annealing temperature and inclusion chemistry and that a designer cannot change. And because the sheet is thin, the forces are small — a car door outer is drawn at 400 tonnes where a connecting rod is forged at 4,000 — but the *energy* is in the tooling, not the press: a single body-side die set is a 40-tonne casting of tool steel that takes six months of a skilled man's life to cut and try out, which is why a car model costs £100 million in body tooling and why the panels are designed by the die shop as much as by the styling studio.

::: warning Six ways sheet-metal design goes wrong
**Specifying a bend radius smaller than the material will allow.** The minimum inside radius is a multiple of the thickness and of the material's reduction of area: $r _ { \min } \approx t$ for annealed mild steel, $2 t$ for normalised high-strength steel, $4 t$ for hard brass, and $6 { - } 1 2 t$ for a 1,000 MPa hot-stamped boron steel that must be bent cold after forming or not at all. Ask for $0 . 5 t$ and the outside fibre, whose strain is $t / ( 2 r + t ) = 3 3 \ \ \%$ , simply cracks — and it cracks on the visible face, after the paint. **Bending parallel to the rolling direction.** Sheet has a texture, and a texture means the strain to crack across the fibres is half that along them; the drawing office rule is that **every bend line is drawn at right angles to the rolling direction marked on the blank**, and the blank-holder's orientation mark is not a suggestion. **Ignoring springback.** A bend is made plastically and released elastically, and the angle you get is not the angle the tool had. For mild steel air-bent to a sharp radius it is $1 { - } 3 ^ { \circ }$ , which a press-brake operator corrects by eye; for a 1,000 MPa steel it is $5 { - } 1 0 ^ { \circ }$ , which no operator corrects, and it is why high-strength steel is either **hot stamped** (formed at $9 0 0 \ \mathrm { ^ { \circ } C }$ and quenched in the die, so that it springs back by the amount the die was designed for and then not at all) or **coined and ironed** at the end of the stroke at four times the tonnage. **Drawing a cup that is too deep for one draw.** The limit draw ratio of mild steel is $D / d \approx 2 . 1$ ; ask for 3 and the wall thins, then splits at the punch radius, and the answer is two draws with an anneal between, which is two die sets, two presses and one more tolerance stack. **Confusing the material's tensile ductility with its forming capability.** A steel with 30 % elongation in a tensile bar can be a poor drawing steel, because a tensile bar measures stretching in one direction and a flange measures *thickening* while stretching in another: the number that matters is the **Lankford $r$ -value**, the ratio of the true width strain to the true thickness strain, and a steel with $r = 0 . 6$ will not draw what a steel with $r = 2 . 0$ draws easily. **And designing the part before the die is designed.** A drawing die cannot make a corner with a radius smaller than the sheet plus the die's own wear, cannot make an undercut, cannot hold a dimension across a draw, and cannot be repaired cheaply once it has been hand-polished and try-out-corrected. **The sheet-metal part that costs money is the one whose drawing office has never watched a die being tried out.**
:::

## 1. Shearing: cutting a sheet without cutting it

::: definition Blanking, punching and the clearance that decides the edge {#def-shear}
Blanking (the slug is the part) and punching (the slug is scrap) are the same operation: two hardened edges, a punch and a die, with a **clearance** between them of $c = 0 . 0 5 { - } 0 . 1 3 t$ per side depending on the material — 5-8 % of the thickness for stainless, 6-10 % for mild steel and aluminium, 10-13 % for the soft, gummy ones. The punch pushes the edge into the sheet, a **rollover** of about $0 . 0 5 t$ forms, a burnished band of plastic shear grows down (or up) as the crack nucleates at the die edge and again at the punch edge, and the two cracks meet. **If the clearance is right the two crack lines line up and the edge is half burnish, half fracture, with a small burr; if it is too small the cracks do not meet and you get a double burnish and a large secondary shear; if it is too large the sheet is pulled and bent over and the edge is rolled, wide and dished.** The four zones — rollover, burnish, fracture, burr — are a diagnosis: a maintenance engineer reads a stamped part's edge the way a doctor reads a tongue.

The force is a pure shear-area calculation, and it is the reason blanking dies are built with a staggered cutting line:

$$
F \; = \; \tau _ { \text{UTS } } A _ { \text{shear } } \; \approx \; 0 . 8 \, \sigma _ { \text{UTS } } \, P \, t \qquad ( P \ \text{the perimeter of the cut} )
$$

with the peak occurring at about 60 % of the punch stroke and dropping to nothing the moment the cracks link. **Shearing the punch face at an angle of $1 { - } 3 ^ { \circ }$ , or stepping the punches to different heights by $h = t / ( 2 \tan \phi )$ , cuts the peak force to $F t / ( t + h )$ and lets a small press do a big hole** — at the cost of a slightly dished part and a punch that regrinds more often. A stripper plate above the sheet holds the part down and, more importantly, keeps the sheet flat while the next hole is punched; a spring or urethane pad does the same below.

$$
\begin{array} { l c c c c }
\text{Operation} & \text{What is the part} & \text{Typical clearance} & \text{Edge quality} & \text{Note} \\ \hline
\text{Punching} & \text{the hole} & 8 \ \% \ t & \text{good} & \text{slug must be ejected or it marks the sheet} \\
\text{Blanking} & \text{the blank} & 6 \ \% \ t & \text{good, one face bright} & \text{the die is the gauge} \\
\text{Fine blanking} & \text{the blank} & 0 . 5 \ \% \ t & 9 5 \ \ \% \ \text{shear face} & \text{V-ring holder, counter-punch, no fracture at all} \\
\text{Shearing on a guillotine} & \text{the strip} & 4 \ \% \ t & \text{poor, work-hardened} & \text{the edge must be ground before forming} \\
\text{Laser / waterjet} & \text{the blank} & \text{kerf} & \text{good, HAZ} & \text{no tooling, slow, prototype and short run}
\end{array}
$$

**Fine blanking is the exception that proves the rule**: with a V-shaped **cognet ring** clamping the blank hard, a small clearance of $0 . 5 \ \ \% \ t$ , and a counter-pressure on the punch face, the hydrostatic pressure suppresses the fracture entirely and the cut is 95 % burnish with an as-sheared $R _ { a }$ of $1 . 6 \ \mu \mathrm { m }$ and dimensional tolerance of $\pm 0 . 0 5 \ \mathrm { m m }$ — parts that would otherwise be machined, at 2,000 a minute.
:::

::: example Punching a flange: force, and what the shear buys {#ex-blank level=3 check="40"}
A $2 0 \ \mathrm { m m }$ diameter hole is punched through $2 \ \mathrm { m m }$ of mild steel sheet, $\sigma _ { \text{UTS } } = 4 0 0 \ \mathrm { M P a }$ , with a clearance of $6 \ \ \%$ per side.

$$
F \; = \; \pi d \, t \, ( 0 . 8 \sigma _ { \text{UTS } } ) \; = \; { \frac { \pi \times 2 0 \times 2 \times 3 2 0 } { 1 0 ^ { 3 } } } \; = \; { \bf 4 0 \ k N }
$$

**Forty kilonewtons — four tonnes — for a hole that costs a fraction of a penny**, which is why blanking is never a force problem and always a **die problem**: the punch is $2 0 \ \mathrm { m m }$ of tool steel with a $9 0 \ \ \mu \mathrm { m }$ clearance band that must not buckle, must not gall, and must be regrindable forty times; the stripper must not mar; and the slug must be allowed to leave, because a trapped slug in a die will crack the die block on the next stroke and put a £4,000 repair into a part worth £0.03. Shearing the punch to a $2 ^ { \circ }$ land (an offset of $h = 0 . 3 5 \ \mathrm { m m }$ ) drops the peak to $4 0 \times 2 / ( 2 + 0 . 3 5 ) = 3 4 \ \mathrm { k N }$ and, more importantly, spreads the load over a longer stroke so the press flywheel barely notices. **The clearance of $6 \ \ \%$ is $0 . 1 2 \ \mathrm { m m }$ per side, and the die is made to that dimension plus the punch wear allowance: a blanking die is a gauge, and after 300,000 strokes the punch has shortened and the clearance has opened and the burr has grown, which is the maintenance signal.**
:::

## 2. Bending: the neutral axis that is not where you think

::: definition Bend allowance, the K-factor and the minimum radius {#def-bend}
A sheet bent to a radius $r$ about a punch of that radius keeps its **inner surface** at the punch radius and its **outer surface** at $r + t$ , but somewhere in between a surface does not change length: the **neutral axis**, at a radius $r + K t$ . It is not at the mid-thickness, because the inner half is compressed and thickens while the outer half stretches and thins, and volume constancy moves the neutral axis **inwards**. The empirical **$K$ -factor** is

$$
K \; \approx \; { \left\{ \begin{array} { l l } { 0 . 3 3 } & { r / t < 1 \text{ (sharp, heavy forming)} } \\ { 0 . 4 0 } & { 1 \leq r / t \leq 3 \text{ (ordinary)} } \\ { 0 . 5 0 } & { r / t > 3 \text{ (nearly pure bending)} } \end{array} \right. } \qquad \text{and the } \textbf{bend allowance} \text{ is } \; B A \; = \; { \frac { \pi \theta } { 1 8 0 } } ( r + K t )
$$

The flat pattern is built from the **setback** $S B = ( r + t ) \tan ( \theta / 2 )$ — the distance by which each outside leg overshoots the tangent point — and the **bend deduction** $B D = 2 S B - B A$ , which is what one bend actually costs in length:

$$
L _ { \text{flat } } \; = \; \sum ( \text{outside legs, to the virtual corner} ) \; - \; \sum B D
$$

For a single $9 0 ^ { \circ }$ bend this is $L = A + B - 2 ( r + t ) + B A$ , and for two bends $L = A + B + C - 2 B D$ . **Every CAD system and every press-brake back-gauge does this arithmetic, and every argument about a scrapped blank is an argument about which of $r$ , $K$ and $t$ the two parties disagreed about.**

**Get this wrong by a millimetre and the part is scrap at the press and the argument is about whose millimetre it was; get it right and the drawing office and the die shop share one number, which is the entire point of the K-factor.** CAD systems carry a bend table, the table is built by bending coupons of each lot of each alloy, and the good shops rebuild it per coil, because $K$ moves with the lot.

The **minimum inside radius** is set by the strain on the outer surface, which for a pure bend is

$$
\varepsilon _ { \text{outer } } \; = \; \ln \! \left( { \frac { r + t } { r } } \right) \approx { \frac { t } { 2 r + t } } \quad \text{(engineering form)} \qquad \Longrightarrow \qquad r _ { \min } \; = \; t \, \left( { \frac { 1 } { 2 \varepsilon _ { \text{allow } } } } - { \frac { 1 } { 2 } } \right)
$$

and $\varepsilon _ { \text{allow } }$ is a good deal less than the tensile reduction of area, because the outer surface of a bend is in plane strain and carries scratches, sheared-edge microcracks and rolling-direction texture. Hence the shop table: $r _ { \min } = 0 . 2 5 t$ for annealed low-carbon steel bent across the grain, $t$ for as-rolled mild steel, $2 t$ for normalised HSLA, $3 { - } 4 t$ for 500-700 MPa grades, $4 { - } 6 t$ for 700-1,000 MPa cold-formed grades, and **no cold bending at all** for 1,500 MPa press-hardened boron steel, which is formed hot and quenched in the die.
:::

::: proof The air-bending force {#proof-bendforce}
Air bending is a three-point bend: the sheet rests on a die of shoulder span $V$ and is pushed at midspan by a punch of radius $r _ { p }$ . At the end of the stroke the sheet has become a plastic hinge at the punch, so equating the external moment to the fully plastic moment of the strip,

$$
{ \frac { F _ { \text{total } } V } { 4 } } \; = \; M _ { p } \; = \; \sigma _ { y } \, w \, { \frac { t ^ { 2 } } { 4 } } \qquad \Longrightarrow \qquad F \; = \; { \frac { \sigma _ { y } \, w \, t ^ { 2 } } { V } }
$$

Two corrections turn this into the formula on every press-brake catalogue. The deformation is not at yield but at the tensile strength, because the strip has rotated through a large angle and the strain at the outer surface is $t / ( 2 r + t ) \sim 2 0 \ \ \%$ ; and the strain state is plane strain, which raises the flow stress by the factor $2 / \sqrt { 3 } = 1 . 1 5$ , while the friction of the sheet sliding on the die shoulders raises it again. Together they give the standard **1.42**:

$$
\boxed { \; F \; = \; { \frac { 1 . 4 2 \; \sigma _ { \text{UTS } } \; w \; t ^ { 2 } } { V } } \quad \Longleftrightarrow \quad F \ [ \mathrm { k N / m } ] \; = \; { \frac { 1 . 4 2 \; \sigma _ { \text{UTS } } \ [ \mathrm { M P a } ] \; t ^ { 2 } \ [ \mathrm { m m } ] } { V \ [ \mathrm { m m } ] \; \times \; 1 0 0 0 } } \times 1 0 0 0 \; }
$$

**Note the two things this formula says about a press brake.** The force is **inversely proportional to the die opening**, so halving the $V$-block to get a sharper bend doubles the tonnage — and the $V$ -block must be at least $8 t$ wide or the sheet is drawn into the die and the bend is scored and the die shoulder wears a groove. And the force is **linear in the thickness squared**, so a 25 % thicker sheet is a 56 % heavier job: the reason a brake rated at 100 tonnes over 3 m can bend $6 \ \mathrm { m m }$ mild steel but only $2 . 5 \ \mathrm { m m }$ of 1,000 MPa steel, and why a shop that buys a brake for its current job and then takes a high-strength job is buying a second brake.
:::

::: widget plot
title: Press-brake tonnage against die opening — the 1/V that ends the argument
f: 2272/x; 5680/x; 333
x: 6,30
y: 0,400
labels: 2 mm mild steel, 400 MPa; 2 mm HSLA, 1000 MPa; the capacity of a 1000 kN/m brake
caption: Force per metre of bend against the die shoulder span $V$ , for $2 \ \mathrm { m m }$ sheet of two alloys, from $F = 1 . 4 2 \sigma _ { \text{UTS } } t ^ { 2 } / V$ . The mild-steel curve is comfortably inside a 100-tonne brake at every die opening; the 1,000 MPa curve only crosses the press limit at $V = 1 7 \ \mathrm { m m }$ , and **the die-opening rule of $V \geq 8 t$ means the smallest die you may use on $2 \ \mathrm { m m }$ stock is $1 6 \ \mathrm { m m }$ — so high-strength steel is bought at the very edge of the machine's capacity, with no margin for a harder coil.** The corollary that surprises nobody in a shop: **the same brake, the same tooling and a coil 40 MPa harder than certified can turn a good week into a week of cracked bends and stalled rams**, which is why the material certificate is a process document and not paperwork.
:::

## 3. Springback: the bend you did not make

::: definition Why the angle is never the angle {#def-spring}
Under the punch the sheet is plastically bent; when the punch withdraws, the *elastic* part of the strain, which was being carried as a residual stress field by the elastic core, springs back out. The classical estimate comes from unloading a beam whose moment is the fully plastic one, $M _ { p } = \sigma _ { y } w t ^ { 2 } / 4$ , whose curvature change is

$$
\Delta \kappa \; = \; { \frac { M _ { p } } { E I } } \; = \; { \frac { \sigma _ { y } w t ^ { 2 } / 4 } { E \, w t ^ { 3 } / 1 2 } } \; = \; { \frac { 3 \sigma _ { y } } { E t } } \qquad \Longrightarrow \qquad \Delta \theta \; = \; \Delta \kappa \, L _ { b } \; = \; { \frac { 3 \sigma _ { y } } { E t } } \, L _ { b }
$$

where $L _ { b }$ is the length of the bent arc. **Springback is therefore proportional to the yield strength and to the bend angle, and inversely proportional to the thickness and to nothing you control about the elastic modulus** — which is the sentence that decides whether a part is made of steel, aluminium or composite. Since $E$ is the same for every aluminium alloy and one third of steel's, **aluminium springs back about three times as much as steel at the same $\sigma _ { y } / t$ , and high-strength steel three times as much as mild steel at the same $E$ and $t$**. The empirical **springback factor** $X = \theta _ { \text{loaded } } / \theta _ { \text{final } }$ runs 1.05-1.15 for coining and stretch bending, 1.1-1.3 for air bending mild steel, and 1.3-1.8 for 700-1,000 MPa grades.

The countermeasures, in the order a shop reaches for them: **overbend** (cut the die to the angle that springs back to the right one, and re-cut it when the coil lot changes — the normal answer for mild steel); **bottom and coin** (drive the punch into the sheet at the bottom of the stroke so the die's included angle is ironed into the part — accurate to $0 . 5 ^ { \circ }$ , at three to five times the tonnage and a die that must be re-hardened); **increase the bend radius** so that a smaller fraction of the section is elastic (which is why a big radius is *easier* to hold than a small one, against every beginner's instinct); **planar flange ironing** (a flat flange squeezed between punch and die, so the part cannot rotate); **stretch forming**, which pulls the whole sheet past yield in tension before and during bending so there is no elastic gradient to release; **hot stamping**, which forms at $9 0 0 \ \mathrm { ^ { \circ } C }$ where $\sigma _ { y }$ is $3 0 \ \mathrm { M P a }$ and quenches to $1 { , } 5 0 0 \ \mathrm { M P a }$ inside the die, so the part leaves the die at the die's angle and never springs at all; and **compensate in the die**, which is what actually happens: the die is cut with a deliberate overangle, tried out on presses with coupons from the actual coil lot, and hand-corrected up to twenty times before it is signed off.
:::

::: widget plot
title: Springback against thickness — and the two alloys that will not share a die
f: 0.47*(3+x)/x; 1.35*(3+x)/x; 2
x: 0.7,4
y: 0,6
labels: mild steel, 350 MPa yield; HSLA, 1000 MPa yield; the ±2° tolerance a body panel must hold
caption: Predicted springback $\Delta \theta = 3 \sigma _ { y } L _ { b } / E t$ in degrees for a $9 0 ^ { \circ }$ bend to a $3 \ \mathrm { m m }$ inside radius on $E = 2 0 0 \ \mathrm { G P a }$ steel, against sheet thickness. Both curves fall with thickness, because a thicker sheet has proportionally less elastic core to unload; both are proportional to $\sigma _ { y }$ , which is why the horizontal line at $2 ^ { \circ }$ — the angle tolerance a body panel must hold over a 1 m flange — is met by mild steel at anything above $1 . 5 \ \mathrm { m m }$ and is **never** met by 1,000 MPa steel in cold air bending. **This one figure is why the automotive industry's lightweighting programme had to invent an entirely new process, hot stamping, rather than simply substituting a thinner, stronger grade into the existing press tools: the presses were fine, the dies were not, and the £40 million of die compensation and try-out that a high-strength body needs is larger than the £8 million the presses cost.**
:::

::: example A bracket, its flat pattern, and its angle {#ex-bendallow level=3 check="61.0"}
A bracket is $4 0 \ \mathrm { m m }$ and $2 5 \ \mathrm { m m }$ over its two outside legs, $9 0 ^ { \circ }$ , in $2 \ \mathrm { m m }$ mild steel with a $3 \ \mathrm { m m }$ inside radius. Find the blank length and the loaded angle needed to get $9 0 . 0 ^ { \circ }$ .

With $r / t = 1 . 5$ the $K$ -factor is $0 . 4 0$ , so the neutral-axis radius is $3 + 0 . 4 \times 2 = 3 . 8 \ \mathrm { m m }$ and

$$
B A = { \frac { \pi \times 9 0 } { 1 8 0 } } \times 3 . 8 = 5 . 9 7 \ \mathrm { m m } , \qquad S B = ( 3 + 2 ) \tan 4 5 ^ { \circ } = 5 . 0 0 \ \mathrm { m m }
$$
$$
B D = 2 \times 5 . 0 0 - 5 . 9 7 = 4 . 0 3 \ \mathrm { m m } \qquad \Longrightarrow \qquad L _ { \text{flat } } = 4 0 + 2 5 - 4 . 0 3 = { \bf 6 1 . 0 \ m m }
$$

**Sixty-one millimetres, against the 65 mm a designer gets by adding the two legs — a $4 \ \ \%$ error in the blank, which in a 200 mm blank is 8 mm of scrap and in a drawn part is a wrinkle.** The angle: the springback estimate gives $\Delta \theta = 3 \times 3 5 0 \times ( \pi / 2 \times 4 ) / ( 2 0 0 { , } 0 0 0 \times 2 ) = 1 . 2 ^ { \circ }$ , so the die is cut to $8 8 . 8 ^ { \circ }$ ; the shop will then try it and, finding $8 9 . 4 ^ { \circ }$ because the coil was hard, weld and re-cut the punch to $8 8 . 2 ^ { \circ }$ . **And the bend force, on a $1 0 0 \ \mathrm { m m }$ width with a $1 6 \ \mathrm { m m }$ die: $F = 1 . 4 2 \times 4 0 0 \times 0 . 1 \times 4 / 1 6 = 1 4 \ \mathrm { k N }$ — 1.5 tonnes, which is nothing; the cost of this part is not the press, it is the £18,000 die and the £6 of material and the 4 seconds of loading.**
:::

## 4. Deep drawing: the cup, and the war fought in the flange

::: definition What a drawing die actually does {#def-draw}
A drawing die has three working radii and one clamp. The **punch** pushes a disc of diameter $D$ into a **cavity** of diameter $d$ ; the **die radius** $r _ { d } \approx 4 { - } 8 t$ at the cavity mouth is where the flange bends, then unbends, then slides inward; the **punch radius** $r _ { p } \approx r _ { d } - t$ is where the wall bends around the punch and where the cup finally tears if it is going to; and the **blank holder** clamps the flange with a force $F _ { bh }$ and presses it against the die face, which is the die's only control over the process.

The mechanics are a tug of war across the die radius. **Out in the flange** the metal is being pulled radially inward and, because a disc being pulled to a smaller circle must also shrink circumferentially, it is simultaneously **hoop-compressed** — and a thin disc under radial tension and hoop compression is the textbook case for **wrinkling**, which is what a blank holder exists to prevent. **In the wall** the same tension is carried as a simple membrane stress, and the wall can tear at the punch radius, where it is thinnest and least work-hardened. **The blank-holder force is the knob between the two: too little and the flange wrinkles, too much and the wall splits.** Everything else — the lubricant, the die radii, the draw beads, the multi-action press — is a way of putting that one number in the middle of a narrower window.

The quantitative statement of drawability is the **limit drawing ratio**

$$
\left( { \frac { D } { d } } \right) _ { \max } \; \approx \; 2 . 0 { - } 2 . 2 \ \ \text{for mild steel} , \qquad 1 . 8 { - } 2 . 0 \ \text{for stainless} , \qquad 2 . 2 { - } 2 . 6 \ \text{for aluminium}
$$

and the reason it is so small and so universal is derived below: the wall can only carry so much before it yields, and the flange needs more than that to be drawn in. The material parameters that move the limit are the **strain-hardening exponent $n$** (which spreads the thinning instead of localising it), the **strain-rate sensitivity $m$** (which is large for aluminium and for hot steel and which is why magnesium and aluminium are so forgiving), and above all the **Lankford plastic strain ratio**

$$
\bar { r } \; = \; { \frac { \varepsilon _ { \text{width } } } { \varepsilon _ { \text{thickness } } } } \; = \; { \frac { \ln ( w / w _ { 0 } ) } { \ln ( t / t _ { 0 } ) } } \qquad \text{measured at } 1 5 \ \ \% \ \text{strain, in three directions}
$$

which says whether the sheet prefers to get wider or thinner when pulled. A perfectly isotropic sheet has $\bar { r } = 1$ ; a good drawing steel has $\bar { r } = 1 . 6 { - } 2 . 2$ , because the iron–carbide texture of a cold-rolled, annealed low-carbon sheet makes thickening easy; a steel with $\bar { r } = 0 . 6$ thins instead of widening and will not draw. **And the difference between the three measured directions, $\Delta r = ( r _ { 0 } + r _ { 9 0 } - 2 r _ { 4 5 } ) / 2$ , is what makes a drawn cup develop "ears" — four of them in aluminium-killed steel, two in interstitial-free steel, at the corners of a rectangular pan, at the ends of a battery can, and at the top of an aerosol shell where the trim press has to cut them off.**

A cup that must be deeper than one draw allows is **redrawn** — at a reduced ratio of 1.6-1.9 — with an intermediate **anneal** to undo the work hardening that made the first draw possible and would make the second impossible, and with a **shell anneal** in between if the wall has been ironed. **Ironing** is deliberate: when the die and punch clearances are set below the sheet thickness, the wall is squeezed to a uniform gauge on the way past the punch, which is how an aerosol can or a cartridge case gets a wall thinner than its blank and a smooth inside. **Draw beads** — a groove-and-tongue in the blank holder — add a fixed, repeatable restraint to a region where a flat clamp cannot hold, which is how a car outer panel with a 1,200 mm span and a 40 mm draw keeps its surface class A.
:::

::: proof Why the drawing ratio stops at about two {#proof-ldr}
The wall of the cup between the die radius and the punch radius carries the whole punch load as a membrane tension. If the wall's flow stress is ${ \bar { \sigma } } _ { w }$ and its gauge is $t$ , the maximum force the wall can carry without yielding is

$$
F _ { \max } \; = \; \pi d \, t \, { \bar { \sigma } } _ { w }
$$

(the classic form uses the tensile strength, since the necked region of a tensile test is what actually arrests the deformation). The force needed to pull the flange in is the ideal work of drawing plus the work of bending and unbending at the die radius and the work of friction against the blank holder; the first term dominates and is

$$
F _ { \text{draw } } \; = \; \pi d \, t \, { \bar { \sigma } } _ { f } \, \psi \, \ln \! \left( { \frac { D } { d } } - 0 . 2 5 \right) \qquad ( \psi \approx 1 . 1 { - } 1 . 3 \ \text{for the redundant work and the bends} )
$$

Equating the two, and writing ${ \bar { \sigma } } _ { w } \approx { \bar { \sigma } } _ { f }$ because the wall has been through the same average strain whatever the ratio, gives

$$
\ln \! \left( { \frac { D } { d } } - 0 . 2 5 \right) \; = \; { \frac { 1 } { \psi } } \; = \; 0 . 8 3 \qquad \Longrightarrow \qquad { \frac { D } { d } } \; = \; e ^ { 0 . 8 3 } + 0 . 2 5 \; = \; 2 .  7 9
$$

**The prediction is 2.8 and the shop figure is 2.1**, and the gap is exactly the terms the ideal analysis left out: friction under the blank holder, which alone costs 20-40 % of the load; the bending and unbending at the die radius, which scales as $\sqrt { t / r _ { d } }$ and is why a die radius smaller than $4 t$ destroys drawability; the fact that the wall is thinnest at the punch radius where it is *least* work-hardened; and the fact that the flange must not wrinkle on the way in, which requires a blank-holder force and therefore more friction. **The lesson is not that the arithmetic is wrong but that it is the right arithmetic: it says the limit is a ratio and not a depth, it says the limit is set by the wall and not by the punch, and it says the only ways to beat it are to reduce the friction, reduce the strain in the flange, or strengthen the wall — which is precisely the list of everything a drawing die designer can do.**
:::

::: example Drawing a 100 mm cup 60 mm deep {#ex-drawcup level=3 check="108"}
A cup $1 0 0 \ \mathrm { m m }$ in diameter and $6 0 \ \mathrm { m m }$ deep is drawn from $1 \ \mathrm { m m }$ mild steel sheet, $\sigma _ { \text{UTS } } = 3 4 0 \ \mathrm { M P a }$ , from a blank of the minimum diameter that will do it in one draw at a limit ratio of 2.1.

The blank diameter follows from the surface areas (with the corner allowance folded into the standard formula):

$$
D \; = \; { \sqrt { d ^ { 2 } + 4 d h - 3 . 4 4 d r _ { p } } } \; = \; { \sqrt { 1 0 ^ { 2 } + 4 \times 1 0 \times 0 . 9 \times 1 0 - 3 . 4 4 \times 1 0 \times 0 . 9 } } \; = \; { \sqrt { 3 0 9 } } \; = \; 1 7 . 6 \ \mathrm { c m } \; = \; 1 7 6 \ \mathrm { m m }
$$

which gives a drawing ratio $D / d = 1 . 7 6$ — **inside the limit of 2.1, so one draw will do it.** The press load, from $F = \pi d \, t \, \sigma _ { \text{UTS } } ( D / d - 0 . 7 5 )$ , is

$$
F \; = \; \pi \times 1 0 0 \times 1 \times 3 4 0 \times ( 1 . 7 6 - 0 . 7 5 ) \; = \; { \bf 1 0 8 \ k N } \quad \text{for the draw, plus } 4 0 { - } 6 0 \ \mathrm { k N } \text{ of blank-holder force}
$$

**A 200 kN (20-tonne) triple-action press, then — but a 200 kN press costs £120,000 and the die costs £25,000, and the steel costs 9p.** Now the design change that makes the example worth having: if the cup must be $8 0 \ \mathrm { m m }$ deep, $D = { \sqrt { 1 0 0 + 3 2 0 - 3 1 } } = 1 9 7 \ \mathrm { m m }$ and $D / d = 1 . 9 7$ , still one draw; if it must be $1 1 0 \ \mathrm { m m }$ deep, $D = 2 2 6 \ \mathrm { m m }$ and $D / d = 2 . 2 6$ — **over the limit, and the part becomes two draws, an anneal, a second die set and a second press station, which is the difference between a £25,000 tooling charge and a £60,000 one.** **This is why the drawing office's rule is that the depth of a cup is not a design parameter; the drawing ratio is.**
:::

## 5. Stretching, and the diagram that says when it stops

::: definition The forming limit diagram {#def-fld}
Stretch forming — a dome, a corner, a double-curvature panel, the roof of a car — has no flange and no blank holder, and its only limit is **localised necking**. A sheet stretched biaxially thins until a groove in it becomes easier to extend than the surrounding metal, and then all the further strain goes into the groove and the part splits in a second. The strain state at which that happens depends on the **strain ratio** $\rho = \varepsilon _ { 2 } / \varepsilon _ { 1 }$ (minor over major principal surface strain): uniaxial tension gives $\rho = - 0 . 5$ , plane strain gives $\rho = 0$ , and equibiaxial stretching gives $\rho = + 1$ . Plotting the **major limit strain** against $\rho$ gives the **forming limit diagram**, whose shape is one of the most useful empirical results in the whole of manufacturing:

$$
\mathrm { FLD } ( \rho ) \; = \; { \left\{ \begin{array} { l l } { \mathrm { FLD } _ { 0 } \, ( 1 + \rho ) ^ { \, 0 . 6 } } & { - 1 \leq \rho \leq 0 \quad \text{(left, sloping branch)} } \\ { \mathrm { FLD } _ { 0 } \left[ 1 + \beta \rho \right] } & { 0 \leq \rho \leq 1 \quad \text{(right, nearly flat branch, } \beta \approx 0 { - } 0 . 1 \text{)} } \end{array} \right. }
$$

with the **forming limit at plane strain** given by the **Keeler–Goodwin** relation

$$
\mathrm { FLD } _ { 0 } \; = \; { \frac { 2 3 . 3 + 4 2 n } { 1 + 0 . 2 1 6 6 f } } \times \left( { \frac { n } { 0 . 0 4 } } \right) ^ { \! 0 . 3 } \ \text{for } n < 0 . 0 4 \text{ only}, \qquad f = { \frac { t \ [ \mathrm { m m } ] } { 2 0 } }
$$

**Read the diagram, not the equation, and three facts come out.** **The left branch is steep**: a strain state moving from plane strain toward uniaxial tension loses formability fast, which is why a corner radius that stretches in one direction only is so much harder than a dome. **The right branch is flat**: once you are in biaxial tension, more biaxiality costs nothing, which is why a well-designed dome is easy and why hydroforming, which superimposes pressure on the sheet, can stretch a metal that tears on a punch. **And the whole curve scales with $n$** — Goodwin's equation is essentially $\mathrm { FLD } _ { 0 } \approx 2 3 + 4 2 n$ , which is the same physics as Considère's $n = \varepsilon _ { u }$ and says that **the single most valuable thing a steelmaker can do for a formable sheet is to give it a high strain-hardening exponent**, which is exactly what a dual-phase, TRIP or TWIP steel is: a microstructure engineered to keep hardening to enormous strains at the price of yield strength you then fight in the springback.

A production part is judged by measuring a grid (a 2 mm circle grid etched or printed on the blank, then measured after forming) at the critical point and plotting the ellipse's major and minor strains on the FLD. **The acceptance rule is a margin: the point must lie below the curve by at least $10 \ \ \%$ of the limit, or 3 percentage points, whichever is greater** — because the curve itself is a scatter band, the measurement is a $\pm 1$ point uncertainty, and the coil's $n$ varies by 0.02 from one heat to the next.
:::

::: widget plot
title: The forming limit diagram — the sheet designer's material-selection chart
f: min(31.4,31.4*pow(1+x,0.6)); min(28.3,28.3*pow(1+x,0.6)); min(17.5,17.5*pow(1+x,0.6))
x: -1,1
y: 0,40
labels: mild steel, n = 0.20, 1 mm (FLD₀ = 31.4 %); 10 % safety margin; hard HSLA, n = 0.015, 1.5 mm (FLD₀ = 17.5 %)
caption: Limit major strain (per cent) against the strain ratio $\rho = \varepsilon _ { 2 } / \varepsilon _ { 1 }$ for two sheets, from the Keeler–Goodwin relation, with the middle curve the usual 10 % design margin. The steep left branch is the region of stretching in one direction — a corner, a flange radius, the wall of a shallow draw; the flat right branch is stretching in two — a dome, a double-curvature panel, a hydroformed bulge. **Read a part, not a coupon: a body-side outer has one point that is a plane-strain stretch over a wheel arch, another that is a near-uniaxial stretch at a boss, and a third that is a compression-dominated flange, and all three must lie under the curve.** **The gap between the two curves is the whole content of a steel company's "formable" grade: 14 points of extra limit strain, bought with $n$ , and worth a press station and an anneal.**
:::

::: widget plot
title: What the strain-hardening exponent buys
f: 100*(exp(x)-1); 30
x: 0.05,0.6
y: 0,90
labels: uniform elongation = eⁿ − 1 (per cent); the 30 % stretch a drawn shell needs
caption: Uniform elongation in tension against the strain-hardening exponent, from Considère's criterion (derived in the exercises): a tensile specimen necks when $d \sigma / d \varepsilon = \sigma$ , which for $\sigma = K \varepsilon ^ { n }$ gives $\varepsilon _ { u } = n$ exactly, so the stretch a sheet can take before necking is $e ^ { n } - 1$ . **The horizontal line is the strain a drawn and ironed shell needs in its wall; the curve says you need $n \approx 0 . 2 6$ to get it from a single-phase metal.** Mild steel has $n = 0 . 2 0 { - } 0 . 2 4$ , an IF drawing steel $0 . 2 4 { - } 0 . 2 8$ , a 304 stainless $0 . 4 5 { - } 0 . 6$ (and it work-hardens so fast that a drawn cup is harder than the blank by a factor of three), a 1,000 MPa dual-phase steel $0 . 1 0 { - } 0 . 1 2$ , and a 1,500 MPa press-hardened boron steel essentially none — **which is the entire reason the automotive strength hierarchy is also a process hierarchy: mild steel is drawn, dual-phase is drawn and springbacks, and martensite is formed hot and quenched, because after that there is no $n$ left to form with.**
:::

::: example Is the panel safe? {#ex-fld level=3 check="25.9"}
A drawn outer panel is measured at three critical points after a circle-grid print of $4 . 0 \ \mathrm { m m }$ diameter: point A has become an ellipse of $5 . 4 \ \mathrm { m m } \times 3 . 7 \ \mathrm { m m }$ , and point B an ellipse of $5 . 1 \ \mathrm { m m } \times 4 . 4 \ \mathrm { m m }$ . The sheet is $1 \ \mathrm { m m }$ mild steel with $n = 0 . 2 0$ , so $\mathrm { FLD } _ { 0 } = 3 1 . 4 \ \ \%$ .

$$
\text{A: } \varepsilon _ { 1 } = \ln ( 5 . 4 / 4 . 0 ) = 0 . 3 0 0 , \quad \varepsilon _ { 2 } = \ln ( 3 . 7 / 4 . 0 ) = - 0 . 0 7 7 \qquad \Longrightarrow \qquad \rho = - 0 . 2 6
$$
$$
\text{B: } \varepsilon _ { 1 } = \ln ( 5 . 1 / 4 . 0 ) = 0 . 2 4 1 , \quad \varepsilon _ { 2 } = \ln ( 4 . 4 / 4 . 0 ) = 0 . 0 9 5 \qquad \Longrightarrow \qquad \rho = + 0 . 4 0
$$

Point A sits on the sloping branch, where the limit is $\mathrm { FLD } = 3 1 . 4 \times ( 1 - 0 . 2 6 ) ^ { 0 . 6 } = { \bf 2 5 . 9 \ \ \% }$ against a measured $3 0 . 0 \ \ \%$ — **it is above the curve, and the panel splits at that point, or will, on a coil at the soft end of the tolerance.** Point B sits on the flat branch, where the limit is $3 1 . 4 \ \ \%$ against a measured $2 4 . 1 \ \ \%$ — **a comfortable 7 points of margin, even though B has been stretched almost as far as A.** **That is the whole practical content of the FLD: two points that look equally bad in a tensile test, one of which is failing and one of which is safe, distinguished only by the direction of the second strain.** **The fix for A is not a better steel; it is a bigger radius at that feature, or a draw bead that moves the strain there into the flat branch, or a blank that is 4 mm larger so the metal arrives with less stretching left to do.**

Had point A's ellipse been $5 . 1 \times 3 . 7 \ \mathrm { m m }$ , the strains would be $2 4 . 1 \ \ \% / - 7 . 7 \ \ \%$ , $\rho = - 0 . 3 2$ , limit $3 1 . 4 \times 0 . 6 8 ^ { 0 . 6 } = 2 2 . 9 \ \ \%$ — **below the limit but inside the 3-point margin, which is the state engineers call "safe today".**
:::

## 6. The rest of the family

::: definition The sheet-metal processes and what each is for {#def-rest}
$$
\begin{array} { l l l l l }
\textbf{Process} & \textbf{Stress state} & \textbf{Limit} & \textbf{Typical part} & \textbf{Rate} \\ \hline
\text{Press-brake bending} & \text{bend, then spring} & \text{springback, } r _ { \min } & \text{brackets, panels, chassis rails} & 1 0 { - } 6 0 / \mathrm { h } \\
\text{Roll bending} & \text{progressive bend} & \text{springback, end lead-in} & \text{tubes, large cylinders} & \text{slow} \\
\text{Deep drawing} & \text{tension + hoop compression} & D / d , \text{ wrinkling} & \text{cans, sinks, sumps, battery cases} & 1 0 { - } 6 0 / \mathrm { m i n } \\
\text{Redrawing / ironing} & \text{tension, wall ironing} & \text{work hardening, anneals} & \text{aerosol cans, cartridge cases} & 4 0 0 / \mathrm { m i n } \\
\text{Stretch forming} & \text{biaxial tension} & \text{FLD, overstretch} & \text{aircraft skin, double-curvature} & \text{slow} \\
\text{Hydroforming (sheet)} & \text{tension + superposed pressure} & \text{FLD } \times 2 & \text{wing skins, titanium fittings} & \text{slow} \\
\text{Tube hydroforming} & \text{internal pressure + axial feed} & \text{bulge limit, wrinkling} & \text{bicycle frames, exhaust manifolds} & \text{minutes} \\
\text{Spin forming} & \text{local bending, roller tool} & \text{thinning, tool path} & \text{nose cones, rocket tanks, domes} & \text{minutes} \\
\text{Shear spinning} & \text{local shear} & \text{shear band cracking} & \text{pressure vessels, missile cases} & \text{minutes} \\
\text{Roll forming} & \text{progressive bending, flat product} & \text{edge strain, springback} & \text{gutters, rails, sections, 100 m coils} & 1 0 { - } 6 0 \ \mathrm { m / m i n } \\
\text{Hot stamping} & \text{form hot, quench in die} & \text{no springback, no } n & \text{bumper beams, A-pillars, roof rails} & 4 { - } 1 2 / \mathrm { m i n } \\
\text{Magnetron / explosive} & \text{strain rate } 1 0 ^ { 2 } { - } 1 0 ^ { 4 } \ \mathrm { s ^ { - 1 } } & \text{adiabatic shear} & \text{one-off panels, titanium, armour} & \text{one a day} \\
\text{Incremental (ISF)} & \text{local stretching, point tool} & \text{FLD, wall angle} & \text{one-off medical and marine panels} & \text{hours}
\end{array}
$$

Four of these deserve a sentence each because they change what a designer can ask for. **Hydroforming** replaces the punch with a pressurised fluid diaphragm, so the sheet is supported by pressure on its outer surface throughout the stretch: the groove that would become a neck is pressed shut as fast as it forms, and the limit strain roughly doubles — a titanium wing fitting that would tear at 25 % on a punch stretches to 55 % in a fluid cell, at the cost of a vessel that holds 100 MPa and a cycle time in minutes. **Roll forming** bends the strip progressively through ten to twenty stands, each taking a few degrees of the bend, so that the force that would need a 5,000-tonne press becomes a 50-tonne one and the part becomes a hundred metres long and straight; the price is that the section must be constant along its length and that every hole must be punched before the strip is formed. **Hot stamping** (press hardening of boron steel, 22MnB4) heats a blank to $9 2 0 \ \mathrm { ^ { \circ } C }$ , transfers it in four seconds to a water-cooled die, forms it at $3 0 \ \mathrm { M P a }$ flow stress with no springback whatever, and holds it closed for eight seconds so the die quenches it at $3 0 \ \mathrm { K / s }$ to $1 { , } 5 0 0 \ \mathrm { M P a }$ martensite: **a part that is formed with the forces of mild steel and comes out at five times its strength, and that cannot be bent, drilled or trimmed cold afterwards** — which is why every hot-stamped part needs a laser or a punch operation done while it is still hot. **Tailor-welded blanks** laser-weld two or three gauges, or two alloys, into one blank before forming, so a single drawn part is thick where it must be stiff and thin where it must be drawn — the trick being that the weld must be positioned in a region that only stretches and never wrinkles, and that the two materials must be drawn at the same rate or the blank shears at the weld.
:::

::: example Hot stamping against cold high-strength steel {#ex-hss level=3 check="1.8"}
A bumper reinforcement, 1,400 mm long, is to be made at 1,500 MPa. Route A: cold-form a 1,000 MPa dual-phase steel and use more material. Route B: hot stamp 22MnB4 to 1,500 MPa.

**Route A** needs a wall of $2 . 2 \ \mathrm { m m }$ to match the crash energy of $1 . 2 \ \mathrm { m m }$ of hot-stamped steel, so its wall is $2 . 2 / 1 . 2 = { \bf 1 . 8 }$ times as thick and it weighs 83 % more; it is formed on an existing 1,000-tonne press at 12 parts a minute, but it springs back $6 ^ { \circ }$ on every flange, so the four flange angles must be held to $\pm 1 ^ { \circ }$ by coining pads that add 25 % to the tonnage and a die that must be re-cut twice per programme. **Route B** weighs $1 . 2 \ \mathrm { m m }$ , has no springback at all, and holds $\pm 0 . 3 \ \mathrm { m m }$ on the bore faces — but the blank must be heated for four minutes in a tunnel furnace, transferred in under four seconds before the temperature falls $8 0 \ \mathrm { K }$ (which is enough to make martensite with a soft band in it), formed in a water-cooled die at two parts a minute, then **hot-trimmed by laser or hot-punched**, because a 1,500 MPa steel cannot be cold-trimmed without shattering the die.

The costed comparison at 120,000 a year: **Route A £14.80 a part with £380,000 of tooling; Route B £17.40 with £1,150,000 of tooling and a £2.1 M furnace and press line** — and Route B saves $0 . 9 \ \mathrm { k g }$ per car, which at a fleet of 120,000 and a $1 . 8 \ \mathrm { g / g }$ CO₂-linked penalty is worth £3.10 a car over the programme. **The decision goes to Route B, and it goes there because of the mass and the tolerance, not the unit cost — which is the normal outcome whenever a forming process is chosen for a property rather than a price.**
:::

## 7. Tooling, presses and the shape of the cost

::: definition What a sheet-metal part actually costs {#def-econ}
The press is bought for **tonnage, bed length and shut height**; the die is bought for **steel, months and hands**. A press-brake tool is a hardened steel punch and V-die at £600 a metre and is changed in four minutes; a drawing die for a car outer is a 12-tonne casting of EN3B or tool steel, cut on a five-axis mill for three months, then **trialled** — fitted, run, inspected, welded, hand-ground, run again, twenty to forty times — by a die sinker whose skill is the reason a body panel has a surface class and not a waviness map. That try-out is 30-50 % of the die's cost and cannot be bought back.

$$
\begin{array} { l c c c c }
& \text{laser + brake} & \text{prototype press tool} & \text{production press tool} & \text{transfer-line tool} \\
\text{Tooling} & \pounds 0 { - } 2 \mathrm { k } & \pounds 8 { - } 2 5 \mathrm { k } & \pounds 6 0 { - } 2 5 0 \mathrm { k } & \pounds 3 0 0 \mathrm { k } \text{ per die, } \times 5 \\
\text{Lead time} & \text{days} & 4 { - } 8 \ \text{weeks} & 1 6 { - } 3 0 \ \text{weeks} & 4 0 { - } 6 0 \ \text{weeks} \\
\text{Life} & \infty \ \text{(machine time)} & 5 { \mathrm { k } } { - } 2 0 \mathrm { k } \ \text{parts} & 3 0 0 \mathrm { k } { - } 1 \mathrm { M } & 1 0 \mathrm { M } + \\
\text{Tolerance} & \pm 0 . 5 \ \mathrm { m m } & \pm 0 . 5 \ \mathrm { m m } & \pm 0 . 2 \ \mathrm { m m } & \pm 0 . 1 \ \mathrm { m m } \\
\text{Rate} & \text{one an hour} & 2 { - } 8 / \mathrm { h } & 6 { - } 2 0 / \mathrm { m i n } & 1 2 { - } 2 5 \ \text{strokes/min} \\
\text{Surface} & \text{brake marks} & \text{fair} & \text{class A} & \text{class A, oiled}
\end{array}
$$

**The break-even arithmetic is the same as in [[manufacturing/process-selection|process selection]] and it is brutal:** a production drawing die at £150,000 against a prototype tool at £15,000 with a per-part penalty of £3.20 gives a break-even of $( 1 5 0 , 0 0 0 - 1 5 , 0 0 0 ) / 3 . 2 0 = 4 2 , 0 0 0$ parts. **Below that quantity the right way to make a drawn part is badly; above it the right way to make it badly is to keep making it that way.** The second number that decides everything is the **press line**: a five-die tandem line for outer panels is 40 m long, runs at 15-20 strokes a minute with a magnetic transfer table, and cost £25-40 million in 2024 money; a 6-station transfer press for small parts runs 25 strokes a minute and costs a fifth of that. **This is why a car maker wants 200,000 a year for a body, why two car makers share a plant, and why a new entrant at 20,000 a year buys its body-in-white from a contract stamper or makes it in aluminium with fewer, simpler, slower parts.**
:::

::: example 4,000 electric scooter body panels {#ex-scoot level=3 check="20000"}
A scooter's front fairing is a 600 mm drawn panel in 1.2 mm aluminium, 4,000 a year for four years.

Production tooling in a transfer line is £190,000 and gives £11.40 a panel. A **soft tool** — a cast-aluminium drawing die run on a 250-tonne press at 4 an hour, with a hand-laid fibre plug as the form block — is £22,000 and gives £19.80 a panel including the extra press time and the trim die. A **hydroform/diaphragm tool** (an elastomeric diaphragm instead of a punch, one tool for both sides) is £9,000 and gives £26. **The break-even between production and soft tooling is $( 1 9 0 , 0 0 0 - 2 2 , 0 0 0 ) / ( 1 9 . 8 0 - 1 1 . 4 0 ) = { \bf 2 0 { , } 0 0 0 }$ panels — five times the whole programme.** So the answer is the soft tool, at £79,000 more than the production tool's per-part cost would have been and £168,000 less than its tooling, and the fairing is designed from that decision: **the radius on the draw is opened from $5 t$ to $8 t$ because the soft tool cannot hold a sharp one, the trim lines are moved to where a hand router can reach, and the panel is split into two pressings and a bonded join because 4,000 a year cannot pay for a draw that needs a redraw.** **Four thousand a year is not a small quantity in sheet metal; it is the quantity at which the process stops being chosen by the part and starts choosing it.**
:::

## Exercises

::: exercise Blanking force with a shear {#ex-blankforce level=2 check="150"}
A hexagon 60 mm across flats is blanked from $1 . 5 \ \mathrm { m m }$ hardened stainless, $\sigma _ { \text{UTS } } = 6 0 0 \ \mathrm { M P a }$ . Estimate the peak blanking force. (Enter kN, to the nearest 10.)
::: solution
The perimeter is $6 \times 6 0 / \sqrt { 3 } = 2 0 8 \ \mathrm { m m }$ , so $F = 0 . 8 \times 6 0 0 \times 2 0 8 \times 1 . 5 / 1 0 ^ { 3 } = { \bf 1 5 0 \ k N }$ . **Put a $2 \ \mathrm { m m }$ shear offset on the punches and the peak falls to $1 5 0 \times 1 . 5 / 3 . 5 = 6 4 \ \mathrm { k N }$ , at the cost of a dished blank — and note that the *energy* is unchanged, which is why shearing works on a crank press with a flywheel and not on a slow hydraulic one.**
:::
:::

::: exercise Flat pattern of a channel {#ex-channel level=2 check="134.2"}
A channel is formed by two $9 0 ^ { \circ }$ bends: outside legs $3 0 \ \mathrm { m m }$ , web $8 0 \ \mathrm { m m }$ , outside leg $3 0 \ \mathrm { m m }$ , in $1 . 5 \ \mathrm { m m }$ sheet with a $2 \ \mathrm { m m }$ inside radius and $K = 0 . 4 0$ . Find the blank length. (Enter mm to one decimal place.)
::: solution
$S B = ( 2 + 1 . 5 ) \tan 4 5 ^ { \circ } = 3 . 5 0 \ \mathrm { m m }$ , $B A = ( \pi / 2 ) ( 2 + 0 . 4 \times 1 . 5 ) = 4 . 0 8 \ \mathrm { m m }$ , $B D = 2 \times 3 . 5 0 - 4 . 0 8 = 2 . 9 2 \ \mathrm { m m }$ , so $L = 1 4 0 - 2 \times 2 . 9 2 = { \bf 1 3 4 . 2 \ m m }$ . **The designer's 140 mm is $4 . 3 \ \ \%$ too long, and on a coil that is 1,200 mm wide and produces 8 parts per pitch, that error is 5 % of the material bill.**
:::
:::

::: exercise Minimum bend radius {#ex-rmin level=2 check="8.1"}
A steel has $2 5 \ \ \%$ reduction of area in tension. Taking the allowable outer-fibre engineering strain as one third of the value implied by that reduction, find the minimum inside radius for $2 \ \mathrm { m m }$ sheet. (Enter mm, to one decimal place.)
::: solution
A $2 5 \ \ \%$ reduction of area corresponds to an outer-fibre strain capacity of about $0 . 2 5 / ( 1 - 0 . 2 5 ) \approx 0 . 3 3$ in the ideal case; taking a third of it gives $\varepsilon _ { \text{allow } } = 0 . 1 1$ , and $\varepsilon = t / ( 2 r + t )$ gives $r = t ( 1 / 2 \varepsilon - 1 / 2 ) = 2 ( 4 . 5 5 - 0 . 5 ) = 8 . 1 \ \mathrm { m m }$ , so $r _ { \min } \approx 4 t = { \bf 8 . 1 \ m m }$ . **Four thicknesses, which is the shop table's answer for a 500-700 MPa grade — and the reason a designer who specifies "break all sharp edges, $R 1$ typical" on a high-strength bracket is specifying a part that cannot be made.**
:::
:::

::: exercise Overbending a high-strength bend {#ex-overbend level=2 check="4.7"}
A $1 . 2 \ \mathrm { m m }$ sheet of 1,000 MPa yield steel is air-bent to a $3 \ \mathrm { m m }$ inside radius through $9 0 ^ { \circ }$ . Estimate the springback from $\Delta \theta = 3 \sigma _ { y } L _ { b } / E t$ and state the loaded angle. Take $E = 2 0 0 \ \mathrm { G P a }$ . (Enter the springback in degrees to one decimal place.)
::: solution
$L _ { b } = ( \pi / 2 ) ( r + t ) = 1 . 5 7 1 \times 4 . 2 = 6 . 6 0 \ \mathrm { m m }$ , so $\Delta \theta = 3 \times 1 { , } 0 0 0 \times 6 . 6 0 / ( 2 0 0 { , } 0 0 0 \times 1 . 2 ) = 0 . 0 8 2 5 \ \mathrm { r a d } = { \bf 4 . 7 \ \ ^ { \circ } }$ , and the tool must produce $9 4 . 7 ^ { \circ }$ . **The widget's curve gives $5 . 4 ^ { \circ }$ for the same case, the difference being the arc length used; either way the answer is that a $5 ^ { \circ }$ error on a 100 mm flange is $8 . 7 \ \mathrm { m m }$ of misalignment at the free end, which no assembly can absorb — hence coining, hot stamping, or a design change.**
:::
:::

::: exercise Number of draws {#ex-redraw level=2 check="3"}
A $2 5 0 \ \mathrm { m m }$ blank must become a $7 0 \ \mathrm { m m }$ diameter cup. Taking a first-draw limit of 2.1 and redraw limits of 1.8, how many draws, and what are the intermediate diameters?
::: solution
$2 5 0 / 2 . 1 = 1 1 9 \ \mathrm { m m }$ , $1 1 9 / 1 . 8 = 6 6 \ \mathrm { m m }$ — so **two draws would just reach 66 mm, and since 70 mm is above that, the answer is two draws if the redraw can be held at 1.70, and three if the shop is honest**: $2 5 0 	o 1 1 9 	o 8 8 	o 7 0$ . **Two anneals, three die sets, three press stations — for a part whose only crime is being 180 mm deep.** **This is why the drawing office's most valuable intervention on a deep part is a boss, a rib or a change of section that lets the ratio come down by 0.2.**
:::
:::

::: exercise Blank-holder force and the two failures {#ex-bh level=3 check="2"}
In the cup of the worked example the wall can carry $1 0 8 \ \mathrm { k N }$ before it yields, and the flange needs $7 0 \ \mathrm { k N }$ to draw in with no blank-holder force at all. If the blank-holder pressure must be at least $0 . 8 \ \mathrm { M P a }$ on the flange annulus to stop wrinkling, and the annulus area is $1 2 { , } 0 0 0 \ \mathrm { m m } ^ { 2 }$ , does the part draw?
::: solution
The blank-holder force is $0 . 8 \times 1 2 { , } 0 0 0 = 9 . 6 \ \mathrm { k N }$ , and the friction it adds is roughly $2 \mu F _ { b h }$ (two interfaces) $= 2 \times 0 . 1 \times 9 . 6 = 1 . 9 \ \mathrm { k N }$ , so the draw force rises to about $7 2 \ \mathrm { k N }$ against a wall capacity of $1 0 8 \ \mathrm { k N }$ : **it draws, with a 1.5 margin.** **Now double the blank-holder pressure to $1 . 6 \ \mathrm { M P a }$ because a wrinkle appeared on trial: the draw force rises to $7 3 \ \mathrm { k N }$ — hardly changed, because friction is only a fraction of the load — and the wrinkle is still there, because the answer was never the force but the draw bead.** **That is the practical lesson: blank-holder force is a coarse knob, and when it is not enough the die needs geometry.**
:::
:::

::: exercise FLD check {#ex-fldchk level=3 check="20.7"}
A point on a panel shows $\varepsilon _ { 1 } = 1 4 . 0 \ \ \%$ , $\varepsilon _ { 2 } = - 7 . 0 \ \ \%$ . For $\mathrm { FLD } _ { 0 } = 3 1 . 4 \ \ \%$ and the left branch $\mathrm { FLD } = \mathrm { FLD } _ { 0 } ( 1 + \rho ) ^ { 0 . 6 }$ , find the limit strain and say whether the point passes the 3-point margin rule. (Enter the limit strain in per cent to one decimal place.)
::: solution
$\rho = - 0 . 5 0$ , so $\mathrm { FLD } = 3 1 . 4 \times 0 . 5 ^ { 0 . 6 } = 3 1 . 4 \times 0 . 6 6 = { \bf 2 0 . 7 \ \ \% }$ , against $1 4 . 0 \ \ \%$ measured — **a margin of 6.7 points, so it passes.** **Note how much thinner the ice is than the numbers suggest: the same point at $\rho = - 0 . 8$ (nearly uniaxial) would have a limit of $3 1 . 4 \times 0 . 2 ^ { 0 . 6 } = 1 2 . 0 \ \ \%$ and would already have failed, and $\rho$ at that feature moves with a $0 . 5 \ \mathrm { m m }$ change in the blank-holder land. The FLD is a map, and the part has to sit in the middle of the safe country, not on the border.**
:::
:::

::: exercise Derive Considère's criterion and the uniform elongation {#ex-derive-considere level=4 check="22"}
Show that a tensile specimen of material $\sigma = K \varepsilon ^ { n }$ begins to neck at $\varepsilon _ { u } = n$ , and find the uniform elongation (as a per cent engineering extension) for $n = 0 . 2 0$ . (Enter per cent to the nearest whole number.)
::: solution
At the onset of necking the load $F = \sigma A$ is stationary, so $d ( \sigma A ) = 0$ , and with constant volume $d \varepsilon = - d V / V = - d A / A$ , giving
$$
{ \frac { d \sigma } { \sigma } } = { \frac { d A } { A } } = d \varepsilon \qquad \Longrightarrow \qquad { \frac { d \sigma } { d \varepsilon } } = \sigma
$$
With $\sigma = K \varepsilon ^ { n }$ , $d \sigma / d \varepsilon = n K \varepsilon ^ { n - 1 } = \sigma / \varepsilon = K \varepsilon ^ { n }$ gives $\varepsilon _ { u } = n = 0 . 2 0$ , an engineering extension of $e ^ { 0 . 2 0 } - 1 = { \bf 2 2 \ \ \% }$ . **And this is why $n$ is the formability exponent: the strain a sheet can take before it localises is the strain it has already taken when the hardening stops paying for the thinning. It is also why a dual-phase steel with $n = 0 . 1 0$ necks at $1 1 \ \ \%$ and is a poor drawing steel despite 25 % total elongation — the remaining 14 % happens inside the neck, which is exactly where a forming operation cannot use it.**
:::
:::

::: exercise Derive the outer-fibre bend strain {#ex-derivebendstrain level=4 check="33"}
Show that the outer-surface engineering strain in a bend of inside radius $r$ and thickness $t$ is $\varepsilon = t / ( 2 r + t )$ , and evaluate it for $r = t$ . (Enter per cent, to the nearest whole number.)
::: solution
The outer fibre moves from a neutral-axis length $r + t / 2$ … more directly: the outer surface, at radius $r + t$ , spans an arc $( r + t ) \theta$ while the neutral surface spans $( r + K t ) \theta$ ; taking the neutral surface at $K = 0 . 5$ for pure bending, the true strain is $\ln [ ( r + t ) / ( r + t / 2 ) ]$ and the engineering strain is
$$
\varepsilon = { \frac { ( r + t ) - ( r + t / 2 ) } { r + t / 2 } } = { \frac { t / 2 } { r + t / 2 } } = { \frac { t } { 2 r + t } } = { \frac { 1 } { 3 } } = { \bf 3 3 \ \ \% }
$$
**A third, at $r = t$ , which is why $r = t$ is close to the limit for a material with 35 % reduction of area and why the shop rule "never bend inside radius less than one thickness" is not a rule about the tool but about the metal's own ductility.** **It also explains the two standard tricks: a larger radius is a smaller strain, and a smaller *thickness* is a much smaller strain — which is why a bent sheet is often milled, machined or chem-milled thinner in the bend zone before forming, and why sheet-metal formability improves so dramatically with the thinner gauges that lightweighting forces on the designer.**
:::
:::

::: quiz A cup splits at the punch radius. Which change will *not* help? {#quiz-split}
- [ ] A larger punch radius
- [ ] A larger die radius
- [ ] A lower blank-holder force
- [x] A larger blank diameter
::: solution
**A larger blank increases the drawing ratio, which is the one thing that makes splitting worse.** **The other three all reduce the wall stress: a bigger punch radius spreads the bend and the friction over a larger arc and moves the critical section away from the point of maximum tension; a bigger die radius reduces the bending strain at the flange entry, which scales as $\sqrt { t / r _ { d } }$ ; and a lower blank-holder force reduces the friction the wall must carry. The full list of split-cure actions, in the order a die shop tries them: more and better lubricant, larger die and punch radii, lower blank-holder force, a softer or more $n$ -rich coil, a smaller drawing ratio (redraw), and finally a design change.**
:::
:::

::: quiz Why does a wrinkle appear in the flange and a split appear in the wall of the same cup? {#quiz-wrinkle}
- [ ] Because the flange is thinner than the wall
- [x] Because the flange is hoop-compressed while the wall is tensioned, and the two failures have opposite causes
- [ ] Because the lubricant only reaches the wall
- [ ] Because the punch is hotter than the die
::: solution
**Radial drawing tension is necessarily accompanied by hoop compression in the flange — a disc shrinking to a smaller circumference must squeeze its circles together — and a thin disc under hoop compression buckles. The same tension, arriving in the now-cylindrical wall, is a simple membrane stress that the wall carries until it yields and necks.** **So the two defects are the two ends of one knob, and a die try-out is the search for the middle of a window that is often only 20 % wide. This is also why thicker sheet is easier to stretch and harder to draw: thickening raises the buckling resistance of the flange as $t ^ { 2 }$ and the wall's load capacity only as $t$ , and it raises the bending strain at the die radius as $1 / r _ { d }$ .**
:::
:::

## Where this lesson leads

- **[[manufacturing/bulk-forming|Bulk deformation processes]]** is the companion half: the same flow stress, the same friction, the same recrystallisation, in a stress state where the work cannot buckle and cannot neck.
- **[[manufacturing/machining|Machining]]** is what happens to the trim lines, the bolt holes and the datum faces of a drawn part — and, in laser cutting and waterjet blanking, is how the blank is made before it is formed.
- **[[manufacturing/joining|Joining]]** assembles the panels: spot welding 5,000 times into a car body, and the special problem of welding coated and high-strength grades.
- **[[manufacturing/polymer-composite-processing|Polymer and composite processing]]** uses the same forming-limit thinking on a material whose $n$ is a function of temperature and whose wrinkles are called print-through.
- **[[manufacturing/metrology-quality|Metrology, quality and automation]]** is how a body shop holds $\pm 0 . 3 \ \mathrm { m m }$ across 350 parts, and how springback is fed back into the die.
- **[[materials-science/mechanical-properties|Mechanical properties]]** is where $n$ , $m$ and the Lankford $r$ -value are measured, and where the tensile test that defines them is derived — including Considère's criterion, which is the necking condition the forming limit diagram is a map of.
- **[[solid-mechanics/plasticity|Plasticity]]** supplies the flow rule and the concept of a limit load that the FLD is an empirical picture of.

::: history
**1400s.** The **draw bench** makes wire, and with it the first quantitative study of a forming process: the maximum reduction per pass, which is the same inequality as the drawing limit of §4 and was known to Renaissance wire-drawers by rule of thumb. **1818.** The first **deep-drawn brass cartridge case**, and with it the process's arrival as a mass product: a drawn case replaced a hand-turned one, and by 1868 a drawn brass case was being made at 40,000 a day, in a sequence of draws and anneals that is still exactly how a cartridge case and an aerosol can are made. **1913.** Stamped steel automobile bodies replace wood, and by **1927** all-metal bodies have created the two institutions of the industry: the **die shop**, with its pattern shops, its planishing hammers and its try-out presses, and the **panel problem** — that a large, thin, doubly-curved part is a surface-class object whose shape is defined by eye and made by hand-finishing a die for three months. **1948.** **S. C. Hill** publishes his theory of plastic flow in anisotropic media, and **W. Lankford, D. G. Nickrin and R. M. Kline** at the Bureau of Standards measure the width and thickness strains of drawn steel sheets, finding that the ratio between them — the **$r$ -value** — predicts drawability and that its variation with direction predicts earing. Drawability stops being an art and becomes a steel specification. **1960s.** **G. R. Keeler** at Ford and, independently, **W. C. Emge** and later **M. G. Hecker** at GM, build the **forming limit diagram** from circle-grid experiments, and **S. P. Keeler and Z. Marciniak** turn sheet-metal forming into a strain-space discipline; **Marciniak and K. Kuczyński** publish in 1967 the groove analysis that still underlies the left-hand branch. **1977.** **P. Plamennac** patents **press hardening** of boron steel; the idea sleeps for twenty-five years because no crash-structure specification demanded 1,500 MPa and no laser cutter was cheap enough to trim it, and then arrives in the 2000s as the answer to a Euro-NCAP world. **1995.** **Audi** introduces **tailor-welded blanks** in series production, and the blank becomes a designed object rather than a purchased one. **2002.** **F. Goodwin's** update of the Keeler relation puts the FLD on every sheet-metal engineer's spreadsheet, and **hot stamping** enters volume production with the Volvo and then the Volkswagen Golf B-pillar — the first time since 1927 that a new sheet-metal process had been adopted across the whole industry in a single decade.
:::

::: summary
**A sheet has two ways to fail and a die has one knob.** It wrinkles where it is hoop-compressed and tears where it is stretched, and the blank-holder force sits between them; the whole craft of die try-out is holding a sheet in the 20 % of the force window between the two.
**Shearing is a shear-area calculation and a clearance diagnosis.** $F = 0 . 8 \sigma _ { \text{UTS } } P t$ , clearance $5 { - } 1 3 \ \ \% \ t$ per side, and an edge whose rollover, burnish, fracture and burr tell you which of the two has worn. Fine blanking suppresses the fracture altogether with a cognet ring and a $0 . 5 \ \ \%$ clearance.
**Bending is arithmetic about a neutral axis that is not in the middle.** $B A = ( \pi \theta / 1 8 0 ) ( r + K t )$ with $K = 0 . 3 3 { - } 0 . 5$ , $B D = 2 S B - B A$ , and the blank length is $\sum$ legs $- \sum B D$ . The outer-fibre strain is $t / ( 2 r + t )$ , so $r = t$ means $3 3 \ \ \%$ and the minimum radius is a property of the alloy, not of the tool.
**Bending force goes as $t ^ { 2 } / V$ and springback as $\sigma _ { y } / t$.** $F = 1 . 4 2 \sigma _ { \text{UTS } } w t ^ { 2 } / V$ , so a sharper die costs tonnage; $\Delta \theta = 3 \sigma _ { y } L _ { b } / E t$ , so a stronger, thinner, more-bent part springs more, and nothing you can do to the tool changes the elastic modulus. Overbend, coin, stretch, or form it hot.
**Drawability is a ratio, not a depth.** $D / d \approx 2 . 1$ for mild steel, set by the wall's load, not the punch's; deeper needs redraws and anneals. The material constants are $n$ , $m$ and above all $\bar { r }$ , and the anisotropy $\Delta r$ is what makes ears.
**The forming limit diagram says when stretching stops.** $\mathrm { FLD } _ { 0 } \approx 2 3 . 3 + 4 2 n$ , steep on the left, flat on the right, and the acceptance rule is a 10 % or 3-point margin. Two points with the same major strain, one failing and one safe, are distinguished only by the sign of the minor strain.
**Sheet metal is cheap to form and expensive to tool.** A part costs pennies of steel and a fraction of a press; the die costs £10,000-250,000 and a third of it is try-out that cannot be bought back. Below 20,000-40,000 a year the right process is the one you can afford to change, and the part should be designed for it.
:::

## Further reading

- Z. Marciniak, J. L. Duncan and S. J. Hu, *Mechanics of Sheet Metal Forming*, 2nd ed., Butterworth-Heinemann, 2002 — the definitive account of §4 and §5, written by the man whose groove analysis is the left-hand branch.
- W. Johnson and M. A. Hill, *Mechanics of Sheet Metal Forming*, Edward Arnold, 1973 — the classical mechanics, and the derivation of every formula in §2 to §4 that this lesson states without proving.
- *ASM Handbook, Volume 14B: Sheet Metal Forming*, ASM International, 2017 — the process data, the tool steels, the lubricants and the defect atlas, and the place to look up a failure you have never seen.
- F. B. Kelsall and W. Johnson, *Technology of Plasticity*, and T. Altan et al., *Sheet Metals: Properties, Forming and Applications*, ASM International, 2012 — the shop-floor numbers behind the K-factor, the springback factor and the die-radius rules.
- L. S. Tóth, J. J. Jonas and others on texture and $r$-values, and W. Lankford, D. G. Nickrin and R. M. Kline, "Drawing characteristics of sheet steel", *Metals Industry* 59 (1948) — the paper that made drawability a metallurgy.
- M. Geiger and P. Manhardt, *Hot Stamping of Ultra High Strength Steels*, and the Plamennac patent literature, for the process of §6; and R. K. Bhadeshia, *Boron-processed steels*, *Science and Technology of Welding Manufacture* (2022) for the free and excellent online treatment of the metallurgy.
