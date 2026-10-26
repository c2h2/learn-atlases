A laboratory gas burner is adjusted until the flame is blue and quiet. Under that adjustment sits one equation,

$$
\mathrm{CH_4(g) + 2\,O_2(g) \rightarrow CO_2(g) + 2\,H_2O(g)},
$$

and the whole of this chapter is about taking an equation of that kind seriously. The $2$ in front of oxygen is not a suggestion, and it is not a mass. It says that two moles of oxygen molecules are consumed for every mole of methane molecules. A flame starved of air deposits soot; a flame drowned in air is blown cold. The proportion of each reagent, not merely its presence, decides what happens. **Stoichiometry** is the arithmetic of those proportions. It turns a balanced equation into a prediction of how much product a given charge can make, which reagent runs out first, and how close a real experiment came to the prediction on paper.

Methane in air is flammable, and a fuel–air mixture confined in a vessel can explode. The calculations below are desk work. Any practical combustion, and any generation of hydrogen from metal and acid later in the chapter, needs supervision, eye protection and a written risk assessment. Nothing here is a set of operating instructions.

The arithmetic rests on two facts you already have. Atoms are not created or destroyed in a chemical change, so a legal equation has the same number of each kind of atom on both sides. And the mole, from [[general-chemistry-1/atoms-and-moles]], converts a mass you can weigh into an amount of substance you can compare with a coefficient. Molar masses below use the atomic weights of this course: $\mathrm{C}\ 12.011$, $\mathrm{H}\ 1.008$, $\mathrm{O}\ 15.999$, and the others as they appear. Carry extra digits through a calculation and round only the final answer, to the significant figures of the least precise measured quantity. Stoichiometric coefficients and the factor that converts $\mathrm{cm^3}$ into $\mathrm{dm^3}$ are exact.

## Balancing chemical equations

A formula is a claim about a substance. The subscript in $\mathrm{H_2O}$ says that a water molecule contains two hydrogen atoms and one oxygen atom; changing it to $\mathrm{H_2O_2}$ does not "fix" an equation, it changes the subject to hydrogen peroxide. Coefficients, written in front of formulas, are the only numbers you are allowed to adjust, and they multiply the whole formula: $2\,\mathrm{H_2O}$ means two molecules of water, hence four hydrogen atoms and two oxygen atoms.

::: algorithm Balancing by inspection {#alg-balance}
To balance an equation that is not already obvious:

1. Write the correct formulas of every reactant and product, with state symbols if they matter. Do not change a subscript afterwards.
2. Begin with an element that appears in only one formula on each side. Balance it by a coefficient.
3. Leave oxygen and hydrogen until later when the equation is a combustion; they usually appear in more than one place.
4. If a coefficient comes out as a fraction, multiply every coefficient by the denominator so that all of them are the smallest whole numbers.
5. Count every element again. For an ionic equation, the total charge must balance as well.
6. If the reaction is a redox process, assign oxidation numbers as a check: the total increase in oxidation number must equal the total decrease. A mismatch means the coefficients are wrong, or the products are. This is a check on a balance found by inspection, not the half-reaction method used for complicated cases.
:::

Oxidation numbers are a bookkeeping device, not charges that atoms literally carry in every bond. The rules used in this course are the ordinary ones: an element in its elemental form is $0$; a monatomic ion carries its charge; oxygen is $-2$ except in peroxides, where it is $-1$; hydrogen is $+1$ when bonded to a non-metal and $-1$ when bonded to a metal; the oxidation numbers in a species add to its net charge. A rise in oxidation number is oxidation, a fall is reduction. The species that is reduced is the oxidising agent; the species that is oxidised is the reducing agent.

::: example Balancing combustion and a redox equation {#ex-balance}
Balance (a) the combustion of ethane, $\mathrm{C_2H_6 + O_2 \rightarrow CO_2 + H_2O}$, and (b) the reduction of iron(III) oxide by carbon monoxide, $\mathrm{Fe_2O_3 + CO \rightarrow Fe + CO_2}$. In (b), assign oxidation numbers and confirm that the electron count matches.
::: solution
(a) Carbon and hydrogen each appear once on each side. Two carbons require $2\,\mathrm{CO_2}$; six hydrogens require $3\,\mathrm{H_2O}$. The right-hand side then holds $2\times 2 + 3 = 7$ oxygen atoms, so the oxygen coefficient on the left is $7/2$:

$$
\mathrm{C_2H_6 + \tfrac{7}{2}\,O_2 \rightarrow 2\,CO_2 + 3\,H_2O}.
$$

Multiply through by $2$ to clear the fraction:

$$
\mathrm{2\,C_2H_6 + 7\,O_2 \rightarrow 4\,CO_2 + 6\,H_2O}.
$$

Check: $\mathrm{C}$ $4=4$, $\mathrm{H}$ $12=12$, $\mathrm{O}$ $14=8+6$. Ethane is oxidised (carbon goes from $-3$ in $\mathrm{C_2H_6}$ to $+4$ in $\mathrm{CO_2}$) and oxygen is reduced, so the combustion is a redox reaction even though we balanced it by counting atoms.

(b) Iron appears as two atoms in $\mathrm{Fe_2O_3}$, so the iron metal needs the coefficient $2$. Oxygen on the left will then match if three $\mathrm{CO}$ molecules each take one more oxygen to become three $\mathrm{CO_2}$:

$$
\mathrm{Fe_2O_3(s) + 3\,CO(g) \rightarrow 2\,Fe(s) + 3\,CO_2(g)}.
$$

Atoms: $\mathrm{Fe}$ $2=2$, $\mathrm{C}$ $3=3$, $\mathrm{O}$ $3+3=6$. Oxidation numbers: oxygen is $-2$ throughout the compounds, so iron in $\mathrm{Fe_2O_3}$ is $+3$ and carbon in $\mathrm{CO}$ is $+2$. Iron metal is $0$ and carbon in $\mathrm{CO_2}$ is $+4$. Each iron atom falls by $3$, and two of them fall by $6$ altogether. Each carbon atom rises by $2$, and three of them rise by $6$. The increase matches the decrease, which is the redox check the algorithm asks for. Carbon monoxide is the reducing agent; iron(III) oxide is the oxidising agent.

This second equation is the essential reduction of a blast furnace, written so that the arithmetic can be practised. Carbon monoxide is an acute poison because it binds haemoglobin; the equation is not a preparation, and no conditions for generating the gas are given.
:::
:::

The same discipline — formulas fixed, coefficients varied, atoms counted, oxidation numbers used only as a check — is enough for every equation in this chapter. Half-equations become worth the extra machinery when the medium is acidic or basic and several elements change at once; you will not need them yet.

## Mole ratios, masses and amounts

::: proposition Stoichiometric coefficients {#prop-stoich-ratio}
The coefficients in a balanced chemical equation are relative amounts of substance, not relative masses. For a general reaction

$$
a\,\mathrm{A} + b\,\mathrm{B} \rightarrow c\,\mathrm{C} + d\,\mathrm{D}
$$

the **extent of reaction** $\xi$, in moles, is defined so that the amount of $\mathrm{A}$ consumed is $a\xi$, the amount of $\mathrm{B}$ consumed is $b\xi$, the amount of $\mathrm{C}$ produced is $c\xi$ and the amount of $\mathrm{D}$ produced is $d\xi$. The amounts that react or form are therefore in the ratio of the coefficients. Whenever $\mathrm{A}$ is consumed completely, with no side reaction,

$$
\frac{n(\mathrm{C})}{n(\mathrm{A})} = \frac{c}{a}
\qquad\text{and}\qquad
m(\mathrm{C}) = m(\mathrm{A})\cdot\frac{c}{a}\cdot\frac{M(\mathrm{C})}{M(\mathrm{A})}.
$$

The same pattern holds for every pair of species. If a reagent is not consumed completely, $\xi$ is fixed by the limiting reagent, defined in [[#def-limiting]], and the formula still gives the amount of product from that smaller extent.
:::

::: proof From amount to a mass–mass factor {#proof-mass-factor}
Amount and mass of a pure substance are related by the molar mass, $n = m/M$, which is the definition of molar mass rearranged. Suppose a mass $m(\mathrm{A})$ of $\mathrm{A}$ reacts completely, and $\mathrm{A}$ is limiting or is the only reactant that can run out. The amount consumed is

$$
n(\mathrm{A}) = \frac{m(\mathrm{A})}{M(\mathrm{A})}.
$$

By the definition of extent, $n(\mathrm{A}) = a\xi$, so $\xi = n(\mathrm{A})/a$. The amount of $\mathrm{C}$ produced is $c\xi$:

$$
n(\mathrm{C}) = c\cdot\frac{n(\mathrm{A})}{a} = n(\mathrm{A})\cdot\frac{c}{a}.
$$

Convert that amount back to a mass, $m(\mathrm{C}) = n(\mathrm{C})\,M(\mathrm{C})$:

$$
m(\mathrm{C}) = \frac{m(\mathrm{A})}{M(\mathrm{A})}\cdot\frac{c}{a}\cdot M(\mathrm{C}) = m(\mathrm{A})\cdot\frac{c}{a}\cdot\frac{M(\mathrm{C})}{M(\mathrm{A})}.
$$

The factor $(c/a)$ is a pure number taken from the equation. The factor $M(\mathrm{C})/M(\mathrm{A})$ converts that number into a mass ratio, and it is not optional: omitting it is the same mistake as treating a coefficient as a mass. For methane, $a = c = 1$, $M(\mathrm{CO_2})/M(\mathrm{CH_4}) = 44.009/16.043 = 2.743$, so complete combustion yields $2.743\ \mathrm{g}$ of carbon dioxide per gram of methane, not one gram.
:::

Read the chain from left to right whenever you are stuck. Mass of the known substance, divided by its molar mass, is an amount. Multiply by a ratio of coefficients to obtain the amount of the unknown substance. Multiply by the unknown's molar mass if a mass is what you were asked for. Amount to amount is the middle step, and it is the only step in which the equation itself is used.

::: example Mass and amount from the combustion of methane {#ex-ch4-mass}
Methane burns in excess oxygen by $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$. For $8.00\ \mathrm{g}$ of methane, find (a) the amount of methane, (b) the amount and mass of oxygen required, (c) the mass of carbon dioxide produced and (d) the mass of water produced. Molar masses: $\mathrm{CH_4}\ 16.043$, $\mathrm{O_2}\ 31.998$, $\mathrm{CO_2}\ 44.009$, $\mathrm{H_2O}\ 18.015\ \mathrm{g\,mol^{-1}}$.
::: solution
(a) $n(\mathrm{CH_4}) = 8.00/16.043 = 0.4987\ \mathrm{mol}$, which is $0.499\ \mathrm{mol}$ to three significant figures.

(b) The coefficient ratio is $2/1$, so $n(\mathrm{O_2}) = 2 \times 0.49866 = 0.9973\ \mathrm{mol}$ and

$$
m(\mathrm{O_2}) = 0.9973 \times 31.998 = 31.91\ \mathrm{g},
$$

which rounds to $31.9\ \mathrm{g}$. The mass ratio is not $2:1$. Per gram of methane the oxygen demand is $2 \times 31.998/16.043 = 3.99\ \mathrm{g}$, close to four grams, because $M(\mathrm{O_2})$ is about twice $M(\mathrm{CH_4})$ and the coefficient doubles it again.

(c) $n(\mathrm{CO_2}) = n(\mathrm{CH_4}) = 0.49866\ \mathrm{mol}$, so $m(\mathrm{CO_2}) = 0.49866 \times 44.009 = 21.95\ \mathrm{g}$, or $21.9\ \mathrm{g}$ to three significant figures. The mass–mass factor $44.009/16.043 = 2.743$ gives the same product: $8.00 \times 2.743 = 21.9\ \mathrm{g}$.

(d) $n(\mathrm{H_2O}) = 2 \times 0.49866 = 0.9973\ \mathrm{mol}$, and $m(\mathrm{H_2O}) = 0.9973 \times 18.015 = 17.97\ \mathrm{g}$, or $18.0\ \mathrm{g}$.

A useful check is conservation of mass. The inputs are $8.00 + 31.91 = 39.91\ \mathrm{g}$; the outputs are $21.95 + 17.97 = 39.92\ \mathrm{g}$. The $0.01\ \mathrm{g}$ discrepancy is rounding, not new matter. If your products and reactants disagree by more than the last place you have kept, an amount was lost in the coefficient step.
:::
:::

::: widget plot
f: min(x, a/2)
x: 0, 2
y: 0, 1.2
sliders: a=1:0.2:2:0.1
labels: n(\mathrm{CO_2})/\mathrm{mol}
caption: Amount of $\mathrm{CO_2}$ from $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$ when the amount of methane is $x$ (mol) and the amount of oxygen is the slider $a$ (mol). The product rises one-for-one with methane until the oxygen is used up, then the line is flat. The kink is the stoichiometric point $a = 2x$.
:::

The figure is the mole-ratio statement drawn as a graph. Along the rising part, methane is limiting and $\xi = n(\mathrm{CH_4})$. Along the flat part, oxygen is limiting and $\xi = n(\mathrm{O_2})/2$, so the amount of carbon dioxide cannot exceed half the amount of oxygen no matter how much methane you add. Slide $a$ and the kink moves. That kink is the whole content of a limiting-reagent problem.

## The limiting reagent

::: definition Limiting reagent {#def-limiting}
For $a\,\mathrm{A} + b\,\mathrm{B} \rightarrow$ products, with amounts $n(\mathrm{A})$ and $n(\mathrm{B})$ available, the extent cannot exceed either $n(\mathrm{A})/a$ or $n(\mathrm{B})/b$. The **limiting reagent** is the reactant with the smaller value of $n_i/\nu_i$, where $\nu_i$ is its coefficient. The **theoretical yield** of a product with coefficient $c$ is the amount $c\,\xi$ computed from that smaller value, converted to a mass if a mass is required. It is the most product the balanced equation can give from the amounts actually mixed, assuming the reaction proceeds exactly as written, with no side reaction and no loss. Any other reactant is **in excess**; the amount of it left over is its starting amount minus $\nu\xi$.
:::

Comparing masses, or comparing volumes of two solids, does not answer the question. A small mass of a substance with a small molar mass can be the larger amount. The test is always $n/\nu$, and $n$ comes from a mass only after division by $M$, or from a solution only after multiplying concentration by volume, which is the business of [[general-chemistry-1/solutions-reactions]].

::: example Methane with a limited supply of oxygen {#ex-limit-o2}
$10.0\ \mathrm{g}$ of methane is mixed with $32.0\ \mathrm{g}$ of oxygen and ignited, the equation being $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$. Which reagent is limiting? What mass of carbon dioxide can form, and what mass of methane remains?
::: solution
$n(\mathrm{CH_4}) = 10.0/16.043 = 0.6233\ \mathrm{mol}$. $n(\mathrm{O_2}) = 32.0/31.998 = 1.000\ \mathrm{mol}$ (the quotient is $1.00006$, which is $1.00\ \mathrm{mol}$ to three significant figures; $32.0\ \mathrm{g}$ was chosen to be essentially one mole of $\mathrm{O_2}$).

Divide each amount by its coefficient. For methane, $0.6233/1 = 0.6233\ \mathrm{mol}$. For oxygen, $1.000/2 = 0.500\ \mathrm{mol}$. The smaller value is the oxygen's, so oxygen is limiting and the extent is $\xi = 0.500\ \mathrm{mol}$. Methane is in excess even though $10.0\ \mathrm{g}$ is less than $32.0\ \mathrm{g}$: the mass comparison points the wrong way.

Carbon dioxide has coefficient $1$, so $n(\mathrm{CO_2}) = 0.500\ \mathrm{mol}$ and $m(\mathrm{CO_2}) = 0.500 \times 44.009 = 22.0\ \mathrm{g}$. Methane consumed is $0.500 \times 16.043 = 8.02\ \mathrm{g}$, and the methane left over is $10.0 - 8.02 = 1.98\ \mathrm{g}$. The oxygen is consumed completely within the precision of the data.

If you had assumed methane was limiting you would have predicted $0.6233 \times 44.009 = 27.4\ \mathrm{g}$ of carbon dioxide, and you would have needed $1.25\ \mathrm{mol}$ of oxygen, more than the $1.00\ \mathrm{mol}$ present. That impossible demand is the signal that the assumption was wrong. The graph in the figure above is this arithmetic: $x = 0.623$ lies to the right of the kink when $a = 1.00$, on the flat part of the curve.
:::
:::

## Yield, and one remark on atom economy

A theoretical yield is a ceiling computed from the limiting reagent. What you isolate is often less: a reaction stops short of completion, a side reaction consumes reagent, or product is left in a filter or a flask. The comparison of the two masses is the percentage yield.

::: definition Percentage yield {#def-yield}
The **percentage yield** is

$$
\text{percentage yield} = \frac{\text{actual yield}}{\text{theoretical yield}} \times 100\%,
$$

where both yields are masses of the same product, or both are amounts. The actual yield is what was isolated; the theoretical yield is the ceiling of [[#def-limiting]]. The percentage is dimensionless. A value above $100\%$ does not mean matter was created. It means the theoretical yield was too small (the limiting reagent was misidentified, or a molar mass was wrong) or the isolated material was wet or impure and was not, in fact, pure product.
:::

::: example Percentage yield of carbon dioxide {#ex-yield}
$4.00\ \mathrm{g}$ of methane is burned in excess oxygen. The theoretical products follow [[#ex-ch4-mass]]. If $9.15\ \mathrm{g}$ of carbon dioxide is collected, what is the percentage yield?
::: solution
Excess oxygen means methane is limiting. $n(\mathrm{CH_4}) = 4.00/16.043 = 0.2493\ \mathrm{mol}$, so the theoretical mass of $\mathrm{CO_2}$ is $0.2493 \times 44.009 = 10.97\ \mathrm{g}$ (more precisely $10.973\ \mathrm{g}$). Then

$$
\text{percentage yield} = \frac{9.15}{10.973}\times 100\% = 83.4\%.
$$

Rounding the theoretical mass to $11.0\ \mathrm{g}$ before dividing gives $83.2\%$, two tenths of a percent away. Carry the extra digits, and round the percentage at the end. Three significant figures in $4.00$ and in $9.15$ justify $83.4\%$, not a string of nines. The missing $1.8\ \mathrm{g}$ is unrecovered carbon dioxide, not a failure of the equation: the equation stated the ceiling, and the experiment did not reach it.
:::
:::

Percent atom economy is a different percentage, and it is easy to confuse with yield. Barry Trost, in 1991, proposed it as a design question: of the mass the balanced equation itself takes in as reactants, what fraction is destined for the product you actually want? For $\mathrm{CaCO_3 \rightarrow CaO + CO_2}$, with lime as the desired product, $M(\mathrm{CaCO_3}) = 40.078 + 12.011 + 3\times 15.999 = 100.086\ \mathrm{g\,mol^{-1}}$ and $M(\mathrm{CaO}) = 56.077\ \mathrm{g\,mol^{-1}}$, so the percent atom economy is $(56.077/100.086)\times 100\% = 56.03\%$. The other $43.97\%$ is carbon dioxide, which the equation produces however careful the technique and however close the yield is to $100\%$. A $90\%$ yield of lime does not improve that $56.03\%$; it only means you isolated nine tenths of an already incomplete share of the mass. Yield measures the laboratory. Atom economy measures the equation. Neither measures solvent, energy or toxicity, so neither, alone, is an environmental verdict. The number is worth computing once, honestly, and not pretending it is a yield.

::: warning Masses are not moles, and subscripts are not adjustable {#warn-mass-mole}
Three mistakes account for most wrong answers in this chapter. The coefficients are read as grams: methane does not react with oxygen in the mass ratio $1:2$, but in a ratio near $1:4$. A subscript is altered to force a balance — writing $\mathrm{H_2O_2}$ because $\mathrm{H_2 + O_2}$ would not otherwise match replaces water by hydrogen peroxide, and the equation can be balanced and still be the wrong reaction. The limiting reagent is taken to be whichever substance you have less of by mass. Compare $n/\nu$, not the masses on the bottles. A percentage yield above $100\%$ belongs to the same family: the ceiling was underestimated, or the solid on the balance was not pure dry product. Conservation of mass has not been suspended.
:::

::: quiz
In $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$, what does the coefficient $2$ in front of $\mathrm{O_2}$ state?
- [x] Two moles of $\mathrm{O_2}$ are consumed for each mole of $\mathrm{CH_4}$ that reacts.
- [ ] Two grams of $\mathrm{O_2}$ are consumed for each gram of $\mathrm{CH_4}$.
- [ ] A molecule of $\mathrm{O_2}$ has twice the mass of a molecule of $\mathrm{CH_4}$.
- [ ] Oxygen is necessarily the limiting reagent.
::: solution
The coefficient multiplies an amount of substance. The corresponding mass ratio is $(2 \times 31.998)/16.043 \approx 3.99$, about four grams of oxygen per gram of methane, not two. The third option confuses a coefficient with a ratio of molar masses: $M(\mathrm{O_2})$ happens to be about twice $M(\mathrm{CH_4})$, which is a fact about atoms, not about the equation. Which reagent is limiting depends on the amounts you mix. The coefficient only tells you the demand of one reagent for the other.
:::
:::

::: history
The arithmetic has a short list of founders, and no mythology is required. Antoine Laurent Lavoisier, in the *Traité élémentaire de chimie* (1789), made conservation of mass the working rule of the subject: weigh what enters and what leaves, because nothing has been created or destroyed. Joseph Proust, in papers from 1794, defended the law of definite proportions — a given compound contains its elements in a fixed mass ratio — against Claude Louis Berthollet, who thought the ratios could vary continuously. Jeremias Benjamin Richter coined the word *Stöchiometrie* in *Anfangsgründe der Stöchyometrie* (1792) for the mass relations he had measured in acid–base reactions. John Dalton's *A New System of Chemical Philosophy* (1808) read those fixed ratios as combinations of atoms with characteristic weights in small whole numbers, which is why a balanced equation is written with integer coefficients rather than with arbitrary masses. The mole, which turns the coefficients into numbers a balance can serve, is the later part of the same programme and is treated in [[general-chemistry-1/atoms-and-moles]].
:::

## Where this leads

Every later calculation that begins "from the equation" is this chapter again in a new unit. In [[general-chemistry-1/solutions-reactions]] the amount $n = m/M$ is joined by $n = cV$, and the same limiting-reagent test decides how much silver chloride precipitates or how much acid a titration can neutralise. In [[general-chemistry-1/gases]] an amount of gas becomes a volume through the ideal-gas equation, so the mass of methane in [[#ex-ch4-mass]] can be turned into a volume of carbon dioxide once temperature and pressure are known. In [[general-chemistry-1/thermochemistry]] the enthalpy of a reaction is quoted per mole of reaction as written, which means per mole of extent $\xi$: the coefficients you balance here are the coefficients in $\Delta_\mathrm{r} H$. Equilibrium constants in [[general-chemistry-2/chemical-equilibrium]] are built from those same coefficients as exponents. The formulas the coefficients multiply were fixed in [[general-chemistry-1/formulas-nomenclature]], and the reason an ionic formula such as $\mathrm{NaCl}$ is one-to-one is taken up again with lattice energies in [[bonding-structure/ionic-bonding]].

::: summary
- A balanced equation conserves atoms. Coefficients may change; subscripts may not, because a subscript belongs to the formula of a substance.
- Coefficients are ratios of amount of substance. The mass ratio equals the coefficient ratio only after each coefficient is multiplied by the corresponding molar mass.
- The working chain is mass $\rightarrow$ amount $\rightarrow$ amount of the other substance $\rightarrow$ mass, and the equation is used only in the middle step.
- The limiting reagent is the reactant with the smallest $n_i/\nu_i$, not the smallest mass. The theoretical yield is the product computed from that extent.
- Percentage yield compares what was isolated with that theoretical ceiling. A value above $100\%$ is a signal of a bad ceiling or an impure product.
- Percent atom economy scores the equation, not the experiment: it is the share of reactant mass the balanced equation places in the desired product, and it is not a yield.
- Oxidation numbers check a redox balance found by inspection; the total rise must equal the total fall. They are not themselves the balancing method.
:::

## Exercises

::: exercise Coefficient of oxygen {#exr-propane-o2 level=1 check="5"}
Propane burns in oxygen to give carbon dioxide and water. Write the equation and balance it in the smallest whole-number coefficients. (Enter the coefficient of $\mathrm{O_2}$.)
::: solution
The unbalanced skeleton is $\mathrm{C_3H_8 + O_2 \rightarrow CO_2 + H_2O}$. Three carbons need $3\,\mathrm{CO_2}$; eight hydrogens need $4\,\mathrm{H_2O}$. Oxygen atoms on the right are $3\times 2 + 4 = 10$, so five $\mathrm{O_2}$ molecules supply them:

$$
\mathrm{C_3H_8 + 5\,O_2 \rightarrow 3\,CO_2 + 4\,H_2O}.
$$

The coefficient of $\mathrm{O_2}$ is $5$. Carbon in propane is $-8/3$ on average and $+4$ in $\mathrm{CO_2}$, so the combustion is a redox reaction, balanced here by inspection alone.
:::
:::

::: exercise Carbon dioxide from a small charge of methane {#exr-co2-mass level=1 check="8.78"}
What mass of carbon dioxide is produced when $3.20\ \mathrm{g}$ of methane burns completely in excess oxygen, by $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$? Use $M(\mathrm{CH_4}) = 16.043\ \mathrm{g\,mol^{-1}}$ and $M(\mathrm{CO_2}) = 44.009\ \mathrm{g\,mol^{-1}}$. (Enter the mass in grams, to three significant figures.)
::: solution
$n(\mathrm{CH_4}) = 3.20/16.043 = 0.1995\ \mathrm{mol}$. The coefficient ratio of $\mathrm{CO_2}$ to $\mathrm{CH_4}$ is $1$, so $m(\mathrm{CO_2}) = 0.19946 \times 44.009 = 8.778\ \mathrm{g}$, which is $8.78\ \mathrm{g}$ to three significant figures. Equivalently, $3.20 \times (44.009/16.043) = 3.20 \times 2.7432 = 8.78\ \mathrm{g}$.
:::
:::

::: exercise Amount of water {#exr-water-mol level=1 check="0.500"}
How much water, as an amount of substance, forms when $0.250\ \mathrm{mol}$ of methane burns completely by the same equation? (Enter the amount in moles.)
::: solution
The coefficient of water is $2$ and the coefficient of methane is $1$, so $n(\mathrm{H_2O}) = 2 \times 0.250 = 0.500\ \mathrm{mol}$. No molar mass is required: the question asks for an amount, and the equation relates amounts.
:::
:::

::: exercise Limiting zinc {#exr-limit-zn level=2 check="1.63"}
Zinc reacts with hydrochloric acid by

$$
\mathrm{Zn(s) + 2\,HCl(aq) \rightarrow ZnCl_2(aq) + H_2(g)}.
$$

A piece of zinc of mass $2.40\ \mathrm{g}$ is placed in $100.0\ \mathrm{cm^3}$ of $0.500\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid. What mass of zinc reacts? Use $M(\mathrm{Zn}) = 65.38\ \mathrm{g\,mol^{-1}}$. (Enter the mass in grams, to three significant figures.) Dilute hydrochloric acid is corrosive and the hydrogen evolved is flammable; the numbers are a calculation, not a procedure, and any practical trial needs supervision and a risk assessment.
::: solution
The amount of acid is $n(\mathrm{HCl}) = 0.1000\ \mathrm{dm^3} \times 0.500\ \mathrm{mol\,dm^{-3}} = 0.0500\ \mathrm{mol}$. The equation consumes two moles of $\mathrm{HCl}$ per mole of zinc, and the $2$ is exact, so the acid can dissolve at most $0.0500/2 = 0.0250\ \mathrm{mol}$ of zinc. The mass that reacts is

$$
m(\mathrm{Zn}) = 0.0250 \times 65.38 = 1.6345\ \mathrm{g},
$$

which is $1.63\ \mathrm{g}$ to three significant figures. The zinc available is $2.40/65.38 = 0.0367\ \mathrm{mol}$, greater than $0.0250\ \mathrm{mol}$, so zinc is in excess and hydrochloric acid is limiting. Comparing $2.40\ \mathrm{g}$ with the mass of $\mathrm{HCl}$ in the solution, $0.0500 \times 36.458 = 1.82\ \mathrm{g}$, would have suggested the wrong reagent: the acid has the smaller mass and is limiting only because the stoichiometry was checked properly, not because of the mass comparison. The hydrogen produced, if you want it, is $0.0250 \times 2.016 = 0.0504\ \mathrm{g}$; its volume belongs to [[general-chemistry-1/gases]].
:::
:::

::: exercise A yield that is not the ceiling {#exr-pct-yield level=2 check="85.2"}
Methane of mass $6.50\ \mathrm{g}$ is burned in excess oxygen. The carbon dioxide collected has mass $15.2\ \mathrm{g}$. What is the percentage yield? Use $M(\mathrm{CH_4}) = 16.043$ and $M(\mathrm{CO_2}) = 44.009\ \mathrm{g\,mol^{-1}}$, and carry extra digits. (Enter the percentage yield, to three significant figures.)
::: solution
Excess oxygen leaves methane as the limiting reagent. $n = 6.50/16.043 = 0.4052\ \mathrm{mol}$, and the theoretical mass of $\mathrm{CO_2}$ is $0.40516 \times 44.009 = 17.831\ \mathrm{g}$. The percentage yield is $15.2/17.831 \times 100\% = 85.2\%$. Using a prematurely rounded theoretical mass of $17.8\ \mathrm{g}$ gives $85.4\%$ and fails the last figure. The actual yield is smaller than the ceiling, as an incomplete recovery should be.
:::
:::

::: exercise Iron from the oxide {#exr-fe-mass level=2 check="14.0"}
Iron(III) oxide is reduced by excess carbon monoxide according to $\mathrm{Fe_2O_3 + 3\,CO \rightarrow 2\,Fe + 3\,CO_2}$. What mass of iron is produced from $20.0\ \mathrm{g}$ of $\mathrm{Fe_2O_3}$? Use $\mathrm{Fe}\ 55.845$ and $\mathrm{O}\ 15.999$, so $M(\mathrm{Fe_2O_3}) = 159.687\ \mathrm{g\,mol^{-1}}$. (Enter the mass of iron in grams, to three significant figures.)
::: solution
$n(\mathrm{Fe_2O_3}) = 20.0/159.687 = 0.1252\ \mathrm{mol}$. The coefficient ratio of $\mathrm{Fe}$ to $\mathrm{Fe_2O_3}$ is $2/1$, so $n(\mathrm{Fe}) = 0.2505\ \mathrm{mol}$ and $m(\mathrm{Fe}) = 0.25049 \times 55.845 = 13.99\ \mathrm{g}$, which is $14.0\ \mathrm{g}$ to three significant figures. Excess $\mathrm{CO}$ is what makes the oxide limiting; without that information you would need the mass of $\mathrm{CO}$ as well.
:::
:::

::: exercise Methane left in the flask {#exr-ch4-left level=3 check="1.98"}
$10.0\ \mathrm{g}$ of methane and $32.0\ \mathrm{g}$ of oxygen are reacted by $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$. What mass of methane remains unreacted? Use $M(\mathrm{CH_4}) = 16.043$ and $M(\mathrm{O_2}) = 31.998\ \mathrm{g\,mol^{-1}}$. (Enter the mass in grams, to three significant figures.)
::: hint
Compute both amounts, divide each by its coefficient, and let the smaller quotient be the extent. The methane left is the methane you started with minus $\xi$ times its molar mass.
:::
::: solution
$n(\mathrm{CH_4}) = 10.0/16.043 = 0.6233\ \mathrm{mol}$ and $n(\mathrm{O_2}) = 32.0/31.998 = 1.0001\ \mathrm{mol}$. Then $n/\nu$ is $0.6233\ \mathrm{mol}$ for methane and $0.5000\ \mathrm{mol}$ for oxygen, so oxygen is limiting and $\xi = 0.5000\ \mathrm{mol}$. Methane consumed is $0.5000 \times 16.043 = 8.022\ \mathrm{g}$. Methane remaining is $10.0 - 8.022 = 1.978\ \mathrm{g}$, which is $1.98\ \mathrm{g}$ to three significant figures. The mass of methane placed in the flask was smaller than the mass of oxygen, and methane is nevertheless left over: that is the point of dividing by the coefficient and by the molar mass before comparing.
:::
:::

::: exercise Atom economy of the iron reduction {#exr-ae-fe level=3 check="45.83"}
For $\mathrm{Fe_2O_3 + 3\,CO \rightarrow 2\,Fe + 3\,CO_2}$, take iron as the desired product. Compute the percent atom economy from the molar masses $M(\mathrm{Fe_2O_3}) = 159.687$, $M(\mathrm{Fe}) = 55.845$ and $M(\mathrm{CO}) = 28.010\ \mathrm{g\,mol^{-1}}$. (Enter the percent atom economy, to two decimal places.) In the same calculation, say why a yield of $100\%$ would still not make the process waste-free on the metric's own terms.
::: hint
Atom economy uses the masses implied by the balanced equation, not the masses you happened to weigh out. Desired mass over total reactant mass, times $100\%$.
:::
::: solution
The desired product is two moles of iron, mass $2 \times 55.845 = 111.690\ \mathrm{g}$. The reactants in the equation are one mole of oxide and three moles of $\mathrm{CO}$, mass $159.687 + 3 \times 28.010 = 243.717\ \mathrm{g}$. The percent atom economy is

$$
\frac{111.690}{243.717}\times 100\% = 45.83\%.
$$

The other $54.17\%$ of the reactant mass becomes carbon dioxide, which the equation produces even when every atom of iron is recovered. A percentage yield of $100\%$ would mean you isolated all $111.690\ \mathrm{g}$ of iron per mole of oxide; it would not put the carbon dioxide back into the iron. Yield and atom economy are answers to different questions, and a flattering value of one says nothing automatically about the other. The metric also ignores the energy of the furnace and the toxicity of carbon monoxide, so $45.83\%$ is not, by itself, a judgement of the industrial process.
:::
:::
