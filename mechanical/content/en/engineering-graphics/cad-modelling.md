A CAD model is **not the part**. It is a mathematical description from which a part may be made, and the difference between the two is much of the subject of this lesson: the model is **exact** and the part is **toleranced**; the model is **nominal**, and no real part is exactly nominal; the model **fits** because it was built to fit, and the assembly may not, because it is built from real parts.

Many problems in digital product definition come from treating the model as the part — checking "no interference" at nominal and calling the assembly proven, releasing a drawing printed from the model without tolerances, or sending a neutral file whose surfaces did not join up after translation, so that the supplier's system rebuilt a slightly different solid.

::: warning Seven CAD errors that survive every review
**An under-constrained sketch.** A sketch with free degrees of freedom looks right on the screen and moves unpredictably when an unrelated dimension changes. **Fully constrain production sketches**, and anchor them to the origin or to named reference geometry. **A model that cannot be rebuilt.** A history tree that only its author understands, a fillet that works only in the order it happened to be applied, a pattern whose seed was deleted and re-created — each makes the model hard to change. **A nominal assembly declared to fit.** An interference check at nominal says nothing about the parts that will actually be made, whose sizes are spread over their tolerances. **A tolerance assumed to be in the model.** A CAD dimension is a nominal value; unless the tolerance is on the drawing or in the model's annotation (PMI), the part has no specified tolerance. **A tessellated file used as a definition.** An STL is a set of flat triangles approximating the surfaces; a $50\ \mathrm{mm}$-radius cylinder at a $0.01\ \mathrm{mm}$ chordal deviation is a $158$-sided prism, and a CMM or a tool path working from it inherits the facets. **A change made downstream.** Editing the assembly instead of the part, the drawing instead of the model, or the neutral file instead of the native creates a **second source of truth**. **A model with no product memory.** No revision, release state, change record or approval — a model that cannot answer "what was the definition when this batch was made?" cannot support an investigation or a warranty claim.
:::

## The parametric model

::: definition Constraints, degrees of freedom and design intent {#def-constrain}
**The degrees of freedom of 2D sketch entities.**
$$
\begin{array}{l c l c}
\text{Entity} & \text{DOF} & \text{Entity} & \text{DOF} \\
\text{Point} & 2 & \text{Line segment} & 4 \\
\text{Circle} & 3 & \text{Arc} & 5 \\
\text{Ellipse} & 5 & \text{Spline} & 2\ \text{per defining point}
\end{array}
$$
**What constraints remove.** A **coincident** constraint between two points removes $2$; **horizontal** or **vertical** removes $1$; **parallel**, **perpendicular**, **tangent** and **equal** remove $1$ each; **concentric** removes $2$; a **dimension** removes $1$.
**The evaluation.** A rectangle drawn as four separate line segments:
$$
4 \times 4 = 16\ \text{DOF}, \qquad
4\ \text{coincident} \times 2 = -8, \qquad
2\ \text{horizontal} + 2\ \text{vertical} = -4, \qquad
\text{remaining} = 4 ,
$$
and the four that remain are the **width**, the **height** and the $x$, $y$ **position**: two dimensions size it and two more constraints (a corner on the origin, or two locating dimensions) fix it. The rectangle tool simply applies the coincident and horizontal/vertical constraints for you.
**Three rules.** **A production sketch is fully constrained** — the CAD system's status display (typically a colour change or a "fully defined" flag) is there to be read. **Constraints encode intent; dimensions encode size**: a hole that must stay on a boss is made **concentric** with it rather than located by two dimensions that happen to put it there. **Anchor to stable references** — the origin, the default planes or named construction geometry — so that mirroring, patterning or editing does not move the sketch.
**Over-constraint.** A sketch with a redundant or conflicting constraint is **over-constrained**; the solver reports it, and the fix is to remove the redundant constraint rather than to make it "driven".
:::

::: definition The model tree and design intent {#def-tree}
**Design intent is the answer to "what should happen when this dimension changes?"**
$$
\begin{array}{l l l}
\text{Intent} & \text{How to build it} & \text{What breaks if you do not} \\
\text{This wall stays } 3\ \text{thick} & \text{a shell or an offset from the outer face} & \text{the wall changes when the outside grows} \\
\text{This hole stays centred on the boss} & \text{a concentric constraint, not two dimensions} & \text{the hole drifts when the boss moves} \\
\text{These holes stay symmetric about the centre} & \text{a symmetry constraint and one dimension} & \text{the pattern goes to one side} \\
\text{This rib always meets the wall} & \text{an "up to surface" end condition} & \text{a gap or an overlap when the wall moves} \\
\text{This flange always has } n\ \text{equally spaced bolts} & \text{a circular pattern with a driven count} & \text{the bolts stop being equally spaced} \\
\text{One design, several sizes} & \text{configurations driven by a table} & \text{several models that drift apart}
\end{array}
$$
**The rebuild test.** Change a driving dimension by a realistic amount — say $10$ to $20\ \%$ — and check that every hole moves as intended, every wall keeps its thickness and every fillet survives. A model that passes the test captures the intent; one that fails it records only one geometry.
**Tree rules.** **Sketch functional profiles** rather than building shapes from many small features. **Feature order matters**: fillets that the shell should follow (so that the inside corners are offset from the outside ones) go **before** the shell; small cosmetic edge rounds and chamfers go **near the end** of the tree, where they do not become references for other features. **Name important features**, because "Fillet47" cannot be found in a long tree.
:::

::: definition Model-based definition {#def-mbd}
**Model-based definition** (MBD) places the **product and manufacturing information** (PMI) — dimensions, tolerances, datums, surface texture, notes, material — **on the 3D model**, which then becomes the authoritative definition instead of, or alongside, a drawing.
$$
\begin{array}{l l l}
\text{Standard} & \text{Covers} & \text{Role} \\
\text{ASME Y14.41} & \text{digital product definition data practices} & \text{PMI practice (first edition 2003)} \\
\text{ISO 16792} & \text{digital product definition data practices} & \text{the ISO counterpart (first edition 2006)} \\
\text{ISO 10303-242 (STEP AP242)} & \text{neutral exchange of 3D models with PMI} & \text{the exchange format} \\
\text{ISO 14306 (JT)} & \text{lightweight 3D visualisation format, with PMI} & \text{viewing and collaboration} \\
\text{ASME Y14.35} & \text{revision of engineering drawings and associated documents} & \text{the revision layer}
\end{array}
$$
**What MBD genuinely improves.** **Associativity**: a PMI annotation is attached to the geometry it controls and cannot silently be left behind by a change. **Interpretation**: a 3D model that can be rotated, sectioned and measured answers questions such as "which face is datum $C$?" more directly than a set of views. **Downstream reuse**: CAM, CMM programming and inspection planning can read the PMI directly.
**Where it struggles.** **Suppliers without suitable software** — answered by viewable formats such as JT or 3D PDF. **Shops that work from paper** — answered by a drawing **generated from** the model, with the model as the authority. **Customers or regulators who require a signed drawing** — answered by agreeing in the contract that the released, approved model revision is the authority.
:::

::: definition Exchange formats and the tessellation trap {#def-formats}
$$
\begin{array}{l l l l}
\text{Format} & \text{Contains} & \text{Loses} & \text{Use} \\
\text{Native} & \text{everything, including the feature history} & \text{nothing (in the same system)} & \text{the authority} \\
\text{STEP AP242} & \text{exact B-rep solids, assemblies, PMI} & \text{the feature history} & \text{neutral exchange} \\
\text{JT} & \text{tessellation, optionally exact B-rep, PMI} & \text{the feature history} & \text{visualisation, collaboration} \\
\text{IGES} & \text{surfaces and curves (solids optional)} & \text{often topology and solidity} & \text{legacy surface exchange} \\
\text{3MF} & \text{mesh, colour, materials, build data} & \text{exact geometry} & \text{additive manufacturing} \\
\text{STL} & \text{triangles only} & \text{everything else} & \text{additive manufacturing, quick viewing}
\end{array}
$$
**The chordal deviation.** A circle of radius $R$ approximated by $n$ equal chords has a maximum gap between chord and arc of
$$
\delta = R \left( 1 - \cos \frac{\pi}{n} \right) \quad \Rightarrow \quad n = \left\lceil \frac{\pi}{\arccos \left( 1 - \delta / R \right)} \right\rceil .
$$
$$
\begin{array}{c c c c}
R\ (\mathrm{mm}) & \delta\ (\mathrm{mm}) & n & \text{Facet edge length}\ (\mathrm{mm}) \\
50 & 0.01 & 158 & 1.99 \\
50 & 0.001 & 497 & 0.63 \\
5 & 0.01 & 50 & 0.63 \\
1 & 0.005 & 32 & 0.20 \\
200 & 0.025 & 199 & 6.31
\end{array}
$$
**Two consequences.** **A CMM comparison against an STL** includes the faceting in the measured "form error": at $R 50$ and $\delta = 0.01$, the reference itself is out of round by up to $0.01\ \mathrm{mm}$, which matters against a roundness tolerance of a few hundredths. **A tool path or a mould cut from an STL** reproduces the facets, which on a polished or optical surface can be visible.
**The file sizes.** A binary STL uses $50$ bytes per triangle, so $200{,}000$ triangles make about $10\ \mathrm{MB}$; the same cylinder as an exact STEP solid — a cylindrical surface, two planes and their edges — takes a few kilobytes. The difference is that between a **definition** and an approximation of one.
:::

::: widget plot
f: 50000*(1-cos(pi/x))
x: 16, 400
y: 0, 100
labels: chordal deviation (micrometres)
caption: The chordal deviation, in micrometres, of a $50\ \mathrm{mm}$-radius circle approximated by $x$ flat facets. At $64$ facets it is about $60\ \mu\mathrm{m}$ — invisible on a screen, but larger than many machining tolerances; at $158$ it is $10\ \mu\mathrm{m}$ and at $497$ it is $1\ \mu\mathrm{m}$. Because $\delta \approx R \pi^{2} / (2 n^{2})$, halving the deviation needs $\sqrt{2} = 1.41$ times as many facets along each direction — $1.41$ times for a curve and about $2$ times for a surface refined in both directions.
:::

## The model and the real part

::: definition Why the model always fits and the assembly may not {#def-nominal}
**The model is nominal.** Every face is at its nominal position and every hole at its nominal size, so the CAD assembly shows exactly the nominal gaps. Real parts are spread over their tolerances, and the nominal assembly is just one point — usually near the middle — of that spread.
**Putting reality into the analysis.**
$$
\begin{array}{l l l}
\text{Method} & \text{How} & \text{Answers} \\
\text{Worst case} & \text{every contributor at its adverse limit} & \text{can it ever fail?} \\
\text{RSS (statistical)} & \text{root-sum-square of the contributors' standard deviations} & \text{roughly what fraction fails?} \\
\text{Monte Carlo} & \text{sample every contributor from its distribution, many times} & \text{what fraction fails, for any model and distribution?} \\
\text{3D tolerance-analysis software} & \text{Monte Carlo on the CAD geometry with its GD\&T} & \text{which contributors matter most?}
\end{array}
$$
**The rule.** Any clearance comparable to the spread of its tolerance stack is a **tolerance-analysis** question, not a CAD question; an interference check at nominal is not that analysis.
**The number.** A cover with a nominal $0.5\ \mathrm{mm}$ gap, on a stack whose standard deviation is $0.3\ \mathrm{mm}$ ($\pm 0.9$ at $3\sigma$), interferes in $\Phi(-0.5/0.3) = 4.8\ \%$ of assemblies — while the CAD model shows a clean $0.5\ \mathrm{mm}$ gap and reports no interference.
:::

::: definition Mass properties and what they miss {#def-mass}
A CAD model computes mass as density times nominal volume:
$$
m_{\mathrm{model}} = \rho_{\text{nominal}} V_{\text{nominal}}, \qquad
m_{\mathrm{part}} = \rho_{\text{actual}} V_{\text{actual}} .
$$
Common reasons the two differ:
$$
\begin{array}{l l}
\text{Error source} & \text{Usual direction} \\
\text{Fillets, draft and casting radii simplified or omitted} & \text{either} \\
\text{Threads modelled as plain cylinders (cosmetic threads)} & \text{model heavy for tapped holes} \\
\text{Size deviations within tolerance (e.g. castings at the heavy end)} & \text{either} \\
\text{Density of the actual alloy or casting, porosity} & \text{either} \\
\text{Coatings, paint, plating, adhesives} & \text{model light} \\
\text{Fasteners, seals, cables, fluids not modelled} & \text{model light}
\end{array}
$$
**The practice.** Model the purchased parts and fasteners, carry a **margin** in the mass budget for early models, and **weigh first articles** to correct the densities and the budget.
**Inertia is more sensitive than mass**, because each element contributes $m r^{2}$. A $2\ \mathrm{kg}$ item omitted at $400\ \mathrm{mm}$ from the axis is missing $2 \times 0.4^{2} = 0.32\ \mathrm{kg \cdot m^{2}}$ — $2.7\ \%$ of a $12\ \mathrm{kg \cdot m^{2}}$ inertia — however small a fraction of the total mass it is.
:::

::: definition Data management {#def-pdm}
$$
\begin{array}{l l l}
\text{PDM} & \text{product data management} & \text{files, revisions, check-in and check-out, a controlled vault} \\
\text{PLM} & \text{product lifecycle management} & \text{PDM plus items, change processes, BOMs, requirements, suppliers} \\
\text{BOM} & \text{bill of materials} & \text{engineering, manufacturing and service BOMs differ in structure and purpose}
\end{array}
$$
**What a vault does that a shared folder cannot.** **Check-out**, so that two people do not edit the same part. **Revisions**, so that a part keeps its identity while its definition changes. **Release states**, so that manufacturing uses a released revision, not work in progress. **Effectivity**, so that a change applies "from serial 214" and a service engineer can find what was fitted to serial 118.
**Revision or new part number?** The widely used rule (ASME Y14.35 and most company procedures) is **interchangeability**: a change that keeps the part interchangeable in **form, fit and function** with earlier revisions gets a new **revision** of the same part number; a change that makes it **non-interchangeable** — old and new parts cannot be mixed in service — requires a **new part number**. A drawing correction that does not change the part is still a revision, with a note saying so.
**The rule of ten.** A widely quoted heuristic says that the cost of correcting a design error rises by roughly an order of magnitude at each stage it survives:
$$
\begin{array}{l c}
\text{Requirement or concept} & 1 \times \\
\text{Detail design} & 10 \times \\
\text{After tooling is made} & 100 \times\ \text{to}\ 1{,}000 \times \\
\text{In the field} & 1{,}000 \times\ \text{and more}
\end{array}
$$
The exact factors vary widely between industries and products; the steepness of the curve is the point, and it is why design reviews are cheap and tooling changes are not.
:::

::: example A sketch that was not constrained {#ex-sketch}
A bracket profile — a rectangle $60 \times 40$ with one corner rounded at $R 12$ — is sketched with four lines and one tangent arc. The two sides are dimensioned $60$ and $40$, the lines are horizontal and vertical, and the arc is tangent to its two lines, but the radius is not dimensioned and the sketch is not tied to the origin. Count the remaining degrees of freedom and describe what happens when the $60$ is changed to $70$.
::: solution
**The count.**
$$
\begin{array}{l c}
4\ \text{lines} \times 4 + 1\ \text{arc} \times 5 & 21 \\
5\ \text{junctions (coincident)} \times 2 & -10 \\
2\ \text{horizontal} + 2\ \text{vertical} & -4 \\
2\ \text{tangencies} & -2 \\
2\ \text{dimensions } (60, 40) & -2 \\
\hline
\text{Remaining} & 3
\end{array}
$$
The three free DOF are the sketch's $x$ and $y$ position and the fillet **radius**.
**What happens.** When the $60$ becomes $70$, the solver must decide which end of the side to move and whether to change the free radius; it chooses by its own minimum-change rule, not by the designer's intent. The profile may grow to the left instead of the right, moving every feature that references its left edge, and the fillet radius may change. Downstream features that referenced the moved edges can then fail.
**The prevention.**
1. **Fully constrain the sketch**: dimension the radius ($R 12$) and fix one corner to the origin (or dimension it from reference planes).
2. **Constrain the intent**: if the profile should grow symmetrically, constrain it symmetric about a centre plane.
3. **Rebuild-test** by changing the driving dimensions before release.
4. **Reference stable geometry** (planes, axes, named sketches) rather than edges of features that may change.

*Sanity.* An under-constrained sketch looks exactly right on the screen until something changes, so the failure is invisible at release and appears at the first change — which is why the DOF status is treated as a release check.
:::
:::

::: example Tessellating a blade {#ex-tess}
A blade has a leading edge of $40\ \mathrm{mm}$ radius (a large industrial fan blade) and a trailing edge of $0.08\ \mathrm{mm}$ radius. It is exported as an STL for (a) a visual check at $\delta = 0.05\ \mathrm{mm}$, (b) a 3D-printed pattern at $0.02\ \mathrm{mm}$ and (c) a CMM reference at $0.001\ \mathrm{mm}$. Give the facet counts around the leading edge, compare the overall file sizes, and comment on the trailing edge.
::: solution
**The leading edge.** With $n = \lceil \pi / \arccos(1 - \delta / R) \rceil$ facets per full circle of radius $40$:
$$
\begin{array}{l c c c}
\text{Case} & \delta\ (\mathrm{mm}) & n\ (\text{per full circle}) & \text{Facet edge}\ (\mathrm{mm}) \\
\text{(a) visual} & 0.05 & 63 & 3.99 \\
\text{(b) printed pattern} & 0.02 & 100 & 2.51 \\
\text{(c) CMM reference} & 0.001 & 445 & 0.56
\end{array}
$$
**The file sizes.** On a surface the facet count grows about as $1/\delta$ (as $\delta^{-1/2}$ in each of two directions), so (b) has about $2.5$ times and (c) about $50$ times as many triangles as (a); a file of $1\ \mathrm{MB}$ for (a) becomes roughly $50\ \mathrm{MB}$ for (c).
**The trailing edge.** At $\delta = 0.001$ on $R = 0.08$:
$$
n = \left\lceil \frac{\pi}{\arccos(1 - 0.001/0.08)} \right\rceil = \lceil 19.8 \rceil = 20\ \text{facets per full circle},
$$
on a circumference of $2\pi \times 0.08 = 0.50\ \mathrm{mm}$, i.e. facets about $25\ \mu\mathrm{m}$ long. The tightest radius, not the largest surface, sets the triangle count of a tight-deviation export, which is why a high-resolution export of a part with small fillets is so large.
**The professional answer.** Use **exact geometry** (native or STEP AP242) as the CMM reference; then the reference adds no faceting error. Use STL for printing and viewing.
**The exception.** A **scanned** part has no exact surfaces, so comparison is mesh to mesh, and the tolerance being checked must be well above the mesh's own deviation and the scanner's uncertainty.

*Sanity.* From (a) to (c) the deviation falls by $50$ and the facets per direction rise by $\sqrt{50} = 7.1$ ($63 \to 445$), as $\delta \propto n^{-2}$ predicts.
:::
:::

::: example A Monte Carlo of a cover gap {#ex-mc}
A cover sits in a pocket with a nominal gap of $0.5\ \mathrm{mm}$ on each side. The pocket width is $100.0 \pm 0.3$ and the cover width $99.0 \pm 0.2$; the pocket's centre is located from the common datum to $\pm 0.15$, and the cover's centre (through its locating tab) to $\pm 0.15$. Treat all four as uniformly distributed. Find the probability that the cover interferes on one side, and the size of the step between the two gaps.
::: solution
**The gap on one side.** With $\Delta P$, $\Delta C$ the size deviations and $e_P$, $e_C$ the centre deviations,
$$
g_L = 0.5 + \frac{\Delta P - \Delta C}{2} + (e_C - e_P), \qquad g_R = 0.5 + \frac{\Delta P - \Delta C}{2} - (e_C - e_P) .
$$
**Its standard deviation.** A uniform deviation over $\pm a$ has $\sigma = a/\sqrt{3}$, and the size deviations enter at half weight:
$$
\sigma_g = \sqrt{ \left( \frac{0.15}{\sqrt{3}} \right)^{2} + \left( \frac{0.10}{\sqrt{3}} \right)^{2} + \left( \frac{0.15}{\sqrt{3}} \right)^{2} + \left( \frac{0.15}{\sqrt{3}} \right)^{2} } = \sqrt{0.02583} = 0.161\ \mathrm{mm} .
$$
**Worst case.** $g_{L,\min} = 0.5 - 0.15 - 0.10 - 0.15 - 0.15 = -0.05\ \mathrm{mm}$: interference is **possible**.
**Probability.** A normal approximation gives $P(g_L < 0) = \Phi(-0.5/0.161) = \Phi(-3.11) = 9.3 \times 10^{-4}$. A Monte Carlo simulation with uniform contributors gives only about $5 \times 10^{-5}$ per side and $1.0 \times 10^{-4}$ for either side: the sum of four uniform variables has much thinner tails than a normal distribution, and it cannot go below the worst case at all. The normal approximation is **conservative** here.
**The step.** The two gaps differ by $g_L - g_R = 2(e_C - e_P)$, which ranges up to $\pm 0.6\ \mathrm{mm}$; $99.865\ \%$ of assemblies have a step below $0.58\ \mathrm{mm}$. On a styled product that visible asymmetry may be the real failure.
**What to tighten.** The variance shares are pocket size $29\ \%$, cover size $13\ \%$, pocket location $29\ \%$ and cover location $29\ \%$. The location terms together dominate the step, so the effective fix is to **locate the cover directly in the pocket** (a spigot or locating ribs), which removes both location terms from the loop.

*Sanity.* The sum $g_L + g_R = 1.0 + (\Delta P - \Delta C)$ does not depend on location at all: a translation of the cover closes one gap and opens the other by the same amount. Whether the cover fits at all is a size question; whether it looks centred is a location question.
:::
:::

::: example A model that could not be changed {#ex-tree}
A large sheet-metal-and-plastic enclosure model rebuilds slowly and fails whenever its width is changed. Diagnose and fix.
::: solution
**The diagnosis, as it is usually found.**
$$
\begin{array}{l l l}
\text{Symptom} & \text{Likely cause} & \text{Fix} \\
\text{Slow rebuild} & \text{heavy splines, many patterned cosmetic features} & \text{simplify curves; suppress or separate cosmetic detail} \\
\text{Fillet fails} & \text{a fillet referencing an edge that the width change removes or splits} & \text{fillet functional edges early, cosmetic rounds last; reference faces, not edges} \\
\text{Pattern fails} & \text{the seed feature was deleted and re-created} & \text{edit the seed instead of replacing it} \\
\text{Width change breaks sketches} & \text{sketches dimensioned to edges of features that move} & \text{dimension to the origin, planes or a master sketch} \\
\text{Hole missing} & \text{an "up to next" end condition that now meets a different face} & \text{use a blind depth or an explicit "up to surface"}
\end{array}
$$
**Structural fixes.**
1. **A master (skeleton) sketch or layout** carrying the main dimensions — width, height, interface positions — from which every feature takes its references.
2. **Separate bodies** for the functional geometry and for cosmetic detail (texture, lettering, decorative ribs), so that the cosmetic detail can be suppressed for analysis and drawings.
3. **A rebuild test in the release checklist**: change the width and height by realistic amounts and check that the model rebuilds without errors.

*Sanity.* Separating cosmetic detail is as much about ownership as speed: the styling and engineering groups can each change their own geometry without breaking the other's.
:::
:::

::: example Model-based definition on a machined part {#ex-mbd}
Give the model-based definition for the hydraulic pump housing of [[engineering-graphics/geometric-tolerancing]] (gasket face, $\varnothing 60\ \mathrm{f}7$ pilot, $\varnothing 80\ \mathrm{H}7$ seal bore, four $M 8$ tapped holes), and state what a drawing generated from it would still be used for.
::: solution
**What goes on the model.**
$$
\begin{array}{l l}
\text{Geometry} & \text{the released solid at nominal, with the PMI organised in saved views} \\
\text{Datums} & A\ (\text{gasket face}),\ B\ (\varnothing 60\ \text{pilot, at MMB}),\ C\ (\text{clocking feature}) \\
\text{Geometric tolerances} & \text{the feature control frames, attached to the features they control} \\
\text{Size tolerances} & \varnothing 80\ \mathrm{H}7,\ \varnothing 60\ \mathrm{f}7,\ 4 \times M 8 - 6\mathrm{H}\ \text{with thread and drill depths} \\
\text{Surface texture} & \text{e.g. } Ra\ 0.8\ \text{on the seal bore},\ 1.6\ \text{on the pilot},\ 3.2\ \text{on the gasket face} \\
\text{Notes} & \text{general tolerances, machining notes, pressure test} \\
\text{Attributes} & \text{material, finish, part number, revision, release state and approval (in the PDM/PLM record)}
\end{array}
$$
**What the model must carry for MBD to work.** **Saved views** in which the PMI is meant to be read, because an annotation on a hidden face is invisible otherwise. **Semantic PMI** — tolerances linked to the faces they control, not just graphic text — so that CMM and CAM software can use them. **Release information** as controlled PLM attributes rather than as text on the geometry.
**What a drawing generated from it is still used for.**
$$
\begin{array}{l l}
\text{Shop-floor use} & \text{where operators work from paper or simple viewers} \\
\text{Incoming inspection} & \text{where the customer's or supplier's process expects a drawing} \\
\text{Contracts and approvals} & \text{where a signed drawing is required} \\
\text{Archiving} & \text{a human-readable record independent of CAD software versions}
\end{array}
$$
**The conclusion.** Where the drawing is still needed it should be **generated from** the annotated model and never maintained in parallel, because two sources of truth will eventually disagree.

*Sanity.* MBD's limits are organisational more than technical: it needs suppliers, inspectors and contracts that accept the model as the authority.
:::
:::

::: history
**Ivan Sutherland**'s **Sketchpad**, described in his **1963** MIT doctoral thesis, showed interactive drawing on a screen with a light pen, including geometric constraints — the conceptual ancestor of parametric sketching. In the same years industry developed computer-aided manufacturing: **Patrick Hanratty**'s **PRONTO** (**1957**) was an early commercial numerical-control programming system. Free-form surfaces for car bodies were developed at **Renault** by **Pierre Bézier** (the **UNISURF** system, late **1960s**) and at **Citroën** by **Paul de Casteljau**. **Dassault Aviation** developed its own 3D system from the late **1970s**, which became **CATIA** (marketed from **1981**). Solid modelling grew out of research systems of the 1970s such as **BUILD** at Cambridge and **PADL** at the University of Rochester. **Parametric Technology Corporation**, founded in **1985** by **Samuel Geisberg**, introduced **Pro/ENGINEER** (shown in **1987**, shipped in **1988**), which made history-based, constraint-driven parametric solid modelling mainstream. **Jon Hirschtick** founded **SolidWorks** in **1993**, bringing parametric solid modelling to Windows PCs. The **STEP** standard (ISO 10303) was begun in **1984**, published its first parts in **1994**, and its **AP242** (**2014**) added semantic PMI. Model-based definition was standardised in **ASME Y14.41** (**2003**) and **ISO 16792** (**2006**). The **Boeing 777**, which first flew in **1994**, was the first jetliner designed entirely in 3D on CATIA, with digital pre-assembly replacing the full-scale physical mock-up.
:::

## Where this leads

The model is the source of the geometry that [[engineering-graphics/orthographic-projection]] projects and that [[engineering-graphics/sections-auxiliary-views]] cuts; its dimensions come from [[engineering-graphics/dimensioning]], its tolerances from [[engineering-graphics/tolerances-fits]] and [[engineering-graphics/geometric-tolerancing]], and its assembly is the subject of [[engineering-graphics/assemblies-drawings]].

::: summary
- The model is exact and nominal; the part is toleranced, and an interference check at nominal is not a tolerance analysis.
- A production sketch is fully constrained; an under-constrained sketch is invisible at release and fails at the first change.
- Design intent is what happens when a driving dimension changes, and the rebuild test checks it.
- An STL approximates surfaces by facets: $\delta \approx R\pi^{2}/(2n^{2})$, so halving the deviation needs $1.41$ times the facets per direction (about $2$ times on a surface).
- CAD mass properties miss coatings, fasteners and fluids; inertia, scaling with $mr^{2}$, is more sensitive than mass.
- Non-interchangeable changes need a new part number; interchangeable ones a new revision.
- MBD moves the authority to the annotated model; any drawing still needed should be generated from it.
:::

::: quiz
A surface is exported as an STL. Halving the chordal deviation multiplies the number of facets by about:
- [ ] 4 on a curve and 16 on a surface
- [x] 1.41 along a curve and 2 on a surface
- [ ] 8
- [ ] It barely changes
::: solution
The deviation goes as $\delta \propto n^{-2}$ **per direction**, so halving it needs $\sqrt{2} \approx 1.41$ times the facets along each direction. A curve is refined in one direction ($1.41\times$); a surface is refined in two at once, so the facet count roughly doubles.
:::
:::

## Exercises

::: exercise DOF {level=1 check="3"}
How many degrees of freedom does a circle have in a 2D sketch? (Enter a number.)
::: solution
Three — two for the centre and one for the radius.
:::
:::

::: exercise STL size {level=1 check="50"}
How many bytes does a binary STL file use per triangle? (Enter a number of bytes.)
::: solution
$50$: a normal vector and three vertices ($12$ single-precision numbers, $48$ bytes) plus a $2$-byte attribute field. (The file also has an $80$-byte header and a $4$-byte triangle count.)
:::
:::

::: exercise Tessellation {level=1 check="158"}
How many facets are needed around a $50\ \mathrm{mm}$-radius circle to keep the chordal deviation within $0.01\ \mathrm{mm}$? (Enter a whole number of facets.)
::: solution
$n = \pi / \arccos(1 - 0.01/50) = 157.08$, so $158$ facets (with $157$ the deviation would be just over $0.01$).
:::
:::

::: exercise Mass {level=1 check="2.7"}
A $2\ \mathrm{kg}$ item omitted from a model sits $400\ \mathrm{mm}$ from the axis. Give the error it causes in a $12\ \mathrm{kg \cdot m^{2}}$ moment of inertia. (Enter the percentage.)
::: solution
$m r^{2} = 2 \times 0.4^{2} = 0.32\ \mathrm{kg \cdot m^{2}}$, which is $0.32/12 = 2.7\ \%$.
:::
:::

::: exercise Change cost {level=1 check="10"}
According to the rule of ten, by roughly what factor does the cost of correcting a design error rise for each stage it survives? (Enter the factor.)
::: solution
About $10$ — an order of magnitude per stage, as a heuristic rather than a law.
:::
:::

::: exercise Sketch DOF {level=2 check="3"}
A triangle is sketched as three line segments joined by three coincident constraints, with no dimensions. How many dimensions are needed to fix its shape and size, if its position and orientation are left free? (Enter a number.)
::: solution
$$
3 \times 4 = 12\ \mathrm{DOF}, \qquad 3 \times 2 = -6\ \text{(coincident)}, \qquad 6\ \text{remain}.
$$
Three are rigid-body motions ($x$, $y$, rotation) and three are the shape and size, so **three dimensions** (for example the three side lengths) fix the triangle.
*Sanity.* An $n$-sided polygon has $4n - 2n = 2n$ DOF after its coincidences: $3$ rigid-body ones and $2n - 3$ for shape — $n$ sides plus $n - 3$ diagonals — which is why a triangle is rigid and a quadrilateral needs a diagonal brace.
:::
:::

::: exercise Shaft in two bushes {level=2 check="0.068"}
A shaft $\varnothing 30\ \mathrm{f}7$ ($-0.020/-0.041$) runs in two coaxial bushes $\varnothing 30\ \mathrm{H}7$ ($+0.021/0$) whose centres are $200\ \mathrm{mm}$ apart. A gear sits $120\ \mathrm{mm}$ beyond the outer bush. Find the worst-case radial displacement of the shaft axis at the gear caused by the bearing clearances. (Enter the value in millimetres.)
::: solution
**Radial play.** The largest diametral clearance is $0.021 - (-0.041) = 0.062\ \mathrm{mm}$, so each bush allows the axis to sit up to $r = 0.031\ \mathrm{mm}$ off centre.
**Geometry.** With the axis at $y_1$ in the inner bush ($x = 0$) and $y_2$ in the outer bush ($x = 200$), at the gear ($x = 320$)
$$
y_g = y_1 + (y_2 - y_1) \frac{320}{200} = -0.6\, y_1 + 1.6\, y_2 ,
$$
which is largest for $y_1 = -r$, $y_2 = +r$:
$$
y_{g,\max} = (0.6 + 1.6) \times 0.031 = 0.068\ \mathrm{mm}.
$$
*Sanity.* The tilt is at most $0.062/200 = 0.31\ \mathrm{mrad}$; the overhang amplifies it, which is why overhung gears are placed as close to the bearing as possible.
:::
:::

::: exercise Derivation {level=3}
Derive the chordal-deviation formula $\delta = R(1 - \cos(\pi / n))$, show that $\delta \propto n^{-2}$ for large $n$, and find the facet-count multiplier needed to halve the deviation on a curve and on a surface.
::: solution
**The geometry.** A regular $n$-gon inscribed in a circle of radius $R$ subtends a central angle $2\pi/n$ per side, so the distance from the centre to the midpoint of a side (the apothem) is $R\cos(\pi/n)$. The largest gap between side and arc is at that midpoint:
$$
\boxed{ \delta = R \left( 1 - \cos \frac{\pi}{n} \right) } .
$$
**The asymptotic form.** For large $n$, $\cos x \approx 1 - x^{2}/2$ with $x = \pi/n$:
$$
\delta \approx \frac{R \pi^{2}}{2 n^{2}} \qquad \Rightarrow \qquad n \approx \pi \sqrt{\frac{R}{2 \delta}} \propto \delta^{-1/2} .
$$
**The multiplier.** Halving $\delta$ multiplies $n$ by $\sqrt{2} = 1.41$ along each direction. A **curve** is refined in one direction: $1.41\times$. A **surface** is refined in two directions at once, so its facet count $n_u n_v$ multiplies by $(\sqrt{2})^{2} = 2$.
*Sanity.* For $R = 50$, $\delta = 0.01$: $n \approx \pi\sqrt{2500} = 157.1$, matching the exact $157.08$; the approximation is excellent once $n$ exceeds about $20$.
:::
:::

::: exercise Design {level=3}
Specify the CAD modelling standard for a design office making $40$ variants of a hydraulic power pack: modelling conventions, sketch rules, assembly structure, naming, release states and the change process.
::: solution
**Modelling conventions.**
$$
\begin{array}{l l}
\text{Units} & \text{millimetres, fixed in the templates} \\
\text{Origin} & \text{at the part's primary datum, so that parts mate predictably} \\
\text{Orientation} & \text{a fixed convention, e.g. } Z \text{ along the main axis or mounting direction} \\
\text{Structure} & \text{reference geometry, functional features and cosmetic features kept distinct} \\
\text{PMI} & \text{semantic, in saved views, if MBD is used} \\
\text{File names} & \text{the part number only}
\end{array}
$$
**Sketch rules.** Fully constrained before release; dimensioned to the origin, planes or named reference geometry; no references to edges of features that may be removed; large sketches split into simpler ones.
**Assembly structure.** A **skeleton** (layout) at the top of each product assembly carries the envelope, the interfaces and the critical dimensions; sub-assemblies and parts reference the skeleton rather than each other, so that a variant is mostly a change of skeleton parameters.
**Variants.** One parametric family with a **configuration table** driving the variable parts (pump displacement, motor frame, manifold size), rather than forty independent models; the table also drives the BOM.
**Naming and identity.** The part number is a **non-descriptive key**; description, material and revision live in the PLM record. A descriptive number such as "BRACKET-8-STEEL" becomes false the day the bracket changes.
**Release states.**
$$
\text{IN WORK} \ \to\ \text{IN REVIEW} \ \to\ \text{RELEASED} \ \to\ \text{OBSOLETE},
$$
with a released revision read-only to everyone; it changes only through a change order that creates a new revision or a new part number.
**Change process.**
$$
\begin{array}{l l l}
\text{ECR} & \text{engineering change request} & \text{anyone may raise; describes the problem} \\
\text{ECO} & \text{engineering change order} & \text{approved by the change board; states the change and its effectivity} \\
\text{Effectivity} & \text{serial, date or lot} & \text{"from serial 214", not "immediately"} \\
\text{Disposition} & \text{use as is, rework, scrap} & \text{for stock and work in progress}
\end{array}
$$
**Two rules to enforce in the release checklist.** Fully constrained sketches with a passed rebuild test, and no editing of released models — a modified copy is a different part.

*Design comment.* A CAD standard is largely a communication standard: most of its rules exist so that someone other than the author can safely change the model.
:::
:::
