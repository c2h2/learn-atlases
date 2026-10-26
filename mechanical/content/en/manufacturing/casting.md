A cylinder block, an engine bed, a machine tool column, a windmill hub, a turbine blade with cooling passages inside it, and the counterweight of a lift are all made the same way: **the metal is melted, poured into a negative of the part, and allowed to freeze.** Nothing else in this course can do that. Forming needs a material that will flow plastically, and cast iron will not; machining needs a tool that can reach, and half of a cylinder block is unreachable; additive needs a layer at a time, and a forty-tonne hub takes a year. Casting has been practised for some six thousand years, and it is still the only one that makes **hollow, complex, heavy things in brittle materials**, which is a large fraction of everything the modern world is built on.

But it is the hardest process to control, because everything happens inside a closed box of sand at fifteen hundred degrees, in ninety seconds, and the evidence of what went wrong arrives when the sand is broken out. This lesson is about the three things you can actually control: **how the metal freezes** (nucleation, grain growth, shrinkage, Chvorinov's rule), **how it gets in** (gating, fluidity, turbulence), and **how the mould is made** (sand, shell, investment, permanent mould, die). Get those three right and the casting is sound; get any one of them wrong and you will find the defect in the customer's product.

::: warning Five ways castings fail
**The riser that freezes first.** A riser is a reservoir of liquid metal whose only job is to feed the last cubic millimetre of the casting as it shrinks on freezing. If it freezes before the casting does, it is not a riser, it is an expensive lump of scrap metal bolted to a shrinkage cavity. **The rule is that the riser must freeze last, always**, and it is enforced by geometry — the riser needs a bigger volume-to-area ratio than the thing it feeds — or by a chill, or by exothermic insulation, and it is checked by Chvorinov's rule in §2, not by eye. **Designing a section you cannot feed.** A $2 4 ~ \mathrm { m m }$ thick pad on an $8 \ \mathrm { m m }$ wall freezes about nine times later than the wall, because freezing time goes as the square of the modulus; it is a hot spot, and a hot spot in an alloy with a freezing range is shrinkage porosity exactly where the part is loaded. **Pouring turbulently.** Molten metal in a gate runs at a Reynolds number of seventy thousand, which is turbulent by a factor of thirty, and turbulence in a mould does not mix gently — it washes sand off the mould wall, entraps the oxide skin, and pumps air down the sprue. Every gating rule (sprue full, gates wide and flat, no sudden drops, no sharp corners, a filter at the end) is a turbulence rule. **Pouring too cold, or too hot.** Too cold and the metal freezes in the runner — a misrun — or meets itself as a cold shut that never welds. Too hot and it reacts with the mould, dissolves more gas, shrinks more and sticks to the sand. The window is often only a few tens of kelvin wide, and widening it on the shop floor is the beginning of a defect history. **Casting the drawing instead of the casting.** A drawing with no draft, no radii, a parting line through a machined face, a cored hole too small to make a core of, and no shrink allowance, is not a casting drawing. The pattern shop will make it anyway, the foundry will pour it anyway, and the parts will arrive out of tolerance, scuffed, and with the machined face showing the parting line.
:::

## 1. Why cast anything

::: definition What casting is for {#def-why}
$$
\begin{array} { l l l l l l }
\textbf{Process} & \textbf{Min wall} & \textbf{Tolerance} & R _ { a } \ [ \mu \mathrm { m } ] & \textbf{Mass range} & \textbf{Tooling} \\ \hline
\text{Sand, green-bonded} & 6 \ \mathrm { m m } & \pm 1 \text{ to } \pm 3 \ \mathrm { m m } / 1 0 0 \ \mathrm { m m } & 1 2 { - } 2 5 & 0 . 5 \mathrm { kg - } 1 0 0 \ \mathrm { t } & \text{pattern } \pounds 2 { - } 2 0 \mathrm { k } \\
\text{Sand, chemical (no-bake)} & 5 \ \mathrm { m m } & \pm 0 . 8 \text{ to } \pm 2 \ \mathrm { m m } & 1 2 { - } 2 0 & 1 0 \ \mathrm { kg - } 1 0 0 \ \mathrm { t } & \text{pattern } \pounds 5 { - } 2 5 \mathrm { k } \\
\text{Shell moulding} & 4 \ \mathrm { m m } & \pm 0 . 3 \text{ to } \pm 0 . 8 \ \mathrm { m m } & 6 { - } 1 2 & < 5 0 \ \mathrm { k g } & \text{metal pattern } \pounds 1 0 { - } 4 0 \mathrm { k } \\
\text{Investment (lost wax)} & 2 . 5 \ \mathrm { m m } & \pm 0 . 1 \text{ to } \pm 0 . 3 \ \mathrm { m m } & 3 { - } 6 & 5 \ \mathrm { g } \mathrm { - } 5 0 \ \mathrm { k g } & \text{wax die } \pounds 5 { - } 6 0 \mathrm { k } \\
\text{Permanent mould (gravity)} & 3 \ \mathrm { m m } & \pm 0 . 3 \text{ to } \pm 0 . 6 \ \mathrm { m m } & 3 { - } 6 & 0 . 2 { - } 2 0 \ \mathrm { k g } & \text{steel die } \pounds 1 5 { - } 8 0 \mathrm { k } \\
\text{High-pressure die casting} & 0 . 6 \ \mathrm { m m } & \pm 0 . 0 5 \text{ to } \pm 0 . 2 \ \mathrm { m m } & 1 . 6 { - } 3 . 2 & 5 \ \mathrm { g } \mathrm { - } 2 0 \ \mathrm { k g } & \text{steel die } \pounds 2 0 { - } 1 5 0 \mathrm { k } \\
\text{Low-pressure die casting} & 2 \ \mathrm { m m } & \pm 0 . 3 \ \mathrm { m m } & 3 & 1 { - } 3 0 \ \mathrm { k g } & \text{steel die } \pounds 2 0 { - } 6 0 \mathrm { k } \\
\text{Centrifugal (true)} & 3 \ \mathrm { m m } & \text{bores only} & 6 & \text{axisymmetric} & \text{metal mould} \\
\text{Continuous (bar, tube)} & \text{section} & \pm 1 \ \mathrm { m m } & 1 2 & \text{long lengths} & \text{water-cooled die} \\
\text{Squeeze casting} & 3 \ \mathrm { m m } & \pm 0 . 2 \ \mathrm { m m } & 1 . 6 & < 2 0 \ \mathrm { k g } & \text{steel die, slow} \\
\text{Lost-foam} & 4 \ \mathrm { m m } & \pm 1 \ \mathrm { m m } & 1 2 & \text{complex, no cores} & \text{pattern } \pounds 1 0 \mathrm { k } / \text{foam free}
\end{array}
$$

Casting wins on four counts and loses on two. **It wins on shape** — it is the only process that makes an internal passage without a tool being able to reach it, and the only one that makes a hollow body in one piece. **It wins on material** — anything meltable can be cast, including every alloy too brittle to form and every alloy whose melting point defeats a die. **It wins on size**, from a five-gram dental crown to a four-hundred-tonne press bed. **It wins on rate at low tooling**, because a sand mould needs a pattern, not a die. **It loses on solidification shrinkage**, which is why §2 exists, and **it loses on as-cast properties**: porosity, coarse dendrites and a segregated structure mean a casting typically has a clearly lower fatigue strength than the same alloy forged, and a critical cast part is hot isostatically pressed, inspected to a tighter grade, or forged instead.
:::

::: example Four parts, four processes {#ex-four level=3}
**A $1 2 \ \mathrm { k g }$ grey iron oil pan, 4 mm walls, an integral sump and a machined flange, 200,000 a year.** Green-sand moulding on an automatic moulding line, two cavities per mould, metal poured through a filter into a flat gating system, shakeout after eight minutes. Not die casting: iron at $1 { , } 4 5 0 \ \ {} ^ { \circ } \mathrm { C }$ would erode and heat-check a steel die within a short run, which is why the die-casting alloys are zinc, aluminium, magnesium and (small) brass, and nothing structural.

**A $9 0 \ \mathrm { g }$ nickel-superalloy turbine blade with eleven internal impingement-cooling passages, single crystal, 40,000 a year.** Investment casting on a ceramic shell, with the passages formed by **ceramic cores** fired into the shell, a grain-selecting spiral starter and a chill plate at the root to force one crystal to win, and a vacuum pour. Nothing else makes a cooled single-crystal hollow blade; nothing else makes its cooling passages at all. See [[materials-science/phase-transformations]] for why the $\gamma ^ { \prime }$ alloy has to be cast and [[propulsion/turbines]] for why it has to be cooled.

**A $0 . 2 5 \ \mathrm { k g }$ zinc door lever with an integral boss and a $1 . 6 \ \mathrm { m m }$ wall, 400,000 a year.** Hot-chamber high-pressure die casting, a cavity fill of a few tens of milliseconds, several hundred shots an hour off one £45,000 steel die, as-cast surface good enough to chrome-plate without filling. Zinc at $4 2 0 \ \ {} ^ { \circ } \mathrm { C }$ is the die caster's friend: low pour temperature, no die soldering, no erosion, and a die that lives a million shots.

**A $2 . 4 \ \mathrm { t }$ ductile iron windmill hub with a tapered bore and forty bolt bosses, 900 a year.** No-bake (chemical) sand, one mould per pattern set per day from several pattern sets, a pour of about three tonnes from a holding furnace, three exothermic top risers and fourteen chills, and a heat-treat cycle afterwards for the ferritic matrix. At 900 a year and 2.4 tonnes, tooling is a rounding error and the entire cost is metal, mould-making labour and the risk.

Four parts, four processes, and the choice in every case was made by **melting point, quantity, section and the shape no other process can make** — in that order.
:::

## 2. How a casting freezes

::: definition Nucleation, grains and the cooling rate {#def-nucleation}
A liquid does not become solid just because it is below its freezing point. Making a new solid surface costs energy — the interfacial energy $\gamma$ — and the volume free energy gained is proportional to the undercooling $\Delta T$ , so a solid embryo of radius $r$ changes the free energy by

$$
\Delta G \; = \; { \frac { 4 } { 3 } } \pi r ^ { 3 } \Delta G _ { v } \; + \; 4 \pi r ^ { 2 } \gamma \qquad \Longrightarrow \qquad r ^ { * } \; = \; - \, { \frac { 2 \gamma } { \Delta G _ { v } } } \; \approx \; { \frac { 2 \gamma T _ { m } } { \Delta H _ { f } \, \Delta T } }
$$

Embryos smaller than $r ^ { * }$ redissolve; the liquid must undercool until a stable nucleus can exist, and $r ^ { * }$ is inversely proportional to $\Delta T$ . **This is why a clean liquid metal, kept away from walls and particles, can be undercooled by hundreds of kelvin (Turnbull's droplet experiments of 1950 took iron about $3 0 0 \ \mathrm { K }$ below its melting point), why a real casting, which nucleates on the mould wall and on particles, starts to freeze within a few kelvin, and why inoculation works**: an added nucleant — Ti–B master alloy in aluminium, a ferrosilicon-based inoculant in cast iron — provides surfaces of radius already larger than $r ^ { * }$ , so nucleation happens at small undercooling and the number of grains rises sharply. The secondary dendrite arm spacing (and, roughly, the grain size) follows the cooling rate as $d \propto { \dot { T } } ^ { - 1 / 3 }$ , which is the reason a chilled casting is strong and a thick one is weak, and the whole reason a foundryman says *the section you are looking at is the structure you got*.

Solidification then proceeds by **dendrites**: a planar interface is unstable the moment the liquid ahead of it is undercooled by more than the interface can shed, so the front breaks into fingers that grow, branch and fill in. Between the branch arms is the last liquid to freeze, and in it sits all the carbon, sulphur, phosphorus and eutectic former the solid rejected — **coring**, the microscopic segregation that a homogenising anneal removes and a casting does not have time for. Whether the front stays **columnar** (growing away from the chill face, one grain direction, anisotropic) or breaks up into **equiaxed** grains depends on the ratio of the temperature gradient $G$ to the growth rate $R$: columnar growth is stable when $G / R$ is high, and the alloy with a wide freezing range, a low gradient and nucleant particles goes equiaxed — which is what a foundry wants, because columnar dendrites are a texture and a texture is an anisotropy.
:::

::: widget plot
title: Grain size against cooling rate — why a thin casting is a strong casting
f: 5/pow(x,1/3)
x: 0.01,100
y: 0,25
labels: secondary dendrite arm spacing or grain size, mm (d ∝ Ṫ^-1/3)
caption: Grain and secondary-dendrite-arm size against cooling rate, on the empirical one-third power law, normalised to $5 \ \mathrm { m m }$ at $1 \ \mathrm { K / s }$ . The cooling rate in a sand mould is a fraction of a kelvin per second; in a metal mould it is ten to a hundred; at a chill face it is a thousand. The grain size therefore changes by an order of magnitude between the skin of a casting and its middle, and with it the yield strength (a factor of $\sqrt { d }$ in the Hall–Petch sense, so refining the grain of a mild steel from 5 to $0 . 5 \ \mathrm { m m }$ is worth about $2 0 \ \mathrm { M P a }$ , and much less in aluminium, whose Hall–Petch coefficient is far smaller), the fatigue strength, and the pressure tightness. **This curve is why a casting's mechanical properties are quoted for a test bar cast with the casting and not from the handbook, and why a thick section is designed with a lower allowable stress than a thin one from the same alloy.**
:::

::: definition Shrinkage: the defect you cannot design out, only feed {#def-shrinkage}
For most metals the liquid is less dense than the solid, so a casting shrinks in three stages: the **liquid** contracts as it cools from the pouring temperature to the liquidus (made up from the gating and risers, harmlessly), the **solidifying** metal contracts by the liquid-to-solid density difference — **this is the one that makes cavities** — and the **solid** contracts on cooling to room temperature, which is the shrinkage the pattern maker is paid for.

$$
\begin{array} { l c c l }
\textbf{Alloy} & \textbf{Solidification shrinkage (vol.)} & \textbf{Pattern shrinkage (linear)} & \textbf{Freezing character} \\ \hline
\text{Grey cast iron} & \text{up to } 2 . 5 \ \% \text{ expansion} & 1 . 0 \ \% & \text{graphite expansion offsets the shrinkage} \\
\text{White cast iron} & 4 { - } 5 . 5 \ \% & 2 . 0 \ \% & \text{no graphite, so no expansion} \\
\text{Al--12 \% Si} & 3 . 8 \ \% & 1 . 3 \ \% & \text{eutectic, good feedability} \\
\text{Al--4.5 \% Cu} & 6 . 3 \ \% & 1 . 3 \ \% & \text{wide freezing range, feeds badly} \\
\text{Carbon steel} & 2 . 5 { - } 3 \ \% & 2 . 1 \ \% & \text{high pouring temperature, needs large risers} \\
\text{70/30 brass} & 4 . 5 \ \% & 1 . 6 \ \% & \text{narrow range; tin bronzes are pasty over a wide range} \\
\text{Magnesium} & 4 . 2 \ \% & 1 . 3 \ \% & \text{light, but the melt must be protected from burning}
\end{array}
$$

Volumetric solidification shrinkage is from Kalpakjian and Schmid's table; the linear pattern shrinkages are the traditional pattern-maker's allowances, and a real casting's contraction also depends on how much the mould restrains it. Two facts organise the whole of riser design. **Grey iron is nearly non-shrinking**, because the graphite that precipitates in the eutectic is much less dense than the iron and its growth offsets what the austenite shrinks — which is why grey iron castings can be made sound with a fraction of the feeding a steel casting of the same shape needs, provided the mould is rigid enough not to be pushed back by the expansion. **And an alloy with a wide freezing range does not leave a single cavity to feed; it freezes as a mush of dendrite arms with liquid trapped in isolated pools between them, so no riser can reach it and what you get instead is fine, distributed **shrinkage microporosity** — which is why near-eutectic alloys (Al-Si with 11-13 % Si, grey iron) are the foundry's favourites and why a wide-freezing-range aluminium like 6061 is a terrible sand casting and a good extrusion.**
:::

::: proof Chvorinov's rule: why freezing time goes as the square of the modulus {#proof-chvorinov}
Treat the mould as a semi-infinite solid initially at $T _ { 0 }$ whose face is brought to the interface temperature $T _ { i }$ at $t = 0$ . The heat flux into the mould decays as

$$
q ^ { \prime \prime } ( t ) \; = \; { \frac { k _ { m } ( T _ { i } - T _ { 0 } ) } { \sqrt { \pi \alpha _ { m } t } } } \; = \; { \frac { b _ { m } ( T _ { i } - T _ { 0 } ) } { \sqrt { \pi t } } } , \qquad b _ { m } = { \sqrt { k \rho c _ { p } } } \ \ {\text{the thermal effusivity} }
$$

and the energy per unit area absorbed up to time $t$ is the integral of that,

$$
Q ^ { \prime \prime } ( t ) \; = \; \int _ { 0 } ^ { t } q ^ { \prime \prime } \, d t \; = \; 2 \, b _ { m } ( T _ { i } - T _ { 0 } ) \, { \sqrt { \frac { t } { \pi } } }
$$

Now say the casting is finished freezing when the mould has absorbed the latent heat, $\rho L V = A Q ^ { \prime \prime }$ . Solving,

$$
t \; = \; \pi \left[ { \frac { \rho L } { 2 \, b _ { m } ( T _ { i } - T _ { 0 } ) } } \right] ^ { 2 } \left( { \frac { V } { A } } \right) ^ { 2 } \; \equiv \; B \, M ^ { 2 } \qquad \text{with } M = V / A
$$

**Chvorinov's rule, with the constant derived rather than fitted.** For grey iron ($\rho = 7 { , } 0 0 0 \ \mathrm { k g / m ^ { 3 } }$ , $L = 2 4 0 \ \mathrm { k J / k g } )$ into silica sand ($b _ { m } \approx 1 { , } 0 0 0 \ \mathrm { J \, m ^ { - 2 } K ^ { - 1 } s ^ { - 1 / 2 } }$ from $k \approx 0 . 6 \ \mathrm { W / ( m \, K ) }$ , $\rho \approx 1 { , } 6 0 0 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } \approx 1 . 1 \ \mathrm { k J / ( k g \, K ) }$ ; $T _ { i } - T _ { 0 } \approx 1 { , } 1 7 5 \ \mathrm { K }$ ) it gives $B \approx 1 . 6 \ \mathrm { s / m m ^ { 2 } }$ , against the $2 . 4 \ \mathrm { s / m m ^ { 2 } }$ measured by calibration in the next example — the same order, and the shortfall is mostly the superheat and the sensible heat of the cooling casting, which the derivation ignored and which the mould must also absorb, together with sand properties that change with temperature and moisture. **That is why the rule is used with a fitted $B$ and never with the derived one; the exponent of two is the physics and the constant is the foundry.**
:::

::: example Calibrate the mould, then predict the casting {#ex-chvorinov level=3 check="9.1"}
A $2 5 \ \mathrm { m m }$ square test bar of grey iron, long enough to ignore its ends, freezes in $9 5 \ \mathrm { s }$ in a given green-sand mould. Find the freezing time of a $6 0 \ \mathrm { m m }$ square bar in the same mould. (Enter minutes, to one decimal place.)

For a long square bar of side $a$ , $M = V / A = a ^ { 2 } / 4 a = a / 4$ , so

$$
B \; = \; { \frac { t } { M ^ { 2 } } } \; = \; { \frac { 9 5 } { 6 . 2 5 ^ { 2 } } } \; = \; 2 . 4 3 \ \mathrm { s / m m ^ { 2 } }
 \qquad \Longrightarrow \qquad
t ( 6 0 ) \; = \; 2 . 4 3 \times 1 5 ^ { 2 } \; = \; 5 4 7 \ \mathrm { s } \; = \; { \bf 9 . 1 \ m i n }
$$

**The whole answer is in the ratio: $( 6 0 / 2 5 ) ^ { 2 } = 5 . 8$ , so a bar 2.4 times thicker takes 5.8 times as long to freeze.** Read that as a design warning. A boss twice as thick as its wall freezes four times later; three times as thick, nine times later; and any part of the casting that freezes later than its neighbours is, by definition, a hot spot that must be fed or eliminated. The $B$ of a real mould also changes with everything: it is lower in a metal mould, which extracts heat faster, and the effective value is higher where sand is surrounded by metal (a small core heats up quickly and stops extracting heat, which is why the metal round a cored hole freezes late). Foundries keep a chart of $B$ by alloy and mould type and re-measure it whenever the sand is changed.
:::

::: widget plot
title: The hot spot: freezing time against section thickness
f: x^2
x: 0.5,4
y: 0,16
labels: t_section / t_wall = (section thickness / wall thickness)²
caption: Freezing time against the thickness of a plate-like section, normalised to the wall it hangs on (same shape, so the modulus scales with the thickness). The curve is Chvorinov's square and it is the most-reasoned-about and least-obeyed fact in casting design: **a pad three times the wall thickness freezes nine times later**, and the shrinkage cavity it needs will sit inside the boss, under the machined face, exactly where the bolt preload goes. The design fixes are all free and all in the drawing — make the boss no thicker than $1 . 5 \times$ the wall, taper it into the wall over at least six times the step so there is no sudden change of modulus, and if it must be thick, chill it or feed it — coring it out helps only if the ring of metal left round the core is thin, because a small core soon heats through and stops extracting heat; often the better answer is to move the material out of the boss and into a rib.
:::

## 3. Getting the metal in: gating, fluidity and turbulence

::: definition The gating system, and the rules it exists to break {#def-gating}
The **gating system** is the plumbing between the ladle and the cavity: **sprue** (the vertical downrunner), **well or sprue base** (a bucket that kills the fall's energy), **runners** (horizontal channels that distribute), **gates** (the last, narrowest restriction, which controls the fill rate), **risers** (feeding, never gating), and **vents and filters**. Its job is to fill the cavity **in a given time, without turbulence, without entrapping slag or air, and without freezing before it is full** — and the four requirements conflict.

The flow is gravity-fed, so the velocity at a gate under a head $h$ is Bernoulli's, reduced by a discharge coefficient,

$$
v \; = \; C _ { d } { \sqrt { 2 g h } } \qquad \Longrightarrow \qquad A _ { \text{gate } } \; = \; { \frac { V _ { \text{casting } } } { t _ { \text{fill } } \, C _ { d } { \sqrt { 2 g h } } } }
$$

with $C _ { d } \approx 0 . 7$ for a practical gate. And the Reynolds number in that gate is $1 0 ^ { 4 } { - } 1 0 ^ { 5 }$ — **turbulent by thirty times** — because molten metal is dense and thin: grey iron at pouring temperature has a kinematic viscosity of about $7 \times 1 0 ^ { - 7 } \ \mathrm { m } ^ { 2 } / \mathrm { s }$ , a little less than water's at room temperature ($1 . 0 \times 1 0 ^ { - 6 }$ ). Turbulence in a mould is not a mixing inconvenience; it washes sand off the walls (inclusions), folds the oxide skin into the surface (slag lines, which are crack starters in a fatigue part), and — worst of all — makes the sprue **aspirate**, sucking air down the falling jet and into the cavity. Hence the three rules that override every other gating rule: **the sprue must run full** (its area must shrink as the metal accelerates, see the derivation below), **the ingates should be wide and thin rather than round** (a thin gate is easy to break off, freezes soon after the pour so it does not draw feed metal from the casting, and spreads the stream rather than firing it as a jet), and **the metal must enter the cavity slowly — below about $0 . 5 \ \mathrm { m / s }$ , the critical ingate velocity Campbell gives for most liquid metals, above which the free surface breaks up and folds in its oxide** — and never straight at a core.

**Fluidity** — how far metal runs before it freezes — is measured on a spiral test and is governed mainly by the **superheat above the liquidus** and by the freezing range: a eutectic alloy that freezes at one temperature runs a long way, while a wide-freezing-range alloy turns to paste after a short run. The spiral length rises roughly in proportion to the superheat, which is why "hotter metal" is the first answer to a misrun — and the beginning of a sticky, gassy, shrunk-down second answer.
:::

::: example Gate area for a 20 kg iron casting {#ex-gate level=3 check="4.8"}
A $2 0 ~ \mathrm { k g }$ grey iron casting is to be filled in $3 \ \mathrm { s }$ under a $4 0 0 \ \mathrm { m m }$ head of metal above the gates. $C _ { d } = 0 . 7$ . Find the controlling (choke) area. (Enter cm², to one decimal place.)

$$
V = { \frac { 2 0 \ \mathrm { k g } } { 7 . 1 \ \mathrm { g / c m ^ { 3 } } } } = 2 { , } 8 1 7 \ \mathrm { c m ^ { 3 } } , \qquad v = 0 . 7 { \sqrt { 2 \times 9 . 8 1 \times 0 . 4 0 0 } } = 1 . 9 6 \ \mathrm { m / s }
$$
$$
A \; = \; { \frac { 2 \, 8 1 7 \ \mathrm { c m ^ { 3 } } } { 3 \ \mathrm { s } \times 1 9 6 \ \mathrm { c m / s } } } \; = \; { \bf 4 . 8 \ c m ^ { 2 } }
$$

Split that over two gates of $4 0 \times 6 \ \mathrm { m m }$ rather than one, and check the flow regime: the hydraulic diameter of a $4 0 \times 6$ gate is $4 \times 2 4 0 / 9 2 = 1 0 . 4 \ \mathrm { m m }$ , so $\mathrm { R e } = 1 . 9 6 \times 0 . 0 1 0 4 / 7 \times 1 0 ^ { - 7 } = 2 9 { , } 0 0 0$ — **still turbulent**, as it always is. The gate area is therefore not chosen for laminar flow, which is impossible; and the jet speed matters more than the Reynolds number. At $1 . 9 6 \ \mathrm { m / s}$ the metal enters four times faster than the critical $0 . 5 \ \mathrm { m / s}$ , so modern practice puts this $4 . 8 \ \mathrm { c m ^ { 2 } }$ choke at the base of the sprue and makes the runner and ingates about four times larger, so that the metal slows down before it enters the cavity, with a ceramic foam or cellular filter in the runner to catch what the turbulence made anyway.
:::

::: proof The sprue must narrow as it falls {#proof-sprue}
Metal falling freely from the top of a sprue of height $H$ has, at a depth $z$ , the velocity $v ( z ) = { \sqrt { 2 g z } }$ and at the bottom $v _ { 3 } = { \sqrt { 2 g H } }$ . Mass conservation in a stream with no walls to hold it requires $A ( z ) v ( z ) = A _ { 3 } v _ { 3 }$ , so

$$
A ( z ) \; = \; A _ { 3 } \, { \frac { v _ { 3 } } { v ( z ) } } \; = \; A _ { 3 } \, { \sqrt { \frac { H } { z } } }
$$

A sprue of **constant** area therefore cannot run full: the metal accelerates away from the walls, the pressure in it falls below atmospheric, and the gap draws air and slag down from the top — the sprue becomes an aspirating nozzle and the casting is full of gas and inclusions. The figure shows the required taper: at $z = H$ the area is $A _ { 3 }$ , at $z = H / 4$ it is $2 A _ { 3 }$ , at $z = H / 9$ it is $3 A _ { 3 }$ , and it diverges at the top, which is why a real sprue is fed from a pouring basin: with metal standing a depth $h _ { b }$ in the basin, the top of the sprue is at $z = h _ { b }$ and the taper is finite, $A _ { \text{top} } / A _ { 3 } = \sqrt { ( h _ { b } + H _ { s } ) / h _ { b } }$ for a sprue of height $H _ { s }$ — three, for a $5 0 \ \mathrm { m m }$ basin over a $4 0 0 \ \mathrm { m m }$ sprue. The sprue then ends in a well where the fall's energy is dissipated.

**This is the origin of the traditional gating ratios** (sprue base : runner : ingates), which say where the smallest restriction, the **choke**, is. In a **pressurised** system such as $1 : 0 . 7 5 : 0 . 5$ , common for iron, the ingates are the choke: the system runs full and holds back slag, but the metal leaves the ingates fast. In an **unpressurised** system such as $1 : 2 : 2$ to $1 : 4 : 4$ , common for aluminium and magnesium, the choke is at the sprue base and the metal slows down as it spreads into the larger runner and ingates — provided the runner is designed so that it still fills. Either way the choke must be a deliberate choice; put it in the wrong place and the sprue runs part-full and aspirates.
:::

::: widget plot
title: The sprue taper that keeps the sprue full
f: 1/sqrt(x)
x: 0.05,1
y: 1,4.5
labels: A(z)/A_bottom = sqrt(H/z)
caption: The area a falling sprue must have at a depth fraction $z / H$ if the metal stream is to stay in contact with the walls. It diverges at the top — which is impossible to build and unnecessary, because the metal arrives from a pouring basin with some velocity already — so a real sprue starts lower on this curve: with the basin depth one-ninth of the total fall the top of the sprue sits at $z / H = 1 / 9$ , where the required area is three times the bottom area, and the sprue is made as a tapered cone into a well. **A straight-sided sprue is an air pump.** This single curve explains more foundry defects than any other figure in the subject: gas porosity, slag lines, and a "mystery" inclusion in the last part of the casting to freeze.
:::

## 4. Making the mould

::: definition Sand, shell, shell of wax {#def-moulds}
**Green sand** is 90 % silica or chromite sand bonded with 5-11 % bentonite clay and 2-5 % water, with a little sea coal to give surface finish and to burn off a carbon film that stops penetration. "Green" means unfired. It is rammed around a pattern in a flask, the pattern is withdrawn, the mould is closed, and it is poured within minutes. It costs little, makes a mould in seconds on a modern automatic line, takes a part of any size, and gives $\pm 1 . 5 \ \mathrm { m m }$ on $1 0 0 \ \mathrm { m m }$ and an $R _ { a }$ of twenty. Its weaknesses are the ones you would predict: the mould is relatively weak, so thin deep pockets and tall sections are hard; it contains water, which turns to steam at the metal face and is a source of hydrogen and gas defects, so the moisture is controlled tightly (green sand is still widely used for aluminium and copper alloys as well as iron); and the pattern wears.

**Chemical (no-bake) bonding** coats the sand with a resin and a catalyst that cure at room temperature — sodium silicate with $\mathrm { C O _ { 2 } }$ , furan-phenolic with an acid, or urethane. The mould is hard, dimensionally stable, free of water, and makes a $1 \ \mathrm { m }$ ductile iron casting to $\pm 0 . 8 \ \mathrm { m m }$ . It is slower and dearer per mould, which is why it is used for medium and heavy jobbing work rather than for car engine blocks.

**Shell moulding** blows resin-coated sand onto a heated metal pattern; the sand next to the pattern cures into a $5 { - } 1 5 \ \mathrm { m m }$ hard shell and the rest falls out. Two shells are glued and poured in a flask of sand. The surface is excellent ($R _ { a } \ 6$ , tolerance $\pm 0 . 5 \ \mathrm { m m } )$ , the mould is rigid and thin, and the cores come off easily — this is how camshafts, connecting rods, hydraulic manifolds and small gearboxes are made at 50,000-500,000 a year.

**Investment casting** builds a ceramic shell by dipping a cluster of wax patterns (or 3D-printed patterns) into a silica slurry, stuccoing it, drying it and repeating five to eight times, then melting the wax out (**autoclaving, not burning, so the shell is not cracked**), firing the shell to $1 { , } 0 0 0 \ \ {} ^ { \circ } \mathrm { C }$ and pouring. There is no parting line, so there is no flash and no draft requirement; the surface is the ceramic's, which is $R _ { a } \ 3$ ; the tolerance is $\pm 0 . 1 \ \mathrm { m m }$ on $2 5 \ \mathrm { m m }$ ; and the alloy can be anything meltable, including the nickel superalloys and titanium that no other process will tolerate. The cost is per piece, not per tool: £8-20 a kilogram, and a six-week lead time the first time.

**Cores** are sand shapes that make the inside. They are blown in a corebox, cured, glued into the mould on **core prints** (small lands that locate them), and **must be vented** — a core is surrounded by hot metal, and the gas from its binder must escape through the core prints or it bubbles into the metal, which is the defect called a **core blow**: a smooth void the shape of the core's skin, usually under the top face. Cores are also the reason a cored hole can be a hot spot: a small core surrounded by metal soon heats through and stops extracting heat, so the metal round it freezes later than its thickness suggests.
:::

::: example Pattern dimensions: three allowances, not one {#ex-pattern level=3 check="261.1"}
A steel casting dimension is $2 5 0 \ \mathrm { m m }$ on the finished, machined drawing, between two machined faces. What is the pattern dimension? (Enter mm, to one decimal place.)

**Shrink allowance.** Steel's pattern shrinkage allowance is about $2 \ \ \%$ , so the pattern maker works to a **shrink rule**: an unmachined $2 5 0 \ \mathrm { m m }$ dimension would be $2 5 0 \times 1 . 0 2 0 = 2 5 5 . 0 \ \mathrm { m m }$ on the pattern. (Grey iron about $1 \ \ \%$ , aluminium and magnesium about $1 . 3 \ \ \%$ , brass about $1 . 6 \ \ \%$ .) The rule is a percentage of the *casting* dimension, and it is applied to every dimension on the pattern, including the core prints.

**Machining allowance.** The drawing dimension is the machined one, so the casting must arrive with metal to remove: say $3 \ \mathrm { m m }$ on each machined face of a medium-sized steel casting, so the casting must measure $2 5 0 + 2 \times 3 = 2 5 6 \ \mathrm { m m }$ , and the pattern, on the shrink rule, $2 5 6 \times 1 . 0 2 0 = 2 6 1 . 1 \ \mathrm { m m }$ .

**Draft.** The pattern must withdraw, so faces parallel to the draw get $1 { - } 2 ^ { \circ }$ on the mould and $2 { - } 3 ^ { \circ }$ on a core, which means the pattern dimension is measured at one end of the taper and the other end is different by $\tan ( 2 ^ { \circ } ) \times$ the height — $3 . 5 \ \mathrm { m m }$ over a $1 0 0 \ \mathrm { m m }$ boss.

**The answer to the question as asked is $2 6 1 . 1 \ \mathrm { m m }$ — not the $2 5 5 \ \mathrm { m m }$ of the shrink rule alone — and what the pattern shop needs is a drawing with the shrink rule, the machining allowance and the draft direction on it.** A casting drawing that shows only the machined part is a drawing the pattern shop has to redesign, and redesigning at the pattern shop is how the tolerance gets lost.
:::

## 5. Feeding: directional solidification, risers and chills

::: definition Make it freeze from the far end back {#def-riser}
Liquid metal occupies more volume than the same metal solid, so somewhere in every casting there must be liquid available until the last moment — and that somewhere must be **the last place to freeze**, or it is useless. Feeding is therefore a geometry problem with one rule:

$$
t _ { \text{riser } } \; > \; t _ { \text{casting } } \qquad \Longleftrightarrow \qquad M _ { \text{riser } } \; = \; \left( { \frac { V } { A } } \right) _ { \text{riser } } \; \geq \; 1 . 1 { - } 1 . 3 \times \; M _ { \text{casting } }
$$

For a cylindrical riser of diameter $D$ and height $h = 2 D$ sitting on top of the casting, with its base not cooling (it is the mouth into the casting) and its top and side cooling,

$$
V = { \frac { \pi D ^ { 2 } h } { 4 } } = { \frac { \pi D ^ { 3 } } { 2 } } , \qquad A = \pi D h + { \frac { \pi D ^ { 2 } } { 4 } } = { \frac { 9 \pi D ^ { 2 } } { 4 } }
 \qquad \Longrightarrow \qquad M = { \frac { 2 D } { 9 } }
$$

so the riser diameter needed is $D = 4 . 5 M _ { \text{required } }$ . (If the base is counted as cooling too, as for a riser beside the casting, $A = 5 \pi D ^ { 2 } / 2$ and $M = D / 5$ .) The riser must also hold enough metal: a plain sand riser can give up only a small fraction of its volume — about 14 % is the figure commonly used — before its shrinkage pipe reaches the casting, so its volume must be checked against the casting's shrinkage as well as its modulus. Three devices buy time without buying metal: an **exothermic sleeve** (a chemical blanket that radiates heat back and cuts the effective cooling area, worth a factor of up to six in freezing time), a **chill** (a steel plate or iron insert embedded in the mould that locally increases the cooling and is used to *move* the hot spot into the riser rather than to remove it), and **insulation** on the casting side, which does the opposite. A good sleeve raises that usable fraction several-fold, and every gram of riser is metal that must be cut off, ground and re-melted.
:::

::: example Size a top riser for a steel plate {#ex-riser level=3 check="62"}
A $2 0 0 \times 2 0 0 \times 3 0 \ \mathrm { m m }$ carbon-steel plate is to be fed by a single cylindrical top riser with $h = 2 D$ , its base on the casting. Find $D$ . (Enter mm, to the nearest millimetre.)

$$
V _ { c } = 1 { , } 2 0 0 \ \mathrm { c m ^ { 3 } } , \qquad A _ { c } = 2 ( 2 0 \times 2 0 ) + 4 ( 2 0 \times 3 ) = 1 { , } 0 4 0 \ \mathrm { c m ^ { 2 } } , \qquad M _ { c } = 1 . 1 5 4 \ \mathrm { c m }
$$
$$
M _ { r } \geq 1 . 2 \, M _ { c } = 1 . 3 8 5 \ \mathrm { c m } \qquad \Longrightarrow \qquad D \; = \; 4 . 5 M _ { r } \; = \; 6 . 2 3 \ \mathrm { c m } \; \approx \; { \bf 6 2 \ m m }
$$

A pattern shop would round up to $6 5 \ \mathrm { m m }$ . Check the volume too: the riser holds $\pi D ^ { 3 } / 2 = 3 8 0 ~ \mathrm { c m } ^ { 3 }$ , and 14 % of it, $5 3 ~ \mathrm { c m } ^ { 3 }$ , covers the plate's solidification shrinkage of about $3 \ \% \times 1 { , } 2 0 0 = 3 6 ~ \mathrm { c m } ^ { 3 }$ . The riser is $3 . 0 ~ \mathrm { k g }$ of steel against the plate's $9 . 4 ~ \mathrm { k g }$ : **a yield of $76 \ \ \%$ ,** and the rest goes back to the melt shop — but it also has to be cut off, and the cut has to be ground, and the head must be charged into the furnace. Add the gating's $1 . 5 ~ \mathrm { k g }$ and the yield is $68 \ \ \%$ , which is typical of steel sand castings and the reason a steel casting costs per kilogram delivered rather than per kilogram melted. **And note what the calculation assumed: that the plate is the only thing the riser feeds, that the mould is the same everywhere, and that the riser does not freeze across its own diameter before it has fed. All three assumptions are checked in practice by solidification simulation or by a trial casting with thermocouples in it, and neither is cheap.**
:::

::: widget plot
title: The pasty range: the gap no riser can feed
f: 1-0.45*x; 0.75
x: 0,1
y: 0.3,1.05
labels: wide-freezing-range alloy (liquidus at 1, solidus at 0.55); eutectic alloy (one temperature)
caption: Normalised temperature against fraction solidified for two alloys (schematic). The wide-freezing-range alloy starts to freeze at its liquidus and finishes at its solidus, and in between it is a **mush**: solid dendrite arms with liquid in the spaces between them. A eutectic alloy (the flat line) has no such range — it freezes at one temperature, keeps a free liquid surface right to the end, and can be fed through a long narrow neck from a riser. A wide-freezing-range alloy loses that ability early: once the dendrite arms impinge, around 20-30 % solid, the remaining liquid is cut into isolated pools that no reservoir can reach, and when those pools freeze they leave **microporosity distributed through the section rather than one cavity you could have drilled out**. This one figure explains the whole of casting-alloy preference — why Al-Si is near-eutectic at 11-13 % silicon, why grey iron is close to the eutectic composition (carbon equivalent near 4.3 %), why tin bronze is the hardest alloy to feed, and why the wide-freezing-range aluminium alloys that machine so well are cast only as sand castings with heavy feeding, or not at all.
:::

## 6. The alloys you are allowed to pour

::: definition The casting alloys and their one trick {#def-alloys}
$$
\begin{array} { l l l l }
\textbf{Alloy} & \textbf{Typical strength / elongation} & \textbf{Pour} & \textbf{The thing it is chosen for} \\ \hline
\text{Grey iron EN-GJL-150 to 350} & \text{UTS } 1 5 0 { - } 3 50 \ \mathrm { M P a } / < 1 \ \% & 1 { , } 6 2 0 { - } 1 { , } 7 2 0 \ \mathrm { K } & \text{graphite flakes: damping, machinability, oil retention, cheap} \\
\text{Ductile (spheroidal) iron} & \sigma _ { y } \ 2 5 0 { - } 4 5 0 \ \mathrm { M P a } / 1 8 { - } 2 \ \% & 1 { , } 6 5 0 { - } 1 { , } 7 2 0 \ \mathrm { K } & \text{Mg-treated nodules: iron with ductility and a casting's cost} \\
\text{Compacted (vermicular) iron} & \sigma _ { y } \ 2 1 0 { - } 3 8 0 \ \mathrm { M P a } / 1 { - } 3 \ \% & 1 { , } 6 5 0 { - } 1 { , } 7 0 0 \ \mathrm { K } & \text{much stronger than grey iron, with much of its conductivity} \\
\text{Al--Si--Mg A356-T6} & \sigma _ { y } \ 1 7 0 { - } 2 2 0 \ \mathrm { M P a } / 3 { - } 8 \ \% & 9 7 0 { - } 1 { , } 0 2 0 \ \mathrm { K } & \text{near-eutectic fluidity; } \mathrm { S r } \text{-modified; heat-treatable} \\
\text{Al--Cu A206} & \sigma _ { y } \ 2 5 0 { - } 3 5 0 \ \mathrm { M P a } / 5 { - } 1 0 \ \% & 9 7 0 { - } 1 { , } 0 2 0 \ \mathrm { K } & \text{the strongest cast aluminium, at a price in hot tearing and corrosion} \\
\text{Mg AZ91-T6} & \sigma _ { y } \approx 1 5 0 \ \mathrm { M P a } / 2 { - } 3 \ \% & 9 5 0 { - } 1 { , } 0 0 0 \ \mathrm { K } & 1 . 8 \ \mathrm { g / c m ^ { 3 } } , \text{ and it burns if the cover gas fails} \\
\text{Phosphor bronze / gunmetal} & \sigma _ { y } \ 1 2 0 { - } 2 0 0 \ \mathrm { M P a } / 1 0 { - } 2 0 \ \% & 1 { , } 4 0 0 { - } 1 { , } 5 0 0 \ \mathrm { K } & \text{bearing surface, seawater, and it is still being cast by hand} \\
\text{Cast carbon and low-alloy steel} & \sigma _ { y } \ 2 5 0 { - } 6 5 0 \ \mathrm { M P a } / 2 5 { - } 1 0 \ \% & 1 { , } 8 2 0 { - } 1 { , } 9 2 0 \ \mathrm { K } & \text{toughness and weldability in a shape nothing else makes} \\
\text{Ni superalloy (IN738LC; CMSX-4 single crystal)} & \text{creep strength above } 1 { , } 2 0 0 \ \mathrm { K } & \approx 1 { , } 7 0 0 \ \mathrm { K } & \gamma ^ { \prime } \text{ strengthening, cast on ceramic cores in vacuum} \\
\text{Ti-6Al-4V (cast + HIP)} & \sigma _ { y } \approx 8 5 0 \ \mathrm { M P a } / 1 0 \ \% & \approx 1 { , } 9 5 0 \ \mathrm { K } & \text{melted in vacuum, cast into an inert-faced ceramic shell}
\end{array}
$$

Four rules fall out. **The die-casting alloys are zinc, aluminium, magnesium and small brasses**, because iron and steel at $1 { , } 8 0 0 \ \mathrm { K }$ dissolve and crack a steel die; the corollary is that a die casting cannot be solution-treated, because the trapped gas expands and blisters it — which is why die castings are sold as "not heat treatable, not weldable" and why the structural ones are made by **low-pressure** or **squeeze** casting instead. **Aluminium castings are degassed** — rotary impeller with argon or nitrogen, or a hexachloroethane stick — and the melt is tested by the reduced-pressure test (a small button solidified under vacuum; if it froths, the melt is gassy), because hydrogen solubility in solid aluminium is a twentieth of that in the liquid and every cubic centimetre of dissolved gas becomes porosity. **Ductile iron is made by treating the melt with magnesium**, usually a magnesium-ferrosilicon alloy placed in a pocket of the ladle, to leave about $0 . 0 3 { - } 0 . 0 6 \ \ \%$ residual magnesium; the magnesium fades within minutes, which is why the treated iron must be poured promptly, why nodularity is checked on every treatment, and why the last casting from a ladle is not the same as the first. **And the reactive and high-temperature alloys — the nickel superalloys and titanium — are melted and cast in vacuum or inert gas into ceramic investment shells, which is a large part of why a turbine blade costs what it costs** (see also [[manufacturing/additive-manufacturing]]).
:::

## 7. Defects, and what they cost

::: definition The defect taxonomy {#def-defects}
$$
\begin{array} { l l l l }
\textbf{Defect} & \textbf{Looks like} & \textbf{Cause} & \textbf{Cure} \\ \hline
\text{Shrinkage cavity} & \text{rough, dark, irregular, at the hot spot} & \text{feeding ran out} & \text{bigger or better-placed riser, chill, sleeve, lower pour temperature} \\
\text{Shrinkage microporosity} & \text{fine sponginess between dendrites} & \text{wide freezing range, isolated pools} & \text{near-eutectic alloy, faster freeze, HIP} \\
\text{Gas porosity} & \text{smooth spheres, often under the top face} & \text{dissolved gas, wet mould, unvented core} & \text{degas, dry tools, vent, lower pour temperature} \\
\text{Core blow} & \text{smooth void the shape of a core face} & \text{core gas cannot escape} & \text{core vents, oil-free core sand, less binder} \\
\text{Misrun} & \text{rounded, unfinished corner} & \text{metal froze before the cavity filled} & \text{faster fill, hotter metal, thicker section, better insulation} \\
\text{Cold shut} & \text{a crease where two streams met} & \text{oxide skin or a cold wall stopped welding} & \text{one gate path, hotter metal, avoid split flows} \\
\text{Hot tear} & \text{crack along last-to-freeze grain boundaries} & \text{contraction against a mould that will not give} & \text{weaker/ collapsible core, radii, avoid abrupt section change, control S} \\
\text{Inclusion / slag} & \text{sharp-edged foreign lump} & \text{turbulence, ladle dross, washed mould} & \text{filter, skimming, weir, full sprue, wider gates} \\
\text{Scab / penetration} & \text{a crust of sand on the surface} & \text{metal pushed between sand grains} & \text{mould wash, denser ramming, sea coal, chromite facing} \\
\text{Hard spot} & \text{a locally white (ungraphitised) patch} & \text{chilled too fast, or too much section} & \text{anneal, or move the chill you did not mean to put there} \\
\text{Core shift} & \text{a bore that is off-centre} & \text{core floats on pour, or prints worn} & \text{core prints, core irons, check the corebox} \\
\text{Warp} & \text{the casting is not flat after shakeout} & \text{restrained shrinkage left residual stress} & \text{symmetrical sections, shake out hot, stress relieve}
\end{array}
$$

The economics of a defect are not the value of the part. A £23 casting rejected in the foundry costs £23 and a week; the same defect found in a customer's gearbox costs a teardown, a traceability investigation, and a supplier audit that costs more than the year's margin. **This is why the foundry's real product is the solidification plan** — the drawing with the risers, chills, gates and thermocouple positions on it — and why that plan is now made by simulation before the pattern is cut.
:::

::: example What a sand casting costs {#ex-cost level=3 check="23.2"}
$5 { , } 0 0 0$ grey iron housings, net mass $8 . 0 ~ \mathrm { k g }$ , gross mass as poured (with risers and gating) $1 3 . 0 ~ \mathrm { k g }$ . Metal £0.95 a kilogram delivered to the mould, moulding and shakeout £0.55 per kilogram gross, pattern £6,500, cleaning and grinding £0.30 per kilogram net. Find the cost per casting before machining. (Enter £, to one decimal place.)

$$
\underbrace { 1 3 . 0 \times 0 . 9 5 = 1 2 . 3 5 } _ { \text{metal, gross} } \; + \; \underbrace { 1 3 . 0 \times 0 . 5 5 = 7 . 1 5 } _ { \text{moulding} } \; + \; \underbrace { 6 { , } 5 0 0 / 5 { , } 0 0 0 = 1 . 3 0 } _ { \text{pattern} } \; + \; \underbrace { 8 . 0 \times 0 . 3 0 = 2 . 4 0 } _ { \text{cleaning} } \; = \; { \bf \pounds 2 3 . 2 0 }
$$

against a net mass of $8 ~ \mathrm { k g }$ , so **£2.90 per delivered kilogram** before machining, and the machining of the flange will add more than the casting did. Note where the money is: **the metal is charged on the gross mass, so the $5 ~ \mathrm { k g }$ of riser and gating is £4.75 a piece of the £23.20 — 20 % of the cost is metal you will melt again.** Cutting the riser system by a third with a better feeding plan saves $1 . 6 7 \ \mathrm { k g } \times ( 0 . 9 5 + 0 . 5 5 ) = \pounds 2 . 5 0$ a piece, because both metal and moulding are charged on the gross mass, which is why a foundry may quote more for a "simple" casting with a thick boss than for a complicated one you have sectioned properly.
:::

## Exercises

::: exercise The shrink rule {#ex-shrinkrule level=2 check="255"}
A carbon-steel casting dimension is $2 5 0 \ \mathrm { m m }$ and no machining is allowed on it. What must the pattern dimension be? (Enter mm, to the nearest millimetre.)
::: solution
Steel's total linear shrinkage is $2 . 0 \ \ \%$ : $2 5 0 \times 1 . 0 2 0 = { \bf 2 5 5 \ m m }$ . **The pattern shop works to a shrink rule — a scale rule graduated $2 \ \ \%$ long for steel, $1 \ \ \%$ for iron — and every dimension on the pattern, including the core prints and the draft, is made on that rule.** **Miss it and the casting is $5 \ \mathrm { m m }$ short on a $2 5 0 \ \mathrm { m m }$ face, which no amount of machining at the customer will recover.**
:::
:::

::: exercise Riser diameter for a thinner plate {#ex-riser2 level=2 check="54"}
A $2 0 0 \times 2 0 0 \times 2 5 \ \mathrm { m m }$ steel plate is fed by one cylindrical top riser with $h = 2 D$ and an insulated base. Take the required riser modulus as $1 . 2 \times$ the casting modulus. Find $D$ . (Enter mm.)
::: solution
$M _ { c } = 1 { , } 0 0 0 / 1 { , } 0 0 0 = 1 . 0 0 \ \mathrm { c m }$ , so $M _ { r } \geq 1 . 2 0 \ \mathrm { c m }$ and, with $M = 2 D / 9$ , $D = 4 . 5 M _ { r } = 5 . 4 \ \mathrm { c m } = { \bf 5 4 \ m m }$ . **The $D = 4 . 5 M$ result is worth memorising for a $h = 2 D$ top riser, and so is the fact that it is a starting point, not an answer: it assumes the riser feeds only this plate, that the mould is uniform, and that the riser neck does not freeze first — and the neck, being the only metal between the reservoir and the casting, is what usually freezes first.**
:::
:::

::: exercise Fill time from a given gate {#ex-fill level=2 check="3.2"}
A casting of $1 { , } 5 0 0 ~ \mathrm { c m } ^ { 3 }$ is gated with a total gate area of $3 . 0 ~ \mathrm { c m } ^ { 2 }$ under a $2 5 0 \ \mathrm { m m }$ head, $C _ { d } = 0 . 7$ . Find the fill time. (Enter seconds, to one decimal place.)
::: solution
$v = 0 . 7 { \sqrt { 2 \times 9 . 8 1 \times 0 . 2 5 } } = 1 . 5 5 \ \mathrm { m / s }$ , $Q = 1 5 5 \times 3 . 0 = 4 6 5 \ \mathrm { c m ^ { 3 } / s }$ , $t = 1 \, 5 0 0 / 4 6 5 = { \bf 3 . 2 \ s }$ . **A fill time of three seconds for a 1.5-litre casting is about right; the rule of thumb is that the cavity should fill in 1-10 seconds, fast enough not to freeze before it is full and slow enough not to wash the mould. A casting that takes forty seconds to fill in sand has usually frozen its gates before the last inch of it filled.**
:::
:::

::: exercise The hot spot ratio {#ex-hotspot level=2 check="2.25"}
A long cylindrical boss of $3 0 \ \mathrm { m m }$ diameter is attached to a large wall of $1 0 \ \mathrm { m m }$ thickness. Treating each as if it cooled on its own, by what factor does the boss freeze later than the wall? (Enter the factor, to two decimal places.)
::: solution
Freezing time goes as $M ^ { 2 }$ . For a long cylinder $M = D / 4 = 7 . 5 \ \mathrm { m m }$ ; for a large plate cooling on both faces $M = t / 2 = 5 \ \mathrm { m m }$ . The factor is $( 7 . 5 / 5 ) ^ { 2 } = { \bf 2 . 2 5 }$ — not the $( 3 0 / 1 0 ) ^ { 2 } = 9$ that comparing thicknesses suggests, because a cylinder cools from all round. **In a real casting the junction is worse than either, because where the boss meets the wall part of each one's cooling surface is lost, so the junction freezes last of all, in the middle of a casting whose rest has already frozen and can no longer feed it.** **The fix is on the drawing: a boss no thicker than $1 . 5 \times$ the wall, tapered into it over $6 { : } 1$ , and if the joint must be thick, put a chill there so the whole region freezes together.**
:::
:::

::: exercise Casting yield {#ex-yield level=2 check="61"}
A casting leaves the cleaning room at $8 . 0 ~ \mathrm { k g }$ net; as poured, with risers and gating, it weighed $1 3 . 2 ~ \mathrm { k g }$ . What is the casting yield? (Enter per cent, to the nearest per cent.)
::: solution
$1 0 0 \times 8 . 0 / 1 3 . 2 = { \bf 6 1 \ \ \% }$ . **Yields of 55-70 % are normal for iron sand castings of moderate complexity, and steel castings with heavy feeding can fall well below that.** **The returned mass is not lost — it goes back to the furnace — but it is melted, handled, cut, ground and counted, and just heating iron from room temperature to pouring temperature and melting it takes about $1 . 4 \ \mathrm { M J / k g }$ before any furnace losses. Yield is the foundry's single biggest lever on both cost and carbon, and it is set by the feeding plan, which is set by the designer's sectioning.**
:::
:::

::: exercise Grain refinement by cooling rate {#ex-grain level=3 check="10"}
At a chill face the cooling rate is $1 0 0 \ \mathrm { K / s }$ and at the centre of the same casting $0 . 1 \ \mathrm { K / s }$ . By what factor is the grain size larger at the centre, on the $d \propto { \dot { T } } ^ { - 1 / 3 }$ law? (Enter the factor.)
::: solution
$( 1 0 0 / 0 . 1 ) ^ { 1 / 3 } = 1 0 0 0 ^ { 1 / 3 } = { \bf 1 0 }$ . **Ten times the grain size, which by Hall–Petch costs a mild steel about $2 0 \ \mathrm { M P a }$ of yield strength between 0.5 and 5 mm grains (more at finer grain sizes), and often a good deal more in fatigue strength and pressure tightness — in the same casting, from the same ladle, a few centimetres apart.** **This is why casting specifications quote properties from a separately cast test bar of a defined section, and why a designer who has calculated on the handbook value for a thin section and drawn a thick one has not made an error in arithmetic but an error in process.**
:::
:::

::: exercise What a sleeve buys {#ex-sleeve level=3 check="6.25"}
An exothermic sleeve reduces a riser's effective cooling area to $4 0 \ \ \%$ of its bare value. By what factor does its freezing time increase, on Chvorinov's rule? (Enter the factor.)
::: solution
$t \propto ( V / A ) ^ { 2 }$ and $V$ is unchanged, so the factor is $( 1 / 0 . 4 ) ^ { 2 } = { \bf 6 . 2 5 }$ . **Which is why a small sleeved riser can replace a much larger open one — and why the sleeve's performance must be treated as a process variable: a damp or cracked sleeve, or a sleeve with a gap to the mould, gives a fraction of the six and the casting is unsound.** **The same arithmetic, run the other way, is why a riser is never placed against a chill, and why chills are placed where you want metal to freeze first.**
:::
:::

::: exercise Derive and use the critical nucleus {#ex-nuc level=4 check="0.8"}
Show that $r ^ { * } = 2 \gamma T _ { m } / ( \Delta H _ { f } \Delta T )$ and evaluate it for iron $( \gamma = 0 . 2 0 \ \mathrm { J / m ^ { 2 } }$ , $T _ { m } = 1 { , } 8 1 1 \ \mathrm { K }$ , $\Delta H _ { f } = 1 . 8 4 \times 1 0 ^ { 9 } \ \mathrm { J / m ^ { 3 } } )$ at undercoolings of $1 , 1 0 , 1 0 0 \ \mathrm { K }$ . What undercooling makes a $1 . 0 \ \mu \mathrm { m }$ diameter inoculant particle just large enough to nucleate? (Enter K, to one decimal place.)
::: solution
Setting $d ( \Delta G ) / d r = 0$ in $\Delta G = { \textstyle { \frac { 4 } { 3 } } } \pi r ^ { 3 } \Delta G _ { v } + 4 \pi r ^ { 2 } \gamma$ with $\Delta G _ { v } = - \Delta H _ { f } \Delta T / T _ { m }$ gives $r ^ { * } = 2 \gamma T _ { m } / ( \Delta H _ { f } \Delta T ) = 3 . 9 4 \times 1 0 ^ { - 7 } / \Delta T \ \mathrm { m }$ :

$$
\Delta T = 1 \ \mathrm { K } \Rightarrow r ^ { * } = 3 9 4 \ \mathrm { n m } , \qquad 1 0 \ \mathrm { K } \Rightarrow 3 9 \ \mathrm { n m } , \qquad 1 0 0 \ \mathrm { K } \Rightarrow 3 . 9 \ \mathrm { n m }
$$

A particle of radius $0 . 5 \ \mu \mathrm { m } = 5 0 0 \ \mathrm { n m }$ is stable when $r ^ { * } \leq 5 0 0 \ \mathrm { n m }$ , i.e. $\Delta T \geq 3 9 4 / 5 0 0 = { \bf 0 . 8 \ K }$ . **Which is the mechanism of inoculation in one line, in this simplified picture that treats the particle surface as a ready-made nucleus: a $1 \ \mu \mathrm { m }$ nucleant particle lets the liquid freeze at under a kelvin of undercooling, where clean iron can be undercooled by about $3 0 0 \ \mathrm { K }$ . The same logic is why a mould wall is a better nucleant than the middle of the cavity, why the chill face is fine-grained, and why a superheated pour (which dissolves the nuclei) gives a coarse structure — the reason a foundry measures superheat as carefully as it measures temperature.**
:::
:::

::: exercise Derive the riser scaling and what it costs {#ex-riserscale level=4 check="8"}
Show that a cylindrical riser with $h = 2 D$ and a non-cooling base has $M = 2 D / 9$ , and that its volume scales as $M ^ { 3 }$ , that is as $t ^ { 3 / 2 }$ . By what factor does the riser volume grow if the casting modulus doubles? (Enter the factor.)
::: solution
With $h = 2 D$ , $V = \pi D ^ { 2 } h / 4 = \pi D ^ { 3 } / 2$ and the cooling area is the cylinder wall plus the top, $A = \pi D h + \pi D ^ { 2 } / 4 = 2 \pi D ^ { 2 } + { \textstyle { \frac { 1 } { 4 } } } \pi D ^ { 2 } = { \textstyle { \frac { 9 } { 4 } } } \pi D ^ { 2 }$ , so $M = V / A = 2 D / 9$ . The riser modulus is a fixed multiple of the casting modulus, so $D = 4 . 5 M _ { r } \propto M _ { c }$ and $V _ { r } = \pi D ^ { 3 } / 2 \propto M _ { c } ^ { 3 }$ ; since $t \propto M ^ { 2 }$ , that is $V _ { r } \propto t ^ { 3 / 2 }$ . **Doubling the modulus multiplies the required riser volume by $2 ^ { 3 } = { \bf 8 }$ (and the freezing time by 4, consistent with $4 ^ { 3 / 2 } = 8$ ); increasing the section tenfold multiplies it by a thousand, while the casting's own volume, for a plate of fixed area, grows only tenfold.** **This is the reason heavy castings are surrounded by risers the size of wheelie bins, why hollow and sleeved risers are used above a tonne, why chills are worth their weight, and why the biggest single thing a designer can do for a casting is to keep the sections thin, even and tapered — the feeding cost is superlinear in the section, and it is paid in metal, in labour, in energy and in the yield of the whole job.**
:::
:::

::: quiz Gas or shrinkage {#quiz-porosity}
A radiograph of a steel casting shows dark, irregular, branching voids clustered under the top face of a heavy boss, with the rest of the casting clean. The first remedy is
- [ ] Degas the melt longer
- [x] Feed that boss better — a larger or better-placed riser, a sleeve, or a chill to move the hot spot
- [ ] Pour colder and slower
- [ ] Vent the core
::: solution
**Irregular, branching, dark and located at the last place to freeze is shrinkage, not gas: gas porosity is rounded and smooth-walled.** **Pouring colder does not move the last place to freeze, and venting a core does nothing for a solid boss. The correct sequence is to find the last place to freeze (by simulation, by the modulus rule, or by thermocouples), then either feed it or make it stop being last.**
:::
:::

::: quiz Why not die cast a steel bracket {#quiz-diecast}
Because
- [ ] Steel is too expensive to melt
- [ ] Die casting cannot make a bracket shape
- [x] Molten steel at $1 { , } 8 0 0 \ \mathrm { K }$ erodes, solders to and thermally cracks a steel die, so the process is limited to the low-melting alloys
- [ ] Die castings are always porous and steel would be worse
::: solution
**Die casting is a liquid-metal process in which the metal is injected at $3 0 { - } 1 5 0 \ \mathrm { M P a }$ into a polished tool steel die that is water-cooled between shots; iron and steel at their pouring temperature attack the die surface, weld to it, and crack it thermally in a short life.** **Zinc at about $4 2 0 \ \ {} ^ { \circ } \mathrm { C }$ , and aluminium and magnesium at about $6 5 0 { - } 7 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , are gentle enough for a die to last from tens of thousands of shots (aluminium) to a million or more (zinc); with small brasses, that is the die-casting alloy list. The porosity point is true but secondary — and it is why die castings are not heat-treated or welded, and why structural parts are low-pressure or squeeze cast instead.**
:::
:::

## Where this lesson leads

- **[[manufacturing/bulk-forming|Bulk deformation processes]]** is the answer to the casting's weakness: as-cast structures are porous and coarse, and forging closes the porosity and aligns the flow lines — see the fatigue-strength gap between the two in that lesson.
- **[[manufacturing/joining|Joining]]** covers weldability, which is a casting question as much as a welding one: grey iron is weldable only with preheat and nickel consumables, and a "weld repair" on a casting is a metallurgical operation with a procedure.
- **[[manufacturing/machining|Machining]]** begins where the casting ends — the as-cast skin is hard, scaled and full of sand, and the first cut into a sand casting is the worst cut a tool will ever take.
- **[[manufacturing/polymer-composite-processing|Polymer and composite processing]]** is casting in disguise: injection moulding is high-pressure die casting of a polymer at a temperature where the die is $8 0 \ \ {} ^ { \circ } \mathrm { C }$ , and the feeding, gating and shrinkage problems are the same problems.
- **[[manufacturing/additive-manufacturing|Additive manufacturing]]** takes the one thing casting cannot do — change the shape without changing the tool — and pays for it in rate.
- **[[materials-science/phase-diagrams|Phase diagrams]]** supplies the freezing range, the eutectic and the segregation that this lesson uses as process variables, and **[[materials-science/phase-transformations|Phase transformations]]** the heat treatment that most castings get afterwards.
- **[[manufacturing/process-selection|Manufacturing processes and their selection]]** is where the casting processes compete with everything else on cost, tolerance and quantity.

::: history
**c. 4000–3500 BC.** Copper is cast in open and then two-part moulds in south-eastern Europe and the Near East — after the cold hammering of native copper, which is older still — and the copper objects of the Nahal Mishmar hoard (at least 3500 BC) include intricate pieces generally taken to be lost-wax castings. Alloying copper with tin to make bronze follows, and the casting of bronze gives an age its name. **1774.** The casting of cannon drives the machine tool: John Wilkinson's boring mill, patented for cannon in 1774, bores the cylinders of Boulton and Watt's steam engines, which no earlier machine could make round enough. **1940.** **Nicolas (Nikolaj) Chvorinov** publishes *Theorie der Erstarrung von Gussstücken* in *Giesserei*, with the rule $t = B ( V / A ) ^ { 2 }$ , giving the foundry its one quantitative design law and making riser design a calculation instead of a tradition; the modulus methods of riser design are built on it. **1940s.** **Johannes Croning** in Germany invents shell moulding: a thin, rigid, resin-bonded mould made on a heated metal pattern, with castings accurate enough to save much of the machining. **1943.** **Keith Millis** at the International Nickel Company finds that a magnesium addition makes graphite grow as spheroids rather than flakes; the INCO patent of Millis, Albert Gagnebin and Norman Pilling is granted in 1949, and ductile iron gives cast iron a ductility and a fatigue strength it had never had. **1940s–1980s.** **Investment casting** moves from jewellery and dentistry into the aircraft industry with the jet engine: ceramic shells, ceramic cores for the cooling passages, then directionally solidified and finally single-crystal turbine blades. **1980s onwards.** Solidification and mould-filling **simulation** (commercial codes such as MAGMASOFT and ProCAST) computes the freezing sequence, the fill pattern and the likely porosity before the pattern is cut, turning the trial casting from a discovery into a verification.
:::

::: summary
**Casting is the only process that makes hollow, complex, heavy things in brittle materials**, and it wins on shape, material, size and low tooling at low volume. It loses on solidification shrinkage and on as-cast properties, and every design decision in this lesson is an attempt to keep the wins and pay as little as possible for the losses.
**Freezing is governed by two squares.** Nucleation needs an undercooling, $r ^ { * } = 2 \gamma T _ { m } / ( \Delta H _ { f } \Delta T )$ , and inoculation works by giving the liquid a particle already bigger than $r ^ { * }$ ; and freezing time is Chvorinov's $t = B ( V / A ) ^ { 2 }$ , with $B$ fitted and not derived. From the second follows everything: the hot spot is a section whose modulus is bigger than its neighbours', the riser must have a bigger modulus still, and a pad three times the wall thickness freezes nine times later.
**Feeding is geometry.** $M = 2 D / 9$ for a $h = 2 D$ top riser whose base sits on the casting, $M _ { r } \geq 1 . 2 M _ { c }$ , enough volume to supply the shrinkage, chills to move the hot spot rather than remove it, sleeves to buy freezing time cheaply — and a riser volume that grows as $M ^ { 3 }$ , or $t ^ { 3 / 2 }$ , which is why section design beats riser design.
**Gating is a turbulence problem.** $A = V / ( t _ { \text{fill } } C _ { d } \sqrt { 2 g h } )$ , Re of $1 0 ^ { 4 } { - } 1 0 ^ { 5 }$ always, the sprue must narrow as $\sqrt { H / z }$ or it aspirates, the choke must be placed deliberately, the metal must enter slowly (below about $0 . 5 \ \mathrm { m / s }$ ) at the thickest part, and a filter catches what the design could not prevent.
**The mould is the tolerance.** Green sand is cheap, fast and $\pm 1 . 5 \ \mathrm { m m } / 1 0 0 \ \mathrm { m m }$ ; no-bake is stable to $\pm 0 . 8$ ; shell is $R _ { a } \ 6$ ; investment has no parting line, needs no draft and costs per piece; and the pattern must carry three allowances — shrink, machining and draft — before it carries a dimension.
**Know the alloys and their one trick.** Grey iron shrinks little because its graphite expands; ductile iron needs magnesium and loses it on a clock; aluminium must be degassed and protected from moisture; die casting is confined to zinc, aluminium, magnesium and small brasses and its products cannot be heat-treated or welded; and the superalloys and titanium are cast in ceramic shells under vacuum or inert gas, which is why they are expensive.
**Diagnose the void before you treat it.** Smooth rounded voids are gas and want drier, cleaner, degassed metal; rough dendritic voids at the last place to freeze are shrinkage and want better feeding. The remedies are opposite, and applying the wrong one is how a defect becomes a contract.
:::

## Further reading

- J. Campbell, *Castings*, 2nd ed., Butterworth-Heinemann, 2003, and *Complete Casting Handbook*, 2nd ed., Butterworth-Heinemann, 2015 — the defect books, with the critical ingate velocity, filling-system design and the bifilm view of defects used in §3 and §7.
- D. M. Stefanescu (volume chair), *ASM Handbook, Volume 15: Casting*, ASM International, 2008 — process-by-process data, alloy metallurgy and defect descriptions.
- P. Beeley, *Foundry Technology*, 2nd ed., Butterworth-Heinemann, 2001 — moulding, gating, feeding and the foundry practice behind §3–§5.
- D. M. Stefanescu, *Science and Engineering of Casting Solidification*, 3rd ed., Springer, 2015 — nucleation, dendritic growth, segregation and solidification modelling behind §2.
- S. Kalpakjian and S. R. Schmid, *Manufacturing Engineering and Technology*, Pearson — the casting chapters, including the shrinkage data of §2.
