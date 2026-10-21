## Atoms, isotopes and atomic weight

Atoms are far too small to count individually: a single grain of salt, a fraction of a milligram, already holds about $10^{18}$ formula units. Chemistry therefore counts atoms the way a grocer counts rice — collectively, by mass. That strategy makes the periodic table into a table of conversion factors and makes the mole the workhorse unit of quantitative chemistry. This chapter begins with the nucleus — protons, neutrons, and the isotopes they produce — passes through the definition of the mole, and closes with the molar-mass loop that every calculation later in this course traverses.

Isotopes are what make atomic weights non-integer. Because neutrons vary while chemistry does not, every sample of an element is an almost-fixed mixture of isotopes, and the tabulated atomic weight is an abundance-weighted average of them.

::: definition Atomic number, mass number, isotopes {#def-atomic-structure}
The **atomic number** $Z$ is the proton count and defines the element. The **mass number** $A$ counts protons plus neutrons. **Isotopes** share $Z$ but differ in $N$: chemically identical, nuclearmatically different. Neutral atoms carry $Z$ electrons; ionic charge records electrons lost or gained. Because natural isotopic composition is nearly constant, tabulated atomic weights are well-defined weighted averages, not the mass of any single atom.
:::

## Average atomic mass

::: definition Weighted average of isotopes {#def-avg-mass}
The **average (relative) atomic mass** $A_r$ is $\sum_i f_i m_i$ over isotopes of mass $m_i$ and fractional abundance $f_i$. Chlorine ($^{35}\mathrm{Cl}$, $34.969\ \mathrm{u}$, $75.77\ \%$; $^{37}\mathrm{Cl}$, $36.966\ \mathrm{u}$, $24.23\ \%$) gives $35.45$. The value is a property of the natural mixture; high-precision work must correct for isotopic composition.
:::

::: example Chlorine's tabulated value {#ex-chlorine-avg}
Compute the average atomic mass of chlorine from $34.969\ \mathrm{u}$ at $75.77\ \%$ and $36.966\ \mathrm{u}$ at $24.23\ \%$.
::: solution
$$
0.7577\times34.969 + 0.2423\times36.966 = 35.45 .
$$
The tabulated $35.45$ is exactly this weighted sum. The result sits between the two isotope masses, weighted toward $35$ — an average over a natural mixture, never the mass of an individual atom.
:::

::: example Copper and its isotopes {#ex-copper-avg}
Copper: $^{63}\mathrm{Cu}$ ($62.930\ \mathrm{u}$, $69.17\ \%$) and $^{65}\mathrm{Cu}$ ($64.928\ \mathrm{u}$, $30.83\ \%$). Compute $A_r$.
::: solution
$0.6917\times62.930 + 0.3083\times64.928 = 63.55$. The table value. Note how the two numbers combine: $43.53 + 20.02 = 63.55$.
:::

## The mole and Avogadro's constant

::: definition The mole {#def-mole}
One **mole** is exactly $N_A = 6.022\,140\,76\times10^{23}$ specified entities, by the 2019 SI definition. The **molar mass** $M$ (in $\mathrm{g\,mol^{-1}}$) is numerically equal to the atomic or molecular mass in daltons. Convert with $n = m/M$ and $N = nN_A$. Because $N_A$ is exact, the uncertainty of molar masses comes entirely from the tabulated atomic weights.
:::

::: warning Three confusions
First, the mole counts entities — say what the entity is ("moles of atoms" versus "moles of molecules"). Second, $1\ \mathrm{u} = 1.66054\times10^{-24}\ \mathrm{g}$; the dalton–gram bridge is $N_A\times10^{-3}$, not a decimal prefix. Third, average atomic mass is a weighted mean of a mixture, not a fundamental constant; isotopic enrichment shifts it.
:::

::: example Molar-mass arithmetic {#ex-molar-mass}
Compute the number of molecules in $10.0\ \mathrm{g}$ of ethanol, $M = 46.07\ \mathrm{g\,mol^{-1}}$.
::: solution
$n = 10.0/46.07 = 0.217\ \mathrm{mol}$; $N = 0.217\times6.022\times10^{23} = 1.31\times10^{22}$ molecules. Every stoichiometry problem in later chapters is this chain extended across a balanced equation.
:::

## Percentage composition

::: example Percentage composition of glucose {#ex-glucose-pct}
Glucose is $\mathrm{C_6H_{12}O_6}$ ($M = 180.18$). Compute its percentage composition ($A_r$: C 12.011, H 1.008, O 15.999).
::: solution
$$
\%\mathrm{C} = \frac{72.066}{180.18}\times100 = 40.00\ \%,\quad
\%\mathrm{H} = \frac{12.096}{180.18}\times100 = 6.71\ \%,\quad
\%\mathrm{O} = \frac{95.994}{180.18}\times100 = 53.28\ \%.
$$
The percentages sum to $100$, as they must; every compound with empirical formula $\mathrm{CH_2O}$ shares them.
:::

::: quiz
Molar mass in $\mathrm{g\,mol^{-1}}$ and atomic mass in daltons share the same numerical value because:
- [ ] it is a coincidence of the meter–kilogram system
- [x] it is exact by construction of the dalton and the mole
- [ ] it differs by a factor of $N_A$
- [ ] it differs by a factor of 1000
::: solution
The dalton was defined so that atomic masses in u equal molar masses in $\mathrm{g\,mol^{-1}}$; the equality is by construction, inherited from the gram–dalton relation $N_A\times10^{-3}$. It held for the carbon-12 definition and became exact when the 2019 redefinition fixed $N_A$.
:::

## The mole loop

The final content section gathers the chapter's quantities into one diagram. Tabulated atomic weights serve as molar masses; molar mass converts grams to moles; the Avogadro constant converts moles to particles; percentage composition is a mass ratio that the formula fixes. Fluency is the ability to run the loop in either direction, and to know which conversion factor to reach for.

::: widget graph
nodes: isotopes; atomic weight; molar mass; amount (mol); mass (g); particles
edges: atomic weight-molar mass; molar mass-amount (mol); amount (mol)-particles; atomic weight-molar mass
caption: The chapter's quantities form one closed loop. Tabulated atomic weights are isotopic averages used as molar masses; molar mass converts grams to moles; the Avogadro constant converts moles to particles; percentage composition is a mass ratio read from the formula. Every problem in this chapter is a walk around this loop.
:::

::: summary
- The atomic number $Z$ fixes the element; isotopes vary $N$ and hence the nuclear mass.
- Tabulated atomic masses are abundance-weighted averages of isotopes — that is why they are not integers.
- One mole = exactly $6.022\,140\,76\times10^{23}$ entities (2019 SI definition).
- Molar mass in $\mathrm{g\,mol^{-1}}$ equals atomic/molecular mass in daltons; use it to convert grams and moles.
- Percentage composition is a property of the formula; empirical formula plus molar mass gives the molecular formula.
- Keep units on every factor, carry extra digits through intermediate steps, and round once at the end.
:::

## Exercises

::: exercise Subatomic bookkeeping {level=1 check="16 16 18"}
Give the numbers of protons, neutrons and electrons in the sulfide ion $\mathrm{S^{2-}}$ ($Z=16$, $A=32$).
::: solution
16 protons, 16 neutrons, 18 electrons; the $2-$ charge adds two electrons to the neutral count.
:::
:::

::: exercise Chlorine's weighted mean {level=1 check="35.45"}
Compute the average atomic mass from $34.969\ \mathrm{u}$ at $75.77\ \%$ and $36.966\ \mathrm{u}$ at $24.23\ \%$.
::: solution
$0.7577\times34.969 + 0.2423\times36.966 = 35.45$.
:::
:::

::: exercise Molecules in a pinch {level=1 check="1.03e21"}
How many formula units are in $0.100\ \mathrm{g}$ of $\mathrm{NaCl}$ ($M = 58.44\ \mathrm{g\,mol^{-1}}$)?
::: solution
$0.100/58.44\times6.022\times10^{23} = 1.03\times10^{21}$ formula units.
:::
:::

::: exercise Mass from amount {level=2 check="25.0"}
What mass of $\mathrm{CaCO_3}$ ($M = 100.09\ \mathrm{g\,mol^{-1}}$) is $0.250\ \mathrm{mol}$?
::: solution
$0.250\times100.09 = 25.0\ \mathrm{g}$, to three significant figures.
:::
:::

::: exercise Percentage of potassium {level=2 check="56.58"}
Compute the mass percent of K in $\mathrm{K_2CO_3}$ ($M = 138.21$; $2\,\mathrm{K} = 78.20$).
::: solution
$78.20/138.21\times100 = 56.58\ \%$. Composition is a property of the formula, not of the sample.
:::
:::

::: exercise Empirical formula from percentages {level=2 check="30.03"}
A compound is 40.00 % C, 6.71 % H, 53.29 % O. Give its empirical-formula mass.
::: solution
Per $100\ \mathrm{g}$: $3.33\ \mathrm{mol}$ C, $6.66\ \mathrm{mol}$ H, $3.33\ \mathrm{mol}$ O → ratio $1:2:1$ → empirical formula $\mathrm{CH_2O}$, mass $30.03\ \mathrm{g\,mol^{-1}}$.
:::
:::

::: exercise Molecular formula {level=3 check="180.18"}
With molar mass $180\ \mathrm{g\,mol^{-1}}$, give the molecular formula of the compound above.
::: solution
Multiplier $\approx 6$; the molecular formula is $\mathrm{C_6H_{12}O_6}$, glucose, formula mass $180.18$.
:::
:::

::: exercise The mole in the laboratory {level=3 check="11.7"}
Compute the mass of $0.200\ \mathrm{mol}$ of $\mathrm{NaCl}$ ($M = 58.44\ \mathrm{g\,mol^{-1}}$).
::: solution
$0.200\times58.44 = 11.7\ \mathrm{g}$. Individual molecules are far too small to weigh one by one; the mole converts the weighable gram to the countable entity.
:::
:::
