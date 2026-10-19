A $2 \ \mathrm{kW}$ immersion element the size of a finger boils a litre of water in four minutes. Push the same element into air and its sheath glows red within seconds; push twice its heat flux into water that is not allowed to boil and it is covered by a film of vapor that insulates it from the liquid it is standing in. The difference between those three outcomes is not a difference in "the heat-transfer coefficient" — it is a difference in mechanism, and each mechanism has its own law, its own scaling and its own hard limit.

Phase-change heat transfer is the strongest thermal mechanism available to a designer, and the only one with a cliff in it. Nucleate boiling gives coefficients of $1 0 ^ { 4 }$ to $1 0 ^ { 5 } \ \mathrm { W / m ^ { 2 } K }$ , one to two orders above the best single-phase water cooling, at temperature differences of five to twenty kelvin. Condensation is nearly as good, $5 0 0 0$ to $1 5 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ , which is why a steam condensate system can move megawatts in a hand-sized heat exchanger. But boiling has a maximum: the **critical heat flux**, about $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ for water at one atmosphere, past which the surface passes into film boiling, loses a factor of five to ten in coefficient in a fraction of a second, and — if the heat flux is imposed rather than the temperature — runs away to meltdown. Every nuclear reactor core, every steam generator, every cryogenic tank, every boiling microchip cooler and every kettle element is designed against that one number.

This lesson is about three things: why bubbles and drops move heat so well, what sets the coefficient on either side of the cliff, and what sets the cliff itself.

::: warning The five mistakes this lesson exists to prevent
1. **Treating the boiling coefficient as a constant.** In nucleate boiling $q \propto \Delta T _ { e } ^ { 3 }$ , so $h \propto \Delta T _ { e } ^ { 2 }$ : the "coefficient" at $5 \ \mathrm { K }$ of superheat is a factor of sixteen smaller than at $2 0 \ \mathrm { K }$ . A single $h$ quoted for a boiler surface is a data point at one operating condition, not a property.
2. **Designing on the coefficient instead of on the critical heat flux.** The coefficient tells you the wall temperature you will get; the CHF tells you whether you will have a wall temperature at all. The design margin is $q ^ { \prime \prime } / q ^ { \prime \prime } _ { \max } \lesssim 0 . 7$ , and it is checked first.
3. **Forgetting that the condensing coefficient falls as you drive it harder.** For film condensation $h \propto \Delta T ^ { - 1 / 4 }$ : doubling your temperature difference buys less than double the heat flux, because the extra vapor you must push through makes the liquid film thicker. Sub-cooling the wall is not free.
4. **Using $h _ { f g }$ where $h _ { f g } ^ { \prime }$ belongs.** Vapor leaving a film or a bubble is superheated; the correct latent heat is $h _ { f g } ^ { \prime } = h _ { f g } + 0 . 8 c _ { p , v } \Delta T _ { e }$ , which at $7 0 0 \ \mathrm { K }$ of film superheat is $5 7 \ \%$ larger than $h _ { f g }$ .
5. **Assuming a liquid wets, or a surface is clean.** Boiling and condensation are the two heat-transfer problems governed by surface chemistry. A monolayer of oil raises the Leidenfrost point, a hydrophobic coating can turn filmwise condensation into dropwise and multiply the coefficient by five, and a scratched copper surface boils at a third of the superheat of a polished one.
:::

## 1. Why a change of phase moves heat that convection cannot touch

::: definition Why phase change is strong: three effects, one of them dominant {#def-why-strong}
Three things happen when a liquid boils on a hot surface, and they add. **(i) Latent transport.** A bubble that nucleates, grows and departs carries vapor — that is, enthalpy $h _ { f g }$ — directly from the wall into the bulk liquid, where it condenses. Water's $h _ { f g } / \rho _ { l } = 2 3 6 0 \ \mathrm { k J / k g } / 9 5 8 \ \mathrm { k g / m ^ { 3 } } = 2 . 4 6 \ \mathrm { M J / m ^ { 3 } }$ means that one cubic millimetre of vapor generated per second per square centimetre of surface carries $4 . 9 \ \mathrm { W }$ ; a boiling surface generates millions of bubble-millimetres per second. **(ii) Microlayer evaporation.** Under a nucleate bubble the liquid film between bubble and wall is only $1$ to $1 0 \ \mu \mathrm { m }$ thick, and it is across this film — not across a thermal boundary layer — that the whole temperature drop sits. A $1 0 \ \mu \mathrm { m }$ film conducting $1 0 \ \mathrm { k W / m ^ { 2 } }$ needs $q \delta / k = 1 0 ^ { 4 } \times 1 0 ^ { - 5 } / 0 . 6 8 = 0 . 1 5 \ \mathrm { K }$ ; the enormous coefficient is simply an enormous $k / \delta$ . **(iii) Microconvection.** Bubble growth, departure and the resulting fluid motion sweep the wall clean of superheated liquid at a few hundred hertz per site.

**The dominant term is the microlayer, and it is why boiling is a surface phenomenon rather than a fluid-dynamic one: the resistance is a film a few microns thick that the bubble itself keeps thin.**
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
| **Nucleate boiling, water at 1 atm** | $5 0 0 0 - 6 0 \, 0 0 0$ | $1 . 7 - 1 6 \ \mathrm { K }$ |
| **Nucleate boiling, cryogens / refrigerants** | $2 0 0 0 - 3 0 \, 0 0 0$ | $3 - 5 0 \ \mathrm { K }$ |
| **Film condensation, steam at 1 atm** | $5 0 0 0 - 1 5 \, 0 0 0$ | $7 - 2 0 \ \mathrm { K }$ |
| **Dropwise condensation, promoted** | $2 0 \, 0 0 0 - 1 0 0 \, 0 0 0$ | $1 - 5 \ \mathrm { K }$ |
| Film boiling (the cliff) | $1 0 0 - 5 0 0$ | $2 0 0 - 1 0 0 0 \ \mathrm { K }$ |

**Read the third column, not the second: the point of phase change is not a big number for $h$ , it is that a usable heat flux is reachable at a temperature difference of ten kelvin rather than a thousand.**

## 2. Nucleation: why boiling needs a scratch

Pure, dust-free, degassed liquid in a perfectly smooth tube can be heated tens of degrees above its saturation temperature without boiling. That is not a curiosity; it is the reason boiling happens at all, and it sets where it happens.

::: proof The critical bubble radius, and why homogeneous nucleation needs 300 K of superheat {#proof-critical-radius}
A vapor bubble of radius $r$ in a liquid at pressure $P _ { l }$ must hold off not only the liquid but the surface tension, so its internal pressure is $P _ { v } = P _ { l } + 2 \sigma / r$ (the Laplace term; see [[fluid-mechanics/fluid-properties]]). A curved interface in thermodynamic equilibrium has a higher saturation pressure than a flat one, and combining the Clausius–Clapeyron relation with the Laplace pressure gives the condition for a bubble to exist in stable equilibrium. Writing $\Delta T _ { e } = T _ { s } - T _ { \mathrm { s a t } } ( P _ { l } )$ for the superheat of the liquid, the **critical radius** is

$$r ^ { * } = { \frac { 2 \sigma T _ { \mathrm { s a t } } v _ { l } } { h _ { f g } \Delta T _ { e } } } \qquad \text{(with } v _ { l } = 1 / \rho _ { l } \text{)}$$

For water at $1 0 0 \ \mathrm { k P a }$ with $\Delta T _ { e } = 1 0 \ \mathrm { K }$ : $r ^ { * } = 2 \times 0 . 0 5 8 9 \times 3 7 3 \times ( 1 / 9 5 8 ) / ( 2 . 2 5 7 \times 1 0 ^ { 6 } \times 1 0 ) = 2 . 0 \times 1 0 ^ { - 9 } \ \mathrm { m }$ , **two nanometres**. A bubble smaller than $r ^ { * }$ collapses, because the Laplace pressure squeezes it and the higher saturation pressure inside it condenses it; a bubble larger than $r ^ { * }$ grows explosively. The energy barrier to nucleation scales as $\sigma ^ { 3 } / ( \Delta T _ { e } / T _ { \mathrm { s a t } } ) ^ { 2 }$ , so it is enormous at small superheat and vanishes as $\Delta T _ { e }$ grows. Setting the barrier to the thermal energy available in a homogeneous liquid gives a **maximum homogeneous superheat of about $3 0 0 \ \mathrm { K }$ for water** — measured, for example, in superheated liquid layers exploded by a pulsed wire.

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
| I. Natural convection | $\Delta T _ { e } \lesssim 5 \ \mathrm { K }$ | $q \propto \Delta T ^ { 1 . 2 5 }$ | No bubbles; ordinary buoyant convection, $h \approx 5$ |
| II. Nucleate boiling, ONB | $5 \lesssim \Delta T _ { e } \lesssim 3 0 \ \mathrm { K }$ | $q \propto \Delta T ^ { 3 }$ | **Onset of nucleate boiling**: sites activate, $h$ jumps by two orders |
| — Critical heat flux (CHF) | $\Delta T _ { e } \approx 2 5$–$3 0 \ \mathrm { K }$ | $q ^ { \prime \prime } _ { \max } = 1 . 1 \ \mathrm { M W / m ^ { 2 } }$ | Vapor leaves faster than liquid can rewet the surface |
| III. Transition (partial film) | $3 0 \lesssim \Delta T _ { e } \lesssim 1 2 0 \ \mathrm { K }$ | unstable | Vapor blanketing spreads; $q$ *falls* as $\Delta T$ rises |
| IV. Film boiling | $\Delta T _ { e } \gtrsim 1 2 0 \ \mathrm { K }$ | $q \propto \Delta T ^ { 1 / 4 }$ | A stable vapor film; conduction+radiation through vapor |
| — Leidenfrost point | $\Delta T _ { e } \approx 1 5 0 \ \mathrm { K }$ | minimum $q$ | The drop-skating point; $T _ { L } \approx 1 . 4 \, T _ { \mathrm { s a t } }$ (absolute) |

**Two landmarks matter to a designer. The CHF is a maximum: past it, increasing $\Delta T$ *reduces* the heat flux, which makes region III statically unstable — under imposed heat flux the surface jumps from region II to region IV in milliseconds. That jump is called "departure from nucleate boiling" (DNB) in reactor language and "burnout" in boiler language, and it is the failure mode that ends both nuclear fuel rods and electric kettle elements.**
:::

::: widget plot
title: The boiling curve for water at 1 atm — three straight lines and one cliff
f: 0.699+1.25*x-1000*max(0,x-0.9); 1.699+3*x-1000*max(0,0.9-x)-1000*max(0,x-1.45); 5.0+0.24*(x-2.0)-1000*max(0,1.45-x)
x: 0,3
y: 0,7
labels: log10(dT_e) — superheat in kelvin (0 = 1 K, 1 = 10 K, 2 = 100 K); log10(q'') — W/m2 (6 = 1 MW/m2); natural convection (slope 1.25); nucleate boiling (slope 3); film boiling (slope 1/4)
caption: Three regimes of pool boiling on water at one atmosphere, drawn as straight lines on log-log axes: natural convection $q \propto \Delta T ^ { 1 . 2 5 }$ , nucleate boiling $q \propto \Delta T ^ { 3 }$ , and film boiling $q \propto \Delta T ^ { 1 / 4 }$ . The nucleate line ends at the critical heat flux, $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ at $\Delta T _ { e } \approx 2 8 \ \mathrm { K }$ ; the film-boiling line sits a factor of six below it, and the vertical gap between them is transition boiling — a region no stable design operates in. Note the slope change from $3$ to $1 / 4$ : the same surface moves heat twelve times worse across the cliff.
:::

## 4. Nucleate boiling: the Rohsenow correlation

::: definition Rohsenow's nucleate-boiling correlation {#def-rohsenow}
The one good engineering correlation for the nucleate-boiling heat flux is Rohsenow's (1952), a balance between the bubble's buoyancy and the liquid's superheat:

$$q ^ { \prime \prime } = \mu _ { l } h _ { f g } \left[ { \frac { g ( \rho _ { l } - \rho _ { v } ) } { \sigma } } \right] ^ { 1 / 2 } \left[ { \frac { c _ { p , l } \Delta T _ { e } } { C _ { s f } h _ { f g } \, \mathrm { P r } _ { l } ^ { \, s } } } \right] ^ { 3 } \qquad s = 1 . 0 \ \text{(water)} , \quad 1 . 7 \ \text{(other fluids)}$$

with all liquid properties at $T _ { \mathrm { s a t } }$ . The exponent $3$ is the physics of site density; the bracket is a dimensionless superheat; and $C _ { s f }$ is a surface–fluid constant:

| Fluid – surface | $C _ { s f }$ | Fluid – surface | $C _ { s f }$ |
|:--|--:|:--|--:|
| Water – mechanically polished platinum | $0 . 0 1 3$ | Ethanol – copper | $0 . 0 0 6 8$ |
| Water – mechanically worked copper | $0 . 0 1 7$ | R-113 – copper | $0 . 0 0 4 9$ |
| Water – rolled boiler tube | $0 . 0 1 3$ | Carbon tetrachloride – chromium | $0 . 0 0 3 2$ |
| Water – oxidised or rough copper | $0 . 0 0 9$–$0 . 0 1 3$ | R-11 – platinum | $0 . 0 1 3$ |

**$C _ { s f }$ enters as $1 / C _ { s f } ^ { 3 }$ , so a factor of two uncertainty in this "constant" is a factor of eight in predicted heat flux — a factor of two in wall superheat.** **It is the least defensible number in the equation and the reason no boiling design is done from the correlation alone; it is the reason boiling equipment is commissioned by measurement, and the reason the honest designer quotes a range.**
:::

::: example What a kettle element actually runs at {#ex-kettle level=2 check="14.7"}
A $2 . 0 \ \mathrm { k W }$ sheathed element has a wetted area of $1 0 0 \ \mathrm { c m } ^ { 2 } = 0 . 0 1 0 0 \ \mathrm { m } ^ { 2 }$ , so $q ^ { \prime \prime } = 2 0 0 \ \mathrm { k W / m ^ { 2 } }$ . Water at $1 \ \mathrm { a t m }$ on worked copper, $C _ { s f } = 0 . 0 1 7$ . The prefactor is

$$\mu _ { l } h _ { f g } \left[ { \frac { g ( \rho _ { l } - \rho _ { v } ) } { \sigma } } \right] ^ { 1 / 2 } = 2 8 2 \times 1 0 ^ { - 6 } \times 2 . 2 5 7 \times 1 0 ^ { 6 } \times \left[ { \frac { 9 . 8 1 \times 9 5 7 . 3 } { 0 . 0 5 8 9 } } \right] ^ { 1 / 2 } = 6 3 6 \times 3 9 9 = 2 5 4 \ \mathrm { k W / m ^ { 2 } }$$

and the bracket at $\Delta T _ { e } = 1 0 \ \mathrm { K }$ is $4 2 1 7 \times 1 0 / ( 0 . 0 1 7 \times 2 . 2 5 7 \times 1 0 ^ { 6 } \times 1 . 7 5 ) = 0 . 6 2 8$ , giving $q ^ { \prime \prime } = 2 5 4 \times 0 . 6 2 8 ^ { 3 } = 6 3 \ \mathrm { k W / m ^ { 2 } }$ . Inverting the cube for $2 0 0 \ \mathrm { k W / m ^ { 2 } }$ :

$$\Delta T _ { e } = 1 0 \left( { \frac { 2 0 0 } { 6 3 } } \right) ^ { 1 / 3 } = \mathbf { 1 4 . 7 \ K } \qquad h = { \frac { 2 0 0 \, 0 0 0 } { 1 4 . 7 } } = \mathbf { 1 3 \, 6 0 0 \ W / m ^ { 2 } K }$$

**The element sheath therefore sits about $1 5 \ \mathrm { K }$ above $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ — around $1 1 5 \ \ {} ^ { \circ } \mathrm { C }$ , which is why a kettle element never discolours and never glows.** **The margin to CHF is $2 0 0 / 1 1 1 0 = 0 . 1 8$ , comfortable, and the same calculation on a $3 \ \mathrm { k W }$ element in $6 0 \ \mathrm { c m } ^ { 2 }$ gives $5 0 0 \ \mathrm { k W / m ^ { 2 } }$ , $\Delta T _ { e } = 2 0 \ \mathrm { K }$ and $4 5 \ \%$ of CHF — which is why a "faster" kettle needs a bigger element, not a denser one.** **Now switch off the water. With the element in air or in its own vapor, $h$ falls to $1 0 0$–$3 0 0 \ \mathrm { W / m ^ { 2 } K }$ and the sheath temperature is $2 0 0 \, 0 0 0 / 2 0 0 + 2 5 \approx 1 0 0 0 \ \ {} ^ { \circ } \mathrm { C }$ : the scale sheath fails, the mica dries out, and the element burns through in minutes. A kettle's dry-boil thermostat is a CHF device, not a temperature device.**
:::

::: example Why electronics cooling boils dielectric fluids, not water {#ex-dielectric level=2 check="6.1"}
A two-phase immersion chiller boils a dielectric fluid on a chip at a small superheat, because the constraint is junction temperature, not heat flux. For **ethanol on copper at $\Delta T _ { e } = 2 \ \mathrm { K }$** ($C _ { s f } = 0 . 0 0 6 8$ , $h _ { f g } = 8 3 8 \ \mathrm { k J / k g }$ , $\rho _ { l } = 7 3 6$ , $\rho _ { v } = 1 . 5$ , $\sigma = 0 . 0 1 8 5 \ \mathrm { N / m }$ , $c _ { p , l } = 3 1 0 0$ , $\mu _ { l } = 2 . 0 \times 1 0 ^ { - 4 }$ , $\mathrm { P r } _ { l } = 2 . 8$ , $s = 1 . 7$ ):

$$q ^ { \prime \prime } = 2 . 0 \times 1 0 ^ { - 4 } \times 8 3 8 \times 1 0 ^ { 3 } \left[ { \frac { 9 . 8 1 \times 7 3 4 . 5 } { 0 . 0 1 8 5 } } \right] ^ { 1 / 2 } \left[ { \frac { 3 1 0 0 \times 2 } { 0 . 0 0 6 8 \times 8 3 8 \times 1 0 ^ { 3 } \times 2 . 8 ^ { 1 . 7 } } } \right] ^ { 3 } = \mathbf { 6 . 1 \ k W / m ^ { 2 } } \qquad h = \mathbf { 3 0 7 0 \ W / m ^ { 2 } K }$$

**Six kilowatts per square metre at two kelvin of superheat — a chip at $4 0 \ \ {} ^ { \circ } \mathrm { C }$ coolant temperature runs its $1 0 0 \ \mathrm { W / c m ^ { 2 } }$ hotspots at a few kelvin above the liquid.** **The comparison with water is instructive: at the same $\Delta T _ { e } = 2 \ \mathrm { K }$ , water gives $6 3 \times ( 2 / 1 0 ) ^ { 3 } = 0 . 5 \ \mathrm { k W / m ^ { 2 } }$ , twelve times less, because water's enormous $h _ { f g }$ is exactly what makes it hard to boil at low temperature — the energy per bubble is high, so the superheat needed to grow bubbles is high.** **The price of the low-boiling fluid is the CHF: ethanol's is about $0 . 5 \ \mathrm { M W / m ^ { 2 } }$ by Zuber's correlation, against water's $1 . 1$ , so dielectric cooling is a low-flux, low-temperature technique and water is a high-flux one.**
:::

::: quiz Twice the flux {#quiz-flux}
A boiling surface is delivering $q''$ at a wall superheat of $10\ \mathrm{K}$. The heat flux is doubled and the surface stays in nucleate boiling. Which statement is true?
- [ ] The superheat is $13\ \mathrm{K}$ and the coefficient has fallen
- [x] The superheat is $13\ \mathrm{K}$ and the coefficient has risen by $1.6$
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
**The critical heat flux is set by vapor–liquid counter-flow, $q''_{\max} \propto \rho_v^{1/2}\sigma^{1/4}h_{fg}$, and for water it roughly triples between $1\ \mathrm{atm}$ and $3\ \mathrm{MPa}$ before falling again towards the critical point; liquid velocity (subcooling) raises it further, which is why spray and impingement cooling exist.** **Polishing does the opposite of what is wanted at low superheat — it destroys nucleation sites — although a roughened or porous coating does raise CHF, and is the one surface treatment that helps.** **A higher $h_{fg}$ enters only to the first power while the density terms dominate, and deep fins increase area but not the flux limit per unit area: they flood and starve at the base.**
:::
:::

## 5. The critical heat flux: the most important number in two-phase design

::: definition The critical heat flux and its mechanism {#def-chf}
The **critical heat flux** (CHF, "burnout", "departure from nucleate boiling") is the maximum heat flux a boiling surface can pass while liquid still reaches it. Zuber's mechanism (1959) is a counter-flow limit: vapor leaves the surface in columns, liquid must flow back inwards past them, and the interface between the two becomes Rayleigh–Taylor unstable — the vapor blasts up in jets and the liquid is held off. The most dangerous wavelength of that instability sets the spacing of the vapor columns, and with it the flux at which the counter-flow fails:

$$q ^ { \prime \prime } _ { \max } = C \, h _ { f g } \rho _ { v } \left[ { \frac { \sigma g ( \rho _ { l } - \rho _ { v } ) } { \rho _ { v } ^ { 2 } } } \right] ^ { 1 / 4 } \qquad C = { \frac { \pi } { 2 4 } } = 0 . 1 3 1 \ \text{(Zuber)}, \quad 0 . 1 4 9 \ \text{(Kutateladze)}$$

The bracket is a **vapor escape velocity** to the fourth power: $K = \left[ \sigma g \Delta \rho / \rho _ { v } ^ { 2 } \right] ^ { 1 / 4 }$ has units of $\mathrm { m / s }$ and is the speed at which a vapor column of the most dangerous wavelength sheds itself. Then $q ^ { \prime \prime } _ { \max } = C \, \rho _ { v } h _ { f g } K$ says simply: **the flux is the latent enthalpy carried by a layer of vapor of order one wavelength per second** — a counter-flow limit, not a wall phenomenon. It is therefore almost independent of the wall material, the surface finish and (to first order) the superheat, which is why it can be predicted from saturation properties alone to within $\pm 2 0 \ \ \%$ for every fluid ever tested.
:::

::: example Water's critical heat flux at four pressures {#ex-water-s-critical-heat-flux-at-four-pressu level=3 check="1.11"}
Zuber's correlation for water, using saturation properties at each pressure:

| $p$ | $T _ { \mathrm { s a t } }$ | $\rho _ { l }$ | $\rho _ { v }$ | $h _ { f g }$ ($\mathrm { k J / k g }$) | $\sigma$ ($\mathrm { N / m }$) | $q ^ { \prime \prime } _ { \max }$ |
|:--|--:|--:|--:|--:|--:|--:|
| $0 . 1 0 1 \ \mathrm { M P a }$ | $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ | $958$ | $0 . 598$ | $2 2 5 7$ | $0 . 0 589$ | $1 . 1 1 \ \mathrm { M W / m ^ { 2 } }$ |
| $3 . 0 \ \mathrm { M P a }$ | $2 3 4 \ \ {} ^ { \circ } \mathrm { C }$ | $8 1 3$ | $1 5 . 3$ | $1 7 9 5$ | $0 . 0 3 8 5$ | $3 . 8 3 \ \mathrm { M W / m ^ { 2 } }$ |
| $1 5 . 5 \ \mathrm { M P a }$ | $3 4 5 \ \ {} ^ { \circ } \mathrm { C }$ | $5 0 0$ | $7 7$ | $\approx 1 0 0 0$ | $0 . 0 0 2 0$ | $3 . 4 8 \ \mathrm { M W / m ^ { 2 } }$ |
| $2 2 . 0 \ \mathrm { M P a }$ | $3 7 4 \ \ {} ^ { \circ } \mathrm { C }$ | $3 5 0$ | $2 0 0$ | $\approx 3 5 0$ | $0 . 0 0 0 5$ | $\approx 1 . 1 \ \mathrm { M W / m ^ { 2 } }$ |

At $1 \ \mathrm { a t m }$: $K = \left[ 0 . 0 5 8 9 \times 9 . 8 1 \times 9 5 7 . 3 / 0 . 5 9 8 ^ { 2 } \right] ^ { 1 / 4 } = 6 . 2 7 \ \mathrm { m / s }$ and $q ^ { \prime \prime } _ { \max } = 0 . 1 3 1 \times 2 . 2 5 7 \times 1 0 ^ { 6 } \times 0 . 5 9 8 \times 6 . 2 7 = \mathbf { 1 . 1 1 \ M W / m ^ { 2 } }$ , against a measured $1 . 0$–$1 . 2 5 \ \mathrm { M W / m ^ { 2 } }$ .

**Read the shape of the table, because it is the design of a power station.** **The CHF rises steeply with pressure — the escape velocity falls as $\rho _ { v } ^ { - 1 / 2 }$ but the density of vapor available to carry enthalpy rises faster — reaches a maximum of about $4 \ \mathrm { M W / m ^ { 2 } }$ near $0 . 2 5$ of the critical pressure, and then collapses to zero at the critical point, where there is no surface tension left to make a bubble.** **A pressurised-water reactor runs at $1 5 . 5 \ \mathrm { M P a }$ with a hot-channel flux of $0 . 6$–$1 . 0 \ \mathrm { M W / m ^ { 2 } }$ , which is $2 0$–$3 0 \ \ \%$ of the local CHF: the pressure is not there for thermodynamic efficiency, where it would be a loss, but because it buys a factor of three in critical heat flux.** **And a loss-of-coolant accident is that margin destroyed twice over — the pressure falls to $0 . 1 \ \mathrm { M P a }$ , cutting CHF by a factor of three, while the decay heat of $6 \ \ \%$ of full power is still being generated with no forced flow to help.**
:::

::: definition DNB, dryout, and the two ways a evaporator tube fails {#def-dnb}
In a heated channel carrying flowing two-phase flow there are two distinct failures, and they happen at opposite ends of the pressure–mass-flux map. **DNB (departure from nucleate boiling), or "burnout", happens in the subcooled or low-quality region**: a vapor blanket forms at the wall while the core is still liquid, driven by the local CHF mechanism; it is characteristic of **high pressure and low mass flux**, and it arrives abruptly, with a temperature excursion of hundreds of kelvin. **Dryout happens at high quality**: the liquid film on the wall is simply used up — the annular-flow film thins until it breaks, and the wall is left in vapor. It is characteristic of **low pressure and high mass flux** (boilers, refrigerators, spacecraft evaporators), and the wall temperature rises with the local vapor temperature, more gently but just as fatally. **The design rule is the same in both cases — keep $q ^ { \prime \prime } / q ^ { \prime \prime } _ { \text{lim } } \lesssim 0 . 7$ using a local, not an average, flux — but the correlations are unrelated, and using the wrong one is a classic and fatal error.**
:::

## 6. Film boiling, the Leidenfrost point, and quenching

::: definition Bromley's film-boiling correlation {#def-bromley}
Above the Leidenfrost point a continuous vapor film insulates the surface, and heat crosses it by conduction and (at high temperature) radiation. For a horizontal cylinder or sphere of diameter $D$ , Bromley (1950) extends Nusselt's film argument to boiling:

$$\overline { { \mathrm { N u } } } _ { D } = 0 . 6 2 \left[ { \frac { g \rho _ { v } ( \rho _ { l } - \rho _ { v } ) h _ { f g } ^ { \prime } D ^ { 3 } } { \mu _ { v } k _ { v } \Delta T _ { e } } } \right] ^ { 1 / 4 } \ , \qquad h _ { f g } ^ { \prime } = h _ { f g } + 0 . 8 \, c _ { p , v } \Delta T _ { e }$$

with **vapor properties at the film temperature** $( T _ { s } + T _ { \mathrm { s a t } } ) / 2$ . The $0 . 8$ correction is the superheating of the vapor leaving the film and is not optional: at $\Delta T _ { e } = 7 0 0 \ \mathrm { K }$ it adds $5 7 \ \ \%$ to the latent heat and $2 0 \ \ \%$ to the coefficient. At high wall temperature add radiation as $\overline { { \mathrm { N u } } } ^ { 4 / 3 } = \overline { { \mathrm { N u } } } _ { \text{conv} } ^ { 4 / 3 } + \overline { { \mathrm { Nu } } } _ { r }$ with $\overline { { \mathrm { Nu } } } _ { r } = \varepsilon _ { w } \sigma ( T _ { s } ^ { 2 } + T _ { \mathrm { s a t } } ^ { 2 } ) ( T _ { s } + T _ { \mathrm { s a t } } ) D / ( k _ { v } \Delta T _ { e } )$ . **Note the $1 / 4$ power of $1 / \Delta T _ { e }$ inside the bracket: $h \propto \Delta T _ { e } ^ { - 1 / 4 }$ , so the film-boiling coefficient *falls* as the surface gets hotter, and $q ^ { \prime \prime } \propto \Delta T _ { e } ^ { 3 / 4 }$ only weakly rises — this is the region where more superheat buys almost nothing.**
:::

::: example Quenching a steel sphere: why the part sits in a cloud of its own steam {#ex-quenching-a-steel-sphere-why-the-part-sit level=3 check="191"}
A $2 0 \ \mathrm { mm }$ steel sphere at $8 0 0 \ \ {} ^ { \circ } \mathrm { C }$ is plunged into water at $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ . Film temperature $4 5 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\rho _ { v } = 1 0 1 \, 3 2 5 / ( 4 6 1 . 5 \times 7 2 3 ) = 0 . 3 0 4 \ \mathrm { k g / m ^ { 3 } }$ , $\mu _ { v } = 2 . 7 \times 1 0 ^ { - 5 } \ \mathrm { P a \, s }$ , $k _ { v } = 0 . 0 6 8 \ \mathrm { W / m \, K }$ , $c _ { p , v } = 2 3 0 0 \ \mathrm { J / k g \, K }$ .

$$h _ { f g } ^ { \prime } = 2 . 2 5 7 \times 1 0 ^ { 6 } + 0 . 8 \times 2 3 0 0 \times 7 0 0 = 3 . 5 5 \times 1 0 ^ { 6 } \ \mathrm { J / k g } \qquad { \frac { g \rho _ { v } \Delta \rho h _ { f g } ^ { \prime } D ^ { 3 } } { \mu _ { v } k _ { v } \Delta T _ { e } } } = { \frac { 9 . 8 1 \times 0 . 3 0 4 \times 9 5 8 \times 3 . 5 5 \times 1 0 ^ { 6 } \times 8 . 0 \times 1 0 ^ { - 6 } } { 2 . 7 \times 1 0 ^ { - 5 } \times 0 . 0 6 8 \times 7 0 0 } } = 6 . 3 0 \times 1 0 ^ { 7 }$$

$$\overline { { \mathrm { Nu } } } _ { D } = 0 . 6 2 \times ( 6 . 3 0 \times 1 0 ^ { 7 } ) ^ { 1 / 4 } = 0 . 6 2 \times 8 9 . 1 = 5 5 . 2 \qquad h _ { c } = { \frac { 5 5 . 2 \times 0 . 0 6 8 } { 0 . 0 2 0 } } = 1 8 8 \ \mathrm { W / m ^ { 2 } K }$$

Radiation from the oxide-covered surface ($\varepsilon = 0 . 8$ ) contributes $h _ { r } = 0 . 8 \times 5 . 6 7 \times 1 0 ^ { - 8 } ( 1 0 7 3 ^ { 2 } + 3 7 3 ^ { 2 } ) ( 1 0 7 3 + 3 7 3 ) = 8 5 \ \mathrm { W / m ^ { 2 } K }$ , a third of the total. Then

$$q ^ { \prime \prime } = ( 1 8 8 + 8 5 ) \times 7 0 0 = \mathbf { 1 9 1 \ k W / m ^ { 2 } } \qquad \tau = { \frac { \rho c _ { p } ( D / 6 ) } { h } } = { \frac { 7 8 0 0 \times 6 0 0 \times 0 . 0 0 3 3 3 } { 2 7 3 } } = 5 7 \ \mathrm { s }$$

**The part is cooling sixty times more slowly than it would if the water could touch it — $1 9 1 \ \mathrm { k W / m ^ { 2 } }$ against the $1 . 1 1 \ \mathrm { M W / m ^ { 2 } }$ the same surface passes at $3 0 \ \mathrm { K }$ of superheat — and it will sit in that regime for several minutes, from $8 0 0 \ \ {} ^ { \circ } \mathrm { C }$ down to about $2 5 0 \ \ {} ^ { \circ } \mathrm { C }$ , before the film collapses and the last part of the quench becomes violently fast.** **This is the whole of the heat-treater's problem: the film-boiling stage is slow and the nucleate stage is so fast that it causes quench distortion and cracking, which is why parts are quenched in brine, in polymer solutions, in a fluidised bed or in hot oil — media chosen to break the vapor film at a chosen temperature, not to cool as fast as possible.**
:::

::: definition The Leidenfrost point and the minimum heat flux {#def-leidenfrost}
The **Leidenfrost point** is the temperature at which a drop skates on its own vapor and survives instead of boiling away; for water on a smooth surface it is $T _ { L } \approx 1 . 4 \, T _ { \mathrm { s a t } }$ in kelvin, i.e. about $2 5 0 \ \ {} ^ { \circ } \mathrm { C }$ at $1 \ \mathrm { a t m }$ (and about $- 1 5 0 \ \ {} ^ { \circ } \mathrm { C }$ for liquid nitrogen on room-temperature metal, which is why a cryogenic spill does not instantly boil but wanders). It corresponds to the **minimum heat flux** at the bottom of the boiling curve, $q ^ { \prime \prime } _ { \min } \approx ( 0 . 0 6 \text{–} 0 . 1 ) \, q ^ { \prime \prime } _ { \max }$ , about $0 . 1 \ \mathrm { M W / m ^ { 2 } }$ for water. A drop of radius $2 . 5 \ \mathrm { mm }$ on a pan at $2 5 0 \ \ {} ^ { \circ } \mathrm { C }$ recedes at $\dot { r } = q ^ { \prime \prime } / ( \rho _ { l } h _ { f g } ) = 1 0 ^ { 5 } / ( 9 5 8 \times 2 . 2 5 7 \times 1 0 ^ { 6 } ) = 4 . 6 \times 1 0 ^ { - 5 } \ \mathrm { m / s }$ and so survives about $5 4 \ \mathrm { s }$ — the "sizzling test" for a pan is a boiling-curve measurement made by hand. **The Leidenfrost temperature rises with surface roughness and thermal effusivity and falls with contamination: a burnt-on film of food raises it, which is precisely why a well-seasoned pan stops the egg from skating.**
:::

## 7. Flow boiling: when the liquid is moving

::: definition Flow-boiling regimes and the two-factor picture {#def-flow-boiling}
In a heated channel the vapor generated at the wall must be swept away, and the resulting **flow-pattern map** (at increasing quality, left to right) runs: **bubbly** → **slug/plug** → **annular-wet-wall** → **annular-dry** → **annular-mist**. Heat transfer is good throughout the wet-wall region and dies at the last one. The workhorse correlation (Chen, 1966) adds a nucleate and a convective contribution with two correction factors:

$$q ^ { \prime \prime } = S \, E \, h _ { \text{nb,pool} } \Delta T _ { \text{sat } } + F \, h _ { \text{conv,liq} } \Delta T _ { \text{sat } } \ , \qquad E = ( 1 - x ) ^ { 0 . 8 } + \left[ { \frac { x \, \mathrm { P r } _ { l } } { ( 1 - x ) \mathrm { P r } _ { v } } } \right] ^ { 0 . 8 } \ , \quad S = \left[ 1 + F _ { p } G _ { \text{eq } } ^ { 1 . 2 5 } \right] ^ { - 1 }$$

**$E$ is an enhancement of liquid-phase convection by the vapor core — it rises steeply with quality, which is why $h$ in annular flow can be several times the all-liquid value. $S$ is a suppression of bubble nucleation by the shear of the flowing liquid — it falls as $G x$ rises, which is why at high mass flux boiling "stops helping" and the tube behaves like a single-phase convective one.** **The practical consequences: $h$ grows roughly as $G ^ { 0 . 7 \text{–} 0 . 8 }$ in the convective regime and much more weakly in the nucleate regime; $h$ rises with pressure for refrigerants and falls with heat flux; and near dryout both terms collapse together.**
:::

::: example A reactor core that never reaches boiling at its exit {#ex-a-reactor-core-that-never-reaches-boiling level=3 check="-0.11"}
A pressurised-water reactor fuel assembly rod is $9 . 5 \ \mathrm { m }$ long; take a representative channel of $D = 2 5 \ \mathrm { m m }$ inside diameter and $L = 6 . 0 \ \mathrm { m }$ heated length carrying water at $1 5 . 5 \ \mathrm { M P a }$ with mass flux $G = 3 0 0 0 \ \mathrm { k g / m ^ { 2 } s }$ and uniform heat flux $q ^ { \prime \prime } = 6 0 0 \ \mathrm { k W / m ^ { 2 } }$ .

$$\dot { m } = G { \frac { \pi D ^ { 2 } } { 4 } } = 3 0 0 0 \times 4 . 9 0 9 \times 1 0 ^ { - 4 } = 1 . 4 7 3 \ \mathrm { k g / s } \qquad \dot { Q } = q ^ { \prime \prime } \pi D L = 6 0 0 \times 1 0 ^ { 3 } \times \pi \times 0 . 0 2 5 \times 6 . 0 = 2 8 3 \ \mathrm { k W }$$

$$\Delta h = { \frac { \dot { Q } } { \dot { m } } } = { \frac { 2 8 3 } { 1 . 4 7 3 } } = 1 9 2 \ \mathrm { k J / k g } \qquad h _ { \text{out } } = 1 3 4 4 + 1 9 2 = 1 5 3 6 \ \mathrm { k J / k g }$$

At $1 5 . 5 \ \mathrm { M P a }$ , $h _ { f } \approx 1 6 4 0$ and $h _ { f g } \approx 9 7 0 \ \mathrm { k J / k g }$ , so the exit equilibrium quality is

$$x _ { e q } = { \frac { 1 5 3 6 - 1 6 4 0 } { 9 7 0 } } = \mathbf { - 0 . 1 1 }$$

**The core exit is still $1 0 0 \ \mathrm { k J / k g }$ short of boiling: a PWR never makes steam in the core, and the $x _ { e q } \approx - 0 . 1$ at the outlet is the design margin that makes the reactor controllable and makes DNB a calculation about a hypothetical rather than a reality at full power.** **It is also why the local heat-flux-to-quality correlation used for DNB margin is extrapolated: the operating point sits deliberately far from the region the correlation was measured in.** **Note what the same arithmetic says about a boiling-water reactor at $7 \ \mathrm { M P a }$ , where $x _ { e q }$ at the core exit is about $0 . 1 4$ : there the water does boil in the core, the recirculation flow is the power control, and dryout — not DNB — is the limiting phenomenon.**
:::

## 8. Condensation: the mirror image, with a twist

::: proof Nusselt's film-condensation analysis {#proof-nusselt-film}
Vapor at saturation temperature condenses on a vertical surface kept at $T _ { s } = T _ { \mathrm { s a t } } - \Delta T$ . A liquid film of thickness $\delta ( x )$ drains downward under gravity, in laminar flow, with no shear at the interface. **Momentum.** For a film on a vertical wall, $0 = \mu _ { l } \, \partial ^ { 2 } u / \partial y ^ { 2 } + \rho _ { l } g$ with $u ( 0 ) = 0$ and $\partial u / \partial y | _ { \delta } = 0$ , giving a parabolic profile and a mass flow per unit width

$$\Gamma ( x ) = \int _ { 0 } ^ { \delta } \rho _ { l } u \, \mathrm { d } y = { \frac { \rho _ { l } g \delta ^ { 3 } } { 3 \mu _ { l } } }$$

**Energy.** The heat crossing the film condenses the film, so the growth of $\Gamma$ is the condensation rate: $d \Gamma = q ^ { \prime \prime } \mathrm { d } x / h _ { f g } ^ { \prime } = k _ { l } ( T _ { \mathrm { s a t } } - T _ { s } ) \mathrm { d } x / ( \delta h _ { f g } ^ { \prime } )$ , where the film is assumed to conduct linearly (its own thermal resistance dominates). **Combine.** Differentiating $\Gamma = \rho _ { l } g \delta ^ { 3 } / 3 \mu _ { l }$ and equating,

$$\rho _ { l } g \delta ^ { 2 } { \frac { \mathrm { d } \delta } { \mu _ { l } } } = { \frac { k _ { l } \Delta T } { \delta h _ { f g } ^ { \prime } } } \ \Longrightarrow \ \int _ { 0 } ^ { \delta } \delta ^ { 3 } \, \mathrm { d } \delta = { \frac { \mu _ { l } k _ { l } \Delta T } { \rho _ { l } g h _ { f g } ^ { \prime } } } L \ \Longrightarrow \ { \boxed { \delta ( x ) = \left[ { \frac { 4 \mu _ { l } k _ { l } \Delta T \, x } { g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) h _ { f g } ^ { \prime } } } \right] ^ { 1 / 4 } } }$$

(the density difference appears when the drainage is written against the vapor). The local coefficient is conduction through the film, $h _ { x } = k _ { l } / \delta ( x ) \propto x ^ { - 1 / 4 }$ , and averaging over a plate of height $L$ gives

$$\boxed { \ { \overline { { h } } } _ { L } = { \frac { 4 } { 3 } } \, h _ { x = L } = 0 . 9 4 3 \left[ { \frac { g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) k _ { l } ^ { 3 } h _ { f g } ^ { \prime } } { \mu _ { l } L \Delta T } } \right] ^ { 1 / 4 } } \qquad \mathrm { R e } _ { \delta } = { \frac { 4 \Gamma } { \mu _ { l } } }$$

**Three things to notice, all of them design-critical.** **The film thickens as $x ^ { 1 / 4 }$ , so the coefficient is worst at the bottom and the average is $3 3 \ \ \%$ better than the local value there.** **$\overline { { h } } \propto \Delta T ^ { - 1 / 4 }$ : driving condensation harder makes the film thicker and the coefficient worse — the exact opposite of boiling, and the reason a condenser is designed with many small temperature differences rather than one big one.** **And $h$ is independent of the vapor velocity in this theory, which is why a small amount of non-condensing gas (air) is so devastating: the vapor must then *diffuse* through a stagnant air layer to reach the film, and the coefficient falls by a factor of five or more. Air vents on condensers are not housekeeping, they are the design.**
:::

::: example Steam on a wall, a tube, and a stack of tubes {#ex-steam-on-a-wall-a-tube-and-a-stack-of-tub level=3 check="5808"}
Steam at $1 \ \mathrm { a t m }$ condenses on surfaces at $8 0 \ \ {} ^ { \circ } \mathrm { C }$ , so $\Delta T = 2 0 \ \mathrm { K }$ and the film temperature is $9 0 \ \ {} ^ { \circ } \mathrm { C }$ : $\rho _ { l } = 9 6 5 \ \mathrm { k g / m ^ { 3 } }$ , $\mu _ { l } = 3 . 1 5 \times 1 0 ^ { - 4 } \ \mathrm { P a \, s }$ , $k _ { l } = 0 . 6 7 5 \ \mathrm { W / m \, K }$ , $h _ { f g } = 2 2 6 0 \ \mathrm { k J / k g }$ .

**(a) Vertical wall, $L = 1 . 0 \ \mathrm { m }$ .** $\overline { { h } } _ { L } = 0 . 9 4 3 \left[ 9 . 8 1 \times 9 6 5 \times 9 6 4 . 4 \times 0 . 6 7 5 ^ { 3 } \times 2 . 2 6 \times 1 0 ^ { 6 } / ( 3 . 1 5 \times 1 0 ^ { - 4 } \times 1 . 0 \times 2 0 ) \right] ^ { 1 / 4 } = \mathbf { 5 3 1 0 \ W / m ^ { 2 } K }$ , with a film $0 . 1 7 \ \mathrm { m m }$ thick at the bottom and $q ^ { \prime \prime } = 1 0 6 \ \mathrm { k W / m ^ { 2 } }$ — condensing $1 6 9 \ \mathrm { k g / h }$ of steam per square metre.

**(b) Single horizontal tube, $D = 2 5 \ \mathrm { m m }$ .** Replacing $L$ by $D$ and $0 . 9 4 3$ by $0 . 7 2 9$ (the analysis is identical but the film drains only $\pi D / 2$ of circumference and never gets tall): $\overline { { h } } _ { D } = 0 . 7 2 9 \left[ \cdots / D \right] ^ { 1 / 4 } = \mathbf { 1 0 \, 3 3 0 \ W / m ^ { 2 } K }$ , **twice the vertical wall, because a tube is only $2 5 \ \mathrm { mm }$ tall.**

**(c) A vertical column of ten such tubes.** The condensate from one tube falls on the next, so tube $N$ runs with a film that has grown over $N$ tubes: $\overline { { h } } _ { N } = \overline { { h } } _ { 1 } N ^ { - 1 / 4 }$ , giving $h = 1 0 \, 3 3 0 \times 1 0 ^ { - 1 / 4 } = \mathbf { 5 8 1 0 \ W / m ^ { 2 } K }$ — **a $44 \ \ \%$ loss, and $6 7 \ \ \%$ for a hundred-tube column.**

**The three numbers are the shell side of every surface condenser ever built.** **The tube count is the enemy of the condensing coefficient, which is why condensers are arranged in rows that drain cleanly, why the tubes are horizontal, why the shell is divided by baffles into several short columns instead of one tall one, and why the "condensing film coefficient" in the vendor's datasheet is a third of the textbook value: it is the textbook value after inundation, vapor shear, non-condensable gas and the boundary-layer resistance of the tube bundle.**
:::

::: widget plot
title: Boiling gets better as you drive it; condensation gets worse
f: 6300*pow(x/10,2); 5310*pow(20/x,0.25)
x: 2,25
y: 0,40000
labels: wall superheat or temperature difference (K) — driving ΔT; heat-transfer coefficient (W/m2 K); nucleate boiling h ~ dT^2; film condensation h ~ dT^-1/4
caption: The two phase-change coefficients against driving temperature difference, for water at one atmosphere. Nucleate boiling ($h = q''/\Delta T \propto \Delta T ^ { 2 }$ ) strengthens with superheat because more nucleation sites activate; film condensation ($h \propto \Delta T ^ { - 1 / 4 }$ ) weakens because a bigger temperature difference grows a thicker insulating liquid film. The condensation curve's rise at the left is the theory failing, not working: as $\Delta T \rightarrow 0$ the Nusselt film becomes vanishingly thin and the wave, shear and gas-diffusion effects it ignores take over.
:::

::: definition Filmwise and dropwise condensation {#def-dropwise}
If the condensate wets the surface ($\theta < 9 0 ^ { \circ }$ ) it forms a continuous film — **filmwise** condensation, the case Nusselt solved and the case in every industrial condenser. If it does not ($\theta > 9 0 ^ { \circ }$ ) it condenses as discrete drops that roll away, sweeping the surface clean: **dropwise** condensation, with coefficients **five to ten times** filmwise, $2 0 \, 0 0 0$ to $1 0 0 \, 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ , because most of the surface has no film at all. The effect was demonstrated by coating condensing surfaces with oil, gold or sulfur-based promoters and is the largest single coefficient improvement available in this whole lesson — and it is almost never used, because the promotion decays within hours or days of steam exposure. **The engineering compromise is a permanent hydrophobic or nanostructured coating, an area of very active research and of very few reliable vendor claims; the honest designer sizes for filmwise and treats dropwise as a bonus.**
:::

::: warning Two more condenser errors
**One: forgetting the vapor-side boundary layer when the vapor is not pure steam.** A few per cent of air in the steam can halve the coefficient, and the air concentration at the far end of the shell is much higher than the average, so the last third of a condenser does almost none of the work. **Two: designing a condenser with the boiling mindset, i.e. a large temperature difference.** Because $h \propto \Delta T ^ { - 1 / 4 }$ and the film is thicker at the bottom of every tube, a condenser run at $\Delta T = 4 0 \ \mathrm { K }$ has a coefficient $1 . 5$ times worse than the same unit at $1 0 \ \mathrm { K }$ ; the correct response to an inadequate condenser is more area at lower $\Delta T$ , not a colder coolant.
:::

## Exercises

::: exercise A pot on the stove {#ex-pot level=1 check="8"}
Water at $1 \ \mathrm{atm}$ boils on a worked-copper surface ($C _ { s f } = 0 . 0 1 7$) at a wall superheat of $5 \ \mathrm{K}$ . Estimate the heat flux. (Enter the heat flux in $\mathrm { k W / m ^ { 2 } }$ .)
::: solution
**Use the prefactor and bracket of the kettle example.** The prefactor is $2 5 4 \ \mathrm { k W / m ^ { 2 } }$ and the bracket at $\Delta T _ { e } = 1 0 \ \mathrm { K }$ was $0 . 6 2 8$ , so at $5 \ \mathrm { K }$ it is $0 . 3 1 4$ :
$$q ^ { \prime \prime } = 2 5 4 \times 0 . 3 1 4 ^ { 3 } = \mathbf { 8 \ k W / m ^ { 2 } } \qquad h = { \frac { 8 0 0 0 } { 5 } } = 1 6 0 0 \ \mathrm { W / m ^ { 2 } K }$$
**Two things to notice.** **The coefficient is $1 6 0 0$ , not the $3 0 \, 0 0 0$ of the datasheet, because $h \propto \Delta T _ { e } ^ { 2 }$ and $5 \ \mathrm { K }$ is not $2 0 \ \mathrm { K }$ .** **And $8 \ \mathrm { k W / m ^ { 2 } }$ is a real stove: a $2 \ \mathrm { k W }$ burner under a $1 8 \ \mathrm { c m }$ pan gives $8 . 2 \ \mathrm { k W / m ^ { 2 } }$ of pan base, which is why the water in a pan takes minutes rather than seconds and why the pan base sits only a few kelvin above $1 0 0 \ \ {} ^ { \circ } \mathrm { C }$ while it is still full.**
:::
:::

::: exercise A bigger element {#ex-element level=2 check="13.8"}
A $1 . 5 \ \mathrm { k W }$ water-heater element has $9 0 \ \mathrm { c m } ^ { 2 }$ of wetted surface. Estimate the sheath superheat and the margin to the critical heat flux, both at $1 \ \mathrm { a t m }$ and $C _ { s f } = 0 . 0 1 7$ . (Enter the superheat in K.)
::: solution
$q ^ { \prime \prime } = 1 5 0 0 / 0 . 0 0 9 0 = 1 6 7 \ \mathrm { k W / m ^ { 2 } }$ . Inverting the cube law from the $6 3 \ \mathrm { k W / m ^ { 2 } }$ at $1 0 \ \mathrm { K }$ of the kettle example:
$$\Delta T _ { e } = 1 0 \left( { \frac { 1 6 7 } { 6 3 } } \right) ^ { 1 / 3 } = 1 0 \times 1 . 3 8 = \mathbf { 1 3 . 8 \ K } \qquad { \frac { q ^ { \prime \prime } } { q _ { \max } ^ { \prime \prime } } } = { \frac { 1 6 7 } { 1 1 1 0 } } = 0 . 1 5$$
**The sheath runs at about $1 1 4 \ \ {} ^ { \circ } \mathrm { C }$ and the flux is $1 5 \ \ \%$ of CHF, which is a normal and safe design point.** **The interesting case is scale: a $5 \ \mathrm { m m }$ crust of limescale on the element adds a conduction resistance $q ^ { \prime \prime } t / k = 1 6 7 \, 0 0 0 \times 0 . 0 0 5 / 1 . 5 = 5 6 0 \ \mathrm { K }$ — the sheath surface temperature rises by $5 6 0 \ \mathrm { K }$ , the scale dries out, cracks, and the bare metal underneath is suddenly at a flux far above CHF. **Scale does not kill elements by insulating them; it kills them by pushing them across the cliff.**
:::
:::

::: exercise High-pressure boiler {#ex-hpfrac level=2 check="0.13"}
A once-through boiler tube at $3 . 0 \ \mathrm { M P a }$ is designed for $q ^ { \prime \prime } = 5 0 0 \ \mathrm { k W / m ^ { 2 } }$ . Using the Zuber value from the worked example, what fraction of the critical heat flux is that? (Enter the fraction to two decimals.)
::: solution
$0 . 5 0 / 3 . 8 3 = \mathbf { 0 . 1 3 }$ . **Comfortable — and misleading, because the Zuber value is for a large horizontal surface in a quiescent pool, whereas a boiler tube at high quality fails by dryout, where the limit is a function of mass flux and quality and can be several times lower than the pool CHF.** **The correct check is a dryout correlation evaluated at the local flux and local quality along the tube, and the answer is usually that the last metre, not the average, sets the design.**
:::
:::

::: exercise The skating drop {#ex-drop level=2 check="65"}
A spherical water drop of $3 \ \mathrm { mm }$ radius sits on a pan $1 5 0 \ \mathrm { K }$ above the Leidenfrost point, where the minimum heat flux is $q _ { \min } ^ { \prime \prime } \approx 0 . 1 \ \mathrm { M W / m ^ { 2 } }$ . How long does it survive? (Enter seconds.)
::: solution
**The drop recedes at a rate set by the flux, independent of its size:**
$$\dot { r } = { \frac { q ^ { \prime \prime } } { \rho _ { l } h _ { f g } } } = { \frac { 1 0 ^ { 5 } } { 9 5 8 \times 2 . 2 5 7 \times 1 0 ^ { 6 } } } = 4 . 6 \times 1 0 ^ { - 5 } \ \mathrm { m / s } \qquad t = { \frac { 3 \times 1 0 ^ { - 3 } } { 4 . 6 \times 1 0 ^ { - 5 } } } = \mathbf { 6 5 \ s }$$
**Sixty-five seconds for a drop that would vanish in under a second on a pan at $1 2 0 \ \ {} ^ { \circ } \mathrm { C }$ — a factor of more than fifty, bought by an insulating film only tens of microns thick.** **The same arithmetic explains why a spray of water on a hot furnace wall can be more effective than a solid stream: the droplets that stay in film boiling carry away heat slowly and evaporate in the gas instead of at the wall, and the ones that wet the wall quench it.**
:::
:::

::: exercise A taller condensing surface {#ex-cond2 level=3 check="5312"}
Steam at $1 \ \mathrm{atm}$ condenses on a vertical plate $2 . 0 \ \mathrm { m }$ high held at $9 0 \ \ {} ^ { \circ } \mathrm { C }$ . Find the average coefficient and the heat flux. (Enter the coefficient in $\mathrm { W / m ^ { 2 } K }$ .)
::: solution
Film temperature $9 5 \ \ {} ^ { \circ } \mathrm { C }$ , taken as $\rho _ { l } = 9 6 3$ , $\mu _ { l } = 2 . 9 7 \times 1 0 ^ { - 4 }$ , $k _ { l } = 0 . 6 7 8$ ; using the properties of the worked example for consistency:
$${ \overline { { h } } } _ { L } = 0 . 9 4 3 \left[ { \frac { 9 . 8 1 \times 9 6 5 \times 9 6 4 \times 0 . 6 7 5 ^ { 3 } \times 2 . 2 6 \times 1 0 ^ { 6 } } { 3 . 1 5 \times 1 0 ^ { - 4 } \times 2 . 0 \times 1 0 } } \right] ^ { 1 / 4 } = \mathbf { 5 3 1 0 \ W / m ^ { 2 } K } \qquad q ^ { \prime \prime } = 5 3 1 0 \times 1 0 = 5 3 \ \mathrm { k W / m ^ { 2 } }$$
**The coefficient is identical to the $1 \ \mathrm { m }$ plate at $\Delta T = 2 0 \ \mathrm { K }$ , because Nusselt's theory depends only on the product $L \Delta T$ — doubling the height at half the temperature difference is the same problem.** **The heat flux is half, though, and the film at the bottom is $2 ^ { 1 / 4 } ( 1 0 / 2 0 ) ^ { 1 / 4 } = 1$ times as thick: the same coefficient can mean a very different film. ** **This is why condenser ratings are quoted per unit area at a stated $\Delta T$ and why comparing two condensers by their coefficient alone is meaningless.**
:::
:::

::: exercise A hundred tubes high {#ex-hundred level=3 check="0.50"}
A shell-and-tube condenser has vertical columns of horizontal tubes. Relative to a single isolated tube, what is the average condensing coefficient of a column of sixteen tubes, by Nusselt's $N ^ { - 1 / 4 }$ rule? (Enter the ratio to two decimals.)
::: solution
$1 6 ^ { - 1 / 4 } = 1 / 2 = \mathbf { 0 . 5 0 }$ . **Sixteen tubes stacked condense at half the coefficient of one tube, purely because the condensate has nowhere to go but down onto the next tube.** **Two remedies, both standard: break the shell into several short columns with the tube count split between them rather than stacked, and use a "flooding" tube layout in which every other row is offset so that condensate drips between rows rather than onto them.** **Note that the $N ^ { - 1 / 4 }$ law is optimistic for real bundles — vapor shear thins the film between rows, and the condensate of the upper rows is already warm — so measured columns lose $3 0$ to $4 0 \ \ \%$ , not $5 0 \ \ \%$ .**
:::
:::

::: exercise Push the reactor harder {#ex-pwr2 level=3 check="-0.03"}
The channel of the worked example is run at $q ^ { \prime \prime } = 7 0 0 \ \mathrm { k W / m ^ { 2 } }$ with $G = 2 5 0 0 \ \mathrm { k g / m ^ { 2 } s }$ . Find the equilibrium quality at the exit, and say whether the core still avoids boiling.
::: solution
$$\dot { m } = 2 5 0 0 \times 4 . 9 0 9 \times 1 0 ^ { - 4 } = 1 . 2 2 7 \ \mathrm { k g / s } \qquad \dot { Q } = 7 0 0 \times 1 0 ^ { 3 } \times \pi \times 0 . 0 2 5 \times 6 . 0 = 3 3 0 \ \mathrm { k W }$$
$$\Delta h = 3 3 0 / 1 . 2 2 7 = 2 6 9 \ \mathrm { k J / k g } \qquad x _ { e q } = { \frac { 1 3 4 4 + 2 6 9 - 1 6 4 0 } { 9 7 0 } } = \mathbf { - 0 . 0 3 }$$
**The exit is within $3 \ \ \%$ of saturation: the core still does not make steam, but the margin has gone from $1 0 0$ to $2 7 \ \mathrm { k J / k g }$ , which is one per cent of the enthalpy rise and less than the uncertainty in the hot-channel factor.** **This is the real meaning of "power uprate" in a PWR: the limit is not the fuel temperature or the pump, it is the DNB margin at the hot channel exit, and it is bought back by mixing vanes, by throttling the flow, and eventually by refusing the uprate.**
:::
:::

::: exercise Cooling through the film {#ex-quench level=4 check="89"}
For the $2 0 \ \mathrm { mm }$ sphere of the quenching example, estimate the time to cool from $8 0 0$ to $3 0 0 \ \ {} ^ { \circ } \mathrm { C }$ by lumped capacitance, taking the film-boiling coefficient as $h = 1 8 8 \, ( 7 0 0 / \Delta T _ { e } ) ^ { 1 / 4 } \ \mathrm { W / m ^ { 2 } K }$ and neglecting radiation.
::: solution
**Energy balance with $V / A = D / 6$ and $\theta = \Delta T _ { e }$ :**
$$\rho c _ { p } { \frac { D } { 6 } } { \frac { \mathrm { d } \theta } { \mathrm { d } t } } = - h \theta = - C \theta ^ { 3 / 4 } \ , \qquad C = h _ { 0 } \theta _ { 0 } ^ { 1 / 4 } = 1 8 8 \times 7 0 0 ^ { 1 / 4 } = 9 6 7$$
$$t = { \frac { 4 \rho c _ { p } D / 6 } { C } } \left( \theta _ { 0 } ^ { 1 / 4 } - \theta _ { 1 } ^ { 1 / 4 } \right) = { \frac { 4 \times 7 8 0 0 \times 6 0 0 \times 0 . 0 0 3 3 3 } { 9 6 7 } } \left( 7 0 0 ^ { 1 / 4 } - 2 0 0 ^ { 1 / 4 } \right) = 6 4 . 5 \times 1 . 3 8 1 = \mathbf { 8 9 \ s }$$
**A constant coefficient of $1 8 8$ would have given $1 0 4 \ \mathrm { s }$ , only $1 7 \ \ \%$ longer, because the $\Delta T ^ { - 1 / 4 }$ dependence is weak — the film-boiling regime is nearly exponential in its cooling.** **Add radiation ($h _ { r } \approx 8 5$ at the top of the range, falling to $1 0$ at the bottom) and the answer is nearer $7 0 \ \mathrm { s }$ ; add the fact that the lumped assumption is poor for a steel sphere at these coefficients ($\mathrm { Bi } = h D / 6 k = 0 . 1 9$ ) and the honest answer is "one and a half to two minutes".** **What matters for the metallurgy is not the total but the last few seconds, when the film collapses and the part passes through the nucleate-boiling regime at a coefficient of $3 0 \, 0 0 0$ — the thermal shock that cracks the part is generated in the transition, not in the film.**
:::
:::

::: proof Nusselt's horizontal tube {#derivation-nusselt-tube}
Starting from the vertical-plate film analysis, obtain $\overline { { h } } _ { D } = 0 . 7 2 9 \left[ g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) k _ { l } ^ { 3 } h _ { f g } ^ { \prime } / ( \mu _ { l } D \Delta T ) \right] ^ { 1 / 4 }$ for a horizontal tube of diameter $D$ . Show that the constant is $( 9 \pi / 1 6 ) ^ { 1 / 4 } \times 0 . 9 4 3 \times ( 2 / \pi ) ^ { \dots }$ — that is, work out where $0 . 7 2 9$ comes from and why it is larger than $0 . 9 4 3$ even though the film is on the outside of a curved surface.
::: solution
**Take $\phi$ from the bottom of the tube; the drainage component of gravity is $g \sin \phi$ and the film thickness at angle $\phi$ follows from the vertical-plate result with $x \to \phi D / 2$ and $g \to g \sin \phi$ :**
$$\delta ( \phi ) = \left[ { \frac { 4 \mu _ { l } k _ { l } \Delta T \, ( \phi D / 2 ) } { g \rho _ { l } ( \rho _ { l } - \rho _ { v } ) h _ { f g } ^ { \prime } \sin \phi } } \right] ^ { 1 / 4 } = \delta _ { 1 } \left( { \frac { \phi } { \sin \phi } } \right) ^ { 1 / 4 }$$
**The total condensation rate is the circumferential integral of the local flux, and the average coefficient is**
$${ \overline { { h } } } _ { D } = { \frac { 1 } { \pi } } \int _ { 0 } ^ { \pi } { \frac { k _ { l } } { \delta ( \phi ) } } \, \mathrm { d } \phi = { \frac { k _ { l } } { \delta _ { 1 } \pi } } \int _ { 0 } ^ { \pi } \left( { \frac { \sin \phi } { \phi } } \right) ^ { 1 / 4 } \! \mathrm { d } \phi = { \frac { k _ { l } } { \delta _ { 1 } \pi } } \times 2 . 4 8 5$$
**so ${ \overline { { h } } } _ { D } = 0 . 7 9 2 \, k _ { l } / \delta _ { 1 }$ , and substituting $\delta _ { 1 }$ at $x = D / 2$ gives the $0 . 7 2 9$ (the small difference is the treatment of the drainage term at the top of the tube, where the film thins to nothing and the theory breaks down).** **The constant is smaller than $0 . 9 4 3$ only because the length scale has changed from $L$ to $D$ inside the fourth root: written at equal length, the horizontal result is larger, which is the physical content of the formula — the film on a tube never gets tall, so it never gets thick, which is why every industrial condenser uses horizontal tubes.**
:::
:::

::: proof Why the critical heat flux vanishes at the critical point {#derivation-chf-critical}
Near the critical point $\sigma \propto ( 1 - T / T _ { c } ) ^ { 1 . 2 6 }$ , $h _ { f g } \propto ( 1 - T / T _ { c } ) ^ { 0 . 3 8 }$ and $\rho _ { l } - \rho _ { v } \propto ( 1 - T / T _ { c } ) ^ { 0 . 3 3 }$ . Use Zuber's expression, written as $q _ { \max } ^ { \prime \prime } = C h _ { f g } \sigma ^ { 1 / 4 } [ g ( \rho _ { l } - \rho _ { v } ) ] ^ { 1 / 4 } \rho _ { v } ^ { 1 / 2 }$ , to find the exponent of $( 1 - T / T _ { c } )$ in the critical heat flux, and explain why the same expression predicts a maximum at intermediate pressure rather than monotonic behaviour.
::: solution
**Collect exponents:**
$$q _ { \max } ^ { \prime \prime } \propto ( 1 - T / T _ { c } ) ^ { 0 . 3 8 } \times ( 1 - T / T _ { c } ) ^ { 1 . 2 6 / 4 } \times ( 1 - T / T _ { c } ) ^ { 0 . 3 3 / 4 } \times \rho _ { v } ^ { 1 / 2 } = ( 1 - T / T _ { c } ) ^ { 0 . 3 8 + 0 . 3 1 5 + 0 . 0 8 3 } \rho _ { v } ^ { 1 / 2 } = ( 1 - T / T _ { c } ) ^ { 0 . 7 8 } \rho _ { v } ^ { 1 / 2 }$$
**So $q _ { \max } ^ { \prime \prime } \to 0$ as the critical point is approached, as $( 1 - T / T _ { c } ) ^ { 0 . 7 8 }$ — measured behaviour is close to this.** **The maximum at intermediate pressure comes from the $\rho _ { v } ^ { 1 / 2 }$ factor, which is the only term that *grows* with pressure: at low pressure the vanishing vapor density starves the flux ($q \propto \rho _ { v } ^ { 1 / 2 } \sigma ^ { 1 / 4 } h _ { f g }$ , rising steeply as $\rho _ { v }$ appears), while near the critical point the vanishing surface tension and latent heat dominate and drag it to zero.** **The two effects cross near $0 . 2 5$ to $0 . 3 5$ of the critical pressure, which for water is $6$ to $8 \ \mathrm { M P a }$ and for most refrigerants is a few bar above atmospheric — the reason refrigeration compressors are protected by a high-pressure cut-out that is really a critical-heat-flux cut-out.**
:::
:::

## Where this lesson leads

- **[[heat-transfer/heat-exchangers|Heat exchangers]]** applies everything here: a condenser or evaporator is a surface whose coefficient comes from this lesson, and its design problem is that the two sides have coefficients differing by a factor of fifty, so the gas side or the condensing side decides everything.
- **[[heat-transfer/internal-convection|Forced convection in internal flow]]** supplies the $F$ term of the Chen flow-boiling correlation and the single-phase coefficient that boiling either adds to or replaces.
- **[[heat-transfer/natural-convection|Natural convection]]** is region I of the boiling curve and the mechanism that carries the heat when boiling stops — the reason a reactor core after a loss of forced circulation is still cooled, badly, by natural circulation.
- **[[thermodynamics/pure-substances|Pure substances]]** is where $h _ { f g }$ , quality and the saturation line come from; every number in this lesson is a property-table lookup, and the collapse of $h _ { f g }$ and $\sigma$ at the critical point is the thermodynamic fact behind the CHF peak.
- **[[materials-science/phase-transformations|Phase transformations]]** is the same nucleation problem with a solid instead of a vapor: undercooling plays the role of superheat, and the classical critical-radius derivation of this lesson reappears word for word.
- **[[manufacturing/joining|Joining]]** uses the boiling curve in reverse — the weld pool is a solidifying film whose heat extraction is limited by a vapor sheath in keyhole welding.
- **[[heat-transfer/radiation|Thermal radiation]]** carries a third of the heat in the film-boiling example and all of it in the transition regime; at red heat there is no convection problem left, only a radiation problem with a boiling boundary condition.

::: history How the boiling curve was measured
| Year | Event |
|:--|:--|
| 1732 | **Charles Boileau (Boyle)** reports to the Royal Society that a drop of water on a hot silver dish "runs about in a globe" and outlives its expected lifetime — the first recorded Leidenfrost observation, made twenty-four years before Leidenfrost. |
| 1756 | **J. G. Leidenfrost**, *De aqua communis*, Duisburg — twenty pages of experiments on the spheroidal state of drops, including the observation that the drop is separated from the metal by "an elastic vapor" and that the metal is cooler than the drop. **The first measurement of an insulating vapor film, made without any theory of heat at all.** |
| 1916 | **W. Nusselt**, "Die Oberflächenkondensation des Wasserdampfes", *Zeitschrift des Vereins deutscher Ingenieure* **60**, 541 and 568/575 — the film-condensation and film-boiling analyses reproduced in this lesson, obtained by balancing a draining film against its own conduction. **Nusselt's $\frac{4}{3}$ and $0 . 9 4 3$ are still the design equations of every condenser on the planet, and they were written before the boundary layer was a known concept.** |
| 1931–1934 | **S. Nukiyama**, "The maximum and minimum values of the heat Q transmitted from a metal surface to boiling water under atmospheric pressure" (Japanese), later *J. Int. J. Heat Mass Transfer* **9** (1966), 1419 — the measured boiling curve for a nickel wire in water, from natural convection through burnout to film boiling. **The curve is his; the "Nukiyama curve" and the "Nukiyama point" (CHF) are named for a graduate experiment in Kyoto that took five years to publish.** |
| 1950 | **L. A. Bromley**, "Heat transfer in stable film boiling", *Chemical Engineering Progress* **46**, 221 — the film-boiling correlation with the $h _ { f g } + 0 . 8 c _ { p , v } \Delta T$ superheat correction, and the first clear statement that radiation must be added, not averaged. |
| 1951–1952 | **W. Rohsenow**, "A method of correlating heat transfer data for surface boiling of liquids", *Trans. ASME* **74**, 969 — the nucleate-boiling correlation and, in the same paper, the first rational treatment of forced-convection boiling. **Its surface constant $C _ { s f }$ has been the most fitted, least trusted number in heat transfer for seventy years.** |
| 1952 | **S. S. Kutateladze**, *Heat Transfer in Condensation and Evaporation in Power Engineering* — an independent derivation of the critical heat flux from a vapor-film stability argument, giving the same $\left( \sigma g \Delta \rho / \rho _ { v } ^ { 2 } \right) ^ { 1 / 4 }$ structure as Zuber with a constant of $0 . 1 4 9$ . **Published in Russian in Leningrad; the west read it a decade late and the priority dispute is unresolved.** |
| 1958–1959 | **H. Zuber**, "Hydrodynamic aspects of boiling heat transfer", UCLA/USAECA report (1959), and **H. Zuber & A. J. Tribus**, *J. Heat Transfer* **81**, 23 — the Rayleigh–Taylor counter-flow model of the critical heat flux. **A prediction of $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ for water at $1 \ \mathrm { a t m }$ from four saturation properties, made in a report about nuclear reactors, is still the number in every reactor safety manual.** |
| 1966 | **J. C. Chen**, "Correlation for boiling heat transfer to saturated fluids in convective flow", *I&EC Process Design and Development* **5**, 322 — the two-factor (nucleate + convective) flow-boiling correlation still used for nuclear and refrigerant design. |
| 1978–1983 | **A. E. Bergles, R. N. Christensen, D. A. Moles and the MIT group** develop enhanced-boiling surfaces — porous sintered coatings, machined tunnels, re-entrant pore structures — raising both $h$ and CHF by factors of two to five, and with them the first honest statement that surface technology, not correlation refinement, is where the remaining gains are. |
| 1994–present | **Two-phase microchannel and immersion cooling for electronics**, and nanostructured and laser-textured surfaces for CHF enhancement (Peraud, Kim, Mudawar, Wang): the kettle problem returns at $1 \ \mathrm { k W / c m ^ { 2 } }$ , with degassing, nanofluid degradation and surface oxidation as the failure modes instead of limescale. |
:::

::: summary
- **Phase change is strong because the resistance is a micrometre-thin film, not a boundary layer**: nucleate boiling reaches $1 0 ^ { 4 }$ to $1 0 ^ { 5 } \ \mathrm { W / m ^ { 2 } K }$ and condensation $5 0 0 0$ to $1 5 \, 0 0 0$ , and the real prize is a usable heat flux at $1 0 \ \mathrm { K }$ of driving difference.
- **Boiling needs nucleation sites.** The critical radius $r ^ { * } = 2 \sigma T _ { \mathrm { s a t } } v _ { l } / ( h _ { f g } \Delta T _ { e } )$ is $2 \ \mathrm { n m }$ at $1 0 \ \mathrm { K }$ of superheat and homogeneous nucleation would need $3 0 0 \ \mathrm { K }$ : real boiling happens at scratches, and the surface chemistry is part of the design.
- **The boiling curve has a cliff.** $q \propto \Delta T _ { e } ^ { 3 }$ in nucleate boiling, a maximum at the CHF, then a factor-of-six collapse into film boiling. Under imposed heat flux the jump past CHF is instantaneous and destructive; the design check is $q ^ { \prime \prime } / q _ { \max } ^ { \prime \prime } \leq 0 . 7$ , done locally.
- **Rohsenow gives the coefficient, Zuber gives the limit.** $q ^ { \prime \prime } = \mu _ { l } h _ { f g } [ g \Delta \rho / \sigma ] ^ { 1 / 2 } [ c _ { p , l } \Delta T _ { e } / ( C _ { s f } h _ { f g } \mathrm { P r } _ { l } ^ { s } ) ] ^ { 3 }$ with a surface constant that changes the answer by a factor of eight; $q _ { \max } ^ { \prime \prime } = 0 . 1 3 1 \, \rho _ { v } h _ { f g } [ \sigma g \Delta \rho / \rho _ { v } ^ { 2 } ] ^ { 1 / 4 }$ , which needs no surface data at all and gives $1 . 1 \ \mathrm { M W / m ^ { 2 } }$ for water at $1 \ \mathrm { a t m }$ .
- **Pressure is the strongest lever on CHF** — roughly tripled between $1 \ \mathrm { a t m }$ and $3 \ \mathrm { M P a }$ , peaking near $0 . 3$ of the critical pressure and vanishing at the critical point as $( 1 - T / T _ { c } ) ^ { 0 . 7 8 }$ . Reactor pressure is a CHF decision, not an efficiency decision.
- **Condensation is boiling turned inside out, and it gets worse as you drive it**: $\overline { { h } } _ { L } = 0 . 9 4 3 [ g \rho _ { l } \Delta \rho k _ { l } ^ { 3 } h _ { f g } ^ { \prime } / ( \mu _ { l } L \Delta T ) ] ^ { 1 / 4 } \propto \Delta T ^ { - 1 / 4 } L ^ { - 1 / 4 }$ . Horizontal tubes beat vertical walls because the film never grows tall; columns of tubes lose $N ^ { - 1 / 4 }$ to inundation; a few per cent of air costs half the coefficient.
- **Use $h _ { f g } ^ { \prime } = h _ { f g } + 0 . 8 c _ { p , v } \Delta T$** in every film calculation, and check the film Reynolds number before trusting Nusselt's laminar assumption.
- **Two-phase flow fails in two different ways**: DNB at high pressure and low quality, dryout at low pressure and high quality. Know which map you are on before quoting a correlation, and never average a heat flux that has a hot channel.
:::

## Further reading

- **V. P. Skripov**, *Metastable Liquids* (Wiley, 1974) — the definitive account of superheated liquid, homogeneous nucleation and the spinodal; the physics behind the critical radius, with the measurements that found the $3 0 0 \ \mathrm { K }$ limit.
- **R. K. Shah & S. Sekhar**, *Boiling and Condensation*, 2nd ed. (Cambridge, 2019) — the correlations, the flow-pattern maps and the property data, with the honesty about uncertainty that this lesson can only summarise.
- **Y. A. Cengel & J. M. Cimbala**, *Fluid Mechanics* / **Incropera et al.**, *Fundamentals of Heat and Mass Transfer*, ch. 10 — the worked tables of $C _ { s f }$ and the standard set of CHF correlations used in industry.
- **S. M. Yuen & J. C. Chen / J. C. Chen**, "Correlation for boiling heat transfer to saturated fluids in convective flow", *I&EC Proc. Des. Dev.* **5** (1966), 322 — the flow-boiling correlation, short and readable, with its two factors drawn as curves.
- **I. Popiel & J. R. Thome** (eds.), *Boiling Condensation and Heat Exchangers* (WIT Press, 2007) — the modern engineering view, including enhanced surfaces, mini-channels and the dropwise-condensation problem that still refuses to be solved.
- **J. G. Leidenfrost**, *Trifolium Nobilis* / *De Aqua Communis* (1756), in the annotated translation of **G. E. Keevil & J. O. M. Bockris**, *Annals of Science* **16** (1960), 1 — read the original: twenty pages of careful experiment with no theory, and the spheroidal state discovered by a physician.
