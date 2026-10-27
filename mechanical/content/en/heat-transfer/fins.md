A fin is a wall that has been given more area, and the whole of fin theory is the accounting of what that area is really worth. The idea is obvious and the arithmetic is easy; what is not obvious is that **the added area is never fully effective**, because the heat has to travel along the fin to reach it, and the temperature at the end of the fin is lower than the temperature at its base, so the far end works less hard than the near end. The single number that measures this is the **fin efficiency**, the ratio of the heat the fin actually throws to the heat it would throw if the whole fin were at the base temperature, and it is the most misread quantity in thermal engineering.

The reason fins work at all is a comparison of two resistances. Conduction along a fin of length $L$, cross-section $A_c$ and perimeter $P$ offers a resistance $L / ( k A _ { c } )$; convection from its surface offers $1 / ( h P L )$. Their ratio is the parameter that governs everything:
$$
m ^ { 2 } L ^ { 2 } = \frac { L / ( k A _ { c } ) } { 1 / ( h P L ) } = \frac { h P L ^ { 2 } } { k A _ { c } } \qquad \Longleftrightarrow \qquad m = \sqrt { \frac { h P } { k A _ { c } } }
$$
**When $mL \ll 1$ the fin is short and fat, its whole surface is near the base temperature, and it is doing nothing that a slightly thicker wall would not do. When $mL \gg 1$ the fin is long and thin, its temperature falls away within a short distance of the base, and most of its surface is at the ambient temperature and is doing nothing at all.** The useful range is $mL$ between about $0.3$ and $1.5$, and the whole craft of fin design is putting a piece of metal in that window.

Two consequences decide most real designs. **Fin effectiveness** — the ratio of the heat a fin carries to the heat the same base area would have carried without it — is $\sqrt { P k / ( h A _ { c } ) }$ for a long fin, and it is **large whenever $h$ is small**: fins are how you fix a bad fluid, which is why every air-cooled thing is bristling with metal and almost nothing water-cooled is. And **the optimum spacing of an array** is set not by the fins at all but by the boundary layers between them: **the pitch that works is of order twice the equivalent film thickness $k / h$, which is why natural-convection heat sinks have $8$ to $12\ \mathrm{mm}$ fin spacing and forced-air ones have $2$ to $3\ \mathrm{mm}$ — the same rule, applied to two values of $h$ that differ by a factor of about four.**

::: warning Five fin errors that are made in every industry
**Confusing efficiency with effectiveness.** A fin that is $58\ \%$ efficient and has an effectiveness of $20$ is a **good fin**: it throws $58\ \%$ of what an isothermal fin of the same shape would, and twenty times what the bare wall under it would. **Efficiency measures the metal; effectiveness measures the decision.** **Assuming more fins are better.** For a long fin the dissipation is $\sqrt { h P k A _ { c } } \, \Delta T$ and **does not contain the length at all**: doubling a fin whose $mL > 2$ buys a few per cent and doubles the mass. In an array, adding fins at fixed pitch adds area and then stops, because the boundary layers merge and $h$ collapses. **The optimum spacing of a natural-convection heat sink is broad and flat — from about two-thirds to one and a half times the optimum spacing the performance changes by less than $10\ \%$ — so buy the sink that fits and stop optimising.** **Ignoring the base.** A fin is attached, and the attachment has a contact resistance, typically $3000$ to $8000\ \mathrm { W / m ^ { 2 } K }$ for a pressed-in or epoxied joint. Spread over a broad base it is usually negligible; concentrated in the narrow root contact of each pressed-on fin it can cost more than half the array's performance — see [[#ex-contact]]. **Using a one-dimensional fin equation on a fin that is not thin.** The fin equation assumes the temperature is uniform across the thickness, which requires the Biot number on the half-thickness, $h t / 2 k$, to be small. For a $1\ \mathrm{mm}$ aluminium fin in air it is about $10^{-5}$ and the assumption is superb. **For a thin stainless or titanium fin in boiling water it is not, and for a polymer fin it never was** — and the correction is not to solve the fin equation better but to stop using it. **Assuming the fin tip does not matter.** For a fin of thickness $t$ the tip carries roughly $t / ( 2 L )$ of the total, which is negligible for a plate fin and **not** negligible for a pin fin that is as thick as it is long. The standard remedy, the **corrected length** $L _ { c } = L + t / 2$, is a one-line fix and is always worth taking.
:::

## The fin equation

::: definition The straight fin of uniform cross-section {#def-fineq}
Balance energy on a slice of thickness $dx$ of a fin of perimeter $P$ and cross-section $A_c$, losing heat to a fluid at $T_\infty$ with coefficient $h$. With $\theta = T - T_\infty$,
$$
\boxed { \; { \frac { d ^ { 2 } \theta } { d x ^ { 2 } } } - m ^ { 2 } \theta = 0 , \qquad m = \sqrt { \frac { h P } { k A _ { c } } } \; } \qquad \theta ( x ) = C _ { 1 } e ^ { m x } + C _ { 2 } e ^ { - m x }
$$
**The equation says that the curvature of the profile is proportional to the profile itself**, which is why the solution is exponential: the further the temperature has fallen, the less is being lost per unit length, and so the less steeply the fall continues. **The general solution and the four boundary conditions give everything a designer needs:**
$$
\begin{array}{l l l}
\text{Infinitely long fin} & \theta ( L ) \to 0 & \theta = \theta _ { b } e ^ { - m x } , \quad q _ { f } = \sqrt { h P k A _ { c } } \, \theta _ { b } \\[4pt]
\text{Adiabatic tip} & d \theta / d x | _ { L } = 0 & \theta = \theta _ { b } \dfrac { \cosh m ( L - x ) } { \cosh m L } , \quad q _ { f } = \sqrt { h P k A _ { c } } \, \theta _ { b } \tanh m L \\[10pt]
\text{Prescribed tip temperature} & \theta ( L ) = \theta _ { L } & \theta = \dfrac { \theta _ { b } \sinh m ( L - x ) + \theta _ { L } \sinh m x } { \sinh m L } \\[10pt]
\text{Convection at the tip} & - k \, d \theta / d x | _ { L } = h _ { t } \theta _ { L } & \text{use } L _ { c } \text{ and the adiabatic result}
\end{array}
$$
**The length $1 / m$ is the fin's own length scale** — the distance over which the excess temperature falls by $1 / e$ — and it is worth computing before anything else, because it tells you how much fin is doing any work. For an aluminium plate fin $1\ \mathrm{mm}$ thick in still air at $h = 8$, $1 / m = 1 0 6\ \mathrm { m m }$; for a stainless fin of the same size in a forced air stream at $h = 4 5$, $1 / m = 1 3\ \mathrm { m m }$; for a copper pin fin $1\ \mathrm{mm}$ across in water at $h = 3 0 0 0$, $1 / m = 6\ \mathrm { m m }$. **A fin that is several times longer than $1 / m$ is mostly decoration.**
:::

::: exercise Derivation: the fin equation from a slice {level=3}
::: solution
Conduction in at $x$ is $- k A _ { c } \, d T / d x$ and out at $x + d x$ is $- k A _ { c } \, d T / d x$ evaluated there; convection from the slice's surface is $h \left( T - T _ { \infty } \right) P \, d x$. Steady balance, with $\theta = T - T _ { \infty }$ and $d T _ { \infty } / d x = 0$:
$$
- k A _ { c } { \frac { d \theta } { d x } } \bigg | _ { x } + k A _ { c } { \frac { d \theta } { d x } } \bigg | _ { x + d x } = h \theta P \, d x \qquad \Longrightarrow \qquad k A _ { c } { \frac { d ^ { 2 } \theta } { d x ^ { 2 } } } = h P \theta
$$
**Three things the derivation makes visible that the boxed equation hides.**
**(i) There is no assumption that $h$ is constant**, only that it is given. If $h$ varies along the fin — and in a natural-convection array it varies from the root to the tip by a factor of two — the equation still holds with $h ( x )$ inside $m ( x )$, and only the closed-form solution is lost.
**(ii) The transverse gradient has been assumed away.** The derivation used a one-dimensional conduction term across $d x$ only. The error this introduces is of order the Biot number on the half-thickness, $h t / 2 k$: for a $1\ \mathrm{mm}$ fin, **aluminium in air ($h = 8$), $2 \times 10^{-5}$; aluminium in boiling water at $h = 5 0 0 0$, $0 . 0 1 4$; PTFE ($k \approx 0.25$) in air, $0 . 0 1 6$; PTFE in water at $h = 3000$, $6$, and the theory is finished.**
**(iii) The perimeter $P$ counts the tip's contribution nowhere**, which is why the fourth boundary condition in the table is handled by lengthening the fin rather than by solving again. Adding $A_c / P$ of extra length — the corrected length $L_c = L + t/2$ for a thin rectangular fin, $L + d/4$ for a pin — reproduces the convection-tip answer to within a few per cent for ordinary fin proportions, so the adiabatic-tip formula with $L_c$ covers almost every practical case.
:::
:::

::: definition Fin efficiency {#def-fin-eff}
$$
\eta _ { f } \equiv { \frac { q _ { \text{actual} } } { q _ { \text{if the whole fin were at } T _ { b } } } } = { \frac { \int h \theta \, d A } { h A _ { f } \theta _ { b } } } \qquad \Longrightarrow \qquad \boxed { \eta _ { f } = { \frac { \tanh m L _ { c } } { m L _ { c } } } } \quad \text{straight fin, uniform section}
$$
$$
\begin{array} { c c c c c c c c c c }
m L _ { c } & 0 . 1 & 0 . 2 & 0 . 3 & 0 . 5 & 0 . 7 5 & 1 . 0 & 1 . 5 & 2 . 0 & 3 . 0 & 5 . 0 \\
\eta _ { f } & 0 . 9 9 7 & 0 . 9 8 7 & 0 . 9 7 1 & 0 . 9 2 4 & 0 . 8 4 7 & 0 . 7 6 2 & 0 . 6 0 3 & 0 . 4 8 2 & 0 . 3 3 2 & 0 . 2 0 0
\end{array}
$$
**A common design window is $m L _ { c } \approx 0 . 5$ to $1 . 0$, i.e. $\eta _ { f } \approx 0 . 9 2$ to $0 . 7 6$.** Much below it the fin is nearly isothermal and the metal could have been made taller or spent on another fin; much above it the outer part of the fin is close to the fluid temperature and is paying for little.
**For an annular fin of rectangular profile** the exact answer is a combination of modified Bessel functions, $I _ { 1 }$ and $K _ { 1 }$, and nobody evaluates it at a desk. A widely used approximation is Schmidt's (1949), good to a few per cent over the usual range:
$$
\eta _ { f } \approx { \frac { \tanh \left( m L _ { c } \psi \right) } { m L _ { c } \psi } } , \qquad \psi = 1 . 0 + 0 . 3 5 \ln \left( { \frac { r _ { 2 c } } { r _ { 1 } } } \right) , \qquad L _ { c } = L + { \frac { t } { 2 } } , \quad r _ { 2 c } = r _ { 2 } + { \frac { t } { 2 } }
$$
**The factor $\psi > 1$ is the annular fin's penalty for being annular**: the area grows with radius, so more of the fin's area lies far from the root, where the fin is coolest, and the fin behaves as though it were longer than it is. For $r_{2c} / r_1 = 2$, $\psi = 1 . 2 4$; for $r_{2c} / r_1 = 5$, $\psi = 1 . 5 6$.
:::

::: definition Fin effectiveness {#def-fin-effec}
$$
\varepsilon _ { f } \equiv { \frac { q _ { \text{fin}} } { q _ { \text{bare base of the same area} } } } = { \frac { \sqrt { h P k A _ { c } } \, \theta _ { b } \tanh m L _ { c } } { h A _ { b } \theta _ { b } } } \qquad \Longrightarrow \qquad \varepsilon _ { f } \approx \sqrt { \frac { P k } { h A _ { c } } } \quad \text{for } m L \gg 1
$$
**Effectiveness contains $h$ in the denominator, and that single fact is the whole of the fin-selection problem.** For a rectangular fin of thickness $t$ and unit depth, $P = 2$ and $A _ { c } = t$, so $\varepsilon _ { f } = \sqrt { 2 k / ( h t ) }$ :
$$
\begin{array}{l c c c}
\text{Fin} & k \left( \mathrm { W / m \, K } \right) & h \left( \mathrm { W / m ^ { 2 } K } \right) & \varepsilon _ { f } \text{ for } t = 1 \mathrm { m m } \\
\text{Aluminium in still air} & 1 8 0 & 6 & 2 4 5 \\
\text{Aluminium in forced air} & 1 8 0 & 5 0 & 8 5 \\
\text{Aluminium in water} & 1 8 0 & 3 0 0 0 & 1 1 \\
\text{Aluminium boiling water} & 1 8 0 & 1 0 { , } 0 0 0 & 6 \\
\text{Stainless steel in still air} & 1 6 & 6 & 7 3 \\
\text{Copper in still air} & 4 0 1 & 6 & 3 6 6
\end{array}
$$
**Read the last two rows against the first.** A copper fin in air is $50\ \%$ more effective than an aluminium one, but copper is more than three times as dense and several times as expensive per kilogram — **which is why most heat sinks are aluminium, and copper is used where the volume is fixed and the conduction path is long.** **And read the water rows: at $h = 3 0 0 0$ the effectiveness is $1 1$ and falling, and at boiling it is $6$. Fins in water still help, but far less; in boiling water long fins add little, and boiling surfaces are usually enhanced with fine structure that promotes nucleation instead.**
:::

::: widget plot
title: Fin efficiency against the parameter mL
f: tanh(x)/x; tanh(1.35*x)/(1.35*x)
x: 0, 4
y: 0, 1.05
labels: straight fin, tanh(mL)/(mL); annular fin, psi = 1.35
caption: The efficiency of a straight uniform-section fin against $mL_c$, with the annular-fin approximation drawn for a fin whose corrected tip radius is about $2.7$ times its root radius ($\psi = 1.35$). **The curve is flat to $0.99$ out to $mL = 0.2$ and then falls almost linearly, crossing $0.76$ at $mL = 1$ and $0.48$ at $mL = 2$.** The practical reading is the shape of the left-hand end: **between $mL = 0$ and $mL = 0.5$ you lose almost nothing, and beyond $mL \approx 2$ more than half the metal you have installed is idle.** The design window of $mL \approx 0.5$ to $1.0$ sits on the knee. **The annular curve lies below the straight one: because its area grows with radius, an annular fin of the same radial height behaves as though it were longer, and must be made shorter for the same efficiency.**
:::

## Arrays of fins

::: definition Overall surface efficiency and the array resistance {#def-array}
A real surface carries fins **and** the bare base between them. With $A _ { f }$ the total fin area, $A _ { b }$ the exposed base area and $A _ { t } = A _ { f } + A _ { b }$,
$$
\boxed { \; \eta _ { o } = 1 - { \frac { A _ { f } } { A _ { t } } } \left( 1 - \eta _ { f } \right ) \; } \qquad \Longrightarrow \qquad R _ { \text{conv} } = { \frac { 1 } { \eta _ { o } \, h \, A _ { t } } }
$$
**The structure of the correction is worth staring at: the penalty is the fin area fraction times the fin inefficiency.** Since a dense array has $A _ { f } / A _ { t } = 0 . 9 0$ to $0 . 9 7$, **the base is almost irrelevant and the whole array is the fins** — so a fin efficiency of $0 . 7 0$ in a dense array gives $\eta _ { o } = 0 . 7 2$, and no amount of attention to the bare base will help.
**The complete resistance of a mounted heat sink is then a series chain**, and writing it out is the single most useful five minutes of any electronics thermal design:
$$
R _ { j \to \infty } = R _ { j c } + { \frac { t _ { \text{interface} } } { k _ { \text{interface} } A _ { \text{case} } } } + { \frac { 1 } { h _ { b } A _ { \text{base} } } } + { \frac { 1 } { \eta _ { o } h A _ { t } } }
$$
where $h _ { b }$ is the **contact** conductance across a further joint in the path (for example a spreader block bolted to the sink base) and $A_{\text{base}}$ its area, typically $3 0 0 0$ to $8 0 0 0\ \mathrm { W / m ^ { 2 } K }$ for a greased, torqued joint and $2 0 0$ to $8 0 0$ for a dry, flat, unmachined one. **Note what the chain does when you add fins: it shrinks the last term and leaves the middle two exactly as they were.** That is the arithmetic behind the most demoralising sentence in thermal engineering — **"the sink you have chosen is only a third of the problem."**
:::

::: example The joint under the fin {#ex-contact}
Annular aluminium fins of $2 0 \ \mathrm { m m }$ radial height and $1 \ \mathrm { m m }$ thickness are pressed onto a $2 5 \ \mathrm { m m }$ OD tube at a pitch of $3 \ \mathrm { m m }$ and cooled by forced air at $h = 4 5 \ \mathrm { W / m ^ { 2 } K }$. Take $k = 1 8 0 \ \mathrm { W / m \, K }$ for the fins and a contact conductance of $2 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ (a resistance of $0 . 0 0 0 5 \ \mathrm { m ^ { 2 } K / W }$) for the pressed joint. What is the resistance per metre of tube, with and without that joint?

::: solution
**Fin efficiency first.** $m = { \sqrt { 2 h / k t } } = { \sqrt { 2 \times 4 5 / ( 1 8 0 \times 0 . 0 0 1 ) } } = 2 2 . 4 \ \mathrm { m ^ { - 1 } }$ , and with $r _ { 1 } = 1 2 . 5 \ \mathrm { m m }$ , $r _ { 2 c } = 3 3 \ \mathrm { m m }$:
$$
\psi = 1 + 0 . 3 5 \ln \left( { \frac { 3 3 } { 1 2 . 5 } } \right) = 1 . 3 4 \qquad m L _ { c } \psi = 2 2 . 4 \times 0 . 0 2 0 5 \times 1 . 3 4 = 0 . 6 1 4 \qquad \eta _ { f } = { \frac { \tanh 0 . 6 1 4 } { 0 . 6 1 4 } } = 0 . 8 9 1
$$
**Areas per metre of tube** ($3 3 3$ fins per metre):
$$
A _ { f } = 3 3 3 \times 2 \pi \left( 0 . 0 3 3 ^ { 2 } - 0 . 0 1 2 5 ^ { 2 } \right) = 1 . 9 5 4 \ \mathrm { m ^ { 2 } } \qquad A _ { b } = \pi \times 0 . 0 2 5 \times ( 1 - 3 3 3 \times 0 . 0 0 1 ) = 0 . 0 5 2 4 \ \mathrm { m ^ { 2 } }
$$
$$
\eta _ { o } = 1 - { \frac { 1 . 9 5 4 } { 2 . 0 0 6 } } ( 1 - 0 . 8 9 1 ) = 0 . 8 9 4 \qquad R _ { \text{array} } = { \frac { 1 } { 0 . 8 9 4 \times 4 5 \times 2 . 0 0 6 } } = \mathbf { 0 . 0 1 2 4 \ \mathrm { K / W } } \ \text{per metre}
$$
**Now the joint.** The contact area of one fin is the annulus $2 \pi r _ { 1 } t = 7 . 8 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } }$ , so one fin carries $0 . 0 0 0 5 / 7 . 8 5 \times 1 0 ^ { - 5 } = 6 . 4 \ \mathrm { K / W }$ of contact resistance, and the $3 3 3$ fins in parallel reduce it to $0 . 0 1 9 1 \ \mathrm { K / W }$ per metre of tube:
$$
R _ { \text{fin+contact} } = { \frac { 1 } { \eta _ { f } h A _ { f } } } + R _ { \text{contact} } = 0 . 0 1 2 8 + 0 . 0 1 9 1 = 0 . 0 3 1 9 \qquad { \frac { 1 } { R } } = { \frac { 1 } { 0 . 0 3 1 9 } } + { \frac { 1 } { 1 / ( 4 5 \times 0 . 0 5 2 4 ) } } = 3 1 . 4 + 2 . 4 = 3 3 . 7
$$
$$
R _ { \text{with joint} } = \mathbf { 0 . 0 2 9 6 \ \mathrm { K / W } } \ \text{per metre} \qquad \text{a factor of } \mathbf { 2 . 4 } \text{ worse, and } \mathbf { 6 0 \ \% } \text{ of the fins' work gone}
$$
**The fin efficiency never changed; the array efficiency never changed; every dimension is exactly as the tables prescribe.** **What removed $6 0 \ \%$ of the fins' contribution is a joint equivalent to an air film about $1 3 \ \mu\mathrm { m }$ thick ($0.0005 \times 0.026$) — which is why finned tubes are made with integral, extruded, welded or shoulder-wrapped fins wherever performance matters.** **The design rule follows: each fin's root contact is only $1.3\ \%$ of that fin's own surface area, yet all of the fin's heat must cross it, so the contact conductance must be some $75$ times $h$ merely to match the convection it feeds. Whenever heat funnels through a small contact, check the contact first.**
:::
:::

::: example Which of two heat sinks, at the same mass of aluminium {#ex-sink}
A $6 0\ \mathrm{W}$ device runs from a $1 2 0 \times 1 2 0 \times 6\ \mathrm { m m }$ aluminium base plate ($k = 1 8 0$) with straight fins $1 2 0\ \mathrm{mm}$ long, forced air at $3\ \mathrm { m / s }$ giving $h \approx 3 8$ to $4 2\ \mathrm { W / m ^ { 2 } K }$ depending on how dense the array is. Ambient is $4 5\ {} ^ { \circ } \mathrm { C }$; $R _ { j c } = 0 . 3 5$ and the interface adds $0 . 2 5\ \mathrm { K / W }$. Compare (a) $1 2$ fins of $1 . 5\ \mathrm{mm}$ thickness and (b) $1 8$ fins of $1 . 0\ \mathrm{mm}$, both $6 0\ \mathrm{mm}$ tall. **The two arrays contain exactly the same volume of aluminium.**

::: solution
**(a) Twelve fins of $1 . 5\ \mathrm{mm}$.** $A _ { f } = 1 2 \times 2 \times 0 . 0 6 0 \times 0 . 1 2 0 = 0 . 1 7 2 8\ \mathrm { m ^ { 2 } }$; $A _ { b } = 0 . 1 2 0 ^ { 2 } - 1 2 \times 0 . 0 0 1 5 \times 0 . 1 2 0 = 0 . 0 1 2 2 4\ \mathrm { m ^ { 2 } }$; $A _ { t } = 0 . 1 8 5 0\ \mathrm { m ^ { 2 } }$, $A _ { f } / A _ { t } = 0 . 9 3 4$.
$$
m = { \sqrt { \frac { 2 \times 3 8 } { 1 8 0 \times 0 . 0 0 1 5 } } } = 1 6 . 7 8 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 1 6 . 7 8 \times 0 . 0 6 0 7 5 = 1 . 0 1 9 , \qquad \eta _ { f } = { \frac { \tanh 1 . 0 1 9 } { 1 . 0 1 9 } } = 0 . 7 5 5
$$
$$
\eta _ { o } = 1 - 0 . 9 3 4 \times 0 . 2 4 5 = 0 . 7 7 1 \qquad \Longrightarrow \qquad R _ { \text{sink} } = { \frac { 1 } { 0 . 7 7 1 \times 3 8 \times 0 . 1 8 5 0 } } = \mathbf { 0 . 1 8 4 \ K / W }
$$
**(b) Eighteen fins of $1 . 0\ \mathrm{mm}$, pitch $6 . 7\ \mathrm{mm}$.** $A _ { f } = 1 8 \times 2 \times 0 . 0 6 0 \times 0 . 1 2 0 = 0 . 2 5 9 2\ \mathrm { m ^ { 2 } }$; $A _ { b } = 0 . 1 2 0 ^ { 2 } - 1 8 \times 0 . 0 0 1 0 \times 0 . 1 2 0 = 0 . 0 1 2 2 4\ \mathrm { m ^ { 2 } }$; $A _ { t } = 0 . 2 7 1 4\ \mathrm { m ^ { 2 } }$, $A _ { f } / A _ { t } = 0 . 9 5 5$. The denser array runs at $h \approx 4 2$.
$$
m = { \sqrt { \frac { 2 \times 4 2 } { 1 8 0 \times 0 . 0 0 1 } } } = 2 1 . 6 0 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 2 1 . 6 0 \times 0 . 0 6 0 5 = 1 . 3 0 7 , \qquad \eta _ { f } = 0 . 6 6 1
$$
$$
\eta _ { o } = 1 - 0 . 9 5 5 \times 0 . 3 3 9 = 0 . 6 7 6 \qquad \Longrightarrow \qquad R _ { \text{sink} } = { \frac { 1 } { 0 . 6 7 6 \times 4 2 \times 0 . 2 7 1 4 } } = \mathbf { 0 . 1 3 0 \ K / W }
$$
**Same metal, same height, same footprint: $30\ \%$ less sink resistance and a junction $3.3\ \mathrm{K}$ cooler** ($T _ { j } = 4 5 + 6 0 \times ( 0 . 1 3 0 + 0 . 6 0 ) = 8 8 . 8\ {} ^ { \circ } \mathrm { C }$ against $4 5 + 6 0 \times ( 0 . 1 8 4 + 0 . 6 0 ) = 9 2 . 1\ {} ^ { \circ } \mathrm { C }$). **The extra area is worth more than the efficiency it costs: the thinner array gains $5 0\ \%$ in fin area and loses $1 2\ \%$ in fin efficiency.**
**Now the two caveats that stop this being a recipe.** First, the bare base would give $R = 1 / ( 4 2 \times 0 . 0 1 4 4 ) = 1 . 6 5\ \mathrm { K / W }$, so the fins cut the sink resistance by a factor of $1 3$ — **and the $0 . 6 0\ \mathrm { K / W }$ of interface and package now owns $8 2\ \%$ of the remaining temperature rise, so the next few kelvin will have to come from a better interface, not better fins.** Second, the $1 . 0\ \mathrm{mm}$ fins at $6 . 7\ \mathrm{mm}$ pitch are thin, tall and fragile, and they are a dust trap; **extruded heat-sink fins are usually thicker than the thermal optimum for reasons of extrusion, handling and robustness, not heat transfer.**
:::
:::

::: definition The optimum spacing of a fin array {#def-spacing}
Nothing in the fin equations fixes the pitch. What fixes it is that **$h$ is not independent of the pitch**: as fins are brought together their boundary layers merge, the fluid between them stops being swept, and the coefficient falls. A usable model, correct in both limits, is
$$
h ( S ) \approx h _ { \infty } \, \frac { S ^ { 2 } } { S ^ { 2 } + S _ { m } ^ { 2 } } , \qquad S _ { m } \sim \frac { 2 k _ { f } } { h _ { \infty } }
$$
where $S$ is the gap between adjacent fins, $h _ { \infty }$ is the isolated-fin coefficient and $S _ { m }$ is the gap at which adjacent films just meet. The heat rejected per unit **plan** area of a plate-fin array of height $L$ and thickness $t$ is then
$$
q ^ { \prime \prime } = h ( S ) \, \eta _ { f } \, { \frac { 2 L } { S + t } } \, \Delta T \qquad \Longrightarrow \qquad { \frac { d q ^ { \prime \prime } } { d S } } = 0 \quad \Longrightarrow \quad S _ { \text{opt} } ^ { 3 } - S _ { \text{opt} } S _ { m } ^ { 2 } - 2 S _ { m } ^ { 2 } t = 0
$$
$$
\boxed { \; S _ { \text{opt} } \approx ( 1 . 0 \text{ to } 1 . 2 ) \, S _ { m } \approx { \frac { 2 k _ { f } } { h _ { \infty } } } \; } \qquad \text{and } q ^ { \prime \prime } \text{ varies by less than } 1 0 \ \% \text{ over } 0 . 7 S _ { \text{opt} } < S < 1 . 6 S _ { \text{opt} }
$$
**The rule is one line and it is worth more than the derivation: the optimum fin pitch is about twice the equivalent conduction film thickness of the fluid, $k _ { f } / h$.** For air at $k _ { f } = 0 . 0 2 6$ :
$$
\begin{array}{l c c l}
h \left( \mathrm { W / m ^ { 2 } K } \right) & S _ { \text{opt} } & \text{typical application} \\
5 \text{ to } 8 \text{ (natural convection) } & 7 \text{ to } 1 0 \ \mathrm { m m } & \text{extruded natural-convection sinks, power resistors} \\
2 0 \text{ (gentle fan) } & 2 . 6 \ \mathrm { m m } & \text{low-profile forced-air sinks} \\
4 0 \text{ (3 m/s axial fan) } & 1 . 3 \ \mathrm { m m } & \text{CPU and inverter sinks, skived fins} \\
5 0 0 0 \text{ (water, } k _ { f } = 0 . 6 \text{) } & 0 . 2 4 \ \mathrm { m m } & \text{microchannel cold plates, } 0 . 2 \text{ to } 0 . 5 \ \mathrm { m m }
\end{array}
$$
**The last row needs the water's own conductivity, $k_f = 0.6$, not the air's.** With it the rule asks for channels about a quarter of a millimetre wide — which is exactly the scale of a **microchannel** cold plate, bought at the price of a real pressure drop and a real fouling problem. **The general statement is that extended surfaces pay for themselves roughly in proportion to $1/\sqrt{h}$ (the effectiveness), so in liquids the fins must be short, thick relative to their height, and closely spaced.**
:::

::: widget plot
title: Heat rejected per unit plan area against fin pitch
f: 5.5*x*x/(x*x+104.04)*(100/(x+1))*tanh(0.05*sqrt(11.111*5.5*x*x/(x*x+104.04)))/(0.05*sqrt(11.111*5.5*x*x/(x*x+104.04)))
x: 1, 30
y: 0, 26
caption: Natural-convection plate-fin array, fins $5 0\ \mathrm{mm}$ tall and $1\ \mathrm{mm}$ thick in aluminium, isolated-fin coefficient $h _ { \infty } = 5 . 5\ \mathrm { W / m ^ { 2 } K }$ and air at $k_f = 0.028$ so that $S _ { m } = 2 k_f / h _ { \infty } = 1 0 . 2 \ \mathrm { m m }$; the horizontal axis is the gap $S$ in millimetres. The vertical axis is $h ( S ) \, \eta _ { f } \, ( 2 L / ( S + t ) )$ in $\mathrm { W / m ^ { 2 } K }$ per unit plan area. **The peak is $2 4\ \mathrm { W / m ^ { 2 } K }$ at a gap of about $1 1 \ \mathrm { m m }$ — the root of the cubic above, $S_{\text{opt}} = 11.1\ \mathrm{mm} = 1.09\,S_m$ — and the curve is within $10\ \%$ of the peak from $7\ \mathrm{mm}$ to $1 7 \ \mathrm{mm}$.** **Read the left-hand cliff, not the peak: at a $4\ \mathrm{mm}$ gap the array rejects $1 5\ \mathrm { W / m ^ { 2 } K }$, $3 9\ \%$ less than it could, and the loss is entirely the merged boundary layers.** **The flat top is the practical lesson: a heat-sink catalogue that offers you $8$, $1 0$ and $1 2\ \mathrm{mm}$ pitch is offering you the same part three times, and you should choose on dust, on cost per square metre of fin, and on whether a finger can clean it.**
:::

::: example A fin that is 60 per cent efficient and completely correct {#ex-60}
A stainless steel ($k = 1 6 \ \mathrm { W / m \, K }$) fin of thickness $1 . 5\ \mathrm{mm}$ and height $2 5\ \mathrm{mm}$ sits in a duct where $h = 4 5 \ \mathrm { W / m ^ { 2 } K }$. Its efficiency is $0 . 5 8$. Should it be replaced?

::: solution
Compute the other number before answering. Effectiveness for a rectangular fin, with $m L_c = 1.58$ from [[#ex-ss]]:
$$
\varepsilon _ { f } = { \sqrt { \frac { 2 k } { h t } } } \tanh m L _ { c } = { \sqrt { \frac { 3 2 } { 4 5 \times 0 . 0 0 1 5 } } } \times 0 . 9 1 8 = 2 1 . 8 \times 0 . 9 1 8 = 2 0 . 0
$$
**Replace nothing.** The fin throws $5 8\ \%$ as much as an isothermal fin of the same shape, and twenty times as much as the $1 . 5\ \mathrm{mm}$ strip of wall it occupies. **The efficiency is low because the metal is bad at conducting, not because the fin is badly proportioned** — and the ways to fix a low-efficiency fin are, in order of cost-effectiveness: **make it shorter** ($m L _ { c }$ from $1 . 5 8$ to $0 . 8 1$ by halving the height, $\eta _ { f }$ to $0 . 8 3$, at the price of half the area), **make it thicker** ($t$ to $8\ \mathrm{mm}$: $\eta _ { f } = 0 . 8 4$, at the price of five times the mass and five times fewer fins per metre), or **change the metal** (copper at $k = 4 0 1$ gives $\eta _ { f } = 0 . 9 7$, if the service conditions allow copper at all).
**The reason the fin is stainless in the first place is almost always corrosion, temperature or strength — and in all three cases the material is not negotiable, so the only lever is geometry.** **The correct design move is the one the efficiency number points at and the effectiveness number permits: keep the stainless, and shorten the fins until $m L _ { c } \approx 1$.**
:::
:::

## Two-dimensional conduction

::: definition The flux plot (flow net) {#def-fluxplot}
For steady two-dimensional conduction with no generation, $T$ satisfies Laplace's equation, and its solution can be **drawn**. Isotherms and adiabats (heat-flow lines) intersect at right angles, and where the spacing is chosen so that each element is a curvilinear **square**, the whole problem reduces to counting:
$$
\boxed { \; q = { \frac { M } { N } } \, k \, \Delta T \, w \; }
$$
where $M$ is the number of flow channels, $N$ the number of temperature increments, and $w$ the thickness normal to the plane of the plot. **The comparison with $q = S k \Delta T w$ identifies $M / N$ as the shape factor per unit thickness** — so a flux plot is a shape-factor measurement made with a pencil, and it is accurate to $2$ to $5\ \%$ in competent hands.
**The construction rules are four, and the fourth is the one that catches people.**
**(i) Draw the adiabats first where the symmetry demands them**, not where they are convenient: a line of symmetry in geometry and temperature is an adiabat, and an isothermal boundary is an isotherm.
**(ii) Make the squares square.** A curvilinear square has approximately equal diagonal lengths; check by drawing both diagonals of a sample of cells.
**(iii) Refine where the squares get small**, because that is where the flux is highest and where the answer is decided.
**(iv) Count $M$ and $N$ on the whole domain, not on a quarter of it** — or count on the quarter and multiply $M$ by the number of symmetric repetitions while leaving $N$ alone. **Multiplying both by four is the classic error and it is invisible on the drawing.**
:::

::: definition Spreading resistance {#def-spreading}
When heat generated in a small region must enter a large body, the flow lines diverge and the resistance is far larger than the one-dimensional estimate $L / ( k A )$ would suggest. For a small isothermal source of area $A _ { s }$ on the surface of a **half-space** of conductivity $k$,
$$
\boxed { \; R _ { \text{spread} } = { \frac { 1 } { 4 k { \sqrt { A _ { s } / \pi } } } } \; } \qquad \text{(half-space, source on the surface)}
$$
**The result is independent of the source shape to within a few per cent once the shape is roundish, and it has two properties that dominate electronics thermal design.**
**(i) It does not contain the thickness of the body.** Once a lid is several source-sizes thick and wide it behaves as a half-space, and making it thicker still changes the spreading resistance hardly at all — **which is why "make the lid thicker" is so often a useless response to a hot spot.** (A lid much thinner than the source size is a different matter: there the spreading resistance rises as the lid thins.)
**(ii) It goes as $1 / \sqrt { A _ { s } }$, not $1 / A _ { s }$.** **Doubling the side of a square source halves the spreading resistance; doubling its area only reduces it by $29\ \%$.** The corollary is the one that gets built: **the cheapest large reduction is to make the heat arrive over a larger area in the first place**, which is what a vapour chamber, a copper lid or a graphite spreader does: each moves the isotherm outward before the heat enters the main path.
:::

::: example The hot spot under a die {#ex-spread}
A $3 \times 3 \ \mathrm{mm}$ silicon die dissipates $1 8 \ \mathrm{W}$ uniformly and is soldered to a $5\ \mathrm{mm}$ thick, $4 0 \times 4 0 \ \mathrm{mm}$ copper lid ($k = 4 0 1 \ \mathrm { W / m \, K }$), whose outer face is cooled at $h = 9 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ by a cold plate at $4 0 \ {} ^ { \circ } \mathrm { C }$. Estimate the temperature difference between the die and the cold plate.

::: solution
**Three resistances in series.** Spreading from the die into the lid, bounded by the half-space value:
$$
a = { \sqrt { \frac { 9 \times 1 0 ^ { - 6 } } { \pi } } } = 1 . 6 9 3 \times 1 0 ^ { - 3 } \ \mathrm { m } , \qquad R _ { \text{spread} } \le { \frac { 1 } { 4 \times 4 0 1 \times 1 . 6 9 3 \times 1 0 ^ { - 3 } } } = 0 . 3 6 8 \ \mathrm { K / W }
$$
One-dimensional through the lid, $R = t / ( k A ) = 0 . 0 0 5 / ( 4 0 1 \times 0 . 0 0 1 6 ) = 0 . 0 0 7 8 \ \mathrm { K / W }$. Cold-plate film, $R = 1 / ( 9 0 0 0 \times 0 . 0 0 1 6 ) = 0 . 0 6 9 4 \ \mathrm { K / W }$.
$$
\Delta T = 1 8 \times ( 0 . 3 6 8 + 0 . 0 0 7 8 + 0 . 0 6 9 4 ) = 1 8 \times 0 . 4 4 5 = \mathbf { 8 . 0 \ K } , \qquad T _ { \text{die} } \approx 4 8 \ {} ^ { \circ } \mathrm { C }
$$
**The spreading term is $8 3\ \%$ of the total, the $5\ \mathrm{mm}$ of copper lid contributes $1 . 8\ \%$, and the very expensive cold plate contributes $1 6\ \%$.** **This is the arithmetic behind every lid, spreader and vapour chamber in the industry: the way to fix a hot spot is not to make the conduction path shorter or the coolant colder, it is to make the source thermally bigger — that is, to spread the heat before it has to conduct through.** A vapour-chamber lid with an effective in-plane conductivity of order $5 0 0 0 \ \mathrm { W / m \, K }$ would, by the same half-space estimate, cut the spreading term to about $0 . 0 3 \ \mathrm { K / W }$ and moves the whole $8\ \mathrm{K}$ problem into the interface and the cold plate, where it can be attacked with grease and flow rate.
:::
:::

## Doing it yourself

::: exercise An aluminium fin in still air {#ex-al level=1 check="0.995"}
A flat aluminium fin ($k = 1 8 0 \ \mathrm { W / m \, K }$) is $1 . 0 \ \mathrm{mm}$ thick and $1 2 \ \mathrm{mm}$ tall, and the surrounding air gives $h = 8 \ \mathrm { W / m ^ { 2 } K }$. What is its efficiency?

::: solution
For a plate fin of unit depth, $P = 2$ and $A _ { c } = t$:
$$
m = { \sqrt { \frac { 2 h } { k t } } } = { \sqrt { \frac { 1 6 } { 1 8 0 \times 0 . 0 0 1 } } } = 9 . 4 3 \ \mathrm { m ^ { - 1 } } , \qquad L _ { c } = 0 . 0 1 2 5 \ \mathrm { m } , \qquad m L _ { c } = 0 . 1 1 8
$$
$$
\eta _ { f } = { \frac { \tanh 0 . 1 1 8 } { 0 . 1 1 8 } } = \mathbf { 0 . 9 9 5 }
$$
**Effectively perfect, and that is the normal answer for aluminium in air.** The fin's own length scale $1/m = 106\ \mathrm{mm}$ is nearly nine times its height, so the temperature barely falls along it. **The corollary is that in air, aluminium fins are limited by how much area you can buy, not by how well the area works — which is exactly the situation the optimum-spacing rule is about.**
:::
:::

::: exercise The same fin in stainless steel {#ex-ss level=1 check="0.58"}
A stainless steel fin ($k = 1 6 \ \mathrm { W / m \, K }$) is $1 . 5 \ \mathrm{mm}$ thick and $2 5 \ \mathrm{mm}$ tall in a duct at $h = 4 5 \ \mathrm { W / m ^ { 2 } K }$. What is its efficiency?

::: solution
$$
m = { \sqrt { \frac { 2 \times 4 5 } { 1 6 \times 0 . 0 0 1 5 } } } = { \sqrt { 3 7 5 0 } } = 6 1 . 2 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 6 1 . 2 \times 0 . 0 2 5 7 5 = 1 . 5 8
$$
$$
\eta _ { f } = { \frac { \tanh 1 . 5 8 } { 1 . 5 8 } } = { \frac { 0 . 9 1 8 } { 1 . 5 8 } } = \mathbf { 0 . 5 8 }
$$
**A ninth of the conductivity, $5.6$ times the surface coefficient and a thicker, taller fin combine to move the parameter from $m L _ { c } = 0 . 1 2$ in [[#ex-al]] to $1 . 5 8$ — a factor of thirteen, and $4 1$ percentage points of efficiency.** **A rule of thumb: a fin is only as good as $k / ( h t )$ allows, and since $1/m \propto \sqrt{k}$, switching from aluminium to stainless at the same $h$ and thickness cuts the usable fin height by a factor of about three.**
:::
:::

::: exercise How much is that stainless fin worth? {#ex-effec level=1 check="20.0"}
For the stainless fin of [[#ex-ss|the stainless-fin exercise]], what is its effectiveness relative to the bare wall it stands on (adiabatic-tip result with the corrected length)?

::: solution
For a rectangular fin of unit depth, $P = 2$ and $A _ { c } = t$, and $m L_c = 1.58$:
$$
\varepsilon _ { f } = { \sqrt { \frac { P k } { h A _ { c } } } } \tanh m L _ { c } = { \sqrt { \frac { 2 \times 1 6 } { 4 5 \times 0 . 0 0 1 5 } } } \times 0 . 9 1 8 = 2 1 . 8 \times 0 . 9 1 8 = \mathbf { 2 0 . 0 }
$$
**Twenty times the bare wall, at $5 8\ \%$ efficiency** (the long-fin limit alone would give $21.8$). **The two numbers are not in conflict: efficiency asks how well the fin's own area is used, effectiveness asks whether the fin should exist, and the second question is the one that has to be answered first.** **The formula also shows why effectiveness improves as $h$ falls: $\varepsilon _ { f } \propto 1 / { \sqrt { h } }$, so in the long-fin limit the same fin in still air at $h = 6$ would reach about $6 0$ instead of $2 2$ — extended surfaces are a remedy whose potency is greatest exactly where the underlying disease is worst.**
:::
:::

::: exercise An annular fin on a pipe {#ex-ann level=2 check="0.92"}
A steel ($k = 1 6 \ \mathrm { W / m \, K }$) annular fin of thickness $1 . 5 \ \mathrm{mm}$ runs from $r _ { 1 } = 1 5 \ \mathrm { m m }$ to $r _ { 2 } = 2 5 \ \mathrm { m m }$, with $h = 2 0 \ \mathrm { W / m ^ { 2 } K }$. Estimate its efficiency.

::: solution
Use Schmidt's approximation with the corrected radius and length:
$$
L _ { c } = 0 . 0 1 0 + 0 . 0 0 0 7 5 = 0 . 0 1 0 7 5 \ \mathrm { m } , \qquad m = { \sqrt { \frac { 2 \times 2 0 } { 1 6 \times 0 . 0 0 1 5 } } } = 4 0 . 8 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 0 . 4 3 9
$$
$$
\psi = 1 + 0 . 3 5 \ln \left( { \frac { 0 . 0 2 5 7 5 } { 0 . 0 1 5 } } \right) = 1 + 0 . 3 5 \times 0 . 5 4 0 = 1 . 1 8 9 , \qquad m L _ { c } \psi = 0 . 5 2 2
$$
$$
\eta _ { f } = { \frac { \tanh 0 . 5 2 2 } { 0 . 5 2 2 } } = \mathbf { 0 . 9 2 }
$$
**Compare with [[#ex-ss|the stainless-fin exercise]]: a straight fin of the same metal and thickness at a higher coefficient ($h = 4 5$) reaches only $0 . 5 8$ at $2 5 \ \mathrm{mm}$, while this annular fin at $h = 2 0$ reaches $0 . 9 2$ at $1 0 \ \mathrm{mm}$.** That is the shorter fin and the lower $h$; the annular geometry itself works the other way, $\psi = 1.19$ making the fin behave as though it were $19\ \%$ longer. Without $\psi$, a straight fin with $m L_c = 0.439$ would be $0.94$ efficient.
:::
:::

::: exercise The array, not the fin {#ex-array level=1 check="0.83"}
A heat sink's fins account for $9 2\ \%$ of its total surface area and have an efficiency of $0 . 8 2$. What is the overall surface efficiency?

::: solution
$$
\eta _ { o } = 1 - { \frac { A _ { f } } { A _ { t } } } \left( 1 - \eta _ { f } \right ) = 1 - 0 . 9 2 \times 0 . 1 8 = \mathbf { 0 . 8 3 }
$$
**The bare base changes the answer only a little: had the fins been $80\ \%$ of the area instead of $92\ \%$, $\eta _ { o }$ would be $0 . 8 6$.** **The formula is a warning about where to look.** In a dense array the whole surface is the fins, so any improvement must come from $\eta _ { f }$ — thicker metal, shorter fins, or a better conductivity — and **the corollary is the one that saves the most money: if you are choosing between a better fin material and a better base joint in a dense array, you are choosing between something that affects $92\ \%$ of the surface and something that affects $8\ \%$ of it.**
:::
:::

::: exercise A flux plot for a bracket {#ex-net level=2 check="12"}
A concrete bracket of thickness $2 0 0 \ \mathrm{mm}$ normal to the plane of the plot and conductivity $1 . 2 \ \mathrm { W / m \, K }$ is solved by a flow net with $8$ flow channels and $1 6$ temperature increments between faces held $1 0 0 \ \mathrm{K}$ apart. What is the heat flow, in W?

::: solution
$$
q = { \frac { M } { N } } \, k \, \Delta T \, w = { \frac { 8 } { 1 6 } } \times 1 . 2 \times 1 0 0 \times 0 . 2 0 0 = \mathbf { 1 2 \ W }
$$
**The shape factor is $M / N = 0 . 5$ per unit thickness, i.e. $S = 0 . 1 0 \ \mathrm { m }$ for this bracket.** **Two checks worth running on any hand-drawn net.** First, **count on the whole domain**: if the net was drawn on a quarter by symmetry, $M$ is $4 \times 8 = 3 2$ and $N$ is still $1 6$, giving $q = 4 8 \ \mathrm{W}$, and the error of multiplying both by four is a factor of four. Second, **the net must be square everywhere**: if the cells near the hot corner are visibly elongated, the local flux is under-counted and the total will be low. **A flux plot takes twenty minutes and is good to a few per cent; a coarse finite-element model of the same bracket takes the same twenty minutes and is good to ten per cent if the mesh was thought about, and the flow net has the advantage that you can see where it is wrong.**
:::
:::

::: exercise Spreading a smaller source {#ex-spread2 level=2 check="0.37"}
A square heat source $3 . 0 \times 3 . 0 \ \mathrm{mm}$ sits on the surface of a large copper block ($k = 4 0 1 \ \mathrm { W / m \, K }$). Estimate the spreading resistance, in K/W.

::: solution
$$
a = { \sqrt { \frac { A _ { s } } { \pi } } } = { \sqrt { \frac { 9 . 0 \times 1 0 ^ { - 6 } } { \pi } } } = 1 . 6 9 3 \times 1 0 ^ { - 3 } \ \mathrm { m } , \qquad R _ { \text {spread } } = { \frac { 1 } { 4 k a } } = { \frac { 1 } { 4 \times 4 0 1 \times 1 . 6 9 3 \times 1 0 ^ { - 3 } } } = \mathbf { 0 . 3 7 \ K / W }
$$
**At $1 8 \ \mathrm{W}$ that is $6 . 6 \ \mathrm{K}$ — more than a typical cold plate's whole drop.** **Now halve the source to $1 . 5 \times 1 . 5 \ \mathrm{mm}$, which quarters the area:** $a$ halves and $R$ doubles to $0 . 7 4 \ \mathrm { K / W }$. **The scaling $R \propto 1 / \sqrt { A _ { s } }$ means that concentrating the same power into a smaller source raises its spreading temperature rise: a quarter of the area doubles it.** Spreader lids and vapour chambers work by enlarging the effective source area before the heat enters the main conduction path.
:::
:::

::: exercise Doubling the fin height {#ex-double level=2 check="1.26"}
The $1 . 5 \ \mathrm{mm}$ aluminium fins of [[#ex-sink|the two-heat-sink example]] stand $6 0 \ \mathrm{mm}$ tall in air at $h = 3 8 \ \mathrm { W / m ^ { 2 } K }$. By what factor does the heat rejected by one fin increase if the height is doubled to $1 2 0 \ \mathrm{mm}$?

::: solution
$m = 1 6 . 7 8 \ \mathrm { m ^ { - 1 } }$ either way, and $q \propto \tanh m L _ { c }$:
$$
m L _ { c 1 } = 1 6 . 7 8 \times 0 . 0 6 0 7 5 = 1 . 0 1 9 \quad \Longrightarrow \quad \operatorname { t a n h } = 0 . 7 6 9
$$
$$
m L _ { c 2 } = 1 6 . 7 8 \times 0 . 1 2 0 7 5 = 2 . 0 2 6 \quad \Longrightarrow \quad \operatorname { t a n h } = 0 . 9 6 6 \qquad \Longrightarrow \qquad \mathbf { 1 . 2 6 }
$$
**Twenty-six per cent more heat for twice the metal and twice the height of the enclosure.** **Double it again to $2 4 0 \ \mathrm{mm}$ and the answer is $1 . 3 0$ — the fin has asymptoted, because a long fin's heat flow is $\sqrt { h P k A _ { c } } \, \Delta T$ and contains no length at all.** **The same arithmetic in the other direction is the better design move: cutting to $3 0 \ \mathrm{mm}$ keeps $6 1\ \%$ of one fin's output while halving its metal, so twice as many fins fit across the same base — and the array then rejects $2 3\ \%$ more heat for exactly the same mass of aluminium.** **This assumes $h$ is unchanged: in forced air at $h \approx 38$ the spacing rule gives $2 k_f / h \approx 1.4\ \mathrm{mm}$, so halving the pitch from $10$ to $5\ \mathrm{mm}$ (a $3.5\ \mathrm{mm}$ gap) still leaves the boundary layers apart — though the fan's pressure drop rises, and that must be checked.** Fins sized by what the extrusion press can do rather than by $1 / m$ are a common waste.
:::
:::

::: quiz The good fin {#quiz-good}
A fin has an efficiency of $0 . 5 8$ and an effectiveness of $2 4$. A second fin has an efficiency of $0 . 9 7$ and an effectiveness of $1 . 6$. Both occupy the same base area. Which should be installed?

- [ ] The second, because $9 7\ \%$ efficient metal is obviously better than $5 8\ \%$ efficient metal
- [x] The first, because effectiveness — the heat carried relative to the bare base it covers — is what decides whether a fin is worth installing
- [ ] Either: the two numbers are two ways of measuring the same thing
- [ ] Neither: any fin below $60\ \%$ efficiency should be redesigned first

::: solution
**The first, and the reason is effectiveness.** The first fin throws $2 4$ times what the bare base would; the second throws $1 . 6$ times. **The second fin's high efficiency is the diagnosis of its own failure: $\eta _ { f } \to 1$ means $m L \ll 1$, a short, fat fin that is nearly isothermal but adds very little area to the base it covers — and an effectiveness of $1.6$ says exactly that.**
**The two numbers are not two measures of one thing: $\eta _ { f }$ is a property of the fin's shape and $\varepsilon _ { f }$ is a property of the decision.** **The trap the question sets is the word "efficient": in ordinary speech a $5 8\ \%$ efficient anything is a bad anything, and in fin work a $5 8\ \%$ efficient fin is often the better fin.**
:::
:::

::: quiz The dense heat sink {#quiz-dense}
A natural-convection heat sink has fins $5 0 \ \mathrm{mm}$ tall, $1 \ \mathrm{mm}$ thick and $3 \ \mathrm{mm}$ apart. A colleague proposes a version with the same base and the same fin height but $1 0 \ \mathrm{mm}$ spacing, at roughly one third the number of fins. What happens?

- [ ] It gets worse, because two thirds of the surface area is lost
- [x] It gets better, and by a large factor, because at $3 \ \mathrm{mm}$ pitch the boundary layers have merged and most of the area is not being used
- [ ] It is unchanged, because the product of area and coefficient is fixed
- [ ] It depends on the ambient temperature

::: solution
**It gets much better.** For natural convection in air the optimum gap is $S _ { \text{opt} } \approx 2 k _ { f } / h _ { \infty } \approx 2 \times 0 . 0 2 8 / 5 . 5 \approx 1 0 \ \mathrm { m m }$, and with the model of the figure above (which has exactly these fins) the array at a $3 \ \mathrm{mm}$ gap rejects about $1 1 \ \mathrm { W / m ^ { 2 } K }$ per unit plan area against $2 4$ at $1 0 \ \mathrm{mm}$ — **under half of what the same base could do**. **Cutting the fin count to about a third removes two thirds of the area but multiplies the coefficient several times over, and the product rises by a factor of about $2 . 2$.** The fin efficiency falls slightly, since $m \propto \sqrt{h}$, but $50\ \mathrm{mm}$ aluminium fins stay above $90\ \%$ efficient at these coefficients.
**The reason the wrong answer is tempting is that it uses the right formula and the wrong $h$:** $R = 1 / ( \eta _ { o } h A _ { t } )$ says "less area, more resistance" **only if $h$ is a constant, and $h$ is not a constant across an array.** **The general lesson is the one this lesson exists to teach: a fin array is not a collection of independent fins, and any calculation that treats it as one will tell you to add fins for ever.**
:::
:::

## Where this lesson leads

Everything so far in this course has assumed that the surface exchanging heat is at one temperature and that the coefficient $h$ is a number handed to you. **Fins broke the first assumption — the surface temperature is now a function of position, determined by the same heat flux it is being used to compute — and the next four lessons exist to break the second.** The coefficient $h$ is the subject of convection, and convection is the solution of the momentum and energy equations together, with the fin's own temperature profile appearing as a boundary condition on the fluid. That coupling is why convection correlations are quoted for **constant surface temperature** or **constant heat flux**, and why a fin in a real array sits between the two: the base of a natural-convection fin is nearly isothermal and the tip is nearly adiabatic, and the correlation you use should be the one whose assumption you are closest to.

Two threads from this lesson run forward. **The optimum-spacing result is the first example in this course of a design optimum that comes from the physics rather than from a cost function** — the boundary layers merge, and there is a real maximum in the heat per unit plan area, not a compromise between two budgets. The same structure reappears in the microchannel design of the internal-convection lesson, in the fin-and-tube geometry of the heat-exchanger lesson, and in a general form in Bejan's volume-to-point problem: **given a volume that generates heat and one place to put it, the optimal distribution of conductivity is a tree.** The second thread is the spreading resistance, which is the reason the whole of modern electronics cooling is a story about moving heat sideways rather than through.

And one warning is worth repeating, because it is the most common error in the field. **A fin array is not a fin.** The efficiency formulas above are for an isolated fin in an undisturbed stream, and in a dense array the stream is disturbed, the coefficient is lower, the base is hotter, and the whole calculation must be done against measured array data. **Catalogue curves for heat sinks are array measurements, not fin calculations, and the moment you find yourself computing a fin efficiency to check a catalogue number you should ask whether the catalogue's $h$ was measured at your flow rate, in your orientation, with your cable in the way.**

::: history
| Year | Event |
|---|---|
| 1804, 1822 | **Jean-Baptiste Biot** measures the steady temperatures along an iron bar heated at one end and finds them falling off geometrically with distance; **Joseph Fourier**'s *Théorie analytique de la chaleur* gives the exponential solution for a thin bar losing heat from its surface — the fin equation of this lesson. |
| 1926 | **Ernst Schmidt**, "Die Wärmeübertragung durch Rippen", *Zeitschrift des VDI* — asks which fin profile carries a given heat flow with the least material, and finds that it is, to a first approximation, parabolic: the start of optimum-fin theory. |
| 1942 | **W. Elenbaas**, "Heat dissipation of parallel plates by free convection", *Physica* 9 — measurements on vertical parallel-plate channels that show the maximum in heat dissipation against spacing on which natural-convection heat-sink design still rests. |
| 1945 | **K. A. Gardner**, "Efficiency of extended surface", *Transactions of the ASME* 67 — the general solutions and efficiency charts for straight, annular and tapered fins that the textbooks reproduce. |
| 1984 | **A. Bar-Cohen and W. M. Rohsenow**, "Thermally optimum spacing of vertical, natural convection cooled, parallel plates", *Journal of Heat Transfer* 106 — composite correlations for the channel and the optimum spacing for several thermal boundary conditions. |
| 1997 | **Adrian Bejan** poses the volume-to-point problem — how to arrange a small amount of high-conductivity material to cool a heat-generating volume through one point — and finds tree-shaped paths, the starting point of what he calls constructal theory. |
:::

::: summary
- **The fin equation is $\theta ^ { \prime \prime } = m ^ { 2 } \theta$ with $m = \sqrt { h P / k A _ { c } }$**, and $1 / m$ is the distance over which the fin's excess temperature dies. **A fin several times longer than $1 / m$ is decoration.**
- **Efficiency $\eta _ { f } = \tanh m L _ { c } / m L _ { c }$ measures the metal; effectiveness $\varepsilon _ { f } = \sqrt { P k / h A _ { c } } \tanh m L_c$ measures the decision.** Answer the second question first, and never reject a fin for being $6 0 \ \%$ efficient.
- **A common design window is $m L _ { c } \approx 0 . 5$ to $1 . 0$, $\eta _ { f } \approx 0 . 9 2$ to $0 . 7 6$.** Well below it the fin is nearly isothermal and could be taller or thinner; well above it the tip does little.
- **Effectiveness goes as $1 / \sqrt { h }$.** Fins are the remedy for a bad fluid: for a $1\ \mathrm{mm}$ aluminium fin, up to $2 4 5$ times in still air, $1 1$ times in water, $6$ times in boiling water.
- **An array is $\eta _ { o } = 1 - ( A _ { f } / A _ { t } ) ( 1 - \eta _ { f } )$, and in a dense array the base is irrelevant.** Everything is the fins, and the joint under the base is a separate resistance that no fin can help.
- **Optimum pitch is $S \approx 2 k _ { f } / h _ { \infty }$** — about $1 0 \ \mathrm{mm}$ for natural convection in air, $1 . 3 \ \mathrm{mm}$ at $h = 40$, and about $0 . 2 5 \ \mathrm{mm}$ in water — the scale of microchannel cold plates.
- **The optimum is flat.** From about two-thirds to one and a half times the best gap the performance changes by less than $10\ \%$, so choose the sink that fits, cleans and costs least.
- **Doubling a fin's height buys $\tanh$ of the increase, not the increase**: $+ 2 6\ \%$ for a fin at $m L _ { c } = 1 . 0$, and $+ 3 . 7 \ \%$ for one at $m L _ { c } = 2$.
- **A flux plot gives $q = ( M / N ) k \Delta T w$** by counting curvilinear squares, is good to a few per cent, and identifies $M / N$ as the shape factor per unit thickness.
- **Spreading resistance into a half-space is $1 / ( 4 k \sqrt { A _ { s } / \pi } )$**, independent of the body's thickness once it is several source-sizes thick. A thicker lid does little for a hot spot; a bigger effective source area does a lot.
:::

## Further reading

- **F. P. Incropera, D. P. DeWitt, T. L. Bergman & A. S. Lavine**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — Chapter 3 on fins including the annular-fin figure and the optimum-fin-length discussion, and Chapter 9 for natural-convection fin arrays.
- **A. D. Kraus, A. Aziz & J. Welty**, *Extended Surface Heat Transfer* (Wiley, 2001) — the monograph on fins: profiles, boundary conditions, arrays and approximations, with their accuracy stated.
- **K. A. Gardner**, "Efficiency of extended surface", *Transactions of the ASME* 67 (1945) — short, and the source of the classic efficiency charts.
- **A. Bar-Cohen & W. M. Rohsenow**, "Thermally optimum spacing of vertical, natural convection cooled, parallel plates", *J. Heat Transfer* 106 (1984) — the optimum-spacing correlations.
- **W. Elenbaas**, "Heat dissipation of parallel plates by free convection", *Physica* 9 (1942) — the measurements behind the rule of thumb.
- **D. Q. Kern**, *Process Heat Transfer* (McGraw-Hill, 1950; reprinted) — fin efficiency in exchanger service, including finned double-pipe exchangers.
- **A. Bejan & S. Lorente**, *Design with Constructal Theory* (Wiley, 2008) — tree-shaped conducting paths and fin assemblies treated as a design method.
- **JEDEC JESD51 series** — the thermal test standards for integrated-circuit packages: how junction-to-case and junction-to-ambient resistances are measured, and why numbers from different test conditions are not comparable.
