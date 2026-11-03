By the end of gastrulation a vertebrate embryo has its three germ layers and its body axes, and its segments are forming. What it does not yet have are organs. Over the following days — about three weeks in a mouse, about six in a human — the layers fold, thicken, bud and branch into a brain and spinal cord, eyes, a heart, limbs, kidneys, lungs and a gut with its glands. This phase is **organogenesis**.

There are far too many organs to treat each one, and fortunately there is no need: the same few principles recur. Organs form where tissues meet and signal to each other, often in both directions. They are patterned by gradients of a small set of signals — Sonic hedgehog, BMP, Wnt, FGF and retinoic acid — read by transcription factors that repress each other. Their shapes come from the cell behaviours of [[developmental-biology/gastrulation]]: apical constriction, intercalation, epithelial-to-mesenchymal transitions and their reverse. And some patterns arise without any prepattern at all, from local interactions between neighbouring cells. This chapter studies two organs in depth, the **neural tube** and the **limb**, and then the general mechanisms of lateral inhibition, branching and self-organising patterns. The segmentation and Hox genes of [[developmental-biology/segmentation-hox]] supply the anterior–posterior context in which all of this happens.

## Neurulation: making the neural tube

The nervous system of vertebrates begins as the **neural plate**, a thickened region of dorsal ectoderm induced during gastrulation by the organiser ([[developmental-biology/gastrulation]]). In the process of **neurulation**, the plate rolls up into a tube that will become the brain and spinal cord.

::: definition Neurulation {#def-neurulation}
**Primary neurulation** is the formation of the neural tube by folding of the neural plate: the plate thickens and narrows; its edges rise as **neural folds**; the folds bend towards each other at **hinge points**; and they meet and fuse in the dorsal midline, separating the tube from the overlying epidermis. **Secondary neurulation**, used for the most posterior part of the spinal cord in birds and mammals, forms the tube instead by condensation of a solid rod of cells from the tail bud, which then hollows out.
:::

Several forces act together. The neural plate lengthens and narrows by convergent extension, driven by the planar cell polarity pathway; mouse and frog mutants in this pathway have a plate too wide to close. Cells at the **medial hinge point**, above the notochord, become wedge-shaped by apical constriction and by moving their nuclei basally, bending the plate along its midline ([[developmental-biology/gastrulation#prop-wedge]]). Cells at paired **dorsolateral hinge points** bend the folds towards each other, and the surrounding epidermis pushes them up. Finally the folds meet and fuse, through adhesion of the epidermal and neural cells at their tips. In the mouse and human embryo, closure begins at several points along the axis and spreads like zips in both directions.

As the folds fuse, cells at their crest — the border between neural plate and epidermis — undergo an epithelial-to-mesenchymal transition and migrate away. These **neural crest** cells travel widely through the embryo and form an extraordinary range of tissues: the neurons and glia of the peripheral and enteric nervous systems, melanocytes of the skin, cells of the adrenal medulla, and, in the head, cartilage, bone and connective tissue of the face. Specification of the neural crest depends on intermediate levels of BMP signalling, together with Wnt and FGF, at the edge of the neural plate.

::: application Neural tube defects
If the neural tube fails to close, the result is a **neural tube defect**: failure at the cranial end gives anencephaly, which is lethal, and failure in the lower spine gives spina bifida, of varying severity. They are among the commonest serious congenital anomalies. In 1991 a randomised trial run by the UK Medical Research Council found that folic acid supplements taken around conception reduced the recurrence of neural tube defects by about 70 % in women who had had an affected pregnancy, and many countries now fortify flour with folic acid. How folate supports closure is still incompletely understood; it is needed for nucleotide synthesis and for methylation reactions, both heavily used by the rapidly dividing neural plate. The clinical and public-health aspects are covered in the Medicine Atlas ([Medicine Atlas](/learn/medicine/)).
:::

## Patterning the neural tube along its dorsal–ventral axis

The spinal cord has a striking organisation in cross-section. Motor neurons, which send axons to the muscles, lie ventrally; interneurons of several classes lie in stripes above them; sensory relay neurons lie dorsally. Each class arises from a distinct **progenitor domain** in the ventricular zone of the neural tube, a stripe running the length of the cord. How are these domains positioned?

Two signalling centres face each other across the tube. Ventrally, the **notochord** beneath the tube, and then the **floor plate**, the ventral midline cells of the tube itself, secrete **Sonic hedgehog** (Shh). Dorsally, the epidermis and then the **roof plate** secrete BMPs and Wnts. Classic grafting experiments showed what Shh does. A piece of notochord grafted beside the neural tube of a chick embryo induces an extra floor plate and extra motor neurons next to itself; removing the notochord eliminates both (Thomas Jessell, Jane Dodd and colleagues, and Marysia Placzek, in the early 1990s). In 1993–94 the groups of Andrew McMahon, Thomas Jessell and others identified Shh as the signal: Shh protein, or cells expressing it, can replace the notochord, and mice lacking *Shh* have no floor plate and no motor neurons.

::: definition Sonic hedgehog as a neural-tube morphogen {#def-shh-neural}
In the ventral neural tube, Shh acts as a **morphogen** ([[developmental-biology/axis-formation#def-morphogen]]): it forms a ventral-to-dorsal gradient, and different concentrations specify different progenitor domains. From ventral to dorsal these are **p3** (giving V3 interneurons), **pMN** (motor neurons), **p2**, **p1** and **p0** (other interneurons), defined by combinations of homeodomain and bHLH transcription factors. **Class II** factors (such as Nkx2.2, Nkx6.1 and Olig2) are *induced* by Shh above characteristic thresholds; **class I** factors (such as Pax6, Pax7, Irx3 and Dbx2) are *repressed* by Shh below characteristic thresholds.
:::

The domains are sharpened by **cross-repression** between pairs of factors with abutting domains, which James Briscoe, Johan Ericson, Thomas Jessell and colleagues demonstrated in 2000. Nkx2.2 and Pax6 repress each other, setting the boundary between p3 and pMN; Olig2 and Irx3 repress each other at the boundary between pMN and p2. The logic is the toggle switch of [[developmental-biology/principles-of-development#prop-toggle]], applied at each boundary: a graded signal biases the switch, and the switch converts the bias into a sharp, stable choice.

Later work, led by Briscoe's group, showed that cells read not only the concentration of Shh but its **duration**. A cell exposed to a given concentration first activates low-threshold genes and then, if signalling continues, higher-threshold ones; meanwhile its sensitivity falls through negative feedback (Shh induces its own receptor, Patched, which sequesters the ligand). The amount of signal a cell integrates over time, rather than a single instantaneous reading, determines its fate (Michael Dessaud and colleagues, 2007).

::: example Placing progenitor domains with a Shh gradient {#ex-shh-domains}
Suppose that the Shh gradient in the ventral neural tube decays exponentially from the floor plate with decay length $\lambda = 20$ µm, roughly the value measured in mouse and chick embryos (Anna Kicheva, Briscoe and colleagues, 2014). In a simplified threshold model, cells become p3 where Shh exceeds 50 % of its level at the floor plate, pMN where it lies between 20 % and 50 %, and p2 between 10 % and 20 %. (a) Where do the boundaries lie? (b) How wide is each domain? (c) What happens to the domains if Shh production is halved?
::: solution
(a) Using $x_T = \lambda\ln(c_0/T)$ ([[developmental-biology/axis-formation#eq-threshold]]): the p3/pMN boundary is at $20\ln2 = 14$ µm, the pMN/p2 boundary at $20\ln5 = 32$ µm, and the p2/p1 boundary at $20\ln10 = 46$ µm.

(b) p3: 0–14 µm (14 µm); pMN: 14–32 µm (18 µm); p2: 32–46 µm (14 µm). With cells about 5–10 µm across, each domain is only a few cells wide at this stage.

(c) Halving $c_0$ moves every boundary ventrally by $\lambda\ln2 = 14$ µm: p3 disappears entirely, and the other domains shift towards the floor plate. Mice with reduced Shh signalling indeed lose ventral domains first. (The thresholds here are illustrative; in reality the domains also depend on signal duration and cross-repression, and the neural tube grows during patterning.)
:::
:::

::: widget plot
f: A*exp(-x/L); 0.5; 0.2; 0.1
x: 0, 100
y: 0, 1.05
sliders: A=1:0.25:2:0.05; L=20:10:40:1
labels: \text{Shh (relative to floor plate)}; \text{p3 / pMN}; \text{pMN / p2}; \text{p2 / p1}
caption: The threshold model of [[#ex-shh-domains]]: Shh concentration against distance from the floor plate (µm), with production $A$ and decay length $\lambda$ (slider $L$, µm). The horizontal lines are the thresholds; the domain boundaries lie where the curve crosses them, at 14, 32 and 46 µm for $A = 1$, $\lambda = 20$ µm. Halve $A$ and the p3 domain vanishes as all boundaries move 14 µm ventrally; lengthen $\lambda$, as would happen if the tissue grew and the gradient scaled with it, and all domains widen in proportion.
:::

## The vertebrate limb

The limb has been the favourite organ of experimental embryologists for eighty years: it is accessible in the chick, it develops away from the vital organs, and its pattern is easy to score in the skeleton. A limb has three axes. The **proximodistal** axis runs from the shoulder to the fingertips through three segments: the **stylopod** (humerus or femur), the **zeugopod** (radius and ulna, or tibia and fibula) and the **autopod** (wrist and hand, or ankle and foot). The **anteroposterior** axis runs from thumb to little finger. The **dorsoventral** axis runs from the back of the hand to the palm.

### Initiation

Limbs bud from the lateral plate mesoderm at fixed positions along the body, set by the Hox code. The transcription factor Tbx5 in the forelimb field and Tbx4 (with Pitx1) in the hindlimb field activate *Fgf10* in the mesenchyme; FGF10 induces the overlying ectoderm to form a ridge along the tip of the bud, the **apical ectodermal ridge** (AER), which expresses FGF8. FGF8 in turn maintains *Fgf10* in the mesenchyme. This positive feedback loop between ectoderm and mesoderm keeps the bud growing — a reciprocal induction.

### Proximodistal outgrowth: the apical ectodermal ridge

John Saunders showed in 1948 that removing the AER from a chick wing bud stops further outgrowth. The later the removal, the more complete the limb: removal early gives only a humerus; removal later gives humerus, radius and ulna but no digits. Implanting beads soaked in FGF after removal of the AER rescues outgrowth, so FGFs carry the AER's activity.

How do the mesenchymal cells know which segment to form? The **progress zone model** (Dennis Summerbell, Julian Lewis and Lewis Wolpert, 1973) proposed that cells beneath the AER, in a "progress zone", measure time: the longer they stay there, the more distal the fate they adopt when they leave. An alternative, the **early specification model** (Andrew Dudley, Marian Ros and Clifford Tabin, 2002), proposed that the three segments are specified early, in a small bud, and then expanded by growth; removing the AER kills cells under it, so it removes the progenitors of distal segments. A third, the **two-signal model**, holds that the proximal segment is specified by retinoic acid from the flank and distal segments by FGF and Wnt from the AER, with the zeugopod formed where both are low. Each is consistent with some data; the field has not reached full agreement, and current views combine timing, opposing signals and growth. What is agreed is the molecular readout: the stylopod expresses the transcription factors Meis1 and Meis2, the zeugopod Hoxa11 and the autopod Hoxa13, and mice lacking the corresponding Hox paralogues lose the corresponding segments.

### Anteroposterior pattern: the zone of polarising activity

In 1968 Saunders and Mary Gasseling grafted a piece of mesenchyme from the posterior margin of a chick wing bud to the anterior margin of another. The host wing formed extra digits in mirror image: instead of the normal sequence 2-3-4 (chick wing digits are conventionally numbered 2, 3 and 4 from anterior to posterior), it formed 4-3-2-2-3-4. The posterior tissue was named the **zone of polarising activity** (ZPA). Its activity was graded: grafting fewer ZPA cells gave an extra digit 2 only, more cells gave 3-2 and then 4-3-2. Robert Riddle, Randy Johnson, Ed Laufer and Clifford Tabin showed in 1993 that the ZPA expresses Sonic hedgehog, and that Shh-expressing cells or beads mimic ZPA grafts.

Shh acts partly by preventing the processing of the transcription factor Gli3 into a repressor. Anteriorly, where Shh is absent, Gli3 repressor predominates; posteriorly it is reduced. Mice lacking *Shh* have a single digit; mice lacking *Gli3* have many unpatterned digits (polydactyly); mice lacking both look like *Gli3* mutants, showing that a main job of Shh in the limb is to oppose Gli3 repression.

Like neural-tube patterning, digit identity depends on both concentration and time. Brian Harfe, Tabin and colleagues showed in 2004, by permanently marking the descendants of *Shh*-expressing cells in the mouse, that the two most posterior digits are formed partly by cells that once expressed *Shh* themselves, and that more posterior digits arise from cells exposed to Shh for longer.

The *Shh* gene's limb expression is driven by an enhancer, the **ZRS**, that lies about a million base pairs away, inside an intron of a different gene (Laura Lettice, Robert Hill and colleagues, 2003). Point mutations in the ZRS cause ectopic anterior *Shh* expression and extra digits in humans, cats and mice — a dramatic illustration of how a change in a single enhancer changes form ([[developmental-biology/evo-devo]]).

::: example Reading ZPA grafts {#ex-zpa}
Predict the digit pattern of a chick wing in each case, and explain the reasoning. (a) A ZPA is grafted to the anterior margin of a wing bud. (b) A bead releasing a low dose of Shh is implanted anteriorly. (c) A bead releasing a high dose of Shh is implanted anteriorly. (d) A ZPA is grafted under the AER at the tip of the bud, in the middle of the anteroposterior axis.
::: solution
(a) 4-3-2-2-3-4: the graft creates a second source of Shh, and digits are specified symmetrically by distance from the two sources.

(b) An extra digit 2 anterior to the normal set (2-2-3-4): a low concentration reaches only the threshold for the most anterior digit identity.

(c) 4-3-2-2-3-4 or 3-2-2-3-4, depending on the dose: higher doses reach the thresholds for more posterior identities.

(d) Extra digits whose identities depend on their distance from the graft and from the normal ZPA, so the graft acts as a second posterior pole in the middle of the bud; the exact pattern depends on how much space there is on each side. The experiment shows that digit identity reflects the distance from a source of Shh (and the time cells spend near it), not a fixed coordinate of the bud.
:::
:::

### Dorsoventral pattern and the sculpting of digits

The dorsal ectoderm of the limb bud expresses Wnt7a, which induces the transcription factor Lmx1b in the dorsal mesenchyme; the ventral ectoderm expresses the transcription factor Engrailed-1, which represses *Wnt7a* there. Mice lacking Wnt7a or Lmx1b have limbs with two ventral sides (pads on both surfaces), and mice lacking Engrailed-1 have two dorsal sides.

Digits are separated by **programmed cell death** in the interdigital tissue, triggered by BMP signalling. The webbed feet of ducks keep their interdigital tissue because it expresses the BMP antagonist Gremlin; implanting beads that block BMP in a chick leg prevents the death and gives webbed toes, and BMP-releasing beads in duck foot webbing cause it to regress (Ramón Merino, Juan Hurle and colleagues, 1999).

::: quiz
A chick wing bud has its AER removed at an intermediate stage, and an FGF-soaked bead is placed at its tip. What is the most likely outcome?
- [ ] A normal wing, because FGF also replaces the ZPA
- [x] A wing with more distal elements than after AER removal alone, possibly nearly complete
- [ ] A wing with mirror-image digits
- [ ] No wing at all, because the bead blocks outgrowth
::: solution
FGF can replace the AER's outgrowth-promoting signal, so outgrowth continues and more distal structures form; with well-timed, well-dosed beads the limb can be nearly normal. FGF does not replace Shh, so it does not create a new anteroposterior pattern or mirror-image digits (although FGF from the AER and Shh from the ZPA maintain each other in the intact bud).
:::
:::

## Lateral inhibition: patterns from neighbours

Not every pattern is laid down by a long-range gradient. In many tissues a field of equivalent cells resolves itself into a regular mixture of two fates by short-range interactions. The classic example is the selection of neural precursors in the fly: in a cluster of cells all competent to become a sensory bristle precursor, one cell wins and the rest become epidermis. The mechanism is **lateral inhibition** through **Notch** and **Delta** ([[cell-biology/cell-signalling]]).

::: definition Lateral inhibition {#def-lateral-inhibition}
**Lateral inhibition** is an interaction in which a cell adopting a particular fate inhibits its immediate neighbours from adopting the same fate. In the Notch pathway, a cell expressing more of the ligand Delta activates Notch in its neighbours; Notch signalling represses *Delta* expression (and the fate-promoting genes) in those neighbours. A small initial difference is amplified until one cell has high Delta and its neighbours low Delta.
:::

Joanne Collier, Nicholas Monk, Philip Maini and Julian Lewis analysed a minimal model in 1996. Reduced to two neighbouring cells, with Delta levels $x$ and $y$ and Notch activity in each cell an increasing function of its neighbour's Delta, it reads (in dimensionless form)

$$
\frac{dx}{dt} = \frac{1}{1 + b\,N(y)^2} - x, \qquad \frac{dy}{dt} = \frac{1}{1 + b\,N(x)^2} - y, \qquad N(u) = \frac{u^2}{a + u^2},
$$ {#eq-collier}

where $N$ is the Notch activity induced by the neighbour's Delta, $a$ sets the Delta level that half-activates Notch and $b$ the strength with which Notch represses Delta.

This is mathematically the same as the toggle switch of [[developmental-biology/principles-of-development#prop-toggle]]: two quantities that repress each other cooperatively. The difference is that the repression passes *between* cells rather than within one cell, so the stable states are patterns — one cell high, its neighbour low — instead of fates of a single cell.

::: widget phaseplane
f: 1/(1 + b*(y^2/(a + y^2))^2) - x
g: 1/(1 + b*(x^2/(a + x^2))^2) - y
x: 0, 1.1
y: 0, 1.1
sliders: a=0.01:0.001:0.2:0.001; b=100:1:200:1
caption: Lateral inhibition between two neighbouring cells [[#eq-collier]]: $x$ and $y$ are the Delta levels of the two cells. With $a = 0.01$ and $b = 100$ (Collier and colleagues' values) the nullclines cross three times: a symmetric state near $(0.074, 0.074)$, which is a saddle, and two stable states near $(0.99, 0.01)$ and $(0.01, 0.99)$, in which one cell has high Delta (it becomes, say, the neural precursor) and its neighbour almost none. Start trajectories near the diagonal: a tiny initial difference decides which cell wins. Increase $a$ (weaker Notch activation) or reduce $b$, and the two asymmetric states merge into the symmetric one — lateral inhibition then fails and both cells adopt the same fate.
:::

::: example Fixed points of the lateral inhibition model {#ex-collier}
For [[#eq-collier]] with $a = 0.01$ and $b = 100$, the symmetric steady state is at $x = y = 0.074$ (found numerically). (a) Verify that this is a steady state. (b) The slope of the right-hand side function $F(u) = 1/(1 + bN(u)^2)$ at $u = 0.074$ is about $-2.4$. Use the argument of [[developmental-biology/principles-of-development#prop-toggle]] to decide whether the symmetric state is stable. (c) Interpret the result.
::: solution
(a) $N(0.074) = 0.074^2/(0.01 + 0.074^2) = 0.005476/0.015476 = 0.354$. Then $F = 1/(1 + 100\times0.354^2) = 1/(1 + 12.5) = 0.074$. So $x = F(y)$ and $y = F(x)$ hold with $x = y = 0.074$.

(b) The Jacobian at the symmetric point is $\begin{pmatrix} -1 & F' \\ F' & -1\end{pmatrix}$ with eigenvalues $-1 \pm \lvert F'\rvert = -1 \pm 2.4$, i.e. $1.4$ and $-3.4$. One eigenvalue is positive, so the state is a saddle — unstable.

(c) Two cells with equal Delta cannot stay equal: any small difference grows, along the direction $(1, -1)$ of the unstable eigenvector, until one cell has high Delta (about 0.99) and the other low (about 0.01). In a sheet of cells the same instability produces a "salt-and-pepper" pattern, with isolated high-Delta cells surrounded by low-Delta neighbours, like the spacing of bristles on a fly's back or of hair cells in the inner ear.
:::
:::

## Reciprocal induction and branching

Many organs — kidneys, lungs, salivary and mammary glands, the pancreas — are built by **branching morphogenesis**, in which an epithelial tube grows and splits repeatedly into a tree, under the control of signals from the surrounding mesenchyme.

The kidney is the classic example of **reciprocal induction**. The metanephric mesenchyme, part of the intermediate mesoderm, secretes the growth factor GDNF, which acts on the receptor tyrosine kinase Ret on the **ureteric bud**, an outgrowth of the nephric duct; the bud invades the mesenchyme and branches. The bud tips in turn secrete Wnt9b, which induces the nearby mesenchyme cells to condense and undergo a **mesenchymal-to-epithelial transition**, forming the epithelial tubules of nephrons. Each signal is needed for the other tissue to develop: mice lacking *Gdnf* or *Ret* form no ureteric bud and no kidneys, and kidney mesenchyme cultured without a bud forms no nephrons. Clifford Grobstein demonstrated the mutual dependence in the 1950s with explants separated by a filter.

In the lung, FGF10 from the mesenchyme acts on the endoderm of the bud tips, which grow towards the source; Shh and other signals from the epithelium limit *Fgf10* expression to spots, so that the tips split. The airways of the mouse lung are built by a stereotyped sequence of a few kinds of branching (Ross Metzger, Mark Krasnow and colleagues, 2008), showing that the tree is genetically programmed rather than random.

::: example How many rounds of branching? {#ex-branching}
(a) If an airway tree branches dichotomously (each tip splits into two), how many terminal branches result from 23 generations of branching? (b) A human kidney contains of the order of a million nephrons (the number varies severalfold between people); a mouse kidney about $1.4\times10^4$. If each nephron were induced by one tip of a dichotomously branching ureteric tree, how many generations of branching would be needed in each? (c) Why is this only a rough guide?
::: solution
(a) $2^{23} = 8.4\times10^6$ terminal branches. The conducting and respiratory airways of the human lung are classically described as about 23 generations in Ewald Weibel's model of 1963.

(b) $\log_2(10^6) = 19.9$, so about 20 generations for a human; $\log_2(1.4\times10^4) = 13.8$, about 14 for a mouse. A thousandfold difference in nephron number needs only six more rounds of branching.

(c) Real trees are not perfectly dichotomous or symmetrical; several nephrons are induced around each bud tip over time (in the kidney each tip induces nephrons repeatedly as it grows outwards); and branching stops at different generations in different parts of the organ. But the logarithmic relationship is the key point: exponential processes reach large numbers in few steps, so small changes in the duration of branching cause large differences in organ size.
:::
:::

## Self-organising patterns: Turing's mechanism

In 1952 the mathematician Alan Turing proposed that two diffusing chemicals, which he called **morphogens** (the origin of the word), could spontaneously form a regular pattern of spots or stripes from an almost uniform starting state, provided that one, the **activator**, enhances its own production and that of the other, and the other, the **inhibitor**, suppresses the activator and diffuses faster. Alfred Gierer and Hans Meinhardt reformulated the idea in 1972 as **local self-activation and long-range inhibition**. A small local peak of activator grows, but the inhibitor it produces spreads further and prevents new peaks from forming nearby; the result is peaks spaced at a characteristic **wavelength**, set by the diffusion and reaction rates rather than by the size of the tissue.

::: intuition A pattern with its own ruler
A gradient system measures position from a boundary; a Turing system measures distance between repeated elements. Enlarge a tissue patterned by a gradient and the pattern stretches; enlarge a tissue patterned by a Turing mechanism and you get *more* repeats of the same size. This makes Turing systems natural candidates for periodic structures whose number varies with tissue size — digits, hair follicles, feather buds, the ridges of the palate, the stripes of a zebrafish.
:::

Experimental evidence for Turing-type patterning in vertebrates has grown since 2000. Rushikesh Sheth, Marian Ros and colleagues showed in 2012 that progressively reducing the dose of distal Hox genes in mouse limbs lacking Gli3 produced more and thinner digits, as though the wavelength of a periodic pattern were being shortened; and Jelena Raspopovic, James Sharpe and colleagues proposed in 2014 a Turing network of BMP, Sox9 and Wnt that patterns the digits, with the Shh/Gli3 system modulating it. In skin, the spacing of hair follicles and feather buds is explained by activator–inhibitor interactions among Wnt, FGF and BMP signals. Gradients and self-organisation are not alternatives: real organs use both, with gradients orienting and modulating periodic patterns.

::: warning "Organ pattern is drawn on a blueprint"
It is tempting to imagine that the genome contains a map of each organ which cells consult. It does not. The genome encodes proteins and the rules by which they interact — who signals to whom, which genes repress which — and the pattern emerges from those rules acting in a growing tissue. That is why a single changed enhancer can add digits, why grafts can create mirror-image patterns, and why organoids grown from stem cells in a dish can produce recognisable miniature tissues without any surrounding embryo.
:::

::: history
Ross Harrison's experiments on amphibian limb buds in the 1910s showed that the forelimb field could regulate after removal of half of it and could be transplanted to form a limb elsewhere. John Saunders discovered the AER (1948) and the ZPA (with Mary Gasseling, 1968). Lewis Wolpert interpreted the ZPA as a source of a morphogen within his theory of positional information, and Cheryll Tickle, Dennis Summerbell and Wolpert (1975) and Tickle (1981) showed that the effect of a ZPA graft depends on its position and on the number of grafted cells. Alan Turing's paper "The chemical basis of morphogenesis" appeared in 1952. In the neural tube, the inductive power of the notochord was shown by grafting in the late 1980s and early 1990s, and Shh was identified in 1993 as the signal in both neural tube and limb, in a remarkable convergence of work from the groups of Andrew McMahon, Thomas Jessell, Philip Ingham and Clifford Tabin.
:::

::: summary
- Organogenesis builds organs through reciprocal signalling between tissues, gradients read by cross-repressive transcription factors, the cell behaviours of gastrulation, and self-organising interactions.
- The neural plate rolls into the neural tube by convergent extension, hinge-point bending and fusion of the neural folds; neural crest cells delaminate and migrate to form many tissues. Failure of closure gives neural tube defects, reduced by folic acid.
- Sonic hedgehog from the notochord and floor plate forms a ventral gradient that, with dorsal BMP and Wnt, specifies progenitor domains (p3, pMN, p2…), sharpened by cross-repression (Nkx2.2–Pax6, Olig2–Irx3) and read in both concentration and duration.
- The limb bud grows by an FGF10–FGF8 loop between mesenchyme and the apical ectodermal ridge; its proximodistal segments (Meis, Hoxa11, Hoxa13) are specified by mechanisms still debated (progress zone, early specification, two signals).
- Shh from the ZPA specifies digit identity by dose and duration, largely by opposing Gli3 repressor; the distant ZRS enhancer controls limb *Shh*. Wnt7a/Lmx1b and Engrailed-1 pattern the dorsoventral axis; BMP-driven cell death separates digits.
- Notch–Delta lateral inhibition makes salt-and-pepper patterns; in two cells it is mathematically a toggle switch.
- Branching organs (kidney, lung) form by reciprocal induction; tip numbers grow as $2^n$ with generations.
- Turing activator–inhibitor systems create periodic patterns with an intrinsic wavelength, and help pattern digits, hair follicles and feathers.
:::

## Exercises

::: exercise Organ origins {level=1}
For each structure, name the tissue interaction or signalling centre principally responsible for its formation or pattern: (a) the motor neurons of the spinal cord; (b) the outgrowth of the limb along the proximodistal axis; (c) the identity of digits; (d) the nephrons of the kidney.
::: solution
(a) Shh from the notochord and floor plate. (b) FGFs from the apical ectodermal ridge (with FGF10 from the mesenchyme). (c) Shh from the zone of polarising activity, opposing Gli3 repression (with self-organising mechanisms for digit number). (d) Wnt9b and other signals from the ureteric bud tips acting on the metanephric mesenchyme (reciprocal with GDNF from mesenchyme to bud).
:::
:::

::: exercise Branching generations {level=1 check="10"}
How many generations of dichotomous branching are needed to produce 1024 terminal tips?
::: solution
$\log_2 1024 = 10$.
:::
:::

::: exercise Phenotypes {level=1}
Predict the limb phenotype of mice lacking (a) *Shh*; (b) *Gli3*; (c) *Wnt7a*; (d) *Engrailed-1* in the limb ectoderm.
::: solution
(a) A truncated limb with a single digit (and reduced zeugopod). (b) Polydactyly with many digits lacking distinct identities. (c) Ventralised limbs: both surfaces ventral in character (e.g. footpads dorsally). (d) Dorsalised limbs: both surfaces dorsal in character.
:::
:::

::: exercise Shifting a neural-tube boundary {level=2 check="13.9"}
A Shh gradient in the neural tube decays with $\lambda = 20$ µm. If a mutation halves the level of Shh at the floor plate, by how many micrometres does each threshold boundary move towards the floor plate (three significant figures)?
::: solution
$\Delta x = \lambda\ln2 = 20\times0.693 = 13.9$ µm.
:::
:::

::: exercise Kidney branching {level=2 check="7"}
A human kidney has about 128 times as many nephrons as a hypothetical small mammal's. If each nephron corresponds to one tip of a dichotomously branching tree, how many more generations of branching does the human kidney need?
::: solution
$\log_2 128 = 7$ generations.
:::
:::

::: exercise ZPA dose {level=2}
In Tickle's experiments, grafting small numbers of ZPA cells to the anterior margin of a chick wing bud gave an extra digit 2, and larger numbers of cells gave extra digits 3-2 and then 4-3-2. (a) Interpret this in terms of a morphogen gradient. (b) Shh-soaked beads give a similar series as the Shh concentration in the bead increases. Why is it important that beads reproduce the effect? (c) What additional experiment would test whether exposure time matters as well as dose?
::: solution
(a) More cells release more Shh, raising $c_0$ for the anterior source; the thresholds for more posterior digit identities are reached near the graft only at higher source strengths, so the identity of the most posterior extra digit increases with cell number.

(b) Beads show that the protein alone is sufficient to reproduce the effect of the tissue, ruling out the possibility that the grafted cells acted through some other signal or by contributing cells to the digits themselves.

(c) Implant a bead with a fixed concentration and remove it after different times (e.g. 12, 16, 24 h). If longer exposure gives more posterior identities at the same concentration, time matters. Such experiments by Yang, Tickle and colleagues (1997) found that both dose and duration contribute.
:::
:::

::: exercise Lateral inhibition breaks down {level=3}
In the two-cell lateral inhibition model [[#eq-collier]] with $b = 100$, increasing $a$ makes Notch harder to activate. (a) Explain in words why, for large $a$, both cells end with the same Delta level. (b) In a mutant where Notch cannot be activated at all, what happens to all cells of a proneural cluster in the fly, and what is the adult phenotype? (c) What happens if Notch is constitutively active in all cells?
::: solution
(a) The instability of the symmetric state requires steep mutual repression at the symmetric point ($\lvert F'\rvert > 1$). With large $a$, Delta at the levels present barely activates Notch in the neighbour, so a change in one cell's Delta has little effect on the other: the effective coupling is weak, $\lvert F'\rvert < 1$, and the symmetric state is stable. Both cells keep the same, high Delta.

(b) Without Notch signalling no cell can inhibit its neighbours, so all cells of the cluster become neural precursors: the "neurogenic" phenotype, with a nervous system enlarged at the expense of epidermis (in the adult, tufts of bristles instead of single bristles).

(c) With Notch active everywhere, all cells are inhibited and none becomes a precursor: bristles are missing.
:::
:::

::: exercise Gradient or Turing? {level=3}
You are studying a periodic structure, say a row of skin appendages, in a tissue that you can make larger or smaller by manipulating growth. (a) What would you expect for the number and spacing of the structures if they were positioned by a single gradient from one edge with fixed thresholds, and what if they were produced by a Turing mechanism? (b) Interpret this observation: mice with reduced distal Hox dose develop more, thinner digits in a limb bud of normal size.
::: solution
(a) A gradient with fixed thresholds produces a fixed number of elements (one per threshold) whose positions depend on distance from the source: in a larger tissue the elements stay near the source and the far part is unpatterned, or, if the gradient scales with tissue size, the same number of elements is spaced further apart. A Turing mechanism produces elements at an intrinsic spacing, so a larger tissue gets more elements of the same spacing and a smaller tissue fewer.

(b) In a tissue of the same size, more digits means a shorter spacing: the intrinsic wavelength has been shortened. That is what a Turing mechanism whose parameters depend on Hox gene dose predicts, and it is hard to explain with a fixed-threshold gradient, which would not add new elements. This was the argument of Sheth and colleagues (2012).
:::
:::
