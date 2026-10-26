Steady conduction asks where the heat is going; transient conduction asks **how long it takes to get there**, and the answer turns out to depend on a different material property than the one the steady problem uses. A steady temperature field cares only about $k$. A changing one cares about $k$ and about how much heat the material has to absorb on the way, $\rho c$: the ratio
$$
\alpha = { \frac { k } { \rho c } } \qquad \left[ \mathrm { m ^ { 2 } / s } \right]
$$
is the **thermal diffusivity**, and it is the property that sets the time scale of every transient conduction solution. **Water conducts heat about twenty-three times better than air, yet still air's diffusivity ($2.25 \times 10^{-5}\ \mathrm{m^2/s}$) is about $150$ times water's ($1.47 \times 10^{-7}$), because a cubic metre of water stores some $3500$ times more heat per kelvin.** Judging how fast a material responds from its conductivity alone is therefore a category error.

The subject has one great simplification and one great division. **The simplification is that the heat equation is linear**, so a transient problem can be built as a sum of steady problems and exponential decays, and a complex thermal history can be assembled from simple ones by superposition. **The division is the Biot number**, the ratio of the internal conduction resistance to the external convection resistance,
$$
\mathrm { B i } = { \frac { h L _ { c } } { k } } = { \frac { L _ { c } / ( k A ) } { 1 / ( h A ) } } , \qquad L _ { c } = { \frac { V } { A } }
$$
and it decides which of two completely different worlds a body lives in. **If $\mathrm { B i } \ll 1$ the body has one temperature**, a single ordinary differential equation and a single exponential, and the whole of transient conduction collapses to a time constant. **If $\mathrm { B i } \gg 1$ the body has a profile**, the surface goes to the fluid temperature at once and the interior does not yet know anything has happened, and the answer is an error function. **Everything in between is a table of eigenvalues.**

The practical architecture of this lesson is therefore three tools and a rule for choosing between them. **Lumped capacitance** for $\mathrm { B i } \lesssim 0 . 1$: one exponential, one time constant, and arithmetic you can do on the back of an envelope. **The one-term series** for finite Biot numbers: a centre temperature that decays exponentially after a short initial period, with two coefficients read from a table. **The semi-infinite solid** for short times and large bodies: an error function, and a penetration depth $\sqrt { \alpha t }$ that grows as the square root of time and is the single most useful estimate in the whole lesson. **The rule that chooses between them is the Fourier number $\mathrm { F o } = \alpha t / L ^ { 2 }$**: below about $0 . 0 5$ the body has not noticed its own far boundary and the semi-infinite solution is right; above about $0 . 2$ the one-term series is right; and in between, neither is, and you should use the table.

::: warning Five transient errors, in order of how much they cost
**Using lumped capacitance at $\mathrm { B i } = 1$ and calling the error small.** At $\mathrm { B i } = 3$ a slab's centre reaches $10\ \%$ of its initial excess temperature at a Fourier number of $1 . 7 5$; the lumped model says $0 . 7 7$. **The lumped model is not "approximately right", it is wrong by a factor of $2 . 3$ in time** — and the failure is not conservative in either direction, because the lumped model also says the surface and centre are equal when in fact the surface is at $1 5\ \%$ and the centre at $4 1\ \%$. **The $0 . 1$ criterion is not pedantry: it is the point at which the internal and external resistances differ by a factor of ten, which is the same as saying the internal one can be ignored.** **Quoting a cooling time from the conductivity.** The time constant of a lumped body is $\rho c V / ( h A )$ and **contains no conductivity at all**; the conduction-limited cooling time of a large body is $L ^ { 2 } / \alpha$ and contains no conductivity either, once you write it with $\alpha$ in it. **Silver and aluminium cool at much the same rate in the same fluid at the same size, because their diffusivities are within a factor of two and their heat capacities per unit volume are within a factor of two.** **Using the semi-infinite solution after the body has noticed its far side.** The semi-infinite answer is valid for $\mathrm { F o } = \alpha t / L ^ { 2 } \lesssim 0 . 0 5$; beyond that the back wall has warmed and the surface temperature is no longer what the formula says. For a $2 5 \ \mathrm{mm}$ alloy-steel plate ($\alpha = 5 . 6 \times 1 0 ^ { - 6 } \mathrm { m ^ { 2 } / s }$) heated from one face this is $t \lesssim 6 \ \mathrm { s }$; for a block $5 0 0 \ \mathrm{mm}$ thick it is $t \lesssim 3 7 \ \mathrm { m i n }$. **The semi-infinite regime is a large-body or short-time regime, and using it on a plate for longer is the error.** Past that point the semi-infinite model, which assumes the interior is an inexhaustible reservoir at $T_i$, over-predicts the heat exchanged at a fixed surface temperature and under-predicts the surface temperature change under a fixed flux. **Assuming the fluid stays at its quoted temperature.** Every formula here is written against a $T _ { \infty }$ that is a constant. A quench tank of $2 0 0$ litres receiving a $2 0 \ \mathrm{kg}$ steel forging at $8 5 0 \ {} ^ { \circ } \mathrm { C }$ holds about $8\ \mathrm{MJ}$ above the bath temperature, enough to raise the whole $200$ litres by about $10\ \mathrm{K}$ — and, if the bath is unstirred, the water next to the part by far more — and the driving force $\left( T - T _ { \infty } \right )$ in the exponent is then not what you wrote. **Check the heat content of the bath against the heat content of the part before writing down a cooling time; the ratio is often less than ten, and the lumped-capacitance method then has to be applied to the bath as well as to the part.** **Trusting a surface coefficient you cannot measure.** In the lumped regime the cooling time is **inversely proportional** to $h$, so a factor of two in $h$ is a factor of two in time. **In the conduction-limited regime the timing is set by $L ^ { 2 } / \alpha$ and $h$ barely matters at all** — which is a comfort in one case and a warning in the other, and knowing which regime you are in is worth more than a better correlation.
:::

## Lumped capacitance

::: definition The Biot number and the lumped-capacitance method {#def-lumped}
If the internal resistance to conduction is negligible compared with the external resistance to convection, the whole body is at one temperature $T ( t )$ and an energy balance on it gives
$$
\rho c V { \frac { d T } { d t } } = - h A \left( T - T _ { \infty } \right ) \qquad \Longrightarrow \qquad \boxed { \; { \frac { \theta } { \theta _ { i } } } = { \frac { T - T _ { \infty } } { T _ { i } - T _ { \infty } } } = e ^ { - t / \tau } , \qquad \tau = { \frac { \rho c V } { h A } } = { \frac { \rho c L _ { c } } { h } } \; }
$$
**The time constant is a heat capacity divided by a conductance, exactly as in an RC circuit, and the analogy is exact**: $T \leftrightarrow$ voltage, $\rho c V \leftrightarrow$ capacitance, $1 / ( h A ) \leftrightarrow$ resistance, and $h A ( T _ { \infty } - T ) \leftrightarrow$ a current source driving the capacitor toward a Thevenin equivalent. **A circuit simulator such as SPICE, and every control-textbook step response, therefore solves lumped thermal problems exactly when the components are mapped across.**
**The characteristic length is $L _ { c } = V / A$, the volume divided by the area exchanging heat** — and getting $A$ right is the whole skill. For a long cylinder of radius $r$ cooled all over, $L _ { c } = r / 2$; for a sphere, $L _ { c } = r / 3$; for a plate of half-thickness $L$ cooled on both faces, $L _ { c } = L$; **for a plate cooled on one face only, $L _ { c } = 2 L$, and forgetting which faces are exchanging heat is the commonest single error in the method.**
**The criterion is $\mathrm { B i } = h L _ { c } / k \lesssim 0 . 1$**, and it is worth deriving once rather than memorising (see [[#der-lumped|the derivation]]): it says the temperature drop *inside* the body is at most $10\ \%$ of the drop from the body to the fluid.
$$
\begin{array}{l c c c}
\text{Body} & h \left( \mathrm { W / m ^ { 2 } K } \right) & k \left( \mathrm { W / m \, K } \right) & \mathrm { B i } \text{ for } L _ { c } = 1 0 \ \mathrm { m m } \\
\text{Copper in still air} & 8 & 4 0 1 & 0 . 0 0 0 2 \\
\text{Aluminium in still air} & 8 & 1 8 0 & 0 . 0 0 0 4 \\
\text{Steel in still air} & 8 & 4 5 & 0 . 0 0 1 8 \\
\text{Concrete in still air} & 8 & 1 . 0 & 0 . 0 8 0 \\
\text{Aluminium in water} & 2 0 0 0 & 1 8 0 & 0 . 1 1 \\
\text{Steel in oil} & 3 0 0 & 4 5 & 0 . 0 6 7 \\
\text{Steel in boiling water} & 1 0 { , } 0 0 0 & 4 5 & 2 . 2 \\
\text{Magnesia insulation in air} & 8 & 0 . 1 2 & 0 . 6 7
\end{array}
$$
**Read the table as a map of when the easy method works: metals in gases, always; metals in liquids, usually; anything in boiling water or condensing steam, never; and insulators almost never, because their own conductivity is the thing that fails.**
:::

::: exercise Derivation: lumped capacitance and the $B i = 0 . 1$ criterion {#der-lumped level=3}
::: solution
**Part 1: the method.** Write the energy balance on an isothermal body of volume $V$, surface area $A$, density $\rho$ and specific heat $c$, losing heat to a fluid at $T _ { \infty }$ :
$$
\rho c V { \frac { d T } { d t } } = - h A \left( T - T _ { \infty } \right )
$$
Separate and integrate from $T _ { i }$ at $t = 0$:
$$
\int _ { \theta _ { i } } ^ { \theta } { \frac { d \theta } { \theta } } = - { \frac { h A } { \rho c V } } \int _ { 0 } ^ { t } d t \qquad \Longrightarrow \qquad \theta = \theta _ { i } e ^ { - h A t / ( \rho c V ) }
$$
**Part 2: the criterion.** Now ask how bad the isothermal assumption is. At the instant the body is at $T$ and the fluid is at $T _ { \infty }$, the heat leaving the surface must arrive there from the interior, so the internal gradient satisfies $k \, \Delta T _ { \text{int} } / L _ { c } \approx h \left( T - T _ { \infty } \right )$, i.e.
$$
\Delta T _ { \text{int} } \approx { \frac { h L _ { c } } { k } } \left( T - T _ { \infty } \right ) = \mathrm { B i } \times \left( T - T _ { \infty } \right )
$$
**The internal non-uniformity is therefore about $\mathrm { B i }$ times the driving temperature difference, to within a factor of order one that depends on shape.** At $\mathrm { B i } = 0 . 1$ the far side of the body is $10\ \%$ different from the surface in terms of the remaining excess temperature, which is the same as saying the time constant is $10\ \%$ out. **That is the whole content of the $0 . 1$ rule, and it is why the rule is a tolerance you are entitled to change: if you can accept $2 5\ \%$ on a cooling time, $\mathrm { B i } = 0 . 2 5$ is a perfectly honest choice, and if you are computing thermal stress, even $\mathrm { B i } = 0 . 0 1$ may be too crude because stress cares about the gradient and not the mean.**
:::
:::

::: definition The Fourier number {#def-fourier}
$$
\boxed { \; \mathrm { F o } = { \frac { \alpha t } { L ^ { 2 } } } \; } \qquad \text{(dimensionless time)} \qquad \Longleftrightarrow \qquad { \frac { t } { \tau } } = { \frac { h A } { \rho c V } } t = { \frac { h L _ { c } } { k } } { \frac { k t } { \rho c L _ { c } ^ { 2 } } } = \mathrm { B i } \times \mathrm { F o }
$$
**The lumped solution is simply $\theta / \theta _ { i } = e ^ { - \mathrm { B i } \, \mathrm { F o } }$, and this identity is the reason two dimensionless numbers are enough to describe every linear transient conduction problem**: the answer is always a function of $\mathrm { F o }$ with $\mathrm { B i }$ as a parameter, so a cooling curve measured on a small model predicts a large part exactly, provided both $\mathrm { B i }$ and $\mathrm { F o }$ are matched.
**The two numbers have simple physical readings that are worth more than the formulas.**
**$\mathrm { F o }$ is the ratio of the heat that has diffused through the body to the heat stored in it** — or, more usefully, **the elapsed time measured in units of the time for conduction across the body, $L ^ { 2 } / \alpha$.** $\mathrm { F o } = 1$ means "the wave has had time to cross"; $\mathrm { F o } = 0 . 0 1$ means "the wave has gone a tenth of the way".
**$\mathrm { B i }$ is the ratio of the temperature drop inside the body to the temperature drop outside it.** $\mathrm { B i } \ll 1$: the fluid is the bottleneck and the body is isothermal. $\mathrm { B i } \gg 1$: the body is the bottleneck and its surface is at the fluid temperature.
$$
\begin{array}{l c c}
\text{Regime} & \text{Condition} & \text{Governing answer} \\
\text{Lumped} & { \mathrm { B i } < 0 . 1 } & { \theta / \theta _ { i } = e ^ { - { \mathrm { B i } } \, { \mathrm { F o } } } } \\
\text{Semi-infinite} & { \mathrm { F o } < 0 . 0 5 , \text{ any } { \mathrm { B i } } } & { { \text{error function, penetration } } { \sqrt { \alpha t } } } \\
\text{One-term series} & { \mathrm { F o } > 0 . 2 , \text{ any } { \mathrm { B i } } } & { C _ { 1 } e ^ { - \zeta _ { 1 } ^ { 2 } { \mathrm { F o } } } \times \text{shape function} } \\
\text{Steady state} & { \zeta _ { 1 } ^ { 2 } \mathrm { F o } \gtrsim 5 } & { \theta < 1 \ \% \text{ of } \theta _ { i } , \text{ use the steady solution} }
\end{array}
$$
:::

::: widget plot
title: Lumped cooling of the same aluminium sphere in three fluids
f: exp(-x/1012); exp(-x/202.5); exp(-x/50.6)
x: 0, 600
y: 0, 1.05
labels: still air, tau = 1012 s; forced air, tau = 203 s; oil bath, tau = 51 s
caption: A $2 5 \ \mathrm{mm}$ diameter aluminium sphere ($\rho = 2 7 0 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 9 0 0 \ \mathrm { J / k g \, K }$, $k = 1 8 0 \ \mathrm { W / m \, K }$) cooling from any initial temperature in a $2 5 \ {} ^ { \circ } \mathrm { C }$ environment, with $h = 1 0$, $5 0$ and $2 0 0 \ \mathrm { W / m ^ { 2 } K }$. **The three curves are the same exponential with three time constants, and the time constants are in the ratio $2 0 : 4 : 1$ — exactly the inverse ratio of $h$, because $\tau = \rho c L _ { c } / h$ contains no conductivity and no size other than $L _ { c }$.** **The Biot numbers are $0 . 0 0 0 2$, $0 . 0 0 1$ and $0 . 0 0 5$, so all three are superbly lumped and the curves are exact, not approximate.** **The point of drawing them together is the vertical scale: to cool this sphere to $1\ \%$ of its excess takes $4 6 6 0 \ \mathrm{s}$ in still air and $2 3 3 \ \mathrm{s}$ in oil, and no change of metal would move either number by more than a factor of two.** **Heat treatment is a fluids problem, not a metals problem.**
:::

## When the body has a profile

::: definition The one-term approximation {#def-oneterm}
For a slab of half-thickness $L$, a cylinder of radius $r _ { o }$ and a sphere of radius $r _ { o }$, initially uniform at $T _ { i }$ and suddenly immersed in a fluid at $T _ { \infty }$, the exact solutions are infinite series of decaying exponentials. **For $\mathrm { F o } > 0 . 2$ the second term is less than $2\ \%$ of the first and the series is one term:**
$$
\theta ^ { * } = { \frac { T - T _ { \infty } } { T _ { i } - T _ { \infty } } } = C _ { 1 } e ^ { - \zeta _ { 1 } ^ { 2 } \mathrm { F o } } \times \underbrace { \cos \left( \zeta _ { 1 } x ^ { * } \right ) } _ { \text{slab} } \quad \text{or} \quad \underbrace { J _ { 0 } \left( \zeta _ { 1 } r ^ { * } \right ) } _ { \text{cylinder} } \quad \text{or} \quad \underbrace { { \frac { \sin \left( \zeta _ { 1 } r ^ { * } \right ) } { \zeta _ { 1 } r ^ { * } } } } _ { \text{sphere} }$$
where $x ^ { * } = x / L$ or $r ^ { * } = r / r _ { o }$, $\mathrm { F o } = \alpha t / L ^ { 2 }$ (or $r _ { o } ^ { 2 }$), $\mathrm { B i } = h L / k$ (or $h r _ { o } / k$), and
$$
\begin{array}{l l l}
\text{Slab} & \zeta _ { 1 } \tan \zeta _ { 1 } = \mathrm { B i } & C _ { 1 } = { \dfrac { 4 \sin \zeta _ { 1 } } { 2 \zeta _ { 1 } + \sin 2 \zeta _ { 1 } } } \\[8pt]
\text{Cylinder} & \zeta _ { 1 } J _ { 1 } \left( \zeta _ { 1 } \right ) / J _ { 0 } \left( \zeta _ { 1 } \right ) = \mathrm { B i } & C _ { 1 } = { \dfrac { 2 J _ { 1 } \left( \zeta _ { 1 } \right ) } { \zeta _ { 1 } \left[ J _ { 0 } ^ { 2 } \left( \zeta _ { 1 } \right ) + J _ { 1 } ^ { 2 } \left( \zeta _ { 1 } \right ) \right] } } \\[10pt]
\text{Sphere} & 1 - \zeta _ { 1 } \cot \zeta _ { 1 } = \mathrm { B i } & C _ { 1 } = { \dfrac { 2 \left( \sin \zeta _ { 1 } - \zeta _ { 1 } \cos \zeta _ { 1 } \right ) } { \zeta _ { 1 } - \sin \zeta _ { 1 } \cos \zeta _ { 1 } } }
\end{array}
$$
$$
\begin{array}{c c c c c c c}
\mathrm { B i } & \zeta _ { 1 } \ ( \text{slab} ) & C _ { 1 } \ ( \text{slab} ) & \zeta _ { 1 } \ ( \text{cyl} ) & C _ { 1 } \ ( \text{cyl} ) & \zeta _ { 1 } \ ( \text{sph} ) & C _ { 1 } \ ( \text{sph} ) \\ \hline
0 . 1 & 0 . 3 1 1 1 & 1 . 0 1 6 1 & 0 . 4 4 1 7 & 1 . 0 2 4 6 & 0 . 5 4 2 3 & 1 . 0 2 9 8 \\
0 . 2 & 0 . 4 3 2 8 & 1 . 0 3 1 1 & 0 . 6 1 7 0 & 1 . 0 4 8 3 & 0 . 7 5 9 3 & 1 . 0 5 9 2 \\
0 . 5 & 0 . 6 5 3 3 & 1 . 0 7 0 1 & 0 . 9 4 0 8 & 1 . 1 1 4 3 & 1 . 1 6 5 6 & 1 . 1 4 4 1 \\
1 & 0 . 8 6 0 3 & 1 . 1 1 9 1 & 1 . 2 5 5 8 & 1 . 2 0 7 1 & 1 . 5 7 0 8 & 1 . 2 7 3 2 \\
2 & 1 . 0 7 6 9 & 1 . 1 7 8 5 & 1 . 5 9 9 4 & 1 . 3 3 8 4 & 2 . 0 2 8 8 & 1 . 4 7 9 3 \\
3 & 1 . 1 9 2 5 & 1 . 2 1 0 2 & 1 . 7 8 8 7 & 1 . 4 1 9 1 & 2 . 2 8 8 9 & 1 . 6 2 2 7 \\
5 & 1 . 3 1 3 8 & 1 . 2 4 0 2 & 1 . 9 8 9 8 & 1 . 5 0 2 9 & 2 . 5 7 0 4 & 1 . 7 8 7 0 \\
1 0 & 1 . 4 2 8 9 & 1 . 2 6 2 0 & 2 . 1 7 9 5 & 1 . 5 6 7 7 & 2 . 8 3 6 3 & 1 . 9 2 4 9 \\
1 0 0 & 1 . 5 5 5 2 & 1 . 2 7 3 1 & 2 . 3 8 0 9 & 1 . 6 0 1 5 & 3 . 1 1 0 2 & 1 . 9 9 9 0
\end{array}
$$
**Three things the table says that no chart makes obvious.**
**(i) $\zeta _ { 1 }$ saturates.** For the slab it runs from $0$ to $\pi / 2$ as $\mathrm { B i } \to \infty$; for the sphere to $\pi$. **Beyond $\mathrm { B i } \approx 1 0$ the cooling rate is within about $20\ \%$ of its limit and barely depends on $h$ — you cannot quench a big steel part much faster by using a better quench, only by making it smaller.**
**(ii) $C _ { 1 }$ is not $1$.** It rises to $1 . 2 7$ for the slab and $2 . 0$ for the sphere, which is the mathematical trace of the fact that the initial profile is not an eigenfunction. **The practical consequence is that the one-term formula must not be used below $\mathrm { F o } \approx 0 . 2$, where it can predict a temperature *above* the initial one.**
**(iii) Shape matters less than you would think.** At $\mathrm { B i } = 1$ the three $\zeta _ { 1 }$ differ by a factor of $1 . 8$, so the late-time cooling rates, which go as $\zeta_1^2$, differ by $3.3$; **at $\mathrm { B i } = 1 0 0$ the three $\zeta _ { 1 } ^ { 2 }$ are in the ratio $1 : 2 . 3 4 : 4 . 0 0$ — the sphere of radius $L$ cools four times as fast as the slab of half-thickness $L$.** The lumped model, with $\tau \propto L_c = L,\ L/2,\ L/3$, would predict $1 : 2 : 3$ — the right order and roughly the right size. **Use $V / A$ for a rough answer and the table for a right one.**
:::

::: widget plot
title: Centre temperature of a slab against Fourier number, for four Biot numbers
f: 1.0161*exp(-0.09678*x); 1.0701*exp(-0.4268*x); 1.1191*exp(-0.74012*x); 1.2620*exp(-2.04176*x)
x: 0, 3
y: 0, 1.35
labels: Bi = 0.1; Bi = 0.5; Bi = 1; Bi = 10
caption: The one-term centre temperature $\theta _ { 0 } ^ { * } = C _ { 1 } e ^ { - \zeta _ { 1 } ^ { 2 } \mathrm { F o } }$ for a plane wall at $\mathrm { B i } = 0 . 1$, $0 . 5$, $1$ and $1 0$. **The four curves are straight lines on this semi-log scale — that is what "one-term" means — and their slopes are $\zeta _ { 1 } ^ { 2 } = 0 . 0 9 7$, $0 . 4 2 7$, $0 . 7 4 0$ and $2 . 0 4 2$.** **The $\mathrm { B i } = 0 . 1$ curve is the lumped answer: its slope is $0 . 0 9 7$ against the lumped prediction $\mathrm { B i } = 0 . 1$, and its intercept $C _ { 1 } = 1 . 0 1 6$ is within $1 . 6 \ \%$ of unity.** **The $\mathrm { B i } = 1 0$ curve is the interesting one: its intercept is $1 . 2 6$, above the initial temperature, which is not a paradox but the signature of a solution that is only valid for $\mathrm { F o } > 0 . 2$ — the true curve leaves $( 0 , 1 )$ steeply and merges with the straight line near $\mathrm { F o } = 0 . 2$.** **Read the spacing of the curves at $\theta ^ { * } = 0 . 1$: $\mathrm { F o } = 2 4 . 0$, $5 . 6$, $3 . 3$ and $1 . 2 4$. The cooling time from $\mathrm { B i } = 0 . 1$ to $\mathrm { B i } = 1 0$ falls by only a factor of $1 9$, not the factor of $1 0 0$ that the $h$ ratio would suggest — the internal resistance is eating the improvement, exactly as the Biot number says it should.**
:::

## The semi-infinite solid

::: definition The semi-infinite solid and the penetration depth {#def-semiinf}
A body that has not yet felt its far boundary behaves as a half-space, and the heat equation in a half-space has a **similarity solution**: the independent variables combine into the single group
$$
\eta = { \frac { x } { 2 { \sqrt { \alpha t } } } } \qquad \Longrightarrow \qquad { \frac { T - T _ { i } } { T _ { s } - T _ { i } } } = \operatorname { erfc } ( \eta ) , \qquad q _ { s } ^ { \prime \prime } = { \frac { k \left( T _ { s } - T _ { i } \right ) } { \sqrt { \pi \alpha t } } }
$$
**The three standard cases, all of them functions of $\eta$ alone:**
$$
\begin{array}{l l l}
\text{Prescribed surface temperature} & { T ( 0 , t ) = T _ { s } } & { \dfrac { T - T _ { i } } { T _ { s } - T _ { i } } = \operatorname { erfc } \eta , \quad q _ { s } ^ { \prime \prime } = \dfrac { k \Delta T } { \sqrt { \pi \alpha t } } } \\[10pt]
\text{Prescribed surface flux} & { q _ { s } ^ { \prime \prime } = \text{const} } & { T _ { s } - T _ { i } = \dfrac { 2 q _ { s } ^ { \prime \prime } } { k } \sqrt { \dfrac { \alpha t } { \pi } } , \quad T - T _ { i } = \dfrac { 2 q _ { s } ^ { \prime \prime } \sqrt { \alpha t } } { k } \left[ { \frac { e ^ { - \eta ^ { 2 } } } { \sqrt { \pi } } } - \eta \operatorname { erfc } \eta \right] } \\[10pt]
\text{Convection at the surface} & { - k \partial T / \partial x = h ( T _ { \infty } - T _ { s } ) } & { \dfrac { T - T _ { i } } { T _ { \infty } - T _ { i } } = \operatorname { erfc } \eta - e ^ { h x / k + \xi ^ { 2 } } \operatorname { erfc } ( \eta + \xi ) , \ \xi = \dfrac { h \sqrt { \alpha t } } { k } }
\end{array}
$$
**The penetration depth is the whole story in one symbol:**
$$
\boxed { \; \delta \sim { \sqrt { \alpha t } } \; } \qquad \text{and} \qquad t \sim { \frac { \delta ^ { 2 } } { \alpha } }
$$
**Distance goes as the square root of time, so time goes as the square of distance — and this is the single most consequential scaling in heat treatment, in casting, in fire safety and in cooking.** **Doubling the depth to which you want to change a temperature quadruples the time; halving the section you have to cool cuts the time to a quarter.** **In the conduction-limited regime a $2 5 \ \mathrm{mm}$ bar cools through in about a quarter of the time of a $5 0 \ \mathrm{mm}$ bar of the same steel, and a $5 0 \ \mathrm{mm}$ bar in a quarter of the time of a $1 0 0 \ \mathrm{mm}$ one** — which is why heat-treatment schedules are written by section size.
**The model is valid while $\mathrm { F o } = \alpha t / L ^ { 2 } \lesssim 0 . 0 5$**, i.e. while $\sqrt{\alpha t} \lesssim 0.22\,L$.
:::

::: widget plot
title: Temperature profiles in a semi-infinite steel body
f: 100*erf(x/22.36); 100*erf(x/70.71); 100*erf(x/223.6)
x: 0, 150
y: 0, 105
labels: after 10 s; after 100 s; after 1000 s
caption: The percentage of the initial temperature difference still present at depth $x$ (millimetres) in a large carbon-steel body ($\alpha = 1 . 2 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$) whose surface is suddenly held at the ambient temperature. **The three curves collapse onto one another when plotted against $x / { \sqrt { t } }$ — that is the similarity property, and it is why the horizontal axis could equally well be $\eta$.** **Read the depth $2\sqrt{\alpha t}$ (where $\eta = 1$ and $84\ \%$ of the difference survives): $2 2 \ \mathrm{mm}$ at $1 0 \ \mathrm{s}$, $7 1 \ \mathrm{mm}$ at $1 0 0 \ \mathrm{s}$, $2 2 4 \ \mathrm{mm}$ at $1 0 0 0 \ \mathrm{s}$ — in the ratio $1 : { \sqrt { 1 0 } } : 1 0$ exactly.** **The corollary for surface engineering: heat reaches $1 . 5 \ \mathrm{mm}$ into steel ($\delta^2/\alpha$) in about $0 . 2 \ \mathrm{s}$ and $1 5 \ \mathrm{mm}$ in about $1 8 \ \mathrm{s}$ — a hundredfold difference for a tenfold depth — which is why shallow induction hardening uses heating times of seconds or less.**
:::

::: example Quenching a large forging in a water spray {#ex-quench}
A $8 0 0 \ \mathrm{mm}$ diameter carbon-steel forging ($k = 4 8 \ \mathrm { W / m \, K }$, $\alpha = 1 . 2 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$) is uniform at $8 0 0 \ {} ^ { \circ } \mathrm { C }$ and is sprayed with water at $3 0 \ {} ^ { \circ } \mathrm { C }$ giving $h = 1 2 0 0 \ \mathrm { W / m ^ { 2 } K }$. What are the surface temperature and the temperature $3 0 \ \mathrm{mm}$ below it after $6 0 \ \mathrm{s}$?

::: solution
**Check the model first.** $\mathrm { F o } = 1 . 2 5 \times 1 0 ^ { - 5 } \times 6 0 / 0 . 4 ^ { 2 } = 4 . 7 \times 1 0 ^ { - 3 } \ll 0 . 0 5$, so the semi-infinite model is superb. **Check the regime next:** $\mathrm { B i } = h r / k = 1 2 0 0 \times 0 . 4 / 4 8 = 1 0 \gg 1$, so lumped is hopeless.
**Surface.** With $\xi _ { 0 } = h ^ { 2 } \alpha t / k ^ { 2 } = \left( 1 2 0 0 \times { \sqrt { 1 . 2 5 \times 1 0 ^ { - 5 } \times 6 0 } } / 4 8 \right ) ^ { 2 } = 0 . 6 8 4 7 ^ { 2 } = 0 . 4 6 8 8$ :
$$
{ \frac { T _ { s } - T _ { i } } { T _ { \infty } - T _ { i } } } = e ^ { \xi _ { 0 } } \operatorname { erfc } \left( { \frac { h { \sqrt { \alpha t } } } { k } } \right ) = 1 . 5 9 8 \times 0 . 3 3 2 9 = 0 . 5 3 2
$$
$$
T _ { s } = 8 0 0 + 0 . 5 3 2 \times ( 3 0 - 8 0 0 ) = \mathbf { 3 9 0 \ {} ^ { \circ } C }
$$
**At $3 0 \ \mathrm{mm}$ depth**, $\eta = 0 . 0 3 0 / ( 2 { \sqrt { 1 . 2 5 \times 1 0 ^ { - 5 } \times 6 0 } } ) = 0 . 5 4 8$ and the exponent of the second term is $x h / k + \xi _ { 0 } = 0 . 7 5 0 + 0 . 4 6 9 = 1 . 2 1 9$ :
$$
{ \frac { T - T _ { i } } { T _ { \infty } - T _ { i } } } = \operatorname { erfc } ( 0 . 5 4 8 ) - e ^ { 1 . 2 1 9 } \operatorname { erfc } ( 1 . 2 3 2 ) = 0 . 4 3 8 6 - 3 . 3 8 3 \times 0 . 0 8 1 4 = 0 . 1 6 3
$$
$$
T = 8 0 0 + 0 . 1 6 3 \times ( - 7 7 0 ) = \mathbf { 6 7 4 \ {} ^ { \circ } C }
$$
**After one minute of water spray on a red-hot forging, the surface is at $3 9 0 \ {} ^ { \circ } \mathrm { C }$ and $3 0 \ \mathrm{mm}$ down it is still at $6 7 4 \ {} ^ { \circ } \mathrm { C }$ — a gradient of $9 . 5 \ \mathrm { K / m m }$ and a surface-to-depth difference of $2 8 4 \ \mathrm{K}$.** **That difference corresponds to a free thermal strain of $1 2 \times 1 0 ^ { - 6 } \times 2 8 4 = 3 . 4 \times 1 0 ^ { - 3 }$, which if fully constrained in biaxial tension, $E \alpha_e \Delta T / (1 - \nu)$ with a hot modulus of $1 5 0 \ \mathrm { G P a }$ and $\nu = 0.3$, is a stress of about $7 3 0 \ \mathrm { M P a }$ — several times the yield strength of hot steel.** **The surface therefore yields, and the part comes out of the spray with a residual stress of order the yield stress locked into it; which is why large forgings are quenched in oil or polymer or interrupted and transferred warm, and why the straightness of a large ring after quenching is a matter of judgement and experience rather than of calculation.**
:::
:::

::: definition Contact temperature {#def-contactT}
Bring two semi-infinite bodies at $T _ { 1 }$ and $T _ { 2 }$ into perfect thermal contact. The interface temperature is constant in time and given by the **effusivities** $e = \sqrt { k \rho c }$:
$$
\boxed { \; T _ { c } = { \frac { e _ { 1 } T _ { 1 } + e _ { 2 } T _ { 2 } } { e _ { 1 } + e _ { 2 } } } \; } \qquad q ^ { \prime \prime } ( t ) = { \frac { e _ { 1 } e _ { 2 } } { e _ { 1 } + e _ { 2 } } } { \frac { T _ { 1 } - T _ { 2 } } { \sqrt { \pi t } } }
$$
**The interface temperature is an effusivity-weighted average in which each material's weight is its ability to supply heat, and the heat flux decays as $1 / { \sqrt { t } }$ — the contact is most violent at the instant of touch.**
$$
\begin{array}{l c c}
\text{Material} & e = { \sqrt { k \rho c } } \ \left( \mathrm { J / m ^ { 2 } K \, s ^ { 1 / 2 } } \right) & \text{Feel at } 2 0 \ \mathrm { ^ \circ C } \\
\text{Copper} & 3 7 { , } 3 0 0 & \text{very cold} \\
\text{Aluminium} & 2 0 { , } 9 0 0 & \text{cold} \\
\text{Carbon steel} & 1 3 { , } 6 0 0 & \text{cold} \\
\text{Concrete} & 1 7 0 0 & \text{cool} \\
\text{Glass} & 1 6 0 0 & \text{cool} \\
\text{Oak} & 4 7 0 & \text{neutral} \\
\text{Polymer foam} & \sim 4 0 & \text{warm} \\
\text{Still air} & 5 . 5 & \text{warm unless moving}
\end{array}
$$
**The table explains why a metal and a wooden surface at the same temperature feel different, and why a hot metal plate burns where hot air at the same temperature does not.**
:::

::: example A billet lands on an aluminium table {#ex-touch}
A carbon-steel billet ($k = 4 8 \ \mathrm { W / m \, K }$, $\rho = 7 8 5 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 4 9 0 \ \mathrm { J / k g \, K }$) at $8 0 0 \ {} ^ { \circ } \mathrm { C }$ is set down on a thick aluminium transfer plate ($k = 1 8 0 \ \mathrm { W / m \, K }$, $\rho = 2 7 0 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 9 0 0 \ \mathrm { J / k g \, K }$) at $2 0 \ {} ^ { \circ } \mathrm { C }$. What is the interface temperature, and what is the initial heat flux?

::: solution
$$
e _ { \text{steel} } = { \sqrt { 4 8 \times 7 8 5 0 \times 4 9 0 } } = 1 3 { , } 5 8 5 , \qquad e _ { \text{Al} } = { \sqrt { 1 8 0 \times 2 7 0 0 \times 9 0 0 } } = 2 0 { , } 9 1 4 \ \mathrm { J / m ^ { 2 } K \, s ^ { 1 / 2 } }
$$
$$
T _ { c } = { \frac { 1 3 { , } 5 8 5 \times 8 0 0 + 2 0 { , } 9 1 4 \times 2 0 } { 1 3 { , } 5 8 5 + 2 0 { , } 9 1 4 } } = { \frac { 1 . 1 2 8 6 \times 1 0 ^ { 7 } } { 3 4 { , } 4 9 9 } } = \mathbf { 3 2 7 \ {} ^ { \circ } C }
$$
**The aluminium wins the argument, even though it is $7 8 0 \ \mathrm{K}$ colder, because it has $5 4 \ \%$ more effusivity.** **The initial flux is formally infinite and the practical number is the time-integrated one:**
$$
q ^ { \prime \prime } ( t ) = { \frac { 1 3 { , } 5 8 5 \times 2 0 { , } 9 1 4 } { 3 4 { , } 4 9 9 } } \times { \frac { 7 8 0 } { \sqrt { \pi t } } } = { \frac { 3 . 6 2 \times 1 0 ^ { 6 } } { \sqrt { t } } } \ \mathrm { W / m ^ { 2 } } \quad ( t \text{ in s} )
$$
**$3 . 6 \ \mathrm { M W / m ^ { 2 } }$ at one second, $2 . 3 \ \mathrm { M W / m ^ { 2 } }$ averaged over the first ten.** In practice the contact is imperfect, and the contact resistance limits the early flux and lowers the interface temperature. **Even so, the $3 2 7 \ {} ^ { \circ } \mathrm { C}$ ideal-contact figure is the one to check against the aluminium's properties: it is well above the temperatures at which aluminium alloys begin to lose strength, which is why hot-handling tables are protected or cooled.**
:::
:::

## Thermal shock

::: definition The two shock severity numbers {#def-shock}
A body whose surface is suddenly moved by $\Delta T$ relative to its interior cannot strain freely, and the resulting stress is, for a plate,
$$
\sigma _ { \text{surface} } \approx { \frac { E \alpha _ { e } \, \Delta T } { 1 - \nu } } \times \begin{cases} 1 & { \mathrm { B i } \gtrsim 3 \ \text{(surface at fluid temperature, full constraint)}} \\ { \mathrm { B i } / 3 } & { \mathrm { B i } \lesssim 3 \ \text{(parabolic internal profile)}} \end{cases}
$$
**Equating to the fracture strength $\sigma _ { f }$ gives the two classical shock-resistance parameters:**
$$
\boxed { \; R = { \frac { \sigma _ { f } \left( 1 - \nu \right ) } { E \alpha _ { e } } } \quad \text{(strong quench)} \qquad \qquad \Delta T _ { \text{crit} } = { \frac { 3 R k } { h L } } \quad \text{(weak quench)} \; }
$$
$$
\begin{array}{l c c c c c c}
\text{Material} & \sigma _ { f } \left( \mathrm { M P a } \right) & E \left( \mathrm { G P a } \right) & \nu & \alpha _ { e } \left( 1 0 ^ { - 6 } / \mathrm { K } \right) & k \left( \mathrm { W / m \, K } \right) & R \left( \mathrm { K } \right) \\
\text{Fused silica} & 6 0 & 7 2 & 0 . 1 7 & 0 . 5 5 & 1 . 4 & 1 2 5 8 \\
\text{Borosilicate glass} & 7 0 & 6 4 & 0 . 2 0 & 3 . 3 & 1 . 2 & 2 6 5 \\
\text{Silicon carbide} & 3 5 0 & 4 1 0 & 0 . 1 7 & 4 . 5 & 1 2 0 & 1 5 7 \\
\text{Porcelain} & 5 5 & 7 0 & 0 . 2 2 & 6 . 5 & 1 . 5 & 9 4 \\
\text{Alumina} & 2 5 0 & 3 7 0 & 0 . 2 6 & 8 . 0 & 2 5 & 6 3 \\
\text{Soda-lime glass} & 4 0 & 7 0 & 0 . 2 2 & 9 . 0 & 1 . 0 & 5 0
\end{array}
$$
**The table contains the most counter-intuitive fact in the mechanics of ceramics: alumina is stronger than borosilicate glass by a factor of $3 . 6$ and $2 1$ times more conductive, and in a strong quench it is far more shock-sensitive, because its Young's modulus is $5 . 8$ times higher and its expansion $2 . 4$ times larger, and the modulus and the expansion are what generate the stress.** **Fused silica survives a $1 2 5 0 \ \mathrm{K}$ quench not because it is strong — it is among the weakest materials in the table — but because it barely expands.**
**The second reading is the one that changes a design: in the weak-quench regime $\Delta T _ { \text{crit} } \propto k / ( h L )$, so the remedies are a gentler fluid, a thinner section and a more conductive material — and the first of these is free.**
:::

::: example Will the tube crack? {#ex-shock}
An alumina tube with a $6 \ \mathrm{mm}$ wall is removed from a furnace at $8 0 0 \ {} ^ { \circ } \mathrm { C }$ and (a) set on a steel bench in still air, (b) plunged into a water bath at $2 5 \ {} ^ { \circ } \mathrm { C }$ with $h = 5 0 0 0 \ \mathrm { W / m ^ { 2 } K }$.

::: solution
Half-thickness $L = 0 . 0 0 3 \ \mathrm { m }$, $k = 2 5 \ \mathrm { W / m \, K }$, $R = 6 3 \ \mathrm { K }$.
**(a) Still air, $h \approx 1 0 \ \mathrm { W / m ^ { 2 } K }$.** $\mathrm { B i } = 1 0 \times 0 . 0 0 3 / 2 5 = 0 . 0 0 1 2 \ll 3$, so
$$
\Delta T _ { \text{crit} } = { \frac { 3 \times 6 3 \times 2 5 } { 1 0 \times 0 . 0 0 3 } } = 1 5 7 { , } 5 0 0 \ \mathrm { K }
$$
**It will sit on the bench safely.** The tube stays almost uniform as it cools, and the stress is well under a hundredth of the strength.
**(b) Water.** $\mathrm { B i } = 5 0 0 0 \times 0 . 0 0 3 / 2 5 = 0 . 6 0 < 3$, so
$$
\Delta T _ { \text{crit} } = { \frac { 3 \times 6 3 \times 2 5 } { 5 0 0 0 \times 0 . 0 0 3 } } = \mathbf { 3 1 5 \ \mathrm { K } } \qquad \text{against an actual } \Delta T = 7 7 5 \ \mathrm { K }
$$
**It breaks, by a factor of two and a half on the driving temperature difference.** **Now the useful part: the formula says the failure is not about the water, it is about $h L$.** Cooling the tube in still air first to $4 0 0 \ {} ^ { \circ } \mathrm { C }$ and then plunging gives $\Delta T = 3 7 5 \ \mathrm { K }$ — still above the $315\ \mathrm{K}$ limit. **The reliable fix is to make $h$ small where the part is hot: plunge into warm water, or into still air with a forced-air blast only after the tube is below $3 0 0 \ {} ^ { \circ } \mathrm { C }$, or use a thinner tube, since $\Delta T _ { \text{crit} } \propto 1 / L$ and halving the wall doubles the shock margin at no cost in any other property.**
:::
:::

## Cyclic heating: the thermal wave

::: definition The damping depth of a thermal wave {#def-cyclic}
When the surface temperature oscillates sinusoidally with period $P$ and angular frequency $\omega = 2 \pi / P$, the body responds with a **damped travelling wave**:
$$
\boxed { \; { \frac { T ( x , t ) - T _ { m } } { \Delta T _ { s } } } = e ^ { - x / \delta } \cos \left( \omega t - { \frac { x } { \delta } } \right ) , \qquad \delta = { \sqrt { \frac { 2 \alpha } { \omega } } } = { \sqrt { \frac { \alpha P } { \pi } } } \; }
$$
**The amplitude falls by $1 / e$ every depth $\delta$ and the phase lags by one radian per $\delta$ — so the wave travels at a speed $\omega \delta = \sqrt { 2 \alpha \omega }$, which is proportional to $\sqrt { \alpha }$ and to the square root of the frequency.** **Unlike a sound wave, a thermal wave has no fixed speed: high-frequency heat travels faster than low-frequency heat, in the ratio of the square roots of their frequencies.**
$$
\begin{array}{l c c c}
\text{Material} & \alpha \left( \mathrm { m ^ { 2 } / s } \right) & \delta _ { \text{daily} } \left( P = 2 4 \ \mathrm { h } \right) & \delta _ { \text{annual} } \left( P = 1 \ \mathrm { y r } \right) \\
\text{Copper} & 1 . 1 1 \times 1 0 ^ { - 4 } & 1 . 7 5 \ \mathrm { m } & 3 3 . 4 \ \mathrm { m } \\
\text{Aluminium} & 9 . 7 \times 1 0 ^ { - 5 } & 1 . 6 3 \ \mathrm { m } & 3 1 . 2 \ \mathrm { m } \\
\text{Carbon steel} & 1 . 2 5 \times 1 0 ^ { - 5 } & 5 8 6 \ \mathrm { m m } & 1 1 . 2 \ \mathrm { m } \\
\text{Concrete} & 7 . 0 \times 1 0 ^ { - 7 } & 1 3 9 \ \mathrm { m m } & 2 . 6 5 \ \mathrm { m } \\
\text{Brick} & 5 . 3 \times 1 0 ^ { - 7 } & 1 2 1 \ \mathrm { m m } & 2 . 3 1 \ \mathrm { m } \\
\text{Insulation board} & 3 . 7 \times 1 0 ^ { - 7 } & 1 0 1 \ \mathrm { m m } & 1 . 9 3 \ \mathrm { m }
\end{array}
$$
**Note first that for metals the daily damping depth is larger than most buildings: a copper billet is thermally isothermal on a daily timescale, and thermal mass is simply not available as a design device to anyone working in metal.** **The table is the physical basis of every building code's "thermal mass" clause, and it says something sharper than the clause does: a $2 0 0 \ \mathrm{mm}$ concrete wall passes $2 4 \ \%$ of a daily temperature swing and $9 3 \ \%$ of an annual one.** **Thermal mass is a low-pass filter whose corner is set by the period you care about, and its whole value is that the corner falls between the day and the year.** **The phase lag is the other half of the benefit and the half that is usually left out of the calculation: a $2 0 0 \ \mathrm{mm}$ concrete wall delays the daily peak by $2 0 0 / 1 3 9 = 1 . 4 4$ radians, which is $1 . 4 4 / 2 \pi \times 2 4 = 5 . 5$ hours — the afternoon sun arrives as a peak indoors at about nine at night, when the cooling system is already off and the night flush has begun.**
:::

::: widget plot
title: Damping of a thermal wave in concrete
f: 100*exp(-x/139); 100*exp(-x/2652)
x: 0, 600
y: 0, 105
labels: daily wave, delta = 139 mm; annual wave, delta = 2652 mm
caption: Amplitude as a percentage of the surface swing against depth in millimetres for concrete ($\alpha = 7 . 0 \times 1 0 ^ { - 7 } \ \mathrm { m ^ { 2 } / s }$) subjected to a daily and to an annual surface temperature wave. **At $6 0 0 \ \mathrm{mm}$ the daily wave is down to $1 . 3 \ \%$ and the annual wave has lost only $2 0 \ \%$.** **The two curves are the same exponential with time constants in the ratio $1 9$, which is $\sqrt { 3 6 5 }$ — the square root of the ratio of the periods, exactly as $\delta = \sqrt { \alpha P / \pi }$ requires.** **Read the design conclusion off the graph: no thickness of concrete will ever insulate a building against the seasons, and no thickness thinner than about $3 0 0 \ \mathrm{mm}$ will do much about a summer afternoon. Insulation stops the annual wave; mass only delays the daily one, and the two are not substitutes.**
:::

## Multi-dimensional transients by product solutions

::: definition Product solutions {#def-product}
If a body is the intersection of two or three one-dimensional bodies — a short cylinder is a long cylinder intersected by a slab, a rectangular block is three slabs — and all faces are exposed to the same $T _ { \infty }$ with the same $h$, and there is no internal generation, then
$$
\boxed { \; \left( { \frac { T - T _ { \infty } } { T _ { i } - T _ { \infty } } } \right ) _ { \text{joint} } = \left( \theta ^ { * } \right ) _ { 1 } \times \left( \theta ^ { * } \right ) _ { 2 } \times \left( \theta ^ { * } \right ) _ { 3 } \; }
$$
evaluated at the same point and the same time, each factor from the one-dimensional solution for that body. **The result is exact, not approximate, and it is a direct consequence of the heat equation being linear and separable: the product of solutions of $\partial \theta / \partial t = \alpha \nabla ^ { 2 } \theta$ in the separate coordinates is a solution in all of them.**
**The rule fails in exactly three situations, and all three are common: faces at different $h$ or different $T _ { \infty }$ (a billet with one hot end), internal heat generation, and contact between two bodies of different properties. In the first two cases the answer is a finite-difference model; in the third it is a contact-resistance model with the transient solved on each side.**
:::

::: example A short cylinder in a furnace {#ex-short}
A stainless-steel billet $6 0 \ \mathrm{mm}$ in diameter by $1 2 0 \ \mathrm{mm}$ long ($k = 1 6 \ \mathrm { W / m \, K }$, $\rho = 7 9 0 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 5 0 0 \ \mathrm { J / k g \, K }$, $\alpha = 4 . 0 5 \times 1 0 ^ { - 6 } \ \mathrm { m ^ { 2 } / s }$) comes from a rack at $2 0 \ {} ^ { \circ } \mathrm { C }$ into a furnace at $8 0 0 \ {} ^ { \circ } \mathrm { C }$ with $h = 1 2 0 \ \mathrm { W / m ^ { 2 } K }$ on all faces. What is the temperature at the centre of the mid-plane after $1 0$ minutes, and how long until the coldest point reaches $7 0 0 \ {} ^ { \circ } \mathrm { C }$?

::: solution
**The billet is a long cylinder of radius $0 . 0 3 0 \ \mathrm { m }$ intersected by a slab of half-thickness $0 . 0 6 0 \ \mathrm { m }$. The centre of the mid-plane is the axis of the cylinder and the mid-plane of the slab, so both factors are evaluated at their centres.**
$$
\begin{array} { l l l l }
\text{Slab} & { L = 0 . 0 6 0 \ \mathrm { m } , \ \mathrm { B i } = 1 2 0 \times 0 . 0 6 0 / 1 6 = 0 . 4 5 0 \ \Rightarrow \ \zeta _ { 1 } = 0 . 6 2 4 4 , \ C _ { 1 } = 1 . 0 6 4 2 } \\[2pt]
\text{Cylinder} & { r _ { o } = 0 . 0 3 0 \ \mathrm { m } , \ \mathrm { B i } = 1 2 0 \times 0 . 0 3 0 / 1 6 = 0 . 2 2 5 \ \Rightarrow \ \zeta _ { 1 } = 0 . 6 5 2 4 , \ C _ { 1 } = 1 . 0 5 4 1 }
\end{array}
$$
At $t = 6 0 0 \ \mathrm { s }$: $\mathrm { F o } _ { \text{slab} } = 4 . 0 5 \times 1 0 ^ { - 6 } \times 6 0 0 / 0 . 0 6 0 ^ { 2 } = 0 . 6 7 5$ and $\mathrm { F o } _ { \text{cyl} } = 4 . 0 5 \times 1 0 ^ { - 6 } \times 6 0 0 / 0 . 0 3 0 ^ { 2 } = 2 . 7 0 0$ ,
$$
\theta _ { \text{slab} } ^ { * } = 1 . 0 6 4 2 e ^ { - 0 . 6 2 4 4 ^ { 2 } \times 0 . 6 7 5 } = 0 . 8 1 8 , \qquad \theta _ { \text{cyl} } ^ { * } = 1 . 0 5 4 1 e ^ { - 0 . 6 5 2 4 ^ { 2 } \times 2 . 7 0 0 } = 0 . 3 3 4
$$
$$
\theta ^ { * } = 0 . 8 1 8 \times 0 . 3 3 4 = 0 . 2 7 3 \qquad \Longrightarrow \qquad T = 8 0 0 - 0 . 2 7 3 \times 7 8 0 = \mathbf { 5 8 7 \ {} ^ { \circ } C }
$$
**The centre is the coldest point, as it must be for a body heated from every side.** At the same instant the barrel surface at mid-length stands at $6 0 9 \ {} ^ { \circ } \mathrm { C }$ (the cylinder factor there carries the extra $J _ { 0 } ( 0 . 6 5 2 4 ) = 0 . 8 9 6$ ), the middle of a circular end face at $6 2 7 \ {} ^ { \circ } \mathrm { C }$ , and the corner — the sharpest point on the billet — at $6 4 5 \ {} ^ { \circ } \mathrm { C }$ , $5 8 \ \mathrm{K}$ hotter than the middle.
**Solving for the time at which the centre reaches $7 0 0 \ {} ^ { \circ } \mathrm { C }$** ( $\theta ^ { * } = 1 0 0 / 7 8 0 = 0 . 1 2 8 2$ ) gives $t = 9 2 1 \ \mathrm { s } = \mathbf { 1 5 . 4 \ min }$ . **The corner passed $7 0 0 \ {} ^ { \circ } \mathrm { C }$ at $7 8 6 \ \mathrm{ s }$ , about two and a quarter minutes earlier, and stands at $7 2 7 \ {} ^ { \circ } \mathrm { C }$ when the middle arrives.**
**Two lessons from the arithmetic.** **The cylinder factor is doing all the work: at the same elapsed time it has run down to $0 . 3 3 4$ while the slab has only reached $0 . 8 1 8$ , because $\mathrm { F o } \propto 1 / L ^ { 2 }$ and the radius is half the half-length — a factor of four in $\mathrm { F o }$ and rather more than that in $\theta ^ { * }$.** **And "how long in the furnace" is answered at the centre while the metallurgy is judged at the corner.** **At the moment the middle reaches $7 0 0 \ {} ^ { \circ } \mathrm { C }$ the corners are $2 7 \ \mathrm{K}$ hotter; soak time is set by the slowest point and surface condition by the hottest, which is why furnace recipes carry a maximum surface temperature as well as a minimum centre temperature.**
:::
:::

## Exercises

::: exercise Lumped time constant {#ex-tau level=2 check="101"}
A $2 5 \ \mathrm{mm}$ diameter aluminium sphere ($\rho = 2 7 0 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 9 0 0 \ \mathrm { J / k g \, K }$, $k = 1 8 0 \ \mathrm { W / m \, K }$) is quenched in a fluid at $h = 1 0 0 \ \mathrm { W / m ^ { 2 } K }$. Find the Biot number and the time constant; enter the time constant in seconds.
::: solution
$L _ { c } = V / A = r / 3 = 0 . 0 1 2 5 / 3 = 0 . 0 0 4 1 6 7 \ \mathrm { m }$ .
$$
\mathrm { B i } = { \frac { 1 0 0 \times 0 . 0 0 4 1 6 7 } { 1 8 0 } } = \mathbf { 0 } . \mathbf { 0 0 2 3 } \qquad \tau = { \frac { \rho c L _ { c } } { h } } = { \frac { 2 7 0 0 \times 9 0 0 \times 0 . 0 0 4 1 6 7 } { 1 0 0 } } = \mathbf { 1 0 1 \ s }
$$
**Lumped applies with a factor of $4 0$ to spare, and the answer contains no conductivity: a silver sphere, with almost the same $\rho c$, would cool almost identically.**
:::
:::

::: exercise Cooling time {#ex-time level=2 check="243"}
For the sphere of [[#ex-tau|the previous exercise]], how long, in seconds, to cool from $3 0 0 \ {} ^ { \circ } \mathrm { C }$ to $5 0 \ {} ^ { \circ } \mathrm { C }$ in a $2 5 \ {} ^ { \circ } \mathrm { C }$ fluid?
::: solution
$$
{ \frac { \theta } { \theta _ { i } } } = { \frac { 5 0 - 2 5 } { 3 0 0 - 2 5 } } = { \frac { 2 5 } { 2 7 5 } } = 0 . 0 9 0 9 \qquad t = \tau \ln { \frac { 1 } { 0 . 0 9 0 9 } } = 1 0 1 . 2 5 \times 2 . 3 9 8 = \mathbf { 2 4 3 \ s }
$$
**Four minutes, of which nearly half ($111\ \mathrm{s}$) is spent going from $1 0 0 \ {} ^ { \circ } \mathrm { C }$ to $5 0 \ {} ^ { \circ } \mathrm { C }$ — the exponential is generous at the start and slow at the end: removing the first $90\ \%$ of the excess takes $2.3\tau$, and the next $9\ \%$ takes another $2.3\tau$.**
:::
:::

::: exercise Is it lumped? {#ex-bi level=2 check="0.22"}
A $2 5 \ \mathrm{mm}$ thick steel plate ($k = 4 5 \ \mathrm { W / m \, K }$) is quenched in oil on both faces with $h = 8 0 0 \ \mathrm { W / m ^ { 2 } K }$. Evaluate the Biot number and state which method applies.
::: solution
Both faces exchange, so $L _ { c } = V / A = L = 0 . 0 1 2 5 \ \mathrm { m }$ (half-thickness):
$$
\mathrm { B i } = { \frac { 8 0 0 \times 0 . 0 1 2 5 } { 4 5 } } = \mathbf { 0 . 2 2 }
$$
**Above $0 . 1$ but far below $1$ : lumped is wrong by about $2 0 \ \%$ on the time constant and by much more on the surface-to-centre difference, and the one-term series is the right tool.** **This is the awkward middle, and it is where most real heat treatment lives — the honest answer is to use the series and not to pretend the criterion has been satisfied.**
:::
:::

::: exercise Centre temperature of a slab {#ex-slab level=3 check="307"}
A steel slab $5 0 \ \mathrm{mm}$ thick ($k = 4 5 \ \mathrm { W / m \, K }$, $\alpha = 1 . 2 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$) is uniform at $8 0 0 \ {} ^ { \circ } \mathrm { C }$ and is cooled on both faces by a medium at $6 0 \ {} ^ { \circ } \mathrm { C }$ with $h = 8 0 0 \ \mathrm { W / m ^ { 2 } K }$. Find the centre temperature, in ${}^{\circ}\mathrm{C}$, after $1 5 0 \ \mathrm{s}$.
::: solution
$\mathrm { B i } = 8 0 0 \times 0 . 0 2 5 / 4 5 = 0 . 4 4 4$ . Solving $\zeta _ { 1 }$ tan $\zeta _ { 1 } = 0 . 4 4 4$ gives $\zeta _ { 1 } = 0 . 6 2 1 1$ , $C _ { 1 } = 1 . 0 6 3 5$ .
$$
\mathrm { F o } = { \frac { 1 . 2 5 \times 1 0 ^ { - 5 } \times 1 5 0 } { 0 . 0 2 5 ^ { 2 } } } = 3 . 0 0 \qquad \theta _ { 0 } ^ { * } = 1 . 0 6 3 5 \, e ^ { - 0 . 6 2 1 1 ^ { 2 } \times 3 . 0 0 } = 1 . 0 6 3 5 \times 0 . 3 1 4 3 = 0 . 3 3 4
$$
$$
T _ { 0 } = 6 0 + 0 . 3 3 4 \times 7 4 0 = { \bf 3 0 7 } \ ^ { \circ } { \bf C }
$$
**The surface at that instant is at $\theta _ { s } ^ { * } = 0 . 3 3 4 \times \cos ( 0 . 6 2 1 1 ) = 0 . 2 7 1$ , i.e. $2 6 1 \ {} ^ { \circ } \mathrm { C }$ — a $4 6 \ \mathrm{K}$ surface-to-centre difference.** **At $1 2 \times 1 0 ^ { - 6 } / \mathrm { K }$ that is a differential free strain of $5 . 5 \times 1 0 ^ { - 4 }$ , which in steel of hot modulus $1 8 0 \ \mathrm { G P a }$ is a stress of order $1 0 0 \ \mathrm { M P a }$ before any constraint factor is applied, and below the yield strength of steel at $3 0 0 \ {} ^ { \circ } \mathrm { C }$ .** **Slow-cooling schedules are written to hold this difference below a stated limit, and this arithmetic is what they are written from.**
:::
:::

::: exercise Semi-infinite cooling {#ex-semi level=2 check="197"}
A very large steel slab initially at $8 0 0 \ {} ^ { \circ } \mathrm { C }$ has its surface suddenly brought to and held at $2 0 \ {} ^ { \circ } \mathrm { C }$ . What is the temperature, in ${}^{\circ}\mathrm{C}$, $2 5 \ \mathrm{mm}$ below the surface after $3 0 0 \ \mathrm{s}$? Take $\alpha = 1 . 2 5 \times 1 0 ^ { - 5 } \ \mathrm { m ^ { 2 } / s }$.
::: solution
$$
\eta = { \frac { 0 . 0 2 5 } { 2 { \sqrt { 1 . 2 5 \times 1 0 ^ { - 5 } \times 3 0 0 } } } } = { \frac { 0 . 0 2 5 } { 0 . 1 2 2 5 } } = 0 . 2 0 4 \qquad \operatorname { erfc } ( 0 . 2 0 4 ) = 0 . 7 7 3
$$
$$
T = 8 0 0 + 0 . 7 7 3 \times ( 2 0 - 8 0 0 ) = \mathbf { 1 9 7 \ {} ^ { \circ } C }
$$
**Only $2 3 \ \%$ of the original $7 8 0 \ \mathrm{K}$ difference survives at $2 5 \ \mathrm{mm }$ after five minutes, and the surface has been at $2 0 \ {} ^ { \circ } \mathrm { C }$ the whole time.** **Check the model: $\delta = { \sqrt { \alpha t } } = 6 1 \ \mathrm { mm }$ , so the slab behaves as semi-infinite provided it is more than about $2 7 0 \ \mathrm{mm }$ thick ($\mathrm{Fo} \le 0.05$) — for a $5 0 \ \mathrm{mm}$ plate this answer is meaningless, and the one-term series of [[#ex-slab|the previous exercise]] is the right tool for the same steel and the same depth.**
:::
:::

::: exercise Penetration depth {#ex-pen level=1 check="50.2"}
How far has a temperature change penetrated into a concrete slab ($\alpha = 7 . 0 \times 1 0 ^ { - 7 } \ \mathrm { m ^ { 2 } / s }$) one hour after the surface is suddenly cooled? Give $\sqrt{\alpha t}$ in mm. Give $\sqrt{\alpha t}$ in mm.
::: solution
$$
\delta = { \sqrt { \alpha t } } = { \sqrt { 7 . 0 \times 1 0 ^ { - 7 } \times 3 6 0 0 } } = { \sqrt { 2 . 5 2 \times 1 0 ^ { - 3 } } } = \mathbf { 5 0 . 2 \ m m }
$$
**Five centimetres in an hour, and to reach $5 0 0 \ \mathrm{mm }$ takes a hundred times as long — one hundred hours.** **This scaling is why thick concrete takes days to respond to a change at its surface, and why fire-resistance ratings in hours go with cover thicknesses in millimetres.**
:::
:::

::: exercise Damping depth {#ex-damp level=2 check="121"}
Find the damping depth of a daily temperature wave in brick ($\alpha = 5 . 3 \times 1 0 ^ { - 7 } \ \mathrm { m ^ { 2 } / s }$), and the amplitude and phase lag at $2 4 0 \ \mathrm{mm }$. Enter the damping depth in mm. Enter the damping depth in mm.
::: solution
$$
\delta = { \sqrt { \frac { \alpha P } { \pi } } } = { \sqrt { \frac { 5 . 3 \times 1 0 ^ { - 7 } \times 8 6 { , } 4 0 0 } { \pi } } } = \mathbf { 1 2 1 \ m m }
$$
$$
{ \frac { A } { A _ { s } } } = e ^ { - 2 4 0 / 1 2 1 } = \mathbf { 1 3 . 7 \ \% } \qquad \phi = { \frac { 0 . 2 4 0 } { 0 . 1 2 1 } } = 1 . 9 8 \ \mathrm { r a d } = 1 1 4 ^ { \circ } = \mathbf { 7 . 6 \ h }
$$
**A $2 4 0 \ \mathrm{mm }$ brick wall lets one seventh of a summer day's temperature swing through and delivers it at nine in the evening.** **That is the whole case for brick construction in a hot-dry climate, stated as one number — and note that the wall's $U$-value has nothing to do with either figure, because the damping depth depends on $\alpha$ alone and the $U$-value on $k$ alone.**
:::
:::

::: exercise Contact temperature {#ex-cont level=2 check="175"}
A copper plate at $2 0 \ {} ^ { \circ } \mathrm { C }$ ($k = 4 0 1 \ \mathrm { W / m \, K }$, $\rho = 8 9 3 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 3 8 5 \ \mathrm { J / k g \, K }$) is pressed onto a carbon-steel plate at $6 0 0 \ {} ^ { \circ } \mathrm { C }$ ($k = 4 8 \ \mathrm { W / m \, K }$, $\rho = 7 8 5 0 \ \mathrm { k g / m ^ { 3 } }$, $c = 4 9 0 \ \mathrm { J / k g \, K }$). Find the interface temperature, in ${}^{\circ}\mathrm{C}$, and the heat flux one second after contact.
::: solution
$$
e _ { \text{Cu} } = { \sqrt { 4 0 1 \times 8 9 3 0 \times 3 8 5 } } = 3 7 { , } 1 3 0 , \qquad e _ { \text{st} } = { \sqrt { 4 8 \times 7 8 5 0 \times 4 9 0 } } = 1 3 { , } 5 8 5 \ \mathrm { J / m ^ { 2 } K \, s ^ { 1 / 2 } }
$$
$$
T _ { c } = { \frac { 3 7 { , } 1 3 0 \times 2 0 + 1 3 { , } 5 8 5 \times 6 0 0 } { 5 0 { , } 7 1 5 } } = { \frac { 8 . 8 9 4 \times 1 0 ^ { 6 } } { 5 0 { , } 7 1 5 } } = \mathbf { 1 7 5 \ {} ^ { \circ } C }
$$
$$
q ^ { \prime \prime } ( t ) = { \frac { 3 7 { , } 1 3 0 \times 1 3 { , } 5 8 5 } { 5 0 { , } 7 1 5 } } \times { \frac { 5 8 0 } { \sqrt { \pi t } } } = { \frac { 3 . 2 6 \times 1 0 ^ { 6 } } { \sqrt { t } } } \ \mathrm { W / m ^ { 2 } } \qquad \Rightarrow \qquad q ^ { \prime \prime } ( 1 \ \mathrm { s } ) = \mathbf { 3 . 3 \ M W / m ^ { 2 } }
$$
**Copper's effusivity is $2 . 7$ times the steel's, against $1.5$ times for the aluminium of [[#ex-touch|the billet example]]: the interface sits at $1 7 5 \ {} ^ { \circ } \mathrm { C }$, nearly three quarters of the way down the steel's own range and only $1 5 5 \ \mathrm { K }$ above the copper.** **The effusivity ratio decides which side of a contact changes temperature.**
:::
:::

::: exercise Which metal cools faster? {#ex-which level=3 check="1.58"}
A $2 5 \ \mathrm{mm}$ diameter aluminium sphere and an identical steel sphere are quenched together in the same oil at $h = 8 0 0 \ \mathrm { W / m ^ { 2 } K }$. Which reaches the oil temperature first, and by what factor are the time constants different?
::: solution
Both are lumped: $\mathrm { B i } _ { \text{Al} } = 8 0 0 \times 0 . 0 0 4 1 6 7 / 1 8 0 = 0 . 0 1 9$ , $\mathrm { B i } _ { \text{st} } = 8 0 0 \times 0 . 0 0 4 1 6 7 / 4 5 = 0 . 0 7 4$ .
$$
\tau _ { \text{Al} } = { \frac { 2 7 0 0 \times 9 0 0 \times 0 . 0 0 4 1 6 7 } { 8 0 0 } } = 1 2 . 7 \ \mathrm { s } , \qquad \tau _ { \text{st} } = { \frac { 7 8 5 0 \times 4 9 0 \times 0 . 0 0 4 1 6 7 } { 8 0 0 } } = 2 0 . 0 \ \mathrm { s }
$$
**Aluminium, by a factor of $1 . 5 8$ — and not because it conducts better, since conductivity does not appear, but because it stores $1 . 5 8$ times less heat per cubic metre.** **The steel sphere is $2 . 9$ times heavier and cools $1 . 6$ times more slowly; if you had guessed on conductivity alone you would have got the answer right for the wrong reason and the factor wrong always.**
:::
:::

::: quiz Lumped or not {#quiz-lumped}
A steel slab at $\mathrm { B i } = 3$ is cooled from $8 0 0 \ {} ^ { \circ } \mathrm { C }$ in oil at $6 0 \ {} ^ { \circ } \mathrm { C }$. A designer uses the lumped-capacitance method and reports that the whole slab reaches $1 3 4 \ {} ^ { \circ } \mathrm { C }$ ( $\theta ^ { * } = 0 . 1 0$ ) at time $t _ { 1 }$ . At $t _ { 1 }$ , what is the true centre temperature closest to? (Take $\zeta _ { 1 } = 1 . 1 9 2 5$ , $C _ { 1 } = 1 . 2 1 0 2$ .)

- [ ] $1 3 4 \ {} ^ { \circ } \mathrm { C }$ — the lumped answer is the mean, and the mean is what matters
- [ ] $1 7 0 \ {} ^ { \circ } \mathrm { C }$
- [x] $3 6 0 \ {} ^ { \circ } \mathrm { C }$
- [ ] $8 0 \ {} ^ { \circ } \mathrm { C }$

::: solution
**$3 6 0 \ {} ^ { \circ } \mathrm { C }$.** Lumped gives $\mathrm { F o } = - \ln ( 0 . 1 ) / 3 = 0 . 7 6 8$ . The true centre is
$$
\theta _ { 0 } ^ { * } = 1 . 2 1 0 2 \, e ^ { - 1 . 1 9 2 5 ^ { 2 } \times 0 . 7 6 8 } = 1 . 2 1 0 2 \times 0 . 3 3 5 7 = 0 . 4 0 6 \qquad T _ { 0 } = 6 0 + 0 . 4 0 6 \times 7 4 0 = 3 6 1 \ \mathrm { ^ \circ C }
$$
**The surface at the same instant is at $0 . 4 0 6 \times \cos ( 1 . 1 9 2 5 ) = 0 . 1 5 0$ , i.e. $1 7 1 \ {} ^ { \circ } \mathrm { C }$ — so the designer's $134\ {}^{\circ}\mathrm{C}$ is not even the surface temperature, and the centre is $227\ \mathrm{K}$ hotter than reported.** The misapplied method does not err by a little; it reports a uniform body when the real one has a $190\ \mathrm{K}$ surface-to-centre difference.
:::
:::

::: quiz Speeding up a quench {#quiz-quench}
A large steel forging at $\mathrm { B i } = 4 0$ is quenched. The plant doubles the spray rate and doubles $h$. The cooling rate at the centre:

- [ ] doubles, because the time constant is $1 / h$
- [x] increases by only a few per cent, because $\zeta _ { 1 } ^ { 2 }$ has nearly saturated
- [ ] is unchanged, because the Biot number is large
- [ ] halves, because more $h$ means more vapour blanket

::: solution
**Increases by only a few per cent.** At $\mathrm { B i } = 4 0$ the slab eigenvalue is $\zeta _ { 1 } = 1 . 5 3 3$ ; at $\mathrm { B i } = 8 0$ it is $1 . 5 5 1$ . **The cooling exponent $\zeta _ { 1 } ^ { 2 }$ rises from $2 . 3 4 9$ to $2 . 4 0 7$ — a $2 . 5 \ \%$ improvement for double the water.** **The asymptote is $\zeta _ { 1 } \to \pi / 2$ , $\zeta _ { 1 } ^ { 2 } \to 2 . 4 6 7$ , so even an infinite spray gives only $5 \ \%$ more than the first one did.** **Option (d) is not a bad guess either — doubling a spray can push a quench from the nucleate-boiling regime into film boiling and make it slower — but that is a failure of the correlation, not of the Biot number, and the Biot number is what tells you it was never going to help much.** **The only lever that works at $\mathrm { B i } \gg 1$ is $L$ : halving the section quarters the time.**
:::
:::

## Where this lesson leads

- **External convection** takes over the $h$ that this lesson treats as given, and shows that in the lumped regime — where the cooling time is $1 / h$ — the whole answer rides on a correlation you may only know to a factor of two.
- **Internal convection** and **natural convection** supply the correlations for the two regimes in which quench tanks and forge furnaces actually operate, including the free-surface motion that dominates an unstirred tank.
- **Boiling and condensation** is where the assumption "$h$ is a constant" finally breaks: in nucleate and film boiling the coefficient depends on the part's own temperature, and the cooling curve is no longer an exponential.
- **Steady conduction** is the $t \to \infty$ limit of everything here, and the two meet: the one-term series decays toward the steady solution, and the time constant of the first term is the time the steady problem takes to establish.
- The opening lesson of this course introduced the effusivity that governs [[#def-contactT|contact temperature]]; here it appears as the coefficient of the similarity solution rather than as a rule of thumb.
- [[vibrations]] uses the same mathematics under different names: the lumped body is a first-order system with a time constant, the one-term series is a modal expansion, and the thermal wave is a diffusive analogue of a damped oscillator.
- [[control-systems]] treats the lumped body as a first-order plant $K / ( \tau s + 1 )$; the reason temperature loops are slow and integrate-heavy is exactly $\tau = \rho c V / ( h A )$.

::: history A short history of doing it in time
**1701 — Newton's law of cooling.** "Scala graduum Caloris", published anonymously in *Philosophical Transactions* **22**, 824–829, extends a temperature scale above the range of a thermometer by timing how a heated block of iron cools, on the assumption that its rate of cooling is proportional to its excess temperature over the surroundings. **That assumption is exact only for a lumped body in a constant $h$ — a fact nobody could have appreciated for another century.**
**1822 — Fourier.** The *Théorie analytique de la chaleur* solves transient conduction in slabs, spheres and cylinders by series of decaying modes — the eigenfunction expansions behind the one-term approximation of this lesson — and treats the infinite solid by the integral that bears his name.
**1833 — Duhamel learns to superpose in time.** J.-M. Duhamel's memoir on heat conduction in solids whose surroundings change temperature with time (*Journal de l'École Polytechnique*, 1833) supplies the device that turns every constant-condition solution into an arbitrary-condition one: build the history as a sequence of steps. **Every furnace ramp and welding thermal cycle calculated analytically is Duhamel's integral in some form.**
**1848 — William Thomson and the method of images.** The method of images, introduced by the twenty-four-year-old Thomson for electrostatics and carried over to heat, gives the solution for a source near a plane boundary by reflecting the source in it.
**1860–1862 — Kelvin underground.** Thomson analyses James David Forbes's records of underground temperature at Edinburgh with the periodic solution of this lesson, recovering the rock's diffusivity from the damping and lag of the annual wave; in 1862 he uses the error-function solution for a cooling half-space to estimate the age of the Earth from the geothermal gradient.
**1936 — Newman multiplies.** A. B. Newman, "Heating and cooling rectangular and cylindrical solids", *Industrial and Engineering Chemistry* **28**, 545–548, shows how the solution for a brick or a short cylinder is the product of one-dimensional solutions. **It turns a three-dimensional problem into one-dimensional ones and a multiplication.**
**1947 — Heisler puts the eigenvalues on charts.** M. P. Heisler, "Temperature charts for induction and constant-temperature heating", *Transactions of the ASME* **69**, 227–236, converts the series for the slab, cylinder and sphere into the charts that, for decades, were how a heat-treatment shop answered a transient question.
**1991 — the semi-infinite solution as an instrument.** S. E. Gustafsson, "Transient plane source techniques for thermal conductivity and thermal diffusivity measurements of solid materials", *Review of Scientific Instruments* **62**, 797–804, describes a thin heated sensor between two halves of a specimen whose temperature rise, logged while the specimen still behaves as unbounded, yields both $k$ and $\alpha$ from one short test — the transient solutions of this lesson used in reverse.
:::

## What this lesson must leave behind

::: summary
- **Two numbers rule everything: $\mathrm { B i } = h L _ { c } / k$ decides whether the body has one temperature or a profile, and $\mathrm { F o } = \alpha t / L ^ { 2 }$ decides how far it has got.** Their product is the exponent of the lumped solution, so the whole subject is a function of $\mathrm { F o }$ with $\mathrm { B i }$ as a parameter.
- **Lumped capacitance is $\tau = \rho c V / ( h A )$ and contains no conductivity.** It is an RC circuit, exactly. Get $A$ right — $L _ { c } = V / A$ counts only the faces that exchange.
- **The $0 . 1$ criterion is a tolerance, not a law**: it says the internal gradient is $10\ \%$ of the driving difference. For a cooling time you may stretch it; for a thermal stress you may not.
- **The one-term series is valid for $\mathrm { F o } > 0 . 2$ and nowhere else**, because $C _ { 1 } > 1$ and the formula predicts temperatures above the initial one at small $\mathrm { F o }$.
- **$\zeta _ { 1 }$ saturates as $\mathrm { B i } \to \infty$** ($\pi / 2$ for the slab, $\pi$ for the sphere): beyond $\mathrm { B i } \approx 1 0$ a better fluid buys little; a smaller section buys a lot.
- **The semi-infinite solution is the $\mathrm { F o } < 0 . 0 5$ answer**, and its content is one sentence: **penetration goes as $\sqrt { \alpha t }$ , so time goes as the square of depth.**
- **Contact temperature is an effusivity-weighted average and does not care about thickness**; the initial flux is infinite and the useful number is the time-integrated one.
- **A thermal wave damps by $1 / e$ per $\delta = \sqrt { \alpha P / \pi }$ and lags by one radian per $\delta$** — which is why a massive wall delays a summer afternoon by hours and does nothing at all about winter.
- **Product solutions are exact for intersections of one-dimensional bodies with uniform boundary conditions**, and the answer to "how long in the furnace" is set at the centre while surface quality is judged at the corner.
- **Every formula here assumes $T _ { \infty }$ and $h$ are constants.** A quench tank that warms, a spray that changes regime, or a part that generates its own transformation heat all break the exponential — and the first thing to check is whether the bath has more heat capacity than the part.
:::


## Further reading

- H.S. Carslaw and J.C. Jaeger, *Conduction of Heat in Solids*, 2nd ed. (Oxford, 1959), appendices and chs. 2, 6, 13 — every solution in this lesson, and several thousand that are not, in a book engineers used as a telephone directory for fifty years.
- M.P. Heisler, "Temperature charts for induction and constant-temperature heating", *Trans. ASME* **69**, 227–236 (1947) — the charts, and a sense of what engineering calculation cost before computers.
- A.B. Newman, "Heating and cooling rectangular and cylindrical solids", *Ind. Eng. Chem.* **28**, 545–548 (1936) — the product rule in four pages.
- J.V. Beck, B. Blackwell and C.R. St. Clair Jr., *Inverse Heat Conduction: Ill-Posed Problems* (Wiley, 1985) — how to recover a surface temperature or heat flux from an interior measurement, which is what a quench engineer actually needs.
- S.E. Gustafsson, *Rev. Sci. Instrum.* **62**, 797–804 (1991) — the transient plane source method for measuring $k$ and $\alpha$.
- M.N. Özışık, *Heat Conduction*, 2nd ed. (Wiley, 1993) — the separation-of-variables, Duhamel and integral-transform methods behind every solution here.
