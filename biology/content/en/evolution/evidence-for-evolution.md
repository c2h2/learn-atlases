Every organism alive today is the descendant of a line of ancestors that stretches back, generation by unbroken generation, more than three and a half billion years. The species we see are not fixed kinds created separately: they have changed, split and gone extinct, and they are related to one another as branches of a single tree. That claim — **descent with modification**, in Charles Darwin's phrase — is the central fact of biology. It explains why a bat's wing, a whale's flipper and your hand are built from the same bones, why the genetic code is almost the same in bacteria and in people, why the islands of the Pacific have flightless birds but no native land mammals except bats, and why the same broken gene sits at the same place in the genomes of humans and chimpanzees.

This chapter sets out the evidence. We separate two questions that Darwin himself kept apart: *whether* life has evolved (the historical claim, established by fossils, comparative anatomy, biogeography and molecules), and *how* it evolves (the mechanisms — natural selection, drift, mutation and gene flow — which occupy the rest of the course). We begin with how evolutionary thought developed, then treat each line of evidence in turn, with the quantitative tools needed to read it: radiometric dating of rocks, and counts of shared molecular differences. Cell structure and the genetic code are assumed from [[cell-biology/cells-and-microscopy]].

## From fixed kinds to descent with modification

For most of European intellectual history, species were thought of as fixed. Aristotle arranged living things on a *scala naturae*, a ladder from simple to complex, and later naturalists read the ladder as a static plan. Carl Linnaeus's *Systema Naturae* (10th edition, 1758), the starting point of zoological names, grouped species into genera, genera into orders and orders into classes. Linnaeus did not think the groups reflected ancestry, but the fact that organisms *can* be nested in groups within groups — rather than arranged on a line or scattered at random — is exactly the pattern descent produces.

Three developments around 1800 prepared the ground.

- **Extinction.** Georges Cuvier showed in 1796 that the mammoth and the mastodon were distinct from living elephants and had no living counterparts. Species could disappear. Cuvier explained the succession of faunas in the rocks by a series of catastrophes, and did not believe in transformation.
- **Transformation.** Jean-Baptiste Lamarck, in *Philosophie zoologique* (1809), proposed that lineages change over time, driven by an inherent tendency towards complexity and by the inheritance of characteristics acquired through use and disuse. His mechanism was wrong, but he was the first to argue at length that species are mutable.
- **Deep time.** James Hutton (1788) and Charles Lyell, in *Principles of Geology* (1830–1833), argued that the processes acting today — erosion, sedimentation, uplift — acting over immense periods are enough to explain the geological record. Darwin took Lyell's first volume with him on HMS *Beagle* (1831–1836).

On the voyage, and in the years after, Darwin assembled the observations that convinced him of transmutation: fossil armadillo-like glyptodonts in Argentina, close to the living armadillos of the same region; mockingbirds that differed from island to island in the Galápagos; and the ornithologist John Gould's report in 1837 that the Galápagos finches he had collected were a group of distinct species. In 1838, reading Thomas Malthus's *Essay on the Principle of Population* (1798), Darwin saw how a struggle for existence among more offspring than can survive would preserve favourable variations — natural selection. He worked on it privately for twenty years.

In 1858 Alfred Russel Wallace, collecting in the Malay Archipelago, sent Darwin a manuscript proposing the same mechanism. Papers by both men were read at the Linnean Society of London on 1 July 1858, and *On the Origin of Species by Means of Natural Selection* was published on 24 November 1859.

::: definition Evolution and descent with modification {#def-evolution}
**Biological evolution** is change in the heritable characteristics of populations over successive generations. At the level of genes, it is change in allele frequencies; at the level of the history of life, it is **descent with modification**: all living organisms descend from common ancestors, and lineages diverge and change as they do so. A **lineage** is a sequence of ancestral and descendant populations through time.
:::

The definition is deliberately about populations. An individual does not evolve: it develops, and it may acclimatise, but its genes are fixed at conception (apart from somatic mutations, which are not passed on in animals). Evolution happens when the *composition* of a population changes from one generation to the next.

::: warning "Evolution is just a theory"
In science a **theory** is a well-tested explanatory framework, not a guess: atomic theory and the germ theory of disease are theories in this sense. It helps to separate the *fact* of evolution — that species share ancestors and have changed over time, which is as well established as any historical claim in science — from the *theory* of its mechanisms, in which there are genuine, active questions (the relative importance of drift and selection at the molecular level, for instance). Debate about mechanisms is not doubt about the fact.
:::

## The fossil record

Fossils are the only direct record of organisms that lived in the past. They are preserved mostly in sedimentary rocks, laid down in layers (**strata**) whose order gives a relative sequence: in an undisturbed sequence, lower beds are older (Nicolas Steno's principle of superposition, 1669). From the order of fossils in strata worldwide, nineteenth-century geologists built the **geological time scale** of eras and periods — Palaeozoic, Mesozoic, Cenozoic; Cambrian, Ordovician … — before anyone could put numbers on it. The time scale and the large-scale patterns of the record are the subject of [[evolution/macroevolution]].

Three features of the record matter here.

1. **Order.** Fossils occur in a consistent sequence. Prokaryote-like microfossils and stromatolites appear first; complex multicellular animals not before the late Precambrian; fish before amphibians, amphibians before reptiles, reptiles before mammals and birds; flowering plants late in the Mesozoic. No one has found a rabbit in the Cambrian. This order is a prediction of common descent that could easily have failed.
2. **Change within lineages.** Where sediments are continuous, lineages can be traced changing gradually through successive layers — the shells of foraminifera and molluscs, the teeth of horses.
3. **Transitional forms.** Fossils with mixtures of characters intermediate between groups that are distinct today.

### Dating rocks

The absolute ages come from **radiometric dating**. A radioactive parent isotope decays into a daughter at a constant rate that is unaffected by temperature, pressure or chemistry. If a mineral crystallised with parent and no daughter, the ratio of daughter to parent measures the time since it formed.

::: proposition Radiometric age {#prop-age}
A parent isotope with **half-life** $t_{1/2}$ decays with rate constant $\lambda = \ln 2/t_{1/2}$, so that the number of parent atoms falls as $P(t) = P_0 e^{-\lambda t}$. If a mineral contained no daughter atoms when it formed and has gained or lost neither parent nor daughter since (a **closed system**), then with $D$ radiogenic daughter atoms now present,

$$
t = \frac{1}{\lambda}\ln\!\left(1 + \frac{D}{P}\right) = \frac{t_{1/2}}{\ln 2}\ln\!\left(1 + \frac{D}{P}\right).
$$ {#eq-age}
:::

::: proof
Each decay turns one parent atom into one daughter atom, so $D = P_0 - P$. With $P_0 = Pe^{\lambda t}$, $D = P(e^{\lambda t} - 1)$, so $e^{\lambda t} = 1 + D/P$; take logarithms.
:::

Each assumption can be tested. Zircon crystals (ZrSiO₄) take up uranium when they crystallise but almost exclude lead, so they start with very little daughter; and uranium has two parent isotopes, $^{238}\mathrm{U}\to{}^{206}\mathrm{Pb}$ ($t_{1/2} = 4.468\times10^9$ years) and $^{235}\mathrm{U}\to{}^{207}\mathrm{Pb}$ ($7.04\times10^8$ years), which give two independent ages from the same crystal. When the two agree (the crystal is **concordant**), the closed-system assumption holds. Volcanic ash beds, which contain fresh zircons and settle as a single instantaneous layer, bracket the fossils in the sediments above and below them.

::: example A volcanic ash below a fossil fish {#ex-upb}
Zircons from an ash bed just below a layer containing fossil fish have a radiogenic ratio $^{206}\mathrm{Pb}/{}^{238}\mathrm{U} = 0.0600$. How old is the ash, and what does that tell you about the fish?
::: solution
By [[#eq-age]] with $t_{1/2} = 4.468\times10^9$ years,

$$
t = \frac{4.468\times10^9}{0.6931}\ln(1.0600) = 6.446\times10^9\times0.05827 = 3.76\times10^8\ \text{years},
$$

about 376 million years (Ma), in the Late Devonian. The fish, lying above, are younger than 376 Ma; a second dated ash above the fossil layer would set an upper limit, bracketing their age. Note how small the ratio is: in 376 Myr less than a tenth of a half-life of ²³⁸U has elapsed, and only about 6 % as many ²⁰⁶Pb atoms as ²³⁸U atoms have accumulated. That is why ratios must be measured with mass spectrometers to a precision of better than 0.1 %.
:::
:::

For younger organic material, **radiocarbon** is used. Cosmic rays make $^{14}\mathrm{C}$ in the atmosphere; living organisms exchange carbon with it and hold roughly the atmospheric ratio of $^{14}\mathrm{C}$ to $^{12}\mathrm{C}$; after death the $^{14}\mathrm{C}$ decays ($t_{1/2} = 5730$ years) without replacement. Here we measure the fraction of the original parent left, $P/P_0 = e^{-\lambda t}$, so $t = (t_{1/2}/\ln 2)\ln(P_0/P)$. After about ten half-lives too little remains to measure, so radiocarbon reaches back only about 50,000 years. (Laboratories report "conventional" radiocarbon ages using Willard Libby's older half-life of 5568 years and then calibrate them against tree rings and other records, because the atmospheric ratio has not been constant.)

::: widget plot
f: exp(-ln(2)*x/T); 2^(x/T) - 1
x: 0, 10
y: 0, 3
sliders: T=4.468:0.5:10:0.01
labels: P/P_0\ \text{(parent left)}; D/P\ \text{(daughter : parent)}
caption: Radioactive decay with half-life $T$ (in billions of years; the slider starts at 4.468, the value for $^{238}$U). The falling curve is the fraction of parent atoms remaining, the rising curve the ratio $D/P$ that [[#eq-age]] turns into an age. Notice that $D/P$ passes 1 at exactly one half-life and 3 at two half-lives, and that near the origin it grows almost linearly, so that young rocks need very precise measurement. Set $T = 0.704$ (uranium-235) and see how much faster its clock runs.
:::

### Transitional forms

Darwin worried that the record showed too few intermediates. The record is incomplete — fossilisation needs rapid burial, usually in water, and hard parts — but the intermediates that he predicted have been found in abundance since.

- ***Archaeopteryx***, described from the Late Jurassic Solnhofen limestone of Bavaria in 1861 (a single feather, then the London skeleton), has feathers and wings like a bird but teeth, clawed fingers and a long bony tail like a small theropod dinosaur. Since the 1990s, dozens of feathered non-avian dinosaurs from the Early Cretaceous of Liaoning, China — starting with *Sinosauropteryx* in 1996 — have shown that feathers evolved in dinosaurs long before flight.
- ***Tiktaalik roseae***, described in 2006 by Edward Daeschler, Neil Shubin and Farish Jenkins from Late Devonian rocks (about 375 Ma) on Ellesmere Island in the Canadian Arctic, is a fish with scales, fins and gills, but also a flat head, a mobile neck and fins with a wrist-like set of bones that could prop the body up. It was found by a *prediction*: the team searched rocks of the right age and of shallow-water origin because the transition from fish to tetrapod should have happened there and then.
- **Whales.** A series of Eocene fossils from Pakistan, India and Egypt (about 50–34 Ma) traces whales from land mammals: *Pakicetus*, a wolf-sized terrestrial animal with a whale-like ear region; *Ambulocetus*, amphibious, with large hind feet; *Rodhocetus*, with reduced hind limbs; and *Basilosaurus*, fully marine but still bearing tiny hind legs with knees and toes. Early whales have a "double-pulley" ankle bone (astragalus) found otherwise only in artiodactyls (even-toed hoofed mammals), confirming the molecular result that the closest living relatives of whales are hippopotamuses (Philip Gingerich and colleagues and Hans Thewissen and colleagues, both 2001).

::: warning "There should be a 'missing link' between any two living species"
Living species are cousins, not ancestors and descendants of one another. Humans did not evolve from chimpanzees, nor birds from crocodiles; each pair shares a common ancestor that was neither. Transitional fossils are therefore usually not the direct ancestors of later groups, but relatives of those ancestors that preserve the intermediate combination of characters. A fossil does not need to be on the direct line to show that the combination existed, and when it existed.
:::

## Homology: the same parts in different guises

Richard Owen, an anatomist who opposed Darwin, defined a **homologue** in 1843 as "the same organ in different animals under every variety of form and function". The forelimb of a human, a cat, a whale and a bat contains the same sequence of bones — one upper-arm bone (humerus), two forearm bones (radius and ulna), a set of wrist bones and five digits — although they are used for grasping, walking, swimming and flying. An engineer designing a flipper and a wing from scratch would not use the same parts. Descent explains the pattern: the bones are inherited from a common ancestor and modified.

::: definition Homology, analogy and homoplasy {#def-homology}
Two characters in different species are **homologous** if they are inherited, with modification, from the same character in their most recent common ancestor. Characters that are similar but evolved independently in the two lineages are **homoplastic**. Similarity due to independent evolution of a similar function — the wings of birds and of insects, the streamlined bodies of sharks and dolphins — is often called **analogy**, and the independent origin of similar traits **convergent evolution**.
:::

Homology is defined by ancestry, not similarity, and the two can come apart: the wings of birds and bats are homologous *as forelimbs* but not *as wings*, since their common ancestor had forelimbs but no wings. Homologies come in several kinds:

- **Anatomical**: the vertebrate limb; the middle-ear bones of mammals, whose incus and malleus are homologous to bones of the jaw joint of reptiles (shown by embryology and by fossils of early mammal relatives).
- **Developmental**: all vertebrate embryos pass through a stage with pharyngeal arches and pouches; in fish these become gill supports, in mammals parts of the jaw, ear and throat.
- **Vestigial structures**: reduced remnants of organs that were functional in ancestors — the hind-limb bones of whales and of pythons, the wings of flightless kiwis, the eyes of cave fish such as *Astyanax mexicanus*. "Vestigial" means reduced from an ancestral state, not necessarily useless; many vestiges have taken on minor new roles.
- **Molecular**: shared genes, shared genetic code, shared mutations (below).

::: warning "Ontogeny recapitulates phylogeny"
Ernst Haeckel claimed in 1866 that embryos pass through the adult forms of their ancestors, and some of his famous embryo drawings exaggerated the similarity of early embryos. Neither claim survives: a human embryo never resembles an adult fish. What is true, as Karl Ernst von Baer observed in 1828, is that features shared by a larger group (such as pharyngeal arches in all vertebrates) tend to appear earlier in development than features specific to a smaller one. That is evidence of shared developmental programmes inherited from a common ancestor — not of recapitulation.
:::

### Nested hierarchy

The most powerful argument from homology is not any single example but the overall pattern. Characters fall into **groups within groups**: all vertebrates have a backbone; within them, tetrapods have four limbs with digits; within tetrapods, amniotes have an egg with internal membranes; within amniotes, mammals have hair and milk; within mammals, primates have nails instead of claws. If species had been designed independently, there is no reason why traits should nest like this rather than be mixed and matched. Under descent with modification, a nested hierarchy is inevitable, because each new character is inherited by all the descendants of the lineage in which it arose. The independent characters of anatomy and of molecules give the *same* hierarchy — the test applied quantitatively in [[evolution/phylogenetics]].

::: quiz
Which of the following pairs of structures are homologous, in the sense of [[#def-homology]]?
- [ ] The wings of a bat and the wings of a butterfly.
- [x] The forelimbs of a mole and of a horse.
- [ ] The camera eyes of an octopus and of a human.
- [x] The swim bladder of a bony fish and the lungs of a tetrapod.
::: solution
The mole and horse forelimbs descend from the forelimb of their common mammalian ancestor and contain the same bones. The swim bladder and tetrapod lungs are homologous too: both derive from an outpocketing of the gut in early bony fishes, which were air-breathers. The butterfly and bat wings evolved independently from completely different structures. The octopus and human eyes are a classic case of convergence: they are built differently (the vertebrate retina is inverted, with a blind spot where the nerve passes through; the octopus retina is not), although both use opsin proteins and genes such as *Pax6* whose roles in eye development are themselves ancient and shared.
:::
:::

## Biogeography

Darwin and Wallace were both biogeographers first. The distribution of species makes sense only if species arose in particular places from ancestors that lived nearby, and spread as far as their abilities and the barriers around them allowed.

- **Oceanic islands** — volcanic islands that rose from the sea floor and were never connected to a continent — have species related to those of the nearest mainland but distinct from them; they lack groups that cannot cross water (native terrestrial mammals other than bats, amphibians, freshwater fish) and have many species of groups that arrive rarely and then diversify (land snails, flightless birds, insects, flowering plants). The Hawaiian islands, about 3,800 km from the nearest continent, have no native amphibians or land mammals except a bat, but have hundreds of species of *Drosophila* flies and a radiation of honeycreepers descended from a single finch-like ancestor. The Galápagos finches and mockingbirds resemble South American species, not those of other arid islands elsewhere.
- **Continents** carry distinctive faunas that match their geological history. Australia, isolated for tens of millions of years, has marsupials that have converged on the forms of placental mammals elsewhere — a burrowing marsupial mole, gliding possums, the thylacine wolf. Wallace noticed a sharp faunal boundary between Bali and Lombok, separated by a strait only 20–40 km wide, separating Asian from Australian faunas; we now know that the deep strait there remained water even when sea levels fell during glaciations. Plate tectonics, accepted in the 1960s, explains why related fossil plants and animals (such as the seed fern *Glossopteris*) occur across the southern continents that were once joined in Gondwana.
- **Similar environments, different lineages.** Deserts in the Americas have cacti; those of Africa have succulent euphorbias that look similar but belong to a different family. The resemblance is convergence; the lineages present depend on history, not only on environment.

## Molecular evidence

Molecular biology, unknown to Darwin, has provided the most extensive and quantitative evidence for common descent.

**A universal code.** All cellular life stores information in DNA, transcribes it into RNA, translates it with ribosomes using the same 20 standard amino acids, and uses — with minor variations in mitochondria and a few microbes — the same genetic code. Many different codes would work equally well chemically. A single shared code is what we expect if all life descends from one ancestral population that already used it, because changing the code in a lineage would garble almost every protein.

**Graded similarity of sequences.** Comparing the same protein or gene across species gives a measure of relatedness that can be counted. Cytochrome c, a respiratory protein of 104 amino acids in vertebrates, is identical in humans and chimpanzees, differs at one position between humans and rhesus macaques, and at about a dozen between humans and horses. The numbers of differences fall into the same nested pattern as anatomy, and they grow with the time since divergence estimated from fossils — the observation behind the molecular clock of [[evolution/mutation-drift-gene-flow]].

**Shared errors.** The most compelling molecular evidence comes from changes that have no function at all, because function cannot explain why two species share them.

- **Pseudogenes** are broken copies of genes. Most mammals make their own vitamin C using the enzyme L-gulonolactone oxidase, encoded by *GULO*. Humans and other haplorhine primates (monkeys, apes and tarsiers) cannot; they carry a pseudogene, *GULOP*, at the corresponding position, disabled by a shared set of mutations, including the loss of several exons. Guinea pigs also cannot make vitamin C, but their *Gulo* gene was disabled independently, by different mutations — as expected, since guinea pigs are not close relatives of primates.
- **Endogenous retroviruses** (ERVs) are relics of retroviruses that integrated into the germ-line DNA of an ancestor and were inherited. About 8 % of the human genome is ERV-derived. Integration sites are close to random among millions of possible positions, so two species sharing an ERV at exactly the same site almost certainly inherited it from a common ancestor. Humans and chimpanzees share the great majority of their ERV insertions at identical sites, and the pattern of shared insertions across primates reproduces the primate tree.
- **Chromosome fusion.** Humans have 23 pairs of chromosomes, chimpanzees, bonobos, gorillas and orangutans 24. Human chromosome 2 corresponds to two separate ape chromosomes fused end to end: it carries remnants of telomere repeats near its middle and the remains of a second, inactivated centromere (shown by Jacques IJdo and colleagues in 1991).

::: example How likely is a shared insertion by chance? {#ex-erv}
Suppose a retrovirus integrates at a random position in a genome of $3\times10^9$ base pairs. Two lineages are each infected once. What is the probability that the two integrations occur at the same base, by chance? If two species share 10 ERV insertions at identical sites, what does this suggest?
::: solution
Given the first insertion, the second must hit the same one of $3\times10^9$ positions (and in the same orientation, a further factor of 1/2): the probability is about $1/(6\times10^9) \approx 1.7\times10^{-10}$. For ten independent coincidences the probability is about $(1.7\times10^{-10})^{10} \approx 2\times10^{-98}$ — effectively zero.

Integration is not perfectly random (some retroviruses favour particular chromatin), so the real chance for each site is larger. Even if each were a million times more likely, ten coincidences would still have probability around $10^{-38}$. The only reasonable explanation for many shared insertion sites is inheritance from a common ancestor in which each insertion happened once.
:::
:::

## Evolution observed

Some evolution is fast enough to watch. These are not the same events as the origin of major groups, which took millions of years, but they show the mechanisms of the coming chapters operating on measurable time scales.

- **Industrial melanism.** In the peppered moth *Biston betularia*, a black form, *carbonaria*, rose from rarity in the 1840s to more than 90 % of moths near Manchester by about 1900 as soot darkened tree bark, and fell again after clean-air legislation in the 1950s. The mutation is a transposable-element insertion in the gene *cortex* (Arjen van't Hof and colleagues, 2016). We return to it in [[evolution/natural-selection]].
- **Antibiotic and pesticide resistance.** Resistance to each new antibiotic has appeared in bacterial populations within years of its introduction, and insects have evolved resistance to essentially every insecticide applied widely.
- **Darwin's finches.** Peter and Rosemary Grant measured the medium ground finch *Geospiza fortis* on the islet of Daphne Major in the Galápagos every year from 1973. After a drought in 1977, the survivors had deeper beaks on average than the population before, and their offspring inherited the difference ([[evolution/natural-selection]]).
- **Experimental evolution.** On 24 February 1988 Richard Lenski founded twelve populations of *Escherichia coli* from a single ancestral strain (*E. coli* B, strain REL606 and its Ara⁺ variant) and has propagated them ever since by daily 1:100 transfer into fresh glucose-limited medium, freezing samples every 500 generations. The frozen "fossil record" can be revived and competed against later descendants. Fitness has increased in all twelve populations, rapidly at first and then more slowly, and one population evolved the ability to grow on citrate in the presence of oxygen — a trait that had defined *E. coli* as a species — after roughly 31,000 generations (Zachary Blount and colleagues, 2008). The populations passed 50,000 generations in 2010.

::: example Generations in a serial-transfer experiment {#ex-ltee}
Each day 0.1 mL of a culture is transferred into 9.9 mL of fresh medium, and the bacteria grow until the glucose runs out and the population returns to the same density. How many generations (doublings) occur per day? How many years should 50,000 generations take?
::: solution
The culture is diluted 100-fold, and regrows by the same factor. If the cells double $g$ times, $2^g = 100$, so $g = \log_2 100 = \ln 100/\ln 2 = 6.64$ generations per day. Then 50,000 generations take $50{,}000/6.64 = 7526$ days, or 20.6 years. The experiment started in February 1988 and reached 50,000 generations in 2010, about 22 years later: the small difference reflects days when populations were restarted from frozen samples after contamination or interruptions. Generations here are average doublings of the population, a convenient clock, not the life of a particular cell.
:::
:::

::: widget plot
f: 1 + a*ln(1 + b*x); 1 + c*x/(x + d)
x: 0, 60
y: 0.9, 2
sliders: a=0.15:0.02:0.4:0.01; b=0.5:0.05:3:0.05; c=0.8:0.2:1.5:0.01; d=5:1:30:0.5
labels: \text{no upper limit}; \text{approaches a limit}
caption: Two shapes a fitness trajectory might take, plotted against thousands of generations (illustrative curves, not the experimental data). Both rise steeply at first and then slow down, and over the first few thousand generations they are hard to tell apart. Only the second approaches a ceiling. Move the sliders to make the two curves match early on, then look at how far they diverge by 60,000 generations. Long experiments like Lenski's are needed to tell such models apart; for the LTEE, Michael Wiser, Noah Ribeck and Lenski (2013) found that fitness kept rising without a clear limit, better described by a power law than by a curve that levels off.
:::

::: application Evolution in medicine and agriculture
Because evolution is happening now, it is a practical problem. Pathogens evolve resistance to drugs, tumours evolve within patients, weeds evolve resistance to herbicides and pests to insecticides and to crops engineered with *Bacillus thuringiensis* (Bt) toxins. Management strategies — combinations of drugs, refuges of non-Bt crops in which susceptible insects survive and dilute resistance genes, rotation of herbicides — are applications of evolutionary theory, designed to slow the spread of resistance alleles by the quantitative processes we study in [[evolution/natural-selection]] and [[evolution/mutation-drift-gene-flow]]. (The clinical side is in [Medicine Atlas](/learn/medicine/).)
:::

## How the lines of evidence fit together

Each line of evidence alone could perhaps be explained away. Their force lies in their agreement. The order of fossils in rocks dated by physics, the nested pattern of anatomical homologies, the distribution of species across continents whose movements are measured by geophysics, and the nested pattern of DNA sequences — including shared nonfunctional insertions — are independent data, gathered by different methods in different centuries. They tell the same story: the same tree, with the same branching order and, where clocks can be applied, roughly the same dates. A single well-confirmed counter-example (a mammal fossil in Precambrian rock, or a species whose genes were nested in a group far from its anatomical relatives) would cause serious trouble; none has been found in a century and a half of looking.

::: example Testing a prediction with independent data {#ex-congruence}
Anatomy places whales among mammals, and the fossil series above places them closest to artiodactyls. In the 1990s, DNA sequences placed whales *inside* the artiodactyls, as the sister group of hippos, which would make "artiodactyls" without whales a group that excludes some descendants of its common ancestor. What two independent observations would confirm this, and what was found?
::: solution
(1) A morphological character uniquely shared by whales and artiodactyls, appearing in early whale fossils: the double-pulley astragalus, found in *Rodhocetus* and *Artiocetus* (Gingerich et al., 2001) and in pakicetids (Thewissen et al., 2001). (2) Rare genomic events that are effectively irreversible, such as retrotransposon (SINE) insertions: Masato Nikaido, Norihiro Okada and colleagues (1999) found SINE insertions shared by whales and hippos but absent from other artiodactyls, and others shared by whales, hippos and ruminants but not pigs or camels. Both predictions were met, so whales are now classified with artiodactyls in Cetartiodactyla (or Artiodactyla in the broad sense).
:::
:::

::: history
Cuvier established extinction in 1796, and Lamarck proposed the transformation of species in 1809. Darwin sailed on HMS *Beagle* from 1831 to 1836, opened his first notebook on the transmutation of species in 1837 and read Malthus in 1838. Wallace's letter from the Malay Archipelago reached Darwin in June 1858; their joint papers were read at the Linnean Society on 1 July 1858, and the *Origin of Species* appeared on 24 November 1859. *Archaeopteryx* was described in 1861. By the 1870s most naturalists accepted common descent, though many doubted natural selection until the population genetics of the 1920s–1930s reconciled it with Mendelian inheritance ([[evolution/natural-selection]]). Emile Zuckerkandl and Linus Pauling compared protein sequences across species in the early 1960s, the beginning of molecular evolution; whole-genome comparisons, from the human (2001) and chimpanzee (2005) drafts onward, have since turned the molecular argument into an overwhelming one.
:::

::: summary
- Evolution is heritable change in populations over generations; descent with modification means all life shares common ancestors. Individuals develop; populations evolve.
- Radiometric dating gives absolute ages: $t = (t_{1/2}/\ln 2)\ln(1 + D/P)$ for a closed system starting with no daughter; concordant U–Pb ages from zircons in ash beds bracket fossils.
- Fossils occur in a consistent order and include transitional forms (*Archaeopteryx*, feathered dinosaurs, *Tiktaalik*, the Eocene whales), often found by prediction.
- Homology (similarity due to common ancestry) differs from homoplasy and analogy (independent evolution); homologies nest in a hierarchy, as descent requires.
- Biogeography reflects history: island faunas derive from the nearest mainland and lack poor dispersers; continents carry lineages that match their tectonic past.
- Molecules give independent, quantitative evidence: a near-universal code, graded sequence similarity, and shared nonfunctional features — pseudogenes, ERV insertions, the chromosome 2 fusion.
- Evolution is observed directly in melanic moths, resistant pathogens, Darwin's finches and the *E. coli* long-term experiment.
- The lines of evidence are independent and agree on the same tree.
:::

## Exercises

::: exercise A radiocarbon age {level=1 check="17190"}
A piece of charcoal contains one-eighth of the $^{14}\mathrm{C}$ (relative to carbon) found in living wood. Taking $t_{1/2} = 5730$ years and assuming the atmospheric ratio was constant, how old is it, in years?
::: solution
One-eighth is $(1/2)^3$: three half-lives, $3\times5730 = 17{,}190$ years. Equivalently $t = (5730/\ln 2)\ln 8 = 8267\times2.079 = 17{,}190$ years.
:::
:::

::: exercise Dating the end-Cretaceous {level=1 check="67.3"}
Zircons from an ash bed near the Cretaceous–Palaeogene boundary give $^{206}\mathrm{Pb}/{}^{238}\mathrm{U} = 0.0105$. Using [[#eq-age]] with $t_{1/2} = 4.468\times10^9$ years, calculate the age in millions of years, to three significant figures.
::: solution
$t = (4.468\times10^9/0.6931)\ln(1.0105) = 6.446\times10^9\times0.010445 = 6.73\times10^7$ years, 67.3 Ma. (The real boundary is at 66.0 Ma; this hypothetical ash is a little older.)
:::
:::

::: exercise Daughter-to-parent ratio {level=1 check="3"}
In a closed-system mineral that started with no daughter, what is the ratio $D/P$ after exactly two half-lives?
::: solution
After two half-lives $P = P_0/4$ and $D = P_0 - P = 3P_0/4$, so $D/P = 3$. (Check with [[#eq-age]]: $t = 2t_{1/2}$ gives $\ln(1 + D/P) = 2\ln 2$, so $1 + D/P = 4$.)
:::
:::

::: exercise A thousandfold dilution {level=2 check="9.97"}
A serial-transfer experiment dilutes its cultures 1:1000 each day and lets them regrow to the same density. How many generations occur per day (three significant figures)?
::: solution
$2^g = 1000$, so $g = \log_2 1000 = 3\log_2 10 = 3\times3.322 = 9.97$.
:::
:::

::: exercise Days to ten thousand generations {level=2 check="1505"}
How many days of daily 1:100 transfers does it take to accumulate 10,000 generations? Round to the nearest day.
::: solution
At $\log_2 100 = 6.644$ generations per day, $10{,}000/6.644 = 1505$ days, a little over four years.
:::
:::

::: exercise Homologous or convergent? {level=2}
Classify each as homology or convergence (homoplasy), and say what evidence would decide doubtful cases: (a) the flippers of a penguin and of a dolphin; (b) the hind-limb bones of a python and the legs of a lizard; (c) the spines of a hedgehog and of a porcupine; (d) the middle-ear bones (incus, malleus) of mammals and the quadrate and articular bones of the reptilian jaw.
::: solution
(a) As forelimbs, homologous; as flippers, convergent — penguins and dolphins are birds and mammals whose common ancestor had walking legs. (b) Homologous: both are hind limbs inherited from a tetrapod ancestor, reduced in pythons. (c) Convergent: hedgehogs (Eulipotyphla) and porcupines (rodents) are not closely related, and spines are absent in their many intermediate relatives; the spines are modified hairs in both, so as hairs they are homologous, but as spines they evolved independently. (d) Homologous, shown by embryology (the bones develop from the same pharyngeal arch) and by a fossil series of synapsids in which the jaw-joint bones become progressively smaller and move into the ear. In doubtful cases, the decisive evidence is the distribution of the trait on a phylogeny built from other characters: a trait present in two distant groups but absent from the lineages between them is likely homoplastic ([[evolution/phylogenetics]]).
:::
:::

::: exercise Reading an island fauna {level=2}
A newly surveyed volcanic island, 1,500 km from the nearest continent, has 40 species of land snails, 12 of flightless beetles, 6 of birds, 3 of lizards, 1 of bat, and no amphibians, freshwater fish or non-flying mammals. Most species are found nowhere else, but each group's closest relatives live on the nearest continent. Explain each feature of this fauna on the hypothesis of descent with modification, and say what a hypothesis of independent creation suited to the environment would have to assume instead.
::: solution
Groups present are those that disperse across sea, rarely, as eggs, adults or on rafts (snails, insects, small lizards) or by flight (birds, bats). Amphibians and freshwater fish cannot survive salt water and non-flying mammals rarely raft so far, so they are absent although the island has habitats they could use (introduced frogs and rats often flourish on islands). The many endemic species of snails and beetles imply few colonisations followed by diversification on the island. Relationship to the nearest continent shows where colonists came from. Separate creation for the environment would have to explain why an island with ponds has no frogs, and why its species resemble those of the nearest continent rather than those of similar islands elsewhere — it has no reason to predict either.
:::
:::

::: exercise Pseudogenes as evidence {level=3}
Species A, B and C all lack a functional copy of a gene that most mammals have. In A and B the gene is disabled by the same 2-base deletion in exon 3 and the same premature stop codon in exon 5, with shared further mutations accumulated since. In C the gene is disabled by a different stop codon in exon 2. (a) What do these observations suggest about the relationships of A, B and C and the number of times the gene was lost? (b) Why does a pseudogene accumulate mutations faster than a functional gene? (c) Explain why shared nonfunctional DNA is stronger evidence for common ancestry than shared functional genes.
::: solution
(a) The identical disabling mutations in A and B indicate a single loss in their common ancestor: the chance that two lineages acquire exactly the same deletion and the same stop independently is very small. C lost the gene independently. A and B are probably more closely related to each other than to C (as with humans and other haplorhine primates versus guinea pigs for *GULO*). (b) Once the gene no longer functions, mutations in it have no effect on fitness and are not removed by selection, so they accumulate at the neutral rate, faster than in a constrained functional gene ([[evolution/mutation-drift-gene-flow]]). (c) A functional gene might be shared because two species need the same function (a designer might reuse a good part). A broken gene confers no function, so there is no functional reason for two species to share the same breakage; only inheritance from a common ancestor explains it.
:::
:::

::: exercise Concordant clocks {level=3}
A zircon gives $^{206}\mathrm{Pb}/{}^{238}\mathrm{U} = 0.0600$ (see [[#ex-upb]]) and $^{207}\mathrm{Pb}/{}^{235}\mathrm{U} = 0.449$. The half-life of ²³⁵U is $7.04\times10^8$ years. (a) Calculate the ²³⁵U age. (b) Are the two ages concordant? (c) If a later heating event had driven out some lead, how would both ratios, and the apparent ages, change? Explain why concordance is a test of the closed-system assumption.
::: solution
(a) $t = (7.04\times10^8/0.6931)\ln(1.449) = 1.0157\times10^9\times0.3709 = 3.77\times10^8$ years, 377 Ma.
(b) Yes: the ²³⁸U age was 376 Ma, the same within about 1 Myr.
(c) Lead loss lowers both $D/P$ ratios, so both apparent ages become too young — but by different amounts, because the two systems have very different half-lives and the relationship between ratio and age is different for each. The two ages then disagree (the zircon is **discordant**). Two independent clocks agreeing is very unlikely unless the system really has stayed closed, which is why concordance is the standard check in U–Pb geochronology.
:::
:::
