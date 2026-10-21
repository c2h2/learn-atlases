A bottle of bromine left on a bench dries out and the room fills with red vapour; the same bromine in a stoppered bottle leaves the liquid almost unchanged and the space above it quickly turns a steady shade of red. Nothing about the molecules has changed — only whether they could escape. That single observation contains the whole idea of this chapter: in a closed container, processes do not stop, they are *balanced*. The liquid evaporates and the vapour condenses at the same rate, so the colour — the pressure, the concentration, every macroscopic sign of change — holds still while both processes run on undiminished. Chemical reactions behave the same way: almost every reaction is a two-way street, and what we call "the end of a reaction" is usually the state at which forward and reverse proceed in lockstep. **Chemical equilibrium** is that state, and the equilibrium constant is the single number that tells you where it lies — how much reactant is left, how much product is made, and which way a mixture will move when you disturb it. This chapter builds the quantitative machinery: the law of mass action, the reaction quotient, the ICE table, and Le Chatelier's principle.

## Dynamic equilibrium

::: definition Dynamic equilibrium {#def-dynamic-equilibrium}
A reaction is in **chemical equilibrium** when its forward and reverse processes occur at equal rates, so that the composition of the mixture no longer changes with time. The state is **dynamic**, not static: molecules react in both directions at every moment, but each event in one direction is matched, on average, by an event in the other. Equilibrium is reached from either side — starting with pure reactants or pure products, the same equilibrium composition is approached (at fixed temperature and volume) — and it is characterised by constancy of macroscopic properties, not by the absence of change.
:::

The distinction between "rates equal" and "concentrations equal" is the single most important idea in this chapter, and it is worth pausing on. Consider dinitrogen tetroxide, the colourless gas that dissociates into brown nitrogen dioxide, $\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$. Inject pure $\mathrm{N_2O_4}$ into a sealed flask and the brown colour grows, then stops growing; inject pure $\mathrm{NO_2}$ and the colour fades, then stops fading. Both flasks end at the *same* mixture — but that mixture is not half-and-half: at $\mathrm{298\,K}$ and ordinary pressures it is overwhelmingly $\mathrm{N_2O_4}$, because the equilibrium lies far to the left. The rates of dissociation and recombination are equal there; the concentrations are not, and there is no reason they should be. Two processes can balance at unequal levels, the way a market can clear with more buyers than sellers if each buyer buys more.

::: quiz
At equilibrium, which statement is correct?
- [x] The forward and reverse reactions continue at equal rates, so concentrations stay constant without being equal to one another.
- [ ] The reaction has stopped, because the concentrations no longer change.
- [ ] The concentrations of reactants and products are equal.
- [ ] The reaction must have gone to completion if the mixture no longer changes.
::: solution
Equilibrium is dynamic: both reactions run on, at equal rates, which is why the composition is frozen but not frozen solid. Equal rates do not imply equal concentrations — the ratio of concentrations is fixed by the equilibrium constant, which is rarely one. And a mixture that "no longer changes" has completed only in the sense of having reached its endpoint of *change*, not of reaction: how far it went is exactly what $K$ measures.
:::
:::

The evidence that the processes continue is direct. Put isotopically labelled $\mathrm{^{15}N}$-nitrogen dioxide into an equilibrium mixture and the label spreads through the $\mathrm{N_2O_4}$ as well, with no change in the overall composition: the reaction is running, it is just running equally both ways. A saturated solution of an ionic solid in contact with the crystals shows the same thing — the solid exchanges ions with the solution continuously (measurable by tracer methods) while the crystal mass stays constant.

## The equilibrium constant

::: proposition The law of mass action {#prop-mass-action}
For a reversible reaction at equilibrium in a single phase, $\sum_i \nu_i\,\mathrm{A_i} = 0$ with products carrying positive coefficients, the **equilibrium constant** is the product of the equilibrium concentrations (or, for gases, partial pressures) of the species involved, each raised to the power of its stoichiometric coefficient, products over reactants:
$$
\mathrm{a\,A + b\,B \rightleftharpoons c\,C + d\,D}
\qquad
K_\mathrm{c} = \frac{[\mathrm{C}]_\mathrm{eq}^{c}\,[\mathrm{D}]_\mathrm{eq}^{d}}{[\mathrm{A}]_\mathrm{eq}^{a}\,[\mathrm{B}]_\mathrm{eq}^{b}}.
$$
Two mixtures at the same temperature have the same $K_\mathrm{c}$ however they were prepared: $K$ depends on temperature alone (for an ideal mixture), not on starting amounts, pressure, or catalysts. The law of mass action is an **empirical law** — it is summarised from experiment and will receive its deep justification from free energy in [[general-chemistry-2/entropy-free-energy]].
:::

Written strictly, each concentration in $K_\mathrm{c}$ is a *relative* concentration $[\mathrm{X}]/c^\circ$ with $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$, and each pressure a relative pressure $p/p^\circ$ with $p^\circ = 1\ \mathrm{bar}$; the equilibrium constant is then a pure number, without units. First-year practice is to insert concentrations in $\mathrm{mol\,dm^{-3}}$ and pressures in bar and quote $K$ as if it carried matching units; you should know that this is bookkeeping, and that comparing two equilibrium constants only makes sense when both are built the same way.

Why should $K$ be a ratio of rate constants? For a *single elementary step* the connection is immediate, and the argument is worth seeing precisely because it shows how far it reaches — and where it breaks.

::: proof $K$ as a ratio of rate constants (one-step case) {#proof-k-ratio}
Suppose $\mathrm{A \rightleftharpoons B}$ is a single elementary step with forward rate constant $k_\mathrm{f}$ and reverse $k_\mathrm{r}$. The net rate of formation of B is $k_\mathrm{f}[\mathrm{A}] - k_\mathrm{r}[\mathrm{B}]$, and at equilibrium it vanishes:
$$
k_\mathrm{f}[\mathrm{A}]_\mathrm{eq} = k_\mathrm{r}[\mathrm{B}]_\mathrm{eq}
\qquad\Longrightarrow\qquad
K_\mathrm{c} = \frac{[\mathrm{B}]_\mathrm{eq}}{[\mathrm{A}]_\mathrm{eq}} = \frac{k_\mathrm{f}}{k_\mathrm{r}}.
$$
A large $K$ means the forward step outruns the reverse at equal concentrations — the equilibrium favours products. If forward and reverse have activation energies $E_\mathrm{f}$ and $E_\mathrm{r}$, then $k_\mathrm{f}/k_\mathrm{r} = (A_\mathrm{f}/A_\mathrm{r})\,e^{-(E_\mathrm{f}-E_\mathrm{r})/RT}$, so the temperature dependence of $K$ is governed by the *difference* of the barriers, which is the reaction energy: exothermic reactions have $K$ falling with temperature.

The argument, however, used the rate law of an elementary step. For a multistep reaction the observed rate laws are not the mass-action forms read off the overall equation (the hydrogen–bromine reaction of [[general-chemistry-2/rates-intro]] is the standard counterexample), so "equilibrium constant equals ratio of forward and reverse rate constants" is a *heuristic* in general, not a proof. The general truth — that at equilibrium the composition is fixed by thermodynamics, and that a catalyst, which multiplies $k_\mathrm{f}$ and $k_\mathrm{r}$ by the same factor, cannot change $K$ — survives, but its justification is the free energy, not the rate law.
:::

::: definition Heterogeneous equilibria {#def-heterogeneous}
An equilibrium is **heterogeneous** when it involves more than one phase. The concentrations of pure condensed phases — a pure solid, or a liquid solvent in dilute solution — are fixed by their own densities and do not respond to how much of the phase is present, so they are absorbed into the constant and **do not appear** in the equilibrium expression. For the decomposition of limestone,
$$
\mathrm{CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)}
\qquad
K_\mathrm{p} = p_\mathrm{eq}(\mathrm{CO_2})/p^\circ,
$$
the pressure of carbon dioxide at equilibrium is fixed by temperature alone: add more chalk, add more lime, and nothing moves, provided both solids remain.
:::

For gases it is more natural to write the constant in partial pressures. The two forms are related by the ideal gas law.

::: proposition Converting $K_\mathrm{c}$ and $K_\mathrm{p}$ {#prop-kp-kc}
For a gas-phase reaction with $\Delta n$ the change in the number of gas molecules (products minus reactants),
$$
K_\mathrm{p} = K_\mathrm{c}\,(RT)^{\Delta n},
$$
where $R = 0.08314\ \mathrm{L\,bar\,K^{-1}\,mol^{-1}}$ if pressures are in bar and concentrations in $\mathrm{mol\,dm^{-3}}$. When $\Delta n = 0$ the two constants are equal.
:::

::: proof The $K_\mathrm{p} = K_\mathrm{c}(RT)^{\Delta n}$ relation {#proof-kp-kc}
For an ideal gas the partial pressure and the concentration are tied by $p_i V = n_i RT$, i.e. $p_i = [\mathrm{i}]\,RT$. Substitute into the pressure-form constant:
$$
K_\mathrm{p} = \prod_i (p_i)^{\nu_i} = \prod_i \big([\mathrm{i}]\,RT\big)^{\nu_i} = \left(\prod_i [\mathrm{i}]^{\nu_i}\right)(RT)^{\sum_i \nu_i} = K_\mathrm{c}\,(RT)^{\Delta n},
$$
because $\sum_i \nu_i$ is exactly the change in the number of gas molecules from reactants to products. For $\mathrm{N_2(g) + 3\,H_2(g) \rightleftharpoons 2\,NH_3(g)}$, $\Delta n = 2 - 4 = -2$, and $K_\mathrm{p} = K_\mathrm{c}(RT)^{-2}$: the two constants differ by a factor $(RT)^2 \approx 614$ at $\mathrm{298\,K}$.
:::

::: example Writing equilibrium expressions {#ex-equilibrium-expressions}
Write $K_\mathrm{c}$ for (a) $\mathrm{N_2(g) + 3\,H_2(g) \rightleftharpoons 2\,NH_3(g)}$; (b) $\mathrm{CH_3CO_2H(aq) + H_2O(l) \rightleftharpoons CH_3CO_2^-(aq) + H_3O^+(aq)}$; (c) $\mathrm{AgCl(s) \rightleftharpoons Ag^+(aq) + Cl^-(aq)}$; and state how each changes if the equation is written in reverse.
::: solution
(a) $K_\mathrm{c} = [\mathrm{NH_3}]^2/([\mathrm{N_2}][\mathrm{H_2}]^3)$ — all species are gases and all appear. (b) $K_\mathrm{c} = [\mathrm{CH_3CO_2^-}][\mathrm{H_3O^+}]/[\mathrm{CH_3CO_2H}]$: the water is the liquid solvent of a dilute solution, so its (essentially constant) concentration is absorbed into the constant — this is why acid strengths are tabulated as $K_\mathrm{a}$ without a water term. (c) $K_\mathrm{sp} = [\mathrm{Ag^+}][\mathrm{Cl^-}]$: the only condensed phase is the solid $\mathrm{AgCl}$, which does not appear; the constant is the **solubility product** taken up in [[general-chemistry-2/solubility-equilibria]]. Reversing any equation inverts the constant: for (a) written as $2\,\mathrm{NH_3} \rightleftharpoons \mathrm{N_2} + 3\,\mathrm{H_2}$, $K' = 1/K_\mathrm{c}$.
:::
:::

::: example $K_\mathrm{p}$ and $K_\mathrm{c}$ for dinitrogen tetroxide {#ex-kp-kc-n2o4}
For $\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$ at $\mathrm{298\,K}$, standard free energies of formation ($\Delta_\mathrm{f}G^\circ$: $\mathrm{NO_2}$, $+51.31$; $\mathrm{N_2O_4}$, $+97.89\ \mathrm{kJ\,mol^{-1}}$, standard tabulated data) give $K_\mathrm{p} = 0.148$. Find $K_\mathrm{c}$ at the same temperature.
::: solution
Here $\Delta n = 2 - 1 = +1$, so $K_\mathrm{p} = K_\mathrm{c}\,RT$ and
$$
K_\mathrm{c} = \frac{K_\mathrm{p}}{RT} = \frac{0.148}{0.08314 \times 298.15} = \frac{0.148}{24.79} = 5.98\times10^{-3}.
$$
The numerical difference is not a contradiction: $K_\mathrm{p}$ counts molecules through pressures and $K_\mathrm{c}$ through concentrations, and at $\mathrm{298\,K}$ one $\mathrm{mol\,dm^{-3}}$ corresponds to about $24.8\ \mathrm{bar}$. Because $\Delta n = +1$, dissociation *increases* the number of molecules, and the concentration-form constant is the smaller of the pair.
:::
:::

::: widget odesolver
f: 0.5 - 1.5*y
y0: 1
t: 0, 6
exact: 1/3 + 2/3*exp(-1.5*t)
caption: The approach to equilibrium for a reversible first-order pair $\mathrm{A \rightleftharpoons B}$ with $k_\mathrm{f} = 1$ and $k_\mathrm{r} = 0.5$ (in reciprocal time units), starting from pure A. The rate of change of $y = [\mathrm{A}]$ is $-k_\mathrm{f}y + k_\mathrm{r}(1-y)$: the net rate is not zero until $y$ falls to $k_\mathrm{r}/(k_\mathrm{f}+k_\mathrm{r}) = 1/3$, the equilibrium value, and it approaches that value exponentially with rate constant $k_\mathrm{f}+k_\mathrm{r}$. Equilibrium is an *attractor*: the system relaxes to it from either side, and the relaxation rate is the sum of the two rate constants — faster in both directions than either reaction alone.
:::

## The reaction quotient and ICE tables

The constant tells you where equilibrium lies; you need one more quantity to know which way a given mixture will run.

::: definition Reaction quotient {#def-reaction-quotient}
The **reaction quotient** $Q$ is the mass-action expression evaluated at the *current* concentrations or pressures rather than at equilibrium: for $\mathrm{a\,A + b\,B \rightleftharpoons c\,C + d\,D}$,
$$
Q_\mathrm{c} = \frac{[\mathrm{C}]^c[\mathrm{D}]^d}{[\mathrm{A}]^a[\mathrm{B}]^b}\quad(\text{as written, at this instant}).
$$
If $Q < K$, the numerator is too small: the mixture moves **forward** (net product formation) until $Q$ rises to $K$. If $Q > K$ it moves **backward**. If $Q = K$ the mixture is at equilibrium. $Q$ has the same form as $K$ and the same conventions about pure phases; unlike $K$ it changes as the reaction runs.
:::

::: example Which way does it go? {#ex-direction-hi}
For $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$ at a certain temperature $K_\mathrm{c} = 50.5$. An analysis of a mixture finds $[\mathrm{H_2}] = [\mathrm{I_2}] = 0.10$ and $[\mathrm{HI}] = 0.40\ \mathrm{mol\,dm^{-3}}$. Is it at equilibrium, and if not which way does it move?
::: solution
$$
Q_\mathrm{c} = \frac{(0.40)^2}{(0.10)(0.10)} = \frac{0.16}{0.010} = 16 < 50.5 = K_\mathrm{c}.
$$
Not at equilibrium: $Q < K$, so the numerator must grow — the mixture moves **forward**, consuming $\mathrm{H_2}$ and $\mathrm{I_2}$ and forming HI, until $Q$ climbs to $50.5$. Note that the comparison is dimensionless-by-construction: $Q$ and $K$ are evaluated the same way, so their ratio is meaningful even though the raw numbers carry the bookkeeping units of $\mathrm{mol\,dm^{-3}}$ expressions.
:::
:::

The workhorse of equilibrium calculation is a bookkeeping table.

::: algorithm The ICE table {#alg-ice}
**Input:** a balanced equation, $K$ at the temperature of interest, and the initial amounts. **Output:** the equilibrium composition.
1. Set up three rows — **I**nitial, **C**hange, **E**quilibrium — and columns for each species, in concentrations or partial pressures.
2. Enter the initial values; products usually start at zero unless told otherwise.
3. Write the change using the stoichiometric coefficients: if the reaction advances by $x$, species change by $\nu\,x$ (reactants $-a\,x$, products $+c\,x$). Never write the change without the coefficient.
4. Form the $E$ row by adding, substitute into the equilibrium expression, and solve for $x$.
5. If the equation is quadratic, use the quadratic formula; if it is a perfect square (common when $\Delta n = 0$ and the initial products are zero), take the square root of both sides.
6. **Check the answer**: every equilibrium concentration must lie between its initial value and its limit of complete reaction; substitute back into the equilibrium expression and recover $K$; and if you used the small-$x$ approximation, test it (below).
:::

::: example A quadratic ICE problem: $\mathrm{N_2O_4}$ at $\mathrm{373\,K}$ {#ex-n2o4-373}
$\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$ has $\Delta_\mathrm{r}H^\circ = +57.2\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = +175.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (standard tabulated data), giving $K_\mathrm{p} \approx 15$ at $\mathrm{373\,K}$. A flask is charged with pure $\mathrm{N_2O_4}$ to $1.00\ \mathrm{bar}$ and held at $\mathrm{373\,K}$. Find the equilibrium partial pressures and the degree of dissociation.
::: solution
With $x$ bar of $\mathrm{N_2O_4}$ dissociated:

| | $\mathrm{N_2O_4}$ | $\mathrm{NO_2}$ |
|---|---|---|
| I / bar | $1.00$ | $0$ |
| C / bar | $-x$ | $+2x$ |
| E / bar | $1.00 - x$ | $2x$ |

$$
K_\mathrm{p} = \frac{(2x)^2}{1.00 - x} = 15
\qquad\Longrightarrow\qquad
4x^2 + 15x - 15 = 0
\qquad\Longrightarrow\qquad
x = \frac{-15 + \sqrt{225 + 240}}{8} = 0.820 .
$$
So $p(\mathrm{N_2O_4}) = 0.18\ \mathrm{bar}$, $p(\mathrm{NO_2}) = 1.64\ \mathrm{bar}$, and the total pressure has risen from $1.00$ to $1.82\ \mathrm{bar}$ — dissociation makes molecules, and a manometer would see it. The degree of dissociation is $82\ \%$. Check: $1.64^2/0.18 = 14.9 \approx 15$. The negative root of the quadratic is rejected because it would make $p(\mathrm{NO_2})$ negative — mathematics offers, chemistry chooses.
:::
:::

::: example A perfect square: $\mathrm{H_2 + I_2}$ at $\mathrm{448\,K}$ {#ex-hi-square}
For $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$, $K_\mathrm{c} = 50.5$ at $\mathrm{448\,K}$ (a standard tabulated value). Equal concentrations $0.500$ and $0.500\ \mathrm{mol\,dm^{-3}}$ of the elements are mixed at that temperature. Find the equilibrium composition.
::: solution

| | $\mathrm{H_2}$ | $\mathrm{I_2}$ | $\mathrm{HI}$ |
|---|---|---|---|
| I | $0.500$ | $0.500$ | $0$ |
| C | $-x$ | $-x$ | $+2x$ |
| E | $0.500 - x$ | $0.500 - x$ | $2x$ |

Because $\Delta n = 0$ and the two reactants start equal, the denominator is a perfect square and no quadratic is needed:
$$
\frac{(2x)^2}{(0.500 - x)^2} = 50.5
\qquad\Longrightarrow\qquad
\frac{2x}{0.500 - x} = \sqrt{50.5} = 7.106
\qquad\Longrightarrow\qquad
x = 0.390 .
$$
So $[\mathrm{HI}] = 0.780$ and $[\mathrm{H_2}] = [\mathrm{I_2}] = 0.110\ \mathrm{mol\,dm^{-3}}$; the reaction is $78\ \%$ complete. Check: $0.780^2/0.110^2 = 50.3 \approx 50.5$. Always look for the square root before reaching for the quadratic — it is exact, faster, and cannot pick the wrong root.
:::
:::

::: example When $K$ is tiny: the small-$x$ approximation {#ex-small-x}
For $\mathrm{N_2(g) + O_2(g) \rightleftharpoons 2\,NO(g)}$, $K_\mathrm{c} = 4.7\times10^{-31}$ at $\mathrm{298\,K}$ (from $\Delta_\mathrm{f}G^\circ(\mathrm{NO}) = +86.55\ \mathrm{kJ\,mol^{-1}}$). Air is $0.78\ \mathrm{mol\,dm^{-3}}$-equivalent $\mathrm{N_2}$ and $0.21$ of $\mathrm{O_2}$ in the same sense; estimate the equilibrium concentration of NO at $\mathrm{298\,K}$.
::: solution
If $x$ is the amount of $\mathrm{N_2}$ that reacts, $[\mathrm{NO}] = 2x$ and
$$
\frac{(2x)^2}{(0.78 - x)(0.21 - x)} = 4.7\times10^{-31}.
$$
Because $K$ is astronomically small, $x$ must be negligible against $0.78$ and $0.21$; replacing both differences by the initial values,
$$
(2x)^2 \approx 4.7\times10^{-31} \times 0.78 \times 0.21 = 7.7\times10^{-32}
\qquad\Longrightarrow\qquad
[\mathrm{NO}] = 2x = 2.8\times10^{-16}\ \mathrm{mol\,dm^{-3}}.
$$
That is about $1.7\times10^{5}$ molecules per $\mathrm{cm^3}$ — a real but vanishing concentration. The approximation is self-evidently valid ($x$ is some fifteen orders of magnitude below the smallest initial concentration), and the chemistry it proves matters: nitric oxide cannot come from room-temperature air, which is why internal-combustion engines produce $\mathrm{NO}$ only because their cylinders reach $\mathrm{2500\,K}$, where this $K$ is some $10^{28}$ times larger.
:::
:::

::: warning The small-$x$ approximation is a licence you must earn {#warn-small-x}
Dropping $x$ against an initial concentration is legitimate only when it changes nothing — the usual rule is that $x$ must be under $5\ \%$ of the value it is dropped from, and you *must* check afterwards. The trap is that whether the approximation works depends on the starting concentration, not only on $K$. For $\mathrm{PCl_5(g) \rightleftharpoons PCl_3(g) + Cl_2(g)}$ with $K_\mathrm{c} = 0.027$ at $\mathrm{500\,K}$ (representative tabulated data) and $[\mathrm{PCl_5}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$, the approximation gives $x \approx \sqrt{0.027 \times 0.100} = 0.052$ — which is $52\ \%$ of $0.100$, and the exact quadratic gives $x = 0.040$. The approximation has failed by $29\ \%$; the $5\ \%$ test catches this every time, provided you run it. Dilute the same system to $0.020\ \mathrm{mol\,dm^{-3}}$ and the exact dissociation rises to $67\ \%$: the *smaller* the starting concentration, the *less* valid the shortcut. Run the test; it costs one division.
:::

::: widget plot
f: 4*x^2/((0.5-x)*(0.5-x)); k
x: 0, 0.49
y: 0, 120
sliders: k=50:10:100:5
labels: \text{reaction quotient } Q(x); \text{equilibrium constant } K
caption: The reaction quotient $Q(x) = (2x)^2/(0.5-x)^2$ for $\mathrm{H_2 + I_2 \rightleftharpoons 2\,HI}$ starting from $0.50\ \mathrm{mol\,dm^{-3}}$ of each element, plotted against the extent $x$, for a constant $K$ set by the slider. The curve rises monotonically from zero and diverges as $x$ approaches the limit of complete reaction; the equilibrium extent is exactly where it crosses the horizontal $K$ line. Slide $K$ up and the crossing moves right: a larger constant means a reaction that runs further. The same picture underlies every ICE table — solving the table means finding that crossing.
:::

## Combining equilibrium constants

::: proposition Rules for combining equilibria {#prop-combining}
Equilibrium constants combine the way equations do — with multiplication where equations add:
- **Reverse** an equation: $K' = 1/K$.
- **Add** two equations: $K' = K_1 K_2$ (and each species cancelled between them contributes nothing further).
- **Multiply** an equation by $n$: $K' = K^{\,n}$ — so halving an equation takes the square root of $K$.
These follow immediately from the product-of-powers form of $K$: adding equations adds exponents, which multiplies the products.
:::

::: example Building a constant from two known ones {#ex-combining}
At $\mathrm{298\,K}$: (i) $\mathrm{N_2(g) + O_2(g) \rightleftharpoons 2\,NO(g)}$, $K_1 = 4.7\times10^{-31}$; (ii) $\mathrm{2\,NO(g) + O_2(g) \rightleftharpoons 2\,NO_2(g)}$, $K_2 = 2.2\times10^{12}$. Find $K$ for $\mathrm{N_2(g) + 2\,O_2(g) \rightleftharpoons 2\,NO_2(g)}$, and for $\mathrm{NO_2(g) \rightleftharpoons \tfrac12\,N_2(g) + O_2(g)}$.
::: solution
The target equation is (i) + (ii), with NO cancelling — which it may, because the same species appears on opposite sides and its concentration divides out:
$$
K = K_1 K_2 = 4.7\times10^{-31} \times 2.2\times10^{12} = 1.0\times10^{-18}.
$$
The second equation is the reverse of the first target, halved:
$$
K' = K^{-1/2} = \frac{1}{\sqrt{1.0\times10^{-18}}} = 9.7\times10^{8}.
$$
The numbers tell the environmental story in one line: nitrogen dioxide is thermodynamically unstable with respect to the elements ($K'$ huge for its decomposition) yet air and exhaust coexist for ever, because [[general-chemistry-2/rates-intro]] has taught us that $K$ says nothing about speed.
:::
:::

## Le Chatelier's principle

::: proposition Le Chatelier's principle {#prop-le-chatelier}
If a system at equilibrium is subjected to a **constraint** — a change of concentration, pressure or temperature — it shifts in the direction that **partly opposes** the change, until $Q$ again equals $K$. More precisely: changes of concentration or pressure move the *position* of equilibrium without changing $K$ (they change $Q$, and the reaction moves to restore $Q = K$); only a change of **temperature changes $K$ itself**, and it does so in the endothermic direction. The principle is qualitative and empirical, but it is exactly right, and the ICE table turns it into numbers.
:::

**Concentration.** Adding a reactant raises the denominator of $Q$, so $Q < K$ and the mixture moves forward — some of the added reactant is consumed, "opposing" the addition, though not all of it (the new equilibrium has *more* of the added species than before, just less than you put in). Removing a product works the same way from the other side, and is the everyday trick of driving a reaction: distil off the low-boiling ester in a Fischer esterification and the acid keeps converting.

**Pressure and volume.** Compressing a gas mixture (shrinking the volume) multiplies every concentration by the same factor, which affects numerator and denominator of $Q$ unequally *only if the two sides have different numbers of gas molecules*. The shift is toward the side with fewer gas molecules, which relieves the pressure. For $\mathrm{N_2O_4 \rightleftharpoons 2\,NO_2}$, halving the volume doubles every pressure and quadruples the numerator of $Q$ while doubling its denominator: $Q$ doubles, exceeds $K$, and the mixture moves left — visibly, the brown colour first deepens (everything doubled) and then fades back below its instant-doubling shade as $\mathrm{N_2O_4}$ reforms. If $\Delta n = 0$ — as for $\mathrm{H_2 + I_2 \rightleftharpoons 2\,HI}$ — pressure has *no* effect on the position of equilibrium, because $Q$ is unchanged.

**Inert gases.** Adding an inert gas at constant volume changes no partial pressure and no concentration: $Q$ is untouched and nothing shifts. Added at constant *pressure* (letting the container expand), it dilutes every species, which acts like a pressure decrease — the equilibrium moves toward the side with more gas molecules. "Add gas, equilibrium shifts" is only a principle if you say which constraint you held.

**Temperature.** Here $K$ itself moves, and the direction is fixed by the sign of $\Delta_\mathrm{r}H^\circ$: heating favours the **endothermic** direction. For $\mathrm{N_2O_4 \rightleftharpoons 2\,NO_2}$ ($\Delta_\mathrm{r}H^\circ = +57.2\ \mathrm{kJ\,mol^{-1}}$), $K_\mathrm{p}$ rises from $0.148$ at $\mathrm{298\,K}$ to about $15$ at $\mathrm{373\,K}$: a hot sealed tube of the gas is dark brown, a cold one nearly colourless. The reason is the ratio-of-rate-constants argument of [[#proof-k-ratio]]: heating raises the rate constant of the step with the larger barrier more, and for an endothermic forward reaction that barrier is the forward one.

**Catalysts.** A catalyst speeds both directions by the same factor, so it changes neither $K$ nor the equilibrium composition — only how fast the composition is reached. Industrial synthesis is full of catalysts and none of them improves the yield at equilibrium; they improve the *rate at which the yield is collected*.

::: warning Le Chatelier opposes, never cancels — and $K$ does not budge for concentration {#warn-le-chatelier}
Three precise cautions. First, the shift only *partly* opposes the constraint: add $\mathrm{I_2}$ to an $\mathrm{H_2/I_2/HI}$ equilibrium and some is consumed, but the new equilibrium still has more $\mathrm{I_2}$ than the old one. "Opposes" is not "undoes". Second, $K$ is a function of temperature *only*: adding reactant changes $Q$, the composition responds, and $K$ is exactly what it was — students who "recalculate $K$ after adding reactant" have changed the temperature in their heads without noticing. Third, the principle cannot tell you *how much*: two systems both "shifted left" can have moved by $0.1\ \%$ or $90\ \%$. Only the ICE table answers how much, which is why the principle opens every equilibrium problem and the table closes it.
:::

::: quiz
Limestone decomposes in a sealed vessel: $\mathrm{CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)}$, at a fixed temperature where the equilibrium pressure of $\mathrm{CO_2}$ is $0.20\ \mathrm{bar}$. The vessel currently holds $\mathrm{CO_2}$ at $0.20\ \mathrm{bar}$ with both solids present. What happens if more $\mathrm{CaCO_3(s)}$ is added?
- [x] Nothing: the solid's "concentration" is not in the equilibrium expression, and $p(\mathrm{CO_2})$ is already at its equilibrium value.
- [ ] The equilibrium moves right and the $\mathrm{CO_2}$ pressure rises above $0.20\ \mathrm{bar}$.
- [ ] The equilibrium moves left, consuming the added solid.
- [ ] It depends on how much $\mathrm{CaCO_3}$ is added.
::: solution
$Q_\mathrm{p} = p(\mathrm{CO_2})/p^\circ$ contains only the gas; the pure solids set their own activities and drop out ([[#def-heterogeneous]]). With $p(\mathrm{CO_2}) = 0.20\ \mathrm{bar} = p_\mathrm{eq}$, the system is at equilibrium and adding more of either solid changes nothing — provided both remain, since if one is used up the heterogeneous equilibrium ceases to exist and the pressure is no longer pinned.
:::
:::

The industrial hook that every first course reaches is ammonia, $\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$ ($\Delta_\mathrm{r}H^\circ = -92\ \mathrm{kJ\,mol^{-1}}$, four gas molecules becoming two). Equilibrium favours ammonia at *low* temperature and *high* pressure — but cold chemistry is slow, so the Haber–Bosch process runs hot enough ($\sim 700\ \mathrm{K}$) for an acceptable rate, presses hard ($150$–$250\ \mathrm{bar}$) to claw the yield back, and uses an iron catalyst to reach equilibrium quickly without moving it. Every one of those three choices is this chapter in one line: temperature trades yield for rate (and $K$ moves), pressure moves the position without touching $K$, and the catalyst only buys time. The same three-line analysis runs through the contact process for sulfuric acid and every other synthesis you will meet.

::: history
Claude Berthollet observed early in the 1800s that reactions can run "the wrong way" — that the direction depends on conditions and proportions, not on an unalterable elective affinity — planting the idea of a balance point. In 1864–1867 the Norwegian students Cato Guldberg and Peter Waage worked out the mass-action law quantitatively, tying the equilibrium composition to the product of active masses and, like the proof in [[#proof-k-ratio]], to the ratio of reaction velocities. Jacobus van 't Hoff gave the law its thermodynamic shape and its temperature dependence in 1884, and in the same year the mining engineer Henri Le Chatelier, studying flames and explosives, stated the principle of opposition that made equilibrium shifts predictable; his 1884 paper is the origin of the chapter-section you have just read. Walther Nernst's measurements of low-temperature heats of reaction around 1906 supplied the data that made equilibrium calculations predictive for industry — and, via the third law, their justification. The Haber process, running on exactly these calculations from 1910, is the argument that this chapter is worth learning.
:::

## Where this leads

Acids and bases are equilibrium chemistry in water, and every pH calculation in [[general-chemistry-2/acids-bases]] is one ICE table with the water level added; buffers and titrations in [[general-chemistry-2/buffers-titrations]] are two equilibria negotiating, and precipitation and complex ions in [[general-chemistry-2/solubility-equilibria]] are the heterogeneous case of this chapter. The reason $K$ exists at all — why it is a function of temperature alone, and how $\Delta_\mathrm{r}G^\circ = -RT\ln K$ computes it — is [[general-chemistry-2/entropy-free-energy]]; the cell-potential form of the same relation is [[general-chemistry-2/electrochemistry-intro]]. The rate-side reading of equilibrium is developed in [[general-chemistry-2/rates-intro]] and, at the next level, in [[thermodynamics/reaction-equilibrium]]; how mechanisms hide inside equilibrium and rate data is [[kinetics/reaction-mechanisms]].

::: summary
- Equilibrium is dynamic: forward and reverse rates equal, composition constant but not static, approached from either side.
- The law of mass action (empirical) gives $K_\mathrm{c}$ and $K_\mathrm{p}$: products over reactants, each to its coefficient; pure solids and solvent do not appear; $K$ depends on temperature alone.
- $K_\mathrm{p} = K_\mathrm{c}(RT)^{\Delta n}$ with $R = 0.08314\ \mathrm{L\,bar\,K^{-1}\,mol^{-1}}$; the constants coincide when $\Delta n = 0$.
- The reaction quotient $Q$ evaluated at current conditions predicts direction: $Q < K$ forward, $Q > K$ reverse.
- ICE tables turn data into answers: carry the coefficients into the change row, solve exactly or justify the small-$x$ shortcut with the $5\ \%$ test, and always substitute back.
- Constants combine: reverse → reciprocal, add → multiply, scale by $n$ → power $n$.
- Le Chatelier: concentration and pressure shifts leave $K$ alone and only partly oppose the constraint; only temperature changes $K$, and it favours the endothermic direction; catalysts change neither.
:::

## Exercises

::: exercise Writing $K_\mathrm{c}$ {level=1}
Write the equilibrium-constant expression $K_\mathrm{c}$ for (a) $\mathrm{2\,SO_2(g) + O_2(g) \rightleftharpoons 2\,SO_3(g)}$ and (b) $\mathrm{C(s) + H_2O(g) \rightleftharpoons CO(g) + H_2(g)}$. Which species are omitted and why?
::: solution
(a) $K_\mathrm{c} = [\mathrm{SO_3}]^2/([\mathrm{SO_2}]^2[\mathrm{O_2}])$ — nothing omitted, all species are gases. (b) $K_\mathrm{c} = [\mathrm{CO}][\mathrm{H_2}]/[\mathrm{H_2O}]$: the solid carbon is a pure condensed phase with fixed "concentration" and is absorbed into $K$; the gaseous water is not, because its partial pressure genuinely varies.
:::
:::

::: exercise Converting to $K_\mathrm{p}$ {level=1 check="0.149"}
For $\mathrm{N_2O_4(g) \rightleftharpoons 2\,NO_2(g)}$ at $\mathrm{298\,K}$, $K_\mathrm{c} = 6.0\times10^{-3}$. What is $K_\mathrm{p}$? (Enter the dimensionless $K_\mathrm{p}$; pressures relative to $1\ \mathrm{bar}$.)
::: solution
$\Delta n = +1$, so $K_\mathrm{p} = K_\mathrm{c}\,RT = 6.0\times10^{-3} \times 0.08314 \times 298.15 = 6.0\times10^{-3} \times 24.79 = 0.149$.
:::
:::

::: exercise Direction of reaction {level=1 check="16"}
For $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$ with $K_\mathrm{c} = 50.5$, a mixture has $[\mathrm{H_2}] = [\mathrm{I_2}] = 0.10$ and $[\mathrm{HI}] = 0.40\ \mathrm{mol\,dm^{-3}}$. Compute $Q_\mathrm{c}$. (Enter $Q_\mathrm{c}$.) Which way does the mixture move?
::: solution
$Q_\mathrm{c} = 0.40^2/(0.10 \times 0.10) = 16$. Since $Q < K$, the mixture moves forward, forming HI, until $Q = 50.5$.
:::
:::

::: exercise ICE with a quadratic {level=2 check="0.0134"}
For $\mathrm{PCl_5(g) \rightleftharpoons PCl_3(g) + Cl_2(g)}$, $K_\mathrm{c} = 0.027$ at $\mathrm{500\,K}$. A vessel is charged with $0.0200\ \mathrm{mol\,dm^{-3}}$ $\mathrm{PCl_5}$. Find the equilibrium concentration of $\mathrm{Cl_2}$. (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$x^2/(0.0200 - x) = 0.027$ gives $x^2 + 0.027x - 5.40\times10^{-4} = 0$, so $x = [-0.027 + \sqrt{7.29\times10^{-4} + 2.16\times10^{-3}}]/2 = 0.0134\ \mathrm{mol\,dm^{-3}}$. The small-$x$ approximation would give $x = 0.0232$ — $116\ \%$ of the exact value — and fails the $5\ \%$ test badly: at this dilution $67\ \%$ of the pentachloride dissociates.
:::
:::

::: exercise A perfect-square ICE {level=2 check="0.780"}
For $\mathrm{H_2(g) + I_2(g) \rightleftharpoons 2\,HI(g)}$, $K_\mathrm{c} = 50.5$ at $\mathrm{448\,K}$. Equal initial concentrations of $0.500\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2}$ and $\mathrm{I_2}$ react at this temperature. Find $[\mathrm{HI}]_\mathrm{eq}$. (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$\sqrt{50.5} = 2x/(0.500 - x)$ gives $x = 0.390$ and $[\mathrm{HI}] = 2x = 0.780\ \mathrm{mol\,dm^{-3}}$. Check: $(0.780)^2/(0.110)^2 = 50.3 \approx 50.5$.
:::
:::

::: exercise Le Chatelier, qualitatively {level=2}
For the equilibrium $\mathrm{CO(g) + 2\,H_2(g) \rightleftharpoons CH_3OH(g)}$, $\Delta_\mathrm{r}H^\circ = -91\ \mathrm{kJ\,mol^{-1}}$, predict the effect of each change on the equilibrium amount of methanol: (a) compress at constant temperature; (b) add $\mathrm{H_2}$ at constant volume; (c) add argon at constant volume; (d) add argon at constant pressure; (e) raise the temperature; (f) add a catalyst. Say in each case whether $K$ changes.
::: solution
(a) Shifts right (three gas molecules become one): more methanol; $K$ unchanged. (b) $Q$ falls, shift right; more methanol, though not all the added hydrogen is consumed; $K$ unchanged. (c) Nothing: constant volume means no partial pressures change; $K$ unchanged. (d) Constant pressure with inert gas dilutes everything — acts like a pressure decrease, shifts left toward the three molecules; less methanol; $K$ unchanged. (e) Exothermic forward reaction, so heating *lowers* $K$ and shifts left: less methanol — this is why methanol synthesis, like ammonia synthesis, is a compromise between rate and yield. (f) No change to the equilibrium amount or to $K$; equilibrium is simply reached faster.
:::
:::

::: exercise Quantified compression {level=2 check="3.44"}
Take the $\mathrm{N_2O_4/NO_2}$ equilibrium of the worked example at $\mathrm{373\,K}$ ($K_\mathrm{p} = 15$; $p(\mathrm{N_2O_4}) = 0.18$, $p(\mathrm{NO_2}) = 1.64\ \mathrm{bar}$) and halve the volume at constant temperature. What is the *new* total pressure at equilibrium? (Enter it in bar.)
::: solution
Doubling every pressure instantaneously gives $Q = (3.28)^2/0.359 = 30 > 15$: shift left. Write $p(\mathrm{NO_2}) = 3.28 - 2y$, $p(\mathrm{N_2O_4}) = 0.359 + y$ and solve $(3.28-2y)^2/(0.359+y) = 15$: $4y^2 - 28.1y + 5.40 = 0$, so $y = 0.197$ (the other root exceeds the available $\mathrm{NO_2}$). Then $p(\mathrm{NO_2}) = 2.89$, $p(\mathrm{N_2O_4}) = 0.556\ \mathrm{bar}$, total $3.44\ \mathrm{bar}$ — above the original $1.82$ (the compression is only partly opposed) but below the instant-of-compression $3.64$ (it is genuinely opposed). The degree of dissociation falls from $0.82$ to $0.72$: pressure favours the side with fewer molecules, exactly as Le Chatelier says, and the arithmetic says how much.
:::
:::

::: exercise Exact versus approximate {level=3}
For $\mathrm{PCl_5(g) \rightleftharpoons PCl_3(g) + Cl_2(g)}$ with $K_\mathrm{c} = 0.027$ at $\mathrm{500\,K}$ and $[\mathrm{PCl_5}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$: solve the equilibrium exactly, solve it with the small-$x$ approximation, and quantify the error. Then find the initial concentration below which the approximation would be acceptable at the $5\ \%$ level.
::: solution
Exact: $x^2 + 0.027x - 0.0027 = 0$ gives $x = 0.0402\ \mathrm{mol\,dm^{-3}}$ ($40\ \%$ dissociated). Approximate: $x_0 = \sqrt{K_\mathrm{c} C_0} = \sqrt{0.0027} = 0.0520$ — an error of $(0.0520 - 0.0402)/0.0402 = 29\ \%$, and $x_0/C_0 = 52\ \% \gg 5\ \%$: rejected. The approximation is acceptable when $x/C_0 \lesssim 0.05$, i.e. when $C_0 \gtrsim 20\,x \approx 20\sqrt{K_\mathrm{c}C_0}$, so $C_0 \gtrsim 400\,K_\mathrm{c} = 10.8\ \mathrm{mol\,dm^{-3}}$. For this $K$ the shortcut is essentially never usable at ordinary concentrations — a warning that "$K$ small" is not the criterion; "$x$ small compared with what it is dropped from" is, and that depends on the concentration you chose.
:::
:::

::: exercise A constant from the forge {level=3 check="1.0e-18"}
Using $\Delta_\mathrm{f}G^\circ(\mathrm{NO}) = +86.55$ and $\Delta_\mathrm{f}G^\circ(\mathrm{NO_2}) = +51.31\ \mathrm{kJ\,mol^{-1}}$ at $\mathrm{298\,K}$, compute $K_\mathrm{p}$ for $\mathrm{N_2(g) + 2\,O_2(g) \rightleftharpoons 2\,NO_2(g)}$ two ways: directly from the free energies, and by combining $K_1$ for $\mathrm{N_2 + O_2 \rightleftharpoons 2\,NO}$ with $K_2$ for $\mathrm{2\,NO + O_2 \rightleftharpoons 2\,NO_2}$. (Enter $K_\mathrm{p}$ in scientific notation.) Why do the two agree, and what does the size of $K_\mathrm{p}$ explain about lightning and fertiliser?
::: solution
Direct: $\Delta_\mathrm{r}G^\circ = 2 \times 51.31 = 102.6\ \mathrm{kJ\,mol^{-1}}$, so $K_\mathrm{p} = e^{-102\,600/(8.314 \times 298.15)} = e^{-41.4} = 1.0\times10^{-18}$. Combined: $K_1 = e^{-173\,100/RT} = 4.7\times10^{-31}$ and $K_2 = e^{+70\,480/RT} = 2.2\times10^{12}$, and $K_1 K_2 = 1.0\times10^{-18}$ — identical because the target equation is the sum of the two, and the mass-action product of the two expressions is the target expression with $[\mathrm{NO}]$ cancelling ([[#prop-combining]]). The size explains the nitrogen cycle: at $\mathrm{298\,K}$ essentially no $\mathrm{NO_2}$ can form from air, but $K$ grows with temperature (both steps are endothermic or only mildly exothermic), and a lightning channel at $\sim 30\,000\ \mathrm{K}$ fixes enough NO — which oxidises and dissolves to nitrate — to feed natural soils. Industrial fertiliser is the same equilibrium argument, run at a temperature chosen by the rate/equilibrium compromise of this chapter.
:::
:::

::: exercise The isomerisation trick {level=3}
Butane isomerises to isobutane: $\mathrm{n\text{-}C_4H_{10}(g) \rightleftharpoons i\text{-}C_4H_{10}(g)}$, with $K_\mathrm{c} = 2.5$ at $\mathrm{298\,K}$. A refinery stream of pure n-butane is passed over an acid catalyst until it equilibrates. What is the maximum mole fraction of isobutane obtainable in a single pass, and why does the plant still get more? (For the second part, reason with $Q$ and separation.)
::: solution
With $x$ isomerised: $x/(1-x) = 2.5$ gives $x = 2.5/3.5 = 0.714$ — a single pass caps at $71\ \%$ isobutane, because at that composition $Q = K$ and the net rate is zero (the catalyst makes the mixture *reach* the cap, never exceed it: [[#warn-le-chatelier]]). Plants exceed the cap by taking the product out of the equilibrium game: isobutane is separated (distillation exploits a $\sim 11\ \mathrm{K}$ boiling-point difference) as it forms, so the reactor effluent is re-equilibrated from a mixture with $Q < K$, and the cycle repeats. This is the general truth behind every "yield above the equilibrium yield" claim in industry: the equilibrium yield was never exceeded — the equilibrium was never allowed to be reached, because product was continuously removed. The same logic drives the removal of ammonia in Haber–Bosch by condensation, and of water in esterifications by molecular sieve.
:::
:::
