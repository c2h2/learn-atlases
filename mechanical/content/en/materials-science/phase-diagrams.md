A phase diagram is a map of free-energy minima. Every line on it is the locus of temperature and composition at which two tangent-to-curve constructions give the same answer, every region is a single curvature of the same surface, and the whole elaborate apparatus of liquidus and solidus and solvus and eutectic is the two-dimensional shadow of one condition: the chemical potential of each species is equal in every phase that contains it.

That is why the diagrams are so useful and why they are so misused. They are equilibrium maps, and almost every engineering process — casting, welding, heat treating, aging, sintering, service at temperature — is a departure from equilibrium whose size is the interesting part. A weld pool freezes in seconds at a cooling rate that the diagram's author never contemplated, and the cored microstructure it leaves is the diagram's answer minus the diffusion that should have happened. An aged alloy is a diagram read at the wrong temperature on purpose. And a tool steel at room temperature contains cementite that the equilibrium diagram forbids, because cementite is metastable and has been for a hundred years.

::: warning Read the axes before the phase fields
Four errors account for most of the damage a phase diagram does to a designer. **Composition is weight per cent on most engineering diagrams and atomic per cent on most physics ones**, and the two differ by a factor of $M_B / M_A$ — for $\mathrm{Al - 12\ \%\ Si}$ the atomic fraction of silicon is $12.2$ per cent, not $12$ divided by anything, and for a tungsten alloy the difference is fifty per cent. **The diagram is a section at one atmosphere**, so anything with a volatile component — lithium, magnesium, zinc, manganese, nitrogen, oxygen — moves when the process is done in vacuum or in a nitriding atmosphere, and a $\mathrm{TiAl}$ alloy's nitrogen content is not on the $\mathrm{Ti - Al}$ diagram at all. **Every line is an equilibrium line**, so a cooling rate of one degree per second undercools the transformation by tens of degrees and puts the boundary where the diagram does not put it; the continuous-cooling-transformation diagram of [[materials-science/phase-transformations]] is the correction and is the one a heat treaters uses. And **a phase field is not a microstructure**: the diagram tells you the fractions and the compositions and nothing whatever about the shape, spacing or continuity of the phases, which is where the properties actually live. A eutectic and a peritectic can have the same phase fractions and a factor of five in creep strength.
:::

## Equilibrium and the phase rule

::: definition The condition for equilibrium and the phase rule {#def-phase-rule}
For a system of $C$ components and $P$ phases at equilibrium, the temperature, the pressure and the chemical potential of every species are uniform:
$$
T^{\alpha} = T^{\beta}, \quad p^{\alpha} = p^{\beta}, \quad
\mu_{i}^{\alpha} = \mu_{i}^{\beta} \quad \text{for every } i .
$$
Each phase is described by $C - 1$ independent composition variables plus $T$ and $p$, and each equality of chemical potentials removes one degree of freedom. The count is the **Gibbs phase rule**
$$
F = C - P + 2 ,
$$
and at constant pressure, which is where every engineering diagram is drawn, $F = C - P + 1$.
**Reading it.** A single-phase region of a binary diagram has $F = 2$: both temperature and composition are free. Two coexisting phases have $F = 1$: fix the temperature and the tie line fixes both compositions. Three phases in a binary have $F = 0$: a eutectic is an **invariant** point at one temperature and one composition, and it is the reason a eutectic alloy casts like a metal and freezes like a liquid. Four phases in a binary cannot coexist at equilibrium.
:::

::: definition The tangent construction and the lever rule {#def-lever}
At a temperature $T$, the equilibrium assemblage is the **common tangent** to the free-energy curves $G^{\alpha} (x )$ and $G^{\beta} (x )$: the tangent line touches each curve at the composition of that phase, and any overall composition between the two touch points lowers its free energy by splitting into the two, along a straight line on the $G$ plot. The tie-line ends of the tangent construction are the phase-boundary compositions, and the whole binary diagram is a stack of these constructions.
For an alloy of overall composition $x_0$ in a two-phase field with phase compositions $x_{\alpha}$ and $x_{\beta}$, **mass balance** gives the fractions
$$
f_{\alpha} = \frac{x_{\beta} - x_0}{x_{\beta} - x_{\alpha}}, \qquad
f_{\beta} = \frac{x_0 - x_{\alpha}}{x_{\beta} - x_{\alpha}}, \qquad f_{\alpha} + f_{\beta} = 1 ,
$$
the **lever rule**: the fraction of a phase is the length of the tie line on the *other side* of the fulcrum divided by the whole tie line. It is a statement of conservation of mass and nothing else, which is why it applies to weight per cent on a weight-per-cent diagram and to atomic per cent on an atomic-per-cent one, and never to a mixture of the two.
:::

::: definition Isomorphous systems, coring and the Hume-Rothery rules {#def-isomorphous}
Two elements that share a crystal structure, an atomic radius to within fifteen per cent, a similar electronegativity and the same valence form a **continuous solid solution** — copper-nickel, gold-silver, nickel-copper, molybdenum-tungsten, and the diagram is a lens between a liquidus and a solidus with no invariant reaction anywhere.
Cooling an isomorphous alloy under equilibrium produces a homogeneous solid. Cooling it at any practical rate produces **coring**: the first solid is richer in the high-melting element than the last, and diffusion in the solid is too slow to erase the gradient. A $50\ \%$ copper-nickel dendrite therefore contains $60\ \%$ nickel at its core and $40\ \%$ at its surface, and the last liquid to freeze is so rich in the low-melting component that it can solidify below the equilibrium solidus and produce **incipient melting** on the next reheating. The cure is a **homogenising anneal** below the solidus for ten to forty hours, and the reason a forged pressure-vessel shell is homogenised before it is quenched.
:::

::: definition Eutectic, peritectic, monotectic {#def-eutectic}
$$
\textbf{Eutectic:} \quad L \rightleftharpoons \alpha + \beta
\qquad
\textbf{Peritectic:} \quad L + \alpha \rightleftharpoons \beta
\qquad
\textbf{Monotectic:} \quad L_1 \rightleftharpoons \alpha + L_2
$$
The eutectic is the lowest-melting composition of the system and freezes at a single temperature into a **two-phase intergrowth** whose spacing is set by the cooling rate through the diffusion distance $\sqrt{D t}$ — typically $0.5$ to $2\ \mu\mathrm{m}$ in an $\mathrm{Al - Si}$ eutectic and $0.1\ \mu\mathrm{m}$ in a rapidly solidified one. The peritectic is slower than it looks, because the new phase $\beta$ forms **around** the old $\alpha$ and must then grow through it by diffusion **through $\beta$**, which is slower; peritectic alloys in cast form therefore retain undissolved $\alpha$ long past the equilibrium solidus, and this is the origin of the segregation and centreline porosity of a nickel-superalloy or a copper-tin ingot.
**Congruent** melting, $\text{compound} \rightarrow L$ of the same composition, gives a liquidus peak (the $\mathrm{Mg_2 Si}$, $\mathrm{Ni_3 Al}$, $\mathrm{Ti_3 Al}$ of the engineering systems); **incongruent** melting decomposes the compound on heating and leaves a peritectic or a monotectic in its place.
:::

::: widget plot
f: 0.35*(x*x-1)*(x*x-1) - 0.25
x: -1.6, 1.6
y: -0.4, 0.75
labels: G(x)
caption: A schematic free-energy curve of the double-well form that generates a eutectic. The equilibrium phase assemblage at any overall composition between the two minima is the straight line joining them — the common tangent — and the phase compositions are the touch points. Where the tangent is horizontal, the two phases have equal stability and the system is at a eutectic. Where the curvature at the centre of the curve turns positive, the single-phase solid becomes unstable to any composition fluctuation and decomposes without a nucleation barrier: that is the spinodal of [[materials-science/phase-transformations]].
:::

::: definition Activities and the shape of the liquidus {#def-activity}
The chemical potential of a component is $\mu_{i} = \mu_{i}^{\circ} + RT \ln a_i$ with $a_i = \gamma_{i} x_{i}$ the **activity**, and equilibrium requires the activity of each species to be equal in both phases — not its concentration. A **regular solution** has
$$
\Delta G_{\mathrm{mix}} = \Omega\, x \left( 1 - x \right) + R T \left[ x \ln x + \left( 1 - x \right) \ln \left( 1 - x \right) \right] ,
$$
with $\Omega$ the interaction parameter, and the entropy term alone guarantees that $\Delta G_{\mathrm{mix}} < 0$ at the dilute limits, which is why **every** solid dissolves some of every other. Phase separation requires $\Omega$ to beat the entropy, and the condition $\mathrm{d}^{2} G / \mathrm{d} x^{2} = 0$ at $x = 0.5$ gives the **critical solution temperature**
$$
T_{c} = \frac{\Omega}{2 R} ,
$$
so $\Omega = 17\ \mathrm{kJ / mol}$ gives $T_{c} = 749\ {}^{\circ}\mathrm{C}$ and the copper-nickel system, with $\Omega$ near zero, is fully miscible at every temperature above its solidus.
**Freezing-point depression.** For a dilute ideal solution the liquidus falls from the melting point as
$$
\ln \left( 1 - x_{B} \right) = - \frac{\Delta H_f}{R} \left( \frac{1}{T} - \frac{1}{T_{m}} \right) ,
$$
which needs nothing but the enthalpy of fusion and predicts the aluminium-silicon eutectic to within three degrees.
:::

::: example Reading a binary diagram {#ex-cuni}
A $50\ \%$ copper-$50\ \%$ nickel alloy is cooled slowly. Give the composition of the first solid, the fraction solid at $1300\ {}^{\circ}\mathrm{C}$, and the composition of the last liquid, and state what the real cast structure contains.
::: solution
**First solid.** The liquidus at $50\ \%$ Ni is $1345\ {}^{\circ}\mathrm{C}$; the solidus composition at that temperature is $62\ \%$ Ni. The first dendrite arms are therefore **$62\ \%$ nickel**, twelve points richer than the melt.
**At $1300\ {}^{\circ}\mathrm{C}$.** The tie line runs from a solidus composition of $42\ \%$ Ni to a liquidus composition of $58\ \%$ Ni, so
$$
f_L = \frac{50 - 42}{58 - 42} = 0.50 ,
$$
exactly half solid, and the two phases differ by sixteen points of nickel.
**Last liquid.** The solidus at $50\ \%$ overall is reached at $1280\ {}^{\circ}\mathrm{C}$ under equilibrium. Under any real cooling rate the last liquid is the $58\ \%$-Ni composition of the $1300\ {}^{\circ}\mathrm{C}$ tie line or even lower-melting, and it freezes last between the dendrite arms.
**The real structure.** A cored dendrite array with a nickel content falling from $62\ \%$ at the axis to $40\ \%$ at the arm boundary, a segregation of twenty-two points across a distance of $200\ \mu\mathrm{m}$, and a solidification range that the equilibrium diagram says is $65$ degrees and the microprobe says is $90$.

*Check.* The coring amplitude scales as the Péclet number of the arm and vanishes as the arm spacing goes to zero, which is why a **single-crystal** casting grown at a centimetre an hour is homogeneous and a sand casting is not, and why the homogenising time goes as the **square of the dendrite arm spacing**: $t \approx \lambda_{2}^{2} / D$, which for $\lambda_{2} = 200\ \mu\mathrm{m}$ and $D = 10^{- 14}\ \mathrm{m^{2} / s}$ at $1200\ {}^{\circ}\mathrm{C}$ is $4 \times 10^{6}\ \mathrm{s}$, forty-five hours. $\checkmark$

*Sanity.* Forty-five hours of homogenising is exactly the industrial practice for a large copper-nickel or nickel-alloy ingot, and the reason the industry has spent fifty years moving to **vacuum arc remelting**, which makes the dendrites small by cooling fast instead of waiting for diffusion to erase them.
:::
:::

::: example The eutectic that predicts itself {#ex-alsi}
Predict the eutectic temperature of the aluminium-silicon system from the enthalpy of fusion of aluminium, and compare with the measured $577\ {}^{\circ}\mathrm{C}$.
::: solution
**Composition.** $12.6\ \%$ silicon by weight is
$$
x_{\mathrm{Si}} = \frac{12.6 / 28.1}{12.6 / 28.1 + 87.4 / 26.98} = 0.122 \text{ atomic} .
$$
**Freezing-point depression.** With $\Delta H_f = 10.7\ \mathrm{kJ / mol}$ and $T_{m} = 933\ \mathrm{K}$,
$$
\ln \left( 1 - 0.122 \right) = - 0.130 = - \frac{10{,}700}{8.314} \left( \frac{1}{T} - \frac{1}{933} \right)
\quad\Longrightarrow\quad
T = 853\ \mathrm{K} = 580\ {}^{\circ}\mathrm{C} .
$$
**The comparison.** The measured eutectic is $577\ {}^{\circ}\mathrm{C}$, three degrees away, from a model with **one** parameter and no adjustable constants.
**Why it works.** Aluminium and silicon are close in electronegativity and the liquid is nearly ideal, so $\gamma_{\mathrm{Al}} \approx 1$ and the ideal expression is the whole answer. The same calculation for lead-tin gives $170\ {}^{\circ}\mathrm{C}$ against a measured $183\ {}^{\circ}\mathrm{C}$, thirteen degrees out, because the lead-tin liquid has $\Omega \approx 3.5\ \mathrm{kJ / mol}$ and the activity coefficient of tin at the eutectic is $1.4$.

*Check.* The eutectic composition is set by where the two liquidus lines meet, and the aluminium-rich liquidus from the ideal expression reaches the silicon-rich branch at $12.4$ atomic per cent against a measured $12.6$ — a two per cent error in composition. $\checkmark$

*Sanity.* The near-ideality of the liquid is why $\mathrm{Al - Si}$ is such a good casting alloy: a narrow freezing range, a single invariant at $12.6\ \%$, and a eutectic that feeds itself. The problem is the **morphology**, not the diagram — the eutectic silicon grows as brittle plates — and the cure is a five-part-per-million addition of sodium or strontium, which poisons the silicon's twin-plane growth and turns the plates into a coral. That is a diagram that says nothing about the property and a microstructure that decides it.
:::
:::

::: example The iron-carbon diagram, read carefully {#ex-fe-c}
Give the phases and their fractions in a $0.40\ \%$ carbon steel just above and just below the eutectoid, and in a $1.0\ \%$ carbon tool steel at room temperature. Why is cementite on the diagram at all?
::: solution
**Just above $727\ {}^{\circ}\mathrm{C}$.** Austenite of $0.40\ \%$ C plus proeutectoid ferrite of $0.022\ \%$ C:
$$
f_{\alpha} = \frac{0.76 - 0.40}{0.76 - 0.022} = 0.49 , \qquad f_\gamma = 0.51 .
$$
**Just below $727\ {}^{\circ}\mathrm{C}$.** The austenite has become **pearlite**, a lamellar ferrite-cementite intergrowth, so the fractions are unchanged but the microstructure is now two constituents: $49\ \%$ white proeutectoid ferrite and $51\ \%$ dark pearlite, which is exactly what a polished and nital-etched $1040$ looks like under the microscope.
**Total cementite at room temperature.** With $6.67\ \%$ C in $\mathrm{Fe_3C}$ and $0.022\ \%$ in ferrite,
$$
f_{\mathrm{Fe_3 C}} = \frac{0.40 - 0.022}{6.67 - 0.022} = 0.057 ,
$$
so a mild steel is $94\ \%$ ferrite by mass and the cementite is doing a great deal with very little.
**The $1.0\ \%$ tool steel.** $f_{\mathrm{Fe_3 C}} = \left( 1.0 - 0.022 \right) / 6.648 = 0.147$, of which $5.6$ per cent is the eutectoid cementite in the pearlite and $9.1$ per cent is **proeutectoid cementite** deposited on the prior-austenite grain boundaries — a continuous brittle network that is the reason a $1.0\ \%$ steel is spheroidise before machining and why an over-heated tool with a cementite network cannot be rescued by any heat treatment.
**Why cementite is there.** Iron-carbon equilibrium is $\mathrm{Fe} + \mathrm{C}$ (graphite); cementite is **metastable**. The stable diagram lies a few millijoules below the metastable one and the transformation to graphite needs the nucleation of carbon, which is slow enough that a plain-carbon steel is still $\mathrm{Fe - Fe_3 C}$ after a century at $20\ {}^{\circ}\mathrm{C}$. Silicon, at two per cent, catalyses the graphite and turns the diagram stable — which is exactly why **cast iron** is graphitic and machinable and **steel** is not.

*Check.* The eutectoid composition of $0.76\ \%$ and the eutectoid temperature of $727\ {}^{\circ}\mathrm{C}$ are the modern values; the older $0.80\ \%$ and $723\ {}^{\circ}\mathrm{C}$ appear in every pre-1980 handbook and shift the proeutectoid fraction of a $0.40\ \%$ steel from $0.49$ to $0.53$. $\checkmark$

*Sanity.* The $0.49$ fraction of proeutectoid ferrite is why a $1040$ in the as-rolled condition has a yield of $390\ \mathrm{MPa}$ and a $1080$ has $490$: the pearlite fraction goes from $51$ to $95$ per cent, and pearlite's strength is set by its **interlamellar spacing**, which is set by the cooling rate through the eutectoid and not by the diagram. The diagram gives the fractions; the processing gives the spacing; the properties are mostly the spacing.
:::
:::

::: example Nanoscale solubility and the Gibbs-Thomson effect {#ex-gibbs-thomson}
By what factor is the equilibrium matrix concentration raised around a precipitate of interfacial energy $0.5\ \mathrm{J / m^{2}}$ and molar volume $10^{- 5}\ \mathrm{m^{3} / mol}$ at radii of $50$, $10$ and $2\ \mathrm{nm}$ at $473\ \mathrm{K}$?
::: solution
$$
\frac{c_{r}}{c_{\infty}} = \exp \left( \frac{2 \gamma V_{m}}{r R T} \right) ,
\qquad
\frac{2 \gamma V_{m}}{R T} = \frac{2 \times 0.5 \times 10^{- 5}}{8.314 \times 473} = 2.54 \times 10^{- 9}\ \mathrm{m} .
$$
$$
\begin{array}{c c}
r\ \left[ \mathrm{nm} \right] & c_{r} / c_{\infty} \\
50 & 1.05 \\
10 & 1.29 \\
2 & 3.6
\end{array}
$$
**The consequences.** A $2\ \mathrm{nm}$ precipitate sits in a matrix **three and a half times supersaturated** with respect to the far field, so it redissolves during any later hold at the same temperature while the large particles grow — **Ostwald ripening**, and the reason a peak-aged alloy left in a warm oven for a week is softer than the same alloy aged for the correct nine hours.
**The other consequence.** The same factor is why **GPB zones** in an aluminium-copper alloy can hold four times the equilibrium solute, why a thin coherent precipitate has a composition that the phase diagram does not permit, and why the phase diagram is silent about the first hour of every aging treatment.

*Check.* The Gibbs-Thomson length $2 \gamma V_{m} / R T$ is $2.5\ \mathrm{nm}$ at $473\ \mathrm{K}$ and $1.2\ \mathrm{nm}$ at $950\ \mathrm{K}$, so the effect is a nanometre-scale phenomenon that becomes negligible above a particle size of about $50\ \mathrm{nm}$ at any temperature — which is the length scale below which the equilibrium diagram stops being a useful engineering document. $\checkmark$

*Sanity.* The same $2.5\ \mathrm{nm}$ length governs the **capillary** correction to a dendrite tip radius, the coarsening of a dispersion, and the sintering stress of a powder compact. It is the reason a nanocrystalline alloy's phase boundaries shift, the reason a thin film's solidus is lower than a bulk sample's, and the reason the phase diagram is a **large-particle** document that must be corrected below about a hundred nanometres.
:::
:::

::: example Design {#ex-design-weld}
An Al-Mg-Si $6061$-T6 bracket is welded with a $4043$ (Al-12Si) filler. Predict the microstructure across the weld, the strength profile, and the location of failure.
::: solution
**The base metal.** $6061$ is strengthened by $\beta^{\prime\prime}\ \mathrm{Mg_2 Si}$, whose solvus is near $460\ {}^{\circ}\mathrm{C}$ and whose solution treatment is therefore $530$ to $540\ {}^{\circ}\mathrm{C}$ — hot enough to dissolve the $\mathrm{Mg_2 Si}$ but well below the $555\ {}^{\circ}\mathrm{C}$ aluminium-magnesium-silicon eutectic. Its aging temperature is $177\ {}^{\circ}\mathrm{C}$.
**The weld thermal cycle.** A TIG weld peaks at $2000\ {}^{\circ}\mathrm{C}$ in the fusion zone and falls through $500\ {}^{\circ}\mathrm{C}$ at one to ten degrees per second. Divide the bracket into four zones:
1. **Fusion zone.** $4043$ filler, hypoeutectic, solidifies over a $577$ to $610\ {}^{\circ}\mathrm{C}$ range with primary $\alpha$-Al dendrites and eutectic silicon between them. As-cast, unaged, and its $\mathrm{Mg_2 Si}$ cannot precipitate because the magnesium has gone to the coarse $\mathrm{Mg_2 Si}$ plates of the eutectic. Strength $110\ \mathrm{MPa}$.
2. **Cast-textured columnar zone.** Columnar grains growing epitaxially from the base-metal particles, with a strong $\left\langle 100\right\rangle$ texture and a susceptibility to **hot cracking** along the last-freezing centreline.
3. **Heat-affected zone, overaged.** Peak temperature $200$ to $530\ {}^{\circ}\mathrm{C}$: the $\beta^{\prime\prime}$ precipitates coarsen to $\beta^{\prime}$ and then to equilibrium $\beta\ \mathrm{Mg_2 Si}$, and the alloy loses its strength irreversibly. This is a $5$ to $8\ \mathrm{mm}$ band and it is the weakest metal in the assembly.
4. **Heat-affected zone, solutionised.** Peak temperature $530$ to $555\ {}^{\circ}\mathrm{C}$: the precipitates dissolve completely and the zone is as soft as a T4 sheet, but on cooling to room temperature it **quench ages** and recovers a third of its strength over a week at ambient.
**Failure.** In the **overaged heat-affected zone**, at $150$ to $170\ \mathrm{MPa}$ against a base metal of $276\ \mathrm{MPa}$ — a $40\ \%$ loss, and the joint efficiency of a $6061$-T6 MIG weld is quoted as $0.5$ to $0.6$ for exactly this reason.
**The design response.** Specify the weld **before** the aging: form and weld in the T4 condition, then solutionise and age the whole assembly — which is why a bicycle frame is TIG-welded from T6 tubing and then re-aged, and why the re-aging recovers $85\ \%$ of the joint strength. Where the part is too large, use a **5000-series** or **4000-series** filler on a **5000-series** base, which is not age-hardening at all and loses nothing.

*Design comment.* The general rule this example teaches is that **a weld destroys the heat treatment within a centimetre of itself, and no filler metal can repair that**. The three honest options are: weld in the soft condition and re-heat-treat the assembly; use a non-heat-treatable alloy; or design the joint so that the heat-affected zone is not the critical section. What is not honest is a weld drawing that specifies the base metal's T6 properties for the assembly.
:::
:::

::: history
The phase diagram was invented by a man who could not draw one properly. **Hendrik Willem Bakhuis Roozeboom** gave the phase rule its chemical form in 1884, having read **Gibbs**'s 1876 *On the Equilibrium of Heterogeneous Substances* in a translation he arranged because the American original was unreadable to chemists, and spent thirty years constructing the iron-carbon diagram. **J. A. Le Chatelier** measured the arrest temperatures of cooling steel wires in 1899 and found the two iron-carbon curves that bear his name. **William Chandler Roberts-Austen** drew the first continuous-recording pyrometer iron-carbon diagram in 1898, and the eutectoid at $0.8\ \%$ carbon is his. The freezing-point depression formula used in Example 2 is **van't Hoff**'s 1887 dilute-solution treatment applied to solids by **G. N. Lewis** and **M. Randall** in their 1923 *Thermodynamics*, which is the book that taught metallurgists chemical potential. **D. Hanson** and the Institute of Metals' *Atlas of Equilibrium Alloy Systems*, begun in 1936, is the reason the diagrams of the engineering alloys are drawn to a common standard. **W. H. Rapper** and **C. H. S. Prince**'s 1940 paper on the aluminium-silicon eutectic established the sodium modification, found by accident at Harvard in 1921 by **W. A. W. Morrogh** and developed industrially by **A. de L. Holm**'s Swedish patent of 1924. The **Gibbs-Thomson** relation is **Gibbs**'s 1878 surface term and **J. J. Thomson**'s 1871 capillary-pressure argument, combined for precipitates by **C. Zener** in his 1948 paper on the precipitation of alloys from binary systems.
:::

## Where this leads

The equilibrium fractions of this lesson become the transformation kinetics of [[materials-science/phase-transformations]] once a cooling rate is imposed, the precipitate of Example 5 is the Orowan obstacle of [[materials-science/dislocations-strengthening]], the cementite network of Example 4 is the crack path of [[materials-science/failure]], and the weld heat-affected zone of Example 6 is the residual-stress problem of [[mechanics-of-materials]] applied to a cooling half-space.

::: summary
- A phase diagram is the map of common-tangent constructions on a stack of free-energy curves; the phase rule $F = C - P + 1$ counts what you may change before a phase disappears.
- The lever rule is mass balance and nothing more, and is valid only in the units the axis is drawn in.
- Isomorphous systems core on cooling, and homogenising takes as long as the square of the dendrite arm spacing divided by the diffusivity.
- A eutectic is invariant, freezes at one temperature, and its spacing — not its fraction — carries the properties.
- Ideal freezing-point depression with one parameter predicts the aluminium-silicon eutectic to three degrees; lead-tin needs an activity coefficient.
- Below about a hundred nanometres the Gibbs-Thomson term makes the diagram wrong, and that is where every aging treatment happens.
:::

::: quiz
An alloy of exactly eutectic composition is cooled slowly. Which statement is correct?
- [x] It freezes at one temperature, and the two solid phases form simultaneously as an intergrowth
- [ ] It freezes over the whole range between the liquidus and the solidus
- [ ] One phase forms first and the other fills the last liquid
- [ ] It cannot freeze without undercooling
::: solution
At the eutectic composition the liquid has $F = 0$ at constant pressure, so it transforms at a single temperature into both solids at once. That is what makes a eutectic alloy castable — it has no mushy zone, so it feeds liquid to the last place it freezes and does not shrink-cavity in the middle of a section.
:::
:::

## Exercises

::: exercise Phase rule {level=1 check="0"}
How many degrees of freedom does a binary eutectic have at constant pressure?
::: solution
Zero — three phases in a two-component system at constant pressure exhaust the degrees of freedom.
:::
:::

::: exercise Lever rule {level=1 check="0.5"}
A tie line runs from $20$ to $80$ per cent and the alloy is at $50$ per cent. What is the fraction of the phase at the $20$ per cent end?
::: solution
$\left( 80 - 50 \right) / \left( 80 - 20 \right) = 0.5$.
:::
:::

::: exercise Invariant {level=1 check="1"}
At how many temperatures does a eutectic alloy of exactly eutectic composition freeze?
::: solution
One — it freezes at a single temperature like a pure metal.
:::
:::

::: exercise Hume-Rothery {level=1 check="15"}
Within what per cent difference in atomic radius is extensive solid solubility expected?
::: solution
Fifteen per cent.
:::
:::

::: exercise Gibbs-Thomson {level=1 check="3.6"}
By what factor is the matrix solubility raised around a $2\ \mathrm{nm}$ precipitate when the capillary length $2 \gamma V_{m} / R T$ is $2.5\ \mathrm{nm}$?
::: solution
$\exp \left( 2.5 / 2 \right) = 3.6$.
:::
:::

::: exercise Coring {level=2}
A copper-nickel dendrite has an arm spacing of $100\ \mu\mathrm{m}$. Estimate the homogenising time at a temperature where $D = 3 \times 10^{- 14}\ \mathrm{m^{2} / s}$.
::: solution
$$
t \approx \frac{\left( 100 \times 10^{- 6} \right)^{2}}{4 \times 3 \times 10^{- 14}} = 8.3 \times 10^{4}\ \mathrm{s} = 23\ \mathrm{h} .
$$
*Sanity.* Halving the dendrite arm spacing by cooling faster cuts the homogenising time by a factor of four, which is the whole argument for investment casting, chill casting and rapid solidification over sand casting when homogeneity matters. It is also why a large ingot is homogenised for days and a thin strip for minutes at the same temperature.
:::
:::

::: exercise Iron-carbon {level=2}
Give the fraction of pearlite in a $0.30\ \%$ and in a $0.90\ \%$ carbon steel just below the eutectoid.
::: solution
For the hypoeutectoid steel the pearlite fraction is the austenite fraction at the eutectoid temperature,
$$
f_{\mathrm{pearlite}, 0.30} = \frac{0.30 - 0.022}{0.76 - 0.022} = 0.38 .
$$
For the hypereutectoid steel the proeutectoid phase is cementite, so
$$
f_{\mathrm{pearlite}, 0.90} = \frac{6.67 - 0.90}{6.67 - 0.022} = 0.88 .
$$
*Sanity.* The strength of a plain-carbon steel rises with pearlite fraction up to about $0.85\ \%$ carbon and then **falls**, because the proeutectoid cementite network becomes continuous and the fracture becomes intergranular. That is why a eutectoid steel is the strongest plain-carbon steel and a $1.2\ \%$ steel is weaker, and why the ball-bearing steels are hypereutectoid but spheroidised, so that the carbide is spheroidal and no network exists.
:::
:::

::: exercise Regular solution {level=2}
A binary system has an interaction parameter $\Omega = 12\ \mathrm{kJ / mol}$. Give the critical solution temperature, and say whether the system is miscible at $500\ {}^{\circ}\mathrm{C}$.
::: solution
$$
T_{c} = \frac{\Omega}{2 R} = \frac{12{,}000}{2 \times 8.314} = 722\ \mathrm{K} = 449\ {}^{\circ}\mathrm{C} .
$$
At $500\ {}^{\circ}\mathrm{C}$ the system is **above** $T_{c}$ and is fully miscible; at $400\ {}^{\circ}\mathrm{C}$ it is below and separates.
*Sanity.* This is the arithmetic of every spinodal decomposition, including the copper-nickel-iron alloys of the Cu-Ni-Fe "Coprecip" soft magnetic family and the $\alpha^{\prime}$ decomposition of iron-chromium, which occurs below $500\ {}^{\circ}\mathrm{C}$ with a critical composition near $46\ \%$ chromium and embrittles duplex stainless steels that have been left at $475\ {}^{\circ}\mathrm{C}$ — the "475 embrittlement" of the trade literature, which is a miscibility gap on the chromium-iron diagram and nothing else.
:::
:::

::: exercise Derivation {level=3}
Derive the lever rule from mass balance, and derive the condition for a coherent precipitate's equilibrium composition from the Gibbs-Thomson argument.
::: solution
**The lever rule.** One kilogram of alloy of composition $x_0$ contains $x_0$ kilograms of solute. It splits into $f_{\alpha}$ kilograms of $\alpha$ at $x_{\alpha}$ and $f_{\beta}$ at $x_{\beta}$, so
$$
f_{\alpha} + f_{\beta} = 1 , \qquad
f_{\alpha} x_{\alpha} + f_{\beta} x_{\beta} = x_0 .
$$
Substituting $f_{\beta} = 1 - f_{\alpha}$,
$$
f_{\alpha} x_{\alpha} + x_{\beta} - f_{\alpha} x_{\beta} = x_0
\quad\Longrightarrow\quad
f_{\alpha} = \frac{x_{\beta} - x_0}{x_{\beta} - x_{\alpha}} . \quad \checkmark
$$
The same balance on the solute gives $f_{\beta} = \left( x_0 - x_{\alpha} \right) / \left( x_{\beta} - x_{\alpha} \right)$, and the two sum to one identically. Note that the derivation used only mass conservation, which is why the lever rule survives every refinement of the thermodynamics and why it fails only when the diagram's units are mixed.
**The Gibbs-Thomson condition.** The free energy of forming a spherical precipitate of radius $r$ from a supersaturated matrix is
$$
\Delta G = \frac{4}{3} \pi r^{3} \Delta g_v + 4 \pi r^{2} \gamma ,
$$
and the pressure difference across the interface is $\Delta p = 2 \gamma / r$. For a dilute solution the chemical potential of the solute in the matrix is $\mu = \mu^{\circ} + R T \ln c$, and the pressure raises the precipitate's potential by $V_m \Delta p = 2 \gamma V_{m} / r$. Equating the two,
$$
R T \ln \frac{c_{r}}{c_{\infty}} = \frac{2 \gamma V_{m}}{r}
\quad\Longrightarrow\quad
\boxed{ c_{r} = c_{\infty} \exp \left( \frac{2 \gamma V_{m}}{r R T} \right) } . \quad \checkmark
$$
*Sanity.* Two consequences follow that are not obvious from the formula. First, $c_{r}$ decreases as $r$ increases, so a small particle dissolves while a large one grows at the small one's expense — Ostwald ripening — and the mean radius must therefore grow as $t^{1 / 3}$, which is the **Lifshitz-Slyozov-Wagner** law and the reason an aging curve has a peak. Second, the derivation assumed the interface is **incoherent**; for a coherent interface the strain energy adds a term that does not scale as $1 / r$, which is why coherent GPB zones can be supersaturated far beyond the incoherent-particle prediction and why the first stage of precipitation in aluminium-copper is not an equilibrium phenomenon at all.
:::
:::

::: exercise Design {level=3}
Select a solder alloy for a power module that will cycle between $- 40\ {}^{\circ}\mathrm{C}$ and $125\ {}^{\circ}\mathrm{C}$, and justify it against the phase diagram.
::: solution
**The old answer and why it is gone.** $\mathrm{Sn - 37\ Pb}$ is exactly eutectic at $183\ {}^{\circ}\mathrm{C}$, wets perfectly, creeps acceptably and is illegal in the European Union since 2006 under the RoHS directive.
**The replacement.** $\mathrm{Sn - 3.0\ Ag - 0.5\ Cu}$, near-eutectic at $217$ to $220\ {}^{\circ}\mathrm{C}$, which is $34\ {}^{\circ}\mathrm{C}$ higher and therefore $34\ {}^{\circ}\mathrm{C}$ further from the $125\ {}^{\circ}\mathrm{C}$ service temperature — a **higher** homologous temperature is worse, so the creep resistance is better by the Arrhenius factor $\exp \left[ Q / R \left( 1 / 398 - 1 / 456 \right) \right] \approx 4$ at the same applied stress.
**The diagram's warning.** The $\mathrm{Sn - Ag}$ diagram has a $\mathrm{Ag_3 Sn}$ intermetallic and a eutectic at $2.5\ \%$ silver, and the $0.5\ \%$ copper pins the solder's wetting behaviour on a copper finish by saturating the melt with copper. Go above $0.7\ \%$ copper and $\mathrm{Cu_6 Sn_5}$ plates out as coarse blocks that crack the joint.
**The real failure.** Thermal cycling between $- 40$ and $125\ {}^{\circ}\mathrm{C}$ puts a strain range of $1.2\ \%$ per cycle into a $1\ \mathrm{mm}$-diameter solder column because the silicon die, the copper pad and the laminate substrate have coefficients of expansion of $3$, $17$ and $14\ \mu \varepsilon / \mathrm{K}$ against the solder's $23$. The life is a **Coffin-Manson** fatigue life, $N_f \propto \Delta \epsilon^{- 2.5}$, and it is set by the solder's creep resistance and not by the liquidus.
**The design.** Use a **high-lead** or a **lead-free high-silver** alloy where the RoHS exemption for server and telecommunications hardware applies, or move the joint out of the thermal path entirely with a sintered-silver or a copper-post diffusion bond, which has no solder to fatigue.

*Sanity.* The electronics industry's RoHS conversion of 2006 is the largest unplanned materials substitution in engineering history, and it was made on a toxicity argument without a mechanical one. The result was a decade of field failures in automotive and aerospace electronics from solder-joint fatigue, and the eventual answer was not a better alloy but a **better diagram-reading habit**: the property that matters is the creep rate at the service homologous temperature, and the phase diagram only tells you where the liquidus is.
:::
:::
