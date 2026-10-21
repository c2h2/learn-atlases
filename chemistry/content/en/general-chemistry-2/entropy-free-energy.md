A hot cup of coffee left on a table cools; the heat never flows back from the room to reboil it. A struck match burns down to ash and smoke, and no amount of waiting reassembles the wood. Ammonium nitrate, though, dissolves in cold water all by itself, and the beaker turns cold while it happens. If "systems fall towards lower energy" were the rule, the third observation would be impossible: dissolving $\mathrm{NH_4NO_3(s)}$ absorbs $28.1\ \mathrm{kJ\,mol^{-1}}$ from the surroundings, and yet it is spontaneous. Energy is not the whole story. This chapter supplies the missing half — entropy — and the bookkeeping device that combines the two, the Gibbs energy, which is what actually decides whether a reaction runs, how far it goes, and at what temperature it changes its mind.

The chapter is the hinge of the whole course. [[general-chemistry-2/chemical-equilibrium|Equilibrium]] told us *where* reactions stop, in terms of a constant $K$ whose values we could look up but could not predict. Here we will see that $K$ is not an independent fact about every reaction: it is a number computed from one energy, $\Delta_\mathrm{r}G^\circ$, by a single formula. The electrochemical cell of the next chapter is then the same free energy wearing a voltmeter, and the phase behaviour of [[general-chemistry-2/liquids-solutions|liquids and solutions]] was free energy all along.

## Spontaneous change, and why energy alone cannot decide it

::: definition Spontaneous process {#def-spontaneous}
A **spontaneous process** is one that, once started, proceeds on its own in an isolated or surrounding-held-fixed setting, without a continuing input of work from outside. A **nonspontaneous** process is one whose reverse is spontaneous. Spontaneity says nothing about *speed*: diamond turning to graphite is spontaneous at room temperature and takes geological time, and the rate of a reaction is the separate subject of [[general-chemistry-2/rates-intro|chemical kinetics]].
:::

The nineteenth-century hope was that spontaneous chemical change is always exothermic — that systems fall to lower enthalpy the way stones fall to lower gravitational potential energy. The thermochemistry of [[general-chemistry-1/thermochemistry|the previous course]] gives us the bookkeeping for heat, and it also gives us the counterexamples. Ice melts above $0\,^\circ\mathrm{C}$ while absorbing heat. Water evaporates. Ammonium nitrate and many other salts dissolve endothermically. Even some reactions that are strongly exothermic, like the formation of $\mathrm{NO(g)}$ from $\mathrm{N_2}$ and $\mathrm{O_2}$, run only to a tiny extent at room temperature. Enthalpy is one of two things that decide spontaneity, not the one thing.

::: warning Exothermic does not mean spontaneous {#warn-exothermic}
Four independent failure modes of the "$\Delta H < 0$ therefore spontaneous" rule are worth keeping straight, because every one of them appears in exams: (i) **endothermic spontaneous** processes — melting above the melting point, evaporation, the dissolution of $\mathrm{NH_4NO_3}$; (ii) **exothermic nonspontaneous** processes — $\mathrm{N_2 + O_2 \rightarrow 2\,NO}$ is endothermic, but its reverse is exothermic and still does not go at room temperature because the equilibrium lies overwhelmingly on the $\mathrm{N_2}$ side; (iii) processes driven by **mixing**, like two gases diffusing into each other, where no heat is involved at all; (iv) processes that are spontaneous only **above or below some temperature**, which no enthalpy-only rule can even express. The sign of $\Delta H$ is a tendency, not a criterion.
:::

::: example An endothermic process that is spontaneous {#ex-nh4no3}
For the dissolution $\mathrm{NH_4NO_3(s)} \rightarrow \mathrm{NH_4^+(aq)} + \mathrm{NO_3^-(aq)}$ at $298.15\ \mathrm{K}$, standard tabulated data (NIST-JANAF/CRC values) give $\Delta_\mathrm{sol}H^\circ = +28.1\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{sol}G^\circ = -4.2\ \mathrm{kJ\,mol^{-1}}$. Find the entropy change of the dissolution and explain in one sentence how an endothermic process can be spontaneous.
::: solution
At constant temperature, $\Delta G = \Delta H - T\Delta S$, so
$$
\Delta_\mathrm{sol}S^\circ = \frac{\Delta_\mathrm{sol}H^\circ - \Delta_\mathrm{sol}G^\circ}{T}
= \frac{28.1 - (-4.2)\ \mathrm{kJ\,mol^{-1}}}{298.15\ \mathrm{K}}
= \frac{32.3\times 10^{3}\ \mathrm{J\,mol^{-1}}}{298.15\ \mathrm{K}} = +108\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
The dissolution is spontaneous because the entropy increase — the ions gain translational freedom in solution and the overall disorder of the combined system-plus-surroundings grows — more than pays for the heat taken in: $T\Delta S = 32.3\ \mathrm{kJ\,mol^{-1}} > \Delta H$. The heat absorbed from the surroundings costs the surroundings entropy, but the system gains more than that back.
:::
:::

## Entropy and the second law

The fix is the **second law of thermodynamics**, which introduces a new state function whose total change — system plus surroundings — never decreases.

::: proposition The second law {#prop-second-law}
For any spontaneous change of the universe (system plus surroundings),
$$
\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} + \Delta S_\mathrm{surr} > 0,
$$
with equality at equilibrium. A process is spontaneous in the forward direction exactly when $\Delta S_\mathrm{univ} > 0$, impossible when $\Delta S_\mathrm{univ} < 0$, and at equilibrium when $\Delta S_\mathrm{univ} = 0$.
:::

What is entropy? Macroscopically, it is defined through reversible heat.

::: definition Entropy, macroscopic definition {#def-entropy-classical}
The **entropy** $S$ is a state function defined by $\mathrm{d}S = \delta q_\mathrm{rev}/T$: the change in $S$ between two states is $\Delta S = \int_\mathrm{rev} \delta q/T$, computed along *any* reversible path connecting them. Heat itself is not a state function, but heat divided by temperature, integrated reversibly, is — that is the content of the definition. For a reversible process $\Delta S_\mathrm{univ} = 0$; for an irreversible (spontaneous) one $\Delta S_\mathrm{univ} > 0$.
:::

::: definition Entropy, statistical definition {#def-entropy-boltzmann}
The **Boltzmann entropy** connects $S$ to molecular detail:
$$
S = k_\mathrm{B} \ln W,
$$
where $k_\mathrm{B} = 1.381\times 10^{-23}\ \mathrm{J\,K^{-1}}$ is Boltzmann's constant and $W$ is the number of microscopic arrangements (microstates) — ways of distributing the total energy among all the particles — compatible with the observed macroscopic state. A state with more microstates has higher entropy, and systems evolve towards macrostates with more microstates simply because those are overwhelmingly more probable.
:::

The statistical picture makes the "why" of entropy concrete without any machinery. Two gases separated by a stopcock: with $N \sim 10^{23}$ molecules, the fraction of microstates in which all the molecules happen to be on one side is $(1/2)^N \sim 10^{-3\times 10^{22}}$ — not unlikely, but *impossible for the age of the universe*. The gases mix because the mixed macrostate has essentially all the microstates. The same counting explains why heat flows hot to cold: spreading a fixed total energy over more ways of being arranged means more microstates, and the hot body loses fewer microstates by giving up $\delta q$ than the cold body gains, because $\delta q/T$ is larger at small $T$. That last sentence is the macroscopic statement $\Delta S = \delta q/T$ read statistically.

::: history From Clausius to Boltzmann to Gibbs {#hist-entropy}
Rudolf Clausius (Clausius) identified the quantity $\int \delta q/T$ in 1865, named it *entropy*, and wrote that "the entropy of the universe tends to a maximum". Ludwig Boltzmann (Boltzmann) gave the statistical interpretation $S = k \log W$ in 1877; the formula was engraved on his tombstone in Vienna after Max Planck (Planck) fixed the constant $k$ in 1900. Walther Nernst (Nernst) announced his heat theorem in 1906 — the entropy change of any isothermal process among condensed phases vanishes at absolute zero — which Max Planck restated as the **third law**: a perfect crystal has $S = 0$ at $0\ \mathrm{K}$, giving entropy an absolute zero and making tabulated $S^\circ$ values possible. Josiah Willard Gibbs (Gibbs) built the whole synthesis in 1876 in *On the Equilibrium of Heterogeneous Substances*, and Gilbert Lewis and Merle Randall's textbook of 1923 made "free energy" the working chemist's vocabulary.
:::

::: warning "Disorder" is a metaphor, not a definition {#warn-disorder}
Textbooks shorten $S = k_\mathrm{B}\ln W$ to "entropy is disorder", and the shorthand misleads whenever it is used as a definition. Entropy is *the number of ways of arranging a given energy*, and energy-spreading can increase $W$ in states that look perfectly ordered to the eye: a crystal of CO at $0\ \mathrm{K}$ has residual entropy because the molecules may point either way; liquid crystals are optically ordered yet fluid; and the "orderly" unmixing of a supercooled solution is driven by the entropy of the *surroundings*, which the metaphor hides. Use the metaphor as a memory aid for gas expansion and mixing, and drop it the moment a real prediction is needed — the counting, or the tables, are never ambiguous.
:::

To compute $\Delta S$ for real processes we need numbers, and the third law supplies them: absolute entropies $S^\circ$ are tabulated (standard state $p^\circ = 1\ \mathrm{bar}$, and for solutes $1\ \mathrm{mol\,dm^{-3}}$), with $S = 0$ at $0\ \mathrm{K}$ for a perfect crystal. Two building blocks generate all of them.

::: proposition Entropy changes for heating and phase transitions {#prop-entropy-change}
Reversibly heating a substance at constant pressure from $T_1$ to $T_2$ gives
$$
\Delta S = \int_{T_1}^{T_2} \frac{C_p}{T}\,\mathrm{d}T \approx C_p \ln\frac{T_2}{T_1}
$$
for constant $C_p$; and a reversible phase transition at temperature $T_\mathrm{tr}$ gives
$$
\Delta_\mathrm{tr}S = \frac{\Delta_\mathrm{tr}H}{T_\mathrm{tr}},
$$
because at the transition temperature the two phases are in equilibrium, so $\Delta S_\mathrm{univ} = 0$ and the system's entropy gain is exactly the heat absorbed divided by $T$.
:::

::: example Entropy accounting for water {#ex-water-entropy}
Using tabulated data $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ at $273.15\ \mathrm{K}$, $\Delta_\mathrm{vap}H = 40.65\ \mathrm{kJ\,mol^{-1}}$ at $373.15\ \mathrm{K}$, and $C_{p,\mathrm{m}}(\mathrm{l}) \approx 75.3\ \mathrm{J\,K^{-1}\,mol^{-1}}$, find the entropy changes for (a) melting ice at $0\,^\circ\mathrm{C}$, (b) vaporising water at $100\,^\circ\mathrm{C}$, and (c) heating the liquid from $0$ to $100\,^\circ\mathrm{C}$.
::: solution
(a) $\Delta_\mathrm{fus}S = 6010/273.15 = 22.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
(b) $\Delta_\mathrm{vap}S = 40\,650/373.15 = 108.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
(c) $\Delta S = 75.3 \times \ln(373.15/273.15) = 75.3 \times 0.3120 = 23.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
Note the pattern: vaporisation dominates, because it creates roughly a thousand-fold volume increase and a huge gain in microstates; fusion is much smaller, because the liquid is already dense. Most liquids vaporise with $\Delta_\mathrm{vap}S$ near $85$–$106\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (a rule of thumb due to Henry Trouton, and empirical); water's $109$ sits above the range because vaporising it destroys hydrogen bonds as well as structure.
:::
:::

::: example Reaction entropy from tables: ammonia {#ex-haber-entropy}
For $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$, use the tabulated standard entropies $S^\circ(\mathrm{N_2}) = 191.6$, $S^\circ(\mathrm{H_2}) = 130.7$, $S^\circ(\mathrm{NH_3}) = 192.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$ to calculate $\Delta_\mathrm{r}S^\circ$, and check the sign against chemical intuition.
::: solution
$$
\Delta_\mathrm{r}S^\circ = 2(192.8) - \left[191.6 + 3(130.7)\right]
= 385.6 - 583.7 = -198.1\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
Strongly negative, as expected: four moles of gas become two, and fewer gas molecules means far fewer ways of distributing energy. The rule of thumb — $\Delta_\mathrm{r}S^\circ$ is dominated by the change in the number of moles of gas, roughly $+140$ to $+160\ \mathrm{J\,K^{-1}\,mol^{-1}}$ per mole of gas produced — is worth having for order-of-magnitude checks, but the tables are the authority.
:::
:::

::: quiz
Which quantity is guaranteed positive for every spontaneous process?
- [x] $\Delta S_\mathrm{univ}$, the entropy change of system plus surroundings.
- [ ] $\Delta S_\mathrm{sys}$, the entropy change of the system.
- [ ] $\Delta H_\mathrm{sys}$, the enthalpy change of the system.
- [ ] The entropy change of the system minus that of the surroundings.
::: solution
Only the second law's total, $\Delta S_\mathrm{univ}$, is guaranteed positive. Freezing water below $0\,^\circ\mathrm{C}$ is spontaneous while the *system* loses entropy; the surroundings gain more. Exothermic processes have $\Delta H < 0$, not $>0$, and spontaneity does not fix the sign of $\Delta H$ at all.
:::
:::

## Free energy: the criterion at constant temperature and pressure

Tracking the surroundings is awkward in the laboratory, where we control temperature and pressure, not the universe. The trick is to convert the second law into a statement about the system alone. If the system releases heat $\delta q_\mathrm{sys} = -\delta q_\mathrm{surr}$ to surroundings at temperature $T$, then $\Delta S_\mathrm{surr} = -\Delta H_\mathrm{sys}/T$ (at constant pressure the heat the system gives out is $-\Delta H_\mathrm{sys}$), so

$$
\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} - \frac{\Delta H_\mathrm{sys}}{T}
= -\frac{1}{T}\left(\Delta H_\mathrm{sys} - T\Delta S_\mathrm{sys}\right).
$$

The bracketed combination is the new state function we need.

::: definition Gibbs energy and Helmholtz energy {#def-gibbs}
The **Gibbs energy** is $G \equiv H - TS$, and the **Helmholtz energy** is $A \equiv U - TS$. Both are state functions. For a process at constant temperature, $\Delta G = \Delta H - T\Delta S$ and $\Delta A = \Delta U - T\Delta S$.
:::

::: proposition The Gibbs criterion {#prop-gibbs-criterion}
For a process at constant temperature and pressure, capable of no non-expansion work,
$$
\Delta G < 0 \iff \text{spontaneous}, \qquad
\Delta G = 0 \iff \text{equilibrium}, \qquad
\Delta G > 0 \iff \text{nonspontaneous}.
$$
At constant temperature and volume the analogous criterion uses $\Delta A$.
:::

::: proof
At constant $T$ and $p$, the surroundings exchange only $pV$-work and heat, so $\Delta S_\mathrm{surr} = -\Delta H_\mathrm{sys}/T$ and
$$
\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} - \frac{\Delta H_\mathrm{sys}}{T}
= -\frac{\Delta H_\mathrm{sys} - T\Delta S_\mathrm{sys}}{T}
= -\frac{\Delta G_\mathrm{sys}}{T},
$$
where the last step uses $G \equiv H - TS$ at constant $T$. Since $T > 0$ and $\Delta S_\mathrm{univ} > 0$ for a spontaneous change by the second law, $\Delta G_\mathrm{sys} < 0$; equality holds at equilibrium. The Helmholtz form follows identically from $\Delta U$ and constant volume.
:::

The name "free energy" is literal: $\Delta G$ is the maximum non-expansion work a process can deliver at constant $T$ and $p$ — the maximum electrical work of a battery, which is exactly what [[general-chemistry-2/electrochemistry-intro|the next chapter]] measures. A negative $\Delta G$ is not a promise of speed; it only says the process is thermodynamically willing.

::: example When does ice melt? {#ex-ice-melting}
With $\Delta_\mathrm{fus}H = 6.01\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{fus}S = 22.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (assumed temperature-independent over this small range), compute $\Delta G_\mathrm{fus}$ at $283.15\ \mathrm{K}$ ($10\,^\circ\mathrm{C}$) and at $263.15\ \mathrm{K}$ ($-10\,^\circ\mathrm{C}$), and interpret.
::: solution
At $283.15\ \mathrm{K}$: $\Delta G = 6010 - 283.15 \times 22.0 = 6010 - 6229 = -219\ \mathrm{J\,mol^{-1}} < 0$: ice melts spontaneously above $0\,^\circ\mathrm{C}$.
At $263.15\ \mathrm{K}$: $\Delta G = 6010 - 263.15 \times 22.0 = +219\ \mathrm{J\,mol^{-1}} > 0$: melting is nonspontaneous and freezing is spontaneous below $0\,^\circ\mathrm{C}$.
The crossover is at $T = \Delta H/\Delta S = 6010/22.0 = 273\ \mathrm{K}$ — the melting point itself. This is the general shape of every phase transition and many reactions: $\Delta H$ and $\Delta S$ have the same sign, and temperature picks the winner.
:::
:::

::: widget plot
f: dH - dS*x/1000
x: 0, 2000
y: -250, 300
sliders: dH=178:0:300:1; dS=161:-400:400:1
labels: \Delta_r G \text{ / } \mathrm{kJ\,mol^{-1}}
vlines: 1106
caption: The Gibbs energy change $\Delta_r G = \Delta_r H - T\Delta_r S$ as a function of temperature for a reaction whose enthalpy and entropy changes (the sliders, in $\mathrm{kJ\,mol^{-1}}$ and $\mathrm{J\,K^{-1}\,mol^{-1}}$) are both positive — the calcium carbonate decomposition of the worked example below. The line crosses zero at $T = \Delta_r H/\Delta_r S$, the crossover temperature: below it the reaction is nonspontaneous, above it spontaneous. Slide $\Delta S$ negative to see a line that never crosses: with $\Delta H > 0$ and $\Delta S < 0$ a reaction is nonspontaneous at every temperature.
:::

## Free energy of reaction: $\Delta G^\circ$, $\Delta G$, and the direction of change

Just as enthalpies of formation let us compute any $\Delta_\mathrm{r}H^\circ$, **standard Gibbs energies of formation** $\Delta_\mathrm{f}G^\circ$ let us compute any $\Delta_\mathrm{r}G^\circ$: the free-energy change when one mole of a compound forms from its elements in their reference states, all at standard state ($p^\circ = 1\ \mathrm{bar}$; solutes $1\ \mathrm{mol\,dm^{-3}}$), with $\Delta_\mathrm{f}G^\circ = 0$ for elements by definition.

::: definition Standard Gibbs energy of reaction {#def-drg}
$\Delta_\mathrm{r}G^\circ = \sum_\text{products} \nu_i\, \Delta_\mathrm{f}G^\circ_i - \sum_\text{reactants} \nu_i\, \Delta_\mathrm{f}G^\circ_i$, computable equally from $\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$ using tabulated $\Delta_\mathrm{f}H^\circ$ and $S^\circ$. Both routes must agree; where tables differ, they differ only at the level of their last digits.
:::

Crucially, $\Delta_\mathrm{r}G^\circ$ is the free-energy change *between pure, standard-state reactants and pure, standard-state products* — not the change along the actual path a mixture takes as it approaches equilibrium. The actual driving force depends on composition:

::: proposition The reaction-direction criterion {#prop-dg-q}
For a reaction with reaction quotient $Q$ (activities: pressures divided by $p^\circ$, concentrations by $c^\circ$),
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT \ln Q .
$$
The reaction proceeds spontaneously forward when $\Delta_\mathrm{r}G < 0$, i.e. when $Q < K$ — the same direction rule as the reaction quotient of [[general-chemistry-2/chemical-equilibrium|the equilibrium chapter]], now with a quantitative driving force attached.
:::

::: example Standard does not mean spontaneous {#ex-n2o4-direction}
For $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$, tabulated $\Delta_\mathrm{f}G^\circ$ values ($97.89$ and $51.31\ \mathrm{kJ\,mol^{-1}}$) give $\Delta_\mathrm{r}G^\circ = +4.73\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. A flask holds $p(\mathrm{N_2O_4}) = 1.00\ \mathrm{bar}$ and $p(\mathrm{NO_2}) = 0.10\ \mathrm{bar}$. Which way does the reaction go?
::: solution
$$
Q = \frac{\left[p(\mathrm{NO_2})/p^\circ\right]^2}{p(\mathrm{N_2O_4})/p^\circ} = \frac{0.10^2}{1.00} = 0.010,
$$
$$
\Delta_\mathrm{r}G = 4.73 + \frac{8.314 \times 298.15 \times \ln 0.010}{1000}
= 4.73 - 11.4 = -6.7\ \mathrm{kJ\,mol^{-1}}.
$$
Forward, despite $\Delta_\mathrm{r}G^\circ > 0$: the mixture is far from equilibrium and dilute in $\mathrm{NO_2}$, and the $RT\ln Q$ term — the free energy of mixing and expansion — dominates. A positive $\Delta_\mathrm{r}G^\circ$ means only that *standard-state* pure $\mathrm{N_2O_4}$ would not fully convert to standard-state pure $\mathrm{NO_2}$; it does not forbid the reaction from running in a dilute mixture.
:::
:::

::: warning $\Delta G^\circ$ is not the direction of the reaction {#warn-dg-vs-dg0}
The single most common error in this chapter is reading the sign of $\Delta_\mathrm{r}G^\circ$ as the direction a given mixture will run. $\Delta_\mathrm{r}G^\circ$ predicts the *position* of equilibrium ($K$), not the direction of change from an arbitrary starting mixture — that is $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$. A reaction with $\Delta_\mathrm{r}G^\circ = +100\ \mathrm{kJ\,mol^{-1}}$ runs vigorously forward if $Q$ is small enough; a reaction with $\Delta_\mathrm{r}G^\circ = -100\ \mathrm{kJ\,mol^{-1}}$ runs backwards if the products are present far above their equilibrium amounts. Also remember that a catalyst changes neither $\Delta G$ nor $\Delta G^\circ$ — it lowers the barrier to both directions equally and speeds the arrival at equilibrium without moving it.
:::

## The bridge to equilibrium: $\Delta_\mathrm{r}G^\circ = -RT\ln K$

::: proposition The central relation {#prop-dg-k}
The standard Gibbs energy change of a reaction and its equilibrium constant are linked by
$$
\Delta_\mathrm{r}G^\circ = -RT \ln K
\qquad\Longleftrightarrow\qquad
K = e^{-\Delta_\mathrm{r}G^\circ/RT}.
$$
A reaction with $\Delta_\mathrm{r}G^\circ = -RT\ln 10 \approx -5.7\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$ has $K = 10$; every additional $-5.7\ \mathrm{kJ\,mol^{-1}}$ multiplies $K$ by ten.
:::

::: proof
At equilibrium the system can go no further: $\Delta_\mathrm{r}G = 0$ and $Q = K$. Substituting into $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ gives $0 = \Delta_\mathrm{r}G^\circ + RT\ln K$, which is the relation. (The deeper content — that the same $K$ appears in the kinetics of [[general-chemistry-2/chemical-equilibrium|mass action]] and here — is that both express the condition $\Delta S_\mathrm{univ} = 0$; statistical mechanics proves it from molecular partition functions, see [[statistical-thermodynamics/equilibrium-from-molecules]].)
:::

::: example Why the air is not nitric oxide {#ex-no-k}
For $\mathrm{N_2(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{NO(g)}$, $\Delta_\mathrm{f}G^\circ(\mathrm{NO}) = 86.6\ \mathrm{kJ\,mol^{-1}}$, so $\Delta_\mathrm{r}G^\circ = +173.2\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. Calculate $K$ and interpret.
::: solution
$$
K = \exp\!\left(-\frac{173.2\times 10^{3}}{8.314 \times 298.15}\right)
= e^{-69.8} = 4.5 \times 10^{-31}.
$$
At room temperature the equilibrium mixture of $\mathrm{N_2}$ and $\mathrm{O_2}$ contains a fraction $10^{-30}$-odd of $\mathrm{NO}$: air is thermodynamically stable against oxidation, which is why we exist. The same relation explains why internal-combustion engines make $\mathrm{NO}$ at all: at $2400\ \mathrm{K}$ the exponent is only $-173.2\times10^3/(8.314\times2400) = -8.7$, $K \approx 2\times10^{-4}$ — small, but no longer zero, and the hot gas freezes compositionally as it cools too fast to re-equilibrate.
:::
:::

::: proposition Temperature dependence and the crossover temperature {#prop-crossover}
If $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ are roughly constant over a temperature range, then $\Delta_\mathrm{r}G^\circ(T) \approx \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$, and
$$
\ln K = -\frac{\Delta_\mathrm{r}H^\circ}{R}\cdot\frac{1}{T} + \frac{\Delta_\mathrm{r}S^\circ}{R}.
$$
A plot of $\ln K$ against $1/T$ (a van 't Hoff plot) is a straight line of slope $-\Delta_\mathrm{r}H^\circ/R$; and a reaction with $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ of the same sign changes spontaneity at $T^* = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$.
:::

::: proof
Combine $\Delta_\mathrm{r}G^\circ = -RT\ln K$ with $\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$ and divide by $-RT$:
$$
\ln K = -\frac{\Delta_\mathrm{r}G^\circ}{RT} = -\frac{\Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ}{RT}
= -\frac{\Delta_\mathrm{r}H^\circ}{RT} + \frac{\Delta_\mathrm{r}S^\circ}{R}.
$$
The van 't Hoff line follows; the crossover follows because $\Delta_\mathrm{r}G^\circ = 0$ (that is, $K = 1$) exactly when $T = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$. The assumption that $\Delta H$ and $\Delta S$ are temperature-independent is the same approximation that makes calorimetry over small ranges easy, and it fails near phase transitions of the reactants or products.
:::

::: example Roasting limestone: the crossover calculation {#ex-caco3}
For $\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$, tabulated data give $\Delta_\mathrm{r}H^\circ = +178.3\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = +160.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (from $\Delta_\mathrm{f}H^\circ$: $-635.1 - 393.5 + 1206.9$; from $S^\circ$: $39.8 + 213.8 - 92.9$). Find the crossover temperature, the equilibrium $\mathrm{CO_2}$ pressure at $298.15\ \mathrm{K}$, and at $1200\ \mathrm{K}$.
::: solution
Crossover: $T^* = 178.3\times10^{3}/160.7 = 1110\ \mathrm{K}$ ($837\,^\circ\mathrm{C}$). At $298.15\ \mathrm{K}$,
$$
\Delta_\mathrm{r}G^\circ = 178.3 - 298.15 \times 0.1607 = 130.4\ \mathrm{kJ\,mol^{-1}},
\qquad
K = e^{-52.6} = 1.4 \times 10^{-23}.
$$
Because the solids are pure, $K = p(\mathrm{CO_2})/p^\circ$: limestone at room temperature sits under an equilibrium carbon dioxide pressure of $10^{-23}\ \mathrm{bar}$ — it is stable beyond any practical meaning. At $1200\ \mathrm{K}$, $\Delta_\mathrm{r}G^\circ = 178.3 - 1200\times0.1607 = -14.5\ \mathrm{kJ\,mol^{-1}}$ and $K = e^{1.46} = 4.3$: above $T^*$ the decomposition drives $\mathrm{CO_2}$ out at more than four bar, which is why a lime kiln runs hot and vented. The same numbers explain the reverse process — carbonation of lime — below $T^*$.
:::
:::

::: widget plot
f: -dH*1000/(8.314*x) + dS/8.314
x: 250, 2000
y: -60, 60
sliders: dH=178:0:300:1; dS=161:-400:400:1
labels: \ln K
vlines: 1110
caption: The van 't Hoff line $\ln K = -\Delta_\mathrm{r}H^\circ/(RT) + \Delta_\mathrm{r}S^\circ/R$ against temperature (the sliders set $\Delta_\mathrm{r}H^\circ$ in $\mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$). The curve crosses $\ln K = 0$ at the crossover temperature $T^* = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$; for the limestone values shown, $1110\ \mathrm{K}$. The curvature in $T$ is only apparent — the line is straight in $1/T$ — and an exothermic reaction ($\Delta_\mathrm{r}H^\circ < 0$) shows $K$ *decreasing* with temperature, Le Chatelier's rule for heat now in equation form.
:::

::: widget contour
f: dH - y*x/1000
x: 200, 2000
y: -400, 400
sliders: dH=178:0:300:1
constraint: dH - y*x/1000
gradient: false
caption: The sign map of $\Delta_r G = \Delta_r H - T\Delta_r S$ (colour) over temperature $T$ (horizontal axis, K) and entropy change $\Delta_r S$ (vertical axis, $\mathrm{J\,K^{-1}\,mol^{-1}}$) at fixed $\Delta_r H$ (slider, $\mathrm{kJ\,mol^{-1}}$). The drawn constraint curve $\Delta_r G = 0$ is the hyperbola $T = \Delta_r H/\Delta_r S$: the crossover locus. Below it the reaction is spontaneous, above it not; large positive $\Delta_r S$ makes almost any endothermic reaction spontaneous at high temperature, and large negative $\Delta_r S$ forbids it.
:::

One consequence deserves its own statement, because it is how nature and industry run uphill reactions: **free energies add**. If reaction 1 has $\Delta_\mathrm{r}G^\circ = +100\ \mathrm{kJ\,mol^{-1}}$ and reaction 2, sharing an intermediate, has $-130\ \mathrm{kJ\,mol^{-1}}$, the sum has $-30\ \mathrm{kJ\,mol^{-1}}$ and can be made to go. Living cells pay for every endergonic step by coupling it to ATP hydrolysis ($\Delta_\mathrm{r}G \approx -31\ \mathrm{kJ\,mol^{-1}}$ under cellular conditions); a blast furnace pays for the reduction of iron ore by burning carbon.

::: example Coupling: carbon as the universal reductant {#ex-boudouard}
For $\mathrm{C(s)} + \mathrm{CO_2(g)} \rightarrow 2\,\mathrm{CO(g)}$, use $\Delta_\mathrm{f}G^\circ(\mathrm{CO}) = -137.2$, $\Delta_\mathrm{f}G^\circ(\mathrm{CO_2}) = -394.4$, $\Delta_\mathrm{f}H^\circ(\mathrm{CO}) = -110.5$, $\Delta_\mathrm{f}H^\circ(\mathrm{CO_2}) = -393.5\ \mathrm{kJ\,mol^{-1}}$ and $S^\circ$: $\mathrm{C(s)}\ 5.7$, $\mathrm{CO_2}\ 213.8$, $\mathrm{CO}\ 197.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Compute $\Delta_\mathrm{r}G^\circ$ at $298.15\ \mathrm{K}$ and the crossover temperature, and explain why hot carbon reduces almost anything.
::: solution
$\Delta_\mathrm{r}G^\circ(298) = 2(-137.2) + 394.4 = +120.0\ \mathrm{kJ\,mol^{-1}}$: nonspontaneous at room temperature.
$\Delta_\mathrm{r}H^\circ = 2(-110.5) + 393.5 = +172.5\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = 2(197.7) - 5.7 - 213.8 = +175.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so $T^* = 172.5\times10^{3}/175.9 = 981\ \mathrm{K}$. Above about $700\,^\circ\mathrm{C}$, carbon plus any metal oxide whose own decomposition line lies below carbon's on an $\Delta_\mathrm{r}G$-versus-$T$ chart (an Ellingham diagram — the same two lines, plotted for oxide formation) is reduced by carbon, because the sum of the oxide decomposition (uphill, small $\Delta G$) and this reaction (downhill above $981\ \mathrm{K}$) is downhill. That single crossover is the reason iron is smelted with coke and not with hydrogen economics alone.
:::
:::

::: quiz
A reaction has $\Delta_\mathrm{r}G^\circ = +12.0\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$. Which statement is correct?
- [x] $K < 1$: at equilibrium the standard-state mixture favours reactants, but starting from pure reactants the reaction still proceeds part-way.
- [ ] The reaction cannot occur under any conditions.
- [ ] $K > 1$: the positive sign means products are favoured.
- [ ] The reaction is necessarily very slow.
::: solution
$K = e^{-12\,000/(8.314\times298.15)} = e^{-4.84} = 0.0079 < 1$: standard-state equilibrium favours reactants, but from pure reactants $Q = 0$ and $\Delta_\mathrm{r}G < 0$ until $Q$ climbs to $K$ — the reaction goes part-way, as every equilibrium does. Thermodynamics says nothing about rate, so neither "cannot occur" nor "slow" follows.
:::
:::

## Where this leads

The relation $\Delta_\mathrm{r}G^\circ = -RT\ln K$ converts the equilibrium chapter's tables of $K$ into one continuous free-energy surface; the same $\Delta_\mathrm{r}G$ measured electrically is the cell potential of [[general-chemistry-2/electrochemistry-intro|electrochemistry]]. For the molecular meaning of $S = k_\mathrm{B}\ln W$ see [[statistical-thermodynamics/boltzmann-distribution]], and for the full thermodynamic treatment of $G$, chemical potential and the phase rule, [[thermodynamics/second-law]], [[thermodynamics/free-energy]] and [[thermodynamics/reaction-equilibrium]]. The heat and work bookkeeping assumed here is [[general-chemistry-1/thermochemistry|thermochemistry]]; the solubility and acid–base equilibria of [[general-chemistry-2/acids-bases|acids]], [[general-chemistry-2/buffers-titrations|buffers]] and [[general-chemistry-2/solubility-equilibria|sparingly soluble salts]] are all particular values of one $\Delta_\mathrm{r}G^\circ$.

::: summary
- Spontaneity is decided by $\Delta S_\mathrm{univ} > 0$, not by $\Delta H$; endothermic processes can be spontaneous because the entropy of the universe, not of the system, must increase.
- Entropy is $S = k_\mathrm{B}\ln W$, the logarithm of the number of microstates; the third law fixes its zero and makes tabulated $S^\circ$ absolute.
- At constant $T$ and $p$ the criterion becomes $\Delta G = \Delta H - T\Delta S < 0$; $\Delta G = 0$ is equilibrium, and $\Delta G$ is the maximum non-expansion work.
- $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ gives the direction from any mixture; $\Delta_\mathrm{r}G^\circ$ alone gives only the equilibrium position, never the direction or the rate.
- $\Delta_\mathrm{r}G^\circ = -RT\ln K$: every $-5.7\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$ multiplies $K$ by ten.
- $\ln K$ is linear in $1/T$ with slope $-\Delta_\mathrm{r}H^\circ/R$; reactions with $\Delta H$ and $\Delta S$ of like sign switch spontaneity at $T^* = \Delta H/\Delta S$.
- Free energies add, so endergonic reactions are driven by coupling to exergonic ones — ATP in cells, carbon in the blast furnace.
:::

## Exercises

::: exercise Predicting entropy signs {level=1}
Predict the sign of $\Delta_\mathrm{r}S^\circ$ for: (a) iodine subliming; (b) $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightarrow 2\,\mathrm{NH_3(g)}$; (c) $\mathrm{CaO(s)} + \mathrm{CO_2(g)} \rightarrow \mathrm{CaCO_3(s)}$; (d) $\mathrm{NaCl(s)}$ dissolving in water. Which sign is hardest to call, and why?
::: solution
(a) Positive — a mole of gas appears, and gases carry by far the largest entropies. (b) Negative — four moles of gas become two. (c) Negative — a mole of gas is consumed. (d) Hardest: the crystal lattice is destroyed (entropy gain) but water orders around the ions (entropy loss); the tabulated answer is positive but modest ($+72\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{NaCl}$), and for some salts (e.g. $\mathrm{CaF_2}$) it is negative. Counting gas moles is a reliable rule for (a)–(c) and useless for (d).
:::
:::

::: exercise Reaction entropy from tables {level=1 check="-188.0"}
For $2\,\mathrm{SO_2(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{SO_3(g)}$ use $S^\circ(\mathrm{SO_2}) = 248.2$, $S^\circ(\mathrm{O_2}) = 205.2$, $S^\circ(\mathrm{SO_3}) = 256.8\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Enter $\Delta_\mathrm{r}S^\circ$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.
::: solution
$\Delta_\mathrm{r}S^\circ = 2(256.8) - [2(248.2) + 205.2] = 513.6 - 701.6 = -188.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Three moles of gas become two, and the sign matches.
:::
:::

::: exercise Free energy of combustion {level=1 check="-817.9"}
Using $\Delta_\mathrm{f}G^\circ$: $\mathrm{CH_4(g)}\ -50.7$, $\mathrm{CO_2(g)}\ -394.4$, $\mathrm{H_2O(l)}\ -237.1\ \mathrm{kJ\,mol^{-1}}$, compute $\Delta_\mathrm{r}G^\circ$ for $\mathrm{CH_4(g)} + 2\,\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)} + 2\,\mathrm{H_2O(l)}$ at $298.15\ \mathrm{K}$. Enter the value in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$\Delta_\mathrm{r}G^\circ = (-394.4) + 2(-237.1) - (-50.7) - 0 = -817.9\ \mathrm{kJ\,mol^{-1}}$. The maximum electrical work a fuel cell could extract from a mole of methane is $817.9\ \mathrm{kJ}$ — less than the $890\ \mathrm{kJ}$ of heat from burning it, because $\Delta_\mathrm{r}S^\circ = (\Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ)/T = -243\ \mathrm{J\,K^{-1}\,mol^{-1}} < 0$: even an ideal fuel cell must expel $T|\Delta S| = 72.5\ \mathrm{kJ}$ as waste heat to make the entropy balance work, and burning the gas expels it all.
:::
:::

::: exercise The crossover of sulfur trioxide formation {level=2 check="1052"}
For $2\,\mathrm{SO_2(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{SO_3(g)}$, $\Delta_\mathrm{r}H^\circ = -197.8\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = -188.0\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Compute $\Delta_\mathrm{r}G^\circ$ at $298.15\ \mathrm{K}$ and the temperature above which the reaction becomes nonspontaneous. Enter that temperature in K.
::: solution
$\Delta_\mathrm{r}G^\circ(298) = -197.8 - 298.15(-0.1880) = -197.8 + 56.1 = -141.7\ \mathrm{kJ\,mol^{-1}}$: spontaneous at room temperature. Both signs negative, so the crossover is $T^* = 197.8\times10^{3}/188.0 = 1052\ \mathrm{K}$; above it the entropy penalty of losing a mole of gas outweighs the enthalpy and $\mathrm{SO_3}$ decomposes. The contact process therefore runs at a compromise $700$–$750\ \mathrm{K}$: far enough below $T^*$ for a good $K$, hot enough for acceptable rate with a catalyst.
:::
:::

::: exercise Equilibrium constant from free energy {level=2 check="3190"}
A reaction has $\Delta_\mathrm{r}G^\circ = -20.0\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. Compute $K$. Enter $K$ to three significant figures.
::: solution
$K = \exp\!\left(\dfrac{20\,000}{8.314 \times 298.15}\right) = e^{8.07} = 3.19 \times 10^{3}$. Note the leverage: a modest $-20\ \mathrm{kJ\,mol^{-1}}$ is a thousand-fold product preference, and the "roughly $-5.7\ \mathrm{kJ\,mol^{-1}}$ per factor of ten" rule gives $20/5.7 \approx 3.5$ decades, the right ballpark.
:::
:::

::: exercise Direction from a mixture {level=2 check="-64.4"}
For $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$, $\Delta_\mathrm{r}G^\circ = -32.9\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$. A reactor holds $p(\mathrm{N_2}) = 10\ \mathrm{bar}$, $p(\mathrm{H_2}) = 30\ \mathrm{bar}$, $p(\mathrm{NH_3}) = 5\ \mathrm{bar}$. Compute $\Delta_\mathrm{r}G$ and say which way the reaction runs. Enter $\Delta_\mathrm{r}G$ in $\mathrm{kJ\,mol^{-1}}$.
::: solution
$Q = \dfrac{5^2}{10 \times 30^4} = 3.09 \times 10^{-6}$, so
$\Delta_\mathrm{r}G = -32.9 + 8.314\times298.15\times\ln(3.09\times10^{-6})/1000 = -32.9 - 31.5 = -64.4\ \mathrm{kJ\,mol^{-1}}$.
Strongly forward: high pressures of the lean-in-reactants mixture push $RT\ln Q$ far negative. This is why the Haber process feeds fresh, compressed $\mathrm{N_2}$ and $\mathrm{H_2}$ and removes ammonia — keeping $Q$ below $K$ keeps $\Delta_\mathrm{r}G$ negative and the flow going.
:::
:::

::: exercise The lime kiln, quantitatively {level=3}
For $\mathrm{CaCO_3(s)} \rightleftharpoons \mathrm{CaO(s)} + \mathrm{CO_2(g)}$ take $\Delta_\mathrm{r}H^\circ = +178.3\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = +160.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$ as temperature-independent. (a) Find the crossover temperature. (b) Find the equilibrium $\mathrm{CO_2}$ pressure at $298.15\ \mathrm{K}$ and at $1200\ \mathrm{K}$. (c) A kiln is vented to the atmosphere where $p(\mathrm{CO_2}) \approx 4\times10^{-4}\ \mathrm{bar}$: at what temperature does decomposition become spontaneous *there*?
::: solution
(a) $T^* = 178.3\times10^{3}/160.7 = 1110\ \mathrm{K}$.
(b) At $298.15\ \mathrm{K}$, $\Delta_\mathrm{r}G^\circ = 130.4\ \mathrm{kJ\,mol^{-1}}$ and $K = e^{-52.6} = 1.4\times10^{-23}$; since the solids are pure, $K = p(\mathrm{CO_2})/p^\circ$, so $p_\mathrm{eq} = 1.4\times10^{-23}\ \mathrm{bar}$. At $1200\ \mathrm{K}$, $\Delta_\mathrm{r}G^\circ = -14.5\ \mathrm{kJ\,mol^{-1}}$ and $p_\mathrm{eq} = 4.3\ \mathrm{bar}$.
(c) Decomposition is spontaneous when $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q < 0$ with $Q = p(\mathrm{CO_2})/p^\circ = 4\times10^{-4}$. Since $\ln(4\times10^{-4}) = -7.82$,
$$
\Delta_\mathrm{r}G = \left[178.3 - 0.1607\,T\right] + 8.314\times10^{-3}\,T\times(-7.82) = 178.3 - 0.2257\,T,
$$
which vanishes at $T = 178.3/0.2257 = 790\ \mathrm{K}$. Decomposition in air becomes spontaneous already near $790\ \mathrm{K}$ ($517\,^\circ\mathrm{C}$), far below the $1110\ \mathrm{K}$ needed to force $\mathrm{CO_2}$ out against one bar: venting the kiln is a Le Chatelier move, now quantified by the $RT\ln Q$ term.
:::
:::

::: exercise Derive the central relation {level=3}
Starting from $\Delta S_\mathrm{univ} = \Delta S_\mathrm{sys} - \Delta H_\mathrm{sys}/T$ for the surroundings and the definition $G = H - TS$, derive $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ for a mixture of ideal gases, using only the entropy of mixing $\Delta_\mathrm{mix}S = -nR\sum_i x_i \ln x_i$ applied to compressing each reactant and product from the standard state to its partial pressure. Then deduce $\Delta_\mathrm{r}G^\circ = -RT\ln K$.
::: solution
For one mole of an ideal gas taken from the standard pressure $p^\circ$ to partial pressure $p_i$, the entropy change is $R\ln(p^\circ/p_i)$ (expansion into a larger volume), so the free-energy change is $\Delta G_i = RT\ln(p_i/p^\circ)$ (no enthalpy change for an ideal gas at constant $T$). Summing with stoichiometric coefficients over products minus reactants,
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\sum_i \nu_i \ln\frac{p_i}{p^\circ}
= \Delta_\mathrm{r}G^\circ + RT\ln Q, \qquad
Q = \prod_i \left(\frac{p_i}{p^\circ}\right)^{\nu_i}.
$$
At equilibrium $\Delta_\mathrm{r}G = 0$ and $Q = K$, hence $\Delta_\mathrm{r}G^\circ = -RT\ln K$. The whole bridge between energetics and equilibrium is one line of mixing entropy — which is also why $Q$ appears as a product of powers: entropy is additive, so its logarithms multiply.
:::
:::

::: exercise Coupling and the Ellingham logic {level=3 check="981"}
For $\mathrm{C(s)} + \mathrm{CO_2(g)} \rightarrow 2\,\mathrm{CO(g)}$ use $\Delta_\mathrm{f}H^\circ(\mathrm{CO}) = -110.5$, $\Delta_\mathrm{f}H^\circ(\mathrm{CO_2}) = -393.5\ \mathrm{kJ\,mol^{-1}}$; $\Delta_\mathrm{f}G^\circ(\mathrm{CO}) = -137.2$, $\Delta_\mathrm{f}G^\circ(\mathrm{CO_2}) = -394.4\ \mathrm{kJ\,mol^{-1}}$; $S^\circ(\mathrm{C}) = 5.7$, $S^\circ(\mathrm{CO_2}) = 213.8$, $S^\circ(\mathrm{CO}) = 197.7\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Compute $\Delta_\mathrm{r}G^\circ$ at $298.15\ \mathrm{K}$ and the crossover temperature. Enter the crossover temperature in K.
::: solution
$\Delta_\mathrm{r}G^\circ(298) = 2(-137.2) + 394.4 = +120.0\ \mathrm{kJ\,mol^{-1}}$; $\Delta_\mathrm{r}H^\circ = +172.5\ \mathrm{kJ\,mol^{-1}}$, $\Delta_\mathrm{r}S^\circ = +175.9\ \mathrm{J\,K^{-1}\,mol^{-1}}$, so $T^* = 172.5\times10^{3}/175.9 = 981\ \mathrm{K}$. Above $981\ \mathrm{K}$ the $\mathrm{C/CO}$ line on an Ellingham diagram falls below nearly every metal-oxide line, which is the graphical form of "couple the oxide's decomposition to this reaction": the sum of the two $\Delta_\mathrm{r}G$'s is negative and the oxide is reduced. Below it, only the strongest-coupled reductants (electrolysis of $\mathrm{Al_2O_3}$, aluminium being the textbook case) work — the reason aluminium is old only since the age of electricity.
:::
:::
