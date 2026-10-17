A CAD model is **not the part**. It is a mathematical description from which a part may be derived, and the difference between the two is the entire subject of this lesson: the model is **exact** and the part is **toleranced**, the model is **nominal** and the nominal has a probability of about one in a million of being made, the model **fits** because it was built to fit and the assembly **does not** because it was built from parts.

Everything that goes wrong in digital product definition goes wrong because somebody treated the model as the part — dimensioned it to twelve decimal places, checked "no interference" at nominal, printed a drawing from it without tolerancing it, and sent a **STEP** file whose surfaces had separated by $0.003\ \mathrm{mm}$ in the translation and which the supplier's kernel closed into a **different solid**.

::: warning Seven CAD errors that survive every review
**An under-constrained sketch.** A sketch with a degree of freedom left is a sketch whose geometry will move when an unrelated dimension changes, and it **always** moves in the feature you spent a day on. The rule is absolute: **a sketch is either fully constrained or it is a draft**, and a "fully constrained" sketch whose geometry is fixed by a **construction** line you forgot is not. **A model that cannot be rebuilt.** A history tree that only its author understands, a fillet that works only in the order it was applied, a pattern whose seed feature was deleted and re-added — every one is a model that cannot be changed, and a model that cannot be changed is a **drawing** with extra steps. **A nominal assembly declared to fit.** Twenty parts stacked at nominal is an assembly that exists with a probability of $0.5^{20} \approx 10^{- 6}$; "no interference detected" at nominal is a statement about a part that will never be made. **A tolerance applied in the CAD and not on the drawing.** A CAD model has no tolerance; a dimension in a CAD model is a **nominal**, and a model whose author believed otherwise has shipped a part at the model's own precision, which is $10^{- 7}$ of its size and about $0.00001\ \mathrm{mm}$ on a bracket. **A tessellated file used as a definition.** An STL is a **picture** of a solid made of $200{,}000$ flat triangles, and a $50\ \mathrm{mm}$ radius fillet tessellated at a $0.01\ \mathrm{mm}$ chordal deviation is a **157-sided prism**; a mould tool cut from it is faceted, and a CMM comparing a measured part to it inherits the facets as form error. **A change made downstream.** Editing the assembly instead of the part, the drawing instead of the model, the STEP instead of the native — three ways of creating a **second source of truth**, and the second one always wins. **A model with no product memory.** No revision, no released state, no change record, no approval — a model that cannot answer "what was on the drawing when this part was made in March?" is a model that cannot support a recall, an investigation or a warranty claim.
:::

## The parametric model

::: definition Constraints, degrees of freedom and design intent {#def-constrain}
**The degrees of freedom of a 2D sketch entity.**
$$
\begin{array}{l c l c}
\text{Entity} & \text{DOF} & \text{Entity} & \text{DOF} \\
\text{Point} & 2 & \text{Line segment} & 4 \\
\text{Circle} & 3 & \text{Arc} & 5 \\
\text{Ellipse} & 5 & \text{Spline} & 2 n + 2\\
\text{Rectangle} & 4\ (\text{as a tool}) & \text{Slot} & 5
\end{array}
$$
**The constraint's cost.** A **coincident** constraint removes $2$, **horizontal** or **vertical** removes $1$, **parallel**, **perpendicular**, **tangent**, **equal** remove $1$ each, **concentric** removes $2$, **symmetric** removes $2$, a **dimension** removes $1$.
**The evaluation.** A rectangular sketch made of four separate line segments:
$$
4 \times 4 = 16\ \text{DOF}, \qquad
4\ \text{coincident} \times 2 = 8, \qquad
2\ \text{horizontal} + 2\ \text{vertical} = 4, \qquad
\text{remaining} = 4
$$
and the four remaining are **width, height, and the position of the corner** — so **two dimensions fully size it** and **two more constraints** (that its sides are equal in pairs, or that it is centred on the origin) are needed to fully constrain it. **The rectangle tool applies those two constraints for you, which is why the tool exists.**
**The three rules.** **A sketch is fully constrained or it is not finished** — the CAD system's colour (black for constrained, blue for free) is a **status indicator** and ignoring it is the profession's most common professional failure. **The constraints encode the intent and the dimensions encode the size**: a hole that must stay concentric with an edge is **made** concentric and not dimensioned $12.00 \pm 0.02$. **The origin is the only fixed point in the universe**, and a sketch whose geometry floats relative to it will move when the model is mirrored, patterned or referenced.
**The number that measures a model's health.** A sketch with **more** constraints than DOF is **over-constrained** and the CAD system will refuse one of them, silently, at rebuild — and the feature that fails first is the one you will not look at.
:::

::: definition The model tree and design intent {#def-tree}
**Design intent is the answer to "what should happen when this dimension changes?"**
$$
\begin{array}{l l l}
\text{Intent} & \text{How to build it} & \text{What breaks if you do not} \\
\text{This wall stays $3$ thick} & \text{an offset from the outer face} & \text{the wall becomes $2.4$ when the outside grows} \\
\text{This hole stays centred on the boss} & \text{a concentric constraint, not two dimensions} & \text{the hole drifts when the boss moves} \\
\text{These two holes stay equidistant from the ends} & \text{a symmetry constraint and one dimension} & \text{the pattern goes to one side} \\
\text{This rib always meets the wall} & \text{an "up to face" end condition} & \text{a $0.2$ gap or a $0.2$ overlap when the wall moves} \\
\text{This flange is always } 4\ \text{bolts} & \text{a pattern with a driven count and a pitch-circle dimension} & \text{the bolts stop being equispaced} \\
\text{This part fits the same envelope in three sizes} & \text{a configuration with a driving table} & \text{three models that drift apart}
\end{array}
$$
**The rebuild test.** Change the **overall length** by $10\ \mathrm{mm}$ and every hole should move as intended, every wall should stay its thickness, and every fillet should survive. **A model that passes the rebuild test is a model; a model that fails it is a picture.**
**The three tree rules.** **Sketch the profile, not the outline** — a bracket's section is one closed profile and not four lines. **Feature order is load-bearing**: a fillet before a shell and a shell before a fillet are different parts, and the one that works is the one that will not rebuild after a change. **Name the features**, because "Fillet4" cannot be found in a $300$-feature tree and "Boss-fillet" can.
:::

::: definition Model-based definition {#def-mbd}
**Model-based definition** puts the **product manufacturing information** — the geometry, the dimensions, the tolerances, the datums, the surface texture, the notes, the material, the finish — **on the model** and deletes the drawing.
$$
\begin{array}{l l l}
\text{Standard} & \text{Covers} & \text{Status} \\
\text{ASME Y}14.41 & \text{digital product definition data practices} & \text{the PMI practice standard} \\
\text{ISO } 16792 & \text{technical product documentation — digital product definition} & \text{the ISO equivalent} \\
\text{ISO } 10303\text{-}242\ (\text{STEP AP242}) & \text{the neutral container for PMI} & \text{the exchange format} \\
\text{ISO } 14306\ (\text{JT}) & \text{the lightweight container, PMI included} & \text{the collaboration format} \\
\text{ASME Y}14.24 & \text{configurations and change management} & \text{the revision layer}
\end{array}
$$
**The three things MBD genuinely saves.** **The drawing's own tolerance stack**, because a PMI annotation is **associative** to the geometry and cannot be left behind by a change. **The interpretation**, because a rotating, sectioning, measuring 3D model answers "which face is datum $C$?" that a third-angle view answers badly. **The cost of the drawing itself**, which is $8$ to $16$ engineer-hours per part on a complex part and $40\ \%$ of a drawing office's output.
**The three things it does not save and where it fails.** **A supplier without a viewer** — and the answer is a **JT** or **3D PDF** viewable by anything. **A shop that works from a printed sheet**, and the answer is a **drawing generated from the model** for the shop and the model as the authority. **A regulator or a customer that requires a signed drawing**, and the answer is a **signed model revision** in the PLM, which is legally the same thing and organisationally is not.
:::

::: definition Exchange formats and the tessellation trap {#def-formats}
$$
\begin{array}{l l l l}
\text{Format} & \text{Contains} & \text{Loses} & \text{Use} \\
\text{Native} & \text{everything, including the history tree} & \text{nothing} & \text{the authority} \\
\text{STEP AP}242 & \text{B-rep solids, assembly, PMI, colour, layers} & \text{the history tree} & \text{the contractual exchange} \\
\text{JT} & \text{B-rep + tessellation + PMI, compressed} & \text{the history tree, some PMI} & \text{collaboration, lightweight} \\
\text{IGES} & \text{a bag of surfaces} & \text{topology, solidity, tolerance} & \text{nothing; it is 1980} \\
\text{3MF} & \text{mesh + metadata + colour} & \text{exact geometry} & \text{additive} \\
\text{STL} & \text{triangles} & \text{everything else} & \text{a slice, and nothing else} \\
\text{OBJ} & \text{triangles and a texture} & \text{everything else} & \text{a picture}
\end{array}
$$
**The chordal deviation.** A cylinder of radius $R$ faceted into $n$ flat facets has a **peak-to-true-surface** error of
$$
\delta = R \left( 1 - \cos \frac{\pi}{n} \right) \quad \Rightarrow \quad n = \frac{\pi}{\arccos \left( 1 - \delta / R \right)}
$$
$$
\begin{array}{c c c c}
R\ (\mathrm{mm}) & \delta\ (\mathrm{mm}) & n & \text{Facet edge length} \\
50 & 0.01 & 157 & 2.0\ \mathrm{mm} \\
50 & 0.001 & 497 & 0.63\ \mathrm{mm} \\
5 & 0.01 & 50 & 0.63\ \mathrm{mm} \\
1 & 0.005 & 29 & 0.22\ \mathrm{mm} \\
200 & 0.025 & 126 & 10\ \mathrm{mm}
\end{array}
$$
**The two consequences.** **A CMM that compares a measured part to an STL** inherits the facets as **form error**: a $50\ \mathrm{mm}$ radius at a $0.01$ deviation is a $157$-sided polygon whose measured "roundness" is $0.01$ of pure **file** error, and a drawing that tolerances roundness at $0.008$ is failed by the file. **A mould tool cut from an STL** is faceted at the facet edge length, and a $10\ \mathrm{mm}$ facet edge on an optical reflector is a visible **orange peel** at a $0.025$ deviation.
**The number.** A $25\ \mathrm{MB}$ STL of a cylinder is $200{,}000$ triangles at $50\ \mathrm{bytes}$ each; the same cylinder as a STEP is **$400\ \mathrm{bytes}$** — a cylinder is a radius, a height and an axis — and the $60{,}000\times$ difference is the difference between a **definition** and a **picture** of one.
:::

::: widget plot
f: 50*(1-cos(pi/x))
x: 8, 400
y: 0, 20
labels: chordal deviation
caption: The chordal deviation in micrometres of a $50\ \mathrm{mm}$-radius cylinder tessellated into $x$ flat facets. At the $64$ facets a viewer uses by default the deviation is $0.06\ \mathrm{mm}$, which is **sixty times** a typical machining tolerance and is invisible on a screen because a screen is $0.2\ \mathrm{mm}$ per pixel. At $157$ facets it is $0.01\ \mathrm{mm}$, and at $497$ it is $0.001$. The curve is $\delta = R \left( 1 - \cos \left( \pi / n \right) \right) \approx R \pi^{2} / \left( 2 n^{2} \right)$, so **halving the deviation costs four times the facets** — which is why a "high quality" STL is $4\times$ the file and not $2\times$.
:::

## The model and the real part

::: definition Why the model always fits and the assembly never does {#def-nominal}
**The model is nominal.** Every face is at its nominal position, every hole at its nominal size, and the assembly therefore has **zero** interference and **zero** gap — a condition whose probability of occurring is the product of the probabilities that every dimension lands exactly on nominal, which for continuous variables is **zero**.
**The honest statement.** A stack of $n$ dimensions each with a $50\ \%$ chance of being on the tight side has
$$
P \left( \text{all nominal-signed} \right) = 0.5^{n}
$$
so a $20$-part axial stack lands at nominal-signed assembly with a probability of $9.5 \times 10^{- 7}$, and a $10$-part one with $0.1\ \%$.
**The three ways to put reality into a CAD assembly.**
$$
\begin{array}{l l l l}
\text{Method} & \text{How} & \text{Cost} & \text{Answers} \\
\text{Worst-case} & \text{build the assembly at both extremes} & 2\ \text{assemblies} & \text{will it ever not fit?} \\
\text{Monte Carlo} & \text{randomise every dimension, } 10^{4}\ \text{runs} & \text{a script} & \text{what fraction fits?} \\
\text{TRS} & \text{tolerance ring analysis in the CAD} & \text{a plugin} & \text{which ring to tighten?}
\end{array}
$$
**The rule.** **Any clearance smaller than the sum of the stack's RSS is a Monte Carlo question and not a CAD question**, and a CAD "interference check" that reports zero at nominal is a check that has not been done.
**The number that ends the argument.** A cover with a $0.5\ \mathrm{mm}$ wall-to-wall gap all round, on a stack whose RSS is $0.9\ \mathrm{mm}$, **interferes on one side in $29\ \%$ of assemblies** — and the CAD model, at nominal, shows a beautiful $0.5\ \mathrm{mm}$ gap and reports no interference.
:::

::: definition Mass properties and what they lie about {#def-mass}
A CAD model computes mass from a **density** and a **volume**, and both are wrong:
$$
m_{\mathrm{model}} = \rho_{\text{nominal}} V_{\text{nominal}}, \qquad
m_{\mathrm{part}} = \rho_{\text{actual}} V_{\text{actual}}
$$
$$
\begin{array}{l c l}
\text{Error source} & \text{Typical size} & \text{Direction} \\
\text{Fillets and rounds omitted from the model} & 1\ \text{to}\ 3\ \% & \text{model light} \\
\text{Threads modelled as cylinders} & 0.5\ \text{to}\ 1\ \% & \text{model heavy} \\
\text{Casting draft and radii} & 2\ \text{to}\ 5\ \% & \text{model light} \\
\text{Coring, bosses, pads} & 1\ \text{to}\ 2\ \% & \text{model light} \\
\text{Density of a casting with porosity} & 0.5\ \% & \text{model heavy} \\
\text{Coating, paint, plating} & 0.5\ \text{to}\ 2\ \% & \text{model light} \\
\text{Fasteners, seals, grease omitted} & 2\ \text{to}\ 5\ \% & \text{model light} \\
\hline
\text{Typical total on an assembly} & 5\ \text{to}\ 15\ \% & \text{model light}
\end{array}
$$
**The rule.** **A CAD mass is a lower bound**, and a mass budget that is met at $- 2\ \%$ in CAD will be met at $+ 8\ \%$ on the weighbridge. The professional practice is to model **every** fastener, seal, loom, clamp and coat, to apply a **$+ 10\ \%$** allowance on the first model of a cast or moulded part, and to **weigh the first article and update the density table** — because the density table is the model's only contact with reality and it is usually wrong by the $2$ to $3\ \%$ of an alloy's own scatter.
**The centre of mass and the inertia.** The inertia tensor is worse than the mass, because it scales with the **square** of a distance and a missing $2\ \mathrm{kg}$ mass at $400\ \mathrm{mm}$ changes a $12\ \mathrm{kg \cdot m^{2}}$ inertia by $3.2\ \mathrm{kg \cdot m^{2}}$ — **$27\ \%$** — while changing the mass by $1.5\ \%$.
:::

::: definition Data management {#def-pdm}
**The three levels.**
$$
\begin{array}{l l l}
\text{PDM} & \text{product data management} & \text{files, revisions, check-in/out, a vault} \\
\text{PLM} & \text{product lifecycle management} & \text{PDM + items, change orders, BOM, requirements, suppliers} \\
\text{BOM} & \text{bill of materials} & \text{the design BOM, the manufacturing BOM and the service BOM are three different documents}
\end{array}
$$
**The four things a vault must do and a shared folder cannot.** **Check-out** so two people do not model the same bracket. **Revision** so a part has an identity that survives its geometry changing. **Released state** so a manufacturing BOM references a **released** revision and not a work-in-progress. **Effectivity** so a change says "from serial $214$ onward" and a service engineer can find what was on aircraft $118$.
**The revision rule that prevents most arguments.** **A revision letter changes when the part's form, fit or function changes; a revision number changes when it does not.** A drawing typo is a **number**; a $2\ \mathrm{mm}$ hole becoming $2.2$ is a **letter**. The alternative — a single incrementing revision — makes every change look like a redesign and destroys the change history's information.
**The change-cost curve.**
$$
\begin{array}{l c l}
\text{A change caught at the requirement} & 1\times & \text{a paragraph} \\
\text{at the concept} & 10\times & \text{a week} \\
\text{at the detail design} & 100\times & \text{the model, the drawing, the analysis, the FMEA} \\
\text{after the tool is cut} & 1{,}000\times & \text{the tool, the gauge, the PPAP, the schedule} \\
\text{after the field} & 10{,}000\times & \text{the recall, the investigation, the warranty, the certificate}
\end{array}
$$
**The number.** The curve is three to four orders of magnitude in every industry's own data, and it is the reason a **design review** is the cheapest hour in engineering and a **tooling change note** the dearest.
:::

::: example A sketch that was not constrained {#ex-sketch}
A bracket sketch has a $60$-long side, a $40$-long side and a $12$-radius fillet, drawn with four lines and one circle, and is left $6\ \mathrm{DOF}$ free. The designer later changes the $60$ to $70$. Describe what happens and how to prevent it.
::: solution
**What happens.** The CAD solver resolves the under-determined system by **minimising the movement of the entities it was asked to keep**, which is an arbitrary choice made by the solver and not by the designer. In practice the $70$ side grows to the **right**, the $40$ side **rotates** by an angle the solver chose, the fillet **fails** because its two tangent edges are no longer the ones it was tangent to, and the shell that follows **fails** because its profile is now open.
**The cascade.** One failed feature in a $180$-feature tree usually fails **four** downstream features, and the engineer fixes the fillet, which breaks the pattern, which breaks the hole that was "up to face" the pattern.
**The prevention, in order of effectiveness.**
1. **Fully constrain every sketch.** The system tells you the DOF count; it is a **status light** and it is red.
2. **Anchor to the origin.** One construction line from the origin, or a coincident constraint on one corner, and the sketch cannot translate.
3. **Constrain the intent, not the position.** A hole that must stay on a boss is **concentric**; a hole that must stay $12$ from an edge is **dimensioned**.
4. **Rebuild-test every model** by changing the driving dimensions by $\pm 10\ \%$ before releasing it.
5. **Order the features so the fillets come last**, because a fillet is the feature that fails first and the one whose failure means the most.
**The count for this sketch.** Four lines $= 16\ \mathrm{DOF}$; four coincident $= - 8$; two horizontal and two vertical $= - 4$; the fillet's two tangents $= - 2$; two dimensions $= - 2$; **$4\ \mathrm{DOF}$ remain** — the sketch's $x$, its $y$, its rotation, and one more (the fillet's radius is not dimensioned). **Four dimensions and one constraint short.**
*Sanity.* The reason "it looked right on the screen" is not a check is that the under-constrained sketch **is** right on the screen — the solver puts it where the designer drew it — and only **moves** when a dimension changes. The failure is therefore **invisible at release** and **certain at change**, which is the worst possible failure signature and the reason the rule is absolute.
:::
:::

::: example Tessellating a blade {#ex-tess}
A turbine blade with a $40\ \mathrm{mm}$ leading-edge radius and a $300\ \mathrm{mm}$ span is to be exported for (a) a $1/1$ visual check, (b) a $3\mathrm{D}$-printed pattern at a $0.02\ \mathrm{mm}$ deviation, and (c) a CMM reference at a $0.001\ \mathrm{mm}$ deviation. Give the facet counts and the file sizes.
::: solution
**The governing formula.** $n = \pi / \arccos \left( 1 - \delta / R \right)$ for the **circumferential** count at a radius $R$; the **axial** count comes from the same deviation on the **axial** curvature radius $R_a$.
$$
\begin{array}{l c c c c}
\text{Case} & \delta & n_\theta\ (R = 40) & n_{\text{axial}}\ (R_a = 300) & \text{Facets} \\
\text{(a) visual} & 0.05 & 50 & 43 & 4{,}300 \\
\text{(b) printed pattern} & 0.02 & 79 & 69 & 10{,}900 \\
\text{(c) CMM reference} & 0.001 & 354 & 309 & 110{,}000
\end{array}
$$
**The file sizes.** An STL facet is $50\ \mathrm{bytes}$ (a normal, three vertices, two bytes of attribute):
$$
\text{(a)}\ 0.22\ \mathrm{MB}, \qquad \text{(b)}\ 0.55\ \mathrm{MB}, \qquad \text{(c)}\ 5.5\ \mathrm{MB} .
$$
**The whole blade, however, is not a leading edge.** The **trailing edge** is $0.15\ \mathrm{mm}$ thick with a $0.08\ \mathrm{mm}$ radius, and at a $0.001$ deviation it needs
$$
n = \frac{\pi}{\arccos \left( 1 - 0.001 / 0.08 \right)} = \frac{\pi}{0.158} = 20\ \text{facets around a } 0.5\ \mathrm{mm}\ \text{perimeter},
$$
which is **$25\ \mu\mathrm{m}$ per facet on a $150\ \mu\mathrm{m}$ edge** — and the CMM will measure the trailing edge as a **$0.02\ \mathrm{mm}$-flat** where the true geometry is a $0.08$ radius.
**The professional answer.** **Do not use an STL as a CMM reference.** Use **STEP AP242**, in which the leading edge is an **analytic surface** and the deviation is **zero** and the CMM's comparison is exact. The STL is for the **viewer** and the STEP is for the **contract**.
**The exception.** A **scanned** part has no analytic surfaces, and the CMM must compare to a mesh — in which case the comparison is a **mesh-to-mesh deviation** and its tolerance must be **larger than the mesh's own deviation**, which is the sentence that should appear on every reverse-engineering drawing.
*Sanity.* The $\delta \propto 1 / n^{2}$ law means the CMM reference at $0.001$ costs **$25\times$** the facets of the visual at $0.05$ — and the reason a "high-resolution" scan file is $500\ \mathrm{MB}$ is not the geometry but the **deviation the operator typed into the export dialog**.
:::
:::

::: example A Monte Carlo of a cover gap {#ex-mc}
A cover sits in a housing with a nominal wall-to-wall gap of $0.5\ \mathrm{mm}$ per side. The housing's internal pocket is $100.0 \pm 0.3$, the cover is $99.0 \pm 0.2$, and both are located by a pocket at $50 \pm 0.15$ and a tab at $49.5 \pm 0.15$. Compute the probability of an interference on one side.
::: solution
**The loop on one side.** The gap on the left is
$$
g_L = \frac{P - C}{2} + \left( 50 - 49.5 \right)_{\text{nominal offset}} \times 0 + e_P - e_C - e_{P,\mathrm{loc}} + e_{C,\mathrm{loc}}
$$
where the $P / 2 - C / 2$ terms carry the size errors and the location errors add. Collecting the coefficients:
$$
\sigma_{g} = \sqrt{ \left( \frac{0.3}{\sqrt{12}} \right)^{2} + \left( \frac{0.2}{\sqrt{12}} \right)^{2} + \frac{0.15^{2}}{12} + \frac{0.15^{2}}{12} }
= \sqrt{0.0075 + 0.00333 + 0.001875 + 0.001875} = \sqrt{0.01458} = 0.1208\ \mathrm{mm}
$$
**The mean gap.** $\mu_g = \left( 100.0 - 99.0 \right) / 2 = 0.5\ \mathrm{mm}$ per side.
**The probability of interference on one side.**
$$
P \left( g_L < 0 \right) = P \left( z < \frac{- 0.5}{0.1208} \right) = P \left( z < - 4.14 \right) = 1.7 \times 10^{- 5}
$$
**The probability of interference on either side.** The two sides are **anti-correlated** — a gap that closes on the left opens on the right — so the correct question is whether the **cover fits at all**, which requires **both** gaps positive:
$$
g_L + g_R = P - C = 1.0 \pm 2 \times 0.1208 \quad \text{(the location errors cancel)}
$$
and the **sum** never goes negative. So the cover **always fits** and the failure mode is not interference but **misalignment**: the **minimum** gap on one side is
$$
g_{\min} = 0.5 - 3 \times 0.1208 = 0.138\ \mathrm{mm}
$$
at $3\sigma$, and the **maximum** on the other is $0.862\ \mathrm{mm}$.
**The verdict.** The cover fits every time and the **visible step** at the parting line is up to $0.36\ \mathrm{mm}$, which on a styled product is a **cosmetic** failure and on a sealing face is a **leak**.
**The three fixes.** **Tighten the pocket's $\pm 0.3$**, which contributes $51\ \%$ of the variance and is the only member worth tightening. **Add a locating feature** — a dowel or a spigot — which moves the location errors out of the loop entirely. **Move the tolerance to the cover** and make the pocket a gauge, because a pocket is machined once and a cover is stamped.
*Sanity.* The reason the **sum** of the two gaps is independent of the location errors is that a **translation** of the cover closes one gap and opens the other by exactly the same amount — which is the whole reason a **centring** tolerance and a **translation** tolerance are different questions, and why a Monte Carlo that reports "interference probability $3.4 \times 10^{- 5}$" by doubling one side has made an error of $\sqrt{2}$ in the wrong direction.
:::
:::

::: example A model that could not be changed {#ex-tree}
A $240$-feature sheet-metal enclosure rebuilds in $94$ seconds and fails whenever the width is changed. Diagnose and fix.
::: solution
**The diagnosis, in the order it is usually found.**
$$
\begin{array}{l c l}
\text{Symptom} & \text{Cause} & \text{Fix} \\
\text{Slow rebuild} & \text{a } 600\text{-point spline and a } 4{,}000\text{-facet surface} & \text{replace the spline with three arcs} \\
& \text{a pattern of } 240 \text{ cosmetic ribs} & \text{move them to a cosmetic body} \\
\text{Fillet fails} & \text{fillets applied before the shell} & \text{move all fillets after the shell} \\
& \text{a "full round" on an edge that changes length} & \text{use a } 0.2\text{-less-than-full radius} \\
\text{Pattern fails} & \text{the seed feature was deleted and re-added} & \text{edit the seed, never delete it} \\
\text{Width change breaks it} & \text{the sketch was dimensioned to a face that moves} & \text{dimension to the origin} \\
\text{Hole missing} & \text{a "up to next" end condition that now hits a rib} & \text{use "up to vertex" or a blind depth} \\
\text{Sheet metal tears} & \text{a bend on a face that the shell removed} & \text{bend before the cut, always}
\end{array}
$$
**The three structural fixes.**
1. **Split the model into a **master surface body**, a **part body** and a **cosmetic body**.** The cosmetic body carries the ribs, the text, the logos and the texture, is **suppressed** for the analysis and the drawing, and is **included** for the mould tool. This alone takes the rebuild from $94\ \mathrm{s}$ to $11\ \mathrm{s}$.
2. **Reorder: pattern $\to$ shell $\to$ fillet $\to$ cosmetic.** A fillet after a shell survives a wall-thickness change; a fillet before a shell is consumed by it.
3. **Re-dimension every sketch to the origin or to a master construction geometry**, and add a **$10\ \%$ width-change rebuild test** to the release checklist.
**The number that measures the fix.** After the rework the model rebuilds in **$11$ seconds**, survives a $\pm 20\ \%$ width change and a $\pm 50\ \%$ height change, and its **feature count drops from $240$ to $163$** because the cosmetic ribs moved to their own body.
**The rule.** **A model that cannot be rebuilt at $\pm 20\ \%$ is not a model of the part, it is a model of the drawing of the part as it happened to be drawn on the day it was finished.**
*Sanity.* The reason cosmetic features belong in a separate body is not performance but **ownership**: the styling group owns the cosmetic body, the engineering group owns the part body, and a model in which both are one tree is a model in which neither group can make a change without the other's approval.
:::
:::

::: example Model-based definition on a machined part {#ex-mbd}
Give the complete model-based definition for the hydraulic pump housing of the previous lesson, and state what the drawing that replaces it must still contain.
::: solution
**What goes on the model.**
$$
\begin{array}{l l}
\text{Geometry} & \text{the released solid, at nominal, with the PMI as a separate layer set} \\
\text{Datums} & A\ (\text{gasket face}),\ B \left[ \mathrm{M} \right]\ (\phi 60\ \text{pilot}),\ C\ (\text{side face}),\ \text{flagged on the faces} \\
\text{Feature controls} & \text{the frames, attached to the faces they tolerance, in the view the inspector reads} \\
\text{Size limits} & \phi 80\ \mathrm{H}7,\ \phi 60\ \mathrm{f}7,\ M 8 \times 1.25 \text{-}6 \mathrm{H} \times 18\ (22\ \text{DP}) \\
\text{Texture} & \mathrm{Ra}\ 0.8\ \text{on the bore},\ 1.6\ \text{on the pilot},\ 3.2\ \text{on the gasket face, with the lay symbol} \\
\text{Notes} & \text{the four manufacturing notes, in a note block anchored to the model origin} \\
\text{Metadata} & \text{material, condition, density, finish, mass, CG, surface area, the release state and the approver}
\end{array}
$$
**The three things the model must carry that a drawing does not.** **The **view directions** the PMI is meant to be read in**, because a PMI annotation on a hidden face is invisible unless the view is saved. **The **balloons and the BOM** for an assembly model.** **The **signature block** — the release state, the approver and the date — as a **PLM attribute** and not as text on the geometry.
**What the drawing must still contain.**
$$
\begin{array}{l l}
\text{The title block} & \text{because a drawing goes into a paper pack and a model does not} \\
\text{The revision history} & \text{because the customer's incoming inspection reads a drawing} \\
\text{The third-angle views} & \text{because the shop floor has a printed sheet and a tablet that is being repaired} \\
\text{The supplier's own notes} & \text{because a supplier adds its process notes and they are not the designer's PMI} \\
\text{The signature} & \text{because the customer's contract says "signed drawing", and no standard can argue with a contract}
\end{array}
$$
**The honest conclusion.** **MBD replaces the drawing where the customer's quality system is PLM-integrated, and generates a drawing from the model where it is not** — and the drawing must be **generated from the model** and never maintained beside it, because two sources of truth is one too many.
*Sanity.* The reason MBD took thirty years to arrive is not the technology, which existed in CATIA in 1994, but the **quality clause**: an incoming inspector with a micrometer and a printed drawing cannot sign off a model, and the organisations that adopted MBD first were the ones that **bought the inspectors tablets** and rewrote the purchase order.
:::
:::

::: history
The **first commercial CAD** was **Patrick**'s and **Beals**' **SKETCHPAD** at **MIT** in **1963**, a light-pen system whose thesis invented **computer graphics**, **object-oriented programming** and **interactive computing** in one document, and whose direct descendants are every window and every icon on every screen. **The surface modeller** came from the **aerospace** and **car** studios — **René Garnier**'s **Dassault** **CATI** of **1969**, whose purpose was a **Class-A** car body that could be **milled** from a mathematical surface instead of a **clay** buck, and **Ideason**'s **UNISURF** of **1968** at **Ciemat** for **Volkswagen**. **The solid modeller** came from the **CAM-I** and **British Aircraft Corporation** `FAMTAB` work of the 1970s and the **Build** and **GMS** research systems, and became commercial as **SDRC**'s **I-DEAS** in **1985**. **Parametric, history-based, constraint-driven modelling** was developed at **Computervision** as **CADDS** feature technology and at **Cv**'s spin-off, and decisively commercialised by **Parametric Technology Corporation**'s **Pro/ENGINEER** of **1987**, whose founders **James Platt**, **Jerry Masino** and **Rick Richardson** had built the earlier **Unigraphics** and **CADDS** feature work; **PTC**'s thesis was that a model should record **how** the part was made and not only **what** it was, and it won. **Jon Hirschtick** left **PTC** to found **SolidWorks** in **1993** on the explicit thesis that the same technology should run on a **desktop** machine, and **CATIA**'s parametric mode, **Unigraphics**'s feature modelling and **I-DEAS**'s Sketchpad followed between **1991** and **1995**. **The Standard for the Exchange of Product model data**, **ISO 10303** or **STEP**, was begun in **1984** at the **US Air Force**'s instigation, published its first parts in **1994**, and reached **AP242** in **2014**, which added **PMI** and **tessellated** representation and is the first neutral format that can carry a **definition** rather than a **shape**. **Model-based definition** was formalised by **ASME Y14.41** in **2003** and **ISO 16792** in **2006**, and its industrial adoption is credited to the **Boeing 777** of **1994** — the first airliner defined entirely in **CATIA** with **no drawing** — and to the **JSF** programme's **digital mockup** requirement of **1996**.
:::

## Where this leads

The model is the source of the geometry that [[engineering-graphics/orthographic-projection]] projects and that [[engineering-graphics/sections-auxiliary-views]] cuts; its dimensions come from [[engineering-graphics/dimensioning]], its tolerances from [[engineering-graphics/tolerances-fits]] and [[engineering-graphics/geometric-tolerancing]], and its assembly is the subject of [[engineering-graphics/assemblies-drawings]].

::: summary
- The model is exact and nominal; the part is toleranced, and a nominal assembly fits with a probability of about $10^{-6}$.
- A sketch is fully constrained or it is a draft, and an under-constrained sketch is invisible at release and certain to fail at change.
- Design intent is what happens when a driving dimension changes, and the rebuild test at $\pm 20\%$ is the only test of it.
- An STL is a picture: $\delta \propto 1 / n^{2}$, so halving the deviation costs four times the facets, and a CMM comparing to a mesh inherits the mesh.
- A CAD mass is a lower bound by 5 to 15 %, and a missing 2 kg at 400 mm is 27 % of an inertia and 1.5 % of a mass.
- MBD moves the authority to the model; the drawing survives because contracts and shop floors are not PLM-integrated.
- A change costs four orders of magnitude more after the tool is cut than before the concept is fixed, which is what a design review is for.
:::

::: quiz
A turbine blade is exported as an STL for a CMM reference. Halving the chordal deviation on its surfaces multiplies the facet count by about:
- [ ] 2
- [x] 4 on a curve and 2 on a surface
- [ ] 8
- [ ] It barely changes
::: solution
The deviation goes as $\delta \propto n^{-2}$ **per direction**, so halving it needs $\sqrt{2} \approx 1.41$ times the facets in each direction. For a **curve** that is $2\times$ the facets; for a **surface**, where both parametric directions are refined together, it is $(\sqrt{2})^2 = 2$ times — and the reason a "high quality" STL is four times the file is that the export control is a percentage of the model diagonal and not a chordal deviation, so refining it also resolves small features the coarse setting had merged.
:::
:::

## Exercises

::: exercise DOF {level=1 check="3"}
How many degrees of freedom does a circle have in a 2D sketch?
::: solution
Three — two for the centre and one for the radius.
:::
:::

::: exercise Formats {level=1 check="0"}
Which exchange format carries the model's history tree?
::: solution
None — only the native format does.
:::
:::

::: exercise Tessellation {level=1 check="157"}
Give the number of facets needed to tessellate a $50\ \mathrm{mm}$-radius cylinder at a $0.01\ \mathrm{mm}$ chordal deviation.
::: solution
$n = \pi / \arccos \left( 1 - 0.01 / 50 \right) = 157$.
:::
:::

::: exercise Mass {level=1 check="2.7"}
A $2\ \mathrm{kg}$ mass omitted from a model sits $400\ \mathrm{mm}$ from the centre of mass. Give the percentage error it causes in a $12\ \mathrm{kg \cdot m^{2}}$ inertia.
::: solution
The missing contribution is $m r^{2} = 2 \times 0.4^{2} = 0.32\ \mathrm{kg \cdot m^{2}}$, which is $0.32 / 12 = 2.7\ \%$.
:::
:::

::: exercise Change cost {level=1 check="1000"}
Give the relative cost of a change caught after the tool is cut, against one caught at the requirement.
::: solution
$1{,}000$ times.
:::
:::

::: exercise Sketch DOF {level=2}
A sketch of three line segments forming a triangle, with three coincident constraints and no dimensions. How many degrees of freedom remain, and how many dimensions fully constrain it?
::: solution
$$
3 \times 4 = 12\ \mathrm{DOF}, \qquad 3\ \text{coincident} \times 2 = - 6, \qquad 6\ \text{remain}.
$$
The six are the triangle's three side lengths and its three rigid-body coordinates ($x$, $y$, rotation) — so **three dimensions** fully constrain it, and the drawing of a triangle needs exactly its three sides.
*Sanity.* The count is the reason a triangle is the only polygon that is **rigid** without diagonals: an $n$-gon has $4n$ DOF, $n$ coincidences cost $2n$, and the $2n$ remaining are $n$ side lengths, $n - 3$ diagonals and the $3$ rigid-body coordinates — so a quadrilateral needs **one** diagonal and a pentagon **two**, which is what every truss and every door frame has known for two thousand years.
:::
:::

::: exercise Monte Carlo {level=2}
A shaft of $30 \pm 0.05$ passes through two bushes at $30.05 \pm 0.03$ each, spaced $200\ \mathrm{mm}$ apart. Compute the RSS angular misalignment of the shaft and the two-bush axis, and the resulting positional error at a gear $120\ \mathrm{mm}$ beyond the outer bush.
::: solution
**The radial play per bush.** The shaft's mean is $30.000$ and the bush's is $30.050$, so the **mean diametral clearance** is $0.050\ \mathrm{mm}$ and the **radial** play is $0.025\ \mathrm{mm}$.
**The angular error.** Two bushes $200\ \mathrm{mm}$ apart, each with a radial play of $\pm 0.025$:
$$
\sigma_\theta = \frac{\sqrt{2} \times 0.025 / \sqrt{12}}{200 / 2} = \frac{0.0204}{100} = 2.04 \times 10^{- 4}\ \mathrm{rad} = 0.0117\ {}^{\circ}
$$
**The positional error at the gear.**
$$
e = \sigma_\theta \times 120 = 0.0245\ \mathrm{mm}, \qquad 3\sigma = 0.073\ \mathrm{mm} .
$$
*Sanity.* A $0.073\ \mathrm{mm}$ runout at a $60\ \mathrm{mm}$ pitch radius is $1.2\ \mu\mathrm{rad}$ of angular error, which for a gear at $3{,}000\ \mathrm{rpm}$ is a **transmission error** of $1.2\ \mu\mathrm{rad} \times R = 0.07\ \mu\mathrm{m}$ per radian of rotation — inaudible. The same clearance on a **lead screw** at a $5\ \mathrm{mm}$ lead gives $0.073 / \left( 5 / 2\pi \right) = 0.092\ \mathrm{mm}$ of positional error per turn, which is **not** inaudible and is why a machine tool's axis uses a preloaded nut and not a clearance fit.
:::
:::

::: exercise Derivation {level=3}
Derive the chordal-deviation formula $\delta = R \left( 1 - \cos \left( \pi / n \right) \right)$, show that $\delta \propto n^{- 2}$, and compute the facet-count multiplier needed to halve the deviation on a free-form surface.
::: solution
**The geometry.** A regular $n$-gon inscribed in a circle of radius $R$ has its sides at an **apothem** of
$$
a = R \cos \frac{\text{central angle}}{2} = R \cos \frac{\pi}{n} .
$$
The **chordal deviation** is the gap between the polygon's side and the circle at the side's midpoint:
$$
\boxed{ \delta = R - a = R \left( 1 - \cos \frac{\pi}{n} \right) } .
$$
**The asymptotic form.** For $n \gg 1$, $\cos x \approx 1 - x^{2} / 2$ with $x = \pi / n$:
$$
\delta \approx R\, \frac{\pi^{2}}{2 n^{2}} \qquad \Rightarrow \qquad \delta \propto n^{- 2}, \quad n \propto \delta^{- 1 / 2}, \quad n \propto \sqrt{\frac{R}{\delta}} .
$$
**The multiplier.** Halving $\delta$ multiplies $n$ by $\sqrt{2}$ **per direction**, and a surface is tessellated in **two** directions, so the **facet count** multiplies by
$$
\left( \sqrt{2} \right)^{2} = 2 .
$$
**The correction.** The $n^{-2}$ law is **per direction**; a surface's facet count is $n_u n_v$, and if both directions are refined together the count goes as $\delta^{-1}$ and **not** $\delta^{-2}$. The $4\times$ figure applies to a **curve** (one direction) and the $2\times$ to a **surface** (two directions at once).
**Evaluation.** A turbine blade at $\delta = 0.02$ needs $10{,}900$ facets; at $\delta = 0.01$ it needs $21{,}800$ — **twice**, and not four times.
*Sanity.* The reason the file size of a "high quality" STL quadruples and not doubles is that the export dialog's **"resolution"** control is usually a **percentage of the model's diagonal** and not a chordal deviation, and dropping it from $0.1\ \%$ to $0.05\ \%$ refines **both** directions **and** adds the small features the coarse setting had merged — which is the $4\times$ that the $2\times$ law does not predict.
:::
:::

::: exercise Design {level=3}
Specify the CAD modelling standard for a design office: modelling conventions, the sketch rules, the assembly structure, the naming, the release states and the change process, for a company making 40 variants of a hydraulic power pack.
::: solution
**The modelling conventions.**
$$
\begin{array}{l l}
\text{Units} & \text{millimetres and megapascals everywhere; the template locks them and the file cannot change them} \\
\text{Origin} & \text{every part's origin at its primary datum, so an assembly mates without a guess} \\
\text{Axes} & \text{the } Z \text{ axis is the primary axis or the mounting direction, always} \\
\text{Layer} & \text{layer 1 geometry, 2 construction, 3 datum, 4 PMI, 5 cosmetic, 6 reference} \\
\text{Colour} & \text{by material and not by function: aluminium grey, steel blue, plastic sand, rubber black} \\
\text{Named save} & \text{the part number and nothing else; no description in the filename}
\end{array}
$$
**The sketch rules.** **Fully constrained, always, and the system's DOF counter is a release gate.** **Every sketch dimensioned to the origin or to a named construction line.** **No dimensions driven by a face that can move.** **No construction geometry without a purpose note.** **A sketch with more than 40 entities is split.**
**The assembly structure.** A **skeleton sketch** at the top of the top-level assembly carries the **envelope**, the **interfaces** and the **critical dimensions**; every sub-assembly references the skeleton and **nothing** references a part. This is the only structure that makes **40 variants** tractable, because a variant is a **skeleton change** and not a re-model.
**The variants.** **One parametric model with a configuration table**, not forty models. The driving parameters are the **displacement**, the **pressure**, the **motor flange** and the **manifold size**; the table drives the **BOM**, the **drawing** and the **purchase order**.
$$
\begin{array}{l c l}
\text{Separate models} & 40 \times 1{,}200\ \text{parts} & \text{forty sets of drawings to revise} \\
\text{One model, } 40\ \text{configurations} & 1{,}450\ \text{parts} & \text{one model to revise, forty released configurations}
\end{array}
$$
**The naming and the identity.** **The part number never changes and never describes.** A part number is an **opaque key**; the description, the material and the revision live in the PLM item and not in the filename. The reason is that a descriptive number **cannot survive a change** — "BRACKET-8-STEEL-ZINC" becomes a lie the day it is $10\ \mathrm{mm}$, aluminium or unpainted.
**The release states.**
$$
\text{WORKING} \ \to\ \text{IN REVIEW} \ \to\ \text{RELEASED} \ \to\ \text{OBSOLETE}, \qquad
\text{and } \text{RELEASED} \to \text{IN REVIEW only by change note}
$$
**A released model is read-only to everyone including its author**, and the only way to change it is a **change note** that names the **reason**, the **affected serials** and the **rework instruction**.
**The change process.**
$$
\begin{array}{l l l}
\text{ECR} & \text{engineering change request} & \text{anyone may raise; describes the problem} \\
\text{ECO} & \text{engineering change order} & \text{the board approves; describes the change and the effectivity} \\
\text{Effectivity} & \text{serial, date or lot} & \text{"from serial } 214\text{" and not "immediately"} \\
\text{Rework} & \text{use-as-is, rework, scrap} & \text{a decision the ECO must state and the planner must see}
\end{array}
$$
**The three rules that make 40 variants survivable.** **The skeleton drives everything**, so a variant is one file. **The configuration table drives the BOM**, so a variant is not a BOM. **The change note names the effectivity**, so a variant is not a warranty claim.
**The one thing that must be forbidden.** **Editing a released model to "just check a mass".** The mass of a released model is computed from the released model; a modified copy is a **different part** and its mass is not the part's.

*Design comment.* The general rule is that **a CAD standard is a communication standard wearing a technical one**, and every rule above exists because two people disagreed about a bracket. The rules that pay for themselves are the **opaque part number**, the **released read-only state** and the **skeleton-driven variant**, and the ones that get broken first are the **fully constrained** rule and the **no editing a released model** rule — which is exactly why they are the two that belong in the release checklist and not in a training course.
:::
:::
