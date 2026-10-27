A sprinter's leg muscles, a yeast cell in a vat of grape juice and a red blood cell share one pathway: the ten reactions of **glycolysis**, which split a molecule of glucose into two molecules of pyruvate and make a small, fast profit of ATP without any oxygen. In a cell with mitochondria and oxygen, pyruvate is then taken apart completely. Its carbons leave as carbon dioxide in the **citric acid cycle**, and its electrons are loaded onto NAD⁺ and FAD for delivery to the respiratory chain of [[biochemistry/oxidative-phosphorylation]]. Between them, these two pathways are the trunk of catabolism: carbohydrate, fat and protein all feed into them, and the intermediates they generate are the raw materials of biosynthesis.

This chapter is about the chemistry and the logic of those pathways rather than the memorisation of names. Each step is a reaction type you know from organic chemistry — phosphoryl transfer, aldose–ketose isomerisation through an enediol, retro-aldol cleavage, oxidation of an aldehyde through a thioester, dehydration, oxidative decarboxylation. Each step also has a place on a free-energy map, and that map decides which steps can be regulated and which simply follow the concentrations. The tools are those of [[biochemistry/bioenergetics]] — $\Delta_\mathrm{r}G' = \Delta_\mathrm{r}G^{\circ\prime} + RT\ln Q'$ ([[biochemistry/bioenergetics#prop-actual-dg]]), coupling through shared intermediates ([[biochemistry/bioenergetics#prop-coupling]]) and reduction potentials — together with the enzyme kinetics and allostery of [[biochemistry/enzymes]] and [[biochemistry/protein-function]]. Standard free energies are biochemical values at pH 7 and $298\ \mathrm{K}$ from Berg, Tymoczko, Gatto and Stryer (9th ed.) for glycolysis and from Nelson and Cox (8th ed.) for the citric acid cycle; tables from different books differ by a few $\mathrm{kJ\,mol^{-1}}$ because they refer to slightly different conditions. This lesson is for education only.

## Glycolysis: the ten steps

Glycolysis takes place in the cytosol of every cell. It has two phases. In the **preparatory phase** (steps 1–5) the cell *spends* two ATP to phosphorylate glucose twice and split it into two interconvertible three-carbon sugar phosphates. In the **payoff phase** (steps 6–10), which runs twice per glucose, each three-carbon unit is oxidised by NAD⁺ and its phosphoryl groups are passed to ADP, making four ATP.

| step | enzyme | reaction | $\Delta_\mathrm{r}G^{\circ\prime}$ | $\Delta_\mathrm{r}G'$ (erythrocyte) |
|---|---|---|---|---|
| 1 | hexokinase | glucose + ATP → glucose 6-phosphate + ADP | $-16.7$ | $-33.5$ |
| 2 | phosphoglucose isomerase | glucose 6-phosphate ⇌ fructose 6-phosphate | $+1.7$ | $-2.5$ |
| 3 | phosphofructokinase (PFK) | fructose 6-phosphate + ATP → fructose 1,6-bisphosphate + ADP | $-14.2$ | $-22.2$ |
| 4 | aldolase | fructose 1,6-bisphosphate ⇌ dihydroxyacetone phosphate + glyceraldehyde 3-phosphate | $+23.8$ | $-1.3$ |
| 5 | triose phosphate isomerase | dihydroxyacetone phosphate ⇌ glyceraldehyde 3-phosphate | $+7.5$ | $+2.5$ |
| 6 | glyceraldehyde 3-phosphate dehydrogenase | GAP + $\mathrm{P_i}$ + $\mathrm{NAD^+}$ ⇌ 1,3-bisphosphoglycerate + NADH + $\mathrm{H^+}$ | $+6.3$ | $-1.7$ |
| 7 | phosphoglycerate kinase | 1,3-BPG + ADP ⇌ 3-phosphoglycerate + ATP | $-18.8$ | $+1.3$ |
| 8 | phosphoglycerate mutase | 3-phosphoglycerate ⇌ 2-phosphoglycerate | $+4.4$ | $+0.8$ |
| 9 | enolase | 2-phosphoglycerate ⇌ phosphoenolpyruvate + $\mathrm{H_2O}$ | $+1.7$ | $-3.3$ |
| 10 | pyruvate kinase | phosphoenolpyruvate + ADP → pyruvate + ATP | $-31.4$ | $-16.7$ |

(Free energies in $\mathrm{kJ\,mol^{-1}}$; the cellular values are calculated from measured steady-state concentrations in human erythrocytes at $37\ \mathrm{^\circ C}$, Berg et al. The small positive values for steps 5, 7 and 8 are within the uncertainty of the concentration measurements and mean "close to zero"; a step with net forward flux cannot truly have $\Delta_\mathrm{r}G' > 0$.)

Two features of the table are the key to everything that follows. First, the standard values are a poor guide: aldolase has the largest positive $\Delta_\mathrm{r}G^{\circ\prime}$ in the pathway and yet carries the same flux as every other step. Second, in the cell seven of the ten steps have $\Delta_\mathrm{r}G'$ within a few $\mathrm{kJ\,mol^{-1}}$ of zero, and three — hexokinase, PFK and pyruvate kinase — are far from equilibrium. That pattern is not an accident; it is how a pathway is built to be controlled, and we make it precise in [[#def-control]].

::: proposition The stoichiometry of glycolysis {#prop-glycolysis}
The net reaction of glycolysis is
$$
\mathrm{glucose} + 2\,\mathrm{NAD^+} + 2\,\mathrm{ADP} + 2\,\mathrm{P_i} \rightarrow 2\,\mathrm{pyruvate} + 2\,\mathrm{NADH} + 2\,\mathrm{H^+} + 2\,\mathrm{ATP} + 2\,\mathrm{H_2O},
$$ {#eq-glycolysis}
with $\Delta_\mathrm{r}G^{\circ\prime} = -73.5\ \mathrm{kJ\,mol^{-1}}$ and, in the erythrocyte, $\Delta_\mathrm{r}G' \approx -96\ \mathrm{kJ\,mol^{-1}}$ from the values in the table. Glucose (oxidation level of carbon on average 0) is oxidised to pyruvate (average $+\tfrac23$); the four electrons released per glucose appear in two NADH.
:::

::: proof Adding up the steps
Steps 1–5 convert one glucose and two ATP into two glyceraldehyde 3-phosphate (GAP) and two ADP: aldolase gives one GAP and one dihydroxyacetone phosphate (DHAP), and triose phosphate isomerase converts the DHAP into a second GAP. Steps 6–10 then act on each GAP: step 6 consumes $\mathrm{P_i}$ and $\mathrm{NAD^+}$ and makes NADH; step 7 makes one ATP; step 9 releases one water; step 10 makes a second ATP. Per glucose, the payoff phase therefore makes $4$ ATP, $2$ NADH and $2$ water from $2$ GAP, $2\,\mathrm{P_i}$, $2\,\mathrm{NAD^+}$ and $4$ ADP. Subtracting the 2 ATP invested gives [[#eq-glycolysis]]. Because Gibbs energy is a state function ([[biochemistry/bioenergetics#prop-coupling]]), the standard free energy is the sum of the step values with steps 6–10 counted twice:
$$
(-16.7 + 1.7 - 14.2 + 23.8 + 7.5) + 2(6.3 - 18.8 + 4.4 + 1.7 - 31.4) = 2.1 - 75.6 = -73.5\ \mathrm{kJ\,mol^{-1}},
$$
and the cellular values add in the same way to $-57.0 + 2(-19.6) = -96.2\ \mathrm{kJ\,mol^{-1}}$. For the oxidation levels, glucose $\mathrm{C_6H_{12}O_6}$ has carbon at average oxidation state 0, and pyruvate $\mathrm{CH_3COCOO^-}$ has carbons at $-3$, $+2$ and $+3$, average $+\tfrac23$; two pyruvates thus carry $4$ units more oxidation than one glucose, the four electrons taken by $2\,\mathrm{NAD^+}$.
:::

### The chemistry of the preparatory phase

**Hexokinase** transfers the γ-phosphoryl of MgATP to the 6-hydroxyl of glucose ([[biochemistry/bioenergetics#ex-hexokinase]]). The product is trapped in the cell, since there is no transporter for glucose 6-phosphate, and it is committed to the metabolism of that cell. **Phosphoglucose isomerase** converts the aldose into a ketose: the enzyme opens the pyranose ring, a general base removes the proton on C2 to give a *cis*-enediol(ate) intermediate, and reprotonation at C1 gives the ketone at C2 — the same base-catalysed aldose–ketose isomerisation (the Lobry de Bruyn–van Ekenstein transformation) that glucose undergoes slowly in alkaline solution. The point of the isomerisation is to put a carbonyl at C2, so that a later retro-aldol cleavage between C3 and C4 can split the hexose into two three-carbon pieces; an aldose would split into a two- and a four-carbon fragment.

**Phosphofructokinase** phosphorylates the 1-hydroxyl. This is the first **committed step** of glycolysis: fructose 1,6-bisphosphate has no fate other than glycolysis (glucose 6-phosphate, by contrast, can also go to glycogen or the pentose phosphate pathway), and so it is here that the pathway is chiefly regulated. Then comes the cleavage.

::: example The aldolase step: mechanism and thermodynamics {#ex-aldolase}
Aldolase cleaves fructose 1,6-bisphosphate (FBP) into dihydroxyacetone phosphate (DHAP) and glyceraldehyde 3-phosphate (GAP), with $\Delta_\mathrm{r}G^{\circ\prime} = +23.8\ \mathrm{kJ\,mol^{-1}}$. (a) Describe the mechanism of the animal (class I) enzyme. (b) In human erythrocytes the steady-state concentrations are about $[\mathrm{FBP}] = 31$, $[\mathrm{DHAP}] = 138$ and $[\mathrm{GAP}] = 18.5\ \mu\mathrm{mol\,dm^{-3}}$ (Berg et al.). Calculate $K'$ and $\Delta_\mathrm{r}G'$ at $37\ \mathrm{^\circ C}$. (c) What would $\Delta_\mathrm{r}G'$ be if all three were at $1\ \mathrm{mmol\,dm^{-3}}$?
::: solution
(a) The reaction is a **retro-aldol** cleavage. In base-catalysed retro-aldol chemistry, an alkoxide on the β-carbon expels an enolate; aldolase does the same thing with a far better leaving group, by converting the C2 ketone of the open-chain sugar into an iminium ion. Step by step: the ε-amino group of an active-site lysine (Lys229 in the muscle enzyme) attacks the C2 carbonyl, and after proton transfers and loss of water a **protonated Schiff base** (iminium) forms. A basic residue removes the proton from the C4 hydroxyl; the C3–C4 bond breaks, its electrons moving towards the electron-poor iminium to give an **enamine**, and GAP (carbons 4–6) is released as an aldehyde. The enamine is protonated at C3 to regenerate the iminium, which is hydrolysed — water attacks, the lysine leaves — releasing DHAP (carbons 1–3) and freeing the enzyme. The iminium plays the role that a carbonyl plays in an ordinary aldol reaction but is a much stronger electron sink, so the carbanion-like enamine intermediate is stabilised ([[biochemistry/enzymes]], covalent catalysis). Reduction of the enzyme–substrate mixture with sodium borohydride traps the Schiff base as a stable secondary amine and inactivates the enzyme, which is how the covalent intermediate was demonstrated.

(b) At $310.15\ \mathrm{K}$, $RT = 2.579\ \mathrm{kJ\,mol^{-1}}$ and $K' = \exp(-23.8/2.579) = 9.8\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ (the constant has units, because one molecule gives two). The mass-action ratio is
$$
Q' = \frac{[\mathrm{DHAP}][\mathrm{GAP}]}{[\mathrm{FBP}]} = \frac{(1.38\times10^{-4})(1.85\times10^{-5})}{3.1\times10^{-5}} = 8.2\times10^{-5}\ \mathrm{mol\,dm^{-3}},
$$
so $\Delta_\mathrm{r}G' = 23.8 + 2.579\ln(8.24\times10^{-5}) = 23.8 - 24.3 = -0.5\ \mathrm{kJ\,mol^{-1}}$. The reaction is essentially at equilibrium ($Q'/K' = 0.84$), with a slight forward drive. (Berg's tabulated $-1.3\ \mathrm{kJ\,mol^{-1}}$ comes from a slightly different data set; both say "near zero".)

(c) With all three at $10^{-3}\ \mathrm{mol\,dm^{-3}}$, $Q' = 10^{-3}$ and $\Delta_\mathrm{r}G' = 23.8 + 2.579\ln10^{-3} = 23.8 - 17.8 = +6.0\ \mathrm{kJ\,mol^{-1}}$: the cleavage would run backwards. Because one molecule becomes two, dilution favours cleavage: every tenfold dilution of all three species lowers $\Delta_\mathrm{r}G'$ by $RT\ln 10 = 5.94\ \mathrm{kJ\,mol^{-1}}$. Metabolite concentrations in the micromolar range, together with the continuous removal of GAP by the next steps, are what make a reaction with a large positive $\Delta_\mathrm{r}G^{\circ\prime}$ run forwards.
:::
:::

**Triose phosphate isomerase** (TPI) converts DHAP into GAP through another enediol intermediate, using a glutamate as general base and a histidine as general acid. Its $k_\mathrm{cat}/K_\mathrm{M}$ is about $10^{8}$–$10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$, close to the diffusion limit: TPI is a "perfect" enzyme, in the sense of [[biochemistry/enzymes]], whose rate is set by how fast substrate arrives. At equilibrium DHAP is favoured about $20 : 1$, but GAP is removed so quickly that the isomerase keeps feeding it forwards.

### The payoff phase: oxidation and substrate-level phosphorylation

The central event of glycolysis is the oxidation of an aldehyde to a carboxylic acid — a strongly favourable reaction — coupled to the formation of an acyl phosphate, a compound of high phosphoryl-transfer potential. The coupling is done by a covalent intermediate on the enzyme.

::: example Coupling oxidation to ATP synthesis: GAPDH and phosphoglycerate kinase {#ex-gapdh}
(a) Describe how glyceraldehyde 3-phosphate dehydrogenase (GAPDH) conserves the free energy of aldehyde oxidation. (b) Using $\Delta_\mathrm{r}G^{\circ\prime} = +6.3$ (GAPDH) and $-18.8\ \mathrm{kJ\,mol^{-1}}$ (phosphoglycerate kinase), find $K'$ for each step and for the coupled pair at $298\ \mathrm{K}$, and explain why the two enzymes behave as a unit.
::: solution
(a) An active-site cysteine thiolate attacks the aldehyde carbon of GAP to form a **thiohemiacetal**. A hydride is then transferred from that carbon to C4 of the nicotinamide ring of bound $\mathrm{NAD^+}$, oxidising the thiohemiacetal to a **thioester** — the energy-rich acyl-enzyme. NADH leaves and a fresh $\mathrm{NAD^+}$ binds. Inorganic phosphate then attacks the thioester carbonyl (phosphorolysis rather than hydrolysis), and the tetrahedral intermediate collapses, expelling the cysteine thiolate and giving the **acyl phosphate** 1,3-bisphosphoglycerate. Had the thioester been hydrolysed by water, the free energy of the oxidation would have been lost as heat; capturing it with phosphate preserves it in a mixed anhydride of a carboxylic and a phosphoric acid, whose standard free energy of hydrolysis is $-49.4\ \mathrm{kJ\,mol^{-1}}$ ([[biochemistry/bioenergetics]]). (Arsenate, which resembles phosphate, is accepted by the enzyme, but the 1-arseno-3-phosphoglycerate formed hydrolyses spontaneously, so glycolysis continues without making ATP at step 7 — a textbook illustration of uncoupling by a structural analogue.)

(b) $K'(\mathrm{GAPDH}) = \exp(-6300/2479) = 0.079$ and $K'(\mathrm{PGK}) = \exp(18\,800/2479) = 2.0\times10^{3}$. For the sum, GAP + $\mathrm{P_i}$ + $\mathrm{NAD^+}$ + ADP → 3-phosphoglycerate + NADH + $\mathrm{H^+}$ + ATP, $\Delta_\mathrm{r}G^{\circ\prime} = -12.5\ \mathrm{kJ\,mol^{-1}}$ and $K' = 0.079 \times 2.0\times10^3 = 1.5\times10^{2}$ ([[biochemistry/bioenergetics#prop-coupling]]). The two steps share the intermediate 1,3-BPG, which is kept at a very low concentration (about $1\ \mu\mathrm{mol\,dm^{-3}}$ in erythrocytes) because PGK consumes it as fast as GAPDH makes it. Neither step can run without the other: the unfavourable oxidation is pulled by the favourable phosphoryl transfer. This is **substrate-level phosphorylation** — ATP made by transfer from a high-potential phosphorylated substrate, not from a proton gradient.
:::
:::

**Phosphoglycerate mutase** moves the phosphoryl group from C3 to C2, through a phosphohistidine on the enzyme and the intermediate 2,3-bisphosphoglycerate (the same compound that, made in large amounts by a side branch in erythrocytes, regulates haemoglobin's oxygen affinity, [[biochemistry/protein-function]]). **Enolase**, with two $\mathrm{Mg^{2+}}$ ions, removes the C2 proton and eliminates the C3 hydroxyl as water (an E1cB-like dehydration through an enolate), creating **phosphoenolpyruvate** (PEP). The dehydration barely changes the free energy content of the molecule, but it redistributes it: in PEP the phosphoryl group holds the molecule in its enol form, and hydrolysis releases an enol that tautomerises at once to the much more stable ketone. That tautomerisation is why PEP has the highest phosphoryl-transfer potential in metabolism ($-61.9\ \mathrm{kJ\,mol^{-1}}$), and why **pyruvate kinase**, transferring the phosphoryl to ADP, is strongly exergonic.

### The fates of pyruvate and NADH

Glycolysis can continue only if the NAD⁺ consumed at step 6 is regenerated. With oxygen and mitochondria, the NADH electrons are passed (via shuttles across the inner mitochondrial membrane) to the respiratory chain, and pyruvate enters the mitochondrion to be oxidised. Without oxygen, the cell must reduce some product of glycolysis with NADH. Muscle and erythrocytes reduce pyruvate to **lactate** with lactate dehydrogenase, a near-equilibrium step ([[biochemistry/bioenergetics#ex-ldh]]). Yeast decarboxylates pyruvate to acetaldehyde (pyruvate decarboxylase, with thiamine pyrophosphate) and reduces it to **ethanol** (alcohol dehydrogenase). Both fermentations have the same overall redox balance — no net oxidation — and yield only 2 ATP per glucose; their virtue is speed and independence from oxygen.

::: warning Lactate is not a waste product, and fermentation is not a "backup" that cells use only when they must
Two misconceptions are common. The first is that lactate made in exercising muscle is a dead-end poison. In fact lactate is exported to the blood and reoxidised to pyruvate by the heart (which oxidises it completely) and by the liver (which turns it back into glucose — the **Cori cycle**); the reaction that made it is reversible. Lactate formation is a way of regenerating $\mathrm{NAD^+}$ quickly, not of disposing of carbon. The second is that a cell uses glycolysis only for want of oxygen. Erythrocytes have no mitochondria and use nothing else; many rapidly dividing cells, including many tumour cells, convert most of their glucose to lactate even with plenty of oxygen (the Warburg effect), because glycolytic intermediates are needed for biosynthesis and glycolysis can make ATP faster per unit of enzyme than oxidative phosphorylation. Neither statement is medical advice; they illustrate how flux and yield are different design goals.
:::

## Control of metabolic flux

A pathway is like a series of pipes. Most of the pipes are wide — the enzymes are present in large excess and their reactions are close to equilibrium — and a few are narrow. To change the flow you adjust the narrow ones. The thermodynamic description of "wide" and "narrow" is the following.

::: definition Near-equilibrium and non-equilibrium steps; flux control {#def-control}
For a step of a pathway with apparent equilibrium constant $K'$ and cellular mass-action ratio $Q'$, the **disequilibrium ratio** is $\rho = Q'/K'$, so that $\Delta_\mathrm{r}G' = RT\ln\rho$. A step is **near equilibrium** if $\rho$ is close to 1 (in practice $\lvert\Delta_\mathrm{r}G'\rvert$ of no more than a few $\mathrm{kJ\,mol^{-1}}$, $\rho \gtrsim 0.1$): its enzyme has a capacity far greater than the pathway flux, the forward and reverse rates nearly cancel, and the net flux follows the concentrations of substrates and products. A step is **non-equilibrium** (often called *irreversible*) if $\rho \ll 1$ ($\Delta_\mathrm{r}G'$ strongly negative): the enzyme works close to its capacity in one direction only, and the flux depends on its activity. **Metabolic control** is the adjustment of pathway flux by changing the activity of enzymes — by allosteric effectors, covalent modification, or the amount of enzyme — and it is exerted principally at non-equilibrium steps, above all at the **committed step**, the first irreversible reaction unique to the pathway. Quantitatively, the **flux control coefficient** of enzyme $i$ is
$$
C^J_i = \frac{\partial\ln J}{\partial\ln E_i},
$$ {#eq-fcc}
the fractional change in steady-state flux $J$ per fractional change in the amount of enzyme $i$, and for a linear pathway the coefficients obey the **summation theorem** $\sum_i C^J_i = 1$.
:::

The reason regulation must sit at non-equilibrium steps follows from a simple relation between free energy and the two directions of flux.

::: proposition The flux–force relation {#prop-flux-force}
For a reaction that proceeds by a single mechanism, the ratio of the one-way forward and reverse fluxes is fixed by the free-energy change:
$$
\frac{J^+}{J^-} = \frac{K'}{Q'} = \mathrm{e}^{-\Delta_\mathrm{r}G'/RT}, \qquad J_\mathrm{net} = J^+ - J^- = J^+\left(1 - \mathrm{e}^{\Delta_\mathrm{r}G'/RT}\right).
$$ {#eq-flux-force}
A near-equilibrium step ($\Delta_\mathrm{r}G' \to 0$) has $J^+ \approx J^-$ and can carry net flux in either direction as concentrations change; a step with $\Delta_\mathrm{r}G' = -20\ \mathrm{kJ\,mol^{-1}}$ at $310\ \mathrm{K}$ has $J^+/J^- \approx 2\times10^{3}$, so that the net flux is essentially the forward flux, which is set by the enzyme's activity. The relation assumes that the reaction runs by a single pathway (so that microscopic reversibility applies to it) and that concentrations are ideal.
:::

::: proof
Take first a single elementary step $\mathrm{A} \rightleftharpoons \mathrm{B}$ with mass-action rates $J^+ = k_+[\mathrm A]$ and $J^- = k_-[\mathrm B]$. At equilibrium the two are equal, so $k_+/k_- = [\mathrm B]_\mathrm{eq}/[\mathrm A]_\mathrm{eq} = K'$ (detailed balance). Away from equilibrium, $J^+/J^- = (k_+/k_-)([\mathrm A]/[\mathrm B]) = K'/Q'$. For a multi-step enzyme mechanism, $\mathrm{E} + \mathrm{S} \rightleftharpoons \mathrm{ES} \rightleftharpoons \cdots \rightleftharpoons \mathrm{E} + \mathrm{P}$, the same argument applied to every elementary step and multiplied through (the ratios of the one-way fluxes through a sequence of steps at steady state multiply) gives $J^+/J^- = \prod_j (k_{+j}/k_{-j}) \cdot [\mathrm S]/[\mathrm P] = K'/Q'$, since the product of the elementary equilibrium constants is the overall $K'$ (the Haldane relation). Finally, by [[biochemistry/bioenergetics#prop-actual-dg]], $\Delta_\mathrm{r}G' = RT\ln(Q'/K')$, so $J^+/J^- = \mathrm{e}^{-\Delta_\mathrm{r}G'/RT}$, and the net flux follows by subtraction. With $\Delta_\mathrm{r}G' = -20\ \mathrm{kJ\,mol^{-1}}$ and $RT = 2.579\ \mathrm{kJ\,mol^{-1}}$, $\mathrm{e}^{20/2.579} = 2.3\times10^{3}$.
:::

::: example Which glycolytic steps can be regulated? {#ex-flux-ratios}
Using the erythrocyte values of $\Delta_\mathrm{r}G'$ (aldolase recalculated as $-0.45\ \mathrm{kJ\,mol^{-1}}$ in [[#ex-aldolase]]), calculate $J^+/J^-$ at $310\ \mathrm{K}$ for hexokinase, phosphoglucose isomerase, PFK, aldolase and pyruvate kinase, and interpret.
::: solution
From [[#eq-flux-force]], $J^+/J^- = \exp(-\Delta_\mathrm{r}G'/2.579)$:

| step | $\Delta_\mathrm{r}G'$ / $\mathrm{kJ\,mol^{-1}}$ | $J^+/J^-$ | net / forward |
|---|---|---|---|
| hexokinase | $-33.5$ | $4.4\times10^5$ | $1.000$ |
| phosphoglucose isomerase | $-2.5$ | $2.6$ | $0.62$ |
| PFK | $-22.2$ | $5.5\times10^3$ | $1.000$ |
| aldolase | $-0.45$ | $1.19$ | $0.16$ |
| pyruvate kinase | $-16.7$ | $6.5\times10^2$ | $0.998$ |

For aldolase, the forward flux exceeds the reverse by only 19 %: the enzyme runs about six times faster forwards than the net pathway flux, and almost as fast backwards. Inhibiting it by half would scarcely change the net flux — the concentrations would adjust slightly, $\rho$ would fall a little, and flux would continue. For PFK, the reverse flux is negligible; the net flux *is* the forward rate of the enzyme, so anything that changes PFK activity changes the pathway flux directly. Hexokinase, PFK and pyruvate kinase are the three control points of glycolysis, and they are the steps that gluconeogenesis must bypass with different enzymes, since a reaction this far from equilibrium cannot simply be run backwards.
:::
:::

The figure plots the cumulative free-energy change along glycolysis under standard and cellular conditions. Under standard conditions the path climbs and falls; in the cell it is a staircase with three tall steps and a series of nearly flat treads.

::: widget plot
f: -33.5*heaviside(x-1) - 2.5*heaviside(x-2) - 22.2*heaviside(x-3) - 1.3*heaviside(x-4) + 2.5*heaviside(x-5) - 3.4*heaviside(x-6) + 2.6*heaviside(x-7) + 1.6*heaviside(x-8) - 6.6*heaviside(x-9) - 33.4*heaviside(x-10); -16.7*heaviside(x-1) + 1.7*heaviside(x-2) - 14.2*heaviside(x-3) + 23.8*heaviside(x-4) + 7.5*heaviside(x-5) + 12.6*heaviside(x-6) - 37.6*heaviside(x-7) + 8.8*heaviside(x-8) + 3.4*heaviside(x-9) - 62.8*heaviside(x-10)
x: 0, 10.5
y: -110, 30
hlines: 0
labels: \text{cumulative }\Delta_\mathrm{r}G'\ \text{(erythrocyte)}; \text{cumulative }\Delta_\mathrm{r}G^{\circ\prime}
caption: Cumulative free-energy change (in $\mathrm{kJ\,mol^{-1}}$ per glucose) after each of the ten steps of glycolysis (horizontal axis: step number), with steps 6–10 counted twice. Under cellular conditions (first curve, ending at $-96\ \mathrm{kJ\,mol^{-1}}$) almost all the drop occurs at steps 1 (hexokinase), 3 (PFK) and 10 (pyruvate kinase); the other steps are nearly flat, i.e. near equilibrium. Under standard conditions (second curve, ending at $-73.5\ \mathrm{kJ\,mol^{-1}}$) the profile is completely different — aldolase is a steep climb and phosphoglycerate kinase a steep fall — which is why standard values cannot identify control points.
:::

### How phosphofructokinase is controlled

PFK is a tetramer whose rate curve against fructose 6-phosphate is sigmoidal, and which obeys the concerted (MWC) model of [[biochemistry/protein-function#prop-mwc]]. Its effectors read the energy state of the cell:

- **ATP** is a substrate but also an allosteric **inhibitor**, binding to a separate regulatory site and stabilising the low-affinity T state. When ATP is plentiful, glycolysis slows.
- **AMP** and **ADP** relieve the ATP inhibition. Because adenylate kinase keeps $2\,\mathrm{ADP} \rightleftharpoons \mathrm{ATP} + \mathrm{AMP}$ near equilibrium, a small fall in [ATP] produces a large *relative* rise in [AMP], which makes AMP a sensitive alarm signal.
- **Citrate**, the first intermediate of the citric acid cycle, inhibits PFK in muscle and liver: if the cycle is saturated, there is no point making more pyruvate.
- **Protons** inhibit, preventing excessive lactic acid production.
- **Fructose 2,6-bisphosphate**, made by a separate bifunctional kinase/phosphatase under hormonal control, is the most potent activator in liver: it raises PFK's affinity for fructose 6-phosphate and overcomes ATP inhibition. Glucagon, signalling low blood glucose, causes phosphorylation of the bifunctional enzyme, which lowers fructose 2,6-bisphosphate, slows glycolysis and relieves the inhibition of the gluconeogenic enzyme fructose 1,6-bisphosphatase — a **reciprocal** regulation that stops the two opposed pathways running at once.

::: widget plot
f: x^4/(x^4 + (0.1*(1 + (a/2)^4)/(1 + b))^4); x^4/(x^4 + 0.1^4)
x: 0, 3
y: 0, 1.05
sliders: a=1:0:6:0.1; b=0:0:20:0.5
labels: v/V_\mathrm{max}\ \text{with effectors}; v/V_\mathrm{max}\ \text{(no ATP inhibition)}
caption: An illustrative model of phosphofructokinase: rate (as a fraction of $V_\mathrm{max}$) against fructose 6-phosphate concentration (mM), as a Hill curve with $n = 4$ whose half-saturation concentration rises steeply with ATP (slider `a`, mM) and falls with fructose 2,6-bisphosphate (slider `b`, a relative activation factor). The second curve is the enzyme free of ATP inhibition. Raise ATP from $1$ to $4\ \mathrm{mM}$ and the curve moves far to the right — at physiological fructose 6-phosphate levels the enzyme almost stops; then raise `b` and the activator restores activity at the same ATP. The constants are chosen to show the shape of the regulation, not fitted to a particular enzyme.
:::

## From pyruvate to acetyl-CoA

In aerobic cells pyruvate is carried into the mitochondrial matrix and converted to acetyl-coenzyme A by the **pyruvate dehydrogenase complex** (PDH), a giant assembly of three enzymes and five coenzymes:
$$
\mathrm{pyruvate} + \mathrm{CoA} + \mathrm{NAD^+} \rightarrow \mathrm{acetyl\text{-}CoA} + \mathrm{CO_2} + \mathrm{NADH}, \qquad \Delta_\mathrm{r}G^{\circ\prime} = -33.4\ \mathrm{kJ\,mol^{-1}} .
$$
The chemistry is a sequence you can follow arrow by arrow. In **E1** (pyruvate dehydrogenase proper), the C2 carbanion (ylide) of thiamine pyrophosphate (TPP) adds to the ketone carbonyl of pyruvate; the adduct loses $\mathrm{CO_2}$, the thiazolium ring acting as an electron sink, to give hydroxyethyl-TPP, a stabilised carbanion (enamine). This carbanion attacks the disulfide of a **lipoamide** arm on **E2**, transferring the two-carbon unit as an acetyl thioester and reducing the lipoamide to a dithiol. E2 then transfers the acetyl group to the thiol of coenzyme A. In **E3** (dihydrolipoyl dehydrogenase), the reduced lipoamide is reoxidised by an enzyme-bound FAD, which passes the electrons to NAD⁺. The long lipoyl-lysine arm swings between the three active sites, so the intermediates never leave the complex — an example of **substrate channelling**.

Because acetyl-CoA cannot be converted back to pyruvate in animals, PDH is an irreversible commitment of carbohydrate carbon to oxidation or to fat synthesis, and it is tightly regulated: its products acetyl-CoA and NADH inhibit it, and a dedicated **PDH kinase** inactivates it by phosphorylation (stimulated by high ATP/ADP, NADH/NAD⁺ and acetyl-CoA/CoA ratios), while a **PDH phosphatase** reactivates it (stimulated by $\mathrm{Ca^{2+}}$ in contracting muscle and by insulin in adipose tissue).

## The citric acid cycle

The **citric acid cycle** (tricarboxylic acid or Krebs cycle) oxidises the acetyl group of acetyl-CoA completely to $\mathrm{CO_2}$. It does so catalytically: a four-carbon carrier, oxaloacetate, accepts the acetyl group, the six-carbon product loses two carbons as $\mathrm{CO_2}$ in two oxidative decarboxylations, and the remaining four-carbon unit is reoxidised to oxaloacetate. The eight steps (Nelson and Cox; $\Delta_\mathrm{r}G^{\circ\prime}$ in $\mathrm{kJ\,mol^{-1}}$) are:

| step | enzyme | reaction (simplified) | $\Delta_\mathrm{r}G^{\circ\prime}$ |
|---|---|---|---|
| 1 | citrate synthase | acetyl-CoA + oxaloacetate + $\mathrm{H_2O}$ → citrate + CoA | $-32.2$ |
| 2 | aconitase | citrate ⇌ isocitrate (via *cis*-aconitate) | $+13.3$ |
| 3 | isocitrate dehydrogenase | isocitrate + $\mathrm{NAD^+}$ → α-ketoglutarate + $\mathrm{CO_2}$ + NADH | $-20.9$ |
| 4 | α-ketoglutarate dehydrogenase complex | α-ketoglutarate + CoA + $\mathrm{NAD^+}$ → succinyl-CoA + $\mathrm{CO_2}$ + NADH | $-33.5$ |
| 5 | succinyl-CoA synthetase | succinyl-CoA + GDP (or ADP) + $\mathrm{P_i}$ ⇌ succinate + GTP (or ATP) + CoA | $-2.9$ |
| 6 | succinate dehydrogenase | succinate + FAD (enzyme-bound) ⇌ fumarate + $\mathrm{FADH_2}$ | $0$ |
| 7 | fumarase | fumarate + $\mathrm{H_2O}$ ⇌ L-malate | $-3.8$ |
| 8 | malate dehydrogenase | L-malate + $\mathrm{NAD^+}$ ⇌ oxaloacetate + NADH | $+29.7$ |

The organic chemistry is again familiar. Citrate synthase makes the C–C bond by a Claisen-type condensation: an aspartate removes a proton from the methyl group of acetyl-CoA, the enol(ate) of the thioester attacks the ketone carbonyl of oxaloacetate, and the citryl-CoA intermediate is hydrolysed — the hydrolysis of the thioester is what makes the step strongly favourable. Aconitase isomerises the tertiary alcohol citrate (which cannot be oxidised) into the secondary alcohol isocitrate by dehydration and rehydration, using an iron–sulfur cluster as a Lewis acid. Isocitrate dehydrogenase oxidises the secondary alcohol to a ketone, which is now β to a carboxylate, and the β-keto acid loses $\mathrm{CO_2}$ readily — the decarboxylation of a β-keto acid from [[organic-2/enols-enolates]]. α-Ketoglutarate dehydrogenase is a close relative of the PDH complex, with the same three-enzyme, TPP–lipoamide–FAD logic. Succinyl-CoA synthetase uses the free energy of the thioester to make GTP or ATP (animal cells have one isozyme for each, in proportions that vary between tissues), the only substrate-level phosphorylation of the cycle. Succinate dehydrogenase, the only membrane-bound enzyme of the cycle and also Complex II of the respiratory chain, oxidises a $\mathrm{CH_2{-}CH_2}$ to a *trans* $\mathrm{CH{=}CH}$ with FAD, because the free energy of this dehydrogenation is too small to reduce NAD⁺. Fumarase adds water stereospecifically to give L-malate, and malate dehydrogenase closes the loop.

::: proposition The stoichiometry of the citric acid cycle {#prop-tca}
One turn of the cycle carries out
$$
\mathrm{acetyl\text{-}CoA} + 3\,\mathrm{NAD^+} + \mathrm{FAD} + \mathrm{GDP} + \mathrm{P_i} + 2\,\mathrm{H_2O} \rightarrow 2\,\mathrm{CO_2} + 3\,\mathrm{NADH} + \mathrm{FADH_2} + \mathrm{GTP} + 2\,\mathrm{H^+} + \mathrm{CoA},
$$ {#eq-tca}
with $\Delta_\mathrm{r}G^{\circ\prime} = -50.3\ \mathrm{kJ\,mol^{-1}}$ from the table. Oxaloacetate is regenerated and not consumed; the eight electrons released by oxidising the two carbons of the acetyl group to $\mathrm{CO_2}$ appear as three NADH and one $\mathrm{FADH_2}$.
:::

::: proof Carbon, electron and free-energy bookkeeping
Adding the eight reactions, every intermediate (citrate, isocitrate, α-ketoglutarate, succinyl-CoA, succinate, fumarate, malate) is formed once and consumed once, and oxaloacetate is consumed in step 1 and re-formed in step 8, so all cancel. What remains is the input acetyl-CoA, two $\mathrm{CO_2}$ (steps 3 and 4), three NADH (steps 3, 4, 8), one $\mathrm{FADH_2}$ (step 6), one GTP (step 5), and the waters consumed in steps 1 and 7 (the water that aconitase removes it puts back). Electron count: the acetyl group's carbons are at oxidation states $-3$ (methyl) and $+3$ (thioester carbonyl), and in $\mathrm{CO_2}$ both are at $+4$, so $7 + 1 = 8$ electrons are removed; three NADH and one $\mathrm{FADH_2}$ carry $3 \times 2 + 2 = 8$. Free energy: $-32.2 + 13.3 - 20.9 - 33.5 - 2.9 + 0 - 3.8 + 29.7 = -50.3\ \mathrm{kJ\,mol^{-1}}$. (Strictly, the two $\mathrm{CO_2}$ in each turn come from carbons that entered as oxaloacetate in earlier turns, not from the acetyl group just added — but the net bookkeeping is the same.)
:::

The last remark in the proof is worth taking seriously, because isotope-labelling experiments depend on it, and it shows that the cycle is a cycle and not a linear pathway.

::: example Following the carbons of acetyl-CoA {#ex-label}
Acetyl-CoA labelled with $^{14}\mathrm C$ in the carbonyl carbon is fed to mitochondria. In which turn of the cycle does the label first appear in $\mathrm{CO_2}$? Assume no other reactions remove or add cycle intermediates.
::: solution
Follow the atoms. Citrate synthase joins the methyl carbon of acetyl-CoA to the carbonyl carbon (C2) of oxaloacetate; the acetyl carbonyl carbon becomes the carboxyl at the end of the acetyl-derived arm of citrate. Aconitase acts stereospecifically on the *oxaloacetate-derived* arm (citrate is prochiral, and the enzyme distinguishes its two $\mathrm{CH_2COO^-}$ arms), so the hydroxyl moves into that arm, and isocitrate dehydrogenase removes as $\mathrm{CO_2}$ the carboxyl attached to the central carbon — an oxaloacetate carbon. α-Ketoglutarate dehydrogenase then removes the carboxyl next to the ketone, again an oxaloacetate carbon. So in the **first** turn, neither $\mathrm{CO_2}$ contains the label: both acetyl carbons survive into succinyl-CoA. At succinate, a symmetric molecule, the label is scrambled between the two carboxyl carbons; it ends up in either C1 or C4 of the regenerated oxaloacetate. In the **second** turn, both of the carbons released as $\mathrm{CO_2}$ derive from the carboxyl carbons of the oxaloacetate, so all of the label leaves in the second turn. (A methyl label, by the same reasoning, reaches the interior carbons of oxaloacetate and is released only in the third turn and later, half at a time.) The experiment that first showed this stereospecificity — that a symmetric molecule like citrate is treated asymmetrically by an enzyme — led Alexander Ogston in 1948 to the idea of three-point attachment, and later to the concept of prochirality.
:::
:::

::: widget graph
nodes: AcCoA@0,4.6; OAA@0,3; Citrate@1.5,3.6; Isocitrate@2.6,2.5; aKG@2.6,1; SuccCoA@1.5,-0.1; Succinate@0,-0.5; Fumarate@-1.5,-0.1; Malate@-2,1.5
edges: AcCoA>Citrate; OAA>Citrate; Citrate>Isocitrate; Isocitrate>aKG:1; aKG>SuccCoA:1; SuccCoA>Succinate; Succinate>Fumarate:1; Fumarate>Malate; Malate>OAA:1
algorithm: none
caption: The citric acid cycle as a reaction network. Acetyl-CoA (AcCoA) enters by condensing with oxaloacetate (OAA); aKG is α-ketoglutarate and SuccCoA succinyl-CoA. Edges labelled $1$ produce one reduced carrier: NADH at isocitrate dehydrogenase, α-ketoglutarate dehydrogenase and malate dehydrogenase, and enzyme-bound $\mathrm{FADH_2}$ at succinate dehydrogenase. $\mathrm{CO_2}$ leaves at the isocitrate and α-ketoglutarate steps, and GTP is made at the succinyl-CoA → succinate step. Oxaloacetate is regenerated, so the cycle acts as a catalyst for the oxidation of acetyl groups.
:::

### Driving the cycle: the malate dehydrogenase problem

Malate dehydrogenase has $\Delta_\mathrm{r}G^{\circ\prime} = +29.7\ \mathrm{kJ\,mol^{-1}}$, an apparent equilibrium constant of about $10^{-5}$ at $37\ \mathrm{^\circ C}$. With a mitochondrial free $[\mathrm{NAD^+}]/[\mathrm{NADH}]$ ratio of order 10, equilibrium gives $[\mathrm{oxaloacetate}]/[\mathrm{malate}] \approx 10^{-5} \times 10 = 10^{-4}$, and oxaloacetate in the matrix is indeed held at very low (low micromolar or lower) concentrations. The step is pulled by the next one: citrate synthase, with its thioester hydrolysis, has $\Delta_\mathrm{r}G^{\circ\prime} = -32.2\ \mathrm{kJ\,mol^{-1}}$, so the two together are favourable ($-2.5\ \mathrm{kJ\,mol^{-1}}$ under standard conditions, and more so in the cell, where acetyl-CoA is far above oxaloacetate). It is the same coupling principle as GAPDH and phosphoglycerate kinase, with a low-concentration intermediate passed from one enzyme to the next.

### Regulation of the cycle

The citric acid cycle is controlled by supply and demand at its three strongly exergonic steps — citrate synthase, isocitrate dehydrogenase and α-ketoglutarate dehydrogenase — and at its entry point, PDH. High ratios of NADH/NAD⁺ and ATP/ADP, signalling that the respiratory chain is backed up and energy is plentiful, inhibit all of them; ADP activates isocitrate dehydrogenase; $\mathrm{Ca^{2+}}$, released in contracting muscle, activates isocitrate and α-ketoglutarate dehydrogenases (and PDH phosphatase), so the cycle speeds up as soon as work begins. Because the cycle's dehydrogenases depend on NAD⁺, the rate of the cycle is tied directly to the rate at which the respiratory chain reoxidises NADH — that is, to the demand for ATP ([[biochemistry/oxidative-phosphorylation]]).

The cycle is also **amphibolic**: it serves biosynthesis as well as breakdown. α-Ketoglutarate and oxaloacetate are drawn off to make glutamate and aspartate, succinyl-CoA to make haem, citrate is exported to the cytosol to provide acetyl-CoA for fatty-acid synthesis, and oxaloacetate leaves (as malate) for gluconeogenesis. Every withdrawal must be balanced by an **anaplerotic** ("filling up") reaction, the most important being pyruvate carboxylase, pyruvate + $\mathrm{HCO_3^-}$ + ATP → oxaloacetate + ADP + $\mathrm{P_i}$, which is activated by acetyl-CoA — a signal that more oxaloacetate is needed to accept it.

::: quiz Control points
A drug (hypothetically) halves the activity of one glycolytic enzyme in a cell. In which case would you expect the smallest change in the steady-state glycolytic flux?
- [ ] Phosphofructokinase
- [ ] Pyruvate kinase
- [x] Aldolase
- [ ] Hexokinase
::: solution
Aldolase operates near equilibrium ($J^+/J^- \approx 1.2$, [[#ex-flux-ratios]]): its capacity is several times the net flux, so halving it causes a small rise in fructose 1,6-bisphosphate and a small fall in the trioses, enough to restore nearly the same net flux. Its flux control coefficient is close to zero. PFK, hexokinase and pyruvate kinase are non-equilibrium steps whose activity sets the flux, so they carry most of the control ([[#def-control]]). (The example is a thought experiment about control, not a description of any real drug.)
:::
:::

## Gluconeogenesis: running the pathway backwards

The liver and kidney make glucose from lactate, glycerol and the carbon skeletons of most amino acids. This **gluconeogenesis** uses the seven near-equilibrium enzymes of glycolysis in reverse, but cannot reverse the three non-equilibrium steps; it bypasses each of them with different enzymes:

1. **Pyruvate → phosphoenolpyruvate** in two steps: pyruvate carboxylase (mitochondrial, biotin-dependent, using ATP) makes oxaloacetate, and PEP carboxykinase (using GTP) decarboxylates and phosphorylates it to PEP. Overall, pyruvate + ATP + GTP → PEP + ADP + GDP + $\mathrm{P_i}$, with $\Delta_\mathrm{r}G^{\circ\prime} = +31.4 - 30.5 = +0.9\ \mathrm{kJ\,mol^{-1}}$ — two phosphoanhydrides are spent to make one high-energy enol phosphate, and the reaction becomes easily reversible.
2. **Fructose 1,6-bisphosphate → fructose 6-phosphate** by fructose 1,6-bisphosphatase, a hydrolysis ($\Delta_\mathrm{r}G^{\circ\prime} = +14.2 - 30.5 = -16.3\ \mathrm{kJ\,mol^{-1}}$), inhibited by AMP and fructose 2,6-bisphosphate.
3. **Glucose 6-phosphate → glucose** by glucose 6-phosphatase in the endoplasmic reticulum of liver and kidney ($-13.8\ \mathrm{kJ\,mol^{-1}}$), which is why only these organs can release free glucose into the blood.

::: example The cost of making glucose {#ex-gng}
(a) Write the net equation for gluconeogenesis from two pyruvate. (b) Calculate its $\Delta_\mathrm{r}G^{\circ\prime}$ from the glycolysis table, and compare it with the reversal of glycolysis. (c) What does running glycolysis and gluconeogenesis simultaneously achieve?
::: solution
(a) Count the nucleotides. Per glucose, pyruvate carboxylase uses 2 ATP and PEP carboxykinase 2 GTP (one of each per pyruvate), and the reversed phosphoglycerate kinase step uses 2 ATP (one per 3-phosphoglycerate); the two phosphatases release $\mathrm{P_i}$ without making ATP. Two NADH are consumed by the reversed GAPDH step. The net equation is
$$
2\,\mathrm{pyruvate} + 4\,\mathrm{ATP} + 2\,\mathrm{GTP} + 2\,\mathrm{NADH} + 2\,\mathrm{H^+} + 6\,\mathrm{H_2O} \rightarrow \mathrm{glucose} + 4\,\mathrm{ADP} + 2\,\mathrm{GDP} + 6\,\mathrm{P_i} + 2\,\mathrm{NAD^+} .
$$
(b) Simple reversal of glycolysis would have $\Delta_\mathrm{r}G^{\circ\prime} = +73.5\ \mathrm{kJ\,mol^{-1}}$. Gluconeogenesis is the reversal plus the hydrolysis of four extra phosphoanhydride bonds (six spent, against the two that reversal would need): $73.5 - 4 \times 30.5 = -48.5\ \mathrm{kJ\,mol^{-1}}$. The price of making the pathway run "uphill" in the direction of glucose is four extra ATP equivalents per glucose; the reward is that it is now thermodynamically favourable and, because it uses separate enzymes at the irreversible steps, separately controllable.

(c) If PFK and fructose 1,6-bisphosphatase were both active, their sum would be ATP + $\mathrm{H_2O}$ → ADP + $\mathrm{P_i}$: a **substrate cycle**, which does nothing but hydrolyse ATP and release heat. Reciprocal regulation (by AMP, citrate and fructose 2,6-bisphosphate) normally prevents this. A small, controlled substrate cycle, however, can amplify the response of net flux to an effector — and in some insect flight muscles generates heat.
:::
:::

## Where this leads

The NADH and $\mathrm{FADH_2}$ produced here are worth nothing until their electrons reach oxygen; [[biochemistry/oxidative-phosphorylation]] follows them through the respiratory chain, explains how the free energy is stored as a proton-motive force, and completes the ATP yield of glucose (about 30–32 ATP). The citric acid cycle is also the meeting point of fat and protein catabolism: β-oxidation feeds it acetyl-CoA and amino-acid skeletons enter at pyruvate, acetyl-CoA, α-ketoglutarate, succinyl-CoA, fumarate and oxaloacetate ([[biochemistry/lipid-nitrogen-metabolism]]), where we also see how insulin and glucagon coordinate the control points of this chapter across tissues. Glycogen synthesis and breakdown from glucose 6-phosphate connect to [[biochemistry/carbohydrates-lipids]]. Metabolic control analysis, with its flux control coefficients, is the quantitative language of metabolic engineering and of the kinetic network models in [[kinetics]].

::: history
The pathway of glycolysis was worked out in the 1920s and 1930s from studies of yeast fermentation and muscle extracts, building on Eduard Buchner's cell-free fermentation of 1897 and on Arthur Harden and William Young's discovery of a hexose bisphosphate and a heat-stable cofactor in yeast juice (1905–06). The sequence of reactions was assembled chiefly by Gustav Embden, Otto Meyerhof and Jakub Parnas, whose names it bears (the Embden–Meyerhof–Parnas pathway), together with contributions from Otto Warburg, Carl Neuberg and Carl and Gerty Cori; by about 1940 all ten steps were known. Meyerhof shared the 1922 Nobel Prize in Physiology or Medicine for work on lactic acid in muscle, and the Coris received the 1947 prize for the catalytic conversion of glycogen, having described the lactate–glucose cycle between muscle and liver in 1929. The oxidation of pyruvate was harder. Albert Szent-Györgyi showed in 1935 that small amounts of the four-carbon dicarboxylic acids catalytically stimulate respiration in minced pigeon breast muscle, and in 1937 Hans Krebs and William Arthur Johnson in Sheffield showed that citrate is formed from oxaloacetate and regenerated, proposing the cycle; their paper was declined by *Nature* and appeared in *Enzymologia* the same year. The missing "active acetate" was identified as acetyl-coenzyme A after Fritz Lipmann discovered coenzyme A in the mid-1940s and Feodor Lynen showed in 1951 that the acetyl group is attached as a thioester. Krebs and Lipmann shared the 1953 Nobel Prize in Physiology or Medicine. Metabolic control analysis, with its control coefficients and summation theorem, was formulated by Henrik Kacser and James Burns (1973) and, independently, by Reinhart Heinrich and Tom Rapoport (1974).
:::

::: summary
- Glycolysis splits glucose into two pyruvate with a net gain of 2 ATP and 2 NADH; steps 1–5 invest 2 ATP, steps 6–10 (run twice) make 4 ATP by substrate-level phosphorylation.
- Each step is a familiar organic reaction: phosphoryl transfer, enediol isomerisation, retro-aldol cleavage via a lysine Schiff base (aldolase), aldehyde oxidation via a thioester and phosphorolysis (GAPDH), dehydration to an enol phosphate (enolase).
- In the cell seven glycolytic steps are near equilibrium; hexokinase, PFK and pyruvate kinase are far from it and are the control points. Standard values ($\Delta_\mathrm{r}G^{\circ\prime} = +23.8\ \mathrm{kJ\,mol^{-1}}$ for aldolase) do not identify them; cellular $\Delta_\mathrm{r}G'$ values do.
- The flux–force relation $J^+/J^- = \mathrm{e}^{-\Delta_\mathrm{r}G'/RT}$ explains why control sits at non-equilibrium steps; flux control coefficients $C^J_i = \partial\ln J/\partial\ln E_i$ sum to 1.
- PFK, the committed step, is inhibited by ATP, citrate and $\mathrm{H^+}$ and activated by AMP and fructose 2,6-bisphosphate; reciprocal control prevents futile cycling with gluconeogenesis.
- The PDH complex (TPP, lipoamide, CoA, FAD, NAD⁺) converts pyruvate irreversibly to acetyl-CoA; one turn of the citric acid cycle oxidises an acetyl group to 2 $\mathrm{CO_2}$, making 3 NADH, 1 $\mathrm{FADH_2}$ and 1 GTP.
- Gluconeogenesis bypasses the three irreversible steps (pyruvate carboxylase + PEP carboxykinase, fructose 1,6-bisphosphatase, glucose 6-phosphatase) at a cost of 6 phosphoanhydride bonds per glucose, making it favourable ($\approx -48\ \mathrm{kJ\,mol^{-1}}$).
:::

## Exercises

::: exercise Triose phosphate isomerase at equilibrium {level=1 check="0.0485"}
For DHAP ⇌ GAP, $\Delta_\mathrm{r}G^{\circ\prime} = +7.5\ \mathrm{kJ\,mol^{-1}}$. Calculate $K'$ at $298.15\ \mathrm K$ and the equilibrium percentage of triose phosphate present as GAP. (Enter $K'$ to three significant figures.)
::: solution
$K' = \exp(-7500/(8.314 \times 298.15)) = \exp(-3.025) = 0.0485$. At equilibrium $[\mathrm{GAP}]/[\mathrm{DHAP}] = 0.0485$, so GAP is $0.0485/1.0485 = 4.6\,\%$ of the total. Glycolysis nevertheless converts all the DHAP to GAP, because GAPDH removes GAP continuously and TPI, being extremely fast, keeps re-establishing the equilibrium.
:::
:::

::: exercise ATP from glycogen {level=1 check="3"}
Glycogen phosphorylase releases glucose 1-phosphate from glycogen using inorganic phosphate rather than ATP, and phosphoglucomutase converts it to glucose 6-phosphate. How many ATP (net) does anaerobic glycolysis make per glucose unit of glycogen converted to lactate? (Enter the number of ATP.)
::: solution
Starting from glucose 6-phosphate skips the hexokinase step, so only one ATP is invested (at PFK) instead of two. The payoff phase still makes 4 ATP. Net: $4 - 1 = 3$ ATP per glucose unit. The NADH made at GAPDH is reoxidised by lactate dehydrogenase, so there is no net gain of NADH. This is why muscle glycogen is such an effective fuel for a sprint.
:::
:::

::: exercise Reduced carriers from one acetyl group {level=1 check="10"}
Using 2.5 ATP per NADH and 1.5 ATP per $\mathrm{FADH_2}$ ([[biochemistry/oxidative-phosphorylation#prop-atp-stoich]]), how many ATP (or GTP) equivalents are produced by the complete oxidation of one acetyl-CoA in the citric acid cycle and the respiratory chain? (Enter the number of ATP equivalents.)
::: solution
One turn produces 3 NADH, 1 $\mathrm{FADH_2}$ and 1 GTP ([[#prop-tca]]): $3 \times 2.5 + 1 \times 1.5 + 1 = 10$ ATP equivalents. With the 2 ATP and 2 NADH of glycolysis and the NADH of PDH (per pyruvate), the whole oxidation of glucose comes to about 30–32 ATP, depending on how the cytosolic NADH enters the mitochondrion.
:::
:::

::: exercise Concentrating the aldolase substrates {level=2 check="5.49"}
Using the erythrocyte concentrations and data of [[#ex-aldolase]], calculate $\Delta_\mathrm{r}G'$ for aldolase at $37\ \mathrm{^\circ C}$ if FBP, DHAP and GAP were all ten times more concentrated. (Enter $\Delta_\mathrm{r}G'$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
Multiplying all three concentrations by 10 multiplies $Q' = [\mathrm{DHAP}][\mathrm{GAP}]/[\mathrm{FBP}]$ by 10: $Q' = 8.235\times10^{-4}$. Then $\Delta_\mathrm{r}G' = 23.8 + 2.5787\ln(8.235\times10^{-4}) = 23.8 - 18.31 = 5.49\ \mathrm{kJ\,mol^{-1}}$, positive: the reaction would run backwards. Equivalently, the original $-0.45$ plus $RT\ln 10 = 5.94$ gives $5.49$. For a reaction with unequal numbers of reactant and product molecules, the absolute concentration level matters, not just the ratios.
:::
:::

::: exercise One-way fluxes at phosphofructokinase {level=2 check="5500"}
In erythrocytes $\Delta_\mathrm{r}G' = -22.2\ \mathrm{kJ\,mol^{-1}}$ for PFK at $310\ \mathrm K$. Calculate the ratio $J^+/J^-$ of forward to reverse one-way fluxes, and the fraction of the forward flux that is cancelled by the reverse flux. (Enter $J^+/J^-$ to two significant figures.)
::: solution
By [[#eq-flux-force]], $J^+/J^- = \exp(22.2/2.5787) = \exp(8.609) = 5.5\times10^3$, i.e. $5500$ to two significant figures. The reverse flux cancels $1/5480 = 0.018\,\%$ of the forward flux. PFK is, for practical purposes, a one-way valve; its activity sets the flux, which is why it is so heavily regulated.
:::
:::

::: exercise Oxaloacetate in the mitochondrion {level=2 check="1.0e-4"}
For L-malate + $\mathrm{NAD^+}$ ⇌ oxaloacetate + NADH + $\mathrm{H^+}$, $\Delta_\mathrm{r}G^{\circ\prime} = +29.7\ \mathrm{kJ\,mol^{-1}}$. Assuming the reaction is at equilibrium in the matrix at $310\ \mathrm K$ with $[\mathrm{NAD^+}]/[\mathrm{NADH}] = 10$, calculate $[\mathrm{oxaloacetate}]/[\mathrm{malate}]$. If [malate] is $0.2\ \mathrm{mmol\,dm^{-3}}$, what is [oxaloacetate]? (Enter the ratio to two significant figures.)
::: solution
$K' = \exp(-29\,700/(8.314 \times 310.15)) = \exp(-11.52) = 9.96\times10^{-6}$. At equilibrium $[\mathrm{OAA}]/[\mathrm{malate}] = K'[\mathrm{NAD^+}]/[\mathrm{NADH}] = 9.96\times10^{-5} = 1.0\times10^{-4}$. With [malate] $= 0.2\ \mathrm{mmol\,dm^{-3}}$, $[\mathrm{OAA}] \approx 2\times10^{-8}\ \mathrm{mol\,dm^{-3}} = 20\ \mathrm{nmol\,dm^{-3}}$ — far below the concentrations of the other intermediates. The very low oxaloacetate concentration is pulled forward by citrate synthase, whose $K_\mathrm{M}$ for oxaloacetate is correspondingly low.
:::
:::

::: exercise The free energy of gluconeogenesis {level=3 check="-48.5"}
(a) Using the glycolysis table, write the standard free energies of the three bypass reactions of gluconeogenesis (pyruvate → PEP via oxaloacetate using ATP and GTP; FBP hydrolysis; G6P hydrolysis), taking $-30.5\ \mathrm{kJ\,mol^{-1}}$ for hydrolysis of ATP or GTP. (b) Add them to the reversed near-equilibrium steps to obtain $\Delta_\mathrm{r}G^{\circ\prime}$ for gluconeogenesis from 2 pyruvate. (Enter $\Delta_\mathrm{r}G^{\circ\prime}$ in $\mathrm{kJ\,mol^{-1}}$.)
::: hint
Each bypass is "reverse of the glycolytic step" plus "hydrolysis of one nucleoside triphosphate". Remember that the pyruvate → PEP bypass and the reversed steps 6–9 occur twice per glucose.
:::
::: solution
(a) Pyruvate → PEP: reverse of pyruvate kinase ($+31.4$) plus one extra NTP hydrolysis ($-30.5$): $+0.9\ \mathrm{kJ\,mol^{-1}}$. FBP → F6P: reverse of PFK ($+14.2$) plus ATP hydrolysis ($-30.5$): $-16.3$. G6P → glucose: reverse of hexokinase ($+16.7$) plus ATP hydrolysis: $-13.8\ \mathrm{kJ\,mol^{-1}}$.

(b) Reversed near-equilibrium steps: steps 2, 4, 5 once, $-1.7 - 23.8 - 7.5 = -33.0$; steps 6–9 twice, $2(-6.3 + 18.8 - 4.4 - 1.7) = +12.8$. Bypasses: $2(+0.9) - 16.3 - 13.8 = -28.3$. Total: $-33.0 + 12.8 - 28.3 = -48.5\ \mathrm{kJ\,mol^{-1}}$, which equals $+73.5 - 4 \times 30.5$, as in [[#ex-gng]]. The decomposition shows where the extra ATP is spent: at the three bypasses, exactly where glycolysis is irreversible.
:::
:::

::: exercise A methyl label through four turns {level=3 check="0.25"}
Acetyl-CoA labelled with $^{14}\mathrm C$ in its **methyl** carbon enters the citric acid cycle, and no intermediates are added or removed. What fraction of the label is still in cycle intermediates after four complete turns? Explain the reasoning turn by turn.
::: hint
Use the atom mapping of [[#ex-label]]: in each turn, the two $\mathrm{CO_2}$ come from the two carboxyl carbons of the oxaloacetate that started the turn, and succinate's symmetry randomises the label between equivalent positions.
:::
::: solution
Turn 1: the methyl carbon becomes the $\mathrm{CH_2}$ of the acetyl-derived arm of citrate and survives (both $\mathrm{CO_2}$ come from oxaloacetate carbons). At succinate it is one of the two equivalent methylene carbons, so in the new oxaloacetate it is at C2 or C3 (interior carbons) — label retained: 100 %. Turn 2: interior carbons of oxaloacetate are not released; the C2 of oxaloacetate becomes an interior (methylene) carbon of succinate, and C3 becomes a carboxyl carbon (the thioester carbon of succinyl-CoA). After scrambling at succinate, half the label is in the carboxyl positions of the next oxaloacetate and half in the interior positions — 100 % still retained. Turn 3: the carboxyl carbons are released, so half the label leaves; 50 % remains, again split equally between interior and carboxyl positions at the end of the turn. Turn 4: half of the remainder leaves. Fraction remaining after four turns: $1 \times 1 \times \tfrac12 \times \tfrac12 = 0.25$. Such labelling patterns, measured by NMR or mass spectrometry of isotopomers, are used to measure fluxes through the cycle and its anaplerotic branches.
:::
:::

::: exercise Sharing control in a pathway {level=3 check="23"}
A linear three-enzyme pathway has measured flux control coefficients $C^J_1 = 0.6$ and $C^J_2 = 0.3$. (a) Find $C^J_3$. (b) Estimate the percentage increase in flux if the amount of enzyme 2 is doubled, assuming $C^J_2$ stays constant over the change. (c) Explain why overexpressing a single "rate-limiting" enzyme rarely increases flux much. (Enter the percentage increase, to the nearest whole number.)
::: solution
(a) By the summation theorem in [[#def-control]], $C^J_3 = 1 - 0.6 - 0.3 = 0.1$. (b) If $C = \mathrm{d}\ln J/\mathrm{d}\ln E$ is constant, $J \propto E^{C}$, so doubling $E_2$ multiplies $J$ by $2^{0.3} = 1.231$: an increase of about 23 %. (c) As the overexpressed enzyme's activity rises, the intermediates before it fall and those after it rise, so it becomes closer to equilibrium and its control coefficient decreases, while the other enzymes' coefficients increase (they must still sum to 1). Control is a property of the whole system, distributed among its steps; a "rate-limiting step" with $C = 1$ is a limiting case, not the norm. Metabolic engineers therefore usually raise several enzymes together.
:::
:::
