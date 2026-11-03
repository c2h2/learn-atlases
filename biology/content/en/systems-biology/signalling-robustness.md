A swimming *Escherichia coli* cell can detect a change of a few per cent in the concentration of the amino acid aspartate, and it can do so whether the background concentration is a few nanomolar or a millimolar — a range of five orders of magnitude. After each change it returns to the same baseline behaviour, ready to detect the next. And this precise return persists when the amounts of its signalling proteins vary several-fold from cell to cell, as they inevitably do ([[systems-biology/noise]]). How can a network of a handful of proteins be so sensitive, have such a wide range and be so insensitive to its own parameters?

This chapter is about the quantitative properties of signalling networks: how sharply they respond, how they **adapt** to persistent stimuli, and what makes a property **robust**. We first define measures of sensitivity and meet three mechanisms that produce switch-like (**ultrasensitive**) responses: cooperativity, multisite modification, and the saturation of the enzymes in a covalent-modification cycle. We then analyse bacterial chemotaxis, where the Barkai–Leibler model showed how **exact adaptation** can follow from the structure of a network rather than from fine-tuned parameters, and generalise this to **integral feedback**. The biology of receptors, second messengers and kinase cascades is described in [[cell-biology/cell-signalling]]; the network motifs and Hill functions are from [[systems-biology/network-motifs]] and [[systems-biology/gene-expression-dynamics]].

## Measuring sensitivity

A signalling system converts an input — a ligand concentration $S$ — into an output $y$, for example the fraction of a protein in its active, phosphorylated form. Two measures describe how sharply it does so.

::: definition Sensitivity and response coefficient {#def-sensitivity}
The **logarithmic sensitivity** (or local gain) of the output $y$ to the input $S$ is

$$
\varepsilon = \frac{d\ln y}{d\ln S} = \frac{S}{y}\frac{dy}{dS},
$$ {#eq-log-gain}

the percentage change in output per percentage change in input. A response is **ultrasensitive** if $\varepsilon > 1$ somewhere in its range — more sensitive than a simple hyperbolic (Michaelis–Menten) response, for which $\varepsilon \le 1$ everywhere. For a sigmoidal response rising from 0 to a maximum, the **response coefficient** is

$$
R = \frac{S_{90}}{S_{10}},
$$ {#eq-response-coefficient}

the ratio of the inputs giving 90 % and 10 % of the maximal response; the **effective Hill coefficient** is $n_\mathrm{H} = \ln 81/\ln R$, the Hill coefficient of the Hill function with the same response coefficient.
:::

For a hyperbolic response $y = S/(K + S)$, $R = 81$ and $n_\mathrm{H} = 1$; for a Hill function with coefficient $n$, $R = 81^{1/n}$ ([[systems-biology/gene-expression-dynamics#prop-hill]]). Logarithmic sensitivities compose simply: if $y$ depends on $x$ and $x$ on $S$, then by the chain rule $d\ln y/d\ln S = (d\ln y/d\ln x)(d\ln x/d\ln S)$. **Sensitivities multiply along a cascade.**

::: example Amplification down a cascade {#ex-cascade}
A three-tier kinase cascade has, at its operating point, local logarithmic sensitivities of 1.5 at each tier. What is the overall sensitivity? If the input rises by 2 %, by how much does the output change?
::: solution
The sensitivities multiply: $1.5^3 = 3.4$. A 2 % increase in input therefore produces about a $3.4\times2 = 6.8$ % increase in output, for small changes. Multiplication along a cascade is one reason why signalling pathways have several tiers; but it applies only near the operating point, and a cascade whose tiers are each saturated can lose sensitivity just as easily as it gains it.
:::
:::

## Ultrasensitivity

Three main mechanisms make responses steeper than hyperbolic.

1. **Cooperative binding.** As in haemoglobin or a promoter bound by a tetrameric repressor, binding of one ligand increases the affinity of the others, giving Hill-type responses with $n_\mathrm{H} > 1$ ([[systems-biology/gene-expression-dynamics]]).
2. **Multisite modification.** If a protein becomes active only when several sites are phosphorylated, and the sites are modified by a distributive mechanism (the kinase dissociates between modifications), the fraction fully modified rises roughly as a power of the kinase activity. A striking case is the yeast CDK inhibitor Sic1, which must be phosphorylated on at least six of its nine sites before it is recognised by the ubiquitin ligase SCF^Cdc4^ and degraded, setting a sharp threshold for the onset of DNA replication (Nash and colleagues, 2001).
3. **Zero-order ultrasensitivity.** A protein that is phosphorylated by a kinase and dephosphorylated by a phosphatase can switch sharply between its two forms when both enzymes are saturated with their substrate. This needs no cooperativity at all.

### Zero-order ultrasensitivity

Consider a protein W that a kinase converts to the active form W* and a phosphatase converts back, with total $W_T = W + W^*$. In [[systems-biology/modelling-principles#ex-cycle]] the enzymes were unsaturated and the response was graded. Now let both follow Michaelis–Menten kinetics with maximal rates $V_1$ (kinase) and $V_2$ (phosphatase), and Michaelis constants $K_1$ and $K_2$:

$$
\frac{dW^*}{dt} = \frac{V_1(W_T - W^*)}{K_1 + W_T - W^*} - \frac{V_2W^*}{K_2 + W^*}.
$$ {#eq-gk-cycle}

::: proposition The Goldbeter–Koshland function {#prop-gk}
In units of the total, $w = W^*/W_T$, $J_1 = K_1/W_T$, $J_2 = K_2/W_T$, the steady state of [[#eq-gk-cycle]] satisfies

$$
\frac{V_1}{V_2} = \frac{w\,(J_1 + 1 - w)}{(1 - w)(J_2 + w)} ,
$$ {#eq-gk}

which defines $w$ as an increasing function of the ratio $u = V_1/V_2$ of kinase to phosphatase activity (the **Goldbeter–Koshland function**). Its response coefficient with respect to $u$ is

$$
R = \frac{u_{90}}{u_{10}} = 81\,\frac{(J_1 + 0.1)(J_2 + 0.1)}{(J_1 + 0.9)(J_2 + 0.9)} .
$$ {#eq-gk-R}

When both enzymes are far from saturation ($J_1, J_2 \gg 1$), $R \to 81$, a hyperbolic response; when both are saturated ($J_1, J_2 \ll 1$), $R \to 1$, and the switch from mostly inactive to mostly active occurs over a tiny change in $u$ around $u = 1$. **Assumptions:** Michaelis–Menten kinetics with enzymes at much lower concentration than W (so that sequestration in enzyme–substrate complexes is negligible), and a steady state.
:::

::: proof
At steady state the two rates are equal: $V_1(W_T - W^*)/(K_1 + W_T - W^*) = V_2W^*/(K_2 + W^*)$. Dividing numerators and denominators by $W_T$ and rearranging gives [[#eq-gk]]. The right-hand side increases from 0 to $\infty$ as $w$ runs from 0 to 1, so there is one steady state for each $u$. Evaluating at $w = 0.9$ and $w = 0.1$,

$$
u_{90} = \frac{0.9\,(J_1 + 0.1)}{0.1\,(J_2 + 0.9)}, \qquad u_{10} = \frac{0.1\,(J_1 + 0.9)}{0.9\,(J_2 + 0.1)},
$$

whose ratio is [[#eq-gk-R]]. For large $J$s the $J$-dependent factors cancel and $R = 81$; for small $J$s, $R \to 81\times(0.1\times0.1)/(0.9\times0.9) = 1$.
:::

::: intuition Why saturation makes a switch
When both enzymes are saturated, each works at its maximal rate almost regardless of how much substrate is available — the kinase converts W to W* at rate $V_1$ and the phosphatase converts it back at rate $V_2$, independently of the amounts of W and W*. If $V_1$ is even slightly larger than $V_2$, W* accumulates relentlessly until nearly all the protein is phosphorylated and the phosphatase-limited back-flow catches up only when W is nearly exhausted; if $V_1$ is slightly smaller, the reverse. The steady state is set by a contest between two fixed rates, and whichever enzyme is ahead wins almost completely. Unsaturated enzymes, whose rates are proportional to their substrates, cannot behave like this: as W* accumulates, the phosphatase speeds up proportionally and a graded balance is struck.
:::

::: widget plot
f: 2*x*J/((1 - x + J + J*x) + sqrt((1 - x + J + J*x)^2 - 4*(1 - x)*x*J)); x/(1 + x)
x: 0, 3
y: 0, 1.05
sliders: J=0.05:0.005:2:0.005
labels: \text{Goldbeter–Koshland}, J_1 = J_2 = J; \text{unsaturated, } \frac{u}{1+u}
hlines: 0.1; 0.9
vlines: 1
caption: Steady-state fraction of protein in the active form, $w = W^*/W_T$, against the ratio $u = V_1/V_2$ of kinase to phosphatase activity. The blue curve is the Goldbeter–Koshland function with equal Michaelis constants $J_1 = J_2 = J$ (relative to the total protein); the second curve is the hyperbolic response of a cycle with unsaturated enzymes. With $J = 0.05$ the cycle switches from 10 % to 90 % active over about a twofold change in $u$ around $u = 1$, compared with 81-fold for the hyperbola; raise $J$ towards 2 and the switch softens towards the hyperbola. The horizontal lines mark 10 % and 90 % activity.
:::

::: example How sharp is a saturated cycle? {#ex-gk}
Calculate the response coefficient and effective Hill coefficient of a covalent-modification cycle with (a) $J_1 = J_2 = 1$, (b) $J_1 = J_2 = 0.1$, (c) $J_1 = J_2 = 0.01$.
::: solution
From [[#eq-gk-R]]:

(a) $R = 81\times(1.1)^2/(1.9)^2 = 81\times0.335 = 27.2$, so $n_\mathrm{H} = \ln81/\ln27.2 = 1.33$.

(b) $R = 81\times(0.2)^2/(1.0)^2 = 3.24$, $n_\mathrm{H} = 4.394/1.176 = 3.7$.

(c) $R = 81\times(0.11)^2/(0.91)^2 = 1.18$, $n_\mathrm{H} = 4.394/0.169 = 26$.

With Michaelis constants a hundredth of the substrate concentration the cycle behaves like a Hill function with $n \approx 26$ — far steeper than any cooperative binding. The catch is the assumption that the enzymes are much less abundant than their substrate; in real signalling, where kinases and substrates are often comparable in concentration, sequestration of substrate in enzyme complexes reduces the ultrasensitivity ([[systems-biology/modelling-principles#ex-qssa]]).
:::
:::

### The MAPK cascade

Mitogen-activated protein kinase (MAPK) cascades — three kinases in series, MAPKKK → MAPKK → MAPK, each activating the next by phosphorylation — are found in all eukaryotes, controlling responses to growth factors, stress and pheromones. Each of the two lower tiers requires **dual phosphorylation** for activity, and each is opposed by phosphatases. Chi-Ying Huang and James Ferrell predicted in 1996 that the combination of dual phosphorylation, cycle saturation and the cascade's multiplication of sensitivities should make the response of the final kinase highly ultrasensitive, and confirmed it in extracts of *Xenopus* oocytes: the response of MAPK to the input kinase Mos had an effective Hill coefficient of about 5, much steeper than that of the upstream tiers. In intact oocytes, this ultrasensitivity combines with positive feedback (MAPK promotes the synthesis of Mos) to make the bistable, all-or-none maturation switch mentioned in [[systems-biology/switches-oscillators]].

::: warning "Ultrasensitivity and bistability are the same thing"
An ultrasensitive response is a steep but **single-valued** and reversible function of its input: remove the input and the output returns. Bistability means **two stable outputs** for the same input, with hysteresis and memory. Ultrasensitivity is often a necessary *ingredient* of bistability — positive feedback through a steep response can create two stable states ([[systems-biology/switches-oscillators#prop-toggle]]) — but a steep dose–response curve measured in a population cannot by itself distinguish the two. A bistable system measured in many cells may even look graded on average, because each cell is either on or off and the fraction on varies smoothly. Single-cell measurements and tests for hysteresis are needed.
:::

## Bacterial chemotaxis

*E. coli* swims by rotating a bundle of helical flagella, each driven by a rotary motor at its base. When all motors turn counter-clockwise the flagella form a bundle and the cell swims smoothly — a **run**, typically lasting about a second; when one or more motors reverse to clockwise rotation, the bundle flies apart and the cell **tumbles** for about a tenth of a second, then sets off in a new, nearly random direction. Howard Berg and Douglas Brown tracked single cells in three dimensions in 1972 and showed that in a gradient of attractant, runs heading up the gradient are lengthened. The cell thus performs a **biased random walk**.

To do this the cell must compare the present concentration with the recent past — it is too small to compare its front with its back — and it must respond to *changes* in concentration while ignoring its absolute level. Robert Macnab and Daniel Koshland showed in 1972 that a sudden, uniform increase in attractant suppresses tumbling for a while, after which the tumbling frequency returns to its pre-stimulus value even though the attractant remains high. This return is **adaptation**, and it is remarkably precise.

### The signalling network

The molecular players (genes in italics, proteins upright) were identified mainly by Julius Adler, Daniel Koshland, John Parkinson, Melvin Simon, Howard Berg and their colleagues:

- **Chemoreceptors** (methyl-accepting chemotaxis proteins, MCPs, such as Tar for aspartate and Tsr for serine) span the inner membrane in large clusters at the cell pole. Each receptor complex switches between an active and an inactive conformation; attractant binding favours the inactive state.
- The histidine kinase **CheA**, attached to the receptors by the adaptor CheW, autophosphorylates when the receptor is active and transfers its phosphate to the response regulator **CheY**.
- Phosphorylated **CheY-P** binds the flagellar motor and promotes clockwise rotation — tumbling. The phosphatase **CheZ** dephosphorylates it within a fraction of a second, so the motor responds quickly to changes in CheA activity.
- The methyltransferase **CheR** adds methyl groups to specific glutamate residues on the receptors, which increases their activity; the methylesterase **CheB** removes them. CheB is activated by phosphorylation by CheA — that is, it is active when the receptors are active.

The response is fast: attractant binding inactivates receptors, CheA activity and CheY-P fall within a fraction of a second, and the cell keeps running. Adaptation is slow: over seconds to minutes, CheR methylates the now-inactive receptors and, with CheB less active, methylation rises until receptor activity returns to its pre-stimulus level.

### The Barkai–Leibler model and exact adaptation

Naama Barkai and Stanislas Leibler realised in 1997 that the precision of adaptation could be a consequence of one feature of the network: **CheB demethylates only active receptors**, while **CheR works at a constant, saturated rate**. A simplified version of their model makes the point. Let $m$ be the average methylation level of the receptors and $A$ the fraction of receptors in the active state; $A$ equilibrates quickly and depends on both methylation and attractant concentration $L$, increasing with $m$ and decreasing with $L$: $A = A(m, L)$. The slow dynamics of methylation are

$$
\frac{dm}{dt} = V_R - V_B\,A(m, L),
$$ {#eq-bl}

where $V_R$ is the (zero-order) rate of methylation by CheR, and $V_B A$ the rate of demethylation by CheB acting on active receptors.

::: proposition Exact adaptation in the Barkai–Leibler model {#prop-bl}
At steady state of [[#eq-bl]], the receptor activity is

$$
A_\mathrm{st} = \frac{V_R}{V_B},
$$ {#eq-bl-steady}

independent of the attractant concentration $L$ and of the form of the function $A(m, L)$. After any step change in $L$, the activity changes transiently and then returns exactly to $A_\mathrm{st}$, while the methylation level settles at a new value $m_\mathrm{st}(L)$ that solves $A(m_\mathrm{st}, L) = V_R/V_B$. Adaptation is exact for all parameter values; only the adapted activity level $V_R/V_B$ and the adaptation time depend on the parameters. **Assumptions:** CheR saturated (zero order in its substrate), CheB acting only on active receptors, $A$ increasing in $m$, and a methylation range wide enough to compensate the change in $L$.
:::

::: proof
Setting $dm/dt = 0$ gives $V_BA = V_R$, which is [[#eq-bl-steady]]. Since $A$ is increasing in $m$, the equation $A(m, L) = V_R/V_B$ has a unique solution $m_\mathrm{st}(L)$ for each $L$ (if one exists in the available range), and it is stable: if $m > m_\mathrm{st}$ then $A > V_R/V_B$ and $dm/dt < 0$, and conversely. When $L$ steps up, $A(m, L)$ drops at once (receptors are inactivated at the old methylation level), $dm/dt$ becomes positive, and methylation rises until $A$ is back to $V_R/V_B$. Nothing in the argument depends on the values of $V_R$, $V_B$ or the shape of $A(m, L)$, only on the structure of [[#eq-bl]].
:::

::: example Response and adaptation to a step {#ex-step}
Take $A(m, L) = 1/(1 + e^{L - m})$, where $L$ is a dimensionless measure of attractant (the logarithm of its concentration relative to the receptor's dissociation constant), and $V_R/V_B = 1/3$. (a) Find the adapted methylation level for $L = 0$ and $L = 2$. (b) The attractant steps from $L = 0$ to $L = 2$. What is the receptor activity immediately after the step, and what happens next?
::: solution
(a) Adaptation requires $1/(1 + e^{L - m}) = 1/3$, so $e^{L - m} = 2$ and $m_\mathrm{st} = L - \ln 2$: $m_\mathrm{st} = -0.69$ for $L = 0$ and $1.31$ for $L = 2$. (Methylation is measured from an arbitrary reference, so negative values are allowed.) Each unit increase in $L$ is compensated by one unit of methylation.

(b) Immediately after the step, methylation is still $-0.69$, so $A = 1/(1 + e^{2 + 0.69}) = 1/(1 + 14.8) = 0.063$: receptor activity falls from 0.33 to 0.06, CheY-P falls and the cell stops tumbling. Then, because $A < V_R/V_B$, $dm/dt = V_R - V_BA > 0$: methylation rises by two units over the adaptation time, and the activity climbs back to exactly 1/3.
:::
:::

The following program simulates [[#eq-bl]] with a simple activity function $A = 1/(1 + e^{L - m})$ for two successive steps of attractant, and repeats it with different amounts of CheR activity — as happens from cell to cell.

```python
import math

def activity(m, L):
    """Receptor activity: rises with methylation m, falls with attractant L."""
    return 1.0 / (1.0 + math.exp(L - m))

def run(VR, VB, dt=0.001):
    m, t = 0.0, 0.0
    L = lambda t: 0.0 if t < 50 else (2.0 if t < 100 else 4.0)   # two attractant steps
    out = {}
    while t < 150:
        A = activity(m, L(t))
        m += (VR - VB * A) * dt   # CheR adds methyl groups at constant rate,
        t += dt                   # CheB removes them only from active receptors
        for T in (49.9, 50.5, 99.9, 100.5, 149.9):
            if abs(t - T) < dt / 2:
                out[T] = A
    return out

for VR, VB in [(1.0, 3.0), (2.0, 3.0), (0.5, 3.0)]:
    o = run(VR, VB)
    print(f"VR={VR}, VB={VB}: " + "  ".join(f"A({T})={a:.3f}" for T, a in o.items()))
# VR=1.0, VB=3.0: A(49.9)=0.333  A(50.5)=0.090  A(99.9)=0.333  A(100.5)=0.090  A(149.9)=0.333
# VR=2.0, VB=3.0: A(49.9)=0.667  A(50.5)=0.328  A(99.9)=0.667  A(100.5)=0.329  A(149.9)=0.667
# VR=0.5, VB=3.0: A(49.9)=0.167  A(50.5)=0.032  A(99.9)=0.167  A(100.5)=0.032  A(149.9)=0.167
```

(Time units are arbitrary.) In every case the activity drops sharply half a time unit after each step and then returns *exactly* to its baseline. Changing the CheR activity changes the baseline itself — in a cell, the steady tumbling frequency — but not the precision of adaptation.

::: widget phaseplane
f: 5*(1/(1 + exp(L - y)) - x)
g: r - b*x
x: 0, 1
y: -2, 8
sliders: L=0:0:5:0.1; r=1:0.2:2:0.05; b=3:1:5:0.1
points: 0.33, 0; 0.33, -1.5
caption: The Barkai–Leibler model in the phase plane, with receptor activity $A$ on the horizontal axis and methylation level $m$ on the vertical. Activity relaxes quickly towards the sigmoidal nullcline $A = 1/(1 + e^{L - m})$; methylation changes slowly, and its nullcline is the vertical line $A = V_R/V_B$ (sliders $r = V_R$, $b = V_B$). Move the attractant slider $L$: the sigmoid shifts upwards, so the steady state moves to higher methylation — but it stays on the same vertical line, at the same activity. That is exact adaptation. Changing $r$ or $b$ moves the vertical line, changing the adapted activity, but adaptation remains exact for any values. Trajectories show the fast jump in activity followed by slow methylation.
:::

The prediction that adaptation is robust, while other properties are not, was tested by Uri Alon, Michael Surette, Naama Barkai and Stanislas Leibler in 1999. They varied the expression of CheR and other chemotaxis proteins over a wide, many-fold range and measured the behaviour of tethered cells. The **precision of adaptation** stayed close to exact over the whole range, while the **adaptation time** and the **steady-state tumbling frequency** varied substantially with protein levels — just as [[#prop-bl]] predicts, since the adapted level $V_R/V_B$ and the speed of methylation depend on enzyme amounts but exactness does not.

## Robustness and integral feedback

::: definition Robustness and fine-tuning {#def-robustness}
A property of a biological system is **robust** if it is insensitive to variation in the system's parameters (protein concentrations, rate constants) or to perturbations of its inputs, over a wide range. It is **fine-tuned** if it holds only when parameters take particular values or satisfy particular relations, so that small changes destroy it.
:::

Robustness is not a property of a whole system but of a specific behaviour with respect to specific perturbations: in chemotaxis, adaptation *precision* is robust to protein levels, while adaptation *time* is not. Since protein levels vary from cell to cell and generation to generation, a function that depended on fine-tuning would fail in many cells. Biologists therefore expect important functions to be robust, and robustness becomes a criterion for judging between models. A model of chemotaxis in which exact adaptation required, say, the CheR and CheB rates to be in a precise ratio would be implausible even if it fitted the data for wild-type cells.

Tau-Mu Yi, Yun Huang, Melvin Simon and John Doyle pointed out in 2000 that the Barkai–Leibler mechanism is an instance of a principle familiar to control engineers: **integral feedback**.

::: proposition Integral feedback gives robust perfect adaptation {#prop-integral}
Suppose an output $y$ depends on an input $u$ and a controller variable $x$, and the controller integrates the deviation of the output from a set point $y_0$:

$$
\frac{dx}{dt} = k\,(y_0 - y).
$$ {#eq-integral}

Then at any stable steady state $y = y_0$, whatever the value of the input $u$ and of the other parameters of the system. Hence, after a step change in a constant input, the output returns exactly to $y_0$.
:::

::: proof
At steady state $dx/dt = 0$, so $k(y_0 - y) = 0$ and $y = y_0$. The argument requires only that the steady state exists and is stable; it uses neither the value of $u$ nor the way $y$ depends on $u$ and $x$. The controller variable $x(t) = x(0) + k\int_0^t (y_0 - y)\,dt'$ is the time integral of the error, hence the name.
:::

[[#eq-bl]] has exactly this form with $x = m$, $y = A$, $k = V_B$ and $y_0 = V_R/V_B$. Integral control is the standard way in engineering to make a thermostat or cruise control hold its set point under a changing load, and it has been identified in other biological systems — for example in the regulation of blood calcium, of osmolarity in yeast (Muzzey and colleagues, 2009), and in synthetic "antithetic" controllers built by Stephanie Aoki, Mustafa Khammash and colleagues in 2019. A second route to perfect adaptation is the incoherent feed-forward loop ([[systems-biology/network-motifs]]), in which an input activates an output directly and inhibits it indirectly; with suitable rate laws the two effects cancel exactly at steady state, though usually only for specific parameter relations.

::: example Is this adaptation robust? {#ex-robust}
Two models of a signalling output $y$ responding to a constant input $u$ are proposed. In model 1, $dy/dt = k_1u - k_2xy$ and $dx/dt = k_3u - k_4x$. In model 2, $dy/dt = k_1u - k_2xy$ and $dx/dt = k_5(y - y_0)$. Find the steady-state output of each, and say which adapts exactly, and whether that adaptation is robust to changes in $k_1$.
::: solution
Model 1 (an incoherent feed-forward design, sometimes called a "sniffer"): at steady state $x = k_3u/k_4$ and $y = k_1u/(k_2x) = k_1k_4/(k_2k_3)$. This is independent of $u$, so the system adapts exactly to any step in input — but the adapted level depends on all four rate constants, and exactness relies on $x$ and the production of $y$ both being exactly proportional to $u$ (if, say, $x$ responded to $u$ with any saturation, adaptation would fail).

Model 2 has integral feedback: $dx/dt = 0$ forces $y = y_0$, whatever $u$ and whatever $k_1$, $k_2$ or $k_5$. It adapts exactly and robustly, and its adapted level is set by the single parameter $y_0$. (Stability needs $k_5 > 0$ with the sign conventions here: if $y$ rises above $y_0$, $x$ increases and pulls $y$ back down.)
:::
:::

### Sensing relative changes

Exact adaptation lets chemotaxis respond to a change in attractant while ignoring its absolute level, so the cell's response depends roughly on the *relative* change in concentration — a form of **Weber's law**, familiar from human perception. Experiments in which cells were exposed to exponential ramps of attractant (Milena Lazova, Victor Sourjik, Thomas Shimizu and colleagues, 2011) showed that *E. coli* responds to the logarithm of concentration over a wide range, an example of **fold-change detection**. Sensitivity is high because receptors work in large cooperative clusters (Sourjik and Berg, 2004), which amplify small changes in occupancy into large changes in kinase activity, and the range is wide because methylation shifts the receptors' sensitivity to match the background, as the sigmoid shifts in the widget above.

::: quiz
In the Barkai–Leibler model, a mutant cell has twice the normal amount of CheB. Which statement is correct?
- [ ] The cell no longer adapts exactly.
- [x] The cell still adapts exactly, but its adapted receptor activity is halved, so it tumbles less often at steady state.
- [ ] The cell adapts exactly with unchanged steady-state behaviour.
- [ ] The cell cannot respond to attractant at all.
::: solution
Doubling CheB doubles $V_B$, so the adapted activity $V_R/V_B$ halves. Exactness does not depend on parameter values, so after any step the activity still returns to the (new) baseline. A lower baseline activity means less CheY-P and a lower steady tumbling frequency. Alon and colleagues observed exactly this pattern: adaptation precision robust, steady-state tumbling not.
:::
:::

## Robustness elsewhere, and its price

The chemotaxis study made robustness a guiding idea in systems biology. In development, George von Dassow, Garrett Odell and colleagues showed in 2000 that a model of the *Drosophila* segment-polarity network produced the correct pattern of gene expression for a large fraction of randomly chosen parameter sets, suggesting that the network's topology, not fine-tuned rates, guarantees its function ([[systems-biology/pattern-formation]]). Robustness to mutation — **canalisation**, in Conrad Waddington's term — may explain why many gene knock-outs have little phenotype.

Robustness has costs and limits. A design robust to one kind of perturbation is often fragile to another — "robust yet fragile", in the phrase of Marie Csete and John Doyle (2002). Integral feedback adapts perfectly to constant inputs but can oscillate if the integration is too strong; chemotaxis adaptation fails if the attractant range exceeds what methylation can compensate; and robust systems can hide accumulating mutations that are revealed when the buffer fails. Robustness is a property to be measured, not assumed.

::: application Robust circuits in engineering and medicine
Integral feedback is the most common way to build a robust controller, and synthetic biologists now implement it in cells — the antithetic controller of Aoki and colleagues uses two molecules that annihilate each other to compute an integral — for applications such as keeping the expression of a therapeutic protein constant despite variation in cell state. In metabolic engineering, robust control of pathway enzymes can prevent the accumulation of toxic intermediates. In pharmacology, the robustness of signalling networks explains why inhibiting a single kinase often produces a smaller effect than expected: feedback and adaptation compensate, which is one rationale for combinations of drugs targeting different points of a pathway. The medical side is treated in Medicine Atlas.
:::

::: history
Ultrasensitivity was analysed by Albert Goldbeter and Daniel Koshland in a 1981 paper in *PNAS* that introduced zero-order ultrasensitivity and the function now named after them, building on Earl Stadtman and Boon Chock's work on cascades of covalent modification in the 1970s. In chemotaxis, Julius Adler established the genetics of *E. coli* chemotaxis in the 1960s; Berg and Brown (1972) described the biased random walk and Macnab and Koshland (1972) temporal sensing and adaptation; and the roles of methylation, CheR and CheB were worked out by several groups in the 1970s and 1980s. The 1997 paper by Barkai and Leibler in *Nature*, "Robustness in simple biochemical networks", and the 1999 experimental test by Alon, Surette, Barkai and Leibler are often cited as founding papers of modern systems biology, because they showed how a quantitative model could identify which properties of a network are robust and why.
:::

::: summary
- Logarithmic sensitivities measure gain and multiply along a cascade; a hyperbolic response has response coefficient $R = S_{90}/S_{10} = 81$, a Hill response $81^{1/n}$.
- Ultrasensitivity arises from cooperativity, multisite modification and zero-order ultrasensitivity: a covalent-modification cycle with saturated enzymes switches sharply when kinase and phosphatase activities cross ($R = 81(J_1 + 0.1)(J_2 + 0.1)/((J_1 + 0.9)(J_2 + 0.9))$). The MAPK cascade combines these to reach $n_\mathrm{H} \approx 5$.
- Ultrasensitivity is steep but reversible; bistability needs feedback and gives memory.
- *E. coli* chemotaxis is a biased random walk controlled by receptor activity → CheA → CheY-P → motor; adaptation is by receptor methylation (CheR) and demethylation of active receptors (CheB).
- Because CheB acts only on active receptors and CheR is saturated, the adapted activity is $V_R/V_B$ for any attractant level: exact adaptation that is robust to parameters, an instance of integral feedback.
- Robustness is property- and perturbation-specific; robust designs have costs and fragilities.
:::

## Exercises

::: exercise A response coefficient {level=1 check="3"}
A kinase cascade's output rises from 10 % to 90 % of maximum as the input rises from 5 nM to 15 nM. What is its response coefficient $R$?
::: solution
$R = 15/5 = 3$, corresponding to $n_\mathrm{H} = \ln81/\ln3 = 4$.
:::
:::

::: exercise Sensitivity of a hyperbola {level=1}
Show that for $y = S/(K + S)$ the logarithmic sensitivity is $\varepsilon = K/(K + S)$, which never exceeds 1. What is it at $S = K$?
::: solution
$dy/dS = K/(K + S)^2$, so $\varepsilon = (S/y)\,dy/dS = (K + S)\cdot K/(K + S)^2 = K/(K + S)$. It is at most 1 (as $S \to 0$) and equals $1/2$ at $S = K$: a 1 % change in input gives a 0.5 % change in output.
:::
:::

::: exercise Adapted activity {level=1 check="0.25"}
In the Barkai–Leibler model, CheR methylates at $V_R = 0.5$ and CheB demethylates active receptors with $V_B = 2$ (same units). What is the adapted receptor activity?
::: solution
$A_\mathrm{st} = V_R/V_B = 0.25$.
:::
:::

::: exercise A saturated cycle {level=2 check="6.0"}
A phosphorylation cycle has $J_1 = J_2 = 0.2$. Compute its response coefficient to two significant figures, and the effective Hill coefficient.
::: solution
From [[#eq-gk-R]], $R = 81\times(0.3)^2/(1.1)^2 = 81\times0.09/1.21 = 6.0$, and $n_\mathrm{H} = \ln81/\ln6.0 = 4.39/1.80 = 2.4$.
:::
:::

::: exercise Which property is robust? {level=2}
In tethered-cell experiments, cells overexpressing CheR fivefold adapt to a step of attractant in 3 min instead of 1 min, and their steady clockwise bias is 0.4 instead of 0.2, but the clockwise bias returns to its own pre-stimulus value after the step. Interpret these results in terms of [[#prop-bl]].
::: solution
Overexpressing CheR raises $V_R$, which raises the adapted activity $V_R/V_B$ — hence the higher steady clockwise bias, since more active receptors mean more CheY-P. The return to the pre-stimulus value shows that adaptation remains exact, as the model predicts for any $V_R$. The longer adaptation time reflects the dependence of the methylation kinetics on the enzyme levels (in a fuller model, the adaptation time depends on $V_B$ and on how strongly activity depends on methylation near the new operating point). Robust: precision; not robust: adaptation time and adapted activity.
:::
:::

::: exercise A failed integral controller {level=2}
Suppose CheB were not saturated with its substrate and demethylated *all* receptors at a rate proportional to $m$, with an extra factor $A$: $dm/dt = V_R - k_Bm A(m, L)$. Does the model still adapt exactly? Explain.
::: solution
No. The steady state now satisfies $k_Bm A = V_R$, so $A_\mathrm{st} = V_R/(k_Bm_\mathrm{st})$. When $L$ increases, $m_\mathrm{st}$ must increase to compensate, and so $A_\mathrm{st}$ decreases: activity does not return to its previous value. The dependence of the demethylation rate on $m$ itself breaks the integral structure — the controller no longer integrates a pure function of the output. Exact adaptation requires that the rate of change of methylation depend on the state only through the activity $A$.
:::
:::

::: exercise Range of adaptation {level=2}
In the model $A = 1/(1 + e^{L - m})$ with methylation limited to $0 \le m \le 8$ and $V_R/V_B = 1/3$, for which values of $L$ can the cell adapt exactly?
::: solution
The adapted methylation solves $1/(1 + e^{L - m}) = 1/3$, i.e. $e^{L - m} = 2$, $m = L - \ln2 = L - 0.693$. This must lie in $[0, 8]$, so $0.693 \le L \le 8.693$. Outside this range methylation saturates and adaptation becomes imperfect: below it the cell's receptors are maximally demethylated and still too active; above it, fully methylated and still too inactive. In real cells, with $L$ representing the logarithm of attractant concentration in units of the receptor's dissociation constant, the methylation range corresponds to several orders of magnitude of concentration.
:::
:::

::: exercise Interpreting a dose–response curve {level=3}
A population measurement of a phosphorylated signalling protein by western blot gives a steep dose–response curve with $n_\mathrm{H} \approx 4$. Give two different molecular mechanisms that could produce this, one experiment that would distinguish a graded ultrasensitive response from a bistable all-or-none one, and one that would test for zero-order ultrasensitivity specifically.
::: solution
Mechanisms: multisite phosphorylation (several sites must be modified), a saturated phosphorylation–dephosphorylation cycle, cooperative binding upstream, a cascade multiplying sensitivities, or positive feedback producing bistability. To distinguish graded from all-or-none: measure the response in single cells (flow cytometry or imaging) at intermediate doses — a graded response gives a unimodal distribution shifting with dose, a bistable one a bimodal distribution — and test for hysteresis by pre-stimulating cells and stepping the dose down. To test zero-order ultrasensitivity: reduce the substrate concentration (or increase the enzyme concentrations) so that the enzymes are no longer saturated; the steepness should fall, approaching a hyperbola as predicted by [[#eq-gk-R]], whereas cooperativity-based steepness would be unaffected.
:::
:::

::: exercise Adaptation time in a linear model {level=3}
Linearise [[#eq-bl]] about its adapted state. Suppose $\partial A/\partial m = a_m > 0$ there. Show that after a small step in $L$, the activity returns to baseline exponentially with rate $V_Ba_m$, and use this to explain why adaptation time depends on protein levels while precision does not.
::: solution
Let $m = m_\mathrm{st}(L) + \delta$. Then $A \approx V_R/V_B + a_m\delta$, so $d\delta/dt = -V_Ba_m\delta$: the deviation, and with it the activity deviation $a_m\delta$, decays as $e^{-V_Ba_mt}$. Immediately after a step $\Delta L$, $\delta = -\Delta m_\mathrm{st}$ and the activity is displaced by $(\partial A/\partial L)\Delta L$; it then returns to $V_R/V_B$ with time constant $1/(V_Ba_m)$. The time constant involves $V_B$ (proportional to CheB amount) and the slope $a_m$ (which depends on where on the sigmoid the adapted state lies, hence on $V_R/V_B$), so it changes with protein levels. The final value is always $V_R/V_B$ relative to the pre-stimulus baseline, so the *return* is exact whatever the parameters.
:::
:::
