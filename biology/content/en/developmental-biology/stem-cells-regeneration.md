Development does not stop at birth. The lining of your small intestine is replaced every few days; you make roughly two hundred billion red blood cells a day; your skin, hair and the sperm of a man are produced continuously throughout adult life. All of this depends on **stem cells**, which keep the embryo's capacity for making new cells alive in the adult. Some animals go much further. A planarian flatworm cut into small pieces regrows a complete animal from each one; a salamander replaces an amputated leg, perfectly, with all its bones, muscles and nerves; a zebrafish rebuilds part of its heart. Humans can do none of these things, but we can regenerate a liver, the tip of a finger in a young child, and the lining of most of our epithelia.

This chapter asks how stem cells are maintained and controlled, how regeneration reuses — or fails to reuse — the mechanisms of embryonic development, and what goes wrong with all of this as organisms age. It builds on the ideas of potency and commitment from [[developmental-biology/principles-of-development]] and the signalling pathways of [[developmental-biology/organogenesis]]. Topics that touch on human medicine — stem-cell therapies, transplantation, human embryos — are treated here only at the level of mechanism; their clinical side belongs to the Medicine Atlas ([Medicine Atlas](/learn/medicine/)).

## What is a stem cell?

::: definition Stem cell {#def-stem-cell}
A **stem cell** is a cell that can both **self-renew** — produce daughter cells that remain stem cells — and **differentiate** — produce daughter cells that become one or more specialised cell types. Stem cells are classified by their potency ([[developmental-biology/principles-of-development#def-potency]]): **pluripotent** stem cells, such as embryonic stem cells, can form every cell type of the body; **adult** (tissue) stem cells are usually multipotent or unipotent, making the cell types of one tissue.
:::

A stem cell can balance self-renewal and differentiation in two ways. In **asymmetric division**, each division produces one stem cell and one differentiating daughter, so the number of stem cells stays constant automatically; this requires mechanisms to segregate fate determinants or to orient the spindle relative to a source of signals. In **population asymmetry**, individual divisions may produce two stem cells or two differentiating cells, at random, and the balance is maintained only on average across the population. Many mammalian tissues turn out to work the second way.

Between stem cells and differentiated cells there is often a layer of **transit-amplifying** cells, which divide rapidly a limited number of times. They multiply the output of each stem-cell division, so the stem cells themselves can divide rarely, which protects them from accumulating mutations.

::: example The leverage of transit amplification {#ex-transit}
A crypt must supply about 250 new epithelial cells per day (an illustrative figure) and contains 15 stem cells. Each time a stem cell produces a differentiating daughter, that daughter undergoes $k$ rounds of transit-amplifying division, all its progeny dividing each time. (a) How many differentiated cells does one such daughter produce for $k = 4$ and $k = 6$? (b) How many differentiating daughters must the stem cells produce per day in each case, and how often must each stem cell do so? (c) Why might a long transit-amplifying phase protect the tissue?
::: solution
(a) $2^4 = 16$ and $2^6 = 64$ cells.

(b) For $k = 4$: $250/16 \approx 16$ differentiating daughters per day, about one per stem cell per day. For $k = 6$: $250/64 \approx 4$ per day, so each stem cell need produce one only about every 4 days.

(c) The fewer times stem cells divide, the fewer replication errors they accumulate, and stem cells are the only cells that persist long enough to accumulate the several mutations needed for cancer; mutations arising in transit-amplifying cells are shed with their descendants within days. (In the mouse small intestine, Lgr5⁺ stem cells in fact divide roughly once a day, and the crypt relies on neutral competition, described below, to purge mutant stem cells.)
:::
:::

### Niches

Ray Schofield proposed in 1978, for blood-forming stem cells, that stem cells are maintained by a specialised microenvironment, the **niche**, and that a cell displaced from it loses its stem-cell character. The concept was first demonstrated cell by cell in the *Drosophila* ovary.

At the tip of each ovariole, two or three **germline stem cells** sit attached by adhesion junctions to a small group of somatic **cap cells**. The cap cells secrete Dpp (a BMP), which acts only over a single cell diameter, repressing in the stem cells the gene *bag of marbles* (*bam*), which drives differentiation. When a germline stem cell divides, its spindle is oriented perpendicular to the cap cells, so one daughter stays attached and remains a stem cell, while the other is pushed one cell away, escapes the Dpp signal, expresses *bam* and becomes a cystoblast, which divides four times to make the oocyte and its 15 nurse cells ([[developmental-biology/axis-formation]]). Ting Xie and Allan Spradling showed in 1998 and 2000 that Dpp signalling is needed for stem-cell maintenance and that, when a stem cell is lost, an empty niche can be refilled by a dividing neighbour — the niche, not the cell's history, confers stem-cell identity.

::: definition Stem-cell niche {#def-niche}
A **niche** is the local microenvironment that maintains stem cells in an undifferentiated, self-renewing state, through signals from niche cells (often short-range BMP, Wnt, Notch, Hedgehog or FGF signals), adhesion and the extracellular matrix. Cells that leave the niche, by division or displacement, begin to differentiate.
:::

## Adult stem cells in mammals

### Blood

The first adult stem cells to be characterised quantitatively were those of the blood. James Till and Ernest McCulloch injected bone-marrow cells into mice whose own marrow had been destroyed by irradiation, and in 1961 found nodules in the spleen ten days later, each a colony of blood cells; the number of colonies was proportional to the number of marrow cells injected, and in 1963, with Andy Becker, they showed using chromosomal markers that each colony was a clone derived from a single cell. Some colonies contained several lineages of blood cells, and some could found new colonies when transplanted again: the defining properties of multipotency and self-renewal. **Haematopoietic stem cells**, which reside in niches in the bone marrow, are the basis of bone-marrow transplantation, the oldest established stem-cell therapy.

### The intestinal crypt

The epithelium of the small intestine consists of finger-like villi, which absorb nutrients, and pits between them, the **crypts**, in which new cells are made. Cells move up from the crypts onto the villi and are shed at the tips within about 3–5 days in the mouse. In 2007 Nick Barker, Hans Clevers and colleagues identified the stem cells by permanently labelling the descendants of cells expressing the Wnt target gene *Lgr5*. About 14–16 slender **Lgr5⁺ crypt base columnar cells** lie at the bottom of each crypt, interspersed with **Paneth cells**, which secrete antimicrobial proteins and also act as the niche, supplying Wnt3, EGF and the Notch ligand Delta-like 4. Labelled Lgr5⁺ cells gave rise to all the cell types of the epithelium for over a year. In 2009 Toshiro Sato and Clevers showed that a single Lgr5⁺ cell, embedded in a gel with Wnt-pathway agonists (R-spondin), EGF and the BMP antagonist Noggin — signals that mimic the niche — forms a self-organising **organoid** with crypt- and villus-like domains.

In 2010, the groups of Clevers (Hugo Snippert and colleagues) and of Douglas Winton and Benjamin Simons (Carlos Lopez-Garcia and colleagues) followed the fate of individual labelled stem cells over time. They found that labelled clones expanded or shrank at random, as stem cells in the niche replaced each other by neutral competition; over weeks to months, each crypt became **monoclonal**, all its cells descending from a single stem cell. The dynamics fitted a simple model of neutral drift.

::: proposition Neutral drift of stem-cell clones {#prop-neutral-drift}
Suppose a niche holds a constant number $N$ of equivalent stem cells, and that whenever a stem cell is lost (by differentiation) it is replaced by the division of a randomly chosen neighbour, with no clone having an advantage. Then the number of stem cells $k$ belonging to a given clone performs a random walk with absorbing states $0$ (the clone is lost) and $N$ (the clone takes over the niche, which becomes monoclonal). The probability that a clone of initial size $k_0$ eventually takes over is

$$
P_\mathrm{fix} = \frac{k_0}{N}.
$$ {#eq-fixation}

In particular a single labelled stem cell takes over its niche with probability $1/N$. Assumptions: constant $N$, neutral (equally fit) cells, and replacements independent of past history. This is the Moran model of population genetics ([[population-genetics/genetic-drift]]).
:::

::: proof
Because the walk is unbiased, the expected value of $k$ does not change at any step: each replacement increases $k$ by one or decreases it by one with equal probability, or leaves it unchanged. So $\E[k_t] = k_0$ for all $t$. The walk is eventually absorbed at $0$ or $N$; if $P_\mathrm{fix}$ is the probability of absorption at $N$, then in the limit $\E[k_\infty] = N P_\mathrm{fix} + 0\cdot(1 - P_\mathrm{fix}) = k_0$, giving $P_\mathrm{fix} = k_0/N$.
:::

::: widget markov
matrix: 1,0,0,0,0; 0.1875,0.625,0.1875,0,0; 0,0.25,0.5,0.25,0; 0,0,0.1875,0.625,0.1875; 0,0,0,0,1
states: 0 lost; 1 cell; 2 cells; 3 cells; 4 fixed
start: 1
steps: 40
caption: Neutral drift of a labelled clone in a niche of $N = 4$ stem cells. Each step is one round of replacement; from a clone of $k$ cells, the clone grows or shrinks by one with equal probabilities $k(4-k)/16$ (otherwise nothing changes for this clone). Starting from a single labelled cell, run the walk several times: most clones are lost, and occasionally one takes over the whole niche. The distribution after many steps approaches 3/4 at "0 lost" and 1/4 at "4 fixed", as [[#eq-fixation]] predicts.
:::

::: example Monoclonal crypts {#ex-crypts}
A mouse intestine is treated so that, in each crypt, exactly one of its 16 Lgr5⁺ stem cells is labelled. (a) What fraction of crypts should eventually be entirely labelled? (b) Suppose instead that each stem cell is labelled independently with probability 0.05. What fraction of crypts should eventually be fully labelled? (c) Why does a mutation that gives a stem cell even a small competitive advantage matter for cancer?
::: solution
(a) By [[#eq-fixation]], each labelled cell takes over its crypt with probability $1/16 = 0.0625$, so about 6 % of crypts become fully labelled and the rest lose the label.

(b) Each stem cell's descendants take over with probability $1/16$, independent of label, so the probability that the eventual monoclonal crypt is labelled equals the initial fraction of labelled cells: on average $0.05$, i.e. 5 % of crypts. The clone sizes in the meantime change, but the long-run fraction of labelled crypts equals the initial labelling fraction.

(c) A mutant stem cell with an advantage takes over its niche with probability greater than $1/N$ — for a small advantage $s$, approximately $(1 - e^{-s})/(1 - e^{-Ns})$, as in population genetics. Mutations that enhance Wnt signalling, such as loss of the tumour suppressor *Apc*, give such an advantage; once a mutant clone fixes in a crypt, it can spread by crypt fission and acquire further mutations. Neutral drift also means that most new mutations in stem cells are lost by chance, a protective feature of small niches.
:::
:::

### Other tissues

Stem cells with niches maintain the epidermis and hair follicles (the follicle bulge), the testis (spermatogonial stem cells), skeletal muscle (**satellite cells**, quiescent beneath the basal lamina of muscle fibres, activated by injury) and parts of the brain. Some tissues, such as the liver and the pancreas, renew themselves mainly by division of differentiated cells rather than from a dedicated stem-cell population. And some cells — heart muscle cells and most neurons in adult mammals — are hardly replaced at all.

## Pluripotent stem cells

In 1981 Martin Evans and Matthew Kaufman, and independently Gail Martin, derived **embryonic stem (ES) cells** from the inner cell mass of mouse blastocysts ([[developmental-biology/early-embryos]]). They can be grown indefinitely in culture while remaining pluripotent, and when injected into a host blastocyst they contribute to all tissues of the resulting chimaera, including the germ line. This made it possible to engineer mouse genes in culture and pass the changes to whole animals — the basis of gene-targeting technology, recognised by the 2007 Nobel Prize in Physiology or Medicine for Mario Capecchi, Martin Evans and Oliver Smithies. James Thomson's group derived human ES cells in 1998. Research using human embryos and human ES cells is regulated by law in most countries, and the rules differ between them.

Pluripotency is maintained by a core network of transcription factors — Oct4, Sox2 and Nanog — that activate their own and each other's genes and repress genes of differentiation: a self-sustaining state of the kind described in [[developmental-biology/principles-of-development]]. In 2006 Kazutoshi Takahashi and Shinya Yamanaka asked whether introducing such factors could impose pluripotency on a differentiated cell. Starting from 24 candidate genes and narrowing them down, they found that four transcription factors — Oct3/4, Sox2, Klf4 and c-Myc — expressed in mouse fibroblasts, were enough to produce **induced pluripotent stem (iPS) cells**, which resembled ES cells and could contribute to chimaeras. Human iPS cells followed in 2007, from Yamanaka's group and from Thomson's (using a different combination). Gurdon and Yamanaka shared the 2012 Nobel Prize in Physiology or Medicine "for the discovery that mature cells can be reprogrammed to become pluripotent". Reprogramming is inefficient — in the original experiments only a small fraction of a per cent of cells became iPS cells — and slow, taking weeks, because the chromatin of the differentiated cell must be remodelled.

::: application Stem cells in research and medicine
iPS cells derived from people with genetic diseases can be differentiated into the affected cell types — neurons, heart muscle, liver cells — to study disease mechanisms and test drugs in human cells. Organoids grown from adult or pluripotent stem cells reproduce aspects of the intestine, kidney, retina, brain and other organs in a dish. Cell therapies derived from pluripotent stem cells, such as retinal pigment epithelium and dopamine-producing neurons, have entered early-phase clinical trials (as of 2026); their safety and efficacy are still being evaluated, and unproven "stem-cell treatments" sold directly to patients are a recognised public-health problem. The International Society for Stem Cell Research publishes guidelines for this research and its clinical translation. Clinical questions belong to the Medicine Atlas ([Medicine Atlas](/learn/medicine/)).
:::

## Regeneration

::: definition Modes of regeneration {#def-regeneration}
- **Epimorphosis**: regeneration by the formation of a **blastema**, a mass of proliferating, relatively undifferentiated cells at the wound, which then grows and repatterns the lost structure (salamander limbs, fish fins, planarian heads).
- **Morphallaxis**: regeneration by repatterning of existing tissue, with little new growth, so the regenerated animal is initially smaller (*Hydra*).
- **Compensatory regeneration**: the differentiated cells of an organ divide while keeping their function, restoring its mass but not necessarily its shape (the mammalian liver).
:::

### Planarians

Freshwater planarians such as *Schmidtea mediterranea* are the champions of regeneration. Thomas Hunt Morgan reported in 1898 that a fragment of a planarian as small as 1/279 of the animal could regenerate a complete worm. Regeneration relies on **neoblasts**, small dividing cells scattered through the body, which are the only dividing cells in the adult and make up a substantial fraction of its cells; irradiation kills them and abolishes regeneration. Daniel Wagner, Irving Wang and Peter Reddien showed in 2011 that a single transplanted neoblast of a particular class (a **clonogenic neoblast**) could restore the whole population of cell types in an irradiated host, and with it the ability to regenerate: some adult neoblasts are pluripotent.

How does a fragment know whether to make a head or a tail at each cut surface? Positional information is maintained in the adult body by gradients of signalling activity in the muscle cells, above all **Wnt/β-catenin** signalling, high posteriorly. When the gene for β-catenin is knocked down by RNA interference, fragments regenerate heads at both anterior and posterior wounds, forming two-headed worms; when its inhibitor APC is knocked down, they make tails at both ends (Kyle Gurley, Jochen Rink and Alejandro Sánchez Alvarado; Christian Petersen and Reddien; both in 2008). The same pathway that sets up the anterior–posterior axis of vertebrate embryos ([[developmental-biology/axis-formation]]) thus sets the polarity of regeneration in a flatworm.

::: example How small a fragment? {#ex-planarian}
A planarian 10 mm long contains about $5\times10^5$ cells (an illustrative value of the right order for a worm of this size), and neoblasts make up about 25 % of them. Morgan's smallest regenerating fragment was 1/279 of the animal. (a) How many cells, and how many neoblasts, would such a fragment contain? (b) If a regenerated worm grows to the original size by feeding, how many doublings of cell number are needed? (c) What does the success of a single transplanted neoblast imply about the minimum requirement for regeneration?
::: solution
(a) $5\times10^5/279 \approx 1800$ cells, of which about 450 are neoblasts.

(b) To go from about 1800 to $5\times10^5$ cells requires $\log_2(279) = 8.1$ doublings.

(c) It implies that one pluripotent neoblast can, given a host body supplying positional information and nutrients, produce every cell type. The fragment of (a) contains hundreds of neoblasts and its own muscle cells carrying positional signals, so it has more than the minimum; regeneration fails in very small fragments mainly because they lack enough tissue to reorganise and to survive while new tissue forms.
:::
:::

### Salamander limbs

When an axolotl or newt limb is amputated, epidermis covers the wound within hours to form a **wound epidermis**, which thickens into an apical epithelial cap, functionally similar to the AER of the embryonic limb ([[developmental-biology/organogenesis]]). Cells beneath it — from dermis, muscle, cartilage and connective tissue — lose their differentiated character and proliferate, forming the **blastema**, which grows and redifferentiates into the missing parts. Marcus Singer showed in the 1940s and 1950s that regeneration requires an adequate nerve supply: denervated limbs do not regenerate.

The blastema is not a bag of pluripotent cells. Martin Kragl, Elly Tanaka and colleagues labelled individual tissues of the axolotl limb genetically in 2009 and found that each kept its lineage: muscle came from muscle, epidermis from epidermis, and cartilage from connective-tissue cells, which are the main carriers of positional information. The blastema also "remembers" where it came from. It regenerates only the structures distal to the cut (the **rule of distal transformation**): a cut at the wrist makes a hand; a cut at the shoulder, a whole arm. Retinoic acid can reset this memory: Malcolm Maden showed in 1982 that blastemas from wrist amputations treated with high doses of retinoic acid regenerate a whole limb from the shoulder onwards, serially duplicated — the proximal–distal identity is encoded in molecules that retinoic acid alters, including the transcription factor Meis and a cell-surface protein, Prod1.

Among vertebrates, zebrafish regenerate fins, retina, spinal cord and heart. Kenneth Poss, Lindsay Wilson and Mark Keating showed in 2002 that zebrafish remove about a fifth of the ventricle and regrow it within about two months, mainly by division of existing heart-muscle cells. Mammals have far more limited abilities: the mouse and human digit tip can regrow if the amputation passes through the nail bed, and the liver restores its mass after partial removal — a rat liver regains its mass within about one to two weeks of removal of two-thirds of it (Higgins and Anderson, 1931) — by compensatory division of hepatocytes. Why mammals lost much regenerative capacity is unresolved; proposed explanations include fibrotic scarring that favours rapid wound closure, a strong inflammatory response, and the stable exit of mammalian heart and nerve cells from the cell cycle.

::: quiz
An axolotl limb is amputated through the upper arm, and the blastema is labelled so that cells derived from muscle fluoresce red. Where will red cells be found in the regenerated limb?
- [ ] Throughout all tissues, because blastema cells are pluripotent
- [x] Only in muscle, in the regenerated upper arm, forearm and hand
- [ ] Only in the upper arm, because cells keep their proximodistal identity
- [ ] Nowhere, because muscle is rebuilt by circulating stem cells
::: solution
Lineage tracing shows that blastema cells keep their tissue identity: muscle-derived cells form muscle (in the axolotl, mainly from satellite-like cells), not cartilage or skin. Proximodistal identity, in contrast, is reset in some cells — connective-tissue cells from the upper-arm stump form all the more distal structures — so red cells will be found in muscle along the whole regenerate.
:::
:::

## Ageing

The ability to maintain tissues declines with age, and eventually the organism dies of the accumulating failures. **Ageing** (or **senescence**) is the progressive decline of physiological function with age, accompanied by an increase in the rate of mortality. It is not inevitable for all organisms: some, such as *Hydra*, show no detectable increase in mortality with age in the laboratory (Daniel Martínez, 1998).

### Measuring ageing: the Gompertz law

In 1825 the actuary Benjamin Gompertz noticed that, over most of adult life, human death rates rise exponentially with age. This is an empirical regularity, not a law derived from theory, but it holds remarkably well for humans and many laboratory animals between maturity and very old age.

::: proposition The Gompertz model of mortality (an empirical description) {#prop-gompertz}
If the **mortality rate** (hazard) at age $x$ is

$$
\mu(x) = A\,e^{Gx},
$$ {#eq-gompertz}

with initial mortality $A$ and **Gompertz parameter** $G$, then the mortality rate doubles every $\mathrm{MRDT} = \ln 2/G$ years (the **mortality-rate doubling time**), and the probability of surviving from birth to age $x$ is

$$
S(x) = \exp\left[-\frac{A}{G}\left(e^{Gx} - 1\right)\right].
$$ {#eq-gompertz-survival}

Assumptions: the exponential form applies over the ages considered; deaths from causes independent of age (accidents, infections) are ignored, although they can be added as a constant term (the Gompertz–Makeham model).
:::

::: proof
The survival function satisfies $dS/dx = -\mu(x)S$, so $S(x) = \exp\left(-\int_0^x \mu(u)\,du\right)$. With $\mu(u) = Ae^{Gu}$, $\int_0^x Ae^{Gu}\,du = (A/G)(e^{Gx} - 1)$. The doubling time follows from $e^{G\cdot\mathrm{MRDT}} = 2$.
:::

For humans in high-income countries, $G$ is about 0.085 per year, giving a mortality-rate doubling time of about 8 years: your chance of dying in the coming year roughly doubles with every 8 years of adult age. Laboratory mice have an MRDT of a few months, *Drosophila* about 10 days. Changes in life expectancy between populations and over history have come mainly through changes in $A$ (the overall level of mortality) rather than in $G$. At very old ages, beyond about 100 in humans, mortality may level off, though the data are sparse and the existence of a plateau is debated.

::: widget plot
f: exp(-(a*0.00001/G)*(exp(G*x) - 1))
x: 0, 110
y: 0, 1.05
sliders: a=5:1:20:0.5; G=0.085:0.05:0.12:0.001
labels: S(x)
hlines: 0.5
caption: Survival from birth to age $x$ (years) under the Gompertz model [[#eq-gompertz-survival]], with initial mortality $A = a\times10^{-5}$ per year and Gompertz parameter $G$ (sliders). With the defaults ($A = 5\times10^{-5}$, $G = 0.085$, illustrative values close to those of modern human populations) the curve is nearly flat until about 50, then falls steeply, crossing 0.5 (the median lifespan) at about 83 years. Quadruple $a$: the curve shifts left by only about $\ln4/G \approx 16$ years. Raise $G$: the fall becomes steeper and earlier — faster ageing.
:::

::: example Mortality-rate doubling {#ex-gompertz}
Using the Gompertz model with $A = 5\times10^{-5}$ yr⁻¹ and $G = 0.085$ yr⁻¹: (a) what is the mortality-rate doubling time? (b) what is the annual mortality rate at ages 30 and 80? (c) what is the probability of surviving from birth to 80, and of surviving from 80 to 90?
::: solution
(a) $\ln2/0.085 = 8.2$ years.

(b) $\mu(30) = 5\times10^{-5}e^{2.55} = 6.4\times10^{-4}$ per year (about 1 in 1600); $\mu(80) = 5\times10^{-5}e^{6.8} = 0.045$ per year (about 1 in 22), seventy times higher.

(c) $S(80) = \exp[-(5\times10^{-5}/0.085)(e^{6.8} - 1)] = \exp(-0.000588\times897) = \exp(-0.528) = 0.59$. $S(90) = \exp[-0.000588\times(e^{7.65} - 1)] = \exp(-0.000588\times2100) = 0.29$. The probability of surviving from 80 to 90 is $S(90)/S(80) = 0.29/0.59 = 0.49$. (These illustrative parameters ignore age-independent mortality and are not a life table for any real population.)
:::
:::

### Mechanisms of ageing

What fails? A widely cited review by Carlos López-Otín and colleagues (2013, extended in 2023) grouped the cellular and molecular changes of ageing into "hallmarks", including genomic instability, telomere attrition, epigenetic alterations, loss of protein homeostasis, deregulated nutrient sensing, mitochondrial dysfunction, cellular senescence, **stem-cell exhaustion** and altered intercellular communication. Several connect directly to this chapter.

- **Telomeres and replicative senescence.** Leonard Hayflick and Paul Moorhead found in 1961 that normal human fibroblasts divide a limited number of times in culture (about 40–60) before arresting — the **Hayflick limit**. The arrest is triggered largely by the shortening of telomeres at each round of replication, which telomerase can prevent ([[molecular-biology/dna-replication]]). Stem cells of many tissues express some telomerase, but not enough to prevent all shortening.
- **Cellular senescence.** Cells that suffer damage or telomere shortening can enter a permanent arrest, **senescence**, mediated by p53–p21 and p16, in which they secrete inflammatory signals (the senescence-associated secretory phenotype). Senescent cells accumulate with age. Darren Baker, Jan van Deursen and colleagues showed in 2011 and 2016 that eliminating cells expressing p16 in mice delayed several age-related pathologies and, in normal mice, extended median lifespan.
- **Stem-cell exhaustion.** Aged haematopoietic stem cells are more numerous in old mice but function worse, biased towards myeloid lineages; aged muscle satellite cells respond poorly to injury. Clonal expansion of mutant blood stem cells — **clonal haematopoiesis**, an example of the competition of [[#ex-crypts]] — becomes common in older people.
- **Nutrient-sensing pathways.** Cynthia Kenyon and colleagues reported in 1993 that *C. elegans* with mutations in *daf-2*, which encodes the worm's insulin/IGF-1 receptor, live about twice as long as wild type, and that this requires the transcription factor DAF-16 (a FOXO protein). Reduced insulin/IGF-1 and TOR signalling extends lifespan in yeast, worms, flies and mice, as does dietary restriction, first shown in rats by Clive McCay in 1935.

### Why do we age?

Evolutionary theory explains why ageing exists at all. Because organisms die of external causes — predators, disease, accidents — the number of individuals alive and reproducing falls with age, and so does the **force of natural selection** on genes acting late in life. Peter Medawar (1952) argued that harmful mutations acting only late in life accumulate because selection cannot remove them (**mutation accumulation**). George Williams (1957) added that genes with good effects early and bad effects late will be favoured (**antagonistic pleiotropy**). Thomas Kirkwood's **disposable soma** theory (1977) frames this as a trade-off: resources spent on repairing the body are not available for reproduction, so it pays to invest only enough in maintenance to keep the body working for as long as it is likely to survive in the wild. These theories predict, correctly, that species with low extrinsic mortality — bats, birds, tortoises, naked mole-rats — tend to evolve slower ageing ([[evolution/natural-selection]]).

::: warning "Ageing is programmed, like development"
Development is a genetically programmed sequence; ageing is not, in the same sense. There is no evidence for genes selected *in order to* make animals age and die. Ageing results from the accumulation of damage that selection, weakening with age, has not prevented — and from trade-offs with early-life fitness. Genes such as *daf-2* affect lifespan because they regulate how resources are allocated between growth, reproduction and maintenance, not because they are timers of death. This is why the same pathways that control growth in development — insulin/IGF and TOR — reappear in the biology of ageing.
:::

::: history
Abraham Trembley's experiments of 1744 with *Hydra*, which he cut into pieces that each regenerated, began experimental regeneration biology; Lazzaro Spallanzani described limb and tail regeneration in salamanders in 1768. Morgan studied planarian regeneration in the 1890s and wrote *Regeneration* (1901). Till and McCulloch demonstrated blood-forming stem cells in 1961–63; Schofield proposed the niche in 1978; ES cells were derived in 1981 (mouse) and 1998 (human); iPS cells were made in 2006. Gompertz described the exponential rise of mortality in 1825, and the first long-lived worm mutant, *age-1*, was described by Thomas Johnson in 1988, before Kenyon's *daf-2* work of 1993 established the conserved insulin/IGF pathway of ageing.
:::

::: summary
- Stem cells self-renew and differentiate; balance can come from asymmetric divisions or from population asymmetry. Transit-amplifying cells multiply their output.
- Niches maintain stem cells by short-range signals; in the *Drosophila* ovary, cap-cell Dpp represses *bam* in adjacent germline stem cells, and displaced daughters differentiate.
- Haematopoietic stem cells were shown by Till and McCulloch's spleen-colony assay. Intestinal Lgr5⁺ stem cells (14–16 per crypt) are maintained by Paneth-cell signals, form organoids, and compete neutrally: a clone of $k_0$ cells takes over a niche of $N$ with probability $k_0/N$.
- Pluripotent ES cells come from the inner cell mass; iPS cells are made by expressing Oct4, Sox2, Klf4 and c-Myc in differentiated cells. Both are maintained by a self-reinforcing Oct4–Sox2–Nanog network.
- Regeneration occurs by epimorphosis (blastema), morphallaxis or compensatory growth. Planarian neoblasts include pluripotent cells; Wnt/β-catenin sets head–tail polarity. Salamander blastema cells keep their lineage but obey positional memory (distal transformation), which retinoic acid can proximalise.
- Mortality rises exponentially with adult age (Gompertz, $\mu = Ae^{Gx}$; human MRDT ≈ 8 years). Hallmarks of ageing include telomere attrition, cellular senescence, stem-cell exhaustion and altered nutrient sensing (*daf-2*, TOR, dietary restriction).
- Ageing evolves because the force of selection declines with age: mutation accumulation, antagonistic pleiotropy and the disposable soma.
:::

## Exercises

::: exercise Fixation in a niche {level=1 check="0.125"}
A niche contains 8 equivalent stem cells competing neutrally. What is the probability that the descendants of one particular stem cell eventually occupy the whole niche?
::: solution
$1/8 = 0.125$ by [[#eq-fixation]].
:::
:::

::: exercise Mortality-rate doubling time {level=1 check="0.693"}
A laboratory mouse population has a Gompertz parameter $G = 1.0$ per year. What is its mortality-rate doubling time in years (three significant figures)?
::: solution
$\ln2/1.0 = 0.693$ years, about 8 months.
:::
:::

::: exercise Modes of regeneration {level=1}
Classify each as epimorphosis, morphallaxis or compensatory regeneration: (a) a *Hydra* cut in half forms two smaller *Hydra* without much cell division; (b) a newt regrows a leg from a blastema; (c) a rat liver regains its mass after two-thirds is removed, but the removed lobes do not reform.
::: solution
(a) Morphallaxis. (b) Epimorphosis. (c) Compensatory regeneration.
:::
:::

::: exercise Hayflick doublings {level=2 check="1.13e15"}
A single fibroblast divides 50 times, all of its descendants dividing each time and none dying. How many cells would result? Give your answer in scientific notation to three significant figures.
::: solution
$2^{50} = 1.13\times10^{15}$ — more cells than in several dozen human bodies. A limit of 50 divisions is therefore no obstacle to building and maintaining a body, but it is a barrier to the unlimited proliferation of a single clone, as in cancer.
:::
:::

::: exercise Survival under Gompertz {level=2 check="0.49"}
With $A = 5\times10^{-5}$ yr⁻¹ and $G = 0.085$ yr⁻¹, the Gompertz survival to age 80 is 0.59 and to 90 is 0.29. What is the probability that a person alive at 80 survives to 90 (two decimal places)?
::: solution
$S(90)/S(80) = 0.29/0.59 = 0.49$.
:::
:::

::: exercise Interpreting planarian RNAi {level=2}
Planarian fragments are cut from the middle of the body, so each has an anterior and a posterior wound. Predict the regenerated animals in each case, and explain: (a) control; (b) *β-catenin* RNAi; (c) *APC* RNAi; (d) irradiated fragments.
::: solution
(a) A head at the anterior wound and a tail at the posterior wound. (b) Heads at both wounds: without β-catenin, posterior wounds cannot activate Wnt signalling and default to head identity. (c) Tails at both wounds: without APC, β-catenin is stabilised at both wounds, giving posterior identity. (d) No regeneration: irradiation kills neoblasts, the only dividing cells; the wounds heal but no new tissue forms, and the fragments eventually die.
:::
:::

::: exercise Clonal dynamics data {level=3}
In a lineage-tracing experiment (hypothetical data), stem cells in intestinal crypts are labelled at low density. At successive times the percentage of crypts containing any labelled cells is 10 % (day 2), 7 % (2 weeks), 4 % (1 month) and 3 % (3 months), while the percentage of crypts that are *entirely* labelled rises from 0 % to about 0.6 % (1 month) and 0.7 % (3 months). (a) Explain why the fraction of crypts containing label falls while the fraction of fully labelled crypts rises. (b) If, at day 2, each labelled crypt contained exactly one labelled stem cell, estimate the number of stem cells per crypt from the long-term data. (c) What would you expect to see if labelled cells carried a mutation giving them an advantage?
::: solution
(a) Under neutral drift, most labelled clones are lost by chance (absorbed at 0), so the number of crypts containing label falls; the surviving clones expand, and some take over their crypt (absorbed at $N$), so the fraction of fully labelled crypts rises. Eventually every surviving labelled clone fills its crypt and the two fractions converge.

(b) The fraction of initially labelled crypts that become fully labelled is $1/N$. At 3 months, $0.7\,\%/10\,\% = 0.07$, and the process is nearly complete (3 % still contain label, of which 0.7 % are full), so the long-term value lies between 0.07 and 0.3. Taking the limit as about 0.07–0.1 gives $N \approx 10$–14, consistent with the measured 14–16 stem cells (some labelled clones were still drifting at 3 months, and not all crypts may have started with exactly one labelled stem cell).

(c) A higher fraction of labelled clones would survive and fix (more than $1/N$), and they would do so faster; the fraction of crypts containing label would fall less. Such biased drift has been measured for cells carrying *Kras* or *Apc* mutations in mouse crypts.
:::
:::

::: exercise Evolution of ageing {level=3}
Two populations of a small mammal live on islands of different character. On island 1 extrinsic mortality (predation) is 60 % per year; on island 2, without predators, it is 10 % per year. (a) What fraction of individuals survive extrinsic mortality alone for 5 years on each island? (b) Using the evolutionary theories of ageing, predict which population will evolve slower intrinsic ageing, and why. (c) Steven Austad compared opossums on a predator-free island with mainland opossums in the 1990s. What result would support your prediction?
::: solution
(a) Island 1: $0.4^5 = 0.010$, about 1 %. Island 2: $0.9^5 = 0.59$, 59 %.

(b) On island 2 many individuals are still alive and reproducing at age 5, so selection against harmful late-acting effects is much stronger and investment in somatic maintenance pays off; the population should evolve slower ageing. On island 1 almost no one survives to old age, so mutations with late harmful effects, or with early benefits and late costs, are scarcely opposed.

(c) The island opossums should show slower physiological ageing (for example slower stiffening of tendon collagen) and a longer reproductive lifespan than mainland opossums, despite being otherwise similar — which is what Austad reported in 1993.
:::
:::
