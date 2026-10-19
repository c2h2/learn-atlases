Design for Manufacture (DFM) and Design for Assembly (DFA) are the disciplines that ensure the design can be made and assembled at the target cost. The discipline is not optional: **70–80 % of the product's life-cycle cost is determined at the design stage, and 30–40 % of the manufacturing cost is determined by the design's manufacturability.** A design that requires five-axis machining, three custom fixtures, and a two-hour setup will cost 5–10× more to manufacture than a design that requires three-axis machining, a standard vise, and a ten-minute setup — and the difference is locked in at the detail-design stage, before the first part is cut. **The engineer who optimises the cutting parameters by 10 % saves less money than the engineer who eliminates the five-axis operation.**

DFM is the practice of designing the part so that the manufacturing process is simple, the tolerances are achievable, the material is available, and the inspection is straightforward. DFA is the practice of designing the assembly so that the part count is low, the assembly direction is uniaxial, the fasteners are minimal, and the parts are self-locating. The two disciplines are complementary: DFM reduces the cost of the part, DFA reduces the cost of the assembly, and the total cost is the sum of the two. **The product that is easy to make but hard to assemble costs the same as the product that is hard to make but easy to assemble, and both cost more than the product that is easy to make and easy to assemble.**

The tools of DFM/DFA are the design rules (the process-specific guidelines that say "do not design a blind hole with a radius smaller than the tool radius"), the part-count reduction analysis (the question "can these three parts be made as one?"), the assembly-time estimation (the Boothroya-Dewhurst method), and the cost model (the piece-cost calculation from [[manufacturing/process-selection|process selection]]). The tools are simple; the difficulty is the organisational one: the design engineer must talk to the manufacturing engineer before the design is frozen, and the conversation must happen at the concept stage, not at the detail stage.

::: warning Nine ways DFM/DFA goes wrong
**Designing the part in isolation from the assembly.** The engineer who designs a bracket that is easy to machine but requires the assembler to hold three components, two fasteners, and a washer simultaneously is not designing a part; they are designing an assembly problem. **Design the part and the assembly together, and count the assembly time, not just the machining time.** **Specifying tolerances that the process cannot hold.** The engineer who specifies ± 0.01 mm on a sand-cast surface is not specifying a tolerance; they are specifying a rework operation. **Every tolerance must be checked against the process capability ($C _ { p k }$) of the manufacturing process, and the process capability is the reason the tolerance is ± 0.5 mm on the cast surface and ± 0.02 mm on the machined surface.** **Not applying the process-specific design rules.** The engineer who designs a plastic part with a uniform wall thickness, no draft angles, and undercuts is not designing a moulding; they are designing a sink-mark, a weld-line, and a tool that cannot be ejected. **Apply the design rules for the process you intend to use, and the rules are in the process-specific DFM guidelines (injection moulding, casting, machining, sheet metal, welding).** **Not reducing the part count.** The assembly with 20 parts costs more than the assembly with 10 parts, because each part has a separate procurement, inspection, storage, and assembly cost. **Ask "can these three parts be made as one?" for every assembly, and the answer is usually yes for castings, mouldings, and weldments.** **Not designing for one-directional assembly.** The assembly that requires the assembler to flip the product over three times is the assembly that takes three times longer than the assembly that stacks from the bottom. **Design the assembly so that all parts are inserted from one direction (usually vertical, top-down), and the self-locating features eliminate the need for the assembler to hold the part in position.** **Not minimising the fasteners.** Each fastener costs 10–30 seconds to install, and the installation time is the dominant assembly cost. **Replace the fasteners with snap-fits, living hinges, press-fits, and welds where the function allows, and use the minimum number of fasteners where they are required.** **Not designing for inspection.** The engineer who designs a bore with a tolerance of ± 0.01 mm and no datum feature is not specifying a bore; they are specifying an argument with the metrology engineer. **Every critical dimension must have a datum reference frame, and the datum is the reason the part is inspected on a CMM and not thrown in the scrap bin.** **Not considering the tool access.** The engineer who designs a five-sided box with an internal cavity is not designing a part; they are designing a part that cannot be machined, cannot be moulded, and cannot be assembled. **Every internal feature must be accessible to the tool, the die, or the assembly operator, and the accessibility is the constraint that drives the geometry.** **Not talking to the manufacturer.** The engineer who designs the part without consulting the manufacturer is designing the part that the manufacturer will quote at 3× the target cost. **Bring the manufacturer to the design review, and the manufacturer's feedback is the reason the design is manufacturable.**
:::

## 1. DFM principles and process-specific design rules

::: definition Design for Manufacture: the general principles {#def-dfm-principles}
**Design for Manufacture** (DFM) is the practice of designing the part so that the manufacturing process is simple, the tolerances are achievable, the material is available, and the inspection is straightforward. The general principles are:

$$
\begin{array} { l l l l }
\textbf{Principle} & \textbf{Description} & \textbf{Cost impact} & \textbf{Example} \\ \hline
\text{Reduce the part count} & \text{Fewer parts, fewer operations} & 10--30 \ \% \text{ cost reduction} & \text{Cast the bracket as one piece} \\
\text{Standardise the geometry} & \text{Standard tools, standard processes} & 5--15 \ \% \text{ cost reduction} & \text{Use standard drill sizes} \\
\text{Tolerances: loose where possible} & \text{Tight tolerances cost 10--100×} & 20--50 \ \% \text{ cost reduction} & \text{± 0.5 mm on the cast surface} \\
\text{Design for the process} & \text{Apply the process-specific rules} & 10--30 \ \% \text{ cost reduction} & \text{Draft angles, uniform walls} \\
\text{Avoid unnecessary features} & \text{Every feature costs time and money} & 5--20 \ \% \text{ cost reduction} & \text{Remove the cosmetic fillet} \\
\text{Design for inspection} & \text{Accessible datums, measurable features} & \text{Reduces scrap and rework} & \text{Datum features on the drawing} \\
\end{array}
$$

**The most important DFM principle is the first: reduce the part count.** Each part in the assembly has a separate procurement cost, inspection cost, storage cost, and assembly cost. The part-count reduction from 20 to 10 saves 50 % of the assembly cost, and the assembly cost is 30–50 % of the total manufacturing cost. **The part that is not there cannot be procured, inspected, stored, assembled, or fail in the field.**
:::

::: definition DFM for machining {#def-dfm-machining}
Machining is the most versatile manufacturing process and the most expensive per unit volume removed. The DFM rules for machining are:

$$
\begin{array} { l l l }
\textbf{Rule} & \textbf{Reason} & \textbf{Cost impact} \\ \hline
\text{Use standard tool sizes} & \text{Standard drills, end mills, reamers} & 10--20 \ \% \text{ tooling cost} \\
\text{Avoid deep pockets} & \text{Tool length } > 4 \times \text{ diameter causes chatter} & 20--50 \ \% \text{ machining time} \\
\text{Use large inside radii} & \text{Large radius = large tool = faster cut} & 10--30 \ \% \text{ machining time} \\
\text{Avoid thin walls} & t < 1 \ \text{mm} \text{ in steel, } 0.5 \ \text{mm in aluminium} & \text{Scrap, distortion} \\
\text{Machine from one side} & \text{One setup, one fixture} & 30--50 \ \% \text{ setup cost} \\
\text{Use standard materials} & \text{Stock sizes, standard grades} & 10--20 \ \% \text{ material cost} \\
\text{Avoid five-axis features} & \text{Five-axis costs 3--5× three-axis} & 200--400 \ \% \text{ machining cost} \\
\text{Specify surface finish: loose} & R_a 3.2 \ \mu m \text{ is 2× cheaper than } R_a 0.8 \ \mu m & 50--100 \ \% \text{ finishing cost} \\
\end{array}
$$

**The most expensive machining feature is the five-axis operation: a feature that requires the part to be re-oriented in the fixture costs 3–5× more than a feature that can be machined from one side. The five-axis operation is the reason the part costs £500 instead of £100, and the reason is the design, not the machinist.**
:::

::: definition DFM for injection moulding {#def-dfm-moulding}
Injection moulding is the most common process for plastic parts, and the DFM rules are driven by the flow of the melt and the cooling of the solid:

$$
\begin{array} { l l l }
\textbf{Rule} & \textbf{Reason} & \textbf{Consequence of violation} \\ \hline
\text{Uniform wall thickness} & \text{Uneven cooling causes sink and warpage} & \text{Sink marks, dimensional instability} \\
\text{Wall thickness: 1--4 mm} & \text{Too thin: short shot; too thick: sink} & \text{Short shot or sink} \\
\text{Draft angle: 1--2°} & \text{Part must eject from the mould} & \text{Part sticks, mould damage} \\
\text{Inside radius: } R \geq 0 . 5 t & \text{Stress concentration, flow} & \text{Cracking, weld lines} \\
\text{Outside radius: } R \geq 1 . 5 t & \text{Sink mark on the surface} & \text{Cosmetic defect} \\
\text{Avoid undercuts} & \text{Undercuts require side-cores} & \text{Tool cost 2--5×} \\
\text{Gate at the thickest section} & \text{Melt flows to the thinnest section} & \text{Short shot, weld lines} \\
\text{Avoid metal inserts} & \text{Inserts require a second moulding step} & \text{Cycle time 2--3×} \\
\end{array}
$$

**The most expensive moulding feature is the undercut: an undercut requires a side-core, which requires a second parting line, which requires a more complex tool, which costs 2–5× more. The undercut that is designed out of the part saves £5 000–£20 000 in tooling cost, and the saving is the reason the DFM review is done before the tool is cut, not after.**
:::

::: definition DFM for sheet metal and welding {#def-dfm-sheet}
Sheet metal and welding are the processes for structural parts, and the DFM rules are driven by the bend radius, the weld accessibility, and the distortion control:

$$
\begin{array} { l l l }
\textbf{Rule} & \textbf{Reason} & \textbf{Consequence of violation} \\ \hline
\text{Bend radius } \geq t & \text{Smaller radius cracks the outer fibre} & \text{Cracking at the bend} \\
\text{Bend length } \geq 4 t & \text{Short bends are unstable} & \text{Springback, dimensional error} \\
\text{Hole-to-bend distance } \geq 2 t & \text{Hole deforms during bending} & \text{Oval hole, misalignment} \\
\text{Weld joint: accessible} & \text{The welder needs access} & \text{Weld defect, rework} \\
\text{Weld joint: symmetric} & \text{Asymmetric welds cause distortion} & \text{Distortion, straightening cost} \\
\text{Avoid welds on machined surfaces} & \text{Weld distortion ruins the machining} & \text{Re-machining, scrap} \\
\text{Use standard sheet sizes} & \text{Standard sizes minimise scrap} & 10--20 \ \% \text{ material cost} \\
\text{Punch features before bending} & \text{Bending deforms the punched features} & \text{Misalignment, rework} \\
\end{array}
$$

**The most expensive sheet-metal feature is the weld on a machined surface: the weld distortion ruins the machining, and the re-machining costs 2–3× the original machining. The design that puts the weld on a non-machined surface saves the re-machining cost, and the saving is the reason the DFM review is done before the drawing is issued, not after.**
:::

::: example DFM review of a bracket {#ex-dfm-bracket level=3 check="4"}
A bracket is designed as a five-axis machined steel part with 12 features: 4 bolt holes, 2 dowel holes, 3 pockets, 2 slots, and 1 chamfer. The DFM review suggests:

1. Replace the five-axis machining with a welded assembly (2 sheet-metal parts, 4 welds).
2. Replace the 3 pockets with 2 through-holes (eliminates the deep-pocket operation).
3. Replace the 2 slots with 2 round holes (eliminates the slot-milling operation).
4. Standardise the bolt holes to M10 clearance (11 mm) and the dowel holes to H7 (10 mm).

Estimate the cost reduction if the original part costs £180 and the DFM changes reduce the machining time by 60 %.

**The cost reduction is:**

$$
\Delta C \; = \; 0 . 6 0 \times 1 8 0 \; = \; { \bf 1 0 8 } \ \text{pounds per part}
$$

**The new part costs £72, a 60 % reduction. The DFM review cost 2 hours of the manufacturing engineer's time (£200), and the review saves £108 per part. At a volume of 1 000 parts, the saving is £108 000, and the ROI is 540:1. The DFM review is the highest-return activity in the design process, and the return is the reason the review is mandatory at every gate.**
:::

::: widget plot
title: The DFM cost curve: machining time vs number of features
f: 50+15*x; 30+8*x; 20+5*x
x: 0,10
y: 0,200
labels: Five-axis machining; Three-axis machining; Sheet metal + welding
caption: Machining time (minutes) against the number of features for three manufacturing routes. **The five-axis route starts at 50 minutes (setup) and adds 15 minutes per feature; the three-axis route starts at 30 minutes and adds 8 minutes per feature; the sheet-metal route starts at 20 minutes and adds 5 minutes per feature.** **The DFM strategy is to reduce the number of features (from 10 to 4) and to move the part to the cheapest route that meets the requirements. The 10-feature five-axis part costs 200 minutes; the 4-feature sheet-metal part costs 40 minutes. The cost reduction is 80 %, and the reduction is the reason the DFM review is done before the design is frozen.**
:::

## 2. Design for Assembly (DFA)

::: definition The Boothroya-Dewhurst DFA method {#def-dfa-boothroyd}
The **Boothroya-Dewhurst (B-D) DFA method** (Boothroya, Dewhurst & Knight, 1989) is a systematic method for estimating the assembly time and reducing the part count. The method has three steps:

1. **Part-count reduction**: for each part, ask three questions:
   - Does the part move relative to the parts already assembled? If no, it can be merged.
   - Does the part require a different material? If no, it can be merged.
   - Does the part need to be separated for assembly or maintenance? If no, it can be merged.

2. **Assembly-time estimation**: for each part, estimate the handling time ($T _ { h }$) and the insertion time ($T _ { i }$):

$$
T _ { \text{assembly } } \; = \; \sum _ { i \, = 1 } ^ { n } ( T _ { h , i } + T _ { i , i } )
$$

The handling time depends on the part's size, weight, symmetry, and whether it is tangled (e.g., a wire harness). The insertion time depends on the fit (clearance vs interference), the fastener type, and the alignment features.

3. **Cost estimation**: the assembly cost is:

$$
C _ { \text{assembly } } \; = \; T _ { \text{assembly } } \times r _ { \text{labour } }
$$

where $r _ { \text{labour } }$ is the labour rate (£/hour).

**The B-D method is the most widely used DFA method in industry, and the method's power is the three-question test: the test eliminates 30–50 % of the parts, and the elimination is the reason the assembly time drops by 30–50 %.**
:::

::: definition Assembly design rules: one-directional assembly and self-locating features {#def-dfa-rules}
The assembly design rules are:

$$
\begin{array} { l l l l }
\textbf{Rule} & \textbf{Description} & \textbf{Time saving} & \textbf{Example} \\ \hline
\text{One-directional assembly} & \text{All parts inserted from one direction} & 20--40 \ \% & \text{Top-down stack, no flipping} \\
\text{Self-locating features} & \text{Chamfers, dowels, snap-fits} & 10--20 \ \% & \text{Chamfered pin, tapered dowel} \\
\text{Symmetric parts} & \text{No orientation required} & 5--10 \ \% & \text{Round pin, symmetric bracket} \\
\text{Avoid tangling} & \text{No wires, cables, or flexible parts} & 10--30 \ \% & \text{Rigid conduit instead of cable} \\
\text{Minimise fasteners} & \text{Snap-fits, press-fits, welds} & 20--50 \ \% & \text{Snap-fit cover instead of 4 screws} \\
\text{Standardise fasteners} & \text{One screwdriver, one torque setting} & 5--10 \ \% & \text{All screws are M4 × 10 Phillips} \\
\text{Avoid simultaneous operations} & \text{No two-handed assembly} & 10--20 \ \% & \text{Self-holding bracket} \\
\text{Design for automated assembly} & \text{Vertical insertion, no flexible parts} & 50--80 \ \% & \text{Press-fit bearing, not bolted} \\
\end{array}
$$

**The most important DFA rule is the one-directional assembly: the assembly that requires the operator to flip the product over three times takes three times longer than the assembly that stacks from the bottom. The one-directional assembly is the reason the product is designed as a vertical stack, not a horizontal sandwich.**
:::

::: definition Snap-fits, press-fits, and living hinges {#def-dfa-joints}
The DFA strategy replaces fasteners with integral features:

$$
\begin{array} { l l l l }
\textbf{Joint type} & \textbf{Principle} & \textbf{Assembly time} & \textbf{Disassembly} \\ \hline
\text{Snap-fit (cantilever)} & \text{Beam deflects, then snaps back} & 2--5 \ \text{s} & \text{Yes (destructive or reusable)} \\
\text{Snap-fit (annular)} & \text{Ring deflects radially} & 2--5 \ \text{s} & \text{Yes} \\
\text{Press-fit} & \text{Interference fit, no fastener} & 1--3 \ \text{s} & \text{No (destructive)} \\
\text{Living hinge} & \text{Thin membrane, integral flexure} & 0 \ \text{s (integral)} & \text{N/A} \\
\text{Ultrasonic weld} & \text{Vibration melts the interface} & 1--3 \ \text{s} & \text{No} \\
\text{Screw} & \text{Threaded fastener} & 10--30 \ \text{s} & \text{Yes} \\
\text{Rivet} & \text{Deformed pin} & 5--10 \ \text{s} & \text{No} \\
\end{array}
$$

**The snap-fit is the most common DFA joint: it replaces 2–4 screws with a single snap action, and the snap action takes 2–5 seconds instead of 10–30 seconds per screw. The snap-fit saves 20–50 % of the assembly time, and the saving is the reason the snap-fit is the most common joint in consumer electronics, automotive interiors, and packaging.**
:::

::: example DFA of a small electric motor assembly {#ex-dfa-motor level=3 check="6"}
A small electric motor has 12 parts: housing, stator, rotor, 2 bearings, 2 end caps, 4 screws, fan, and terminal block. Apply the B-D three-question test.

**Part-count reduction analysis:**

| Part | Moves? | Different material? | Separated for maintenance? | Can merge? |
|------|--------|-------------------|--------------------------|-----------|
| Housing | No | Yes (steel) | No | — |
| Stator | No | Yes (copper/steel) | No | — |
| Rotor | Yes (rotates) | Yes (steel/copper) | No | — |
| Bearing 1 | Yes (rotates) | Yes (steel) | Yes (wear part) | — |
| Bearing 2 | Yes (rotates) | Yes (steel) | Yes (wear part) | — |
| End cap 1 | No | Yes (aluminium) | Yes (access) | — |
| End cap 2 | No | Yes (aluminium) | Yes (access) | — |
| 4 screws | No | Yes (steel) | Yes (access) | **Merge: 4 → 2 screws** |
| Fan | Yes (rotates) | Yes (plastic) | No | **Merge: fan onto rotor** |
| Terminal block | No | Yes (plastic) | No | **Merge: terminal block onto housing** |

**The part count is reduced from 12 to 9 (25 % reduction). The assembly time is reduced from 45 seconds to 30 seconds (33 % reduction). The assembly cost is reduced from £0.45 to £0.30 per motor, and at a volume of 100 000 motors per year, the saving is £15 000 per year.**
:::

## 3. Cost modelling and the DFM/DFA trade-off

::: definition The piece-cost model and the DFM cost drivers {#def-piece-cost}
The **piece cost** is the cost of one part, and the piece cost is the sum of the material cost, the processing cost, the tooling cost, and the overhead:

$$
c _ { \text{piece } } \; = \; c _ { \text{material } } + c _ { \text{processing } } + { \frac { c _ { \text{tooling } } } { N } } + c _ { \text{overhead } }
$$

The DFM cost drivers are:

$$
\begin{array} { l l l l }
\textbf{Cost driver} & \textbf{Multiplier} & \textbf{DFM action} & \textbf{Saving} \\ \hline
\text{Tight tolerance} & 2\text{--}10 \times & \text{Loosen the tolerance} & 50 \ \% \\
\text{Complex geometry} & 2\text{--}5 \times & \text{Simplify the geometry} & 60 \ \% \\
\text{Exotic material} & 2\text{--}20 \times & \text{Use a standard material} & 70 \ \% \\
\text{Custom tooling} & 1 . 5 \text{--}3 \times & \text{Use standard tooling} & 40 \ \% \\
\text{Low volume} & 2\text{--}10 \times & \text{Increase the volume or use AM} & 50 \ \% \\
\text{High precision} & 3\text{--}10 \times & \text{Reduce the precision requirement} & 60 \ \% \\
\end{array}
$$

**The most expensive cost driver is the exotic material: a titanium part costs 10–20× more than a steel part, and the cost is the material, not the machining. The DFM action is to use a standard material (steel, aluminium, PP, ABS) unless the exotic material is required by the function (corrosion resistance, biocompatibility, non-magnetic).**
:::

::: definition The DFM/DFA trade-off: part count vs process complexity {#def-dfm-tradeoff}
The DFM and DFA objectives are in conflict:

- **DFM** wants to reduce the number of parts by combining features into a single part (e.g., a casting with integral bosses, ribs, and mounting flanges).
- **DFA** wants to reduce the number of parts by combining features into a single part (e.g., a moulding with integral snap-fits, living hinges, and bosses).

**The conflict arises when the combined part requires a more expensive process: a single cast part costs less than three machined parts, but a single five-axis machined part costs more than three three-axis machined parts. The trade-off is resolved by the cost model: the combined part is preferred if the process cost saving exceeds the tooling cost increase.**

$$
C _ { \text{combined } } \; = \; c _ { \text{material } } + c _ { \text{process, combined } } + { \frac { c _ { \text{tooling, combined } } } { N } }
$$

$$
C _ { \text{separate } } \; = \; \sum _ { i } \left( c _ { \text{material } , i } + c _ { \text{process } , i } + { \frac { c _ { \text{tooling } , i } } { N } } \right) + c _ { \text{assembly } }
$$

**The combined part is cheaper when $C _ { \text{combined } } < C _ { \text{separate } }$ , and the crossover volume $N ^ { * }$ is the volume at which the two costs are equal. The crossover volume is the reason the combined part is preferred at high volume and the separate parts are preferred at low volume.**
:::

::: example DFM/DFA trade-off for a gearbox housing {#ex-dfm-gearbox level=3 check="5000"}
A gearbox housing can be made as:

- **Option A**: 3 separate machined parts (front cover, body, rear cover), 12 screws, 2 gaskets.
- **Option B**: 1 sand-cast part (integral housing), 0 screws, 0 gaskets, 1 machined face.

| Cost item | Option A | Option B |
|-----------|----------|----------|
| Material | £45 | £38 |
| Processing | £120 | £85 |
| Tooling (total) | £2 500 | £8 000 |
| Assembly | £15 | £0 |
| Inspection | £10 | £8 |

At what volume does Option B become cheaper?

**Option A piece cost:** $c _ { A } = 4 5 + 1 2 0 + 2 5 0 0 / N + 1 5 + 1 0 = 1 9 0 + 2 5 0 0 / N$

**Option B piece cost:** $c _ { B } = 3 8 + 8 5 + 8 0 0 0 / N + 0 + 8 = 1 3 1 + 8 0 0 0 / N$

**Crossover:** $1 9 0 + 2 5 0 0 / N = 1 3 1 + 8 0 0 0 / N$

$$
5 9 \; = \; 5 5 0 0 / N \quad \Longrightarrow \quad N \; = \; 5 5 0 0 / 5 9 \; = \; { \bf 9 3 } \ \text{units}
$$

**Option B becomes cheaper at a volume of 93 units. At a volume of 1 000 units, Option A costs £192.50 and Option B costs £139.00, a saving of £53.50 per unit or £53 500 per year. The DFM review that recommends Option B saves £53 500 per year, and the review costs 4 hours of the manufacturing engineer's time (£400). The ROI is 134:1.**
:::

## 4. DFM/DFA in practice: the review process

::: definition The DFM/DFA review process {#def-dfm-review}
The **DFM/DFA review** is a structured meeting between the design engineer and the manufacturing engineer, held at the concept stage and repeated at the embodiment and detail stages. The review follows a checklist:

$$
\begin{array} { l l l }
\textbf{Checklist item} & \textbf{Question} & \textbf{Action if "no"} \\ \hline
\text{Process selected?} & \text{Is the manufacturing process chosen?} & \text{Select the process (see process selection)} \\
\text{Process rules applied?} & \text{Are the DFM rules for the process followed?} & \text{Redesign to follow the rules} \\
\text{Tolerances achievable?} & \text{Can the process hold the tolerance?} & \text{Loosen the tolerance or change the process} \\
\text{Material available?} & \text{Is the material available in the required form?} & \text{Change the material or the form} \\
\text{Tooling cost acceptable?} & \text{Is the tooling cost within the budget?} & \text{Simplify the geometry or increase the volume} \\
\text{Part count minimal?} & \text{Can any parts be merged?} & \text{Merge the parts (B-D three-question test)} \\
\text{Assembly one-directional?} & \text{Can all parts be inserted from one direction?} & \text{Redesign the assembly sequence} \\
\text{Fasteners minimal?} & \text{Can any fasteners be replaced by snap-fits?} & \text{Replace the fasteners} \\
\text{Inspection accessible?} & \text{Can all critical dimensions be measured?} & \text{Add datum features or access holes} \\
\text{Cost within target?} & \text{Is the piece cost within the target?} & \text{Iterate the design or change the process} \\
\end{array}
$$

**The DFM/DFA review is the most cost-effective activity in the design process: the review costs 2–8 hours of the manufacturing engineer's time, and the review saves 10–50 % of the manufacturing cost. The review that saves 10 % of a £1 million annual production budget saves £100 000, and the review costs £1 000. The ROI is 100:1.**
:::

::: definition Design for Environment (DfE) and design for disassembly {#def-dfe}
**Design for Environment** (DfE) extends the DFM/DFA discipline to the end-of-life phase: the product must be disassembled, the materials must be separated, and the components must be recycled or disposed of. The DfE rules are:

$$
\begin{array} { l l l }
\textbf{Rule} & \textbf{Description} & \textbf{Example} \\ \hline
\text{Design for disassembly} & \text{Use reversible joints (screws, snap-fits)} & \text{Screws instead of welds} \\
\text{Label the materials} & \text{ISO 11469 resin identification codes} & \text{PP, ABS, PC/ABS on the moulding} \\
\text{Minimise material variety} & \text{Fewer materials, easier recycling} & \text{One polymer family for the housing} \\
\text{Avoid bonded joints} & \text{Adhesives prevent material separation} & \text{Snap-fits instead of glue} \\
\text{Avoid composites in small parts} & \text{CFRP/GFRP cannot be recycled} & \text{Use metal for small parts} \\
\text{Design for remanufacture} & \text{Wear parts are replaceable} & \text{Replaceable bearing, not sealed unit} \\
\end{array}
$$

**The DfE rule that conflicts most with DFA is "avoid bonded joints": the adhesive bond is the cheapest assembly method (0 seconds, no fastener), but the bond prevents the disassembly and the recycling. The resolution is the product's life: a product with a 2-year life (a phone) can use adhesives; a product with a 20-year life (a machine tool) must use reversible joints.**
:::

::: example DfE review of a power tool {#ex-dfe-tool level=3 check="4"}
A power tool has 45 parts: 12 plastic (ABS, PC/ABS, PA6-GF30), 18 steel, 8 aluminium, 4 copper (motor windings), 2 rubber (grips), and 1 lithium-ion battery. Apply the DfE rules.

**DfE findings:**

1. **Material variety**: 6 material families (ABS, PC/ABS, PA6-GF30, steel, aluminium, copper) + rubber + battery. **Action: reduce the plastic families from 3 to 2 (ABS and PA6-GF30), and label each part with the ISO 11469 code.**
2. **Bonded joints**: the housing is glued (2 adhesive bonds). **Action: replace the glue with 4 screws (reversible disassembly).**
3. **Battery**: the lithium-ion battery is glued into the housing. **Action: replace the glue with a removable battery pack (regulatory requirement in the EU, IEC 62133).**
4. **Wear parts**: the carbon brushes are sealed inside the motor. **Action: add a brush-access hatch (remanufacture, not landfill).**

**The DfE review adds 4 screws and 1 hatch (cost: £1.20 per tool) and saves the cost of the adhesive (£0.80 per tool) and the cost of the landfill disposal (£2.00 per tool). The net saving is £1.60 per tool, and at a volume of 500 000 tools per year, the saving is £800 000 per year.**
:::

## Exercises

::: exercise DFM for machining {#ex-dfm-mach level=3 check="3"}
A bracket has 5 features: 4 bolt holes (M10 clearance, 11 mm diameter, 25 mm deep, blind) and 1 pocket (40 × 30 × 15 mm, R3 internal radius). Identify the DFM violations and suggest corrections.

::: solution
**DFM violations:**

1. **Blind holes**: the blind hole requires a spot-drill, a drill, and a counterbore (3 operations). **Correction: change to through-holes (1 operation).**
2. **Small internal radius**: R3 requires a 6 mm end mill, which has a length-to-diameter ratio of 5:1 (chatter risk). **Correction: increase to R5 (10 mm end mill, L/D = 2.5, no chatter).**
3. **Deep pocket**: 15 mm deep with a 6 mm tool is L/D = 2.5, which is acceptable, but the chip evacuation is poor. **Correction: add a chip-breaker groove or change to a through-pocket.**

**The DFM corrections reduce the machining time from 18 minutes to 12 minutes (33 % reduction), and the cost from £54 to £36 per part.**
:::
:::

::: exercise DFA part-count reduction {#ex-dfa-count level=3 check="8"}
An assembly has 15 parts: 3 plastic housings (ABS), 2 metal brackets (steel), 4 screws (M4), 2 rubber feet, 1 PCB, 1 battery, 1 motor, and 2 bearings. Apply the B-D three-question test and estimate the reduced part count.

::: solution
**Part-count reduction:**

| Part | Moves? | Different material? | Separated? | Merge? |
|------|--------|-------------------|-----------|--------|
| 3 housings → 1 | No | No (all ABS) | No | **Merge: 3 → 1 housing** |
| 2 brackets → 1 | No | No (both steel) | No | **Merge: 2 → 1 bracket** |
| 4 screws → 2 | No | No | Yes (access) | **Reduce: 4 → 2** |
| 2 rubber feet | No | Yes | No | **Merge: 2 → 1 (integral rubber pad)** |
| PCB, battery, motor, bearings | Yes/No | Yes | Yes | Keep |

**Reduced part count: 1 housing + 1 bracket + 2 screws + 1 PCB + 1 battery + 1 motor + 2 bearings = 9 parts. The part count is reduced from 15 to 9 (40 % reduction), and the assembly time is reduced from 60 seconds to 35 seconds (42 % reduction).**
:::
:::

::: exercise DFM/DFA cost crossover {#ex-dfm-crossover level=3 check="200"}
A part can be made as: (A) 2 machined parts, £80 each, £1 000 tooling, £10 assembly; or (B) 1 cast part, £95, £5 000 tooling, £0 assembly. At what volume does option B become cheaper?

::: solution
$$
c _ { A } \; = \; 2 \times 8 0 + 1 \ 0 0 0 / N + 1 0 \; = \; 1 7 0 + 1 \ 0 0 0 / N
$$

$$
c _ { B } \; = \; 9 5 + 5 \ 0 0 0 / N + 0 \; = \; 9 5 + 5 \ 0 0 0 / N
$$

**Crossover:** $1 7 0 + 1 \ 0 0 0 / N = 9 5 + 5 \ 0 0 0 / N$

$$
7 5 \; = \; 4 \ 0 0 0 / N \quad \Longrightarrow \quad N \; = \; 4 \ 0 0 0 / 7 5 \; = \; { \bf 5 3 } \ \text{units}
$$

**Option B becomes cheaper at a volume of 53 units. At a volume of 1 000 units, Option A costs £171 and Option B costs £100, a saving of £71 per unit.**
:::
:::

::: exercise Snap-fit design {#ex-snapfit level=3 check="2"}
A snap-fit joint must retain a 50 N axial load. The cantilever beam has a width of 8 mm, a thickness of 2 mm, a length of 15 mm, and the material is ABS (E = 2 200 MPa, strain limit = 2 %). Calculate the maximum deflection and the insertion force.

::: solution
The maximum strain for a cantilever snap-fit is:

$$
\varepsilon \; = \; { \frac { 1 . 5 \, y \, t } { L ^ { 2 } } } \quad \Longrightarrow \quad y \; = \; { \frac { \varepsilon \, L ^ { 2 } } { 1 . 5 \, t } } \; = \; { \frac { 0 . 0 2 \times 1 5 ^ { 2 } } { 1 . 5 \times 2 } } \; = \; { \bf 1 . 5 } \ \text{mm}
$$

The insertion force (with a 45° lead-in chamfer, friction coefficient 0.4):

$$
F \; = \; { \frac { w \, t ^ { 2 } \, \sigma } { 6 \, L } } \times ( \mu + \tan \alpha ) / ( 1 - \mu \tan \alpha )
$$

$$
F \; = \; { \frac { 8 \times 4 \times 4 4 } { 6 \times 1 5 } } \times { \frac { 0 . 4 + 1 } { 1 - 0 . 4 } } \; = \; { \frac { 1 \ 4 0 8 } { 9 0 } } \times { \frac { 1 . 4 } { 0 . 6 } } \; = \; 1 5 . 6 \times 2 . 3 3 \; = \; { \bf 3 6 } \ \text{N}
$$

**The maximum deflection is 1.5 mm, and the insertion force is 36 N. The retention force (50 N) is greater than the insertion force (36 N), so the snap-fit will not back out under load. The snap-fit replaces 2 screws, and the assembly time is reduced from 20 seconds to 3 seconds.**
:::
:::

::: exercise DfE material labelling {#ex-dfe-label level=2 check="6"}
A product has 6 material families: ABS, PC/ABS, PA6-GF30, steel, aluminium, and copper. How many ISO 11469 resin identification codes are needed, and how many material families should be targeted for a product designed for recycling?

::: solution
**3 resin identification codes are needed (ABS, PC/ABS, PA6-GF30), and the metals (steel, aluminium, copper) are identified by their standard material grades.** **For a product designed for recycling, the target is 1–2 polymer families (not 3), because the sorting cost increases with the number of families. The DfE action is to replace the PC/ABS with ABS (if the impact strength allows) or with PA6-GF30 (if the stiffness allows), reducing the polymer families from 3 to 2.**
:::
:::

::: exercise DFM review ROI {#ex-dfm-roi level=3 check="100"}
A DFM review costs 4 hours of a manufacturing engineer's time (£100/hour) and reduces the piece cost by 15 %. The annual production is 50 000 units at £80 per unit. What is the ROI?

::: solution
$$
\text{Review cost } \; = \; 4 \times 1 0 0 \; = \; 4 0 0 \ \text{pounds}
$$

$$
\text{Annual saving } \; = \; 0 . 1 5 \times 8 0 \times 5 0 \ 0 0 0 \; = \; 6 0 0 \ 0 0 0 \ \text{pounds}
$$

$$
\text{ROI } \; = \; { \frac { 6 0 0 \ 0 0 0 } { 4 0 0 } } \; = \; { \bf 1 \ 5 0 0 : 1 }
$$

**The ROI is 1 500:1. The DFM review is the highest-return activity in the design process, and the return is the reason the review is mandatory at every gate. The engineer who skips the DFM review is not saving 4 hours; they are spending £600 000 per year.**
:::
:::

::: exercise Derivation: the B-D assembly time model {#ex-derive-bd level=4 check="5"}
The Boothroya-Dewhurst assembly time for a part is $T = T _ { h } + T _ { i }$ , where $T _ { h }$ is the handling time and $T _ { i }$ is the insertion time. The handling time is $T _ { h } = T _ { h , \min } + C _ { h }$ , where $T _ { h , \min } = 3$ s (the minimum time to pick up a part) and $C _ { h }$ is the handling complexity (0–8 s). The insertion time is $T _ { i } = T _ { i , \min } + C _ { i }$ , where $T _ { i , \min } = 1$ s (the minimum time to insert a part) and $C _ { i }$ is the insertion complexity (0–15 s). Show that the minimum assembly time for $n$ parts is $4 n$ seconds, and evaluate the time for 10 parts with average complexity.

::: solution
The minimum assembly time per part is $T _ { \min } = T _ { h , \min } + T _ { i , \min } = 3 + 1 = 4$ s. For $n$ parts:

$$
T _ { \text{total } } \; = \; \sum _ { i \, = 1 } ^ { n } ( T _ { h , \min } + C _ { h , i } + T _ { i , \min } + C _ { i , i } ) \; = \; 4 n + \sum C _ { h , i } + \sum C _ { i , i }
$$

For 10 parts with average complexity ($C _ { h } = 3$ s, $C _ { i } = 5$ s):

$$
T _ { \text{total } } \; = \; 4 \times 1 0 + 3 \times 1 0 + 5 \times 1 0 \; = \; 4 0 + 3 0 + 5 0 \; = \; { \bf 1 2 0 } \ \text{seconds}
$$

**The minimum assembly time is 40 seconds (4 × 10), and the actual time is 120 seconds (3× the minimum). The complexity is the reason the assembly takes 3× longer than the minimum, and the DFM/DFA action is to reduce the complexity (standardise the parts, add self-locating features, minimise the fasteners).** $\blacksquare$
:::
:::

::: exercise Derivation: the DFM cost crossover {#ex-derive-crossover level=4 check="5"}
Show that the crossover volume between two manufacturing options is $N ^ { * } = ( c _ { \text{tooling, B } } - c _ { \text{tooling, A } } ) / ( c _ { \text{piece, A } } - c _ { \text{piece, B } } )$ , and evaluate for Option A (tooling £2 000, piece £50) and Option B (tooling £10 000, piece £30).

::: solution
The total cost for each option is:

$$
C _ { A } ( N ) \; = \; c _ { \text{tooling, A } } + N \, c _ { \text{piece, A } } \; = \; 2 \ 0 0 0 + 5 0 N
$$

$$
C _ { B } ( N ) \; = \; c _ { \text{tooling, B } } + N \, c _ { \text{piece, B } } \; = \; 1 0 \ 0 0 0 + 30 N
$$

Setting $C _ { A } = C _ { B }$ :

$$
2 \ 0 0 0 + 5 0 N \; = \; 1 0 \ 0 0 0 + 3 0 N \quad \Longrightarrow \quad 2 0 N \; = \; 8 \ 0 0 0 \quad \Longrightarrow \quad N \; = \; { \bf 4 0 0 }
$$

**The crossover volume is 400 units. Below 400 units, Option A (low tooling, high piece cost) is cheaper. Above 400 units, Option B (high tooling, low piece cost) is cheaper. The crossover volume is the reason the injection moulding tool is justified at 100 000 units and the machined part is justified at 10 units.** $\blacksquare$
:::
:::

::: quiz DFM {#quiz-dfm}
The most expensive machining feature is:

- [ ] A tight tolerance
- [ ] A complex geometry
- [x] A five-axis operation
- [ ] A thin wall

::: solution
**A five-axis operation.** A five-axis operation costs 3–5× more than a three-axis operation because the part must be re-oriented in the fixture, the fixture is custom, and the programming is more complex. The five-axis operation is the reason the part costs £500 instead of £100, and the reason is the design, not the machinist.
:::
:::

::: quiz DFA {#quiz-dfa}
The Boothroya-Dewhurst three-question test asks whether a part can be merged. Which question is NOT part of the test?

- [ ] Does the part move relative to the parts already assembled?
- [ ] Does the part require a different material?
- [ ] Does the part need to be separated for assembly or maintenance?
- [x] Is the part available from two suppliers?

::: solution
**"Is the part available from two suppliers?"** The B-D three-question test is: (1) Does the part move relative to the parts already assembled? (2) Does the part require a different material? (3) Does the part need to be separated for assembly or maintenance? If the answer to all three is "no," the part can be merged. The supplier availability is a procurement question, not a DFA question.
:::
:::

## Where this lesson leads

- **[[design-process/embodiment-design]]** — The DFM/DFA review is performed at the embodiment stage, and the DFM feedback drives the layout iteration.
- **[[design-process/design-process-overview]]** — The DFM/DFA review is the Gate 3 criterion for the design freeze, and the cost target is the gate decision.
- **[[manufacturing/process-selection]]** — The DFM review selects the manufacturing process, and the process selection determines the design rules.
- **[[manufacturing/machining]]** — The machining DFM rules (tool access, inside radius, wall thickness) are derived from the machining process capability.
- **[[manufacturing/casting]]** — The casting DFM rules (draft angle, uniform wall, parting line) are derived from the casting process capability.
- **[[manufacturing/polymer-composite-processing]]** — The moulding DFM rules (uniform wall, draft, gate location) are derived from the moulding process capability.
- **[[manufacturing/joining]]** — The welding DFM rules (joint accessibility, symmetric welds, distortion control) are derived from the welding process capability.
- **[[manufacturing/metrology-quality]]** — The DFM review checks that the tolerances are achievable and the inspection is accessible.
- **[[design-process/sustainability]]** — The DfE rules (design for disassembly, material labelling, reversible joints) are the bridge to the sustainability lesson.

::: history DFM/DFA: from the craftsman's intuition to the Boothroya-Dewhurst method {#history-dfm}
**1940s** — **Henry Ford's** moving assembly line (1913) is the first systematic application of DFA: the product is designed for the assembly process, not the other way round. **Ford's insight is that the assembly time is the dominant cost, and the assembly time is determined by the design, not the worker.**

**1960** — **Boothroya, J.** begins his research at the University of Liverpool on the mechanics of assembly, measuring the handling and insertion times of thousands of components. **Boothroya's measurements are the empirical foundation of the DFA method, and the measurements are the reason the method is quantitative, not qualitative.**

**1971** — **Geoffrey Boothroya, G. Dewhurst, and W. Knight** publish the first version of the **Boothroya-Dewhurst DFA method** at the University of Massachusetts Amherst. The method estimates the assembly time from the part geometry and the fastener type, and the estimate is the basis for the part-count reduction. **The B-D method is the first quantitative DFA method, and the quantification is the reason the method is adopted by Xerox, IBM, and Hewlett-Packard.**

**1989** — **Boothroya, Dewhurst, and Knight** publish *Product Design for Manufacture and Assembly*, the definitive DFA/DFM textbook. The book codifies the part-count reduction test, the assembly-time estimation, and the cost model. **The book is the reason DFM/DFA becomes a standard engineering practice, not an art.**

**1990** — **The Design for Manufacture and Assembly (DFMA) software** (Boothroya Dewhurst Inc., now part of Siemens) automates the B-D method: the engineer enters the part geometry, and the software estimates the assembly time and the cost. **The software is the reason the B-D method is used by 10 000+ companies, and the adoption is the reason the method is the industry standard.**

**1994** — **The US Department of Defense** mandates DFM/DFA reviews for all defence contracts over $1 million. **The mandate is the reason DFM/DFA becomes a contractual requirement, not a best practice, and the contractual requirement is the reason every defence contractor has a manufacturing engineer in the design review.**

**2000s** — **The Design for Six Sigma (DFSS)** methodology integrates DFM/DFA with the statistical process control and the FMEA. The DFSS toolset includes the DFM checklist, the DFA time estimate, the process capability study, and the FMEA. **DFSS is the reason DFM/DFA becomes part of the quality management system, not a separate activity.**

**2015** — **The additive manufacturing DFM** paradigm inverts the traditional DFM: instead of designing the part for the process, the process is designed for the part. **The AM DFM is the reason the part count is reduced by 50–90 % (the part is printed as one piece), and the reduction is the reason the assembly cost is eliminated.**
:::

::: summary DFM and DFA {#summary-dfm-dfa}
- **DFM is the practice of designing the part so that the manufacturing process is simple, the tolerances are achievable, the material is available, and the inspection is straightforward.** 70–80 % of the product's life-cycle cost is determined at the design stage.
- **The most important DFM principle is the part-count reduction: each part has a separate procurement, inspection, storage, and assembly cost.** The part that is not there cannot be procured, inspected, stored, assembled, or fail in the field.
- **The most expensive machining feature is the five-axis operation (3–5× the cost of a three-axis operation).** The five-axis operation is the reason the part costs £500 instead of £100.
- **The most expensive moulding feature is the undercut (2–5× the tool cost).** The undercut that is designed out of the part saves £5 000–£20 000 in tooling cost.
- **The Boothroya-Dewhurst DFA method estimates the assembly time and reduces the part count.** The three-question test eliminates 30–50 % of the parts, and the elimination is the reason the assembly time drops by 30–50 %.
- **The one-directional assembly is the most important DFA rule: the assembly that requires the operator to flip the product over three times takes three times longer.** The one-directional assembly is the reason the product is designed as a vertical stack.
- **The snap-fit replaces 2–4 screws with a single snap action (2–5 seconds instead of 10–30 seconds per screw).** The snap-fit saves 20–50 % of the assembly time.
- **The DFM/DFA trade-off is resolved by the cost model: the combined part is preferred if the process cost saving exceeds the tooling cost increase.** The crossover volume is the reason the combined part is preferred at high volume and the separate parts are preferred at low volume.
- **The DFM/DFA review is the most cost-effective activity in the design process: the review costs 2–8 hours and saves 10–50 % of the manufacturing cost.** The ROI is 100:1 or better.
- **Design for Environment (DfE) extends DFM/DFA to the end-of-life phase: the product must be disassembled, the materials must be separated, and the components must be recycled.** The DfE rule that conflicts most with DFA is "avoid bonded joints."
:::

## Further reading

- **Geoffrey Boothroya, G. Dewhurst and W. Knight (2010)** — *Product Design for Manufacture and Assembly*, 3rd ed. CRC Press. The definitive DFA/DFM textbook, by the inventors of the B-D method.
- **Gerd Ulrich, Karl Eppinger and Steven Eppinger (2019)** — *Product Design and Development*, 7th ed. McGraw-Hill. Chapter 9: design for manufacture and assembly.
- **James G. Bralla (1998)** — *Design for Manufacturability: Principles and Applications*, 2nd ed. McGraw-Hill. The DFM design rules for every manufacturing process.
- **Robert B. Horstmann (1998)** — *Design for Manufacturability and Quality*. Prentice Hall. The DFM methodology integrated with the quality management system.
- **Stefan H. Roelofsen (2004)** — "Function modelling in design: a review." *Proceedings of the 14th CIRP Design Seminar*. The function-structure method for DFM.
- **Michael F. Ashby (2016)** — *Materials and the Environment: Eco-informed Material Choice*, 3rd ed. Butterworth-Heinemann. The DfE methodology, the material selection for sustainability, and the life-cycle assessment.
- **ASME Y14.5-2018** — *Dimensioning and Tolerancing*. ASME. The GD&T standard for the DFM tolerance specification.
- **ISO 11469:2015** — *Plastics — Generic identification and marking of plastics products*. The resin identification code standard for DfE.
