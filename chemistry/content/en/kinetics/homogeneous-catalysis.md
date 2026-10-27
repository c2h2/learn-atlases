A catalyst was introduced in [[general-chemistry-2/rates-intro]] as a substance that speeds a reaction without being consumed; [[kinetics/reaction-mechanisms]] gave the language in which that promise can be made precise. This chapter spends its first half learning to *read* catalysis in mechanism language — acid–base catalysis in solution, enzymes as catalytic cycles, and the rate law of a cycle in general — and its second half following the idea to its surprising conclusion. For if the catalyst is not added from outside but *produced by the reaction itself*, the rate law acquires a product concentration in the numerator: the reaction feeds on itself. Autocatalysis gives the S-shaped curves of population growth, of the standard permanganate titration, of batteries and fires. And autocatalysis, combined with one more ingredient — an intermediate held far from equilibrium — gives chemical *oscillations*: reactions that run, stop, run backwards, and repeat, the chemical analogue of a heartbeat. That discovery, ridiculed for half a century and then honoured with a Nobel Prize, forced chemists to admit that order and rhythm are natural consequences of dissipation, not exceptions to the second law.

## Catalysis in the language of mechanisms

::: definition Homogeneous catalysis and catalyst order {#def-cat-mech}
Catalysis is **homogeneous** when catalyst and reactants form a single phase — usually an aqueous or organic solution. In mechanism language a **catalyst** is a species that is *consumed in one elementary step and regenerated in a later one*, so it cancels from the net equation; note the order — an intermediate is produced then destroyed, a catalyst is destroyed then produced, which is why a catalyst must be added and an intermediate appears by itself. The catalyst works by opening an alternative **rate-determining sequence** whose highest barrier is lower than that of the uncatalysed path (the connection to transition-state theory is exact: the catalysed transition states are stabilised relative to the reactants, [[kinetics/transition-state-theory]]). The **catalyst order** is the exponent of the catalyst concentration in the rate law; it is a measured number, and — like every order — a fingerprint of the mechanism.
:::

Four catalyst orders recur, and each tells a distinct mechanistic story. An order of **one** is the default: one catalyst molecule enters the rate-determining sequence, as in the iodide-catalysed decomposition of hydrogen peroxide, $v = k[\mathrm{H_2O_2}][\mathrm{I^-}]$. An order of **one half** says the resting state of the catalyst is a dimer in fast equilibrium with the active monomer, $2\,\mathrm{Cat} \rightleftharpoons \mathrm{Cat_2}$: the monomer concentration is proportional to $[\mathrm{Cat}]_0^{1/2}$. An order of **zero** is the mirror image of enzyme saturation: when the catalyst is in excess and every substrate molecule is already bound, the rate is $k_2[\mathrm{S}]_0$ and adding more catalyst does nothing. A **negative** order is rarer but real: it appears when added catalyst is sequestered by the system — for instance when the active monomer binds an inactive aggregate in a dead-end complex, so that raising the total catalyst *lowers* the concentration of the free form.

::: example Catalyst order from rate data {#ex-cat-order}
A palladium-catalysed coupling is followed at fixed substrate excess and $\mathrm{25\,^\circ C}$, with total catalyst varied and initial rates measured:

| $[\mathrm{Cat}]_0\,/\mathrm{mmol\,dm^{-3}}$ | 1.0 | 2.0 | 4.0 | 8.0 |
|---|---|---|---|---|
| $v_0\,/\,10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ | 1.5 | 2.1 | 3.0 | 4.2 |

Find the catalyst order and propose what it says about the resting state of the catalyst.
::: solution
Take the order between the first and last runs, where the catalyst concentration changes by a factor of $8$:
$$
m_\text{cat} = \frac{\ln\!\left(4.2/1.5\right)}{\ln 8} = \frac{1.030}{2.079} = 0.50.
$$
The consecutive pairs agree: each doubling of catalyst multiplies the rate by $\approx 1.41 = 2^{1/2}$. The reaction is **half order in catalyst**, the signature of a dimeric resting state: the active species is a monomer held in check by the fast pre-equilibrium $2\,\mathrm{Cat} \rightleftharpoons \mathrm{Cat_2}$, so $[\mathrm{Cat}]_\text{monomer} = \left([\mathrm{Cat}]_0/K\right)^{1/2}$ (with $K$ the dimerisation constant, and $[\mathrm{Cat}]_0$ mostly sitting in the dimer). Half order is not a half-molecule reacting; it is a whole molecule in equilibrium with a dimer.
:::
:::

::: warning Half orders, zero orders and what they are not {#warn-cat-order}
A catalyst order of $\tfrac{1}{2}$ does **not** mean "half a reaction" or a termolecular half-collision: it means the *resting state* of the catalyst is an aggregate — usually a dimer — and only the monomer (or a fragment of it) enters the rate-determining sequence. Likewise a zero order in catalyst is not "no catalysis": it means the catalyst is working flat out with all its substrate bound, exactly as a saturated enzyme is zero order in *substrate*. And a negative order is not a mistake in the data: check first for catalyst sequestration by product, solvent or ligand. Orders are facts about the *whole* mechanism, not about the step you hoped for.
:::

## Acid–base catalysis

Proton transfer is the most common elementary step in solution chemistry, and acids and bases are the most common catalysts. The central distinction is between two ways a proton can enter the rate law.

::: definition Specific and general acid–base catalysis {#def-acid-cat}
A reaction is under **specific acid catalysis** if its rate depends only on the concentration of the solvated proton $\mathrm{H_3O^+(aq)}$ (equivalently on pH) and on nothing else acidic; the protonation is a fast **pre-equilibrium** and the slow step happens on the conjugate acid. It is under **general acid catalysis** if *any* Brønsted acid $\mathrm{HA}$ present can deliver the proton *in or during* the rate-determining step; then the observed rate constant collects a term for every acid in solution,
$$
k_\text{obs} = k_0 + k_\mathrm{H}[\mathrm{H_3O^+}] + k_\mathrm{HA}[\mathrm{HA}] + \cdots,
$$
and likewise for bases (specific and general **base catalysis**, in $\mathrm{OH^-}$ and in every base present). The two are distinguished experimentally by the **buffer test**: work at constant pH with buffers of increasing total concentration. Under specific catalysis $k_\text{obs}$ is unchanged — only $\mathrm{pH}$ matters; under general catalysis $k_\text{obs}$ rises in proportion to the buffer concentration, because $\mathrm{HA}$ and $\mathrm{A^-}$ appear in the rate law even though $\mathrm{pH}$ is fixed (see [[general-chemistry-2/buffers-titrations]]).
:::

::: proposition The Brønsted catalysis law {#prop-bronsted}
For a family of reactions catalysed by a series of related acids (or bases), the catalytic rate constant is a power of the acid's dissociation constant — empirically (Brønsted, 1924)
$$
\log_{10} k_\mathrm{HA} = \log_{10} G + \alpha\, \log_{10} K_\mathrm{a},
$$
with $G$ a constant for the reaction series and $0 < \alpha < 1$. For reactions whose rate-determining step involves proton transfer, $\alpha$ typically lies between $0.3$ and $0.8$: $\alpha \rightarrow 1$ means the transition state is almost a fully transferred proton on the substrate (a strong-acid-like transition state), $\alpha \rightarrow 0$ means barely any proton has moved. The law is an **empirical free-energy relationship**, not a mechanism: a good straight line supports proton transfer in the transition state, and $\alpha$ measures how far along that transfer the transition state sits.
:::

::: example Brønsted α from two acids {#ex-bronsted}
The general-acid-catalysed bromination of an alkene gives $k_\mathrm{HA} = 4.0\times10^{-4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ for an acid of $\mathrm{p}K_\mathrm{a} = 3.00$ and $1.0\times10^{-5}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ for an acid of $\mathrm{p}K_\mathrm{a} = 5.00$ at the same temperature. Estimate $\alpha$.
::: solution
Since $\log K_\mathrm{a} = -\mathrm{p}K_\mathrm{a}$,
$$
\alpha = \frac{\Delta \log_{10} k_\mathrm{HA}}{\Delta \log_{10} K_\mathrm{a}} = \frac{\log_{10}\!\left(4.0\times10^{-4}\,/\,1.0\times10^{-5}\right)}{5.00 - 3.00} = \frac{\log_{10} 40}{2.00} = \frac{1.602}{2.00} = 0.80.
$$
An $\alpha$ of $0.80$ sits at the top of the proton-transfer range: the transition state has moved almost a full proton onto the alkene. A weaker conjugate acid by two $\mathrm{p}K_\mathrm{a}$ units pays for it by a factor of $40$ in rate — catalysis is powerfully sensitive to catalyst strength when the proton is nearly transferred.
:::
:::

::: example The kinetic case for ester hydrolysis in acid: the A-2 mechanism {#ex-ester}
Acid-catalysed ester hydrolysis, $\mathrm{RCOOR' + H_2O \rightarrow RCOOH + R'OH}$, follows $v = k_\text{obs}[\text{ester}][\mathrm{H_3O^+}]$ in dilute acid, is shown by labelling to cleave the **acyl–oxygen** bond, and its $k_\text{obs}$ tracks the Hammett acidity function $h_0$ rather than $[\mathrm{H_3O^+}]$ in concentrated acid. Assemble the evidence into the A-2 mechanism.
::: solution
**Step 1 (fast pre-equilibrium):** the carbonyl oxygen is protonated, $\mathrm{RCOOR' + H_3O^+ \rightleftharpoons RCO(H)OR'^{+} + H_2O}$ with equilibrium constant $K$. Protonation converts a poor electrophile into a good one. **Step 2 (slow, rate-determining):** a water molecule attacks the protonated carbonyl carbon — the bimolecular step that gives the "2" in "A-2" — while the acid catalyst is still aboard. **Steps 3–5 (fast):** proton transfers move a proton to the alkoxy group, the alcohol leaves, and deprotonation **regenerates** $\mathrm{H_3O^+}$. With step 2 rate-determining and water as solvent absorbed into the constant,
$$
v = k_2 K\,[\text{ester}][\mathrm{H_3O^+}],
$$
which is the observed law, with catalyst order $1$ and the catalyst absent from the net equation. The mechanism explains all three facts: first order in $\mathrm{H_3O^+}$ (pre-equilibrium protonation), acyl–oxygen cleavage (water attacked the carbonyl carbon, not the alkyl carbon), and the $h_0$ behaviour at high acid concentration, where protonation — not stoichiometric hydronium — is what matters. "A-2" reads: **A**cid-catalysed, bimolecular rate-determining step.
:::
:::

::: quiz
Sucrose hydrolysis is followed at $\mathrm{25\,^\circ C}$ in a series of solutions at the *same* pH but with progressively more concentrated buffer. The observed first-order rate constant rises steadily with buffer concentration. What does this show?
- [x] The reaction is under general acid (or general acid–base) catalysis: buffer species other than $\mathrm{H_3O^+}$ enter the rate law.
- [ ] The reaction is under specific $\mathrm{H_3O^+}$ catalysis, because the pH was held constant.
- [ ] The buffer is acting as a catalyst only by changing the ionic strength to one.
- [ ] Something is wrong; rate constants never depend on buffer.
::: solution
Specific catalysis predicts $k_\text{obs}$ depends on pH alone, so at constant pH a buffer concentration effect is impossible — the rise proves that $\mathrm{HA}$ and/or $\mathrm{A^-}$ participate in or before the rate-determining step, i.e. general catalysis. (Ionic strength effects exist but are small and follow the Brønsted–Bjerrum relation; a large linear buffer dependence is mechanistic.) The slope of $k_\text{obs}$ against $[\text{buffer}]$ is the general-acid or general-base coefficient itself.
:::
:::

## Enzyme kinetics: the archetypal catalytic cycle

Enzymes are catalytic cycles in protein clothing, and the first quantitative law of enzyme kinetics is the general law of any two-step cycle. In 1913 Leonor Michaelis and Maud Menten, building on Victor Henri's 1902 proposal, explained how the enzyme $\mathrm{E}$ binds substrate $\mathrm{S}$ reversibly and then converts it.

::: proposition The Michaelis–Menten rate law {#prop-michaelis}
For the mechanism
$$
\mathrm{E + S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ES} \xrightarrow{\;k_2\;} \mathrm{E + P}
$$
with total enzyme $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}]$, the steady-state rate of product formation is
$$
v = \frac{v_\text{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}, \qquad v_\text{max} = k_2[\mathrm{E}]_0, \qquad K_\mathrm{M} = \frac{k_{-1} + k_2}{k_1}.
$$
At low substrate, $[\mathrm{S}] \ll K_\mathrm{M}$, the law falls to $v = (v_\text{max}/K_\mathrm{M})[\mathrm{S}]$: first order in substrate, and the ratio $v_\text{max}/K_\mathrm{M}$ is the effective second-order rate constant for $\mathrm{E + S}$. At high substrate, $[\mathrm{S}] \gg K_\mathrm{M}$, it saturates at $v = v_\text{max}$: **zero order in substrate**, because the enzyme is entirely in the $\mathrm{ES}$ form and the bottleneck is turnover, not capture. $K_\mathrm{M}$ is the substrate concentration at half-maximal rate; when $k_2 \ll k_{-1}$ it equals the dissociation constant of the complex and measures binding affinity.
:::

::: proof The steady-state derivation {#proof-mm}
Apply the steady-state approximation to the intermediate $\mathrm{ES}$: its rate of change is
$$
\frac{\mathrm{d}[\mathrm{ES}]}{\mathrm{d}t} = k_1[\mathrm{E}][\mathrm{S}] - k_{-1}[\mathrm{ES}] - k_2[\mathrm{ES}] \approx 0.
$$
Eliminate the free enzyme with the conservation law $[\mathrm{E}] = [\mathrm{E}]_0 - [\mathrm{ES}]$:
$$
k_1\left([\mathrm{E}]_0 - [\mathrm{ES}]\right)[\mathrm{S}] = (k_{-1} + k_2)[\mathrm{ES}]
\qquad\Longrightarrow\qquad
[\mathrm{ES}] = \frac{[\mathrm{E}]_0[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]},
$$
where $K_\mathrm{M} = (k_{-1}+k_2)/k_1$ appears by definition. Product appears only in the last step, at rate $k_2[\mathrm{ES}]$, so
$$
v = k_2[\mathrm{ES}] = \frac{k_2[\mathrm{E}]_0\,[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]} = \frac{v_\text{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}. \qquad\blacksquare
$$
Note the structure: the steady state made $\mathrm{ES}$ a fixed *fraction* of the total enzyme, and the whole rate law is that fraction times the turnover frequency $k_2$. This is the template for every catalytic cycle.
:::

The classical way to extract $v_\text{max}$ and $K_\mathrm{M}$ from data is the **Lineweaver–Burk** (double-reciprocal) plot: taking reciprocals of the Michaelis–Menten law,
$$
\frac{1}{v} = \frac{K_\mathrm{M}}{v_\text{max}}\cdot\frac{1}{[\mathrm{S}]} + \frac{1}{v_\text{max}},
$$
gives a straight line of slope $K_\mathrm{M}/v_\text{max}$ and intercept $1/v_\text{max}$. Its weakness is statistical: experimental error lives in $v$, so taking reciprocals magnifies the error of the *low-$[\mathrm{S}]$* points — precisely the points that set the slope — and hands them undue weight. Modern practice fits the hyperbola directly by nonlinear least squares, or uses the Eadie–Hofstee plot $v$ against $v/[\mathrm{S}]$, which spreads the error more honestly.

::: warning The Lineweaver–Burk plot is a picture, not an estimator {#warn-lb}
The double-reciprocal plot is drawn to *see* saturation, not to *measure* it. Because the reciprocal transform reweights the noise, two laboratories fitting the same data by linear regression on $1/v$ and by nonlinear regression on $v$ can report $K_\mathrm{M}$ values differing by tens of per cent, and the straight-line answer is the biased one. Worse, a few bad low-$[\mathrm{S}]$ points can bend the line into suggesting substrate inhibition or two-site binding that does not exist. Use the plot to recognise the shape of saturation; use nonlinear fitting (or at least Eadie–Hofstee) for the numbers.
:::

Inhibition is diagnosed by how $v_\text{max}$ and $K_\mathrm{M}$ move. A **competitive** inhibitor binds the free enzyme at the active site and is out-competed by substrate: $K_\mathrm{M}$ is replaced by $K_\mathrm{M}(1 + [\mathrm{I}]/K_\mathrm{I})$ while $v_\text{max}$ is unchanged — enough substrate restores full rate. An **uncompetitive** inhibitor binds only $\mathrm{ES}$: both $v_\text{max}$ and the apparent $K_\mathrm{M}$ fall by the same factor, and no amount of substrate restores the rate. A **noncompetitive** inhibitor binds both forms and lowers $v_\text{max}$ at roughly constant $K_\mathrm{M}$. These patterns are the diagnostic spectra of enzyme mechanism, and they are exactly the saturation logic of [[#algo-cycle]] below.

::: widget plot
f: vmax*x/(km + x); vmax*x/(km*(1 + i) + x)
x: 0, 10
y: 0, 2.2
sliders: vmax=1:0.2:2:0.1; km=1:0.2:3:0.1; i=0:0:3:0.5
labels: \text{uninhibited}; \text{competitive inhibitor } [\mathrm{I}]/K_\mathrm{I} = i
caption: The Michaelis–Menten hyperbola, $v/v_\text{max}$ against $[\mathrm{S}]/K_\mathrm{M}$ units, with $v_\text{max}$ and $K_\mathrm{M}$ set by sliders. The second curve adds a competitive inhibitor at strength $i = [\mathrm{I}]/K_\mathrm{I}$: it reaches the *same* plateau — $v_\text{max}$ is untouched — but needs $1 + i$ times more substrate to get halfway there. Slide $i$ up and watch the curve stretch along the $x$-axis without losing height: competitive inhibition is a fight over $K_\mathrm{M}$, never over $v_\text{max}$.
:::

::: example Michaelis–Menten parameters from two measurements {#ex-mm-params}
A hydrolase at fixed enzyme loading gives $v = 6.67\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ at $[\mathrm{S}] = 0.050\ \mathrm{mol\,dm^{-3}}$ and $1.33\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ at $[\mathrm{S}] = 0.20\ \mathrm{mol\,dm^{-3}}$. Extract $v_\text{max}$ and $K_\mathrm{M}$.
::: solution
Invert both measurements for the double-reciprocal construction: $1/[\mathrm{S}] = 20.0$ and $5.00\ \mathrm{dm^{3}\,mol^{-1}}$, $1/v = 1.50\times10^{5}$ and $7.52\times10^{4}\ \mathrm{s\,dm^{-3}\,mol}$. The slope of $1/v$ against $1/[\mathrm{S}]$ is
$$
\frac{K_\mathrm{M}}{v_\text{max}} = \frac{(1.50 - 0.752)\times10^{5}}{20.0 - 5.00} = 4.99\times10^{3}\ \mathrm{s},
$$
and the intercept follows from the second point: $1/v_\text{max} = 7.52\times10^{4} - (4.99\times10^{3})(5.00) = 5.03\times10^{4}\ \mathrm{s\,dm^{-3}\,mol}$, so
$$
v_\text{max} = 2.0\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}, \qquad K_\mathrm{M} = (4.99\times10^{3})(2.0\times10^{-5}) = 0.10\ \mathrm{mol\,dm^{-3}}.
$$
Check against the raw law: $v_\text{max}[\mathrm{S}]/(K_\mathrm{M}+[\mathrm{S}])$ at $[\mathrm{S}] = 0.050$ gives $2.0\times10^{-5}\times 0.050/0.15 = 6.7\times10^{-6}$ — the measurement. Two points determine two parameters, but with only two points there is no residual left to test the hyperbola itself; real work uses many $[\mathrm{S}]$ and nonlinear fitting, for the reason in [[#warn-lb]].
:::
:::

## Catalytic cycles: the rate law of a two-step cycle

Everything above was one calculation in disguise. Here is the general procedure, and the general result.

::: algorithm Rate law of a catalytic cycle {#algo-cycle}
For a catalyst $\mathrm{Cat}$ turning over substrate $\mathrm{S}$ to product $\mathrm{P}$ by the two-step cycle
$$
\mathrm{Cat + S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{Cat\!\cdot\!S} \xrightarrow{\;k_2\;} \mathrm{Cat + P}
$$
the rate law follows mechanically:

1. **Write the steps and find the resting state.** Identify which species contain the catalyst; here $\mathrm{Cat}$ and $\mathrm{Cat\!\cdot\!S}$.
2. **Write the catalyst conservation law.** The catalyst is never destroyed, only recycled:
$$
[\mathrm{Cat}]_0 = [\mathrm{Cat}] + [\mathrm{Cat\!\cdot\!S}].
$$
This single equation is what makes catalytic rate laws saturable.
3. **Apply the steady-state approximation** to the bound intermediate: $\mathrm{d}[\mathrm{Cat\!\cdot\!S}]/\mathrm{d}t = k_1[\mathrm{Cat}][\mathrm{S}] - (k_{-1}+k_2)[\mathrm{Cat\!\cdot\!S}] \approx 0$.
4. **Solve the linear system** (conservation plus steady state) for the fraction of catalyst in the product-forming state: $[\mathrm{Cat\!\cdot\!S}] = [\mathrm{Cat}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$ with $K_\mathrm{M} = (k_{-1}+k_2)/k_1$.
5. **Multiply by the turnover frequency** of that state: $v = k_2[\mathrm{Cat\!\cdot\!S}] = \dfrac{k_2[\mathrm{Cat}]_0[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}$.
6. **Test the limits.** $[\mathrm{S}] \to \infty$: $v \to k_2[\mathrm{Cat}]_0$, first order in catalyst and zero in substrate (saturation); $[\mathrm{S}] \to 0$: $v \to (k_1k_2/(k_{-1}+k_2))[\mathrm{Cat}]_0[\mathrm{S}]$, first order in both. The **turnover frequency** is $v/[\mathrm{Cat}]_0$, and the **turnover number** (TON) counts turnovers before the catalyst dies.
:::

The result is the Michaelis–Menten law with $[\mathrm{E}]_0 \rightarrow [\mathrm{Cat}]_0$: enzymes are not a separate science, they are catalysts that happen to bind their substrates tightly ($K_\mathrm{M}$ near $\mathrm{mmol\,dm^{-3}}$ or below) and turn over fast. The same algorithm with a dimer resting state inserted at step 2 reproduces the half order of [[#ex-cat-order]]; with a dead-end complex added, a negative order. Catalyst order one is the *consequence* of the cycle operating below saturation, not a law of nature.

## Autocatalysis: the logistic equation

::: definition Autocatalysis {#def-autocatalysis}
A reaction is **autocatalytic** if one of its own products is its catalyst: $\mathrm{A + C \rightarrow 2\,C}$ (with $\mathrm{A \rightarrow C}$ overall), where $\mathrm{C}$ is the catalyst *and* the product. The rate law $v = k[\mathrm{A}][\mathrm{C}]$ contains a product concentration, so the reaction accelerates as it proceeds: the rate is zero at $t=0$ unless a trace of $\mathrm{C}$ is added, rises to a maximum, and falls again only when the reactant runs out. Autocatalysis is nature's cheapest switch — no protein, no metal, just the product doing its own job — and it is the mathematical seed of both the titration curves you will meet in the laboratory and the oscillations of the last section.
:::

::: proposition The logistic equation {#prop-logistic}
For $\mathrm{A + C \rightarrow 2\,C}$ with $v = k[\mathrm{C}][\mathrm{A}]$, $[\mathrm{A}]_0 = a$ and $[\mathrm{C}]_0 = c_0 > 0$, the stoichiometric conservation $[\mathrm{A}] + [\mathrm{C}] = a$ reduces the kinetics to one variable,
$$
\frac{\mathrm{d}[\mathrm{C}]}{\mathrm{d}t} = k\,[\mathrm{C}]\,(a - [\mathrm{C}]),
$$
whose solution is the **logistic function**
$$
[\mathrm{C}](t) = \frac{a}{1 + \left(\dfrac{a - c_0}{c_0}\right) e^{-kat}}.
$$
The curve is sigmoidal: an **induction period** while $\mathrm{C}$ is scarce, then near-exponential growth, then saturation at $a$. The rate is maximal at $[\mathrm{C}] = a/2$ — half the reactant converted — at time $t_\text{inf} = \ln\!\big((a-c_0)/c_0\big)/(ka)$, and the time to reach any conversion $f$ (the fraction of $\mathrm{A}$ converted, $[\mathrm{C}] = fa$) is read off the integrated form
$$
\frac{a - [\mathrm{C}]}{[\mathrm{C}]} = \frac{a - c_0}{c_0}\,e^{-kat}.
$$
:::

::: proof Integration of the logistic equation {#proof-logistic}
Separate variables and split into partial fractions, $\dfrac{1}{[\mathrm{C}](a-[\mathrm{C}])} = \dfrac{1}{a}\left(\dfrac{1}{[\mathrm{C}]} + \dfrac{1}{a-[\mathrm{C}]}\right)$:
$$
\int_{c_0}^{[\mathrm{C}]} \frac{\mathrm{d}[\mathrm{C}]}{[\mathrm{C}](a-[\mathrm{C}])} = kt
\qquad\Longrightarrow\qquad
\frac{1}{a}\ln\frac{[\mathrm{C}](a-c_0)}{c_0(a-[\mathrm{C}])} = kt.
$$
Exponentiating and solving for $[\mathrm{C}]$ gives the logistic function. The rate $k[\mathrm{C}](a-[\mathrm{C}])$ is a downward parabola in $[\mathrm{C}]$ with its maximum at $[\mathrm{C}] = a/2$, which is the inflection point of $[\mathrm{C}](t)$ (the second derivative $\mathrm{d}^2[\mathrm{C}]/\mathrm{d}t^2 = k(a - 2[\mathrm{C}])\,\mathrm{d}[\mathrm{C}]/\mathrm{d}t$ changes sign there). Setting $[\mathrm{C}] = a/2$ in the integrated law gives $t_\text{inf} = \ln\!\big((a-c_0)/c_0\big)/(ka)$. $\blacksquare$
:::

::: widget odesolver
f: 0.5*y*(1 - y)
y0: 0.02
t: 0, 20
exact: 1/(1 + 49*exp(-0.5*t))
h: 0.1
caption: The logistic autocatalytic curve $y' = k\,y\,(a-y)$ with $k = 0.50$, $a = 1.0$ and a seed $y_0 = 0.02$: Euler, Heun and RK4 against the exact logistic function. The curve is flat (the seed catalyst is scarce), bends up through the inflection at $y = a/2 = 0.5$ near $t = \ln 49/0.5 = 7.8$, and flattens again as the reactant is exhausted. The induction period is not an artefact of the seed: halve the seed and the whole curve simply slides right by $\ln 2/(ka)$ — the *shape* is invariant, which is the fingerprint of autocatalysis.
:::

::: example Timing an autocatalytic reaction {#ex-logistic-timing}
In an autocatalytic reaction with $a = 0.100\ \mathrm{mol\,dm^{-3}}$, $c_0 = 0.0020\ \mathrm{mol\,dm^{-3}}$ and $k = 0.50\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, find the time of maximum rate and the time to $90\,\%$ conversion.
::: solution
Here $ka = 0.050\ \mathrm{s^{-1}}$ and $(a-c_0)/c_0 = 0.098/0.0020 = 49$. The maximum rate comes at $[\mathrm{C}] = a/2$:
$$
t_\text{inf} = \frac{\ln 49}{0.050} = \frac{3.892}{0.050} = 78\ \mathrm{s}.
$$
At $90\,\%$ conversion $[\mathrm{C}] = 0.0900\ \mathrm{mol\,dm^{-3}}$, so $(a-[\mathrm{C}])/[\mathrm{C}] = 0.010/0.090 = 1/9$, and from the integrated law $e^{-kat} = (1/9)/49 = 1/441$:
$$
t_{90} = \frac{\ln 441}{0.050} = \frac{6.089}{0.050} = 122\ \mathrm{s}.
$$
The last $10\,\%$ of the reactant is consumed in $122 - 78 = 44\ \mathrm{s}$, while the first $90\,\%$ took $122\ \mathrm{s}$: once the catalyst is abundant the reaction is over in a flash. Numerically integrating $\mathrm{d}[\mathrm{C}]/\mathrm{d}t = 0.50[\mathrm{C}](0.100-[\mathrm{C}])$ reproduces $[\mathrm{C}](122\ \mathrm{s}) = 0.0900\ \mathrm{mol\,dm^{-3}}$.
:::
:::

The standard teaching example is the **permanganate–oxalate titration**: permanganate oxidises oxalate in acidified solution,
$$
2\,\mathrm{MnO_4^-} + 5\,\mathrm{C_2O_4^{2-}} + 16\,\mathrm{H^+} \rightarrow 2\,\mathrm{Mn^{2+}} + 10\,\mathrm{CO_2} + 8\,\mathrm{H_2O},
$$
and the $\mathrm{Mn^{2+}}$ product is the autocatalyst. The first drop of permanganate decolourises sluggishly (minutes), each subsequent drop faster (seconds) as $\mathrm{Mn^{2+}}$ accumulates — a visible logistic curve in a flask, and the reason the titration is warmed and the first drops are added slowly. The chemistry is a standard undergraduate experiment, but it is not trivial: potassium permanganate is a strong oxidiser and corrosive, oxalic acid is toxic, and warm acidified oxidiser splashes are a real burn hazard — the work belongs behind a risk assessment and supervision, with eye protection, as all practical work does. A second example is closer to the grid: in the **lead–acid battery** the discharge product $\mathrm{PbSO_4}$ deposits autocatalytically — existing crystals grow far faster than new ones nucleate — which contributes the characteristic shape of the discharge curve and the failure mode known as sulfation (see [[general-chemistry-2/electrochemistry-intro]]).

## Chemical oscillations

::: warning Oscillations do not break the second law {#warn-oscillation}
A beaker of BZ solution cycling between colours looks like a perpetual-motion machine, so settle this first. Chemical equilibrium **cannot** oscillate: at equilibrium every reaction's affinity is zero and the second law allows only decay to the steady state. An oscillating reaction is a *driven* system: it consumes free energy (bromate is reduced, organics are oxidised) and dissipates it as heat, and the oscillation is the way the system dissipates. When the reagents run out and equilibrium is reached, the oscillation stops for good — in a closed beaker within minutes to hours. Nothing about the rhythm violates thermodynamics; the rhythm *is* thermodynamics, far from equilibrium. (Prigogine's insight, below, was exactly this: order by dissipation.)
:::

::: definition Chemical oscillator and dissipative structure {#def-oscillator}
A **chemical oscillator** is a reacting system whose composition varies periodically in time in a well-stirred, isothermal, homogeneous vessel. Three ingredients are necessary: **(i) far-from-equilibrium conditions** — a continuous flow of free energy through the system (in a batch reactor, until the reagents are spent; in a continuous-flow stirred tank reactor, indefinitely); **(ii) nonlinearity** — the kinetics must contain feedback, and autocatalysis is the canonical source, because it makes the rate depend on a power of the concentration greater than one; and **(iii) an intermediate held in reserve** — a species (a catalyst, an inhibitor) whose concentration builds up slowly and then switches the fast reaction on or off, providing the delay that turns feedback into rhythm rather than runaway. A **dissipative structure** is any ordered, time- or space-varying state (an oscillation, a travelling wave, a convection pattern) that exists only while free energy is dissipated through it.
:::

The minimal mathematics is the **Lotka–Volterra** scheme, a toy model of two competing intermediates $\mathrm{X}$ and $\mathrm{Y}$ fed by reactants and drained to products: $\mathrm{A \xrightarrow{\;k_1\;} X}$ (rate $ax$), $\mathrm{X + Y \xrightarrow{\;k_2\;} 2X}$ (rate $bxy$, autocatalysis in $\mathrm{X}$), $\mathrm{Y \xrightarrow{\;k_3\;} P}$ (rate $dy$).

::: theorem Lotka–Volterra: a centre and closed orbits {#thm-lv}
The kinetics
$$
\frac{\mathrm{d}x}{\mathrm{d}t} = ax - bxy, \qquad \frac{\mathrm{d}y}{\mathrm{d}t} = cxy - dy \qquad (a,b,c,d > 0)
$$
have a single interior steady state, the **centre** $(x^*, y^*) = (d/c,\; a/b)$, and every trajectory in the positive quadrant is a **closed orbit** around it. Small oscillations about the centre have period
$$
T = \frac{2\pi}{\sqrt{ad}}.
$$
:::

::: proof The conserved quantity and the period {#proof-lv}
Set both rates to zero: $x(a - by) = 0$ and $y(cx - d) = 0$ give $y^* = a/b$, $x^* = d/c$. For the orbits, consider
$$
V(x,y) = cx - d\ln x + by - a\ln y .
$$
Along any trajectory, using the chain rule and factoring,
$$
\frac{\mathrm{d}V}{\mathrm{d}t} = \left(c - \frac{d}{x}\right)(ax - bxy) + \left(b - \frac{a}{y}\right)(cxy - dy) = (cx - d)(a - by) + (by - a)(cx - d) = 0.
$$
So $V$ is conserved: trajectories run along level curves of $V$. Now $V \rightarrow \infty$ as $x$ or $y$ approaches $0$ or $\infty$, and $V$ has a strict minimum at $(x^*, y^*)$ (its Hessian is diagonal with entries $d/x^{*2} > 0$, $a/y^{*2} > 0$), so every level curve through the positive quadrant is a closed loop: the centre is *neutrally stable*, neither attracting nor repelling. For the period, write $x = x^* + u$, $y = y^* + v$ and keep first-order terms: $\dot{u} = -bx^* v$, $\dot{v} = cy^* u$, hence $\ddot{u} = -bc\,x^* y^*\, u = -ad\,u$ — a harmonic oscillator of angular frequency $\sqrt{ad}$ and period $2\pi/\sqrt{ad}$. $\blacksquare$
:::

::: widget phaseplane
f: 1.2*x - 0.6*x*y
g: 0.3*x*y - 0.8*y
x: 0, 6
y: 0, 5
points: 1, 1; 4, 2; 2.6, 2.1
caption: The Lotka–Volterra phase plane with $a = 1.2$, $b = 0.6$, $c = 0.3$, $d = 0.8$ (per unit time and per unit concentration): the centre sits at $(x^*, y^*) = (d/c,\, a/b) = (2.67,\, 2.00)$, and the three starting points trace three closed orbits of different size. Click to add more — none spirals in or out, because $V = 0.3x - 0.8\ln x + 0.6y - 1.2\ln y$ is exactly conserved. Real oscillators replace these neutral cycles with a single stable **limit cycle**; the neutral family here is the price of the toy model's perfect conservation law.
:::

::: example A Lotka–Volterra orbit check {#ex-lv}
For the scheme with $a = 1.2\ \mathrm{s^{-1}}$, $b = 0.6\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, $c = 0.3\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, $d = 0.8\ \mathrm{s^{-1}}$, locate the centre and predict the period of small oscillations; how large is the error for the orbit through $(x,y) = (2.6, 2.1)$?
::: solution
The centre is $(d/c, a/b) = (0.8/0.3,\ 1.2/0.6) = (2.67,\ 2.00)$, and
$$
T = \frac{2\pi}{\sqrt{ad}} = \frac{2\pi}{\sqrt{1.2 \times 0.8}} = \frac{2\pi}{0.980} = 6.41\ \mathrm{s}.
$$
The starting point $(2.6, 2.1)$ lies within a few per cent of the centre, so the small-oscillation formula should be nearly exact: numerical integration of the full nonlinear equations gives successive maxima of $x$ separated by $6.415\ \mathrm{s}$ — an error of $0.05\,\%$. The near-coincidence is a peculiarity of Lotka–Volterra (its orbits are almost isochronous); real relaxation oscillators have periods that depend clearly on amplitude and on the rate constants.
:::
:::

The toy model is honest about one thing only: oscillation needs autocatalysis and a second species to hold the first in check. The real skeleton of an oscillator is the **Belousov–Zhabotinsky (BZ) reaction**: potassium bromate oxidises an organic compound (classically malonic acid, $\mathrm{CH_2(COOH)_2}$) in acid solution, catalysed by $\mathrm{Ce^{3+}/Ce^{4+}}$, with a few drops of ferroin indicator that is red when reduced and pale blue when oxidised. The solution pulses between red and blue with a period of tens of seconds, and in a thin unstirred gel the pulses become travelling rings and spirals. The mechanism was distilled by Field, Körös and Noyes (1972–1974) into the three-step **Oregonator**, in which $\mathrm{HBrO_2}$ (bromous acid) is the autocatalyst and cerium the catalyst shuttle:

1. **Bromide-controlled ignition.** $\mathrm{BrO_3^- + Br^- + 2\,H^+ \rightarrow HBrO_2 + HOBr}$. This is the only source of $\mathrm{HBrO_2}$ while bromide lasts — and bromide is also the *inhibitor*, because $\mathrm{Br^-}$ destroys $\mathrm{HBrO_2}$ faster than it accumulates. As long as $[\mathrm{Br^-}]$ exceeds a critical value, the autocatalyst is suppressed and the beaker waits.
2. **Autocatalytic burst.** When bromide falls below the threshold, $\mathrm{HBrO_2}$ is oxidised by bromate to $\mathrm{BrO_2^{\bullet}}$, which is reduced back to $\mathrm{HBrO_2}$ by $\mathrm{Ce^{3+}}$, oxidising it to $\mathrm{Ce^{4+}}$: each $\mathrm{HBrO_2}$ begets two, and the oxidation of bromate runs explosively — the **switch**. Ferroin, oxidised by $\mathrm{Ce^{4+}}$, flashes blue.
3. **Catalyst regeneration and the brake reset.** $\mathrm{Ce^{4+}}$ oxidises the organic substrate (to $\mathrm{CO_2}$ and brominated products), returning to $\mathrm{Ce^{3+}}$; the brominated intermediate hydrolyses and feeds $\mathrm{Br^-}$ back. Bromide climbs past the threshold, step 1 resumes its double role, $\mathrm{HBrO_2}$ is destroyed, and the beaker waits again.

The cycle is a **relaxation oscillator**: a slow build-up (bromide recovery) punctuated by a fast discharge (the autocatalytic burst). In the phase plane this is the picture of a trajectory crawling along a folded slow manifold, jumping at a fold, racing across, and jumping back — the same geometry as the firing of a nerve cell. Unlike the neutral loops of Lotka–Volterra, the relaxation oscillator has a single stable **limit cycle**: trajectories starting anywhere converge onto the same rhythm, which is why BZ beakers keep time so reliably.

::: history
The first chemical oscillator was rejected before it was believed. In 1951 Boris Belousov, working at the Soviet Ministry of Health, found that citric acid, bromate and $\mathrm{Ce^{3+}}$ in acid solution oscillates in colour — and was told by reviewers (and by Semyonov himself) that the result violated thermodynamics and smacked of fraud; his manuscript was returned unpublished. It appeared only in 1959 as a conference abstract, and Anatol Zhabotinsky's experiments with malonic acid (from 1961) revived it, but the phenomenon stayed a Russian curiosity until his work reached the West and Ilya Prigogine's theory of **dissipative structures** (1969) gave oscillations a thermodynamic home. Field, Körös and Noyes published the Oregonator skeleton in 1972–1974, Arthur Winfree reported spiral waves in the BZ reaction in 1972, and Prigogine received the 1977 Nobel Prize in Chemistry for the thermodynamics of irreversible processes. The kinetics of catalysis itself is older: Michaelis and Menten's enzyme law (1913, following Henri, 1902) and Brønsted's catalysis law (1924) had already taught chemists to read mechanism out of rate.
:::

::: quiz
A sealed beaker of BZ solution oscillates for about an hour and then stops, settling to a single colour. What is the correct description of the final state?
- [x] The reagents have been consumed and the system has reached (or drifted past) chemical equilibrium; with no free energy left to dissipate, oscillation is impossible.
- [ ] The reaction has reached a dynamic equilibrium at which forward and reverse oscillations cancel.
- [ ] The catalyst has been destroyed, since oscillations cannot stop for any other reason.
- [ ] The system has frozen at the Lotka–Volterra centre, where the rates vanish.
::: solution
Oscillation requires dissipation: bromate and malonic acid are the fuel, and when $\Delta_\mathrm{r} G$ can no longer drive the cycle, the rhythm dies and the mixture relaxes to equilibrium. Equilibrium itself cannot oscillate — the second law forbids it — so "dynamic equilibrium of oscillations" is a contradiction. The catalyst is not consumed (that is what makes it a catalyst); the *free energy* is. The Lotka–Volterra centre is a property of the toy model, not of the real mixture.
:::
:::

## Where this leads

The saturation law of [[#algo-cycle]] is the same algebra that governs adsorption-limited reactions at surfaces: heterogeneous catalysis is the Michaelis–Menten story with sites instead of molecules, and [[kinetics/surface-kinetics]] takes it up. Autocatalysis in the sense of this chapter — a product that makes more of itself — is the parent idea of the branching chains of [[kinetics/chain-reactions]], where the multiplying species is a radical and the logistic brake is replaced by termination, with explosive consequences. The steady-state and pre-equilibrium machinery used throughout is developed in [[kinetics/reaction-mechanisms]], and the free-energy relationships behind the Brønsted law are at home in [[kinetics/transition-state-theory]]. Oscillations, finally, are the gateway to pattern: travelling waves, Turing structures and the biology of the heartbeat live at the junction of kinetics and transport.

::: summary
- A catalyst is consumed then regenerated, appears in the rate law, and lowers the barrier of the rate-determining sequence; its order (1, ½, 0, negative) reads off the resting state of the catalytic cycle.
- Specific acid–base catalysis depends on pH alone; general catalysis involves every acid or base present and is detected by a buffer-concentration dependence at constant pH. The Brønsted law $\log k_\mathrm{HA} \propto \alpha \log K_\mathrm{a}$ ($\alpha \approx 0.3$–$0.8$) measures proton transfer in the transition state.
- Michaelis–Menten kinetics, $v = v_\text{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$, is the steady-state rate law of a two-step catalytic cycle with the catalyst conservation law; saturation makes the reaction zero order in substrate.
- The Lineweaver–Burk plot is for seeing, not for measuring: reciprocal transforms corrupt the error structure. Inhibition types are diagnosed by how $v_\text{max}$ and $K_\mathrm{M}$ move.
- Autocatalysis, $v = k[\mathrm{C}][\mathrm{A}]$, integrates to the logistic S-curve with an induction period, maximum rate at $[\mathrm{C}] = [\mathrm{A}]_0/2$, and a final burst — the $\mathrm{Mn^{2+}}$-catalysed permanganate–oxalate titration is the laboratory portrait.
- Oscillations need nonlinearity (autocatalysis), a held-back intermediate, and continuous free-energy dissipation far from equilibrium; they stop at equilibrium and never violate the second law.
- Lotka–Volterra has a centre at $(d/c, a/b)$ with closed orbits (conserved $V$) and small-oscillation period $2\pi/\sqrt{ad}$; real oscillators like the BZ reaction are relaxation oscillators with stable limit cycles, skeletonised by the three-step Oregonator with $\mathrm{HBrO_2}$ as autocatalyst and bromide as the brake.
:::

## Exercises

::: exercise Catalyst order from a doubling {level=1 check="2"}
A catalysed reaction obeys $v = k[\mathrm{Cat}]^{1/2}[\mathrm{S}]$. By what factor does the initial rate increase when the catalyst concentration is quadrupled at fixed substrate? (Enter the factor.)
::: solution
The factor is $4^{1/2} = 2$. Half order means the rate responds to the square root of the catalyst: quadruple the catalyst, double the rate — the catalyst is mostly parked in an inactive dimer, and only the monomer works.
:::
:::

::: exercise Michaelis–Menten rate {level=1 check="0.0003"}
An enzyme has $v_\text{max} = 4.0\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ and $K_\mathrm{M} = 0.10\ \mathrm{mol\,dm^{-3}}$. What is the rate at $[\mathrm{S}] = 0.30\ \mathrm{mol\,dm^{-3}}$? (Enter the rate in $\mathrm{mol\,dm^{-3}\,s^{-1}}$.)
::: solution
$v = v_\text{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}]) = 4.0\times10^{-4} \times 0.30/0.40 = 3.0\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ — three quarters of $v_\text{max}$, since $[\mathrm{S}]$ is three $K_\mathrm{M}$'s.
:::
:::

::: exercise The autocatalytic maximum {level=1 check="0.1"}
For the autocatalytic reaction $\mathrm{A + C \rightarrow 2\,C}$ with $[\mathrm{A}]_0 = 0.20\ \mathrm{mol\,dm^{-3}}$ and $[\mathrm{C}]_0 = 0.004\ \mathrm{mol\,dm^{-3}}$, at what catalyst concentration is the rate greatest? (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
The rate $k[\mathrm{C}](a-[\mathrm{C}])$ is maximal at $[\mathrm{C}] = a/2 = 0.10\ \mathrm{mol\,dm^{-3}}$, independent of $k$ and of the seed — the inflection of the logistic curve.
:::
:::

::: exercise Brønsted α {level=2 check="0.8"}
Two general acids catalyse the same reaction with $k = 8.0\times10^{-3}$ and $2.0\times10^{-4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $\mathrm{p}K_\mathrm{a} = 4.0$ and $6.0$. Compute the Brønsted $\alpha$. (Enter $\alpha$.)
::: solution
$\alpha = \dfrac{\log_{10}(8.0\times10^{-3}/2.0\times10^{-4})}{6.0 - 4.0} = \dfrac{\log_{10} 40}{2.0} = \dfrac{1.60}{2.0} = 0.80$. A near-full proton transfer in the rate-determining step, at the top of the proton-transfer range.
:::
:::

::: exercise Time to 90 % of an autocatalysis {level=2 check="122"}
For $v = k[\mathrm{C}][\mathrm{A}]$ with $a = 0.100\ \mathrm{mol\,dm^{-3}}$, $c_0 = 0.0020\ \mathrm{mol\,dm^{-3}}$ and $k = 0.50\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, how long until $90\,\%$ of $\mathrm{A}$ is converted? (Enter the time in seconds.)
::: solution
From $\dfrac{a - [\mathrm{C}]}{[\mathrm{C}]} = \dfrac{a-c_0}{c_0}e^{-kat}$ with $[\mathrm{C}] = 0.090$: $e^{-kat} = (1/9)/49 = 1/441$, so $t = \ln(441)/(0.050) = 6.089/0.050 = 122\ \mathrm{s}$. Note the asymmetry: the inflection is at $78\ \mathrm{s}$, so most of the reaction happens after the halfway mark.
:::
:::

::: exercise Lotka–Volterra centre and period {level=2 check="19.9"}
A Lotka–Volterra scheme has $a = 0.50\ \mathrm{s^{-1}}$, $b = 0.25\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, $c = 0.40\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, $d = 0.20\ \mathrm{s^{-1}}$. Find the centre $(x^*, y^*)$ and the period of small oscillations. (Enter the period in seconds.)
::: solution
$(x^*, y^*) = (d/c,\ a/b) = (0.20/0.40,\ 0.50/0.25) = (0.50,\ 2.0)$ in the corresponding concentration units, and $T = 2\pi/\sqrt{ad} = 2\pi/\sqrt{0.50 \times 0.20} = 2\pi/0.3162 = 19.9\ \mathrm{s}$. The period depends only on the feed rate $a$ and the drain rate $d$ — not on the coupling constants $b$ and $c$, which set only the orbit size.
:::
:::

::: exercise Competitive inhibition from the steady state {level=3}
Add to the Michaelis–Menten mechanism the inhibitor equilibrium $\mathrm{E + I \rightleftharpoons EI}$ with constant $K_\mathrm{I} = k_\text{off}/k_\text{on}$, assuming $\mathrm{EI}$ is catalytically dead and that $\mathrm{E}$, $\mathrm{ES}$ and $\mathrm{EI}$ are all in steady state with total $[\mathrm{E}]_0$. Derive
$$
v = \frac{v_\text{max}[\mathrm{S}]}{K_\mathrm{M}\left(1 + [\mathrm{I}]/K_\mathrm{I}\right) + [\mathrm{S}]}
$$
and show that $v_\text{max}$ is unchanged while the apparent $K_\mathrm{M}$ grows by the factor $1 + [\mathrm{I}]/K_\mathrm{I}$. Why does saturating substrate restore the full rate?
::: solution
The conservation law is now $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}] + [\mathrm{EI}]$, and the inhibitor equilibrium (fast, or steady-state — same algebra) gives $[\mathrm{EI}] = [\mathrm{E}][\mathrm{I}]/K_\mathrm{I}$. The steady state on $\mathrm{ES}$ is unchanged: $[\mathrm{ES}] = [\mathrm{E}][\mathrm{S}]/K_\mathrm{M}$. Substituting both into the conservation law,
$$
[\mathrm{E}]_0 = [\mathrm{E}]\left(1 + \frac{[\mathrm{I}]}{K_\mathrm{I}} + \frac{[\mathrm{S}]}{K_\mathrm{M}}\right)
\qquad\Longrightarrow\qquad
[\mathrm{ES}] = \frac{[\mathrm{E}]_0[\mathrm{S}]}{K_\mathrm{M}\left(1 + [\mathrm{I}]/K_\mathrm{I}\right) + [\mathrm{S}]},
$$
so $v = k_2[\mathrm{ES}]$ with $v_\text{max} = k_2[\mathrm{E}]_0$ as before. As $[\mathrm{S}] \rightarrow \infty$ the factor $1 + [\mathrm{I}]/K_\mathrm{I}$ is swamped by $[\mathrm{S}]/K_\mathrm{M}$: substrate and inhibitor compete for the *same* state ($\mathrm{E}$), so flooding the system with substrate evicts the inhibitor and every enzyme molecule is driven back through the productive cycle. The maximum velocity is a property of the cycle, and competition cannot touch it — only $K_\mathrm{M}$, the price of admission.
:::
:::

::: exercise Dimer resting states and the half order {level=3 check="3"}
A catalyst's resting state is a dimer: $2\,\mathrm{Cat} \rightleftharpoons \mathrm{Cat_2}$ with $K = [\mathrm{Cat_2}]/[\mathrm{Cat}]^2 = 4.0\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}}$, and only the monomer enters a first-order-in-monomer, substrate-saturated cycle with $v = k_2[\mathrm{Cat}]$. (a) Assuming the dimer dominates, show that $v = k_2\left([\mathrm{Cat}]_0/2K\right)^{1/2}$ and hence the reaction is half order in total catalyst. (b) By what factor does the rate rise when $[\mathrm{Cat}]_0$ is increased ninefold? (Enter the factor.)
::: solution
(a) With the catalyst mostly in the dimer, $[\mathrm{Cat}]_0 \approx 2[\mathrm{Cat_2}] = 2K[\mathrm{Cat}]^2$, so the free monomer is $[\mathrm{Cat}] = \left([\mathrm{Cat}]_0/2K\right)^{1/2}$ and $v = k_2\left([\mathrm{Cat}]_0/2K\right)^{1/2}$ — half order, as observed in [[#ex-cat-order]]. (b) The square root again: a ninefold increase gives a factor of $9^{1/2} = 3$. The number $K$ cancels from the *ratio*; only the order survives, which is why orders are mechanism statements and not rate statements. (Consistency check on the assumption: at $[\mathrm{Cat}]_0 = 1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, the monomer is $\approx 3.5\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, about $70\,\%$ of the total — the dimer-dominant formula is only fair there, and a careful treatment solves $[\mathrm{Cat}]_0 = [\mathrm{Cat}] + 2K[\mathrm{Cat}]^2$ exactly; the order drifts toward $1$ as the catalyst is diluted.)
:::
:::
