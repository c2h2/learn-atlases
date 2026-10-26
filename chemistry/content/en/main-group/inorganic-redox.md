Redox is the second half of inorganic chemistry's grammar, and like the first half it is really thermodynamics wearing a different uniform. Every standard potential is a free energy in disguise ($\Delta_\mathrm{r} G^\circ = -nFE^\circ$), and every stability question — will this ion disproportionate, will this ore yield its metal, will this compound survive in water — becomes a comparison of slopes and line positions on one of four diagrams. This chapter teaches those four charts: the **Latimer diagram** of potentials between adjacent oxidation states, the **Frost diagram** that turns them into a convex-hull picture of stability, the **Pourbaix diagram** that adds pH, and the **Ellingham diagram** that decides which element gets to keep the oxygen. The mathematics is linear — straight lines, weighted averages, one slope formula — and the reward is that you stop memorising reactions and start reading them off.

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
The acid Latimer row for gold is $\mathrm{Au^{3+}} \xrightarrow{\ 1.40\ } \mathrm{Au^+} \xrightarrow{\ 1.69\ } \mathrm{Au}$. Find $E^\circ(\mathrm{Au^{3+}/Au})$, decide whether $\mathrm{Au^+}$ survives in water, and explain how air can dissolve gold in the alkaline cyanide leach used in mining, given $E^\circ(\mathrm{[Au(CN)_2]^-/Au}) = -0.60\ \mathrm{V}$.
::: solution
$E^\circ(\mathrm{Au^{3+}/Au}) = (2 \times 1.40 + 1 \times 1.69)/3 = 1.50\ \mathrm{V}$. For $\mathrm{Au^+}$ the potential *to its right* (1.69) exceeds the potential *to its left* (1.40), and the criterion of the next section says it disproportionates: $3\,\mathrm{Au^+} \to \mathrm{Au^{3+}} + 2\,\mathrm{Au}$, with $E^\circ_\mathrm{cell} = 1.69 - 1.40 = 0.29\ \mathrm{V}$ for two electrons and $K \approx 10^{10}$. Simple aqueous gold(I) does not survive; gold(I) exists only when ligands stabilise it.

Cyanide is such a ligand, and it changes everything. Binding $\mathrm{Au^+}$ as the very stable $\mathrm{[Au(CN)_2]^-}$ lowers the $\mathrm{Au(I)/Au}$ potential from $+1.69$ to $-0.60\ \mathrm{V}$. The leach is run at pH about 10.5 (to keep cyanide as $\mathrm{CN^-}$ rather than volatile, highly toxic HCN), so the relevant oxygen potential is not the pH-0 value of $1.23\ \mathrm{V}$ but, from the Nernst equation with air ($p_{\mathrm{O_2}} = 0.21\ \mathrm{bar}$),
$$
E(\mathrm{O_2/OH^-}) = 1.229 - 0.0592\,\mathrm{pH} + \tfrac{0.0592}{4}\log_{10} 0.21 = 1.229 - 0.622 - 0.010 = 0.60\ \mathrm{V}.
$$
The cell $4\,\mathrm{Au} + 8\,\mathrm{CN^-} + \mathrm{O_2} + 2\,\mathrm{H_2O} \rightarrow 4\,\mathrm{[Au(CN)_2]^-} + 4\,\mathrm{OH^-}$ therefore has a driving force of about $0.60 - (-0.60) = 1.2\ \mathrm{V}$ (less in practice, because cyanide is dilute), ample to dissolve the metal. Raising the pH costs the oxidant $0.059\ \mathrm{V}$ per unit, but complexation gains far more than that. Ligands move potentials by volts — the theme of the Pourbaix section below.
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
$E^\circ_\mathrm{cell} = 0.521 - 0.153 = 0.368\ \mathrm{V}$ with $n = 1$: $\log K = 0.368/0.0592 = 6.2$, $K \approx 1.7\times10^{6}$. Aqueous $\mathrm{Cu^+}$ is a laboratory fiction at ordinary concentrations — add a soluble copper(I) salt to water and copper metal precipitates while the solution turns blue. The exceptions prove the rule's ligand dependence: solid $\mathrm{CuCl}$ survives because it is sparingly soluble ($K_\mathrm{sp} \approx 2\times10^{-7}$ keeps the free $\mathrm{Cu^+}$ concentration low), and $\mathrm{[Cu(CH_3CN)_4]^+}$ is stable in acetonitrile because that solvent binds copper(I) much more strongly than copper(II), which reverses the inequality. Dilute it with water and the copper(I) ends up as the aqua ion, which disproportionates. Precipitation and complexation are Le Chatelier's levers on a Latimer diagram.
:::
:::

::: example Hydrogen peroxide: thermodynamically dead, commercially bottled {#ex-h2o2-disprop}
From the acid row $\mathrm{O_2} \xrightarrow{\ 0.695\ } \mathrm{H_2O_2} \xrightarrow{\ 1.776\ } \mathrm{H_2O}$, decide whether $\mathrm{H_2O_2}$ disproportionates and estimate $K$ for $2\,\mathrm{H_2O_2 (aq)} \to 2\,\mathrm{H_2O (l)} + \mathrm{O_2 (g)}$.
::: solution
$1.776 > 0.695$, overwhelmingly: $E^\circ_\mathrm{cell} = 1.081\ \mathrm{V}$ for a two-electron process, $\log K = 2 \times 1.081/0.0592 \approx 36.5$, $K \sim 10^{36}$. Peroxide survives only because it is protected by kinetics: the electron transfers that make and break the weak $\mathrm{O{-}O}$ bond (about $210\ \mathrm{kJ\,mol^{-1}}$) are slow in clean solution, and the triplet ground state of $\mathrm{O_2}$ makes the elementary steps spin-awkward, so the reaction needs surfaces, light or catalase to happen at a human rate. Bottles hold stabilisers and sit in the dark; a drop of $\mathrm{MnO_2}$ or a haem enzyme and the same solution foams over in seconds. Thermodynamics writes the cheque; kinetics decides when it clears.
:::
:::

::: example Manganese(III) and manganate(VI): two textbook disproportionations {#ex-mn3-mno42}
Which of $\mathrm{Mn^{3+}}$ and $\mathrm{MnO_4^{2-}}$ disproportionate in water, according to the manganese Latimer diagram?
::: solution
Both. $\mathrm{Mn^{3+}}$: right $1.51 >$ left $0.95$, so $2\,\mathrm{Mn^{3+}} + 2\,\mathrm{H_2O} \to \mathrm{Mn^{2+}} + \mathrm{MnO_2} + 4\,\mathrm{H^+}$ with $E^\circ = 0.56\ \mathrm{V}$, $K \sim 10^{9}$ — aqueous $\mathrm{Mn^{3+}}$ survives only in strongly acidic solution or as complexes. $\mathrm{MnO_4^{2-}}$: right $2.26 >$ left $0.56$, so $3\,\mathrm{MnO_4^{2-}} + 4\,\mathrm{H^+} \to 2\,\mathrm{MnO_4^-} + \mathrm{MnO_2} + 2\,\mathrm{H_2O}$: the green manganate made by fusing $\mathrm{MnO_2}$ with alkali turns purple, with a brown precipitate, when the melt is dissolved and the solution is acidified or even just diluted. Disproportionation does make permanganate, but it wastes a third of the manganese as $\mathrm{MnO_2}$, so industry instead oxidises $\mathrm{Mn(VI)}$ to $\mathrm{Mn(VII)}$ electrolytically (or with chlorine), converting all of it. Notice the pH lever in the second equation: four protons per three manganates means the disproportionation is suppressed in strong base, which is exactly where green $\mathrm{MnO_4^{2-}}$ solutions are stable.
:::
:::

## Frost diagrams: stability as a landscape

::: definition The Frost (oxidation-state) diagram {#def-frost}
In a **Frost diagram** plot $nE^\circ$ against oxidation number. Formation of the state from the element has $\Delta_\mathrm{f} G^\circ = +nFE^\circ$, so the ordinate is $nE^\circ = \Delta_\mathrm{f} G^\circ/F$, a free-energy scale in volt-units ("volt-equivalents"), where $n$ is the oxidation number of the state and $E^\circ$ the potential of the couple between that state and the element. The element sits at the origin; each state's height is the free energy of forming it from the element. Consequences read off the geometry: **the lower a point, the more stable the state** overall; **a point lying above the line joining its neighbours disproportionates** into them (the line is the two-product mixture, the point is the single species); and **the slope of the segment between two states is their mutual Latimer potential** — steeper (more positive) slope means the higher state is a stronger oxidant.
:::

::: example Copper on a Frost diagram {#ex-cu-frost}
For copper the points are $\mathrm{Cu}\ (0,\ 0)$, $\mathrm{Cu^+}\ (1,\ 0.52)$, $\mathrm{Cu^{2+}}\ (2,\ 0.68)$. Where does $\mathrm{Cu^+}$ sit relative to the $\mathrm{Cu}$–$\mathrm{Cu^{2+}}$ line, and what does the diagram say about oxidising copper metal in air?
::: solution
The $\mathrm{Cu}$–$\mathrm{Cu^{2+}}$ chord at oxidation number 1 stands at $0.68/2 = 0.34$, below $\mathrm{Cu^+}$'s $0.52$: the point is above the chord, so $\mathrm{Cu^+}$ disproportionates — the same verdict as the Latimer criterion, now visible as a bend in a landscape. The slopes tell the rest: $\mathrm{Cu \to Cu^+}$ has slope $0.52$ and $\mathrm{Cu^+ \to Cu^{2+}}$ slope $0.15$, so air ($1.23\ \mathrm{V}$) can climb the whole hill from $\mathrm{Cu}$ to $\mathrm{Cu^{2+}}$ — copper dissolves slowly in aerated acid — but the hydrogen ion ($0.00\ \mathrm{V}$) cannot even start, which is why copper does not dissolve in dilute hydrochloric acid with air excluded. In the open air copper corrodes slowly to a green patina of basic copper sulfates and carbonates; the copper skin of the Statue of Liberty (erected 1886) had turned green within about twenty to thirty years.
:::
:::

Frost diagrams shine when an element has many states. The manganese diagram below is the Latimer row of this chapter redrawn; read it with the three rules above.

::: widget plot
f: -1.18*x + 2.69*((x-2)+abs(x-2))/2 - 0.56*((x-3)+abs(x-3))/2 + 1.31*((x-4)+abs(x-4))/2 - 1.70*((x-6)+abs(x-6))/2; -1.18*x + 2.41*((x-2)+abs(x-2))/2 + 0.4633*((x-4)+abs(x-4))/2
x: 0, 7.2
y: -3, 6
points: 0,0; 2,-2.36; 3,-0.85; 4,0.10; 6,4.62; 7,5.18
labels: \text{Frost diagram, Mn, pH 0}; \text{lower convex hull}
caption: Frost diagram of manganese in acid ($x$ is the oxidation number; $y$ is $nE^\circ$ in volts), built from the Latimer row $\mathrm{MnO_4^-}\ (0.56)\ \mathrm{MnO_4^{2-}}\ (2.26)\ \mathrm{MnO_2}\ (0.95)\ \mathrm{Mn^{3+}}\ (1.51)\ \mathrm{Mn^{2+}}\ (-1.18)\ \mathrm{Mn}$: the points are $\mathrm{Mn}\ (0, 0)$, $\mathrm{Mn^{2+}}\ (2, -2.36)$, $\mathrm{Mn^{3+}}\ (3, -0.85)$, $\mathrm{MnO_2}\ (4, 0.10)$, $\mathrm{MnO_4^{2-}}\ (6, 4.62)$ and $\mathrm{MnO_4^-}\ (7, 5.18)$. The second line is the lower convex hull — the lowest path joining the points. $\mathrm{Mn^{2+}}$ is the deepest point, the most stable state in acid. $\mathrm{Mn^{3+}}$ and $\mathrm{MnO_4^{2-}}$ lie *above* the hull, so each disproportionates into its neighbours on it ($\mathrm{Mn^{2+}} + \mathrm{MnO_2}$, and $\mathrm{MnO_2} + \mathrm{MnO_4^-}$), exactly as [[#ex-mn3-mno42]] found. The steep segments climbing to the right are the strong oxidants: the slope from $\mathrm{Mn^{2+}}$ to $\mathrm{MnO_4^-}$, $(5.18 + 2.36)/5 = 1.51\ \mathrm{V}$, is the permanganate potential.
:::

Nitrogen gives a contrasting picture: in acid, $\mathrm{N_2}$ at the origin is near the bottom of its diagram, while $\mathrm{NO}$, $\mathrm{NO_2^-}$ and $\mathrm{NO_3^-}$ lie high on the right. Nitrate is therefore thermodynamically a strong oxidant, eager to fall toward $\mathrm{N_2}$ — yet nitrate solutions are inert toward most reductants at room temperature, because the reduction needs several electron and oxygen-atom transfers with high barriers. Nitrogen chemistry is a story in which kinetics constantly overrides the Frost diagram.

## Pourbaix diagrams: the potential–pH map

::: definition The Pourbaix diagram {#def-pourbaix}
A **Pourbaix diagram** maps the stable species of an element in water as a field diagram in the plane of $E$ (vertical) and $\mathrm{pH}$ (horizontal), at fixed temperature and total dissolved concentration. Boundaries come in three shapes, all from the Nernst equation $E = E^\circ - (0.059/z) \log Q$ at $298\ \mathrm{K}$: **vertical** lines where no electrons move (acid–base changes such as hydrolysis $\mathrm{M^{n+} \to MOH^{(n-1)+}}$), **horizontal** lines where no protons move (pure redox, e.g. $\mathrm{Fe^{3+}/Fe^{2+}}$), and **sloped** lines with
$$
\frac{\mathrm{d}E}{\mathrm{d}\,\mathrm{pH}} = -0.059 \times \frac{m}{z}\ \mathrm{V}
$$
for a half-reaction consuming $m$ protons per $z$ electrons. Water itself frames the map: above $E = 1.23 - 0.059\,\mathrm{pH}$ it gives up $\mathrm{O_2}$, below $E = -0.059\,\mathrm{pH}$ it gives up $\mathrm{H_2}$, and the band between, $1.23\ \mathrm{V}$ wide at every pH, is where water itself is thermodynamically stable.
:::

::: example The slope of the permanganate line {#ex-mno4-line}
Find the slope of the $\mathrm{MnO_4^- / MnO_2}$ boundary on a Pourbaix diagram, and explain why permanganate oxidations are run in acid.
::: solution
The half-reaction $\mathrm{MnO_4^- + 4\,H^+ + 3\,e^- \to MnO_2 + 2\,H_2O}$ consumes $m = 4$ protons per $z = 3$ electrons: slope $= -0.059 \times 4/3 = -0.079\ \mathrm{V}$ per pH unit. The potential falls steeply as the solution becomes basic — at $\mathrm{pH}\ 14$ the line has dropped $1.1\ \mathrm{V}$ from its acid value — because the oxidant *is* partly the proton: removing $\mathrm{H^+}$ pulls the reaction left. That is why permanganate titrations are acidified, and why the same reagent stops at $\mathrm{MnO_2}$ in neutral solution but runs to $\mathrm{Mn^{2+}}$ in acid. The same proton dependence explains the warning on bleach bottles. Household bleach contains hypochlorite together with about as much chloride. Acidifying it first converts $\mathrm{OCl^-}$ to $\mathrm{HOCl}$ ($\mathrm{p}K_\mathrm{a} = 7.5$) and then drives the comproportionation
$$
\mathrm{HOCl + H^+ + Cl^- \rightleftharpoons Cl_2(aq) + H_2O},
$$
the reverse of chlorine hydrolysis, whose constant $K_\mathrm{hyd} = [\mathrm{HOCl}][\mathrm{H^+}][\mathrm{Cl^-}]/[\mathrm{Cl_2}]$ is about $4\times10^{-4}$ at $25\ \mathrm{^\circ C}$. With $[\mathrm{Cl^-}] \approx 0.7\ \mathrm{mol\,dm^{-3}}$ the ratio $[\mathrm{Cl_2}]/[\mathrm{HOCl}] = [\mathrm{H^+}][\mathrm{Cl^-}]/K_\mathrm{hyd}$ is about $0.02$ at pH 5 and reaches 1 near pH 3.2. Because the bleach is concentrated, even the pH-5 figure means a dangerous concentration of dissolved chlorine and an equilibrium chlorine pressure of the order of a tenth of a bar above the liquid: mixing bleach with an acidic cleaner releases toxic chlorine gas.
:::
:::

::: widget plot
f: 1.229 - 0.0592*x; -0.0592*x; 1.695 - 0.0789*x; 1.507 - 0.0947*x
x: 0, 14
y: -1, 2
labels: \mathrm{O_2/H_2O}; \mathrm{H^+/H_2}; \mathrm{MnO_4^-/MnO_2}; \mathrm{MnO_4^-/Mn^{2+}}
caption: Potential (V against SHE) against pH for water's two boundaries and two permanganate couples, all species at unit activity apart from $\mathrm{H^+}$ ($p = 1\ \mathrm{bar}$ for the gases). Between the top two water lines lies the stability region of water. Both permanganate lines lie *above* the $\mathrm{O_2}$ line at every pH: permanganate is thermodynamically able to oxidise water to oxygen, and its solutions survive only because that reaction is slow (it is catalysed by light and by $\mathrm{MnO_2}$, which is why standard solutions are kept dark and filtered). The slopes are $-0.059\,m/z$: $-0.059$ for water ($m = z$), $-0.079$ for $\mathrm{MnO_4^-/MnO_2}$ ($4/3$) and $-0.095$ for $\mathrm{MnO_4^-/Mn^{2+}}$ ($8/5$). (A full Pourbaix diagram would cut the $\mathrm{Mn^{2+}}$ line where $\mathrm{Mn^{2+}}$ stops being the stable reduced form, near neutral pH.)
:::

::: example Why sodium floats and fizzes {#ex-water-window}
Place sodium metal and water on the same Pourbaix map and read off the reaction.
::: solution
The $\mathrm{Na^+/Na}$ line is flat (no protons) at $-2.71\ \mathrm{V}$, far below the $\mathrm{H_2O/H_2}$ boundary ($-0.059\,\mathrm{pH}$, i.e. $-0.41\ \mathrm{V}$ at pH 7 and $-0.83\ \mathrm{V}$ at pH 14). The metal's field therefore lies entirely below the hydrogen line, at every pH: sodium metal has no region of stability in contact with water, and it reduces water wherever it meets it. For the standard alkaline reaction $\mathrm{Na + H_2O \to Na^+ + \tfrac12 H_2 + OH^-}$, using the $-0.83\ \mathrm{V}$ couple $\mathrm{H_2O/H_2,OH^-}$, $E^\circ_\mathrm{cell} = -0.83 - (-2.71) = 1.88\ \mathrm{V}$ and $\log K = 1.88/0.0592 \approx 32$ ($n = 1$). The hydrogen line is the floor on what can exist in water at low potential, and it is why the most electropositive metals — Li, Na, Ca, Al and much of the world's Mg — are extracted electrolytically from molten salts, away from any proton source.
:::
:::

::: warning Pourbaix diagrams are thermodynamic, and water is not the whole story {#warn-passivation}
Three caveats before you trust a field boundary. (i) The diagrams assume equilibrium, and their labels need careful reading. A metal's **immunity** field is where the metal itself is the stable phase; for aluminium that lies far below the hydrogen line, so aluminium is thermodynamically unstable in water at every pH. Between about pH 4 and 9 the stable phase is the hydrated oxide, and this is a **passivation** field: the metal survives there only because a thin, insoluble oxide film separates it from the water. Scratch the film, or add chloride, which attacks it locally and causes pitting (one reason aluminium suffers in seawater), and the underlying instability shows. (ii) The water window is thermodynamic too: $\mathrm{O_2}$ and $\mathrm{H_2}$ evolution need overpotentials of hundreds of millivolts (electrode kinetics, [[electrochemistry/electrode-kinetics]]), which is why you can electrolyse brine to chlorine instead of oxygen and why aluminium smelting works at all. (iii) Boundary positions shift with total concentration (the diagrams are drawn for, say, $10^{-3}\ \mathrm{mol\,dm^{-3}}$ total metal) and with complexing agents: cyanide, ammonia or fluoride can move a metal's fields by volts.
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
caption: Ellingham lines per mole of $\mathrm{O_2}$ (approximate constant-slope fits, $\Delta_\mathrm{r} G$ in $\mathrm{kJ}$, $x$ in K): $2\,\mathrm{Mg} + \mathrm{O_2} \to 2\,\mathrm{MgO}$, $\mathrm{2\,Zn} + \mathrm{O_2} \to \mathrm{2\,ZnO}$, $\mathrm{2\,C} + \mathrm{O_2} \to \mathrm{2\,CO}$ and $\mathrm{C} + \mathrm{O_2} \to \mathrm{CO_2}$. The CO line falls because the reaction makes two moles of gas from one and gains entropy; the metal lines rise because they consume gas. (The fits ignore phase changes: the real zinc and magnesium lines bend upward above the metals' boiling points, $1180$ and $1363\ \mathrm{K}$.) Zinc's line crosses CO at $1263\ \mathrm{K}$, so carbon reduces zinc oxide above that temperature — the basis of zinc smelting — while the MgO line lies so far below the carbon lines that it meets the CO line only near $2500\ \mathrm{K}$. Magnesium is therefore made either by electrolysis of molten $\mathrm{MgCl_2}$ or by the Pidgeon process, which reduces calcined dolomite with ferrosilicon under vacuum, continually removing magnesium vapour.
:::

::: proposition Reading a reduction from the diagram {#prop-ellingham-reading}
Carbon (as CO) reduces a metal oxide above the temperature where the metal's line crosses the CO line, and not below it; the crossover temperature is $T = (\Delta_\mathrm{r} H^\circ_\mathrm{oxide} - \Delta_\mathrm{r} H^\circ_\mathrm{CO})/(\Delta_\mathrm{r} S^\circ_\mathrm{oxide} - \Delta_\mathrm{r} S^\circ_\mathrm{CO})$ read from the two lines' intercepts and slopes. Below every crossover, the oxide of the *lower* line is the stronger oxide, and the metal below is the better oxygen-getter — which is the one-sentence version of the reactivity series, now quantitative and temperature-dependent.
:::

::: example Thermite: an $840\ \mathrm{kJ}$ reaction, $560\ \mathrm{kJ}$ per mole of $\mathrm{O_2}$ {#ex-thermite}
Given $\Delta_\mathrm{f} G^\circ(\mathrm{Al_2O_3}) = -1582$ and $\Delta_\mathrm{f} G^\circ(\mathrm{Fe_2O_3}) = -742\ \mathrm{kJ\,mol^{-1}}$, decide whether aluminium reduces hematite and estimate the heat released.
::: solution
$\mathrm{Fe_2O_3 + 2\,Al \to Al_2O_3 + 2\,Fe}$: $\Delta_\mathrm{r} G^\circ = -1582 - (-742) = -840\ \mathrm{kJ\,mol^{-1}}$ (and $\Delta_\mathrm{r} H^\circ = -1676 + 824 = -852\ \mathrm{kJ\,mol^{-1}}$). Both oxides are $\mathrm{M_2O_3}$, so $840\ \mathrm{kJ}$ is the gap for $1.5\ \mathrm{mol}$ of $\mathrm{O_2}$. On an Ellingham diagram, drawn per mole of $\mathrm{O_2}$, the vertical gap between the two lines is $(2/3)\times 840 \approx 560\ \mathrm{kJ}$. The reaction is spontaneous at ordinary temperatures — and because almost all of the free-energy drop is enthalpy, the mixture, once lit by a magnesium ribbon, heats itself past iron's $1811\ \mathrm{K}$ melting point and produces molten iron: railway welds without electricity. The same reading explains why aluminium, silicon and manganese are used to remove dissolved oxygen from molten steel, and why the reverse — iron reducing alumina — never happens.
:::
:::

::: example Zinc in the blast furnace, aluminium in the electrolyser {#ex-zn-mg-smelting}
Using the Ellingham fits of the widget ($\mathrm{ZnO}$: $-701 + 0.201\,T$; CO: $-221 - 0.179\,T$, $\mathrm{kJ\,mol^{-1}}$ per $\mathrm{O_2}$), find the minimum temperature for carbon reduction of zinc oxide, and explain why aluminium is not made this way.
::: solution
Set the lines equal: $-701 + 0.201\,T = -221 - 0.179\,T$ gives $0.380\,T = 480$, $T \approx 1263\ \mathrm{K}$ ($990\ \mathrm{^\circ C}$) — and industry runs hotter ($1200$–$1400\ \mathrm{^\circ C}$) because zinc boils at $1180\ \mathrm{K}$ and the reaction must also be *fast*; the zinc vapour is then swept into a condenser, and removing it pulls the equilibrium right (Le Chatelier, [[general-chemistry-2/chemical-equilibrium]]). For aluminium, per mole of $\mathrm{O_2}$, the same kind of fit is $-1117 + 0.209\,T$ (from $\Delta_\mathrm{f} H^\circ(\mathrm{Al_2O_3}) = -1676\ \mathrm{kJ\,mol^{-1}}$ for $1.5\ \mathrm{mol}$ of $\mathrm{O_2}$, and the corresponding entropy change). It meets the CO line only at $T = 896/0.388 \approx 2300\ \mathrm{K}$, and at such temperatures carbon and alumina form aluminium carbide and oxycarbides rather than clean metal; carbothermal aluminium has been studied for decades without becoming an industrial process. Aluminium is won electrolytically, in the tradition Davy began in 1807 with sodium and potassium. Purified $\mathrm{Al_2O_3}$ (from bauxite by the Bayer process) is dissolved in molten cryolite with added $\mathrm{AlF_3}$, which lowers the operating temperature to about $1230\ \mathrm{K}$ (pure cryolite melts near $1285\ \mathrm{K}$). Aluminium is deposited at the cathode, $\mathrm{Al^{3+}} + 3\,e^- \rightarrow \mathrm{Al}$ (the aluminium is really present as fluoro-complexes), and the carbon anode is consumed, $\mathrm{C} + 2\,\mathrm{O^{2-}} \rightarrow \mathrm{CO_2} + 4\,e^-$ (the oxide is present as oxyfluoride complexes). The overall cell reaction is $2\,\mathrm{Al_2O_3} + 3\,\mathrm{C} \rightarrow 4\,\mathrm{Al} + 3\,\mathrm{CO_2}$, whose reversible voltage at bath temperature is about $1.2\ \mathrm{V}$; the carbon anode lowers it well below the roughly $2.2\ \mathrm{V}$ needed to split alumina into aluminium and oxygen. Real cells run at about $4$–$4.5\ \mathrm{V}$, the difference being ohmic resistance of the bath and electrode overpotentials. The Ellingham diagram does not just choose the reductant; it chooses the *industry*.
:::
:::

::: quiz
A Latimer row reads $\mathrm{A} \xrightarrow{\ 0.34\ } \mathrm{B} \xrightarrow{\ 0.92\ } \mathrm{C}$. What happens when B is dissolved in water?
- [x] B disproportionates to A and C, with $E^\circ_\mathrm{cell} = 0.58\ \mathrm{V}$.
- [ ] B is stable: both potentials are positive.
- [ ] B comproportionates A and C into itself.
- [ ] B reduces water to hydrogen, because $0.34 < 0.92$.
::: solution
The right-hand potential ($0.92$) exceeds the left-hand one ($0.34$), so B is unstable to disproportionation with $E^\circ_\mathrm{cell} = 0.92 - 0.34 = 0.58\ \mathrm{V}$ ($K \approx 10^{10}$ for a one-electron transfer). Positivity of the individual potentials says nothing about the intermediate's stability — that question is decided only by the *difference* between neighbours. This is the copper row with different numbers.
:::
:::

## Where this leads

The four diagrams are the working vocabulary of every later chapter: the halogen Latimer rows and the chlorine oxyanion ladder in [[main-group/halogens-noble-gases]], the nitrogen and sulfur Frost landscapes in [[main-group/groups-15-16]], the extraction of sodium, magnesium and aluminium in [[main-group/hydrogen-s-block]] and [[main-group/groups-13-14]]. The quantitative machinery — the Nernst equation, $\Delta_\mathrm{r} G^\circ = -nFE^\circ$, concentration cells — is built in [[general-chemistry-2/electrochemistry-intro]] and sharpened in [[electrochemistry/cell-thermodynamics]]; the kinetic caveats (overpotential, passivation, corrosion cells) belong to [[electrochemistry/electrode-kinetics]] and [[electrochemistry/corrosion]]; and the free-energy algebra behind Ellingham is [[thermodynamics/free-energy]]. Industrial electrochemistry — chlor–alkali, aluminium, magnesium, water electrolysis — is [[electrochemistry/fuel-cells-electrolysis]].

::: history
The extraction chemistry of the electropositive elements begins with Davy's electrochemical beads of 1807 and reaches industrial form with the independent invention of the Hall–Héroult process in 1886 — Charles Martin Hall, aged twenty-two, in Ohio and Paul Héroult, aged twenty-three, in France, both dissolving alumina in molten cryolite and electrolysing it. Héroult filed his patent first, but a US Patent Office interference was decided in Hall's favour because he could prove he had made aluminium earlier, in February 1886; Hall's patents governed the United States and Héroult's held in Europe. Henri Moissan's electric arc furnace (1890s) made the first high-temperature chemistry routine and won him the 1906 Nobel Prize; Hans Goldschmidt's thermite process (patented 1895) was already pouring molten iron from the oxide gap half a century before Harold Ellingham published, in 1944, the diagram that still sits open on metallurgists' desks. Marcel Pourbaix developed potential–pH diagrams in his 1945 doctoral thesis and then compiled them, element by element, in Brussels: the *Atlas d'Équilibres Électrochimiques* (1963; English translation, *Atlas of Electrochemical Equilibria in Aqueous Solutions*, 1966) became the corrosion engineer's standard reference. Wendell M. Latimer's *The Oxidation States of the Elements and Their Potentials in Aqueous Solutions* (second edition, 1952) organised the element-by-element potential data into the rows this chapter reads, and Arthur A. Frost's 1951 plot — free energy as a landscape, stability as a valley — gave the same numbers their geometric meaning.
:::

::: summary
- A standard potential is a free energy per electron: Latimer potentials combine by the weighted average $E^\circ = \sum n_i E_i/\sum n_i$, never by arithmetic mean.
- An intermediate oxidation state disproportionates exactly when the Latimer potential to its right exceeds the one to its left; $K$ follows from $\log K = nE^\circ/0.059\ \mathrm{V}$.
- Frost diagrams turn the same numbers into a landscape: low means stable, above-the-chord means doomed to disproportionate, slope means oxidising power.
- Pourbaix diagrams add pH: boundaries slope at $-0.059\,m/z$ volts per pH unit, and water's own $\mathrm{H_2}$ and $\mathrm{O_2}$ lines fence the region where water itself is stable; species whose fields lie outside it react with water, unless kinetics or a passivating film intervenes.
- Ellingham lines are free energies per mole of $\mathrm{O_2}$; their slopes are gas entropies, their crossovers are smelting temperatures, and the lowest line is the strongest oxide.
- Carbon reduces an oxide above the CO crossover (zinc at about $1260\ \mathrm{K}$); where the crossover is impractically high (aluminium, magnesium) or absent (sodium), electrolysis or a stronger reductant is used — the diagram chooses the industrial process.
- Every diagram is equilibrium: passivation, overpotential and slow kinetics (peroxide on the shelf, nitrate in the fertiliser bag) are the reasons the map and the territory differ.
:::

## Exercises

::: exercise Weighted averages {level=1 check="1.69"}
Using the manganese Latimer diagram of this lesson, calculate $E^\circ(\mathrm{MnO_4^- / MnO_2})$ in volts, to two decimal places.
::: solution
The path takes $1 + 2 = 3$ electrons: $E^\circ = (1 \times 0.56 + 2 \times 2.26)/3 = 5.08/3 = 1.69\ \mathrm{V}$.
:::
:::

::: exercise Disproportionation or not? {level=1 check="1.21"}
The iron row in acid is $\mathrm{Fe^{3+}} \xrightarrow{\ 0.771\ } \mathrm{Fe^{2+}} \xrightarrow{\ -0.44\ } \mathrm{Fe}$. Does $\mathrm{Fe^{2+}}$ disproportionate? Does iron metal react with $\mathrm{Fe^{3+}}$ to give $\mathrm{Fe^{2+}}$ (comproportionation)? (Enter $E^\circ_\mathrm{cell}$ for the comproportionation in volts, to two decimal places.)
::: solution
$\mathrm{Fe^{2+}}$: right $(-0.44) <$ left $(0.771)$, so no disproportionation — iron(II) is stable in deaerated water (until oxygen gets it: $E^\circ(\mathrm{O_2/H_2O}) = 1.23 > 0.771$). The inequality reversed is the comproportionation criterion, and it holds: $\mathrm{Fe + 2\,Fe^{3+} \to 3\,Fe^{2+}}$ with $E^\circ = 0.771 - (-0.44) = 1.21\ \mathrm{V}$ for two electrons, $\log K = 2 \times 1.21/0.0592 \approx 41$ — which is why adding iron metal is the standard way to keep an iron(II) solution free of iron(III), and why iron(III) chloride solution etches iron and steel.
:::
:::

::: exercise Read the furnace {level=1}
From the Ellingham lines of this lesson's widget, answer yes or no with one-line reasons: (a) can carbon (forming CO) reduce $\mathrm{MgO}$ at $2000\ \mathrm{K}$? (b) can C reduce $\mathrm{ZnO}$ at $1500\ \mathrm{K}$? (c) why does the CO line fall while the metal-oxide lines rise?
::: solution
(a) No — the MgO line ($-762\ \mathrm{kJ}$ at $2000\ \mathrm{K}$) lies far below CO ($-579\ \mathrm{kJ}$): MgO is still the stronger oxide; on these fits the lines meet only near $2500\ \mathrm{K}$. (b) Yes — above the $1263\ \mathrm{K}$ crossover the CO line is below ZnO's, so carbon, forming CO, wins the oxygen ($-490$ against $-400\ \mathrm{kJ}$ at $1500\ \mathrm{K}$). (c) Slope is $-\Delta_\mathrm{r} S$: $\mathrm{2\,C + O_2 \to 2\,CO}$ turns one mole of gas into two, so $\Delta_\mathrm{r} S > 0$ and the line falls with temperature; metal-oxide lines consume gas ($\Delta_\mathrm{r} S < 0$) and rise.
:::
:::

::: exercise Peroxide's equilibrium {level=2 check="36.5"}
For $2\,\mathrm{H_2O_2 (aq)} \to 2\,\mathrm{H_2O (l)} + \mathrm{O_2 (g)}$, compute $E^\circ_\mathrm{cell}$ and $\log_{10} K$ from the oxygen Latimer row, and find the peroxide concentration that would be at equilibrium with $\mathrm{O_2}$ at $1\ \mathrm{bar}$. (Enter $\log_{10} K$ to one decimal place.)
::: solution
$E^\circ = 1.776 - 0.695 = 1.081\ \mathrm{V}$, $n = 2$: $\log K = 2 \times 1.081/0.0592 = 36.5$, $K \approx 3\times10^{36}$. With $p(\mathrm{O_2}) = 1\ \mathrm{bar}$ and water at unit activity, $K = 1/[\mathrm{H_2O_2}]^2$, so $[\mathrm{H_2O_2}]_\mathrm{eq} = K^{-1/2} = 10^{-18.3} \approx 5\times10^{-19}\ \mathrm{mol\,dm^{-3}}$. A bottled $3\ \%$ solution ($0.88\ \mathrm{mol\,dm^{-3}}$) is about eighteen orders of magnitude above that. Peroxide solutions persist only because the decomposition is slow without a catalyst — which is why they are stored cool and dark, with stabilisers, in vented containers.
:::
:::

::: exercise A Pourbaix slope {level=2 check="-0.095"}
The boundary $\mathrm{MnO_4^- / Mn^{2+}}$ on a Pourbaix diagram corresponds to $\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \to Mn^{2+} + 4\,H_2O}$. Give its slope in volts per pH unit, to three decimal places.
::: solution
Slope $= -0.0592 \times m/z = -0.0592 \times 8/5 = -0.095\ \mathrm{V}$ per pH unit — one of the steepest common boundaries, which is why permanganate's oxidising power collapses as the solution is neutralised.
:::
:::

::: exercise Frost geometry {level=2 check="0.22"}
For chlorine in acid the cumulative $nE^\circ$ values are $0$ at $\mathrm{Cl_2}$ (oxidation number 0), $1.63$ at $\mathrm{HOCl}$ (+1), $4.91$ at $\mathrm{HClO_2}$ (+3) and $7.28$ at $\mathrm{ClO_3^-}$ (+5). (a) Find the three segment slopes and identify them. (b) Test $\mathrm{HOCl}$ against the chord from $\mathrm{Cl_2}$ to $\mathrm{HClO_2}$ and against the chord from $\mathrm{Cl_2}$ to $\mathrm{ClO_3^-}$: which disproportionations are allowed? For the allowed one, $5\,\mathrm{HOCl} \rightarrow 2\,\mathrm{Cl_2} + \mathrm{ClO_3^-} + \mathrm{H^+} + 2\,\mathrm{H_2O}$, find $E^\circ_\mathrm{cell}$. (Enter $E^\circ_\mathrm{cell}$ in volts, to two decimal places.)
::: solution
(a) Slopes: $\mathrm{Cl_2 \to HOCl}$: $1.63$; $\mathrm{HOCl \to HClO_2}$: $(4.91 - 1.63)/2 = 1.64$; $\mathrm{HClO_2 \to ClO_3^-}$: $(7.28 - 4.91)/2 = 1.19$ — the Latimer potentials $E(\mathrm{HOCl/Cl_2})$, $E(\mathrm{HClO_2/HOCl})$, $E(\mathrm{ClO_3^-/HClO_2})$. (b) **Against $\mathrm{HClO_2}$.** The chord from $\mathrm{Cl_2}\ (0, 0)$ to $\mathrm{HClO_2}\ (3, 4.91)$ stands at $4.91/3 = 1.637$ at oxidation number 1, just *above* $\mathrm{HOCl}$'s $1.63$. The point is below the chord, so $\mathrm{HOCl \to Cl_2 + HClO_2}$ is not allowed — by a margin of only $0.01\ \mathrm{V}$ in the Latimer form ($E(\mathrm{HOCl/Cl_2}) = 1.63 < E(\mathrm{HClO_2/HOCl}) = 1.64$).

**Against $\mathrm{ClO_3^-}$.** The chord from $\mathrm{Cl_2}$ to $\mathrm{ClO_3^-}\ (5, 7.28)$ stands at $7.28/5 = 1.456$ at oxidation number 1, *below* $1.63$: $\mathrm{HOCl}$ lies above it and disproportionation to $\mathrm{Cl_2}$ and $\mathrm{ClO_3^-}$ is allowed. Do not read the cell potential straight off the vertical gap. The gap, $1.63 - 1.456 = 0.174\ \mathrm{V}$, is a free energy per mole of $\mathrm{HOCl}$ divided by $F$; for the balanced reaction, five $\mathrm{HOCl}$ are consumed and the free-energy change is $\Delta_\mathrm{r}G^\circ/F = [2(0) + 7.28] - 5(1.63) = -0.87\ \mathrm{V}$. Four electrons pass (one $\mathrm{HOCl}$ is oxidised from $+1$ to $+5$; four are reduced from $+1$ to $0$), so
$$
E^\circ_\mathrm{cell} = \frac{0.87}{4} = 0.22\ \mathrm{V}
$$
— equivalently $E(\mathrm{HOCl/Cl_2}) - E(\mathrm{ClO_3^-/HOCl}) = 1.63 - (7.28 - 1.63)/4 = 1.63 - 1.41 = 0.22\ \mathrm{V}$, and $\log K = 4 \times 0.2175/0.0592 \approx 15$. In alkaline bleach the corresponding reaction is $3\,\mathrm{OCl^-} \rightarrow \mathrm{ClO_3^-} + 2\,\mathrm{Cl^-}$, also thermodynamically allowed; commercial bleach keeps for months because it is slow at room temperature (it speeds up with heat and concentration). Lesson: the geometry says *whether*; for *how much*, count the electrons.
:::
:::

::: exercise Derive the criterion {level=3}
Starting from $\Delta_\mathrm{r} G^\circ = -nFE^\circ$, derive (i) the weighted-average rule for a three-step Latimer row and (ii) the disproportionation criterion $E^\circ_\mathrm{right} > E^\circ_\mathrm{left}$, showing in (ii) that the result is independent of how the half-reactions are scaled.
::: hint
Write each step as a reduction with its own $\Delta_\mathrm{r}G^\circ = -n_iFE_i^\circ$ and use the fact that free energies of reactions add when the equations add. For (ii), multiply the two half-reactions so that the electrons cancel before you add them.
:::
::: solution
(i) For steps $1,2,3$ with $n_1,n_2,n_3$: $\Delta_\mathrm{r} G^\circ_\mathrm{total} = -F(n_1E_1 + n_2E_2 + n_3E_3)$ and also $= -(n_1+n_2+n_3) F E^\circ_\mathrm{total}$; equate and divide by $-F\sum n_i$. (ii) Disproportionation of B: reduction $\mathrm{B \to C}$ ($n_\mathrm{r}$ electrons, $E_\mathrm{right}$) coupled to oxidation $\mathrm{B \to A}$ ($n_\mathrm{l}$ electrons reversed, $E_\mathrm{left}$). Balancing electrons multiplies the half-equations by $n_\mathrm{l}$ and $n_\mathrm{r}$: $\Delta_\mathrm{r} G^\circ = -n_\mathrm{l} n_\mathrm{r} F E_\mathrm{right} + n_\mathrm{l} n_\mathrm{r} F E_\mathrm{left} = -n_\mathrm{l} n_\mathrm{r} F (E_\mathrm{right} - E_\mathrm{left})$. The sign — and therefore the criterion — is untouched by scaling (which is why potentials, unlike free energies, may be multiplied through a half-equation without changing anything), and $\Delta_\mathrm{r} G^\circ < 0$ iff $E_\mathrm{right} > E_\mathrm{left}$.
:::
:::

::: exercise Smelter arithmetic {level=3 check="1263"}
Take the Ellingham fits $\Delta_\mathrm{r} G^\circ(\mathrm{ZnO}) = -701 + 0.201\,T$ and $\Delta_\mathrm{r} G^\circ(\mathrm{CO}) = -221 - 0.179\,T$ ($\mathrm{kJ\,mol^{-1}}$ per mole of $\mathrm{O_2}$). Derive the slopes from the reaction entropies to check the fits, find the crossover temperature, and explain why industrial zinc smelting runs well above it. (Enter the crossover temperature in kelvin, to the nearest kelvin.)
::: hint
Standard molar entropies ($\mathrm{J\,K^{-1}\,mol^{-1}}$): $\mathrm{Zn(s)}\ 41.6$, $\mathrm{ZnO(s)}\ 43.6$, $\mathrm{C(s)}\ 5.7$, $\mathrm{CO(g)}\ 197.7$, $\mathrm{O_2(g)}\ 205.2$. The slope of each line is $-\Delta_\mathrm{r}S^\circ$.
:::
::: solution
Slopes: for $2\,\mathrm{Zn} + \mathrm{O_2} \rightarrow 2\,\mathrm{ZnO}$, $\Delta_\mathrm{r}S^\circ = 2(43.6) - 2(41.6) - 205.2 = -201.2\ \mathrm{J\,K^{-1}\,mol^{-1}}$, slope $+0.201\ \mathrm{kJ\,K^{-1}\,mol^{-1}}$; for $2\,\mathrm{C} + \mathrm{O_2} \rightarrow 2\,\mathrm{CO}$, $\Delta_\mathrm{r}S^\circ = 2(197.7) - 2(5.7) - 205.2 = +178.8$, slope $-0.179$. Both fits check. Crossover: $-701 + 0.201\,T = -221 - 0.179\,T \Rightarrow 0.380\,T = 480 \Rightarrow T = 1263\ \mathrm{K}$ (the data justify about three significant figures, so "about $1260\ \mathrm{K}$"). At the crossover $\Delta_\mathrm{r}G^\circ = 0$ for $\mathrm{ZnO + C \rightarrow Zn + CO}$, so with all species in their standard states the reaction has no net driving force. Running hotter makes $\Delta_\mathrm{r}G^\circ$ negative, speeds the reaction, and keeps zinc as vapour (it boils at $1180\ \mathrm{K}$); sweeping the vapour away to a condenser keeps its partial pressure low, which pulls the equilibrium toward complete conversion.
:::
:::
