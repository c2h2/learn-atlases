A $2 \ \mathrm{kW}$ immersion element the size of a finger boils a litre of water in four minutes. Push the same element into air and its sheath glows red within seconds; push five or six times its heat flux through the same surface in boiling water and it is blanketed by a film of vapor that insulates it from the liquid it is standing in. The difference between those three outcomes is not a difference in "the heat-transfer coefficient" — it is a difference in mechanism, and each mechanism has its own law, its own scaling and its own hard limit.

Phase-change heat transfer is the strongest thermal mechanism available to a designer, and the only one with a cliff in it. Nucleate boiling gives coefficients of $1 0 ^ { 4 }$ to $1 0 ^ { 5 } \ \mathrm { W / m ^ { 2 } K }$ , one to two orders above the best single-phase water cooling, at temperature differences of five to twenty kelvin. Condensation is nearly as good, $5 0 0 0$ to $1 5 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ , which is why a steam condensate system can move megawatts in a hand-sized heat exchanger. But boiling has a maximum: the **critical heat flux**, about $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ for water at one atmosphere, past which the surface passes into film boiling, loses one to two orders of magnitude in coefficient in a fraction of a second, and — if the heat flux is imposed rather than the temperature — runs away to meltdown. Every nuclear reactor core, every steam generator, every cryogenic tank, every boiling microchip cooler and every kettle element is designed against that one number.

This lesson is about three things: why bubbles and drops move heat so well, what sets the coefficient on either side of the cliff, and what sets the cliff itself.

::: warning The five mistakes this lesson exists to prevent
1. **Treating the boiling coefficient as a constant.** In nucleate boiling $q \propto \Delta T _ { e } ^ { 3 }$ , so $h \propto \Delta T _ { e } ^ { 2 }$ : the "coefficient" at $5 \ \mathrm { K }$ of superheat is a factor of sixteen smaller than at $2 0 \ \mathrm { K }$ . A single $h$ quoted for a boiler surface is a data point at one operating condition, not a property.
2. **Designing on the coefficient instead of on the critical heat flux.** The coefficient tells you the wall temperature you will get; the CHF tells you whether you will have a wall temperature at all. The design margin is $q ^ { \prime \prime } / q ^ { \prime \prime } _ { \max } \lesssim 0 . 7$ , and it is checked first.
3. **Forgetting that the condensing coefficient falls as you drive it harder.** For film condensation $h \propto \Delta T ^ { - 1 / 4 }$ : doubling your temperature difference buys less than double the heat flux, because the extra vapor you must push through makes the liquid film thicker. Sub-cooling the wall is not free.
4. **Using $h _ { f g }$ where $h _ { f g } ^ { \prime }$ belongs.** Vapor leaving a film-boiling layer is superheated; the correct latent heat is $h _ { f g } ^ { \prime } = h _ { f g } + 0 . 8 c _ { p , v } \Delta T _ { e }$ , which at $7 0 0 \ \mathrm { K }$ of film superheat is about $5 0 \ \%$ larger than $h _ { f g }$ . (In film condensation the corresponding correction for subcooling of the liquid film is small, $h _ { f g } ^ { \prime } = h _ { f g } ( 1 + 0 . 6 8 \, c _ { p , l } \Delta T / h _ { f g } )$ .)
5. **Assuming a liquid wets, or a surface is clean.** Boiling and condensation are the two heat-transfer problems governed by surface condition and chemistry. A hydrophobic coating can turn filmwise condensation into dropwise and multiply the coefficient by five or more, and a roughened or porous-coated surface boils at a fraction of the superheat of a polished one.
:::

## 1. Why a change of phase moves heat that convection cannot touch

::: definition Why phase change is strong: three effects, one of them dominant {#def-why-strong}
Three things happen when a liquid boils on a hot surface, and they add. **(i) Latent transport.** A bubble that nucleates, grows and departs carries vapor — that is, enthalpy $h _ { f g }$ — directly from the wall into the bulk liquid, where it condenses. Each cubic metre of steam at $1 \ \mathrm { a t m }$ carries $\rho _ { v } h _ { f g } = 0 . 5 9 8 \times 2 . 2 5 7 \times 1 0 ^ { 6 } = 1 . 3 5 \ \mathrm { M J }$ of latent heat, so a surface passing $1 \ \mathrm { M W / m ^ { 2 } }$ is generating $0 . 7 4 \ \mathrm { m ^ { 3 } }$ of vapor per second from every square metre. **(ii) Microlayer evaporation.** Under a nucleate bubble the liquid film between bubble and wall is only $1$ to $1 0 \ \mu \mathrm { m }$ thick, and it is across this film — not across a thermal boundary layer — that the whole temperature drop sits. A $1 0 \ \mu \mathrm { m }$ film conducting $1 0 \ \mathrm { k W / m ^ { 2 } }$ needs $q \delta / k = 1 0 ^ { 4 } \times 1 0 ^ { - 5 } / 0 . 6 8 = 0 . 1 5 \ \mathrm { K }$ ; the enormous coefficient is simply an enormous $k / \delta$ . **(iii) Microconvection.** Bubble growth, departure and the resulting fluid motion sweep the wall clean of superheated liquid at a few hundred hertz per site.

**How the heat divides between the three mechanisms is still argued over and depends on fluid, pressure and surface — but all three are why boiling is a surface phenomenon rather than a bulk fluid-dynamic one: the controlling resistances are a few microns thick, and the bubbles themselves keep them thin.**
:::

::: definition The vocabulary: saturation, superheat, quality {#def-vocab}
**Saturation temperature $T _ { \mathrm { s a t } } ( p )$** — the temperature at which a given pressure boils. Everything in this lesson is measured against it, because a boiling liquid sits at $T _ { \mathrm { s a t } }$ and only the wall is hotter. **Excess (wall) superheat $\Delta T _ { e } = T _ { s } - T _ { \mathrm { s a t } }$** — the actual driving potential; note that it is *not* the difference between the wall and the bulk liquid, which is nearly zero in a boiling pot. **Quality $x$** — the mass fraction of vapor in a two-phase stream, $x = \dot { m } _ { v } / \dot { m }$ , with the **mass flux** $G = \dot { m } / A$ in $\mathrm { k g / m ^ { 2 } s }$ . **Void fraction $\alpha$** — the *volume* fraction, which is much larger than $x$ because $\rho _ { v } \ll \rho _ { l }$ : at $x = 0 . 1$ and a density ratio of $1 6 0 0$ (water at 1 atm), $\alpha = 1 / ( 1 + ( ( 1 - x ) / x ) ( \rho _ { g } / \rho _ { f } ) ) = 0 . 9 9 4$ . **Equilibrium quality $x _ { e q } = ( h - h _ { f } ) / h _ { f g }$** — the quality a stream would have if it were flashed to saturation at the same pressure; it is negative in subcooled liquid and is the quantity correlations use.
:::

For orientation, the coefficients:

| Mechanism | Typical $h$ ($\mathrm { W / m ^ { 2 } K }$) | Driving $\Delta T$ for $1 0 0 \ \mathrm { k W / m ^ { 2 } }$ |
|:--|--:|--:|
| Natural convection in air | $2 - 1 0$ | $1 0 \, 0 0 0 \ \mathrm { K }$ (impossible) |
| Forced convection, water in a tube | $3 0 0 0 - 1 0 \, 0 0 0$ | $1 0 - 3 0 \ \mathrm { K }$ |
| Forced convection, oil | $1 0 0 - 5 0 0$ | $2 0 0 - 1 0 0 0 \ \mathrm { K }$ |
| **Nucleate boiling, water at 1 atm** | $5 0 0 0 - 6 0 \, 0 0 0$ | $1 . 7 - 2 0 \ \mathrm { K }$ |
| **Nucleate boiling, cryogens / refrigerants** | $2 0 0 0 - 3 0 \, 0 0 0$ | $3 - 5 0 \ \mathrm { K }$ |
| **Film condensation, steam at 1 atm** | $5 0 0 0 - 1 5 \, 0 0 0$ | $7 - 2 0 \ \mathrm { K }$ |
| **Dropwise condensation, promoted** | $2 0 \, 0 0 0 - 1 0 0 \, 0 0 0$ | $1 - 5 \ \mathrm { K }$ |
| Film boiling (the cliff) | $1 0 0 - 5 0 0$ | $2 0 0 - 1 0 0 0 \ \mathrm { K }$ |

**Read the third column, not the second: the point of phase change is not a big number for $h$ , it is that a usable heat flux is reachable at a temperature difference of ten kelvin rather than a thousand.**

## 2. Nucleation: why boiling needs a scratch

Pure, dust-free, degassed liquid in a perfectly smooth tube can be heated tens of degrees above its saturation temperature without boiling. That is not a curiosity; it is the reason boiling happens at all, and it sets where it happens.

::: proof The critical bubble radius, and why homogeneous nucleation needs some 200 K of superheat {#proof-critical-radius}
A vapor bubble of radius $r$ in a liquid at pressure $P _ { l }$ must hold off not only the liquid but the surface tension, so its internal pressure is $P _ { v } = P _ { l } + 2 \sigma / r$ (the Laplace term; see [[fluid-mechanics/fluid-properties]]). A curved interface in thermodynamic equilibrium has a higher saturation pressure than a flat one, and combining the Clausius–Clapeyron relation with the Laplace pressure gives the condition for a bubble to exist in stable equilibrium. Writing $\Delta T _ { e } = T _ { s } - T _ { \mathrm { s a t } } ( P _ { l } )$ for the superheat of the liquid, the **critical radius** is

$$r ^ { * } = { \frac { 2 \sigma T _ { \mathrm { s a t } } v _ { l } } { h _ { f g } \Delta T _ { e } } } \qquad \text{(with } v _ { l } = 1 / \rho _ { l } \text{)}$$

For water at $1 0 0 \ \mathrm { k P a }$ with $\Delta T _ { e } = 1 0 \ \mathrm { K }$ : $r ^ { * } = 2 \times 0 . 0 5 8 9 \times 3 7 3 \times ( 1 / 9 5 8 ) / ( 2 . 2 5 7 \times 1 0 ^ { 6 } \times 1 0 ) = 2 . 0 \times 1 0 ^ { - 9 } \ \mathrm { m }$ , **two nanometres**. A bubble smaller than $r ^ { * }$ collapses, because the Laplace pressure squeezes it and the higher saturation pressure inside it condenses it; a bubble larger than $r ^ { * }$ grows explosively. The energy barrier to nucleation scales as $\sigma ^ { 3 } / ( \Delta T _ { e } / T _ { \mathrm { s a t } } ) ^ { 2 }$ , so it is enormous at small superheat and vanishes as $\Delta T _ { e }$ grows. Setting the barrier against the thermal energy available in a homogeneous liquid gives a **limit of superheat of roughly $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ for water at $1 \ \mathrm { a t m }$ — about $2 0 0 \ \mathrm { K }$ above saturation** — measured, for example, with rapidly pulse-heated wires and with droplets heated in an immiscible host liquid.

**Real surfaces boil at $5$ to $2 0 \ \mathrm { K }$ because they are not smooth: a cavity of mouth radius $r _ { c }$ traps vapor or gas once $r _ { c }$ exceeds $r ^ { * }$ , and the bubble then grows from a pre-existing interface with no barrier at all.** **At $\Delta T _ { e } = 1 0 \ \mathrm { K }$ , $r ^ { * } = 2 \ \mathrm { n m }$ , so any pit deeper than a few nanometres is a site — and because $r ^ { * } \propto 1 / \Delta T _ { e }$ , lowering the superheat from $1 0$ to $1 \ \mathrm { K }$ raises the required cavity to $2 0 \ \mathrm { n m }$ and switches off all but the deepest, narrowest-mouthed defects.** **This is why a given surface "remembers" its boiling: the same scratches activate at the same superheats, and why the standard test is to polish, boil, and re-polish and get a different curve.**
:::

::: definition Nucleation sites, site density, and why q ∝ ΔT³ {#def-sites}
A **nucleation site** is a cavity — usually a **re-entrant cavity**, a pore with a neck, which traps gas during bubble departure and so survives the collapse that would flood a simple pit. The **site density** $n ^ { \prime \prime }$ (sites per $\mathrm { m } ^ { 2 }$ ) is not measured but inferred, and it grows extremely steeply with superheat: from about $1 0 ^ { 4 } \ \mathrm { m ^ { - 2 } }$ at $\Delta T _ { e } = 5 \ \mathrm { K }$ to $1 0 ^ { 8 } \ \mathrm { m ^ { - 2 } }$ at $2 0 \ \mathrm { K }$ for water. The heat flux is roughly $q ^ { \prime \prime } \sim n ^ { \prime \prime } A _ { b } N f \times ( \text{energy per cycle} )$ , where $N f$ is the nucleation frequency (tens to hundreds of $\mathrm { H z }$ per site) — the steep rise of $n ^ { \prime \prime }$ with $\Delta T _ { e }$ is the origin of the empirical $q \propto \Delta T _ { e } ^ { 3 }$ . **Boiling is a percolation problem on a rough surface, and that is why it is so sensitive to surface treatment and so hard to predict from first principles.**
:::

## 3. The boiling curve: one experiment, six regimes

::: definition The boiling curve (Nukiyama curve) and its landmarks {#def-boiling-curve}
Heat a horizontal wire or plate in a quiescent saturated liquid (**pool boiling** — no imposed flow) and impose the heat flux, measuring the wall superheat. The log-log plot of $q ^ { \prime \prime }$ against $\Delta T _ { e }$ has six regions:

| Region | Range (water, 1 atm) | Law | What is happening |
|:--|:--|:--|:--|
| I. Natural convection | $\Delta T _ { e } \lesssim 5 \ \mathrm { K }$ | $q \propto \Delta T ^ { 1 . 2 5 }$ to $\Delta T ^ { 4 / 3 }$ | No bubbles; ordinary buoyant convection in water, $h$ of several hundred to about $1 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ |
| II. Nucleate boiling, ONB | $5 \lesssim \Delta T _ { e } \lesssim 3 0 \ \mathrm { K }$ | $q \propto \Delta T ^ { 3 }$ | **Onset of nucleate boiling**: sites activate, $h$ climbs by more than an order of magnitude |
| — Critical heat flux (CHF) | $\Delta T _ { e } \approx 2 5$–$3 0 \ \mathrm { K }$ | $q ^ { \prime \prime } _ { \max } = 1 . 1 \ \mathrm { M W / m ^ { 2 } }$ | Vapor leaves faster than liquid can rewet the surface |
| III. Transition (partial film) | $3 0 \lesssim \Delta T _ { e } \lesssim 1 2 0 \ \mathrm { K }$ | unstable | Vapor blanketing spreads; $q$ *falls* as $\Delta T$ rises |
| IV. Film boiling | $\Delta T _ { e } \gtrsim 1 2 0 \ \mathrm { K }$ | $q \propto \Delta T ^ { 3 / 4 }$ (plus radiation) | A stable vapor film; conduction + radiation through vapor |
| — Leidenfrost point | $\Delta T _ { e } \approx 1 2 0 \ \mathrm { K }$ (clean surfaces; higher on rough ones) | minimum $q \approx 2 0 \ \mathrm { k W / m ^ { 2 } }$ | The drop-skating point |

**Two landmarks matter to a designer. The CHF is a maximum: past it, increasing $\Delta T$ *reduces* the heat flux, which makes region III statically unstable — under imposed heat flux the surface jumps from region II to region IV in milliseconds. That jump is called "departure from nucleate boiling" (DNB) in reactor language and "burnout" in boiler language, and it is the failure mode that every boiling design, from a fuel rod to an immersion heater, is checked against.**
:::

::: widget plot
title: The boiling curve for water at 1 atm — three straight lines and one cliff
f: 2.85+1.25*x-1000*max(0,x-0.65); 1.69+3*x-1000*max(0,0.65-x)-1000*max(0,x-1.45); 5.12+0.75*(x-2.845)-1000*max(0,2.08-x)
x: 0,3
y: 0,7
labels: log10(dT_e) — superheat in kelvin (0 = 1 K, 1 = 10 K, 2 = 100 K); log10(q'') — W/m2 (6 = 1 MW/m2); natural convection (slope 1.25); nucleate boiling (slope 3); film boiling (slope 3/4)
caption: Three regimes of pool boiling of water at one atmosphere, drawn as straight lines on log-log axes: natural convection $q \propto \Delta T ^ { 1 . 2 5 }$ , nucleate boiling $q \propto \Delta T ^ { 3 }$ (here $q ^ { \prime \prime } \approx 5 0 \, \Delta T _ { e } ^ { 3 }$ in $\mathrm { W / m ^ { 2 } }$ ), and film boiling $q \propto \Delta T ^ { 3 / 4 }$ (convection only, anchored on the quenching example below). The nucleate line ends at the critical heat flux, $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ at $\Delta T _ { e } \approx 2 8 \ \mathrm { K }$ ; the film-boiling line starts near the Leidenfrost point, about $1 2 0 \ \mathrm { K }$ , at a few tens of $\mathrm { k W / m ^ { 2 } }$ — some thirty times below the CHF — and the gap between them is transition boiling, a region no stable design operates in. **Reading across at a fixed heat flux of $1 0 0 \ \mathrm { k W / m ^ { 2 } }$ : about $1 3 \ \mathrm { K }$ of superheat on the nucleate branch, about $4 8 0 \ \mathrm { K }$ on the film branch.**
:::

## 4. Nucleate boiling: the Rohsenow correlation

::: definition Rohsenow's nucleate-boiling correlation {#def-rohsenow}
The one good engineering correlation for the nucleate-boiling heat flux is Rohsenow's (1952), a balance between the bubble's buoyancy and the liquid's superheat:

$$q ^ { \prime \prime } = \mu _ { l } h _ { f g } \left[ { \frac { g ( \rho _ { l } - \rho _ { v } ) } { \sigma } } \right] ^ { 1 / 2 } \left[ { \frac { c _ { p , l } \Delta T _ { e } } { C _ { s f } h _ { f g } \, \mathrm { P r } _ { l } ^ { \, s } } } \right] ^ { 3 } \qquad s = 1 . 0 \ \text{(water)} , \quad 1 . 7 \ \text{(other fluids)}$$

with all liquid properties at $T _ { \mathrm { s a t } }$ . The exponent $3$ is the physics of site density; the bracket is a dimensionless superheat; and $C _ { s f }$ is a surface–fluid constant:

| Fluid – surface | $C _ { s f }$ | Fluid – surface | $C _ { s f }$ |
|:--|--:|:--|--:|
| Water – polished copper | $0 . 0 1 2 8$ | Water – platinum | $0 . 0 1 3 0$ |
| Water – scored copper | $0 . 0 0 6 8$ | Water – brass | $0 . 0 0 6 0$ |
| Water – mechanically polished stainless steel | $0 . 0 1 3 2$ | n-Pentane – polished copper | $0 . 0 1 5 4$ |
| Water – ground and polished stainless steel | $0 . 0 0 8 0$ | Ethyl alcohol – chromium | $0 . 0 0 2 7$ |

(Values as tabulated by Incropera et al., largely from Vachon, Nix and Tanger, 1968.)

**$C _ { s f }$ enters as $1 / C _ { s f } ^ { 3 }$ , so a factor of two uncertainty in this "constant" is a factor of eight in predicted heat flux — a factor of two in wall superheat.** **It is the least defensible number in the equation and the reason no boiling design is done from the correlation alone; it is the reason boiling equipment is commissioned by measurement, and the reason the honest designer quotes a range.**
:::

::: example What a kettle element actually runs at {#ex-kettle level=2 check="11.1"}
A $2 . 0 \ \mathrm { k W }$ sheathed element has a wetted area of $1 0 0 \ \mathrm { c m } ^ { 2 } = 0 . 0 1 0 0 \ \mathrm { m } ^ { 2 }$ , so $q ^ { \prime \prime } = 2 0 0 \ \mathrm { k W / m ^ { 2 } }$ . Water at $1 \ \mathrm { a t m }$ on polished copper, $C _ { s f } = 0 . 0 1 2 8$ ; liquid properties at $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\mu _ { l } = 2 8 2 \times 1 0 ^ { - 6 } \ \mathrm { P a \, s }$ , $c _ { p , l } = 4 2 1 7 \ \mathrm { J / k g \, K }$ , $\mathrm { P r } _ { l } = 1 . 7 5$ , $\sigma = 0 . 0 5 8 9 \ \mathrm { N / m }$ , $\rho _ { l } - \rho _ { v } = 9 5 7 . 3 \ \mathrm { k g / m ^ { 3 } }$ . Find the wall superheat. (Enter $\Delta T _ { e }$ in K.) The prefactor is

$$\mu _ { l } h _ { f g } \left[ { \frac { g ( \rho _ { l } - \rho _ { v } ) } { \sigma } } \right] ^ { 1 / 2 } = 2 8 2 \times 1 0 ^ { - 6 } \times 2 . 2 5 7 \times 1 0 ^ { 6 } \times \left[ { \frac { 9 . 8 1 \times 9 5 7 . 3 } { 0 . 0 5 8 9 } } \right] ^ { 1 / 2 } = 6 3 6 \times 3 9 9 = 2 5 4 \ \mathrm { k W / m ^ { 2 } }$$

and the bracket at $\Delta T _ { e } = 1 0 \ \mathrm { K }$ is $4 2 1 7 \times 1 0 / ( 0 . 0 1 2 8 \times 2 . 2 5 7 \times 1 0 ^ { 6 } \times 1 . 7 5 ) = 0 . 8 3 4$ , giving $q ^ { \prime \prime } = 2 5 4 \times 0 . 8 3 4 ^ { 3 } = 1 4 7 \ \mathrm { k W / m ^ { 2 } }$ . Inverting the cube for $2 0 0 \ \mathrm { k W / m ^ { 2 } }$ :

$$\Delta T _ { e } = 1 0 \left( { \frac { 2 0 0 } { 1 4 7 } } \right) ^ { 1 / 3 } = \mathbf { 1 1 . 1 \ K } \qquad h = { \frac { 2 0 0 \, 0 0 0 } { 1 1 . 1 } } = \mathbf { 1 8 \, 0 0 0 \ W / m ^ { 2 } K }$$

**The element sheath therefore sits only about $1 1 \ \mathrm { K }$ above $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ while it is covered — around $1 1 1 \ \ {} ^ { \circ } \mathrm { C }$ .** **The margin to CHF is $2 0 0 / 1 1 1 0 = 0 . 1 8$ , comfortable, and the same calculation on a $3 \ \mathrm { k W }$ element in $6 0 \ \mathrm { c m } ^ { 2 }$ gives $5 0 0 \ \mathrm { k W / m ^ { 2 } }$ , $\Delta T _ { e } = 1 5 \ \mathrm { K }$ and $4 5 \ \%$ of CHF — which is why a more powerful element is made bigger, not just hotter.** **Now switch off the water. In air the coefficient is a few tens of $\mathrm { W / m ^ { 2 } K }$ at most, and even radiation at $\varepsilon = 0 . 8$ cannot shed $2 0 0 \ \mathrm { k W / m ^ { 2 } }$ until the sheath is above $1 1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ — the element overheats and burns out in minutes. That is why every kettle has a thermal cut-out on the element: dry-boil protection is a temperature device standing guard over a heat-flux problem.**
:::

::: example Why a dielectric coolant has a low critical heat flux {#ex-dielectric level=2 check="154"}
Immersion cooling of electronics boils an electrically insulating fluorocarbon rather than water, because the liquid touches live circuitry. For **FC-72 at $1 \ \mathrm { a t m }$** ($T _ { \mathrm { s a t } } = 5 6 \ \ {} ^ { \circ } \mathrm { C }$ ; approximate saturation properties $\rho _ { l } = 1 6 2 0 \ \mathrm { k g / m ^ { 3 } }$ , $\rho _ { v } = 1 3 . 4 \ \mathrm { k g / m ^ { 3 } }$ , $h _ { f g } = 9 4 . 8 \ \mathrm { k J / k g }$ , $\sigma = 0 . 0 0 8 3 \ \mathrm { N / m }$ ), estimate the pool-boiling critical heat flux with Zuber's correlation (defined in §5 below). (Enter $q ^ { \prime \prime } _ { \max }$ in $\mathrm { k W / m ^ { 2 } }$ .)

$$K = \left[ { \frac { \sigma g ( \rho _ { l } - \rho _ { v } ) } { \rho _ { v } ^ { 2 } } } \right] ^ { 1 / 4 } = \left[ { \frac { 0 . 0 0 8 3 \times 9 . 8 1 \times 1 6 0 6 } { 1 3 . 4 ^ { 2 } } } \right] ^ { 1 / 4 } = 0 . 9 2 \ \mathrm { m / s } \qquad q ^ { \prime \prime } _ { \max } = 0 . 1 3 1 \times 9 4 \, 8 0 0 \times 1 3 . 4 \times 0 . 9 2 = \mathbf { 1 5 4 \ k W / m ^ { 2 } }$$

**About $1 5 \ \mathrm { W / c m ^ { 2 } }$ — seven times less than water's $1 . 1 1 \ \mathrm { M W / m ^ { 2 } }$ , because the latent heat is twenty-four times smaller and the surface tension seven times smaller, only partly offset by the denser vapor.** **A processor die at $1 0 0 \ \mathrm { W / c m ^ { 2 } }$ is therefore far beyond what plain pool boiling of a fluorocarbon can carry: immersion-cooled electronics spread the heat first (through a lid or a finned or porous-coated boiling surface several times the die area), so that the flux the liquid sees stays well below the CHF.** **The fluid is chosen for its dielectric strength and its low boiling point, which pins the surfaces near $6 0 \ \ {} ^ { \circ } \mathrm { C }$ ; the price is a heat-flux ceiling an order of magnitude below water's.**
:::

::: quiz Twice the flux {#quiz-flux}
A boiling surface is delivering $q''$ at a wall superheat of $10\ \mathrm{K}$. The heat flux is doubled and the surface stays in nucleate boiling. Which statement is true?
- [ ] The superheat is $13\ \mathrm{K}$ and the coefficient has fallen
- [x] The superheat is $13\ \mathrm{K}$ and the coefficient has risen by a factor of $1.6$
- [ ] The superheat is $20\ \mathrm{K}$ and the coefficient is unchanged
- [ ] The superheat is $27\ \mathrm{K}$ because boiling is a $\Delta T^3$ law

::: solution
**Nucleate boiling goes as $q \propto \Delta T_e^3$, so doubling the flux raises the superheat by $2^{1/3} = 1.26$, to $12.6\ \mathrm{K}$.** **The coefficient, however, has gone up as $q/\Delta T \propto \Delta T^2$, by $1.6$ — which is the trap in the other direction: a designer who sized a surface from the coefficient measured at the old operating point ends up with more coefficient and less temperature margin than the datasheet suggests, and with a heat flux that is now $0.36$ of CHF rather than $0.18$.**
:::
:::

::: quiz Beating the cliff {#quiz-chf}
Which single change most increases the heat flux a pool-boiling surface can carry without burnout?
- [ ] Polishing the surface to a mirror finish
- [ ] Using a fluid with a higher latent heat
- [x] Raising the operating pressure, and subcooling the liquid
- [ ] Adding surface area with deep fins

::: solution
**The critical heat flux is set by vapor–liquid counter-flow, $q''_{\max} \propto \rho_v^{1/2}\sigma^{1/4}h_{fg}$, and for water it roughly triples between $1\ \mathrm{atm}$ and $3\ \mathrm{MPa}$ before falling again towards the critical point; subcooling the liquid raises it further (the liquid absorbs heat before it boils), and so does forced flow, which is why jet-impingement and spray cooling reach far higher fluxes than pool boiling.** **Polishing does the opposite of what is wanted at low superheat — it destroys nucleation sites — although a roughened or porous coating does raise CHF, and is the one surface treatment that helps.** **A higher $h_{fg}$ enters only to the first power while the density terms dominate, and deep fins increase area but not the flux limit per unit area: they flood and starve at the base.**
:::
:::

## 5. The critical heat flux: the most important number in two-phase design

::: definition The critical heat flux and its mechanism {#def-chf}
The **critical heat flux** (CHF, "burnout", "departure from nucleate boiling") is the maximum heat flux a boiling surface can pass while liquid still reaches it. Zuber's mechanism (1959) is a counter-flow limit: vapor leaves the surface in columns, liquid must flow back inwards past them, and the interface between the two becomes Rayleigh–Taylor unstable — the vapor blasts up in jets and the liquid is held off. The most dangerous wavelength of that instability sets the spacing of the vapor columns, and with it the flux at which the counter-flow fails:

$$q ^ { \prime \prime } _ { \max } = C \, h _ { f g } \rho _ { v } \left[ { \frac { \sigma g ( \rho _ { l } - \rho _ { v } ) } { \rho _ { v } ^ { 2 } } } \right] ^ { 1 / 4 } \qquad C = { \frac { \pi } { 2 4 } } = 0 . 1 3 1 \ \text{(Zuber)}, \quad 0 . 1 4 9 \ \text{(Lienhard and Dhir, large flat heaters)}$$

The bracket is a **vapor escape velocity** to the fourth power: $K = \left[ \sigma g \Delta \rho / \rho _ { v } ^ { 2 } \right] ^ { 1 / 4 }$ has units of $\mathrm { m / s }$ and is the speed at which a vapor column of the most dangerous wavelength sheds itself. Then $q ^ { \prime \prime } _ { \max } = C \, \rho _ { v } h _ { f g } K$ says simply: **the flux is the latent enthalpy carried by a layer of vapor of order one wavelength per second** — a counter-flow limit, not a wall phenomenon. It is therefore almost independent of the wall material, the surface finish and (to first order) the superheat, which is why it can be predicted from saturation properties alone to within about $\pm 2 0 \ \ \%$ for large heaters in most fluids.
:::

::: example Water's critical heat flux at five pressures {#ex-water-s-critical-heat-flux-at-four-pressu level=3 check="1.11"}
Zuber's correlation for water, using saturation properties at each pressure (surface tension from the IAPWS correlation). Find the critical heat flux at $1 \ \mathrm { a t m }$ . (Enter $q ^ { \prime \prime } _ { \max }$ in $\mathrm { M W / m ^ { 2 } }$ .)

| $p$ | $T _ { \mathrm { s a t } }$ | $\rho _ { l }$ | $\rho _ { v }$ | $h _ { f g }$ ($\mathrm { k J / k g }$) | $\sigma$ ($\mathrm { N / m }$) | $q ^ { \prime \prime } _ { \max }$ |
|:--|--:|--:|--:|--:|--:|--:|
| $0 . 1 0 1 \ \mathrm { M P a }$ | $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ | $958$ | $0 . 598$ | $2 2 5 7$ | $0 . 0 589$ | $1 . 1 1 \ \mathrm { M W / m ^ { 2 } }$ |
| $1 . 0 \ \mathrm { M P a }$ | $1 8 0 \ \ {} ^ { \circ } \mathrm { C }$ | $8 8 7$ | $5 . 1 5$ | $2 0 1 5$ | $0 . 0 4 2 2$ | $2 . 6 \ \mathrm { M W / m ^ { 2 } }$ |
| $3 . 0 \ \mathrm { M P a }$ | $2 3 4 \ \ {} ^ { \circ } \mathrm { C }$ | $8 2 2$ | $1 5 . 0$ | $1 7 9 5$ | $0 . 0 2 9 8$ | $3 . 6 \ \mathrm { M W / m ^ { 2 } }$ |
| $7 . 0 \ \mathrm { M P a }$ | $2 8 6 \ \ {} ^ { \circ } \mathrm { C }$ | $7 4 0$ | $3 6 . 5$ | $1 5 0 5$ | $0 . 0 1 7 6$ | $4 . 0 \ \mathrm { M W / m ^ { 2 } }$ |
| $1 5 . 0 \ \mathrm { M P a }$ | $3 4 2 \ \ {} ^ { \circ } \mathrm { C }$ | $6 0 3$ | $9 6 . 7$ | $1 0 0 0$ | $0 . 0 0 5 2$ | $2 . 9 \ \mathrm { M W / m ^ { 2 } }$ |

At $1 \ \mathrm { a t m }$: $K = \left[ 0 . 0 5 8 9 \times 9 . 8 1 \times 9 5 7 . 3 / 0 . 5 9 8 ^ { 2 } \right] ^ { 1 / 4 } = 6 . 2 7 \ \mathrm { m / s }$ and $q ^ { \prime \prime } _ { \max } = 0 . 1 3 1 \times 2 . 2 5 7 \times 1 0 ^ { 6 } \times 0 . 5 9 8 \times 6 . 2 7 = \mathbf { 1 . 1 1 \ M W / m ^ { 2 } }$ , against measured values of roughly $1 . 0$–$1 . 3 \ \mathrm { M W / m ^ { 2 } }$ on large heaters.

**Read the shape of the table.** **The CHF rises steeply with pressure — the escape velocity $K$ falls as $\rho _ { v } ^ { - 1 / 2 }$ but the density of vapor available to carry enthalpy rises faster — reaches a maximum of about $4 \ \mathrm { M W / m ^ { 2 } }$ near $7 \ \mathrm { M P a }$ , a third of the critical pressure, and then falls towards zero at the critical point ($2 2 . 1 \ \mathrm { M P a }$ ), where surface tension and latent heat vanish.** **A pressurised-water reactor runs at $1 5 . 5 \ \mathrm { M P a }$ so that its coolant stays liquid at about $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ ; a side benefit is a pool-boiling CHF nearly three times the atmospheric value, and with the forced flow of the core the flow-boiling CHF is higher still — the operating hot-channel flux is kept well below it, with a minimum DNB ratio set by the licensing correlation.** **A loss-of-coolant accident attacks that margin from both ends: the pressure falls, the forced flow is lost, and decay heat of several per cent of full power is still being generated immediately after shutdown.**
:::

::: definition DNB, dryout, and the two ways an evaporator tube fails {#def-dnb}
In a heated channel carrying flowing two-phase flow there are two distinct failures, and they happen at opposite ends of the pressure–mass-flux map. **DNB (departure from nucleate boiling), or "burnout", happens in the subcooled or low-quality region**: a vapor blanket forms at the wall while the core is still liquid, driven by the local CHF mechanism; it is characteristic of **high heat flux at low or negative quality** (the pressurised-water reactor case), and it arrives abruptly, with a temperature excursion of hundreds of kelvin. **Dryout happens at high quality**: the liquid film on the wall is simply used up — the annular-flow film thins until it breaks, and the wall is left in vapor. It is characteristic of **moderate heat flux at high quality** (boiling-water reactors, once-through boilers, refrigerant evaporators), and the wall temperature excursion is usually milder, but it can still be fatal to the tube. **The design rule is the same in both cases — keep $q ^ { \prime \prime } / q ^ { \prime \prime } _ { \text{lim } } \lesssim 0 . 7$ using a local, not an average, flux — but the correlations are unrelated, and using the wrong one is a classic and fatal error.**
:::

## 6. Film boiling, the Leidenfrost point, and quenching

::: definition Bromley's film-boiling correlation {#def-bromley}
Above the Leidenfrost point a continuous vapor film insulates the surface, and heat crosses it by conduction and (at high temperature) radiation. For a horizontal cylinder or sphere of diameter $D$ , Bromley (1950) extends Nusselt's film-condensation argument to boiling:

$$\overline { { \mathrm { N u } } } _ { D } = C \left[ { \frac { g \rho _ { v } ( \rho _ { l } - \rho _ { v } ) h _ { f g } ^ { \prime } D ^ { 3 } } { \mu _ { v } k _ { v } \Delta T _ { e } } } \right] ^ { 1 / 4 } \ , \qquad C = 0 . 6 2 \ \text{(cylinder)}, \ 0 . 6 7 \ \text{(sphere)} , \qquad h _ { f g } ^ { \prime } = h _ { f g } + 0 . 8 \, c _ { p , v } \Delta T _ { e }$$

with **vapor properties at the film temperature** $( T _ { s } + T _ { \mathrm { s a t } } ) / 2$ . The $0 . 8$ correction is the superheating of the vapor leaving the film and is not optional: at $\Delta T _ { e } = 7 0 0 \ \mathrm { K }$ it adds about $5 0 \ \ \%$ to the latent heat and $1 1 \ \ \%$ to the coefficient. At high wall temperature add radiation through Bromley's implicit combination $h ^ { 4 / 3 } = h _ { \text{conv} } ^ { 4 / 3 } + h _ { \text{rad} } \, h ^ { 1 / 3 }$ , with $h _ { \text{rad} } = \varepsilon _ { w } \sigma ( T _ { s } ^ { 2 } + T _ { \mathrm { s a t } } ^ { 2 } ) ( T _ { s } + T _ { \mathrm { s a t } } )$ ; when $h _ { \text{rad} } < h _ { \text{conv} }$ this is close to $h \approx h _ { \text{conv} } + \tfrac { 3 } { 4 } h _ { \text{rad} }$ . **Note the $1 / 4$ power of $1 / \Delta T _ { e }$ inside the bracket: $h \propto \Delta T _ { e } ^ { - 1 / 4 }$ , so the film-boiling coefficient *falls* as the surface gets hotter, and $q ^ { \prime \prime } \propto \Delta T _ { e } ^ { 3 / 4 }$ only weakly rises — this is the region where more superheat buys almost nothing.**
:::

::: example Quenching a steel sphere: why the part sits in a cloud of its own steam {#ex-quenching-a-steel-sphere-why-the-part-sit level=3 check="165"}
A $2 0 \ \mathrm { mm }$ steel sphere at $8 0 0 \ \ {} ^ { \circ } \mathrm { C }$ is plunged into water at $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ . Find the film-boiling heat flux at the start of the quench. (Enter it in $\mathrm { k W / m ^ { 2 } }$ .) Vapor properties at the film temperature $4 5 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\rho _ { v } = 1 0 1 \, 3 2 5 / ( 4 6 1 . 5 \times 7 2 3 ) = 0 . 3 0 4 \ \mathrm { k g / m ^ { 3 } }$ , $\mu _ { v } = 2 . 5 1 \times 1 0 ^ { - 5 } \ \mathrm { P a \, s }$ , $k _ { v } = 0 . 0 5 2 5 \ \mathrm { W / m \, K }$ , $c _ { p , v } = 2 1 0 0 \ \mathrm { J / k g \, K }$ .

$$h _ { f g } ^ { \prime } = 2 . 2 5 7 \times 1 0 ^ { 6 } + 0 . 8 \times 2 1 0 0 \times 7 0 0 = 3 . 4 3 \times 1 0 ^ { 6 } \ \mathrm { J / k g } \qquad { \frac { g \rho _ { v } \Delta \rho h _ { f g } ^ { \prime } D ^ { 3 } } { \mu _ { v } k _ { v } \Delta T _ { e } } } = { \frac { 9 . 8 1 \times 0 . 3 0 4 \times 9 5 8 \times 3 . 4 3 \times 1 0 ^ { 6 } \times 8 . 0 \times 1 0 ^ { - 6 } } { 2 . 5 1 \times 1 0 ^ { - 5 } \times 0 . 0 5 2 5 \times 7 0 0 } } = 8 . 5 \times 1 0 ^ { 7 }$$

$$\overline { { \mathrm { Nu } } } _ { D } = 0 . 6 7 \times ( 8 . 5 \times 1 0 ^ { 7 } ) ^ { 1 / 4 } = 0 . 6 7 \times 9 6 . 0 = 6 4 . 3 \qquad h _ { \text{conv} } = { \frac { 6 4 . 3 \times 0 . 0 5 2 5 } { 0 . 0 2 0 } } = 1 6 9 \ \mathrm { W / m ^ { 2 } K }$$

Radiation from the oxide-covered surface ($\varepsilon = 0 . 8$ ) gives $h _ { \text{rad} } = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } ( 1 0 7 3 ^ { 2 } + 3 7 3 ^ { 2 } ) ( 1 0 7 3 + 3 7 3 ) = 8 5 \ \mathrm { W / m ^ { 2 } K }$ , and solving $h ^ { 4 / 3 } = 1 6 9 ^ { 4 / 3 } + 8 5 \, h ^ { 1 / 3 }$ by iteration gives $h = 2 3 6 \ \mathrm { W / m ^ { 2 } K }$ — radiation is worth about $3 0 \ \ \%$ of the total. Then

$$q ^ { \prime \prime } = 2 3 6 \times 7 0 0 = \mathbf { 1 6 5 \ k W / m ^ { 2 } } \qquad \tau = { \frac { \rho c _ { p } ( D / 6 ) } { h } } = { \frac { 7 8 0 0 \times 6 0 0 \times 0 . 0 0 3 3 3 } { 2 3 6 } } = 6 6 \ \mathrm { s }$$

**The flux is less than a sixth of the $1 . 1 1 \ \mathrm { M W / m ^ { 2 } }$ the same surface passes at about $3 0 \ \mathrm { K }$ of superheat, and the coefficient is over a hundred times smaller — and the part will sit in this regime for tens of seconds, from $8 0 0 \ \ {} ^ { \circ } \mathrm { C }$ down to roughly $2 5 0 \ \ {} ^ { \circ } \mathrm { C }$ , before the film collapses and the last part of the quench becomes violently fast.** (The Biot number $h ( D / 6 ) / k \approx 2 3 6 \times 0 . 0 0 3 3 3 / 4 0 = 0 . 0 2$ justifies the lumped time constant.) **This is the heat-treater's problem: the film-boiling stage is slow and the nucleate stage so fast that it causes quench distortion and cracking, which is why quenchants — brine, polymer solutions, oils — are chosen and agitated to control when and how fast the vapor film collapses, not simply to cool as fast as possible.**
:::

::: definition The Leidenfrost point and the minimum heat flux {#def-leidenfrost}
The **Leidenfrost point** is the temperature at which a drop skates on its own vapor and survives instead of boiling away; for water on a clean, smooth metal surface it is roughly $1 2 0$–$1 5 0 \ \mathrm { K }$ above saturation, i.e. about $2 2 0$–$2 5 0 \ \ {} ^ { \circ } \mathrm { C }$ at $1 \ \mathrm { a t m }$ (for liquid nitrogen it lies far below room temperature, which is why spilled nitrogen skitters across a floor in beads instead of flashing off). It corresponds to the **minimum heat flux** at the bottom of the boiling curve, which Zuber estimated as
$$
q ^ { \prime \prime } _ { \min } = 0 . 0 9 \, \rho _ { v } h _ { f g } \left[ { \frac { g \sigma ( \rho _ { l } - \rho _ { v } ) } { ( \rho _ { l } + \rho _ { v } ) ^ { 2 } } } \right] ^ { 1 / 4 }
$$
— about $1 9 \ \mathrm { k W / m ^ { 2 } }$ for water at $1 \ \mathrm { a t m }$ , under $2 \ \ \%$ of the CHF. **A millimetre-sized drop on a pan above the Leidenfrost point survives for a minute or more, while the same drop on a pan at $1 5 0 \ \ {} ^ { \circ } \mathrm { C }$ flashes off in a second or two — the "sizzling test" for a pan is a boiling-curve measurement made by hand.** **The Leidenfrost temperature is not a fluid property alone: it rises with surface roughness and with the thermal effusivity of the solid, and it depends on contamination, which is why measured values scatter by tens of kelvin.**
:::

## 7. Flow boiling: when the liquid is moving

::: definition Flow-boiling regimes and the two-factor picture {#def-flow-boiling}
In a heated channel the vapor generated at the wall must be swept away, and the resulting **flow-pattern map** (at increasing quality, left to right) runs: **bubbly** → **slug/plug** → **churn** → **annular** → (after dryout) **mist**. Heat transfer is good while the wall is wet and deteriorates sharply once it dries. The workhorse correlation (Chen, 1966) adds a convective and a nucleate contribution, each with its own correction factor:

$$h _ { tp } = F \, h _ { l } + S \, h _ { \text{nb} } \ , \qquad h _ { l } = 0 . 0 2 3 \, \mathrm { R e } _ { l } ^ { 0 . 8 } \mathrm { P r } _ { l } ^ { 0 . 4 } { \frac { k _ { l } } { D } } , \quad \mathrm { R e } _ { l } = { \frac { G ( 1 - x ) D } { \mu _ { l } } } , \qquad { \frac { 1 } { X _ { t t } } } = \left( { \frac { x } { 1 - x } } \right) ^ { 0 . 9 } \left( { \frac { \rho _ { l } } { \rho _ { v } } } \right) ^ { 0 . 5 } \left( { \frac { \mu _ { v } } { \mu _ { l } } } \right) ^ { 0 . 1 }$$

**$F \geq 1$ is an enhancement of liquid-phase convection by the faster-moving vapor core, a function of the Martinelli parameter $X _ { t t }$ that rises steeply with quality — which is why $h$ in annular flow can be several times the all-liquid value. $S \leq 1$ is a suppression of bubble nucleation by the thinning, fast-moving liquid film, which falls as the two-phase Reynolds number rises — which is why at high mass flux and quality boiling "stops helping" and the tube behaves like a single-phase convective one.** (Chen gave $F$ and $S$ as graphs; curve fits such as those in Collier and Thome are used in practice.) **The practical consequences: $h$ grows roughly as $G ^ { 0 . 8 }$ in the convection-dominated regime and depends mainly on heat flux in the nucleate-dominated one; and near dryout both terms collapse together.**
:::

::: example A reactor core that never reaches boiling at its exit {#ex-a-reactor-core-that-never-reaches-boiling level=3 check="-0.11"}
Take an idealised round heated channel at pressurised-water-reactor conditions (real cores use rod bundles of about $4 \ \mathrm { m }$ active length; this is a teaching geometry): $D = 2 5 \ \mathrm { m m }$ inside diameter, $L = 6 . 0 \ \mathrm { m }$ heated length, water at $1 5 . 5 \ \mathrm { M P a }$ entering with $h _ { \text{in} } = 1 3 4 4 \ \mathrm { k J / k g }$ (about $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ ), mass flux $G = 3 0 0 0 \ \mathrm { k g / m ^ { 2 } s }$ and uniform heat flux $q ^ { \prime \prime } = 6 0 0 \ \mathrm { k W / m ^ { 2 } }$ . Find the exit equilibrium quality. (Enter $x _ { e q }$ .)

$$\dot { m } = G { \frac { \pi D ^ { 2 } } { 4 } } = 3 0 0 0 \times 4 . 9 0 9 \times 1 0 ^ { - 4 } = 1 . 4 7 3 \ \mathrm { k g / s } \qquad \dot { Q } = q ^ { \prime \prime } \pi D L = 6 0 0 \times 1 0 ^ { 3 } \times \pi \times 0 . 0 2 5 \times 6 . 0 = 2 8 3 \ \mathrm { k W }$$

$$\Delta h = { \frac { \dot { Q } } { \dot { m } } } = { \frac { 2 8 3 } { 1 . 4 7 3 } } = 1 9 2 \ \mathrm { k J / k g } \qquad h _ { \text{out } } = 1 3 4 4 + 1 9 2 = 1 5 3 6 \ \mathrm { k J / k g }$$

At $1 5 . 5 \ \mathrm { M P a }$ , $h _ { f } \approx 1 6 4 0$ and $h _ { f g } \approx 9 7 0 \ \mathrm { k J / k g }$ , so the exit equilibrium quality is

$$x _ { e q } = { \frac { 1 5 3 6 - 1 6 4 0 } { 9 7 0 } } = \mathbf { - 0 . 1 1 }$$

**The channel exit is still about $1 0 0 \ \mathrm { k J / k g }$ short of saturation: on average a PWR core makes no net steam, and the negative exit quality is part of the margin that keeps DNB a hypothetical rather than a reality at full power.** **(Local subcooled boiling on the hottest rods does occur; the mixed-mean water is what stays subcooled.)** **Note what the same arithmetic says about a boiling-water reactor at $7 \ \mathrm { M P a }$ , where $x _ { e q }$ at the core exit is about $0 . 1 4$ : there the water does boil in the core, the recirculation flow is the power control, and dryout — not DNB — is the limiting phenomenon.**
:::

## 8. Condensation: the mirror image, with a twist

::: proof Nusselt's film-condensation analysis {#proof-nusselt-film}
Vapor at saturation temperature condenses on a vertical surface kept at $T _ { s } = T _ { \mathrm { s a t } } - \Delta T$ . A liquid film of thickness $\delta ( x )$ drains downward under gravity, in laminar flow, with no shear at the interface. **Momentum.** For a film on a vertical wall, $0 = \mu _ { l } \, \partial ^ { 2 } u / \partial y ^ { 2 } + ( \rho _ { l } - \rho _ { v } ) g$ (gravity less the hydrostatic pressure gradient of the vapor) with $u ( 0 ) = 0$ and $\partial u / \partial y | _ { \delta } = 0$ , giving a parabolic profile and a mass flow per unit width

$$\Gamma ( x ) = \int _ { 0 } ^ { \delta } \rho _ { l } u \, \mathrm { d } y = { \frac { \rho _ { l } ( \rho _ { l } - \rho _ { v } ) g \delta ^ { 3 } } { 3 \mu _ { l } } }$$

**Energy.** The heat crossing the film condenses the film, so the growth of $\Gamma$ is the condensation rate: $d \Gamma = q ^ { \prime \prime } \mathrm { d } x / h _ { f g } ^ { \prime } = k _ { l } ( T _ { \mathrm { s a t } } - T _ { s } ) \mathrm { d } x / ( \delta h _ { f g } ^ { \prime } )$ , where the film is assumed to conduct linearly (its own thermal resistance dominates). **Combine.** Differentiating $\Gamma$ and equating,

$${ \frac { \rho _ { l } ( \rho _ { l } - \rho _ { v } ) g \delta ^ { 2 } } { \mu _ { l } } } { \frac { \mathrm { d } \delta } { \mathrm { d } x } } = { \frac { k _ { l } \Delta T } { \delta h _ { f g } ^ { \prime } } } \ \Longrightarrow \ \int _ { 0 } ^ { \delta } \delta ^ { 3 } \, \mathrm { d } \delta = { \frac { \mu _ { l } k _ { l } \Delta T } { \rho _ { l } ( \rho _ { l } - \rho _ { v } ) g h _ { f g } ^ { \prime } } } \, x \ \Longrightarrow \ { \boxed { \delta ( x ) = \left[ { \frac { 4 \mu _ { l } k _ { l } \Delta T \, x } { g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) h _ { f g } ^ { \prime } } } \right] ^ { 1 / 4 } } }$$

(here $h _ { f g } ^ { \prime } = h _ { f g } ( 1 + 0 . 6 8 \, c _ { p , l } \Delta T / h _ { f g } )$ accounts for subcooling of the film). The local coefficient is conduction through the film, $h _ { x } = k _ { l } / \delta ( x ) \propto x ^ { - 1 / 4 }$ , and averaging over a plate of height $L$ gives

$$\boxed { \ { \overline { { h } } } _ { L } = { \frac { 4 } { 3 } } \, h _ { x = L } = 0 . 9 4 3 \left[ { \frac { g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) k _ { l } ^ { 3 } h _ { f g } ^ { \prime } } { \mu _ { l } L \Delta T } } \right] ^ { 1 / 4 } } \qquad \mathrm { R e } _ { \delta } = { \frac { 4 \Gamma } { \mu _ { l } } }$$

**Three things to notice, all of them design-critical.** **The film thickens as $x ^ { 1 / 4 }$ , so the coefficient is worst at the bottom and the average is $3 3 \ \ \%$ better than the local value there.** **$\overline { { h } } \propto \Delta T ^ { - 1 / 4 }$ : driving condensation harder makes the film thicker and the coefficient worse — the exact opposite of boiling, and the reason a condenser is designed with many small temperature differences rather than one big one.** **And $h$ is independent of the vapor velocity in this theory, which is why a small amount of non-condensing gas (air) is so devastating: the vapor must then *diffuse* through a stagnant air layer to reach the film, and the coefficient falls by a factor of five or more. Air vents on condensers are not housekeeping, they are the design.**
:::

::: example Steam on a wall, a tube, and a stack of tubes {#ex-steam-on-a-wall-a-tube-and-a-stack-of-tub level=3 check="5808"}
Steam at $1 \ \mathrm { a t m }$ condenses on surfaces at $8 0 \ \ {} ^ { \circ } \mathrm { C }$ , so $\Delta T = 2 0 \ \mathrm { K }$ and the film temperature is $9 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\rho _ { l } = 9 6 5 \ \mathrm { k g / m ^ { 3 } }$ , $\mu _ { l } = 3 . 1 5 \times 1 0 ^ { - 4 } \ \mathrm { P a \, s }$ , $k _ { l } = 0 . 6 7 5 \ \mathrm { W / m \, K }$ , $h _ { f g } ^ { \prime } \approx h _ { f g } = 2 2 6 0 \ \mathrm { k J / k g }$ (the subcooling correction would add under $1 \ \ \%$ to $h$ ). Find the coefficients for the three arrangements below. (Enter the ten-tube column coefficient in $\mathrm { W / m ^ { 2 } K }$ .)

**(a) Vertical wall, $L = 1 . 0 \ \mathrm { m }$ .** $\overline { { h } } _ { L } = 0 . 9 4 3 \left[ 9 . 8 1 \times 9 6 5 \times 9 6 4 . 4 \times 0 . 6 7 5 ^ { 3 } \times 2 . 2 6 \times 1 0 ^ { 6 } / ( 3 . 1 5 \times 1 0 ^ { - 4 } \times 1 . 0 \times 2 0 ) \right] ^ { 1 / 4 } = \mathbf { 5 3 1 0 \ W / m ^ { 2 } K }$ , with a film $0 . 1 7 \ \mathrm { m m }$ thick at the bottom and $q ^ { \prime \prime } = 1 0 6 \ \mathrm { k W / m ^ { 2 } }$ — condensing $1 6 9 \ \mathrm { k g / h }$ of steam per square metre. **Check the film Reynolds number at the bottom: $\mathrm { R e } _ { \delta } = 4 q ^ { \prime \prime } L / ( h _ { f g } \mu _ { l } ) = 6 0 0$ , above the $\approx 3 0$ at which ripples appear, so the real film is wavy-laminar and the measured coefficient is typically some $1 0$–$2 0 \ \ \%$ above Nusselt's.**

**(b) Single horizontal tube, $D = 2 5 \ \mathrm { m m }$ .** Replacing $L$ by $D$ and $0 . 9 4 3$ by $0 . 7 2 9$ (the analysis is identical but the film drains only $\pi D / 2$ of circumference and never gets tall): $\overline { { h } } _ { D } = 0 . 7 2 9 \left[ \cdots / D \right] ^ { 1 / 4 } = \mathbf { 1 0 \, 3 3 0 \ W / m ^ { 2 } K }$ , **twice the vertical wall, because a tube is only $2 5 \ \mathrm { mm }$ tall.**

**(c) A vertical column of ten such tubes.** The condensate from one tube falls on the next, so tube $N$ runs with a film that has grown over $N$ tubes: $\overline { { h } } _ { N } = \overline { { h } } _ { 1 } N ^ { - 1 / 4 }$ , giving $h = 1 0 \, 3 3 0 \times 1 0 ^ { - 1 / 4 } = \mathbf { 5 8 1 0 \ W / m ^ { 2 } K }$ — **a $44 \ \ \%$ loss, and $6 7 \ \ \%$ for a hundred-tube column.**

**The three numbers are the shell side of every surface condenser ever built.** **The tube count is the enemy of the condensing coefficient, which is why condensers are arranged in rows that drain cleanly, why the tubes are horizontal, why the shell is divided by baffles into several short columns instead of one tall one, and why the condensing coefficient used in a real design is well below the single-tube textbook value: it is that value after inundation, vapor shear and non-condensable gas have had their say.**
:::

::: widget plot
title: Boiling gets better as you drive it; condensation gets worse
f: 14700*pow(x/10,2); 5310*pow(20/x,0.25)
x: 2,20
y: 0,60000
labels: wall superheat or temperature difference (K) — driving ΔT; heat-transfer coefficient (W/m2 K); nucleate boiling h ~ dT^2; film condensation h ~ dT^-1/4
caption: The two phase-change coefficients against driving temperature difference, for water at one atmosphere. Nucleate boiling (Rohsenow, polished copper, $h = q''/\Delta T \propto \Delta T ^ { 2 }$ , drawn up to roughly the CHF near $2 0 \ \mathrm { K }$ for this surface) strengthens with superheat because more nucleation sites activate; film condensation is Nusselt's $1 \ \mathrm { m }$ vertical wall; film condensation ($h \propto \Delta T ^ { - 1 / 4 }$ ) weakens because a bigger temperature difference grows a thicker insulating liquid film. The condensation curve's rise at the left is the theory failing, not working: as $\Delta T \rightarrow 0$ the Nusselt film becomes vanishingly thin and the wave, shear and gas-diffusion effects it ignores take over.
:::

::: definition Filmwise and dropwise condensation {#def-dropwise}
If the condensate wets the surface ($\theta < 9 0 ^ { \circ }$ ) it forms a continuous film — **filmwise** condensation, the case Nusselt solved and the case in every industrial condenser. If it does not ($\theta > 9 0 ^ { \circ }$ ) it condenses as discrete drops that roll away, sweeping the surface clean: **dropwise** condensation, with coefficients **five to ten times** filmwise, $2 0 \, 0 0 0$ to $1 0 0 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ , because most of the surface has no film at all. The effect was demonstrated by coating condensing surfaces with oil, gold or sulfur-based promoters and is the largest single coefficient improvement available in this whole lesson — and it is almost never used, because the promotion decays within hours or days of steam exposure. **The engineering compromise is a permanent hydrophobic or nanostructured coating, an area of very active research and of very few reliable vendor claims; the honest designer sizes for filmwise and treats dropwise as a bonus.**
:::

::: warning Two more condenser errors
**One: forgetting the vapor-side boundary layer when the vapor is not pure steam.** A few per cent of air in the steam can halve the coefficient, and the air concentration at the far end of the shell is much higher than the average, so the last third of a condenser does almost none of the work. **Two: designing a condenser with the boiling mindset, i.e. a large temperature difference.** Because $h \propto \Delta T ^ { - 1 / 4 }$ and the film is thicker at the bottom of every tube, a condenser run at $\Delta T = 4 0 \ \mathrm { K }$ has a coefficient $4 ^ { 1 / 4 } = 1 . 4$ times lower than the same unit at $1 0 \ \mathrm { K }$ . A colder coolant still helps — the flux grows as $\Delta T ^ { 3 / 4 }$ — but each extra kelvin buys less than the last, and more area is often the better cure.
:::

## Exercises

::: exercise A pot on the stove {#ex-pot level=1 check="18"}
Water at $1 \ \mathrm{atm}$ boils on a polished-copper surface ($C _ { s f } = 0 . 0 1 2 8$) at a wall superheat of $5 \ \mathrm{K}$ . Estimate the heat flux. (Enter the heat flux in $\mathrm { k W / m ^ { 2 } }$ .)
::: solution
**Use the prefactor and bracket of the kettle example.** The prefactor is $2 5 4 \ \mathrm { k W / m ^ { 2 } }$ and the bracket at $\Delta T _ { e } = 1 0 \ \mathrm { K }$ was $0 . 8 3 4$ , so at $5 \ \mathrm { K }$ it is $0 . 4 1 7$ :
$$q ^ { \prime \prime } = 2 5 4 \times 0 . 4 1 7 ^ { 3 } = \mathbf { 1 8 \ k W / m ^ { 2 } } \qquad h = { \frac { 1 8 \, 4 0 0 } { 5 } } = 3 7 0 0 \ \mathrm { W / m ^ { 2 } K }$$
**Two things to notice.** **The coefficient is $3 7 0 0$ , a fifth of the kettle element's $1 8 \, 0 0 0$ , because $h \propto \Delta T _ { e } ^ { 2 }$ and $5 \ \mathrm { K }$ is not $1 1 \ \mathrm { K }$ .** **And a real stove is in this range: a $2 \ \mathrm { k W }$ hob delivering perhaps half its output into an $1 8 \ \mathrm { c m }$ pan base puts about $4 0 \ \mathrm { k W / m ^ { 2 } }$ through it, which by the same correlation needs only about $6 . 5 \ \mathrm { K }$ of superheat — the pan base sits a few kelvin above $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ for as long as it is wet.**
:::
:::

::: exercise A bigger element {#ex-element level=2 check="10.4"}
A $1 . 5 \ \mathrm { k W }$ water-heater element has $9 0 \ \mathrm { c m } ^ { 2 }$ of wetted surface. Estimate the sheath superheat and the margin to the critical heat flux, both at $1 \ \mathrm { a t m }$ and $C _ { s f } = 0 . 0 1 2 8$ . (Enter the superheat in K.)
::: solution
$q ^ { \prime \prime } = 1 5 0 0 / 0 . 0 0 9 0 = 1 6 7 \ \mathrm { k W / m ^ { 2 } }$ . Inverting the cube law from the $1 4 7 \ \mathrm { k W / m ^ { 2 } }$ at $1 0 \ \mathrm { K }$ of the kettle example:
$$\Delta T _ { e } = 1 0 \left( { \frac { 1 6 7 } { 1 4 7 } } \right) ^ { 1 / 3 } = 1 0 \times 1 . 0 4 = \mathbf { 1 0 . 4 \ K } \qquad { \frac { q ^ { \prime \prime } } { q _ { \max } ^ { \prime \prime } } } = { \frac { 1 6 7 } { 1 1 1 0 } } = 0 . 1 5$$
**The sheath surface runs at about $1 1 0 \ \ {} ^ { \circ } \mathrm { C }$ and the flux is $1 5 \ \ \%$ of CHF, which is a normal and safe design point.** **The interesting case is scale: a $1 \ \mathrm { m m }$ crust of limescale ($k \approx 1 . 5 \ \mathrm { W / m \, K }$ ) adds a conduction resistance, and pushing the same flux through it takes $q ^ { \prime \prime } t / k = 1 6 7 \, 0 0 0 \times 0 . 0 0 1 / 1 . 5 = 1 1 1 \ \mathrm { K }$ — the sheath metal under the scale runs over $1 0 0 \ \mathrm { K }$ hotter, and a thicker crust takes it to temperatures at which the sheath oxidises and the insulation inside it degrades.** **Scale kills elements by insulating them: the boiling outside the scale is as gentle as ever, while the metal inside it cooks.**
:::
:::

::: exercise High-pressure boiler {#ex-hpfrac level=2 check="0.14"}
A once-through boiler tube at $3 . 0 \ \mathrm { M P a }$ is designed for $q ^ { \prime \prime } = 5 0 0 \ \mathrm { k W / m ^ { 2 } }$ . Using the Zuber value from the worked example, what fraction of the critical heat flux is that? (Enter the fraction to two decimals.)
::: solution
$0 . 5 0 / 3 . 5 7 = \mathbf { 0 . 1 4 }$ . **Comfortable — and misleading, because the Zuber value is for a large horizontal surface in a quiescent pool, whereas a boiler tube at high quality fails by dryout, where the limit is a function of mass flux and quality and can be several times lower than the pool CHF.** **The correct check is a dryout correlation evaluated at the local flux and local quality along the tube, and the answer is usually that the high-quality end of the tube, not the average, sets the design.**
:::
:::

::: exercise The skating drop {#ex-drop level=2 check="130"}
A water drop of $3 \ \mathrm { mm }$ radius skates on a pan well above the Leidenfrost point. Take the average heat flux into the drop's surface, through its vapor cushion and by radiation, as $5 \times 1 0 ^ { 4 } \ \mathrm { W / m ^ { 2 } }$ , and treat the drop as a sphere that shrinks uniformly. How long does it survive? (Enter seconds.)
::: solution
**For a sphere losing mass at a uniform surface flux, $\rho _ { l } h _ { f g } \, \mathrm { d } ( \tfrac { 4 } { 3 } \pi r ^ { 3 } ) / \mathrm { d } t = - q ^ { \prime \prime } 4 \pi r ^ { 2 }$ , so the radius recedes at a constant rate:**
$$\dot { r } = { \frac { q ^ { \prime \prime } } { \rho _ { l } h _ { f g } } } = { \frac { 5 \times 1 0 ^ { 4 } } { 9 5 8 \times 2 . 2 5 7 \times 1 0 ^ { 6 } } } = 2 . 3 \times 1 0 ^ { - 5 } \ \mathrm { m / s } \qquad t = { \frac { 3 \times 1 0 ^ { - 3 } } { 2 . 3 \times 1 0 ^ { - 5 } } } = \mathbf { 1 3 0 \ s }$$
**About two minutes — which is the right order for real Leidenfrost drops of this size — for a drop that would boil away in a few seconds in nucleate boiling on a pan at $1 2 0 \ \ {} ^ { \circ } \mathrm { C }$ , where the flux into its base is tens of times larger.** **The insulating vapor cushion is only tens of microns thick, but it costs the drop's heat supply more than an order of magnitude.** **The same physics is why a water spray on a very hot surface can cool it less than expected: drops that stay in film boiling bounce off and evaporate in the gas instead of at the wall, and only once the wall falls below the Leidenfrost point do they wet it and quench it.**
:::
:::

::: exercise A taller condensing surface {#ex-cond2 level=3 check="5312"}
Steam at $1 \ \mathrm{atm}$ condenses on a vertical plate $2 . 0 \ \mathrm { m }$ high held at $9 0 \ \ {} ^ { \circ } \mathrm { C }$ . Find the average coefficient and the heat flux, using the film properties of the worked example. (Enter the coefficient in $\mathrm { W / m ^ { 2 } K }$ .)
::: solution
The film temperature is $9 5 \ \ {} ^ { \circ } \mathrm { C }$ (where $\rho _ { l } = 9 6 3$ , $\mu _ { l } = 2 . 9 7 \times 1 0 ^ { - 4 }$ , $k _ { l } = 0 . 6 7 8$ would raise $h$ by about $2 \ \ \%$ ); using the properties of the worked example for comparison:
$${ \overline { { h } } } _ { L } = 0 . 9 4 3 \left[ { \frac { 9 . 8 1 \times 9 6 5 \times 9 6 4 \times 0 . 6 7 5 ^ { 3 } \times 2 . 2 6 \times 1 0 ^ { 6 } } { 3 . 1 5 \times 1 0 ^ { - 4 } \times 2 . 0 \times 1 0 } } \right] ^ { 1 / 4 } = \mathbf { 5 3 1 0 \ W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = 5 3 1 0 \times 1 0 = 5 3 \ \mathrm { k W / m ^ { 2 } }$$
**The coefficient is identical to the $1 \ \mathrm { m }$ plate at $\Delta T = 2 0 \ \mathrm { K }$ , because Nusselt's theory depends only on the product $L \Delta T$ — doubling the height at half the temperature difference is the same problem, and even the film at the bottom is exactly as thick, since $\delta \propto ( x \Delta T ) ^ { 1 / 4 }$ .** **The heat flux is half, though: the same coefficient, half the duty per square metre.** **This is why condenser ratings are quoted per unit area at a stated $\Delta T$ and why comparing two condensers by their coefficient alone is meaningless.**
:::
:::

::: exercise Sixteen tubes high {#ex-hundred level=3 check="0.50"}
A shell-and-tube condenser has vertical columns of horizontal tubes. Relative to a single isolated tube, what is the average condensing coefficient of a column of sixteen tubes, by Nusselt's $N ^ { - 1 / 4 }$ rule? (Enter the ratio to two decimals.)
::: solution
$1 6 ^ { - 1 / 4 } = 1 / 2 = \mathbf { 0 . 5 0 }$ . **Sixteen tubes stacked condense at half the coefficient of one tube, purely because the condensate has nowhere to go but down onto the next tube.** **Two remedies, both standard: keep the columns short by arranging the bundle and baffles so that condensate drains away rather than cascading through many rows, and use staggered layouts in which condensate from one tube does not fall squarely on the next.** **Note that Nusselt's $N ^ { - 1 / 4 }$ law is generally regarded as pessimistic for real bundles — splashing, ripples and vapor shear disturb the film between rows — and Kern's milder $N ^ { - 1 / 6 }$ is often used in design ($1 6 ^ { - 1 / 6 } = 0 . 6 3$).**
:::
:::

::: exercise Push the reactor harder {#ex-pwr2 level=3 check="-0.03"}
The channel of the worked example is run at $q ^ { \prime \prime } = 7 0 0 \ \mathrm { k W / m ^ { 2 } }$ with $G = 2 5 0 0 \ \mathrm { k g / m ^ { 2 } s }$ . Find the equilibrium quality at the exit, and say whether the channel still avoids net boiling. (Enter $x _ { e q }$ .)
::: solution
$$\dot { m } = 2 5 0 0 \times 4 . 9 0 9 \times 1 0 ^ { - 4 } = 1 . 2 2 7 \ \mathrm { k g / s } \qquad \dot { Q } = 7 0 0 \times 1 0 ^ { 3 } \times \pi \times 0 . 0 2 5 \times 6 . 0 = 3 3 0 \ \mathrm { k W }$$
$$\Delta h = 3 3 0 / 1 . 2 2 7 = 2 6 9 \ \mathrm { k J / k g } \qquad x _ { e q } = { \frac { 1 3 4 4 + 2 6 9 - 1 6 4 0 } { 9 7 0 } } = \mathbf { - 0 . 0 3 }$$
**The exit is within $3 \ \ \%$ of saturation: the channel still makes no net steam, but the margin has gone from about $1 0 0$ to $2 7 \ \mathrm { k J / k g }$ , a tenth of the enthalpy rise and comparable with the uncertainty in the hot-channel factors.** **More power and less flow move the hot channel towards DNB from both directions at once; in real cores the margin is protected by flow, by mixing-vane grids and by flattening the power distribution.**
:::
:::

::: exercise Cooling through the film {#ex-quench level=4 check="99"}
For the $2 0 \ \mathrm { mm }$ sphere of the quenching example, estimate the time to cool from $8 0 0$ to $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ by lumped capacitance, taking the film-boiling coefficient as $h = 1 6 9 \, ( 7 0 0 / \Delta T _ { e } ) ^ { 1 / 4 } \ \mathrm { W / m ^ { 2 } K }$ and neglecting radiation ($\rho = 7 8 0 0 \ \mathrm { k g / m ^ { 3 } }$ , $c _ { p } = 6 0 0 \ \mathrm { J / k g \, K }$ ). (Enter the time in seconds.)
::: solution
**Energy balance with $V / A = D / 6$ and $\theta = \Delta T _ { e }$ :**
$$\rho c _ { p } { \frac { D } { 6 } } { \frac { \mathrm { d } \theta } { \mathrm { d } t } } = - h \theta = - C \theta ^ { 3 / 4 } \ , \qquad C = h _ { 0 } \theta _ { 0 } ^ { 1 / 4 } = 1 6 9 \times 7 0 0 ^ { 1 / 4 } = 8 6 9$$
$$t = { \frac { 4 \rho c _ { p } D / 6 } { C } } \left( \theta _ { 0 } ^ { 1 / 4 } - \theta _ { 1 } ^ { 1 / 4 } \right) = { \frac { 4 \times 7 8 0 0 \times 6 0 0 \times 0 . 0 0 3 3 3 } { 8 6 9 } } \left( 7 0 0 ^ { 1 / 4 } - 2 0 0 ^ { 1 / 4 } \right) = 7 1 . 8 \times 1 . 3 8 1 = \mathbf { 9 9 \ s }$$
**A constant coefficient of $1 6 9$ would have given $\tau \ln ( 7 0 0 / 2 0 0 ) = 1 1 6 \ \mathrm { s }$ , only $1 7 \ \ \%$ longer, because the $\Delta T ^ { - 1 / 4 }$ dependence is weak — the film-boiling regime is nearly exponential in its cooling.** **Add radiation ($h _ { r } \approx 8 5$ at the top of the range, falling to about $2 0$ at $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ ) and the time shortens appreciably; the lumped assumption itself is sound, since $\mathrm { Bi } = h ( D / 6 ) / k \approx 0 . 0 2$ for steel.** **What matters for the metallurgy is not the total but the last few seconds, when the film collapses and the part passes through the nucleate-boiling regime at a coefficient of $3 0 \, 0 0 0$ — the thermal shock that cracks the part is generated in the transition, not in the film.**
:::
:::

::: proof Nusselt's horizontal tube {#derivation-nusselt-tube}
Starting from the vertical-plate film analysis, obtain $\overline { { h } } _ { D } = 0 . 7 2 9 \left[ g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) k _ { l } ^ { 3 } h _ { f g } ^ { \prime } / ( \mu _ { l } D \Delta T ) \right] ^ { 1 / 4 }$ for a horizontal tube of diameter $D$ — that is, work out where the constant comes from, and why the tube beats a vertical wall.
::: solution
**Take $\phi$ from the top of the tube, $R = D / 2$ , and let the film drain around the circumference under the tangential component of gravity, $g \sin \phi$ .** The film flow per unit length and the condensation balance are, with $A = \rho _ { l } ( \rho _ { l } - \rho _ { v } ) g / ( 3 \mu _ { l } )$ and $B = k _ { l } \Delta T / h _ { f g } ^ { \prime }$ ,
$$\Gamma ( \phi ) = A \sin \phi \, \delta ^ { 3 } \qquad { \frac { \mathrm { d } \Gamma } { \mathrm { d } \phi } } = { \frac { R B } { \delta } }$$
**Writing $F = \sin \phi \, \delta ^ { 3 }$ , the second equation becomes $F ^ { 1 / 3 } \mathrm { d } F = ( R B / A ) \sin ^ { 1 / 3 } \phi \, \mathrm { d } \phi$ , which integrates from $F ( 0 ) = 0$ to**
$$\delta ( \phi ) = \left( { \frac { 4 R B } { 3 A } } \right) ^ { 1 / 4 } { \frac { I ( \phi ) ^ { 1 / 4 } } { \sin ^ { 1 / 3 } \phi } } \qquad I ( \phi ) = \int _ { 0 } ^ { \phi } \sin ^ { 1 / 3 } \phi ^ { \prime } \, \mathrm { d } \phi ^ { \prime }$$
**The average coefficient is the circumferential mean of $k _ { l } / \delta$ , and the integrand is an exact derivative, $\sin ^ { 1 / 3 } \phi \, I ^ { - 1 / 4 } = \tfrac { 4 } { 3 } \, \mathrm { d } I ^ { 3 / 4 } / \mathrm { d } \phi$ :**
$${ \overline { { h } } } _ { D } = { \frac { 1 } { \pi } } \int _ { 0 } ^ { \pi } { \frac { k _ { l } } { \delta } } \, \mathrm { d } \phi = k _ { l } \left( { \frac { 3 A } { 4 R B } } \right) ^ { 1 / 4 } { \frac { 4 } { 3 \pi } } \, I ( \pi ) ^ { 3 / 4 } \qquad I ( \pi ) = 2 . 5 8 7$$
**Substituting $A$ , $B$ and $R = D / 2$ gives $3 A / ( 4 R B ) = g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) h _ { f g } ^ { \prime } / ( 2 \mu _ { l } k _ { l } \Delta T D )$ , so**
$$\overline { { h } } _ { D } = { \frac { 4 \times 2 . 5 8 7 ^ { 3 / 4 } } { 3 \pi \times 2 ^ { 1 / 4 } } } \left[ { \frac { g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) k _ { l } ^ { 3 } h _ { f g } ^ { \prime } } { \mu _ { l } D \Delta T } } \right] ^ { 1 / 4 } = 0 . 7 2 8 \left[ \cdots \right] ^ { 1 / 4 }$$
**— Nusselt's $0 . 7 2 8$ , usually quoted as $0 . 7 2 9$ .** **The constant is smaller than $0 . 9 4 3$ , but the length inside the fourth root is now the diameter: compared with a vertical wall of height $L$ , a tube gives $( 0 . 7 2 9 / 0 . 9 4 3 ) ( L / D ) ^ { 1 / 4 }$ times the coefficient — about twice, for a $2 5 \ \mathrm { mm }$ tube against a $1 \ \mathrm { m }$ wall. The film on a tube never gets tall, so it never gets thick, which is why industrial condensers use horizontal tubes.**
:::
:::

::: proof Why the critical heat flux vanishes at the critical point {#derivation-chf-critical}
Near the critical point $\sigma \propto ( 1 - T / T _ { c } ) ^ { 1 . 2 6 }$ , $h _ { f g } \propto ( 1 - T / T _ { c } ) ^ { 0 . 3 8 }$ and $\rho _ { l } - \rho _ { v } \propto ( 1 - T / T _ { c } ) ^ { 0 . 3 3 }$ . Use Zuber's expression, written as $q _ { \max } ^ { \prime \prime } = C h _ { f g } \sigma ^ { 1 / 4 } [ g ( \rho _ { l } - \rho _ { v } ) ] ^ { 1 / 4 } \rho _ { v } ^ { 1 / 2 }$ , to find the exponent of $( 1 - T / T _ { c } )$ in the critical heat flux, and explain why the same expression predicts a maximum at intermediate pressure rather than monotonic behaviour.
::: solution
**Collect exponents:**
$$q _ { \max } ^ { \prime \prime } \propto ( 1 - T / T _ { c } ) ^ { 0 . 3 8 } \times ( 1 - T / T _ { c } ) ^ { 1 . 2 6 / 4 } \times ( 1 - T / T _ { c } ) ^ { 0 . 3 3 / 4 } \times \rho _ { v } ^ { 1 / 2 } = ( 1 - T / T _ { c } ) ^ { 0 . 3 8 + 0 . 3 1 5 + 0 . 0 8 3 } \rho _ { v } ^ { 1 / 2 } = ( 1 - T / T _ { c } ) ^ { 0 . 7 8 } \rho _ { v } ^ { 1 / 2 }$$
**So $q _ { \max } ^ { \prime \prime } \to 0$ as the critical point is approached, as $( 1 - T / T _ { c } ) ^ { 0 . 7 8 }$ — measured behaviour is close to this.** **The maximum at intermediate pressure comes from the $\rho _ { v } ^ { 1 / 2 }$ factor, which is the only term that *grows* with pressure: at low pressure the vanishing vapor density starves the flux ($q \propto \rho _ { v } ^ { 1 / 2 } \sigma ^ { 1 / 4 } h _ { f g }$ , rising steeply as $\rho _ { v }$ appears), while near the critical point the vanishing surface tension and latent heat dominate and drag it to zero.** **The two effects balance near $0 . 2 5$ to $0 . 3 5$ of the critical pressure, which for water is $6$ to $8 \ \mathrm { M P a }$ — consistent with the $4 \ \mathrm { M W / m ^ { 2 } }$ peak near $7 \ \mathrm { M P a }$ in the worked table.**
:::
:::

## Where this lesson leads

- **[[heat-transfer/heat-exchangers|Heat exchangers]]** applies everything here: a condenser or evaporator is a surface whose coefficient comes from this lesson, and its design problem is that the two sides have coefficients differing by a factor of fifty, so the gas side or the condensing side decides everything.
- **[[heat-transfer/internal-convection|Forced convection in internal flow]]** supplies the $F$ term of the Chen flow-boiling correlation and the single-phase coefficient that boiling either adds to or replaces.
- **[[heat-transfer/natural-convection|Natural convection]]** is region I of the boiling curve and the mechanism that carries the heat when boiling stops — the reason a reactor core after a loss of forced circulation is still cooled, badly, by natural circulation.
- **[[thermodynamics/pure-substances|Pure substances]]** is where $h _ { f g }$ , quality and the saturation line come from; every number in this lesson is a property-table lookup, and the collapse of $h _ { f g }$ and $\sigma$ at the critical point is the thermodynamic fact behind the CHF peak.
- **[[materials-science/phase-transformations|Phase transformations]]** is the same nucleation problem with a solid instead of a vapor: undercooling plays the role of superheat, and the classical critical-radius derivation of this lesson reappears word for word.
- **[[heat-transfer/radiation|Thermal radiation]]** carries about a third of the heat in the film-boiling quench example, and an increasing share as the wall gets hotter; at red heat a film-boiling surface is as much a radiation problem as a convection one.

::: history How the boiling curve was measured
| Year | Event |
|:--|:--|
| 1756 | **J. G. Leidenfrost**, *De aquae communis nonnullis qualitatibus tractatus*, Duisburg — careful experiments on drops of water on a hot iron spoon, which survive far longer on a very hot surface than on a merely hot one. **The first systematic description of what is now called film boiling, made by a physician with no theory of heat to explain it.** |
| 1916 | **W. Nusselt**, "Die Oberflächenkondensation des Wasserdampfes", *Zeitschrift des Vereins deutscher Ingenieure* **60**, 541–546 and 569–575 — the laminar film-condensation analysis reproduced in this lesson, obtained by balancing a draining film against its own conduction. **The $0 . 9 4 3$ and $0 . 7 2 9$ are still the starting point of every condenser calculation.** |
| 1934 | **S. Nukiyama**, "The maximum and minimum values of the heat Q transmitted from metal to boiling water under atmospheric pressure", *Journal of the Japan Society of Mechanical Engineers* **37**, 367–374 (English translation: *Int. J. Heat Mass Transfer* **9**, 1419–1433, 1966) — the first boiling curve, measured on electrically heated wires in water, identifying the maximum (CHF) and the minimum heat flux. |
| 1950 | **L. A. Bromley**, "Heat transfer in stable film boiling", *Chemical Engineering Progress* **46**, 221–227 — the film-boiling correlation with the $h _ { f g } + 0 . 8 c _ { p , v } \Delta T$ superheat correction, and the rule for combining radiation with conduction across the film. |
| 1952 | **W. M. Rohsenow**, "A method of correlating heat-transfer data for surface boiling of liquids", *Trans. ASME* **74**, 969–976 — the nucleate-boiling correlation. **Its surface constant $C _ { s f }$ has been the most fitted, least trusted number in boiling heat transfer ever since.** |
| 1948–1952 | **S. S. Kutateladze** derives the critical-heat-flux group $\rho _ { v } h _ { f g } \left( \sigma g \Delta \rho / \rho _ { v } ^ { 2 } \right) ^ { 1 / 4 }$ from a hydrodynamic-stability and dimensional argument; the CHF expression is often called the Kutateladze–Zuber correlation. |
| 1959 | **N. Zuber**, *Hydrodynamic Aspects of Boiling Heat Transfer*, PhD thesis, UCLA (AEC Report AECU-4439) — the Rayleigh–Taylor/Helmholtz counter-flow model of the critical heat flux, giving $C = \pi / 2 4$ , and the companion estimate of the minimum heat flux. |
| 1966 | **J. C. Chen**, "Correlation for boiling heat transfer to saturated fluids in convective flow", *I&EC Process Design and Development* **5**, 322–329 — the two-factor (convective + nucleate) flow-boiling correlation. |
| 1960s–1980s | **Enhanced boiling surfaces** — sintered porous coatings and machined re-entrant tunnel surfaces — reach the market and raise nucleate-boiling coefficients several-fold; A. E. Bergles' reviews of heat-transfer augmentation chart the field. |
| 1990s–present | **Two-phase micro-channel and immersion cooling for electronics** (I. Mudawar and many others), and micro- and nano-structured surfaces that raise the critical heat flux by changing wetting and wicking. |
:::

::: summary
- **Phase change is strong because the resistance is a micrometre-thin film, not a boundary layer**: nucleate boiling reaches $1 0 ^ { 4 }$ to $1 0 ^ { 5 } \ \mathrm { W / m ^ { 2 } K }$ and condensation $5 0 0 0$ to $1 5 \, 0 0 0$ , and the real prize is a usable heat flux at $1 0 \ \mathrm { K }$ of driving difference.
- **Boiling needs nucleation sites.** The critical radius $r ^ { * } = 2 \sigma T _ { \mathrm { s a t } } v _ { l } / ( h _ { f g } \Delta T _ { e } )$ is $2 \ \mathrm { n m }$ at $1 0 \ \mathrm { K }$ of superheat and homogeneous nucleation would need some $2 0 0 \ \mathrm { K }$ : real boiling happens at scratches, and the surface chemistry is part of the design.
- **The boiling curve has a cliff.** $q \propto \Delta T _ { e } ^ { 3 }$ in nucleate boiling, a maximum at the CHF, then a collapse into film boiling, whose minimum heat flux is only about $2 \ \%$ of the CHF. Under imposed heat flux the jump past CHF is instantaneous and destructive; the design check is $q ^ { \prime \prime } / q _ { \max } ^ { \prime \prime } \leq 0 . 7$ , done locally.
- **Rohsenow gives the coefficient, Zuber gives the limit.** $q ^ { \prime \prime } = \mu _ { l } h _ { f g } [ g \Delta \rho / \sigma ] ^ { 1 / 2 } [ c _ { p , l } \Delta T _ { e } / ( C _ { s f } h _ { f g } \mathrm { P r } _ { l } ^ { s } ) ] ^ { 3 }$ with a surface constant that changes the answer by a factor of eight; $q _ { \max } ^ { \prime \prime } = 0 . 1 3 1 \, \rho _ { v } h _ { f g } [ \sigma g \Delta \rho / \rho _ { v } ^ { 2 } ] ^ { 1 / 4 }$ , which needs no surface data at all and gives $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ for water at $1 \ \mathrm { a t m }$ .
- **Pressure is the strongest lever on pool-boiling CHF** — roughly tripled between $1 \ \mathrm { a t m }$ and $3 \ \mathrm { M P a }$ , peaking near $0 . 3$ of the critical pressure and vanishing at the critical point as $( 1 - T / T _ { c } ) ^ { 0 . 7 8 }$ ; subcooling and forced flow raise it further.
- **Condensation is boiling turned inside out, and it gets worse as you drive it**: $\overline { { h } } _ { L } = 0 . 9 4 3 [ g \rho _ { l } \Delta \rho k _ { l } ^ { 3 } h _ { f g } ^ { \prime } / ( \mu _ { l } L \Delta T ) ] ^ { 1 / 4 } \propto \Delta T ^ { - 1 / 4 } L ^ { - 1 / 4 }$ . Horizontal tubes beat vertical walls because the film never grows tall; columns of tubes lose $N ^ { - 1 / 4 }$ to inundation; a few per cent of air costs half the coefficient.
- **Use $h _ { f g } ^ { \prime } = h _ { f g } + 0 . 8 c _ { p , v } \Delta T$** in every film calculation, and check the film Reynolds number before trusting Nusselt's laminar assumption.
- **Two-phase flow fails in two different ways**: DNB at high heat flux and low or negative quality, dryout at high quality. Know which map you are on before quoting a correlation, and never average a heat flux that has a hot channel.
:::

## Further reading

- **V. P. Skripov**, *Metastable Liquids* (Wiley, 1974) — the definitive account of superheated liquid, homogeneous nucleation and the spinodal; the physics behind the critical radius, with the measurements of the limit of superheat.
- **J. G. Collier & J. R. Thome**, *Convective Boiling and Condensation*, 3rd ed. (Oxford University Press, 1994) — the correlations, the flow-pattern maps and the dryout and DNB literature, with the honesty about uncertainty that this lesson can only summarise.
- **Incropera, DeWitt, Bergman & Lavine**, *Fundamentals of Heat and Mass Transfer*, ch. 10 — the tables of $C _ { s f }$ , the Zuber and Lienhard–Dhir CHF results, film boiling and film condensation, with worked examples.
- **J. C. Chen**, "Correlation for boiling heat transfer to saturated fluids in convective flow", *I&EC Proc. Des. Dev.* **5** (1966), 322 — the flow-boiling correlation, short and readable, with its two factors drawn as curves.
- **V. P. Carey**, *Liquid–Vapor Phase-Change Phenomena*, 2nd ed. (Taylor & Francis, 2008) — the physics of nucleation, boiling, condensation and two-phase flow, from interfacial thermodynamics up.
- **J. G. Leidenfrost**, "On the fixation of water in diverse fire", translated by **C. Wares**, *Int. J. Heat Mass Transfer* **9** (1966), 1153–1166 — the 1756 tract in English: careful experiment with no theory, by a physician.
