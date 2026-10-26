Redox is the second half of inorganic chemistry's grammar, and like the first half it is really thermodynamics wearing a different uniform. Every standard potential is a free energy in disguise ($\Delta_\mathrm{r} G^\circ = -nFE^\circ$), every stability question — will this ion disproportionate, will this ore yield its metal, will this compound survive in water — is a comparison of slopes and line positions on one of four diagrams. This chapter teaches those four charts: the **Latimer diagram** of potentials between adjacent oxidation states, the **Frost diagram** that turns them into a convex-hull picture of stability, the **Pourbaix diagram** that adds pH, and the **Ellingham diagram** that decides which element gets to keep the oxygen. The mathematics is linear — straight lines, weighted averages, one slope formula — and the reward is that you stop memorising reactions and start reading them off.

## Latimer diagrams: potentials as stacked free energies

::: definition The Latimer diagram {#def-latimer}
A **Latimer diagram** lists the standard reduction potentials between *adjacent* oxidation states of an element, written left to right from highest to lowest oxidation state, e.g. for manganese in acid (all versus the standard hydrogen electrode):
$$
\mathrm{MnO_4^-} \xrightarrow{\ 0.56\ } \mathrm{MnO_4^{2-}} \xrightarrow{\ 2.26\ } \mathrm{MnO_2} \xrightarrow{\ 0.95\ } \mathrm{Mn^{3+}} \xrightarrow{\ 1.51\ } \mathrm{Mn^{2+}} \xrightarrow{\ -1.18\ } \mathrm{Mn}
$$
Each number is the potential of the one-electron (or $n$-electron) step to its right, at $\mathrm{pH}\ 0$, activities unity. The whole redox chemistry of the element — what oxidises what, what is stable, what disproportionates — is encoded in this row of numbers.
:::

::: proposition Potentials add as free energies, not as voltages {#prop-weighted-average}
If step 1 transfers $n_1$ electrons at potential $E_1$ and step 2 transfers $n_2$ at $E_2$, the overall couple has
$$
E^\circ = \frac{n_1 E_1 + n_2 E_2}{n_1 + n_2},
$$
because $\Delta_\mathrm{r} G^\circ = -nFE^\circ$ is a state function and free energies add. The potential of $\mathrm{MnO_4^- / Mn^{2+}}$, for instance, is $(3 \times 1.695 + 1 \times 0.95 + 1 \times 1.51)/5 = 1.51\ \mathrm{V}$ — not the arithmetic mean of the steps.
:::

::: proof Why the weights are electron numbers {#proof-weighted}
Write the two steps as reductions: $\mathrm{A} + n_1 e^- \to \mathrm{B}$ with $\Delta_\mathrm{r} G_1^\circ = -n_1 F E_1^\circ$, and $\mathrm{B} + n_2 e^- \to \mathrm{C}$ with $\Delta_\mathrm{r} G_2^\circ = -n_2 F E_2^\circ$. Adding the equations cancels $\mathrm{B}$ and gives $\mathrm{A} + (n_1 + n_2) e^- \to \mathrm{C}$, whose free energy is the sum: $-(n_1 + n_2) F E^\circ = -n_1 F E_1^\circ - n_2 F E_2^\circ$. Dividing by $-(n_1 + n_2)F$ gives the weighted average. The proof shows exactly why voltages are *not* additive: $E^\circ$ is a free energy *per electron*, and averaging per-electron quantities requires weighting by the number of electrons — the same reason a two-stage pump's pressure gain is not the mean of the stages. The intermediate $\mathrm{B}$ cancelled because a state function does not care about the route: this is the whole power and the whole limitation of Latimer diagrams.
:::

::: example Two averages from the manganese row {#ex-mn-average}
Use the Latimer diagram above to find (a) $E^\circ(\mathrm{MnO_4^- / MnO_2})$ and (b) $E^\circ(\mathrm{MnO_4^- / Mn^{2+}})$, and explain why permanganate is such a convenient titrant.
::: solution
(a) The path $\mathrm{MnO_4^- \to MnO_4^{2-} \to MnO_2}$ carries $1 + 2 = 3$ electrons: $E^\circ = (1 \times 0.56 + 2 \times 2.26)/3 = 1.69\ \mathrm{V}$. (b) Extending to $\mathrm{Mn^{2+}}$ adds $1 \times 0.95$ and $1 \times 1.51$ for 5 electrons total: $E^\circ = (3 \times 1.695 + 0.95 + 1.51)/5 = 1.51\ \mathrm{V}$. Both values are large and positive: permanganate attacks almost anything, going to colourless $\mathrm{Mn^{2+}}$ in acid (the titration end-point is the first permanent pink) or to brown $\mathrm{MnO_2}$ in neutral solution — the same element, the same diagram, two workmanlike potentials depending on which segment you ride.
:::
:::

::: example Gold: why $\mathrm{Au^+}$ vanishes and gold dissolves in cyanide {#ex-au}
The acid Latimer row for gold is $\mathrm{Au^{3+}} \xrightarrow{\ 1.40\ } \mathrm{Au^+} \xrightarrow{\ 1.69\ } \mathrm{Au}$. Find $E^\circ(\mathrm{Au^{3+}/Au})$ and decide whether $\mathrm{Au^+}$ survives in water.
::: solution
$E^\circ(\mathrm{Au^{3+}/Au}) = (2 \times 1.40 + 1 \times 1.69)/3 = 1.50\ \mathrm{V}$. For $\mathrm{Au^+}$ the potential *to its right* (1.69) exceeds the potential *to its left* (1.40), and the criterion of the next section says it disproportionates: $3\,\mathrm{Au^+} \to \mathrm{Au^{3+}} + 2\,\mathrm{Au}$, with $E^\circ_\mathrm{cell} = 1.69 - 1.40 = 0.29\ \mathrm{V}$ for two electrons and $K \approx 10^{10}$. "Gold(I)" in water is therefore a myth maintained only by ligands — and the same logic explains cyanide extraction: complexation collapses both gold potentials, and with $\mathrm{[Au(CN)_2]^-}$ formed, oxygen itself ($E^\circ = 1.23\ \mathrm{V}$) is now strong enough to dissolve the metal. The mine is run by a Latimer diagram.
:::
:::

::: warning Never average, never flip signs casually {#warn-not-additive}
Three errors account for most Latimer mistakes. (i) *Averaging potentials*: $(0.56 + 2.26)/2 = 1.41$ is wrong for the three-electron $\mathrm{MnO_4^-/MnO_2}$ couple; weight by $n$. (ii) *Reversing a step and keeping the sign*: oxidation potentials are the negatives of reduction potentials, but a Latimer diagram is read left-to-right as reductions only. (iii) *Mixing pH*: the acid row and the base row are different tables ($E^\circ(\mathrm{O_2/H_2O})$ is $1.23\ \mathrm{V}$ in acid, $0.40\ \mathrm{V}$ in base) because the potentials contain the $\mathrm{H^+}$ of the half-equation; a number quoted without its pH is a number without a meaning.
:::

## Disproportionation, and the one-line criterion

::: proposition The disproportionation criterion {#prop-disproportionation}
A species in an intermediate oxidation state disproportionates when the potential to its right in the Latimer diagram exceeds the potential to its left:
$$
E^\circ_\mathrm{right} > E^\circ_\mathrm{left} \quad \Longleftrightarrow \quad \Delta_\mathrm{r} G^\circ < 0 \text{ for disproportionation.}
$$
The cell being run is "right-hand couple as reduction, left-hand couple in reverse as oxidation", so $E^\circ_\mathrm{cell} = E^\circ_\mathrm{right} - E^\circ_\mathrm{left}$ and the equilibrium constant follows from $\log K = n E^\circ_\mathrm{cell}/0.059\ \mathrm{V}$ at $298\ \mathrm{K}$. The reverse reaction — two oxidation states meeting to give one — *comproportionates* whenever the inequality reverses.
:::

::: proof The criterion from $\Delta_\mathrm{r} G^\circ = -nFE^\circ$ {#proof-disprop}
Let the intermediate $\mathrm{B}$ sit between $\mathrm{A}$ (higher oxidation state, couple $E_\mathrm{left}^\circ$) and $\mathrm{C}$ (lower, couple $E_\mathrm{right}^\circ$). Disproportionation is $\mathrm{B}$ reduced to $\mathrm{C}$ (cathode, $E_\mathrm{right}^\circ$) run with $\mathrm{B}$ oxidised to $\mathrm{A}$ (anode, $E_\mathrm{left}^\circ$) in reverse: $E_\mathrm{cell}^\circ = E_\mathrm{right}^\circ - E_\mathrm{left}^\circ$, and $\Delta_\mathrm{r} G^\circ = -n F E_\mathrm{cell}^\circ$ is negative exactly when $E_\mathrm{right}^\circ > E_\mathrm{left}^\circ$. The equilibrium constant then satisfies $\ln K = n F E_\mathrm{cell}^\circ / RT$, i.e. $\log K = n E_\mathrm{cell}^\circ/0.0592\ \mathrm{V}$ at $298\ \mathrm{K}$: every $0.059\ \mathrm{V}$ of excess buys a factor of ten at unit electron count. Note what the proof does *not* assume — no mechanism, no rate. The criterion says only that the mixture is thermodynamically doomed; how fast it dies is another subject (and for $\mathrm{H_2O_2}$ the difference is a shelf life).
:::

::: example Copper(I): the $0.37\ \mathrm{V}$ that ends an ion {#ex-cu-disprop}
From $\mathrm{Cu^{2+}} \xrightarrow{\ 0.153\ } \mathrm{Cu^+} \xrightarrow{\ 0.521\ } \mathrm{Cu}$, compute $K$ for $2\,\mathrm{Cu^+ (aq)} \to \mathrm{Cu^{2+} (aq)} + \mathrm{Cu (s)}$.
::: solution
$E^\circ_\mathrm{cell} = 0.521 - 0.153 = 0.368\ \mathrm{V}$ with $n = 1$: $\log K = 0.368/0.0592 = 6.2$, $K \approx 1.7\times10^{6}$. Aqueous $\mathrm{Cu^+}$ is a laboratory fiction at ordinary concentrations — add a soluble copper(I) salt to water and copper metal precipitates while the solution turns blue. The exceptions prove the rule's ligand dependence: solid $\mathrm{CuCl}$ survives because it is sparingly soluble ($K_\mathrm{sp} \sim 10^{-7}$ removes $\mathrm{Cu^+}$ from the solution; $K_\mathrm{sp}$ is a solubility product, not a lattice energy), and $\mathrm{[Cu(CH_3CN)_4]^+}$ is stable in acetonitrile because that solvent makes disproportionation unfavourable. Add water and the complex falls apart; aqueous $\mathrm{Cu(I)}$ then disproportionates. Precipitation and complexation are Le Chatelier's levers on a Latimer diagram.
:::
:::

::: example Hydrogen peroxide: thermodynamically dead, commercially bottled {#ex-h2o2-disprop}
From the acid row $\mathrm{O_2} \xrightarrow{\ 0.695\ } \mathrm{H_2O_2} \xrightarrow{\ 1.776\ } \mathrm{H_2O}$, decide whether $\mathrm{H_2O_2}$ disproportionates and estimate $K$ for $2\,\mathrm{H_2O_2 (aq)} \to 2\,\mathrm{H_2O (l)} + \mathrm{O_2 (g)}$.
::: solution
$1.776 > 0.695$, overwhelmingly: $E^\circ_\mathrm{cell} = 1.081\ \mathrm{V}$ for a two-electron process, $\log K = 2 \times 1.081/0.0592 \approx 36.5$, $K \sim 10^{36}$. Peroxide is not metastable in the sense of sugar in air — it is metastable in the sense of a diamond, protected by kinetics: the electron transfers that make and break the weak $\mathrm{O{-}O}$ bond (about $210\ \mathrm{kJ\,mol^{-1}}$) are slow in clean solution, and the triplet ground state of $\mathrm{O_2}$ makes the elementary steps spin-awkward, so the reaction needs surfaces, light or catalase to happen at a human rate. Bottles hold stabilisers and sit in the dark; a drop of $\mathrm{MnO_2}$ or a haem enzyme and the same solution foams over in seconds. Thermodynamics writes the cheque; kinetics decides when it clears.
:::
:::

::: example Manganese(III) and manganate(VI): two textbook disproportionations {#ex-mn3-mno42}
Which of $\mathrm{Mn^{3+}}$ and $\mathrm{MnO_4^{2-}}$ disproportionate in water, according to the manganese Latimer diagram?
::: solution
Both. $\mathrm{Mn^{3+}}$: right $1.51 >$ left $0.95$, so $2\,\mathrm{Mn^{3+}} + 2\,\mathrm{H_2O} \to \mathrm{Mn^{2+}} + \mathrm{MnO_2} + 4\,\mathrm{H^+}$ with $E^\circ = 0.56\ \mathrm{V}$, $K \sim 10^{9}$ — $\mathrm{Mn^{3+}}$ exists only in fast flow or cold acid. $\mathrm{MnO_4^{2-}}$: right $2.26 >$ left $0.56$, so $3\,\mathrm{MnO_4^{2-}} + 4\,\mathrm{H^+} \to 2\,\mathrm{MnO_4^-} + \mathrm{MnO_2} + 2\,\mathrm{H_2O}$: the green manganate of a fused-alkali bead turns purple and browns as it is diluted with water, Disproportionation already makes permanganate, and it throws a third of the manganese away as $\mathrm{MnO_2}$. Industry oxidises $\mathrm{Mn(VI)}$ to $\mathrm{Mn(VII)}$ with chlorine or at an anode so that manganese is not lost; that oxidation is not the reverse of the disproportionation. Notice the pH lever in the second equation: four protons per three manganates means the disproportionation is suppressed in strong base, which is exactly where green $\mathrm{MnO_4^{2-}}$ solutions are stable.
:::
:::

## Frost diagrams: stability as a landscape

::: definition The Frost (oxidation-state) diagram {#def-frost}
In a **Frost diagram** plot $nE^\circ$ against oxidation number. Formation of the state from the element has $\Delta_\mathrm{f} G^\circ = +nFE^\circ$, so the ordinate is $nE^\circ = \Delta_\mathrm{f} G^\circ/F$, a free-energy scale in volt-units. Dividing by the electron count $z$ as well would give $E^\circ$, not $nE^\circ$. The element sits at the origin; each state's height is the free energy of forming it from the element, in volt-units. Consequences read off the geometry: **the lower a point, the more stable the state** overall; **a point lying above the line joining its neighbours disproportionates** into them (the line is the two-product mixture, the point is the single species); and **the slope of the segment between two states is their mutual Latimer potential** — steeper (more positive) slope means the higher state is a stronger oxidant.
:::

::: example Copper on a Frost diagram {#ex-cu-frost}
For copper the points are $\mathrm{Cu}\ (0,\ 0)$, $\mathrm{Cu^+}\ (1,\ 0.52)$, $\mathrm{Cu^{2+}}\ (2,\ 0.68)$. Where does $\mathrm{Cu^+}$ sit relative to the $\mathrm{Cu}$–$\mathrm{Cu^{2+}}$ line, and what does the diagram say about oxidising copper metal in air?
::: solution
The $\mathrm{Cu}$–$\mathrm{Cu^{2+}}$ chord at oxidation number 1 stands at $0.68/2 = 0.34$, below $\mathrm{Cu^+}$'s $0.52$: the point is above the chord, so $\mathrm{Cu^+}$ disproportionates — the same verdict as the Latimer criterion, now visible as a bend in a landscape. The slopes tell the rest: $\mathrm{Cu \to Cu^+}$ has slope $0.52$ and $\mathrm{Cu^+ \to Cu^{2+}}$ slope $0.15$, so air ($1.23\ \mathrm{V}$) can climb the whole hill from $\mathrm{Cu}$ to $\mathrm{Cu^{2+}}$ — copper dissolves in aerated acid — but hydrogen ($0.00\ \mathrm{V}$) cannot even start, which is why old pennies survive hydrochloric acid and the Statue of Liberty needed a century of air and sulfur dioxide to turn green.
:::
:::

Frost diagrams shine when an element has many states: nitrogen's zig-zag (with $\mathrm{N_2}$ at the origin and $\mathrm{N_2O}$, $\mathrm{NO}$, $\mathrm{NO_2^-}$, $\mathrm{NO_3^-}$ climbing to the right) shows at a glance that nitrate sits in a deep kinetic valley — thermodynamically eager to fall back to $\mathrm{N_2}$, protected by a huge activation barrier, which is precisely why nitrate fertilisers store safely and why nitrogen chemistry is a story of kinetics over thermodynamics.

## Pourbaix diagrams: the potential–pH map

::: definition The Pourbaix diagram {#def-pourbaix}
A **Pourbaix diagram** maps the stable species of an element in water as a field diagram in the plane of $E$ (vertical) and $\mathrm{pH}$ (horizontal), at fixed temperature and total dissolved concentration. Boundaries come in three shapes, all from the Nernst equation $E = E^\circ - (0.059/z) \log Q$ at $298\ \mathrm{K}$: **vertical** lines where no electrons move (acid–base changes such as hydrolysis $\mathrm{M^{n+} \to MOH^{(n-1)+}}$), **horizontal** lines where no protons move (pure redox, e.g. $\mathrm{Fe^{3+}/Fe^{2+}}$), and **sloped** lines with
$$
\frac{\mathrm{d}E}{\mathrm{d}\,\mathrm{pH}} = -0.059 \times \frac{m}{z}\ \mathrm{V}
$$
for a half-reaction consuming $m$ protons per $z$ electrons. Water itself frames the map: above $E = 1.23 - 0.059\,\mathrm{pH}$ it gives up $\mathrm{O_2}$, below $E = -0.059\,\mathrm{pH}$ it gives up $\mathrm{H_2}$, and the narrow lens between is the domain where aqueous chemistry exists at all.
:::

::: example The slope of the permanganate line {#ex-mno4-line}
Find the slope of the $\mathrm{MnO_4^- / MnO_2}$ boundary on a Pourbaix diagram, and explain why permanganate oxidations are run in acid.
::: solution
The half-reaction $\mathrm{MnO_4^- + 4\,H^+ + 3\,e^- \to MnO_2 + 2\,H_2O}$ consumes $m = 4$ protons per $z = 3$ electrons: slope $= -0.059 \times 4/3 = -0.079\ \mathrm{V}$ per pH unit. The potential falls steeply as the solution becomes basic — at $\mathrm{pH}\ 14$ the line has dropped $1.1\ \mathrm{V}$ from its acid value — because the oxidant *is* partly the proton: removing $\mathrm{H^+}$ pulls the reaction left. That is why permanganate titrations are acidified, why the same bottle behaves as a mild oxidant in neutral solution (stopping at $\mathrm{MnO_2}$) and a violent one in acid (running to $\mathrm{Mn^{2+}}$), and why bleach bottles say *do not mix with acids* in reverse: adding acid to $\mathrm{OCl^-}$ raises its potential by $0.059 \times 2/2 = 0.059\ \mathrm{V}$ per pH unit dropped (two protons per two electrons in $\mathrm{OCl^- + 2\,H^+ + 2\,e^- \to Cl^- + H_2O}$) and, past about pH 6, releases chlorine gas.
:::
:::

::: example Why sodium floats and fizzes {#ex-water-window}
Place sodium metal and water on the same Pourbaix map and read off the reaction.
::: solution
The $\mathrm{Na^+/Na}$ line is flat (no protons) at $-2.71\ \mathrm{V}$, far below the $\mathrm{H_2O/H_2}$ boundary ($-0.059\,\mathrm{pH}$, i.e. $-0.41\ \mathrm{V}$ at $\mathrm{pH}\ 7$). Sodium is therefore stable on the map nowhere. At $\mathrm{pH}\ 7$ the gap from $-2.71\ \mathrm{V}$ up to the hydrogen line ($-0.41\ \mathrm{V}$) is about $2.3\ \mathrm{V}$. The standard reaction $\mathrm{Na + H_2O \to Na^+ + \tfrac12 H_2 + OH^-}$ uses the $-0.83\ \mathrm{V}$ couple, so $E^\circ = 1.88\ \mathrm{V}$ and $\log K \approx 32$ ($n = 1$), not $39$. The hydrogen line is the floor on what can exist in water at low potential, and it is why the whole electropositive end of the table — Li, Na, Ca, Al — must be extracted electrolytically, from melts, far from any proton source. The Pourbaix map of sodium has no aqueous stability field at all: the metal's flat line lies below the hydrogen line at every pH.
:::
:::

::: warning Pourbaix diagrams are thermodynamic, and water is not the whole story {#warn-passivation}
Three caveats before you trust a field boundary. (i) The diagrams assume equilibrium; aluminium's "immunity" field at pH 4–9 is a *passivating oxide film* that happens to be insoluble there, not an absence of driving force — scratch it or add chloride (which is why aluminium corrodes in seawater but not in tap water) and the map's lie is exposed. (ii) The water window is thermodynamic too: $\mathrm{O_2}$ and $\mathrm{H_2}$ evolution need overpotentials of hundreds of millivolts (electrode kinetics, [[electrochemistry/electrode-kinetics]]), which is why you can electrolyse brine to chlorine instead of oxygen and why aluminium smelting works at all. (iii) Boundary positions shift with total concentration (the diagrams are drawn for, say, $10^{-3}\ \mathrm{mol\,dm^{-3}}$ total metal) and with complexing agents: cyanide, ammonia or fluoride can move a metal's fields by volts.
:::

## Ellingham diagrams: who gets the oxygen

::: definition The Ellingham diagram {#def-ellingham}
An **Ellingham diagram** plots the standard free energy of forming an oxide **per mole of $\mathrm{O_2}$ consumed** against temperature, so that all lines share the same oxygen reference and can be compared directly: a metal whose line lies *below* yours can take your oxygen from you. Because $\left(\partial \Delta_\mathrm{r} G/\partial T\right)_p = -\Delta_\mathrm{r} S$, each line's slope is minus the reaction entropy, and the gas decides everything: metal + $\mathrm{O_2}$ → solid oxide loses a mole of gas (slope slightly positive, line gently rising), while $2\,\mathrm{C} + \mathrm{O_2} \to 2\,\mathrm{CO}$ *gains* a mole of gas (slope strongly negative, line falling). The $\Delta_\mathrm{r} H^\circ$ intercepts are large and nearly temperature-independent, so the lines are straight between phase changes, and every kink marks a melting or boiling point (the zinc line kinks up at zinc's $1180\ \mathrm{K}$ boil — the reason the smelter runs hotter still and condenses the vapour).
:::

::: widget plot
f: -1204 + 0.221*x; -701 + 0.201*x; -221 - 0.179*x; -394
x: 0, 2500
y: -1600, 300
labels: \text{MgO}; \text{ZnO}; \text{CO}; \text{CO}_2
caption: Ellingham lines per mole of $\mathrm{O_2}$ (approximate constant-slope fits, $\Delta_\mathrm{r} G$ in $\mathrm{kJ}$, $x$ in K): $2\,\mathrm{Mg} + \mathrm{O_2} \to 2\,\mathrm{MgO}$, $\mathrm{2\,Zn} + \mathrm{O_2} \to \mathrm{2\,ZnO}$, $\mathrm{2\,C} + \mathrm{O_2} \to \mathrm{2\,CO}$ and $\mathrm{C} + \mathrm{O_2} \to \mathrm{CO_2}$. The CO line falls because it makes gas from gas-plus-solid and gains entropy; the metal lines rise. Zinc's line crosses CO at $1263\ \mathrm{K}$ — carbon reduces zinc oxide above that temperature, which is the blast furnace of zinc smelting — while MgO lies so far below the carbon lines that carbon cannot reduce it at any practical temperature. One route is electrolysis of molten $\mathrm{MgCl_2}$; another is the Pidgeon process, which reduces calcined dolomite with ferrosilicon under vacuum.
:::

::: proposition Reading a reduction from the diagram {#prop-ellingham-reading}
Carbon (as CO) reduces a metal oxide above the temperature where the metal's line crosses the CO line, and not below it; the crossover temperature is $T = (\Delta_\mathrm{r} H^\circ_\mathrm{oxide} - \Delta_\mathrm{r} H^\circ_\mathrm{CO})/(\Delta_\mathrm{r} S^\circ_\mathrm{oxide} - \Delta_\mathrm{r} S^\circ_\mathrm{CO})$ read from the two lines' intercepts and slopes. Below every crossover, the oxide of the *lower* line is the stronger oxide, and the metal below is the better oxygen-getter — which is the one-sentence version of the reactivity series, now quantitative and temperature-dependent.
:::

::: example Thermite: an $840\ \mathrm{kJ}$ reaction, $560\ \mathrm{kJ}$ per mole of $\mathrm{O_2}$ {#ex-thermite}
Given $\Delta_\mathrm{f} G^\circ(\mathrm{Al_2O_3}) = -1582$ and $\Delta_\mathrm{f} G^\circ(\mathrm{Fe_2O_3}) = -742\ \mathrm{kJ\,mol^{-1}}$, decide whether aluminium reduces hematite and estimate the heat released.
::: solution
$\mathrm{Fe_2O_3 + 2\,Al \to Al_2O_3 + 2\,Fe}$: $\Delta_\mathrm{r} G^\circ = -1582 - (-742) = -840\ \mathrm{kJ\,mol^{-1}}$ (and $\Delta_\mathrm{r} H^\circ = -1676 + 824 = -852\ \mathrm{kJ\,mol^{-1}}$). Both oxides are $\mathrm{M_2O_3}$, so $840\ \mathrm{kJ}$ is the gap for $1.5\ \mathrm{mol}$ of $\mathrm{O_2}$. On an Ellingham diagram, drawn per mole of $\mathrm{O_2}$, the vertical gap is $(2/3)\times 840 \approx 560\ \mathrm{kJ}$. The reaction is spontaneous at ordinary temperatures — and because almost all of the free-energy drop is enthalpy, the mixture, once lit by a magnesium ribbon, self-heats past iron's $1811\ \mathrm{K}$ melting point and pours out molten iron: railway welds without electricity. The same reading is why aluminium, silicon and manganese deoxidise steelmaking melts. Iron does not take oxygen from $\mathrm{Al_2O_3}$, and aluminium is never reduced by iron.
:::
:::

::: example Zinc in the blast furnace, aluminium in the electrolyser {#ex-zn-mg-smelting}
Using the Ellingham fits of the widget ($\mathrm{ZnO}$: $-701 + 0.201\,T$; CO: $-221 - 0.179\,T$, $\mathrm{kJ\,mol^{-1}}$ per $\mathrm{O_2}$), find the minimum temperature for carbon reduction of zinc oxide, and explain why aluminium cannot be made this way at any temperature.
::: solution
Set the lines equal: $-701 + 0.201\,T = -221 - 0.179\,T$ gives $0.380\,T = 480$, $T \approx 1263\ \mathrm{K}$ ($990\ \mathrm{^\circ C}$) — and industry runs hotter ($1200$–$1400\ \mathrm{^\circ C}$) because zinc boils at $1180\ \mathrm{K}$ and the reaction must also be *fast*; the zinc vapour is then swept into a condenser, and removing it pulls the equilibrium right (Le Chatelier, [[general-chemistry-2/chemical-equilibrium]]). The widget line $-1204 + 0.221\,T$ is magnesium, not aluminium: it meets CO only near $2500\ \mathrm{K}$. Per mole of $\mathrm{O_2}$, alumina is nearer $-1117 + 0.21\,T$ ($\Delta_\mathrm{f} H^\circ(\mathrm{Al_2O_3}) \approx -1676\ \mathrm{kJ\,mol^{-1}}$ covers $1.5\ \mathrm{mol}$ of $\mathrm{O_2}$), and carbon still does not reduce it in any practical furnace. Aluminium is won the way Davy glimpsed in 1807 — electrolytically. Dissolve purified $\mathrm{Al_2O_3}$ (from bauxite by the Bayer process) in a cryolite bath near $1220$–$1250\ \mathrm{K}$ ($1290\ \mathrm{K}$ is about the melting point of pure cryolite). The anode reaction that the cell actually runs, $2\,\mathrm{Al_2O_3} + 3\,\mathrm{C} \to 4\,\mathrm{Al} + 3\,\mathrm{CO_2}$, makes carbon dioxide, and its reversible voltage at bath temperature is about $1.2\ \mathrm{V}$. Practice is about $4.5\ \mathrm{V}$; the difference is resistance and anode overpotential. The Ellingham diagram does not just choose the reductant; it chooses the *industry*.
:::
:::

::: quiz
A Latimer row reads $\mathrm{A} \xrightarrow{\ 0.34\ } \mathrm{B} \xrightarrow{\ 0.92\ } \mathrm{C}$. What happens when B is dissolved in water?
- [x] B disproportionates to A and C, with $E^\circ_\mathrm{cell} = 0.58\ \mathrm{V}$.
- [ ] B is stable: both potentials are positive.
- [ ] B comproportionates A and C into itself.
- [ ] B reduces water to hydrogen, because $0.34 < 0.92$.
::: solution
The right-hand potential ($0.92$) exceeds the left-hand one ($0.34$), so B is unstable to disproportionation with $E^\circ_\mathrm{cell} = 0.92 - 0.34 = 0.58\ \mathrm{V}$ ($K \sim 10^{10}$ per electron transferred). Positivity of the individual potentials says nothing about the intermediate's stability — that question is decided only by the *difference* between neighbours. This is the copper row with different numbers.
:::
:::

## Where this leads

The four diagrams are the working vocabulary of every later chapter: the halogen Latimer rows and the chlorine oxyanion ladder in [[main-group/halogens-noble-gases]], the nitrogen and sulfur Frost landscapes in [[main-group/groups-15-16]], the extraction of sodium, magnesium and aluminium in [[main-group/hydrogen-s-block]] and [[main-group/groups-13-14]]. The quantitative machinery — the Nernst equation, $\Delta_\mathrm{r} G^\circ = -nFE^\circ$, concentration cells — is built in [[general-chemistry-2/electrochemistry-intro]] and sharpened in [[electrochemistry/cell-thermodynamics]]; the kinetic caveats (overpotential, passivation, corrosion cells) belong to [[electrochemistry/electrode-kinetics]] and [[electrochemistry/corrosion]]; and the free-energy algebra behind Ellingham is [[thermodynamics/free-energy]]. Industrial electrochemistry — chlor–alkali, aluminium, magnesium, water electrolysis — is [[electrochemistry/fuel-cells-electrolysis]].

::: history
The extraction chemistry of the electropositive elements begins with Davy's electrochemical beads of 1807 and reaches industrial form with the independent invention of the Hall–Héroult process in 1886 — a twenty-two-year-old in Ohio and a twenty-three-year-old in France, both dropping alumina into molten cryolite on the same principle, both right, and both spending the next decade litigating priority across the Atlantic. Henri Moissan's electric arc furnace (1890s) made the first high-temperature chemistry routine and won him the 1906 Nobel Prize; Hans Goldschmidt's thermite process (patented 1895) was already pouring molten iron from the oxide gap half a century before Harold Ellingham published, in 1944, the diagram that still sits open on metallurgists' desks. Marcel Pourbaix built his potential–pH maps at Brussels from the 1930s to fight corrosion in concrete and cooling water; the 1966 *Atlas d'Équilibres Électrochimiques* made them the corrosion engineer's scripture. Wendell M. Latimer's *The Oxidation States of the Elements and Their Potentials in Aqueous Solutions* (second edition, 1952) organised the element-by-element potential data into the rows this chapter reads, and Arthur A. Frost's 1951 plot — free energy as a landscape, stability as a valley — gave the same numbers their geometric meaning.
:::

::: summary
- A standard potential is a free energy per electron: Latimer potentials combine by the weighted average $E^\circ = \sum n_i E_i/\sum n_i$, never by arithmetic mean.
- An intermediate oxidation state disproportionates exactly when the Latimer potential to its right exceeds the one to its left; $K$ follows from $\log K = nE^\circ/0.059\ \mathrm{V}$.
- Frost diagrams turn the same numbers into a landscape: low means stable, above-the-chord means doomed to disproportionate, slope means oxidising power.
- Pourbaix diagrams add pH: boundaries slope at $-0.059\,m/z$ volts per pH unit, water's own $\mathrm{H_2}$ and $\mathrm{O_2}$ lines fence the map, and everything outside is thermodynamically dead in water.
- Ellingham lines are free energies per mole of $\mathrm{O_2}$; their slopes are gas entropies, their crossovers are smelting temperatures, and the lowest line is the strongest oxide.
- Carbon reduces an oxide above the CO crossover (zinc at about $1260\ \mathrm{K}$); below it only electrolysis works (aluminium, magnesium, sodium) — the diagram chooses the industrial process.
- Every diagram is equilibrium: passivation, overpotential and slow kinetics (peroxide on the shelf, nitrate in the fertiliser bag) are the reasons the map and the territory differ.
:::

## Exercises

::: exercise Weighted averages {level=1 check="1.69"}
Using the manganese Latimer diagram of this lesson, calculate $E^\circ(\mathrm{MnO_4^- / MnO_2})$ in volts, to two decimal places.
::: solution
The path takes $1 + 2 = 3$ electrons: $E^\circ = (1 \times 0.56 + 2 \times 2.26)/3 = 5.08/3 = 1.69\ \mathrm{V}$.
:::
:::

::: exercise Disproportionation or not? {level=1}
The iron row in acid is $\mathrm{Fe^{3+}} \xrightarrow{\ 0.771\ } \mathrm{Fe^{2+}} \xrightarrow{\ -0.44\ } \mathrm{Fe}$. Does $\mathrm{Fe^{2+}}$ disproportionate? Does iron metal comproportionate $\mathrm{Fe^{2+}}$ and $\mathrm{Fe^{3+}}$?
::: solution
$\mathrm{Fe^{2+}}$: right $(-0.44) <$ left $(0.771)$, so no disproportionation — iron(II) is stable in deaerated water (until oxygen gets it: $E^\circ(\mathrm{O_2/H_2O}) = 1.23 > 0.771$). The inequality reversed is the comproportionation criterion, and it holds: $\mathrm{Fe + 2\,Fe^{3+} \to 3\,Fe^{2+}}$ with $E^\circ = 0.771 - (-0.44) = 1.21\ \mathrm{V}$ for two electrons, $K \sim 10^{41}$ — which is why iron filings are the standard way to strip $\mathrm{Fe^{3+}}$ out of a solution and why rusted steel in ferric chloride eats itself.
:::
:::

::: exercise Read the furnace {level=1}
From the Ellingham lines of this lesson's widget, answer yes or no with one-line reasons: (a) can CO reduce $\mathrm{MgO}$ at $2000\ \mathrm{K}$? (b) can C reduce $\mathrm{ZnO}$ at $1500\ \mathrm{K}$? (c) why does the CO line fall while the metal-oxide lines rise?
::: solution
(a) No — the MgO line ($-762\ \mathrm{kJ}$ at $2000\ \mathrm{K}$) lies far below CO ($-579\ \mathrm{kJ}$): MgO is the stronger oxide at any reachable temperature. (b) Yes — above the $1263\ \mathrm{K}$ crossover the CO line is below ZnO's, so CO (and carbon behind it) wins the oxygen. (c) Slope is $-\Delta_\mathrm{r} S$: $\mathrm{2\,C + O_2 \to 2\,CO}$ turns one mole of gas into two, so $\Delta_\mathrm{r} S > 0$ and the line falls with temperature; metal-oxide lines consume gas ($\Delta_\mathrm{r} S < 0$) and rise.
:::
:::

::: exercise Peroxide's equilibrium {level=2}
For $2\,\mathrm{H_2O_2 (aq)} \to 2\,\mathrm{H_2O (l)} + \mathrm{O_2 (g)}$, compute $E^\circ_\mathrm{cell}$ and $K$ from the oxygen Latimer row, and state what concentration of peroxide could stand at equilibrium against air at $1\ \mathrm{atm}$ of $\mathrm{O_2}$.
::: solution
$E^\circ = 1.776 - 0.695 = 1.081\ \mathrm{V}$, $n = 2$: $\log K = 2 \times 1.081/0.0592 = 36.5$, $K \approx 3\times10^{36}$. At equilibrium with $p(\mathrm{O_2}) = 1\ \mathrm{atm}$, $[\mathrm{H_2O_2}]^2 = 1/K$ gives $[\mathrm{H_2O_2}] \sim 10^{-18}\ \mathrm{mol\,dm^{-3}}$: a bottled $3\ \%$ solution ($\approx 0.9\ \mathrm{mol\,dm^{-3}}$) is about eighteen orders of magnitude above that equilibrium concentration ($0.9/10^{-18}$). The constant $K \sim 10^{36}$ is the square of the concentration ratio, because $K = 1/[\mathrm{H_2O_2}]^2$ when $p(\mathrm{O_2}) = 1$. Peroxide is a kinetically trapped fuel, and every bottle is a small time bomb whose fuse is catalase.
:::
:::

::: exercise A Pourbaix slope {level=2 check="-0.095"}
The boundary $\mathrm{MnO_4^- / Mn^{2+}}$ on a Pourbaix diagram corresponds to $\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$. Give its slope in volts per pH unit, to three decimal places.
::: solution
Slope $= -0.0592 \times m/z = -0.0592 \times 8/5 = -0.095\ \mathrm{V}$ per pH unit — one of the steepest common boundaries, which is why permanganate's oxidising power collapses as the solution is neutralised.
:::
:::

::: exercise Frost geometry {level=2}
For chlorine in acid the cumulative $nE^\circ$ values are $0$ at $\mathrm{Cl_2}$ (oxidation number 0), $1.63$ at $\mathrm{HOCl}$ (+1), $4.91$ at $\mathrm{HClO_2}$ (+3) and $7.28$ at $\mathrm{ClO_3^-}$ (+5). (a) Find the three segment slopes and identify them. (b) Test $\mathrm{HOCl}$ against the chord to $\mathrm{HClO_2}$ and against the chord to $\mathrm{ClO_3^-}$: which disproportionations are allowed, and which one is the slow decay of bleach?
::: solution
(a) Slopes: $\mathrm{Cl_2 \to HOCl}$: $1.63$; $\mathrm{HOCl \to HClO_2}$: $(4.91 - 1.63)/2 = 1.64$; $\mathrm{HClO_2 \to ClO_3^-}$: $(7.28 - 4.91)/2 = 1.19$ — the Latimer potentials $E(\mathrm{HOCl/Cl_2})$, $E(\mathrm{HClO_2/HOCl})$, $E(\mathrm{ClO_3^-/HClO_2})$. (b) Adjacent chord $\mathrm{Cl_2}$–$\mathrm{HClO_2}$ at oxidation number 1 stands at $4.91/3 = 1.64$, just *above* $\mathrm{HOCl}$'s $1.63$: the point is below the chord, so $\mathrm{HOCl \to Cl_2 + HClO_2}$ is forbidden (the two potentials differ by only $0.01\ \mathrm{V}$ — hypochlorous acid is nearly, but not quite, stable to that path). The long chord $\mathrm{Cl_2}$–$\mathrm{ClO_3^-}$ at oxidation number 1 stands at $7.28/5 = 1.46$, *below* $1.63$: $\mathrm{HOCl}$ sits above it, so disproportionation toward $\mathrm{Cl_2}$ and $\mathrm{ClO_3^-}$ is allowed, with $E^\circ_\mathrm{cell} = 1.63 - 1.46 = 0.17\ \mathrm{V}$. The figure $1.63 - 1.41 = 0.22\ \mathrm{V}$ does not belong to $3\,\mathrm{HOCl} \to \mathrm{ClO_3^-} + 2\,\mathrm{Cl^-} + 3\,\mathrm{H^+}$: that stoichiometry runs $\mathrm{HOCl}$ down to chloride ($E^\circ(\mathrm{HOCl/Cl^-}) \approx 1.49\ \mathrm{V}$) against $E^\circ(\mathrm{ClO_3^-/HOCl}) \approx 1.41\ \mathrm{V}$, so the cell is about $0.08\ \mathrm{V}$, and $K$ is nothing like $10^{15}$. Alkaline $3\,\mathrm{OCl^-} \to \mathrm{ClO_3^-} + 2\,\mathrm{Cl^-}$ is still allowed; commercial bleach lasts because the reaction is slow. Lesson: test every chord, and use the couple the chord actually names.
:::
:::

::: exercise Derive the criterion {level=3}
Starting from $\Delta_\mathrm{r} G^\circ = -nFE^\circ$, derive (i) the weighted-average rule for a three-step Latimer row and (ii) the disproportionation criterion $E^\circ_\mathrm{right} > E^\circ_\mathrm{left}$, showing in (ii) that the result is independent of how the half-reactions are scaled.
::: solution
(i) For steps $1,2,3$ with $n_1,n_2,n_3$: $\Delta_\mathrm{r} G^\circ_\mathrm{total} = -F(n_1E_1 + n_2E_2 + n_3E_3)$ and also $= -(n_1+n_2+n_3) F E^\circ_\mathrm{total}$; equate and divide by $-F\sum n_i$. (ii) Disproportionation of B: reduction $\mathrm{B \to C}$ ($n_\mathrm{r}$ electrons, $E_\mathrm{right}$) coupled to oxidation $\mathrm{B \to A}$ ($n_\mathrm{l}$ electrons reversed, $E_\mathrm{left}$). Balancing electrons multiplies the half-equations by $n_\mathrm{l}$ and $n_\mathrm{r}$: $\Delta_\mathrm{r} G^\circ = -n_\mathrm{l} n_\mathrm{r} F E_\mathrm{right} + n_\mathrm{l} n_\mathrm{r} F E_\mathrm{left} = -n_\mathrm{l} n_\mathrm{r} F (E_\mathrm{right} - E_\mathrm{left})$. The sign — and therefore the criterion — is untouched by scaling (which is why potentials, unlike free energies, may be multiplied through a half-equation without changing anything), and $\Delta_\mathrm{r} G^\circ < 0$ iff $E_\mathrm{right} > E_\mathrm{left}$.
:::
:::

::: exercise Smelter arithmetic {level=3 check="1263"}
Take the Ellingham fits $\Delta_\mathrm{r} G^\circ(\mathrm{ZnO}) = -701 + 0.201\,T$ and $\Delta_\mathrm{r} G^\circ(\mathrm{CO}) = -221 - 0.179\,T$ ($\mathrm{kJ\,mol^{-1}}$ per mole of $\mathrm{O_2}$). Find the crossover temperature in kelvin, to three significant figures, and explain in one sentence why the industrial retort runs near $1400\ \mathrm{^\circ C}$ rather than at the crossover.
::: solution
$-701 + 0.201\,T = -221 - 0.179\,T \Rightarrow 0.380\,T = 480 \Rightarrow T = 1263\ \mathrm{K}$. Industry runs hotter because at the crossover the rate is zero by definition of equilibrium: the extra heat buys a fast reaction, keeps zinc above its boiling point so the vapour distils away from the slag, and lets the condenser's dilution pull the equilibrium past $100\ \%$ conversion.
:::
:::
