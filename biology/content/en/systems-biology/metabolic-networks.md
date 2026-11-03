The metabolic network of *Escherichia coli* contains some two thousand reactions linking over a thousand metabolites. A kinetic model of the kind built in earlier chapters would need a rate law for every enzyme, with its Michaelis constants, inhibition constants and maximal rates measured under conditions resembling the inside of a cell — a task that has been completed for only a few small pathways. Yet there is a great deal we can say about metabolism without any kinetic parameters at all. Mass must be conserved: at steady state, every metabolite must be produced as fast as it is consumed. This single constraint, applied to a list of reactions with their stoichiometry, defines the space of possible flux patterns, and adding a few measured limits and an assumption about what the cell is trying to do — grow as fast as possible, for example — often predicts the actual pattern surprisingly well. That is the idea of **flux balance analysis**.

The second half of the chapter asks a different question: when a pathway's flux is set by its enzymes, which enzymes control it? The intuitive answer — a single "rate-limiting step" — is usually wrong, and **metabolic control analysis** gives the correct framework: control is shared among enzymes and measured by **control coefficients** that sum to one. The biochemistry of the pathways is in [[biochemistry/glycolysis-tca]] and [[biochemistry/metabolic-integration]], and enzyme kinetics in [[biochemistry/enzymes]]; the linear algebra of null spaces and linear programming is in [vector spaces](/learn/maths/lesson.php?c=linear-algebra&l=vector-spaces) and [linear systems](/learn/maths/lesson.php?c=linear-algebra&l=linear-systems) in Maths Atlas. We build on the kinetic equations of [[systems-biology/modelling-principles]].

## The stoichiometric matrix

::: definition Stoichiometric matrix {#def-stoich}
For a network of $m$ metabolites and $n$ reactions, the **stoichiometric matrix** $\mathbf{S}$ is the $m\times n$ matrix whose entry $S_{ij}$ is the number of molecules of metabolite $i$ produced (positive) or consumed (negative) by one event of reaction $j$. With $\mathbf{x}$ the vector of metabolite concentrations and $\mathbf{v}$ the vector of reaction rates (**fluxes**), mass balance gives

$$
\frac{d\mathbf{x}}{dt} = \mathbf{S}\mathbf{v}.
$$ {#eq-mass-balance}

Reactions that exchange material with the environment (uptake, secretion) are included as columns with a single nonzero entry.
:::

[[#eq-mass-balance]] separates what is fixed — the stoichiometry, known from biochemistry and genome annotation — from what is hard to know — the kinetics that determine $\mathbf{v}$ as a function of $\mathbf{x}$. The stoichiometric matrix of a cell's metabolism can be assembled from its genome: each annotated enzyme gene contributes the reactions its product catalyses. Such **genome-scale metabolic reconstructions** now exist for hundreds of organisms. The most recent widely used *E. coli* K-12 MG1655 reconstruction, iML1515 (Jonathan Monk, Bernhard Palsson and colleagues, 2017), accounts for 1,515 genes, 2,719 reactions and 1,192 metabolites, and reconstructions of human metabolism contain more than ten thousand reactions (as of 2026).

### Steady states and the null space

Metabolites turn over in seconds, much faster than enzyme levels change or cells grow, so on the time scale of growth the internal metabolites are at a quasi-steady state ([[systems-biology/modelling-principles]]):

$$
\mathbf{S}\mathbf{v} = \mathbf{0}.
$$ {#eq-steady-flux}

The allowed steady-state flux vectors form the **null space** of $\mathbf{S}$. If $\mathbf{S}$ has rank $r$, this space has dimension $n - r$: a network with more reactions than independent metabolite balances has $n - r$ degrees of freedom, which kinetics (or optimisation, below) must fix. A simple branch point makes the point: if A is made at rate $v_1$ and consumed by two reactions at rates $v_2$ and $v_3$, steady state requires $v_1 = v_2 + v_3$, but says nothing about how the flux is split.

Biochemical constraints further restrict the fluxes. Irreversible reactions must have $v_j \ge 0$; uptake rates are limited by transporter capacity and nutrient availability; and enzyme capacities set upper bounds. Together these define a convex polyhedral **flux cone** (or, with upper bounds, a bounded polytope) of feasible steady states.

::: example A stoichiometric matrix {#ex-stoich}
A toy network has five reactions: glucose uptake $v_1$ ($\emptyset \to A$), fermentation $v_2$ ($A \to 2\,\text{ATP}$), respiration $v_3$ ($A + 2\,\text{O}_2 \to 6\,\text{ATP}$), oxygen uptake $v_4$ ($\emptyset \to \text{O}_2$) and ATP consumption for growth and maintenance $v_5$ ($\text{ATP} \to \emptyset$). (The ATP yields are illustrative round numbers, not real yields per glucose.) Write $\mathbf{S}$ with rows (A, O₂, ATP), find the dimension of the null space and parametrise the steady-state fluxes.
::: solution
$$
\mathbf{S} = \begin{pmatrix} 1 & -1 & -1 & 0 & 0 \\ 0 & 0 & -2 & 1 & 0 \\ 0 & 2 & 6 & 0 & -1 \end{pmatrix}.
$$

The three rows are independent (each contains a column — $v_1$, $v_4$, $v_5$ — appearing in no other row), so $r = 3$ and the null space has dimension $5 - 3 = 2$. Choosing $v_2$ and $v_3$ as free variables, $\mathbf{S}\mathbf{v} = \mathbf{0}$ gives

$$
v_1 = v_2 + v_3, \qquad v_4 = 2v_3, \qquad v_5 = 2v_2 + 6v_3 .
$$

Every steady state is determined by how much A is fermented and how much respired. The ATP flux $v_5$ that the cell can use depends on that split.
:::
:::

### Conservation laws

The **left null space** of $\mathbf{S}$ — row vectors $\mathbf{l}$ with $\mathbf{l}\mathbf{S} = \mathbf{0}$ — gives conserved quantities: $d(\mathbf{l}\mathbf{x})/dt = \mathbf{l}\mathbf{S}\mathbf{v} = 0$ for any fluxes. In metabolism these are **conserved moieties**, chemical groups that are transferred between metabolites but neither made nor destroyed by the reactions in the network: the adenosine moiety of ATP + ADP + AMP, the nicotinamide of NAD⁺ + NADH, coenzyme A in its free and acylated forms. Conserved moieties couple pathways that share cofactors: every pathway that reduces NAD⁺ must be balanced by one that oxidises NADH.

## Flux balance analysis

Within the feasible flux space there are usually many possibilities. Flux balance analysis (FBA) picks one by assuming that the cell's fluxes are optimal for some biological objective.

::: definition Flux balance analysis {#def-fba}
**Flux balance analysis** finds a flux vector $\mathbf{v}$ that maximises a linear objective $Z = \mathbf{c}^\mathsf{T}\mathbf{v}$ subject to

$$
\mathbf{S}\mathbf{v} = \mathbf{0}, \qquad \mathbf{v}_\mathrm{min} \le \mathbf{v} \le \mathbf{v}_\mathrm{max}.
$$ {#eq-fba}

This is a **linear programme**. For growing microbes the usual objective is the flux through a **biomass reaction** that consumes amino acids, nucleotides, lipids, cofactors and ATP in the proportions measured for the cell's composition, so that $Z$ is the predicted growth rate. **Assumptions:** metabolic steady state; the stoichiometry is complete and correct; the bounds capture the relevant limits (nutrient uptake, oxygen, enzyme capacity); and the cell operates at the optimum of the chosen objective.
:::

Because the objective and constraints are linear, the optimum (if finite) is attained at a **vertex** of the feasible polytope, and efficient algorithms (the simplex and interior-point methods) solve problems with thousands of reactions in a fraction of a second. FBA requires no kinetic parameters: only stoichiometry, bounds and an objective. Its price is that it predicts fluxes, not concentrations, and that its predictions are only as good as the objective and the bounds.

::: proposition Optimal solutions lie on the boundary {#prop-vertex}
If the feasible set of [[#eq-fba]] is non-empty and bounded, the maximum of $\mathbf{c}^\mathsf{T}\mathbf{v}$ is attained at a vertex of the feasible polytope (and possibly along a whole edge or face, if the objective is parallel to it). At an optimal vertex, some constraints are **active** — fluxes at their bounds — and the **shadow price** of each active constraint is the rate at which the optimal objective would increase if that bound were relaxed by one unit.
:::

::: proof
The feasible set is the intersection of the affine subspace $\mathbf{S}\mathbf{v} = \mathbf{0}$ with a box, a bounded convex polytope, which is the convex hull of its finitely many vertices $\mathbf{w}_1, \dots, \mathbf{w}_k$. Any feasible $\mathbf{v}$ is a convex combination $\sum\lambda_i\mathbf{w}_i$ with $\lambda_i \ge 0$, $\sum\lambda_i = 1$, so $\mathbf{c}^\mathsf{T}\mathbf{v} = \sum\lambda_i\,\mathbf{c}^\mathsf{T}\mathbf{w}_i \le \max_i\mathbf{c}^\mathsf{T}\mathbf{w}_i$. The interpretation of shadow prices comes from linear-programming duality, which we do not develop here.
:::

::: example Respiration, fermentation and overflow {#ex-fba}
For the toy network of [[#ex-stoich]] with glucose uptake $v_1 \le 10$ and oxygen uptake $v_4 \le 12$ (in mmol per gram of dry weight per hour), and all fluxes non-negative, find the fluxes that maximise ATP production $v_5$. What changes if oxygen is limited to $v_4 \le 4$? What is the shadow price of oxygen?
::: solution
In terms of the free fluxes, the constraints are $v_2 + v_3 \le 10$, $2v_3 \le 12$ (so $v_3 \le 6$), $v_2, v_3 \ge 0$, and the objective is $v_5 = 2v_2 + 6v_3$. The feasible region is the quadrilateral with vertices $(v_2, v_3) = (0, 0)$, $(10, 0)$, $(4, 6)$ and $(0, 6)$, where $v_5$ takes the values 0, 20, 44 and 36. The optimum is $v_2 = 4$, $v_3 = 6$: respire as much as oxygen allows and **ferment the excess** glucose, giving $v_5 = 44$.

With $v_4 \le 4$, $v_3 \le 2$, the optimal vertex is $(8, 2)$ with $v_5 = 28$. Between these two cases, each extra unit of oxygen allows half a unit of A to be shifted from fermentation to respiration, gaining $\tfrac12(6 - 2) = 2$ units of ATP: the shadow price of oxygen is 2 ATP per O₂. Glucose has a shadow price of 2 (extra glucose can only be fermented), while the capacity of respiration is not limiting.

This "overflow" pattern — fermentation alongside respiration when the respiratory capacity is saturated — is seen in real cells: *E. coli* secretes acetate and budding yeast ethanol at high glucose uptake rates even in the presence of oxygen (in yeast, the **Crabtree effect**). In real cells the limit is usually not oxygen but the cost of making respiratory enzymes, and FBA models that include proteome or enzyme-capacity constraints reproduce overflow metabolism quantitatively.
:::
:::

::: widget plot
f: 10 - x; O; (Z - 2*x)/6
x: 0, 12
y: 0, 11
sliders: O=6:1:10:0.5; Z=30:0:70:1
labels: v_1 = v_2 + v_3 = 10\ \text{(glucose limit)}; v_3 = O\ \text{(oxygen limit, } v_4/2\text{)}; \text{objective } 2v_2 + 6v_3 = Z
caption: Flux balance analysis of the toy network in the plane of the two free fluxes, fermentation $v_2$ (horizontal) and respiration $v_3$ (vertical). The feasible region lies below both constraint lines and in the positive quadrant. The third line is a contour of the objective (ATP production $Z$). Increase $Z$ until the contour only just touches the feasible region: that corner is the optimum — with the default oxygen limit $O = 6$, at $(4, 6)$ with $Z = 44$. Lower the oxygen limit $O$ and the optimal corner slides right, towards more fermentation; raise it above 10 and glucose alone limits, so the optimum becomes pure respiration.
:::

The following program solves the toy problem by enumerating the vertices of the two-dimensional feasible region — a method that only works for tiny problems but shows what a linear-programming solver does. Real FBA uses solvers such as those in the COBRA toolboxes (COBRApy in Python).

```python
from itertools import combinations

# Toy network. Reactions (fluxes in mmol per gram dry weight per hour):
#   v1: -> A (glucose uptake)        v2: A -> 2 ATP (fermentation)
#   v3: A + 2 O2 -> 6 ATP (respiration)   v4: -> O2 (oxygen uptake)
#   v5: ATP -> (ATP use, the objective)
# Steady state S v = 0 leaves two free fluxes, v2 and v3:
#   v1 = v2 + v3,  v4 = 2 v3,  v5 = 2 v2 + 6 v3
def fluxes(v2, v3):
    return {"v1": v2 + v3, "v2": v2, "v3": v3, "v4": 2*v3, "v5": 2*v2 + 6*v3}

def fba(max_glc, max_o2, knockout=None):
    # constraints a*v2 + b*v3 <= c on the two free fluxes
    cons = [(1, 1, max_glc),        # v1 <= glucose limit
            (0, 2, max_o2),         # v4 <= oxygen limit
            (-1, 0, 0), (0, -1, 0)] # v2 >= 0, v3 >= 0
    if knockout == "v3":
        cons.append((0, 1, 0))      # v3 <= 0
    best = None
    for (a1, b1, c1), (a2, b2, c2) in combinations(cons, 2):
        det = a1*b2 - a2*b1
        if det == 0:
            continue
        v2 = (c1*b2 - c2*b1) / det + 0.0    # vertex = intersection of two lines
        v3 = (a1*c2 - a2*c1) / det + 0.0    # (+ 0.0 turns -0.0 into 0.0)
        if all(a*v2 + b*v3 <= c + 1e-9 for a, b, c in cons):
            f = fluxes(v2, v3)
            if best is None or f["v5"] > best["v5"]:
                best = f
    return best

print("wild type:      ", fba(10, 12))
print("low oxygen:     ", fba(10, 4))
print("no respiration: ", fba(10, 12, knockout="v3"))
# wild type:       {'v1': 10.0, 'v2': 4.0, 'v3': 6.0, 'v4': 12.0, 'v5': 44.0}
# low oxygen:      {'v1': 10.0, 'v2': 8.0, 'v3': 2.0, 'v4': 4.0, 'v5': 28.0}
# no respiration:  {'v1': 10.0, 'v2': 10.0, 'v3': 0.0, 'v4': 0.0, 'v5': 20.0}
```

### Gene knock-outs and essentiality

A gene deletion removes the reactions that depend on the gene's product, which in FBA means setting their fluxes to zero. If the maximal biomass flux falls to zero, the gene is predicted to be **essential** in that medium; if it falls partially, the deletion is predicted to slow growth. Jeremy Edwards and Bernhard Palsson tested such predictions for the *E. coli* MG1655 reconstruction in 2000 against published growth phenotypes of mutants and found that the large majority were predicted correctly. Wrong predictions are informative too: they point to missing reactions in the reconstruction, to regulatory constraints that FBA ignores, or to isozymes not annotated in the genome. In the toy network, deleting respiration cuts the ATP yield from 44 to 20 but does not abolish it, so the "gene" for $v_3$ would be predicted non-essential but important.

::: example Predicting a knock-out phenotype {#ex-knockout}
Extend the toy network so that ATP is used in two ways: a fixed maintenance demand of 4 mmol g⁻¹ h⁻¹, and growth, which consumes 50 mmol of ATP per gram of new biomass (illustrative values). Predict the growth rate of the wild type and of a mutant lacking respiration, with glucose limited to 10 and oxygen to 12 mmol g⁻¹ h⁻¹. Which constraint would you relax to rescue the mutant?
::: solution
Maximising growth is equivalent to maximising ATP production, since every ATP beyond maintenance goes to biomass: $\mu = (v_5 - 4)/50$ per hour. From [[#ex-fba]], the wild type makes $v_5 = 44$, so $\mu = 40/50 = 0.80$ h⁻¹ (a doubling time of $\ln 2/0.8 = 0.87$ h). The mutant can only ferment, $v_5 = 20$, so $\mu = 16/50 = 0.32$ h⁻¹, 40 % of the wild-type rate. The mutant's only active constraint is glucose uptake (shadow price 2 ATP per glucose, i.e. $2/50 = 0.04$ h⁻¹ of growth per unit of uptake): FBA predicts that it would benefit from a higher glucose uptake capacity, which is indeed how fermenting cells compensate — by consuming glucose much faster.
:::
:::

Gene–protein–reaction rules connect genes to reactions in genome-scale models: a reaction catalysed by a complex needs all its subunit genes (an AND rule), one catalysed by isozymes needs any of them (an OR rule). Double knock-outs of two isozymes can therefore be lethal when each single knock-out is harmless — **synthetic lethality**, which FBA predicts and which is used to search for drug targets in pathogens and combination targets in cancer cells.

::: warning "FBA predicts what the cell does"
FBA predicts what a cell *could* do if it optimised the chosen objective under the constraints given. Whether real cells are optimal is an empirical question. For *E. coli* growing on several carbon sources the predictions are good, and Rafael Ibarra, Jeremy Edwards and Bernhard Palsson showed in 2002 that a strain initially growing sub-optimally on glycerol evolved, over about 40 days of selection for growth, to the growth rate and uptake rates predicted by FBA. But cells that have not been selected under the conditions studied, cells whose objective is not growth (non-dividing tissue cells, cells under stress), and engineered strains are often far from the FBA optimum. Moreover, the FBA optimum is often not unique: many flux distributions may give the same objective value, and **flux variability analysis**, which finds the range of each flux compatible with near-optimal growth, should be reported alongside a single solution.
:::

::: application Metabolic engineering and drug targets
Genome-scale models guide the engineering of microbes to make fuels, chemicals and pharmaceuticals ([[biotechnology/metabolic-engineering]]). Algorithms such as OptKnock (Anthony Burgard, Priti Pharkya and Costas Maranas, 2003) search for gene deletions that force a microbe to secrete a desired product as an obligatory by-product of growth, so that evolution for faster growth also increases production. In microbiology, models of pathogens such as *Mycobacterium tuberculosis* are used to predict essential metabolic genes as candidate drug targets, and models of human cell types to understand inborn errors of metabolism; the clinical side is treated in Medicine Atlas.
:::

## Metabolic control analysis

FBA treats fluxes as decision variables constrained by stoichiometry. Metabolic control analysis (MCA) asks how the actual flux through a pathway, determined by enzyme kinetics, depends on the amount of each enzyme.

::: definition Control and elasticity coefficients {#def-mca}
For a pathway at steady state with flux $J$, the **flux control coefficient** of enzyme $i$ is

$$
C^J_i = \frac{\partial\ln J}{\partial\ln e_i},
$$ {#eq-control-coefficient}

the fractional change in steady-state flux per fractional change in the concentration (or activity) $e_i$ of that enzyme, all else being equal. The **elasticity** of the rate $v_i$ of enzyme $i$ with respect to a metabolite $X$ is

$$
\varepsilon^{v_i}_X = \frac{\partial\ln v_i}{\partial\ln[X]},
$$ {#eq-elasticity}

a local property of the isolated enzyme: its rate's sensitivity to its substrate (positive), product or other effectors (negative for inhibitors), with all other concentrations held fixed.
:::

Control coefficients are **systemic** properties: they depend on the whole pathway. Elasticities are **local** properties of individual enzymes and can, in principle, be computed from their rate laws. For a Michaelis–Menten enzyme, $\varepsilon^v_S = K_\mathrm{m}/(K_\mathrm{m} + [S])$ (compare [[systems-biology/signalling-robustness]]): near 1 when the enzyme is unsaturated and near 0 when it is saturated. The remarkable results of MCA relate the two.

::: theorem Summation and connectivity theorems {#thm-mca}
For a metabolic pathway at steady state, in which each enzyme's rate is proportional to its own concentration,

$$
\sum_i C^J_i = 1 \qquad \text{(summation theorem)},
$$ {#eq-summation}

and for every internal metabolite $X$,

$$
\sum_i C^J_i\,\varepsilon^{v_i}_X = 0 \qquad \text{(connectivity theorem)}.
$$ {#eq-connectivity}
:::

::: proof
*Summation.* Multiply every enzyme concentration by the same factor $1 + \delta$. Since each rate is proportional to its enzyme, all rates are multiplied by $1 + \delta$ at the old metabolite concentrations, so the old concentrations remain a steady state and the flux is multiplied by $1 + \delta$. Hence $\delta\ln J = \delta = \sum_i C^J_i\,\delta\ln e_i = \delta\sum_i C^J_i$, which gives [[#eq-summation]].

*Connectivity.* Perturb every enzyme at once by $\delta\ln e_i = -\varepsilon^{v_i}_X\,\delta$, for a small $\delta$. Consider the state in which $\ln[X]$ is raised by $\delta$ and every other metabolite is unchanged. In that state each rate changes by $\delta\ln v_i = \delta\ln e_i + \varepsilon^{v_i}_X\,\delta = 0$: every rate is exactly as before, so every mass balance still holds and the state is a steady state of the perturbed system — the steady state it reaches, if steady states are unique. Its flux is unchanged. But the flux change caused by the enzyme perturbations is, by the definition of control coefficients, $\delta\ln J = \sum_i C^J_i\,\delta\ln e_i = -\delta\sum_i C^J_i\varepsilon^{v_i}_X$. Since this must be zero, [[#eq-connectivity]] follows.
:::

The summation theorem was derived by Henrik Kacser and James Burns in 1973 and by Reinhart Heinrich and Tom Rapoport in 1974. It has a striking implication: **control is shared**. If one enzyme had a control coefficient of 1 — a true rate-limiting step — all the others would together have control 0. That is possible, but it is a special case, not the rule.

::: proposition Control in a two-enzyme pathway {#prop-two-enzyme}
For a pathway $S_0 \xrightarrow{e_1} X \xrightarrow{e_2} P$ with fixed $S_0$ and $P$, let $\varepsilon_1 = \varepsilon^{v_1}_X$ (usually negative: product inhibition or reversibility) and $\varepsilon_2 = \varepsilon^{v_2}_X$ (positive). Then

$$
C^J_1 = \frac{\varepsilon_2}{\varepsilon_2 - \varepsilon_1}, \qquad C^J_2 = \frac{-\varepsilon_1}{\varepsilon_2 - \varepsilon_1}.
$$ {#eq-two-enzyme}

An enzyme has a large share of control when the *other* enzyme's elasticity towards the intermediate is large, so that the other enzyme readily accommodates changes; a saturated downstream enzyme ($\varepsilon_2 \approx 0$) takes nearly all the control.
:::

::: proof
The two equations [[#eq-summation]] and [[#eq-connectivity]] read $C_1 + C_2 = 1$ and $C_1\varepsilon_1 + C_2\varepsilon_2 = 0$. Solving: $C_2 = -C_1\varepsilon_1/\varepsilon_2$, so $C_1(1 - \varepsilon_1/\varepsilon_2) = 1$ and $C_1 = \varepsilon_2/(\varepsilon_2 - \varepsilon_1)$; then $C_2 = 1 - C_1 = -\varepsilon_1/(\varepsilon_2 - \varepsilon_1)$.
:::

::: example Who controls the flux? {#ex-mca}
(a) In a two-enzyme pathway, the first enzyme is moderately inhibited by the intermediate ($\varepsilon_1 = -0.5$) and the second is half-saturated ($\varepsilon_2 = 0.5$). Find the control coefficients. (b) Now the first enzyme is strongly product-inhibited ($\varepsilon_1 = -1$) and the second nearly saturated ($\varepsilon_2 = 0.1$). (c) In case (b), by how much would a twofold overexpression of the first enzyme increase the flux, approximately?
::: solution
(a) $C_1 = 0.5/(0.5 + 0.5) = 0.5$ and $C_2 = 0.5$: control is shared equally.

(b) $C_1 = 0.1/(0.1 + 1) = 0.091$ and $C_2 = 1/1.1 = 0.909$. The saturated second enzyme cannot speed up when the intermediate accumulates, so it dominates control; the first enzyme, strongly inhibited by its product, has little.

(c) A twofold increase is a change of $\ln 2 = 0.69$ in $\ln e_1$, giving $\Delta\ln J \approx 0.091\times0.69 = 0.063$, about a 6.5 % increase in flux. (For a change this large, control coefficients — which are local derivatives — give only an estimate, and in practice the effect is usually even smaller, since control coefficients fall as an enzyme is overexpressed.)
:::
:::

::: warning "Every pathway has a rate-limiting step"
The textbook notion of a single rate-limiting enzyme — often the first committed step, or an enzyme with a large free-energy drop — implies that overexpressing it should increase the flux proportionally. Measured flux control coefficients are rarely close to 1; control is usually distributed, and it shifts with conditions. Overexpressing the classic "rate-limiting" enzyme of glycolysis, phosphofructokinase, in yeast produced little or no increase in glycolytic flux (Schaaff, Heinisch and Zimmermann, 1989). The lesson for metabolic engineering is that increasing the flux through a pathway generally requires increasing several enzymes together — or reducing the demand-side constraints — rather than one.
:::

::: intuition Supply and demand
Jan-Hendrik Hofmeyr and Athel Cornish-Bowden suggested viewing a pathway as a supply block and a demand block linked by an intermediate. If the demand is elastic — it takes whatever is supplied — the supply controls the flux; if the supply is elastic — it delivers whatever is demanded — the demand controls it. In many cells the demand for ATP and biosynthetic precursors sets the pace, and the supply pathways (glycolysis, for example) are regulated mainly to keep the intermediate concentrations steady, which is why their enzymes have small flux control coefficients but large effects on metabolite concentrations.
:::

::: quiz
In a linear pathway of five enzymes, four have measured flux control coefficients of 0.1, 0.05, 0.15 and 0.2. What does the summation theorem predict for the fifth, and what would happen to the flux if the fifth enzyme's concentration were increased by 1 %?
- [ ] 0.1; the flux would increase by 0.1 %
- [x] 0.5; the flux would increase by about 0.5 %
- [ ] 1; the flux would increase by 1 %
- [ ] It cannot be determined without knowing the elasticities
::: solution
The control coefficients sum to 1, so the fifth is $1 - (0.1 + 0.05 + 0.15 + 0.2) = 0.5$. A 1 % increase in its concentration increases the flux by about $0.5\times1\% = 0.5\%$. It has the largest share of control, but even so, doubling it would not double the flux.
:::
:::

::: history
Constraint-based thinking about metabolism grew from stoichiometric analyses in the 1980s, including David Fell and Jeremy Small's 1986 linear-programming analysis of fat synthesis in adipose tissue. Amit Varma and Bernhard Palsson showed in 1994 that flux balance analysis of *E. coli* predicted the secretion of acetate at high glucose uptake rates, and the first genome-scale reconstruction was published by Jeremy Edwards and Palsson in 1999 for *Haemophilus influenzae*, the first free-living organism to have its genome sequenced (in 1995). Metabolic control analysis has older roots: Henrik Kacser and James Burns's "The control of flux" (1973) and Heinrich and Rapoport's linear theory of enzymatic chains (1974) both replaced the idea of a rate-limiting step with distributed control coefficients and proved the summation theorem. Later work extended MCA to branched pathways, signalling and gene expression ("hierarchical control analysis"), and in 2010 Jeffrey Orth, Ines Thiele and Bernhard Palsson's short primer "What is flux balance analysis?" made the method widely accessible.
:::

::: summary
- Mass balance $d\mathbf{x}/dt = \mathbf{S}\mathbf{v}$ separates fixed stoichiometry from unknown kinetics; at metabolic steady state $\mathbf{S}\mathbf{v} = \mathbf{0}$, so feasible fluxes lie in the null space of $\mathbf{S}$, restricted by irreversibility and capacity bounds.
- The left null space gives conserved moieties (adenylates, NAD(H), CoA).
- FBA maximises a linear objective (usually biomass) over the feasible polytope by linear programming; optima are at vertices, and shadow prices give the value of relaxing each active constraint.
- FBA predicts growth yields, by-product secretion (overflow metabolism), essential genes and synthetic lethality; it assumes optimality, which must be tested.
- Metabolic control analysis defines flux control coefficients $C^J_i = \partial\ln J/\partial\ln e_i$ and elasticities; control coefficients sum to 1 and satisfy the connectivity theorem $\sum C^J_i\varepsilon^{v_i}_X = 0$.
- Control is usually shared; in a two-enzyme pathway $C_1 = \varepsilon_2/(\varepsilon_2 - \varepsilon_1)$, so saturated downstream enzymes take control. Single "rate-limiting steps" are the exception.
:::

## Exercises

::: exercise Dimension of the flux space {level=1 check="4"}
A network has 12 reactions and 9 metabolites, and its stoichiometric matrix has rank 8. What is the dimension of its space of steady-state fluxes (before bounds are applied)?
::: solution
$n - r = 12 - 8 = 4$.
:::
:::

::: exercise Summation theorem {level=1 check="0.35"}
In a three-enzyme pathway, $C^J_1 = 0.4$ and $C^J_2 = 0.25$. What is $C^J_3$?
::: solution
$1 - 0.4 - 0.25 = 0.35$.
:::
:::

::: exercise Michaelis–Menten elasticity {level=1 check="0.2"}
An enzyme with $K_\mathrm{m} = 1$ mM acts on its substrate at 4 mM. What is its elasticity with respect to substrate (ignoring product effects)?
::: solution
$\varepsilon = K_\mathrm{m}/(K_\mathrm{m} + [S]) = 1/5 = 0.2$.
:::
:::

::: exercise A conserved moiety {level=2}
In a network containing the reactions $\text{ATP} + \text{G} \to \text{ADP} + \text{G6P}$, $\text{ADP} + \text{PEP} \to \text{ATP} + \text{Pyr}$ and $2\,\text{ADP} \to \text{ATP} + \text{AMP}$, show that $[\text{ATP}] + [\text{ADP}] + [\text{AMP}]$ is conserved.
::: solution
Take $\mathbf{l}$ with entries 1 for ATP, ADP and AMP and 0 for the other metabolites. For the first reaction, $\mathbf{l}$ times its column is $-1 + 1 = 0$; for the second, $-1 + 1 = 0$; for the third, $-2 + 1 + 1 = 0$. So $\mathbf{l}\mathbf{S} = \mathbf{0}$ and the total adenylate pool $\mathbf{l}\mathbf{x}$ is constant, whatever the fluxes. (Synthesis and degradation of adenine nucleotides, omitted here, would change it on a slower time scale.)
:::
:::

::: exercise An FBA by hand {level=2 check="36"}
In the toy network of [[#ex-fba]], the glucose limit is lowered to $v_1 \le 6$, with oxygen still limited to $v_4 \le 12$. What is the maximal ATP flux?
::: solution
Now $v_2 + v_3 \le 6$ and $v_3 \le 6$, so the vertices are $(0, 0)$, $(6, 0)$ and $(0, 6)$, with objective values 0, 12 and 36. The optimum is pure respiration, $v_3 = 6$, $v_2 = 0$, with $v_5 = 36$ and all the oxygen used. Glucose is now limiting and there is no overflow.
:::
:::

::: exercise Two isozymes {level=2}
A reaction essential for growth is catalysed by either of two isozymes encoded by genes *a* and *b*. Write the gene–protein–reaction rule and predict the FBA phenotypes of the single and double deletions. How might a real experiment contradict the prediction for the single deletions?
::: solution
The rule is "*a* OR *b*". Each single deletion leaves the reaction available, so FBA predicts no effect on growth; the double deletion removes the reaction and is predicted lethal (synthetic lethality). A real single deletion could slow growth if one isozyme is expressed at too low a level, or is regulated differently, to carry the required flux — information that pure FBA, without enzyme-capacity or regulatory constraints, does not contain.
:::
:::

::: exercise Control from elasticities {level=2}
In a two-enzyme pathway, $\varepsilon_1 = -0.2$ and $\varepsilon_2 = 0.8$. Find both control coefficients and say which enzyme you would overexpress to raise the flux.
::: solution
$C_1 = 0.8/(0.8 + 0.2) = 0.8$, $C_2 = 0.2/1.0 = 0.2$. The first enzyme, only weakly inhibited by its product while the second responds readily to the intermediate, has most control; overexpressing it is more effective (a 10 % increase gives about 8 % more flux).
:::
:::

::: exercise Interpreting flux data {level=3}
${}^{13}$C-labelling experiments measure the intracellular fluxes of a bacterial strain growing on glucose and find substantial acetate secretion and a growth rate 20 % below the FBA prediction for maximal biomass yield. Give three possible explanations and say how each could be tested.
::: solution
(i) The cell is not optimising biomass yield but growth *rate* under a constraint FBA omitted, such as the proteome cost of respiratory enzymes: overflow metabolism can be faster per unit of enzyme even though it wastes carbon. Test by adding an enzyme-capacity constraint to the model and seeing whether it predicts acetate secretion, or by measuring proteome allocation at different growth rates. (ii) The strain has not been selected under these conditions and is sub-optimal; test by adaptive laboratory evolution and seeing whether growth approaches the prediction (as in Ibarra and colleagues' glycerol experiments). (iii) The reconstruction or biomass composition is wrong — for example, missing maintenance ATP costs or an incorrect biomass composition; test by measuring the biomass composition and non-growth-associated maintenance and re-fitting.
:::
:::

::: exercise A branch point {level=3}
Glucose 6-phosphate (G6P) is split between glycolysis (flux $J_g$) and the oxidative pentose phosphate pathway (flux $J_p$), which produces NADPH. The cell needs NADPH at a fixed rate $D$ for biosynthesis, with 2 NADPH per G6P entering the pentose pathway, and the total glucose uptake is $U$. Write the steady-state flux balances and find $J_p$ and $J_g$. What happens if $D > 2U$? Relate this to the use of flux balance as a feasibility test.
::: solution
Balances: G6P: $U = J_g + J_p$; NADPH: $2J_p = D$. Hence $J_p = D/2$ and $J_g = U - D/2$. If $D > 2U$ then $J_g < 0$, which is infeasible if glycolysis cannot run backwards from this point (or requires a separate gluconeogenic reaction and energy): the NADPH demand cannot be met from glucose by this route alone. In FBA such a case would make the problem infeasible, showing that the network as written cannot support the stated demand — prompting the search for other NADPH sources (transhydrogenases, malic enzyme, isocitrate dehydrogenase), which is exactly how stoichiometric analysis reveals gaps in a reconstruction.
:::
:::
