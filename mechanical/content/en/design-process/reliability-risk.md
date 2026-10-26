A design that meets every performance requirement on the test bench can still be a bad design if it fails too often in service or if, when it fails, it hurts someone. **Reliability engineering** asks how likely a product is to perform its function for a stated time under stated conditions, and how that likelihood can be predicted, measured and improved. **Risk and safety engineering** asks what harm the product could cause, how likely and how severe that harm is, and how the design can remove or reduce it. Both deal with uncertainty, both are most effective when applied during embodiment design rather than after the first field failures, and both use a small set of well-established tools.

This chapter develops the probabilistic description of life — the reliability function, the hazard rate and the bathtub curve — and the two life distributions used most in mechanical design, the exponential and the Weibull, with rolling-bearing life as the standard application. It then combines components into systems with reliability block diagrams, including redundancy and common-cause failure, and introduces availability. The second half covers the qualitative and semi-quantitative tools of risk: **failure mode and effects analysis** (FMEA), **fault tree analysis** (FTA), risk matrices, and the order of risk-reduction measures in ISO 12100. Probability itself is in Maths Atlas ([probability](/learn/maths/course.php?c=probability)); the stress and fatigue analyses that predict when an individual part fails are in [[mechanics-of-materials]] and [[machine-design]].

## Describing life: reliability and hazard {#sec-reliability}

Let $T$ be the time to failure of a unit — a random variable, because nominally identical units fail at different times. "Time" may be hours, cycles, revolutions or kilometres.

::: definition Reliability, failure distribution and hazard rate {#def-reliability}
The **reliability function** (survival function) is $R(t) = \Prob(T > t)$, the probability that a unit survives beyond $t$. The **cumulative failure distribution** is $F(t) = 1 - R(t)$, and the **failure density** is $f(t) = F'(t) = -R'(t)$. The **hazard rate** (instantaneous failure rate) is
$$
h(t) = \frac{f(t)}{R(t)},
$$ {#eq-hazard}
so that $h(t)\,\Delta t$ is approximately the probability that a unit which has survived to $t$ fails in the next interval $\Delta t$. The **mean time to failure** is $\mathrm{MTTF} = \E[T]$.
:::

The distinction between $f$ and $h$ matters. $f(t)\,\Delta t$ is the fraction of the *original* population that fails in $(t, t + \Delta t)$; $h(t)\,\Delta t$ is the fraction of the *survivors*. A population of light bulbs late in life has low $f$ (few are left) but high $h$ (each survivor is near the end).

::: proposition Reliability from the hazard rate; MTTF from reliability {#prop-hazard}
For a unit that is new at $t = 0$,
$$
R(t) = \exp\!\left(-\int_0^t h(u)\,du\right) \qquad\text{and}\qquad \mathrm{MTTF} = \int_0^\infty R(t)\,dt.
$$ {#eq-r-from-h}
:::

::: proof
From the definitions, $h = f/R = -R'/R = -\frac{d}{dt}\ln R$. Integrating from $0$ to $t$ with $R(0) = 1$ gives $\ln R(t) = -\int_0^t h\,du$, the first result.

For the second, $\mathrm{MTTF} = \int_0^\infty t f(t)\,dt = -\int_0^\infty t R'(t)\,dt$. Integrating by parts, $= [-tR(t)]_0^\infty + \int_0^\infty R\,dt$. The boundary term vanishes at $0$ trivially and at infinity provided the mean is finite (then $tR(t) \to 0$). So $\mathrm{MTTF} = \int_0^\infty R\,dt$.
:::

### The bathtub curve

Plotted against age, the hazard rate of many populations of products has the shape of a bathtub. An **early-failure** (infant-mortality) region of decreasing hazard is caused by manufacturing defects — poor solder joints, contaminated bearings, inclusions — that make a fraction of units weak; they fail early and the population that remains is stronger. A **useful-life** region of roughly constant hazard is dominated by random overloads and causes unrelated to age. A **wear-out** region of increasing hazard is caused by fatigue, wear, corrosion and ageing. Not every product shows all three — many purely mechanical components show mainly wear-out, and much electronic equipment mainly early failures and a flat region — but the picture explains the standard countermeasures: burn-in and screening against early failures, margins against random overloads, and preventive replacement before wear-out.

## The exponential and Weibull distributions {#sec-weibull}

::: definition Exponential and Weibull life distributions {#def-weibull}
A **constant hazard** $h(t) = \lambda$ gives, by [[#eq-r-from-h]], the **exponential** distribution
$$
R(t) = e^{-\lambda t},\qquad \mathrm{MTTF} = 1/\lambda.
$$ {#eq-exponential}
The two-parameter **Weibull** distribution has
$$
R(t) = \exp\!\left[-\left(\frac{t}{\eta}\right)^{\beta}\right],\qquad h(t) = \frac{\beta}{\eta}\left(\frac{t}{\eta}\right)^{\beta - 1},
$$ {#eq-weibull}
with **shape parameter** (Weibull slope) $\beta > 0$ and **characteristic life** (scale parameter) $\eta > 0$. At $t = \eta$, $R = e^{-1} = 0.368$ whatever $\beta$: $63.2\,\%$ of units have failed by the characteristic life. $\beta < 1$ gives a decreasing hazard (early failures), $\beta = 1$ the exponential, $\beta > 1$ an increasing hazard (wear-out); $\beta$ between about 3 and 4 makes the density nearly symmetric, like a normal distribution.
:::

The exponential distribution is *memoryless*: $\Prob(T > t + s \mid T > t) = e^{-\lambda s}$ whatever $t$, so a used unit is as good as new. That is a reasonable model for random failures in the useful-life region and is the basis of most electronic-reliability prediction, but it is wrong for parts that wear, and replacing such parts on a schedule only helps when $\beta > 1$.

::: proposition Percentile life of a Weibull population {#prop-bp-life}
The age $t_p$ by which a fraction $p$ of a Weibull population has failed (the $B_p$ life, written $B_{10}$ or $L_{10}$ for $p = 0.10$) is
$$
t_p = \eta\,\bigl[-\ln(1 - p)\bigr]^{1/\beta},
$$ {#eq-bp}
and the mean is $\mathrm{MTTF} = \eta\,\Gamma(1 + 1/\beta)$.
:::

::: proof
Set $F(t_p) = 1 - \exp[-(t_p/\eta)^\beta] = p$; then $(t_p/\eta)^\beta = -\ln(1 - p)$, which rearranges to [[#eq-bp]]. For the mean, $\int_0^\infty \exp[-(t/\eta)^\beta]\,dt$ with $u = (t/\eta)^\beta$, $dt = (\eta/\beta)u^{1/\beta - 1}du$ gives $(\eta/\beta)\Gamma(1/\beta) = \eta\,\Gamma(1 + 1/\beta)$.
:::

::: widget plot
f: b*x^(b-1); exp(-x^b)
x: 0.02, 2.5
y: 0, 3
sliders: b=1.5:0.5:4:0.1
labels: h(t)\,\eta\ \text{(hazard)}; R(t)\ \text{(reliability)}
caption: Weibull hazard rate (scaled by the characteristic life $\eta$) and reliability against $t/\eta$. Set $\beta = 1$: the hazard is flat (exponential, random failures). Below 1 it falls (early failures); above 1 it rises, linearly for $\beta = 2$ and ever more steeply beyond. Every reliability curve passes through $R = 0.368$ at $t/\eta = 1$; a large $\beta$ means the failures are concentrated close to $\eta$, which is what makes scheduled replacement effective.
:::

### Rolling-bearing life

Rolling bearings were the first machine elements to be designed on a probabilistic life basis. Following Lundberg and Palmgren's theory of 1947, ISO 281 defines the **basic rating life** $L_{10}$ as the life, in millions of revolutions, that 90 % of a large group of identical bearings under identical conditions reach or exceed before the first sign of rolling-contact fatigue:
$$
L_{10} = \left(\frac{C}{P}\right)^{p},\qquad p = 3 \text{ for ball bearings},\ p = \tfrac{10}{3} \text{ for roller bearings},
$$ {#eq-l10}
where $C$ is the basic dynamic load rating from the manufacturer's catalogue and $P$ the equivalent dynamic bearing load. The standard adds modification factors for reliabilities other than 90 %, lubrication, contamination and the fatigue limit; those are beyond this chapter, and real bearing selection follows the standard and the manufacturer's method.

::: example Bearing life and reliability {#ex-bearing}
A ball bearing with $C = 25\,\mathrm{kN}$ carries an equivalent load $P = 3\,\mathrm{kN}$ at $1500\,\mathrm{rev/min}$. (a) Find $L_{10}$ in hours. (b) Modelling life as a two-parameter Weibull distribution with $\beta = 1.5$, find the life at 99 % reliability and the reliability at twice the $L_{10}$ life.
::: solution
(a) $L_{10} = (25/3)^3 = 578.7$ million revolutions. At $1500\times60 = 90\,000$ rev/h, $L_{10} = 578.7\times10^6/90\,000 = 6\,430\,\mathrm h$.

(b) From [[#eq-bp]], $t_p \propto [-\ln(1 - p)]^{1/\beta}$, so
$$
\frac{t_{0.01}}{t_{0.10}} = \left(\frac{-\ln 0.99}{-\ln 0.90}\right)^{1/1.5} = \left(\frac{0.01005}{0.1054}\right)^{0.667} = 0.209,
$$
and $L_1 = 0.209\times6\,430 = 1\,342\,\mathrm h$. The characteristic life is $\eta = 6\,430/(0.1054)^{1/1.5} = 28\,800\,\mathrm h$, and $R(12\,860\,\mathrm h) = \exp[-(12\,860/28\,800)^{1.5}] = 0.742$.

**Sanity check.** $R(L_{10}) = \exp[-(6430/28\,800)^{1.5}] = 0.90$ ✓. Demanding 99 % instead of 90 % survival cuts the life to about a fifth; doubling the time does not double the failures — it raises them from 10 % to about 26 %, because $\beta > 1$. Doubling the load would cut $L_{10}$ by $2^3 = 8$.
:::

### Estimating Weibull parameters from test data

Given failure times from a test, the parameters are estimated by plotting. Order the $n$ failure times $t_1 \le t_2 \le \dots \le t_n$ and estimate $F(t_i)$ by **median ranks**, for which Bernard's approximation is
$$
F_i \approx \frac{i - 0.3}{n + 0.4}.
$$ {#eq-median-rank}
Taking logarithms of $1 - F = \exp[-(t/\eta)^\beta]$ twice gives $\ln[-\ln(1 - F)] = \beta\ln t - \beta\ln\eta$: on axes of $\ln t$ and $\ln[-\ln(1 - F)]$ (Weibull probability paper) the data lie near a straight line of slope $\beta$ that crosses zero at $t = \eta$. Fitting the line by least squares gives the estimates. (Maximum-likelihood estimation is preferred for larger samples and is necessary when some units have not failed — suspended or censored data — but the plot remains the best way to see whether the model fits.)

:::

::: example Weibull analysis of a fatigue test {#ex-weibull-fit}
Eight prototype pump diaphragms were run to failure. The failure times (hours) were 410, 620, 760, 890, 1020, 1180, 1390 and 1730. Estimate $\beta$, $\eta$, the $B_{10}$ life and the MTTF.
::: solution
Median ranks from [[#eq-median-rank]] with $n = 8$, and the plotting coordinates:

| $i$ | $t_i$ (h) | $F_i$ | $x = \ln t_i$ | $y = \ln[-\ln(1-F_i)]$ |
|---|---|---|---|---|
| 1 | 410 | 0.0833 | 6.016 | −2.442 |
| 2 | 620 | 0.2024 | 6.430 | −1.487 |
| 3 | 760 | 0.3214 | 6.633 | −0.947 |
| 4 | 890 | 0.4405 | 6.791 | −0.544 |
| 5 | 1020 | 0.5595 | 6.928 | −0.199 |
| 6 | 1180 | 0.6786 | 7.073 | 0.127 |
| 7 | 1390 | 0.7976 | 7.237 | 0.469 |
| 8 | 1730 | 0.9167 | 7.456 | 0.910 |

A least-squares line $y = \beta x + a$ gives $\beta = 2.37$ and $a = -16.66$, so $\eta = e^{-a/\beta} = 1\,139\,\mathrm h$.

$B_{10} = 1139\times(0.1054)^{1/2.37} = 440\,\mathrm h$. $\mathrm{MTTF} = 1139\times\Gamma(1 + 1/2.37) = 1139\times0.886 = 1\,009\,\mathrm h$.

**Sanity check.** The MTTF is close to the sample mean, $1\,000\,\mathrm h$ ✓, and $\eta$ lies, as it should, near the 63rd percentile of the data (between the 5th and 6th failures). $\beta \approx 2.4$ indicates wear-out, consistent with fatigue of a flexing diaphragm. With only eight points the estimates are uncertain — a confidence interval on $\beta$ from eight points is wide — so a design decision based on $B_{10}$ should use a lower confidence bound, not the point estimate.
:::

:::
## Systems: block diagrams, redundancy and availability {#sec-systems}

A **reliability block diagram** (RBD) shows which combinations of working components keep the system working. Blocks in **series** must all work; blocks in **parallel** (active redundancy) provide the function if any one works.

::: proposition Series, parallel and k-out-of-n systems {#prop-rbd}
For components that fail independently with reliabilities $R_i$ over the same mission time:
$$
R_\text{series} = \prod_{i=1}^{n} R_i,\qquad R_\text{parallel} = 1 - \prod_{i=1}^{n}(1 - R_i),
$$ {#eq-series-parallel}
and for $n$ identical units of reliability $R$ of which at least $k$ must work,
$$
R_{k/n} = \sum_{j=k}^{n}\binom{n}{j}R^j(1 - R)^{n-j}.
$$ {#eq-k-of-n}
:::

::: proof
Series: the system works only if every component works; by independence the probability of the intersection is the product. Parallel: the system fails only if every component fails; the probability of that intersection is $\prod(1 - R_i)$, and $R$ is its complement. $k$-out-of-$n$: the number of working units is binomial with parameters $n$ and $R$ by independence, and the system works when that number is at least $k$.
:::

For exponential components in series, $\prod e^{-\lambda_it} = e^{-(\sum\lambda_i)t}$: failure rates add. Series systems are only as good as the product of their parts, so a system of 50 parts each with $R = 0.99$ has $R = 0.99^{50} = 0.61$; this is a strong argument for the part-count reduction of [[design-process/design-for-manufacture]].

Redundancy is powerful only if the redundant units really fail independently. A **common-cause failure** disables several units at once through a shared cause: the same contaminated fluid, the same power supply, the same design error, the same maintenance mistake, a fire in a shared room. The simplest model, the **beta-factor model**, assumes that a fraction $\beta$ of each unit's failure probability is due to causes that fail all redundant units together (the symbol $\beta$ here is unrelated to the Weibull slope). Typical values used in industrial safety assessments range from about 1 % to 10 % depending on how well the units are separated and diversified; the beta factor then usually dominates the reliability of a redundant pair.

::: example A cooling-water pump system {#ex-pumps}
A cooling system needs one pump running; its controller ($R = 0.98$ over a year) and an isolating valve ($R = 0.95$) are in series with the pumps. Each pump has $R = 0.90$ over a year. Compare (a) one pump, (b) two pumps in active parallel with independent failures, and (c) two pumps with a common-cause factor $\beta = 0.1$.
::: solution
(a) $R = 0.90\times0.98\times0.95 = 0.838$.

(b) Pump pair: $1 - 0.10^2 = 0.990$. System: $0.990\times0.98\times0.95 = 0.922$.

(c) Each pump's failure probability $0.10$ splits into an independent part $(1 - \beta)\times0.10 = 0.09$ and a common part $\beta\times0.10 = 0.01$. The pair works if the common cause does not occur and not both pumps fail independently: $R_\text{pair} = (1 - 0.01)(1 - 0.09^2) = 0.99\times0.9919 = 0.982$. System: $0.982\times0.98\times0.95 = 0.914$.

**Sanity check.** Redundancy cut the pumps' contribution to unreliability from $0.10$ to $0.010$, but with common cause it is $0.018$, more than half of which is the common-cause term $0.01$. After adding the second pump, the valve (unreliability $0.05$) is the weakest block: the next improvement should go there, not into a third pump.
:::

### Repairable systems and availability

For a repairable item the **mean time between failures** (MTBF) is the mean operating time between successive failures, and the **mean time to repair** (MTTR) the mean downtime per failure. The fraction of time the item is able to work, its steady-state (inherent) **availability**, is
$$
A = \frac{\mathrm{MTBF}}{\mathrm{MTBF} + \mathrm{MTTR}}.
$$ {#eq-availability}
Availability can be raised by making failures rarer or repairs quicker. Design for maintainability — access, modular replacement units, diagnostics, standard tools — reduces MTTR, and is often cheaper than an equal improvement in MTBF.

:::

::: warning MTBF is not a life
An MTBF of $100\,000\,\mathrm h$ does not mean that units last about eleven years. For an exponential distribution, only $e^{-1} = 37\,\%$ of units survive to the MTBF, and the MTBF figure describes the useful-life region only: it says nothing about wear-out, which may begin after five years. Similarly, a constant failure rate quoted for a mechanical part that actually wears gives misleading replacement intervals. Ask which distribution, which region of life and which operating conditions any reliability figure refers to.
:::

::: quiz
Three components, each with reliability 0.95 over the mission, are arranged so that the system works if at least two of the three work. What is the system reliability?
- [ ] 0.857
- [ ] 0.9025
- [x] 0.99275
- [ ] 0.999875
::: solution
From [[#eq-k-of-n]] with $k = 2$, $n = 3$: $3R^2(1 - R) + R^3 = 3(0.9025)(0.05) + 0.857375 = 0.135375 + 0.857375 = 0.99275$. The first option is three in series ($0.95^3$), the last three in parallel.
:::
:::

## Failure mode and effects analysis {#sec-fmea}

The probabilistic models need failure data. Before such data exist, and to make sure nothing important is overlooked, designers analyse systematically how the design could fail.

::: definition Failure mode and effects analysis (FMEA) {#def-fmea}
**FMEA** is a structured, bottom-up, team analysis in which each component or function of a design (design FMEA) or each step of a manufacturing process (process FMEA) is examined for its possible **failure modes** (the manner of failure: cracks, seizes, leaks, loosens, gives no output), their **effects** on the system and the user, their **causes** (mechanisms: fatigue, corrosion, wrong material, tolerance stack-up), and the **current controls** that prevent the cause or detect the failure before it reaches the customer. Each line is traditionally rated on three scales of 1 to 10: **severity** $S$ of the effect, **occurrence** $O$ (likelihood of the cause), and **detection** $D$ (10 = cannot be detected before the customer). The **risk priority number** is $\mathrm{RPN} = S\times O\times D$. Actions are then planned to remove causes, reduce occurrence or improve detection, and the ratings are revised.
:::

The value of an FMEA lies mainly in the structured discussion and the actions it produces; the numbers are a means of ranking. The RPN has well-known weaknesses. $S$, $O$ and $D$ are ordinal ratings — rank numbers whose spacing has no physical meaning — so their product is not a measure of risk. Very different situations give the same product: $S = 10$, $O = 2$, $D = 2$ (a rare, detectable but catastrophic failure) and $S = 2$, $O = 5$, $D = 4$ (a frequent nuisance) both give 40. A team can lower the RPN of a safety-critical item below an action threshold by improving detection alone. For these reasons the joint AIAG–VDA FMEA handbook published in 2019 for the automotive industry replaced RPN ranking with an **action priority** (high, medium, low) read from tables in which severity is considered first, then occurrence, then detection. Whatever scheme is used, any failure mode with a very high severity rating needs attention regardless of its other ratings.

::: example A design FMEA fragment for a hoist brake {#ex-fmea}
Part of a design FMEA for the spring-applied, electrically released brake of a small electric hoist contains:

| item | failure mode | effect | cause | S | O | D |
|---|---|---|---|---|---|---|
| brake spring | fractures | brake cannot apply; load can fall | fatigue | 10 | 2 | 6 |
| friction lining | wears thin | longer stopping distance | normal wear | 7 | 6 | 3 |
| release coil | open circuit | brake stays applied; hoist will not run | wire fatigue at terminal | 4 | 4 | 2 |

Compute the RPNs, rank the lines by RPN, and say what the ranking misses and what actions you would take.
::: solution
RPNs: spring $10\times2\times6 = 120$; lining $7\times6\times3 = 126$; coil $4\times4\times2 = 32$. By RPN the lining comes first and the spring second, almost equal.

The ranking misses that the spring failure could drop a load — a severity of 10 with a detection rating saying the failure cannot easily be found before it happens. It should be treated first whatever its RPN. Actions: make the design fail-safe by using several springs in parallel so that one fracture still leaves enough braking torque (redundancy against the failure mode); size the springs for infinite fatigue life with margin; and add a brake-torque check to the periodic inspection. For the lining, a wear indicator or a wear-sensing switch reduces $D$. For the coil, a strain relief at the terminal removes the cause; the effect is safe (the brake fails *applied*), which is an example of the self-protecting, fail-safe design principle of [[design-process/embodiment-design]].

**Sanity check.** After the actions, a reasonable re-rating of the spring line might be $S = 10$ (severity is a property of the effect and does not change unless the design changes the effect), $O = 1$ (multiple springs), $D = 4$ (inspection): RPN 40. Note that severity stays 10: only redesign changes it.
:::

:::
## Fault tree analysis {#sec-fta}

FMEA works upward from components. **Fault tree analysis** works downward from a single undesired **top event** — "load falls", "loss of cooling", "pressure vessel overpressure" — to the combinations of basic events that cause it, using logic gates. An **OR gate** passes the failure up if any input occurs; an **AND gate** only if all inputs occur.

::: definition Minimal cut set {#def-cut-set}
A **cut set** is a set of basic events whose joint occurrence causes the top event. A **minimal cut set** is a cut set that ceases to be one if any event is removed. The top event occurs if and only if all events of at least one minimal cut set occur. A minimal cut set with one event is a **single point of failure**.
:::

For independent basic events with small probabilities $q_i$, the probability of a minimal cut set is the product of its events' probabilities, and the probability of the top event is approximately the sum over the minimal cut sets (the **rare-event approximation**, an upper bound):
$$
Q_\text{top} \approx \sum_{\text{cut sets } C}\ \prod_{i\in C} q_i.
$$ {#eq-fta}

::: example Fault tree for loss of cooling {#ex-fta}
Cooling of a machine is lost (top event) if both of two redundant pumps A and B fail, or the pump controller C fails, or the electrical supply D fails. Over a year, $q_A = q_B = 0.05$, $q_C = 0.002$, $q_D = 0.001$, independent. Draw the tree, find the minimal cut sets and the probability of the top event.
::: solution
Tree: the top event is an OR gate with three inputs: an AND gate (A, B), basic event C, basic event D. Minimal cut sets: $\{A, B\}$, $\{C\}$, $\{D\}$. C and D are single points of failure.

Rare-event approximation: $Q \approx 0.05\times0.05 + 0.002 + 0.001 = 0.0025 + 0.002 + 0.001 = 0.0055$.

Exact, since the three cut sets share no events: $Q = 1 - (1 - 0.0025)(1 - 0.002)(1 - 0.001) = 0.00549$.

**Sanity check.** The approximation slightly overestimates, as it must ✓. The redundant pump pair contributes 45 % of the risk, the two single points of failure 55 %; a second, independent supply or controller would do more good than better pumps. And the independence assumption must be questioned: if both pumps share the supply D, a common-cause event is already visible in the tree — such shared dependencies are one of the main things a fault tree reveals.
:::

:::
## Risk and designing for safety {#sec-risk}

::: definition Risk, hazard and risk assessment {#def-risk}
A **hazard** is a potential source of harm. **Risk** is the combination of the probability of occurrence of harm and the severity of that harm. **Risk assessment** comprises identifying hazards, estimating the risk from each, and evaluating whether it is acceptable; **risk reduction** follows where it is not. ISO 12100 (*Safety of machinery — General principles for design — Risk assessment and risk reduction*, 2010) sets out this process for machinery.
:::

A **risk matrix** gives a quick, consistent ranking: severity in categories (for example negligible, minor, serious, major, catastrophic) on one axis, likelihood in categories (improbable to frequent) on the other, and each cell assigned to a risk level such as low, medium or high, with a rule for what action each level requires. Like the RPN, a matrix multiplies or combines ordinal categories, so it should be used for ranking and screening, with care at category boundaries; where consequences are severe, quantitative analysis (fault trees, event trees) is used.

ISO 12100 prescribes a **three-step method** of risk reduction, to be applied in order:
1. **Inherently safe design measures** — remove the hazard or reduce the risk by the design itself: eliminate pinch points by geometry, limit forces, speeds and energies, use low voltages, choose materials that do not burn or splinter, place controls outside danger zones.
2. **Safeguarding and complementary protective measures** — guards, interlocks, light curtains, two-hand controls, emergency stops, for risks that cannot reasonably be removed by design.
3. **Information for use** — warnings, signs, instructions and training requirements for the residual risk.

The order is essential: a guard can be removed and a warning ignored, but a hazard that is not there cannot hurt anyone. The same priority appears in the general hierarchy of controls used in occupational safety (elimination, substitution, engineering controls, administrative controls, personal protective equipment) and in the basic rule of safety in [[design-process/embodiment-design]]. In the European Union, machinery placed on the market must meet the essential health and safety requirements of the machinery legislation, and conformity is commonly shown through harmonised standards such as ISO 12100; the legal framework is in [[design-process/ethics-standards]]. This lesson teaches the principles; safety-critical designs are assessed to the current standards by qualified engineers.

::: history
Formal FMEA began with the US military procedure MIL-P-1629, *Procedures for Performing a Failure Mode, Effects and Criticality Analysis*, dated November 1949; NASA and its contractors used the method on the Apollo programme in the 1960s, and it later became standard practice in the automotive industry. Waloddi Weibull, of the Royal Institute of Technology in Stockholm, published "A statistical distribution function of wide applicability" in the *Journal of Applied Mechanics* in 1951, using examples from the strength of steel to fatigue life; the distribution now bears his name. Gustaf Lundberg and Arvid Palmgren's 1947 theory of rolling-bearing fatigue life is the basis of the $L_{10}$ rating in ISO 281. Fault tree analysis was devised by H. A. Watson at Bell Telephone Laboratories in 1961–62 for a US Air Force launch-control safety study and was developed further at Boeing, from where it spread to aviation and nuclear-power safety.
:::

::: summary
- $R(t) = \Prob(T > t)$, $h = f/R$, $R(t) = \exp(-\int_0^t h\,du)$, $\mathrm{MTTF} = \int_0^\infty R\,dt$. The bathtub curve: early failures ($h$ falling), useful life ($h$ constant), wear-out ($h$ rising).
- Exponential: $R = e^{-\lambda t}$, memoryless, MTTF $= 1/\lambda$. Weibull: $R = \exp[-(t/\eta)^\beta]$; $\beta$ sets the failure pattern; $t_p = \eta[-\ln(1-p)]^{1/\beta}$; estimate $\beta$, $\eta$ from a plot of $\ln[-\ln(1-F_i)]$ against $\ln t_i$ with $F_i \approx (i - 0.3)/(n + 0.4)$.
- Ball bearings: $L_{10} = (C/P)^3$ million revolutions (ISO 281).
- Series $\prod R_i$; parallel $1 - \prod(1 - R_i)$; $k$-out-of-$n$ binomial. Common-cause failures (beta factor) often dominate redundant systems. $A = \mathrm{MTBF}/(\mathrm{MTBF} + \mathrm{MTTR})$.
- FMEA: modes, effects, causes, controls; $\mathrm{RPN} = S\times O\times D$ ranks but is not a risk measure — treat high severity first (AIAG–VDA action priority).
- FTA: top event, AND/OR gates, minimal cut sets, $Q \approx \sum\prod q_i$; single-event cut sets are single points of failure.
- Risk reduction in order (ISO 12100): inherently safe design, then safeguarding, then information for use.
:::

## Exercises

::: exercise Constant failure rate {#exr-exp level=1 check="0.9802"}
A component has a constant failure rate of $2\times10^{-5}$ per hour. What is its reliability over $1\,000\,\mathrm h$? (Enter $R$ rounded to four decimal places.)
::: solution
$R = e^{-2\times10^{-5}\times1000} = e^{-0.02} = 0.98020 \approx 0.9802$.
:::
:::

::: exercise Availability {#exr-availability level=1 check="99.60"}
A machine tool has an MTBF of $2\,000\,\mathrm h$ and an MTTR of $8\,\mathrm h$. What is its inherent availability? (Enter $A$ in per cent, rounded to two decimal places.) What would it be with an MTTR of $2\,\mathrm h$?
::: solution
$A = 2000/2008 = 0.99602 = 99.60\,\%$. With $\mathrm{MTTR} = 2\,\mathrm h$: $2000/2002 = 99.90\,\%$. Over 4 000 operating hours a year that is about 16 h versus 4 h of downtime.
:::
:::

::: exercise Bearing rating life {#exr-l10 level=1 check="2980"}
A ball bearing with a basic dynamic load rating of $19.5\,\mathrm{kN}$ carries an equivalent load of $2.4\,\mathrm{kN}$ at $3000\,\mathrm{rev/min}$. What is its basic rating life $L_{10}$ in hours? (Enter it rounded to the nearest hour.)
::: solution
$L_{10} = (19.5/2.4)^3 = 8.125^3 = 536.4$ million revolutions. At $3000\times60 = 180\,000$ rev/h: $536.4\times10^6/180\,000 = 2\,979.9 \approx 2\,980\,\mathrm h$.
:::
:::

::: exercise Weibull B10 life {#exr-b10 level=2 check="1623"}
A component's life follows a Weibull distribution with $\eta = 5\,000\,\mathrm h$ and $\beta = 2$. Find its $B_{10}$ life. (Enter it in hours, rounded to the nearest hour.)
::: solution
$t_{0.10} = 5000\times(-\ln0.9)^{1/2} = 5000\times\sqrt{0.10536} = 5000\times0.32459 = 1\,623\,\mathrm h$. Check: $R(1623) = \exp[-(1623/5000)^2] = \exp(-0.1054) = 0.900$ ✓.
:::
:::

::: exercise Duplicating one component {#exr-duplicate level=2 check="0.9401"}
A system has three components in series, each with $R = 0.97$. One of them is duplicated in active parallel (independent failures). What is the new system reliability? (Enter it rounded to four decimal places.)
::: solution
Before: $0.97^3 = 0.9127$. The duplicated pair: $1 - 0.03^2 = 0.9991$. After: $0.97^2\times0.9991 = 0.9409\times0.9991 = 0.94005 \approx 0.9401$. The gain is limited because the two unduplicated components still contribute about $0.06$ of unreliability.
:::
:::

::: exercise Two out of three {#exr-2oo3 level=2 check="0.972"}
A safety system uses three identical sensors with two-out-of-three voting; each sensor has $R = 0.9$ over the proof-test interval. What is the reliability of the sensor group? (Enter the exact value.)
::: solution
$R_{2/3} = 3R^2(1 - R) + R^3 = 3R^2 - 2R^3 = 3(0.81) - 2(0.729) = 2.43 - 1.458 = 0.972$. A single sensor gives $0.9$ and a one-out-of-two pair $0.99$; two-out-of-three is chosen because it also tolerates one sensor failing in the "trip" direction without a spurious shutdown.
:::
:::

::: exercise RPN before and after {#exr-rpn level=2 check="54"}
A failure mode is rated $S = 9$, $O = 5$, $D = 4$. A design change reduces occurrence to $3$ and an added test improves detection to $2$. What is the new RPN, and what has not changed? (Enter the new RPN.)
::: solution
Before: $9\times5\times4 = 180$; after: $9\times3\times2 = 54$. Severity is unchanged at 9: the consequences of the failure, if it does happen, are as serious as before. Only a design change that alters the effect (for example a fail-safe arrangement) lowers $S$.
:::
:::

::: exercise Mean life of a Weibull population {#exr-weibull-mean level=3 check="886"}
(a) Derive $\mathrm{MTTF} = \eta\,\Gamma(1 + 1/\beta)$ for the Weibull distribution from [[#eq-r-from-h]]. (b) Show that for $\beta = 1$ it reduces to the exponential result. (c) Evaluate the MTTF for $\eta = 1\,000\,\mathrm h$ and $\beta = 2$. (Enter it in hours, rounded to the nearest hour.)
::: solution
(a) $\mathrm{MTTF} = \int_0^\infty\exp[-(t/\eta)^\beta]\,dt$. Substitute $u = (t/\eta)^\beta$, so $t = \eta u^{1/\beta}$ and $dt = (\eta/\beta)u^{1/\beta - 1}\,du$: $\mathrm{MTTF} = (\eta/\beta)\int_0^\infty u^{1/\beta - 1}e^{-u}\,du = (\eta/\beta)\Gamma(1/\beta) = \eta\,\Gamma(1 + 1/\beta)$, using $\Gamma(1 + x) = x\Gamma(x)$.

(b) $\beta = 1$: $\eta\,\Gamma(2) = \eta = 1/\lambda$ ✓.

(c) $1000\times\Gamma(1.5) = 1000\times\frac{\sqrt\pi}{2} = 886.2\,\mathrm h \approx 886\,\mathrm h$. The mean is below $\eta$ because by $\eta$ already 63 % have failed.
:::
:::

::: exercise Risk assessment of a pillar drill {#exr-drill level=3}
A small workshop pillar (bench) drill is being redesigned. Identify at least four hazards, and for each propose measures following the three-step method of ISO 12100 in order. Sketch a fault tree for the top event "operator's hand contacts the rotating chuck", and identify any single points of failure in your proposed design. Which of your measures would you list in an FMEA as detection controls, and which as prevention?
::: solution
Hazards (examples): entanglement of hair, sleeves or gloves in the rotating spindle and chuck; workpiece seized by the drill and spun ("helicoptering"); ejected chips and broken drills; electric shock; unexpected start-up after a power cut; noise.

Inherently safe design: limit the exposed rotating length; smooth, non-snagging chuck; an integral vice or clamping table so that work need not be hand-held; double insulation; a no-volt release so that the machine does not restart when power returns; lower maximum speed for large drills.

Safeguarding: an adjustable chuck guard interlocked so that the spindle cannot run with it open; an emergency stop within reach; a spindle brake to stop run-down quickly.

Information for use: instructions to clamp work, tie back hair, not wear gloves near the spindle, wear eye protection; warning labels.

Fault tree: top event = AND(hand in danger zone, spindle rotating). "Hand in danger zone" = OR(guard open or removed, guard defeated, reaching under guard); "spindle rotating" = OR(normal operation, run-down after stop, unexpected start). If the interlock is a single switch, its failure is part of a two-event cut set {interlock fails, hand in zone while running} — the design should make the interlock monitored or redundant so that one fault is detected. A single point of failure would be any event that alone causes contact, for example a design in which the guard is absent.

In FMEA terms the interlock, guard and clamping vice are prevention controls (they stop the failure cause from producing harm); an interlock self-test or a periodic check of the brake is a detection control. A good answer keeps the order of the three steps and justifies why each residual risk is left to the next step.
:::
:::

## Further reading

O'Connor and Kleyner, *Practical Reliability Engineering* (5th edition, Wiley, 2012), covers life distributions, Weibull analysis, system reliability, FMEA, fault trees and reliability testing from a practical engineering viewpoint. Abernethy's *The New Weibull Handbook* is a detailed guide to Weibull analysis of field and test data. For machinery safety, ISO 12100:2010 itself sets out the risk-assessment process and the three-step method. Lundberg and Palmgren's theory and its modern extensions are explained in the technical handbooks of the bearing manufacturers.
