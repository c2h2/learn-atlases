An assembly drawing has **one main job**: to let somebody who has never seen the design put it together, and to record exactly what went into it. The full definition of each part — its sections, datums and toleranced dimensions — belongs on the **detail drawings**, and a drawing that tries to do both jobs tends to do neither well.

The distinction is between a **detail drawing**, which is the **specification for making** one part, and an **assembly drawing**, which is an **instruction to build** together with a **list of what goes in**. A detail drawing without its assembly is a part that fits nothing in particular; an assembly without its details is only a picture.

::: warning Seven assembly-drawing errors that stop a build
**A balloon with no parts-list entry, or an entry with no balloon.** The two belong together; a mismatch becomes a missing part on the build or a surplus on the purchase order, and it is easy to miss because both halves look complete. **A dimension on an assembly that is also on a detail.** Two instructions that may disagree: the fitter follows the assembly and the machinist the detail. **A section that hatches the bolts.** Fasteners, shafts and pins cut lengthwise are not hatched (see [[engineering-graphics/sections-auxiliary-views]]). **An exploded view with no assembly sequence.** An exploded view is an instruction only if the parts are spread along the directions in which they are fitted, in the order they are fitted. **A parts list that does not say make or buy.** A purchased bearing and a machined shaft need different routes, and a list that does not distinguish them cannot be handed to purchasing. **No interface envelope.** A sub-assembly drawing that does not show the space it occupies and the positions of its connections can be built correctly and still not fit the machine it is for. **No revision block or effectivity.** A drawing that cannot answer "which version was fitted to serial 118?" cannot support a modification, an investigation or a warranty claim.
:::

## The drawing set

::: definition The drawings of a machine {#def-set}
$$
\begin{array}{l l l l}
\text{Drawing} & \text{Says} & \text{Read by} & \text{Owned by} \\
\text{Detail} & \text{make this one part} & \text{the machinist, the inspector} & \text{design} \\
\text{Assembly} & \text{put these together} & \text{the fitter} & \text{design} \\
\text{Installation} & \text{fit this into the plant} & \text{the installer} & \text{design} \\
\text{Envelope / interface} & \text{the space and the connections} & \text{the customer's layout engineer} & \text{design} \\
\text{Schematic (circuit diagram)} & \text{the function, not the geometry} & \text{the commissioning and maintenance engineer} & \text{systems} \\
\text{Parts list / BOM} & \text{what goes in, how many, make or buy} & \text{purchasing, production} & \text{PDM/PLM}
\end{array}
$$
**The rule that keeps them consistent.** **Each requirement is stated on one drawing only.** An assembly drawing carries only what **cannot** be on a detail: overall and interface dimensions, adjustment ranges, as-shimmed values, tightening torques and assembly notes.
**A schematic is not a drawing of the machine.** Hydraulic, pneumatic and electrical circuits are drawn **functionally**, components placed for clarity rather than in their installed positions; the physical arrangement is shown on layout and wiring drawings.
:::

::: definition The parts list and the bill of materials {#def-bom}
**The columns, and what each is for.**
$$
\begin{array}{l l l}
\text{Item} & \text{the balloon number} & \text{ties the list to the views} \\
\text{Part number} & \text{a unique key, preferably non-descriptive} & \text{survives a change of description} \\
\text{Description} & \text{what it is, in the buyer's vocabulary} & \text{"BEARING, DEEP GROOVE, } 40 \times 80 \times 18\text{"} \\
\text{Quantity} & \text{per assembly, with the unit} & \text{a length of bar is a quantity in metres, not "1"} \\
\text{Make / buy} & \text{the routing} & \text{to a workshop or to a purchase order} \\
\text{Material} & \text{the grade and condition} & \text{"EN-GJL-250", "42CrMo4+QT"} \\
\text{Standard or supplier reference} & \text{for purchased and standard parts} & \text{"ISO 4762 M8} \times 25 - 8.8\text{"}
\end{array}
$$
**Three BOMs and why they differ.**
$$
\begin{array}{l l l}
\text{Engineering BOM} & \text{as designed} & \text{the product structure: assemblies, sub-assemblies, parts} \\
\text{Manufacturing BOM} & \text{as built} & \text{adds raw stock, consumables, sealant, paint, and the build sequence} \\
\text{Service BOM} & \text{as maintained} & \text{spare parts and kits; omits parts never replaced}
\end{array}
$$
**Item references (balloons).** ISO 6433 governs item references on assembly drawings. In practice: **one balloon per distinct item**, the quantity being in the list; leaders end in a **dot** inside the outline of the part (or an arrowhead on its edge) and should not cross one another; balloons are aligned in rows or columns outside the views where possible; and item numbers of a released drawing are not renumbered, because the number is how the list, the stores and the purchasing records refer to the item.
**The practical limit.** Every view can carry only so many balloons before the leaders become unreadable; a large assembly is split over several views or sheets, with the item numbers unique across all of them.
:::

::: definition Sheets, scales and the title block {#def-sheet}
$$
\begin{array}{l c c c c}
\text{Size} & \text{mm} & \text{Area}\ (\mathrm{m^{2}}) & \text{Typical use} & \text{Grid zones (ISO 5457)} \\
\text{A}0 & 1189 \times 841 & 1.00 & \text{large assembly, layout} & 24 \times 16 \\
\text{A}1 & 841 \times 594 & 0.50 & \text{assembly} & 16 \times 12 \\
\text{A}2 & 594 \times 420 & 0.25 & \text{complex detail} & 12 \times 8 \\
\text{A}3 & 420 \times 297 & 0.125 & \text{detail} & 8 \times 6 \\
\text{A}4 & 297 \times 210 & 0.0625 & \text{simple part, list sheet} & 6 \times 4
\end{array}
$$
**The $\sqrt{2}$ law.** Each A size is the one above it cut in half across its long side, and every sheet has the side ratio $\sqrt{2}$, so a drawing reduced from A1 to A3 keeps its proportions and its line widths scale by $1/\sqrt{2}$ per step — which is why the ISO line widths and lettering heights form a $\sqrt{2}$ series.
**The scales (ISO 5455).**
$$
\text{Reduction: } 1 : 2,\ 1 : 5,\ 1 : 10,\ 1 : 20,\ 1 : 50,\ 1 : 100,\ 1 : 200, \ldots \qquad
\text{Full size: } 1 : 1 \qquad
\text{Enlargement: } 2 : 1,\ 5 : 1,\ 10 : 1,\ 20 : 1,\ 50 : 1
$$
The main scale is given in the title block; any view or detail at a different scale is labelled with its own scale, e.g. "DETAIL D (5 : 1)".
**The title block (ISO 7200)** carries the identification (drawing or document number, revision, sheet $n$ of $N$, title, owner), the responsibility (created by, approved by, dates), and commonly the material, the general tolerances, the projection symbol and the scale.
**Revision letters.** ASME Y14.35 excludes the letters **I, O, Q, S, X and Z** from revision letters, because they are easily confused with numerals or other symbols; many companies follow the same rule.
**The grid.** The border is divided into lettered and numbered zones so that a change note can point to "zone D4"; on a large sheet that is the quickest way to find a change.
:::

::: definition Assembly conventions {#def-assyconv}
$$
\begin{array}{l l}
\text{Hidden lines} & \text{normally omitted on assembly drawings} \\
\text{Adjacent parts} & \text{shown, where helpful, in long-dashed double-dotted narrow lines (ISO 128-2 type 05.1)} \\
\text{Sections} & \text{fasteners, shafts, keys, pins and rolling elements not hatched when cut lengthwise} \\
\text{Hatching} & \text{adjacent parts hatched in different directions or spacings} \\
\text{Fits} & \text{drawn at nominal size; the fit is given by its tolerance classes} \\
\text{Standard parts} & \text{may be drawn simplified (e.g. bearings to ISO 8826-1, threads to ISO 6410-1)} \\
\text{Exploded views} & \text{parts spread along their fitting directions, in assembly order} \\
\text{Long parts} & \text{shown broken, dimensioned at true length}
\end{array}
$$
**The exploded view's one rule.** **Parts are separated along the direction in which they are fitted.** A bearing pressed onto a shaft is exploded axially; a cover bolted to a flange is exploded normal to the flange; a bayonet fitting is exploded axially, with an arrow showing the turn. A thin line joining the exploded parts along their path of assembly makes the sequence unambiguous.
:::

::: widget plot
f: 0.7071*x*261.7
x: 3, 12
y: 0, 3500
labels: design resistance (N/mm)
caption: The design resistance per millimetre of a fillet weld in S355 steel, by the simplified method of EN 1993-1-8 ($f_{vw,d} = 261.7\ \mathrm{MPa}$), against the leg length $x$ in millimetres. The throat is $0.707$ of the leg, so the resistance is linear in the leg: about $1{,}110\ \mathrm{N/mm}$ for a $6\ \mathrm{mm}$ fillet and $925\ \mathrm{N/mm}$ for a $5\ \mathrm{mm}$ one. The weld's volume, and so its cost and heat input, grows with the **square** of the leg, which is why fillets are not made bigger than the joint needs.
:::

## Interfaces, welds and circuits

::: definition The envelope and the interface drawing {#def-envelope}
An **envelope (interface) drawing** is the drawing a customer's layout engineer works from. It shows:
$$
\begin{array}{l l}
\text{The overall envelope} & \text{the maximum space occupied, including door swing and cable bend radii} \\
\text{The connection points} & \text{mounting holes, dowels, flange faces, with their tolerances} \\
\text{The services} & \text{water, air, power and signal entries, with sizes and positions} \\
\text{The maintenance envelope} & \text{the space needed to remove a filter, a rotor, a tube bundle} \\
\text{Lifting and mass} & \text{mass, centre of gravity, lifting points} \\
\text{Foundation loads} & \text{the loads at the feet in operation}
\end{array}
$$
**Why the tolerances matter.** If an envelope drawing shows a pump's suction flange at its nominal position and the site pipework is fabricated to that dimension, the pump's own tolerance and the baseplate's tolerance arrive on site as a misalignment that the pipework must absorb. The envelope drawing must therefore **state the tolerance of every connection point**, e.g. "ENVELOPE DIMENSIONS ARE MAXIMA; CONNECTION POINTS ARE TOLERANCED AS SHOWN".
:::

::: definition Weld symbols in one page {#def-weld}
Weld symbols are standardised in **ISO 2553** (current edition 2019) and, in North America, **AWS A2.4**. The symbol sits on a **reference line** joined to an **arrow** that points at the joint.
$$
\begin{array}{l l}
\text{Arrow side / other side} & \text{AWS and ISO 2553 system B: symbol below the line = arrow side, above = other side} \\
& \text{ISO 2553 system A: a dual reference line (continuous and dashed); symbol on the continuous line = arrow side} \\
\text{Fillet} & \text{a triangle; size as throat } a \text{ or leg } z \text{ to the left (ISO), leg size to the left (AWS)} \\
\text{Butt (groove)} & \text{V, bevel, U, J, square; preparation angle and root details given with the symbol} \\
\text{Intermittent} & \text{ISO: } n \times l\ (e),\ \text{number of elements, length, and gap between them} \\
& \text{AWS: length–pitch (centre-to-centre spacing), e.g. } 40\text{–}80 \\
\text{Staggered} & \text{symbols on both sides, offset (ISO adds a "Z" sign)} \\
\text{Field (site) weld} & \text{a flag at the junction of arrow and reference line} \\
\text{Weld all round} & \text{a circle at the junction of arrow and reference line} \\
\text{Surface shape} & \text{flush (straight line), convex or concave sign over the weld symbol} \\
\text{Process} & \text{numbers per ISO 4063 in the tail, e.g. 135 (MAG), 141 (TIG)}
\end{array}
$$
**The throat and the resistance.** A fillet of leg $z$ has throat $a = z / \sqrt{2} = 0.707\, z$. By the **simplified method** of EN 1993-1-8, the design resistance per unit length is
$$
F_{w,\mathrm{Rd}} = a\, f_{vw,\mathrm{d}}, \qquad f_{vw,\mathrm{d}} = \frac{f_{u}}{\sqrt{3}\, \beta_{w}\, \gamma_{M2}} .
$$
**The evaluation.** For S355 ($f_u = 510\ \mathrm{MPa}$ for thicknesses up to $40\ \mathrm{mm}$, correlation factor $\beta_w = 0.9$) with $\gamma_{M2} = 1.25$:
$$
f_{vw,\mathrm{d}} = \frac{510}{\sqrt{3} \times 0.9 \times 1.25} = 261.7\ \mathrm{MPa}, \qquad
F_{w,\mathrm{Rd}} = 4.243 \times 261.7 = 1{,}110\ \mathrm{N / mm}\ \text{for a } 6\ \mathrm{mm}\ \text{fillet}.
$$
**Intermittent welds.** A $6\ \mathrm{mm}$ fillet $40\ \mathrm{mm}$ long at $80\ \mathrm{mm}$ pitch on one side has, averaged along the joint, half the continuous resistance: $555\ \mathrm{N/mm}$. Intermittent welds save weld metal and distortion, but each weld end is a stress concentration, and the gaps can trap moisture; they are generally avoided in fatigue-loaded and corrosive service, where design codes restrict or forbid them.
**What a weld specification must also say.** **The preparation** for butt welds (angle, root gap, root face). **The quality level** (e.g. ISO 5817 level B, C or D). **The inspection** — the extent and method of non-destructive testing — because a weld that is not specified for testing will usually not be tested.
:::

::: definition Circuits and schematics {#def-circuit}
$$
\begin{array}{l l l}
\text{Drawing} & \text{Standard} & \text{Shows} \\
\text{Hydraulic or pneumatic circuit} & \text{ISO 1219-1 (symbols), ISO 1219-2 (circuit diagrams)} & \text{function; components by symbol} \\
\text{Electrical circuit diagram} & \text{IEC 60617 (symbols), IEC 61082-1 (documents)} & \text{function, devices in their de-energised state} \\
\text{Wiring diagram or table} & \text{IEC 61082-1} & \text{the actual cables, cores and terminals} \\
\text{Panel layout} & - & \text{physical arrangement of devices, rails and ducts} \\
\text{Harness drawing} & - & \text{a cable loom's route, lengths, clips and connectors}
\end{array}
$$
**Rules of a schematic.** **Devices are shown in a defined rest state** — de-energised, unpressurised, with valves in their spring-return positions — so that every reader starts from the same state. **Lines are functional connections, not routes**: a junction is marked by a dot, and crossing lines without a dot are not connected. **Signal and power flow is arranged consistently**, usually left to right and top to bottom.
:::

::: example A pump unit's drawing set {#ex-set}
A hydraulic power pack: a $60\ \mathrm{L}$ tank, a $7.5\ \mathrm{kW}$ motor and pump, a manifold block, $12$ valves, a cooler, a filter and a control panel. Give the drawing set.
::: solution
$$
\begin{array}{l l c c}
\text{Drawing} & \text{Content} & \text{Scale} & \text{Sheets} \\
\text{GA-001} & \text{general assembly, A1, with balloons and parts list} & 1{:}5 & 1 \\
\text{GA-002} & \text{envelope and foundation (interface), A1} & 1{:}5 & 1 \\
\text{GA-003} & \text{exploded view of the pump–motor–manifold group, A2} & - & 1 \\
\text{HY-010} & \text{hydraulic circuit diagram, A2, ISO 1219} & - & 1 \\
\text{HY-011} & \text{manifold detail with sections, A2} & 1{:}1 & 1 \\
\text{EL-020} & \text{power circuit, A2} & - & 1 \\
\text{EL-021} & \text{control circuit, A2} & - & 1 \\
\text{EL-022} & \text{terminal schedule, A3} & - & 3 \\
\text{EL-023} & \text{panel layout, A3} & 1{:}2 & 1 \\
\text{DT-1xx} & \text{details of the six made parts (baseplate, pump bracket, guard, ...), A3} & 1{:}1 & 6 \\
\text{PL-001} & \text{parts list, A3} & - & 2 \\
\hline
\text{Total} & & & 19
\end{array}
$$
Of the $19$ sheets, $13$ (GA, HY, DT and PL) are the mechanical designer's and $6$ (EL) the panel builder's.
**What the general assembly must carry.** **Tightening torques and sequences** for the pump-to-motor and flange bolts. **The alignment requirement** for the pump-to-motor coupling, e.g. "ALIGN PUMP AND MOTOR SHAFTS TO THE COUPLING MAKER'S LIMITS; SHIM UNDER THE MOTOR FEET AS REQUIRED". **The cleanliness requirement**, e.g. "FLUSH THE SYSTEM TO ISO 4406 CODE 17/15/12 OR BETTER BEFORE COMMISSIONING".
**The drawing that is often forgotten.** The **foundation and services** information: the loads at the feet, the electrical supply, the oil volume for bunding and the clearances for maintenance. It belongs on the interface drawing (GA-002), not left to be discovered on site.

*Sanity.* The set is large because the pack has several readers — the workshop, the panel builder, the installer, the customer's engineers — and each needs information in its own form.
:::
:::

::: example Balloons, leaders and the 200-item assembly {#ex-balloon}
A valve-manifold assembly has $200$ items: $40$ different made parts, $90$ fasteners in $12$ different sizes, and $70$ purchased components, each different. Give the ballooning and the sheet layout.
::: solution
**The grouping.** The $90$ fasteners in $12$ sizes are **$12$ items**, because a balloon (and a parts-list line) identifies an **item**, not a piece; the quantity column carries the count.
$$
40\ (\text{made}) + 12\ (\text{fastener items}) + 70\ (\text{purchased}) = 122\ \text{item numbers}.
$$
**The layout.**
$$
\begin{array}{l l c}
\text{Sheet } 1\ \text{of } 3\ (\text{A}1) & \text{front section, top view} & 50\ \text{balloons} \\
\text{Sheet } 2\ \text{of } 3\ (\text{A}1) & \text{two side sections, one removed section} & 45\ \text{balloons} \\
\text{Sheet } 3\ \text{of } 3\ (\text{A}1) & \text{exploded view, parts list, notes} & 27\ \text{balloons} \\
\hline
& \text{total} & 122
\end{array}
$$
**Numbering.** Item numbers are unique across the three sheets; an item visible on several sheets keeps one number. A released item number is never reused for something else.
**Leaders.** Straight, not crossing, ending in a dot within the part's outline; balloons aligned in rows or columns.
**The parts list.** One list for the whole assembly (on sheet 3 or a separate list), with a column saying where each item is shown.
**Notes that prevent a misbuild.** Tightening torques and sequences for the manifold bolts; lubrication and handling of the O-rings ("DO NOT ROLL O-RINGS OVER THREADS"); and a cleanliness requirement ("MANIFOLD CLEANED AND CAPPED BEFORE ASSEMBLY; NO THREAD TAPE").

*Sanity.* One balloon per item matches one line in the parts list and one line on a purchase order; ballooning every piece would make the list unusable for purchasing.
:::
:::

::: example A weldment drawing {#ex-weld}
Give the drawing of a welded machine base: a $1{,}200 \times 800$ base plate of $16\ \mathrm{mm}$ S355, four $100 \times 100 \times 8$ square hollow section (SHS) legs, two $200 \times 100 \times 8$ rectangular hollow section cross members and four machined pads. The model's mass is $285\ \mathrm{kg}$.
::: solution
**The views.** Front elevation with a half-section, plan, one end view, a $2:1$ detail of the leg-to-plate joint, and a pictorial view showing where each weld is — often the most useful view on a weldment drawing.
**The welds.**
$$
\begin{array}{l l l}
\text{Joint} & \text{Symbol} & \text{Resistance (S355, simplified method)} \\
\text{Leg to base plate} & \text{fillet } z6,\ \text{all round, continuous} & 1{,}110\ \mathrm{N/mm} \\
\text{Cross member to base plate} & \text{fillet } z5,\ \text{both sides, } 60\ \text{long at } 100\ \text{pitch, staggered} & 555\ \mathrm{N/mm}\ \text{per side averaged},\ 1{,}110\ \text{for both} \\
\text{Leg cap plate} & \text{fillet } z4\ \text{all round, process 135 (MAG)} & \\
\text{Gussets} & \text{fillet } z6,\ \text{toes ground on the loaded gussets} & \\
\text{Machined pads} & \text{fillet } z5\ \text{all round; pads machined after welding} & \text{the pads are machined to the weldment}
\end{array}
$$
**The notes.**
$$
\begin{array}{l l}
1 & \text{WELD QUALITY TO ISO 5817 LEVEL C UNLESS OTHERWISE STATED} \\
2 & \text{WELDING PROCEDURES QUALIFIED TO ISO 15614-1} \\
3 & \text{STRESS-RELIEVE AFTER WELDING AND BEFORE MACHINING} \\
4 & \text{MACHINE DATUM } A \text{ FIRST, WELDMENT SUPPORTED WITHOUT DISTORTION} \\
5 & \text{SEAL THE ENDS OF ALL HOLLOW SECTIONS (CAP PLATES WELDED ALL ROUND)} \\
6 & \text{BLAST CLEAN TO SA } 2\tfrac{1}{2}\text{ (ISO 8501-1), PRIME; MASK MACHINED FACES} \\
7 & \text{FLATNESS OF DATUM } A\ 0.2 \text{ OVER THE WHOLE AREA, CHECKED UNRESTRAINED} \\
8 & \text{LIFTING POINTS AS SHOWN; MASS AND CENTRE OF GRAVITY AS STATED}
\end{array}
$$
**Decisions unique to a weldment.** **Distortion**: a plate welded on one side bows as the welds shrink, so the drawing may call for pre-setting or for machining after welding, and the welding sequence may be specified. **Machining after stress relief**: residual welding stresses released by machining would otherwise move the machined faces. **Masking machined faces**: primer on a machined pad is a shim of unknown thickness.
**The mass.** The $38\ \mathrm{m}$ of $6\ \mathrm{mm}$ fillet weld has a cross-section of $6 \times 6 / 2 = 18\ \mathrm{mm^{2}}$, so its deposited metal is $38 \times 18 \times 10^{-6} \times 7850 = 5.4\ \mathrm{kg}$; with the smaller welds and the primer the frame comes to a little over $290\ \mathrm{kg}$, and the drawing should state the mass as approximate, with the model mass a lower bound.

*Sanity.* A weldment drawing is partly a process specification: the welding, stress-relief and machining sequence decide its accuracy as much as its dimensions do.
:::
:::

::: example A detail drawing and an assembly drawing of the same part {#ex-detail}
A cast bearing housing is machined, bored and drilled, and assembled with a bearing, a cover, eight screws, a seal, a shim pack and a circlip. Give what goes on the detail drawing and on the assembly drawing.
::: solution
**The detail drawing — the specification for making the housing.**
$$
\begin{array}{l l}
\text{Views} & \text{front in full section, top, end, removed sections as needed} \\
\text{Sizes} & \text{every diameter and length, with tolerances} \\
\text{Datums} & A\ (\text{mounting face}),\ B\ (\varnothing 80\ \text{bore}),\ C\ (\text{side face}) \\
\text{Geometry} & \text{cylindricity of the bore, flatness of the face, position of the holes} \\
\text{Casting} & \text{as-cast outline where helpful, draft note, machining allowances, parting line} \\
\text{General} & \text{ISO 2768-m and ISO 22081 (machined), ISO 8062-3 DCTG 9 (as cast), } Ra\ 6.3\ \text{unless stated} \\
\text{Notes} & \text{break sharp edges, deburr oil holes}
\end{array}
$$
**The assembly drawing — the instruction to build.**
$$
\begin{array}{l l}
\text{Views} & \text{one section through the bearing axis, one external view, one exploded view} \\
\text{Items} & 7\ \text{items: housing, bearing, cover, screws (qty } 8\text{), seal, shim pack, circlip} \\
\text{Parts list} & \text{seven rows with make/buy, material and standard references} \\
\text{Dimensions} & \textbf{only}\ \text{the overall envelope, the mounting-hole pattern, the shaft protrusion and the shim range} \\
\text{Notes} & \text{torques, assembly sequence, shim selection, grease quantity, run-in}
\end{array}
$$
**Where each dimension lives.**
$$
\begin{array}{l c c}
\text{Dimension} & \text{Detail} & \text{Assembly} \\
\varnothing 80\ \mathrm{H}7\ \text{bore} & \bullet & \\
\text{Bore cylindricity } 0.008 & \bullet & \\
\text{Housing size } 240 \times 180 \times 160 & \bullet & \text{(overall envelope only, as reference)} \\
\text{Cover bolt pattern } \varnothing 130,\ 8\ \text{holes} & \bullet & \\
\text{Shaft protrusion } 42\ \text{to}\ 45 & & \bullet \\
\text{Shim pack } 0.2\ \text{to}\ 0.6,\ \text{selected} & & \bullet \\
\text{Cover screw torque} & & \bullet
\end{array}
$$
**The dimension that must not appear on both.** The bearing's axial position: on the detail it is the bore depth from datum $A$; on the assembly it is controlled by the shaft protrusion and the shims. Putting the bore depth on the assembly too creates two instructions for one surface.
**Notes that belong on the assembly.** "SELECT SHIMS TO GIVE AN AXIAL END FLOAT OF $0.05$ TO $0.12\ \mathrm{mm}$; RECORD THE SHIM THICKNESS ON THE BUILD RECORD." "TIGHTEN THE EIGHT COVER SCREWS TO THE SPECIFIED TORQUE IN A CROSSWISE SEQUENCE." "RUN IN AT THE SPECIFIED SPEED AND CHECK THE BEARING TEMPERATURE RISE."

*Sanity.* The shim thickness is recorded because the as-shimmed dimension is part of that particular machine's definition and appears on no drawing; a rebuild years later needs it.
:::
:::

::: history
Assembly drawings, parts lists and item references developed with **interchangeable manufacture** in the nineteenth century. At the US armouries — **Thomas Blanchard**'s copying lathe for gunstocks at **Springfield** around **1820**, **John H. Hall**'s interchangeable rifles at **Harpers Ferry** from the **1820s** — and later in firms such as **Colt** in the **1850s**, parts made to gauges could be assembled without fitting, and the documents describing how to assemble them became as important as the part drawings. Today the conventions are standardised: item references in **ISO 6433**, title blocks in **ISO 7200**, sheet sizes and layout in **ISO 5457**, revisions in **ASME Y14.35**, weld symbols in **ISO 2553** (current edition **2019**) and AWS A2.4, fluid-power symbols in **ISO 1219-1** (current edition **2012**), and electrical symbols in **IEC 60617**.
:::

## Where this leads

An assembly drawing assembles the parts that [[engineering-graphics/cad-modelling]] models from the geometry of [[engineering-graphics/orthographic-projection]] and [[engineering-graphics/sections-auxiliary-views]]; its dimensions are governed by [[engineering-graphics/dimensioning]], its fits by [[engineering-graphics/tolerances-fits]] and its interfaces by [[engineering-graphics/geometric-tolerancing]].

::: summary
- A detail drawing specifies how to make one part; an assembly drawing says how to build and what goes in; each requirement lives on one drawing only.
- A balloon identifies an item, not a piece: $90$ fasteners in $12$ sizes are $12$ items and $12$ parts-list lines.
- Sheets follow the A series and ISO 5457 grids; scales come from ISO 5455; revision letters avoid I, O, Q, S, X and Z (ASME Y14.35).
- Exploded views separate parts along their fitting directions, in assembly order.
- An envelope drawing must state the tolerances of its connection points.
- A fillet's design resistance is $a f_{vw,d}$, with $a = 0.707z$; for S355, about $1{,}110\ \mathrm{N/mm}$ for a $6\ \mathrm{mm}$ fillet.
- A weld specification also needs preparation, quality level and inspection; a weldment drawing specifies the welding, stress relief and machining sequence.
:::

::: quiz
A bolted assembly drawing carries the screw torque and the shim range, and the detail drawing carries the bore depth. Why is the bore depth kept off the assembly drawing?
- [ ] Assembly drawings never carry dimensions
- [x] Each requirement should be stated on one drawing only, or two instructions may disagree
- [ ] The bore is not part of the assembly
- [ ] The shim range already gives it
::: solution
Each requirement lives on one drawing. The bore depth is a making instruction and belongs on the detail; the shaft protrusion and the shim range are building instructions and belong on the assembly. With the bore depth on both, the machinist reads one, the fitter the other, and a later change to one of them leaves the other wrong.
:::
:::

## Exercises

::: exercise Sheet {level=1 check="0.5"}
Give the area of an A1 sheet. (Enter the value in square metres.)
::: solution
$0.5\ \mathrm{m^{2}}$ — an A1 is half an A0, which is $1\ \mathrm{m^{2}}$ by definition of the A series.
:::
:::

::: exercise Throat {level=1 check="0.707"}
Give the ratio of a fillet weld's throat to its leg length, for an equal-leg fillet. (Enter a ratio.)
::: solution
$1/\sqrt{2} = 0.707$.
:::
:::

::: exercise Title block {level=1 check="6"}
How many letters does ASME Y14.35 exclude from revision letters? (Enter a number.)
::: solution
Six — I, O, Q, S, X and Z — because they are easily confused with numerals or other characters.
:::
:::

::: exercise Balloons {level=1 check="3"}
A joint has $36$ bolts in $3$ sizes. How many balloons (item references) does it need? (Enter a number.)
::: solution
$3$ — one per distinct item, with the quantities in the parts list.
:::
:::

::: exercise Weld {level=1 check="1110"}
Give the design resistance of a $6\ \mathrm{mm}$ equal-leg fillet weld with $f_{vw,d} = 261.7\ \mathrm{MPa}$. (Enter the value in N/mm.)
::: solution
$a = 0.707 \times 6 = 4.243\ \mathrm{mm}$, so $F_{w,\mathrm{Rd}} = 4.243 \times 261.7 = 1{,}110\ \mathrm{N/mm}$.
:::
:::

::: exercise Intermittent weld {level=2 check="1110"}
A $6\ \mathrm{mm}$ fillet is specified $40\ \mathrm{mm}$ long at $80\ \mathrm{mm}$ pitch, staggered, on both sides of a joint, with $f_{vw,d} = 261.7\ \mathrm{MPa}$. Give the average resistance per millimetre of joint, and say where intermittent welds are avoided. (Enter the resistance in N/mm.)
::: solution
Each side is welded over $40/80 = 50\ \%$ of the length, and there are two sides:
$$
\bar{F} = 2 \times \frac{40}{80} \times 1{,}110 = 1{,}110\ \mathrm{N/mm}.
$$
*Sanity.* The staggered two-sided intermittent weld matches the static strength of a continuous one-sided weld of the same size, with the same weld metal. It is avoided where fatigue governs, because every weld end is a stress concentration, and where corrosion could start in the unwelded gaps.
:::
:::

::: exercise Envelope {level=2 check="6"}
A pump's suction flange is nominally $400\ \mathrm{mm}$ from the baseplate datum. The pump's own position tolerance is $\pm 3$, the baseplate machining $\pm 1$ and the weldment $\pm 2\ \mathrm{mm}$. Give the worst-case tolerance the envelope drawing should state, and the RSS value. (Enter the worst-case value of $\pm t$ in millimetres.)
::: solution
$$
\text{worst case} = 3 + 1 + 2 = \pm 6\ \mathrm{mm}, \qquad
\text{RSS} = \sqrt{9 + 1 + 4} = \pm 3.74\ \mathrm{mm}.
$$
For a pipework interface that must fit every unit, the drawing states the worst case, $\pm 6\ \mathrm{mm}$ — or the design provides adjustment (a flexible connection or a site-fitted spool).
*Sanity.* An envelope drawing that gives no tolerance implicitly claims $\pm 0$; pipework fabricated to it will meet flanges that are up to $6\ \mathrm{mm}$ out.
:::
:::

::: exercise Derivation {level=3 check="1360"}
Using the directional method of EN 1993-1-8, derive the resistance per unit length of an equal-leg fillet weld loaded (a) parallel to its axis and (b) transversely, perpendicular to its axis, and compare them with the simplified method. Use a $6\ \mathrm{mm}$ fillet in S355 ($f_u = 510\ \mathrm{MPa}$, $\beta_w = 0.9$, $\gamma_{M2} = 1.25$). (Enter the transverse resistance in N/mm.)
::: solution
**The criterion.** On the throat section the stresses are a normal stress $\sigma_\perp$, a transverse shear $\tau_\perp$ and a longitudinal shear $\tau_\parallel$. EN 1993-1-8 requires
$$
\sqrt{\sigma_\perp^{2} + 3\left(\tau_\perp^{2} + \tau_\parallel^{2}\right)} \le \frac{f_u}{\beta_w \gamma_{M2}} = \frac{510}{0.9 \times 1.25} = 453.3\ \mathrm{MPa}, \qquad
\sigma_\perp \le \frac{0.9 f_u}{\gamma_{M2}} = 367.2\ \mathrm{MPa} .
$$
This is a von Mises-type criterion applied on the throat, with $\beta_w$ calibrating it to weld tests.
**(a) Longitudinal load.** Only $\tau_\parallel = F/a$ acts:
$$
\sqrt{3}\, \frac{F}{a} \le 453.3 \ \Rightarrow\ F \le \frac{453.3\, a}{\sqrt{3}} = 261.7 \times 4.243 = 1{,}110\ \mathrm{N/mm},
$$
exactly the simplified-method value — the simplified method treats every fillet as if it were loaded longitudinally.
**(b) Transverse load.** A force $F$ per unit length perpendicular to the weld axis, in the plane of the joint, resolves on the $45^{\circ}$ throat into $\sigma_\perp = \tau_\perp = F/(\sqrt{2}\, a)$:
$$
\sqrt{\sigma_\perp^{2} + 3\tau_\perp^{2}} = \frac{2F}{\sqrt{2}\, a} = \frac{\sqrt{2}\, F}{a} \le 453.3 \ \Rightarrow\ F \le \frac{453.3 \times 4.243}{\sqrt{2}} = 1{,}360\ \mathrm{N/mm}.
$$
Check: $\sigma_\perp = 1{,}360 / (\sqrt{2} \times 4.243) = 226.7\ \mathrm{MPa} < 367.2$. $\checkmark$
**Comparison.** The transverse resistance is $1{,}360/1{,}110 = 1.22$ times the longitudinal one, i.e. $22.5\ \%$ higher (the ratio is $\sqrt{3/2}$). The simplified method is therefore conservative for transversely loaded fillets; the directional method recovers the difference where weight or cost matters.
*Sanity.* Tests have long shown transverse fillets to be stronger than longitudinal ones, and the $\sqrt{3/2}$ ratio of the criterion reflects that.
:::
:::

::: exercise Design {level=3}
Specify the drawing set and the parts-list structure for a range of six industrial mixers from $50$ to $500\ \mathrm{L}$, sharing a drive unit and a frame family.
::: solution
**The set.**
$$
\begin{array}{l l c}
\text{Shared} & \text{drive unit assembly, motor flange, coupling and seal details} & 6\ \text{sheets} \\
\text{Shared} & \text{frame family: one parametric detail with a six-row table} & 3\ \text{sheets} \\
\text{Per size} & \text{general assembly, envelope, tank, shaft, impeller} & 5 \times 6 = 30\ \text{sheets} \\
\text{Two sizes only} & \text{hydraulic or pneumatic circuit} & 2\ \text{sheets} \\
\text{Per size} & \text{electrical: power, control, terminal schedule, panel layout} & 4 \times 6 = 24\ \text{sheets} \\
\text{Family} & \text{options and accessories, spare parts} & 4\ \text{sheets} \\
\hline
\text{Total} & & 69\ \text{sheets}
\end{array}
$$
— far fewer than six independent designs would need, because the drive unit and frame are drawn once.
**The parts-list structure.** A modular BOM with a make/buy column:
$$
\begin{array}{l l l l}
\text{Level } 0 & \text{MIXER, complete} & 1 & \text{assembly} \\
\text{Level } 1 & \text{DRIVE UNIT} & 1 & \text{assembly, common to all six sizes} \\
\text{Level } 1 & \text{FRAME} & 1 & \text{assembly, one parametric family, six configurations} \\
\text{Level } 1 & \text{TANK} & 1 & \text{make, one detail per size} \\
\text{Level } 1 & \text{SHAFT AND IMPELLER} & 1 & \text{make, one detail per size} \\
\text{Level } 1 & \text{ELECTRICAL PANEL} & 1 & \text{buy (panel builder)} \\
\text{Level } 2 & \text{MOTOR} & 1 & \text{buy} \\
\text{Level } 2 & \text{GEARBOX} & 1 & \text{buy} \\
\text{Level } 2 & \text{MECHANICAL SEAL} & 1 & \text{buy; a key spare part} \\
\text{Level } 2 & \text{BASEPLATE} & 1 & \text{make}
\end{array}
$$
**Rules that keep the family a family.** Shared items have **one part number and one revision** across all sizes. Size-specific items use a family code plus a size suffix, with descriptions in the PLM record. A configuration table drives the BOM, so choosing a size is a selection, not a redesign. Spares (seal kits, gaskets, oil) are defined in the service BOM.
**The document that is often missing.** A **family interface matrix**: one table of every interface between modules and sizes, with its tolerances. Without it, the shared modules gradually acquire size-specific variants and the family drifts into six separate products.

*Design comment.* A drawing set is organised around the people who read it; a product family needs fewer drawings than six products, and more discipline in keeping the shared ones shared.
:::
:::
