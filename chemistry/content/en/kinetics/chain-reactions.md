In the photochemical combination of hydrogen and chlorine, $\mathrm{H_2 + Cl_2 \rightarrow 2\,HCl}$, a single photon of visible light is followed, on average, by the formation of between ten thousand and a million molecules of hydrogen chloride. One quantum of light breaks one $\mathrm{Cl_2}$ bond — an event of atomic scale — and the flask responds with chemistry on a macroscopic scale, so briskly that strong illumination makes the mixture explode. Nothing about the stoichiometry explains this: the equation says two molecules react, not two times a million. What multiplies a single act of activation into an avalanche of reaction is a **chain reaction**: a mechanism in which the reactive species consumed in the reaction are *regenerated* by it, so that one initiation event sets off a cycle that turns over again and again until, and only until, two carriers chance to meet and destroy each other. Chain reactions are the mechanisms of combustion, of explosions, of the ripening and rancidification of food, of polymer manufacture, of the ozone cycle in the upper atmosphere, and of the slow rusting of fats in a living cell; and they are also the place where the steady-state machinery of [[kinetics/reaction-mechanisms]] pays its largest dividends, because chains are exactly the chemistry in which the intermediates are undetectably few and utterly in charge.

This chapter builds the whole subject from one idea — a carrier that is consumed and re-made — plus the steady state: the architecture of chains and the chain length; why the rate of a chain goes as the *square root* of the initiation rate; the hydrogen–bromine reaction, whose strange rate law Bodenstein reproduced step by step in 1913 and which remains the single most instructive mechanism in chemical kinetics; the long chains of hydrogen–chlorine and what quantum yields tell us; and chain *branching*, where one carrier makes two, and the competition between branching and termination that decides whether a hydrogen–oxygen mixture burns quietly, sits still, or detonates.

## The architecture of a chain

::: definition Chain reaction and its stages {#def-chain}
A **chain reaction** is a sequence of elementary steps containing at least one **chain carrier** — a reactive intermediate (usually a radical, an atom with an unpaired electron, written $\mathrm{Cl\cdot}$, $\mathrm{H\cdot}$, $\mathrm{OH\cdot}$) that is consumed in one step and regenerated in a later one, so that its destruction is not required by the stoichiometry. The stages are:

- **Initiation**: stable reactants are converted into carriers, by heat, light or an added initiator; this is the only stage that must be supplied with energy from outside, and it is slow.
- **Propagation**: a carrier reacts with a stable molecule to give product and a (new or the same) carrier; the chain *turns over*. A propagation cycle converts reactant to product without net consumption of carriers.
- **Inhibition**: a propagation step is reversed or a carrier is diverted by a species (often the product itself), so that the reaction is slowed by a substance present in the mixture.
- **Termination**: two carriers are destroyed, by recombination with each other (in the gas phase or on a wall) or by reaction with an added trap.

The **chain carriers** are the intermediates of the mechanism; the **overall reaction** is the sum of the steps with carriers cancelled, and must reproduce the observed stoichiometry.
:::

Read the stages as a story about population. Initiation *births* carriers at some rate $r_\mathrm{i}$; termination *kills* them, and because two carriers must meet to die, the death rate is $2k_\mathrm{t}[\text{carrier}]^2$ — quadratic in the population. Between birth and death, each carrier runs the propagation cycle some $\nu$ times. The steady state of [[kinetics/reaction-mechanisms]] is simply the balance of births and deaths, and everything surprising about chain kinetics — half-orders, enormous quantum yields, explosions that appear out of nothing when a pressure is crossed — follows from doing that balance carefully.

::: definition Chain length {#def-chain-length}
The **chain length** $\nu$ is the average number of propagation cycles one initiation event produces before termination, operationally the ratio
$$
\nu = \frac{\text{rate of consumption of reactant}}{\text{rate of initiation}} = \frac{v_\text{prop}}{r_\mathrm{i}} .
$$
When initiation is photochemical with rate equal to the rate of photon absorption, $\nu$ equals the **quantum yield** of reaction (molecules reacted per photon absorbed) up to a stoichiometric factor of order one. Chain lengths run from a few tens (HBr formation, strongly inhibited) through $10^{3}$–$10^{5}$ (photochlorination) to $10^{6}$ and more in favourable cases; a "quantum chain" of a million turnovers is not an exaggeration but a measurement.
:::

Why do chains give large rates with *tiny* carrier concentrations? Because the rate of propagation is $k_\mathrm{p}[\text{carrier}][\mathrm{M}]$, and although $[\text{carrier}]_\text{ss}$ may be a millionth of $[\mathrm{M}]$, the propagation rate constants are large (abstractions by $\mathrm{H\cdot}$ and $\mathrm{Cl\cdot}$ run at $10^{4}$–$10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$) and each carrier works $\nu$ times before it dies. A chain is a machine whose *throughput* is the product of a small standing population and a large turnover number; you can remove the carriers and the rate collapses, yet the carriers themselves are invisible to ordinary analysis. [[#ex-simple-chain]] below puts real numbers on this.

::: warning Chain length is not molecularity {#warn-chain-length}
A chain length of $10^{5}$ does not mean the reaction is "one hundred thousand-molecular". **Molecularity** belongs to a single elementary step and is 1, 2, or (rarely) 3 — it counts how many entities collide in one event. **Chain length** belongs to the whole mechanism in a given regime and counts *how many times the cycle turns per birth of carriers*; it is not a property of the reaction but of conditions: double the light intensity and $\nu$ falls (more carriers, faster quadratic termination); cool the mixture, shrink the vessel, add an inhibitor, and $\nu$ changes again. Never write a molecularity into a rate law from a chain length, or read a mechanism's "size" from an order: the half-order in $[\mathrm{Br_2}]$ means *square-root bookkeeping of carriers*, not half a molecule.
:::

::: example Chain length from quantum-yield data {#ex-quantum-yield}
A gas-phase photochlorination is irradiated so that the reaction mixture absorbs $3.6\times10^{-8}\ \mathrm{mol}$ of photons per second (one photon initiates one chain). The rate of consumption of $\mathrm{H_2}$ is measured as $7.0\times10^{-4}\ \mathrm{mol\,s^{-1}}$. What is the quantum yield of $\mathrm{H_2}$ consumption and the chain length?
::: solution
The quantum yield is molecules (or moles) reacted per photon absorbed:
$$
\Phi = \frac{7.0\times10^{-4}\ \mathrm{mol\,s^{-1}}}{3.6\times10^{-8}\ \mathrm{mol\,photons\,s^{-1}}} = 1.9\times10^{4}.
$$
One photon starts one chain, and each propagation cycle consumes one $\mathrm{H_2}$, so the chain length is $\nu = \Phi = 1.9\times10^{4}$ turnovers per initiation. The data are given to two significant figures, so the answer is quoted to two. The physical reading: the light is a pilot flame — it contributes a negligible fraction (one part in $2\times10^{4}$) of the reactant molecules it consumes, and the energy of the absorbed photons is a trigger, not the fuel.
:::
:::

## Steady-state kinetics of a chain: why half an order

Take the irreducible skeleton of a chain: initiation produces carriers $\mathrm{X\cdot}$, one propagation step consumes reactant $\mathrm{M}$, and termination destroys carriers in pairs.

$$
\mathrm{I} \xrightarrow{\;k_\mathrm{d}\;} 2\,\mathrm{X\cdot} \qquad
\mathrm{X\cdot} + \mathrm{M} \xrightarrow{\;k_\mathrm{p}\;} \text{product} + \mathrm{X\cdot} \qquad
2\,\mathrm{X\cdot} \xrightarrow{\;k_\mathrm{t}\;} \text{dead product}
$$

The initiation rate is $r_\mathrm{i} = 2 f k_\mathrm{d}[\mathrm{I}]$ (the factor 2 because each event makes two carriers, and $f \le 1$ is the escape yield); the factor of 2 will cancel out of the physics and is best carried as $r_\mathrm{i}$ from the start.

::: proposition The half-order in initiator {#prop-half-order}
For a chain with initiation at rate $r_\mathrm{i}$, propagation $\mathrm{X\cdot} + \mathrm{M} \rightarrow \text{product} + \mathrm{X\cdot}$ with rate constant $k_\mathrm{p}$, and **bimolecular termination** $2\,\mathrm{X\cdot} \rightarrow$ dead with rate constant $k_\mathrm{t}$, the steady state gives
$$
[\mathrm{X\cdot}]_\text{ss} = \left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2},
\qquad
v = k_\mathrm{p}[\mathrm{M}]\left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2} \propto r_\mathrm{i}^{1/2}.
$$
If instead termination is **first order in the carrier** — destruction at a wall, $\mathrm{X\cdot} \xrightarrow{k_\mathrm{w}}$ dead, or trapping by an inhibitor held at constant concentration — then $[\mathrm{X\cdot}]_\text{ss} = r_\mathrm{i}/k_\mathrm{w}$ and $v \propto r_\mathrm{i}$. The order in initiator (or in light intensity) is a *diagnosis of how the chain dies*: $\tfrac12$ means two carriers die together in the gas phase, $1$ means each carrier dies alone.
:::

::: proof The steady state of the generic chain {#proof-half-order}
Write the rate of change of the carrier. Initiation creates carriers at $r_\mathrm{i}$; propagation creates and destroys one per cycle and contributes nothing net; termination destroys two carriers per event, so the *carrier* loss rate is $2k_\mathrm{t}[\mathrm{X\cdot}]^2$:
$$
\frac{\mathrm{d}[\mathrm{X\cdot}]}{\mathrm{d}t} = r_\mathrm{i} - 2k_\mathrm{t}[\mathrm{X\cdot}]^2 \approx 0
\qquad\Longrightarrow\qquad
[\mathrm{X\cdot}]_\text{ss} = \left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2}.
$$
The product appears only in propagation, at rate $k_\mathrm{p}[\mathrm{X\cdot}][\mathrm{M}]$, so
$$
v = k_\mathrm{p}[\mathrm{M}]\left(\frac{r_\mathrm{i}}{2k_\mathrm{t}}\right)^{\!1/2}. \qquad \blacksquare
$$
Two checks of the bookkeeping. (i) The chain length implied by this result is $\nu = v/r_\mathrm{i} = k_\mathrm{p}[\mathrm{M}]\,(2k_\mathrm{t}r_\mathrm{i})^{-1/2}$: raising $r_\mathrm{i}$ shortens the chains as $r_\mathrm{i}^{-1/2}$, because more carriers mean more carrier–carrier meetings — quadratic death accelerates faster than linear birth. (ii) For wall termination replace $2k_\mathrm{t}[\mathrm{X\cdot}]^2$ by $k_\mathrm{w}[\mathrm{X\cdot}]$; the steady state is then linear, $[\mathrm{X\cdot}]_\text{ss} = r_\mathrm{i}/k_\mathrm{w}$, and $\nu = k_\mathrm{p}[\mathrm{M}]/k_\mathrm{w}$ is independent of $r_\mathrm{i}$: when carriers die alone, birth rate does not shorten the chains.
:::

::: widget odesolver
f: 0.5 - 2*y*y
y0: 0
t: 0, 5
exact: 0.5*tanh(t)
h: 0.05
caption: The carrier concentration of a chain after initiation switches on at $t = 0$: $y' = 0.5 - 2y^2$ is $\mathrm{d}[\mathrm{X\cdot}]/\mathrm{d}t = r_\mathrm{i} - 2k_\mathrm{t}[\mathrm{X\cdot}]^2$ in dimensionless units, with the exact solution $y = 0.5\,\tanh t$ drawn for comparison (Euler, Heun and RK4 against it). The carrier rises to $y_\text{ss} = 0.5 = \sqrt{r_\mathrm{i}/2k_\mathrm{t}}$ — the square root of the ratio of birth rate to death coefficient — on a timescale of one time unit, a few of them being the **kinetic chain induction period** before the steady state is established. Double the birth rate and the plateau rises only as $\sqrt{2}$: quadratic death absorbs most of the extra carriers. This single curve is the content of the half-order law — the plateau *is* the square root.
:::

::: example A simple chain, numerically {#ex-simple-chain}
A thermal chain has initiation rate $r_\mathrm{i} = 8.0\times10^{-7}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$, propagation $\mathrm{X\cdot} + \mathrm{M} \rightarrow$ product $+\ \mathrm{X\cdot}$ with $k_\mathrm{p} = 1.0\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ and $[\mathrm{M}] = 0.100\ \mathrm{mol\,dm^{-3}}$, and radical recombination $k_\mathrm{t} = 4.0\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Find $[\mathrm{X\cdot}]_\text{ss}$, the rate, the chain length, and the factor by which the rate rises if the initiator concentration (and so $r_\mathrm{i}$) is doubled.
::: solution
$$
[\mathrm{X\cdot}]_\text{ss} = \left(\frac{8.0\times10^{-7}}{2 \times 4.0\times10^{9}}\right)^{\!1/2} = \left(1.0\times10^{-16}\right)^{1/2} = 1.0\times10^{-8}\ \mathrm{mol\,dm^{-3}},
$$
$$
v = k_\mathrm{p}[\mathrm{X\cdot}][\mathrm{M}] = (1.0\times10^{4})(1.0\times10^{-8})(0.100) = 1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}},
\qquad
\nu = \frac{v}{r_\mathrm{i}} = \frac{1.0\times10^{-5}}{8.0\times10^{-7}} = 1.3\times10^{1}.
$$
Doubling $r_\mathrm{i}$ multiplies $v$ by $\sqrt{2} = 1.41$. Note the numbers the chain hides: the carrier stands at one part in $10^{7}$ of the reactant — utterly invisible — yet carries the whole rate of $10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. The mean carrier lifetime is $\tau = [\mathrm{X\cdot}]_\text{ss}/r_\mathrm{i} = 1.0\times10^{-8}/8.0\times10^{-7} = 1.3\times10^{-2}\ \mathrm{s}$, and the chain-length identity $\nu = \tau\,k_\mathrm{p}[\mathrm{M}]$ checks exactly: $(1.25\times10^{-2})(1.0\times10^{4})(0.100) = 12.5 = \nu$. Each carrier is born, abstracts about thirteen times, and dies; the population never exceeds $10^{-8}\ \mathrm{mol\,dm^{-3}}$ because pair termination punishes crowding quadratically.
:::
:::

One caution the arithmetic teaches: chain mechanisms are full of factors of two (two carriers per initiation, two per termination event), and the only safe procedure is the algorithm of [[kinetics/reaction-mechanisms]] — write every creation with $+$ and every destruction with $-$, set the sum to zero, and let the algebra keep the books. The identity $\nu = \tau k_\mathrm{p}[\mathrm{M}]$ used above is exact only because $\tau$ was defined as $[\mathrm{X\cdot}]_\text{ss}/r_\mathrm{i}$ with $r_\mathrm{i}$ counting *carriers*; a different convention moves the 2, which is why the definitions, not memory, must carry the weight.

## The hydrogen–bromine reaction: Bodenstein's mechanism

$\mathrm{H_2(g) + Br_2(g) \rightarrow 2\,HBr(g)}$ is the most famous mechanism in chemistry, famous because its rate law defeats any single-step guess: between roughly $\mathrm{200}$ and $\mathrm{300\,^\circ C}$ the observed law is

$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = \frac{k\,[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k'\,[\mathrm{HBr}]/[\mathrm{Br_2}]},
\qquad k = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2}, \quad k' = \frac{k_4}{k_3},
$$

a three-halves order at the start, a *product in the denominator* (the reaction inhibits itself), and an order in $\mathrm{Br_2}$ that changes with composition. Bodenstein and his school measured it; Bodenstein's 1913 mechanism — with the steady state — derived it.

::: theorem The hydrogen–bromine rate law {#thm-hbr}
If $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$ proceeds by the five-step mechanism of [[#proof-hbr]] under the steady-state approximation on both $\mathrm{H\cdot}$ and $\mathrm{Br\cdot}$, then
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = \frac{k\,[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k'\,[\mathrm{HBr}]/[\mathrm{Br_2}]},
\qquad
k = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2}, \quad k' = \frac{k_4}{k_3},
$$
valid at low conversion and throughout when $[\mathrm{HBr}]/[\mathrm{Br_2}]$ stays below about 1. The limits are diagnostic: at $t = 0$ the rate is $k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}$ (order $\tfrac32$); once $k'[\mathrm{HBr}]/[\mathrm{Br_2}] \gg 1$ the rate becomes $(k/k')\,[\mathrm{H_2}][\mathrm{Br_2}]^{3/2}/[\mathrm{HBr}]$ — order $\tfrac32$ in $\mathrm{Br_2}$ and *minus one* in the product.
:::

::: proof Bodenstein's derivation {#proof-hbr}
The mechanism, with the rate constants Bodenstein's law refers to:
$$
\begin{aligned}
\mathrm{Br_2} &\xrightarrow{\;k_1\;} 2\,\mathrm{Br\cdot} && \text{initiation}\\
\mathrm{Br\cdot} + \mathrm{H_2} &\xrightarrow{\;k_2\;} \mathrm{HBr} + \mathrm{H\cdot} && \text{propagation (slow, endothermic)}\\
\mathrm{H\cdot} + \mathrm{Br_2} &\xrightarrow{\;k_3\;} \mathrm{HBr} + \mathrm{Br\cdot} && \text{propagation (fast, exothermic)}\\
\mathrm{H\cdot} + \mathrm{HBr} &\xrightarrow{\;k_4\;} \mathrm{H_2} + \mathrm{Br\cdot} && \text{inhibition (exothermic by } 70\ \mathrm{kJ\,mol^{-1}})\\
2\,\mathrm{Br\cdot} &\xrightarrow{\;k_5\;} \mathrm{Br_2} && \text{termination}
\end{aligned}
$$
The steps sum to $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$ once carriers cancel. HBr is made in steps 2 and 3 and destroyed in step 4:
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] - k_4[\mathrm{H\cdot}][\mathrm{HBr}].
$$
**Steady state on $\mathrm{H\cdot}$** (made in 2, destroyed in 3 and 4):
$$
k_2[\mathrm{Br\cdot}][\mathrm{H_2}] - k_3[\mathrm{H\cdot}][\mathrm{Br_2}] + k_4[\mathrm{H\cdot}][\mathrm{HBr}] = 0
\qquad\Longrightarrow\qquad
[\mathrm{H\cdot}] = \frac{k_2[\mathrm{Br\cdot}][\mathrm{H_2}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]}.
$$
**Steady state on $\mathrm{Br\cdot}$** (made in 1 twice, in 3 and 4; destroyed in 2 and in 5 twice):
$$
2k_1[\mathrm{Br_2}] - 2k_5[\mathrm{Br\cdot}]^2 - k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] + k_4[\mathrm{H\cdot}][\mathrm{HBr}] = 0.
$$
The last three terms sum to zero *by the $\mathrm{H\cdot}$ equation* — propagation carries bromine between steps without net change — leaving birth balanced against death exactly as in the generic chain:
$$
[\mathrm{Br\cdot}] = \left(\frac{k_1}{k_5}\right)^{\!1/2}[\mathrm{Br_2}]^{1/2}.
$$
Now substitute $[\mathrm{H\cdot}]$ into the HBr balance. The two H-atom terms combine through the common factor $[\mathrm{H\cdot}]$:
$$
k_3[\mathrm{H\cdot}][\mathrm{Br_2}] - k_4[\mathrm{H\cdot}][\mathrm{HBr}]
= [\mathrm{H\cdot}]\bigl(k_3[\mathrm{Br_2}] - k_4[\mathrm{HBr}]\bigr)
= k_2[\mathrm{Br\cdot}][\mathrm{H_2}]\cdot\frac{k_3[\mathrm{Br_2}] - k_4[\mathrm{HBr}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]},
$$
so that
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t}
= k_2[\mathrm{Br\cdot}][\mathrm{H_2}]\left(1 + \frac{k_3[\mathrm{Br_2}] - k_4[\mathrm{HBr}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]}\right)
= k_2[\mathrm{Br\cdot}][\mathrm{H_2}]\cdot\frac{2k_3[\mathrm{Br_2}]}{k_3[\mathrm{Br_2}] + k_4[\mathrm{HBr}]}
= \frac{2k_2[\mathrm{Br\cdot}][\mathrm{H_2}]}{1 + (k_4/k_3)[\mathrm{HBr}]/[\mathrm{Br_2}]}.
$$
Finally insert $[\mathrm{Br\cdot}]$:
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = \frac{2k_2\left(k_1/k_5\right)^{1/2}[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k_4[\mathrm{HBr}]/k_3[\mathrm{Br_2}]},
$$
which is the stated law with $k = 2k_2(k_1/k_5)^{1/2}$ and $k' = k_4/k_3$. $\blacksquare$
:::

The architecture of the answer is worth memorising, not the algebra. The **numerator** is initiation–termination bookkeeping: the $\mathrm{Br\cdot}$ steady state is the generic chain's square root, and the half-order in $\mathrm{Br_2}$ is the half-order in initiation rate. The **denominator** is inhibition: step 4 steals H atoms back before step 3 can cash them, and its weight grows exactly as the product accumulates — a product that slows its own formation puts itself in the denominator.

::: warning A rate law supports a mechanism; it never proves one {#warn-hbr-mech}
Bodenstein's law agrees with experiment over the whole range of conversion, and it is *consistent* with the five-step mechanism — but consistency is not proof, and this case is sharper than most: alternative mechanisms reproduce the same law, for instance one in which $\mathrm{Br\cdot}$ is buffered as $\mathrm{Br_3\cdot}$ by the pre-equilibrium $\mathrm{Br\cdot + Br_2 \rightleftharpoons Br_3\cdot}$ and $\mathrm{H_2}$ reacts with $\mathrm{Br_3\cdot}$; the algebra of the steady state yields the identical $[\mathrm{Br_2}]^{1/2}$ and the identical inhibition term. What makes the chain mechanism *believed* is the corroboration beyond kinetics: spectroscopic detection of $\mathrm{Br\cdot}$ and $\mathrm{H\cdot}$, the isotope effect on step 2, and the way the law breaks down in ways the mechanism predicts. Write "the law is consistent with", reserve "proved" for arithmetic, and remember that the strongest thing a rate law ever says about a mechanism is *not contradicted*.
:::

::: example Evaluating the HBr rate law {#ex-hbr-eval}
For an equimolar mixture with $[\mathrm{H_2}]_0 = [\mathrm{Br_2}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$ at a temperature where the illustrative constants are $k = 1.0\times10^{-2}\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1}}$ and $k' = 10$, compute the rate at $t = 0$ and at $50\,\%$ conversion, and compare the second with the rate the law *would* give if the product did not inhibit.
::: solution
At $t = 0$ there is no HBr, the denominator is 1, and
$$
v_0 = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2} = (1.0\times10^{-2})(0.100)(0.100)^{1/2} = 3.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
At $50\,\%$ conversion, $[\mathrm{H_2}] = [\mathrm{Br_2}] = 0.050$ and $[\mathrm{HBr}] = 0.100\ \mathrm{mol\,dm^{-3}}$, so $k'[\mathrm{HBr}]/[\mathrm{Br_2}] = 10 \times 0.100/0.050 = 20$ and
$$
v = \frac{(1.0\times10^{-2})(0.050)(0.050)^{1/2}}{1 + 20} = \frac{1.1\times10^{-4}}{21} = 5.3\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
Without inhibition the same composition would give $1.1\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$: the product has cut the rate by the factor $21$ — the denominator $1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}]$ *is* the inhibition, and it grows as the reaction proceeds. This is why HBr chains are short ($\nu$ of tens) while HCl chains run to hundreds of thousands: the product of the bromine reaction is a trap for its own chain carriers.
:::
:::

::: widget plot
f: (1-x)*sqrt(1-x); (1-x)*sqrt(1-x)/(1 + kp*2*x/(1-x))
x: 0, 0.95
y: 0, 1.05
sliders: kp=10:0:20:1
labels: \text{no inhibition}; \text{product inhibition}
caption: The HBr rate divided by its initial value, $v/v_0 = (1-x)^{3/2}/\bigl(1 + 2k'x/(1-x)\bigr)$, against conversion $x$ for an equimolar feed (so $[\mathrm{H_2}] = [\mathrm{Br_2}] = 1 - x$ and $[\mathrm{HBr}] = 2x$ in units of the initial concentration), with $k'$ set by the slider. The upper curve is what depletion alone would do; the lower is the truth. Product inhibition is not a small correction — at $k' = 10$ the rate at $x = 0.5$ is twenty-one times smaller than depletion alone predicts, and the denominator's $(1-x)$ in the floor makes the reaction crawl long before the reactants are gone. Slide $k'$ to zero and the two curves merge: inhibition is the product eating its own chain.
:::

Two timescales organise the early reaction. The first is the **kinetic induction period** of the generic chain: carriers need a few lifetimes $\tau = (2k_\mathrm{t}[\mathrm{X\cdot}]_\text{ss})^{-1}$ to build their steady-state population, and the rate climbs to $v_0$ on that timescale (the tanh curve of the odesolver figure). The second is the **inhibition timescale**: how long before the product weighs in.

::: example How long before inhibition bites? {#ex-induction}
For the mixture of [[#ex-hbr-eval]] ($v_0 = 3.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$, $k' = 10$, $[\mathrm{Br_2}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$), estimate the time after which the inhibition term can no longer be ignored, taking "ignored" to mean $k'[\mathrm{HBr}]/[\mathrm{Br_2}] < 1$.
::: solution
Inhibition becomes important when $k'[\mathrm{HBr}]/[\mathrm{Br_2}] \approx 1$, i.e. when $[\mathrm{HBr}] \approx [\mathrm{Br_2}]/k' \approx 0.100/10 = 0.010\ \mathrm{mol\,dm^{-3}}$. At the initial rate (the rate has barely fallen by then),
$$
t_\text{ind} \approx \frac{0.010\ \mathrm{mol\,dm^{-3}}}{3.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}} = 31\ \mathrm{s}.
$$
The estimate is deliberately crude — one significant figure of physics, two of arithmetic — and its value is the *scaling*: $t_\text{ind} \propto [\mathrm{Br_2}]/(k'v_0)$, so richer bromine feeds and smaller $k'$ (higher temperature, since $k' = k_4/k_3$ falls with temperature) extend the uninhibited window. The kinetic induction period computed from carrier lifetimes is milliseconds; the inhibition period is tens of seconds. An experiment that starts the clock "too late" sees a reaction that merely decays; one that starts it promptly sees the full law.
:::
:::

## The hydrogen–chlorine reaction: chains that will not die

::: definition Quantum yield {#def-quantum-yield}
The **quantum yield** of a photochemical reaction is
$$
\Phi = \frac{\text{number of reactant molecules consumed (or product molecules formed)}}{\text{number of photons absorbed}} .
$$
For a non-chain primary process $\Phi \le 1$; for a chain reaction initiated by the photon, $\Phi \approx \nu$ (up to the number of reactant molecules consumed per propagation cycle), so **measuring $\Phi \gg 1$ is the classic proof that a reaction is a chain**, and following how $\Phi$ depends on light intensity, pressure and vessel size is a probe of how the chain dies.
:::

$\mathrm{H_2 + Cl_2 \rightarrow 2\,HCl}$ runs by the same *shape* of mechanism — initiation $\mathrm{Cl_2 \rightarrow 2\,Cl\cdot}$, propagation $\mathrm{Cl\cdot + H_2 \rightarrow HCl + H\cdot}$ then $\mathrm{H\cdot + Cl_2 \rightarrow HCl + Cl\cdot}$, termination $2\,\mathrm{Cl\cdot} + \mathrm{M} \rightarrow \mathrm{Cl_2} + \mathrm{M}$ — and gives the simple law $v = k[\mathrm{H_2}][\mathrm{Cl_2}]^{1/2}$: the half-order survives, the denominator does not.

::: proposition Why HCl is not inhibited and its chains are long {#prop-hcl}
Two energetic facts separate chlorine from bromine. (i) **No inhibition step competes.** The inhibition of HBr chains is $\mathrm{H\cdot + HBr \rightarrow H_2 + Br\cdot}$, exothermic by $70\ \mathrm{kJ\,mol^{-1}}$ and fast; its chlorine analogue $\mathrm{H\cdot + HCl \rightarrow H_2 + Cl\cdot}$ is nearly thermoneutral ($-4\ \mathrm{kJ\,mol^{-1}}$) with a substantial barrier, so it loses every race against $\mathrm{H\cdot + Cl_2}$ ($-189\ \mathrm{kJ\,mol^{-1}}$, fast). No product trap, no denominator. (ii) **Termination is termolecular.** Two $\mathrm{Cl\cdot}$ atoms cannot bind without a third body $\mathrm{M}$ to carry away the bond energy, so the termination rate $\propto [\mathrm{Cl\cdot}]^2[\mathrm{M}]$ is slow at moderate pressure; chains live long, $\nu$ reaches $10^{4}$–$10^{6}$, and $\Phi$ grows as pressure falls and as the vessel grows (walls destroy carriers), which is exactly how the long chain was discovered.
:::

The numbers of [[#ex-quantum-yield]] — $\nu \approx 2\times10^{4}$ — are ordinary for photochlorination; under bright light the heat released cannot leave the gas fast enough, the temperature runs away, and the mixture explodes photochemically. The same stoichiometry, the same mechanism shape, and a completely different safety profile from HBr synthesis: chain length is the difference between a preparative reaction and a bomb.

## Chain branching and explosion: hydrogen + oxygen

Everything changes when one carrier makes *more than one* carrier.

::: definition Chain branching {#def-branching}
A **chain-branching** step is a propagation step in which one carrier produces two or more carriers, so the carrier population multiplies rather than merely turns over. The paradigm is
$$
\mathrm{H\cdot} + \mathrm{O_2} \rightarrow \mathrm{OH\cdot} + \mathrm{O\cdot} \qquad \Delta_\mathrm{r}H^\circ = +70\ \mathrm{kJ\,mol^{-1}},
$$
followed by the fast steps $\mathrm{O\cdot + H_2 \rightarrow OH\cdot + H\cdot}$ and $\mathrm{OH\cdot + H_2 \rightarrow H_2O + H\cdot}$: net, one $\mathrm{H\cdot}$ in, three carriers out. Branching is the mechanism of combustion and detonation; its counterweight is the termolecular recombination
$$
\mathrm{H\cdot} + \mathrm{O_2} + \mathrm{M} \rightarrow \mathrm{HO_2\cdot} + \mathrm{M} \qquad \Delta_\mathrm{r}H^\circ = -215\ \mathrm{kJ\,mol^{-1}},
$$
whose product $\mathrm{HO_2\cdot}$ is far less reactive and diffuses to a wall or a trap. Both steps compete for the *same* $\mathrm{H\cdot}$: branching is bimolecular with a $70\ \mathrm{kJ\,mol^{-1}}$ barrier, termination is termolecular with no barrier.
:::

::: proposition The critical condition for explosion {#prop-critical}
Let $[\mathrm{R\cdot}]$ be the total carrier concentration and suppose branching creates carriers at $k_\mathrm{b}[\mathrm{O_2}][\mathrm{R\cdot}]$ while termination (gas-phase three-body plus wall loss) destroys them at $\bigl(k_\mathrm{t}[\mathrm{O_2}][\mathrm{M}] + k_\mathrm{w}\bigr)[\mathrm{R\cdot}]$. Then
$$
\frac{\mathrm{d}[\mathrm{R\cdot}]}{\mathrm{d}t} = \bigl[\underbrace{k_\mathrm{b}[\mathrm{O_2}] - k_\mathrm{t}[\mathrm{O_2}][\mathrm{M}] - k_\mathrm{w}}_{\displaystyle \phi}\bigr][\mathrm{R\cdot}]
\qquad\Longrightarrow\qquad
[\mathrm{R\cdot}] = [\mathrm{R\cdot}]_0\,e^{\phi t}.
$$
The mixture is **explosive** when $\phi > 0$: the carrier population grows exponentially, the heat release follows it, and the reaction runs away on the timescale $1/\phi$ — milliseconds, not seconds. The condition $\phi > 0$ is a race between a step with a barrier (branching, favoured by high temperature) and steps without one (termination, favoured by high pressure, since three-body loss gains a factor $[\mathrm{M}]$, and by small vessels, since $k_\mathrm{w}$ grows as the vessel shrinks).
:::

::: definition Explosion limits and the peninsula {#def-explosion-limits}
In the pressure–temperature diagram of $\mathrm{H_2 + O_2}$ (fixed 2 : 1 mixture), the **explosion peninsula** is the region where $\phi > 0$. Its **lower limit** $p_\mathrm{L}$ sits at low pressure, where wall destruction of $\mathrm{H\cdot}$ (first order in $[\mathrm{R\cdot}]$, roughly pressure-independent rate constant $k_\mathrm{w}$) outruns branching (second order in pressure, $\propto p^2$); crossing $p_\mathrm{L}$ upward, branching wins. $p_\mathrm{L}$ falls steeply with temperature and rises as the vessel narrows ($k_\mathrm{w} \propto 1/r^2$ by diffusion). The **second limit** $p_\mathrm{U}$ sits at high pressure, where the barrierless three-body termination $\mathrm{H + O_2 + M}$ (rate $\propto p^3$) overtakes branching (rate $\propto p^2$) and the mixture becomes slow again. Between $p_\mathrm{L}$ and $p_\mathrm{U}$: explosion; outside: quiet reaction or no reaction. At still higher pressures a third, thermal limit appears as the mixture autoignites.
:::

::: widget plot
f: 1; a/x; b*x
x: 0.1, 14
y: 0, 3
sliders: a=0.5:0.1:1.0:0.1; b=0.1:0.02:0.3:0.01
labels: \text{branching}; \text{wall loss}; \text{three-body loss}
caption: The two radical-loss channels divided by the branching rate, against total pressure $x$ (arbitrary units). Wall loss relative to branching falls as $a/x$ (branching is bimolecular, wall loss is not), and three-body loss rises as $b\,x$ (one extra factor of $[\mathrm{M}]$). The mixture explodes where *both* curves lie below the branching line — between $x = a$ and $x = 1/b$: the peninsula. Slide $b$ up (cool the mixture: three-body capture gains) and the explosion region shrinks from the right; slide $a$ up (smaller vessel) and it shrinks from the left. Every feature of the hydrogen–oxygen explosion diagram is in these two curves.
:::

::: example Explosion-limit scaling {#ex-explosion-scale}
A hydrogen–oxygen mixture sits exactly at its second explosion limit, where the three-body termination rate equals the branching rate. By what factor does the ratio (three-body termination)/(branching) change if the total pressure is doubled at constant composition and temperature? What happens to the ratio (wall loss)/(branching)?
::: solution
Branching is bimolecular: rate $\propto [\mathrm{H\cdot}][\mathrm{O_2}] \propto p^2$. Three-body termination is termolecular: rate $\propto [\mathrm{H\cdot}][\mathrm{O_2}][\mathrm{M}] \propto p^3$. Their ratio therefore goes as $p$, and doubling the pressure multiplies it by $2$: the mixture, already at the limit, is pushed to the *non-explosive* side — above the second limit, three-body capture strangles the chain. Wall loss per unit volume is $\propto [\mathrm{H\cdot}] \propto p$ against branching $\propto p^2$, so the wall ratio *halves*: doubling pressure helps against the wall and hurts against the third body. The peninsula is exactly the interval where neither loss wins.
:::
:::

**Safety, stated plainly.** Chain branching is why hydrogen–oxygen and hydrogen–air mixtures are explosive over wide composition ranges and why the hazard depends on pressure, temperature, vessel size and surface, not only on the chemicals: the same mixture can be a quiet flame in a burner tube and a detonation in a closed vessel. Industrial handling of hydrogen follows this — ventilation to stay below the flammability range, inerting, flame arrestors, and explosion relief — and this lesson treats the phenomenon educationally and industrially only. Thermodynamics is not the safety margin: at room temperature $\mathrm{H_2 + \tfrac12 O_2 \rightarrow H_2O}$ is ready to go with $\Delta_\mathrm{r}G^\circ \approx -229\ \mathrm{kJ\,mol^{-1}}$ and has been sitting in flasks for centuries; it is the *kinetics of carriers* that decides whether it goes in a year or in a millisecond.

## Starting, stopping and inhibiting chains

Chains are started thermally (bond homolysis by heat — the initiation of combustion), photochemically (one photon, one pair of carriers, and a quantum yield that measures the chain), or by added radical initiators that fragment at a chosen temperature and deliver a steady $r_\mathrm{i}$; polymer chemistry runs on all three. They are stopped by anything that intercepts carriers faster than propagation: oxygen itself inhibits many radical chains; **inhibitors** and **antioxidants** act at concentrations far below the reactant by donating a hydrogen atom to the chain-carrying radical — for lipid peroxidation, $\mathrm{ROO\cdot} + \mathrm{ArOH} \rightarrow \mathrm{ROOH} + \mathrm{ArO\cdot}$ — where the aryloxy radical $\mathrm{ArO\cdot}$ is stabilised by delocalisation and simply will not re-enter the chain. Phenolic antioxidants (the butylated hydroxytoluene family, and the tocopherols of biology) work this way; their hazard classification is that of ordinary organic sensitisers/irritants at commercial grade, and their function is radical trapping, not poison. The kinetic signature of inhibition is an **induction period**: the reaction runs at full speed until the inhibitor is consumed, then resumes — a stopwatch assay for trapping rate constants.

::: history
Max **Bodenstein** derived the hydrogen–bromine law from a chain mechanism in 1913, the year he also formalised the idea that a reactive intermediate sits at a constant small concentration — the steady state — and his school spent two decades proving the law's every term experimentally. A general statement of the steady-state method as simultaneous equations $\mathrm{d}[\text{intermediate}]/\mathrm{d}t = 0$ is due independently to **J. F. Christiansen** (1919) and to **Cyril Hinshelwood**, who built chain kinetics into a general theory of reactions in gases and liquids. **Nikolay Semyonov** attacked the same problem from the side of explosions, and the 1956 Nobel Prize in Chemistry was divided between Semyonov and Hinshelwood "for their researches into the chemical kinetics of gaseous reactions". **Yakov Zeldovich** identified chain branching — the $\mathrm{H + O_2}$ step and its competition with three-body termination — in the 1940s, giving combustion and detonation theory its central mechanism; the explosion peninsula of [[#def-explosion-limits]] is the map his kinetics drew.
:::

::: quiz
A gas-phase chain is found to have rate $\propto [\mathrm{I}]^{1/2}$ in its thermal initiator $\mathrm{I}$. What does the exponent diagnose?
- [x] Termination by radical–radical recombination in the gas phase: two carriers die together, so the steady-state carrier level goes as the square root of the birth rate.
- [ ] Termination at the vessel wall: each carrier dies alone, which always gives the half power.
- [ ] A termolecular elementary step in the propagation cycle.
- [ ] That the reaction is second order overall and the initiator is half consumed.
::: solution
The first option — see [[#prop-half-order]]: bimolecular termination makes $[\mathrm{X\cdot}]_\text{ss} = (r_\mathrm{i}/2k_\mathrm{t})^{1/2}$, and $r_\mathrm{i} \propto [\mathrm{I}]$ gives the half-order. Wall termination gives the *first* power (option 2 has it backwards). Option 3 misreads an order as a molecularity, the error of [[#warn-chain-length]]; option 4 confuses an order in one species with the overall order and with stoichiometry.
:::
:::

## Where this leads

The wall, the third body and the surface that terminate chains are surfaces in the full sense, and [[kinetics/surface-kinetics]] takes them seriously — adsorption, heterogeneous initiation and catalytic destruction of radicals is the same carrier bookkeeping with the wall as a reactant. Chains whose carriers are catalyst-derived (radical chains in polymerisation, autoxidation) meet the catalytic cycles of [[kinetics/homogeneous-catalysis]], where the steady state is applied to the catalyst itself. The quantum yield entered here as a chain-length probe is a subject in its own right — primary processes, sensitisation, flash photolysis — in [[kinetics/photochemistry]]. For the state-to-state question "which collision branches the chain", see [[kinetics/reaction-dynamics]].

::: summary
- A chain reaction carries itself: initiation births carriers, propagation turns over without net carrier consumption, inhibition diverts carriers back, termination kills them; the chain length $\nu$ = propagation rate / initiation rate counts turnovers per birth.
- Chains give large rates from tiny carrier populations because rate $= k_\mathrm{p}[\text{carrier}][\mathrm{M}]$ with large $k_\mathrm{p}$ and $\nu$ up to $10^{6}$; carriers are invisible and in charge.
- The steady state with bimolecular termination gives $[\mathrm{X\cdot}]_\text{ss} = (r_\mathrm{i}/2k_\mathrm{t})^{1/2}$ and rate $\propto r_\mathrm{i}^{1/2}$: the order in initiator or light intensity diagnoses how the chain dies (½: pairs die together; 1: carriers die alone, at walls or traps).
- Bodenstein's five-step mechanism with the steady state on $\mathrm{H\cdot}$ and $\mathrm{Br\cdot}$ derives $\mathrm{d}[\mathrm{HBr}]/\mathrm{d}t = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}/(1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}])$: the numerator is the square-root chain, the denominator is product inhibition.
- A rate law consistent with a mechanism supports it but never proves it — other mechanisms reproduce the HBr law; corroboration beyond kinetics is what makes a mechanism believed.
- $\mathrm{H_2 + Cl_2}$ has no inhibition step (its H-abstraction from HCl is slow) and termolecular termination, so chains run to $10^{4}$–$10^{6}$ and the quantum yield measures them.
- Chain branching ($\mathrm{H + O_2 \rightarrow OH + O}$) makes carriers multiply; explosion occurs when the branching rate exceeds all termination ($\phi > 0$), giving exponential carrier growth. The explosion peninsula lies between the wall-loss lower limit and the three-body second limit, and depends on pressure, temperature and vessel size.
- Inhibitors stop chains by radical trapping at low concentration and show up kinetically as induction periods; quantum yields, half-orders and induction times are the three classic fingerprints of chain mechanisms.
:::

## Exercises

::: exercise Chain length from rates {level=1 check="180000"}
In a photochemical chain the initiation rate is $2.0\times10^{-8}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ and the reactant is consumed at $3.6\times10^{-3}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. What is the chain length $\nu$? (Enter $\nu$, dimensionless.)
::: solution
$\nu = v/r_\mathrm{i} = 3.6\times10^{-3} / 2.0\times10^{-8} = 1.8\times10^{5}$. Each initiation event delivers about $180\,000$ propagation cycles before termination.
:::
:::

::: exercise Quantum yield {level=1 check="30000"}
A photochemical reaction absorbs $2.5\times10^{-9}\ \mathrm{mol}$ of photons per second in a reactor and converts reactant at $7.5\times10^{-5}\ \mathrm{mol\,s^{-1}}$. What is the quantum yield, assuming one chain per photon and one molecule consumed per cycle? (Enter $\Phi$.)
::: solution
$\Phi = 7.5\times10^{-5} / 2.5\times10^{-9} = 3.0\times10^{4}$. A yield far above 1 proves a chain: the photon is a trigger, not a reagent.
:::
:::

::: exercise Quadruple the initiator {level=1 check="2"}
A chain with bimolecular termination runs at rate $v$ with initiator concentration $[\mathrm{I}]$. By what factor does the rate change if $[\mathrm{I}]$ is quadrupled (termination mechanism unchanged)? (Enter the factor.)
::: solution
Rate $\propto r_\mathrm{i}^{1/2} \propto [\mathrm{I}]^{1/2}$, so the factor is $\sqrt{4} = 2$. Four times the initiator buys only twice the rate, because the extra carriers kill each other faster: this sub-linearity is the experimental signature of pair termination.
:::
:::

::: exercise Evaluate the HBr law {level=2 check="0.0000527"}
With $k = 1.0\times10^{-2}\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1}}$ and $k' = 10$, find $\mathrm{d}[\mathrm{HBr}]/\mathrm{d}t$ when $[\mathrm{H_2}] = 0.100$, $[\mathrm{Br_2}] = 0.100$ and $[\mathrm{HBr}] = 0.050\ \mathrm{mol\,dm^{-3}}$. (Enter the rate in $\mathrm{mol\,dm^{-3}\,s^{-1}}$.)
::: solution
$v = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}/(1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}]) = (1.0\times10^{-2})(0.100)(0.3162)/(1 + 10\times0.50) = 3.162\times10^{-4}/6 = 5.27\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. The denominator is 6: inhibition has already cut the rate to one sixth of its uninhibited value at this composition.
:::
:::

::: exercise Pressure and the second limit {level=2 check="2"}
At the second explosion limit of a hydrogen–oxygen mixture, three-body termination exactly balances branching. By what factor does the ratio (three-body termination)/(branching) change when the total pressure is doubled at constant composition and temperature? (Enter the factor.)
::: solution
Branching $\propto p^2$, three-body termination $\propto p^3$, so the ratio $\propto p$ and the factor is $2$. The mixture moves above the second limit and becomes non-explosive: extra third bodies strangle the chain faster than branching can grow it.
:::
:::

::: exercise Steady-state carrier concentration {level=2 check="0.00000001"}
A chain has $r_\mathrm{i} = 2.0\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ and bimolecular termination with $k_\mathrm{t} = 1.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Find $[\mathrm{X\cdot}]_\text{ss}$. (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$[\mathrm{X\cdot}]_\text{ss} = (r_\mathrm{i}/2k_\mathrm{t})^{1/2} = (2.0\times10^{-6}/2.0\times10^{10})^{1/2} = (1.0\times10^{-16})^{1/2} = 1.0\times10^{-8}\ \mathrm{mol\,dm^{-3}}$. Ten nanomolar of carriers — and with $k_\mathrm{p}[\mathrm{M}] \sim 10^{3}\ \mathrm{s^{-1}}$ they still drive a rate of $10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$.
:::
:::

::: exercise Two ways for a chain to die {level=3}
A chain has initiation at rate $r_\mathrm{i}$, propagation $\mathrm{X\cdot} + \mathrm{M} \rightarrow$ product $+\ \mathrm{X\cdot}$ with rate constant $k_\mathrm{p}$, bimolecular termination $2\,\mathrm{X\cdot} \rightarrow$ dead with $k_\mathrm{t}$, *and* wall termination $\mathrm{X\cdot} \rightarrow$ dead with first-order $k_\mathrm{w}$. Derive the rate law by the steady state and obtain both limiting forms: (a) bimolecular termination dominant, (b) wall termination dominant. In which limit does the rate depend on the vessel size, and why is that observation historically decisive?
::: solution
The carrier balance is $\mathrm{d}[\mathrm{X\cdot}]/\mathrm{d}t = r_\mathrm{i} - 2k_\mathrm{t}[\mathrm{X\cdot}]^2 - k_\mathrm{w}[\mathrm{X\cdot}] \approx 0$, a quadratic,
$$
[\mathrm{X\cdot}]_\text{ss} = \frac{-k_\mathrm{w} + \left(k_\mathrm{w}^2 + 8k_\mathrm{t}r_\mathrm{i}\right)^{1/2}}{4k_\mathrm{t}},
\qquad
v = k_\mathrm{p}[\mathrm{M}][\mathrm{X\cdot}]_\text{ss}.
$$
(a) If $8k_\mathrm{t}r_\mathrm{i} \gg k_\mathrm{w}^2$: $[\mathrm{X\cdot}]_\text{ss} \to (r_\mathrm{i}/2k_\mathrm{t})^{1/2}$ and $v = k_\mathrm{p}[\mathrm{M}](r_\mathrm{i}/2k_\mathrm{t})^{1/2}$ — the half-order law, independent of the vessel. (b) If $k_\mathrm{w}^2 \gg 8k_\mathrm{t}r_\mathrm{i}$: the square root expands as $k_\mathrm{w}\bigl[1 + 4k_\mathrm{t}r_\mathrm{i}/k_\mathrm{w}^2 + \cdots\bigr]$, giving $[\mathrm{X\cdot}]_\text{ss} \to r_\mathrm{i}/k_\mathrm{w}$ and $v = k_\mathrm{p}[\mathrm{M}]\,r_\mathrm{i}/k_\mathrm{w}$ — first order in initiation, and proportional to $k_\mathrm{w}$, which by diffusion scales as $1/r^2$ with vessel radius. Historically decisive: early photochlorination yields were found to depend on the vessel — surface-sensitive chain death — which no single-step mechanism could admit and which settled the chain interpretation before any carrier was ever seen.
:::
:::

::: exercise The clock of an explosive mixture {level=3 check="0.00069"}
At a certain temperature and pressure a hydrogen–oxygen mixture has $k_\mathrm{b}[\mathrm{O_2}] = 3.0\times10^{4}\ \mathrm{s^{-1}}$ and $k_\mathrm{t}[\mathrm{O_2}][\mathrm{M}] + k_\mathrm{w} = 1.0\times10^{4}\ \mathrm{s^{-1}}$. How long does the carrier concentration take to grow by a factor $10^{6}$ from a small steady source? (Enter the time in seconds.)
::: solution
$\phi = 3.0\times10^{4} - 1.0\times10^{4} = 2.0\times10^{4}\ \mathrm{s^{-1}}$, and $[\mathrm{R\cdot}]$ grows as $e^{\phi t}$, so
$$
t = \frac{\ln 10^{6}}{\phi} = \frac{13.8}{2.0\times10^{4}} = 6.9\times10^{-4}\ \mathrm{s}.
$$
A millisecond from carriers to a million-fold avalanche — which is why "explosion" and "fast reaction" are the same phrase in chemistry, and why the induction time of a detonation is measured in microseconds once $\phi$ grows with temperature.
:::
:::
