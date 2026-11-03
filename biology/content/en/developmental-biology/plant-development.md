An oak tree and a mouse both begin as a single fertilised egg, but they build their bodies in fundamentally different ways. The mouse embryo makes almost all its organs before birth; its cells migrate long distances; and the adult has a fixed body plan — one head, four limbs. The acorn contains an embryo with only the rudiments of a plant: a shoot tip, a root tip and one or two seed leaves. Everything else — every branch, leaf, flower and root of the tree — is made after germination, continuously, for centuries, from small groups of dividing cells at the tips of shoots and roots called **meristems**. The number of leaves and branches is not fixed but responds to light, gravity, nutrients and damage.

Plant cells are enclosed in walls and glued to their neighbours, so they cannot migrate: plant morphogenesis is entirely a matter of where cells divide, in which plane, and how much and in which direction they expand. And many plant cells, even mature ones, can be induced to form a whole new plant. These differences make plants a second, independent experiment in multicellular development — land plants and animals evolved multicellularity separately — and comparing the two shows which principles are general. Signalling between cells, positional information, transcription-factor networks with feedback and homeotic selector genes all reappear, built from different molecules. The plant hormones themselves are described in [[plant-biology/plant-hormones]] and the organisation of the plant body in [[plant-biology/plant-form]]; here we concentrate on how pattern is made.

## Embryogenesis in *Arabidopsis*

Flowering plants undergo **double fertilisation**: one sperm cell fuses with the egg cell to form the zygote, and a second fuses with the central cell to form the triploid **endosperm**, the nutritive tissue of the seed ([[plant-biology/plant-reproduction]]). The *Arabidopsis thaliana* embryo develops inside the ovule with an almost invariant pattern of early divisions, which makes it the reference for plant embryology.

The zygote elongates and divides asymmetrically. The small **apical cell** gives rise to almost all of the embryo proper. The large **basal cell** divides transversely to form a filament, the **suspensor**, which pushes the embryo into the endosperm and supplies it; the uppermost suspensor cell, the **hypophysis**, contributes to the embryo — it forms the quiescent centre and columella of the future root. The apical cell divides to give a 2-cell, then 4-cell and **octant** (8-cell) stage; at the **dermatogen** (16-cell) stage, periclinal divisions (parallel to the surface) separate an outer layer, the **protoderm**, which forms the epidermis, from inner cells. Later stages are named by their shape: **globular**, **transition**, **heart** (when the two cotyledons begin to grow out) and **torpedo**. The mature embryo has:

- an **apical–basal axis** with, from top to bottom, the shoot apical meristem between the cotyledons, the hypocotyl (embryonic stem), the embryonic root and the root apical meristem;
- a **radial pattern** of concentric tissues: epidermis on the outside, then ground tissue (cortex and endodermis), and the vascular tissue in the centre.

::: definition Meristem {#def-meristem}
A **meristem** is a region of undifferentiated, dividing cells that persists through the life of a plant and continually produces new cells for growth and organ formation. The **shoot apical meristem** (SAM) makes the stem, leaves, buds and flowers; the **root apical meristem** (RAM) makes the root. Each contains a small population of **stem cells** maintained by a signalling centre, the **organising centre** in the shoot and the **quiescent centre** in the root.
:::

### Genetic analysis of the embryo

In 1991 Ulrike Mayer, Gerd Jürgens and colleagues screened *Arabidopsis* for mutations that disrupted the pattern of seedlings and found classes that recall the segmentation classes of *Drosophila* ([[developmental-biology/segmentation-hox]]). **Apical–basal** mutants lack a region along the axis: *gurke* lacks the cotyledons and shoot meristem, *fackel* the hypocotyl, and *monopteros* the root and hypocotyl. **Radial** mutants disturb the concentric tissues, and **shape** mutants such as *fass* make abnormally shaped seedlings with all elements present, because cell-division planes are disordered — evidence that the pattern of tissues does not depend on a precise sequence of divisions.

The key organiser of the apical–basal axis is the hormone **auxin**, moved directionally from cell to cell by efflux carriers of the PIN family, which sit at one side of each cell. Early in embryogenesis, PIN7 in the suspensor pumps auxin upwards into the proembryo. Around the 32-cell stage, the polarity reverses: PIN1 in the embryo and PIN7 in the suspensor now direct auxin downwards, creating an **auxin maximum** in the hypophysis (Jiří Friml and colleagues, 2003). There, auxin is read by the auxin-response transcription factor MONOPTEROS (ARF5), released from its inhibitor BODENLOS (IAA12) when auxin triggers the inhibitor's degradation; MONOPTEROS activates genes, including signals that move to the hypophysis, which specify the root. Mutants that cannot form or respond to the auxin maximum (*monopteros*, *bodenlos*, or *gnom*, which disrupts the trafficking of PIN proteins) form no embryonic root.

::: intuition Auxin as a self-organising signal
Auxin is not a classical morphogen made at a fixed source. It is made fairly widely, but its distribution is controlled by its own transport: PIN proteins pump it, and auxin influences the placement of PIN proteins. Feedback between a signal and the polarity of its own transport can concentrate it into maxima and channels — in embryos, at the tips of new organs and in the strands that will become veins. This makes auxin the plant counterpart of both a gradient and a self-organising Turing-type system ([[developmental-biology/organogenesis]]).
:::

## The shoot apical meristem

The SAM of *Arabidopsis* is a dome about 50–100 µm across, containing a few hundred cells. It is organised in two overlapping ways.

- **Layers.** The outer two cell layers, **L1** and **L2**, divide almost exclusively anticlinally (perpendicular to the surface), so they remain as distinct sheets — the **tunica**; the inner **L3**, or **corpus**, divides in all planes. L1 forms the epidermis of all shoot organs; L2 and L3 the internal tissues. Periclinal chimaeras, in which one layer differs genetically from the others, show that cells in each layer tend to stay in it, but cells that are displaced into another layer adopt its fate — position overrides lineage.
- **Zones.** A **central zone** at the summit contains slowly dividing stem cells; around it, the **peripheral zone** contains faster-dividing cells that form leaf or flower primordia; below, the **rib zone** produces the internal tissues of the stem. Beneath the central zone, in L3, lies the **organising centre**.

### The WUSCHEL–CLAVATA feedback loop

The stem cells of the SAM are maintained by a negative feedback loop discovered in *Arabidopsis* in the 1990s.

- The organising centre expresses **WUSCHEL** (WUS), a homeodomain transcription factor (Thomas Laux, Klaus Mayer and colleagues, 1996 and 1998). *wus* mutants form a shoot meristem that terminates early in a few leaves: WUS is needed to keep the stem cells above it. WUS protein moves from the organising centre into the central zone through plasmodesmata and there maintains stem-cell identity.
- In the stem cells, WUS activates **CLAVATA3** (CLV3), which encodes a small secreted peptide.
- CLV3 peptide binds receptor kinases including **CLAVATA1** in the cells below, and their signalling represses *WUS*.

So stem cells signal back to restrict the organising centre that maintains them. Mutants in *clv1* or *clv3* have enlarged meristems with many stem cells (*clavatus* means club-shaped, after their swollen fruit), while overexpressing *CLV3* depletes the meristem as *wus* mutants do (Ulrike Brand, Rüdiger Simon and colleagues, 2000; Heiko Schoof, Laux and colleagues, 2000). A further homeodomain protein, SHOOTMERISTEMLESS, of the KNOX family, keeps cells throughout the meristem from differentiating.

::: proposition Negative feedback buffers meristem size {#prop-wus-clv}
Let $W$ be the level of WUS activity and $C$ that of CLV3 signalling, in units in which both have unit decay rate and $C$ is activated in proportion to $W$:

$$
\frac{dW}{dt} = \frac{a}{1 + C^n} - W, \qquad \frac{dC}{dt} = W - C.
$$ {#eq-wus-clv}

This system has a single steady state, $C^* = W^*$ with $W^*(1 + W^{*n}) = a$, which is stable for all $a > 0$ and $n \ge 1$. For large $a$, $W^* \approx a^{1/(n+1)}$: the steady-state stem-cell signal grows only as a small power of the drive $a$, so a doubling of $a$ raises $W^*$ by a factor of only about $2^{1/(n+1)}$. Assumptions: two well-mixed variables, Hill-type repression, first-order decay; spatial structure and cell numbers are ignored.
:::

::: proof
At steady state $C = W$ and $W(1 + W^n) = a$; the left side increases strictly from 0 to $\infty$, so the solution is unique. The Jacobian is $\begin{pmatrix} -1 & -r \\ 1 & -1\end{pmatrix}$ with $r = a n C^{*\,n-1}/(1 + C^{*n})^2 \ge 0$; its trace is $-2 < 0$ and its determinant $1 + r > 0$, so both eigenvalues have negative real parts and the state is stable. For large $a$, $W^{*n+1} \approx a$.
:::

::: widget phaseplane
f: a/(1 + y^n) - x
g: x - y
x: 0, 3
y: 0, 3
sliders: a=4:0.5:16:0.1; n=2:1:4:0.1
caption: The WUSCHEL–CLAVATA3 negative feedback loop [[#eq-wus-clv]]: $x$ is WUS activity and $y$ CLV3 signalling. The nullclines cross once, at a stable steady state; trajectories from anywhere spiral or flow into it. Double the WUS drive $a$ from 4 to 8 and watch the steady state move only from about 1.38 to 1.83 (for $n = 2$); with $n = 4$ it moves even less. This buffering is how negative feedback keeps the stem-cell population roughly constant despite fluctuations.
:::

::: example How strongly does feedback buffer the meristem? {#ex-buffering}
In the model [[#eq-wus-clv]], compute the steady state $W^*$ for $a = 4$ and $a = 8$ with $n = 2$, and compare the fold change in $W^*$ with the fold change in $a$. Then do the same for a system without feedback ($dW/dt = a - W$).
::: solution
With $n = 2$, solve $W(1 + W^2) = a$ numerically: for $a = 4$, $W^* = 1.379$ (check: $1.379\times(1 + 1.901) = 4.00$); for $a = 8$, $W^* = 1.834$ ($1.834\times4.363 = 8.00$). The fold change is $1.834/1.379 = 1.33$, compared with $2^{1/3} = 1.26$ from the large-$a$ approximation. Without feedback, $W^* = a$, which doubles. Feedback has reduced a twofold perturbation to about a 33 % change; with $n = 4$ the change is only about 19 %. This is the logic behind the phenotypes: removing CLV3 removes the feedback, and the meristem keeps expanding.
:::
:::

::: application Bigger fruits and more kernels
Variation in the *CLAVATA*–*WUSCHEL* pathway has been selected, unknowingly, during crop domestication. The large, many-chambered fruits of some tomato varieties result partly from mutations at the *fasciated* and *locule number* loci, which reduce *CLV3* expression or alter *WUS* regulation, enlarging the floral meristem and so the number of carpels. In maize, weak alleles of CLAVATA-pathway genes increase the number of kernel rows on the ear. Zachary Lippman's group showed in 2017 that editing the promoter of tomato *CLV3* with CRISPR–Cas9 produces a graded series of fruit sizes, illustrating how quantitative variation can be generated from a single regulatory sequence. The broader use of such methods in agriculture, and its regulation, is covered in [[biotechnology/agricultural-biotechnology]].
:::

## The root apical meristem

The root meristem is simpler and more regular than the shoot's, and its cell files can be traced back to their origins. At its centre lies the **quiescent centre** (QC), four cells in *Arabidopsis* that divide very rarely. Around it lie the **initials** (stem cells), each producing a file of cells: initials of the columella (the root cap's gravity-sensing core), of the epidermis and lateral root cap, of the cortex and endodermis, and of the vascular tissue. Daughters of the initials divide a few more times in the **meristematic zone**, then stop and expand up to many times their length in the **elongation zone**, and differentiate in the **differentiation zone**, where root hairs appear.

Position, not lineage, specifies these cells. Claudia van den Berg, Ben Scheres and colleagues used a laser to kill single cells in the *Arabidopsis* root meristem in 1995 and 1997. When a cortex initial was killed, the neighbouring cell of the pericycle divided into the gap and adopted cortex-initial fate. When the QC was ablated, the adjacent initials differentiated, showing that the QC maintains the stem cells around it by short-range signals — a **stem-cell niche**, like those of animals ([[developmental-biology/stem-cells-regeneration]]).

Two mechanisms specify the root's radial pattern and stem cells:

- **PLETHORA** transcription factors (Mitsuhiro Aida, Scheres and colleagues, 2004) are expressed in a gradient, highest in the QC, following the auxin maximum there. High PLETHORA maintains stem cells, intermediate levels promote division, and low levels allow differentiation — a gradient read by thresholds, much like Bicoid.
- **SHORT-ROOT**, a transcription factor made in the vascular tissue, moves one cell layer outwards into the adjacent cells (Keiji Nakajima, Philip Benfey and colleagues, 2001). There, with **SCARECROW**, it triggers an asymmetric division of the cortex–endodermis initial daughter, producing one cell of endodermis (which keeps SHR) and one of cortex (which does not). The mobile transcription factor, confined to one cell layer by the way it is trapped in the nuclei it enters, places the endodermis exactly one layer outside the vascular tissue.

::: proposition Steady-state growth of a root {#prop-root-growth}
If a root grows at steady state, with each cell file producing new cells at a rate $P$ (cells per unit time) and every cell expanding to a final length $\ell$ before ceasing to grow, the root lengthens at rate

$$
\frac{dL}{dt} = P\,\ell .
$$

This holds for any steady state, whatever the details of how division and expansion are distributed along the root, because at steady state each new cell eventually adds exactly $\ell$ to the length.
:::

::: example How fast does a root grow? {#ex-root-growth}
In a root, each cortical cell file produces about 1 new cell per hour, and mature cortical cells are about 150 µm long (illustrative values of the right order for *Arabidopsis*). (a) What is the growth rate? (b) A mutant has the same cell length but a growth rate of 1.8 mm per day. What is its cell production rate? (c) A different treatment halves the final cell length but does not change cell production. How does the growth rate change, and what does this tell you about how to interpret root-length phenotypes?
::: solution
(a) $dL/dt = P\ell = 1\ \mathrm{h^{-1}}\times150\ \mathrm{\mu m} = 150$ µm h⁻¹, or 3.6 mm per day.

(b) $P = (1800\ \mathrm{\mu m\,day^{-1}})/(150\ \mathrm{\mu m}) = 12$ cells per day, 0.5 h⁻¹: half the wild-type rate, so the mutant affects cell production (through the size of the meristem or the length of the cell cycle).

(c) Growth rate halves, to 75 µm h⁻¹. A short root can therefore result from slower production of cells or from shorter mature cells, and measuring the length of mature cells in the differentiation zone distinguishes the two — a standard first step in analysing root mutants (Gerrit Beemster and Tobias Baskin developed this kinematic analysis for *Arabidopsis* in 1998).
:::
:::

## Phyllotaxis: the arrangement of leaves

Leaves and flowers arise on the flanks of the SAM in a regular sequence. The arrangement, **phyllotaxis**, is most often a spiral in which each new primordium appears at an angle of about 137.5° from the previous one around the stem — the **golden angle**. Viewed from above, the primordia then form two families of spirals (**parastichies**), winding in opposite directions, whose numbers are almost always consecutive **Fibonacci numbers** (1, 1, 2, 3, 5, 8, 13, 21, 34, 55, …): 21 and 34 in a pine cone's scales, 34 and 55 or 55 and 89 in the florets of a large sunflower head.

::: proposition The golden angle {#prop-golden-angle}
The golden angle is the smaller of the two arcs into which a circle is divided in the golden ratio $\varphi = (1 + \sqrt5)/2 \approx 1.618$:

$$
\alpha = 360^\circ\Bigl(1 - \frac{1}{\varphi}\Bigr) = \frac{360^\circ}{\varphi^2} \approx 137.51^\circ.
$$

Because $\varphi$ is the irrational number worst approximated by fractions, successive primordia placed at this angle never line up exactly; the best rational approximations $360^\circ\times F_{k}/F_{k+2}$ (144°, 135°, 138.5°, 137.1°, …, with $F_k$ the Fibonacci numbers) explain why the visible parastichies come in Fibonacci numbers.
:::

How does the meristem achieve this precision? Wilhelm Hofmeister proposed in 1868 that each new primordium arises in the largest available gap, as far as possible from the existing ones; Stéphane Douady and Yves Couder showed in 1992, with drops of magnetised fluid repelling each other as they were added at the centre of a dish, that this simple rule of mutual inhibition, with appropriate timing, produces Fibonacci spirals spontaneously. The molecular basis is auxin: Didier Reinhardt, Cris Kuhlemeier and colleagues showed in 2003 that primordia form where auxin accumulates, and that applying auxin to a tomato meristem whose own transport was blocked induces a leaf where it is applied. Each young primordium is a sink that draws auxin from its surroundings through PIN1, depleting the zone around it; the next primordium forms where auxin can next build up — farthest from the existing ones. Computational models of this transport feedback reproduce spiral and other phyllotactic patterns.

::: example Fibonacci angles {#ex-fibonacci}
(a) Compute the golden angle. (b) Compute the divergence angles $360^\circ\times2/5$, $360^\circ\times3/8$, $360^\circ\times5/13$ and $360^\circ\times8/21$, and say how far each is from the golden angle. (c) If primordia were placed at exactly 144° (= 2/5 of a turn), what would happen after five primordia, and why is this a bad arrangement for leaves?
::: solution
(a) $\alpha = 360/\varphi^2 = 360/2.618 = 137.51^\circ$.

(b) $144^\circ$ ($+6.5^\circ$), $135^\circ$ ($-2.5^\circ$), $138.46^\circ$ ($+0.95^\circ$), $137.14^\circ$ ($-0.37^\circ$): the ratios of alternate Fibonacci numbers approach the golden angle from alternate sides, ever more closely.

(c) After five primordia the sixth would be at $5\times144^\circ = 720^\circ$, exactly two turns, directly above the first, and the leaves would form five vertical ranks (orthostichies), each shading the one below. The golden angle never repeats exactly, so leaves are spread as evenly as possible around the stem at every stage of growth — although whether this benefit explains its evolution is debated, since the angle arises naturally from the inhibitory-field mechanism.
:::
:::

## Flowers: homeotic genes in plants

When a plant flowers, the SAM becomes an **inflorescence meristem** which produces **floral meristems** instead of leaves. A typical flower of *Arabidopsis* has four concentric **whorls** of organs: four sepals in whorl 1, four petals in whorl 2, six stamens in whorl 3, and two fused carpels in whorl 4. Floral meristems are **determinate**: unlike the SAM, they stop after making the carpels.

As in *Drosophila*, mutations that transform one organ into another — **homeotic mutations** — revealed the genes. In 1991 Enrico Coen and Elliot Meyerowitz, from mutants of *Arabidopsis* and of snapdragon (*Antirrhinum majus*), proposed the **ABC model**.

::: definition The ABC model of flower development {#def-abc}
Three classes of homeotic gene act in overlapping pairs of whorls:
- **Class A** (in *Arabidopsis*, *APETALA1* and *APETALA2*) in whorls 1 and 2;
- **Class B** (*APETALA3* and *PISTILLATA*) in whorls 2 and 3;
- **Class C** (*AGAMOUS*) in whorls 3 and 4.

Organ identity is set by the combination: A alone gives **sepals**, A + B **petals**, B + C **stamens**, C alone **carpels**. A and C activities are mutually antagonistic: A represses C in whorls 1 and 2, and C represses A in whorls 3 and 4, so that if one is lost the other spreads into its domain. C also makes the floral meristem determinate, by repressing *WUSCHEL*.
:::

::: widget venn
sets: 3
expr: (A & B) - C
labels: A; B; C
caption: The ABC model as a combinatorial code, with A standing for the class A genes (*AP1*, *AP2*), B for class B (*AP3*, *PI*) and C for class C (*AG*). Each region of the diagram is a combination of gene activities; the shaded region, $(A \cap B) \setminus C$, is the combination that specifies petals. Type other expressions to shade sepals (`A - B - C`), stamens (`(B & C) - A`) and carpels (`C - A - B`). Regions containing both A and C do not occur in a wild-type flower, because A and C repress each other, and the region with none of the three corresponds to leaf-like organs, as in a triple mutant.
:::

The model's power is predictive.

::: quiz
In an *Arabidopsis* flower, class B gene activity is experimentally extended into whorl 1 (for example by expressing *AP3* and *PI* under a promoter active in all whorls). What organs form in whorls 1 to 4?
- [ ] Sepal, petal, stamen, carpel (unchanged)
- [x] Petal, petal, stamen, stamen
- [ ] Petal, petal, stamen, carpel
- [ ] Sepal, sepal, carpel, carpel
::: solution
With B everywhere, whorl 1 has A + B (petals), whorl 2 A + B (petals), whorl 3 B + C (stamens) and whorl 4 B + C (stamens). The result is a flower with two whorls of petals and two of stamens, which is what ectopic expression of B genes produces.
:::
:::

| genotype | whorl 1 | whorl 2 | whorl 3 | whorl 4 |
|---|---|---|---|---|
| wild type | sepal (A) | petal (AB) | stamen (BC) | carpel (C) |
| A mutant (*ap2*) | carpel (C) | stamen (BC) | stamen (BC) | carpel (C) |
| B mutant (*ap3* or *pi*) | sepal (A) | sepal (A) | carpel (C) | carpel (C) |
| C mutant (*ag*) | sepal (A) | petal (AB) | petal (AB) | sepal (A), and repeated flowers within |

Most ABC genes encode **MADS-domain** transcription factors (*APETALA2* is the exception), a family named from four founding members including *AGAMOUS* and *DEFICIENS* of *Antirrhinum*. The model was later extended. The **SEPALLATA** (*SEP*) genes, class E, are needed in all inner whorls: triple *sep1 sep2 sep3* mutants make only sepal-like organs (Soraya Pelaz, Martin Yanofsky and colleagues, 2000). And expressing A, B and E genes together in leaves is sufficient to convert them into petal-like organs (Takashi Honma and Koji Goto, 2001; Pelaz and colleagues, 2001), confirming Goethe's 1790 insight that floral organs are modified leaves. In the **floral quartet model** of Günter Theißen, tetramers of MADS proteins bind DNA together, with the combination of partners determining the organ.

::: example Predicting floral mutants {#ex-abc}
Use the ABC model to predict the flowers of (a) an *ap3 ag* double mutant; (b) an *ap2 pi* double mutant; (c) an *ap2 ag* double mutant, assuming that AP2 represses C and AG represses A; (d) the triple mutant *ap2 pi ag*.
::: solution
(a) B and C absent: A alone acts in all whorls (since C no longer represses it inside): sepals in every whorl, repeated indefinitely because the meristem is indeterminate without AG.

(b) A and B absent: C spreads to all whorls: carpels in every whorl.

(c) A and C absent, B present in whorls 2 and 3: whorls 1 and 4 have no A or C function and form leaf-like organs; whorls 2 and 3, with B alone, form organs intermediate between petals and stamens. (The observed flowers fit this approximately.)

(d) No A, B or C function anywhere: all floral organs are replaced by leaf-like organs — the flower reverts to a short shoot of leaves, as Coen and Meyerowitz predicted and as is observed.
:::
:::

### When to flower

The transition to flowering integrates internal and environmental signals. In *Arabidopsis*, long days stabilise the CONSTANS protein in the leaves, which activates the gene *FLOWERING LOCUS T* (*FT*). FT protein travels through the phloem to the shoot apex (Laurent Corbesier, George Coupland and colleagues, 2007), where, with the transcription factor FD, it activates floral meristem-identity genes such as *APETALA1* and *LEAFY*. FT is thus the long-sought **florigen**, a mobile flowering signal proposed by Mikhail Chailakhyan in 1936. In plants that need winter cold, prolonged cold (**vernalisation**) silences the floral repressor *FLC* through Polycomb-mediated chromatin modification — a cellular memory of winter that, like Hox silencing in animals, persists through cell divisions.

## Plasticity and totipotency

Because plants make organs throughout life, their development responds continually to the environment. A plant shaded by neighbours senses the low ratio of red to far-red light reflected by leaves through phytochrome and elongates its stems at the expense of leaves (**shade avoidance**); a root encountering a patch of nitrate proliferates lateral roots there; damage to the shoot tip releases buds below it from **apical dominance**. The same genotype can produce very different forms, an adaptive **developmental plasticity** that is the norm rather than the exception in plants ([[plant-biology/plant-responses]]).

Plant cells also retain a remarkable capacity to regenerate. Frederick Steward showed in 1958 that single cells from carrot root phloem, grown in culture with coconut milk, could form embryo-like structures and whole plants. Folke Skoog and Carlos Miller found in 1957 that the ratio of two hormones decides what tobacco callus (an undifferentiated cell mass) forms: a high auxin-to-cytokinin ratio gives roots, a low ratio gives shoots, and intermediate ratios keep the callus growing. Regeneration in culture often passes through a root-meristem-like state, even when shoots are formed, using the same PLETHORA and WUSCHEL regulators as normal meristems. This totipotency underlies the vegetative propagation of crops and the generation of genetically modified plants from single transformed cells.

::: warning "Plant cells are totipotent, so plant development has no commitment"
The ability of some plant cells to regenerate a whole plant in culture does not mean that plant cells are uncommitted in normal development. In the intact plant, cells are specified by position and follow their fates reliably; regeneration requires unusual conditions (wounding, high hormone levels, culture) that reprogram them, often through a dedifferentiated, meristem-like intermediate. Many plant cells, such as the dead cells of xylem, cannot regenerate at all. As in animal nuclear transfer ([[developmental-biology/principles-of-development]]), what regeneration shows is that differentiated plant cells usually keep a full genome and reversible chromatin states.
:::

::: history
Johann Wolfgang von Goethe proposed in *Versuch die Metamorphose der Pflanzen zu erklären* (1790) that the parts of a flower are modified leaves. Wilhelm Hofmeister's rule of phyllotaxis dates from 1868, and Alexander Schmidt described the tunica–corpus organisation of the shoot apex in 1924. Skoog and Miller (1957) and Steward (1958) established hormonal control of organogenesis and totipotency in culture. The genetic era began with *Arabidopsis*, adopted as a model in the 1980s: the embryo-pattern screen of Mayer and Jürgens (1991), the ABC model of Coen and Meyerowitz (1991), the WUSCHEL–CLAVATA loop (1996–2000), mobile transcription factors such as SHORT-ROOT (2001) and florigen identified as FT protein (2007). The *Arabidopsis* genome, published in 2000, was the first plant genome sequenced.
:::

::: summary
- Plants build most of their body after embryogenesis, from meristems; cells do not migrate, so form arises from oriented division and expansion; development is plastic and many cells can regenerate.
- The *Arabidopsis* embryo forms through an asymmetric zygotic division (apical cell → embryo; basal cell → suspensor and hypophysis) and stereotyped stages, setting up an apical–basal axis and a radial pattern. An auxin maximum at the hypophysis, created by PIN transporters and read by MONOPTEROS, specifies the root.
- The SAM has layers (L1–L3) and zones (central, peripheral, rib). WUS from the organising centre maintains stem cells and induces CLV3, which via CLV1 represses WUS: negative feedback that buffers meristem size ($W^* \approx a^{1/(n+1)}$).
- The root meristem's quiescent centre maintains surrounding initials; PLETHORA gradients and mobile SHORT-ROOT with SCARECROW pattern the root. Fate depends on position. At steady state, root growth rate = cell production rate × mature cell length.
- Phyllotaxis commonly follows the golden angle (≈ 137.5°) with Fibonacci parastichies, arising from auxin-depletion zones around existing primordia.
- The ABC(E) model: A (sepals), A+B (petals), B+C (stamens), C (carpels), with A–C antagonism and SEPALLATA required in inner whorls; mostly MADS-box transcription factors. FT is the mobile florigen; vernalisation silences FLC epigenetically.
:::

## Exercises

::: exercise The golden angle {level=1 check="137.51"}
Compute the golden angle $360^\circ/\varphi^2$, where $\varphi = (1+\sqrt5)/2$, to two decimal places.
::: solution
$\varphi^2 = \varphi + 1 = 2.618$, and $360/2.618 = 137.51^\circ$.
:::
:::

::: exercise ABC mutants {level=1}
Give the organs in whorls 1–4 of (a) a *pistillata* mutant; (b) an *apetala2* mutant; (c) an *agamous* mutant.
::: solution
(a) Sepal, sepal, carpel, carpel. (b) Carpel, stamen, stamen, carpel. (c) Sepal, petal, petal, then a new flower (sepal, petal, petal, …) repeated, because the meristem is indeterminate.
:::
:::

::: exercise Embryo stages {level=1}
Name the stage of *Arabidopsis* embryogenesis at which (a) the protoderm is first separated from inner cells; (b) the auxin flow reverses towards the hypophysis; (c) the cotyledons first grow out as two lobes.
::: solution
(a) The dermatogen (16-cell) stage. (b) Around the 32-cell (early globular) stage. (c) The heart stage.
:::
:::

::: exercise Root kinematics {level=2 check="0.8"}
A root grows 2.4 mm per day and its mature cortical cells are 125 µm long. How many new cells per hour does each cortical file produce?
::: solution
$P = (dL/dt)/\ell = 2400/125 = 19.2$ cells per day $= 0.8$ cells per hour.
:::
:::

::: exercise Buffering by feedback {level=2 check="1.19"}
In the model [[#eq-wus-clv]] with $n = 4$, the steady state for $a = 4$ is $W^* = 1.226$ and for $a = 8$ is $W^* = 1.456$. By what factor does $W^*$ change when $a$ doubles (three significant figures), and what does the large-$a$ approximation predict?
::: solution
$1.456/1.226 = 1.19$. The approximation $W^* \approx a^{1/(n+1)}$ predicts a factor $2^{1/5} = 1.15$. Steeper repression (larger $n$) gives stronger buffering.
:::
:::

::: exercise Interpreting *clavata* mutants {level=2}
(a) Explain why *clv3* mutants have enlarged meristems and extra floral organs (especially carpels). (b) Predict the phenotype of a *clv3 wus* double mutant. (c) What would happen to the meristem if CLV3 peptide were applied at high concentration to wild-type seedlings?
::: solution
(a) Without CLV3, *WUS* is not repressed; its expression domain enlarges, more cells are maintained as stem cells, and the meristem grows. The enlarged floral meristems make more organs in the inner whorls, giving extra carpels (club-shaped fruit).

(b) Like *wus*: the meristem terminates. WUS acts downstream of CLV3 in the pathway — CLV3 functions only by repressing WUS — so without WUS the loss of CLV3 has no effect (epistasis of *wus*).

(c) The meristem should be depleted of stem cells, mimicking *wus*: applying synthetic CLV3 peptide to seedlings indeed reduces the shoot meristem and causes root meristems to be consumed.
:::
:::

::: exercise Position or lineage in the root {level=3}
In laser-ablation experiments in the *Arabidopsis* root: (i) when a cortex/endodermis initial is killed, a pericycle cell divides into its place and produces cortex and endodermis; (ii) when a single QC cell is killed, the columella initials next to it stop dividing and differentiate as columella cells, while initials next to the surviving QC cells continue to divide. (a) What does each result show? (b) How does the SHORT-ROOT mechanism explain why a pericycle-derived cell in the cortex/endodermis-initial position produces both cortex and endodermis? (c) Compare the QC with an animal stem-cell niche.
::: solution
(a) (i) Fate is determined by position: a cell from a different lineage adopts the fate of the cell it replaces. (ii) The QC sends short-range signals that keep adjacent initials undifferentiated; the signal acts only on direct neighbours.

(b) The replacing cell now lies in the layer adjacent to the stele, so it receives SHORT-ROOT protein moving out from the stele; with SCARECROW it divides asymmetrically, producing an endodermal cell (still in contact with the stele, keeping SHR) and a cortical cell outside it (without SHR). The pattern comes from the position-dependent signal, not the cell's ancestry.

(c) Like the *Drosophila* germline niche or the intestinal crypt ([[developmental-biology/stem-cells-regeneration]]), the QC is a small group of signalling cells that maintains adjacent stem cells, which lose their stem identity when displaced from it. In both kingdoms, "stemness" is a state conferred by the niche rather than an intrinsic, lineage-based property.
:::
:::

::: exercise A quantitative test of Fibonacci phyllotaxis {level=3}
In a hypothetical sample of 200 sunflower heads, 186 show parastichy pairs that are consecutive Fibonacci numbers (such as 34/55), 9 show Lucas numbers (such as 29/47, from the related sequence 1, 3, 4, 7, 11, 18, 29, 47, …), and 5 show other or irregular patterns. (a) What proportion are Fibonacci? (b) What would a Lucas pattern imply about the divergence angle, given that Lucas spirals correspond to a divergence angle of about 99.5°? (c) Why might a developmental mechanism based on inhibitory fields occasionally produce non-Fibonacci patterns?
::: solution
(a) $186/200 = 0.93$, or 93 %.

(b) Those heads must have laid down primordia at a different limiting divergence angle, about 99.5°, rather than 137.5° — a different stable solution of the same packing problem, not random arrangement.

(c) The inhibitory-field mechanism has several stable solutions; which one is reached depends on initial conditions (the arrangement of the first few primordia) and on parameters such as the size of the inhibitory field relative to the meristem and the rate of growth. Most often the system falls into the Fibonacci solution, but perturbations early in development can send it into another branch, giving Lucas or irregular patterns. A large citizen-science survey of sunflowers (Jonathan Swinton, Erinma Ochu and colleagues, 2016) found that most heads were Fibonacci but a minority showed other patterns.
:::
:::
