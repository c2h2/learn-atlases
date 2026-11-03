An egg is the largest cell most animals ever make. A sea-urchin egg is about 80 µm across, a frog egg more than a millimetre, the yolk of a hen's egg several centimetres. It is packed with the materials for the first hours or days of development — yolk, ribosomes, mitochondria, maternal mRNAs and proteins — and it is arrested, waiting. Fertilisation does two things at once: it combines a haploid set of chromosomes from each parent, and it **activates** the egg, starting a metabolic and developmental programme that until then was held in check. What follows is **cleavage**: a series of rapid divisions without growth, which divides the giant cell into many small ones and ends with a hollow ball or a disc of cells, the **blastula**.

This chapter follows those first steps in four animals that do them very differently — the sea urchin, the frog *Xenopus*, the fruit fly *Drosophila* and the mouse — and draws out what they share. Along the way we meet two quantitative ideas: why the egg must block extra sperm within seconds, and how the embryo "counts" its divisions to know when to switch on its own genes. The vocabulary of specification and potency comes from [[developmental-biology/principles-of-development]].

## Gametes

The sperm and the egg are opposite solutions to one problem. The **sperm** is stripped down for delivery: a compact haploid nucleus, a flagellum powered by mitochondria, and at its tip an **acrosome**, a secretory vesicle derived from the Golgi apparatus that contains enzymes and adhesion proteins for reaching and binding the egg. In most animals the sperm also contributes a centriole, from which the first mitotic spindle of the zygote is organised.

The **egg** (oocyte) is built for provisioning. Its cytoplasm contains yolk — lipid and protein, chiefly vitellogenin-derived proteins made in the liver or fat body and taken up from the blood — and a store of maternal mRNAs and proteins that will run the embryo until its own genes are switched on. Beneath its plasma membrane lies the **cortex**, a gel of actin filaments containing thousands of membrane-bound **cortical granules**. Outside the plasma membrane lies an extracellular coat: the **vitelline envelope** of sea urchins and frogs, the **zona pellucida** of mammals. In many species the egg is surrounded further by jelly (sea urchins, frogs) or by follicle cells (the cumulus of mammals).

Eggs meet sperm at different points of meiosis: sea-urchin eggs have completed it, whereas frog and most mammalian eggs are arrested at metaphase of the second meiotic division and complete it only when fertilised.

## Fertilisation

::: definition Fertilisation {#def-fertilisation}
**Fertilisation** is the fusion of a sperm with an egg, comprising (1) contact and recognition between them, ensuring that they are of the same species; (2) regulation of sperm entry, so that only one sperm nucleus enters the egg; (3) fusion of the genetic material of the two gametes; and (4) **activation** of the egg's metabolism to start development.
:::

### Sea urchins: reaching and binding the egg

Sea urchins spawn into the sea, where eggs of many species may meet sperm of many others. Species specificity is therefore enforced at several steps. Peptides released from the egg jelly attract and activate sperm of the same species — resact from the eggs of *Arbacia punctulata* is the best-studied **chemoattractant**. Contact with the jelly triggers the **acrosome reaction**: the acrosomal vesicle fuses with the sperm plasma membrane and releases its contents, and actin polymerisation pushes out an **acrosomal process**, a finger several micrometres long. Its surface carries **bindin**, a protein that binds a receptor on the vitelline envelope of the egg of the same species. Victor Vacquier's group showed in 1977 that isolated bindin agglutinates eggs of its own species but not those of other species; bindin sequences diverge rapidly between species, which helps to keep them reproductively isolated.

The sperm and egg plasma membranes then fuse, and the sperm nucleus and centriole enter the egg.

### Blocks to polyspermy

In most animals, if two sperm enter an egg the embryo dies: in a sea urchin, polyspermy gives a triploid nucleus and, worse, an extra centriole, so the first division forms a spindle with four poles and distributes chromosomes chaotically among four cells. Eggs therefore have mechanisms that prevent more than one sperm from fusing.

::: definition Fast and slow blocks to polyspermy {#def-blocks}
- The **fast block** is an electrical change. Within a few seconds of sperm fusion, the resting membrane potential of the sea-urchin egg (about $-70$ mV) shifts to about $+20$ mV, mainly by an influx of Na⁺ ions. Sperm cannot fuse with a depolarised egg membrane. Laurinda Jaffe showed in 1976 that holding the egg's potential positive with a current prevents fertilisation, and holding it negative allows polyspermy. The fast block lasts about a minute and is not complete: it reduces, rather than eliminates, further fusions. Mammalian eggs do not appear to use a fast electrical block.
- The **slow block** is a physical change in the egg coat: the **cortical granule reaction**. Cortical granules fuse with the egg plasma membrane, releasing enzymes and structural proteins into the space between it and the vitelline envelope. In sea urchins, a protease cleaves the connections between the membrane and the envelope and clips off bound sperm; mucopolysaccharides draw water in, lifting the envelope away; and a peroxidase cross-links it into a hard **fertilisation envelope**. The process takes about a minute to complete.
:::

Mammalian eggs use a slow block of the same kind. The mouse zona pellucida contains three glycoproteins (ZP1, ZP2 and ZP3; human eggs have a fourth, ZP4). Sperm are now thought to bind to the amino-terminal region of ZP2, and a protease released from cortical granules, ovastacin, cleaves ZP2 after fertilisation so that the zona no longer binds sperm (Avella, Baibakov and Dean, 2014). An earlier model, built from experiments in the 1980s, had placed sperm binding on ZP3; the question shows how a well-supported textbook mechanism can be revised. In the mammalian egg, cortical granule exocytosis also modifies the egg membrane itself.

::: example Why the block must be fast {#ex-polyspermy}
Suppose that, after the first sperm fuses with an egg, further sperm would fuse at random at an average rate of $r = 0.1\ \mathrm{s^{-1}}$ until the egg is protected, and that protection is complete at a time $\tau$ after the first fusion. (These numbers are illustrative; real rates depend on sperm density.) Treat later fusions as a Poisson process. (a) What is the probability of polyspermy if only the slow block existed, taking $\tau = 60$ s? (b) What is it if a fast block were complete at $\tau = 2$ s? (c) What do your answers suggest about why sea-urchin eggs at high sperm densities become polyspermic when their fast block is disabled?
::: solution
For a Poisson process of rate $r$, the number of extra fusions in time $\tau$ has a Poisson distribution with mean $\lambda = r\tau$, and the probability of at least one is $1 - e^{-\lambda}$.

(a) $\lambda = 0.1\times60 = 6$, so $P = 1 - e^{-6} = 0.998$: polyspermy would be almost certain.

(b) $\lambda = 0.1\times2 = 0.2$, so $P = 1 - e^{-0.2} = 0.18$.

(c) The probability of polyspermy depends on the product of the sperm arrival rate and the time the egg is unprotected. A block that closes the window within seconds reduces the risk dramatically even if, like the real fast block, it is imperfect; the slow block alone would be useless at high sperm densities. When the fast block is prevented, for example by lowering the Na⁺ concentration of sea water, sea-urchin eggs indeed become polyspermic. Conversely, at the low sperm densities usual in nature, $r$ is small and the risk is small even with a slower block — consistent with mammals, in which few sperm reach the egg, relying on slow mechanisms.
:::
:::

::: widget distribution
dist: poisson
params: lambda=0.2
a: 1
b: 30
caption: The number of additional sperm that fuse with an egg before it is protected, modelled as Poisson with mean $\lambda = r\tau$ (arrival rate × unprotected time). The shaded bars, at one or more extra sperm, give the probability of polyspermy: about 0.18 at $\lambda = 0.2$, as in a fast block of 2 s. Slide $\lambda$ up to 6 (a 60 s window at the same rate) and the shaded area covers almost the whole distribution.
:::

### Egg activation: the calcium wave

The cortical granule reaction is triggered by a rise in cytosolic free Ca²⁺. In eggs of sea urchins, fish and frogs this rise starts at the point of sperm entry and crosses the egg as a **wave**: Ca²⁺ released from the endoplasmic reticulum through IP₃ receptors raises Ca²⁺ in neighbouring cytoplasm, which stimulates further release there, so the signal regenerates itself as it travels ([[cell-biology/cell-signalling]]). Lionel Jaffe's group first imaged such a wave in 1978 in the egg of the medaka fish, using the luminescent protein aequorin; it crossed the egg at about 12 µm s⁻¹. Behind the wave, cortical granules fuse in sequence, and the fertilisation envelope lifts from the sperm entry point to the opposite side.

The Ca²⁺ rise is not only the trigger of the slow block; it activates the whole egg. Richard Steinhardt and David Epel showed in 1974 that a calcium ionophore, which lets Ca²⁺ into the cytosol without any sperm, activates sea-urchin eggs: they lift their fertilisation envelopes, raise their rate of protein synthesis and begin DNA replication. In frogs and mammals, Ca²⁺ releases the arrest at metaphase II by activating a kinase that causes the degradation of the cell-cycle inhibitors that maintain it. In mammals the trigger is delivered by the sperm itself: a sperm-specific phospholipase, **PLCζ** (Christopher Saunders, Anthony Lai and colleagues, 2002), enters the egg on fusion and produces IP₃, and the mammalian egg responds with a series of Ca²⁺ oscillations lasting several hours rather than a single wave.

::: example Why the calcium signal must regenerate {#ex-calcium-wave}
A *Xenopus* egg is 1.2 mm in diameter. (a) How long would Ca²⁺ take to spread 1.2 mm by simple diffusion, if its effective diffusion coefficient in the buffered cytoplasm is $D = 13\ \mathrm{\mu m^2\,s^{-1}}$ (Nancy Allbritton, Tobias Meyer and Lubert Stryer, 1992)? Use the characteristic time $t \approx L^2/2D$ for diffusion over a distance $L$ in one dimension. (b) Compare with the time taken by a wave travelling at 10 µm s⁻¹.
::: solution
(a) $t \approx L^2/2D = (1200\ \mathrm{\mu m})^2/(2\times13\ \mathrm{\mu m^2\,s^{-1}}) = 1.44\times10^6/26\ \mathrm{s} = 5.5\times10^4$ s, about 15 hours — and by then the concentration would have been diluted almost to nothing. Diffusion time grows with the *square* of distance ([heat equation](/learn/maths/lesson.php?c=pde&l=heat-equation)), so it is fast over a micrometre and hopelessly slow over a millimetre.

(b) A wave at 10 µm s⁻¹ crosses 1.2 mm in 120 s, two minutes. A propagating wave covers distance in proportion to time, not to its square root, because each region releases its own stored Ca²⁺ when triggered by its neighbour. That is how a signal from one point can activate an entire giant cell almost uniformly and quickly.
:::
:::

### Fusion of the pronuclei

After entry the sperm nucleus decondenses into a **male pronucleus**, and the egg completes meiosis (if it had not already), giving the **female pronucleus**. In the sea urchin, the sperm centriole nucleates an aster of microtubules that pulls the two pronuclei together, and they fuse to form the zygote nucleus. In mammals, the two pronuclei approach each other and replicate their DNA separately; their envelopes break down and the two sets of chromosomes come together for the first time on the spindle of the first mitosis.

Mammalian fertilisation has several further features. Sperm must first undergo **capacitation** in the female reproductive tract, a set of membrane and signalling changes without which they cannot fertilise. Fusion requires a specific pair of surface proteins: **Izumo1** on the sperm (Naokazu Inoue, Masahito Ikawa and Masaru Okabe, 2005) and its receptor **Juno** on the egg (Enrica Bianchi, Gavin Wright and colleagues, 2014). Male mice lacking Izumo1 and female mice lacking Juno are infertile, although their sperm bind the egg normally.

## Cleavage

::: definition Cleavage and the blastula {#def-cleavage}
**Cleavage** is the series of mitotic divisions that follows fertilisation, in which the volume of the zygote is divided into many smaller cells, the **blastomeres**, without overall growth. It ends with the **blastula**, typically a sphere of cells surrounding a fluid-filled cavity, the **blastocoel** (or, in mammals, the **blastocyst**, with its blastocoel and inner cell mass).
:::

In most species the early cleavage cycles are extraordinarily fast — about 30 min in *Xenopus*, 15 min in zebrafish and under 10 min in the syncytial *Drosophila* embryo — because they lack the gap phases G1 and G2: the cells alternate between DNA synthesis and mitosis, driven by the oscillation of cyclin-dependent kinase activity discovered in these very eggs ([[cell-biology/cell-cycle]]). There is no time and no need for growth; the egg has stockpiled everything.

::: proposition Cell size and nuclear-to-cytoplasmic ratio during cleavage {#prop-cleavage-size}
If an egg of volume $V_0$ and diameter $d_0$ cleaves $k$ times with equal divisions and no growth, there are $2^k$ blastomeres, each of volume and (for spherical cells) diameter

$$
V_k = \frac{V_0}{2^k}, \qquad d_k = d_0\,2^{-k/3}.
$$ {#eq-cleavage-size}

Since each cell keeps one diploid nucleus, the ratio of nuclear DNA to cytoplasmic volume rises as $2^k$: it doubles at every division. Assumptions: equal divisions, no growth or loss of material. Unequal cleavages and the blastocoel change the details but not the doubling of the total amount of DNA per egg.
:::

::: example Cells of a *Xenopus* blastula {#ex-xenopus-cleavage}
A *Xenopus* egg 1.2 mm in diameter undergoes 12 nearly synchronous cleavages. (a) How many cells are there, and what would be the diameter of each if they were equal spheres? (b) By what factor has the ratio of DNA to cytoplasm increased? (c) If the first cleavage takes 90 min and each of the next eleven takes 30 min, at roughly what time after fertilisation is the 12th cleavage complete?
::: solution
(a) $2^{12} = 4096$ cells; by [[#eq-cleavage-size]], $d_{12} = 1.2\ \mathrm{mm}\times2^{-12/3} = 1.2/16\ \mathrm{mm} = 75\ \mathrm{\mu m}$. (The cells of the animal half are in fact smaller than this and those of the yolky vegetal half larger.)

(b) A factor of $2^{12} = 4096$: the total amount of nuclear DNA in the embryo has increased 4096-fold in the same cytoplasm.

(c) $90 + 11\times30 = 420$ min, about 7 hours. The real timing depends strongly on temperature; at 22–23 °C the *Xenopus* embryo reaches the mid-blastula transition, described next, after roughly 6–7 hours.
:::
:::

### The mid-blastula transition

During the rapid cleavages of *Xenopus*, almost no genes of the embryo are transcribed; the embryo runs on maternal mRNAs and proteins. After the 12th cleavage this changes abruptly. John Newport and Marc Kirschner showed in 1982 that at this point the cell cycles lengthen and lose synchrony, gap phases appear, the cells become motile, and transcription of the embryo's own genes begins on a large scale. They called it the **mid-blastula transition** (MBT).

::: definition Mid-blastula and maternal-to-zygotic transitions {#def-mbt}
The **maternal-to-zygotic transition** is the handover of developmental control from maternal gene products, stored in the egg, to products of the zygote's own genes. It has two components: the clearance of maternal mRNAs (by microRNAs, RNA-binding proteins and other mechanisms) and the activation of zygotic transcription (**zygotic genome activation**, ZGA). In embryos with rapid early cleavages, the main wave of ZGA coincides with the lengthening of the cell cycle at the **mid-blastula transition**.
:::

How does the embryo know that it has divided 12 times? Newport and Kirschner's answer was that it measures not time or divisions but the **ratio of DNA to cytoplasm**. When they constricted fertilised eggs with a hair loop so that one half received the nucleus and began cleaving before the other, each half underwent the MBT when its cells reached the normal cell size, not at a fixed time. Injecting extra DNA into the egg made the MBT happen earlier. The idea is that some maternal factor present in a fixed amount in the egg cytoplasm — a titratable repressor of transcription or of cell-cycle lengthening — is progressively soaked up by the growing amount of DNA, and when the DNA wins, the switch flips. Candidate titrated factors include histones (whose amount in the egg falls relative to DNA as chromatin is made) and replication factors whose shortage lengthens S phase.

::: example A haploid embryo needs one more division {#ex-haploid}
Bruce Edgar, Carolyn Kiehle and Gerold Schubiger reported in 1986 that haploid *Drosophila* embryos (which develop from eggs fertilised by sperm that contribute no chromosomes) undergo one extra syncytial nuclear division before the cell cycle lengthens. Explain why the nuclear-to-cytoplasmic model predicts exactly this, and predict what would happen in a tetraploid embryo.
::: solution
In the model, the switch occurs when the total amount of DNA in the embryo reaches a threshold set by the fixed amount of a maternal factor in the egg. A diploid embryo with $N$ nuclei contains $2N$ chromosome sets; a haploid embryo with $N$ nuclei contains only $N$. To reach the same total, the haploid embryo needs twice as many nuclei — one more round of division. A tetraploid embryo has $4N$ chromosome sets with $N$ nuclei, so it should reach the threshold one division *earlier*. The experiment is powerful because a counter that simply counted divisions, or measured elapsed time, would predict no difference between haploid and diploid embryos. (In some species, including zebrafish, the timing of individual zygotic genes is controlled by the ratio, while other aspects of the transition depend on time; the mechanism is not the same everywhere.)
:::
:::

In other animals, genome activation happens at very different times: at the 2-cell stage in the mouse, at the 4- to 8-cell stage in human embryos, after 10 cleavages in zebrafish, and in a minor wave from about the 8th nuclear cycle and a major wave in the 14th in *Drosophila*, where the pioneer transcription factor **Zelda** opens the chromatin of hundreds of early genes. Even in "silent" embryos, a few genes are transcribed early, so "MBT" marks a large change in rate rather than an absolute on-switch.

## Patterns of cleavage

The geometry of cleavage depends on two things: the arrangement of the mitotic spindles, inherited from the egg and its cytoskeleton, and the amount and distribution of yolk, which impedes the cleavage furrow. Yolk-poor eggs (**isolecithal**: sea urchins, mammals) cleave completely and fairly evenly; eggs with yolk concentrated in the vegetal half (**mesolecithal**: amphibians) cleave completely but unequally; eggs that are mostly yolk (**telolecithal**: fish, reptiles, birds) cleave only in a small disc of cytoplasm on top; and eggs with central yolk (**centrolecithal**: insects) undergo nuclear divisions inside a common cytoplasm.

| pattern | yolk | examples |
|---|---|---|
| holoblastic radial | sparse or moderate | sea urchins, amphibians |
| holoblastic spiral | sparse | molluscs, annelids, flatworms |
| holoblastic bilateral | sparse | ascidians (tunicates) |
| holoblastic rotational | sparse | mammals, nematodes |
| meroblastic discoidal | dense, filling most of the egg | fishes, reptiles, birds |
| meroblastic superficial | central | most insects |

In **holoblastic** (complete) cleavage the furrow divides the whole egg; in **meroblastic** (incomplete) cleavage only part of it. In spiral cleavage the spindles are tilted so that each tier of cells sits in the furrows of the tier below (see [[#exr-coiling]]).

### Sea urchins

The first two cleavages of the sea urchin are meridional (through the animal and vegetal poles), the third equatorial. The fourth is the first unequal one: the four animal cells divide meridionally into eight equal **mesomeres**, while the four vegetal cells divide equatorially and unequally into four large **macromeres** and four small **micromeres** at the vegetal pole. By the 128-cell stage the cells form a single-layered hollow blastula, which develops cilia, hatches from its fertilisation envelope and swims.

The micromeres are a striking example of autonomous specification followed by induction. Isolated micromeres form the larval skeleton in culture, as they would in the embryo. Transplanted to the animal pole of another embryo, they still form skeleton, and they also induce the animal cells nearby to form a second gut — so they are both autonomously specified and inducers (Sven Hörstadius's transplantation experiments of the 1930s). Their specification starts with maternal β-catenin, which enters the nuclei of vegetal cells and activates a gene encoding a repressor, Pmar1. Pmar1 represses another repressor, HesC, that would otherwise repress the skeletogenic genes everywhere: a **double-negative gate** that turns on the skeleton programme only where Pmar1 is made (Paola Oliveri, Eric Davidson and colleagues, 2002; HesC was identified as the target in Davidson's laboratory in 2007).

### Frogs

The amphibian egg has an **animal hemisphere**, pigmented and relatively yolk-free, and a yolky **vegetal hemisphere**. Its cleavage is radial but unequal: the third cleavage is equatorial but displaced towards the animal pole, giving four small animal and four large vegetal blastomeres, and cleavage is faster in the animal half. A blastocoel opens in the animal half. At fertilisation the egg cortex rotates by about 30° relative to the cytoplasm, away from the sperm entry point; this **cortical rotation** moves dorsal determinants to the side opposite sperm entry and fixes the future dorsal side of the embryo ([[developmental-biology/axis-formation]]).

### *Drosophila*: a syncytium

The *Drosophila* egg begins with nuclear divisions without cell division. The zygote nucleus divides about every 8–10 min for 13 cycles. During cycles 7–9 most nuclei migrate to the periphery of the egg, which they reach in cycle 10, forming the **syncytial blastoderm**; a few at the posterior pole are enclosed by membranes early to form the **pole cells**, the germ line; a few remain in the yolk. During cycle 14, which lasts about an hour, membranes grow in between the roughly 6000 peripheral nuclei to form the **cellular blastoderm**, about 2.5–3 h after fertilisation at 25 °C. Until cellularisation, proteins such as the transcription factor Bicoid can diffuse among the nuclei and form gradients — the syncytial specification of [[developmental-biology/axis-formation]].

### Mammals

Mammalian cleavage is the slowest in the animal kingdom: about 12–24 h per division, and not synchronous, so an embryo may pass through 3-, 5- and 7-cell stages. The mouse zygote's genome is activated at the 2-cell stage. At the 8-cell stage the blastomeres flatten against each other and maximise their contacts, a process called **compaction**, mediated by the adhesion protein E-cadherin. Compaction gives each cell an outer (apical) surface facing the outside and an inner (basolateral) surface touching other cells. At the next divisions some daughter cells are placed entirely inside the embryo, and the 16-cell **morula** has a few inside cells surrounded by outside cells.

The first fate decision follows from this geometry, which makes it a fine example of conditional specification.

- **Outside** cells, which are polarised, keep the Hippo signalling pathway inactive; the transcriptional co-activator Yap enters the nucleus and, with the transcription factor Tead4, activates *Cdx2*. These cells become the **trophectoderm**, which pumps fluid into the embryo to form the blastocoel and later forms the embryonic part of the placenta.
- **Inside** cells, which are surrounded by contacts on all sides, activate Hippo signalling, Yap stays in the cytoplasm, and the cells keep expressing the pluripotency factors Oct4 (encoded by *Pou5f1*) and Sox2. They form the **inner cell mass** (ICM) (Noriyuki Nishioka, Hiroshi Sasaki and colleagues, 2009).

By the 32-cell stage, about 3.5 days after fertilisation in the mouse, the embryo is a **blastocyst**: a fluid-filled sphere of trophectoderm with the inner cell mass at one side. A second decision then divides the ICM into **epiblast**, which expresses Nanog and will form the whole of the embryo proper, and **primitive endoderm**, which expresses Gata6 and forms extra-embryonic membranes (the yolk sac endoderm). At first the two fates are scattered in a "salt-and-pepper" mixture; FGF4 secreted by epiblast precursors activates FGF receptor and ERK signalling in their neighbours, biasing them towards primitive endoderm, and mutual repression between Nanog and Gata6 (a toggle switch like that of [[developmental-biology/principles-of-development#prop-toggle]]) resolves each cell into one fate; the cells then sort into two layers. The mouse blastocyst implants into the uterine wall at about day 4.5; human blastocysts form at about day 5 after fertilisation and implant at about days 6–7.

The mouse embryo is highly regulative. Andrzej Tarkowski (1961) and Beatrice Mintz (1962) showed that two 8-cell mouse embryos, with their zonae removed and pushed together, form a single normal blastocyst and a healthy **chimaeric** mouse made of cells of both. Conversely, a single blastomere of a 2-cell mouse embryo can form a whole blastocyst. Monozygotic twins in humans arise by the splitting of one early embryo, showing the same regulative capacity.

::: quiz
In the mouse morula, a cell that would normally lie on the outside is experimentally made to lack Tead4. What is it most likely to become?
- [ ] Trophectoderm, because its position is outside
- [x] Inner cell mass, because it cannot turn on *Cdx2*
- [ ] Primitive endoderm, because Gata6 is activated by default
- [ ] It will die, because outside cells need Hippo signalling
::: solution
Outside position acts through inactive Hippo signalling, nuclear Yap and Tead4 to switch on *Cdx2* and the trophectoderm programme. Without Tead4 the cell cannot read its position, so it behaves like an inside cell and keeps Oct4 and Sox2 expression — embryos lacking *Tead4* fail to form trophectoderm and a blastocoel. Primitive endoderm is specified later, within the ICM.
:::
:::

::: warning "The fertilised egg is a blank slate"
It is tempting to think that the egg is an undifferentiated bag of material and that patterning starts with the embryo's own genes. In fact eggs are highly organised before fertilisation: they have an animal–vegetal axis, localised mRNAs and proteins, and a cortex whose structure guides later cleavage. In *Drosophila* and *Xenopus*, the main body axes are established by maternal gene products, and the mother's genotype, not the embryo's, determines the phenotype of maternal-effect mutations. Mammalian eggs, by contrast, appear much less pre-patterned, and their early fates are set largely by position — which is why their embryos are so regulative.
:::

::: widget plot
f: d0*2^(-x/3)
x: 0, 14
y: 0, 1300
sliders: d0=1200:80:1500:10
labels: \text{blastomere diameter (}\mu\text{m)}
points: 12, 75
tangent: 6
caption: Diameter of a blastomere in micrometres after $x$ equal cleavages of an egg of diameter $d_0$ (slider, in µm; 1200 for *Xenopus*, 80 for a sea urchin), $d = d_0\,2^{-x/3}$, following [[#eq-cleavage-size]]. Drag the tangent point to read off values. The marked point is the 12th cleavage, at which the blastomeres average 75 µm and the mid-blastula transition begins. Each cleavage halves the volume but reduces the diameter only by a factor $2^{1/3} = 1.26$, so the cells shrink fast at first in absolute terms and then more slowly.
:::

::: application Assisted reproduction
The biology described here underlies *in vitro* fertilisation, in which eggs are fertilised outside the body and early embryos are cultured to the blastocyst stage before transfer to the uterus, and intracytoplasmic sperm injection, in which a single sperm is injected into an egg — bypassing the zona pellucida and the fusion step but relying on the egg's activation by the sperm's PLCζ. The clinical practice of these techniques, and the regulation of research on human embryos (in many countries limited to the first 14 days of development), belong to the Medicine Atlas ([Medicine Atlas](/learn/medicine/)).
:::

::: history
Oscar Hertwig observed in 1876, in eggs of the sea urchin *Toxopneustes lividus*, that a single sperm enters the egg and its nucleus fuses with the egg's, establishing that fertilisation is the union of two nuclei. Edouard van Beneden showed in 1883, in the nematode *Ascaris*, that the zygote receives equal numbers of chromosomes from each parent. Frank Lillie's studies of sea-urchin sperm and egg water in the 1910s began the search for the molecules of species recognition, and Jean-Clément Dan described the acrosome reaction in the 1950s. The fast block was discovered electrically by Laurinda Jaffe in 1976; the calcium wave was imaged by Lionel Jaffe's group in 1978; the mid-blastula transition was defined by Newport and Kirschner in 1982. The first child conceived by *in vitro* fertilisation, Louise Brown, was born in 1978 after the work of Robert Edwards and Patrick Steptoe; Edwards received the Nobel Prize in Physiology or Medicine in 2010.
:::

::: summary
- The sperm is built for delivery (nucleus, flagellum, acrosome, centriole); the egg for provisioning (yolk, maternal mRNAs and proteins, cortical granules, an extracellular envelope).
- Fertilisation comprises recognition, regulated entry of one sperm, fusion of genetic material and egg activation. Species specificity in sea urchins rests on chemoattractants, the acrosome reaction and bindin; in mammals, on the zona pellucida (sperm binding to ZP2) and the Izumo1–Juno fusion pair.
- Polyspermy is prevented by a fast electrical block (sea urchins: depolarisation from about −70 to +20 mV within seconds) and a slow block (cortical granule reaction, fertilisation envelope). The polyspermy risk scales with $1 - e^{-r\tau}$.
- A rise in cytosolic Ca²⁺ — a regenerative wave in sea urchins, fish and frogs, oscillations triggered by sperm PLCζ in mammals — activates the egg.
- Cleavage divides the egg without growth; cell volume halves and the DNA-to-cytoplasm ratio doubles at each division. Yolk determines whether cleavage is holoblastic or meroblastic; spindle orientation gives radial, spiral, bilateral or rotational patterns.
- The mid-blastula transition (after 12 cleavages in *Xenopus*) is triggered by the nuclear-to-cytoplasmic ratio: haploid embryos need one extra division.
- In the mouse, compaction at the 8-cell stage and inside/outside position, read by Hippo–Yap–Tead4, separate trophectoderm (Cdx2) from inner cell mass (Oct4, Sox2); the ICM then splits into epiblast (Nanog) and primitive endoderm (Gata6) through FGF4 signalling and mutual repression.
:::

## Exercises

::: exercise Cleavage arithmetic {level=1 check="15.9"}
A sea-urchin egg 80 µm in diameter cleaves seven times into equal spherical cells. What is the diameter of each cell in µm (three significant figures)?
::: solution
By [[#eq-cleavage-size]], $d_7 = 80\times2^{-7/3} = 80\times0.198 = 15.9$ µm. (The real 128-cell sea urchin embryo is a hollow sphere, so its cells are flattened rather than spherical, but the volume per cell is the same.)
:::
:::

::: exercise Blocks to polyspermy {level=1}
For each experimental result, say which block to polyspermy is affected. (a) Sea-urchin eggs fertilised in sea water with very low Na⁺ are often polyspermic. (b) Mouse eggs in which ZP2 cannot be cleaved continue to bind sperm on their zona after fertilisation. (c) Sea-urchin eggs treated with a drug that prevents cortical granule exocytosis are fertilised normally, but extra sperm fuse a minute later.
::: solution
(a) The fast block, which depends on Na⁺ influx to depolarise the membrane. (b) The slow block of mammals, in which ovastacin from cortical granules cleaves ZP2 so that the zona no longer binds sperm. (c) The slow block (cortical granule reaction): the fast block protects for only about a minute, after which a second sperm can fuse unless the fertilisation envelope has formed.
:::
:::

::: exercise Patterns of cleavage {level=1}
Predict the type of cleavage (holoblastic or meroblastic, and which subtype) for (a) a bird egg, (b) a snail egg with little yolk, (c) an insect egg with central yolk, (d) a mouse egg.
::: solution
(a) Meroblastic discoidal: only a disc of yolk-free cytoplasm on top of the yolk cleaves. (b) Holoblastic spiral. (c) Meroblastic superficial: nuclear divisions in a syncytium, with cells forming only at the surface. (d) Holoblastic rotational, slow and asynchronous.
:::
:::

::: exercise Polyspermy probability {level=2 check="0.259"}
Using the Poisson model of [[#ex-polyspermy]], an egg is exposed to extra sperm at a rate of $0.15\ \mathrm{s^{-1}}$ for 2 s before its fast block is effective. What is the probability that at least one extra sperm fuses (three significant figures)?
::: solution
$\lambda = 0.15\times2 = 0.3$; $P = 1 - e^{-0.3} = 1 - 0.741 = 0.259$.
:::
:::

::: exercise Diffusion against a wave {level=2 check="3.85"}
Using $t \approx L^2/2D$ with $D = 13\ \mathrm{\mu m^2\,s^{-1}}$, how many seconds would it take Ca²⁺ to diffuse 10 µm (three significant figures)? Compare with the time for a wave at 10 µm s⁻¹ to cover the same distance, and comment.
::: solution
$t = 10^2/(2\times13) = 100/26 = 3.85$ s, versus 1 s for the wave. Over 10 µm, diffusion and the wave are comparable; over 1.2 mm ([[#ex-calcium-wave]]), diffusion takes about 15 h and the wave 2 min. Because diffusion time scales with $L^2$, regenerative waves are essential only in large cells — which is why the small mammalian egg can use oscillations that are nearly uniform across the cell.
:::
:::

::: exercise Constricted eggs {level=2}
A fertilised *Xenopus* egg is constricted with a hair loop so that one half contains the zygote nucleus and the other half has none. The nucleated half cleaves; after several divisions, one nucleus slips through the narrow bridge into the other half, which then begins to cleave as well, a few cycles behind. Using the nuclear-to-cytoplasmic ratio model, predict which half undergoes the mid-blastula transition first, and at what cell size.
::: solution
Both halves contain the same volume of cytoplasm but start cleaving at different times. The model says each undergoes the MBT when its DNA-to-cytoplasm ratio reaches the threshold — that is, when it has the same number of nuclei per volume of cytoplasm, and therefore the same cell size, as a normal embryo at the MBT. The half that started first reaches the threshold first, in time; the delayed half reaches it later, but at the same cell size. Since each half has half the volume of a whole egg, each reaches the threshold with half as many cells as a whole embryo (about 2048 rather than 4096), that is, one division earlier in count. Newport and Kirschner's experiments of this kind showed that the MBT is tied to cell size, not to time since fertilisation or to the number of divisions.
:::
:::

::: exercise Reading mouse chimaeras {level=3}
Two 8-cell mouse embryos, one from a strain with black coat and one from a strain with white (albino) coat, are aggregated, cultured to the blastocyst and transferred to a foster mother. (a) What coat do you expect in the resulting mouse, and what does this show about the developmental potential of the 8-cell blastomeres? (b) In a variant of the experiment, embryonic stem cells from the black strain are injected into a white-strain blastocyst; the offspring of the resulting chimaera, crossed with white mice, include some black pups. What does this show about the stem cells?
::: solution
(a) A chimaera with patches of black and white fur (often in stripes, reflecting the clonal growth of melanocyte precursors along the body). The two embryos have regulated to form one normal individual, so the 8-cell blastomeres are not committed to forming any particular part: cells of both origins contributed to the inner cell mass and hence to many tissues. Mammalian embryos at this stage are highly regulative.

(b) Black pups from a cross with white mice must have received a chromosome set from a germ cell that descended from the injected stem cells. So the stem cells contributed to the germ line of the chimaera: they are pluripotent, able to form germ cells as well as somatic tissues. This "germ-line transmission" test is how genetically modified mouse lines are made from engineered embryonic stem cells ([[molecular-biology/molecular-tools]]).
:::
:::

::: exercise A maternal effect on coiling {level=3 #exr-coiling}
In the pond snail *Lymnaea peregra*, shell coiling is either dextral (right-handed, dominant allele $D$) or sinistral (left-handed, $d$). The coiling of a snail is determined by the genotype of its mother. (a) A $dd$ female is fertilised by a $DD$ male. What coiling do her offspring have, and what coiling do their offspring (the F₂, from self-fertilisation of the F₁, which are hermaphrodites) have? (b) Explain the result in terms of cleavage.
::: solution
(a) The F₁ are all $Dd$ but sinistral, because their mother was $dd$. Each F₁ snail, being $Dd$, makes dextral offspring: the F₂ are all dextral, in genotypic ratio 1 $DD$ : 2 $Dd$ : 1 $dd$. The 3 : 1 segregation of the gene appears only in the F₃ phenotypes: F₂ snails that are $dd$ produce sinistral offspring, and the others dextral ones. (Alfred Sturtevant proposed this maternal-effect explanation in 1923.)

(b) Shell handedness is set by the direction in which the spindles tilt at the third cleavage of the spirally cleaving egg, which in turn is set by the egg's cytoskeleton — built during oogenesis from the mother's gene products. The gene acts in the mother, not in the embryo. A good candidate gene encodes a formin, an actin-assembly protein, and in the related snail *Lymnaea stagnalis* the handedness of the embryo can be reversed by mechanically manipulating the third cleavage (Reiko Kuroda and colleagues, 2009).
:::
:::
