A mass on a balance is an awkward way to deliver a reagent that must meet another in a definite proportion. Dissolve the mass, make the solution up to a line on a flask, and the amount you afterwards dispense is a volume you can read. That exchange — mass and volume into amount — is why so much of first-year practical chemistry happens in water, and why the numbers in this chapter are concentrations. The reactions themselves are the ordinary ones of an introductory laboratory: an acid neutralised by a base, a chloride precipitated as silver chloride, a metal oxidised by a hydrogen ion. Equilibrium constants, including $K_\mathrm{a}$ and the solubility product, are not computed here; they belong to [[general-chemistry-2/acids-bases]] and [[general-chemistry-2/chemical-equilibrium]]. What you need now is to know when a concentration is the whole stoichiometric story and when it is only the amount you mixed.

Two practical points before any arithmetic. Hydrochloric acid and sodium hydroxide are corrosive, sodium hydroxide particularly to the eyes; silver nitrate is corrosive, stains skin by depositing silver, and its waste is harmful to aquatic life if it is poured away carelessly. A titration of hydrochloric acid with sodium hydroxide, and a precipitation of silver chloride, are standard teaching experiments and nothing more hazardous than that — but they are still experiments. They need supervision, eye protection, gloves as the assessment requires, and a written risk assessment. The pages below calculate those experiments. They are not a set of bench instructions, and they are not a licence to scale them up.

The bookkeeping of [[general-chemistry-1/stoichiometry]] is used unchanged. The new step is the one that turns a volume of solution into an amount.

## Amount concentration

::: definition Amount concentration (molarity) {#def-molarity}
The **amount concentration** of a solute, also called the **molarity**, is the amount of solute divided by the volume of the solution:

$$
c = \frac{n}{V},
$$

with $n$ in moles and $V$ in cubic decimetres, so that $c$ has the unit $\mathrm{mol\,dm^{-3}}$. A cubic decimetre is a litre, and $\mathrm{mol\,dm^{-3}}$ is the same unit as $\mathrm{mol\,L^{-1}}$. The symbol $\mathrm{M}$ on a bottle means this unit: $0.100\ \mathrm{M}$ is $0.100\ \mathrm{mol\,dm^{-3}}$. The volume in the definition is the volume of the *solution*, not the volume of solvent that was poured in before the solute was added. A solution of concentration $c$ and volume $V$ therefore contains the amount $n = cV$, which is the quantity every later calculation actually wants.
:::

Two different "strengths" are easy to muddle. A mass concentration, in $\mathrm{g\,dm^{-3}}$, tells you how much the bottle weighs in solute; the amount concentration tells you how many moles you will deliver. They differ by the molar mass, $c = \rho_\text{mass}/M$. Molality, the amount of solute per kilogram of solvent, is a different quantity again and is not used in this chapter; it returns with colligative properties in [[general-chemistry-2/liquids-solutions]].

::: example A solution of sodium hydroxide {#ex-molarity}
$4.00\ \mathrm{g}$ of sodium hydroxide is dissolved in water and the solution is made up to $250.0\ \mathrm{cm^3}$ in a volumetric flask. What is the amount concentration? $M(\mathrm{NaOH}) = 22.990 + 15.999 + 1.008 = 39.997\ \mathrm{g\,mol^{-1}}$.
::: solution
The amount of $\mathrm{NaOH}$ is $n = 4.00/39.997 = 0.1000\ \mathrm{mol}$. The volume must be in cubic decimetres: $250.0\ \mathrm{cm^3} = 0.2500\ \mathrm{dm^3}$. Therefore

$$
c = \frac{0.1000\ \mathrm{mol}}{0.2500\ \mathrm{dm^3}} = 0.400\ \mathrm{mol\,dm^{-3}}.
$$

Three significant figures follow the $4.00\ \mathrm{g}$. The $250.0\ \mathrm{cm^3}$ is more precise than the mass, so it does not limit the answer. Notice what was *not* assumed: that the solid occupies no volume, or that $250.0\ \mathrm{cm^3}$ of water was added. The flask was filled to the mark, so the $250.0\ \mathrm{cm^3}$ is the volume of the solution by measurement. Sodium hydroxide pellets absorb water and carbon dioxide from the air; a concentration computed from a nominal mass is only as honest as the purity of the solid, which is one reason a hydroxide solution that must be known accurately is standardised by titration rather than trusted from the label on the jar.
:::
:::

## Dilution

Preparing a dilute solution from a more concentrated one does not change the amount of solute, provided you add only solvent and the solute does not react, precipitate or escape. That single conservation statement is the dilution equation.

::: proposition The dilution equation {#prop-dilution}
If a volume $V_1$ of solution of amount concentration $M_1$ is diluted to a volume $V_2$ of concentration $M_2$, and no solute is created or destroyed, then

$$
M_1 V_1 = M_2 V_2.
$$

Here $M$ means amount concentration, the $c$ of [[#def-molarity]]. The two volumes must be in the same unit. The relation is not restricted to cubic decimetres: a factor that converts $\mathrm{cm^3}$ into $\mathrm{dm^3}$ cancels between the two sides, so both volumes may be left in $\mathrm{cm^3}$ if both are. It holds only for dilution. It is not a general equation for chemical reactions, and it fails as soon as the solute is consumed, precipitated or evolved as a gas.
:::

::: proof Amount of solute is conserved {#proof-dilution}
By [[#def-molarity]], the amount of solute in the portion taken from the stock is $n = M_1 V_1$. That portion is transferred to a flask and solvent is added until the solution occupies a measured volume $V_2$. Under the conditions of the proposition — solvent only, no reaction, no precipitation, no loss of solute — the amount of solute in the flask is still $n$. The definition applied to the new solution reads $M_2 = n/V_2$, and therefore

$$
n = M_1 V_1 = M_2 V_2.
$$

Solving for the unknown volume or the unknown concentration is algebra, not new chemistry. The final volume $V_2$ is the volume you measure, typically the mark on a volumetric flask. You do not need the volumes of solute and solvent to be additive, because you never compute $V_2$ by adding those volumes: you read it. If instead you *guess* $V_2$ by adding a volume of water to a volume of stock, non-additive mixing makes the guess slightly wrong, and the equation is only as good as that guess.
:::

::: example Diluting hydrochloric acid {#ex-dilute}
What volume of $0.500\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid is required to prepare $250.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ acid?
::: solution
Rearrange [[#prop-dilution]], keeping both volumes in $\mathrm{cm^3}$:

$$
V_1 = \frac{M_2 V_2}{M_1} = \frac{0.100 \times 250.0}{0.500} = 50.0\ \mathrm{cm^3}.
$$

The amount of $\mathrm{HCl}$ in that portion is $0.0500\ \mathrm{dm^3} \times 0.500\ \mathrm{mol\,dm^{-3}} = 0.0250\ \mathrm{mol}$, and the same amount in $0.2500\ \mathrm{dm^3}$ is $0.100\ \mathrm{mol\,dm^{-3}}$. The check is worth doing once, because a factor-of-ten slip between $\mathrm{cm^3}$ and $\mathrm{dm^3}$ is the usual way to be wrong by a thousand. The concentrated acid is corrosive. Adding water to a large volume of concentrated acid is a different and more dangerous operation from taking $50.0\ \mathrm{cm^3}$ of an already dilute $0.500\ \mathrm{mol\,dm^{-3}}$ solution; the calculation assumes the second of those, and a risk assessment decides how the first is done if it is done at all.
:::
:::

::: widget plot
f: c*v/x
x: 25, 500
y: 0, 8
sliders: c=0.50:0.10:2.00:0.10; v=25:5:100:5
labels: c_2/\mathrm{mol\,dm^{-3}}
caption: Concentration after dilution against the final volume $x$ in $\mathrm{cm^3}$. The stock concentration $c$ and the volume taken $v$, also in $\mathrm{cm^3}$, are the sliders. The curve is $cv/x$: the amount of solute is fixed, so the concentration falls as a rectangular hyperbola. The relation stops being true if a reaction consumes the solute.
:::

The hyperbola is conservation drawn as a graph. Double the final volume and you halve the concentration; you do not halve the amount. The slider for $v$ changes how much solute you committed at the start, and the whole curve lifts in proportion.

## Electrolytes, precipitation and the net ionic equation

Substances that dissolve in water do not all dissolve in the same way. Some come apart into ions and the solution conducts electricity. Some remain as molecules and the solution conducts almost not at all.

::: definition Electrolytes {#def-electrolyte}
An **electrolyte** is a substance whose aqueous solution conducts electricity because the substance has produced ions. A **strong electrolyte** is fully ionised in dilute solution: the soluble salts, the strong acids $\mathrm{HCl}$, $\mathrm{HNO_3}$ and $\mathrm{H_2SO_4}$ in its first ionisation, and the strong bases $\mathrm{NaOH}$ and $\mathrm{KOH}$. A **weak electrolyte** is only partly ionised: ethanoic acid and ammonia are the examples used in this course. A **non-electrolyte** dissolves as molecules; sucrose and ethanol are typical, and their solutions do not conduct appreciably. "Strong" and "weak" describe the extent of ionisation, not the concentration. A dilute solution of hydrochloric acid is still a strong acid; a concentrated solution of ethanoic acid is still a weak one.
:::

The division is Arrhenius's, and it is the right division for the stoichiometry of this chapter. It is not yet an equilibrium calculation. For a weak acid we refuse, deliberately, to set the hydrogen-ion concentration equal to the concentration on the label. That step needs $K_\mathrm{a}$, and $K_\mathrm{a}$ is the subject of [[general-chemistry-2/acids-bases]]. Until then, "weak" means: the analytical amount and the amount of free $\mathrm{H^+(aq)}$ are different numbers, and only the analytical amount enters a titration ratio.

When two solutions of strong electrolytes are mixed, the ions are all in the same vessel and a new combination may be insoluble. The insolubility is an experimental fact about each salt, not a theorem. The patterns below are **empirical rules of thumb** for aqueous solutions near room temperature. "Soluble" here means, roughly, a solubility above about $0.1\ \mathrm{mol\,dm^{-3}}$; "insoluble" means a solubility far below that. Many insoluble salts dissolve a little. Silver chloride does, which is why a solubility product exists, and that arithmetic is an equilibrium problem rather than a stoichiometric one. The rules:

- Nitrate salts, and salts of $\mathrm{Na^+}$, $\mathrm{K^+}$ and $\mathrm{NH_4^+}$, are soluble.
- Chlorides, bromides and iodides are soluble, except those of $\mathrm{Ag^+}$, $\mathrm{Pb^{2+}}$ and $\mathrm{Hg_2^{2+}}$.
- Sulfates are soluble, except those of $\mathrm{Ba^{2+}}$, $\mathrm{Pb^{2+}}$ and $\mathrm{Sr^{2+}}$; calcium sulfate is sparingly soluble.
- Carbonates, phosphates and sulfides are insoluble, except those of $\mathrm{Na^+}$, $\mathrm{K^+}$ and $\mathrm{NH_4^+}$.
- Hydroxides are insoluble, except those of the alkali metals; barium hydroxide is soluble and calcium hydroxide is sparingly soluble.

Apply the rules to predict whether a precipitate forms, then write the equation. Do not treat a borderline salt as a matter of principle. If the rule says "sparingly", the stoichiometric assumption that precipitation is complete is already shaky, and this chapter will not use such a case as if it were exact.

::: definition Net ionic equation and spectator ions {#def-net-ionic}
A **molecular equation** shows every substance by its full formula. A **complete ionic equation** replaces each soluble strong electrolyte by the ions it actually supplies, and leaves solids, liquids, gases and weak electrolytes written as they stand. Ions that appear unchanged on both sides are **spectator ions**. The **net ionic equation** is what remains when the spectators are cancelled. Cancelling them is bookkeeping: they are still in the beaker, they still contribute to the mass and to the electrical conductivity, and they have simply taken no part in the change being described. Atoms and charge must balance in the net equation, or a spectator has been cancelled by mistake.
:::

The procedure is: write the balanced molecular equation with state symbols; split the soluble strong electrolytes; cancel the spectators; check atoms and charge. Weak acids stay as molecules, because that is what most of their inventory is.

::: example Precipitation of silver chloride {#ex-agcl}
$40.0\ \mathrm{cm^3}$ of $0.200\ \mathrm{mol\,dm^{-3}}$ silver nitrate is mixed with $50.0\ \mathrm{cm^3}$ of $0.120\ \mathrm{mol\,dm^{-3}}$ sodium chloride. Write the molecular, complete ionic and net ionic equations, name the spectators, and find the mass of silver chloride precipitated if its solubility is neglected. $M(\mathrm{AgCl}) = 107.87 + 35.45 = 143.32\ \mathrm{g\,mol^{-1}}$.
::: solution
The empirical rule says chlorides are soluble except those of silver, lead and mercury(I), so $\mathrm{AgCl}$ precipitates and sodium nitrate stays in solution:

$$
\mathrm{AgNO_3(aq) + NaCl(aq) \rightarrow AgCl(s) + NaNO_3(aq)}.
$$

Both reactants and the sodium nitrate are soluble strong electrolytes. Splitting them,

$$
\mathrm{Ag^+(aq) + NO_3^-(aq) + Na^+(aq) + Cl^-(aq) \rightarrow AgCl(s) + Na^+(aq) + NO_3^-(aq)}.
$$

$\mathrm{Na^+}$ and $\mathrm{NO_3^-}$ are spectators. The net ionic equation is

$$
\mathrm{Ag^+(aq) + Cl^-(aq) \rightarrow AgCl(s)}.
$$

Charge balances: $+1$ and $-1$ on the left, zero on the right. The nitrate and sodium ions have not left the mixture. They have left the description of the precipitation.

The amounts mixed are $n(\mathrm{Ag^+}) = 0.0400 \times 0.200 = 0.00800\ \mathrm{mol}$ and $n(\mathrm{Cl^-}) = 0.0500 \times 0.120 = 0.00600\ \mathrm{mol}$. Chloride has the smaller amount, the coefficients are both $1$, and chloride is limiting. The amount of $\mathrm{AgCl}$ is $0.00600\ \mathrm{mol}$, and the mass is $0.00600 \times 143.32 = 0.860\ \mathrm{g}$. Silver ion left in solution is $0.00200\ \mathrm{mol}$, still accompanied by the spectators. Neglecting the solubility of $\mathrm{AgCl}$ is the stoichiometric approximation; it is a good one for a mass of this size, and a bad one if the question had been about the tiny concentration that remains dissolved.

Silver nitrate stains skin and is harmful to aquatic organisms. The mass just computed is the reason a teaching laboratory collects silver residues rather than washing them away. The mixing itself, if you do it, needs supervision and a risk assessment.
:::
:::

## Acids, bases and a titration

At the level of this course an **Arrhenius acid** is a substance that produces $\mathrm{H^+(aq)}$ in water, and an **Arrhenius base** is a substance that produces $\mathrm{OH^-(aq)}$. The neutralisation of a strong acid by a strong base is then

$$
\mathrm{HCl(aq) + NaOH(aq) \rightarrow NaCl(aq) + H_2O(l)},
$$

and the net ionic equation, spectators $\mathrm{Na^+}$ and $\mathrm{Cl^-}$ removed, is

$$
\mathrm{H^+(aq) + OH^-(aq) \rightarrow H_2O(l)}.
$$

Writing $\mathrm{H^+(aq)}$ is a shorthand for the hydrated proton. The same change is often written $\mathrm{H_3O^+(aq) + OH^-(aq) \rightarrow 2\,H_2O(l)}$. Both say the same thing at this level; the hydroxonium form becomes the natural one when $K_\mathrm{a}$ is defined, and you will meet it there.

Hydrochloric acid, nitric acid and the first proton of sulfuric acid are strong: in dilute solution the ionisation is complete, and the amount of $\mathrm{H^+(aq)}$ equals the amount of acid dissolved. Sodium hydroxide and potassium hydroxide are strong bases in the same sense. Ethanoic acid is the weak acid to keep in mind. In a solution labelled $0.10\ \mathrm{mol\,dm^{-3}}$, almost all of it is still $\mathrm{CH_3COOH}$ molecules, so $[\mathrm{H^+}]$ is much smaller than $0.10\ \mathrm{mol\,dm^{-3}}$. We do not calculate how much smaller. We do record a fact that surprises people meeting the distinction for the first time: the *titration* stoichiometry does not need that number. One mole of ethanoic acid still consumes one mole of hydroxide,

$$
\mathrm{CH_3COOH(aq) + OH^-(aq) \rightarrow CH_3COO^-(aq) + H_2O(l)},
$$

because the strong base drives the proton transfer to completion. The pH of the starting solution and the volume of base at the equivalence point are different questions. Only the second is answered in this chapter.

::: proposition Equivalence in a strong-acid titration {#prop-titration}
At the **equivalence point** of a titration the reactants have been added in the exact ratio of their coefficients. For a monoprotic strong acid and a monobasic strong base the ratio is $1:1$, so the amounts are equal:

$$
M_\mathrm{a} V_\mathrm{a} = M_\mathrm{b} V_\mathrm{b}.
$$

The algebra looks like [[#prop-dilution]] and is not the same fact. In a dilution, one amount of solute is conserved. In a titration, two different substances are compared, and they are equal only because the stoichiometry says so. If the coefficients are not both $1$, they must appear. For $\mathrm{H_2SO_4 + 2\,NaOH \rightarrow Na_2SO_4 + 2\,H_2O}$ in dilute solution, where both protons are titrated,

$$
\frac{M_\mathrm{a} V_\mathrm{a}}{1} = \frac{M_\mathrm{b} V_\mathrm{b}}{2}.
$$

The **end point** is the volume at which an indicator changes colour. For a well-chosen indicator in a strong-acid–strong-base titration the end point and the equivalence point nearly coincide, and this chapter treats the measured volume as the equivalence volume. How close they are, and why an indicator has the colour it has, is part of the acid–base equilibrium in [[general-chemistry-2/acids-bases]].
:::

::: example Two titres, one of them not one-to-one {#ex-titration}
(a) A $25.00\ \mathrm{cm^3}$ aliquot of hydrochloric acid requires $32.40\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ sodium hydroxide to reach the end point. Find the concentration of the acid. (b) What volume of the same sodium hydroxide solution is required to titrate $25.00\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ sulfuric acid, assuming both protons react?
::: solution
(a) The amount of hydroxide is $n(\mathrm{NaOH}) = 0.03240\ \mathrm{dm^3} \times 0.1000\ \mathrm{mol\,dm^{-3}} = 0.003240\ \mathrm{mol}$. The acid is monoprotic, so $n(\mathrm{HCl}) = 0.003240\ \mathrm{mol}$ in $0.02500\ \mathrm{dm^3}$, and

$$
M(\mathrm{HCl}) = \frac{0.003240}{0.02500} = 0.1296\ \mathrm{mol\,dm^{-3}}.
$$

The data are quoted to four significant figures and so is the answer. The indicator in a teaching laboratory is often phenolphthalein, which is colourless in the acid and pink just on the basic side of equivalence. Reading that colour change as the equivalence volume is the approximation [[#prop-titration]] states. Doing the titration needs supervision and a risk assessment: both solutions are corrosive, and the indicator is handled as the assessment requires.

(b) Sulfuric acid supplies two protons that the hydroxide must neutralise, so $n(\mathrm{NaOH}) = 2 \times (0.02500 \times 0.1000) = 0.005000\ \mathrm{mol}$. The volume is $0.005000/0.1000 = 0.05000\ \mathrm{dm^3} = 50.00\ \mathrm{cm^3}$. Using $M_1 V_1 = M_2 V_2$ without the factor $2$ would have given $25.00\ \mathrm{cm^3}$, which is the dilution habit applied to the wrong problem. The first proton of sulfuric acid is strong; the second is only moderately strong, and at this concentration the assumption that both are fully titrated by the time the indicator changes is the usual teaching approximation, not a claim about $K_{\mathrm{a}2}$.
:::
:::

## Oxidation numbers and electron transfer

A precipitation rearranges ions that already exist. A redox reaction moves electrons, and the oxidation number is how we count them without pretending every bond is ionic.

::: definition Oxidation number {#def-ox}
The **oxidation number** of an atom in a species is the charge it would carry if every shared pair were given entirely to the more electronegative atom. The working rules are: an element is $0$; a monatomic ion has its charge; fluorine is $-1$; oxygen is $-2$, except $-1$ in peroxides; hydrogen is $+1$ when bonded to a non-metal and $-1$ when bonded to a metal; the oxidation numbers in a species sum to its net charge. **Oxidation** is an increase in oxidation number, which for a monatomic ion is loss of electrons. **Reduction** is a decrease, which is gain of electrons. The oxidising agent is the species that is reduced; the reducing agent is the species that is oxidised. In a balanced equation the total increase equals the total decrease, because electrons are not left over.
:::

The rules are a convention that agrees with the ionic picture when the picture is fair, and that remains useful when it is not. Sulfur in sulfate is not a bare $\mathrm{S^{6+}}$ ion. The number $+6$ still tells you that getting from sulfide to sulfate is an eight-electron oxidation, which is the fact a later half-equation will use.

::: example Zinc and hydrogen ion {#ex-ox-zn}
Assign oxidation numbers in $\mathrm{H_2SO_4}$ and in sulfate ion, and interpret

$$
\mathrm{Zn(s) + 2\,H^+(aq) \rightarrow Zn^{2+}(aq) + H_2(g)}
$$

as an electron transfer. The reaction is the net change when zinc dissolves in dilute hydrochloric acid, as in the limiting-reagent problem of [[general-chemistry-1/stoichiometry]].
::: solution
In $\mathrm{H_2SO_4}$, hydrogen is $+1$ and oxygen is $-2$. The sum is zero, so $2(+1) + x + 4(-2) = 0$, and $x = +6$ for sulfur. In $\mathrm{SO_4^{2-}}$ the sum is $-2$: $x + 4(-2) = -2$, and again $x = +6$. The ion and the acid agree, as they should: losing two protons does not change sulfur's oxidation number.

In the zinc equation, zinc goes from $0$ in the metal to $+2$ in $\mathrm{Zn^{2+}}$, an increase of $2$, so zinc is oxidised and is the reducing agent. It has lost two electrons. Each hydrogen ion goes from $+1$ to $0$ in $\mathrm{H_2}$, a decrease of $1$, and two hydrogen ions decrease by $2$ altogether. They have gained the two electrons, so $\mathrm{H^+(aq)}$ is the oxidising agent and is reduced. The electron count matches, which is why the coefficient of $\mathrm{H^+}$ is $2$ and not $1$. Chloride, if the acid was hydrochloric acid, is a spectator of this particular change: it appears as $\mathrm{Cl^-}$ on both sides of the complete ionic equation and does not change oxidation number.

The same pattern, with a different oxidising agent, is the displacement $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$: zinc loses two electrons, copper(II) gains two, and the net ionic equation is already the whole story if the copper salt was a soluble strong electrolyte. Neither equation is a preparation. Hydrogen is flammable, dilute acid is corrosive, and a practical trial needs supervision and a risk assessment.
:::
:::

::: warning Three equations that are not interchangeable {#warn-three}
$M_1 V_1 = M_2 V_2$ conserves one solute during a dilution. The lookalike $M_\mathrm{a} V_\mathrm{a} = M_\mathrm{b} V_\mathrm{b}$ equates two reagents in a $1:1$ titration. Using the first formula on sulfuric acid, or on a precipitation, without the coefficients, is the most common numerical error in the chapter. A second error is physical: spectators cancelled from a net ionic equation are still in the flask. A third is chemical: $[\mathrm{H^+}]$ equals the label concentration for dilute hydrochloric acid, and does not equal it for ethanoic acid. The titration ratio can be the same in the two cases while the hydrogen-ion concentrations are not. Strong and weak describe ionisation, not how much solid you shook into the flask.
:::

::: quiz
A $0.20\ \mathrm{mol\,dm^{-3}}$ solution is made by diluting a more concentrated stock with water. No reaction occurs. Which statement is correct?
- [x] The amount of solute taken from the stock equals the amount in the dilute solution; only the concentration has fallen.
- [ ] Both the amount and the concentration fall by the same factor.
- [ ] The dilution equation $M_1 V_1 = M_2 V_2$ applies only when the solute reacts.
- [ ] Spectator ions are removed by the added water.
::: solution
Dilution conserves the amount of solute and spreads it through a larger volume, which is why $M_1 V_1 = M_2 V_2$ and why the concentration falls. The equation applies when the solute does *not* react; a reaction is what breaks it. Spectator ions are a feature of a net ionic equation, not of dilution, and adding water does not filter them out.
:::
:::

::: history
Volumetric analysis became a precision method in the nineteenth century, before anyone knew what an ion was. Joseph Louis Gay-Lussac, in 1832, published a wet assay for silver in which a chloride solution was added until precipitation of silver chloride was just complete — stoichiometry as an analytical instrument. Karl Friedrich Mohr's *Lehrbuch der chemisch-analytischen Titrirmethode* (1855) put the burette, the pipette and a catalogue of titrations into a form a teaching laboratory could use, which is why a strong-acid titre still looks like Mohr's experiment. The ionic interpretation came later. Svante Arrhenius, in his 1884 dissertation and in the developed theory of 1887, proposed that electrolytes exist in solution as ions, that a strong electrolyte is largely dissociated, and that acids and bases are the substances that supply hydrogen ion and hydroxide ion. The definition used in this chapter is his. Its failures — ammonia as a base that contains no hydroxide, reactions in solvents other than water — are exactly what the later Brønsted and Lewis definitions repair, and they are repaired in [[general-chemistry-2/acids-bases]], not by stretching Arrhenius past the evidence he had.
:::

## Where this leads

The concentration $c = n/V$ is the unit in which rate laws are written in [[general-chemistry-2/rates-intro]], and the unit in which equilibrium constants of solution reactions are written in [[general-chemistry-2/chemical-equilibrium]]. The refusal, above, to set $[\mathrm{H^+}]$ equal to the label concentration of a weak acid is the door into [[general-chemistry-2/acids-bases]], where that concentration is calculated properly and where the end point of a titration is no longer taken on trust. Molality and the other solution measures that this chapter set aside are in [[general-chemistry-2/liquids-solutions]]. A gas evolved by a reaction in solution — the hydrogen of the zinc equation — becomes a volume only when the gas laws of [[general-chemistry-1/gases]] are available. The formulas of the salts whose ions we cancel were fixed by charge balance in [[general-chemistry-1/formulas-nomenclature]], and the reason those ions stick together in the solid is the lattice energy of [[bonding-structure/ionic-bonding]].

::: summary
- Amount concentration is $c = n/V$ in $\mathrm{mol\,dm^{-3}}$, with $V$ the volume of solution. The amount delivered is $n = cV$.
- Dilution conserves amount of solute, so $M_1 V_1 = M_2 V_2$. The volumes must be in the same unit. The relation is not a reaction stoichiometry.
- Strong electrolytes are fully ionised in dilute solution; weak electrolytes are not; non-electrolytes dissolve as molecules. Strong and weak are not synonyms of concentrated and dilute.
- Solubility rules are empirical patterns for water near room temperature. They predict precipitates; they are not exact laws, and "insoluble" never means a solubility of zero.
- A net ionic equation cancels spectator ions on paper. The ions remain in the solution. Atoms and charge must still balance.
- An Arrhenius acid supplies $\mathrm{H^+(aq)}$ and an Arrhenius base supplies $\mathrm{OH^-(aq)}$. For a weak acid, the label concentration is not $[\mathrm{H^+}]$; the titration ratio can still be one-to-one.
- At equivalence, amounts stand in the coefficient ratio. For monoprotic acid and monobasic base, $M_\mathrm{a} V_\mathrm{a} = M_\mathrm{b} V_\mathrm{b}$; for sulfuric acid the factor $2$ is required.
- Oxidation is loss of electrons, tracked as a rise in oxidation number; reduction is the gain. The two changes match in size in a balanced equation.
:::

## Exercises

::: exercise Sodium hydroxide from the jar {#exr-naoh-mass level=1 check="1.50"}
What mass of sodium hydroxide is required to prepare $250.0\ \mathrm{cm^3}$ of a $0.150\ \mathrm{mol\,dm^{-3}}$ solution? $M(\mathrm{NaOH}) = 39.997\ \mathrm{g\,mol^{-1}}$. (Enter the mass in grams, to three significant figures.)
::: solution
The amount required is $n = 0.2500\ \mathrm{dm^3} \times 0.150\ \mathrm{mol\,dm^{-3}} = 0.0375\ \mathrm{mol}$. The mass is $0.0375 \times 39.997 = 1.4999\ \mathrm{g}$, which is $1.50\ \mathrm{g}$ to three significant figures. The concentration has three significant figures and limits the answer; the molar mass and the $250.0\ \mathrm{cm^3}$ are more precise.
:::
:::

::: exercise A fourfold dilution {#exr-dilute level=1 check="0.200"}
$25.0\ \mathrm{cm^3}$ of a $0.800\ \mathrm{mol\,dm^{-3}}$ solution is diluted with water to $100.0\ \mathrm{cm^3}$. What is the new concentration? (Enter it in $\mathrm{mol\,dm^{-3}}$, to three significant figures.)
::: solution
$M_2 = M_1 V_1/V_2 = 0.800 \times 25.0/100.0 = 0.200\ \mathrm{mol\,dm^{-3}}$. The amount of solute is $0.0250 \times 0.800 = 0.0200\ \mathrm{mol}$ both before and after. Only the volume changed. The factor $100.0/25.0 = 4$ is exact as a ratio of the stated volumes, and the concentration falls by that factor.
:::
:::

::: exercise Sulfur in sulfate {#exr-ox-s level=1 check="6"}
What is the oxidation number of sulfur in $\mathrm{SO_4^{2-}}$? Take oxygen as $-2$. (Enter the oxidation number.)
::: solution
The ion has charge $-2$, so $x + 4(-2) = -2$, hence $x - 8 = -2$ and $x = +6$. The same number is found for sulfur in $\mathrm{H_2SO_4}$. It is an oxidation number, not a claim that a sulfate ion contains an $\mathrm{S^{6+}}$ cation sitting beside four oxide ions.
:::
:::

::: exercise A one-to-one titre {#exr-titre level=2 check="27.78"}
What volume of $0.1800\ \mathrm{mol\,dm^{-3}}$ sodium hydroxide neutralises $20.00\ \mathrm{cm^3}$ of $0.2500\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid? (Enter the volume in $\mathrm{cm^3}$, to two decimal places.) Both solutions are corrosive; the calculation is not a bench procedure, and a real titration needs supervision and a risk assessment.
::: solution
$n(\mathrm{HCl}) = 0.02000 \times 0.2500 = 0.005000\ \mathrm{mol}$. The stoichiometry is $1:1$, so $n(\mathrm{NaOH}) = 0.005000\ \mathrm{mol}$ and

$$
V = \frac{0.005000}{0.1800} = 0.027778\ \mathrm{dm^3} = 27.78\ \mathrm{cm^3}.
$$

Four significant figures in the data justify two decimal places in the volume in cubic centimetres. The end point is being treated as the equivalence point, which is the strong-acid–strong-base approximation of [[#prop-titration]].
:::
:::

::: exercise Mass of silver chloride {#exr-agcl-mass level=2 check="0.516"}
$30.0\ \mathrm{cm^3}$ of $0.150\ \mathrm{mol\,dm^{-3}}$ silver nitrate is mixed with $45.0\ \mathrm{cm^3}$ of $0.0800\ \mathrm{mol\,dm^{-3}}$ sodium chloride. What mass of $\mathrm{AgCl}$ precipitates if the solubility of the salt is neglected? $M(\mathrm{AgCl}) = 143.32\ \mathrm{g\,mol^{-1}}$. (Enter the mass in grams, to three significant figures.)
::: solution
$n(\mathrm{Ag^+}) = 0.0300 \times 0.150 = 0.00450\ \mathrm{mol}$ and $n(\mathrm{Cl^-}) = 0.0450 \times 0.0800 = 0.00360\ \mathrm{mol}$. The net reaction is $\mathrm{Ag^+ + Cl^- \rightarrow AgCl(s)}$, so the coefficients are equal and chloride is limiting. The mass is $0.00360 \times 143.32 = 0.516\ \mathrm{g}$. Silver ion remains in excess by $0.00090\ \mathrm{mol}$. The spectators $\mathrm{Na^+}$ and $\mathrm{NO_3^-}$ are not in this mass: the balance would show the dry precipitate, not the ions left in the filtrate.
:::
:::

::: exercise A carbonate precipitation, written three ways {#exr-caco3 level=2}
Aqueous calcium chloride is mixed with aqueous sodium carbonate. Using the empirical solubility rules, write the molecular equation, the complete ionic equation and the net ionic equation for the precipitation of calcium carbonate. Name the spectator ions, and confirm that charge balances in the net equation.
::: solution
Carbonates are insoluble except those of sodium, potassium and ammonium, and calcium chloride and sodium carbonate are soluble, so

$$
\mathrm{CaCl_2(aq) + Na_2CO_3(aq) \rightarrow CaCO_3(s) + 2\,NaCl(aq)}.
$$

Splitting the soluble strong electrolytes,

$$
\mathrm{Ca^{2+}(aq) + 2\,Cl^-(aq) + 2\,Na^+(aq) + CO_3^{2-}(aq) \rightarrow CaCO_3(s) + 2\,Na^+(aq) + 2\,Cl^-(aq)}.
$$

The spectators are $\mathrm{Na^+}$ and $\mathrm{Cl^-}$. The net ionic equation is $\mathrm{Ca^{2+}(aq) + CO_3^{2-}(aq) \rightarrow CaCO_3(s)}$. Charge: $+2 + (-2) = 0$, matching the solid. The rules used are empirical; they justify writing the carbonate as a solid, not a calculation of how many milligrams remain dissolved.
:::
:::

::: exercise Stock concentration from a diluted aliquot {#exr-stock level=3 check="0.750"}
$10.00\ \mathrm{cm^3}$ of a stock hydrochloric acid is diluted to $100.0\ \mathrm{cm^3}$. A $25.00\ \mathrm{cm^3}$ aliquot of the diluted acid requires $18.75\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ sodium hydroxide at the end point. What was the concentration of the stock? (Enter it in $\mathrm{mol\,dm^{-3}}$, to three decimal places.)
::: hint
Find the amount of hydroxide, equate it to the amount of acid in the aliquot, convert that amount to the concentration of the *diluted* acid, and only then undo the dilution.
:::
::: solution
$n(\mathrm{NaOH}) = 0.01875 \times 0.1000 = 0.001875\ \mathrm{mol}$. The titration is $1:1$, so the aliquot contains $0.001875\ \mathrm{mol}$ of $\mathrm{HCl}$. Its concentration is $0.001875/0.02500 = 0.07500\ \mathrm{mol\,dm^{-3}}$. The dilution took $10.00\ \mathrm{cm^3}$ of stock up to $100.0\ \mathrm{cm^3}$, a factor of exactly $10$ on these volumes, so the stock was $0.750\ \mathrm{mol\,dm^{-3}}$. Reporting $0.0750$ is the concentration that was titrated, which is the question before the last step. The dilution equation and the titration equation were both used, and they were used on different pairs of solutions.
:::
:::

::: exercise The same titre, a different hydrogen-ion concentration {#exr-weak level=3}
A $25.00\ \mathrm{cm^3}$ sample of $0.100\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid and a $25.00\ \mathrm{cm^3}$ sample of $0.100\ \mathrm{mol\,dm^{-3}}$ ethanoic acid are each titrated with $0.100\ \mathrm{mol\,dm^{-3}}$ sodium hydroxide. Explain why the two samples consume the same volume of base at equivalence, and why it is nevertheless wrong to say that both samples had $[\mathrm{H^+}] = 0.100\ \mathrm{mol\,dm^{-3}}$ before any base was added. Do not invent a value of $K_\mathrm{a}$.
::: hint
Separate the analytical amount of acid, which is what the equivalence condition sees, from the amount of free hydrogen ion, which is what "strong" and "weak" describe.
:::
::: solution
Each sample contains $0.02500 \times 0.100 = 0.00250\ \mathrm{mol}$ of acid molecules-or-ions as an analytical amount. Hydrochloric acid reacts $1:1$ with hydroxide. Ethanoic acid also reacts $1:1$, $\mathrm{CH_3COOH + OH^- \rightarrow CH_3COO^- + H_2O}$, and the strong base takes the proton transfer to completion even though the ethanoic acid was not fully ionised beforehand. Both equivalences therefore require $0.00250\ \mathrm{mol}$ of $\mathrm{NaOH}$, which is $25.0\ \mathrm{cm^3}$ of the $0.100\ \mathrm{mol\,dm^{-3}}$ base. The volumes match because the *amounts of acid* match, not because the hydrogen-ion concentrations matched.

Before the titration, dilute hydrochloric acid is fully ionised, so $[\mathrm{H^+}] = 0.100\ \mathrm{mol\,dm^{-3}}$ is the right statement. Ethanoic acid is a weak electrolyte: most of the $0.100\ \mathrm{mol\,dm^{-3}}$ is present as $\mathrm{CH_3COOH}$ molecules, and $[\mathrm{H^+}]$ is smaller than $0.100\ \mathrm{mol\,dm^{-3}}$ by a factor this chapter has no constant for. Setting the two concentrations equal would confuse the label, which records what was dissolved, with the ionisation, which records what the solution did with it. The numerical value of that ionisation is the job of [[general-chemistry-2/acids-bases]].
:::
:::
