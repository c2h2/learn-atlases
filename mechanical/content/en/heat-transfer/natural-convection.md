Take the fan away and the fluid still moves, because the fluid that has been warmed is lighter than the fluid that is coming to replace it. **Natural convection is the same boundary-layer physics as forced convection with the pressure gradient supplied by gravity and the velocity no longer known in advance** — and that single change turns a problem with one control knob (the speed) into a problem in which the heat transfer, the flow rate and the temperature difference are all determined together. **The velocity is not an input; it is part of the answer.**

The consequences are worth stating before any equation. **For a laminar thermal boundary layer the coefficient turns out to be almost independent of size** — $h \propto L ^ { - 1 / 4 }$ on a vertical plate, against $L ^ { - 1 / 2 }$ for a forced laminar layer — **which is why a natural-convection heat sink can be scaled up almost for free and why a small model in a laboratory tells you so little about the full-size object it represents.** **The coefficient depends on the temperature difference as $\Delta T ^ { 1 / 4 }$ , so the heat flux goes as $\Delta T ^ { 5 / 4 }$ : doubling the allowed temperature rise more than doubles the cooling, and the "thermal resistance" of a natural-convection part is not a constant but a curve.** **And the flow is slow — centimetres per second, not metres — so it is easily destroyed by a draught, by the fan in the next box, or by the motion of the vehicle the box is in, which is why every natural-convection calculation has to be accompanied by the question "and is there really no wind?"**

The subject is organised, like external convection, around the vertical plate; but here the plate has an orientation, and orientation is not a detail. **A hot surface facing up cools twice as well as the same surface facing down, because in the first case the light fluid is under the heavy and the layer is unstable, and in the second it is stable and the layer simply sits there.** **A channel of fins has an optimum spacing that forced flow does not: close the fins together and the boundary layers merge, the channel becomes a wall of conduction, and the flow stops.** **And an enclosure — the gap in a double-glazed unit, the air between a hot tank and its lagging — can carry less heat than pure conduction through the same fluid would suggest and more than you would guess, because the flow organises itself into cells whose size is set by the gap.**

::: warning Five natural-convection errors, in order of how much they cost
**Assuming the flow is forced when it is not, or the reverse.** **The test is $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ , not your instinct.** For a $1 0 0 \ \mathrm { m m }$ plate at $3 0 \ \mathrm { K }$ above ambient, $\mathrm { G r } = 3 . 4 \times 1 0 ^ { 6 }$ : at $1 \ \mathrm { m / s }$ the ratio is $0 . 1 0$ and the forced calculation is good to a few per cent; at $0 . 1 \ \mathrm { m / s }$ it is $1 0$ and the "forced" answer is low by nearly a factor of two. **Server rooms are designed at $2$ to $5 \ \mathrm { m / s }$ and everything in them is forced; a sealed enclosure on a shelf in a corner is not, and the fan curve of the neighbouring instrument is what decides which.** **Using a forced-convection correlation because it is the one you know is the most common error in the subject; using a natural-convection correlation on a rack with $2 \ \mathrm { m / s }$ across it is the second.** **Getting the orientation wrong.** **A horizontal hot surface facing up and the same surface facing down differ by a factor of two; a plate inclined $6 0 ^ { \circ }$ from the vertical loses a sixth of its cooling; and a heated plate on the underside of a hot water tank does almost nothing at all.** **There is no universal "natural convection $h = 5 \ \mathrm { W / m ^ { 2 } K }$" — there is a correlation per orientation, and the orientations give answers that differ by three to one.** **Forgetting that radiation is usually half the heat.** **A $6 0 \ \ {} ^ { \circ } \mathrm { C }$ pipe in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room gives $h _ { c } = 6 . 1$ and $h _ { r } = 6 . 3 \ \mathrm { W / m ^ { 2 } K }$ : half the heat leaves by a mechanism that no natural-convection correlation contains.** **At room temperatures and modest temperature differences, natural convection and radiation are of the same size, and a calculation that omits one systematically over-predicts the convection it needs.** **Using the wrong length, or the wrong temperature difference.** **The length in $\mathrm { R a } _ { L }$ is the height of a vertical plate, the diameter of a cylinder, the gap of an enclosure and the ratio $A _ { s } / P _ { s }$ of area to perimeter for a horizontal plate — four different numbers for one object.** **Properties, including the expansion coefficient, go at the film temperature; $\beta$ for an ideal gas is $1 / T _ { f }$ in kelvin, and using $1 / T$ with $T$ in Celsius gives a $\beta$ (and a Rayleigh number) wrong by a factor of five to fifteen at room temperatures.** **Trusting the correlations more than they deserve.** **The scatter of natural-convection data is $\pm 1 5$ to $\pm 2 0 \ \ \%$ in the best cases and much worse near transition, because the flow is unsteady, three-dimensional and sensitive to the room.** **The honest design response is to compute the heat at the low end of the coefficient range, to keep the temperature rise as the specification rather than the result, and to measure the finished box — which is what every manufacturer of passive electronics actually does.**
:::

## Why buoyancy makes its own Reynolds number

::: definition Buoyancy as a body force, and the expansion coefficient {#def-buoy}
A fluid element in a gravitational field feels a net force only if it is lighter than the space it occupies. With $\rho _ { \infty }$ the density of the undisturbed fluid at $T _ { \infty }$ , the upward force per unit volume on an element at $T$ is
$$
f _ { b } = \left( \rho _ { \infty } - \rho \right) g \qquad \beta \equiv - { \frac { 1 } { \rho } } \left( { \frac { \partial \rho } { \partial T } } \right) _ { p } \approx { \frac { \rho _ { \infty } - \rho } { \rho \left( T - T _ { \infty } \right) } } \qquad \Longrightarrow \qquad f _ { b } \approx \rho \beta g \left( T - T _ { \infty } \right)
$$
**This is the Boussinesq approximation, and its content is one sentence: density changes are negligible everywhere except multiplied by $g$ .** **It is an excellent approximation whenever $\beta \Delta T \ll 1$ — for a gas near room temperature $\beta \Delta T \approx 0 . 1$ at $3 0 \ \mathrm { K }$ , so it is good to a few per cent up to a few tens of kelvin; for water, with $\beta$ ten times smaller, it holds over much larger differences.** **Two properties make it necessary to say which fluid is meant:**
$$
\begin{array} { l c l l }
\text{Fluid} & \beta \ \left( \mathrm { K ^ { - 1 } } \right) & \text{at} & \text{Comment} \\
\text{Ideal gas} & 1 / T _ { f } = 3 . 3 \times 1 0 ^ { - 3 } & 2 0 \ \mathrm { ^ \circ C } & \text{the only case where } \beta \text{ is exact and needs no table} \\
\text{Water} & 2 . 0 7 \times 1 0 ^ { - 4 } & 2 0 \ \mathrm { ^ \circ C } & \text{rises to } 6 . 1 \times 1 0 ^ { - 4 } \text{ at } 7 5 \ \mathrm { ^ \circ C } \text{ and to } 7 . 5 \times 1 0 ^ { - 4 } \text{ at } 1 0 0 \ \mathrm { ^ \circ C } \\
\text{Water} & 0 & 4 \ \mathrm { ^ \circ C } & \text{the density maximum: no buoyancy, and lakes freeze from the top down} \\
\text{Engine oil} & 7 . 0 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \text{large } \beta \text{ and huge } \mathrm { P r } \text{: strong driving, reluctant flow} \\
\text{Mercury} & 1 . 8 \times 1 0 ^ { - 4 } & 2 5 \ \mathrm { ^ \circ C } & \text{weak driving, but } \alpha \text{ is enormous: conduction wins}
\end{array}
$$
**Water's behaviour is the one that surprises people and the one that matters in nature.** **Between $0$ and $4 \ \ {} ^ { \circ } \mathrm { C }$ the expansion coefficient changes sign, so the coldest water is the lightest, convection stops, and a lake develops a $4 \ \ {} ^ { \circ } \mathrm { C }$ bottom and an ice lid instead of freezing solid.** **Above $4 \ \ {} ^ { \circ } \mathrm { C }$ everything is normal again, and the near-wall plumes of a heated pan of water carry essentially all the heat: pure conduction through a metre of still water at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ would give $k / L \approx 0 . 6 \ \mathrm { W / m ^ { 2 } K }$ , while natural convection on a hot wall in the same water gives several hundred — a thousand times more.**
:::

::: definition The Grashof and Rayleigh numbers {#def-gr}
Balance buoyancy against inertia in the boundary-layer momentum equation, and viscous diffusion against the streamwise transport of momentum, and two groups appear. With $L$ the vertical length of the body and $\Delta T$ the surface-to-ambient difference:
$$
\mathrm { G r } _ { L } = { \frac { \rho ^ { 2 } g \beta \Delta T L ^ { 3 } } { \mu ^ { 2 } } } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu ^ { 2 } } } \qquad \boxed { \; \mathrm { R a } _ { L } = \mathrm { G r } _ { L } \, \mathrm { P r } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \; }
$$
**$\mathrm { G r }$ is the buoyancy analogue of $\mathrm { R e } ^ { 2 }$ — it measures buoyancy against viscous resistance, with the velocity scale $( g \beta \Delta T L ) ^ { 1 / 2 }$ playing the role of $U$ — and $\mathrm { R a }$ is the same ratio with heat conduction included.** **Read $\mathrm { R a }$ as a competition between two ways of moving energy across a layer of thickness $L$ : buoyant transport, which goes as $g \beta \Delta T L ^ { 3 } / \nu$ , and conduction, which goes as $\alpha$ .** **$\mathrm { R a } \ll 1$ is conduction with no motion at all; $\mathrm { R a } \gg 1$ is a boundary layer and a core; $\mathrm { R a } \gtrsim 1 0 ^ { 9 }$ on a vertical surface is the end of laminar flow.**
**The velocity and thickness scales fall out of the same balance and are worth memorising, because they are the sanity check on every natural-convection problem you will ever set up:**
$$
\boxed { \; u \sim { \sqrt { g \beta \Delta T L } } \; } \qquad \delta \sim { \frac { L } { \mathrm { R a } _ { L } ^ { 1 / 4 } } } \qquad h \sim { \frac { k } { \delta } } \sim { \frac { k } { L } } \, \mathrm { R a } _ { L } ^ { 1 / 4 }
$$
$$
\begin{array} { l c c c }
\text{Case} & u \text{ scale} & \delta \sim L \, \mathrm { R a } ^ { - 1 / 4 } & h \text{ (Churchill–Chu)} \\
\text{Vertical plate, } 1 5 0 \ \mathrm { m m } \text{, } 5 0 \ \mathrm { K } \text{, air} & 0 . 4 8 \ \mathrm { m / s } & 2 . 6 \ \mathrm { m m } & 6 . 0 \ \mathrm { W / m ^ { 2 } K } \\
\text{Same plate, } 1 \ \mathrm { m } \text{, } 5 0 \ \mathrm { K } & 1 . 2 \ \mathrm { m / s } & 4 . 1 \ \mathrm { m m } \text{ (and turbulent)} & 5 . 0 \ \mathrm { W / m ^ { 2 } K } \\
\text{Water, } 0 . 5 \ \mathrm { m } \text{, } 1 0 \ \mathrm { K } & 0 . 1 2 \ \mathrm { m / s } & 1 . 2 \ \mathrm { m m } & 5 5 0 \ \mathrm { W / m ^ { 2 } K }
\end{array}
$$
**Scale velocities of half a metre per second up a hot wall (the measured peak velocity in the layer is a fraction of this, typically some tens of centimetres per second).** **These are the speeds at which "still" air actually moves, and they are the reason a candle flame leans towards a ventilation grille across a whole room, the reason smoke rises to the ceiling and then drifts along it, and the reason a natural-convection enclosure must be vented at the top and not merely somewhere.**
:::

::: widget plot
title: Natural-convection coefficient against temperature rise, laminar and turbulent
f: 6.03*pow(x/50,0.25); 6.03*pow(x/50,1/3)
x: 2, 120
y: 0, 25
labels: laminar, h proportional to delta-T^1/4; turbulent, h proportional to delta-T^1/3
caption: The coefficient of a $1 5 0 \ \mathrm { m m }$ vertical plate in air at $5 0 \ \ {} ^ { \circ } \mathrm { C }$ film temperature, against surface-to-ambient difference. **Both curves pass through $6 . 0 \ \mathrm { W / m ^ { 2 } K }$ at $5 0 \ \mathrm { K }$ and then part: the laminar law is nearly flat, the turbulent law climbs steeply, because in the turbulent regime the whole layer is mixing and $h$ no longer cares about the quiet conduction sublayer.** **The practical reading is the laminar curve's flatness: going from a $2 0 \ \mathrm { K }$ to an $8 0 \ \mathrm { K }$ rise buys only $4 1 \ \ \%$ more coefficient, but $4 \times$ the temperature difference times $1 . 4 1$ times the coefficient is $5 . 7$ times the heat flux — the $\Delta T ^ { 5 / 4 }$ law, and the reason a passive enclosure's heat rating is so sensitive to the temperature you allow it to run at.** **The turbulent curve is drawn for comparison only: this plate would need a temperature difference of thousands of kelvin to reach $\mathrm { R a } = 1 0 ^ { 9 }$ , whereas a $1 \ \mathrm { m }$ wall gets there at about $1 1 \ \mathrm { K }$ — which is why big hot things follow the $\Delta T ^ { 1 / 3 }$ law and small ones do not.**
:::

::: example How fast, and how thick {#ex-scale}
Estimate the velocity scale and boundary-layer thickness at the top of a $2 0 0 \ \mathrm { m m }$ tall vertical surface at $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room, and the coefficient that goes with it.
::: solution
**Take $L = 0 . 2 0 0 \ \mathrm { m }$ , $\Delta T = 5 0 \ \mathrm { K }$ , film temperature $4 5 \ \ {} ^ { \circ } \mathrm { C }$ : $\beta = 1 / 3 1 8 = 3 . 1 4 \times 1 0 ^ { - 3 } \ \mathrm { K ^ { - 1 } }$ , $\nu = 1 . 7 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $\alpha = 2 . 4 7 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 7 5 \ \mathrm { W / m \, K }$ .**
$$
u \sim { \sqrt { g \beta \Delta T L } } = { \sqrt { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 2 0 0 } } = \mathbf { 0 . 5 6 \ \mathrm { m / s } }
$$
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 2 0 0 ^ { 3 } } { 1 . 7 5 \times 1 0 ^ { - 5 } \times 2 . 4 7 \times 1 0 ^ { - 5 } } } = 2 . 8 5 \times 1 0 ^ { 7 } \qquad \delta \sim { \frac { 0 . 2 0 0 } { \left( 2 . 8 5 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } } } = { \frac { 0 . 2 0 0 } { 7 3 . 1 } } = \mathbf { 2 . 7 \ \mathrm { m m } }
$$
$$
h \sim { \frac { k } { \delta } } = { \frac { 0 . 0 2 7 5 } { 2 . 7 \times 1 0 ^ { - 3 } } } = 1 0 \ \mathrm { W / m ^ { 2 } K } \qquad ( \text{correlation: } 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } = 4 3 . 1 \Rightarrow h = 5 . 9 \ \mathrm { W / m ^ { 2 } K } )
$$
**The scaling gives the right order of magnitude and is within a factor of two on the coefficient — which is what scalings do, and why they are worth doing before the correlation.** **Two things to keep.** **The velocity scale is half a metre per second, and the real peak velocity in the layer some tens of centimetres per second: comparable with the draughts in an ordinary room, so a hot surface in a real room is cooled partly by whatever the room's air is doing, not only by its own buoyancy.** **And the layer is a few millimetres thick: which is why a thermocouple bead $2 \ \mathrm { m m }$ across, sitting in that layer, reads neither the surface nor the room, and why air-temperature measurement in a still room is an art.**
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
\rho \left( g \beta \Delta T L \right) / L = { \frac { \mu } { \delta ^ { 2 } } } \left( g \beta \Delta T L \right) ^ { 1 / 2 } \quad \Longrightarrow \quad \delta ^ { 2 } = { \frac { \mu \left( g \beta \Delta T L \right) ^ { 1 / 2 } } { \rho g \beta \Delta T } } = { \frac { \nu L ^ { 1 / 2 } } { \left( g \beta \Delta T \right) ^ { 1 / 2 } } } \quad \Longrightarrow \quad \boxed { \; \delta = { \frac { L } { \left( g \beta \Delta T L ^ { 3 } / \nu ^ { 2 } \right) ^ { 1 / 4 } } } = { \frac { L } { \mathrm { G r } _ { L } ^ { 1 / 4 } } } \; }
$$
**That is the velocity-layer thickness; the thermal layer differs by the Prandtl number, $\delta _ { t } = \delta \, \mathrm { P r } ^ { - \varphi }$ with $\varphi$ between $1 / 2$ and $1 / 4$ depending on how the two diffusions trade, and the group that survives in the answer is $\mathrm { G r } \, \mathrm { P r } = \mathrm { R a }$ :**
$$
h \sim { \frac { k } { \delta _ { t } } } \sim { \frac { k } { L } } \, \mathrm { P r } ^ { \varphi } \, \mathrm { G r } _ { L } ^ { 1 / 4 } \sim { \frac { k } { L } } \left( { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \right) ^ { 1 / 4 } \qquad \Longrightarrow \qquad \boxed { \; \mathrm { N u } _ { L } = C \, \mathrm { R a } _ { L } ^ { 1 / 4 } \; } \qquad \left[ \; h \propto \Delta T ^ { 1 / 4 } L ^ { - 1 / 4 } \; \right]
$$
**Three consequences, all of them borne out by experiment within the scatter of the data.** **(i) $h$ depends on length as $L ^ { - 1 / 4 }$ , which is so weak that natural-convection coefficients are quoted as if they were constants — but strict similarity of a scale model needs $\Delta T \propto L ^ { - 3 }$ to keep $\mathrm { R a }$ equal, which is why air models of large objects are rarely possible (see [[#ex-nat-scale]]).** **(ii) The heat flux goes as $\Delta T ^ { 5 / 4 }$ , so a passive device's "thermal resistance" $R _ { \theta } = \Delta T / Q \propto \Delta T ^ { - 1 / 4 }$ is a curve, and quoting one number for it is a convention rather than a property.** **(iii) There is no $U$ in the answer, because there is no $U$ : the flow rate adjusts until viscous drag balances buoyancy, and that is why the fan laws do not apply and why a natural-convection heat sink cannot be improved by giving the fluid more room to move unless the room is what was choking it.**
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
**For a plate at uniform heat flux instead of uniform temperature the surface temperature varies along the plate. The usual engineering practice (Incropera et al., following Churchill and Chu) is to use the isothermal correlations with $\Delta T$ taken at mid-height, $\Delta T _ { L / 2 } = T _ { s } ( L / 2 ) - T _ { \infty }$ , and to iterate because $\Delta T _ { L / 2 }$ is the unknown. In the laminar range the more accurate laminar-only form of Churchill and Chu is**
$$
\overline { { \mathrm { N u } } } _ { L } = 0 . 6 8 + { \frac { 0 . 6 7 0 \, \mathrm { R a } _ { L } ^ { 1 / 4 } } { \left[ 1 + \left( 0 . 4 9 2 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 4 / 9 } } } \qquad ( \mathrm { R a } _ { L } \lesssim 1 0 ^ { 9 } )
$$
**Four things the engineer needs from this block.** **(i) The transition at $\mathrm { R a } _ { L } = 1 0 ^ { 9 }$ is not a property of the plate but of the temperature difference: for a $1 \ \mathrm { m }$ vertical wall in air, transition happens at $\Delta T \approx 1 1 \ \mathrm { K }$ , while a $1 0 0 \ \mathrm { m m }$ board would need a thousand times more — it never gets there.** **Everyday objects are laminar; buildings, tanks and radiators are turbulent.** **(ii) The two McAdams laws cross where $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } = 0 . 1 0 \, \mathrm { R a } ^ { 1 / 3 }$ , i.e. $\mathrm { R a } = 5 . 9 ^ { 1 2 } \approx 1 . 8 \times 1 0 ^ { 9 }$ — close to the transition by construction — and the true behaviour through transition is unsteady, cellular and about $2 0 \ \ \%$ uncertain — do not design a part to work there.** **(iii) The isothermal and isoflux answers differ by a few per cent in $\overline { { \mathrm { N u } } }$ but by more in the local value: with uniform flux the surface temperature rises as $x ^ { 1 / 5 }$ in the laminar region, so the top of a heated channel is the hot place, exactly as in forced flow but far less strongly.** **(iv) The plate must be taller than it is wide, or at least not much wider: on a wide plate the flow three-dimensionalises at the sides and the two-dimensional correlation over-predicts the middle.**
:::

::: example A board cooled by the room {#ex-pcb-nat}
A $1 5 0 \times 1 5 0 \ \mathrm { m m }$ vertical circuit board dissipates $6 \ \mathrm { W }$ from one face in a room at $2 5 \ \ {} ^ { \circ } \mathrm { C }$. Estimate the surface temperature, and compare the answer with what a forced-air designer would have assumed.
::: solution
**The coefficient depends on the temperature difference, which is what we are solving for, so iterate.** $q ^ { \prime \prime } = 6 / 0 . 0 2 2 5 = 2 6 7 \ \mathrm { W / m ^ { 2 } }$ , uniform over the face, so use the laminar Churchill–Chu form with $\Delta T$ taken at mid-height. **Guess $\Delta T _ { L / 2 } = 5 0 \ \mathrm { K }$ , film $5 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 8 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 5 5 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 8 1 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 0 . 7 0 6$ , $\beta = 1 / 3 2 3 \ \mathrm { K ^ { - 1 } }$ .**
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times \left( 1 / 3 2 3 \right) \times 5 0 \times 0 . 1 5 0 ^ { 3 } } { 1 . 8 0 \times 1 0 ^ { - 5 } \times 2 . 5 5 \times 1 0 ^ { - 5 } } } = 1 . 1 2 \times 1 0 ^ { 7 } \qquad \overline { { \mathrm { N u } } } = 0 . 6 8 + { \frac { 0 . 6 7 0 \times 5 7 . 8 } { 1 . 3 0 4 } } = 3 0 . 4 \qquad h = { \frac { 3 0 . 4 \times 0 . 0 2 8 1 } { 0 . 1 5 0 } } = 5 . 6 9 \ \mathrm { W / m ^ { 2 } K }
$$
$$
\Delta T _ { L / 2 } = { \frac { q ^ { \prime \prime } } { h } } = { \frac { 2 6 7 } { 5 . 6 9 } } = 4 6 . 9 \ \mathrm { K } \qquad ( \text{guess was } 5 0 \text{; one more pass gives } h = 5 . 6 2 , \ \mathbf { 4 7 \ \mathrm { K } } )
$$
**The board's mid-height runs at about $7 2 \ \ {} ^ { \circ } \mathrm { C }$ , and because the local rise grows as $x ^ { 1 / 5 }$ the top edge is roughly $2 ^ { 1 / 5 } = 1 . 1 5$ times hotter still — about $8 0 \ \ {} ^ { \circ } \mathrm { C }$ .** **Now the comparison.** **A forced-air designer who had been given "natural convection in air, about $1 0 \ \mathrm { W / m ^ { 2 } K }$" from a table of typical values would have predicted a $2 7 \ \mathrm { K }$ rise and a $5 2 \ \ {} ^ { \circ } \mathrm { C }$ board — a $2 0 \ \mathrm { K }$ error, and the wrong side of safe.** **A designer who used the simple $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$ law gets $h = 6 . 2$ and $4 3 \ \mathrm { K }$ , within $1 0 \ \ \%$ — the correlations agree with each other far better than either agrees with a table of "typical" values.** **Radiation changes the picture completely. With a solder-mask emissivity of $0 . 8 5$ and the room's walls at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ , solving convection and radiation together gives a rise of about $2 5 \ \mathrm { K }$ , with radiation carrying $q _ { r } ^ { \prime \prime } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 2 3 ^ { 4 } - 2 9 8 ^ { 4 } ) = 1 4 5 \ \mathrm { W / m ^ { 2 } }$ — more than half the heat — and convection the remaining $1 2 2 \ \mathrm { W / m ^ { 2 } }$ .** **Ignoring radiation is conservative here; ignoring it on a polished metal enclosure would cost nothing, and assuming it on one would be the opposite.**
:::
:::

::: exercise Derivation: why the temperature rise is the design variable {#der-54 level=2}
::: solution
**Take the laminar law and write it as a heat flux.**
$$
q ^ { \prime \prime } = h \Delta T = C \, \Delta T ^ { 1 / 4 } \Delta T = C \Delta T ^ { 5 / 4 } \qquad \Longrightarrow \qquad { \frac { \mathrm { d } q ^ { \prime \prime } } { \mathrm { d } \Delta T } } = { \frac { 5 } { 4 } } \, { \frac { q ^ { \prime \prime } } { \Delta T } }
$$
**Three consequences that are design decisions, not algebra.** **(i) Sensitivity.** **A $1 0 \ \ \%$ error in $h$ — easy to make from orientation alone — gives an error of under $1 0 \ \ \%$ in $\Delta T$ , because $\Delta T \propto h ^ { - 4 / 5 }$ gives $0 . 9 ^ { - 0 . 8 } = 1 . 0 8 7$ : an $8 . 7 \ \ \%$ error in the temperature rise.** **In the turbulent regime $\Delta T \propto h ^ { - 3 / 4 }$ and the same correlation error costs $8 . 2 \ \ \%$ : natural convection is a forgiving subject, and the forgiving exponent is why its rules of thumb survive.** **(ii) Area does not work the way it does in forced flow.** **Doubling the area doubles $Q$ at the same $\Delta T$ , but if instead you double the height of a vertical plate you gain only $2 ^ { 3 / 4 } = 1 . 6 8$ , because $h \propto L ^ { - 1 / 4 }$ and the area gains $2 \times$ while the coefficient loses $2 ^ { - 1 / 4 }$ .** **Widening a plate costs nothing in $h$ : if you must add area to a passive sink, add width, not height — the opposite of the forced-flow instinct, where height is what the fan can afford.** **(iii) The "resistance" is a curve.** **$R _ { \theta } = \Delta T / Q = 1 / ( C A \Delta T ^ { 1 / 4 } )$ , so a datasheet that quotes $R _ { \theta } = 2 . 5 \ \mathrm { K / W }$ for a passive enclosure has quoted it at one particular temperature rise, and the same enclosure at half the rise has $2 . 5 \times 2 ^ { 1 / 4 } = 2 . 9 7 \ \mathrm { K / W }$ .** **The right way to use catalogue data for passive parts is a log-log plot of $Q$ against $\Delta T$ , which is a straight line of slope $5 / 4$ if the part is behaving, and a kinked line if the flow has transitioned or choked.**
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
\text{Inclined plate, angle } \gamma \text{ from the vertical} & 0 . 5 9 , \ g \cos \gamma \text{ in } \mathrm { R a } & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 9 } , \ \gamma \lesssim 6 0 ^ { \circ } \\
\text{Vertical plate} & 0 . 5 9 & 1 / 4 & 1 0 ^ { 4 } - 1 0 ^ { 9 }
\end{array}
$$
**For a horizontal cylinder the same Churchill–Chu structure works with the diameter as the length, $0 . 6 0$ in place of $0 . 8 2 5$ and $0 . 5 5 9$ in place of $0 . 4 9 2$ :**
$$
\overline { { \mathrm { N u } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \, \mathrm { R a } _ { D } ^ { 1 / 6 } } { \left[ 1 + \left( 0 . 5 5 9 / \mathrm { P r } \right) ^ { 9 / 1 6 } \right] ^ { 8 / 2 7 } } } \right\} ^ { 2 } \qquad \left( \mathrm { R a } _ { D } \lesssim 1 0 ^ { 1 2 } \right)
$$
**and for a sphere, $\overline { { \mathrm { N u } } } _ { D } = 2 + 0 . 5 8 9 \, \mathrm { R a } _ { D } ^ { 1 / 4 } / [ 1 + ( 0 . 4 6 9 / \mathrm { P r } ) ^ { 9 / 1 6 } ] ^ { 4 / 9 }$ .** **The $2$ is the conduction limit of [[heat-transfer/external-convection#der-nu2|the sphere derivation]] and it dominates small hot objects in gas: a $3 \ \mathrm { m m }$ bead $4 0 \ \mathrm { K }$ above the air has $\mathrm { N u } \approx 3 . 4$ , of which the conduction term is $6 0 \ \ \%$ .**
**Three practical readings.** **(i) A hot surface facing down is a nearly insulated surface:** $0 . 2 7$ against $0 . 5 4$ is a factor of two, and at low $\Delta T$ the stable layer is even better than the correlation says. **This is why a warm floor heats a room by convection well and a warm ceiling panel hardly convects at all — radiant ceiling panels work almost entirely by radiation.** **(ii) The inclination correction is $\cos \gamma$ inside $\mathrm { R a }$ , not outside:** $h \propto ( \cos \gamma ) ^ { 1 / 4 }$ , so a surface tilted $4 5 ^ { \circ }$ from the vertical loses only $8 \ \ \%$ of a vertical wall's cooling and one tilted $6 0 ^ { \circ }$ loses $1 6 \ \ \%$ . **Beyond $6 0 ^ { \circ }$ from the vertical the correlation is replaced by the horizontal-plate rows, and the change is discontinuous because the flow pattern changes.** **(iii) For a cylinder, use the diameter only if the boundary layer is thin compared with it** — that is, $\mathrm { R a } _ { D } \gtrsim 1 0 ^ { 4 }$ . **Below that the layer is thick compared with the cylinder, curvature dominates and $\mathrm { N u }$ falls only slowly toward a conduction-limited value — which is why the Churchill–Chu fit, valid down to $\mathrm { R a } _ { D } \approx 1 0 ^ { - 5 }$ , carries a constant term and is not a single power law.**
:::

::: example The same plate, two ways {#ex-orient}
A $5 0 0 \times 5 0 0 \ \mathrm { m m }$ horizontal plate at $8 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room. Find the heat loss from the upper face when the hot side faces up and when it faces down, and the ratio.
::: solution
**Characteristic length** $L _ { c } = A _ { s } / P _ { s } = 0 . 2 5 / 2 . 0 = 0 . 1 2 5 \ \mathrm { m }$ . **Film temperature** $5 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 8 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 5 5 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 8 1$ , $\beta = 1 / 3 2 3$ .
$$
\mathrm { R a } _ { L _ { c } } = { \frac { 9 . 8 1 \times 3 . 1 0 \times 1 0 ^ { - 3 } \times 6 0 \times 0 . 1 2 5 ^ { 3 } } { 1 . 8 0 \times 1 0 ^ { - 5 } \times 2 . 5 5 \times 1 0 ^ { - 5 } } } = 7 . 8 \times 1 0 ^ { 6 }
$$
**Facing up** ($1 0 ^ { 4 }$ to $1 0 ^ { 7 }$ : the $0 . 5 4 \, \mathrm { R a } ^ { 1 / 4 }$ law, just inside its range):
$$
\overline { { \mathrm { N u } } } = 0 . 5 4 \times \left( 7 . 8 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } = 2 8 . 5 \qquad h = { \frac { 2 8 . 5 \times 0 . 0 2 8 1 } { 0 . 1 2 5 } } = 6 . 4 \ \mathrm { W / m ^ { 2 } K } \qquad q = 6 . 4 \times 0 . 2 5 \times 6 0 = \mathbf { 9 6 \ \mathrm { W } }
$$
**Facing down:**
$$
\overline { { \mathrm { N u } } } = 0 . 2 7 \times \left( 7 . 8 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } = 1 4 . 3 \qquad h = 3 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad q = \mathbf { 4 8 \ \mathrm { W } }
$$
**A factor of exactly two, from turning the plate over.** **Add radiation at $\varepsilon = 0 . 8 5$ and both cases gain $q _ { r } = 0 . 8 5 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 5 3 ^ { 4 } - 2 9 3 ^ { 4 } ) \times 0 . 2 5 = 9 8 \ \mathrm { W }$ , so the totals are $1 9 4 \ \mathrm { W }$ up and $1 4 6 \ \mathrm { W }$ down — a ratio of $1 . 3 3$ rather than $2 . 0$ .** **That is the general lesson of this lesson in miniature: the convection ratio between two orientations is dramatic, the ratio of the total heat is much less so, and the difference between the two numbers is the difference between a design decision and a curiosity.**
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
\overline { { \mathrm { N u } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times \left( 3 . 8 \times 1 0 ^ { 5 } \right) ^ { 1 / 6 } } { 1 . 2 0 5 } } \right\} ^ { 2 } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times 8 . 5 3 } { 1 . 2 0 5 } } \right\} ^ { 2 } = 1 1 . 1
$$
$$
h _ { c } = { \frac { 1 1 . 1 \times 0 . 0 2 7 2 } { 0 . 0 5 0 } } = 6 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 + 2 9 3 ) \left( 3 3 3 ^ { 2 } + 2 9 3 ^ { 2 } \right) = 6 . 3 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime } = \left( 6 . 1 + 6 . 3 \right) \pi \times 0 . 0 5 0 \times 4 0 = \mathbf { 7 8 \ \mathrm { W / m } } \qquad \text{radiation } \mathbf { 5 1 \ \ \% }
$$
**Half the heat, by a mechanism that the lagging contractor will not mention.** **Two checks.** **The pipe's combined coefficient is $1 2 . 4 \ \mathrm { W / m ^ { 2 } K }$ — close to the combined surface coefficients of $8$ to $1 2 \ \mathrm { W / m ^ { 2 } K }$ used in building calculations, which are not wrong: they are the sum of two things that happen to be similar at room temperature.** **And if the same pipe were polished aluminium with $\varepsilon = 0 . 1$ , $h _ { r }$ would fall to $0 . 7$ and the total to $4 2 \ \mathrm { W / m }$ : a $4 5 \ \ \%$ reduction for the price of a wrap of foil, which is why insulated pipework is so often clad in bright aluminium.**
:::
:::

## Enclosures: convection with nowhere to go

::: definition The enclosure Rayleigh number and the Nusselt number across a gap {#def-enclosure}
Between two parallel isothermal surfaces separated by a gap $S$ , the length is the gap and not the height, and the Nusselt number is defined across the gap:
$$
\mathrm { R a } _ { S } = { \frac { g \beta \Delta T _ { 0 } S ^ { 3 } } { \nu \alpha } } \qquad \mathrm { N u } _ { S } = { \frac { h _ { \text{effective} } S } { k } } \qquad q ^ { \prime \prime } = \mathrm { N u } _ { S } \, { \frac { k } { S } } \, \Delta T _ { 0 }
$$
**Small $\mathrm { R a } _ { S }$ means the gap is too thin to circulate usefully: the Nusselt number falls to $1$ and the layer is a pure conduction resistance $S / k$ — which is exactly what the gas layer of a double-glazed unit is designed to be.** **Two geometries need different correlations.** **A horizontal layer heated from below** (the Rayleigh–Bénard problem) is motionless until a threshold, and for air the correlation of Hollands and co-workers is
$$
\mathrm { N u } _ { S } = 1 + 1 . 4 4 \left[ 1 - { \frac { 1 7 0 8 } { \mathrm { R a } _ { S } } } \right] ^ { + } + \left[ \left( { \frac { \mathrm { R a } _ { S } } { 5 8 3 0 } } \right) ^ { 1 / 3 } - 1 \right] ^ { + } \qquad \left( \text{horizontal air layer heated from below, } \mathrm { R a } _ { S } \lesssim 1 0 ^ { 8 } \right)
$$
**where $[ \, ] ^ { + }$ means "zero if the bracket is negative".** **The three terms are the three regimes: pure conduction, the onset of cellular convection at $\mathrm { R a } _ { S } = 1 7 0 8$ (counter-rotating rolls, a pair roughly $2 S$ wide), and the boundary-layer regime in which each wall grows its own layer and the core is well mixed.** **A vertical cavity** (one hot and one cold side wall, height $H$ ) has no threshold — a slow cell turns at any $\mathrm { R a }$ — but at small $\mathrm { R a } _ { S }$ it carries almost nothing beyond conduction. Incropera et al. recommend, among others, the MacGregor–Emery correlation
$$
\mathrm { N u } _ { S } = 0 . 4 2 \, \mathrm { R a } _ { S } ^ { 1 / 4 } \, \mathrm { P r } ^ { 0 . 0 1 2 } \left( { \frac { H } { S } } \right) ^ { - 0 . 3 } \qquad \left( 1 0 < { \frac { H } { S } } < 4 0 , \ 1 0 ^ { 4 } < \mathrm { R a } _ { S } < 1 0 ^ { 7 } \right)
$$
**with $\mathrm { N u } _ { S } \approx 1$ wherever the formula would give less than one.**
**Four facts that decide most enclosure designs.** **(i) The gap has an optimum.** **In the conduction regime the flux falls as $1 / S$ as the gap widens; once the boundary-layer regime is reached, $\mathrm { N u } _ { S } \propto S ^ { 3 / 4 } S ^ { 0 . 3 }$ and the conductance $h = \mathrm { N u } _ { S } k / S$ hardly changes with $S$ .** **The minimum lies near the onset of convection, which for air at window temperature differences is roughly $1 2$ to $2 0 \ \mathrm { mm }$ — the range double-glazing manufacturers use; a heavier gas such as argon lowers $k$ by about $3 0 \ \ \%$ and that is most of what it buys.** **(ii) Radiation across the gap is as large as the convection:** two uncoated glass panes ($\varepsilon \approx 0 . 8 4$) exchange about $3 . 7 \ \mathrm { W / m ^ { 2 } K }$ by radiation at $1 0 \ \ {} ^ { \circ } \mathrm { C }$ , more than the gas conducts, which is why a low-emissivity coating improves a window more than any gas fill. **(iii) Sealed electronics boxes lose heat through their walls by exactly this mechanism,** and the "natural convection" term in their thermal budget is an enclosure correlation, not a plate correlation, because the inside wall sees the opposite wall. **(iv) Perforate the wall and the whole analysis changes:** a vented enclosure is a chimney, its flow is set by $\Delta \rho g H$ between inlet and outlet, and the heat it carries is ${ \dot { m } } c _ { p } \Delta T$ with ${ \dot { m } }$ from the orifice equation — see [[#ex-chimney]].
:::

::: widget plot
title: Nusselt number across an air gap against the gap Rayleigh number
f: 1+1.44*max(0,1-1708/pow(10,x))+max(0,pow(pow(10,x)/5830,1/3)-1); max(1,0.1703*pow(10,x/4))
x: 2, 7
y: 0, 14
labels: horizontal layer heated from below (Hollands); vertical slot, H/S = 20 (MacGregor–Emery, Nu >= 1)
caption: Two enclosure correlations against $\log _ { 1 0 } \mathrm { R a } _ { S }$ . **The horizontal layer heated from below is motionless — $\mathrm { N u } = 1$ , pure conduction — until $\mathrm { R a } _ { S } = 1 7 0 8$ , then climbs steeply as the cells form.** **The vertical slot has no threshold, but its circulation only begins to matter above about $\mathrm { R a } _ { S } \approx 1 0 ^ { 3 }$ – $1 0 ^ { 4 }$ , and the taller the slot the later it matters.** **Read the design consequence for a $1 2 \ \mathrm { m m }$ vertical air gap at $1 0 \ \mathrm { K }$ : $\mathrm { R a } _ { S } \approx 2 0 0 0$ , so the gas layer is a pure conduction resistance with conductance $k / S \approx 2 . 1 \ \mathrm { W / m ^ { 2 } K }$ — and the radiation across it, about $3 . 7 \ \mathrm { W / m ^ { 2 } K }$ for uncoated glass, is the larger part of the gap's conductance.**
:::

::: example A double-glazed unit {#ex-window}
A vertical double-glazed window has a $1 2 \ \mathrm { m m }$ air gap, $1 . 0 \ \mathrm { m }$ tall, with the inner pane at $1 5 \ \ {} ^ { \circ } \mathrm { C }$ and the outer at $5 \ \ {} ^ { \circ } \mathrm { C }$. Find the heat flux carried by the gas across the gap, compare it with the same gap filled with argon, and estimate the window's $U$-value.
::: solution
**Film temperature** $1 0 \ \ {} ^ { \circ } \mathrm { C } = 2 8 3 \ \mathrm { K }$ : air $\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 0 7 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 5 1 \ \mathrm { W / m \, K }$ , $\beta = 1 / 2 8 3$ .
$$
\mathrm { R a } _ { S } = { \frac { 9 . 8 1 \times 3 . 5 3 \times 1 0 ^ { - 3 } \times 1 0 \times 0 . 0 1 2 ^ { 3 } } { 1 . 4 6 \times 1 0 ^ { - 5 } \times 2 . 0 7 \times 1 0 ^ { - 5 } } } = 1 9 8 0 \qquad { \frac { H } { S } } = { \frac { 1 . 0 } { 0 . 0 1 2 } } = 8 3
$$
**This is below the range of the vertical-cavity correlation, and evaluating it anyway gives $0 . 4 2 \times 1 9 8 0 ^ { 1 / 4 } \times 0 . 7 ^ { 0 . 0 1 2 } \times 8 3 ^ { - 0 . 3 } = 0 . 7 4 < 1$ : the slow cell in the gap carries nothing worth counting, and the gap is a conduction layer.**
$$
\mathrm { N u } _ { S } \approx 1 \qquad h _ { \text{gap} } = { \frac { k } { S } } = { \frac { 0 . 0 2 5 1 } { 0 . 0 1 2 } } = \mathbf { 2 . 0 9 \ \mathrm { W / m ^ { 2 } K } } \qquad q ^ { \prime \prime } = 2 0 . 9 \ \mathrm { W / m ^ { 2 } }
$$
**Argon at the same temperature has $k = 0 . 0 1 7 2$ , $\nu = 1 . 2 5 \times 1 0 ^ { - 5 }$ , $\alpha = 1 . 9 2 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , so $\mathrm { R a } _ { S } \approx 2 5 0 0$ — still conduction — and**
$$
h _ { \text{argon} } = { \frac { 0 . 0 1 7 2 } { 0 . 0 1 2 } } = 1 . 4 3 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = 1 4 . 3 \ \mathrm { W / m ^ { 2 } } \qquad \text{versus } 2 0 . 9 \text{ for air: } 3 1 \ \ \% \text{ less}
$$
**In the conduction regime the gas fill pays exactly in proportion to its conductivity.** **But the gas is not the whole gap: two uncoated panes ($\varepsilon = 0 . 8 4$) also exchange $h _ { r } \approx 4 \sigma T ^ { 3 } / ( 2 / \varepsilon - 1 ) = 3 . 7 \ \mathrm { W / m ^ { 2 } K }$ by radiation.** **With the standard surface resistances of $0 . 1 3$ (inside) and $0 . 0 4 \ \mathrm { m ^ { 2 } K / W }$ (outside):**
$$
{ \frac { 1 } { U } } = 0 . 1 3 + { \frac { 1 } { 2 . 0 9 + 3 . 7 } } + 0 . 0 4 \ \Rightarrow \ U = 2 . 9 \ \mathrm { W / m ^ { 2 } K } \ \text{(air)} , \quad 2 . 7 5 \ \text{(argon)}
$$
**— a mere $5 \ \ \%$ gain from the argon, because radiation dominates the gap.** **Add a low-emissivity coating ($\varepsilon = 0 . 0 4$ on one pane) and $h _ { r }$ falls to $0 . 2 \ \mathrm { W / m ^ { 2 } K }$ : now $U = 1 . 6 5$ with air and $1 . 2 8$ with argon, and the gas fill is worth $2 2 \ \ \%$ .** **That is why every modern unit has both, and why a single pane, at $1 / U = 0 . 1 3 + 0 . 0 4$ , $U = 5 . 9 \ \mathrm { W / m ^ { 2 } K }$ , loses twice to five times as much.**
:::
:::

## Channels and fins: the spacing question

::: definition An array of parallel plates {#def-array}
A vertical heat sink is an array of $n$ isothermal plates of height $L$ , spacing $S$ and width $W$ . **Two asymptotes and one interpolation describe it well enough to design with.** Define the channel Rayleigh number on the gap and the Elenbaas group $\mathrm { El } = \mathrm { R a } _ { S } \, S / L$ :
$$
S \text{ large: } h \to h _ { \infty } \text{ (isolated vertical plate)} \qquad S \text{ small: } \mathrm { Nu } _ { S } \to { \frac { \mathrm { El } } { 2 4 } } \ \text{(fully developed channel: the air leaves at the plate temperature)}
$$
**The narrow-channel limit is the important surprise: as the gap closes, the coefficient does not rise towards $k / S$ — it collapses as $S ^ { 3 }$ , because the buoyant flow through a narrow slot is tiny and the air saturates at the plate temperature long before it reaches the top.** Bar-Cohen and Rohsenow's composite of the two limits, for symmetric isothermal plates, is
$$
\boxed { \; \mathrm { Nu } _ { S } = { \frac { h S } { k } } = \left[ { \frac { 5 7 6 } { \mathrm { El } ^ { 2 } } } + { \frac { 2 . 8 7 3 } { \mathrm { El } ^ { 1 / 2 } } } \right] ^ { - 1 / 2 } \; } \qquad \mathrm { El } = { \frac { g \beta \Delta T S ^ { 4 } } { \nu \alpha L } }
$$
**where $\Delta T$ is the plate-to-ambient difference and $L$ the plate height.** **Note the length in $\mathrm { R a } _ { S }$ : it is the gap $S$ , not the height, because it is the gap that decides whether the air can get through.**
**The design question is not the largest $h$ but the largest total heat from a fixed envelope:** more fins means more area but narrower gaps and lower $h$ . **Maximising $h \times$ (number of channels) for a fixed width gives Bar-Cohen and Rohsenow's (1984) optimum spacing:**
$$
\boxed { \; S _ { \text{opt} } = 2 . 7 1 4 \left( { \frac { g \beta \Delta T } { \nu \alpha L } } \right) ^ { - 1 / 4 } = 2 . 7 1 4 \, { \frac { L } { \mathrm { R a } _ { L } ^ { 1 / 4 } } } \; } \qquad \mathrm { Nu } _ { S } ( S _ { \text{opt} } ) \approx 1 . 3 1
$$
**For air this is $6$ to $1 2 \ \mathrm { m m }$ over the range of sizes and temperature differences that passive cooling deals with, because $S _ { \text{opt} } \propto ( L / \Delta T ) ^ { 1 / 4 }$ barely moves.** **This is why catalogues of passive extrusions have fin gaps of $6$ to $1 2 \ \mathrm { m m }$ and why the same catalogues offer $2 \ \mathrm { m m }$ gaps for forced flow.**
**Three honest caveats.** **(i) The optimum is flat.** **For the sink plotted below, the heat per unit base area is within about $1 0 \ \ \%$ of its maximum anywhere between about $6 . 5$ and $1 0 . 5 \ \mathrm { m m }$ — so you may choose the spacing for the reason you will actually choose it for, the extrusion die you can buy.** **(ii) Below the optimum the penalty is steep** — the $S ^ { 3 }$ collapse — **and above it gentle; when in doubt, err wide.** **(iii) Dust, moisture and cost are the real constraints.** **A $4 \ \mathrm { m m }$ gap in a room with a carpet is a felt filter, and a design that sits exactly at the optimum is worth little if the part has to be blown out every year.**
:::

::: widget plot
title: Channel coefficient and sink conductance against fin spacing (natural convection)
f: 28.37/x*pow(576/pow(0.018*pow(x,4),2)+2.873/sqrt(0.018*pow(x,4)),-0.5); 100*28.37/x*pow(576/pow(0.018*pow(x,4),2)+2.873/sqrt(0.018*pow(x,4)),-0.5)/(x+1.5); 5.49
x: 2, 20
y: 0, 60
labels: channel coefficient h(S), W/m2K (Bar-Cohen and Rohsenow); conductance per unit base area with 50 mm fins, W/m2K; isolated plate h_infinity
caption: Vertical fins $1 0 0 \ \mathrm { m m }$ tall, $1 . 5 \ \mathrm { m m }$ thick and $5 0 \ \mathrm { m m }$ deep, $3 0 \ \mathrm { K }$ above $4 0 \ \ {} ^ { \circ } \mathrm { C }$ air, against fin spacing in millimetres (fin efficiency taken as one). **The lower curve is the channel coefficient: it collapses below about $5 \ \mathrm { m m }$ , where the air in the slot saturates at the fin temperature, and approaches the isolated-plate value $h _ { \infty } \approx 5 . 5 \ \mathrm { W / m ^ { 2 } K }$ above $1 5 \ \mathrm { m m }$ .** **The upper curve is what matters — $h$ times the fin area that fits on a square metre of base — and it peaks at $S \approx 7 . 5$ – $8 \ \mathrm { m m }$ , the Bar-Cohen–Rohsenow optimum $S _ { \text{opt} } = 7 . 4 \ \mathrm { m m }$ .** **Read the flatness: between about $6 . 5$ and $1 0 . 5 \ \mathrm { m m }$ the conductance stays within about $1 0 \ \ \%$ of its peak, less than the uncertainty of the correlation itself.**
:::

::: example Designing a passive sink {#ex-sink-nat}
A $1 5 \ \mathrm { W }$ device is to run at no more than $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $4 0 \ \ {} ^ { \circ } \mathrm { C }$ enclosure, on a vertical $1 0 0 \times 1 0 0 \ \mathrm { m m }$ base with straight vertical fins that run the full $1 0 0 \ \mathrm { m m }$ height and project $5 0 \ \mathrm { m m }$ from the base. **Choose the fin spacing and count the fins.** Aluminium, $k = 1 8 0 \ \mathrm { W / m \, K }$ , fin thickness $1 . 5 \ \mathrm { m m }$ .
::: solution
**Start from the optimum spacing.** With $L = 0 . 1 0 0 \ \mathrm { m }$ and a guessed $\Delta T = 3 0 \ \mathrm { K }$ (film $5 5 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 8 7 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 6 6 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 8 4 \ \mathrm { W / m \, K }$ , $\beta = 1 / 3 2 8 \ \mathrm { K ^ { - 1 } }$ ): $\mathrm { R a } _ { L } = 1 . 8 0 \times 1 0 ^ { 6 }$ .
$$
S _ { \text{opt} } = 2 . 7 1 4 \times { \frac { 0 . 1 0 0 } { \left( 1 . 8 0 \times 1 0 ^ { 6 } \right) ^ { 1 / 4 } } } = 7 . 4 \ \mathrm { m m } \qquad \text{take } S = 8 \ \mathrm { m m } : \quad n = 1 1 \ \text{fins} \ \left( 1 1 \times 1 . 5 + 1 0 \times 8 = 9 6 . 5 \ \mathrm { m m } \right)
$$
**Coefficient at that spacing:** $\mathrm { El } = \mathrm { R a } _ { S } S / L = 9 2 2 \times 0 . 0 8 = 7 3 . 7$ , so $\mathrm { Nu } _ { S } = \left[ 5 7 6 / 7 3 . 7 ^ { 2 } + 2 . 8 7 3 / 7 3 . 7 ^ { 1 / 2 } \right] ^ { - 1 / 2 } = 1 . 5 1$ and $h = 1 . 5 1 \times 0 . 0 2 8 4 / 0 . 0 0 8 = 5 . 3 \ \mathrm { W / m ^ { 2 } K }$ . **Fin efficiency:** $m = { \sqrt { 2 h / k t } } = { \sqrt { 2 \times 5 . 3 / ( 1 8 0 \times 0 . 0 0 1 5 ) } } = 6 . 3 \ \mathrm { m ^ { - 1 } }$ , $m H = 0 . 3 1$ , $\eta _ { f } = \tanh 0 . 3 1 / 0 . 3 1 = 0 . 9 7$ .
$$
A _ { f } = 1 1 \times 2 \times 0 . 0 5 0 \times 0 . 1 0 0 = 0 . 1 1 0 \ \mathrm { m ^ { 2 } } \qquad A _ { b } \approx 0 . 0 1 0 \ \mathrm { m ^ { 2 } } \ \text{(exposed base plus fin tips)}
$$
$$
Q = h \left( \eta _ { f } A _ { f } + A _ { b } \right) \Delta T = 5 . 3 \times ( 0 . 9 7 \times 0 . 1 1 0 + 0 . 0 1 0 ) \, \Delta T = 0 . 6 2 \, \Delta T \qquad \Longrightarrow \qquad \Delta T = { \frac { 1 5 } { 0 . 6 2 } } = 2 4 \ \mathrm { K }
$$
**Iterate, because $h$ depends on $\Delta T$ :** at about $2 5 \ \mathrm { K }$ the channel coefficient is $5 . 0 \ \mathrm { W / m ^ { 2 } K }$ , the conductance $0 . 5 9 \ \mathrm { W / K }$ , and $\Delta T = \mathbf { 2 6 \ K }$ . **The device runs at about $6 6 \ \ {} ^ { \circ } \mathrm { C }$ with $4 \ \mathrm { K }$ of margin, and with a $5 \ \mathrm { mm }$ base plate the sink weighs about $0 . 3 6 \ \mathrm { k g }$ .** **Two comparisons that put it in perspective.** **The bare $1 0 0 \times 1 0 0 \ \mathrm { m m }$ base, at $h$ of order $6$ to $8 \ \mathrm { W / m ^ { 2 } K }$ , would need a rise of roughly $2 0 0 \ \mathrm { K }$ to shed $1 5 \ \mathrm { W }$ by convection — the fins are worth a factor of about eight.** **And at $S = 5 \ \mathrm { m m }$ (sixteen fins, $4 5 \ \ \%$ more area) the channel coefficient would collapse to about $2 . 4 \ \mathrm { W / m ^ { 2 } K }$ and the sink would run hotter, not cooler: more metal is not more cooling when the air cannot get through.** **Radiation from an anodised sink would add a useful margin, though less than the area suggests, because the fins mostly see each other.**
:::
:::

::: example A vented box is a chimney {#ex-chimney}
An electronics enclosure $3 0 0 \ \mathrm { m m }$ wide, $4 0 0 \ \mathrm { m m }$ tall and $2 0 0 \ \mathrm { m m }$ deep dissipates $4 0 \ \mathrm { W }$ inside. It is vented at top and bottom, and the inside is allowed to run $2 0 \ \mathrm { K }$ above the room. **How much vent area is needed, and how much of the heat does the chimney carry?**
::: solution
**The driving pressure is the weight difference between the inside column and the outside one, over the height between the two vents.**
$$
\Delta p = g H \left( \rho _ { o } - \rho _ { i } \right) = g H \rho _ { o } { \frac { \Delta T } { T _ { o } } } = 9 . 8 1 \times 0 . 4 0 0 \times 1 . 2 0 4 \times { \frac { 2 0 } { 2 9 3 } } = \mathbf { 0 . 3 2 \ \mathrm { P a } }
$$
**That is a third of a pascal: the pressure of a column of water a thirtieth of a millimetre high, and about a thousandth of what a small fan gives.** **With equal inlet and outlet vents of area $A$ in series, each takes half of it, and the orifice equation with $C _ { d } = 0 . 7$ for a sharp-edged hole gives:**
$$
u = C _ { d } { \sqrt { \frac { 2 \left( \Delta p / 2 \right) } { \rho _ { i } } } } = 0 . 7 \times { \sqrt { \frac { 0 . 3 2 } { 1 . 1 3 } } } = 0 . 3 7 \ \mathrm { m / s } \qquad { \dot { m } } = \rho _ { i } u A
$$
$$
Q = { \dot { m } } c _ { p } \Delta T = 1 . 1 3 \times 0 . 3 7 \times A \times 1 0 0 7 \times 2 0 = 8 5 0 0 \ A \ \mathrm { W } \quad ( A \text{ in } \mathrm { m ^ { 2 } } )
$$
$$
A = 5 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 4 . 3 \ \mathrm { W } \qquad A = 1 0 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 8 . 5 \ \mathrm { W } \qquad A = 3 0 0 0 \ \mathrm { m m ^ { 2 } } \Rightarrow 2 6 \ \mathrm { W }
$$
**Meanwhile the box's own skin — $0 . 5 2 \ \mathrm { m ^ { 2 } }$ of sheet — sheds heat from its outside by convection and radiation; at a skin about $1 0 \ \mathrm { K }$ above the room and a combined coefficient near $1 0 \ \mathrm { W / m ^ { 2 } K }$ that is of order $5 0 \ \mathrm { W }$ .** **So the answer to the design question is: for the chimney alone to carry the whole $4 0 \ \mathrm { W }$ you need $4 0 / 8 5 0 0 = 4 7 0 0 \ \mathrm { m m ^ { 2 } }$ — about $4 7 \ \mathrm { c m ^ { 2 } }$ at top and at bottom, which is a grille, not a hole, and which costs the IP rating you were paying for.** **Three rules come out of this arithmetic.** **(i) Stack velocity goes as $\sqrt { H \Delta T }$ , and the heat it carries as ${ \dot { m } } \Delta T \propto H ^ { 1 / 2 } \Delta T ^ { 3 / 2 }$ , so a tall thin box vents better than a squat fat one at the same volume.** **(ii) The vent must be split top-and-bottom; a single hole at the top carries nothing, because the flow has no loop.** **(iii) Anything that restricts the vents — a filter, a gasket lip, a cable tray in front of them — enters directly through $C _ { d }$ : halving the effective discharge coefficient halves the flow and the cooling.**
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
\text{Regime} & \mathrm { G r } / \mathrm { R e } ^ { 2 } & \text{Air, } 1 0 0 \ \mathrm { m m } \text{ plate, } \Delta T = 3 0 \ \mathrm { K } \left( \mathrm { G r } = 3 . 4 \times 1 0 ^ { 6 } \right) & \text{Combined law} \\
\text{Forced} & < 0 . 1 & U > 1 . 0 \ \mathrm { m / s } & \text{forced correlation alone} \\
\text{Mixed} & 0 . 1 - 1 0 & 0 . 1 < U < 1 . 0 \ \mathrm { m / s } & \text{combine} \\
\text{Natural} & > 1 0 & U < 0 . 1 \ \mathrm { m / s } & \text{natural correlation alone}
\end{array}
$$
**For aiding flow (surface facing up in a rising stream, hot vertical plate in an upward current) the standard combination is**
$$
\mathrm { N u } ^ { 3 } = \mathrm { N u } _ { \text{forced} } ^ { 3 } + \mathrm { N u } _ { \text{natural} } ^ { 3 } \qquad \text{(aiding)} \qquad \mathrm { N u } ^ { 3 } = \left| \mathrm { N u } _ { \text{forced} } ^ { 3 } - \mathrm { Nu } _ { \text{natural} } ^ { 3 } \right| \qquad \text{(opposing)}
$$
**Four things to take from this block.** **(i) The $U ^ { 2 }$ in the denominator is the whole story:** mixed convection is a low-speed phenomenon, and it occupies the band $0 . 0 5$ to $0 . 5 \ \mathrm { m / s }$ in air, which is exactly the speed range of a room, a cable tray, a rack's leakage flow and the wind over a parked vehicle. **(ii) Aiding flow is nearly always safe:** the combined coefficient is never below either part, and where the two parts are equal it is $2 ^ { 1 / 3 } = 1 . 2 6$ times either. **(iii) Opposing flow is not safe.** **A downward forced flow over a hot upward-facing surface can give a coefficient far below either calculation — the two layers cancel, the flow reverses inside the layer, and a laminar opposing layer is steady but nearly insulating.** **Worst of all, opposing mixed convection can be bistable: two solutions at the same flow rate, which is why "the temperature oscillates and we cannot reproduce it on test" is a mixed-convection symptom.** **(iv) The combination exponents are empirical and $\pm 2 5 \ \ \%$ ;** $n = 3$ for aiding and $n = 2$ to $3$ for opposing are the usual recommendations, and where the case matters the answer is a hot-wire anemometer and not a formula.
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

::: exercise A warm wall {#ex-nat-wall level=1 check="18.4"}
A $3 0 0 \times 3 0 0 \ \mathrm { m m }$ vertical plate is held at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ in a room at $2 0 \ \ {} ^ { \circ } \mathrm { C }$. Find the average coefficient and the heat loss from one face. (Enter the heat loss in W.)
::: solution
**Film temperature** $4 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 7 0 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 3 9 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 0 2 7 2 \ \mathrm { W / m \, K }$ , $\beta = 1 / 3 1 3 \ \mathrm { K ^ { - 1 } }$ .
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 9 \times 1 0 ^ { - 3 } \times 4 0 \times 0 . 3 0 0 ^ { 3 } } { 1 . 7 0 \times 1 0 ^ { - 5 } \times 2 . 3 9 \times 1 0 ^ { - 5 } } } = 8 . 3 \times 1 0 ^ { 7 } \qquad ( \text{laminar} )
$$
$$
{ \overline { { \mathrm { N u } } } } = 0 . 5 9 \times \left( 8 . 3 \times 1 0 ^ { 7 } \right) ^ { 1 / 4 } = 5 6 . 3 \qquad { \overline { { h } } } = { \frac { 5 6 . 3 \times 0 . 0 2 7 2 } { 0 . 3 0 0 } } = 5 . 1 \ \mathrm { W / m ^ { 2 } K } \qquad q = 5 . 1 \times 0 . 0 9 \times 4 0 = \mathbf { 1 8 . 4 \ W }
$$
**Churchill–Chu gives $5 . 2 \ \mathrm { W / m ^ { 2 } K }$ , within $2 \ \ \%$ , because $8 . 3 \times 1 0 ^ { 7 }$ is comfortably inside the laminar band.** **Radiation at $\varepsilon = 0 . 9$ would add $q _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 3 3 ^ { 4 } - 2 9 3 ^ { 4 } ) \times 0 . 0 9 = 2 3 \ \mathrm { W }$ , more than the convection itself: the $1 8 . 4 \ \mathrm { W }$ is the answer to the question asked, and the $4 1 \ \mathrm { W }$ is the answer to the question a designer needs.**
:::
:::

::: exercise Turn it over {#ex-nat-updown level=1 check="26"}
A $4 0 0 \times 4 0 0 \ \mathrm { m m }$ horizontal plate is at $7 0 \ \ {} ^ { \circ } \mathrm { C }$ in a $2 0 \ \ {} ^ { \circ } \mathrm { C }$ room. Find the heat loss from its upper face when the hot side faces up, and when it faces down. (Enter the facing-down value in W.)
::: solution
$L _ { c } = A _ { s } / P _ { s } = 0 . 1 6 / 1 . 6 = 0 . 1 0 0 \ \mathrm { m }$ . **Film** $4 5 \ \ {} ^ { \circ } \mathrm { C }$ : $k = 0 . 0 2 7 6 \ \mathrm { W / m \, K }$ , $\nu = 1 . 7 5 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 4 7 \times 1 0 ^ { - 5 }$ , $\beta = 1 / 3 1 8$ .
$$
\mathrm { R a } _ { L _ { c } } = { \frac { 9 . 8 1 \times 3 . 1 4 \times 1 0 ^ { - 3 } \times 5 0 \times 0 . 1 0 0 ^ { 3 } } { 1 . 7 5 \times 1 0 ^ { - 5 } \times 2 . 4 7 \times 1 0 ^ { - 5 } } } = 3 . 6 \times 1 0 ^ { 6 }
$$
$$
\text{up: } \ { \overline { { h } } } = { \frac { 0 . 5 4 \times ( 3 . 6 \times 1 0 ^ { 6 } ) ^ { 1 / 4 } \times 0 . 0 2 7 6 } { 0 . 1 0 0 } } = 6 . 5 \ \mathrm { W / m ^ { 2 } K } \qquad q = 6 . 5 \times 0 . 1 6 \times 5 0 = 5 2 \ \mathrm { W }
$$
$$
\text{down: } \ { \overline { { h } } } = { \frac { 0 . 2 7 } { 0 . 5 4 } } \times 6 . 5 = 3 . 2 \ \mathrm { W / m ^ { 2 } K } \qquad q = \mathbf { 2 6 \ W }
$$
**The factor of two is the stability of the layer, and it is worth knowing which face of your part is which.** **Note that the plate loses $5 2 \ \mathrm { W }$ from the top and $2 6$ from the bottom, so a plate suspended in a room loses $7 8 \ \mathrm { W }$ by convection and its top face does two thirds of the work — which is why a hot surface's *upper* neighbour is always the one that overheats.**
:::
:::

::: exercise A painted steam pipe {#ex-nat-pipe level=2 check="319"}
A $8 0 \ \mathrm { m m }$ OD steam pipe at $1 1 0 \ \ {} ^ { \circ } \mathrm { C }$ runs through a $2 5 \ \ {} ^ { \circ } \mathrm { C }$ room; the surface is painted, $\varepsilon = 0 . 9$ . Find the heat loss per metre, including radiation. (Enter W/m, rounded.)
::: solution
**Film** $6 7 . 5 \ \ {} ^ { \circ } \mathrm { C } \approx 7 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 9 9 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 9 7$ , $\mathrm { P r } = 0 . 7 0 3$ , $\alpha = 2 . 8 3 \times 1 0 ^ { - 5 }$ , $\beta = 1 / 3 4 3$ .
$$
\mathrm { R a } _ { D } = { \frac { 9 . 8 1 \times 2 . 9 2 \times 1 0 ^ { - 3 } \times 8 5 \times 0 . 0 8 0 ^ { 3 } } { 1 . 9 9 \times 1 0 ^ { - 5 } \times 2 . 8 3 \times 1 0 ^ { - 5 } } } = 2 . 2 \times 1 0 ^ { 6 } \qquad { \overline { { \mathrm { N u } } } } _ { D } = \left\{ 0 . 6 0 + { \frac { 0 . 3 8 7 \times \left( 2 . 2 \times 1 0 ^ { 6 } \right) ^ { 1 / 6 } } { 1 . 2 0 5 } } \right\} ^ { 2 } = 1 8 . 2
$$
$$
h _ { c } = { \frac { 1 8 . 2 \times 0 . 0 2 9 7 } { 0 . 0 8 0 } } = 6 . 7 5 \ \mathrm { W / m ^ { 2 } K } \qquad h _ { r } = 0 . 9 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 3 8 3 + 2 9 8 ) \left( 3 8 3 ^ { 2 } + 2 9 8 ^ { 2 } \right) = 8 . 2 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q ^ { \prime } = ( 6 . 7 5 + 8 . 1 8 ) \times \pi \times 0 . 0 8 0 \times 8 5 = \mathbf { 3 1 9 \ W / m } \qquad \text{radiation } 5 5 \ \ \%
$$
**The total is $3 1 9 \ \mathrm { W / m }$ , of which $1 7 5 \ \mathrm { W / m }$ — $5 5 \ \%$ — is radiation from a surface whose emissivity is the one property in the calculation that nobody measures.** **A $4 0 \ \mathrm { m }$ run of this bare pipe costs $1 3 \ \mathrm { k W }$ continuously, which is why the lagging pays for itself in one heating season and why an infrared survey of bare pipework is one of the cheapest energy audits a plant engineer can run.**
:::
:::

::: exercise Two gaps {#ex-nat-gap level=2 check="26"}
A vertical enclosure $1 . 2 \ \mathrm { m }$ tall has a $2 0 \ \mathrm { m m }$ air gap with $1 5 \ \mathrm { K }$ across it. Find the convective heat flux with the MacGregor–Emery correlation. Then repeat for a $5 0 \ \mathrm { m m }$ gap. (Enter the second heat flux in $\mathrm { W / m ^ { 2 } }$ .)
::: solution
**Film** $1 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 1 . 4 6 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 0 7 \times 1 0 ^ { - 5 }$ , $k = 0 . 0 2 5 1$ , $\beta = 1 / 2 8 3$ .
$$
S = 2 0 \ \mathrm { m m } : \quad \mathrm { R a } _ { S } = { \frac { 9 . 8 1 \times 3 . 5 3 \times 1 0 ^ { - 3 } \times 1 5 \times 0 . 0 2 0 ^ { 3 } } { 1 . 4 6 \times 1 0 ^ { - 5 } \times 2 . 0 7 \times 1 0 ^ { - 5 } } } = 1 . 3 8 \times 1 0 ^ { 4 } \qquad { \frac { H } { S } } = 6 0
$$
$$
\mathrm { N u } _ { S } = 0 . 4 2 \times \left( 1 . 3 8 \times 1 0 ^ { 4 } \right) ^ { 1 / 4 } \times 0 . 7 ^ { 0 . 0 1 2 } \times 6 0 ^ { - 0 . 3 } = 1 . 3 3 \qquad h = 1 . 3 3 \times { \frac { 0 . 0 2 5 1 } { 0 . 0 2 0 } } = 1 . 6 6 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = 2 5 \ \mathrm { W / m ^ { 2 } }
$$
$$
S = 5 0 \ \mathrm { m m } : \quad \mathrm { R a } _ { S } = 2 . 1 5 \times 1 0 ^ { 5 } , \ { \frac { H } { S } } = 2 4 , \ \mathrm { N u } _ { S } = 3 . 4 7 , \ h = 1 . 7 4 \ \mathrm { W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = \mathbf { 2 6 \ W / m ^ { 2 } }
$$
**($H / S = 6 0$ is a little beyond the correlation's stated range of $4 0$ ; the trend is what matters.)** **Widening the gap two and a half times leaves the flux essentially unchanged: in the convecting regime $\mathrm { Nu } _ { S }$ grows almost exactly in proportion to $S$ , so the extra conduction length buys nothing.** **Pure conduction would have given $1 8 . 8$ and $7 . 5 \ \mathrm { W / m ^ { 2 } }$ — which is why insulating gaps are kept thin enough to stay near the conduction regime, and why a wide air space is not insulation.**
:::
:::

::: exercise A solar collector on a roof {#ex-nat-solar level=2 check="430"}
The absorber of a flat-plate collector is $1 . 0 \times 2 . 0 \ \mathrm { m }$ at $6 0 \ \ {} ^ { \circ } \mathrm { C }$, in windless air at $1 0 \ \ {} ^ { \circ } \mathrm { C }$. Find the convective loss when the collector is flat on a $3 5 ^ { \circ }$ roof, treating the panel as an inclined plate, and again when it is mounted vertically. (Enter the inclined loss in W.)
::: solution
**The inclination enters as $g \cos \gamma$ with $\gamma$ measured from the vertical (valid up to about $6 0 ^ { \circ }$ ), and the length is the $1 . 0 \ \mathrm { m }$ slope dimension.** **Film** $3 5 \ \ {} ^ { \circ } \mathrm { C }$ : $k = 0 . 0 2 6 8 \ \mathrm { W / m \, K }$ , $\nu = 1 . 6 6 \times 1 0 ^ { - 5 }$ , $\alpha = 2 . 3 2 \times 1 0 ^ { - 5 }$ , $\beta = 1 / 3 0 8$ .
$$
\gamma = 5 5 ^ { \circ } \text{ from the vertical}: \quad \mathrm { R a } _ { L } = { \frac { 9 . 8 1 \cos 5 5 ^ { \circ } \times 3 . 2 5 \times 1 0 ^ { - 3 } \times 5 0 \times 1 . 0 ^ { 3 } } { 1 . 6 6 \times 1 0 ^ { - 5 } \times 2 . 3 2 \times 1 0 ^ { - 5 } } } = 2 . 4 \times 1 0 ^ { 9 }
$$
**This is above $1 0 ^ { 9 }$ , so the layer is turbulent and the $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$ law does not apply; use Churchill–Chu, which spans the transition.**
$$
{ \overline { { \mathrm { N u } } } } = \left\{ 0 . 8 2 5 + { \frac { 0 . 3 8 7 \times \left( 2 . 4 \times 1 0 ^ { 9 } \right) ^ { 1 / 6 } } { 1 . 1 9 3 } } \right\} ^ { 2 } = 1 6 1 \qquad { \overline { { h } } } = { \frac { 1 6 1 \times 0 . 0 2 6 8 } { 1 . 0 } } = 4 . 3 \ \mathrm { W / m ^ { 2 } K }
$$
$$
q = 4 . 3 \times 2 . 0 \times 5 0 = \mathbf { 4 3 0 \ W } \qquad \text{vertical: } \ \mathrm { R a } = 4 . 1 \times 1 0 ^ { 9 } \ , \ { \overline { { h } } } = 5 . 1 \ , \ q = 5 1 2 \ \mathrm { W }
$$
**Tilting the panel $5 5 ^ { \circ }$ from the vertical reduces the convective loss by only $1 6 \ \ \%$ — and $4 3 0 \ \mathrm { W }$ of convection from an unglazed absorber that intercepts perhaps $1 4 0 0 \ \mathrm { W }$ of sun is nearly a third of its input gone, which is why real collectors are glazed and the glazing gap, not the tilt, is where the design effort goes.** **Note the size of the Rayleigh number: at a metre and $5 0 \ \mathrm { K }$ the flow is past transition, and a designer who applies the laminar $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$ law here gets $h = 3 . 5$ , about $2 0 \ \ \%$ low.**
:::
:::

::: exercise Water, not air {#ex-nat-water level=2 check="720"}
A $0 . 6 \ \mathrm { m }$ vertical tank wall sits in water at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and is held at $6 0 \ \ {} ^ { \circ } \mathrm { C }$. Estimate the coefficient with the turbulent McAdams law. (Water at the film temperature $4 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\nu = 0 . 6 5 8 \times 1 0 ^ { - 6 } \ \mathrm { m ^ { 2 } / s }$ , $k = 0 . 6 3 1 \ \mathrm { W / m \, K }$ , $\mathrm { P r } = 4 . 3$ , $\beta = 3 . 8 \times 1 0 ^ { - 4 } \ \mathrm { K ^ { - 1 } }$ , $\alpha = 1 . 5 1 \times 1 0 ^ { - 7 } \ \mathrm { m ^ { 2 } / s }$ . Enter $\mathrm { W / m ^ { 2 } K }$ .)
::: solution
$$
\mathrm { R a } _ { L } = { \frac { 9 . 8 1 \times 3 . 8 \times 1 0 ^ { - 4 } \times 4 0 \times 0 . 6 0 0 ^ { 3 } } { 0 . 6 5 8 \times 1 0 ^ { - 6 } \times 1 . 5 1 \times 1 0 ^ { - 7 } } } = 3 . 2 4 \times 1 0 ^ { 1 1 } \qquad ( \text{turbulent, far above } 1 0 ^ { 9 } )
$$
$$
{ \overline { { \mathrm { N u } } } } = 0 . 1 0 \times \left( 3 . 2 4 \times 1 0 ^ { 1 1 } \right) ^ { 1 / 3 } = 6 8 7 \qquad { \overline { { h } } } = { \frac { 6 8 7 \times 0 . 6 3 1 } { 0 . 6 0 0 } } = \mathbf { 7 2 0 \ W / m ^ { 2 } K }
$$
**Three checks on an answer that looks too big.** **It is not: the same wall in air gives about $5 \ \mathrm { W / m ^ { 2 } K }$ , and the ratio is what the properties predict — twenty-three times the conductivity and a Rayleigh number five hundred times larger.** **Churchill–Chu gives $9 8 0 \ \mathrm { W / m ^ { 2 } K }$ for the same wall — a reminder that correlations disagree by tens of per cent at large $\mathrm { R a }$ in liquids. The laminar law would have given $0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } k / L = 4 7 0 \ \mathrm { W / m ^ { 2 } K }$ , too low, because $\mathrm { R a } _ { L } = 3 \times 1 0 ^ { 1 1 }$ is hundreds of times the transition value: in liquids, ordinary heights and ordinary temperature differences are turbulent, and the $1 / 4$ power law is rarely the right one.** **And watch $\beta$ , which for water is not a constant: $2 . 1 \times 1 0 ^ { - 4 }$ at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ and $5 . 1 \times 1 0 ^ { - 4 }$ at $6 0 \ \ {} ^ { \circ } \mathrm { C }$ , so a coefficient built at the wrong film temperature is out by up to $( 5 . 1 / 2 . 1 ) ^ { 1 / 3 } = 1 . 3 4$ in the turbulent regime and $1 . 2 5$ in the laminar one.** **The lesson is the one about water: natural convection in a liquid is two orders of magnitude stronger than in a gas.** **A tank wall $4 0 \ \mathrm { K }$ above the water loses $2 9 \ \mathrm { k W }$ per square metre into the water; the same wall in air loses $2 0 0 \ \mathrm { W }$ . Any "natural convection in air" number applied to a liquid is wrong by that factor.**
:::
:::

::: exercise How tall, how wide {#ex-nat-scale level=3 check="1375"}
A vertical plate $1 \ \mathrm { m }$ tall in air is $1 1 \ \mathrm { K }$ above the room. **A model at one-fifth scale is to be tested with the same Rayleigh number.** Find the required $\Delta T$ for the model, and the ratio of the model's coefficient to the prototype's. (Enter $\Delta T$ in K.)
::: solution
$$
\mathrm { R a } = { \frac { g \beta \Delta T L ^ { 3 } } { \nu \alpha } } \quad \text{equal} \quad \Longrightarrow \quad \Delta T _ { m } = \Delta T _ { p } \left( { \frac { L _ { p } } { L _ { m } } } \right) ^ { 3 } = 1 1 \times 5 ^ { 3 } = \mathbf { 1 3 7 5 \ K }
$$
**Which is impossible — and that is the answer to the question the exercise is really asking.** **Strict similarity in natural convection requires $\Delta T \propto L ^ { - 3 }$ , so a one-fifth model needs $1 3 7 5 \ \mathrm { K }$ in air, and a one-tenth model would need $1 1 \ 0 0 0 \ \mathrm { K }$ ; the property variations alone destroy the experiment long before the geometry is reproduced.** **This is the opposite of forced convection, where matching $\mathrm { R e }$ at one-fifth scale means multiplying the speed by five, which a good tunnel can do.** **The partial escapes are two. $h \propto L ^ { - 1 / 4 }$ is so weak that a model run at the same $\Delta T$ is off by only a factor of $5 ^ { 1 / 4 } = 1 . 5$ in $h$ ; and a working fluid with a much larger $g \beta \Delta T / ( \nu \alpha )$ can restore the Rayleigh number — water instead of air gains a factor of several hundred at the same $\Delta T$ , which is why small-scale water and salt-water models are used to study buoyant flows in buildings.** **The ratio asked for, if the model is run at the same $\Delta T$ , is $h _ { m } / h _ { p } = ( L _ { p } / L _ { m } ) ^ { 1 / 4 } = 5 ^ { 1 / 4 } = \mathbf { 1 . 5 }$ — the model over-cools by $50 \ \ \%$ , which is either a useful margin or a useless result depending on what you are certifying.**
:::
:::

::: exercise Blanking panel or not {#ex-nat-rack level=3 check="4.4"}
An equipment card $2 5 0 \ \mathrm { m m }$ tall stands vertically in a rack. With the rack's fan running, the air speed past the card is $0 . 2 5 \ \mathrm { m / s }$ upward and the card is $3 5 \ \mathrm { K }$ above the inlet air. Compute $\mathrm { G r } _ { L } / \mathrm { R e } _ { L } ^ { 2 }$ (enter this ratio) and state whether the fan is doing anything useful. (Air at the film temperature: $\nu = 1 . 7 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$ , $\beta = 1 / 3 1 5 \ \mathrm { K ^ { - 1 } }$ .)
::: solution
$$
\mathrm { G r } _ { L } = { \frac { 9 . 8 1 \times 3 . 1 7 \times 1 0 ^ { - 3 } \times 3 5 \times 0 . 2 5 0 ^ { 3 } } { \left( 1 . 7 5 \times 1 0 ^ { - 5 } \right) ^ { 2 } } } = 5 . 5 6 \times 1 0 ^ { 7 } \qquad \mathrm { R e } _ { L } = { \frac { 0 . 2 5 \times 0 . 2 5 0 } { 1 . 7 5 \times 1 0 ^ { - 5 } } } = 3 5 7 1
$$
$$
{ \frac { \mathrm { G r } _ { L } } { \mathrm { R e } _ { L } ^ { 2 } } } = { \frac { 5 . 5 6 \times 1 0 ^ { 7 } } { 1 . 2 8 \times 1 0 ^ { 7 } } } = \mathbf { 4 . 4 } \qquad h _ { f } = 3 . 9 \ \mathrm { W / m ^ { 2 } K } \ , \ h _ { n } = 5 . 1 \ \mathrm { W / m ^ { 2 } K } \ , \ h _ { \text{aiding} } = 5 . 8 \ \mathrm { W / m ^ { 2 } K }
$$
**The fan is doing something useful, but only $1 3 \ \%$ more than the card would achieve on its own.** (With $k = 0 . 0 2 7 4 \ \mathrm { W / m \, K}$ and $\mathrm { Pr } = 0 . 7 0 7$ : $h _ { f } = 0 . 6 6 4 \, \mathrm { Re } ^ { 1 / 2 } \mathrm { Pr } ^ { 1 / 3 } k / L$ , $h _ { n } = 0 . 5 9 \, \mathrm { Ra } ^ { 1 / 4 } k / L$ , combined as $\mathrm { Nu } ^ { 3 } = \mathrm { Nu } _ { f } ^ { 3 } + \mathrm { Nu } _ { n } ^ { 3 }$ .) **The forced-only coefficient is $3 . 9$ , the natural-only coefficient is $5 . 1$ , and the fan, at the cost of its power, its noise and its bearing, buys $0 . 7 \ \mathrm { W / m ^ { 2 } K }$ .** **Worse: if a leakage path turns the flow over so that $0 . 2 5 \ \mathrm { m / s }$ descends past the card, the answer becomes $4 . 2$ , and the fan is then making the card hotter than no fan at all.** **This is the arithmetic behind blanking panels: a rack's cooling is not improved by more air but by air that goes where it is aimed, and in the $0 . 1$ to $0 . 5 \ \mathrm { m / s }$ band the direction of the flow matters more than its speed.**
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
**The comparison that matters is with the exponential law.** **A constant $h = 6$ gives $t = \tau \ln ( 2 8 0 / 8 0 )$ with $\tau = \rho c _ { p } L _ { \text{th } } / h = 1 5 9 0 \ \mathrm { s }$ , or $1 9 9 0 \ \mathrm { s }$ — only $1 1 \ \%$ out, because $h$ changes by just $3 7 \ \%$ over the whole run.** **The difference lives in the tail: cooling on from $1 0 0$ to $4 0 \ \ {} ^ { \circ } \mathrm { C }$ takes $2 0 \, 1 4 0 \times ( 2 0 ^ { - 1 / 4 } - 8 0 ^ { - 1 / 4 } ) = 2 7 9 0 \ \mathrm { s }$ , half again as long as the whole $3 0 0$ to $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ run, for less than a third of the temperature drop.** **A $\theta ^ { 5 / 4 }$ body sheds its first two hundred degrees quickly and then crawls.** **Radiation, at $\varepsilon = 0 . 8$ , would carry $q _ { r } = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } \times ( 5 7 3 ^ { 4 } - 2 9 3 ^ { 4 } ) = 4 5 6 0 \ \mathrm { W / m ^ { 2 } }$ at the start against convection's $6 \times ( 2 8 0 / 1 0 0 ) ^ { 1 / 4 } \times 2 8 0 = 2 1 7 0$ : at these temperatures radiation is the main mechanism and convection the correction; integrating both numerically gives a cooling time of about $1 2$ minutes, not thirty.**
:::
:::

::: quiz Still, and moving {#quiz-still}
A vertical plate in air is cooled by natural convection. The plate is replaced by a geometrically similar one four times as tall, at the same temperature difference. What happens to the average coefficient?
- [ ] It is unchanged: $h$ is a property of the fluid pair, not of the part
- [x] It falls by about $4 ^ { 1 / 4 } = 1 . 4$ times, and the heat transfer per unit area falls by the same amount
- [ ] It falls by a factor of two, as it would for forced laminar flow
- [ ] It rises, because a taller plate has a stronger plume

::: solution
**It falls as $L ^ { - 1 / 4 }$ , a factor of $1 . 4$ for four times the height.** $\mathrm { N u } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 } \propto L ^ { 3 / 4 }$ and $h = \mathrm { N u } \, k / L \propto L ^ { - 1 / 4 }$ : **the boundary layer grows down the plate and the average coefficient is set by its thickness at the top, so a taller plate has a thicker, more insulating layer.** **Option (c) is the forced-flow answer ($L ^ { - 1 / 2 }$ ) and is the trap: in forced flow the velocity is fixed and the layer's growth is the only effect, whereas here the flow itself strengthens with height, cancelling half of the exponent.** **That cancellation is why natural-convection coefficients are quoted as if they were constants, why a $1 0 \ \mathrm { m }$ hot wall (turbulent, $h$ independent of height) does not cool worse per square metre than a $1 \ \mathrm { m }$ one, and why the total heat from a tall tank is nearly proportional to its area.**
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
- **[[heat-transfer/fins|Fins]]** supplies the efficiency and the spacing trade-off that turns this lesson's $h$ into a real heat sink; the optimum spacing $S _ { \text{opt} } \approx 2 . 7 \, L \, \mathrm { R a } _ { L } ^ { - 1 / 4 }$ is the meeting point of the two lessons.
- **[[heat-transfer/transient-conduction|Transient conduction]]** meets this lesson in every cooling problem where $h$ depends on the temperature you are solving for, which is why the cooling curve of [[#ex-nat-cool|the hanging plate]] is not exponential.
- **[[fluid-mechanics/boundary-layers-drag|Boundary layers]]** is where the $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ criterion comes from, and where the mixed-convection flow reversal that makes opposing flow so treacherous is described properly.

::: history Buoyancy, cells and the birth of a correlation
**1900 — Henri Bénard's cells.** In "Les tourbillons cellulaires dans une nappe liquide" (*Revue générale des sciences pures et appliquées* **11**, 1900) and his Paris thesis of 1901, Bénard showed that a thin layer of liquid heated from below breaks into a regular honeycomb of convection cells. **Later work (Block 1956, Pearson 1958) showed that in Bénard's thin, free-surface layers surface-tension gradients were the main driver; buoyancy-driven cells of the same look appear in deeper layers.**
**1916 — Lord Rayleigh's stability theory.** "On convection currents in a horizontal layer of fluid, when the higher temperature is on the under side", *Philosophical Magazine* **32**, 529–546, posed the stability problem in terms of the group now called the Rayleigh number. **Rayleigh treated idealised free boundaries; the critical value $1 7 0 8$ for two rigid walls — the threshold in this lesson's horizontal-layer correlation — came from the later analyses of Jeffreys and others.**
**1930 — The vertical plate measured and solved.** E. Schmidt and W. Beckmann measured the temperature and velocity profiles beside a heated vertical plate, and E. Pohlhausen's similarity solution of the laminar boundary-layer equations, published with them, gave the $\mathrm { Nu } \propto \mathrm { Ra } ^ { 1 / 4 }$ law that the $0 . 5 9$ correlation summarises.
**1942 — W. Elenbaas, "Heat dissipation of parallel plates by free convection", *Physica* 9, 1–23.** Measurements and a correlation for arrays of isothermal vertical plates — the starting point of every natural-convection heat-sink calculation since.
**1975 — S. W. Churchill and H. H. S. Chu**, "Correlating equations for laminar and turbulent free convection from a vertical plate" and "… from a horizontal cylinder", *International Journal of Heat and Mass Transfer* **18**, 1323–1329 and 1049–1053. **Single expressions spanning the laminar and turbulent regimes and all Prandtl numbers, still the textbook defaults.**
**1984 — A. Bar-Cohen and W. M. Rohsenow, "Thermally optimum spacing of vertical, natural convection cooled, parallel plates", *Journal of Heat Transfer* 106, 116–123.** **The composite channel correlation and the optimum spacing used in this lesson, obtained by maximising the heat dissipated from a fixed volume rather than per unit of surface — the reason passive extrusions have the fin gaps they do.**
:::

::: summary
- **Buoyancy is a body force that switches off when the fluid is uniform**: $f _ { b } = \rho \beta g \Delta T$ , with $\beta = 1 / T _ { f }$ for a gas. **The velocity is not an input; it follows from the balance $u \sim ( g \beta \Delta T L ) ^ { 1 / 2 }$ , which gives centimetres per second in a room and half a metre per second up a hot wall.**
- **$\mathrm { R a } _ { L } = g \beta \Delta T L ^ { 3 } / ( \nu \alpha )$ is the only number that matters**, and $\mathrm { R a } _ { L } = 1 0 ^ { 9 }$ is the end of laminar flow on a vertical surface. **In air, a $1 \ \mathrm { m }$ wall transitions at about $1 1 \ \mathrm { K }$ while a $1 0 0 \ \mathrm { m m }$ board never does: buildings are turbulent, boards are not.**
- **Vertical plate**: $\overline { { \mathrm { N u } } } = 0 . 5 9 \, \mathrm { R a } ^ { 1 / 4 }$ laminar, $0 . 1 0 \, \mathrm { R a } ^ { 1 / 3 }$ turbulent, Churchill–Chu across the transition. **$h \propto \Delta T ^ { 1 / 4 } L ^ { - 1 / 4 }$ , so the heat flux goes as $\Delta T ^ { 5 / 4 }$ and the "thermal resistance" of a passive part is a curve, not a number.**
- **Orientation is not a detail.** **Hot face up $C = 0 . 5 4$ , hot face down $C = 0 . 2 7$ ; inclined plates take $\cos \gamma$ (from the vertical) inside $\mathrm { R a }$ ; horizontal plates use $L _ { c } = A _ { s } / P _ { s }$ ; cylinders use the diameter with $0 . 6 0$ and $0 . 5 5 9$ in Churchill–Chu.** **A factor of two lives in this block, and it is free to get right.**
- **Enclosures use the gap as the length.** A horizontal layer heated from below is still until $\mathrm { R a } _ { S } = 1 7 0 8$ (Hollands' correlation above it); a vertical slot conducts until $\mathrm { R a } _ { S } \sim 1 0 ^ { 3 }$ – $1 0 ^ { 4 }$ and then follows $\mathrm { N u } _ { S } \propto \mathrm { R a } _ { S } ^ { 1 / 4 } ( H / S ) ^ { - 0 . 3 }$ . **A double-glazing gap is a conduction layer, and radiation across it is as large as the conduction.**
- **Fin spacing: $S _ { \text{opt} } = 2 . 7 1 4 \, L \, \mathrm { R a } _ { L } ^ { - 1 / 4 }$ (Bar-Cohen and Rohsenow), which is $6$ to $1 2 \ \mathrm { m m }$ for air over most of practice.** **The optimum is flat above and steep below — narrow channels choke — and the real limits are dust and the extrusion die.**
- **Mixed convection is decided by $\mathrm { G r } / \mathrm { R e } ^ { 2 }$ , not by instinct.** **Below $0 . 1$ ignore buoyancy, above $1 0$ ignore the fan; between them combine as $\mathrm { N u } ^ { 3 } = \mathrm { N u } _ { f } ^ { 3 } \pm \mathrm { N u } _ { n } ^ { 3 }$ , and treat opposing flow as a hazard rather than a number.**
- **Radiation is a third to a half of the heat at every temperature difference in this lesson.** **Quote a natural-convection coefficient without saying what you did about radiation and you have quoted half an answer.**
:::

## Further reading

- **Incropera, DeWitt, Bergman and Lavine, *Fundamentals of Heat and Mass Transfer*, chapter 9** — the correlation tables for plates, cylinders, spheres, inclined surfaces, channels and enclosures, with their ranges and uncertainties stated honestly.
- **S. W. Churchill and H. H. S. Chu, *Int. J. Heat Mass Transfer* 18 (1975), 1323–1329** — the vertical-plate correlation, with the discussion of uniform-flux plates and the data it was fitted to.
- **A. Bar-Cohen and W. M. Rohsenow, *J. Heat Transfer* 106 (1984), 116–123** — the composite channel correlation and the optimum-spacing derivation, written for the engineer who has to choose a die.
- **E. M. Sparrow and J. L. Gregg, "Laminar free convection from a vertical plate with uniform surface heat flux", *Trans. ASME* 78 (1956)** — the isoflux case, with the $x ^ { 1 / 5 }$ temperature rise that decides where a heated board's hot spot is.
- **S. Ostrach, "Natural convection in enclosures", *J. Heat Transfer* 110 (1988)** — the review of the enclosure problem, including the aspect-ratio and inclination effects.
- **A. Bejan, *Convection Heat Transfer*, 4th ed. (Wiley, 2013)** — the scaling analysis of natural convection, the optimal spacing of fins and the mixed-convection regimes; harder than the other references and worth it for the scaling arguments alone.
