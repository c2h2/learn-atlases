A fly and a mouse look as different as two animals can. One has an external skeleton, compound eyes, six legs and a nerve cord along its belly; the other an internal skeleton, camera eyes, four limbs and a nerve cord along its back. Their last common ancestor lived more than 550 million years ago. Yet when the genes that build them were identified in the 1980s and 1990s, they turned out to be largely the same: the same Hox genes laying out the body axis, the same gene initiating eye development, the same signalling pathways and the same families of transcription factors. Much of the diversity of animals has evolved not by inventing new genes but by changing how, when and where an ancient set of genes is used.

This is the central finding of **evolutionary developmental biology** (evo-devo), and this chapter explains it and its limits. We begin with the shared genetic toolkit and the surprising "deep homologies" it revealed; then ask why evolutionary change in form so often occurs in the regulatory DNA of toolkit genes rather than in their proteins; then look at changes in the timing, place and amount of development; and end with the question of how development itself biases the direction of evolution. The chapter draws on all the earlier ones, especially [[developmental-biology/segmentation-hox]], and on the evolutionary principles of [[evolution/natural-selection]] and [[evolution/macroevolution]].

## Embryos and evolution before genes

Comparative embryology was one of Darwin's strongest lines of evidence. Karl Ernst von Baer noted in 1828 that the early embryos of different vertebrates resemble each other more than the adults do, and that general features (those shared by a large group, such as a notochord) appear before special ones (those of a particular group, such as feathers or hair) — **von Baer's laws**. Darwin interpreted this in *On the Origin of Species* (1859) as evidence of common descent: embryos reveal shared ancestry because the features that distinguish species tend to appear late in development.

Ernst Haeckel went further. His **biogenetic law**, "ontogeny recapitulates phylogeny", claimed that during its development each animal passes through the adult stages of its ancestors, so that a human embryo is at one stage "a fish". In its strong form the law is wrong: the pharyngeal pouches of a human embryo resemble those of a fish *embryo*, not an adult fish with working gills, and development can change at any stage, including the earliest. Several of Haeckel's widely reproduced drawings also exaggerated the similarity of early embryos. Von Baer's weaker statement — that embryos of related animals share features and diverge as they develop — remains broadly correct, with an important qualification: the very earliest stages (cleavage, gastrulation) can be extremely different even between close relatives, as the comparison of frog, chick and mouse in [[developmental-biology/early-embryos]] shows.

This observation has been refined into the **developmental hourglass**: embryos of a phylum are most similar at a mid-embryonic **phylotypic stage** — the pharyngula stage of vertebrates, with its notochord, somites, neural tube and pharyngeal arches — and more divergent both before and after. Comparisons of gene expression across *Drosophila* species (Alex Kalinka, Pavel Tomancak and colleagues, 2010) and across animals of different ages (Tomislav Domazet-Lošo and Diethard Tautz, 2010) found that the transcriptome is most conserved, and dominated by evolutionarily old genes, around the phylotypic stage. One explanation is that mid-embryonic stages are the most interconnected: changes there disturb many interactions at once and are therefore rarely tolerated.

::: warning "Ontogeny recapitulates phylogeny"
Embryos do not replay the adult forms of their ancestors. They share *embryonic* features with related species because they inherited a common developmental programme, and they diverge where that programme has been modified. Evolutionary changes can occur at any stage, including very early ones — some sea urchins have abandoned the feeding larva altogether and develop directly into a juvenile, with drastically altered cleavage and gastrulation. What persists across a phylum is a conserved core of the programme, not a sequence of ancestral adults.
:::

## The genetic toolkit

::: definition Toolkit genes {#def-toolkit}
The **developmental genetic toolkit** is the set of genes, shared across animals (and, with different members, across plants), that control the formation of body axes, the identities of body regions, cell types and organs, and the growth and shape of structures. It consists mainly of genes for transcription factors (homeodomain proteins including Hox, Pax and NK proteins; T-box, Forkhead, bHLH, zinc-finger and nuclear-receptor proteins) and for components of the few signalling pathways (Hedgehog, Wnt, TGF-β/BMP, RTK/FGF, Notch, nuclear receptors). Mutations in toolkit genes typically cause major changes in pattern.
:::

The first and most famous example is the Hox cluster ([[developmental-biology/segmentation-hox]]). Hox genes are present in clusters in almost all bilaterian animals, with the same colinear relationship between position in the cluster and position of expression along the body. Their common ancestor must therefore already have had a Hox cluster patterning an anterior–posterior axis. Vertebrates have four clusters, the products of two rounds of whole-genome duplication early in vertebrate evolution; teleost fishes such as the zebrafish have seven, after a further duplication in their ancestry followed by loss of one cluster.

### Eyes and deep homology

Eyes evolved, according to the classical view, perhaps forty or more times independently: the camera eye of the octopus and that of a vertebrate are built quite differently, and the compound eye of an insect differs from both. Yet in 1995 Georg Halder, Patrick Callaerts and Walter Gehring showed that expressing the *Drosophila* gene *eyeless* in the imaginal discs that form legs, wings and antennae induced extra, morphologically normal compound eyes on these appendages. *eyeless* encodes a Pax6 transcription factor. More strikingly, the *mouse* *Pax6* gene also induced ectopic compound eyes in the fly — fly eyes, not mouse eyes, because the mouse protein switched on the fly's own eye-building programme. *Pax6* mutations cause small or absent eyes in mice (*Small eye*) and humans (aniridia), and *Pax6* homologues are expressed in the developing eyes of squid, flatworms and many other animals.

The eyes of flies and mice are not homologous as structures: their common ancestor surely had no compound or camera eye. But the genetic circuit that initiates eye development, and probably the photoreceptor cell type with its opsin, is homologous. Neil Shubin, Clifford Tabin and Sean Carroll called this **deep homology**.

::: definition Deep homology {#def-deep-homology}
**Deep homology** is the sharing, by structures that are not homologous as structures (that evolved independently), of homologous genetic regulatory circuits that build them. It implies that a common ancestor possessed the circuit, perhaps controlling a simpler precursor structure, which was later recruited independently into the development of different organs.
:::

Other examples followed. The *Drosophila* gene *tinman* and its vertebrate relative *Nkx2-5* are needed for the heart in both. The *Distal-less* gene is expressed at the tips of outgrowing appendages in arthropods, vertebrate limbs and fins, the tube feet of sea urchins, and the parapodia of annelids (Grace Panganiban, Carroll and colleagues, 1997). Most striking of all, the dorsal–ventral axis of insects and vertebrates is patterned by the same pair of molecules, a BMP (Dpp in flies, BMP4 in vertebrates) and its antagonist (Sog and Chordin) — but with the axis inverted ([[developmental-biology/axis-formation]], [[developmental-biology/gastrulation]]). In 1995 Scott Holley, Edwin Ferguson and colleagues showed that the proteins are interchangeable: frog Chordin promotes ventral (nerve-cord) fates in the fly, and fly Sog promotes dorsal fates in the frog. The idea that vertebrates are "upside-down" invertebrates had been proposed by Étienne Geoffroy Saint-Hilaire in 1822, and ridiculed for more than a century.

::: example Interpreting a cross-species rescue {#ex-rescue}
Consider three experiments. (i) Mouse *Pax6* expressed in a fly leg disc induces a fly compound eye. (ii) Fly *sog* mRNA injected into the ventral side of a frog embryo induces a secondary axis with a neural tube. (iii) A mouse *Hoxb6* gene expressed in a fly embryo transforms head segments towards thoracic identity, as the fly's own *Antennapedia* would. What does each tell you, and what does each *not* tell you?
::: solution
In each case a protein from one phylum can substitute for its homologue in another: the biochemical function of the protein (binding similar DNA sites or the same ligands) has been conserved for over 550 million years. The output of the experiment is always the host's structure — a fly eye, a frog neural tube, a fly thorax — because the protein acts by switching on the host's own target genes. The experiments do *not* show that the structures themselves are homologous (fly and mouse eyes are not), nor that the gene played the same role in the common ancestor; they show that a regulatory relationship between a toolkit gene and a developmental programme is ancient. Together with conserved expression patterns, they allow us to infer that the common ancestor (the "urbilaterian") used Pax6 in light-sensing cells, a BMP–antagonist pair to pattern one axis, and a Hox cluster to pattern another.
:::
:::

## Why regulatory evolution?

If the toolkit is shared, how do animals come to differ? The genes encoding toolkit proteins are among the most conserved in the genome. Changes in form must therefore come largely from changes in how those genes are deployed — in their **cis-regulatory elements**, the enhancers that control where and when each gene is expressed ([[molecular-biology/eukaryotic-gene-regulation]]). This argument, developed by Eric Davidson, Sean Carroll and others, rests on two properties of developmental genes.

::: definition Pleiotropy and modularity {#def-pleiotropy}
A gene is **pleiotropic** if it affects several distinct traits. Most toolkit genes are highly pleiotropic: *Pitx1* is needed for the pituitary, jaw and hindlimbs; *Shh* for neural tube, limbs, gut, teeth and more. A gene's regulation is **modular** if its expression in different tissues is controlled by separate enhancers, each of which can change without affecting the others — like the separate stripe enhancers of *even-skipped*.
:::

A mutation in the coding sequence of a pleiotropic gene alters the protein everywhere it is made, so a change that might be favourable in one tissue is likely to be harmful in others. A mutation in one enhancer alters expression only in the tissue that enhancer serves. Fisher's geometric model of adaptation makes this quantitative.

::: proposition Fisher's geometric model: pleiotropy reduces the chance of a beneficial mutation {#prop-fisher}
Represent a phenotype by a point in an $n$-dimensional space of independent traits, with the optimum at distance $d$ from the current phenotype, and suppose that a mutation moves the phenotype by a fixed distance $r$ in a random direction. For large $n$, the probability that the mutation brings the phenotype closer to the optimum is approximately

$$
P_\mathrm{ben} \approx 1 - \Phi\left(\frac{r\sqrt n}{2d}\right),
$$ {#eq-fisher}

where $\Phi$ is the standard normal cumulative distribution function. $P_\mathrm{ben}$ falls towards 0 as $n$ (the number of traits a mutation affects, a measure of pleiotropy) increases, and approaches $1/2$ for very small mutations. Assumptions: fitness depends only on distance from a single optimum; mutation effects are isotropic (equally likely in all directions); $n$ is large. Ronald Fisher stated the result in 1930; it is a model, and the real distribution of mutational effects is more complicated.
:::

::: widget plot
f: 0.5*(1 - erf((q*sqrt(x)/2)/sqrt(2)))
x: 1, 100
y: 0, 0.55
sliders: q=0.2:0.02:1:0.01
labels: P_\mathrm{ben}
caption: Fisher's geometric model [[#eq-fisher]]: the probability that a random mutation is beneficial, against the number of traits $n$ it affects (horizontal axis), for a mutation whose size relative to the distance from the optimum is $q = r/d$ (slider). With $q = 0.2$ the probability falls from 0.46 for a mutation affecting one trait to 0.16 for one affecting 100. Larger mutations (raise $q$) are penalised by pleiotropy much more severely. A mutation in a single enhancer, affecting one tissue, behaves like a mutation of small $n$; a change to a protein used in many tissues, like a mutation of large $n$.
:::

::: example Pleiotropy and the chance of improvement {#ex-fisher}
Using [[#eq-fisher]] with $r/d = 0.2$, compute the probability that a mutation is beneficial if it affects (a) 1 trait, (b) 10 traits, (c) 100 traits. (d) Interpret the results for a mutation in the coding region of *Pitx1* versus one in its pelvic enhancer.
::: solution
The argument of $\Phi$ is $0.2\sqrt n/2 = 0.1\sqrt n$.

(a) $n = 1$: $1 - \Phi(0.1) = 1 - 0.540 = 0.46$. (The large-$n$ approximation is crude here, but the qualitative point stands.)

(b) $n = 10$: $1 - \Phi(0.316) = 1 - 0.624 = 0.38$.

(c) $n = 100$: $1 - \Phi(1.0) = 1 - 0.841 = 0.16$.

(d) A coding change in *Pitx1* affects the pituitary, the jaw and the hindlimbs together; even if reducing the pelvis were favoured, the change would very likely damage something else. A deletion of the pelvic enhancer affects only the hindlimb region. In the model it is a low-$n$ mutation, with a much higher chance of being beneficial overall — which helps explain why, when sticklebacks lose their pelvic spines, they do so by losing the enhancer.
:::
:::

### Case studies of cis-regulatory evolution

**Stickleback pelvic reduction.** The marine three-spined stickleback (*Gasterosteus aculeatus*) has a pelvis with sharp spines, a defence against fish predators. Freshwater populations that colonised lakes after the last ice age have repeatedly lost the pelvis, perhaps because the spines offer handholds to predatory insect larvae and calcium is scarce. Michael Shapiro, David Kingsley and colleagues showed in 2004 that the loss maps to *Pitx1*, a gene encoding a homeodomain transcription factor, but that the *Pitx1* protein is unchanged in the reduced fish; its expression is lost specifically in the developing pelvic region, while expression in the jaw and pituitary is normal. In 2010 Yingguang Frank Chan, Kingsley and colleagues found that different freshwater populations carry different deletions removing the same pelvic enhancer, *Pel*, which lies in a fragile region of the genome — the same evolutionary change happening again and again by independent mutations. Reintroducing the marine enhancer into a freshwater fish restored pelvic development.

**Wing spots in flies.** Males of *Drosophila biarmipes* have a dark spot near the tip of each wing, which they display in courtship; *D. melanogaster* does not. The spot is made by expression of the pigmentation gene *yellow* in that region. Nicolas Gompel, Benjamin Prud'homme, Patricia Wittkopp, Victoria Kassner and Carroll showed in 2005 that the spot arose by the evolution of new transcription-factor binding sites in an existing *yellow* wing enhancer, so that ancient wing-patterning regulators — including Engrailed, and Distal-less, as Laurent Arnoult, Gompel and colleagues showed in 2013 — now control *yellow* at the tip. New traits can thus evolve by connecting existing toolkit regulators to existing effector genes through small changes in regulatory DNA.

**Limb loss in snakes.** Snakes have lost their limbs (pythons retain small hindlimb vestiges). Evgeny Kvon, Axel Visel, Len Pennacchio and colleagues replaced the limb enhancer of *Shh*, the ZRS ([[developmental-biology/organogenesis]]), in mice with the corresponding sequence from snakes in 2016: the mice formed severely truncated limbs, and a 17-base-pair deletion in the snake sequence, which removes binding sites for transcription factors, was largely responsible. Restoring those base pairs restored the limbs.

**Domestication of maize.** Maize was domesticated from the wild grass teosinte in Mexico roughly 9000 years ago. Teosinte has long side branches, each tipped with male flowers; maize has a single main stalk with short side branches carrying ears. John Doebley and colleagues identified the gene responsible for much of this difference, *teosinte branched1* (*tb1*), which encodes a transcription factor repressing branch growth; maize expresses it at higher levels. In 2011 Anthony Studer, Doebley and colleagues showed that a transposon inserted about 60 kb upstream of *tb1*, in a regulatory region, enhances its expression — again a regulatory, not a coding, change ([[biotechnology/agricultural-biotechnology]]).

::: application Evo-devo in agriculture and medicine
The same logic that explains evolutionary change helps to interpret human genetic variation: most variants associated with differences in human traits and disease risk in genome-wide association studies lie in non-coding, often regulatory, DNA ([[genomics/association-studies]]), and mutations in distant enhancers such as the ZRS cause congenital limb malformations. In crop breeding, many domestication traits — branching in maize, fruit size in tomato ([[developmental-biology/plant-development]]), the shattering of seed heads in rice and wheat — trace to regulatory changes in developmental genes, and editing regulatory regions is now used to generate new variation.
:::

### Protein evolution matters too

Regulatory evolution is not the whole story. Changes in coding sequence produce many adaptive traits, especially in genes that are not highly pleiotropic, such as the pigmentation receptor gene *Mc1r*, mutated in light-coloured beach mice and in many domestic animals. Hopi Hoekstra and Jerry Coyne argued in 2007 that the case for the primacy of cis-regulatory evolution had been overstated, and that the available data were biased towards cases where regulatory changes were easy to find. Even toolkit proteins sometimes change in ways that matter: Matthew Ronshaugen, Nadine McGinnis and William McGinnis showed in 2002 that the Ubx protein of insects gained a short region that lets it repress *Distal-less* fully, a change that may have contributed to the loss of abdominal legs in insects compared with their crustacean relatives. The current view is that both kinds of change contribute, with cis-regulatory changes especially prominent for morphological traits controlled by pleiotropic toolkit genes.

## Changes in timing, place and amount

Developmental changes underlying evolution can be classified by what they alter.

::: definition Four kinds of developmental change {#def-hetero}
- **Heterochrony**: a change in the relative timing or rate of developmental events.
- **Heterotopy**: a change in the location of a developmental process (for example, expression of a gene in a new place).
- **Heterometry**: a change in the amount of a gene product or structure.
- **Heterotypy**: a change in the kind of gene product (for example, a new protein function).
:::

### Heterochrony

**Paedomorphosis** is the retention of juvenile features in the adult, either by slowing somatic development relative to reproductive maturation (**neoteny**) or by maturing reproductively earlier (**progenesis**). The axolotl, *Ambystoma mexicanum*, is the classic neotenic salamander: it normally reaches sexual maturity while keeping its larval gills, fins and aquatic life, because it produces too little thyroid hormone to trigger metamorphosis; treating it with thyroid hormone makes it metamorphose into a terrestrial adult. Heterochrony can also act on individual organs and genes: snakes produce many more somites than mice because their segmentation clock runs fast relative to their growth ([[developmental-biology/segmentation-hox]]) — a heterochronic change in two coupled processes.

### Allometry

Changes in relative growth rates produce changes in shape. Julian Huxley described in 1932 how the size of a part often scales with the size of the whole according to a power law.

::: proposition Allometric growth (an empirical description) {#prop-allometry}
If the size $y$ of a part and the size $x$ of the whole grow at specific rates (relative growth rates) in a constant ratio $b$, that is $\frac{1}{y}\frac{dy}{dt} = b\,\frac{1}{x}\frac{dx}{dt}$, then

$$
y = a\,x^{b}, \qquad \log y = \log a + b\log x,
$$ {#eq-allometry}

so the relationship is a straight line of slope $b$ on log–log axes. $b = 1$ is **isometry** (shape unchanged), $b > 1$ **positive allometry** (the part becomes relatively larger) and $b < 1$ **negative allometry**. A change in either $a$ or $b$ changes the shape of the adult. Many biological size relationships are approximately allometric over a limited range, but this is an empirical description, not a law.
:::

::: proof
Dividing the two specific growth rates gives $d\ln y/d\ln x = b$; integrating, $\ln y = b\ln x + \ln a$.
:::

::: widget plot
f: a*x^b; x
x: 0, 10
y: 0, 30
sliders: a=0.5:0.1:2:0.05; b=1.6:0.5:2:0.05
labels: \text{part } y = a x^b; \text{isometry } (y = x)
caption: Allometric growth [[#eq-allometry]]: size of a part against size of the whole (arbitrary units), compared with isometry. With $b = 1.6$, about the exponent of a male fiddler crab's large claw against body size, the claw becomes disproportionately large as the crab grows. Drag $b$ below 1 and the part becomes relatively smaller with size, like the head of a growing human. Small changes in $b$ — a change in relative growth rates, a form of heterochrony — produce large changes in adult shape at large sizes.
:::

::: example Measuring an allometric exponent {#ex-allometry}
In a sample of growing male crabs, an individual weighing 1 g has a claw weighing 0.05 g, and one weighing 8 g has a claw of 1.4 g. (a) Estimate the allometric exponent $b$, assuming [[#eq-allometry]]. (b) What fraction of body mass is the claw in each crab? (c) Predict the claw mass of a 20 g crab.
::: solution
(a) $b = \ln(1.4/0.05)/\ln(8/1) = \ln28/\ln8 = 3.332/2.079 = 1.60$.

(b) $0.05/1 = 5\,\%$ and $1.4/8 = 17.5\,\%$: the claw's share of body mass more than triples.

(c) With $a = 0.05$ (the claw mass at 1 g), $y = 0.05\times20^{1.6} = 0.05\times121 = 6.1$ g, about 30 % of body mass. In real crabs the exponent is estimated from many individuals by regression on log–log axes, and it often changes at the moult of sexual maturity.
:::
:::

### Heterotopy and heterometry

**Heterotopy** — a change in where a gene is expressed — is the commonest consequence of cis-regulatory evolution, and the wing spot and stickleback pelvis are examples. **Heterometry** — a change in how much — can reshape structures continuously. Arhat Abzhanov, Clifford Tabin and colleagues showed in 2004 that among Darwin's finches of the Galápagos, the ground finches with deep, broad beaks for cracking seeds express *Bmp4* earlier and at higher levels in the beak mesenchyme than species with slender beaks; raising BMP4 levels in chick embryos made their beaks deeper and broader. In 2006 the same group found that higher expression of calmodulin, a calcium-signalling protein, correlates with longer beaks, as in the cactus finches, and lengthens chick beaks experimentally. Two independent regulatory axes, depth and length, can thus be tuned separately.

In arthropods, shifts in the expression domains of Hox genes have accompanied changes in the body plan. Michalis Averof and Nipam Patel showed in 1997 that in crustaceans in which the first thoracic limbs are modified into feeding appendages (maxillipeds), the anterior boundary of *Ubx* and *abd-A* expression has shifted posteriorly, leaving those segments without these Hox proteins; the correlation held across several independent origins of maxillipeds.

::: quiz
In a lineage of fishes, a pelvic fin has been lost repeatedly. Crosses show that the loss maps near a toolkit gene that is also required for jaw development, but the coding sequence of the gene is identical in fish with and without fins. What is the most likely cause?
- [ ] A loss-of-function mutation in the protein-coding region
- [x] Mutations in a pelvic-specific enhancer of the gene
- [ ] Deletion of the whole gene
- [ ] A change in the genetic code of the lineage
::: solution
The coding sequence is unchanged, so the protein is normal; deleting the whole gene, or damaging its protein, would also abolish its essential function in the jaw. Loss of a tissue-specific enhancer removes expression in the pelvic region alone, consistent with the repeated, viable loss — exactly the stickleback *Pitx1* story.
:::
:::

## Development and the direction of evolution

Development can bias evolution as well as being changed by it. Some variants are easily produced by the developmental system and others hardly at all, so variation is not uniformly distributed among all imaginable forms — a **developmental bias** or **constraint**. All mammals except a few (sloths and manatees) have exactly seven neck vertebrae, perhaps because changes in vertebral number in the neck are linked by shared Hox regulation to harmful changes elsewhere; in contrast, the number of digits rarely exceeds five in living tetrapods, yet extra digits arise readily as developmental variants (polydactyly).

Development also links the environment to evolution. Many animals and plants develop differently in different environments — **phenotypic plasticity** ([[developmental-biology/plant-development]]). Waddington showed in 1953 that when *Drosophila* pupae were heat-shocked, some flies developed wings lacking crossveins; by selecting and breeding from these flies for some generations, he obtained lines in which the crossveinless phenotype appeared even without heat shock. He called this **genetic assimilation**: a trait first induced by the environment became genetically fixed, because selection accumulated alleles that lowered the threshold for producing it. It shows how plastic responses can become the starting point of evolutionary change.

::: example Testing a candidate gene with a genetic cross {#ex-stickleback-cross}
A marine stickleback with a full pelvis is crossed with a freshwater fish without one. All F₁ have a full pelvis. Among 400 F₂ offspring (hypothetical data), 312 have a full pelvis and 88 a reduced pelvis. (a) What ratio would you expect if reduction were caused by a recessive allele at a single locus? (b) Test the data against that ratio with a χ² test. (c) What would you do next to test whether the locus is *Pitx1*?
::: solution
(a) 3 full : 1 reduced, i.e. 300 : 100 out of 400.

(b) $\chi^2 = (312 - 300)^2/300 + (88 - 100)^2/100 = 0.48 + 1.44 = 1.92$, with 1 degree of freedom. The 5 % critical value is 3.84, and $p \approx 0.17$, so the data are consistent with a single recessive locus ([[biostatistics/categorical-data]]). (Real crosses show a major locus plus smaller modifiers.)

(c) Genotype the F₂ for markers near *Pitx1*: reduced-pelvis fish should be homozygous for the freshwater haplotype there. Then compare *Pitx1* expression in the developing pelvic region of marine and freshwater embryos, sequence the coding region and the surrounding enhancers, and finally test function by transgenesis — introducing the marine enhancer driving *Pitx1* into freshwater fish and checking for restored pelvic development, as Chan and colleagues did.
:::
:::

::: history
Von Baer's laws (1828) and Darwin's use of embryology (1859) linked development and evolution; Haeckel's biogenetic law (1866) dominated, then discredited, the field. Gavin de Beer's *Embryos and Ancestors* (1940) and Stephen Jay Gould's *Ontogeny and Phylogeny* (1977) revived heterochrony. Roy Britten and Eric Davidson (1969) and Mary-Claire King and Allan Wilson (1975) proposed that regulatory changes underlie much evolutionary change — King and Wilson noting that humans and chimpanzees differ little in protein sequence. The modern field began with the discovery of the homeobox in 1984 and its conservation across animals, followed by the ectopic eyes of 1995, the sog–chordin inversion of 1995 and the mapping of natural variation to toolkit enhancers in the 2000s.
:::

::: summary
- Embryos of related species share a conserved core of development, most similar at a mid-embryonic phylotypic stage (the hourglass); embryos do not recapitulate ancestral adults.
- A shared toolkit of transcription factors and signalling pathways builds animals as different as flies and mice. Hox clusters, Pax6 in eyes, Nkx2-5/tinman in hearts, Distal-less in appendages and the BMP–Chordin/Sog system (with an inverted axis) reveal deep homology: homologous circuits in non-homologous structures.
- Toolkit genes are pleiotropic but modularly regulated, so evolution of form often proceeds by cis-regulatory change. Fisher's geometric model quantifies why: the probability of a beneficial mutation, $\approx 1 - \Phi(r\sqrt n/2d)$, falls as the number of traits affected rises.
- Case studies: stickleback *Pitx1* pelvic-enhancer deletions; the *yellow* wing-spot enhancer; the snake ZRS; maize *tb1*. Coding changes also matter (e.g. *Mc1r*, insect Ubx).
- Developmental changes include heterochrony (axolotl neoteny), heterotopy, heterometry (finch beaks: Bmp4 for depth, calmodulin for length) and heterotypy. Allometry $y = ax^b$ describes how shape changes with size.
- Development biases evolution (constraints such as seven cervical vertebrae) and connects it to environment through plasticity and genetic assimilation.
:::

## Exercises

::: exercise Kinds of change {level=1}
Classify each as heterochrony, heterotopy, heterometry or heterotypy: (a) a salamander species reaches sexual maturity with larval gills; (b) *yellow* becomes expressed in a new spot on the wing; (c) ground finches express more *Bmp4* in the beak; (d) the Ubx protein acquires a new repression domain.
::: solution
(a) Heterochrony (paedomorphosis by neoteny). (b) Heterotopy. (c) Heterometry. (d) Heterotypy.
:::
:::

::: exercise An allometric exponent {level=1 check="1.5"}
A part grows from 2 to 16 units while the whole grows from 4 to 16 units. Assuming $y = ax^b$, what is $b$?
::: solution
$b = \ln(16/2)/\ln(16/4) = \ln8/\ln4 = 3/2 = 1.5$.
:::
:::

::: exercise Hox clusters {level=1 check="7"}
After two rounds of whole-genome duplication, an ancestral vertebrate had four Hox clusters. A further duplication in the ancestor of teleost fishes doubled this number, after which one cluster was lost. How many Hox clusters does the zebrafish have?
::: solution
$4\times2 - 1 = 7$.
:::
:::

::: exercise Pleiotropy in Fisher's model {level=2 check="0.24"}
Using [[#eq-fisher]] with $r/d = 0.2$, what is the probability (two decimal places) that a mutation affecting 50 traits is beneficial?
::: solution
$1 - \Phi(0.1\sqrt{50}) = 1 - \Phi(0.707) = 1 - 0.760 = 0.24$.
:::
:::

::: exercise Deep homology or convergence? {level=2}
For each pair, say whether the structures are homologous, and whether the genetic circuits building them show deep homology: (a) the wings of a bat and of a bird; (b) the wings of a bird and of a fly; (c) the camera eyes of an octopus and of a human.
::: solution
(a) Homologous as forelimbs (both tetrapod forelimbs, built by the same limb programme), though wings evolved independently in each lineage — homologous as limbs, convergent as wings. (b) Not homologous: insect wings are outgrowths of the body wall with no counterpart in vertebrates; any shared genes (e.g. *Distal-less*-related appendage genes) would be deep homology. (c) Not homologous as structures (built from different tissues, the octopus retina has no blind spot), but both use Pax6 to initiate eye development and share photoreceptor opsins: deep homology of the underlying circuit.
:::
:::

::: exercise A χ² test {level=2 check="2.15"}
In another (hypothetical) F₂ of 300 sticklebacks, 236 have a full pelvis and 64 a reduced one. Test against a 3 : 1 ratio: what is $\chi^2$ (three significant figures), and is the ratio rejected at the 5 % level?
::: solution
Expected 225 : 75. $\chi^2 = (236-225)^2/225 + (64-75)^2/75 = 121/225 + 121/75 = 0.538 + 1.613 = 2.15$, with 1 degree of freedom. Since $2.15 < 3.84$, the 3 : 1 ratio is not rejected.
:::
:::

::: exercise Genetic assimilation {level=3}
In Waddington's experiment, a population of flies is heat-shocked as pupae each generation, and only flies showing the crossveinless phenotype are bred. After about 14 generations, some flies show the phenotype without heat shock. (a) Explain this result with a threshold model, in which many alleles each contribute to a liability and the phenotype appears when liability plus environmental effect exceeds a threshold. (b) Why does this not demonstrate the inheritance of acquired characteristics? (c) What control would strengthen the conclusion?
::: solution
(a) Each fly's liability is the sum of many small allelic effects plus the environmental effect of heat shock. Initially only flies near the top of the liability distribution exceed the threshold after heat shock. Selecting them raises the mean genetic liability each generation; eventually some flies' genetic liability alone exceeds the threshold, so they show the phenotype without heat shock.

(b) Heat shock did not change the genes; it revealed existing genetic variation in liability by bringing the phenotype within reach, and selection then increased the frequency of high-liability alleles. Without that standing variation, nothing would have been assimilated.

(c) Maintain a parallel line heat-shocked every generation but bred without selection (or with selection against the phenotype): if the phenotype does not appear spontaneously there, the result depends on selection rather than on the heat shocks themselves. Using an inbred starting population, with little genetic variation, should also greatly reduce or abolish the response.
:::
:::

::: exercise Reading a regulatory-evolution experiment {level=3}
In the snake ZRS experiment, mice carrying the python ZRS in place of their own ZRS developed truncated limbs, whereas mice carrying the ZRS of a human or of the coelacanth (a lobe-finned fish) developed normal limbs. Restoring a 17-base-pair sequence missing from the python ZRS restored normal limbs. (a) What does each result show? (b) Why was it important to test human and coelacanth sequences as well as snake? (c) Why might evolution have acted on the enhancer rather than on *Shh* itself?
::: solution
(a) The python ZRS cannot drive adequate *Shh* expression in the mouse limb bud, so the limb is truncated (as in mice lacking the ZRS). The human and coelacanth ZRS can, so the enhancer's function in limb development is ancient and conserved across vertebrates, including fish fins. Restoring the 17 base pairs shows that this deletion is a major cause of the loss of function.

(b) The controls rule out the trivial explanation that any foreign enhancer fails in mice because of sequence divergence; only the snake sequence fails, so the defect is specific to the snake lineage.

(c) *Shh* is required for the neural tube, gut, lungs and many other organs; damaging the gene would be lethal. The ZRS is a limb-specific module: its loss eliminates limb expression without touching other functions, as Fisher's model predicts for a low-pleiotropy mutation.
:::
:::
