Add aqueous ammonia drop by drop to a pale green solution of nickel(II) sulfate. The colour deepens through blue-green to a rich violet-blue as ammonia molecules replace water one at a time, and the solution ends up as a mixture dominated by $\mathrm{[Ni(NH_3)_5(H_2O)]^{2+}}$ and $\mathrm{[Ni(NH_3)_6]^{2+}}$. Now repeat the experiment with ethane-1,2-diamine. Only three molecules are needed to replace all six waters, and at the same total concentration of nitrogen donors the nickel is bound about ten thousand million times more tightly. Two amine nitrogens are two amine nitrogens, whether or not a $\mathrm{CH_2CH_2}$ bridge joins them; what does the bridge add?

This chapter makes the stability of complexes quantitative. It defines stepwise and overall formation constants and shows how to calculate the distribution of species in solution; it explains why successive constants decrease; and it analyses the three effects that dominate the design of ligands in analytical chemistry, medicine and hydrometallurgy: the **chelate effect**, the **macrocyclic effect** and **hard–soft** matching of metal and ligand. It also explains the **Irving–Williams series**, an order of stability that holds for almost any ligand with the first-row dications, and shows how complexation shifts redox potentials. Throughout, "stability" means thermodynamic stability, an equilibrium constant. How fast a complex forms or exchanges ligands is a separate question, answered in [[coordination-chemistry/inorganic-mechanisms]].

## Formation constants

In water a metal ion is already a complex, $\mathrm{[M(H_2O)_6]^{n+}}$, and complex formation is the stepwise replacement of water by another ligand. Water is the solvent, so its activity is taken as 1 and it is omitted from the equilibrium expressions.

::: definition Stepwise and overall formation constants {#def-formation}
For the stepwise reactions $\mathrm{ML_{n-1} + L \rightleftharpoons ML_n}$ (charges and coordinated water omitted), the **stepwise formation constants** are
$$
K_n = \frac{[\mathrm{ML}_n]}{[\mathrm{ML}_{n-1}][\mathrm{L}]}, \qquad n = 1, 2, \dots, N,
$$
and the **overall formation constants** for $\mathrm{M} + n\mathrm{L} \rightleftharpoons \mathrm{ML}_n$ are
$$
\beta_n = \frac{[\mathrm{ML}_n]}{[\mathrm{M}][\mathrm{L}]^n} = K_1K_2\cdots K_n, \qquad \log\beta_n = \sum_{i=1}^{n}\log K_i.
$$ {#eq-beta}
Concentrations are in $\mathrm{mol\,dm^{-3}}$ relative to $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, so the constants are dimensionless numbers that depend on this choice of standard state. Tabulated values (for instance in the IUPAC and NIST critically selected compilations of Martell and Smith) refer to a stated temperature and ionic strength, because activity coefficients are not unity; they are concentration quotients at that ionic strength. The standard Gibbs energy of formation of $\mathrm{ML}_n$ is $\Delta G^\circ = -RT\ln\beta_n$.
:::

For nickel(II) with ammonia, Jannik Bjerrum's classic measurements give $\log K_1$ to $\log K_6 \approx 2.80, 2.24, 1.73, 1.19, 0.75, 0.03$, so $\log\beta_n = 2.80$, $5.04$, $6.77$, $7.96$, $8.71$ and $8.74$. Each successive constant is smaller than the one before. Some of that decrease is simply counting.

::: proposition The statistical ratio of successive constants {#prop-statistical}
If a metal has $N$ equivalent sites and the intrinsic affinity of each site for L does not depend on how many are already filled, then
$$
\frac{K_n}{K_{n+1}} = \frac{(N - n + 1)(n + 1)}{n(N - n)}.
$$ {#eq-statistical}
For $N = 6$, the ratios $K_1/K_2, \dots, K_5/K_6$ are $2.40$, $1.88$, $1.78$, $1.88$, $2.40$, a decrease in $\log K$ of only $0.25$–$0.38$ per step.
:::

::: proof
Let $k_\mathrm{f}$ and $k_\mathrm{b}$ be the rate constants for binding L at one particular vacant site and losing it from one particular occupied site (any per-site constants would do; only their ratio matters). In $\mathrm{ML}_{n-1}$ there are $N - n + 1$ vacant sites (that is, sites holding water) at which L can enter, and in $\mathrm{ML}_n$ there are $n$ ligands L, any of which can leave. At equilibrium, forward and backward rates balance:
$$
(N - n + 1)k_\mathrm{f}[\mathrm{ML}_{n-1}][\mathrm{L}] = n\,k_\mathrm{b}[\mathrm{ML}_n]
\quad\Longrightarrow\quad
K_n = \frac{N - n + 1}{n}\cdot\frac{k_\mathrm{f}}{k_\mathrm{b}}.
$$
Then $K_n/K_{n+1} = \dfrac{(N - n + 1)/n}{(N - n)/(n + 1)} = \dfrac{(N - n + 1)(n + 1)}{n(N - n)}$. Substituting $N = 6$, $n = 1$: $6 \times 2/(1 \times 5) = 2.40$; $n = 2$: $5 \times 3/(2 \times 4) = 1.875$; $n = 3$: $4 \times 4/(3 \times 3) = 1.78$; and by symmetry the same values in reverse. The argument is independent of the kinetics: it is equivalent to counting the number of distinguishable ways each species can be formed, which is the configurational entropy difference between successive complexes.
:::

::: example Nickel ammines: statistics and more {#ex-ni-ammines}
Compare the observed differences $\log K_n - \log K_{n+1}$ for $\mathrm{Ni^{2+}}$ and $\mathrm{NH_3}$ with the statistical predictions, and explain any excess.
::: solution
Observed: $2.80 - 2.24 = 0.56$, $2.24 - 1.73 = 0.51$, $1.73 - 1.19 = 0.54$, $1.19 - 0.75 = 0.44$, $0.75 - 0.03 = 0.72$. Statistical ([[#prop-statistical]]): $\log 2.40 = 0.38$, $\log 1.875 = 0.27$, $\log 1.78 = 0.25$, $0.27$, $0.38$. The observed decreases are larger by about $0.2$–$0.3$ per step, and the last step much more. The excess has several sources: each coordinated ammonia makes the metal less positive and therefore a weaker Lewis acid for the next; ligand–ligand repulsion grows as the coordination sphere fills; and the hydration of the complex changes as water is removed from it. The sudden drop at the sixth step reflects crowding of six ammonias (each with three N–H bonds that interact with second-sphere water) around a small $3d$ ion. A step much larger than statistical often signals a change of geometry or spin; the third step of copper(II) with en ([[coordination-chemistry/crystal-field-theory#ex-jahn-teller]]) is the classic case, and mercury(II), which prefers linear two-coordination, shows a large drop between $K_2$ and $K_3$ with most ligands.
:::
:::

### Speciation

Given the constants and the free ligand concentration $[\mathrm{L}]$, the fraction of the metal present as each species follows directly from [[#eq-beta]]:
$$
\alpha_n = \frac{[\mathrm{ML}_n]}{c_\mathrm{M}} = \frac{\beta_n[\mathrm{L}]^n}{\sum_{i=0}^{N}\beta_i[\mathrm{L}]^i}, \qquad \beta_0 = 1,
$$ {#eq-alpha}
and the average number of ligands bound, the **formation function** of Bjerrum, is $\bar n = \sum_n n\alpha_n$. Bjerrum determined stepwise constants by measuring $\bar n$ as a function of $[\mathrm{L}]$ (from the pH, since free ammonia is in equilibrium with ammonium) and fitting the curve.

::: widget plot
f: 1/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(2.8+1*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(5.04+2*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(6.77+3*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(7.96+4*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(8.71+5*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x))); exp(2.302585*(8.74+6*x))/(1 + exp(2.302585*(2.8+1*x)) + exp(2.302585*(5.04+2*x)) + exp(2.302585*(6.77+3*x)) + exp(2.302585*(7.96+4*x)) + exp(2.302585*(8.71+5*x)) + exp(2.302585*(8.74+6*x)))
x: -5, 1
y: 0, 1
labels: \mathrm{Ni^{2+}}; \mathrm{[Ni(NH_3)]^{2+}}; \mathrm{[Ni(NH_3)_2]^{2+}}; \mathrm{[Ni(NH_3)_3]^{2+}}; \mathrm{[Ni(NH_3)_4]^{2+}}; \mathrm{[Ni(NH_3)_5]^{2+}}; \mathrm{[Ni(NH_3)_6]^{2+}}
caption: Distribution of nickel(II) among its seven ammine species against $x = \log_{10}([\mathrm{NH_3}]/\mathrm{mol\,dm^{-3}})$, the free ammonia concentration, from [[#eq-alpha]] with Bjerrum's $\log\beta_n$ ($2.80$, $5.04$, $6.77$, $7.96$, $8.71$, $8.74$). Each intermediate species reaches its maximum where $[\mathrm{L}] = (K_nK_{n+1})^{-1/2}$, and because successive constants are close together, no intermediate species ever accounts for much more than half of the nickel (the mono- and tetraammines peak at 47 % and 42 %): a nickel ammine solution is always a mixture. Even in $1\ \mathrm{mol\,dm^{-3}}$ free ammonia ($x = 0$) the hexaammine is only 47 % of the total, with 44 % pentaammine. Compare chelating ligands, whose larger and more widely spaced constants give much cleaner speciation.
:::

::: example How much nickel is free? {#ex-speciation}
In a solution with free ammonia concentration $0.100\ \mathrm{mol\,dm^{-3}}$ (held by an ammonia/ammonium buffer), find the fraction of nickel(II) present as $\mathrm{[Ni(H_2O)_6]^{2+}}$, as $\mathrm{[Ni(NH_3)_4]^{2+}}$, and the average number of ammonias bound.
::: solution
Compute $\beta_n[\mathrm{L}]^n$ with $[\mathrm{L}] = 0.100$: $n = 0$: 1; $n = 1$: $10^{2.80-1} = 63.1$; $n = 2$: $10^{5.04-2} = 1096$; $n = 3$: $10^{3.77} = 5888$; $n = 4$: $10^{3.96} = 9120$; $n = 5$: $10^{3.71} = 5129$; $n = 6$: $10^{2.74} = 550$. The sum is $21\,847$. Then $\alpha_0 = 1/21\,847 = 4.6\times10^{-5}$, so only 0.005 % of the nickel is the aqua ion; $\alpha_4 = 9120/21\,847 = 0.417$. The other fractions are $\alpha_1 = 0.003$, $\alpha_2 = 0.050$, $\alpha_3 = 0.270$, $\alpha_5 = 0.235$ and $\alpha_6 = 0.025$, and $\bar n = \sum n\alpha_n = 3.91$. The answer to "what is the formula of the nickel ammine complex?" in this solution is that there is no single one.
:::
:::

## The chelate effect

::: definition Chelate effect {#def-chelate-effect}
The **chelate effect** is the greater thermodynamic stability of a complex containing chelate rings than of an analogous complex of monodentate ligands with the same donor atoms: for example, $\log\beta_3 = 18.3$ for $\mathrm{[Ni(en)_3]^{2+}}$ against $\log\beta_6 = 8.74$ for $\mathrm{[Ni(NH_3)_6]^{2+}}$. It is measured by the equilibrium constant of the exchange reaction, here
$$
\mathrm{[Ni(NH_3)_6]^{2+} + 3\,en \rightleftharpoons [Ni(en)_3]^{2+} + 6\,NH_3}, \qquad \log K = 18.3 - 8.74 = 9.6.
$$
:::

Comparisons are fairest when the donor atoms are chemically as similar as possible, so that the enthalpy of the M–N bonds is the same. Methylamine, a primary amine like each end of en, is a better comparison than ammonia. The classic data set is for cadmium(II):

| complex | $\log\beta$ | $\Delta H^\circ$ / $\mathrm{kJ\,mol^{-1}}$ | $\Delta S^\circ$ / $\mathrm{J\,K^{-1}\,mol^{-1}}$ | $\Delta G^\circ$ / $\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|---|---|
| $\mathrm{[Cd(NH_2CH_3)_4]^{2+}}$ | 6.55 | $-57.3$ | $-67.3$ | $-37.4$ |
| $\mathrm{[Cd(en)_2]^{2+}}$ | 10.62 | $-56.5$ | $+14.1$ | $-60.6$ |

The enthalpies are almost identical: four Cd–N bonds to primary amines are four Cd–N bonds. The difference of four powers of ten in $\beta$ is entirely entropic.

::: proposition Origin of the chelate effect {#prop-chelate}
For the replacement of $2m$ monodentate ligands by $m$ bidentate ligands with similar donor atoms, $\Delta H^\circ \approx 0$, and the chelate effect arises from the entropy term. Two equivalent descriptions:

1. **Translational entropy**: the overall reaction releases more independent molecules than it consumes, $\mathrm{[ML_{2m}] + m\,\mathrm{LL} \rightarrow [M(LL)_m] + 2m\,\mathrm{L}}$, a net gain of $m$ particles, each worth roughly $R\ln(c_\mathrm{eff}/c^\circ)$ of entropy at standard concentration.
2. **Effective concentration**: once one end of a chelating ligand is bound, the second donor atom is confined to a small volume near the metal, where its effective concentration is of order
$$
c_\mathrm{eff} \approx \frac{1}{N_\mathrm{A}V}, \qquad V \approx \tfrac43\pi r^3,
$$ {#eq-ceff}
with $r$ the distance over which the free end can move. For $r \approx 300\ \mathrm{pm}$, $c_\mathrm{eff} \approx 15\ \mathrm{mol\,dm^{-3}}$, far higher than the concentration of a monodentate ligand in a typical solution.
:::

::: proof
Write the formation of the chelate as two steps: binding of the first donor (similar to a monodentate ligand, constant $K_\mathrm{mono}$) and ring closure (intramolecular, a first-order process with dimensionless constant $K_\mathrm{ring}$). The overall constant is $K_\mathrm{chel} = K_\mathrm{mono}K_\mathrm{ring}$. The corresponding second monodentate ligand has constant $K_\mathrm{mono}'$ (in $\mathrm{dm^3\,mol^{-1}}$ before division by $c^\circ$) and appears in the equilibrium multiplied by its free concentration $[\mathrm{L}]$. Ring closure is like a binding step at a fixed local concentration $c_\mathrm{eff}$: $K_\mathrm{ring} \approx K_\mathrm{mono}'c_\mathrm{eff}$, if the bond formed is the same. So the chelate beats the second monodentate ligand whenever $c_\mathrm{eff} > [\mathrm{L}]$. For the estimate of $c_\mathrm{eff}$: one molecule in a sphere of radius $r = 3.0\times10^{-10}\ \mathrm{m}$ occupies $V = \tfrac43\pi(3.0\times10^{-10})^3 = 1.13\times10^{-28}\ \mathrm{m^3}$, and $1/(N_\mathrm{A}V) = 1/(6.022\times10^{23} \times 1.13\times10^{-28}) = 1.47\times10^{4}\ \mathrm{mol\,m^{-3}} = 14.7\ \mathrm{mol\,dm^{-3}}$. In the thermodynamic language of the first statement: ring closure loses much less entropy than bringing in a second molecule from solution, because the free end of the bound ligand has already given up its translational freedom. The saving, per ring, is of order $R\ln(c_\mathrm{eff}/c^\circ) = R\ln 15 \approx 22\ \mathrm{J\,K^{-1}\,mol^{-1}}$, minus the loss of internal rotation in the ligand backbone when the ring forms.
:::

::: example The cadmium data in terms of entropy {#ex-chelate-cd}
(a) Check that the $\Delta G^\circ$ values in the cadmium table agree with the $\log\beta$ values at $298\ \mathrm{K}$. (b) Find $\log K$, $\Delta H^\circ$ and $\Delta S^\circ$ for $\mathrm{[Cd(NH_2CH_3)_4]^{2+} + 2\,en \rightleftharpoons [Cd(en)_2]^{2+} + 4\,NH_2CH_3}$. (c) Compare $\Delta S^\circ$ with the estimate of [[#prop-chelate]].
::: solution
(a) $\Delta G^\circ = -RT\ln\beta = -(8.314)(298.15)(2.3026)\log\beta\ \mathrm{J\,mol^{-1}} = -5.708\log\beta\ \mathrm{kJ\,mol^{-1}}$: $-5.708 \times 6.55 = -37.4$ and $-5.708 \times 10.62 = -60.6\ \mathrm{kJ\,mol^{-1}}$. Also $\Delta H^\circ - T\Delta S^\circ = -57.3 - 298.15(-0.0673) = -37.2$ and $-56.5 - 298.15(0.0141) = -60.7$, consistent within rounding. (b) Subtract: $\log K = 10.62 - 6.55 = 4.07$; $\Delta H^\circ = -56.5 - (-57.3) = +0.8\ \mathrm{kJ\,mol^{-1}}$; $\Delta S^\circ = 14.1 - (-67.3) = +81.4\ \mathrm{J\,K^{-1}\,mol^{-1}}$. (c) Two rings form and the reaction releases two extra molecules, so the estimate is $2 \times 22 \approx 45\ \mathrm{J\,K^{-1}\,mol^{-1}}$ from translational entropy alone. The observed value is larger, partly because methylamine molecules released into water bring hydration changes and partly because the simple sphere model of $c_\mathrm{eff}$ is crude. The essential point stands: at equal enthalpy, $81\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 298\ \mathrm{K} = 24\ \mathrm{kJ\,mol^{-1}}$ of entropy drives four orders of magnitude of extra stability.
:::
:::

::: warning The size of the chelate effect depends on the standard state {#warn-standard-state}
Arthur Adamson pointed out in 1954 that part of the chelate effect is an artefact of choosing $1\ \mathrm{mol\,dm^{-3}}$ as the standard concentration. The exchange constant in [[#def-chelate-effect]] has more molecules on the right than on the left, so its numerical value changes if concentrations are expressed differently. If mole fractions are used (pure water is $55.5\ \mathrm{mol\,dm^{-3}}$), every extra particle released multiplies the constant by $55.5$, changing $\log K$ by $1.74$ per particle. For the nickel exchange, which releases three extra particles, the "chelate effect" would shrink from $9.6$ to $9.6 - 3 \times 1.74 = 4.4$ log units, still large but much less dramatic. The *physical* effect, that chelating ligands win at the dilute concentrations at which they are used, is real and is exactly the $c_\mathrm{eff} \gg [\mathrm{L}]$ condition of [[#prop-chelate]]. But comparing $\log\beta$ values of complexes with different numbers of ligands as if they measured bond strength is a mistake.
:::

Ring size matters. Five-membered chelate rings (en, oxalate, glycinate, EDTA) are the most stable for metals of ordinary size, whose bite angle near $85^\circ$ suits the $90^\circ$ of an octahedron. Six-membered rings (propane-1,3-diamine, acac) suit smaller metal ions better, and four- and seven-membered rings are strained or lose too much conformational entropy. Each additional chelate ring adds stability, which is why **EDTA**$^{4-}$, a hexadentate ligand forming five five-membered rings, binds almost every metal ion with $\log K$ between 8 and 25. Relative to the metal's size, Robert Hancock showed that five-membered rings favour large metal ions and six-membered rings small ones, which allows ligands to be designed for size selectivity.

### The macrocyclic effect

A **macrocycle** is a cyclic polydentate ligand, such as the tetraamine cyclam (1,4,8,11-tetraazacyclotetradecane), the crown ethers or the porphyrins. Macrocyclic complexes are more stable still than open-chain chelates with the same donors: copper(II) with cyclam has $\log K \approx 27$, against about 24 for the open-chain tetraamine with the same sequence of ring sizes. Dale Cabbiness and Dale Margerum identified this **macrocyclic effect** in 1969. Its origin is partly entropic (the macrocycle is already organised in roughly the conformation it needs, so less conformational freedom is lost on binding, an idea called **preorganisation**) and partly enthalpic (the donors of a free macrocycle are less solvated, because they point inwards). Macrocycles are also *kinetically* inert: to remove the metal, several bonds must break at once, and the ligand cannot unwrap one end at a time. The porphyrin of haem and the corrin of vitamin $\mathrm{B_{12}}$ are nature's macrocycles ([[coordination-chemistry/bioinorganic]]); the crown ethers and cryptands of Pedersen, Lehn and Cram extended the idea to alkali metal ions and founded supramolecular chemistry.

## Which metal, which ligand?

### The Irving–Williams series

In 1953 Harry Irving and Robert Williams pointed out that, for almost any ligand, the stabilities of complexes of the high-spin first-row dications fall in the order
$$
\mathrm{Mn^{2+}} < \mathrm{Fe^{2+}} < \mathrm{Co^{2+}} < \mathrm{Ni^{2+}} < \mathrm{Cu^{2+}} > \mathrm{Zn^{2+}}.
$$
For ethane-1,2-diamine, for example, $\log K_1$ is about $2.7$ (Mn), $4.3$ (Fe), $5.9$ (Co), $7.5$ (Ni), $10.5$ (Cu) and $5.7$ (Zn).

::: widget plot
f: 2.73 + 1.96*(x - 5) - 3.3*((x-8)+abs(x-8))/2
x: 4.5, 10.5
y: 0, 12
points: 5,2.73; 6,4.34; 7,5.89; 8,7.52; 9,10.55; 10,5.71
labels: \text{trend line: } d^5\to d^8\text{, then falling}
caption: The Irving–Williams series for $\log K_1$ of ethane-1,2-diamine with the first-row dications from $\mathrm{Mn^{2+}}$ ($d^5$, $x = 5$) to $\mathrm{Zn^{2+}}$ ($d^{10}$, $x = 10$) (dots, values from the NIST critically selected compilation, $25\ ^\circ\mathrm{C}$, rounded). The rise from manganese to nickel follows the shrinking ionic radius and the growing octahedral CFSE ($0$, $0.4$, $0.8$, $1.2\Delta_\mathrm{o}$ from $d^5$ to $d^8$ in [[coordination-chemistry/crystal-field-theory]]); the line is only a guide. Copper(II) lies well above the line, the extra stability coming from its Jahn–Teller distortion, which lets it bind the four strongest in-plane donors very tightly. Zinc(II), with no CFSE, falls back. The same shape appears for oxalate, glycinate, EDTA, and the metal-binding sites of proteins, which is why copper and zinc tend to outcompete other metals for protein sites, and why cells must control metal availability.
:::

The series is a consequence of two effects acting together: the steady decrease in ionic radius across the period ($\mathrm{Mn^{2+}}$ 83 pm to $\mathrm{Ni^{2+}}$ 69 pm, Shannon high-spin six-coordinate radii), which strengthens every electrostatic and covalent interaction, and the additional CFSE that the ligand gains over water, which grows to $d^8$ and is zero at $d^5$ and $d^{10}$. The ligand usually lies higher in the spectrochemical series than water, so complexation increases $\Delta_\mathrm{o}$ and the CFSE gain is proportional to the CFSE itself. Copper's lead is set by its Jahn–Teller distortion.

### Hard and soft acids and bases

The Irving–Williams series concerns one row of metals. Across the periodic table a broader regularity governs which donor atoms a metal prefers. Sten Ahrland, Joseph Chatt and Nigel Davies (1958) divided metal ions into **class a**, which bind most strongly to the lightest donor atom of each group ($\mathrm{F > Cl > Br > I}$, $\mathrm{O \gg S}$, $\mathrm{N \gg P}$), and **class b**, which show the reverse ($\mathrm{I > Br > Cl > F}$, $\mathrm{S > O}$, $\mathrm{P > N}$). Ralph Pearson (1963) generalised this as **hard** and **soft** acids and bases ([[main-group/inorganic-acids-bases]]).

::: proposition Hard–soft matching (empirical) {#prop-hsab}
Hard acids (small, highly charged, weakly polarisable metal ions: $\mathrm{H^+}$, the alkali and alkaline-earth metals, $\mathrm{Al^{3+}}$, $\mathrm{Ln^{3+}}$, $\mathrm{Ti^{4+}}$, $\mathrm{Cr^{3+}}$, $\mathrm{Fe^{3+}}$, $\mathrm{Co^{3+}}$) form their most stable complexes with hard bases ($\mathrm{F^-}$, $\mathrm{OH^-}$, $\mathrm{H_2O}$, carboxylates, phosphate, $\mathrm{NH_3}$). Soft acids (large, low-charged, polarisable ions with filled or nearly filled $d$ shells: $\mathrm{Cu^+}$, $\mathrm{Ag^+}$, $\mathrm{Au^+}$, $\mathrm{Hg^{2+}}$, $\mathrm{Cd^{2+}}$, $\mathrm{Pd^{2+}}$, $\mathrm{Pt^{2+}}$) prefer soft bases ($\mathrm{I^-}$, $\mathrm{SCN^-}$ (S), $\mathrm{RS^-}$, $\mathrm{R_2S}$, $\mathrm{PR_3}$, $\mathrm{CN^-}$, CO). Borderline ions include $\mathrm{Fe^{2+}}$, $\mathrm{Co^{2+}}$, $\mathrm{Ni^{2+}}$, $\mathrm{Cu^{2+}}$, $\mathrm{Zn^{2+}}$ and $\mathrm{Pb^{2+}}$. This is a classification of observed stabilities, not a theorem, and it compares preferences, not absolute strengths.
:::

The halide complexes show the two classes cleanly. For $\mathrm{Fe^{3+}}$ (hard), $\log K_1$ falls from about 5 for fluoride to about 1.5 for chloride and below 1 for bromide; for $\mathrm{Hg^{2+}}$ (soft), $\log K_1$ rises from about 1.0 for fluoride through 6.7 (chloride) and 8.9 (bromide) to 12.9 for iodide. Hardness correlates with bonding type: hard–hard interactions are dominated by electrostatics (and are often entropy-driven in water, through the release of ordered hydration water), soft–soft interactions by covalency (and are enthalpy-driven).

::: example Designing for selectivity {#ex-hsab}
Explain (a) why mercury and cadmium are toxic in part because they bind to cysteine thiolate groups in proteins; (b) why dimercaprol (2,3-dimercaptopropan-1-ol, British anti-Lewisite) was developed as an antidote to arsenic and mercury poisoning; (c) why EDTA cannot be used to extract a soft metal selectively from a solution rich in calcium and magnesium, whereas a thiolate chelator can.
::: solution
(a) $\mathrm{Hg^{2+}}$ and $\mathrm{Cd^{2+}}$ are soft acids, and a cysteine thiolate ($\mathrm{RS^-}$) is a soft base. They bind very strongly to the cysteine residues of enzymes and structural proteins, displacing native zinc (borderline) or blocking active sites. (b) Dimercaprol has two adjacent thiol groups that form a five-membered chelate ring with the soft metal or with arsenic(III), combining hard–soft matching with the chelate effect to outcompete the protein thiols; the complex is then excreted. (Antidotes are given only under medical supervision; this is a description of mechanism, not of treatment.) (c) EDTA's donors are four carboxylates and two amines, hard and borderline bases. It binds calcium ($\log K = 10.65$) and magnesium ($8.79$) strongly, so in a hard-water matrix much of it is consumed by these ions. A soft chelator with sulfur donors binds $\mathrm{Ca^{2+}}$ and $\mathrm{Mg^{2+}}$ hardly at all and so can pick out the soft metal selectively. The same reasoning lies behind the design of sulfur-containing sequestrants in hydrometallurgy and of the selective reagents of [[analytical-chemistry/classical-analysis]].
:::
:::

::: quiz
Which complex in each pair should have the larger formation constant? Select the correct choices.
- [x] $\mathrm{[AlF_6]^{3-}}$ rather than $\mathrm{[AlI_6]^{3-}}$
- [ ] $\mathrm{[HgF_4]^{2-}}$ rather than $\mathrm{[HgI_4]^{2-}}$
- [x] $\mathrm{[Cu(en)_2]^{2+}}$ rather than $\mathrm{[Cu(NH_3)_4]^{2+}}$
- [x] $\mathrm{[Ni(en)]^{2+}}$ rather than $\mathrm{[Mn(en)]^{2+}}$
::: solution
$\mathrm{Al^{3+}}$ is hard and prefers fluoride; $\mathrm{Hg^{2+}}$ is soft and prefers iodide (so the second statement is wrong). The bis(en) complex has two chelate rings and wins by the chelate effect at equal donor atoms. Nickel is above manganese in the Irving–Williams series.
:::
:::

## Conditional constants and competing equilibria

In real solutions the free ligand and free metal take part in other equilibria, above all protonation of the ligand. EDTA is the tetraprotic (strictly hexaprotic) acid $\mathrm{H_4Y}$ with $\mathrm{p}K_\mathrm{a}$ values of about 0.0, 1.5, 2.0, 2.69, 6.13 and 10.37 (Harris), and only the fully deprotonated $\mathrm{Y^{4-}}$ binds metals strongly. If $\alpha_{\mathrm{Y^{4-}}}$ is the fraction of free EDTA present as $\mathrm{Y^{4-}}$ at a given pH, then the **conditional formation constant** is
$$
K_\mathrm{f}' = \frac{[\mathrm{MY^{n-4}}]}{[\mathrm{M^{n+}}]\,c_\mathrm{EDTA}} = \alpha_{\mathrm{Y^{4-}}}K_\mathrm{f},
$$ {#eq-conditional}
where $c_\mathrm{EDTA}$ is the total concentration of EDTA not bound to the metal. EDTA titrations are buffered for this reason ([[analytical-chemistry/classical-analysis]]).

::: example Calcium and EDTA at pH 10 {#ex-edta}
Find $\alpha_{\mathrm{Y^{4-}}}$ and the conditional formation constant of $\mathrm{CaY^{2-}}$ ($\log K_\mathrm{f} = 10.65$) at pH 10.00, and explain why the same titration would fail at pH 6.
::: solution
At pH 10 only the last two $\mathrm{p}K_\mathrm{a}$ values matter. With $[\mathrm{H^+}] = 1.0\times10^{-10}$, $K_6 = 10^{-10.37}$ and $K_5 = 10^{-6.13}$,
$$
\alpha_{\mathrm{Y^{4-}}} = \frac{1}{1 + [\mathrm{H^+}]/K_6 + [\mathrm{H^+}]^2/(K_5K_6)} = \frac{1}{1 + 10^{0.37} + 10^{-3.50}} = \frac{1}{1 + 2.344 + 0.0003} = 0.299.
$$
Then $K_\mathrm{f}' = 0.299 \times 10^{10.65} = 1.34\times10^{10}$ ($\log K_\mathrm{f}' = 10.13$), still very large, so the titration end point is sharp. At pH 6, $[\mathrm{H^+}]/K_6 = 10^{4.37}$ and $[\mathrm{H^+}]^2/(K_5K_6) = 10^{4.50}$, and $\alpha_{\mathrm{Y^{4-}}} \approx 10^{-4.8}$ (the earlier protonations add little), so $\log K_\mathrm{f}' \approx 5.9$: too small for a sharp end point. Metals with much larger $K_\mathrm{f}$ (copper(II), $\log K_\mathrm{f} = 18.8$) can still be titrated at low pH, which is the basis of selective titrations by pH control.
:::
:::

## Complexation and redox potentials

If a ligand binds one oxidation state of a metal more strongly than the other, it shifts the reduction potential of the couple. This is how cyanide makes gold dissolve in aerated water and how ammonia makes cobalt(II) easy to oxidise in air.

::: proposition Shift of a reduction potential by complexation {#prop-redox-shift}
For the couple $\mathrm{M^{(n+1)+}/M^{n+}}$ with standard potential $E^\circ_\mathrm{aq}$, and complexes $\mathrm{ML_N^{(n+1)+}}$ and $\mathrm{ML_N^{n+}}$ with overall formation constants $\beta^\mathrm{ox}$ and $\beta^\mathrm{red}$, the standard potential of the complexed couple at $298\ \mathrm{K}$ is
$$
E^\circ_\mathrm{complex} = E^\circ_\mathrm{aq} - \frac{RT}{F}\ln\frac{\beta^\mathrm{ox}}{\beta^\mathrm{red}} = E^\circ_\mathrm{aq} - 0.05916\ \mathrm{V}\,\log\frac{\beta^\mathrm{ox}}{\beta^\mathrm{red}}.
$$ {#eq-redox-shift}
The result holds for one-electron couples with the same number of ligands in both oxidation states and standard-state (1 mol dm⁻³) conventions throughout.
:::

::: proof
Write a thermodynamic cycle: $\mathrm{ML_N^{(n+1)+} \rightarrow M^{(n+1)+} + N\,L}$ ($\Delta G_1 = +RT\ln\beta^\mathrm{ox}$), then $\mathrm{M^{(n+1)+}} + e^- \rightarrow \mathrm{M^{n+}}$ ($\Delta G_2 = -FE^\circ_\mathrm{aq}$), then $\mathrm{M^{n+}} + N\,\mathrm{L} \rightarrow \mathrm{ML_N^{n+}}$ ($\Delta G_3 = -RT\ln\beta^\mathrm{red}$). The sum is the reduction of the complex, $\Delta G = -FE^\circ_\mathrm{complex}$, so
$$
-FE^\circ_\mathrm{complex} = RT\ln\beta^\mathrm{ox} - FE^\circ_\mathrm{aq} - RT\ln\beta^\mathrm{red},
$$
and dividing by $-F$ gives [[#eq-redox-shift]]. The factor $RT\ln10/F = 0.05916\ \mathrm{V}$ at $298.15\ \mathrm{K}$ ([[electrochemistry/cell-thermodynamics]]). A ligand that binds the oxidised form more strongly ($\beta^\mathrm{ox} > \beta^\mathrm{red}$) lowers the potential and stabilises the higher oxidation state.
:::

::: example Why cobalt(II) ammines oxidise in air {#ex-co-redox}
$E^\circ(\mathrm{Co^{3+}/Co^{2+}}) = +1.92\ \mathrm{V}$, but $E^\circ(\mathrm{[Co(NH_3)_6]^{3+}/[Co(NH_3)_6]^{2+}}) = +0.11\ \mathrm{V}$. (a) Find $\beta^\mathrm{III}/\beta^\mathrm{II}$ for the hexaammines. (b) Explain the result with crystal field theory. (c) Explain why $\mathrm{[Co(NH_3)_6]^{2+}}$ is oxidised by air ($E^\circ(\mathrm{O_2/H_2O}) = +1.23\ \mathrm{V}$ at pH 0, $+0.40\ \mathrm{V}$ at pH 14) while $\mathrm{[Co(H_2O)_6]^{2+}}$ is not.
::: solution
(a) $\log(\beta^\mathrm{III}/\beta^\mathrm{II}) = (1.92 - 0.11)/0.05916 = 30.6$: ammonia binds cobalt(III) about $10^{30.6}$ times more strongly than cobalt(II). (With $\log\beta_6(\mathrm{Co^{II}}) \approx 5$, $\log\beta_6(\mathrm{Co^{III}}) \approx 35$.) (b) Cobalt(III) is low-spin $d^6$, CFSE $-2.4\Delta_\mathrm{o}$ with a large $\Delta_\mathrm{o}$ ($22\,900\ \mathrm{cm^{-1}}$); cobalt(II) is high-spin $d^7$, CFSE only $-0.8\Delta_\mathrm{o}$ with a much smaller $\Delta_\mathrm{o}$. Cobalt(III) is also smaller and more highly charged. Both factors favour the higher oxidation state in the complex. (c) In ammoniacal solution (basic), $E^\circ(\mathrm{O_2}) = 0.40\ \mathrm{V}$ is well above $0.11\ \mathrm{V}$, so oxygen can oxidise $\mathrm{[Co(NH_3)_6]^{2+}}$, and it does, which is how Werner-type cobalt(III) ammines are prepared (with charcoal as catalyst). For the aqua ions, even at pH 0 the oxygen potential (1.23 V) is far below 1.92 V: aqueous cobalt(III) is instead a strong enough oxidant to oxidise water.
:::
:::

## Where this leads

Formation constants are the data behind complexometric titrations, masking agents and metal-ion indicators in [[analytical-chemistry/equilibria-in-analysis]], and the competition between metals for ligands described by the Irving–Williams series and hard–soft matching decides which metal sits in which protein ([[coordination-chemistry/bioinorganic]]). Thermodynamic stability is not kinetic inertness: $\mathrm{[Ni(CN)_4]^{2-}}$ has $\log\beta_4 \approx 30$ yet exchanges cyanide with the solution in seconds, while $\mathrm{[Co(NH_3)_6]^{3+}}$, which is thermodynamically unstable in acid, survives for days. The connection between the two is made in [[coordination-chemistry/inorganic-mechanisms]]. Electrochemical consequences of complexation, from the dissolution of gold in cyanide to the potentials of metalloproteins, use [[#eq-redox-shift]].

::: history
Jannik Bjerrum's 1941 thesis, *Metal Ammine Formation in Aqueous Solution*, introduced stepwise formation constants, the formation function $\bar n$ and the potentiometric methods for measuring them, and established the near-statistical spacing of successive constants. Gerold Schwarzenbach, in Zürich from the 1940s, introduced EDTA and the aminopolycarboxylates as analytical reagents and coined the term "chelate effect" for their extra stability (1952). Harry Irving and Robert Williams published their series in 1948 in *Nature* and in a full analysis in 1953 in the *Journal of the Chemical Society*. Sten Ahrland, Joseph Chatt and Nigel Davies's 1958 classification of class a and class b acceptors was generalised by Ralph Pearson as hard and soft acids and bases in 1963. Dale Cabbiness and Dale Margerum described the macrocyclic effect in 1969, and Charles Pedersen's 1967 crown ethers, followed by Jean-Marie Lehn's cryptands and Donald Cram's spherands, led to the 1987 Nobel Prize in Chemistry. Arthur Martell and Robert Smith's *Critical Stability Constants* (from 1974) and its successor NIST database remain the standard source of stability constants.
:::

::: summary
- Stepwise constants $K_n$ and overall constants $\beta_n = K_1\cdots K_n$ describe complex formation in water; $\Delta G^\circ = -RT\ln\beta_n$, and speciation follows from $\alpha_n = \beta_n[\mathrm{L}]^n/\sum\beta_i[\mathrm{L}]^i$.
- Successive constants decrease; for $N$ equivalent sites, statistics alone gives $K_n/K_{n+1} = (N - n + 1)(n + 1)/n(N - n)$, and larger drops signal charge, steric or geometric changes.
- The chelate effect is mainly entropic: ring closure occurs at an effective concentration of order $10\ \mathrm{mol\,dm^{-3}}$, and the replacement of monodentate by chelating ligands releases molecules. Its numerical size depends on the standard state.
- Five-membered chelate rings are generally most stable; macrocycles add preorganisation and kinetic inertness (the macrocyclic effect).
- For first-row dications the stability order is $\mathrm{Mn < Fe < Co < Ni < Cu > Zn}$ (Irving–Williams), from decreasing radius, CFSE and copper's Jahn–Teller distortion.
- Hard acids prefer hard (F, O, N) donors and soft acids soft (I, S, P, C) donors; this empirical rule guides selectivity in analysis, toxicology and hydrometallurgy.
- Protonation of the ligand gives conditional constants $K_\mathrm{f}' = \alpha K_\mathrm{f}$; complexation shifts redox potentials by $-0.05916\log(\beta^\mathrm{ox}/\beta^\mathrm{red})$ V.
:::

## Exercises

::: exercise An overall constant {level=1 check="6.77"}
Using Bjerrum's stepwise constants for nickel(II) and ammonia ($\log K_1 = 2.80$, $\log K_2 = 2.24$, $\log K_3 = 1.73$), find $\log\beta_3$. (Enter $\log\beta_3$.)
::: solution
$\log\beta_3 = 2.80 + 2.24 + 1.73 = 6.77$, so $\beta_3 = 5.9\times10^6$.
:::
:::

::: exercise A free energy from a formation constant {level=1 check="-60.6"}
Calculate $\Delta G^\circ$ at $298.15\ \mathrm{K}$ for the formation of $\mathrm{[Cd(en)_2]^{2+}}$, $\log\beta_2 = 10.62$. (Enter $\Delta G^\circ$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta G^\circ = -RT\ln10\,\log\beta_2 = -(8.314)(298.15)(2.3026)(10.62) = -6.06\times10^4\ \mathrm{J\,mol^{-1}} = -60.6\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Hard or soft? {level=1}
Predict which ligand binds more strongly in each case: (a) $\mathrm{Ag^+}$ with $\mathrm{NH_3}$ or $\mathrm{PPh_3}$; (b) $\mathrm{Fe^{3+}}$ with $\mathrm{F^-}$ or $\mathrm{Cl^-}$; (c) $\mathrm{Pt^{2+}}$ with $\mathrm{(CH_3)_2S}$ or $\mathrm{(CH_3)_2O}$; (d) $\mathrm{Mg^{2+}}$ with phosphate or thiolate.
::: solution
(a) $\mathrm{PPh_3}$: $\mathrm{Ag^+}$ is soft and phosphorus is a soft donor. (b) $\mathrm{F^-}$: $\mathrm{Fe^{3+}}$ is hard (fluoride is used to mask iron(III) in analysis). (c) The thioether: platinum(II) is soft, and sulfur donors (from methionine) are among its main targets in the body. (d) Phosphate: $\mathrm{Mg^{2+}}$ is hard, and in cells it is bound mainly to the phosphates of ATP and nucleic acids.
:::
:::

::: exercise The statistical factor {level=2 check="12/5"}
Derive the statistical ratio $K_1/K_2$ for a six-coordinate metal binding a monodentate ligand, and compare it with the ratio for a linear two-coordinate metal such as $\mathrm{Ag^+}$ ($N = 2$). (Enter $K_1/K_2$ for $N = 6$ as a fraction or decimal.)
::: solution
By [[#eq-statistical]] with $n = 1$: $K_1/K_2 = N \times 2/(1 \times (N - 1))$. For $N = 6$: $12/5 = 2.4$. For $N = 2$: $2 \times 2/(1 \times 1) = 4$. Silver(I) ammine has $\log K_1 = 3.3$ and $\log K_2 = 3.9$ (approximately), so $K_2 > K_1$, against the statistical expectation: the second ammonia completes the strongly favoured linear $\mathrm{[H_3N{-}Ag{-}NH_3]^+}$, and the first step is accompanied by a change in coordination of the aqua ion. Inversions like this are diagnostic of structural change.
:::
:::

::: exercise Nickel speciation {level=2 check="0.417"}
Using the $\log\beta_n$ for nickel(II) ammines, find the fraction of nickel present as $\mathrm{[Ni(NH_3)_4]^{2+}}$ when the free ammonia concentration is $0.100\ \mathrm{mol\,dm^{-3}}$, and the free ammonia concentration at which $\mathrm{[Ni(NH_3)_3]^{2+}}$ and $\mathrm{[Ni(NH_3)_4]^{2+}}$ are present in equal amounts. (Enter the fraction as $\mathrm{[Ni(NH_3)_4]^{2+}}$.)
::: solution
From [[#ex-speciation]], $\alpha_4 = 9120/21\,847 = 0.417$. The two species are equal when $K_4[\mathrm{NH_3}] = 1$, that is $[\mathrm{NH_3}] = 1/K_4 = 10^{-1.19} = 0.065\ \mathrm{mol\,dm^{-3}}$.
:::
:::

::: exercise EDTA and magnesium {level=2 check="7.4e-6"}
A solution is $0.0100\ \mathrm{mol\,dm^{-3}}$ in $\mathrm{MgY^{2-}}$ at pH 10.00 (no excess EDTA). Using $\log K_\mathrm{f}(\mathrm{MgY^{2-}}) = 8.79$ and $\alpha_{\mathrm{Y^{4-}}} = 0.299$, find the free $\mathrm{Mg^{2+}}$ concentration. (Enter $[\mathrm{Mg^{2+}}]$ in $\mathrm{mol\,dm^{-3}}$.)
::: hint
Dissociation gives equal concentrations of free $\mathrm{Mg^{2+}}$ and unbound EDTA ($x$ each).
:::
::: solution
$K_\mathrm{f}' = 0.299 \times 10^{8.79} = 1.84\times10^8$. With $x = [\mathrm{Mg^{2+}}] = c_\mathrm{EDTA}$ and $[\mathrm{MgY^{2-}}] \approx 0.0100$: $0.0100/x^2 = 1.84\times10^8$, so $x = \sqrt{0.0100/1.84\times10^8} = 7.4\times10^{-6}\ \mathrm{mol\,dm^{-3}}$. Only 0.07 % of the magnesium is free, which is what a complexometric end point requires.
:::
:::

::: exercise The Irving–Williams anomaly {level=2}
Using CFSE, explain why $\log K_1$ for en with $\mathrm{Zn^{2+}}$ ($5.7$) is lower than with $\mathrm{Ni^{2+}}$ ($7.5$), even though $\mathrm{Zn^{2+}}$ (74 pm) and $\mathrm{Ni^{2+}}$ (69 pm) have similar radii; and why $\mathrm{Cu^{2+}}$ ($10.5$) exceeds both.
::: solution
Zinc(II), $d^{10}$, has zero CFSE in any geometry, so it gains nothing when water is replaced by the stronger-field amine. Nickel(II), $d^8$, has CFSE $-1.2\Delta_\mathrm{o}$; replacing water ($\Delta_\mathrm{o} \approx 8500\ \mathrm{cm^{-1}}$) by en ($\approx 11\,500\ \mathrm{cm^{-1}}$ for $\mathrm{[Ni(en)_3]^{2+}}$) increases the CFSE by roughly $1.2 \times 3000/3 = 1200\ \mathrm{cm^{-1}}$ (about $14\ \mathrm{kJ\,mol^{-1}}$) for the first en, worth about 2.5 log units at $298\ \mathrm{K}$ — the right size to explain the difference. Copper(II) gains in addition from its Jahn–Teller elongation, which strengthens the four equatorial bonds where the first two en ligands bind; this gives it the highest $K_1$ and $K_2$ of the series, though, as [[coordination-chemistry/crystal-field-theory#ex-jahn-teller]] showed, a very small $K_3$.
:::
:::

::: exercise A ferroin potential {level=3 check="-4.89"}
The formal potential of the ferroin couple $\mathrm{[Fe(phen)_3]^{3+}/[Fe(phen)_3]^{2+}}$ in $1\ \mathrm{mol\,dm^{-3}}$ sulfuric acid is $+1.06\ \mathrm{V}$, against $+0.771\ \mathrm{V}$ for $\mathrm{Fe^{3+}/Fe^{2+}}$. (a) Find $\log(\beta^\mathrm{III}/\beta^\mathrm{II})$. (b) Explain in terms of the electronic structure of the two complexes why phen favours iron(II), whereas cyanide ($E^\circ(\mathrm{[Fe(CN)_6]^{3-/4-}}) = +0.36\ \mathrm{V}$) favours iron(III). (Enter $\log(\beta^\mathrm{III}/\beta^\mathrm{II})$ for phen, to three significant figures.)
::: hint
Use [[#eq-redox-shift]]: a higher potential means the reduced form is favoured.
:::
::: solution
(a) $\log(\beta^\mathrm{III}/\beta^\mathrm{II}) = (0.771 - 1.06)/0.05916 = -4.89$: phen binds iron(II) about $10^{4.9}$ times more strongly than iron(III). (b) Both complexes are low spin. $\mathrm{[Fe(phen)_3]^{2+}}$ is $t_{2g}^6$, with the maximum CFSE, and phen is a π acceptor, so the filled $t_{2g}$ set is further stabilised by back-donation into the phen $\pi^*$ orbitals ([[coordination-chemistry/ligand-field-mo]]); iron(III), $t_{2g}^5$, has one fewer electron to back-donate and is a harder acid that gains less from a neutral, soft aromatic amine. Cyanide is a π acceptor too, but it is an anion and a strong σ donor; six negative charges favour the more highly charged iron(III), and the electrostatic gain outweighs the back-bonding difference: $\log(\beta^\mathrm{III}/\beta^\mathrm{II}) = (0.771 - 0.36)/0.05916 = +6.9$. The sign of the shift therefore depends on the balance between electrostatics (favouring the higher charge) and π back-bonding (favouring the lower oxidation state). The large potential and the sharp red-to-pale-blue colour change make ferroin a classic redox indicator.
:::
:::

::: exercise How effective is effective concentration? {level=3 check="6.2"}
(a) Using [[#eq-ceff]], estimate $c_\mathrm{eff}$ if the free end of a chelating ligand can move within a sphere of radius $r = 400\ \mathrm{pm}$. (b) A solution contains $0.010\ \mathrm{mol\,dm^{-3}}$ free monodentate ligand. Estimate, in log units, how much more favourable ring closure is than binding a second monodentate ligand, assuming equal bond energies. (c) Why does the chelate effect fall off for longer chains? (Enter $c_\mathrm{eff}$ in $\mathrm{mol\,dm^{-3}}$, to two significant figures, for part (a).)
::: solution
(a) $V = \tfrac43\pi(4.0\times10^{-10}\ \mathrm{m})^3 = 2.68\times10^{-28}\ \mathrm{m^3}$, and $c_\mathrm{eff} = 1/(6.022\times10^{23} \times 2.68\times10^{-28}) = 6.2\times10^3\ \mathrm{mol\,m^{-3}} = 6.2\ \mathrm{mol\,dm^{-3}}$. (b) The ratio of effective to actual concentration is $6.2/0.010 = 620$, $\log 620 = 2.8$: ring closure is favoured by nearly three powers of ten at this ligand concentration (with $r = 300\ \mathrm{pm}$, $14.7/0.010$ gives $3.2$). (c) The accessible volume grows as $r^3$, so $c_\mathrm{eff}$ falls rapidly with chain length; in addition, a longer chain loses more internal rotational entropy when the ring closes, and large rings are strained in other ways (transannular interactions). Hence the optimum ring size of five or six.
:::
:::
