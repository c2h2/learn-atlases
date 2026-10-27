A resting adult turns over something like forty kilograms of adenosine triphosphate a day, yet holds well under a hundred grams of it at any moment. Every ATP molecule is made and spent hundreds of times between breakfast and dinner, and the cell keeps the ratio of ATP to its hydrolysis products so far from equilibrium that each hydrolysis releases much more free energy than the textbook value of $-30.5\ \mathrm{kJ\,mol^{-1}}$. That single observation contains the whole subject of this chapter. Living things are open systems held in a steady state far from chemical equilibrium; the free energy they extract from food or light is stored in a few chemical "currencies" — ATP for phosphoryl groups, NADH and NADPH for electrons, the proton gradient across a membrane — and spent to drive reactions that would otherwise run backwards. To follow that bookkeeping we need three tools: a standard state suited to water at pH 7, the relation between the standard and the actual free-energy change, and the connection between free energy and reduction potential. All three are ordinary thermodynamics from [[general-chemistry-2/entropy-free-energy]] and [[thermodynamics/reaction-equilibrium]], adapted to the conditions inside a cell.

## Free energy in living systems

A cell does not live at equilibrium; a cell at equilibrium is dead. Glucose and oxygen go in, carbon dioxide and water come out, and the concentrations of the intermediates in between stay roughly constant because each is made as fast as it is consumed. This is a **steady state**, not an equilibrium, and the distinction matters for everything that follows. At equilibrium every reaction has $\Delta_\mathrm{r}G = 0$ and nothing can be driven; in a steady state the reactions of a pathway each have $\Delta_\mathrm{r}G < 0$, so that net flux runs forwards, and the free energy released is either dissipated as heat or captured by coupling to another process.

The second law still governs every step. For a reaction at constant temperature and pressure, the direction of spontaneous change is set by the sign of the Gibbs energy change $\Delta_\mathrm{r}G$ — not by the standard value $\Delta_\mathrm{r}G^\circ$, and not by the enthalpy. A reaction with a positive standard Gibbs energy can run forwards perfectly well if its products are removed quickly enough, and that is exactly how many steps of metabolism work. The first job is therefore to state clearly which standard state biochemists use, and why it differs from the chemist's.

### The biochemical standard state

The chemist's standard state puts every solute at unit activity, including the hydrogen ion: $\Delta_\mathrm{r}G^\circ$ refers to $\mathrm{pH} = 0$. No enzyme works at pH 0, and a free-energy change quoted for a reaction that releases or consumes protons at pH 0 would be misleading by tens of kilojoules for the cell. Biochemistry therefore fixes the hydrogen-ion concentration at its physiological value and leaves it out of the reaction quotient.

::: definition Biochemical standard state and the transformed free energy {#def-standard-bio}
In the **biochemical standard state** every reactant and product other than $\mathrm{H^+}$ is at $1\ \mathrm{mol\,dm^{-3}}$ (gases at $1\ \mathrm{bar}$), water has activity 1, the hydrogen-ion concentration is fixed at $10^{-7}\ \mathrm{mol\,dm^{-3}}$ (pH 7), and the temperature is $298.15\ \mathrm{K}$ unless stated otherwise. The standard Gibbs energy change under these conditions is written $\Delta_\mathrm{r}G^{\circ\prime}$ ("delta G nought prime") and the corresponding equilibrium constant is the **apparent equilibrium constant**
$$
K' = \exp\!\left(-\frac{\Delta_\mathrm{r}G^{\circ\prime}}{RT}\right),
$$
in which $[\mathrm{H^+}]$ and $[\mathrm{H_2O}]$ do not appear. Concentrations of reactants such as ATP are **total** concentrations, summed over all their protonation states and metal complexes (ATP⁴⁻, HATP³⁻, MgATP²⁻ …), so $K'$ and $\Delta_\mathrm{r}G^{\circ\prime}$ depend on pH, on the free $\mathrm{Mg^{2+}}$ concentration and on ionic strength; tabulated values usually refer to about $1\ \mathrm{mmol\,dm^{-3}}$ free $\mathrm{Mg^{2+}}$ and ionic strength near $0.25\ \mathrm{mol\,dm^{-3}}$.
:::

For reactions that neither release nor consume protons, $\Delta_\mathrm{r}G^{\circ\prime} = \Delta_\mathrm{r}G^\circ$. When protons are involved the two differ by a fixed amount, which we can derive by writing the hydrogen ion's contribution explicitly. If the reaction produces $\nu$ moles of $\mathrm{H^+}$, then $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ contains the factor $[\mathrm{H^+}]^\nu$ in $Q$. Absorbing that factor at pH 7 into the standard term gives
$$
\Delta_\mathrm{r}G^{\circ\prime} = \Delta_\mathrm{r}G^\circ + \nu RT\ln(10^{-7}) = \Delta_\mathrm{r}G^\circ - 7\nu\,RT\ln 10 .
$$ {#eq-prime}
At $298.15\ \mathrm{K}$, $RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$, so a reaction that releases one proton is $39.95\ \mathrm{kJ\,mol^{-1}}$ more favourable at pH 7 than at pH 0, and one that consumes a proton is that much less favourable. The same correction applied to a reduction half-reaction that consumes protons gives the biochemical standard reduction potentials $E^{\circ\prime}$ used later in this chapter.

::: example Converting between the chemical and biochemical scales {#ex-prime-conversion}
The reduction $\tfrac12\,\mathrm{O_2(g)} + 2\,\mathrm{H^+(aq)} + 2\,\mathrm{e^-} \rightarrow \mathrm{H_2O(l)}$ has $E^\circ = +1.229\ \mathrm{V}$ at pH 0 and $298.15\ \mathrm{K}$ (standard tables, e.g. the CRC Handbook). Find $E^{\circ\prime}$ at pH 7, and the corresponding change in the standard Gibbs energy of the half-reaction.
::: solution
The half-reaction consumes two protons ($\nu = -2$) and two electrons. By [[#eq-prime]], $\Delta G^{\circ\prime} = \Delta G^\circ + 2 \times 7 \times 5.708\ \mathrm{kJ\,mol^{-1}} = \Delta G^\circ + 79.9\ \mathrm{kJ\,mol^{-1}}$: removing the protons' high activity makes the reduction less favourable. Since $\Delta G = -nFE$ with $n = 2$,
$$
E^{\circ\prime} = E^\circ - \frac{79\,910\ \mathrm{J\,mol^{-1}}}{2 \times 96\,485\ \mathrm{C\,mol^{-1}}} = 1.229 - 0.414 = 0.815\ \mathrm{V}.
$$
Equivalently, a couple with one proton per electron loses $0.05916\ \mathrm{V}$ per pH unit at $298\ \mathrm{K}$, and $7 \times 0.05916 = 0.414\ \mathrm{V}$. The result agrees with the tabulated $E^{\circ\prime}(\tfrac12\mathrm{O_2/H_2O}) = +0.816\ \mathrm{V}$ (Berg et al., 9th ed.) to within the rounding of the data. The lesson: always check which scale a table uses before combining numbers from two sources.
:::
:::

### Standard and actual free-energy changes

The standard value tells us where equilibrium lies. What decides whether a reaction runs in a cell is the actual free-energy change at the concentrations present, and the two are connected by the most important equation in bioenergetics.

::: proposition Actual free-energy change {#prop-actual-dg}
For a reaction $a\mathrm{A} + b\mathrm{B} \rightarrow c\mathrm{C} + d\mathrm{D}$ in dilute aqueous solution at pH 7 and temperature $T$,
$$
\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q', \qquad Q' = \frac{[\mathrm{C}]^c[\mathrm{D}]^d}{[\mathrm{A}]^a[\mathrm{B}]^b},
$$ {#eq-actual}
with concentrations in $\mathrm{mol\,dm^{-3}}$ (divided by the standard $1\ \mathrm{mol\,dm^{-3}}$), $\mathrm{H^+}$ and water omitted. At equilibrium $\Delta_\mathrm{r}G' = 0$ and $Q' = K'$, so equivalently $\Delta_\mathrm{r}G' = RT\ln(Q'/K')$. The reaction proceeds forwards when $Q' < K'$. The result assumes ideal-dilute behaviour (activity coefficients absorbed into the apparent constants) and a pH equal to that of the standard state.
:::

::: proof From chemical potentials
For each solute, $\mu_i = \mu_i^{\circ\prime} + RT\ln([i]/c^\circ)$ in the ideal-dilute approximation, where $\mu_i^{\circ\prime}$ is the chemical potential in the biochemical standard state (for $\mathrm{H^+}$ the concentration term is fixed at pH 7 and absorbed into $\mu^{\circ\prime}$, which is the content of [[#eq-prime]]). The reaction Gibbs energy is the stoichiometric sum $\Delta_\mathrm{r}G' = \sum_i \nu_i\mu_i$, with $\nu_i$ positive for products and negative for reactants. Splitting the sum,
$$
\Delta_\mathrm{r}G' = \sum_i \nu_i\mu_i^{\circ\prime} + RT\sum_i \nu_i\ln[i] = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln\prod_i [i]^{\nu_i},
$$
and the product is $Q'$. Setting $\Delta_\mathrm{r}G' = 0$ at equilibrium gives $\Delta_\mathrm{r}G^{\circ\prime} = -RT\ln K'$, and substituting back gives $\Delta_\mathrm{r}G' = RT\ln(Q'/K')$.
:::

A tenfold change in the mass-action ratio changes $\Delta_\mathrm{r}G'$ by $RT\ln 10$: $5.71\ \mathrm{kJ\,mol^{-1}}$ at $25\ \mathrm{^\circ C}$ and $5.94\ \mathrm{kJ\,mol^{-1}}$ at $37\ \mathrm{^\circ C}$. That number is worth memorising. A reaction with $\Delta_\mathrm{r}G^{\circ\prime} = +17\ \mathrm{kJ\,mol^{-1}}$ runs forwards if the cell keeps its products about a thousand times less concentrated than its reactants — which is exactly how aldolase and triose phosphate isomerase operate in glycolysis ([[biochemistry/glycolysis-citric-acid#ex-aldolase]]).

::: example The free energy of ATP hydrolysis in a red blood cell {#ex-atp-cell}
In human erythrocytes the total concentrations are about $[\mathrm{ATP}] = 2.25$, $[\mathrm{ADP}] = 0.25$ and $[\mathrm{P_i}] = 1.65\ \mathrm{mmol\,dm^{-3}}$ (Nelson & Cox, 8th ed.). With $\Delta_\mathrm{r}G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{ATP + H_2O \rightarrow ADP + P_i}$, calculate the actual free-energy change at $37\ \mathrm{^\circ C}$. (Ignore the small temperature dependence of $\Delta_\mathrm{r}G^{\circ\prime}$.)
::: solution
The mass-action ratio, with concentrations in $\mathrm{mol\,dm^{-3}}$ and water omitted, is
$$
Q' = \frac{[\mathrm{ADP}][\mathrm{P_i}]}{[\mathrm{ATP}]} = \frac{(2.5\times10^{-4})(1.65\times10^{-3})}{2.25\times10^{-3}} = 1.83\times10^{-4}.
$$
At $T = 310.15\ \mathrm{K}$, $RT = 2.579\ \mathrm{kJ\,mol^{-1}}$ and $RT\ln Q' = 2.579 \times (-8.60) = -22.2\ \mathrm{kJ\,mol^{-1}}$. Hence
$$
\Delta_\mathrm{r}G' = -30.5 - 22.2 = -52.7\ \mathrm{kJ\,mol^{-1}},
$$
about $-53\ \mathrm{kJ\,mol^{-1}}$ (two significant figures are all the concentrations justify). Hydrolysis in the cell releases some 70 % more free energy than the standard value suggests, because the cell holds ATP high and ADP and phosphate low. This actual value, $\Delta G_\mathrm{p}$, is called the **phosphorylation potential**; it is the quantity a cell actually has to spend, and it ranges from about $-45$ to $-60\ \mathrm{kJ\,mol^{-1}}$ between tissues and metabolic states.
:::
:::

The figure plots [[#eq-actual]] as a straight line: $\Delta_\mathrm{r}G'$ against $\log_{10}Q'$, with slope $RT\ln 10$. Slide the standard value to see how a reaction with positive $\Delta_\mathrm{r}G^{\circ\prime}$ becomes favourable once $Q'$ is small enough, and read off where each line crosses zero — at $\log_{10}K'$.

::: widget plot
f: g + 5.937*x; -30.5 + 5.937*x
x: -8, 4
y: -90, 40
sliders: g=13.8:-62:30:0.1
hlines: 0
vlines: -3.74
labels: \Delta_\mathrm{r}G'\ \text{(adjustable)}; \Delta_\mathrm{r}G'\ \text{for ATP hydrolysis}
caption: The actual free-energy change $\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q'$ (in $\mathrm{kJ\,mol^{-1}}$) at $310\ \mathrm{K}$ against $x = \log_{10}Q'$; the slope is $RT\ln 10 = 5.94\ \mathrm{kJ\,mol^{-1}}$ per decade. The slider sets $\Delta_\mathrm{r}G^{\circ\prime}$ for the first line (starting at $+13.8\ \mathrm{kJ\,mol^{-1}}$, glucose + phosphate → glucose 6-phosphate). The second line is ATP hydrolysis ($-30.5\ \mathrm{kJ\,mol^{-1}}$); the vertical line marks the erythrocyte mass-action ratio, $\log_{10}(1.83\times10^{-4}) = -3.74$, where $\Delta_\mathrm{r}G' \approx -53\ \mathrm{kJ\,mol^{-1}}$. Each line crosses zero at $\log_{10}K'$.
:::

::: warning ΔG°′ does not tell you which way a reaction goes in the cell {#warn-standard}
The commonest error in metabolism is to read $\Delta_\mathrm{r}G^{\circ\prime}$ as the driving force. It is not: it is the driving force only when every reactant and product is at $1\ \mathrm{mol\,dm^{-3}}$, a condition that never occurs in a cell, where metabolites are typically at micromolar to millimolar concentrations. Several glycolytic steps have positive standard values and still run forwards, because $Q'$ is far below $K'$; conversely, a reaction with a negative standard value can be held at or near equilibrium. Two further traps: first, a large negative $\Delta_\mathrm{r}G'$ says nothing about rate — ATP is kinetically stable in neutral solution and hydrolyses slowly without an enzyme; second, $\Delta_\mathrm{r}G^{\circ\prime}$ and $K'$ depend on pH and $\mathrm{Mg^{2+}}$, so values from different tables, measured under different conditions, should not be mixed without checking.
:::

## ATP and coupled reactions

### Why ATP hydrolysis is so favourable

Adenosine triphosphate is a nucleotide: the base adenine, the sugar ribose and a chain of three phosphoryl groups, labelled α, β and γ from the ribose outwards, joined by two **phosphoanhydride** bonds (P–O–P). At pH 7 the triphosphate carries nearly four negative charges, and in the cell it is mostly complexed with $\mathrm{Mg^{2+}}$ as MgATP²⁻, the true substrate of almost all ATP-using enzymes. Hydrolysis of the terminal anhydride gives ADP and orthophosphate; hydrolysis between α and β gives AMP and pyrophosphate.

The large negative $\Delta_\mathrm{r}G^{\circ\prime}$ for these reactions has nothing to do with any special "energy-rich bond" in the molecule; breaking any bond costs energy. It reflects the difference in free energy between reactants and products as a whole, and several factors contribute:

1. **Electrostatic relief.** The four negative charges on the triphosphate are crowded together; hydrolysis separates them into two ions that can move apart.
2. **Resonance stabilisation of the products.** Orthophosphate has more equivalent resonance forms than the phosphoryl groups of the anhydride, in which the bridging oxygen's lone pairs are shared between two phosphorus atoms.
3. **Ionisation.** At pH 7 the hydrolysis releases a proton (on average somewhat less than one, because the new terminal phosphate of ADP and orthophosphate both have $\mathrm{p}K_\mathrm{a}$ values near 7), and by [[#eq-prime]] releasing a proton at pH 7 is favourable.
4. **Solvation and entropy.** The products are better hydrated than ATP, and one molecule becomes two.

These are the same arguments that make carboxylic anhydrides more reactive acylating agents than esters ([[organic-2/carboxylic-derivatives]]): a phosphoanhydride is to phosphate what an acid anhydride is to a carboxylic acid.

The **phosphoryl-transfer potential** of a compound is the negative of its standard free energy of hydrolysis: the larger it is, the more readily the compound donates a phosphoryl group to water or to another acceptor. Standard values (Nelson & Cox, 8th ed., and Berg et al., 9th ed.; $\Delta_\mathrm{r}G^{\circ\prime}$ in $\mathrm{kJ\,mol^{-1}}$) are:

| compound hydrolysed | product(s) | $\Delta_\mathrm{r}G^{\circ\prime}$ |
|---|---|---|
| phosphoenolpyruvate | pyruvate + $\mathrm{P_i}$ | $-61.9$ |
| 1,3-bisphosphoglycerate | 3-phosphoglycerate + $\mathrm{P_i}$ | $-49.4$ |
| ATP | AMP + $\mathrm{PP_i}$ | $-45.6$ |
| phosphocreatine | creatine + $\mathrm{P_i}$ | $-43.0$ |
| acetyl-CoA (thioester) | acetate + CoA | $-31.4$ |
| ATP | ADP + $\mathrm{P_i}$ | $-30.5$ |
| glucose 1-phosphate | glucose + $\mathrm{P_i}$ | $-20.9$ |
| pyrophosphate | $2\,\mathrm{P_i}$ | $-19.2$ |
| glucose 6-phosphate | glucose + $\mathrm{P_i}$ | $-13.8$ |
| glycerol 3-phosphate | glycerol + $\mathrm{P_i}$ | $-9.2$ |

The striking feature is that ATP sits in the *middle* of the table. Compounds above it — phosphoenolpyruvate, 1,3-bisphosphoglycerate, phosphocreatine — can phosphorylate ADP to ATP; ATP in turn can phosphorylate the compounds below it, the sugar phosphates and glycerol phosphate. ATP is not the most energy-rich phosphate in the cell; it is the intermediary, the common currency through which phosphoryl groups flow from high-potential donors made in catabolism to low-potential acceptors needed in biosynthesis.

### Coupling

How can a reaction with a positive free-energy change be made to go? By coupling it to a more favourable one through a shared intermediate.

::: proposition Additivity and coupling {#prop-coupling}
If reactions 1 and 2 are combined into an overall reaction 3 (reaction 3 = reaction 1 + reaction 2), then
$$
\Delta_\mathrm{r}G^{\circ\prime}_3 = \Delta_\mathrm{r}G^{\circ\prime}_1 + \Delta_\mathrm{r}G^{\circ\prime}_2, \qquad K'_3 = K'_1\,K'_2,
$$
and the same additivity holds for the actual values $\Delta_\mathrm{r}G'$ at given concentrations. Coupling an unfavourable reaction to the hydrolysis of $n$ ATP therefore multiplies its apparent equilibrium constant by $\exp(30.5n\ \mathrm{kJ\,mol^{-1}}/RT)$ — a factor of about $2.2\times10^5$ per ATP at $298\ \mathrm{K}$, and about $10^{8.8}$ per ATP when the cellular phosphorylation potential of $-52\ \mathrm{kJ\,mol^{-1}}$ is used at $310\ \mathrm{K}$. The coupling is real only if the two reactions share a chemical intermediate (a phosphorylated substrate or enzyme, or a common carrier) so that one cannot proceed without the other.
:::

::: proof Free energy is a state function
The Gibbs energy is a state function, so the change between the initial and final states of reaction 3 is the same whether the conversion happens in one step or through reaction 1 followed by reaction 2: this is Hess's law for $G$. Hence $\Delta_\mathrm{r}G_3 = \Delta_\mathrm{r}G_1 + \Delta_\mathrm{r}G_2$, both for standard values and for actual values at fixed concentrations (the $RT\ln Q'$ terms also add, since the reaction quotient of the sum is the product of the quotients, with the shared intermediate cancelling). Then $K'_3 = \exp(-\Delta_\mathrm{r}G^{\circ\prime}_3/RT) = \exp(-\Delta_\mathrm{r}G^{\circ\prime}_1/RT)\exp(-\Delta_\mathrm{r}G^{\circ\prime}_2/RT) = K'_1K'_2$. With $\Delta_\mathrm{r}G_2 = -30.5n\ \mathrm{kJ\,mol^{-1}}$ the factor $K'_2 = \exp(30.5n/RT)$ follows; at $298.15\ \mathrm{K}$, $30\,500/(8.314 \times 298.15) = 12.30$ and $e^{12.30} = 2.2\times10^5$. Thermodynamics adds the equations; it is the enzyme mechanism that makes their sum the only path open, which is why the final condition is chemical, not thermodynamic.
:::

::: example Phosphorylating glucose {#ex-hexokinase}
The direct reaction glucose + $\mathrm{P_i}$ → glucose 6-phosphate + $\mathrm{H_2O}$ has $\Delta_\mathrm{r}G^{\circ\prime} = +13.8\ \mathrm{kJ\,mol^{-1}}$. Hexokinase instead catalyses glucose + ATP → glucose 6-phosphate + ADP. Find $\Delta_\mathrm{r}G^{\circ\prime}$ and $K'$ at $298\ \mathrm{K}$ for both, and explain what the comparison shows.
::: solution
For the direct reaction, $K'_1 = \exp(-13\,800/(8.314 \times 298.15)) = \exp(-5.567) = 3.8\times10^{-3}$: with $10\ \mathrm{mmol\,dm^{-3}}$ phosphate, equilibrium would leave only $3.8\times10^{-5}$ of the glucose phosphorylated — useless. The hexokinase reaction is the sum of the direct reaction and ATP hydrolysis:
$$
\Delta_\mathrm{r}G^{\circ\prime} = +13.8 + (-30.5) = -16.7\ \mathrm{kJ\,mol^{-1}}, \qquad K' = \exp(16\,700/2479) = 8.4\times10^{2}.
$$
The equilibrium constant has grown by a factor $8.4\times10^2/3.8\times10^{-3} = 2.2\times10^5$, the factor of [[#prop-coupling]]. Mechanistically, the enzyme never makes free phosphate: it binds glucose and MgATP together and transfers the γ-phosphoryl group directly to the 6-hydroxyl. Because water is excluded from the closed active site (the enzyme folds around glucose in an induced fit), ATP is not wastefully hydrolysed. Under cellular concentrations $\Delta_\mathrm{r}G'$ for hexokinase is about $-33\ \mathrm{kJ\,mol^{-1}}$ in erythrocytes (Berg et al.), which is why it is one of the irreversible control points of glycolysis.
:::
:::

ATP is used in three distinct ways, and the distinction helps when reading pathways. In **phosphoryl transfer** (kinases) the γ-phosphoryl goes to a substrate, activating it. In **adenylyl transfer** ATP gives AMP to a carboxylate to form an acyl adenylate, and the pyrophosphate released is then hydrolysed by pyrophosphatase; the overall reaction consumes two phosphoanhydride bonds and has a $\Delta_\mathrm{r}G^{\circ\prime}$ of $-45.6 - 19.2 = -64.8\ \mathrm{kJ\,mol^{-1}}$, enough to make fatty-acid activation and amino-acid activation for protein synthesis effectively irreversible ([[biochemistry/nucleic-acids]], [[biochemistry/lipid-nitrogen-metabolism]]). And in **conformational coupling** ATP binding and hydrolysis change the shape of a protein — a pump, a motor or a chaperone — so that a free-energy change in the active site becomes mechanical work or a concentration gradient ([[biochemistry/carbohydrates-lipids#prop-transport]]).

::: example Phosphocreatine as an ATP buffer {#ex-creatine}
Muscle stores phosphocreatine (PCr), which creatine kinase uses to regenerate ATP: PCr + ADP ⇌ creatine + ATP. (a) Calculate $\Delta_\mathrm{r}G^{\circ\prime}$ and $K'$ at $310\ \mathrm{K}$ from the table above. (b) In resting muscle, take $[\mathrm{PCr}] = 25$, $[\mathrm{Cr}] = 13$ and $[\mathrm{ATP}] = 8.0\ \mathrm{mmol\,dm^{-3}}$; creatine kinase is fast enough to keep the reaction close to equilibrium. Estimate the free ADP concentration.
::: solution
(a) The reaction is phosphocreatine hydrolysis minus ATP hydrolysis: $\Delta_\mathrm{r}G^{\circ\prime} = -43.0 - (-30.5) = -12.5\ \mathrm{kJ\,mol^{-1}}$. At $310.15\ \mathrm{K}$, $K' = \exp(12\,500/(8.314 \times 310.15)) = \exp(4.848) = 1.27\times10^{2}$.

(b) At equilibrium
$$
K' = \frac{[\mathrm{Cr}][\mathrm{ATP}]}{[\mathrm{PCr}][\mathrm{ADP}]} \quad\Rightarrow\quad [\mathrm{ADP}] = \frac{(13)(8.0)}{(25)(127)}\ \mathrm{mmol\,dm^{-3}} = 0.033\ \mathrm{mmol\,dm^{-3}} = 33\ \mu\mathrm{mol\,dm^{-3}}.
$$
The free ADP in resting muscle is indeed in the tens of micromolar (much of the ADP measured in tissue extracts is bound to proteins). Because the equilibrium lies so far towards ATP, a burst of contraction that converts ATP to ADP is immediately reversed at the expense of phosphocreatine, and $[\mathrm{ATP}]$ barely changes until most of the phosphocreatine is gone. Phosphocreatine is a buffer for the ATP/ADP ratio in exactly the sense that a weak acid–conjugate base pair is a buffer for pH ([[biochemistry/water-noncovalent#prop-hh]]). The low free ADP also makes the phosphorylation potential in muscle larger than in the erythrocyte: with $[\mathrm{P_i}]$ equal to $[\mathrm{ATP}]$, $\Delta_\mathrm{r}G' = -30.5 + RT\ln(3.3\times10^{-5}) \approx -57\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: quiz
Using the table of hydrolysis free energies, which reaction has a favourable standard free-energy change (negative $\Delta_\mathrm{r}G^{\circ\prime}$) as written?
- [x] Phosphoenolpyruvate + ADP → pyruvate + ATP
- [ ] Glucose 6-phosphate + ADP → glucose + ATP
- [ ] Glycerol 3-phosphate + ADP → glycerol + ATP
- [ ] ATP + creatine → ADP + phosphocreatine
::: solution
A phosphoryl group passes spontaneously (under standard conditions) from a donor of higher phosphoryl-transfer potential to an acceptor of lower potential. For the first reaction, $\Delta_\mathrm{r}G^{\circ\prime} = -61.9 + 30.5 = -31.4\ \mathrm{kJ\,mol^{-1}}$; this is the pyruvate kinase step of glycolysis. The second and third have $+16.7$ and $+21.3\ \mathrm{kJ\,mol^{-1}}$, since sugar and glycerol phosphates lie below ATP; the fourth, the reverse of creatine kinase, has $+12.5\ \mathrm{kJ\,mol^{-1}}$ under standard conditions (it runs this way during recovery only because the cell's concentrations make $Q'$ small).
:::
:::

## Redox carriers and reduction potentials

Most of the free energy in food is released not by phosphoryl transfer but by oxidation: the carbon atoms of glucose and fatty acids end as $\mathrm{CO_2}$ and their electrons end on oxygen. Cells do not hand those electrons to oxygen directly. They pass them first to a small number of soluble or protein-bound **electron carriers**, which shuttle reducing power between pathways.

### NAD⁺, NADP⁺ and the flavins

**Nicotinamide adenine dinucleotide** ($\mathrm{NAD^+}$) and its phosphorylated relative $\mathrm{NADP^+}$ accept electrons as a **hydride ion**, $\mathrm{H^-}$, at C4 of the pyridinium ring of nicotinamide. The aromatic pyridinium cation becomes a 1,4-dihydropyridine, and the second proton of the substrate's $\mathrm{XH_2}$ is released to the solvent:
$$
\mathrm{NAD^+} + 2\,\mathrm{e^-} + \mathrm{H^+} \rightarrow \mathrm{NADH}, \qquad \mathrm{XH_2} + \mathrm{NAD^+} \rightarrow \mathrm{X} + \mathrm{NADH} + \mathrm{H^+}.
$$
Hydride transfer to a pyridinium ring is the biological analogue of reduction by a complex metal hydride, and the reverse — hydride donation from NADH to a carbonyl — is the analogue of a borohydride reduction ([[organic-2/carbonyl-addition]]). Dehydrogenases transfer the hydride stereospecifically to one face of the ring, a striking example of enzymes distinguishing enantiotopic faces ([[organic-1/stereochemistry]]). The reduced ring absorbs at $340\ \mathrm{nm}$ and the oxidised one does not, which is how almost every dehydrogenase assay is followed spectrophotometrically.

**Flavin adenine dinucleotide** (FAD) and **flavin mononucleotide** (FMN) carry electrons on the isoalloxazine ring of riboflavin, accepting two electrons and two protons to give $\mathrm{FADH_2}$. Unlike nicotinamides, flavins can also accept a single electron to form a stable **semiquinone** radical. That makes them the junction between two-electron chemistry (hydride donors, dehydrogenation of C–C bonds as in succinate → fumarate) and one-electron carriers such as iron–sulfur clusters and cytochromes in the respiratory chain. Flavins are usually tightly bound to their enzymes (flavoproteins), and their reduction potentials are tuned by the protein over a wide range around the free value of $-0.219\ \mathrm{V}$.

A cell keeps its two nicotinamide pools in very different states. The free cytosolic $[\mathrm{NAD^+}]/[\mathrm{NADH}]$ ratio is high (estimates for liver are of the order of several hundred), so $\mathrm{NAD^+}$ is ready to accept electrons in catabolism; the free $[\mathrm{NADP^+}]/[\mathrm{NADPH}]$ ratio is low (of the order of $10^{-2}$), so NADPH is ready to donate electrons in biosynthesis. The two coenzymes have almost the same standard potential; it is the different ratios, maintained by different enzymes, that give them opposite jobs.

### Free energy and reduction potential

::: proposition Free energy of an electron-transfer reaction {#prop-redox}
For a redox reaction in which $n$ electrons pass from a donor couple (reduction potential $E'_\mathrm{donor}$) to an acceptor couple ($E'_\mathrm{acceptor}$),
$$
\Delta_\mathrm{r}G' = -nF\,\Delta E', \qquad \Delta E' = E'_\mathrm{acceptor} - E'_\mathrm{donor},
$$ {#eq-redox}
and under biochemical standard conditions $\Delta_\mathrm{r}G^{\circ\prime} = -nF\,\Delta E^{\circ\prime}$. The potential of each couple depends on the ratio of its oxidised and reduced forms through the Nernst equation,
$$
E' = E^{\circ\prime} + \frac{RT}{nF}\ln\frac{[\mathrm{ox}]}{[\mathrm{red}]},
$$ {#eq-nernst}
with protons at pH 7 already absorbed in $E^{\circ\prime}$. Electrons flow spontaneously from the couple of lower (more negative) potential to that of higher potential.
:::

::: proof Electrical work
At constant temperature and pressure, $-\Delta_\mathrm{r}G$ is the maximum non-expansion work a reaction can do. If the reaction were run in a galvanic cell, $n$ moles of electrons per mole of reaction would pass through a potential difference $\Delta E'$, doing electrical work $nF\Delta E'$, where $F$ is the charge on a mole of electrons. Reversibly, this work equals $-\Delta_\mathrm{r}G'$, giving $\Delta_\mathrm{r}G' = -nF\Delta E'$. For each half-reaction $\mathrm{ox} + n\,\mathrm{e^-} \rightarrow \mathrm{red}$, apply [[#prop-actual-dg]]: $\Delta G' = \Delta G^{\circ\prime} + RT\ln([\mathrm{red}]/[\mathrm{ox}])$; dividing by $-nF$ gives $E' = E^{\circ\prime} - (RT/nF)\ln([\mathrm{red}]/[\mathrm{ox}])$, which is [[#eq-nernst]]. The same derivation, with a membrane in place of the electrodes, underlies the proton-motive force of [[biochemistry/oxidative-phosphorylation#prop-pmf]]; the general theory is in [[electrochemistry/cell-thermodynamics]].
:::

Standard biochemical reduction potentials at $298\ \mathrm{K}$, pH 7 (Berg et al., 9th ed.; Nelson & Cox, 8th ed.), written as reductions, in volts:

| couple | $E^{\circ\prime}$ / V |
|---|---|
| $\mathrm{NADP^+} + \mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{NADPH}$ | $-0.324$ |
| $\mathrm{NAD^+} + \mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{NADH}$ | $-0.320$ |
| FAD + $2\mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{FADH_2}$ (free) | $-0.219$ |
| acetaldehyde + $2\mathrm{H^+} + 2\mathrm{e^-}$ → ethanol | $-0.197$ |
| pyruvate + $2\mathrm{H^+} + 2\mathrm{e^-}$ → lactate | $-0.185$ |
| oxaloacetate + $2\mathrm{H^+} + 2\mathrm{e^-}$ → malate | $-0.166$ |
| fumarate + $2\mathrm{H^+} + 2\mathrm{e^-}$ → succinate | $+0.031$ |
| ubiquinone + $2\mathrm{H^+} + 2\mathrm{e^-}$ → ubiquinol | $+0.045$ |
| cytochrome *c* ($\mathrm{Fe^{3+}}$) + $\mathrm{e^-}$ → cytochrome *c* ($\mathrm{Fe^{2+}}$) | $+0.254$ |
| $\tfrac12\mathrm{O_2} + 2\mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{H_2O}$ | $+0.816$ |

The table is the map of the respiratory chain read from top to bottom: electrons from NADH pass through flavins, ubiquinone and the cytochromes to oxygen, each step downhill.

::: example The free energy of NADH oxidation {#ex-nadh-o2}
Calculate $\Delta_\mathrm{r}G^{\circ\prime}$ for $\mathrm{NADH} + \mathrm{H^+} + \tfrac12\,\mathrm{O_2} \rightarrow \mathrm{NAD^+} + \mathrm{H_2O}$, and compare it with the free energy needed to make ATP.
::: solution
NADH is the donor and oxygen the acceptor: $\Delta E^{\circ\prime} = +0.816 - (-0.320) = 1.136\ \mathrm{V}$, with $n = 2$:
$$
\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485\ \mathrm{C\,mol^{-1}} \times 1.136\ \mathrm{V} = -2.192\times10^{5}\ \mathrm{J\,mol^{-1}} = -219.2\ \mathrm{kJ\,mol^{-1}}.
$$
That is enough, on paper, for $219.2/30.5 = 7.2$ ATP under standard conditions, or about $219/52 \approx 4.2$ at a cellular phosphorylation potential of $-52\ \mathrm{kJ\,mol^{-1}}$. Mitochondria actually make about 2.5 ATP per NADH ([[biochemistry/oxidative-phosphorylation#prop-atp-stoich]]), a thermodynamic efficiency near 60 % under cellular conditions. Releasing all $219\ \mathrm{kJ\,mol^{-1}}$ in one step would waste it as heat; the respiratory chain breaks the drop into several smaller steps, each coupled to proton pumping.
:::
:::

::: example Lactate dehydrogenase: a near-equilibrium redox step {#ex-ldh}
Lactate dehydrogenase catalyses pyruvate + NADH + $\mathrm{H^+}$ ⇌ lactate + $\mathrm{NAD^+}$. (a) Find $\Delta_\mathrm{r}G^{\circ\prime}$ and $K'$ at $298\ \mathrm{K}$. (b) In a tissue where the free $[\mathrm{NAD^+}]/[\mathrm{NADH}]$ ratio is 700 and $[\mathrm{lactate}]/[\mathrm{pyruvate}] = 10$, find $\Delta_\mathrm{r}G'$ (at $298\ \mathrm{K}$ for simplicity) and comment.
::: solution
(a) Pyruvate is the acceptor and NADH the donor: $\Delta E^{\circ\prime} = -0.185 - (-0.320) = +0.135\ \mathrm{V}$, so $\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485 \times 0.135 = -26.05\ \mathrm{kJ\,mol^{-1}}$ and $K' = \exp(26\,050/2479) = 3.7\times10^4$.

(b) $Q' = ([\mathrm{lactate}]/[\mathrm{pyruvate}]) \times ([\mathrm{NAD^+}]/[\mathrm{NADH}]) = 10 \times 700 = 7.0\times10^3$, so
$$
\Delta_\mathrm{r}G' = -26.05 + 2.479 \ln(7.0\times10^3) = -26.05 + 21.95 = -4.1\ \mathrm{kJ\,mol^{-1}}.
$$
The reaction is close to equilibrium ($Q'$ is only a factor of 5 below $K'$), despite a large standard value. Because the oxidised/reduced ratio of NAD is so high, reducing pyruvate is barely favourable; when glycolysis runs faster than mitochondria can reoxidise NADH (in exercising muscle) the NADH/NAD⁺ ratio rises and lactate accumulates, regenerating the $\mathrm{NAD^+}$ glycolysis needs. A near-equilibrium enzyme like this one can run in either direction as concentrations change: in the liver the same reaction runs backwards, turning lactate into pyruvate for gluconeogenesis. Ratios like this one are also used in the opposite direction, to estimate the free $[\mathrm{NAD^+}]/[\mathrm{NADH}]$ ratio from measured lactate and pyruvate.
:::
:::

The figure plots [[#eq-nernst]] for the two nicotinamide couples against the logarithm of their oxidised/reduced ratio. Because $n = 2$, the potential changes by only $29.6\ \mathrm{mV}$ per decade at $298\ \mathrm{K}$, half the one-electron value. The vertical lines mark typical cytosolic ratios: $\mathrm{NAD^+}$ held oxidised (ratio 700) sits about $84\ \mathrm{mV}$ above its standard potential, NADPH held reduced (ratio $10^{-2}$) about $60\ \mathrm{mV}$ below, so the two pools, nearly identical in $E^{\circ\prime}$, differ by about $0.15\ \mathrm{V}$ in the cell — roughly $28\ \mathrm{kJ\,mol^{-1}}$ for a two-electron transfer.

::: widget plot
f: -0.320 + 0.02958*x; -0.324 + 0.02958*x
x: -3, 4
y: -0.45, -0.15
hlines: -0.185
vlines: 2.845; -2
labels: E'(\mathrm{NAD^+/NADH}); E'(\mathrm{NADP^+/NADPH})
caption: Nernst lines $E' = E^{\circ\prime} + (RT/2F)\ln([\mathrm{ox}]/[\mathrm{red}])$ (in V) at $298\ \mathrm{K}$ for $\mathrm{NAD^+/NADH}$ ($E^{\circ\prime} = -0.320\ \mathrm{V}$) and $\mathrm{NADP^+/NADPH}$ ($-0.324\ \mathrm{V}$) against $x = \log_{10}([\mathrm{ox}]/[\mathrm{red}])$; slope $0.0296\ \mathrm{V}$ per decade. The horizontal line is $E^{\circ\prime}$ for pyruvate/lactate ($-0.185\ \mathrm{V}$). The vertical lines mark ratios of 700 ($x = 2.85$, a typical cytosolic $\mathrm{NAD^+/NADH}$, giving $E' \approx -0.236\ \mathrm{V}$) and $10^{-2}$ ($x = -2$, a typical $\mathrm{NADP^+/NADPH}$, giving $E' \approx -0.383\ \mathrm{V}$). Keeping the ratios different gives the two coenzymes opposite roles: one an electron sink for catabolism, the other an electron source for biosynthesis.
:::

## Where this leads

Every metabolic chapter that follows is an application of the three results of this one. In [[biochemistry/glycolysis-citric-acid]] the mass-action ratio of each step, compared with $K'$, separates the near-equilibrium reactions from the irreversible control points ([[biochemistry/glycolysis-citric-acid#def-control]]), and substrate-level phosphorylation is seen as phosphoryl transfer from compounds above ATP in the table. In [[biochemistry/oxidative-phosphorylation]] the redox potentials of this chapter become the respiratory chain, and [[#prop-redox]] reappears, with a membrane in place of a wire, as the proton-motive force; the same chapter runs photosynthesis, where light pushes electrons uphill from water to $\mathrm{NADP^+}$. In [[biochemistry/lipid-nitrogen-metabolism]] the activation of fatty acids by adenylyl transfer and the ATP bookkeeping of the urea cycle are pure coupling arguments. The ideal-dilute chemical potential behind [[#prop-actual-dg]] is treated in depth in [[thermodynamics/mixtures]], and the transport of ions against gradients — free energy spent as concentration and voltage — in [[biochemistry/carbohydrates-lipids]].

::: history
The idea that a single compound carries energy between cellular reactions took about forty years to assemble. In 1906 Arthur Harden and William John Young found that yeast juice loses its fermenting power on dialysis and regains it when the boiled dialysate — a heat-stable "co-zymase", later shown to contain $\mathrm{NAD^+}$ — is added back, and that inorganic phosphate is taken up into sugar phosphates during fermentation; Harden shared the 1929 Nobel Prize in Chemistry with Hans von Euler-Chelpin, who worked out the composition of co-zymase. Adenosine triphosphate itself was isolated from muscle in 1929 by Karl Lohmann in Otto Meyerhof's laboratory and, independently, by Cyrus Fiske and Yellapragada Subbarow at Harvard. In 1935 Otto Warburg and Walter Christian showed that the hydrogen-carrying part of their "coenzyme II" (NADP⁺) is nicotinamide, and in the same years Hugo Theorell resolved the "old yellow enzyme" into a protein and a flavin phosphate (he received the 1955 Nobel Prize in Physiology or Medicine). The synthesis came in 1941, when Fritz Lipmann's review "Metabolic generation and utilization of phosphate bond energy" proposed that ATP is the general carrier of free energy in the cell and introduced the squiggle, ~P, for a "high-energy" phosphate; Lipmann shared the 1953 Nobel Prize in Physiology or Medicine with Hans Krebs. The modern, quantitative treatment of apparent equilibrium constants at fixed pH and $\mathrm{Mg^{2+}}$ is due largely to Robert Alberty, whose work underlies the IUPAC–IUBMB recommendations on biochemical thermodynamics of 1994.
:::

::: summary
- Cells are open systems in a steady state far from equilibrium; each step of a pathway carrying net flux has $\Delta_\mathrm{r}G' < 0$.
- The biochemical standard state fixes pH 7 and leaves $\mathrm{H^+}$ and water out of $Q'$: $\Delta_\mathrm{r}G^{\circ\prime} = \Delta_\mathrm{r}G^\circ - 7\nu RT\ln 10$ for a reaction releasing $\nu$ protons.
- The actual free-energy change is $\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q' = RT\ln(Q'/K')$; each decade of $Q'$ shifts it by $5.7$–$5.9\ \mathrm{kJ\,mol^{-1}}$.
- ATP hydrolysis has $\Delta_\mathrm{r}G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$, but the cellular phosphorylation potential is about $-45$ to $-60\ \mathrm{kJ\,mol^{-1}}$ because ATP is held far above its equilibrium ratio with ADP and phosphate.
- ATP sits in the middle of the phosphoryl-transfer scale: it is made from higher-potential donors (PEP, 1,3-bisphosphoglycerate, phosphocreatine) and spent on lower-potential acceptors.
- Free energies of coupled reactions add and their $K'$ values multiply, but coupling requires a shared intermediate; one ATP multiplies $K'$ by about $10^{5}$ under standard conditions.
- $\mathrm{NAD^+}$ and $\mathrm{NADP^+}$ carry hydride; flavins carry one or two electrons; $\Delta_\mathrm{r}G' = -nF\Delta E'$, and NADH oxidation by oxygen releases $219\ \mathrm{kJ\,mol^{-1}}$ under standard conditions.
:::

## Exercises

::: exercise The apparent equilibrium constant of a sugar phosphate {level=1 check="262"}
Glucose 6-phosphate + $\mathrm{H_2O}$ → glucose + $\mathrm{P_i}$ has $\Delta_\mathrm{r}G^{\circ\prime} = -13.8\ \mathrm{kJ\,mol^{-1}}$. Calculate $K'$ at $298.15\ \mathrm{K}$. (Enter $K'$ to three significant figures.)
::: solution
$K' = \exp(-\Delta_\mathrm{r}G^{\circ\prime}/RT) = \exp(13\,800/(8.314 \times 298.15)) = \exp(5.567) = 262$. At equilibrium, with $1\ \mathrm{mmol\,dm^{-3}}$ phosphate, the ratio $[\mathrm{glucose}]/[\mathrm{G6P}]$ would be $262/10^{-3} = 2.6\times10^5$: the sugar phosphate is thermodynamically unstable to hydrolysis but persists in cells because the reaction is slow without glucose-6-phosphatase.
:::
:::

::: exercise Reducing FAD with NADH {level=1 check="-19.5"}
Using standard biochemical reduction potentials ($\mathrm{NAD^+/NADH}$ $-0.320\ \mathrm{V}$; free $\mathrm{FAD/FADH_2}$ $-0.219\ \mathrm{V}$), calculate $\Delta_\mathrm{r}G^{\circ\prime}$ for $\mathrm{NADH + H^+ + FAD \rightarrow NAD^+ + FADH_2}$. (Enter $\Delta_\mathrm{r}G^{\circ\prime}$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
FAD is the acceptor: $\Delta E^{\circ\prime} = -0.219 - (-0.320) = +0.101\ \mathrm{V}$. With $n = 2$, $\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485 \times 0.101 = -1.949\times10^4\ \mathrm{J\,mol^{-1}} = -19.5\ \mathrm{kJ\,mol^{-1}}$. The reaction is favourable, but only modestly; enzyme-bound flavins have potentials shifted by their proteins, so the real driving force depends on the flavoprotein.
:::
:::

::: exercise Pyruvate kinase {level=1 check="-31.4"}
Calculate $\Delta_\mathrm{r}G^{\circ\prime}$ for phosphoenolpyruvate + ADP → pyruvate + ATP from the hydrolysis free energies in the table. (Enter $\Delta_\mathrm{r}G^{\circ\prime}$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
The reaction is PEP hydrolysis ($-61.9$) plus the reverse of ATP hydrolysis ($+30.5$): $\Delta_\mathrm{r}G^{\circ\prime} = -31.4\ \mathrm{kJ\,mol^{-1}}$. Much of PEP's large phosphoryl-transfer potential comes from the product: the enol form of pyruvate released by hydrolysis tautomerises to the far more stable keto form ([[organic-2/enols-enolates]]), a step that makes the overall reaction strongly favourable and effectively irreversible in the cell.
:::
:::

::: exercise The phosphorylation potential in muscle {level=2 check="-48.5"}
In rat skeletal muscle, total concentrations are about $[\mathrm{ATP}] = 8.05$, $[\mathrm{ADP}] = 0.93$ and $[\mathrm{P_i}] = 8.05\ \mathrm{mmol\,dm^{-3}}$ (Nelson & Cox, 8th ed.). Calculate $\Delta_\mathrm{r}G'$ for ATP hydrolysis at $37\ \mathrm{^\circ C}$, taking $\Delta_\mathrm{r}G^{\circ\prime} = -30.5\ \mathrm{kJ\,mol^{-1}}$. (Enter $\Delta_\mathrm{r}G'$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$Q' = [\mathrm{ADP}][\mathrm{P_i}]/[\mathrm{ATP}] = (0.93\times10^{-3})(8.05\times10^{-3})/(8.05\times10^{-3}) = 9.3\times10^{-4}$. $RT\ln Q' = 2.5786 \times \ln(9.3\times10^{-4}) = 2.5786 \times (-6.980) = -18.0\ \mathrm{kJ\,mol^{-1}}$. So $\Delta_\mathrm{r}G' = -30.5 - 18.0 = -48.5\ \mathrm{kJ\,mol^{-1}}$. This uses total ADP; the free ADP is much lower (see [[#ex-creatine]]), so the true phosphorylation potential in muscle is more negative still.
:::
:::

::: exercise A couple at a different pH {level=2 check="-0.028"}
For fumarate + $2\,\mathrm{H^+}$ + $2\,\mathrm{e^-}$ → succinate, $E^{\circ\prime} = +0.031\ \mathrm{V}$ at pH 7 and $298\ \mathrm{K}$. What is the standard potential of the couple (fumarate and succinate both at $1\ \mathrm{mol\,dm^{-3}}$) at pH 8? (Enter the potential in V to three decimal places.)
::: solution
Two protons accompany two electrons, so the potential falls by $(RT\ln 10/F) \times (2/2) = 0.05916\ \mathrm{V}$ per pH unit. At pH 8: $E = 0.031 - 0.059 = -0.028\ \mathrm{V}$. Raising the pH makes proton-consuming reductions less favourable — the same logic as [[#eq-prime]], applied to one unit of pH instead of seven.
:::
:::

::: exercise Daily ATP turnover {level=2 check="41.0"}
A resting adult expends about $8.4\ \mathrm{MJ}$ of free energy per day. Suppose half of it passes through ATP, each mole of ATP made and hydrolysed corresponding to $52\ \mathrm{kJ}$ (the phosphorylation potential). Estimate the mass of ATP turned over per day ($M(\mathrm{ATP}) = 507.2\ \mathrm{g\,mol^{-1}}$). (Enter the mass in kg to three significant figures.)
::: solution
Energy through ATP: $0.5 \times 8.4\times10^{6} = 4.2\times10^{6}\ \mathrm{J}$. Amount: $4.2\times10^{6}/5.2\times10^{4} = 80.8\ \mathrm{mol}$. Mass: $80.8 \times 507.2\ \mathrm{g} = 4.10\times10^{4}\ \mathrm{g} = 41.0\ \mathrm{kg}$ — of the order of the body's own mass, the figure quoted in the introduction. Since the body contains well under $100\ \mathrm{g}$ of ATP, each molecule is recycled several hundred to a thousand times a day. (The answer is an estimate: both the fraction of energy passing through ATP and $\Delta G_\mathrm{p}$ vary.)
:::
:::

::: exercise The pH at which a proton-releasing reaction balances {level=3 check="8.75"}
A reaction $\mathrm{A} \rightarrow \mathrm{B} + \mathrm{H^+}$ has a standard Gibbs energy $\Delta_\mathrm{r}G^{\circ\prime} = +10.0\ \mathrm{kJ\,mol^{-1}}$ on the biochemical scale (pH 7, $298.15\ \mathrm{K}$). (a) Show that the standard free energy at an arbitrary fixed pH, defined like $\Delta_\mathrm{r}G^{\circ\prime}$ but with $[\mathrm{H^+}] = 10^{-\mathrm{pH}}$, is $\Delta_\mathrm{r}G^{\circ\prime} - (\mathrm{pH} - 7)RT\ln 10$. (b) At what pH is it zero? (Enter the pH to two decimal places.)
::: hint
Start from $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln([\mathrm{B}][\mathrm{H^+}]/[\mathrm{A}])$ and absorb $[\mathrm{H^+}]$ into the standard term, as in [[#eq-prime]].
:::
::: solution
(a) Absorbing $[\mathrm{H^+}] = 10^{-\mathrm{pH}}$ into the standard term gives $\Delta_\mathrm{r}G^\circ(\mathrm{pH}) = \Delta_\mathrm{r}G^\circ + RT\ln 10^{-\mathrm{pH}} = \Delta_\mathrm{r}G^\circ - \mathrm{pH}\,RT\ln 10$. At pH 7 this is $\Delta_\mathrm{r}G^{\circ\prime}$, so $\Delta_\mathrm{r}G^\circ(\mathrm{pH}) = \Delta_\mathrm{r}G^{\circ\prime} - (\mathrm{pH} - 7)RT\ln 10$. (b) Setting it to zero: $\mathrm{pH} = 7 + 10.0/5.708 = 7 + 1.752 = 8.75$. Each pH unit is worth $5.7\ \mathrm{kJ\,mol^{-1}}$ for a reaction that releases one proton, which is why enzymes whose reactions release or take up protons have pH-dependent equilibria as well as pH-dependent rates.
:::
:::

::: exercise The efficiency of oxidative phosphorylation {level=3 check="59"}
Oxidation of NADH by $\mathrm{O_2}$ has $\Delta_\mathrm{r}G^{\circ\prime} = -219.2\ \mathrm{kJ\,mol^{-1}}$ ([[#ex-nadh-o2]]). Mitochondria make 2.5 ATP per NADH. (a) Using a cellular phosphorylation potential of $52\ \mathrm{kJ\,mol^{-1}}$, calculate the percentage of the free energy of NADH oxidation conserved in ATP. (b) Explain why the standard value for NADH oxidation is a reasonable approximation here, and what would change if actual concentrations were used. (Enter the percentage to two significant figures.)
::: solution
(a) Conserved: $2.5 \times 52 = 130\ \mathrm{kJ}$ per mole of NADH. Efficiency $= 130/219.2 = 0.593$, i.e. $59\ \%$. (b) In the mitochondrial matrix the free $\mathrm{NAD^+/NADH}$ ratio is much lower than in the cytosol (of order 10), which by [[#eq-nernst]] makes $E'(\mathrm{NAD^+/NADH})$ about $0.030\ \mathrm{V}$ *less* negative than $E^{\circ\prime}$, while the oxygen potential falls a little at the low $p(\mathrm{O_2})$ inside cells. Both effects shrink $\Delta E'$ slightly. Each $30\ \mathrm{mV}$ is $2 \times 96\,485 \times 0.030 = 5.8\ \mathrm{kJ\,mol^{-1}}$ for $n = 2$, under 3 % of $219\ \mathrm{kJ\,mol^{-1}}$, so the efficiency estimate rises by only a few percentage points; the standard value is good to that accuracy. The remaining 40 % is dissipated as heat — a loss that keeps the flux running forwards at a useful rate, since a machine at 100 % efficiency would be at equilibrium and run infinitely slowly.
:::
:::

::: exercise Phosphocreatine during exercise {level=3 check="414"}
In the muscle of [[#ex-creatine]] ($K' = 127$ at $310\ \mathrm{K}$, $[\mathrm{ATP}]$ held at $8.0\ \mathrm{mmol\,dm^{-3}}$), vigorous exercise lowers phosphocreatine to $5\ \mathrm{mmol\,dm^{-3}}$ and raises creatine to $33\ \mathrm{mmol\,dm^{-3}}$ (the total is conserved). (a) Calculate the new free ADP concentration, assuming creatine kinase keeps its reaction at equilibrium. (b) By how much does the phosphorylation potential change, at constant $[\mathrm{P_i}]$? (Enter the free ADP concentration in $\mu\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: hint
Use $[\mathrm{ADP}] = [\mathrm{Cr}][\mathrm{ATP}]/(K'[\mathrm{PCr}])$, keeping more digits of $K'$ ($127.4$), and compare the logarithms of the old and new ADP concentrations.
:::
::: solution
(a) $[\mathrm{ADP}] = (33)(8.0)/(127.4 \times 5) = 0.414\ \mathrm{mmol\,dm^{-3}} = 414\ \mu\mathrm{mol\,dm^{-3}}$, up from $33\ \mu\mathrm{mol\,dm^{-3}}$ at rest. (b) The ratio is $414/32.6 = 12.7$; $\Delta_\mathrm{r}G'$ for ATP hydrolysis rises (becomes less negative) by $RT\ln 12.7 = 2.579 \times 2.54 = 6.6\ \mathrm{kJ\,mol^{-1}}$. ATP itself has hardly changed — that is the buffering — but the twelvefold rise in free ADP is a strong signal: ADP (and the AMP made from it by adenylate kinase) activates glycolysis and mitochondrial respiration, so the cell responds to a falling phosphorylation potential by making ATP faster. In (b) we treated phosphate as constant; in reality it rises too, as phosphocreatine is hydrolysed, adding to the change.
:::
:::
