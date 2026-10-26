The previous chapter could call copper "one kind of atom" and then weigh a block of it. Weighing counts atoms only if you know what an atom contains and what one of them weighs. Chlorine makes the difficulty obvious: the number printed for it on a periodic table is about $35.45$, and no chlorine nucleus has a mass number of $35.45$. This chapter separates the integer that labels one isotope from the average that labels the element, and then builds the mole, the unit that turns a mass on a balance into a number of atoms, molecules or formula units.

## What an atom contains

::: definition Atomic number, mass number and isotope {#def-nuclear}
A neutral atom of atomic number $Z$ contains $Z$ **protons** in its nucleus and $Z$ **electrons** outside it. The **mass number** $A$ is the number of protons plus the number of **neutrons**, so the neutron count is $A - Z$. The notation $^{\,A}_{\,Z}\mathrm{X}$ records both; the atomic number is often omitted, because the element symbol already fixes $Z$.

**Isotopes** of an element have the same $Z$ and different $A$. They are the same element — the same chemistry, to an excellent approximation — because chemistry is arranged by the electrons, and the electrons are arranged by the nuclear charge $Z$. An **ion** is an atom, or a group of atoms, whose electron count is not $Z$: a cation has fewer electrons than protons, an anion more. The charge, in units of the elementary charge, is $Z$ minus the number of electrons.
:::

Protons and neutrons carry almost all the mass. The electron mass is about $1/1836$ of the proton mass, so the mass number $A$ is a fair integer label for how heavy a particular nucleus is, and it is not a substitute for a measured mass. Charge is the other way round: the nucleus is positive, the electrons are negative, and a neutral atom is neutral because the two counts match, not because the particles resemble each other.

Two cautions keep the vocabulary straight. First, $Z$ is a property of the element and $A$ is a property of one isotope. Natural chlorine is not "chlorine-$35.45$"; it is a mixture of chlorine-$35$ and chlorine-$37$. Second, removing an electron to make a cation does not change $Z$ or $A$. $\mathrm{Na^+}$ is still sodium, still mass number $23$ if that was the isotope, and it has ten electrons rather than eleven.

::: example Counting the particles {#ex-count-particles}
For each species give $Z$, $A$, the number of neutrons and the number of electrons. (a) $^{23}\mathrm{Na}$. (b) $^{23}\mathrm{Na^+}$. (c) $^{35}\mathrm{Cl}$. (d) $^{37}\mathrm{Cl^-}$. (e) $^{16}\mathrm{O^{2-}}$.
::: solution
(a) Sodium has $Z = 11$. Here $A = 23$, so the neutrons are $23 - 11 = 12$. The atom is neutral, so there are $11$ electrons.
(b) The ion has the same nucleus: $Z = 11$, $A = 23$, $12$ neutrons. One electron has been lost, so there are $10$ electrons. The charge is $11 - 10 = +1$.
(c) Chlorine has $Z = 17$. For this isotope $A = 35$, neutrons $35 - 17 = 18$, and a neutral atom has $17$ electrons.
(d) Still $Z = 17$, but $A = 37$, so the neutrons are $20$. The extra electron makes $18$ electrons, and the charge is $17 - 18 = -1$.
(e) Oxygen has $Z = 8$, $A = 16$, neutrons $8$. The oxide ion has gained two electrons, so it has $10$.

(a) and (b) share a nucleus and differ in the electron count. (c) and (d) share an atomic number and differ in both the neutron count and, in this particular pair, the charge. Isotope and ion are independent descriptions.
:::
:::

## Isotopes and the relative atomic mass

A mass number is an integer because it counts particles. The entry on a periodic table is not an integer for most elements, and it should not be: it is an average over the isotopes as they occur in ordinary terrestrial material, weighted by how common each isotope is.

Isotopic masses are not exactly integers either. They are measured on a scale on which an atom of $^{12}\mathrm{C}$ is *exactly* $12$. One **dalton** (symbol $\mathrm{u}$, also called the unified atomic mass unit) is one twelfth of that mass. A chlorine-$35$ atom is a little under $35\,\mathrm{u}$, not because it has a fractional neutron, but because the mass of a nucleus is not the sum of the masses of its free protons and neutrons: binding energy has a mass equivalent, the same $E = mc^2$ that made chemical mass defects undetectable in the previous chapter, now large enough, at nuclear energies, to move the mass by several parts in a thousand.

::: definition Relative atomic mass {#def-ar}
The **relative atomic mass** $A_\mathrm{r}(\mathrm{E})$ of an element is the abundance-weighted mean of the relative isotopic masses of its atoms in a stated source of the element. It is dimensionless: a mass in daltons divided by one dalton. If isotope $i$ has relative isotopic mass $m_i$ and amount fraction (mole fraction) $x_i$,
$$
A_\mathrm{r} = \sum_i x_i m_i, \qquad \sum_i x_i = 1.
$$
The amount fraction is the fraction of the *atoms*, not the fraction of the mass. For a sample that has been well mixed, the amount fraction and the fraction of atoms are the same number.
:::

::: proposition The mean is the total mass divided by the number of atoms {#prop-weighted-mean}
In a sample of $N$ atoms of which $N_i$ are isotope $i$, the relative atomic mass computed from that sample is
$$
A_\mathrm{r} = \sum_i x_i m_i, \qquad x_i = \frac{N_i}{N}.
$$
No atom in the sample need have mass $A_\mathrm{r}\,\mathrm{u}$. The table value is a mean.
:::

::: proof From a pile of atoms to the weighted mean {#proof-weighted-mean}
The total relative mass of the sample, in daltons, is $\sum_i N_i m_i$: each atom contributes its own isotopic mass, and nothing else. The mean mass per atom, still in daltons, is that total divided by the number of atoms,
$$
\frac{1}{N}\sum_i N_i m_i = \sum_i \frac{N_i}{N}\, m_i = \sum_i x_i m_i.
$$
Dividing a mass in daltons by $1\,\mathrm{u}$ leaves the dimensionless relative atomic mass. The algebra is the definition of a weighted average, and the weights are the amount fractions because each atom, heavy or light, is one atom. Weighting by mass fraction instead would answer a different question — what fraction of the *mass* sits in each isotope — and would not give $A_\mathrm{r}$.
:::

Chlorine is the example everyone meets, and it is worth doing with masses and abundances written out. Representative terrestrial abundances are about $75.76\%$ $^{35}\mathrm{Cl}$ and $24.24\%$ $^{37}\mathrm{Cl}$. Natural chlorine does vary: the Commission on Isotopic Abundances and Atomic Weights quotes the standard atomic weight as an *interval*, $[35.446,\, 35.457]$, precisely because ocean chloride, minerals and laboratory organochlorine compounds are not identical. The conventional value used for general chemistry and for trade is $A_\mathrm{r}(\mathrm{Cl}) = 35.45$. The calculation below, with one representative pair of abundances, lands inside the interval and rounds to that conventional value.

::: example Relative atomic mass of chlorine {#ex-chlorine-ar}
Take the relative isotopic masses $m(^{35}\mathrm{Cl}) = 34.96885$ and $m(^{37}\mathrm{Cl}) = 36.96590$, with amount fractions $0.7576$ and $0.2424$. Compute $A_\mathrm{r}(\mathrm{Cl})$ and compare it with $35.45$.
::: solution
The fractions sum to $1$, as they must. Then
$$
\begin{align*}
A_\mathrm{r}(\mathrm{Cl})
&= 0.7576\times 34.96885 + 0.2424\times 36.96590 \\
&= 26.4924 + 8.9605 \\
&= 35.4529.
\end{align*}
$$
To three decimal places this is $35.453$. Rounded to four significant figures, the precision of the conventional value, it is $35.45$. The two products were carried to four decimal places before adding; rounding each product earlier, to two decimals, would have moved the last digit for no reason.

Nothing in the sample has relative mass $35.45$. About three quarters of the atoms have relative mass $34.969$, and the rest have $36.966$. The table entry is the mean derived in [[#proof-weighted-mean]], and it is the right number to use when the sample is ordinary chlorine whose isotopes have not been separated. A sample enriched in $^{37}\mathrm{Cl}$ has a different relative atomic mass, and a different molar mass, even though it is still chlorine.
:::
:::

::: widget plot
f: a*(1-x)+b*x
x: 0, 1
y: 34, 38
sliders: a=34.969:34:36:0.001; b=36.966:36:38:0.001
labels: \text{relative atomic mass}
caption: Relative atomic mass of a two-isotope element against $x$, the amount fraction of the heavier isotope. The line $a(1-x)+bx$ runs from the lighter isotopic mass at $x = 0$ to the heavier at $x = 1$; the sliders set those two masses, and the defaults are $^{35}\mathrm{Cl}$ and $^{37}\mathrm{Cl}$. Representative chlorine lies near $x = 0.24$, where the line reads about $35.45$.
:::

The plot makes the weighting visible. The mean lies closer to the isotope that is more abundant. Chlorine, with only about a quarter of its atoms heavy, sits about a quarter of the way from $34.97$ to $36.97$, which is why $35.45$ is nearer $35$ than $37$. An element whose two isotopes were equally abundant would sit halfway between them. Bromine is the famous near-example of that, and its relative atomic mass is close to $80$ for that reason; we do not need its exact abundances here.

::: quiz {#quiz-chlorine-mean}
Why is the relative atomic mass of chlorine about $35.45$ rather than $35$ or $37$?
- [ ] Every chlorine atom contains a fractional neutron that brings its mass number to $35.45$.
- [x] Ordinary chlorine is a mixture of $^{35}\mathrm{Cl}$ and $^{37}\mathrm{Cl}$, and $35.45$ is the abundance-weighted mean of their isotopic masses.
- [ ] $35.45$ is the mass number of the most stable isotope, and the other isotope is an impurity that tables ignore.
- [ ] The relative atomic mass counts electrons as well as protons and neutrons, and the electrons supply the decimal.
::: solution
Mass numbers are integers belonging to single isotopes: $35$ and $37$. The relative atomic mass is the mean $\sum x_i m_i$ over the isotopes present, so it falls between them, nearer the more abundant $^{35}\mathrm{Cl}$. Electrons do not weigh enough to move the mass by $0.45\,\mathrm{u}$, and no nucleus contains a piece of a neutron. A separated isotope would be tabulated by its own mass, close to $35$ or close to $37$, not by $35.45$.
:::
:::

## The mole

Weighing $35.45\,\mathrm{g}$ of chlorine is useful only if that mass means a definite number of atoms. The **mole** is the unit that makes the sentence precise.

::: definition The mole and the Avogadro constant {#def-mole}
Since 20 May 2019, one **mole** of a specified elementary entity contains exactly
$$
N_\mathrm{A} = 6.02214076\times 10^{23}
$$
of those entities. This number is the **Avogadro constant**. Its unit is $\mathrm{mol^{-1}}$: it is a number per amount of substance, not a pure integer, and it is exact by definition of the mole. The **amount of substance** $n$ is the quantity whose unit is the mole. The number of entities and the amount are proportional,
$$
N = n\, N_\mathrm{A}.
$$
The entity has to be named. A mole of hydrogen atoms, a mole of hydrogen molecules and a mole of electrons are three different amounts of three different things, and the second contains twice as many atoms as the first.
:::

The name honours Amedeo Avogadro, who did not measure $6.022\times 10^{23}$ and did not define the mole. In 1811 he proposed that equal volumes of gases, at the same temperature and pressure, contain equal numbers of molecules. The constant, and the decision to fix it exactly, are twentieth- and twenty-first-century acts. Before 2019 the mole was defined as the amount of substance that contains as many entities as there are atoms in exactly $12\,\mathrm{g}$ of $^{12}\mathrm{C}$. Fixing $N_\mathrm{A}$ instead makes the mole independent of a mass measurement. The practical change is far smaller than any mass you will weigh this year.

Amount of substance is not a mass, and it is not the integer $N$. It is the count *scaled* by $N_\mathrm{A}$, the way a length in metres is a count of metre-sticks scaled to a convenient unit. "Two moles of water" means an amount $n = 2\,\mathrm{mol}$, which is $2N_\mathrm{A}$ molecules, which is a mass we are about to calculate. Saying "a mole" without saying of what is like saying "a dozen" without saying of what.

## Molar mass, and the three conversions

::: definition Molar mass {#def-molar-mass}
The **molar mass** $M$ of a substance is the mass of a sample divided by its amount of substance,
$$
M = \frac{m}{n}.
$$
The usual chemical unit is $\mathrm{g\,mol^{-1}}$. For an element, the numerical value of $M$ in $\mathrm{g\,mol^{-1}}$ equals $A_\mathrm{r}$ for every purpose in this course. Strictly, $M = A_\mathrm{r}\, M_\mathrm{u}$ with a molar-mass constant $M_\mathrm{u}$ that, since 2019, is no longer defined to be exactly $1\,\mathrm{g\,mol^{-1}}$. The difference is smaller than one part in $10^{9}$, invisible beside a student balance and beside the precision of the atomic weights we quote. We take
$$
\begin{align*}
M(\mathrm{H}) &= 1.008\,\mathrm{g\,mol^{-1}}, &
M(\mathrm{C}) &= 12.011\,\mathrm{g\,mol^{-1}}, \\
M(\mathrm{N}) &= 14.007\,\mathrm{g\,mol^{-1}}, &
M(\mathrm{O}) &= 15.999\,\mathrm{g\,mol^{-1}}, \\
M(\mathrm{Na}) &= 22.990\,\mathrm{g\,mol^{-1}}, &
M(\mathrm{S}) &= 32.06\,\mathrm{g\,mol^{-1}}, \\
M(\mathrm{Cl}) &= 35.45\,\mathrm{g\,mol^{-1}}.
\end{align*}
$$
For a molecule, add the atomic molar masses. For an ionic compound the same addition gives the molar mass *per formula unit*: $\mathrm{NaCl}$ does not consist of molecules, and $M(\mathrm{NaCl})$ is still the mass of one mole of $\mathrm{NaCl}$ formula units.
:::

Water is the check every later calculation leans on. Two hydrogens and one oxygen give
$$
M(\mathrm{H_2O}) = 2(1.008) + 15.999 = 18.015\,\mathrm{g\,mol^{-1}}.
$$
Chlorine gas is not $35.45\,\mathrm{g\,mol^{-1}}$. The entity that fills a flask labelled chlorine is the molecule $\mathrm{Cl_2}$, so
$$
M(\mathrm{Cl_2}) = 2\times 35.45 = 70.90\,\mathrm{g\,mol^{-1}}.
$$
Using $35.45$ there counts atoms and calls them molecules, and every subsequent amount is wrong by a factor of two. Sodium chloride is
$$
M(\mathrm{NaCl}) = 22.990 + 35.45 = 58.44\,\mathrm{g\,mol^{-1}},
$$
where the sum is limited by the hundredths in $35.45$, so the thousandths in $22.990$ do not produce a molar mass quoted past $58.44$.

::: proposition Mass, amount and number of entities {#prop-conversions}
For a pure substance of molar mass $M$, a sample of mass $m$ and amount $n$ containing $N$ specified entities satisfies
$$
n = \frac{m}{M}, \qquad N = n\, N_\mathrm{A}, \qquad N = \frac{m\, N_\mathrm{A}}{M}.
$$
The three forms are one relation written for whichever quantity you were given and whichever you were asked for. They hold when the entity named in $M$, in $n$ and in $N$ is the same entity.
:::

::: proof One entity has mass $M/N_\mathrm{A}$ {#proof-conversions}
By the definition of molar mass, $m = nM$, and dividing by $M$ is the first equation — provided $M$ is not zero, which it is not. By the definition of the Avogadro constant, each mole contributes exactly $N_\mathrm{A}$ entities, so $N = n N_\mathrm{A}$. Substitute $n = m/M$ into that expression and the third equation follows. Rearranged, the mass of *one* entity is
$$
\frac{m}{N} = \frac{M}{N_\mathrm{A}}.
$$
A mole is heavy because $N_\mathrm{A}$ is large, not because a molecule is heavy: one water molecule has mass $18.015/N_\mathrm{A}$ grams, about $3\times 10^{-23}\,\mathrm{g}$. The formulas do not know about chemistry beyond the molar mass you insert. If you insert $M(\mathrm{Cl})$ where the sample is $\mathrm{Cl_2}$, the algebra will obediently count atoms.
:::

Significant figures behave as they did for density. $N_\mathrm{A}$ is exact, so it never limits a result. The mass you weighed, and the molar mass built from tabulated atomic weights, do. Copying all nine digits of $N_\mathrm{A}$ into an answer whose mass had three significant figures is theatre, not precision. In the examples below the full constant is used, and the reported $N$ is rounded to the significant figures of $n$.

::: example Water: mass, amount and molecules {#ex-water-moles}
A sample of water has mass $36.030\,\mathrm{g}$. Take $M(\mathrm{H_2O}) = 18.015\,\mathrm{g\,mol^{-1}}$ and $N_\mathrm{A} = 6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$. Find (a) the amount of water, (b) the number of molecules, (c) the number of hydrogen atoms.
::: solution
(a) 
$$
n(\mathrm{H_2O}) = \frac{36.030\,\mathrm{g}}{18.015\,\mathrm{g\,mol^{-1}}} = 2.0000\,\mathrm{mol}.
$$
The division is exact. Both the mass and the molar mass have five significant figures, and so does the amount.
(b) 
$$
N(\mathrm{H_2O}) = (2.0000\,\mathrm{mol})(6.02214076\times 10^{23}\,\mathrm{mol^{-1}}) = 1.2044\times 10^{24}.
$$
Five significant figures follow the amount; $N_\mathrm{A}$ did not run out of digits. To four figures, if a rougher mass had forced it, this would be $1.204\times 10^{24}$.
(c) Each molecule contributes two hydrogen atoms, an exact stoichiometric factor:
$$
N(\mathrm{H}) = 2 \times 1.2044\times 10^{24} = 2.4088\times 10^{24}.
$$
The amount of hydrogen *atoms* is $4.0000\,\mathrm{mol}$, not $2.0000\,\mathrm{mol}$. Forgetting the two is the error [[#prop-conversions]] warned about: the entity changed, and the factor had to be written down.
:::
:::

::: example Formula units, not molecules {#ex-nacl}
How many formula units of $\mathrm{NaCl}$, and how many ions in total, are there in $5.844\,\mathrm{g}$ of sodium chloride? Use $M(\mathrm{NaCl}) = 58.44\,\mathrm{g\,mol^{-1}}$.
::: solution
$$
n(\mathrm{NaCl}) = \frac{5.844\,\mathrm{g}}{58.44\,\mathrm{g\,mol^{-1}}} = 0.1000\,\mathrm{mol}.
$$
The quotient is exact at four figures. The number of formula units is
$$
N = (0.1000)(6.02214076\times 10^{23}) = 6.022\times 10^{22},
$$
four significant figures, matching $0.1000$. Each formula unit contributes one $\mathrm{Na^+}$ and one $\mathrm{Cl^-}$, two ions, so the number of ions is $1.204\times 10^{23}$ and the amount of ions is $0.2000\,\mathrm{mol}$. Calling $6.022\times 10^{22}$ "the number of $\mathrm{NaCl}$ molecules" would be the wrong picture of the crystal, even though the number of formula units is right.
:::
:::

::: example From a mass of carbon to a number of atoms {#ex-carbon-count}
How many atoms are there in $2.50\,\mathrm{g}$ of carbon? Use $M(\mathrm{C}) = 12.011\,\mathrm{g\,mol^{-1}}$.
::: solution
$$
n(\mathrm{C}) = \frac{2.50\,\mathrm{g}}{12.011\,\mathrm{g\,mol^{-1}}} = 0.20814\,\mathrm{mol},
$$
which is $0.208\,\mathrm{mol}$ to three significant figures — the mass has three, the molar mass has more. Then
$$
N = (0.20814)(6.02214076\times 10^{23}) = 1.2535\times 10^{23},
$$
reported as $1.25\times 10^{23}$. Rounding $n$ to $0.208$ *before* multiplying is harmless at three figures ($0.208\times 6.022\times 10^{23} = 1.25\times 10^{23}$ still) and becomes a bad habit when the last digit is close to a rounding boundary. Carry the guard digits, as in the density calculations of the previous chapter.
:::
:::

::: example From a number of molecules back to a mass {#ex-from-count}
A sample contains $3.01107038\times 10^{23}$ molecules of $\mathrm{O_2}$. What amount of oxygen is that, and what is its mass? Use $M(\mathrm{O_2}) = 31.998\,\mathrm{g\,mol^{-1}}$.
::: solution
Divide by the Avogadro constant. The number was chosen as half of $N_\mathrm{A}$ on purpose, and the division confirms it:
$$
n = \frac{3.01107038\times 10^{23}}{6.02214076\times 10^{23}\,\mathrm{mol^{-1}}} = 0.50000\,\mathrm{mol}.
$$
$$
m = nM = (0.50000\,\mathrm{mol})(31.998\,\mathrm{g\,mol^{-1}}) = 15.999\,\mathrm{g}.
$$
Half a mole of $\mathrm{O_2}$ molecules has the same mass as one mole of $\mathrm{O}$ atoms, because each molecule is two atoms. The amount of $\mathrm{O}$ *atoms* in the sample is $1.0000\,\mathrm{mol}$, not $0.50000\,\mathrm{mol}$. The mass does not care which way you describe it; the amount does.
:::
:::

::: warning The mole is not a molecule, and $35.45$ is not a mass number {#warn-mole}
Four confusions do most of the damage. The mole is a unit of amount, not a particle: one molecule of water has mass about $3\times 10^{-23}\,\mathrm{g}$, and one mole of water has mass $18.015\,\mathrm{g}$. The relative atomic mass is not a mass number: $^{35}\mathrm{Cl}$ has $A = 35$, while $A_\mathrm{r}(\mathrm{Cl}) = 35.45$ describes a mixture. The molar mass follows the entity you named: $M(\mathrm{Cl_2}) = 70.90\,\mathrm{g\,mol^{-1}}$, and using $35.45$ doubles every amount you then calculate. Finally, $N_\mathrm{A}$ is exact and your mass is not. An answer with nine significant figures copied from the constant, sitting on a mass known to three, is not a careful answer. It is a misunderstanding of which number limited the arithmetic.
:::

::: history {#hist-avogadro}
John Dalton's *A New System of Chemical Philosophy* (1808) made atoms into a quantitative idea: each element has atoms of a characteristic weight, and compounds combine those atoms in simple whole-number ratios. The characteristic weight was, in our language, a relative atomic mass — except that Dalton had no reliable way to choose between $\mathrm{HO}$ and $\mathrm{H_2O}$ for water, and a wrong formula scales every atomic weight that depends on it. His picture also took the atoms of an element to be identical. Isotopes, a century later, qualify that claim without touching the chemistry: the atoms of an element share $Z$, not $A$.

Amedeo Avogadro, in 1811, proposed that equal volumes of gases at the same temperature and pressure contain equal numbers of molecules, and he distinguished atoms from the molecules of gaseous elements. The idea would have fixed the formulas Dalton could not. It was largely ignored until Stanislao Cannizzaro, at the Karlsruhe congress of 1860, used it to produce a single consistent set of atomic and molecular weights. The number we now call $N_\mathrm{A}$ became an experimental object around the start of the twentieth century, notably through Jean Perrin's work on Brownian motion. From 1967 until 2019 the mole was tied to $12\,\mathrm{g}$ of $^{12}\mathrm{C}$. The revision of the SI on 20 May 2019 fixed $N_\mathrm{A}$ at exactly $6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$ and retired the artefact. Avogadro's own hypothesis — equal volumes, equal numbers — is still the conceptual root of the gas law in [[general-chemistry-1/gases]].
:::

## Where this leads

A molar mass is only as useful as the formula it is computed from. [[general-chemistry-1/formulas-nomenclature]] turns percent composition into empirical and molecular formulas, and gives the inorganic names that tell you which formula is in the bottle. Amounts of substance become ratios in a balanced equation in [[general-chemistry-1/stoichiometry]]. Avogadro's equal-volume hypothesis, left qualitative here, becomes part of the ideal gas equation in [[general-chemistry-1/gases]]. And the claim that $Z$, not $A$, decides the element is a claim about electrons and nuclear charge; [[general-chemistry-1/quantum-atom]] is where the evidence from spectra comes in.

::: summary
- A neutral atom has $Z$ protons and $Z$ electrons; the neutron count is $A - Z$. Isotopes share $Z$ and differ in $A$. Ions differ in the electron count, not in $Z$.
- Relative isotopic masses are not exact integers. They are measured on a scale where $^{12}\mathrm{C}$ is exactly $12$, and nuclear binding energy is why they fall slightly off the integers.
- $A_\mathrm{r} = \sum x_i m_i$ is an abundance-weighted mean of isotopic masses. It is not the mass number of a "typical" atom. For representative chlorine, $0.7576$ and $0.2424$ give $A_\mathrm{r} = 35.453$, which rounds to the conventional $35.45$.
- One mole contains exactly $N_\mathrm{A} = 6.02214076\times 10^{23}$ specified entities. The entity must be named. Amount, mass and count are different quantities.
- Molar mass in $\mathrm{g\,mol^{-1}}$ has the same numerical value as $A_\mathrm{r}$ for every calculation in this course. Add atomic molar masses for a molecule or a formula unit. $M(\mathrm{Cl_2}) = 70.90\,\mathrm{g\,mol^{-1}}$, not $35.45$.
- The working equations are $n = m/M$ and $N = n N_\mathrm{A}$. The mass of one entity is $M/N_\mathrm{A}$. $N_\mathrm{A}$ is exact; the mass you weighed is what limits the significant figures.
- Changing the entity — atoms versus molecules, formula units versus ions — multiplies the amount by an integer from the formula. Omitting that integer is a factor-of-two error, or worse.
:::

## Exercises

::: exercise Neutrons in chlorine-37 {#exr-neutrons level=1 check="20"}
How many neutrons are in one atom of $^{37}\mathrm{Cl}$? Chlorine has atomic number $17$. (Enter the number of neutrons.)
::: solution
The neutron count is $A - Z = 37 - 17 = 20$. The atomic number is fixed by the element; the mass number is fixed by the isotope named in the superscript. Neither number is $35.45$.
:::
:::

::: exercise Mass of a sample of chlorine gas {#exr-mass-cl2 level=1 check="17.7"}
What is the mass of $0.250\,\mathrm{mol}$ of $\mathrm{Cl_2}$? Use $M(\mathrm{Cl}) = 35.45\,\mathrm{g\,mol^{-1}}$. (Enter the mass in grams, to three significant figures.)
::: solution
The entity is the molecule, so $M(\mathrm{Cl_2}) = 2\times 35.45 = 70.90\,\mathrm{g\,mol^{-1}}$. Then
$$
m = nM = (0.250\,\mathrm{mol})(70.90\,\mathrm{g\,mol^{-1}}) = 17.725\,\mathrm{g},
$$
which is $17.7\,\mathrm{g}$ to three significant figures. Using $35.45\,\mathrm{g\,mol^{-1}}$ instead would give $8.86\,\mathrm{g}$, the mass of $0.250\,\mathrm{mol}$ of chlorine *atoms*, which is not what a flask of $\mathrm{Cl_2}$ contains.
:::
:::

::: exercise A two-isotope average {#exr-two-isotope level=1 check="10.811"}
An element has two isotopes, of relative masses $10.013$ (amount fraction $0.1990$) and $11.009$ (amount fraction $0.8010$). Compute the relative atomic mass. (Enter $A_\mathrm{r}$ to three decimal places.)
::: solution
$$
A_\mathrm{r} = 0.1990\times 10.013 + 0.8010\times 11.009 = 1.9926 + 8.8182 = 10.8108,
$$
which is $10.811$ to three decimal places. The heavier isotope dominates, so the mean sits close to $11.009$ and only about a fifth of the way back toward $10.013$. The same straight line as in the chlorine widget, with different endpoints and a different $x$, is the whole calculation.
:::
:::

::: exercise Amount of sodium chloride {#exr-nacl-n level=2 check="0.1711"}
What amount of $\mathrm{NaCl}$ is present in $10.00\,\mathrm{g}$? Use $M(\mathrm{Na}) = 22.990\,\mathrm{g\,mol^{-1}}$ and $M(\mathrm{Cl}) = 35.45\,\mathrm{g\,mol^{-1}}$. (Enter the amount in moles, to four significant figures.)
::: solution
$$
M(\mathrm{NaCl}) = 22.990 + 35.45 = 58.44\,\mathrm{g\,mol^{-1}}.
$$
The hundredths place in $35.45$ limits the sum. Then
$$
n = \frac{10.00\,\mathrm{g}}{58.44\,\mathrm{g\,mol^{-1}}} = 0.171115\ldots\,\mathrm{mol} = 0.1711\,\mathrm{mol}.
$$
Four significant figures match the mass $10.00$ and the molar mass $58.44$. This is an amount of formula units, not of neutral $\mathrm{NaCl}$ molecules.
:::
:::

::: exercise Atoms in five grams of carbon {#exr-carbon-atoms level=2 check="2.51e23"}
How many atoms are there in $5.00\,\mathrm{g}$ of carbon? Use $M(\mathrm{C}) = 12.011\,\mathrm{g\,mol^{-1}}$ and $N_\mathrm{A} = 6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$. (Enter the number of atoms to three significant figures, for example $1.25\mathrm{e}23$.)
::: solution
$$
n = \frac{5.00}{12.011} = 0.41629\,\mathrm{mol},
$$
three significant figures in the mass, so more digits here are guard digits. 
$$
N = 0.41629\times 6.02214076\times 10^{23} = 2.5069\times 10^{23},
$$
which rounds to $2.51\times 10^{23}$. Twice the $2.50\,\mathrm{g}$ of [[#ex-carbon-count]] produces twice the atoms, as it must: $N$ is proportional to $m$ at fixed $M$.
:::
:::

::: exercise Ions from a mass of salt {#exr-nacl-ions level=2 check="0.2"}
A sample contains $11.688\,\mathrm{g}$ of $\mathrm{NaCl}$, with $M(\mathrm{NaCl}) = 58.44\,\mathrm{g\,mol^{-1}}$. What amount of chloride ions is in the sample? (Enter the amount in moles.)
::: solution
$$
n(\mathrm{NaCl}) = \frac{11.688\,\mathrm{g}}{58.44\,\mathrm{g\,mol^{-1}}} = 0.2000\,\mathrm{mol}.
$$
Each formula unit provides one $\mathrm{Cl^-}$, so $n(\mathrm{Cl^-}) = 0.2000\,\mathrm{mol}$. The number of ions is $0.2000\, N_\mathrm{A} = 1.204\times 10^{23}$, if a count rather than an amount is wanted. The amount asked for is $0.2000\,\mathrm{mol}$, whose numerical value is $0.2$.
:::
:::

::: exercise Abundance from the conventional atomic weight {#exr-abundance level=3 check="24.09"}
Using $m(^{35}\mathrm{Cl}) = 34.96885$, $m(^{37}\mathrm{Cl}) = 36.96590$ and the conventional value $A_\mathrm{r}(\mathrm{Cl}) = 35.45$, solve for the amount fraction of $^{37}\mathrm{Cl}$, and express it as a percentage. (Enter the percentage to two decimal places.) Why is it not $24.24\%$?
::: hint
Set $35.45 = 34.96885\,(1 - x) + 36.96590\, x$ and solve for $x$. One linear equation is the whole of a two-isotope inversion, because the two fractions sum to one.
:::
::: solution
$$
35.45 = 34.96885 + x(36.96590 - 34.96885) = 34.96885 + 1.99705\, x,
$$
$$
x = \frac{35.45 - 34.96885}{1.99705} = \frac{0.48115}{1.99705} = 0.24093.
$$
As a percentage to two decimal places, $24.09\%$. The forward calculation in [[#ex-chlorine-ar]] started from $24.24\%$ and produced $35.4529$, which *rounds* to the conventional $35.45$. Running the rounded value backwards cannot recover the unrounded abundances: a change of $0.003$ in $A_\mathrm{r}$ is $0.003/1.997 \approx 0.0015$ in the fraction, about $0.15$ percentage points. This is why a conventional atomic weight and a measured isotopic abundance are quoted separately. Use $35.45$ for ordinary molar masses. Use the measured fractions when the isotopic composition is the point.
:::
:::

::: exercise Atoms of one isotope inside chlorine gas {#exr-cl37-count level=3 check="2.920e22"}
A sample of $7.090\,\mathrm{g}$ of $\mathrm{Cl_2}$ has the representative isotopic composition of [[#ex-chlorine-ar]], so the amount fraction of $^{37}\mathrm{Cl}$ among the chlorine atoms is $0.2424$. How many $^{37}\mathrm{Cl}$ atoms are in the sample? Use $M(\mathrm{Cl}) = 35.45\,\mathrm{g\,mol^{-1}}$ and the exact $N_\mathrm{A}$. (Enter the number of atoms to four significant figures.)
::: hint
Convert mass to amount of $\mathrm{Cl_2}$, double it to get the amount of chlorine atoms, then take the fraction $0.2424$ of that amount before multiplying by $N_\mathrm{A}$.
:::
::: solution
$$
M(\mathrm{Cl_2}) = 70.90\,\mathrm{g\,mol^{-1}}, \qquad n(\mathrm{Cl_2}) = \frac{7.090}{70.90} = 0.1000\,\mathrm{mol}.
$$
Each molecule contributes two atoms, so $n(\mathrm{Cl}) = 0.2000\,\mathrm{mol}$. The amount that is $^{37}\mathrm{Cl}$ is
$$
n(^{37}\mathrm{Cl}) = 0.2000\times 0.2424 = 0.04848\,\mathrm{mol}.
$$
$$
N = 0.04848\times 6.02214076\times 10^{23} = 2.9195\times 10^{22},
$$
which is $2.920\times 10^{22}$ to four significant figures. The mass, the molar mass and the fraction $0.2424$ all have four figures, and $N_\mathrm{A}$ has more. Dropping the factor of two, or applying $0.2424$ to moles of $\mathrm{Cl_2}$ rather than to atoms, is each a clean factor-of-two mistake of the kind the warning above is about.
:::
:::

::: exercise Mass of one water molecule {#exr-one-molecule level=3 check="2.991e-23"}
From [[#prop-conversions]], the mass of one entity is $M/N_\mathrm{A}$. Compute the mass of one $\mathrm{H_2O}$ molecule. Use $M = 18.015\,\mathrm{g\,mol^{-1}}$ and $N_\mathrm{A} = 6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$. (Enter the mass in grams, to four significant figures.)
::: solution
$$
\frac{M}{N_\mathrm{A}} = \frac{18.015\,\mathrm{g\,mol^{-1}}}{6.02214076\times 10^{23}\,\mathrm{mol^{-1}}} = 2.99146\times 10^{-23}\,\mathrm{g},
$$
so $2.991\times 10^{-23}\,\mathrm{g}$ to four significant figures. $18.015$ has five figures and $N_\mathrm{A}$ is exact, so a fifth figure ($2.9915\times 10^{-23}\,\mathrm{g}$) would be defensible; four were asked for. The result is the particulate face of a molar mass: $18.015\,\mathrm{g}$ is not the mass of a molecule, it is the mass of $N_\mathrm{A}$ of them. Dividing by $N_\mathrm{A}$ is the whole derivation.
:::
:::
