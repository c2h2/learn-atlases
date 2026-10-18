A railway wheel, a turbine disc, a connecting rod, a bicycle frame tube and the wire in your charger cable have one thing in common: **they were made by pushing solid metal past its yield point until it took a new shape, and they are stronger for having been.** Casting makes a shape by giving up the structure; machining makes a shape by throwing the structure away one chip at a time; forming makes a shape by *moving* the structure — and if it is done properly, moving it in the direction the load will go.

That is the whole case for the bulk-forming processes, and it is a case made in three currencies. **Metallographic**: a forging closes the casting's shrinkage porosity, breaks up its coarse dendrites and its segregated bands, and aligns its inclusions and precipitates into a **grain flow** that follows the part's contour — worth 20-40 % in fatigue strength and a great deal more in toughness across the flow. **Economic**: a forging or an extrusion is near-net-shape at the rate of a part per minute, against a machined part at a part per hour from a billet of twice the mass. **Mechanical**: cold working *hardens* the product — a drawn wire has a tensile strength of 2 GPa and the same steel annealed has 400 MPa — so the process is also a heat treatment. The price is that forming needs **force**: meganewtons, and therefore a machine that costs millions, and a die that costs tens of thousands and wears out. This lesson is about calculating that force, because the force is what decides the machine, the machine decides the size, and the size and the die decide the cost.

::: warning Five ways forming goes wrong
**Confusing hot and cold.** The boundary is not a temperature but the **recrystallisation temperature**, about $0 . 4 { - } 0 . 5 \ T _ { m }$ in kelvin: lead and tin are hot-worked at room temperature, aluminium at $2 5 0 \ \mathrm { ^ { \circ } C }$ , iron at $6 0 0 \ \mathrm { ^ { \circ } C }$ , tungsten at $1 { , } 0 0 0 \ \mathrm { ^ { \circ } C }$ . Work below it and the metal work-hardens, gets harder as the pass goes on, springs back, and can crack; work above it and it softens as fast as it hardens, needs a fifth of the force, and picks up oxide scale and poor tolerance. **A "cold-forged" part designed from hot-forging tables is a part that will split the die.** **Designing a forging that cannot be filled.** Closed-die forging needs the metal to reach every corner of the impression against pressures of a gigapascal, and it needs the die to be *made* — which means a parting line, draft of $5 { - } 7 ^ { \circ }$ , fillet radii of $3 { - } 6 ~ \mathrm { m m }$ , and no undercuts at all. A designer who draws a forged bracket with a machined-quality internal corner is drawing a die that cannot be cut by anything but a spark, and a die that will crack at that corner within a thousand blows. **Underestimating the force because the material is "soft".** The force is the **flow stress at the working temperature and strain rate** times the area times a constraint factor — and the constraint factor from friction and flash is 2 to 10. Hot mild steel has a flow stress of $2 0 \ \mathrm { M P a }$ and a closed-die forging pressure of $1 { , } 5 0 0 \ \mathrm { M P a }$ , because the flash channel is a restriction and the die face is stuck to the work. **Forgetting the machine is elastic.** A rolling mill or a press stretches by a fraction of a millimetre per meganewton of load, so the part that is $2 4 . 0 0 \ \mathrm { m m }$ under load is $2 3 . 6 2 \ \mathrm { m m }$ when the load comes off. **Mill spring** is not a defect, it is the reason gauge control is a feedback loop and not a setting. **Forming a casting and calling it a forging.** If the starting stock is a casting with porosity and the reduction is small, the porosity stays, the flow lines follow the original dendrites, and the "forging" has casting properties with forging costs. Forging stock is wrought, and the reduction ratio from ingot has to be at least 4:1 before the word *forged* means anything.
:::

## 1. The families, and the temperature that divides them

::: definition What divides the forming processes {#def-families}
$$
\begin{array} { l l l l l l }
\textbf{Process} & \textbf{Stress state} & \textbf{Workpiece} & \textbf{Temp.} & \textbf{Typical tolerance} & \textbf{Rate} \\ \hline
\text{Flat rolling} & \text{compress } + \text{ friction drag} & \text{plate, strip, bar} & \text{hot / cold} & \pm 0 . 0 5 \text{ to } \pm 0 . 5 \ \mathrm { m m } & 5 0 0 \mathrm { - } 2 { , } 0 0 0 \ \mathrm { m / m i n } \\
\text{Section rolling} & \text{compress, constrained} & \text{billet } \rightarrow \text{ long section} & \text{hot} & \pm 1 \text{ to } \pm 5 \ \mathrm { m m } & 1 { - } 2 0 \ \mathrm { m / s } \\
\text{Open-die forging} & \text{compress} & \text{large, simple} & \text{hot} & \pm 3 \text{ to } \pm 1 0 \ \mathrm { m m } & \text{minutes per part} \\
\text{Closed-die forging} & \text{compress, flash} & \text{up to } 5 0 \ \mathrm { k g } & \text{hot / warm} & \pm 0 . 3 \text{ to } \pm 1 \ \mathrm { m m } & 1 { - } 2 0 \ \text{parts/min} \\
\text{Cold forging / heading} & \text{compress, upset} & \text{small, ductile} & \text{cold} & \pm 0 . 0 5 \text{ to } \pm 0 . 1 \ \mathrm { m m } & 6 0 { - } 4 0 0 \ \text{parts/min} \\
\text{Extrusion} & \text{compress through a die} & \text{billet, round} & \text{hot / cold} & \pm 0 . 1 \text{ to } \pm 0 . 5 \ \mathrm { m m } & 1 { - } 3 0 \ \mathrm { m m / s } \\
\text{Drawing} & \text{pull through a die} & \text{wire, bar, tube} & \text{cold mostly} & \pm 0 . 0 2 \text{ to } \pm 0 . 1 \ \mathrm { m m } & 1 { - } 3 0 \ \mathrm { m / s } \\
\text{Upsetting} & \text{axial compress} & \text{short bar} & \text{cold / hot} & \pm 0 . 1 \ \mathrm { m m } & \text{fast} \\
\text{Swaging / rolling thread} & \text{incremental compress} & \text{rod, tube} & \text{cold / warm} & \text{thread class} & \text{fast} \\
\text{Ring rolling} & \text{local bend-compress} & \text{punched ring} & \text{hot} & \pm 1 \ \mathrm { m m } & \text{minutes} \\
\text{Friction stir} & \text{shear, no melting} & \text{plate, extrusion} & \text{sub-solidus} & \pm 0 . 2 \ \mathrm { m m } & 5 0 { - } 5 0 0 \ \mathrm { m m / m i n }
\end{array}
$$

The dividing line is **recrystallisation**, not melting. Above roughly $0 . 4 { - } 0 . 5 \ T _ { m }$ (in kelvin) new strain-free grains nucleate inside the deformed ones as fast as deformation is creating dislocations, so the metal neither hardens nor springs back and the force stays low; below it, the dislocation density climbs by three orders of magnitude and the flow stress climbs with it.

$$
\begin{array} { l c c c c c c c }
& \text{Pb} & \text{Sn} & \text{Al} & \text{Cu} & \text{Fe} & \text{Ni} & \text{Ti} \\
T _ { m } \ [ ^ { \circ } \mathrm { C } ] & 3 2 7 & 2 3 2 & 6 6 0 & 1 { , } 0 8 5 & 1 { , } 5 3 8 & 1 { , } 4 5 5 & 1 { , } 6 6 8 \\
T _ { \text{recryst } } \ [ ^ { \circ } \mathrm { C } ] & < 2 0 & < 2 0 & 1 5 0 { - } 2 5 0 & 2 0 0 { - } 2 7 0 & 4 5 0 { - } 6 0 0 & 6 0 0 { - } 7 0 0 & 6 0 0 { - } 7 0 0
\end{array}
$$

**Room-temperature drawing of copper wire is therefore hot working** — which is why it can be reduced by 99.9 % in a single pass on a continuous bench and why it anneals bright — **and warm forging of titanium at $9 5 0 \ \mathrm { ^ { \circ } C }$ is hot working that is too cold**, which is why titanium is forged in the $9 0 0 { - } 9 5 0 \ \mathrm { ^ { \circ } C }$ range with glass lubricant and isothermal dies, and why the die is more expensive than the first hundred parts. Between the two sits **warm working**, $1 0 0 { - } 3 0 0 \ \mathrm { ^ { \circ } C }$ above room temperature for steels: enough to buy ductility and shed a third of the load, not enough to oxidise or to lose the tolerance.
:::

::: example Forged against cast: the connecting rod {#ex-rod level=3 check="35"}
A steel connecting rod carries a fully reversed inertia load plus a compressive combustion load, and its failure mode is fatigue at the oil-hole radius. Two routes: a cast one in microalloyed steel and a forged one in quenched-and-tempered 42CrMo4, both machined and shot-peened.

The forged rod's advantage is not primarily the alloy — it is that **the metal was made sound and then given a structure with a direction**. Forging closes the porosity (a casting's relative density of 97-99 % becomes 100 %), breaks the segregated bands into a dispersed structure, and lays the manganese-sulphide inclusions and the tempered-martensite laths along the contour of the rod, so a fatigue crack trying to run across the fillet meets a fibre it must cut. Measured on the same alloy and the same heat treatment, the improvement in fatigue strength is **20-40 %**, and in impact toughness across the flow it is larger.

The cost of that: a $4 { , } 0 0 0$ tonne press, a £60,000 set of three die impressions (edger, blocker, finisher) that will make 30,000 rods before being re-sunk, a trim die, and a bar-stock blank that must be weighed to $\pm 1 \ \ \%$ or the die will not fill. The cast rod needs none of that and can put the oil hole where the designer wants it, because it is not constrained by a parting line. **At 20,000 rods a year the forged one costs £9.40 and the cast one £6.80, and the forged one is chosen anyway, because 35 % more fatigue strength is not something a designer will trade for £2.60.**
:::

## 2. The force: flow stress, area, and the constraint factor

::: definition Flow stress and the forming load {#def-flow}
Forming analysis begins with the **true stress–true strain** curve of the material at the working temperature and strain rate, usually fitted as

$$
\sigma \; = \; K \varepsilon ^ { n } \qquad \Longrightarrow \qquad { \bar { \sigma } } \; = \; { \frac { 1 } { \varepsilon } } \int _ { 0 } ^ { \varepsilon } K \varepsilon ^ { \prime n } \, d \varepsilon ^ { \prime } \; = \; { \frac { K \varepsilon ^ { n } } { 1 + n } } \; = \; { \frac { \sigma _ { \text{final } } } { 1 + n } }
$$

with $n$ the strain-hardening exponent — and the average flow stress, not the final one, is what goes into the load. The forming force is then always the same product of three things:

$$
F \; = \; \underbrace { { \bar { \sigma } } } _ { \text{material} } \; \times \; \underbrace { A } _ { \text{area of contact} } \; \times \; \underbrace { Q } _ { \text{constraint factor} }
$$

The constraint factor $Q$ is where all the subtlety lives, and it has three sources. **Friction** on the die face prevents the surface from spreading, so the interior is squeezed between two clamped plates — a state of triaxial compression in which the pressure needed to keep yielding rises to $2 \\sigma _ { y }$ at the centre and more; this is the **friction hill** derived below, and it is worth a factor of 2-8 in a forging or a rolling pass. **Redundant work** — the metal near the die corners and the centre must deform more than the average because geometry forces it to — adds 10-30 %. **Flash and land geometry** in a closed die can add a factor of 3-10, because the metal must be squeezed through a thin, long, high-friction channel to fill the die, and the pressure in the impression is then set by that channel and not by the workpiece at all.

Two consequences worth memorising. **The force is independent of the workpiece's hardness in the way you would like and dependent on it in the way you would not**: hot mild steel at $1 1 0 0 \ \mathrm { ^ { \circ } C }$ has a flow stress of $2 0 \ \mathrm { M P a }$ and a closed-die forging pressure of $1 { , } 5 0 0 \ \mathrm { M P a }$ . And **the power, not the force, is what stops a mill**: $P = F v$ , and a hot strip mill that rolls at $1 { , } 5 0 0 \ \mathrm { m / m i n }$ needs ten megawatts to do it at a force you could lift with a crane.
:::

::: proof The friction hill: why the pressure at the centre of a forged disc is double the pressure at the edge {#proof-hill}
Take a slab of thickness $h$ being compressed between flat dies, half-width $a$ , and cut a vertical element of width $d x$ at a distance $x$ from the centre. Horizontal equilibrium of the element gives

$$
\frac { d \sigma _ { x } } { d x } \; = \; { \frac { 2 \tau } { h } }
$$

where $\tau$ is the interfacial shear stress. With the Tresca friction condition $\tau = m \sigma _ { y } / 2$ (a constant friction factor $m$ , valid when the surfaces are stuck) and the yield criterion $\sigma _ { y } = \sigma _ { z } - \sigma _ { x }$ in plane strain, integration from the free edge, where $\sigma _ { x } = 0$ , gives

$$
p ( x ) \; = \; \sigma _ { y } \left[ \, 1 \; + \; { \frac { m } { h } } ( a - x ) \, \right] \qquad \text{and, with Coulomb friction } \tau = \mu p , \qquad p ( x ) \; = \; \sigma _ { y } \, \exp \! \left[ { \frac { 2 \mu } { h } } ( a - x ) \right]
$$

**The pressure is exponential (or at best linear) in the ratio of die width to workpiece thickness, and it is largest at the centre.** For $a / h = 1 0$ and $\mu = 0 . 1$ the centre pressure is $e ^ { 2 } = 7 . 4$ times the flow stress; for $a / h = 2$ it is only 1.5 times. Hence the three practical rules of the figure: **a thin, wide part needs a machine sized by the friction and not by the material**; **lubrication works by attacking the exponent**, and a good glass lubricant on a titanium forging cuts the peak pressure by half; and **sticking is what makes the surface texture of a forging a copy of the die**, because where $\tau = \mu p$ exceeds the shear yield strength of the metal, $k = \sigma _ { y } / { \sqrt { 3 } }$ , no amount of further pressure makes the surfaces slide, and the metal deforms around a die that is glued to it.
:::

::: widget plot
title: The friction hill: pressure across a forged or rolled contact
f: exp(2*0.1*(20-x)/2); 1+0.05*(20-x); 1
x: 0,20
y: 0,8
labels: Coulomb friction, μ = 0.1, a/h = 10; Tresca sticking, m = 0.1, a/h = 10; frictionless, p = σy
caption: The normalised contact pressure $p / \sigma _ { y }$ from the edge $( x = a )$ to the centre $( x = 0 )$ of a platen, for the exponential Coulomb solution and the linear sticking solution of the derivation, against the frictionless ideal. The frictionless curve is what a textbook yields and what no shop sees; the exponential curve is what a press is bought for. **Read the ratio of the peak to the mean, not the peak: for $\mu = 0 . 1$ and $a / h = 1 0$ the mean pressure is $3 . 2 \sigma _ { y }$ and the peak $7 . 4 \sigma _ { y }$ , and it is the mean that sets the machine and the peak that sets whether the die yields.** **The same curve is why rolling a thinner strip needs disproportionately more power per kilogram, why forging a wide flange needs a bigger press than its area suggests, and why the first thing a forming engineer asks about a new part is not its material but its width-to-thickness ratio.**
:::

## 3. Rolling

::: definition The geometry, the force and the spring {#def-rolling}
Flat rolling is a continuous forging pass in which the work is dragged in by its own friction. The whole geometry is one right triangle: rolls of radius $R$ reduce the thickness from $h _ { 0 }$ to $h _ { 1 }$ , so

$$
\Delta h \; = \; h _ { 0 } - h _ { 1 } , \qquad L \; = \; { \sqrt { R \, \Delta h } } \qquad \text{(contact length, for } \Delta h \ll R \text{)}
$$

and the contact area is $A = w L$ . The force, torque and power follow, with the constraint factor $Q _ { x }$ accounting for the friction hill and for the fact that the strip is wide (plane strain, so $Q _ { x } \approx 1 . 2$ for a light reduction and up to 2 for a heavy one):

$$
F \; = \; { \bar { \sigma } } \, Q _ { x } \, w L , \qquad T \; = \; { \frac { F L } { 2 } } \ \text{per roll } ( \text{lever arm } \approx L / 2 ) , \qquad P \; = \; 2 \, T \, \omega \; + \; \text{losses}
$$

Two limits decide what a mill can do. **The bite condition** (derived below) says the friction must be able to pull the strip in: $\mu \geq \tan \alpha$ , where $\alpha$ is the contact angle and $\cos \alpha = 1 - \Delta h / 2 R$ , so the **maximum reduction per pass is $\Delta h _ { \max } = 2 R \mu ^ { 2 } / ( 1 + \mu ^ { 2 } ) \approx 2 R \mu ^ { 2 }$** — which is why hot rolling ( $\mu \approx 0 . 4$ with the oxide scale acting as a solid lubricant) takes 30-50 % reductions and cold rolling of steel with oil ( $\mu \approx 0 . 0 5 )$ takes 2-5 %. **The mill spring**: the housing, screws and rolls stretch elastically by $\delta = F / G$ , where $G$ is the **mill modulus**, typically $5 { - } 2 0 \ \mathrm { M N / m m }$ , so the exit thickness is

$$
h _ { 1 } \; = \; s \; + \; { \frac { F } { G } } \qquad ( s \ \text{the set-down gap} )
$$

and since $F$ itself depends on $h _ { 1 }$ , the gauge is a **feedback problem**, solved in practice by a hydraulic gauge-control loop reading a thickness gauge and a tension meter, and in the old days by an operator watching a mark on the screw-down.
:::

::: proof The bite condition {#proof-bite}
At the entry the roll grips the strip with a normal force $N$ inclined at the contact angle $\alpha$ to the vertical, and a friction force $\mu N$ inclined at $\alpha$ to the strip. Resolving along the direction of entry, friction pulls the strip **in** with $\mu N \cos \alpha$ and the normal reaction pushes it **out** with $N \sin \alpha$ . The strip is drawn in when

$$
\mu N \cos \alpha \; > \; N \sin \alpha \qquad \Longleftrightarrow \qquad \mu \; > \; \tan \alpha
$$

and since the contact angle satisfies $\cos \alpha = 1 - \Delta h / 2 R$ , the largest reduction that will bite at all is

$$
\Delta h _ { \max } \; = \; 2 R ( 1 - \cos \alpha _ { \max } ) \; = \; 2 R \, { \frac { \mu ^ { 2 } } { 1 + \mu ^ { 2 } } } \; \approx \; 2 R \mu ^ { 2 }
$$

**This is the reason hot rolling exists as a heavy process and cold rolling as a light one.** With $\mu = 0 . 4$ (hot steel on steel, with scale) and $R = 3 0 0 \ \mathrm { m m }$ , $\Delta h _ { \max } = 9 4 \ \mathrm { m m }$ — the mill can take an ingot-slab and is limited by the motor, not the bite. With $\mu = 0 . 0 5$ (cold rolling with oil) the same mill is limited to $1 . 5 \ \mathrm { m m }$ , which is why a cold tandem mill reduces a 25 mm hot-rolled coil to a 0.3 mm sheet in five stands at 2,000 m/min, taking 5-15 % at a time, and why **the lubricant that protects the surface and the roll is precisely what prevents the mill from biting** — the deepest cold reductions are done dry, or with a high-friction phosphate-soap coating deliberately applied to make the metal grip.
:::

::: example A rolling pass: force, torque, power and spring {#ex-roll level=3 check="3.8"}
Low-carbon steel strip $3 0 0 \ \mathrm { m m }$ wide and $3 0 \ \mathrm { m m }$ thick is reduced to $2 4 \ \mathrm { m m }$ on $6 0 0 \ \mathrm { m m }$ diameter rolls at $1 0 0 \ \mathrm { r p m }$ . The mean flow stress at $1 { , } 0 0 0 \ \mathrm { ^ { \circ } C }$ is $2 5 0 \ \mathrm { M P a }$ and the constraint factor is 1.2.

$$
L = { \sqrt { 3 0 0 \times 6 } } = 4 2 . 4 \ \mathrm { m m } , \qquad A = 4 2 . 4 \times 3 0 0 = 1 2 \, 7 3 0 \ \mathrm { m m ^ { 2 } }
$$
$$
F = 2 5 0 \times 1 . 2 \times 1 2 \, 7 3 0 = 3 . 8 2 \ \mathrm { M N } , \qquad T = { \frac { F L } { 2 } } = { \frac { 3 . 8 2 \times 1 0 ^ { 6 } \times 0 . 0 4 2 4 } { 2 } } = 8 1 \ \mathrm { k N m }
$$
$$
P = 2 T \omega = 2 \times 8 1 \times 1 0 ^ { 3 } \times { \frac { 2 \pi \times 1 0 0 } { 6 0 } } = { \bf 1 . 7 \ M W } \qquad ( \text{before losses, which add } 1 0 { - } 2 0 \ \%)
$$

**The force is 390 tonnes, the torque 81 kNm per roll and the power 1.7 MW — about one per cent of a modern hot strip mill, which is roughly what one pass out of seven is.** Now the spring: with a mill modulus $G = 1 0 \ \mathrm { M N / m m }$ the housings and rolls stretch by $3 . 8 2 / 1 0 = 0 . 3 8 \ \mathrm { m m }$ , so **the rolls must be set to $2 3 . 6 2 \ \mathrm { m m }$ to produce $2 4 . 0 0 \ \mathrm { m m }$** — and since $F$ changes with temperature, tension, and the incoming gauge, that $0 . 3 8 \ \mathrm { m m }$ is a moving target, which is the entire content of gauge control. And the bite: $\cos \alpha = 1 - 6 / 6 0 0 = 0 . 9 9$ gives $\alpha = 8 . 1 ^ { \circ }$ and $\mu _ { \text{required } } = 0 . 1 4$ , comfortably met hot. Change the same pass to cold rolling with oil at $\mu = 0 . 0 6$ and the maximum reduction collapses to $2 \times 3 0 0 \times 0 . 0 6 ^ { 2 } = 2 . 2 \ \mathrm { m m }$ , of which the 6 mm was never going to happen.
:::

::: widget plot
title: Roll force and torque against reduction — why power runs out before force
f: sqrt(x); pow(x,1.5)
x: 0,1
y: 0,1.3
labels: normalised roll force, F ∝ √(RΔh); normalised roll torque, T ∝ (Δh)^1.5
caption: Roll force and roll torque against thickness reduction, both normalised to their value at the mill's maximum reduction. The contact length is $L = \sqrt { R \Delta h }$ , so **the force grows as the square root of the reduction while the torque — force times a lever arm that also grows — grows as its three-halves power**, and it is the torque, and therefore the power, that a rolling schedule runs out of. Two design consequences follow directly from the two curves. **Cut the roll radius to a tenth and the force falls to a third but the torque falls to a tenth: this is why cluster (Sendzimir) mills run 60 mm work rolls inside two or three trains of backing rings, and why foil mills are cluster mills** — the rings stop the little rolls from bending, and the little rolls give a low load, a good flatness and a bright surface that a thick roll cannot. **And at the other end of the scale, a temper-mill pass of 1 % reduction takes a tenth of the force and a thirtieth of the torque, which is why the most important pass in the line — the one that flattens the strip, kills the yield-point elongation that causes stretcher strain, and sets the shape — is also the cheapest.**
:::

::: definition Mills, passes and the shape of a strip {#def-mills}
**Two-high** (reversing, one pass each way), **three-high** (the work travels up and down over rolls of different diameters, an old but robust arrangement for bar), **four-high** (work rolls backed by larger rolls, the universal choice for plate and strip), **cluster or Sendzimir** (small work rolls, two or three rows of backing rings, for hard thin strip and foil), **tandem** (four to six stands in series, each reducing 20-35 %, with interstand tension controlling the flatness and the gauge — a hot tandem line turns a 250 mm slab into a 2 mm coil in five minutes), **planetary** (a drum of small rolls that takes a 50 mm slab to 2 mm in one pass), and **section and bar mills** (a sequence of grooves cut into the rolls — box, oval, square, edge, flower — that walk a billet through twenty passes to an I-beam, an angle or a rail).

The pass schedule of a section mill is a design exercise in volume constancy: the same volume must pass every stand, so the area falls as the speed rises, and the section must be **filled** — underfilled and the section is out of tolerance and the flanges are wavy; overfilled and the metal goes to the corners, the roll gaps, and makes fins and eventually an **alligator crack** along the centreline. The shape of a flat product is a stress problem: the roll gap is not uniform, because the rolls bend under load (**crown**, corrected by grinding the rolls slightly convex — *camber* — and in modern mills by **hydraulic roll bending** and by **shifted or continuously-variable-crown rolls**), and because the roll barrel heats and expands at its centre (**thermal crown**, controlled by shaped coolant headers). A strip that is longer in the middle than at the edges is **centre-buckled** and will never be flat; one longer at the edges is **tight-edged** and will buckle in the customer's press. Both are made in the mill and neither is visible until the coil is opened.
:::

## 4. Forging

::: definition Open die, closed die, and the flash that decides the load {#def-forging}
**Open-die forging** squeezes a heated billet between flat or shaped tools that never enclose it; the metal flows where it is not constrained, so the forgeable shapes are axisymmetric or prismatic — discs, rings, shafts, stepped bars, the 400-tonne rotor of a steam turbine, the 25-tonne ring of a wind-tower bearing. The force is the plain friction-hill value, $F = { \bar { \sigma } } Q w L$ , with $Q$ of 1.5-3, and the tolerance is $\pm 5 \ \mathrm { m m }$ on a metre. **Closed-die (impression-die) forging** encloses the metal in a cavity cut into two die blocks that meet at a **parting line**; the billet is placed, the press closes, and the metal fills the impression until a thin web of excess — the **flash** — runs out into a shallow land around the die. The flash is not a defect but a **hydraulic restriction**: it freezes and chills before the metal in the impression, becomes very hard to push through, and thereby raises the pressure inside the die enough to fill the corners. It costs 5-15 % of the steel and a trim die, and it is the reason the forging load is three to ten times the plain compression load.

The design vocabulary is fixed by the die, not the designer: **parting line** (usually where the part is thickest, and always leaving a flash line that must be ground or machined), **draft** of $5 { - } 7 ^ { \circ }$ so the forging will leave the die, **fillet radii** of $3 { - } 6 ~ \mathrm { m m }$ at internal corners (a sharp internal radius is both an unfilled corner and a crack in the die), **web-and-feather** sections (a thin web between two bosses that is machined away later, because a die cannot make a slot), **preform and blocker** impressions (one to three preliminary cavities that put the metal in the right place so the finisher can fill without folding), and **tolerances** of $\pm 0 . 5 \ \mathrm { m m }$ on a small steel forging, $\pm 0 . 1 \ \mathrm { m m }$ on a cold-forged one.

The machines divide by whether they deliver **force** or **energy**. A mechanical or hydraulic **press** applies a controllable force through a controllable stroke, at a strain rate of $1 { - } 3 0 \ \mathrm { s ^ { - 1 } }$ , and is used for closed-die work, isothermal forging and anything that must fill. A **hammer** (air-drop or double-acting) delivers a fixed energy per blow at a strain rate of $1 0 { - } 1 0 0 \ \mathrm { s ^ { - 1 } }$ , is forgiving of an imperfect preform, and is used for large open-die work and for titanium. A high-energy-rate machine — a **screw press**, a **high-speed hydraulic press**, an **upsetter** — trades force for rate, and is what makes 200 connecting rods an hour.
:::

::: example What press do you need for a steel flange? {#ex-press level=3 check="860"}
Upset a $6 0 \ \mathrm { m m }$ diameter, $1 0 0 \ \mathrm { m m }$ long bar of 1045 steel into a $1 2 0 \ \mathrm { m m }$ diameter flange in a closed die at $1 { , } 1 0 0 \ \mathrm { ^ { \circ } C }$ . The flow stress at that temperature and strain rate is $8 0 \ \mathrm { M P a }$ ; the flash is $4 \ \mathrm { m m }$ thick under a $1 0 \ \mathrm { m m }$ land.

The projected area of the finisher impression is $A = \pi \times 6 0 ^ { 2 } = 1 1 \, 3 1 0 \ \mathrm { m m } ^ { 2 }$ . The pressure needed to squeeze metal through the flash land, by the friction-hill result applied to a channel of thickness $h _ { f } = 4 \ \mathrm { m m }$ and land width $a _ { f } = 1 0 \ \mathrm { m m }$ , is

$$
p _ { \text{flash } } \; = \; 2 \sigma _ { y } \left( 1 + { \frac { a _ { f } } { 2 h _ { f } } } \right) \; = \; 2 \times 8 0 \times ( 1 + 1 . 2 5 ) \; = \; 3 6 0 \ \mathrm { M P a }
$$

and the pressure in the impression is that flash pressure **plus** the pressure to deform the work under its own friction hill, a constraint factor of 2-3 on $2 \sigma _ { y }$ :

$$
p _ { \text{avg } } \; \approx \; p _ { \text{flash } } + 2 . 5 \times 2 \sigma _ { y } \; = \; 3 6 0 + 4 0 0 \; = \; 7 6 0 \ \mathrm { M P a }
 \qquad \Longrightarrow \qquad F \; = \; 7 6 0 \times 1 1 \, 3 1 0 \; = \; 8 . 6 \ \mathrm { M N } \; \approx \; { \bf 8 6 0 \ t }
$$

**Eight hundred and sixty tonnes for a part you could crush by hand if it were warm and unlubricated and had nowhere to go — the entire factor of ten is the flash and the friction hill.** Note what the calculation makes cheap and what it makes expensive: **thinning the flash land from $1 0 \ \mathrm { m m }$ to $6 \ \mathrm { m m }$ cuts the flash pressure by a quarter and saves 90 tonnes**, and doubling the flash thickness saves more — but too little flash and the die does not fill, which is the trade the die designer sets by trial and by simulation. And note that the answer is a **force at a stroke**: the same flange on a hammer needs the energy to be delivered in three or four blows before the billet cools below $9 5 0 \ \mathrm { ^ { \circ } C }$ , which is a different calculation and the reason a shop with only a hammer cannot make a thin-walled closed die part.
:::

## 5. Extrusion

::: definition Pushing metal through a hole {#def-extrusion}
In **direct (forward) extrusion** a billet in a container is pushed by a ram and the metal flows *towards* the ram, through a die opening at the far end; in **indirect (backward) extrusion** the die is carried on the ram and the metal flows *through the ram*, so the billet does not slide along the container. The **extrusion ratio** is $R _ { x } = A _ { 0 } / A _ { 1 }$ , typically 10-100, and the ideal work per unit volume is the same as for drawing — the logarithmic strain times the flow stress, $w = { \bar { \sigma } } \ln R _ { x }$ — so the ideal pressure is

$$
p _ { \text{ideal } } \; = \; { \bar { \sigma } } \, \ln R _ { x } \qquad \Longrightarrow \qquad p _ { \text{direct } } \; = \; { \bar { \sigma } } \, \ln R _ { x } \; \underbrace { \psi _ { x } } _ { \text{die, } 1 . 2 - 1 . 6 } \; \underbrace { \left( 1 + { \frac { 2 \mu L } { D } } \right) } _ { \text{container friction} } \qquad p _ { \text{indirect } } \; = \; { \bar { \sigma } } \, \ln R _ { x } \, \psi _ { x }
$$

The container-friction term is the whole argument between the two machines: it grows with the billet length $L$ , so a direct press loses pressure (and therefore speed, and therefore temperature uniformity) as the billet is used up, and it is why steel extrusion — where the billet is $1 { , } 1 5 0 \ \mathrm { ^ { \circ } C }$ , the container is $4 0 0 \ \mathrm { ^ { \circ } C }$ , and the lubricant is a $0 . 2 \ \mathrm { m m }$ film of glass — uses short billets and enormous presses, while indirect extrusion of aluminium runs a long billet at a constant load and can extrude **hollow** sections through a die with a mandrel that has to be supported from the ram.

The die itself is a piece of tool steel with a profile ground into it and bearing lands of $1 { - } 3 \ \mathrm { m m }$ that set the final dimensions and control the **metal flow**: a naive die makes the metal nearest the bearing flow fastest, so the profile **dies** (bends) as it leaves, and the die maker corrects it by **washering** the bearing — opening it where the metal must go faster. Complex profiles are made with **weld dies**, in which the billet splits around a mandrel spider and re-welds under the enormous hydrostatic pressure in the container (which is why extrusion makes hollow tubes and structural hollow sections so well: the weld interface is a clean metal-to-metal contact at $6 0 0 \ \mathrm { M P a }$ of pressure and $4 5 0 \ \mathrm { ^ { \circ } C } )$ . The defects are correspondingly specific: **centre burst** (an internal longitudinal crack from tensile stress at the die exit, caused by too small a die angle or too high a speed), **piping** (a central cavity at the billet end when the dummy block lets metal flow around it), **die band** (a periodic ridge from die wear), **centre burst and chevron cracking**, and **quench-induced distortion** in the heat-treatable alloys.
:::

::: proof The ideal work of extrusion and drawing, and the maximum reduction {#proof-extrude}
Take a perfectly plastic material of flow stress ${ \bar { \sigma } }$ and deform a volume $V$ from area $A _ { 0 }$ to $A _ { 1 }$ in a frictionless, homogeneous process. The true strain is

$$
\varepsilon \; = \; \ln { \frac { L _ { 1 } } { L _ { 0 } } } \; = \; \ln { \frac { A _ { 0 } } { A _ { 1 } } } \; = \; \ln R _ { x } \; = \; 2 \ln { \frac { d _ { 0 } } { d _ { 1 } } }
$$

(the last two by volume constancy), so the **ideal work per unit volume** is $w = { \bar { \sigma } } \varepsilon = { \bar { \sigma } } \ln R _ { x }$ , and by virtual work the ideal pressure or stress is that same quantity:

$$
p _ { \text{ideal } } \; = \; { \bar { \sigma } } \ln { \frac { A _ { 0 } } { A _ { 1 } } } \qquad \text{and, with a conical die of semi-angle } \alpha \text{ and friction } \mu , \qquad \sigma _ { d } \; = \; { \bar { \sigma } } \left( 1 + { \frac { \mu } { \tan \alpha } } \right) \ln { \frac { A _ { 0 } } { A _ { 1 } } }
$$

Now the limit. In **extrusion** the work is in compression and confined by the container, so it cannot fail by necking and $R _ { x }$ is limited only by the press and by the die. In **drawing** the work hangs on the drawn product: the drawing stress $\sigma _ { d }$ is carried by the wire leaving the die, whose strength is the flow stress of the *deformed* metal, ${ \bar { \sigma } } _ { 1 }$ . If $\sigma _ { d }$ reaches ${ \bar { \sigma } } _ { 1 }$ the wire keeps yielding all the way to the block and snaps. For a rigid-perfectly-plastic metal, ${ \bar { \sigma } } _ { 1 } = { \bar { \sigma } }$ , so the limit is

$$
\sigma _ { d } \; = \; { \bar { \sigma } } \ln { \frac { A _ { 0 } } { A _ { 1 } } } \; < \; { \bar { \sigma } } \qquad \Longrightarrow \qquad \ln { \frac { A _ { 0 } } { A _ { 1 } } } \; < \; 1 \qquad \Longrightarrow \qquad { \frac { A _ { 1 } } { A _ { 0 } } } \; > \; { \frac { 1 } { e } } \; = \; 0 . 3 7
$$

**A maximum area reduction of $6 3 \ \ \%$ per pass, in the ideal case, and 30-45 % in practice once friction, die angle, hardening and the heat of drawing are counted.** **This one inequality is the reason a wire shop has five dies in a line instead of one, and the reason extrusion can go from a 150 mm billet to a 15 mm profile in one operation while drawing cannot.**
:::

::: example Extruding an aluminium profile {#ex-extrude level=3 check="198"}
A $1 5 0 \ \mathrm { m m }$ diameter, $3 0 0 \ \mathrm { m m }$ long billet of 6063 at $4 5 0 \ \mathrm { ^ { \circ } C }$ is extruded directly to a profile of cross-section $1 { , } 5 0 0 \ \mathrm { m m } ^ { 2 }$ . Take ${ \bar { \sigma } } = 2 5 \ \mathrm { M P a }$ , a die factor $\psi _ { x } = 1 . 3$ and a container friction coefficient $\mu = 0 . 1$ .

$$
R _ { x } = { \frac { \pi \times 7 5 ^ { 2 } } { 1 \, 5 0 0 } } = 1 1 . 8 , \qquad p _ { \text{ideal } } = 2 5 \ln 1 1 . 8 = 6 2 \ \mathrm { M P a }
$$
$$
p _ { \text{direct } } = 6 2 \times 1 . 3 \times \left( 1 + { \frac { 2 \times 0 . 1 \times 3 0 0 } { 1 5 0 } } \right) = 6 2 \times 1 . 3 \times 1 . 4 = 1 1 2 \ \mathrm { M P a }
 \qquad F = 1 1 2 \times 1 7 \, 6 7 0 = { \bf 1 \, 9 8 0 \ k N }
$$

**Two thousand kilonewtons — 200 tonnes — on a 6-inch press, whose ram is rated at 1,000-1,500 tonnes.** The press is oversized on purpose: the extra capacity buys ram speed, and ram speed is what holds the billet temperature up against the cooling that a slow extrusion causes (a 6063 billet enters at $4 5 0 \ \mathrm { ^ { \circ } C }$ and the exit profile must not exceed about $5 2 0 \ \mathrm { ^ { \circ } C }$ , which limits the speed to $1 0 { - } 4 0 \ \mathrm { m m / s }$ at the die). Indirect extrusion of the same billet would need $6 2 \times 1 . 3 = 8 0 \ \mathrm { M P a }$ and 142 tonnes, **28 % less**, and would keep that pressure constant from the first millimetre of stroke to the last. The trade is that the indirect machine cannot support a mandrel for a hollow profile as easily, and its ram has to carry the die and the butt.
:::

::: widget plot
title: Extrusion pressure against extrusion ratio, with and without container friction
f: log(x); 1.4*log(x); 3.6
x: 1,40
y: 0,6
labels: p/σ̄ = ln R (indirect, ideal); direct extrusion with 2μL/D = 0.4; the press limit for a small aluminium press
caption: Extrusion pressure normalised by the flow stress, against the extrusion ratio $R _ { x } = A _ { 0 } / A _ { 1 }$ . The ideal curve is a logarithm, so **the pressure barely notices the ratio: going from $R _ { x } = 1 0$ to $R _ { x } = 4 0$ adds only half again as much pressure**, and extrusion is therefore one of the few processes where a much finer product costs almost nothing extra in load. What does cost is the container friction term, which is not a function of $R _ { x }$ at all but of the **billet length**, and which is why a direct-extrusion press shows a pressure that rises as the billet is used up (the $2 \mu L / D$ term shrinks, and the butt left over at the end is the metal that could not be pushed past the dummy block). The horizontal line is a typical press ceiling: below it the shop can choose its ratio freely; above it the only choices are a smaller billet, a hotter billet, or a slower ram.
:::

## 6. Drawing

::: definition Drawing wire, bar and tube {#def-drawing}
Drawing is extrusion's poor relation that makes better product: the metal is **pulled** through a die instead of pushed, so the billet length is limited only by the weight that will not crush it, and the product comes out with the surface, straightness, tolerance and strength of the die. The die is a tungsten-carbide or polycrystalline-diamond insert with an entry angle of $1 7 { - } 2 1 ^ { \circ }$ total for steel wire and $6 0 { - } 7 0 ^ { \circ }$ for aluminium rod, a **bearing land** of $0 . 1 { - } 0 . 3$ times the wire diameter that sizes the product and burnishes it, and a bell-shaped exit that lets the wire leave without scratching back over the land.

The stress is the one derived above, $\sigma _ { d } = { \bar { \sigma } } ( 1 + \mu / \tan \alpha ) \ln ( A _ { 0 } / A _ { 1 } )$ , and everything about a drawing shop follows from the three factors in it. **The die angle** trades redundant work (large $\alpha$ makes a dead zone and a shear cone, costing up to 30 % extra work) against friction (small $\alpha$ makes a long, hot, high-normal-force contact): the optimum is $\alpha \approx 5 { - } 8 ^ { \circ}$ for steel and $1 0 { - } 1 5 ^ { \circ }$ for aluminium. **The friction** is why steel wire is drawn through lime then soap (a phosphate coating carries the lubricant and prevents welding to the die), why aluminium rod is drawn dry or with a wax, and why a **die that has picked up metal** produces a scored wire and then a torn one. **The heat**: at $\sigma = 5 0 0 \ \mathrm { M P a }$ and $\varepsilon = 0 . 4$ , almost all the plastic work becomes heat, and if it cannot leave by conduction into the die and radiation from the wire, the temperature rises by $\Delta T = 0 . 9 \, { \bar { \sigma } } \varepsilon / \rho c _ { p } \approx 5 0 \ \mathrm { K }$ , which is enough to destroy the lubricant — hence the **capstan drums** of a multi-pass rod line, which are water-cooled and double as the puller.

**Tube drawing** pulls a tube over a **mandrel** (a long tapered plug that sets the bore, used for long tubes at a small bore reduction) or through a **floating plug** (a barrel-shaped plug carried in the bore by the die, which self-positions and is used for short heavy tubes) or over a **rod** (solid rod drawn into the bore and pulled out afterwards, for very small bores). **Sinking** is drawing with no mandrel and no bore change — a pure diameter reduction that thickens the wall. And the products of the process are the reason it is everywhere: drawn bar to $\pm 0 . 0 2 \ \mathrm { m m }$ with an $R _ { a }$ of $0 . 4 \ \mu \mathrm { m }$ , drawn tube to $\pm 0 . 0 5 \ \mathrm { m m }$ on the bore, and cold-drawn steel wire at a tensile strength of $2 { , } 1 0 0 \ \mathrm { M P a }$ — the strongest bulk material any engineer gets for a fraction of a pound a kilogram, and stronger for every metre it is pulled.
:::

::: example From 8 mm to 3.5 mm {#ex-draw level=3 check="5"}
Annealed low-carbon steel wire, $8 . 0 \ \mathrm { m m }$ diameter, must be drawn to $3 . 5 \ \mathrm { m m }$ . Take a maximum area reduction of $30 \ \ \%$ per pass (from the $6 3 \ \ \%$ ideal, discounted for friction, die angle and hardening), and ${ \bar { \sigma } } = 2 5 0 \ \mathrm { M P a }$ , $\mu = 0 . 0 8$ , $\alpha = 6 ^ { \circ }$ .

The area ratio per pass is $A _ { 1 } / A _ { 0 } = 0 . 7 0$ , so the number of passes is

$$
n \; = \; { \frac { \ln \left[ ( 3 . 5 / 8 . 0 ) ^ { 2 } \right] } { \ln 0 . 7 0 } } \; = \; { \frac { - 1 . 6 5 3 } { - 0 . 3 5 7 } } \; = \; 4 . 6 \qquad \Longrightarrow \qquad { \bf 5 \ passes }
$$

and the last pass carries a drawing stress of

$$
\sigma _ { d } \; = \; 2 5 0 \left( 1 + { \frac { 0 . 0 8 } { \tan 6 ^ { \circ } } } \right) \ln ( 1 / 0 . 7 0 ) \; = \; 2 5 0 \times 1 . 7 6 \times 0 . 3 5 7 \; = \; 1 5 7 \ \mathrm { M P a }
$$

**Five dies, five capstans, one motor, and a total area reduction of $8 1 \ \ \%$ — with one intermediate anneal, because after three passes the dislocation density has risen enough that the wire's ductility is nearly spent and it will fracture in the fourth die.** **The friction term is worth 76 % on top of the ideal work: $\mu / \tan \alpha = 0 . 7 6$ , so the die angle and the lubricant together cost more than the deformation does.** **This is why a wire shop's consumables are dies and lubricant, why the dies are re-lapped tens of times, and why the difference between a good shop and a bad one is measured in wire breaks per kilometre.**
:::

::: widget plot
title: Drawing stress and the wall at ln r = 1
f: log(x); 1; 1.76*log(x)
x: 1,3
y: 0,2
labels: σd/σ̄ = ln(A0/A1) — ideal; the yield of the drawn product: the limit; with a 6° die and μ = 0.08
caption: Drawing stress normalised by the flow stress, against the area ratio $A _ { 0 } / A _ { 1 }$ . The horizontal line is the strength of the wire leaving the die: **where the two cross, the wire yields all the way to the block and breaks**, at $A _ { 0 } / A _ { 1 } = e$ , a $6 3 \ \ \%$ area reduction. The third curve is the same calculation with a real die — a $6 ^ { \circ }$ semi-angle and $\mu = 0 . 0 8$ — and it crosses the limit at a $4 0 \ \ \%$ reduction, which is why the shop rule is 30-35 % for steel and why the same shop runs aluminium at 50-60 % (lower $\mu$ , lower $\bar { \sigma }$ , and a metal that recrystallises at the temperature of the draw itself). **The whole of wire-drawing practice — the number of dies, the anneals between them, the capstan sizes, the line speed — is arithmetic on this one figure.**
:::

## 7. What forming buys, and what it costs

::: definition Forming against the alternatives {#def-economics}
$$
\begin{array} { l l l l l }
& \textbf{Cast} & \textbf{Forged} & \textbf{Extruded} & \textbf{Machined} \\ \hline
\text{Relative density} & 9 7 { - } 9 9 \ \ \% & 1 0 0 \ \ \% & 1 0 0 \ \ \% & 1 0 0 \ \ \% \\
\text{Grain} & \text{equiaxed dendrites, segregated} & \text{flow lines follow the part} & \text{strong axial fibre} & \text{cut through the fibre} \\
\text{Fatigue strength, same alloy} & 0 . 6 { - } 0 . 8 \times & 1 . 0 \times & 0 . 9 \times \text{(along fibre)} & 0 . 8 { - } 1 . 0 \times \\
\text{Tolerance} & \pm 1 { - } 3 \ \mathrm { m m } & \pm 0 . 3 { - } 1 \ \mathrm { m m } & \pm 0 . 1 { - } 0 . 5 \ \mathrm { m m } & \pm 0 . 0 2 \ \mathrm { m m } \\
R _ { a } \ [ \mu \mathrm { m } ] & 1 2 { - } 2 5 & 6 { - } 1 2 & 1 . 6 { - } 3 . 2 & 0 . 4 { - } 3 . 2 \\
\text{Min section} & 5 \ \mathrm { m m } & 3 \ \mathrm { m m } \text{ (aluminium)} & 0 . 8 \ \mathrm { m m } & \text{tool-limited} \\
\text{Tooling} & \pounds 5 { - } 4 0 \mathrm { k } & \pounds 2 0 { - } 1 5 0 \mathrm { k } & \pounds 3 { - } 2 0 \mathrm { k } \text{ per profile} & \text{none} \\
\text{Rate} & \text{min-hours} & 1 { - } 6 0 / \mathrm { m i n } & 0 . 1 { - } 1 \ \mathrm { m / s } & \text{minutes per part} \\
\text{Buy-to-fly} & 1 . 2 { - } 2 & 1 . 2 { - } 2 . 5 & 1 . 0 5 { - } 1 . 3 & 3 { - } 1 0
\end{array}
$$

The pattern is consistent and it is not a trade-off you can have both ways. **Forming is chosen when the part needs the structure** — fatigue, impact, creep across the flow, pressure tightness — **or when the quantity makes the die pay** (see [[manufacturing/process-selection]] for the arithmetic), **or when the shape is long and constant** (extrusion) **or simple and round** (drawing, upsetting). **Forming is avoided when the shape has an undercut, a change of section no die can release, a hole no mandrel can reach, or a quantity below the break-even** — and every one of those four is a design decision made before the die is quoted, not after.

The last row is the one that has become a design argument. A machined titanium bracket has a buy-to-fly of 5-10 and a forged one 1.5-2.5; in a 20-tonne aircraft fuselage of titanium at £12 a kilogram of mill product and £110 an hour of five-axis time, that difference is worth more than the difference between the processes. **This is why the modern tendency is to form near-net and machine only the faces that must be held, and why the phrase "net-shape forging" is a commercial argument and not a technical one.**
:::

::: example Four routes for one part {#ex-routes level=3 check="1880"}
A stainless steel valve body: a hollow cylinder, $6 0 \ \mathrm { m m }$ bore, $1 1 0 \ \mathrm { m m }$ over the flanges, two radial ports, 316L, 20,000 a year.

**Sand cast and machined.** £34 the casting plus 45 minutes of machining = **£95**, buy-to-fly 3.4, and the body is porous enough that 2 % of them weep at the port face. **Forged and machined.** A closed-die forging in three impressions, £18 plus 18 minutes of machining = **£48**, no porosity, flow lines around the port radii, and a die cost of £95,000 amortised at £4.75 a piece — so **£53**. **Extruded tube, machined.** A drawn/extruded tube blank at £11 plus 12 minutes = **£35**, and the ports are drilled and machined radially, and the flow lines run the wrong way round the bore for a pressure part — acceptable at this pressure, not at ten times it. **Forged, then bored by deep drilling, then machined.** £53 minus the boring = **£46**, and the tooling is £120,000.

At 20,000 a year the forged route wins on cost *and* on quality, and the choice is made by the die's break-even against the cast route, whose tooling is £6,500 against £95,000: $( 9 5 , 0 0 0 - 6 , 5 0 0 ) / ( 9 5 - 4 8 ) = { \bf 1 \, 8 8 0 }$ pieces. **At 1,500 a year the casting wins and the porosity is accepted, or the part is redesigned to be cast thicker at the ports.** At 100 a year it is machined from bar at £210 and nobody complains, because the drawing was made for a prototype.
:::

## Exercises

::: exercise Bite angle limit {#ex-bite level=2 check="0.13"}
A rolling mill has $5 0 0 \ \mathrm { m m }$ diameter rolls and takes a $4 \ \mathrm { m m }$ reduction. What is the minimum coefficient of friction for the pass to bite at all? (Give $\mu$ to two decimal places.)
::: solution
$\cos \alpha = 1 - \Delta h / 2 R = 1 - 4 / 5 0 0 = 0 . 9 9 2$ , $\alpha = 7 . 2 5 ^ { \circ }$ , $\mu _ { \min } = \tan \alpha = { \bf 0 . 1 3 }$ . **Hot rolling runs at $\mu \approx 0 . 4$ and has nothing to worry about; cold rolling with oil at $\mu = 0 . 0 5$ could take only $2 \times 2 5 0 \times 0 . 0 5 ^ { 2 } = 1 . 2 5 \ \mathrm { m m }$ , which is why a cold reduction of 4 mm on this mill would sit there and skid, wearing the rolls and doing nothing.**
:::
:::

::: exercise Mill spring and gauge {#ex-spring level=2 check="23.6"}
A mill with a modulus of $8 \ \mathrm { M N / m m }$ is rolling with a force of $3 . 2 \ \mathrm { M N }$ to an exit thickness of $2 4 . 0 \ \mathrm { m m }$ . What gap must the rolls be set to? (Enter mm, to one decimal place.)
::: solution
$\delta = F / G = 3 . 2 / 8 = 0 . 4 0 \ \mathrm { m m }$ , so $s = 2 4 . 0 - 0 . 4 = { \bf 2 3 . 6 \ m m }$ . **And if the force rises to $4 . 0 \ \mathrm { M N }$ because the steel was $3 0 \ \mathrm { K }$ cooler than planned, the same setting gives $2 4 . 1 \ \mathrm { m m }$ — a $0 . 4 \ \ \%$ gauge error from a $3 \ \ \%$ temperature error.** **That sensitivity is the whole reason gauge control is a closed loop with a thickness gauge and a hydraulic screw-down, and the whole reason a mill's "mill modulus" is a number the process engineer recalibrates weekly.**
:::
:::

::: exercise Forging load with a thinner flash {#ex-flash level=2 check="0.95"}
In the flange example the flash land was $1 0 \ \mathrm { m m }$ wide over a $4 \ \mathrm { m m }$ flash, giving $p _ { \text{flash } } = 3 6 0 \ \mathrm { M P a }$ . Find the flash pressure if the land is reduced to $6 \ \mathrm { m m }$ , and the ratio of the total forging load. (Enter the load ratio to two decimal places.)
::: solution
$p _ { \text{flash } } = 2 \times 8 0 \times ( 1 + 6 / 8 ) = 3 2 0 \ \mathrm { M P a }$ , so the total pressure falls from $3 6 0 + 4 0 0 = 7 6 0$ to $3 2 0 + 4 0 0 = 7 2 0 \ \mathrm { M P a }$ and the load ratio is $7 2 0 / 7 6 0 = { \bf 0 . 9 5 }$ . **A 40 % cut in the land buys only a 5 % cut in load — because the impression's own deformation pressure, which the land does not touch, is more than half the total.** **The lever that does work is the flash thickness: doubling it to $8 \ \mathrm { m m }$ drops $p _ { \text{flash } }$ to $2 \times 8 0 \times ( 1 + 0 . 6 2 5 ) = 2 6 0 \ \mathrm { M P a }$ and the load by $1 3 \ \ \%$ — and it is the flash thickness that also risks an unfilled die, which is why the die designer sets it by trial and not by arithmetic.**
:::
:::

::: exercise Extrusion ratio and pressure {#ex-ext level=2 check="2.4"}
A $2 0 0 \ \mathrm { m m }$ aluminium billet is extruded to a profile of $2 { , } 0 0 0 \ \mathrm { m m } ^ { 2 }$ . Find the extrusion ratio and the ratio of the ideal pressure to that of a $1 0 { , } 0 0 0 \ \mathrm { m m } ^ { 2 }$ profile. (Give the pressure ratio to one decimal place.)
::: solution
$R _ { x } = \pi \times 1 0 0 ^ { 2 } / 2 \, 0 0 0 = 1 5 . 7$ and $p \propto \ln R _ { x }$ , so the ratio is $\ln 1 5 . 7 / \ln 3 . 1 4 = 2 . 7 5 / 1 . 1 4 = { \bf 2 . 4 }$ . **A five-fold finer product costs 2.4 times the pressure and nothing else — no extra machine, no extra die set, only a slower ram and a longer die.** **This logarithm is why extrusion is the cheapest way to make a fine section and why the extrusion limit diagram of a shop is drawn in terms of ram load and billet temperature rather than in terms of the profile.**
:::
:::

::: exercise Maximum reduction in one draw {#ex-drawlvl level=2 check="43"}
Using $\sigma _ { d } = { \bar { \sigma } } ( 1 + \mu / \tan \alpha ) \ln ( A _ { 0 } / A _ { 1 } )$ with $\mu = 0 . 0 8$ and $\alpha = 6 ^ { \circ }$ , find the maximum area reduction per pass if the limit is $\sigma _ { d } = { \bar { \sigma } }$ . (Enter per cent, to the nearest per cent.)
::: solution
$\ln ( A _ { 0 } / A _ { 1 } ) = 1 / 1 . 7 6 = 0 . 5 6 7$ , $A _ { 1 } / A _ { 0 } = 0 . 5 6 7$ , so the reduction is $1 - 0 . 5 6 7 = 0 . 4 3 3 \approx { \bf 4 3 \ \ \% }$ , and the shop uses 30-35 % to leave room for a die that is worn, a lubricant that is old and a coil that is slightly out of round. **Note that the limit is set by the strength of the product, not of the die: the harder the wire, the fewer the passes you can take, which is why high-carbon tyre-cord steel is drawn with 15-20 % reductions and why patenting — an isothermal heat treatment before drawing — is done to make it drawable at all.**
:::
:::

::: exercise Heat of drawing {#ex-heat level=3 check="49"}
Steel wire is drawn with a mean flow stress of $5 0 0 \ \mathrm { M P a }$ and a strain of $0 . 4$ . If none of the plastic work leaves the wire, what is its temperature rise? Take $\rho c _ { p } = 3 . 7 \ \mathrm { M J / m ^ { 3 } K }$ and a Taylor–Quenenne coefficient of $0 . 9$ . (Enter K.)
::: solution
$\Delta T = 0 . 9 \times 5 0 0 \times 1 0 ^ { 6 } \times 0 . 4 / 3 . 7 \times 1 0 ^ { 6 } = { \bf 4 9 \ K }$ . **Fifty degrees, which is enough to carbonise a soap lubricant, soften a drawn product's temper, and grow the die wear rate by a factor of several — and it scales directly with the reduction, which is why high-speed multi-pass rod mills put water-cooled capstans between every pass and why the pass schedule of a rod line is a thermal calculation as much as a force one.**
:::
:::

::: exercise Recrystallisation and what counts as hot {#ex-recryst level=3 check="700"}
Titanium melts at $1 { , } 6 6 8 \ \mathrm { ^ { \circ } C }$ . Taking the recrystallisation temperature as $0 . 5 \ T _ { m }$ , is a $2 5 0 \ \mathrm { ^ { \circ } C }$ forming operation hot or cold working? What is the recrystallisation temperature in $^ { \circ } \mathrm { C } \mathrm { ? }$ (Enter $^ { \circ } \mathrm { C }$ , to the nearest ten.)
::: solution
$T _ { m } = 1 { , } 9 4 1 \ \mathrm { K }$ , $0 . 5 T _ { m } = 9 7 0 \ \mathrm { K } = { \bf 7 0 0 \ ^ { \circ } C }$ — so $2 5 0 \ \mathrm { ^ { \circ } C }$ is **cold working** for titanium, and it work-hardens, springs back and needs an anneal between passes. **The same $2 5 0 \ \mathrm { ^ { \circ } C }$ is hot working for lead, warm working for aluminium and cold working for nickel: the number on the furnace tells you nothing until you have divided it by the melting point.** **This is why "warm forging" is a meaningful phrase only when the alloy is named, and why a process sheet that says "forge at $9 5 0 \ \mathrm { ^ { \circ } C }$" without saying "in the $\beta$ field, isothermal dies, $1 0 ^ { - 2 } \ \mathrm { s ^ { - 1 } }$" is not a process sheet.**
:::
:::

::: exercise Derive the bite condition and evaluate it {#ex-derivebite level=4 check="8.8"}
Show that $\Delta h _ { \max } = 2 R \mu ^ { 2 } / ( 1 + \mu ^ { 2 } )$ and find the maximum reduction per pass on $4 0 0 \ \mathrm { m m }$ diameter rolls with $\mu = 0 . 1 5$ . (Enter mm, to one decimal place.)
::: solution
Friction pulls in with $\mu N \cos \alpha$ , the normal reaction pushes out with $N \sin \alpha$ , and biting requires $\mu > \tan \alpha$ , so $\alpha _ { \max } = \arctan \mu$ and $\cos \alpha _ { \max } = 1 / \sqrt { 1 + \mu ^ { 2 } }$ . With $\cos \alpha = 1 - \Delta h / 2 R$ ,
$$
\Delta h _ { \max } = 2 R \left( 1 - { \frac { 1 } { \sqrt { 1 + \mu ^ { 2 } } } } \right) \approx { \frac { 2 R \mu ^ { 2 } } { 1 + \mu ^ { 2 } } } = { \frac { 4 0 0 \times 0 . 0 2 2 5 } { 1 . 0 2 2 5 } } = { \bf 8 . 8 \ m m }
$$
**The exact expression gives $8 . 8 \ \mathrm { m m }$ and the approximation $2 R \mu ^ { 2 } = 9 . 0 \ \mathrm { m m }$ , a $2 \ \ \%$ difference — the approximation is the one to remember and the exact one to use when the pass is near the limit.** **Note what the square does: doubling the friction quadruples the reduction you can take, which is why hot rolling with its scale friction is a heavy process, why the steel industry has spent eighty years trying to *increase* the friction of hot rolling (phosphate-soap lubrication for wire, oxalic acid for tube) and eighty years trying to reduce it for strip.**
:::
:::

::: exercise Derive the rolling power from the work of deformation {#ex-derivepower level=4 check="1.3"}
Compute the ideal power to roll the strip of the worked example ($3 0 0 \ \mathrm { m m }$ wide, $3 0  2 4 \ \mathrm { m m }$ , ${ \bar { \sigma } } = 2 5 0 \ \mathrm { M P a }$ , $1 0 0 \ \mathrm { r p m }$ , $6 0 0 \ \mathrm { m m }$ rolls) from $P = { \bar { \sigma } } \varepsilon \dot { V }$ , and compare it with the $1 . 7 \ \mathrm { M W }$ of the force-times-torque estimate. (Enter MW to one decimal place — the ideal value.)
::: solution
$\varepsilon = \ln ( 3 0 / 2 4 ) = 0 . 2 2 3$ . The rolling speed is $v = \pi D N = \pi \times 0 . 6 \times 1 0 0 / 6 0 = 3 . 1 4 \ \mathrm { m / s }$ , and the volume rate is $\dot { V } = w h _ { 1 } v = 0 . 3 0 0 \times 0 . 0 2 4 \times 3 . 1 4 = 0 . 0 2 2 6 \ \mathrm { m ^ { 3 } / s }$ . Then
$$
P = 2 5 0 \times 1 0 ^ { 6 } \times 0 . 2 2 3 \times 0 . 0 2 2 6 = { \bf 1 . 3 \ M W }
$$
**The ideal estimate is $1 . 3 \ \mathrm { M W }$ and the measured force-times-torque value $1 . 7 \ \mathrm { M W }$ , so $3 0 \ \ \%$ of the power is redundant work, friction sliding, roll deformation and drive losses — a typical figure, and the reason the two methods are used for different things: the work method to ask "what is the physics costing", the force method to ask "what must the motor be".** **Never mix them: quoting the ideal power to a motor manufacturer is how you buy a mill that trips its breaker on the first pass.**
:::
:::

::: quiz Why is a forging stronger than a casting of the same alloy {#quiz-forgestrength}
- [ ] Because forging heats the metal and heat treatment is implicit
- [x] Because forging closes the porosity, breaks up the cast structure, and aligns the flow lines with the part's contour
- [ ] Because forging work-hardens the metal
- [ ] Because forgings have a better surface finish
::: solution
**All the soundness reasons together: relative density from 97-99 % to 100 %, a fine equiaxed recrystallised structure instead of coarse dendrites and segregated bands, and a fibre of inclusions and precipitates that follows the shape instead of being cut through by it.** **Work hardening is *not* the reason — hot forging is above the recrystallisation temperature and leaves no hardening at all, and the fatigue advantage survives the final heat treatment. Surface finish is worse than a machined casting's, and it is the least of the four.**
:::
:::

::: quiz Why can extrusion take a 90 % area reduction and drawing only 40 % {#quiz-extrude-draw}
- [ ] Extrusion dies are harder than drawing dies
- [ ] Extrusion is done hot and drawing cold
- [x] In extrusion the work is confined and in compression; in drawing the drawn product must carry the whole drawing stress without yielding
- [ ] Extrusion uses lubricant and drawing does not
::: solution
**The limit in drawing is $\sigma _ { d } < \sigma _ { y , \text{exit } }$ : the wire leaving the die hangs the entire load, and if the stress exceeds its own flow stress it keeps necking until it breaks.** **In extrusion the billet is inside a container, the stress state is triaxial compression, and there is no necking mode available — so $R _ { x }$ is limited by the press and the die, not by the material. Hot and cold, lubrication and die hardness are all second-order next to that distinction, and cold extrusion of aluminium takes 90 % reductions in the cold state.**
:::
:::

## Where this lesson leads

- **[[manufacturing/sheet-metal-forming|Sheet-metal forming]]** takes the same flow stress into a completely different stress state — stretching and bending a thin skin instead of squashing a solid — and with it the forming-limit diagram, springback and deep drawing, none of which have an analogue here.
- **[[manufacturing/casting|Casting]]** supplies the stock this lesson forms, and the reason forging stock must be wrought: an under-reduced casting is a casting with a forging's bill.
- **[[manufacturing/machining|Machining]]** is what is left over: the trim lines, the datum faces and the bearing bores that no die can hold.
- **[[manufacturing/joining|Joining]]** covers friction stir welding and processing, which is the same plastic flow at a tool shoulder rather than through a die.
- **[[materials-science/dislocations-strengthening|Dislocations and strengthening]]** is the mechanism behind work hardening, recovery and recrystallisation, and behind the $n$ in $\sigma = K \varepsilon ^ { n }$ that appears in every force calculation here.
- **[[solid-mechanics/plasticity|Plasticity]]** gives the yield criteria, the flow rule and the upper- and lower-bound theorems that this lesson uses as a black box, and **[[solid-mechanics/stress-strain-3d|three-dimensional stress]]** the stress states that make a forging pressure ten times the flow stress.
- **[[manufacturing/process-selection|Process selection]]** is where the die cost of §7 meets the annual quantity.

::: history
**1700s.** Rolling begins as a mill for lead and copper sheet, and by **1766** Henry Cort's grooved-roll patent for puddled iron bar has made it a structural process; within a century a rail mill is producing 100-foot rails at a tonne a minute, and the **three-high reversing mill** of the 1860s and the **labour-saving** four-high of the 1920s are the shape of every plate mill since. **1797.** The **principle of the extrusion press** is patented in England by Joseph Bramah for lead pipe — a ram pushing metal through a die is a Bramah press doing what a Bramah press was invented to do — and the process is revived in **1888** for brass and copper, then in the **1930s-40s** for aluminium, when the demand for continuous structural sections from the aircraft and building industries turns it into the process that today makes the window frame, the bicycle frame and the bus floor. **1820s-30s.** Wire drawing mechanised: the drawing bench and then the continuous multi-block line, and with them the discovery that drawn iron wire is stronger than anything that was cast or forged from it — the wire rope of the suspension bridges and the hoisting ropes of the mines, and the **patenting** heat treatment of the 1840s that made high-carbon wire drawable at all. **1885.** **James Nasmyth's** steam hammer (patented 1842, built 1843) and then the forged steel cannon of Krupp establish that heavy engineering could be *wrought* rather than cast, and the great forgemasters' argument — that a forged axle is safer than a cast one — is settled by the fracture statistics of railway axles. **1930s-40s.** **Cold forging and cold heading** become possible when the electric screw press, phosphate-soap lubrication and low-carbon drawing-quality wire arrive together, and the fastener industry is invented: a bolt made in four stations at 200 a minute, work-hardened, with rolled threads that are twice as strong in fatigue as cut ones because the fibre is continuous. **1950s-60s.** **Precision and isothermal forging**: closed-die forgings to $\pm 0 . 1 \ \mathrm { m m }$ in titanium and superalloys for the jet engine, with heated dies and low ram speeds, and **1962**, the **powder metallurgy** and **rapid solidification** routes that let the impossible alloys be formed at all. **1991.** **Friction stir welding**, patented at The Welding Institute by Wayne Thomas and colleagues, does with a rotating shoulder what this lesson does with a press — severe plastic flow below the melting point — and founds a family of solid-state processes (stir processing, in-situ composites, dissimilar-metal joining) that were unimaginable when the only way to move metal was to melt it or crush it.
:::

::: summary
**Forming is chosen for the structure, not only the shape.** Forging closes porosity, refines the grain and lays the flow lines along the part, buying 20-40 % in fatigue and a great deal in toughness; cold working hardens; and near-net forming saves the buy-to-fly. The price is force, machine and die.
**The force is always ${ \bar { \sigma } } \times A \times Q$ , and $Q$ is the interesting factor.** The average flow stress $K \varepsilon ^ { n } / ( 1 + n )$ at the working temperature and strain rate, the contact area, and a constraint factor of 2-10 from the friction hill, redundant work and flash. Hot mild steel has a flow stress of $2 0 \ \mathrm { M P a }$ and a forging pressure of $1 { , } 5 0 0 \ \mathrm { M P a }$ ; the metal is not the difficulty, the interface is.
**Hot and cold are divided by recrystallisation, at $0 . 4 { - } 0 . 5 \ T _ { m }$ in kelvin.** Above it, no hardening, a fifth of the force, and scale; below it, hardening, springback, better surface and tolerance. Lead is hot-worked at room temperature and titanium is cold-worked at $2 5 0 \ \mathrm { ^ { \circ } C }$ .
**Rolling is a forging pass that drags itself in.** $L = \sqrt { R \Delta h }$ , $F = { \bar { \sigma } } Q w L$ , $T = F L / 2$ , $P = 2 T \omega$ ; the bite needs $\mu \geq \tan \alpha$ , so $\Delta h _ { \max } \approx 2 R \mu ^ { 2 }$ — 94 mm hot, 1.5 mm cold; and the exit gauge is $s + F / G$ , which is why gauge control is a feedback loop.
**Forging loads are set by the flash.** $p _ { \text{flash } } = 2 \sigma _ { y } ( 1 + a _ { f } / 2 h _ { f } )$ plus the impression's own friction hill, and the result is three to ten times plain compression. Draft, fillets, parting line, web-and-feather and a preform are not conventions; they are what makes the die fillable and cuttable.
**Extrusion is a logarithm and drawing is a limit.** $p = { \bar { \sigma } } \ln R _ { x }$ times a die factor and, for direct extrusion, $( 1 + 2 \mu L / D )$ of container friction; but in drawing the drawn product carries the load, so $\ln ( A _ { 0 } / A _ { 1 } ) < 1$ , a $6 3 \ \ \%$ ideal and a 30-40 % practical reduction per pass — hence five dies, two anneals, and one long line.
**Forming's economics are the die's economics.** Tolerance $\pm 0 . 1 \ \mathrm { m m }$ , $R _ { a } \ 1 . 6$ , buy-to-fly 1.2-2.5 and rates of tens a minute, against tooling of £20,000-150,000 and a shape that must be allowed by a parting line. Below the break-even quantity, forming is a way of making an expensive casting; above it, machining is a way of making an expensive forging.
:::

## Further reading

- T. Altan, S. Oh and G. L. Gegel, *Metal Forming: Fundamentals and Applications*, ASM International, 1983 — the slab analysis, the bound theorems and the forgeability tests, still the clearest treatment of §2.
- G. E. Dieter, *Mechanical Metallurgy*, 3rd ed., McGraw-Hill, 1986 — the flow curve, work hardening, recrystallisation and the mechanism behind every $\bar { \sigma }$ in this lesson.
- W. Johnson and R. Sowerby, "Extrusion", and R. J. Pickering, *Wire Technology*, in *ASM Handbook, Volume 14: Forming and Forging*, ASM International, 1988 — the process data of §5 and §6 from the source most shops still quote.
- F. B. Kelsall, K. M. Marshall and W. B. Hutton, *Metal Forming: Mechanisms and Manufacturability*, Edward Arnold, 1975 — the metallurgy of the flow line, and why a forging is what it is.
- B. Avitzur, *Handbook of Mechanical Working*, in *Manufacturing Science and Series*, and P. B. Kunhardt, *Metal Forming: Mechanics and Metallurgy*, 3rd ed., ASM International, 2005 — the mechanics of §2 to §6 in the shortest form that is still correct.
- T. Sheppard, *Structure of Metals and Alloys*, with the extrusion-limit diagrams of aluminium and magnesium, and the classic *Extrusion of Aluminium Alloys*, Kluwer, 1999 — why the die is washedered and the profile dies.
