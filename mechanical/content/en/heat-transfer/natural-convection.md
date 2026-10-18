Take the fan away and the fluid still moves, because the fluid that has been warmed is lighter than the fluid that is coming to replace it. **Natural convection is the same boundary-layer physics as forced convection with the pressure gradient supplied by gravity and the velocity no longer known in advance** — and that single change turns a problem with one control knob (the speed) into a problem in which the heat transfer, the flow rate and the temperature difference are all determined together. **The velocity is not an input; it is part of the answer.**

The consequences are worth stating before any equation. **For a laminar thermal boundary layer the coefficient turns out to be almost independent of size** — $h \propto L ^ { - 1 / 4 }$ on a vertical plate, against $L ^ { - 1 / 2 }$ for a forced laminar layer — **which is why a natural-convection heat sink can be scaled up almost for free and why a small model in a laboratory tells you so little about the full-size object it represents.** **The coefficient depends on the temperature difference as $\Delta T ^ { 1 / 4 }$ , so the heat flux goes as $\Delta T ^ { 5 / 4 }$ : doubling the allowed temperature rise more than doubles the cooling, and the "thermal resistance" of a natural-convection part is not a constant but a curve.** **And the flow is slow — centimetres per second, not metres — so it is easily destroyed by a draught, by the fan in the next box, or by the motion of the vehicle the box is in, which is why every natural-convection calculation has to be accompanied by the question "and is there really no wind?"**

The subject is organised, like external convection, around the vertical plate; but here the plate has an orientation, and orientation is not a detail. **A hot surface facing up cools twice as well as the same surface facing down, because in the first case the light fluid is under the heavy and the layer is unstable, and in the second it is stable and the layer simply sits there.** **A channel of fins has an optimum spacing that forced flow does not: close the fins together and the boundary layers merge, the channel becomes a wall of conduction, and the flow stops.** **And an enclosure — the gap in a double-glazed unit, the air between a hot tank and its lagging — can carry less heat than pure conduction through the same fluid would suggest and more than you would guess, because the flow organises itself into cells whose size is set by the gap.**

::: warning Five natural-convection errors, in order of how much they cost
**Assuming the flow is forced when it is not, or the reverse.** **The test is $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ , not your instinct.** For a $1 0 0 \ \mathrm { m m }$ plate at $3 0 \ \mathrm { K }$ above ambient, $\mathrm { G r } = 4 . 4 \times 1 0 ^ { 6 }$ : at $1 \ \mathrm { m / s }$ the ratio is $0 . 1 0$ and the forced calculation is good to a few per cent; at $0 . 1 \ \mathrm { m / s }$ it is $1 0$ and the "forced" answer is wrong by a factor of three. **Server rooms are designed at $2$ to $5 \ \mathrm { m / s }$ and everything in them is forced; a sealed enclosure on a shelf in a corner is not, and the fan curve of the neighbouring instrument is what decides which.** **Using a forced-convection correlation because it is the one you know is the most common error in the subject; using a natural-convection correlation on a rack with $2 \ \mathrm { m / s }$ across it is the second.** **Getting the orientation wrong.** **A horizontal hot surface facing up and the same surface facing down differ by a factor of two; a plate inclined $6 0 ^ { \circ }$ from the vertical loses a fifth of its cooling; and a heated plate on the underside of a hot water tank does almost nothing at all.** **There is no universal "natural convection $h = 5 \ \mathrm { W / m ^ { 2 } K }$" — there is a correlation per orientation, and the orientations give answers that differ by three to one.** **Forgetting that radiation is usually half the heat.** **A $6 0 \ \ {} ^ { \circ } \mathrm { C }$ pipe in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room gives $h _ { c } = 6 . 2$ and $h _ { r } = 6 . 3 \ \mathrm { W / m ^ { 2 } K }$ : half the heat leaves by a mechanism that no natural-convection correlation contains.** **At room temperatures and modest temperature differences, natural convection and radiation are of the same size, and a calculation that omits one systematically over-predicts the convection it needs.** **Using the wrong length, or the wrong temperature difference.** **The length in $\mathrm { R a } _ { L }$ is the height of a vertical plate, the diameter of a cylinder, the gap of an enclosure and the ratio $A _ { s } / P _ { s }$ of area to perimeter for a horizontal plate — four different numbers for one object.** **Properties, including the expansion coefficient, go at the film temperature; $\beta$ for an ideal gas is $1 / T _ { f }$ in kelvin, and using $1 / T$ with $T$ in Celsius gives an answer wrong by a factor of three hundred.** **Trusting the correlations more than they deserve.** **The scatter of natural-convection data is $\pm 1 5$ to $\pm 2 0 \ \ \%$ in the best cases and much worse near transition, because the flow is unsteady, three-dimensional and sensitive to the room.** **The honest design response is to compute the heat at the low end of the coefficient range, to keep the temperature rise as the specification rather than the result, and to measure the finished box — which is what every manufacturer of passive electronics actually does.**
:::

## Why buoyancy makes its own Reynolds number

::: definition Buoyancy as a body force, and the expansion coefficient {#def-buoy}
A fluid element in a gravitational field feels a net force only if it is lighter than the space it occupies. With $\rho _ { \infty }$ the density of the undisturbed fluid at $T _ { \infty }$ , the upward force per unit volume on an element at $T$ is
$$
f _ { b } = \left( \rho _ { \infty } - \rho \right) g \qquad \beta \equiv - { \frac { 1 } { \rho } } \left( { \frac { \partial \rho } { \partial T } } \right) _ { p } \approx { \frac { \rho _ { \infty } - \rho } { \rho \left( T - T _ { \infty } \right) } } \qquad \Longrightarrow \qquad f _ { b } \approx \rho \beta g \left( T - T _ { \infty } \right)
$$
**This is the Boussinesq approximation, and its content is one sentence: density changes are negligible everywhere except multiplied by $g$ .** **It is an excellent approximation whenever $\beta \Delta T \ll 1$ — for gases that means temperature differences of a few hundred kelvin, for liquids of a few tens.** **Two properties make it necessary to say which fluid is meant:**
$$
\begin{array} { l c l l }
\text{Fluid} & \beta \ \left( \mathrm { K ^ { - 1 } } \right) & \text{at} & \text{Comment} \\
\text{Ideal gas} & 1 / T _ { f } = 3 . 3 \times 1 0 ^ { - 3 } & 2 0 \ \mathrm { ^ \circ C } & \text{the only case where } \beta \text{ is exact and needs no table} \\
\text{Water} & 2 . 0 7 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \text{rises to } 7 . 8 \times 1 0 ^ { - 4 } \text{ at } 7 5 \ \mathrm { ^ \circ C } \text{ and to } 4 9 \times 1 0 ^ { - 4 } \text{ at } 1 0 0 \ \mathrm { ^ \circ C } \\
\text{Water} & 0 & 4 \ \mathrm { ^ \circ C } & \text{the density maximum: no buoyancy, and lakes freeze from the top down} \\
\text{Engine oil} & 7 . 0 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \text{large } \beta \text{ and huge } \mathrm { P r } \text{: strong driving, reluctant flow} \\
\text{Mercury} & 1 . 8 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \text{weak driving, but } \alpha \text{ is enormous: conduction wins}
\end{array}
$$
**Water's behaviour is the one that surprises people and the one that matters in nature.** **Between $0$ and $4 \ \ {} ^ { \circ } \mathrm { C }$ the expansion coefficient changes sign, so the coldest water is the lightest, convection stops, and a lake develops a $4 \ \ {} ^ { \circ } \mathrm { C }$ bottom and an ice lid instead of freezing solid.** **Above $4 \ \ {} ^ { \circ } \mathrm { C }$ everything is normal again, and the near-wall plumes of a heated pan of water carry essentially all the heat: at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ water's thermal conductivity would give $h \approx 5 \ \mathrm { W / m ^ { 2 } K }$ by pure conduction over a metre, and its natural convection gives three hundred times that.**
:::

::: definition The Grashof and Rayleigh numbers {#def-gr}
Balance buoyancy against inertia in the boundary-layer momentum equation, and viscous diffusion against the streamwise transport of momentum, and two groups appear. With $L$ the vertical length of the body and $\Delta T$ the surface-to-ambient difference:
$$
\mathrm { G r } _ { L } = { \frac { \rho ^ { 2 } g \beta \Delta T L ^ { 3 } } { \mu ^ { 2 } } } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu ^ { 2 } } } \qquad \boxed { \; \mathrm { R a } _ { L } = \mathrm { G r } _ { L } \, \mathrm { P r } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \; }
$$
**$\mathrm { G r }$ is the buoyancy analogue of $\mathrm { R e } ^ { 2 }$ — it is inertia squared over viscous force — and $\mathrm { R a }$ is the same ratio with heat conduction included.** **Read $\mathrm { R a }$ as a competition between two ways of moving energy across a layer of thickness $L$ : buoyant transport, which goes as $g \beta \Delta T L ^ { 3 } / \nu$ , and conduction, which goes as $\alpha$ .** **$\mathrm { R a } \ll 1$ is conduction with no motion at all; $\mathrm { R a } \gg 1$ is a boundary layer and a core; $\mathrm { R a } \gtrsim 1 0 ^ { 9 }$ on a vertical surface is the end of laminar flow.**
**The velocity and thickness scales fall out of the same balance and are worth memorising, because they are the sanity check on every natural-convection problem you will ever set up:**
$$
\boxed { \; u \sim { \sqrt { g \beta \Delta T L } } \; } \qquad \delta \sim { \frac { L } { \mathrm { R a } _ { L } ^ { 1 / 4 } } } \qquad h \sim { \frac { k } { \delta } } \sim { \frac { k } { L } } \, \mathrm { R a } _ { L } ^ { 1 / 4 }
$$
$$
\begin{array} { l c c c }
\text{Case} & u \text{ scale} & \delta \text{ at the top} & h \\
\text{Vertical plate, } 1 5 0 \ \mathrm { m m } \text{, } 5 0 \ \mathrm { K } \text{, air} & 0 . 4 8 \ \mathrm { m / s } & 1 1 \ \mathrm { m m } & 6 \ \mathrm { W / m ^ { 2 } K } \\
\text{Same plate, } 1 \ \mathrm { m } \text{, } 5 0 \ \mathrm { K } & 1 . 2 \ \mathrm { m / s } & 6 0 \ \mathrm { m m } \text{ (and turbulent)} & 4 . 5 \ \mathrm { W / m ^ { 2 } K } \\
\text{Window gap, } 1 2 \ \mathrm { m m } \text{, } 1 0 \ \mathrm { K } & 0 . 0 2 \ \mathrm { m / s } & 6 \ \mathrm { m m } \text{ (the whole gap)} & 2 . 5 \ \mathrm { W / m ^ { 2 } K } \\
\text{Water, } 0 . 5 \ \mathrm { m } \text{, } 1 0 \ \mathrm { K } & 0 . 1 0 \ \mathrm { m / s } & 1 . 5 \ \mathrm { m m } & 3 3 0 \ \mathrm { W / m ^ { 2 } K }
\end{array}
$$
**Half a metre per second up a hot wall, two centimetres per second in a window gap.** **These are the speeds at which "still" air actually moves, and they are the reason a candle flame leans towards a ventilation grille across a whole room, the reason smoke rises to the ceiling and then drifts along it, and the reason a natural-convection enclosure must be vented at the top and not merely somewhere.**
:::

::: widget plot
title: Natural-convection coefficient against temperature rise, laminar and turbulent
f: 6.03*pow(x/50,0.25); 6.03*pow(x/50,1/3)
x: 2, 120
y: 0, 25
labels: laminar, h proportional to delta-T^1/4; turbulent, h proportional to delta-T^1/3
caption: The coefficient of a $1 5 0 \ \mathrm { m m }$ vertical plate in air at $5 0 \ \ {} ^ { \circ } \mathrm { C }$ film temperature, against surface-to-ambient difference. **Both curves pass through $6 . 0 \ \mathrm { W / m ^ { 2 } K }$ at $5 0 \ \mathrm { K }$ and then part: the laminar law is nearly flat, the turbulent law climbs steeply, because in the turbulent regime the whole layer is mixing and $h$ no longer cares about the quiet conduction sublayer.** **The practical reading is the laminar curve's flatness: going from a $2 0 \ \mathrm { K }$ to an $8 0 \ \mathrm { K }$ rise buys only $3 2 \ \ \%$ more coefficient, but $5 \times$ more temperature difference times $1 . 3 2$ more coefficient is $6 . 6$ times the heat flux — the $\Delta T ^ { 5 / 4 }$ law, and the reason a passive enclosure's heat rating is so sensitive to the temperature you allow it to run at.** **The turbulent curve is drawn for $\mathrm { R a } > 1 0 ^ { 9 }$ , which on this plate means $\Delta T > 1 3 0 \ \mathrm { K }$ ; on a $1 \ \mathrm { m }$ wall the same transition happens at $1 1 \ \mathrm { K }$ , which is why big hot things cool better than the laminar formula says and small ones do not.**
:::

::: example How fast, and how thick {#ex-scale}
Estimate the plume velocity and boundary-layer thickness $2 0 0 \ \mathrm { m m }$ above a horizontal hot surface at $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room, and the coefficient that goes with it.
::: solution
**Take $L = 0 . 2 0 0 \ \mathrm { m }$ , $\Delta T = 5 0 \ \mathrm { K }$ , film temperature $4 5 \ \ {} ^ { \circ } \mathrm { C }$ : $\beta = 1 / 3 1 8 = 3 . 1 4 \times 1 0 ^ { - 3 } \ \mathrm { K ^ { - 1 } }$ , $\nu = 1 . 7 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $\alpha = 2 . 4 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 7 5 \ \mathrm { W / m \, K }$ .**
$$
u \sim { \sqrt { g \beta \Delta T L } } = { \sqrt { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 2 0 0 } } = \mathbf { 0 . 5 6 \ \mathrm { m / s } }
$$
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 2 0 0 ^ { 3 } } { 1 . 7 5 \times 1 0 ^ { - 5 } \times 2 . 4 7 \times 1 0 ^ { - 5 } } } = 2 . 8 6 \times 1 0 ^ { 7 } \qquad \delta \sim { \frac { 0 . 2 0 0 } { \left( 2 . 8 6 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } } } = \mathbf { 1 . 5 \ \mathrm { m m } }
$$
$$
h \sim { \frac { k } { \delta } } = { \frac { 0 . 0 2 7 5 } { 1 . 5 \times 1 0 ^ { - 3 } } } = 1 8 \ \mathrm { W / m ^ { 2 } K } \qquad ( \text{correlation: } 0 . 5 4 \, \mathrm { R a } ^ { 1 / 4 } \text{ for a hot plate facing up} \Rightarrow h = 8 . 5 \ \mathrm { W / m ^ { 2 } K } )
$$
**The scaling gives the right order of magnitude and a factor of two on the coefficient — which is what scalings do, and why they are worth doing before the correlation.** **Two things to keep.** **The plume is half a metre per second: faster than most "still air" assumptions and slower than any draught, so a hot surface in a real room is cooled by whatever the room's air is doing, not by its own buoyancy.** **And the layer is $1 . 5 \ \mathrm { m m }$ thick: which is why a thermocouple junction $2 \ \mathrm { m m }$ across, sitting in that layer, reads neither the surface nor the room, and why air-temperature measurement in a still room is an art.**
:::
:::

::: exercise Derivation: Grashof and the laminar laws by scaling {#der-gr level=3}
::: solution
**Two balances in the boundary layer, exactly as for forced flow.** Momentum: unsteady-free buoyant flow, so inertia $\rho u ^ { 2 } / L$ is balanced by viscosity $\mu u / \delta ^ { 2 }$ and by the buoyancy $\rho \beta g \Delta T$ :
$$
\rho u ^ { 2 } / L \sim \mu u / \delta ^ { 2 } \qquad \rho u ^ { 2 } / L \sim \rho \beta g \Delta T \qquad \delta \sim L / \mathrm { R a } ^ { 1 / 4 }
$$
**From the second, $u \sim ( g \beta \Delta T L ) ^ { 1 / 2 }$ — the plume velocity. Substituting both into the first:**
$$
\rho \left( g \beta \Delta T L \right) / L = { \frac { \mu } { \delta ^ { 2 } } } \left( g \beta \Delta T L \right) ^ { 1 / 2 } \quad \Longrightarrow \quad \delta ^ { 2 } = { \frac { \mu \left( g \beta \Delta T L \right) ^ { 1 / 2 } L } { \rho g \beta \Delta T } } = { \frac { \nu L ^ { 3 / 2 } } { \left( g \beta \Delta T L \right) ^ { 1 / 2 } } } \quad \Longrightarrow \quad \left| \quad \delta = { \frac { L } { \left( g \beta \Delta T L ^ { 3 } / \nu ^ { 2 } \right) ^ { 1 / 4 } } } = { \frac { L } { \mathrm { G r } _ { L } ^ { 1 / 4 } } } \right|
$$
**That is the velocity-layer thickness; the thermal layer differs by the Prandtl number, $\delta _ { t } = \delta \, \mathrm { P r } ^ { - \varphi }$ with $\varphi$ between $1 / 2$ and $1 / 4$ depending on how the two diffusions trade, and the group that survives in the answer is $\mathrm { G r } \, \mathrm { P r } = \mathrm { R a }$ :**
$$
h \sim { \frac { k } { \delta _ { t } } } \sim { \frac { k } { L } } \, \mathrm { P r } ^ { \varphi } \, \mathrm { G r } _ { L } ^ { 1 / 4 } \sim { \frac { k } { L } } \left( { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \right) ^ { 1 / 4 } \qquad \Longrightarrow \qquad \boxed { \; \mathrm { N u } _ { L } = C \, \mathrm { R a } _ { L } ^ { 1 / 4 } \; } \qquad \left[ \; h \propto \Delta T ^ { 1 / 4 } L ^ { - 1 / 4 } \; \right]
$$
**Three consequences, all of them verified by experiment to a few per cent.** **(i) $h$ depends on length as $L ^ { - 1 / 4 }$ , which is so weak that natural-convection coefficients are quoted as if they were constants — and, unlike forced convection, a natural-convection model at one-fifth scale is nearly the same problem as the prototype, provided $\Delta T$ is scaled as $L ^ { - 3 }$ to keep $\mathrm { R a }$ equal.** **(ii) The heat flux goes as $\Delta T ^ { 5 / 4 }$ , so a passive device's "thermal resistance" $R _ { \theta } = \Delta T / Q \propto \Delta T ^ { - 1 / 4 }$ is a curve, and quoting one number for it is a convention rather than a property.** **(iii) There is no $U$ in the answer, because there is no $U$ : the flow rate adjusts until viscous drag balances buoyancy, and that is why the fan laws do not apply and why a natural-convection heat sink cannot be improved by giving the fluid more room to move unless the room is what was choking it.**
:::
:::

## The vertical plate: the one clean answer

::: definition Correlations for an isothermal vertical plate {#def-vplate}
For an isothermal vertical plate of height $L$ , with properties at the film temperature $T _ { f } = ( T _ { s } + T _ { \infty } ) / 2$ and $\beta = 1 / T _ { f }$ for a gas:
$$
\overline { { \mathrm { N u } } } _ { L } = { \begin{cases} 0 . 5 9 \, \mathrm { R a } _ { L } ^ { 1 / 4 } & 1 0 ^ { 4 } \lesssim \mathrm { R a } _ { L } \lesssim 1 0 ^ { 9 } \quad \text{laminar} \\ 0 . 1 0 \, \mathrm { R a } _ { L } ^ { 1 / 3 } & 1 0 ^ { 9 } \lesssim \mathrm { R a } _ { L } \lesssim 1 0 ^ { 1 3 } \quad \text{turbulent} \end{cases} } \qquad \text{(McAdams, } \pm 1 5 \ \%\text{)}
$$
**and the single expression that spans both regimes and is good to $\pm 1 0 \ \ \%$ throughout,**
$$
\boxed { \; \overline { { \mathrm { N u } } } _ { L } = \left\{ 0 . 8 2 5 + { \frac { 0 . 3 8 7 \, \mathrm { R a } _ { L } ^ { 1 / 6 } } { \left[ 1 + \left( 0 . 4 9 2 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 8 / 2 7 } } } \right\} ^ { 2 } \; } \qquad \text{(Churchill and Chu, all } \mathrm { R a } , \text{ any } \mathrm { P r } )
$$
**For a plate at uniform heat flux instead of uniform temperature, the temperature difference is unknown and the group is rebuilt without it. Define $\mathrm { R a } _ { L } ^ { * } = g \beta q ^ { \prime \prime } L ^ { 4 } / ( k \nu \alpha )$ ; then**
$$
\overline { { \mathrm { N u } } } _ { L } = { \frac { q ^ { \prime \prime } L } { k \left( T _ { s } - T _ { \infty } \right) _ { L } } } = \left\{ 1 + \left( { \frac { 0 . 4 8 6 } { \mathrm { P r } ^ { 8 / 2 7 } \left[ 1 + \left( 0 . 4 9 2 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 8 / 2 7 } } } \, \mathrm { R a } _ { L } ^ { * \, 1 / 4 } \right) ^ { 7 / 5 } \right\} ^ { 5 / 7 } \qquad ( \mathrm { R a } _ { L } ^ { * } \lesssim 1 0 ^ { 1 1 } )
$$
**Four things the engineer needs from this block.** **(i) The transition at $\mathrm { R a } _ { L } = 1 0 ^ { 9 }$ is not a property of the plate but of the temperature difference: for a $1 \ \mathrm { m }$ vertical wall in air, transition happens at $\Delta T \approx 1 1 \ \mathrm { K }$ , and for a $1 0 0 \ \mathrm { m m }$ board at $\Delta T \approx 1 8 0 \ \mathrm { K }$ .** **Everyday objects are laminar; buildings, tanks and radiators are turbulent.** **(ii) The two laws cross at $\mathrm { R a } = ( 0 . 5 9 / 0 . 1 0 ) ^ { 4 / 5 } \times 1 0 ^ { ? } \approx 1 0 ^ { 9 }$ by construction, and the true behaviour through transition is unsteady, cellular and about $2 0 \ \ \%$ uncertain — do not design a part to work there.** **(iii) The isothermal and isoflux answers differ by a few per cent in $\overline { { \mathrm { N u } } }$ but by more in the local value: with uniform flux the surface temperature rises as $x ^ { 1 / 5 }$ in the laminar region, so the top of a heated channel is the hot place, exactly as in forced flow but far less strongly.** **(iv) The plate must be taller than it is wide, or at least not much wider: on a wide plate the flow three-dimensionalises at the sides and the two-dimensional correlation over-predicts the middle.**
:::

::: example A board cooled by the room {#ex-pcb-nat}
A $1 5 0 \times 1 5 0 \ \mathrm { m m }$ vertical circuit board dissipates $6 \ \mathrm { W }$ from one face in a room at $2 5 \ \ {} ^ { \circ } \mathrm { C }$. Estimate the surface temperature, and compare the answer with what a forced-air designer would have assumed.
::: solution
**The coefficient depends on the temperature difference, which is what we are solving for, so iterate — or use the heat-flux form directly.** $q ^ { \prime \prime } = 6 / 0 . 0 2 2 5 = 2 6 7 \ \mathrm { W / m ^ { 2 } }$ . **Guess $T _ { s } = 7 5 \ \ {} ^ { \circ } \mathrm { C }$ , film $5 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 8 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 5 5 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 8 1 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 6$ , $\beta = 1 / 3 2 3 \ \mathrm { K ^ { - 1 } }$ .**
$$
\mathrm { R a } _ { L } ^ { * } = { \frac { 9 . 8 1 \times \left( 1 / 3 2 3 \right) \times 2 6 7 \times 0 . 1 5 0 ^ { 4 } } { 0 . 0 2 8 1 \times 1 . 8 0 \times 1 0 ^ { - 5 } \times 2 . 5 5 \times 1 0 ^ { - 5 } } } = 1 . 0 5 \times 1 0 ^ { 7 }
$$
$$
\overline { { \mathrm { N u } } } = \left\{ 1 + \left( { \frac { 0 . 4 8 6 } { 0 . 7 0 6 ^ { 0 . 2 9 6 } \times 1 . 1 9 4 } } \times \left( 1 . 0 5 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } \right) ^ { 1 . 4 } \right\} ^ { 0 . 7 1 4 } = \left\{ 1 + \left( 0 . 5 7 8 \times 5 6 . 9 \right) ^ { 1 . 4 } \right\} ^ { 0 . 7 1 4 } = 3 3 . 6
$$
$$
T _ { s } - T _ { \infty } = { \frac { q ^ { \prime \prime } L } { \mathrm { N u } \, k } } = { \frac { 2 6 7 \times 0 . 1 5 0 } { 3 3 . 6 \times 0 . 0 2 8 1 } } = \mathbf { 4 2 \ \mathrm { K } } \qquad ( \text{guess was } 5 0 \text{; iterate once more for } \mathbf { 4 0 \ \mathrm { K } } )
$$
**The board runs at $6 5 \ \ {} ^ { \circ } \mathrm { C }$ , and the effective coefficient is $2 6 7 / 4 0 = 6 . 7 \ \mathrm { W / m ^ { 2 } K }$ .** **Now the comparison.** **A forced-air designer who had been given "natural convection in air, about $1 0 \ \mathrm { W / m ^ { 2 } K }$" from a table of typical values would have predicted a $2 7 \ \mathrm { K }$ rise and a $5 2 \ \ {} ^ { \circ } \mathrm { C }$ board — a $1 3 \ \mathrm { K }$ error, and the wrong side of safe.** **A designer who used the laminar vertical-plate correlation with the isothermal assumption gets $h = 6 . 0$ and $T _ { s } - T _ { \infty } = 4 4 \ \mathrm { K }$ , within $1 0 \ \ \%$ : the two simplifications pull in opposite directions and nearly cancel, which is why this subject's rules of thumb work better than they have any right to.** **Radiation, with a solder-mask emissivity of $0 . 8 5$ , would carry $q _ { r } ^ { \prime \prime } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 8 ^ { 4 } - 2 9 8 ^ { 4 } ) = 2 1 9 \ \mathrm { W / m ^ { 2 } }$ — a third of the heat — and including it drops the required convection to $4 8 \ \mathrm { W / m ^ { 2 } }$ and the temperature rise to about $3 0 \ \mathrm { K }$ . Ignoring radiation is conservative here; ignoring it on a polished metal enclosure would be the opposite.**
:::
:::

::: exercise Derivation: why the temperature rise is the design variable {#der-54 level=2}
::: solution
**Take the laminar law and write it as a heat flux.**
$$
q ^ { \prime \prime } = h \Delta T = C \, \Delta T ^ { 1 / 4 } \Delta T = C \Delta T ^ { 5 / 4 } \qquad \Longrightarrow \qquad { \frac { \mathrm { d } q ^ { \prime \prime } } { \mathrm { d } \Delta T } } = { \frac { 5 } { 4 } } \, { \frac { q ^ { \prime \prime } } { \Delta T } }
$$
**Three consequences that are design decisions, not algebra.** **(i) Sensitivity.** **A $1 0 \ \ \%$ error in $h$ — easy to make from orientation alone — gives a $1 0 \ \ \%$ error in $\Delta T$ , because $\Delta T \propto h ^ { - 4 / 5 }$ gives $0 . 9 ^ { - 0 . 8 } = 1 . 0 8 7$ : an $8 . 7 \ \ \%$ error in the temperature rise.** **In the turbulent regime $\Delta T \propto h ^ { - 3 / 4 }$ and the same correlation error costs $7 . 5 \ \ \%$ : natural convection is a forgiving subject, and the forgiving exponent is why its rules of thumb survive.** **(ii) Area does not work the way it does in forced flow.** **Doubling the area doubles $Q$ at the same $\Delta T$ , but if instead you double the height of a vertical plate you gain only $2 ^ { 3 / 4 } = 1 . 6 8$ , because $h \propto L ^ { - 1 / 4 }$ and the area gains $2 \times$ while the coefficient loses $2 ^ { - 1 / 4 }$ .** **Widening a plate costs nothing in $h$ : if you must add area to a passive sink, add width, not height — the opposite of the forced-flow instinct, where height is what the fan can afford.** **(iii) The "resistance" is a curve.** **$R _ { \theta } = \Delta T / Q = 1 / ( C A \Delta T ^ { 1 / 4 } )$ , so a datasheet that quotes $R _ { \theta } = 2 . 5 \ \mathrm { K / W }$ for a passive enclosure has quoted it at one particular temperature rise, and the same enclosure at half the rise has $2 . 5 \times 2 ^ { 1 / 4 } = 2 . 9 7 \ \mathrm { K / W }$ .** **The right way to use catalogue data for passive parts is a log-log plot of $Q$ against $\Delta T$ , which is a straight line of slope $5 / 4$ if the part is behaving, and a kinked line if the flow has transitioned or choked.**
:::
:::

## Orientation: five answers from one plate

::: definition Horizontal plates, inclined plates and cylinders {#def-orient}
**The rule behind the table is stability.** Where a heated surface puts light fluid under heavy, the layer is unstable and plumes leave it; where it puts light fluid over heavy, the layer is stable and everything diffuses.
$$
\overline { { \mathrm { N u } } } _ { L _ { c } } = C \, \mathrm { R a } _ { L _ { c } } ^ { n } \ , \qquad L _ { c } = { \frac { A _ { s } } { P _ { s } } } \quad \text{(horizontal plates)}, \qquad \mathrm { R a } _ { L _ { c } } = { \frac { g \beta \Delta T L _ { c } ^ { 3 } } { \nu \alpha } }
$$
$$
\begin{array} { l c c l }
\text{Surface} & C & n & \text{Range of } \mathrm { R a } _ { L _ { c } } \\
\text{Hot plate facing up, or cold plate facing down} & 0 . 5 4 & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 7 } \\
& 0 . 1 5 & 1 / 3 & 1 0 ^ { 7 } - 1 0 ^ { 1 1 } \\
\text{Hot plate facing down, or cold plate facing up} & 0 . 2 7 & 1 / 4 & 1 0 ^ { 5 } - 1 0 ^ { 1 0 } \\
\text{Inclined plate, heated facing up, angle } \gamma \text{ from horizontal} & 0 . 5 9 \cos \gamma \text{ in } \mathrm { R a } & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 9 } , \ \gamma < 6 0 ^ { \circ } \\
\text{Vertical plate} & 0 . 5 9 & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 9 }
\end{array}
$$
**For a horizontal cylinder the same Churchill–Chu structure works with the diameter as the length and $0 . 6 0$ in place of $0 . 8 2 5$ :**
$$
\overline { { \mathrm { N u } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \, \mathrm { R a } _ { D } ^ { 1 / 6 } } { \left[ 1 + \left( 0 . 4 9 2 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 8 / 2 7 } } } \right\} ^ { 2 } \qquad \left( \mathrm { R a } _ { D } \mathrm { P r } > 1 0 ^ { - 6 } , \ \pm 1 5 \ \%\right)
$$
**and for a sphere, $\overline { { \mathrm { N u } } } _ { D } = 2 + 0 . 5 8 9 \, \mathrm { R a } _ { D } ^ { 1 / 4 } / [ 1 + ( 0 . 4 6 9 / \mathrm { P r } ) ^ { 9 / 1 6 } ] ^ { 4 / 9 }$ .** **The $2$ is the conduction limit of [[heat-transfer/external-convection#der-nu2|the sphere derivation]] and it dominates small hot objects in gas: a $3 \ \mathrm { m m }$ bead in air has $\mathrm { N u } \approx 3 . 4$ , of which two thirds is pure conduction.**
**Three practical readings.** **(i) A hot surface facing down is a nearly insulated surface:** $0 . 2 7$ against $0 . 5 4$ is a factor of two, and at low $\Delta T$ the stable layer is even better than the correlation says. **This is why a domestic hot-water cylinder's coil is at the bottom and its element at the top, and why the "hot plate facing down" case is the reason a solar thermal collector loses most of its heat from the top surface and not the bottom.** **(ii) The inclination correction is $\cos \gamma$ inside $\mathrm { R a }$ , not outside:** $h \propto ( \cos \gamma ) ^ { 1 / 4 }$ , so a $4 5 ^ { \circ }$ roof loses only $1 6 \ \ \%$ of a vertical wall's cooling and a $6 0 ^ { \circ }$ one loses $2 7 \ \ \%$ . **Beyond $6 0 ^ { \circ }$ from the vertical the correlation is replaced by the horizontal-plate rows, and the change is discontinuous because the flow pattern changes.** **(iii) For a cylinder, use the diameter only if the boundary layer is thin compared with it** — that is, $\mathrm { R a } _ { D } \gtrsim 1 0 ^ { 4 }$ . **Below that the cylinder is behaving like a line source in an infinite medium and the "diameter" length is meaningless; this is why a hot wire in still air cools as $\sqrt { \ln ( \mathrm { R a } ) }$ and not as any power law.**
:::

::: example The same plate, four ways {#ex-orient}
A $5 0 0 \times 5 0 0 \ \mathrm { m m }$ horizontal plate at $8 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room. Find the heat loss from the upper face when the hot side faces up and when it faces down, and the ratio.
::: solution
**Characteristic length** $L _ { c } = A _ { s } / P _ { s } = 0 . 2 5 / 2 . 0 = 0 . 1 2 5 \ \mathrm { m }$ . **Film temperature** $5 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 8 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 5 5 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 8 1$ , $\beta = 1 / 3 2 3$ .
$$
\mathrm { R a } _ { L _ { c } } = { \frac { 9 . 8 1 \times 3 1 . 0 \times 1 0 ^ { - 5 } \times 6 0 \times 0 . 1 2 5 ^ { 3 } } { 1 . 8 0 \times 1 0 ^ { - 5 } \times 2 . 5 5 \times 1 0 ^ { - 5 } } } = 7 . 8 \times 1 0 ^ { 6 }
$$
**Facing up** ($1 0 ^ { 4 }$ to $1 0 ^ { 7 }$ : the $0 . 5 4 \, \mathrm { R a } ^ { 1 / 4 }$ law, just inside its range):
$$
\overline { { \mathrm { N u } } } = 0 . 5 4 \times \left( 7 . 8 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } = 2 8 . 5 \qquad h = { \frac { 2 8 . 5 \times 0 . 0 2 8 1 } { 0 . 1 2 5 } } = 6 . 4 \ \mathrm { W / m ^ { 2 } K } \qquad q = 6 . 4 \times 0 . 2 5 \times 6 0 = \mathbf { 9 6 \ \mathrm { W } }
$$
**Facing down:**
$$
\overline { { \mathrm { N u } } } = 0 . 2 7 \times \left( 7 . 8 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } = 1 4 . 3 \qquad h = 3 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad q = \mathbf { 4 8 \ \mathrm { W } }
$$
**A factor of exactly two, from turning the plate over.** **Add radiation at $\varepsilon = 0 . 8 5$ and both cases gain $q _ { r } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 5 3 ^ { 4 } - 2 9 3 ^ { 4 } ) \times 0 . 2 5 = 5 7 \ \mathrm { W }$ , so the totals are $1 5 3 \ \mathrm { W }$ up and $1 0 5 \ \mathrm { W }$ down — a ratio of $1 . 4 6$ rather than $2 . 0$ .** **That is the general lesson of this lesson in miniature: the convection ratio between two orientations is dramatic, the ratio of the total heat is much less so, and the difference between the two numbers is the difference between a design decision and a curiosity.**
:::
:::

::: example A pipe in a room, half by each mechanism {#ex-pipe-nat}
A $5 0 \ \mathrm { m m }$ OD horizontal pipe at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ in a room at $2 0 \ \ {} ^ { \circ } \mathrm { C }$, surface emissivity $0 . 9$ . Find the heat loss per metre and the share carried by radiation.
::: solution
**Film temperature** $4 0 \ \ {} ^ { \circ } \mathrm { C } = 3 1 3 \ \mathrm { K }$ : $\nu = 1 . 7 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 4 0 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 7$ , $\beta = 1 / 3 1 3$ .
$$
\mathrm { R a } _ { D } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 0 5 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 4 0 \times 1 0 ^ { - 5 } } } = 3 . 8 \times 1 0 ^ { 5 }
$$
$$
\overline { { \mathrm { N u } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times \left( 3 . 8 \times 1 0 ^ { 5 } \right) ^ { 1 / 6 } } { 1 . 1 9 4 } } \right\} ^ { 2 } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times 8 . 5 0 } { 1 . 1 9 4 } } \right\} ^ { 2 } = 1 1 . 3
$$
$$
h _ { c } = { \frac { 1 1 . 3 \times 0 . 0 2 7 2 } { 0 . 0 5 0 } } = 6 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 + 2 9 3 ) \left( 3 3 3 ^ { 2 } + 2 9 3 ^ { 2 } \right) = 6 . 3 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime } = \left( 6 . 2 + 6 . 3 \right) \pi \times 0 . 0 5 0 \times 4 0 = \mathbf { 7 8 \ \mathrm { W / m } } \qquad \text{radiation } \mathbf { 5 1 \ \ \% }
$$
**Half the heat, by a mechanism that the lagging contractor will not mention.** **Two checks.** **The pipe's combined coefficient is $1 2 . 5 \ \mathrm { W / m ^ { 2 } K }$ , against the $1 2$ that the "still air plus radiation" rule of thumb used in building calculation gives for vertical surfaces at $1 0 \ \mathrm { K }$ — the rule of thumb is not wrong, it is the sum of two things that happen to be equal at room temperature.** **And if the same pipe were polished aluminium with $\varepsilon = 0 . 1$ , $h _ { r }$ would fall to $0 . 7$ and the total to $5 0 \ \mathrm { W / m }$ : a $36 \ \ \%$ reduction for the price of a wrap of foil, which is why pipe lagging is shiny on the inside.**
:::
:::

## Enclosures: convection with nowhere to go

::: definition The enclosure Rayleigh number and the Nusselt number across a gap {#def-enclosure}
Between two parallel isothermal surfaces separated by a gap $S$ , the length is the gap and not the height, and the Nusselt number is defined across the gap:
$$
\mathrm { R a } _ { S } = { \frac { g \beta \Delta T _ { 0 } S ^ { 3 } } { \nu \alpha } } \qquad \mathrm { N u } _ { S } = { \frac { h _ { \text{effective} } S } { k } } \qquad q ^ { \prime \prime } = \mathrm { N u } _ { S } \, { \frac { k } { S } } \, \Delta T _ { 0 }
$$
**$\mathrm { R a } _ { S } \ll 1$ means the gap is too thin to circulate: the Nusselt number falls to $1$ and the layer is a pure conduction resistance $S / k$ — which is exactly what a thermos flask and a double-glazed unit are designed to be.** **For a vertical enclosure of height $L$ and gap $S$ (aspect ratio $L / S \gtrsim 4$ ), the widely used correlation is**
$$
\mathrm { N u } _ { S } = 1 + 1 . 4 4 \left[ 1 - { \frac { 1 7 0 8 } { \mathrm { R a } _ { S } } } \right] ^ { + } + \left[ \left( { \frac { \mathrm { R a } _ { S } } { 5 8 3 0 } } \right) ^ { 1 / 3 } - 1 \right] ^ { + } \qquad \left( \mathrm { R a } _ { S } \lesssim 1 0 ^ { 5 } , \ { \frac { L } { S } } \gtrsim 4 , \ \pm 1 0 \ \%\right)
$$
**where $[ \, ] ^ { + }$ means "zero if the bracket is negative".** **The three terms are the three regimes: pure conduction, the onset of a circulating cell, and the boundary-layer regime in which the two walls each grow their own layer and the core is neutral.** **For an enclosure heated from below — the Rayleigh–Bénard problem — the same $\mathrm { R a } _ { S }$ decides everything, but the answer is a pattern: motion begins at $\mathrm { R a } _ { S } = 1 7 0 8$ as hexagonal cells of side $2 S$ , and the heat transfer rises steeply from there.**
**Four facts that decide most enclosure designs.** **(i) The gap has an optimum.** **Widen a vertical gap and the convection term grows while the conduction path lengthens; the heat flux per unit area falls as $1 / S$ at large gaps and is flat below about $1 0 \ \mathrm { m m }$ in air.** **This is why double glazing uses $1 2$ to $1 6 \ \mathrm { m m }$ and why $3 0 \ \mathrm { m m }$ is worse, and why the argon fill of a modern unit buys $1 5 \ \ \%$ by lowering $k$ and not by changing the flow.** **(ii) Tilt a gap and it starts to behave like a vertical one:** for a gap inclined $\gamma$ from the horizontal, $\mathrm { R a }$ is taken with $g \cos \gamma$ , and a roof-space gap at $2 0 ^ { \circ }$ is already $9 4 \ \ \%$ of a vertical gap in its convection. **(iii) Sealed electronics boxes lose heat through their walls by exactly this mechanism,** and the "natural convection" term in their thermal budget is an enclosure correlation, not a plate correlation, because the inside wall sees the opposite wall. **(iv) Perforate the wall and the whole analysis changes:** a vented enclosure is a chimney, its flow is set by $\Delta \rho g H$ between inlet and outlet, and the heat it carries is ${ \dot { m } } c _ { p } \Delta T$ with ${ \dot { m } }$ from the orifice equation — see [[#ex-chimney]].
:::

::: widget plot
title: Nusselt number across a vertical air gap against the gap Rayleigh number
f: 1+1.44*max(0,1-1708/pow(10,x))+max(0,pow(pow(10,x)/5830,1/3)-1)
x: 0, 5
y: 0, 12
labels: Nu_S for a vertical enclosure
caption: The vertical-enclosure correlation against $\log _ { 1 0 } \mathrm { R a } _ { S }$ . **The flat start at $\mathrm { N u } = 1$ is pure conduction — the gap is thinner than the boundary layers the two walls would like to grow, so nothing circulates.** **Motion begins near $\mathrm { R a } _ { S } = 1 7 0 0$ and by $1 0 ^ { 5 }$ the Nusselt number is about $5$ : the gap is carrying five times what conduction alone would.** **Read the design consequence for a $1 2 \ \mathrm { m m }$ air gap at $1 0 \ \mathrm { K }$ : $\mathrm { R a } _ { S } \approx 1 9 0 0$ , $\mathrm { N u } = 1 . 1 7$ , so the gap carries only $1 7 \ \ \%$ more than pure conduction and its conductance is $2 . 5 \ \mathrm { W / m ^ { 2 } K }$ — which is the number behind the "$U$-value of a double-glazed unit is about $2 . 8 \ \mathrm { W / m ^ { 2 } K }$ including both surface films".**
:::

::: example A double-glazed unit {#ex-window}
A vertical double-glazed window has a $1 2 \ \mathrm { m m }$ air gap, $1 . 0 \ \mathrm { m }$ tall, with the inner pane at $1 5 \ \ {} ^ { \circ } \mathrm { C }$ and the outer at $5 \ \ {} ^ { \circ } \mathrm { C }$. Find the heat flux across the gap and compare it with the same gap filled with argon.
::: solution
**Film temperature** $1 0 \ \ {} ^ { \circ } \mathrm { C } = 2 8 3 \ \mathrm { K }$ : air $\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 0 7 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 5 1 \ \mathrm { W / m \, K }$ , $\beta = 1 / 2 8 3$ .
$$
\mathrm { R a } _ { S } = { \frac { 9 . 8 1 \times 3 . 5 3 \times 1 0 ^ { - 3 } \times 1 0 \times 0 . 0 1 2 ^ { 3 } } { 1 . 4 6 \times 1 0 ^ { - 5 } \times 2 . 0 7 \times 1 0 ^ { - 5 } } } = 1 9 4 0
$$
$$
\mathrm { N u } _ { S } = 1 + 1 . 4 4 \left( 1 - { \frac { 1 7 0 8 } { 1 9 4 0 } } \right) + 0 = 1 . 1 7 \qquad h _ { \text{gap} } = 1 . 1 7 \times { \frac { 0 . 0 2 5 1 } { 0 . 0 1 2 } } = \mathbf { 2 . 4 5 \ \mathrm { W / m ^ { 2 } K } } \qquad q ^ { \prime \prime } = 2 4 . 5 \ \mathrm { W / m ^ { 2 } }
$$
**Conduction alone would give $k / S = 2 . 0 9$ , so the circulation adds only $1 7 \ \ \%$ — the gap is nearly optimal.** **Argon at the same temperature has $k = 0 . 0 1 6 8$ , $\nu = 1 . 0 4 \times 1 0 ^ { - 5 }$ , $\alpha = 1 . 0 1 \times 1 0 ^ { - 5 }$ , so $\mathrm { R a } _ { S } = 1 9 4 0 \times ( 2 . 0 7 / 1 . 0 5 ) \approx 3 8 0 0$ and $\mathrm { N u } _ { S } = 1 + 1 . 4 4 ( 1 - 1 7 0 8 / 3 8 0 0 ) + ( 3 8 0 0 / 5 8 3 0 ) ^ { 1 / 3 } - 1 = 1 . 7 9 + 0 . 8 6 = 1 . 7 9$ ...** **carefully: the third bracket is negative because $3 8 0 0 < 5 8 3 0$ , so $\mathrm { N u } _ { S } = 1 + 1 . 4 4 \times 0 . 5 5 1 = 1 . 7 9$ and**
$$
h _ { \text{argon} } = 1 . 7 9 \times { \frac { 0 . 0 1 6 8 } { 0 . 0 1 2 } } = 2 . 5 1 \ \mathrm { W / m ^ { 2 } K } \qquad \text{versus } 2 . 4 5 \text{ for air: only } 2 \ \ \% \text{ better at this gap}
$$
**Which is a real result and a useful shock: at $1 2 \ \mathrm { m m }$ the argon fill is worth almost nothing, because the gap is already conduction-dominated and argon's lower conductivity is offset by its higher $\mathrm { R a }$ , which restores the circulation.** **Argon pays where the gap is wide enough to convect — $1 6$ to $2 0 \ \mathrm { m m }$ — and that is exactly where modern units put it.** **The full window's $U$-value adds the two surface resistances, each about $1 / ( 1 2 \ \mathrm { W / m ^ { 2 } K } )$ for combined convection and radiation, and the glass itself, which is worth nothing: $1 / U = 1 / 1 2 + 1 / 2 . 4 5 + 1 / 1 2 = 0 . 5 7 7$ , $U = 1 . 7 3 \ \mathrm { W / m ^ { 2 } K }$ , against $5 . 7$ for a single pane.**
:::
:::

## Channels and fins: the spacing question

::: definition An array of parallel plates {#def-array}
A vertical heat sink is an array of $n$ isothermal plates of height $L$ , spacing $S$ and width $W$ . **Two asymptotes and one interpolation describe it well enough to design with.**
$$
S \text{ large: } h \to h _ { \infty } \text{ (isolated vertical plate)} \qquad S \text{ small: } \mathrm { Nu } _ { S } \to 1 \ , \ h \to { \frac { k } { S } } \ \text{(pure conduction across the gap)}
$$
**Between them, the Elenbaas correlation for isothermal plates,**
$$
\boxed { \; \mathrm { Nu } _ { S } = 1 - \exp \left( - 1 . 4 8 1 \, \mathrm { R a } _ { S } ^ { 1 / 2 } \right ) + 0 . 0 1 7 1 \, \mathrm { R a } _ { S } ^ { 1 / 2 } \; } \qquad \mathrm { R a } _ { S } = { \frac { g \beta \Delta T _ { i } S ^ { 3 } } { \nu \alpha } } \qquad ( \mathrm { R a } _ { S } \lesssim 1 0 ^ { 3 } )
$$
**where $\Delta T _ { i }$ is the plate-to-ambient difference.** **Note the length: it is the gap $S$ , not the height $L$ , because it is the gap that decides whether the air can circulate.** **The correlation is valid only while the plates interact — roughly $\mathrm { R a } _ { S } \lesssim 1 0 ^ { 3 }$ , which for air at $3 0 \ \mathrm { K }$ means gaps below about $7 \ \mathrm { m m }$ ; beyond that use the isolated-plate value.**
**The design rule, due in its modern form to Bar-Cohen and Rohsenow's 1984 analysis of volume-minimised sinks, is the intersection of the two asymptotes:**
$$
\boxed { \; S _ { \text{opt} } \approx { \frac { 2 k _ { f } } { h _ { \infty } } } \; } \qquad h ( S _ { \text{opt} } ) \approx 0 . 8 \, h _ { \infty }
$$
**For air this is $8$ to $1 2 \ \mathrm { m m }$ over the whole range of sizes and temperature differences that passive cooling deals with, because $k / h _ { \infty }$ barely changes: $h _ { \infty }$ rises as $\Delta T ^ { 1 / 4 }$ and falls as $L ^ { - 1 / 4 }$ , and the two effects cancel over practical ranges.** **This is why every catalogue of passive extrusions has fin gaps of $6$ to $1 2 \ \mathrm { m m }$ and why the same catalogue offers $2 \ \mathrm { m m }$ gaps for forced flow.**
**Three honest caveats, because the rule is more robust than its derivation.** **(i) The correlations alone do not contain an optimum.** **Feed the Elenbaas correlation a shrinking gap at fixed plate temperature and the coefficient rises for ever, because the correlation assumes fresh ambient air reaches the bottom of every channel; the real limit is that at a few millimetres the boundary layers have merged, the channel has no permeability, and the flow simply does not enter.** **The optimum exists in the physics and not in the correlation, which is why it is quoted as a rule of thumb with a factor-of-two tolerance rather than as a result.** **(ii) The optimum is very flat.** **Going from $S _ { \text{opt } }$ to $1 . 5 \, S _ { \text{opt } }$ costs about $8 \ \ \%$ of the sink's conductance; going to $0 . 5 \, S _ { \text{opt } }$ costs about $1 5 \ \ \%$ if the flow can still enter and everything if it cannot.** **You may therefore choose the spacing for the reason you will actually choose it for — the extrusion die you can buy — provided you stay inside $6$ to $1 4 \ \mathrm { m m }$ in air.** **(iii) Dust, moisture and cost are the real constraints.** **A $4 \ \mathrm { m m }$ gap in a room with a carpet is a felt filter, and a $1 2 \ \mathrm { m m }$ gap that costs $1 2 \ \ \%$ less heat is worth nothing if the part has to be blown out annually.**
:::

::: widget plot
title: Channel coefficient against fin spacing for a natural-convection heat sink
f: 27.2*(1-exp(-2.249*pow(x,1.5))+0.02597*pow(x,1.5))/x; 27.2/x; 6.25
x: 2, 14
y: 0, 16
labels: array coefficient h(S), Elenbaas; conduction limit k/S; isolated plate h_infinity
caption: Vertical fins $6 0 \ \mathrm { m m }$ tall at $3 0 \ \mathrm { K }$ above air. **The steep curve is the channel coefficient: at $2 \ \mathrm { m m }$ the gap is a conduction slit and $h$ is enormous, at $1 4 \ \mathrm { m m }$ the fins no longer see each other and $h$ has fallen to the isolated-plate value $6 . 2 5 \ \mathrm { W / m ^ { 2 } K }$ .** **The design point is not where $h$ is largest — it is where $h$ times the area you can pack into the envelope is largest, and that lands at $S = 2 k / h _ { \infty } = 8 . 7 \ \mathrm { m m }$ , marked by the crossing of the two dashed asymptotes.** **Read the flatness: between $7$ and $1 2 \ \mathrm { m m }$ the coefficient changes by $1 1 \ \ \%$ , which is less than the uncertainty of the correlation itself.**
:::

::: example Designing a passive sink {#ex-sink-nat}
A $1 5 \ \mathrm { W }$ device is to run at no more than $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $4 0 \ \ {} ^ { \circ } \mathrm { C }$ enclosure, on a $1 0 0 \times 1 0 0 \ \mathrm { m m }$ base with straight vertical fins $6 0 \ \mathrm { m m }$ tall. **Choose the fin spacing and count the fins.** Aluminium, $k = 1 8 0 \ \mathrm { W / m \, K }$ , fin thickness $1 . 5 \ \mathrm { m m }$ .
::: solution
**Start from the isolated fin.** With $L = 0 . 0 6 0 \ \mathrm { m }$ and a guessed $\Delta T = 3 0 \ \mathrm { K }$ (film $5 5 \ \ {} ^ { \circ } \mathrm { C }$ ): $\mathrm { R a } _ { L } = 5 . 0 \times 1 0 ^ { 5 }$ , $\overline { { \mathrm { N u } } } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } = 2 4 . 9$ , $h _ { \infty } = 7 . 1 \ \mathrm { W / m ^ { 2 } K }$ (Churchill–Chu gives $6 . 2 5$ ; use the lower).
$$
S _ { \text{opt} } = { \frac { 2 \times 0 . 0 2 7 2 } { 6 . 2 5 } } = 8 . 7 \ \mathrm { m m } \qquad n = { \frac { 1 0 0 } { 8 . 7 + 1 . 5 } } = 9 . 8 \ \Rightarrow \ \mathbf { 9 \ fins }
$$
$$
A = \underbrace { 9 \times 2 \times 0 . 0 6 0 \times 0 . 1 0 0 } _ { \text{fins} } + \underbrace { \left( 0 . 0 1 0 0 - 9 \times 0 . 0 0 1 5 \times 0 . 1 0 0 \right) } _ { \text{base} } = 0 . 1 0 8 + 0 . 0 0 8 7 = 0 . 1 1 7 \ \mathrm { m ^ { 2 } }
$$
**Coefficient at that spacing** (Elenbaas, $\mathrm { R a } _ { S } = 1 9 0 0$ , $\mathrm { N u } _ { S } = 1 . 6 7$ ): $h = 1 . 6 7 \times 0 . 0 2 7 2 / 0 . 0 0 8 7 = 5 . 2 \ \mathrm { W / m ^ { 2 } K }$ , which is $0 . 8 3 \, h _ { \infty }$ — **the rule's prediction, to the per cent.** **Fin efficiency:** $m = { \sqrt { 2 h / k t } } = { \sqrt { 2 \times 5 . 2 / ( 1 8 0 \times 0 . 0 0 1 5 ) } } = 6 . 2 \ \mathrm { m ^ { - 1 } }$ , $m L = 0 . 3 7$ , $\eta _ { f } = \operatorname { tanh } 0 . 3 7 / 0 . 3 7 = 0 . 9 5 5$ .
$$
Q = \eta _ { f } \, h A \, \Delta T = 0 . 9 5 5 \times 5 . 2 \times 0 . 1 1 7 \times \Delta T = 0 . 5 8 1 \, \Delta T \qquad \Longrightarrow \qquad \Delta T = { \frac { 1 5 } { 0 . 5 8 1 } } = \mathbf { 2 6 \ K }
$$
**Iterate once, because $h \propto \Delta T ^ { 1 / 4 }$ :** at $\Delta T = 2 6$ , $h = 5 . 2 \times ( 2 6 / 3 0 ) ^ { 1 / 4 } = 5 . 0$ and $\Delta T = 2 7 \ \mathrm { K }$ . **The device runs at $6 7 \ \ {} ^ { \circ } \mathrm { C }$ with $3 \ \mathrm { K }$ of margin, and the sink weighs $0 . 4 3 \ \mathrm { k g }$ .** **Two comparisons that put it in perspective.** **The bare base alone would need $\Delta T = 1 5 / ( 6 . 3 \times 0 . 0 1 ) = 2 4 0 \ \mathrm { K }$ , and would in fact settle near $1 8 5 \ \mathrm { K }$ once the coefficient's own rise with $\Delta T$ is counted — the fins are worth a factor of seven.** **And laying the same sink on its side, with the fins horizontal, gives $6 . 5$ against $7 . 1 \ \mathrm { W / m ^ { 2 } K }$ per unit area: only $9 \ \ \%$ worse, which is far less than the folklore about "always point fins up" suggests.** **The folklore is nonetheless correct, for a reason the per-area calculation misses: horizontal fins stack, and each fin sits in the plume of the fin below it, so the $9 \ \ \%$ becomes a $3 0$ to $5 0 \ \ \%$ penalty in a real multi-fin array.**
:::
:::

::: example A vented box is a chimney {#ex-chimney}
An electronics enclosure $3 0 0 \ \mathrm { m m }$ wide, $4 0 0 \ \mathrm { m m }$ tall and $2 0 0 \ \mathrm { m m }$ deep dissipates $4 0 \ \mathrm { W }$ inside. It is vented at top and bottom, and the inside is allowed to run $2 0 \ \mathrm { K }$ above the room. **How much vent area is needed, and how much of the heat does the chimney carry?**
::: solution
**The driving pressure is the weight difference between the inside column and the outside one, over the height between the two vents.**
$$
\Delta p = g H \left( \rho _ { o } - \rho _ { i } \right) = g H \rho _ { o } { \frac { \Delta T } { T _ { o } } } = 9 . 8 1 \times 0 . 4 0 0 \times 1 . 2 0 4 \times { \frac { 2 0 } { 2 9 3 } } = \mathbf { 0 . 3 2 \ \mathrm { P a } }
$$
**That is a third of a pascal: the pressure that a $3 \ \mathrm { m m }$ column of water would supply, and about a thousandth of what a fan gives.** **The velocity through the vents follows from the orifice equation with $C _ { d } = 0 . 7$ for a sharp-edged hole:**
$$
u = C _ { d } { \sqrt { \frac { 2 \Delta p } { \rho _ { i } } } } = 0 . 7 \times { \sqrt { \frac { 2 \times 0 . 3 2 } { 1 . 1 3 } } } = 0 . 5 1 \ \mathrm { m / s } \qquad { \dot { m } } = \rho _ { i } u A
$$
$$
Q = { \dot { m } } c _ { p } \Delta T = 1 . 1 3 \times 0 . 5 1 \times A \times 1 0 0 7 \times 2 0 = 1 1 \, 6 0 0 \ A \ \mathrm { W } \quad ( A \text{ in } \mathrm { m ^ { 2 } } )
$$
$$
A = 5 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 5 . 8 \ \mathrm { W } \qquad A = 1 0 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 1 2 \ \mathrm { W } \qquad A = 3 0 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 3 5 \ \mathrm { W }
$$
**Meanwhile the box's own walls, $0 . 3 5 \ \mathrm { m ^ { 2 } }$ of sheet at $h \approx 5 \ \mathrm { W / m ^ { 2 } K }$ and $2 0 \ \mathrm { K }$ , already carry $3 5 \ \mathrm { W }$ by surface convection and radiation.** **So the answer to the design question is: to double the cooling of a small sealed box by stack effect you need about $3 0 0 0 \ \mathrm { m m ^ { 2 } }$ of vent — $3 0 \ \mathrm { c m ^ { 2 } }$ , which is a grille, not a hole, and which costs the IP rating you were paying for.** **Three rules come out of this arithmetic.** **(i) Stack flow is proportional to $H$ and to $\Delta T$ , and the heat it carries goes as ${ \dot { m } } \Delta T \propto H ^ { 1 / 2 } \Delta T ^ { 3 / 2 }$ , so a tall thin box vents better than a squat fat one at the same volume.** **(ii) The vent must be split top-and-bottom; a single hole at the top carries nothing, because the flow has no loop.** **(iii) Anything that restricts the inlet — a filter, a gasket lip, a cable tray in front of it — enters as $C _ { d } ^ { 2 }$ in the heat, and halving $C _ { d }$ halves the cooling.**
:::
:::

## Mixed convection: when the fan is weak

::: definition The $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ criterion, and how to add the two answers {#def-mixed}
Forced and natural convection act on the same layer, either with it or against it. **The ratio that decides which dominates is buoyancy force over forced-flow inertia force:**
$$
\boxed { \; { \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { g \beta \Delta T L } { U ^ { 2 } } } \; } \qquad { \begin{array} { l l } { \ll 1 } & { \text{forced; drop the natural term} } \\ { \sim 1 } & { \text{mixed; compute both and combine} } \\ { \gg 1 } & { \text{natural; drop the forced term} } \end{array} }
$$
$$
\begin{array} { l c c c }
\text{Regime} & \mathrm { G r } / \mathrm { R e } ^ { 2 } & \text{Air, } 1 0 0 \ \mathrm { m m } \text{ plate, } \Delta T = 3 0 \ \mathrm { K } \left( \mathrm { G r } = 4 . 4 \times 1 0 ^ { 6 } \right) & \text{Combined law} \\
\text{Forced} & < 0 . 1 & U > 1 . 1 \ \mathrm { m / s } & \text{forced correlation alone} \\
\text{Mixed} & 0 . 1 - 1 0 & 0 . 1 1 < U < 1 . 1 \ \mathrm { m / s } & \text{combine} \\
\text{Natural} & > 1 0 & U < 0 . 1 1 \ \mathrm { m / s } & \text{natural correlation alone}
\end{array}
$$
**For aiding flow (surface facing up in a rising stream, hot vertical plate in an upward current) the standard combination is**
$$
\mathrm { N u } ^ { 3 } = \mathrm { N u } _ { \text{forced} } ^ { 3 } + \mathrm { N u } _ { \text{natural} } ^ { 3 } \qquad \text{(aiding)} \qquad \mathrm { N u } ^ { 3 } = \mathrm { N u } _ { \text{forced} } ^ { 3 } - \mathrm { Nu } _ { \text{natural} } ^ { 3 } \qquad \text{(opposing, if positive)}
$$
**Four things to take from this block.** **(i) The $U ^ { 2 }$ in the denominator is the whole story:** mixed convection is a low-speed phenomenon, and it occupies the band $0 . 0 5$ to $0 . 5 \ \mathrm { m / s }$ in air, which is exactly the speed range of a room, a cable tray, a rack's leakage flow and the wind over a parked vehicle. **(ii) Aiding flow is nearly always safe:** the combined coefficient is never below either part, and at $\mathrm { G r } / \mathrm { R e } ^ { 2 } = 1$ it is about $30 \ \ \%$ above the larger. **(iii) Opposing flow is not safe.** **A downward forced flow over a hot upward-facing surface can give a coefficient far below either calculation — the two layers cancel, the flow reverses inside the layer, and a laminar opposing layer is steady but nearly insulating.** **Worst of all, opposing mixed convection can be bistable: two solutions at the same flow rate, which is why "the temperature oscillates and we cannot reproduce it on test" is a mixed-convection symptom.** **(iv) The combination exponents are empirical and $\pm 2 5 \ \ \%$ ;** $n = 3$ for aiding and $n = 2$ to $3$ for opposing are the usual recommendations, and where the case matters the answer is a hot-wire anemometer and not a formula.
:::

::: example A board in a slow rack {#ex-mixed}
A $1 5 0 \ \mathrm { m m }$ vertical board at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ rack aisle has $0 . 3 \ \mathrm { m / s }$ of air rising past it. Find the coefficient by forced convection, by natural convection, and combined, and say which answer to use.
::: solution
**Film temperature** $4 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 7 0 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 7$ , $\beta = 1 / 3 1 3 \ \mathrm { K ^ { - 1 } }$ .
$$
\mathrm { R e } _ { L } = { \frac { 0 . 3 \times 0 . 1 5 0 } { 1 . 7 0 \times 1 0 ^ { - 5 } } } = 2 6 4 0 \qquad { \overline { { \mathrm { N u } } } } = 0 . 6 6 4 \times 2 6 4 0 ^ { 1 / 2 } \times 0 . 7 0 7 ^ { 1 / 3 } = 3 0 . 5 \qquad h _ { f } = 5 . 5 \ \mathrm { W / m ^ { 2 } K }
$$
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 1 5 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 3 9 \times 1 0 ^ { - 5 } } } = 1 . 0 4 \times 1 0 ^ { 7 } \qquad h _ { n } = { \frac { 0 . 5 9 \times 1 . 0 4 \times 1 0 ^ { 7 \, 1 / 4 } \times 0 . 0 2 7 2 } { 0 . 1 5 0 } } = 6 . 1 \ \mathrm { W / m ^ { 2 } K }
$$
$$
{ \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { 1 . 4 6 \times 1 0 ^ { 7 } } { 6 . 9 9 \times 1 0 ^ { 6 } } } = 2 . 1 \qquad ( \text{firmly mixed} )
$$
$$
h = \left( 5 . 5 ^ { 3 } + 6 . 1 ^ { 3 } \right) ^ { 1 / 3 } = 7 . 3 \ \mathrm { W / m ^ { 2 } K } \ \text{(aiding, } + 2 0 \ \ \% \text{ over natural alone} ) \qquad h = \left| 5 . 5 ^ { 3 } - 6 . 1 ^ { 3 } \right| ^ { 1 / 3 } = 3 . 8 \ \mathrm { W / m ^ { 2 } K } \ \text{(opposing, } - 3 7 \ \ \% \text{)}
$$
**Use $7 . 3$ if the air is rising, $3 . 8$ if it is descending, and do not average them.** **The practical reading is that in a rack the difference between $0 . 3 \ \mathrm { m / s }$ upward and $0 . 3 \ \mathrm { m / s }$ downward is a factor of two in cooling, and that a rack with a leaky blanking panel can have downward flow in the third slot from the bottom.** **Note also that the forced answer alone, $5 . 5$ , is $2 5 \ \ \%$ below the aiding answer and $4 5 \ \ \%$ above the opposing one: at $\mathrm { G r } / \mathrm { R e } ^ { 2 } \approx 2$ no single-mode calculation is safe, and the honest statement is a range.**
:::
:::

## Exercises

::: exercise A warm wall {#ex-nat-wall level=1 check="37"}
A $3 0 0 \times 3 0 0 \ \mathrm { m m }$ vertical plate is held at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ in a room at $2 0 \ \ {} ^ { \circ } \mathrm { C }$. Find the average coefficient and the heat loss from one face. (Enter the heat loss in W.)
::: solution
**Film temperature** $4 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 7 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 3 9 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$ , $\beta = 1 / 3 1 3 \ \mathrm { K ^ { - 1 } }$ .
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 3 0 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 3 9 \times 1 0 ^ { - 5 } } } = 8 . 3 \times 1 0 ^ { 7 } \qquad ( \text{laminar} )
$$
$$
{ \overline { { \mathrm { N u } } } } = 0 . 5 9 \times \left( 8 . 3 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } = 5 6 . 3 \qquad { \overline { { h } } } = { \frac { 5 6 . 3 \times 0 . 0 2 7 2 } { 0 . 3 0 0 } } = 5 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad q = 5 . 1 \times 0 . 0 9 \times 4 0 = \mathbf { 3 7 \ W }
$$
**Churchill–Chu gives $5 . 2 \ \mathrm { W / m ^ { 2 } K }$ , within $2 \ \ \%$ , because $8 . 3 \times 1 0 ^ { 7 }$ is comfortably inside the laminar band.** **Radiation at $\varepsilon = 0 . 9$ would add $q _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 ^ { 4 } - 2 9 3 ^ { 4 } ) \times 0 . 0 9 = 1 8 \ \mathrm { W }$ , half as much again: the $3 7 \ \mathrm { W }$ is the answer to the question asked, and the $5 5 \ \mathrm { W }$ is the answer to the question a designer needs.**
:::
:::

::: exercise Turn it over {#ex-nat-updown level=1 check="22"}
A $4 0 0 \times 4 0 0 \ \mathrm { m m }$ horizontal plate is at $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room. Find the heat loss from its upper face when the hot side faces up, and when it faces down. (Enter the facing-down value in W.)
::: solution
$L _ { c } = A _ { s } / P _ { s } = 0 . 1 6 / 1 . 6 = 0 . 1 0 0 \ \mathrm { m }$ . **Film** $4 5 \ \ {} ^ { \circ } \mathrm { C }$ : $k = 0 . 0 2 7 6 \ \mathrm { W / m \, K }$ , $\nu = 1 . 7 5 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 4 7 \times 1 0 ^ { - 5 }$ , $\beta = 1 / 3 1 8$ .
$$
\mathrm { R a } _ { L _ { c } } = { \frac { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 1 0 0 ^ { 3 } } { 1 . 7 5 \times 1 0 ^ { - 5 } \times 2 . 4 7 \times 1 0 ^ { - 5 } } } = 2 . 9 \times 1 0 ^ { 6 }
$$
$$
\text{up: } \ { \overline { { h } } } = { \frac { 0 . 5 4 \times ( 2 . 9 \times 1 0 ^ { 6 } ) ^ { 1 / 4 } \times 0 . 0 2 7 6 } { 0 . 1 0 0 } } = 6 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad q = 4 2 \ \mathrm { W }
$$
$$
\text{down: } \ { \overline { { h } } } = { \frac { 0 . 2 7 } { 0 . 5 4 } } \times 6 . 5 = 3 . 3 \ \mathrm { W / m ^ { 2 } K } \qquad q = \mathbf { 2 2 \ W }
$$
**The factor of two is the stability of the layer, and it is worth knowing which face of your part is which.** **Note that the plate loses $4 2 \ \mathrm { W }$ from the top and $2 2$ from the bottom, so a plate suspended in a room loses $6 4 \ \mathrm { W }$ by convection and its top face does two thirds of the work — which is why a hot surface's *upper* neighbour is always the one that overheats.**
:::
:::

::: exercise A pipe, half of it shiny {#ex-nat-pipe level=2 check="322"}
A $8 0 \ \mathrm { m m }$ OD steam pipe at $1 1 0 \ \ {} ^ { \circ } \mathrm { C }$ runs through a $2 5 \ \ {} ^ { \circ } \mathrm { C }$ room; the surface is painted, $\varepsilon = 0 . 9$ . Find the heat loss per metre, including radiation. (Enter W/m, rounded.)
::: solution
**Film** $6 7 . 5 \ \ {} ^ { \circ } \mathrm { C } \approx 7 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 9 9 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 9 7$ , $\mathrm { P r } = 0 . 7 0 3$ , $\alpha = 2 . 8 3 \times 1 0 ^ { - 5 }$ , $\beta = 1 / 3 4 3$ .
$$
\mathrm { R a } _ { D } = { \frac { 9 . 8 1 \times 2 . 9 2 \times 1 0 ^ { - 3 } \times 8 5 \times 0 . 0 8 0 ^ { 3 } } { 1 . 9 9 \times 1 0 ^ { - 5 } \times 2 . 8 3 \times 1 0 ^ { - 5 } } } = 2 . 2 \times 1 0 ^ { 6 } \qquad { \overline { { \mathrm { N u } } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times 2 . 2 \times 1 0 ^ { 6 \, 1 / 6 } } { 1 . 1 9 6 } } \right\} ^ { 2 } = 1 8 . 5
$$
$$
h _ { c } = { \frac { 1 8 . 5 \times 0 . 0 2 9 7 } { 0 . 0 8 0 } } = 6 . 9 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 8 3 + 2 9 8 ) \left( 3 8 3 ^ { 2 } + 2 9 8 ^ { 2 } \right) = 8 . 2 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime } = ( 6 . 9 + 8 . 2 ) \times \pi \times 0 . 0 8 0 \times 8 5 = \mathbf { 3 2 2 \ W / m } \qquad \text{radiation } 5 4 \ \ \%
$$
**The total is $3 2 2 \ \mathrm { W / m }$ , of which $1 7 4 \ \mathrm { W / m }$ — $5 4 \ \%$ — is radiation from a surface whose emissivity is the one property in the calculation that nobody measures.** **A $4 0 \ \mathrm { m }$ run of this bare pipe costs $1 3 \ \mathrm { k W }$ continuously, which is why the lagging pays for itself in one heating season and why the check that a plant engineer should run is not the steam trap survey but the infrared photograph of the returns.**
:::
:::

::: exercise Two gaps {#ex-nat-gap level=2 check="36"}
A vertical enclosure $1 . 2 \ \mathrm { m }$ tall has a $2 0 \ \mathrm { m m }$ air gap with $1 5 \ \mathrm { K }$ across it. Find the heat flux. Then repeat for a $5 0 \ \mathrm { m m }$ gap and give the second answer.
::: solution
**Film** $1 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 0 7 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 5 1$ , $\beta = 1 / 2 8 3$ .
$$
S = 2 0 \ \mathrm { m m } : \quad \mathrm { R a } _ { S } = { \frac { 9 . 8 1 \times 3 . 5 3 \times 1 0 ^ { - 3 } \times 1 5 \times 0 . 0 2 0 ^ { 3 } } { 1 . 4 6 \times 1 0 ^ { - 5 } \times 2 . 0 7 \times 1 0 ^ { - 5 } } } = 1 . 3 4 \times 1 0 ^ { 4 }
$$
$$
\mathrm { N u } _ { S } = 1 + 1 . 4 4 \left( 1 - { \frac { 1 7 0 8 } { 1 3 \, 4 0 0 } } \right) + \left[ \left( { \frac { 1 3 \, 4 0 0 } { 5 8 3 0 } } \right) ^ { 1 / 3 } - 1 \right] = 1 + 1 . 2 6 + 0 . 3 2 = 2 . 5 8 \qquad h = 2 . 5 8 \times { \frac { 0 . 0 2 5 1 } { 0 . 0 2 0 } } = 3 . 2 4 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime \prime } = 3 . 2 4 \times 1 5 = 4 9 \ \mathrm { W / m ^ { 2 } } \qquad S = 5 0 \ \mathrm { m m } : \quad \mathrm { R a } _ { S } = 2 . 1 \times 1 0 ^ { 5 } \ , \ \mathrm { N u } _ { S } = 4 . 7 \ , \ h = 2 . 4 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = \mathbf { 3 6 \ W / m ^ { 2 } }
$$
**Widening the gap by $2 . 5 \times$ reduces the flux by only $2 7 \ \ \%$ , because the Nusselt number rises as the gap grows and cancels most of the extra resistance.** **This is the whole argument for keeping insulation gaps thin and for filling them with a low- $k$ gas rather than a wide air space: the circulation is not stopped by width, only by thinness or by a gas that cannot carry it.**
:::
:::

::: exercise A solar collector on a roof {#ex-nat-solar level=2 check="461"}
The absorber of a flat-plate collector is $1 . 0 \times 2 . 0 \ \mathrm { m }$ at $6 0 \ \ {} ^ { \circ } \mathrm { C }$, in windless air at $1 0 \ \ {} ^ { \circ } \mathrm { C }$. Find the convective loss when the collector is flat on a $3 5 ^ { \circ }$ roof, treating the panel as an inclined plate, and again when it is mounted vertically. (Enter the inclined loss in W.)
::: solution
**The inclination enters as $g \cos \gamma$ with $\gamma$ from the horizontal, and the length is the $1 . 0 \ \mathrm { m }$ slope dimension.** **Film** $3 5 \ \ {} ^ { \circ } \mathrm { C }$ : $k = 0 . 0 2 6 8 \ \mathrm { W / m \, K }$ , $\nu = 1 . 6 6 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 3 2 \times 1 0 ^ { - 5 }$ , $\beta = 1 / 3 0 8$ .
$$
\gamma = 5 5 ^ { \circ } \text{ from the vertical}: \quad \mathrm { R a } _ { L } = { \frac { 9 . 8 1 \cos 5 5 ^ { \circ } \times 3 . 2 5 \times 1 0 ^ { - 3 } \times 5 0 \times 1 . 0 ^ { 3 } } { 1 . 6 6 \times 1 0 ^ { - 5 } \times 2 . 3 2 \times 1 0 ^ { - 5 } } } = 3 . 0 \times 1 0 ^ { 9 }
$$
**This is above $1 0 ^ { 9 }$ , so the layer is turbulent and the $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$ law does not apply; use Churchill–Chu, which spans the transition.**
$$
{ \overline { { \mathrm { N u } } } } = \left\{ 0 . 8 2 5 + { \frac { 0 . 3 8 7 \times \left( 3 . 0 \times 1 0 ^ { 9 } \right) ^ { 1 / 6 } } { 1 . 1 9 5 } } \right\} ^ { 2 } = 1 7 2 \qquad { \overline { { h } } } = { \frac { 1 7 2 \times 0 . 0 2 6 8 } { 1 . 0 } } = 4 . 6 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q = 4 . 6 \times 2 . 0 \times 5 0 = \mathbf { 4 6 1 \ W } \qquad \text{vertical: } \ \mathrm { R a } = 4 . 3 \times 1 0 ^ { 9 } \ , \ { \overline { { h } } } = 5 . 1 \ , \ q = 5 1 4 \ \mathrm { W }
$$
**Tilting the panel from the vertical costs only $10 \ \ \%$ of the convective loss — and $4 6 1 \ \mathrm { W }$ of convection on a collector that intercepts perhaps $1 4 0 0 \ \mathrm { W }$ of sun is a third of its efficiency gone, which is why the glazing gap, not the tilt, is where the heat is.** **Note the size of the Rayleigh number: at a metre and $5 0 \ \mathrm { K }$ the flow is turbulent, and a designer who applies the laminar law here gets $h = 4 . 4$ , only $5 \ \ \%$ out — the two laws cross close to where practice lives, which is the luckiest accident in this subject.**
:::
:::

::: exercise Water, not air {#ex-nat-water level=2 check="890"}
A $0 . 6 \ \mathrm { m }$ vertical tank wall sits in water at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and is held at $6 0 \ \ {} ^ { \circ } \mathrm { C }$. Estimate the coefficient. (Water at the film temperature $4 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 0 . 6 5 8 \times 1 0 ^ { - 6 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 6 3 1 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 4 . 3$ , $\beta = 3 . 8 \times 1 0 ^ { - 4 } \ \mathrm { K ^ { - 1 } }$ , $\alpha = 1 . 5 1 \times 1 0 ^ { - 7 } \ \mathrm { m ^ { 2 } / s }$ . Enter $\mathrm { W / m ^ { 2 } K }$ .)
::: solution
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 8 \times 1 0 ^ { - 4 } \times 4 0 \times 0 . 6 0 0 ^ { 3 } } { 0 . 6 5 8 \times 1 0 ^ { - 6 } \times 1 . 5 1 \times 1 0 ^ { - 7 } } } = 3 . 2 4 \times 1 0 ^ { 1 1 } \qquad ( \text{turbulent, far above } 1 0 ^ { 9 } )
$$
$$
{ \overline { { \mathrm { N u } } } } = 0 . 1 0 \times \left( 3 . 2 4 \times 1 0 ^ { 1 1 } \right) ^ { 1 / 3 } = 6 8 7 \qquad { \overline { { h } } } = { \frac { 6 8 7 \times 0 . 6 3 1 } { 0 . 6 0 0 } } = \mathbf { 7 2 0 \ W / m ^ { 2 } K }
$$
**Three checks on an answer that looks too big.** **It is not: the same wall in air gives $5 \ \mathrm { W / m ^ { 2 } K }$ , and the ratio is what the properties predict — twenty times the conductivity and a Rayleigh number six hundred times larger.** **The laminar law would have given $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } k / L = 1 5 0 0 \ \mathrm { W / m ^ { 2 } K }$ , a factor of two out, because $\mathrm { R a } _ { L } = 3 \times 1 0 ^ { 1 1 }$ is two hundred times the transition value: in liquids, ordinary heights and ordinary temperature differences are turbulent, and the $1 / 4$ power law is almost never the right one.** **And watch $\beta$ , which for water is not a constant: $2 . 1 \times 1 0 ^ { - 4 }$ at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and $5 . 1 \times 1 0 ^ { - 4 }$ at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ , so a coefficient built at the wrong film temperature is out by $( 5 . 1 / 2 . 1 ) ^ { 1 / 3 } = 1 . 3$ in the turbulent regime and by $1 . 9$ in the laminar one.** **The lesson is the one about water: natural convection in a liquid is two orders of magnitude stronger than in a gas, because $k$ is twenty times larger and $\mathrm { R a }$ is a million times larger.** **A tank wall $4 0 \ \mathrm { K }$ above the water loses $2 9 \ \mathrm { k W }$ per square metre into the water; the same wall in air loses $2 0 0 \ \mathrm { W }$ . Any "natural convection in air" number applied to a liquid is wrong by that factor, and this error is behind a great many failed bath heaters.**
:::
:::

::: exercise How tall, how wide {#ex-nat-scale level=3 check="1375"}
A vertical plate $1 \ \mathrm { m }$ tall in air is $1 1 \ \mathrm { K }$ above the room. **A model at one-fifth scale is to be tested with the same Rayleigh number.** Find the required $\Delta T$ for the model, and the ratio of the model's coefficient to the prototype's. (Enter $\Delta T$ in K.)
::: solution
$$
\mathrm { R a } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \quad \text{equal} \quad \Longrightarrow \quad \Delta T _ { m } = \Delta T _ { p } \left( { \frac { L _ { p } } { L _ { m } } } \right) ^ { 3 } = 1 1 \times 5 ^ { 3 } = \mathbf { 1 3 7 5 \ K }
$$
**Which is impossible — and that is the answer to the question the exercise is really asking.** **Strict similarity in natural convection requires $\Delta T \propto L ^ { - 3 }$ , so a one-fifth model needs $1 3 7 5 \ \mathrm { K }$ in air, and a one-tenth model would need $1 1 \ 0 0 0 \ \mathrm { K }$ ; the property variations alone destroy the experiment long before the geometry is reproduced.** **This is the opposite of forced convection, where matching $\mathrm { R e }$ at one-fifth scale means multiplying the speed by five, which a good tunnel can do.** **The partial escape is that $h \propto L ^ { - 1 / 4 }$ is so weak that the model's coefficient is within $1 / 5 ^ { 1 / 4 } = 0 . 6 7$ of the prototype's even at the same $\Delta T$ , and $\beta$ can be replaced by a working fluid with a larger one: oil or a refrigerant at a modest $\Delta T$ reproduces the $\mathrm { R a }$ of a building at $1 0 \ \mathrm { K }$ , which is how atrium smoke layering and electronic-rack flows are actually modelled.** **The ratio asked for, if the model is run at the same $\Delta T$ , is $h _ { m } / h _ { p } = ( L _ { p } / L _ { m } ) ^ { 1 / 4 } = 5 ^ { 1 / 4 } = \mathbf { 1 . 5 }$ — the model over-cools by $50 \ \ \%$ , which is either a useful margin or a useless result depending on what you are certifying.**
:::
:::

::: exercise Blanking panel or not {#ex-nat-rack level=3 check="4.4"}
An equipment card $2 5 0 \ \mathrm { m m }$ tall stands vertically in a rack. With the rack's fan running, the air speed past the card is $0 . 2 5 \ \mathrm { m / s }$ upward and the card is $3 5 \ \mathrm { K }$ above the inlet air. Compute $\mathrm { G r } _ { L } / \mathrm { R e } _ { L } ^ { 2 }$ and state whether the fan is doing anything useful. (Air at the film temperature: $\nu = 1 . 7 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $\beta = 1 / 3 1 5 \ \mathrm { K ^ { - 1 } }$ .)
::: solution
$$
\mathrm { G r } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 7 \times 1 0 ^ { - 3 } \times 3 5 \times 0 . 2 5 0 ^ { 3 } } { \left( 1 . 7 5 \times 1 0 ^ { - 5 } \right) ^ { 2 } } } = 5 . 5 6 \times 1 0 ^ { 7 } \qquad \mathrm { R e } _ { L } = { \frac { 0 . 2 5 \times 0 . 2 5 0 } { 1 . 7 5 \times 1 0 ^ { - 5 } } } = 3 5 7 1
$$
$$
{ \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { 5 . 5 6 \times 1 0 ^ { 7 } } { 1 . 2 8 \times 1 0 ^ { 7 } } } = \mathbf { 4 . 4 } \qquad h _ { f } = 3 . 9 \ \mathrm { W / m ^ { 2 } K } \ , \ h _ { n } = 5 . 2 \ \mathrm { W / m ^ { 2 } K } \ , \ h _ { \text{aiding} } = 5 . 8 \ \mathrm { W / m ^ { 2 } K }
$$
**The fan is doing something useful, but only $1 2 \ \%$ more than the card would achieve on its own.** **The forced-only coefficient is $3 . 9$ , the natural-only coefficient is $5 . 2$ , and the fan, at the cost of its power, its noise and its bearing, buys $0 . 6 \ \mathrm { W / m ^ { 2 } K }$ .** **Worse: if a leakage path turns the flow over so that $0 . 2 5 \ \mathrm { m / s }$ descends past the card, the answer becomes $4 . 3$ , and the fan is then making the card hotter than no fan at all.** **This is the arithmetic behind blanking panels: a rack's cooling is not improved by more air but by air that goes where it is aimed, and in the $0 . 1$ to $0 . 5 \ \mathrm { m / s }$ band the direction of the flow matters more than its speed.**
:::
:::

::: exercise A plate that cools as it hangs {#ex-nat-cool level=4 check="30"}
A $5 \ \mathrm { m m }$ steel plate ($\rho = 7 8 0 0 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 4 9 0 \ \mathrm { J / k g \, K }$ , $k = 5 0 \ \mathrm { W / m \, K }$ ) is removed from a $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ oven and hangs vertically, $3 0 0 \times 3 0 0 \ \mathrm { m m }$ , in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room. **Ignore radiation and take $h = 6 \left( \Delta T / 1 0 0 \right) ^ { 1 / 4 } \ \mathrm { W / m ^ { 2 } K }$.** Find the time for the plate to fall to $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$. (Enter the time in minutes, to the nearest minute.)
::: solution
**Lumped, because $\mathrm { B i } = h L _ { c } / k = 6 \times 0 . 0 0 2 5 / 5 0 = 3 \times 1 0 ^ { - 4 }$ .** **With $h$ depending on $\Delta T$ the cooling is not exponential:**
$$
\rho c _ { p } { \frac { V } { 2 A } } { \frac { \mathrm { d } \theta } { \mathrm { d } t } } = - h _ { 0 } \left( { \frac { \theta } { 1 0 0 } } \right) ^ { 1 / 4 } \theta \qquad \Longrightarrow \qquad { \frac { \mathrm { d } \theta } { \mathrm { d } t } } = - { \frac { h _ { 0 } } { \rho c _ { p } L _ { \text{th } } \, 1 0 0 ^ { 1 / 4 } } } \theta ^ { 5 / 4 }
$$
**with $L _ { \text{th } } = V / 2 A = 0 . 0 0 2 5 \ \mathrm { m }$ (both faces losing heat) and $\theta = T - T _ { \infty }$ . Integrating $ \theta ^ { - 5 / 4 } \, \mathrm { d } \theta = - \mathrm { d } t / ( \rho c _ { p } L _ { \text{th } } 1 0 0 ^ { 1 / 4 } / h _ { 0 } ) $,**
$$
t = { \frac { 4 \rho c _ { p } L _ { \text{th } } \, 1 0 0 ^ { 1 / 4 } } { h _ { 0 } } } \left( \theta _ { 1 } ^ { - 1 / 4 } - \theta _ { 0 } ^ { - 1 / 4 } \right) = { \frac { 4 \times 7 8 0 0 \times 4 9 0 \times 0 . 0 0 2 5 \times 3 . 1 6 2 } { 6 } } \left( 8 0 ^ { - 1 / 4 } - 2 8 0 ^ { - 1 / 4 } \right)
$$
$$
= 2 0 \, 1 4 0 \times ( 0 . 3 3 4 4 - 0 . 2 4 4 5 ) = \mathbf { 1 8 1 0 \ s } \approx \mathbf { 3 0 \ m i n }
$$
**The comparison that matters is with the exponential law.** **A constant $h = 6$ gives $t = \tau \ln ( 2 8 0 / 8 0 )$ with $\tau = \rho c _ { p } L _ { \text{th } } / h = 1 5 9 0 \ \mathrm { s }$ , or $1 9 9 0 \ \mathrm { s }$ — only $1 0 \ \%$ out, because $h$ changes by just $2 8 \ \%$ over the whole run.** **The difference lives in the tail: cooling on from $1 0 0$ to $4 0 \ \ {} ^ { \circ } \mathrm { C }$ takes $2 0 \, 1 4 0 \times ( 2 0 ^ { - 1 / 4 } - 8 0 ^ { - 1 / 4 } ) = 2 7 9 0 \ \mathrm { s }$ , half again as long as the whole $3 0 0$ to $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ run, for a quarter of the temperature drop.** **A $\theta ^ { 5 / 4 }$ body sheds its first two hundred degrees quickly and then crawls, which is why hot-rolled coil is coiled and castings are shaken out at a red heat rather than left to stand.** **Radiation, at $\varepsilon = 0 . 8$ , would carry $q _ { r } = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 5 7 3 ^ { 4 } - 2 9 3 ^ { 4 } ) = 4 5 6 0 \ \mathrm { W / m ^ { 2 } }$ at the start against convection's $6 \times ( 2 8 0 / 1 0 0 ) ^ { 1 / 4 } \times 2 8 0 = 2 1 7 0$ : at a red heat radiation is the mechanism and the convection is the correction, and the real cooling time is nearer nineteen minutes than thirty.**
:::
:::

::: quiz Still, and moving {#quiz-still}
A vertical plate in air is cooled by natural convection. The plate is replaced by a geometrically similar one four times as tall, at the same temperature difference. What happens to the average coefficient?
- [ ] It is unchanged: $h$ is a property of the fluid pair, not of the part
- [x] It falls by about $4 ^ { 1 / 4 } = 1 . 4$ times, and the heat transfer per unit area falls by the same amount
- [ ] It falls by a factor of four, as it would for forced laminar flow
- [ ] It rises, because a taller plate has a stronger plume

::: solution
**It falls as $L ^ { - 1 / 4 }$ , a factor of $1 . 4$ for four times the height.** $\mathrm { N u } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } \propto L ^ { 3 / 4 }$ and $h = \mathrm { N u } \, k / L \propto L ^ { - 1 / 4 }$ : **the boundary layer grows down the plate and the average coefficient is set by its thickness at the top, so a taller plate has a thicker, more insulating layer.** **Option (c) is the forced-flow answer ($L ^ { - 1 / 2 }$ ) and is the trap: in forced flow the velocity is fixed and the layer's growth is the only effect, whereas here the flow itself strengthens with height, cancelling three quarters of it.** **That cancellation is why natural-convection coefficients are quoted as if they were constants, why a $1 0 \ \mathrm { m }$ hot wall does not cool four times worse per square metre than a $1 \ \mathrm { m }$ one, and why the total heat from a tall tank is nearly proportional to its area.**
:::
:::

::: quiz The warm ceiling {#quiz-ceiling}
A horizontal electronics enclosure, flat and $4 0 0 \ \mathrm { m m }$ across, dissipates the same $2 0 \ \mathrm { W }$ whether it is mounted on the floor with its hot face up, or suspended from the ceiling with its hot face down. In still air, the temperature rise of the hot face is:
- [ ] The same in both cases, because the area and the power are the same
- [x] Roughly twice as large face-down, because the layer is stable when the hot surface is underneath
- [ ] Roughly twice as large face-up, because hot air has to travel further to reach the hot face
- [ ] Unpredictable without knowing the surface emissivity

::: solution
**Roughly twice the rise face-down.** **Hot face up: the light fluid sits above the heavy, the layer is unstable, plumes leave the surface and $C = 0 . 5 4$ . Hot face down: the light fluid is trapped under the heavy, the layer is stable, and $C = 0 . 2 7$ — half the coefficient, so at fixed $Q$ and fixed area, $\Delta T$ roughly doubles** (a little less than double, because $\Delta T \propto h ^ { - 4 / 5 }$ and because radiation, which is orientation-blind, carries part of the heat). **Option (d) is the near miss: emissivity matters a great deal to the total, but it does not change the convection ratio, and the question asks about the convection-driven difference between the two mountings.** **The design rule is worth stating plainly: if a box has a hot face and no choice about its orientation, put the fins on the face that points up — or, if it must hang from a ceiling, put them on the sides and let the vertical plate do the work.**
:::
:::

## Where this lesson leads

- **[[heat-transfer/boiling-condensation|Boiling and condensation]]** is the same buoyancy physics with a phase change supplying the density difference, and the bubble-scale analogue of the cell pattern in a heated-from-below gap.
- **[[heat-transfer/heat-exchangers|Heat exchangers]]** needs this lesson for the air side of natural-draught cooling towers and the shell side of thermosyphon reboilers, where the "pump" is a column of vaporising liquid.
- **[[heat-transfer/radiation|Radiation]]** is not optional here: at every temperature difference in this lesson, radiation is between a third and a half of the heat, and the two must be added before either is quoted.
- **[[heat-transfer/fins|Fins]]** supplies the efficiency and the spacing trade-off that turns this lesson's $h$ into a real heat sink; the optimum spacing $2 k _ { f } / h _ { \infty }$ is the meeting point of the two lessons.
- **[[heat-transfer/transient-conduction|Transient conduction]]** meets this lesson in every cooling problem where $h$ depends on the temperature you are solving for, which is why the cooling curve of [[#ex-nat-cool|the hanging plate]] is not exponential.
- **[[fluid-mechanics/boundary-layers-drag|Boundary layers]]** is where the $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ criterion comes from, and where the mixed-convection flow reversal that makes opposing flow so treacherous is described properly.

::: history Buoyancy, cells and the birth of a correlation
**1659 — Robert Boyle and Christiaan Huygens measure the expansion of air and water.** The expansion coefficient is the property that makes natural convection possible, and for two centuries it was measured and not used: the phenomenon itself — warm air rising — was common knowledge and was explained by nothing.
**1850 — Henry Cavendish's predecessor's problem, made quantitative: Stoney and the stability of stratified air.** G. G. Stokes' 1850s papers on the fall of balls and the motion of fluids supply the viscous scaling that $\mathrm { R e }$ and $\mathrm { G r }$ inherit; **the first clear statement that a fluid heated from below may be unable to move at all is in the stability work of the 1880s, and it is the reason a vacuum flask has a silvered surface rather than merely a wide gap.**
**1900 — Henri Bénard experiments on a heated layer of oil, Paris, *Comptes Rendus* CXXX, 1083.** A layer a few millimetres deep, heated from below, breaks into a honeycomb of counter-rotating hexagons with a period equal to the depth. **Bénard was trying to test a theory of convection cells in the atmosphere and got instead the most-studied pattern-formation problem in physics; the critical Rayleigh number $1 7 0 8$ , computed fifty years later, is the number that appears as the threshold in the enclosure correlation of this lesson.**
**1916 — Wilhelm Nusselt defines the coefficient and the dimensionless groups, and computes the vertical plate.** "Der Wärme durchgang durch ruhende dunne luftschicht", *Zeitschrift für VDI* **60** — Nusselt's own measurement of air gaps and his similarity treatment of the buoyant layer, done in the middle of the First World War with a steam box and a thermometer. **The $1 / 4$ power in this lesson is Nusselt's, obtained by taking the boundary-layer equations with a cubic profile and closing them with the integral of the momentum equation across the layer; the coefficient $0 . 5 9$ that carries it is a later fit to his and everyone else's data.**
**1926 — S. A. Zhebentok and Elenbaas treat the parallel-plate channel.** W. Elenbaas, "Die Kühlung von Widerständen durch natürliche Konvektion", *Physica* **1** (1934) — the correlation for an array of isothermal plates that still sits behind every heat-sink catalogue, derived from measurements on stacks of resistor boards. **The optimum-spacing question that Elenbaas's formula conspicuously fails to answer was settled only in 1984.**
**1957 — Churchill and Chu publish the correlation that spans the transition.** "Correlating equations for heat transfer by free convection from a vertical surface", *AIChE Journal* (1975 for the widely cited version; the 1957 paper is the horizontal-cylinder twin) — **the single-expression form exists because transition made piecewise laws unusable in process design, where a vessel wall is laminar at the bottom and turbulent at the top of the same surface.**
**1984 — Yildiz Bar-Cohen and Emanuel M. Rohsenow, "Thermally optimum spacing of vertical, natural convection cooled, parallel plates", *Journal of Heat Transfer* **106**, 116.** **The optimum spacing of a heat sink, derived by minimising the thermal resistance per unit volume of the sink rather than per unit area of surface — which is the whole trick, and had been missing for fifty years.** **The result $S _ { \text{opt} } \propto k / h _ { \infty }$ is the reason the modern catalogue of extruded passive sinks looks the way it does, and the reason Bar-Cohen's later paper with T. W. Cooper on the same problem for forced flow is the other half of every electronics cooling textbook.**
:::

::: summary
- **Buoyancy is a body force that switches off when the fluid is uniform**: $f _ { b } = \rho \beta g \Delta T$ , with $\beta = 1 / T _ { f }$ for a gas. **The velocity is not an input; it follows from the balance $u \sim ( g \beta \Delta T L ) ^ { 1 / 2 }$ , which gives centimetres per second in a room and half a metre per second up a hot wall.**
- **$\mathrm { R a } _ { L } = g \beta \Delta T L ^ { 3 } / ( \nu \alpha )$ is the only number that matters**, and $\mathrm { R a } _ { L } = 1 0 ^ { 9 }$ is the end of laminar flow on a vertical surface. **In air, a $1 \ \mathrm { m }$ wall transitions at $1 1 \ \mathrm { K }$ and a $1 0 0 \ \mathrm { m m }$ board at $1 8 0 \ \mathrm { K }$ : buildings are turbulent, boards are not.**
- **Vertical plate**: $\overline { { \mathrm { N u } } } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$ laminar, $0 . 1 0 \, \mathrm { R a } ^ { 1 / 3 }$ turbulent, Churchill–Chu across the transition. **$h \propto \Delta T ^ { 1 / 4 } L ^ { - 1 / 4 }$ , so the heat flux goes as $\Delta T ^ { 5 / 4 }$ and the "thermal resistance" of a passive part is a curve, not a number.**
- **Orientation is not a detail.** **Hot face up $C = 0 . 5 4$ , hot face down $C = 0 . 2 7$ ; inclined plates take $\cos \gamma$ inside $\mathrm { R a }$ ; horizontal plates use $L _ { c } = A _ { s } / P _ { s }$ ; cylinders use the diameter with $0 . 6 0$ in Churchill–Chu.** **A factor of two lives in this block, and it is free to get right.**
- **Enclosures use the gap as the length.** $\mathrm { N u } _ { S } = 1 + 1 . 4 4 [ 1 - 1 7 0 8 / \mathrm { R a } _ { S } ] ^ { + } + [ ( \mathrm { R a } _ { S } / 5 8 3 0 ) ^ { 1 / 3 } - 1 ] ^ { + }$ for a vertical gap. **Below $\mathrm { R a } _ { S } \approx 1 7 0 0$ nothing moves and the layer is a pure resistance $S / k$ — which is what a double glazing unit, a thermos wall and a still-air pocket are.**
- **Fin spacing: $S _ { \text{opt} } \approx 2 k _ { f } / h _ { \infty }$ , which is $8$ to $1 2 \ \mathrm { m m }$ for air over all of practice.** **The optimum is flat, the correlations do not contain it, and the real limits are choking, dust and the extrusion die.**
- **Mixed convection is decided by $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ , not by instinct.** **Below $0 . 1$ ignore buoyancy, above $1 0$ ignore the fan; between them combine as $\mathrm { N u } ^ { 3 } = \mathrm { N u } _ { f } ^ { 3 } \pm \mathrm { N u } _ { n } ^ { 3 }$ , and treat opposing flow as a hazard rather than a number.**
- **Radiation is a third to a half of the heat at every temperature difference in this lesson.** **Quote a natural-convection coefficient without saying what you did about radiation and you have quoted half an answer.**
:::

## Further reading

- **Incropera, DeWitt, Bergman and Lavine, *Fundamentals of Heat and Mass Transfer*, chapter 9** — the correlation tables for plates, cylinders, spheres, inclined surfaces and enclosures, with their ranges and uncertainties stated honestly.
- **John R. Howell and Rolando A. Rincon, *A Catalog of Natural Convection Correlations* (University of Texas)** — the free compilation that every electronics thermal engineer keeps open in a second window.
- **Yildiz Bar-Cohen and J. S. Kenney, "Waveform of the thermal resistance of a heat sink", and Bar-Cohen & Rohsenow, *J. Heat Transfer* **106** (1984)** — the spaced-array method and the optimum-spacing derivation, written for the engineer who has to choose a die.
- **Sidney W. Graham and Emanuel M. Rohsenow, "Natural convection on a vertical plate with uniform heat flux", *J. Heat Transfer* **82** (1960)** — the isoflux case, with the $x ^ { 1 / 5 }$ temperature rise that decides where a channel's hot spot is.
- **S. Ostrach, "Natural convection in enclosures", *J. Heat Transfer* **110** (1988)** — the review of the enclosure problem, including the aspect-ratio and inclination effects that turn a window gap into a chimney.
- **A. Bejan, *Convection Heat Transfer*, 4th ed., chapter 4** — the scaling analysis, the constructal argument for fin spacing, and the mixed-convection regime map; harder than the other references and worth it for the regime map alone.
