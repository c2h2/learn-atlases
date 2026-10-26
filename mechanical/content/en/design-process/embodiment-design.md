A selected concept is a principle: "a spur-gear reduction driving a lead screw", "a cantilevered arm on a slewing bearing", "a membrane pump driven by an eccentric". Nobody can make a principle. **Embodiment design** is the phase in which the concept acquires a form — an arrangement of parts in space, a material and a rough size for each, the interfaces between them, and enough calculation to show that the arrangement will carry its loads, fit its envelope and be made at the target cost. **Detail design** then fixes every remaining dimension, tolerance, surface finish and material specification and records them in the drawings and parts lists that manufacturing works from. The two phases overlap heavily, and most of the engineering hours on a mechanical product are spent in them.

This chapter follows Pahl and Beitz's division of the work. It starts with **product architecture** — how functions are mapped onto physical chunks and how the chunks interact. It then gives the basic rules and principles of embodiment (clarity, simplicity, safety; direct load paths; division of tasks; self-help), the procedure for sizing a part from its loads, the analysis of **tolerance stack-ups** by worst-case and statistical methods, and the planning of **prototypes and tests**. The input is a concept chosen by the methods of [[design-process/concept-selection]]; the output is the starting point for [[design-process/design-for-manufacture]] and [[design-process/reliability-risk]]. The stress analysis itself is taught in [[mechanics-of-materials]] and the sizing of standard machine elements in [[machine-design]]; here they are used, not derived.

## From concept to layout {#sec-concept-to-layout}

Embodiment proceeds from the coarse to the fine. A typical sequence is:

1. Identify the requirements that govern form and size: loads, speeds, temperatures, envelope dimensions, masses, interfaces to the outside world, production volume, cost target. These come from the specification of [[design-process/requirements]].
2. Make rough scale layouts of the main function carriers (motor, gearbox, structure, housing) to see whether the concept fits the envelope at all.
3. Decide the architecture: which functions share a part, where the module boundaries lie, which interfaces are standardised.
4. Size the main function carriers by calculation, then the auxiliary ones (bearings, seals, fasteners, covers).
5. Check the layout against the rules of [[#sec-rules]] and against manufacture, assembly, maintenance and recycling; evaluate the alternatives where more than one layout was drawn.
6. Prototype and test the uncertain parts; iterate.

The steps are not strictly sequential. Sizing a shaft can show that the bearings no longer fit the housing, which moves the gearbox, which changes the architecture. The aim of a disciplined procedure is not to avoid iteration but to make each loop short and to settle the decisions with the widest consequences first.

::: definition Layout, form design and detail design {#def-layout}
A **layout** (general arrangement) is a scale drawing or CAD assembly that fixes the position, orientation and approximate size of each main component and the routes of loads, energy, material and signals between them. **Form design** gives each component its shape, material and principal dimensions. **Detail design** completes the definition: every dimension with its tolerance, geometric tolerances, surface finishes, heat treatments, fasteners, standard parts, drawings, parts lists and assembly instructions. The output of detail design is a complete **technical product documentation** set from which a third party could make and inspect the product.
:::

## Product architecture {#sec-architecture}

::: definition Product architecture, chunks and interfaces {#def-architecture}
The **product architecture** is the scheme by which the functional elements of a product are arranged into physical building blocks (**chunks**, modules or subassemblies) and by which the chunks interact (Ulrich, 1995). It has three parts: the arrangement of functional elements, the mapping from functional elements to physical components, and the specification of the **interfaces** — the mechanical, energy, material and signal connections — between interacting components.
:::

Two extremes bound the possibilities.

- In a **modular architecture** each chunk implements one or a few functional elements completely, and the interactions between chunks are few and well defined. A desktop computer is the classic example: power supply, storage, memory and graphics are separate modules with standard interfaces. A cordless tool family built around one battery pack is another.
- In an **integral architecture** functional elements are spread over several chunks, or one chunk implements many functions, and the interfaces are complex and specific to this product. A cast aluminium engine block that is at once structure, coolant passage, oil gallery, bearing housing and mounting is integral; so is a moulded plastic part with integral hinges and snap fits.

Ulrich distinguished three kinds of modular architecture by the interface pattern: **slot** (each module has a different interface, as for a car radio), **bus** (all modules plug into a common interface, as for track lighting or a computer backplane) and **sectional** (modules connect to one another through identical interfaces, as for office partitions or piping).

Neither extreme is better in general. Modularity makes product variety cheap (change one module, keep the rest), lets modules be designed, tested, made and bought in parallel, simplifies service and upgrades, and limits the spread of a design change. Integrality usually wins on mass, size, part count and unit cost, because one part does several jobs and there are fewer joints; it is preferred when performance is pushed hard (aircraft structures, mobile phones) or volumes are high enough to pay for complex tooling. The decision is linked to the firm's strategy — variety, change, standardisation, outsourcing — as much as to engineering.

::: algorithm Defining a modular architecture {#alg-architecture}
1. Draw the function structure of the selected concept (from [[design-process/concept-generation]]).
2. Make a rough geometric layout to see which elements must be close together.
3. Cluster functional elements into chunks. Group elements that share a precise geometric relationship, that one supplier or technology will make, that are likely to change together, or that are needed by several product variants. Separate elements whose interactions are weak.
4. Draw the **interaction graph**: chunks as nodes, each interface as an edge labelled with what flows across it (force, torque, heat, fluid, electrical power, data).
5. Identify the **fundamental** interactions (those the function needs) and the **incidental** ones (heat, vibration, electromagnetic noise, thermal expansion between chunks). Incidental interactions are what make "independent" modules interfere in practice.
6. Write an interface specification for each edge and freeze the interfaces before detailed work on the chunks begins.
:::

The interface specifications are often collected in an **interface control document** (ICD) owned by the system engineer. For a mechanical interface it states the mating geometry and its tolerances, the datum features, the loads and moments transmitted, the fasteners and their tightening torques, the clearances for thermal expansion and assembly, and who is responsible for each side. A change to one side of a frozen interface needs the agreement of the owner of the other side; the ICD is the mechanism that lets two teams work in parallel without designing incompatible parts.

## Basic rules and principles of embodiment {#sec-rules}

Pahl and Beitz organised the experience of good embodiment into three **basic rules** that apply to every design and a set of **principles** that apply where they fit.

::: definition The basic rules: clarity, simplicity, safety {#def-basic-rules}
- **Clarity**: every function has an unambiguous function carrier, every load an identifiable path, and every input an unambiguous output. A part that is clamped by two bolt groups and also located by a dowel is statically indeterminate in a way that makes its loads depend on manufacturing errors; that is unclear.
- **Simplicity**: the fewest parts and the simplest shapes that do the job, so that the design is easy to analyse, make, assemble, inspect and maintain.
- **Safety**: reliable fulfilment of the function and protection of people and the environment, achieved in the order *direct safety* (the design itself is safe — no hazard or a hazard that cannot cause harm), *indirect safety* (guards and protective devices) and *warnings* (instructions and signs). This is the same hierarchy as the three-step method of ISO 12100 discussed in [[design-process/reliability-risk]].
:::

The principles most often used are these.

- **Force transmission.** Transmit forces by the shortest and most direct path, preferably as axial tension or compression rather than as bending or torsion; aim for uniform strength (each section loaded to a similar stress); match the deformations of mating parts so that load is shared as intended (a bolted flange whose bolts are much stiffer than the flange will load the nearest bolts most); balance forces internally where possible (helical gears in pairs with opposite helix, opposed pistons), so that bearings and housings do not carry them.
- **Division of tasks.** Give each function its own carrier when one part doing several functions would compromise all of them — for example, a separate thrust bearing and radial bearing rather than one bearing that is a poor compromise for both. This is the opposite pressure to integration; the designer has to decide case by case.
- **Self-help.** Arrange the design so that the load itself helps the function: a self-energising drum brake, a pressure vessel door that opens inward so that internal pressure seals it, a seal whose lip is pressed harder as pressure rises. Self-protecting designs change their load path under overload so that a stronger element takes over before damage occurs.
- **Stability**: disturbances should produce effects that cancel rather than amplify them (a thermostat valve that closes as the temperature rises).
- **Fault-free design**: arrange the design so that errors in manufacture, assembly or use cannot produce a fault — asymmetric features that make wrong assembly impossible, connectors that only fit one way.

::: example Direct load path: a cantilever bracket versus a triangulated bracket {#ex-load-path}
A vertical load $F = 5\,\mathrm{kN}$ must be carried from a wall to a point $L = 300\,\mathrm{mm}$ away. Compare (a) a solid square-section steel cantilever and (b) a triangulated bracket of a horizontal round tie and a $45^\circ$ round strut, both pinned at the wall. Use an allowable stress of $100\,\mathrm{MPa}$, $E = 200\,\mathrm{GPa}$ and a factor of 3 on the strut's Euler buckling load. Compare the volumes of steel.
::: solution
**Free-body diagrams.** (a) Cantilever: load $F$ downward at the tip; at the wall a vertical reaction $F$ upward and a reaction moment $M = FL$. (b) Joint at the load point: $F$ downward, the tie force $T$ along the tie towards the wall, the strut force $C$ along the strut. The strut runs from the joint down to the wall at $45^\circ$; for vertical equilibrium its vertical component must equal $F$.

(a) The bending moment at the wall is $M = FL = 5000 \times 0.3 = 1500\,\mathrm{N\,m}$. For a square of side $b$, $\sigma = M/S$ with $S = b^3/6$, so
$$
b = \left(\frac{6M}{\sigma_\text{allow}}\right)^{1/3} = \left(\frac{6\times1500}{100\times10^6}\right)^{1/3} = 0.0448\,\mathrm m.
$$
The section is $44.8\,\mathrm{mm}$ square ($2008\,\mathrm{mm^2}$) and the volume of a prismatic beam is $2008\times300 = 6.02\times10^5\,\mathrm{mm^3} = 602\,\mathrm{cm^3}$. (A tapered beam would save some of this, since the moment falls to zero at the tip.)

(b) Joint equilibrium: $C\sin45^\circ = F$ gives $C = 7071\,\mathrm N$ (compression); horizontally $T = C\cos45^\circ = 5000\,\mathrm N$ (tension). Tie area: $5000/100 = 50\,\mathrm{mm^2}$ ($d = 8.0\,\mathrm{mm}$). The strut is $L_s = 0.3/\cos45^\circ = 0.424\,\mathrm m$ long; its stress at $100\,\mathrm{MPa}$ would need only $71\,\mathrm{mm^2}$, but buckling governs. With pinned ends, $3C = \pi^2EI/L_s^2$ gives
$$
I = \frac{3\times7071\times0.424^2}{\pi^2\times200\times10^9} = 1.93\times10^{-9}\,\mathrm{m^4},\qquad d = \left(\frac{64I}{\pi}\right)^{1/4} = 14.1\,\mathrm{mm},
$$
area $156\,\mathrm{mm^2}$ and stress $45\,\mathrm{MPa}$. Volume: $50\times300 + 156\times424 = 8.1\times10^4\,\mathrm{mm^3} = 81\,\mathrm{cm^3}$.

The triangulated bracket uses about one-seventh of the steel, because it carries the load as axial forces in which every fibre of the section works at the same stress, whereas in bending only the outer fibres are highly stressed.

**Sanity check.** Equilibrium at the joint: $T - C\cos45^\circ = 0$ and $C\sin45^\circ - F = 0$ ✓. The result does not mean the cantilever is wrong: it occupies less space below the load, needs no second wall fixing and may be cheaper to make. The principle tells you which option uses material well; the specification decides.
:::

:::

::: warning Statically indeterminate layouts carry loads where you did not intend
A shaft in three bearings, a plate held by six bolts and two dowels, a frame bolted to a stiff base at four corners — each has more supports than equilibrium needs, so the share of the load each support takes depends on stiffness and on manufacturing errors. A $0.05\,\mathrm{mm}$ misalignment of a middle bearing can load it far more than the shaft's own weight does. Either make the layout statically determinate (one fixed and one floating bearing, a three-point mounting), or provide compliance and calculate the load sharing including the tolerances. "It is stiffer, so it must be stronger" is a common and expensive mistake.
:::

## Sizing from loads to dimensions {#sec-sizing}

The calculations of embodiment design run in the opposite direction from the analyses of a mechanics course. Analysis takes a geometry and finds stresses; sizing takes the loads and the allowable stresses (or deflections, temperatures, lives) and finds the geometry.

::: algorithm Sizing a component {#alg-sizing}
1. **Loads.** From the specification and the layout, determine every load on the component, including how it varies in time (static, fluctuating, impact) and its extreme values. Draw the free-body diagram.
2. **Failure modes.** List every way the component could fail to perform: yielding, fracture, fatigue, buckling, excessive deflection, wear, vibration, overheating, corrosion.
3. **Criteria.** For each mode write the criterion as an inequality with a factor of safety $n$ or a design margin: for example $\tau_\text{max} \le \tau_y/n$, $\theta \le \theta_\text{allow}$, $L_{10} \ge L_\text{required}$.
4. **Solve** each criterion for the governing dimension. The largest required dimension governs.
5. **Round** to a standard or preferred size, then recheck all criteria with the chosen dimension.
6. **Record** loads, assumptions, material data and their sources, and the margins achieved, so that the calculation can be reviewed and repeated when something changes.
:::

The **factor of safety** covers uncertainty in loads, material properties, the model and manufacture. Typical values for ductile metals with well-known loads and properties are $1.5$–$2.5$; codes for pressure vessels, cranes or aircraft prescribe their own. Where a code applies, it governs; the methods here teach the reasoning and are no substitute for it.

::: example Sizing a motor shaft for strength and stiffness {#ex-shaft}
A solid steel shaft transmits $P = 7.5\,\mathrm{kW}$ from a motor running at $1450\,\mathrm{rev/min}$. The length between the coupling and the pulley is $400\,\mathrm{mm}$. The material has a tensile yield strength of $350\,\mathrm{MPa}$; take the shear yield strength as half of this (Tresca) and a factor of safety of $2.5$. The specification also limits the angle of twist between coupling and pulley to $1^\circ$ ($G = 80\,\mathrm{GPa}$). Find the diameter, considering torsion only.
::: solution
Torque: $\omega = 1450\times2\pi/60 = 151.8\,\mathrm{rad/s}$, $T = P/\omega = 7500/151.8 = 49.4\,\mathrm{N\,m}$.

**Strength.** $\tau_\text{allow} = 175/2.5 = 70\,\mathrm{MPa}$. For a solid shaft $\tau_\text{max} = 16T/(\pi d^3)$, so
$$
d \ge \left(\frac{16T}{\pi\,\tau_\text{allow}}\right)^{1/3} = \left(\frac{16\times49.4}{\pi\times70\times10^6}\right)^{1/3} = 15.3\,\mathrm{mm}.
$$

**Stiffness.** $\theta = TL/(GJ)$ with $J = \pi d^4/32$. Try standard diameters:

| $d$ (mm) | $\tau_\text{max}$ (MPa) | $\theta$ (degrees) |
|---|---|---|
| 16 | 61.4 | 2.20 |
| 18 | 43.1 | 1.37 |
| 20 | 31.4 | 0.90 |

The stiffness criterion governs: $d = 20\,\mathrm{mm}$, giving a stress margin of $70/31.4 = 2.2$ on top of the factor of safety.

**Sanity check.** $\tau \propto d^{-3}$ and $\theta \propto d^{-4}$: going from 16 to 20 mm reduces the stress by $(16/20)^3 = 0.51$ ✓ and the twist by $(16/20)^4 = 0.41$ ✓. In the real shaft, bending from the belt pull, stress concentrations at keyways and shoulders, and fatigue must be added — the methods are in [[machine-design]]. This first estimate fixes the layout; the detailed check follows.
:::

The example shows a pattern that recurs: for many mechanical parts a stiffness or deflection requirement, not strength, sets the size. Machine-tool frames, gearbox housings, robot links and precision slides are sized almost entirely by stiffness and vibration, and their stresses are low.

:::
## Tolerance stack-ups {#sec-tolerances}

Every dimension that is made has a variation. When several toleranced dimensions add up to a functional dimension — the axial play of a shaft in its housing, the gap between a door and its frame, the preload in a bearing pair — their variations accumulate. A **tolerance stack-up** predicts the variation of the functional dimension from the tolerances of its contributors. Limits, fits and geometric tolerances themselves are covered in [[engineering-graphics/tolerances-fits]]; here the question is how to allocate them.

::: definition Stack-up, assembly gap and contributors {#def-stack}
In a one-dimensional **stack-up** the functional dimension (the **assembly gap**) is
$$
G = \sum_{i=1}^{m} a_i X_i,
$$ {#eq-stack}
where the $X_i$ are the contributing dimensions and the coefficients $a_i = +1$ or $-1$ according to whether increasing $X_i$ increases or decreases the gap (more generally $a_i = \partial G/\partial X_i$, the sensitivity). Each contributor has nominal value $\mu_i$ and symmetric tolerance $\pm t_i$. The chain of dimensions from one side of the gap round the loop to the other is the **dimension loop**.
:::

::: proposition Worst-case and root-sum-square tolerances {#prop-wc-rss}
(a) **Worst case.** If every $X_i$ lies within $\mu_i \pm t_i$, then $G$ lies within $G_0 \pm t_\text{WC}$, where $G_0 = \sum a_i\mu_i$ and
$$
t_\text{WC} = \sum_{i=1}^{m} \lvert a_i\rvert\, t_i,
$$ {#eq-wc}
and the bound is attained.

(b) **Root sum square.** If the $X_i$ are independent random variables with means $\mu_i$ and standard deviations $\sigma_i$, then $G$ has mean $G_0$ and standard deviation $\sigma_G = \sqrt{\sum a_i^2\sigma_i^2}$. If, further, each tolerance corresponds to $t_i = 3\sigma_i$ and $G$ is normally distributed, then the $\pm3\sigma$ tolerance of the gap is
$$
t_\text{RSS} = \sqrt{\sum_{i=1}^{m} a_i^2\, t_i^2},
$$ {#eq-rss}
and about $0.27\,\%$ of assemblies fall outside $G_0 \pm t_\text{RSS}$.
:::

::: proof
(a) $G - G_0 = \sum a_i(X_i - \mu_i)$, and $\lvert X_i - \mu_i\rvert \le t_i$, so by the triangle inequality $\lvert G - G_0\rvert \le \sum\lvert a_i\rvert t_i$. Choosing every $X_i$ at the limit $\mu_i + t_i\,\mathrm{sgn}(a_i)$ gives equality, so the bound is attained.

(b) Expectation is linear, so $\E[G] = \sum a_i\mu_i = G_0$. For independent variables the covariances vanish and $\Var(G) = \sum a_i^2\Var(X_i) = \sum a_i^2\sigma_i^2$. Substituting $\sigma_i = t_i/3$ gives $\sigma_G = \frac13\sqrt{\sum a_i^2t_i^2}$, and $3\sigma_G = t_\text{RSS}$. If each $X_i$ is normal, $G$ is exactly normal; otherwise the central limit theorem makes it approximately normal when there are several contributors of similar size. The fraction of a normal distribution outside $\pm3\sigma$ is $2(1 - \Phi(3)) = 0.0027$.

Assumptions: independent contributors (no common cause such as one worn tool making all parts large), processes centred on nominal, and $t_i = 3\sigma_i$ (a process capability index $C_p = 1$). If these fail, the RSS result is optimistic.
:::

For $m$ equal tolerances $t$, $t_\text{WC} = mt$ but $t_\text{RSS} = \sqrt m\,t$. The difference grows with the number of contributors: worst-case design for a long stack forces every part to a tight and expensive tolerance in order to guard against a combination — every part at the same extreme — that almost never occurs. Statistical tolerancing accepts a small, predictable reject or rework rate in exchange for looser part tolerances.

::: widget plot
f: t*x; t*sqrt(x); t*sqrt(3*x)
x: 1, 12
y: 0, 1.5
sliders: t=0.05:0.01:0.12:0.01
labels: t_\text{WC} = m t; t_\text{RSS} = \sqrt{m}\,t\ \text{(normal)}; \sqrt{3m}\,t\ \text{(uniform parts)}
caption: Tolerance of an assembly gap against the number of contributors $m$, each toleranced $\pm t$ mm (slider). The worst-case line grows linearly, the RSS curve only as $\sqrt m$: with 9 contributors the worst-case tolerance is three times the RSS one. The third curve is the statistical tolerance when each part is uniformly distributed across its tolerance band (σ = t/√3, Exercise 9) — a pessimistic assumption that lies between the other two. Move $t$ and notice that all three scale with it; only $m$ changes their ratio.
:::

::: example Axial play of a shaft assembly {#ex-stack}
A shaft carries two bearings separated by a spacer inside a housing; a retaining ring closes the housing. The axial play is the housing internal width minus the bearing–spacer–bearing stack. Dimensions (mm): housing width $H = 50.50 \pm 0.10$, bearings $B_1 = B_2 = 15.00 \pm 0.05$, spacer $S = 20.00 \pm 0.08$. The specification requires a play between $0.20$ and $0.80\,\mathrm{mm}$. Find the play range by worst case and by RSS.
::: solution
Dimension loop: $G = H - B_1 - S - B_2$, so $a_H = +1$ and the others are $-1$. Nominal play $G_0 = 50.50 - 15.00 - 20.00 - 15.00 = 0.50\,\mathrm{mm}$.

Worst case: $t_\text{WC} = 0.10 + 0.05 + 0.08 + 0.05 = 0.28\,\mathrm{mm}$, play $0.22$ to $0.78\,\mathrm{mm}$ — inside the requirement.

RSS: $t_\text{RSS} = \sqrt{0.10^2 + 0.05^2 + 0.08^2 + 0.05^2} = \sqrt{0.0214} = 0.146\,\mathrm{mm}$, play $0.354$ to $0.646\,\mathrm{mm}$ at $\pm3\sigma$.

Since the worst case already meets the requirement, every assembly is good. The RSS result says more: with $\sigma_G = 0.0488\,\mathrm{mm}$ the requirement limits are $0.30/0.0488 = 6.2$ standard deviations from nominal, so the tolerances are tighter than needed. That invites the question of [[#ex-stack-loosen]].

**Sanity check.** $t_\text{RSS} < t_\text{WC}$ and $t_\text{RSS} \ge$ the largest single tolerance ($0.10$) ✓ — both always hold.
:::

:::

::: example Loosening the tolerances {#ex-stack-loosen}
To cut machining cost, all four tolerances in [[#ex-stack]] are widened by 50 % (to $\pm0.15$, $\pm0.075$, $\pm0.12$, $\pm0.075$ mm). Is the design still acceptable? Estimate the fraction of assemblies outside the $0.20$–$0.80\,\mathrm{mm}$ requirement, assuming centred normal processes with $t_i = 3\sigma_i$.
::: solution
Worst case: $t_\text{WC} = 1.5\times0.28 = 0.42\,\mathrm{mm}$, play $0.08$ to $0.92\,\mathrm{mm}$ — the worst-case analysis rejects the change.

Statistically: $t_\text{RSS} = 1.5\times0.146 = 0.219\,\mathrm{mm}$, so $\sigma_G = 0.0731\,\mathrm{mm}$. The limits are $\pm0.30\,\mathrm{mm}$ from nominal, $z = 0.30/0.0731 = 4.10$ standard deviations. The fraction outside is $2(1 - \Phi(4.10)) = 4.1\times10^{-5}$, about 41 assemblies per million.

Whether 41 per million is acceptable is a business and safety decision. For a domestic appliance where an out-of-tolerance assembly is caught at end-of-line test and reshimmed, it almost certainly is; for an aircraft actuator it may not be, and the analysis would also need to be checked against the assumptions (independence, centring) by measuring process capability.

**Sanity check.** With the original tolerances, $z = 0.30/0.0488 = 6.15$ and the reject fraction is about $8\times10^{-10}$; loosening by 50 % multiplies $\sigma$ by $1.5$ and the reject rate rises by about five orders of magnitude, as expected from the steep tail of the normal distribution.
:::

:::

::: widget distribution
dist: normal
params: mu=0.5, sigma=0.0731
a: 0.2
b: 0.8
caption: Distribution of the axial play in [[#ex-stack-loosen]] (mm). The shaded area between the requirement limits 0.20 and 0.80 mm is almost all of the distribution. Increase σ to see how quickly the tails cross the limits; shift μ to 0.4 to see that an off-centre process (for example a housing machined consistently near its lower limit) can matter more than the spread.
:::

## Prototyping and testing {#sec-prototyping}

A layout and its calculations are a prediction. Prototypes and tests check the prediction where the models are weakest.

::: definition Kinds of prototype {#def-prototype}
Following Ulrich and Eppinger, prototypes are classified along two dimensions. **Physical** prototypes are tangible artefacts; **analytical** prototypes are mathematical or computer models (a finite-element model, a multibody simulation, a spreadsheet of tolerances). **Focused** prototypes implement one or a few attributes (a foam model for ergonomics, a test rig for one bearing); **comprehensive** prototypes implement most attributes. In product development the main physical stages are:
- **proof-of-concept** prototypes — focused, often crude, to show that a working principle works;
- **alpha** prototypes — parts with the intended geometry and materials but usually not made by the production processes, used to check that the design works as intended;
- **beta** prototypes — parts made by the intended production processes (or close to them), assembled and tested by the firm and often by selected customers, used to check reliability, performance in the field and the remaining open problems;
- **pre-production** units — made on the production line, to check the process itself.
:::

Prototypes serve four purposes: learning (will it work? how well?), communication (with management, customers, suppliers), integration (do the parts fit and work together?) and milestones (has the design reached a stage that justifies the next investment?). A good prototyping plan builds a prototype to reduce the largest uncertainty for the money, which usually means focused prototypes of the riskiest elements early and comprehensive ones later.

Tests fall into two families. **Verification** tests check that the design meets its specification ("did we build it right?"): load tests to the design load times a proof factor, fatigue tests, environmental tests (temperature, humidity, vibration, ingress protection), electromagnetic compatibility. **Validation** tests check that the product meets the user's need ("did we build the right thing?"): field trials, user studies. A test plan states for each requirement the test method, the sample size, the pass criterion and the conditions.

How many units must be tested? A test to show that a product meets a reliability target is a statistical experiment, and the simplest such test has a neat answer.

::: proposition Zero-failure (success-run) test {#prop-success-run}
If $n$ independent units are each tested for the specified duration and none fails, then the reliability $R$ over that duration is demonstrated to be at least $R_0$ with confidence $C$ provided
$$
n \ge \frac{\ln(1 - C)}{\ln R_0}.
$$ {#eq-success-run}
:::

::: proof
Suppose the true reliability were exactly $R_0$. Each unit survives independently with probability $R_0$, so the probability that all $n$ survive is $R_0^n$ (a binomial probability with zero failures). If the true reliability were lower, all-pass would be even less likely. So if $R_0^n \le 1 - C$, an all-pass result would occur with probability at most $1 - C$ for any product with $R \le R_0$; observing it lets us reject "$R \le R_0$" at confidence $C$. Taking logarithms of $R_0^n \le 1 - C$ and dividing by $\ln R_0 < 0$ (which reverses the inequality) gives the result. Assumptions: the test duration and conditions represent the specified use, units are independent and representative of production, and the test ends without failures.
:::

::: example Planning a fatigue qualification test {#ex-success-run}
A bicycle crank must survive a specified fatigue test (a number of load cycles at a defined load). The design team wishes to demonstrate $R = 0.90$ with $90\,\%$ confidence by a zero-failure test. How many cranks must be tested? What if the confidence is raised to $95\,\%$?
::: solution
From [[#eq-success-run]]: $n \ge \ln(0.10)/\ln(0.90) = (-2.303)/(-0.1054) = 21.85$, so $n = 22$ cranks, all of which must pass.

At $95\,\%$ confidence: $n \ge \ln(0.05)/\ln(0.90) = 28.4$, so $n = 29$.

**Sanity check.** $0.9^{22} = 0.098 < 0.10$ ✓ and $0.9^{21} = 0.109 > 0.10$ ✓, so 22 is the smallest sufficient number. Demonstrating high reliabilities this way is expensive — $R = 0.99$ at 90 % needs 230 units — which is why test engineers test beyond the specified life or at higher loads and use a life model (such as the Weibull model of [[design-process/reliability-risk]]) to translate back.
:::

:::

::: quiz
A stack-up has 16 contributors, each toleranced $\pm0.02\,\mathrm{mm}$, independent and centred, with $t_i = 3\sigma_i$. What are the worst-case and RSS tolerances of the gap?
- [ ] $\pm0.32$ and $\pm0.16\,\mathrm{mm}$
- [x] $\pm0.32$ and $\pm0.08\,\mathrm{mm}$
- [ ] $\pm0.08$ and $\pm0.02\,\mathrm{mm}$
- [ ] $\pm0.32$ and $\pm0.32\,\mathrm{mm}$
::: solution
Worst case: $16\times0.02 = 0.32\,\mathrm{mm}$. RSS: $\sqrt{16}\times0.02 = 4\times0.02 = 0.08\,\mathrm{mm}$. With many contributors the RSS tolerance is much smaller — provided the assumptions of [[#prop-wc-rss]] hold.
:::
:::

## Detail design and design review {#sec-detail}

In detail design the decisions become numerous and individually small, but together they determine most of the manufacturing cost. The tasks are: final dimensions and tolerances (allocated from the stack-ups), geometric tolerances and datum schemes, surface finishes, material specifications and heat treatments, standard parts (bearings, seals, fasteners, from catalogues), drawings and three-dimensional models with product manufacturing information, parts lists (bills of materials), and assembly, inspection and maintenance instructions. The checklists of [[design-process/design-for-manufacture]] apply part by part.

Design reviews are held at the end of embodiment and of detail design. A review is effective when the people present include those who will make, assemble, test, sell and service the product, when the material is circulated in advance, and when it ends with a recorded list of actions and owners. Reviews look at function and performance against the specification, the calculations and their assumptions, safety and risk analyses, manufacture and assembly, cost, and compliance with standards and regulations ([[design-process/ethics-standards]]).

::: history
The systematic treatment of embodiment design grew out of the German engineering-design school. Gerhard Pahl and Wolfgang Beitz published *Konstruktionslehre* in 1977; its English translation, *Engineering Design: A Systematic Approach*, edited by Ken Wallace, appeared in 1984, and the book's basic rules of clarity, simplicity and safety and its principles of force transmission, division of tasks and self-help became the standard vocabulary of the field. The concept of product architecture and its modular and integral types was set out by Karl Ulrich in "The role of product architecture in the manufacturing firm" (*Research Policy*, 1995), and became a chapter of Ulrich and Eppinger's *Product Design and Development*, first published in 1995.
:::

::: summary
- Embodiment design gives a selected concept its arrangement, form, materials and principal dimensions; detail design completes the definition into technical documentation.
- Product architecture maps functional elements onto chunks and defines their interfaces. Modular architectures (slot, bus, sectional) favour variety, change and parallel work; integral ones favour mass, size and unit cost. Interfaces are frozen early and controlled.
- Basic rules: clarity, simplicity, safety (direct, then indirect, then warnings). Principles: direct and axial load paths, uniform strength, matched deformations, balanced forces; division of tasks; self-help; fault-free design.
- Sizing reverses analysis: loads → failure modes → criteria with a factor of safety → governing dimension → standard size → recheck. Stiffness often governs.
- Stack-ups: $t_\text{WC} = \sum\lvert a_i\rvert t_i$ guarantees every assembly; $t_\text{RSS} = \sqrt{\sum a_i^2t_i^2}$ assumes independent, centred, normal contributors with $t = 3\sigma$ and allows looser tolerances at a predictable reject rate.
- Prototypes are physical or analytical, focused or comprehensive; alpha prototypes test the design, beta the production design. A zero-failure test of $n \ge \ln(1-C)/\ln R_0$ units demonstrates reliability $R_0$ at confidence $C$.
:::

## Exercises

::: exercise Counting interfaces {#exr-interfaces level=1 check="15"}
A product is divided into 6 chunks. In the worst (fully integral) case every chunk interacts directly with every other. How many pairwise interfaces must be specified? (Enter the number.)
::: solution
Each pair of chunks has one interface: $\binom62 = 6\times5/2 = 15$. A bus architecture in which all 6 chunks connect only to a common seventh element needs just 6 interface instances of one standard type — one reason bus modularity simplifies design.
:::
:::

::: exercise Worst-case stack {#exr-wc level=1 check="0.2"}
A gap is formed by three dimensions toleranced $\pm0.05$, $\pm0.10$ and $\pm0.05\,\mathrm{mm}$. What is the worst-case tolerance of the gap? (Enter $t_\text{WC}$ in mm.)
::: solution
$t_\text{WC} = 0.05 + 0.10 + 0.05 = 0.20\,\mathrm{mm}$, independent of the signs $a_i = \pm1$.
:::
:::

::: exercise RSS stack {#exr-rss level=1 check="0.122"}
For the same three dimensions, find the RSS tolerance of the gap, assuming independent, centred normal processes with $t_i = 3\sigma_i$. (Enter $t_\text{RSS}$ in mm, rounded to three decimal places.)
::: solution
$t_\text{RSS} = \sqrt{0.05^2 + 0.10^2 + 0.05^2} = \sqrt{0.0150} = 0.1225\,\mathrm{mm}$, which rounds to $0.122\,\mathrm{mm}$ (the exact value is $0.12247$). It is dominated by the largest contributor: reducing the $\pm0.10$ tolerance would help most.
:::
:::

::: exercise Torque from power {#exr-torque level=1 check="19.10"}
A gear motor delivers $3.0\,\mathrm{kW}$ at $1500\,\mathrm{rev/min}$. What torque does its output shaft carry? (Enter $T$ in N·m, rounded to two decimal places.)
::: solution
$\omega = 1500\times2\pi/60 = 157.08\,\mathrm{rad/s}$; $T = P/\omega = 3000/157.08 = 19.099\,\mathrm{N\,m} \approx 19.10\,\mathrm{N\,m}$.
:::
:::

::: exercise Shaft diameter for strength {#exr-shaft level=2 check="21"}
A solid shaft carries a steady torque of $100\,\mathrm{N\,m}$. The allowable shear stress (yield strength in shear divided by the factor of safety) is $60\,\mathrm{MPa}$. Find the minimum diameter and round it up to the next whole millimetre. (Enter $d$ in mm.)
::: solution
$d \ge (16T/(\pi\tau_\text{allow}))^{1/3} = (16\times100/(\pi\times60\times10^6))^{1/3} = 0.02040\,\mathrm m = 20.4\,\mathrm{mm}$, so $d = 21\,\mathrm{mm}$. Check: $\tau = 16\times100/(\pi\times0.021^3) = 55.0\,\mathrm{MPa} \le 60\,\mathrm{MPa}$ ✓. A designer would probably go on to a preferred size such as 22 or 25 mm to suit standard bearings and seals, and then check stiffness.
:::
:::

::: exercise Choosing a nominal size {#exr-nominal level=2 check="49.38"}
A housing of internal width $H \pm 0.08\,\mathrm{mm}$ contains three parts of length $12.00\pm0.05$, $25.00\pm0.10$ and $12.00\pm0.05\,\mathrm{mm}$ in a row. The gap must never be less than $0.10\,\mathrm{mm}$ (worst case). What is the smallest nominal housing width $H$? (Enter $H$ in mm.)
::: solution
Gap $G = H - (12 + 25 + 12) = H - 49.00$ nominally, with $t_\text{WC} = 0.08 + 0.05 + 0.10 + 0.05 = 0.28\,\mathrm{mm}$. The minimum gap is $H - 49.00 - 0.28 \ge 0.10$, so $H \ge 49.38\,\mathrm{mm}$. Then the maximum gap is $49.38 - 49.00 + 0.28 = 0.66\,\mathrm{mm}$, which must also be checked against the function.
:::
:::

::: exercise A reliability demonstration test {#exr-success level=2 check="45"}
How many units must pass a zero-failure test to demonstrate a reliability of $0.95$ with $90\,\%$ confidence? (Enter the number of units.)
::: solution
$n \ge \ln(0.10)/\ln(0.95) = 2.303/0.0513 = 44.9$, so $45$ units. Check: $0.95^{45} = 0.099 < 0.10$ ✓, $0.95^{44} = 0.105$ ✗.
:::
:::

::: exercise Load path of a wall-mounted shelf {#exr-shelf level=2}
A shelf bracket carries $1.2\,\mathrm{kN}$ at $250\,\mathrm{mm}$ from a wall. Sketch two layouts, one in bending and one triangulated, and for each draw the free-body diagram and find the force in each member or the bending moment at the wall. Which loads end up in the wall fixings in each case, and what does that imply for the choice of wall plugs?
::: solution
**Cantilever.** At the wall: vertical shear $1.2\,\mathrm{kN}$ and moment $M = 1.2\times0.25 = 0.30\,\mathrm{kN\,m}$. The moment is resisted by a couple between the fixings: if the top and bottom fixings are $h = 100\,\mathrm{mm}$ apart and the bracket pivots about its bottom edge, the top fixing is pulled out of the wall with about $M/h = 3.0\,\mathrm{kN}$, two and a half times the shelf load.

**Triangulated, strut at $45^\circ$ below.** Joint at the load: strut compression $1.2/\sin45^\circ = 1.70\,\mathrm{kN}$, tie tension $1.2\,\mathrm{kN}$. At the wall the tie pulls the top fixing out with $1.2\,\mathrm{kN}$ and the strut pushes the bottom against the wall with $1.2\,\mathrm{kN}$ horizontally and $1.2\,\mathrm{kN}$ vertically.

The direct load path reduces the pull-out force on the top fixing from about $3\,\mathrm{kN}$ to $1.2\,\mathrm{kN}$; pull-out of the plug is usually the critical failure mode, so the triangulated layout is safer for the same plug. Making the cantilever's backplate taller (larger $h$) helps in the same way.
:::
:::

::: exercise Statistical tolerancing with uniform distributions {#exr-uniform level=3 check="0.346"}
Some processes produce dimensions spread roughly uniformly across the tolerance band (for example a tool that wears steadily between resettings). (a) Show that a uniform distribution on $[\mu - t, \mu + t]$ has $\sigma = t/\sqrt3$. (b) Show that for $m$ independent uniform contributors each of tolerance $t$, the $3\sigma$ tolerance of the gap is $\sqrt{3m}\,t$, and compare with the worst-case and normal-RSS values. (c) Evaluate the $3\sigma$ tolerance for $m = 4$, $t = 0.1\,\mathrm{mm}$. (Enter it in mm, rounded to three decimal places.)
::: solution
(a) The variance of a uniform distribution of width $2t$ is $(2t)^2/12 = t^2/3$, so $\sigma = t/\sqrt3$.

(b) $\sigma_G^2 = m\,t^2/3$, so $3\sigma_G = 3t\sqrt{m/3} = \sqrt{3m}\,t$. This is $\sqrt3 = 1.73$ times the normal RSS value $\sqrt m\,t$, and smaller than the worst case $mt$ when $m > 3$. For $m \le 3$ it gives $\ge$ the worst case, which shows the $3\sigma$ statement is meaningless there: with few uniform contributors the gap is not close to normal, and the worst case is the correct bound. A common practical compromise is to multiply the RSS tolerance by an inflation factor of about $1.5$.

(c) $\sqrt{12}\times0.1 = 0.3464\,\mathrm{mm} \approx 0.346\,\mathrm{mm}$, against $0.4\,\mathrm{mm}$ worst case and $0.2\,\mathrm{mm}$ normal RSS.
:::
:::

::: exercise Architecture of a cordless tool range {#exr-architecture level=3}
A company plans a range of 12-volt and 18-volt cordless tools: drill, impact driver, jigsaw, circular saw and a work light. Propose an architecture. Identify the chunks, say which are shared across the range and which are specific, choose the type of modularity for the battery interface, list the fundamental and incidental interactions at that interface, and state what the interface control document must specify. What are the costs of the modular choice?
::: solution
A reasonable answer: chunks are the battery pack, the motor and its electronic controller, the transmission (gearbox, clutch, chuck or blade drive), the housing with grip and trigger, and tool-specific attachments (chuck, saw blade guard, lamp head). Shared across the range: battery packs and charger (one per voltage), possibly motor families and trigger switches; specific: transmissions and housings.

The battery interface is a **bus** (or slot shared by all tools of one voltage): every tool presents an identical receptacle. Fundamental interactions: mechanical retention under the tool's vibration and drop loads, electrical power (voltage, peak current), and data (cell temperature, state of charge, overcurrent protection signals). Incidental ones: heat from the motor and pack, vibration fatigue of the contacts, water and dust ingress, and the moment from the pack's mass in a drop.

The ICD specifies rail geometry and tolerances, latch force and drop-test retention requirements, contact layout, current rating and voltage range, communication protocol, temperature limits, ingress-protection rating, and keying that prevents a pack of the wrong voltage from being fitted (fault-free design). Costs of modularity: each tool carries a receptacle sized for the largest pack and the highest current, the interface cannot be optimised for one tool, and freezing it limits later improvements; compatibility must be kept for years, because customers' investment is in packs.
:::
:::

## Further reading

Pahl, Beitz, Feldhusen and Grote, *Engineering Design: A Systematic Approach* (3rd English edition, Springer, 2007), is the source of the basic rules and principles of embodiment and gives many illustrations. Ulrich, Eppinger and Yang, *Product Design and Development* (7th edition, McGraw-Hill, 2020), covers product architecture, prototyping and industrial design from a product-development viewpoint. For tolerance analysis in more depth — non-linear stacks, geometric tolerances in stack-ups, Monte Carlo simulation — see the tolerancing chapters of standard machine-design texts and the companion chapter [[engineering-graphics/geometric-tolerancing]].
