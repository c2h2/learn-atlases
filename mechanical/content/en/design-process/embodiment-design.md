Embodiment design is the phase in which the concept becomes a geometry, the geometry becomes a structure, and the structure becomes a product. The concept says "use a planetary gearbox with a worm output"; the embodiment says "the sun gear has 17 teeth, the planet gears have 23 teeth, the ring gear has 63 teeth, the module is 2.5 mm, the face width is 40 mm, the gears are 20MnCr5 case-hardened steel, the shaft is 35 mm diameter, 42CrMo4 QT, the bearings are 6207-2RS deep-groove ball bearings, the housing is EN-GJL-250 grey cast iron, and the oil sump depth is 25 mm." **The concept is a promise; the embodiment is the contract, and the contract is the document that the manufacturer, the quality engineer, and the customer will hold you to.**

The embodiment phase is where the design is won or lost. The concept is 10 % of the design effort and 90 % of the design's character; the embodiment is 30 % of the design effort and 90 % of the design's cost. **The embodiment decisions — the wall thickness, the fillet radius, the draft angle, the tolerance, the surface finish, the fastener size, the seal type — determine whether the product can be made, assembled, inspected, maintained, and disposed of, and the determination is made before the first part is cut.** The embodiment is where the design-for-manufacture analysis (see [[design-process/design-for-manufacture|DFM]]) is performed, where the tolerance stack-up is calculated, where the layout is frozen, and where the design freeze gate is passed.

::: warning Nine ways embodiment design goes wrong
**Freezing the layout before the interfaces are defined.** The engineer who fixes the overall dimensions before the mounting interface, the shaft seal, the cable entry, and the maintenance access are defined will discover at the detail-design stage that the seal cannot be changed without removing the gearbox from the machine. **Define the interfaces first, the internal geometry second, and the external envelope third. The interface is the constraint; the envelope is the result.** **Not doing the tolerance stack-up.** The engineer who designs each part to ± 0.5 mm without checking the cumulative tolerance of the assembly will discover that the assembly does not fit, or that the clearance is 3 mm when it should be 0.5 mm. **Do the tolerance stack-up at the embodiment stage, not at the detail stage, and do it for every critical dimension chain. The stack-up is the reason the tolerance is ± 0.1 mm on the bearing seat and ± 1 mm on the mounting hole.** **Specifying tolerances that the process cannot hold.** The engineer who specifies ± 0.01 mm on a sand-cast surface is not specifying a tolerance; they are specifying a rework operation. **Every tolerance must be checked against the process capability ($C _ { p k }$) of the manufacturing process, and the process capability is the reason the tolerance is ± 0.5 mm on the cast surface and ± 0.02 mm on the machined surface.** **Not designing for assembly.** The engineer who designs a part that requires the assembler to hold three components, two fasteners, and a washer simultaneously is not designing a part; they are designing an assembly problem. **Apply the DFA rules (see [[design-process/design-for-manufacture|DFA]]): assemble from one direction, use self-locating features, minimise the part count, and avoid fasteners that require two hands.** **Ignoring the maintenance access.** The engineer who designs a sealed unit with no access to the wear parts is not designing a product; they are designing a landfill item. **Every wear part (bearing, seal, belt, filter, brush) must be replaceable without removing the product from its foundation, and the replacement procedure must be written before the design is frozen.** **Not specifying the surface finish.** The engineer who leaves the surface finish off the drawing is specifying "as machined," which means "whatever the machine leaves," which means "uncontrolled." **Every mating surface, sealing surface, bearing surface, and sliding surface must have a specified surface roughness (Ra or Rz), and the specification is the reason the surface is ground, lapped, or honed.** **Not designing for inspection.** The engineer who designs a bore with a tolerance of ± 0.01 mm and no datum feature is not specifying a bore; they are specifying an argument with the metrology engineer. **Every critical dimension must have a datum reference frame (see [[manufacturing/metrology-quality|metrology]]), and the datum is the reason the part is inspected on a CMM and not thrown in the scrap bin.** **Not considering the thermal expansion.** The engineer who designs a 500 mm aluminium bracket with a ± 0.05 mm tolerance and a 100 °C operating temperature range is not designing a bracket; they are designing a 0.12 mm thermal expansion that will close the clearance or crack the weld. **Calculate the thermal expansion for every critical dimension, and put the expansion in the tolerance stack-up.** **Not designing for the environment.** The engineer who designs a steel bracket for a marine environment without a coating specification is not designing a bracket; they are designing a rust stain. **Specify the corrosion protection (coating, plating, anodising, material selection) for the operating environment, and put the protection in the drawing note.**
:::

## 1. Layout and architecture

::: definition Layout design and the packaging envelope {#def-layout}
**Layout design** is the process of arranging the components in three-dimensional space to satisfy the functional, structural, thermal, and manufacturing constraints. The layout is the bridge between the concept (the block diagram) and the detail design (the drawings), and the layout is the decision that determines the product's architecture.

The **packaging envelope** is the three-dimensional volume within which the product must fit. The envelope is defined by the interface requirements (the mounting points, the connection ports, the access panels) and the constraint requirements (the maximum dimensions, the minimum clearances, the turning radius). The layout is the process of fitting the components into the envelope, and the fitting is the constraint that drives the layout.

$$
\begin{array} { l l l l }
\textbf{Layout principle} & \textbf{Description} & \textbf{Example} & \textbf{Violation cost} \\ \hline
\text{Group by function} & \text{Put the components that share a function together} & \text{All the hydraulic components on one manifold} & \text{Long hoses, pressure drops, leaks} \\
\text{Group by maintenance} & \text{Put the wear parts behind the same access panel} & \text{Filter, belt, and brush behind one door} & \text{Maintenance time, downtime} \\
\text{Separate by heat} & \text{Keep the heat sources away from the heat sinks} & \text{Motor away from the electronics} & \text{Thermal failure, derating} \\
\text{Separate by vibration} & \text{Isolate the vibration source from the sensitive components} & \text{Compressor on isolation mounts} & \text{Fatigue failure, noise} \\
\text{Assemble from one direction} & \text{Stack the components vertically or horizontally} & \text{Top-down assembly of the gearbox} & \text{Assembly time, DFA score} \\
\end{array}
$$

**The layout is not a single pass: it is an iterative process that alternates between the top-down (envelope → zones → components) and the bottom-up (components → envelope → zones). The top-down pass establishes the zones; the bottom-up pass sizes the components; the iteration converges when the components fit in the zones and the zones fit in the envelope.**
:::

::: definition Architecture: modular vs integral, and the interface definition {#def-architecture}
The **product architecture** is the pattern of relationships between the components. The two extremes are:

- **Modular architecture**: the components are connected by standardised, decoupled interfaces. Each module performs a function, and the modules can be replaced, upgraded, or reconfigured independently. **Example: the personal computer (CPU, GPU, RAM, storage, PSU are all modules with standard interfaces).**
- **Integral architecture**: the components are interconnected, and the interfaces are bespoke. The components cannot be separated without disassembling the product. **Example: the monocoque aircraft fuselage (the skin, the frames, and the stringers are structurally integrated).**

$$
\begin{array} { l c c }
& \textbf{Modular} & \textbf{Integral} \\ \hline
\text{Manufacturing cost} & \text{Higher (more interfaces)} & \text{Lower (fewer parts)} \\
\text{Assembly cost} & \text{Lower (standard interfaces)} & \text{Higher (bespoke interfaces)} \\
\text{Maintenance} & \text{Lower (swap the module)} & \text{Higher (disassemble the product)} \\
\text{Upgrade} & \text{Easy (replace the module)} & \text{Impossible (redesign the product)} \\
\text{Variety} & \text{High (mix and match modules)} & \text{Low (one architecture per product)} \\
\text{Weight} & \text{Higher (interface hardware)} & \text{Lower (integrated structure)} \\
\end{array}
$$

**The architecture decision is made at the embodiment stage, and it is the decision that determines the product's cost, maintainability, and upgradeability for its entire life. The modular architecture is the right choice for a product that will be upgraded (a computer, a machine tool); the integral architecture is the right choice for a product that will not (a bicycle frame, a turbine blade).**
:::

::: definition The interface control document {#def-interface-control}
The **interface control document** (ICD) is the document that defines the interface between two subsystems, two modules, or two teams. The ICD specifies:

1. **Mechanical interface**: the mounting geometry, the bolt pattern, the dowel locations, the clearance, the alignment tolerance.
2. **Electrical interface**: the voltage, the current, the signal type, the connector type, the pin assignment, the grounding scheme.
3. **Data interface**: the protocol, the baud rate, the message format, the error handling.
4. **Fluid interface**: the pressure, the flow rate, the port size, the thread type, the seal type, the fluid compatibility.
5. **Thermal interface**: the heat load, the thermal resistance, the cooling method, the maximum temperature.
6. **Environmental interface**: the temperature range, the humidity, the vibration, the EMC.

**The ICD is the contract between the teams, and the contract is the reason the integration does not fail. The interface that is not in the ICD is the interface that will be discovered at the integration test, and the discovery will cost 10× the cost of writing the ICD.**
:::

::: example Layout of a CNC machining centre {#ex-layout-cnc level=3 check="4"}
A CNC machining centre has the following subsystems: (1) bed and column, (2) spindle and tool changer, (3) X-Y table, (4) coolant system, (5) electrical cabinet, (6) chip conveyor. Apply the layout principles.

**Layout decisions:**

1. **Group by function**: The spindle and tool changer are on the column (the Z-axis), the X-Y table is on the bed, the coolant system is behind the work envelope, the electrical cabinet is on the side of the column, the chip conveyor is under the table.
2. **Group by maintenance**: The tool changer, the spindle, and the coolant nozzles are behind the front access door. The electrical cabinet has its own door. The chip conveyor is accessible from the front.
3. **Separate by heat**: The electrical cabinet (heat source: drives, 2 kW) is separated from the spindle (heat sink: oil-cooled) by the column structure. The coolant system (heat sink: chiller) is at the rear.
4. **Separate by vibration**: The chip conveyor (vibration source: chip impact) is isolated from the X-Y table (precision: ± 0.01 mm) by a rubber mount and a separate foundation.
5. **Assemble from one direction**: The spindle is assembled from the top (the column is a casting with a vertical dovetail way). The table is assembled from the front (the bed is a casting with horizontal dovetail ways).

**The layout has 4 interfaces that must be in the ICD: (1) spindle-to-column (bolt pattern, alignment, thermal), (2) table-to-bed (way geometry, preload, lubrication), (3) electrical cabinet-to-machine (cable entry, grounding, EMC), (4) coolant-to-machine (port size, pressure, fluid compatibility).**
:::

::: widget plot
title: The layout iteration: top-down vs bottom-up convergence
f: 100/(x+1); 50/(x+1); 20/(x+1)
x: 0,10
y: 0,100
labels: Envelope volume (L); Component volume (L); Free volume (L)
caption: The layout iteration converges when the component volume fits within the envelope volume with sufficient free volume for maintenance access, cable routing, and thermal management. **The top-down pass starts with the envelope (100 L) and allocates zones; the bottom-up pass sizes the components (50 L) and checks the fit. The free volume (20 L) is the maintenance access, the cable routing, and the thermal margin. The iteration converges when the free volume is positive and the component volume is within the envelope.** **The layout that has zero free volume is the layout that cannot be maintained, and the maintenance engineer will discover this at the first service interval, not at the design review.**
:::

## 2. Sizing and the design calculations

::: definition Sizing: from the requirement to the dimension {#def-sizing}
**Sizing** is the process of determining the dimensions of each component from the requirements and the constraints. The sizing calculation follows the chain:

$$
\text{Requirement} \; \longrightarrow \; \text{Load} \; \longrightarrow \; \text{Stress} \; \longrightarrow \; \text{Material} \; \longrightarrow \; \text{Dimension} \; \longrightarrow \; \text{Verification}
$$

For a simply supported beam carrying a central load $F$ :

$$
\sigma _ { \max } \; = \; { \frac { M \, c } { I } } \; = \; { \frac { ( F L / 4 ) \, ( h / 2 ) } { b h ^ { 3 } / 1 2 } } \; = \; { \frac { 3 \, F \, L } { 2 \, b \, h ^ { 2 } } } \; \leq \; { \frac { \sigma _ { Y } } { n } }
$$

Solving for the height $h$ :

$$
h \; \geq \; { \sqrt { \frac { 3 \, F \, L \, n } { 2 \, b \, \sigma _ { Y } } } }
$$

**The sizing calculation is the bridge between the requirement (the load $F$ , the span $L$ , the safety factor $n$ ) and the dimension ($h$ ). The calculation is the reason the beam is 40 mm high and not 30 mm, and the reason is the calculation, not the engineer's intuition.**
:::

::: definition The design calculation package {#def-calc-package}
The **design calculation package** is the set of calculations that justify the dimensions of every component. The package contains:

1. **Load cases**: the forces, moments, pressures, temperatures, and accelerations that the component must withstand, with the source of each load (gravity, inertia, pressure, thermal, wind, seismic).
2. **Material properties**: the yield strength, ultimate strength, fatigue limit, elastic modulus, Poisson's ratio, density, thermal expansion, and fracture toughness, with the source (material certificate, standard, test data).
3. **Sizing calculations**: the stress, deflection, buckling, fatigue, and thermal calculations for each component, with the safety factor and the acceptance criterion.
4. **Verification**: the test, simulation, or analysis that confirms the sizing calculation, with the pass criterion.
5. **Assumptions**: the list of assumptions, their source, and their sensitivity.

**The calculation package is the engineering justification for the design, and the justification is the document that the reviewer, the auditor, and the lawyer will read. The calculation that is not in the package is the calculation that was not done, and the calculation that was not done is the calculation that will be the subject of the failure investigation.**
:::

::: definition The design freeze and the configuration baseline {#def-design-freeze}
The **design freeze** is the point at which the design is locked and any change requires a formal change order. The design freeze is the Gate 3 decision in the stage-gate process (see [[design-process/design-process-overview|stage-gate]]), and the gate is passed when:

1. All drawings are issued and approved.
2. All calculations are complete and reviewed.
3. The tolerance stack-up is closed for every critical dimension chain.
4. The DFMEA is complete and the RPN is below the threshold.
5. The DFM analysis is complete and the cost is within the target.
6. The prototype has been tested and the results are within the predicted range.
7. The interface control documents are signed by both teams.

**The design freeze is not a single event; it is a process. The drawings are frozen first, the calculations second, the tolerances third, and the BOM fourth. The order matters: the drawing freeze locks the geometry, the calculation freeze locks the dimensions, the tolerance freeze locks the fit, and the BOM freeze locks the cost.**
:::

::: example Sizing a hydraulic cylinder {#ex-size-cylinder level=3 check="63"}
A hydraulic cylinder must exert 50 kN at 200 bar. The cylinder is made from ST52 steel (yield 355 MPa), and the safety factor is 2. Calculate the bore diameter and the wall thickness.

**Bore diameter:**

$$
F \; = \; p \times { \frac { \pi \, D ^ { 2 } } { 4 } } \quad \Longrightarrow \quad D \; = \; { \sqrt { \frac { 4 \, F } { \pi \, p } } } \; = \; { \sqrt { \frac { 4 \times 5 0 \ 0 0 0 } { \pi \times 2 0 0 \times 1 0 ^ { 5 } } } } \; = \; { \sqrt { 3 . 1 8 \times 1 0 ^ { - 3 } } } \; = \; { \bf 5 6 . 4 } \ \text{mm}
$$

**Select the standard bore: 63 mm.**

**Wall thickness (thin-wall approximation, Barlow's formula):**

$$
t \; = \; { \frac { p \, D } { 2 \, \sigma _ { \text{allow } } } } \; = \; { \frac { 2 0 0 \times 1 0 ^ { 5 } \times 6 3 \times 1 0 ^ { 3 } } { 2 \times 3 5 5 / 2 } } \; = \; { \frac { 1 2 . 6 } { 3 5 5 } } \; = \; { \bf 3 . 5 5 } \ \text{mm}
$$

**Select the standard wall: 4 mm. The cylinder is 63 mm bore × 4 mm wall, ST52, with a 40 mm chrome-plated rod.** **The sizing calculation is the reason the cylinder is 63 mm bore and not 50 mm, and the reason is the 50 kN load at 200 bar. The calculation is in the design calculation package, and the package is the justification for the dimension.**
:::

## 3. Tolerance stack-up and the tolerance chain

::: definition The tolerance chain and the stack-up calculation {#def-tolerance-chain}
The **tolerance chain** is the sequence of dimensions that determines the final clearance, interference, or position of an assembly. The **stack-up** is the sum of the individual tolerances in the chain, and the stack-up determines whether the assembly fits.

$$
\delta _ { \text{total } } \; = \; \sum _ { i \, = 1 } ^ { n } \delta _ { i } \quad \text{(worst case)}
$$

$$
\delta _ { \text{total } } \; = \; { \sqrt { \sum _ { i \, = 1 } ^ { n } \delta _ { i } ^ { 2 } } } \quad \text{(statistical, RSS)}
$$

For a gearbox with a 20 mm gear, a 5 mm spacer, and a 10 mm bearing, the axial clearance is:

$$
\delta _ { \text{axial } } \; = \; L _ { \text{housing } } - ( L _ { \text{gear } } + L _ { \text{spacer } } + L _ { \text{bearing } } )
$$

$$
\delta _ { \text{housing } } = 3 6 . 0 \pm 0 . 1 , \quad \delta _ { \text{gear } } = 2 0 . 0 \pm 0 . 0 5 , \quad \delta _ { \text{spacer } } = 5 . 0 \pm 0 . 0 2 , \quad \delta _ { \text{bearing } } = 1 0 . 0 \pm 0 . 0 3
$$

**Worst case:** $\delta _ { \text{total } } = 0 . 1 + 0 . 0 5 + 0 . 0 2 + 0 . 0 3 = 0 . 2 0 \ \mathrm { m m }$ . **The clearance can vary from $- 0 . 1 0$ mm (interference) to $+ 0 . 3 0$ mm (loose). The interference is unacceptable, so the spacer tolerance must be tightened or a snap-ring must be added.**

**RSS:** $\delta _ { \text{total } } = { \sqrt { 0 . 1 ^ { 2 } + 0 . 0 5 ^ { 2 } + 0 . 0 2 ^ { 2 } + 0 . 0 3 ^ { 2 } } } = { \sqrt { 0 . 0 1 3 8 } } = 0 . 1 1 7 \ \mathrm { m m }$ . **The RSS clearance is 0.117 mm, which is within the acceptable range. The RSS method is valid when the tolerances are independent and normally distributed, and the validity is the reason the RSS method is used for high-volume production and the worst-case method is used for low-volume or safety-critical assemblies.**
:::

::: definition GD&T and the datum reference frame {#def-gdt}
**Geometric Dimensioning and Tolerancing** (GD&T, ASME Y14.5 / ISO 1101) is the language for specifying the geometry of a part beyond the simple linear dimensions. The GD&T symbols specify the form, orientation, location, and runout of a feature, and the specification is the reason the part is inspected on a CMM and not with a caliper.

The **datum reference frame** (DRF) is the set of three mutually perpendicular planes (A, B, C) that define the coordinate system for the part. The datum is the origin of the measurement, and the origin is the reason the measurement is repeatable.

$$
\begin{array} { l l l }
\textbf{Symbol} & \textbf{Control} & \textbf{Example} \\ \hline
\text{Flatness} & \text{Form} & \text{Bearing seat flatness: 0.02 mm} \\
\text{Perpendicularity} & \text{Orientation} & \text{Bore perpendicular to datum A: 0.05 mm} \\
\text{Position} & \text{Location} & \text{Bolt hole position: } \phi 0 . 3 \text{ at MMC} \\
\text{Runout} & \text{Runout} & \text{Shaft journal runout: 0.01 mm TIR} \\
\end{array}
$$

**The GD&T callout is the reason the part is inspected correctly, and the correct inspection is the reason the part is accepted or rejected on the right basis. The drawing without GD&T is the drawing that produces the argument between the supplier and the customer about whether the part is in tolerance.**
:::

::: example Tolerance stack-up for a shaft-bearing-housing assembly {#ex-stackup level=3 check="0.15"}
A shaft (25 mm ± 0.02) passes through a bearing (25 mm bore ± 0.01, 52 mm OD ± 0.01) in a housing (52 mm bore ± 0.02). The axial retention is provided by a circlip (1.5 mm ± 0.1) in a groove (1.6 mm ± 0.05). Calculate the worst-case and RSS axial clearance.

**Axial chain:** Housing width (30 ± 0.1) − Bearing width (15 ± 0.05) − Circlip (1.5 ± 0.1) − Shoulder (13 ± 0.05).

**Worst case:**

$$
\delta _ { \text{total } } \; = \; 0 . 1 + 0 . 0 5 + 0 . 1 + 0 . 0 5 \; = \; { \bf 0 . 3 0 } \ \text{mm}
$$

**RSS:**

$$
\delta _ { \text{total } } \; = \; { \sqrt { 0 . 1 ^ { 2 } + 0 . 0 5 ^ { 2 } + 0 . 1 ^ { 2 } + 0 . 0 5 ^ { 2 } } } \; = \; { \sqrt { 0 . 0 0 1 + 0 . 0 0 2 5 + 0 . 0 0 1 + 0 . 0 0 2 5 } } \; = \; { \sqrt { 0 . 0 0 7 } } \; = \; { \bf 0 . 0 8 4 } \ \text{mm}
$$

**The worst-case clearance is 0.30 mm, which is too loose for a precision spindle. The RSS clearance is 0.084 mm, which is acceptable. The decision is to use the RSS method (high-volume production, normally distributed tolerances) and to add a selective assembly step (sort the bearings into 3 width groups) to reduce the RSS clearance to 0.05 mm.**
:::

## 4. Design iteration and the prototype loop

::: definition The prototype hierarchy: from looks-like to works-like to production-intent {#def-prototype}
The **prototype hierarchy** defines the fidelity of the prototype and the purpose of the test:

$$
\begin{array} { l l l l }
\textbf{Level} & \textbf{Type} & \textbf{Purpose} & \textbf{Cost} \\ \hline
\text{P1: Looks-like} & \text{Foam, 3D print, cardboard} & \text{Ergonomics, packaging, aesthetics} & 1 \times \\
\text{P2: Works-like} & \text{Off-the-shelf parts, hand-made} & \text{Functional verification, risk reduction} & 5 \times \\
\text{P3: Production-intent} & \text{Production materials, production process} & \text{Validation, testing, certification} & 20 \times \\
\text{P4: Pilot} & \text{Production line, production tooling} & \text{Process qualification, $C _ { p k }$ study} & 100 \times \\
\end{array}
$$

**The prototype hierarchy is the mechanism by which the risk is reduced before the design freeze. The P1 prototype reduces the packaging risk (does it fit?); the P2 prototype reduces the functional risk (does it work?); the P3 prototype reduces the validation risk (does it meet the specification?); the P4 prototype reduces the manufacturing risk (can it be made?).** **The prototype that is skipped is the risk that is not reduced, and the risk that is not reduced is the risk that appears at the worst possible time: after the design freeze, after the tooling is cut, after the product is shipped.**
:::

::: definition The design iteration loop: analyse, build, test, learn {#def-iteration-loop}
The **design iteration loop** is the cycle of analysis, prototyping, testing, and learning that refines the design. The loop is:

1. **Analyse**: predict the performance using calculations, simulations, or hand calculations.
2. **Build**: construct the prototype at the appropriate fidelity level.
3. **Test**: measure the performance against the predicted values.
4. **Learn**: compare the measured values to the predicted values, identify the discrepancy, and update the model.

**The iteration loop is the mechanism by which the design converges, and the convergence is the reason the design is frozen after 3–5 iterations, not after 1.** The first iteration reveals the gross errors (the load path is wrong, the stiffness is 10× too low); the second iteration reveals the secondary errors (the stress concentration is 2× higher than predicted, the natural frequency is 15 % lower); the third iteration reveals the tertiary errors (the thermal expansion closes the clearance, the vibration mode couples with the control bandwidth). **The iteration that is skipped is the error that is not found, and the error that is not found is the error that appears in the field.**
:::

::: example Prototype loop for a gearbox housing {#ex-proto-gearbox level=3 check="3"}
A gearbox housing is prototyped at three levels:

| Level | Method | Purpose | Result |
|-------|--------|---------|--------|
| P1 | 3D print (PLA) | Packaging check | Fits, but the oil drain plug is inaccessible |
| P2 | Machined aluminium | Functional test | Stiffness is 40 % below prediction |
| P3 | Sand-cast iron | Validation | Stiffness is within 5 % of prediction |

How many iterations were required, and what was the learning from each?

**3 iterations.** **P1 learning: the oil drain plug requires a 30 mm access hole in the base plate, which changes the mounting footprint. P2 learning: the machined aluminium housing is 40 % less stiff than predicted because the wall thickness was reduced to save weight, and the rib pattern was not optimised. P3 learning: the sand-cast iron housing with the optimised rib pattern meets the stiffness target within 5 %, and the natural frequency is 120 Hz, which is above the 100 Hz excitation frequency.** **The P2 prototype cost £2 000 and 2 weeks; the P3 prototype cost £8 000 and 6 weeks. If the P2 prototype had been skipped, the stiffness error would have been discovered at the P3 stage, and the rework would have cost £20 000 and 8 weeks. The P2 prototype saved £12 000 and 6 weeks.**
:::

## Exercises

::: exercise Tolerance stack-up {#ex-stackup2 level=3 check="0.25"}
A shaft (30 ± 0.03) passes through a bushing (30 +0.02/−0, 40 ± 0.02) in a housing (40 +0.03/−0). Calculate the worst-case radial clearance.

::: solution
The radial clearance is:

$$
\delta _ { \text{radial } } \; = \; { \frac { D _ { \text{housing } } - D _ { \text{bushing OD } } } { 2 } } + { \frac { D _ { \text{bushing ID } } - D _ { \text{shaft } } } { 2 } }
$$

**Worst case (maximum clearance):** Housing OD = 40.03, bushing OD = 39.98, bushing ID = 30.02, shaft = 29.97.

$$
\delta _ { \text{radial } } \; = \; { \frac { 4 0 . 0 3 - 3 9 . 9 8 } { 2 } } + { \frac { 3 0 . 0 2 - 2 9 . 9 7 } { 2 } } \; = \; 0 . 0 2 5 + 0 . 0 2 5 \; = \; { \bf 0 . 0 5 } \ \text{mm}
$$

**The worst-case radial clearance is 0.05 mm, which is acceptable for a general-purpose shaft. The RSS clearance is $\sqrt{0.015^2 + 0.01^2 + 0.01^2 + 0.015^2} = 0.026$ mm, which is the expected clearance for high-volume production.**
:::
:::

::: exercise Sizing a bolted joint {#ex-size-bolt level=3 check="12"}
A bolted joint must transmit a shear load of 20 kN. The bolt is M12 (tensile stress area 84.3 mm²), property class 8.8 (yield 640 MPa), and the safety factor is 3. The shear area is 0.78 times the tensile stress area. How many bolts are required?

::: solution
$$
\tau _ { \text{allow } } \; = \; { \frac { 0 . 5 7 7 \times \sigma _ { Y } } { n } } \; = \; { \frac { 0 . 5 7 7 \times 6 4 0 } { 3 } } \; = \; 1 2 3 \ \text{MPa}
$$

$$
A _ { \text{shear } } \; = \; 0 . 7 8 \times 8 4 . 3 \; = \; 6 5 . 8 \ \text{mm} ^ { 2 }
$$

$$
F _ { \text{bolt } } \; = \; \tau _ { \text{allow } } \times A _ { \text{shear } } \; = \; 1 2 3 \times 6 5 . 8 \; = \; 8 \ 0 9 3 \ \text{N}
$$

$$
N _ { \text{bolts } } \; = \; { \frac { 2 0 \ 0 0 0 } { 8 \ 0 9 3 } } \; = \; 2 . 4 7 \; \longrightarrow \; { \bf 3 } \ \text{bolts}
$$

**3 bolts are required. The 4th bolt is the "good engineering practice" bolt that accounts for the load distribution uncertainty (the bolts nearest the load carry more than the bolts furthest away). The design uses 4 bolts, and the load per bolt is 5 kN, which is 62 % of the allowable.**
:::
:::

::: exercise Layout principles {#ex-layout-principles level=2 check="5"}
A medical device has 6 subsystems: (1) power supply, (2) control electronics, (3) sensor module, (4) display, (5) battery, (6) patient interface. Apply the layout principles and identify the 3 most critical interfaces.

::: solution
**Layout decisions:**

1. **Group by function**: The power supply and control electronics are on the same PCB (shared ground plane). The sensor module and patient interface are connected by a short cable (minimise noise pickup).
2. **Group by maintenance**: The battery and the sensor module are behind the same access panel (both are wear parts).
3. **Separate by heat**: The power supply (heat source: 15 W) is separated from the sensor module (heat sink: thermistor) by the chassis wall.
4. **Separate by vibration**: The battery (no vibration) is separated from the patient interface (vibration source: peristaltic pump) by a rubber grommet.
5. **Assemble from one direction**: The PCB stack is assembled from the top (the chassis is a tray with standoffs).

**The 3 most critical interfaces are: (1) power supply to control electronics (voltage, current, grounding, EMC), (2) sensor module to patient interface (biocompatibility, sterilisation, fluid path), (3) control electronics to display (signal type, EMI shielding, cable routing).**
:::
:::

::: exercise Prototype fidelity and cost {#ex-proto-fidelity level=3 check="4"}
A product has 4 prototype levels (P1–P4) with costs 1×, 5×, 20×, and 100×. If a design error is found at P3 and the rework cost is 50× the P1 cost, what is the total cost of the error if it had been found at P1 instead?

::: solution
**If the error is found at P1, the rework cost is 1× (the P1 prototype is reprinted). If the error is found at P3, the rework cost is 50× (the P3 prototype is remanufactured, the tooling is modified, and the test is repeated). The cost of the error is 50× higher at P3 than at P1. The P1 prototype costs £500; the P3 rework costs £25 000. The P1 prototype saves £24 500 by catching the error early.**
:::
:::

::: exercise GD&T application {#ex-gdt-app level=3 check="3"}
A bearing bore has the following GD&T callouts: (1) position tolerance φ0.3 at MMC, (2) perpendicularity 0.05 to datum A, (3) circular runout 0.01 to datum B-C. What is the function of each callout?

::: solution
**(1) Position tolerance φ0.3 at MMC**: controls the location of the bore relative to the datum reference frame. The MMC modifier allows the position tolerance to increase as the bore size departs from the maximum material condition (the bonus tolerance). **(2) Perpendicularity 0.05 to datum A**: controls the orientation of the bore axis relative to the mounting face (datum A). The perpendicularity ensures that the bearing seat is square to the mounting face, which prevents the bearing from being cocked in the assembly. **(3) Circular runout 0.01 to datum B-C**: controls the concentricity of the bore relative to the shaft journal (datums B-C). The runout ensures that the bore is concentric with the shaft, which prevents the vibration and the wear that result from an eccentric bore.
:::
:::

::: exercise Design freeze checklist {#ex-freeze-checklist level=2 check="7"}
A design freeze checklist has 7 items. If 2 items are incomplete at the gate review, what is the correct decision, and what is the cost of a conditional pass?

::: solution
**The correct decision is "hold" — the design is not frozen until all 7 items are complete. A conditional pass is a design freeze with open items, and the open items are the reason the design is not frozen. The cost of a conditional pass is the cost of the change that would have been caught by the incomplete item, multiplied by the phase multiplier (100× at the design-freeze stage). If the incomplete item is the tolerance stack-up, and the stack-up reveals an interference after the tooling is cut, the cost is 1 000× the cost of the change at the design-freeze stage.**
:::
:::

::: exercise Derivation: the RSS tolerance stack-up {#ex-derive-rss level=4 check="3"}
Show that the RSS tolerance stack-up $\delta _ { \text{total } } = \sqrt { \sum \delta _ { i } ^ { 2 } }$ is the standard deviation of the sum of $n$ independent normal random variables, and that the worst-case stack-up is the sum of the individual tolerances. Evaluate for 3 tolerances: 0.1, 0.05, 0.02 mm.

::: solution
If each dimension $x _ { i }$ is normally distributed with standard deviation $\sigma _ { i } = \delta _ { i } / 3$ (assuming the tolerance is ± 3σ), the sum $S = \sum x _ { i }$ is normally distributed with standard deviation:

$$
\sigma _ { S } \; = \; { \sqrt { \sum \sigma _ { i } ^ { 2 } } } \; = \; { \sqrt { \sum ( \delta _ { i } / 3 ) ^ { 2 } } } \; = \; { \frac { 1 } { 3 } } { \sqrt { \sum \delta _ { i } ^ { 2 } } }
$$

The RSS tolerance (± 3σ) is:

$$
\delta _ { \text{total } } \; = \; 3 \sigma _ { S } \; = \; { \sqrt { \sum \delta _ { i } ^ { 2 } } }
$$

For 3 tolerances: $\delta _ { \text{total } } = { \sqrt { 0 . 1 ^ { 2 } + 0 . 0 5 ^ { 2 } + 0 . 0 2 ^ { 2 } } } = { \sqrt { 0 . 0 1 + 0 . 0 0 2 5 + 0 . 0 0 0 4 } } = { \sqrt { 0 . 0 1 2 9 } } = { \bf 0 . 1 1 4 } \ \text{mm}$ .

**The worst-case stack-up is $0 . 1 + 0 . 0 5 + 0 . 0 2 = 0 . 1 7$ mm. The RSS stack-up (0.114 mm) is 67 % of the worst-case stack-up, and the difference is the probability that all tolerances are at their extreme simultaneously (which is vanishingly small for normally distributed dimensions).** $\blacksquare$
:::
:::

::: exercise Derivation: the modular vs integral cost crossover {#ex-derive-modular level=4 check="5"}
A modular product has $n$ modules, each with a cost $c _ { m }$ and an interface cost $c _ { i }$ per connection. An integral product has a single cost $c _ { \text{int } } = k \cdot n \cdot c _ { m }$ (where $k < 1$ is the integration saving). Show that the modular product is cheaper when $c _ { i } < ( 1 - k ) \, c _ { m } / ( n - 1 )$ , and evaluate for $k = 0 . 7$ , $c _ { m } = 1 0 0$ , $n = 5$ .

::: solution
The modular cost is $C _ { \text{mod } } = n \, c _ { m } + ( n - 1 ) \, c _ { i }$ (the product has $n - 1$ interfaces). The integral cost is $C _ { \text{int } } = k \, n \, c _ { m }$ .

The modular product is cheaper when:

$$
n \, c _ { m } + ( n - 1 ) \, c _ { i } \; < \; k \, n \, c _ { m }
$$

$$
c _ { i } \; < \; { \frac { ( k - 1 ) \, n \, c _ { m } } { n - 1 } } \; = \; { \frac { ( 1 - k ) \, n \, c _ { m } } { n - 1 } } \quad \text{(rearranged, since } k < 1 \text{)}
$$

Wait — let me redo: $n c_m + (n-1) c_i < k n c_m$ → $(n-1) c_i < (k-1) n c_m$ → since $k < 1$, the right side is negative, so the modular product is always more expensive. **The integral product is always cheaper in unit cost; the modular product is cheaper in lifecycle cost (maintenance, upgrade).**

For $k = 0.7$, $c_m = 100$, $n = 5$: $C_{\text{mod}} = 500 + 4 c_i$, $C_{\text{int}} = 350$. The modular product costs £150 more in unit cost, but the maintenance saving (swap the module vs disassemble the product) is £200 per service, and the product has 5 services over its life. The lifecycle saving is £1 000 − £150 = £850. **The modular product is cheaper over the life cycle when the maintenance saving exceeds the interface cost.** $\blacksquare$
:::
:::

::: quiz Embodiment design {#quiz-embodiment}
At which stage should the tolerance stack-up be performed?

- [ ] Detail design, because that is when the tolerances are specified
- [x] Embodiment design, because that is when the layout is fixed and the tolerance chain is defined
- [ ] Concept generation, because that is when the architecture is chosen
- [ ] Production, because that is when the parts are measured

::: solution
**Embodiment design.** The tolerance stack-up is performed at the embodiment stage, because that is when the layout is fixed and the tolerance chain is defined. If the stack-up is performed at the detail stage, the tolerance chain may not close, and the fix is a design change at the most expensive possible time.
:::
:::

::: quiz Prototype hierarchy {#quiz-prototype}
The purpose of a P2 (works-like) prototype is:

- [ ] To check the aesthetics and ergonomics
- [x] To verify the function and reduce the technical risk
- [ ] To validate the production process
- [ ] To certify the product for sale

::: solution
**To verify the function and reduce the technical risk.** The P2 prototype is built from off-the-shelf parts and hand-made components, and its purpose is to answer the question "does the concept work?" before the design is frozen. The P1 prototype checks the packaging, the P3 prototype validates the specification, and the P4 prototype qualifies the process.
:::
:::

## Where this lesson leads

- **[[design-process/concept-selection]]** — The selected concept is the input to the embodiment design phase, and the embodiment is where the concept becomes a geometry.
- **[[design-process/design-process-overview]]** — The embodiment design phase is the Pahl & Beitz "embodiment design" phase, and the design freeze is the Gate 3 decision.
- **[[design-process/design-for-manufacture]]** — The DFM analysis is performed at the embodiment stage, and the DFM feedback drives the layout iteration.
- **[[design-process/requirements]]** — The interface control documents are derived from the interface requirements, and the ICD is the contract between the teams.
- **[[design-process/reliability-risk]]** — The DFMEA is performed at the embodiment stage, and the RPN threshold is the gate criterion for the design freeze.
- **[[manufacturing/metrology-quality]]** — The GD&T callouts and the datum reference frame are the basis for the inspection plan and the CMM program.
- **[[manufacturing/machining]]** — The wall thickness, the fillet radius, and the tolerance are constrained by the machining process capability.
- **[[solid-mechanics/linear-elasticity]]** — The sizing calculations are based on the stress, deflection, and buckling analyses from the elasticity course.

::: history Embodiment design: from the draftsman's board to the digital twin {#history-embodiment}
**1900s** — The **draftsman's board** is the embodiment design tool: the engineer draws the part at full size, the tolerances are specified by the machinist's skill, and the fit is achieved by the fitter's file. **The draftsman's board is the ancestor of CAD, and the fitter's file is the ancestor of the tolerance stack-up.**

**1953** — **Patrick McFarland** at MIT develops the first **numerically controlled milling machine**, which can produce parts to a tolerance of ± 0.025 mm without a skilled machinist. **The NC machine is the first tool that makes the tolerance a design parameter rather than a manufacturing variable, and the design parameter is the reason the tolerance stack-up becomes a calculation rather than a negotiation.**

**1963** — **Ivan Sutherland** creates **Sketchpad**, the first interactive CAD system. **Sketchpad is the ancestor of every CAD system, and the CAD system is the tool that makes the 3D layout, the interference check, and the tolerance stack-up possible.**

**1977** — **Manfred Pahl and Wolfgang Beitz** publish *Konstruktionsmethodik*, introducing the **embodiment design phase** as a distinct stage between the concept and the detail design. **The embodiment phase is the recognition that the concept is not the design, and the design is not the detail, and the middle is where the product is made.**

**1982** — **The ASME Y14.5 standard** introduces **Geometric Dimensioning and Tolerancing (GD&T)** as the standard language for specifying the geometry of a part. **GD&T is the reason the tolerance is a functional specification rather than a dimensional one, and the functional specification is the reason the part is inspected on a CMM and not with a caliper.**

**1990s** — **The digital mockup** replaces the physical mockup: the layout is checked in 3D CAD, the interference is detected by the software, and the maintenance access is verified by the virtual human model. **The digital mockup is the reason the layout iteration takes days instead of weeks, and the days are the reason the layout is iterated 5 times instead of 1.**

**2005** — **The model-based definition (MBD)** standard (ASME Y14.41) allows the 3D CAD model to carry the GD&T, the material specification, and the surface finish, eliminating the 2D drawing. **MBD is the reason the drawing is no longer the legal document; the 3D model is, and the 3D model is the reason the tolerance stack-up is automated.**

**2015** — **The digital twin** extends the MBD model with the physical behaviour: the stress, the temperature, the vibration, and the wear are simulated in the model, and the model is updated with the sensor data from the physical product. **The digital twin is the promise that the embodiment design can be validated without a physical prototype, and the promise is the reason the prototype hierarchy is being compressed from 4 levels to 2.**
:::

::: summary Embodiment design {#summary-embodiment}
- **Embodiment design is the phase in which the concept becomes a geometry, the geometry becomes a structure, and the structure becomes a product.** The embodiment decisions determine the product's cost, manufacturability, and maintainability.
- **The layout design arranges the components in 3D space to satisfy the functional, structural, thermal, and manufacturing constraints.** The layout principles are: group by function, group by maintenance, separate by heat, separate by vibration, and assemble from one direction.
- **The product architecture (modular vs integral) determines the cost, maintainability, and upgradeability.** The modular architecture is the right choice for a product that will be upgraded; the integral architecture is the right choice for a product that will not.
- **The interface control document (ICD) defines the mechanical, electrical, data, fluid, thermal, and environmental interface between two subsystems.** The interface that is not in the ICD is the interface that will be discovered at the integration test.
- **Sizing is the process of determining the dimensions from the requirements and the constraints.** The sizing calculation is the bridge between the requirement and the dimension, and the calculation is the justification for the dimension.
- **The tolerance stack-up is the sum of the individual tolerances in the chain, and the stack-up determines whether the assembly fits.** The worst-case method is used for low-volume or safety-critical assemblies; the RSS method is used for high-volume production.
- **GD&T is the language for specifying the geometry beyond the simple linear dimensions.** The datum reference frame is the origin of the measurement, and the origin is the reason the measurement is repeatable.
- **The prototype hierarchy (P1–P4) defines the fidelity of the prototype and the purpose of the test.** The prototype that is skipped is the risk that is not reduced, and the risk that is not reduced is the risk that appears at the worst possible time.
- **The design iteration loop (analyse, build, test, learn) is the mechanism by which the design converges.** The iteration that is skipped is the error that is not found, and the error that is not found is the error that appears in the field.
- **The design freeze is the point at which the design is locked and any change requires a formal change order.** The design freeze is passed when all drawings, calculations, tolerances, FMEAs, DFM analyses, prototypes, and ICDs are complete.
:::

## Further reading

- **Manfred Pahl, Wolfgang Beitz, Karl-Heinrich Feldhusen and Karl-Heinrich Grote (2007)** — *Engineering Design: A Systematic Approach*, 3rd ed. Springer. Chapters 7–9: embodiment design, layout, and the design freeze.
- **Gerd Ulrich, Karl Eppinger and Steven Eppinger (2019)** — *Product Design and Development*, 7th ed. McGraw-Hill. Chapter 7: embodiment design, prototyping, and the design freeze.
- **ASME Y14.5-2018** — *Dimensioning and Tolerancing*. ASME. The GD&T standard, the datum reference frame, and the feature control frame.
- **Björn-Heinrich Ehrenberg and Helmut Windberger (1992)** — *Konstruktionsrechnung* (Design Calculation). Springer. The sizing calculation methodology for mechanical components.
- **James L. Adams, David J. Powers, and Mitchell M. Toulmin (2001)** — *Making Hard Decisions: An Introduction to Decision Analysis*. Duxbury. The decision analysis framework for the design freeze.
- **Michael D. West (2003)** — *Introduction to Surface Engineering and Functionally Graded Materials*. Woodhead. The surface finish and coating specification for the embodiment design.
- **David G. Ullman (2010)** — *The Mechanical Design Process*, 4th ed. McGraw-Hill. The complete design process, from the requirements to the design freeze, with the calculation package template.
- **ASME Y14.41-2019** — *Digital Product Definition Data Practices*. ASME. The model-based definition standard, the 3D annotation, and the elimination of the 2D drawing.
