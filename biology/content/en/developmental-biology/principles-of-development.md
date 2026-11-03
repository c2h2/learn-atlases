A frog egg is a single cell about 1.2 mm across. Within four days at room temperature it has become a swimming tadpole with a brain, eyes, a beating heart, muscles in repeated blocks along its back, a gut, kidneys and skin — a great many cells of dozens of kinds, each in its proper place. Nothing was added from outside except water, oxygen and warmth. Every instruction for building the tadpole was already in the egg: in its genome, and in the molecules the mother placed in its cytoplasm.

How this happens is the subject of **developmental biology**. It has several distinct problems, which the chapters of this course take up one by one.

- **Differentiation.** One cell gives rise to many cell types — neurons, muscle fibres, red blood cells, cells of the lens — that differ in shape, in the proteins they make and in what they do.
- **Pattern formation.** The different cell types must appear in the right places and in the right proportions: the head at one end, the digits at the end of the limb and not halfway along it.
- **Morphogenesis.** Sheets and masses of cells fold, move, stretch and fuse to produce three-dimensional form — tubes, layers, cavities and branches.
- **Growth.** Organs reach the right size, and grow in proportion to each other.
- **Reproduction and renewal.** The germ line is set aside to make the next generation, and in many tissues stem cells keep making new cells throughout life.
- **Evolution.** Changes in development are how new forms evolve; the final chapter, [[developmental-biology/evo-devo]], returns to this.

This chapter introduces the ideas that run through all of them: that cells of an embryo share one genome but express different parts of it; that cells become committed to their fates in steps, which experiments can detect; that cells instruct each other by signals; and that networks of transcription factors turn transient signals into lasting cell identities. We finish with the organisms in which these ideas were discovered. The chapter assumes the mechanisms of [[molecular-biology/eukaryotic-gene-regulation]] — transcription factors, enhancers and chromatin — and the signalling pathways of [[cell-biology/cell-signalling]].

## One genome, many cell types

The cells of a body look and behave very differently, and the first great question of development was whether they *contain* different hereditary material. In the 1880s August Weismann proposed that they do: the nucleus of the egg contains determinants for every part of the body, and these are parcelled out unequally at each cell division, so that a muscle cell keeps only muscle determinants. Only the germ line would retain the full set. The idea was natural, and it was wrong — but disproving it took seventy years, because it required removing a nucleus from a differentiated cell and asking what it could still do.

### Nuclear transfer

Robert Briggs and Thomas King developed the method in 1952 with the leopard frog *Rana pipiens*. They removed the nucleus of an unfertilised egg and replaced it with a nucleus sucked from a cell of a blastula, an embryo of a few thousand cells. Many of the reconstructed eggs developed into normal tadpoles. Nuclei from later stages were progressively less successful, which seemed at first to support a restriction of nuclear potential. John Gurdon, working with the clawed frog *Xenopus laevis*, then took nuclei from the intestinal epithelium of feeding tadpoles — fully differentiated cells — and in 1962 obtained swimming tadpoles from a small percentage of them; later work obtained fertile adult frogs. One successful case was enough to make the point: a differentiated cell's nucleus can still direct the development of a whole animal, so differentiation had not removed the genes for nerve, skin or blood.

In mammals, the same was shown when Ian Wilmut, Keith Campbell and their colleagues reported in 1997 that a lamb, Dolly, born in July 1996, had developed from a sheep egg whose nucleus had been replaced by that of a cultured cell from the mammary gland of a six-year-old ewe. The efficiency was very low (one lamb from 277 reconstructed eggs), and most nuclear-transfer embryos in every species die or develop abnormally, because the egg cytoplasm only partly succeeds in resetting the gene-expression state of the donor nucleus ([[#ex-dolly]]).

::: definition Genomic equivalence and differential gene expression {#def-genomic-equivalence}
**Genomic equivalence** is the principle that, with a few exceptions, every somatic cell of an organism contains the same genome as the zygote. Cells differ because they express different subsets of their genes: differentiation is **differential gene expression**, controlled by transcription factors, chromatin and the other regulatory mechanisms of [[molecular-biology/eukaryotic-gene-regulation]].
:::

The exceptions are instructive precisely because they are exceptions. Developing lymphocytes of vertebrates cut and rejoin segments of their antibody and T-cell-receptor genes (V(D)J recombination), so each B or T cell carries a rearranged locus. Mammalian red blood cells expel their nucleus altogether. In the nematode *Parascaris* (studied by Theodor Boveri in 1887) and in some insects, copepods and lampreys, somatic cells discard part of their DNA early in development while the germ line keeps all of it — **chromatin diminution**. None of these is how cells *in general* become different.

::: warning "Differentiated cells have lost the genes they do not use"
A liver cell still has the genes for haemoglobin, rhodopsin and myosin of skeletal muscle; it simply does not express them. Nuclear transfer, and since 2006 reprogramming of adult cells to pluripotency by transcription factors ([[developmental-biology/stem-cells-regeneration]]), show this directly. What differs between cell types is which genes are *accessible and active* — a state carried by transcription factors and chromatin, and in principle reversible.
:::

::: example How efficient was the cloning of Dolly? {#ex-dolly}
Wilmut and colleagues reconstructed 277 sheep eggs with nuclei from cultured mammary-gland cells, and obtained one live lamb. (a) What is the success rate per reconstructed egg? (b) If the true success rate were exactly this value, how many reconstructed eggs would be needed to have a 95 % probability of at least one live lamb? (c) What does the low rate suggest about reprogramming?
::: solution
(a) $1/277 = 0.0036$, or 0.36 %.

(b) Treat each egg as an independent trial with success probability $p = 1/277$. The probability of no successes in $n$ trials is $(1-p)^n$, and we want $1 - (1-p)^n \ge 0.95$:

$$
n \ge \frac{\ln 0.05}{\ln(1 - p)} = \frac{-2.996}{-0.003617} = 828.
$$

So about 830 eggs. (The rate itself is uncertain: with one success in 277 trials the true rate could easily be several times higher or lower.)

(c) Almost every reconstructed egg failed, although each contained a complete genome. The egg cytoplasm must reprogram the donor nucleus — erase the chromatin marks and transcription-factor occupancy of a mammary cell and establish those of a zygote — within a few cell cycles, and it usually does so incompletely. Failure reflects incomplete resetting of gene-expression state, not missing genes; the one success shows the genes were there.
:::
:::

## Fate, specification and commitment

If all cells have the same genes, when and how does a cell decide what to become? We need precise words for the stages of the decision, because the same cell can be on the way to a fate without yet being committed to it.

The **fate** of a cell is simply what it normally becomes. Fate is mapped by marking cells in a normal embryo — with vital dyes (Walther Vogt's method of the 1920s), injected fluorescent tracers, or genetic labels — and seeing where their descendants end up. A **fate map** is a diagram of the early embryo showing the future of each region. It is a record of normal development, not a statement of what cells *could* do.

::: definition Specification, determination and differentiation {#def-commitment}
- A cell or tissue is **specified** for a fate if, when isolated and cultured in a neutral environment (one that supplies no instructive signals), it develops according to that fate. Specification is reversible: another environment can change the outcome.
- It is **determined** if it develops according to its fate even when transplanted to another region of the embryo, among cells with other fates. Determination is a stable, usually irreversible commitment.
- It is **differentiated** when it has become a recognisable specialised cell type — making the proteins and adopting the structure of a neuron, muscle fibre or chondrocyte. Differentiation usually follows determination by many hours or days.
:::

The two tests in [[#def-commitment]] are operational: they define commitment by what an experiment shows, and the answer can depend on what the experimenter counts as "neutral" and which new environment is tried. Still, the distinction is the most useful one in the subject.

::: example Spemann's exchange of prospective neural plate and epidermis {#ex-spemann-1918}
In 1918 Hans Spemann exchanged pieces of tissue between two newt embryos at the start of gastrulation: a piece from the region fated to become neural plate was put into the region fated to become belly epidermis, and vice versa. The embryos were of two species differing in pigmentation, so the grafted cells could be recognised later. Each graft developed according to its *new* position: prospective neural tissue in the belly made epidermis, and prospective epidermis in the neural region made brain. When the same exchange was made at the end of gastrulation, each graft developed according to its *origin*: prospective neural tissue made a piece of neural tube in the belly. What can you conclude about the commitment of these cells at the two stages?
::: solution
At the early gastrula stage, the fate of the ectoderm (neural or epidermal) is not yet determined: transplanted cells adopt the fate appropriate to their new surroundings, so their fate depends on signals they receive. By the late gastrula stage, the prospective neural cells are determined: they keep their neural fate in a foreign region. Between the two stages, something has told the dorsal ectoderm to become neural. This was the observation that led directly to the discovery of the organiser and of neural induction ([[developmental-biology/gastrulation]]). Note what the experiment does *not* show: it does not tell us whether early prospective neural tissue was already specified, which would need an isolation experiment.
:::
:::

Cells acquire their specification in three broad ways, and most embryos use all three.

1. **Autonomous specification.** A cell inherits **cytoplasmic determinants** — molecules, often mRNAs or proteins localised in particular regions of the egg — that specify its fate independently of its neighbours. Isolated, it does what it would have done in the embryo. Edwin Conklin showed in 1905 that in the tunicate *Styela partita* a yellow-pigmented region of egg cytoplasm, the yellow crescent, is inherited by the cells that make the larval tail muscles. Almost a century later Hiroki Nishida and Kaichiro Sawada (2001) identified a determinant in the ascidian *Halocynthia roretzi*: the maternal mRNA of *macho-1*, which encodes a zinc-finger transcription factor; removing it eliminates the primary tail muscle, and injecting it elsewhere induces ectopic muscle.
2. **Conditional specification.** A cell's fate depends on its position, through signals from other cells. Isolated, it may do something different; moved, it changes fate to suit its new neighbours. The early newt ectoderm of [[#ex-spemann-1918]] is conditionally specified.
3. **Syncytial specification.** In the early embryos of insects such as *Drosophila*, nuclei divide without cell membranes, in a common cytoplasm (a **syncytium**), and transcription factors can diffuse between nuclei to form concentration gradients that pattern them ([[developmental-biology/axis-formation]]).

Embryos that rely heavily on autonomous specification are sometimes called **mosaic**: remove a part and the corresponding part of the larva is missing. Embryos that rely on conditional specification are **regulative**: they can compensate for removal or addition of cells. The terms describe tendencies, not two kinds of animal: the ascidian embryo is the textbook mosaic embryo, yet its notochord and nervous system are induced, and the mouse embryo is highly regulative yet its first cell-fate decisions involve cell polarity.

::: intuition A cell knows what it inherited and where it is
At any moment, what a cell becomes depends on two kinds of information: what it carries (determinants inherited from the egg, transcription factors and chromatin states inherited from its mother cell) and what it receives (signals from neighbours, from the extracellular matrix, from mechanical forces). Autonomous and conditional specification are the two extremes of this balance. Development proceeds as a conversation in which inherited states determine which signals a cell can hear, and signals change the states that are passed on.
:::

## Potency and the epigenetic landscape

Commitment can also be described by what a cell *can* still become, its **potency**. As development proceeds, potency usually narrows.

::: definition Potency {#def-potency}
- A **totipotent** cell can give rise to every cell of the organism, including (in mammals) the extra-embryonic tissues such as the placenta. The zygote and, in the mouse, the individual blastomeres up to about the 4-cell stage are totipotent.
- A **pluripotent** cell can give rise to every cell type of the embryo proper (all three germ layers and the germ line) but not to the extra-embryonic trophoblast; the inner cell mass of the mammalian blastocyst and embryonic stem cells derived from it are pluripotent.
- A **multipotent** cell can produce several cell types of a related family — a haematopoietic stem cell makes all blood cell types.
- A **unipotent** cell produces a single cell type, like the spermatogonial stem cell.
:::

Conrad Waddington captured the idea in his **epigenetic landscape** (*The Strategy of the Genes*, 1957): a ball rolling down a surface with branching valleys. The ball is a cell; the valleys are developmental paths; at each branch point a small push — a signal — decides which valley the cell enters, and the further down it rolls, the higher the ridges between valleys and the harder it is to switch. Waddington also used the picture to explain **canalisation**, the robustness of normal development to genetic and environmental disturbance: a deep valley returns the ball to its path after a small push.

The landscape is a metaphor, but a precise version of it exists: the valleys are **stable states** of the gene-regulatory network of the cell, and the ridges are the barriers between them. The next section makes this concrete.

## Induction and competence

Conditional specification requires cells to signal to each other. Its central concept is induction.

::: definition Induction and competence {#def-induction}
**Induction** is a process in which one group of cells (the **inducer**) changes the developmental fate of another (the **responder**). The ability of the responding cells to react to the signal is their **competence**. Competence is itself a developmental state: it depends on the cells having the right receptors, signal-transduction components and transcription factors, and it is usually present only for a limited window of time.
:::

The classic example is the lens of the vertebrate eye. The optic vesicle, an outgrowth of the brain, contacts the head ectoderm, which thickens and forms the lens. Spemann reported in 1901 that destroying the optic vesicle in the frog *Rana fusca* prevented lens formation; later work showed that earlier signals from other tissues partly specify the ectoderm first, and that only head ectoderm is competent to respond. Induction is often a series of signals rather than one, and the response depends on the competence of the responder as much as on the signal.

Inductive signals are of two kinds. An **instructive** signal tells the responder which of several fates to adopt — different signals, or different concentrations of one, give different fates. A **permissive** signal allows a responder that is already specified to carry out its programme, as many extracellular matrices and survival factors do. Many inductions are **reciprocal**: the responder in turn signals back to the inducer, as when the ureteric bud and metanephric mesenchyme induce each other to form the kidney ([[developmental-biology/organogenesis]]).

Remarkably, nearly all inductive interactions in animals use members of a small set of signalling families, each described in [[cell-biology/cell-signalling]]:

| family | receptor type | examples in development |
|---|---|---|
| fibroblast growth factors (FGFs) | receptor tyrosine kinases | mesoderm maintenance, limb outgrowth, posterior body extension |
| TGF-β superfamily: BMPs, Nodal, activin | receptor serine/threonine kinases → Smads | dorsoventral patterning, mesoderm and endoderm induction, left–right asymmetry |
| Wnt | Frizzled + LRP5/6 → β-catenin | posterior and dorsal identity, segment polarity, stem-cell niches |
| Hedgehog (Sonic hedgehog in vertebrates) | Patched / Smoothened → Gli | neural-tube and limb patterning, segment polarity |
| Notch / Delta | contact-dependent; cleaved Notch acts as a transcription regulator | lateral inhibition, boundaries, segmentation clock |
| retinoic acid | nuclear receptors | anterior–posterior patterning of the hindbrain and trunk |

How can a few pathways produce so many different outcomes? Because the response to a signal depends on the responding cell: the same Wnt signal activates different enhancers in a cell that already contains one set of transcription factors than in a cell that contains another. Competence, in molecular terms, is largely the set of transcription factors a cell has before the signal arrives.

::: quiz
Cells from region R of an early embryo form cartilage when cultured alone in a simple salt solution, but form skin when grafted into the skin-forming region of another embryo of the same stage. Which description fits region R?
- [ ] Determined as cartilage, but not yet specified
- [x] Specified as cartilage, but not determined
- [ ] Differentiated as cartilage
- [ ] Totipotent
::: solution
Isolation in a neutral medium tests specification: R follows the cartilage fate when left alone, so it is specified as cartilage. Transplantation tests determination: in a skin-forming environment it changed fate, so it is not determined. It cannot be differentiated (it is still able to make skin), and "totipotent" describes the range of cell types a cell can produce, which this experiment does not measure beyond two fates.
:::
:::

## Gene regulatory networks and stable cell states

A signal acts for a while and then stops, but the cell it changed may remain a neuron for a century. How is a transient signal converted into a permanent identity? The answer lies in the circuitry of transcription factors.

A **gene regulatory network** (GRN) is the set of transcription factors and signalling inputs that regulate each other's genes in a cell, together with the enhancers through which they do so. Eric Davidson and colleagues mapped one of the most complete examples, the network that specifies endoderm and mesoderm in the sea-urchin embryo, enhancer by enhancer. Such networks contain recurring circuits, two of which explain cell memory:

- **Positive autoregulation.** A transcription factor activates its own gene. Once its concentration passes a threshold it maintains itself after the inducing signal has gone. MyoD, the master regulator of skeletal muscle, activates its own gene; its partner Myf5 and the downstream factor myogenin reinforce it. Harold Weintraub's group showed in 1987 that forcing MyoD expression in cultured fibroblasts converts them into muscle cells.
- **Mutual repression.** Two transcription factors, each specifying an alternative fate, repress each other's genes. The cell ends up with one high and the other low; which one wins depends on a small initial bias, for example from a signal. Examples include GATA1 and PU.1 in the choice between red-cell and myeloid fates, and Nanog and Gata6 in the mouse inner cell mass ([[developmental-biology/early-embryos]]).

Both circuits give a system with more than one stable state — **bistability** — which is the molecular counterpart of Waddington's valleys. We can see this in the simplest model of mutual repression. Let $x$ and $y$ be the concentrations of two repressors, each made at a maximal rate $a$, repressed by the other with a Hill function of steepness $n$, and removed by first-order decay. In units in which the decay rate constant and the repression threshold are both 1,

$$
\frac{dx}{dt} = \frac{a}{1 + y^n} - x, \qquad \frac{dy}{dt} = \frac{a}{1 + x^n} - y.
$$ {#eq-toggle}

This is the "genetic toggle switch" that Timothy Gardner, Charles Cantor and James Collins built from two bacterial repressors in *E. coli* in 2000; the same equations describe a pair of mutually repressing fate determinants (see also [[systems-biology/switches-oscillators]]).

::: proposition Bistability of the symmetric toggle switch {#prop-toggle}
The system [[#eq-toggle]] always has a symmetric steady state $x = y = x^*$, where $x^*(1 + x^{*n}) = a$. This state is unstable, and the system has two further stable asymmetric steady states (one with $x$ high and $y$ low, the other the reverse), exactly when

$$
\frac{a\,n\,x^{*\,n-1}}{(1 + x^{*n})^2} > 1,
$$ {#eq-toggle-condition}

that is, when the slope of mutual repression at the symmetric point exceeds the rate of decay. For $n = 1$ the condition is never met; for $n = 2$ it holds when $a > 2$. Assumptions: the two genes are identical in all parameters, repression is described by a Hill function, and decay is first order.
:::

::: proof
At a symmetric steady state, $x = a/(1 + x^n)$, so $x^*(1+x^{*n}) = a$; the left side increases from 0 to $\infty$, so there is exactly one such $x^*$. Write $r(u) = a/(1+u^n)$, so that $r'(u) = -a n u^{n-1}/(1+u^n)^2$. The Jacobian matrix at $(x^*, x^*)$ is

$$
J = \begin{pmatrix} -1 & r'(x^*) \\ r'(x^*) & -1 \end{pmatrix},
$$

with eigenvalues $-1 \pm \lvert r'(x^*)\rvert$ (see [linear systems](/learn/maths/lesson.php?c=ode&l=linear-systems)). The eigenvalue $-1 + \lvert r'(x^*)\rvert$ is positive, so the symmetric state is a saddle, exactly when $\lvert r'(x^*)\rvert > 1$, which is [[#eq-toggle-condition]]. The trajectories are bounded (every solution enters the square $0 \le x, y \le a$), and on either side of the saddle's stable manifold (the diagonal $x = y$) they must approach a steady state: these are the two asymmetric states. For $n=1$, using $a = x^*(1+x^*)$, $\lvert r'(x^*)\rvert = a/(1+x^*)^2 = x^*/(1+x^*) < 1$. For $n = 2$ and $a = 2$, $x^* = 1$ and $\lvert r'\rvert = 2\cdot2\cdot1/4 = 1$; since $\lvert r'(x^*)\rvert$ increases with $a$, the condition holds for all $a > 2$.
:::

::: widget phaseplane
f: a/(1 + y^n) - x
g: a/(1 + x^n) - y
x: 0, 4
y: 0, 4
sliders: a=3:0.5:5:0.1; n=2:1:4:0.1
caption: The phase plane of the toggle switch [[#eq-toggle]]: $x$ and $y$ are the concentrations of two mutually repressing transcription factors. The curves are the nullclines; their crossings are the steady states. With $a = 3$ and $n = 2$ there are three: two stable states near $(2.6, 0.4)$ and $(0.4, 2.6)$, one for each fate, and a saddle on the diagonal. Click to start trajectories: cells beginning on either side of the diagonal go to different fates. Lower $n$ towards 1, or $a$ below 2, and watch the two fates merge into a single intermediate state — without cooperative repression there is no switch.
:::

::: example Steady states of a toggle switch {#ex-toggle}
For [[#eq-toggle]] with $a = 3$ and $n = 2$, find all steady states exactly, and decide whether the symmetric one is stable.
::: solution
Steady states satisfy $x(1 + y^2) = 3$ and $y(1 + x^2) = 3$. Subtracting,

$$
x - y + xy(y - x) = (x - y)(1 - xy) = 0,
$$

so either $x = y$ or $xy = 1$.

*Symmetric state:* $x(1 + x^2) = 3$, which numerically gives $x^* = 1.213$.

*Asymmetric states:* with $xy = 1$, the first equation becomes $x + xy\cdot y = x + y = 3$. So $x$ and $y$ are the roots of $t^2 - 3t + 1 = 0$:

$$
t = \frac{3 \pm \sqrt5}{2} = 2.618 \ \text{ or } \ 0.382 .
$$

The asymmetric steady states are $(2.618, 0.382)$ and $(0.382, 2.618)$.

*Stability of the symmetric state:* $\lvert r'(x^*)\rvert = 3\cdot 2\cdot 1.213/(1 + 1.213^2)^2 = 7.28/6.11 = 1.19 > 1$, so by [[#prop-toggle]] it is a saddle, and the eigenvalues are $-1 \pm 1.19$, that is $0.19$ and $-2.19$. Any small difference between $x$ and $y$ grows, and the cell commits to one of the two asymmetric states, in which one factor is about seven times more abundant than the other.
:::
:::

The general lesson is that **cooperativity plus feedback makes decisions**. A brief signal that pushes a cell across the ridge between two valleys is remembered indefinitely, because the network holds the cell in its new state. Chromatin modifications, such as the Polycomb-mediated repression of silenced genes and DNA methylation ([[molecular-biology/eukaryotic-gene-regulation]]), add a second layer of memory that can be passed through many cell divisions.

## Cell lineage and cell number

Who descends from whom? A **cell lineage** is the family tree of the cells of an embryo, and it can be followed directly in transparent embryos, or reconstructed by marking a cell and recording which cells contain the mark later.

::: definition Cell lineage and clone {#def-lineage}
The **lineage** of a cell is its ancestry and the set of its descendants. A **clone** is the set of all descendants of a single cell. A lineage is **invariant** if the same pattern of divisions, cell fates and cell deaths occurs in every individual.
:::

The nematode *Caenorhabditis elegans* has an almost invariant lineage, and it is the only animal whose entire lineage is known. John Sulston and Robert Horvitz traced the post-embryonic divisions in 1977, and Sulston, Einhard Schierenberg, John White and Nichol Thomson the embryonic ones in 1983, by watching living embryos and larvae under Nomarski optics. In the hermaphrodite, 1090 somatic cells are generated, 131 of them die by programmed cell death, and the adult has 959 somatic nuclei. The genes that execute those deaths (*ced-3*, *ced-4*, *ced-9*) turned out to be the founders of the conserved apoptosis machinery ([[cell-biology/tissues-and-cell-death]]).

Even in such a precise animal, an invariant lineage does not mean autonomous specification: many fates in the *C. elegans* embryo are set by signals between cells whose positions are invariant. Lineage tells you who is related to whom; it does not tell you why a cell does what it does.

::: example Cell number and the number of divisions {#ex-cell-number}
(a) An adult human body contains about $3\times10^{13}$ human cells (Sender, Fuchs and Milo's 2016 estimate, dominated in number by red blood cells). What is the minimum number of rounds of division needed to produce this many cells from a zygote? (b) In *C. elegans*, what fraction of the somatic cells generated in the hermaphrodite die?
::: solution
(a) After $k$ rounds of division in which every cell divides, there are $2^k$ cells. We need $2^k \ge 3\times10^{13}$:

$$
k \ge \log_2(3\times10^{13}) = \frac{\ln(3\times10^{13})}{\ln 2} = \frac{31.03}{0.693} = 44.8,
$$

so at least 45 rounds. In reality the number of divisions in many lineages is far larger, because cells die and are replaced throughout life: roughly $2\times10^{11}$ red blood cells are made every day, so blood-forming lineages divide continually, and a cell in the colonic epithelium of an old person may lie at the end of thousands of divisions.

(b) $131/1090 = 0.12$: about one cell in eight produced dies. Programmed cell death is a normal part of building a body, not a sign of failure.
:::
:::

## The model organisms of developmental biology

A handful of species are studied in great depth, because experiments in each are easy for different reasons and because the mechanisms they reveal are shared, at the molecular level, across animals and, separately, across plants. The choice of organism is always a trade-off between genetics, which needs short generations and many offspring, and embryology, which needs large, accessible embryos.

| organism | generation time (approx.) | strengths |
|---|---|---|
| fruit fly *Drosophila melanogaster* | 10 days at 25 °C | a century of genetics; large-scale mutant screens; syncytial early embryo; imaginal discs; tools to make clones of mutant cells |
| nematode *Caenorhabditis elegans* | 3–4 days | transparent; invariant, completely known lineage; easy genetics and RNA interference; 959 somatic cells |
| zebrafish *Danio rerio* | 3–4 months | transparent embryos developing outside the mother in a few days; vertebrate genetic screens; live imaging |
| clawed frogs *Xenopus laevis* and *X. tropicalis* | 1–2 years (*X. laevis*); under a year (*X. tropicalis*) | large eggs laid in thousands; microinjection and grafting; cell-free egg extracts; *X. tropicalis* is diploid and suited to genetics |
| chick *Gallus gallus* | about 6 months | embryo accessible through a window in the shell; grafting and bead implantation; electroporation of genes |
| mouse *Mus musculus* | 2–3 months | mammalian genetics; gene targeting and transgenesis; embryonic stem cells; development inside the mother is hard to watch |
| sea urchins and ascidians | months to a year | transparent embryos; classical experimental embryology; gene regulatory networks |
| thale cress *Arabidopsis thaliana* | 6–8 weeks | plant genetics; small genome; meristems and flower development ([[developmental-biology/plant-development]]) |

Comparisons between them are the point: the segmentation genes of *Drosophila* led to the Hox genes of mice and humans, and the cell-death genes of *C. elegans* to the apoptosis pathway of mammals. Model organisms are not models of humans in particular; they are windows onto mechanisms that evolution has reused.

Experiments on vertebrate embryos are regulated. In the European Union, the United Kingdom and many other jurisdictions, protected animals include the later developmental stages of vertebrates (for example, mammalian foetuses in the final third of gestation and larvae that feed independently), and research must be licensed and follow the principles of **replacement, reduction and refinement** (the "three Rs") set out by William Russell and Rex Burch in 1959. Research on human embryos is governed separately and more strictly, a topic touched on in [[developmental-biology/stem-cells-regeneration]].

::: application Development and medicine
Roughly 2–3 % of human births are affected by a major congenital anomaly (estimates vary with the population and the definitions used), many of them caused by mutations in the signalling pathways and transcription factors described in this course, or by environmental agents that interfere with them during sensitive windows of development. The mechanistic understanding of development is also the basis of efforts to grow replacement cells and tissues from stem cells. The clinical side of these topics belongs to the Medicine Atlas ([Medicine Atlas](/learn/medicine/)); here we study the mechanisms.
:::

::: history
The central argument of the seventeenth and eighteenth centuries was between **preformation**, the view that a miniature organism already exists in the egg or sperm and merely grows, and **epigenesis**, the view that form arises progressively. Caspar Friedrich Wolff's observations of chick embryos (1759) and Karl Ernst von Baer's comparative embryology (1828) favoured epigenesis. Experimental embryology began with Wilhelm Roux, who in 1888 killed one cell of a two-cell frog embryo and obtained a half-embryo, and Hans Driesch, who in 1891 separated the first two cells of a sea-urchin embryo and found that each made a complete larva — the first demonstration of regulation. Hans Spemann's grafts of the 1910s and 1920s established induction, and Thomas Hunt Morgan, who began as an embryologist, founded the *Drosophila* genetics that in the 1970s and 1980s identified the genes development uses.
:::

::: summary
- Development comprises differentiation, pattern formation, morphogenesis, growth, renewal of the germ line and tissues, and evolutionary change.
- Somatic cells are genomically equivalent (with exceptions such as V(D)J recombination and chromatin diminution); nuclear transfer in frogs (1952, 1962) and sheep (1996) showed that differentiated nuclei keep all their genes. Cell types differ by differential gene expression.
- A fate map records what cells normally become. A cell is specified if it follows its fate when isolated, determined if it does so when transplanted, and differentiated when it has become a specialised cell type.
- Specification can be autonomous (cytoplasmic determinants such as ascidian *macho-1* mRNA), conditional (signals from neighbours) or syncytial; mosaic and regulative embryos lie at the two ends of a spectrum.
- Potency narrows from totipotent through pluripotent and multipotent to unipotent; Waddington's landscape pictures cell fates as valleys separated by ridges.
- Induction requires an inducer and a competent responder; a few signalling families (FGF, TGF-β/BMP/Nodal, Wnt, Hedgehog, Notch, retinoic acid) mediate almost all inductions, and competence is largely the prior set of transcription factors.
- Positive autoregulation and mutual repression make cell states bistable; the toggle switch $\dot x = a/(1+y^n) - x$, $\dot y = a/(1+x^n) - y$ is bistable only with cooperative repression ($n > 1$, and $a > 2$ for $n = 2$).
- Model organisms — *Drosophila*, *C. elegans*, zebrafish, *Xenopus*, chick, mouse, *Arabidopsis* — trade genetics against embryology, and reveal mechanisms shared across animals or plants.
:::

## Exercises

::: exercise Vocabulary of commitment {level=1}
For each statement, name the state of commitment (specified, determined, differentiated) or say that the information is insufficient. (a) A neural crest cell has migrated into the skin and is making melanin. (b) A piece of chick wing bud grafted onto the leg bud still forms wing structures. (c) A fate map shows that a group of cells normally becomes notochord.
::: solution
(a) Differentiated: it is making the product of a specialised cell type (a melanocyte). (b) Determined: it keeps its wing identity in a foreign environment (it is not necessarily differentiated yet). (c) Insufficient: a fate map records normal development and says nothing about specification or determination, which need isolation or transplantation experiments.
:::
:::

::: exercise Synchronous divisions {level=1 check="12"}
How many rounds of synchronous cell division are needed to turn one cell into 4096 cells?
::: solution
$4096 = 2^{12}$, so 12 rounds. (In *Xenopus*, the first 12 cleavages are nearly synchronous; see [[developmental-biology/early-embryos]].)
:::
:::

::: exercise Potency {level=1}
Rank the following in order of decreasing potency, and say in one sentence what distinguishes each from the next: a haematopoietic stem cell; a mouse zygote; a cell of the inner cell mass of a mouse blastocyst; a spermatogonial stem cell.
::: solution
Zygote (totipotent: makes the whole embryo and the placenta) > inner-cell-mass cell (pluripotent: every cell type of the embryo, including the germ line, but not trophoblast) > haematopoietic stem cell (multipotent: all blood cell types, but not other tissues) > spermatogonial stem cell (unipotent in normal life: makes only sperm).
:::
:::

::: exercise The chance of cloning success {level=2 check="0.0618"}
If each reconstructed egg in a nuclear-transfer experiment had an independent 1 % chance of producing a live animal, what would be the probability of obtaining no live animals from 277 eggs (three significant figures)?
::: solution
$(1 - 0.01)^{277} = e^{277\ln 0.99} = e^{-2.784} = 0.0618$. So even at a true rate of 1 %, nearly 94 % of experiments of this size would give at least one animal; one success in 277 does not pin the rate down precisely.
:::
:::

::: exercise Isolation and transplantation {level=2}
Region P of an amphibian embryo is tested at three stages. At stage 1, P isolated in salt solution forms epidermis only, and grafted to the dorsal mesoderm-forming region it forms mesoderm. At stage 2, P isolated forms muscle, and grafted to the ventral epidermal region it forms epidermis. At stage 3, P isolated forms muscle, and grafted to the ventral epidermal region it forms muscle. Describe the state of commitment of P at each stage, and what must have happened between stages 1 and 2.
::: solution
Stage 1: P is not specified as muscle (alone it forms epidermis, a default fate), and it is not determined (it responds to the mesoderm-forming environment). Stage 2: P is specified as muscle (it forms muscle when isolated) but not determined (in a new environment it changes fate). Stage 3: P is determined as muscle. Between stages 1 and 2, P must have received an inductive signal — probably from the tissue it was next to in the embryo — that specified it as muscle; between stages 2 and 3 this specification was stabilised, for example by positive feedback in its gene-regulatory network or by signalling among the responding cells themselves (a "community effect", John Gurdon, 1988).
:::
:::

::: exercise Critical strength of a toggle switch {level=2 check="1.19"}
For the toggle switch [[#eq-toggle]] with Hill coefficient $n = 3$, find the smallest maximal synthesis rate $a$ for which the system is bistable (three significant figures). *Hint:* at the critical point the symmetric steady state satisfies both $x(1+x^n) = a$ and [[#eq-toggle-condition]] with equality.
::: hint
Substitute $a = x(1 + x^n)$ into the stability condition, which then involves only $x$.
:::
::: solution
With $a = x(1+x^n)$, the condition $a n x^{n-1}/(1+x^n)^2 = 1$ becomes

$$
\frac{n x^n}{1 + x^n} = 1 \quad\Longrightarrow\quad x^n = \frac{1}{n-1}.
$$

For $n = 3$, $x^3 = 1/2$, $x = 0.794$, and $a = x(1 + x^3) = 0.794\times1.5 = 1.19$. Generally $a_\mathrm{crit} = \dfrac{n}{n-1}(n-1)^{-1/n}$, which gives 2 for $n = 2$ and tends to 1 as $n$ grows: steeper repression makes bistability easier to achieve.
:::
:::

::: exercise Roux and Driesch revisited {level=3}
Roux's half-embryo (1888) and Driesch's whole larvae (1891) were taken at the time as evidence for two opposite principles. (a) Explain why Roux's result does not show that the frog embryo is mosaic. (b) Design an experiment, using separated frog blastomeres, that would test whether the dorsal side of the egg contains determinants needed for a complete embryo. What results would you predict?
::: solution
(a) In Roux's experiment the killed blastomere remained in place. The living cell still "saw" a neighbour and developed as the half it would normally form; it was not tested in isolation, so its potential to regulate was never revealed. A mosaic interpretation requires that an isolated blastomere forms only a part, which Roux did not test.

(b) Separate the two blastomeres completely at the 2-cell stage, in embryos in which the first cleavage plane can be scored relative to the future dorsal side (the grey crescent or the sperm-entry point, which lies opposite the future dorsal side). Prediction: if the first cleavage plane divides the dorsal region between the two cells, each isolated blastomere forms a complete, smaller embryo; if the cleavage plane separates a dorsal from a ventral half, only the dorsal cell forms a complete embryo, and the ventral one forms a ventralised mass without axial structures (a "belly piece"). This is what Spemann observed in newts by constricting eggs with a hair loop, and it shows both regulation and the existence of dorsal determinants ([[developmental-biology/axis-formation]]).
:::
:::

::: exercise Interpreting a nuclear-transfer series {level=3}
In a hypothetical nuclear-transfer series in a frog, the percentage of reconstructed eggs that form swimming tadpoles is 35 % with blastula nuclei, 20 % with gastrula nuclei, 6 % with tailbud-stage endoderm nuclei and 1.5 % with tadpole intestinal nuclei. (a) Does this decline show that genes are lost as cells differentiate? (b) Give two explanations for the decline that are consistent with genomic equivalence, and propose an observation that would distinguish them.
::: solution
(a) No. Genomic equivalence predicts that *some* nuclei from every stage can support development, and that is what the data show: even 1.5 % success with intestinal nuclei means that those nuclei contained every gene needed. A decline in efficiency does not show loss of genes, because a single success is a proof of retention, whereas failure can have many causes.

(b) (1) **Stable epigenetic memory**: differentiated nuclei carry chromatin states (repressive histone marks, DNA methylation, bound transcription factors) that the egg cytoplasm cannot erase in the few short cell cycles before the embryo must activate its genome; older, more differentiated nuclei have more such memory. (2) **Technical and cell-cycle damage**: nuclei of slowly dividing differentiated cells are forced into the very rapid cleavage cycles of the egg and suffer chromosome breakage or incomplete DNA replication. To distinguish them, examine failed embryos: if (2) is important they should show chromosome abnormalities (lagging chromosomes, breaks); if (1) is important they should have normal chromosomes but persistent expression of donor-cell genes (for example intestinal markers) and failure to activate embryonic genes. Both explanations have experimental support.
:::
:::
