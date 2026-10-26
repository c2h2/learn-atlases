Most of the cost of a manufactured product is decided before anyone in the factory sees it. Once the designer has chosen the number of parts, their materials, shapes and tolerances, and the way they are joined, the processes that can make them and the time needed to assemble them follow; the manufacturing engineer can then optimise feeds, fixtures and line layouts, but only within the bounds the design set. **Design for manufacture** (DFM) is the practice of choosing materials, processes, shapes and tolerances so that each part is cheap and consistent to make; **design for assembly** (DFA) is the practice of reducing the number of parts and making those that remain easy to handle and insert. Together, under the name **DFMA**, they are among the most effective tools a design team has for reducing cost, and they also tend to improve quality, because fewer parts and simpler operations mean fewer opportunities for error.

This chapter builds a simple **unit-cost model** and uses it to choose between processes by production volume, introduces the Boothroyd–Dewhurst method of DFA with its minimum-part criteria and design efficiency, collects design rules for the common processes — machining, injection moulding, casting and sheet metal — with two small quantitative models (moulding cooling time and the cantilever snap fit), and ends with how DFMA fits into the design process. It follows [[design-process/embodiment-design]]; the processes themselves are described in [[manufacturing]], and material choice in [[materials-science]].

## Where the cost of a part comes from {#sec-cost}

::: definition Unit cost and its components {#def-unit-cost}
The **unit cost** of a part made in a batch or production run of $N$ parts is modelled as
$$
C = C_m + C_p + \frac{C_t}{N},
$$ {#eq-unit-cost}
where $C_m$ is the **material cost** per part (including scrap), $C_p$ the **processing cost** per part (machine and labour time multiplied by the hourly rates, including a share of overheads), and $C_t$ the **dedicated tooling and set-up cost** — moulds, dies, fixtures, programming — that is incurred once for the run and is spread over all $N$ parts. $C_m + C_p$ is the **variable cost** per part; $C_t$ is the **fixed** (non-recurring) cost.
:::

The model is a simplification: tooling wears out and must be replaced after a certain number of parts, processing rates depend on volume (a high-volume line is automated), and overheads are allocated by accounting rules that may not reflect true costs. But it captures the essential trade-off between processes. Processes with expensive dedicated tooling — die casting, injection moulding, forging, stamping — have low variable cost; processes with little dedicated tooling — machining from stock, sand casting, fabrication, additive manufacturing — have high variable cost. Which is cheaper depends on $N$.

::: proposition Crossover volume between two processes {#prop-crossover}
Let process 1 have variable cost $v_1 = C_{m1} + C_{p1}$ and tooling cost $C_{t1}$, and process 2 have $v_2 < v_1$ and $C_{t2} > C_{t1}$. Then process 2 has the lower unit cost if and only if
$$
N > N^* = \frac{C_{t2} - C_{t1}}{v_1 - v_2}.
$$ {#eq-crossover}
:::

::: proof
From [[#eq-unit-cost]], $C_2 < C_1 \iff v_2 + C_{t2}/N < v_1 + C_{t1}/N \iff (C_{t2} - C_{t1})/N < v_1 - v_2$. Both sides are positive by hypothesis, so multiplying by $N/(v_1 - v_2) > 0$ gives $N > (C_{t2} - C_{t1})/(v_1 - v_2)$. At $N = N^*$ the unit costs are equal. If instead $v_2 < v_1$ and $C_{t2} \le C_{t1}$, process 2 is cheaper at every volume and there is no crossover.
:::

::: example Machined or die-cast housing? {#ex-crossover}
A small aluminium gearbox housing can be machined from bar on a CNC machining centre or die cast and then finish-machined at the bearing bores. Estimated costs:

| | material $C_m$ | processing $C_p$ | tooling $C_t$ |
|---|---|---|---|
| CNC from bar | 4.00 | 18.00 | 1 500 |
| die cast + finish machining | 2.50 | 3.50 | 60 000 |

(currency units per part; tooling is fixtures and programs for CNC, the die and fixtures for casting). Find the crossover volume and the unit costs at $1\,000$ and $10\,000$ parts.
::: solution
Variable costs: $v_1 = 22.00$, $v_2 = 6.00$. From [[#eq-crossover]],
$$
N^* = \frac{60\,000 - 1\,500}{22.00 - 6.00} = \frac{58\,500}{16.00} = 3\,656.25,
$$
so die casting is cheaper from $3\,657$ parts upwards.

At $N = 1\,000$: CNC $22.00 + 1.50 = 23.50$; die cast $6.00 + 60.00 = 66.00$. At $N = 10\,000$: CNC $22.00 + 0.15 = 22.15$; die cast $6.00 + 6.00 = 12.00$.

**Sanity check.** At $N^*$ both give about $22.41$ ✓. The CNC cost is nearly flat in $N$ (tooling is a small share), while the casting cost falls steeply until tooling becomes negligible. The decision also depends on things outside the model: the die takes weeks to make, the design is harder to change once the die exists, and die casting brings porosity and draft angles that the machined part does not have. A common route is to machine the first few hundred parts while the die is being made.
:::

:::

::: widget plot
f: v1 + 1500/(1000*x); v2 + 60000/(1000*x)
x: 0.2, 20
y: 0, 80
sliders: v1=22:5:40:0.5; v2=6:2:15:0.5
labels: \text{CNC from bar}; \text{die cast + finish machining}
caption: Unit cost against production volume (horizontal axis in thousands of parts) for the two routes of [[#ex-crossover]], with tooling 1 500 and 60 000. The curves cross at the crossover volume. Raise the die-cast variable cost $v_2$ (a more complex casting needing more finish machining) and watch the crossover move to the right; lower the CNC variable cost $v_1$ (faster machining strategies) and it moves further still. At large volumes each curve flattens towards its variable cost.
:::

### Selecting a process

A shortlist of candidate processes follows from a few attributes of the part: the **material** class (not every process can handle every material — die casting is for low-melting alloys of aluminium, zinc and magnesium; injection moulding for thermoplastics), the **shape** (prismatic, rotational, thin-walled, hollow), the **size** and mass, the required **tolerances** and **surface finish**, and the **production volume**. Ashby's process-selection charts plot these attributes for families of processes and allow the shortlist to be made systematically; the unit-cost model then ranks the survivors. As a rough guide:

- **Machining** (turning, milling, drilling, grinding) reaches the finest tolerances and finishes and needs little dedicated tooling, but is slow and wastes material. It suits low volumes, prototypes and precision features on parts made by other processes.
- **Casting** gives complex shapes in one step. Sand casting has cheap tooling and suits large parts at low volume; investment casting gives fine detail; pressure die casting needs costly dies and suits high volumes of non-ferrous parts.
- **Forming** — forging, extrusion, sheet-metal stamping and bending — produces strong parts quickly but needs dies whose cost must be spread over large volumes (simple press-brake bending is the exception).
- **Injection moulding** of polymers has very high tooling cost and very low variable cost; at high volume it is often the cheapest way to make a complex part, and it can integrate many features (snap fits, hinges, bosses, ribs) into one part.
- **Additive manufacturing** needs no part-specific tooling and allows shapes no other process can make, at a high variable cost per part; it suits prototypes, small batches and parts whose geometry gives a functional benefit.

## Design for assembly {#sec-dfa}

Assembly is often a large share of the cost of a product, and every part adds to it twice: once in its own manufacture and once in being handled, oriented, inserted and fastened. It also adds to inventory, documentation, purchasing, inspection and the number of things that can go wrong. The most powerful DFA question is therefore not "how can this part be assembled more easily?" but "does this part need to exist?"

::: definition Theoretical minimum number of parts {#def-min-parts}
In the Boothroyd–Dewhurst method, each part is tested, in assembly order, against three questions. A part is a **candidate for elimination** (by combining it with another part or doing away with it) unless at least one answer is yes:
1. During the product's operation, does the part **move relative to** all other parts already assembled? (Only gross motion counts; small elastic movements that an integral elastic element could provide do not.)
2. Must the part be of a **different material** from, or be **isolated** from, all other parts already assembled? (Only for fundamental reasons: electrical or thermal insulation, wear resistance, a property the other material cannot provide.)
3. Must the part be **separate** from all other parts already assembled, because otherwise the necessary **assembly or disassembly** of other parts would be impossible?

The number of parts that pass at least one test is the **theoretical minimum number of parts** $N_\text{min}$. The first part assembled (the base) always counts. Fasteners, connectors and spacers almost always fail all three questions.
:::

The criteria are deliberately strict. They identify the theoretical minimum; whether a part should actually be eliminated depends on cost, practical constraints (a part that must be serviced, a supplier boundary, a standard purchased component) and the processes available. Their value is that they make the designer justify every part.

::: definition Design efficiency {#def-design-efficiency}
The Boothroyd–Dewhurst **design efficiency** (DFA index) of a manual assembly is
$$
E_\text{ma} = \frac{N_\text{min}\, t_a}{t_\text{ma}},
$$ {#eq-dfa-index}
where $t_\text{ma}$ is the estimated total manual assembly time and $t_a = 3\,\mathrm s$ is the time taken, in their data, to handle and insert an ideal part — small, symmetric, easy to grasp, needing no orientation, and inserted without resistance or fastening. A product with only $N_\text{min}$ ideal parts would score $E_\text{ma} = 1$.
:::

The assembly time of each part is the sum of a **handling** time (grasping, orienting, moving it to the work point) and an **insertion** time (placing and fastening). In the full method both are taken from tables indexed by a classification code of the part's features: its symmetry about and perpendicular to the axis of insertion, its size and thickness, whether it nests or tangles, whether it needs tools or two hands, whether access is obstructed, whether it must be held down while the next part is placed, and whether it is fastened by screwing, riveting or bending. Threaded fasteners are particularly expensive because screwing takes several seconds on top of handling and insertion.

::: algorithm Manual DFA analysis {#alg-dfa}
1. Obtain the drawings or a prototype, and take the product apart (physically or mentally), recording parts and subassemblies in assembly order.
2. For each part, record the number of identical parts, estimate the handling and insertion times (from the tables in the full method), and apply the three minimum-part questions.
3. Sum the times to get $t_\text{ma}$, count $N_\text{min}$, and compute $E_\text{ma}$ from [[#eq-dfa-index]].
4. Redesign: first eliminate or combine parts that failed all three questions — especially fasteners — then improve the handling and insertion of the parts that remain (symmetry, chamfers and lead-ins, self-locating features, top-down assembly with no reorientation, snap fits instead of screws).
5. Re-analyse the redesign and estimate the part manufacturing costs: a combined part is more complex and must still be cheaper overall.
:::

::: example DFA of a fan-motor mount {#ex-dfa}
A small fan-motor mount consists of: a sheet-steel base plate; the motor; two motor screws; a bracket that holds the motor's rear end; two bracket screws; a cover that must be removable for service; four cover screws; a cable clip; and a rubber grommet that protects the cable where it passes through the base. Estimated handling-plus-insertion times (seconds) per item are: base 3.5, motor 8.0, each screw 8.0, bracket 4.5, cover 5.5, cable clip 4.0, grommet 6.0. Find $N_\text{min}$, the assembly time and the design efficiency. Then evaluate a redesign with a moulded base that carries integral clips for the motor and an integral cable guide, and a cover that snaps on.
::: solution
**Minimum parts.** Base: first part, counts. Motor: a purchased unit with moving parts, different materials; counts. Motor screws, bracket screws, cover screws: fasteners — fail all three. Bracket: no relative motion, can be the same material as the base and does not need to be separate; fails. Cover: must be separate so that the motor can be serviced (question 3); counts. Cable clip: fails (can be a feature of the base or cover). Grommet: rubber, different material for a fundamental reason (protecting the cable insulation); counts. So $N_\text{min} = 4$ out of $1 + 1 + 2 + 1 + 2 + 1 + 4 + 1 + 1 = 14$ parts.

**Time.** $t_\text{ma} = 3.5 + 8.0 + 2(8.0) + 4.5 + 2(8.0) + 5.5 + 4(8.0) + 4.0 + 6.0 = 95.5\,\mathrm s$, of which $64\,\mathrm s$ is the eight screws.

**Efficiency.** $E_\text{ma} = 4\times3/95.5 = 0.126$, about $13\,\%$.

**Redesign.** Moulded base (3.5 s), motor snapped into integral clips (estimated 7.0 s), grommet (6.0 s), snap-on cover (6.5 s, a little more than before because the snap must be aligned and pressed). Four parts, $t_\text{ma} = 23.0\,\mathrm s$, $E_\text{ma} = 12/23.0 = 0.52$.

**Sanity check.** The redesign has exactly $N_\text{min}$ parts, so its efficiency is limited only by the times of those parts; $E_\text{ma} \le 1$ ✓. The saving in assembly time ($72.5\,\mathrm s$ per unit) must be weighed against the cost of the injection mould for the new base, by the crossover reasoning of [[#prop-crossover]], and the snap-on cover must still be removable for service without breaking the snap — a requirement for the snap-fit design.
:::

:::

::: warning Part-count reduction is not free
Combining parts makes the remaining parts more complex. A moulded base with integral clips needs a more expensive mould, possibly with side actions; a combined casting may need more machining; a part that combines a wearing feature with a structural one forces the whole part to be replaced when the feature wears. Always estimate the manufacturing cost of the new parts and the effect on service and recycling ([[design-process/sustainability]]) before declaring a redesign better. DFA reduces the number of parts; it is the total cost — parts, tooling, assembly, quality, service — that must fall.
:::

## Design rules for common processes {#sec-rules}

Design rules summarise what makes a part easy or hard to make by a given process. They are guidelines whose numerical values depend on the material, machine and supplier; check them with the supplier before freezing a design. The reasons behind them matter more than the numbers.

**Machining.**
- Specify the coarsest tolerance and roughest surface finish that the function allows; tighter tolerances need extra passes, grinding or inspection.
- Prefer features that standard tools can reach in few set-ups: holes drilled square to a flat face, internal corners with a radius at least that of a standard cutter (a sharp internal corner in a pocket cannot be milled), no undercuts unless needed.
- Avoid deep, small holes (drills wander and break) and thin walls (they chatter and deflect).
- Dimension features from the datums used to fixture the part, and keep the number of re-clampings small.

**Injection moulding.**
- Keep wall thickness uniform. Thick sections cool slowly, lengthening the cycle and causing sink marks and voids; abrupt changes cause warping. Core out thick regions and use ribs for stiffness.
- Give faces parallel to the direction of mould opening a **draft** angle so that the part releases from the mould.
- Avoid undercuts that need side actions or collapsible cores unless they replace other parts (a snap fit that saves two screws can justify a side action).
- Radius internal corners to reduce stress concentration and help the flow.

**Casting.** Similar reasoning: uniform sections and generous fillets so that the metal solidifies progressively without hot spots (which cause shrinkage porosity), draft for pattern or die removal, cores only where needed, and machining allowance on functional faces.

**Sheet metal.** Use the material's standard thicknesses; keep holes and cut-outs a sufficient distance from bends so that they do not distort; give bends an inside radius of at least the minimum recommended for the material and thickness; add bend-relief cuts where a bend ends at an edge; design flat patterns that nest efficiently on the sheet. The flat length of a bent part is found from the **bend allowance**, the length of the neutral surface in the bend:
$$
BA = \theta\,(R + K t),
$$ {#eq-bend-allowance}
with bend angle $\theta$ in radians, inside radius $R$, thickness $t$ and the empirical **K-factor** $K$ (the position of the neutral surface as a fraction of thickness from the inside; typically between about 0.3 and 0.5 depending on material and $R/t$, and best taken from the press-brake supplier's data).

### Cooling time in injection moulding

The rule "keep walls thin and uniform" has a quantitative basis. Most of an injection-moulding cycle is spent waiting for the part to cool enough to be ejected, and cooling is transient heat conduction through the wall.

::: proposition Cooling time of a moulded wall {#prop-cooling}
A plastic wall of thickness $h$, initially at the melt temperature $T_m$, has both faces held at the mould temperature $T_w$. Keeping only the first term of the series solution for a plane wall, the time for the mid-plane to cool to the ejection temperature $T_e$ is
$$
t_c = \frac{h^2}{\pi^2\alpha}\,\ln\!\left(\frac{4}{\pi}\,\frac{T_m - T_w}{T_e - T_w}\right),
$$ {#eq-cooling}
where $\alpha$ is the thermal diffusivity of the polymer. The cooling time grows with the **square** of the wall thickness.
:::

::: proof
The separation-of-variables solution for a slab of thickness $h$ (half-thickness $h/2$) with both faces suddenly held at $T_w$ gives, at the mid-plane,
$$
\frac{T_c - T_w}{T_m - T_w} = \frac{4}{\pi}\sum_{k=0}^{\infty}\frac{(-1)^k}{2k+1}\exp\!\left(-\frac{(2k+1)^2\pi^2\alpha t}{h^2}\right).
$$
For the times of interest the first term dominates (the second decays nine times faster). Setting $T_c = T_e$ in the first term and solving for $t$ gives [[#eq-cooling]]. Assumptions: constant properties, one-dimensional conduction through the wall, perfect contact with a mould face at constant temperature, and no heat from crystallisation. The method for transient conduction is in [[heat-transfer]].
:::

::: example Halving the wall thickness {#ex-cooling}
A part in a polymer with $\alpha = 1.0\times10^{-7}\,\mathrm{m^2/s}$ is moulded with $T_m = 230\,^\circ\mathrm C$, $T_w = 50\,^\circ\mathrm C$ and ejection at a mid-plane temperature of $90\,^\circ\mathrm C$. Compare the cooling times for walls of $4\,\mathrm{mm}$ and $2\,\mathrm{mm}$.
::: solution
The logarithm is $\ln\!\left(\frac4\pi\times\frac{180}{40}\right) = \ln(5.73) = 1.746$.

For $h = 4\,\mathrm{mm}$: $t_c = \dfrac{(4\times10^{-3})^2}{\pi^2\times1.0\times10^{-7}}\times1.746 = 16.2\times1.746 = 28.3\,\mathrm s$.

For $h = 2\,\mathrm{mm}$: one quarter, $7.1\,\mathrm s$.

**Sanity check.** Temperature differences enter only through a logarithm, so the result is insensitive to them; thickness enters squared. Cooling times of a few to a few tens of seconds are typical of moulding, so the order of magnitude is right. Halving the wall cuts about $21\,\mathrm s$ from every cycle — on a mould producing a million parts that is about 5 900 machine-hours — which is why stiffness is obtained with ribs rather than thick walls.
:::

### Snap fits

Snap fits replace screws by an elastic hook that deflects during assembly and springs back behind a catch. They are the commonest way of achieving the fastener elimination that DFA calls for in plastic parts. The simplest is a cantilever hook of constant rectangular section.

The design guides published by plastics suppliers give, for a cantilever of length $L$ and thickness $t$ deflected by $y$ at its tip, the maximum surface strain at the root (simple beam theory, $\varepsilon = \sigma/E$ with $\sigma = M/S$ and $y = PL^3/(3EI)$)
$$
\varepsilon = \frac{3\,t\,y}{2\,L^2},
$$ {#eq-snap-strain}
which must not exceed the **permissible strain** quoted by the supplier for that grade (larger for a snap used once than for one assembled repeatedly). The force needed to deflect the hook, with $b$ its width and $E_s$ the secant modulus at that strain, is $P = b\,t^2E_s\varepsilon/(6L)$, and the force to push it over a lead-in ramp of angle $\alpha$ with friction coefficient $\mu$ is
$$
W = P\,\frac{\mu + \tan\alpha}{1 - \mu\tan\alpha}.
$$ {#eq-snap-force}

:::

::: example Sizing a cantilever snap {#ex-snap}
A cover is held by cantilever snaps $L = 15\,\mathrm{mm}$ long, $t = 1.8\,\mathrm{mm}$ thick and $b = 8\,\mathrm{mm}$ wide, which must deflect $y = 1.2\,\mathrm{mm}$ to pass the catch. The supplier gives a permissible strain of $2\,\%$ for repeated assembly and a secant modulus of $2.0\,\mathrm{GPa}$ at that strain; the ramp angle is $30^\circ$ and $\mu = 0.3$. Check the strain and find the assembly force per snap.
::: solution
From [[#eq-snap-strain]]: $\varepsilon = 1.5\times1.8\times1.2/15^2 = 0.0144 = 1.44\,\%$, below $2\,\%$ ✓.

Deflection force (mm and N/mm²): $P = 8\times1.8^2\times2000\times0.0144/(6\times15) = 8.29\,\mathrm N$.

Mating force: $(\mu + \tan\alpha)/(1 - \mu\tan\alpha) = (0.3 + 0.577)/(1 - 0.173) = 1.061$, so $W = 8.8\,\mathrm N$ per snap. With four snaps the cover needs about $35\,\mathrm N$ to push home, comfortable by hand.

**Sanity check.** The strain varies as $t/L^2$: a hook half as long would see four times the strain, $5.8\,\%$, too much — this is why snap hooks are long and thin. For a removable cover the catch face must also be angled so that the snap can be released without breaking it (or a release tool provided).
:::

:::

::: quiz
Which of the following parts in an assembly would normally pass at least one of the three Boothroyd–Dewhurst minimum-part questions? (Select all that apply.)
- [ ] a spacer that sets the distance between two parts
- [x] a shaft that rotates in a housing
- [x] an electrically insulating washer between a live terminal and a metal frame
- [ ] a screw that holds a cover on
- [x] a lid that must be removed to fill a tank
::: solution
The shaft moves relative to the housing (question 1); the insulating washer must be of a different material for a fundamental reason (question 2); the lid must be separate for the tank to be filled (question 3 in the sense of access). The spacer and the screw fail all three: the spacer's dimension can be built into one of the parts, and the screw's function can be provided by a snap or by integral features.
:::
:::

## DFMA in the design process {#sec-dfma-process}

DFM and DFA are most effective in embodiment design, when the architecture and the main parts are being decided, and least effective as an audit of finished drawings. A practical approach is:

1. During concept and embodiment design, keep part count low and choose processes using the cost model and process-selection tools.
2. Hold a DFA analysis of the first layout, with a manufacturing engineer present; set a target design efficiency or part count.
3. Use process-specific rules and supplier consultation (**early supplier involvement**) during form and detail design.
4. Estimate costs part by part (should-cost models) and compare with quotations.
5. Review again before tooling is ordered, because after that every change is expensive.

DFMA interacts with other design-for-X goals. Fewer parts generally help reliability (fewer joints and connections to fail, [[design-process/reliability-risk]]); snap fits and integral parts help assembly but can hinder disassembly and recycling unless designed to release; combined parts of a single material help recycling; fewer fasteners can complicate service. The design team has to balance these consciously.

::: history
Geoffrey Boothroyd and colleagues began research on the economics of assembly at the University of Massachusetts Amherst in the early 1970s; Boothroyd's *Design for Assembly — A Designer's Handbook* appeared there in 1980. With Peter Dewhurst he developed a computer version of the method from 1981, and they continued the work at the University of Rhode Island from 1985. In 1991 Boothroyd and Dewhurst received the US National Medal of Technology for the development and commercialisation of design for manufacture and assembly. Their book with Winston Knight, *Product Design for Manufacture and Assembly*, is in its third edition (2011).
:::

::: summary
- Unit cost $C = C_m + C_p + C_t/N$: processes with high tooling cost and low variable cost win above the crossover volume $N^* = (C_{t2} - C_{t1})/(v_1 - v_2)$.
- Shortlist processes by material, shape, size, tolerance and volume; rank them with the cost model.
- Boothroyd–Dewhurst DFA: a part is needed only if it moves relative to the others, must be a different material for a fundamental reason, or must be separate for assembly or disassembly. $E_\text{ma} = N_\text{min}\times3\,\mathrm s/t_\text{ma}$.
- Eliminate fasteners first; then make the remaining parts easy to handle and insert. Check that combined parts are still cheaper overall.
- Process rules: coarsest tolerances that work, standard tools and few set-ups (machining); uniform thin walls, draft, ribs (moulding and casting); bend radii, hole distances and bend reliefs (sheet metal).
- Moulding cooling time $\propto h^2$; a cantilever snap's root strain is $\varepsilon = 1.5\,t\,y/L^2$, to be kept below the supplier's permissible strain.
:::

## Exercises

::: exercise Crossover volume {#exr-crossover level=1 check="4000"}
Process A has tooling cost 2 000 and variable cost 12.00 per part; process B has tooling cost 30 000 and variable cost 5.00 per part. Above what production volume is process B cheaper? (Enter $N^*$.)
::: solution
$N^* = (30\,000 - 2\,000)/(12.00 - 5.00) = 28\,000/7.00 = 4\,000$ parts. At exactly 4 000 both cost $12.00 + 0.50 = 12.50 = 5.00 + 7.50$ ✓.
:::
:::

::: exercise Unit cost of a moulding {#exr-unit-cost level=1 check="1.55"}
An injection mould costs 40 000. Each part needs 0.30 of material and 0.45 of machine time. What is the unit cost for a run of 50 000 parts? (Enter $C$ in currency units per part.)
::: solution
$C = 0.30 + 0.45 + 40\,000/50\,000 = 0.75 + 0.80 = 1.55$. More than half the cost is tooling at this volume; at 500 000 parts it would be $0.83$.
:::
:::

::: exercise Design efficiency {#exr-efficiency level=1 check="25"}
An assembly has a theoretical minimum of 5 parts and an estimated manual assembly time of 60 s. What is its Boothroyd–Dewhurst design efficiency? (Enter $E_\text{ma}$ in per cent.)
::: solution
$E_\text{ma} = 5\times3/60 = 0.25 = 25\,\%$.
:::
:::

::: exercise Minimum part count of a pump cover {#exr-min-parts level=2 check="3"}
A pump cover subassembly consists of a cast cover, a gasket, six bolts, six washers, a nameplate fixed by two rivets, and a bronze bearing bush pressed into the cover to support the rotating shaft. The information on the nameplate can be cast or laser-marked onto the cover. Apply the three minimum-part questions and find $N_\text{min}$. (Enter the number of parts.)
::: solution
Cover: base part, counts. Gasket: a compliant sealing material different from the cast metal for a fundamental reason; counts. Bolts, washers, rivets: fasteners; fail. Nameplate: its function can be integrated into the cover; fails. Bush: must be a different material (bronze bearing surface against the shaft, which the cast cover cannot provide); counts. $N_\text{min} = 3$ of 18 parts. In practice the cover must still be bolted to the pump body (it must be removable), but the analysis points to reducing the bolt count, using captive bolts, or eliminating the washers.
:::
:::

::: exercise Snap-fit deflection {#exr-snap level=2 check="1.28"}
A cantilever snap hook of constant rectangular section is $12\,\mathrm{mm}$ long and $1.5\,\mathrm{mm}$ thick, in a polymer with a permissible strain of $2\,\%$. What is the largest tip deflection (the undercut depth) it can be designed for? (Enter $y$ in mm.)
::: solution
From [[#eq-snap-strain]], $y = \dfrac{2\varepsilon L^2}{3t} = \dfrac{2\times0.02\times144}{3\times1.5} = 1.28\,\mathrm{mm}$.
:::
:::

::: exercise Cooling time and wall thickness {#exr-cooling level=2 check="2.25"}
A moulded part's wall is to be reduced from $3\,\mathrm{mm}$ to $2\,\mathrm{mm}$, with the same material and temperatures. By what factor does the cooling time decrease? (Enter the ratio $t_{3\,\mathrm{mm}}/t_{2\,\mathrm{mm}}$.)
::: solution
From [[#eq-cooling]], $t_c \propto h^2$: $(3/2)^2 = 2.25$.
:::
:::

::: exercise Flat length of a bent bracket {#exr-bend level=2 check="54.08"}
An L-bracket is bent through $90^\circ$ from $1.5\,\mathrm{mm}$ sheet with an inside radius of $2.0\,\mathrm{mm}$ and K-factor $0.40$. The two flat legs, measured up to the start of the bend, are $30\,\mathrm{mm}$ and $20\,\mathrm{mm}$ long. What is the flat blank length? (Enter it in mm, rounded to two decimal places.)
::: solution
$BA = \frac{\pi}{2}(2.0 + 0.40\times1.5) = 1.5708\times2.6 = 4.084\,\mathrm{mm}$. Flat length $= 30 + 20 + 4.084 = 54.084 \approx 54.08\,\mathrm{mm}$. Check: it lies between the inside-arc length ($\frac\pi2\times2.0 = 3.14$) and the outside-arc length ($\frac\pi2\times3.5 = 5.50$) added to the legs ✓.
:::
:::

::: exercise Tool replacement in the cost model {#exr-tool-life level=3}
A die costs $C_t$ and wears out after $N_T$ parts, after which it must be replaced at the same cost. (a) Write the unit cost for a run of $N$ parts. (b) Show that for $N \gg N_T$ the unit cost tends to $v + C_t/N_T$, and explain what this means for comparing processes at very high volumes. (c) A stamping die costs 25 000 and lasts 400 000 parts; variable cost is 0.12. Find the unit cost for 1 000 000 parts.
::: solution
(a) The number of dies needed is $\lceil N/N_T\rceil$, so $C = v + C_t\lceil N/N_T\rceil/N$.

(b) $\lceil N/N_T\rceil/N$ lies between $1/N_T$ and $1/N_T + 1/N$, so it tends to $1/N_T$ as $N \to \infty$. Tooling then behaves as a variable cost $C_t/N_T$ per part; the crossover analysis of [[#prop-crossover]] must include it, and at very high volumes durable tooling (hardened or carbide dies) can be cheaper despite its higher price.

(c) $\lceil 10^6/4\times10^5\rceil = 3$ dies: $C = 0.12 + 3\times25\,000/10^6 = 0.12 + 0.075 = 0.195$.
:::
:::

::: exercise A DFMA redesign {#exr-redesign level=3}
A hand-held torch has: an aluminium tube body, a threaded aluminium tail cap with a spring, a reflector, a lens, a threaded bezel that holds the lens, an O-ring at each threaded joint, an LED module on a small circuit board, two screws holding the board, a push switch, and a battery holder. Apply the three minimum-part questions, propose a redesign with fewer parts, and discuss what the redesign might cost in manufacture, sealing, service (battery change) and recycling.
::: solution
A defensible analysis: tube body (base) counts; tail cap must be separate to change the battery (question 3); spring moves relative to others and must be a spring material (questions 1 and 2), but could be integrated into the battery holder; reflector must be reflective but could be a coated feature of a moulded part; lens must be transparent (different material) — counts; bezel needed only to retain the lens, which could be over-moulded or snapped; O-rings are a different material (elastomer seal) — count, unless sealing is achieved by an over-moulded seal; LED module counts (different materials, electronic); screws fail; switch moves (counts); battery holder may be combined with the spring and contacts.

A redesign might mould the body in a polymer with an integral reflector, retain the lens by a snap ring or over-moulding, snap the LED board into ribs, and combine spring, contacts and switch into one tail-cap module. Costs: a mould and possibly two-shot moulding; a polymer body has poorer heat-sinking for the LED; a non-removable lens is not serviceable; sealing a snap joint to an ingress-protection rating is harder than sealing a thread with an O-ring; the battery change must stay tool-free. For recycling, separable metal and polymer parts and a removable battery are desirable, which argues against over-moulding dissimilar materials. A good answer shows the part count before and after and states which questions each surviving part passes.
:::
:::

## Further reading

Boothroyd, Dewhurst and Knight, *Product Design for Manufacture and Assembly* (3rd edition, CRC Press, 2011), gives the complete DFA method with its handling and insertion time tables, and cost models for the main processes. Ashby, *Materials Selection in Mechanical Design* (5th edition, Butterworth-Heinemann, 2016), covers process selection charts and cost modelling. Ulrich, Eppinger and Yang, *Product Design and Development* (7th edition, McGraw-Hill, 2020), has a chapter on design for manufacturing within product development. Plastics suppliers' snap-fit and part-design guides give the permissible strains and design rules for their materials.
