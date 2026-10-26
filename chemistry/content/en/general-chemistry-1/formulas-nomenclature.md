A reagent bottle on a teaching bench carries the label *copper(II) sulfate pentahydrate*, and underneath it the formula $\mathrm{CuSO_4\cdot 5H_2O}$. The blue crystals inside are one substance, and the label tells you a great deal about it if you can read it. The name says that copper is present as the ion $\mathrm{Cu^{2+}}$, not $\mathrm{Cu^{+}}$. It says the anion is sulfate, $\mathrm{SO_4^{2-}}$, a group of five atoms that travels through most reactions intact. It says that five water molecules are built into the crystal for every copper ion, so that more than a third of what you weigh is water. Every one of those facts changes the molar mass, and every molar mass error propagates straight into the stoichiometry of the next chapter.

This chapter is about the two directions of that reading. From a name we write a formula, and from a formula we write a name, following the rules of the International Union of Pure and Applied Chemistry (IUPAC) for the inorganic compounds a first course meets. Then we run the arithmetic both ways: from a formula we compute the mass percentage of each element, and from measured percentages — the output of an elemental analysis — we work back to the simplest formula consistent with them, and then to the molecular formula. The tools are those of [[general-chemistry-1/atoms-and-moles]]: molar masses and the conversion $n = m/M$. Atomic weights used throughout are $\mathrm{H}\ 1.008$, $\mathrm{C}\ 12.011$, $\mathrm{N}\ 14.007$, $\mathrm{O}\ 15.999$, $\mathrm{Na}\ 22.990$, $\mathrm{Mg}\ 24.305$, $\mathrm{S}\ 32.06$, $\mathrm{Cl}\ 35.45$, $\mathrm{K}\ 39.098$, $\mathrm{Fe}\ 55.845$ and $\mathrm{Cu}\ 63.546$, the conventional values derived from the IUPAC standard atomic weights.

## Ionic and molecular compounds

Two different kinds of thing hide behind the word *formula*. Water is made of molecules: each $\mathrm{H_2O}$ unit is a discrete particle, two hydrogen atoms bonded to one oxygen atom, and in steam those particles fly about separately. Sodium chloride is not made of molecules at all. A crystal of salt is a three-dimensional array of sodium ions and chloride ions in which each $\mathrm{Na^{+}}$ is surrounded by six $\mathrm{Cl^{-}}$ and each $\mathrm{Cl^{-}}$ by six $\mathrm{Na^{+}}$. No particular chloride belongs to any particular sodium. The formula $\mathrm{NaCl}$ reports only the ratio.

::: definition Ionic and molecular compounds {#def-ionic-molecular}
An **ionic compound** consists of positive ions (**cations**) and negative ions (**anions**) held together by electrostatic attraction in an extended lattice. Its formula is the **formula unit**: the smallest whole-number ratio of ions that is electrically neutral, as in $\mathrm{NaCl}$, $\mathrm{MgCl_2}$ or $\mathrm{Al_2O_3}$.

A **molecular compound** consists of discrete molecules in which atoms are joined by shared electron pairs (covalent bonds). Its **molecular formula** gives the actual number of atoms of each element in one molecule, as in $\mathrm{H_2O}$, $\mathrm{NH_3}$ or $\mathrm{C_6H_{12}O_6}$.

A **polyatomic ion** is a covalently bonded group of atoms that carries an overall charge, such as $\mathrm{NH_4^{+}}$ or $\mathrm{SO_4^{2-}}$. A compound that contains polyatomic ions is ionic, even though the bonds inside each ion are covalent.
:::

The *rule of thumb* for telling the two apart is empirical: a compound of a metal with a non-metal is usually ionic, and a compound of non-metals with one another is usually molecular. Ammonium salts break the first half of the rule, because $\mathrm{NH_4^{+}}$ is a cation made entirely of non-metals. Aluminium chloride breaks the second half in the other direction: it is a metal–non-metal compound, yet in the vapour it exists as $\mathrm{Al_2Cl_6}$ molecules. Bonding is a continuum, and where a compound sits on it is the business of [[bonding-structure/ionic-bonding]] and [[bonding-structure/covalent-lewis]]. For naming and for formula writing, the rule of thumb is enough.

### Charges of the common ions

Main-group metals form cations with the charge that leaves them with the electron count of the preceding noble gas: group 1 gives $+1$ ($\mathrm{Na^{+}}$, $\mathrm{K^{+}}$), group 2 gives $+2$ ($\mathrm{Mg^{2+}}$, $\mathrm{Ca^{2+}}$), and aluminium gives $\mathrm{Al^{3+}}$. Non-metals form anions by gaining electrons up to the following noble gas: group 17 gives $-1$ ($\mathrm{F^{-}}$, $\mathrm{Cl^{-}}$), group 16 gives $-2$ ($\mathrm{O^{2-}}$, $\mathrm{S^{2-}}$), and nitrogen gives the nitride ion $\mathrm{N^{3-}}$. Why the noble-gas count is favoured is a question about electron configurations, answered in [[general-chemistry-1/periodicity]]. The transition metals are less tidy: iron forms both $\mathrm{Fe^{2+}}$ and $\mathrm{Fe^{3+}}$, copper both $\mathrm{Cu^{+}}$ and $\mathrm{Cu^{2+}}$, and the name has to say which.

The polyatomic ions have to be learned, because their formulas cannot be deduced from a single rule. The ones that appear constantly in this course are these.

| ion | name | ion | name |
|---|---|---|---|
| $\mathrm{NH_4^{+}}$ | ammonium | $\mathrm{OH^{-}}$ | hydroxide |
| $\mathrm{NO_3^{-}}$ | nitrate | $\mathrm{NO_2^{-}}$ | nitrite |
| $\mathrm{SO_4^{2-}}$ | sulfate | $\mathrm{SO_3^{2-}}$ | sulfite |
| $\mathrm{HSO_4^{-}}$ | hydrogensulfate | $\mathrm{CO_3^{2-}}$ | carbonate |
| $\mathrm{HCO_3^{-}}$ | hydrogencarbonate | $\mathrm{PO_4^{3-}}$ | phosphate |
| $\mathrm{HPO_4^{2-}}$ | hydrogenphosphate | $\mathrm{H_2PO_4^{-}}$ | dihydrogenphosphate |
| $\mathrm{ClO_4^{-}}$ | perchlorate | $\mathrm{ClO_3^{-}}$ | chlorate |
| $\mathrm{ClO^{-}}$ | hypochlorite | $\mathrm{MnO_4^{-}}$ | permanganate |
| $\mathrm{CrO_4^{2-}}$ | chromate | $\mathrm{Cr_2O_7^{2-}}$ | dichromate |
| $\mathrm{CH_3COO^{-}}$ | acetate (ethanoate) | $\mathrm{CN^{-}}$ | cyanide |

There is some pattern to help memory. For the oxoanions of one element, *-ate* names the ion with more oxygen and *-ite* the one with less: nitrate $\mathrm{NO_3^{-}}$ and nitrite $\mathrm{NO_2^{-}}$, sulfate and sulfite. The prefix *per-* adds one more oxygen than the *-ate* ion and *hypo-* removes one from the *-ite* ion, which gives the chlorine series perchlorate $\mathrm{ClO_4^{-}}$, chlorate $\mathrm{ClO_3^{-}}$, chlorite $\mathrm{ClO_2^{-}}$, hypochlorite $\mathrm{ClO^{-}}$. Adding $\mathrm{H^{+}}$ to a multiply charged anion lowers its charge by one and prefixes *hydrogen*: $\mathrm{CO_3^{2-}}$ becomes $\mathrm{HCO_3^{-}}$. The common name *bicarbonate* for $\mathrm{HCO_3^{-}}$ is still on supermarket packets, but it is not the systematic name.

### Writing an ionic formula

An ionic compound is electrically neutral, so the positive charge of its cations must cancel the negative charge of its anions exactly. That single requirement fixes the formula.

::: algorithm Formula of an ionic compound from its ions {#alg-ionic-formula}
1. Write the cation and anion with their charges, for example $\mathrm{Al^{3+}}$ and $\mathrm{SO_4^{2-}}$.
2. Find the smallest numbers of each ion whose total charges cancel. The lowest common multiple of the two charge magnitudes is the total charge each side must reach: here $\mathrm{lcm}(3, 2) = 6$, so two $\mathrm{Al^{3+}}$ ($+6$) and three $\mathrm{SO_4^{2-}}$ ($-6$).
3. Write the cation first and the anion second, with the counts as subscripts and without the charges: $\mathrm{Al_2(SO_4)_3}$.
4. Put a polyatomic ion in brackets whenever its count is greater than one, so that the subscript multiplies the whole ion. Omit a subscript of $1$.
5. Check: the sum of (count × charge) over all ions is zero.
:::

The brackets in step 4 matter. $\mathrm{Al_2(SO_4)_3}$ contains three sulfur atoms and twelve oxygen atoms; written without brackets, $\mathrm{Al_2SO_{43}}$, it would be nonsense. And the reduction to the smallest ratio applies to ions, not to atoms inside a polyatomic ion: $\mathrm{Na_2SO_4}$ is not "simplified" by touching the $4$, because that $4$ belongs to the sulfate ion.

## Naming inorganic compounds

The names in this chapter follow the IUPAC recommendations for inorganic chemistry, published as the *Red Book*, in the simplified form used in first-year courses. A name is not a description chosen for elegance; it is a code from which another chemist must be able to write exactly one formula.

::: definition Names of binary ionic compounds and salts {#def-ionic-names}
The name of an ionic compound is the name of the cation followed by the name of the anion.

- A monatomic cation takes the name of the element: sodium, magnesium, aluminium.
- If the metal forms more than one cation, its charge is given as a Roman numeral in brackets immediately after the element name, with no space (the **Stock notation**): iron(II) for $\mathrm{Fe^{2+}}$, iron(III) for $\mathrm{Fe^{3+}}$, copper(I) and copper(II).
- A monatomic anion takes the stem of the element name with the ending *-ide*: chloride, oxide, sulfide, nitride, hydride.
- A polyatomic ion keeps its own name: ammonium, sulfate, nitrate, hydroxide.

The numbers of each ion are *not* stated in the name of a simple salt, because neutrality fixes them once the charges are known. Calcium chloride is $\mathrm{CaCl_2}$ without being called calcium dichloride.
:::

The older practice, still printed on some bottles, used the endings *-ous* for the lower charge and *-ic* for the higher, with Latin stems: ferrous ($\mathrm{Fe^{2+}}$) and ferric ($\mathrm{Fe^{3+}}$), cuprous ($\mathrm{Cu^{+}}$) and cupric ($\mathrm{Cu^{2+}}$). The trouble is that the ending tells you only which is larger, not what the charge is, so you have to remember it separately for every metal. The Roman numeral carries the information itself.

::: definition Names of binary molecular compounds {#def-molecular-names}
A compound of two non-metals is named with the less electronegative element first, under its element name, and the more electronegative element second, with the ending *-ide*. Greek multiplying prefixes give the number of atoms of each element:

| number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| prefix | mono | di | tri | tetra | penta | hexa | hepta | octa | nona | deca |

*Mono-* is omitted on the first element: $\mathrm{CO_2}$ is carbon dioxide, not monocarbon dioxide. Examples: $\mathrm{N_2O_4}$ dinitrogen tetraoxide, $\mathrm{PCl_5}$ phosphorus pentachloride, $\mathrm{SF_6}$ sulfur hexafluoride, $\mathrm{P_4O_{10}}$ tetraphosphorus decaoxide. The current recommendations do not elide the vowel of the prefix (tetraoxide, not tetroxide), with *monoxide* in carbon monoxide as an accepted exception. A handful of hydrides keep their traditional names: water $\mathrm{H_2O}$, ammonia $\mathrm{NH_3}$, methane $\mathrm{CH_4}$.
:::

Why prefixes here and not for salts? Because two non-metals often form several compounds whose formulas cannot be predicted from ion charges. Nitrogen and oxygen alone give $\mathrm{N_2O}$, $\mathrm{NO}$, $\mathrm{NO_2}$, $\mathrm{N_2O_3}$, $\mathrm{N_2O_4}$ and $\mathrm{N_2O_5}$, and the name has to distinguish all six. In a salt such as magnesium chloride, by contrast, there is only one possible neutral ratio.

Two more families complete the first-year vocabulary.

**Acids.** A compound that releases $\mathrm{H^{+}}$ in water is named as an acid when it is in aqueous solution. Binary acids take *hydro-…-ic acid*: $\mathrm{HCl(aq)}$ is hydrochloric acid, $\mathrm{HBr(aq)}$ hydrobromic acid. Oxoacids are named from their anions, *-ate* becoming *-ic acid* and *-ite* becoming *-ous acid*: $\mathrm{HNO_3}$ nitric acid (nitrate), $\mathrm{HNO_2}$ nitrous acid (nitrite), $\mathrm{H_2SO_4}$ sulfuric acid, $\mathrm{H_2SO_3}$ sulfurous acid, $\mathrm{H_3PO_4}$ phosphoric acid, $\mathrm{HClO_4}$ perchloric acid, $\mathrm{HClO}$ hypochlorous acid. Pure, gaseous $\mathrm{HCl}$ is hydrogen chloride; the word *acid* describes its behaviour in water.

**Hydrates.** Many salts crystallise with water molecules held in fixed proportion in the lattice, the **water of crystallisation**. The formula joins the salt and the water by a raised dot and the name adds a prefixed *hydrate*: $\mathrm{CuSO_4\cdot 5H_2O}$ copper(II) sulfate pentahydrate, $\mathrm{MgSO_4\cdot 7H_2O}$ magnesium sulfate heptahydrate (Epsom salt), $\mathrm{CaSO_4\cdot 2H_2O}$ calcium sulfate dihydrate (gypsum). The dot is not a multiplication sign. It means "together with", and the molar mass is the sum of both parts.

::: example Formulas from names, and names from formulas {#ex-names}
(a) Write formulas for aluminium sulfate, calcium phosphate, iron(III) oxide and ammonium carbonate. (b) Name $\mathrm{FeCl_2}$, $\mathrm{N_2O_4}$, $\mathrm{KMnO_4}$ and $\mathrm{Cu(NO_3)_2}$.
::: solution
(a) *Aluminium sulfate*: $\mathrm{Al^{3+}}$ and $\mathrm{SO_4^{2-}}$; the charges reach $\pm 6$ with two and three ions, so $\mathrm{Al_2(SO_4)_3}$. *Calcium phosphate*: $\mathrm{Ca^{2+}}$ and $\mathrm{PO_4^{3-}}$; again $\pm 6$, with three calcium and two phosphate, so $\mathrm{Ca_3(PO_4)_2}$. *Iron(III) oxide*: the numeral says $\mathrm{Fe^{3+}}$, with $\mathrm{O^{2-}}$; $\mathrm{lcm}(3,2) = 6$ gives $\mathrm{Fe_2O_3}$. *Ammonium carbonate*: $\mathrm{NH_4^{+}}$ and $\mathrm{CO_3^{2-}}$; two ammonium ions per carbonate, so $\mathrm{(NH_4)_2CO_3}$. Each check sums to zero: $2(+3) + 3(-2) = 0$, $3(+2) + 2(-3) = 0$, $2(+3) + 3(-2) = 0$, $2(+1) + (-2) = 0$.

(b) $\mathrm{FeCl_2}$: chloride is $-1$, two of them make $-2$, so iron is $\mathrm{Fe^{2+}}$ and the name is *iron(II) chloride*. The numeral is required because iron also forms $\mathrm{FeCl_3}$. $\mathrm{N_2O_4}$ is a compound of two non-metals, so prefixes are used: *dinitrogen tetraoxide*. $\mathrm{KMnO_4}$ contains $\mathrm{K^{+}}$ and the permanganate ion $\mathrm{MnO_4^{-}}$: *potassium permanganate*. Potassium has only one ion charge, so no numeral is used. $\mathrm{Cu(NO_3)_2}$: two nitrate ions carry $-2$, so copper is $\mathrm{Cu^{2+}}$, and the name is *copper(II) nitrate*.

The reasoning in (b) always runs through the anion. Its charge is fixed by the table, so the cation's charge is whatever neutrality demands, and the Roman numeral simply reports it.
:::
:::

The Roman numeral is the oxidation number of the metal, in the sense used in [[general-chemistry-1/stoichiometry]]. For a monatomic cation it equals the ionic charge. Oxidation numbers also explain the chlorine oxoanion series: chlorine is $+7$ in perchlorate, $+5$ in chlorate, $+3$ in chlorite and $+1$ in hypochlorite. The suffixes are a reminder of a ladder of oxidation states, not arbitrary decoration.

::: warning Three errors in reading a formula {#warn-formula}
*Ionic charges are not subscripts.* Magnesium chloride is $\mathrm{MgCl_2}$, not $\mathrm{Mg_2Cl}$ and not $\mathrm{MgCl}$: the $2$ in $\mathrm{Mg^{2+}}$ becomes the number of chloride ions, not the number of magnesium ions. *Prefixes do not belong in the names of simple salts.* $\mathrm{CaCl_2}$ is calcium chloride, while $\mathrm{FeCl_3}$ is iron(III) chloride; "iron trichloride" is not the systematic name of the salt, and "iron chloride" is ambiguous. *Capital letters carry meaning.* $\mathrm{Co}$ is cobalt and $\mathrm{CO}$ is carbon monoxide; $\mathrm{NO}$ is nitrogen monoxide and $\mathrm{No}$ is nobelium. A formula copied with the wrong case names a different substance, with a different molar mass and a different hazard.
:::

## Percentage composition

A formula, together with atomic weights, fixes how the mass of a compound is divided among its elements. That division is the composition reported by elemental analysis and the figure printed on a fertiliser bag as "nitrogen content".

::: definition Mass percentage of an element {#def-mass-percent}
The **mass percentage** (mass fraction × 100 %) of element $\mathrm{E}$ in a compound is

$$
w(\mathrm{E}) = \frac{\text{mass of } \mathrm{E} \text{ in a sample}}{\text{mass of the sample}} \times 100\%.
$$

The percentages of all the elements in a pure compound add up to $100\%$, apart from rounding. For a pure substance $w(\mathrm{E})$ does not depend on the size of the sample: this is Proust's law of definite proportions.
:::

::: proposition Mass percentage from a formula {#prop-percent}
If one formula unit (or molecule) of a compound contains $k$ atoms of element $\mathrm{E}$, then

$$
w(\mathrm{E}) = \frac{k\,M(\mathrm{E})}{M(\text{compound})} \times 100\%,
$$

where $M(\mathrm{E})$ is the molar mass of the element and $M(\text{compound})$ the molar mass of the compound. The result holds for any pure sample of the compound, and for a hydrate only if the water of crystallisation is included in $M(\text{compound})$.
:::

::: proof
Take exactly one mole of the compound. Its mass is $M(\text{compound})$ multiplied by $1\ \mathrm{mol}$. Each formula unit contains $k$ atoms of $\mathrm{E}$, so one mole of formula units contains $k$ moles of $\mathrm{E}$ atoms, whose mass is $k\,M(\mathrm{E})$ multiplied by $1\ \mathrm{mol}$. The mass fraction is the ratio of these masses, and the factor $1\ \mathrm{mol}$ cancels:

$$
\frac{k\,M(\mathrm{E})\times 1\ \mathrm{mol}}{M(\text{compound})\times 1\ \mathrm{mol}} = \frac{k\,M(\mathrm{E})}{M(\text{compound})}.
$$

A sample of any other mass $m$ contains $m/M(\text{compound})$ moles of compound, and both the element mass and the sample mass scale by the same factor, so the fraction is unchanged. That is why a percentage composition belongs to the substance and not to the sample.
:::

::: example Nitrogen in a fertiliser {#ex-nh4no3}
Ammonium nitrate, $\mathrm{NH_4NO_3}$, is a nitrogen fertiliser. Calculate the mass percentage of each element, and the mass of nitrogen supplied by $1.000\ \mathrm{kg}$ of the pure salt.
::: solution
One formula unit contains two nitrogen atoms (one in $\mathrm{NH_4^{+}}$ and one in $\mathrm{NO_3^{-}}$), four hydrogen atoms and three oxygen atoms. The molar mass is

$$
M(\mathrm{NH_4NO_3}) = 2(14.007) + 4(1.008) + 3(15.999) = 28.014 + 4.032 + 47.997 = 80.043\ \mathrm{g\,mol^{-1}}.
$$

By [[#prop-percent]],

$$
w(\mathrm{N}) = \frac{28.014}{80.043}\times 100\% = 35.00\%,\quad
w(\mathrm{H}) = \frac{4.032}{80.043}\times 100\% = 5.04\%,\quad
w(\mathrm{O}) = \frac{47.997}{80.043}\times 100\% = 59.96\%.
$$

The three add to $100.00\%$. A kilogram of the pure salt therefore supplies $0.3500 \times 1.000\ \mathrm{kg} = 0.3500\ \mathrm{kg}$, or $350.0\ \mathrm{g}$, of nitrogen. Counting nitrogen only once, because "the formula has an $\mathrm{N}$ at the start", would give half the right answer: always count every atom of the element in the whole formula unit.

Ammonium nitrate is classified as an oxidiser, and large stocks are stored under specific regulations because contaminated or heated material can decompose violently. That is a reason for its regulation, not a topic for this chapter's arithmetic.
:::
:::

The same proposition explains a pattern worth seeing once. In the alkanes, $\mathrm{C}_n\mathrm{H}_{2n+2}$, each extra carbon adds a $\mathrm{CH_2}$ unit. The two hydrogens at the chain ends matter less and less as the chain grows, so the carbon percentage climbs towards that of $\mathrm{CH_2}$ itself, $12.011/14.027 = 85.63\%$, and never reaches it.

::: widget plot
f: 100*12.011*x/(14.027*x + 2.016)
x: 1, 30
y: 70, 90
hlines: 85.63
labels: w(\mathrm{C})/\%
caption: Mass percentage of carbon in the alkane $\mathrm{C}_n\mathrm{H}_{2n+2}$ plotted against $n$ (read only the whole-number values). Methane is $74.87\%$ carbon; octane, $n = 8$, is $84.12\%$. The dashed line is $85.63\%$, the value for the repeating unit $\mathrm{CH_2}$, which the series approaches but never reaches. Percentage composition alone barely distinguishes long-chain alkanes from one another, which is why the molar mass is needed to fix a molecular formula.
:::

The flattening of that curve is a warning about precision. Octane and decane differ by less than one percentage point in carbon. An analysis good to $\pm 0.3$ percentage points, which is typical, cannot tell neighbouring long alkanes apart without a separate molar mass measurement. The next section makes that point formal.

## Empirical and molecular formulas

An elemental analysis reports percentages. Percentages give ratios of atoms. Ratios of atoms do not give the number of atoms in one molecule, because benzene, $\mathrm{C_6H_6}$, and ethyne, $\mathrm{C_2H_2}$, have the same composition, $92.26\%$ carbon by mass. The distinction is made by two kinds of formula.

::: definition Empirical and molecular formulas {#def-empirical}
The **empirical formula** of a compound gives the smallest whole-number ratio of the atoms of each element in it. The **molecular formula** gives the actual number of atoms of each element in one molecule. The molecular formula is a whole-number multiple $n$ of the empirical formula,

$$
\text{molecular formula} = (\text{empirical formula})_n, \qquad n = \frac{M(\text{compound})}{M(\text{empirical formula unit})}.
$$

For an ionic compound the formula unit is already the smallest ratio, so the empirical formula is the formula. Glucose has molecular formula $\mathrm{C_6H_{12}O_6}$ and empirical formula $\mathrm{CH_2O}$; hydrogen peroxide is $\mathrm{H_2O_2}$ with empirical formula $\mathrm{HO}$; water is $\mathrm{H_2O}$ for both.
:::

Different compounds can share an empirical formula — methanal ($\mathrm{CH_2O}$), ethanoic acid ($\mathrm{C_2H_4O_2}$) and glucose ($\mathrm{C_6H_{12}O_6}$) all reduce to $\mathrm{CH_2O}$ — and even the molecular formula does not identify a substance uniquely: ethanol and methoxymethane are both $\mathrm{C_2H_6O}$. How the atoms are connected is a structural question for [[organic-1/organic-structures]]. This chapter goes as far as the formula.

::: algorithm Empirical formula from mass percentages {#alg-empirical}
1. Assume a sample of $100\ \mathrm{g}$, so that each percentage becomes a mass in grams. (Any mass works; $100\ \mathrm{g}$ saves a step.) If one element's percentage is not reported, and the others are known to be the only elements present, obtain it by difference from $100\%$.
2. Divide each mass by the element's molar mass to get an amount in moles.
3. Divide every amount by the smallest of them.
4. If the quotients are all close to whole numbers (within about $0.05$), round them. If one is close to a simple fraction — $x.50$, $x.33$, $x.67$, $x.25$, $x.75$ — multiply *all* the quotients by $2$, $3$, $3$, $4$ or $4$ respectively, and then round.
5. Write the empirical formula with these whole numbers as subscripts.
6. If a molar mass is known, compute $n = M(\text{compound})/M(\text{empirical})$, round $n$ to a whole number, and multiply every subscript by it.
:::

Step 4 is where most errors are made. A quotient of $1.33$ is not "about $1$", and rounding it down produces a formula that contradicts the data by a quarter of the oxygen. The data are good to two or three per cent of each quotient, not to thirty.

::: example An empirical formula needing a factor of three {#ex-fe3o4}
A black iron oxide contains $72.36\%$ iron by mass, the rest being oxygen. Find its empirical formula.
::: solution
Oxygen is obtained by difference: $100.00 - 72.36 = 27.64\%$. In $100\ \mathrm{g}$:

$$
n(\mathrm{Fe}) = \frac{72.36\ \mathrm{g}}{55.845\ \mathrm{g\,mol^{-1}}} = 1.2957\ \mathrm{mol}, \qquad
n(\mathrm{O}) = \frac{27.64\ \mathrm{g}}{15.999\ \mathrm{g\,mol^{-1}}} = 1.7276\ \mathrm{mol}.
$$

Dividing by the smaller amount gives $\mathrm{Fe}$ $1.000$ and $\mathrm{O}$ $1.7276/1.2957 = 1.333$. The oxygen quotient is a third, not a rounding error. Multiplying both by $3$ gives $\mathrm{Fe}$ $3.000$, $\mathrm{O}$ $4.000$, so the empirical formula is $\mathrm{Fe_3O_4}$.

Check by [[#prop-percent]]: $M(\mathrm{Fe_3O_4}) = 3(55.845) + 4(15.999) = 231.531\ \mathrm{g\,mol^{-1}}$, and $w(\mathrm{Fe}) = 167.535/231.531 \times 100\% = 72.36\%$, as given. Rounding $1.333$ to $1$ would have produced $\mathrm{FeO}$, which is $77.73\%$ iron, five percentage points from the measurement. This oxide is magnetite, in which iron is present as both $\mathrm{Fe^{2+}}$ and $\mathrm{Fe^{3+}}$; the average oxidation number $+8/3$ is a sign that the formula unit contains two kinds of iron ion, not that an ion carries a fractional charge.
:::
:::

Elemental analysis of organic compounds is usually done by **combustion analysis**. A weighed sample is burned completely in a stream of oxygen; all the carbon leaves as carbon dioxide and all the hydrogen as water, and the masses of the two are measured. Oxygen in the sample cannot be found this way, because the oxygen in the products came partly from the gas stream, so it is obtained by difference.

::: example Combustion analysis {#ex-combustion}
A $0.2500\ \mathrm{g}$ sample of a compound containing only carbon, hydrogen and oxygen is burned completely. It gives $0.4994\ \mathrm{g}$ of $\mathrm{CO_2}$ and $0.2045\ \mathrm{g}$ of $\mathrm{H_2O}$. A separate measurement gives a molar mass close to $88\ \mathrm{g\,mol^{-1}}$. Find the empirical and molecular formulas.
::: solution
All the carbon in the $\mathrm{CO_2}$ came from the sample. $M(\mathrm{CO_2}) = 44.009\ \mathrm{g\,mol^{-1}}$, of which $12.011$ is carbon, so

$$
m(\mathrm{C}) = 0.4994\ \mathrm{g} \times \frac{12.011}{44.009} = 0.13630\ \mathrm{g}.
$$

All the hydrogen in the water came from the sample. $M(\mathrm{H_2O}) = 18.015\ \mathrm{g\,mol^{-1}}$, of which $2 \times 1.008 = 2.016$ is hydrogen, so

$$
m(\mathrm{H}) = 0.2045\ \mathrm{g} \times \frac{2.016}{18.015} = 0.022885\ \mathrm{g}.
$$

Oxygen by difference: $m(\mathrm{O}) = 0.2500 - 0.13630 - 0.02289 = 0.09082\ \mathrm{g}$.

Amounts: $n(\mathrm{C}) = 0.13630/12.011 = 0.011348\ \mathrm{mol}$, $n(\mathrm{H}) = 0.022885/1.008 = 0.022703\ \mathrm{mol}$, $n(\mathrm{O}) = 0.09082/15.999 = 0.005676\ \mathrm{mol}$. Dividing by the smallest, $0.005676$, gives $\mathrm{C}$ $1.999$, $\mathrm{H}$ $4.000$, $\mathrm{O}$ $1.000$. The empirical formula is $\mathrm{C_2H_4O}$, with $M = 2(12.011) + 4(1.008) + 15.999 = 44.053\ \mathrm{g\,mol^{-1}}$.

The molar mass is about $88\ \mathrm{g\,mol^{-1}}$, and $88/44.053 = 2.0$, so $n = 2$ and the molecular formula is $\mathrm{C_4H_8O_2}$, molar mass $88.106\ \mathrm{g\,mol^{-1}}$. The molar mass measurement only had to be good enough to distinguish $n = 2$ from $n = 1$ or $3$; the exact molar mass comes from the formula. Ethyl ethanoate (ethyl acetate) has this formula, and so do butanoic acid and several other compounds; the formula alone does not say which.
:::
:::

### Hydrates

Water of crystallisation is weighed along with the salt, so it must be counted in the molar mass. It can usually be driven off by gentle heating, and the loss of mass then measures it. If a hydrate $\mathrm{AB}\cdot x\mathrm{H_2O}$ of mass $m_1$ leaves anhydrous $\mathrm{AB}$ of mass $m_2$, the amounts are $n(\mathrm{H_2O}) = (m_1 - m_2)/M(\mathrm{H_2O})$ and $n(\mathrm{AB}) = m_2/M(\mathrm{AB})$, and $x$ is their ratio.

::: example Water of crystallisation in copper(II) sulfate {#ex-hydrate}
A sample of hydrated copper(II) sulfate, $\mathrm{CuSO_4\cdot}x\mathrm{H_2O}$, of mass $2.500\ \mathrm{g}$ is heated until its mass is constant. The white anhydrous residue weighs $1.598\ \mathrm{g}$. Find $x$, and the mass percentage of water in the hydrate.
::: solution
$M(\mathrm{CuSO_4}) = 63.546 + 32.06 + 4(15.999) = 159.602\ \mathrm{g\,mol^{-1}}$ and $M(\mathrm{H_2O}) = 18.015\ \mathrm{g\,mol^{-1}}$. The water lost has mass $2.500 - 1.598 = 0.902\ \mathrm{g}$. Then

$$
n(\mathrm{H_2O}) = \frac{0.902}{18.015} = 0.05007\ \mathrm{mol}, \qquad
n(\mathrm{CuSO_4}) = \frac{1.598}{159.602} = 0.010012\ \mathrm{mol},
$$

and $x = 0.05007/0.010012 = 5.00$. The salt is the pentahydrate, $\mathrm{CuSO_4\cdot 5H_2O}$, with molar mass $159.602 + 5(18.015) = 249.677\ \mathrm{g\,mol^{-1}}$. The water fraction is $90.075/249.677 \times 100\% = 36.08\%$, which matches the measured loss, $0.902/2.500 \times 100\% = 36.1\%$.

The subtraction $2.500 - 1.598$ leaves only three significant figures, so $x$ is known to about $\pm 0.01$, ample to choose the integer. The whole-number answer is the chemistry: a hydrate is a definite compound, and an $x$ of $4.6$ would mean incomplete heating or a damp sample, not a new hydrate. Copper(II) sulfate is harmful if swallowed, irritating to the eyes and very toxic to aquatic life, so the residue goes into the labelled waste, not the sink; heating any solid needs eye protection, supervision and a risk assessment.
:::
:::

::: widget plot
f: 100*18.015*x/(a + 18.015*x)
x: 0, 10
y: 0, 60
sliders: a=159.6:100:300:0.1
points: 5, 36.08
labels: w(\mathrm{H_2O})/\%
caption: Mass percentage of water in a hydrate $\mathrm{AB}\cdot x\mathrm{H_2O}$ against the number $x$ of water molecules, for an anhydrous salt of molar mass $a$ (in $\mathrm{g\,mol^{-1}}$; default $159.6$, copper(II) sulfate). The marked point is the pentahydrate at $36.08\%$. Set $a = 120.4$ for magnesium sulfate and read the heptahydrate, $x = 7$, near $51.2\%$. The curve rises steeply at first and then flattens, so a measured water percentage separates low hydrates sharply and high hydrates less sharply.
:::

::: quiz
Which statement about the formula $\mathrm{C_6H_{12}O_6}$ (glucose) is right?
- [x] It is a molecular formula; the empirical formula is $\mathrm{CH_2O}$, and its mass percentages are the same as those of $\mathrm{CH_2O}$.
- [ ] It is an empirical formula, because the subscripts are whole numbers.
- [ ] The empirical formula is $\mathrm{C_6H_{12}O_6}$ divided by $6$, which is $\mathrm{CH_2O}$, so glucose has one sixth of the carbon percentage of the formula $\mathrm{CH_2O}$.
- [ ] A combustion analysis of glucose determines its molecular formula without any further measurement.
::: solution
Every subscript is divisible by $6$, so $\mathrm{C_6H_{12}O_6}$ is not the smallest ratio; it is the molecular formula and $\mathrm{CH_2O}$ the empirical one. Dividing all the subscripts by the same number leaves every mass percentage unchanged, which is exactly why composition data alone cannot fix $n$. Combustion analysis gives the empirical formula; a molar mass is needed to choose $n = 6$.
:::
:::

::: history
Systematic chemical names are younger than Lavoisier's balance only by a few years. In 1787 Louis-Bernard Guyton de Morveau, Antoine Lavoisier, Claude Louis Berthollet and Antoine François de Fourcroy published the *Méthode de nomenclature chimique*, which replaced names such as "oil of vitriol" and "flowers of zinc" by names built from the composition of a substance: sulfuric acid, zinc oxide, and the endings *-ate* and *-ite* for salts of the acids in *-ic* and *-ous* that are still used in this chapter. Jöns Jacob Berzelius introduced letter symbols for the elements, written as the initial letters of their Latin names, in papers of 1813–1814, and with them formulas in which numbers count atoms; his superscript numerals later moved down to become subscripts. Joseph Proust's law of definite proportions, defended in the 1790s and 1800s, is the empirical basis for a percentage composition belonging to a substance. The Roman-numeral notation for the charge of a metal is named after the German chemist Alfred Stock, who proposed it in 1919. The current rules are the IUPAC *Nomenclature of Inorganic Chemistry: IUPAC Recommendations 2005*, the "Red Book".
:::

## Where this leads

The formulas fixed here are the ones the coefficients of [[general-chemistry-1/stoichiometry]] multiply, and the molar masses computed here are the ones its mass–mole conversions divide by. The polyatomic ions of the table reappear as spectators and as reactants in [[general-chemistry-1/solutions-reactions]], where solubility depends on which cation is paired with which anion. The charges of the monatomic ions were stated here as a pattern to be learned; [[general-chemistry-1/periodicity]] explains them through electron configurations, and [[bonding-structure/ionic-bonding]] explains why a lattice of those ions is stable at all, through the lattice energy. Organic compounds are named by a different, structural system, introduced in [[organic-1/organic-structures]], because a molecular formula such as $\mathrm{C_4H_8O_2}$ stands for many different molecules. And the oxidation numbers carried by Roman numerals become the language of redox chemistry in [[main-group/inorganic-redox]].

::: summary
- An ionic compound is a lattice of cations and anions; its formula is the smallest neutral ratio of ions. A molecular compound is made of discrete molecules; its formula counts the atoms in one molecule.
- Ionic formulas follow from charge balance: the totals of positive and negative charge cancel, with polyatomic ions bracketed when there is more than one.
- Salts are named cation then anion, with a Roman numeral for a metal of variable charge and no prefixes. Binary molecular compounds use prefixes (mono-, di-, tri- …), because their compositions cannot be predicted from charges.
- Oxoanions use *-ate* and *-ite*, with *per-* and *hypo-* at the ends of a series; the corresponding acids are *-ic* and *-ous*. Hydrates are written $\mathrm{AB}\cdot x\mathrm{H_2O}$, and the water counts in the molar mass.
- The mass percentage of an element is $k\,M(\mathrm{E})/M(\text{compound}) \times 100\%$, a property of the substance, independent of sample size.
- From percentages: take $100\ \mathrm{g}$, convert to moles, divide by the smallest, and clear fractions such as $0.33$ or $0.5$ by multiplying, never by rounding. The result is the empirical formula.
- The molecular formula is $n$ times the empirical formula, with $n = M(\text{compound})/M(\text{empirical})$; composition data alone cannot determine $n$.
:::

## Exercises

::: exercise Oxygen atoms in calcium nitrate {#exr-cano3 level=1 check="6"}
Write the formula of calcium nitrate from the ions $\mathrm{Ca^{2+}}$ and $\mathrm{NO_3^{-}}$. How many oxygen atoms does one formula unit contain? (Enter the number of oxygen atoms.)
::: solution
Two nitrate ions, each $-1$, balance one $\mathrm{Ca^{2+}}$, so the formula is $\mathrm{Ca(NO_3)_2}$. The subscript $2$ outside the bracket multiplies everything inside it, so one formula unit contains $2 \times 3 = 6$ oxygen atoms (and two nitrogen atoms). Without the bracket, $\mathrm{CaNO_{32}}$ would claim thirty-two oxygen atoms on one nitrogen.
:::
:::

::: exercise The oxidation state in a permanganate {#exr-mn level=1 check="7"}
Potassium permanganate is $\mathrm{KMnO_4}$. Using $+1$ for potassium and $-2$ for oxygen, find the oxidation number of manganese. (Enter the oxidation number as a number.)
::: solution
The formula unit is neutral: $(+1) + x + 4(-2) = 0$, so $x = +7$. Equivalently, the permanganate ion $\mathrm{MnO_4^{-}}$ has total charge $-1 = x + 4(-2)$, giving $x = +7$. If the compound were named in Stock style it would be potassium tetraoxidomanganate(VII), but the traditional name *permanganate* is accepted by IUPAC and used throughout.
:::
:::

::: exercise Nitrogen in urea {#exr-urea level=1 check="46.65"}
Urea, $\mathrm{CO(NH_2)_2}$, is used as a nitrogen fertiliser. Calculate the mass percentage of nitrogen in urea. (Enter the percentage to two decimal places.)
::: solution
One molecule contains one carbon, one oxygen, two nitrogen and four hydrogen atoms. $M = 12.011 + 15.999 + 2(14.007) + 4(1.008) = 60.056\ \mathrm{g\,mol^{-1}}$. Then

$$
w(\mathrm{N}) = \frac{2 \times 14.007}{60.056}\times 100\% = \frac{28.014}{60.056}\times 100\% = 46.65\%.
$$

Per kilogram, urea supplies more nitrogen than ammonium nitrate ($35.00\%$, [[#ex-nh4no3]]), which is one reason it is the most widely used solid nitrogen fertiliser.
:::
:::

::: exercise An empirical formula from three percentages {#exr-ethanol level=2 check="6"}
A liquid contains $52.14\%$ carbon, $13.13\%$ hydrogen and $34.73\%$ oxygen by mass. Find its empirical formula. (Enter the number of hydrogen atoms in the empirical formula.)
::: solution
In $100\ \mathrm{g}$: $n(\mathrm{C}) = 52.14/12.011 = 4.341\ \mathrm{mol}$, $n(\mathrm{H}) = 13.13/1.008 = 13.026\ \mathrm{mol}$, $n(\mathrm{O}) = 34.73/15.999 = 2.171\ \mathrm{mol}$. Dividing by $2.171$ gives $\mathrm{C}$ $2.000$, $\mathrm{H}$ $6.001$, $\mathrm{O}$ $1.000$. The empirical formula is $\mathrm{C_2H_6O}$, with six hydrogen atoms. This is the composition of ethanol, and also of methoxymethane; a structural method is needed to choose between them.
:::
:::

::: exercise Epsom salt {#exr-mgso4 level=2 check="7"}
A $5.061\ \mathrm{g}$ sample of hydrated magnesium sulfate, $\mathrm{MgSO_4\cdot}x\mathrm{H_2O}$, is heated to constant mass and leaves $2.472\ \mathrm{g}$ of anhydrous $\mathrm{MgSO_4}$. Find $x$. (Enter $x$ as a whole number.)
::: solution
$M(\mathrm{MgSO_4}) = 24.305 + 32.06 + 4(15.999) = 120.361\ \mathrm{g\,mol^{-1}}$. Water lost: $5.061 - 2.472 = 2.589\ \mathrm{g}$, so $n(\mathrm{H_2O}) = 2.589/18.015 = 0.14371\ \mathrm{mol}$. $n(\mathrm{MgSO_4}) = 2.472/120.361 = 0.020538\ \mathrm{mol}$. The ratio is $0.14371/0.020538 = 7.00$, so $x = 7$ and the hydrate is $\mathrm{MgSO_4\cdot 7H_2O}$, magnesium sulfate heptahydrate.
:::
:::

::: exercise From an empirical formula to a molecule {#exr-benzene level=2 check="6"}
A hydrocarbon has empirical formula $\mathrm{CH}$ and molar mass $78.11\ \mathrm{g\,mol^{-1}}$. Find the factor $n$ relating the molecular formula to the empirical formula, and write the molecular formula. (Enter $n$.)
::: solution
$M(\mathrm{CH}) = 12.011 + 1.008 = 13.019\ \mathrm{g\,mol^{-1}}$. Then $n = 78.11/13.019 = 6.000$, so the molecular formula is $\mathrm{C_6H_6}$, molar mass $6 \times 13.019 = 78.114\ \mathrm{g\,mol^{-1}}$, as measured. Ethyne, $\mathrm{C_2H_2}$, has the same empirical formula and $n = 2$; only the molar mass separates them.
:::
:::

::: exercise A mixture is not a compound {#exr-mixture level=3 check="56.8"}
A white powder is a mixture of sodium chloride and potassium chloride only. Analysis shows that it contains $55.00\%$ chlorine by mass. What is the mass percentage of $\mathrm{NaCl}$ in the mixture? Use $M(\mathrm{NaCl}) = 58.44$ and $M(\mathrm{KCl}) = 74.548\ \mathrm{g\,mol^{-1}}$. (Enter the percentage of $\mathrm{NaCl}$ to three significant figures.)
::: hint
Find the chlorine fraction of each pure salt from [[#prop-percent]]. If the mass fraction of $\mathrm{NaCl}$ is $y$, the mixture's chlorine fraction is a weighted average of the two.
:::
::: solution
The chlorine fractions of the pure salts are $35.45/58.44 = 0.60661$ for $\mathrm{NaCl}$ and $35.45/74.548 = 0.47553$ for $\mathrm{KCl}$. Take $100\ \mathrm{g}$ of mixture containing $100y\ \mathrm{g}$ of $\mathrm{NaCl}$ and $100(1-y)\ \mathrm{g}$ of $\mathrm{KCl}$. The chlorine it contains is

$$
0.60661\,(100y) + 0.47553\,(100)(1 - y) = 55.00\ \mathrm{g}.
$$

Solving, $0.13108\,y = 0.55000 - 0.47553 = 0.07447$, so $y = 0.5681$. The mixture is $56.8\%$ $\mathrm{NaCl}$ by mass (and $43.2\%$ $\mathrm{KCl}$).

A mixture has no fixed percentage composition: $55.00\%$ chlorine is a fact about this sample, not about a substance. Applying [[#alg-empirical]] to it would give a meaningless "formula" with sodium and potassium in an arbitrary ratio, which is why purity has to be established before an empirical formula is believed. The answer is also sensitive to the data: the two pure salts differ by only $13$ percentage points of chlorine, so an error of $0.1$ percentage point in the analysis moves $y$ by almost one percentage point.
:::
:::

::: exercise Combustion analysis of a compound containing nitrogen {#exr-nitrogen level=3 check="8"}
A $0.1500\ \mathrm{g}$ sample of a compound of carbon, hydrogen, nitrogen and oxygen is burned completely and gives $0.2248\ \mathrm{g}$ of $\mathrm{CO_2}$ and $0.1227\ \mathrm{g}$ of $\mathrm{H_2O}$. A separate analysis shows that it contains $31.79\%$ nitrogen by mass. Its molar mass is close to $88\ \mathrm{g\,mol^{-1}}$. Find the empirical and molecular formulas. (Enter the number of hydrogen atoms in one molecule.)
::: hint
Find the masses of carbon and hydrogen from the combustion products, the mass of nitrogen from its percentage, and oxygen by difference. Then follow [[#alg-empirical]].
:::
::: solution
Carbon: $m(\mathrm{C}) = 0.2248 \times 12.011/44.009 = 0.061353\ \mathrm{g}$, so $n(\mathrm{C}) = 0.061353/12.011 = 0.0051080\ \mathrm{mol}$.

Hydrogen: $m(\mathrm{H}) = 0.1227 \times 2.016/18.015 = 0.013731\ \mathrm{g}$, so $n(\mathrm{H}) = 0.013731/1.008 = 0.013622\ \mathrm{mol}$.

Nitrogen: $m(\mathrm{N}) = 0.3179 \times 0.1500 = 0.047685\ \mathrm{g}$, so $n(\mathrm{N}) = 0.047685/14.007 = 0.0034044\ \mathrm{mol}$.

Oxygen by difference: $m(\mathrm{O}) = 0.1500 - 0.061353 - 0.013731 - 0.047685 = 0.027231\ \mathrm{g}$, so $n(\mathrm{O}) = 0.027231/15.999 = 0.0017021\ \mathrm{mol}$.

Dividing by the smallest amount, $0.0017021\ \mathrm{mol}$, gives $\mathrm{C}$ $3.001$, $\mathrm{H}$ $8.003$, $\mathrm{N}$ $2.000$, $\mathrm{O}$ $1.000$. The empirical formula is $\mathrm{C_3H_8N_2O}$, with $M = 3(12.011) + 8(1.008) + 2(14.007) + 15.999 = 88.110\ \mathrm{g\,mol^{-1}}$. Since the molar mass is close to $88\ \mathrm{g\,mol^{-1}}$, $n = 88/88.110 = 1.0$ and the molecular formula is the empirical formula, $\mathrm{C_3H_8N_2O}$, with eight hydrogen atoms.

Notice that dividing by the nitrogen amount first would have given $\mathrm{C}$ $1.50$, $\mathrm{H}$ $4.00$, $\mathrm{N}$ $1$, $\mathrm{O}$ $0.50$ — the same ratio, cleared by multiplying by $2$. Whichever element you divide by, the ratio is the same; dividing by the smallest amount simply avoids quotients below one. Oxygen, found by difference, carries the accumulated error of the other three determinations, so it is the quotient to trust least.
:::
:::

::: exercise Iron in an ore {#exr-ore level=3 check="0.979"}
Haematite is iron(III) oxide. A $2.000\ \mathrm{kg}$ sample of ore contains $70.00\%$ $\mathrm{Fe_2O_3}$ by mass, and the rest of the ore contains no iron. Find the mass of iron in the sample, and explain why it is not $0.7000 \times 2.000\ \mathrm{kg}$. (Enter the mass of iron in kilograms, to three significant figures.)
::: solution
$M(\mathrm{Fe_2O_3}) = 2(55.845) + 3(15.999) = 159.687\ \mathrm{g\,mol^{-1}}$, and by [[#prop-percent]] the iron fraction of the pure oxide is $111.690/159.687 = 0.69943$. The ore contains $0.7000 \times 2.000 = 1.400\ \mathrm{kg}$ of oxide, which holds

$$
m(\mathrm{Fe}) = 1.400\ \mathrm{kg} \times 0.69943 = 0.9792\ \mathrm{kg},
$$

or $0.979\ \mathrm{kg}$ to three significant figures. The $70.00\%$ is the percentage of *oxide* in the ore, not of iron. Two fractions are chained — the oxide content of the ore and the iron content of the oxide — and they multiply: the ore is $0.7000 \times 0.69943 \times 100\% = 48.96\%$ iron. The coincidence that the oxide is itself almost $70\%$ iron makes the mistake of using one fraction where two are needed especially easy to miss.
:::
:::
