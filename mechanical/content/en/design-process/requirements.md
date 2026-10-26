A design brief usually arrives as a sentence: "we need a cheaper cordless drill", "the hospital wants a bed that one nurse can move", "the pump must survive the monsoon season". Nothing in such a sentence can be calculated, drawn or tested. The first real piece of engineering in a project is to turn it into a **specification**: a list of statements, each of which names a measurable property of the product, a value it must reach and the way that value will be checked. Every later decision — which concept to develop ([[design-process/concept-generation]], [[design-process/concept-selection]]), how big to make a shaft ([[design-process/embodiment-design]]), how many prototypes to test — is judged against that list. A specification that is vague cannot settle arguments; one that is wrong sends a capable team efficiently in the wrong direction.

This chapter follows the path from need to specification. It starts with finding out what users actually need, separates needs from requirements and specifications, shows how a need becomes a metric with a target value, and introduces the four ways of verifying a requirement. Two classical tools then organise the information: the Kano model, which sorts needs by how they affect satisfaction, and quality function deployment (QFD), which translates weighted customer needs into priorities among engineering metrics. The chapter ends with traceability and change control, and with a quantitative look at verification by test — how many units must pass a test before a reliability requirement can be claimed. The overall design process into which this fits is described in [[design-process/design-process-overview]].

## From needs to specifications {#sec-needs}

### Finding out what is needed

Users rarely state their needs in a form an engineer can use, and they rarely state all of them. Experienced teams therefore gather needs in several complementary ways:

- **Interviews** with individual users in their own setting, using open questions ("walk me through the last time you…") rather than asking people to design the product. One person at a time avoids the group conformity of focus groups.
- **Observation of use** (sometimes called contextual inquiry): watching a mechanic change a pump seal or a nurse move a bed reveals workarounds, improvised tools and difficulties that nobody thinks to mention because they have become routine.
- **Lead users** — people who experience a need earlier or more intensely than the market as a whole, such as professional tradespeople for a power tool — often have already modified existing products and can describe needs the mass market will feel later.
- **Documents and data**: complaint and warranty records of the current product, field-failure reports, accident statistics, regulations and standards that the product must satisfy.
- **All the stakeholders**, not just the purchaser: the user, the person who installs, maintains, transports, sells, recycles or regulates the product. A hospital bed is bought by a procurement office, used by patients, moved by porters, cleaned by housekeeping staff and serviced by technicians; each group has needs.

The raw output is a long list of statements in the customers' own words. The next step is to rewrite each as a need statement.

::: definition Customer need, requirement and specification {#def-need}
A **customer need** is a statement, independent of any particular solution, of an attribute the product should have from the point of view of a stakeholder ("the drill lasts a full working day without recharging"). A **requirement** is a need restated by the design team as a property that the product *shall* have, in engineering language and bounded by conditions ("the drill shall drive at least 100 screws of size $5\times 50\,\mathrm{mm}$ into softwood on one charge"). A **specification** (or target specification) is the set of requirements, each made precise by a **metric** (a measurable quantity with a unit), a **target value** (or range) and a **verification method**. A requirement that limits the solution without being traded against others — a law, a standard, an interface dimension — is a **constraint**; one that should be made as good as possible is an **objective**.
:::

Guidelines for writing need statements, following Ulrich and Eppinger, are to express *what* the product must do and not *how* ("the handle stays cool" rather than "the handle is made of nylon"), to keep the specificity of the raw data, to use positive phrasing, and to describe an attribute of the product rather than an obligation of the user. The point of writing needs without solutions is to keep the concept space open: if the need is recorded as "nylon handle", nobody will later consider an insulating air gap.

### Metrics, target values and their ranges

A need becomes useful to an engineer only when it is attached to a **metric** that can be measured on a prototype. The metric is usually indirect: "feels light in the hand" becomes mass in kilograms *and* the distance of the centre of mass from the grip; "lasts a full day" becomes stored energy in watt-hours under a defined duty cycle. A good metric is

- **dependent** on the product, not on how well the test is run;
- **practical** — measurable with available equipment at reasonable cost;
- **complete** together with the others, so that meeting all metrics really does satisfy the need.

Target values are rarely single numbers early in a project. A common practice is to record a **marginal value** (the value that would just make the product commercially viable) and an **ideal value** (the best that could be hoped for), and to narrow the range only after the concept is chosen and its capabilities are known. Benchmarking — measuring competitors' products against the same metrics — anchors both values in reality.

::: example From "lasts a full day" to a battery specification {#ex-battery}
Interviews with carpenters fitting kitchen units produce the need "the drill lasts a full working day without recharging". Observation shows that a heavy day involves driving about 100 screws of $5\times 50\,\mathrm{mm}$ into softwood, each needing about 8 turns at an average torque of $5\,\mathrm{N\,m}$ once the thread has engaged. Assume an overall efficiency from battery to chuck (motor, electronics and gearbox) of $60\,\%$ and that only $80\,\%$ of the rated battery energy may be used to protect cell life. Derive a battery-energy target and the corresponding capacity at a nominal $18\,\mathrm V$.
::: solution
Mechanical work per screw: $W = T\theta = 5\,\mathrm{N\,m}\times(8\times2\pi\,\mathrm{rad}) = 251.3\,\mathrm J$.
Battery energy per screw at $60\,\%$ efficiency: $251.3/0.60 = 418.9\,\mathrm J$.
For 100 screws: $41\,890\,\mathrm J = 41.89\times10^{3}/3600\,\mathrm{Wh} = 11.64\,\mathrm{Wh}$.
Rated energy with $80\,\%$ usable: $11.64/0.80 = 14.54\,\mathrm{Wh}$.
Capacity at $18\,\mathrm V$: $14.54\,\mathrm{Wh}/18\,\mathrm V = 0.808\,\mathrm{Ah}$.
A sensible specification therefore reads: *metric* rated pack energy; *marginal value* $15\,\mathrm{Wh}$; *ideal value* $30\,\mathrm{Wh}$ (a margin for harder timber, drilling and ageing cells); *verification* test — drive screws on a standard fixture until the pack cuts out. Sanity check: commercial $18\,\mathrm V$ packs are sold in sizes of roughly $1.5$ to $5\,\mathrm{Ah}$ (about 27 to 90 Wh), well above our marginal value, which is consistent with the fact that real users also drill holes, which take far more energy than driving screws. The estimate sets a floor; benchmarking sets the ideal.
:::
:::

### Writing requirements that can be checked

A requirement is written as one sentence with *shall*, one property per sentence, with the conditions under which it applies and a value with a unit: "With a $300\,\mathrm{kg}$ load centred on the mattress platform, the bed *shall* be movable on a level floor by a horizontal hand force not exceeding $200\,\mathrm N$." The requirements-engineering standard ISO/IEC/IEEE 29148 lists the characteristics a well-formed requirement should have; for mechanical products the most important are that each requirement is **necessary** (traceable to a need or constraint), **unambiguous** (one reading only), **singular** (one property), **feasible**, and **verifiable**. Words such as *adequate*, *easy*, *robust*, *user-friendly*, *as far as possible* and *etc.* make a requirement unverifiable and should be replaced by numbers or deleted.

::: warning Writing the solution into the requirement
"The housing shall be die-cast aluminium" is not a requirement but a design decision, and writing it into the specification at the start forecloses moulded polymer, sheet metal and every other option before they have been considered. Ask *why* the statement was made: if the answer is "because it must dissipate $40\,\mathrm W$ with a surface temperature below $60\,^\circ\mathrm C$" or "because it must survive a $1\,\mathrm m$ drop onto concrete", write *that*. Genuine solution constraints do exist — the product must fit an existing bolt pattern, or the factory has only one kind of press — but record them as constraints with their reason, so that they can be challenged if the reason disappears.
:::

### Verification and validation {#sec-verification}

Every requirement carries the method by which it will be shown to be met. Four methods are standard in systems engineering:

::: definition Verification methods {#def-verification}
- **Inspection**: examination by the senses or simple measurement of the product or its documentation (a label is present, a dimension is within tolerance, the drawing calls up the right material).
- **Analysis**: calculation or simulation from validated models (a stress analysis shows the safety factor; a thermal model predicts surface temperature) — used when testing is impossible, dangerous or too costly, or as evidence before hardware exists.
- **Demonstration**: operation of the product to show a function works, without detailed measurement (the bed can be steered through a standard doorway).
- **Test**: operation under controlled conditions with measurement and recorded data, often to a standard procedure (a drop test, a fatigue test, a measured noise level).
:::

**Verification** asks "did we build the product right?" — does the product meet its specification? **Validation** asks "did we build the right product?" — does it satisfy the users' needs in real use? A product can pass every verification test and still fail validation if the specification was wrong, which is why prototypes are put in front of real users early and why the trace from each requirement back to a need ([[#sec-traceability]]) matters.

::: example Choosing verification methods {#ex-verification}
Assign a verification method to each requirement for a manually moved hospital bed:
(a) The bed shall carry the label required by the applicable medical-device regulation.
(b) The castor brakes shall hold the loaded bed on a $6^\circ$ ramp.
(c) The frame shall withstand $2\times10^5$ cycles of the mattress-platform load without cracking.
(d) The side rails shall be raised and lowered by one person with one hand.
(e) The head section's pivot pin shall have a safety factor of at least 3 against yield.
::: solution
(a) Inspection — look for the label and check its content.
(b) Test — place the loaded bed on a ramp of the stated angle, measure any movement. (A calculation of the brake friction could support it, but the requirement is cheap and important to test.)
(c) Test, supported by analysis — a fatigue test of one or more frames on a rig; before the rig exists, a fatigue analysis ([[machine-design]]) predicts the result and sets the test conditions.
(d) Demonstration — several people of different statures operate the rails; there is no single number to record. (If the operating force matters, the requirement should be rewritten with a force limit and then *tested*.)
(e) Analysis — a stress calculation of the pin; a test to destruction would only show that one pin's safety factor is above 3, not by how much.
Check: every requirement got exactly one primary method, and the method matches the kind of evidence the statement asks for — a requirement verified "by demonstration" that contains a number is a sign that the requirement or the method is wrong.
:::
:::

## Not all needs are equal: the Kano model {#sec-kano}

Customers react differently to different attributes. A car's brakes must work; nobody is delighted that they do, but everyone is furious if they fail. Fuel economy pleases in proportion to how good it is. A feature nobody expected — say, a tool that tells you when a screw is fully seated — can delight even if executed modestly, and its absence disappoints nobody. Noriaki Kano and colleagues formalised these observations in 1984.

::: definition Kano categories {#def-kano}
For a product attribute with degree of fulfilment $x$ (from absent to fully present) and customer satisfaction $s$:
- a **must-be** (basic) attribute causes strong dissatisfaction when absent and no more than neutrality when present;
- a **one-dimensional** (performance) attribute increases satisfaction roughly in proportion to its fulfilment;
- an **attractive** (delighter) attribute causes no dissatisfaction when absent and growing satisfaction when present;
- an **indifferent** attribute affects satisfaction little either way;
- a **reverse** attribute is one whose presence some customers actively dislike.
:::

Kano's questionnaire asks each respondent two questions about an attribute — a *functional* one ("How do you feel if the drill *has* an LED work light?") and a *dysfunctional* one ("How do you feel if it does *not*?") — each answered with one of: I like it, I expect it, I am neutral, I can live with it, I dislike it. The pair of answers is classified with a standard table: like/dislike is one-dimensional; like/neutral (or like/live-with, like/expect) is attractive; expect/dislike, neutral/dislike or live-with/dislike is must-be; the middle answers on both questions are indifferent; and dislike when present with like when absent is reverse. Each attribute is assigned the category most respondents fall into.

::: widget plot
f: -exp(-3*x); x - 0.5; exp(3*(x - 1)); 0*x
x: 0, 1
y: -1.1, 1.1
labels: \text{must-be}; \text{one-dimensional}; \text{attractive}; \text{indifferent}
caption: Stylised Kano curves: customer satisfaction (vertical, from dissatisfied $-1$ to delighted $+1$) against the degree to which an attribute is provided (horizontal, from absent $0$ to fully provided $1$). These are illustrations of the categories, not fitted data. Notice that the must-be curve never rises above zero — no amount of a basic attribute delights — while the attractive curve never drops below zero. Over time attributes drift downward through the categories: yesterday's delighter (a work light on a drill) becomes today's expected feature.
:::

The engineering consequence is that targets should be set differently by category. Must-be attributes need a threshold that is met with certainty — they are typically the constraints and safety requirements. One-dimensional attributes are traded against cost in the specification; this is where benchmarking and the QFD of the next section matter most. Attractive attributes are where a product can differentiate itself cheaply, but they become must-be features as competitors copy them.

::: example Classifying attributes from survey answers {#ex-kano}
Twenty professional users answered the Kano questions for three attributes of a cordless drill. The most frequent answer pairs (functional / dysfunctional) were:
(a) battery charge indicator — "I expect it" / "I dislike it" (14 of 20);
(b) run time per charge — "I like it" / "I dislike it" (12 of 20);
(c) Bluetooth link to a phone app — "I am neutral" / "I am neutral" (11 of 20), with 6 answering "I like it" / "I am neutral".
Classify each attribute and say what it means for the specification.
::: solution
(a) Expect/dislike is *must-be*: the charge indicator must be present, but more elaborate versions will not raise satisfaction. Specify it as a constraint (verified by inspection) and spend no more on it than needed.
(b) Like/dislike is *one-dimensional*: more run time steadily increases satisfaction. It belongs in the specification as an objective with marginal and ideal values ([[#ex-battery]]), to be traded against mass and cost.
(c) The majority answer is *indifferent*, with a minority (6 of 20, 30 %) seeing it as *attractive*. For this group of users the feature does not justify its cost and complexity in the base product; it might be offered in a variant for a segment where it is attractive.
Check: the categories add up — 14 of 20 must-be for (a) is a clear majority; for (c) the decision follows the majority but the minority view is recorded, which is what a careful team would report.
:::
:::

## Quality function deployment {#sec-qfd}

Once needs have been weighted and metrics chosen, the team must decide which metrics matter most: which ones to benchmark carefully, where to spend development effort, where conflicts between metrics will have to be resolved. **Quality function deployment** (QFD), developed in Japanese industry in the late 1960s and 1970s and popularised in the West by Hauser and Clausing's 1988 article "The House of Quality", is a structured way of doing this with a matrix.

::: definition House of Quality {#def-hoq}
The **House of Quality** is a chart whose rows are the customer needs $i = 1,\dots,m$ with importance weights $w_i$ and whose columns are the engineering metrics $j = 1,\dots,n$. Each cell holds a **relationship strength** $r_{ij}$ saying how strongly metric $j$ influences need $i$, conventionally $9$ (strong), $3$ (moderate), $1$ (weak) or $0$ (none). Around this central matrix the "house" adds: a *roof* — a triangular matrix showing whether pairs of metrics support or conflict with each other; a *right wall* — customers' ratings of the current product and competitors against each need; and a *basement* — units, competitors' measured values, technical difficulty and the target values for each metric.
:::

::: algorithm Technical importance in QFD {#alg-qfd}
1. Assign each need an importance $w_i$ (e.g. 1–5 from customer surveys; optionally multiply by an improvement ratio or sales-point factor from the right wall).
2. For each need and metric, assign $r_{ij} \in \{0, 1, 3, 9\}$ by team discussion; most cells should be zero, and every need should have at least one strong relationship (otherwise a metric is missing).
3. Compute the **technical importance** of each metric
$$
t_j = \sum_{i=1}^{m} w_i\,r_{ij}
$$ {#eq-qfd}
and its **relative importance** $t_j \big/ \sum_k t_k$, usually in per cent.
4. Use the ranking to allocate attention: set ambitious targets for high-importance metrics, and examine the roof for conflicts among them.
:::

The 9-3-1 scale deliberately spreads the scores so that strong relationships dominate. The numbers are judgements, so the result is a structured opinion, not a measurement: it is most useful for revealing what the team had not discussed (an empty row, a column with no strong entries) and for making disagreements explicit.

::: example A House of Quality for a cordless drill {#ex-qfd}
Five needs with weights (1–5) and five metrics are related as follows:

| need ($w_i$) | M1 pack energy (Wh) | M2 mass (kg) | M3 max torque (N m) | M4 kickback cut-out | M5 unit cost (£) |
|---|---|---|---|---|---|
| lasts a full day (5) | 9 | 3 | 0 | 0 | 3 |
| light in the hand (4) | 3 | 9 | 3 | 0 | 0 |
| drives large screws (4) | 1 | 0 | 9 | 3 | 1 |
| safe if the bit jams (3) | 0 | 1 | 3 | 9 | 0 |
| affordable (3) | 3 | 0 | 3 | 1 | 9 |

Compute the technical importance and relative importance of each metric.
::: solution
By [[#eq-qfd]], column by column:
M1: $5\cdot9 + 4\cdot3 + 4\cdot1 + 3\cdot0 + 3\cdot3 = 45 + 12 + 4 + 0 + 9 = 70$.
M2: $5\cdot3 + 4\cdot9 + 0 + 3\cdot1 + 0 = 15 + 36 + 3 = 54$.
M3: $0 + 4\cdot3 + 4\cdot9 + 3\cdot3 + 3\cdot3 = 12 + 36 + 9 + 9 = 66$.
M4: $0 + 0 + 4\cdot3 + 3\cdot9 + 3\cdot1 = 12 + 27 + 3 = 42$.
M5: $5\cdot3 + 0 + 4\cdot1 + 0 + 3\cdot9 = 15 + 4 + 27 = 46$.
Total $278$; relative importances $25.2\,\%$, $19.4\,\%$, $23.7\,\%$, $15.1\,\%$, $16.5\,\%$.
Pack energy and torque come first. The roof would show that pack energy conflicts with mass (bigger packs are heavier) and with cost, so the team knows in advance that the specification's hardest trade-off is energy against mass and cost — which is exactly the trade-off battery suppliers' product ranges are built around. Check: the relative importances sum to $100\,\%$, and the most important need (weight 5) has a strong (9) relationship with the top-ranked metric, as one would expect.
:::
:::

::: remark Cascading the house
QFD can be continued downstream: the metrics of the first house become the "needs" of a second house whose columns are part characteristics, then a third for process parameters, and a fourth for production controls. In practice most teams use only the first house, but the cascade expresses an important idea — that every machining tolerance should ultimately be traceable to something a customer cares about.
:::

## Prioritising, tracing and controlling requirements {#sec-traceability}

A specification for a complex product contains hundreds or thousands of requirements, and they change as the project learns. Three practices keep them under control.

**Prioritisation.** Not every requirement can be met in every release. A simple scheme widely used in project management is **MoSCoW**: each requirement is labelled *must have*, *should have*, *could have* or *won't have (this time)*. Must-have requirements correspond roughly to Kano's must-be attributes and to legal and safety constraints; a product release that misses one is not released at all.

**Traceability.** Each requirement records where it came from (the need, regulation or interface it serves) and, later, which design elements satisfy it and which verification activity closes it. A **traceability matrix** tabulates these links. It answers three questions that arise in every project: *Why is this requirement here?* (trace back to a need — orphan requirements should be deleted or justified), *Is every need covered?* (trace forward — a need with no requirement will not be designed for), and *What does a change affect?* (impact analysis).

**Change control.** Once a specification is agreed it is placed under configuration control: changes are proposed, assessed for their impact on cost, schedule and other requirements, approved or rejected, and recorded with a new revision. Late changes are expensive (the reason is explained in [[design-process/design-process-overview]]), but suppressing necessary changes is worse: a team that discovers the specification is wrong and does not change it will deliver a product that passes verification and fails validation.

::: quiz
A requirement reads: "The pump shall be easy to maintain." What is the best way to improve it?
- [ ] Add "and reliable" so that it covers both maintenance and failure.
- [ ] Specify that the pump shall have a bolted casing.
- [x] Replace it with measurable statements, e.g. "a trained technician shall replace the mechanical seal in under 30 min using only tools from the standard kit", and state how this will be verified.
- [ ] Leave it as it is; maintainability is subjective and cannot be specified.
::: solution
"Easy" is unverifiable. The third option names a metric (time), a condition (trained technician, standard tools) and a target, and it can be verified by demonstration or test. The second option writes a solution into the requirement, and the first adds a second vague property to the same sentence.
:::
:::

## Verifying a requirement by test: how many units? {#sec-success-run}

Some requirements concern probability: "the latch shall survive $10^4$ operations with reliability at least $0.95$". A test can never prove such a statement with certainty, but it can support it at a stated **confidence**. The simplest plan tests $n$ units for the required duty and accepts the design if none fails.

::: proposition Zero-failure (success-run) test {#prop-success-run}
Suppose $n$ units, whose failures are independent and each of which survives the test duty with the same probability $R$, are tested and none fails. If the plan is to accept the design only when this happens, then demonstrating reliability at least $R_0$ with confidence $C$ requires
$$
n \ge \frac{\ln(1 - C)}{\ln R_0}.
$$ {#eq-success-run}
:::

::: proof
If the true reliability were only $R \le R_0$, the probability that all $n$ independent units survive is $R^n \le R_0^n$. Demonstration at confidence $C$ means that a design whose reliability is as poor as $R_0$ should pass the test with probability at most $1 - C$: $R_0^n \le 1 - C$. Taking logarithms, and remembering that $\ln R_0 < 0$ reverses the inequality when we divide, gives $n \ge \ln(1 - C)/\ln R_0$. The assumptions are that the test duty represents the field duty, that the test units represent production, and that failures are independent.
:::

::: example Sample size for a latch {#ex-success-run}
How many latches must complete $10^4$ cycles without failure to demonstrate $R_0 = 0.95$ at $C = 90\,\%$ confidence? And for $R_0 = 0.99$?
::: solution
By [[#eq-success-run]]: $n \ge \ln(0.10)/\ln(0.95) = (-2.3026)/(-0.05129) = 44.9$, so $n = 45$ latches. For $R_0 = 0.99$: $n \ge -2.3026/(-0.01005) = 229.1$, so $230$ latches.
Each extra "nine" of demonstrated reliability costs about ten times as many test units, since for $R_0$ close to 1, $\ln R_0 \approx -(1 - R_0)$ and $n \approx \ln\!\big(1/(1-C)\big)/(1 - R_0)$; with $C = 0.9$ this is $2.30/(1 - R_0)$, giving $46$ and $230$ — consistent with the exact values. This is why high reliabilities are demonstrated by analysis of accelerated tests and field data rather than by success runs ([[design-process/reliability-risk]]), and why the requirement should not ask for more nines than the need justifies.
:::
:::

::: widget plot
f: ln(1 - C)/ln(x)
x: 0.8, 0.99
y: 0, 250
sliders: C=0.9:0.5:0.99:0.01
labels: n\ \text{(units, zero failures)}
points: 0.95, 44.89; 0.99, 229.1
caption: Number of units that must pass a zero-failure test, against the reliability $R_0$ to be demonstrated (horizontal), for confidence $C$ set by the slider. The marked points are the two cases of [[#ex-success-run]] at $C = 0.9$. Move the curve's right-hand end: as $R_0 \to 1$ the sample size blows up like $1/(1 - R_0)$. Raise $C$ from 0.9 to 0.99 and every sample size doubles, because $\ln(1 - C)$ goes from $-2.3$ to $-4.6$.
:::

::: application Writing the specification sheet
The final product of this chapter is a table — one row per requirement, with an identifier, the requirement text, the need or constraint it traces to, its metric and unit, marginal and ideal values (or a single limit for a constraint), its priority, and its verification method. Such a sheet, reviewed and signed off by the project, is what [[design-process/concept-generation]] starts from and what every later design review checks against. Because it is a controlled document, the revision letter at its head matters as much as its contents.
:::

::: history
Systematic requirement lists have a long history in German design methodology, where the *Anforderungsliste* (requirements list) is the first deliverable of the method set out by Gerhard Pahl and Wolfgang Beitz in *Konstruktionslehre* (1977). Quality function deployment grew out of Japanese quality-control practice: a process-assurance table used at Bridgestone Tire in the mid-1960s and the "quality tables" developed at Mitsubishi Heavy Industries' Kobe shipyard around 1972 were systematised by Yoji Akao and Shigeru Mizuno, and John Hauser and Don Clausing's 1988 *Harvard Business Review* article "The House of Quality" brought the method to a wide Western audience. Noriaki Kano, Nobuhiko Seraku, Fumio Takahashi and Shinichi Tsuji published "Attractive quality and must-be quality" in the journal of the Japanese Society for Quality Control in 1984. Abbie Griffin and John Hauser's 1993 paper "The Voice of the Customer" studied how needs are best gathered, structured and prioritised, and Karl Ulrich and Steven Eppinger's textbook *Product Design and Development* (first edition 1995) made the need–metric–target-value sequence used in this chapter standard in engineering courses.
:::

::: summary
- Needs are solution-free statements from stakeholders; requirements restate them as "shall" statements; a specification attaches to each a metric, a target value (or marginal and ideal values) and a verification method.
- Gather needs from interviews, observation of use, lead users, records and every stakeholder, not just the buyer.
- Good requirements are necessary, unambiguous, singular, feasible and verifiable; banish words like *easy* and *adequate*, and do not write solutions into requirements without recording why.
- Verification methods: inspection, analysis, demonstration, test. Verification checks the product against the specification; validation checks it against the users' needs.
- The Kano model separates must-be, one-dimensional, attractive, indifferent and reverse attributes; set thresholds for must-be attributes and trade one-dimensional ones against cost.
- QFD technical importance $t_j = \sum_i w_i r_{ij}$ with $r_{ij}\in\{0,1,3,9\}$ ranks metrics; the roof exposes conflicts between them.
- A zero-failure test of $n \ge \ln(1-C)/\ln R_0$ units demonstrates reliability $R_0$ at confidence $C$; each additional nine costs about ten times as many units.
- Prioritise (MoSCoW), trace every requirement to a need and to its verification, and control changes.
:::

## Exercises

::: exercise Rewrite the need {#exr-rewrite level=1}
A user of a garden shredder says: "It needs a stronger motor because it keeps jamming on thick branches." Write a solution-free need statement and one requirement with a metric, a target and a verification method.
::: solution
The user has proposed a solution (a stronger motor). The underlying need is something like "the shredder processes the branches typically produced when pruning a garden without jamming". A requirement: "The shredder shall process freshly cut hardwood branches up to $40\,\mathrm{mm}$ diameter at a feed rate of at least $0.5\,\mathrm{m/min}$ for $30\,\mathrm{min}$ without stalling or jamming", verified by test on a defined batch of branches. The cure might be a stronger motor, but it might equally be a different cutter geometry, a slower cutting speed with more torque, or an automatic reverse — the need statement keeps all of these open.
:::
:::

::: exercise A QFD column {#exr-qfd-column level=1 check="54"}
Three needs with weights 5, 3 and 2 have relationships 9, 1 and 3 with a metric. What is the metric's technical importance? (Enter $t_j$.)
::: solution
$t_j = 5\times9 + 3\times1 + 2\times3 = 45 + 3 + 6 = 54$.
:::
:::

::: exercise Units for a zero-failure test {#exr-success-run level=1 check="22"}
How many units must pass a zero-failure test to demonstrate a reliability of $0.90$ at $90\,\%$ confidence? (Enter the whole number of units.)
::: solution
$n \ge \ln(0.10)/\ln(0.90) = -2.3026/(-0.10536) = 21.85$, so $n = 22$.
:::
:::

::: exercise Relative importance {#exr-relative level=2 check="45"}
A House of Quality has three metrics whose technical importances are $54$, $36$ and $30$. What is the relative importance of the first metric? (Enter it in per cent.)
::: solution
Total $54 + 36 + 30 = 120$; $54/120 = 0.45 = 45\,\%$.
:::
:::

::: exercise A run-time requirement {#exr-runtime level=2 check="150"}
A cordless angle grinder must run for $6\,\mathrm{min}$ of cutting at an average shaft power of $1.2\,\mathrm{kW}$ on one charge. The efficiency from battery to shaft is $80\,\%$, and for this estimate all of the rated energy may be used. What is the minimum rated pack energy? Could an $18\,\mathrm V$, $5\,\mathrm{Ah}$ pack meet the requirement? (Enter the energy in Wh.)
::: solution
Shaft energy $1.2\,\mathrm{kW}\times 0.1\,\mathrm h = 0.12\,\mathrm{kWh} = 120\,\mathrm{Wh}$; battery energy $120/0.8 = 150\,\mathrm{Wh}$. An $18\,\mathrm V$, $5\,\mathrm{Ah}$ pack stores nominally $18\times5 = 90\,\mathrm{Wh}$, only $60\,\%$ of what is needed — and less in practice, because packs deliver less than their rating at the high currents a grinder draws (about $1.5\,\mathrm{kW}/18\,\mathrm V \approx 83\,\mathrm A$). Either the requirement is renegotiated (is $6\,\mathrm{min}$ of continuous cutting a real need, or is it $6\,\mathrm{min}$ spread over a job with pauses?), or the product needs two packs or a higher-voltage pack.
:::
:::

::: exercise Classify verification methods {#exr-methods level=2}
For a domestic pressure cooker, give the verification method you would use for each requirement and justify it: (a) the lid shall not be openable while the internal gauge pressure exceeds $5\,\mathrm{kPa}$; (b) the vessel shall withstand a hydrostatic test at a stated multiple of its working pressure; (c) the base shall be flat to within $0.3\,\mathrm{mm}$; (d) the instructions shall be supplied in the language of the country of sale; (e) the wall stresses at working pressure shall not exceed the allowable stress of the applicable standard.
::: solution
(a) Test: pressurise the cooker and attempt to open it at a range of pressures, recording the pressure at which the interlock releases; this is safety-critical, so a demonstration without measurement would not be enough. (b) Test, by definition — a hydrostatic proof test (done with water so that a failure releases little stored energy, and only by trained staff behind guarding). (c) Inspection: measure flatness with a straightedge and feeler gauges or a coordinate measuring machine. (d) Inspection of the documentation. (e) Analysis, by the method of the standard (thin-walled pressure-vessel formulas, see [[mechanics-of-materials]]), backed by the test in (b). Note that pressure equipment is designed and certified to the applicable standard and regulations; the exercise only illustrates how methods are assigned.
:::
:::

::: exercise Allowing one failure {#exr-one-failure level=3 check="38"}
A zero-failure plan is harsh: a single unlucky failure condemns the design. Generalise [[#prop-success-run]] to a plan that accepts the design if at most one of $n$ units fails. Show that $n$ must satisfy $R_0^n + nR_0^{n-1}(1 - R_0) \le 1 - C$, and find the smallest $n$ for $R_0 = 0.90$, $C = 0.90$. (Enter the whole number of units.)
::: solution
With independent units of reliability $R$, the number of failures is binomial with parameters $n$ and $1 - R$. The plan accepts when there are $0$ or $1$ failures, with probability $P_{\text{acc}}(R) = R^n + nR^{n-1}(1 - R)$. This is increasing in $R$ (more reliable designs pass more often), so the worst case for $R \le R_0$ is $R = R_0$, and the confidence requirement is $P_{\text{acc}}(R_0) \le 1 - C$. Trying values: $n = 37$: $0.9^{37} + 37\times0.9^{36}\times0.1 = 0.0203 + 0.0834 = 0.1037 > 0.1$; $n = 38$: $0.0183 + 0.0770 = 0.0953 \le 0.1$. So $n = 38$ — against $22$ for the zero-failure plan. The extra 16 units buy tolerance to one failure; the plan also gives a good design a better chance of passing (for a true $R = 0.97$ the probability of passing is $0.68$ with one failure allowed out of 38, against $0.51$ for zero failures out of 22; for $R = 0.98$ it is $0.82$ against $0.64$).
:::
:::

::: exercise A specification for a stair-climbing trolley {#exr-design level=3}
A charity asks for a hand trolley that lets one volunteer deliver $40\,\mathrm{kg}$ food parcels up the stairs of blocks of flats without lifts. (a) List at least eight needs from at least three different stakeholders. (b) Turn four of them into requirements with metrics, marginal and ideal values and verification methods, including at least one must-be safety requirement. (c) Identify one pair of metrics likely to conflict and say how you would decide the trade-off.
::: solution
One possible answer. (a) Volunteer: climbs stairs without lifting the load; stable — cannot run away down the stairs; light enough to carry to a car boot; folds to fit a small car; usable by people of different heights and strengths. Resident: does not damage stair nosings or carpet; quiet in corridors at night. Charity: affordable; repairable by a local workshop. Building manager: fits standard stairs and landings.
(b) *Hand force*: the peak force at the handle when climbing a standard stair with $40\,\mathrm{kg}$ shall not exceed $150\,\mathrm N$ (marginal) / $80\,\mathrm N$ (ideal); test with a load cell in the handle on a test staircase. *Run-away* (must-be): the loaded trolley shall not descend a step unless the operator acts on a control, for any handle angle; test, including failure of the operator's grip. *Mass*: $\le 15\,\mathrm{kg}$ marginal, $\le 9\,\mathrm{kg}$ ideal; inspection by weighing. *Stair compatibility*: climbs stairs with rises from $150$ to $220\,\mathrm{mm}$ and goings from $220$ to $300\,\mathrm{mm}$; demonstration on adjustable test stairs, with measurement of any slip.
(c) Low hand force calls for a mechanism (a tri-star wheel cluster, tracks or a powered climber), which adds mass, conflicting with the mass target. Decide by weighting the needs from the volunteers' interviews, building quick prototypes of two or three concepts and measuring both metrics ([[design-process/concept-selection]]); the run-away requirement is a constraint that every concept must meet regardless of the trade-off.
:::
:::

## Further reading

Ulrich, Eppinger and Yang's *Product Design and Development* (7th ed., 2020) has clear chapters on identifying customer needs and establishing target specifications with marginal and ideal values. Pahl, Beitz, Feldhusen and Grote's *Engineering Design: A Systematic Approach* (3rd English ed., 2007) treats the requirements list as the basis of systematic design. Hauser and Clausing's "The House of Quality" (*Harvard Business Review*, 1988) remains the most readable introduction to QFD, and Dieter and Schmidt's *Engineering Design* (6th ed., 2021) covers QFD, the Kano model and the specification together.
