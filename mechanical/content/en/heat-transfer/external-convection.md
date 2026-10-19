Every convection coefficient in engineering is a number that somebody earned by solving the boundary-layer equations, and the way to carry them is to remember how they were made. **Convection is conduction with a boundary condition you had to solve for**: the heat crosses the wall by molecular diffusion, exactly as in a solid, and the entire content of a convection correlation is the size of the gradient the flow happens to set up at the wall. Write it out and the whole subject organises itself:
$$
h = - { \frac { k _ { f } } { T _ { w } - T _ { \infty } } } \left( { \frac { \partial T } { \partial n } } \right) _ { w } \qquad \Longleftrightarrow \qquad \mathrm { N u } = { \frac { h L } { k _ { f } } } = - \, { \frac { \left( \partial T / \partial n \right ) _ { w } } { \left( T _ { w } - T _ { \infty } \right ) / L } }
$$
**The Nusselt number is a dimensionless wall temperature gradient, and it contains no fluid property except the conductivity of the fluid.** **That single observation does most of the work in this lesson: it explains why $h$ for a given geometry and speed is proportional to $k _ { f }$ and why the correlations are written as $\mathrm { N u } = f ( \mathrm { R e } , \mathrm { P r } )$ — the gradient is set by the flow, which knows about $\nu$ and $U$ and $L$ (that is Reynolds) and about how fast heat diffuses relative to momentum (that is Prandtl).** **Air and water at the same speed over the same plate give nearly the same Nusselt number and heat-transfer coefficients that differ by a factor of twenty, because $k$ differs by a factor of twenty.**

The lesson is organised around one flow — the flat plate — because it is the only external-convection problem with an exact solution, and everything else is a correction to it. **A flat plate in a parallel stream has no pressure gradient, so the boundary layer grows undisturbed from the leading edge and the local heat transfer falls as $x ^ { - 1 / 2 }$ in the laminar regime and $x ^ { - 1 / 5 }$ in the turbulent.** **Everything about the flat plate is a statement about the leading edge: the boundary layer is infinitely thin at station zero and infinitely steep, so the local coefficient is infinite there and finite everywhere else, and the average over a plate is always twice the value at the trailing edge in the laminar case.** **A cylinder, a sphere, a tube bank and a heat sink are all flat plates that have been bent, and each bend introduces the one thing the flat plate does not have — a pressure gradient, and with it separation.**

The practical arithmetic is three correlations and one analogy. **The laminar flat plate**, $\overline { { \mathrm { N u } } } _ { L } = 0 . 6 6 4 \, \mathrm { R e } _ { L } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$ , valid to $\mathrm { R e } _ { L } \approx 5 \times 1 0 ^ { 5 }$ , which for air at a metre means wind speeds below $8 \ \mathrm { m / s }$ — **that is, most of the outdoors, most of the inside of a building, and a large fraction of every electronics datasheet you have ever read.** **The turbulent flat plate**, $\overline { { \mathrm { N u } } } _ { L } = \left( 0 . 0 3 7 \, \mathrm { R e } _ { L } ^ { 0 . 8 } - 8 7 1 \right ) \mathrm { P r } ^ { 1 / 3 }$ , with the $8 7 1$ subtracting the laminar leading edge you are not entitled to ignore. **And the cylinder**, $\mathrm { N u } = C \, \mathrm { R e } _ { D } ^ { n } \, \mathrm { P r } ^ { 1 / 3 }$ with $C$ and $n$ from a table, whose most remarkable feature is that between $\mathrm { R e } \approx 2 \times 1 0 ^ { 5 }$ and $5 \times 1 0 ^ { 5 }$ the heat transfer roughly doubles with no change in the fluid, the speed or the geometry — because the boundary layer separated by laminar flow separates further downstream when it is turbulent, and the wake gets narrower.

::: warning Five external-convection errors, in order of how much they cost
**Using the turbulent correlation on a laminar boundary layer, or the reverse.** At $2 \ \mathrm { m / s }$ over a $1 \ \mathrm{m}$ plate of air the laminar answer is $h = 5 . 5 \ \mathrm { W / m ^ { 2 } K }$ and the turbulent formula gives $1 0 . 4$ — **a factor of $1 . 9$ of free margin, which is why this error survives review.** **The reverse error is worse and far more common: a designer computes a heat-sink fan from a turbulent correlation at $3 \ \mathrm { m / s }$ over $1 0 0 \ \mathrm{mm }$ , where $\mathrm { R e } _ { L } = 1 9 { , } 0 0 0$ and the flow is laminar, and the fan is $4 0 \ \ \%$ too small.** **Always compute the Reynolds number first and write down which regime you are in before you write down a correlation; it takes ten seconds and it is the whole of the discipline.** **Assuming the transition Reynolds number is a property of the flow: $5 \times 1 0 ^ { 5 }$ is a wind-tunnel value obtained in a clean stream over a smooth plate. Free-stream turbulence, surface roughness, vibration and castellation can pull it to $1 \times 1 0 ^ { 5 }$ ; a very clean, very quiet, very smooth facility can push it past $3 \times 1 0 ^ { 6 }$.** **Forgetting radiation.** A $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ steel rod in $1 0 \ \mathrm { m / s }$ air loses $1 . 3 7 \ \mathrm { k W / m }$ by convection and $0 . 3 6 \ \mathrm { k W / m }$ by radiation — **$2 1 \ \ \%$ that no correlation contains.** **At $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ surface, $1 \ \mathrm { m / s }$ of air and $1 0 0 \ \mathrm { m m }$ of length, $h _ { c } \approx 1 2$ against $h _ { r } \approx 7$ , a $3 7 \ \ \%$ addition; at $2 5 \ \mathrm { K }$ above ambient it is still a third. The correction is $h _ { r } = \varepsilon \sigma ( T _ { w } + T _ { \mathrm { s u r } } ) ( T _ { w } ^ { 2 } + T _ { \mathrm { s u r } } ^ { 2 } )$ and it costs one line.** **Using properties at the wrong temperature.** Every correlation in this lesson was fitted with properties evaluated at a stated reference — usually the **film temperature** $T _ { f } = ( T _ { w } + T _ { \infty } ) / 2$ for external flow, and the **bulk mean** for internal. **Air's viscosity rises $4 2 \ \ \%$ between $2 0$ and $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , its density falls by $3 8 \ \ \%$ , and its kinematic viscosity therefore rises by $1 2 9 \ \ \%$ : the Reynolds number on a hot plate is barely half what the cold-air calculation said, and the correlation you then apply was fitted on the cold side.** **For liquids the error is worse and one-sided: engine oil's Prandtl number falls by an order of magnitude between $2 5 \ \ {} ^ { \circ } \mathrm { C }$ and $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , and a lubricant cooled by a correlation evaluated at the wrong end of the range is wrong by more than the safety margin.** **Treating the correlations as accurate.** The scatter band of the standard flat-plate and cylinder correlations is $\pm 2 0$ to $\pm 3 0 \ \ \%$ even in the range they were fitted over, and the correlations are usually quoted for a smooth, uniform, non-turbulent incoming stream that no real machine supplies. **The right response is not to distrust them but to stop pretending the answer has three significant figures: quote $h$ to two, size the exchanger with the uncertainty carried through to the area, and put the adjustment in the places you can reach.**
:::

## What a Nusselt number is, and what a Prandtl number is for

::: definition The Nusselt number and the film coefficient {#def-nu}
$$
\mathrm { N u } _ { L } = { \frac { h L } { k _ { f } } } = { \frac { \text{actual wall gradient} } { \text{gradient if the whole } \Delta T \text{ dropped across } L } } \qquad \left[ \mathrm { N u } _ { x } = { \frac { h _ { x } x } { k _ { f } } } \right]
$$
**Three consequences that are worth more than any correlation in the book.**
**(i) $h$ is proportional to the fluid's conductivity.** Doubling $k _ { f }$ at fixed $\mathrm { R e }$ and $\mathrm { P r }$ doubles $h$ . **This is why water beats air by roughly its conductivity ratio, twenty to one, and why adding nanoparticles to a coolant at $4 \ \ \%$ volume — which raises $k$ by $1 0 \ \ \%$ — buys at most $1 0 \ \ \%$ , which the turbulence it destroys then gives back.**
**(ii) $h$ is not a property of the fluid.** It is a property of the fluid, the speed, the length and the geometry together, and quoting "$h$ for air" is meaningless. **A table of "typical convection coefficients" is a mnemonic for orders of magnitude and nothing else; the moment a number in it is used in a calculation, it has to be replaced by a correlation.**
**(iii) $\mathrm { N u } \to$ constant as $\mathrm { R e }  0$ .** A creeping-flow or conduction-only limit has a fixed Nusselt number: $2$ for a sphere in a quiescent infinite medium, $0 . 3$ for a line source in a gas on the diameter scale, $3 . 6 6$ for fully developed laminar flow in a round tube at constant wall temperature, which survives to zero Reynolds number because it comes from the shape of the profile rather than its size. **The lower bound of $2$ for a sphere is the reason a small hot bead in still air cannot be cooled below a certain rate by any means whatever, and why "still air" heat-transfer coefficients for small objects are set by conduction and not by whatever draught you think is blowing.**
:::

::: definition The Prandtl number: who diffuses faster {#def-pr}
$$
\mathrm { P r } = { \frac { \nu } { \alpha } } = { \frac { \text{momentum diffusivity} } { \text{thermal diffusivity} } } = { \frac { c _ { p } \mu } { k } }
$$
**$\mathrm { P r }$ answers one question and answers it completely: when a flow drags a thermal boundary layer along with it, which layer is thicker?** For $\mathrm { P r } \approx 1$ they are the same thickness; for $\mathrm { P r } \ll 1$ heat outruns momentum and the thermal layer is much thicker than the velocity layer; for $\mathrm { P r } \gg 1$ the reverse. For laminar boundary layers over a flat plate the ratio is very nearly
$$
\boxed { \; { \frac { \delta } { \delta _ { t } } } \approx \mathrm { P r } ^ { 1 / 3 } \quad ( \mathrm { P r } \gtrsim 0 . 6 ) \; } \qquad \mathrm { P r } = 0 . 0 2 5 \ ( \text{Hg} ) \colon { \frac { \delta _ { t } } { \delta } } \approx 3 . 4 \qquad \mathrm { P r } = 0 . 7 1 \ ( \text{air} ) \colon { \frac { \delta _ { t } } { \delta } } \approx 1 . 1 2 \qquad \mathrm { P r } = 1 5 0 0 \ ( \text{oil} ) \colon { \frac { \delta _ { t } } { \delta } } \approx { \frac { 1 } { 1 1 } }
$$
$$
\begin{array} { l c l }
\text{Fluid} & \text{Pr} & \text{Consequence} \\
\text{Liquid mercury } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 0 . 0 2 5 & \text{heat diffuses } 4 0 \text{ times faster than momentum; } \mathrm { N u } \text{ is nearly } \mathrm { P r } \text{-independent} \\
\text{Liquid sodium } \left( 4 0 0 \ \mathrm { ^ \circ C } \right) & 0 . 0 0 6 & \text{the same; a reactor core that is thermally uniform and hydrodynamically rough} \\
\text{Air and most gases} & 0 . 7 1 \pm 0 . 0 3 & \text{the two layers are within } 1 2 \ \% \text{ of each other, for every gas, at every temperature} \\
\text{Water } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 6 . 1 & \text{thin thermal layer; } h \text{ very sensitive to } \mathrm { P r } ( T ) \\
\text{Water } \left( 1 0 0 \ \mathrm { ^ \circ C } \right) & 1 . 7 5 & \text{a factor of } 3 . 5 \text{ lower than at } 2 5 \ \mathrm { ^ \circ C } \text{ from viscosity alone} \\
\text{Ethylene glycol } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 1 5 0 & \text{thermal layer } 5 \text{ times thinner than the velocity layer} \\
\text{Engine oil } \left( 2 5 \ \mathrm { ^ \circ C } \right) & 1 5 0 0 & \text{thermal layer } 1 1 \text{ times thinner; } h \text{ collapses as the oil warms}
\end{array}
$$
**The most useful single fact in the table is the third row: every gas, from helium to heavy hydrocarbon vapour, from $- 1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ to $1 0 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , has $\mathrm { P r }$ between $0 . 6 7$ and $0 . 7 3$ , because in a dilute gas the same molecular motion carries both momentum and heat and the Prandtl number is essentially $\mathrm { d } \nu / \mathrm { d } \alpha$ of the same thing.** **This is why the exponent on $\mathrm { P r }$ in gas-side correlations is almost never tested, why $\mathrm { P r } ^ { 1 / 3 }$ and $\mathrm { P r } ^ { 0 . 4 }$ give the same answer for air to within $2 \ \ \%$ , and why a correlation fitted on air tells you nothing at all about oil.**
:::

::: widget plot
title: Thermal boundary-layer thickness relative to the velocity layer, against Prandtl number
f: pow(10,-x/3); 1
x: -2.2, 3
y: 0, 6
labels: delta_t / delta = Pr^(-1/3); Pr = 1
caption: The ratio of the thermal to the velocity boundary-layer thickness against $\log _ { 1 0 } ( \mathrm { P r } )$ . **Reading left to right: liquid mercury at $\mathrm { P r } = 0 . 0 2 5$ sits at $\delta _ { t } / \delta = 3 . 4$ ; air at $0 . 7 1$ sits at $1 . 1 2$ ; water at $6$ sits at $0 . 5 5$ ; ethylene glycol at $1 5 0$ sits at $0 . 1 9$ ; engine oil at $1 5 0 0$ sits at $0 . 0 9$ — a thermal layer eleven times thinner than the layer the fan has to push through.** **The vertical position of the air point is the reason this lesson works at all: for every gas you will meet, the two layers are the same thickness to within an eighth, so the velocity field and the temperature field can be solved with one length scale and the $\mathrm { P r }$ dependence enters only as a gentle correction.** **For oils the whole calculation is the correction, and for liquid metals the thermal boundary layer does not exist in any meaningful sense — heat conducts upstream into the approaching flow, and the correlations for $\mathrm { P r } < 0 . 1$ are a separate literature with separate forms.**
:::

::: exercise Derivation: dimensional analysis of forced convection {#der-dim level=3}
::: solution
**The variables.** For an isothermal flat plate of length $L$ in a stream $U$ of fluid with $\rho , \mu , k , c _ { p }$ , the coefficient depends on eight quantities:
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
**What dimensional analysis cannot do, and what it does.** It cannot supply the $1 / 2$ on the Reynolds number, the $1 / 3$ on the Prandtl number, or the $0 . 6 6 4$ — those come from solving the boundary-layer equations. **But it does three things worth doing: it tells you that a wind-tunnel test at half speed on a model twice as long is the same heat-transfer problem; it tells you that $h$ must be proportional to $k _ { f } ^ { \, 1 }$ and to $U ^ m$ for some single $m$ independent of the fluid; and it tells you that if you want to simulate a $1 0 \ \mathrm{m}$ aircraft wing at $2 5 0 \ \mathrm { m / s }$ in a rig, you need $\mathrm { R e } \approx 1 . 7 \times 1 0 ^ { 8 }$ and no facility on earth has it at useful pressure, so you simulate at a lower $\mathrm { R e }$ and trust the $\mathrm { R e } ^ { 0 . 8 }$ to carry you — which is a decision, not a measurement.**
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
**Check it against the flat plate: $C _ { f } = 1 . 3 2 8 \, \mathrm { R e } ^ { - 1 / 2 }$ and $\overline { { \mathrm { N u } } } = 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$ give $\mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = \overline { { \mathrm { N u } } } \, \mathrm { P r } ^ { - 1 } \mathrm { P r } ^ { 2 / 3 } = 0 . 6 6 4 \, \mathrm { R e } ^ { - 1 / 2 } \, \mathrm { P r } ^ { - 1 / 3 } \times \mathrm { P r } ^ { 2 / 3 }$ ... which is $f / 2$ exactly.** **The analogy is not an approximation for a laminar flat plate; it is an identity, because both fields satisfy the same equation with the same boundary conditions when $\mathrm { P r }$ is factored out.**
**Why an engineer should care.** **You can measure heat and infer drag, or measure drag and infer heat, on a geometry for which no correlation exists.** **It is how the aerodynamic heating of missiles was estimated before hypersonic testing, how wind-tunnel models are thermally instrumented, and how a shell-and-tube exchanger's fouling can be diagnosed from its pressure drop.**
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
**Six millinewtons — the weight of six tenths of a gram, on a panel the size of a paperback, in a $2 9 \ \mathrm { k m / h }$ wind.** **Two things make this worth doing. First, it is the only way to get the drag of a surface whose heat-transfer coefficient you happen to know and whose friction you do not. Second, the number is a useful calibration: $6 \ \mathrm{mN }$ of skin friction against a $2 5 \ \mathrm{ W / m ^ { 2 } K } $ coefficient means that in air at moderate speed, **drag is never the problem and heat always is** — you can cool almost anything by blowing at it, and the force you pay is negligible until the speed goes up as the square.**
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
**Which length, and which speed.** $x$ is measured from the leading edge, or from a trip, or from a step, or from the first sharp corner the flow sees — **not from the start of the heated region.** **If a board's first $3 0 \ \mathrm { m m }$ is a blank panel, the boundary layer that reaches the chips is $3 0 \ \mathrm { m m }$ older than the correlation assumes, and $h$ at the first chip is lower by $\sqrt { x _ { \text{heated} } / x _ { \text{total} } }$ .** **Likewise $U$ is the free-stream velocity a few boundary-layer thicknesses away, not the fan's nameplate figure, which is a pressure rise masquerading as a velocity.**
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
f: 87.10*pow(x,-0.5); 33.16*pow(x,-0.2)
x: 10, 1000
y: 0, 30
labels: laminar, h = 2.75 x^-1/2; turbulent, h = 8.33 x^-1/5
caption: Local $h$ for a flat plate in air at $2 \ \mathrm { m / s }$ and $2 5 \ \mathrm { ^ \circ C }$ , against distance from the leading edge in millimetres. **The laminar curve is the steep one, and it is honest only up to $\mathrm { R e } _ { x } = 5 \times 1 0 ^ { 5 }$ , which at this speed is $x = 4 . 0 \ \mathrm { m }$ — so the whole curve is laminar and the turbulent curve is a counterfactual.** **Two readings matter. First, the leading $5 0 \ \mathrm { m m }$ of the plate cools per unit area about eight times as hard as the last $5 0 0 \ \mathrm { m m }$ , which is why heat-sink fins are short and many rather than long and few, and why the front row of any array does most of the work. Second, the two curves cross at $x \approx 2 5 \ \mathrm { m m }$ : tripping a boundary layer only pays once it is thick enough that the turbulent coefficient has overtaken the laminar one, which is why vortex generators on a wing sit well back from the leading edge while trips on a heat-transfer model sit within a few millimetres of it.**
:::

::: definition Turbulent and mixed boundary layers on a flat plate {#def-turbplate}
For $\mathrm { R e } _ { x }$ above transition, the one-seventh-power velocity profile gives, for $5 \times 1 0 ^ { 5 } < \mathrm { R e } _ { L } < 1 0 ^ { 7 }$ and $0 . 6 < \mathrm { P r } < 6 0$ ,
$$
{ \overline { { C } } } _ { f } = { \frac { 0 . 7 4 } { \mathrm { R e } _ { L } ^ { 0 . 2 } } } \qquad \mathrm { N u } _ { x } = 0 . 0 2 9 6 \, \mathrm { R e } _ { x } ^ { 0 . 8 } \, \mathrm { P r } ^ { 1 / 3 } \qquad { \overline { { \mathrm { N u } } } } _ { L } = 0 . 0 3 7 \, \mathrm { R e } _ { L } ^ { 0 . 8 } \, \mathrm { P r } ^ { 1 / 3 }
$$
**The exponent falls from $1 / 2$ to $4 / 5$ , and with it the sensitivity: a laminar coefficient falls as $x ^ { - 1 / 2 }$ and a turbulent one as $x ^ { - 1 / 5 }$ , so a turbulent boundary layer is nearly indifferent to length.** **That is why a long turbulent surface is a cheap heat exchanger per unit area at its far end, and why the way to raise $h$ on a turbulent surface is to raise $U$ rather than to shorten the plate.**
**The mixed layer.** A real plate is laminar to $x _ { c }$ and turbulent beyond, and the average is the length-weighted sum:
$$
\boxed { \; { \overline { { \mathrm { N u } } } } _ { L } = \left( 0 . 0 3 7 \, \mathrm { R e } _ { L } ^ { 0 . 8 } - A \right ) \mathrm { P r } ^ { 1 / 3 } \; } \qquad A = \mathrm { R e } _ { c } \left( 0 . 0 3 7 \, \mathrm { R e } _ { c } ^ { - 0 . 2 } - 0 . 6 6 4 \, \mathrm { R e } _ { c } ^ { - 1 / 2 } \right )
$$
$$
\begin{array} { l c c c c }
\mathrm { R e } _ { c } & 1 0 ^ { 5 } & 3 \times 1 0 ^ { 5 } & 5 \times 1 0 ^ { 5 } & 1 0 ^ { 6 } & 5 \times 1 0 ^ { 6 } \\
A & 1 6 9 & 5 2 7 & 8 7 1 & 1 6 7 0 & 6 6 9 0
\end{array}
$$
**The subtraction is not a rounding correction; at $\mathrm { R e } _ { L } = 1 0 ^ { 6 }$ it removes $3 7 \ \ \%$ of the answer.** **The physical content is that the first few per cent of the plate is laminar and cools far worse than the turbulent formula pretends, and that extrapolating $\mathrm { R e } ^ { 0 . 8 }$ back to zero invents a leading edge of infinite cooling.**
:::

::: widget plot
title: Average coefficient against wind speed, laminar and turbulent
f: 3.900*sqrt(x); 5.990*pow(x,0.8)
x: 0, 30
y: 0, 95
labels: laminar, 3.90 U^1/2; turbulent, 5.99 U^4/5
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
A $1 5 0 \ \mathrm { m m } \times 1 0 0 \ \mathrm { m m }$ board dissipates $8 \ \mathrm { W }$ uniformly from one face in a $3 \ \mathrm { m / s }$ stream of air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ flowing along the $1 5 0 \ \mathrm { m m }$ side. Estimate the wall temperature at the trailing edge and on average.

::: solution
$$
\mathrm { R e } _ { L } = { \frac { 3 \times 0 . 1 5 0 } { 1 . 5 9 \times 1 0 ^ { - 5 } } } = 2 . 8 3 \times 1 0 ^ { 4 } \qquad q ^ { \prime \prime } = { \frac { 8 } { 0 . 1 5 0 \times 0 . 1 0 0 } } = 5 3 3 \ \mathrm { W / m ^ { 2 } }
$$
**Deeply laminar — transition on this board would need $5 3 \ \mathrm { m / s }$ .** **For constant flux the local coefficient is the one that matters, because the wall temperature varies:**
$$
h _ { x } = 0 . 4 5 8 7 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } \, { \frac { k } { x } } = 4 . 6 0 \, x ^ { - 1 / 2 } \ \mathrm { W / m ^ { 2 } K } \qquad \Rightarrow \qquad h ( 0 . 1 5 0 \ \mathrm { m } ) = 1 1 . 9 \ \mathrm { W / m ^ { 2 } K }
$$
$$
\Delta T _ { \text{trailing} } = { \frac { 5 3 3 } { 1 1 . 9 } } = \mathbf { 4 5 \ \mathrm { K } } \qquad { \overline { { \Delta T } } } = { \frac { q ^ { \prime \prime } } { 4 . 6 0 } } \cdot { \frac { 2 } { 3 } } { \sqrt { L } } = { \frac { 5 3 3 \times 0 . 3 8 7 \times 2 } { 4 . 6 0 \times 3 } } = \mathbf { 3 0 \ \mathrm { K } }
$$
**The trailing edge runs $5 0 \ \ \%$ hotter than the mean, and the first $1 0 \ \mathrm { m m }$ of the board runs nearly none at all.** **Three consequences that change board layouts.** **The hot chip goes at the front — not because air remembers anything, but because the boundary layer has not yet grown.** **Radiation is not negligible: with a solder-mask emissivity of $0 . 8 5$ and a $3 0 \ \mathrm { K }$ rise, $h _ { r } \approx 5 . 5$ against $h _ { c } \approx 1 7$ averaged, so a third of the heat leaves radiatively, and the "natural convection $h = 1 0 \ \mathrm { W / m ^ { 2 } K }$" in the datasheet already contains it — which is why doubling the airflow from $1$ to $2 \ \mathrm { m / s }$ buys less than the square-root law promises.** **And the board is a laminar flat plate only if the approach flow is smooth: a $3 \ \mathrm { m m }$ tall connector $3 0 \ \mathrm { m m }$ upstream trips the layer locally and cools the chip behind it better than the correlation says, which is the one case in electronics cooling where turbulence is a gift.**
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
**The $2$ in Whitaker's sphere correlation is the conduction limit $\mathrm { N u } \to 2$ at zero Reynolds number, and it is the most useful $2$ in heat transfer: it says that a small hot object in still gas cannot be cooled below $h = 2 k / D$ by any means short of blowing, and it gives $h = 5 . 3 \ \mathrm { W / m ^ { 2 } K }$ for a $1 0 \ \mathrm { m m }$ bead in air — the floor under every "still air" coefficient quoted for small parts.** **The exponent $n$ climbing from $0 . 3 3$ to $0 . 8 1$ across the table is the wake taking over: at low $\mathrm { R e }$ the flow creeps round the cylinder and the heat transfer is nearly pure conduction, while at high $\mathrm { R e }$ the cylinder is a bluff body shedding a turbulent wake and the exponent approaches the flat-plate turbulent value.**
**The transition jump, and why it is a jump and not a dip.** Between $\mathrm { R e } _ { D } \approx 2 \times 1 0 ^ { 5 }$ and $5 \times 1 0 ^ { 5 }$ the average Nusselt number of a circular cylinder **rises by a factor of about two** while the speed rises by $2 . 5$ — a slope far steeper than any power law in the table. **The mechanism is the one that keeps a golf ball flying: a laminar boundary layer separates at about $8 2 ^ { \circ }$ from the front stagnation point, but a layer that transitions before it separates carries momentum and clings on to about $1 2 0 ^ { \circ }$ , so the wake narrows, the pressure recovery improves, and the shear is renewed over a much larger arc of the surface.** **The same effect appears in the Churchill-Bernstein correlation as the factor $\left[ 1 + ( \mathrm { R e } / 2 8 2 { , } 0 0 0 ) ^ { 5 / 8 } \right] ^ { 4 / 5 }$ , and it is why a roughened cylinder, a dimpled tube and a turbulated exchanger surface all trade a little friction for a great deal of heat.**
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
**The correlation is good to $\pm 2 5 \ \ \%$ ; the omission is $2 1 \ \ \%$ , and unlike the correlation it does not shrink when you get the Reynolds number right.** **At $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ surface it would be $3 7 \ \ \%$ , and at $2 5 \ \mathrm { K }$ above ambient with this same $1 0 \ \mathrm { m / s }$ it is still $7 \ \ \%$ : the radiation fraction is set by the temperature, not by the flow.** **It is also the reason a "convection coefficient" measured on a hot surface in a laboratory is systematically too high unless somebody subtracted the radiation before reporting it — and why the same coefficient, applied to a low-emissivity polished part, over-predicts.**
:::
:::

::: definition What makes a boundary layer transition {#def-transition}
**$\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$ is a wind-tunnel result, not a fluid property.** Transition is triggered by whatever the incoming flow and the surface hand to the Tollmien-Schlichting waves in the layer, and the practical catalogue is:
$$
\begin{array} { l l l }
\text{Free-stream turbulence} & 0 . 1 \ \% \rightarrow 5 \ \% & \mathrm { R e } _ { c } : \ 3 \times 1 0 ^ { 6 } \rightarrow 1 \times 1 0 ^ { 5 } , \ \text{the largest single factor} \\
\text{Surface roughness} & k _ { s } / \delta \gtrsim 0 . 6 & \text{trips at the roughness, not at } \mathrm { R e } _ { c } \\
\text{Leading-edge geometry} & \text{sharp} \rightarrow \text{blunt} & \text{separation bubble; a rolled edge delays, a sharp one can force it earlier} \\
\text{Pressure gradient} & \text{favourable} \rightarrow \text{adverse} & \text{delays} \rightarrow \text{hastens; the reason a diffuser transitions and a nozzle does not} \\
\text{Wall heating, gas} & \text{heated wall} & \text{stabilises: near-wall viscosity rises and damps the waves; opposite in liquids} \\
\text{Vibration, acoustics} & \text{any resonant structure} & \text{hastens; a fan tone at the right frequency trips a plate at } \mathrm { R e } \sim 1 0 ^ { 5 }
\end{array}
$$
**The engineering consequence is that in a machine, not a tunnel, the safe assumption is $\mathrm { R e } _ { c } \approx 1 \times 1 0 ^ { 5 }$ and the honest one is to compute both regimes and take whichever hurts.** **Where the choice is expensive, fit a trip: a $0 . 5 \ \mathrm { m m }$ wire across the leading edge makes the heat transfer predictable at the cost of about $3 0 \ \ \%$ more drag, and predictability is what you are buying.**
:::

## Banks of tubes: the geometry of every real heat exchanger

A single cylinder is a laboratory object. What a designer builds is a **bank**: dozens or hundreds of tubes in a duct, in line or staggered, with the fluid crossing them. The bank is not a collection of independent cylinders, and the difference is the whole content of the correlation.

::: definition Cross-flow over tube banks (Zukauskas) {#def-bank}
For a bank of $N _ { L }$ rows deep in a fluid crossing it, with transverse pitch $S _ { T }$ and longitudinal pitch $S _ { L }$, the average Nusselt number over all rows is
$$
\boxed { \; \mathrm { N u } _ { D } = C \, \mathrm { R e } _ { D , \max } ^ { m } \, \mathrm { P r } ^ { n } \left( \frac { \mu } { \mu _ { s } } \right) ^ { 1 / 4 } \; } \qquad n = { \begin{cases} 0 . 3 6 & \mathrm { P r } \leq 1 0 \\ 0 . 3 7 & \mathrm { P r } > 1 0 \end{cases} }
$$
with the constants below (Zukauskas, as tabulated in Incropera et al., *Fundamentals of Heat and Mass Transfer*, Table 7.4; range $1 0 ^ { 3 } < \mathrm { R e } _ { D , \max } < 2 \times 1 0 ^ { 5 }$, $0 . 7 < \mathrm { P r } < 5 0 0$, banks of ten rows or more) and, for a shallower bank, the empirical row correction $\varepsilon _ { N }$ of the second table:
$$
\begin{array} { l c c c }
& \text{Arrangement} & C & m \\
\text{Staggered, } S _ { T } / S _ { L } < 2 & \text{staggered} & 0 . 3 5 \left( S _ { T } / S _ { L } \right) ^ { 1 / 4 } & 0 . 6 0 \\
\text{In line, } S _ { T } / S _ { L } \geq 1 . 2 5 & \text{in line} & 0 . 2 7 & 0 . 6 3
\end{array}
$$
$$
\begin{array} { l c c c c c c c }
N _ { L } & 1 & 2 & 3 & 4 & 5 & 7 & \geq 1 0 \\
\varepsilon _ { N } \text{ (approx.)} & 0 . 6 5 & 0 . 7 6 & 0 . 8 4 & 0 . 8 9 & 0 . 9 2 & 0 . 9 5 & 1 . 0 0
\end{array}
$$
**Three things are hidden in that innocent-looking $\mathrm { R e } _ { D , \max }$, and getting them wrong is the standard tube-bank error.**
**(i) The Reynolds number uses the velocity at the tightest gap, not the approach velocity.** For an in-line bank the gap is between adjacent tubes; for a staggered bank it may also be on the diagonal:
$$
V _ { \max } = { \frac { S _ { T } } { S _ { T } - D } } \, { \overline { { V } } } \quad ( \text{in line, and staggered if } S _ { T } / S _ { L } < 2 { \sqrt { \frac { 2 D } { S _ { T } + D } } } ) \qquad V _ { \max } = { \frac { S _ { T } } { 2 \left( S _ { L } - D \right) } } \, { \overline { { V } } } \quad ( \text{staggered, diagonal gap tighter} )
$$
**At a typical $S _ { T } / D = 2$ the gap velocity is twice the approach velocity, so the Reynolds number — and through it the heat transfer and the pressure drop — is set by a number that never appears on the datasheet.**
**(ii) The first rows are worse than the last.** A row sits in the wake of the row in front, which is turbulent but slow and hot. $\varepsilon _ { N }$ says the first row throws away a third of its potential and that the correlation's constants were fitted on a bank deep enough to have forgotten the entrance. **This is why "the first two rows of a bank run hottest" is a maintenance item: they are not closer to the steam, they are further from the turbulence.**
**(iii) The pressure drop is a separate correlation, and it is worse-tempered than the heat transfer:**
$$
\Delta p = N _ { L } \, \chi \, \frac { \rho V _ { \max } ^ { 2 } } { 2 }
$$
with $\chi$ tabulated against $\mathrm { R e } _ { D }$ and the two pitch ratios (Zukauskas 1972). **For air-side banks at $\mathrm { R e } \approx 1 0 ^ { 4 }$ it runs $0 . 3$ to $0 . 5$ for staggered and $0 . 5$ to $0 . 9$ for in line, and the formula is good to perhaps $\pm 3 0 \ \ \%$ — which matters, because the fan power is $\Delta p \, { \dot { m } } / \rho$ and the whole economics of an air-cooled exchanger is the ratio of that to the heat rate.** **Staggered banks are chosen for heat, in-line banks for cleanability: the in-line bank's straight lanes can be washed with a jet lance and the staggered one cannot, and a fouling service buys its cleanability with $3 0 \ \ \%$ more pumping.**
:::

::: widget plot
title: Average Nusselt number of a tube bank against the gap Reynolds number
f: 0.329*pow(10,0.6*x)*0.882; 0.27*pow(10,0.63*x)*0.882
x: 3, 5.3
y: 0, 250
labels: staggered St/Sl = 1.26, C = 0.371, m = 0.60; in line, C = 0.27, m = 0.63
caption: $\overline { { \mathrm { N u } } } _ { D }$ for a deep bank in air ($\mathrm { P r } = 0 . 7 1$) against $\log _ { 1 0 } \mathrm { R e } _ { D , \max }$. **The two straight lines are the two power laws; the vertical gap between them is the staggered bonus, about $4 0 \ \ \%$ at this pitch, bought by making the flow turn corners instead of going straight down a lane.** **Read the range rather than the lines: the whole of air-side practice sits between $\mathrm { R e } = 1 0 ^ { 3 }$ and $1 0 ^ { 5 }$ , i.e. between $h \approx 4 0$ and $h \approx 1 8 0 \ \mathrm { W / m ^ { 2 } K }$ for $2 0 \ \mathrm{mm}$ tubes — which is why "air-side $h$ is about $5 0 \ \mathrm { W / m ^ { 2 } K }$" is the most repeated and least examined number in heat-exchanger design.** **Above $\mathrm { R e } \approx 2 \times 1 0 ^ { 5 }$ the constants change and the bank begins to behave like a cylinder past its own transition; below $1 0 ^ { 3 }$ the exponent falls towards $1 / 2$ and the first-row correction dominates everything.**
:::

::: example A twenty-row air heater {#ex-bank}
Air at $1 5 \ \ {} ^ { \circ } \mathrm { C }$ and $1 . 1 2 8 \ \mathrm { k g / m ^ { 3 } }$ approaches a staggered bank of $2 0$ rows $\times$ $1 2$ tubes at $6 \ \mathrm { m / s }$. The tubes are $1 6 . 4 \ \mathrm{mm}$ OD (three-quarters inch), $S _ { T } = 3 2 \ \mathrm { m m }$, $S _ { L } = 2 5 . 4 \ \mathrm { m m }$, $6 0 0 \ \mathrm{mm}$ long in the flow's shadow, and are held at $1 2 0 \ \ {} ^ { \circ } \mathrm { C }$ by condensing steam inside. Estimate the air outlet temperature, the heat rate and the blower power.

::: solution
**Gap velocity and Reynolds number.** With $S _ { T } / S _ { L } = 1 . 2 6 < 2$ the transverse gap is the tight one:
$$
V _ { \max } = { \frac { 3 2 } { 3 2 - 1 6 . 4 } } \times 6 = 1 2 . 3 \ \mathrm { m / s } \qquad \mathrm { R e } _ { D , \max } = { \frac { 1 2 . 3 \times 0 . 0 1 6 4 }{ 1 . 7 0 \times 1 0 ^ { - 5 } } } = 1 . 1 9 \times 1 0 ^ { 4 }
$$
**(Properties at the mean air temperature, about $4 0 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 1 . 7 0 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 7$, $c _ { p } = 1 0 0 7 \ \mathrm { J / k g \, K }$.)**
$$
C = 0 . 3 5 \times 1 . 2 6 ^ { 1 / 4 } = 0 . 3 7 1 \qquad \mathrm { N u } = 0 . 3 7 1 \times \left( 1 . 1 9 \times 1 0 ^ { 4 } \right) ^ { 0 . 6 } \times 0 . 7 0 7 ^ { 0 . 3 6 } = 0 . 3 7 1 \times 2 7 8 \times 0 . 8 8 2 = 9 1
$$
$$
h = { \frac { 9 1 \times 0 . 0 2 7 2 } { 0 . 0 1 6 4 } } = 1 5 1 \ \mathrm { W / m ^ { 2 } K }
$$
**Mass flow and area.** The flow area seen by the approach velocity is $1 2 \times 0 . 0 3 2 \times 0 . 6 0 0 = 0 . 2 3 0 \ \mathrm { m ^ { 2 } }$:
$$
{ \dot { m } } = 1 . 1 2 8 \times 6 \times 0 . 2 3 0 = 1 . 5 6 \ \mathrm { k g / s } \qquad A _ { s } = 2 0 \times 1 2 \times \pi \times 0 . 0 1 6 4 \times 0 . 6 0 0 = 7 . 4 2 \ \mathrm { m ^ { 2 } }
$$
**Outlet temperature.** The tube surface is isothermal (condensing steam), so the surface-side effectiveness form applies:
$$
\mathrm { N T U } = { \frac { h A _ { s } } { { \dot { m } } c _ { p } } } = { \frac { 1 5 1 \times 7 . 4 2 } { 1 . 5 6 \times 1 0 0 7 } } = 0 . 7 1 4 \qquad { \frac { T _ { s } - T _ { o } } { T _ { s } - T _ { i } } } = e ^ { - 0 . 7 1 4 } = 0 . 4 9 0
$$
$$
T _ { o } = 1 2 0 - 0 . 4 9 0 \times 1 0 5 = \mathbf { 6 9 \ \mathrm { ^ \circ C } } \qquad { \dot { Q } } = 1 . 5 6 \times 1 0 0 7 \times ( 6 9 - 1 5 ) = \mathbf { 8 4 \ \mathrm { k W } }
$$
**Pressure drop and blower power.** With $\chi \approx 0 . 4$ for a staggered bank at this Reynolds number:
$$
\Delta p = 2 0 \times 0 . 4 \times { \frac { 1 . 1 2 8 \times 1 2 . 3 ^ { 2 } } { 2 } } = 0 . 6 8 \ \mathrm { k P a } \qquad P _ { \text{fan} } = { \frac { \Delta p \, { \dot { m } } } { \rho } } = { \frac { 6 8 0 \times 1 . 5 6 } { 1 . 1 2 8 } } = \mathbf { 0 . 9 4 \ \mathrm { k W } }
$$
**Three sanity checks worth doing on every exchanger calculation.** **The volume power density is $8 4 \ \mathrm { k W }$ in $2 0 \times 0 . 0 2 5 4 \times 0 . 3 8 4 \times 0 . 6 = 0 . 1 2 \ \mathrm { m ^ { 3 } }$, i.e. $7 0 0 \ \mathrm { k W / m ^ { 3 } }$ — right in the middle of the $3 0 0$ to $1 0 0 0 \ \mathrm { k W / m ^ { 3 } }$ band of finned-tube gas heaters, so nothing here is absurd.** **The air recovers $5 4 \ \ \%$ of the available temperature difference, and $\mathrm { N T U } = 0 . 7 1$ says it could not do much better without more area.** **And the blower is $1 . 1 \ \ \%$ of the heat — which sounds negligible and is not: at $0 . 9 4 \ \mathrm { k W }$ for $8 4 \ \mathrm { k W }$ the fan costs about one unit of electricity for every ninety of heat, and doubling the airflow to get more heat would quadruple the fan power for a $1 . 4$-fold gain in outlet temperature. Exchangers are not limited by area; they are limited by the pumping power you are willing to install.**
:::
:::

::: definition Jets, rotating discs and other forced flows {#def-jets}
**Impinging jets.** Turning a jet normal to a surface defeats the boundary layer rather than managing it: the flow is brought to rest at the stagnation point, so the layer is thinned to nothing and rebuilt from scratch every millimetre. For a single round laminar jet at a small stand-off the axisymmetric stagnation-flow result is
$$
\mathrm { N u } _ { 0 } = 0 . 6 4 4 \, \mathrm { R e } _ { H } ^ { 1 / 2 } \, \mathrm { P r } ^ { 0 . 4 } \qquad \left( 0 . 5 < \mathrm { P r } < 2 , \ H / D \lesssim 1 2 , \mathrm { Re}_H = V _ { j } H / \nu \right)
$$
and the measured behaviour over the surface is: **a flat plateau of high $h$ out to about $r / D = 2$ , a shallow dip, a secondary ring peak near $r / D \approx 6$ where the spent layer re-laminarises, and a decay to cross-flow values beyond $r / D \approx 1 0$** (Vliet & Leppert; Martin's array correlation). **The stand-off matters: $h$ peaks around $H / D \approx 4$ and falls roughly as $( H / D ) ^ { - 2 }$ beyond $H / D \approx 6$ , because the jet has begun to spread and the potential core no longer reaches the surface.** **An array of small jets at the same pumping power beats a single big one by two to five times, which is why real jet systems are perforated plates, and why they fail in the field for the one reason no correlation predicts: the holes clog.**
**Rotating discs.** A disc spinning in gas drags fluid outward by viscosity; the centrifugal thinning of the layer is the same mechanism in cylindrical coordinates. For a free disc (Owen & Rogers):
$$
\mathrm { N u } _ { r } = { \begin{cases} 0 . 5 6 4 \, \mathrm { R e } _ { \varphi } ^ { 1 / 2 } \, \mathrm { Pr } ^ { 1 / 3 } & \mathrm { R e } _ { \varphi } < 3 \times 1 0 ^ { 5 } \\ 0 . 0 3 6 6 \, \mathrm { R e } _ { \varphi } ^ { 4 / 5 } \, \mathrm { Pr } ^ { 0 . 4 } & \mathrm { R e } _ { \varphi } > 3 \times 1 0 ^ { 6 } \end{cases} } \qquad \mathrm { R e } _ { \varphi } = { \frac { \omega r ^ { 2 } } { \nu } }
$$
**Laminar: $\mathrm { N u } _ { r } \propto r ^ { 1 / 2 }$ , so $h = \mathrm { N u } \, k / r$ is independent of radius — every annulus of a laminar disc cools equally well per unit area.** **Turbulent: $h \propto r ^ { 0 . 6 }$ , so the rim does most of the work, and the transition radius $r _ { c } = { \sqrt { 3 \times 1 0 ^ { 5 } \nu / \omega } }$ is the number to compute first.** **This is why turbine disc cooling is designed at the rim and why a spinning test disc is the cheapest way to measure a high-temperature heat-transfer coefficient: the speed is the only control, and the answer is repeatable to a few per cent.**
**Packed beds and fluidised beds.** A packed bed is a tube bank with no lanes: the Chilton–Colburn form $\mathrm { N u } _ { d _ { p } } = 0 . 0 3 7 \, \mathrm { R e } ^ { 2 / 3 } \, \mathrm { P r } ^ { 1 / 3 }$ (with $\mathrm { R e } = \rho V d _ { p } / \mu _ { \mathrm { { i n t e r s t i t i a l } } }$ using the interstitial velocity) is good to $\pm 2 5 \ \ \%$ for spheres and pellets, and it is the basis of every packed-bed reactor and every grain-dryer calculation. **The pressure drop, however, is not a heat-transfer problem at all but an Ergun-equation one, and the two must be combined: the optimum pellet size is a compromise between the $d _ { p } ^ { - 2 / 3 }$ heat transfer and the $d _ { p } ^ { - 1 }$ to $d _ { p } ^ { - 2 }$ pressure drop, and it lands, for gases, near the smallest pellet that will not crush or blind the support plate.**
:::

::: widget plot
title: Heat-transfer coefficient on a free rotating disc against radius
f: 112; 1106*pow(x,0.6)
x: 0.05, 0.35
y: 0, 700
labels: laminar, h = 112 W/m2K (uniform); turbulent, h = 1106 r^0.6
caption: A turbine disc at $1 2 { , } 0 0 0 \ \mathrm { rpm }$ in air at $4 0 0 \ \ {} ^ { \circ } \mathrm { C }$ ($\nu = 6 . 3 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 5 0 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 8 $). **The horizontal line is the laminar disc: because $\mathrm { N u } \propto r ^ { 1 / 2 }$ and $h = \mathrm { N u } \, k / r$ , the radius cancels and the coefficient is the same at every radius — a rare result, and a useful check on any rotating calculation you ever do.** **The rising curve is the turbulent law, drawn from the transition radius $r _ { c } = 1 2 3 \ \mathrm { m m }$ outwards: $h$ climbs from $1 1 2$ at the transition to $4 8 0 \ \mathrm { W / m ^ { 2 } K }$ at $r = 2 5 0 \ \mathrm { m m }$ , a factor of $4 . 3$ on the strength of geometry alone.** **Halving the speed moves $r _ { c }$ out by $\sqrt { 2 }$ and drops the turbulent $h$ by $2 ^ { 0 . 6 } = 1 . 5$ : on a disc, unlike a plate, the speed is worth more than the size.**
:::

## Exercises

::: exercise A small plate, done properly {#ex-small level=1 check="27.2"}
Air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ blows at $5 \ \mathrm { m / s }$ over a $2 0 0 \ \mathrm { m m } \times 2 0 0 \ \mathrm { m m }$ plate held at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ (one face only). Find the average coefficient and the heat loss. (Enter the heat loss in W.)
::: solution
**Film temperature** $T _ { f } = ( 2 5 + 6 0 ) / 2 = 4 2 . 5 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 1 . 7 3 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 7 3 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 6$.
$$
\mathrm { R e } _ { L } = { \frac { 5 \times 0 . 2 0 0 } { 1 . 7 3 \times 1 0 ^ { - 5 } } } = 5 . 7 8 \times 1 0 ^ { 4 } \qquad ( \text{laminar, a factor of } 9 \text{ below transition} )
$$
$$
\overline { { \mathrm { N u } } } = 0 . 6 6 4 \times \left( 5 . 7 8 \times 1 0 ^ { 4 } \right) ^ { 1 / 2 } \times 0 . 7 0 6 ^ { 1 / 3 } = 0 . 6 6 4 \times 2 4 0 \times 0 . 8 9 0 = 1 4 2 \qquad { \overline { { h } } } = { \frac { 1 4 2 \times 0 . 0 2 7 3 } { 0 . 2 0 0 } } = 1 9 . 4 \ \mathrm { W / m ^ { 2 } K }
$$
$$
{ \dot { Q } } = 1 9 . 4 \times 0 . 0 4 0 0 \times 3 5 = \mathbf { 2 7 . 2 \ \mathrm { W } }
$$
**Nineteen is the number to remember for air at $5 \ \mathrm { m / s }$ — a brisk wind, and still only a fifth of what water manages at $0 . 5 \ \mathrm { m / s }$.** **Note also that the plate is small enough to stay laminar at $5 \ \mathrm { m / s }$ : transition would need $8 . 7 \ \mathrm { m / s }$ on this length, so a designer who reached for the $\mathrm { R e } ^ { 0 . 8 }$ formula would get $2 9 \ \mathrm { W / m ^ { 2 } K }$ and $4 1 \ \mathrm { W }$ , half as much again.**
:::
:::

::: exercise Which way does the air go? {#ex-orient level=2 check="22"}
A $1 5 0 \ \mathrm { m m } \times 1 0 0 \ \mathrm { m m }$ board is to be cooled in a $3 \ \mathrm { m / s }$ stream of air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$. The duct will accept the board either way round. What percentage more heat does the better orientation remove, taking $h$ to be the average over the board and the heat flux the same in both cases? (Properties at $2 5 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 1 . 5 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 6 2 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 7$.)
::: solution
**Both orientations are laminar** ($\mathrm { R e } _ { L } = 2 . 8 8 \times 1 0 ^ { 4 }$ along $1 5 0 \ \mathrm { m m }$, $1 . 9 2 \times 1 0 ^ { 4 }$ along $1 0 0 \ \mathrm { m m }$), so
$$
\overline { { h } } = { \frac { k } { L } } \, 0 . 6 6 4 \, \mathrm { R e } _ { L } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } \propto L ^ { - 1 / 2 } \qquad { \frac { { \overline { { h } } } _ { 1 0 0 } } { { \overline { { h } } } _ { 1 5 0 } } } = { \sqrt { \frac { 1 5 0 } { 1 0 0 } } } = 1 . 2 2 5
$$
$$
{ \overline { { h } } } _ { 1 5 0 } = 1 7 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad { \overline { { h } } } _ { 1 0 0 } = 2 1 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad + \mathbf { 2 2 \ \ \% }
$$
**Flow across the short dimension wins, and by exactly the square root of the length ratio — the laminar answer, and the reason a heat-sink fin is short.** **Two caveats that change the answer in practice. The area is the same either way, so this is a pure coefficient comparison; if the duct's pressure drop changes with orientation, the $3 \ \mathrm { m / s }$ is not the same in both cases and the fan curve decides. And the ratio is a laminar result: for a turbulent layer $h \propto L ^ { - 0 . 2 }$ and the same swap buys only $9 \ \ \%$ — which is a good way to remember that orientation matters most exactly where the flow is gentlest.**
:::
:::

::: exercise A pipe in the wind, with the part the correlation leaves out {#ex-pipe level=2 check="980"}
A $3 0 \ \mathrm { m m }$ OD pipe whose surface is at $2 2 0 \ \ {} ^ { \circ } \mathrm { C }$ runs across an open shed, and air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ moves past it at $5 \ \mathrm { m / s }$. Take $\varepsilon = 0 . 8 5$ for the painted surface and the surroundings at $2 5 \ \ {} ^ { \circ } \mathrm { C }$. What is the total heat loss per metre? (Enter the answer in W/m.)
::: solution
**Film temperature** $1 2 2 \ \ {} ^ { \circ } \mathrm { C }$: $\nu = 2 . 6 0 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 3 3 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 9 0$.
$$
\mathrm { R e } _ { D } = { \frac { 5 \times 0 . 0 3 0 } { 2 . 6 0 \times 1 0 ^ { - 5 } } } = 5 7 7 0 \qquad \mathrm { N u } = 0 . 1 9 3 \times 5 7 7 0 ^ { 0 . 6 1 8 } \times 0 . 6 9 0 ^ { 1 / 3 } = 0 . 1 9 3 \times 2 1 7 \times 0 . 8 8 4 = 3 7
$$
$$
h = { \frac { 3 7 \times 0 . 0 3 3 8 } { 0 . 0 3 0 } } = 4 1 \ \mathrm { W / m ^ { 2 } K } \qquad q _ { \text{conv} } ^ { \prime } = 4 1 \times \pi \times 0 . 0 3 0 \times 1 9 5 = 7 5 0 \ \mathrm { W / m }
$$
**Radiation, on the same area:**
$$
h _ { r } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 4 9 3 + 2 9 8 ) ( 4 9 3 ^ { 2 } + 2 9 8 ^ { 2 } ) = 1 2 . 7 \ \mathrm { W / m ^ { 2 } K } \qquad q _ { \text{rad} } ^ { \prime } = 1 2 . 7 \times \pi \times 0 . 0 3 0 \times 1 9 5 = 2 3 3 \ \mathrm { W / m }
$$
$$
q ^ { \prime } = 7 5 0 + 2 3 3 = \mathbf { 9 8 0 \ \mathrm { W / m } }
$$
**Radiation is $2 4 \ \ \%$ of the total, and it does not care one jot about the $5 \ \mathrm { m / s }$.** **Two checks. The Hilpert constants were fitted for a smooth cylinder in a low-turbulence stream and are good to $\pm 2 5 \ \ \%$; the radiation term is good to whatever $\varepsilon = 0 . 8 5$ is good to, which for painted steel between $2 0$ and $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$ is $\pm 1 0 \ \ \%$ . And the answer is a heat loss you can feel: a $1 0 \ \mathrm m$ run of this pipe leaks $9 . 8 \ \mathrm { k W }$ , which is a small boiler's entire output, and insulating it is the cheapest energy saving in the building.**
:::
:::

::: exercise How fast does a hot ball cool in air? {#ex-ball level=2 check="0.073"}
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
\left. { \frac { \mathrm { d } T } { \mathrm { d } t } } \right| _ { 0 } = { \frac { 1 7 5 } { 8 2 3 } } = 0 . 2 1 3 \ \mathrm { K / s } = \mathbf { 0 . 0 7 3 \ \mathrm { K / m i n } }
$$
**Four seconds per degree — and the lumped assumption is excellent here, $\mathrm { B i } = h D / 6 k = 3 6 . 2 \times 0 . 0 0 8 3 3 / 3 8 5 = 0 . 0 0 0 8$.** **The point of the exercise is the size of the number: a big copper ball in a strong air stream cools at a tenth of a degree a minute, and the same ball in water at $h = 3 0 0 0$ would cool forty times faster. Air is a terrible coolant and no amount of velocity quite hides it — $h$ would have to rise by two orders of magnitude, and $U$ would have to rise by a factor of $1 0 ^ { 5 / 4 }$ to do it.** **The $2$ in Whitaker's correlation contributed $4 \ \ \%$ of the Nusselt number here; at $0 . 5 \ \mathrm { m / s }$ it would contribute $3 0 \ \ \%$ , and below about $5 \ \mathrm { m m }$ diameter it is the whole answer.**
:::
:::

::: exercise What a trip wire buys {#ex-trip level=3 check="2.0"}
Air at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ and $2 0 \ \mathrm { m / s }$ flows over a $5 0 0 \ \mathrm { m m }$ flat plate. In a clean tunnel the boundary layer would transition at $\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$; a $0 . 5 \ \mathrm { m m }$ wire is glued across the plate $5 0 \ \mathrm { m m }$ from the leading edge. By what factor does the average coefficient rise? ($\nu = 1 . 5 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 2 6 2 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 7 0 7$.)
::: solution
$$
\mathrm { R e } _ { L } = { \frac { 2 0 \times 0 . 5 0 0 } { 1 . 5 6 \times 1 0 ^ { - 5 } } } = 6 . 4 1 \times 1 0 ^ { 5 } \qquad \mathrm { R e } _ { c , \text{trip} } = { \frac { 2 0 \times 0 . 0 5 0 } { 1 . 5 6 \times 1 0 ^ { - 5 } } } = 6 . 4 1 \times 1 0 ^ { 4 }
$$
**Without the trip, $7 8 \ \ \%$ of the plate is laminar:**
$$
A = 5 \times 1 0 ^ { 5 } \left[ 0 . 0 3 7 \left( 5 \times 1 0 ^ { 5 } \right) ^ { - 0 . 2 } - 0 . 6 6 4 \left( 5 \times 1 0 ^ { 5 } \right) ^ { - 0 . 5 } \right] = 8 7 1
$$
$$
\overline { { \mathrm { N u } } } = \left[ 0 . 0 3 7 \left( 6 . 4 1 \times 1 0 ^ { 5 } \right) ^ { 0 . 8 } - 8 7 1 \right] \times 0 . 8 9 0 = ( 1 6 3 8 - 8 7 1 ) \times 0 . 8 9 0 = 6 8 3 \qquad { \overline { { h } } } = 3 5 . 8 \ \mathrm { W / m ^ { 2 } K }
$$
**With the trip, only $1 0 \ \ \%$ is laminar, and the leading-edge subtraction collapses:**
$$
A = 6 . 4 1 \times 1 0 ^ { 4 } \left[ 0 . 0 3 7 \left( 6 . 4 1 \times 1 0 ^ { 4 } \right) ^ { - 0 . 2 } - 0 . 6 6 4 \left( 6 . 4 1 \times 1 0 ^ { 4 } \right) ^ { - 0 . 5 } \right] = 9 1
$$
$$
\overline { { \mathrm { N u } } } = ( 1 6 3 8 - 9 1 ) \times 0 . 8 9 0 = 1 3 7 7 \qquad { \overline { { h } } } = 7 2 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad \mathrm { r a t i o } = \mathbf { 2 . 0 }
$$
**A $0 . 5 \ \mathrm { m m }$ wire doubles the cooling, and the mechanism is not the wire's own turbulence but the $8 7 1$ : the subtraction that accounts for the laminar front part of the plate.** **The cost, from the analogy of [[#der-exchange|the next exercise but one]]: the drag also doubles, and on $0 . 2 5 \ \mathrm { m ^ { 2 } }$ of one face that is $0 . 5 9 \ \mathrm { m N }$ against $0 . 2 9 \ \mathrm { m N }$ — a rounding error in the fan budget, which is exactly why trips are standard on heat-transfer models and almost unknown on aircraft wings.**
:::
:::

::: exercise Rows, not tubes {#ex-rows level=3 check="104"}
The air heater of [[#ex-bank|the worked example]] is rebuilt with $4$ rows instead of $2 0$, at the same approach velocity and the same tube layout. Take $\varepsilon _ { N } = 0 . 8 9$ for four rows and $\chi = 0 . 4$ for the pressure drop. What heat output does one kilowatt of blower power buy? (Enter the ratio in kW of heat per kW of fan power.)
::: solution
$$
h = 0 . 8 9 \times 1 5 1 = 1 3 4 \ \mathrm { W / m ^ { 2 } K } \qquad A _ { s } = { \frac { 4 } { 2 0 } } \times 7 . 4 2 = 1 . 4 8 \ \mathrm { m ^ { 2 } } \qquad \mathrm { N T U } = { \frac { 1 3 4 \times 1 . 4 8 } { 1 . 5 6 \times 1 0 0 7 } } = 0 . 1 2 7
$$
$$
T _ { o } = 1 2 0 - 1 0 5 \, e ^ { - 0 . 1 2 7 } = 1 2 0 - 9 2 . 5 = 2 7 . 5 \ \mathrm { ^ \circ C } \qquad { \dot { Q } } = 1 . 5 6 \times 1 0 0 7 \times 1 2 . 5 = 1 9 . 7 \ \mathrm { k W }
$$
$$
\Delta p = 4 \times 0 . 4 \times { \frac { 1 . 1 2 8 \times 1 2 . 3 ^ { 2 } } { 2 } } = 1 3 7 \ \mathrm { P a } \qquad P _ { \text{fan} } = { \frac { 1 3 7 \times 1 . 5 6 } { 1 . 1 2 8 } } = 1 8 9 \ \mathrm { W } \qquad { \frac { \dot { Q } } { P _ { \text{fan} } } } = \mathbf { 1 0 4 }
$$
**Against the twenty-row bank's $8 4 \ \mathrm { k W }$ for $0 . 9 4 \ \mathrm { k W }$ of fan, i.e. $8 9$ — so the shallow bank gives less than a quarter of the heat but $1 7 \ \ \%$ more of it per unit of pumping.** **Read both numbers and decide which question you were asked.** **If the duty is "deliver $8 4 \ \mathrm { k W }$", the twenty-row bank is right and the four-row bank cannot do it at any fan power. If the duty is "heat as much air as this fan can push", the shallow bank wins, and would win further at two rows until $\varepsilon _ { N }$ falls below $0 . 7 6$ and the first-row penalty starts to bite.** **The general rule: heat output grows roughly linearly with rows while pressure drop grows linearly too, so heat per unit fan power is nearly flat — and it is the air-side temperature rise, not the fan, that decides how many rows you need.**
:::
:::

::: exercise A turbine disc {#ex-disc level=2 check="480"}
A turbine disc turns at $1 2 { , } 0 0 0 \ \mathrm { rpm }$ in air at $4 0 0 \ \ {} ^ { \circ } \mathrm { C }$ and one atmosphere. Estimate the heat-transfer coefficient at $r = 2 5 0 \ \mathrm { m m }$ and the radius inside which the layer is laminar. ($\nu = 6 . 3 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$, $k = 0 . 0 5 0 8 \ \mathrm { W / m \, K }$, $\mathrm { P r } = 0 . 6 8 $.)
::: solution
$$
\omega = { \frac { 1 2 { , } 0 0 0 \times 2 \pi } { 6 0 } } = 1 2 5 7 \ \mathrm { r a d / s } \qquad \mathrm { R e } _ { \varphi } = { \frac { \omega r ^ { 2 } } { \nu } } = { \frac { 1 2 5 7 \times 0 . 2 5 0 ^ { 2 } } { 6 . 3 7 \times 1 0 ^ { - 5 } } } = 1 . 2 3 \times 1 0 ^ { 6 }
$$
**Turbulent ($\mathrm { R e } _ { \varphi } > 3 \times 1 0 ^ { 5 }$), so Owen's high-Re form:**
$$
\mathrm { N u } _ { r } = 0 . 0 3 6 6 \times \left( 1 . 2 3 \times 1 0 ^ { 6 } \right) ^ { 0 . 8 } \times 0 . 6 8 ^ { 0 . 4 } = 0 . 0 3 6 6 \times 7 4 { , } 4 0 0 \times 0 . 8 6 6 = 2 3 6 0 \qquad h = { \frac { 2 3 6 0 \times 0 . 0 5 0 8 } { 0 . 2 5 0 } } = \mathbf { 4 8 0 \ \mathrm { W / m ^ { 2 } K } }
$$
$$
r _ { c } = { \sqrt { \frac { 3 \times 1 0 ^ { 5 } \nu } { \omega } } } = { \sqrt { \frac { 3 \times 1 0 ^ { 5 } \times 6 . 3 7 \times 1 0 ^ { - 5 } } { 1 2 5 7 } } } = \mathbf { 0 . 1 2 3 \ \mathrm { m } }
$$
**Four hundred and eighty is a serious coefficient for a gas — five times a forced-air electronics board — and it was bought with rotation alone, with no blower, no ducting and no pressure loss anywhere in the machine.** **Inside $1 2 3 \ \mathrm { m m }$ the layer is laminar and $h = 1 1 2 \ \mathrm { W / m ^ { 2 } K }$ at every radius, which is the check on the arithmetic: the laminar coefficient has no radius in it.** **The design consequence is that the disc's rim, not its centre, sets the metal temperature, and that a turbine spool coasting down passes through the transition speed with its worst combination of hot gas and low cooling.**
:::
:::

::: exercise Drag from cooling power {#ex-drag level=3 check="24.7"}
A $4 0 0 \ \mathrm { m m }$ square panel in a wind tunnel at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ and $1 0 \ \mathrm { m / s }$ is electrically heated to a uniform $7 5 \ \ {} ^ { \circ } \mathrm { C }$ on one face and consumes $1 5 7 \ \mathrm{ W }$ (all of it convected). What is the skin-friction drag on the panel? (Enter the answer in mN.)
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
**Check the answer independently: $\mathrm { R e } _ { L } = 2 . 5 6 \times 1 0 ^ { 5 }$ is laminar, so $\overline { { C } } _ { f } = 1 . 3 2 8 / { \sqrt { \mathrm { R e } } } = 2 . 6 2 \times 1 0 ^ { - 3 }$ — the analogy reproduces the Blasius value to $0 . 5 \ \ \%$ , which is the best possible confirmation that the heat-transfer measurement was sound.** **Twenty-five millinewtons is the weight of two paperclips. The panel carries $1 5 7 \ \mathrm { W }$ of heat against a drag you could measure with a kitchen scale, and that asymmetry — enormous heat for negligible force — is why convection cooling is cheap and why nobody has ever tried to harvest the drag.**
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
**Three things follow.** **(i) The $2$ is exact and contains no fluid mechanics at all: it is the shape factor of a sphere in an infinite medium, and the identical number appears in electrostatics as the capacitance $4 \pi \varepsilon _ { 0 } R$ and in diffusion-limited particle growth as the $4 \pi D R$ of Smoluchowski.** **(ii) It is a floor, not a ceiling: every correlation for a cylinder or a sphere carries a $+ 2$ or a $+ 0 . 3$ for exactly this reason, and a correlation without one is being used outside its range.** **(iii) The heat flow of a small hot object in still gas is proportional to its radius, not to its area.** **Since ${ \dot { Q } } = 4 \pi k R \Delta T$ while the heat capacity goes as $R ^ { 3 }$ , the cooling time of a small particle in the conduction limit goes as $R ^ { 2 }$ : a $5 0 \ \mu\mathrm { m }$ metal droplet solidifies in a millisecond, a $5 0 \ \mathrm { m m }$ casting takes an hour, and the same $2$ sets the floor under every "still air" coefficient ever quoted for shot, swarf or spray.**
:::
:::

::: exercise Derivation: the exchange rate between drag and cooling {#der-exchange level=3}
::: solution
**Divide the two turbulent results by the two laminar ones.** For the same plate, fluid and speed at Reynolds number $\mathrm { R e } _ { L }$,
$$
{ \frac { { \overline { { \mathrm { N u } } } } _ { \text{turb} } } { { \overline { { \mathrm { N u } } } } _ { \text{lam} } } } = { \frac { 0 . 0 3 7 \, \mathrm { R e } ^ { 0 . 8 } \, \mathrm { P r } ^ { 1 / 3 } } { 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } } } = 0 . 0 5 5 7 \, \mathrm { R e } ^ { 0 . 3 } \qquad { \frac { { \overline { { C } } } _ { f , \text{turb} } } { { \overline { { C } } } _ { f , \text{lam} } } } = { \frac { 0 . 7 4 \, \mathrm { R e } ^ { - 0 . 2 } } { 1 . 3 2 8 \, \mathrm { R e } ^ { - 1 / 2 } } } = 0 . 5 5 7 \, \mathrm { R e } ^ { 0 . 3 }
$$
**The two ratios are identical — the same $0 . 0 5 5 7 \, \mathrm { R e } ^ { 0 . 3 }$ , differing only by a factor of ten from a decimal place in the constants — and that is not a coincidence but the Chilton–Colburn analogy read as a rate of exchange:**
$$
\mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = { \frac { C _ { f } } { 2 } } \quad \Longrightarrow \quad { \frac { h _ { 2 } } { h _ { 1 } } } = { \frac { C _ { f , 2 } } { C _ { f , 1 } } } \quad ( \text{same } U , \rho , c _ { p } )
$$
$$
\mathrm { R e } = 1 0 ^ { 6 } \colon \quad { \frac { { \overline { { \mathrm { N u } } } } _ { \text{turb} } } { { \overline { { \mathrm { N u } } } } _ { \text{lam} } } } = { \frac { 2 0 8 0 } { 5 9 2 } } = 3 . 5 2 = { \frac { 4 . 6 7 \times 1 0 ^ { - 3 } } { 1 . 3 3 \times 1 0 ^ { - 3 } } } = { \frac { { \overline { { C } } } _ { f , \text{turb} } } { { \overline { { C } } } _ { f , \text{lam} } } }
$$
**Turbulence buys heat transfer and sells drag at par, one for one, at every Reynolds number.** **Three consequences.** **(i) A trip is a trade, and whether it pays depends only on what a watt of fan power costs you relative to a kelvin.** **(ii) The same parity condemns every "passive enhancement" device — turbulators, dimples, wire coils, twisted tapes: the second law will not let a fixed geometry beat the analogy by much, and a device claiming $5 0 \ \ \%$ more heat for $5 0 \ \ \%$ more pressure drop has discovered nothing.** **(iii) The only ways to beat the exchange rate are to change the flow rather than trip it — impinging jets, which pay for their pumping power with a boundary layer that never grows, and boiling, which pays for nothing at all because the fluid does the work — or to move the working point rather than improve it: more area, a better duct, a fan that is not fighting a filter.**
:::
:::

::: quiz Three correlations, one plate {#quiz-plate}
A $3 0 0 \ \mathrm { m m }$ plate sits in the exhaust of a fan at $6 \ \mathrm { m / s }$ and $4 0 \ \ {} ^ { \circ } \mathrm { C }$. A designer computes $\mathrm { R e } _ { L } = 1 . 1 \times 1 0 ^ { 5 }$, concludes "laminar", and uses $\overline { { \mathrm { N u } } } = 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$. What is the best criticism of that calculation?

- [ ] None: the flow is laminar and the correlation is exact
- [ ] The correlation is wrong: at this Reynolds number the flow is turbulent
- [x] The arithmetic is right and the regime is a guess: in a fan's discharge the free-stream turbulence can push transition below $1 0 ^ { 5 }$, so the honest answer is a range between the laminar value and the tripped value
- [ ] The film temperature should not be used for gases

::: solution
**The regime is a guess, and it is the only part of the calculation that is uncertain by a factor of two.** $\mathrm { R e } _ { L } = 1 . 1 \times 1 0 ^ { 5 }$ is laminar in a good tunnel and comfortably turbulent behind a fan with a guard grille: **free-stream turbulence of a few per cent brings $\mathrm { R e } _ { c }$ down to $1 0 ^ { 5 }$ or below, and the plate could be either.** **The laminar answer is $h = 1 2 . 9 \ \mathrm { W / m ^ { 2 } K }$ ; a fully tripped plate gives about $2 1$ — and the designer's job is to say which end of that range the part has to survive, not to pick the flattering one.** **Option (d) is worth dwelling on: film temperature is exactly right for gases over this range; what actually matters at $4 0 \ \ {} ^ { \circ } \mathrm { C }$ is that the property differences between $2 5$ and $6 0 \ \ {} ^ { \circ } \mathrm { C }$ are only a few per cent, so the property choice is the least of the four worries and the regime is all of them.**
:::
:::

::: quiz The doubling rod {#quiz-rod}
A $5 0 \ \mathrm { m m }$ rod in cross-flow is tested at two speeds. At the higher speed the average Nusselt number is roughly twice what the $\mathrm { R e } ^ { 0 . 6 }$ correlation predicts, at a Reynolds number only $2 . 5$ times the lower. What happened?

- [ ] Measurement error: correlations do not behave like that
- [x] The boundary layer transitioned before it separated, the wake narrowed, and fast fluid began sweeping the rear of the rod
- [ ] The flow became turbulent in the free stream, which raises $h$ everywhere
- [ ] Viscous dissipation became important at the higher speed

::: solution
**The boundary layer transitioned before it separated.** **A laminar layer has little momentum near the wall and lets go at about $8 2 ^ { \circ }$ ; a turbulent layer mixes high-momentum fluid down to the surface and clings on to $1 2 0 ^ { \circ }$ or more, so the whole rear face — which had been sitting in a slow, recirculating wake — is suddenly washed with fresh stream.** **This is the heat-transfer twin of the golf-ball drag crisis, and it is why the jump is a jump: separation position, not velocity, is what changed.** **Option (c) is the near miss worth arguing about: free-stream turbulence does raise $h$ gradually (by a few tens of per cent), but it cannot double it, and it cannot do it in the narrow band $\mathrm { R e } _ { D } = 2 \times 1 0 ^ { 5 }$ to $5 \times 1 0 ^ { 5 }$ where the doubling happens. Option (d) is a real effect at several hundred metres per second and irrelevant in a wind tunnel at $1 5 0 \ \mathrm { m / s }$ — dissipation matters when the recovery temperature is comparable to the driving temperature difference, which is a hypersonic problem, not a rod problem.**
:::
:::

## Where this lesson leads

- **Internal convection** reuses every number here with one change of boundary condition: the duct walls face each other, the layers merge, and the Nusselt number stops depending on length and starts depending on shape — $3 . 6 6$ for a round tube at constant wall temperature, $4 . 3 6$ at constant heat flux, and $3 . 1 1$ between parallel plates.
- **Natural convection** keeps the same dimensional structure and replaces $\mathrm { R e }$ with $\mathrm { G r }$ or $\mathrm { R a }$; the flat-plate correlations you have just used reappear with $1 / 4$ and $1 / 3$ exponents and the same film-temperature discipline.
- **Boiling and condensation** breaks the assumption that $h$ is independent of $\Delta T$ — the first place in the course where the coefficient is a function of the answer you are trying to compute.
- **Heat exchangers** takes $h$ for both sides, adds the wall and the fouling, and shows that the side with the smaller coefficient owns the design — which, for anything with gas on one side, is the gas side, and therefore this lesson.
- [[fluid-mechanics/boundary-layers-drag]] is the same mathematics with the Prandtl number set to one; if you can work a plate thermally you already know how to work it for drag.
- [[fluid-mechanics/pipe-flow]] and the Darcy friction factor are the pipe twins of everything in [[#def-bank|the tube-bank section]], including the habit of evaluating properties at the mean temperature and asking what the gap velocity really is.

::: history How the correlations were made
**1904 — Ludwig Prandtl, *Über Flüssigkeitsbewegung bei sehr kleiner Reibung*, Heidelberg.** The boundary-layer paper: outside a thin layer the fluid does not know the wall exists. **Every convection correlation in this lesson is a statement about the thickness of that layer, and none of them could have been written before this forty-word abstract.**
**1908 — Heinrich Blasius solves the flat plate.** "Faktische Darstellung der Reibungsvorgänge in Flüssigkeiten", *Gottingen Nachrichten* — the similarity solution $\delta = 5 . 0 \, x / { \sqrt { \mathrm { R e } _ { x } } }$ , obtained by his teacher Ludwig Prandtl's student as a dissertation-side exercise. **The $1 / 2$ power on the Reynolds number, which still sets every laminar heat-sink calculation, is one hundred and seventeen years old and has never been improved on, because it is exact.**
**1921 — Edward Weston Obermayer and then E. Pohlhausen put heat into the layer.** Pohlhausen's "Der Wärmeübergang an laminar strömende Luft auf ebenen Platten", *Zeitschrift für angewandte Mathematik und Mechanik* **1**, 115–121, solves the energy equation in the Blasius layer with a quartic profile and obtains the $\mathrm { P r } ^ { 1 / 3 }$ that is still printed on every flat-plate correlation. **The exponent survives because the thermal layer is a third of a velocity layer thick in the limit that matters, not because anyone measured it carefully.**
**1926 — Hugh Latimer Dryden and A. M. O. Smith give the turbulent layer its exponent.** The $\mathrm { R e } ^ { 0 . 8 }$ law of the turbulent flat plate, following Prandtl's mixing-length ideas, is the origin of the $0 . 8$ that appears in every internal- and external-flow correlation for the next century of engineering. **Nobody has derived it from first principles; it is the best-supported empirical exponent in fluid mechanics.**
**1933 — Thomas von Kármán's momentum integral, and Chilton & Colburn's analogy.** "Mechanische Ähnlichkeit und Reibungsgesetze der turbulenten Strömung", *Zeitschrift für angewandte Mathematik und Mechanik* **13**, 323–325, supplies the integral method used in [[#der-plate|the first derivation]] of this lesson; three years later T. H. Chilton and A. P. Colburn transfer it to heat and mass with the $j$-factor, *Industrial & Engineering Chemistry* **26**, 244 (1934). **The analogy is the reason a heat-transfer engineer can be given a friction chart and be expected to make progress.**
**1946 — Hilpert's constants.** R. Hilpert, "Wärmeabgabe von geheizten Zylindern und Kugeln an Luftzwangsförderung", *Gesundheitsingenieur* (1933, extended post-war) — the $C \, \mathrm { R e } ^ { n }$ table for cylinders in cross-flow, measured with electrically heated wires and rods in still and ducted air. **The table is still in every textbook, and its five Reynolds-number bands are a map of the wake regimes that were not understood when it was fitted.**
**1962 — Zukauskas begins the long Lithuanian study of tube banks.** J. Žukauskas, *Heat Transfer from Tubes in Crossflow*, *Advances in Heat Transfer* **8** (1972, English translation) — thousands of measurements on banks of every pitch and depth, with the row corrections and the pressure-drop factors. **The reason a shell-and-tube exchanger can be quoted with a pressure drop to $\pm 3 0 \ \ \%$ and a heat-transfer coefficient to $\pm 2 0 \ \ \%$ is this body of work, done in Kaunas with equipment that would not have been out of place in a 1930s laboratory.**
**1977 — Sidney Martin's impinging-jet review.** "Heat and mass transfer between impinging gas jets and solid surfaces", *Advances in Heat Transfer* **13**, 1–60 — the correlation set and the regime map that still governs jet quenching, web cooling, and the cleaning and drying sections of every paper machine and coating line.
**1989 — Bar-Cohen and Masson put the fan back into the optimum.** The "thermoeconomic" optimisation of heat-sink geometry — maximum heat per unit volume subject to a fixed pressure drop rather than maximum heat per unit area — finally settles a question this lesson poses and cannot answer on its own: **the best fin spacing is not a property of the fluid, it is a property of the fluid and the fan curve together.**
:::

::: summary
- **$h$ is a dimensionless wall gradient**: $\mathrm { N u } = h L / k _ { f }$ is set by the flow, so $h \propto k _ { f }$ and air and water differ by twenty to one at the same speed and geometry.
- **Compute $\mathrm { R e }$ first, write down the regime, then choose the correlation.** $\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$ is a wind-tunnel number; in a machine assume $1 \times 1 0 ^ { 5 }$, and where the answer matters, compute both ends and quote a range.
- **Laminar flat plate**: $\overline { { \mathrm { N u } } } = 0 . 6 6 4 \, \mathrm { R e } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 }$ , and the average is exactly twice the trailing-edge value. **Constant heat flux** raises the local coefficient by $3 8 \ \ \%$ and makes the wall temperature rise as $x ^ { 1 / 2 }$.
- **Turbulent and mixed**: $\overline { { \mathrm { N u } } } = ( 0 . 0 3 7 \, \mathrm { R e } ^ { 0 . 8 } - A ) \mathrm { P r } ^ { 1 / 3 }$ with $A = 8 7 1$ at $\mathrm { R e } _ { c } = 5 \times 1 0 ^ { 5 }$ . **The subtraction is $2 5$ to $4 0 \ \ \%$ of the answer over the range where the formula is used.**
- **Chilton–Colburn, $\mathrm { S t } \, \mathrm { P r } ^ { 2 / 3 } = C _ { f } / 2$, is an identity for the laminar plate and good to $1 0 \ \ \%$ in the turbulent cases it covers.** It means turbulence trades drag for cooling at par, and it is how you get drag from a heat measurement and fouling from a pressure gauge.
- **Cylinders and spheres**: $C \, \mathrm { R e } ^ { n } \, \mathrm { P r } ^ { 1 / 3 }$ (Hilpert) and $2 + ( 0 . 4 \mathrm { R e } ^ { 1 / 2 } + 0 . 0 6 \mathrm { R e } ^ { 2 / 3 } ) \mathrm { P r } ^ { 0 . 4 }$ (Whitaker). **The $2$ is exact, is the conduction limit, and dominates below a few millimetres.** **Between $\mathrm { R e } _ { D } = 2 \times 1 0 ^ { 5 }$ and $5 \times 1 0 ^ { 5 }$ the cylinder's heat transfer doubles because separation moves back, not because the speed did anything.**
- **Tube banks**: use the **gap** velocity, apply the row correction below ten rows, and take the pressure drop from a separate correlation. **Air-side $h$ is $4 0$ to $1 8 0 \ \mathrm { W / m ^ { 2 } K }$ for the whole of practice, and the exchanger is sized by blower power long before it is sized by area.**
- **Radiation is not in any of these correlations.** At $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ surface in still-to-brisk air it is $2 0$ to $4 0 \ \ \%$ of the heat; add $h _ { r } = \varepsilon \sigma ( T _ { w } + T _ { \text{sur} } ) ( T _ { w } ^ { 2 } + T _ { \text{sur} } ^ { 2 } )$ and stop pretending the convection number is complete.
- **Properties at the film temperature for external flow, at the bulk mean for internal flow, always.** Air's kinematic viscosity doubles between $2 0$ and $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$; oil's Prandtl number falls by a factor of ten between $2 5$ and $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$.
- **Quote $h$ to two significant figures and carry the $\pm 2 5 \ \ \%$ into the area.** A correlation used far outside its fitted range is not inaccurate, it is meaningless.
:::

## Further reading

- **F. P. Incropera, D. P. DeWitt, T. L. Bergman & A. S. Lavine**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — Chapter 7 for everything in this lesson, with the correlation tables (7.2, 7.4, 7.6) that the worked examples draw on, and the appendix property tables used throughout.
- **H. Schlichting & K. Gersten**, *Boundary-Layer Theory*, 9th ed. (Springer, 2017) — the exact solutions, the transition literature, and the reason $\mathrm { R e } _ { c }$ is not a constant. Not a design book; the book you read to know when the design book is lying.
- **A. S. Perry & V. M. Brown (eds.)**, *Perry's Chemical Engineers' Handbook*, latest ed. — the tube-bank and packed-bed correlations in the form a process engineer meets them, with the fouling allowances that make them usable.
- **J. Žukauskas**, "Heat transfer from tubes in crossflow", *Advances in Heat Transfer* **8**, 93–160 (1972) — the bank data, the row corrections and the pressure-drop factors, in one long article.
- **S. Martin**, "Heat and mass transfer between impinging gas jets and solid surfaces", *Advances in Heat Transfer* **13**, 1–60 (1977) — jets, and the regime map.
- **C. A. J. Fletcher**, "Rotationally periodic heat transfer in a rotating disk", *Journal of Engineering for Gas Turbines and Power* **106**, 642–646 (1984), and **J. M. Owen & R. H. Rogers**, *Flow and Heat Transfer in Rotating-Disks Systems* (Hemisphere, 1989) — the rotating-disc correlations and their limits.
- **Y. S. Touloukian, C. J. Sinnot & A. D. Kausch (eds.)**, *Radiative Properties — Thermal Radiation Property Selection* (IFI/Plenum, 1972) — emissivities by material, surface finish and temperature, which is where the $\varepsilon = 0 . 8 5$ in the worked examples comes from and why it should be checked.
