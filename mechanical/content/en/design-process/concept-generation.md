With a specification agreed ([[design-process/requirements]]), the team knows *what* the product must achieve but not *how*. A **concept** is an approximate description of the working principle, the arrangement and the form of a product — a sketch with a few words and numbers, enough to say how it would work and roughly what it would cost. Concept generation is the stage at which the space of possible solutions is opened as wide as is useful before it is narrowed again in [[design-process/concept-selection]]. It matters disproportionately: the concept fixes most of the product's performance limits and much of its cost, and a poor concept cannot be rescued by excellent detail design.

Two tendencies work against a good result. The first is **fixation**: designers who have seen one solution — the competitor's product, last year's model, the first idea in the meeting — find it hard to think of others, and their later ideas resemble it. The second is premature evaluation: ideas are criticised before they are developed, and unconventional ones die young. The methods in this chapter counter both. Functional decomposition breaks the problem into smaller problems that have fewer preconceived answers; external search (patents, literature, other industries, nature) brings in solutions the team did not know; structured creativity methods separate generating from judging; the morphological chart combines partial solutions systematically; and TRIZ uses patterns abstracted from patents to suggest how a contradiction between requirements might be resolved.

## Decomposing the problem by function {#sec-function}

The first step is to state the problem abstractly. "Design a better can crusher" invites variations on existing can crushers; "reduce the volume of empty drink cans for recycling" admits shredding, rolling, folding and other principles. Pahl and Beitz recommend abstracting the problem until its essential function is visible, then decomposing that function.

::: definition Function, flows and function structure {#def-function}
A **function** is a solution-independent description of an intended relation between the inputs and outputs of a system, written as a verb and a noun: *store energy*, *convert electrical energy to rotation*, *locate can*, *sense jam*. Inputs and outputs are **flows** of three kinds: **material** (objects, fluids, the user's hand), **energy** (mechanical, electrical, thermal, chemical, human) and **signal** (information, commands, measurements). The **overall function** treats the product as a black box with these flows crossing its boundary. A **function structure** decomposes the overall function into **sub-functions** connected by the flows, so that each sub-function is simple enough to be solved on its own.
:::

The decomposition is not unique; it is a modelling choice. Two heuristics help. First, follow each flow through the product: what happens to the can from the moment it enters to the moment it leaves, and what happens to the energy from the battery or the user's arm until it does work on the can? Second, keep sub-functions solution-neutral: *amplify force* rather than *lever*, *hold can* rather than *clamp jaw*. The function structure does not say whether functions are achieved by one part or several; that is decided at the embodiment stage ([[design-process/embodiment-design]]).

::: example Function structure of a can crusher {#ex-function}
Draw up the black box and a function structure for a domestic device that flattens empty aluminium drink cans before recycling.
::: solution
*Black box.* Inputs: empty can (material), energy for crushing (human muscle or electrical — leave open), user's command (signal). Outputs: crushed can (material), dissipated energy as heat and noise, status to the user (signal: "ready", "jammed", "bin full").
*Function structure*, following the material flow: **accept can** → **locate can** (in a defined position and orientation) → **crush can** → **release can** → **collect crushed cans**. Following the energy flow: **import energy** → **store energy** (optional: a spring or flywheel would allow a smaller input power) → **amplify force** → **transmit force to can**, which feeds the *crush can* function. Following the signal flow: **receive command** → **sense can present** and **sense jam** → **indicate status**; the command and sensing signals control *transmit force*.
Writing the functions like this reveals options the phrase "can crusher" hides: *crush can* could be achieved by an axial squeeze, by rolling the can flat between rollers, or by shearing it; *store energy* could be omitted (direct drive) or done by the user over several strokes; *locate can* is critical for safety because a can that is mislocated may be ejected violently. Check: every input flow appears as an output (material in = material out; energy in = work on the can + losses), so nothing has been lost in the decomposition.
:::
:::

## Searching for partial solutions {#sec-search}

For each sub-function the team now collects **working principles** — physical effects and arrangements that could achieve it. Sources fall into two groups.

**External search** finds what already exists. It includes benchmarking competitors' products (taking them apart is often the fastest way to learn), interviewing lead users who have improvised solutions, reading handbooks and supplier catalogues, searching other industries with the same function (a can crusher and a scrap-metal baler share *compress material*), and searching the patent literature.

::: definition Patent, claims and prior art {#def-patent}
A **patent** is a right, granted by a state for a limited period, to exclude others from making, using or selling an invention — a new, non-obvious and industrially applicable technical solution — in return for its public disclosure. Under the TRIPS agreement the minimum term is 20 years from the filing date. The **claims** define the legal scope of the protection; the description and drawings explain the invention. **Prior art** is everything made available to the public before the filing date, anywhere in the world.
:::

Patents are an unusually rich source of concepts for three reasons: they are classified by technical function (the International Patent Classification and the Cooperative Patent Classification), so all ways of, say, crushing cans can be found together; they must explain how the invention works; and most patents have expired or were never valid in the country of interest, so their ideas are free to use. A search early in the project also reveals live patents that constrain the design — the legal side of this is treated in [[design-process/ethics-standards]]. Reading the claims rather than the title is essential: the title describes the subject, but only what falls within the claims is protected.

**Internal search** draws on the team's own knowledge, deliberately stimulated by the methods of [[#sec-creativity]]. Both kinds of search benefit from **analogy** — asking how other systems, natural or artificial, achieve the same function. Biology is a frequent source: Georges de Mestral's hook-and-loop fastener, patented in the 1950s as Velcro, came from examining the hooked burrs of burdock that clung to his clothes and his dog after a hunting trip in 1941; the long, tapered nose of the 500 Series Shinkansen trains of the late 1990s was inspired by the kingfisher's beak, which enters water with little splash, and was adopted to reduce the pressure wave and "tunnel boom" when trains enter tunnels at high speed. In both cases the analogy supplied a principle; turning it into a product took years of engineering.

## Creativity methods {#sec-creativity}

Group methods for generating ideas share one rule: *generate first, judge later*. Criticism during generation suppresses unusual ideas and lets confident speakers dominate.

**Brainstorming**, popularised by the advertising executive Alex Osborn in *Your Creative Power* (1948) and *Applied Imagination* (1953), asks a small group to produce as many ideas as possible, defer judgement, welcome unusual ideas and combine and improve others' ideas. Its effectiveness in groups is disputed: laboratory studies since the late 1950s have repeatedly found that the same number of people working alone and pooling their ideas ("nominal groups") produce more ideas than interacting groups, because in a group only one person can speak at a time and people hold back ideas they fear will be judged.

**Brainwriting** methods remove these problems by working on paper. In the **6-3-5 method** published by Bernd Rohrbach in 1969, six participants each write three ideas on a sheet in five minutes and pass the sheet on; each then extends or varies the ideas they receive, until every sheet has passed through every person. Six rounds produce up to $6\times3\times6 = 108$ ideas in thirty minutes, all recorded. The **gallery method** has individuals sketch, pin the sketches up, discuss them and sketch again.

Other prompts that help individuals break fixation include checklists of transformations (substitute, combine, adapt, modify, put to another use, eliminate, reverse), deliberately considering the opposite of the obvious solution, and changing scale or medium.

::: example How many ideas are enough? {#ex-coverage}
Suppose, as a crude model, that each idea generated independently has a small probability $p$ of being a "good" concept worth developing. How many ideas $N$ are needed to have a $90\,\%$ chance of at least one good one if $p = 0.02$? What chance do 30 ideas give?
::: solution
The probability that none of $N$ independent ideas is good is $(1 - p)^N$, so
$$
P(\text{at least one good}) = 1 - (1 - p)^N .
$$ {#eq-coverage}
Setting this to $0.90$: $N \ge \ln 0.10/\ln 0.98 = -2.3026/(-0.020203) = 113.97$, so $N = 114$ ideas. With $N = 30$: $1 - 0.98^{30} = 1 - 0.5455 = 0.455$, i.e. less than an even chance.
The model is too simple — ideas are not independent (fixation makes later ideas resemble earlier ones), and "good" is not a fixed property — but it captures why design methods ask for many ideas, and why a structured session that produces about 100 ideas in half an hour is worth more than a meeting that agrees on the first plausible one. Sanity check: for small $p$, $(1 - p)^N \approx e^{-pN}$, and $e^{-0.02\times114} = e^{-2.28} = 0.10$ ✓.
:::
:::

::: widget plot
f: 1 - (1 - p)^x
x: 0, 200
y: 0, 1
sliders: p=0.02:0.005:0.1:0.005
labels: P(\text{at least one good concept})
hlines: 0.9
points: 114, 0.9
caption: The crude coverage model of [[#ex-coverage]]: the probability that at least one of $N$ independent ideas (horizontal) is good, when each is good with probability $p$ (slider). The marked point is $N = 114$ for $p = 0.02$. Halve $p$ and the number of ideas for $90\,\%$ coverage roughly doubles; raise $p$ to $0.1$ — a well-understood problem, or a team with relevant experience — and about 22 ideas suffice. Diminishing returns set in once the curve flattens, which is one argument for stopping generation and starting selection.
:::

::: warning Counting ideas instead of exploring the space
A list of 100 ideas that are minor variations of one principle explores the solution space less than ten ideas based on ten different principles. Quantity helps only if it brings diversity. Check a list of ideas by grouping them by working principle (for a can crusher: axial squeeze, rolling, folding, shredding, melting): if almost all fall in one group, the session has suffered from fixation, and a new round should be started from a different sub-function, a different analogy or a patent search.
:::

## The morphological chart {#sec-morphology}

The function structure divides the problem; the search fills each sub-function with alternative partial solutions. The **morphological chart** (or morphological box), developed by the astrophysicist Fritz Zwicky at Caltech in the 1940s and set out in his book *Entdecken, Erfinden, Forschen im morphologischen Weltbild* (1966; English edition 1969), tabulates them.

::: definition Morphological chart {#def-morph}
A **morphological chart** has one row for each sub-function (or design parameter) $k = 1,\dots,K$ and, in that row, the $n_k$ alternative partial solutions found for it. A **concept variant** is formed by choosing one entry from every row. Two entries in different rows are **incompatible** if they cannot work together physically or geometrically.
:::

::: proposition Size of the morphological space {#prop-morph}
(a) A chart with $n_k$ options in row $k$ defines
$$
N = \prod_{k=1}^{K} n_k
$$ {#eq-morph}
concept variants.
(b) If $F_1,\dots,F_q$ are the sets of variants that contain the forbidden pairs $1,\dots,q$, the number of compatible variants is
$$
N_{\text{ok}} = N - \sum_i \lvert F_i\rvert + \sum_{i<j}\lvert F_i\cap F_j\rvert - \sum_{i<j<l}\lvert F_i\cap F_j\cap F_l\rvert + \cdots
$$ {#eq-incl-excl}
where a forbidden pair fixing entries in rows $a$ and $b$ gives $\lvert F_i\rvert = N/(n_a n_b)$, and an intersection is empty if it requires two different entries in the same row; otherwise it is the product of $n_k$ over the rows it leaves free.
:::

::: proof
(a) Choosing one entry in each row independently is a sequence of $K$ choices with $n_1, n_2,\dots$ possibilities; by the multiplication principle of counting there are $n_1n_2\cdots n_K$ sequences. (b) The incompatible variants are the union $F_1\cup\cdots\cup F_q$, whose size is given by the inclusion–exclusion principle; subtracting it from $N$ gives [[#eq-incl-excl]]. A variant in $F_i$ has its entries fixed in the two rows of pair $i$ and is free in the others, giving $\prod_{k\ne a,b} n_k = N/(n_an_b)$. A variant in an intersection must contain all the fixed entries of the sets involved; that is impossible if two of them prescribe different entries in one row, and otherwise the variant is free in the remaining rows.
:::

The product grows explosively. Seven rows of four options already give $4^7 = 16\,384$ variants — far too many to evaluate one by one, even if most are absurd. The chart is therefore used in one of three ways: (i) by picking a handful of promising, mutually compatible combinations by judgement, often one per "theme" (a low-cost manual concept, a high-throughput motorised one, …); (ii) by first eliminating weak options row by row with the screening of [[design-process/concept-selection]], which reduces every $n_k$; or (iii) for well-defined problems, by computer enumeration with compatibility rules. Its main value is less the count than the discipline: every row is considered, and unusual combinations become visible.

::: example Counting can-crusher variants {#ex-morph}
A team's morphological chart for the can crusher has the rows
- A energy source: hand lever, foot pedal, electric motor, pneumatic cylinder ($n_A = 4$);
- B force amplification: lever, toggle linkage, power screw, hydraulic cylinder ($n_B = 4$);
- C crushing action: linear platen, pair of rollers, rotary cam ($n_C = 3$);
- D feeding: one can at a time by hand, gravity magazine ($n_D = 2$);
- E ejection: gravity drop, spring kicker, push-out by the platen ($n_E = 3$).
Rollers need continuous rotation, so they are incompatible with the toggle linkage and with the power screw (both give a finite stroke). Push-out by the platen requires the linear platen. How many variants are there, and how many are compatible? If a rough evaluation of one variant takes 15 minutes, how long would evaluating all compatible variants take?
::: solution
By [[#eq-morph]], $N = 4\times4\times3\times2\times3 = 288$.
Forbidden sets: $F_1$ = {toggle, rollers}: rows A, D, E free, $\lvert F_1\rvert = 4\times2\times3 = 24$. $F_2$ = {screw, rollers}: $24$. "Push-out needs a platen" forbids {rollers, push-out} ($F_3$) and {cam, push-out} ($F_4$): rows A, B, D free, $\lvert F_3\rvert = \lvert F_4\rvert = 4\times4\times2 = 32$.
Intersections: $F_1\cap F_2$ needs two B entries — empty. $F_3\cap F_4$ needs two C entries — empty; likewise $F_1\cap F_4$ and $F_2\cap F_4$. $F_1\cap F_3$ = {toggle, rollers, push-out}: rows A, D free, $4\times2 = 8$; $F_2\cap F_3$: $8$. No triple intersection is non-empty.
$N_{\text{ok}} = 288 - (24 + 24 + 32 + 32) + (8 + 8) = 288 - 112 + 16 = 192$.
Evaluating 192 variants at 15 min each takes $48\,\mathrm h$ — more than a working week. Checked by enumerating all 288 combinations in a short program: 192 pass both rules. The conclusion is the usual one: screen the options within each row first (is a pneumatic cylinder plausible in a kitchen?), then assemble perhaps five to ten coherent variants for evaluation.
:::
:::

## TRIZ: resolving contradictions {#sec-triz}

Many design problems are hard because two requirements pull in opposite directions: a bicycle frame should be stiffer *and* lighter; a pressure vessel wall should be thicker for strength *and* thinner for heat transfer. Conventional practice compromises. TRIZ (the Russian acronym of "theory of inventive problem solving"), developed by Genrich Altshuller from the 1940s onwards and first published with Rafael Shapiro in 1956, is built on the observation, from studying large numbers of patents, that inventive solutions typically *eliminate* such a contradiction rather than compromising, and that the same few strategies recur across unrelated fields.

::: definition Technical and physical contradictions {#def-contradiction}
A **technical contradiction** exists when improving one parameter of a system worsens another (improving strength increases weight). A **physical contradiction** exists when one element must have opposite properties at once (the landing gear must be extended for landing and must not be there in cruise). TRIZ expresses technical contradictions using a list of 39 generalised engineering parameters (such as *weight of moving object*, *strength*, *temperature*, *ease of manufacture*), and offers 40 **inventive principles** (such as *segmentation*, *local quality*, *the other way round*, *dynamics*, *parameter changes*, *composite materials*) as generic strategies; Altshuller's **contradiction matrix** suggests, for each pair of improving and worsening parameters, the principles most often used in the patents he studied. Physical contradictions are resolved by **separation**: in time, in space, between the part and the whole, or upon a condition.
:::

TRIZ is best regarded as a disciplined prompt list. It reliably makes a team state the contradiction precisely — often the most valuable step — and it points to solution types the team might not have considered. It does not guarantee a solution, and the abstract principles still have to be turned into a working embodiment.

::: example Using TRIZ prompts {#ex-triz}
(a) A wheelchair-accessible minibus needs a ramp that is long (to give a gentle slope for the wheelchair) and short (to stow inside the vehicle and not obstruct the pavement). State the contradiction and use separation principles to suggest concepts. (b) A tubular bicycle frame must be stiffer without becoming heavier. State it as a technical contradiction in TRIZ parameters and use the principles *local quality*, *composite materials* and *segmentation* as prompts.
::: solution
(a) This is a physical contradiction on one element, the ramp's length. *Separation in time*: long when deployed, short when stowed — a folding or telescoping ramp, or a ramp that slides out from under the floor. *Separation in space*: part of the rise is taken by lowering the vehicle (kneeling suspension) so that the ramp itself can be shorter. *Separation upon condition*: a platform lift replaces the ramp entirely. All three exist on real vehicles.
(b) Improving *strength* (stiffness is the closest of the 39 parameters) worsens *weight of moving object*. *Local quality* prompts putting material only where it is needed: butted tubes that are thicker near the joints, where bending moments are highest, and thinner in the middle; oval or tapered sections stiffer in the plane of the main loads. *Composite materials* prompts carbon-fibre-reinforced polymer, whose fibres can be laid along the load paths. *Segmentation* prompts a frame of many short members (a space frame) or lugs that join stock tubes. Check against practice: all of these are used in commercial frames, which confirms that the prompts lead to real options — and that the team then has to compare them by analysis and cost ([[design-process/concept-selection]]).
:::
:::

::: quiz
A morphological chart has five rows with 3, 4, 2, 5 and 3 options and no incompatibilities. One option is deleted from the row that has 5. By what fraction does the number of variants fall?
- [ ] $1/360$
- [ ] $5\,\%$
- [x] $20\,\%$
- [ ] $25\,\%$
::: solution
$N = 3\times4\times2\times5\times3 = 360$; with 4 options in that row $N = 288$, so $72$ variants disappear, which is $72/360 = 20\,\%$. In general, removing one of the $n_k$ options of row $k$ removes the fraction $1/n_k$ of the space, whatever the other rows contain — which is why screening weak options row by row is so effective.
:::
:::

::: remark Documenting concepts
Each concept carried forward is recorded on a **concept sheet**: a sketch, a short description of the working principle, the choices made in each row of the chart, rough key numbers (size, mass, power, cost) and open questions. Uniform concept sheets make the comparison in [[design-process/concept-selection]] fair: a beautifully rendered favourite next to scribbled alternatives biases any review.
:::

::: history
Systematic methods for generating mechanical solutions were developed by German engineering-design researchers in the 1960s and 1970s and synthesised by Gerhard Pahl and Wolfgang Beitz in *Konstruktionslehre* (1977), from which function structures and the use of design catalogues come. Fritz Zwicky, best known for his astrophysics, developed morphological analysis in the 1940s while working on jet propulsion and published it fully in 1966. Alex Osborn introduced brainstorming in *Your Creative Power* (1948) and elaborated it in *Applied Imagination* (1953); the brainwriting method 6-3-5 was published by Bernd Rohrbach in 1969. Genrich Altshuller, who began studying patents in the 1940s, published the first paper on TRIZ with Rafael Shapiro in 1956; his work was interrupted by imprisonment in a labour camp from 1950 until his release after Stalin's death in 1953, and TRIZ became widely known in the West mainly from the 1990s.
:::

::: summary
- A concept is an approximate description of working principle, arrangement and form; it fixes most of the product's limits and cost.
- Abstract the problem, then decompose the overall function into sub-functions linked by flows of material, energy and signal; keep sub-functions solution-neutral.
- Search externally (competitors, lead users, other industries, catalogues, patents, nature) and internally (creativity methods). Patents are classified by function and most are free to use; read the claims.
- Separate generating from judging. Brainwriting such as 6-3-5 ($6\times3\times6 = 108$ ideas in 30 min) avoids the production blocking of oral brainstorming. Many ideas help only if they are diverse.
- A morphological chart with $n_k$ options per row spans $\prod n_k$ variants; incompatibilities are removed by inclusion–exclusion; screening within rows keeps the space manageable.
- TRIZ: state technical or physical contradictions precisely; use the 40 inventive principles and the separation principles as prompts to eliminate rather than compromise a contradiction.
:::

## Exercises

::: exercise Size of a chart {#exr-morph-size level=1 check="96"}
A morphological chart has four rows with 3, 4, 2 and 4 options and no incompatibilities. How many concept variants does it define? (Enter the number.)
::: solution
$3\times4\times2\times4 = 96$.
:::
:::

::: exercise A brainwriting session {#exr-brainwriting level=1 check="75"}
A 5-3-5 variant of brainwriting has five participants, each writing three ideas per round, with one round for each participant (sheets pass until each has visited everyone). What is the maximum number of ideas produced? (Enter the number.)
::: solution
Five rounds of $5\times3 = 15$ ideas: $75$ ideas.
:::
:::

::: exercise Function structure of a kettle {#exr-kettle level=1}
Give the black-box inputs and outputs, classified as material, energy and signal, and a function structure of at least six sub-functions for an electric kettle.
::: solution
Inputs: cold water (material), electrical energy, user's command (switch) and the water temperature (signal). Outputs: hot water (material), heat losses and steam (energy, material), status (light, click). Sub-functions: *accept water* → *contain water* → *convert electrical energy to heat* → *transfer heat to water* → *sense temperature (or boiling)* → *interrupt energy* → *indicate status*; and *dispense water*, *insulate user from hot surfaces*, *prevent dry operation* (sense absence of water). Note that *sense boiling* is solution-neutral: a bimetal strip heated by steam is one solution, an electronic thermistor another.
:::
:::

::: exercise Variants with incompatibilities {#exr-morph-pairs level=2 check="30"}
A chart has rows A ($a_1, a_2, a_3$), B ($b_1, b_2, b_3$) and C ($c_1,\dots,c_4$). The pairs $\{a_1, b_2\}$ and $\{b_2, c_3\}$ are incompatible. How many compatible variants are there? (Enter the number.)
::: solution
$N = 3\times3\times4 = 36$. $\lvert F_1\rvert$ ($a_1, b_2$ fixed, C free) $= 4$; $\lvert F_2\rvert$ ($b_2, c_3$ fixed, A free) $= 3$; $F_1\cap F_2 = \{(a_1, b_2, c_3)\}$, size 1. $N_{\text{ok}} = 36 - 4 - 3 + 1 = 30$. Direct check: every variant with $b_2$ is compatible only if $a\ne a_1$ and $c\ne c_3$, giving $2\times3 = 6$ of the 12 with $b_2$; the 24 without $b_2$ are all compatible; $24 + 6 = 30$ ✓.
:::
:::

::: exercise Ideas for 95 % coverage {#exr-coverage level=2 check="59"}
Using the crude model of [[#ex-coverage]] with $p = 0.05$, how many ideas give at least a $95\,\%$ chance of at least one good concept? (Enter the whole number of ideas.)
::: solution
$N \ge \ln 0.05/\ln 0.95 = -2.9957/(-0.051293) = 58.40$, so $N = 59$.
:::
:::

::: exercise State the contradiction {#exr-triz level=2}
For each case state whether the contradiction is technical or physical and propose a separation or an inventive principle that might resolve it: (a) an umbrella should be large to keep the user dry and small to carry; (b) a cutting tool insert should be hard to resist wear and tough to resist chipping; (c) a car should have a stiff suspension for handling and a soft suspension for comfort.
::: solution
(a) Physical (size of one element). Separation in time: folding or telescoping umbrellas. (b) Technical (improving wear resistance worsens toughness) or, stated on one element, physical. *Local quality* / separation in space: a tough substrate with a thin hard coating (coated carbide inserts). (c) Physical (stiffness of one element). Separation upon condition or in time: adaptive dampers whose damping changes with road input or driving mode; *dynamics* (make a characteristic adjustable). In each case the team still has to size and cost the idea.
:::
:::

::: exercise Counting with a forbidden row combination {#exr-derive-morph level=3 check="64"}
(a) Show that if one option $x$ in row $a$ is incompatible with *every* option of a set $S$ of $s$ options in row $b$, then $N_{\text{ok}} = N\,(1 - s/(n_an_b))$. (b) A chart has rows of 3, 4 and 8 options; option 1 of the first row is incompatible with 3 of the options of the second row, and option 2 of the first row with 1 option of the second row. How many compatible variants are there? (Enter the number.)
::: solution
(a) The forbidden sets $F_{x,y}$ for $y\in S$ require different entries in row $b$, so they are pairwise disjoint; each has size $N/(n_an_b)$. Inclusion–exclusion reduces to $N_{\text{ok}} = N - sN/(n_an_b)$.
(b) $N = 3\times4\times8 = 96$, $N/(n_an_b) = 8$. The forbidden sets are the pairs (1, three options) and (2, one option): four pairs, all pairwise disjoint (either different entries in row 2 or different entries in row 1). $N_{\text{ok}} = 96 - 4\times8 = 64$.
:::
:::

::: exercise Concepts for a stair-climbing trolley {#exr-design level=3}
For the stair-climbing trolley of the requirements chapter ([[design-process/requirements]]) — one volunteer must move a $40\,\mathrm{kg}$ parcel up domestic stairs — (a) draw a function structure; (b) build a morphological chart with at least five rows and three options per row, using at least one external source (a patent search for stair-climbing hand trucks, or an analogy from nature or another industry); (c) assemble three distinct, compatible concepts and write a concept sheet for each.
::: solution
One possible answer. (a) Flows: parcel (material), volunteer's muscle and possibly battery energy, volunteer's commands. Sub-functions: *hold load*, *keep load level*, *transfer load up one step*, *support load on the step edge*, *prevent descent* (a must-be safety function), *import energy*, *amplify force*, *steer on landings*, *fold for transport*.
(b) Example rows: *transfer up a step* — rotating tri-star wheel clusters, tracks, walking legs, a powered lifting column; *energy* — muscle at the handle, muscle via a foot pedal, battery and motor; *amplify force* — lever ratio, gear train, ball screw; *prevent descent* — ratchet on the wheel axle, track friction with self-locking worm drive, brake that engages unless a lever is held (dead-man principle); *keep level* — fixed geometry, pendulum-levelled platform, operator-adjusted handle; *fold* — hinged handle, telescoping handle, detachable platform. Patent searches on stair-climbing hand trucks return many tri-star and track designs; tracked vehicles and the leg mechanisms of walking robots are analogies from other fields.
(c) e.g. *Concept 1*: manual tri-star wheels + lever + ratchet + fixed geometry + hinged handle (cheap, but needs effort on each step). *Concept 2*: battery-powered tracks + self-locking worm drive + pendulum level + detachable platform (low effort, heavy). *Concept 3*: battery-powered lifting column that climbs one step at a time on retractable feet + ball screw + dead-man brake (unusual — worth prototyping to learn). Each concept sheet records a sketch, the working principle, the chart choices, estimated mass, cost and hand force, and open questions; the excluded combinations (e.g. walking legs with muscle power) should be noted with the reason.
:::
:::

## Further reading

Pahl, Beitz, Feldhusen and Grote's *Engineering Design: A Systematic Approach* (3rd English ed., 2007) develops function structures, working principles and morphological combination in depth. Ulrich, Eppinger and Yang's *Product Design and Development* (7th ed., 2020) has a practical chapter on concept generation with external search and systematic exploration. Nigel Cross's *Engineering Design Methods* (5th ed., 2021) describes function analysis, morphological charts and creativity methods compactly, with examples.
