A phase diagram is a map of free-energy minima. Every boundary on it is the locus of temperatures and compositions at which a common-tangent construction on the free-energy curves changes its answer, every region is the range over which one assemblage of phases has the lowest free energy, and the whole elaborate apparatus of liquidus and solidus and solvus and eutectic is the two-dimensional shadow of one condition: the chemical potential of each species is equal in every phase that contains it.

That is why the diagrams are so useful and why they are so misused. They are equilibrium maps, and almost every engineering process — casting, welding, heat treating, aging, sintering, service at temperature — is a departure from equilibrium whose size is the interesting part. A weld pool freezes in seconds, far too fast for the diffusion the diagram assumes, and the cored microstructure it leaves is the diagram's answer minus the diffusion that should have happened. An aged alloy is a diagram read at the wrong temperature on purpose. And a tool steel at room temperature contains cementite that the stable iron-graphite diagram does not show, because cementite is metastable and transforms to graphite far too slowly to matter in a steel.

::: warning Read the axes before the phase fields
Four errors account for most of the damage a phase diagram does to a designer. **Composition is weight per cent on most engineering diagrams and atomic per cent on most physics ones**, and the two differ, in the dilute limit, by the ratio of the atomic masses — for $\mathrm{Al - 12\ wt\ \%\ Si}$ the atomic fraction of silicon is $11.6$ per cent, close because aluminium and silicon have similar atomic masses, but for a light solute in a heavy solvent, such as carbon in iron, the atomic percentage is several times the weight percentage. **The diagram is a section at one atmosphere**, so anything with a volatile component — lithium, magnesium, zinc, manganese, nitrogen, oxygen — moves when the process is done in vacuum or in a reactive atmosphere, and a $\mathrm{TiAl}$ alloy's nitrogen content is not on the $\mathrm{Ti - Al}$ diagram at all. **Every line is an equilibrium line**, so a cooling rate of one degree per second can undercool a solid-state transformation by tens of degrees and put the boundary where the diagram does not put it; the continuous-cooling-transformation diagram of [[materials-science/phase-transformations]] is the correction and is the one a heat treater uses. And **a phase field is not a microstructure**: the diagram tells you the fractions and the compositions and nothing whatever about the shape, spacing or continuity of the phases, which is where the properties actually live. Two alloys with the same phase fractions can differ several-fold in toughness or creep strength because one has a continuous brittle phase and the other has it dispersed.
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
**Reading it.** A single-phase region of a binary diagram has $F = 2$: both temperature and composition are free. Two coexisting phases have $F = 1$: fix the temperature and the tie line fixes both compositions. Three phases in a binary have $F = 0$: a eutectic is an **invariant** reaction at one temperature, with fixed compositions of all three phases, and that is why an alloy of eutectic composition freezes at a single temperature like a pure metal. Four phases in a binary cannot coexist at equilibrium at constant pressure.
:::

::: definition The tangent construction and the lever rule {#def-lever}
At a temperature $T$, the equilibrium assemblage is the **common tangent** to the free-energy curves $G^{\alpha} (x )$ and $G^{\beta} (x )$: the tangent line touches each curve at the composition of that phase, and any overall composition between the two touch points lowers its free energy by splitting into the two, along a straight line on the $G$ plot. The tie-line ends of the tangent construction are the phase-boundary compositions, and the whole binary diagram is a stack of these constructions.
For an alloy of overall composition $x_0$ in a two-phase field with phase compositions $x_{\alpha}$ and $x_{\beta}$, **mass balance** gives the fractions
$$
f_{\alpha} = \frac{x_{\beta} - x_0}{x_{\beta} - x_{\alpha}}, \qquad
f_{\beta} = \frac{x_0 - x_{\alpha}}{x_{\beta} - x_{\alpha}}, \qquad f_{\alpha} + f_{\beta} = 1 ,
$$
the **lever rule**: the fraction of a phase is the length of the tie line on the *other side* of the fulcrum divided by the whole tie line. It is a statement of conservation of mass and nothing else, which is why it gives mass fractions on a weight-per-cent diagram and mole fractions on an atomic-per-cent one, and never works on a mixture of the two.
:::

::: definition Isomorphous systems, coring and the Hume-Rothery rules {#def-isomorphous}
Two elements that share a crystal structure and have atomic radii within about fifteen per cent, similar electronegativities and similar valences can form a **continuous solid solution** — copper-nickel, gold-silver, silicon-germanium, molybdenum-tungsten — and the diagram is a lens between a liquidus and a solidus with no invariant reaction anywhere.
Cooling an isomorphous alloy under equilibrium produces a homogeneous solid. Cooling it at any practical rate produces **coring**: the first solid is richer in the high-melting element than the last, and diffusion in the solid is too slow to erase the gradient. The dendrite cores of a copper-nickel casting are therefore richer in nickel than the average, the interdendritic regions poorer, and the last liquid to freeze is so rich in the low-melting component that it can solidify below the equilibrium solidus and cause **incipient melting** if the casting is later reheated to just below the equilibrium solidus. The cure is a **homogenising anneal** below the solidus, typically for hours to tens of hours, before the casting is hot worked.
:::

::: definition Eutectic, peritectic, monotectic {#def-eutectic}
$$
\textbf{Eutectic:} \quad L \rightleftharpoons \alpha + \beta
\qquad
\textbf{Peritectic:} \quad L + \alpha \rightleftharpoons \beta
\qquad
\textbf{Monotectic:} \quad L_1 \rightleftharpoons \alpha + L_2
$$
The eutectic is the lowest point of the liquidus in its part of the diagram and freezes at a single temperature into a **two-phase intergrowth** whose spacing $\lambda$ is set by the growth velocity $V$ through $\lambda^{2} V \approx \text{constant}$, because solute must diffuse sideways between the lamellae — the faster the growth, the finer the spacing, from several micrometres in a slowly cooled $\mathrm{Al - Si}$ casting to well below a micrometre in a rapidly solidified one. The peritectic is slower than it looks, because the new phase $\beta$ forms as a layer **around** the old $\alpha$ and the reaction can then continue only by diffusion **through $\beta$**; peritectic alloys in cast form therefore usually retain unreacted $\alpha$ that the equilibrium diagram says should have disappeared.
**Congruent** melting, $\text{compound} \rightarrow L$ of the same composition, gives a liquidus maximum (the $\mathrm{Mg_2 Si}$ of the aluminium alloys, the $\mathrm{NiAl}$ of the nickel-aluminium system); **incongruent** melting decomposes the compound on heating into a liquid and another solid, and appears on the diagram as a peritectic.
:::

::: widget plot
f: 0.35*(x*x-1)*(x*x-1) - 0.25
x: -1.6, 1.6
y: -0.4, 0.75
labels: G(x)
caption: A schematic free-energy curve with two minima, the form that produces a miscibility gap. For any overall composition between the two touch points of the common tangent — here the horizontal line through the minima — the lowest free energy is a mixture of the two phases at the touch-point compositions. Between the two inflection points, where the curvature is negative, the single phase is unstable to any small composition fluctuation and decomposes without a nucleation barrier: that is the spinodal of [[materials-science/phase-transformations]].
:::

::: definition Activities and the shape of the liquidus {#def-activity}
The chemical potential of a component is $\mu_{i} = \mu_{i}^{\circ} + RT \ln a_i$ with $a_i = \gamma_{i} x_{i}$ the **activity**, and equilibrium requires the activity of each species, referred to the same standard state, to be equal in both phases — not its concentration. A **regular solution** has
$$
\Delta G_{\mathrm{mix}} = \Omega\, x \left( 1 - x \right) + R T \left[ x \ln x + \left( 1 - x \right) \ln \left( 1 - x \right) \right] ,
$$
with $\Omega$ the interaction parameter, and the entropy term alone guarantees that $\Delta G_{\mathrm{mix}} < 0$ at the dilute limits, which is why **every** solid dissolves at least a little of every other. Phase separation requires a positive $\Omega$ large enough to beat the entropy, and the condition $\mathrm{d}^{2} G / \mathrm{d} x^{2} = 0$ at $x = 0.5$ gives the **critical solution temperature**
$$
T_{c} = \frac{\Omega}{2 R} ,
$$
so $\Omega = 17\ \mathrm{kJ / mol}$ gives $T_{c} = 1022\ \mathrm{K} = 749\ {}^{\circ}\mathrm{C}$, while copper-nickel, with a small positive $\Omega$, has a miscibility gap only at a few hundred degrees Celsius, where diffusion is too slow for it to matter in practice.
**Freezing-point depression.** If the liquid is an ideal solution and the solid is pure $A$, the liquidus falls from the melting point of $A$ as
$$
\ln \left( 1 - x_{B} \right) = - \frac{\Delta H_f}{R} \left( \frac{1}{T} - \frac{1}{T_{m}} \right) ,
$$
which needs nothing but the enthalpy of fusion of $A$, and which reproduces the aluminium side of the aluminium-silicon liquidus to within a few degrees.
:::

::: example Reading a binary diagram {#ex-cuni}
A $50\ \%$ copper-$50\ \%$ nickel alloy (by weight) is cooled slowly. Treating the liquid and the solid as ideal solutions, give the composition of the first solid, the fraction of liquid at $1280\ {}^{\circ}\mathrm{C}$, and the composition of the last liquid, and state what the real cast structure contains.
::: solution
**First solid.** The ideal-solution lens, calculated from the melting points and enthalpies of fusion of copper and nickel, puts the liquidus of the $50\ \%$-Ni alloy at $1293\ {}^{\circ}\mathrm{C}$, where the solid in equilibrium with it contains $57\ \%$ Ni. The first dendrite arms are therefore **$57\ \%$ nickel**, seven points richer than the melt.
**At $1280\ {}^{\circ}\mathrm{C}$.** The tie line runs from a liquid of $46.4\ \%$ Ni to a solid of $53.5\ \%$ Ni, so
$$
f_L = \frac{53.5 - 50}{53.5 - 46.4} = 0.49 ,
$$
about half liquid, and the two phases differ by seven points of nickel.
**Last liquid.** Under equilibrium the alloy is fully solid at the solidus, $1267\ {}^{\circ}\mathrm{C}$, and the last liquid has the liquidus composition at that temperature, $43\ \%$ Ni. Under any real cooling rate the solid cannot re-equilibrate, the remaining liquid becomes still poorer in nickel, and it freezes last between the dendrite arms below the equilibrium solidus.
**The real structure.** A cored dendrite array with nickel falling from about $57\ \%$ at the dendrite axes to below $43\ \%$ between the arms. The measured Cu-Ni diagram differs from this ideal estimate by some tens of degrees, so for real work the numbers are read from the measured diagram; the pattern is the same.

*Check.* The homogenising time goes as the **square of the dendrite arm spacing**: the solute has to diffuse about half an arm spacing, so $t \approx \lambda_{2}^{2} / \left( 4 D \right)$, which for $\lambda_{2} = 50\ \mu\mathrm{m}$ and an assumed $D = 10^{- 14}\ \mathrm{m^{2} / s}$ is $6.3 \times 10^{4}\ \mathrm{s}$, about seventeen hours. $\checkmark$

*Sanity.* Homogenising treatments of many hours are normal industrial practice for cast copper-nickel and nickel alloys, and the square law is why finer dendrites — from faster cooling or from remelting processes such as vacuum arc and electroslag remelting, whose shallower pools freeze faster — shorten the treatment so effectively.
:::
:::

::: example The eutectic temperature from one parameter {#ex-alsi}
Estimate the eutectic temperature of the aluminium-silicon system from the enthalpy of fusion of aluminium and the eutectic composition, and compare with the measured $577\ {}^{\circ}\mathrm{C}$.
::: solution
**Composition.** $12.6\ \%$ silicon by weight is
$$
x_{\mathrm{Si}} = \frac{12.6 / 28.09}{12.6 / 28.09 + 87.4 / 26.98} = 0.122 \text{ atomic} .
$$
**Freezing-point depression.** With $\Delta H_f = 10.7\ \mathrm{kJ / mol}$ and $T_{m} = 933\ \mathrm{K}$,
$$
\ln \left( 1 - 0.122 \right) = - 0.130 = - \frac{10{,}700}{8.314} \left( \frac{1}{T} - \frac{1}{933} \right)
\quad\Longrightarrow\quad
T = 853\ \mathrm{K} = 580\ {}^{\circ}\mathrm{C} .
$$
**The comparison.** The measured eutectic is $577\ {}^{\circ}\mathrm{C}$, three degrees away, from a model with **one** material parameter and no adjustable constants.
**Why it works.** On the aluminium side the liquid behaves nearly ideally, and the solid deposited is almost pure aluminium (it dissolves at most about $1.6\ \%$ silicon), which are exactly the two assumptions of the formula.

*Check.* The method needs the measured eutectic composition. Applying the same ideal formula to the silicon liquidus, with $\Delta H_f = 50.2\ \mathrm{kJ / mol}$ and $T_m = 1687\ \mathrm{K}$, and intersecting it with the aluminium liquidus gives a "eutectic" at about $630\ {}^{\circ}\mathrm{C}$ and $4.5$ atomic per cent silicon — far from the truth, because the silicon-rich liquid is strongly non-ideal. One branch of a liquidus can be ideal while the other is not. $\checkmark$

*Sanity.* The low eutectic temperature and the good fluidity are why $\mathrm{Al - Si}$ alloys dominate aluminium casting. The problem is the **morphology**, not the diagram — unmodified eutectic silicon grows as coarse brittle plates — and the cure is a small addition of sodium or strontium, of the order of a hundred parts per million, which changes the growth of the silicon and turns the plates into a fine fibrous network. That is a diagram that says nothing about the property and a microstructure that decides it.
:::
:::

::: example The iron-carbon diagram, read carefully {#ex-fe-c}
Give the phases and their fractions in a $0.40\ \%$ carbon steel just above and just below the eutectoid, and in a $1.0\ \%$ carbon tool steel at room temperature. Why is cementite on the diagram at all?
::: solution
**Just above $727\ {}^{\circ}\mathrm{C}$.** Austenite of $0.76\ \%$ C plus proeutectoid ferrite of $0.022\ \%$ C:
$$
f_{\alpha} = \frac{0.76 - 0.40}{0.76 - 0.022} = 0.49 , \qquad f_\gamma = 0.51 .
$$
**Just below $727\ {}^{\circ}\mathrm{C}$.** The austenite has become **pearlite**, a lamellar ferrite-cementite intergrowth, so the fractions are unchanged but the microstructure is now two constituents: $49\ \%$ light proeutectoid ferrite and $51\ \%$ dark pearlite, which is what a slowly cooled, polished and nital-etched $1040$ looks like under the microscope.
**Total cementite at room temperature.** With $6.67\ \%$ C in $\mathrm{Fe_3C}$ and, neglecting the fall in carbon solubility below $727\ {}^{\circ}\mathrm{C}$, $0.022\ \%$ in ferrite,
$$
f_{\mathrm{Fe_3 C}} = \frac{0.40 - 0.022}{6.67 - 0.022} = 0.057 ,
$$
so a medium-carbon steel is $94\ \%$ ferrite by mass and the cementite is doing a great deal with very little.
**The $1.0\ \%$ tool steel.** $f_{\mathrm{Fe_3 C}} = \left( 1.0 - 0.022 \right) / 6.648 = 0.147$. Of this, $\left( 1.0 - 0.76 \right) / \left( 6.67 - 0.76 \right) = 0.041$ is **proeutectoid cementite** deposited on the prior-austenite grain boundaries, and the remaining $0.106$ is the cementite in the pearlite. The proeutectoid cementite can form a continuous brittle network, which is why such steels are spheroidise-annealed before machining, and why a network formed by slow cooling must be dissolved by austenitising above the $A_{cm}$ line and cooling fast enough to stop it re-forming.
**Why cementite is there.** Iron-carbon equilibrium is $\mathrm{Fe} + \mathrm{C}$ (graphite); cementite is **metastable**. The stable diagram lies close to the metastable one, but the formation of graphite needs the nucleation of a carbon-rich phase and long-range carbon diffusion, which are slow enough that a plain-carbon steel stays $\mathrm{Fe - Fe_3 C}$ indefinitely at room temperature. Silicon, at one to three per cent in grey cast iron, promotes graphite formation — which is why **cast iron** solidifies with graphite and machines well, while **steel** keeps its cementite.

*Check.* The eutectoid composition of $0.76\ \%$ and the eutectoid temperature of $727\ {}^{\circ}\mathrm{C}$ are the modern values; the older $0.80\ \%$ and $723\ {}^{\circ}\mathrm{C}$ appear in older textbooks and shift the proeutectoid ferrite fraction of a $0.40\ \%$ steel from $0.49$ to $0.40 / 0.778 = 0.51$. $\checkmark$

*Sanity.* As the carbon content of an annealed plain-carbon steel rises from $0.40\ \%$ to $0.80\ \%$, the pearlite fraction rises from about half to essentially all of the structure, and the strength rises with it. But pearlite's strength is set mainly by its **interlamellar spacing**, which is set by the cooling rate through the eutectoid and not by the diagram. The diagram gives the fractions; the processing gives the spacing; the properties depend on both.
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
**The consequences.** The matrix around a $2\ \mathrm{nm}$ precipitate is in equilibrium with a solute concentration **three and a half times** the large-particle value, so during a long hold the small particles dissolve while the large ones grow — **Ostwald ripening**, and one reason a peak-aged alloy held too long at the aging temperature softens.
**The other consequence.** The solubility of a nanometre-scale precipitate is not the solvus on the diagram, so the diagram cannot describe the early stages of an aging treatment, when the precipitates are a few nanometres across and are often metastable phases that do not appear on the equilibrium diagram at all.

*Check.* The Gibbs-Thomson length $2 \gamma V_{m} / R T$ is $2.5\ \mathrm{nm}$ at $473\ \mathrm{K}$ and $1.3\ \mathrm{nm}$ at $950\ \mathrm{K}$, so for these property values the effect is a nanometre-scale phenomenon, only a few per cent at a radius of $50\ \mathrm{nm}$. $\checkmark$

*Sanity.* The same capillarity term governs the coarsening of a dispersion, the curvature correction to the temperature of a dendrite tip, and the driving force for sintering a powder compact, and it is why very small particles melt below the bulk melting point. The phase diagram is a **large-particle** document that needs this correction at the scale of precipitates.
:::
:::

::: example Design {#ex-design-weld}
An Al-Mg-Si $6061$-T6 bracket is welded with a $4043$ (Al-5Si) filler. Predict the microstructure across the weld, the strength profile, and the location of failure.
::: solution
**The base metal.** $6061$ is strengthened by fine metastable precursors ($\beta^{\prime\prime}$) of the $\mathrm{Mg_2 Si}$ phase. It is solution treated at about $530\ {}^{\circ}\mathrm{C}$ — hot enough to dissolve the magnesium and silicon, but below the temperature at which the alloy begins to melt — quenched, and aged at about $160$ to $177\ {}^{\circ}\mathrm{C}$.
**The weld thermal cycle.** In a TIG or MIG weld the fusion zone is molten metal, and the base metal next to it is heated briefly to every temperature between the melting range and ambient. Divide the bracket into four zones:
1. **Fusion zone.** A mixture of $4043$ filler and melted base metal, hypoeutectic, freezing between about $630$ and $577\ {}^{\circ}\mathrm{C}$ into primary $\alpha$-Al dendrites with eutectic silicon between them. It has a cast structure, has not been heat treated, and is weak.
2. **Partially melted zone.** A narrow band at the fusion boundary where the grain boundaries of the base metal melted briefly; it is prone to **liquation cracking**, especially when the weld metal is low in silicon, which is one reason a silicon-rich filler is used on $6061$.
3. **Heat-affected zone, overaged.** Peak temperatures from roughly $250$ to $450\ {}^{\circ}\mathrm{C}$: the $\beta^{\prime\prime}$ precipitates coarsen to $\beta^{\prime}$ and equilibrium $\beta\ \mathrm{Mg_2 Si}$, and the alloy loses its strength irreversibly. This band, typically several millimetres to a couple of centimetres from the weld, is the weakest metal in the assembly.
4. **Heat-affected zone, solutionised.** Peak temperatures close to the solution-treatment temperature: the precipitates dissolve, the zone is as soft as T4 material, and on cooling it **naturally ages** at room temperature and recovers part of its strength over days to weeks.
**Failure.** In the **heat-affected zone**, at an as-welded tensile strength of about $165$ to $185\ \mathrm{MPa}$ against $310\ \mathrm{MPa}$ for the T6 base metal — a joint efficiency of roughly $0.55$ to $0.6$, which is why welding codes give much lower design strengths for welded $6061$-T6 than for the base metal.
**The design response.** Where it is practical, weld first and then solution treat and age the whole assembly — which is how welded $6061$ bicycle frames are made; re-aging alone does not restore the overaged zone. Where the part is too large, use a **non-heat-treatable 5000-series** alloy, which, in the annealed (O) temper, loses little strength in the heat-affected zone because it had no precipitates or cold work to lose.

*Design comment.* The general rule this example teaches is that **a fusion weld destroys the heat treatment near itself, and no filler metal can repair that**. The three honest options are: weld in the soft condition and re-heat-treat the assembly; use a non-heat-treatable alloy; or design the joint so that the heat-affected zone is not the critical section. What is not honest is a weld drawing that specifies the base metal's T6 properties for the assembly.
:::
:::

::: history
The thermodynamics came first. **J. Willard Gibbs** set out the conditions for equilibrium between phases, including the phase rule, in *On the Equilibrium of Heterogeneous Substances*, published in the *Transactions of the Connecticut Academy* between 1875 and 1878; it was little read by chemists until **Wilhelm Ostwald** translated it into German in 1892. **H. W. Bakhuis Roozeboom**, introduced to Gibbs's work by **J. D. van der Waals**, showed from 1887 how the phase rule classifies real heterogeneous equilibria, and in 1900 he constructed an iron-carbon diagram on phase-rule principles. The measurements came from new instruments: **Henry Le Chatelier** introduced the platinum/platinum-rhodium thermocouple in the 1880s, and **William Chandler Roberts-Austen** used a recording pyrometer to map the arrest points of iron-carbon alloys in the reports of the Alloys Research Committee in the late 1890s. The ideal-solution freezing-point depression used in [[#ex-alsi]] goes back to **J. H. van 't Hoff**'s dilute-solution theory of 1886, and **G. N. Lewis** and **Merle Randall**'s *Thermodynamics* of 1923 made activity and chemical potential standard tools. **Max Hansen**'s 1936 compilation of binary diagrams, *Der Aufbau der Zweistofflegierungen*, became the standard reference for engineering alloys. **Aladar Pacz** patented the sodium modification of aluminium-silicon alloys around 1920. The dependence of equilibrium on interface curvature goes back to **William Thomson** (Lord Kelvin), who derived the vapour pressure over a curved surface in 1871; **Wilhelm Ostwald** described the ripening of small particles in 1900, and **I. M. Lifshitz** and **V. V. Slyozov** and, independently, **Carl Wagner** gave its theory in 1961.
:::

## Where this leads

The equilibrium fractions of this lesson become the transformation kinetics of [[materials-science/phase-transformations]] once a cooling rate is imposed, the precipitate of [[#ex-gibbs-thomson]] is the Orowan obstacle of [[materials-science/dislocations-strengthening]], the cementite network of [[#ex-fe-c]] is a crack path of [[materials-science/failure]], and the weld heat-affected zone of [[#ex-design-weld]] is also where the residual stresses of a weld are concentrated, a problem for [[mechanics-of-materials]].

::: summary
- A phase diagram is the map of common-tangent constructions on a stack of free-energy curves; the phase rule $F = C - P + 1$ counts what you may change before a phase disappears.
- The lever rule is mass balance and nothing more, and is valid only in the units the axis is drawn in.
- Isomorphous systems core on cooling, and homogenising takes a time of order the square of the dendrite arm spacing divided by the diffusivity.
- A eutectic is invariant, freezes at one temperature, and its spacing — not only its fraction — carries the properties.
- Ideal freezing-point depression with one parameter reproduces the aluminium-silicon eutectic temperature to three degrees, given the eutectic composition; the silicon-rich liquidus is far from ideal.
- At precipitate sizes of a few nanometres the Gibbs-Thomson term shifts solubilities appreciably, which is the scale of the early stages of aging.
:::

::: quiz
An alloy of exactly eutectic composition is cooled slowly. Which statement is correct?
- [x] It freezes at one temperature, and the two solid phases form simultaneously as an intergrowth
- [ ] It freezes over the whole range between the liquidus and the solidus
- [ ] One phase forms first and the other fills the last liquid
- [ ] It cannot freeze without undercooling
::: solution
At the eutectic the liquid and the two solids coexist with $F = 0$ at constant pressure, so the alloy transforms at a single temperature into both solids at once. That is part of what makes near-eutectic alloys good casting alloys — with little or no mushy zone they flow well and feed shrinkage more easily.
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
About fifteen per cent.
:::
:::

::: exercise Gibbs-Thomson {level=1 check="3.5"}
By what factor is the matrix solubility raised around a $2\ \mathrm{nm}$ precipitate when the capillary length $2 \gamma V_{m} / R T$ is $2.5\ \mathrm{nm}$?
::: solution
$\exp \left( 2.5 / 2 \right) = 3.5$.
:::
:::

::: exercise Coring {level=2 check="23"}
A copper-nickel dendrite has an arm spacing of $100\ \mu\mathrm{m}$. Estimate the homogenising time, in hours, at a temperature where $D = 3 \times 10^{- 14}\ \mathrm{m^{2} / s}$, using $t \approx \lambda^{2} / \left( 4 D \right)$.
::: solution
$$
t \approx \frac{\left( 100 \times 10^{- 6} \right)^{2}}{4 \times 3 \times 10^{- 14}} = 8.3 \times 10^{4}\ \mathrm{s} = 23\ \mathrm{h} .
$$
*Sanity.* Halving the dendrite arm spacing by cooling faster cuts the homogenising time by a factor of four, which is a strong argument for faster-cooled casting processes when homogeneity matters. It is also why a large ingot is homogenised for much longer than a thin strip cast at the same temperature.
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
f_{\mathrm{pearlite}, 0.90} = \frac{6.67 - 0.90}{6.67 - 0.76} = 0.98 .
$$
*Sanity.* In a slowly cooled hypereutectoid steel the small amount of proeutectoid cementite sits on the prior-austenite grain boundaries and can form a continuous brittle network, so ductility and toughness fall even though hardness keeps rising. That is why the high-carbon ball-bearing steels, at about $1\ \%$ carbon, are spheroidise-annealed and then hardened from a temperature at which part of the carbide stays as fine spheroidal particles, so that no network exists.
:::
:::

::: exercise Regular solution {level=2 check="449"}
A binary system has an interaction parameter $\Omega = 12\ \mathrm{kJ / mol}$. Give the critical solution temperature in degrees Celsius, and say whether the system is miscible at $500\ {}^{\circ}\mathrm{C}$.
::: solution
$$
T_{c} = \frac{\Omega}{2 R} = \frac{12{,}000}{2 \times 8.314} = 722\ \mathrm{K} = 449\ {}^{\circ}\mathrm{C} .
$$
At $500\ {}^{\circ}\mathrm{C}$ the system is **above** $T_{c}$ and is fully miscible; at $400\ {}^{\circ}\mathrm{C}$ it is below, and alloys near the middle of the composition range separate into two phases.
*Sanity.* Miscibility gaps of this kind underlie spinodal decomposition, which is used in the Cu-Ni-Fe ("Cunife") and Fe-Cr-Co permanent-magnet alloys. A harmful example is the iron-chromium miscibility gap: ferrite containing much chromium decomposes into iron-rich and chromium-rich regions when held at roughly $300$ to $500\ {}^{\circ}\mathrm{C}$, and embrittles ferritic and duplex stainless steels — the "$475\ {}^{\circ}\mathrm{C}$ embrittlement" of the trade literature.
:::
:::

::: exercise Derivation {level=3}
Derive the lever rule from mass balance, and derive the condition for a precipitate's equilibrium solubility from the Gibbs-Thomson argument.
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
*Sanity.* Two consequences follow that are not obvious from the formula. First, $c_{r}$ decreases as $r$ increases, so a small particle dissolves while a large one grows at the small one's expense — Ostwald ripening — and the mean radius grows as $t^{1 / 3}$ in diffusion-controlled coarsening, the **Lifshitz-Slyozov-Wagner** law that governs how fast an over-aged alloy softens. Second, the derivation ignored elastic strain; for a **coherent** precipitate the coherency strain energy raises its free energy, so its solvus lies below that of the incoherent equilibrium phase, which is why metastable coherent phases such as GP zones have their own, lower solvus lines.
:::
:::

::: exercise Design {level=3}
Select a solder alloy for a power module that will cycle between $- 40\ {}^{\circ}\mathrm{C}$ and $125\ {}^{\circ}\mathrm{C}$, and justify it against the phase diagram.
::: solution
**The old answer and why it is gone.** $\mathrm{Sn - 37\ Pb}$ is close to the tin-lead eutectic at $183\ {}^{\circ}\mathrm{C}$, wets well and has a long service record, but since July 2006 the European Union's RoHS directive has restricted lead in most electrical and electronic equipment.
**The replacement.** $\mathrm{Sn - 3.0\ Ag - 0.5\ Cu}$ ("SAC305"), near-eutectic, melting between $217$ and $220\ {}^{\circ}\mathrm{C}$. At $125\ {}^{\circ}\mathrm{C}$ its homologous temperature is $398 / 490 = 0.81$, against $398 / 456 = 0.87$ for tin-lead, and the lower homologous temperature helps its creep resistance at the top of the cycle.
**The diagram's warning.** The $\mathrm{Sn - Ag}$ eutectic lies at $3.5\ \%$ silver and $221\ {}^{\circ}\mathrm{C}$, and the silver forms the intermetallic $\mathrm{Ag_3 Sn}$; at or above the eutectic silver content, slow cooling can grow large primary $\mathrm{Ag_3 Sn}$ plates that weaken the joint, which is one reason lower-silver alloys are used. The copper addition, near the $\mathrm{Sn - Cu}$ eutectic content of $0.7\ \%$, lowers the melting point slightly and reduces the dissolution of copper pads; higher copper contents produce primary $\mathrm{Cu_6 Sn_5}$.
**The real failure.** Thermal cycling between $- 40$ and $125\ {}^{\circ}\mathrm{C}$ imposes a cyclic shear strain on the joint because the silicon die, the copper and the substrate have coefficients of expansion of about $3$, $17$ and $15\ \mu \varepsilon / \mathrm{K}$, against the solder's $22$ or so. The life is a low-cycle **Coffin-Manson** fatigue life, roughly $N_f \propto \Delta \epsilon^{- 2}$, and it is governed by the solder's creep-fatigue behaviour and the joint geometry, not by the liquidus.
**The design.** Use SAC305 or a lower-silver SAC alloy for board-level joints; for die attach in a power module, use a high-lead solder (more than $85\ \%$ lead) where the RoHS exemption for high-melting-temperature solders still applies, or remove the solder from the thermal path altogether with a sintered-silver bond, which has no low-melting phase to creep.

*Sanity.* The lead-free transition was driven by regulation on environmental grounds, and it forced a great deal of reliability testing because the creep and fatigue behaviour of tin-silver-copper solders differs from that of tin-lead. The lesson is a **diagram-reading habit**: the property that matters is the creep-fatigue behaviour at the service homologous temperature, and the phase diagram tells you where the melting range and the intermetallics are, not how long the joint will last.
:::
:::
