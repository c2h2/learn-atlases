A shell-and-tube exchanger cools a ship's fresh-water circuit with sea water; a gasketed plate pack does the same liquid–liquid job at several times the coefficient in a fraction of the volume; the recuperator of a small gas turbine works between two gases, at a coefficient so low that it needs a surface density of hundreds of square metres per cubic metre and a pressure drop you pay for in shaft power for the rest of the machine's life. Most of this course so far has been about finding a coefficient. This lesson is about what you do with two of them, on opposite sides of a wall, with two fluids that must not mix and one temperature difference that runs out as you go.

Three questions organise the whole subject. **How big is the surface?** — that is the overall coefficient $U$ , the log-mean temperature difference, and the fouling you will regret. **What temperatures come out?** — that is effectiveness–NTU, and it is the question you actually have when you are rating an existing machine at part load. **Which of the two fluids decides everything?** — that is the capacity-rate ratio $C _ { r } = C _ { \min } / C _ { \max }$ , and it is why a gas cooler with a hundred times more water than gas behaves like a wall at the water temperature, and why the fins always go on the gas side.

::: warning Five exchanger errors, in order of how much they cost
1. **Using the arithmetic mean temperature difference.** It is always too big, sometimes by a factor of two, and the error is largest exactly where exchangers are designed — near a temperature pinch or a temperature cross. Use the log mean; if the two end differences are within $2 0 \ \ \%$ of each other the arithmetic mean is within half a per cent, and you should say that you used it.
2. **Forgetting the fouling resistance.** A clean water–water exchanger at $U = 8 5 0 \ \mathrm { W / m ^ { 2 } K }$ becomes $5 6 0$ with fouling resistances totalling $0 . 0 0 0 6 \ \mathrm { m ^ { 2 } K / W }$ , $3 4 \ \ \%$ worse, and the plant discovers this in August. $1 / U$ is a sum of resistances and the fouling terms are usually the two you left out.
3. **Averaging $U$ without noticing which side dominates.** If the gas side is $9 6 \ \ \%$ of the resistance, the water-side coefficient, the tube metal and the condensing film are all irrelevant — and conversely, a $2 0 \ \ \%$ improvement in the gas-side coefficient raises $U$ by $1 9 \ \ \%$ . Compute the resistance breakdown before you optimise anything.
4. **Accepting a correction factor below $0 . 8$.** A one-pass shell-and-tube with a large temperature cross has an $F$ that collapses steeply; designing at $F = 0 . 6$ means $6 7 \ \ \%$ more area than counterflow, and the answer is hypersensitive to the outlet temperatures. Below $0 . 8$ you change the configuration, not the area.
5. **Confusing the design and rating problems.** With outlet temperatures known, use LMTD. With outlet temperatures unknown — which is the usual rating question, and always the part-load question — LMTD is circular and $\varepsilon$–NTU is direct. Both methods rest on the same physics; they differ only in which quantities are known.
:::

## 1. The hardware, and what each type is for

::: definition Flow arrangements and the vocabulary {#def-arrangements}
Two fluids, separated by a wall, can flow **parallel** (both the same way), **counterflow** (opposite ways), **cross-flow** (at right angles, each stream either *mixed* — a free jet, a finned tube bank where the flow can go around — or *unmixed* — a ducted passage), or in some **multi-pass** combination. A **recuperative** exchanger (recuperator) keeps the two fluids apart through a wall; a **regenerator** (thermal wheel, Stirling-engine matrix, the checker brickwork of a blast-furnace stove) runs them alternately over the same surface and stores the heat in the matrix between passes. A **heat pipe** or **loop thermosyphon** moves the heat by evaporation and condensation in a sealed circuit, so that the two streams need not be at the same height or physically accessible.

The three numbers that describe any exchanger are: the **heat-capacity rate** $C = \dot { m } c _ { p }$ in $\mathrm { W / K }$ (not a property — a flow times a property), its minimum and maximum $C _ { \min }$ and $C _ { \max }$ , and the **capacity-rate ratio** $C _ { r } = C _ { \min } / C _ { \max }$ . A condenser or evaporator has one side at constant temperature, which is the limit $C \rightarrow \infty$ and therefore $C _ { r } = 0$ ; a **balanced** exchanger has $C _ { r } = 1$ .
:::

| Type | Typical $U$ ($\mathrm { W / m ^ { 2 } K }$, clean) | Area density ($\mathrm { m ^ { 2 } / m ^ { 3 } }$) | Where it is chosen, and why |
|:--|:--|:--|:--|
| Shell-and-tube, one pass, liquids | $3 0 0 - 1 5 0 0$ | $1 5 0 - 3 5 0$ | The workhorse: high pressure, high temperature, foulable, tube side cleanable by rodding. Everything in a power station. |
| Shell-and-tube, condensing steam / refrigerant | $1 0 0 0 - 4 0 0 0$ | $2 0 0 - 4 0 0$ | Condensers, evaporators, chillers. The tube-side fluid decides $U$ . |
| Double-pipe (concentric) | $2 0 0 - 1 2 0 0$ | $< 1 0 0$ | Very small duties, very high pressures, or a laboratory. True counterflow, no correction factor. |
| Plate-and-frame | $3 0 0 0 - 8 0 0 0$ | $3 0 0 - 5 0 0$ | Water–water district heating, food, refrigeration. Thin plates, turbulent at $\mathrm { R e } > 2 0 0$ , and area added by inserting plates. |
| Plate-fin (compact, brazed aluminium) | $4 0 - 3 0 0$ (gas-side dominated) | $4 0 0 - 1 0 0 0$ | Aircraft environmental systems, cryogenics, LNG, recuperators. Gas on one side, fins on both. |
| Tubed finned (gas–liquid) | $2 0 - 6 0$ per bare-tube area | $1 0 0 - 8 0 0$ | Air-cooled condensers, car radiators, waste-heat boilers, furnaces. Fins on the gas side, always. |
| Rotary regenerator (thermal wheel) | $3 0 - 1 2 0$ (as an equivalent) | $2 0 0 0 - 4 0 0 0$ | Air–air ventilation heat recovery, gas-turbine recuperators, Ljungström air heaters. Effectiveness above $0 . 8$ in a small volume; some carry-over. |
| Gasketed plate, condensing | $1 5 0 0 - 5 0 0 0$ | $3 0 0 - 5 0 0$ | Refrigeration condensers, evaporators. Small refrigerant charge, close approach temperatures. |

**Two things to notice in the $U$ column.** **The overall coefficient of a gas–liquid exchanger is an order of magnitude lower than that of a liquid–liquid one, not because the geometry is worse but because the gas coefficient is: $U$ can never exceed the worst coefficient in the series.** **And the compact types do not buy you a better $U$ — they buy you area per volume, which is the same thing as buying pressure drop.**

## 2. The overall coefficient: a series circuit, and the one resistor that matters

::: definition The overall heat-transfer coefficient and fouling {#def-overall}
For a tube of length $L$ , inside and outside diameters $D _ { i }$ and $D _ { o }$ , conductivity $k _ { w }$ , with coefficients $h _ { i }$ and $h _ { o }$ , the heat-transfer rate is written

$$q = U _ { o } A _ { o } \, \Delta T _ { \text{overall } } \ , \qquad { \frac { 1 } { U _ { o } A _ { o } } } = { \frac { 1 } { h _ { i } A _ { i } } } + { \frac { \ln ( D _ { o } / D _ { i } ) } { 2 \pi k _ { w } L } } + { \frac { 1 } { h _ { o } A _ { o } } } + \underbrace { { \frac { R _ { f , i } } { A _ { i } } } + { \frac { R _ { f , o } } { A _ { o } } } } _ { \text{fouling} }$$

Every term is a **thermal resistance in series**, and — this is the part students get wrong — the areas do not cancel: an inside resistance $1 / h _ { i }$ referred to the outside area must be multiplied by $D _ { o } / D _ { i }$ . The fouling resistances $R _ { f }$ are empirical allowances for scale, corrosion products, biological growth and ash; representative values (as tabulated by Incropera et al., from TEMA) are:

| Service | $R _ { f }$ ($\mathrm { m ^ { 2 } K / W }$) | Service | $R _ { f }$ ($\mathrm { m ^ { 2 } K / W }$) |
|:--|--:|:--|--:|
| Sea water and treated boiler feedwater, below $5 0 \ \ {} ^ { \circ } \mathrm { C }$ | $0 . 0 0 0 1$ | Sea water and treated boiler feedwater, above $5 0 \ \ {} ^ { \circ } \mathrm { C }$ | $0 . 0 0 0 2$ |
| River water, below $5 0 \ \ {} ^ { \circ } \mathrm { C }$ | $0 . 0 0 0 2$–$0 . 0 0 1$ | Fuel oil | $0 . 0 0 0 9$ |
| Steam, oil-free | $0 . 0 0 0 1$ | Refrigerating liquids | $0 . 0 0 0 2$ | $0 . 0 0 0 2$ | Air, dusty / compressor discharge | $0 . 0 0 0 6$ |

**The resistances are added as resistances, never as coefficients: two fluids at $h = 5 0 0 0$ and $h = 5 0$ give $U \approx 4 9 . 5$ , not $2 5 0 0$ and not $5 0 2 5$ .**
:::

::: example Where the resistance is, and what a fin buys {#ex-fin-why level=2 check="602"}
Water at $2 5 0 0 \ \mathrm { W / m ^ { 2 } K }$ flows inside $2 0 / 2 5 \ \mathrm { mm }$ carbon-steel tubes ($k _ { w } = 1 8 \ \mathrm { W / m \, K }$); combustion gases flow across the outside at $6 5 \ \mathrm { W / m ^ { 2 } K }$ . Find the overall coefficient referred to the bare outside tube area, first for bare tubes and then with gas-side fins. (Enter the finned-tube $U _ { o }$ in $\mathrm { W / m ^ { 2 } K }$ .) For bare tubes:

$${ \frac { 1 } { U _ { o } } } = \underbrace { { \frac { D _ { o } } { D _ { i } h _ { i } } } } _ { \textstyle 1 . 2 5 / 2 5 0 0 = 0 . 0 0 0 5 0 } + \underbrace { { \frac { D _ { o } \ln ( D _ { o } / D _ { i } ) } { 2 k _ { w } } } } _ { \textstyle 0 . 0 0 0 1 5 } + \underbrace { { \frac { 1 } { h _ { o } } } } _ { \textstyle 1 / 6 5 = 0 . 0 1 5 3 8 } = 0 . 0 1 6 0 4 \ \mathrm { m ^ { 2 } K / W } \qquad U _ { o } = 6 2 . 3 \ \mathrm { W / m ^ { 2 } K }$$

**The gas side is $9 6 \ \ \%$ of the resistance.** Now add circular fins on the outside, giving $1 8$ times the bare area with an overall surface efficiency $\eta _ { o } = 0 . 8 5$ , so the gas-side resistance referred to the bare area becomes $1 / ( \eta _ { o } A _ { \text{ratio} } h _ { o } )$ :

$${ \frac { 1 } { U _ { o } } } = 0 . 0 0 0 5 0 + 0 . 0 0 0 1 5 + { \frac { 1 } { 0 . 8 5 \times 1 8 \times 6 5 } } = 0 . 0 0 0 5 0 + 0 . 0 0 0 1 5 + 0 . 0 0 1 0 1 = 0 . 0 0 1 6 6 \qquad U _ { o } = \mathbf { 6 0 2 \ W / m ^ { 2 } K }$$

**A factor of nearly ten in overall coefficient for the price of the fins, because the fins attacked the only resistance that mattered.** **Note what happens to the water side. On bare tubes, raising $h _ { i }$ from $2 5 0 0$ to $1 0 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ changes $U$ from $6 2 . 3$ to $6 3 . 8$ , a $2 \ \ \%$ gain; on the finned tubes the water side is now $3 0 \ \ \%$ of the resistance and the same change raises $U$ from $6 0 2$ to $7 7 8$ , $2 9 \ \ \%$ .** **Fixing the dominant resistance changes which resistance dominates — so the breakdown has to be recomputed after every improvement.**
:::

::: example Fouling: the exchanger you bought in March and lost in August {#ex-fouling level=2 check="563"}
A water–water exchanger is specified clean at $U _ { \text{clean } } = 8 5 0 \ \mathrm { W / m ^ { 2 } K }$ . The design allows fouling resistances of $0 . 0 0 0 2$ on the tube side and $0 . 0 0 0 4 \ \mathrm { m ^ { 2 } K / W }$ on the shell side, both referred to the same area. Find the fouled coefficient. (Enter $U _ { \text{dirty} }$ in $\mathrm { W / m ^ { 2 } K }$ .)

$$U _ { \text{dirty } } = \left[ { \frac { 1 } { 8 5 0 } } + 0 . 0 0 0 2 + 0 . 0 0 0 4 \right] ^ { - 1 } = \left[ 0 . 0 0 1 1 7 6 + 0 . 0 0 0 6 \right] ^ { - 1 } = \mathbf { 5 6 3 \ W / m ^ { 2 } K }$$

**A $3 4 \ \ \%$ loss of coefficient, which at fixed area takes a counterflow unit with $C _ { r } = 0 . 7 5$ from an effectiveness of $0 . 7 2$ to $0 . 6 1$ — and at fixed duty needs $5 1 \ \ \%$ more area than the clean calculation asks for.** **Two design consequences, both standard practice: the area is bought dirty, so a new exchanger outperforms its specification and is run with a bypass or a throttled flow until the fouling arrives; and the cleaning interval is set by the cost of the lost heat against the cost of a shutdown.** **And the allowance itself is uncertain: had the shell side been river water at the top of the range in the table, $0 . 0 0 1$ , $U$ would have been $4 2 1$ , another $2 5 \ \ \%$ lower — fouling tables are guidance, and the entries for the same service differ by factors of several.**
:::

## 3. The log-mean temperature difference

::: proof The LMTD, and why the mean is logarithmic {#proof-lmtd}
Take a counterflow exchanger of area $A$ , with hot fluid at capacity rate $C _ { h }$ entering at $T _ { h , i }$ and cold at $C _ { c }$ entering at $T _ { c , i }$ . At a station where the hot fluid has given up $q ( x )$ , its temperature is $T _ { h } = T _ { h , i } - q / C _ { h }$ and the cold fluid, going the other way, is at $T _ { c } = T _ { c , i } + ( Q - q ) / C _ { c }$ . The local temperature difference is therefore **linear in $q$** :

$$\Delta T ( q ) = T _ { h } - T _ { c } = \underbrace { \left( T _ { h , i } - T _ { c , i } - { \frac { Q } { C _ { c } } } \right) } _ { \Delta T _ { 2 } \text{, the value at } q = 0 } + q \left( { \frac { 1 } { C _ { c } } } - { \frac { 1 } { C _ { h } } } \right)$$

and the local heat transfer is $d q = U \, \Delta T \, d A$ . Eliminating $q$ between $d q = U \Delta T \, d A$ and $d ( \Delta T ) = ( 1 / C _ { c } - 1 / C _ { h } ) \, d q$ gives $d ( \Delta T ) / \Delta T = U ( 1 / C _ { c } - 1 / C _ { h } ) \, d A$ , which integrates to a logarithm. With $1 / C _ { c } - 1 / C _ { h } = ( \Delta T _ { 1 } - \Delta T _ { 2 } ) / Q$ , where $\Delta T _ { 1 }$ is the difference at $q = Q$ (the hot outlet end),

$$\boxed { \ Q = U A \, \Delta T _ { \mathrm { lm } } \ , \qquad \Delta T _ { \mathrm { lm } } = { \frac { \Delta T _ { 1 } - \Delta T _ { 2 } } { \ln ( \Delta T _ { 1 } / \Delta T _ { 2 } ) } } \ } \qquad \Delta T _ { 1 } , \Delta T _ { 2 } = \text{end differences}$$

**Three things the derivation tells you, none of them in the formula.** **The result is identical for parallel flow (with the end differences defined as $T _ { h } - T _ { c }$ at each end) and for counterflow — the difference between the two arrangements is entirely in what the end differences turn out to be.** **It requires $U$ and $c _ { p }$ to be constant along the exchanger, which fails badly when one side condenses or boils, and is the reason a condenser with superheat and subcooling zones must be calculated zone by zone.** **And $\Delta T _ { \mathrm { lm } }$ always lies below the arithmetic mean, by more as $\Delta T _ { 1 } / \Delta T _ { 2 }$ grows — at an end-difference ratio of $3$ the arithmetic mean is $1 0 \ \ \%$ high, at $1 0$ it is $4 1 \ \ \%$ high, and at $1 0 0$ it is $1 3 5 \ \ \%$ high (the log mean is then $5 7 \ \ \%$ below it).**
:::

::: example Counterflow, parallel, and the ten per cent you did not have {#ex-lmtd level=2 check="4.2"}
Hot water, $2 . 0 \ \mathrm { k g / s }$ , is cooled from $9 0$ to $7 0 \ \ {} ^ { \circ } \mathrm { C }$ against $1 . 5 \ \mathrm { k g / s }$ entering at $2 0 \ \ {} ^ { \circ } \mathrm { C }$ . Take $c _ { p } = 4 1 8 0 \ \mathrm { J / k g \, K }$ and $U = 8 5 0 \ \mathrm { W / m ^ { 2 } K }$ , and find the counterflow area. (Enter $A$ in $\mathrm { m ^ { 2 } }$ .)

$$C _ { h } = 8 3 6 0 \ \mathrm { W / K } \qquad C _ { c } = 6 2 7 0 \ \mathrm { W / K } \qquad Q = 8 3 6 0 \times 2 0 = 1 6 7 . 2 \ \mathrm { k W } \qquad T _ { c , o } = 2 0 + { \frac { 1 6 7 \, 2 0 0 } { 6 2 7 0 } } = 4 6 . 7 \ \mathrm { {} ^ { \circ } C }$$

**Counterflow:** $\Delta T _ { 1 } = 9 0 - 4 6 . 7 = 4 3 . 3 \ \mathrm { K }$ , $\Delta T _ { 2 } = 7 0 - 2 0 = 5 0 \ \mathrm { K }$ ,

$$\Delta T _ { \text{lm } } = { \frac { 5 0 - 4 3 . 3 } { \ln ( 5 0 / 4 3 . 3 ) } } = 4 6 . 6 \ \mathrm { K } \qquad A = { \frac { 1 6 7 \, 2 0 0 } { 8 5 0 \times 4 6 . 6 } } = \mathbf { 4 . 2 \ m ^ { 2 } } \ ( 4 . 2 2 )$$

**Parallel flow:** the same duty and outlet temperatures give $\Delta T _ { 1 } = 9 0 - 2 0 = 7 0 \ \mathrm { K }$ and $\Delta T _ { 2 } = 7 0 - 4 6 . 7 = 2 3 . 3 \ \mathrm { K }$ , $\Delta T _ { \text{lm } } = 4 2 . 5 \ \mathrm { K }$ and $A = 4 . 6 3 \ \mathrm { m ^ { 2 } }$ , **$1 0 \ \ \%$ more surface for the same duty** — and, more importantly, parallel flow can never heat the cold stream above the common temperature $( C _ { h } T _ { h , i } + C _ { c } T _ { c , i } ) / ( C _ { h } + C _ { c } ) = 6 0 \ \ {} ^ { \circ } \mathrm { C }$ at any area, because the two outlets approach each other asymptotically; counterflow has no such limit.

**The arithmetic mean of the two counterflow end differences is $4 6 . 7 \ \mathrm { K }$ , within $0 . 2 \ \ \%$ of the log mean, because the end differences happen to be nearly equal — which is why "use the arithmetic mean if the end differences are within $2 0 \ \ \%$ " is a safe rule.** **Note also that $C _ { h } > C _ { c }$ : the cold stream does the bigger temperature swing, and the hot stream's $2 0 \ \mathrm { K }$ drop buys the cold stream $2 6 . 7 \ \mathrm { K }$ . The stream with the smaller capacity rate always swings more; that is $C _ { \min }$ .**
:::

::: definition The correction factor $F$ : real exchangers are not counterflow {#def-ffactor}
For any arrangement other than pure counterflow or a condenser, the rate equation is written $Q = U A F \Delta T _ { \text{lm,cf } }$ where $\Delta T _ { \text{lm,cf } }$ is the counterflow log mean of the four terminal temperatures and $F \leq 1$ depends on two dimensionless temperature ratios,

$$P = { \frac { t _ { 2 } - t _ { 1 } } { T _ { 1 } - t _ { 1 } } } \quad \text{(thermal effectiveness of the cold stream)} \qquad R = { \frac { T _ { 1 } - T _ { 2 } } { t _ { 2 } - t _ { 1 } } } = { \frac { C _ { c } } { C _ { h } } } \quad \text{(heat-capacity ratio)}$$

For a **1–2 exchanger** (one shell pass, two tube passes) the analytic form is

$$F = { \frac { \sqrt { R ^ { 2 } + 1 } } { R - 1 } } \, { \frac { \ln \left[ ( 1 - P ) / ( 1 - P R ) \right] } { \ln \left[ \dfrac { 2 / P - 1 - R + \sqrt { R ^ { 2 } + 1 } } { 2 / P - 1 - R - \sqrt { R ^ { 2 } + 1 } } \right] } }$$

**$F$ is close to one over most of the map and then falls off a cliff as $P R \rightarrow 1$ , because the exchanger is being asked to produce a temperature change that the flow arrangement cannot physically deliver.** **The rule is $F \geq 0 . 8 5$ (never below $0 . 8$): below that the area is hypersensitive to the outlet temperatures, and the answer is more shell passes or counterflow, not more area.** **For cross-flow, $F$ is read from charts and in the normal design range is typically $0 . 8$ to $0 . 9 5$ .**
:::

::: widget plot
title: The correction factor of a one-shell-pass, two-tube-pass exchanger
f: (sqrt(0.25+1)/(0.5-1))*ln((1-x)/(1-0.5*x))/ln((2/x-1-0.5+sqrt(0.25+1))/(2/x-1-0.5-sqrt(0.25+1))); (sqrt(4+1)/(2-1))*ln((1-x)/(1-2*x))/ln((2/x-1-2+sqrt(4+1))/(2/x-1-2-sqrt(4+1)))
x: 0.02,0.36
y: 0.4,1.05
hlines: 0.8
labels: P — cold-stream temperature change / max possible; F — correction factor; R = 0.5 (hot stream swings half as much as the cold); R = 2 (hot stream swings twice as much as the cold); design floor F = 0.8
caption: The correction factor $F$ for a 1–2 shell-and-tube exchanger against the cold-stream temperature ratio $P = ( t _ { 2 } - t _ { 1 } ) / ( T _ { 1 } - t _ { 1 } )$ , for two capacity ratios. When $R$ is large — the hot stream swings more than the cold one, which means $C _ { h } < C _ { c }$ — $F$ collapses at much smaller $P$ , as the arrangement approaches its thermodynamic limit, and the required surface tends to infinity for a flow arrangement that is running out of temperature difference. The $0 . 8$ line is the design floor: below it the exchanger is not undersized, it is the wrong shape.
:::

## 4. Effectiveness–NTU: the method for the question you actually have

::: definition Effectiveness, NTU, and the capacity ratio {#def-epsilon}
The exchanger is fed two known inlet temperatures, and what you want to know is what comes out. Define the **maximum possible heat transfer** as the transfer that would bring the stream with the *smaller* capacity rate all the way to the other stream's inlet temperature,

$$Q _ { \max } = C _ { \min } \left( T _ { h , i } - T _ { c , i } \right) \ , \qquad \varepsilon = { \frac { Q } { Q _ { \max } } } \ , \qquad \boxed { \ \varepsilon = f ( \mathrm { N T U } , \, C _ { r } , \, \text{arrangement} ) \ } \qquad \mathrm { N T U } = { \frac { U A } { C _ { \min } } }$$

where **NTU, the number of transfer units, is the ratio of the exchanger's conductance $U A$ to the flow's ability to carry heat away, $C _ { \min }$** — a dimensionless "how much surface have I got, relative to how much fluid is going past it". Then the outlet temperatures follow without any iteration:

$$T _ { h , o } = T _ { h , i } - \varepsilon { \frac { C _ { \min } } { C _ { h } } } ( T _ { h , i } - T _ { c , i } ) \ , \qquad T _ { c , o } = T _ { c , i } + \varepsilon { \frac { C _ { \min } } { C _ { c } } } ( T _ { h , i } - T _ { c , i } )$$

The closed forms for the common arrangements:

| Arrangement | $\varepsilon ( \mathrm { N T U } , C _ { r } )$ |
|:--|:--|
| Condenser or evaporator, $C _ { r } = 0$ | $1 - e ^ { - \mathrm { N T U } }$ |
| Counterflow, $C _ { r } < 1$ | $\dfrac { 1 - \exp [ - \mathrm { N T U } ( 1 - C _ { r } ) ] } { 1 - C _ { r } \exp [ - \mathrm { N T U } ( 1 - C _ { r } ) ] }$ |
| Counterflow, balanced, $C _ { r } = 1$ | $\dfrac { \mathrm { N T U } } { 1 + \mathrm { N T U } }$ |
| Parallel flow | $\dfrac { 1 - \exp [ - \mathrm { N T U } ( 1 + C _ { r } ) ] } { 1 + C _ { r } }$ |
| Cross-flow, both unmixed (approximate) | $1 - \exp \! \left[ { \frac { 1 } { C _ { r } } } \mathrm { N T U } ^ { 0 . 2 2 } \left( e ^ { - C _ { r } \mathrm { N T U } ^ { 0 . 7 8 } } - 1 \right) \right]$ |
| Cross-flow, $C _ { \max }$ mixed, $C _ { \min }$ unmixed | ${ \frac { 1 } { C _ { r } } } \left\{ 1 - \exp \! \left[ - C _ { r } \left( 1 - e ^ { - \mathrm { N T U } } \right) \right] \right\}$ |
| Balanced counterflow regenerator, fast rotation | $\dfrac { \mathrm { N T U } } { 1 + \mathrm { N T U } }$ (the balanced counterflow limit) |

**Use LMTD when the four temperatures are known and you want the area — the design problem. Use $\varepsilon$–NTU when the area is known and you want the temperatures — the rating problem, and every part-load, off-design, "what happens if I halve the flow" question you will ever be asked.**
:::

::: proof The effectiveness of a counterflow exchanger {#proof-epsilon-cf}
Measure position from the hot inlet. In an element $d A$ the hot fluid falls by $d T _ { h }$ and, because the cold fluid flows the other way, the cold temperature at the same station falls too: $d q = - C _ { h } \, d T _ { h } = - C _ { c } \, d T _ { c } = U \Delta T \, d A$ with $\Delta T = T _ { h } - T _ { c }$ . So

$$d ( \Delta T ) = d T _ { h } - d T _ { c } = - \left( { \frac { 1 } { C _ { h } } } - { \frac { 1 } { C _ { c } } } \right) d q = - U \Delta T \left( { \frac { 1 } { C _ { h } } } - { \frac { 1 } { C _ { c } } } \right) d A$$

which integrates from the hot-inlet end ($\Delta T = T _ { h , i } - T _ { c , o }$ ) to the hot-outlet end ($\Delta T = T _ { h , o } - T _ { c , i }$ ). Suppose the hot stream is $C _ { \min }$ , so $C _ { h } = C _ { \min }$ and $C _ { c } = C _ { \min } / C _ { r }$ :

$$\frac { T _ { h , o } - T _ { c , i } } { T _ { h , i } - T _ { c , o } } = \exp \left[ - \mathrm { N T U } ( 1 - C _ { r } ) \right]$$

**Now substitute $T _ { h , o } = T _ { h , i } - \varepsilon \Delta T _ { i }$ and $T _ { c , o } = T _ { c , i } + \varepsilon C _ { r } \Delta T _ { i }$ , with $\Delta T _ { i } = T _ { h , i } - T _ { c , i }$ : the left-hand side becomes $( 1 - \varepsilon ) / ( 1 - \varepsilon C _ { r } )$ , and solving for $\varepsilon$ gives the counterflow result in the table.** (Taking the cold stream as $C _ { \min }$ gives the same formula.) **Two limits fall out for free.** **As $C _ { r } \rightarrow 0$ (one side condensing) it becomes $1 - e ^ { - \mathrm { N T U } }$ , the same exponential as the lumped-capacitance answer of [[heat-transfer/transient-conduction]], with time replaced by the ratio $U A / C$ .** **And as $C _ { r } \rightarrow 1$ the expression becomes $0 / 0$ and its limit is $\mathrm { N T U } / ( 1 + \mathrm { N T U } )$ , which is why the balanced case is tabulated separately; for a given effectiveness, counterflow needs the most NTU when the capacity rates are equal.**
:::

::: example Rating an air heater you already own {#ex-airheater level=3 check="42.3"}
A cross-flow heat exchanger with both streams unmixed has $A = 1 2 \ \mathrm { m ^ { 2 } }$ and $U = 4 5 \ \mathrm { W / m ^ { 2 } K }$ (gas-side dominated, as always). Air at $1 . 0 \ \mathrm { k g / s }$ and $2 0 \ \ {} ^ { \circ } \mathrm { C }$ is heated by water at $0 . 5 \ \mathrm { k g / s }$ and $8 0 \ \ {} ^ { \circ } \mathrm { C }$ . Take $c _ { p , a } = 1 0 0 7$ , $c _ { p , w } = 4 1 8 0 \ \mathrm { J / k g \, K }$ , and find the air outlet temperature. (Enter it in $^ { \circ } \mathrm { C }$ .)

$$C _ { a } = 1 0 0 7 \ \mathrm { W / K } \qquad C _ { w } = 2 0 9 0 \ \mathrm { W / K } \qquad C _ { \min } = C _ { a } \ , \quad C _ { r } = { \frac { 1 0 0 7 } { 2 0 9 0 } } = 0 . 4 8 2$$

$$\mathrm { N T U } = { \frac { U A } { C _ { \min } } } = { \frac { 4 5 \times 1 2 } { 1 0 0 7 } } = 0 . 5 3 6 \qquad \varepsilon = 1 - \exp \! \left[ { \frac { 0 . 5 3 6 ^ { 0 . 2 2 } } { 0 . 4 8 2 } } \left( e ^ { - 0 . 4 8 2 \times 0 . 5 3 6 ^ { 0 . 7 8 } } - 1 \right) \right] = 0 . 3 7 1$$

$$Q = \varepsilon C _ { \min } \Delta T _ { i } = 0 . 3 7 1 \times 1 0 0 7 \times 6 0 = 2 2 . 4 \ \mathrm { k W } \qquad T _ { a , o } = 2 0 + { \frac { 2 2 \, 4 0 0 } { 1 0 0 7 } } = \mathbf { 4 2 . 3 \ {} ^ { \circ } C } \qquad T _ { w , o } = 8 0 - { \frac { 2 2 \, 4 0 0 } { 2 0 9 0 } } = 6 9 . 3 \ \mathrm { {} ^ { \circ } C }$$

**The air leaves at $4 2 \ \ {} ^ { \circ } \mathrm { C }$ , nowhere near the $8 0 \ \ {} ^ { \circ } \mathrm { C }$ water, and the water barely notices the exchange — it falls $1 1 \ \mathrm { K }$ while the air rises $2 2 \ \mathrm { K }$ , because the water has twice the capacity rate.** **The stream with the smaller capacity rate does most of the moving and sets $Q _ { \max }$ ; with an NTU of only $0 . 5 4$ this exchanger captures barely more than a third of it.** **Note also what the answer does *not* require: no iteration, no assumed outlet temperatures, no log mean of things you do not yet know.**
:::

::: widget plot
title: How much effectiveness your NTU buys, and what it costs to get the last ten per cent
f: 1-exp(-x); (1-exp(-0.5*x))/(1-0.5*exp(-0.5*x)); x/(1+x); (1-exp(-2*x))/2
x: 0,5
y: 0,1
labels: NTU = UA/Cmin; effectiveness ε; Cr = 0 (condensing side); counterflow, Cr = 0.5; balanced counterflow, Cr = 1; parallel flow, Cr = 1
caption: Effectiveness against number of transfer units for four cases. Read the shape, not the values: the first unit of NTU buys a great deal and the fifth buys almost nothing, so an exchanger at $\mathrm { N T U } = 4$ is already in the flat part of the curve and the cheapest way to more heat is usually less flow, not more area. The gap between the balanced counterflow curve and the balanced parallel-flow curve is the whole case for counterflow — at $\mathrm { N T U } = 5$ , $0 . 8 3$ against $0 . 5 0$ — and the $C _ { r } = 0$ curve (a condenser) is the easiest duty of all, because the driving difference never decays.
:::

::: example Part load: the same exchanger at half the flow {#ex-partload level=3 check="125"}
The $4 . 2 2 \ \mathrm { m ^ { 2 } }$ water–water exchanger of the LMTD example is put into service with **both flows halved** at the same inlet temperatures. Keep $U = 8 5 0 \ \mathrm { W / m ^ { 2 } K }$ for simplicity (in reality it falls with the flow — see the quiz at the end). Find the duty. (Enter $Q$ in kW.) $C _ { h } = 4 1 8 0$ , $C _ { c } = 3 1 3 5 \ \mathrm { W / K }$ , so $C _ { \min } = 3 1 3 5$ , $C _ { r } = 0 . 7 5$ and

$$\mathrm { N T U } = { \frac { 8 5 0 \times 4 . 2 2 } { 3 1 3 5 } } = 1 . 1 4 \qquad \varepsilon = { \frac { 1 - \exp [ - 1 . 1 4 \times 0 . 2 5 ] } { 1 - 0 . 7 5 \exp [ - 1 . 1 4 \times 0 . 2 5 ] } } = { \frac { 0 . 2 4 9 } { 0 . 4 3 7 } } = 0 . 5 7 0$$

$$Q = 0 . 5 7 0 \times 3 1 3 5 \times 7 0 = \mathbf { 1 2 5 \ k W } \qquad T _ { h , o } = 9 0 - { \frac { 1 2 5 \, 0 0 0 } { 4 1 8 0 } } = 6 0 . 1 \ \mathrm { {} ^ { \circ } C } \qquad T _ { c , o } = 2 0 + { \frac { 1 2 5 \, 0 0 0 } { 3 1 3 5 } } = 5 9 . 9 \ \mathrm { {} ^ { \circ } C }$$

**Halving both flows raises the effectiveness from $0 . 3 8$ to $0 . 5 7$ — the same surface sees the fluid for twice as long — but cuts the duty from $1 6 7$ to $1 2 5 \ \mathrm { k W }$ , because $Q _ { \max } = C _ { \min } \Delta T _ { i }$ halved with the flow.** **The outlet temperatures are now within $0 . 2 \ \mathrm { K }$ of each other — a coincidence of these numbers, but a sign that the exchanger now has a lot of surface for the flow it carries.** **The general lesson: at fixed inlet temperatures the duty falls less than in proportion to the flow, because the effectiveness rises as the flow falls, and only $\varepsilon$–NTU gives that answer without iteration.**
:::

## 5. Cross-flow, multi-pass and regenerative hardware

::: definition Mixed, unmixed, and why the distinction matters {#def-mixed}
A stream is **unmixed** when the flow is confined to a duct or passage so that it cannot redistribute temperature across the exchanger's width, and **mixed** when it can — a cross-flow over tube banks is mixed because the fluid slides around the tubes and re-averages, while the fluid inside the tubes is unmixed. **Mixing destroys the temperature difference**: a mixed stream leaves a row at the average of what it just received, so it cannot be pushed as far as an unmixed one. The penalty grows with NTU and $C _ { r }$ — from negligible at $\mathrm { N T U } \approx 1$ to about $1 5 \ \ \%$ of effectiveness for a balanced unit at $\mathrm { N T U } = 5$ (both-unmixed $0 . 7 5$ against one-mixed $0 . 6 3$ ). **A related trap: a bypass or leak path lets part of a stream skip the surface, and the exchanger quietly loses performance that no correlation predicts.**
:::

::: example Plate against shell: the same duty in a fraction of the volume {#ex-plate level=3 check="0.60"}
The $1 6 7 \ \mathrm { k W }$ water–water duty of the LMTD example, in a gasketed plate-and-frame exchanger with $U = 6 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ (typical: the corrugated plates make the flow turbulent at Reynolds numbers of a few hundred, at passage velocities of a few tenths of a metre per second), treated as counterflow. Find the area. (Enter $A$ in $\mathrm { m ^ { 2 } }$ .)

$$A = { \frac { 1 6 7 \, 2 0 0 } { 6 0 0 0 \times 4 6 . 6 } } = \mathbf { 0 . 6 0 \ m ^ { 2 } } \qquad \text{against } 4 . 2 \ \mathrm { m ^ { 2 } } \text{ for the shell-and-tube at } U = 8 5 0$$

**Seven times less surface, and — because plate packs run at $3 0 0$ to $5 0 0 \ \mathrm { m ^ { 2 } / m ^ { 3 } }$ against $2 0 0$ for a shell-and-tube bundle — roughly a tenth of the volume.** **What it costs: elastomer gaskets that limit the temperature to roughly $1 5 0 \ \ {} ^ { \circ } \mathrm { C }$ and the pressure to roughly $2 . 5 \ \mathrm { M P a }$ , and narrow passages, a few millimetres wide, that block with debris (although the pack can be opened and the plates cleaned by hand).** **That trade — coefficient and compactness against fouling tolerance and pressure–temperature limits — is the entire selection decision between the two machines, and it is why district-heating substations use plates and high-pressure power-station feedwater heaters do not.**
:::

::: definition Regenerators, and the price of a hot matrix {#def-regenerator}
A **regenerator** stores heat in a thermal mass and hands it to the other stream a moment later: a rotating wheel of corrugated metal foil (Ljungström air preheaters, ventilation heat-recovery wheels), a fixed bed of checker brick switched between hot and cold gas (blast-furnace stoves, glass furnaces), or the wire-gauze matrix of a Stirling engine. For a balanced, ideal, infinitely-fast-switched wheel the effectiveness is exactly the balanced counterflow result, $\varepsilon = \mathrm { N T U } / ( 1 + \mathrm { N T U } )$ , with $\mathrm { N T U } = h A _ { s } / C _ { \min }$ referred to the matrix surface — and because the matrix can be packed at $2 0 0 0$ to $4 0 0 0 \ \mathrm { m ^ { 2 } / m ^ { 3 } }$ , wheels reach $\varepsilon = 0 . 7 5$ to $0 . 8 5$ in a fraction of the volume of a recuperator. **Three costs come with it: carry-over** (the gas trapped in the matrix is carried into the other stream — acceptable for air–air, unacceptable for many process gases, and the reason wheels are fitted with a purge sector), **matrix temperature control** (a boiler air preheater whose cold end runs below the acid dew point of the flue gas corrodes and fouls), and **parasitic drive power** for the wheel. **The Stirling engine's regenerator is the extreme case: a fine-wire matrix with an area density of order $1 0 ^ { 4 } \ \mathrm { m ^ { 2 } / m ^ { 3 } }$ and an effectiveness that must approach $0 . 9 9$ , because every per cent of regenerator ineffectiveness is heat the engine has to supply again.**
:::

## 6. The pinch, and what the last kelvin costs

::: definition The temperature difference is the currency {#def-pinch}
On a $T$–$Q$ diagram (temperature against cumulative heat transfer) each stream is a straight line of slope $1 / C$ , and the vertical gap between them is the local driving difference. **The pinch is the smallest gap on the diagram**, and it is where the exchanger is being asked for the most area per watt. For a balanced counterflow exchanger the gap is uniform and equal to $( 1 - \varepsilon ) \Delta T _ { i }$ , so the area follows the law

$$A = { \frac { Q } { U \Delta T _ { \text{gap } } } } = { \frac { C _ { \min } \, \varepsilon \, \Delta T _ { i } } { U ( 1 - \varepsilon ) \Delta T _ { i } } } = { \frac { C _ { \min } } { U } } \, { \frac { \varepsilon } { 1 - \varepsilon } } \qquad \Longrightarrow \qquad \boxed { A = { \frac { C _ { \min } } { U } } \, { \frac { \Delta T _ { i } - \Delta T _ { \text{pinch } } } { \Delta T _ { \text{pinch } } } } \approx { \frac { C _ { \min } } { U } } { \frac { \Delta T _ { i } } { \Delta T _ { \text{pinch } } } } }$$

**Once the approach is small compared with the inlet difference, halving it roughly doubles the area.** **The economic optimum is therefore not "as close as possible": typical design approaches are a few kelvin to $1 5 \ \mathrm { K }$ for liquid–liquid and refrigeration duties, larger for gas–liquid exchangers where surface is expensive, and only one to a few kelvin in cryogenic and air-separation plant, where the refrigeration that a large approach would waste is costlier still.** **The same diagram is the tool of pinch analysis for a whole plant: the exchanger network is designed so that no exchanger has a gap smaller than the chosen minimum, and the total area of the plant is minimised by moving heat between streams before ever reaching for cooling water.**
:::

::: example The cost of the last seven kelvin {#ex-approach level=3 check="66.4"}
A balanced water–water exchanger, $C _ { \min } = 6 2 7 0 \ \mathrm { W / K }$ , $U = 8 5 0 \ \mathrm { W / m ^ { 2 } K }$ , inlets $9 0$ and $2 0 \ \ {} ^ { \circ } \mathrm { C }$ . How much surface does each approach temperature need? (Enter the area for a $7 \ \mathrm { K }$ approach, in $\mathrm { m ^ { 2 } }$ .)

| Approach (both ends) | $\varepsilon$ | NTU $= \varepsilon / ( 1 - \varepsilon )$ | Area $= \mathrm { NTU } \, C _ { \min } / U$ |
|:--|--:|--:|--:|
| $1 4 \ \mathrm { K }$ | $0 . 8 0$ | $4 . 0$ | $2 9 . 5 \ \mathrm { m ^ { 2 } }$ |
| $7 \ \mathrm { K }$ | $0 . 9 0$ | $9 . 0$ | $\mathbf { 6 6 . 4 \ m ^ { 2 } }$ |
| $5 \ \mathrm { K }$ | $0 . 9 2 9$ | $1 3 . 0$ | $9 5 . 9 \ \mathrm { m ^ { 2 } }$ |
| $3 . 5 \ \mathrm { K }$ | $0 . 9 5$ | $1 9 . 0$ | $1 4 0 \ \mathrm { m ^ { 2 } }$ |

**Halving the approach from $1 4$ to $7 \ \mathrm { K }$ costs $2 . 2 5$ times the area; halving it again to $3 . 5 \ \mathrm { K }$ costs $4 . 7 5$ times the original.** **The duty in the first row is $0 . 8 0 \times 6 2 7 0 \times 7 0 = 3 5 1 \ \mathrm { k W }$ and in the last $4 1 7 \ \mathrm { k W }$ — a $1 9 \ \ \%$ gain in heat for $4 . 7 5$ times the metal.** **Whether that is worth buying depends on the value of the extra heat against the cost of the surface — which is exactly the trade that sets the approach temperature in every heat-recovery design.**
:::

::: warning Two more, from the second law
**An exchanger generates entropy by transferring heat across a finite temperature difference.** The destroyed work is $T _ { 0 } \dot { S } _ { \text{gen } }$ , and it is smallest when the temperature difference is small and uniform along the exchanger — which needs a counterflow arrangement with nearly equal capacity rates; a stream of $1 0 0 \ \mathrm { k W / K }$ heating one of $1 0 \ \mathrm { k W / K }$ cannot keep the gap small at both ends. **The other half of the trade is pumping power: the duty rises with flow only sublinearly, because NTU falls as $C$ rises, whereas in turbulent flow the pressure drop rises roughly as the square of the flow and the pump or fan power roughly as its cube.** **That is why, for a given duty, a larger exchanger at lower velocity often beats a smaller one driven harder.**
:::

## Exercises

::: exercise A condenser's area {#ex-condenser level=2 check="39"}
Cooling water at $3 0 \ \mathrm { k g / s }$ ($c _ { p } = 4 1 8 0 \ \mathrm { J / k g \, K }$) is heated from $1 5$ to $6 5 \ \ {} ^ { \circ } \mathrm { C }$ by steam condensing at $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ . Take the clean coefficient $U = 4 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ and a total fouling resistance of $0 . 0 0 0 1 \ \mathrm { m ^ { 2 } K / W }$ , and find the required area. (Enter $\mathrm { m ^ { 2 } }$ , to the nearest square metre.)
::: solution
$Q = 3 0 \times 4 1 8 0 \times 5 0 = 6 . 2 7 \ \mathrm { M W }$ . With one side isothermal, $\Delta T _ { 1 } = 8 5 \ \mathrm { K }$ , $\Delta T _ { 2 } = 3 5 \ \mathrm { K }$ , $\Delta T _ { \text{lm } } = ( 8 5 - 3 5 ) / \ln ( 8 5 / 3 5 ) = 5 6 . 5 \ \mathrm { K }$ , and
clean, that is $A = 6 . 2 7 \times 1 0 ^ { 6 } / ( 4 0 0 0 \times 5 6 . 5 ) = 2 8 \ \mathrm { m ^ { 2 } }$ . Referred to the same area, the fouling resistance gives
$$U _ { \text{dirty } } = \left[ 1 / 4 0 0 0 + 0 . 0 0 0 1 \right] ^ { - 1 } = 2 8 6 0 \ \mathrm { W / m ^ { 2 } K } \qquad A = { \frac { 6 . 2 7 \times 1 0 ^ { 6 } } { 2 8 6 0 \times 5 6 . 5 } } = \mathbf { 3 9 \ m ^ { 2 } }$$
**The clean answer is $2 8 \ \mathrm { m ^ { 2 } }$ : a fouling resistance of $0 . 0 0 0 1 \ \mathrm { m ^ { 2 } K / W }$ — a tenth of a thousandth — costs $4 0 \ \%$ of the surface, because the clean resistance is only $0 . 0 0 0 2 5 \ \mathrm { m ^ { 2 } K / W }$ and the deposit more than doubles it.** **Check by $\varepsilon$–NTU: $\mathrm { N T U } = 2 8 6 0 \times 3 9 / 1 2 5 \, 4 0 0 = 0 . 8 9$ and $\varepsilon = 1 - e ^ { - 0 . 8 9 } = 0 . 5 9$ , against the required $\varepsilon = 5 0 / 8 5 = 0 . 5 9$ — the two methods agree, as they must.**
:::
:::

::: exercise The exchanger that cannot be turned round {#ex-parallel level=2 check="23"}
Oil at $3 . 0 \ \mathrm { k g / s }$ ($c _ { p } = 2 1 0 0 \ \mathrm { J / k g \, K }$) is cooled from $1 1 0$ to $6 0 \ \ {} ^ { \circ } \mathrm { C }$ by water at $2 . 0 \ \mathrm { k g / s }$ entering at $3 0 \ \ {} ^ { \circ } \mathrm { C }$ . With $U = 3 8 0 \ \mathrm { W / m ^ { 2 } K }$ , find the counterflow area. (Enter $\mathrm { m ^ { 2 } }$ .)
::: solution
$C _ { h } = 6 3 0 0$ , $C _ { c } = 8 3 6 0 \ \mathrm { W / K }$ , $Q = 6 3 0 0 \times 5 0 = 3 1 5 \ \mathrm { k W }$ , $T _ { c , o } = 3 0 + 3 1 5 \, 0 0 0 / 8 3 6 0 = 6 7 . 7 \ \mathrm { {} ^ { \circ } C }$ . Then $\Delta T _ { 1 } = 1 1 0 - 6 7 . 7 = 4 2 . 3 \ \mathrm { K }$ , $\Delta T _ { 2 } = 6 0 - 3 0 = 3 0 \ \mathrm { K }$ ,
$$\Delta T _ { \text{lm } } = { \frac { 4 2 . 3 - 3 0 } { \ln ( 4 2 . 3 / 3 0 ) } } = 3 5 . 8 \ \mathrm { K } \qquad A = { \frac { 3 1 5 \, 0 0 0 } { 3 8 0 \times 3 5 . 8 } } = \mathbf { 2 3 \ m ^ { 2 } }$$
**Now try the same duty in parallel flow: the cold outlet ($6 7 . 7 \ \ {} ^ { \circ } \mathrm { C }$) would exceed the hot outlet ($6 0 \ \ {} ^ { \circ } \mathrm { C }$), which is a temperature cross and is impossible at any area.** **The limit of a parallel-flow exchanger is the common temperature $T _ { \infty } = ( C _ { h } T _ { h , i } + C _ { c } T _ { c , i } ) / ( C _ { h } + C _ { c } ) = 6 4 . 4 \ \mathrm { {} ^ { \circ } C }$ , approached as $A \rightarrow \infty$ : the hot oil could never be cooled below $6 4 . 4 \ \ {} ^ { \circ } \mathrm { C }$ by this water at this flow, whatever you spent.** **This is the one thing counterflow buys that no amount of area can imitate.**
:::
:::

::: exercise Read the chart before you buy the shell {#ex-ffactor level=3 check="0.53"}
A 1–2 shell-and-tube exchanger cools oil from $1 5 0$ to $6 0 \ \ {} ^ { \circ } \mathrm { C }$ against water heated from $3 0$ to $7 5 \ \ {} ^ { \circ } \mathrm { C }$ . Find $R$ , $P$ and $F$ . (Enter $F$ .)
::: solution
$R = ( 1 5 0 - 6 0 ) / ( 7 5 - 3 0 ) = 2 . 0$ , $P = ( 7 5 - 3 0 ) / ( 1 5 0 - 3 0 ) = 0 . 3 7 5$ , and from the 1–2 expression (or the chart),
$$F = { \frac { \sqrt { 5 } } { 1 } } \, { \frac { \ln ( 0 . 6 2 5 / 0 . 2 5 ) } { \ln \left[ ( 5 . 3 3 - 3 + 2 . 2 4 ) / ( 5 . 3 3 - 3 - 2 . 2 4 ) \right] } } = \mathbf { 0 . 5 3 }$$
**$F = 0 . 5 3$ is not a number to design with: the required area would be $8 8 \ \ \%$ above the counterflow area, and — much worse — it is on the steep part of the curve: a water outlet just $1 \ \mathrm { K }$ lower ($7 4 \ \ {} ^ { \circ } \mathrm { C }$ ) raises $F$ to $0 . 5 7$ and cuts the required area by $7 \ \ \%$ .** **Three correct responses: accept a smaller water temperature rise ($7 5 \rightarrow 6 0 \ \ {} ^ { \circ } \mathrm { C }$ gives $R = 3$ , $P = 0 . 2 5$ , $F = 0 . 8 1$ , at the price of $5 0 \ \ \%$ more water); put two shells in series (the same duty in a 2–4 arrangement has $F = 0 . 9 2$ ); or use a true counterflow arrangement — a double-pipe or a plate exchanger, or a shell with a single tube pass in counterflow.**
:::
:::

::: exercise Buy it dirty {#ex-fouled level=2 check="12.4"}
Two water streams ($c _ { p } = 4 1 8 0 \ \mathrm { J / k g \, K }$), $2 . 0 \ \mathrm { k g / s }$ ($9 0$ to $6 0 \ \ {} ^ { \circ } \mathrm { C }$) against $2 . 5 \ \mathrm { k g / s }$ entering at $2 5 \ \ {} ^ { \circ } \mathrm { C }$ , in a counterflow unit with clean $U = 7 8 0 \ \mathrm { W / m ^ { 2 } K }$ and total fouling resistance $0 . 0 0 0 6 \ \mathrm { m ^ { 2 } K / W }$ . Find the area. (Enter $\mathrm { m ^ { 2 } }$ .)
::: solution
$Q = 2 . 0 \times 4 1 8 0 \times 3 0 = 2 5 0 . 8 \ \mathrm { k W }$ ; $T _ { c , o } = 2 5 + 2 5 0 \, 8 0 0 / 1 0 \, 4 5 0 = 4 9 \ \mathrm { {} ^ { \circ } C }$ ; $\Delta T _ { 1 } = 9 0 - 4 9 = 4 1 \ \mathrm { K }$ , $\Delta T _ { 2 } = 6 0 - 2 5 = 3 5 \ \mathrm { K }$ , $\Delta T _ { \text{lm } } = 3 7 . 9 \ \mathrm { K }$ .
$$U _ { \text{dirty } } = { \left[ 1 / 7 8 0 + 0 . 0 0 0 6 \right] ^ { - 1 } } = 5 3 1 \ \mathrm { W / m ^ { 2 } K } \qquad A = { \frac { 2 5 0 \, 8 0 0 } { 5 3 1 \times 3 7 . 9 } } = \mathbf { 1 2 . 4 \ m ^ { 2 } } \ \text{(clean: } 8 . 5 \ \mathrm { m ^ { 2 } ) }$$
**The fouling allowance is $4 7 \ \ \%$ more metal.** **If the exchanger is sized with the clean coefficient it is $3 2 \ \ \%$ short of surface once fouled, and the shortfall shows up as outlet temperatures the plant never sees: rated by $\varepsilon$–NTU, the fouled $8 . 5 \ \mathrm { m ^ { 2 } }$ unit delivers $1 9 7 \ \mathrm { k W }$ instead of $2 5 1$ , the hot stream leaves at $6 6 \ \ {} ^ { \circ } \mathrm { C }$ instead of $6 0$ and the cold at $4 4 \ \ {} ^ { \circ } \mathrm { C }$ instead of $4 9$ .**
:::
:::

::: exercise Ninety-five per cent {#ex-ntu level=3 check="19"}
How many transfer units does a balanced counterflow exchanger need for $\varepsilon = 0 . 9 5$ , and how does that compare with a condenser ($C _ { r } = 0$) at the same effectiveness? (Enter the balanced-exchanger NTU.)
::: solution
Balanced: $\mathrm { N T U } = \varepsilon / ( 1 - \varepsilon ) = \mathbf { 1 9 }$ . Condenser: $\mathrm { N T U } = - \ln ( 1 - \varepsilon ) = \mathbf { 3 . 0 }$ . **A factor of six in surface for the same effectiveness. In the condenser the driving difference decays exponentially from the full inlet difference at one end to $5 \ \ \%$ of it at the other, so its mean is $0 . 9 5 / \ln 2 0 = 3 2 \ \ \%$ of the inlet difference; in the balanced exchanger the difference is uniform and equal to $5 \ \ \%$ of the inlet difference all the way along, so every square metre works at the smallest gap.** **This single ratio is the reason heat-recovery design concentrates on getting the capacity rates balanced and the approach temperatures reasonable before anyone reaches for more surface.**
:::
:::

::: exercise A recuperator for a micro-turbine {#ex-recuperator level=3 check="350"}
Turbine exhaust at $6 5 0 \ \ {} ^ { \circ } \mathrm { C }$ and $1 . 0 \ \mathrm { k g / s }$ preheats the compressor delivery ($3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ , $1 . 0 \ \mathrm { k g / s }$ ) in a balanced counterflow recuperator with $\mathrm { N T U } = 6$ ; take $c _ { p } = 1 0 5 0 \ \mathrm { J / k g \, K }$ for both streams. Find the exhaust temperature leaving the recuperator. (Enter $^ { \circ } \mathrm { C }$ , nearest ten.)
::: solution
$C _ { r } = 1$ , $\Delta T _ { i } = 6 5 0 - 3 0 0 = 3 5 0 \ \mathrm { K }$ , $\varepsilon = \mathrm { N T U } / ( 1 + \mathrm { N T U } ) = 0 . 8 5 7$ , so
$$Q = 0 . 8 5 7 \times 1 0 5 0 \times 3 5 0 = 3 1 5 \ \mathrm { k W } \qquad T _ { \text{exh,out } } = 6 5 0 - { \frac { 3 1 5 \, 0 0 0 } { 1 . 0 \times 1 0 5 0 } } = \mathbf { 3 5 0 \ {} ^ { \circ } C }$$
**The exhaust leaves at $3 5 0 \ \ {} ^ { \circ } \mathrm { C }$ and the compressed air enters the combustor at $6 0 0 \ \ {} ^ { \circ } \mathrm { C }$ instead of $3 0 0$ : $3 1 5 \ \mathrm { k W }$ that the fuel no longer has to supply, which is why recuperated micro-turbines reach electrical efficiencies of roughly $2 5$–$3 0 \ \ \%$ while unrecuperated ones manage well under $2 0 \ \ \%$ .** **What it costs: at $U \approx 6 0 \ \mathrm { W / m ^ { 2 } K }$ (gas–gas, both sides finned) the area is $A = \mathrm { N T U } \, C _ { \min } / U = 6 \times 1 0 5 0 / 6 0 = 1 0 5 \ \mathrm { m ^ { 2 } }$ of plate-fin surface in a machine the size of a fridge, plus a few per cent of the pressure lost on each side — which is why the recuperator is one of the largest and most expensive parts of a micro-turbine.**
:::
:::

::: exercise Stage the cooling water {#ex-staged level=4 check="44.4"}
A process stream with $C = 1 0 0 0 \ \mathrm { W / K }$ is cooled from $9 0 \ \ {} ^ { \circ } \mathrm { C }$ by cooling water at $1 0 \ \ {} ^ { \circ } \mathrm { C }$ , also $C = 1 0 0 0 \ \mathrm { W / K }$ per supply. Compare (a) one counterflow exchanger of $2 . 0 \ \mathrm { m ^ { 2 } }$ , $U = 5 0 0 \ \mathrm { W / m ^ { 2 } K }$ , fed by the whole water supply, with (b) two $1 . 0 \ \mathrm { m ^ { 2 } }$ exchangers in series, each with its own fresh supply at $1 0 \ \ {} ^ { \circ } \mathrm { C }$ and $C = 1 0 0 0 \ \mathrm { W / K }$ . (Enter the duty of arrangement (b) in kW.)
::: solution
**(a)** $\mathrm { N T U } = 5 0 0 \times 2 / 1 0 0 0 = 1 . 0$ with $C _ { r } = 1$ , so $\varepsilon = \mathrm { N T U } / ( 1 + \mathrm { N T U } ) = 0 . 5 0 0$ , $q _ { a } = 0 . 5 0 0 \times 1 0 0 0 \times 8 0 = 4 0 . 0 \ \mathrm { k W }$ ; the process stream leaves at $5 0\ \ {} ^ { \circ } \mathrm { C }$ and so does the water, with a uniform $4 0 \ \mathrm { K }$ gap along the exchanger.

**(b)** Each stage has $\mathrm { N T U } = 0 . 5$ , $C _ { r } = 1$ and $\varepsilon = 0 . 5 / 1 . 5 = 0 . 3 3 3$ , and each is met with *fresh* water at $1 0\ \ {} ^ { \circ } \mathrm { C }$ :

$$q _ { 1 } = 0 . 3 3 3 \times 1 0 0 0 \times ( 9 0 - 1 0 ) = 2 6 . 7 \ \mathrm { k W } \ \Rightarrow\ T _ { \text{hot} } = 6 3 . 3\ \mathrm { {} ^ { \circ } C } \qquad q _ { 2 } = 0 . 3 3 3 \times 1 0 0 0 \times ( 6 3 . 3 - 1 0 ) = 1 7 . 8\ \mathrm { k W }$$

$$q _ { b } = 2 6 . 7 + 1 7 . 8 = \mathbf { 4 4 . 4 \ k W } \qquad T _ { \text{hot,out } } = 4 5 . 6\ \mathrm { {} ^ { \circ } C } \qquad \text{eleven per cent more duty for the same metal}$$

**Be clear about where the gain comes from: arrangement (b) uses twice as much cooling water, and each stage meets water at $1 0 \ \ {} ^ { \circ } \mathrm { C }$ .** **The fair comparison is the single $2 \ \mathrm { m ^ { 2 } }$ counterflow unit fed with the same $2 0 0 0 \ \mathrm { W / K }$ of water: $\mathrm { N T U } = 1$ , $C _ { r } = 0 . 5$ , $\varepsilon = 0 . 5 6 5$ and $4 5 . 2 \ \mathrm { k W }$ — slightly better than the staged pair.** **Staging with fresh coolant does not beat counterflow; it only looks good when compared with a counterflow unit that is starved of coolant.**
:::
:::

::: exercise The arithmetic mean, honestly priced {#ex-arith level=1 check="6"}
A lubricating-oil cooler has end temperature differences of $3 5$ and $1 5 \ \mathrm { K }$ . What error does the arithmetic mean temperature difference introduce into the area? (Enter the percentage, to the nearest per cent.)
::: solution
$\Delta T _ { \text{lm } } = ( 3 5 - 1 5 ) / \ln ( 3 5 / 1 5 ) = 2 3 . 6 \ \mathrm { K }$ against an arithmetic mean of $2 5 \ \mathrm { K }$ : the area comes out $2 3 . 6 / 2 5 = 0 . 9 4$ of what it should be, an error of $\mathbf { 6 \ \% }$ in the wrong direction. **At an end-difference ratio of $2 . 3 3$ the error is $6 \ \ \%$ ; at a ratio of $1 . 2$ it is $0 . 3 \ \ \%$ , which is where the "within $2 0 \ \ \%$ " rule comes from; at a ratio of $1 0$ the area comes out $2 9 \ \ \%$ low, and at $1 0 0$ , $5 7 \ \ \%$ low.** **Note the direction: the arithmetic mean is always larger, so the arithmetic mean always makes the exchanger look smaller than it is. The error is never in your favour.**
:::
:::

::: proof The parallel-flow effectiveness, and its ceiling {#proof-parallel}
Derive $\varepsilon = \left\{ 1 - \exp [ - \mathrm { N T U } ( 1 + C _ { r } ) ] \right\} / ( 1 + C _ { r } )$ for a parallel-flow exchanger directly from the element balance, and from it find the outlet temperatures as $A \rightarrow \infty$ . Explain why the balanced parallel-flow exchanger can never exceed $\varepsilon = 0 . 5$ whatever its size, and why the counterflow exchanger has no such ceiling.
::: solution
**In parallel flow both fluids move in the same direction, so $d q = - C _ { h } d T _ { h } = C _ { c } d T _ { c }$ and**
$$d ( \Delta T ) = d T _ { h } - d T _ { c } = - \left( { \frac { 1 } { C _ { h } } } + { \frac { 1 } { C _ { c } } } \right) d q = - U \Delta T \left( { \frac { 1 } { C _ { h } } } + { \frac { 1 } { C _ { c } } } \right) d A$$
**which integrates to $\Delta T _ { o } / \Delta T _ { i } = \exp [ - U A ( 1 / C _ { h } + 1 / C _ { c } ) ]$ . Writing $Q = C _ { h } ( T _ { h , i } - T _ { h , o } ) = C _ { c } ( T _ { c , o } - T _ { c , i } )$ and $\Delta T _ { i } - \Delta T _ { o } = Q ( 1 / C _ { h } + 1 / C _ { c } )$ , then dividing by $C _ { \min } \Delta T _ { i }$ ,**
$$\varepsilon = { \frac { 1 - \Delta T _ { o } / \Delta T _ { i } } { C _ { \min } ( 1 / C _ { h } + 1 / C _ { c } ) } } = { \frac { 1 - \exp [ - \mathrm { N T U } ( 1 + C _ { r } ) ] } { 1 + C _ { r } } }$$
**because $C _ { \min } ( 1 / C _ { h } + 1 / C _ { c } ) = C _ { \min } / C _ { \min } + C _ { \min } / C _ { \max } = 1 + C _ { r }$ . As $A \rightarrow \infty$ the exponential vanishes and $\varepsilon _ { \max } = 1 / ( 1 + C _ { r } )$ , which is $0 . 5$ when $C _ { r } = 1$ : the two streams meet at the common temperature $T _ { \infty }$ and the exchanger runs out of driving force at its exit, no matter how much surface is added.** **Counterflow has no ceiling because the two ends are decoupled — the hot outlet faces the cold inlet — so $\Delta T$ can be made uniform and positive everywhere, and $\varepsilon \rightarrow 1$ as $\mathrm { N T U } \rightarrow \infty$ for every $C _ { r }$.** 
:::
:::

::: proof The optimum cleaning interval {#proof-fouling-optimum}
A heat-recovery exchanger recovers $Q _ { 0 }$ when clean, with clean coefficient $U _ { c }$ . Its fouling resistance grows linearly with time, $R _ { f } = a t$ , and while $U _ { c } R _ { f } \ll 1$ take the recovered heat to fall in proportion to $U$ (the low-NTU, conservative case), so the lost heat rate is $Q _ { 0 } U _ { c } a t$ . Each cleaning costs a fixed amount $K _ { c }$ , and lost heat is worth $p$ per joule. Show that the cleaning interval minimising the average cost is $t _ { c } ^ { * } = \sqrt { 2 K _ { c } / ( p Q _ { 0 } U _ { c } a ) }$ , and evaluate it for $Q _ { 0 } = 5 \ \mathrm { M W }$ , $U _ { c } = 6 0 0 \ \mathrm { W / m ^ { 2 } K }$ , a fouling resistance that grows by $0 . 0 0 0 4 \ \mathrm { m ^ { 2 } K / W }$ in $1 0 0$ days, and a cleaning that costs as much as one full day of recovered heat.
::: solution
**Over one cycle of length $t _ { c }$ the lost heat is $\int _ { 0 } ^ { t _ { c } } Q _ { 0 } U _ { c } a t \, \mathrm { d } t = \tfrac { 1 } { 2 } Q _ { 0 } U _ { c } a t _ { c } ^ { 2 }$ , so the average cost per unit time is**
$$\bar { K } ( t _ { c } ) = { \frac { K _ { c } } { t _ { c } } } + \tfrac { 1 } { 2 } p Q _ { 0 } U _ { c } a \, t _ { c } \qquad { \frac { \mathrm { d } \bar { K } } { \mathrm { d } t _ { c } } } = - { \frac { K _ { c } } { t _ { c } ^ { 2 } } } + \tfrac { 1 } { 2 } p Q _ { 0 } U _ { c } a = 0 \ \Longrightarrow \ t _ { c } ^ { * } = \sqrt { \frac { 2 K _ { c } } { p Q _ { 0 } U _ { c } a } }$$
**At the optimum the two terms are equal: the cleaning cost per day equals the average value of the heat being lost per day.** **With $K _ { c } = p Q _ { 0 } \times ( 1 \ \text{day} )$ the prices cancel, and with $a = 4 \times 1 0 ^ { - 6 } \ \mathrm { m ^ { 2 } K / W }$ per day,**
$$t _ { c } ^ { * } = \sqrt { \frac { 2 \times 1 \ \text{day} } { 6 0 0 \times 4 \times 1 0 ^ { - 6 } \ \text{day} ^ { - 1 } } } = \sqrt { 8 3 3 } \ \text{days} \approx 2 9 \ \text{days}$$
**By then $U _ { c } R _ { f } = 0 . 0 7$ , so the small-fouling assumption holds and the exchanger has lost about $7 \ \ \%$ of its duty, $0 . 3 5 \ \mathrm { M W }$ .** **The interval scales as the square root of the cleaning cost over the fouling rate: four times dearer cleaning only doubles the interval. In practice the fouling rate is measured, not assumed — from a trend of $U$ computed from the plant's own temperatures and flows.**
:::
:::

::: quiz Which question, which method {#quiz-method}
A heat exchanger you already own must be re-rated at half its design flow, with unknown outlet temperatures. The right method is
- [ ] LMTD with the design temperature differences, since $U$ is unchanged
- [x] $\varepsilon$–NTU, recomputing $U$ for the new flows
- [ ] Either, they are identical
- [ ] The arithmetic mean temperature difference, since the exchanger is balanced

::: solution
**$\varepsilon$–NTU is the rating method: the area is known, the flows are known, the outlet temperatures are unknown, and the log mean of unknown temperatures is circular.** **The trap in the answer is the second half: $U$ is *not* unchanged, because both coefficients vary with flow (roughly $G ^ { 0 . 8 }$ on a turbulent single-phase side, $G ^ { 0 . 5 }$ or worse on a gas side), so halving the flow on both sides can cut $U$ by a third or more, and the naive "same $U$ , double NTU" answer over-predicts the duty.**
:::
:::

::: quiz Where the fins go {#quiz-fins}
A gas–water exchanger has $h _ { \text{gas } } = 6 0$ and $h _ { \text{water } } = 4 0 0 0 \ \mathrm { W / m ^ { 2 } K }$. Which change gains most heat for a fixed bare-tube area?
- [ ] Doubling the water velocity, doubling $h _ { \text{water } }$
- [x] Adding fins on the gas side with an overall surface efficiency of $0 . 8 5$ and an area ratio of $1 5$
- [ ] Using tubes of higher conductivity
- [ ] Reversing the flow to pure counterflow

::: solution
**The gas side is $9 8 . 5 \ \ \%$ of the resistance, so only the gas side matters: fins with $\eta _ { o } A _ { r } = 1 2 . 7 5$ cut the gas-side resistance by that factor and raise $U$ from $5 9$ to about $6 4 0 \ \mathrm { W / m ^ { 2 } K }$ .** **Doubling the water coefficient changes $U$ by under $1 \ \ \%$ ; better tube metal changes it by a fraction of a per cent; and counterflow versus a well-designed multi-pass shell is worth $5$ to $1 5 \ \ \%$ — real, but an order of magnitude less than fixing the dominant resistance.** **The general rule of this lesson: compute the resistance breakdown first, and only then have the conversation about improvements.**
:::
:::

## Where this lesson leads

- **[[heat-transfer/boiling-condensation|Boiling and condensation]]** supplies the two coefficients that dominate evaporator and condenser design, and the warning that $U$ is not constant along a condenser with superheated inlet — such exchangers are calculated zone by zone.
- **[[heat-transfer/internal-convection|Forced convection in internal flow]]** gives the tube-side coefficient and, through $h \propto G ^ { 0 . 8 }$ , the whole off-design behaviour of an exchanger at part flow.
- **[[heat-transfer/external-convection|Forced convection in external flow]]** is the finned-tube, tube-bank and cross-flow side: the gas coefficient, the row correction and the pressure drop of a compact surface.
- **[[heat-transfer/fins|Extended surfaces]]** is the arithmetic of the fin efficiency that decides whether the fins you added are worth the metal.
- **[[thermodynamics/second-law|The second law]]** and **[[thermodynamics/exergy|exergy]]** are where the entropy-generation view of this lesson becomes a plant-wide method: pinch analysis, heat integration, and the fact that a temperature difference is a spent opportunity.
- **[[energy-systems/gas-turbines-combined-cycles|Gas turbines and combined cycles]]**, **[[energy-systems/refrigeration-hvac|Refrigeration and HVAC]]** and **[[propulsion/gas-turbine-cycles|Gas-turbine cycles]]** are where recuperators, regenerators, intercoolers and condensers stop being exercises and start setting the cycle's efficiency.
- **[[fluid-mechanics/pipe-flow|Pipe flow]]** prices the other half of every exchanger decision: the gas- and water-side pressure drops that become fan and pump power for the life of the plant.

::: history How the heat exchanger was designed
| Year | Event |
|:--|:--|
| 1923 | **Richard Seligman** of the Aluminium Plant & Vessel Company (APV), London, introduces the first commercially successful gasketed plate heat exchanger, for the high-temperature short-time pasteurisation of milk. |
| 1920s | **Fredrik Ljungström**'s rotary regenerative air preheater, built by the Ljungström company in Sweden, brings the rotating-matrix regenerator into power-station boilers. |
| 1933 | **A. P. Colburn**, "A method of correlating forced convection heat transfer data and a comparison with fluid friction", *Trans. AIChE* **29**, 174–210 — the $j$-factor, which later became the standard way of presenting compact-surface data. |
| 1933–1940 | **W. M. Nagle**, **R. A. Bowman** and **A. C. Mueller** publish the mean-temperature-difference correction factors for multipass and cross-flow exchangers, culminating in Bowman, Mueller & Nagle, "Mean temperature difference in design", *Trans. ASME* **62** (1940), 283–294 — the $F$ charts still reproduced in textbooks. |
| 1942 | **A. L. London and R. A. Seban** formulate the effectiveness–NTU approach to exchanger rating, later made standard by Kays and London. |
| 1955 | **W. M. Kays and A. L. London**, *Compact Heat Exchangers* (3rd ed. 1984) — the $j$ and $f$ data for plate-fin and tube-fin surfaces, and the $\varepsilon$–NTU relations, in the form designers still use. |
| 1978 | **B. Linnhoff and J. R. Flower**, "Synthesis of heat exchanger networks", *AIChE Journal* **24**, 633–642 — the start of pinch analysis, which turns the $T$–$Q$ diagram of this lesson into a method for designing whole exchanger networks. |
:::

::: summary
- **$1 / U A$ is a series circuit of resistances, referred to one chosen area.** The gas side of a bare-tube gas–liquid exchanger is typically $9 5 \ \ \%$ or more of it, which is why fins go on the gas side — after which the liquid side matters again. Fouling resistances are added as resistances, and $0 . 0 0 0 6 \ \mathrm { m ^ { 2 } K / W }$ on a $U = 8 5 0$ exchanger is a $3 4 \ \ \%$ loss of coefficient.
- **$Q = U A F \Delta T _ { \text{lm } }$ with $\Delta T _ { \text{lm } } = ( \Delta T _ { 1 } - \Delta T _ { 2 } ) / \ln ( \Delta T _ { 1 } / \Delta T _ { 2 } )$** — always below the arithmetic mean, by $6 \ \ \%$ at an end-difference ratio of $2 . 3$ and by $5 7 \ \ \%$ at $1 0 0$ . Use it when the four temperatures are known.
- **$F$ is the price of not being counterflow.** Keep $F \geq 0 . 8 5$ ; below $0 . 8$ change the configuration (more shell passes, plate, double pipe), never the area. $F$ collapses as $P R \rightarrow 1$ because the arrangement is running out of temperature difference, not surface.
- **$\varepsilon = Q / ( C _ { \min } \Delta T _ { i } )$ , $\mathrm { N T U } = U A / C _ { \min }$ , $C _ { r } = C _ { \min } / C _ { \max }$** — the rating method, and the only sane way to answer part-load questions. The stream with $C _ { \min }$ swings the most and sets the ceiling.
- **The formulas to have in your head:** condenser $\varepsilon = 1 - e ^ { - \mathrm { N T U } }$ ; balanced counterflow $\varepsilon = \mathrm { N T U } / ( 1 + \mathrm { N T U } )$ ; parallel flow $\varepsilon = \{ 1 - \exp [ - \mathrm { N T U } ( 1 + C _ { r } ) ] \} / ( 1 + C _ { r } )$ , capped at $1 / ( 1 + C _ { r } )$ . Counterflow has no ceiling; parallel flow always does.
- **NTU has diminishing returns and the pinch has a price.** A balanced exchanger needs 4 transfer units for $8 0 \ \ \%$ and 19 for $9 5 \ \ \%$ ; once the approach is small, halving it roughly doubles the area. Choose the approach from the price of heat against the price of metal, not from optimism.
- **Mixing costs effectiveness at high NTU (about $1 5 \ \ \%$ for a balanced unit at $\mathrm { N T U } = 5$ ), and staging with fresh coolant is no substitute for counterflow with the same coolant.** Regenerators buy effectiveness per volume at the price of carry-over and a drive motor.
- **The exchanger is a second-law device:** heat transferred across a finite temperature difference destroys work $T _ { 0 } \dot { S } _ { \text{gen } }$ , and the design trade is the cost of area and pumping power against the value of what a larger temperature difference wastes.
:::

## Further reading

- **W. M. Kays & A. L. London**, *Compact Heat Exchangers*, 3rd ed. (McGraw-Hill, 1984) — the $j$- and $f$-factor data for plate-fin and tube-fin surfaces, and the classic presentation of $\varepsilon$–NTU.
- **R. K. Shah & D. P. Sekulić**, *Fundamentals of Heat Exchanger Design* (Wiley, 2003) — an extensive catalogue of $\varepsilon$–NTU and $F$ relations for many flow arrangements, with their derivations.
- **G. F. Hewitt, G. L. Shires & T. R. Bott**, *Process Heat Transfer* (CRC Press, 1994) — the design-side view: fouling, vibration, tube-bundle layout, and the reasons a calculated exchanger and a built exchanger differ.
- **Tubular Exchanger Manufacturers Association**, *Standards of the Tubular Exchanger Manufacturers Association* (TEMA Standards), current ed. — the mechanical rules and nomenclature for shell-and-tube exchangers, and the source of the familiar fouling tables.
- **B. Linnhoff, D. W. Townsend, D. Boland et al.**, *A User Guide on Process Integration for the Efficient Use of Energy* (IChemE, 1982) — the pinch method in the words and worksheets of the people who built it.
- **VDI e. V. (ed.)**, *VDI Heat Atlas*, 2nd English ed. (Springer, 2010) — the German reference handbook of correlations and exchanger-design methods.
