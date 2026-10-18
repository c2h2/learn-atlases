---
id: heat-transfer/fins
title: "Extended Surfaces and Two-Dimensional Conduction"
summary: "The fin equation, efficiency and effectiveness, why a 60 per cent efficient fin is still an excellent idea, the optimum spacing of a fin array, and the flux plot and shape-factor methods for two-dimensional conduction."
translated: false
tags: ["fin efficiency", "fin effectiveness", "annular fin", "flux plot", "spreading resistance", "heat sink"]
---

A fin is a wall that has been given more area, and the whole of fin theory is the accounting of what that area is really worth. The idea is obvious and the arithmetic is easy; what is not obvious is that **the added area is never fully effective**, because the heat has to travel along the fin to reach it, and the temperature at the end of the fin is lower than the temperature at its base, so the far end works less hard than the near end. The single number that measures this is the **fin efficiency**, the ratio of the heat the fin actually throws to the heat it would throw if the whole fin were at the base temperature, and it is the most misread quantity in thermal engineering.

The reason fins work at all is a comparison of two resistances. Conduction along a fin of cross-section $A_c$ and perimeter $P$ offers $L ^ { 2 } / ( k A _ { c } )$; convection from its surface offers $1 / ( h P L )$. Their ratio, squared, is the parameter that governs everything:
$$
m ^ { 2 } L ^ { 2 } = \frac { h P L ^ { 2 } / ( k A _ { c } ) } { 1 } \qquad \Longleftrightarrow \qquad m = \sqrt { \frac { h P } { k A _ { c } } }
$$
**When $mL \ll 1$ the fin is short and fat, its whole surface is near the base temperature, and it is doing nothing that a slightly thicker wall would not do. When $mL \gg 1$ the fin is long and thin, its temperature falls away within a short distance of the base, and most of its surface is at the ambient temperature and is doing nothing at all.** The useful range is $mL$ between about $0.3$ and $1.5$, and the whole craft of fin design is putting a piece of metal in that window.

Two consequences decide most real designs. **Fin effectiveness** — the ratio of the heat a fin carries to the heat the same base area would have carried without it — is $\sqrt { P k / ( h A _ { c } ) }$ for a long fin, and it is **large whenever $h$ is small**: fins are how you fix a bad fluid, which is why every air-cooled thing is bristling with metal and almost nothing water-cooled is. And **the optimum spacing of an array** is set not by the fins at all but by the boundary layers between them: **the pitch that works is of order twice the equivalent film thickness $k / h$, which is why natural-convection heat sinks have $8$ to $12\ \mathrm{mm}$ fin spacing and forced-air ones have $2$ to $3\ \mathrm{mm}$ — the same rule, applied to two values of $h$ that differ by a factor of eight.**

::: warning Five fin errors that are made in every industry
**Confusing efficiency with effectiveness.** A fin that is $60\ \ \%$ efficient and $22$ times more effective than the bare surface it replaces is a **good fin**: it is throwing $13\ \ \%$ more heat than a hypothetical perfect one would, and $2200\ \ \%$ more than the wall it stands on. **Efficiency measures the metal; effectiveness measures the decision.** **Judging a fin by its efficiency alone is like judging a power station by its copper losses and never asking what it generates.** **Assuming more fins are better.** For a long fin the dissipation is $\sqrt { h P k A _ { c } } \, \Delta T$ and **does not contain the length at all**: doubling a fin whose $mL > 2$ buys a few per cent and doubles the mass. In an array, adding fins at fixed pitch adds area and then stops, because the boundary layers merge and $h$ collapses. **The optimum spacing of a natural-convection heat sink is broad and flat — within $\pm 40\ \ \%$ of the optimum pitch the performance changes by less than $10\ \ \%$ — so buy the sink that fits and stop optimising.** **Ignoring the base.** A fin is attached, and the attachment has a contact resistance. A typical pressed-in or epoxied fin array has an interface conductance of $3000$ to $8000\ \mathrm { W / m ^ { 2 } K }$, which on a $0.08\ \mathrm { m ^ { 2 } }$ fin array at an effective $h$ of $40\ \mathrm { W / m ^ { 2 } K }$ is $0.4\ \ \%$ of the resistance — invisible. **On the same array cooled by natural convection at $h = 5$ it is $3\ \%$, and on a fin soldered to a heat pipe with a $25\ \mu\mathrm{m}$ air gap it is the whole design.** **Using a one-dimensional fin equation on a fin that is not thin.** The fin equation assumes the temperature is uniform across the thickness, which requires the Biot number on the half-thickness, $h t / 2 k$, to be small. For aluminium in air it is $1 0 ^ { - 4 }$ and the assumption is superb. **For a thin stainless or titanium fin in boiling water it is not, and for a polymer fin it never was** — and the correction is not to solve the fin equation better but to stop using it. **Assuming the fin tip does not matter.** For a fin of thickness $t$ the tip carries roughly $t / ( 2 L )$ of the total, which is negligible for a plate fin and **not** negligible for a pin fin that is as thick as it is long. The standard remedy, the **corrected length** $L _ { c } = L + t / 2$, is a one-line fix and is always worth taking.
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
**(ii) The transverse gradient has been assumed away.** The derivation used a one-dimensional conduction term across $d x$ only. The error this introduces is of order the Biot number on the half-thickness, $h t / 2 k$: **for aluminium in air, $1 0 ^ { - 4 }$; for aluminium in boiling water at $h = 5 0 0 0$, $0 . 0 7$; for a PTFE fin in air, $0 . 0 0 5$; for a PTFE fin in water, $0 . 6$ and the theory is finished.**
**(iii) The perimeter $P$ counts the tip's contribution nowhere**, which is why the fourth boundary condition in the table is handled by lengthening the fin rather than by solving again. Adding $A_c / 2$ of extra length — the corrected length $L_c = L + t/2$ for a rectangular fin, $L + d/4$ for a pin — reproduces the convection-tip answer to within a few per cent for every fin a normal engineer designs, and it is the reason the adiabatic-tip formula is the one printed on heat-sink catalogues.
:::
:::

::: definition Fin efficiency {#def-fin-eff}
$$
\eta _ { f } \equiv { \frac { q _ { \text{actual} } } { q _ { \text{if the whole fin were at } T _ { b } } } } = { \frac { \int h \theta \, d A } { h A _ { f } \theta _ { b } } } \qquad \Longrightarrow \qquad \boxed { \eta _ { f } = { \frac { \tanh m L _ { c } } { m L _ { c } } } } \quad \text{straight fin, uniform section}
$$
$$
\begin{array} { c c c c c c c c c c }
m L _ { c } & 0 . 1 & 0 . 2 & 0 . 3 & 0 . 5 & 0 . 7 5 & 1 . 0 & 1 . 5 & 2 . 0 & 3 . 0 & 5 . 0 \\
\eta _ { f } & 0 . 9 9 7 & 0 . 9 8 7 & 0 . 9 7 0 & 0 . 9 2 4 & 0 . 8 5 1 & 0 . 7 6 2 & 0 . 6 0 4 & 0 . 4 8 2 & 0 . 3 3 4 & 0 . 2 0 0
\end{array}
$$
**The design window is $\eta _ { f } = 0 . 8 5$ to $0 . 9 5$, i.e. $m L _ { c } = 0 . 3$ to $0 . 7 5$.** Below that you are paying for metal that is not working; above it you are paying for metal that is nearly isothermal and could have been spent on another fin instead.
**For an annular fin of rectangular profile** the exact answer is a combination of modified Bessel functions, $I _ { 1 }$ and $K _ { 1 }$, and nobody evaluates it at a desk. The standard approximation is due to Harper and Kunz and is good to about $2\ \ \%$:
$$
\eta _ { f } \approx { \frac { \tanh \left( m L _ { c } \psi \right) } { m L _ { c } \psi } } , \qquad \psi = 1 . 0 + 0 . 3 5 \ln \left( { \frac { r _ { 2 c } } { r _ { 1 } } } \right) , \qquad L _ { c } = L + { \frac { t } { 2 } } , \quad r _ { 2 c } = r _ { 2 } + { \frac { t } { 2 } }
$$
**The factor $\psi$ is the annular fin's reward for being annular**: the area grows with radius, so the outer part of the fin is worth more per unit length than the inner part, and the fin behaves as though it were shorter than it is. For a fin twice the root radius, $\psi = 1 . 1 2$; for one five times, $\psi = 1 . 4 6$.
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
**Read the last two rows against the first.** A copper fin in air is $50\ \ \%$ more effective than an aluminium one and costs perhaps eight times as much and three times as much mass per unit stiffness — **which is why almost every heat sink in the world is aluminium, and the small number that are copper are there for their $k$ only where the volume is fixed and the conduction path is long.** **And read the water rows: at $h = 3 0 0 0$ the effectiveness is $1 1$ and falling, and at boiling it is $6$. Fins in water are marginal; fins in boiling water are usually a mistake, because they also choke the bubble escape and lower the critical heat flux.**
:::

::: widget plot
title: Fin efficiency against the parameter mL
f: tanh(x)/x; tanh(1.35*x)/(1.35*x)
x: 0, 4
y: 0, 1.05
labels: straight fin, tanh(mL)/(mL); annular fin, psi = 1.35
caption: The efficiency of a straight uniform-section fin against $mL_c$, with the annular-fin approximation drawn for a fin whose tip radius is $2.5$ times its root radius ($\psi = 1.35$). **The curve is flat to $0.99$ out to $mL = 0.2$ and then falls almost linearly, crossing $0.76$ at $mL = 1$ and $0.48$ at $mL = 2$.** The practical reading is the shape of the left-hand end: **between $mL = 0$ and $mL = 0.5$ you lose almost nothing, and beyond $mL = 1.5$ you are throwing away more than half the metal you have installed.** The design target of $mL \approx 0.5$ to $1.0$ sits exactly on the knee, which is why it is the target. **The annular curve is the same shape shifted right, and the shift is the annular fin's structural bonus: because its area grows with radius, an annular fin of the same radial height as a straight fin behaves as though it were shorter, and can therefore be made taller for the same efficiency.**
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
R _ { j \to \infty } = R _ { j c } + { \frac { t _ { \text{interface} } } { k _ { \text{interface} } A _ { c } } } + { \frac { 1 } { h _ { b } A _ { b } } } + { \frac { 1 } { \eta _ { o } h A _ { t } } }
$$
where $h _ { b }$ is the **contact** conductance between the sink base and the housing or the cold plate, typically $3 0 0 0$ to $8 0 0 0\ \mathrm { W / m ^ { 2 } K }$ for a greased, torqued joint and $2 0 0$ to $8 0 0$ for a dry, flat, unmachined one. **Note what the chain does when you add fins: it shrinks the last term and leaves the middle two exactly as they were.** That is the arithmetic behind the most demoralising sentence in thermal engineering — **"the sink you have chosen is only a third of the problem."**
:::

::: example The joint under the fin {#ex-contact}
Annular aluminium fins of $2 0 \ \mathrm { m m }$ radial height and $1 \ \mathrm { m m }$ thickness are pressed onto a $2 5 \ \mathrm { m m }$ OD tube at a pitch of $3 \ \mathrm { m m }$ and cooled by forced air at $h = 4 5 \ \mathrm { W / m ^ { 2 } K }$. Take $k = 1 8 0 \ \mathrm { W / m \, K }$ for the fins and a contact conductance of $2 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ (a resistance of $0 . 0 0 0 5 \ \mathrm { m ^ { 2 } K / W }$) for the pressed joint. What is the resistance per metre of tube, with and without that joint?

::: solution
**Fin efficiency first.** $m = { \sqrt { 2 h / k t } } = { \sqrt { 2 	imes 4 5 / ( 1 8 0 	imes 0 . 0 0 1 ) } } = 2 2 . 4 \ \mathrm { m ^ { - 1 } }$ , and with $r _ { 1 } = 1 2 . 5 \ \mathrm { m m }$ , $r _ { 2 c } = 3 3 \ \mathrm { m m }$:
$$
\psi = 1 + 0 . 3 5 \ln \left( { \frac { 3 3 } { 1 2 . 5 } } \right) = 1 . 3 4 \qquad m L _ { c } \psi = 2 2 . 4 \times 0 . 0 2 0 \times 1 . 3 4 = 0 . 6 0 \qquad \eta _ { f } = { \frac { \tanh 0 . 6 0 } { 0 . 6 0 } } = 0 . 8 9 5
$$
**Areas per metre of tube** ($3 3 3$ fins per metre):
$$
A _ { f } = 3 3 3 \times 2 \pi \left( 0 . 0 3 3 ^ { 2 } - 0 . 0 1 2 5 ^ { 2 } \right) = 1 . 9 5 4 \ \mathrm { m ^ { 2 } } \qquad A _ { b } = \pi \times 0 . 0 2 5 \times ( 1 - 3 3 3 \times 0 . 0 0 1 ) = 0 . 0 5 2 4 \ \mathrm { m ^ { 2 } }
$$
$$
\eta _ { o } = 1 - { \frac { 1 . 9 5 4 } { 2 . 0 0 6 } } ( 1 - 0 . 8 9 5 ) = 0 . 8 9 8 \qquad R _ { \text{array} } = { \frac { 1 } { 0 . 8 9 8 \times 4 5 \times 2 . 0 0 6 } } = \mathbf { 0 . 0 1 2 3 \ \mathrm { K / W } } \ \text{per metre}
$$
**Now the joint.** The contact area of one fin is the annulus $2 \pi r _ { 1 } t = 7 . 8 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } }$ , so one fin carries $0 . 0 0 0 5 / 7 . 8 5 \times 1 0 ^ { - 5 } = 6 . 4 \ \mathrm { K / W }$ of contact resistance, and the $3 3 3$ fins in parallel reduce it to $0 . 0 1 9 1 \ \mathrm { K / W }$ per metre of tube:
$$
R _ { \text{fin+contact} } = { \frac { 1 } { \eta _ { f } h A _ { f } } } + R _ { \text{contact} } = 0 . 0 1 2 7 + 0 . 0 1 9 1 = 0 . 0 3 1 8 \qquad { \frac { 1 } { R } } = { \frac { 1 } { 0 . 0 3 1 8 } } + { \frac { 1 } { 1 / ( 4 5 \times 0 . 0 5 2 4 ) } } = 3 1 . 4 + 2 . 4 = 3 3 . 8
$$
$$
R _ { \text{with joint} } = \mathbf { 0 . 0 2 9 6 \ \mathrm { K / W } } \ \text{per metre} \qquad \text{a factor of } \mathbf { 2 . 4 } \text{ worse, and } \mathbf { 6 0 \ \% } \text{ of the fins' work gone}
$$
**The fin efficiency never changed; the array efficiency never changed; every dimension is exactly as the tables prescribe.** **What killed $6 0 \ \ \%$ of the surface is a film of air $1 0 \ \mu\mathrm { m }$ thick between two machined metals — which is why fins are welded, extruded, millimetre-interfered and pressed-on with a shoulder, and why Kern in 1950 measured attached-fin resistances at all.** **The design rule follows: put the contact area where the current is, not where the metal is. A fin whose joint is $1 \ \%$ of its surface area may still carry all its heat through a joint $1 0 0$ times smaller than that surface, and the joint then costs $1 0 0$ times more per watt than the convection it feeds.**
:::
:::

::: example Which of two heat sinks, at the same mass of aluminium {#ex-sink}
A $6 0\ \mathrm{W}$ device runs from a $1 2 0 \times 1 2 0 \times 6\ \mathrm { m m }$ aluminium base plate ($k = 1 8 0$) with straight fins $1 2 0\ \mathrm{mm}$ long, forced air at $3\ \mathrm { m / s }$ giving $h \approx 4 0$ to $4 2\ \mathrm { W / m ^ { 2 } K }$ depending on how dense the array is. Ambient is $4 5\ \ {} ^ { \circ } \mathrm { C }$; $R _ { j c } = 0 . 3 5$ and the interface adds $0 . 2 5\ \mathrm { K / W }$. Compare (a) $1 2$ fins of $1 . 5\ \mathrm{mm}$ thickness and (b) $1 8$ fins of $1 . 0\ \mathrm{mm}$, both $6 0\ \mathrm{mm}$ tall. **The two arrays contain exactly the same volume of aluminium.**

::: solution
**(a) Twelve fins of $1 . 5\ \mathrm{mm}$.** $A _ { f } = 1 2 \times 2 \times 0 . 0 6 0 \times 0 . 1 2 0 = 0 . 1 7 2 8\ \mathrm { m ^ { 2 } }$; $A _ { b } = 0 . 1 4 4 ^ { 2 } - 1 2 \times 0 . 0 0 1 5 \times 0 . 1 2 0 = 0 . 0 1 2 9 6\ \mathrm { m ^ { 2 } }$; $A _ { t } = 0 . 1 8 5 8\ \mathrm { m ^ { 2 } }$, $A _ { f } / A _ { t } = 0 . 9 3 0$.
$$
m = { \sqrt { \frac { 2 \times 3 8 } { 1 8 0 \times 0 . 0 0 1 5 } } } = 1 6 . 7 8 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 1 6 . 7 8 \times 0 . 0 6 0 7 5 = 1 . 0 1 9 , \qquad \eta _ { f } = { \frac { \tanh 1 . 0 1 9 } { 1 . 0 1 9 } } = 0 . 7 5 5
$$
$$
\eta _ { o } = 1 - 0 . 9 3 0 \times 0 . 2 4 5 = 0 . 7 7 2 \qquad \Longrightarrow \qquad R _ { \text{sink} } = { \frac { 1 } { 0 . 7 7 2 \times 3 8 \times 0 . 1 8 5 8 } } = \mathbf { 0 . 1 8 3 \ K / W }
$$
**(b) Eighteen fins of $1 . 0\ \mathrm{mm}$, pitch $6 . 7\ \mathrm{mm}$.** $A _ { f } = 1 8 \times 2 \times 0 . 0 6 0 \times 0 . 1 2 0 = 0 . 2 5 9 2\ \mathrm { m ^ { 2 } }$; $A _ { b } = 0 . 0 1 1 1 6\ \mathrm { m ^ { 2 } }$; $A _ { t } = 0 . 2 7 0 4\ \mathrm { m ^ { 2 } }$, $A _ { f } / A _ { t } = 0 . 9 5 9$. The denser array runs at $h \approx 4 2$.
$$
m = { \sqrt { \frac { 2 \times 4 2 } { 1 8 0 \times 0 . 0 0 1 } } } = 2 1 . 6 0 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 1 . 0 9 6 , \qquad \eta _ { f } = 0 . 7 3 7
$$
$$
\eta _ { o } = 1 - 0 . 9 5 9 \times 0 . 2 6 3 = 0 . 7 4 8 \qquad \Longrightarrow \qquad R _ { \text{sink} } = { \frac { 1 } { 0 . 7 4 8 \times 4 2 \times 0 . 2 7 0 4 } } = \mathbf { 0 . 1 1 8 \ K / W }
$$
**Same metal, same height, same footprint: $36\ \ \%$ less resistance and $4\ \mathrm{K}$ cooler junction** ($T _ { j } = 4 5 + 6 0 \times ( 0 . 1 1 8 + 0 . 6 0 ) = 8 8 . 1\ {} ^ { \circ } \mathrm { C }$ against $9 2 . 0\ {} ^ { \circ } \mathrm { C }$). **The reason is that the extra area is worth more than the efficiency it costs: the thinner array gains $4 2\ \ \%$ in fin area and loses only $2\ \ \%$ in fin efficiency.**
**Now the two caveats that stop this being a recipe.** First, the bare base would give $R = 1 / ( 4 2 \times 0 . 0 1 4 4 ) = 1 . 6 5\ \mathrm { K / W }$, so the fins are doing a factor of $1 4$ of the work and the $0 . 6 0\ \mathrm { K / W }$ of joint and package is doing the rest — **at $6 0\ \mathrm{W}$ the interface and package now own $8 4\ \ \%$ of the remaining temperature rise, and the next $4\ \mathrm{K}$ will have to come from better grease, not better fins.** Second, the $1 . 0\ \mathrm{mm}$ fins at $6 . 7\ \mathrm{mm}$ pitch are thin, tall and fragile, and they are a dust trap; **the reason real heat sinks are $1 . 5$ to $2 . 5\ \mathrm{mm}$ thick is extrusion, stamping and handling, not heat transfer.**
:::
:::

::: definition The optimum spacing of a fin array {#def-spacing}
Nothing in the fin equations fixes the pitch. What fixes it is that **$h$ is not independent of the pitch**: as fins are brought together their boundary layers merge, the fluid between them stops being swept, and the coefficient falls. A usable model, correct in both limits, is
$$
h ( S ) \approx h _ { \infty } \, \frac { S ^ { 2 } } { S ^ { 2 } + S _ { m } ^ { 2 } } , \qquad S _ { m } \sim \frac { 2 k _ { f } } { h _ { \infty } }
$$
where $h _ { \infty }$ is the isolated-fin coefficient and $S _ { m }$ is the spacing at which adjacent films just meet. The heat rejected per unit **plan** area of a plate-fin array of height $L$ and thickness $t$ is then
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
5 0 0 0 \text{ (water) } & 1 0 \ \mu\mathrm { m } & \text{absurd — hence microchannels at } 0 . 2 \text{ to } 0 . 5 \ \mathrm { m m }
\end{array}
$$
**The last row is the important one and it is a proof by reductio that fins are an air-cooling technology.** In water the rule asks for a $1 0 \ \mu\mathrm{m}$ fin, at which thickness the conduction resistance along the fin would be enormous and the fin would be a membrane; the engineering response is to give up on the "many thin fins" limit and go to **microchannels**, which are not fins at all but a manifold, with a real pressure drop and a real fouling problem attached. **The general statement is that extended surfaces pay for themselves in inverse proportion to $h$, and there is a value of $h$ — somewhere around $1 0 0 0$ to $2 0 0 0\ \mathrm { W / m ^ { 2 } K }$ for aluminium — past which more metal is the wrong answer and more flow, or a phase change, is the right one.**
:::

::: widget plot
title: Heat rejected per unit plan area against fin pitch
f: 5.5*x*x/(x*x+104.04)*(100/(x+1))*tanh(0.05*sqrt(11.111*5.5*x*x/(x*x+104.04)))/(0.05*sqrt(11.111*5.5*x*x/(x*x+104.04)))
x: 1, 30
y: 0, 26
caption: Natural-convection plate-fin array, fins $5 0\ \mathrm{mm}$ tall and $1\ \mathrm{mm}$ thick in aluminium, isolated-fin coefficient $h _ { \infty } = 5 . 5\ \mathrm { W / m ^ { 2 } K }$ so that $S _ { m } = 2 k / h _ { \infty } = 1 0 . 2 \ \mathrm { m m }$. The vertical axis is $h ( S ) \, \eta _ { f } \, ( 2 L / ( S + t ) )$ in $\mathrm { W / m ^ { 2 } K }$ per unit plan area. **The peak is $2 4\ \mathrm { W / m ^ { 2 } K }$ at a pitch of $1 0 . 5 \ \mathrm { m m }$ — within $5\ \ \%$ of the $S _ { m } = 1 0 . 2 \ \mathrm { m m }$ the rule predicts — and the curve is within $10\ \ \%$ of the peak from $7\ \mathrm{mm}$ to $1 7 \ \mathrm{mm}$ pitch.** **Read the left-hand cliff, not the peak: at $4\ \mathrm{mm}$ pitch the array rejects $1 5\ \mathrm { W / m ^ { 2 } K }$, $3 9\ \ \%$ less than it could, and the loss is entirely the merged boundary layers.** **The flat top is the practical lesson: a heat-sink catalogue that offers you $8$, $1 0$ and $1 2\ \mathrm{mm}$ pitch is offering you the same part three times, and you should choose on dust, on cost per square metre of fin, and on whether a finger can clean it.**
:::

::: example A fin that is 60 per cent efficient and completely correct {#ex-60}
A stainless steel ($k = 1 6 \ \mathrm { W / m \, K }$) fin of thickness $1 . 5\ \mathrm{mm}$ and height $2 5\ \mathrm{mm}$ sits in a duct where $h = 4 5 \ \mathrm { W / m ^ { 2 } K }$. Its efficiency is $0 . 5 8$. Should it be replaced?

::: solution
Compute the other number before answering. Effectiveness for a rectangular fin:
$$
\varepsilon _ { f } = { \sqrt { \frac { 2 k } { h t } } } = { \sqrt { \frac { 3 2 } { 4 5 \times 0 . 0 0 1 5 } } } = { \sqrt { 4 7 4 } } = 2 1 . 8
$$
**Replace nothing.** The fin throws $5 8\ \ \%$ as much as a perfect fin of the same shape, and $2 1 8 0\ \ \%$ as much as the $1 . 5\ \mathrm{mm}$ of wall it occupies. **The efficiency is low because the metal is bad at conducting, not because the fin is badly proportioned** — and the ways to fix a low-efficiency fin are, in order of cost-effectiveness: **make it shorter** ($m L _ { c }$ from $1 . 5 8$ to $0 . 8 1$ by halving the height, $\eta _ { f }$ to $0 . 8 3$, at the price of half the area), **make it thicker** ($t$ to $8\ \mathrm{mm}$: $\eta _ { f } = 0 . 8 4$, at the price of five times the mass and five times fewer fins per metre), or **change the metal** (copper at $k = 4 0 1$ gives $\eta _ { f } = 0 . 9 7$ and costs about six times as much per kilogram and is three times as dense).
**The reason the fin is stainless in the first place is almost always corrosion, temperature or strength — and in all three cases the material is not negotiable, so the only lever is geometry.** **The correct design move is the one the efficiency number points at and the effectiveness number permits: keep the stainless, and shorten the fins until $m L _ { c } \approx 1$.**
:::
:::

## Two-dimensional conduction

::: definition The flux plot (flow net) {#def-fluxplot}
For steady two-dimensional conduction with no generation, $T$ satisfies Laplace's equation, and its solution can be **drawn**. Isotherms and adiabats (heat-flow lines) intersect at right angles, and where the spacing is chosen so that each element is a curvilinear **square**, the whole problem reduces to counting:
$$
\boxed { \; q = { \frac { M } { N } } \, k \, \Delta T \, w \; }
$$
where $M$ is the number of flow channels, $N$ the number of temperature increments, and $w$ the thickness normal to the plane of the plot. **The comparison with $q = S k \Delta T w$ identifies $M / N$ as the shape factor per unit thickness** — so a flux plot is a shape-factor measurement made with a pencil, and it is accurate to $2$ to $5\ \ \%$ in competent hands.
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
**(i) It does not contain the thickness of the body.** Halving a copper lid from $5\ \mathrm{mm}$ to $2 . 5\ \mathrm{mm}$ changes the spreading resistance hardly at all, provided the lid is still much wider than the source — **which is why "make the lid thicker" is such a common and such a useless response to a hot spot.**
**(ii) It goes as $1 / \sqrt { A _ { s } }$, not $1 / A _ { s }$.** **Doubling the side of a square source halves the spreading resistance; doubling its area only reduces it by $29\ \ \%$.** The corollary is the one that gets built: **the cheapest large reduction is to make the heat arrive over a larger area in the first place**, which is what a vapour chamber, a copper lid, or a graphite spreader does — and none of them conduct better than the copper they replace, they simply move the isotherm outward.
:::

::: example The hot spot under a die {#ex-spread}
A $3 \times 3 \ \mathrm{mm}$ silicon die dissipates $1 8 \ \mathrm{W}$ uniformly and is soldered to a $5\ \mathrm{mm}$ thick, $4 0 \times 4 0 \ \mathrm{mm}$ copper lid ($k = 4 0 1 \ \mathrm { W / m \, K }$), whose outer face is cooled at $h = 9 0 0 0 \ \mathrm { W / m ^ { 2 } K }$ by a cold plate at $4 0 \ \ {} ^ { \circ } \mathrm { C }$. Estimate the temperature difference between the die and the lid's outer face.

::: solution
**Three resistances in series.** Spreading from the die into the lid, bounded by the half-space value:
$$
a = { \sqrt { \frac { 9 \times 1 0 ^ { - 6 } } { \pi } } } = 1 . 6 9 3 \times 1 0 ^ { - 3 } \ \mathrm { m } , \qquad R _ { \text{spread} } \le { \frac { 1 } { 4 \times 4 0 1 \times 1 . 6 9 3 \times 1 0 ^ { - 3 } } } = 0 . 3 6 8 \ \mathrm { K / W }
$$
One-dimensional through the lid, $R = t / ( k A ) = 0 . 0 0 5 / ( 4 0 1 \times 0 . 0 0 1 6 ) = 0 . 0 0 7 8 \ \mathrm { K / W }$. Cold-plate film, $R = 1 / ( 9 0 0 0 \times 0 . 0 0 1 6 ) = 0 . 0 6 9 4 \ \mathrm { K / W }$.
$$
\Delta T = 1 8 \times ( 0 . 3 6 8 + 0 . 0 0 7 8 + 0 . 0 6 9 4 ) = 1 8 \times 0 . 4 4 5 = \mathbf { 8 . 0 \ K } , \qquad T _ { \text{die} } \approx 4 8 \ \ {} ^ { \circ } \mathrm { C }
$$
**The spreading term is $8 3\ \ \%$ of the total, the $5\ \mathrm{mm}$ of copper lid contributes $1 . 8\ \ \%$, and the very expensive cold plate contributes $1 6\ \ \%$.** **This is the arithmetic behind every lid, spreader and vapour chamber in the industry: the way to fix a hot spot is not to make the conduction path shorter or the coolant colder, it is to make the source electrically bigger — that is, to spread it before it has to conduct.** A vapour chamber lid with an effective in-plane conductivity of $5 0 0 0 \ \mathrm { W / m \, K }$ over the same $4 0 \times 4 0 \ \mathrm{mm}$ footprint reduces the spreading term to about $0 . 0 2 \ \mathrm { K / W }$ and moves the whole $8\ \mathrm{K}$ problem into the interface and the cold plate, where it can be attacked with grease and flow rate.
:::
:::

## Doing it yourself

::: exercise An aluminium fin in still air {#ex-al level=1 check="0.996"}
A flat aluminium fin ($k = 1 8 0 \ \mathrm { W / m \, K }$) is $1 . 0 \ \mathrm{mm}$ thick and $1 2 \ \mathrm{mm}$ tall, and the surrounding air gives $h = 8 \ \mathrm { W / m ^ { 2 } K }$. What is its efficiency?

::: solution
For a plate fin of unit depth, $P = 2$ and $A _ { c } = t$:
$$
m = { \sqrt { \frac { 2 h } { k t } } } = { \sqrt { \frac { 1 6 } { 1 8 0 \times 0 . 0 0 1 } } } = 9 . 4 3 \ \mathrm { m ^ { - 1 } } , \qquad L _ { c } = 0 . 0 1 2 5 \ \mathrm { m } , \qquad m L _ { c } = 0 . 1 1 8
$$
$$
\eta _ { f } = { \frac { \tanh 0 . 1 1 8 } { 0 . 1 1 8 } } = \mathbf { 0 . 9 9 6 }
$$
**Effectively perfect, and that is the normal answer for aluminium in air.** The reason is the ratio $k / h = 2 2 . 5 \ \mathrm { m }$, which is enormous: heat runs along an aluminium fin roughly twenty-two metres before the air has taken enough of it to matter, and a $1 2\ \mathrm{mm}$ fin is not trying. **The corollary is that in air, aluminium fins are limited by how much area you can buy, not by how well the area works — which is exactly the situation the optimum-spacing rule is about.**
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
**Four per cent of the conductivity and eight times the surface coefficient combine to move the fin from $m L _ { c } = 0 . 1 2$ to $m L _ { c } = 1 . 5 8$ — a factor of thirteen in the governing parameter, and $4 2$ percentage points of efficiency.** **The lesson generalises into a rule of thumb worth more than any formula: a fin is only as good as $k / ( h t )$ allows, and switching from aluminium to stainless at constant geometry costs you about a factor of four in usable fin height.**
:::
:::

::: exercise How much is that stainless fin worth? {#ex-effec level=1 check="21.8"}
For the stainless fin of [[#ex-ss|the stainless-fin exercise]], what is its effectiveness relative to the bare wall it stands on?

::: solution
For a long rectangular fin of unit depth, $P = 2$ and $A _ { c } = t$:
$$
\varepsilon _ { f } = { \sqrt { \frac { P k } { h A _ { c } } } } = { \sqrt { \frac { 2 \times 1 6 } { 4 5 \times 0 . 0 0 1 5 } } } = { \sqrt { 4 7 4 } } = \mathbf { 2 1 . 8 }
$$
**Twenty-two times the bare wall, at $5 8\ \ \%$ efficiency.** **The two numbers are not in conflict: efficiency asks how well the fin's own area is used, effectiveness asks whether the fin should exist, and the second question is the one that has to be answered first.** **The formula also shows why effectiveness improves as $h$ falls: $\varepsilon _ { f } \propto 1 / { \sqrt { h } }$, so the same fin in still air at $h = 6$ would be $4 2$ times effective instead of $2 2$ — extended surfaces are a remedy whose potency is greatest exactly where the underlying disease is worst.**
:::
:::

::: exercise An annular fin on a pipe {#ex-ann level=2 check="0.92"}
A steel ($k = 1 6 \ \mathrm { W / m \, K }$) annular fin of thickness $1 . 5 \ \mathrm{mm}$ runs from $r _ { 1 } = 1 5 \ \mathrm { m m }$ to $r _ { 2 } = 2 5 \ \mathrm { m m }$, with $h = 2 0 \ \mathrm { W / m ^ { 2 } K }$. Estimate its efficiency.

::: solution
Use the Harper approximation with the corrected radius and length:
$$
L _ { c } = 0 . 0 1 0 + 0 . 0 0 0 7 5 = 0 . 0 1 0 7 5 \ \mathrm { m } , \qquad m = { \sqrt { \frac { 2 \times 2 0 } { 1 6 \times 0 . 0 0 1 5 } } } = 4 0 . 8 \ \mathrm { m ^ { - 1 } } , \qquad m L _ { c } = 0 . 4 3 9
$$
$$
\psi = 1 + 0 . 3 5 \ln \left( { \frac { 0 . 0 2 5 7 5 } { 0 . 0 1 5 } } \right) = 1 + 0 . 3 5 \times 0 . 5 4 0 = 1 . 1 8 9 , \qquad m L _ { c } \psi = 0 . 5 2 2
$$
$$
\eta _ { f } = { \frac { \tanh 0 . 5 2 2 } { 0 . 5 2 2 } } = \mathbf { 0 . 9 2 }
$$
**Compare with [[#ex-ss|the stainless-fin exercise]]: a straight stainless fin of the same thickness in a *better* coefficient ($h = 4 5$) reaches only $0 . 6 0$ at $2 5 \ \mathrm{mm}$, while this annular fin in a worse coefficient ($h = 2 0$) reaches $0 . 9 2$ at $1 0 \ \mathrm{mm}$.** Part of that is the shorter fin, and part is $\psi$ : **the annular fin's area is concentrated where it is most effective, at large radius, and the geometry pays for itself by a factor of $1 . 1 9$ in effective length.** **This is why finned pipe is nearly always made with annular or spiral fins rather than straight ones, and why the same logic — put the area where the temperature is — is behind the tapered and stepped fins of air-cooled engine cylinders.**
:::
:::

::: exercise The array, not the fin {#ex-array level=1 check="0.83"}
A heat sink's fins account for $9 2\ \ \%$ of its total surface area and have an efficiency of $0 . 8 2$. What is the overall surface efficiency?

::: solution
$$
\eta _ { o } = 1 - { \frac { A _ { f } } { A _ { t } } } \left( 1 - \eta _ { f } \right ) = 1 - 0 . 9 2 \times 0 . 1 8 = \mathbf { 0 . 8 3 }
$$
**The bare base contributes almost nothing to the correction: had the base been $8\ \ \%$ of the area instead of $2\ \ \%$, $\eta _ { o }$ would be $0 . 8 6$.** **The formula is a warning about where to look.** In a dense array the whole surface is the fins, so any improvement must come from $\eta _ { f }$ — thicker metal, shorter fins, or a better conductivity — and **the corollary is the one that saves the most money: if you are choosing between a better fin material and a better base joint in a dense array, you are choosing between something that affects $100\ \ \%$ of the surface and something that affects $8\ \ \%$ of it.**
:::
:::

::: exercise A flux plot for a bracket {#ex-net level=2 check="12"}
A steel bracket of thickness $2 0 0 \ \mathrm{mm}$ normal to the plane of the plot and conductivity $1 . 2 \ \mathrm { W / m \, K }$ is solved by a flow net with $8$ flow channels and $1 6$ temperature increments between faces held $1 0 0 \ \mathrm{K}$ apart. What is the heat flow?

::: solution
$$
q = { \frac { M } { N } } \, k \, \Delta T \, w = { \frac { 8 } { 1 6 } } \times 1 . 2 \times 1 0 0 \times 0 . 2 0 0 = \mathbf { 1 2 \ W }
$$
**The shape factor is $M / N = 0 . 5$ per unit thickness, i.e. $S = 0 . 1 0 \ \mathrm { m }$ for this bracket.** **Two checks worth running on any hand-drawn net.** First, **count on the whole domain**: if the net was drawn on a quarter by symmetry, $M$ is $4 \times 8 = 3 2$ and $N$ is still $1 6$, giving $q = 4 8 \ \mathrm{W}$, and the error of multiplying both by four is a factor of four. Second, **the net must be square everywhere**: if the cells near the hot corner are visibly elongated, the local flux is under-counted and the total will be low. **A flux plot takes twenty minutes and is good to a few per cent; a coarse finite-element model of the same bracket takes the same twenty minutes and is good to ten per cent if the mesh was thought about, and the flow net has the advantage that you can see where it is wrong.**
:::
:::

::: exercise Spreading a smaller source {#ex-spread2 level=2 check="0.37"}
A square heat source $3 . 0 \times 3 . 0 \ \mathrm{mm}$ sits on the surface of a large copper block ($k = 4 0 1 \ \mathrm { W / m \, K }$). Estimate the spreading resistance.

::: solution
$$
a = { \sqrt { \frac { A _ { s } } { \pi } } } = { \sqrt { \frac { 9 . 0 \times 1 0 ^ { - 6 } } { \pi } } } = 1 . 6 9 3 \times 1 0 ^ { - 3 } \ \mathrm { m } , \qquad R _ { \text {spread } } = { \frac { 1 } { 4 k a } } = { \frac { 1 } { 4 \times 4 0 1 \times 1 . 6 9 3 \times 1 0 ^ { - 3 } } } = \mathbf { 0 . 3 7 \ K / W }
$$
**At $1 8 \ \mathrm{W}$ that is $6 . 6 \ \mathrm{K}$ — more than a typical cold plate's whole drop.** **Now halve the source to $1 . 5 \times 1 . 5 \ \mathrm{mm}$, which quarters the area:** $a$ halves and $R$ doubles to $0 . 7 4 \ \mathrm { K / W }$. **The scaling $R \propto 1 / \sqrt { A _ { s } }$ is the whole reason that shrinking a chip makes it hotter than its power density alone would predict: at constant power density, the temperature rise of the spreading term goes as $1 / \sqrt { \text { area } }$, so a die shrunk to a quarter of its area at the same $\mathrm { W / c m ^ { 2 } }$ runs $2 \ \mathrm{K}$ hotter per watt from spreading alone.** **It is also why the industry's answer to shrinking dies has been packaging rather than cooling — flip-chip, thermal through-silicon vias, and spreader lids all work by enlarging $A _ { s }$ before the heat has to conduct, which is the only lever that moves this resistance.**
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
**Twenty-six per cent more heat for twice the metal, twice the volume and twice the height of the enclosure.** **Double it again to $2 4 0 \ \mathrm{mm}$ and the answer is $1 . 3 0$ — the fin has asymptoted, because a long fin's heat flow is $\sqrt { h P k A _ { c } } \, \Delta T$ and contains no length at all.** **The same arithmetic in the other direction is the better design move: cutting to $3 0 \ \mathrm{mm}$ keeps $6 1\ \ \%$ of one fin's output while halving its metal, so twice as many fins fit across the same base — and the array then rejects $2 3\ \ \%$ more heat for exactly the same mass of aluminium.** **At $1 0 \ \mathrm{mm}$ pitch this array is nowhere near the merged-boundary-layer region, so halving the pitch costs nothing in $h$ (see the optimum-spacing figure: the curve is flat from $7$ to $1 7 \ \mathrm{mm}$).** **This is the single most common waste in heat-sink specification: fins sized by what the extrusion press can do rather than by $1 / m$.**
:::
:::

::: quiz The good fin {#quiz-good}
A fin has an efficiency of $0 . 5 8$ and an effectiveness of $2 4$. A second fin has an efficiency of $0 . 9 7$ and an effectiveness of $1 . 6$. Both occupy the same base area. Which should be installed?

- [ ] The first, because its effectiveness is larger
- [x] The first — but for the opposite reason from the one usually given: it is the effectiveness that decides, not the efficiency, and the second fin is nearly isothermal and therefore nearly useless
- [ ] The second, because $9 7\ \ \%$ efficient metal is obviously better than $5 8\ \ \%$ efficient metal
- [ ] Either: the two numbers are two ways of measuring the same thing

::: solution
**The first, and the reason is effectiveness.** The first fin throws $2 4$ times what the bare base would; the second throws $1 . 6$ times. **The second fin's high efficiency is the diagnosis of its own failure: $\eta _ { f } \to 1$ means the fin is nearly isothermal, which for a fin of normal proportions means $m L \ll 1$, which means it is short and fat and its extra area is barely warmer than the base it is attached to and barely cooler than the fluid it is trying to cool.**
**The two numbers are not two measures of one thing: $\eta _ { f }$ is a property of the fin's shape and $\varepsilon _ { f }$ is a property of the decision.** **The combination to look for is a high product $\eta _ { f } \varepsilon _ { f }$, which is the actual conductance added per unit base area — and a $0 . 5 8 / 2 4$ fin scores $1 4$ where the $0 . 9 7 / 1 . 6$ fin scores $1 . 5$.** **The trap the question sets is the word "efficient": in ordinary speech a $5 8\ \ \%$ efficient anything is a bad anything, and in fin work a $5 8\ \ \%$ efficient fin is often the better fin.**
:::
:::

::: quiz The dense heat sink {#quiz-dense}
A natural-convection heat sink has fins $5 0 \ \mathrm{mm}$ tall, $1 \ \mathrm{mm}$ thick and $3 \ \mathrm{mm}$ apart. A colleague proposes a version with the same base and the same fin height but $1 0 \ \mathrm{mm}$ spacing, at roughly one third the number of fins. What happens?

- [ ] It gets worse, because two thirds of the surface area is lost
- [x] It gets better, and by a large factor, because at $3 \ \mathrm{mm}$ pitch the boundary layers have merged and most of the area is not being used
- [ ] It is unchanged, because the product of area and coefficient is fixed
- [ ] It depends on the ambient temperature

::: solution
**It gets much better.** For natural convection in air the optimum pitch is $S _ { \text{opt} } \approx 2 k _ { f } / h _ { \infty } \approx 2 \times 0 . 0 2 6 / 6 \approx 9 \ \mathrm { m m }$, and at $3 \ \mathrm{mm}$ the array is rejecting about $1 1 \ \mathrm { W / m ^ { 2 } K }$ per unit plan area against $2 4$ at the optimum — **under half of what the same base could do**. **Cutting the fin count to a third removes two thirds of the area and multiplies the coefficient several times over, and the product goes up by a factor of about $2 . 2$; the fin efficiency goes *up* as well, because $m \propto \sqrt { h }$ rises only as the square root while the fin thickness is unchanged.**
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
| 1822 | **Fourier**, *Théorie analytique de la chaleur*, Part I Chapter VII treats the **"épingles" (needles)** used as thermometers in a stream: the exposed part of a thermometer loses heat along its length, and Fourier derives the exponential decay of temperature along the needle and corrects the reading accordingly. **The fin equation is therefore older than the heat exchanger, and was invented to fix an instrument error.** |
| 1926 | **E. Schmidt**, "Die Wärmeübertragung durch Rippen", *Gesundheitsingenieur* 49 — the first industrial treatment of fin and array efficiency, written for the makers of air-cooled condensers and finned-tube heaters, and the origin of the $\eta _ { o } = 1 - ( A _ { f } / A _ { t } ) ( 1 - \eta _ { f } )$ formula still printed in every heat-exchanger standard. |
| 1945 | **F. R. Gardner**, "Efficiency of calcuated and triangular fins", *Journal of Heat Transfer* 67, 621–631 — closed-form efficiencies for straight, triangular and stepped profiles, and the first optimum-profile results: **for a given volume the triangular fin of equal strength beats the rectangular fin by about $20\ \ \%$ in dissipation and by $50\ \ \%$ in mass-specific dissipation.** |
| 1950 | **D. Q. Kern**, *Process Heat Transfer*, McGraw-Hill — fin efficiency for pin, plate and longitudinal fins in exchanger service, and, more consequentially, **the first systematic allowance for the contact resistance of mechanically attached fins**, which he measured at $0 . 0 0 0 4$ to $0 . 0 0 1 5 \ \mathrm { m ^ { 2 } K / W }$ for pressed-on steel fins: **enough on its own to halve the value of a high-fin-density surface, and the reason exchanger fins are now usually welded, extruded or integral.** |
| 1957 | **A. M. Kraus**, "Design of extended heat transfer surfaces", *Transactions of the ASME* — fin arrays for gas-turbine and air-cooled-engine cylinders, and the engineering case for **tapered, stepped and spine fins** where the geometry must carry structural load as well as heat. |
| 1970 | **T. J. Berea**, "The optimum geometry for natural convection fins", ASME Paper 70-HT/Am3A-49 — measurements on vertical parallel-plate channels showing a clear maximum in heat per unit width against spacing, and the empirical optimum-spacing formula that every natural-convection heat-sink catalogue still quietly follows. |
| 1984 | **A. Bar-Cohen & W. M. Rohsenow**, "Thermally optimum spacing of vertical, natural convection cooled, parallel plates", *Journal of Heat Transfer* 106, 116–124 — the theoretical version of Berea's result, and with it the **volume-to-point** formulation: given a volume in which heat is generated at a uniform rate and one point at which it may leave, what distribution of a small amount of high-conductivity material minimises the peak temperature? **The answer is a tree, and this paper is the origin of constructal design.** |
| 2003 | **A. Bejan & S. Lorente** develop **constructal theory** into a general design method: the tendency of flow systems to evolve toward tree-shaped access is proposed as a physics of configuration, not a metaphor. **Tree-shaped fins, branching microchannels and additively manufactured lattices are all descendants of the 1984 question, and the fin — the oldest object in heat transfer — is once again the frontier.** |
:::

::: summary
- **The fin equation is $\theta ^ { \prime \prime } = m ^ { 2 } \theta$ with $m = \sqrt { h P / k A _ { c } }$**, and $1 / m$ is the distance over which the fin's excess temperature dies. **A fin several times longer than $1 / m$ is decoration.**
- **Efficiency $\eta _ { f } = \tanh m L _ { c } / m L _ { c }$ measures the metal; effectiveness $\varepsilon _ { f } \approx \sqrt { P k / h A _ { c } }$ measures the decision.** Answer the second question first, and never reject a fin for being $6 0 \ \ \%$ efficient.
- **The design window is $m L _ { c } \approx 0 . 3$ to $1 . 0$, $\eta _ { f } = 0 . 8 5$ to $0 . 9 6$.** Below it the fin is isothermal and useless; above it the tip is dead.
- **Effectiveness goes as $1 / \sqrt { h }$.** Fins are the remedy for a bad fluid: $2 4 5$ times in still air, $1 1$ times in water, $6$ times in boiling water — and in boiling water they also trap vapour, so the honest answer is usually no fins.
- **An array is $\eta _ { o } = 1 - ( A _ { f } / A _ { t } ) ( 1 - \eta _ { f } )$, and in a dense array the base is irrelevant.** Everything is the fins, and the joint under the base is a separate resistance that no fin can help.
- **Optimum pitch is $S \approx 2 k _ { f } / h _ { \infty }$** — about $9 \ \mathrm{mm}$ for natural convection in air, $1 . 3 \ \mathrm{mm}$ at $3 \ \mathrm { m / s }$, and $1 0 \ \mu\mathrm{m}$ in water, which is the proof that fins are an air-cooling technology.
- **The optimum is flat.** Within $\pm 4 0 \ \ \%$ of the best pitch the performance changes by less than $10\ \ \%$, so choose the sink that fits, cleans and costs least.
- **Doubling a fin's height buys $\tanh$ of the increase, not the increase**: $+ 2 6\ \ \%$ for a fin at $m L _ { c } = 1 . 0$, and $+ 3 \ \ \%$ for one at $m L _ { c } = 4$.
- **A flux plot gives $q = ( M / N ) k \Delta T w$** by counting curvilinear squares, is good to a few per cent, and identifies $M / N$ as the shape factor per unit thickness.
- **Spreading resistance is $1 / ( 4 k \sqrt { A _ { s } / \pi } )$, independent of the thickness of the body it spreads into.** You cannot fix a hot spot with a thicker lid; you can only fix it with a bigger source area.
:::

## Further reading

- **F. P. Incropera, D. P. DeWitt, T. L. Bergman & A. S. Lavine**, *Fundamentals of Heat and Mass Transfer*, 8th ed. (Wiley, 2017) — Chapter 3 on fins including the annular-fin figure and the optimum-fin-length discussion, and Chapter 9 for natural-convection fin arrays.
- **A. M. Kraus, A. Aziz & J. Mayhew**, *Extended Surface Heat Transmission* (McGraw-Hill, 1967) — the monograph on fins: every profile, every boundary condition, every approximation, with the accuracy of each stated. Still the reference.
- **F. R. Gardner**, "Efficiency of calcuated and triangular fins", *J. Heat Transfer* 67 (1945) 621–631 — short, and the origin of optimum-profile theory.
- **A. Bar-Cohen & W. M. Rohsenow**, "Thermally optimum spacing of vertical, natural convection cooled, parallel plates", *J. Heat Transfer* 106 (1984) 116–124 — the optimum-spacing derivation, and the volume-to-point problem in its original form.
- **T. J. Berea**, "The optimum geometry for natural convection fins", ASME Paper 70-HT/Am3A-49 (1970) — the measurements behind the rule of thumb.
- **D. Q. Kern**, *Process Heat Transfer* (McGraw-Hill, 1950; reprinted) — fin efficiency in exchanger service and the classic fin-contact-resistance allowances.
- **A. Bejan & S. Lorente**, *Design in Motion: The Making of Devices, Nature and Life* (Ashgate, 2013) — constructal theory written for engineers, with the fin as the elementary example throughout.
- **E. E. Josyln, R. J. Gagnon & A. Azar (eds.)**, or in its place **B. Micander, H. Berg & M. McNutt (eds.)**, *Thermal Management of Microelectronics Equipment* (Academic Press, 1998) — heat sinks as they are actually specified: array data, orientation, by-height versus by-footprint, and the measurement standards behind the catalogue numbers.
- **JEDEC JESD51 series** — *Thermal Measurement Guidelines for Integrated Circuit Packages*: how a heat-sink resistance is actually measured, why the number depends on the test die size, and why two vendors' catalogues are not comparable.
