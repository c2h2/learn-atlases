An oak tree that germinated in the year 1700 is still making new leaves, new roots, new wood and new flowers every year. Nothing comparable happens in a mammal: its body plan is laid down in the embryo, its organs grow to a fixed size, and growth stops in adulthood. Plants grow throughout their lives, and they keep building new organs. A plant can afford to lose most of its leaves to a caterpillar or a frost and simply grow more; a plant shaded on one side grows towards the light by putting its new branches where the light is. This open-ended, modular way of life is possible because plants keep pockets of embryonic tissue — **meristems** — at the tips of every shoot and root, and in rings around stems and roots that thicken.

This chapter is about how meristems make the plant body. We start with the logic of modular growth, then look at the shoot and root apical meristems, the stem-cell niches at their centres and the feedback loop that keeps the shoot meristem the right size. We follow primary growth into the anatomy of leaves, stems and roots, and secondary growth into wood and bark. Two quantitative ideas run through the chapter: the **Lockhart equation**, which says how fast a cell grows given its turgor and the properties of its wall, and a kinematic bookkeeping of growing roots and tree trunks. The cells and tissues themselves were introduced in [[plant-biology/plant-cells-tissues]].

## Modular, indeterminate growth

The shoot of a seed plant is a repeated unit. Each unit, the **phytomer**, consists of a **node**, where a leaf is attached; the **leaf** itself; an **axillary bud** in the angle (axil) between leaf and stem; and the **internode** of stem below it. The shoot apical meristem adds phytomers one after another; each axillary bud contains a meristem that can grow out into a branch made of more phytomers, or into a flower. A root system is built similarly from repeated branching, though without nodes and leaves.

::: definition Meristem {#def-meristem}
A **meristem** is a region of undifferentiated, dividing cells that persistently produces new cells for the plant body, maintaining at its centre a small population of slowly dividing **stem cells** whose daughters either remain stem cells or are displaced and differentiate. **Apical meristems** at the tips of shoots and roots produce the **primary** body: they lengthen the plant and make its leaves, branches and lateral roots. **Lateral meristems** — the **vascular cambium** and the **cork cambium** (phellogen) — form cylinders within stems and roots and produce the **secondary** body, which thickens them. **Intercalary meristems** at the bases of internodes and leaves in grasses let these organs elongate from below.
:::

Growth that continues indefinitely from a meristem is **indeterminate**; growth that stops once an organ is complete is **determinate**. Leaves and flowers are determinate organs: a leaf grows to a fixed form and stops. Shoots and roots are indeterminate — until a shoot meristem becomes a flower, which consumes it. The balance between the two is how plants regulate their architecture, and it is under genetic and environmental control (as in [[plant-biology/plant-responses]]).

::: warning The nail in the tree trunk
A nail hammered into a tree trunk 1.5 m above the ground will still be 1.5 m above the ground decades later — it will not be carried upwards as the tree grows taller. Stems lengthen only in the few centimetres just below the shoot apex, where young internodes are expanding; once an internode is mature it never elongates again. Trunks grow taller by adding new internodes at the top, and wider by adding wood around the outside. The same misconception appears in the belief that a branch rises as the tree grows; branches appear to rise only because the trunk thickens and the branch itself grows.
:::

## The shoot apical meristem

The shoot apical meristem (SAM) is a dome of small, densely cytoplasmic cells, typically 50–250 µm across depending on species, at the tip of every shoot, enclosed by the young leaves it has made. Two overlapping descriptions of its organisation are used.

- **Layers.** In flowering plants the outer one or two cell layers divide only **anticlinally** (with new walls perpendicular to the surface), so they stay as distinct sheets: the outermost **L1** gives rise to the epidermis, the **L2** below it to subepidermal tissues and, in flowers, the gametes. Beneath them the **L3**, or corpus, divides in all planes and forms the inner tissues. (This tunica–corpus organisation was described by Alexander Schmidt in 1924.) Because the layers are clonally separate, a mutation arising in one layer can produce a periclinal chimera, such as a plant with white-margined leaves in which the L2 lacks chlorophyll.
- **Zones.** The **central zone** at the summit contains the slowly dividing stem cells; the surrounding **peripheral zone** contains faster-dividing cells from which leaf primordia arise; and the **rib zone** beneath produces the inner tissues of the stem.

### A feedback loop keeps the meristem in balance

If stem cells divided too slowly the meristem would be used up; too fast, and it would grow without limit. Genetic analysis in *Arabidopsis thaliana* revealed a negative feedback loop that holds it steady. The homeodomain transcription factor **WUSCHEL** (WUS) is expressed in a small group of cells beneath the stem cells, the **organising centre**; WUS protein moves upwards through plasmodesmata into the stem cells and maintains them as stem cells. Among other things, it induces expression of *CLAVATA3* (*CLV3*). CLV3 is a small secreted peptide (12–13 amino acids after processing) that diffuses down to the organising centre and binds receptor kinases — CLAVATA1 and related receptors — that repress *WUS* transcription.

::: definition The WUS–CLV3 feedback loop {#def-wus-clv}
In the shoot apical meristem, **WUS**, made in the organising centre, promotes stem-cell identity and the expression of **CLV3** in the stem cells; **CLV3** peptide, signalling through CLAVATA1 and related receptors, represses *WUS*. An increase in the number of stem cells raises CLV3 output, which lowers WUS and so limits the stem-cell population; a decrease does the reverse. The loop is a negative feedback that keeps the number of stem cells approximately constant.
:::

The mutants confirm the logic. In *clv3* or *clv1* mutants the repression of *WUS* fails, WUS expression expands, and the meristem becomes enormous — sometimes flattened into a ridge, producing a broad, fasciated stem and flowers with extra organs. In *wus* mutants stem cells are not maintained: the meristem makes a few leaves and then terminates. The double mutant *clv3 wus* resembles *wus*, as expected if CLV3 acts by repressing WUS (WUS is epistatic). The core loop was established in 2000 by Ulrike Schoof, Thomas Laux and colleagues and by Ulrike Brand, Rüdiger Simon and colleagues; the network around it has since grown to include other receptors, cytokinin signalling (which promotes WUS) and further peptides, but the feedback remains its centre.

A second requirement is that meristem cells stay undifferentiated. Class I **KNOX** homeobox genes, such as *SHOOT MERISTEMLESS* in *Arabidopsis* and *KNOTTED1* in maize, are expressed throughout the meristem but switched off where leaf primordia form; their loss abolishes the meristem, and their ectopic expression in leaves produces lobed, meristem-like outgrowths. KNOX proteins act in part by keeping gibberellin low and cytokinin high in the meristem ([[plant-biology/plant-hormones]]).

::: application Bigger tomatoes from meristem genes
Domesticated tomatoes have far more locules (seed chambers) than the two of their wild ancestors, and therefore much larger fruit. Two of the mutations responsible, at the loci *fasciated* and *locule number*, affect the tomato orthologues of *CLV3* and *WUS*: by weakening the feedback loop they enlarge the floral meristem, giving more carpels. Daniel Rodríguez-Leal, Zachary Lippman and colleagues (2017) used CRISPR–Cas9 to create dozens of different deletions in the promoter of tomato *CLV3*, producing a graded series of fruit sizes and locule numbers — a demonstration that editing regulatory sequence can generate quantitative variation for breeders. Mutations in the same pathway in maize (*fasciated ear2*, a receptor) increase the number of kernel rows on the ear.
:::

### Making leaves

Leaves arise from the peripheral zone as **primordia**, bulges of cells whose position is set by local maxima of the hormone auxin. Each new primordium drains auxin from its surroundings, so the next one forms as far as possible from those already made; this is the self-organising mechanism behind the regular spiral and opposite arrangements of leaves, including the golden-angle phyllotaxis analysed in [[diversity-of-life/land-plants]]. A primordium soon acquires polarity: an upper (**adaxial**) side, specified by class III HD-ZIP transcription factors, and a lower (**abaxial**) side, specified by KANADI and YABBY genes and by small RNAs. The flat blade grows out at the boundary between the two; mutants that lose one identity make radially symmetric, needle-like leaves.

A mature leaf of a typical C3 eudicot such as a bean is a thin sheet, a few hundred micrometres thick:

- an **upper epidermis** with a thick cuticle and few or no stomata;
- one or two layers of columnar **palisade mesophyll** cells, packed with chloroplasts, where most light is absorbed;
- **spongy mesophyll** of irregular cells separated by large **intercellular air spaces** connected to the outside through stomata — the internal atmosphere through which CO₂ diffuses to the chloroplasts;
- a **lower epidermis** with most of the stomata;
- **veins**, vascular bundles with xylem towards the upper surface and phloem towards the lower, branching into a network so fine that few mesophyll cells are more than a few cells from a vein.

Leaves of grasses and other monocots usually have parallel veins; those of eudicots have a branched, reticulate network. C4 plants arrange their mesophyll in rings around the veins — the Kranz anatomy of [[plant-biology/c4-and-cam]].

## Stems

In the young stem the internodes elongate, separating the nodes, and the vascular tissue differentiates from strands of procambium left behind by the meristem. In eudicots and conifers the vascular bundles form a ring, each bundle with xylem on the inside and phloem on the outside; the ground tissue inside the ring is the **pith**, outside it the **cortex**. In monocots such as maize, bundles are scattered through the ground tissue. Between xylem and phloem in eudicot bundles lies a layer of cells that remains meristematic, the **fascicular cambium**, which can later link up with cells between the bundles to form a continuous vascular cambium.

Axillary buds are formed exogenously — from the surface layers at the node — and often remain dormant for a long time. A shoot apex inhibits the outgrowth of the buds below it, a phenomenon called **apical dominance**; cut off the apex, and buds below grow out, which is why pruning makes a shrub bushier. Apical dominance involves auxin from the apex, cytokinin from the roots, strigolactones and the sugar supply to the bud; it is discussed in [[plant-biology/plant-hormones]].

## Roots

### The root apical meristem

The root apical meristem lies just behind the **root cap**, a thimble of cells that protects the meristem as the root pushes through soil, secretes lubricating mucilage, senses gravity, and is continually sloughed off and renewed from the inside. At the centre of the meristem is the **quiescent centre**, a group of cells that divide very rarely — discovered by Frederick Clowes in 1956 by feeding roots radioactive thymidine and finding a central region that did not incorporate it. The quiescent centre is surrounded by stem cells (initials) for each tissue, and it keeps them in the stem-cell state: in *Arabidopsis*, killing a single quiescent-centre cell with a laser makes the adjacent initials differentiate (Claudia van den Berg, Ben Scheres and colleagues, 1997).

*Arabidopsis* is a convenient model because its root is simple: every tissue is a single layer, with — from the outside in — epidermis, one layer of cortex, one of endodermis, the pericycle and the vascular cylinder, and the cells in each file can be counted under the microscope. Two transcription-factor pathways specify the niche: **PLETHORA** proteins, expressed in a gradient centred on the quiescent centre and influenced by auxin, and the **SHORT-ROOT**–**SCARECROW** pathway, in which SHORT-ROOT made in the vascular cylinder moves one cell outwards and, with SCARECROW, specifies the endodermis and the quiescent centre.

### Zones of growth

Behind the tip a growing root shows a sequence of zones that every cell passes through as the tip moves on:

::: definition Developmental zones of the root {#def-root-zones}
- **Root cap**, covering the meristem.
- **Meristematic zone** (division zone): cells divide repeatedly while growing only modestly.
- **Elongation zone**: cells stop dividing and expand along the root axis, typically ten-fold or more, by taking up water into their vacuoles. Almost all the lengthening of the root occurs here, over a few millimetres.
- **Maturation zone** (differentiation zone): cells have reached their final length and differentiate; epidermal cells produce **root hairs**, the xylem matures, and the endodermis forms its **Casparian strip**.
:::

Because the zones stay at a fixed distance from the moving tip, the growing part of the root is in a steady state: the pattern stays the same while cells flow through it. This lets us connect cell production to root growth by simple bookkeeping.

::: proposition Cell flux in a steadily growing organ {#prop-flux}
Consider a file of cells in an organ (a root or a grass leaf) that grows at a constant rate, with a steady pattern of division and expansion. Measured relative to the tip, cells are produced in the meristem and leave the growth zone at their mature length $\ell$. If the organ elongates at velocity $v$ (length per time), then the rate at which each file produces cells is

$$
F = \frac{v}{\ell}.
$$ {#eq-flux}

Equivalently, the time between successive cells leaving the growth zone is $\ell/v$.
:::

::: proof
In a steady state the number of cells in the growth zone of a file is constant, so cells leave the zone (into the mature region) at the rate they are produced. Each cell that leaves adds length $\ell$ to the mature part of the file. Since the growth zone itself does not change in length, all the elongation of the organ is the addition of mature cells: $v = F\ell$.
:::

The assumptions are that growth is steady and that cells are not lost or added after maturation. The result is powerful because it does not require us to follow individual cells: from the elongation rate and a measurement of mature cell lengths we get the rate of cell production, and from cell counts in the meristem the average cell-cycle time.

::: example Cell production in a maize root {#ex-root-flux}
A maize primary root elongates at 3.0 mm h⁻¹, and its mature cortical cells are 200 µm long. (a) How many cells does each cortical file produce per hour? (b) If the meristem part of that file holds 120 cells, all cycling asynchronously with the same cell-cycle time $T$, estimate $T$.
::: solution
(a) By [[#eq-flux]], $F = v/\ell = 3000\ \text{µm h}^{-1}/200\ \text{µm} = 15$ cells per hour per file.

(b) An asynchronous population of $N$ cells that each divide once every $T$ hours grows at the rate $N\ln 2/T$ cells per hour (each cell contributes a relative rate $\ln2/T$). In a steady state the meristem's size is constant, so the cells it produces must all leave it: $N\ln2/T = F$. Hence

$$
T = \frac{N\ln 2}{F} = \frac{120\times0.693}{15} = 5.5\ \text{h}.
$$

The estimate rests on assumptions that can be checked: that every meristem cell is cycling, that no divisions add new files (periclinal divisions do, in the maize cortex), and that growth is steady. When kinematic estimates disagree with cell-cycle times measured directly, for example by labelling with nucleotide analogues, one of these assumptions has failed — which is how the method is used to learn about meristems.
:::
:::

### Root anatomy and lateral roots

In the maturation zone a root shows, from outside in: the **epidermis**, with root hairs that greatly increase its surface; the **cortex** of parenchyma, often with air spaces; the **endodermis**, whose Casparian strip blocks the apoplastic path into the vascular cylinder ([[plant-biology/mineral-nutrition]]); the **pericycle**, one or more layers of cells that retain the ability to divide; and the **stele**, with strands of xylem (often in a star-shaped arrangement in eudicots) alternating with strands of phloem.

Lateral roots arise **endogenously**, deep inside the parent root: a few pericycle cells opposite the xylem poles are primed by auxin, divide and form a primordium that pushes out through the endodermis, cortex and epidermis. Contrast shoot branches, which grow from axillary buds formed at the surface. The plant's root system results from repeated lateral branching (and, in grasses, from roots formed at stem nodes), and its form — a dominant **taproot** in many eudicots, a **fibrous** system of many similar roots in grasses — is shaped by soil water and nutrients, as roots proliferate where nitrate and phosphate are found.

::: quiz
A researcher wants to find the youngest root hairs on an *Arabidopsis* seedling. Where should she look?
- [ ] In the root cap, where cells are youngest
- [ ] In the meristematic zone, where cells divide
- [ ] In the middle of the elongation zone
- [x] At the start of the maturation zone, just behind the elongation zone
::: solution
Root hairs form from epidermal cells once they have stopped elongating, at the start of the maturation zone. Cells further back are older (the tip has moved on), so the hairs nearest the tip are the youngest. Root hairs never form in the cap, meristem or elongation zone — a hair growing out from a cell that is still elongating would be dragged through the soil and broken.
:::
:::

## Growth: turgor against the wall

What sets the speed at which a cell in the elongation zone grows? The cell expands by taking up water, which requires a water potential gradient into the cell, and its wall must yield to let it expand. James Lockhart (1965) combined these into a simple model.

::: proposition The Lockhart equation {#prop-lockhart}
Suppose that a growing cell's wall extends irreversibly only when the turgor pressure $P$ exceeds a **yield threshold** $Y$, and then at a rate proportional to the excess, with proportionality constant $\phi$, the **wall extensibility**. If water uptake is not limiting, the relative rate of volume increase is

$$
\frac{1}{V}\frac{\dd V}{\dd t} = \begin{cases} \phi\,(P - Y), & P > Y,\\ 0, & P \le Y. \end{cases}
$$ {#eq-lockhart}

If water uptake is also limiting, with relative hydraulic conductance $L$ and an osmotic driving force $\Delta\pi$, then at steady growth the turgor settles at a value between $Y$ and $\Delta\pi$ and

$$
\frac{1}{V}\frac{\dd V}{\dd t} = \frac{\phi L}{\phi + L}\,(\Delta\pi - Y).
$$ {#eq-lockhart-full}
:::

::: proof
The first equation is the definition of the model: the wall behaves as a Bingham plastic, with no flow below the yield stress and a flow rate proportional to the excess above it. (Because wall stress is proportional to $P$, by [[plant-biology/plant-cells-tissues#prop-hoop]], a threshold in stress becomes a threshold in pressure.) For the second, water enters at relative rate $L(\Delta\pi - P)$ — the water potential difference between outside and inside is $\Delta\pi - P$ when the outside has zero pressure. In steady growth the volume increase allowed by the wall must equal the water taken in: $\phi(P - Y) = L(\Delta\pi - P)$. Solving, $P = (\phi Y + L\Delta\pi)/(\phi + L)$, and substituting back gives $\phi(P - Y) = \phi L(\Delta\pi - Y)/(\phi + L)$.
:::

The model is phenomenological: $\phi$ and $Y$ are not molecular quantities but summarise the many processes — expansin activity, pectin chemistry, wall synthesis — that determine how readily the wall creeps. Plants control growth by changing them. Auxin acidifies the wall and raises $\phi$; cells that stop growing at the end of the elongation zone do so not because their turgor falls (it usually stays the same) but because their walls stiffen and $\phi$ drops towards zero. Growth is very sensitive to turgor near the threshold, which is why mild water stress stops growth well before it affects photosynthesis.

::: example Growth rate and doubling time {#ex-lockhart}
A cell in a growing hypocotyl has turgor 0.60 MPa, a yield threshold of 0.35 MPa and an extensibility of 0.25 MPa⁻¹ h⁻¹. (a) Find its relative growth rate and the time it takes to double its volume. (b) Drought lowers the turgor to 0.50 MPa with no change in wall properties. By what fraction does the growth rate fall?
::: solution
(a) By [[#eq-lockhart]], $\frac{1}{V}\frac{\dd V}{\dd t} = 0.25\times(0.60 - 0.35) = 0.0625$ h⁻¹. At constant relative rate, volume grows exponentially, $V = V_0e^{0.0625t}$, and doubles in $\ln 2/0.0625 = 11.1$ h.

(b) Now the rate is $0.25\times(0.50 - 0.35) = 0.0375$ h⁻¹, a fall of $1 - 0.0375/0.0625 = 40\,\%$ from a 17 % fall in turgor. Because only the excess over $Y$ drives growth, small changes in turgor near the threshold have a large effect.
:::
:::

::: widget plot
f: g*max(x - u, 0)
x: 0, 1.2
y: 0, 0.3
sliders: g=0.25:0.05:0.6:0.01; u=0.35:0:0.8:0.01
points: 0.6, 0.0625; 0.5, 0.0375
labels: \tfrac{1}{V}\tfrac{dV}{dt} = \phi(P - Y)
caption: The Lockhart relation: relative growth rate (h⁻¹, vertical) against turgor $P$ (MPa, horizontal) for a wall with extensibility $\phi$ (slider $g$, MPa⁻¹ h⁻¹) and yield threshold $Y$ (slider $u$, MPa). No growth occurs below the threshold; above it, growth rises linearly. The two points are the cell of [[#ex-lockhart]] before and after drought. Raising $\phi$ (wall loosening, as auxin does) steepens the line; raising $Y$ moves it to the right, so the same turgor gives less growth. Notice how, with $P$ close to $Y$, a small fall in turgor removes most of the growth.
:::

## Secondary growth: wood and bark

Most eudicot trees and shrubs, and all conifers, thicken their stems and roots year after year. Monocots generally do not: palms reach their full trunk diameter by primary growth before they grow tall, and their trunks do not thicken with age in the same way.

::: definition Vascular cambium and secondary tissues {#def-cambium}
The **vascular cambium** is a cylindrical lateral meristem between the xylem and the phloem. Its elongated **fusiform initials** divide **periclinally** (parallel to the surface), producing **secondary xylem** (wood) to the inside and **secondary phloem** to the outside; its short **ray initials** produce the **rays**, radial sheets of parenchyma that carry water, sugars and signals across the stem. The **cork cambium** (phellogen), formed in the cortex or later in the secondary phloem, produces **cork** (phellem) to the outside — dead cells with suberised walls — and a little **phelloderm** to the inside. Cork, cork cambium and phelloderm together form the **periderm**, which replaces the epidermis. **Bark** is everything outside the vascular cambium: secondary phloem and periderm.
:::

The cambium makes much more xylem than phloem, and the two fare very differently. Xylem accumulates: each year's wood is added outside the last, and the old wood stays in place. Phloem is crushed: the older secondary phloem is pushed outwards against the bark, stretched as the trunk widens, and eventually sloughed off with the outer bark. This is why a tree trunk is almost all wood, why only the youngest, innermost layer of phloem conducts, and why removing a ring of bark all the way round a trunk (**girdling**) kills the tree: the cut severs the phloem, the roots starve of sugar, and after months or years they die, even though the wood continues for a time to carry water upwards.

In seasonal climates the cambium is active in spring and summer and dormant in winter. Early in the season it produces **earlywood** with wide, thin-walled conduits; later, **latewood** with narrow, thick-walled ones. The abrupt change from the dense latewood of one year to the open earlywood of the next makes an **annual ring**. As the trunk widens, the inner wood stops conducting and is often filled with resins, gums or tannins and becomes **heartwood**, darker and more resistant to decay; the outer, functional **sapwood** carries water and stores starch in its living ray and axial parenchyma.

How much wood does a ring represent? A ring of the same width contains more wood the larger the trunk, because it is spread over a longer circumference.

::: example Ring width and basal area increment {#ex-bai}
A tree has a trunk radius of 25 cm (inside the bark) and its latest annual ring is 3 mm wide. Find the **basal area increment** — the cross-sectional area of wood added that year — and compare it with the increment for a young tree of radius 5 cm with the same ring width.
::: solution
The ring is an annulus between radii $R - w$ and $R$, with area $\pi\left(R^2 - (R - w)^2\right)$.

For $R = 25$ cm, $w = 0.3$ cm: $\pi(625 - 610.09) = 46.8$ cm². For $R = 5$ cm: $\pi(25 - 22.09) = 9.14$ cm².

The same ring width represents five times as much wood in the larger trunk (the ratio is close to $25/5$, since the area is approximately $2\pi R w$ for $w \ll R$). So a tree whose rings grow narrower with age is not necessarily growing more slowly; narrowing rings are expected even at constant wood production. Foresters therefore analyse basal area increments, not ring widths, when they ask whether trees are growing faster or slower — after correcting, too, for the effect of age and size.
:::
:::

::: widget plot
f: pi*(x^2 - (x - w/10)^2)
x: 0.5, 50
y: 0, 120
sliders: w=3:0.5:8:0.1
points: 25, 46.84; 5, 9.14
labels: \pi\left(R^2 - (R-w)^2\right)
caption: Basal area increment (cm², vertical) against trunk radius $R$ (cm, horizontal) for an annual ring of constant width $w$ (slider, in mm). The marked points are the two trees of [[#ex-bai]]. The increment is nearly proportional to $R$: a tree that kept producing the same amount of wood each year would lay down rings that narrow roughly as $1/R$. Increase $w$ to see how sensitive wood production is to ring width in a large tree.
:::

::: application Tree rings as a record of climate
Because ring width and wood density depend on the conditions of each growing season, a series of rings is a dated record of climate. **Dendrochronology** — dating by matching patterns of wide and narrow rings between trees, timbers and sub-fossil wood — was developed by the astronomer Andrew Ellicott Douglass in Arizona from the early twentieth century. By cross-dating overlapping series, chronologies have been extended back about 12,000 years in central Europe using oaks and pines preserved in river gravels and bogs, and tree rings are used to calibrate radiocarbon dates. The oldest individual trees known from ring counts are Great Basin bristlecone pines (*Pinus longaeva*) in California, more than 4,800 years old (as of 2026). Ring-width and density series underpin reconstructions of past temperature and drought, and the ring-by-ring chemistry of wood records volcanic eruptions and pollution.
:::

## The architecture of trees

The branching of a tree is not arbitrary. Leonardo da Vinci noted in his notebooks that the branches of a tree, at each height, have a total thickness equal to that of the trunk. In modern form:

::: proposition Leonardo's rule (empirical) {#prop-leonardo}
When a branch of diameter $d$ divides into daughter branches of diameters $d_1, d_2, \dots, d_n$, the total cross-sectional area is approximately conserved:

$$
d^{\,2} \approx d_1^{\,2} + d_2^{\,2} + \dots + d_n^{\,2}.
$$ {#eq-leonardo}

This is an **observed regularity**, not a law: measured exponents in $d^\Delta = \sum d_i^\Delta$ cluster around $\Delta = 2$ in many tree species but range roughly from 1.8 to 2.3.
:::

Several explanations have been proposed, and they are not mutually exclusive. The **pipe model** (Shinozaki and colleagues, 1964) supposes that each unit of leaf area is served by a fixed cross-section of conducting xylem running all the way down, so that total area is conserved at each branching. Mechanical models suppose that branches are built to resist wind loads with a constant safety margin, and show that this too gives exponents close to 2 (Christophe Eloy, 2011). Whatever the reason, the rule shows that the hydraulic and mechanical design of a tree is constrained, a theme continued in [[plant-biology/water-transport]].

::: example Applying Leonardo's rule {#ex-leonardo}
A branch 10 cm in diameter divides into two equal daughters. (a) What diameter does Leonardo's rule predict for them? (b) A different branch, 10 cm thick, divides into daughters of 8 cm and 6 cm. Does it obey the rule?
::: solution
(a) $10^2 = 2d_1^2$, so $d_1 = 10/\sqrt2 = 7.07$ cm.

(b) $8^2 + 6^2 = 64 + 36 = 100 = 10^2$: it obeys the rule exactly. Notice that two daughters 7.07 cm thick each have half the parent's area, but together their combined circumference ($2\times7.07\pi$) is larger than the parent's ($10\pi$) — branching increases the surface over which cambium and bark operate even when wood area is conserved.
:::
:::

::: history
The idea that plants grow from a few persistent embryonic regions goes back to Caspar Friedrich Wolff (1759), who described the growing shoot tip as undifferentiated. Carl Nägeli named the meristem (*Meristem*, from Greek *merizein*, to divide) in 1858; Johannes von Hanstein proposed in 1868 that distinct layers of the apex give rise to the epidermis, cortex and stele (the histogen theory), and Alexander Schmidt (1924) introduced the tunica–corpus description of the shoot apex. Frederick Clowes found the quiescent centre in 1956. James Lockhart's equation (1965) provided the first quantitative model of cell growth, tested in the 1970s and 1980s with the pressure probe, which measures turgor directly in single cells. In *Arabidopsis*, *clavata* mutants were characterised by Steven Clark, Elliot Meyerowitz and colleagues from 1993, *WUSCHEL* by Thomas Laux and colleagues in 1996, and the WUS–CLV3 feedback loop in 2000. The founder of dendrochronology, A. E. Douglass, set up the Laboratory of Tree-Ring Research in Tucson in 1937.
:::

## Summary

::: summary
- Plants grow throughout life by adding modular units (**phytomers**: node, leaf, axillary bud, internode) from **meristems**. Apical meristems make the primary body; the vascular cambium and cork cambium make the secondary body.
- The shoot apical meristem has clonal layers (L1, L2, L3) and zones (central, peripheral, rib). Its stem cells are held in balance by negative feedback: WUS from the organising centre promotes stem cells and *CLV3*; CLV3 peptide represses *WUS*. KNOX genes keep the meristem undifferentiated.
- Leaf primordia form at auxin maxima, acquire adaxial–abaxial polarity, and develop into a blade of epidermis, palisade and spongy mesophyll and veins.
- The root apical meristem has a quiescent centre that maintains surrounding stem cells; behind the cap lie zones of division, elongation and maturation. Lateral roots arise from the pericycle. In steady growth, cell production per file is $F = v/\ell$.
- The **Lockhart equation** $\frac{1}{V}\frac{dV}{dt} = \phi(P - Y)$ relates growth to turgor in excess of a yield threshold; plants regulate growth mainly by changing wall extensibility $\phi$.
- The vascular cambium makes wood inwards and phloem outwards; wood accumulates in annual rings, phloem is crushed and shed with the bark. Basal area increment $\pi(R^2 - (R-w)^2) \approx 2\pi Rw$ grows with radius at constant ring width.
- Branching approximately conserves cross-sectional area (Leonardo's rule, an empirical regularity).
:::

Growth of the whole plant depends on water reaching the expanding cells and the leaves. How water moves through soil, roots, xylem and leaves, and how sugars return through the phloem, is the subject of [[plant-biology/water-transport]].

## Exercises

::: exercise The Lockhart equation {level=1 check="0.09"}
A cell has turgor 0.70 MPa, yield threshold 0.40 MPa and wall extensibility 0.30 MPa⁻¹ h⁻¹. What is its relative growth rate, in h⁻¹?
::: solution
$\phi(P - Y) = 0.30\times0.30 = 0.09$ h⁻¹ (a volume doubling time of $\ln 2/0.09 = 7.7$ h).
:::
:::

::: exercise Cells per hour {level=1 check="16"}
A root elongates at 2.4 mm h⁻¹ and its mature epidermal cells are 150 µm long. How many cells does each epidermal file produce per hour?
::: solution
$F = v/\ell = 2400/150 = 16$ cells per hour ([[#eq-flux]]).
:::
:::

::: exercise A ring of wood {level=1 check="37.6"}
A trunk of radius 30 cm adds a 2 mm ring. What is the basal area increment in cm², to one decimal place?
::: solution
$\pi(30^2 - 29.8^2) = \pi\times11.96 = 37.6$ cm².
:::
:::

::: exercise What is in the bark? {level=1}
List, from the outside inwards, the tissues you would cut through in a 20-year-old oak trunk on the way from the outer surface to the centre, and say which are alive.
::: solution
Outer bark (old periderms and dead secondary phloem; dead) → cork (phellem; dead) → cork cambium (alive) → phelloderm (alive) → secondary phloem, of which only the innermost, youngest layer conducts (sieve tubes alive, with companion and parenchyma cells) → vascular cambium (alive) → sapwood (conduits and fibres dead; ray and axial parenchyma alive) → heartwood (dead) → at the very centre, the remains of the primary xylem and pith. Note that "bark" is everything outside the vascular cambium.
:::
:::

::: exercise Meristem mutants {level=2}
(a) Predict the phenotype of an *Arabidopsis* plant that overexpresses *CLV3* throughout the shoot apex. (b) Explain why the *clv3 wus* double mutant looks like *wus*, and what this tells you about the order of action of the two genes. (c) A *clv3* mutant has flowers with four or more carpels instead of two. Why does a meristem defect affect carpel number?
::: solution
(a) Excess CLV3 represses *WUS* throughout; without WUS the stem cells are not maintained, so the meristem terminates early — a *wus*-like phenotype (this was observed by Brand and colleagues, 2000).
(b) In the double mutant, the loss of CLV3 would normally expand WUS, but there is no WUS to expand; the phenotype is that of losing WUS. WUS is epistatic: it acts downstream of CLV3 in this pathway, and CLV3's effect on the meristem depends on WUS.
(c) The floral meristem uses the same WUS–CLV3 loop. In *clv3*, the floral meristem is enlarged, with more stem cells, so it has more cells from which the innermost whorl — the carpels — forms before the meristem terminates; extra carpels result. (Floral meristem termination itself requires the repression of *WUS* by the carpel-identity gene *AGAMOUS*; see [[plant-biology/plant-reproduction]].)
:::
:::

::: exercise Girdling {level=2}
In an orchard experiment, a ring of bark 1 cm wide is removed from the trunk of an apple tree in early summer, down to the wood. (a) Predict what happens to the fruit on the tree that season, and to the roots over the following year. (b) Why does the tree's water supply continue? (c) Growers sometimes make a very narrow girdle on a branch, which heals within weeks. Why might they do this?
::: solution
(a) The phloem is severed, so sugars from the leaves cannot reach the roots. Above the girdle sugars accumulate, so fruit on the tree often grows larger and sweeter that season. The roots, deprived of sugar, draw down their reserves and eventually die; once they fail, water uptake fails and the whole tree dies, typically within one to a few years.
(b) Water travels in the xylem (sapwood), which is inside the vascular cambium and is untouched by bark removal.
(c) A narrow, temporary girdle diverts sugar to the fruit and leaves of that branch for a few weeks — increasing fruit set or size — and then heals as the cambium bridges the gap with new phloem, so the branch survives.
:::
:::

::: exercise Turgor or walls? {level=2}
Growing and non-growing cells of a pea epicotyl were measured with a pressure probe. Cells in the growth zone had a turgor of 0.55 MPa; cells just above the zone, which had stopped growing, had a turgor of 0.58 MPa. (a) Using the Lockhart equation, what does this imply about why the cells stopped growing? (b) How would you test your interpretation? (c) An auxin treatment increases the growth rate of the growth zone by 50 % within 20 minutes without changing turgor. Which Lockhart parameter has changed, and what molecular mechanism is likely?
::: solution
(a) Turgor did not fall — it rose slightly — so growth stopped because the wall changed: extensibility $\phi$ fell to about zero, or the yield threshold $Y$ rose above $P$, or both. Growth cessation is controlled by wall stiffening.
(b) Measure wall properties directly: for example, by creep tests (extension of isolated walls under a constant load, at acidic and neutral pH, with and without added expansins), or by applying controlled changes in turgor (with osmotica) to intact tissue and measuring the growth response, which gives $\phi$ from the slope and $Y$ from the intercept.
(c) With $P$ unchanged, $\phi(P - Y)$ rose by half, so $\phi$ increased (or $Y$ fell). Auxin activates plasma-membrane H⁺-ATPases, acidifying the wall and activating expansins: acid growth ([[plant-biology/plant-hormones]]).
:::
:::

::: exercise A growth balance {level=3}
Using [[#eq-lockhart-full]], a cell has $\phi = 0.3$ MPa⁻¹ h⁻¹, $Y = 0.3$ MPa, an osmotic driving force $\Delta\pi = 0.9$ MPa, and relative hydraulic conductance $L$. (a) Find the steady turgor and growth rate when $L = 0.3$ MPa⁻¹ h⁻¹ and when $L = 3$ MPa⁻¹ h⁻¹. (b) Which limits growth in each case: the wall or water supply? (c) Why do most measurements suggest that growing cells in well-watered tissue are wall-limited?
::: solution
(a) $P = (\phi Y + L\Delta\pi)/(\phi + L)$. For $L = 0.3$: $P = (0.09 + 0.27)/0.6 = 0.60$ MPa; rate $= \phi(P - Y) = 0.3\times0.30 = 0.090$ h⁻¹. For $L = 3$: $P = (0.09 + 2.7)/3.3 = 0.845$ MPa; rate $= 0.3\times0.545 = 0.164$ h⁻¹.
(b) With equal $\phi$ and $L$ the two are co-limiting: turgor sits halfway between $Y$ and $\Delta\pi$. With $L \gg \phi$, turgor approaches $\Delta\pi$ and the rate approaches $\phi(\Delta\pi - Y) = 0.18$ h⁻¹: wall-limited. (With $L \ll \phi$ the rate would approach $L(\Delta\pi - Y)$, limited by water.)
(c) Turgor in growing cells is usually found close to the value in non-growing cells of similar osmotic content, i.e. close to $\Delta\pi$, which implies $L \gg \phi$. The water-potential gradients needed to supply growth are small, typically a few hundredths of a megapascal. Under drought, however, water supply can become limiting.
:::
:::

::: exercise Monocot trunks {level=3}
A coconut palm 20 m tall has a trunk about 30 cm in diameter along most of its length; an oak of the same height might have a trunk 60 cm thick at the base, tapering upwards. (a) Explain the difference in terms of meristems. (b) Using Leonardo's rule and the pipe model, explain why the oak's trunk tapers while the palm's does not. (c) What problem does the palm face that the oak does not, and how might it cope?
::: solution
(a) The palm has no vascular cambium; its stem reaches nearly full width below the apex through a primary thickening meristem and then elongates without thickening further. The oak thickens continuously by secondary growth, adding a ring every year, so its oldest parts — at the base — are thickest.
(b) The oak branches repeatedly; by Leonardo's rule each branching conserves cross-sectional area, so the trunk must carry the summed area of all branches above, and its area decreases upwards as branches leave it. The pipe-model interpretation is that each leaf needs its own xylem path to the ground. The palm does not branch: one crown of leaves at the top is supplied by a trunk of constant area.
(c) The palm cannot add new xylem: the vascular bundles made when that part of the trunk formed must conduct water for the whole life of the palm, which may be many decades, so damage to them (embolism, injury) cannot be repaired by new wood. Palms rely on many redundant, scattered bundles with long-lived living cells, and on embolism-resistant xylem; a palm's trunk is also mechanically reinforced by fibres in the bundles rather than by annual wood.
:::
:::
