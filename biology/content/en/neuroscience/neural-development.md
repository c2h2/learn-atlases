A human brain contains about 86 billion neurons, connected by something like a hundred trillion synapses, and it is built from a sheet of a few thousand embryonic cells in a matter of months. A mouse brain, with some seventy million neurons, is built in about three weeks of gestation and a few weeks after birth. The genome cannot specify every connection: the human genome has about 20,000 protein-coding genes, and even a lavish allocation of bits per gene falls short of a wiring diagram by many orders of magnitude. Nervous systems are built by developmental rules: cells are told what to become by their position, born in a precise sequence, sent along pathways by molecular signposts, and then tested by use, with the connections that work kept and the others removed.

This chapter asks two related questions. First, how did nervous systems evolve, from the diffuse nerve nets of early animals to the centralised brains of vertebrates, insects and octopuses? Second, how is a nervous system built in each individual: how embryonic tissue becomes neural, how it is patterned, how neurons are born and migrate, how axons find their targets, and how activity refines the result? The general principles of developmental biology, induction, morphogens, gastrulation and the Hox genes, are in [[developmental-biology/principles-of-development]], [[developmental-biology/gastrulation]] and [[developmental-biology/segmentation-hox]]; here we apply them to the nervous system.

## The evolution of nervous systems

### Animals without neurons, and the first nerve nets

Of the five main lineages of animals, two, the **sponges** (Porifera) and the tiny, flat **placozoans**, have no neurons. Yet their genomes contain many of the genes that, in other animals, build synapses, including scaffolding proteins of the postsynaptic density and components of the vesicle-release machinery, and placozoans coordinate their gliding with secreted peptides. The molecular parts list of the neuron is older than the neuron.

The other three lineages, the **ctenophores** (comb jellies), the **cnidarians** (jellyfish, sea anemones, corals and hydras) and the **bilaterians** (all other animals), have nervous systems. Cnidarian nervous systems are **nerve nets**, diffuse meshes of neurons spread through the body wall, sometimes condensed into rings around the mouth or the bell margin, using neuropeptides heavily as well as classical transmitters. Ctenophore nervous systems are stranger: they lack most of the classical small-molecule transmitters and their synthetic enzymes, rely on peptides and glutamate, and their subepithelial nerve net, as described in [[neuroscience/neurons-glia]], is in part a syncytium.

Where the ctenophores belong on the animal tree has been one of the most contested questions of animal phylogeny. Analyses since 2008 have placed them either as the sister group of all other animals or in the traditional position, with sponges as the earliest branch. A comparison of conserved gene order on chromosomes across animals and their unicellular relatives (Darrin Schultz and colleagues, 2023) supported ctenophores as the earliest branch, though not every researcher regards the question as closed. If ctenophores did branch first, then either neurons evolved once and were lost in sponges and placozoans, or they evolved independently in ctenophores and in the ancestor of cnidarians and bilaterians, as Leonid Moroz and colleagues argued in 2014 from the distinctive molecular make-up of ctenophore neurons. As of 2026 both scenarios have defenders.

### Centralisation and the bilaterian brain

Bilaterian animals move in one direction, head first, and most have concentrated many of their neurons into a **central nervous system**: one or more longitudinal nerve cords, with an anterior concentration, the **brain**, near the mouth and the main sense organs. This **cephalisation** is the expected arrangement for an animal that meets the world head first: sense organs belong at the leading end, and short connections between them and the circuits that process their signals save time and wiring.

In arthropods and annelids the nerve cord runs along the **ventral** side, as a chain of segmental ganglia; in vertebrates and other chordates it runs along the **dorsal** side and is hollow. In 1822 Étienne Geoffroy Saint-Hilaire suggested, from the anatomy of a lobster turned on its back, that a vertebrate is an upside-down arthropod. The idea was ridiculed for a century and a half and then revived by molecular evidence. In both flies and frogs, the nervous system forms on the side of the embryo where signalling by **bone morphogenetic proteins** (BMPs; Decapentaplegic in *Drosophila*) is blocked by an antagonist (chordin in vertebrates, its homologue Short gastrulation in flies). In the fly, BMP signalling is dorsal and the nerve cord ventral; in the frog, BMP signalling is ventral and the nerve cord dorsal. Each half of the system works when transplanted between the two: fly Short gastrulation protein can induce neural tissue in frog embryos and frog chordin can act in fly embryos (Edward De Robertis, Yoshiki Sasai and colleagues, 1995–1996). The ancestral bilaterian seems to have had a BMP–chordin axis, which was inverted relative to the mouth in the lineage leading to chordates.

Whether that ancestor, the "urbilaterian", already had a centralised nervous system is still debated. The similarity of the genes that pattern the nerve cords of annelids, insects and vertebrates suggests that it did; the wide variety of nervous systems in bilaterian groups, including the diffuse nets of acoel flatworms and of some hemichordates, suggests to others that centralisation arose several times.

### The vertebrate brain

The vertebrate central nervous system develops from a **neural tube** that becomes regionalised early into a **forebrain** (prosencephalon), **midbrain** (mesencephalon) and **hindbrain** (rhombencephalon), followed by the spinal cord. The forebrain later divides into the telencephalon, which forms the cerebral hemispheres, and the diencephalon, which forms the thalamus and hypothalamus and gives rise to the retina. This basic plan is shared by all vertebrates, from lampreys to humans; what differs is the relative size of the parts. Two embryonic tissues are vertebrate innovations: the **neural crest**, which migrates from the edges of the neural tube and forms the peripheral nervous system, pigment cells and much of the skull, and the **cranial placodes**, thickenings of the head ectoderm that form the sense organs of the nose and ear and many sensory ganglia.

Large, complex brains evolved at least three times, in vertebrates, in arthropods and in cephalopod molluscs, from different ancestors. An octopus has about 500 million neurons, most of them in its arms, and can solve problems and learn by observation. Comparing these independent experiments is one of the best ways to discover which features of brains are necessary for complex behaviour and which are historical accidents.

## Neural induction

How does part of the embryonic ectoderm become neural tissue rather than skin? The classic experiment was published by Hans Spemann and Hilde Mangold in 1924. Working with newt embryos (*Triturus*), Mangold transplanted the dorsal lip of the blastopore from an early gastrula of a pale species to the ventral side of a gastrula of a pigmented species. The host developed a second body axis, a conjoined twin, including a second neural tube made largely of host cells, which would otherwise have become belly skin. The graft had organised the surrounding tissue into an axis, and it became known as the **organizer**.

::: definition Neural induction {#def-induction}
**Neural induction** is the process by which signals from the organizer and its derivatives (in vertebrates, the dorsal mesoderm and notochord) cause overlying ectoderm to adopt a neural fate instead of an epidermal one. In the **default model**, developed from experiments on frog embryos, ectoderm cells adopt a neural fate unless they receive BMP signals, which drive them to become epidermis; the organizer induces neural tissue by secreting **BMP antagonists**, such as noggin, chordin and follistatin, which bind BMPs and prevent them from reaching their receptors.
:::

The evidence for the default model was surprising. Cells of the frog animal cap, which normally form epidermis, became neural when they were dissociated and kept apart, as if dilution of a secreted signal, later shown to be BMP4, freed them from an epidermal instruction (Hans Grunz and Lothar Tacke, 1989; Ali Hemmati-Brivanlou and Douglas Melton in the 1990s). The organizer's neural inducers, noggin (William Smith and Richard Harland, 1992) and chordin (Sasai, De Robertis and colleagues, 1994), turned out to be BMP-binding proteins.

::: warning "Neural fate is simply the default"
The default model captures a central feature, BMP inhibition, but it is incomplete. In chick and mouse embryos, inhibition of BMPs alone is often not enough to induce neural tissue; fibroblast growth factor (FGF) signalling, acting before gastrulation, and inhibition of Wnt signalling are also required, and the timing and combination differ between species. "Default" also hides the fact that the dissociated frog cells are already exposed to maternal and early zygotic signals. The current view is that neural induction is the result of several signals acting together, with BMP inhibition as one essential element.
:::

Once induced, the neural plate rolls up into the neural tube (**neurulation**); the tissue at its edges becomes the neural crest. The cellular mechanics of these movements are described in [[developmental-biology/organogenesis]].

## Patterning the neural tube

The neural tube is not uniform. Its cells must become different kinds of neurons according to their position along two axes: anterior–posterior (forebrain to spinal cord) and dorsal–ventral.

### Dorsal–ventral patterning by morphogens

In the spinal cord, sensory-related interneurons arise dorsally and motor neurons ventrally. The ventral fates are induced by **Sonic hedgehog** (Shh), secreted first by the notochord beneath the neural tube and then by the **floor plate**, the ventral midline of the tube itself. Dorsal fates are induced by BMPs and Wnts from the **roof plate** and the overlying ectoderm. Thomas Jessell and colleagues showed in the 1990s that Shh acts as a **morphogen**: neural-plate explants exposed to different concentrations of Shh produce different neuron types, with the most ventral types (floor plate, V3 interneurons, then motor neurons) requiring the highest concentrations. A twofold change in Shh concentration can switch the fate of the cells.

::: definition Morphogen {#def-morphogen}
A **morphogen** is a signalling molecule that is produced from a localised source, forms a concentration gradient across a field of cells, and specifies different cell fates at different concentration thresholds.
:::

The simplest model of a morphogen gradient treats the molecule as diffusing away from a source while being degraded or captured by cells.

::: proposition Steady-state gradient from a source {#prop-gradient}
A morphogen produced at $x = 0$, diffusing with coefficient $D$ along a line of tissue and removed everywhere at a first-order rate $k$, reaches a steady state

$$
C(x) = C_0\,\mathrm{e}^{-x/\lambda}, \qquad \lambda = \sqrt{\frac{D}{k}},
$$ {#eq-gradient}

where $C_0$ is the concentration at the source. A cell responds by adopting one fate if $C$ exceeds a threshold $T$, so the boundary between fates lies at

$$
x_T = \lambda\ln\frac{C_0}{T}.
$$ {#eq-boundary}

Assumptions: a one-dimensional, semi-infinite field, constant $D$ and $k$, a constant source, and cells that read the steady-state concentration. Real gradients often form in tissues that are growing, and cells integrate both concentration and duration of exposure.
:::

::: proof
At steady state, diffusion balances removal: $D\,C'' - kC = 0$. The solution that stays bounded as $x \to \infty$ is $C = C_0\mathrm{e}^{-x\sqrt{k/D}}$, which is [[#eq-gradient]]. Setting $C(x_T) = T$ gives $\mathrm{e}^{-x_T/\lambda} = T/C_0$, and taking logarithms gives [[#eq-boundary]].
:::

The equation has the same mathematics as the passive spread of voltage along a cable ([[neuroscience/action-potential#prop-cable]]), with degradation in place of membrane leak.

::: example Placing two boundaries {#ex-gradient}
A morphogen with $D = 10\ \mu\mathrm{m^2\,s^{-1}}$ is degraded with a rate constant $k = 10^{-4}$ s⁻¹. (a) Calculate $\lambda$. (b) Suppose instead that $\lambda = 100$ µm, and that cells become type A when $C > 0.5\,C_0$ and type B when $0.1\,C_0 < C < 0.5\,C_0$. Where are the A/B and B/other boundaries? (c) If the source doubles its output, by how much do the boundaries move?
::: solution
(a) $\lambda = \sqrt{10/10^{-4}} = \sqrt{10^5} = 316$ µm.

(b) $x_\mathrm{A/B} = 100\ln(1/0.5) = 69$ µm and $x_\mathrm{B/other} = 100\ln(1/0.1) = 230$ µm. Type A cells occupy the first 69 µm, type B the next 161 µm.

(c) Doubling $C_0$ adds $\lambda\ln2 = 69$ µm to every boundary: the whole pattern shifts outwards by the same distance. An exponential gradient is therefore sensitive to fluctuations in source strength, and embryos use additional mechanisms to make patterns robust, such as opposing gradients from both ends, feedback that adjusts degradation, and gene-regulatory networks among the target genes that sharpen and stabilise the boundaries.
:::
:::

::: widget plot
f: c*exp(-x/L)
x: 0, 400
y: 0, 2.2
sliders: c=1:0.5:2:0.05; L=100:30:200:5
labels: C(x)/C_\mathrm{ref}
hlines: 0.5; 0.1
caption: A morphogen gradient from [[#eq-gradient]]: concentration (vertical axis, relative to a reference source strength) against distance from the source (horizontal axis, µm). The two horizontal lines are thresholds at 0.5 and 0.1; cells closer to the source than the first crossing become type A, those between the crossings type B. Change the source strength $c$ and watch both boundaries move by the same distance, $\lambda\ln c$; change the length constant $\lambda$ (L) and the boundaries move in proportion to it, so that the pattern stretches or shrinks.
:::

In the ventral spinal cord the morphogen is read by a set of **transcription factors** whose expression is switched on or off at different Shh concentrations (Pax6, Nkx2.2, Olig2, Nkx6.1 and others), and which repress one another in pairs. This cross-repression converts the smooth gradient into sharp, stable domains of progenitors, each producing a particular class of neuron: the **progenitor code** described by James Briscoe, Jessell and colleagues around 2000.

### Anterior–posterior patterning

Along the anterior–posterior axis, posteriorising signals (Wnts, FGFs and retinoic acid), high at the posterior end, transform an initially anterior neural plate into progressively more posterior regions. In the hindbrain, which is divided into seven or eight segments called **rhombomeres**, and in the spinal cord, position is encoded by the **Hox genes**, expressed in nested domains in the same order as they lie on the chromosome, as in the body segments of insects ([[developmental-biology/segmentation-hox]]). Between the midbrain and the hindbrain, the boundary between the expression domains of the transcription factors Otx2 (anterior) and Gbx2 (posterior) becomes a local **organiser**, the isthmus, that secretes FGF8 and patterns the midbrain and cerebellum on either side.

## Making neurons

### Selecting neural precursors: lateral inhibition

In the *Drosophila* embryo, neurons arise from **neuroblasts**, stem cells that delaminate from the neuroectoderm. Clusters of cells express **proneural genes** (such as those of the *achaete–scute* complex) that give them the potential to become neuroblasts, but only one cell per cluster does. The choice is made by **lateral inhibition** through the Notch pathway: a cell that expresses slightly more of the ligand Delta activates Notch in its neighbours, which reduces their proneural gene expression and their own Delta production, so the initial difference is amplified until one cell wins. Mutations in *Notch* or *Delta* make all cells of the cluster become neuroblasts, a "neurogenic" phenotype with a vast excess of neurons and no epidermis on the ventral side. The same Notch–Delta mechanism regulates neurogenesis in vertebrates.

Each *Drosophila* neuroblast divides asymmetrically many times, each division producing another neuroblast and a smaller **ganglion mother cell** that divides once to give two neurons or glia. Proteins such as Numb and Prospero are segregated into the ganglion mother cell at each division, and a sequence of transcription factors expressed in turn by the neuroblast (Hunchback, then Krüppel, Pdm and Castor) gives neurons born at different times different identities: a **temporal code** layered on top of the spatial code of which neuroblast they came from.

### Radial glia and the building of the cortex

In the developing mammalian cortex, the progenitors are **radial glia**: elongated cells spanning the full thickness of the neural tube wall, with their cell bodies in the **ventricular zone** lining the central cavity and a long process reaching the outer surface. Once regarded only as scaffolding, they were shown around 2000–2001 (by the groups of Magdalena Götz and Arnold Kriegstein, among others) to be the neural stem cells themselves, producing neurons directly or through intermediate progenitors. Early on they divide **symmetrically**, each division producing two progenitors and expanding the pool; later they divide **asymmetrically**, producing one progenitor and one neuron or intermediate progenitor.

::: example How many rounds of division? {#ex-divisions}
(a) If every cell in a lineage divided symmetrically, how many rounds of division would it take to make the roughly 16 billion neurons of the human cerebral cortex from a single cell? (b) The radial unit hypothesis (Pasko Rakic, 1995) proposes that the surface area of the cortex is set by the number of progenitors produced by symmetric divisions before neurogenesis begins, and its thickness by the number of neurons each produces. By what factor would three extra rounds of symmetric division increase the cortical surface area? (c) The human cortex has roughly a thousand times the surface area of the mouse cortex. How many extra rounds of symmetric progenitor division would account for that, on this hypothesis alone?
::: solution
(a) $\log_2(1.6\times10^{10}) = 33.9$, so about 34 rounds. Development does not work this simply, but the number shows how few doublings are needed to make enormous numbers of cells.

(b) Each round doubles the progenitor pool, so three extra rounds multiply it, and hence the number of radial units and the surface area, by $2^3 = 8$.

(c) $\log_2 1000 \approx 10$ rounds. In reality, primates also have additional progenitors, the **outer radial glia** of the outer subventricular zone (described in human fetal cortex in 2010 by the Kriegstein group and others), and a longer neurogenic period, which together contribute much of the expansion. Small changes in the timing of the switch from symmetric to asymmetric division can have large effects on brain size, a theme of the evolution of development ([[developmental-biology/evo-devo]]).
:::
:::

Newly born cortical neurons migrate outwards along the processes of radial glia, a mode of migration described by Rakic in 1972 in the fetal monkey brain. In 1961 Joseph Angevine and Richard Sidman injected pregnant mice with radioactive thymidine, which labels cells that are replicating their DNA at the moment of injection, and then found where the labelled neurons ended up in the adult. Neurons born early settled in the deepest layers of the cortex, and those born later migrated past them to settle in more superficial layers: the cortex is built **inside out**. Inhibitory interneurons, by contrast, are born in a different part of the forebrain, the ganglionic eminences, and migrate tangentially into the cortex. The *reeler* mouse, whose cortical layers are roughly inverted, led to the discovery of the secreted protein Reelin, made by cells near the surface, which is required for neurons to stop and assemble in the right order.

## Finding the way: axon guidance

Once a neuron has been born and has migrated, it must send its axon to the right target, sometimes centimetres away, through tissue crowded with other cells. The tip of a growing axon is the **growth cone**, a hand-like expansion with finger-like **filopodia** and veil-like **lamellipodia**, full of actin, that explores its surroundings. Ramón y Cajal described growth cones in fixed chick embryos in 1890 and guessed that they are guided chemically. Ross Harrison confirmed that axons grow out from the cell body when, in 1907, he explanted pieces of frog neural tube into drops of lymph and watched their fibres grow: the invention of tissue culture.

### Chemoaffinity

Roger Sperry cut the optic nerves of newts and frogs, whose central axons can regenerate, and rotated the eye by 180° before letting the nerve regrow. The regenerated axons returned to their original positions in the optic tectum, so the animals behaved as if the world were upside down: they struck downwards at a lure held above them, and never learned to correct it. In his **chemoaffinity hypothesis** (stated fully in 1963), Sperry proposed that each retinal axon and each tectal cell carry molecular labels, perhaps in the form of gradients, that let axons recognise their correct partners.

### Guidance molecules

Sperry's labels were found from the 1990s onwards, together with signals that guide axons along their routes. Four families of guidance cues are best known, each acting through specific receptors on the growth cone and able to attract or repel depending on the receptor and the state of the growth cone:

- **Netrins**, secreted proteins first purified from chick brain as attractants for commissural axons (Tito Serafini, Timothy Kennedy, Marc Tessier-Lavigne and colleagues, 1994), homologous to UNC-6 of *C. elegans*, whose mutants misroute circumferential axons;
- **Slits**, secreted repellents acting through **Robo** receptors, which keep axons from crossing the midline inappropriately (in *Drosophila* and vertebrates);
- **Semaphorins**, secreted or membrane-bound, mostly repellent;
- **Ephrins** and their **Eph** receptor tyrosine kinases, membrane-bound, acting by cell contact.

The retinotectal map uses the last of these. Retinal ganglion cells express EphA receptors in a gradient from low in the nasal retina to high in the temporal retina, and tectal cells express ephrin-A ligands in a gradient from low in the anterior tectum to high in the posterior tectum. Temporal axons, with many receptors, are repelled most strongly by ephrin-A and stop in the anterior tectum; nasal axons, with few receptors, tolerate higher ephrin and extend to the posterior tectum. The map arises from the matching of two gradients, very much in the spirit of Sperry's hypothesis (Uwe Drescher, Friedrich Bonhoeffer and colleagues; Hwai-Jong Cheng, John Flanagan and colleagues; both 1995).

::: example Matching two gradients {#ex-matching}
Model the retinotectal projection along one axis. A retinal axon from position $u$ (0 at the nasal edge, 1 at the temporal edge) carries EphA receptors at a level $R = \mathrm{e}^{2u}$; tectal position $v$ (0 anterior, 1 posterior) carries ephrin-A at a level $L = \mathrm{e}^{2v}$ (arbitrary units). Suppose that each axon grows posteriorly until the repellent signal $RL$ reaches a threshold $S = \mathrm{e}^2$, and stops there. (a) Where does each axon stop? (b) Is the map ordered, and which way round? (c) In goldfish, when half of the tectum is removed, the whole retina eventually maps in compressed form onto the remaining half. Can this model explain that?
::: solution
(a) $RL = \mathrm{e}^{2u + 2v} = \mathrm{e}^2$ gives $u + v = 1$, so an axon from $u$ stops at $v = 1 - u$.

(b) The map is continuous and ordered: nasal axons ($u = 0$) project to the posterior tectum ($v = 1$) and temporal axons ($u = 1$) to the anterior tectum ($v = 0$), as in real animals.

(c) No. With fixed thresholds, axons from $u < 0.5$ would look for positions $v > 0.5$ that no longer exist and would have nowhere to stop, while the axons from $u > 0.5$ would still map onto the remaining anterior half as before. Compression requires that axons compete: if each axon is also repelled by other retinal axons, or if the position at which an axon stops depends on the axons already present, the map can expand or compress to fill the available space. Models that combine gradient matching with competition and with activity-dependent refinement reproduce such experiments, a sign that Sperry's chemoaffinity is necessary but not sufficient.
:::
:::

The axons of spinal commissural neurons give the best-studied example of how a growth cone changes its responses during its journey. They are attracted ventrally by netrin from the floor plate and cross the midline. Having crossed, they must not cross back. Before crossing, Robo receptors are kept low on the growth cone, so the axons ignore the Slit secreted by the floor plate; after crossing, Robo appears on the growth cone and Slit repels the axons, which turn and grow along the far side. One guidance cue can thus be used for several decisions, because the growth cone's receptors change.

How sensitive must a growth cone be? It compares the concentration of a cue on one side with that on the other, across a width of about 10 µm. The quantity it detects is the number of receptors bound on each side.

::: proposition Detecting a gradient by receptor binding {#prop-detect}
Suppose each half of a growth cone has $N$ receptors with dissociation constant $K_\mathrm{d}$, the local concentration is $C$, and the concentration differs by a fraction $p$ across the growth cone. Then the expected difference in the number of bound receptors between the two halves, divided by the random (binomial) fluctuation in that number, is approximately

$$
\mathrm{SNR} = p\sqrt N\,\frac{\sqrt{c}}{1 + c}, \qquad c = \frac{C}{K_\mathrm{d}},
$$ {#eq-snr}

which is largest, $p\sqrt N/2$, when $C = K_\mathrm{d}$.

Assumptions: receptors bind independently at equilibrium; a single snapshot of occupancy (no averaging over time); the gradient is small ($p \ll 1$).
:::

::: proof {collapsed}
The fraction of receptors bound is $b = c/(1 + c)$, so the expected number bound on one side is $Nb$. Increasing the concentration by a fraction $p$ increases $c$ by $pc$ and changes $b$ by $(\dd b/\dd c)\,pc = pc/(1 + c)^2$; the difference between the two halves is $Npc/(1+c)^2$. The number bound on each side is binomial with variance $Nb(1 - b) = Nc/(1 + c)^2$, so its standard deviation is $\sqrt{Nc}/(1 + c)$. Dividing gives [[#eq-snr]]. The function $\sqrt c/(1 + c)$ has derivative zero where $(1 + c)/(2\sqrt c) = \sqrt c$, that is at $c = 1$, where it equals $1/2$.
:::

::: widget plot
f: p*sqrt(N)*sqrt(10^x)/(1 + 10^x)
x: -3, 3
y: 0, 3
sliders: p=0.02:0.005:0.1:0.005; N=10000:1000:50000:1000
labels: \text{signal-to-noise ratio}
hlines: 1
caption: The signal-to-noise ratio with which a growth cone can detect a gradient (vertical axis), from [[#eq-snr]], against the logarithm of the cue concentration relative to the receptors' dissociation constant (horizontal axis: 0 means $C = K_\mathrm{d}$). $p$ is the fractional concentration difference across the growth cone and $N$ the number of receptors on each half (sliders). Detection is best near $K_\mathrm{d}$ and fails far above it (receptors saturated) and far below it (few receptors bound). With 10,000 receptors per half, a 2 % gradient gives a signal-to-noise ratio of only about 1 at best; averaging over time, and steeper gradients, are needed for reliable guidance.
:::

::: example A growth cone in an exponential gradient {#ex-growth-cone}
A guidance cue forms an exponential gradient with length constant $\lambda = 200$ µm. A growth cone 10 µm wide has $N = 10{,}000$ receptors on each half. (a) What is the fractional concentration difference $p$ across the growth cone? (b) What is the best signal-to-noise ratio, from [[#eq-snr]]? (c) What is the ratio where the concentration is $100K_\mathrm{d}$, and where it is $0.01K_\mathrm{d}$? (d) What do the answers imply about where along the gradient guidance works?
::: solution
(a) Across 10 µm the concentration falls by a factor $\mathrm{e}^{-10/200}$, so $p = 1 - \mathrm{e}^{-0.05} = 0.049$. Note that in an exponential gradient $p$ is the same everywhere, because the relative slope is constant.

(b) $p\sqrt N/2 = 0.049\times100/2 = 2.4$.

(c) At $c = 100$: $0.049\times100\times\sqrt{100}/101 = 0.49$. At $c = 0.01$: $0.049\times100\times0.1/1.01 = 0.49$. Both are five times worse than the optimum.

(d) Although the relative gradient is the same everywhere, the growth cone can read it reliably only where the concentration is within about a factor of ten of $K_\mathrm{d}$. With an exponential gradient that range spans $\lambda\ln100 \approx 4.6\lambda$, about 900 µm here. Beyond it, axons need a different cue or receptor, which is one reason why long pathways are divided into short segments with intermediate targets.
:::
:::

The calculation explains why guidance cues act over limited distances (a few hundred micrometres to a millimetre), why growth cones integrate signals over minutes, and why many guidance systems combine several cues.

## Survival, synapse formation and refinement

### Neurotrophic factors and cell death

In many parts of the developing vertebrate nervous system, far more neurons are produced than survive. In the chick embryo, Viktor Hamburger and Rita Levi-Montalcini found that removing a limb bud caused most of the corresponding motor and sensory neurons to die, whereas grafting an extra limb increased the number that survived. About half of the motor neurons in the lumbar spinal cord of the chick die during normal development, shortly after their axons reach the muscles. This led to the **neurotrophic hypothesis**: targets produce limited amounts of a survival factor, and neurons compete for it; those that obtain enough survive, and the rest die by **apoptosis**, the programmed cell death described in [[cell-biology/tissues-and-cell-death]]. The process matches the number of neurons to the size of the target.

The first such factor, **nerve growth factor** (NGF), was discovered in the early 1950s by Levi-Montalcini, then working with Hamburger, when a mouse sarcoma transplanted into chick embryos caused sensory and sympathetic ganglia to grow enormously. With the biochemist Stanley Cohen she purified it, using two unexpected rich sources, snake venom and the mouse salivary gland. Levi-Montalcini and Cohen shared the Nobel Prize in 1986. NGF is now one of a family of **neurotrophins** (with BDNF, NT-3 and NT-4) that act through Trk receptor tyrosine kinases and are carried retrogradely from the axon terminal to the cell body.

### Building synapses

When a growth cone reaches its target, it must form a synapse. At the vertebrate neuromuscular junction, the motor nerve terminal secretes **agrin**, which acts through the muscle receptor complex of LRP4 and the kinase **MuSK** to cluster acetylcholine receptors under the terminal; in the absence of agrin or MuSK, neuromuscular junctions fail to form properly. Central synapses use many adhesion molecules, such as neurexins on the presynaptic side and neuroligins on the postsynaptic side, whose combinations help specify which partners connect.

### Activity-dependent refinement

The connections made by molecular cues are approximately right, but not exactly. In the final stage of development, neural activity refines them, keeping connections that are used together and removing those that are not.

In 1963 Torsten Wiesel and David Hubel closed one eye of kittens during the first months of life and found that, when the eye was reopened, few neurons in the visual cortex responded to it; most were driven only by the eye that had remained open. The same deprivation in adult cats had no such effect. There is a **critical period** during which experience shapes the connections from the two eyes, and their later anatomical work showed that the ocular dominance columns of the deprived eye shrink while those of the open eye expand. The two eyes compete for cortical territory, and the more active eye wins.

Activity is needed even before vision begins. Before photoreceptors work, the developing retina generates spontaneous **retinal waves**, bursts of activity that sweep across the retina every minute or two, so that neighbouring ganglion cells fire together while distant ones do not (Markus Meister, Rachel Wong, Denis Baylor and Carla Shatz, 1991, recording from the developing retina of ferrets). These correlations are thought to provide the information used to refine retinotopic maps and segregate inputs from the two eyes. A striking demonstration came from frogs: when a third eye was grafted into a tadpole, so that two eyes projected to the same tectum, their axons segregated into alternating stripes, like ocular dominance columns, although no frog normally has them (Martha Constantine-Paton and Margaret Law, 1978). Stripes form whenever two sets of inputs with uncorrelated activity compete for the same target.

::: intuition Cells that fire together wire together
The rule behind activity-dependent refinement is the one that Donald Hebb proposed for learning ([[neuroscience/plasticity-learning]]): a synapse is strengthened when its presynaptic input repeatedly helps to fire the postsynaptic cell, and weakened when it fires out of step. Inputs from neighbouring retinal cells fire together during retinal waves, so they strengthen their connections to the same target cells and drive away inputs from distant cells, sharpening the map. Inputs from the two eyes are not correlated with each other, so each target cell comes to be dominated by one eye, and local spreading of each eye's influence produces columns. Carla Shatz's summary of this idea in 1992, "cells that fire together wire together", has become a slogan.
:::

At the neuromuscular junction of newborn mammals, each muscle fibre is innervated by several motor axons; within the first weeks of life all but one withdraw, through activity-dependent competition (**synapse elimination**). In the brain, microglia engulf weaker synapses during the same period ([[neuroscience/neurons-glia]]). Development thus builds an excess and then prunes it, a strategy that allows circuits to be fitted to the body and the world they actually meet.

::: quiz
In a kitten raised with one eye closed during the critical period, then opened, most visual cortical neurons respond only to the eye that had remained open. What is the best explanation?
- [ ] The closed eye's retina degenerated.
- [ ] The kitten learned to ignore the closed eye.
- [x] Inputs from the two eyes competed for cortical neurons, and the more active eye's inputs were strengthened while the inactive eye's inputs were weakened and withdrawn.
- [ ] Neurons responding to the closed eye died for lack of NGF.
::: solution
The retina of the deprived eye and its projection to the thalamus remain largely functional; the change occurs in the cortex. Wiesel and Hubel showed that closing both eyes produced much less loss than closing one, which shows that the effect depends on competition between the eyes, not simply on disuse. Anatomically, the closed eye's geniculocortical axons lose territory while the open eye's gain it.
:::
:::

### Neurogenesis and regeneration in adults

Most neurons in the adult mammalian brain are as old as the animal. Two exceptions are well established in rodents: new neurons are added throughout life to the olfactory bulb and to the dentate gyrus of the hippocampus. In songbirds, Fernando Nottebohm and colleagues showed in the 1980s that the song-control nuclei of canaries gain and lose large numbers of neurons seasonally. Whether neurogenesis continues at a meaningful rate in the adult human hippocampus has been the subject of conflicting studies since 2018, which used different tissue-processing methods and markers; as of 2026 the question is not settled.

The central nervous system of fishes and amphibians can regenerate cut axons, as Sperry's experiments required, but that of adult mammals generally cannot, whereas peripheral axons of mammals do regrow. The difference lies partly in the environment, myelin-associated inhibitors of growth and the scar formed by astrocytes after injury, and partly in the neurons themselves, which lose much of their intrinsic growth capacity as they mature. Overcoming both is a major aim of research on spinal cord injury.

::: application Development and disease
Because the nervous system is built by so many precisely timed steps, disturbances in development underlie a wide range of human conditions, from defects of neural tube closure (whose risk is reduced by adequate folate before and early in pregnancy) to disorders of neuronal migration and to neurodevelopmental conditions whose genetic causes often lie in genes for synaptic proteins and chromatin regulators. Clinical aspects belong to [Medicine Atlas: paediatrics](/learn/medicine/course.php?c=paediatrics); here the point is that each mechanism of this chapter, when it fails, has recognisable consequences.
:::

::: history
Ramón y Cajal described the growth cone in 1890 and Ross Harrison grew axons in culture in 1907. Spemann and Mangold reported the organizer in 1924 (Spemann received the Nobel Prize in 1935; Mangold died in 1924, before the paper appeared). Hamburger and Levi-Montalcini studied target-dependent neuron survival in the chick from the 1930s and 1940s, and NGF was discovered and purified in the 1950s. Angevine and Sidman showed the inside-out generation of the cortex in 1961, Sperry formulated chemoaffinity in 1963, and Wiesel and Hubel described the effects of monocular deprivation in 1963. Rakic described radial-glial guided migration in 1972. The molecular era brought noggin (1992), chordin (1994), netrins (1994), the ephrin gradients of the retinotectal map (1995), Slit and Robo (1998–1999) and the recognition of radial glia as neural stem cells (2000–2001).
:::

## Where this leads

The developmental rules of this chapter continue in the adult brain as the mechanisms of learning: the Hebbian strengthening of correlated synapses and the competition between inputs reappear in [[neuroscience/plasticity-learning]]. The comparative theme, how different brains solve similar problems, returns in [[behaviour/mechanisms-of-behaviour]].

::: summary
- Sponges and placozoans lack neurons but have many synaptic genes; ctenophores, cnidarians and bilaterians have nervous systems. Whether neurons evolved once or twice depends on the debated position of ctenophores.
- Bilaterians centralised their nervous systems; the dorsal nerve cord of chordates and the ventral cord of arthropods form opposite BMP signalling, consistent with a dorsoventral inversion.
- Neural induction requires blocking BMP signalling (noggin, chordin, follistatin from the organizer), together with FGF and Wnt-dependent signals in amniotes.
- The neural tube is patterned by morphogens: Shh ventrally, BMP and Wnt dorsally; a steady-state gradient $C = C_0\mathrm{e}^{-x/\lambda}$ with $\lambda = \sqrt{D/k}$ places boundaries at $\lambda\ln(C_0/T)$. Hox genes and local organisers pattern the anterior–posterior axis.
- Notch–Delta lateral inhibition selects neural precursors; radial glia are cortical stem cells; the cortex is built inside out by migration along radial glia.
- Growth cones follow attractive and repulsive cues (netrins, Slits, semaphorins, ephrins), changing their receptors as they go; gradient detection is best near the receptor $K_\mathrm{d}$ and limited by noise.
- Neurotrophic factors (NGF and relatives) match neuron numbers to targets; about half of many neuron populations die.
- Activity refines connections within critical periods by Hebbian competition (monocular deprivation, retinal waves, three-eyed frogs, synapse elimination).
:::

## Exercises

::: exercise A length constant for a morphogen {level=1 check="100"}
A morphogen has $D = 5\ \mu\mathrm{m^2\,s^{-1}}$ and is degraded with rate constant $k = 5\times10^{-4}$ s⁻¹. What is its steady-state length constant in µm?
::: solution
$\lambda = \sqrt{D/k} = \sqrt{5/(5\times10^{-4})} = \sqrt{10^4} = 100$ µm.
:::
:::

::: exercise A threshold boundary {level=1 check="161"}
With $\lambda = 70$ µm, where (to the nearest µm) does the boundary for a threshold of $0.1\,C_0$ lie?
::: solution
$x = 70\ln10 = 70\times2.303 = 161$ µm.
:::
:::

::: exercise Classifying experiments {level=1}
For each experiment, say what developmental process it demonstrated: (a) Spemann and Mangold's dorsal-lip graft; (b) Angevine and Sidman's thymidine labelling; (c) Sperry's eye rotation; (d) Hamburger's limb-bud removal; (e) Wiesel and Hubel's monocular deprivation.
::: solution
(a) Induction by the organizer, including neural induction. (b) The inside-out order of cortical neurogenesis and migration. (c) Specific, molecular recognition between retinal axons and tectal targets (chemoaffinity). (d) Target-dependent survival of neurons (the basis of the neurotrophic hypothesis). (e) Activity-dependent competition during a critical period.
:::
:::

::: exercise Robustness of a gradient {level=2}
Two embryos produce a morphogen with the same $\lambda = 50$ µm, but in one the source is 30 % stronger. A boundary is set at a threshold of $0.2\,C_0$ (where $C_0$ is the normal source strength). (a) By how much does the boundary shift in the second embryo? (b) If the tissue is 300 µm long, is this a large error? (c) Describe one mechanism that would make the boundary position independent of source strength.
::: solution
(a) The shift is $\lambda\ln1.3 = 50\times0.262 = 13$ µm. (b) Relative to 300 µm it is about 4 % of the field, perhaps one or two cell diameters: modest, but for a boundary that must align with others it may matter. (c) Several mechanisms help: a second, opposing gradient from the other end, with the boundary set by the ratio of the two; **self-enhanced degradation**, in which the morphogen increases its own removal rate, which flattens the response to source strength near the source; scaling the source to the size of the tissue; or downstream cross-repressive transcription factors that create sharp, hysteretic boundaries that resist small changes once formed.
:::
:::

::: exercise Interpreting a guidance assay {level=2}
Explants of embryonic rat dorsal spinal cord, containing commissural neurons, are placed in a collagen gel 300 µm from an explant of floor plate. Their axons grow towards the floor plate. When the floor plate is replaced by cells transfected to secrete netrin-1, the same result is obtained; control cells do not attract. (a) What does this show? (b) How would you show that netrin is required, not just sufficient, for commissural axons to reach the floor plate in vivo? (c) Predict the behaviour of commissural axons in a *Robo* mutant fly.
::: solution
(a) Netrin-1 is sufficient to attract commissural axons at a distance, consistent with its being the floor-plate attractant. (b) Examine embryos lacking netrin-1 or its receptor DCC (deleted in colorectal cancer); in such mice many commissural axons fail to reach the floor plate, showing that netrin is required in vivo (other cues such as Shh also contribute). (c) Without Robo, axons are not repelled by Slit at the midline, so they cross and recross it repeatedly; that is the "roundabout" phenotype from which the gene was named.
:::
:::

::: exercise Cell death and target size {level=2}
In a chick embryo, 20,000 lumbar motor neurons are generated, and the hind-limb muscles provide enough trophic support for 12,000. (a) What fraction die? (b) Predict the number of survivors after removing the limb bud on one side and after grafting a supernumerary limb that adds 40 % to the target. (c) Why might a nervous system produce surplus neurons and then kill them, rather than producing exactly the right number?
::: solution
(a) $8000/20{,}000 = 40$ %. (b) Without the limb, nearly all die (only a few survive on other support); with a 40 % larger target, about $12{,}000\times1.4 = 16{,}800$ survive, as Hollyday and Hamburger found qualitatively in 1976. (c) Overproduction followed by competition matches neuron numbers to targets whose size varies between individuals and during evolution, without requiring the nervous system to know the target size in advance. It also eliminates neurons whose axons went to the wrong place, which receive no trophic support. The cost is the wasted cells; the benefit is robust matching.
:::
:::

::: exercise Gradient detection {level=2 check="1.25"}
Using [[#eq-snr]], what is the best possible signal-to-noise ratio for a growth cone with 10,000 receptors on each half in a 2.5 % gradient? Give two decimal places. How large a gradient would it need for a ratio of 3 at the same receptor number?
::: solution
At $C = K_\mathrm{d}$, $\mathrm{SNR} = p\sqrt N/2 = 0.025\times100/2 = 1.25$. For a ratio of 3, $p = 2\times3/\sqrt N = 6/100 = 0.06$, a 6 % difference across the growth cone. Alternatively, averaging $M$ independent snapshots over time multiplies the ratio by $\sqrt M$, so about six independent samples would bring a 2.5 % gradient to a ratio of 3.
:::
:::

::: exercise Evolution of centralised nervous systems {level=3}
Two hypotheses explain the similarities between the central nervous systems of insects and vertebrates: (H1) a centralised nervous system was present in their common ancestor and has been inherited; (H2) centralisation evolved independently in the two lineages, using an inherited toolkit of patterning genes. (a) What evidence supports H1? (b) What evidence supports H2? (c) What observations in other animal groups would help decide?
::: solution
(a) The same genes pattern the dorsoventral axis of the nervous system (BMP/Dpp and chordin/Sog), with conserved functions shown by cross-species experiments; similar sets of transcription factors (such as the *Nkx*, *Ind*/*Gsx* and *Msx* genes) divide the nerve cords into the same mediolateral columns in insects, annelids and vertebrates; and Hox and other anterior–posterior genes are expressed in a conserved order in the brain and nerve cord. (b) Many bilaterian groups, including acoels, hemichordates and some others, have diffuse or basiepithelial nervous systems; the toolkit genes are also used outside the nervous system, so their conserved expression may reflect conserved ectodermal patterning rather than a conserved nerve cord; and central nervous systems differ greatly in structure. (c) The distribution of centralised and diffuse nervous systems across a well-resolved bilaterian phylogeny: if the groups that branch closest to the base of the bilaterians have diffuse systems, H2 gains support; detailed comparison of gene expression in nerve cords of annelids and other lophotrochozoans, and in hemichordates and other deuterostomes, would show whether the column pattern is present wherever a cord exists. As of 2026 the question remains open.
:::
:::

::: exercise Critical periods {level=3}
In kittens, closing one eye for a few days at four weeks of age causes a large shift in ocular dominance, whereas closing it for months in an adult cat causes little. (a) Suggest two cellular mechanisms that could close the critical period. (b) Experiments in mice show that the critical period can be delayed by preventing the maturation of a class of inhibitory interneurons, and triggered early by enhancing GABAergic inhibition with a benzodiazepine. What does this suggest? (c) Why might it be adaptive for plasticity to decline with age?
::: solution
(a) Possible mechanisms: maturation of inhibitory circuits, which changes the balance of excitation and inhibition and the conditions for Hebbian plasticity; the formation of perineuronal nets, extracellular matrix structures around some interneurons that stabilise synapses; myelination and growth-inhibiting molecules that limit axonal sprouting; and changes in NMDA receptor subunits that alter the Ca²⁺ signals driving plasticity. (b) The opening of the critical period depends on a threshold of inhibition, especially from fast-spiking parvalbumin-expressing interneurons (Takao Hensch and colleagues): the timing is set by the maturation of inhibitory circuits rather than by age as such. (c) Early in life the eyes, the head and the body grow and the brain must calibrate itself to them; once growth has stopped, a stable, calibrated circuit is valuable, and continued large-scale plasticity would risk disrupting it in response to transient changes such as a temporary injury. Adults still learn, but by more restricted mechanisms ([[neuroscience/plasticity-learning]]).
:::
:::
