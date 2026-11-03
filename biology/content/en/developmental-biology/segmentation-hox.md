Look at a centipede, an earthworm or the backbone of a snake and you see the same plan repeated: a body built from a series of similar units, the **segments**. Insects are segmented too — a fly has head segments fused into a capsule, three thoracic segments carrying legs and wings, and eight or so abdominal segments — and so are vertebrates, in their vertebrae, ribs, spinal nerves and the muscles between the ribs. Segmentation poses two separate problems. First, how is a continuous tissue divided into a series of repeated units of the right size and number? Second, how does each unit acquire its own **identity**, so that one segment grows wings and the next halteres, or one vertebra carries ribs and the next does not?

The answers came from two organisms. In *Drosophila*, a cascade of transcription factors subdivides the syncytial embryo into fourteen stripes within about three hours, and a group of selector genes, the **Hox genes**, gives each its identity. In vertebrates, segments called **somites** bud off one by one from the growing tail end of the embryo, timed by a molecular clock; and the same Hox genes, in four clusters, give them their identities. The discovery that the Hox genes are shared by flies and vertebrates was one of the great surprises of twentieth-century biology. The maternal gradients that start the process are in [[developmental-biology/axis-formation]].

## The segmentation hierarchy of *Drosophila*

In 1980 Christiane Nüsslein-Volhard and Eric Wieschaus published the results of a genetic screen for zygotic mutations that changed the pattern of denticle belts — rows of small hooks on the ventral cuticle, one belt per segment — in *Drosophila* larvae. The mutants fell into three classes, distinguished by the size and spacing of the parts of the pattern they deleted. Together with the maternal genes and the Hox genes, they make up a hierarchy in which each class of gene is regulated by those above it.

::: definition The segmentation gene classes {#def-segmentation-genes}
- **Gap genes** (*hunchback*, *Krüppel*, *knirps*, *giant*, plus the terminal genes *tailless* and *huckebein*) are expressed in broad domains along the anterior–posterior axis. Mutants lack a block of several contiguous segments — a "gap" in the pattern.
- **Pair-rule genes** (such as *even-skipped*, *fushi tarazu*, *hairy*, *runt* and *paired*) are expressed in seven stripes, one in every second segment primordium. Mutants lack corresponding parts of alternate segments, so the larva has about half the normal number of segments.
- **Segment-polarity genes** (such as *engrailed*, *wingless*, *hedgehog* and *patched*) are expressed in fourteen stripes, one per segment. Mutants have the normal number of segments, but part of each segment is deleted and replaced by a mirror-image duplicate of the rest.
:::

All gap and pair-rule genes and *engrailed* encode transcription factors, which can act on each other directly while the embryo is still a syncytium. The segment-polarity genes *wingless* and *hedgehog* encode secreted signals — necessary because by the time they act, around cellularisation, cell membranes separate the nuclei.

::: example Classifying segmentation mutants {#ex-classify}
Three mutant larvae are described. Assign each to a gene class. (a) The larva has seven denticle belts instead of fourteen, each broader than normal, and the missing material corresponds to every other segment. (b) The larva has the normal number of segments, but in each segment the naked posterior part is missing and the denticle belt is duplicated in reverse orientation, giving a "lawn" of denticles. (c) The larva lacks the thoracic and first abdominal segments; the head and the posterior abdomen are normal.
::: solution
(a) Pair-rule: the defect repeats with a period of two segments. (*fushi tarazu* means "too few segments" in Japanese.) (b) Segment polarity: each segment is affected, with a mirror-image duplication — *wingless* and *hedgehog* mutants look like this, and the hedgehog-like bristling of denticles gave *hedgehog* its name. (c) Gap: a block of contiguous segments is missing, as in *Krüppel* mutants ("cripple" in German), which lack the thorax and anterior abdomen.
:::
:::

### Gap genes: from gradients to domains

Gap genes are activated by the maternal gradients. Bicoid activates *hunchback* in the anterior half; Hunchback at high levels represses *Krüppel*, and at lower levels allows or promotes it, so *Krüppel* is expressed in a central band; *knirps* is expressed more posteriorly where Hunchback is low, and *giant* in an anterior and a posterior band. Crucially, the gap genes **repress each other**: Krüppel and Giant, Hunchback and Knirps are mutually repressive pairs, and adjacent domains overlap only slightly. Mutual repression sharpens the boundaries and keeps them stable even when the maternal gradients vary, which is part of the answer to the precision puzzle of [[developmental-biology/axis-formation]]. Gap-gene expression has been measured so precisely that it has become a classic testing ground for quantitative models of development.

### Pair-rule genes: stripes from enhancers

How do broad gap domains produce seven narrow stripes? Not by any repeating mechanism, it turned out, but by brute combinatorics. The primary pair-rule gene *even-skipped* (*eve*) has separate **stripe enhancers**, each a few hundred base pairs of DNA that drives one or two of the seven stripes. Stephen Small, Alison Blair and Michael Levine showed in 1992 that a 480-base-pair enhancer, fused to a reporter gene, drives expression in stripe 2 alone. It is activated by Bicoid and Hunchback, which are present throughout the anterior half, and repressed by Giant on its anterior side and Krüppel on its posterior side. The stripe forms in the narrow gap between the two repressor domains, where activators are present and repressors are not.

::: widget plot
f: exp(-x/20)/(exp(-x/20) + 0.05)/(1 + exp((x - 50)/2))/(1 + ((1/(1 + exp((x - 31)/1.5)))/g)^4)/(1 + (exp(-((x - 50)/6)^2)/k)^4); 1/(1 + exp((x - 31)/1.5)); exp(-((x - 50)/6)^2)
x: 0, 70
y: 0, 1.05
sliders: g=0.3:0.05:3:0.05; k=0.3:0.05:3:0.05
labels: eve \text{ stripe 2}; \text{Giant}; \text{Krüppel}
caption: A simplified model of the *eve* stripe 2 enhancer along the anterior 70 % of the embryo (horizontal axis: position in % of egg length from the anterior). Activation by Bicoid and Hunchback is high everywhere anterior to about 50 %; the enhancer's output (first curve) is that activation multiplied by repression terms for Giant (anterior domain) and Krüppel (central domain), with repression thresholds $g$ and $k$. The stripe appears only in the gap between the repressors, at about 33–43 %. Raise $k$ to 3 (weak Krüppel repression, like a *Krüppel* mutant) and the stripe spreads posteriorly; raise $g$ and it spreads anteriorly, as observed in mutants. The profiles are schematic, not measured.
:::

Each of the other stripes is made by its own enhancer reading a different combination of gap proteins, so the seven stripes are seven separate solutions to seven local problems — an inelegant design, but evolution builds by tinkering, and it shows how a modular enhancer lets one gene be regulated independently in different places. Secondary pair-rule genes such as *fushi tarazu* then read the primary ones, and by the end of the syncytial stage the pair-rule proteins together define a precise, repeating code with a resolution of single rows of cells.

### Parasegments and segment polarity

The seven *eve* stripes and the seven *ftz* stripes alternate, and the anterior edge of each of these fourteen stripes defines the anterior boundary of a unit called a **parasegment**. Alfonso Martinez Arias and Peter Lawrence pointed out in 1985 that the parasegment, not the segment, is the primary unit of the *Drosophila* embryo: each segment of the larva consists of the posterior part of one parasegment and the anterior part of the next.

::: definition Parasegments and compartments {#def-parasegment}
A **parasegment** is a unit of the early *Drosophila* embryo comprising the posterior compartment of one segment and the anterior compartment of the next; its anterior boundary is marked by the stripes of *engrailed* expression. A **compartment** is a population of cells whose descendants never cross a boundary into a neighbouring compartment, even though there is no physical barrier. Antonio García-Bellido, Pedro Ripoll and Ginés Morata discovered compartments in 1973 by making clones of fast-growing marked cells in the wing: however large a clone grew, it never crossed the boundary between the anterior and posterior halves.
:::

The pair-rule proteins switch on *engrailed* in a stripe one cell wide at the anterior of each parasegment, and *wingless* in the row of cells immediately anterior to it. The two cell rows then maintain each other: Engrailed-expressing cells secrete Hedgehog, which keeps the neighbouring cells making Wingless, and Wingless keeps the Engrailed cells expressing *engrailed* and *hedgehog*. This positive feedback loop between adjacent cells stabilises the parasegment boundary after the pair-rule proteins have disappeared, and the two signals pattern the cells on either side, polarising each segment. *engrailed* also acts as a **selector gene** for the posterior compartment: cells that express it adopt posterior identity, and cells that lose it in the posterior compartment behave as anterior cells.

::: quiz
In a larva lacking *wingless* function, which description of the denticle pattern fits best?
- [ ] Seven segments, because alternate *engrailed* stripes are lost
- [x] Fourteen segment primordia form, but the Engrailed–Wingless loop fails and each segment becomes a mirror-image lawn of denticles
- [ ] A normal pattern, because *wingless* acts only in the wing
- [ ] A larva missing the thorax only
::: solution
*engrailed* stripes are initiated by pair-rule genes in all fourteen parasegments, but without Wingless signalling they decay, Hedgehog is lost too, and the part of each segment that would form naked cuticle is replaced by denticles in reversed polarity. The gene was named for the wingless adult phenotype of a weak allele; null alleles are embryonic lethal with a segment-polarity phenotype.
:::
:::

## Hox genes: identity along the axis

### Homeotic mutations

In 1894 William Bateson collected examples of **homeosis**, the transformation of one part of the body into the likeness of another: insects with legs instead of antennae, extra pairs of ribs, flowers with petals in place of stamens. Their genetic basis was worked out in *Drosophila*. Mutations in the *Antennapedia* gene that cause it to be expressed in the head make legs grow in place of antennae. Combinations of mutations in the *Ultrabithorax* gene (*bithorax*, *postbithorax*) transform the third thoracic segment, which carries small balancing organs called halteres, into a copy of the second, giving a fly with four wings. Edward Lewis, who built such a fly in the 1970s, had studied this region, the **bithorax complex**, since the 1940s, and in 1978 he proposed a model in which a series of genes are switched on progressively in more posterior segments, each adding a new identity on top of those before.

::: definition Homeotic and Hox genes {#def-hox}
A **homeotic gene** is a gene whose mutation transforms one body part into the likeness of another (a **homeotic transformation**). The **Hox genes** are a family of homeotic genes encoding homeodomain transcription factors, arranged in one or more clusters on the chromosome, and expressed in overlapping domains along the anterior–posterior axis; they specify the identities of positions along the axis. In *Drosophila* there are eight, split between the **Antennapedia complex** (*labial*, *proboscipedia*, *Deformed*, *Sex combs reduced*, *Antennapedia*) and the **bithorax complex** (*Ultrabithorax*, *abdominal-A*, *Abdominal-B*).
:::

Hox genes do not make structures themselves; they select which developmental programme a segment follows. *Ultrabithorax* (Ubx) in the third thoracic segment, for instance, represses genes needed for wing growth, so a haltere forms; without it, the segment runs the default programme of the second thoracic segment, which makes a wing.

### Colinearity and posterior prevalence

Two rules capture how the Hox genes are deployed.

- **Colinearity.** The order of the genes along the chromosome matches the order of their expression domains along the body: *labial* at the 3′ end is expressed most anteriorly, *Abdominal-B* at the 5′ end most posteriorly. In vertebrates this spatial colinearity is accompanied by **temporal colinearity**: 3′ genes are switched on earlier than 5′ genes.
- **Posterior prevalence.** Where several Hox genes are expressed in the same cells, the more posterior (5′) gene usually dominates the phenotype, often by repressing the more anterior genes or overriding their function. So the loss of a posterior Hox gene transforms its domain towards the identity specified by the next most anterior gene, while ectopic expression of a posterior gene in anterior segments transforms them towards posterior identity.

Once established by gap and pair-rule proteins, Hox expression patterns must be remembered for days through many cell divisions, long after their initial regulators have gone. This memory is provided by the **Polycomb** group proteins, which keep inactive Hox genes silent, and the **Trithorax** group, which keep active ones on — both discovered as mutations causing homeotic transformations, and both now known as chromatin regulators ([[molecular-biology/eukaryotic-gene-regulation]]).

::: example Predicting Hox phenotypes {#ex-hox-phenotypes}
Using posterior prevalence, predict the transformations caused by (a) loss of *Ultrabithorax* in the third thoracic segment (T3) and first abdominal segment (A1); (b) expression of *Ubx* throughout the thorax, including T2; (c) loss of *Antennapedia* in the thorax.
::: solution
(a) In T3 and A1, the next most anterior Hox gene is *Antennapedia*, which specifies T2 identity. Without Ubx these segments develop as T2: T3 grows wings instead of halteres, and A1 forms a T2-like segment with legs. Lewis's four-winged flies carried weaker mutations that affected T3 only.

(b) Ubx in T2 imposes T3 identity there, so the wings become haltere-like: a fly with four halteres and no wings.

(c) Loss of *Antennapedia* leaves T2 and T3 under the influence of the next more anterior gene, *Sex combs reduced*, and in the larva they are transformed towards T1 (prothoracic) identity. In the adult, clones of *Antp* mutant cells in the leg discs form antenna-like structures, the reverse of the dominant gain-of-function *Antennapedia* alleles that put legs on the head.
:::
:::

### The homeobox and the vertebrate Hox clusters

In 1984 the groups of Walter Gehring (William McGinnis, Michael Levine and colleagues) and of Matthew Scott (with Amy Weiner) found that *Antennapedia*, *Ultrabithorax* and *fushi tarazu* share a sequence of about 180 base pairs, the **homeobox**, encoding a 60-amino-acid DNA-binding domain, the **homeodomain**, which folds into a helix-turn-helix. Using the homeobox as a probe, they and others immediately found related genes in frogs, mice and humans.

Mammals have 39 Hox genes in four clusters, *HoxA* to *HoxD*, on four different chromosomes. The genes fall into 13 **paralogue groups** by sequence similarity, each group corresponding to one position in an ancestral cluster, though no single cluster retains all 13. The four clusters arose by two rounds of whole-genome duplication early in vertebrate evolution ([[developmental-biology/evo-devo]]). Vertebrate Hox genes show the same colinearity as fly genes: genes of paralogue groups 1–3 are expressed in the hindbrain and neck, those of groups 9–13 in the lower back, tail and limbs.

The evidence that they specify regional identity comes from knockouts. Mice lacking all three paralogue-10 genes (*Hoxa10*, *Hoxc10*, *Hoxd10*) have no lumbar vertebrae: every vertebra behind the thorax carries ribs, as thoracic vertebrae do; mice lacking all paralogue-11 genes have no sacral vertebrae (Deneen Wellik and Mario Capecchi, 2003). Single knockouts usually give mild transformations, because paralogues share functions. And across species, the anterior boundary of *Hoxc6* expression in the mesoderm marks the transition from neck to thorax, whether that falls after 7 cervical vertebrae in a mouse or 17 in a goose (Ann Burke, Clifford Tabin and colleagues, 1995). In snakes, the thoracic Hox code extends along almost the whole trunk, consistent with their long series of rib-bearing vertebrae (Martin Cohn and Cheryll Tickle, 1999, in the python).

::: warning "Hox genes build the structures of a segment"
Hox genes are often described as "master genes for legs" or "genes for wings", but they do not encode instructions for building anything. They are selectors: they modify the activity of hundreds of downstream genes (the *realisator* genes) and of the signalling pathways that build structures, choosing among programmes that the segment could run. The same Hox protein can therefore have quite different effects in different tissues and different animals. Ubx turns the fly's hindwing into a haltere, yet in butterflies Ubx is expressed in the hindwing, a full-sized wing, where it modifies colour pattern rather than suppressing growth (Scott Weatherbee, Sean Carroll and colleagues, 1999); the difference lies in which target genes have Ubx-responsive enhancers.
:::

## Somitogenesis: the vertebrate segmentation clock

Vertebrate segmentation works differently. During and after gastrulation, the paraxial mesoderm on each side of the neural tube and notochord forms a rod of unsegmented tissue, the **presomitic mesoderm** (PSM). At its anterior end, blocks of cells separate off as **somites**, one pair at a time, in a strict rhythm, while the posterior end grows and keeps the PSM supplied with new cells from the tail bud. Somites form the vertebrae and ribs (sclerotome), the skeletal muscles of the trunk and limbs (myotome) and the dermis of the back (dermatome). The total number of somites is characteristic of each species — about 50 in the chick, about 65 in the mouse and over 300 in some snakes.

In 1976 Jonathan Cooke and Christopher Zeeman proposed that somites are produced by the interaction of a **clock**, an oscillator in every cell of the PSM, and a **wavefront**, a front of maturation moving posteriorly along the PSM as the axis grows. Each time the clock reaches a certain phase, the cells that the wavefront has just passed are grouped into a somite. The model waited twenty years for evidence.

In 1997 Isabel Palmeirim, Domingos Henrique, David Ish-Horowicz and Olivier Pourquié found it in the chick. The mRNA of *c-hairy1*, a relative of the *Drosophila* pair-rule gene *hairy*, appeared and disappeared rhythmically in the PSM cells with a period of 90 min, exactly the time taken to form one somite. Because the oscillations in more anterior cells lag behind those in posterior cells, the expression appears as a wave sweeping from the tail towards the head once per cycle. Many cyclic genes have since been found, in the Notch, Wnt and FGF pathways, in all vertebrates studied.

::: definition Segmentation clock and determination front {#def-clock}
The **segmentation clock** is a molecular oscillator in the cells of the presomitic mesoderm, built from negative feedback loops of Hes/Her transcriptional repressors and components of the Notch, Wnt and FGF pathways. Its period equals the time taken to form one somite. The **determination front** (wavefront) is the position in the PSM where cells become competent to form a somite boundary; it is set by opposing gradients of FGF and Wnt signalling, high posteriorly, and retinoic acid, high anteriorly, and moves posteriorly as the axis elongates.
:::

::: proposition The clock-and-wavefront relation {#prop-clock-wavefront}
If the determination front moves posteriorly at a speed $v$ relative to the cells, and the clock has period $T$, each somite has length

$$
S = vT.
$$ {#eq-somite-length}

If somitogenesis lasts a total time $t_\mathrm{seg}$ with constant period, the number of somites is $N = t_\mathrm{seg}/T$. Assumptions: a constant clock period and front speed (in reality both change slowly, and somites differ in size along the body).
:::

The relation is simple, but it explains striking experiments. Josiane Dubrulle, Michael McGrew and Pourquié showed in 2001 that implanting a bead soaked in FGF8 into the chick PSM keeps nearby cells immature, displacing the front, and that the somites formed near the bead were smaller; slowing the clock in mutants or by drugs makes somites larger.

::: example Somites in the chick and mouse {#ex-somites}
(a) The chick segmentation clock has a period of 90 min. If the determination front moves at 1.5 µm min⁻¹ relative to the PSM cells (an illustrative value), how long is each somite? (b) The mouse forms about 65 pairs of somites with a period of about 2 h. Roughly how long does somitogenesis last? (c) The chick forms about 52 pairs with a period of 90 min. How long does its somitogenesis last?
::: solution
(a) $S = vT = 1.5\times90 = 135$ µm.

(b) $t_\mathrm{seg} = NT \approx 65\times2\ \mathrm{h} = 130$ h, about 5.4 days. Mouse somitogenesis indeed runs from about embryonic day 8 to about day 13.5.

(c) $52\times1.5\ \mathrm{h} = 78$ h, a little over 3 days, consistent with somitogenesis in the chick running from the second to about the fifth day of incubation. (The real period varies somewhat over this time.)
:::
:::

::: widget plot
f: (1 + cos(2*pi*t/(1 + 1.5*x)))/2
x: 0, 1
y: 0, 1.05
sliders: t=0:0:12:0.02
labels: \text{cyclic gene expression}
caption: A schematic segmentation clock along the presomitic mesoderm, from the tail bud ($x = 0$) to the anterior end where somites form ($x = 1$). Every cell oscillates, but the period lengthens anteriorly, here from 1 (in units of the tail-bud period) to 2.5. Move the time slider $t$ slowly: peaks of expression arise at the tail and sweep anteriorly as waves, narrowing as they go, as Palmeirim and colleagues saw with *c-hairy1* in the chick. In the embryo the waves stop at the determination front, where each one leaves behind a new somite.
:::

### How the clock ticks

The core of the oscillator is a gene that represses itself with a delay. In the zebrafish the genes *her1* and *her7*, and in the mouse *Hes7*, encode short-lived transcriptional repressors that bind their own promoters. When the repressor is abundant, transcription stops; the mRNA and protein decay within minutes; repression is released and transcription restarts. Ryoichiro Kageyama's group showed in 2002 that *Hes1*, a related gene, oscillates with a period of about 2 h even in cultured cells, and that its mRNA and protein each have half-lives of about 20–25 min. Negative feedback alone gives oscillations only if there is a delay — here, the time to transcribe, splice and export the mRNA and to translate the protein — and if the components are unstable.

::: proposition Period of a delayed autorepressor (approximate) {#prop-delay}
For a gene that represses itself through a delay of total length $\tau = T_\mathrm{m} + T_\mathrm{p}$ (the delays of making mRNA and protein), with strongly cooperative repression and molecules that decay quickly compared with the delay, the oscillation period is approximately

$$
T \approx 2\tau = 2(T_\mathrm{m} + T_\mathrm{p}).
$$

Slower decay lengthens the period further. This estimate comes from Julian Lewis's 2003 model of the zebrafish *her1/her7* oscillator and is a guide to orders of magnitude, not an exact law.
:::

::: example Estimating the zebrafish clock {#ex-delay}
A *her* gene of about 2 kb is transcribed at an elongation rate of about 20 nucleotides per second; splicing, release and export of the mRNA to the cytoplasm then take about 10 min; the protein of about 300 amino acids is translated at about 6 amino acids per second, and takes another minute or so to return to the nucleus. (These are representative rates, not measurements for this gene.) Estimate the total delay and the period predicted by [[#prop-delay]], and compare with the zebrafish somite period of about 30 min at 28 °C.
::: solution
Transcription: $2000/20 = 100$ s ≈ 1.7 min. Processing and export: 10 min. So $T_\mathrm{m} \approx 11.7$ min. Translation: $300/6 = 50$ s ≈ 0.8 min, plus about 1 min to return: $T_\mathrm{p} \approx 1.8$ min. Total delay $\tau \approx 13.5$ min, and the predicted period is $T \approx 2\tau = 27$ min — close to the observed 30 min. The estimate shows that the clock's tempo is set by mundane molecular delays, which is why it is sensitive to temperature and to the length of the gene: the processing of introns, in particular, makes up most of the delay.
:::
:::

::: intuition Why a delayed repressor oscillates
Imagine a thermostat that can only see the temperature as it was ten minutes ago. When the room becomes warm, the heater keeps running for ten more minutes, overshooting; then it switches off and stays off for ten minutes after the room has become too cold. The system swings forever between too hot and too cold, with a period of roughly twice the delay. A self-repressing gene with a transcription and translation delay behaves the same way, provided its products are removed quickly; if they last long, the swings are damped and the system settles at a steady level.
:::

Human segmentation-clock oscillations have been studied in presomitic mesoderm cells derived from induced pluripotent stem cells. In 2020 the groups of Miki Ebisuya and Olivier Pourquié reported a period of about 5 h, compared with about 2–3 h for equivalent mouse cells; differences in the rates of biochemical reactions, such as protein degradation, appear to explain much of the difference in tempo between species.

::: application Segmentation defects
Mutations in genes of the segmentation clock and the Notch pathway, such as *DLL3*, *MESP2*, *LFNG* and *HES7*, cause congenital disorders of the human vertebral column in which vertebrae are fused, misshapen or missing. Their identification depended directly on the mouse and zebrafish studies of the clock described here. Clinical aspects are covered in the Medicine Atlas ([Medicine Atlas](/learn/medicine/)).
:::

::: history
William Bateson coined "homeosis" in his *Materials for the Study of Variation* (1894). Calvin Bridges found the first *bithorax* mutation in 1915, and Edward Lewis analysed the bithorax complex from the 1940s until his synthesis of 1978. The Nüsslein-Volhard–Wieschaus screen (published in 1980) found the gap, pair-rule and segment-polarity genes, and the genes were cloned in the 1980s; Lewis, Nüsslein-Volhard and Wieschaus shared the 1995 Nobel Prize in Physiology or Medicine. The homeobox was found in 1984, and its presence in vertebrates immediately suggested deep conservation of body-plan genes. Cooke and Zeeman's clock-and-wavefront model (1976) was vindicated by the discovery of cyclic *c-hairy1* expression in 1997.
:::

::: summary
- Segmentation divides the body into repeated units and gives each its identity.
- In *Drosophila*, maternal gradients activate gap genes in broad domains; gap proteins repress each other and regulate pair-rule genes through stripe-specific enhancers (*eve* stripe 2: activated by Bicoid and Hunchback, bounded by Giant and Krüppel); pair-rule genes activate segment-polarity genes in fourteen stripes.
- The parasegment is the primary unit; Engrailed (with Hedgehog) and Wingless in adjacent cells maintain each other and stabilise boundaries. Compartments are lineage-restricted cell populations; *engrailed* selects posterior compartment identity.
- Hox genes are clustered homeodomain selector genes specifying segment identity. They show spatial (and in vertebrates temporal) colinearity and posterior prevalence; Polycomb and Trithorax proteins maintain their expression.
- Mammals have 39 Hox genes in four clusters and 13 paralogue groups; knockouts of paralogue groups transform vertebral identity (e.g. no lumbar vertebrae without Hox10 genes).
- Somites form from the presomitic mesoderm by a clock and wavefront: somite length $S = vT$, number $N = t_\mathrm{seg}/T$. The clock (period about 30 min in zebrafish, 90 min in chick, 2 h in mouse, about 5 h in human cells in culture) relies on delayed negative autoregulation of Hes/Her genes, with period roughly twice the delay. The front is set by FGF/Wnt and retinoic-acid gradients.
:::

## Exercises

::: exercise Gene classes {level=1}
Assign each gene to its class in the segmentation hierarchy and give its typical expression pattern in the blastoderm embryo: *Krüppel*, *fushi tarazu*, *engrailed*, *bicoid*, *Abdominal-B*.
::: solution
*Krüppel*: gap gene, one broad central domain. *fushi tarazu*: pair-rule, seven stripes. *engrailed*: segment polarity, fourteen narrow stripes (anterior of each parasegment). *bicoid*: maternal coordinate gene, anterior gradient. *Abdominal-B*: Hox gene of the bithorax complex, posterior abdomen.
:::
:::

::: exercise Somite size {level=1 check="60"}
In zebrafish the segmentation clock period is about 30 min. If the determination front moves at 2 µm min⁻¹ relative to the cells, how long is each somite, in µm?
::: solution
$S = vT = 2\times30 = 60$ µm.
:::
:::

::: exercise Counting Hox genes {level=1 check="13"}
If an ancestral vertebrate Hox cluster had 13 genes and it was duplicated twice to give four clusters, how many genes have been lost from the four mammalian clusters, which together contain 39 Hox genes?
::: solution
$4\times13 - 39 = 52 - 39 = 13$ genes lost.
:::
:::

::: exercise Delay and period {level=2 check="40"}
In a delayed autorepression model, the time to transcribe, splice and export an mRNA is 15 min and the time to translate the protein and return it to the nucleus is 5 min. Using the approximation $T \approx 2(T_\mathrm{m} + T_\mathrm{p})$, estimate the period in minutes.
::: solution
$T \approx 2(15 + 5) = 40$ min. In real oscillators the decay rates of mRNA and protein also matter, and a slow decay would make the period longer than this estimate.
:::
:::

::: exercise Stripe enhancers in mutants {level=2}
A reporter gene is driven by the *eve* stripe 2 enhancer. Predict its expression pattern in embryos (a) lacking *Krüppel*; (b) lacking *giant*; (c) from mothers lacking *bicoid*; (d) in which a binding site for Krüppel in the enhancer has been mutated.
::: solution
(a) The stripe expands posteriorly, because its posterior border is set by Krüppel repression. (b) The stripe expands anteriorly, because Giant sets the anterior border. (c) Little or no expression, because Bicoid (and the Hunchback it activates) are the activators. (d) Similar to (a), a posterior expansion, though possibly weaker than in the full mutant if other Krüppel sites remain — the experiment shows that the repression acts directly through the enhancer.
:::
:::

::: exercise Snakes and somites {level=2 check="4.85"}
A corn snake forms about 315 somites, a mouse about 65. If somitogenesis in both lasted the same time relative to their overall rate of development, by what factor must the snake's clock tick faster, relative to that rate, than the mouse's (three significant figures)?
::: solution
$N = t_\mathrm{seg}/T$, so for equal $t_\mathrm{seg}$, $T_\mathrm{mouse}/T_\mathrm{snake} = 315/65 = 4.85$. Céline Gomez, Pourquié and colleagues (2008) found that the snake clock indeed runs about four times faster than the mouse's relative to the developmental rate, producing many small somites.
:::
:::

::: exercise A homeotic puzzle {level=3}
A fly larva lacks the whole bithorax complex (*Ubx*, *abd-A* and *Abd-B*). (a) What will its segments from T3 backwards look like, and why? (b) A second larva lacks *Polycomb* function. Its Hox genes are initiated correctly, but later all segments express *Abd-B* and the other bithorax genes. What will it look like? (c) Why does this second phenotype show that the initial regulators of Hox genes and their maintenance are separable?
::: solution
(a) All segments from T3 to the end of the abdomen develop like T2 (under *Antennapedia*), because without the bithorax genes there is no input to specify more posterior identities; Lewis described such larvae, with a repeated series of mesothoracic-like segments.

(b) By posterior prevalence, the most posterior gene expressed, *Abd-B*, dominates: most segments are transformed towards the identity of the posterior abdomen (approximately A8).

(c) In *Polycomb* mutants the early pattern, set by gap and pair-rule proteins, is normal; the defect appears only later, when these regulators have decayed and Hox genes that should stay silent become derepressed. So establishment and maintenance use different mechanisms — the transient segmentation cascade sets the pattern, and Polycomb-group chromatin silencing remembers it.
:::
:::

::: exercise Interpreting an FGF bead experiment {level=3}
An FGF8-soaked bead is implanted next to the anterior PSM of a chick embryo. Over the next 6 h, the somites formed adjacent to the bead on that side are about half the length of those on the control side; later somites are normal, and the total number of somites is unchanged. (a) Explain the result with the clock-and-wavefront model. (b) How many somites formed beside the bead in the 6 h, and how many on the control side? (c) Why do you think the total number of somites is unchanged?
::: solution
(a) FGF keeps PSM cells immature. Near the bead the determination front is held back and then, as the bead's effect wears off or the cells move away from it, the front catches up quickly: for a while it moves past more cells per clock cycle in some places and fewer in others. Where the front advances by only half the usual distance per cycle, $v$ is halved, so $S = vT$ is halved.

(b) The clock is unaffected, so somites still form every 90 min: 6 h/1.5 h = 4 somites on each side in the same time; those near the bead are shorter. (In real experiments the bead produces small somites on the treated side and, later, compensatory larger ones.)

(c) The number of somites is set by the number of clock cycles during somitogenesis, $N = t_\mathrm{seg}/T$, not by the distance the front moves. Altering the front changes somite size locally but not the count, provided the clock and the total duration are unchanged.
:::
:::
