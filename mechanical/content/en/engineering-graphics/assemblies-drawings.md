An assembly drawing has **one job**: to let somebody who has never seen the design put it together, and to let somebody else who has never seen it argue about what was in it. Everything else — the beauty of the section, the elegance of the datum, the completeness of the dimensions — belongs to the **detail drawings**, and a drawing that tries to do both does neither.

The distinction the trade makes and the textbooks do not is between a **detail drawing**, which is a **contract to make** one part, and an **assembly drawing**, which is an **instruction to build** and a **list of what to buy**. A detail drawing without its assembly is a part that fits nothing; an assembly without its details is a **picture** — and the commonest failure in a small shop is an assembly drawing with dimensions on it and no details at all, which is a **workshop** drawing and not a **design** drawing.

::: warning Seven assembly-drawing errors that stop a build
**A balloon with no parts-list entry, and an entry with no balloon.** The two are one object and a mismatch is a **short part** on the build or a **surplus** on the purchase order, and the mismatch is invisible because both halves of the drawing look complete. **A dimension on an assembly that is also on a detail.** Two instructions that may disagree, and the assembler will honour the assembly and the machinist the detail — which is how a part arrives made to its drawing and does not fit. **A section through a bolted joint that hatches the bolt.** The convention is in [[engineering-graphics/sections-auxiliary-views]] and it is broken on more assembly drawings than any other, because it is the one rule that makes a drawing look **wrong** to a drafter trained before 1960. **An exploded view with no assembly sequence.** An exploded isometric is a **puzzle** unless the parts are laid out along the **axis along which they are fitted**, and a beautiful exploded view that shows the parts in the order they were **modelled** and not the order they are **assembled** is a work of art and not an instruction. **A parts list that mixes the design BOM and the manufacturing BOM.** A purchased bearing, a made shaft and a **purchased** shaft that is made in-house next year are three different objects, and a list that does not distinguish **make** from **buy** cannot be given to a purchasing department. **No interface envelope.** A drawing of a sub-assembly that does not show the **envelope** — the maximum space it occupies, the position of its **connection points**, the **cable entry** and the **bolt circle** — is a drawing that will be built correctly and will not fit into the machine it was designed for. **No revision block and no effectivity.** A drawing without a revision history is a drawing that cannot answer "which version was on serial 118?", and a drawing that cannot answer that question cannot support a modification, an investigation or a warranty claim.
:::

## The drawing set

::: definition The seven drawings of a machine {#def-set}
$$
\begin{array}{l l l l}
\text{Drawing} & \text{Says} & \text{Reads} & \text{Owned by} \\
\text{Detail} & \text{make this one part} & \text{the machinist} & \text{design} \\
\text{Assembly} & \text{put these together} & \text{the fitter} & \text{design} \\
\text{Dimensioned assembly} & \text{the assembly's own tolerances} & \text{the inspector} & \text{design} \\
\text{Installation} & \text{fit this into the plant} & \text{the erector} & \text{design} \\
\text{Envelope / outline} & \text{the space and the interfaces} & \text{the customer's layout engineer} & \text{design} \\
\text{Schematic} & \text{the function, not the geometry} & \text{the fault-finder} & \text{systems} \\
\text{Parts list / BOM} & \text{what to buy and how many} & \text{purchasing} & \text{PLM}
\end{array}
$$
**The rule that keeps them honest.** **Every dimension is on exactly one drawing.** A dimension on an assembly drawing is a dimension that **no detail carries**, and the rule is that an assembly drawing carries **only** the dimensions that **cannot** be taken from a detail: the **overall** size, the **interface** positions, the **adjustment** ranges, the **as-shimmed** values and the **torque** and **preload** notes.
**The schematic is not a drawing of the machine.** A hydraulic circuit, an electrical diagram and a **pneumatic** loop are drawn **functionally**, with the components at the **positions of least effort** and not their **installed** positions, and the note **"SCHEMATIC — NOT TO SCALE OR POSITION"** is not a disclaimer but the **definition**.
:::

::: definition The parts list and the bill of materials {#def-bom}
**The columns, and what each is for.**
$$
\begin{array}{l l l}
\text{Item} & \text{the balloon number} & \text{ties the list to the view} \\
\text{Part number} & \text{an opaque key, never a description} & \text{the only thing that survives a redesign} \\
\text{Description} & \text{what it is, in the buyer's vocabulary} & \text{"BEARING, DEEP GROOVE, } 40 \times 80 \times 18,\ \mathrm{P}0\text{"} \\
\text{Qty} & \text{per assembly, and the UoM} & \text{a length is } 1\ \text{each of } 240\ \mathrm{mm},\ \text{not } 240 \\
\text{Make / buy} & \text{the single most important column} & \text{routes the line to a shop or to a purchase order} \\
\text{Material and condition} & \text{the alloy and its heat treatment} & \text{"EN-GJL-250", " } 42 \mathrm{CrMo} 4 + \mathrm{QT} \text{"} \\
\text{Revision} & \text{the released letter} & \text{what was on the machine} \\
\text{Ref. designator} & \text{for electrical items} & \text{ties the BOM to the schematic}
\end{array}
$$
**The three BOMs and why they differ.**
$$
\begin{array}{l l l}
\text{Design BOM} & \text{as drawn} & \text{the engineering view: assemblies, sub-assemblies, parts} \\
\text{Manufacturing BOM} & \text{as built} & \text{adds the raw stock, the consumables, the weld wire, the paint kit, the shims} \\
\text{Service BOM} & \text{as maintained} & \text{adds the **kits**, drops the parts nobody replaces, splits the assemblies that must be broken}
\end{array}
$$
**The number that shows why they differ.** A gearbox with a design BOM of $38$ lines has a manufacturing BOM of $61$ — the castings, the bar stock, the shims, the sealant, the paint, the preservative, the packing — and a service BOM of $22$, because nobody buys a casting and everybody buys a **seal kit** that is not a part in either of the other two.
**The ballooning rules.** **Number clockwise from the top, in the order the parts appear, and never renumber a released drawing.** **One balloon per distinct item**, with the quantity in the list and not repeated on the leader. **Leaders straight, at $30$ to $60$ degrees, with a dot on the surface or a leader to the item's visible outline**, and **never crossing another leader** where it can be avoided. **A group of identical fasteners is one balloon with a leader to a **bracket** enclosing them** and a quantity of $12$.
**The count.** A single view carries about **$50$ balloons** before the leaders become unreadable, so an assembly of $200$ items needs **four to six** views or **four to six** drawings, and a drafter who puts $180$ balloons on one A1 has produced a **poster**.
:::

::: definition Sheets, scales and the title block {#def-sheet}
$$
\begin{array}{l c c c c}
\text{Size} & \text{mm} & \text{Area}\ (\mathrm{m^{2}}) & \text{Typical use} & \text{Zone grid} \\
\text{A}0 & 1189 \times 841 & 1.00 & \text{large assembly, plant layout} & 10 \times 6 \\
\text{A}1 & 841 \times 594 & 0.50 & \text{assembly} & 10 \times 6 \\
\text{A}2 & 594 \times 420 & 0.25 & \text{complex detail} & 8 \times 6 \\
\text{A}3 & 420 \times 297 & 0.125 & \text{detail, the workhorse} & 8 \times 4 \\
\text{A}4 & 297 \times 210 & 0.0625 & \text{simple part, list sheet} & 6 \times 4
\end{array}
$$
**The $\sqrt{2}$ law.** Every A size is half the one above it **along the long edge**, which is why an A1 folded to A4 keeps its proportions and why the **title block is always in the bottom right corner** — the corner that survives every fold.
**The scales, and the rule that only these are allowed.**
$$
\text{Reduction: } 1 : 1,\ 1 : 2,\ 1 : 5,\ 1 : 10,\ 1 : 20,\ 1 : 50,\ 1 : 100 \qquad
\text{Enlargement: } 2 : 1,\ 5 : 1,\ 10 : 1,\ 20 : 1,\ 50 : 1,\ 100 : 1
$$
**A drawing has one scale for all its views unless each view is labelled**, and a detail view at $5 : 1$ on a $1 : 2$ sheet is labelled **"DETAIL $D$ ($5 : 1$)"** and not left to the reader.
**The title block, per ISO 7200.**
$$
\begin{array}{l l}
\text{Identification} & \text{drawing number, revision, sheet } n \text{ of } N,\ \text{title, ownership} \\
\text{Description} & \text{material and condition, surface treatment, mass, surface area} \\
\text{Fabrication} & \text{general tolerances (ISO } 2768\text{-}xx),\ \text{general surface, general radii, general draft} \\
\text{Projection} & \text{the first- or third-angle symbol, and the units} \\
\text{Authority} & \text{drawn, checked, approved, with dates} \\
\text{Change} & \text{the revision block: letter, date, description, authority} \\
\text{Status} & \text{the customer's release status, and the export-control and proprietary notices}
\end{array}
$$
**The revision letters skip $I$, $O$, $Q$, $S$, $X$ and $Z$** in the American practice, because a handwritten $I$ is a $1$ and an $O$ is a $0$; the ISO practice does not skip and is therefore ambiguous on a faxed sheet, which is a reason the American practice survives.
**The zone grid.** The sheet is divided into a grid of letters and numbers so that a change note can say **"zone $D4$"** and a red arrow can be found on a folded A0. **A drawing without a zone grid cannot be red-balled**, and a red-ball is how a change is communicated on a shop floor that has no tablet.
:::

::: definition Assembly conventions {#def-assyconv}
$$
\begin{array}{l l}
\text{No hidden lines} & \text{an assembly drawing shows what you can see and what the section reveals, and nothing else} \\
\text{Adjacent parts in phantom lines} & \text{type-E dash-dot-dot, with a note, when the neighbour matters} \\
\text{Sections through fasteners} & \text{bolts, shafts, keys, pins, balls, gear teeth unhatched lengthwise} \\
\text{Two parts, two hatches} & \text{opposite angles or different pitches} \\
\text{Clearances exaggerated} & \text{a } 0.03\ \mathrm{mm}\ \text{fit drawn as a } 0.5\ \mathrm{mm}\ \text{gap} \\
\text{Sequence arrows} & \text{type-B arrows showing the direction each part is fitted} \\
\text{Balloon and leader} & \text{a circle of } 5\ \mathrm{mm}\ \text{diameter, } 3.5\ \mathrm{mm}\ \text{text, a straight leader} \\
\text{Exploded along the fit axis} & \text{the parts laid out in the order they are fitted, not modelled} \\
\text{Break lines on long parts} & \text{the dimension is the true one} \\
\text{Cutaway of the neighbour} & \text{a broken-out section, bounded by a thin freebreak, when the interface matters}
\end{array}
$$
**The exploded view's one rule.** **The parts are separated along the axis along which they are fitted.** A bearing pressed onto a shaft explodes **axially**; a cover bolted to a flange explodes **normal to the flange**; a **bayonet** fitting explodes axially with a **curved** arrow showing the quarter-turn. An exploded view that separates parts along an axis they do not travel is a **decoration**.
**The "course of action" line.** A thin **type-K** chain line joining the exploded parts in assembly order, with **arrows**, is the difference between an exploded view and an **assembly instruction**, and it costs one minute per drawing.
:::

::: widget plot
f: 50*x; 200
x: 1, 6
y: 0, 300
labels: balloons placed; one view's practical limit
caption: The number of balloons a drawing can carry before its leaders become unreadable, against the number of views. A single view holds about $50$; two views about $90$ and not $100$, because the second view repeats the parts it shares; four views about $170$. The horizontal line is a $200$-item assembly, which is **five** views or **two** drawings — and the reason a $200$-item assembly on one A1 sheet is a drawing that will be misbuilt.
:::

## Interfaces, welds and circuits

::: definition The envelope and the interface drawing {#def-envelope}
An **envelope drawing** is the only drawing a **customer's layout engineer** reads, and it contains:
$$
\begin{array}{l l}
\text{The overall envelope} & \text{the maximum } x, y, z \text{ the machine occupies, including the door swing and the cable radius} \\
\text{The connection points} & \text{the bolt circle, the dowel positions, the flange face} \\
\text{The services} & \text{the water, air, power and signal entries, with their sizes and positions} \\
\text{The maintenance envelope} & \text{the space needed to withdraw a bundle, a rotor or a filter} \\
\text{The lifting points and the mass} & \text{the CG, the sling angles, the lift lugs} \\
\text{The floor loading} & \text{the point loads at the feet, in the operating and the seismic condition}
\end{array}
$$
**The number that ruins a commissioning schedule.** A pump set delivered with a **$40\ \mathrm{mm}$** discrepancy in its suction flange position because the envelope drawing showed the flange at the **nominal** position and the piping was fabricated from it, while the pump's own **tolerance** of $\pm 3\ \mathrm{mm}$ and the **baseplate's** $\pm 5$ were never added. The envelope drawing must state the **tolerance of the envelope**, and the note is **"ENVELOPE DIMENSIONS ARE MAXIMUM MATERIAL CONDITIONS; CONNECTION POINTS ARE TOLERANCED TO $\pm 2\ \mathrm{mm}$ FROM THE ENVELOPE."**
:::

::: definition Weld symbols in one page {#def-weld}
$$
\begin{array}{l l}
\text{Arrow side} & \text{below the reference line} \\
\text{Other side} & \text{above the reference line} \\
\text{Fillet} & \text{a right triangle; the leg size } z \text{ to the left} \\
\text{Groove} & \text{a V, a U, a J, a square butt; the preparation angle and root face inside} \\
\text{Size} & z \text{ (leg) or } a \text{ (throat), to the left of the symbol} \\
\text{Length / pitch} & \text{to the right: } 40\text{/}80 \text{ means a } 40\text{-long weld at an } 80\text{-pitch} \\
\text{Staggered} & \text{the symbol drawn on both sides of the line} \\
\text{Field weld} & \text{a circle at the junction of the arrow and the reference line} \\
\text{Weld-all-round} & \text{a circle at the arrow's end} \\
\text{Flush / convex / concave} & \text{a flag on the reference line: flush, convex, concave} \\
\text{Process} & \text{in parentheses: (135) is MAG, (141) TIG, per ISO } 4063
\end{array}
$$
**The throat and the capacity.** A fillet of leg $z$ has a **throat** of
$$
a = \frac{z}{\sqrt{2}} = 0.707\, z
$$
and a design resistance per unit length of
$$
F_{w,\mathrm{Rd}} = a\, f_{vj,\mathrm{d}}, \qquad f_{vj,\mathrm{d}} = \frac{f_{u}}{\sqrt{3}\, \gamma_{M2}}
$$
**The evaluation.** A $6\ \mathrm{mm}$ fillet on S$355$ with an E$42$ electrode, $f_u = 430\ \mathrm{MPa}$, $\gamma_{M2} = 1.25$:
$$
f_{vj,\mathrm{d}} = \frac{430}{1.732 \times 1.25} = 199\ \mathrm{MPa}, \qquad
F_{w,\mathrm{Rd}} = 4.24 \times 199 = 844\ \mathrm{N / mm} .
$$
**The intermittent weld.** A $6\ \mathrm{mm}$ fillet at $40$ long, $80$ pitch is a **$50\ \%$** duty and carries $422\ \mathrm{N / mm}$ averaged over the joint — and the **ends of the intermittent weld** are notches, so an intermittent weld is **forbidden** under **fatigue** in every bridge and crane code, and the note **"CONTINUOUS WELD WHERE NOTED AS INTERMITTENT"** is a fatigue designer's insurance.
**The three things a weld symbol must say that drafters forget.** **The preparation** — a butt weld with a $60^{\circ}$ included angle and a $2\ \mathrm{mm}$ root face is a different weld from a square butt, and the symbol shows it. **The process**, because a TIG root on a $3\ \mathrm{mm}$ plate is a different cost from a submerged-arc on the same plate. **The inspection**, because a weld symbol without an NDT requirement is a weld that will not be tested, and a **full-thickness** weld on a lifting lug without UT is a weld that will be trusted and not tested.
:::

::: definition Circuits and schematics {#def-circuit}
$$
\begin{array}{l l l}
\text{Drawing} & \text{Standard} & \text{Shows} \\
\text{Hydraulic circuit} & \text{ISO } 1219 & \text{function; components symbolised, positions arbitrary} \\
\text{Pneumatic circuit} & \text{ISO } 1219 & \text{as above, with the spring return and the pilot lines} \\
\text{Electrical schematic} & \text{IEC } 60617,\ \text{IEC } 61082 & \text{function; the "current in an unenergised, unpowered state"} \\
\text{Wiring diagram} & \text{IEC } 61082 & \text{the actual cables, cores, colours and terminals} \\
\text{Terminal schedule} & - & \text{every core, its number, its origin and its destination} \\
\text{Panel layout} & - & \text{the physical DIN rail, the clearances and the ducts} \\
\text{Harness drawing} & - & \text{the loom's route, its lengths, its clips and its connectors}
\end{array}
$$
**The three rules of a schematic.** **It is drawn with every device in its **de-energised, unpowered, at-rest** state**, because a schematic drawn in the energised state is unreadable by anyone who is not already an expert. **The lines are **functions** and not wires** — a crossed line with no dot is **not** a connection, and a drawing that uses a dot **and** a bridge on the same sheet is a drawing with two conventions. **The signal flows **left to right and top to bottom**, with the **power rails** at the top and bottom and the **logic** between.
**The number that shows why a schematic is not a wiring diagram.** A hydraulic circuit with **$14$** symbols corresponds to a manifold with **$18$** drilled crossings and **$6$** cartridge cavities; a **harness** drawing for a machine whose schematic has **$60$** signals has **$140$** cores, because every signal is a **pair** and half of them have a **shield**.
:::

::: example A pump unit's drawing set {#ex-set}
A hydraulic power pack: a $60\ \mathrm{L}$ tank, a $7.5\ \mathrm{kW}$ motor-pump, a manifold block, $12$ valves, a cooler, a filter and a control panel. Give the drawing set.
::: solution
$$
\begin{array}{l l c l}
\text{GA-}001 & \text{general assembly, A}1\ \text{landscape} & 1{:}5 & \text{the whole pack, with balloons and the parts list} \\
\text{GA-}002 & \text{envelope and foundation, A}1 & 1{:}5 & \text{the bolt holes, the services, the maintenance envelope, the mass} \\
\text{GA-}003 & \text{exploded isometric, A}2 & & \text{the assembly sequence of the pump-motor-manifold} \\
\text{HY-}010 & \text{hydraulic schematic, A}2 & & \text{ISO } 1219,\ 14\ \text{symbols} \\
\text{HY-}011 & \text{manifold drilling, A}2 & 1{:}1 & \text{the five sections of the manifold} \\
\text{EL-}020 & \text{power circuit, A}2 & & \text{IEC } 60617 \\
\text{EL-}021 & \text{control circuit, A}2 & & \\
\text{EL-}022 & \text{terminal schedule, A}3\times 3\ \text{sheets} & & \text{every core} \\
\text{EL-}023 & \text{panel layout, A}3 & 1{:}2 & \\
\text{DT-}1xx & \text{detail drawings, A}3 & 1{:}1 & \text{the } 6\ \text{made parts: the baseplate, the pump flange, the guard} \\
\text{PL-}001 & \text{parts list, A}3\times 2 & & \text{the design BOM, with make/buy} \\
\hline
\text{Total} & 17\ \text{sheets} & & \text{of which } 6\ \text{are the design authority's and } 6\ \text{are the panel builder's}
\end{array}
$$
**The three things the general assembly must carry and usually does not.** **The torque and the sequence of the pump-to-motor bolts**, because a pump cracked by unevenly torqued flange bolts is the commonest field failure in the trade. **The **as-shimmed** note**: "SHIM THE PUMP TO GIVE A FLANGE-TO-MOTOR PARALLELISM OF $0.05$ AND A CONCENTRICITY OF $0.05$, MEASURED AT THE COUPLING HOUSING." **The **cleanliness at build** note**: "FLUSH THE SYSTEM TO ISO $4406$ CLASS $17 / 15 / 12$ BEFORE COMMISSIONING; THE FILTER ELEMENT IS A $10\ \mu\mathrm{m}$ ABSOLUTE AND IS REPLACED AFTER THE FLUSH."
**The one drawing that is always omitted.** The **foundation and services** drawing. The customer's civil engineer needs the **point loads at the four feet**, the **dynamic reaction** of the pump at the running speed, the **electrical isolation** requirement and the **oil capacity** for the bund — and none of it is on a general assembly.
*Sanity.* The reason the drawing set is $17$ sheets and not $3$ is that the pack has **three owners**: the machine designer, the panel builder and the customer's erector, and each needs a drawing in their own language. A single "everything" drawing is read by none of them.
:::
:::

::: example Balloons, leaders and the 200-item assembly {#ex-balloon}
A valve manifold assembly has $200$ items: $40$ distinct parts, $90$ fasteners in $12$ sizes and $70$ purchased items. Give the ballooning and the sheet layout.
::: solution
**The grouping.** $90$ fasteners in $12$ sizes are **$12$ balloons** and not $90$, because a balloon is an **item** and not a **piece**. The count is therefore
$$
40\ (\text{made}) + 12\ (\text{fastener groups}) + 70\ (\text{purchased}) = 122\ \text{balloons}.
$$
**The layout.**
$$
\begin{array}{l l c}
\text{Sheet } 1\ \text{of } 3\ (\text{A}1) & \text{front section, top view} & 50\ \text{balloons} \\
\text{Sheet } 2\ \text{of } 3\ (\text{A}1) & \text{two side sections, one removed section} & 45\ \text{balloons} \\
\text{Sheet } 3\ \text{of } 3\ (\text{A}1) & \text{exploded isometric, parts list, notes} & 27\ \text{balloons} \\
\hline
& \text{total} & 122
\end{array}
$$
**The numbering.** **$1$ at the top of the front view, clockwise, and the numbers never repeat across the three sheets.** A balloon that appears on two sheets is **numbered once** and the second sheet carries a **note** "ITEMS $1$ TO $48$ SEE SHEET $1$" — because a renumbered item is a **different item** to the purchasing system.
**The leader rules.** **Straight leaders at $30$ to $60$ degrees**, **no crossing**, **a dot on a surface and no dot on a line**, **the balloon's circle at $5\ \mathrm{mm}$ and the text at $3.5\ \mathrm{mm}$**, and **the balloons aligned in columns outside the view** so that a fitter can run a finger down them.
**The parts list.** On **every** sheet, in the same place, with the **same** $122$ rows and a column that says which sheet each item is on — because a fitter with three sheets on a bench will not go looking for the list.
**The three notes that prevent a misbuild.** **"TORQUE ALL MANIFOLD BOLTS TO $25\ \mathrm{N \cdot m}$ IN A STAR PATTERN IN THREE STEPS."** **"ITEMS $60$ TO $71$ ARE O-RINGS; LUBRICATE WITH SILICONE AND DO NOT ROLL THEM OVER A THREAD."** **"THE MANIFOLD IS CLEANED, PLUGGED AND CAP-SEALED BEFORE ASSEMBLY; NO TAPE, NO FLAX, NO STRING."**
*Sanity.* The reason a fastener **group** is one balloon is that a balloon is a **line in the parts list** and the parts list is a **purchase order line**; $90$ balloons on $12$ order lines is a list that purchasing will reject, and a drawing that purchasing rejects is a drawing that will be re-cut by hand — which is where the wrong bolt comes from.
:::
:::

::: example A weldment drawing {#ex-weld}
Give the complete drawing of a welded machine base: a $1{,}200 \times 800$ base plate of $16\ \mathrm{mm}$ S$355$, four $100 \times 100 \times 8$ SHS legs, two $200 \times 100 \times 8$ cross members and four machined pads.
::: solution
**The views.** Front elevation with a half-section, plan, one end elevation, **one detail at $2 : 1$** of a leg-to-base weld preparation, and **one isometric of the weld symbols** — the last being the single most useful view on a weldment drawing and the one most often omitted.
**The weld symbols.**
$$
\begin{array}{l l l}
\text{Leg to base} & \text{fillet } 6,\ \text{both sides, continuous, field weld} & 844\ \mathrm{N / mm} \\
\text{Cross member to base} & \text{fillet } 5,\ \text{both sides, } 60 \text{ long at } 100\ \text{pitch, staggered} & 296\ \mathrm{N / mm}\ \text{average} \\
\text{Leg cap plate} & \text{fillet } 4\ \text{all round, (135) MAG} & \\
\text{Gusset} & \text{fillet } 6,\ \text{concave, flush ground on the } 4\ \text{loaded ones} & \\
\text{Machined pad} & \text{fillet } 5\ \text{all round, machined AFTER welding} & \text{the pad is machined to the weldment}
\end{array}
$$
**The ten notes.**
$$
\begin{array}{l l}
1 & \text{WELD TO EN ISO } 5817\ \text{LEVEL C UNLESS NOTED} \\
2 & \text{WELDING PROCEDURE PER EN ISO } 15614\text{-}1;\ \text{WPS AND WPQR TO BE AVAILABLE} \\
3 & \text{STRESS-RELIEVE AFTER WELDING AND BEFORE MACHINING; VIBRATION RELIEF NOT ACCEPTED} \\
4 & \text{MACHINE DATUM } A\ \text{FIRST, PART CLAMPED ON ITS AS-CAST BOTTOM, BOLTED LOAD OF } 2\ \mathrm{kN}\ \text{PER FOOT} \\
5 & \text{NO WELD WITHIN } 5\ \mathrm{mm}\ \text{OF A MACHINED FACE} \\
6 & \text{SHOOT THE INSIDE OF THE SHS JOINTS AND SEAL WITH A } 4\ \text{FILLER} \\
7 & \text{BLAST TO SA } 2\tfrac{1}{2}\text{, PRIME WITH } 60\ \mu\mathrm{m}\ \text{ZINC-RICH EPOXY; MASK THE MACHINED FACES} \\
8 & \text{FLATNESS OF DATUM } A,\ 0.2\ \text{OVER THE WHOLE AREA, CHECKED UNLOADED ON A PLATE} \\
9 & \text{PROVIDE LIFTING LUGS AT THE FOUR CORNERS; THE FRAME'S MASS IS } 285\ \mathrm{kg}\ \text{AND ITS CG IS AT } ( 604,\ 397,\ 412 ) \\
10 & \text{CAMBER THE BASE PLATE } 1\ \mathrm{mm}\ \text{UPWARD OVER } 1200\ \text{TO ALLOW FOR WELD SHRINKAGE}
\end{array}
$$
**The three decisions that are unique to a weldment.** **The camber note**, because a $16\ \mathrm{mm}$ plate welded on one side only shrinks toward the weld and the frame **bows**; the $1\ \mathrm{mm}$ camber is the drafter paying for the shrinkage in advance, and the alternative is a frame that is machined flat and delivered curved. **The "machine after stress relief" note**, because an unrelieved weldment moves $0.5$ to $2\ \mathrm{mm}$ per metre in six months. **The "mask the machined faces" note**, because a primer on a bearing pad is a $60\ \mu\mathrm{m}$ shim that will not hold a flatness of $0.05$.
**The mass and the CG.** The model gives $285\ \mathrm{kg}$; the weld metal adds $1.8\ \%$ ($14\ \mathrm{kg}$ of deposited weld on a frame with $38\ \mathrm{m}$ of $6\ \mathrm{mm}$ fillet), the blast profile adds $0.3\ \%$ and the paint $0.6\ \%$, so the **drawing states $298\ \mathrm{kg}$ minimum** and the note says the model mass is a lower bound.
*Sanity.* The $38\ \mathrm{m}$ of $6\ \mathrm{mm}$ fillet is $0.7 \times 6^{2} / 2 \times 10^{- 6} = 1.26 \times 10^{- 5}\ \mathrm{m^{2}}$ of section, so $38 \times 1.26 \times 10^{- 5} \times 7{,}850 = 3.8\ \mathrm{kg}$ — and the $14\ \mathrm{kg}$ figure includes the $5\ \mathrm{mm}$ and $4\ \mathrm{mm}$ welds and the $30\ \%$ of deposited metal lost as spatter and fume, which is the number a welder will argue with and a planner will not.
:::
:::

::: example A detail drawing and an assembly drawing of the same part {#ex-detail}
A cast bearing housing is machined, bored and drilled. Give the detail drawing and the assembly drawing, and show which dimensions go on which.
::: solution
**The detail drawing — a contract to make.**
$$
\begin{array}{l l}
\text{Views} & \text{front with a full section, top, one end, three removed sections at } 2 : 1 \\
\text{Size dimensions} & \text{every diameter and every length, toleranced individually} \\
\text{Datums} & A\ \text{(mounting face)},\ B\ (\phi 80\ \text{bore}),\ C\ \text{(side face)} \\
\text{Geometry} & \text{the bore's cylindricity, the face's flatness and parallelism, the holes' position} \\
\text{Casting} & \text{the phantom-line as-cast outline, the draft note, the machining allowances, the parting line} \\
\text{General} & \text{ISO } 2768\text{-mK},\ \text{ISO } 8062\ \text{CT9/D},\ \text{ISO } 2768\text{-mK},\ \text{Ra } 6.3\ \text{default} \\
\text{Notes} & \text{unused profile remove, break edges, deburr oil holes, plug for machining}
\end{array}
$$
**The assembly drawing — an instruction to build.**
$$
\begin{array}{l l}
\text{Views} & \text{one section through the bearing axis, one external, one exploded isometric} \\
\text{Balloons} & 14\ \text{items: the housing, the bearing, the cover, eight screws, the seal, the shim pack, the circlip} \\
\text{Parts list} & \text{fourteen rows with make/buy, material and revision} \\
\text{Dimensions} & \textbf{only} \text{the overall envelope, the bolt circle, the shaft's axial position and the shim range} \\
\text{Notes} & \text{the torque, the assembly sequence, the shim selection, the grease quantity, the run-in}
\end{array}
$$
**The dimensions and where each lives.**
$$
\begin{array}{l c c}
\text{Dimension} & \text{Detail} & \text{Assembly} \\
\phi 80\ \mathrm{H}7\ \text{bore} & \bullet & \\
\text{Bore's cylindricity } 0.008 & \bullet & \\
\text{Housing's overall } 240 \times 180 \times 160 & \bullet & \\
\text{Bolt circle } \phi 130,\ 8\ \text{holes} & \bullet & \\
\text{Shaft's protrusion } 42\ \text{to}\ 45 & & \bullet \\
\text{Shim pack } 0.2\ \text{to}\ 0.6,\ \text{selected} & & \bullet \\
\text{Cover bolt torque } 28\ \mathrm{N \cdot m} & & \bullet \\
\text{Bearing's running temperature at run-in} & & \bullet
\end{array}
$$
**The one dimension that appears on both and must not.** The **bearing's axial position**. On the detail it is the **bore's depth from datum $A$**; on the assembly it is the **shaft's protrusion**, and a drafter who puts the bore depth on the assembly has created two instructions for one surface — and the machinist will read the detail and the fitter the assembly, and neither will notice the disagreement until the shim pack comes out $1.2\ \mathrm{mm}$ thick.
**The three notes that belong on the assembly and would be meaningless on the detail.** **"SHIM TO GIVE AN AXIAL END FLOAT OF } 0.05 \text{ TO } 0.12\ \mathrm{mm}$; RECORD THE SELECTED SHIM ON THE TRAVELLER."** **"TORQUE THE EIGHT COVER SCREWS TO $28\ \mathrm{N \cdot m}$ IN A STAR PATTERN."** **"RUN IN AT $1{,}500\ \mathrm{rpm}$ FOR $30\ \mathrm{min}$ WITH THE OIL FLOW AT $2\ \mathrm{L / min}$; THE BEARING HOUSING TEMPERATURE RISE ABOVE OIL INLET SHALL NOT EXCEED $18\ \mathrm{K}$."**
*Sanity.* The reason the shim's thickness is recorded on the traveller is that the **as-shimmed** dimension is now part of the machine's definition and appears on no drawing — and a machine rebuilt eight years later without the traveller will be re-shimmed by guesswork, and its bearing will be preloaded.
:::
:::

::: history
The **assembly drawing** as a document distinct from a detail drawing is a product of the **American system of manufactures** — **Thomas Blanchard**'s duplicating lathes at **Springfield** in the **1820s**, **John H. Hall**'s **rifles** at **Harpers Ferry** in the **1824–1840s**, and the **Winchester** and **Colt** shops of the **1850s** — where the **gauged** interchangeability of parts made an **assembly instruction** a necessary document for the first time, because a fitter who had previously **filed** each part to fit now had to **select** and **combine** them. **The parts list** descends from the **ordnance departments**' "list of pieces" and the **railway** shops' "bill of stores" of the **1840s**; **the balloon** is first documented in **John Brown**'s **1871** *Text Book on Mechanical Drawing* and **Thomas Ewing**'s **1878** *Handbook of Mechanical Drawing*, both of which already specify the **clockwise numbering** and the **straight leader**. **The exploded isometric** is attributed to the **late-nineteenth-century** **agricultural implement** makers — **Cyrus McCormick**'s and **John Deere**'s catalogues of the **1870s** — and entered the drawing office through the **Second World War** **aircraft maintenance** manuals, where the **exploded view with a course-of-action line** became an **illustrated parts catalogue** and then, through the **ASA Z** series of technical manual standards of **1944**, an **assembly instruction**. **The weld symbol** was invented in **1921** by the **American Bridge Company** for the **first welded highway bridges**, standardised by the **AISC** in **1924**, and internationalised by **ISO 2553** of **1974**; the **reference line with the arrow side below** convention is a **1924** American choice and the **European** practice of the same period put the arrow side **above**, which is why a European and an American weld symbol on the same drawing are **mirror images** and why every international code now says which one it means. **The schematic symbol set** is the **IEC TC 3** work begun in **1953**, and the **hydraulic** symbols the **CETOP** practice of the **1950s** standardised as **ISO 1219** in **1970**.
:::

## Where this leads

An assembly drawing assembles the parts that [[engineering-graphics/cad-modelling]] models from the geometry of [[engineering-graphics/orthographic-projection]] and [[engineering-graphics/sections-auxiliary-views]]; its dimensions are governed by [[engineering-graphics/dimensioning]], its fits by [[engineering-graphics/tolerances-fits]] and its interfaces by [[engineering-graphics/geometric-tolerancing]].

::: summary
- A detail drawing is a contract to make; an assembly drawing is an instruction to build and a list of what to buy, and every dimension lives on exactly one of them.
- A balloon is an item and not a piece: 90 fasteners in 12 sizes are 12 balloons and 12 purchase-order lines.
- A view holds about 50 balloons; a 200-item assembly is five views or two drawings, never one poster.
- An exploded view separates parts along the axis they are fitted, and a course-of-action line is the difference between a picture and an instruction.
- An envelope drawing must state the tolerance of the envelope, or the piping will not arrive.
- A weld symbol without a preparation, a process and an inspection requirement is a weld that will not be tested.
- A weldment drawing cambers the plate, machines after stress relief, and masks the machined faces.
:::

::: quiz
A bolted assembly drawing carries the bolt's torque and the shim range, and the detail drawing carries the bore depth. Why is the bore depth kept off the assembly drawing?
- [ ] Assembly drawings never carry dimensions
- [x] Every dimension must live on exactly one drawing, or two instructions may disagree
- [ ] The bore is not part of the assembly
- [ ] The shim range already gives it
::: solution
Every dimension lives on exactly one drawing. The bore's depth is a **make** instruction and belongs on the detail; the shaft's protrusion and the shim range are **build** instructions and belong on the assembly. Put the bore depth on both and the machinist reads one and the fitter the other, and the disagreement surfaces as a shim pack that is $1.2\ \mathrm{mm}$ thick on the bench — which is the same cost either way, only later and in front of a customer.
:::
:::

## Exercises

::: exercise Sheet {level=1 check="0.5"}
Give the area in square metres of an A1 sheet.
::: solution
$0.5\ \mathrm{m^{2}}$ — an A1 is half an A0, which is $1\ \mathrm{m^{2}}$ by the definition of the A series.
:::
:::

::: exercise Throat {level=1 check="0.707"}
Give the ratio of a fillet weld's throat to its leg size.
::: solution
$1 / \sqrt{2} = 0.707$.
:::
:::

::: exercise Title block {level=1 check="5"}
How many letters of the revision alphabet are skipped in the American practice, and why?
::: solution
Five — $I$, $O$, $Q$, $S$, $X$ and $Z$ are variously omitted, the canonical set being $I$, $O$, $Q$, $S$ and $Z$, because a handwritten $I$ reads as a $1$ and an $O$ as a $0$.
:::
:::

::: exercise Balloons {level=1 check="12"}
A joint has $36$ bolts in $3$ sizes. How many balloons does it need?
::: solution
$3$ — one per distinct item.
:::
:::

::: exercise Weld {level=1 check="844"}
Give the design resistance in newtons per millimetre of a $6\ \mathrm{mm}$ fillet with $f_{vj,d} = 199\ \mathrm{MPa}$.
::: solution
$0.707 \times 6 \times 199 = 844\ \mathrm{N / mm}$.
:::
:::

::: exercise Intermittent weld {level=2}
A $6\ \mathrm{mm}$ fillet is specified at $40$ long and $80$ pitch, staggered on both sides. Give the average resistance per millimetre of joint and state where this is forbidden.
::: solution
One $40\ \mathrm{mm}$ weld per side every $80\ \mathrm{mm}$, staggered on two sides, gives **two** $40\ \mathrm{mm}$ welds per $80\ \mathrm{mm}$ of joint:
$$
\bar{F} = 2 \times \frac{40}{80} \times 844 = 844\ \mathrm{N / mm} .
$$
*Sanity.* A staggered two-sided intermittent weld at a $50\ \%$ duty is therefore **as strong as** a continuous single-sided weld of the same size — which is exactly why it is used, and exactly why it is **forbidden under fatigue** in EN 1993-1-9 and in every crane and bridge code: the weld **crater** at each end is a notch with a fatigue detail category of about $36\ \mathrm{MPa}$ against a continuous weld's $80$, and the strength you saved in deposition you paid for in the detail category.
:::
:::

::: exercise Envelope {level=2}
A pump's suction flange is nominally $400\ \mathrm{mm}$ from the baseplate's datum. The pump's own positional tolerance is $\pm 3$, the baseplate's machining is $\pm 1$ and the weldment's shrinkage is $\pm 2$. Give the tolerance the envelope drawing must state, and the consequence of stating $\pm 0$.
::: solution
$$
\text{worst case} = 3 + 1 + 2 = \pm 6\ \mathrm{mm}, \qquad
\text{RSS} = \sqrt{9 + 1 + 4} = \pm 3.74\ \mathrm{mm} .
$$
The envelope drawing states **$\pm 6\ \mathrm{mm}$ worst case** for a **piping** interface, because a site pipe flange cannot be coaxed by $6\ \mathrm{mm}$ and a $3.74$ RSS figure is a **statistical** claim on a **deterministic** interface.
*Sanity.* Stating $\pm 0$ — which is what a nominal envelope drawing does by silence — means the piping is fabricated to $400$ and arrives $6\ \mathrm{mm}$ out, and the fix is a **$2{,}000$** site spool and a **$20{,}000$** delay. The $6\ \mathrm{mm}$ of tolerance on the drawing costs nothing and the $0\ \mathrm{mm}$ costs twenty thousand.
:::
:::

::: exercise Derivation {level=3}
Derive the fillet weld's design resistance per unit length from the distortion-energy criterion, and show why the code's check combines the throat stresses into a single equivalent stress.
::: solution
**The stress state.** A fillet of leg $z$ and throat $a = z / \sqrt{2}$ transmits a force per unit length $F$ whose components, resolved on the **throat plane**, are a **normal** stress $\sigma_\perp$ and a **shear** stress $\tau_\perp$ (in the throat plane, transverse to the weld axis) and $\tau_{\parallel}$ (along the weld axis).
**The code criterion (EN 1993-1-8, direction 1).** The weld is checked by
$$
\sqrt{ \sigma_\perp^{2} + 3 \left( \tau_\perp^{2} + \tau_{\parallel}^{2} \right) } \le \frac{f_{u}}{\beta_{w}\, \gamma_{M2}}
$$
which is the **von Mises** distortion-energy criterion applied to the throat plane, with $\beta_w$ an increase factor for the **higher static strength** of a transverse-loaded weld ($0.8$ for S235, $0.85$ for S275, $0.9$ for S355).
**The simplification (direction 2).** The code permits the **simplified** check in which **all** the stress is taken as a **single** shear on the throat:
$$
\frac{F}{a \times 1} \le f_{vj,\mathrm{d}} = \frac{f_u}{\sqrt{3}\, \gamma_{M2}}
$$
**The derivation of the simplified form.** For a fillet loaded **parallel to its axis**, $\sigma_\perp = 0$ and $\tau_{\parallel} = F / \left( a \cdot 1 \right)$, so the von Mises expression reduces to
$$
\sqrt{3\, \tau_{\parallel}^{2}} = \sqrt{3}\, \frac{F}{a} \le \frac{f_u}{\gamma_{M2}} \quad \Rightarrow \quad \frac{F}{a} \le \frac{f_u}{\sqrt{3}\, \gamma_{M2}} = f_{vj,\mathrm{d}} .
$$
**Why one equivalent stress and not three.** Because a **fillet weld is isotropic in section** and its **failure plane is the throat by observation** — a fillet always breaks on the throat, whichever way it is loaded — so the three components are **always present together** and the criterion must combine them. A **groove** weld, whose failure plane is the fusion line and not a known plane, is checked differently and is usually taken as fully effective.
**Evaluation.** A $6\ \mathrm{mm}$ fillet, S$355$, E$42$ electrode ($f_u = 430\ \mathrm{MPa}$), $\gamma_{M2} = 1.25$, $\beta_w = 0.9$:
$$
f_{vj,\mathrm{d}} = \frac{430}{\sqrt{3} \times 1.25} = 199\ \mathrm{MPa}, \qquad
F_{\mathrm{Rd}} = 4.24 \times 199 = 844\ \mathrm{N / mm}
$$
against the **direction-1** limit stress of $f_u / \left( \beta_w \gamma_{M2} \right) = 430 / \left( 0.9 \times 1.25 \right) = 382\ \mathrm{MPa}$. For a fillet loaded at $45^{\circ}$ the two components are equal, so the equivalent stress is $\sqrt{\sigma_\perp^{2} + 3 \tau^{2}}$ with $\sigma_\perp = \tau = F / \left( \sqrt{2}\,a \right)$, giving
$$
\frac{F \sqrt{1 + 3}}{\sqrt{2}\, a} \le 382 \quad \Rightarrow \quad F_{\mathrm{Rd},1} = \frac{382 \times \sqrt{2} \times 4.24}{\sqrt{4}} = 382 \times 4.24 = 1{,}620 \Big/ \sqrt{2} \approx 1{,}010\ \mathrm{N / mm}
$$
so **direction 1 is $20\ \%$ stronger** and the simplified direction-2 check is **$20\ \%$ conservative** — which is why it is used for a **fabricator's** convenience and direction 1 for a **fatigue-critical** or **weight-critical** joint.
*Sanity.* The $20\ \%$ is the $\beta_w$ factor and the fact that a **transverse** fillet is measurably stronger than a **longitudinal** one — a fact known from the **1920s** bridge tests and still ignored by most hand calculations, and the reason a crane designer uses direction 1 and a building designer uses direction 2.
:::
:::

::: exercise Design {level=3}
Specify the complete drawing set and the parts-list structure for a product family: a range of six industrial mixers from $50$ to $500\ \mathrm{L}$, sharing a drive unit and a frame family.
::: solution
**The set, per size, and the shared set.**
$$
\begin{array}{l l c}
\text{Shared} & \text{drive unit assembly, motor flange detail, coupling detail, seal detail} & 6\ \text{sheets} \\
\text{Shared} & \text{frame family: one parametric detail with a } 6\text{-row configuration table} & 3\ \text{sheets} \\
\text{Per size} & \text{general assembly, envelope, tank detail, shaft detail, impeller detail} & 5 \times 6 = 30\ \text{sheets} \\
\text{Per size} & \text{hydraulic / pneumatic schematic (only two sizes have it)} & 2\ \text{sheets} \\
\text{Per size} & \text{electrical: power, control, terminal schedule, panel layout} & 4 \times 6 = 24\ \text{sheets} \\
\text{Family} & \text{options and accessories list, spare-parts list} & 4\ \text{sheets} \\
\hline
\text{Total} & 69\ \text{sheets for six sizes} & \text{against } 6 \times 22 = 132\ \text{for six independent designs}
\end{array}
$$
**The parts-list structure.** A **modular** BOM with three levels and a **make/buy** column:
$$
\begin{array}{l l l l}
\text{Level } 0 & \text{MIXER, complete} & 1\ \text{ea} & \text{assembly} \\
\text{Level } 1 & \text{DRIVE UNIT} & 1\ \text{ea} & \text{assembly, shared across all six sizes} \\
\text{Level } 1 & \text{FRAME} & 1\ \text{ea} & \text{assembly, parametric, six configurations} \\
\text{Level } 1 & \text{TANK} & 1\ \text{ea} & \text{made, six details} \\
\text{Level } 1 & \text{SHAFT AND IMPELLER} & 1\ \text{ea} & \text{made, six details} \\
\text{Level } 1 & \text{ELECTRICAL PANEL} & 1\ \text{ea} & \text{bought-out kit} \\
\text{Level } 2 & \text{MOTOR, } 7.5\ \mathrm{kW}\text{, IE3, TEFC} & 1\ \text{ea} & \text{buy} \\
\text{Level } 2 & \text{GEARBOX, } i = 12.5 & 1\ \text{ea} & \text{buy} \\
\text{Level } 2 & \text{MECHANICAL SEAL} & 1\ \text{ea} & \text{buy, and the service BOM's biggest line} \\
\text{Level } 2 & \text{BASEPLATE} & 1\ \text{ea} & \text{make}
\end{array}
$$
**The four rules that make the family work.** **The shared items have one part number and one revision, and are never "size-specific versions of the same thing".** **The size-specific items are named by a **family code plus a size suffix** and never by a description.** **The configuration table drives the BOM**, so a size is a **selection** and not a design. **The mechanical seal, the oil and the gasket kit are on the **service** BOM and not on the design BOM**, because they are what the customer buys for twenty years.
**The three notes that prevent the family from becoming six products.** **"THE DRIVE UNIT IS COMMON TO ALL SIZES; ANY CHANGE TO IT AFFECTS SIX MODELS AND REQUIRES A FAMILY-WIDE CHANGE NOTE."** **"THE FRAME IS ONE MODEL; THE SIX SIZES ARE SIX CONFIGURATIONS AND NOT SIX MODELS."** **"THE IMPELLER IS THE ONLY PART THAT CHANGES WITH THE APPLICATION; IT IS THE ONLY PART A CUSTOMER MAY SUBSTITUTE."**
**The one drawing that must exist and never does.** A **family interface matrix** — a one-page table of every interface between every module and every size, with its tolerance. It is the drawing that makes a family a family, and its absence is why a product family drifts into six products within three years.

*Design comment.* The general rule is that **a drawing set is a product of the organisation that will read it**, and a family needs **fewer** drawings than its parts because the drawings are **shared** — and needs **more** discipline, because a shared drawing that is quietly made size-specific is the first step back to six products.
:::
:::
