A thermodynamic table tells you that diamond should turn to graphite at room temperature, that a mixture of hydrogen and oxygen should make water, and that a slice of bread should slowly oxidise to carbon dioxide and water. All of these are true, and none of them happens on a timescale you can see: the diamond ring is forever, the gas mixture sits in its flask for years until a spark arrives, and the bread keeps until tomorrow. Thermodynamics answers the question "which way, and how far?"; it is silent on the question "how fast?". **Chemical kinetics** is the study of that second question — how fast reactions go, how the rate depends on concentration and temperature, and by what sequence of molecular events — the *mechanism* — the reaction actually travels. Rates span an almost unimaginable range: the neutralisation $\mathrm{H^+(aq) + OH^-(aq) \rightarrow H_2O(l)}$ is essentially diffusion-limited, complete the instant solutions mix, while the rusting of a ship's hull takes seasons and the radioactive decay of $\mathrm{^{238}U}$ takes billions of years. This chapter builds the vocabulary and the handful of equations with which all of that variety is described: the rate, the rate law, the integrated rate law, the Arrhenius equation, and the catalyst.

## How fast? Rates and their measurement

::: definition Reaction rate {#def-rate}
The **rate of reaction** is the speed at which reactants are converted into products, expressed as a change in amount concentration per unit time. For a single reaction at constant volume, the rate is defined so that it does not depend on which species you watch: for
$$
a\,\mathrm{A} + b\,\mathrm{B} \rightarrow c\,\mathrm{C} + d\,\mathrm{D}
\qquad\text{rate} = -\frac{1}{a}\frac{\mathrm{d}[\mathrm{A}]}{\mathrm{d}t} = -\frac{1}{b}\frac{\mathrm{d}[\mathrm{B}]}{\mathrm{d}t} = \frac{1}{c}\frac{\mathrm{d}[\mathrm{C}]}{\mathrm{d}t} = \frac{1}{d}\frac{\mathrm{d}[\mathrm{D}]}{\mathrm{d}t},
$$
where $[\mathrm{X}]$ is the concentration of $\mathrm{X}$ in $\mathrm{mol\,dm^{-3}}$. The **average rate** over a time interval is the quotient $\Delta[\mathrm{X}]/\Delta t$; the (instantaneous) **rate** is the limit of that quotient as $\Delta t \rightarrow 0$, the slope of the tangent to the concentration–time curve. The stoichiometric factors $1/a$, $1/b$, … make the rate a single positive number characterising the *reaction*, not any one substance; without them the rate would depend on what you chose to measure.
:::

You cannot watch molecules collide, so every rate is measured by following some bulk property in time: the colour of a reacting solution by spectrophotometry (a classic undergraduate experiment is the fading of purple $\mathrm{MnO_4^-}$ as oxalic acid reduces it), the volume or pressure of a gas produced, the electrical conductivity as ions appear or disappear, the rotation of plane-polarised light as one chiral sugar inverts to another, or the concentration of a quenched aliquot withdrawn at known times. Plot the property against time, convert it to concentration, and the rate at any moment is the slope of the tangent. The **initial rate** $v_0$, the slope at $t = 0$, plays a special role because at that moment the concentrations are the ones you mixed, nothing has reversed, and no slow side chemistry has had time to start.

::: example Rates of consumption and formation {#ex-rate-stoich}
Dinitrogen pentoxide decomposes in the gas phase by $2\,\mathrm{N_2O_5(g)} \rightarrow 4\,\mathrm{NO_2(g)} + \mathrm{O_2(g)}$. At a certain moment the concentration of $\mathrm{N_2O_5}$ is falling at $4.8\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. What are (a) the rate of reaction, (b) the rate of formation of $\mathrm{O_2}$, and (c) the rate of formation of $\mathrm{NO_2}$ at that moment?
::: solution
(a) By the definition of rate with the factor $1/2$ for $\mathrm{N_2O_5}$,
$$
\text{rate} = -\frac{1}{2}\frac{\mathrm{d}[\mathrm{N_2O_5}]}{\mathrm{d}t} = \frac{4.8\times10^{-4}}{2} = 2.4\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}.
$$
(b) One $\mathrm{O_2}$ appears per unit of reaction progress, so $\mathrm{d}[\mathrm{O_2}]/\mathrm{d}t = \text{rate} = 2.4\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. (c) Four $\mathrm{NO_2}$ appear per unit of progress, so $\mathrm{d}[\mathrm{NO_2}]/\mathrm{d}t = 4\times2.4\times10^{-4} = 9.6\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$.

Notice the arithmetic of the check: the reactant falls at $4.8\times10^{-4}$, the products rise at $9.6\times10^{-4}$ and $2.4\times10^{-4}$, and the three rates stand in the ratio $2:4:1$ — exactly the coefficients. The single number $2.4\times10^{-4}$ is the rate of *the reaction*; the others are rates of *species*.
:::
:::

::: quiz
For the same reaction, a student writes $-\mathrm{d}[\mathrm{N_2O_5}]/\mathrm{d}t = \mathrm{d}[\mathrm{O_2}]/\mathrm{d}t$. Why is this wrong?
- [x] $\mathrm{N_2O_5}$ disappears twice as fast as $\mathrm{O_2}$ appears, so the two derivatives differ by the factor 2 from the stoichiometric coefficients.
- [ ] Nothing is wrong; the two rates are always equal.
- [ ] The derivatives have different units, so they cannot be compared.
- [ ] It is only valid once equilibrium is reached.
::: solution
Two $\mathrm{N_2O_5}$ are consumed for every $\mathrm{O_2}$ formed, so $-\mathrm{d}[\mathrm{N_2O_5}]/\mathrm{d}t = 2\,\mathrm{d}[\mathrm{O_2}]/\mathrm{d}t$. The derivatives do carry the same units, and the relation holds at every instant, not just at equilibrium — it is bookkeeping, not chemistry. The correct statement is $-\tfrac{1}{2}\,\mathrm{d}[\mathrm{N_2O_5}]/\mathrm{d}t = \mathrm{d}[\mathrm{O_2}]/\mathrm{d}t = \text{rate}$.
:::
:::

## The rate law

::: definition Rate law, reaction order {#def-rate-law}
A **rate law** states the rate as a function of the concentrations of the species present, most often in the power-law form
$$
v = k\,[\mathrm{A}]^{m}[\mathrm{B}]^{n}\cdots
$$
The exponent $m$ is the **order of reaction in A**, $n$ the order in B, and the sum $m + n + \cdots$ the **overall order**. The proportionality constant $k$ is the **rate constant**; at fixed temperature it does not depend on concentration at all. The orders $m, n, \ldots$ are determined **experimentally** and are in general *not* the stoichiometric coefficients; they may be integers, zero, fractional or even negative. The units of $k$ must make the rate come out in $\mathrm{mol\,dm^{-3}\,s^{-1}}$: for overall order $o$, $k$ has units $\mathrm{mol^{1-o}\,dm^{3(o-1)}\,s^{-1}}$ — so $\mathrm{s^{-1}}$ for first order, $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ for second, $\mathrm{dm^{6}\,mol^{-2}\,s^{-1}}$ for third.
:::

The temptation to read the rate law off the balanced equation must be resisted completely. It is true only for an **elementary reaction** — a single molecular event — and even then only for its own step. The overall reaction $2\,\mathrm{NO(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{NO_2(g)}$ happens to be third order, $v = k[\mathrm{NO}]^2[\mathrm{O_2}]$, but the reaction $\mathrm{H_2(g) + Br_2(g) \rightarrow 2\,HBr(g)}$ obeys a rate law with a term in the denominator, $v = k[\mathrm{H_2}][\mathrm{Br_2}]^{1/2}/(1 + k'[\mathrm{HBr}]/[\mathrm{Br_2}])$, with a half-order and product inhibition that no one would guess from the equation. Orders are facts about mechanism, and mechanisms are found, not assumed.

::: proposition The method of initial rates {#prop-initial-rates}
Suppose the rate law is $v = k[\mathrm{A}]^m[\mathrm{B}]^n$ and you measure initial rates $v_0$ from runs in which only the starting concentrations vary. If a run with $[\mathrm{A}]$ doubled (and $[\mathrm{B}]$ held) doubles… or quadruples… the initial rate, then $m = 1$, $2$, …, and in general
$$
m = \frac{\ln\!\big(v_0' / v_0\big)}{\ln\!\big([\mathrm{A}]'/[\mathrm{A}]\big)} \quad (\text{all other concentrations fixed}).
$$
Once $m$ and $n$ are known, $k$ follows from any single run by substitution. Holding one reagent in large excess (the **isolation method**) turns its concentration into a constant folded into an observed rate constant, so that orders can be taken one at a time.
:::

::: example Orders from initial-rate data: NO + O2 {#ex-initial-rates}
For $2\,\mathrm{NO(g)} + \mathrm{O_2(g)} \rightarrow 2\,\mathrm{NO_2(g)}$ at $\mathrm{25\,^\circ C}$, illustrative initial-rate data of the kind such experiments give are:

| run | $[\mathrm{NO}]/\mathrm{mol\,dm^{-3}}$ | $[\mathrm{O_2}]/\mathrm{mol\,dm^{-3}}$ | $v_0\ /\mathrm{mol\,dm^{-3}\,s^{-1}}$ |
|---|---|---|---|
| 1 | 0.010 | 0.010 | $7.0\times10^{-3}$ |
| 2 | 0.020 | 0.010 | $2.8\times10^{-2}$ |
| 3 | 0.010 | 0.020 | $1.4\times10^{-2}$ |

Determine the orders and the rate constant.
::: solution
Runs 1 and 2 differ only in $[\mathrm{NO}]$, doubled, and the rate rises by $2.8\times10^{-2}/7.0\times10^{-3} = 4.0 = 2^2$: the reaction is **second order in NO**. Runs 1 and 3 differ only in $[\mathrm{O_2}]$, doubled, and the rate doubles: **first order in** $\mathrm{O_2}$. The rate law is $v = k[\mathrm{NO}]^2[\mathrm{O_2}]$, overall third order — a genuinely rare thing for a single observed law. From run 1,
$$
k = \frac{7.0\times10^{-3}}{(0.010)^2(0.010)} = 7.0\times10^{3}\ \mathrm{dm^{6}\,mol^{-2}\,s^{-1}},
$$
and the units follow the rule for $o = 3$. Substituting runs 2 and 3 reproduces the same $k$ to the quoted figures — the consistency is the point of the method.
:::
:::

::: warning The rate constant is not the rate, and the order is not the coefficient {#warn-order}
Three confusions this chapter exists to prevent. First, $k$ and $v$ are different objects: $v$ changes as the reaction proceeds and concentrations fall, while $k$ (at fixed temperature) does not; a reaction can have a large $k$ and a small rate simply because the concentrations are small, as in the thin upper atmosphere. Second, the orders in a rate law are **not** the stoichiometric coefficients unless the step is elementary: $2\,\mathrm{NO} + \mathrm{O_2}$ is third order by a genuine coincidence of mechanism, while most reactions with a "2" in the equation are not second order. Third, a large $k$ says nothing about how far the reaction goes — rate and equilibrium are independent questions, and a thermodynamically favourable reaction can have a $k$ so small that nothing observable happens.
:::

## Integrated rate laws

::: proposition The three integrated rate laws {#prop-integrated}
For a single reactant $\mathrm{A} \rightarrow$ products at constant volume, with rate law $v = k[\mathrm{A}]^{o}$ and no significant reverse reaction, integration of $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^{o}$ gives

| order $o$ | $[\mathrm{A}](t)$ | straight-line plot | slope | half-life $t_{1/2}$ |
|---|---|---|---|---|
| 0 | $[\mathrm{A}]_0 - kt$ | $[\mathrm{A}]$ vs $t$ | $-k$ | $[\mathrm{A}]_0/2k$ |
| 1 | $[\mathrm{A}]_0\,e^{-kt}$ | $\ln[\mathrm{A}]$ vs $t$ | $-k$ | $(\ln 2)/k$ |
| 2 | $[\mathrm{A}]_0/(1 + kt[\mathrm{A}]_0)$ | $1/[\mathrm{A}]$ vs $t$ | $+k$ | $1/(k[\mathrm{A}]_0)$ |

The half-life $t_{1/2}$, the time for $[\mathrm{A}]$ to fall to half its value, is **constant only for a first-order reaction**; for zero order it shrinks as the reaction proceeds, for second order it grows. These forms also apply to higher-order reactions run under **pseudo-order** conditions, where every reagent but one is in large excess and its concentration is absorbed into $k$.
:::

::: proof The first-order integrated law and its half-life {#proof-first-order}
For $o = 1$ the rate equation is $\mathrm{d}[\mathrm{A}]/\mathrm{d}t = -k[\mathrm{A}]$. Separate the variables,
$$
\frac{\mathrm{d}[\mathrm{A}]}{[\mathrm{A}]} = -k\,\mathrm{d}t,
$$
and integrate from $[\mathrm{A}]_0$ at $t = 0$ to $[\mathrm{A}]$ at time $t$:
$$
\int_{[\mathrm{A}]_0}^{[\mathrm{A}]} \frac{\mathrm{d}[\mathrm{A}]}{[\mathrm{A}]} = -k\int_0^t \mathrm{d}t
\qquad\Longrightarrow\qquad
\ln\frac{[\mathrm{A}]}{[\mathrm{A}]_0} = -kt,
$$
that is $[\mathrm{A}] = [\mathrm{A}]_0 e^{-kt}$: a first-order concentration decays **exponentially**, and a plot of $\ln[\mathrm{A}]$ against $t$ is a straight line of slope $-k$, which is how first order is recognised. Now set $[\mathrm{A}] = [\mathrm{A}]_0/2$ at $t = t_{1/2}$:
$$
\ln\frac{1}{2} = -k\,t_{1/2}
\qquad\Longrightarrow\qquad
t_{1/2} = \frac{\ln 2}{k},
$$
which contains no $[\mathrm{A}]_0$. A first-order reaction takes the same time to go from any concentration to half of it — the reason a radioactive or first-order sample needs exactly two half-lives to fall to a quarter, not one. The second-order law is derived the same way in the exercises.
:::

::: example Dinitrogen pentoxide: half-lives and the exponential law {#ex-n2o5}
$\mathrm{N_2O_5}$ decomposes in $\mathrm{CCl_4}$ solution at $\mathrm{25\,^\circ C}$ by $2\,\mathrm{N_2O_5} \rightarrow 4\,\mathrm{NO_2} + \mathrm{O_2}$ with first-order rate constant $k = 1.7\times10^{-3}\ \mathrm{s^{-1}}$ (a standard tabulated value). Starting from $[\mathrm{N_2O_5}]_0 = 0.100\ \mathrm{mol\,dm^{-3}}$, find (a) the half-life, (b) the time for 75 % decomposition, and (c) the concentration after $20.0\ \mathrm{min}$.
::: solution
(a) $t_{1/2} = \ln 2 / k = 0.6931/1.7\times10^{-3} = 4.1\times10^{2}\ \mathrm{s}$, about $6.8\ \mathrm{min}$.
(b) 75 % decomposed means a quarter remains, and a quarter is two halvings: $t = 2t_{1/2} = 8.2\times10^{2}\ \mathrm{s} \approx 13.6\ \mathrm{min}$. Equivalently $\ln(0.100/0.025)/k = \ln 4/k$, the same number.
(c) $[\mathrm{N_2O_5}] = 0.100 \times e^{-(1.7\times10^{-3})(1200)} = 0.100 \times e^{-2.04} = 0.013\ \mathrm{mol\,dm^{-3}}$.

Two sanity checks are worth making in your head. After $20\ \mathrm{min} \approx 3$ half-lives the concentration should be a little above $0.100/8 = 0.0125$, and it is. And the answer to (b) must be exactly twice (a) whatever $k$ is, because the half-life of a first-order reaction does not care where it starts.
:::
:::

::: widget plot
f: max(a - k*x, 0); a*exp(-k*x); a/(1 + a*k*x)
x: 0, 10
y: 0, 1.1
sliders: a=1:0.2:2:0.1; k=0.5:0.1:1.5:0.1
labels: \text{zero order}; \text{first order}; \text{second order}
caption: The three integrated rate laws for the same initial concentration $a$ and the same rate constant $k$ (both set by sliders), in units where $k$ is per unit time. The zero-order curve is a straight line that runs out at $t = a/k$; the first-order curve is the exponential; the second-order curve falls fast at first and then crawls. The shapes separate most clearly in the first few half-lives — which is why kineticists plot $\ln[\mathrm{A}]$ and $1/[\mathrm{A}]$ against $t$ rather than trusting the raw decay curve.
:::

::: widget slopefield
f: -k*y
x: 0, 10
y: 0, 1.1
sliders: k=0.5:0.1:2:0.1
points: 0, 1
caption: The slope field of the first-order rate equation $y' = -k\,y$ (here $y$ is $[\mathrm{A}]/[\mathrm{A}]_0$) with $k$ set by the slider; click to add solution curves. Every curve is an exponential, and the slope at each point is proportional to the height — the geometric signature of first order. Raising $k$ tilts the whole field downhill faster: $k$ is literally the steepness of the decay.
:::

::: quiz
Carbon-14 decays with a half-life of 5730 years. A 1 g sample of old wood and a 1 mg sample of the same wood are measured. Which statement is correct?
- [x] Both samples lose half their $\mathrm{^{14}C}$ in 5730 years, because radioactive decay is first order and the half-life does not depend on how much you start with.
- [ ] The 1 g sample takes a thousand times longer to lose half its $\mathrm{^{14}C}$.
- [ ] The half-life cannot be used because the samples are not the same size.
- [ ] The smaller sample decays faster per gram.
::: solution
First-order half-life is $(\ln 2)/k$ and contains no initial amount — see the proof above. The *activity* (decays per second) of the 1 g sample is a thousand times larger, because there are a thousand times more atoms, but the *fraction* lost per year is identical. That independence is what makes radiocarbon dating work on a splinter as well as a beam.
:::
:::

::: warning A half-life is only a half-life for first order {#warn-halflife}
"$t_{1/2} = 0.693/k$" is quoted so often that it is treated as a definition of $k$; it is not. It is a *consequence* of first order. For a zero-order reaction $t_{1/2} = [\mathrm{A}]_0/2k$ — double the starting concentration and the half-life doubles, and the reaction finishes altogether at $t = [\mathrm{A}]_0/k$ (many enzyme-catalysed reactions are zero order in substrate precisely because the enzyme is saturated, which is also why they stop abruptly). For a second-order reaction $t_{1/2} = 1/(k[\mathrm{A}]_0)$ — the reaction appears to *slow down* in half-life terms, each half-life twice the last. If successive half-lives from one experiment are not equal, the reaction is not first order, and measuring how they change is itself a way of finding the order.
:::

## Temperature: the Arrhenius equation

::: proposition The Arrhenius equation {#prop-arrhenius}
The rate constant of most reactions depends on the absolute temperature $T$ approximately as
$$
k = A\,e^{-E_\mathrm{a}/RT}
\qquad\Longleftrightarrow\qquad
\ln k = \ln A - \frac{E_\mathrm{a}}{R}\cdot\frac{1}{T},
$$
where $A$ is the **pre-exponential factor** (or frequency factor), $E_\mathrm{a}$ the **activation energy**, and $R$ the gas constant. A plot of $\ln k$ against $1/T$ (an **Arrhenius plot**) is a straight line of slope $-E_\mathrm{a}/R$ and intercept $\ln A$, and between two temperatures,
$$
\ln\frac{k_2}{k_1} = \frac{E_\mathrm{a}}{R}\left(\frac{1}{T_1} - \frac{1}{T_2}\right).
$$
The equation is an **empirical rule** — it fits an enormous range of reactions over moderate temperature intervals, and $E_\mathrm{a}$ and $A$ are treated as constants there — but it is not a law of nature: $A$ in fact varies slowly with $T$, some reactions show curved or even negative-slope Arrhenius plots, and a few barrierless reactions have small *negative* activation energies.
:::

::: example Activation energy from two temperatures {#ex-arrhenius}
For gas-phase $\mathrm{N_2O_5}$ decomposition the tabulated activation energy is $E_\mathrm{a} = 103\ \mathrm{kJ\,mol^{-1}}$ and $k = 3.4\times10^{-5}\ \mathrm{s^{-1}}$ at $\mathrm{25\,^\circ C}$. Estimate $k$ at $\mathrm{55\,^\circ C}$ and the factor by which the rate has risen.
::: solution
With $T_1 = 298.15\ \mathrm{K}$, $T_2 = 328.15\ \mathrm{K}$,
$$
\ln\frac{k_2}{k_1} = \frac{103\times10^{3}}{8.314}\left(\frac{1}{298.15} - \frac{1}{328.15}\right) = 12\,390 \times 3.066\times10^{-4} = 3.80,
$$
so $k_2/k_1 = e^{3.80} = 45$ and $k_2 = 45 \times 3.4\times10^{-5} = 1.5\times10^{-3}\ \mathrm{s^{-1}}$. A $30\ \mathrm{K}$ rise multiplies the rate by forty-five — which is why the kitchen rules "refrigeration roughly triples shelf life per $\mathrm{10\,K}$" and "the rate doubles every $10\ \mathrm{K}$" both exist and both are only rules of thumb.

Carry the extra digits through: rounding $3.066\times10^{-4}$ too early moves the answer by several per cent, and the exponential punishes sloppiness in $E_\mathrm{a}/RT$ far more than in anything else.
:::
:::

Why should a rate constant be exponential in $1/T$? Collision theory supplies the shape, if not the precision: molecules collide some $10^{28}$ times per second per $\mathrm{dm^3}$ in a gas at atmospheric pressure, so if *every* collision reacted, $k$ would be enormous. It reacts only if the collision energy along the line of centres exceeds a threshold $E_0$, and the Boltzmann fraction of collisions above $E_0$ is $e^{-E_0/RT}$ — the exponential. What remains, $A = PZ$, is the collision frequency $Z$ multiplied by an **orientation factor** $P \le 1$: NO₂ molecules must meet at the right atoms, and reactions of complex molecules have small $P$. The modern refinement, transition-state theory, replaces the threshold by a free energy of activation $\Delta^\ddagger G$ and is taken up in [[kinetics/transition-state-theory]]; for now, treat $E_\mathrm{a}$ as the experimentally measured slope of the Arrhenius plot and nothing more mysterious.

::: example What activation energy hides in the "doubles per 10 K" rule? {#ex-rule-of-thumb}
Near room temperature many reactions roughly double their rate for every $10\ \mathrm{K}$ rise. What activation energy does that correspond to for the step $298 \rightarrow 308\ \mathrm{K}$?
::: solution
Set $k_2/k_1 = 2$ and solve the two-temperature equation for $E_\mathrm{a}$:
$$
E_\mathrm{a} = \frac{R\ln 2}{\dfrac{1}{298.15} - \dfrac{1}{308.15}} = \frac{8.314 \times 0.6931}{1.088\times10^{-4}} = 5.3\times10^{4}\ \mathrm{J\,mol^{-1}},
$$
about $53\ \mathrm{kJ\,mol^{-1}}$. The rule of thumb is therefore a statement that a great many common reactions — ester hydrolyses, sugar decompositions, the microbial and oxidative processes that spoil food — have activation energies in the neighbourhood of $50\ \mathrm{kJ\,mol^{-1}}$. Reactions far above it (like $\mathrm{N_2O_5}$ at $103\ \mathrm{kJ\,mol^{-1}}$) speed up much more than the rule says; reactions below it, and diffusion-controlled ones, barely notice the thermostat. This is also the quantitative reason a freezer preserves: at $\mathrm{-18\,^\circ C}$ instead of $\mathrm{25\,^\circ C}$ a $50\ \mathrm{kJ\,mol^{-1}}$ spoilage reaction runs some $2\times10^{3}$ times slower.
:::
:::

::: widget plot
f: 27.63 - Ea*1000/(8.314*x)
x: 250, 450
y: -10, 15
sliders: Ea=60:20:120:5
labels: \text{Arrhenius plot of } \ln k
caption: An Arrhenius plot: $\ln(k/\mathrm{s^{-1}})$ against temperature $T$ for $A = 10^{12}\ \mathrm{s^{-1}}$ and activation energy $E_\mathrm{a}$ in $\mathrm{kJ\,mol^{-1}}$ set by the slider. The curve is steep and convex in $T$ — rate constants are exquisitely temperature-sensitive — but becomes a straight line of slope $-E_\mathrm{a}/R$ when drawn against $1/T$, which is why the reciprocal plot is the one on which $E_\mathrm{a}$ is measured. Slide $E_\mathrm{a}$ from 20 to $120\ \mathrm{kJ\,mol^{-1}}$ and watch the whole curve pivot: the higher the barrier, the more violently the rate responds to temperature.
:::

## Catalysts

::: definition Catalyst {#def-catalyst}
A **catalyst** is a substance that increases the rate of a reaction without being consumed by the overall reaction: it enters one or more steps of the mechanism and is regenerated in a later step, so it cancels from the net equation. It works by providing an **alternative pathway with a lower activation energy** — a different mechanism, not the same mechanism made kinder. A catalyst accelerates the forward and the reverse reaction *equally* (a consequence of microscopic reversibility: it must stabilise the transition state, which lies between both directions), so it changes how fast equilibrium is reached and never where it lies. Catalysis is **specific** — the catalyst that hydrolyses one ester may ignore its isomer — and catalysts are commonly **poisoned** by substances that bind them irreversibly.
:::

::: example How much does lowering the barrier buy? {#ex-catalyst}
The decomposition of hydrogen peroxide, $2\,\mathrm{H_2O_2(aq)} \rightarrow 2\,\mathrm{H_2O(l)} + \mathrm{O_2(g)}$, is slow uncatalysed; iodide ion offers a lower-energy two-step path ($\mathrm{H_2O_2 + I^- \rightarrow H_2O + IO^-}$, then $\mathrm{IO^- + H_2O_2 \rightarrow H_2O + O_2 + I^-}$, with $\mathrm{I^-}$ returned). If the catalysed path has an activation energy $25\ \mathrm{kJ\,mol^{-1}}$ lower at $\mathrm{25\,^\circ C}$, by what factor does the rate constant increase, assuming similar $A$?
::: solution
$$
\frac{k_\text{cat}}{k_\text{uncat}} = \exp\!\left(\frac{\Delta E_\mathrm{a}}{RT}\right) = \exp\!\left(\frac{25\,000}{8.314 \times 298.15}\right) = e^{10.1} = 2.4\times10^{4}.
$$
A barrier just $25\ \mathrm{kJ\,mol^{-1}}$ — a few per cent of a typical bond energy — lower buys a twenty-four-thousand-fold rate increase at room temperature. This is why catalysis is the most powerful lever in the chemist's hands, and why enzymes, which lower barriers by tens of $\mathrm{kJ\,mol^{-1}}$ more than any uncatalysed path, can achieve rate enhancements of $10^{10}$ and more.
:::
:::

::: warning A catalyst cannot do the impossible {#warn-catalyst}
A catalyst speeds the approach to equilibrium; it cannot change the equilibrium constant, the $\Delta_\mathrm{r}G^\circ$, or the yield at equilibrium, because it lowers the barrier from *both* sides by exactly the same amount. If a reaction is thermodynamically forbidden ($\Delta_\mathrm{r}G$ strongly positive), no catalyst will run it — catalysts are not magic, and the claim that one "makes an impossible reaction happen" confuses rate with extent. Nor does a catalyst change the heat of reaction: Hess's law applies to the overall change, whatever path is taken. What a catalyst *can* do — and industrially does, over and over — is choose *which* of several possible products forms fastest, which is selectivity, and that is a kinetic, not a thermodynamic, gift.
:::

::: history
Svante Arrhenius proposed his exponential rate law in 1889 after years of studying sugar inversion and other reactions in solution, introducing the "arrheniusche Energie" — the energy the reacting molecules must possess above the mean — and giving kinetics its first molecular interpretation. Wilhelm Ostwald, who coined the term *catalysis* and the word *catalyst* around 1894 and wrote the first general theory of catalysis, shared the intellectual stage with Jacobus van 't Hoff, whose studies of reaction rates and equilibrium between them made 1884–1902 the founding decade of physical chemistry. Max Bodenstein's 1913 treatment of the hydrogen–bromine reaction introduced the **steady-state approximation** and showed that a chain mechanism could reproduce a strange observed rate law — opening the era of chain reactions that Cyril Hinshelwood and Nikolay Semyonov enlarged in the 1930s. The thread runs directly forward into the kinetics and catalysis courses of this atlas.
:::

## Where this leads

Equilibrium, the next chapter, is simply the condition that the forward and reverse rates — each with its own Arrhenius temperature dependence — have become equal; [[general-chemistry-2/chemical-equilibrium]] makes that precise and shows why the ratio of rate constants is the equilibrium constant. Radioactive decay, the purest first-order process known, with its dating and medical applications, is [[general-chemistry-2/nuclear-chemistry]]. The rate laws, isolation and steady-state methods, and the machinery of mechanisms are developed in [[kinetics/rate-laws]] and [[kinetics/reaction-mechanisms]]; collision theory and transition-state theory in [[kinetics/collision-theory]] and [[kinetics/transition-state-theory]]; chains in [[kinetics/chain-reactions]]; and the catalysis introduced in one example here is a whole subject in [[kinetics/homogeneous-catalysis]].

::: summary
- The rate of reaction is defined with $1/\nu$ stoichiometric factors so it is one number for the reaction, not one per species; it is measured as the slope of a concentration–time curve, often the initial rate.
- A rate law $v = k[\mathrm{A}]^m[\mathrm{B}]^n$ is an experimental fact; orders are not coefficients, and the units of $k$ depend on the overall order.
- The integrated rate laws give straight lines: $[\mathrm{A}]$ vs $t$ (zero), $\ln[\mathrm{A}]$ vs $t$ (first), $1/[\mathrm{A}]$ vs $t$ (second); first order decays exponentially.
- $t_{1/2} = (\ln 2)/k$ only for first order — constant half-life is the fingerprint of first-order kinetics; zero- and second-order half-lives depend on $[\mathrm{A}]_0$.
- The Arrhenius equation $k = Ae^{-E_\mathrm{a}/RT}$ is empirical but broadly valid; $E_\mathrm{a}$ is the slope of the $\ln k$ vs $1/T$ plot, and the exponential makes rates extremely temperature-sensitive.
- Collision theory explains the exponential as a Boltzmann fraction above a threshold, with $A = PZ$ carrying collision frequency and orientation.
- A catalyst provides a lower-barrier path, speeds forward and reverse equally, and cannot shift equilibrium or enable a forbidden reaction.
:::

## Exercises

::: exercise Average rate {level=1 check="0.003"}
During the first $40.0\ \mathrm{s}$ of a reaction the concentration of A falls from $0.400$ to $0.280\ \mathrm{mol\,dm^{-3}}$. What is the average rate of consumption of A over this interval? (Enter the rate in $\mathrm{mol\,dm^{-3}\,s^{-1}}$.)
::: solution
$\bar{v} = \Delta[\mathrm{A}]/\Delta t = (0.400 - 0.280)/40.0 = 3.0\times10^{-3}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. The rate of *consumption* is quoted positive; the derivative $\mathrm{d}[\mathrm{A}]/\mathrm{d}t$ itself is $-3.0\times10^{-3}$.
:::
:::

::: exercise Stoichiometric rates {level=1 check="0.00024"}
For $2\,\mathrm{N_2O_5(g)} \rightarrow 4\,\mathrm{NO_2(g)} + \mathrm{O_2(g)}$, $\mathrm{N_2O_5}$ is being consumed at $4.8\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ at some instant. What is $\mathrm{d}[\mathrm{O_2}]/\mathrm{d}t$ at that instant? (Enter it in $\mathrm{mol\,dm^{-3}\,s^{-1}}$.)
::: solution
$\mathrm{d}[\mathrm{O_2}]/\mathrm{d}t = \tfrac{1}{2} \times 4.8\times10^{-4} = 2.4\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$: one oxygen appears for every two pentoxide molecules lost.
:::
:::

::: exercise Half-life from the rate constant {level=1 check="408"}
A first-order reaction has $k = 1.7\times10^{-3}\ \mathrm{s^{-1}}$. What is its half-life? (Enter it in seconds.)
::: solution
$t_{1/2} = \ln 2/k = 0.6931/1.7\times10^{-3} = 408\ \mathrm{s}$, about $6.8\ \mathrm{min}$. Note that the answer does not depend on the starting concentration — that is the first-order signature.
:::
:::

::: exercise Rate from a rate law {level=2 check="0.00189"}
A reaction obeys $v = k[\mathrm{A}]^2[\mathrm{B}]$ with $k = 0.42\ \mathrm{dm^{6}\,mol^{-2}\,s^{-1}}$. What is the rate when $[\mathrm{A}] = 0.15$ and $[\mathrm{B}] = 0.20\ \mathrm{mol\,dm^{-3}}$? (Enter the rate in $\mathrm{mol\,dm^{-3}\,s^{-1}}$.) What are the units of $k$ telling you about the overall order?
::: solution
$v = 0.42 \times (0.15)^2 \times 0.20 = 0.42 \times 0.0225 \times 0.20 = 1.9\times10^{-3}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. The units $\mathrm{dm^{6}\,mol^{-2}\,s^{-1}}$ are those required for overall order $3$ ($\mathrm{mol^{1-o}dm^{3(o-1)}s^{-1}}$ with $o = 3$), confirming third order — the orders $2 + 1$ add even though they belong to different species.
:::
:::

::: exercise Time to 90 % {level=2 check="1350"}
For the first-order decomposition of $\mathrm{N_2O_5}$ in $\mathrm{CCl_4}$ at $\mathrm{25\,^\circ C}$ ($k = 1.7\times10^{-3}\ \mathrm{s^{-1}}$), how long does it take for 90 % of the reactant to decompose? (Enter the time in seconds, to three significant figures.)
::: solution
90 % decomposed leaves 10 %: $t = \ln(1/0.10)/k = \ln 10 / 1.7\times10^{-3} = 2.303/1.7\times10^{-3} = 1.35\times10^{3}\ \mathrm{s} \approx 23\ \mathrm{min}$. That is $3.32$ half-lives ($\log_2 10$), a useful check: ten half-lives would leave $0.1\ \%$.
:::
:::

::: exercise Activation energy from a temperature coefficient {level=2 check="106"}
A reaction's rate constant is four times larger at $\mathrm{35\,^\circ C}$ than at $\mathrm{25\,^\circ C}$. Estimate the activation energy. (Enter $E_\mathrm{a}$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E_\mathrm{a} = R\ln 4\,\big/\!\left(\tfrac{1}{298.15} - \tfrac{1}{308.15}\right) = 8.314 \times 1.386 / 1.088\times10^{-4} = 1.06\times10^{5}\ \mathrm{J\,mol^{-1}} = 106\ \mathrm{kJ\,mol^{-1}}$. Doubling per $10\ \mathrm{K}$ would have been $53\ \mathrm{kJ\,mol^{-1}}$; quadrupling is exactly twice the logarithm, hence twice the activation energy — the two-temperature equation is linear in $\ln(k_2/k_1)$.
:::
:::

::: exercise The second-order integrated law {level=3}
Integrate the second-order rate equation $-\mathrm{d}[\mathrm{A}]/\mathrm{d}t = k[\mathrm{A}]^2$ from $[\mathrm{A}]_0$ to $[\mathrm{A}]$ and derive the half-life $t_{1/2} = 1/(k[\mathrm{A}]_0)$. Use your result to decide: a second-order reaction is 50 % complete in $37\ \mathrm{s}$ from $[\mathrm{A}]_0 = 0.050\ \mathrm{mol\,dm^{-3}}$; how long for the next 50 % (to 75 % total)?
::: solution
Separate variables: $-\mathrm{d}[\mathrm{A}]/[\mathrm{A}]^2 = k\,\mathrm{d}t$, and since $\int \mathrm{d}[\mathrm{A}]/[\mathrm{A}]^2 = -1/[\mathrm{A}]$,
$$
\frac{1}{[\mathrm{A}]} - \frac{1}{[\mathrm{A}]_0} = kt.
$$
Setting $[\mathrm{A}] = [\mathrm{A}]_0/2$ gives $t_{1/2} = (2/[\mathrm{A}]_0 - 1/[\mathrm{A}]_0)/k = 1/(k[\mathrm{A}]_0)$. Now $k = 1/(t_{1/2}[\mathrm{A}]_0) = 1/(37 \times 0.050) = 0.54\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, and the *second* half-life starts from $[\mathrm{A}]_0/2$, so it is twice as long: $74\ \mathrm{s}$. Total to 75 %: $37 + 74 = 111\ \mathrm{s}$. A second-order reaction's half-lives double one after another — the opposite of first order — because the rate depends on $[\mathrm{A}]^2$ and halving the concentration quarters the rate.
:::
:::

::: exercise Two temperatures, one elimination {level=3 check="315"}
A reaction with $E_\mathrm{a} = 50\ \mathrm{kJ\,mol^{-1}}$ runs at $298\ \mathrm{K}$. At what temperature will it be three times as fast? (Enter the temperature in kelvin, to three significant figures.)
::: solution
Solve $\ln 3 = (E_\mathrm{a}/R)(1/T_1 - 1/T_2)$ for $T_2$:
$$
\frac{1}{T_2} = \frac{1}{298.15} - \frac{8.314 \times 1.0986}{50\,000} = 3.3540\times10^{-3} - 1.827\times10^{-4} = 3.171\times10^{-3},
$$
so $T_2 = 315\ \mathrm{K}$ ($\mathrm{42\,^\circ C}$). The elimination of $A$ between two Arrhenius equations — subtract one $\ln k$ from the other — is *the* standard move: it works for any pair $(T, k)$ and never requires knowing $A$.
:::
:::

::: exercise A mechanism that explains a third-order law {level=3}
The reaction $2\,\mathrm{NO} + \mathrm{O_2} \rightarrow 2\,\mathrm{NO_2}$ is observed to be third order, $v = k_\text{obs}[\mathrm{NO}]^2[\mathrm{O_2}]$, and $k_\text{obs}$ *decreases* slightly with temperature. Propose the two-step mechanism with a rapid pre-equilibrium dimerisation of NO, derive the rate law by the pre-equilibrium approximation, and express $k_\text{obs}$ and the apparent activation energy in terms of the steps. Why does $k_\text{obs}$ fall with temperature?
::: solution
Mechanism: step 1, $\mathrm{2\,NO \rightleftharpoons N_2O_2}$ fast with equilibrium constant $K$; step 2, $\mathrm{N_2O_2 + O_2 \rightarrow 2\,NO_2}$ slow with rate constant $k_2$. Pre-equilibrium: $[\mathrm{N_2O_2}] = K[\mathrm{NO}]^2$, so the rate of product formation is
$$
v = k_2[\mathrm{N_2O_2}][\mathrm{O_2}] = k_2 K\,[\mathrm{NO}]^2[\mathrm{O_2}],
\qquad k_\text{obs} = k_2 K.
$$
The third order appears because two NO molecules are stored in the pre-equilibrium complex before the single slow event. Now $k_2 \propto e^{-E_{\mathrm{a},2}/RT}$ rises with temperature, but $K \propto e^{-\Delta H/RT}$ for the exothermic dimerisation ($\Delta H < 0$) *falls* with temperature, so
$$
E_{\mathrm{a,app}} = E_{\mathrm{a},2} + \Delta H,
$$
and if the dimerisation is exothermic enough, the apparent activation energy — and hence $k_\text{obs}$ — decreases as the reaction is heated. Apparent activation energies can even be negative, which is one reason the Arrhenius equation is flagged as empirical: it describes how $k$ behaves, and the interpretation of $E_\mathrm{a}$ belongs to the mechanism.
:::
:::
