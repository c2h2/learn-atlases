Darwin called his book *On the Origin of Species*, but it says surprisingly little about how one species becomes two. The problem is harder than it looks. Natural selection and drift change populations; but for a population to split into separately evolving lineages, something must stop the genes of the two parts from mixing. Within a species, gene flow is a homogenising force ([[evolution/mutation-drift-gene-flow]]); between species, it is blocked. Speciation is the evolution of that block — of **reproductive isolation** — and the diversity of life, some two million described species and many millions more undescribed, is the accumulated result of it happening again and again.

This chapter begins with what a species is, which is less straightforward than it sounds, and why biologists use several species concepts for different purposes. We then classify and measure the barriers that isolate species, see how they arise as by-products of divergence through Bateson–Dobzhansky–Muller incompatibilities, and look at the geography of speciation — allopatric, peripatric, parapatric and sympatric — with examples. We end with speciation by polyploidy and by hybridisation, and with what genomes have revealed about speciation with gene flow.

## What is a species?

Field naturalists rarely have trouble recognising species where they live: the birds of a garden or the trees of a wood fall into distinct kinds, with few intermediates. Ernst Mayr noted that the species recognised by New Guinea's Arfak mountain people corresponded almost one-to-one with those of Western ornithologists. Discreteness is real. The difficulty is to say *why* species are discrete, and how to decide hard cases: populations that look alike but do not interbreed, populations that look different but do, organisms that reproduce asexually, and fossils.

::: definition The biological species concept {#def-bsc}
"Species are groups of actually or potentially interbreeding natural populations, which are reproductively isolated from other such groups" (Ernst Mayr, 1942). Under this **biological species concept** (BSC), the defining property of a species is reproductive isolation from other species: the barriers that prevent or reduce gene flow, which are called **isolating mechanisms** or **reproductive barriers**.
:::

The BSC explains why species are discrete: gene flow holds a species together, and its absence lets species diverge independently. It also puts the problem of speciation precisely: how does reproductive isolation evolve? But it has well-known limitations. It cannot be applied to asexual organisms (most bacteria, and asexual animals such as bdelloid rotifers), or to fossils; "potentially interbreeding" is hard to test for populations that never meet; and many good species — oaks, ducks, *Heliconius* butterflies, many plants — hybridise and exchange some genes in nature without merging.

Other concepts emphasise other properties.

- **Phylogenetic species concept**: a species is the smallest diagnosable cluster of individuals with a pattern of ancestry and descent (Joel Cracraft, 1983); in a common variant, the smallest monophyletic group ([[evolution/phylogenetics]]). It applies to asexuals and fossils, but tends to recognise many more species, since any consistently distinct population qualifies.
- **Morphological (phenetic) concept**: species are groups distinguished by consistent differences in form. This is what museum taxonomists and palaeontologists use in practice, and it fails for **cryptic species** — reproductively isolated populations that look alike. DNA barcoding of what was described as the neotropical skipper butterfly *Astraptes fulgerator* in Costa Rica revealed at least ten species, with different caterpillars and food plants (Paul Hebert and colleagues, 2004).
- **Ecological species concept**: a species is a lineage occupying a distinct adaptive zone (Leigh Van Valen, 1976).
- **Evolutionary and general lineage concepts**: a species is a separately evolving metapopulation lineage (George Gaylord Simpson, 1961; Kevin de Queiroz, 1998, 2007). In de Queiroz's view, the various concepts are not rival definitions but different *criteria* — reproductive isolation, diagnosability, monophyly, ecological distinctness — that a lineage acquires at different times during divergence. Two populations early in speciation may satisfy some criteria but not others; hence the disagreements.

::: warning "Species are fixed, sharply bounded categories"
Speciation is a process that takes time, often hundreds of thousands to millions of years, so at any moment some pairs of populations are part of the way through it: partially isolated, hybridising at a zone of contact, or isolated by some barriers but not others. These intermediate cases are not failures of the species concept but predictions of evolution. Ring species, such as the greenish warbler *Phylloscopus trochiloides* around the Tibetan plateau and the salamander *Ensatina eschscholtzii* around California's Central Valley, are often cited as illustrating this in space: neighbouring populations interbreed around a ring, while the terminal forms that meet coexist without interbreeding (although detailed genetic work shows that gene flow around both rings has not been continuous).
:::

## Reproductive barriers

::: definition Prezygotic and postzygotic isolation {#def-barriers}
**Prezygotic barriers** act before fertilisation: **ecological (habitat) isolation** (the populations live or breed in different places), **temporal isolation** (different breeding seasons or times of day), **behavioural (sexual) isolation** (mates of the other population are not chosen), **mechanical isolation** (genitalia or flowers do not fit), and **gametic isolation** (sperm or pollen fail to fertilise). **Postzygotic barriers** act after fertilisation: **hybrid inviability** (hybrids die), **hybrid sterility** (hybrids survive but do not reproduce, as with the mule), and **hybrid breakdown** (first-generation hybrids are fertile but their offspring are weak or sterile). Postzygotic barriers may be **intrinsic** (developmental incompatibilities expressed in any environment) or **extrinsic** (hybrids are intermediate and fit neither parental niche, or are unattractive to mates).
:::

Barriers act in sequence through the life cycle, and total isolation combines them. Each can be quantified by comparing heterospecific and conspecific success at that stage. A widely used index (James Sobel and Gina Chen, 2014) is

$$
RI = 1 - 2\,\frac{H}{H + C},
$$ {#eq-ri}

where $H$ and $C$ are the frequencies (or rates) of success in heterospecific and conspecific crosses at that stage: $RI = 1$ means complete isolation, $0$ none, and negative values that heterospecific matings succeed better. If a barrier acting later can only act on what earlier barriers let through, the total isolation from barriers that separately allow fractions $1 - RI_1, 1 - RI_2, \ldots$ of gene flow is

$$
RI_\mathrm{total} = 1 - \prod_i(1 - RI_i)
$$ {#eq-ritotal}

(for barriers measured as proportional reductions in gene flow).

::: example Quantifying isolation between monkeyflowers {#ex-ri}
Justin Ramsey, Toby Bradshaw and Douglas Schemske (2003) measured barriers between two monkeyflowers in California, *Mimulus lewisii* (pink, bumblebee-pollinated) and *M. cardinalis* (red, hummingbird-pollinated). Using illustrative values of the same kind: in a mixed plot, 80 % of pollinator visits after a visit to one species go to the same species and 20 % to the other; on stigmas carrying mixed pollen, a plant's own species sires 90 % of seeds; and hybrid seeds germinate and survive as well as pure ones. Calculate the isolation at each stage, and the total.
::: solution
Pollinator isolation: $RI_1 = 1 - 2\times0.2/(0.2 + 0.8) = 1 - 0.4 = 0.6$.

Pollen competition (a gametic barrier): $RI_2 = 1 - 2\times0.1/(0.1 + 0.9) = 0.8$.

Hybrid viability: $RI_3 = 0$.

Total, by [[#eq-ritotal]]: $1 - (1 - 0.6)(1 - 0.8)(1 - 0) = 1 - 0.4\times0.2 = 0.92$.

The flowers' colour, shape and nectar — which attract different pollinators — make the largest single contribution. In the real study, geographical and ecological separation (the two grow at different altitudes) contributed most, with pollinator isolation second, and total isolation was more than 99 %. The general lesson, now repeated in many systems, is that barriers acting early in the life cycle often contribute most to total isolation, because later barriers act only on the little gene flow that remains.
:::
:::

### Haldane's rule

In 1922 J. B. S. Haldane observed that "when in the F₁ offspring of two different animal races one sex is absent, rare, or sterile, that sex is the heterozygous [heterogametic] sex". In mammals and *Drosophila* the sterile or inviable hybrids are males (XY); in birds and butterflies, in which females are the heterogametic sex (ZW), they are females. **Haldane's rule** holds in hundreds of cases. The main explanation is **dominance theory** (H. Allen Orr and Michael Turelli): incompatibilities involving recessive alleles on the X (or Z) are fully expressed in the heterogametic sex, which has only one copy, but masked in the homogametic sex. A second contributor, at least for sterility in *Drosophila*, is that genes affecting male fertility evolve fast ("faster-male" evolution).

## How isolation evolves: Bateson–Dobzhansky–Muller incompatibilities

Hybrid sterility posed a puzzle. If a mule is sterile because horse and donkey genes do not work together, how could the ancestral population have changed into a horse and a donkey without passing through a stage of reduced fertility? Natural selection cannot favour an allele that makes its carriers less fit.

William Bateson (1909), Theodosius Dobzhansky (1936) and Hermann Muller (1942) independently gave the answer. Suppose an ancestral population has genotype $aabb$. One isolated population fixes allele $A$ at the first locus: $AAbb$ is fully fit. The other fixes $B$ at the second: $aaBB$ is fully fit. Neither population ever passed through an unfit genotype. But $A$ and $B$ have never been tested together; if they interact badly, the hybrid $AaBb$ has reduced fitness. Isolation evolves as a **by-product** of divergence, not because it is favoured.

::: definition Bateson–Dobzhansky–Muller incompatibility {#def-bdm}
A **Bateson–Dobzhansky–Muller (BDM) incompatibility** is a deleterious epistatic interaction between alleles at two or more loci that have diverged in different populations, so that the alleles function normally in their own genetic backgrounds but reduce fitness when brought together in hybrids.
:::

BDM incompatibilities have been identified at the molecular level. In *Drosophila*, hybrids between *D. melanogaster* females and *D. simulans* males die, and the lethality depends on an interaction between the *D. melanogaster* allele of *Hybrid male rescue* (*Hmr*) and the *D. simulans* allele of *Lethal hybrid rescue* (*Lhr*), two genes encoding proteins that interact at heterochromatin (Daniel Barbash, Nicholas Brideau and colleagues, 2003–2006). Many of the genes involved evolve rapidly under positive selection, often in genetic conflicts with selfish elements, which suggests that conflict may be an important engine of incompatibility.

A key consequence was pointed out by Orr in 1995. Each new substitution in one lineage can be incompatible with any of the substitutions that have occurred in the other lineage, and with those that occurred earlier in its own lineage but have not been tested against it.

::: proposition The snowball effect {#prop-snowball}
If two lineages have accumulated $K$ substitutions in total since their split, and each pair of derived alleles not yet tested together in the same genome has a small probability $p$ of forming a two-locus incompatibility, then the expected number of incompatibilities grows approximately as

$$
I_K \approx p\,\frac{K(K - 1)}{2} \approx \frac{pK^2}{2},
$$ {#eq-snowball}

faster than linearly with divergence (Orr, 1995). If $K$ grows linearly with time, the number of incompatibilities grows as the square of time.
:::

::: proof Sketch
The $K$th substitution can be incompatible with the derived alleles at sites where the two lineages already differ and which have not been tested in its own genetic background; in Orr's model this is on the order of the $K - 1$ earlier substitutions (more exactly, those in the other lineage, plus earlier ones in its own lineage that have not been tested against the new allele). So the $K$th substitution adds about $p(K - 1)$ new incompatibilities, and the total after $K$ substitutions is $p[1 + 2 + \cdots + (K - 1)] = pK(K - 1)/2$.
:::

::: widget plot
f: p*x*(x-1)/2; p*x
x: 0, 100
y: 0, 50
sliders: p=0.01:0.001:0.05:0.001
labels: \text{snowball: } pK(K-1)/2; \text{linear: } pK
caption: The expected number of two-locus incompatibilities against the number of substitutions $K$ separating two lineages, from [[#eq-snowball]], for probability $p$ that a pair of untested derived alleles is incompatible. The straight line, for comparison, is what would happen if each substitution added a fixed number of incompatibilities. Early on the two are similar and isolation is weak; then the quadratic curve takes off. The snowball predicts that isolation should appear slowly and then accumulate quickly — consistent with comparative data from *Drosophila* and from wild tomatoes (*Solanum*), in which the number of incompatibilities detected in introgression lines grew faster than linearly with divergence (Matute and colleagues, 2010; Moyle and Nakazato, 2010).
:::

::: example The snowball in numbers {#ex-snowball}
Suppose each pair of untested derived alleles has a 1 in 1000 chance of being incompatible. How many incompatibilities are expected after 10, 100 and 1000 substitutions?
::: solution
By [[#eq-snowball]] with $p = 0.001$: $K = 10$: $0.001\times45 = 0.045$; $K = 100$: $0.001\times4950 = 4.95$; $K = 1000$: $0.001\times499{,}500 = 499.5$. A tenfold increase in divergence gives a hundredfold increase in incompatibilities. Even when incompatibilities are individually rare, they eventually become numerous enough to make hybrids inviable or sterile.
:::
:::

## The geography of speciation

Speciation is classified by the geographic relationship of the diverging populations, because geography determines how much gene flow divergence must overcome.

::: definition Modes of speciation {#def-modes}
**Allopatric** speciation: populations diverge while geographically separated by a barrier (**vicariance**, when a barrier divides a range; or **dispersal**, when a population colonises a distant area). **Peripatric** speciation: a special case in which a small peripheral population founded by a few individuals diverges, with drift playing a role (Mayr, 1954). **Parapatric** speciation: divergence between adjacent populations with limited gene flow across a boundary, often along an environmental gradient. **Sympatric** speciation: divergence within a single population without geographic separation, so that isolation evolves in the face of initially free gene flow.
:::

**Allopatric speciation** is generally accepted as the most common mode in animals, because geographic isolation removes gene flow at no cost, and divergence by selection and drift then produces isolation as a by-product. The evidence includes **sister species** (each other's closest relatives) separated by geographic barriers. The Isthmus of Panama, which closed around 3 million years ago, divided marine populations; Nancy Knowlton and colleagues (1993) studied pairs of snapping shrimp (*Alpheus*) on the Caribbean and Pacific sides, which look nearly identical, and found that most pairs had become largely or completely reproductively isolated. The pairs varied in genetic divergence, consistent with some having been separated before the final closure.

**Peripatric speciation** through founder effects was emphasised by Mayr, and island radiations — the Hawaiian *Drosophila*, with several hundred species, many of them confined to a single island — are often given as examples. The role of drift as such is debated: small populations do drift fast, but they also have less variation, and founder events alone rarely produce isolation in laboratory experiments.

### Divergence with gene flow

Parapatric and sympatric speciation require divergence despite gene flow. As [[evolution/mutation-drift-gene-flow#prop-migration]] showed, gene flow homogenises populations quickly. It can be resisted only by selection.

::: proposition Migration–selection balance on an island {#prop-migsel}
Consider a haploid locus on an island where allele $A$ is favoured locally (fitness 1, against $1 - s$ for allele $a$), and suppose each generation a fraction $m$ of the island's population is replaced by migrants from a mainland fixed for $a$. If migration occurs before selection, the equilibrium frequency of $A$ on the island is

$$
\hat p = \frac{s - m}{s(1 - m)} \approx 1 - \frac{m}{s}\quad (m < s),
$$ {#eq-migsel}

and $A$ is lost ($\hat p = 0$) if $m \ge s$.
:::

::: proof
After migration, $p_m = (1 - m)p$. After selection, by [[evolution/natural-selection#eq-haploid]] (with $a$ at the disadvantage), $p' = p_m/(1 - s(1 - p_m))$. At equilibrium $p' = p$; if $p \ne 0$, dividing by $p$ gives $1 - s + s(1 - m)p = 1 - m$, so $p = (s - m)/[s(1 - m)]$. This is positive only if $m < s$; otherwise the only equilibrium is $p = 0$. For small $m$ and $s$, $p \approx (s - m)/s = 1 - m/s$.
:::

::: example Can local adaptation survive gene flow? {#ex-migsel}
On a small island with dark lava soil, a dark colour allele $A$ gives a 10 % survival advantage over the pale allele $a$, which is fixed on the sandy mainland. What is the equilibrium frequency of $A$ if 1 % of the island's breeders each generation are mainland migrants? If 5 %? If 12 %? Check the first case by iterating the recursion numerically.
::: solution
By [[#eq-migsel]] with $s = 0.1$: for $m = 0.01$, $\hat p = 0.09/(0.1\times0.99) = 0.909$ (the approximation $1 - m/s$ gives 0.90). For $m = 0.05$, $\hat p = 0.05/(0.1\times0.95) = 0.526$. For $m = 0.12 > s$, no interior equilibrium exists and $A$ is lost. Iterating "migrate, then select" in Python from $p = 0.99$ until it settles gives 0.9091 for $m = 0.01$ and 0.5263 for $m = 0.05$, and for $m = 0.12$ the frequency falls towards zero, as predicted. A tenfold increase in gene flow, from 1 % to 12 %, takes the population from almost complete local adaptation to none.
:::
:::

::: widget plot
f: max(0, (s - x)/(s*(1 - x)))
x: 0, 0.3
y: 0, 1
sliders: s=0.1:0.01:0.3:0.01
labels: \hat p
caption: The equilibrium frequency [[#eq-migsel]] of a locally favoured allele on an island against the migration rate $m$ (horizontal axis), for local selection coefficient $s$. The allele is maintained at high frequency when migration is weak relative to selection, falls almost linearly as $m$ increases, and is lost entirely once $m \ge s$ — gene flow then "swamps" local adaptation. Increase $s$ and see the threshold move right. Loci under strong divergent selection can therefore stay differentiated while the rest of the genome is homogenised by gene flow.
:::

The figure explains a key observation from genome sequencing of diverging populations: **genomic islands of divergence**, regions strongly differentiated between populations against a background of low differentiation elsewhere. Loci under divergent selection (and loci tightly linked to them) resist gene flow while the rest of the genome is shared. Speciation with gene flow then requires that more and more of the genome becomes isolated — for example if the selected loci also affect mating, or if mate choice and local adaptation become associated in the genome (reduced recombination in chromosomal inversions helps).

**Reinforcement.** When two populations that have diverged in allopatry come back into contact and their hybrids have low fitness, selection can favour individuals that avoid mating with the other population, *strengthening* prezygotic isolation. This is **reinforcement**, Dobzhansky's idea. Jerry Coyne and Allen Orr's comparisons of *Drosophila* species pairs (1989, 1997) supplied the classic evidence: for a given genetic distance, prezygotic isolation was much stronger between sympatric pairs (which have had the chance of reinforcement) than between allopatric pairs, while postzygotic isolation did not differ. Reinforcement is also documented in flycatchers (*Ficedula*), where pied flycatchers in contact with collared flycatchers have evolved plumage that is more different.

### Sympatric speciation

Sympatric speciation was long doubted, because it requires disruptive selection strong enough to overcome recombination, which constantly breaks up associations between the genes for adaptation and the genes for mate choice. It is now accepted in a few well-studied cases.

- **Host races in phytophagous insects.** The apple maggot fly *Rhagoletis pomonella* originally bred on hawthorn in North America. Apples were introduced from Europe, and the fly was first recorded on apples in the Hudson Valley in the mid-nineteenth century (Benjamin Walsh, 1867). Flies mate on their host fruit, so host choice is mate choice; apples ripen earlier than hawthorns, and apple flies emerge earlier. Guy Bush (1969) and later Jeffrey Feder and colleagues showed that apple and hawthorn races differ in host preference and in the timing of emergence, and differ in allele frequencies at loci in chromosomal inversions; gene flow between them is a few per cent per generation. Whether they will complete speciation is not yet known.
- **Crater-lake fishes.** Small, isolated, young crater lakes with only one colonisation event provide natural tests. In Lake Apoyo, Nicaragua, a crater lake less than about 23,000 years old, Marta Barluenga and colleagues (2006) found a new species of cichlid, the slender, open-water arrow cichlid *Amphilophus zaliosus*, which evolved from the bottom-dwelling Midas cichlid *A. citrinellus* within the lake. Similar cases were described earlier from crater lakes in Cameroon (Ulrich Schliewen and colleagues, 1994), although later genomic work suggests that some colonisations may have involved more than one wave.
- **Polyploidy**, below, is the most common form of instantaneous sympatric speciation.

::: quiz
Two closely related species of frog breed in the same ponds in one region (sympatry) but in separate regions elsewhere (allopatry). Their mating calls are much more different where they co-occur than where they do not. Which explanation does this pattern suggest?
- [ ] Hybrid sterility evolved faster in sympatry.
- [x] Reinforcement: selection against hybridisation strengthened behavioural isolation in sympatry.
- [ ] Drift, which is stronger in sympatry.
- [ ] Sympatric speciation from a single population.
::: solution
Greater divergence in mating signals where species meet than where they are apart is the signature of reinforcement (or more generally of **reproductive character displacement**). It requires that hybrids or hybrid matings have reduced fitness, so that individuals that discriminate leave more offspring. An alternative to check is that only populations already different enough could coexist; reinforcement predicts that discrimination is specifically stronger in sympatry for mating traits, as Coyne and Orr found for prezygotic but not postzygotic isolation.
:::
:::

## Speciation by polyploidy and hybridisation

In plants, a new species can arise in a single generation. A **polyploid** has more than two sets of chromosomes. An **autopolyploid** arises by genome doubling within one species; an **allopolyploid** arises from a hybrid between two species, whose genome then doubles. A sterile diploid hybrid with one set of chromosomes from each parent cannot pair its chromosomes at meiosis; after doubling, each chromosome has a partner, and the allopolyploid is fertile ([[genetics]]). It is reproductively isolated from both parents, because crosses with them produce triploids, which are largely sterile.

::: example New species of goatsbeard {#ex-tragopogon}
Three diploid species of goatsbeard (*Tragopogon dubius*, *T. pratensis* and *T. porrifolius*), each with $2n = 12$ chromosomes, were introduced from Europe to the Palouse region of the north-western United States in the early twentieth century. In 1950 Marion Ownbey described two new species there, *T. mirus* and *T. miscellus*, found nowhere else. How many chromosomes would you expect them to have if they are allotetraploids, and how would you test their origin? Why are they reproductively isolated from their parents?
::: solution
Each parent's gametes carry $n = 6$ chromosomes. A hybrid has $6 + 6 = 12$ chromosomes, one set from each parent, which cannot pair; doubling gives $2n = 24$, with two complete sets from each parent. Both new species do have $2n = 24$. Their origin can be tested by comparing their chromosomes and DNA with the candidate parents: *T. mirus* combines the genomes of *T. dubius* and *T. porrifolius*, and *T. miscellus* those of *T. dubius* and *T. pratensis*. Molecular studies by Douglas and Pamela Soltis and colleagues showed that each has formed repeatedly and independently from its parents in different towns. A cross between an allotetraploid (gametes with 12 chromosomes) and a diploid parent (6) gives triploids with 18 chromosomes, which form unbalanced gametes and are largely sterile: the tetraploid is isolated by a single step, within decades.
:::
:::

Polyploidy is widespread: Troy Wood and colleagues (2009) estimated that about 15 % of speciation events in flowering plants and 31 % in ferns involved an increase in ploidy. Many crops are polyploids — bread wheat (*Triticum aestivum*) is a hexaploid combining three ancestral genomes, cotton and oilseed rape are allotetraploids. In animals polyploid speciation is rarer, but it occurs in some frogs, fish and insects, and whole-genome duplications occurred in the ancestors of vertebrates and of teleost fishes ([[evolution/macroevolution]]).

**Homoploid hybrid speciation**, without a change in chromosome number, is rarer and harder to demonstrate. In sunflowers, Loren Rieseberg and colleagues showed that three species of the American south-west — *Helianthus anomalus*, *H. deserticola* and *H. paradoxus* — arose from hybrids between *H. annuus* and *H. petiolaris*, and that the hybrid species occupy extreme habitats (dunes, deserts, salt marshes) that neither parent tolerates; they were able to recreate genomic compositions resembling the natural hybrid species in experimental hybrid lines (1996, 2003). In 2018 Sangeet Lamichhaney, Peter and Rosemary Grant and colleagues reported that on Daphne Major, a hybrid lineage descending from a single immigrant male *Geospiza conirostris* that bred with *G. fortis* females from 1981 had become reproductively isolated within a few generations, by its distinctive song and beak.

::: application Species concepts in conservation law
Legislation protects species, so species concepts have practical consequences. The United States Endangered Species Act allows protection of "distinct population segments" of vertebrates, and the definition of a species affects which populations qualify. Splitting one widespread species into several under a phylogenetic concept can make each of them rare; lumping populations can leave distinct lineages unprotected. Hybridisation raises its own problems: the red wolf (*Canis rufus*) and the Florida panther both carry genes from related populations, and conservation policy has had to decide whether such admixture disqualifies them. Molecular data are now central to these decisions ([[conservation-biology]]).
:::

::: history
Darwin (1859) treated species as well-marked varieties and saw speciation as a by-product of divergence. Haldane stated his rule in 1922. Dobzhansky's *Genetics and the Origin of Species* (1937) defined isolating mechanisms and described the Dobzhansky–Muller model of incompatibilities (anticipated by Bateson in 1909), and Mayr's *Systematics and the Origin of Species* (1942) set out the biological species concept and the case for allopatric speciation. Ownbey described the *Tragopogon* allopolyploids in 1950. Bush's work on *Rhagoletis* (1969) revived the case for sympatric speciation. Coyne and Orr's comparative studies of *Drosophila* species pairs (1989, 1997) and their book *Speciation* (2004) made the field quantitative; Orr's snowball model appeared in 1995. Since the 2000s, the genes underlying incompatibilities (*Hmr*, *Lhr*, *Odysseus*, *Prdm9* in mice) and genome-wide patterns of divergence with gene flow have been identified.
:::

::: summary
- The biological species concept defines species by reproductive isolation; phylogenetic, morphological, ecological and lineage concepts emphasise other criteria, which a lineage acquires at different stages of divergence.
- Reproductive barriers are prezygotic (habitat, timing, behaviour, mechanics, gametes) or postzygotic (inviability, sterility, breakdown; intrinsic or extrinsic). $RI = 1 - 2H/(H+C)$ quantifies each; sequential barriers combine as $1 - \prod(1 - RI_i)$, and early barriers often dominate.
- Haldane's rule: hybrid sterility or inviability affects the heterogametic sex first, explained mainly by recessive X-linked incompatibilities.
- Bateson–Dobzhansky–Muller incompatibilities let isolation evolve as a by-product of divergence; their number snowballs as about $pK^2/2$.
- Allopatric speciation (e.g. *Alpheus* across Panama) is common; divergence with gene flow requires selection, with locally favoured alleles kept at $\hat p \approx 1 - m/s$ if $m < s$; reinforcement strengthens prezygotic isolation in sympatry.
- Sympatric speciation is documented in host races (*Rhagoletis*) and crater-lake cichlids; polyploidy produces new plant species in one step (*Tragopogon*); homoploid hybrid speciation occurs (*Helianthus*, Daphne finches).
:::

## Exercises

::: exercise An isolation index {level=1 check="0.5"}
In mate-choice trials, females mate with conspecific males in 75 % of trials and with heterospecific males in 25 %. What is the behavioural isolation index $RI$ from [[#eq-ri]]?
::: solution
$RI = 1 - 2\times0.25/(0.25 + 0.75) = 1 - 0.5 = 0.5$.
:::
:::

::: exercise Combining barriers {level=1 check="0.97"}
Three barriers act in sequence with $RI = 0.7$, $0.5$ and $0.8$. What is the total isolation?
::: solution
By [[#eq-ritotal]], $1 - 0.3\times0.5\times0.2 = 1 - 0.03 = 0.97$.
:::
:::

::: exercise Chromosomes of an allopolyploid {level=1 check="38"}
A hybrid between a species with $2n = 18$ and one with $2n = 20$ doubles its genome. What is the chromosome number ($2n$) of the resulting allotetraploid?
::: solution
Gametes carry 9 and 10 chromosomes, so the hybrid has 19; doubling gives $2n = 38$. (This is the origin of oilseed rape, *Brassica napus*, $2n = 38$, from *B. rapa* with $2n = 20$ and *B. oleracea* with $2n = 18$.)
:::
:::

::: exercise The snowball {level=2 check="190"}
How many pairs of derived alleles are available to form two-locus incompatibilities after $K = 20$ substitutions, according to the counting in [[#prop-snowball]]?
::: solution
$K(K - 1)/2 = 20\times19/2 = 190$.
:::
:::

::: exercise Migration against selection {level=2 check="0.8"}
A locally favoured allele has $s = 0.05$ on an island receiving migrants at rate $m = 0.01$ from a mainland fixed for the alternative. Using the approximation in [[#eq-migsel]], what is its equilibrium frequency?
::: solution
$\hat p \approx 1 - m/s = 1 - 0.2 = 0.8$. (The exact formula gives $(0.05 - 0.01)/(0.05\times0.99) = 0.808$.)
:::
:::

::: exercise Swamping {level=2}
Using [[#prop-migsel]], explain why a peripheral population at the edge of a species' range may fail to adapt to local conditions even when selection for local adaptation is moderately strong. What does this imply about the stability of species' range limits?
::: solution
Edge populations are often small and receive many immigrants from the larger, central populations, which are adapted to central conditions. If the immigration rate $m$ exceeds the local selection coefficient $s$ favouring locally adapted alleles, those alleles are swamped and lost. Even below the threshold, local adaptation is incomplete. Because poor adaptation keeps edge populations small, they receive proportionally even more gene flow, which can reinforce the failure to adapt: gene flow from the centre can stabilise range limits (a hypothesis developed by Mark Kirkpatrick and Nicholas Barton, 1997). On the other hand, moderate gene flow also supplies genetic variation, so the net effect depends on the balance.
:::
:::

::: exercise Haldane's rule in birds {level=2}
Crosses between two bird species give F₁ hybrids in which males are fertile and females sterile. (a) Is this consistent with Haldane's rule? (b) Explain using dominance theory. (c) Predict what would be found in a cross between two butterfly species, and two mammal species.
::: solution
(a) Yes. In birds females are the heterogametic sex (ZW), and it is they that are sterile.
(b) Incompatibilities involving recessive alleles on the Z chromosome of one species interacting with autosomal alleles from the other are fully expressed in ZW females, who have one Z, but are masked in ZZ males if the other Z carries a compatible dominant allele.
(c) Butterflies (Lepidoptera) also have ZW females, so hybrid females should be affected first; mammals have XY males, so hybrid males should be sterile or inviable first (as in mules and in crosses of mice, and in *Drosophila*).
:::
:::

::: exercise Reinforcement data {level=3}
In a set of species pairs, average prezygotic isolation (scale 0–1) is plotted against genetic distance $D$. For allopatric pairs, it rises from 0.1 at $D = 0.1$ to 0.9 at $D = 1.0$. For sympatric pairs, it is already 0.8 at $D = 0.1$. Postzygotic isolation is the same in both groups at each $D$. (a) What hypothesis does this support? (b) Why is it important that postzygotic isolation does not differ? (c) Suggest an alternative explanation that does not involve reinforcement, and how to rule it out.
::: solution
(a) Reinforcement: in sympatry, where hybridisation is possible, selection against producing unfit hybrids has strengthened prezygotic isolation early in divergence.
(b) Reinforcement acts only on prezygotic isolation (avoiding wasted matings); if all isolation were simply greater in sympatric pairs, a general difference between the groups (for example, sympatric pairs being older than their genetic distance suggests) would be the more economical explanation. That only prezygotic isolation differs singles out a process that targets mating.
(c) "Differential fusion": pairs that came into contact without strong prezygotic isolation may have merged, leaving only those that already had it — a filter rather than a process of strengthening. To distinguish, look within species pairs whose ranges partly overlap: reinforcement predicts stronger isolation in the sympatric part of the range than in the allopatric part of the *same* pair, which differential fusion does not.
:::
:::

::: exercise Is this a species? {level=3}
Two populations of a lizard on adjacent islands differ consistently in colour and in a fixed mitochondrial DNA difference, but when brought together in captivity they interbreed freely and produce fertile hybrids. (a) Would they be separate species under the biological, phylogenetic and morphological concepts? (b) Explain how de Queiroz's general lineage concept handles this case. (c) What additional data would you collect?
::: solution
(a) Biological: probably not — they are "potentially interbreeding", although captivity may not reflect natural mate choice and hybrid fitness in the wild. Phylogenetic: possibly yes, since they are diagnosably distinct (colour and mtDNA), and each may be monophyletic. Morphological: yes, if the colour difference is consistent.
(b) The general lineage concept treats them as separately evolving lineages (they are separated by sea, so they have little gene flow), and regards the various criteria as evidence of divergence. They satisfy diagnosability but not reproductive isolation; whether to call them species is a matter of how much evidence of separate evolution is required, and many biologists would name them as subspecies or species according to the use.
(c) Nuclear DNA from many loci, to test whether they are separate lineages throughout the genome (mtDNA can mislead, for example after a selective sweep), estimates of gene flow between the islands, tests of mate choice and hybrid fitness under natural conditions, and data on ecological differences.
:::
:::
