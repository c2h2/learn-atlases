A balanced equation is a summary, not a route. The statement $\mathrm{H_2(g) + Br_2(g) \rightarrow 2\,HBr(g)}$ tells you what disappears and what appears, and nothing whatever about *how* the atoms get from here to there. That silence is not a gap in the notation — it is the central fact of this chapter: most reactions do not happen in one go. They travel a sequence of molecular events, an **elementary step** at a time, and the rate law you measure in the flask is the collective fingerprint of that sequence. [[kinetics/rate-laws]] showed how rate laws are measured; here we build the machinery that runs in the opposite direction, from a proposed sequence of steps to a predicted rate law, and back again — from an observed law, with its half-orders and its product inhibition, to a mechanism that could have produced it. The two approximations that do almost all the work, the **steady-state approximation** and the **pre-equilibrium**, are tools for eliminating the intermediates you cannot see from the rate laws you can measure; learning when each is legitimate, and when neither is, is the real skill of the chapter.

## Elementary steps and molecularity

::: definition Elementary reaction, molecularity, intermediate {#def-elementary}
An **elementary reaction** (or **elementary step**) is a single molecular event — one collision, one bond-breaking, one rearrangement — that occurs exactly as written and cannot be decomposed into simpler chemical events. The number of reactant entities that come together in the step is its **molecularity**: *unimolecular* (one molecule rearranges or fragments), *bimolecular* (two collide and react), *termolecular* (three meet simultaneously). An **intermediate** is a species produced in one elementary step and consumed in a later one; it cancels from the overall equation and never appears in the stoichiometry. A **transition state** is not an intermediate: it is a maximum on the potential energy surface with no measurable lifetime, whereas an intermediate sits in a minimum and could, in principle, be detected. The **overall reaction** is the sum of the elementary steps, with intermediates cancelled; the sum must reproduce the observed stoichiometry exactly.
:::

Every mechanism must pass this bookkeeping test first: add the steps, cancel the intermediates, and the net equation must be the reaction you actually studied. The test is necessary and almost never sufficient, because a thousand mechanisms pass it for any given equation. What narrows the field is the rate law.

::: proposition Rate law of an elementary step {#prop-mass-action}
An elementary step proceeds at a rate proportional to the product of the concentrations of the reacting entities, each raised to the power of its coefficient *in that step* (the mass-action form due to Guldberg and Waage):
$$
\mathrm{A \rightarrow products}: \; v = k[\mathrm{A}]; \qquad
\mathrm{A + B \rightarrow products}: \; v = k[\mathrm{A}][\mathrm{B}]; \qquad
\mathrm{2\,A \rightarrow products}: \; v = k[\mathrm{A}]^2 .
$$
For an elementary step the orders *are* the coefficients, because the step happens by the stated collision. The converse fails completely: a rate law $v = k[\mathrm{A}]^2$ is consistent with an elementary bimolecular step but equally consistent with a two-step mechanism whose slow step follows a pre-equilibrium that stores one A in a complex. Molecularity belongs to a step; order is a property of the observed law, and the two coincide only when you already know the step is elementary.
:::

Why is termolecular molecularity so rare? A bimolecular step needs one partner to be present when the first arrives; a termolecular step needs a *third* body to be inside the encounter volume at the same instant. At $\mathrm{298\ K}$ and $1\ \mathrm{bar}$ the number density of a gas is $2.4\times10^{25}\ \mathrm{m^{-3}}$, and the volume of an encounter complex — a sphere of radius about $0.4\ \mathrm{nm}$ — is $2.7\times10^{-28}\ \mathrm{m^3}$, so the probability that a third molecule happens to be present is only $n \cdot \tfrac{4}{3}\pi r^3 \approx 0.007$, about one encounter in a hundred and fifty. The third body must also arrive within the $\sim 10^{-13}\ \mathrm{s}$ lifetime of the encounter and carry away the excess energy, or the pair simply falls apart. Genuine termolecular steps are therefore at least a thousandfold rarer than bimolecular ones, and are known essentially only when the alternative is impossible: $\mathrm{O\cdot + O_2 + M \rightarrow O_3 + M}$ in ozone formation, and $\mathrm{H\cdot + H\cdot + M \rightarrow H_2 + M}$, where no bimolecular route can dispose of the bond energy. A *third-order rate law*, by contrast, is common — and is almost always the signature of a different story, a rapid pre-association that stores two molecules before a bimolecular step, as you will see for $\mathrm{2\,NO + O_2}$ in [[#ex-preeq]].

::: warning A mechanism can be disproved, never proved {#warn-mechanism}
A proposed mechanism earns belief only by passing three tests: (1) the steps sum to the observed stoichiometry; (2) the rate law it implies agrees with the measured one over the whole range of concentrations, temperature and conversion; (3) it is consistent with every intermediate actually detected, and with isotope labelling, stereochemistry and trapping experiments. A mechanism that passes all three is still only the current best hypothesis — *different* mechanisms can predict the *same* rate law, and kinetics cannot distinguish them. What kinetics does supremely well is the opposite: a mechanism whose predicted law disagrees with experiment, or whose intermediate is searched for and firmly absent, is dead. Never write "the rate law proves the mechanism"; write "consistent with", and remember that the strongest statement kinetics supports is *falsified*.
:::

::: example Molecularity and the rate laws of the steps {#ex-molecularity}
The gas-phase reaction $\mathrm{NO_2 + CO \rightarrow NO + CO_2}$ is second order at $\mathrm{250\,^\circ C}$, $v = k[\mathrm{NO_2}]^2$, and *zero order* in CO. A proposed mechanism is step 1, $\mathrm{NO_2 + NO_2 \rightarrow NO_3 + NO}$ with rate constant $k_1$; step 2, $\mathrm{NO_3 + CO \rightarrow NO_2 + CO_2}$ with rate constant $k_2$, where step 1 is much slower than step 2. Show that the mechanism is consistent with the stoichiometry, write the rate law of each step, and derive the overall law. Why does CO not appear in it?
::: solution
**Sum.** Adding the steps, $\mathrm{NO_3}$ appears on both sides and cancels (it is the intermediate), and one $\mathrm{NO_2}$ cancels from each side, leaving $\mathrm{NO_2 + CO \rightarrow NO + CO_2}$ — the observed stoichiometry. **Step laws.** Both steps are bimolecular, so by [[#prop-mass-action]] $v_1 = k_1[\mathrm{NO_2}]^2$ and $v_2 = k_2[\mathrm{NO_3}][\mathrm{CO}]$. **Overall rate.** NO is produced only in step 1, so
$$
\frac{\mathrm{d}[\mathrm{NO}]}{\mathrm{d}t} = v_1 = k_1[\mathrm{NO_2}]^2,
$$
which is second order in $\mathrm{NO_2}$ and independent of CO, exactly as observed. **Why CO is invisible.** Because step 2 is fast, every $\mathrm{NO_3}$ is swept up the moment it forms: the steady-state level $[\mathrm{NO_3}] = k_1[\mathrm{NO_2}]^2/(k_2[\mathrm{CO}])$ is tiny, and CO enters only this unobservably small correction. CO cannot influence the rate until the bottleneck — step 1 — has passed. This is the first appearance of the rate-determining-step idea, and [[#warn-rds]] will show how carefully it must be stated.
:::
:::

## Consecutive reactions: A → B → C

The simplest mechanism with an intermediate is two steps in series, $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$. It is exactly solvable, and its solution teaches most of what there is to know about intermediates and bottlenecks.

::: proposition The consecutive first-order solution {#prop-consecutive}
For $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$, all steps first order, with $[\mathrm{A}]_0 = a$ and $[\mathrm{B}]_0 = [\mathrm{C}]_0 = 0$:
$$
[\mathrm{A}] = a\,e^{-k_1 t}, \qquad
[\mathrm{B}] = \frac{a\,k_1}{k_2 - k_1}\left(e^{-k_1 t} - e^{-k_2 t}\right), \qquad
[\mathrm{C}] = a - [\mathrm{A}] - [\mathrm{B}].
$$ {#eq-consec}
The intermediate rises from zero, passes through a **maximum** at
$$
t_\text{max} = \frac{\ln\!\left(k_1/k_2\right)}{k_1 - k_2},
\qquad
[\mathrm{B}]_\text{max} = a\left(\frac{k_1}{k_2}\right)^{k_2/(k_2 - k_1)},
$$
and the product $[\mathrm{C}]$ has no initial slope: it waits for B to build up. The curve of [[#eq-consec]] is sketched by the figure below — no integrated-rate-law plot of [[kinetics/rate-laws]] can linearise it, which is why consecutive kinetics is recognised by the *shape* of the traces.
:::

::: proof The consecutive solution and the intermediate maximum {#proof-consecutive}
Step 1 is plain first order: $[\mathrm{A}] = ae^{-k_1t}$. Step 2 feeds B at rate $k_1[\mathrm{A}]$ and drains it at $k_2[\mathrm{B}]$:
$$
\frac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t} = k_1 a\,e^{-k_1 t} - k_2[\mathrm{B}].
$$
This linear equation yields to the integrating factor $e^{k_2 t}$:
$$
\frac{\mathrm{d}}{\mathrm{d}t}\!\left([\mathrm{B}]\,e^{k_2 t}\right) = k_1 a\,e^{(k_2 - k_1)t}
\quad\Longrightarrow\quad
[\mathrm{B}]\,e^{k_2 t} = \frac{k_1 a}{k_2 - k_1}\,e^{(k_2 - k_1)t} + \text{const}.
$$
$[\mathrm{B}]_0 = 0$ fixes the constant as $-k_1 a/(k_2 - k_1)$, and dividing by $e^{k_2 t}$ gives [[#eq-consec]]. $[\mathrm{C}]$ follows from mass balance $[\mathrm{A}] + [\mathrm{B}] + [\mathrm{C}] = a$. For the maximum, set $\mathrm{d}[\mathrm{B}]/\mathrm{d}t = 0$, i.e. $k_1 e^{-k_1 t} = k_2 e^{-k_2 t}$; taking logs, $t_\text{max} = \ln(k_1/k_2)/(k_1 - k_2)$. Substituting back, note $e^{-k_1 t_\text{max}} = (k_2/k_1)^{k_1/(k_1-k_2)}$ and $e^{-k_2 t_\text{max}} = (k_2/k_1)^{k_2/(k_1-k_2)}$, so that
$$
[\mathrm{B}]_\text{max} = \frac{a k_1}{k_2 - k_1}\left(\frac{k_2}{k_1}\right)^{\!k_2/(k_1-k_2)}\left[\frac{k_2}{k_1} - 1\right] = a\left(\frac{k_1}{k_2}\right)^{\!k_2/(k_2-k_1)}. \qquad\blacksquare
$$
:::

::: widget odesolver
f: 0.10*exp(-0.10*t) - 0.025*y
y0: 0
t: 0, 60
exact: 0.10/(0.10-0.025)*(exp(-0.025*t) - exp(-0.10*t))
h: 0.5
caption: The intermediate $[\mathrm{B}](t)$ of the consecutive reaction of [[#ex-consecutive]] ($k_1 = 0.100\ \mathrm{s^{-1}}$, $k_2 = 0.025\ \mathrm{s^{-1}}$, $a = 1.00\ \mathrm{mol\,dm^{-3}}$): the numerical solution of $y' = k_1 a\,e^{-k_1 t} - k_2 y$ — Euler, Heun and RK4 against the exact curve of [[#eq-consec]] — with step $h$ adjustable. B rises, peaks at $t_\text{max} = 18.5\ \mathrm{s}$, then decays with the *slower* rate constant $k_2$: the intermediate's late-time behaviour is governed not by how it was made but by how slowly it is destroyed. Compare the three methods at large $h$: the peak is where the numerical curves first disagree with the exact one.
:::

::: example When does the intermediate peak? {#ex-consecutive}
In $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$ with $k_1 = 0.100\ \mathrm{s^{-1}}$, $k_2 = 0.0250\ \mathrm{s^{-1}}$ and $a = 1.00\ \mathrm{mol\,dm^{-3}}$, find $t_\text{max}$, $[\mathrm{B}]_\text{max}$, and the concentrations of A and C at that moment.
::: solution
$$
t_\text{max} = \frac{\ln(0.100/0.0250)}{0.100 - 0.0250} = \frac{\ln 4.00}{0.0750} = \frac{1.386}{0.0750} = 18.5\ \mathrm{s},
$$
$$
[\mathrm{B}]_\text{max} = 1.00 \times \left(\frac{0.100}{0.0250}\right)^{0.0250/(0.0250-0.100)} = 4.00^{-1/3} = 0.630\ \mathrm{mol\,dm^{-3}}.
$$
At $t = 18.5\ \mathrm{s}$: $[\mathrm{A}] = e^{-(0.100)(18.5)} = e^{-1.848} = 0.157\ \mathrm{mol\,dm^{-3}}$, and by mass balance $[\mathrm{C}] = 1.00 - 0.630 - 0.157 = 0.213\ \mathrm{mol\,dm^{-3}}$.

The check is the rate equation itself: at the peak, $\mathrm{d}[\mathrm{B}]/\mathrm{d}t = k_1[\mathrm{A}] - k_2[\mathrm{B}] = (0.100)(0.157) - (0.0250)(0.630) = 0.0157 - 0.0158 \approx 0$ — inflow equals outflow, as it must at a maximum. Note the asymmetry the numbers reveal: B peaks *late* and high because it is consumed more slowly than it is made ($k_2 < k_1$); two-thirds of the sample is still sitting in the intermediate well past the first half-life of A.
:::
:::

The two limits of [[#prop-consecutive]] give the naive rate-determining-step intuition. If $k_2 \gg k_1$, then $[\mathrm{B}] \approx (k_1/k_2)[\mathrm{A}]$ at all times: B never accumulates, C appears at rate $k_1[\mathrm{A}]$, and *step 1 controls*. If $k_1 \gg k_2$, B piles up quickly and then drains away with its own, step-2 timescale; after the initial burst, *step 2 controls*. If $k_1 \approx k_2$, neither statement is true.

::: warning The rate-determining step belongs to a regime {#warn-rds}
State the concept precisely: a step is **rate-determining** in a given regime if the observed rate constant is proportional to that step's rate constant (formally, if the sensitivity $\mathrm{d}\ln k_\text{obs}/\mathrm{d}\ln k_i = 1$ for that step and $0$ for the others). For the consecutive reaction, $k_\text{obs} = k_1$ when $k_1 \ll k_2$ and $k_\text{obs} = k_2$ when $k_1 \gg k_2$ — the *same step* is rate-determining in one regime and irrelevant in the other, and a change of temperature, which moves $k_1$ and $k_2$ by different factors, can hand the baton from one step to the next. When $k_1 \approx k_2$ there is no rate-determining step at all: both rate constants appear in $t_\text{max}$ and neither dominates. "The slow step is the bottleneck" is a rule of thumb that is exact only between crossovers; write down $k_\text{obs}$ first, and *then* ask which step owns it.
:::

## Competing reactions: selectivity, kinetic and thermodynamic control

::: definition Competing reactions and selectivity {#def-parallel}
**Competing** (or **parallel**) reactions consume the same reactant by different channels, $\mathrm{A \xrightarrow{k_1} B}$ and $\mathrm{A \xrightarrow{k_2} C}$. The rates add, $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = (k_1 + k_2)[\mathrm{A}]$, so A decays with the summed constant, while the product ratio is fixed by the branching ratio:
$$
\frac{[\mathrm{B}]}{[\mathrm{C}]} = \frac{k_1}{k_2}, \qquad \text{fraction of A going to B} = \frac{k_1}{k_1 + k_2}.
$$
For channels of the *same order* the ratio is independent of $[\mathrm{A}]$ and of time; when the orders differ, $[\mathrm{A}]$ itself becomes a selectivity dial — a first-order channel gains on a second-order one as the reactant is diluted. With Arrhenius forms $k_i = A_i e^{-E_{\mathrm{a},i}/RT}$,
$$
\frac{k_1}{k_2} = \frac{A_1}{A_2}\,e^{-(E_{\mathrm{a},1} - E_{\mathrm{a},2})/RT},
$$
so at low temperature the channel with the lower barrier dominates more completely, and heating always erodes an activation-controlled selectivity.
:::

Two regimes of product control follow. If both channels are effectively **irreversible** — low temperature, short times — the product ratio is $k_1/k_2$ and the major product is simply the one that forms faster: the reaction is under **kinetic control**. If the steps are **reversible** and given time to equilibrate, the ratio becomes the equilibrium constant $K = e^{-\Delta_\mathrm{r} G^\circ/RT}$ and the major product is the more stable one: **thermodynamic control**. The same pair of products can be obtained in either order by choosing temperature and time.

::: example Kinetic versus thermodynamic control {#ex-parallel}
Reactant A can form B with $E_{\mathrm{a},1} = 50.0\ \mathrm{kJ\,mol^{-1}}$ or C with $E_{\mathrm{a},2} = 60.0\ \mathrm{kJ\,mol^{-1}}$, with equal pre-exponential factors. (a) What is $[\mathrm{B}]/[\mathrm{C}]$ at $\mathrm{25\,^\circ C}$ if neither step reverses? (b) At $\mathrm{527\,^\circ C}$? (c) If instead both steps reverse and equilibrium is reached at $\mathrm{25\,^\circ C}$, and C lies $15.0\ \mathrm{kJ\,mol^{-1}}$ below B, what is the ratio?
::: solution
(a) With $T = 298.15\ \mathrm{K}$,
$$
\frac{[\mathrm{B}]}{[\mathrm{C}]} = \exp\!\left(\frac{E_{\mathrm{a},2} - E_{\mathrm{a},1}}{RT}\right) = \exp\!\left(\frac{10\,000}{8.314 \times 298.15}\right) = e^{4.036} = 56.5,
$$
so B is $56.5/57.5 = 98\ \%$ of the product: kinetic control, the lower barrier wins. (b) At $T = 800\ \mathrm{K}$ the exponent is $10\,000/(8.314 \times 800) = 1.504$, the ratio $4.50$, and B only $82\ \%$ — heating erodes the selectivity, exactly as the definition predicts. (c) At equilibrium,
$$
\frac{[\mathrm{C}]}{[\mathrm{B}]} = \exp\!\left(\frac{15\,000}{8.314 \times 298.15}\right) = e^{6.05} = 425,
$$
so now C, the *more stable* product, is $99.8\ \%$: thermodynamic control. The example is the whole philosophy of quenching a reaction cold and early versus refluxing it for hours — you are choosing which ratio, $k_1/k_2$ or $K$, writes your product distribution.
:::
:::

::: widget plot
f: exp(dE*1000/(8.314*x))
x: 200, 1000
y: 0, 100
sliders: dE=10:2:20:1
labels: \text{selectivity } k_1/k_2
caption: Activation-controlled selectivity $k_1/k_2 = e^{\Delta E_\mathrm{a}/RT}$ for two competing channels whose pre-exponential factors are equal, against temperature, with the barrier difference $\Delta E_\mathrm{a}$ in $\mathrm{kJ\,mol^{-1}}$ set by the slider. Every curve falls steeply as $T$ rises — you cannot cool a reaction into a selectivity the barriers do not contain, and a $2\ \mathrm{kJ\,mol^{-1}}$ difference buys only a factor of about two at room temperature. This is why chemists chase *catalysts* that change the mechanism (and so the barriers), not merely lower the temperature.
:::

## The steady-state approximation

::: history
Max **Bodenstein** — whose 1913 study of $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$ was mentioned in [[general-chemistry-2/rates-intro]] — introduced the idea that a reactive intermediate reaches a constant small concentration at which its rate of formation equals its rate of destruction, and used it to derive the hydrogen–bromine rate law from a chain mechanism: the first great triumph of mechanism over stoichiometry. A sharper statement of the method, as a system of equations $\mathrm{d}[\text{intermediate}]/\mathrm{d}t = 0$, is due independently to J. F. Christiansen (1919) and to Cyril **Hinshelwood** and collaborators in the 1920s, who built it into a general theory of overall reactions. Hinshelwood shared the 1956 Nobel Prize in Chemistry with Nikolay Semyonov for the kinetics of chain reactions. The intermediates themselves stayed invisible for another generation until Ronald Norrish and George Porter began blasting reactions with flashes of light in 1949 — flash photolysis, for which they shared the 1967 Prize. Bodenstein's approximation and Porter's flash are the two halves of the subject: the algebra that assumes the intermediate, and the light that sees it.
:::

::: definition The steady-state approximation {#def-ssa}
Let an intermediate $\mathrm{I}$ be formed at some rate $v_\text{form}$ and destroyed by first-order (or pseudo-first-order) processes with total rate constant $k_\mathrm{d}$, so that $\mathrm{d}[\mathrm{I}]/\mathrm{d}t = v_\text{form} - k_\mathrm{d}[\mathrm{I}]$. Then $[\mathrm{I}]$ approaches the **steady-state value**
$$
[\mathrm{I}]_\text{ss} = \frac{v_\text{form}}{k_\mathrm{d}}
$$
exponentially, with **lifetime** $\tau = 1/k_\mathrm{d}$, and after an induction period of a few $\tau$ we may set $\mathrm{d}[\mathrm{I}]/\mathrm{d}t \approx 0$. The approximation is good when $k_\mathrm{d} \gg k_\text{obs}$: the intermediate is destroyed far faster than the overall reaction changes its environment, so it is *reactive and short-lived*, present at a tiny quasi-constant level. It fails for stable, accumulating intermediates — a species with a long lifetime is not in steady state, it is a product that has not finished reacting.
:::

::: proof The three-halves-order law of hydrogen–bromine {#proof-bodenstein}
At the very start of $\mathrm{H_2 + Br_2 \rightarrow 2\,HBr}$, before any HBr exists to inhibit it, Bodenstein's chain is
$$
\begin{aligned}
\mathrm{Br_2} &\xrightarrow{k_1} 2\,\mathrm{Br\cdot} && \text{initiation}\\
\mathrm{Br\cdot + H_2} &\xrightarrow{k_2} \mathrm{HBr + H\cdot} && \text{propagation}\\
\mathrm{H\cdot + Br_2} &\xrightarrow{k_3} \mathrm{HBr + Br\cdot} && \text{propagation}\\
2\,\mathrm{Br\cdot} &\xrightarrow{k_5} \mathrm{Br_2} && \text{termination}
\end{aligned}
$$
Apply [[#def-ssa]] to both radical intermediates. For $\mathrm{H\cdot}$, formation and destruction balance:
$$
k_2[\mathrm{Br\cdot}][\mathrm{H_2}] - k_3[\mathrm{H\cdot}][\mathrm{Br_2}] = 0.
$$ {#eq-hbr-h}
For $\mathrm{Br\cdot}$, initiation creates two per event and termination destroys two:
$$
2k_1[\mathrm{Br_2}] - 2k_5[\mathrm{Br\cdot}]^2 - k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] = 0,
$$
and the last two terms cancel *by* [[#eq-hbr-h]] — the chain carries bromine atoms between the propagation steps without net consumption. What remains is initiation balanced against termination,
$$
[\mathrm{Br\cdot}] = \left(\frac{k_1}{k_5}\right)^{\!1/2}[\mathrm{Br_2}]^{1/2},
$$
and the half-order is born: the radical concentration tracks the *square root* of the initiation rate. HBr is formed in both propagation steps, and by [[#eq-hbr-h]] the two rates are equal, so
$$
\frac{\mathrm{d}[\mathrm{HBr}]}{\mathrm{d}t} = k_2[\mathrm{Br\cdot}][\mathrm{H_2}] + k_3[\mathrm{H\cdot}][\mathrm{Br_2}] = 2k_2[\mathrm{Br\cdot}][\mathrm{H_2}] = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2} [\mathrm{H_2}][\mathrm{Br_2}]^{1/2}. \quad\blacksquare
$$
Overall order $1 + \tfrac12 = \tfrac32$, with no termolecular step anywhere. Adding the one further propagation step $\mathrm{H\cdot + HBr \xrightarrow{k_4} H_2 + Br\cdot}$, which steals H atoms back, completes Bodenstein's full law,
$$
v = \frac{k\,[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}}{1 + k'\,[\mathrm{HBr}]/[\mathrm{Br_2}]}, \qquad k = 2k_2\left(\frac{k_1}{k_5}\right)^{\!1/2},\quad k' = \frac{k_4}{k_3},
$$
which agrees with experiment over the whole range of conversion. A half-order and a product in the denominator are the fingerprints of a chain; no one would guess them, and no one needed to — Bodenstein *predicted* the shape from the mechanism.
:::

::: widget slopefield
f: a - c*y
x: 0, 5
y: 0, 0.6
sliders: a=0.5:0.1:1.0:0.1; c=2:0.5:5:0.1
points: 0, 0; 0, 0.6
caption: The approach to steady state, $y' = a - c\,y$: an intermediate formed at constant rate $a$ and destroyed with rate constant $c$ runs from any starting value to $y_\text{ss} = a/c$ along the exponential $y = (a/c)\left(1 - e^{-ct}\right)$, in a time of a few $1/c$. Click to launch trajectories from new initial values — including *above* the steady state, from which the field pulls the concentration back down. In a real mechanism $a$ is not constant but follows the slowly falling reactant, so the trajectory rides the moving line $y = a/c$: that is the steady state, a fast variable slaved to a slow one.
:::

::: example A composite rate law from a two-step mechanism {#ex-ssa}
Consider $\mathrm{A \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} I \xrightarrow{k_2} P}$, all steps first order, with $k_1 = 0.050\ \mathrm{s^{-1}}$, $k_{-1} = 500\ \mathrm{s^{-1}}$, $k_2 = 10\ \mathrm{s^{-1}}$. Derive the rate law by the steady-state approximation and find (a) $k_\text{obs}$, (b) the steady-state ratio $[\mathrm{I}]_\text{ss}/[\mathrm{A}]$, (c) the lifetime of I and the validity of the approximation, (d) the pre-equilibrium limit.
::: solution
$\mathrm{d}[\mathrm{I}]/\mathrm{d}t = k_1[\mathrm{A}] - k_{-1}[\mathrm{I}] - k_2[\mathrm{I}] \approx 0$ gives $[\mathrm{I}]_\text{ss} = k_1[\mathrm{A}]/(k_{-1} + k_2)$ and
$$
v = k_2[\mathrm{I}]_\text{ss} = \frac{k_1 k_2}{k_{-1} + k_2}[\mathrm{A}].
$$
(a) $k_\text{obs} = (0.050 \times 10)/(500 + 10) = 9.8\times10^{-4}\ \mathrm{s^{-1}}$. (b) $[\mathrm{I}]_\text{ss}/[\mathrm{A}] = k_1/(k_{-1} + k_2) = 9.8\times10^{-5}$: the intermediate is present at one hundred-thousandth of A — far below what ordinary analysis or spectroscopy would notice, which is exactly why mechanisms need this algebra. (c) $\tau = 1/(k_{-1} + k_2) = 1/510 = 2.0\ \mathrm{ms}$; since $k_\text{obs}\,\tau = 2\times10^{-6} \ll 1$, I equilibrates its own books a million times over before A has changed appreciably — the steady state is superb. (d) The pre-equilibrium value is $K k_2 = (k_1/k_{-1})k_2 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$, only $2\ \%$ above the exact steady-state result, because $k_{-1} \gg k_2$ puts this mechanism squarely in the pre-equilibrium regime of [[#prop-preeq]].
:::
:::

::: quiz
Which description fits an intermediate for which the steady-state approximation works best?
- [x] Reactive and short-lived: destroyed almost as soon as it is formed, so after a brief induction period its concentration is tiny and nearly constant.
- [ ] Stable and long-lived: it accumulates through the whole reaction and its concentration grows steadily.
- [ ] Any intermediate, always — the approximation is an identity, not a physical assumption.
- [ ] One whose concentration is high enough to measure conveniently by ordinary spectroscopy.
::: solution
The first option. Steady state means *balance*, not permanence: formation and destruction are fast, the level is low, and $\mathrm{d}[\mathrm{I}]/\mathrm{d}t \approx 0$ because the small value changes only as fast as the reactants feeding it change. A stable accumulating species (option 2) is precisely the failure case — its derivative is not small. Option 3 inverts the logic: the approximation is a physical assumption with the quantitative check $k_\mathrm{d} \gg k_\text{obs}$ of [[#def-ssa]]. And option 4's premise is backwards: steady-state concentrations are usually *below* ordinary detection limits, as [[#ex-ssa]] found — see the section below on actually seeing intermediates.
:::
:::

There is a useful way to hold all of this in mind, the **residence-time view**. The lifetime $\tau = [\mathrm{I}]_\text{ss}/v_\text{form}$ is the average time one molecule spends as I: each A visits the intermediate for $\tau$ seconds on its way to P, and the steady state simply says the population of visitors is constant while they keep arriving and leaving. In a chain reaction the same bookkeeping is called the **chain-carrier view**: the carriers $\mathrm{Br\cdot}$, $\mathrm{H\cdot}$ are born at the initiation rate and die at termination, and between birth and death each one turns over the propagation cycle many times. The **chain length** — propagation rate divided by initiation rate — counts those turnovers, and can reach $10^{4}$–$10^{6}$; the carriers themselves sit at parts-per-million of the stable species. A reaction can be, and in chain chemistry often is, carried almost entirely by species you could not detect if you titrated for them.

::: algorithm The steady-state recipe {#alg-ssa}
**Input:** a proposed sequence of elementary steps with rate constants. **Output:** the rate law the mechanism implies. **(1)** List the intermediates — species produced and consumed within the mechanism. **(2)** Write $\mathrm{d}[\mathrm{I}]/\mathrm{d}t$ for each: every step producing I enters with $+$, every step consuming it with $-$, each at its mass-action rate from [[#prop-mass-action]]. **(3)** Set every derivative to zero and solve the simultaneous algebraic equations for the $[\mathrm{I}]_\text{ss}$. **(4)** Write the rate of product formation, substituting the $[\mathrm{I}]_\text{ss}$; all intermediates must cancel. **(5)** Check the result: the orders must match observation; the limits $k_{-1} \gg k_2$, high pressure, zero conversion must reduce to laws you already trust; and the implied $[\mathrm{I}]_\text{ss}$ must be small enough for the approximation to be self-consistent. A mechanism that fails step (5) has been disproved; one that passes has been encouraged, not proved ([[#warn-mechanism]]).
:::

## The pre-equilibrium approximation

::: proposition The pre-equilibrium approximation, and its relation to the steady state {#prop-preeq}
Let $\mathrm{I}$ be formed reversibly and consumed irreversibly, $\mathrm{A \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} I \xrightarrow{k_2} P}$. If the intermediate is far more likely to fall back to A than to go on to P — $k_{-1} \gg k_2$ — then the steady-state result of [[#ex-ssa]] simplifies:
$$
[\mathrm{I}]_\text{ss} = \frac{k_1[\mathrm{A}]}{k_{-1} + k_2} \approx \frac{k_1}{k_{-1}}[\mathrm{A}] = K[\mathrm{A}],
\qquad
v = k_2 K\,[\mathrm{A}],
$$
and the first step sits in a **pre-equilibrium** with constant $K$, undisturbed by the trickle draining it. The pre-equilibrium is therefore *not a new assumption but the $k_{-1} \gg k_2$ limit of the steady state*, and it generalises to any fast reversible step: dimers, hydrogen-bonded complexes, proton transfers. Because $k_\text{obs} = k_2 K$, apparent Arrhenius parameters combine:
$$
E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H, \qquad \ln k_\text{obs} = \ln(k_2^\circ K^\circ) - \frac{E_{\mathrm{a},2} + \Delta H}{R}\cdot\frac{1}{T},
$$
where $\Delta H < 0$ for an exothermic pre-association. A sufficiently exothermic pre-equilibrium makes the apparent activation energy — and hence $k_\text{obs}$ — *decrease* with temperature: negative activation energies are real, and they are mechanism talking.
:::

::: example Pre-equilibrium dimerisation: the oxidation of nitric oxide {#ex-preeq}
The reaction $\mathrm{2\,NO + O_2 \rightarrow 2\,NO_2}$ is third order, $v = k_\text{obs}[\mathrm{NO}]^2[\mathrm{O_2}]$, and $k_\text{obs}$ *falls* as the reaction is warmed. Take the mechanism $\mathrm{2\,NO \rightleftharpoons N_2O_2}$ as a fast pre-equilibrium with $K = 1.2\times10^{-2}\ \mathrm{dm^{3}\,mol^{-1}}$ and $\mathrm{N_2O_2 + O_2 \xrightarrow{k_2} 2\,NO_2}$ with $k_2 = 4.0\times10^{6}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (both values illustrative of the room-temperature magnitudes). (a) Derive the rate law and compute $k_\text{obs}$. (b) With $\Delta H = -60\ \mathrm{kJ\,mol^{-1}}$ for the dimerisation and $E_{\mathrm{a},2} = 20\ \mathrm{kJ\,mol^{-1}}$ for the second step, find $E_{\mathrm{a,app}}$ and the factor by which $k_\text{obs}$ changes from $300$ to $350\ \mathrm{K}$.
::: solution
(a) Pre-equilibrium: $[\mathrm{N_2O_2}] = K[\mathrm{NO}]^2$, so
$$
v = k_2[\mathrm{N_2O_2}][\mathrm{O_2}] = k_2 K\,[\mathrm{NO}]^2[\mathrm{O_2}],
\qquad
k_\text{obs} = (4.0\times10^{6})(1.2\times10^{-2}) = 4.8\times10^{4}\ \mathrm{dm^{6}\,mol^{-2}\,s^{-1}}.
$$
Third order, with no termolecular collision: the two NO molecules are stored in the dimer before the bimolecular event, and the units of $k_\text{obs}$ ($\mathrm{dm^{6}\,mol^{-2}\,s^{-1}}$, order $3$) come from multiplying $k_2$ by an equilibrium constant. (b) $E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H = 20 - 60 = -40\ \mathrm{kJ\,mol^{-1}}$, and
$$
\frac{k_\text{obs}(350)}{k_\text{obs}(300)} = \exp\!\left[\frac{-40\,000}{8.314}\left(\frac{1}{300} - \frac{1}{350}\right)\right] = e^{-2.29} = 0.10,
$$
a tenfold *slowing* for a $50\ \mathrm{K}$ rise: heating destroys the dimer faster than it accelerates the step that consumes it. The real oxidation of NO does slow on warming, which is one of the classic pieces of evidence that it is not the elementary termolecular step it appears to be.
:::
:::

## Seeing the intermediate

The steady state makes intermediates small — $[\mathrm{I}]_\text{ss}/[\mathrm{A}] = 10^{-4}$ in [[#ex-ssa]] — and small is exactly what ordinary analysis cannot see. Four strategies defeat the invisibility, and each has shaped the history of the subject. **Chemical trapping**: quench the reaction into a reagent that reacts irreversibly with I and nothing else, and weigh the adduct. **Matrix isolation**: at a few kelvin in an argon matrix, diffusion stops, intermediates pile up, and their infrared spectra can be recorded at leisure. **Spin trapping and ESR**: radical intermediates are trapped as stable nitroxides whose electron paramagnetic resonance spectrum identifies them — the method that proved the radical chains of combustion and polymerisation. And **time resolution**: if the steady-state level is too low, create a *non*-steady state — a flash of light or a pulse of reactant builds a measurable burst of I, and a probe beam watches it decay at its own $k_\mathrm{d}$. This is flash photolysis, Norrish and Porter's 1949 invention, whose laser descendants reach femtoseconds; it is taken up in [[kinetics/photochemistry]], and it is the experimental half of everything in this chapter.

::: quiz
For $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$ with $k_1 = 0.010\ \mathrm{s^{-1}}$ and $k_2 = 100\ \mathrm{s^{-1}}$, which step is rate-determining?
- [x] Step 1: $k_\text{obs} = k_1$, because every B formed is consumed before A has run out — the large $k_2$ is precisely why step 2 cannot be the bottleneck.
- [ ] Step 2, because $k_2 = 100\ \mathrm{s^{-1}}$ is the larger rate constant.
- [ ] Neither: with $k_1 \ll k_2$ the two steps share control equally.
- [ ] Both steps are equally rate-determining because they occur in the same sequence.
::: solution
Step 1. Here $k_2 \gg k_1$, so $[\mathrm{B}] \approx (k_1/k_2)[\mathrm{A}] = 10^{-4}[\mathrm{A}]$ at all times and C appears at rate $k_1[\mathrm{A}]$: the observed rate constant *is* $k_1$, and by the sensitivity test of [[#warn-rds]] step 1 owns the rate. Option 2 makes the classic error of calling the *largest* constant the bottleneck — the bottleneck is the *slowest* step in the path, and a huge $k_2$ means step 2 clears traffic instantly. Options 3 and 4 describe the crossover regime $k_1 \approx k_2$, which this is not.
:::
:::

## Where this leads

The hydrogen–bromine proof in [[#proof-bodenstein]] was a taste of [[kinetics/chain-reactions]], where chain length, branching and the explosion limits of combustion follow from the same steady-state bookkeeping. This chapter took the rate constants of elementary steps as given; [[kinetics/collision-theory]] and [[kinetics/transition-state-theory]] ask what *sets* them — collision frequencies, barriers, and the free energy of the transition state that replaces the intermediate's flat minimum with a measurable activation entropy. The pre-equilibrium of [[#prop-preeq]] is the first half of every catalytic cycle, and [[kinetics/homogeneous-catalysis]] applies the steady state to the catalyst itself; [[kinetics/photochemistry]] supplies the flashes that make intermediates visible; and the measurement side — how one actually obtains the $k_\text{obs}$ this chapter feeds on — is [[kinetics/rate-laws]], with [[general-chemistry-2/rates-intro]] as its foundation.

::: summary
- An elementary step occurs exactly as written; its orders are its coefficients. The overall reaction is the sum of the steps, and intermediates cancel from it.
- Termolecular steps are rare (a third body is present in only about one encounter in a hundred and fifty at 1 bar); third-order *laws* usually come from a pre-equilibrium that stores two molecules.
- A mechanism can never be proved, only disproved: agreement of the predicted rate law is necessary, never sufficient.
- Consecutive reactions $\mathrm{A \rightarrow B \rightarrow C}$ have the exact solution $[\mathrm{B}] = a\,k_1(e^{-k_1 t} - e^{-k_2 t})/(k_2 - k_1)$; the intermediate peaks at $t_\text{max} = \ln(k_1/k_2)/(k_1 - k_2)$, where inflow equals outflow.
- The rate-determining step is regime-dependent: $k_\text{obs} = k_1$ when $k_1 \ll k_2$, $k_\text{obs} = k_2$ when $k_1 \gg k_2$, and no single step owns the rate near $k_1 \approx k_2$.
- Competing channels give $[\mathrm{B}]/[\mathrm{C}] = k_1/k_2$ (kinetic control); reversible channels equilibrate to $K$ (thermodynamic control); heating erodes activation selectivity.
- The steady-state approximation sets $\mathrm{d}[\mathrm{I}]/\mathrm{d}t \approx 0$ for reactive, short-lived intermediates ($k_\mathrm{d} \gg k_\text{obs}$) and yields composite laws such as Bodenstein's $\tfrac32$-order HBr law, half-order and inhibition being chain fingerprints.
- The pre-equilibrium is the $k_{-1} \gg k_2$ limit of the steady state; $k_\text{obs} = k_2 K$ and $E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H$, so exothermic pre-association can make activation energies negative.
:::

## Exercises

::: exercise A termolecular step, hypothetically {level=1 check="8"}
Suppose $\mathrm{2\,NO + O_2 \rightarrow 2\,NO_2}$ were a single elementary termolecular step. By what factor would the rate increase if $[\mathrm{NO}]$ were doubled at constant $[\mathrm{O_2}]$? (Enter the factor.)
::: solution
An elementary step obeys [[#prop-mass-action]]: $v = k[\mathrm{NO}]^2[\mathrm{O_2}]$, so doubling $[\mathrm{NO}]$ multiplies the rate by $2^2 = 8$. The factor is 8. (The real reaction *is* third order — but [[#ex-preeq]] showed it reaches that law through a dimer pre-equilibrium, not a three-body collision: the factor 8 alone cannot tell the two mechanisms apart.)
:::
:::

::: exercise Lifetime of an intermediate {level=1 check="0.004"}
An intermediate I is destroyed by two parallel first-order processes with $k_{-1} = 200\ \mathrm{s^{-1}}$ and $k_2 = 50\ \mathrm{s^{-1}}$. What is its mean lifetime $\tau$? (Enter it in seconds.)
::: solution
The destruction rate constants add, so $k_\mathrm{d} = k_{-1} + k_2 = 250\ \mathrm{s^{-1}}$ and $\tau = 1/k_\mathrm{d} = 1/250 = 0.004\ \mathrm{s}$, four milliseconds. Any mechanism whose overall rate constant is much below $2.5\ \mathrm{s^{-1}}$ may treat I by the steady state.
:::
:::

::: exercise Branching fraction {level=1 check="0.8"}
Two competing first-order channels from A have $k_1 = 4.0\times10^{-2}\ \mathrm{s^{-1}}$ (to B) and $k_2 = 1.0\times10^{-2}\ \mathrm{s^{-1}}$ (to C). What fraction of A ends up as B? (Enter the fraction.)
::: solution
For same-order competing channels the branching ratio is time-independent: fraction to B $= k_1/(k_1 + k_2) = 4.0/(4.0 + 1.0) = 0.80$. Eighty per cent B, and the same 4 : 1 ratio holds at every instant of the reaction.
:::
:::

::: exercise Peak of the intermediate {level=2 check="9.24"}
For $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$ with $k_1 = 0.20\ \mathrm{s^{-1}}$ and $k_2 = 0.050\ \mathrm{s^{-1}}$, at what time does $[\mathrm{B}]$ pass through its maximum? (Enter the time in seconds, to three significant figures.)
::: solution
$t_\text{max} = \ln(k_1/k_2)/(k_1 - k_2) = \ln(4.0)/0.15 = 1.386/0.15 = 9.24\ \mathrm{s}$. At that moment inflow $k_1[\mathrm{A}]$ equals outflow $k_2[\mathrm{B}]$ — the same check that closed [[#ex-consecutive]].
:::
:::

::: exercise Selectivity from a barrier difference {level=2 check="56.5"}
Two competing channels have equal pre-exponential factors and activation energies $E_{\mathrm{a},1} = 45\ \mathrm{kJ\,mol^{-1}}$, $E_{\mathrm{a},2} = 55\ \mathrm{kJ\,mol^{-1}}$. What is $k_1/k_2$ at $\mathrm{25\,^\circ C}$? (Enter the ratio.)
::: solution
$k_1/k_2 = \exp[(E_{\mathrm{a},2} - E_{\mathrm{a},1})/RT] = \exp[10\,000/(8.314 \times 298.15)] = e^{4.036} = 56.5$. A barrier difference of only $10\ \mathrm{kJ\,mol^{-1}}$ — a hydrogen bond's worth — gives a fifty-fold selectivity at room temperature; at $800\ \mathrm{K}$ the same pair would give only about $4.5$ ([[#ex-parallel]]).
:::
:::

::: exercise Composite rate constant {level=2 check="0.00381"}
For $\mathrm{A \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} I \xrightarrow{k_2} P}$ with $k_1 = 0.080\ \mathrm{s^{-1}}$, $k_{-1} = 400\ \mathrm{s^{-1}}$ and $k_2 = 20\ \mathrm{s^{-1}}$, find the observed first-order rate constant $k_\text{obs}$. (Enter it in $\mathrm{s^{-1}}$.)
::: solution
The steady state gives $k_\text{obs} = k_1 k_2/(k_{-1} + k_2) = (0.080 \times 20)/(420) = 3.81\times10^{-3}\ \mathrm{s^{-1}}$. The pre-equilibrium estimate $K k_2 = (k_1/k_{-1})k_2 = 4.0\times10^{-3}$ is $5\ \%$ high — the size of the error is the measure of how far $k_{-1} \gg k_2$ still falls short of exact.
:::
:::

::: exercise The product of the consecutive reaction {level=3}
For $\mathrm{A \xrightarrow{k_1} B \xrightarrow{k_2} C}$ with $[\mathrm{A}]_0 = a$, derive the explicit expression
$$
[\mathrm{C}](t) = a\left[1 - \frac{k_2\,e^{-k_1 t} - k_1\,e^{-k_2 t}}{k_2 - k_1}\right],
$$
and show that as $k_2 \rightarrow \infty$ the intermediate vanishes and $[\mathrm{C}] \rightarrow a(1 - e^{-k_1 t})$: the product then forms at the rate of step 1 alone.
::: solution
By mass balance, $[\mathrm{C}] = a - [\mathrm{A}] - [\mathrm{B}] = a - a e^{-k_1 t} - \dfrac{a k_1}{k_2 - k_1}\left(e^{-k_1 t} - e^{-k_2 t}\right)$. Collect the $e^{-k_1 t}$ terms: $-a e^{-k_1 t}\left(1 + \dfrac{k_1}{k_2 - k_1}\right) = -a e^{-k_1 t}\cdot\dfrac{k_2}{k_2 - k_1}$, so
$$
[\mathrm{C}] = a - \frac{a}{k_2 - k_1}\left(k_2\,e^{-k_1 t} - k_1\,e^{-k_2 t}\right),
$$
which is the stated form. As $k_2 \to \infty$: $\dfrac{k_2 e^{-k_1 t} - k_1 e^{-k_2 t}}{k_2 - k_1} \to e^{-k_1 t}$ (the $e^{-k_2t}$ term dies instantly and the prefactor tends to 1), giving $[\mathrm{C}] \to a(1 - e^{-k_1 t})$, and from [[#prop-consecutive]], $[\mathrm{B}] \to a\,\frac{k_1}{k_2}e^{-k_1t} \to 0$. Physically: an intermediate consumed infinitely fast never accumulates, and the overall rate is step 1's — the $k_2 \gg k_1$ regime of [[#warn-rds]] in closed form.
:::
:::

::: exercise The Lindemann mechanism {level=3}
Unimolecular gas reactions $\mathrm{A \rightarrow P}$ were long puzzling: activation by collisions looks bimolecular. The Lindemann mechanism is $\mathrm{A + M \xrightarrow{k_1} A^* + M}$, $\mathrm{A^* \xrightarrow{k_2} P}$, $\mathrm{A^* + M \xrightarrow{k_{-1}} A + M}$, where $\mathrm{A^*}$ is a vibrationally excited molecule. Apply the steady state to $\mathrm{A^*}$, derive $v$ and $k_\text{obs} = v/[\mathrm{A}]$, and obtain both the high-pressure and low-pressure limits. Explain, in terms of the residence-time view of the intermediate, why the reaction becomes second order at low pressure.
::: solution
$\mathrm{d}[\mathrm{A^*}]/\mathrm{d}t = k_1[\mathrm{A}][\mathrm{M}] - k_2[\mathrm{A^*}] - k_{-1}[\mathrm{A^*}][\mathrm{M}] \approx 0$, so
$$
[\mathrm{A^*}]_\text{ss} = \frac{k_1[\mathrm{A}][\mathrm{M}]}{k_2 + k_{-1}[\mathrm{M}]},
\qquad
v = k_2[\mathrm{A^*}]_\text{ss} = \frac{k_1 k_2[\mathrm{A}][\mathrm{M}]}{k_2 + k_{-1}[\mathrm{M}]},
\qquad
k_\text{obs} = \frac{k_1 k_2[\mathrm{M}]}{k_2 + k_{-1}[\mathrm{M}]}.
$$
**High pressure** ($k_{-1}[\mathrm{M}] \gg k_2$): $k_\text{obs} \to k_1 k_2/k_{-1}$, first order — collisions deactivate $\mathrm{A^*}$ many times before it reacts, so excitation and de-excitation hold a Boltzmann-like equilibrium population of $\mathrm{A^*}$ and only the unimolecular step limits. **Low pressure** ($k_{-1}[\mathrm{M}] \ll k_2$): $k_\text{obs} \to k_1[\mathrm{M}]$, second order. Residence-time view: the lifetime of $\mathrm{A^*}$ is $\tau = 1/(k_2 + k_{-1}[\mathrm{M}])$. At high pressure $\tau$ is set by deactivating collisions and $\mathrm{A^*}$ is in equilibrium with A; at low pressure an excited molecule is far more likely to react than to be hit again, every activation event that happens goes to product, and the rate is simply the activation rate $k_1[\mathrm{A}][\mathrm{M}]$ — bimolecular, because a collision must *make* each reacting molecule. Observed fall-off of $k_\text{obs}$ with pressure, between these limits, is the mechanism confirmed.
:::
:::
