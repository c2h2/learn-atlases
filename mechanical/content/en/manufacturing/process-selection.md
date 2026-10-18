Nothing in the previous eleven courses of this atlas asks how a thing is made. Statics asks what loads a bracket carries; mechanics of materials asks whether it survives them; materials science asks what it might be made of. This course asks the question that comes next and that no amount of analysis answers: **how do you get two hundred thousand pieces of that shape, to that tolerance, in that alloy, for that money, out of a factory that is already running?** The answer changes the drawing. It changes it before the drawing is finished, which is why process selection is not the last step of design but the third.

Every manufacturing process is one of a very small number of operations on matter: **make it liquid and let it freeze into a shape, make it solid and push it into a shape, take material away until what is left is the shape, put two shapes together, or build the shape up in layers.** Everything else — the heat treatment, the plating, the deburring, the inspection — changes a property or a surface without changing the geometry. Those five operations differ in one physical respect, and that one difference explains nearly all of their economics: **the state of the material at the instant the shape is imposed.** A liquid takes the shape of a mould and therefore takes its cost, its tolerance and its surface finish; a solid resists, and therefore takes the force, the press and the die; a chip is removed one tooth-pass at a time and therefore takes machine time, which is the most expensive thing in the shop. Tolerance, rate, tooling and part size all follow from that.

::: warning Five ways process selection goes wrong
**Specifying a tolerance nobody needs.** The single most expensive habit in engineering drawing is a $\pm 0 . 0 1 \ \mathrm { m m }$ note on a dimension that locates a cover plate. Tolerance cost roughly **doubles for every two IT grades** tighter than IT11, so a hole held to IT6 costs about six times the same hole at IT11, and the fixture to hold it, the gauge to check it and the scrap rate behind it cost more again. The rule is that a tolerance must be **traceable to a function** — a fit, a sealing surface, a bearing seat, an optical axis — and every dimension without a function gets IT12 or a general-tolerance note. **Choosing the process for the prototype and shipping it at a hundred thousand a year.** The machined prototype that cost £180 each is a £180,000,000 mistake at a thousand a day, and the injection moulding tool that would have cost £40,000 looks absurd in retrospect. Break-even quantities are arithmetic and they are cheap to do; see §4. **Designing the material and not the process.** A casting with a section that thickens from $3 \ \mathrm { m m }$ to $3 0 ~ \mathrm { m m }$ in one step shrinks unevenly and feeds a hot spot that no riser can reach; a moulding with a $2 \ \mathrm { m m }$ boss on a $1 2 ~ \mathrm { m m }$ wall sinks a dimple on the face opposite; a machined pocket with a sharp internal corner needs a ball-nosed cutter at a $0 . 8 \ \mathrm { m m }$ stepover and forty minutes of five-axis time for a feature that a $6 \ \mathrm { m m }$ corner radius would have given away. **Choosing additive manufacturing for complexity it does not have.** Additive buys geometry no tool can reach and quantities no tool justifies. It does not buy cheapness: at $1 0 0 ~ \mathrm { g / h }$ of titanium powder, a $2 ~ \mathrm { k g }$ bracket is £3,200 of machine time against £88 forged, and the reason anyone pays it is an internal cooling channel. **Choosing a datum and never writing it down.** A part can be made to drawing and fail in assembly because nobody said which face, which hole and which axis everything else is measured from. The tolerance stack in §3 is meaningless without a datum scheme, and the inspection in [[manufacturing/metrology-quality]] cannot even begin without one.
:::

## 1. Five operations on matter

::: definition The process families {#def-families}
Every process in this course belongs to one of five families, distinguished by the state of the workpiece when the shape is imposed:

$$
\begin{array} { l l l l l }
\textbf{Family} & \textbf{State at forming} & \textbf{Examples} & \textbf{Typical IT} & \textbf{Typical } R _ { a } \ [ \mu \mathrm { m } ] \\ \hline
\text{Solidification} & \text{liquid} & \text{sand, investment, die, centrifugal, continuous cast} & 1 1 { - } 1 5 & 3 \mathrm { - } 2 5 \\
\text{Bulk deformation} & \text{solid, yielding} & \text{rolling, forging, extrusion, drawing} & 8 { - } 1 3 & 0 . 4 \mathrm { - } 1 2 \\
\text{Sheet forming} & \text{solid, thin} & \text{shearing, bending, deep drawing, spinning} & 8 { - } 1 2 & 0 . 4 \mathrm { - } 3 . 2 \\
\text{Material removal} & \text{solid, cut} & \text{turning, milling, drilling, grinding, EDM, laser} & 4 { - } 9 & 0 . 0 2 \mathrm { - } 3 . 2 \\
\text{Additive} & \text{layer by layer} & \text{powder-bed, extrusion, vat, sheet lamination} & 8 { - } 1 2 & 1 { - } 2 0 \\
\text{Joining} & \text{interface} & \text{fusion, solid-state, braze, adhesive, threaded} & \text{assembly} & \text{assembly}
\end{array}
$$

Three consequences run through the whole course. **A process that forms from liquid reproduces a mould surface**, so its finish is the mould's finish and its tolerance is the mould's tolerance, which decays as the mould wears. **A process that forms by yielding needs a force** proportional to the flow stress times the area, and the force sets the machine, the machine sets the maximum part size, and the die sets the tooling cost. **A process that removes material is limited by a rate of cubic millimetres per second**, so its time is the volume removed divided by that rate — which is why the cheapest part is the one from which the least material is removed, and why the phrase *buy-to-fly ratio* in §5 is an economic and not an environmental curiosity.
:::

::: example Classify it, then argue about it {#ex-classify level=3 check="3"}
A grey cast iron gearbox housing, $3 2 0 \times 2 4 0 \times 1 8 0 \ \mathrm { m m }$ , $4 \ \mathrm { m m }$ walls, twenty-two bolt bosses, a bored bearing bore to H7 and a cover face flat to $0 . 0 5 \ \mathrm { m m }$ , at 8,000 a year.

**Solidification** for the body: it is a hollow box with internal bosses, which is the shape class that only a mould makes, and grey iron is cast because it is nearly impossible to form. **Material removal** for the two functional surfaces: the H7 bearing bore at IT7 and the $0 . 0 5 \ \mathrm { m m }$ cover face cannot be held on a casting, so the part is *near*-net-shape and gets machined twice — one facing operation and one boring operation, about 3 minutes on a machining centre. **Joining** for the cover and the four fasteners that are not moulded in. **Property change** (not a shape operation) for the stress relief between casting and machining, without which the facing operation would relax and the flatness would be gone by the time the housing was cold.

The argument is the quantity. At 8 a year the same housing is made from a welded fabrication and machined from solid, because a pattern and a mould cost £9,000 and eight castings do not repay it. At 800,000 a year it is die cast in aluminium with machined bosses, because iron cannot be die cast and the wall can come down to $2 . 5 \ \mathrm { m m }$ . **The part is the same part; the process is a function of the annual quantity.**
:::

## 2. The four questions, in the order they must be asked

::: definition What actually decides the process {#def-four}
**1. What is it made of, and does that alloy permit the process?** Can it be melted without a crucible fight and poured without reoxidising (titanium cannot be cast in air)? Has it the ductility to be formed — a rule of thumb is that a room-temperature elongation below about $1 0 \ \%$ rules out drawing and spinning, and hot working needs a temperature above $0 . 5 \ T _ { m }$ in kelvin where the oxide does not spall? Is it machinable — free-machining brass at a machinability of 100 against 304 stainless at 25, which is a four-fold difference in tool life at the same cut? **2. What shape class is it?** Axisymmetric and prismatic suits turning, rolling and extrusion; box-and-hollow suits casting and sheet; double-curvature suits hydroforming, spinning or nothing; large flat suits plate and laser cutting. **3. How tight, and how smooth?** The IT grade and the $R _ { a }$ decide which processes are even candidates, and they are the two numbers most often over-specified. **4. How many?** Quantity decides the tooling you can amortise, and tooling decides which processes are affordable at all.

The order matters. Ask quantity first and you choose a process the material refuses; ask tolerance last and you find that the cheap process you chose holds IT11 and the drawing wants IT7. A fifth question is not on the list but decides most real selections: **what is already in the factory, and what does it cost an hour?** A shop rate of £45 an hour on the press brake down the road and £140 on the five-axis down the corridor is worth more than any table in this lesson.
:::

::: widget plot
title: Piece cost against batch size — the whole case for tooling in one picture
f: 20; 1.1+4000/x; 1.1+40000/x
x: 100,20000
y: 0,45
vlines: 212,2116
labels: machined from bar, £20 a piece and no tooling; moulded with a £4,000 aluminium tool; moulded with a £40,000 production tool; break-even at 212; break-even at 2116
caption: Piece cost against annual quantity for a small bracket made three ways. Machining has no tooling and a flat £20 a piece; moulding has a tool and a £1.10 piece. The aluminium "soft" tool breaks even against machining at 212 pieces and the steel production tool at 2,116, and the entire argument about tooling is contained in those two numbers: **a tool is worth making when the saving it buys repays its price**. Below 212 pieces the machined part is cheaper however elegant the mould is; between 212 and 2,116 the soft tool wins; above it the production tool is five times cheaper per piece and the soft tool's shorter life and worse flash make it a liability.
:::

::: example The same bracket at three quantities {#ex-bracket level=3 check="91"}
An aluminium L-bracket, $1 1 0 \times 8 0 \times 6 0 ~ \mathrm { m m }$ , $5 \ \mathrm { m m }$ walls, four holes at H9 and a face flat to $0 . 1 \ \mathrm { m m }$ . Considered: machined from a sawn billet, die cast, and — for comparison only — printed in aluminium powder.

**Machined.** 1.9 kg of 6082 bar at £4.20 a kg is £8.00; 0.42 h on a 3-axis machining centre at £75 is £31.50; the fixture is £1,400, amortised over whatever you make. Piece cost **£39.50** plus fixture.

**Die cast.** Metal 0.95 kg of A380 at £2.60 a kg is £2.47 (the casting is near-net-shape, so it uses half the metal); cycle 22 s on a 400 tonne machine at £95 an hour is £0.58; trim die operation £0.22; one machining operation for the flat and the four holes, 45 s at £60, is £0.45; total running cost **£3.72 a piece**, plus a steel tool at £34,000.

**Printed.** 0.95 kg net at $6 0 ~ \mathrm { g / h }$ and 60 % powder yield is 26 h of machine at £150 is £3,900, plus support removal, heat treatment and the machining of the flat. Call it **£4,300 a piece** with no tooling at all.

Now multiply the tooling by the quantity. At **50 a year**: machined £39.50 + £28 fixture = **£68**; die cast £3.72 + £680 tool = **£684**; printed **£4,300**. Machining wins by a factor of ten. At **5,000 a year**: machined **£39.80**, die cast £3.72 + £6.80 = **£10.50**, printed £4,300 — die casting wins, and the tool has repaid itself in nineteen weeks. At **500,000 a year** the die cast part is **£3.79** and the machined one is a £20,000,000 a year absurdity.

The break-even between machining and die casting is $( 3 4 , 0 0 0 - 1 , 4 0 0 ) / ( 3 9 . 5 0 - 3 . 7 2 ) = 9 3 3$ pieces. **Anything below about a thousand, do not make a die.**
:::

## 3. Tolerance is a price, and the price is a law

::: definition The IT grades and the tolerance unit {#def-it}
The ISO system of limits and fits defines one number, the **standard tolerance unit** $i$ , from the nominal size $D$ in millimetres:

$$
i \ = \ 0 . 4 5 \sqrt [ 3 ] { D } \ + \ 0 . 0 0 1 \, D \qquad [ \mu \mathrm { m } ]
$$

and builds the grades from multiples of it: $\mathrm { I T } 5 = 7 i$ , $\mathrm { I T } 6 = 1 0 i$ , $\mathrm { I T } 7 = 1 6 i$ , $\mathrm { I T } 8 = 2 5 i$ , $\mathrm { I T } 9 = 4 0 i$ , $\mathrm { I T } 1 0 = 6 4 i$ , $\mathrm { I T } 1 1 = 1 0 0 i$ , $\mathrm { I T } 1 2 = 1 6 0 i$ . The cube-root term is the geometric-error term — the way straightness, squareness and positional error grow with size when nothing is being actively measured — and the linear term is the thermal and machine-way term, $1 \ \mu \mathrm { m }$ per millimetre, which is roughly the expansion of steel through $0 . 2 5 \ \mathrm { K }$ and also roughly the straightness of a ground machine bed. The cube root dominates at every size a shop sees: at $D = 1 { , } 0 0 0 \ \mathrm { m m }$ the two terms are $4 . 5$ and $1 . 0 \ \mu \mathrm { m }$ , and they would only cross at $D = 9 { , } 5 0 0 \ \mathrm { m m }$ .

The numbers you should be able to quote: at $2 5 \ \mathrm { m m }$ , $\mathrm { I T } 6 = 1 3 \ \mu \mathrm { m }$ , $\mathrm { I T } 7 = 2 1 \ \mu \mathrm { m }$ , $\mathrm { I T } 8 = 3 3 \ \mu \mathrm { m }$ , $\mathrm { I T } 1 1 = 1 3 0 \ \mu \mathrm { m }$ . A **drilling is IT11-IT12, a reaming is IT7-IT8, a boring bar will hold IT8 and a ground or honed bore IT6**. And the same grade costs more the bigger the part is: IT7 at $2 5 \ \mathrm { m m }$ is $2 1 \ \mu \mathrm { m }$ , at $4 0 0 \ \mathrm { m m }$ it is $5 9 \ \mu \mathrm { m }$ , which sounds easier and is not, because holding $5 9 \ \mu \mathrm { m }$ across $4 0 0 \ \mathrm { m m }$ means holding $0 . 1 5$ parts per million of straightness, squareness, thermal stability and fixture error at once.
:::

::: widget plot
title: Why big parts are looser: the standard tolerance against nominal size
f: 10*(0.45*pow(x,1/3)+0.001*x); 16*(0.45*pow(x,1/3)+0.001*x); 25*(0.45*pow(x,1/3)+0.001*x)
x: 3,500
y: 0,150
labels: IT6 (10i); IT7 (16i); IT8 (25i)
caption: The ISO standard tolerances for the three grades that matter in general engineering, plotted from the tolerance unit $i = 0 . 4 5 \sqrt [ 3 ] { D } + 0 . 0 0 1 D$ . The curve is concave: going from a $1 0 \ \mathrm { m m }$ pin to a $5 0 0 \ \mathrm { m m }$ weldment multiplies the absolute tolerance by about five, which is why a bearing seat and a frame are allowed different numbers and why "the same tolerance everywhere" is both expensive and, on the large part, unachievable. Read IT7 at $5 0 \ \mathrm { m m }$ : $2 7 \ \mu \mathrm { m }$ , which is the width of two human hairs and the reason a jig borer, not a drill, makes that hole.
:::

::: definition What each process actually holds {#def-capability}
Economically achievable tolerance (IT grade) and surface roughness, for a competent shop with the part already fixtured:

$$
\begin{array} { l l c c l }
\textbf{Process} & \textbf{Best size} & \textbf{IT} & R _ { a } \ [ \mu \mathrm { m } ] & \textbf{The catch} \\ \hline
\text{Sand casting} & \text{any} & 1 4 { - } 1 5 & 1 2 { - } 2 5 & \text{draft, scale, and a skin you must cut through} \\
\text{Investment casting} & 5 \mathrm { k g } \text{ typical} & 1 1 { - } 1 3 & 3 { - } 6 & \text{££ per kg, 6-week pattern lead time} \\
\text{High-pressure die casting} & 1 0 \mathrm { k g } & 1 0 { - } 1 2 & 1 . 6 { - } 3 . 2 & \text{no heat-treatable alloys, no welding, £££ tool} \\
\text{Cold forging} & \text{small} & 7 { - } 9 & 0 . 4 { - } 1 . 6 & \text{enormous press, only ductile metals} \\
\text{Hot rolling (bar, plate)} & \text{any} & 1 2 { - } 1 4 & 6 { - } 1 2 & \text{scale, and camber you must straighten} \\
\text{Cold drawing (bar, tube)} & \text{small} & 8 { - } 1 0 & 0 . 4 { - } 0 . 8 & \text{straight lengths only} \\
\text{Extrusion (Al)} & \text{any section} & 9 { - } 1 1 & 1 . 6 & \text{one constant section, die cost £1-5k} \\
\text{Laser cutting (3 mm sheet)} & \text{sheet} & 9 { - } 1 0 & 3 { - } 1 2 & \text{taper and dross on the underside} \\
\text{Stamping / deep drawing} & \text{sheet} & 9 { - } 1 1 & 0 . 4 { - } 1 . 6 & \text{tool cost, springback, draw radius} \\
\text{Turning} & \text{any} & 7 { - } 8 & 1 . 6 { - } 3 . 2 & \text{turned surfaces only} \\
\text{Milling} & \text{any} & 7 { - } 9 & 1 . 6 { - } 3 . 2 & \text{tool access and reach-to-diameter} \\
\text{Drilling then reaming} & \text{holes} & 7 { - } 8 & 0 . 8 { - } 1 . 6 & \text{walk, and no holes off-centre of an axis} \\
\text{Cylindrical grinding} & \text{round} & 5 { - } 6 & 0 . 2 { - } 0 . 4 & \text{slow, and wheel burn if you push it} \\
\text{Honing / lapping} & \text{bores, flats} & 4 { - } 5 & 0 . 0 2 { - } 0 . 1 & \text{a finishing operation, not a sizing operation} \\
\text{Wire EDM} & \text{through} & 5 { - } 6 & 0 . 4 { - } 0 . 8 & \text{conductive, slow, taper on the fall} \\
\text{Sinker EDM} & \text{3-D cavity} & 7 { - } 8 & 0 . 4 { - } 1 . 6 & \text{electrode cost, recast layer} \\
\text{Injection moulding} & \text{small} & 9 { - } 1 1 & 0 . 4 { - } 1 . 6 & \text{sink, warp, and the tool is the product} \\
\text{SLA / DLP resin} & \text{small} & 9 { - } 1 0 & 1 { - } 6 & \text{it degrades in sunlight and it is brittle} \\
\text{Powder-bed metal (SLM)} & 2 5 0 \ \mathrm { m m } & 9 { - } 1 1 & 8 { - } 1 5 & \text{anisotropy, residual stress, support marks} \\
\text{FDM polymer} & \text{any} & 1 0 { - } 1 2 & 1 0 { - } 2 0 & \text{layer strength is } 5 0 { - } 7 0 \ \ \% 	ext{ of the bulk}
\end{array}
$$

Two rules fall out of the table. **Nothing that is formed holds a tolerance a machined part needs** — every formed part with a functional surface has a machining operation in its route, and the routing is what costs money, not the cutting. And **the last two IT grades cost more than the first eight put together**, which is the content of the next figure.
:::

::: widget plot
title: What a tighter tolerance costs, and where the cliff is
f: pow(2,(11-x)/2)
x: 4,12
y: 0,12
labels: relative cost per feature (IT11 = 1)
caption: Relative cost of a machined feature against its IT grade, on the shop rule of thumb that cost doubles for every two grades of tightening. The curve is exponential and the shop floor is not: a designer reads IT6 as "a bit tighter than IT11", a factor of six in the drawing and often a factor of ten in the fixture, the gauge, the inspection frequency and the scrap. The knee of the real curve is where the process changes — IT8 by boring, IT6 only by grinding or honing, IT5 only by lapping — and each process change is a new setup, a new datum and a new machine, which is why the last micron is not six times the price of the tenth, it is a different factory.
:::

::: example The hole that costs four times itself {#ex-bore level=3 check="4.6"}
A $\varnothing 2 5 \ \mathrm { H } 7$ $( + 0 . 0 2 1 / 0 )$ bearing bore, $4 0 \ \mathrm { m m }$ deep, in a cast housing, at 4,000 a year. Machine rate £65 an hour.

**Drill and bore only (IT11, $+ 0 . 1 3 / 0 )$ :** pilot, drill and bore, 1.1 minutes — **£1.19**. The bearing will not press in and the bore is out of round by the coring of the drill.

**Ream to IT7:** drill, bore, and ream 40 mm deep in cast iron with a 6-flute carbide reamer at 25 m/min, 0.4 mm/rev — 1.9 minutes total, plus a reamer costing £38 that makes 900 holes — **£2.06 + £0.04 = £2.10**. This is the honest answer and it is what the drawing should say if the fit is a location fit.

**Bore to IT7 on a jig borer, then hone to IT6 and $R _ { a } \ 0 . 2$ for a press fit:** rough and finish bore 3.5 minutes, hone 1.6 minutes at a second machine, gauge and go/no-go check 0.4 minutes, plus honing allowance of $0 . 0 5 \ \mathrm { m m }$ on diameter designed in from the start — **£5.90**.

The last $8 \ \mu \mathrm { m }$ of tolerance and the last $1 . 4 \ \mu \mathrm { m }$ of finish cost **£3.80 against £1.19 for everything before them: a factor of 4.6** — and that is before the second machine, the second fixture, the gauge, the higher scrap and the longer lead time. Ask of every IT6 note on a drawing: *what breaks if this is IT8?* The answer is almost never the bearing.
:::

::: proof Statistical tolerance allocation: why five parts can each be twice as loose {#proof-stack}
A stack of $n$ features must come out within $T$ . In the **worst-case** interpretation every feature is at its own extreme in the same direction, so with equal allocations $t$ ,

$$
T \; = \; \sum _ { i = 1 } ^ { n } t _ { i } \; = \; n t \qquad \Longrightarrow \qquad t \; = \; { \frac { T } { n } }
$$

In the **statistical** interpretation the feature errors are independent samples from distributions of comparable spread, so the variance of the sum is the sum of the variances. Writing each tolerance as $k$ standard deviations,

$$
T ^ { 2 } \ = \ \sum _ { i = 1 } ^ { n } t _ { i } ^ { 2 } \ = \ n t ^ { 2 } \qquad \Longrightarrow \qquad t \ = \ { \frac { T } { \sqrt { n } } }
$$

For $n = 5$ and $T = 0 . 5 \ \mathrm { m m }$ , worst case demands $t = 0 . 1 0 0 \ \mathrm { m m }$ per feature and the root-sum-square allows $t = 0 . 5 / { \sqrt { 5 } } = 0 . 2 2 4 \ \mathrm { m m }$ — **each part may be 2.2 times as loose**, which from the figure above is worth roughly a factor of two in cost per feature. The saving is real and it is bought with a price that must be paid explicitly: the RSS result is a statement about a *population*, valid only while the process mean stays centred and the distributions stay normal, so it requires process control, and it guarantees that a small fraction of assemblies — about $0 . 3 \ \%$ at $\pm 3 \sigma$ — will be outside $T$ . **Use worst case where an out-of-tolerance assembly is a hazard or a warranty claim; use RSS where it is a rework, and never use RSS without a Cpk number behind it.** See [[manufacturing/metrology-quality]].
:::

## 4. Batch size, tooling, and the arithmetic of break-even

::: definition The piece-cost equation and the break-even quantity {#def-breakeven}
The cost of one piece made $N$ times is

$$
c ( N ) \; = \; \underbrace { m } _ { \text{material} } \; + \; \underbrace { w } _ { \text{processing} } \; + \; \underbrace { { \frac { T _ { \mathrm { t o o l } } + T _ { \mathrm { f i x } } } { N } } } _ { \text{amortised tooling} } \; + \; \underbrace { f + q } _ { \text{finish, inspect} } \; \Big / \; ( 1 - s )
$$

where $w$ is the machine and labour time at the shop rate, $s$ is the scrap fraction and the tooling includes patterns, dies, moulds, electrodes and fixtures. Processing cost is roughly flat in $N$ for a machining route and falls steeply for a forming route, because the forming cycle is short and the tool is expensive. For two candidates the **break-even quantity** is

$$
N ^ { * } \; = \; { \frac { \Delta T _ { \mathrm { t o o l } } } { \Delta w + \Delta m } } \; = \; { \frac { \text{extra tooling} } { \text{saving per piece} } }
$$

Three things follow. **Tooling is only worth buying if you will make more than $N ^ { * }$**, and $N ^ { * }$ is a one-line calculation that almost nobody does before signing the tool. **The break-even is brutally sensitive to the saving per piece**: halving the cycle time of the expensive process doubles $N ^ { * }$ , which is why a "cheap" two-cavity tool that runs at half the rate is often worse than an expensive four-cavity one. And **the quantity that matters is the lifetime quantity, not the annual one** — a car model lives four years, an industrial pump twenty, and a tool designed for a twenty-year part with a four-year life is a tool that will be re-cut or written off.
:::

::: example Die casting against sand casting {#ex-breakeven level=3 check="2892"}
An aluminium lever, $1 . 4 \ \mathrm { k g }$ . **Sand cast** with an aluminium pattern at £4,000: metal and moulding £11.50 a piece, and 2.6 kg of feed and gating bought to make 1.4 kg. **High-pressure die cast** with a steel tool at £28,000: £3.20 a piece, 1.55 kg bought, and a machining operation included because the die holds the hole to IT11 and the drawing wants IT8.

$$
N ^ { * } \; = \; { \frac { 2 8 , 0 0 0 - 4 , 0 0 0 } { 1 1 . 5 0 - 3 . 2 0 } } \; = \; { \frac { 2 4 , 0 0 0 } { 8 . 3 0 } } \; = \; 2 { , } 8 9 2 \ \text{pieces}
$$

Below that, sand. Above it the die pays back at £8.30 a piece, so at 20,000 a year the tool is repaid in **seventeen weeks** and thereafter saves £166,000 a year. Two things the arithmetic does not say, and both of them belong in the decision: the die-cast part is **limited to alloys that will not weld to the tool** (no 6061, no 7075 — A380 or B390 or nothing, see [[manufacturing/casting]]), and the die-cast part **cannot be solution heat treated** without blistering, because it is full of entrapped gas. If the lever needs T6 properties, the die-casting option is dead at any quantity and the £8.30 never existed.
:::

::: example Soft tooling, bridge tooling, and the option value of being wrong {#ex-soft level=3 check="1400"}
The same lever is needed in 40 pieces next month for a field trial, and the business case says 60,000 a year if it succeeds.

Three routes. **Mach and form** the 40 from plate at £118 each: £4,720, no commitment, and the design can still change. **Aluminium (soft) mould or low-melty-alloy die** at £9,000 giving £5.80 pieces: total for the trial £9,232, and the die will make 3,000-8,000 shots before the surface washes out. **Production steel tool now** at £28,000, with the design frozen whether or not the trial succeeds.

The soft route costs £4,500 more than machining the trial and delivers 3,000-8,000 further pieces — which is exactly the option you want to buy, because it lets you find out whether the volume exists before spending the £28,000. The correct number to quote your manager is not the piece cost of any route but **the cost of being wrong about the volume**: the steel tool costs £28,000 if the product fails, and the soft tool costs £9,000. **A manufacturing decision that cannot be reversed must be priced as an option, not as a unit cost.** The same logic makes electrodes, wax injection moulds and 3D-printed patterns the standard first move in casting development, and it is why the £1,400 fixture in the bracket example of §2 is the cheapest tooling in the shop and the one most often left out of the quotation.
:::

## 5. Material in, material out: buy-to-fly, swarf and the energy behind the part

::: definition Buy-to-fly ratio, and why it is an economic number {#def-btf}
The **buy-to-fly ratio** is the mass of material bought divided by the mass that ends up in the delivered part. A machined titanium aerospace bracket typically runs **5:1 to 10:1**; a forged one 1.5:1 to 2.5:1; a printed one 1.1:1 in geometry but 1.5:1 to 3:1 in practice once powder yield, supports and coupons are counted; a cold-finished bolt 1.05:1; a sand casting 1.5:1 to 2:1 counting feed and gating.

It is an economic number for three reasons that compound. **You pay for the swarf** at the price of the alloy, and titanium swarf is worth about a tenth of the bar because it cannot all be re-melted into aerospace stock. **You pay to make the swarf** at the machine rate, and the machine rate is the highest number in the cost sheet: £110 an hour on a five-axis against £12 a kilogram of titanium means that an hour of roughing that removes 1.2 kg is £110 of labour to destroy £14 of metal. **And you pay for the energy that made the metal**, which is the number that eventually appears in a carbon report: about $2 0 \ \mathrm { M J / k g }$ for a steel section, $2 1 0 \ \mathrm { M J / k g }$ for primary aluminium, $5 0 0 \ \mathrm { M J / k g }$ for titanium mill product. Throwing away three-quarters of a kilogram of aluminium throws away $1 6 0 \ \mathrm { M J }$ — more than the energy content of a litre of petrol — before the part has had one useful thought.
:::

::: example The titanium bracket, three ways {#ex-titanium level=3 check="88"}
A Ti-6Al-4V flight bracket, net mass $2 . 1 \ \mathrm { k g }$ , four critical machined faces, 5,000 a year.

**Machined from a sawn billet.** Buy $1 2 \ \mathrm { k g }$ at £12 a kilogram = £144, and remove $9 . 9 \ \mathrm { k g } = 2 { , } 2 3 5 \ \mathrm { c m } ^ { 3 }$ of it. Roughing at a good $1 5 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ in titanium with 70 bar through-coolant is 149 minutes; the four finishing faces, $4 0 0 ~ \mathrm { c m } ^ { 3 }$ at $3 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ , are 133 minutes; holes and taps 1.5 hours; three re-fixturings on the fifth axis 1.2 hours; deburr and edge break 0.5 hours; load, unload and inspect 0.3 hours. **8.2 hours** at £110 = £902, plus £144 of metal and £60 of inspection: **£1,106 a piece**, buy-to-fly 5.7. This is why the first three units of every titanium structure cost £40,000 each.

**Closed-die forged, then machined.** Buy $4 . 6 ~ \mathrm { k g }$ of bar at £12 = £55 and lose $2 . 5 ~ \mathrm { k g }$ to flash and trim, credited back at £3 a kilogram: net material **£47.50**. Forging on a 4,000 tonne friction press, 0.05 hours at £180 = £9; trim 0.02 hours at £90 = £1.80; stress relieve and pickle £9; shot blast £3; machine the four critical faces, 0.15 hours at £60 = £9; fluorescent penetrant inspection £6. Running cost **£85.30**, and the £14,000 hot-forging die amortises at £2.80 a piece at 5,000 a year: **£88 a piece**, buy-to-fly 2.2.

**Printed by laser powder-bed fusion.** $2 . 1 \ \mathrm { k g }$ net at a production $1 0 0 ~ \mathrm { g / h }$ is 21 hours of machine at £150 = £3,150; powder at 60 % yield is $3 . 5 \ \mathrm { k g }$ at £45 = £158; stress relief, hot isostatic pressing and blast £380; support removal and surface finishing £250; machining the four critical faces, because as-built surfaces are $R _ { a } \ 1 2$ and the fatigue strength perpendicular to the build is 65 % of wrought: £200. **£4,140 a piece**, no tooling, buy-to-fly 1.7.

Now read the ranking off the quantity. Break-even of forging against machining is $1 4 , 0 0 0 / ( 1 1 0 6 - 8 5 ) = 1 3$ pieces; against printing, $1 4 , 0 0 0 / ( 4 1 4 0 - 8 5 ) = 4 $ pieces. **Above about fourteen pieces the forged bracket is the cheapest thing that meets the drawing, and the printed one is never the cheapest — not at 5,000 a year and not at five.** What printing buys is not a low piece cost; it is the internal coolant passage, the consolidated assembly of nine parts into one, the topology optimisation with pockets no die can release and no five-axis tool can reach. Ask for that and pay the £4,140; ask for it because it sounded modern and pay for the die.
:::

::: widget plot
title: Machine hours against removal rate — why subtractive processes live on a cliff
f: 2235/(60*x); 400/(60*x); 20/(60*x)
x: 1,200
y: 0,40
labels: 2,235 cm³ — the titanium bracket of §5; 400 cm³ — an aluminium housing; 20 cm³ — one pocket in a die
caption: Hours of machine time to remove a fixed volume, against the volumetric removal rate. Subtractive processes live on the left-hand cliff, because removal rate is not a machine specification you can dial up at will — it is set by the workpiece. Titanium at $1 5 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ with high-pressure coolant, hardened tool steel at $1 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ , free-machining brass at $8 0 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ , aluminium at $6 0 0 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ on a high-speed spindle, and wire EDM at $1 { - } 2 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ regardless of hardness, which is exactly why EDM exists: it is the only process whose rate does not care how hard the material is. Read the bracket curve at $1 5 ~ \mathrm { c m } ^ { 3 } / \mathrm { m i n }$ : 2.5 hours of pure cutting, which becomes 8.2 hours of machine time once finishing passes, re-fixturing and tool changes are counted — and the ratio between those two numbers, called the metal-cutting ratio, is the second thing a manufacturing engineer can improve and the first thing a designer can, by removing less. Casting and forming remove nothing at all, and that is their entire economic advantage.
:::

## 6. Design rules are process rules written in the language of the drawing

::: definition The rules, and the process each one comes from {#def-dfm}
Every rule below is a physical constraint on a machine, a tool or a flow of metal, translated into something a designer can obey without knowing it:

$$
\begin{array} { l l l }
\textbf{Rule} & \textbf{Because} & \textbf{If you break it} \\ \hline
\text{Draft of } 1 ^ { \circ } \text{ on cast and moulded faces} & \text{the pattern or part must leave the mould} & \text{scuffed walls, washed-out moulds, a part that sticks} \\
\text{Internal radius } = \text{wall thickness in a casting} & \text{molten metal cannot fill a sharp corner and it shrinks there} & \text{shrinkage porosity exactly where the stress is highest} \\
\text{Constant section, or taper it over } 6 { : } 1 & \text{thick places cool last and need feeding} & \text{a hot spot no riser can reach} \\
\text{Corner radius } \geq 1 . 2 \times \text{ tool radius in a pocket} & \text{a cutter is a cylinder} & \text{a fillet you cannot cut, or a $30 \%$ step in the tool path} \\
\text{Hole depth } \leq 4 \times \text{ diameter for a twist drill} & \text{the drill is a long, thin, badly cooled cantilever} & \text{walk, breakage, and a hole that is not where the drawing says} \\
\text{Thread run-out and undercut at a shoulder} & \text{a tap or a grinding wheel does not get thinner at the end} & \text{a bolt bottoming in a blind hole, or a shoulder the wheel never reaches} \\
\text{Wall thickness within } \pm 2 5 \ \% \text{ and under } 4 \ \mathrm { m m } \text{ in a moulding} & \text{plastic shrinks as it cools and sinks over thick cores} & \text{a dimple on the good face, and a part that warps off the tool} \\
\text{One bend radius, one material thickness, one part} & \text{the brake tool is made for one radius and one thickness} & \text{springback you cannot predict and a tool change per bend} \\
\text{Flange } \geq 4 \times \text{ thickness, hole } \geq t \text{ from the edge} & \text{sheet thins and splits at a draw radius} & \text{a split flange, and it is the die that has to be re-cut} \\
\text{Machine from one side in one setup where you can} & \text{every re-fixturing adds its own tolerance to the stack} & \text{a hole $0 . 0 8 \ \mathrm { m m }$ off a face you held to $0 . 0 2$} \\
\text{One datum, marked, and reachable by a probe} & \text{a tolerance without a datum is not a tolerance} & \text{two shops making two parts that both pass and do not fit} \\
\text{Fasteners that can be driven straight, from one side} & \text{an assembler has two hands and a fixed tool} & \text{a $1 8$-minute assembly and a dropped washer inside the housing}
\end{array}
$$

The rules are not restrictions on freedom; they are the reason the process is cheap. A casting is cheap because the pattern is pulled from the mould in one direction, and a moulding is cheap because it is ejected in one. **Design against the draft direction and you have asked the process to stop being itself**, at which point it becomes a core, a slide, a lift, a second setup, or a rejection.
:::

::: example The housing that lost sixty per cent of its parts {#ex-housing level=3 check="5.6"}
A valve manifold: fourteen parts — five castings, eight machined spacers and shims, one cover — twenty-two fasteners, three sealing interfaces, eighteen minutes of assembly at £32 an hour, and a leak rate that put 4 % of production on the rework bench.

The redesign asks the casting question instead of the assembly question. **The five castings become one**, with the internal passages cast as cores and the leak-prone interfaces eliminated; the eight spacers become three machined bores in the same body; the cover stays because the valve must be serviceable. Three parts, nine fasteners, one seal.

Time by the unit-assembly method — 3 seconds to handle and place a part, 35 seconds to present and drive a fastener:

$$
6 \times 3 \; + \; 9 \times 35 \; = \; 3 3 3 \ \text{seconds} \; = \; { \bf 5 . 6 } \ \text{minutes} \qquad \text{against} \qquad 1 8 \ \text{minutes}
$$

at £32 an hour, £9.60 becomes £2.96 of labour, and the leak test that found 4 % of the population leaking finds almost none, because there are eleven fewer interfaces to leak. The casting got more expensive — a core-made casting is £34 against £11 for the simple ones it replaced — and the total still fell, because **the cost of an assembly is dominated by the number of interfaces, not the cost of the parts**. This is design for manufacture and assembly in one paragraph, and its method is in [[design-process/design-for-manufacture]].
:::

## 7. Choosing systematically: screening, ranking and the lower envelope

::: definition Screening and the cost envelope {#def-envelope}
Formal selection, as in [[materials-science/materials-selection]] and [[design-process/concept-selection]], runs in two passes. **Screening** throws out everything that cannot work: the alloy cannot be die cast, the shape cannot be extruded because it is not a constant section, the tolerance is finer than the process holds, the quantity cannot amortise the tool, the material cannot be welded to what it must be welded to. Screening is a set of yes/no filters and it should be done first, on paper, in an hour, because it is free and it removes ninety per cent of the argument. **Ranking** then compares the survivors on cost, lead time, capability and risk.

The cost comparison is the one people get wrong, because they compare piece costs when they should compare **the lower envelope of total cost at the actual quantity** — the shape of the curves in the first figure of this lesson. Three cautions. **The envelope is drawn against lifetime quantity, not annual quantity**, and a product with a two-year life and a £40,000 tool needs 40,000 a year to justify it, not 40,000 total. **The envelope is drawn with the tooling you would actually buy**, and a quoted tool price from a supplier who has never seen the CAD is worth nothing. And **the envelope is not the decision when one candidate carries a capability risk**: a process that is 20 % cheaper and has a 1 in 200 escape rate on a safety feature is not 20 % cheaper, because the recall is priced in the tail. The disciplined way to say this is to rank on cost, then to veto on capability, and never to average the two into a single score that hides the veto.
:::

::: example Screening a real list {#ex-screen level=3 check="2"}
A polymeric clip, $4 0 \times 2 5 \times 3 \ \mathrm { m m }$ , nylon 6:6 with 30 % glass, 250,000 a year, one dimension to $\pm 0 . 0 5 \ \mathrm { m m }$ , chemically resistant to brake fluid, and it snaps over a $0 . 8 \ \mathrm { m m }$ interference.

**Screen 1, material:** nylon 6:6 + GF30 is mouldable, is compatible with brake fluid, and is not machinable to a repeatable snap fit at 250,000 a year. Machining out. **Screen 2, shape:** a clip with a hook and a snap boss is a constant-section part only in one direction, so extrusion is out; it is a solid small part, so sheet processes are out; it is not a metal, so casting in the usual sense is out (and injection moulding *is* casting — see [[manufacturing/casting]]). **Screen 3, tolerance:** $\pm 0 . 0 5 \ \mathrm { m m }$ on $4 0 \ \mathrm { m m }$ is $1 . 2 5 \ \mu \mathrm { m } / \mathrm { m m }$ , which is injection-moulding class H and is achievable only on a dimension that is formed by one half of the tool and not across a parting line. **Screen 4, quantity:** 250,000 a year amortises a £22,000 four-cavity tool at £0.022 a piece, which is noise.

Two candidates survive: **injection moulding** and **nothing**. The decision is then entirely about the drawing — where the parting line goes, which half carries the critical dimension, whether the glass fibre runs across or along the snap (and therefore where the gate goes, because the fibre aligns with the flow and the strength along the flow is 1.6 times the strength across it), and whether the $0 . 8 \ \mathrm { m m }$ interference is moulded or moulded-then-sized. **Screening leaves you with one process and four design decisions, and the four design decisions are worth more than the process choice was.**
:::

## Exercises

::: exercise Stamping against laser and brake {#ex-stamp level=2 check="5626"}
A bracket in $1 . 5 \ \mathrm { m m }$ stainless sheet. Laser-cut and brake-formed with a £2,400 brake tool and fixture: £9.60 a piece. Progressive-stamp with a £46,000 die: £1.85 a piece. Find the break-even quantity. (Enter pieces, to the nearest piece.)
::: solution
$$
N ^ { * } = { \frac { 4 6 , 000 - 2 , 4 0 0 } { 9 . 6 0 - 1 . 8 5 } } = { \frac { 4 3 , 6 0 0 } { 7 . 7 5 } } = { \bf 5 { , } 6 2 6 \ p i e c e s }
$$
**At 20,000 a year the die repays itself in fourteen weeks; at 600 a year it is a £46,000 mistake.** Note what the calculation assumes: that the stamped part is *the same part*, and it is not — a progressive die cannot make a formed lip that needs a side action, holds a tighter repeatability than a brake, and cannot be changed for £200 when the customer moves a hole by 2 mm. **Tooling buys volume and loses flexibility, and the break-even quantity is only the point where the money crosses, not where the risk does.**
:::
:::

::: exercise What does IT8 want at 160 mm {#ex-it8 level=2 check="65"}
Compute the standard tolerance unit and then IT8 for a nominal size of $1 6 0 \ \mathrm { m m }$ . (Enter $\mu \mathrm { m }$ , to the nearest micron.)
::: solution
$i = 0 . 4 5 ( 1 6 0 ) ^ { 1 / 3 } + 0 . 0 0 1 ( 1 6 0 ) = 0 . 4 5 ( 5 . 4 3 ) + 0 . 1 6 = 2 . 4 4 3 + 0 . 1 6 = 2 . 6 0 \ \mu \mathrm { m }$ , and $\mathrm { I T } 8 = 2 5 i = { \bf 6 5 \ \mu m }$ . **Which is $0 . 0 4 \ \ \%$ of the size, against $0 . 1 3 \ \ \%$ for the same grade at $2 5 \ \mathrm { m m }$ : the big part is relatively far more precise, and it is the machine tool, the fixture and the temperature of the shop that have to be better, not the operator.**
:::
:::

::: exercise How much looser is statistical {#ex-stack level=2 check="2"}
A cover is located by a spacer stack of four features and the total clearance must be within $0 . 8 \ \mathrm { m m }$ . By what factor is the per-feature tolerance relaxed if the stack is allocated statistically rather than by worst case?
::: solution
Worst case: $t = 0 . 8 / 4 = 0 . 2 0 0 \ \mathrm { m m }$ . Root-sum-square: $t = 0 . 8 / \sqrt { 4 } = 0 . 4 0 0 \ \mathrm { m m }$ . **Factor 2.0** — and at two IT grades that is worth roughly a factor of two in cost per feature, which is the whole reason statistical tolerance allocation exists. **What it costs is the guarantee: the RSS statement is true for a population whose means stay centred, so it requires process control, and it accepts that about $0 . 3 \ \ \%$ of assemblies at $\pm 3 \sigma$ will not fit.**
:::
:::

::: exercise The scrap rate is a cost {#ex-scrap level=2 check="33.2"}
Material £4.60, processing 0.35 hours at £72 an hour, tooling £5,200 amortised over 8,000 pieces, finishing and inspection £1.40, and a scrap rate of $4 \ \ \%$ of which none is recovered. Find the piece cost. (Enter £, to one decimal place.)
::: solution
Running cost $4 . 6 0 + 2 5 . 2 0 + 0 . 6 5 + 1 . 4 0 = 3 1 . 8 5$ , and every scrapped piece must be paid for by the good ones, so $c = 3 1 . 8 5 / 0 . 9 6 = { \bf \pounds 3 3 . 2 }$ . **A $4 \ \ \%$ scrap rate costs $4 . 2 \ \ \%$ of everything, including the material you did not scrap.** **This is why a process capability index is a cost number and not a quality number: taking the scrap rate from $4 \ \ \%$ to $1 \ \ \%$ is worth £1.03 a piece, which at 8,000 a year is £8,200 for a fortnight of a process engineer's time.**
:::
:::

::: exercise How long to face-mill a plate {#ex-mill level=3 check="5.5"}
A $2 5 0 \times 1 6 0 \ \mathrm { m m }$ cast-iron plate is face-milled $2 . 5 \ \mathrm { m m }$ deep with a $\varnothing 1 2 5 \ \mathrm { m m }$ five-flute cutter at $v _ { c } = 2 2 0 \ \mathrm { m / m i n }$ and $0 . 1 2 \ \mathrm { m m }$ per tooth, with $1 5 \ \mathrm { m m }$ of approach and over-run each side, a $4 0 \ \mathrm { m m }$ stepover, and $0 . 2 5 \ \mathrm { m i n }$ of rapid return between passes. Find the total cutting and rapid time. (Enter minutes, to one decimal place.)
::: solution
$n = 1 0 0 0 v _ { c } / ( \pi D ) = 2 2 0 \, 0 0 0 / ( \pi \times 1 2 5 ) = 5 6 0 \ \mathrm { r p m }$ ; $v _ { f } = n z f _ { z } = 5 6 0 \times 5 \times 0 . 1 2 = 3 3 6 \ \mathrm { m m / m i n }$ . Pass length $1 6 0 + 3 0 = 1 9 0 \ \mathrm { m m }$ , so $0 . 5 7 \ \mathrm { m i n }$ per pass. Passes $= \lceil 2 5 0 / 4 0 \rceil = 7$ , so $7 \times 0 . 5 7 = 3 . 9 5 \ \mathrm { m i n }$ of cutting plus $6 \times 0 . 2 5 = 1 . 5 \ \mathrm { m i n }$ of returns: **5.5 minutes**, which at £90 an hour is £8.20 — before the 6 minutes of fixturing, the 4 minutes of program verification and the one time in forty when the insert hits a riser boss nobody saw on the casting.
:::
:::

::: exercise The energy you throw away {#ex-energy level=3 check="2520"}
An aluminium housing of $6 \ \mathrm { k g }$ is machined from an $1 8 ~ \mathrm { k g }$ billet. Taking $2 1 0 \ \mathrm { M J / k g }$ for primary aluminium, how much primary energy is embodied in the swarf alone? (Enter MJ.)
::: solution
$1 8 - 6 = 1 2 \ \mathrm { k g }$ of swarf at $2 1 0 \ \mathrm { M J / k g } = { \bf 2 { , } 5 2 0 \ M J }$ , which is the energy content of about sixty litres of petrol, spent to make a chip that will be remelted at best into ingot for a sand casting. **Recycling swarf costs about $5 \ \ \%$ of the primary energy, so the loss is real but not infinite — the sharper loss is the £12,300 of machine time in §5, which no furnace recovers.** **The buy-to-fly ratio of 3.0 here is typical of a machined housing and terrible of a designed one: a cast or formed housing is 1.2 to 1.5.**
:::
:::

::: exercise What the last grade costs {#ex-cost level=3 check="8"}
Using the shop rule of thumb of this lesson, by what factor does the cost of a feature rise in going from IT11 to IT5?
::: solution
Six grades at a doubling every two grades: $2 ^ { 6 / 2 } = { \bf 8 }$ . **And the rule of thumb understates it, because IT5 is not a better version of IT8 — it is lapping, a second machine, a second datum, a controlled shop temperature and a gauge instead of a micrometer.** **This is the number to quote when a designer asks for "a bit tighter": ask which IT grade, compute the factor, and ask what fails.**
:::
:::

::: exercise Derive the break-even with two scrap rates {#ex-derive1 level=4 check="2501"}
Process 1 costs $w _ { 1 } = \pounds 1 2 . 0 0$ a piece with a $1 \ \ \%$ scrap rate and no tooling. Process 2 costs $w _ { 2 } = \pounds 4 . 0 0$ a piece with a $3 \ \ \%$ scrap rate and £20,000 of tooling. Derive the break-even quantity for the delivered good piece and evaluate it.
::: solution
The cost of a *good* piece is the cost of everything consumed divided by the yield, $c = ( w + T / N ) / ( 1 - s )$ , so
$$
{ \frac { w _ { 1 } } { 1 - s _ { 1 } } } = { \frac { w _ { 2 } + T / N } { 1 - s _ { 2 } } }
 \qquad \Longrightarrow \qquad
N ^ { * } = { \frac { T } { \; { \dfrac { w _ { 1 } ( 1 - s _ { 2 } ) } { 1 - s _ { 1 } } } - w _ { 2 } \; } }
$$
$$
N ^ { * } = { \frac { 2 0 \, 0 0 0 } { 1 2 . 0 0 \times 0 . 9 7 / 0 . 9 9 - 4 . 0 0 } } = { \frac { 2 0 \, 0 0 0 } { 1 1 . 7 6 - 4 . 0 0 } } = { \bf 2 { , } 5 0 1 \ p i e c e s }
$$
**Against the $2 0 \, 0 0 0 / ( 1 2 - 4 ) = 2 { , } 5 0 0$ you get by ignoring scrap, the answer barely moves here — but only because the two scrap rates are close.** **If process 2 scrap were $8 \ \ \%$ , its good-piece cost would be $4 . 0 0 / 0 . 9 2 = \pounds 4 . 3 5$ and $N ^ { * }$ would rise to 3,030, a fifth higher: a fast process that scraps one in twelve has to be much faster to be worth having, and the quotation that ignores $s$ is the quotation you end up arguing about.**
:::
:::

::: exercise Derive the size scaling of tolerance {#ex-derive2 level=4 check="18"}
Show from $i = 0 . 4 5 \sqrt [ 3 ] { D } + 0 . 0 0 1 D$ that the *relative* tolerance $i / D$ falls as $D$ rises, and compute by what factor the relative tolerance at $1 0 \ \mathrm { m m }$ is looser than at $1 0 0 0 \ \mathrm { m m }$ .
::: solution
$i / D = 0 . 4 5 D ^ { - 2 / 3 } + 0 . 0 0 1$ , which is monotonically decreasing in $D$ and tends to $0 . 0 0 1$ — the linear term is a floor, and it is the machine-way and thermal term that eventually governs very large structures. At $D = 1 0$ , $i = 0 . 9 7 9 \ \mu \mathrm { m }$ and $i / D = 0 . 0 9 8 \ \mu \mathrm { m / m m }$ ; at $D = 1 0 0 0$ , $i = 5 . 5 0 \ \mu \mathrm { m }$ and $i / D = 0 . 0 0 5 5$ ; the ratio is **18**. **A $1 0 0 0 \ \mathrm { m m }$ frame at IT7 is eighteen times more precise in proportion than a $1 0 \ \mathrm { m m }$ pin at IT7, which sounds impossible until you remember what it costs: it means the whole $1 \ \mathrm { m }$ of structure, fixture, thermometer and probe is being held to a few waves of straightness, and that is why big precise parts are expensive per unit of tolerance rather than cheap.**
:::
:::

::: exercise Count the interfaces {#ex-dfa level=3 check="5.6"}
An assembly of fourteen parts and twenty-two fasteners takes eighteen minutes. A design-for-assembly revision leaves six parts and nine fasteners. Using 3 seconds per part handled and 35 seconds per fastener presented and driven, find the new unit assembly time. (Enter minutes, to one decimal place.)
::: solution
$6 \times 3 + 9 \times 35 = 3 3 3 \ \mathrm { s } = { \bf 5 . 6 \ m i n }$ , against 18. **The saving is not in the parts: it is in the eleven fasteners, each of which costs a presentation, a pick, a drive and a check, and in the eleven interfaces that no longer have to be aligned, torqued, sealed or tested.** **The single most reliable DFA move is to ask of every part: does it have to move against another part, be of a different material, or be separate for service? If no, it should be part of something else.**
:::
:::

::: quiz You have 300 a year of a 0.6 kg aluminium lever with two machined bosses {#quiz-lever}
The right first choice is
- [ ] High-pressure die casting, because aluminium die casting is cheap
- [x] Sand or investment casting, or machining from bar, because 300 a year cannot amortise a steel die-casting tool and the bosses need machining anyway
- [ ] Powder-bed fusion, because additive needs no tooling
- [ ] Forging, because forgings are strong
::: solution
**Die casting's £25,000-40,000 tool at 300 a year is £83-133 a piece of tooling alone, so the process the drawing "wants" is unaffordable at the quantity; and the bosses must be machined to IT8 whatever the process, so the machining is not avoided.** **Forging needs a die too, and 300 a year of a lever this size is below its break-even as well. Additive needs no tooling but costs an order of magnitude more per piece than either. The honest answer at 300 a year is a cheap pattern, a sand or investment casting, and a machining fixture — or no casting at all.**
:::
:::

::: quiz A drawing says ±0.01 mm on a non-fit dimension {#quiz-tol}
The first thing to do is
- [ ] Quote the process that holds it
- [ ] Buy a better machine
- [x] Ask what the dimension does, and what fails if it is ±0.1 mm
- [ ] Add a note that it is not critical
::: solution
**A tolerance must be traceable to a function. If nothing fails at $\pm 0 . 1 \ \mathrm { m m }$ , the $\pm 0 . 0 1$ note is costing a factor of four in the feature, a fixture, a gauge, an inspection frequency and a scrap rate, for a reason that will turn out to be a habit.** **"Add a note that it is not critical" makes it worse, because now the drawing contains two contradictory instructions; the fix is to change the tolerance, initial the revision, and say why.**
:::
:::

## Where this lesson leads

- **[[manufacturing/casting|Casting]]** takes the solidification family apart: solidification shrinkage, the feeding of a riser, Chvorinov's rule for the freezing time, and why the gating must fill the mould turbulently-free and freeze from the far end back.
- **[[manufacturing/bulk-forming|Bulk deformation]]** and **[[manufacturing/sheet-metal-forming|Sheet-metal forming]]** give the forming families their mechanics: the flow stress and the press force, the extrusion and drawing stresses, and the forming-limit diagram that says how far a sheet may stretch before it necks.
- **[[manufacturing/machining|Machining]]** is the material-removal family in numbers: shear-plane mechanics, the cutting force and power, Taylor's tool-life exponent, and the surface speed at which a carbide insert survives twelve minutes instead of two hundred.
- **[[manufacturing/joining|Joining]]** covers what happens at the interface — the HAZ microstructure of a weld, the heat input that controls it, the strength of a bonded joint and the preload of a bolted one.
- **[[manufacturing/polymer-composite-processing|Polymer and composite processing]]** and **[[manufacturing/additive-manufacturing|Additive manufacturing]]** are the two families whose economics are still moving, and whose design rules are the ones most often ignored.
- **[[manufacturing/metrology-quality|Metrology, quality and automation]]** supplies the other half of every number in this lesson: what the process is actually capable of, measured, as $C _ { p }$ and $C _ { p k }$ , and how a tolerance stack is verified rather than assumed.
- **[[design-process/design-for-manufacture|Design for manufacture]]** is the discipline of writing the drawing so that the process can hold it, and **[[engineering-graphics/tolerances-fits|Tolerances and fits]]** and **[[engineering-graphics/geometric-tolerancing|Geometric tolerancing]]** are the language it is written in.

::: history
**1785.** Marc Isambard Brunel begins the mechanisation of making: his block-making machinery for the Portsmouth block mills, installed with Henry Maudslay's machine tools, is the first production system in which the machine, not the shipwright, holds the accuracy — thirty-two machines making a ship's pulley block to an interchangeability that hand-fitting had never reached, and the reason the word *precision* came to mean a property of a machine rather than of a man. **1798.** Eli Whitney's contract for 10,000 muskets popularises — more in the myth than in the achievement, since the American armory system of Springfield and Harpers Ferry did the real work by 1820 — the idea that parts are made to a template and fitted without filing, and with it the whole economics of tooling and gauging in §4: an interchangeable part is one whose tolerance has been *measured*, which is why this lesson and [[manufacturing/metrology-quality]] are one subject. **1913.** Henry Ford's Highland Park line takes the last step, moving the work to the man at a rate set by the factory rather than the man, cutting the Model T assembly time from 12.5 hours to 1.5 and making the annual quantity — the fourth question of §2 — the fact that dictated the design of the car, the part and the process for the next century. **1950s.** Genichi Taguchi's statistical design of experiments and his quality-loss function put a price on variation rather than on scrap alone, and the Japanese automotive and electronics industries' adoption of it made process capability, not inspection, the place where quality was bought. **1980s.** Boothroyd and Dewhurst's design-for-assembly work at the University of Massachusetts turns the part count of an assembly into a calculable cost, in the unit-assembly method used in §6, and DFA becomes a spreadsheet rather than an opinion. **1986.** Chuck Hull's stereolithography patent begins additive manufacturing, sold for twenty years as a prototyping tool, and only in the 2010s — with powder-bed fusion of titanium and nickel alloys at production rates — arriving at the argument in §5, where it competes on geometry rather than on price.
:::

::: summary
**Five operations, not fifty.** Solidification, bulk deformation, sheet forming, material removal, additive — plus joining and the property-changing processes that do not make shape. The state of the material when the shape is imposed sets the tolerance, the rate, the tooling and the part size, and therefore sets the cost.
**Four questions, in order.** Material, shape class, tolerance and finish, quantity — and then the shop rate of the machine you own. Ask them in another order and you will choose a process the alloy refuses or a tolerance the process cannot hold.
**Tolerance is a price.** $i = 0 . 4 5 \sqrt [ 3 ] { D } + 0 . 0 0 1 D$ , $\mathrm { I T } 7 = 1 6 i$ , and cost doubling every two grades below IT11: IT5 costs eight times IT11 and is a different process, not a better one. Every tolerance must be traceable to a function, and a stack may be allocated statistically at a factor of $\sqrt { n }$ per feature — bought with process control, not with optimism.
**Quantity decides everything else.** $c ( N ) = m + w + T / N + ( f + q ) / ( 1 - s )$ and $N ^ { * } = \Delta T _ { \mathrm { t o o l } } / \Delta c$ ; the break-even is one line of arithmetic, it is brutally sensitive to the saving per piece and to the scrap rate, and it must be taken against the lifetime quantity. Below the break-even, tooling is a mistake however good the process; above it, machining is a mistake however good the machinist.
**Material in, material out.** Buy-to-fly from 1.05 for a cold-finished bolt to 10 for a machined titanium bracket; embodied energy of 20 to 500 MJ per kilogram thrown away as chip; and machine time that goes with the volume removed, not with the volume sold. The cheapest part is the one from which the least has been taken away.
**The rules are physics in disguise.** Draft, radii, constant section, hole depth, tool access, one datum, one setup, few interfaces — each one is a mould, a cutter, a press or a hand, and breaking one does not save the rule, it buys a core, a slide, a second setup or a rejection.
:::

## Further reading

- M. P. F. Greulich, G. Boothroyd, P. Dewhurst and W. A. Knight, *Product Design for Manufacture and Assembly*, CRC Press — the unit-assembly method of §6 worked through real products.
- A. C. Müller and M. K. Zwicker (eds.), *Cost-Effective Manufacture of Mechanical Products*, Springer — break-even analysis, tooling amortisation and the process capability tables of §3.
- H. A. Kuhn and the VDI, *Expert System for Process Selection (PROST)* and the VDI Handbook *Product Engineering*, Springer — the screening-and-ranking method of §7 as a documented procedure.
- S. Kalpakjian and S. R. Schmid, *Manufacturing Engineering and Technology*, Pearson — the process-by-process detail behind every table in this lesson.
- M. Ashby and K. Johnson, *Cambridge Engineering Selector* and *Materials Selection in Mechanical Design*, Butterworth-Heinemann — the charts, and the honest way to read them.
