---
id: heat-transfer/steady-conduction
title: "Steady Conduction"
summary: "The heat equation from a shell balance, one-dimensional walls, cylinders and spheres as a resistance network, uniform generation, the critical radius of insulation, and the shape factors that turn three-dimensional puzzles into arithmetic."
translated: false
tags: ["heat equation", "thermal resistance", "critical radius", "shape factor", "heat generation", "composite wall"]
---

Steady conduction is the case in which nothing changes with time, so the heat that enters a body leaves it and the temperature field is a solution of a purely geometric problem. That single simplification is worth an enormous amount: it converts a partial differential equation with an initial condition into Laplace's equation with boundary conditions, it makes the temperature field in a composite wall as computable as the current in a resistor network, and it means that **for a very large class of real engineering — every wall, every lagged pipe, every heat sink base, every building envelope in winter — the answer is a sum of reciprocals.**

The resistance analogy is not a metaphor and it is not an approximation. In one dimension, with constant conductivity and no generation, the heat rate through a plane wall, a cylindrical shell and a spherical shell each take the form "driving temperature difference divided by a resistance," the resistances add in series exactly as they do in a circuit, and parallel paths add as conductances. **The analogy fails in exactly two situations, and both are worth knowing by name: when conductivity depends strongly on temperature (a furnace lining of carbon or a cryogenic one of aluminium, where $k$ can vary by an order of magnitude across the wall), and when the paths are not one-dimensional (a bolt through insulation, a bracket through a cold wall), where the two- and three-dimensional spreading has to be handled by shape factors or by numerical solution.**

Two results in this lesson are out of proportion to their difficulty, and both are made by differentiating a resistance with respect to a radius. **The critical radius of insulation** says that on a small-diameter object, adding insulation *increases* the heat loss up to a radius $k / h$ — which is why electrical wire is insulated to make it cooler, not warmer, and why lagging a $6\ \mathrm{mm}$ steam pipe with the wrong thickness can make the problem worse. **The parabolic temperature profile in a body with uniform generation** says that the temperature difference between the middle of a heat-generating slab and its surface is $\dot{q} L^2 / 2k$ — which is why the centre of a nuclear fuel pellet runs $700\ \mathrm{K}$ hotter than its surface, why a chip's junction temperature scales with the *square* of its thickness, and why the answer to a heat-generation problem is always "make it thinner," never "make it bigger."

::: warning Four steady-conduction errors that look like correct arithmetic
**Adding the resistances of paths that are in parallel.** A sandwich panel has a core and two stiffeners; a cold-store roof has insulation and steel bolts; a wall has brick and a cavity. If the paths are side by side, **conductances add**: $U = \Sigma (A_j / A_{\text{tot}})(1 / R_j)$. If you put them in series you will get an answer that is too small, and for a bolted insulation panel the error is a factor of **two from four $16\ \mathrm{mm}$ bolts per square metre**. **Using a one-dimensional resistance where the flow is three-dimensional.** Heat entering a small object buried in a large medium does not travel in cylinders or spheres; it converges. A $100\ \mathrm{mm}$ pipe buried $1.2\ \mathrm{m}$ down loses $122\ \mathrm{W / m}$, and the naive "soil out to the surface as a cylindrical shell" model predicts $148\ \mathrm{W / m}$ — **$22\ \%$ too high, and too high in the direction that saves you no money.** **Forgetting that a resistance can be negative in effect.** Adding a layer of insulation to a cylinder of radius below $k / h$ **increases** the heat transfer, because the second term, the surface resistance $1 / ( 2 \pi r h )$, falls faster than the first, $\ln ( r _ { 2 } / r _ { 1 } ) / ( 2 \pi k )$, rises. **This is not a curiosity: it is the design rule for every small-diameter lagged line and every insulated cable.** **Treating the surface coefficient as an exact number when it is a $\pm 2 0\ \ \%$ estimate.** In the lagged-pipe example below the lagging is $92\ \ \%$ of the resistance and the outer film $7.8\ \ \%$, so a $20\ \ \%$ error in $h$ moves the answer by $1.6\ \ \%$ — comfortable. **In an uninsulated one the film is everything**, and in a well-insulated building the two films together are $12\ \ \%$ of a wall's resistance and $100\ \ \%$ of the improvement left. **Know which regime you are in before you quote three significant figures.**
:::

## The equation and the conditions

::: definition The general heat conduction equation {#def-heateq}
Balance energy on a fixed element of volume $d V$ with generation $\dot{q}$ in $\mathrm{W / m^3}$: accumulation equals net conduction in plus generation,
$$
\rho c _ { p } { \frac { \partial T } { \partial t } } d V = - \nabla \cdot \boldsymbol{q} \, d V + { \dot { q } } \, d V \qquad \Longrightarrow \qquad \boxed { \; \rho c _ { p } { \frac { \partial T } { \partial t } } = \nabla \cdot \left( k \nabla T \right) + { \dot { q } } \; }
$$
and with constant $k$ this is $\partial T / \partial t = \alpha \nabla ^ { 2 } T + { \dot { q } } / \rho c _ { p }$. Four reductions do most of the work of this course:
$$
\begin{array}{l l l}
\text{Steady, no generation} & \nabla ^ { 2 } T = 0 & \text{Laplace: walls, lagging, shape factors} \\
\text{Steady, with generation} & \nabla ^ { 2 } T = - { \dot { q } } / k & \text{Poisson: chips, fuel, busbars} \\
\text{Unsteady, no generation} & \partial T / \partial t = \alpha \nabla ^ { 2 } T & \text{heat-up, quench, diurnal swing} \\
\text{One-dimensional, steady} & \dfrac { d } { d x } \! \left( k { \dfrac { d T } { d x } } \right) = 0 & \text{every wall you will ever price}
\end{array}
$$
**The one that is never written but is always used.** If $k = k ( T )$, the one-dimensional steady equation integrates once to a **Kirchhoff transform**,
$$
q ^ { \prime \prime } = \frac { 1 } { L } \int _ { T _ { 2 } } ^ { T _ { 1 } } k ( T ) \, d T
$$
so a wall with a linearly varying conductivity is handled by using the **mean conductivity over the actual temperature range**, not over the datasheet's $300\ \mathrm{K}$. **For a carbon brick from $1200$ to $400\ \ {}^{\circ}\mathrm{C}$, $k$ falls from $28$ to $12\ \mathrm{W / m\,K}$, and using the cold value overpredicts the heat loss by $130\ \ \%$.**
:::

::: definition The three boundary conditions {#def-bcs}
A second-order equation in each direction needs one condition per boundary, and there are only three kinds worth the name, plus one freebie:
$$
\begin{array}{l l l}
\text{First kind (Dirichlet)} & T ( 0 ) = T _ { s } & \text{a surface in contact with a large reservoir} \\
\text{Second kind (Neumann)} & - k \, d T / d x | _ { 0 } = q _ { 0 } ^ { \prime \prime } & \text{a specified flux: a heater, a brake face, insulation} \\
\text{Third kind (Robin)} & - k \, d T / d x | _ { 0 } = h \left[ T ( 0 ) - T _ { \infty } \right] & \text{convection: the commonest by far} \\
\text{Symmetry / adiabatic} & d T / d x | _ { \text{midplane } } = 0 & \text{not a condition, a consequence: halves the domain}
\end{array}
$$
**The Robin condition is the reason the resistance network works**, because it makes the boundary condition linear in the unknown surface temperature and therefore equivalent to a resistor to a voltage source. **The moment a boundary is radiative, $- k d T / d x = \epsilon \sigma ( T _ { s } ^ { 4 } - T _ { \mathrm { sur } } ^ { 4 })$, the network is no longer linear** and the analogy becomes an iteration rather than an arithmetic — which is why furnace calculations are done twice and pipe-lagging calculations are done once.
:::

::: exercise Derivation: the heat equation from a spherical shell {level=3}
::: solution
Take a shell between $r$ and $r + d r$ in a medium of conductivity $k$, with generation $\dot{q}$ per unit volume. Conduction area is $4 \pi r ^ { 2 }$, so the net rate arriving by conduction is
$$
\left[ - k \, 4 \pi r ^ { 2 } { \frac { \partial T } { \partial r } } \right] _ { r } - \left[ - k \, 4 \pi r ^ { 2 } { \frac { \partial T } { \partial r } } \right] _ { r + d r } = { \frac { 1 } { r ^ { 2 } } } { \frac { \partial } { \partial r } } \! \left( k r ^ { 2 } { \frac { \partial T } { \partial r } } \right) 4 \pi r ^ { 2 } d r
$$
and the generation and accumulation terms are ${ \dot { q } } \, 4 \pi r ^ { 2 } d r$ and $\rho c _ { p } ( \partial T / \partial t ) 4 \pi r ^ { 2 } d r$. Equating and cancelling the volume,
$$
\rho c _ { p } { \frac { \partial T } { \partial t } } = { \frac { k } { r ^ { 2 } } } { \frac { \partial } { \partial r } } \! \left( r ^ { 2 } { \frac { \partial T } { \partial r } } \right) + { \dot { q } }
$$
**Two readings that are worth more than the derivation.** The factor $r ^ { 2 }$ inside the derivative is the **area growth**, and it is the whole difference between a wall and a sphere: in a wall the area is constant and the profile is a straight line, in a cylinder it grows as $r$ and the profile is a logarithm, and in a sphere it grows as $r ^ { 2 }$ and the profile is a hyperbola $1 / r$. **Second, and this is the one that saves designs: because the area grows outward, a spherical or cylindrical shell has a resistance that saturates.** The resistance of a concentric spherical shell is $( r _ { 2 } - r _ { 1 } ) / ( 4 \pi k r _ { 1 } r _ { 2 } )$, which tends to the **finite** limit $1 / ( 4 \pi k r _ { 1 } )$ as $r _ { 2 } \to \infty$. **Making a cryogenic sphere bigger and bigger buys you less and less, and stops buying you anything at all — a fact that is discovered expensively every time a vacuum-jacketed tank is re-lagged.**
:::
:::

::: example Reading the boundary conditions off six real problems {#ex-bcs}
$$
\begin{array}{l l l}
\text{Problem} & \text{Boundary conditions} & \text{Reduction} \\
\text{House wall, winter} & \text{Robin at both faces} & \text{1-D, Laplace, two resistors added} \\
\text{Chip conducting to a lid} & \text{Neumann at the die, Robin at the lid} & \text{1-D, Laplace, } q ^ { \prime \prime } \text{ known} \\
\text{Nuclear fuel pellet} & \text{Symmetry at } r = 0 , \text{ Robin at } r _ { 1 } & \text{1-D radial, Poisson} \\
\text{Reactor vessel, insulated outside} & \text{Robin inside, Neumann (zero) outside} & \text{1-D radial, Laplace} \\
\text{Hot wire anemometer probe} & \text{Dirichlet at the wire, } T \to T _ { \infty } \text{ at } \infty & \text{radial, Laplace, } S = 2 \pi L / \ln ( 2 L / r ) \\
\text{Sun-heated roof deck} & \text{Neumann (solar) + Robin outside, Robin inside} & \text{1-D, Laplace, two fluxes superposed}
\end{array}
$$
**The last row carries the lesson.** A sunlit roof has **two** boundary conditions of the second kind and two of the third, and because the problem is linear the answer is the sum of two solutions: the one driven by the indoor-outdoor temperature difference and the one driven by the absorbed solar flux. **Every "sol-air temperature" in building services is this superposition packaged as a single equivalent outdoor temperature, and it is exactly as accurate as the linearity that justifies it — which is to say perfectly, until someone puts a phase-change material or a temperature-dependent emissivity into the problem.**
:::

## One-dimensional walls and the resistance network

::: definition The plane wall and the resistance network {#def-planewall}
For a plane wall of thickness $L$, area $A$ and constant $k$, with convection on both faces,
$$
q = \frac { T _ { \infty , i } - T _ { \infty , o } } { R _ { i } + R _ { w } + R _ { o } } , \qquad R _ { i } = \frac { 1 } { h _ { i } A } , \quad R _ { w } = \frac { L } { k A } , \quad R _ { o } = \frac { 1 } { h _ { o } A }
$$
and the whole apparatus of circuit analysis transfers: **series resistances add, parallel paths add as conductances, the temperature at any interface is a potential-divider, and the heat flux is the same through every element in the series.** The building-trade form of the same statement divides by the area and inverts:
$$
U = \frac { 1 } { \dfrac { 1 } { h _ { i } } + \displaystyle \sum _ { j } \dfrac { L _ { j } } { k _ { j } } + \dfrac { 1 } { h _ { o } } } \qquad \left[ U \right] = \mathrm { W / m ^ { 2 } K }
$$
called the **thermal transmittance**, with $1 / U$ the **$R$-value** in the American trade and the **$U$-value** in the European one — **and the two are reciprocals of each other, which is the most quietly destructive unit error in the building industry.**
**The three rules that come out of the divider.** (i) **The interface temperature is a weighted sum of the two ambient temperatures**, with weights equal to the resistances on the far side, so a thin high-conductivity layer next to a cold fluid sits almost at that fluid's temperature. (ii) **Condensation occurs where the profile crosses the dew point**, and the crossing can only be found from the divider — which makes the whole of vapour-barrier placement a resistance-network calculation. (iii) **The dominant resistance dominates absolutely**: if one layer is $90\ \%$ of the total, halving the others is worth $10\ \%$ of the improvement available, and this is the arithmetic that stops people re-engineering the wrong layer.
:::

::: example A cold-store wall, and where the water freezes {#ex-coldstore}
A refrigerated store at $- 20\ {}^{\circ}\mathrm{C}$ stands in air at $30\ {}^{\circ}\mathrm{C}$ and $70\ \ \%$ relative humidity. Its panel is **$150\ \mathrm{mm}$ of polyurethane** ($k = 0.026\ \mathrm{W / m\,K}$) between **two $1\ \mathrm{mm}$ steel sheets** ($k = 50$). Take $h_i = 8$ and $h_o = 25\ \mathrm{W / m^2 K}$ including their radiation terms.
**The resistances, per square metre.**
$$
{ \frac { 1 } { U } } = \underbrace { \frac { 1 } { 8 } } _ { 0 . 1 2 5 0 } + \underbrace { \frac { 2 \times 0 . 0 0 1 } { 5 0 } } _ { 0 . 0 0 0 0 4 } + \underbrace { \frac { 0 . 1 5 0 } { 0 . 0 2 6 } } _ { 5 . 7 6 9 2 } + \underbrace { \frac { 1 } { 2 5 } } _ { 0 . 0 4 0 0 } = 5 . 9 3 4 3 \ \mathrm { m ^ { 2 } K / W }
$$
$$
U = \mathbf { 0 . 1 6 8 5 \ W / m ^ { 2 } K } , \qquad q ^ { \prime \prime } = 0 . 1 6 8 5 \times 5 0 = \mathbf { 8 . 4 3 \ W / m ^ { 2 } }
$$
**The two steel skins are $0.0007\ \ \%$ of the resistance** and are there for structure and for air-tightness, not for thermal reasons. **The insulation is $97.2\ \ \%$, the inside film $2.1\ \ \%$ and the outside film $0.7\ \ \%$.**
**Where is the dew point?** Outside air at $30\ \ {}^{\circ}\mathrm{C}$ and $70\ \ \%$ has a dew point of $24.2\ {}^{\circ}\mathrm{C}$. Measuring $x$ inwards from the outer surface,
$$
T ( x ) = 3 0 - q ^ { \prime \prime } \left( { \frac { 1 } { h _ { o } } } + { \frac { x } { k } } \right) = 3 0 - 8 . 4 3 \left( 0 . 0 4 + { \frac { x } { 0 . 0 2 6 } } \right) = 2 9 . 6 6 - 3 2 4 . 2 x
$$
$$
T ( x ) = 2 4 . 2 \quad \Longrightarrow \quad x = { \frac { 5 . 4 6 } { 3 2 4 . 2 } } = \mathbf { 1 6 . 8 \ m m \ i n s i d e \ t h e \ f o a m }
$$
**Water vapour diffusing inward from the warm side therefore condenses $17\ \mathrm{mm}$ inside the insulation and then freezes**, because the isotherm there falls to $0\ {}^{\circ}\mathrm{C}$ at $x = 9 1\ \mathrm{mm}$. Ice has a thermal conductivity four times that of still air and it destroys the foam's cell structure, so the panel's $U$-value climbs for the rest of its life.
**The consequence is a rule of construction, not of calculation: the vapour control layer goes on the warm side, and it must be continuous, because a $1\ \mathrm{mm}$ gap in it is worth more moisture than the whole panel area is worth water vapour.** **The calculation above is the reason the rule exists, and it is the clearest case in this course of a resistance network preventing a building failure.**
:::

::: widget plot
title: Heat flux through a cold-store wall against insulation thickness
f: 50/(0.165+x/0.026); 303
x: 0, 0.5
y: 0, 320
labels: q'' for 150 mm-class polyurethane, films included; the film-only ceiling, 303 W/m2
caption: The heat flux through the wall of the example above as a function of the polyurethane thickness $x$ in metres, with the two surface films held at $1 / 8$ and $1 / 25$. **The curve falls steeply at first and then flattens onto a hard ceiling at $q'' = 50 / (1/8 + 1/25) = 303\ \mathrm{W/m^2}$, which no thickness of insulation can beat because the films are not made of polyurethane.** Reading the marginal benefit: $0$ to $50\ \mathrm{mm}$ saves $279\ \mathrm{W/m^2}$, $50$ to $100\ \mathrm{mm}$ saves $11.5$, $100$ to $200\ \mathrm{mm}$ saves $6.1$, and $200$ to $500\ \mathrm{mm}$ saves $3.8$. **At $£0.08 / \mathrm{kWh}$ and $6000$ full-load hours the third increment is worth $£2.89 / \mathrm{m^2}$ a year against $£4 / \mathrm{m^2}$ of foam — an 18-month payback — while the fourth is worth $£1.83$ against $£12$, a seven-year payback.** **The economic thickness of this wall is therefore about $200\ \mathrm{mm}$, and the shape of the curve, not the arithmetic, is why insulation thicknesses cluster at $150$ to $250\ \mathrm{mm}$ and why nobody insulates a wall to one metre.**
:::

::: example A furnace wall with a joint {#ex-furnace}
A furnace wall is **$230\ \mathrm{mm}$ of firebrick** ($k = 1.1\ \mathrm{W / m\,K}$) backed by **$100\ \mathrm{mm}$ of ceramic fibre** ($k = 0.10$). The hot gas is at $1200\ {}^{\circ}\mathrm{C}$ with $h_i = 120\ \mathrm{W / m^2 K}$ and the room air at $25\ {}^{\circ}\mathrm{C}$ with $h_o = 25$.
**The network.**
$$
{ \frac { 1 } { U } } = { \frac { 1 } { 1 2 0 } } + { \frac { 0 . 2 3 0 } { 1 . 1 } } + { \frac { 0 . 1 0 0 } { 0 . 1 0 } } + { \frac { 1 } { 2 5 } } = 0 . 0 0 8 3 3 + 0 . 2 0 9 0 9 + 1 . 0 0 0 0 0 + 0 . 0 4 0 0 0 = 1 . 2 5 7 4 2\ \mathrm { m ^ { 2 } K / W }
$$
$$
q ^ { \prime \prime } = { \frac { 1 2 0 0 - 2 5 } { 1 . 2 5 7 4 2 } } = \mathbf { 9 3 4\ W / m ^ { 2 } }
$$
**The fibre is $79.5\ \ \%$ of the resistance in $30\ \ \%$ of the thickness.** Now the interface temperature, by the divider:
$$
T _ { \text{interface} } = 1 2 0 0 - 9 3 4 \times ( 0 . 0 0 8 3 3 + 0 . 2 0 9 0 9 ) = 1 2 0 0 - 2 0 3 = \mathbf { 9 9 7 ^ { \circ } C }
$$
**and this number is the design.** Firebrick is rated to about $1300\ {}^{\circ}\mathrm{C}$ and is fine at $997$; had the layers been reversed, the fibre would sit at $1180\ {}^{\circ}\mathrm{C}$ and the brick at $100$, and **the fibre would sinter and collapse, because ceramic fibre is a low-temperature, low-strength material used for its conductivity and not for its refractoriness.** **The rule: put the cheap refractory on the hot side where it must survive, and the good insulator on the cold side where it only has to insulate.** The same logic, inverted, gives the modern practice of using no brick at all and spraying fibre behind a steel shell with the shell kept cool by the insulation behind it.
**Now add a contact resistance of $2 \times 10 ^ { - 3 }\ \mathrm { m^2 K / W }$ at the interface** (a poorly bedded joint):
$$
q ^ { \prime \prime } = { \frac { 1 1 7 5 } { 1 . 2 5 7 4 2 + 0 . 0 0 2 } } = 9 3 2 . 9\ \mathrm { W / m ^ { 2 } }
$$
**a $0.2\ \ \%$ change, invisible.** The same contact resistance in the cold-store wall of [[#ex-coldstore|the cold-store example]] would be $0.2 / 5.93 = 3.4\ \ \%$ — and in a wall whose own resistance is only $0.2\ \mathrm{m^2 K / W}$, as in an aluminium-framed glazed unit, it would be $1\ \%$. **Contact resistance is a fixed absolute quantity, so its importance is set by how small everything else is: it is negligible in a furnace and dominant in a heat sink.**
:::

## Radial systems

::: definition Cylindrical and spherical conduction {#def-radial}
In a long cylinder of length $L$ with inner and outer radii $r_1$ and $r_2$, the steady no-generation equation $\frac{d}{dr}\left(r \frac{dT}{dr}\right) = 0$ integrates to a logarithm, and the resistance follows:
$$
T ( r ) = T _ { 1 } - \left( T _ { 1 } - T _ { 2 } \right) { \frac { \ln \left( r / r _ { 1 } \right) } { \ln \left( r _ { 2 } / r _ { 1 } \right) } } , \qquad q = { \frac { T _ { 1 } - T _ { 2 } } { R _ { \mathrm { cyl } } } } , \qquad R _ { \mathrm { cyl } } = { \frac { \ln \left( r _ { 2 } / r _ { 1 } \right) } { 2 \pi k L } }
$$
For a spherical shell the profile is a hyperbola and the resistance is
$$
T ( r ) = T _ { 1 } - \left( T _ { 1 } - T _ { 2 } \right) { \frac { 1 - r _ { 1 } / r } { 1 - r _ { 1 } / r _ { 2 } } } , \qquad R _ { \mathrm { sph } } = { \frac { r _ { 2 } - r _ { 1 } } { 4 \pi k r _ { 1 } r _ { 2 } } } \ { \xrightarrow [ r _ { 2 } \to \infty ] { } }\ { \frac { 1 } { 4 \pi k r _ { 1 } } }
$$
**Three consequences that have no plane-wall analogue.**
**(i) The logarithm means the first centimetre of lagging does most of the work.** For a pipe, $R_{\mathrm{cyl}}$ grows as $\ln(r_2/r_1)$, so **doubling the outer radius of the lagging adds the same resistance whatever the pipe size** — and doubling an already thick layer adds nothing, because $\ln 4 - \ln 2 = \ln 2$.
**(ii) The area grows outward, so the heat flux is not uniform.** On the $50\ \mathrm{mm}$ of lagging in [[#ex-pipe|the lagged-pipe example]] below, the flux at the inner surface is $160.3 / 60.3 = 2.66$ times the flux at the outer. **Any statement about "the heat flux through a lagged pipe" must say at which radius it is meant.**
**(iii) The spherical resistance saturates.** Because the area grows as $r^2$, faster than the thickness, a spherical shell's resistance has a **finite limit** as the outer radius goes to infinity. **There is a maximum possible resistance between a sphere and a distant medium, and it is $1 / ( 4 \pi k r _ { 1 } )$ — a number that depends only on the sphere's own radius and on the medium, not on how far away the medium extends.** Every buried-object and every grounding-electrode and every cooling-fin-from-a-sphere calculation inherits this ceiling.
:::

::: definition The critical radius of insulation {#def-critical}
Add a layer of insulation of conductivity $k_i$ to a cylinder of outer radius $r_1$, with a surface coefficient $h$ outside. The total resistance per unit length is
$$
R ^ { \prime } ( r ) = { \frac { \ln \left( r / r _ { 1 } \right) } { 2 \pi k _ { i } } } + { \frac { 1 } { 2 \pi r h } }
$$
The first term rises and the second falls, and differentiating gives
$$
\frac { d R ^ { \prime } } { d r } = 0 \quad \Longleftrightarrow \quad \boxed { r _ { \mathrm { cr } } = \frac { k _ { i } } { h } } \qquad \text{(minimum resistance, maximum heat loss)}
$$
**Below $r_{\mathrm{cr}}$ adding insulation cools the object better; above it, it insulates.** For a sphere the same argument gives $r _ { \mathrm { cr } } = 2 k _ { i } / h$, twice as generous.
$$
\begin{array}{l c c c}
\text{Insulation on a small object in air} & k _ { i } & h & r _ { \mathrm { cr } } \\
\text{Polyvinyl chloride} & 0 . 2 3 & 1 0 & 2 3 \mathrm { m m } \\
\text{Rubber} & 0 . 1 3 & 1 0 & 1 3 \mathrm { m m } \\
\text{Glass wool} & 0 . 0 4 & 1 0 & 4 \mathrm { m m } \\
\text{Polyurethane} & 0 . 0 2 6 & 1 0 & 2 . 6 \mathrm { m m } \\
\text{Calcium silicate} & 0 . 0 8 & 1 2 & 6 . 7 \mathrm { m m }
\end{array}
$$
**Read the table against the object.** A $50\ \mathrm{mm}$ radius steam pipe is far above every $r_{\mathrm{cr}}$ in the table, so lagging always helps. **A $3\ \mathrm{mm}$ radius capillary tube, an electrical wire, a thermocouple bead or an optical fibre is below most of them**, and for those objects the insulation is a heat sink up to $r_{\mathrm{cr}}$. **The engineering consequence is not academic: hot-wire anemometry, thermal-conductivity probes and the current rating of a bundled cable are all built on the effect, and the reason a wire's ampacity rises when you add a thin plastic sheath is exactly this.**
:::

::: example Lagged steam pipe: where the resistance actually is {#ex-pipe}
A **$60.3\ \mathrm{mm}$ OD, $3.91\ \mathrm{mm}$ wall** carbon steel pipe ($k = 45\ \mathrm{W / m\,K}$) carries steam at $250\ {}^{\circ}\mathrm{C}$ with an internal coefficient $h_i = 2000\ \mathrm{W / m^2 K}$. It is lagged with **$50\ \mathrm{mm}$ of calcium silicate** ($k = 0.08$) and sits in a plant room at $25\ {}^{\circ}\mathrm{C}$ with $h_o = 12\ \mathrm{W / m^2 K}$. Find the loss per metre and the surface temperature.
**The four resistances, per metre of pipe.**
$$
\begin{array}{l c l}
R _ { i } ^ { \prime } = \dfrac { 1 } { h _ { i } \pi d _ { i } } = \dfrac { 1 } { 2 0 0 0 \times \pi \times 0 . 0 5 2 5 } & = 3 . 0 3 \times 1 0 ^ { - 3 } & 0 . 1 4 \ \% \\[4pt]
R _ { \mathrm { steel } } ^ { \prime } = \dfrac { \ln ( 6 0 . 3 / 5 2 . 5 ) } { 2 \pi \times 4 5 } & = 4 . 9 1 \times 1 0 ^ { - 4 } & 0 . 0 2 \ \% \\[4pt]
R _ { \mathrm { lag} } ^ { \prime } = \dfrac { \ln ( 1 6 0 . 3 / 6 0 . 3 ) } { 2 \pi \times 0 . 0 8 } & = 1 . 9 4 5 0 & \mathbf { 9 2 . 0 \ \% } \\[4pt]
R _ { o } ^ { \prime } = \dfrac { 1 } { h _ { o } \pi d _ { o } } = \dfrac { 1 } { 1 2 \times \pi \times 0 . 1 6 0 3 } & = 0 . 1 6 5 5 & 7 . 8 \ \%
\end{array}
$$
$$
\sum R ^ { \prime } = 2 . 1 1 4\ \mathrm { m \, K / W } , \qquad q ^ { \prime } = { \frac { 2 5 0 - 2 5 } { 2 . 1 1 4 } } = \mathbf { 1 0 6 . 4 \ W / m }
$$
**The steel pipe is $0.02\ \ \%$ of the resistance and the whole temperature drop across it is $0.05\ \mathrm{K}$.** The steel exists to hold the steam, not to conduct it, and **no calculation of a lagged pipe should spend a line on the metal.**
**The temperature profile, by the divider.**
$$
T _ { \text{inner wall} } = 2 5 0 - 1 0 6 . 4 \times 0 . 0 0 3 0 3 = 2 4 9 . 7 ^ { \circ } \mathrm { C } , \qquad T _ { \text{lagging outer surface} } = 2 4 9 . 6 - 1 0 6 . 4 \times 1 . 9 4 5 = \mathbf { 4 2 . 6 ^ { \circ } C }
$$
**and $4 2 . 6 - 1 0 6 . 4 \times 0 . 1 6 5 5 = 2 5 . 0\ {}^{\circ}\mathrm{C}$, which closes the balance.** The lagging's outer surface at $42.6\ {}^{\circ}\mathrm{C}$ is below the $60\ {}^{\circ}\mathrm{C}$ touch limit, so the lagging is also doing its other job, which is protecting people.
**The three design readings.** (i) **$92\ \%$ of the resistance is the calcium silicate**, so the only lever that matters is its thickness and its condition — and **wet lagging is the classic failure, because water at $k = 0.6$ is seven and a half times calcium silicate and would multiply this loss by about five.** (ii) **The outer film is $7.8\ \ \%$**, so once the lagging is thick, further thickness buys less and the only remaining improvement is to make the outside of the lagging bigger or better: **an aluminium jacket with a low emissivity makes $h_o$ worse, not better, which is why lagging jackets are specified for mechanical protection and for water-shedding and never credited with saving heat.** (iii) **The lagging's own outer surface temperature is the number an operator judges the job by**, and it is set by $q''/h_o$ alone: $106.4 \times 0.1655 = 17.6\ \mathrm{K}$ above the room, whatever the steam temperature is.
:::

::: widget plot
title: Heat loss from an insulated wire against the insulation radius
f: 60/(1.22427*ln(x)+15.9155/x)
x: 1, 40
y: 0, 15
caption: Heat loss per metre from a $1.5\ \mathrm{mm}$ diameter conductor insulated with rubber of $k = 0.13\ \mathrm{W / m\,K}$ in air at $h = 10\ \mathrm{W / m^2 K}$, plotted against the **outer** radius of the rubber in millimetres, for a $60\ \mathrm{K}$ rise over ambient. **The curve rises from $3.8\ \mathrm{W/m}$ bare to a maximum of $13.8\ \mathrm{W/m}$ at $x = 13\ \mathrm{mm}$ and then falls — but slowly, and it is still $12.2\ \mathrm{W/m}$ at $x = 40\ \mathrm{mm}$, more than three times the bare value.** The maximum is at $r_{\mathrm{cr}} = k / h = 13\ \mathrm{mm}$ exactly. **The asymmetry is the point: the rubber makes the wire a much bigger object, and a big object never goes back to being a small one, so the loss falls back toward the bare value only at absurd thicknesses.** **Read the chart as a conductor-temperature chart, because that is what it is: for a fixed $3\ \mathrm{W/m}$ of $I^2 R$ loss the bare conductor runs $64\ \mathrm{K}$ above ambient and the same conductor with $12\ \mathrm{mm}$ of rubber runs $14\ \mathrm{K}$ above it — and since current goes as the square root of the permissible loss, the covering has roughly doubled the cable's ampacity.** **The reason the effect exists is that the rubber does two things at once: it adds a logarithmic conduction resistance and it removes a $1 / r$ surface resistance by making the object bigger, and near a thin wire the second effect wins.**
:::

::: example Insulating a wire, and insulating a pipe: opposite answers {#ex-critical}
**Case A: a $1.5\ \mathrm{mm}$ diameter conductor** with rubber of $k = 0.13\ \mathrm{W / m\,K}$ in still air at $h = 12\ \mathrm{W / m^2 K}$.
$$
r _ { \mathrm { cr } } = { \frac { 0 . 1 3 } { 1 2 } } = 1 0 . 8 3 \ \mathrm { m m } \gg r _ { 1 } = 0 . 7 5 \ \mathrm { m m }
$$
$$
R _ { \text{bare} } ^ { \prime } = { \frac { 1 } { 2 \pi \times 0 . 0 0 0 7 5 \times 1 2 } } = 1 7 . 6 8 \ \mathrm { m \, K / W } , \qquad R _ { \text{at } r _ { \mathrm { cr } } } ^ { \prime } = { \frac { \ln ( 1 0 . 8 3 / 0 . 7 5 ) } { 2 \pi \times 0 . 1 3 } } + { \frac { 1 } { 2 \pi \times 0 . 0 1 0 8 3 \times 1 2 } } = 3 . 2 6 9 + 1 . 2 2 4 = 4 . 4 9 4
$$
**The insulation multiplies the heat loss by $1 7 . 6 8 / 4 . 4 9 4 = 3 . 9 4$.** A conductor that was running $53\ \mathrm{K}$ above ambient now runs $13\ \mathrm{K}$ above it, and the insulation is doing the job of a heat sink.
**Case B: a $60.3\ \mathrm{mm}$ OD pipe** with calcium silicate of $k = 0.08$ at $h = 12$.
$$
r _ { \mathrm { cr } } = { \frac { 0 . 0 8 } { 1 2 } } = 6 . 7 \ \mathrm { m m } \ll r _ { 1 } = 3 0 . 2 \ \mathrm { m m }
$$
**The pipe is four and a half times the critical radius before any lagging goes on**, so every millimetre of lagging insulates and the maximum-loss point is behind us for good.
**The rule that decides which case you are in.** Compute $r _ { \mathrm { cr } } = k _ { i } / h$ and compare it with the bare radius. **For anything you can hold in one hand and any object smaller than about $25\ \mathrm{mm}$ across, in air, with a modern low-conductivity insulation, you are in Case A and the first millimetres of insulation cool rather than warm.** For anything that is a pipe, a duct or a vessel, you are in Case B and the intuition "insulation reduces heat loss" is safe.
:::

## Generation: why the middle is the hottest place

::: definition Uniform generation gives a parabolic or a logarithmic-corrected profile {#def-generation}
With uniform volumetric generation $\dot{q}$ and constant $k$, the equation is Poisson's, and the profiles are:
$$
\begin{array}{l l l l}
\text{Plane slab, thickness } 2 L \text{, faces at } T _ { s } & T ( x ) - T _ { s } = \dfrac { { \dot { q } } } { 2 k } \left( L ^ { 2 } - x ^ { 2 } \right) & T _ { \max } - T _ { s } = \dfrac { { \dot { q } } L ^ { 2 } } { 2 k } & q ^ { \prime \prime } = { \dot { q } } L \\[8pt]
\text{Cylinder, radius } r _ { 1 } \text{, surface at } T _ { s } & T ( r ) - T _ { s } = \dfrac { { \dot { q } } } { 4 k } \left( r _ { 1 } ^ { 2 } - r ^ { 2 } \right) & T _ { \max } - T _ { s } = \dfrac { { \dot { q } } r _ { 1 } ^ { 2 } } { 4 k } = \dfrac { q ^ { \prime } } { 4 \pi k } & q ^ { \prime } = { \dot { q } } \pi r _ { 1 } ^ { 2 } \\[8pt]
\text{Sphere, radius } r _ { 1 } \text{, surface at } T _ { s } & T ( r ) - T _ { s } = \dfrac { { \dot { q } } } { 6 k } \left( r _ { 1 } ^ { 2 } - r ^ { 2 } \right) & T _ { \max } - T _ { s } = \dfrac { { \dot { q } } r _ { 1 } ^ { 2 } } { 6 k } & q = { \dot { q } } \frac { 4 } { 3 } \pi r _ { 1 } ^ { 3 }
\end{array}
$$
**The three structural facts.** (i) **The centre-to-surface difference is proportional to the total power and inversely to the conductivity, and it depends on the half-thickness to the second power in a slab and on the radius to the second power in a cylinder or sphere.** **Making a heat-generating body thinner is a square-law win and making it bigger is a square-law loss**, and there is no way round it because the heat has to travel a distance proportional to the size while the area it travels through grows only as the square. (ii) **The surface flux is fixed by the generation and the size alone** — $q'' = \dot{q}L$, $q' = \dot{q}\pi r_1^2$ — **so the cooling duty cannot be negotiated, only the temperature drop within the body can.** (iii) **The profile is a parabola, so the temperature gradient at the surface is twice the average**, and any surface-damage, thermal-stress or boiling-critical-heat-flux calculation must use the surface gradient, not the mean.
:::

::: example A nuclear fuel pellet, and a silicon chip {#ex-generation}
**The pellet.** A uranium dioxide fuel rod has a pellet diameter of $8.2\ \mathrm{mm}$, a conductivity at operating temperature of $k = 2.8\ \mathrm{W / m\,K}$, and a linear rating of $q' = 25\ \mathrm{kW / m}$.
$$
T _ { \text{centre} } - T _ { \text{surface} } = { \frac { q ^ { \prime } } { 4 \pi k } } = { \frac { 2 5 { , } 0 0 0 } { 4 \pi \times 2 . 8 } } = \mathbf { 7 1 1 \ K }
$$
**Seven hundred kelvin across four millimetres.** The volumetric rating is $\dot{q} = 2 5 { , } 0 0 0 / ( \pi \times 0 . 0 0 4 1 ^ { 2 } ) = 4 . 7 3 \times 1 0 ^ { 8 }\ \mathrm { W / m^3 }$, which is about **fifty times the heat generation of a rocket combustion chamber wall** and is why the pellet's centreline runs near $1400\ {}^{\circ}\mathrm{C}$ in a reactor whose coolant is at $300\ {}^{\circ}\mathrm{C}$.
**The three consequences.** (i) **Uranium dioxide melts at $3120\ {}^{\circ}\mathrm{C}$, and the margin to melting is the pellet's own $711\ \mathrm{K}$ plus whatever the coolant and the gap allow** — which is why fuel is made as a stack of short pellets with a plenum rather than as one long rod, and why the linear rating is the reactor's real power limit. (ii) **Because $\Delta T \propto q'$, a $10\ \ \%$ power up-rate is a $71\ \mathrm{K}$ centreline excursion**, and this is the whole of the argument about "uprating" a fleet. (iii) **Because $\Delta T$ is independent of radius when the linear rating is fixed**, making the pellet fatter at the same kW/m does not help; making it fatter at the same **volumetric** rating doubles $\Delta T$. **The only ways to reduce the pellet's internal drop are a higher-conductivity fuel (uranium silicide, uranium nitride, or uranium–molybdenum metal, all of which are being developed for exactly this reason) or a smaller diameter at higher linear rating, which is what every modern fuel does.**
**The chip.** A $12 \times 12\ \mathrm{mm}$ silicon die $0.5\ \mathrm{mm}$ thick generates $45\ \mathrm{W}$ uniformly and is cooled through one face.
$$
\dot { q } = { \frac { 4 5 } { 1 . 4 4 \times 1 0 ^ { - 4 } \times 5 \times 1 0 ^ { - 4 } } } = 6 . 2 5 \times 1 0 ^ { 8 } \ \mathrm { W / m ^ { 3 } } , \qquad T _ { \max } - T _ { \text{cooled face} } = { \frac { { \dot { q } } L ^ { 2 } } { 2 k } } = { \frac { 6 . 2 5 \times 1 0 ^ { 8 } \times 2 . 5 \times 1 0 ^ { - 7 } } { 2 \times 1 4 8 } } = \mathbf { 1 . 0 6 \ K }
$$
**The same volumetric rating as the fuel pellet, and a temperature drop a thousand times smaller — because the die is a thousand times thinner and the drop goes as the square of the thickness.** **This is the single most transferable number in microelectronics thermal design: thinness is not a manufacturing convenience, it is the thermal strategy.** It is why chips are thinned from $700\ \mu\mathrm{m}$ to $50\ \mu\mathrm{m}$ before stacking, why through-silicon vias exist, and why the dielectric in a power module is the hardest thermal problem in it.
:::

## Three-dimensional conduction: the shape factor

::: definition The conduction shape factor {#def-shape}
Whenever a body of conductivity $k$ connects two isothermal surfaces at $\Delta T$, the heat rate can be written
$$
q = S k \, \Delta T
$$
where $S$, the **shape factor**, has dimensions of length and depends only on geometry. **It is the three-dimensional generalisation of $A / L$, and it is defined for exactly the cases where the two surfaces are isothermal and everything else is either adiabatic or far away.** Because Laplace's equation is linear and $S$ is a pure number times a length, a table of $S$ values is a table of solved problems:
$$
\begin{array}{l l}
\text{Plane wall, area } A \text{, thickness } L & S = A / L \\
\text{Long cylinder, } r _ { 2 } > r _ { 1 } & S = 2 \pi L / \ln \left( r _ { 2 } / r _ { 1 } \right) \\
\text{Concentric spheres} & S = 4 \pi r _ { 1 } r _ { 2 } / \left( r _ { 2 } - r _ { 1 } \right) \\
\text{Isothermal sphere of radius } r \text{ in an infinite medium} & S = 4 \pi r \\
\text{Isothermal circular disc of diameter } D \text{ in an infinite medium} & S = 2 D \\
\text{Horizontal pipe of diameter } D \text{ buried at depth } z \ ( z > 1 . 5 D , \ L \gg D ) & S = 2 \pi L / \ln \left( 4 z / D \right) \\
\text{Vertical cylinder, length } L \text{, radius } r, \text{ top flush with surface} & S = 2 \pi L / \ln \left( 2 L / r \right) \\
\text{Sphere of radius } r \text{ buried with centre at depth } z & S = 4 \pi r / ( 1 - 0 . 2 5 \, r / z ) \\
\text{Isothermal square contact of side } a \text{ on a semi-infinite solid} & S \approx 1 . 5 4 \, a \\
\text{Row of } N \text{ equally spaced buried pipes, spacing } s \gg D & S \approx 2 \pi N L / \ln \left( 4 z / D \right) \ \text{(if widely spaced)}
\end{array}
$$
**Two cautions.** The shape factor assumes **both** surfaces are isothermal; a real pipe has a wall resistance and a fluid resistance in series, and those must be added as ordinary resistances, giving $1 / ( S k )$ as one more term in the sum. **And the buried-pipe formula degrades quickly near the surface**: it is derived for $z > 1 . 5 D$ and it is good to a few per cent for $z > 2 D$; below that the ground surface is not approximately isothermal and the answer must come from a conformal map or a mesh.
:::

::: example A buried district-heating pipe {#ex-buried}
A **$100\ \mathrm{mm}$ OD** district-heating main runs at $80\ {}^{\circ}\mathrm{C}$ at a depth of **$1.2\ \mathrm{m}$** to the pipe centreline, in soil of $k = 1.0\ \mathrm{W / m\,K}$ whose surface sits at $5\ {}^{\circ}\mathrm{C}$.
**By the shape factor.**
$$
S ^ { \prime } = { \frac { 2 \pi } { \ln \left( 4 \times 1 . 2 / 0 . 1 \right) } } = { \frac { 6 . 2 8 3 2 }{ \ln 4 8 } } = { \frac { 6 . 2 8 3 2 } { 3 . 8 7 1 2 } } = 1 . 6 2 3 \ \mathrm { m } \ \text{per metre of pipe}
$$
$$
q ^ { \prime } = 1 . 6 2 3 \times 1 . 0 \times ( 8 0 - 5 ) = \mathbf { 1 2 2 \ W / m }
$$
**By the naive one-dimensional model** — "soil out to a depth of $1.2\ \mathrm{m}$ as a cylindrical shell":
$$
R ^ { \prime } = { \frac { \ln \left( 1 . 2 / 0 . 0 5 \right) } { 2 \pi \times 1 . 0 } } = 0 . 5 0 5 8 \quad \Longrightarrow \quad q ^ { \prime } = { \frac { 7 5 } { 0 . 5 0 5 8 } } = 1 4 8 \ \mathrm { W / m } \qquad \left( 2 2 \ \ \% \ \text{too high} \right)
$$
**The naive model is wrong because the heat does not travel in cylinders; it converges on the pipe from a much larger volume of soil than the shell between $50\ \mathrm{mm}$ and $1.2\ \mathrm{m}$, and the extra area is exactly what the shape factor counts.**
**Now insulate it with $50\ \mathrm{mm}$ of polyurethane** ($k = 0.026$), adding the foam as an ordinary series resistance:
$$
R _ { \mathrm { foam } } ^ { \prime } = { \frac { \ln \left( 0 . 1 0 / 0 . 0 5 \right) } { 2 \pi \times 0 . 0 2 6 } } = 4 . 2 4 3 , \qquad R _ { \mathrm { soil} } ^ { \prime } = { \frac { 1 } { S ^ { \prime } k } } = { \frac { 1 } { 1 . 6 2 3 } } = 0 . 6 1 6
$$
$$
q ^ { \prime } = { \frac { 7 5 } { 4 . 8 5 9 } } = \mathbf { 1 5 . 4 \ W / m } \qquad \left( { \frac { 1 2 2 } { 1 5 . 4 } } = 7 . 9 \ \text{times less} \right)
$$
**The soil resistance is now only $12.7\ \ \%$ of the total, and it cannot be reduced by making the foam thicker.** **This is the buried-pipe version of the cold-store ceiling: the ground is a heat sink of finite quality, and its conductance is set by the pipe's own size and depth, not by anything you put on the pipe.** The practical consequence is that district-heating designers compete on **depth and on pipe spacing**, not only on foam thickness — and that a pipe run $0.4\ \mathrm{m}$ deeper loses about $10\ \ \%$ less, which is a civil-engineering decision wearing a thermal label.
:::

::: widget plot
title: Buried pipe heat loss against depth of cover
f: 75*2*pi/ln(4*x/0.1)
x: 0.2, 4
y: 0, 260
caption: Heat loss per metre from the $100\ \mathrm{mm}$ pipe of [[#ex-buried|the buried-pipe example]] as a function of burial depth in metres, for an $75\ \mathrm{K}$ difference between pipe and ground surface. **The curve falls from $227\ \mathrm{W/m}$ at $200\ \mathrm{mm}$ of cover to $122$ at $1.2\ \mathrm{m}$ and only to $93$ at $4\ \mathrm{m}$ — a logarithm again, so each doubling of depth buys less than the last.** Between $1.2$ and $4\ \mathrm{m}$ the saving is $29\ \mathrm{W / m}$, which at $£0.08 / \mathrm{kWh}$ and $6000$ hours is $£14 / \mathrm{m}$ a year against the cost of excavating an extra $2.8\ \mathrm{m}$ of trench along every kilometre of the network. **The economic answer is that depth is not the lever; insulation is, and depth is only worth paying for where the trench has to go deep anyway, under a road or a river.** **The curve also explains the shape factor's own limit: as $z \to D / 4$ the formula's denominator goes to zero and the prediction goes to infinity, which is the formula telling you that a pipe at the surface is not a buried pipe at all.**
:::

::: exercise A copper busbar's own drop {#ex-bus level=1 check="0.37"}
A copper busbar bar of cross-section carrying $5\ \mathrm{W / cm^2}$ of heat flow across a $3\ \mathrm{mm}$ thickness. Take $k = 401\ \mathrm{W / m\,K}$. What is the temperature difference across the thickness?

::: solution
$$
\Delta T = { \frac { q ^ { \prime \prime } L } { k } } = { \frac { 5 \times 1 0 ^ { 4 } \times 3 \times 1 0 ^ { - 3 } } { 4 0 1 } } = \mathbf { 0 . 3 7 \ K }
$$
**Under half a kelvin.** This is the reason metals are treated as isothermal and non-metals are not: the same flux across $3\ \mathrm{mm}$ of stainless steel is $9.4\ \mathrm{K}$, across $3\ \mathrm{mm}$ of alumina it is $63\ \mathrm{K}$, and across $3\ \mathrm{mm}$ of epoxy it is $375\ \mathrm{K}$. **The rule of thumb that follows is the one to use before opening a calculator: a metal is usually not the thermal resistance, and a plastic always is.**
:::
:::

::: exercise A lagged condensate return {#ex-cond level=2 check="106.4"}
A $60.3\ \mathrm{mm}$ OD, $3.91\ \mathrm{mm}$ wall carbon steel pipe ($k = 45\ \mathrm{W / m\,K}$) carries condensate at $250\ {}^{\circ}\mathrm{C}$ with $h_i = 2000\ \mathrm{W / m^2 K}$. It is lagged with $50\ \mathrm{mm}$ of calcium silicate ($k = 0.08$) in a $25\ {}^{\circ}\mathrm{C}$ room with $h_o = 12\ \mathrm{W / m^2 K}$. What is the heat loss per metre?

::: solution
$$
\begin{aligned}
R _ { i } ^ { \prime } & = 1 / ( 2 0 0 0 \times \pi \times 0 . 0 5 2 5 ) = 0 . 0 0 3 0 3 \\
R _ { \mathrm { steel} } ^ { \prime } & = \ln ( 6 0 . 3 / 5 2 . 5 ) / ( 2 \pi \times 4 5 ) = 0 . 0 0 0 4 9 \\
R _ { \mathrm { lag} } ^ { \prime } & = \ln ( 1 6 0 . 3 / 6 0 . 3 ) / ( 2 \pi \times 0 . 0 8 ) = 1 . 9 4 5 0 0 \\
R _ { o } ^ { \prime } & = 1 / ( 1 2 \times \pi \times 0 . 1 6 0 3 ) = 0 . 1 6 5 4 5
\end{aligned}
$$
$$
q ^ { \prime } = { \frac { 2 2 5 } { 2 . 1 1 3 9 8 } } = \mathbf { 1 0 6 . 4 \ W / m }
$$
**The lagging is $92.0\ \ \%$, the outside film $7.8\ \ \%$, and the steel and the inside film together $0.16\ \ \%$.** Over a year at $6000$ equivalent full-load hours this pipe loses $638\ \mathrm{MWh / km}$ — for a $60\ \mathrm{mm}$ pipe, which is a lot of condensate to have boiled away out of a pipe nobody is trying to keep hot.
:::
:::

::: exercise Insulating a small wire {#ex-wire level=2 check="3.94"}
A $1.5\ \mathrm{mm}$ diameter conductor is covered with rubber of $k = 0.13\ \mathrm{W / m\,K}$ and loses heat to air at $h = 12\ \mathrm{W / m^2 K}$. By what factor does the heat loss per metre increase when the rubber is built up to the critical radius?

::: solution
$$
r _ { \mathrm { cr } } = { \frac { 0 . 1 3 } { 1 2 } } = 1 0 . 8 3 \ \mathrm { m m }
$$
$$
R _ { \text{bare} } ^ { \prime } = { \frac { 1 } { 2 \pi \times 0 . 0 0 0 7 5 \times 1 2 } } = 1 7 . 6 8 4 \ \mathrm { m \, K / W } , \qquad R _ { \mathrm { cr} } ^ { \prime } = { \frac { \ln ( 1 0 . 8 3 / 0 . 7 5 ) } { 2 \pi \times 0 . 1 3 } } + { \frac { 1 } { 2 \pi \times 0 . 0 1 0 8 3 \times 1 2 } } = 3 . 2 6 9 + 1 . 2 2 4 = 4 . 4 9 4
$$
$$
\text{factor} = { \frac { 1 7 . 6 8 4 } { 4 . 4 9 4 } } = \mathbf { 3 . 9 4 }
$$
**Nearly four times the heat transfer, from a material chosen to stop heat leaving.** Because the allowable current goes as the square root of the permissible heat loss at a fixed temperature rise, **the rubber roughly doubles the cable's ampacity** — which is why the "insulation" on a power conductor is specified electrically and rated thermally, and why a bare overhead conductor of the same metal and the same temperature limit is, per kilogram, a much worse conductor than a covered one.
:::
:::

::: exercise The ceiling on a spherical tank's lagging {#ex-sphlevel level=2 check="1.77"}
A spherical cryogenic vessel of $0.5\ \mathrm{m}$ outer radius is covered with $100\ \mathrm{mm}$ of silica aerogel blanket ($k = 0.015\ \mathrm{W / m\,K}$). What is the conductive resistance of the blanket, and what is the largest resistance any thickness of blanket could give?

::: solution
$$
R = { \frac { r _ { 2 } - r _ { 1 } } { 4 \pi k r _ { 1 } r _ { 2 } } } = { \frac { 0 . 1 } { 4 \pi \times 0 . 0 1 5 \times 0 . 5 \times 0 . 6 } } = { \frac { 0 . 1 } { 0 . 0 5 6 5 5 } } = \mathbf { 1 . 7 7 \ K / W }
$$
$$
R _ { \max } = { \frac { 1 } { 4 \pi k r _ { 1 } } } = { \frac { 1 } { 4 \pi \times 0 . 0 1 5 \times 0 . 5 } } = \mathbf { 1 0 . 6 \ K / W }
$$
**The $100\ \mathrm{mm}$ blanket delivers $17\ \ \%$ of the theoretical maximum, and reaching half of the maximum would need $R / R _ { \max } = 1 - r _ { 1 } / r _ { 2 } = 0 . 5$, i.e. $r _ { 2 } = 1.0\ \mathrm{m}$ — half a metre of aerogel on a five-metre-radius tank.** **This is the saturation property of spherical conduction as a design fact: on a sphere, insulation thickness has a hard ceiling that no budget can reach, and the money is far better spent on a lower-conductivity material at the same thickness than on more thickness.** The same arithmetic in reverse is why a small cryogenic sphere is proportionally harder to insulate than a large one: $R_{\max} \propto 1 / r_1$, so halving the radius halves the best achievable resistance while quartering the surface area — and the ratio of leak to contents goes the wrong way.
:::
:::

::: exercise The fuel pellet's own limit {#ex-pellet level=2 check="710.5"}
A uranium dioxide fuel pellet is $8.2\ \mathrm{mm}$ in diameter with a conductivity of $2.8\ \mathrm{W / m\,K}$ at operating temperature and a linear rating of $25\ \mathrm{kW / m}$. What is the temperature difference between the pellet centreline and its surface?

::: solution
$$
T _ { 0 } - T _ { s } = { \frac { q ^ { \prime } } { 4 \pi k } } = { \frac { 2 5 { , } 0 0 0 } { 4 \pi \times 2 . 8 } } = { \frac { 2 5 { , } 0 0 0 } { 3 5 . 1 9 } } = \mathbf { 7 1 0 . 5 \ K }
$$
**Note that the answer does not contain the diameter**, because the diameter cancels between $\dot q \propto 1 / r^2$ and $\Delta T \propto r^2$ at fixed linear rating. **What the diameter does control is the gap conductance, the stored inventory and the fission-gas release, which is why fuel development has spent sixty years making pellets smaller at the same kW/m** — the latest research fuels are $6\ \mathrm{mm}$ or less, and each millimetre of diameter removed is a small but real piece of the melting margin handed back.
:::
:::

::: exercise A refractory with temperature-dependent conductivity {#ex-meank level=2 check="1078"}
A $230\ \mathrm{mm}$ diatomite insulating brick wall has faces at $900$ and $100\ {}^{\circ}\mathrm{C}$. The brick's conductivity is $0.36\ \mathrm{W / m\,K}$ at $100\ {}^{\circ}\mathrm{C}$, $0.31$ at $500\ {}^{\circ}\mathrm{C}$ and $0.28$ at $900\ {}^{\circ}\mathrm{C}$. Estimate the heat flux.

::: solution
For one-dimensional steady conduction with $k ( T )$, the Kirchhoff transform says to use the conductivity at the **mean of the two surface temperatures** — here $500\ {}^{\circ}\mathrm{C}$, so $k = 0.31$:
$$
q ^ { \prime \prime } = { \frac { { \bar { k } } \, \Delta T } { L } } = { \frac { 0 . 3 1 \times 8 0 0 } { 0 . 2 3 0 } } = \mathbf { 1 0 7 8 \ W / m ^ { 2 } }
$$
**Using the cold-face value $0.36$ would give $1252\ \mathrm{W / m^2}$, an overestimate of $16\ \ \%$; using the hot-face value $0.28$ would give $974$, an underestimate of $10\ \ \%$.** **The mean-value rule is exact when $k ( T )$ is linear in $T$ and good to a few per cent otherwise, and it is the only reason a furnace lining can be sized without a numerical solution.** **The direction of the error is worth remembering: for most insulating refractories $k$ falls with temperature, so using the datasheet's room-temperature value is conservative on heat loss and unconservative on the cold-face temperature — which is the one that decides whether the steel shell behind it needs a cooling fin.**
:::
:::

::: exercise Steel bolts through insulation {#ex-bolts level=3 check="1.60"}
A cold-store roof is $50\ \mathrm{mm}$ of glass wool ($k = 0.04\ \mathrm{W / m\,K}$) and is penetrated by **four $16\ \mathrm{mm}$ diameter steel bolts per square metre** ($k = 50\ \mathrm{W / m\,K}$), each passing the full thickness. Ignoring the surface films, what is the effective $U$-value of the insulation layer?

::: solution
The bolts and the wool are in **parallel**, so conductances add over the one square metre of plan area. Bolt shank area $= \pi \times 0 . 0 1 6 ^ { 2 } / 4 = 2 . 0 1 \times 1 0 ^ { - 4 }\ \mathrm { m^2 }$ each, so $A_b = 8 . 0 4 \times 1 0 ^ { - 4 }\ \mathrm { m^2 }$ for four:
$$
U _ { \text{wool} } = { \frac { 0 . 0 4 \times ( 1 - 8 . 0 4 \times 1 0 ^ { - 4 } ) } { 0 . 0 5 } } = 0 . 7 9 9 4 \ \mathrm { W / m ^ { 2 } K } , \qquad U _ { \text{bolts} } = { \frac { 5 0 \times 8 . 0 4 \times 1 0 ^ { - 4 } } { 0 . 0 5 } } = 0 . 8 0 4 0 \ \mathrm { W / m ^ { 2 } K }
$$
$$
U = 0 . 7 9 9 4 + 0 . 8 0 4 0 = \mathbf { 1 . 6 0 \ W / m ^ { 2 } K }
$$
**Four steel bolts per square metre — $0.08\ \%$ of the area — exactly double the heat leak.** The ratio is $k_b / k_w \times A_b / A = 50 / 0.04 \times 8 . 0 4 \times 1 0 ^ { - 4 } = 1 . 0 0 5$, i.e. **each bolt is worth as much insulation area as its own area times the conductivity ratio, which for steel on glass wool is $1250$.** **This is the single most under-designed detail in cold construction:** the equivalent problem appears as steel shelf angles through a cavity wall, as through-wall penetrations, as the aluminium spacer bar in an insulating glass unit, and as the fasteners in a sandwich panel — and the standard remedy is always the same two moves, **use a lower-conductivity fastener (GRP, stainless, or a broken-throat bracket) and reduce the number**, because the area fraction is the only term you control cheaply.
:::
:::

::: exercise Insulating the buried main {#ex-buried2 level=2 check="15.4"}
For the buried pipe of [[#ex-buried|the buried-pipe example]], what is the heat loss per metre if the pipe is first wrapped with $50\ \mathrm{mm}$ of polyurethane ($k = 0.026\ \mathrm{W / m\,K}$) before being laid in the same soil?

::: solution
The foam and the soil are in **series**, so their resistances add; the soil resistance is the reciprocal of the shape factor times its conductivity.
$$
R _ { \mathrm { foam} } ^ { \prime } = { \frac { \ln ( 0 . 1 0 / 0 . 0 5 ) } { 2 \pi \times 0 . 0 2 6 } } = 4 . 2 4 3 \ \mathrm { m \, K / W } , \qquad R _ { \mathrm { soil} } ^ { \prime } = { \frac { 1 } { S ^ { \prime } k _ { \mathrm { soil} } } } = { \frac { 1 } { 1 . 6 2 3 \times 1 . 0 } } = 0 . 6 1 6
$$
$$
q ^ { \prime } = { \frac { 8 0 - 5 } { 4 . 2 4 3 + 0 . 6 1 6 } } = { \frac { 7 5 } { 4 . 8 5 9 } } = \mathbf { 1 5 . 4 \ W / m }
$$
**A $7.9$-fold reduction, of which the soil now limits everything: $12.7\ \ \%$ of the resistance is ground and no further foam will change it.** **The general rule this exercise installs is the one that makes shape factors worth learning: whenever a small object exchanges heat with a large one, the large object contributes a fixed conductance $S k$ that becomes the binding constraint once the object itself is well insulated — and the only remaining levers are the object's size, its position, and the conductivity of the large medium.**
:::
:::

::: quiz Which way does the insulation go? {#quiz-crit}
Four objects are to be covered with $2\ \mathrm{mm}$ of polyurethane foam ($k = 0.026\ \mathrm{W / m\,K}$) in still air ($h \approx 10\ \mathrm{W / m^2 K}$). **In which case does the foam increase the heat loss rather than reduce it?**

- [ ] A $100\ \mathrm{mm}$ diameter steam pipe
- [ ] A $30\ \mathrm{mm}$ diameter chilled-water pipe
- [x] A $4\ \mathrm{mm}$ diameter capillary tube
- [ ] A $500\ \mathrm{mm}$ diameter storage tank

::: solution
**The $4\ \mathrm{mm}$ capillary tube.** The critical radius is $r _ { \mathrm { cr } } = k / h = 0 . 0 2 6 / 1 0 = 2 . 6 \ \mathrm { mm}$, and the capillary's radius is $2.0\ \mathrm{mm}$ — below it, so $2\ \mathrm{mm}$ of foam carries the outer surface out to $4\ \mathrm{mm}$ radius, past $r_{\mathrm{cr}}$, and **increases** the heat transfer. The $30\ \mathrm{mm}$ pipe has a radius of $15\ \mathrm{mm}$, nearly six times $r_{\mathrm{cr}}$, and the other two are further still.
**The reason the answer is a radius and not a diameter, and the reason the question is asked in terms of objects you can hold in one hand:** $r_{\mathrm{cr}}$ for modern insulation in still air is only a few millimetres, so the effect is confined to small-diameter items — but those include capillaries, wires, thermocouple beads, sensor leads, optical fibres and the struts of a cryogenic support. **For all of them the "insulation" is thermally a fin, and this is a fact to exploit rather than fight: a thermocouple junction is deliberately made small and bare, and a hot-wire anemometer works because the wire is far below $k/h$.**
:::
:::

::: quiz Improving the wrong layer {#quiz-layer}
The cold-store panel of [[#ex-coldstore|the cold-store example]] has $1 / U = 5 . 9 3 4\ \mathrm { m^2 K / W}$, made up of inside film $0.125$, steel $0.00004$, foam $5.769$ and outside film $0.040$. A consultant proposes raising the inside surface coefficient from $8$ to $12\ \mathrm{W / m^2 K}$ by adding a fan. What is the reduction in heat leak?

- [ ] About $12\ \%$, because the inside film is $12\ \%$ of the resistance
- [x] About $0.7\ \%$, because the film is only $2.1\ \%$ of the total and reducing it by a third removes $0.7\ \%$
- [ ] About $4\ \%$, because the film resistance falls by a third and half of that appears on the hot side
- [ ] None, because a surface coefficient cannot be changed by a fan

::: solution
**About $0.7\ \%$.** The inside film resistance falls from $1 / 8 = 0.1250$ to $1 / 1 2 = 0.0833$, so
$$
{ \frac { 1 } { U } } \colon 5 . 9 3 4 \rightarrow 5 . 8 9 2 \qquad \Longrightarrow \qquad U \colon 0 . 1 6 8 5 \rightarrow 0 . 1 6 9 7 \quad ( + 0 . 7 \ \% )
$$
**The first option is the trap, and it is a trap because the arithmetic is right and the conclusion is wrong: the film is $2.1\ \ \%$ of the resistance, not $12\ \%$, and reducing a third of $2.1\ \ \%$ is $0.7\ \ \%$.** **The general rule is the one this whole lesson has been building towards: in a series network the improvement available from any element is the fraction of the total resistance that element owns, and no amount of effort buys more than that.** The corollary is the design instruction — **find the $90\ \ \%$ term and leave the rest alone**, which in a cold panel means more foam, a better vapour barrier and fewer bolts, and never a fan.
:::
:::

## Where this lesson leads

Steady conduction is the only part of heat transfer that can be finished in one lesson, because it is the only part whose governing equation is linear, time-independent and — in one dimension — integrable by inspection. Everything after this lesson is about the two terms that this lesson treated as given. **The next lesson takes the plane wall and bends it into a fin**, which makes the surface temperature an unknown along the fin and produces the efficiency and effectiveness that decide whether extra metal is worth buying. **The lesson after that puts time back into the equation**, and the Biot number — the ratio of the internal resistance you have just learned to compute to the surface resistance you have just learned to add — turns out to be the single test that decides whether a body has one temperature or a profile.

Then comes the hard part. **Every $h$ in the resistance networks of this lesson was quoted, and the next five lessons exist to calculate it.** The conduction solution and the convection solution meet at the wall, where the two must agree on the heat flux, and that meeting is what makes the whole subject one subject rather than two. Two results from this lesson will be quoted back at you repeatedly: **the critical radius $k / h$**, which is the reason small insulated objects behave perversely, and **the shape factor ceiling $S k$**, which is the reason a well-insulated object buried in a large medium is limited by the medium and not by the insulation.

::: history
| Year | Event |
|---|---|
| 1822 | **Joseph Fourier**, *Théorie analytique de la chaleur*, gives $\rho c_p \partial T / \partial t = \nabla \cdot (k \nabla T)$, solves it for the slab by trigonometric series, and — in the same book — estimates the temperature of the Earth's surface from its heat flow. **The resistance network of this lesson is his Chapter V, and the shape factor of his Chapter VII.** |
| 1822 | Fourier also states the boundary condition of the third kind, $-k \partial T / \partial n = h(T - T_\infty)$, in the form still used — and admits that $h$ must be supplied by experiment. **Two hundred years of convection research is the footnote to that admission.** |
| 1831 | **Siméon Denis Poisson** publishes *Recherches sur la chaleur*, extending Fourier's theory to bodies with internal heat generation and to variable conductivity. **The parabolic profile of a fuel pellet and of a chip is Poisson's, not Fourier's.** |
| 1851 | **William Thomson (Lord Kelvin)** uses the analogy between steady heat flow and electrostatic attraction to solve two-dimensional conduction problems by the methods of potential theory, and states the uniqueness theorem that makes a shape factor table legitimate. **Every "thermal analogy" method in electrical engineering, seepage flow and stress concentration descends from this one paper.** |
| 1895 | **A. Taubel and R. Salbach** publish the first systematic measurements of the thermal conductivity of refractory brick against temperature, prompted by the question of how thick a furnace wall must be to keep its outside below $60\ {}^{\circ}\mathrm{C}$ — the origin of the mean-conductivity rule of [[#ex-meank|the refractory exercise]]. |
| 1907 | **L. Ludwig** and, independently, plant engineers of the period publish the first treatments of heat loss from lagged pipes that recognise the maximum-loss radius; the result is rediscovered often enough that it has been re-derived in textbooks under at least six names since. |
| 1937 | **A. N. Tikhonov and A. A. Samarskii** begin the systematic theory of the shape factor (they call it the *konduktanz*), and **R. V. Churchill** publishes the first of a long series of shape-factor tables in *Journal of Mathematics and Physics*; the tabulation tradition is what makes three-dimensional conduction a lookup rather than a project. |
| 1941, 1950 | **D. Q. Kern**, *Process Heat Transfer* (1950), fixes the pipe-lagging calculation in the form every plant engineer still uses, including the fouling resistances that this lesson has deliberately left out — and the omission is worth noting: **in a fouled exchanger the "contact resistance" of a deposit is often the largest single term in the network.** |
:::

::: summary
- **Steady, one-dimensional, no generation is Laplace's equation, and its solution in a wall, a cylinder or a sphere is a straight line, a logarithm and a hyperbola.** Everything else in this lesson is those three plus a boundary condition.
- **The resistance network is exact, not approximate** — for one-dimensional paths with constant $k$. It fails when $k(T)$ varies strongly (use the mean over the actual range) and when the flow is multidimensional (use a shape factor).
- **Series resistances add; parallel paths add as conductances.** Four steel bolts through a glass-wool roof double the heat leak, and the same arithmetic covers cavity-wall shelves, glass-unit spacers and sandwich-panel fasteners.
- **The improvement available from any element is the fraction of the total resistance it owns.** In a lagged pipe the lagging owns $92\ \%$ and the steel owns $0.02\ \%$; in a cold panel the films own $2.8\ \%$ and no fan can help.
- **Radial resistance saturates.** A cylindrical resistance grows as $\ln(r_2/r_1)$ and a spherical one to a hard ceiling of $1 / (4 \pi k r_1)$, so thickness has diminishing returns and, on a sphere, a limit.
- **Below $r_{\mathrm{cr}} = k/h$ insulation cools.** For modern insulation in still air $r_{\mathrm{cr}}$ is $2$–$25\ \mathrm{mm}$, which puts wires, capillaries, beads and sensor leads on the side of the rule where the insulation is a heat sink.
- **Generation gives $\Delta T = \dot{q} L^2 / 2k$ in a slab and $q' / 4 \pi k$ in a cylinder.** Thickness is a square-law lever: the same volumetric rating drops $711\ \mathrm{K}$ across $4\ \mathrm{mm}$ of ceramic and $1.06\ \mathrm{K}$ across $0.25\ \mathrm{mm}$ of silicon.
- **The surface flux is not negotiable; only the internal drop is.** $q'' = \dot{q} L$ is fixed by the generation and the geometry, so a cooling system is sized on a duty you cannot change and a temperature you can.
- **The shape factor $S$ turns a three-dimensional puzzle into $q = S k \Delta T$.** A buried pipe loses $122\ \mathrm{W/m}$ by shape factor and $148$ by the naive cylindrical model, and once it is well insulated the ground's $S k$ is the binding constraint.
- **Interface and film resistances are absolute, not relative.** A contact resistance invisible in a furnace is $3\ \%$ of a cold panel and $86\ \%$ of a heat sink; the question is never "is the joint bad" but "how small is everything else."
:::

## Further reading

- **H. S. Carslaw & J. C. Jaeger**, *Conduction of Heat in Solids*, 2nd ed. (Oxford University Press, 1959; reprinted) — the source for every closed-form solution in this lesson and for several that are not in any later book. Read it as a catalogue, not a text, and keep it within reach whenever a geometry looks unusual.
- **F. P. Incropera, D. P. DeWitt, T. L. Bergman & A. S. Lavine**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — Chapters 2 to 4, and in particular the shape-factor table in Chapter 4 and the worked pipe-lagging examples that the exercises above follow.
- **J. P. Holman**, *Heat Transfer*, 11th ed. (McGraw-Hill, 2010) — the gentlest route through the resistance network and the best set of composite-wall problems at this level.
- **D. Q. Kern**, *Process Heat Transfer* (McGraw-Hill, 1950; reprinted by Krieger) — pipe lagging, fouling resistances and the economics of insulation thickness, written by an engineer who assumed the reader had a plant to build.
- **A. D. Craggs**, *Heat Transfer* (McGraw-Hill, 1986) — the shape-factor and conduction-shape material treated as a design subject, with the worked building examples that most heat-transfer books skip.
- **ASHRAE Handbook — Fundamentals**, current chapter on *Heat-Transfer and Insulation* — the source for the parallel-path (bolted and framed) $U$-value method used in [[#ex-bolts|the bolted-insulation exercise]], and for the surface coefficients $h_i = 7.7$ and $h_o = 25\ \mathrm{W/m^2 K}$ that appear throughout.
- **A. Bejan**, *Convection Heat Transfer*, 4th ed. (Wiley, 2013) — Chapter 1 treats conduction as geometry optimisation and gives the "volume-to-point" shape-factor results that generalise the buried-object problem to the shape of an optimal fin.
- **EN ISO 6946**, *Thermal resistance and thermal transmittance — Calculation methods* — the standard method for multidimensional corrections and for the junction and fastener allowances that [[#ex-bolts|the bolted-insulation exercise]] exposes, and a good illustration of a heat-transfer problem that a calculation cannot fully solve and a detail drawing can.
