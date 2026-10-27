The only figure in *On the Origin of Species* is a branching diagram. Darwin drew it to show how species descending from common ancestors diverge, branch and go extinct, so that living species are the tips of a tree whose internal branches are their extinct ancestors. A **phylogeny** is a hypothesis about that tree for a particular group: which species share more recent ancestors with which. Phylogenies are now the framework for almost all of comparative biology. They tell us whether a trait evolved once or many times, in what order traits appeared, how fast lineages diversified, when viruses jumped between hosts, and where a newly sequenced microbe belongs among the living.

This chapter is in two parts. The first is about *reading* trees — the vocabulary of clades and characters, and the common mistakes in interpreting them. The second is about *building* trees from data: parsimony and Fitch's algorithm, distances and their correction for multiple substitutions, the UPGMA and neighbour-joining methods, likelihood and Bayesian methods in outline, and how to assess confidence. We derive the number of possible trees, which shows why tree-building is computationally hard, and end with molecular dating and with the reason gene trees can differ from species trees. The algorithms are developed further in [[bioinformatics]].

## Reading trees

::: definition Phylogenetic tree and its parts {#def-tree}
A **phylogenetic tree** is a branching diagram representing the evolutionary relationships of a set of **taxa** (species, populations, genes, or other units). The taxa are the **leaves** (tips, terminal nodes); the branch points are **internal nodes**, representing common ancestors; the lines are **branches** (edges). A **rooted** tree has a designated node, the **root**, representing the common ancestor of all the taxa, which gives every branch a direction in time; an **unrooted** tree shows only the pattern of relatedness. In a **bifurcating** (binary) tree every internal node has two descendants; a node with more is a **polytomy**, usually expressing uncertainty. Branch lengths may be drawn proportional to the amount of change, or to time; a tree in which all tips are equidistant from the root in time is **ultrametric**.
:::

::: definition Monophyly and clades {#def-clade}
A **clade** (monophyletic group) is a group consisting of an ancestor and *all* of its descendants. A **paraphyletic** group contains an ancestor and some but not all of its descendants. A **polyphyletic** group contains taxa from several lineages without their most recent common ancestor. Two clades that are each other's closest relatives are **sister groups**.
:::

The traditional "reptiles" — turtles, lizards, snakes, crocodiles — are paraphyletic, because crocodiles share a more recent common ancestor with birds than with lizards: a clade containing crocodiles and lizards must also contain birds. Similarly "fish" excluding tetrapods is paraphyletic, and "warm-blooded animals" (birds plus mammals) is polyphyletic, since endothermy evolved separately in the two lineages. Modern classification, following the German entomologist Willi Hennig (*Grundzüge einer Theorie der phylogenetischen Systematik*, 1950; English translation *Phylogenetic Systematics*, 1966), names only clades. This is why biologists say that birds are dinosaurs, and that humans are fish — in the sense that we belong to the clade of bony fishes, Osteichthyes.

::: warning Reading trees as ladders
Three mistakes are common. (1) *Reading across the tips.* The order of the tips along the page carries no information: rotating the two branches at any node gives the same tree. A tree with humans at the right-hand end does not mean humans are the most advanced; the tip at the end is no more "derived" than the others. (2) *Counting nodes as progress.* Living species are all equally old — each has an unbroken lineage back to the root — and no living species is the ancestor of another. A "basal" lineage (such as the platypus among mammals) is a lineage that branched off early, not a primitive species: it has had just as long to evolve. (3) *Judging relatedness by distance along the tips.* Relatedness is given by the most recent common ancestor: on a tree ((frog, (lizard, (bird, crocodile))), mammal) …, a bird is more closely related to a crocodile than a crocodile is to a lizard, however the tips are drawn.
:::

### Characters, homology and homoplasy

Trees are inferred from **characters**: anatomical features, DNA positions, gene orders. Each character has **states** (feathers present or absent; base A, C, G or T at position 341). A change of state on a branch is an evolutionary event.

::: definition Apomorphy, plesiomorphy and synapomorphy {#def-apomorphy}
For a given clade, an **apomorphy** is a derived character state, which arose in the clade's ancestor; a **plesiomorphy** is an ancestral state, inherited from further back. A **synapomorphy** is a derived state shared by two or more taxa because they inherited it from their common ancestor; a **symplesiomorphy** is a shared ancestral state; an **autapomorphy** is a derived state unique to one taxon. Hennig's central principle is that only synapomorphies are evidence for grouping taxa into clades. **Homoplasy** — similarity not due to common ancestry ([[evolution/evidence-for-evolution#def-homology]]) — arises by **convergence** (independent gain) or **reversal** (return to an ancestral state), and misleads.
:::

Hair is a synapomorphy of mammals, uniting them; but four limbs, shared by mammals and lizards, is a symplesiomorphy within tetrapods, and says nothing about whether lizards are closer to mammals or to birds. To decide which state is ancestral, we use an **outgroup**, a taxon known to lie outside the group being studied (the **ingroup**): the state in the outgroup is taken as ancestral. Outgroups also **root** trees: the root is placed on the branch leading to the outgroup.

## How many trees are there?

Before building trees, it helps to see how many there are to choose from.

::: proposition The number of trees {#prop-ntrees}
The number of distinct unrooted bifurcating trees with $n \ge 3$ labelled leaves is

$$
U(n) = 1\times3\times5\times\cdots\times(2n - 5) = (2n - 5)!!,
$$ {#eq-unrooted}

and the number of rooted bifurcating trees with $n \ge 2$ labelled leaves is

$$
R(n) = (2n - 3)!! = U(n + 1).
$$ {#eq-rooted}
:::

::: proof
An unrooted bifurcating tree with $k$ leaves has $k - 2$ internal nodes (each of degree 3) and $2k - 3$ edges: by induction, starting from the single tree with 3 leaves (one internal node, 3 edges), each new leaf is attached by splitting an existing edge into two and adding a new edge to the new leaf, which adds one internal node and two edges.

Every tree with $k + 1$ leaves arises in exactly one way from a tree with $k$ leaves by attaching leaf $k + 1$ to one of its $2k - 3$ edges: deleting leaf $k + 1$ (and merging the two edges that met at its attachment node) recovers the smaller tree and the edge. Hence $U(k + 1) = (2k - 3)\,U(k)$, and with $U(3) = 1$:

$$
U(n) = 1\times3\times5\times\cdots\times(2(n - 1) - 3) = (2n - 5)!!.
$$

For rooted trees: rooting an unrooted tree with $n$ leaves on one of its $2n - 3$ edges gives each rooted tree exactly once, so $R(n) = (2n - 3)\,U(n) = (2n - 3)!!$. Equivalently, a root is like an extra leaf, so $R(n) = U(n + 1)$.
:::

::: example The explosion of tree space {#ex-ntrees}
How many unrooted trees are there for 4, 5, 6, 10, 20 and 50 taxa?
::: solution
By [[#eq-unrooted]]: $U(4) = 3$; $U(5) = 3\times5 = 15$; $U(6) = 15\times7 = 105$; $U(10) = 1\times3\times5\times\cdots\times15 = 2{,}027{,}025$; $U(20) = 35!! = 2.22\times10^{20}$; $U(50) = 95!! = 2.84\times10^{74}$ (all checked by computing the products exactly in Python). With 50 taxa there are more trees than there are atoms in the Earth (about $10^{50}$). Examining every tree is impossible beyond about a dozen taxa, so phylogenetic programs use heuristic searches: build a good starting tree, then rearrange it (by swapping subtrees) as long as the score improves. Finding the best tree under parsimony or likelihood is NP-hard.
:::
:::

::: widget plot
f: log10(gamma(2*x - 3)/(2^(x - 2)*gamma(x - 1)))
x: 3, 60
y: 0, 100
labels: \log_{10} U(n)
caption: The number of unrooted bifurcating trees for $n$ taxa, $(2n-5)!! = (2n-4)!/(2^{n-2}(n-2)!)$, plotted as a base-10 logarithm and computed through the gamma function so that $n$ can vary continuously. The curve bends upwards: the logarithm grows faster than linearly, roughly as $n\log_{10} n$. Hover at $n = 10$ (about 6.3, i.e. two million trees), $n = 20$ (20.3) and $n = 50$ (74.5).
:::

## Parsimony

The principle of **maximum parsimony** is to prefer the tree that requires the fewest character-state changes to explain the data. It was developed for morphological data by Hennig's followers and, for discrete characters generally, by Joseph Camin and Robert Sokal (1965) and James Farris (1970). Its logic is that, if change is rare, the tree that minimises change is most likely to be right.

The number of changes a character requires on a given tree is found by Fitch's algorithm (Walter Fitch, 1971).

::: algorithm Fitch parsimony for one character on a rooted bifurcating tree {#alg-fitch}
1. Assign to each leaf the set containing its observed state.
2. Visit the internal nodes from the leaves towards the root (post-order). At a node with children having sets $S_1$ and $S_2$: if $S_1\cap S_2 \ne \varnothing$, assign $S_1\cap S_2$; otherwise assign $S_1\cup S_2$ and add 1 to the count of changes.
3. The count when the root is reached is the minimum number of changes the character needs on this tree. (A second, top-down pass picks one state for each node from its set to obtain a most-parsimonious reconstruction.)
4. The **length** of the tree is the sum of the counts over all characters; the most parsimonious tree is the one with the smallest length. For an unrooted tree, root it on any branch: the count does not depend on where.
:::

::: example Parsimony with four taxa {#ex-fitch}
Five aligned sites in four taxa are:

| site | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| A | G | T | C | A | G |
| B | G | T | T | A | A |
| C | A | C | C | A | A |
| D | A | C | T | G | G |

Find the length of each of the three unrooted trees, T1 = AB|CD, T2 = AC|BD and T3 = AD|BC, and the most parsimonious tree.
::: solution
With four taxa, a site with two states is **parsimony-informative** only if each state occurs in at least two taxa; it then needs one change on the tree that separates its two pairs, and two on the other trees. Sites 1 and 2 split AB from CD; site 3 splits AC from BD; site 5 splits AD from BC. Site 4 (only D differs) needs one change on every tree, and so does not help to choose.

Check site 3 on T1, rooted between the pairs: A{C} and B{T} have empty intersection, so their ancestor gets {C, T} and one change; C{C} and D{T} likewise, one change; at the root {C, T} ∩ {C, T} = {C, T}, no change. Total 2, as expected.

Lengths: T1 $= 1 + 1 + 2 + 1 + 2 = 7$; T2 $= 2 + 2 + 1 + 1 + 2 = 8$; T3 $= 2 + 2 + 2 + 1 + 1 = 8$. The most parsimonious tree is T1, ((A,B),(C,D)), supported by two sites against one each for the others. The minimum conceivable length, one change per state beyond the first at each site, is 5, so the **consistency index** of T1 is $CI = 5/7 = 0.71$: two of its seven changes are homoplasies.
:::
:::

Parsimony is simple and makes no explicit model of evolution, but that is also its weakness. Where change is frequent, parallel changes on two long branches can outnumber the true synapomorphies, and parsimony then groups the long branches together however much data are added. Joseph Felsenstein (1978) proved this **long-branch attraction**: with some combinations of branch lengths, parsimony is *statistically inconsistent* — it converges on the wrong tree. Methods based on explicit models of substitution do better.

## Distance methods

A distance method first turns the data into a matrix of pairwise distances between taxa, then builds the tree that best fits the matrix. The simplest distance between two aligned sequences is the **p-distance**, the proportion of sites that differ. But it underestimates the number of substitutions, because a site that changed twice, or changed and changed back, may show one difference or none. As divergence increases, $p$ saturates.

::: proposition The Jukes–Cantor correction {#prop-jc}
Suppose each site changes at a constant rate, with every one of the three other bases equally likely to replace the current one (the **Jukes–Cantor model**, Thomas Jukes and Charles Cantor, 1969). If $d$ is the expected number of substitutions per site separating two sequences, the expected proportion of differing sites is

$$
p = \frac34\left(1 - e^{-4d/3}\right),
$$

so a distance estimated from an observed $p$ is

$$
d = -\frac34\ln\!\left(1 - \frac43p\right).
$$ {#eq-jc}
:::

::: proof
Follow one site along the path joining the two sequences, of total length $d$ measured in expected substitutions, and let $P(x)$ be the probability that the site at distance $x$ along the path has the same base as at the start. Substitutions occur at rate 1 per unit of $x$. If the base is currently the original one (probability $P$), any substitution changes it; if it is one of the other three (probability $1 - P$), a substitution restores the original with probability $\tfrac13$. So

$$
\frac{dP}{dx} = -P + \frac13(1 - P) = \frac13 - \frac43P,
$$

with $P(0) = 1$. The solution is $P(x) = \tfrac14 + \tfrac34e^{-4x/3}$. The proportion of differing sites is $p = 1 - P(d) = \tfrac34(1 - e^{-4d/3})$; solve for $d$.
:::

For small $p$, $d \approx p$; as $p$ approaches $\tfrac34$ — the expected proportion of differences between two random sequences — $d$ goes to infinity, and no information about the number of substitutions remains. For $p = 0.1$, $d = 0.107$; for $p = 0.3$, $d = 0.383$; for $p = 0.5$, $d = 0.824$; for $p = 0.7$, $d = 2.03$. More realistic models allow transitions and transversions to differ in rate (Motoo Kimura's two-parameter model, 1980), unequal base frequencies, and variation in rate among sites.

::: widget plot
f: -0.75*ln(1 - 4*x/3); x
x: 0, 0.74
y: 0, 2.5
labels: d\ \text{(Jukes–Cantor)}; p
vlines: 0.75
caption: The Jukes–Cantor distance $d$ from [[#eq-jc]] against the observed proportion of differing sites $p$, with the line $d = p$ for comparison. For closely related sequences the two agree; at $p = 0.3$ the corrected distance is already 28 % larger, and as $p$ approaches the saturation value 0.75 (dashed line) the correction diverges. Notice how little the observed $p$ changes over the last part of the range: very divergent sequences carry almost no information about their distance.
:::

### UPGMA

The simplest tree-building algorithm from distances is **UPGMA** (unweighted pair-group method with arithmetic mean; Robert Sokal and Charles Michener, 1958).

::: algorithm UPGMA {#alg-upgma}
1. Treat each taxon as a cluster of size 1.
2. Find the two clusters $i$ and $j$ with the smallest distance $d_{ij}$. Join them under a new node placed at height $d_{ij}/2$ (half the distance, since each lineage contributes half).
3. Replace $i$ and $j$ by the new cluster $k$, with distance to every other cluster $l$ equal to the size-weighted average $d_{kl} = (n_id_{il} + n_jd_{jl})/(n_i + n_j)$.
4. Repeat steps 2–3 until one cluster remains.
:::

UPGMA produces an ultrametric, rooted tree: it assumes a strict molecular clock, so that all lineages have evolved at the same rate. When rates differ, it can give the wrong tree.

::: example UPGMA on the great apes {#ex-upgma}
Approximate genome-wide divergences (per cent of aligned sites, rounded, of the order reported in genome comparisons) between human (H), chimpanzee (C), gorilla (G) and orangutan (O) are: H–C 1.2; H–G 1.6; C–G 1.7; H–O 3.1; C–O 3.2; G–O 3.1. Build the UPGMA tree.
::: solution
Step 1: the smallest distance is H–C, 1.2. Join H and C at height 0.6. Distances from (HC): to G, $(1.6 + 1.7)/2 = 1.65$; to O, $(3.1 + 3.2)/2 = 3.15$.

Step 2: the smallest remaining distance is (HC)–G, 1.65. Join at height 0.825. Distance from (HCG) to O: size-weighted, $(2\times3.15 + 1\times3.1)/3 = 3.133$.

Step 3: join (HCG) and O at height 1.567.

The tree is (((H, C), G), O): humans and chimpanzees are sister species, gorillas their sister, orangutans outside — the relationship now supported by essentially all genomic data. With a calibration (say, orangutan divergence at around 15 Myr), heights can be turned into times, but these values ignore ancestral polymorphism and rate variation ([[#sec-dating]] and [[evolution/human-evolution]]).
:::
:::

**Neighbour joining** (Naruya Saitou and Masatoshi Nei, 1987) relaxes the clock assumption. Instead of joining the closest pair, it joins the pair $i, j$ that minimises

$$
Q_{ij} = (n - 2)\,d_{ij} - \sum_k d_{ik} - \sum_k d_{jk},
$$

which corrects for taxa that are far from all others because their own branch is long. Neighbour joining is fast — it builds a tree for thousands of sequences in seconds — and gives the correct tree whenever the distances are exactly additive (equal to the sums of branch lengths along a tree). It is widely used to build starting trees and for large data sets.

## Likelihood, Bayesian inference and confidence

**Maximum likelihood** (Felsenstein, 1981) chooses the tree and branch lengths under which the observed data are most probable, given an explicit model of substitution such as Jukes–Cantor or its generalisations. The likelihood of a tree is computed site by site, summing over all possible ancestral states with Felsenstein's **pruning algorithm**, a dynamic-programming method that works from the leaves to the root like Fitch's. Likelihood methods are statistically consistent under their model, cope with unequal rates, and make long-branch attraction much less severe. **Bayesian** methods (implemented, for example, in MrBayes, John Huelsenbeck and Fredrik Ronquist, 2001) combine the likelihood with prior distributions to give the posterior probability of each tree and clade, sampled by Markov chain Monte Carlo.

How confident should we be in a clade? Felsenstein (1985) introduced the **bootstrap**: resample the alignment's columns with replacement to make many pseudo-replicate data sets of the same size, build a tree from each, and record the percentage of replicates containing the clade. A **bootstrap support** of 95 % means that the clade is recovered from almost any resampling of the sites; 50 % means it depends on which sites happen to be included. Bootstrap values are not probabilities that the clade is true, and with large genomic data sets nearly everything gets 100 % support even when a systematic error (a wrong model) is driving the result, so agreement among different data and methods matters more than any single support value.

::: quiz
A tree built from 1000 sites gives a clade (X, Y) with bootstrap support 100 %. Which conclusion is justified?
- [ ] The clade (X, Y) is certainly correct.
- [x] The clade is strongly supported by these data under this method; it could still be wrong if the method is systematically biased (e.g. by long-branch attraction).
- [ ] 100 % of the sites support (X, Y).
- [ ] X is the ancestor of Y.
::: solution
The bootstrap measures how consistently the data, resampled, give the clade — a measure of sampling variability, not of systematic error. If X and Y are both on long branches and the model is inadequate, every replicate may give the same wrong answer with 100 % support. It does not mean all sites agree (a clear majority suffices), and sister taxa are not ancestor and descendant.
:::
:::

## Dating trees {#sec-dating}

A tree with branch lengths in substitutions per site can be converted into a time-tree with a **molecular clock** ([[evolution/mutation-drift-gene-flow#prop-neutralrate]]). The clock must be calibrated, usually with fossils: if the oldest fossil of a clade is reliably dated, the clade is at least that old, so the node gets a minimum age. **Relaxed-clock** methods (Bayesian programs such as BEAST, Alexei Drummond and colleagues, 2006) allow rates to vary among branches and use several calibrations with uncertainties, and are now standard.

::: example A fossil-calibrated clock {#ex-calibration}
Under a strict clock, species X and Y differ by a corrected distance of 0.080 substitutions per site, and the fossil record dates their split at 20 Myr. Species X and Z differ by 0.020. When did X and Z split? What is the substitution rate per lineage?
::: solution
Under a strict clock, distance is proportional to time: $t_{XZ} = 20\times0.020/0.080 = 5$ Myr. Each lineage accumulates half the distance, so the rate per lineage is $0.080/(2\times20) = 0.002$ substitutions per site per Myr, i.e. $2\times10^{-9}$ per site per year. Errors in the calibration carry straight through: if the X–Y split is really 25 Myr, X–Z becomes 6.25 Myr. Fossil calibrations are minimum ages (the first fossil postdates the split), so their uncertainty is one-sided, which Bayesian dating methods model explicitly.
:::
:::

### Gene trees and species trees

The tree of a single gene need not be the tree of the species. When species split in quick succession, ancestral polymorphism may persist through the short interval between splits, and the gene copies sampled from three species may coalesce in an order that differs from the order in which the species split. This is **incomplete lineage sorting**.

For three species with species tree ((A, B), C), where the interval between the two speciation events is $T$ in **coalescent units** ($T = t/2N_e$ for $t$ generations in an ancestral population of effective size $N_e$), coalescent theory gives the probability that a gene tree matches the species tree as

$$
\Prob(\text{gene tree} = \text{species tree}) = 1 - \tfrac23e^{-T},
$$ {#eq-ils}

each of the two discordant topologies having probability $\tfrac13e^{-T}$ (a result derived in the 1980s by Richard Hudson, Fumio Tajima, and Pekka Pamilo and Masatoshi Nei). If $T$ is large, nearly all genes agree; if it is small, up to two-thirds disagree.

::: example Discordance in the great apes {#ex-ils}
Aylwyn Scally and colleagues (2012), analysing the gorilla genome, found that in about 30 % of the genome, humans are not most closely related to chimpanzees (they group with gorillas, or chimpanzees with gorillas). What internode length $T$ does this imply, and how long is that in years if the ancestral $N_e$ was about 50,000 and the generation time 20 years?
::: solution
Setting $\tfrac23e^{-T} = 0.30$ gives $e^{-T} = 0.45$, $T = \ln(1/0.45) = 0.80$ coalescent units. Then $t = 0.80\times2N_e = 0.80\times100{,}000 = 80{,}000$ generations, or about 1.6 million years with a 20-year generation time. This is the order of the interval between the human–gorilla and human–chimpanzee splits estimated from genomes. Incomplete lineage sorting is not a failure of phylogenetics but a source of information: the fraction of discordant genes measures the time between speciations and the ancestral population size. Methods that estimate the species tree from many gene trees (such as ASTRAL, Siavash Mirarab and colleagues, 2014) take it into account.
:::
:::

Other causes of gene-tree discordance include **hybridisation and introgression** (genes crossing species boundaries, as between Neanderthals and modern humans — [[evolution/human-evolution]]), **horizontal gene transfer** (common in bacteria and archaea, which makes a single "tree" of prokaryotes an approximation), and **gene duplication and loss** (comparing a gene with a copy of a paralogue rather than its true orthologue).

::: application Phylogenetics in epidemiology and forensics
Phylogenies of viral genomes trace outbreaks. Sequences sampled through an epidemic, with their dates, give a time-scaled tree whose root dates the origin, whose branching rate estimates growth, and whose geography shows spread — methods used for HIV, Ebola, influenza and SARS-CoV-2. The origin of HIV-1 group M was traced to a spillover from chimpanzees in central Africa, with the common ancestor of the pandemic strains dated to the early twentieth century (Michael Worobey and colleagues, 2008). Phylogenetic analysis of HIV sequences has also been accepted as evidence in criminal cases, with the caveat that a tree can show that two viruses are closely related but not the direction or route of transmission.
:::

::: history
Darwin drew a tree in his notebook in 1837 ("I think") and in the *Origin* (1859); Ernst Haeckel drew elaborate trees of life from 1866. Hennig's phylogenetic systematics (1950, translated 1966) established synapomorphy as the basis of classification and started the "cladistic" revolution of the 1970s–1980s. Sokal and Michener's UPGMA (1958) came from numerical taxonomy; Edwards and Cavalli-Sforza (1963–1964) proposed parsimony and likelihood for gene-frequency data; Fitch's algorithm appeared in 1971. Carl Woese and George Fox used ribosomal RNA sequences in 1977 to discover the Archaea, recasting the tree of life into three domains. Felsenstein showed the inconsistency of parsimony (1978), made likelihood practical (1981) and introduced the bootstrap (1985); Saitou and Nei's neighbour joining appeared in 1987, and Bayesian phylogenetics around 1996–2001. Genome-scale data ("phylogenomics") since the 2000s have resolved many old problems and revealed the extent of gene-tree discordance.
:::

::: summary
- A phylogeny is a hypothesis of common ancestry; clades (monophyletic groups) contain an ancestor and all its descendants; paraphyletic and polyphyletic groups do not. Tip order is arbitrary, no living species is ancestral, and "basal" does not mean primitive.
- Only shared derived states (synapomorphies) indicate clades; outgroups polarise characters and root trees; homoplasy (convergence, reversal) misleads.
- There are $(2n-5)!!$ unrooted and $(2n-3)!!$ rooted bifurcating trees for $n$ taxa — $2\times10^6$ for 10 taxa, $3\times10^{74}$ for 50 — so tree searches are heuristic.
- Maximum parsimony minimises the number of changes, counted by Fitch's algorithm; it can be inconsistent (long-branch attraction).
- Distances must be corrected for multiple hits: Jukes–Cantor $d = -\tfrac34\ln(1 - \tfrac43p)$. UPGMA assumes a clock; neighbour joining does not.
- Likelihood and Bayesian methods use explicit substitution models; bootstrap support measures sampling variability, not systematic error.
- Molecular dating needs calibrations and relaxed clocks; gene trees can differ from species trees because of incomplete lineage sorting ($\Prob(\text{concordance}) = 1 - \tfrac23e^{-T}$), introgression, horizontal transfer and paralogy.
:::

## Exercises

::: exercise Six taxa {level=1 check="105"}
How many unrooted bifurcating trees are there for 6 taxa?
::: solution
$U(6) = 7!! = 1\times3\times5\times7 = 105$.
:::
:::

::: exercise Rooted trees {level=1 check="105"}
How many rooted bifurcating trees are there for 5 taxa?
::: solution
$R(5) = 7!! = 105$, the same as $U(6)$, as [[#eq-rooted]] says: the root acts as a sixth leaf.
:::
:::

::: exercise A corrected distance {level=1 check="0.383"}
Two aligned sequences differ at 30 % of sites. What is their Jukes–Cantor distance (three decimal places)?
::: solution
$d = -0.75\ln(1 - 0.4) = -0.75\ln 0.6 = -0.75\times(-0.5108) = 0.383$ substitutions per site.
:::
:::

::: exercise Consistency index {level=2 check="0.714"}
What is the consistency index of the most parsimonious tree in [[#ex-fitch]], to three decimal places?
::: solution
Minimum possible changes: one per two-state site, 5. Tree length 7. $CI = 5/7 = 0.714$.
:::
:::

::: exercise Discordant genes {level=2 check="0.245"}
For a species tree ((A, B), C) with an internode of $T = 1$ coalescent unit, what fraction of gene trees is expected to be discordant with the species tree (three decimal places)?
::: solution
By [[#eq-ils]], discordance is $\tfrac23e^{-1} = 0.6667\times0.3679 = 0.245$.
:::
:::

::: exercise Dating a split {level=2 check="12"}
Under a strict clock, taxa P and Q, which split 30 Myr ago according to fossils, differ by a distance of 0.15; taxa P and R differ by 0.06. When did P and R split, in Myr?
::: solution
$30\times0.06/0.15 = 12$ Myr.
:::
:::

::: exercise Fitch on five taxa {level=2 check="2"}
On the rooted tree (((A, B), C), (D, E)), a site has states A: T, B: C, C: C, D: T, E: T. How many changes does Fitch's algorithm count?
::: solution
(A, B): {T} ∩ {C} = ∅ → {T, C}, 1 change. ((A, B), C): {T, C} ∩ {C} = {C}, no change. (D, E): {T}. Root: {C} ∩ {T} = ∅ → {C, T}, 1 change. Total 2. (One reconstruction: T at the root and in the D–E lineage, a change T→C on the branch to the ABC clade, and a reversal C→T on the branch to A.)
:::
:::

::: exercise Groups in a classification {level=2}
For each group, say whether it is monophyletic, paraphyletic or polyphyletic, and why: (a) Mammalia; (b) "reptiles" in the traditional sense (excluding birds); (c) "algae" (photosynthetic eukaryotes other than land plants); (d) "great apes" excluding humans; (e) Dinosauria including birds.
::: solution
(a) Monophyletic: all descendants of the common ancestor of living mammals. (b) Paraphyletic: their common ancestor's descendants include birds, which are excluded. (c) Polyphyletic: eukaryotic photosynthesis arose in several separate lineages (green and red algae by primary endosymbiosis, and brown algae, diatoms and others by secondary endosymbioses in unrelated lineages), so the group omits the common ancestor's other, non-photosynthetic descendants and does not share a single photosynthetic ancestor. (d) Paraphyletic: humans are descended from the common ancestor of chimpanzees, gorillas and orangutans; the clade is Hominidae. (e) Monophyletic: birds are descendants of theropod dinosaurs, so including them makes Dinosauria a clade.
:::
:::

::: exercise Long-branch attraction {level=3}
Four taxa have true tree ((A, B), (C, D)). The branches leading to A and C are very long (many substitutions), and the others short. (a) Explain why parsimony may prefer ((A, C), (B, D)). (b) Why does adding more sites not help parsimony? (c) Suggest three ways to reduce the problem.
::: solution
(a) On long branches many substitutions occur, and by chance A and C sometimes acquire the same state independently (convergence). Such parallel changes create sites that look like synapomorphies of (A, C). True synapomorphies of (A, B) or (C, D) arise only on the short internal branch and are few. If convergent sites outnumber them, parsimony prefers the wrong tree.
(b) More sites increase both kinds of site in the same proportion, so the wrong tree's advantage grows with the data: parsimony is statistically inconsistent here (Felsenstein, 1978).
(c) Use model-based methods (likelihood or Bayesian) with a substitution model that allows multiple hits and rate variation; add taxa that break up the long branches (relatives of A and C); remove fast-evolving sites or genes, or use slowly evolving characters (amino acids, rare genomic changes).
:::
:::

::: exercise Building on the count {level=3}
(a) Use the recursion in the proof of [[#prop-ntrees]] to show that the number of unrooted trees grows faster than $c^n$ for any constant $c$. (b) If a computer can evaluate $10^9$ trees per second, how long would it take to evaluate all unrooted trees for 20 taxa? (c) Explain why heuristic searches such as subtree pruning and regrafting can still find very good trees.
::: solution
(a) $U(n + 1)/U(n) = 2n - 3$, which grows without bound; for any $c$, once $2n - 3 > c$ the ratio exceeds $c$, so eventually $U(n)$ outgrows $c^n$ (it grows roughly like $(2n/e)^{n}$ up to smaller factors).
(b) $U(20) = 2.22\times10^{20}$ trees at $10^9$ per second takes $2.2\times10^{11}$ s, about 7,000 years.
(c) The score surface over tree space is not random: similar trees (differing by a small rearrangement) have similar scores, so local search from a good starting tree (from neighbour joining, for example) climbs efficiently to a high peak. Multiple starting trees and larger rearrangements reduce the chance of getting stuck on a local optimum. There is no guarantee of finding the global best tree, but in practice different searches usually converge on the same few trees.
:::
:::
