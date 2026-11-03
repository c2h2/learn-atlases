A transcription factor represses its own gene. Does that make its concentration steadier, or make it oscillate? Both answers can be defended in words. Repression pushes the level down whenever it rises and lets it recover whenever it falls, which sounds stabilising; but the repressor takes time to be made, so by the time it acts the level may already have changed direction, which sounds like a recipe for overshoot. Which effect wins depends on how strong the repression is, how sharp it is and how long the delay lasts — on numbers, not on the wiring diagram. Verbal reasoning about feedback, cooperativity and competition between processes is unreliable precisely where biology is most interesting. A **mathematical model** turns the wiring diagram and the rates into equations whose consequences can be worked out without self-deception, and then compared with experiment.

This chapter lays the foundations used in the rest of the course. We discuss what models are for and what kinds exist, how to translate molecular processes into **kinetic equations** using the **law of mass action**, how to count molecules in a cell, what a **steady state** is and how it differs from equilibrium, how to tell whether a steady state is stable, and how differences in **time scale** let us simplify a model — the idea behind the Michaelis–Menten equation. The molecular processes themselves (transcription, translation, regulation by transcription factors) were described in [[molecular-biology/eukaryotic-gene-regulation]] and [[molecular-biology/bacterial-gene-regulation]]; here we turn them into mathematics. The calculus of first-order differential equations is in [first-order equations](/learn/maths/lesson.php?c=ode&l=first-order) in Maths Atlas, which this chapter uses but does not re-teach.

## Why model?

A model is a simplified representation of a system that is precise enough to make predictions. In systems biology the representation is usually a set of equations for how the amounts of molecular species change in time, but the same logic applies to any model.

Models earn their keep in several ways:

- **They test whether a proposed mechanism is sufficient.** If a set of interactions is claimed to produce oscillations, a model can show whether it does, and for which parameter values. Many verbally plausible mechanisms fail this test.
- **They reveal which parameters matter.** Often a behaviour depends on a ratio or combination of parameters, and many individual parameters are irrelevant. This tells an experimenter what to measure.
- **They make quantitative and sometimes surprising predictions** — a response time, a threshold, a dose at which behaviour changes qualitatively — that can be tested.
- **They organise data.** A model with fitted parameters summarises many measurements in a few interpretable numbers, and its failures point to what is missing.
- **They suggest designs.** Synthetic biologists use models to choose promoters and degradation tags before building a circuit.

::: definition Mathematical model {#def-model}
A **mathematical model** of a biological system consists of (i) a choice of **state variables** (the quantities whose values describe the system at a moment, such as concentrations of molecular species), (ii) **parameters** (quantities held fixed during an experiment, such as rate constants and total enzyme concentration), (iii) **rules** relating the rate of change of the state variables to the state and the parameters, and (iv) a list of the **assumptions** under which those rules are believed to hold.
:::

Item (iv) is the one most often omitted, and the one that matters most. A model's predictions are only as good as its assumptions, and the assumptions are usually where the biology is hidden: that the cell is well mixed, that molecule numbers are large, that the temperature and growth rate are constant, that some reactions are fast compared with others.

### Kinds of models

Different questions need different kinds of models.

| kind | state | time | typical use |
|---|---|---|---|
| deterministic kinetic (ODE) | concentrations, continuous | continuous | gene circuits, signalling, enzyme kinetics |
| stochastic kinetic | molecule numbers, integers | continuous, random events | noise in gene expression ([[systems-biology/noise]]) |
| spatial (PDE, reaction–diffusion) | concentration fields | continuous | gradients and patterns ([[systems-biology/pattern-formation]]) |
| constraint-based | steady-state fluxes | none (steady state) | genome-scale metabolism ([[systems-biology/metabolic-networks]]) |
| logical (Boolean) | genes on or off | discrete steps | large regulatory networks with few known rates |
| statistical | parameters of a distribution | — | relating measurements to hidden quantities ([[systems-biology/fitting-models]]) |

Most of this course uses deterministic kinetic models, which describe concentrations by **ordinary differential equations** (ODEs). They are the natural starting point because they connect directly to biochemistry, they can be analysed with the tools of dynamical systems, and many of their predictions survive in more detailed models.

::: warning "A more detailed model is a more realistic model"
Adding every known interaction to a model does not make it better. Each new species adds rate constants that are usually unknown, and a model with fifty poorly constrained parameters can fit almost anything and explain almost nothing. A good model is as simple as the question allows: it contains the interactions needed to produce the behaviour under study and omits the rest. George Box's remark that "all models are wrong, but some are useful" is a reminder that the goal is understanding, not a complete inventory. The opposite error also exists — a model too simple to contain the mechanism you care about — and the art lies in choosing the level of detail.
:::

## Counting molecules in a cell

Before writing equations it helps to know the scales involved. Concentrations in cells are tiny in absolute terms, and the number of molecules of a species can be very small — which will matter in [[systems-biology/noise]].

::: example One molecule per cell {#ex-one-molecule}
A rule-of-thumb volume for an *Escherichia coli* cell is $1\ \mu\text{m}^3 = 10^{-15}$ L, that is, 1 fL (actual volumes vary several-fold with growth rate). What concentration corresponds to a single molecule in this volume? How many molecules of a protein are present at 100 nM?
::: solution
One molecule is $1/N_A$ mol, with Avogadro's number $N_A = 6.022\times10^{23}$ mol⁻¹. Its concentration in 1 fL is

$$
c = \frac{1}{6.022\times10^{23}\ \text{mol}^{-1}\times10^{-15}\ \text{L}} = 1.66\times10^{-9}\ \text{mol L}^{-1} \approx 1.7\ \text{nM}.
$$

So in *E. coli*, **1 nM is roughly one molecule per cell** (more precisely 0.6 molecules per nM). A protein at 100 nM is present at $100\times10^{-9}\times6.022\times10^{23}\times10^{-15} \approx 60$ copies. A transcription factor present at "10 nM" therefore means about six molecules, and a gene usually exists in one or a few copies — concentrations of a few nM.
:::
:::

Typical numbers for *E. coli*, rounded to an order of magnitude, are a few million proteins per cell, a few thousand mRNA molecules, and between a handful and many thousands of copies of each individual protein; transcription factors are often at tens to hundreds of copies. Eukaryotic cells are larger — a budding yeast cell has a volume of roughly 40–60 fL and a typical mammalian cell some 1,000–4,000 fL — so the same number of molecules gives a much lower concentration. The BioNumbers database (Milo and colleagues, Harvard) collects such values with their sources and is the place to look up a number before using it.

## Kinetic equations and mass action

Consider molecules in a well-mixed volume undergoing a reaction. For two molecules to react they must collide, and the rate of collisions between molecules of A and B is proportional to the number of A molecules and to the number of B molecules per unit volume. This gives the fundamental rule of chemical kinetics.

::: definition Law of mass action {#def-mass-action}
For an **elementary reaction** — one that occurs in a single molecular event — the rate (in concentration per unit time) is proportional to the product of the concentrations of the reactants, each raised to the power of its stoichiometric coefficient:

$$
\text{A} + \text{B} \xrightarrow{\;k\;} \text{C}: \qquad v = k\,[\text{A}][\text{B}],
$$ {#eq-mass-action}

where the **rate constant** $k$ depends on temperature and on the molecules but not on their concentrations. For a first-order reaction $\text{A} \to \text{products}$, $v = k[\text{A}]$ and $k$ has units s⁻¹; for a second-order reaction $\text{A}+\text{B}\to\text{C}$, $k$ has units M⁻¹ s⁻¹. **Assumptions:** the system is well mixed, the molecules are numerous enough for concentrations to be continuous, and the reaction is elementary.
:::

The rate of change of each species is the sum of the rates of the reactions that produce it minus the rates of those that consume it, each weighted by its stoichiometric coefficient. For a network of reactions this bookkeeping can be written compactly with a **stoichiometric matrix**, which we meet in [[systems-biology/metabolic-networks]]; for small networks we write the equations by hand.

Mass action applies to elementary steps. Many rate laws used in biology — Michaelis–Menten kinetics, Hill functions — are not elementary but summarise several elementary steps under simplifying assumptions. We derive one such summary later in this chapter, and the Hill function in [[systems-biology/gene-expression-dynamics]].

### Reversible binding

The most common reaction in regulatory biology is reversible binding: a transcription factor binding a DNA site, a ligand binding a receptor, a kinase binding its substrate.

::: proposition Reversible binding {#prop-binding}
For $\text{A} + \text{B} \underset{k_\mathrm{off}}{\overset{k_\mathrm{on}}{\rightleftharpoons}} \text{C}$, mass action gives

$$
\frac{d[\text{C}]}{dt} = k_\mathrm{on}[\text{A}][\text{B}] - k_\mathrm{off}[\text{C}], \qquad \frac{d[\text{A}]}{dt} = \frac{d[\text{B}]}{dt} = -\frac{d[\text{C}]}{dt}.
$$ {#eq-binding}

At equilibrium

$$
\frac{[\text{A}][\text{B}]}{[\text{C}]} = \frac{k_\mathrm{off}}{k_\mathrm{on}} = K_\mathrm{d},
$$ {#eq-kd}

the **dissociation constant**, with units of concentration. If B is a binding site (a receptor, a promoter) whose total amount is $B_T = [\text{B}] + [\text{C}]$, the **fraction of sites occupied** is

$$
\theta = \frac{[\text{C}]}{B_T} = \frac{[\text{A}]}{K_\mathrm{d} + [\text{A}]}.
$$ {#eq-occupancy}

So $K_\mathrm{d}$ is the free concentration of A at which half the sites are occupied.
:::

::: proof
At equilibrium $d[\text{C}]/dt = 0$, so $k_\mathrm{on}[\text{A}][\text{B}] = k_\mathrm{off}[\text{C}]$, which rearranges to [[#eq-kd]]. Substituting $[\text{B}] = B_T - [\text{C}]$ gives $[\text{A}](B_T - [\text{C}]) = K_\mathrm{d}[\text{C}]$, so $[\text{C}](K_\mathrm{d} + [\text{A}]) = [\text{A}]B_T$, which is [[#eq-occupancy]]. If $[\text{A}] = K_\mathrm{d}$, then $\theta = 1/2$.
:::

Note that [[#eq-occupancy]] is written in terms of the *free* concentration of A. If A is in large excess over B, free and total A are nearly equal and the formula can be used with total A. If not, binding depletes A and we must use the conservation laws, as the code below does.

::: widget plot
f: x/(K + x); x^n/(K^n + x^n)
x: 0, 100
y: 0, 1.05
sliders: K=10:1:50:1; n=2:1:4:0.5
labels: \theta = \frac{A}{K_\mathrm{d}+A}; \text{cooperative, Hill } n
hlines: 0.5
caption: Fraction of binding sites occupied against free ligand concentration $A$ (in nM). The blue curve is simple binding ([[#eq-occupancy]]) with dissociation constant $K_\mathrm{d}$ set by the slider $K$: it crosses one half at $A = K_\mathrm{d}$ and approaches saturation slowly — a 9-fold increase in $A$ is needed to go from 10 % to 90 % occupancy. The second curve is a cooperative (Hill) response with the same half-point, which we derive in the next chapter; increase $n$ and see how it sharpens into a switch.
:::

::: example Occupancy and depletion {#ex-depletion}
A protein A and its binding partner B are each present at a total concentration of 20 nM, with $K_\mathrm{d} = 10$ nM. What is the equilibrium concentration of the complex C? Compare with the naive answer from [[#eq-occupancy]] using total A.
::: solution
Write $c = [\text{C}]$. Conservation gives $[\text{A}] = 20 - c$ and $[\text{B}] = 20 - c$ (in nM), so [[#eq-kd]] becomes

$$
\frac{(20-c)^2}{c} = 10 \quad\Longrightarrow\quad c^2 - 50c + 400 = 0 \quad\Longrightarrow\quad c = \frac{50 - \sqrt{2500 - 1600}}{2} = 10\ \text{nM}.
$$

(The other root, $c = 40$ nM, exceeds the total amounts and is not physical.) So half of B is bound, and the free A is 10 nM. The naive formula with total A, $\theta = 20/(10 + 20) = 0.67$, overestimates occupancy because binding has used up half of A. Depletion matters whenever the binding partner is not in large excess — common for transcription factors, which are often present at concentrations comparable to their sites.
:::
:::

### Time scales of binding

How fast does binding reach equilibrium? If A is in large excess so that $[\text{A}]$ stays constant, [[#eq-binding]] becomes linear in $[\text{C}]$:

$$
\frac{d[\text{C}]}{dt} = k_\mathrm{on}[\text{A}](B_T - [\text{C}]) - k_\mathrm{off}[\text{C}] = k_\mathrm{on}[\text{A}]B_T - \bigl(k_\mathrm{on}[\text{A}] + k_\mathrm{off}\bigr)[\text{C}],
$$

whose solution approaches equilibrium exponentially with **relaxation rate** $k_\mathrm{on}[\text{A}] + k_\mathrm{off}$. Equilibrium is approached faster at high ligand concentration, but never slower than $k_\mathrm{off}$.

How large are these rate constants? An association rate constant cannot exceed the rate at which diffusing molecules meet. For proteins in water this **diffusion limit** is about $10^8$–$10^9$ M⁻¹ s⁻¹; measured association rate constants for protein–protein binding are usually $10^5$–$10^7$ M⁻¹ s⁻¹, because the molecules must meet in the right orientation. The dissociation constant then sets $k_\mathrm{off} = K_\mathrm{d}k_\mathrm{on}$: a tight complex dissociates slowly.

::: example Relaxation time of a binding reaction {#ex-relaxation}
A receptor binds its ligand with $k_\mathrm{on} = 10^6$ M⁻¹ s⁻¹ and $k_\mathrm{off} = 0.01$ s⁻¹ (illustrative values). Find $K_\mathrm{d}$, the equilibrium occupancy at 30 nM free ligand, and the time constant of the approach to equilibrium.
::: solution
$K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on} = 0.01/10^6 = 10^{-8}$ M $= 10$ nM. At $[\text{A}] = 30$ nM, $\theta = 30/(10 + 30) = 0.75$. The relaxation rate is $k_\mathrm{on}[\text{A}] + k_\mathrm{off} = 10^6\times3\times10^{-8} + 0.01 = 0.03 + 0.01 = 0.04$ s⁻¹, a time constant of $1/0.04 = 25$ s (a half-time of $\ln 2/0.04 = 17$ s). After the ligand concentration changes, it takes about a minute — two or three time constants — for occupancy to settle. A cell that responds faster than this cannot be reading the equilibrium occupancy.
:::
:::

The following short program integrates [[#eq-binding]] for the depletion example with Euler's method (see [numerical ODEs](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes) for why a small step is needed) and compares the result with the exact equilibrium.

```python
import math

# Reversible binding A + B <-> C, concentrations in nM, time in s
k_on  = 1e-3     # nM^-1 s^-1  (= 1e6 M^-1 s^-1)
k_off = 1e-2     # s^-1, so Kd = k_off/k_on = 10 nM
A, B, C = 20.0, 20.0, 0.0   # initial concentrations (nM)
dt, t = 0.01, 0.0           # step and clock (s)
while t < 300:
    v = k_on * A * B - k_off * C      # net binding rate (nM/s)
    A, B, C = A - v*dt, B - v*dt, C + v*dt
    t += dt
    if abs(t - 30) < dt/2 or abs(t - 300) < dt/2:
        print(f"t = {t:5.0f} s   C = {C:.3f} nM")

# exact steady state from the conservation laws: C^2 - (A0+B0+Kd) C + A0 B0 = 0
Kd, A0, B0 = k_off / k_on, 20.0, 20.0
s = A0 + B0 + Kd
C_eq = (s - math.sqrt(s*s - 4*A0*B0)) / 2
print(f"exact equilibrium C = {C_eq:.3f} nM")
# t =    30 s   C = 6.606 nM
# t =   300 s   C = 9.999 nM
# exact equilibrium C = 10.000 nM
```

Two features of the code are general. The update conserves $[\text{A}] + [\text{C}]$ and $[\text{B}] + [\text{C}]$ exactly, because each reaction event removes one A and one B and adds one C; and the system settles to the equilibrium computed algebraically. Conservation laws reduce the number of independent variables: here three concentrations obey two conservation laws, so there is really only one variable.

## Steady states and equilibrium

::: definition Steady state and equilibrium {#def-steady-state}
A **steady state** (or fixed point) of a kinetic model $d\mathbf{x}/dt = \mathbf{f}(\mathbf{x})$ is a state $\mathbf{x}^*$ with $\mathbf{f}(\mathbf{x}^*) = \mathbf{0}$: every concentration is constant in time. A **thermodynamic equilibrium** is a special steady state in which every individual reaction is balanced by its reverse (**detailed balance**), so that there is no net flux through any reaction. A steady state with net fluxes — material flowing in, being transformed and flowing out — is a **non-equilibrium steady state**.
:::

The distinction matters because living cells are never at equilibrium. A protein whose concentration is constant is being synthesised and degraded at equal rates; a metabolite at constant concentration is being made and consumed. These steady states are maintained by a continuous supply of free energy (ATP, GTP, nutrient gradients), and they can do things equilibria cannot, such as respond with switch-like sensitivity ([[systems-biology/signalling-robustness]]) or proofread.

::: warning "At steady state nothing is happening"
Steady state means the *concentrations* are constant, not that the reactions have stopped. A protein with a half-life of 20 minutes at a constant level of 1,000 copies per cell is being made and destroyed at about 35 molecules per minute. Equally, "constant" only holds on the time scale of the model: a protein can be at steady state with respect to minutes while the cell grows and divides over an hour.
:::

### Production and removal: the simplest model

Almost every model in this course contains the following building block. A species X is produced at a constant rate $\beta$ (concentration per unit time) and removed by a first-order process with rate constant $\alpha$:

$$
\frac{dx}{dt} = \beta - \alpha x .
$$ {#eq-prod-deg}

::: proposition Production and first-order removal {#prop-prod-deg}
The solution of [[#eq-prod-deg]] with $x(0) = x_0$ is

$$
x(t) = x^* + (x_0 - x^*)e^{-\alpha t}, \qquad x^* = \frac{\beta}{\alpha}.
$$ {#eq-prod-deg-sol}

The steady state $x^* = \beta/\alpha$ is approached exponentially from any starting value with time constant $1/\alpha$; the time to cover half the distance to the steady state is $t_{1/2} = \ln 2/\alpha$, *whatever the production rate*. **Assumptions:** constant production rate, removal proportional to the amount present (degradation or dilution by growth with no saturation).
:::

::: proof
Let $y = x - \beta/\alpha$. Then $dy/dt = dx/dt = \beta - \alpha(y + \beta/\alpha) = -\alpha y$, so $y(t) = y(0)e^{-\alpha t}$, which is [[#eq-prod-deg-sol]]. Setting $x - x^* = \tfrac12(x_0 - x^*)$ gives $e^{-\alpha t} = 1/2$, so $t = \ln 2/\alpha$.
:::

This result already contains a principle with real consequences, developed in the next chapter: **the speed of response is set by the removal rate, while the level is set by the ratio of production to removal.** To change a protein level quickly a cell must degrade it quickly — which is costly, since every molecule degraded had to be made.

::: widget slopefield
f: b - a*y
x: 0, 10
y: 0, 12
sliders: b=5:1:10:0.5; a=1:0.2:2:0.1
points: 0, 0; 0, 2; 0, 11
caption: The production–removal equation $dx/dt = \beta - \alpha x$ (sliders $b = \beta$, $a = \alpha$), with time on the horizontal axis and the concentration $x$ on the vertical. All solution curves converge on the steady state $x^* = \beta/\alpha$. Raising $\beta$ moves the steady state up without changing how fast curves approach it; raising $\alpha$ both lowers the steady state and speeds up the approach. Click to add solutions from other starting values.
:::

### Stability

A steady state is useful as a description of a cell only if the cell returns to it after small disturbances — molecular noise, a brief change in temperature.

::: definition Stability of a steady state {#def-stability}
A steady state $\mathbf{x}^*$ is **stable** (asymptotically stable) if every solution starting close enough to it remains close and converges to it, and **unstable** if some solutions starting arbitrarily close move away.
:::

For one variable, $dx/dt = f(x)$, the test is simple. Near $x^*$, write $x = x^* + \varepsilon$ with $\varepsilon$ small. Then $d\varepsilon/dt = f(x^* + \varepsilon) \approx f(x^*) + f'(x^*)\varepsilon = f'(x^*)\varepsilon$, so small deviations grow or decay exponentially at rate $f'(x^*)$.

::: proposition Linear stability in one dimension {#prop-stability-1d}
A steady state $x^*$ of $dx/dt = f(x)$ is stable if $f'(x^*) < 0$ and unstable if $f'(x^*) > 0$. Deviations decay (or grow) with time constant $1/\abs{f'(x^*)}$. If $f'(x^*) = 0$ the linear test is inconclusive. **Assumption:** $f$ is differentiable near $x^*$.
:::

Graphically: plot $f(x)$ against $x$. Steady states are where the curve crosses the axis; a crossing from positive to negative (downwards) is stable, because to its left $x$ increases and to its right $x$ decreases. For the production–removal model, $f(x) = \beta - \alpha x$ has $f' = -\alpha < 0$: its unique steady state is stable. For systems of two or more variables, the derivative becomes the **Jacobian matrix** and stability is decided by its eigenvalues — the subject of [nonlinear systems](/learn/maths/lesson.php?c=ode&l=nonlinear-systems) in Maths Atlas, used heavily in [[systems-biology/switches-oscillators]].

::: quiz
For $dx/dt = f(x)$, the curve $f(x)$ crosses zero at $x = 2$ going upwards (negative to the left, positive to the right). What can you say about the steady state $x^* = 2$?
- [ ] It is stable, because $f(2) = 0$
- [x] It is unstable: a small increase in $x$ makes $dx/dt > 0$, so $x$ keeps increasing
- [ ] It is stable, because the curve is steep there
- [ ] Nothing, without solving the equation
::: solution
An upward crossing means $f'(2) > 0$. Just to the right of 2, $f > 0$ and $x$ increases away from 2; just to the left, $f < 0$ and $x$ decreases away from 2. The steady state is unstable. Steepness only sets how fast deviations grow. Every steady state has $f = 0$ by definition; stability depends on the sign of the slope.
:::
:::

## Time-scale separation

Biological processes span an enormous range of time scales: binding and unbinding in milliseconds to seconds, phosphorylation in seconds to minutes, changes in protein concentration over tens of minutes to hours, cell division over hours. This range is a gift to modellers. When one process is much faster than another, the fast variables reach their steady state almost immediately relative to the slow ones, and we can replace their differential equations by algebraic equations.

::: intuition Fast variables follow slow ones
Imagine a dog on a short lead walking with its owner. The dog runs back and forth quickly, but on the time scale of the walk its position is just "next to the owner". If we only care about where they are after ten minutes, we can replace the dog's complicated motion by its average position relative to the owner. In a kinetic model the fast variable is the dog: after a brief transient it sits at the steady state determined by the current values of the slow variables, and follows them as they change. This is the **quasi-steady-state approximation**.
:::

### The Michaelis–Menten equation as a quasi-steady state

The best-known example is enzyme kinetics, treated biochemically in [[biochemistry/enzymes]]. Here we look at it as an instance of time-scale separation. The mechanism is

$$
\text{E} + \text{S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \text{ES} \xrightarrow{\;k_2\;} \text{E} + \text{P}.
$$

With total enzyme $E_T = [\text{E}] + [\text{ES}]$ conserved, mass action gives

$$
\frac{d[\text{ES}]}{dt} = k_1(E_T - [\text{ES}])[\text{S}] - (k_{-1} + k_2)[\text{ES}], \qquad \frac{d[\text{S}]}{dt} = -k_1(E_T - [\text{ES}])[\text{S}] + k_{-1}[\text{ES}].
$$ {#eq-mm-full}

::: proposition Quasi-steady-state (Briggs–Haldane) approximation {#prop-qssa}
If the enzyme–substrate complex equilibrates quickly compared with the depletion of substrate, so that $d[\text{ES}]/dt \approx 0$ on the slow time scale, the rate of product formation is

$$
v = k_2[\text{ES}] = \frac{V_\mathrm{max}[\text{S}]}{K_\mathrm{m} + [\text{S}]}, \qquad V_\mathrm{max} = k_2E_T, \qquad K_\mathrm{m} = \frac{k_{-1} + k_2}{k_1}.
$$ {#eq-mm}

A sufficient condition for the approximation (Segel and Slemrod, 1989) is

$$
\frac{E_T}{K_\mathrm{m} + S_0} \ll 1,
$$ {#eq-qssa-condition}

where $S_0$ is the initial substrate concentration — in practice, enzyme scarce compared with substrate or with $K_\mathrm{m}$.
:::

::: proof
Setting $d[\text{ES}]/dt = 0$ in [[#eq-mm-full]] gives $k_1(E_T - [\text{ES}])[\text{S}] = (k_{-1} + k_2)[\text{ES}]$. Dividing by $k_1$ and collecting terms, $[\text{ES}](K_\mathrm{m} + [\text{S}]) = E_T[\text{S}]$, so $[\text{ES}] = E_T[\text{S}]/(K_\mathrm{m} + [\text{S}])$ and $v = k_2[\text{ES}]$ is [[#eq-mm]]. The validity condition comes from comparing time scales: the complex settles in a time of order $1/(k_1(K_\mathrm{m} + S_0))$, while substrate is consumed over a time of order $(K_\mathrm{m} + S_0)/(k_2E_T)$; requiring the first to be much shorter, and the substrate to change little during the initial transient, leads (after a careful analysis we omit) to [[#eq-qssa-condition]].
:::

The result is that two differential equations have been replaced by one, $d[\text{S}]/dt = -V_\mathrm{max}[\text{S}]/(K_\mathrm{m} + [\text{S}])$, and three rate constants by two combinations. This is typical: time-scale separation reduces the number of variables *and* reveals which combinations of parameters are measurable. It is also a warning: from steady-state rate measurements alone, $k_1$, $k_{-1}$ and $k_2$ cannot be separately determined — a first glimpse of the identifiability problem of [[systems-biology/fitting-models]].

::: example When does the quasi-steady state hold? {#ex-qssa}
(a) An enzyme at $E_T = 10$ nM acts on a substrate at $S_0 = 1\ \mu$M with $K_\mathrm{m} = 5\ \mu$M. (b) A kinase at 1 μM phosphorylates a substrate protein present at 0.5 μM, with $K_\mathrm{m} = 0.2\ \mu$M. In which case is Michaelis–Menten kinetics a safe approximation?
::: solution
(a) $E_T/(K_\mathrm{m} + S_0) = 0.01/(5 + 1) = 0.0017$, far below 1: the approximation is excellent. This is the test-tube situation for which it was designed.

(b) $E_T/(K_\mathrm{m} + S_0) = 1/(0.2 + 0.5) = 1.4$, not small. The enzyme is not scarce: a large fraction of the substrate is bound in complexes at any moment, and the Michaelis–Menten formula with total substrate concentration can be badly wrong. In signalling networks kinases and their protein substrates are often at comparable concentrations, so models of signalling should either keep the complexes explicitly or use the "total" quasi-steady-state approximation, which is accurate in a wider range of conditions.
:::
:::

### Nondimensionalisation

A model with many parameters often depends on only a few combinations of them. **Nondimensionalisation** finds those combinations: we measure each variable in a natural unit for the system, so that the equations contain only dimensionless groups. For the production–removal equation [[#eq-prod-deg]], measure $x$ in units of its steady state, $u = x/(\beta/\alpha)$, and time in units of the response time, $\tau = \alpha t$. Then

$$
\frac{du}{d\tau} = 1 - u,
$$

with no parameters at all: every production–removal process is the same process seen at a different scale. For more complicated models the dimensionless groups that remain are the ones that control the behaviour — the Hill coefficient and the ratio of production to threshold in a feedback loop, or the ratio of diffusion coefficients in a Turing pattern. Finding them is usually the first step of any analysis; Maths Atlas discusses the technique alongside [first-order equations](/learn/maths/lesson.php?c=ode&l=first-order).

## A modelling workflow

Putting the pieces together, a typical modelling study proceeds as follows.

::: algorithm Building a kinetic model {#alg-workflow}
1. **State the question** — which behaviour is to be explained or predicted, and what measurement would decide it.
2. **Draw the reaction scheme**: species, reactions, and which are regulated by which.
3. **List the assumptions**: well-mixed compartment, large numbers, which reactions are fast, what is held constant.
4. **Write the equations** by mass action for elementary steps, or with justified effective rate laws (Michaelis–Menten, Hill), and identify conservation laws.
5. **Nondimensionalise** and identify the controlling parameter groups.
6. **Analyse**: steady states, their stability, time scales, responses to inputs; simulate numerically where analysis fails.
7. **Compare with data**, estimate parameters, and test predictions that were not used in building the model.
8. **Revise** the assumptions where the model fails, and repeat.
:::

The cycle rarely ends. A model that fits existing data has passed only a weak test; one that predicts the outcome of a new experiment — a mutant, a drug, a changed environment — before it is done has passed a strong one.

::: example A covalent modification cycle {#ex-cycle}
A protein exists in unphosphorylated and phosphorylated forms, $P$ and $P^*$, with total $P_T = P + P^*$ constant. A kinase phosphorylates it with first-order rate constant $k_1$ (the kinase is far from saturated), and a phosphatase dephosphorylates it with rate constant $k_2$. Find the steady-state fraction phosphorylated and the time scale of the response if the kinase activity suddenly doubles. Use $k_1 = 0.1$ s⁻¹ and $k_2 = 0.3$ s⁻¹, then $k_1 = 0.2$ s⁻¹.
::: solution
The equation is $dP^*/dt = k_1(P_T - P^*) - k_2P^* = k_1P_T - (k_1 + k_2)P^*$, a production–removal equation with $\beta = k_1P_T$ and $\alpha = k_1 + k_2$. By [[#prop-prod-deg]],

$$
\frac{P^*}{P_T} = \frac{k_1}{k_1 + k_2}, \qquad \text{time constant } \frac{1}{k_1 + k_2}.
$$

Initially the fraction is $0.1/0.4 = 0.25$. After the kinase doubles, the new steady state is $0.2/0.5 = 0.40$, approached with time constant $1/0.5 = 2$ s. The response is graded: doubling the kinase increases the phosphorylated fraction by a factor of only 1.6. When the enzymes are saturated the same cycle can become a sharp switch — the **zero-order ultrasensitivity** of [[systems-biology/signalling-robustness]].
:::
:::

::: application Models in synthetic biology and drug discovery
Kinetic models are now routine in engineering. Synthetic biologists model a circuit before building it to choose promoter strengths, ribosome binding sites and degradation tags that place it in the parameter region where it will work; the first synthetic switches and oscillators ([[systems-biology/switches-oscillators]]) were designed this way. In pharmacology, models of how quickly a compound binds and leaves its target ([[#ex-relaxation]]) explain why two molecules with the same $K_\mathrm{d}$ can act very differently in a cell: one with a slow $k_\mathrm{off}$ remains bound long after the free compound has gone. Regulatory agencies accept model-based analyses as part of the evidence for medicines; the clinical side is the province of Medicine Atlas.
:::

::: history
The law of mass action was proposed by the Norwegian chemists Cato Guldberg and Peter Waage in 1864, initially for chemical equilibria. Its application to enzymes came with Leonor Michaelis and Maud Menten's 1913 study of invertase, which assumed that the enzyme–substrate complex is in rapid equilibrium with free enzyme and substrate; in 1925 George Briggs and J. B. S. Haldane replaced this with the more general quasi-steady-state assumption. The first spectacularly successful kinetic model in physiology was Alan Hodgkin and Andrew Huxley's 1952 model of the action potential in the squid giant axon, which predicted the shape and speed of the nerve impulse from measured ionic currents (see [[neuroscience/action-potential]]). Mathematical models of gene regulation followed the operon model of François Jacob and Jacques Monod (1961), notably in Brian Goodwin's 1963 book *Temporal Organization in Cells*. The modern field of systems biology took shape around 2000, when genome sequences, quantitative single-cell measurements and the ability to build synthetic circuits made it possible to test models directly; the idea of treating organisms as systems is much older, going back to Ludwig von Bertalanffy's general systems theory and to the volume *Systems Theory and Biology* edited by Mihajlo Mesarović (1968).
:::

::: summary
- A model consists of state variables, parameters, rules and — crucially — assumptions; it is useful when it tests whether a mechanism is sufficient, shows which parameters matter, or makes testable predictions.
- In *E. coli* (about 1 fL), 1 nM corresponds to roughly one molecule per cell; many regulators are present at tens of copies.
- For elementary reactions the rate is proportional to the product of reactant concentrations (mass action, [[#def-mass-action]]). Reversible binding gives occupancy $\theta = A/(K_\mathrm{d} + A)$ with $K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on}$, relaxing at rate $k_\mathrm{on}A + k_\mathrm{off}$.
- Cells are in non-equilibrium steady states: constant concentrations with continuous fluxes.
- For $dx/dt = \beta - \alpha x$, the steady state is $\beta/\alpha$ and the response time $\ln 2/\alpha$ depends only on the removal rate ([[#prop-prod-deg]]).
- A one-variable steady state is stable when $f'(x^*) < 0$; in higher dimensions the eigenvalues of the Jacobian decide.
- Time-scale separation replaces fast variables by their quasi-steady states; the Michaelis–Menten equation is the classic case, valid when $E_T \ll K_\mathrm{m} + S_0$.
- Nondimensionalisation reveals the few parameter combinations that control behaviour.
:::

## Exercises

::: exercise Molecules in a yeast cell {level=1 check="2400"}
A budding yeast cell has a volume of about 40 fL. How many molecules of a protein at 100 nM does it contain? (Use $N_A = 6.0\times10^{23}$ mol⁻¹ and give the answer to two significant figures.)
::: solution
$n = cVN_A = 100\times10^{-9}\ \text{mol L}^{-1}\times40\times10^{-15}\ \text{L}\times6.0\times10^{23}\ \text{mol}^{-1} = 2400$ molecules. The same concentration in *E. coli* (1 fL) would be only 60 molecules.
:::
:::

::: exercise Occupancy {level=1 check="0.2"}
A transcription factor binds its site with $K_\mathrm{d} = 4$ nM. What fraction of time is the site occupied when the free factor is at 1 nM?
::: solution
$\theta = 1/(4 + 1) = 0.2$. The site is occupied 20 % of the time.
:::
:::

::: exercise Half-life and rate constant {level=1 check="0.0231"}
A protein has a half-life of 30 min and is not diluted. What is its degradation rate constant in min⁻¹ (three significant figures)? If its synthesis rate is 50 molecules per minute, what is its steady-state copy number?
::: solution
$\alpha = \ln 2/t_{1/2} = 0.693/30 = 0.0231$ min⁻¹. The steady state is $\beta/\alpha = 50/0.0231 = 2160$ molecules, about 2,200.
:::
:::

::: exercise Units of rate constants {level=1}
Give the units of the rate constant in (a) $\text{A}\to\text{B}$, (b) $\text{A}+\text{B}\to\text{C}$, (c) $2\text{A}\to\text{A}_2$, (d) a zero-order synthesis $\emptyset \to \text{A}$. Write the mass-action rate of change of $[\text{A}]$ for (c).
::: solution
(a) s⁻¹. (b) M⁻¹ s⁻¹. (c) M⁻¹ s⁻¹. (d) M s⁻¹. For (c), each reaction event consumes two molecules of A, so $d[\text{A}]/dt = -2k[\text{A}]^2$ (with the rate of the reaction defined as $k[\text{A}]^2$; some texts absorb the factor 2 into $k$, so state your convention).
:::
:::

::: exercise Stability by sketch {level=2}
Find all steady states of $dx/dt = x(1 - x)(x - 0.3)$ for $x \ge 0$ and classify their stability. Interpret the model as a population or concentration with a threshold.
::: hint
Compute $f'(x)$ at each root, or sketch the sign of $f$ between the roots.
:::
::: solution
The steady states are $x = 0$, $0.3$ and $1$. Between 0 and 0.3, $f < 0$ (since $x > 0$, $1 - x > 0$, $x - 0.3 < 0$); between 0.3 and 1, $f > 0$; above 1, $f < 0$. So $x = 0$ is stable (deviations upward are pushed back down), $x = 0.3$ unstable and $x = 1$ stable. Equivalently $f'(0) = -0.3$, $f'(0.3) = 0.3\times0.7 = 0.21 > 0$, $f'(1) = -0.7$. The system is **bistable**: starting below the threshold 0.3 it falls to 0, starting above it rises to 1. This is the same structure as the Allee effect in ecology and the genetic switches of [[systems-biology/switches-oscillators]].
:::
:::

::: exercise Depleting a ligand {level=2 check="3.78"}
A receptor at total concentration 10 nM binds a ligand added at total concentration 5 nM, with $K_\mathrm{d} = 2$ nM. Find the equilibrium concentration of complex (in nM, three significant figures).
::: solution
With $c$ the complex, the free receptor is $10 - c$ and the free ligand $5 - c$, so $(10 - c)(5 - c)/c = 2$. Expanding, $50 - 15c + c^2 = 2c$, that is $c^2 - 17c + 50 = 0$, with roots $(17 \pm \sqrt{89})/2 = (17 \pm 9.434)/2$, i.e. 3.78 or 13.2 nM. Only 3.78 nM is below the total ligand, so $c = 3.78$ nM: 76 % of the ligand is bound.
:::
:::

::: exercise Fitting rate constants from relaxation {level=2}
In a stopped-flow experiment a protein at low concentration is mixed with an excess of ligand at several concentrations, and the observed relaxation rate $k_\mathrm{obs}$ of the binding signal is measured: 0.6 s⁻¹ at 1 μM, 1.1 s⁻¹ at 2 μM, 2.1 s⁻¹ at 4 μM, 4.1 s⁻¹ at 8 μM. Estimate $k_\mathrm{on}$, $k_\mathrm{off}$ and $K_\mathrm{d}$.
::: solution
For ligand in excess, $k_\mathrm{obs} = k_\mathrm{on}[\text{L}] + k_\mathrm{off}$, a straight line in $[\text{L}]$. The data increase by 0.5 s⁻¹ per μM between consecutive points (1.1 − 0.6 = 0.5 per 1 μM; 2.1 − 1.1 = 1.0 per 2 μM; 4.1 − 2.1 = 2.0 per 4 μM), so the slope is $k_\mathrm{on} = 0.5\ \mu\text{M}^{-1}\,\text{s}^{-1} = 5\times10^5$ M⁻¹ s⁻¹, and the intercept is $k_\mathrm{off} = 0.6 - 0.5 = 0.1$ s⁻¹. Then $K_\mathrm{d} = k_\mathrm{off}/k_\mathrm{on} = 0.1/0.5 = 0.2\ \mu$M = 200 nM. The kinetic $K_\mathrm{d}$ should agree with one measured at equilibrium; disagreement would suggest that binding has more than one step.
:::
:::

::: exercise Nondimensionalising binding {level=2}
Show that the binding equation with ligand in excess, $dC/dt = k_\mathrm{on}A(B_T - C) - k_\mathrm{off}C$, can be written in terms of $\theta = C/B_T$, $a = A/K_\mathrm{d}$ and $\tau = k_\mathrm{off}t$ as $d\theta/d\tau = a(1 - \theta) - \theta$. What is the only parameter, and what does that imply about experiments at different absolute concentrations?
::: solution
Divide the equation by $B_T k_\mathrm{off}$: $\dfrac{d\theta}{d(k_\mathrm{off}t)} = \dfrac{k_\mathrm{on}A}{k_\mathrm{off}}(1 - \theta) - \theta = a(1-\theta) - \theta$. The only parameter is $a = A/K_\mathrm{d}$, the ligand concentration in units of the dissociation constant. Two experiments with the same $A/K_\mathrm{d}$ produce identical occupancy curves when time is measured in units of $1/k_\mathrm{off}$; the absolute concentrations and $B_T$ do not matter (as long as A is in excess).
:::
:::

::: exercise Where Michaelis–Menten fails {level=3}
For a kinase–substrate pair with $E_T = S_0$, explain physically why the standard quasi-steady-state approximation fails, and why it may nevertheless work when $K_\mathrm{m} \gg S_0$.
::: solution
When enzyme and substrate are at similar concentrations, a large fraction of the substrate can be sequestered in the complex ES. The standard approximation treats $[\text{S}]$ as the free substrate and assumes its depletion during the initial binding transient is negligible; but with $E_T = S_0$ and $K_\mathrm{m}$ comparable to $S_0$, binding alone can remove much of the free substrate in the first transient, so the slow manifold is reached at a very different $[\text{S}]$ than assumed, and free and total substrate differ substantially. If $K_\mathrm{m} \gg S_0$, however, the complex is always a small fraction of either partner ($[\text{ES}] \approx E_T S/K_\mathrm{m}$ is small relative to $S$ when $E_T \ll K_\mathrm{m}$), so depletion by binding is minor; this is reflected in the condition $E_T/(K_\mathrm{m} + S_0) \ll 1$, which can hold through a large $K_\mathrm{m}$ even when $E_T = S_0$.
:::
:::

::: exercise Interpreting a protein-turnover experiment {level=3}
Cells are switched from a medium that induces a protein to one in which its synthesis stops entirely. The protein level, in arbitrary units, is measured at intervals: 100 at 0 h, 71 at 1 h, 50 at 2 h, 35 at 3 h, 25 at 4 h. In a second experiment, synthesis is suddenly switched on in cells that had none, and the level reaches half of its final value after 2 h. (a) Estimate the removal rate constant. (b) Is the second experiment consistent with [[#prop-prod-deg]]? (c) The cells divide every 2 h and the protein is stable. What does that tell you about the mechanism of removal?
::: solution
(a) The level halves every 2 h (100 → 50 → 25), so $\alpha = \ln 2/2 = 0.35$ h⁻¹; the ratios 0.71 per hour ($= 2^{-1/2}$) confirm exponential decay.

(b) Yes. [[#prop-prod-deg]] predicts that the approach to a new steady state from zero has the same half-time, $\ln 2/\alpha = 2$ h, as the decay — the rise and the fall are mirror images.

(c) A stable protein in growing cells is still removed — by **dilution**. Its total amount stays constant, but the volume doubles every 2 h, so its concentration halves every 2 h: $\alpha = \ln 2/T_\text{div}$. The measured $\alpha$ equals the dilution rate, so active degradation is negligible. This is the situation for most bacterial proteins, discussed in [[systems-biology/gene-expression-dynamics]].
:::
:::
