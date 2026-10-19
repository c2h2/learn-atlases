A tube is the most common heat-exchanger element ever invented, and it has one property no flat plate has: **the fluid that leaves the tube has remembered everything that happened to it.** Over a flat plate the free stream is infinite, unchanging and forgetful; inside a duct the same molecules that entered at the inlet are still in the duct, absorbing heat, thickening boundary layers, and dragging the whole thermal field along with them. **Internal convection is therefore a problem in bookkeeping — an energy balance on the fluid itself, a length over which the wall's influence reaches, and a correlation that says how well mixed the flow is.** Get those three things straight and every tube-side calculation in this course reduces to arithmetic.

The bookkeeping starts with a temperature you cannot measure with a thermometer. **The mean (bulk, mixing-cup) temperature $T _ { m } ( x )$ is defined so that $\dot { m } c _ { p } T _ { m }$ is the thermal energy flux carried across a section, and it is the temperature a cup placed at that section would collect — not the area-average of the profile, because fast fluid near the axis carries more energy per second than slow fluid at the wall.** **Every internal-flow correlation is evaluated at $T _ { m }$, every wall-to-fluid temperature difference is $T _ { s } - T _ { m }$, and the governing equation of the whole subject is one line: $\mathrm { d } T _ { m } / \mathrm { d } x = q _ { s } ^ { \prime } / ( \dot { m } c _ { p } )$ — the mean temperature rises at the rate the wall feeds it, divided by the thermal capacity rate of the stream.** Everything else in this lesson is commentary on that line: what $h$ is when you try to use it, and what the wall condition does to the answer.

The commentary has two regimes, and they are almost embarrassingly different. **Laminar flow is a diffusion problem with a memory: the answer depends on the duct shape, the wall condition and the length, and the fully developed answer $\mathrm { N u } = 3 . 6 6$ is so small that a metre of laminar water tube is barely a heat exchanger at all — the entry region, where $\mathrm { N u }$ can be twice that, is not a correction but the whole design.** **Turbulent flow is a mixing problem: the eddies flatten the temperature profile, the fully developed coefficient is enormous, the entry region is ten diameters long and forgotten, and the answer is a correlation with a $\pm 2 5 \ \ \%$ scatter band attached to it — Dittus–Boelter for speed, Gnielinski for accuracy.** Between them lies $\mathrm { R e } \approx 2 3 0 0$ to $1 0 { , } 0 0 0$, the transition region, where the honest answer is that nobody can tell you what your tube does, and where more heat exchangers are quietly under-performing than in any other regime.

::: warning Five internal-convection errors, in order of how much they cost
**Using a turbulent correlation in the transition region.** A tube heat exchanger designed at $\mathrm { R e } = 4 5 0 0$ with Gnielinski gets $\mathrm { N u } \approx 3 4$; a real, smooth, quiet, vibration-free tube at that Reynolds number can run laminar and deliver $\mathrm { N u }$ between $4$ and $1 4$ depending on length — **a factor of three or more of missing area, and the reason water-side design velocities almost always sit above $\mathrm { R e } = 1 0 { , } 0 0 0$ where the flow is unambiguously turbulent.** **The reverse mistake is equally common and cheaper to survive: designing a fouled, rough, vibratory tube at $\mathrm { R e } = 4 0 0 0$ as laminar when it is really transitional-and-turbulent, and paying for metal you do not need.** **Using the wrong reference temperature.** Dittus–Boelter takes all properties at the **bulk mean**; Sieder–Tate adds a wall-viscosity factor $( \mu / \mu _ { s } ) ^ { 0 . 1 4 }$; external-flow film temperature does not belong anywhere inside an internal correlation. **For oil this is not pedantry: engine oil's viscosity at a $6 0 \ \mathrm { K }$ wall-cooling difference changes by a factor of five between bulk and wall, and the $0 . 1 4$ power turns that into a $2 5 \ \ \%$ correction that is larger than the correlation's own error.** **Confusing the two wall conditions.** At constant heat flux $\mathrm { N u } = 4 . 3 6$ and the wall-to-fluid gap is **constant along the tube**; at constant wall temperature $\mathrm { N u } = 3 . 6 6$ and the gap **decays exponentially**. **For the same total heat duty the constant-flux tube ends with the hotter wall — by a factor of two in the gap in a long tube — and if the duty is boiling, cracking or a fuel-film coking limit, the wall temperature is the design constraint and the wall condition is the design.** **Applying the circular-tube answer to a non-circular duct without thinking.** The hydraulic diameter $D _ { h } = 4 A _ { c } / P$ rescues turbulent flow to within $1 0 \ \ \%$ and **destroys laminar flow**: a parallel-plate channel of large aspect ratio has $\mathrm { N u } _ { D _ { h } } = 7 . 5 4$ against the round tube's $3 . 6 6$ — **the round-tube number applied through $D _ { h }$ under-predicts a plate heat exchanger's laminar performance by a factor of two.** **Forgetting that the tube also has to be pumped.** The heat-transfer coefficient goes as $D ^ { - 1 . 2 }$ at fixed flow rate, the pressure drop as $D ^ { - 4 . 8 }$ — **halving the diameter buys $2 . 3$ times the coefficient per unit area and $2 8$ times the pumping pressure, and every tube sheet ever drilled is somewhere on that trade-off curve.** **The same bargain in the flow direction: doubling the flow buys $7 4 \ \ \%$ more heat transfer and costs $7$ times the pumping power.**
:::

## The mean temperature: bookkeeping for a moving fluid

::: definition The mean (bulk, mixing-cup) temperature {#def-mean}
The energy flux across a duct section is $\rho c _ { p } \int u ( r ) T ( r ) \, d A$; the **mean temperature** $T _ { m }$ is defined so that this flux equals $\dot { m } c _ { p } T _ { m }$:
$$
\boxed { \; T _ { m } ( x ) = { \frac { \int _ { A } u ( r , x ) \, T ( r , x ) \, d A } { \int _ { A } u ( r , x ) \, d A } } \; } \qquad \dot { m } = \rho U _ { m } A _ { c }
$$
**Three readings.** **(i) It is a flux-weighted average, not an area average:** the fast core counts more, because it carries more energy per second. For a fully developed turbulent profile, where $u / U _ { m } \approx 0 . 8 5$ even at the wall, the two averages are within a few per cent; for a laminar parabolic profile they can differ by tens of per cent, because the stagnant, thermally-already-equilibrated fluid near the wall carries almost nothing.
**(ii) It is what a cup measures.** Probe a duct with a thermocouple and you read something between the local and the mean; collect the fluid at that section in a cup, let it mix, and you have exactly $T _ { m }$ — hence "mixing-cup temperature". **This is why every internal-flow correlation is quoted with properties at $T _ { m }$: the correlation is fitted to measurements of $q = \dot { m } c _ { p } ( T _ { m , \text{out} } - T _ { m , \text{in} } )$, and nothing else in the laboratory is directly measurable.**
**(iii) It is the only temperature the energy equation knows.** An overall balance on a slice $d x$ with wall heat flux $q _ { s } ^ { \prime \prime }$ and perimeter $P$ gives, for incompressible flow with negligible axial conduction and no shaft work,
$$
\boxed { \; { \frac { \mathrm { d } T _ { m } } { \mathrm { d } x } } = { \frac { P q _ { s } ^ { \prime \prime } } { \dot { m } c _ { p } } } = { \frac { q _ { s } ^ { \prime } } { \dot { m } c _ { p } } } \; } \qquad q _ { s } = \dot { m } c _ { p } \left( T _ { m } ( L ) - T _ { m } ( 0 ) \right )
$$
**The mean temperature rises at the rate the wall feeds it, divided by the stream's thermal capacity rate $\dot { m } c _ { p }$ — and this line is true in laminar flow, turbulent flow, developing flow, with blowing, with temperature-dependent properties, and whether or not you ever write down a Nusselt number.** It is the first law applied to a stream tube, and it is where every tube design starts: not "what is $h$?" but "what does the fluid's temperature have to do, and how much wall does that take?"
:::

::: definition The two wall conditions, and why the choice is not cosmetic {#def-wallcond}
Local Newton cooling is $q _ { s } ^ { \prime \prime } ( x ) = h ( x ) \left[ T _ { s } ( x ) - T _ { m } ( x ) \right ]$, and combining it with the energy balance gives two canonical problems with two different answers:
$$
\begin{array} { l l l }
\textbf{Constant heat flux} \; q _ { s } ^ { \prime \prime } = \text{const} & { T _ { m } } \text{ rises linearly;} & { T _ { s } - T _ { m } = q _ { s } ^ { \prime \prime } / h = \text{const in fully developed flow} } \\
\textbf{Constant wall temperature} \; T _ { s } = \text{const} & { T _ { m } } \text{ approaches } T _ { s } \text{ exponentially;} & q _ { s } ^ { \prime \prime } \text{ decays along the tube}
\end{array}
$$
For the constant-wall-temperature case, eliminating $q _ { s } ^ { \prime \prime }$ between the two boxed equations with constant $h$ gives an ODE in $T _ { s } - T _ { m }$:
$$
\boxed { \; { \frac { T _ { s } - T _ { m } ( x ) } { T _ { s } - T _ { m } ( 0 ) } } = \exp \! \left( - { \frac { P h x } { \dot { m } c _ { p } } } \right ) \qquad { \frac { T _ { s } - T _ { m } ( L ) } { T _ { s } - T _ { m } ( 0 ) } } = \exp \! \left( - { \frac { h A _ { s } } { \dot { m } c _ { p } } } \right ) \; }
$$
**The exponential is the whole reason the heat-exchanger lesson uses log-mean temperature differences: a tube heated by a constant-temperature wall never "reaches" the wall temperature, it approaches it at a rate set by the dimensionless group $h A _ { s } / ( \dot { m } c _ { p } )$ — which is exactly what NTU will mean two chapters from now.**
**Which wall condition is real.** An electrically heated tube, a nuclear fuel rod, a solar absorber tube and a chip on a cold plate are all close to **constant flux** — the heat is set by the current, the fission rate or the silicon, and the wall temperature is whatever comes out. A tube condensing steam on the outside, or bathed in a phase-change fluid, is close to **constant temperature** — the wall is pinned to the saturation temperature and the heat flux is whatever comes out. **The two conditions differ by only $1 9 \ \ \%$ in fully developed laminar $\mathrm { N u }$ ($4 . 3 6$ versus $3 . 6 6$) and by a few per cent in turbulent flow — but they differ by an unbounded amount in the wall temperature at the end of a long tube, and in design it is the wall you are protecting.**
:::

::: widget plot
title: Mean temperature along a tube: constant flux against constant wall temperature
f: 20 + 8*x; 80 - 60*exp(-0.45*x)
x: 0, 10
y: 10, 100
labels: constant q'' — linear, wall runs 20 K ahead; constant Ts = 80 °C — exponential approach
caption: Two tubes with the same inlet $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and the same $1 0 \ \mathrm { m }$ length — the straight line is the mean temperature of a constant-flux tube whose wall runs $2 0 \ \mathrm { K }$ ahead of the fluid everywhere, the curve is a constant- $8 0 \ \ {} ^ { \circ } \mathrm { C } $ wall. **Read the wall, not the fluid: in the constant-flux tube the wall-to-fluid gap is the same $2 0 \ \mathrm { K }$ at every station, so the outlet wall sits at $1 2 0 \ \ {} ^ { \circ } \mathrm { C }$, while in the constant-temperature tube the wall is at $8 0 \ \ {} ^ { \circ } \mathrm { C }$ everywhere and the local heat flux has decayed to $1 \ \ \%$ of its inlet value by the outlet.** **Same kind of tube, same inlet, utterly different wall histories: the constant-flux design must be checked for peak wall temperature, and the constant-wall design for how much surface it takes to close the last few kelvin — the exponential says the last $6 3 \ \ \%$ of the temperature gap costs as much surface as the first $6 3 \ \ \%$ of it did.** **If the fluid is a fuel that cokes above $2 0 0 \ \ {} ^ { \circ } \mathrm { C }$, a food that scorches, or water that must not boil on the wall, the constant-flux tube is the one that fails — and the one that is easier to build.**
:::

::: exercise Derivation: the mean-temperature equation {#der-tm level=3}
::: solution
**Control volume.** Take a slice of duct between $x$ and $x + d x$, perimeter $P$, cross-section $A _ { c }$, with wall heat flux $q _ { s } ^ { \prime \prime }$ (positive in), no shaft work, incompressible flow, negligible axial conduction and negligible kinetic and potential energy changes. The first law for a steady control volume says: energy in $=$ energy out, so
$$
\underbrace { \rho c _ { p } \int _ { A } u T \, d A } _ { \text{in at } x } + \underbrace { q _ { s } ^ { \prime \prime } P \, d x } _ { \text{through wall} } = \underbrace { \rho c _ { p } \int _ { A } u T \, d A + { \frac { \partial } { \partial x } } \! \left( \rho c _ { p } \int _ { A } u T \, d A \right ) \! d x } _ { \text{out at } x + d x }
$$
**Recognising the definition of $T _ { m }$ inside the integral** ($\rho \int u T \, d A = \rho U _ { m } A _ { c } T _ { m } = \dot { m } T _ { m }$ with $\dot { m }$ constant by continuity) collapses this to
$$
q _ { s } ^ { \prime \prime } P \, d x = { \frac { \partial } { \partial x } } \left( \dot { m } c _ { p } T _ { m } \right ) d x \qquad \Longrightarrow \qquad \boxed { \; { \frac { \mathrm { d } T _ { m } } { \mathrm { d } x } } = { \frac { P q _ { s } ^ { \prime \prime } } { \dot { m } c _ { p } } } \; }
$$
**What was assumed, and what breaks it.** **Constant $\dot { m }$** — fails with wall blowing, transpiration or mass addition (rocket cooling channels bleed fuel inward and the equation gains a source term). **Constant $c _ { p }$** — fails for liquids at large temperature spans only mildly (water's $c _ { p }$ changes $1 \ \ \%$ over $0$–$1 0 0 \ \ {} ^ { \circ } \mathrm { C }$), and fails badly near the critical point, where $c _ { p }$ diverges and supercritical heat transfer correlations stop looking like this one. **No axial conduction** — the Péclet number $\mathrm { R e } \, \mathrm { P r }$ must be large; for liquid metals ($\mathrm { P r } \sim 0 . 0 1$) at ordinary $\mathrm { R e }$ the axial conduction term is not small and the whole equation must be re-derived with it. **No phase change** — with boiling the left-hand side gains $\dot { m } \, d x / d L _ { v }$ times the latent heat, and the "temperature" being transported is enthalpy, not temperature; that generalisation is the whole of the two-phase lesson's bookkeeping.
**The general form.** Dropping the perfect-gas simplifications, the honest statement is an **enthalpy** balance: $\mathrm { d } ( \dot { m } \bar { i } ) / \mathrm { d } x = P q _ { s } ^ { \prime \prime }$ with $\bar { i }$ the mixing-cup enthalpy. **Every convection correlation is a way of closing this equation; none of them replaces it.**
:::
:::

## Entry lengths: how long a tube takes to become itself

::: definition Hydrodynamic and thermal entry lengths {#def-entry}
A tube of radius $R$ fed with a uniform profile develops a wall boundary layer that grows until it meets at the axis. The distance to fully developed flow is the **entry length**, and it is set by the same physics as a flat-plate boundary layer — until the layers meet, the tube *is* a flat plate wrapped around a pipe:
$$
\boxed { \; { \frac { x _ { f , d } } { D } } \approx { \begin{cases} 0 . 0 5 \, \mathrm { R e } _ { D } & \text{laminar} \\[4pt] 1 0 \text{ to } 6 0 \; ( \approx 1 0 \text{ commonly used} ) & \text{turbulent} \end{cases} } \; } \qquad { \frac { x _ { t , d } } { D } } \approx { \begin{cases} 0 . 0 5 \, \mathrm { R e } _ { D } \, \mathrm { P r } & \text{laminar, } \mathrm { P r } \gtrsim 1 \\ 1 0 \text{ to } 6 0 & \text{turbulent} \end{cases} }
$$
**The laminar formulas are the flat-plate ones with $\delta \sim D$ substituted: $\ell \sim 0 . 0 5 \, \mathrm { R e } \, D$ is just $\delta / \ell \sim 5 / { \sqrt { \mathrm { R e } _ { \ell } } }$ solved for the length at which $\delta = D / 2$.** **The thermal entry length carries an extra Prandtl number because in laminar flow heat must diffuse across the *same* distance momentum did, at its own rate: high-Prandtl oils develop velocity quickly and temperature slowly — engine oil at $\mathrm { R e } = 1 0 0$ needs $x _ { t , d } / D \approx 0 . 0 5 \times 1 0 0 \times 5 0 0 = 2 5 0 0$ diameters to develop thermally, which is why oil coolers are long.**
**Turbulent entry lengths are short and notoriously imprecise** — the boundary layer grows as $\delta \propto x ^ { 4 / 5 }$ and swallows the core within ten to sixty diameters, and the spread in the literature is itself a factor of six. **The engineering rule is: turbulent, $L / D > 6 0$: use fully developed correlations; $L / D < 1 0$: this is a jet or an orifice, not a tube; in between, apply an entry correction of order $( D / L ) ^ { 1 / 3 }$ or measure.**
**Why anyone cares.** In the entry region the boundary layers are thin, the gradients are steep, and **the local Nusselt number runs from infinity at the inlet down to its fully developed value** — the average over a short tube can be several times the fully developed number. In laminar flow this is not a correction: for a tube with $L / D$ comparable to $0 . 0 5 \, \mathrm { R e } \, \mathrm { P r }$, the entry region *is* the tube, and the correct answer is the Graetz–Sieder–Tate answer of the next section.
:::

::: widget plot
title: Entry length in diameters against Reynolds number (log scale)
f: 0.05*10^x; 10
x: 2, 4.1
y: 0, 300
labels: laminar, x_fd/D = 0.05 Re; turbulent, about 10 (and imprecise)
caption: The number of diameters a tube needs before its flow (and, for $\mathrm { P r } \approx 1$, its temperature) is fully developed, against $\log _ { 1 0 } \mathrm { R e }$ . **Read the crossing point: at $\mathrm { R e } \approx 2 0 0$ the laminar and turbulent entry lengths are equal, and above it the laminar tube is the longer one — at $\mathrm { R e } = 5 0 0 0$ a laminar tube needs $2 5 0$ diameters to develop while a turbulent one needs ten.** **The practical reading is the bottom-right of the graph, where almost every real heat exchanger lives: $L / D$ of $2 0$ to $1 0 0$ means turbulent tubes are essentially always fully developed, while laminar tubes are essentially always developing — so the laminar question is never "what is the fully developed $\mathrm { N u }$" but "how much tube have I got".** **For high-Prandtl liquids multiply the laminar line by $\mathrm { P r }$ : the line for oil at $\mathrm { P r } = 5 0 0$ is off the top of this chart everywhere, which is the whole reason oil coolers are coiled capillaries.**
:::

::: definition Fully developed laminar flow: the Graetz numbers {#def-graetz}
For a round tube, fully developed velocity, fully developed temperature, constant properties, the energy equation with the parabolic profile $u = 2 U _ { m } \left[ 1 - ( r / R ) ^ { 2 } \right ]$ is linear and separable — this is the **Graetz problem** (1883) — and its first eigenvalue gives
$$
\boxed { \; \mathrm { N u } _ { D } = 3 . 6 6 \quad ( T _ { s } = \text{const} ) \qquad \mathrm { N u } _ { D } = 4 . 3 6 \quad \left( q _ { s } ^ { \prime \prime } = \text{const} \right ) \; } \qquad ( \mathrm { R e } _ { D } \, \mathrm { Pr } \, D / L \lesssim 2 0 )
$$
**Both numbers are constants — independent of Reynolds number, Prandtl number and flow rate.** **That is not an approximation; it is a theorem about the shape of the solution (see the derivation exercise), and it is the single most diagnostic fact in internal convection: in fully developed laminar flow, $h \propto U _ { m } ^ { 0 }$ — turning the pump up buys you nothing but pumping power.** **The reason is that the parabolic profile and the temperature profile are locked together by the flow: doubling $U$ halves the residence time and doubles the gradient at the wall in exactly compensating measure, and the ratio $h D / k$ stands still.**
**The parallel-plate channel** (gap $2 B$, large width) gives $\mathrm { N u } _ { D _ { h } } = 7 . 5 4$ at constant wall temperature and $8 . 2 3$ at constant flux — **more than twice the round tube at the same hydraulic diameter, because the plane channel's flow is more uniformly fast its velocity profile is more uniformly fast — $u _ { \max } / U _ { m } = 1 . 5$ against the round tube's $2 . 0$ — which leaves less stagnant near-wall fluid per unit of flow.** **Any laminar calculation that runs a plate geometry through $D _ { h }$ with $3 . 6 6$ is wrong by a factor of two; the Graetz numbers belong to the shape, and only the shape.**
**The Graetz number** is the dimensionless group that measures how far a laminar thermal development has to go:
$$
\mathrm { G z } _ { D } = { \frac { \dot { m } c _ { p } } { k L } } = { \frac { \pi } { 4 } } \, { \frac { D } { L } } \, \mathrm { R e } _ { D } \, \mathrm { P r } \qquad \mathrm { G z } ^ { - 1 } \lesssim 0 . 0 5 \text{ means fully developed}
$$
:::

::: exercise Derivation: $\mathrm { N u } = 3 . 6 6$ is an eigenvalue {#der-graetz level=5}
::: solution
**Setup.** Fully developed laminar flow in a round tube: $u ( r ) = 2 U _ { m } \left( 1 - r ^ { 2 } / R ^ { 2 } \right )$, $v = 0$, constant properties, negligible axial conduction and generation. The energy equation is
$$
u ( r ) \, { \frac { \partial T } { \partial x } } = \alpha \, { \frac { 1 } { r } } { \frac { \partial } { \partial r } } \! \left( r { \frac { \partial T } { \partial r } } \right )
$$
**The key move is not separation — it is recognising what "fully developed in temperature" means.** For constant wall temperature, the shape of the radial profile becomes fixed, so write $T ( r , x ) = T _ { s } + \left( T _ { m } ( x ) - T _ { s } \right ) \Theta ( r ^ { + } )$ with $r ^ { + } = r / R$; substituting and separating with a constant $\lambda ^ { 2 }$ gives, after non-dimensionalising the radius,
$$
{ \frac { 1 } { r ^ { + } } } { \frac { \mathrm { d } } { \mathrm { d } r ^ { + } } } \! \left( r ^ { + } { \frac { \mathrm { d } \Theta } { \mathrm { d } r ^ { + } } } \right ) + \lambda ^ { 2 } \left( 1 - r ^ { + 2 } \right ) \Theta = 0 \qquad \Theta ^ { \prime } ( 0 ) = 0 , \quad \Theta ( 1 ) = 0
$$
**This is a singular Sturm–Liouville problem** (the weight $1 - r ^ { + 2 }$ vanishes at the wall), with eigenvalues $\lambda _ { n } ^ { 2 }$; the axial decay rate of each term equals its eigenvalue, and because the wall sits at $T _ { s }$ the whole driving temperature difference lives in the fluid mean, so the Nusselt number is fixed by the first eigenfunction alone:
$$
\mathrm { N u } _ { D } = { \frac { h D } { k } } = { \frac { - \, \Theta ^ { \prime } ( 1 ) } { \Theta _ { m } } } \qquad \Theta _ { m } = { \frac { \int _ { 0 } ^ { 1 } \Theta \left( 1 - r ^ { + 2 } \right ) r ^ { + } \, d r ^ { + } } { \int _ { 0 } ^ { 1 } \left( 1 - r ^ { + 2 } \right ) r ^ { + } \, d r ^ { + } } }
$$
**Solving the first eigenvalue** (series solution in powers of $1 - r ^ { + 2 }$ , due to Graetz and Nusselt, 1910) gives $\lambda _ { 1 } ^ { 2 } = 7 . 3 2 8$ and
$$
\mathrm { N u } _ { D } = { \frac { \lambda _ { 1 } ^ { 2 } } { 2 } } = 3 . 6 6 4 \qquad \text{and the axial decay } { \frac { T _ { m } - T _ { s } } { T _ { m , 0 } - T _ { s } } } = C _ { 1 } e ^ { - 7 . 3 2 8 \, x ^ { + } } , \quad x ^ { + } = { \frac { x / D } { \mathrm { R e } _ { D } \, \mathrm { P r } } }
$$
**The next eigenvalue decays $2 2$ times faster, so beyond $x ^ { + } \approx 0 . 0 5$ (i.e. $\mathrm { R e } \, \mathrm { Pr } \, D / L \lesssim 2 0$) the one-term answer is exact to $0 . 1 \ \ \%$.** **For constant heat flux the same procedure with $\partial T / \partial x = \text{const}$ instead of $T _ { s } = \text{const }$ gives $\mathrm { N u } = 4 . 3 6 4$ — the $1 9 \ \ \%$ difference is entirely the different weighting of the near-wall region by the two boundary conditions.**
**What the theorem buys.** **Because $\lambda _ { 1 } ^ { 2 }$ is a pure number, $\mathrm { N u }$ is a pure number: no $\mathrm { R e }$, no $\mathrm { P r }$, no dependence on how fast you pump.** **Check the limits: the result required a fully developed parabolic profile — it fails in the entry region, where the flat core keeps the gradient steep ($\mathrm { N u }$ much larger); it fails for non-Newtonian fluids, whose flatter profiles give $\mathrm { N u }$ up to $6 . 3$ at the same $\mathrm { R e } \, \mathrm { P r }$; and it fails when axial conduction matters ($\mathrm { R e } \, \mathrm { P r } \lesssim 1 0 0$), which is why liquid metals need their own theory.**
:::
:::

## Laminar flow: the entry region is the design

::: definition Combined entry, laminar: the Sieder–Tate correlation {#def-siedertate}
For laminar flow in a round tube with **both** hydrodynamic and thermal entry regions present, constant wall temperature, average over the full length $L$,
$$
\boxed { \; { \overline { { \mathrm { N u } } } } _ { D } = 1 . 8 6 \left( { \frac { \mathrm { R e } _ { D } \, \mathrm { P r } \, D } { L } } \right ) ^ { 1 / 3 } \left( { \frac { \mu } { \mu _ { s } } } \right ) ^ { 0 . 1 4 } \; } \qquad \left[ \; { \overline { { \mathrm { N u } } } } _ { D } \to 3 . 6 6 \; { \frac { D / L } { \mathrm { R e } \, \mathrm { P r } } } \gtrsim 0 . 0 5 \; \right]
$$
**Properties at the bulk mean $T _ { m }$; the viscosity ratio uses the wall temperature $T _ { s }$ and matters for liquids only** (heating a liquid: wall hotter, $\mu _ { s } < \mu$, ratio above one, $h$ boosted by the thin hot wall layer; cooling: the reverse, and the factor bites hardest for oils). **The group $\mathrm { R e } \, \mathrm { Pr } \, D / L = 4 \, \mathrm { G z } ^ { - 1 } / \pi$ is the Graetz number inverted: the correlation says $\overline { { \mathrm { N u } } } \propto \mathrm { G z } ^ { - 1 / 3 }$ — long tubes and strong thermal diffusion both flatten the coefficient.** **Validity: $0 . 4 8 < \mathrm { P r } < 1 0 ^ { 5 }$, error $\pm 2 2 \ \ \%$; the bracketed condition marks where the tube is thermally long and the answer reverts to $3 . 6 6$.**
**Read the correlation as a scaling law, because that is what it is.** $\overline { { \mathrm { N u } } } \propto ( \dot { m } c _ { p } ) ^ { 1 / 3 } k ^ { - 1 / 3 }$ — **in the entry region, laminar $h$ does depend on flow rate (as $\dot { m } ^ { 1 / 3 }$ ) and this is the only lever you have: to double a laminar oil cooler's coefficient, multiply the flow rate by eight or the tube count (hence $L / D$ effect) — or shorten the tubes, since $\overline { { \mathrm { N u } } } \propto L ^ { - 1 / 3 }$ and halving the tube length buys $2 6 \ \ \%$.**
:::

::: example Laminar water in a short tube: the entry region doing all the work {#ex-lam-water}
Water at $2 7 \ \ {} ^ { \circ } \mathrm { C }$ and $\dot { m } = 0 . 0 1 0 \ \mathrm { k g / s }$ flows through a tube of $D = 8 \ \mathrm { m m }$ and $L = 1 . 5 \ \mathrm { m }$ , heated to a modest wall temperature. Estimate the average coefficient. Properties at $3 0 0 \ \mathrm { K }$: $\rho = 9 9 7 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 4 1 7 9 \ \mathrm { J / k g \, K }$ , $\mu = 8 5 5 \times 1 0 ^ { - 6 } \ \mathrm { N \, s / m ^ { 2 } }$ , $k = 0 . 6 1 3 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 5 . 8 3$ .

::: solution
$$
U _ { m } = { \frac { \dot { m } }{ \rho \pi D ^ { 2 } / 4 } } = { \frac { 0 . 0 1 0 } { 9 9 7 \times 5 . 0 2 7 \times 1 0 ^ { - 5 } } } = 0 . 1 9 9 \ \mathrm { m / s } \qquad \mathrm { R e } _ { D } = { \frac { \rho U _ { m } D } { \mu } } = { \frac { 9 9 7 \times 0 . 1 9 9 \times 0 . 0 0 8 } { 8 5 5 \times 1 0 ^ { - 6 } } } = 1 8 6 0
$$
**Laminar, comfortably below $2 3 0 0$.** Entry lengths: $x _ { f , d } = 0 . 0 5 \times 1 8 6 0 \times 0 . 0 0 8 = 0 . 7 4 \ \mathrm { m }$ — **half the tube is still developing hydrodynamically** — and the Graetz group
$$
{ \frac { D / L } { \mathrm { R e } \, \mathrm { P r } } } = { \frac { 0 . 0 0 8 / 1 . 5 } { 1 8 6 0 \times 5 . 8 3 } } = 0 . 0 0 0 4 7 \ll 0 . 0 5 \qquad \Longrightarrow \qquad \text{thermally a short tube; entry correlation applies}
$$
$$
\mathrm { G z } ^ { - 1 } \text{-form:} \quad { \frac { \mathrm { R e } \, \mathrm { P r } \, D } { L } } = { \frac { 1 8 6 0 \times 5 . 8 3 \times 0 . 0 0 8 } { 1 . 5 } } = 5 7 . 7 \qquad { \overline { { \mathrm { N u } } } } = 1 . 8 6 \times 5 7 . 7 ^ { 1 / 3 } = 1 . 8 6 \times 3 . 8 6 5 = 7 . 1 9
$$
$$
\boxed { \; { \overline { { h } } } = { \frac { 7 . 1 9 \times 0 . 6 1 3 } { 0 . 0 0 8 } } = 5 5 1 \ \mathrm { W / m ^ { 2 } K } \; } \qquad \text{versus fully developed: } \ { \frac { 3 . 6 6 \times 0 . 6 1 3 } { 0 . 0 0 8 } } = 2 8 0 \ \mathrm { W / m ^ { 2 } K }
$$
**The entry region doubles the answer.** **Had you reached for $\mathrm { N u } = 3 . 6 6$ you would have sized twice the tube area you need — and had you reached for a turbulent correlation you would have got $h \approx 2 6 0 0$, an order of magnitude wrong.** **Sanity checks: the thermal capacity rate is $\dot { m } c _ { p } = 4 1 . 8 \ \mathrm { W / K }$, so a wall flux of $2 5 \ \mathrm { W / m }$ lifts the water only $0 . 9 \ \mathrm { K }$ — the tube is thermally tiny, which is exactly the regime where "fully developed" thinking fails, because the fluid never gets the chance to forget the inlet.** **Had you reached for a turbulent correlation instead — Dittus–Boelter misapplied at this Reynolds number — you would have got $h \approx 1 2 7 0 \ \mathrm { W / m ^ { 2 } K } $, more than twice too high.**
:::
:::

::: example An engine-oil cooler in the entry regime {#ex-oil}
Unused engine oil at $7 7 \ \ {} ^ { \circ } \mathrm { C }$ enters $L = 3 \ \mathrm { m }$ of $D = 1 2 \ \mathrm { m m }$ tube at $\dot { m } = 0 . 0 5 0 \ \mathrm { k g / s }$ ; the wall is held near $4 7 \ \ {} ^ { \circ } \mathrm { C }$ by coolant. Estimate $\overline { { h } }$ and the heat removed. Properties at bulk mean (take $7 5 \ \ {} ^ { \circ } \mathrm { C }$): $\rho = 8 7 6 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 2 0 1 0 \ \mathrm { J / k g \, K }$ , $\mu = 0 . 0 3 8 \ \mathrm { N \, s / m ^ { 2 } }$ , $k = 0 . 1 4 1 \ \mathrm { W / m \, K }$ ; at the wall, $\mu _ { s } ( 4 7 \ \ {} ^ { \circ } \mathrm { C } ) = 0 . 1 4 2 \ \mathrm { N \, s / m ^ { 2 } }$ .

::: solution
$$
U _ { m } = { \frac { 0 . 0 5 0 } { 8 7 6 \times 1 . 1 3 1 \times 1 0 ^ { - 4 } } } = 0 . 5 0 5 \ \mathrm { m / s } \qquad \mathrm { R e } _ { D } = { \frac { 8 7 6 \times 0 . 5 0 5 \times 0 . 0 1 2 } { 0 . 0 3 8 } } = 1 4 0 \qquad \mathrm { P r } = { \frac { \mu c _ { p } } { k } } = { \frac { 0 . 0 3 8 \times 2 0 1 0 } { 0 . 1 4 1 } } = 5 4 1
$$
$$
{ \frac { \mathrm { R e } \, \mathrm { P r } \, D } { L } } = { \frac { 1 4 0 \times 5 4 1 \times 0 . 0 1 2 } { 3 } } = 3 0 3 \qquad \left( { \frac { \mu } { \mu _ { s } } } \right ) ^ { 0 . 1 4 } = \left( { \frac { 0 . 0 3 8 } { 0 . 1 4 2 } } \right ) ^ { 0 . 1 4 } = 0 . 8 3 2
$$
$$
{ \overline { { \mathrm { N u } } } } = 1 . 8 6 \times 3 0 3 ^ { 1 / 3 } \times 0 . 8 3 2 = 1 . 8 6 \times 6 . 7 1 \times 0 . 8 3 2 = 1 0 . 4 \qquad { \overline { { h } } } = { \frac { 1 0 . 4 \times 0 . 1 4 1 } { 0 . 0 1 2 } } = \mathbf { 1 2 2 \ \mathrm { W / m ^ { 2 } K } }
$$
$$
q \approx { \overline { { h } } } \pi D L \, \Delta T _ { \text{mean} } = 1 2 2 \times \pi \times 0 . 0 1 2 \times 3 \times 2 8 = \mathbf { 3 8 6 \ \mathrm { W } } \qquad \Delta T _ { m } = { \frac { 3 8 6 } { 0 . 0 5 0 \times 2 0 1 0 } } = 3 . 8 \ \mathrm { K} \ \text{cooling}
$$
**Four hundred watts from three metres of twelve-millimetre tube — an oil cooler the size of a broom handle.** **The viscosity correction cost $1 7 \ \ \%$ and is not optional: cooling an oil thickens the wall layer, and a correlation without $\mu _ { s }$ over-predicts here by exactly the amount a designer would have claimed as margin.** **Check the thermal entry length: $x _ { t , d } / D = 0 . 0 5 \times 1 4 0 \times 5 4 1 = 3 8 0 0$ — the tube would have to be $4 5 \ \mathrm { m }$ long to develop thermally, so the flow is in the entry regime for $9 3 \ \ \%$ of its length and the Graetz correlation is the only game in town.** **The design lever follows from the scaling: $h \propto \dot { m } ^ { 1 / 3 } L ^ { - 1 / 3 }$ — quadrupling the oil flow buys $5 9 \ \ \%$. Or split the same flow through a bundle of tubes of half the diameter with the same total flow area and the same length: the coefficient rises by $2 ^ { 1 / 3 } = 1 . 2 6$ and the area doubles, so the total conductance $h A$ goes up two-and-a-half times for the same envelope — real oil coolers are plate-and-fin or corrugated passages for exactly this reason.**
:::
:::

::: definition Liquid metals: conduction-dominated flow {#def-liquidmetal}
For $\mathrm { P r } < 0 . 0 1$ (liquid sodium, lead–bismuth, lithium) heat diffuses so far upstream of any disturbance that the thermal boundary layer concept dies, the Graetz analysis fails, and measurements collapse to a near-constant:
$$
\boxed { \; \mathrm { N u } _ { D } \approx 5 . 0 \; ( T _ { s } = \text{const} ) \qquad \mathrm { N u } _ { D } \approx 8 . 2 \; ( q _ { s } ^ { \prime \prime } = \text{const} ) \; } \qquad \text{fully developed, any } \mathrm { R e } , \text{ any } \mathrm { P r }
$$
**Five, not $3 . 6 6$ — the molecular diffusion through the sublayer helps where it was negligible for oils and water.** **The engineering consequence is brutal and useful: $h = 5 k / D$ , and liquid sodium's $k \approx 7 0 \ \mathrm { W / m \, K }$ at reactor temperatures means a $1 0 \ \mathrm { m m }$ tube gets $h \approx 3 5 { , } 0 0 0 \ \mathrm { W / m ^ { 2 } K } $ at any flow rate at all — but so does a $1 0 \ \mathrm { m m } $ tube at a tenth the flow rate.** **Liquid-metal cooling is nearly flow-independent, which is wonderful for pump reliability and terrible for control: turning the pump up will not save an overheating core, which is why fast-reactor designs rely on the flow being there at all times rather than on the flow being adjustable.**
:::

## Turbulent flow: two correlations and the range where neither works

::: definition Dittus–Boelter: the workhorse {#def-db}
For turbulent flow in smooth circular tubes, thermally fully developed, moderate property differences across the section:
$$
\boxed { \; { \overline { \mathrm { N u } } } _ { D } = 0 . 0 2 3 \, \mathrm { R e } _ { D } ^ { 0 . 8 } \, \mathrm { Pr } ^ { n } \; } \qquad n = { \begin{cases} 0 . 4 & \text{fluid heated} \left( T _ { s } > T _ { m } \right) \\ 0 . 3 & \text{fluid cooled} \end{cases} }
$$
**Validity: $\mathrm { R e } _ { D } \gtrsim 1 0 ^ { 4 }$ , $0 . 6 \lesssim \mathrm { Pr } \lesssim 1 6 0$ , $L / D \gtrsim 1 0$ ; all properties at the bulk mean $T _ { m }$ ; scatter $\pm 2 5 \ \ \%$ , worse at the Prandtl-number extremes.** **It is an empirical fit (1930) to 287 data points of air, water and oil, and it remains the most-used equation in thermal engineering — including in its own author's words, "it should not be used where accuracy matters."**
**Why the exponent $0 . 8$ , and why the asymmetry.** The $4 / 5$ comes from the one-seventh-power velocity profile of the turbulent layer ($\delta / D \sim \mathrm { R e } ^ { - 1 / 4 }$ , so the wall gradient, and $\mathrm { N u }$, go as $\mathrm { R e } ^ { 4 / 5 }$ ) — the same exponent as the turbulent flat plate, because the tube core is a flat plate's unmanaged twin. **The $0 . 4$ versus $0 . 3$ on Prandtl number is a crude viscosity correction: heating a liquid thins the wall layer and helps transfer (hence the larger exponent), cooling thickens it and hurts.** **Where the liquid viscosity varies strongly across the section, use the Sieder–Tate turbulent form instead — $\mathrm { N u } = 0 . 0 2 7 \, \mathrm { R e } ^ { 0 . 8 } \, \mathrm { Pr } ^ { 1 / 3 } ( \mu / \mu _ { s } ) ^ { 0 . 1 4 }$ — which puts the property effect where the physics puts it, at the wall.** **For gases with large temperature differences the analogous correction is a factor $( T _ { m } / T _ { s } ) ^ { n }$ with $n \approx 0 . 5 5$ for heating and $n \approx 0$ for cooling (Hall–Prieder), because in a gas it is density, not viscosity, that rearranges the near-wall layer.**
**The Colburn $j$ -form of the same information, worth memorising because it extends to mass transfer and to rough surfaces:**
$$
j _ { H } \equiv \mathrm { St } \, \mathrm { Pr } ^ { 2 / 3 } = { \frac { f } { 8 } } \qquad \Longleftrightarrow \qquad \mathrm { N u } = { \frac { f } { 8 } } \, \mathrm { R e } \, \mathrm { Pr } ^ { 1 / 3 }
$$
**with $f$ the Darcy friction factor — $f = 0 . 1 2 8 \, \mathrm { R e } ^ { - 0 . 2 5 }$ for smooth tubes at these Reynolds numbers, which reproduces the $0 . 0 2 3 \, \mathrm { R e } ^ { 0 . 8 }$ to within a few per cent. The analogy says the tube trades heat and momentum at the same exchange rate, exactly as on the flat plate: any device that raises $f$ to trip the layer — wire coils, turbulators, roughness — raises $\mathrm { N u }$ in proportion, and the whole art of enhanced surfaces is doing it with less friction than the analogy prices in.**
:::

::: definition Gnielinski: the accurate one {#def-gnielinski}
For $3 0 0 0 < \mathrm { R e } _ { D } < 5 \times 1 0 ^ { 6 }$ and $0 . 5 < \mathrm { Pr } < 2 0 0 0$ , smooth tubes, fully developed:
$$
\boxed { \; { \overline { { \mathrm { N u } } } } _ { D } = { \frac { ( f / 8 ) \left( \mathrm { R e } _ { D } - 1 0 0 0 \right ) \mathrm { Pr } } { 1 + 1 2 . 7 \, ( f / 8 ) ^ { 1 / 2 } \left( \mathrm { Pr } ^ { 2 / 3 } - 1 \right ) } } \; } \qquad f = \left( 0 . 7 9 \, \ln \mathrm { R e } _ { D } - 1 . 6 4 \right ) ^ { - 2 }
$$
**The friction factor in the numerator is Petukhov's smooth-tube fit; the $- 1 0 0 0$ in the numerator and the Prandtl-function denominator are the two-layer correction — the first accounts for the laminar sublayer eating part of the momentum transfer, the second for the sublayer's thermal resistance. Both were earned from data, and both matter: switch them off and you have a Colburn-type equation good to $\pm 4 0 \ \ \%$ instead of $\pm 1 0 \ \ \%$.**
**Accuracy: about $\pm 1 0 \ \ \%$ for $\mathrm { R e } > 1 0 ^ { 4 }$ and $0 . 6 < \mathrm { Pr } < 2 0 0$ — the best general-purpose correlation available, and the one to use whenever the number is going into a purchase order.** **At $\mathrm { R e } = 3 0 0 0$ its stated error is already $\pm 2 5 \ \ \%$ , and below $3 0 0 0$ it says nothing whatever about what your tube will do.** **Note the $- 1 0 0 0$ : the correlation itself admits that a fifth of the "Reynolds number" of a $3 0 0 0$-Re tube is doing no turbulent work at all.**
:::

::: widget plot
title: Fully developed Nusselt number against Reynolds number, water (Pr = 5.83)
f: 3.66; 0.858*10^(x/3); ((0.79*x*ln(10)-1.64)^-2/8)*(10^x-1000)*5.83/(1+12.7*sqrt((0.79*x*ln(10)-1.64)^-2/8)*(5.83^(2/3)-1))
x: 3.4, 4.8
y: 0, 400
labels: laminar fully developed, Nu = 3.66; laminar with entry, L/D = 60; Gnielinski, fully developed
caption: Three answers to "what is $\mathrm { N u }$ in my tube," against $\log _ { 1 0 } \mathrm { R e } _ { D }$ . **The flat line at $3 . 6 6$ is the theorem — fully developed laminar, flow-independent, the most boring line in heat transfer. The gentle ramp is what a laminar tube of $L / D = 6 0$ actually delivers once entry effects are counted — five times the theorem at $\mathrm { R e } = 2 3 0 0$ , and the number you should use for any laminar design.** **The steep curve is Gnielinski: at $\mathrm { R e } = 1 0 ^ { 4 }$ it says $7 4$ , at $\mathrm { R e } = 1 0 ^ { 5 }$ it says $5 5 0$ — a factor of $1 5 0$ above the laminar theorem at the top of the chart.** **The gap between the ramp and the curve at $\log { \mathrm { R e } } \approx 3 . 6$ is the transition region, and this chart cannot draw it honestly: between $2 3 0 0$ and $1 0 ^ { 4 }$ the real answer depends on trip wires, pipe bends, pump pulsation and the phase of the moon, which is why the professional convention is to design above $1 0 ^ { 4 }$ or below $2 3 0 0$ and never in between.**
:::

::: example Heating water with a constant-wall-temperature surface {#ex-turb-water}
Water at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and $\dot { m } = 0 . 4 0 \ \mathrm { k g / s }$ flows through $L = 1 0 \ \mathrm { m }$ of $D = 1 6 \ \mathrm { m m }$ tube whose wall is held at $8 0 \ \ {} ^ { \circ } \mathrm { C }$ by condensing steam on the outside. Find the outlet temperature, the heat rate, and the pumping power.

::: solution
**Properties at an assumed $4 0 \ \ {} ^ { \circ } \mathrm { C }$ mean** (iterate if the answer moves the mean much): $\rho = 9 9 2 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 4 1 7 9 \ \mathrm { J / k g \, K }$ , $\mu = 6 5 3 \times 1 0 ^ { - 6 } \ \mathrm { N \, s / m ^ { 2 } }$ , $k = 0 . 6 3 1 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 4 . 3 2$ .
$$
U _ { m } = { \frac { 0 . 4 0 } { 9 9 2 \times 2 . 0 1 1 \times 1 0 ^ { - 4 } } } = 2 . 0 0 \ \mathrm { m / s } \qquad \mathrm { R e } _ { D } = { \frac { 9 9 2 \times 2 . 0 0 \times 0 . 0 1 6 } { 6 5 3 \times 1 0 ^ { - 6 } } } = 4 8 { , } 7 0 0
$$
**Turbulent and thermally long ($L / D = 6 2 5 \gg 6 0$), so fully developed correlations apply.** Gnielinski with $f = \left( 0 . 7 9 \ln 4 8 \, 7 0 0 - 1 . 6 4 \right ) ^ { - 2 } = 0 . 0 2 1 1$ :
$$
\mathrm { N u } = { \frac { ( 0 . 0 2 1 1 / 8 ) \times 4 7 { , } 7 0 0 \times 4 . 3 2 } { 1 + 1 2 . 7 \times ( 0 . 0 2 1 1 / 8 ) ^ { 1 / 2 } \times \left( 4 . 3 2 ^ { 2 / 3 } - 1 \right ) } } = { \frac { 4 8 2 } { 1 . 8 4 } } = 2 6 2 \qquad h = { \frac { 2 6 2 \times 0 . 6 3 1 } { 0 . 0 1 6 } } = 1 0 { , } 3 0 0 \ \mathrm { W / m ^ { 2 } K }
$$
**(Dittus–Boelter would give $2 3 2$ and $9 1 7 0$ — $1 1 \ \ \%$ lower, inside both correlations' error bands, which is the whole argument between them in a sentence.)** Constant wall temperature means the exponential approach:
$$
\mathrm { N T U } = { \frac { h \pi D L } { { \dot { m } } c _ { p } } } = { \frac { 1 0 \, 3 0 0 \times \pi \times 0 . 0 1 6 \times 1 0 } { 0 . 4 0 \times 4 1 7 9 } } = 3 . 1 0 \qquad T _ { m } ( L ) = 8 0 - 6 0 \, e ^ { - 3 . 1 0 } = \mathbf { 7 7 . 3 \ \mathrm { ^ \circ C } }
$$
$$
q = { \dot { m } } c _ { p } \Delta T _ { m } = 1 6 7 2 \times 5 7 . 3 = \mathbf { 9 5 . 8 \ \mathrm { k W } } \qquad \Delta p = f { \frac { L } { D } } { \frac { \rho U ^ { 2 } } { 2 } } = 0 . 0 2 1 1 \times 6 2 5 \times 3 9 8 0 = 2 6 . 3 \ \mathrm { k P a } \qquad P = { \frac { \Delta p \, { \dot { m } } } { \rho } } = \mathbf { 1 0 . 6 \ \mathrm { W } }
$$
**Three readings. The tube leaves $3 \ \mathrm { K }$ short of the steam temperature and delivers nearly $1 0 0 \ \mathrm { k W }$ — and the last $1 \ \mathrm { K }$ of approach would cost another $1 0 \ \mathrm { m }$ , because $e ^ { - 3 }$ is where exponentials live.** **The pumping power is ten watts against ninety-six kilowatts of heat: $0 . 0 1 \ \ \%$ — turbulent water is cheap to move and this is why the transition-region worry below is worth more than any pumping worry.** **And the property choice: at the true mean of $6 9 \ \ {} ^ { \circ } \mathrm { C }$ the viscosity is $4 1 3 \times 1 0 ^ { - 6 }$ and $\mathrm { P r } = 2 . 7$ , giving $h \approx 8 3 0 0$ and an outlet of $7 5 . 5 \ \ {} ^ { \circ } \mathrm { C }$ — a $2 \ \mathrm { K }$ error from evaluating properties at the wrong end of an $8 0 \ \mathrm { K }$ span. For water, evaluate at the mean and iterate once; the answer is worth it and the arithmetic is not.**
:::
:::

**The transition region deserves its own paragraph because no correlation covers it.** Between $\mathrm { R e } \approx 2 3 0 0$ and $1 0 ^ { 4 }$ the flow is neither: spots of turbulence appear and die, and whether they win depends on inlet history, surface roughness, vibration and free-stream turbulence in a way that has never been correlated to better than a factor of two. **Measurements show the local Nusselt number in this range can sit below the laminar value — the flow is too broken to mix like turbulence and too mixed to conduct like laminar flow — and the classic design guidance (Reynolds' own experiments date from 1883 and have not been bettered on candour) is: if you must operate here, design for the laminar answer and instrument the result.** **The practical escapes are three: raise the flow above $\mathrm { R e } = 1 0 ^ { 4 }$ (the usual answer, and why water-side velocities in shell-and-tube exchangers are chosen near $1 . 5$–$2 \ \mathrm { m / s }$ on $1 6$–$2 0 \ \mathrm { m m }$ tubes); trip the flow deliberately with a rough inlet or inserted wire; or design the whole thing laminar and accept the Graetz answer.**

## Pressure drop, pumping power, and the diameter bargain

::: definition The pressure drop and what it costs {#def-pumping}
Darcy–Weisbach for a smooth tube of length $L$, plus the pump power to pay for it:
$$
\Delta p = f \, { \frac { L } { D } } \, { \frac { \rho U _ { m } ^ { 2 } } { 2 } } \qquad P _ { \text{pump} } = { \frac { \Delta p \, { \dot { m } } } { \rho } } \qquad f = { \begin{cases} 6 4 / \mathrm { R e } & \text{laminar} \\ \left( 0 . 7 9 \ln \mathrm { R e } - 1 . 6 4 \right ) ^ { - 2 } & \text{turbulent, smooth} \end{cases} }
$$
**The two regimes scale completely differently, and every exchanger design is a walk along these scalings.** At fixed flow rate:
$$
\begin{array} { l c c c }
& \text{Laminar} & \text{Turbulent (smooth)} & \text{Read as} \\
h \text{ at fixed } \dot { m } , D & \propto \ \dot { m } ^ { 0 } \text{ (fd.) or } \dot { m } ^ { 1 / 3 } \text{ (entry)} & \propto \ \dot { m } ^ { 0 . 8 } & \text{doubling flow: } + 7 4 \ \ \% \text{ turbulent} \\
\Delta p \text{ at fixed } \dot { m } , D & \propto \ \dot { m } ^ { 1 } & \propto \ \dot { m } ^ { 1 . 8 } & \text{doubling flow: } \times 7 \text{ the pumping power} \\
h \text{ at fixed } \dot { m } , L & \propto \ D ^ { - 1 } \text{ (entry: } D ^ { - 4 / 3 } ) & \propto \ D ^ { - 1 . 2 } & \text{halving diameter: } \times 2 . 3 \\
\Delta p \text{ at fixed } \dot { m } , L & \propto \ D ^ { - 4 } & \propto \ D ^ { - 4 . 8 } & \text{halving diameter: } \times 1 6 \text{ to } 2 8
\end{array}
$$
**The turbulent row is the bargain every designer signs: heat transfer is bought from the diameter at the rate $D ^ { - 1 . 2 }$ and paid for at $D ^ { - 4 . 8 }$ — an exponent ratio of four, meaning that each doubling of specific area (per unit volume, $\propto 1 / D$) quadruples the pumping penalty per unit of gain.** **This is why compact exchangers push $D$ down to a few millimetres and no further with pumped liquid, why gas turbines cool blades with small holes but do not pump the air through passages, and why natural circulation — where the driving head is centimetres of density difference, not a pump — cannot use small tubes at all.**
:::

::: example The two levers, priced {#ex-levers}
A water tube operates turbulent at $\mathrm { R e } = 4 \times 1 0 ^ { 4 }$ . Compare the cost and benefit of (a) doubling the flow rate, and (b) replacing the tube run with tubes of half the diameter at the same total flow rate and total length.

::: solution
**(a) Double the flow.** $h \propto { \dot { m } } ^ { 0 . 8 }$ : coefficient $\times 2 ^ { 0 . 8 } = 1 . 7 4$ . Area unchanged, so heat transfer per unit wall temperature difference $\times 1 . 7 4$ . Pumping: $\Delta p \propto { \dot { m } } ^ { 1 . 8 }$ and $P = \Delta p \, \dot { m } / \rho \propto { \dot { m } } ^ { 2 . 8 }$ : **$\times 2 ^ { 2 . 8 } = 7 . 0$ the pumping power.** **The exchange rate is $7$ watts of pump for $1 . 7 4$ times the heat — acceptable when the alternative is a bigger exchanger, painful when the pump is already at its curve.**
**(b) Halve the diameter.** Same $\dot { m }$ , same total flow area means four times the tubes… or half the tubes at twice the velocity — the scaling below is per unit length at fixed $\dot { m }$ through the same flow area, so take the classic single-tube swap: same $\dot { m }$ through half the diameter, $U \times 4$ :
$$
h \times 2 ^ { 1 . 2 } = 2 . 3 0 \qquad \Delta p \propto D ^ { - 4 . 8 } \times 2 ^ { 4 . 8 } = 2 8 \qquad \text{area per metre} \times { \frac { 1 } { 2 } } \quad \Longrightarrow \quad { \frac { h A } { \text{metre} } } \times 1 . 1 5 , \quad P \times 2 8
$$
**Fifteen per cent more conductance per metre for twenty-eight times the pumping power — the diameter lever is dead at the pumping side long before it is exhausted on the heat side.** **At $2 8$ times the pressure drop a $1 0 \ \mathrm { m }$ run of $1 6 \rightarrow 8 \ \mathrm { m m }$ tubes goes from $2 6 \ \mathrm { k P a }$ (Example 5) to three-quarters of a megapascal, and the tube-bundle headers, gaskets and pump all get more expensive than the extra metal you saved.** **The optimum this arithmetic points at — differentiate $h A$ against $\Delta p ^ { 1 / 3 . 5 }$ or whatever your energy price says — is why real designs cluster at $1 . 5$–$2 \ \mathrm { m / s }$ for water in $1 6 \ \mathrm { m m } $ tubes and have done since Kern's tables of 1950.**
:::
:::

::: definition Mini-channels, micro-channels, and non-circular ducts {#def-dh}
**Hydraulic diameter.** For any duct, $D _ { h } = 4 A _ { c } / P _ { w }$ (flow area over wetted perimeter). **For turbulent flow this works: every non-circular duct agrees with the circular correlations to within $1 0$–$1 5 \ \ \%$ when $D _ { h }$ is used, because turbulent mixing erases the shape of the section almost as much as it erases its history.** **For laminar flow it fails in a specific, predictable way: both $\mathrm { N u }$ and $f \, \mathrm { R e }$ are shape constants, and their ratio is not the round tube's:**
$$
\begin{array} { l c c c c }
\text{Section} & \text{Circle} & \text{Parallel plates} \left( \text{wide} \right) & \text{Square} & \text{Equilateral triangle} \\
\mathrm { N u } _ { D _ { h } } \; ( T _ { s } = \text{const} ) & 3 . 6 6 & 7 . 5 4 & 2 . 9 8 & 2 . 4 7 \\
f \, \mathrm { R e } _ { D _ { h } } & 6 4 & 9 6 & 8 9 . 9 & 7 6 . 1
\end{array}
$$
**Read the table as: the hydraulic diameter alone would predict $3 . 6 6$ for all four shapes; the truth spans a factor of three.** **Shah's correction is the practical fix: compute the round-tube answer with $D _ { h }$ and multiply by the tabulated ratio $\left( \mathrm { N u } / \mathrm { N u } _ { \text{circle} } \right ) _ { \text{shape} }$ — $2 . 0 6$ for plates, $0 . 8 1$ for squares — and likewise for the friction constant.**
**Mini- and micro-channels** (hydraulic diameter below about $1 \ \mathrm { m m }$ , and seriously below $2 0 0 \ \mu\mathrm { m }$ ) **break more than the shape table.** The classical continuum assumptions erode together: viscous dissipation in the thin channels heats the fluid whether you want it to or not (it enters the mean-temperature equation as a source $\tau U / D _ { h }$ per unit length); transition, if the walls are smooth and the flow clean, moves *down* toward $\mathrm { R e } \approx 1 5 0 0$–$2 0 0 0$ in liquids, not up as early textbooks repeated; and at sub-micrometre scales the no-slip and continuum assumptions themselves need Knudsen-number corrections. **The honest engineering position: below $1 0 0 \ \mu\mathrm { m }$ , published correlations disagree with each other by a factor of two, and you design from your own measurements or from the manufacturer's curves.**
:::

::: example A silicon micro-channel cold plate {#ex-micro}
Water at $2 7 \ \ {} ^ { \circ } \mathrm { C }$ is driven through $2 0 0 \ \mu\mathrm { m } \times 6 0 0 \ \mu\mathrm { m }$ rectangular channels etched in silicon at a mean velocity of $1 \ \mathrm { m / s }$ . Estimate the coefficient, the wall rise at a chip heat flux of $1 0 0 \ \mathrm { W / c m ^ { 2 } }$ , and the pressure gradient.

::: solution
$$
D _ { h } = { \frac { 4 \times 2 0 0 \times 6 0 0 } { 2 ( 2 0 0 + 6 0 0 ) } } = 3 0 0 \ \mu\mathrm { m } \qquad \mathrm { R e } _ { D _ { h } } = { \frac { 9 9 7 \times 1 . 0 \times 3 0 0 \times 1 0 ^ { - 6 } } { 8 5 5 \times 1 0 ^ { - 6 } } } = 3 5 0
$$
**Laminar, and the Graetz group $\mathrm { R e } \, \mathrm { Pr } \, D _ { h } / L$ for a $1 0 \ \mathrm { m m }$ long channel is $3 5 0 \times 5 . 8 3 \times 0 . 0 3 = 6 1 > 3 0$ — thermally developing, but take the fully developed constant-flux value as the lower bound:**
$$
h \gtrsim { \frac { 4 . 3 6 \times 0 . 6 1 3 } { 3 0 0 \times 1 0 ^ { - 6 } } } = 8 9 0 0 \ \mathrm { W / m ^ { 2 } K } \qquad \text{(entry region raises it; } \mathrm { N u } \approx 1 2 \text{ is typical, } h \approx 2 5 { , } 0 0 0 \text{)}
$$
$$
\Delta T _ { w } = { \frac { q ^ { \prime \prime } } { h } } = { \frac { 1 0 ^ { 6 } } { 8 9 0 0 } } = 1 1 2 \ \mathrm { K } \ \text{(worst)} \qquad \text{or} \qquad { \frac { 1 0 ^ { 6 } } { 2 5 \, 0 0 0 } } = 4 0 \ \mathrm { K } \ \text{(with entry)}
$$
$$
f = { \frac { 6 4 } { 3 5 0 } } = 0 . 1 8 3 \qquad { \frac { \Delta p } { L } } = f { \frac { \rho U ^ { 2 } } { 2 D _ { h } } } = 0 . 1 8 3 \times { \frac { 9 9 7 \times 1 ^ { 2 } } { 2 \times 3 0 0 \times 1 0 ^ { - 6 } } } = \mathbf { 0 . 3 0 \ \mathrm { M P a / m } }
$$
**A third of a megapascal per centimetre of length — three atmospheres per centimetre — to push water through a channel the width of an eyelash.** **That is the whole story of micro-channel cooling in one number: the heat-transfer side is spectacular (ten times any air-cooled sink, and the $4 0 \ \mathrm { K }$ at $1 0 0 \ \mathrm { W / c m ^ { 2 } }$ is a real chip-cooling answer), and the fluid side eats the budget in pressure, seals and a pump that has no business inside an electronics enclosure.** **The design response, as always in this lesson, is the bookkeeping equation: the same $h$ at a tenth the velocity gives a hundredth the pressure gradient and a tenth the flow — and micro-channel designs live or die on the manifold design that distributes the flow, not on the correlation.**
:::
:::

## Exercises

::: exercise The flow at which water stops being laminar {#ex-re2300 level=1 check="0.019"}
What mass flow rate of water at $4 0 \ \ {} ^ { \circ } \mathrm { C }$ $\left( \mu = 6 5 3 \times 1 0 ^ { - 6 } \ \mathrm { N \, s / m ^ { 2 } } \right)$ in a $D = 1 6 \ \mathrm { m m }$ tube corresponds to $\mathrm { R e } _ { D } = 2 3 0 0$ , the classical lower transition limit? (Enter the mass flow rate in $\mathrm { k g / s }$ .)

::: solution
$$
{ \dot { m } } = { \frac { \pi } { 4 } } D \, \mu \, \mathrm { R e } = { \frac { \pi } { 4 } } \times 0 . 0 1 6 \times 6 5 3 \times 1 0 ^ { - 6 } \times 2 3 0 0 = 0 . 0 1 8 9 \ \mathrm { k g / s } \approx \mathbf { 0 . 0 1 9 \ \mathrm { k g / s } }
$$
**Nineteen grams per second — a kitchen tap's twentieth — is the entire laminar range of a $1 6 \ \mathrm { m m }$ water tube.** **This is the least-known fact in internal convection: for water in normal tube sizes, "laminar" is a laboratory regime, and almost every laminar calculation you will ever do is either micro-scale, oil, or a mistake.**
:::
:::

::: exercise A laminar water tube in its entry region {#ex-lam2 level=2 check="426"}
Water at $2 7 \ \ {} ^ { \circ } \mathrm { C }$ $\left( \rho = 9 9 7 \ \mathrm { k g / m ^ { 3 } } \right.$ , $\mu = 8 5 5 \times 1 0 ^ { - 6 } \ \mathrm { N \, s / m ^ { 2 } }$ , $k = 0 . 6 1 3 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 5 . 8 3$ ) flows at $\dot { m } = 0 . 0 1 2 \ \mathrm { k g / s }$ through $L = 2 . 0 \ \mathrm { m }$ of $D = 1 0 \ \mathrm { m m }$ tube. Estimate the average heat-transfer coefficient. (Enter $\mathrm { W / m ^ { 2 } K }$ .)

::: solution
$$
U _ { m } = { \frac { 0 . 0 1 2 } { 9 9 7 \times 7 . 8 5 4 \times 1 0 ^ { - 5 } } } = 0 . 1 5 3 \ \mathrm { m / s } \qquad \mathrm { R e } = { \frac { 9 9 7 \times 0 . 1 5 3 \times 0 . 0 1 0 } { 8 5 5 \times 1 0 ^ { - 6 } } } = 1 7 9 0 \quad \text{laminar}
$$
$$
{ \frac { \mathrm { R e } \, \mathrm { Pr } \, D } { L } } = { \frac { 1 7 9 0 \times 5 . 8 3 \times 0 . 0 1 0 } { 2 . 0 } } = 5 2 . 1 \qquad { \overline { { \mathrm { N u } } } } = 1 . 8 6 \times 5 2 . 1 ^ { 1 / 3 } = 1 . 8 6 \times 3 . 7 3 4 = 6 . 9 5
$$
$$
{ \overline { { h } } } = { \frac { 6 . 9 5 \times 0 . 6 1 3 } { 0 . 0 1 0 } } = \mathbf { 4 2 6 \ \mathrm { W / m ^ { 2 } K } }
$$
**The fully developed value would be $3 . 6 6 \times 0 . 6 1 3 / 0 . 0 1 0 = 2 2 4$ — the entry region contributes nearly half again, and the Graetz group of $5 2$ (against the threshold of about $2 0$ for "fully developed") says the tube is thermally short.**
:::
:::

::: exercise Dittus–Boelter on a hot water tube {#ex-db level=1 check="14300"}
Water at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ $\left( \rho = 9 8 3 \ \mathrm { k g / m ^ { 3 } } \right.$ , $\mu = 4 6 6 \times 1 0 ^ { - 6 } \ \mathrm { N \, s / m ^ { 2 } }$ , $k = 0 . 6 5 4 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 2 . 9 8$ ) flows at $\dot { m } = 0 . 3 0 \ \mathrm { k g / s }$ through a $D = 1 2 \ \mathrm { m m }$ tube, being heated by the wall. Estimate $h$ with Dittus–Boelter. (Enter $\mathrm { W / m ^ { 2 } K }$ .)

::: solution
$$
U _ { m } = { \frac { 0 . 3 0 } { 9 8 3 \times 1 . 1 3 1 \times 1 0 ^ { - 4 } } } = 2 . 7 0 \ \mathrm { m / s } \qquad \mathrm { R e } = { \frac { 9 8 3 \times 2 . 7 0 \times 0 . 0 1 2 } { 4 6 6 \times 1 0 ^ { - 6 } } } = 6 8 \, 3 0 0
$$
$$
\mathrm { N u } = 0 . 0 2 3 \times 6 8 \, 3 0 0 ^ { 0 . 8 } \times 2 . 9 8 ^ { 0 . 4 } = 0 . 0 2 3 \times 8 2 6 0 \times 1 . 4 8 9 = 2 6 2 \qquad h = { \frac { 2 6 2 \times 0 . 6 5 4 } { 0 . 0 1 2 } } = \mathbf { 1 4 \, 3 0 0 \ \mathrm { W / m ^ { 2 } K } }
$$
**Heated fluid, so $n = 0 . 4$ ; at $6 8 \, 3 0 0$ the correlation is comfortably in range, and the $2 5 \ \ \%$ scatter band means the honest answer is "$1 2 \, 0 0 0$ to $1 8 \, 0 0 0$ ."**
:::
:::

::: exercise The same tube by Gnielinski {#ex-gn level=2 check="16000"}
For the tube of [[#ex-db|the Dittus–Boelter exercise]] $\left( \mathrm { R e } = 6 8 \, 3 0 0 \right.$ , $\mathrm { P r } = 2 . 9 8 \left.\right)$ , compute $h$ with the Gnielinski correlation. (Enter $\mathrm { W / m ^ { 2 } K }$ .)

::: solution
$$
f = \left( 0 . 7 9 \ln 6 8 \, 3 0 0 - 1 . 6 4 \right ) ^ { - 2 } = \left( 0 . 7 9 \times 1 1 . 1 3 - 1 . 6 4 \right ) ^ { - 2 } = 7 . 1 5 ^ { - 2 } = 0 . 0 1 9 5
$$
$$
\mathrm { N u } = { \frac { ( 0 . 0 1 9 5 / 8 ) \times 6 7 \, 3 0 0 \times 2 . 9 8 } { 1 + 1 2 . 7 \times ( 0 . 0 1 9 5 / 8 ) ^ { 1 / 2 } \times \left( 2 . 9 8 ^ { 2 / 3 } - 1 \right ) } } = { \frac { 4 9 0 } { 1 + 1 2 . 7 \times 0 . 0 4 9 4 \times 1 . 0 5 7 } } = { \frac { 4 9 0 } { 1 . 6 6 3 } } = 2 9 4
$$
$$
h = { \frac { 2 9 4 \times 0 . 6 5 4 } { 0 . 0 1 2 } } = \mathbf { 1 6 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K } }
$$
**Twelve per cent above Dittus–Boelter — inside both correlations' quoted bands, which is exactly why the choice between them is a choice of accuracy claim, not of physics.** **Note the $- 1 0 0 0$ costs $1 . 5 \ \ \%$ here; at $\mathrm { R e } = 5 0 0 0$ it would cost $2 0 \ \ \%$ , which is where the two-layer correction earns its keep.**
:::
:::

::: exercise How long to get to 70 degrees {#ex-length level=2 check="5.8"}
In the tube of [[#ex-turb-water|the constant-wall-temperature example]] $\left( D = 1 6 \ \mathrm { m m } \right.$ , $\dot { m } = 0 . 4 0 \ \mathrm { k g / s }$ , water at $4 0 \ \ {} ^ { \circ } \mathrm { C }$ properties, $h = 1 0 \, 3 0 0 \ \mathrm { W / m ^ { 2 } K }$ , $T _ { s } = 8 0 \ \ {} ^ { \circ } \mathrm { C }$ , inlet $2 0 \ \ {} ^ { \circ } \mathrm { C }$ ), how much tube is needed for the water to reach $7 0 \ \ {} ^ { \circ } \mathrm { C }$ ? (Enter metres.)

::: solution
$$
\frac { T _ { s } - T _ { m } ( L ) } { T _ { s } - T _ { m } ( 0 ) } = \frac { 1 0 } { 6 0 } = e ^ { - \mathrm { N T U } } \qquad \mathrm { N T U } = \ln 6 = 1 . 7 9 2
$$
$$
A _ { s } = { \frac { \mathrm { N T U } \times { \dot { m } } c _ { p } } { h } } = { \frac { 1 . 7 9 2 \times 1 6 7 2 } { 1 0 \, 3 0 0 } } = 0 . 2 9 1 \ \mathrm { m ^ { 2 } } \qquad L = { \frac { A _ { s } } { \pi D } } = { \frac { 0 . 2 9 1 } { 0 . 0 5 0 3 } } = \mathbf { 5 . 8 \ \mathrm { m } }
$$
**Five point eight metres for $7 0 \ \ {} ^ { \circ } \mathrm { C }$ , ten for $7 7 \ \ {} ^ { \circ } \mathrm { C }$ , and — since each further $6 3 \ \ \%$ of the remaining gap costs another $1 0 \ \mathrm { m }$ — roughly $1 6 \ \mathrm { m }$ for $7 9 . 5 \ \ {} ^ { \circ } \mathrm { C }$ .** **The last five kelvin cost more metal than the first fifty: this is the exponential, and it is why heat exchangers are sized by cost models and not by "get it as close as possible."**
:::
:::

::: exercise The price of a bigger pump {#ex-pump level=2 check="7.0"}
A turbulent-water tube exchanger is re-rated by doubling the flow rate through the same tubes. By what factor does the pumping power increase? (Enter the factor.)

::: solution
**Turbulent smooth-tube: $\Delta p \propto f \, { \dot { m } } ^ { 2 }$ with $f \propto { \mathrm { R e } } ^ { - 0 . 2 5 } \propto { \dot { m } } ^ { - 0 . 2 5 }$ , so $\Delta p \propto { \dot { m } } ^ { 1 . 7 5 }$ and**
$$
P = { \frac { \Delta p \, { \dot { m } } } { \rho } } \propto { \dot { m } } ^ { 2 . 7 5 } \qquad \Longrightarrow \qquad 2 ^ { 2 . 7 5 } = 6 . 7 \approx \mathbf { 7 }
$$
**(With the $1 . 8$ exponent, $2 ^ { 2 . 8 } = 7 . 0$ — the same answer to two figures.)** **Seven times the pumping power for $1 . 7 4$ times the heat transfer; the ratio of the two, $1 . 7 4 / 7 \approx 0 . 2 5$ , is the marginal efficiency of the lever, and it only improves if the extra flow replaces surface area you would otherwise have bought.** **This is also why variable-speed pumping saves energy in part-load conditions far below the flow reduction: at half flow the pump asks for an eighth of the power.**
:::
:::

::: exercise Liquid sodium in a fast-reactor fuel pin channel {#ex-na level=2 check="37000"}
Liquid sodium at $4 0 0 \ \ {} ^ { \circ } \mathrm { C }$ $\left( k \approx 7 4 \ \mathrm { W / m \, K } \right.$ , $\mathrm { P r } \approx 0 . 0 0 7 5$ ) flows through a $1 0 \ \mathrm { m m }$ diameter fuel-pin channel fully developed at $\mathrm { R e } = 1 0 \, 0 0 0$ . Estimate $h$ at constant wall temperature. (Enter $\mathrm { W / m ^ { 2 } K }$ .)

::: solution
$$
\mathrm { N u } \approx 5 . 0 \qquad h = { \frac { 5 . 0 \times 7 4 } { 0 . 0 1 0 } } = \mathbf { 3 7 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K } }
$$
**Thirty-seven thousand — the highest convection coefficient in this lesson — and it would be the same at $\mathrm { R e } = 1 0 0 0$ or $1 0 0 \, 0 0 0$ , because for liquid metals the coefficient is conduction, not mixing.** **The design consequence, stated plainly in every fast-reactor thermal-hydraulics text: sodium cooling gives enormous, flow-insensitive coefficients, which is why such reactors can coast on natural circulation after shutdown — the conduction coefficient does not care that the pump has stopped, only that the sodium still covers the core.**
:::
:::

::: exercise Two wall conditions, two wall temperatures {#ex-walltemp level=3 check="86"}
Water is heated from $2 0 \ \ {} ^ { \circ } \mathrm { C }$ to $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in $1 0 \ \mathrm { m }$ of $1 6 \ \mathrm { m m }$ tube at $\dot { m } = 0 . 4 0 \ \mathrm { k g / s }$ , with $h = 1 0 \, 3 0 0 \ \mathrm { W / m ^ { 2 } K }$ approximately constant. In design (a) the heat flux is uniform along the tube; in design (b) the wall is at constant temperature and the outlet just reaches $7 0 \ \ {} ^ { \circ } \mathrm { C }$ . What is the outlet wall temperature of design (a)? (Enter $^ { \circ } \mathrm { C }$ .)

::: solution
$$
q = { \dot { m } } c _ { p } \Delta T _ { m } = 0 . 4 0 \times 4 1 7 9 \times 5 0 = 8 3 . 6 \ \mathrm { k W } \qquad q ^ { \prime \prime } = { \frac { q } { \pi D L } } = { \frac { 8 3 \, 6 0 0 } { 0 . 5 0 3 } } = 1 6 6 \ \mathrm { k W / m ^ { 2 } }
$$
$$
T _ { w , \text{out} } = T _ { m } ( L ) + { \frac { q ^ { \prime \prime } } { h } } = 7 0 + { \frac { 1 6 6 \, 0 0 0 } { 1 0 \, 3 0 0 } } = 7 0 + 1 6 = \mathbf { 8 6 \ \mathrm { ^ \circ C } }
$$
**Design (b), for comparison, needs $T _ { s } - 7 0 = \left( T _ { s } - 2 0 \right ) e ^ { - 3 . 1 0 }$ , i.e. $T _ { s } = 2 0 + 5 0 / ( 1 - e ^ { - 3 . 1 0 } ) = 7 2 \ \ {} ^ { \circ } \mathrm { C }$ — fourteen kelvin cooler wall for the same duty.** **If the service is water near its atmospheric boiling point, design (a) is a boiling design and design (b) is not, and the two engineers who made those drawings did not have the same problem at all.**
:::
:::

::: exercise Design: a steam-heated water preheater {#ex-design level=4}
Design the tube side of a preheater: $2 . 0 \ \mathrm { k g / s }$ of water from $1 5 \ \ {} ^ { \circ } \mathrm { C }$ to $6 0 \ \ {} ^ { \circ } \mathrm { C }$ , condensing steam at $7 0 \ \ {} ^ { \circ } \mathrm { C }$ outside the tubes, copper-free brass tubes of $1 6 \ \mathrm { m } \, \mathrm { I D }$ , water velocity chosen near $1 . 4 \ \mathrm { m / s }$ to respect the transition rule and the erosion limit. Estimate the number of tube lengths needed, the total area, and the pumping power. Properties at the $3 7 . 5 \ \ {} ^ { \circ } \mathrm { C }$ mean: $\rho = 9 9 3 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 4 1 7 8 \ \mathrm { J / k g \, K }$ , $\mu = 6 9 0 \times 1 0 ^ { - 6 } \ \mathrm { N \, s / m ^ { 2 } }$ , $k = 0 . 6 3 4 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 4 . 5 5$ .

::: solution
**Step 1 — the bookkeeping.** The duty is $q = 2 . 0 \times 4 1 7 8 \times 4 5 = 3 7 6 \ \mathrm { k W }$ . The steam side pins the wall at $7 0 \ \ {} ^ { \circ } \mathrm { C }$ (constant-temperature wall condition — the correct one, not an approximation), so the exponential approach governs and the required NTU per tube is fixed by the temperature approach alone:
$$
\mathrm { N T U } = \ln { \frac { 7 0 - 1 5 } { 7 0 - 60 } } = \ln 5 . 5 = 1 . 8 1
$$
**Step 2 — the tubes.** At $1 . 4 3 \ \mathrm { m / s }$ each $1 6 \ \mathrm { m m }$ tube carries $\rho U A _ { c } = 9 9 3 \times 1 . 4 3 \times 2 . 0 1 1 \times 1 0 ^ { - 4 } = 0 . 2 8 6 \ \mathrm { k g / s }$ , so $2 . 0 / 0 . 2 8 6 = 7 . 0$ tubes.
$$
\mathrm { R e } = { \frac { 9 9 3 \times 1 . 4 3 \times 0 . 0 1 6 } { 6 9 0 \times 1 0 ^ { - 6 } } } = 3 3 \, 0 0 0 \quad ( \text{turbulent, } 1 4 \times \text{ above transition} ) \qquad f = 0 . 0 2 3 1
$$
$$
\mathrm { N u } = { \frac { ( 0 . 0 2 3 1 / 8 ) \times 3 2 \, 0 0 0 \times 4 . 5 5 } { 1 + 1 2 . 7 \times ( 0 . 0 2 3 1 / 8 ) ^ { 1 / 2 } \times \left( 4 . 5 5 ^ { 2 / 3 } - 1 \right) } } = { \frac { 5 2 7 } { 2 . 7 5 } } = 1 9 2 \qquad h = { \frac { 1 9 2 \times 0 . 6 3 4 } { 0 . 0 1 6 } } = 7 6 0 0 \ \mathrm { W / m ^ { 2 } K }
$$
**Step 3 — the length.** Per tube, $\mathrm { N T U } = h \pi D L / ( { \dot { m } } _ { t } c _ { p } )$ :
$$
L = { \frac { 1 . 8 1 \times 0 . 2 8 6 \times 4 1 7 8 } { 7 6 0 0 \times \pi \times 0 . 0 1 6 } } = 5 . 3 \ \mathrm { m } \qquad A _ { s } = 7 \times \pi D L = 1 . 9 \ \mathrm { m ^ { 2 } }
$$
**Step 4 — the bill.** $\Delta p = f ( L / D ) \rho U ^ { 2 } / 2 = 0 . 0 2 3 1 \times 3 3 1 \times 1 0 1 7 = 7 . 8 \ \mathrm { k P a }$ , and $P = \Delta p \, { \dot { m } } / \rho = 1 6 \ \mathrm { W }$ .
**Sanity checks and design commentary.** $q / A = 3 7 6 / 1 . 9 = 1 9 8 \ \mathrm { k W / m ^ { 2 } }$ against a mean driving difference of about $2 2 \ \mathrm { K }$ — an implied $U$ of $9 0 0 0 \ \mathrm { W / m ^ { 2 } K } $ , consistent with a steam-side coefficient above $1 0 \, 0 0 0$ and a water side of $7 6 0 0$ in series, so the water side is $6 0 \ \ \%$ of the resistance and any improvement must come from it. **The tube length is set by the NTU, not by the duty: doubling the steam temperature would halve the metal, which is why "low-grade heat is cheap metal" is the first sentence of every heat-exchanger economics chapter and the last sentence of every corrosion engineer's career.** **Seven metres of five-metre tube means two passes — a return head, a U-bend, or a second shell — and the designer takes the $7 . 8 \ \mathrm { kPa }$ per pass happily; the pumping power is $1 6 \ \mathrm { W }$ against $3 7 6 \ \mathrm { k W }$ of heat, and the design is limited by metal, fouling allowance (add $0 . 0 0 0 2 \ \mathrm { m ^ { 2 } K / W }$ for cooling water and watch the area grow $2 5 \ \ \%$ ) and the tube-sheet, not by the fluid mechanics.**
:::
:::

::: quiz The tube at $\mathrm { R e } = 4 0 0 0$ {#quiz-transition}
A smooth, clean, rigid tube, fed through a rounded inlet from a well-damped header, runs water at $\mathrm { R e } _ { D } = 4 0 0 0$ . Its measured average Nusselt number is most likely:

- [ ] Exactly the Gnielinski value, about $3 0$ — the correlation is valid from $3 0 0 0$
- [ ] Exactly the laminar value $3 . 6 6$ — the flow is below $1 0 ^ { 4 }$
- [x] Anywhere between the laminar-with-entry value and the Gnielinski value, and stable at neither: the flow is transitional and its answer depends on inlet history, not on the Reynolds number alone
- [ ] Twice the Gnielinski value, because transition enhances mixing

::: solution
**Anywhere in between, and that is the answer the codes quietly assume.** $\mathrm { R e } = 4 0 0 0$ is inside the transition range: the classical lower limit of $2 3 0 0$ is a wind-tunnel value for a tube with a perfect inlet, and real inlets, bends, pumps and vibrations trip the layer earlier — but "earlier" at $\mathrm { R e } = 4 0 0 0$ means spots of turbulence that may or may not sustain, and published measurements in this range scatter from the laminar answer to the turbulent one and *below both* (the flow too broken to mix, too stirred to conduct). **Gnielinski's stated range starts at $3 0 0 0$ only in the sense that the formula can be evaluated there; its error bars at $3 0 0 0$ are $\pm 2 5 \ \ \%$ and its honesty about regime is zero.** **The design responses, in order of maturity: move the operating point above $1 0 ^ { 4 }$ ; or below $2 3 0 0$ with a laminar correlation that includes entry effects; or accept the uncertainty and instrument the plant.**
:::
:::

::: quiz Which tube runs hotter at the exit? {#quiz-walltemp}
Two identical tubes take the same water flow from $2 0 \ \ {} ^ { \circ } \mathrm { C }$ to $7 0 \ \ {} ^ { \circ } \mathrm { C }$ over the same length. Tube A is electrically heated to give uniform heat flux; tube B is heated by a constant-temperature surface. At the exit:

- [ ] B's wall is hotter: the constant-temperature surface must drive the whole duty at the shrinking temperature gap
- [x] A's wall is hotter: at uniform flux the wall runs a constant $q ^ { \prime \prime } / h$ ahead of a fluid that has risen all the way to $7 0 \ \ {} ^ { \circ } \mathrm { C }$ , while B's wall approaches its fluid and ends only a fraction of a degree above it
- [ ] Equal: both tubes deliver the same duty to the same fluid, so the same wall-fluid difference must hold at the exit
- [ ] Undecidable without knowing $h ( x )$ along each tube

::: solution
**A's wall is hotter, by the whole difference between "constant gap" and "decaying gap."** Tube A: $T _ { w } ( x ) = T _ { m } ( x ) + q ^ { \prime \prime } / h$ — the gap is the same at the outlet as at the inlet, and the fluid has risen $5 0 \ \mathrm { K }$ to meet it, so the outlet wall sits $q ^ { \prime \prime } / h$ above $7 0 \ \ {} ^ { \circ } \mathrm { C }$ . **Tube B: $T _ { w } - T _ { m }$ decays as $e ^ { - h P x / ( \dot { m } c _ { p } ) }$ , and at the exit the gap is a few per cent of what it was at the inlet — the wall barely exceeds $7 0 \ \ {} ^ { \circ } \mathrm { C }$ at all.** **The tempting wrong answer is "equal," which confuses the duty (same) with the local driving difference (radically different): the exponential tube spends its inlet end furiously and its outlet end idling, while the uniform tube works evenly and ends hot.** **This is why the wall condition is a design input and not a detail: fouling limits, film boiling, coking, sintering and food safety all live at the exit wall, and only one of these two tubes is cool there.**
:::
:::

::: history
| Year | Event |
|---|---|
| 1883 | **L. Graetz**, "Über die Wärmeleitung Flüssigkeiten", *Annalen der Physik* 253, 337 — the first solution of heat transfer to a flowing fluid in a tube: the velocity profile enters the energy equation and the answer is an eigenvalue expansion. **The Graetz problem is older than the Nusselt number, and it is the first convection problem ever solved.** |
| 1909–1910 | **W. Nusselt**, Graetz's student at Heidelberg, publishes the heat-transfer similarity framework that would carry his name, and completes the eigenvalue tables of the tube problem: $\mathrm { N u } = 3 . 6 5$ for constant wall temperature, $4 . 3 6$ for constant heat flux. **The numbers a student still copies in the exam were computed by hand in Heidelberg.** |
| 1930 | **F. W. Dittus & D. K. Boelter**, *Publications in Engineering* **2**, 443, University of California — a fit to 287 points of air, water and oil: $\mathrm { N u } = 0 . 0 2 3 \, \mathrm { Re } ^ { 0 . 8 } \, \mathrm { Pr } ^ { n }$. **Its survival for a century on a sample smaller than most single modern experiments is the strongest evidence in engineering that a good scaling beats a good dataset.** |
| 1936 | **E. N. Sieder & G. E. Tate**, "Effect of viscosity of liquids on heat-transfer coefficients", *Industrial & Engineering Chemistry* **28**, 1429 — the $( \mu / \mu _ { s } ) ^ { 0 . 1 4 }$ wall-viscosity factor, from oil data, and the first correlation that admitted the wall knows a different fluid than the core. |
| 1955 | **R. G. Deissler**, "Analysis of turbulent heat transfer, momentum, and mass transfer in tubes", *NACA Report* **1210** — the two-layer (sublayer + buffer + core) construction that expresses Nu in terms of the friction factor and Prandtl number with no free exponent. **Every modern general correlation, including the one below, is a descendant of Deissler's architecture.** |
| 1970 | **B. S. Petukhov**, "Heat and friction in turbulent pipe flow", *Advances in Heat Transfer* **6**, 51 — the semi-empirical friction and heat-transfer laws of the Soviet school, giving the smooth-tube $f ( \mathrm { R e } )$ fit still used inside Gnielinski and in the ASME correlations. |
| 1976 | **V. Gnielinski**, "New equations for heat and mass transfer in turbulent pipe and channel flow", *International Chemical Engineering* **16**, 359 — the correlation that reconciled Deissler's structure with the post-war data bank and became the ISO and VDI default: $\pm 1 0 \ \ \%$ over $3 0 0 0 < \mathrm { R e } < 5 \times 1 0 ^ { 6 }$ . |
| 1978 | **R. K. Shah & A. L. London**, *Laminar Flow Forced Convection in Ducts*, Academic Press — the complete catalogue of Graetz numbers, friction constants and entry-length corrections for every duct shape the authors could solve or find measured. **Still the only reference that answers "what about a trapezoid?" without a computation.** |
| 1981 | **D. B. Tuck & R. F. Peace**, "High performance low-cost liquid heat exchangers" — the etched-silicon micro-channel heat sink: $h$ above $1 0 ^ { 5 } \ \mathrm { W / m ^ { 2 } K } $ demonstrated on silicon, launching twenty-five years of micro-channel heat-transfer research and its long argument about whether the classical correlations survive at $1 0 0 \ \mu\mathrm { m }$ . |
:::

::: summary
- **One equation is the whole bookkeeping:** $d T _ { m } / d x = P q _ { s } ^ { \prime \prime } / ( \dot { m } c _ { p } )$ — the mean temperature rises at the rate the wall feeds it. Constant flux gives a linear $T _ { m }$ and a constant wall gap; constant wall temperature gives an exponential approach with $\mathrm { N T U } = h A _ { s } / ( \dot { m } c _ { p } )$ .
- **$T _ { m }$ is a flux-weighted, mixing-cup temperature, and every internal correlation is evaluated at it** (plus a wall-viscosity factor for liquids). Film temperatures belong to external flow; leave them there.
- **Laminar fully developed is a theorem, not a correlation:** $\mathrm { N u } = 3 . 6 6$ (constant $T _ { s }$) or $4 . 3 6$ (constant $q ^ { \prime \prime }$), shape-dependent, flow-rate-independent. **If your laminar design shows $h$ improving with flow, you are in the entry region — and you probably are.**
- **Laminar entry is the design:** $\overline { { \mathrm { N u } } } = 1 . 8 6 ( \mathrm { R e } \, \mathrm { Pr } \, D / L ) ^ { 1 / 3 } ( \mu / \mu _ { s } ) ^ { 0 . 1 4 }$ , valid while $\mathrm { R e } \, \mathrm { Pr } \, D / L \gtrsim 3 0$; entry lengths are $0 . 0 5 \, \mathrm { Re } \, D$ (laminar) and about ten diameters (turbulent).
- **Turbulent: Dittus–Boelter to estimate, Gnielinski to commit.** $0 . 0 2 3 \, \mathrm { Re } ^ { 0 . 8 } \mathrm { Pr } ^ { n }$ carries $\pm 2 5 \ \ \%$; Gnielinski carries $\pm 1 0 \ \ \%$ down to $\mathrm { Re } = 3 0 0 0$ — and neither says anything about the transition range $2 3 0 0$–$1 0 ^ { 4 }$, where the honest answer is to move the operating point.
- **The friction analogy prices every enhancement:** $\mathrm { St } \, \mathrm { Pr } ^ { 2 / 3 } = f / 8$ — turbulators, roughness and twisted tapes buy heat at the exchange rate of the friction factor, and the good ones beat the rate.
- **The diameter bargain:** at fixed flow, $h \propto D ^ { - 1 . 2 }$ but $\Delta p \propto D ^ { - 4 . 8 }$; at fixed diameter, doubling flow buys $1 . 7 4$ times the heat for $7$ times the pumping power. **Micro-channels win on heat and drown on pressure: $0 . 3 \ \mathrm { MPa }$ per centimetre is not a detail, it is the design.**
- **Hydraulic diameter: fine for turbulent, treacherous for laminar** — the Graetz numbers span a factor of three across shapes; use the shape's own number or Shah's correction.
- **Liquid metals: $\mathrm { N u } \approx 5$ , flow-independent** — enormous coefficients that no pump can improve and no pump failure can (quickly) destroy.
:::

## Further reading

- **F. P. Incropera, D. P. DeWitt, T. L. Bergman & A. S. Lavine**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — Chapter 8 is this lesson with every correlation, every correction factor and the full property-variation discussion.
- **R. K. Shah & A. L. London**, *Laminar Flow Forced Convection in Ducts* (Academic Press, 1978) — the complete laminar catalogue: every section, every wall condition, every entry correction, in tables you will need the day your duct is not round.
- **A. Bejan**, *Convection Heat Transfer*, 4th ed. (Wiley, 2013) — the scaling-law view: why the correlations have the exponents they do, and how to think about internal flow without trusting any single correlation further than its error bar.
- **W. Kays & A. L. London**, *Compact Heat Exchangers*, 3rd ed. (McGraw-Hill, 1984) — where internal flow meets real hardware: the $j$- and $f$-factor data for offset-strip, louvered and wavy surfaces that every exchanger vendor sizes from.
- **S. M. White**, *Viscous Fluid Flow*, 3rd ed. (McGraw-Hill, 2006) — Chapter 6 for the friction-factor side of the analogy, including the rough-wall data the heat-transfer correlations quietly inherit.
