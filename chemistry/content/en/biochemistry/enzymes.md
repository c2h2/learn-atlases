Orotidine 5′-phosphate decarboxylase removes a carboxyl group from a pyrimidine ring, the last step in the synthesis of the nucleotide UMP. In neutral water, without the enzyme, the same reaction has a half-life of about 78 million years. On the enzyme it happens 39 times a second. That is a rate enhancement of $10^{17}$, achieved at body temperature, in water, near pH 7, with no strong acids, no high pressure and no exotic reagents — only the side chains of twenty amino acids arranged in the right places. Enzymes are the reason chemistry can run a cell: reactions that would otherwise take geological time are made to happen on the timescale of a heartbeat, and each is made to happen only to the right molecule.

This chapter asks how. The answer has two layers. The first is **kinetics**: what an enzyme does to a rate law, how its performance is summarised by two numbers, $k_\mathrm{cat}$ and $K_\mathrm{M}$, and how inhibitors change those numbers in diagnostic ways. The catalytic-cycle derivation of the Michaelis–Menten law is given in [[kinetics/homogeneous-catalysis]]; here we take it further, to the specificity constant, the diffusion limit, the full family of reversible inhibitors and the use of rate data to read mechanism. The second layer is **chemistry**: the catalytic strategies — general acid–base catalysis, covalent catalysis, metal ions, proximity and, above all, binding the transition state more tightly than the substrate — worked out in detail for the serine proteases. The chapter ends with how cells switch enzymes on and off. The protein structure that makes all this possible is that of [[biochemistry/amino-acids-proteins]], and the language of binding (dissociation constants, saturation, allostery) is that of [[biochemistry/protein-function]].

## What a catalyst can and cannot do

An enzyme is a catalyst, and everything true of catalysts in general is true of it. It speeds up a reaction by providing a path with a lower free energy of activation, and it is regenerated at the end of each cycle. It does **not** change the equilibrium constant: $K$ depends only on the free energies of reactants and products, $\Delta_\mathrm{r}G^\circ = -RT\ln K$, and the enzyme appears on both sides of the overall reaction. An enzyme that speeds the forward reaction by $10^{10}$ speeds the reverse reaction by exactly the same factor. Whether a reaction runs forwards in a cell is decided by thermodynamics — by the actual free-energy change under cellular concentrations, the subject of [[biochemistry/bioenergetics]] — and the enzyme only decides how fast it gets there.

Transition-state theory ([[kinetics/transition-state-theory]]) makes the size of the effect concrete. A first-order rate constant is $k = (k_\mathrm{B}T/h)\exp(-\Delta^\ddagger G/RT)$, so a rate enhancement $k_\mathrm{cat}/k_\mathrm{non}$ corresponds to a lowering of the activation free energy by
$$
\Delta\Delta^\ddagger G = RT\ln\frac{k_\mathrm{cat}}{k_\mathrm{non}}.
$$ {#eq-ddg}
At $298\ \mathrm{K}$, $RT\ln 10 = 5.71\ \mathrm{kJ\,mol^{-1}}$: every factor of ten in rate is worth $5.7\ \mathrm{kJ\,mol^{-1}}$ of barrier. A millionfold enhancement is $34\ \mathrm{kJ\,mol^{-1}}$ — about the energy of two good hydrogen bonds. This is why enzymologists say that catalysis is "paid for" by binding energy: the free energy released when an enzyme makes many weak noncovalent contacts with its substrate ([[biochemistry/water-noncovalent#def-hbond]]) is the currency spent on lowering the barrier.

::: proposition Transition-state binding {#prop-ts}
Let a substrate S react uncatalysed with rate constant $k_\mathrm{non}$ and on an enzyme, from the complex ES, with rate constant $k_\mathrm{cat}$. Let $K_\mathrm{S}$ be the dissociation constant of ES and define $K_\mathrm{T}$ as the (hypothetical) dissociation constant of the enzyme–transition-state complex, $\mathrm{ES^\ddagger \rightleftharpoons E + S^\ddagger}$. If both rate constants obey transition-state theory with the same prefactor $k_\mathrm{B}T/h$, then
$$
\frac{k_\mathrm{cat}}{k_\mathrm{non}} = \frac{K_\mathrm{S}}{K_\mathrm{T}}.
$$ {#eq-ts}
The enzyme accelerates the reaction by exactly the factor by which it binds the transition state more tightly than the substrate.
:::

::: proof A thermodynamic box
Write the four equilibria that connect $\mathrm{E + S}$ with $\mathrm{ES^\ddagger}$ by two routes. Route 1: binding, $\mathrm{E + S \rightleftharpoons ES}$ (equilibrium constant $1/K_\mathrm{S}$), then activation on the enzyme, $\mathrm{ES \rightleftharpoons ES^\ddagger}$ (quasi-equilibrium constant $K^\ddagger_\mathrm{cat}$). Route 2: activation in solution, $\mathrm{S \rightleftharpoons S^\ddagger}$ ($K^\ddagger_\mathrm{non}$), then binding of the transition state, $\mathrm{E + S^\ddagger \rightleftharpoons ES^\ddagger}$ ($1/K_\mathrm{T}$). Free energy is a state function, so the products of the equilibrium constants along the two routes are equal:
$$
\frac{K^\ddagger_\mathrm{cat}}{K_\mathrm{S}} = \frac{K^\ddagger_\mathrm{non}}{K_\mathrm{T}}.
$$
Transition-state theory gives $k_\mathrm{cat} = (k_\mathrm{B}T/h)K^\ddagger_\mathrm{cat}$ and $k_\mathrm{non} = (k_\mathrm{B}T/h)K^\ddagger_\mathrm{non}$; dividing, the prefactors cancel and [[#eq-ts]] follows. The assumption of a common prefactor (equal transmission coefficients) is the weak point of the argument, but it changes the conclusion by small factors, not by powers of ten.
:::

[[#prop-ts]] is the modern form of an idea Linus Pauling put forward in 1946: an enzyme is complementary not to its substrate but to the transition state. It explains why **transition-state analogues** — stable molecules that mimic the geometry and charge of a transition state — are often bound millions of times more tightly than substrates, and why many drugs are designed that way ([[medicinal-chemistry/drug-binding]]). It also explains a fact that puzzles students: an enzyme that bound its substrate *too* tightly would be a poor catalyst, because binding energy spent on the ground state raises the barrier from ES rather than lowering it.

::: example The most proficient enzyme {#ex-ts}
For orotidine 5′-phosphate decarboxylase, Radzicka and Wolfenden (*Science*, 1995) measured $k_\mathrm{non} = 2.8\times10^{-16}\ \mathrm{s^{-1}}$ for the uncatalysed reaction at $25\ \mathrm{^\circ C}$ and $k_\mathrm{cat} = 39\ \mathrm{s^{-1}}$ on the enzyme. Calculate the rate enhancement, the corresponding lowering of the activation free energy, and the dissociation constant of the transition state if the substrate is bound with $K_\mathrm{S} \approx 1\ \mu\mathrm{mol\,dm^{-3}}$.
::: solution
The rate enhancement is $39/(2.8\times10^{-16}) = 1.4\times10^{17}$. By [[#eq-ddg]],
$$
\Delta\Delta^\ddagger G = (8.314\ \mathrm{J\,K^{-1}\,mol^{-1}})(298.15\ \mathrm{K})\ln(1.39\times10^{17}) = 97.9\ \mathrm{kJ\,mol^{-1}}.
$$
By [[#eq-ts]], $K_\mathrm{T} = K_\mathrm{S}\,k_\mathrm{non}/k_\mathrm{cat} = (1\times10^{-6})(2.8\times10^{-16})/39 = 7\times10^{-24}\ \mathrm{mol\,dm^{-3}}$. No real ligand is bound that tightly (the strongest known noncovalent complexes have dissociation constants around $10^{-15}\ \mathrm{mol\,dm^{-3}}$), which is a measure of how unusual the transition state's interactions with the enzyme must be. The half-life quoted in the introduction is $\ln 2/k_\mathrm{non} = 2.5\times10^{15}\ \mathrm{s}$, or $78$ million years. The value of $K_\mathrm{S}$ here is an order-of-magnitude assumption; the enhancement and $\Delta\Delta^\ddagger G$ do not depend on it.
:::
:::

## Michaelis–Menten kinetics

### The rate law

Almost every enzyme, studied with its substrate in large excess over the enzyme, shows the same behaviour: the initial rate rises linearly with substrate concentration at first and then levels off to a maximum. The simplest mechanism that gives this is the one Michaelis and Menten used in 1913.

::: proposition The Michaelis–Menten equation {#prop-mm}
For the mechanism
$$
\mathrm{E + S} \underset{k_{-1}}{\overset{k_1}{\rightleftharpoons}} \mathrm{ES} \xrightarrow{\ k_2\ } \mathrm{E + P},
$$
with total enzyme concentration $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}]$, substrate in large excess ($[\mathrm{S}] \gg [\mathrm{E}]_0$, so that $[\mathrm{S}]$ is not depleted by binding), negligible product (initial rates) and $\mathrm{ES}$ in a steady state, the initial rate is
$$
v_0 = \frac{V_\mathrm{max}[\mathrm{S}]}{K_\mathrm{M} + [\mathrm{S}]}, \qquad V_\mathrm{max} = k_2[\mathrm{E}]_0, \qquad K_\mathrm{M} = \frac{k_{-1} + k_2}{k_1}.
$$ {#eq-mm}
:::

::: proof Steady state plus conservation
The steady-state condition sets the rate of formation of $\mathrm{ES}$ equal to its rate of breakdown:
$$
k_1[\mathrm{E}][\mathrm{S}] = (k_{-1} + k_2)[\mathrm{ES}] \quad\Rightarrow\quad [\mathrm{E}] = \frac{K_\mathrm{M}[\mathrm{ES}]}{[\mathrm{S}]}.
$$
Substitute into the conservation law: $[\mathrm{E}]_0 = [\mathrm{ES}](K_\mathrm{M}/[\mathrm{S}] + 1)$, so $[\mathrm{ES}] = [\mathrm{E}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$. The rate of product formation is $v_0 = k_2[\mathrm{ES}]$, which is [[#eq-mm]]. The steady state is reached within milliseconds when $[\mathrm{S}] \gg [\mathrm{E}]_0$, because the pool of $\mathrm{ES}$ is tiny compared with the pool of $\mathrm{S}$ it drains; the full justification is the singular-perturbation argument of [[kinetics/reaction-mechanisms]].
:::

The two limits carry the physics. When $[\mathrm{S}] \ll K_\mathrm{M}$, $v_0 \approx (V_\mathrm{max}/K_\mathrm{M})[\mathrm{S}]$: the reaction is first order in substrate and the enzyme is mostly free, waiting for substrate. When $[\mathrm{S}] \gg K_\mathrm{M}$, $v_0 \approx V_\mathrm{max}$: the reaction is zero order in substrate and the enzyme is saturated, every molecule busy. $K_\mathrm{M}$ is the substrate concentration at which $v_0 = V_\mathrm{max}/2$. For mechanisms with more steps (an acyl-enzyme, product release) the same hyperbola appears with different meanings for the constants, so we name the constants by what they measure rather than by the rate constants of one mechanism.

::: definition Turnover number, Michaelis constant and specificity constant {#def-kcat}
For an enzyme obeying the rate law $v_0 = k_\mathrm{cat}[\mathrm{E}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$:

- the **turnover number** $k_\mathrm{cat} = V_\mathrm{max}/[\mathrm{E}]_0$ is the number of substrate molecules converted per active site per second at saturation (unit $\mathrm{s^{-1}}$); in the two-step mechanism $k_\mathrm{cat} = k_2$;
- the **Michaelis constant** $K_\mathrm{M}$ is the substrate concentration giving half the maximal rate (unit $\mathrm{mol\,dm^{-3}}$);
- the **specificity constant** $k_\mathrm{cat}/K_\mathrm{M}$ is the apparent second-order rate constant for $\mathrm{E + S}$ at low substrate concentration, $v_0 = (k_\mathrm{cat}/K_\mathrm{M})[\mathrm{E}][\mathrm{S}]$ (unit $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$).

$k_\mathrm{cat}$ describes the enzyme–substrate complex; $k_\mathrm{cat}/K_\mathrm{M}$ describes the free enzyme meeting free substrate, and is the measure of catalytic efficiency and of preference between substrates.
:::

Why is $k_\mathrm{cat}/K_\mathrm{M}$ the right measure of specificity? Suppose two substrates A and B compete for the same enzyme. Each is converted at a rate $v = (k_\mathrm{cat}/K_\mathrm{M})[\mathrm{E}][\mathrm{X}]$, with the *same* free-enzyme concentration $[\mathrm{E}]$ in both expressions, so
$$
\frac{v_\mathrm{A}}{v_\mathrm{B}} = \frac{(k_\mathrm{cat}/K_\mathrm{M})_\mathrm{A}[\mathrm{A}]}{(k_\mathrm{cat}/K_\mathrm{M})_\mathrm{B}[\mathrm{B}]}
$$ {#eq-competing}
at *any* substrate concentrations, saturating or not (the derivation is [[#ex-competing-substrates]]). Neither $k_\mathrm{cat}$ nor $K_\mathrm{M}$ alone decides which substrate the enzyme prefers in a mixture; their ratio does.

::: warning $K_\mathrm{M}$ is not, in general, a dissociation constant {#warn-km}
It is tempting to read a small $K_\mathrm{M}$ as "tight binding". That is right only when $k_2 \ll k_{-1}$, so that $\mathrm{E + S \rightleftharpoons ES}$ is at equilibrium and $K_\mathrm{M} \approx k_{-1}/k_1 = K_\mathrm{S}$ (the rapid-equilibrium case Michaelis and Menten themselves assumed). When chemistry is fast compared with dissociation, $K_\mathrm{M} = (k_{-1} + k_2)/k_1$ can be far larger than $K_\mathrm{S}$, and for multi-step mechanisms $K_\mathrm{M}$ can be *smaller* than $K_\mathrm{S}$ (an acyl-enzyme that accumulates pulls the half-saturation point down). Likewise, $V_\mathrm{max}$ is not a property of the enzyme — it scales with how much enzyme you put in the cuvette; $k_\mathrm{cat}$ is the intrinsic quantity. And a high $k_\mathrm{cat}$ is not "efficiency": an enzyme with $k_\mathrm{cat} = 10^4\ \mathrm{s^{-1}}$ but $K_\mathrm{M} = 1\ \mathrm{mol\,dm^{-3}}$ is useless at the micromolar concentrations of a cell.
:::

### Measuring $k_\mathrm{cat}$ and $K_\mathrm{M}$

In an experiment, initial rates are measured at a series of substrate concentrations spanning roughly $0.2K_\mathrm{M}$ to $5K_\mathrm{M}$, and [[#eq-mm]] is fitted to them by non-linear least squares. The double-reciprocal **Lineweaver–Burk** form,
$$
\frac{1}{v_0} = \frac{K_\mathrm{M}}{V_\mathrm{max}}\cdot\frac{1}{[\mathrm{S}]} + \frac{1}{V_\mathrm{max}},
$$ {#eq-lb}
is a straight line of slope $K_\mathrm{M}/V_\mathrm{max}$ and intercepts $1/V_\mathrm{max}$ (on the $1/v_0$ axis) and $-1/K_\mathrm{M}$ (on the $1/[\mathrm{S}]$ axis). It is invaluable for *seeing* inhibition patterns, but poor for *estimating* parameters, because taking reciprocals magnifies the errors of the slowest, least precise rates and gives them the most leverage.

::: example Fitting initial-rate data {#ex-mm-fit}
An enzyme at $[\mathrm{E}]_0 = 10.0\ \mathrm{nmol\,dm^{-3}}$ gives these initial rates:

| $[\mathrm{S}]$ / $\mathrm{mmol\,dm^{-3}}$ | 0.50 | 1.00 | 2.00 | 4.00 | 8.00 |
|---|---|---|---|---|---|
| $v_0$ / $\mu\mathrm{mol\,dm^{-3}\,s^{-1}}$ | 10.3 | 16.2 | 25.4 | 32.9 | 40.6 |

Estimate $V_\mathrm{max}$ and $K_\mathrm{M}$ (a) from a Lineweaver–Burk plot and (b) by non-linear least squares, and hence $k_\mathrm{cat}$ and $k_\mathrm{cat}/K_\mathrm{M}$.
::: solution
(a) The reciprocals are $1/[\mathrm{S}] = 2, 1, 0.5, 0.25, 0.125\ \mathrm{dm^3\,mmol^{-1}}$ and $1/v_0 = 0.0971, 0.0617, 0.0394, 0.0304, 0.0246\ \mathrm{dm^3\,s\,\mu mol^{-1}}$. An unweighted straight-line fit gives slope $0.03872$ and intercept $0.02063$, so $V_\mathrm{max} = 1/0.02063 = 48.5\ \mu\mathrm{mol\,dm^{-3}\,s^{-1}}$ and $K_\mathrm{M} = 0.03872/0.02063 = 1.88\ \mathrm{mmol\,dm^{-3}}$.

(b) Minimising $\sum(v_i - V_\mathrm{max}[\mathrm{S}]_i/(K_\mathrm{M} + [\mathrm{S}]_i))^2$ directly (for example with `scipy.optimize.curve_fit`) gives $V_\mathrm{max} = 50.7\ \mu\mathrm{mol\,dm^{-3}\,s^{-1}}$ and $K_\mathrm{M} = 2.06\ \mathrm{mmol\,dm^{-3}}$. The two methods disagree by about 5 % and 10 %, because the reciprocal plot gives the point at $0.50\ \mathrm{mmol\,dm^{-3}}$ — the smallest and least precise rate — the greatest weight. Use the non-linear values:
$$
k_\mathrm{cat} = \frac{V_\mathrm{max}}{[\mathrm{E}]_0} = \frac{50.7\times10^{-6}\ \mathrm{mol\,dm^{-3}\,s^{-1}}}{10.0\times10^{-9}\ \mathrm{mol\,dm^{-3}}} = 5.07\times10^{3}\ \mathrm{s^{-1}},\qquad \frac{k_\mathrm{cat}}{K_\mathrm{M}} = \frac{5.07\times10^{3}\ \mathrm{s^{-1}}}{2.06\times10^{-3}\ \mathrm{mol\,dm^{-3}}} = 2.5\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}.
$$
With five points, two or at most three significant figures are justified.
:::
:::

::: widget regression
points: 2,0.0971; 1,0.0617; 0.5,0.0394; 0.25,0.0304; 0.125,0.0246
degree: 1
x: 0, 2.2
y: 0, 0.11
caption: The Lineweaver–Burk plot of [[#ex-mm-fit]]: $1/v_0$ (in $\mathrm{dm^3\,s\,\mu mol^{-1}}$) against $1/[\mathrm{S}]$ (in $\mathrm{dm^3\,mmol^{-1}}$). The intercept is $1/V_\mathrm{max}$ and the slope $K_\mathrm{M}/V_\mathrm{max}$. Drag the right-most point — the slowest rate, at the lowest substrate concentration — by a few per cent and watch the intercept, and so $V_\mathrm{max}$, swing; dragging a point near the axis barely matters. This leverage of the least precise data is why parameters should be fitted to the hyperbola itself.
:::

### How fast can an enzyme be?

There is an upper limit to $k_\mathrm{cat}/K_\mathrm{M}$: the enzyme cannot convert substrate faster than substrate arrives. For two spheres diffusing in solution, Smoluchowski's theory gives the encounter rate constant
$$
k_\mathrm{d} = 4\pi N_\mathrm{A}(D_\mathrm{E} + D_\mathrm{S})(r_\mathrm{E} + r_\mathrm{S}),
$$ {#eq-smol}
with $D$ the diffusion coefficients and $r_\mathrm{E} + r_\mathrm{S}$ the distance at which reaction occurs. For an enzyme and a small substrate this is of order $10^{9}$–$10^{10}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$; since only a small patch of the enzyme surface is the active site, and the substrate must arrive in the right orientation, the practical ceiling is about $10^{8}$–$10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. An enzyme that reaches it is said to have achieved **catalytic perfection**: every encounter leads to reaction, and further improvement of the chemistry would not increase the rate.

::: example Which enzymes are diffusion-controlled? {#ex-diffusion}
Using the values below (from Nelson & Cox, *Lehninger Principles of Biochemistry*, 8th ed.), calculate $k_\mathrm{cat}/K_\mathrm{M}$ and decide which enzymes are close to the diffusion limit.

| enzyme | substrate | $k_\mathrm{cat}$ / $\mathrm{s^{-1}}$ | $K_\mathrm{M}$ / $\mathrm{mol\,dm^{-3}}$ |
|---|---|---|---|
| acetylcholinesterase | acetylcholine | $1.4\times10^{4}$ | $9\times10^{-5}$ |
| carbonic anhydrase | $\mathrm{CO_2}$ | $1\times10^{6}$ | $1.2\times10^{-2}$ |
| fumarase | fumarate | $8\times10^{2}$ | $5\times10^{-6}$ |
| triose phosphate isomerase | glyceraldehyde 3-phosphate | $4.3\times10^{3}$ | $1.8\times10^{-5}$ |
::: solution
Dividing: acetylcholinesterase $1.6\times10^{8}$, carbonic anhydrase $8.3\times10^{7}$, fumarase $1.6\times10^{8}$ and triose phosphate isomerase $2.4\times10^{8}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. All four lie within an order of magnitude of $10^{8}$–$10^{9}$, so all are essentially diffusion-controlled, although their turnover numbers span more than three orders of magnitude. The lesson is that perfection can be reached in different ways: carbonic anhydrase turns over a million times a second but binds $\mathrm{CO_2}$ weakly, fumarase turns over slowly but binds fumarate at micromolar concentrations. For triose phosphate isomerase, viscosity experiments (adding sucrose or glycerol to slow diffusion) confirm the conclusion: $k_\mathrm{cat}/K_\mathrm{M}$ falls in proportion to the increased viscosity, the signature of a diffusion-limited step.
:::
:::

## Reversible inhibition

An **inhibitor** is a molecule that reduces the rate of an enzyme-catalysed reaction. **Irreversible** inhibitors form a covalent bond to the enzyme, or bind so tightly that they do not come off on the timescale of the experiment; **reversible** inhibitors bind and dissociate rapidly, and their effect is described by equilibrium constants. Reversible inhibitors are distinguished by which enzyme forms they bind: the free enzyme E, the enzyme–substrate complex ES, or both.

::: proposition Rate law for reversible inhibition {#prop-inhibition}
Let an inhibitor I bind the free enzyme with dissociation constant $K_\mathrm{I}$ ($\mathrm{E + I \rightleftharpoons EI}$) and the enzyme–substrate complex with dissociation constant $K_\mathrm{I}'$ ($\mathrm{ES + I \rightleftharpoons ESI}$), with both complexes catalytically inactive, the inhibitor-binding steps at equilibrium, $\mathrm{ES}$ in a steady state and $[\mathrm{I}]$ not depleted by binding. Define
$$
\alpha = 1 + \frac{[\mathrm{I}]}{K_\mathrm{I}}, \qquad \alpha' = 1 + \frac{[\mathrm{I}]}{K_\mathrm{I}'}.
$$
Then
$$
v_0 = \frac{V_\mathrm{max}[\mathrm{S}]}{\alpha K_\mathrm{M} + \alpha'[\mathrm{S}]}, \qquad\text{so}\qquad V_\mathrm{max}^\mathrm{app} = \frac{V_\mathrm{max}}{\alpha'}, \quad K_\mathrm{M}^\mathrm{app} = \frac{\alpha}{\alpha'}K_\mathrm{M}.
$$ {#eq-mixed}
The special cases are **competitive** inhibition (binds only E: $\alpha' = 1$), **uncompetitive** inhibition (binds only ES: $\alpha = 1$), **pure noncompetitive** inhibition (binds both equally, $K_\mathrm{I} = K_\mathrm{I}'$: $\alpha = \alpha'$) and, in general, **mixed** inhibition ($K_\mathrm{I} \ne K_\mathrm{I}'$).
:::

::: proof Counting the enzyme forms
With the inhibitor equilibria, $[\mathrm{EI}] = [\mathrm{E}][\mathrm{I}]/K_\mathrm{I}$ and $[\mathrm{ESI}] = [\mathrm{ES}][\mathrm{I}]/K_\mathrm{I}'$. The conservation law becomes
$$
[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{EI}] + [\mathrm{ES}] + [\mathrm{ESI}] = \alpha[\mathrm{E}] + \alpha'[\mathrm{ES}].
$$
The steady state of $\mathrm{ES}$ (its formation from $\mathrm{E + S}$ and its loss by dissociation and turnover; the exchange with $\mathrm{ESI}$ is at equilibrium and contributes no net flux) still gives $[\mathrm{E}] = K_\mathrm{M}[\mathrm{ES}]/[\mathrm{S}]$, exactly as in the proof of [[#prop-mm]]. Hence $[\mathrm{E}]_0 = [\mathrm{ES}](\alpha K_\mathrm{M}/[\mathrm{S}] + \alpha')$, and
$$
v_0 = k_\mathrm{cat}[\mathrm{ES}] = \frac{k_\mathrm{cat}[\mathrm{E}]_0[\mathrm{S}]}{\alpha K_\mathrm{M} + \alpha'[\mathrm{S}]}.
$$
Dividing numerator and denominator by $\alpha'$ puts this in Michaelis–Menten form with the apparent constants stated. (If $\mathrm{EI}$ can also bind $\mathrm{S}$, the scheme closes into a box whose four equilibria are linked by detailed balance; under rapid equilibrium the result is unchanged.)
:::

The proposition turns inhibition into a diagnostic. A competitive inhibitor raises $K_\mathrm{M}^\mathrm{app}$ but leaves $V_\mathrm{max}$ alone: at high enough substrate concentration, substrate wins the competition for E. In the Lineweaver–Burk form the slope $\alpha K_\mathrm{M}/V_\mathrm{max}$ increases while the intercept $1/V_\mathrm{max}$ does not, so lines for different $[\mathrm{I}]$ **meet on the $1/v_0$ axis**. An uncompetitive inhibitor lowers $V_\mathrm{max}$ and $K_\mathrm{M}$ by the same factor $\alpha'$ — it binds only the complex, and by Le Chatelier's principle pulls $\mathrm{E + S \rightleftharpoons ES}$ to the right — so the slope is unchanged and the lines are **parallel**. A pure noncompetitive inhibitor lowers $V_\mathrm{max}$ with $K_\mathrm{M}$ unchanged; its lines **meet on the $1/[\mathrm{S}]$ axis** at $-1/K_\mathrm{M}$. Mixed inhibitors give lines meeting to the left of the $1/v_0$ axis, above or below the $1/[\mathrm{S}]$ axis ([[#exr-intersection]]).

::: widget plot
f: x/(1+x); x/(a+b*x)
x: 0, 10
y: 0, 1.1
sliders: a=2:1:5:0.1; b=1:1:5:0.1
labels: \text{no inhibitor}; \text{inhibitor present}
hlines: 1; 0.5
caption: Initial rate $v_0/V_\mathrm{max}$ against $[\mathrm{S}]/K_\mathrm{M}$ (the horizontal axis $x$), without inhibitor and with an inhibitor described by $\alpha$ (slider $a$) and $\alpha'$ (slider $b$), from [[#eq-mixed]]: $v_0/V_\mathrm{max} = x/(\alpha + \alpha' x)$. With $b = 1$ the inhibitor is competitive: the curve is stretched along the axis but still approaches 1. With $a = 1$ it is uncompetitive, and with $a = b$ pure noncompetitive: the plateau drops to $1/\alpha'$. Watch where each curve crosses half its own plateau — that is $K_\mathrm{M}^\mathrm{app} = (\alpha/\alpha')K_\mathrm{M}$.
:::

::: example A competitive inhibitor {#ex-ki}
An enzyme has $K_\mathrm{M} = 2.0\ \mathrm{mmol\,dm^{-3}}$. In the presence of $10\ \mu\mathrm{mol\,dm^{-3}}$ of an inhibitor, fitting gives $K_\mathrm{M}^\mathrm{app} = 5.0\ \mathrm{mmol\,dm^{-3}}$ and an unchanged $V_\mathrm{max}$. Identify the type of inhibition, find $K_\mathrm{I}$, and calculate the fractional rate $v_0/V_\mathrm{max}$ at $[\mathrm{S}] = 2.0\ \mathrm{mmol\,dm^{-3}}$ with and without the inhibitor.
::: solution
An unchanged $V_\mathrm{max}$ with an increased $K_\mathrm{M}$ means $\alpha' = 1$ and $\alpha > 1$: competitive inhibition. Then $\alpha = K_\mathrm{M}^\mathrm{app}/K_\mathrm{M} = 5.0/2.0 = 2.5$, and $\alpha = 1 + [\mathrm{I}]/K_\mathrm{I}$ gives
$$
K_\mathrm{I} = \frac{[\mathrm{I}]}{\alpha - 1} = \frac{10\ \mu\mathrm{mol\,dm^{-3}}}{1.5} = 6.7\ \mu\mathrm{mol\,dm^{-3}}.
$$
Without inhibitor, $v_0/V_\mathrm{max} = 2.0/(2.0 + 2.0) = 0.50$; with it, $2.0/(5.0 + 2.0) = 0.29$. The inhibitor binds about 300 times more tightly than the substrate's $K_\mathrm{M}$ suggests the substrate does, which is typical of a designed inhibitor: a micromolar molecule competing successfully against a millimolar substrate. Note that $K_\mathrm{I}$, unlike $K_\mathrm{M}$, *is* a true dissociation constant, because the inhibitor is not turned over.
:::
:::

In drug discovery, potency is often reported as an $\mathrm{IC_{50}}$, the inhibitor concentration that halves the rate under the conditions of the assay. For a competitive inhibitor, setting $v_0(\mathrm{I}) = v_0(0)/2$ in [[#eq-mixed]] gives the **Cheng–Prusoff relation**
$$
\mathrm{IC_{50}} = K_\mathrm{I}\left(1 + \frac{[\mathrm{S}]}{K_\mathrm{M}}\right),
$$ {#eq-cheng}
so an $\mathrm{IC_{50}}$ depends on the substrate concentration used, and only $K_\mathrm{I}$ can be compared between laboratories. This distinction returns in [[medicinal-chemistry/drug-binding]].

::: quiz
Lineweaver–Burk lines measured at three inhibitor concentrations are parallel to one another. What kind of inhibitor is it, and what does it bind?
- [ ] Competitive; it binds the free enzyme at the active site.
- [x] Uncompetitive; it binds only the enzyme–substrate complex.
- [ ] Pure noncompetitive; it binds E and ES equally.
- [ ] Irreversible; it destroys a fixed fraction of the enzyme.
::: solution
Parallel lines mean the slope $\alpha K_\mathrm{M}/V_\mathrm{max}$ is unchanged, so $\alpha = 1$: the inhibitor does not bind free enzyme. Only the intercept $\alpha'/V_\mathrm{max}$ rises, which requires binding to ES. A competitive inhibitor changes the slope only (lines meet on the $1/v_0$ axis); a pure noncompetitive one changes slope and intercept by the same factor (lines meet on the $1/[\mathrm{S}]$ axis); an irreversible inhibitor lowers the effective $[\mathrm{E}]_0$ and so looks like noncompetitive inhibition, not uncompetitive.
:::
:::

**Irreversible inhibitors** are classified by chemistry rather than by kinetics. Group-specific reagents react with a particular kind of side chain: diisopropyl fluorophosphate (DIFP) phosphorylates one unusually reactive serine in chymotrypsin and inactivates it, the experiment that identified Ser195 as the catalytic residue. Organophosphorus compounds of this class are highly toxic because they inactivate acetylcholinesterase in the same way, preventing the breakdown of the neurotransmitter — a mechanism, not a recipe, and the reason such compounds are tightly regulated. **Mechanism-based** ("suicide") inhibitors are unreactive until the target enzyme begins its own catalytic chemistry on them: penicillin is attacked by the active-site serine of the bacterial transpeptidase that cross-links the cell wall, forming a stable acyl-enzyme that does not hydrolyse. The difference from a reversible inhibitor is visible kinetically: irreversible inhibition increases with time of exposure, and it cannot be relieved by dilution or by excess substrate.

## How enzymes catalyse: the serine proteases

A peptide bond is remarkably stable. Its uncatalysed hydrolysis at pH 7 and $25\ \mathrm{^\circ C}$ has a half-life of several hundred years, because the amide is resonance-stabilised ([[organic-2/carboxylic-derivatives]]): the nitrogen lone pair is delocalised into the carbonyl, making the carbon a poor electrophile and the amide nitrogen a poor leaving group. Chymotrypsin, a digestive enzyme of the small intestine, hydrolyses peptide bonds on the carboxyl side of large hydrophobic residues (Phe, Tyr, Trp) with turnover numbers of tens to hundreds per second. It does so by combining four strategies that recur throughout enzymology:

- **Covalent catalysis**: the reaction is split into two easier steps through a covalent **acyl-enzyme** intermediate, an ester of Ser195.
- **General acid–base catalysis**: His57 removes and returns protons at every step, so that no strongly basic or acidic species ever forms in solution ([[kinetics/homogeneous-catalysis]] distinguishes specific from general catalysis).
- **Transition-state stabilisation**: the **oxyanion hole**, formed by the backbone N–H groups of Gly193 and Ser195, donates two hydrogen bonds to the negatively charged oxygen of each tetrahedral intermediate — and so to the transition states that resemble it — but not as well to the planar substrate carbonyl.
- **Binding, proximity and orientation**: the **S1 pocket** holds the side chain of the residue before the scissile bond, placing that bond exactly next to the nucleophile.

The residues Asp102, His57 and Ser195 (chymotrypsinogen numbering) form the **catalytic triad**: the serine hydroxyl is hydrogen-bonded to $\mathrm{N\varepsilon2}$ of histidine, whose other nitrogen, $\mathrm{N\delta1}$, is hydrogen-bonded to the aspartate carboxylate.

::: algorithm The chymotrypsin mechanism {#algo-serine}
1. **Binding.** The substrate binds with the aromatic side chain of its P1 residue in the hydrophobic S1 pocket. The carbonyl of the scissile peptide bond lies next to Ser195, with its oxygen pointing into the oxyanion hole.
2. **Nucleophilic attack (acylation, first half).** The lone pair on the Ser195 oxygen attacks the carbonyl carbon. As the new O–C bond forms, His57 $\mathrm{N\varepsilon2}$ uses its lone pair to take the serine hydroxyl proton (general base catalysis), and the C=O π electrons move onto the carbonyl oxygen. The product is a **tetrahedral intermediate** bearing an oxyanion, held by two hydrogen bonds in the oxyanion hole; His57 is now an imidazolium ion, its positive charge stabilised by the hydrogen bond to Asp102.
3. **Collapse (acylation, second half).** A lone pair on the oxyanion returns to re-form the C=O π bond; the C–N bond breaks, its electrons going to the nitrogen, which picks up the proton from His57 $\mathrm{N\varepsilon2}$ (general acid catalysis). The amine half of the substrate — the new N-terminal fragment — leaves. What remains is the **acyl-enzyme**, an ester between the substrate's acyl group and Ser195.
4. **Water attacks (deacylation, first half).** A water molecule enters the vacated site. His57, now neutral again, takes a proton from it as its oxygen lone pair attacks the ester carbonyl carbon; the π electrons move onto oxygen, giving a second tetrahedral intermediate, again stabilised in the oxyanion hole.
5. **Collapse and release (deacylation, second half).** The oxyanion re-forms the C=O bond, the C–O bond to Ser195 breaks, and the serine oxygen takes back the proton from His57. The carboxylic acid product leaves, and the enzyme is regenerated in its original protonation state.
:::

The algorithm makes testable predictions, and each has been tested. If an acyl-enzyme forms, the first molecule of product released from the amine (or alcohol) half of the substrate should appear faster than steady-state turnover: this is the **burst** seen with ester substrates such as *p*-nitrophenyl acetate ([[#ex-burst]]). If His57 is the general base, activity should depend on its protonation state, giving a pH-dependence with $\mathrm{p}K_\mathrm{a}$ near 7 ([[#ex-ph]]). If the triad is essential, removing it should be catastrophic, and it is: in the bacterial serine protease subtilisin, replacing the catalytic serine by alanine lowers $k_\mathrm{cat}/K_\mathrm{M}$ about a millionfold (Carter and Wells, 1988), yet the mutant still hydrolyses peptides some thousands of times faster than water alone, because binding and orientation remain.

The **specificity** of a serine protease is set by its S1 pocket, while the triad is the same. Chymotrypsin's pocket is deep and hydrophobic and accepts aromatic side chains. In trypsin the bottom of the pocket carries Asp189, whose carboxylate forms a salt bridge with the positively charged side chain of lysine or arginine, so trypsin cleaves after Lys and Arg. In elastase, valine and threonine side chains (Val216, Thr226) partly fill the pocket, and only small residues such as alanine fit. The same catalytic machinery appears, by **convergent evolution**, in subtilisin, whose overall fold is unrelated to chymotrypsin's: chemistry found the same solution twice.

::: example Counting active sites with a burst {#ex-burst}
Chymotrypsin at a nominal concentration of $6.0\ \mu\mathrm{mol\,dm^{-3}}$ (from its absorbance at $280\ \mathrm{nm}$) is mixed with excess *p*-nitrophenyl acetate in a $1.00\ \mathrm{cm}$ cell, and the release of *p*-nitrophenolate is followed at $400\ \mathrm{nm}$ ($\varepsilon = 1.8\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}}$ under the conditions used). The absorbance rises rapidly by $0.090$ and then increases linearly at $0.030$ per minute. Explain the shape and find the concentration of active enzyme and the steady-state turnover number.
::: solution
Acylation (steps 2–3 of [[#algo-serine]]) releases *p*-nitrophenolate fast; deacylation (steps 4–5) regenerates the enzyme slowly. In the first moments every active site acylates once, releasing one *p*-nitrophenolate each — the burst — and thereafter phenolate appears only as fast as the slow deacylation frees enzyme. Extrapolating the linear phase back to zero time gives the burst amplitude, which (when acylation is much faster than deacylation) equals the concentration of active sites:
$$
[\mathrm{E}]_\mathrm{active} = \frac{\Delta A}{\varepsilon l} = \frac{0.090}{(1.8\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,cm^{-1}})(1.00\ \mathrm{cm})} = 5.0\ \mu\mathrm{mol\,dm^{-3}},
$$
so $5.0/6.0 = 83\ \%$ of the protein is active. The steady-state rate is $0.030/(1.8\times10^{4}) = 1.67\ \mu\mathrm{mol\,dm^{-3}\,min^{-1}}$, and dividing by the active-site concentration, $k_\mathrm{cat} = 0.33\ \mathrm{min^{-1}} = 5.6\times10^{-3}\ \mathrm{s^{-1}}$. This small value is the deacylation rate constant of acetyl-chymotrypsin: an acetyl group does not occupy the S1 pocket, so it is a poor substrate, which is exactly what makes it useful for titrating active sites. Hartley and Kilby's observation of this burst in 1954 was the first kinetic evidence for the acyl-enzyme.
:::
:::

### Other catalytic strategies

The serine proteases show most of the strategies, but not all. **Metal-ion catalysis** is the third great class. In carbonic anhydrase a $\mathrm{Zn^{2+}}$ ion, held by three histidines, binds a water molecule and lowers its $\mathrm{p}K_\mathrm{a}$ from about 15.7 (for water in water) to about 7, so that a zinc-bound hydroxide — a strong nucleophile — is present at neutral pH; it attacks $\mathrm{CO_2}$ to give bicarbonate. Proton transfer from the zinc-bound water to the solvent, relayed by a histidine shuttle, is the rate-limiting step that sets $k_\mathrm{cat} \approx 10^{6}\ \mathrm{s^{-1}}$. Metal ions also hold substrates in position and shield negative charge: almost every enzyme that uses ATP needs $\mathrm{Mg^{2+}}$, which binds the phosphate oxygens ([[biochemistry/bioenergetics]]). **Covalent catalysis** with coenzymes extends the chemistry available to side chains: pyridoxal phosphate forms imines with amino acids, thiamine pyrophosphate forms a carbanion that attacks carbonyls, and lysine side chains form Schiff bases in aldolase ([[biochemistry/glycolysis-citric-acid#ex-aldolase]]). **Proximity and orientation** — holding two reactants together in the right geometry — can be worth factors of $10^{5}$ or more, as intramolecular model reactions in physical organic chemistry show.

## The effect of pH

Most enzymes are active in a limited range of pH, and the shape of the pH–rate profile reveals which ionisable groups take part in catalysis. Suppose the enzyme (or the ES complex) exists in three protonation states, $\mathrm{EH_2 \rightleftharpoons EH + H^+}$ with acid dissociation constant $K_1$ and $\mathrm{EH \rightleftharpoons E + H^+}$ with $K_2$, and that only the singly protonated form EH is active. With $[\mathrm{EH_2}] = [\mathrm{EH}][\mathrm{H^+}]/K_1$ and $[\mathrm{E}] = [\mathrm{EH}]K_2/[\mathrm{H^+}]$, the fraction of enzyme in the active form is
$$
f_\mathrm{EH} = \frac{1}{1 + [\mathrm{H^+}]/K_1 + K_2/[\mathrm{H^+}]} = \frac{1}{1 + 10^{\mathrm{p}K_1 - \mathrm{pH}} + 10^{\mathrm{pH} - \mathrm{p}K_2}},
$$ {#eq-ph}
and the rate constant follows it: $k_\mathrm{obs} = k_\mathrm{max}f_\mathrm{EH}$. This is the Henderson–Hasselbalch logic of [[biochemistry/water-noncovalent#prop-hh]] applied twice. The result is a bell-shaped curve whose two sides have inflection points at $\mathrm{p}K_1$ and $\mathrm{p}K_2$ when these are well separated. A pH profile of $k_\mathrm{cat}/K_\mathrm{M}$ reports ionisations of the free enzyme and free substrate; a profile of $k_\mathrm{cat}$ reports ionisations in the ES complex.

::: widget plot
f: 1/(1+10^(p-x)+10^(x-q))
x: 4, 12
y: 0, 1.05
sliders: p=6.8:4:9:0.1; q=9.0:7:11:0.1
labels: f_\mathrm{EH}
hlines: 0.5
caption: The fraction of enzyme in the active protonation state, $f_\mathrm{EH}$, against pH (horizontal axis), from [[#eq-ph]], with $\mathrm{p}K_1$ (slider $p$) and $\mathrm{p}K_2$ (slider $q$). The starting values, 6.8 and 9.0, are typical of chymotrypsin's $k_\mathrm{cat}/K_\mathrm{M}$ profile (His57 on the acid side, the Ile16 α-amino group on the basic side). Move the two $\mathrm{p}K$ values closer together: the maximum falls below 1 and the apparent inflection points no longer coincide with the true $\mathrm{p}K$ values — a reason pH profiles must be fitted, not read by eye.
:::

::: example The pH profile of chymotrypsin {#ex-ph}
The $k_\mathrm{cat}/K_\mathrm{M}$ profile of chymotrypsin is fitted by [[#eq-ph]] with $\mathrm{p}K_1 = 6.8$ (His57 must be neutral to act as a general base) and $\mathrm{p}K_2 = 9.0$ (the α-amino group of Ile16 must be protonated to form the salt bridge with Asp194 that holds the active conformation). Calculate the fraction of maximal activity at pH 7.4, find the optimum pH, and give the fraction there.
::: solution
At pH 7.4: $10^{6.8 - 7.4} = 10^{-0.6} = 0.251$ and $10^{7.4 - 9.0} = 10^{-1.6} = 0.0251$, so $f_\mathrm{EH} = 1/(1 + 0.251 + 0.0251) = 0.78$. The function is maximal where $10^{\mathrm{p}K_1 - \mathrm{pH}} + 10^{\mathrm{pH} - \mathrm{p}K_2}$ is smallest; setting its derivative with respect to pH to zero gives $10^{\mathrm{p}K_1 - \mathrm{pH}} = 10^{\mathrm{pH} - \mathrm{p}K_2}$, so $\mathrm{pH_{opt}} = (\mathrm{p}K_1 + \mathrm{p}K_2)/2 = 7.9$. There both terms equal $10^{-1.1} = 0.0794$ and $f_\mathrm{EH} = 1/1.159 = 0.86$. Even at the optimum, 14 % of the enzyme is in an inactive protonation state, because the two $\mathrm{p}K$ values are only 2.2 units apart. The digestive environment of the small intestine, near pH 7–8, sits close to this optimum.
:::
:::

## Regulating enzymes

A cell does not want every enzyme at full activity all the time. Pathways must be switched on and off in response to need, and the switches are of four main kinds, each operating on a different timescale.

**Allosteric control** (milliseconds). Many enzymes at the start of a pathway are oligomers that bind regulatory molecules at sites distinct from the active site, and switch between less active and more active conformations. Their rate curves are sigmoidal, not hyperbolic, and the Michaelis–Menten equation does not apply; the concerted model of [[biochemistry/protein-function#prop-mwc]], developed for haemoglobin, describes them. The classic example is aspartate transcarbamoylase (ATCase), which catalyses the first committed step of pyrimidine synthesis: it is inhibited by CTP, an end product of the pathway (**feedback inhibition**), and activated by ATP, a signal that purines are plentiful and energy is available. Feedback inhibition is the reason metabolic pathways are regulated at their committed steps, the theme of [[biochemistry/glycolysis-citric-acid#def-control]].

**Reversible covalent modification** (seconds to minutes). Protein kinases transfer the γ-phosphoryl group of ATP to serine, threonine or tyrosine side chains, and phosphatases remove it. The added dianionic phosphate can form new salt bridges and hydrogen bonds and change the enzyme's conformation. Glycogen phosphorylase, the enzyme that mobilises glucose from glycogen, is switched from a less active *b* form to a more active *a* form by phosphorylation of a single serine in response to hormonal signals — a discovery that opened the field of signalling by phosphorylation.

**Proteolytic activation** (irreversible). Digestive proteases are made as inactive precursors, **zymogens**, so that they do not digest the cells that make them. Chymotrypsinogen is activated when trypsin cleaves the bond between Arg15 and Ile16. The new N-terminal α-amino group of Ile16 turns inwards and forms a salt bridge with Asp194, which moves the backbone to create the oxyanion hole and the S1 pocket: a single cut rebuilds the active site, and explains the basic limb of the pH profile in [[#ex-ph]]. Trypsinogen itself is activated in the intestine by enteropeptidase, and trypsin then activates more trypsinogen and the other zymogens, a small cascade. Blood clotting is a longer cascade of the same kind.

**Control of enzyme amount** (hours). Gene expression and protein degradation set $[\mathrm{E}]_0$, and so $V_\mathrm{max}$; **isozymes** — different proteins that catalyse the same reaction with different $K_\mathrm{M}$ values and regulatory properties — allow different tissues to tune the same step. Hexokinase in muscle and glucokinase in liver, which phosphorylate glucose with very different $K_\mathrm{M}$ values, are the example taken up with glycolysis.

::: history
Enzymes were identified as substances long before anyone knew what they were. Anselme Payen and Jean-François Persoz concentrated "diastase", the starch-digesting activity of malt, in 1833, and Eduard Buchner's cell-free fermentation of 1897 showed that enzymes work outside the cell. Emil Fischer proposed the lock-and-key picture of specificity in 1894, from the way yeast enzymes distinguish stereoisomeric sugars. Victor Henri proposed an enzyme–substrate complex to explain saturation in 1902; Leonor Michaelis and Maud Menten measured initial rates of sucrose hydrolysis by invertase at controlled pH in 1913 and gave the rate law its standard form, and George Briggs and J. B. S. Haldane replaced their equilibrium assumption by the steady state in 1925. Whether enzymes were proteins was settled when James Sumner crystallised urease in 1926 and John Northrop crystallised pepsin, trypsin and chymotrypsin in the following years; Sumner and Northrop shared the 1946 Nobel Prize in Chemistry. Hans Lineweaver and Dean Burk published their double-reciprocal plot in 1934. Linus Pauling suggested in 1946 that enzymes are complementary to transition states, and Daniel Koshland proposed induced fit in 1958. Brian Hartley and B. A. Kilby saw the burst with chymotrypsin in 1954; the first enzyme structure, hen egg-white lysozyme, was solved by David Phillips's group in 1965, and David Blow's group described the catalytic triad of chymotrypsin in 1969. Annette Radzicka and Richard Wolfenden's 1995 measurement of the uncatalysed decarboxylation of orotidine 5′-phosphate put a number on enzyme proficiency.
:::

## Where this leads

The kinetics of this chapter is the tool used in every later chapter of the course. The regulated steps of glycolysis, gluconeogenesis and the citric acid cycle in [[biochemistry/glycolysis-citric-acid]] are allosteric and covalently modified enzymes operating far from equilibrium, and the coenzyme chemistry glimpsed here — NAD⁺, FAD, thiamine pyrophosphate, coenzyme A — is the subject of [[biochemistry/bioenergetics]] and [[biochemistry/lipid-nitrogen-metabolism]]. The inhibition theory of [[#prop-inhibition]], with its distinction between $K_\mathrm{I}$ and $\mathrm{IC_{50}}$, is the starting point of [[medicinal-chemistry/drug-targets]] and [[medicinal-chemistry/drug-binding]], where most small-molecule drugs turn out to be enzyme inhibitors, many of them transition-state analogues. The general theory of catalytic cycles and acid–base catalysis is in [[kinetics/homogeneous-catalysis]], transition-state theory and its free-energy relationships in [[kinetics/transition-state-theory]], and the curly-arrow chemistry of acyl transfer that underlies the serine-protease mechanism in [[organic-2/carboxylic-derivatives]].

::: summary
- An enzyme lowers the activation free energy but does not change the equilibrium constant; each factor of ten in rate is worth $RT\ln 10 = 5.7\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm{K}$, and the rate enhancement equals the ratio $K_\mathrm{S}/K_\mathrm{T}$ of substrate to transition-state dissociation constants.
- Under steady-state conditions with substrate in excess, $v_0 = k_\mathrm{cat}[\mathrm{E}]_0[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}])$: first order in $[\mathrm{S}]$ below $K_\mathrm{M}$, zero order above.
- $k_\mathrm{cat}$ is the turnover number of the saturated enzyme; $k_\mathrm{cat}/K_\mathrm{M}$ is the second-order constant for free enzyme meeting substrate, the true measure of efficiency and specificity, capped by diffusion at about $10^{8}$–$10^{9}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$.
- $K_\mathrm{M}$ equals the substrate dissociation constant only in the rapid-equilibrium limit; parameters should be fitted to the hyperbola, with the Lineweaver–Burk plot used for diagnosis.
- Reversible inhibitors obey $v_0 = V_\mathrm{max}[\mathrm{S}]/(\alpha K_\mathrm{M} + \alpha'[\mathrm{S}])$: competitive inhibitors raise $K_\mathrm{M}^\mathrm{app}$, uncompetitive ones lower $V_\mathrm{max}$ and $K_\mathrm{M}$ together, mixed ones do both; $\mathrm{IC_{50}} = K_\mathrm{I}(1 + [\mathrm{S}]/K_\mathrm{M})$ for a competitive inhibitor.
- Serine proteases combine covalent catalysis (acyl-enzyme), general acid–base catalysis (the Asp–His–Ser triad), transition-state stabilisation (the oxyanion hole) and binding (the S1 pocket, which sets specificity).
- Bell-shaped pH profiles reveal catalytic ionisations; enzymes are regulated allosterically, by covalent modification, by proteolytic activation of zymogens and by control of their amount.
:::

## Exercises

::: exercise A Michaelis–Menten rate {level=1 check="90"}
An enzyme has $V_\mathrm{max} = 120\ \mu\mathrm{mol\,dm^{-3}\,min^{-1}}$ and $K_\mathrm{M} = 0.50\ \mathrm{mmol\,dm^{-3}}$. What is the initial rate at $[\mathrm{S}] = 1.50\ \mathrm{mmol\,dm^{-3}}$, and what fraction of the enzyme is in the ES complex? (Enter the rate in $\mu\mathrm{mol\,dm^{-3}\,min^{-1}}$.)
::: solution
$v_0 = V_\mathrm{max}[\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}]) = 120 \times 1.50/(0.50 + 1.50) = 90\ \mu\mathrm{mol\,dm^{-3}\,min^{-1}}$. The fraction of enzyme as ES is $v_0/V_\mathrm{max} = [\mathrm{S}]/(K_\mathrm{M} + [\mathrm{S}]) = 0.75$. At three times $K_\mathrm{M}$ the enzyme is three-quarters saturated; reaching 99 % saturation would need $[\mathrm{S}] = 99K_\mathrm{M}$, which is why "$V_\mathrm{max}$" is always an extrapolation.
:::
:::

::: exercise Turnover number and efficiency {level=1 check="2000"}
A preparation containing $20\ \mathrm{nmol\,dm^{-3}}$ of active sites has $V_\mathrm{max} = 4.0\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ and $K_\mathrm{M} = 0.25\ \mathrm{mmol\,dm^{-3}}$. Calculate $k_\mathrm{cat}$ and $k_\mathrm{cat}/K_\mathrm{M}$, and comment on whether the enzyme is near the diffusion limit. (Enter $k_\mathrm{cat}$ in $\mathrm{s^{-1}}$.)
::: solution
$k_\mathrm{cat} = V_\mathrm{max}/[\mathrm{E}]_0 = 4.0\times10^{-5}/(20\times10^{-9}) = 2.0\times10^{3}\ \mathrm{s^{-1}}$. Then $k_\mathrm{cat}/K_\mathrm{M} = 2.0\times10^{3}/(2.5\times10^{-4}) = 8.0\times10^{6}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$, one to two orders of magnitude below the diffusion ceiling of $10^{8}$–$10^{9}$: a good enzyme, but one whose chemistry (or a conformational step), not encounter, still limits its efficiency.
:::
:::

::: exercise Reading inhibition from parameters {level=1}
For each inhibitor, state the type of reversible inhibition and which enzyme forms it binds. (a) $V_\mathrm{max}$ unchanged, $K_\mathrm{M}^\mathrm{app}$ tripled. (b) $V_\mathrm{max}$ and $K_\mathrm{M}^\mathrm{app}$ both halved. (c) $V_\mathrm{max}$ halved, $K_\mathrm{M}$ unchanged. (d) $V_\mathrm{max}$ halved, $K_\mathrm{M}^\mathrm{app}$ doubled.
::: solution
Use $V_\mathrm{max}^\mathrm{app} = V_\mathrm{max}/\alpha'$ and $K_\mathrm{M}^\mathrm{app} = (\alpha/\alpha')K_\mathrm{M}$ from [[#prop-inhibition]]. (a) $\alpha' = 1$, $\alpha = 3$: competitive, binds only free E. (b) $\alpha' = 2$, $\alpha/\alpha' = 1/2$ so $\alpha = 1$: uncompetitive, binds only ES. (c) $\alpha' = 2$ and $\alpha/\alpha' = 1$, so $\alpha = 2$: pure noncompetitive, binds E and ES equally ($K_\mathrm{I} = K_\mathrm{I}'$). (d) $\alpha' = 2$ and $\alpha = 4$: mixed, binding free E more tightly than ES ($K_\mathrm{I} = [\mathrm{I}]/3$, $K_\mathrm{I}' = [\mathrm{I}]$).
:::
:::

::: exercise Two substrates, one enzyme {level=2 check="40"}
A protease cleaves two peptides A and B with $k_\mathrm{cat}/K_\mathrm{M} = 2.0\times10^{6}$ and $5.0\times10^{4}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ respectively. If both are present at the same concentration, by what factor is A cleaved faster than B? Show that the answer does not depend on whether the enzyme is saturated. (Enter the ratio $v_\mathrm{A}/v_\mathrm{B}$.)
::: hint
Write the steady-state rates of both reactions in terms of the concentration of *free* enzyme, which is the same for both.
:::
::: solution {#ex-competing-substrates}
For each substrate the steady state gives $[\mathrm{EX}] = [\mathrm{E}][\mathrm{X}]/K_\mathrm{M,X}$, so $v_\mathrm{X} = k_\mathrm{cat,X}[\mathrm{EX}] = (k_\mathrm{cat}/K_\mathrm{M})_\mathrm{X}[\mathrm{E}][\mathrm{X}]$. The conservation law $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{EA}] + [\mathrm{EB}]$ determines $[\mathrm{E}]$, but whatever its value, it is common to both rates and cancels in the ratio, giving [[#eq-competing]]: $v_\mathrm{A}/v_\mathrm{B} = (2.0\times10^{6})/(5.0\times10^{4}) = 40$ at equal concentrations. Saturation lowers $[\mathrm{E}]$ and so both rates, but not their ratio. This is why $k_\mathrm{cat}/K_\mathrm{M}$, and not $k_\mathrm{cat}$ or $K_\mathrm{M}$ alone, is called the specificity constant.
:::
:::

::: exercise From IC₅₀ to Kᵢ {level=2 check="1"}
A competitive inhibitor gives $\mathrm{IC_{50}} = 3.0\ \mu\mathrm{mol\,dm^{-3}}$ in an assay run at $[\mathrm{S}] = 2K_\mathrm{M}$. Derive the Cheng–Prusoff relation [[#eq-cheng]] from [[#eq-mixed]] and calculate $K_\mathrm{I}$. What $\mathrm{IC_{50}}$ would a laboratory running the assay at $[\mathrm{S}] = 10K_\mathrm{M}$ report? (Enter $K_\mathrm{I}$ in $\mu\mathrm{mol\,dm^{-3}}$.)
::: solution
For competitive inhibition $v_0 = V_\mathrm{max}[\mathrm{S}]/(\alpha K_\mathrm{M} + [\mathrm{S}])$. Halving the uninhibited rate requires $\alpha K_\mathrm{M} + [\mathrm{S}] = 2(K_\mathrm{M} + [\mathrm{S}])$, so $(\alpha - 1)K_\mathrm{M} = K_\mathrm{M} + [\mathrm{S}]$, i.e. $[\mathrm{I}]/K_\mathrm{I} = 1 + [\mathrm{S}]/K_\mathrm{M}$, and the $[\mathrm{I}]$ that does this is $\mathrm{IC_{50}} = K_\mathrm{I}(1 + [\mathrm{S}]/K_\mathrm{M})$. Here $K_\mathrm{I} = 3.0/(1 + 2) = 1.0\ \mu\mathrm{mol\,dm^{-3}}$. At $[\mathrm{S}] = 10K_\mathrm{M}$ the same inhibitor gives $\mathrm{IC_{50}} = 1.0 \times 11 = 11\ \mu\mathrm{mol\,dm^{-3}}$ — an apparently weaker compound that is in fact identical.
:::
:::

::: exercise Activity on the acid side {level=2 check="0.137"}
Using [[#eq-ph]] with $\mathrm{p}K_1 = 6.8$ and $\mathrm{p}K_2 = 9.0$, calculate the fraction of chymotrypsin in the active protonation state at pH 6.0. Which residue is responsible for the loss of activity? (Enter the fraction to three significant figures.)
::: solution
$10^{6.8 - 6.0} = 10^{0.8} = 6.31$ and $10^{6.0 - 9.0} = 0.001$, so $f_\mathrm{EH} = 1/(1 + 6.31 + 0.001) = 0.137$. The loss is due to protonation of His57 ($\mathrm{p}K_\mathrm{a} \approx 6.8$): as an imidazolium ion it can no longer accept the serine hydroxyl proton in step 2 of [[#algo-serine]], so it cannot act as a general base.
:::
:::

::: exercise The Smoluchowski limit {level=2 check="1.66"}
Estimate the diffusion-controlled encounter rate constant [[#eq-smol]] for an enzyme ($D_\mathrm{E} = 1.0\times10^{-10}\ \mathrm{m^2\,s^{-1}}$) and a small substrate ($D_\mathrm{S} = 1.0\times10^{-9}\ \mathrm{m^2\,s^{-1}}$) that react on contact at a separation of $2.0\ \mathrm{nm}$. Why are observed $k_\mathrm{cat}/K_\mathrm{M}$ values of perfect enzymes about ten to a hundred times smaller? (Enter $k_\mathrm{d}$ in units of $10^{10}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$.)
::: solution
$k_\mathrm{d} = 4\pi(6.022\times10^{23}\ \mathrm{mol^{-1}})(1.1\times10^{-9}\ \mathrm{m^2\,s^{-1}})(2.0\times10^{-9}\ \mathrm{m}) = 1.66\times10^{7}\ \mathrm{m^3\,mol^{-1}\,s^{-1}}$; multiplying by $10^{3}\ \mathrm{dm^3\,m^{-3}}$ gives $1.66\times10^{10}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$. The formula assumes the whole surface of both spheres is reactive in every orientation. In reality the active site is a small fraction of the enzyme surface and the substrate must arrive in a particular orientation, which lowers the effective rate by one to two orders of magnitude; electrostatic steering (as in superoxide dismutase and acetylcholinesterase) can partly win this back.
:::
:::

::: exercise Where mixed-inhibition lines cross {level=3 #exr-intersection}
For a mixed inhibitor obeying [[#eq-mixed]], show that the Lineweaver–Burk lines with and without inhibitor intersect at
$$
\frac{1}{[\mathrm{S}]} = -\frac{K_\mathrm{I}}{K_\mathrm{I}'}\cdot\frac{1}{K_\mathrm{M}}, \qquad \frac{1}{v_0} = \frac{1}{V_\mathrm{max}}\left(1 - \frac{K_\mathrm{I}}{K_\mathrm{I}'}\right),
$$
independent of $[\mathrm{I}]$. Deduce where the lines cross for competitive, pure noncompetitive and mixed inhibitors with $K_\mathrm{I} < K_\mathrm{I}'$, and explain why uncompetitive lines never cross.
::: hint
Write $1/v_0 = (\alpha K_\mathrm{M}/V_\mathrm{max})x + \alpha'/V_\mathrm{max}$ with $x = 1/[\mathrm{S}]$, set the expressions for $\alpha, \alpha'$ and for $\alpha = \alpha' = 1$ equal, and use $(\alpha - 1)/(\alpha' - 1) = K_\mathrm{I}'/K_\mathrm{I}$.
:::
::: solution
With $x = 1/[\mathrm{S}]$, the inhibited line is $y = (\alpha K_\mathrm{M}x + \alpha')/V_\mathrm{max}$ and the uninhibited one $y = (K_\mathrm{M}x + 1)/V_\mathrm{max}$. Equating, $(\alpha - 1)K_\mathrm{M}x = -(\alpha' - 1)$. Since $\alpha - 1 = [\mathrm{I}]/K_\mathrm{I}$ and $\alpha' - 1 = [\mathrm{I}]/K_\mathrm{I}'$, the inhibitor concentration cancels:
$$
x = -\frac{\alpha' - 1}{(\alpha - 1)K_\mathrm{M}} = -\frac{K_\mathrm{I}}{K_\mathrm{I}'K_\mathrm{M}}, \qquad y = \frac{K_\mathrm{M}x + 1}{V_\mathrm{max}} = \frac{1}{V_\mathrm{max}}\left(1 - \frac{K_\mathrm{I}}{K_\mathrm{I}'}\right).
$$
Because the point does not depend on $[\mathrm{I}]$, all lines in a family share it. Competitive: $K_\mathrm{I}' \to \infty$, so $x \to 0$ and $y = 1/V_\mathrm{max}$ — the lines meet on the $1/v_0$ axis. Pure noncompetitive: $K_\mathrm{I} = K_\mathrm{I}'$, so $x = -1/K_\mathrm{M}$ and $y = 0$ — they meet on the $1/[\mathrm{S}]$ axis. Mixed with $K_\mathrm{I} < K_\mathrm{I}'$ (preferential binding to E): $-1/K_\mathrm{M} < x < 0$ and $y > 0$ — they meet in the second quadrant, above the $1/[\mathrm{S}]$ axis; with $K_\mathrm{I} > K_\mathrm{I}'$ they meet below it. Uncompetitive: $\alpha = 1$, so the slope $K_\mathrm{M}/V_\mathrm{max}$ is the same for all $[\mathrm{I}]$ (formally $K_\mathrm{I} \to \infty$ sends the intersection to infinity): parallel lines.
:::
:::

::: exercise Transition-state affinity {level=3 check="62.8"}
An enzyme has $k_\mathrm{cat} = 1.0\times10^{3}\ \mathrm{s^{-1}}$ and $K_\mathrm{M} = 0.10\ \mathrm{mmol\,dm^{-3}}$ for a reaction whose uncatalysed rate constant is $1.0\times10^{-8}\ \mathrm{s^{-1}}$ at $298.15\ \mathrm{K}$. (a) By how much does the enzyme lower the activation free energy? (b) Assuming $K_\mathrm{M} \approx K_\mathrm{S}$, estimate the dissociation constant of the enzyme–transition-state complex. (c) A transition-state analogue that captured 50 % of the enzyme's transition-state binding free energy would have what dissociation constant? (Enter the answer to (a) in $\mathrm{kJ\,mol^{-1}}$.)
::: hint
Use [[#eq-ddg]] and [[#eq-ts]]; for (c), "50 % of the binding free energy" means $\Delta G_\mathrm{bind} = \tfrac12 RT\ln K_\mathrm{T}$, i.e. the square root of $K_\mathrm{T}$ in units of $\mathrm{mol\,dm^{-3}}$.
:::
::: solution
(a) $k_\mathrm{cat}/k_\mathrm{non} = 1.0\times10^{11}$, so $\Delta\Delta^\ddagger G = (8.314)(298.15)\ln(10^{11}) = 62.8\ \mathrm{kJ\,mol^{-1}}$ (that is, $11 \times 5.71$). (b) $K_\mathrm{T} = K_\mathrm{S}k_\mathrm{non}/k_\mathrm{cat} = (1.0\times10^{-4})(1.0\times10^{-8})/(1.0\times10^{3}) = 1.0\times10^{-15}\ \mathrm{mol\,dm^{-3}}$, a binding free energy of $RT\ln K_\mathrm{T} = -85.6\ \mathrm{kJ\,mol^{-1}}$. (c) Half of that, $-42.8\ \mathrm{kJ\,mol^{-1}}$, corresponds to $K = \sqrt{10^{-15}} = 3.2\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ — a $30\ \mathrm{nmol\,dm^{-3}}$ inhibitor, about 3000 times tighter than the substrate. Real transition-state analogues capture only part of the transition-state interactions, yet that part is often enough to make a potent inhibitor.
:::
:::

::: exercise Kinetics of an acyl-enzyme mechanism {level=3}
For the scheme $\mathrm{E + S \rightleftharpoons ES} \xrightarrow{k_2} \mathrm{EA + P_1}$, $\mathrm{EA} \xrightarrow{k_3} \mathrm{E + P_2}$ (EA the acyl-enzyme, P₁ the amine or alcohol, P₂ the acid), with $K_\mathrm{S} = [\mathrm{E}][\mathrm{S}]/[\mathrm{ES}]$ at equilibrium and EA in a steady state, show that the steady-state rate has Michaelis–Menten form with
$$
k_\mathrm{cat} = \frac{k_2k_3}{k_2 + k_3}, \qquad K_\mathrm{M} = K_\mathrm{S}\frac{k_3}{k_2 + k_3}.
$$
Explain why, for an ester substrate with $k_2 \gg k_3$, $k_\mathrm{cat} \approx k_3$, most of the enzyme is present as acyl-enzyme at saturation, $K_\mathrm{M}$ is much smaller than $K_\mathrm{S}$, and a burst is observed.
::: hint
Write $[\mathrm{ES}] = [\mathrm{E}][\mathrm{S}]/K_\mathrm{S}$ and $k_2[\mathrm{ES}] = k_3[\mathrm{EA}]$, then use $[\mathrm{E}]_0 = [\mathrm{E}] + [\mathrm{ES}] + [\mathrm{EA}]$; the rate is $v = k_3[\mathrm{EA}] = k_2[\mathrm{ES}]$.
:::
::: solution
From the steady state of EA, $[\mathrm{EA}] = (k_2/k_3)[\mathrm{ES}]$, and from the binding equilibrium, $[\mathrm{E}] = K_\mathrm{S}[\mathrm{ES}]/[\mathrm{S}]$. Then
$$
[\mathrm{E}]_0 = [\mathrm{ES}]\left(\frac{K_\mathrm{S}}{[\mathrm{S}]} + 1 + \frac{k_2}{k_3}\right) = [\mathrm{ES}]\,\frac{k_2 + k_3}{k_3}\left(\frac{K_\mathrm{S}k_3}{(k_2 + k_3)[\mathrm{S}]} + 1\right).
$$
So $v = k_2[\mathrm{ES}] = \dfrac{k_2k_3}{k_2 + k_3}\cdot\dfrac{[\mathrm{E}]_0[\mathrm{S}]}{K_\mathrm{S}k_3/(k_2 + k_3) + [\mathrm{S}]}$, which is Michaelis–Menten form with the stated $k_\mathrm{cat}$ and $K_\mathrm{M}$. If $k_2 \gg k_3$: $k_\mathrm{cat} \to k_3$ (deacylation limits turnover); at saturation $[\mathrm{EA}]/[\mathrm{ES}] = k_2/k_3 \gg 1$, so the enzyme piles up as acyl-enzyme; $K_\mathrm{M} = K_\mathrm{S}k_3/(k_2 + k_3) \ll K_\mathrm{S}$, because the accumulating EA drains enzyme from the binding equilibrium and so half-saturates the enzyme at a lower substrate concentration (the case flagged in [[#warn-km]]). On mixing, each active site acylates once at the fast rate $k_2$, releasing one $\mathrm{P_1}$ per site before the slow deacylation lets turnover begin: the burst of [[#ex-burst]], whose amplitude approaches $[\mathrm{E}]_0$ in this limit. With amide substrates acylation is usually rate-limiting ($k_2 \ll k_3$), $k_\mathrm{cat} \approx k_2$, and no burst is seen.
:::
:::
