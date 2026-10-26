Every convection coefficient in engineering is a number that somebody earned by solving the boundary-layer equations, and the way to carry them is to remember how they were made. **Convection is conduction with a boundary condition you had to solve for**: the heat crosses the wall by molecular diffusion, exactly as in a solid, and the entire content of a convection correlation is the size of the gradient the flow happens to set up at the wall. Write it out and the whole subject organises itself:
$$
h = - { \frac { k _ { f } } { T _ { w } - T _ { \infty } } } \left( { \frac { \partial T } { \partial n } } \right) _ { w } \qquad \Longleftrightarrow \qquad \mathrm { N u } = { \frac { h L } { k _ { f } } } = - \, { \frac { \left( \partial T / \partial n \right ) _ { w } } { \left( T _ { w } - T _ { \infty } \right ) / L } }
$$
**The Nusselt number is a dimensionless wall temperature gradient, and it contains no fluid property except the conductivity of the fluid.** **That single observation does most of the work in this lesson: it explains why $h$ for a given geometry and speed is proportional to $k _ { f }$ and why the correlations are written as $\mathrm { N u } = f ( \mathrm { R e } , \mathrm { P r } )$ — the gradient is set by the flow, which knows about $\nu$ and $U$ and $L$ (that is Reynolds) and about how fast heat diffuses relative to momentum (that is Prandtl).** **Two flows with the same Nusselt number have coefficients in proportion to their conductivities — water's is about twenty-three times air's at equal $\mathrm { N u }$ — and at equal speed water does better still, because its lower kinematic viscosity and higher Prandtl number raise $\mathrm { N u }$ as well.**

The lesson is organised around one flow — the flat plate — because it is the only external-convection problem with an exact solution, and everything else is a correction to it. **A flat plate in a parallel stream has no pressure gradient, so the boundary layer grows undisturbed from the leading edge and the local heat transfer falls as $x ^ { - 1 / 2 }$ in the laminar regime and $x ^ { - 1 / 5 }$ in the turbulent.** **Everything about the flat plate is a statement about the leading edge: the boundary layer is infinitely thin at station zero and infinitely steep, so the local coefficient is infinite there and finite everywhere else, and the average over a plate is always twice the value at the trailing edge in the laminar case.** **A cylinder, a sphere, a tube bank and a heat sink are all flat plates that have been bent, and each bend introduces the one thing the flat plate does not have — a pressure gradient, and with it separation.**

The practical arithmetic is three correlations and one analogy. **The laminar flat plate**, $\overline { { \mathrm { N u } } } _ { L } = 0 . 6 6 4 \, \mathrm { R e } _ { L } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$ , valid to $\mathrm { R e } _ { L } \approx 5 \times 1 0 ^ { 5 }$ , which for air at a metre means wind speeds below $8 \ \mathrm { m / s }$ — **that is, most of the outdoors, most of the inside of a building, and a large fraction of every electronics datasheet you have ever read.** **The turbulent flat plate**, $\overline { { \mathrm { N u } } } _ { L } = \left( 0 . 0 3 7 \, \mathrm { R e } _ { L } ^ { 0 . 8 } - 8 7 1 \right ) \mathrm { P r } ^ { 1 / 3 }$ , with the $8 7 1$ subtracting the laminar leading edge you are not entitled to ignore. **And the cylinder**, $\mathrm { N u } = C \, \mathrm { R e } _ { D } ^ { n } \, \mathrm { P r } ^ { 1 / 3 }$ with $C$ and $n$ from a table, whose most remarkable feature is that between $\mathrm { R e } \approx 2 \times 1 0 ^ { 5 }$ and $5 \times 1 0 ^ { 5 }$ the heat transfer rises faster than the subcritical power law predicts — because a boundary layer that turns turbulent before it separates stays attached further round the cylinder, and the wake gets narrower.

::: warning Five external-convection errors, in order of how much they cost
**Using the turbulent correlation on a laminar boundary layer, or the reverse.** At $2 \ \mathrm { m / s }$ over a $1 \ \mathrm{m}$ plate of air the laminar answer is $h = 5 . 5 \ \mathrm { W / m ^ { 2 } K }$ and the turbulent formula gives $1 0 . 4$ — **a factor of $1 . 9$ of free margin, which is why this error survives review.** **The reverse error is worse and far more common: a designer applies the mixed-plate correlation to a heat sink at $3 \ \mathrm { m / s }$ over $1 0 0 \ \mathrm{mm }$ , where $\mathrm { R e } _ { L } = 1 9 { , } 0 0 0$ and the flow is laminar, and $0 . 0 3 7 \, \mathrm { R e } ^ { 0 . 8 } - 8 7 1$ comes out negative — the formula's way of saying it does not apply, and a warning that is lost the moment someone drops the $8 7 1$ to "fix" it.** **Always compute the Reynolds number first and write down which regime you are in before you write down a correlation; it takes ten seconds and it is the whole of the discipline.** **Assuming the transition Reynolds number is a property of the flow: $5 \times 1 0 ^ { 5 }$ is a wind-tunnel value obtained in a clean stream over a smooth plate. Free-stream turbulence, surface roughness, vibration and castellation can pull it to $1 \times 1 0 ^ { 5 }$ ; a very clean, very quiet, very smooth facility can push it past $3 \times 1 0 ^ { 6 }$.** **Forgetting radiation.** A $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ steel rod in $1 0 \ \mathrm { m / s }$ air loses $1 . 3 7 \ \mathrm { k W / m }$ by convection and $0 . 3 6 \ \mathrm { k W / m }$ by radiation — **$2 1 \ \ \%$ that no correlation contains.** **At $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ surface, $1 \ \mathrm { m / s }$ of air, $1 0 0 \ \mathrm { m m }$ of length and $\varepsilon = 0 . 8$ , $h _ { c } \approx 1 2$ against $h _ { r } \approx 7$ , a $5 7 \ \ \%$ addition; at $2 5 \ \mathrm { K }$ above ambient radiation is still about $3 0 \ \ \%$ of the total. The correction is $h _ { r } = \varepsilon \sigma ( T _ { w } + T _ { \mathrm { s u r } } ) ( T _ { w } ^ { 2 } + T _ { \mathrm { s u r } } ^ { 2 } )$ and it costs one line.** **Using properties at the wrong temperature.** Every correlation in this lesson was fitted with properties evaluated at a stated reference — usually the **film temperature** $T _ { f } = ( T _ { w } + T _ { \infty } ) / 2$ for external flow, and the **bulk mean** for internal. **Air's viscosity rises $4 3 \ \ \%$ between $2 0$ and $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , its density falls by $3 8 \ \ \%$ , and its kinematic viscosity therefore rises by $1 3 1 \ \ \%$ : the Reynolds number on a hot plate is less than half what the cold-air calculation said, and the correlation you then apply was fitted on the cold side.** **For liquids the error is worse and one-sided: engine oil's Prandtl number falls by more than an order of magnitude between $2 5 \ \ {} ^ { \circ } \mathrm { C }$ and $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , and a lubricant cooled by a correlation evaluated at the wrong end of the range is wrong by more than the safety margin.** **Treating the correlations as accurate.** The scatter band of the standard flat-plate and cylinder correlations is $\pm 2 0$ to $\pm 3 0 \ \ \%$ even in the range they were fitted over, and the correlations are usually quoted for a smooth, uniform, non-turbulent incoming stream that no real machine supplies. **The right response is not to distrust them but to stop pretending the answer has three significant figures: quote $h$ to two, size the exchanger with the uncertainty carried through to the area, and put the adjustment in the places you can reach.**
:::

## What a Nusselt number is, and what a Prandtl number is for

::: definition The Nusselt number and the film coefficient {#def-nu}
$$
\mathrm { N u } _ { L } = { \frac { h L } { k _ { f } } } = { \frac { \text{actual wall gradient} } { \text{gradient if the whole } \Delta T \text{ dropped across } L } } \qquad \left[ \mathrm { N u } _ { x } = { \frac { h _ { x } x } { k _ { f } } } \right]
$$
**Three consequences that are worth more than any correlation in the book.**
**(i) $h$ is proportional to the fluid's conductivity.** Doubling $k _ { f }$ at fixed $\mathrm { R e }$ and $\mathrm { P r }$ doubles $h$ . **This is why, at equal Nusselt number, water beats air by its conductivity ratio of about twenty-three, and why adding nanoparticles to a coolant at $4 \ \ \%$ volume — which raises $k$ by roughly $1 0 \ \ \%$ — buys at most that $1 0 \ \ \%$ at fixed $\mathrm { R e }$ and $\mathrm { P r }$ , and usually less, because the particles raise the viscosity too.**
**(ii) $h$ is not a property of the fluid.** It is a property of the fluid, the speed, the length and the geometry together, and quoting "$h$ for air" is meaningless. **A table of "typical convection coefficients" is a mnemonic for orders of magnitude and nothing else; the moment a number in it is used in a calculation, it has to be replaced by a correlation.**
**(iii) $\mathrm { N u } \to$ constant as $\mathrm { R e } \to 0$ , for some shapes.** A conduction-only limit has a fixed Nusselt number: $2$ for a sphere in a quiescent infinite medium and $3 . 6 6$ for fully developed laminar flow in a round tube at constant wall temperature, which survives to zero Reynolds number because it comes from the shape of the profile rather than its size. **A long cylinder has no such floor: steady conduction from an infinite cylinder into an unbounded medium has no solution, so its Nusselt number falls slowly towards zero as $\mathrm { R e } \to 0$ , and the $0 . 3$ in the Churchill–Bernstein correlation is a fitting constant, not a limit.** **The lower bound of $2$ for a sphere is the reason a small hot bead in still air cannot be cooled below a certain rate by any means whatever, and why "still air" heat-transfer coefficients for small objects are set by conduction and not by whatever draught you think is blowing.**
:::

::: definition The Prandtl number: who diffuses faster {#def-pr}
$$
\mathrm { P r } = { \frac { \nu } { \alpha } } = { \frac { \text{momentum diffusivity} } { \text{thermal diffusivity} } } = { \frac { c _ { p } \mu } { k } }
$$
**$\mathrm { P r }$ answers one question and answers it completely: when a flow drags a thermal boundary layer along with it, which layer is thicker?** For $\mathrm { P r } \approx 1$ they are the same thickness; for $\mathrm { P r } \ll 1$ heat outruns momentum and the thermal layer is much thicker than the velocity layer; for $\mathrm { P r } \gg 1$ the reverse. For laminar boundary layers over a flat plate the ratio is very nearly
$$
\boxed { \; { \frac { \delta } { \delta _ { t } } } \approx \mathrm { P r } ^ { 1 / 3 } \quad ( \mathrm { P r } \gtrsim 0 . 6 ) \; } \qquad \mathrm { P r } = 0 . 0 2 5 \ ( \text{Hg} ) \colon { \frac { \delta _ { t } } { \delta } } \approx \mathrm { P r } ^ { - 1 / 2 } \approx 6 \ ( \mathrm { P r } \ll 1 ) \qquad \mathrm { P r } = 0 . 7 1 \ ( \text{air} ) \colon { \frac { \delta _ { t } } { \delta } } \approx 1 . 1 2 \qquad \mathrm { P r } = 1 5 0 0 \ ( \text{oil} ) \colon { \frac { \delta _ { t } } { \delta } } \approx { \frac { 1 } { 1 1 } }
$$
$$
\begin{array} { l c l }
\text{Fluid} & \text{Pr} & \text{Consequence} \\
\text{Liquid mercury } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 0 . 0 2 5 & \text{heat diffuses } 4 0 \text{ times faster than momentum; } \mathrm { N u } \text{ is nearly } \mathrm { P r } \text{-independent} \\
\text{Liquid sodium } \left( 4 0 0 \ \mathrm { ^ \circ C } \right) & 0 . 0 0 4 5 & \text{the same, more so; the reason sodium cools fast-reactor cores} \\
\text{Air and most gases} & 0 . 7 1 \pm 0 . 0 3 & \text{the two layers are within about } 1 2 \ \% \text{ of each other for the common gases} \\
\text{Water } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 6 . 1 & \text{thin thermal layer; } h \text{ very sensitive to } \mathrm { P r } ( T ) \\
\text{Water } \left( 1 0 0 \ \mathrm { ^ \circ C } \right) & 1 . 7 5 & \text{a factor of } 3 . 5 \text{ lower than at } 2 5 \ \mathrm { ^ \circ C } \text{, mostly from viscosity} \\
\text{Ethylene glycol } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 1 5 0 & \text{thermal layer } 5 \text{ times thinner than the velocity layer} \\
\text{Engine oil } \left( 6 0 \ \mathrm { ^ \circ C } \right) & 1 5 0 0 & \text{thermal layer } 1 1 \text{ times thinner; } h \text{ collapses as the oil warms}
\end{array}
$$
**The most useful single fact in the table is the third row: the common permanent gases — air, nitrogen, oxygen, hydrogen, helium, argon — have $\mathrm { P r }$ between about $0 . 6 6$ and $0 . 7 4$ over a wide range of temperature, because in a dilute gas the same molecular motion carries both momentum and heat, so $\nu$ and $\alpha$ are two readings of one process (kinetic theory with Eucken's correction gives $\mathrm { P r } \approx 4 \gamma / ( 9 \gamma - 5 )$ , $0 . 6 7$ for a monatomic and $0 . 7 4$ for a diatomic gas).** **Steam and heavy vapours run higher, near $1$ . This is why the exponent on $\mathrm { P r }$ in gas-side correlations is almost never tested, why $\mathrm { P r } ^ { 1 / 3 }$ and $\mathrm { P r } ^ { 0 . 4 }$ give the same answer for air to within about $2 \ \ \%$ , and why a correlation fitted on air tells you nothing at all about oil.**
:::

::: widget plot
title: Thermal boundary-layer thickness relative to the velocity layer, against Prandtl number
f: pow(10,-x/3); 1
x: -2.2, 3
y: 0, 6
labels: delta_t / delta = Pr^(-1/3); Pr = 1
caption: The ratio of the thermal to the velocity boundary-layer thickness against $\log _ { 1 0 } ( \mathrm { P r } )$ . **Reading left to right: liquid mercury at $\mathrm { P r } = 0 . 0 2 5$ sits at $3 . 4$ on the curve, but that is an extrapolation below the $\mathrm { P r } \gtrsim 0 . 6$ range of the law, and the true ratio is nearer $\mathrm { P r } ^ { - 1 / 2 } \approx 6$ ; air at $0 . 7 1$ sits at $1 . 1 2$ ; water at $6$ sits at $0 . 5 5$ ; ethylene glycol at $1 5 0$ sits at $0 . 1 9$ ; engine oil at $1 5 0 0$ sits at $0 . 0 9$ — a thermal layer eleven times thinner than the layer the fan has to push through.** **The vertical position of the air point is the reason this lesson works at all: for every gas you will meet, the two layers are the same thickness to within an eighth, so the velocity field and the temperature field can be solved with one length scale and the $\mathrm { P r }$ dependence enters only as a gentle correction.** **For oils the whole calculation is the correction, and for liquid metals the thermal boundary layer does not exist in any meaningful sense — heat conducts upstream into the approaching flow, and the correlations for $\mathrm { P r } < 0 . 1$ are a separate literature with separate forms.**
:::

::: exercise Derivation: dimensional analysis of forced convection {#der-dim level=3}
::: solution
**The variables.** For an isothermal flat plate of length $L$ in a stream $U$ of fluid with $\rho , \mu , k , c _ { p }$ , the coefficient depends on seven quantities:
$$
h = f \left( U , L , \rho , \mu , k , c _ { p } , \Delta T \right )
$$
**The $\Delta T$ is a decoy.** For forced conduction with constant properties the equations are linear in $\Delta T$ , so $h$ is independent of it — which is exactly what Newton's "law" asserts, and is the reason the coefficient exists at all. **Drop $\Delta T$ and count: $h , U , L , \rho , \mu , k , c _ { p }$ are $7$ quantities spanning $4$ dimensions (mass, length, time, absolute temperature), so Buckingham-$\pi$ leaves $7 - 4 = 3$ dimensionless groups — one dependent and two independent.**
**The groups.** Taking $U , L , \rho , k$ as repeating:
$$
\pi _ { 1 } = { \frac { h L } { k } } = \mathrm { N u } , \qquad \pi _ { 2 } = { \frac { \rho U L } { \mu } } = \mathrm { R e } , \qquad \pi _ { 3 } = { \frac { c _ { p } \mu } { k } } = \mathrm { P r }
$$
$$
\boxed { \; \mathrm { N u } = f \left( \mathrm { R e } , \mathrm { P r } \right ) \; } \qquad \text{and for a flat plate, where the boundary layer is thin and has no memory of } L \text{ except through } \mathrm { R e } _ { x } \text{:} \qquad \mathrm { N u } _ { x } = g \left( \mathrm { R e } _ { x } , \mathrm { P r } \right )
$$
**What dimensional analysis cannot do, and what it does.** It cannot supply the $1 / 2$ on the Reynolds number, the $1 / 3$ on the Prandtl number, or the $0 . 6 6 4$ — those come from solving the boundary-layer equations. **But it does three things worth doing: it tells you that a wind-tunnel test at half speed on a model twice as long is the same heat-transfer problem; it tells you that $h$ can depend on the fluid only through $k _ { f }$ , $\mathrm { R e }$ and $\mathrm { P r }$ , as $h = ( k _ { f } / L ) \, f ( \mathrm { R e } , \mathrm { P r } )$ ; and it tells you that if you want to simulate a $1 0 \ \mathrm{m}$ chord at $2 5 0 \ \mathrm { m / s }$ with sea-level air properties, you need $\mathrm { R e } \approx 1 . 7 \times 1 0 ^ { 8 }$ , which only pressurised cryogenic tunnels approach, so most tests run at a lower $\mathrm { R e }$ and trust the $\mathrm { R e } ^ { 0 . 8 }$ to carry you — which is a decision, not a measurement.**
:::
:::

::: definition The Reynolds, Chilton-Colburn and von Karman analogies {#def-analogy}
Momentum and heat are transported by the same eddies, so the friction coefficient and the heat-transfer coefficient are not independent. **Reynolds' analogy** (valid for $\mathrm { P r } = 1$ , or for a turbulent pipe core):
$$
\mathrm { S t } = { \frac { f } { 2 } } , \qquad \mathrm { S t } = { \frac { \mathrm { N u } } { \mathrm { R e } \, \mathrm { P r } } } = { \frac { h } { \rho U c _ { p } } } , \qquad f = { \frac { \tau _ { w } } { { \frac { 1 } { 2 } } \rho U ^ { 2 } } }
$$
**Chilton-Colburn** extends it to $0 . 6 < \mathrm { P r } < 6 0$ by absorbing the property mismatch into a $j$-factor:
$$
\boxed { \; j _ { H } \equiv \mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = { \frac { f } { 2 } } \; } \qquad \Longleftrightarrow \qquad \mathrm { N u } = { \frac { f } { 2 } } \, \mathrm { R e } \, \mathrm { P r } ^ { 1 / 3 }
$$
**Check it against the flat plate: $C _ { f } = 1 . 3 2 8 \, \mathrm { R e } ^ { - 1 / 2 }$ and $\overline { { \mathrm { N u } } } = 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$ give $\mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = \overline { { \mathrm { N u } } } \, \mathrm { R e } ^ { - 1 } \mathrm { P r } ^ { - 1 } \mathrm { P r } ^ { 2 / 3 } = 0 . 6 6 4 \, \mathrm { R e } ^ { - 1 / 2 } = \overline { { C } } _ { f } / 2$ exactly.** **For the laminar flat plate the analogy is exact to the accuracy of the $\mathrm { P r } ^ { 1 / 3 }$ fit itself, because the energy and momentum equations have the same form and the Prandtl-number dependence is carried entirely by that factor.**
**Why an engineer should care.** **You can measure heat and infer drag, or measure drag and infer heat, on a geometry for which no correlation exists.** **It is how the aerodynamic heating of high-speed aircraft skins is estimated from friction data, how wind-tunnel models are thermally instrumented, and how a shell-and-tube exchanger's fouling can be diagnosed from its pressure drop.**
:::

::: widget plot
title: Stanton number against Reynolds number, laminar and turbulent
f: 0.8347*pow(10,-0.5*x); 0.04651*pow(10,-0.2*x)
x: 3, 7
y: 0, 0.03
labels: laminar, St = 0.835 Re^-0.5; turbulent, St = 0.0465 Re^-0.2
caption: The Stanton number $\mathrm { S t } = h / ( \rho U c _ { p } )$ for a flat plate in air at $\mathrm { P r } = 0 . 7 1$ , plotted against $\log _ { 1 0 } \mathrm { R e } _ { L }$ . **Multiplying either curve by $\mathrm { P r } ^ { 2 / 3 }$ gives $C _ { f } / 2$ exactly, which is the Chilton-Colburn analogy read off a graph.** **The two straight lines are the two power laws, and they cross at $\mathrm { R e } \approx 1 . 5 \times 1 0 ^ { 4 }$ — below which a turbulent boundary layer would be the worse heat exchanger, and above which it is the better one.** **Since real transition sits near $5 \times 1 0 ^ { 5 }$ , the turbulent line only ever applies where it already wins: at $\mathrm { R e } = 1 0 ^ { 6 }$ the turbulent plate transfers $3 . 5$ times as much heat as a laminar plate of the same length, and drags $3 . 5$ times as much.** **The two ratios being equal is not a coincidence but the content of the analogy, and it is the whole bargain in one number — turbulence buys heat transfer at a price in pumping power at an exchange rate of one for one, which is why trips, roughness and vortex generators are fitted only where the heat transfer is worth more than the fan.**
:::

::: example Drag from a heat-transfer measurement {#ex-analogy}
A $2 0 0 \ \mathrm{mm}$ square flush-mounted hot-film panel in an $8 \ \mathrm { m / s }$ air stream at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ measures an average coefficient $h = 2 5 \ \mathrm { W / m ^ { 2 } K }$ . What is the skin-friction drag on the panel?

::: solution
$$
\mathrm { S t } = { \frac { h } { \rho U c _ { p } } } = { \frac { 2 5 } { 1 . 1 8 4 \times 8 \times 1 0 0 7 } } = 2 . 6 2 \times 1 0 ^ { - 3 } \qquad { \frac { C _ { f } } { 2 } } = \mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = 2 . 6 2 \times 1 0 ^ { - 3 } \times 0 . 7 9 6 = 2 . 0 9 \times 1 0 ^ { - 3 }
$$
$$
D = C _ { f } \times { \frac { 1 } { 2 } } \rho U ^ { 2 } A = 4 . 1 7 \times 1 0 ^ { - 3 } \times 0 . 5 \times 1 . 1 8 4 \times 6 4 \times 0 . 0 4 0 0 = \mathbf { 6 . 3 \ m N }
$$
**Six millinewtons — the weight of about two thirds of a gram, on a panel $2 0 0 \ \mathrm { m m }$ square, in a $2 9 \ \mathrm { k m / h }$ wind.** **Two things make this worth doing. First, it is the only way to get the drag of a surface whose heat-transfer coefficient you happen to know and whose friction you do not. Second, the number is a useful calibration: $6 \ \mathrm{mN }$ of skin friction against a $2 5 \ \mathrm{ W / m ^ { 2 } K } $ coefficient means that in air at moderate speed, **drag is never the problem and heat always is** — you can cool almost anything by blowing at it, and the force you pay is negligible until the speed goes up as the square.**
:::
:::

## The flat plate: the only exact answer in the subject

::: definition Laminar flow over an isothermal flat plate {#def-flatplate}
For a steady, incompressible, zero-pressure-gradient layer with $\mathrm { R e } _ { x } \equiv U x / \nu$ and $0 . 6 \lesssim \mathrm { P r } \lesssim 6 0$ , the Blasius-Pohlhausen similarity solution gives
$$
\begin{aligned}
\delta ( x ) & \approx { \frac { 5 . 0 \, x } { \sqrt { \mathrm { R e } _ { x } } } } & \text{velocity layer, } 9 9 \ \% \text{ of } U \qquad \delta _ { t } & \approx \delta \, \mathrm { P r } ^ { - 1 / 3 } \\[6pt]
C _ { f , x } = { \frac { \tau _ { w } } { { \frac { 1 } { 2 } } \rho U ^ { 2 } } } & = { \frac { 0 . 6 6 4 } { \sqrt { \mathrm { R e } _ { x } } } } & { \overline { { C } } } _ { f , L } & = { \frac { 1 . 3 2 8 } { \sqrt { \mathrm { R e } _ { L } } } } = 2 \, C _ { f , L } \\[6pt]
\mathrm { N u } _ { x } & = 0 . 3 3 2 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } & { \overline { { \mathrm { N u } } } } _ { L } & = 0 . 6 6 4 \, \mathrm { R e } _ { L } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } = 2 \, \mathrm { N u } _ { L }
\end{aligned}
$$
**Read the last column first, because it is the one that gets you into trouble: the average over a plate is exactly twice the local value at the trailing edge.** **The reason is geometric — $h _ { x } \propto x ^ { - 1 / 2 }$ , and the mean of $x ^ { - 1 / 2 }$ over $[ 0 , L ]$ is $2 L ^ { - 1 / 2 }$ — and it means the leading edge, where the boundary layer is a fraction of a millimetre thick, dominates the average.**
**Uniform heat flux instead of uniform temperature.** For a plate heated electrically at constant $q ^ { \prime \prime }$ rather than held at constant $T _ { w }$ , the local coefficient is
$$
\mathrm { N u } _ { x , q } = 0 . 4 5 8 7 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } = 1 . 3 8 \times \mathrm { N u } _ { x , T }
$$
**The constant-flux coefficient is $3 8 \ \ \%$ higher, because the wall temperature — free to rise downstream — flattens the temperature profile near the leading edge where the conduction is sharpest.** **The practical consequence is that on a real circuit board, where the heat flux is roughly uniform and the temperature is whatever comes out, using the isothermal correlation hides the fact that the wall temperature is not constant: it rises as $x ^ { 1 / 2 }$ , so the chips at the back run half again as hot above ambient as the average does.**
**Which length, and which speed.** $x$ is measured from the leading edge, or from a trip, or from a step, or from the first sharp corner the flow sees — **not from the start of the heated region.** **If a board's first $3 0 \ \mathrm { m m }$ is a blank panel, the boundary layer that reaches the chips is $3 0 \ \mathrm { m m }$ older than the correlation assumes, and $h$ at the first chip is lower than a correlation started at the heated edge would say — though not by the whole of $\sqrt { x _ { \text{heated} } / x _ { \text{total} } }$ , because the thermal layer still starts fresh where the heating starts; the unheated-starting-length factor $\left[ 1 - ( \xi / x ) ^ { 3 / 4 } \right] ^ { - 1 / 3 }$ , with $\xi$ the unheated length, handles it.** **Likewise $U$ is the free-stream velocity a few boundary-layer thicknesses away, not the fan's nameplate figure, which is a pressure rise masquerading as a velocity.**
:::

::: exercise Derivation: the flat plate by the integral method {#der-plate level=4}
::: solution
**Two integral equations.** Integrating the boundary-layer momentum equation across the layer gives von Kármán's momentum integral, and the same operation on the energy equation gives its thermal analogue:
$$
{ \frac { \tau _ { w } } { \rho } } = U ^ { 2 } { \frac { \mathrm { d } \theta } { \mathrm { d } x } } , \qquad \theta = \int _ { 0 } ^ { \delta } { \frac { u } { U } } \left( 1 - { \frac { u } { U } } \right ) \mathrm { d } y \qquad q _ { w } = \rho U c _ { p } \Delta T { \frac { \mathrm { d } \theta _ { t } } { \mathrm { d } x } } , \quad \theta _ { t } = \int _ { 0 } ^ { \delta _ { t } } { \frac { u } { U } } { \frac { T - T _ { \infty } } { \Delta T } } \, \mathrm { d } y
$$
**The method assumes shapes and solves for their thicknesses.** Take a parabolic velocity profile $u / U = 2 \eta - \eta ^ { 2 }$ with $\eta = y / \delta$ , which satisfies $u = 0$ at the wall and $u = U$ , $\partial u / \partial y = 0$ at $y = \delta$ :
$$
\theta = \delta \int _ { 0 } ^ { 1 } \left( 2 \eta - \eta ^ { 2 } \right ) \left( 1 - 2 \eta + \eta ^ { 2 } \right ) \mathrm { d } \eta = \delta \left[ 1 - { \frac { 5 } { 3 } } + 1 - { \frac { 1 } { 5 } } \right ] = { \frac { 2 \delta } { 1 5 } } \qquad \tau _ { w } = \mu \left( { \frac { \partial u } { \partial y } } \right ) _ { 0 } = { \frac { 2 \mu U } { \delta } }
$$
$$
{ \frac { 2 \nu U } { \delta } } = { \frac { 2 U ^ { 2 } } { 1 5 } } { \frac { \mathrm { d } \delta } { \mathrm { d } x } } \quad \Longrightarrow \quad \int _ { 0 } ^ { \delta } \delta \, \mathrm { d } \delta = 1 5 { \frac { \nu } { U } } \int _ { 0 } ^ { x } \mathrm { d } x \quad \Longrightarrow \quad \boxed { \; \delta = { \sqrt { 3 0 } } \; { \frac { x } { \sqrt { \mathrm { R e } _ { x } } } } = { \frac { 5 . 4 8 \, x } { \sqrt { \mathrm { R e } _ { x } } } } \; } \quad \text{Blasius: } 4 . 9 2 \ \ ( + 1 1 \ \ \%)
$$
**The friction follows from the profile's wall slope, and the heat transfer from the thermal profile:**
$$
C _ { f , x } = { \frac { 4 \nu } { U \delta } } = { \frac { 0 . 7 3 0 } { \sqrt { \mathrm { R e } _ { x } } } } \ \ ( \text{exact } 0 . 6 6 4 , \ + 1 0 \ \ \%) \qquad q _ { w } = { \frac { 3 k \Delta T } { 2 \delta _ { t } } } \quad \Longrightarrow \quad \mathrm { N u } _ { x } = { \frac { 1 . 5 \, x } { \delta } } \, \mathrm { P r } ^ { 1 / 3 } = 0 . 2 7 4 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } \ \ ( \text{exact } 0 . 3 3 2 , \ - 1 7 \ \ \%)
$$
**What the method teaches.** **The exponents $\delta \propto x ^ { 1 / 2 }$ , $C _ { f } \propto \mathrm { R e } ^ { - 1 / 2 }$ and $\mathrm { N u } \propto \mathrm { R e } ^ { 1 / 2 } \mathrm { P r } ^ { 1 / 3 }$ come out of the assumed shapes and are robust; the constants $5 . 4 8$ and $0 . 2 7 4$ come out of the assumed shapes too and are not.** **The same method with a cubic profile gives $\delta = 4 . 6 4 \, x / \sqrt { \mathrm { R e } _ { x } }$ , within $6 \ \ \%$ of Blasius, which is the whole lesson about the integral method: it is a machine for turning guessed profiles into ten-per-cent answers, and it is the only route to boundary layers with pressure gradients, blowing or heat release, where no similarity solution exists.**
:::
:::

::: widget plot
title: Local heat-transfer coefficient against distance from the leading edge
f: 87.25*pow(x,-0.5); 33.29*pow(x,-0.2)
x: 10, 1000
y: 0, 30
labels: laminar, h = 2.76 x^-1/2; turbulent, h = 8.36 x^-1/5
caption: Local $h$ for a flat plate in air at $2 \ \mathrm { m / s }$ and $2 5 \ \mathrm { ^ \circ C }$ , against distance from the leading edge in millimetres. **The laminar curve is the steep one, and it is honest only up to $\mathrm { R e } _ { x } = 5 \times 1 0 ^ { 5 }$ , which at this speed is $x = 3 . 9 \ \mathrm { m }$ — so the whole curve is laminar and the turbulent curve is a counterfactual.** **Two readings matter. First, the leading $5 0 \ \mathrm { m m }$ of the plate cools per unit area about eight times as hard as the last $5 0 0 \ \mathrm { m m }$ , which is why heat-sink fins are short and many rather than long and few, and why the front row of any array does most of the work. Second, the two curves cross at $x \approx 2 5 \ \mathrm { m m }$ : tripping a boundary layer only pays once it is thick enough that the turbulent coefficient has overtaken the laminar one, which is why vortex generators on a wing sit well back from the leading edge while trips on a heat-transfer model sit within a few millimetres of it.**
:::

::: definition Turbulent and mixed boundary layers on a flat plate {#def-turbplate}
For $\mathrm { R e } _ { x }$ above transition, the one-seventh-power velocity profile gives, for $5 \times 1 0 ^ { 5 } < \mathrm { R e } _ { L } < 1 0 ^ { 7 }$ and $0 . 6 < \mathrm { P r } < 6 0$ ,
$$
{ \overline { { C } } } _ { f } = { \frac { 0 . 0 7 4 } { \mathrm { R e } _ { L } ^ { 0 . 2 } } } \qquad \mathrm { N u } _ { x } = 0 . 0 2 9 6 \, \mathrm { R e } _ { x } ^ { 0 . 8 } \, \mathrm { P r } ^ { 1 / 3 } \qquad { \overline { { \mathrm { N u } } } } _ { L } = 0 . 0 3 7 \, \mathrm { R e } _ { L } ^ { 0 . 8 } \, \mathrm { P r } ^ { 1 / 3 }
$$
**The Reynolds exponent rises from $1 / 2$ to $4 / 5$ , and the sensitivity to length falls with it: a laminar coefficient falls as $x ^ { - 1 / 2 }$ and a turbulent one as $x ^ { - 1 / 5 }$ , so a turbulent boundary layer is nearly indifferent to length.** **That is why a long turbulent surface is a cheap heat exchanger per unit area at its far end, and why the way to raise $h$ on a turbulent surface is to raise $U$ rather than to shorten the plate.**
**The mixed layer.** A real plate is laminar to $x _ { c }$ and turbulent beyond, and the average is the length-weighted sum:
$$
\boxed { \; { \overline { { \mathrm { N u } } } } _ { L } = \left( 0 . 0 3 7 \, \mathrm { R e } _ { L } ^ { 0 . 8 } - A \right ) \mathrm { P r } ^ { 1 / 3 } \; } \qquad A = \mathrm { R e } _ { c } \left( 0 . 0 3 7 \, \mathrm { R e } _ { c } ^ { - 0 . 2 } - 0 . 6 6 4 \, \mathrm { R e } _ { c } ^ { - 1 / 2 } \right )
$$
$$
\begin{array} { l c c c c c }
\mathrm { R e } _ { c } & 1 0 ^ { 5 } & 3 \times 1 0 ^ { 5 } & 5 \times 1 0 ^ { 5 } & 1 0 ^ { 6 } & 5 \times 1 0 ^ { 6 } \\
A & 1 6 0 & 5 2 7 & 8 7 1 & 1 6 7 1 & 6 9 7 5
\end{array}
$$
**The subtraction is not a rounding correction; at $\mathrm { R e } _ { L } = 1 0 ^ { 6 }$ it removes $3 7 \ \ \%$ of the answer.** **The physical content is that the first few per cent of the plate is laminar and cools far worse than the turbulent formula pretends, and that extrapolating $\mathrm { R e } ^ { 0 . 8 }$ back to zero invents a leading edge of infinite cooling.**
:::

::: widget plot
title: Average coefficient against wind speed, laminar and turbulent
f: 3.902*sqrt(x); 6.004*pow(x,0.8)
x: 0, 30
y: 0, 95
labels: laminar, 3.90 U^1/2; turbulent, 6.00 U^4/5
caption: Average $h$ over a $1 \ \mathrm { m }$ flat plate of air at $2 5 \ \mathrm { ^ \circ C }$ , against free-stream speed. **The laminar curve is valid only below $7 . 9 \ \mathrm { m / s }$ , where $\mathrm { R e } _ { L }$ reaches $5 \times 1 0 ^ { 5 }$ ; the turbulent curve is valid only above it; both are drawn beyond their range so that you can see the size of the mistake.** **At $2 \ \mathrm { m / s }$ the two differ by a factor of $1 . 9$ ; at $3 0 \ \mathrm { m / s }$ the laminar extrapolation would have you believe $2 1 \ \mathrm { W / m ^ { 2 } K }$ where the truth is nearer $7 1$ with the leading-edge correction, or $9 1$ without it.** **Read the slopes rather than the numbers: $h \propto U ^ { 1 / 2 }$ laminar and $U ^ { 4 / 5 }$ turbulent means that doubling the fan buys $4 1 \ \ \%$ on a laminar board and $7 4 \ \ \%$ on a turbulent one — and that the cheapest way to double a laminar board's cooling is not more flow but a trip wire.**
:::

::: example The same plate at three wind speeds {#ex-plate}
Air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ flows over a $1 \ \mathrm { m } \times 1 \ \mathrm { m }$ flat plate held at $8 5 \ \ {} ^ { \circ } \mathrm { C }$ , both faces exposed. Find the average coefficient and the total heat loss at $U = 2$ , $5$ and $3 0 \ \mathrm { m / s }$ . Properties at the film temperature $5 5 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 8 2 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 8 7 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 4$ .

::: solution
$$
\begin{array} { l c c c c }
U \ ( \mathrm { m / s } ) & \mathrm { R e } _ { L } & \text{Regime} & \overline { { h } } \ ( \mathrm { W / m ^ { 2 } K } ) & q \ \text{both faces} \ ( \mathrm { W } ) \\
2 & 1 . 1 0 \times 1 0 ^ { 5 } & \text{laminar} & 5 . 6 2 & 6 7 4 \\
5 & 2 . 7 5 \times 1 0 ^ { 5 } & \text{laminar} & 8 . 8 9 & 1 0 6 6 \\
3 0 & 1 . 6 5 \times 1 0 ^ { 6 } & \text{mixed} & 6 6 . 7 & 8 0 0 0
\end{array}
$$
**The arithmetic of the third row, which is the only interesting one:**
$$
\mathrm { R e } _ { L } = { \frac { 3 0 \times 1 } { 1 . 8 2 \times 1 0 ^ { - 5 } } } = 1 . 6 5 \times 1 0 ^ { 6 } \qquad { \overline { { \mathrm { N u } } } } = \left[ 0 . 0 3 7 \times \left( 1 . 6 5 \times 1 0 ^ { 6 } \right ) ^ { 0 . 8 } - 8 7 1 \right] \times 0 . 7 0 4 ^ { 1 / 3 } = ( 3 4 8 2 - 8 7 1 ) \times 0 . 8 8 9 6 = 2 3 2 3
$$
$$
\overline { { h } } = { \frac { 2 3 2 3 \times 0 . 0 2 8 7 } { 1 } } = 6 6 . 7 \ \mathrm { W / m ^ { 2 } K } \qquad q = 6 6 . 7 \times 2 \times 1 \times 6 0 = 8 0 0 0 \ \mathrm { W }
$$
**Three things to keep from this.** **From $2$ to $5 \ \mathrm { m / s }$ the speed rises by $2 . 5$ and $h$ by $1 . 5 8$ — the square-root law, and the reason a fan that moves two and a half times the air gives only half again the cooling.** **From $5$ to $3 0 \ \mathrm { m / s }$ the speed rises by $6$ and $h$ by $7 . 5$ , more than the speed, because the boundary layer has tripped.** **And the $8 7 1$ subtraction is worth $2 5 \ \ \%$ of the answer at $3 0 \ \mathrm { m / s }$ : the first $3 0 0 \ \mathrm { m m }$ of the plate is laminar, and pretending otherwise would have you believe $8 9 \ \mathrm { W / m ^ { 2 } K }$ .**
:::
:::

::: example A circuit board with uniform heat flux {#ex-pcb}
A $1 5 0 \ \mathrm { m m } \times 1 0 0 \ \mathrm { m m }$ board dissipates $8 \ \mathrm { W }$ uniformly from one face in a $3 \ \mathrm { m / s }$ stream of air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ flowing along the $1 5 0 \ \mathrm { m m }$ side. Estimate the wall temperature rise at the trailing edge and on average. (Take $\nu = 1 . 5 9 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 6 2 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 7$ .)

::: solution
$$
\mathrm { R e } _ { L } = { \frac { 3 \times 0 . 1 5 0 } { 1 . 5 9 \times 1 0 ^ { - 5 } } } = 2 . 8 3 \times 1 0 ^ { 4 } \qquad q ^ { \prime \prime } = { \frac { 8 } { 0 . 1 5 0 \times 0 . 1 0 0 } } = 5 3 3 \ \mathrm { W / m ^ { 2 } }
$$
**Deeply laminar — transition on this board would need $5 3 \ \mathrm { m / s }$ .** **For constant flux the local coefficient is the one that matters, because the wall temperature varies:**
$$
h _ { x } = 0 . 4 5 8 7 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } \, { \frac { k } { x } } = 4 . 6 5 \, x ^ { - 1 / 2 } \ \mathrm { W / m ^ { 2 } K } \qquad \Rightarrow \qquad h ( 0 . 1 5 0 \ \mathrm { m } ) = 1 2 . 0 \ \mathrm { W / m ^ { 2 } K }
$$
$$
\Delta T _ { \text{trailing} } = { \frac { 5 3 3 } { 1 2 . 0 } } = \mathbf { 4 4 \ \mathrm { K } } \qquad { \overline { { \Delta T } } } = { \frac { q ^ { \prime \prime } } { 4 . 6 5 } } \cdot { \frac { 2 } { 3 } } { \sqrt { L } } = { \frac { 5 3 3 \times 0 . 3 8 7 \times 2 } { 4 . 6 5 \times 3 } } = \mathbf { 3 0 \ \mathrm { K } }
$$
**The trailing edge runs $5 0 \ \ \%$ hotter than the mean, and the first $1 0 \ \mathrm { m m }$ of the board runs at only a quarter of the trailing-edge rise ($1 1 \ \mathrm { K }$).** **Three consequences that change board layouts.** **The hot chip goes at the front — not because air remembers anything, but because the boundary layer has not yet grown.** **Radiation is not negligible: with a solder-mask emissivity of $0 . 8 5$ and a $3 0 \ \mathrm { K }$ rise, $h _ { r } \approx 5 . 9$ against $h _ { c } \approx 1 8$ averaged, so about a quarter of the heat leaves radiatively and the real temperatures are correspondingly lower — and because that part does not grow with the airflow, doubling the fan buys less than the square-root law promises.** **And the board is a laminar flat plate only if the approach flow is smooth: a $3 \ \mathrm { m m }$ tall connector $3 0 \ \mathrm { m m }$ upstream disturbs the layer locally and usually cools the chip behind it better than the correlation says.**
:::
:::

## Everything that is not a plate: curvature, and separation

::: definition Cylinders and spheres in cross-flow {#def-cyl}
$$
\mathrm { N u } _ { D } = { \frac { { \bar { h } } D } { k } } = C \, \mathrm { R e } _ { D } ^ { n } \, \mathrm { P r } ^ { 1 / 3 } \quad \text{(Hilpert, cylinder)} \qquad \mathrm { N u } _ { D } = 2 + \left( 0 . 4 \, \mathrm { R e } _ { D } ^ { 1 / 2 } + 0 . 0 6 \, \mathrm { R e } _ { D } ^ { 2 / 3 } \right ) \mathrm { P r } ^ { 0 . 4 } \left( { \frac { \mu } { \mu _ { s } } } \right ) ^ { 1 / 4 } \quad \text{(Whitaker, sphere)}
$$
$$
\begin{array} { l c c c c c }
\mathrm { R e } _ { D } & 0 . 4 - 4 & 4 - 4 0 & 4 0 - 4 0 0 0 & 4 0 0 0 - 4 \times 1 0 ^ { 4 } & 4 \times 1 0 ^ { 4 } - 4 \times 1 0 ^ { 5 } \\
C & 0 . 9 8 9 & 0 . 9 1 1 & 0 . 6 8 3 & 0 . 1 9 3 & 0 . 0 2 7 \\
n & 0 . 3 3 0 & 0 . 3 8 5 & 0 . 4 6 6 & 0 . 6 1 8 & 0 . 8 0 5
\end{array}
$$
**The $2$ in Whitaker's sphere correlation is the conduction limit $\mathrm { N u } \to 2$ at zero Reynolds number, and it is the most useful $2$ in heat transfer: it says that a small sphere in stagnant gas has $h$ of at least $2 k / D$ , and it gives $h \approx 5 . 3 \ \mathrm { W / m ^ { 2 } K }$ for a $1 0 \ \mathrm { m m }$ bead in air — the floor under every "still air" coefficient quoted for small parts.** **The exponent $n$ climbing from $0 . 3 3$ to $0 . 8 1$ across the table is the wake taking over: at low $\mathrm { R e }$ the flow creeps round the cylinder and the heat transfer is nearly pure conduction, while at high $\mathrm { R e }$ the cylinder is a bluff body shedding a turbulent wake and the exponent approaches the flat-plate turbulent value.**
**The transition jump, and why it is a jump and not a dip.** Between $\mathrm { R e } _ { D } \approx 2 \times 1 0 ^ { 5 }$ and $5 \times 1 0 ^ { 5 }$ the boundary layer on a smooth circular cylinder turns turbulent before it separates, and measured local Nusselt numbers on the rear half rise sharply (Achenbach, 1975). **The mechanism is the one that keeps a golf ball flying: a laminar boundary layer separates at about $8 2 ^ { \circ }$ from the front stagnation point, but a layer that transitions before it separates carries momentum and clings on to about $1 2 0 ^ { \circ }$ , so the wake narrows, the pressure recovery improves, and the shear is renewed over a much larger arc of the surface.** **The correlations smooth the step over: in the Churchill–Bernstein correlation it appears as the factor $\left[ 1 + ( \mathrm { R e } / 2 8 2 { , } 0 0 0 ) ^ { 5 / 8 } \right] ^ { 4 / 5 }$ , which climbs from $1 . 6$ to $2 . 0$ across the band, so the fitted average doubles for a $2 . 5$-fold rise in speed. The same physics is why a roughened cylinder, a dimpled tube and a turbulated exchanger surface all trade a little friction for a great deal of heat.**
:::

::: example A hot steel rod in cross-flow, with the part the correlation leaves out {#ex-rod}
A $2 5 \ \mathrm { m m }$ diameter steel bar with a surface at $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ is cooled by air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ moving across it at $1 0 \ \mathrm { m / s }$ . Take $\varepsilon = 0 . 8$ for the oxidised surface and surroundings at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ .

::: solution
**Film temperature** $T _ { f } = ( 3 0 0 + 2 5 ) / 2 = 1 6 2 \ \ {} ^ { \circ } \mathrm { C }$ , at which $\nu = 3 . 0 8 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 3 5 6 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 6 8 9$ .
$$
\mathrm { R e } _ { D } = { \frac { 1 0 \times 0 . 0 2 5 } { 3 . 0 8 \times 1 0 ^ { - 5 } } } = 8 1 2 0 \qquad \mathrm { N u } = 0 . 1 9 3 \times 8 1 2 0 ^ { 0 . 6 1 8 } \times 0 . 6 8 9 ^ { 1 / 3 } = 0 . 1 9 3 \times 2 6 1 \times 0 . 8 8 3 = 4 4 . 4
$$
$$
h = { \frac { 4 4 . 4 \times 0 . 0 3 5 6 } { 0 . 0 2 5 } } = 6 3 . 3 \ \mathrm { W / m ^ { 2 } K } \qquad q _ { \text{conv} } ^ { \prime } = 6 3 . 3 \times \pi \times 0 . 0 2 5 \times 2 7 5 = \mathbf { 1 3 7 0 \ \mathrm { W / m } }
$$
**Now the part no correlation contains:**
$$
h _ { r } = \varepsilon \sigma \left( T _ { w } + T _ { \text{sur} } \right) \left( T _ { w } ^ { 2 } + T _ { \text{sur} } ^ { 2 } \right) = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times 8 7 1 \times 4 . 1 7 \times 1 0 ^ { 5 } = 1 6 . 5 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q _ { \text{total} } ^ { \prime } = ( 6 3 . 3 + 1 6 . 5 ) \times \pi \times 0 . 0 2 5 \times 2 7 5 = \mathbf { 1 7 2 0 \ \mathrm { W / m } } \qquad \text{radiation is } \mathbf { 2 1 \ \ \% }
$$
**The correlation is good to $\pm 2 5 \ \ \%$ ; the omission is $2 1 \ \ \%$ , and unlike the correlation it does not shrink when you get the Reynolds number right.** **At $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ surface in the same $1 0 \ \mathrm { m / s }$ it would be $9 \ \ \%$ , and at $2 5 \ \mathrm { K }$ above ambient $7 \ \ \%$ ; in a gentle flow the same surfaces would lose a third of their heat by radiation. The fraction is set by the temperature and by how strong the convection is.** **It is also the reason a "convection coefficient" measured on a hot surface in a laboratory is systematically too high unless somebody subtracted the radiation before reporting it — and why the same coefficient, applied to a low-emissivity polished part, over-predicts.**
:::
:::

::: definition What makes a boundary layer transition {#def-transition}
**$\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$ is a wind-tunnel result, not a fluid property.** Transition is triggered by whatever the incoming flow and the surface hand to the Tollmien-Schlichting waves in the layer, and the practical catalogue is:
$$
\begin{array} { l l l }
\text{Free-stream turbulence} & 0 . 1 \ \% \rightarrow 5 \ \% & \mathrm { R e } _ { c } : \ 3 \times 1 0 ^ { 6 } \rightarrow 1 \times 1 0 ^ { 5 } , \ \text{the largest single factor} \\
\text{Surface roughness} & \text{roughness Reynolds number } u _ { k } k _ { s } / \nu \text{ of a few hundred} & \text{trips at the roughness, not at } \mathrm { R e } _ { c } \\
\text{Leading-edge geometry} & \text{sharp} \rightarrow \text{blunt} & \text{separation bubble; a rolled edge delays, a sharp one can force it earlier} \\
\text{Pressure gradient} & \text{favourable} \rightarrow \text{adverse} & \text{delays} \rightarrow \text{hastens; the reason a diffuser transitions and a nozzle does not} \\
\text{Wall temperature} & \text{cooled wall (gas), heated wall (liquid)} & \text{stabilises, by making the near-wall profile fuller; the reverse destabilises} \\
\text{Vibration, acoustics} & \text{forcing near the instability frequencies} & \text{hastens transition}
\end{array}
$$
**The engineering consequence is that in a machine, not a tunnel, the safe assumption is $\mathrm { R e } _ { c } \approx 1 \times 1 0 ^ { 5 }$ and the honest one is to compute both regimes and take whichever hurts.** **Where the choice is expensive, fit a trip: a thin wire or a strip of grit near the leading edge makes the heat transfer predictable at the cost of the turbulent drag the analogy says goes with it, and predictability is what you are buying.**
:::

## Banks of tubes: the geometry of every real heat exchanger

A single cylinder is a laboratory object. What a designer builds is a **bank**: dozens or hundreds of tubes in a duct, in line or staggered, with the fluid crossing them. The bank is not a collection of independent cylinders, and the difference is the whole content of the correlation.

::: definition Cross-flow over tube banks (Zukauskas) {#def-bank}
For a bank of $N _ { L }$ rows deep in a fluid crossing it, with transverse pitch $S _ { T }$ and longitudinal pitch $S _ { L }$, the average Nusselt number over all rows is
$$
\boxed { \; \mathrm { N u } _ { D } = C \, \mathrm { R e } _ { D , \max } ^ { m } \, \mathrm { P r } ^ { 0 . 3 6 } \left( \frac { \mathrm { P r } } { \mathrm { P r } _ { s } } \right) ^ { 1 / 4 } \; }
$$
with properties at the mean of the inlet and outlet fluid temperatures (except $\mathrm { P r } _ { s }$ , at the surface), the constants below (Zukauskas, as tabulated in Incropera et al., *Fundamentals of Heat and Mass Transfer*, Chapter 7; range $1 0 ^ { 3 } < \mathrm { R e } _ { D , \max } < 2 \times 1 0 ^ { 5 }$, $0 . 7 < \mathrm { P r } < 5 0 0$, banks of twenty rows or more) and, for a shallower bank, the empirical row correction $\varepsilon _ { N }$ of the second table (staggered values):
$$
\begin{array} { l c c c }
& \text{Arrangement} & C & m \\
\text{Staggered, } S _ { T } / S _ { L } < 2 & \text{staggered} & 0 . 3 5 \left( S _ { T } / S _ { L } \right) ^ { 1 / 5 } & 0 . 6 0 \\
\text{In line, } S _ { T } / S _ { L } > 0 . 7 & \text{in line} & 0 . 2 7 & 0 . 6 3
\end{array}
$$
$$
\begin{array} { l c c c c c c c c }
N _ { L } & 1 & 2 & 3 & 4 & 5 & 7 & 1 0 & \geq 2 0 \\
\varepsilon _ { N } & 0 . 6 4 & 0 . 7 6 & 0 . 8 4 & 0 . 8 9 & 0 . 9 2 & 0 . 9 5 & 0 . 9 7 & 1 . 0 0
\end{array}
$$
**Three things are hidden in that innocent-looking $\mathrm { R e } _ { D , \max }$, and getting them wrong is the standard tube-bank error.**
**(i) The Reynolds number uses the velocity at the tightest gap, not the approach velocity.** For an in-line bank the gap is between adjacent tubes; for a staggered bank it may also be on the diagonal:
$$
V _ { \max } = { \frac { S _ { T } } { S _ { T } - D } } \, { \overline { { V } } } \quad ( \text{in line, and staggered unless } 2 ( S _ { D } - D ) < S _ { T } - D ) \qquad V _ { \max } = { \frac { S _ { T } } { 2 \left( S _ { D } - D \right) } } \, { \overline { { V } } } \quad ( \text{staggered, diagonal gap tighter} ) , \qquad S _ { D } = \sqrt { S _ { L } ^ { 2 } + ( S _ { T } / 2 ) ^ { 2 } }
$$
**At a typical $S _ { T } / D = 2$ the gap velocity is twice the approach velocity, so the Reynolds number — and through it the heat transfer and the pressure drop — is set by a number that never appears on the datasheet.**
**(ii) The first rows are worse than the last.** A row sits in the wake of the row in front, which is turbulent but slow and hot. $\varepsilon _ { N }$ says the first row has only about two thirds of the deep-bank coefficient, because it sees the undisturbed approach flow rather than the turbulence generated by the rows ahead, and that the correlation's constants were fitted on a bank deep enough to have forgotten the entrance.
**(iii) The pressure drop is a separate correlation, and it is worse-tempered than the heat transfer:**
$$
\Delta p = N _ { L } \, \chi \, \frac { \rho V _ { \max } ^ { 2 } } { 2 }
$$
with the friction factor $\chi$ (here including the pitch correction) read from Zukauskas's charts against $\mathrm { R e } _ { D , \max }$ and the pitch ratios (Zukauskas 1972); at $\mathrm { R e } \approx 1 0 ^ { 4 }$ and common pitches it is a few tenths. **That matters, because the fan power is $\Delta p \, { \dot { m } } / \rho$ and the whole economics of an air-cooled exchanger is the ratio of that to the heat rate.** **Staggered banks are usually chosen for heat, in-line banks for cleanability: the in-line bank's straight lanes can be reached with a cleaning lance and the staggered one's cannot.**
:::

::: widget plot
title: Average Nusselt number of a tube bank against the gap Reynolds number
f: 0.3666*pow(10,0.6*x)*0.884; 0.27*pow(10,0.63*x)*0.884
x: 3, 5.3
y: 0, 550
labels: staggered St/Sl = 1.26, C = 0.367, m = 0.60; in line, C = 0.27, m = 0.63
caption: $\overline { { \mathrm { N u } } } _ { D }$ for a deep bank in air ($\mathrm { P r } = 0 . 7 1$) against $\log _ { 1 0 } \mathrm { R e } _ { D , \max }$. **The two curves are the two power laws, and at this pitch they lie within about $1 0 \ \ \%$ of each other over the whole range — the staggered line above at low $\mathrm { R e }$ , the in-line one above near $1 0 ^ { 5 }$ — so the choice between the arrangements is usually made on pressure drop and cleaning access rather than on $h$ .** **Read the range rather than the lines: air-side practice mostly sits between $\mathrm { R e } = 1 0 ^ { 3 }$ and $1 0 ^ { 5 }$ , i.e. between $h \approx 2 7$ and $h \approx 4 3 0 \ \mathrm { W / m ^ { 2 } K }$ for bare $2 0 \ \mathrm{mm}$ tubes, so "air-side $h$ is about $5 0 \ \mathrm { W / m ^ { 2 } K }$" is a statement about low-speed practice, not about air.** **Above $\mathrm { R e } \approx 2 \times 1 0 ^ { 5 }$ the constants change; below $1 0 ^ { 3 }$ the exponent falls towards $1 / 2$ .**
:::

::: example A twenty-row air heater {#ex-bank}
Air entering at $1 5 \ \ {} ^ { \circ } \mathrm { C }$ approaches a staggered bank of $2 0$ rows $\times$ $1 2$ tubes at $6 \ \mathrm { m / s }$. The tubes are $1 6 . 4 \ \mathrm{mm}$ OD, $S _ { T } = 3 2 \ \mathrm { m m }$, $S _ { L } = 2 5 . 4 \ \mathrm { m m }$, $6 0 0 \ \mathrm{mm}$ long, and are held at $1 2 0 \ \ {} ^ { \circ } \mathrm { C }$ by condensing steam inside. For simplicity take all air properties, including the density $1 . 1 2 8 \ \mathrm { k g / m ^ { 3 } }$ , at the mean air temperature of about $4 0 \ \ {} ^ { \circ } \mathrm { C }$ , and neglect the $( \mathrm { P r } / \mathrm { P r } _ { s } ) ^ { 1 / 4 }$ factor. Estimate the air outlet temperature, the heat rate and the blower power.

::: solution
**Gap velocity and Reynolds number.** The diagonal pitch is $S _ { D } = \sqrt { 2 5 . 4 ^ { 2 } + 1 6 ^ { 2 } } = 3 0 . 0 \ \mathrm { m m }$ , and $2 ( S _ { D } - D ) = 2 7 . 2 \ \mathrm { m m }$ exceeds $S _ { T } - D = 1 5 . 6 \ \mathrm { m m }$ , so the transverse gap is the tight one:
$$
V _ { \max } = { \frac { 3 2 } { 3 2 - 1 6 . 4 } } \times 6 = 1 2 . 3 \ \mathrm { m / s } \qquad \mathrm { R e } _ { D , \max } = { \frac { 1 2 . 3 \times 0 . 0 1 6 4 }{ 1 . 7 0 \times 1 0 ^ { - 5 } } } = 1 . 1 9 \times 1 0 ^ { 4 }
$$
**(Properties at the mean air temperature, about $4 0 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 1 . 7 0 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 7$, $c _ { p } = 1 0 0 7 \ \mathrm { J / k g \, K }$.)**
$$
C = 0 . 3 5 \times 1 . 2 6 ^ { 1 / 5 } = 0 . 3 6 7 \qquad \mathrm { N u } = 0 . 3 6 7 \times \left( 1 . 1 9 \times 1 0 ^ { 4 } \right) ^ { 0 . 6 } \times 0 . 7 0 7 ^ { 0 . 3 6 } = 0 . 3 6 7 \times 2 7 8 \times 0 . 8 8 3 = 9 0
$$
$$
h = { \frac { 9 0 \times 0 . 0 2 7 2 } { 0 . 0 1 6 4 } } = 1 4 9 \ \mathrm { W / m ^ { 2 } K }
$$
**Mass flow and area.** The flow area seen by the approach velocity is $1 2 \times 0 . 0 3 2 \times 0 . 6 0 0 = 0 . 2 3 0 \ \mathrm { m ^ { 2 } }$:
$$
{ \dot { m } } = 1 . 1 2 8 \times 6 \times 0 . 2 3 0 = 1 . 5 6 \ \mathrm { k g / s } \qquad A _ { s } = 2 0 \times 1 2 \times \pi \times 0 . 0 1 6 4 \times 0 . 6 0 0 = 7 . 4 2 \ \mathrm { m ^ { 2 } }
$$
**Outlet temperature.** The tube surface is isothermal (condensing steam), so the surface-side effectiveness form applies:
$$
\mathrm { N T U } = { \frac { h A _ { s } } { { \dot { m } } c _ { p } } } = { \frac { 1 4 9 \times 7 . 4 2 } { 1 . 5 6 \times 1 0 0 7 } } = 0 . 7 0 6 \qquad { \frac { T _ { s } - T _ { o } } { T _ { s } - T _ { i } } } = e ^ { - 0 . 7 0 6 } = 0 . 4 9 4
$$
$$
T _ { o } = 1 2 0 - 0 . 4 9 4 \times 1 0 5 = \mathbf { 6 8 \ \mathrm { ^ \circ C } } \qquad { \dot { Q } } = 1 . 5 6 \times 1 0 0 7 \times ( 6 8 . 2 - 1 5 ) = \mathbf { 8 3 \ \mathrm { k W } }
$$
**Pressure drop and blower power.** Taking $\chi \approx 0 . 4$ for a staggered bank at this Reynolds number:
$$
\Delta p = 2 0 \times 0 . 4 \times { \frac { 1 . 1 2 8 \times 1 2 . 3 ^ { 2 } } { 2 } } = 0 . 6 8 \ \mathrm { k P a } \qquad P _ { \text{fan} } = { \frac { \Delta p \, { \dot { m } } } { \rho } } = { \frac { 6 8 0 \times 1 . 5 6 } { 1 . 1 2 8 } } = \mathbf { 0 . 9 4 \ \mathrm { k W } }
$$
**Three sanity checks worth doing on every exchanger calculation.** **The volume power density is $8 3 \ \mathrm { k W }$ in $2 0 \times 0 . 0 2 5 4 \times 0 . 3 8 4 \times 0 . 6 = 0 . 1 2 \ \mathrm { m ^ { 3 } }$, i.e. about $7 0 0 \ \mathrm { k W / m ^ { 3 } }$ .** **The air recovers $5 1 \ \ \%$ of the available temperature difference, and $\mathrm { N T U } = 0 . 7 1$ says it could not do much better without more area.** **And the blower is $1 . 1 \ \ \%$ of the heat — which sounds negligible and is not: at $0 . 9 4 \ \mathrm { k W }$ for $8 3 \ \mathrm { k W }$ the fan costs about one unit of electricity for every ninety of heat, and doubling the airflow would raise the fan power roughly eightfold ( $\Delta p \propto V ^ { 2 }$ , power $\propto V ^ { 3 }$ ) for about $1 . 6$ times the heat. Exchangers are sized as much by the pumping power you are willing to install as by area.**
:::
:::

::: definition Jets, rotating discs and other forced flows {#def-jets}
**Impinging jets.** Turning a jet normal to a surface defeats the boundary layer rather than managing it: the flow is brought to rest at the stagnation point, so the layer is thinned to nothing and rebuilt from scratch every millimetre. For a single round nozzle of diameter $D$ at stand-off $H$ , Martin's (1977) correlation for the coefficient averaged over a disc of radius $r$ is
$$
\frac { \overline { { \mathrm { N u } } } } { \mathrm { P r } ^ { 0 . 4 2 } } = \frac { D } { r } \, \frac { 1 - 1 . 1 \, D / r } { 1 + 0 . 1 \, ( H / D - 6 ) \, D / r } \; 2 \, \mathrm { R e } ^ { 1 / 2 } \left( 1 + 0 . 0 0 5 \, \mathrm { R e } ^ { 0 . 5 5 } \right) ^ { 1 / 2 } \qquad \left( \overline { { \mathrm { N u } } } = \frac { \overline { { h } } D } { k } , \ \mathrm { R e } = \frac { V _ { e } D } { \nu } , \ 2 0 0 0 \leq \mathrm { R e } \leq 4 \times 1 0 ^ { 5 } , \ 2 \leq \frac { H } { D } \leq 1 2 , \ 2 . 5 \leq \frac { r } { D } \leq 7 . 5 \right)
$$
**The local coefficient is highest near the stagnation point and decays outward along the wall jet; at small stand-offs ($H / D \lesssim 4$) the radial distribution also shows a secondary peak near $r / D \approx 2$ where the wall jet turns turbulent.** **The stand-off matters too: the stagnation coefficient is greatest when the plate sits near the end of the jet's potential core, a few to several diameters out, and falls once the jet has spread.** **Arrays of small jets are the usual way to cover a large area evenly, which is why real jet systems are perforated plates — and why their commonest field failure is that the holes clog.**
**Rotating discs.** A disc spinning in gas drags fluid outward by viscosity; the centrifugal pumping keeps the layer thin. For a free isothermal disc in air the local coefficient is approximately (see Owen & Rogers 1989)
$$
\mathrm { N u } _ { r } = { \frac { h r } { k } } \approx { \begin{cases} 0 . 3 3 \, \mathrm { R e } _ { \varphi } ^ { 1 / 2 } & \text{laminar, } \mathrm { R e } _ { \varphi } \lesssim 2 . 5 \times 1 0 ^ { 5 } \\ 0 . 0 1 9 5 \, \mathrm { R e } _ { \varphi } ^ { 4 / 5 } & \text{turbulent} \end{cases} } \qquad \mathrm { R e } _ { \varphi } = { \frac { \omega r ^ { 2 } } { \nu } }
$$
with transition spread over roughly $\mathrm { R e } _ { \varphi } = 2$ to $3 \times 1 0 ^ { 5 }$ ; averaged over a turbulent disc the second form gives $\overline { { \mathrm { N u } } } \approx 0 . 0 1 5 \, \mathrm { R e } ^ { 0 . 8 }$ , the figure usually quoted from Cobb and Saunders's measurements.
**Laminar: $\mathrm { N u } _ { r } \propto r ^ { 1 / 2 }$ , so $h = \mathrm { N u } \, k / r$ is independent of radius — every annulus of a laminar disc cools equally well per unit area.** **Turbulent: $h \propto r ^ { 0 . 6 }$ , so the rim does most of the work, and the transition radius $r _ { c } = { \sqrt { 2 . 5 \times 1 0 ^ { 5 } \nu / \omega } }$ is the number to compute first.**
**Packed beds and fluidised beds.** A packed bed is a tube bank with no lanes: the heat-transfer coefficient between gas and particles is correlated as a $j$-factor against a particle Reynolds number, in the same Chilton–Colburn spirit, and a correlation of that kind (for example Whitaker's or Wakao and Kaguei's, to be taken from the source with its own definitions) is the basis of packed-bed reactor and grain-dryer calculations. **The pressure drop, however, is not a heat-transfer problem at all but an Ergun-equation one, and the two must be combined: smaller pellets give more area and a higher coefficient but a pressure drop that rises as $d _ { p } ^ { - 1 }$ to $d _ { p } ^ { - 2 }$ , and the pellet size is a compromise between the two.**
:::

::: widget plot
title: Heat-transfer coefficient on a free rotating disc against radius
f: 74; 679*pow(x,0.6)
x: 0.05, 0.35
y: 0, 400
labels: laminar, h = 74 W/m2K (uniform); turbulent, h = 679 r^0.6
caption: A turbine disc at $1 2 { , } 0 0 0 \ \mathrm { rpm }$ in air at $4 0 0 \ \ {} ^ { \circ } \mathrm { C }$ ($\nu = 6 . 3 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 5 0 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 8 $). **The horizontal line is the laminar disc: because $\mathrm { N u } \propto r ^ { 1 / 2 }$ and $h = \mathrm { N u } \, k / r$ , the radius cancels and the coefficient is the same at every radius — a rare result, and a useful check on any rotating calculation you ever do.** **The rising curve is the turbulent law, which applies outside the transition radius $r _ { c } = 1 1 3 \ \mathrm { m m }$ : there it gives about $1 8 0$ , rising to $3 0 0 \ \mathrm { W / m ^ { 2 } K }$ at $r = 2 5 0 \ \mathrm { m m }$ . The jump from $7 4$ at $r _ { c }$ is not real — the actual transition is spread over a band of radii — but the factor of two to four between the laminar core and the turbulent rim is.** **Halving the speed moves $r _ { c }$ out by $\sqrt { 2 }$ and drops the turbulent $h$ at a given radius by $2 ^ { 0 . 8 } = 1 . 7 4$ , since $h \propto \omega ^ { 0 . 8 } r ^ { 0 . 6 }$ : on a disc the speed is worth more than the size.**
:::

## Exercises

::: exercise A small plate, done properly {#ex-small level=1 check="27.2"}
Air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ blows at $5 \ \mathrm { m / s }$ over a $2 0 0 \ \mathrm { m m } \times 2 0 0 \ \mathrm { m m }$ plate held at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ (one face only). Find the average coefficient and the heat loss. (Use the film-temperature properties $\nu = 1 . 7 3 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 7 3 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 6$ ; enter the heat loss in W.)
::: solution
**Film temperature** $T _ { f } = ( 2 5 + 6 0 ) / 2 = 4 2 . 5 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 1 . 7 3 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 7 3 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 6$.
$$
\mathrm { R e } _ { L } = { \frac { 5 \times 0 . 2 0 0 } { 1 . 7 3 \times 1 0 ^ { - 5 } } } = 5 . 7 8 \times 1 0 ^ { 4 } \qquad ( \text{laminar, a factor of about } 9 \text{ below transition} )
$$
$$
\overline { { \mathrm { N u } } } = 0 . 6 6 4 \times \left( 5 . 7 8 \times 1 0 ^ { 4 } \right) ^ { 1 / 2 } \times 0 . 7 0 6 ^ { 1 / 3 } = 0 . 6 6 4 \times 2 4 0 \times 0 . 8 9 0 = 1 4 2 \qquad { \overline { { h } } } = { \frac { 1 4 2 \times 0 . 0 2 7 3 } { 0 . 2 0 0 } } = 1 9 . 4 \ \mathrm { W / m ^ { 2 } K }
$$
$$
{ \dot { Q } } = 1 9 . 4 \times 0 . 0 4 0 0 \times 3 5 = \mathbf { 2 7 . 2 \ \mathrm { W } }
$$
**Nineteen is the number to remember for air at $5 \ \mathrm { m / s }$ over a short plate — a brisk wind, and still some sixty times less than water manages over the same plate at $0 . 5 \ \mathrm { m / s }$.** **Note also that the plate is small enough to stay laminar: transition would need about $4 3 \ \mathrm { m / s }$ on this length, so a designer who reached for the pure $0 . 0 3 7 \, \mathrm { R e } ^ { 0 . 8 }$ formula would get $2 9 \ \mathrm { W / m ^ { 2 } K }$ and $4 1 \ \mathrm { W }$ , half as much again.**
:::
:::

::: exercise Which way does the air go? {#ex-orient level=2 check="22"}
A $1 5 0 \ \mathrm { m m } \times 1 0 0 \ \mathrm { m m }$ board is to be cooled in a $3 \ \mathrm { m / s }$ stream of air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$. The duct will accept the board either way round. What percentage more heat does the better orientation remove, taking $h$ to be the average over the board and the same board-to-air temperature difference in both cases? (Enter the answer in per cent.) (Properties at $2 5 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 1 . 5 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 6 2 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 7$.)
::: solution
**Both orientations are laminar** ($\mathrm { R e } _ { L } = 2 . 8 8 \times 1 0 ^ { 4 }$ along $1 5 0 \ \mathrm { m m }$, $1 . 9 2 \times 1 0 ^ { 4 }$ along $1 0 0 \ \mathrm { m m }$), so
$$
\overline { { h } } = { \frac { k } { L } } \, 0 . 6 6 4 \, \mathrm { R e } _ { L } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } \propto L ^ { - 1 / 2 } \qquad { \frac { { \overline { { h } } } _ { 1 0 0 } } { { \overline { { h } } } _ { 1 5 0 } } } = { \sqrt { \frac { 1 5 0 } { 1 0 0 } } } = 1 . 2 2 5
$$
$$
{ \overline { { h } } } _ { 1 5 0 } = 1 7 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad { \overline { { h } } } _ { 1 0 0 } = 2 1 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad + \mathbf { 2 2 \ \ \% }
$$
**Flow across the short dimension wins, and by exactly the square root of the length ratio — the laminar answer, and the reason a heat-sink fin is short.** **Two caveats that change the answer in practice. The area is the same either way, so this is a pure coefficient comparison; if the duct's pressure drop changes with orientation, the $3 \ \mathrm { m / s }$ is not the same in both cases and the fan curve decides. And the ratio is a laminar result: for a turbulent layer $h \propto L ^ { - 0 . 2 }$ and the same swap buys only $8 \ \ \%$ — which is a good way to remember that orientation matters most exactly where the flow is gentlest.**
:::
:::

::: exercise A pipe in the wind, with the part the correlation leaves out {#ex-pipe level=2 check="980"}
A $3 0 \ \mathrm { m m }$ OD pipe whose surface is at $2 2 0 \ \ {} ^ { \circ } \mathrm { C }$ runs across an open shed, and air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ moves past it at $5 \ \mathrm { m / s }$. Take $\varepsilon = 0 . 8 5$ for the painted surface and the surroundings at $2 5 \ \ {} ^ { \circ } \mathrm { C }$. What is the total heat loss per metre? (Enter the answer in W/m.)
::: solution
**Film temperature** $1 2 2 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 2 . 6 0 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 3 3 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 9 0$.
$$
\mathrm { R e } _ { D } = { \frac { 5 \times 0 . 0 3 0 } { 2 . 6 0 \times 1 0 ^ { - 5 } } } = 5 7 7 0 \qquad \mathrm { N u } = 0 . 1 9 3 \times 5 7 7 0 ^ { 0 . 6 1 8 } \times 0 . 6 9 0 ^ { 1 / 3 } = 0 . 1 9 3 \times 2 1 1 \times 0 . 8 8 4 = 3 6
$$
$$
h = { \frac { 3 6 \times 0 . 0 3 3 8 } { 0 . 0 3 0 } } = 4 0 . 6 \ \mathrm { W / m ^ { 2 } K } \qquad q _ { \text{conv} } ^ { \prime } = 4 0 . 6 \times \pi \times 0 . 0 3 0 \times 1 9 5 = 7 4 5 \ \mathrm { W / m }
$$
**Radiation, on the same area:**
$$
h _ { r } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 4 9 3 + 2 9 8 ) ( 4 9 3 ^ { 2 } + 2 9 8 ^ { 2 } ) = 1 2 . 7 \ \mathrm { W / m ^ { 2 } K } \qquad q _ { \text{rad} } ^ { \prime } = 1 2 . 7 \times \pi \times 0 . 0 3 0 \times 1 9 5 = 2 3 3 \ \mathrm { W / m }
$$
$$
q ^ { \prime } = 7 4 5 + 2 3 3 = 9 7 8 \approx \mathbf { 9 8 0 \ \mathrm { W / m } }
$$
**Radiation is $2 4 \ \ \%$ of the total, and it does not care one jot about the $5 \ \mathrm { m / s }$.** **Two checks. The Hilpert constants were fitted for a smooth cylinder in a low-turbulence stream and are good to $\pm 2 5 \ \ \%$; the radiation term is good to whatever $\varepsilon = 0 . 8 5$ is good to, which should be checked for the actual paint. And the answer is a heat loss you can feel: a $1 0 \ \mathrm m$ run of this pipe leaks $9 . 8 \ \mathrm { k W }$ , the output of a small domestic boiler, and insulating it is one of the cheapest energy savings in the building.**
:::
:::

::: exercise How fast does a hot ball cool in air? {#ex-ball level=2 check="12.8"}
A $5 0 \ \mathrm { m m }$ diameter copper sphere ($\rho = 8 9 3 3 \ \mathrm { k g / m ^ { 3 } }$, $c = 4 0 0 \ \mathrm { J / k g \, K }$) is taken from a $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$ oven and held in a $2 5 \ \ {} ^ { \circ } \mathrm { C }$ air stream at $5 \ \mathrm { m / s }$. What is its initial rate of cooling? (Enter the answer in K per minute; take $\mu _ { \infty } / \mu _ { s } = 1 . 8 4 / 2 . 5 8$.)
::: solution
**Film temperature** $1 1 2 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 2 . 5 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 3 2 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 9 4$. Whitaker:
$$
\mathrm { R e } _ { D } = { \frac { 5 \times 0 . 0 5 0 } { 2 . 5 6 \times 1 0 ^ { - 5 } } } = 9 7 7 0
$$
$$
\mathrm { N u } = 2 + \left( 0 . 4 \times 9 7 7 0 ^ { 1 / 2 } + 0 . 0 6 \times 9 7 7 0 ^ { 2 / 3 } \right) \times 0 . 6 9 4 ^ { 0 . 4 } \times \left( { \frac { 1 . 8 4 } { 2 . 5 8 } } \right) ^ { 1 / 4 } = 2 + ( 3 9 . 5 + 2 7 . 5 ) \times 0 . 8 6 2 \times 0 . 9 1 9 = 5 5
$$
$$
h = { \frac { 5 5 \times 0 . 0 3 2 8 } { 0 . 0 5 0 } } = 3 6 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad { \frac { \rho c V } { h A } } = { \frac { \rho c D } { 6 h } } = { \frac { 8 9 3 3 \times 4 0 0 \times 0 . 0 5 0 } { 6 \times 3 6 . 2 } } = 8 2 3 \ \mathrm { s }
$$
$$
\left. { \frac { \mathrm { d } T } { \mathrm { d } t } } \right| _ { 0 } = { \frac { 1 7 5 } { 8 2 3 } } = 0 . 2 1 3 \ \mathrm { K / s } = \mathbf { 1 2 . 8 \ \mathrm { K / m i n } }
$$
**About five seconds per degree — and the lumped assumption is excellent here, $\mathrm { B i } = h D / 6 k = 3 6 . 2 \times 0 . 0 0 8 3 3 / 3 8 5 = 0 . 0 0 0 8$.** **The point of the exercise is the size of the number: a big copper ball in a strong air stream cools at about thirteen degrees a minute, and the same ball in water at $h = 3 0 0 0$ would cool some eighty times faster. Air is a poor coolant and velocity only partly hides it, because $h$ grows only as about $U ^ { 1 / 2 }$ to $U ^ { 2 / 3 }$ .** **The $2$ in Whitaker's correlation contributed $4 \ \ \%$ of the Nusselt number here; at $0 . 5 \ \mathrm { m / s }$ it would contribute $1 2 \ \ \%$ , and only for small particles in gentle flow does it become most of the answer.**
:::
:::

::: exercise What a trip wire buys {#ex-trip level=3 check="2.0"}
Air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ and $2 0 \ \mathrm { m / s }$ flows over a $5 0 0 \ \mathrm { m m }$ flat plate. In a clean tunnel the boundary layer would transition at $\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$; a $0 . 5 \ \mathrm { m m }$ wire is glued across the plate $5 0 \ \mathrm { m m }$ from the leading edge. By what factor does the average coefficient rise? (Enter the ratio of the tripped to the untripped average coefficient; $\nu = 1 . 5 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 6 2 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 7$.)
::: solution
$$
\mathrm { R e } _ { L } = { \frac { 2 0 \times 0 . 5 0 0 } { 1 . 5 6 \times 1 0 ^ { - 5 } } } = 6 . 4 1 \times 1 0 ^ { 5 } \qquad \mathrm { R e } _ { c , \text{trip} } = { \frac { 2 0 \times 0 . 0 5 0 } { 1 . 5 6 \times 1 0 ^ { - 5 } } } = 6 . 4 1 \times 1 0 ^ { 4 }
$$
**Without the trip, $7 8 \ \ \%$ of the plate is laminar:**
$$
A = 5 \times 1 0 ^ { 5 } \left[ 0 . 0 3 7 \left( 5 \times 1 0 ^ { 5 } \right) ^ { - 0 . 2 } - 0 . 6 6 4 \left( 5 \times 1 0 ^ { 5 } \right) ^ { - 0 . 5 } \right] = 8 7 1
$$
$$
\overline { { \mathrm { N u } } } = \left[ 0 . 0 3 7 \left( 6 . 4 1 \times 1 0 ^ { 5 } \right) ^ { 0 . 8 } - 8 7 1 \right] \times 0 . 8 9 1 = ( 1 6 3 6 - 8 7 1 ) \times 0 . 8 9 1 = 6 8 1 \qquad { \overline { { h } } } = 3 5 . 7 \ \mathrm { W / m ^ { 2 } K }
$$
**With the trip, only $1 0 \ \ \%$ is laminar, and the leading-edge subtraction collapses:**
$$
A = 6 . 4 1 \times 1 0 ^ { 4 } \left[ 0 . 0 3 7 \left( 6 . 4 1 \times 1 0 ^ { 4 } \right) ^ { - 0 . 2 } - 0 . 6 6 4 \left( 6 . 4 1 \times 1 0 ^ { 4 } \right) ^ { - 0 . 5 } \right] = 9 1
$$
$$
\overline { { \mathrm { N u } } } = ( 1 6 3 6 - 9 1 ) \times 0 . 8 9 1 = 1 3 7 6 \qquad { \overline { { h } } } = 7 2 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad \mathrm { r a t i o } = \mathbf { 2 . 0 }
$$
**A $0 . 5 \ \mathrm { m m }$ wire doubles the cooling, and the mechanism is not the wire's own turbulence but the $8 7 1$ : the subtraction that accounts for the laminar front part of the plate.** **The cost, from the analogy of [[#der-exchange|the exchange-rate derivation below]]: the drag also doubles, and on one face of a $5 0 0 \ \mathrm { m m }$ square plate that is $0 . 2 9 \ \mathrm { N }$ against $0 . 1 4 \ \mathrm { N }$ — small in absolute terms, but the same factor of two as the heat.**
:::
:::

::: exercise Rows, not tubes {#ex-rows level=3 check="103"}
The air heater of [[#ex-bank|the worked example]] is rebuilt with $4$ rows instead of $2 0$, at the same approach velocity and the same tube layout. Take $\varepsilon _ { N } = 0 . 8 9$ for four rows and $\chi = 0 . 4$ for the pressure drop. What heat output does one kilowatt of blower power buy? (Enter the ratio in kW of heat per kW of fan power.)
::: solution
$$
h = 0 . 8 9 \times 1 4 9 = 1 3 3 \ \mathrm { W / m ^ { 2 } K } \qquad A _ { s } = { \frac { 4 } { 2 0 } } \times 7 . 4 2 = 1 . 4 8 \ \mathrm { m ^ { 2 } } \qquad \mathrm { N T U } = { \frac { 1 3 3 \times 1 . 4 8 } { 1 . 5 6 \times 1 0 0 7 } } = 0 . 1 2 6
$$
$$
T _ { o } = 1 2 0 - 1 0 5 \, e ^ { - 0 . 1 2 6 } = 1 2 0 - 9 2 . 6 = 2 7 . 4 \ \mathrm { ^ \circ C } \qquad { \dot { Q } } = 1 . 5 6 \times 1 0 0 7 \times 1 2 . 4 = 1 9 . 5 \ \mathrm { k W }
$$
$$
\Delta p = 4 \times 0 . 4 \times { \frac { 1 . 1 2 8 \times 1 2 . 3 ^ { 2 } } { 2 } } = 1 3 7 \ \mathrm { P a } \qquad P _ { \text{fan} } = { \frac { 1 3 7 \times 1 . 5 6 } { 1 . 1 2 8 } } = 1 8 9 \ \mathrm { W } \qquad { \frac { \dot { Q } } { P _ { \text{fan} } } } = \mathbf { 1 0 3 }
$$
**Against the twenty-row bank's $8 3 \ \mathrm { k W }$ for $0 . 9 4 \ \mathrm { k W }$ of fan, i.e. $8 8$ — so the shallow bank gives less than a quarter of the heat but $1 7 \ \ \%$ more of it per unit of pumping.** **Read both numbers and decide which question you were asked.** **If the duty is "deliver $8 3 \ \mathrm { k W }$" from this airflow, the twenty-row bank is right and the four-row bank cannot do it at this flow. If the duty is "most heat per unit of fan power", the shallower bank does better — but not without limit: at two rows ($\varepsilon _ { N } = 0 . 7 6$) the ratio falls back to $9 1$ and at one row ($0 . 6 4$) to $7 8$ , because the first-row penalty bites.** **The general rule: while the air is far from the tube temperature, heat output and pressure drop both grow roughly linearly with rows, so heat per unit fan power changes slowly — and it is the required air-side temperature rise, not the fan, that decides how many rows you need.**
:::
:::

::: exercise A turbine disc {#ex-disc level=2 check="300"}
A turbine disc turns at $1 2 { , } 0 0 0 \ \mathrm { rpm }$ in air at $4 0 0 \ \ {} ^ { \circ } \mathrm { C }$ and one atmosphere. Using the free-disc correlations of this lesson, estimate the heat-transfer coefficient at $r = 2 5 0 \ \mathrm { m m }$ (enter it in W/m²K) and the radius inside which the layer is laminar. ($\nu = 6 . 3 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 5 0 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 8 $.)
::: solution
$$
\omega = { \frac { 1 2 { , } 0 0 0 \times 2 \pi } { 6 0 } } = 1 2 5 7 \ \mathrm { r a d / s } \qquad \mathrm { R e } _ { \varphi } = { \frac { \omega r ^ { 2 } } { \nu } } = { \frac { 1 2 5 7 \times 0 . 2 5 0 ^ { 2 } } { 6 . 3 7 \times 1 0 ^ { - 5 } } } = 1 . 2 3 \times 1 0 ^ { 6 }
$$
**Turbulent ($\mathrm { R e } _ { \varphi } > 2 . 5 \times 1 0 ^ { 5 }$), so the turbulent form:**
$$
\mathrm { N u } _ { r } = 0 . 0 1 9 5 \times \left( 1 . 2 3 \times 1 0 ^ { 6 } \right) ^ { 0 . 8 } = 0 . 0 1 9 5 \times 7 4 { , } 6 0 0 = 1 4 5 5 \qquad h = { \frac { 1 4 5 5 \times 0 . 0 5 0 8 } { 0 . 2 5 0 } } = 2 9 6 \approx \mathbf { 3 0 0 \ \mathrm { W / m ^ { 2 } K } }
$$
$$
r _ { c } = { \sqrt { \frac { 2 . 5 \times 1 0 ^ { 5 } \nu } { \omega } } } = { \sqrt { \frac { 2 . 5 \times 1 0 ^ { 5 } \times 6 . 3 7 \times 1 0 ^ { - 5 } } { 1 2 5 7 } } } = \mathbf { 0 . 1 1 3 \ \mathrm { m } }
$$
**Three hundred is a serious coefficient for a gas — fifteen times the small plate of [[#ex-small]] — and it was bought with rotation alone, with no blower or ducting.** **Inside $1 1 3 \ \mathrm { m m }$ the layer is laminar and $h = 0 . 3 3 \sqrt { \omega / \nu } \, k = 7 4 \ \mathrm { W / m ^ { 2 } K }$ at every radius, which is the check on the arithmetic: the laminar coefficient has no radius in it.** **The design consequence is that the rim, where the turbulent coefficient is highest, is cooled very differently from the hub, and the disc's temperature field has to be computed with both regimes.**
:::
:::

::: exercise Drag from cooling power {#ex-drag level=3 check="24.7"}
A $4 0 0 \ \mathrm { m m }$ square panel in a wind tunnel at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ and $1 0 \ \mathrm { m / s }$ is electrically heated to a uniform $7 5 \ \ {} ^ { \circ } \mathrm { C }$ on one face and consumes $1 5 7 \ \mathrm{ W }$ (all of it convected). What is the skin-friction drag on the panel? (Air: $\rho = 1 . 1 8 4 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 1 0 0 7 \ \mathrm { J / k g \, K }$ , $\mathrm { P r } = 0 . 7 0 7$ , $\nu = 1 . 5 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ ; enter the answer in mN.)
::: solution
**The heat gives the coefficient, the coefficient gives the Stanton number, and the analogy gives the friction.**
$$
h = { \frac { 1 5 7 } { 0 . 1 6 0 \times 5 0 } } = 1 9 . 6 \ \mathrm { W / m ^ { 2 } K } \qquad \mathrm { S t } = { \frac { h } { \rho U c _ { p } } } = { \frac { 1 9 . 6 } { 1 . 1 8 4 \times 1 0 \times 1 0 0 7 } } = 1 . 6 4 \times 1 0 ^ { - 3 }
$$
$$
{ \frac { C _ { f } } { 2 } } = \mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = 1 . 6 4 \times 1 0 ^ { - 3 } \times 0 . 7 9 6 = 1 . 3 1 \times 1 0 ^ { - 3 } \qquad C _ { f } = 2 . 6 1 \times 1 0 ^ { - 3 }
$$
$$
D = C _ { f } \, { \frac { 1 } { 2 } } \rho U ^ { 2 } A = 2 . 6 1 \times 1 0 ^ { - 3 } \times 0 . 5 \times 1 . 1 8 4 \times 1 0 0 \times 0 . 1 6 0 = 0 . 0 2 4 7 \ \mathrm { N } = \mathbf { 2 4 . 7 \ \mathrm { m N } }
$$
**Check the answer independently: $\mathrm { R e } _ { L } = 2 . 5 6 \times 1 0 ^ { 5 }$ is laminar, so $\overline { { C } } _ { f } = 1 . 3 2 8 / { \sqrt { \mathrm { R e } } } = 2 . 6 2 \times 1 0 ^ { - 3 }$ — the analogy reproduces the Blasius value to $0 . 5 \ \ \%$ , which is the best possible confirmation that the heat-transfer measurement was sound.** **Twenty-five millinewtons is the weight of about two and a half grams. The panel carries $1 5 7 \ \mathrm { W }$ of heat against a drag you could barely measure with a kitchen scale, and that asymmetry is why convection cooling of a smooth surface is cheap in drag.**
:::
:::

::: exercise Derivation: why a sphere in still fluid has Nu = 2 {#der-nu2 level=2}
::: solution
**Solve the steady conduction problem, because at zero Reynolds number that is all there is.** With spherical symmetry and no generation, $\nabla ^ { 2 } T = 0$ :
$$
{ \frac { 1 } { r ^ { 2 } } } { \frac { \mathrm { d } } { \mathrm { d } r } } \left( r ^ { 2 } { \frac { \mathrm { d } T } { \mathrm { d } r } } \right) = 0 \quad \Longrightarrow \quad T = A + { \frac { B } { r } } \qquad T ( R ) = T _ { s } , \ T ( \infty ) = T _ { \infty } \ \Longrightarrow \ T = T _ { \infty } + \left( T _ { s } - T _ { \infty } \right) { \frac { R } { r } }
$$
**The flux at the surface, the total heat, and the coefficient:**
$$
q _ { w } = - k \left. { \frac { \mathrm { d } T } { \mathrm { d } r } } \right| _ { R } = { \frac { k \Delta T } { R } } \qquad { \dot { Q } } = 4 \pi R ^ { 2 } q _ { w } = 4 \pi k R \Delta T \qquad h = { \frac { \dot { Q } } { 4 \pi R ^ { 2 } \Delta T } } = { \frac { k } { R } } \qquad \boxed { \ \mathrm { N u } _ { D } = { \frac { h D } { k } } = 2 \ }
$$
**Three things follow.** **(i) The $2$ is exact and contains no fluid mechanics at all: it is the shape factor of a sphere in an infinite medium, and the identical number appears in electrostatics as the capacitance $4 \pi \varepsilon _ { 0 } R$ and in diffusion-limited particle growth as the $4 \pi D R$ of Smoluchowski.** **(ii) It is a floor, not a ceiling: sphere correlations such as Whitaker's and Ranz–Marshall's carry the $+ 2$ for exactly this reason, and a sphere correlation without it should not be used at low Reynolds number. (A cylinder has no such exact floor — see [[#def-nu]] — and its $+ 0 . 3$ in Churchill–Bernstein is a fitted constant.)** **(iii) The heat flow of a small hot object in still gas is proportional to its radius, not to its area.** **Since ${ \dot { Q } } = 4 \pi k R \Delta T$ while the heat capacity goes as $R ^ { 3 }$ , the cooling time constant of a small particle in the conduction limit is $\rho c D ^ { 2 } / 1 2 k _ { \text{gas} }$ and goes as $R ^ { 2 }$ : a $5 0 \ \mu\mathrm { m }$ steel droplet in still air has $h \approx 1 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ and a time constant of about $0 . 0 3 \ \mathrm { s }$ , and the same $2$ sets the floor under every "still air" coefficient quoted for shot, powder or spray.**
:::
:::

::: exercise Derivation: the exchange rate between drag and cooling {#der-exchange level=3}
::: solution
**Divide the two turbulent results by the two laminar ones.** For the same plate, fluid and speed at Reynolds number $\mathrm { R e } _ { L }$,
$$
{ \frac { { \overline { { \mathrm { N u } } } } _ { \text{turb} } } { { \overline { { \mathrm { N u } } } } _ { \text{lam} } } } = { \frac { 0 . 0 3 7 \, \mathrm { R e } ^ { 0 . 8 } \, \mathrm { P r } ^ { 1 / 3 } } { 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } } } = 0 . 0 5 5 7 \, \mathrm { R e } ^ { 0 . 3 } \qquad { \frac { { \overline { { C } } } _ { f , \text{turb} } } { { \overline { { C } } } _ { f , \text{lam} } } } = { \frac { 0 . 0 7 4 \, \mathrm { R e } ^ { - 0 . 2 } } { 1 . 3 2 8 \, \mathrm { R e } ^ { - 1 / 2 } } } = 0 . 0 5 5 7 \, \mathrm { R e } ^ { 0 . 3 }
$$
**The two ratios are identical — the same $0 . 0 5 5 7 \, \mathrm { R e } ^ { 0 . 3 }$ — and that is not a coincidence but the Chilton–Colburn analogy read as a rate of exchange:**
$$
\mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = { \frac { C _ { f } } { 2 } } \quad \Longrightarrow \quad { \frac { h _ { 2 } } { h _ { 1 } } } = { \frac { C _ { f , 2 } } { C _ { f , 1 } } } \quad ( \text{same } U , \rho , c _ { p } )
$$
$$
\mathrm { R e } = 1 0 ^ { 6 } \colon \quad { \frac { { \overline { { \mathrm { N u } } } } _ { \text{turb} } } { { \overline { { \mathrm { N u } } } } _ { \text{lam} } } } = { \frac { 2 0 8 0 } { 5 9 2 } } = 3 . 5 2 = { \frac { 4 . 6 7 \times 1 0 ^ { - 3 } } { 1 . 3 3 \times 1 0 ^ { - 3 } } } = { \frac { { \overline { { C } } } _ { f , \text{turb} } } { { \overline { { C } } } _ { f , \text{lam} } } }
$$
**Turbulence buys heat transfer and sells drag at par, one for one, at every Reynolds number.** **Three consequences.** **(i) A trip is a trade, and whether it pays depends only on what a watt of fan power costs you relative to a kelvin.** **(ii) The same parity is the benchmark for every "passive enhancement" device — turbulators, dimples, wire coils, twisted tapes: such devices usually raise the friction by more than they raise the heat transfer, and a device claiming $5 0 \ \ \%$ more heat for $5 0 \ \ \%$ more friction has only matched the analogy.** **(iii) The ways to beat the exchange rate are to change the flow rather than trip it — impinging jets, whose boundary layer is restarted at the stagnation point, or a phase change — or to move the working point rather than improve it: more area, a better duct, a fan that is not fighting a filter.**
:::
:::

::: quiz Three correlations, one plate {#quiz-plate}
A $3 0 0 \ \mathrm { m m }$ plate sits in the exhaust of a fan at $6 \ \mathrm { m / s }$ and $4 0 \ \ {} ^ { \circ } \mathrm { C }$. A designer computes $\mathrm { R e } _ { L } = 1 . 1 \times 1 0 ^ { 5 }$, concludes "laminar", and uses $\overline { { \mathrm { N u } } } = 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$. What is the best criticism of that calculation?

- [ ] None: the flow is laminar and the correlation is exact
- [ ] The correlation is wrong: at this Reynolds number the flow is turbulent
- [x] The arithmetic is right and the regime is a guess: in a fan's discharge the free-stream turbulence can push transition below $1 0 ^ { 5 }$, so the honest answer is a range between the laminar value and the tripped value
- [ ] The film temperature should not be used for gases

::: solution
**The regime is a guess, and it is the only part of the calculation that is uncertain by a factor of two.** $\mathrm { R e } _ { L } = 1 . 1 \times 1 0 ^ { 5 }$ is laminar in a good tunnel and comfortably turbulent behind a fan with a guard grille: **free-stream turbulence of a few per cent brings $\mathrm { R e } _ { c }$ down to $1 0 ^ { 5 }$ or below, and the plate could be either.** **With air properties at $4 0 \ \ {} ^ { \circ } \mathrm { C }$ the laminar answer is $h \approx 1 7 \ \mathrm { W / m ^ { 2 } K }$ ; a layer turbulent from the leading edge gives about $3 1$ — and the designer's job is to say which end of that range the part has to survive, not to pick the flattering one.** **Option (d) is wrong: the film temperature is the standard reference for gases, and for a plate a few tens of kelvin above the air the property choice changes $h$ by only a few per cent — the least of the worries here, while the regime is the biggest.**
:::
:::

::: quiz The doubling rod {#quiz-rod}
A smooth $5 0 \ \mathrm { m m }$ rod in cross-flow is tested at $\mathrm { R e } _ { D } = 2 \times 1 0 ^ { 5 }$ and again at $5 \times 1 0 ^ { 5 }$ . The average Nusselt number at the higher speed is well above what a $\mathrm { R e } ^ { 0 . 6 }$ trend fitted to the lower-speed data predicts. What happened?

- [ ] Measurement error: correlations do not behave like that
- [x] The boundary layer transitioned before it separated, the wake narrowed, and fast fluid began sweeping the rear of the rod
- [ ] The flow became turbulent in the free stream, which raises $h$ everywhere
- [ ] Viscous dissipation became important at the higher speed

::: solution
**The boundary layer transitioned before it separated.** **A laminar layer has little momentum near the wall and lets go at about $8 2 ^ { \circ }$ ; a turbulent layer mixes high-momentum fluid down to the surface and clings on to $1 2 0 ^ { \circ }$ or more, so the whole rear face — which had been sitting in a slow, recirculating wake — is suddenly washed with fresh stream.** **This is the heat-transfer twin of the golf-ball drag crisis, and it is why the jump is a jump: separation position, not velocity, is what changed.** **Option (c) is the near miss worth arguing about: free-stream turbulence does raise $h$ gradually (by some tens of per cent), but it acts at every Reynolds number rather than producing a step confined to the band $\mathrm { R e } _ { D } = 2 \times 1 0 ^ { 5 }$ to $5 \times 1 0 ^ { 5 }$ . Option (d): at the roughly $1 5 0 \ \mathrm { m / s }$ these Reynolds numbers need, the recovery temperature is only about $1 0 \ \mathrm { K }$ above the stream; that shifts the reference temperature for $h$ , and matters only when the driving temperature difference is similarly small, but it does not change the shape of the Nusselt–Reynolds curve.**
:::
:::

## Where this lesson leads

- **Internal convection** reuses every number here with one change of boundary condition: the duct walls face each other, the layers merge, and the Nusselt number stops depending on length and starts depending on shape — $3 . 6 6$ for a round tube at constant wall temperature, $4 . 3 6$ at constant heat flux, and $7 . 5 4$ between isothermal parallel plates on the hydraulic diameter.
- **Natural convection** keeps the same dimensional structure and replaces $\mathrm { R e }$ with $\mathrm { G r }$ or $\mathrm { R a }$; the flat-plate correlations you have just used reappear with $1 / 4$ and $1 / 3$ exponents and the same film-temperature discipline.
- **Boiling and condensation** breaks the assumption that $h$ is independent of $\Delta T$ — the first place in the course where the coefficient is a function of the answer you are trying to compute.
- **Heat exchangers** takes $h$ for both sides, adds the wall and the fouling, and shows that the side with the smaller coefficient owns the design — which, for anything with gas on one side, is the gas side, and therefore this lesson.
- [[fluid-mechanics/boundary-layers-drag]] is the same mathematics with the Prandtl number set to one; if you can work a plate thermally you already know how to work it for drag.
- [[fluid-mechanics/pipe-flow]] and the Darcy friction factor are the pipe twins of everything in [[#def-bank|the tube-bank section]], including the habit of evaluating properties at the mean temperature and asking what the gap velocity really is.

::: history How the correlations were made
**1904 — Ludwig Prandtl, "Über Flüssigkeitsbewegung bei sehr kleiner Reibung", read at the Third International Congress of Mathematicians in Heidelberg.** The boundary-layer paper: viscosity matters only in a thin layer next to the wall, and outside it the flow behaves as if inviscid. **Every convection correlation in this lesson is a statement about the thickness of that layer.**
**1908 — Heinrich Blasius solves the flat plate.** "Grenzschichten in Flüssigkeiten mit kleiner Reibung", *Zeitschrift für Mathematik und Physik* **56**, 1–37 — Prandtl's doctoral student reduces the laminar plate to an ordinary differential equation and obtains the similarity solution behind $\delta \approx 5 . 0 \, x / { \sqrt { \mathrm { R e } _ { x } } }$ and $C _ { f , x } = 0 . 6 6 4 / \sqrt { \mathrm { R e } _ { x } }$ .
**1921 — The momentum integral, and heat in the Blasius layer.** In the first volume of *Zeitschrift für angewandte Mathematik und Mechanik* Theodore von Kármán publishes the momentum integral ("Über laminare und turbulente Reibung", **1**, 233–252), Karl Pohlhausen applies it with a polynomial profile (**1**, 252–268), and Ernst Pohlhausen solves the energy equation in the Blasius layer ("Der Wärmeaustausch zwischen festen Körpern und Flüssigkeiten mit kleiner Reibung und kleiner Wärmeleitung", **1**, 115–121), obtaining the result that $\mathrm { N u } _ { x } \approx 0 . 3 3 2 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \mathrm { P r } ^ { 1 / 3 }$ summarises. Von Kármán's paper also applies the integral method with a one-seventh-power profile to the turbulent plate, the origin of the $\mathrm { R e } ^ { - 1 / 5 }$ friction law.
**1933 — Hilpert's cylinder constants.** R. Hilpert, "Wärmeabgabe von geheizten Drähten und Rohren im Luftstrom", *Forschung auf dem Gebiete des Ingenieurwesens* **4**, 215–224 — measurements on heated wires and tubes in air that underlie the $C \, \mathrm { R e } ^ { n }$ table still printed in textbooks.
**1933–34 — Colburn's $j$-factor and the Chilton–Colburn analogy.** A. P. Colburn, "A method of correlating forced convection heat transfer data and a comparison with fluid friction", *Transactions of the AIChE* **29**, 174–210 (1933); T. H. Chilton and A. P. Colburn, "Mass transfer (absorption) coefficients: prediction from data on heat transfer and fluid friction", *Industrial & Engineering Chemistry* **26**, 1183–1187 (1934). **The analogy is the reason a heat-transfer engineer can be handed a friction chart and make progress.**
**1972 — Whitaker and Žukauskas.** S. Whitaker, "Forced convection heat transfer correlations for flow in pipes, past flat plates, single cylinders, single spheres, and for flow in packed beds and tube bundles", *AIChE Journal* **18**, 361–371, gives the sphere correlation used here; A. Žukauskas, "Heat transfer from tubes in crossflow", *Advances in Heat Transfer* **8**, 93–160, collects the Lithuanian tube-bank measurements with their row corrections and pressure-drop charts.
**1977 — Churchill–Bernstein and Martin.** S. W. Churchill and M. Bernstein, "A correlating equation for forced convection from gases and liquids to a circular cylinder in crossflow", *Journal of Heat Transfer* **99**, 300–306, fit one equation across the whole Reynolds range; H. Martin, "Heat and mass transfer between impinging gas jets and solid surfaces", *Advances in Heat Transfer* **13**, 1–60, gives the jet correlations.
:::

::: summary
- **$h$ is a dimensionless wall gradient**: $\mathrm { N u } = h L / k _ { f }$ is set by the flow, so $h \propto k _ { f }$ at equal $\mathrm { N u }$ , and water's coefficient is about twenty-three times air's on that count alone.
- **Compute $\mathrm { R e }$ first, write down the regime, then choose the correlation.** $\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$ is a wind-tunnel number; in a machine assume $1 \times 1 0 ^ { 5 }$, and where the answer matters, compute both ends and quote a range.
- **Laminar flat plate**: $\overline { { \mathrm { N u } } } = 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$ , and the average is exactly twice the trailing-edge value. **Constant heat flux** raises the local coefficient by about $3 8 \ \ \%$ and makes the wall temperature rise as $x ^ { 1 / 2 }$.
- **Turbulent and mixed**: $\overline { { \mathrm { N u } } } = ( 0 . 0 3 7 \, \mathrm { R e } ^ { 0 . 8 } - A ) \mathrm { P r } ^ { 1 / 3 }$ with $A = 8 7 1$ at $\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$ . **The subtraction is a large fraction of the answer — $3 7 \ \ \%$ at $\mathrm { R e } _ { L } = 1 0 ^ { 6 }$ , $2 5 \ \ \%$ at $1 . 6 5 \times 1 0 ^ { 6 }$ .**
- **Chilton–Colburn, $\mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = C _ { f } / 2$, is exact for the laminar plate to the accuracy of the $\mathrm { P r } ^ { 1 / 3 }$ fit and a good approximation for turbulent flows without form drag.** It means turbulence trades drag for cooling at par, and it is how you get drag from a heat measurement and fouling from a pressure gauge.
- **Cylinders and spheres**: $C \, \mathrm { R e } ^ { n } \, \mathrm { P r } ^ { 1 / 3 }$ (Hilpert) and $2 + ( 0 . 4 \mathrm { R e } ^ { 1 / 2 } + 0 . 0 6 \mathrm { R e } ^ { 2 / 3 } ) \mathrm { P r } ^ { 0 . 4 }$ (Whitaker). **The $2$ is exact, is the conduction limit, and dominates below a few millimetres.** **Between $\mathrm { R e } _ { D } = 2 \times 1 0 ^ { 5 }$ and $5 \times 1 0 ^ { 5 }$ the cylinder's heat transfer rises faster than the subcritical trend, because a transitional layer separates further back.**
- **Tube banks**: use the **gap** velocity, apply the row correction below ten rows, and take the pressure drop from a separate correlation. **Air-side $h$ on bare $2 0 \ \mathrm { m m }$ tubes runs from about $3 0$ to $4 0 0 \ \mathrm { W / m ^ { 2 } K }$ over $\mathrm { R e } = 1 0 ^ { 3 }$ to $1 0 ^ { 5 }$ , and blower power weighs as heavily in the sizing as area.**
- **Radiation is not in any of these correlations.** For a dark surface near $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ in gentle air flow it can be a third of the heat, and even in $1 0 \ \mathrm { m / s }$ cross-flow it is several per cent; add $h _ { r } = \varepsilon \sigma ( T _ { w } + T _ { \text{sur} } ) ( T _ { w } ^ { 2 } + T _ { \text{sur} } ^ { 2 } )$ and stop pretending the convection number is complete.
- **Properties at the film temperature for external flow, at the bulk mean for internal flow, always.** Air's kinematic viscosity doubles between $2 0$ and $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$; engine oil's Prandtl number falls by more than a factor of ten between $2 5$ and $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$.
- **Quote $h$ to two significant figures and carry the $\pm 2 5 \ \ \%$ into the area.** A correlation used far outside its fitted range is not inaccurate, it is meaningless.
:::

## Further reading

- **T. L. Bergman, A. S. Lavine, F. P. Incropera & D. P. DeWitt**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — Chapter 7 for everything in this lesson, with the cylinder and tube-bank tables the worked examples draw on, and the appendix property tables used throughout.
- **H. Schlichting & K. Gersten**, *Boundary-Layer Theory*, 9th ed. (Springer, 2017) — the exact solutions, the transition literature, and the reason $\mathrm { R e } _ { c }$ is not a constant. Not a design book; the book you read to know when the design book is lying.
- **D. W. Green & M. Z. Southard (eds.)**, *Perry's Chemical Engineers' Handbook*, 9th ed. (McGraw-Hill, 2019) — the tube-bank and packed-bed correlations in the form a process engineer meets them.
- **A. Žukauskas**, "Heat transfer from tubes in crossflow", *Advances in Heat Transfer* **8**, 93–160 (1972) — the bank data, the row corrections and the pressure-drop factors, in one long article.
- **H. Martin**, "Heat and mass transfer between impinging gas jets and solid surfaces", *Advances in Heat Transfer* **13**, 1–60 (1977) — jets, and the regime map.
- **J. M. Owen & R. H. Rogers**, *Flow and Heat Transfer in Rotating-Disc Systems*, Vol. 1: *Rotor–Stator Systems* (Research Studies Press/Wiley, 1989) — the free-disc and rotor–stator results and their limits.
- **S. W. Churchill & M. Bernstein**, "A correlating equation for forced convection from gases and liquids to a circular cylinder in crossflow", *Journal of Heat Transfer* **99**, 300–306 (1977), and **E. Achenbach**, "Total and local heat transfer from a smooth circular cylinder in cross-flow at high Reynolds number", *International Journal of Heat and Mass Transfer* **18**, 1387–1396 (1975) — the cylinder correlation and the data on the transition jump.
- **Y. S. Touloukian & D. P. DeWitt**, *Thermal Radiative Properties*, Thermophysical Properties of Matter vols. 7–8 (IFI/Plenum, 1970–72) — emissivities by material, surface finish and temperature; the emissivities assumed in the worked examples should be checked against data of this kind.
