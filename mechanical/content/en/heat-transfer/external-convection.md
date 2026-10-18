---
id: heat-transfer/external-convection
title: "External Convection"
summary: "Forced flow over flat plates, cylinders and spheres: the Nusselt number as a dimensionless wall gradient, the Prandtl number, the friction analogy, and the correlations that follow."
translated: false
tags: ["Nusselt number", "Reynolds number", "Prandtl number", "flat plate", "cross-flow", "Colburn analogy"]
---

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
{ \frac { 2 \nu U } { \delta } } = { \frac { 2 U ^ { 2 } } { 1 5 } } { \frac { \mathrm { d } \delta } { \mathrm { d } x } } \quad \Longrightarrow \quad \int _ { 0 } ^ { \delta } \delta \, \mathrm { d } \delta = 1 5 { \frac { \nu } { U } } \int _ { 0 } ^ { x } \mathrm { d } x \quad \Longrightarrow \quad \boxed { \; \delta = { \sqrt { 3 0 } } \; { \frac { x } { \sqrt { \mathrm { R e } _ { x } } } } = { \frac { 5 . 4 8 \, x } { \sqrt { \mathrm { R e } _ { x } } } } \; } \quad \text{Blasius: } 4 . 9 2 \ \ ( + 1 1 \ \ %)
$$
**The friction follows from the profile's wall slope, and the heat transfer from the thermal profile:**
$$
C _ { f , x } = { \frac { 4 \nu } { U \delta } } = { \frac { 0 . 7 3 0 } { \sqrt { \mathrm { R e } _ { x } } } } \ \ ( \text{exact } 0 . 6 6 4 , \ + 1 0 \ \ %) \qquad q _ { w } = { \frac { 3 k \Delta T } { 2 \delta _ { t } } } \quad \Longrightarrow \quad \mathrm { N u } _ { x } = { \frac { 1 . 5 \, x } { \delta } } \, \mathrm { P r } ^ { 1 / 3 } = 0 . 2 7 4 \, \mathrm { R e } _ { x } ^ { 1 / 2 } \, \mathrm { P r } ^ { 1 / 3 } \ \ ( \text{exact } 0 . 3 3 2 , \ - 1 7 \ \ %)
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
q _ { \text{total} } ^ { \prime } = ( 6 3 . 3 + 1 6 . 5 ) \times \pi \times 0 . 0 2 5 \times 2 7 5 = \mathbf { 1 7 2 0 \ \mathrm { W / m } } \qquad \text{radiation is } \mathbf { 2 1 \ \ % }
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
