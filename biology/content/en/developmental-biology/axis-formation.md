Before an embryo can make a head, it must know which end is the front. Every bilaterally symmetrical animal has three body axes: **anterior–posterior** (head to tail), **dorsal–ventral** (back to belly) and **left–right**. They are established early, often before or during cleavage, and every later pattern is built on them. The question of this chapter is how a nearly spherical egg acquires these axes, and how cells along an axis learn where they are.

Two very different animals give the clearest answers. In the fruit fly *Drosophila melanogaster*, the axes are set up in the egg chamber of the mother, by molecules she places at particular positions, and they are read out in the syncytial embryo by concentration gradients of transcription factors. In vertebrates the egg is less prepatterned, and the axes are set by events at fertilisation (in frogs), by gravity (in chicks) or by interactions among the cells of the early embryo (in mice). Both rely on the idea of **positional information**: cells acquire a value that depends on their position, and interpret it according to their genetic programme. The concepts of specification and the nuclear-to-cytoplasmic ratio come from [[developmental-biology/principles-of-development]] and [[developmental-biology/early-embryos]].

## Maternal effect genes

In 1980 Christiane Nüsslein-Volhard and Eric Wieschaus began screening *Drosophila* for mutations that disturbed the pattern of the larval cuticle. Mutations in some genes gave abnormal embryos whatever the genotype of the embryo itself, provided the *mother* was homozygous mutant. These are maternal effect genes.

::: definition Maternal effect gene {#def-maternal-effect}
A **maternal effect gene** is a gene whose products, made in the mother during oogenesis and deposited in the egg, are required for the development of the embryo. The phenotype of the embryo is determined by the genotype of its mother: a homozygous mutant female produces defective embryos even when they are fertilised by a wild-type male, and a heterozygous female produces normal embryos even when the embryos are themselves homozygous mutant.
:::

Screens for maternal effect mutations in *Drosophila*, largely by Nüsslein-Volhard's group in Tübingen in the 1980s, found that the anterior–posterior axis is organised by three independent systems and the dorsal–ventral axis by a fourth:

| system | key maternal products | localised where | mutant phenotype |
|---|---|---|---|
| anterior | *bicoid* mRNA | anterior pole | head and thorax missing, replaced by posterior structures |
| posterior | *oskar*, *nanos* mRNA; pole plasm | posterior pole | abdomen missing; no germ cells (for *oskar*) |
| terminal | Torso receptor (uniform), activated at both poles | ends of the egg | extreme ends (acron and telson) missing |
| dorsal–ventral | Toll receptor (uniform), activated ventrally; Dorsal protein | ventral side | embryo dorsalised (or ventralised) |

To see how these systems arise, we must start in the ovary.

## The *Drosophila* egg chamber

An egg develops in an **egg chamber**: an oocyte joined by cytoplasmic bridges (ring canals) to 15 **nurse cells**, its sisters from four incomplete divisions of a germ-line cell, the whole surrounded by a layer of somatic **follicle cells**. The nurse cells make most of the mRNAs and proteins of the egg and pump them into the oocyte. The two axes are set by two signals from the oocyte to the follicle cells, using the same molecule twice.

1. **Anterior–posterior.** Early in oogenesis the oocyte sits at the posterior end of the chamber, and its nucleus produces the mRNA of **Gurken**, a TGF-α-like ligand. Gurken protein signals through the EGF receptor (Torpedo) of the nearest follicle cells and gives them posterior identity. These cells signal back to the oocyte, which reorganises its microtubules so that their minus ends lie mostly at the anterior and their plus ends towards the posterior. *bicoid* mRNA from the nurse cells is carried by the minus-end-directed motor dynein to the anterior pole and anchored there; *oskar* mRNA is carried by the plus-end motor kinesin to the posterior pole. Oskar protein then assembles the **pole plasm**, which traps *nanos* mRNA and contains the determinants of the germ line.
2. **Dorsal–ventral.** The oocyte nucleus then moves to an anterior position on one side, and *gurken* mRNA, translated near it, signals once more to the overlying follicle cells, which become dorsal. In dorsal follicle cells, EGF-receptor signalling represses the gene *pipe*; ventral follicle cells, receiving no Gurken, express it. That side becomes the ventral side of the embryo.

The egg is laid with its axes already defined by the positions of mRNAs, and of an extracellular mark on the inside of its eggshell.

## The anterior–posterior axis

### Bicoid, the first morphogen

**Bicoid** is a homeodomain transcription factor. Its mRNA is held at the anterior pole of the egg, and when the egg is laid it is translated. The protein spreads posteriorly through the syncytium and is degraded, forming a concentration gradient: high anteriorly, falling to almost nothing in the posterior half. Wolfgang Driever and Christiane Nüsslein-Volhard demonstrated this gradient with antibodies in 1988 and showed that it is instructive. Embryos from mothers with fewer copies of *bicoid* formed head structures closer to the anterior end, and with more copies the head was enlarged and the head–thorax boundary moved posteriorly. Injecting *bicoid* mRNA into the middle of an embryo from a *bicoid* mutant mother made head structures there, flanked by mirror-image thoracic structures. A substance whose concentration specifies different fates at different positions is exactly what Lewis Wolpert had called a morphogen.

::: definition Morphogen and positional information {#def-morphogen}
A **morphogen** is a substance that spreads from a localised source, forming a concentration gradient, and acts *directly* on cells at a distance to specify different fates at different concentrations. **Positional information** is the value that a cell acquires according to its position relative to boundaries or sources; the cell **interprets** it according to its own genetic programme. Wolpert's **French flag model** (1969) is the standard illustration: cells above a high threshold of morphogen become blue, those between a high and a low threshold white, and those below the low threshold red.
:::

Bicoid acts in two ways. As a transcription factor it activates target genes, above all the zygotic gene *hunchback*, in the anterior half; promoters with higher-affinity or more numerous Bicoid binding sites respond at lower concentrations and so are expressed further posteriorly. As an RNA-binding protein it represses the translation of the uniformly distributed maternal mRNA of *caudal*, so that Caudal protein forms an opposite gradient, high posteriorly.

### Nanos and the posterior system

The posterior system works by repression. *nanos* mRNA is localised to the pole plasm, and Nanos protein, with the RNA-binding protein Pumilio, represses the translation of maternal *hunchback* mRNA, which is otherwise present throughout the egg. So maternal Hunchback protein is made in the anterior but not the posterior, reinforcing the gradient produced by Bicoid's activation of zygotic *hunchback*. An embryo without Nanos lacks its abdomen because Hunchback protein extends too far posteriorly and represses abdominal genes — and, remarkably, an embryo lacking both maternal *hunchback* and *nanos* develops a nearly normal abdomen, showing that Nanos's only essential job is to remove Hunchback.

### The terminal system

The **Torso** receptor tyrosine kinase is present all over the egg membrane but is activated only at the two ends, by a ligand processed with the help of the protein Torso-like, which is made by follicle cells at the poles of the egg chamber. Torso signalling through the Ras–MAP kinase pathway ([[cell-biology/cell-signalling]]) relieves the repression of the zygotic genes *tailless* and *huckebein* at the poles, which then specify the unsegmented extreme ends: the acron at the front and the telson at the rear.

::: intuition Three gradients, read together
By the end of the syncytial stage, each nucleus along the anterior–posterior axis sees a particular combination of Bicoid, Hunchback, Caudal and the terminal signal: high Bicoid, high Hunchback, low Caudal at the front; low Bicoid, low Hunchback, high Caudal at the back. No single gradient carries all the information. The next layer of genes, the gap genes of [[developmental-biology/segmentation-hox]], read these combinations through enhancers that integrate several inputs and repress each other, sharpening a few smooth gradients into a series of distinct domains.
:::

## The mathematics of a morphogen gradient

How does a gradient like Bicoid's form, and how much information can it carry? The simplest model, often called the **synthesis–diffusion–degradation** (SDD) model, supposes that the morphogen is made at a source at $x = 0$, diffuses with diffusion coefficient $D$, and is degraded everywhere with first-order rate constant $k = 1/\tau$, where $\tau$ is its mean lifetime.

::: proposition The exponential gradient {#prop-sdd}
In one dimension, with production confined to the source at $x = 0$, diffusion coefficient $D$ and uniform first-order degradation with mean lifetime $\tau$, the morphogen concentration $c(x, t)$ obeys

$$
\frac{\partial c}{\partial t} = D\frac{\partial^2 c}{\partial x^2} - \frac{c}{\tau} \qquad (x > 0).
$$ {#eq-sdd}

At steady state, in a tissue much longer than $\lambda$, its concentration is

$$
c(x) = c_0\,e^{-x/\lambda}, \qquad \lambda = \sqrt{D\tau},
$$ {#eq-gradient}

where $c_0$ is the concentration at the source, proportional to the rate of production. The **decay length** $\lambda$ is the distance over which the concentration falls by a factor $e$. Assumptions: constant $D$ and $\tau$, linear degradation, a source of fixed strength, and a field long compared with $\lambda$.
:::

::: proof
At steady state $\partial c/\partial t = 0$, so $D c'' = c/\tau$, or $c'' = c/\lambda^2$ with $\lambda^2 = D\tau$. The general solution is $c = A e^{-x/\lambda} + B e^{x/\lambda}$. The concentration must stay bounded far from the source, so $B = 0$, and $A = c(0) = c_0$. (The flux leaving the source, $-Dc'(0) = Dc_0/\lambda$, equals the rate of production, which fixes $c_0$.)
:::

Three consequences follow, and each has been tested in embryos.

**Thresholds become positions.** A target gene switched on above a threshold concentration $T$ is expressed in the region $x < x_T$, where

$$
x_T = \lambda\ln\frac{c_0}{T}.
$$ {#eq-threshold}

**Dose shifts positions logarithmically.** Multiplying the production of the morphogen by a factor $m$ multiplies $c_0$ by $m$ and moves every boundary posteriorly by the same distance $\Delta x = \lambda\ln m$, independent of the threshold. This is the prediction tested by Driever and Nüsslein-Volhard's *bicoid* dosage series.

**Noise becomes positional error.** If a cell estimates the concentration with a relative error $\delta c/c$, the corresponding error in position is $\delta x = \lambda\,\delta c/c$, because $\lvert dc/dx\rvert = c/\lambda$ for an exponential.

::: widget plot
f: A*exp(-x/L); T1; T2
x: 0, 500
y: 0, 1.1
sliders: A=1:0.25:2:0.05; L=100:30:200:5; T1=0.5:0.05:0.9:0.01; T2=0.1:0.01:0.4:0.01
labels: c(x) = A\,e^{-x/\lambda}; \text{high threshold}; \text{low threshold}
caption: A French flag from an exponential gradient [[#eq-gradient]] along a 500 µm embryo, with relative production $A$ and decay length $\lambda$ (slider $L$, in µm). Cells where the curve lies above the high threshold adopt fate 1, between the thresholds fate 2, and below the low threshold fate 3; the boundaries are where the curve crosses the horizontal lines, at $x_T = \lambda\ln(A/T)$. Double $A$ from 1 to 2 and both boundaries move posteriorly by the same distance, $\lambda\ln 2 \approx 69$ µm at $\lambda = 100$ µm; lengthen $\lambda$ and the whole pattern stretches.
:::

::: example The Bicoid gradient {#ex-bicoid}
The *Drosophila* embryo is about 500 µm long, and the Bicoid gradient decays with $\lambda \approx 100$ µm, about 20 % of egg length (measured by Thomas Gregor, Eric Wieschaus, William Bialek and colleagues with a fluorescent Bicoid fusion protein in living embryos). (a) If Bicoid has a lifetime of $\tau = 60$ min, what diffusion coefficient would the SDD model need? (b) The *hunchback* boundary lies near the middle of the embryo. At what fraction of the anterior concentration does Bicoid activate *hunchback*? (c) By how much should the boundary shift in an embryo from a mother with twice the normal dose of *bicoid*?
::: solution
(a) From $\lambda = \sqrt{D\tau}$, $D = \lambda^2/\tau = (100\ \mathrm{\mu m})^2/3600\ \mathrm{s} = 2.8\ \mathrm{\mu m^2\,s^{-1}}$.

(b) With $x_T = 250$ µm, [[#eq-threshold]] gives $T/c_0 = e^{-x_T/\lambda} = e^{-2.5} = 0.082$: the boundary is where Bicoid has fallen to about 8 % of its anterior level.

(c) $\Delta x = \lambda\ln2 = 100\times0.693 = 69$ µm, about 14 % of egg length, posteriorly.

How well does the model fit? Measurements of the diffusion of Bicoid have been controversial. Photobleaching experiments by Gregor and colleagues in 2007 suggested $D \approx 0.3\ \mathrm{\mu m^2\,s^{-1}}$, which would give a gradient far too short in the time available; fluorescence correlation measurements soon afterwards found much faster-moving fractions of several µm² s⁻¹, consistent with (a). And in dosage experiments the boundaries of Bicoid targets shift in the predicted direction but often somewhat less than $\lambda\ln m$, indicating that other inputs — the posterior system and the cross-regulation of the gap genes — also position them. The simple model captures the scales, not every detail.
:::
:::

### Reading a gradient sharply

If *hunchback* expression were simply proportional to Bicoid concentration, it would fade gradually along the embryo. Instead it forms a sharp boundary: within a few nuclei, expression drops from high to low. A steep threshold response is described by a Hill function ([[cell-biology/cell-signalling]]): the fraction of maximal expression is $c^n/(T^n + c^n)$, where $n$ is the Hill coefficient. Gregor and colleagues estimated in 2007 that *hunchback* responds to Bicoid with an effective Hill coefficient of about 5, consistent with its promoter's cluster of Bicoid binding sites and their cooperative occupancy.

::: proposition Width of a boundary read from an exponential gradient {#prop-boundary-width}
If a target gene responds to an exponential gradient $c = c_0e^{-x/\lambda}$ with a Hill function of coefficient $n$, its expression falls from 90 % to 10 % of maximum over a distance

$$
\Delta x_{90\to10} = \frac{\lambda\ln 81}{n} \approx \frac{4.4\,\lambda}{n}.
$$ {#eq-boundary-width}
:::

::: proof
Expression $E = 1/(1 + (T/c)^n)$, so $E/(1-E) = (c/T)^n$ and $\ln(c/T) = \tfrac1n\ln\bigl(E/(1-E)\bigr)$. With $\ln c = \ln c_0 - x/\lambda$, the positions where $E = 0.9$ and $E = 0.1$ differ by $\Delta x = \tfrac{\lambda}{n}\bigl(\ln 9 - \ln\tfrac19\bigr) = \tfrac{\lambda}{n}\ln81$.
:::

::: widget plot
f: 1/(1 + (T/(A*exp(-x/L)))^n); A*exp(-x/L)
x: 0, 500
y: 0, 1.1
sliders: n=5:1:10:0.1; A=1:0.25:2:0.05; L=100:30:200:5; T=0.08:0.02:0.5:0.01
labels: \text{target expression}; \text{morphogen } c(x)
caption: A target gene (first curve) reading an exponential morphogen gradient (second curve) through a Hill function of coefficient $n$ with threshold $T$, along a 500 µm embryo. With $n = 5$, $\lambda = 100$ µm and $T = 0.08$, as for *hunchback* reading Bicoid, the expression boundary lies near mid-embryo and falls from 90 % to 10 % over about 90 µm, by [[#eq-boundary-width]]. Set $n = 1$ and the same gradient gives a smear several hundred micrometres wide; raising $A$ shifts the boundary without changing its sharpness.
:::

::: example How sharp is the *hunchback* boundary? {#ex-boundary-width}
Bicoid has $\lambda = 100$ µm, and *hunchback* responds with a Hill coefficient $n \approx 5$. (a) Over what distance does *hunchback* expression fall from 90 % to 10 %? (b) What would the width be if each Bicoid molecule acted independently ($n = 1$)? (c) How many nuclear spacings (8 µm) is each?
::: solution
(a) By [[#eq-boundary-width]], $\Delta x = 100\times\ln81/5 = 100\times4.394/5 = 88$ µm.

(b) With $n = 1$, $\Delta x = 439$ µm — almost the whole length of the 500 µm embryo, so there would be no boundary to speak of.

(c) 88/8 ≈ 11 nuclear spacings, against 55 for $n = 1$. Cooperativity converts a smooth exponential into something recognisable as a boundary, but on its own it is still an order of magnitude less sharp than what the embryo achieves.
:::
:::

Even a Hill coefficient of 5 gives a boundary about 90 µm wide on a 100 µm gradient, about ten nuclear spacings. The real *hunchback* boundary in cycle 14 is sharper, and it is positioned with a precision of about one nuclear spacing between embryos, although the Bicoid gradient itself varies more than that. Bernard Houchmandzadeh, Eric Wieschaus and Stanislas Leibler highlighted this in 2002, and it has driven much research on how embryos achieve precision: by averaging over time, by communication between neighbouring nuclei, and by mutual repression among gap genes, which makes their boundaries self-sharpening. It is a recurring theme that development is more precise than any single molecular step.

::: example How precise can a gradient be? {#ex-positional-error}
Suppose a nucleus measures the local concentration of Bicoid with a relative error of 10 % (from the random arrival of a few hundred molecules at its *hunchback* enhancers). With $\lambda = 100$ µm, what is the resulting uncertainty in its position? Nuclei in cycle 14 are about 8 µm apart. Is a single gradient enough to specify a boundary to within one nucleus?
::: solution
$\delta x = \lambda\,\delta c/c = 100\times0.10 = 10$ µm, slightly more than one nuclear spacing. A single gradient read with 10 % precision could therefore place a boundary to within one or two nuclei — but only if the gradient itself were identical in every embryo, which it is not. A 10 % variation in the amount of Bicoid between embryos would shift the boundary by $\lambda\ln1.1 = 9.5$ µm, another nucleus. Precision of about one nucleus is at the limit of what a single gradient can deliver, and the measured precision of the boundary is one reason to think embryos use several inputs together.
:::
:::

::: warning "Every gradient is a morphogen gradient"
A molecule whose concentration varies across a tissue is not necessarily a morphogen. To qualify, it must act directly on cells at a distance (not through a relay of other signals), and different concentrations must specify different fates. Showing this requires experiments: changing the dose and seeing boundaries move ([[#ex-bicoid]]), making clones of cells unable to receive the signal and seeing them change fate cell-autonomously, or introducing the molecule elsewhere and seeing new patterns appear around it. Many gradients turn out to be graded consequences of other signals rather than instructive signals themselves; and many patterns arise without a long-range morphogen at all, by local interactions ([[developmental-biology/organogenesis]]).
:::

## The dorsal–ventral axis of *Drosophila*

The ventral mark left by *pipe* in the follicle cells is a sulfated protein in the inner layer of the eggshell. After fertilisation it triggers a cascade of serine proteases in the fluid between the embryo and its envelope, which ends with the cleavage of a protein called Spätzle into an active ligand, only on the ventral side. Spätzle binds the receptor **Toll**, present all over the embryo's membrane. (Toll's relatives in mammals, the Toll-like receptors, were later found to be key receptors of innate immunity — a celebrated case of a developmental gene revealing a pathway used elsewhere.)

Toll signalling causes degradation of a cytoplasmic inhibitor, Cactus, which releases the transcription factor **Dorsal** to enter the nuclei. So Dorsal protein, present everywhere, is nuclear on the ventral side and cytoplasmic on the dorsal side, with a graded transition in between. Siegfried Roth, David Stein and Nüsslein-Volhard, and independently Ruth Steward, described this nuclear gradient in 1989. Dorsal is related to the mammalian transcription factor NF-κB, and Cactus to its inhibitor IκB.

The nuclear Dorsal gradient is read by target enhancers with different thresholds:

- High Dorsal, ventrally, activates *twist* and *snail*, which specify **mesoderm**.
- Intermediate levels, in the ventrolateral region, activate genes such as *rhomboid* and *short gastrulation* (*sog*) in the **neuroectoderm**, which forms the ventral nerve cord; Snail represses them where Dorsal is highest.
- Dorsal *represses* *decapentaplegic* (*dpp*) and *zerknüllt* (*zen*), so these are expressed only dorsally, in the **dorsal ectoderm** and amnioserosa.

Dpp, a BMP, then forms a second, finer gradient in the dorsal region, shaped by the Sog protein from the neuroectoderm, which binds Dpp and helps carry it dorsally. The same pair of molecules — a BMP and its antagonist — patterns the dorsal–ventral axis of vertebrates, with the axis upside down ([[developmental-biology/gastrulation]], [[developmental-biology/evo-devo]]).

::: quiz
A female fly is homozygous for a loss-of-function mutation in *Toll*. Her mate is wild type. What will the embryos look like?
- [ ] Normal, because they receive a wild-type copy of *Toll* from their father
- [x] Dorsalised: all cells take dorsal fates, with no mesoderm or ventral nerve cord
- [ ] Ventralised: all cells form mesoderm
- [ ] Lacking a head, like *bicoid* mutants
::: solution
*Toll* is a maternal effect gene: the receptor needed at the time the axis is set comes from the mother's mRNA, before the embryo's own genes (including the paternal copy) are active. Without Toll, Dorsal stays cytoplasmic everywhere, *twist* and *snail* are not activated, and *dpp* and *zen* are not repressed: the embryo becomes a tube of dorsal epidermis. Dominant gain-of-function *Toll* alleles, which signal everywhere, do the opposite and ventralise the embryo.
:::
:::

## Axes in vertebrates

### The frog: the sperm sets the dorsal side

The *Xenopus* egg has a maternal **animal–vegetal axis**, visible as the pigmented animal hemisphere. Maternal mRNAs localised in the vegetal cortex during oogenesis include *vegT*, which encodes a T-box transcription factor needed to make endoderm and to induce mesoderm, and *vg1*, encoding a TGF-β family member.

The dorsal–ventral axis is set at fertilisation. The sperm enters the animal hemisphere, and its centriole organises an array of parallel microtubules in the vegetal cortex. Along these the cortex rotates by about 30° relative to the inner cytoplasm, moving towards the side opposite sperm entry, which becomes **dorsal**. Cortical rotation carries vegetal components — including the Wnt pathway protein Dishevelled and the mRNA of the ligand Wnt11 — to the future dorsal side, where they stabilise **β-catenin** ([[cell-biology/cell-signalling]]). By the blastula stage β-catenin is in the nuclei of dorsal cells and nowhere else.

The evidence is a series of simple manipulations:

- Ultraviolet light applied to the vegetal pole just after fertilisation destroys the microtubule array and prevents cortical rotation. The embryos develop without dorsal structures — no head, notochord or neural tube.
- Turning such an embryo by 90° so that gravity moves the cytoplasm against the cortex rescues a dorsal axis on the side that was turned upwards.
- Lithium chloride, which inhibits glycogen synthase kinase 3 and so stabilises β-catenin everywhere, dorsalises embryos: they form enlarged heads and notochords all round.
- Depleting maternal β-catenin mRNA prevents axis formation (Janet Heasman, Christopher Wylie and colleagues, 1994).

In the dorsal vegetal cells, β-catenin together with the vegetal transcription factor VegT and Nodal-related signals forms the **Nieuwkoop centre**, named after Pieter Nieuwkoop, who showed in 1969 that vegetal cells induce mesoderm in animal-hemisphere cells placed against them. The Nieuwkoop centre induces the cells above it to become the **organiser**, the signalling centre of gastrulation described in [[developmental-biology/gastrulation]].

::: example Rescuing a UV-treated embryo {#ex-uv}
*Xenopus* eggs are irradiated at the vegetal pole with ultraviolet light 30 min after fertilisation. Predict the outcome in each case and explain it: (a) no further treatment; (b) injection of *β-catenin* mRNA into one vegetal blastomere at the 32-cell stage; (c) injection of the same mRNA into an animal-pole blastomere; (d) brief treatment with lithium chloride at the 32-cell stage.
::: solution
(a) Without cortical rotation, β-catenin is not stabilised on any side: no Nieuwkoop centre, no organiser, and a radially symmetrical embryo with ventral fates only (gut and ventral mesoderm, no axis).

(b) β-catenin in one vegetal cell recreates a Nieuwkoop centre on that side: the embryo forms one dorsal axis centred on the injected cell. This shows that cortical rotation acts by stabilising β-catenin, and that the dorsal side can be placed anywhere.

(c) Animal cells containing β-catenin cannot form a Nieuwkoop centre by themselves, because they lack the vegetal factors (VegT, Nodal-related signals) that cooperate with it; the result is at most a weak or partial axis, depending on how far the injected material spreads.

(d) Lithium stabilises β-catenin in all cells, so the whole vegetal region becomes like the Nieuwkoop centre: a "dorsalised" embryo with a radial, oversized head and notochord and little ventral tissue. The strength of the effect depends on the dose and timing.
:::
:::

### Chick and mouse

The chick embryo forms on top of the yolk as a disc, the blastoderm. As the egg rotates in the shell gland of the hen's oviduct, gravity tilts the blastoderm, and the side that is uppermost becomes the posterior. A crescent of cells at the posterior edge, **Koller's sickle**, and the posterior marginal zone above it, act as a Nieuwkoop-centre-like region; the **primitive streak**, through which cells will gastrulate, forms there.

The mouse embryo has no detectable maternal axis. Around implantation, the epiblast forms a cup, the **egg cylinder**, covered by visceral endoderm. A group of cells at its tip, the **distal visceral endoderm**, migrates to one side and becomes the **anterior visceral endoderm** (AVE). The AVE secretes antagonists of Nodal and Wnt (Lefty1 and Cerberus-like) that keep the adjacent epiblast anterior; on the opposite side, Nodal and Wnt3 signalling is free to induce the primitive streak, which marks the posterior. Anne Thomas and Rosa Beddington showed in 1996 that removing the AVE prevents formation of the forebrain. In the mouse, then, the anterior–posterior axis arises from interactions between cells of the embryo, not from a maternal prepattern.

## The left–right axis

The heart, gut, liver and lungs of vertebrates are placed asymmetrically, although the body looks symmetrical outside. Asymmetry is set up after the other two axes, at about the time of somite formation, and the first step in the mouse is a fluid flow. At the posterior end of the notochord lies a small pit, the **node**, whose cells each carry one motile cilium. The cilia rotate clockwise when seen from the ventral side and, because they are tilted posteriorly, drive a leftward flow of the fluid over the node.

Shigenori Nonaka, Nobutaka Hirokawa and colleagues described this **nodal flow** in 1998: mice lacking the motor protein KIF3B have no cilia on the node, no flow, and a random left–right orientation of their organs. In 2002 Nonaka and colleagues reversed the flow in cultured mouse embryos by applying an artificial rightward current, and the embryos developed reversed asymmetry. How the flow is sensed is still debated: crown cells at the edge of the node have immotile cilia that are thought to detect the flow mechanically or through Ca²⁺ signalling, and an older idea proposed that the flow carries vesicles of signalling molecules to the left side.

Downstream, on the left side only, the TGF-β family protein **Nodal** is expressed in the lateral plate mesoderm, together with its feedback inhibitor **Lefty** and the transcription factor **Pitx2**, which directs the asymmetric morphogenesis of the organs. Lefty1 in the midline acts as a barrier that keeps Nodal from spreading to the right. Not all vertebrates use cilia-driven flow — chick embryos break symmetry by cell movements around Hensen's node — but the left-sided Nodal–Lefty–Pitx2 cassette is widely conserved.

::: application Ciliopathies and laterality
In humans, about half of people with primary ciliary dyskinesia, an inherited defect of motile cilia, have *situs inversus*, a mirror-image arrangement of the internal organs: without nodal flow, the left–right axis is set at random, so half the time it is reversed. The association, first noticed by Manes Kartagener in the 1930s, made sense only after nodal flow was discovered. The clinical features of laterality and ciliary disorders are covered by the Medicine Atlas ([Medicine Atlas](/learn/medicine/)).
:::

::: history
Theodor Boveri suggested in 1901 that the sea-urchin egg contains a gradient along its animal–vegetal axis, and gradient ideas were developed in the 1910s by Charles Manning Child, working with flatworms and hydroids. Lewis Wolpert formulated positional information and the French flag in 1969, and in 1970 Francis Crick showed that diffusion could establish gradients over the distances of early embryos within hours. The molecular era began with the 1980s maternal screens of Nüsslein-Volhard's group, Driever and Nüsslein-Volhard's identification of the Bicoid gradient (1988), and the nuclear Dorsal gradient (1989). Nüsslein-Volhard, Wieschaus and Edward Lewis shared the 1995 Nobel Prize in Physiology or Medicine for "discoveries concerning the genetic control of early embryonic development". In vertebrates, the role of cortical rotation was shown by John Gerhart and colleagues in the 1980s, the role of β-catenin in the 1990s, and nodal flow in 1998.
:::

::: summary
- Animals have anterior–posterior, dorsal–ventral and left–right axes, set early and used by all later patterning.
- In *Drosophila*, maternal effect genes set up the axes in the egg chamber. Gurken from the oocyte signals twice to the follicle cells, defining posterior and then dorsal; microtubule polarity places *bicoid* mRNA anteriorly and *oskar* and *nanos* mRNA posteriorly.
- Bicoid forms an anterior gradient, activates zygotic *hunchback* and represses *caudal* translation; Nanos represses maternal *hunchback* posteriorly; Torso signalling specifies the termini.
- A morphogen acts directly at a distance with concentration-dependent effects. In the synthesis–diffusion–degradation model, $c = c_0e^{-x/\lambda}$ with $\lambda = \sqrt{D\tau}$; boundaries lie at $x_T = \lambda\ln(c_0/T)$, shift by $\lambda\ln m$ when dose changes $m$-fold, and have positional error $\lambda\,\delta c/c$. Bicoid has $\lambda \approx 100$ µm.
- Steep (Hill) readouts sharpen boundaries to a width $\lambda\ln81/n$; real boundaries are more precise than single gradients predict, through feedback and cross-repression.
- Ventral Toll activation frees Dorsal to enter ventral nuclei; a nuclear Dorsal gradient specifies mesoderm (*twist*, *snail*), neuroectoderm (*rhomboid*, *sog*) and, by repression, dorsal ectoderm (*dpp*, *zen*).
- In *Xenopus*, cortical rotation away from sperm entry stabilises β-catenin dorsally, forming the Nieuwkoop centre that induces the organiser. In mouse, the anterior visceral endoderm restricts Nodal and Wnt so that the primitive streak forms posteriorly.
- Left–right asymmetry in mice starts with leftward nodal flow driven by rotating cilia, leading to left-sided Nodal, Lefty and Pitx2.
:::

## Exercises

::: exercise Decay length {level=1 check="42.4"}
A morphogen has a diffusion coefficient of $1\ \mathrm{\mu m^2\,s^{-1}}$ and a mean lifetime of 30 min. What is its decay length $\lambda$ in µm, by the SDD model (three significant figures)?
::: solution
$\lambda = \sqrt{D\tau} = \sqrt{1\times1800}\ \mathrm{\mu m} = 42.4$ µm.
:::
:::

::: exercise Threshold position {level=1 check="230"}
For a gradient $c = c_0e^{-x/\lambda}$ with $\lambda = 100$ µm, at what distance (in µm, to three significant figures) from the source is the concentration 10 % of $c_0$?
::: solution
$x = \lambda\ln(c_0/c) = 100\ln10 = 230$ µm.
:::
:::

::: exercise Maternal phenotypes {level=1}
Predict the phenotypes of embryos from homozygous mutant mothers for: (a) *bicoid*; (b) *nanos*; (c) *torso*; (d) *cactus* (loss of function).
::: solution
(a) No head or thorax; the anterior end forms posterior structures (a second telson). (b) No abdominal segments, because maternal Hunchback is not repressed posteriorly. (c) No acron or telson (the unsegmented termini). (d) Ventralised: without Cactus, Dorsal enters all nuclei, so the whole embryo forms ventral fates (mesoderm).
:::
:::

::: exercise A dosage series {level=2 check="40.5"}
In an embryo whose mother carries three copies of *bicoid* instead of two (so that production is 1.5 times normal), by how many micrometres should a threshold boundary shift, if $\lambda = 100$ µm (three significant figures)? In which direction?
::: solution
$\Delta x = \lambda\ln1.5 = 100\times0.405 = 40.5$ µm, posteriorly (towards lower concentrations), for every threshold boundary.
:::
:::

::: exercise A sharper reader {level=2 check="44"}
A target gene reads a gradient with $\lambda = 100$ µm through a Hill function. What Hill coefficient would be needed for its expression to fall from 90 % to 10 % over 10 µm, about one nuclear spacing? Give the nearest whole number.
::: solution
From [[#eq-boundary-width]], $n = \lambda\ln81/\Delta x = 100\times4.394/10 = 43.9$, so about 44 — far beyond what cooperative binding of a single factor can achieve (typical values are 1–5). Sharp boundaries need additional mechanisms such as mutual repression between target genes.
:::
:::

::: exercise The bicoid–nanos double mutant {level=2}
Embryos from mothers lacking both maternal *hunchback* and *nanos* are almost normal in the abdomen. Embryos from mothers lacking *bicoid* lack head and thorax. Using these observations, explain what each of Nanos and Bicoid is required for, and why the two systems are asymmetrical in their logic.
::: solution
Nanos is required only to prevent maternal Hunchback protein from being made in the posterior; when maternal *hunchback* is absent, Nanos is dispensable. So the posterior system works entirely by repressing a repressor of abdominal fates. Bicoid, by contrast, is an instructive activator: it activates zygotic *hunchback* and other anterior genes in a concentration-dependent way and represses *caudal* translation; there is no single target whose removal makes Bicoid unnecessary. The anterior system specifies positions; the posterior system removes an obstacle.
:::
:::

::: exercise Positional error from noise {level=3}
A morphogen gradient with $\lambda = 50$ µm is read by cells that measure concentration with a relative error of 20 %. (a) What is the positional error? (b) The same tissue could instead be patterned by two opposing gradients, one from each end, each with $\lambda = 50$ µm and read with the same relative error independently. Near the middle, combining the two estimates of position reduces the error. By what factor, if the two errors are independent and equal? (c) Why might embryos use opposing gradients, as *Drosophila* does with Bicoid and posterior signals?
::: solution
(a) $\delta x = \lambda\,\delta c/c = 50\times0.2 = 10$ µm.

(b) Two independent estimates with equal variance $\sigma^2$, averaged, give variance $\sigma^2/2$, so the error falls by a factor $\sqrt2$, to about 7.1 µm.

(c) A single exponential gradient is steep (informative) near its source but shallow and noisy far away, where concentrations are low and small absolute errors are large relative ones. Opposing gradients give good information along the whole axis, and the ratio of the two signals can be insensitive to changes in the overall size of the embryo — one possible way of scaling pattern with size.
:::
:::

::: exercise Organ asymmetry data {level=3}
In a mutant mouse line, the heart loops to the right (the normal direction) in 52 of 100 embryos and to the left in 48. In a second line, the heart loops to the right in 3 of 100 embryos and to the left in 97. (a) What do these distributions suggest about the defect in each line? (b) Which line might lack motile cilia on the node, and which might have a defect downstream of flow? (c) Propose an experiment to distinguish your hypotheses for the first line.
::: solution
(a) In the first line, laterality is random — the 52 : 48 split is consistent with 50 : 50 (a binomial test gives no evidence against it) — so the embryos have lost the bias that normally sets the left–right axis but still make an asymmetry. In the second line, asymmetry is consistently reversed: the bias is present but in the wrong direction, a phenotype like that of the classical *inv* mouse mutant.

(b) Loss of motile cilia or of flow removes the bias, giving random laterality (first line, as in *Kif3b* or *iv* mutants). A consistent reversal implies that something still detects or produces a directional signal, but it is read the wrong way — for example an abnormal flow or a defect in the left-sided signalling cascade downstream.

(c) Image the node of the first line's embryos with beads to see whether cilia beat and fluid flows leftward. If there is no flow, test whether an artificial leftward flow rescues normal asymmetry. Examine *Nodal* and *Pitx2* expression: in a flow-defective line they should appear on the left, the right, both sides or neither, at random.
:::
:::
