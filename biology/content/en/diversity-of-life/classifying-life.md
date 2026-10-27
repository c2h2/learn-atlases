Walk through a patch of tropical forest with a net and a vial of ethanol and within a day you will collect insects that no one has ever named — a measure not of careless biologists but of how much life there is. As of the mid-2020s a little over two million living species have formal names (the Catalogue of Life checklist lists about 2.1 million accepted species), while estimates of the total for eukaryotes alone run from a few million to well over ten million, and estimates for bacteria and archaea differ by orders of magnitude. To survey this diversity we need tools for naming organisms, arranging them into groups and estimating how many there are.

Classification is not mere filing. A good classification summarises evolutionary history: to say that whales are mammals compresses evidence about hair, milk, middle-ear bones and DNA into one word, and predicts much that has not yet been measured. This chapter distinguishes taxonomy from systematics, sets out the codes of nomenclature, separates ranks from clades, traces the kingdoms and domains of life to the current debate over two domains or three, and ends with the quantitative problem of estimating how many species exist. It relies on the tree-thinking of [[evolution/phylogenetics]] and the species concepts of [[evolution/speciation]].

## Taxonomy, systematics and nomenclature

::: definition Taxonomy, systematics and nomenclature {#def-taxonomy}
**Taxonomy** is the science of discovering, describing, naming and classifying organisms. **Systematics** is the broader study of the diversity of organisms and of the relationships among them — in practice, the reconstruction of phylogeny and its use to classify. **Nomenclature** is the system of rules by which names are formed and applied. A **taxon** (plural **taxa**) is any named group of organisms at any level: *Homo sapiens*, *Quercus*, Lepidoptera, Bacteria. A **classification** is an arrangement of taxa into a hierarchy of groups within groups.
:::

The three activities are logically separate. Deciding that a new beetle is a distinct species is a taxonomic judgement based on evidence (morphology, DNA, distribution, sometimes breeding data). Deciding which existing genus it belongs to is a question of systematics — of its relationships. Deciding what the name must be, how it is spelled and who gets credit for it is a matter of nomenclature, governed by rules that do not touch the science at all. The codes of nomenclature say explicitly that they do not decide how taxa are delimited; they only decide which name a taxon so delimited must bear.

### The Linnaean hierarchy

Carl Linnaeus (1707–1778), the Swedish botanist, did two lasting things. He used a consistent hierarchy of categories, and he used two-word names. His hierarchy — kingdom, class, order, genus, species — has since been extended:

| rank | wolf | bread wheat | *Escherichia coli* |
|---|---|---|---|
| domain | Eukarya | Eukarya | Bacteria |
| kingdom | Animalia | Plantae | Pseudomonadati |
| phylum (botany also "division") | Chordata | Tracheophyta | Pseudomonadota |
| class | Mammalia | Magnoliopsida | Gammaproteobacteria |
| order | Carnivora | Poales | Enterobacterales |
| family | Canidae | Poaceae | Enterobacteriaceae |
| genus | *Canis* | *Triticum* | *Escherichia* |
| species | *Canis lupus* | *Triticum aestivum* | *Escherichia coli* |

Intermediate ranks (subfamily, tribe, superorder …) are added where needed. The ranks are *conventions*: no biological property makes Canidae a family rather than a subfamily, and a class of flowering plants is not equivalent to a class of animals. Names also change with knowledge: the phylum of *E. coli*, long called Proteobacteria, received its validly published name Pseudomonadota only in 2021, when the prokaryote code first regulated the rank of phylum, and names at the ranks of domain and kingdom (such as Pseudomonadati) were validly published only in 2024 (Markus Göker and Aharon Oren). Class names for plants vary between authors.

The suffixes of names above the genus are fixed for some ranks and tell you the rank at a glance:

| rank | zoology (ICZN) | botany and mycology (ICN) | prokaryotes (ICNP) |
|---|---|---|---|
| order | not regulated (often *-iformes* in fishes and birds) | *-ales* (Rosales) | *-ales* (Enterobacterales) |
| family | *-idae* (Hominidae) | *-aceae* (Rosaceae) | *-aceae* (Enterobacteriaceae) |
| subfamily | *-inae* (Homininae) | *-oideae* (Rosoideae) | *-oideae* |
| tribe | *-ini* (Hominini) | *-eae* | *-eae* |
| phylum | not regulated | *-phyta* (plants), *-mycota* (fungi) | *-ota* (Bacillota) |

So Hominini is recognisable as a tribe of animals, and Fabales as an order — of plants, as it happens; the suffix *-ales* alone does not say which code applies. A few long-established botanical family names, such as Gramineae for Poaceae and Leguminosae for Fabaceae, are allowed as alternatives.

## The codes of nomenclature

There is no single code for all life. Separate codes grew up in separate communities, and each is maintained by its own international body.

::: definition The codes of nomenclature {#def-codes}
- The **International Code of Zoological Nomenclature (ICZN)**, 4th edition (1999, in force since 2000, with later amendments allowing electronic publication with registration in ZooBank), governs names of animals. Its starting point is Linnaeus's *Systema Naturae*, 10th edition, which the Code treats as published on 1 January 1758.
- The **International Code of Nomenclature for algae, fungi, and plants (ICN)**, revised after each International Botanical Congress (Shenzhen 2017, Madrid 2024), governs names of plants, algae, fungi and some protists. The starting point for most plants is Linnaeus's *Species Plantarum*, 1 May 1753.
- The **International Code of Nomenclature of Prokaryotes (ICNP)**, latest revision 2022, governs names of bacteria and archaea. Its starting point is 1 January 1980, the date of the *Approved Lists of Bacterial Names* (V. B. D. Skerman, Vicki McGowan and Peter Sneath, 1980), which replaced the tens of thousands of earlier, often unverifiable names with a curated list of a few thousand. Uncultured organisms can be given provisional *Candidatus* names, and since 2022 the separate **SeqCode** (Brian Hedlund and colleagues) allows names with a genome sequence as the type.
- Viruses are classified by the **International Committee on Taxonomy of Viruses (ICTV)**, which since 2021 has been converting virus species names to a Latinised binomial format (genus plus epithet). Virus *species* names are distinct from the everyday names of the viruses themselves, such as "SARS-CoV-2".
:::

Despite their differences, the codes share four principles.

1. **Binomial names.** The scientific name of a species is a combination of a genus name, capitalised, and a specific epithet (zoology: "specific name"), lower case: *Panthera leo*. Both are italicised in print. The epithet alone is not a name: "*leo*" means nothing without its genus, and the same epithet can occur in many genera (*vulgaris*, *sinensis*). Above the species, a name is a single capitalised word, upright.
2. **Types.** Every name is tied to a **type**: for a species, a particular specimen (the **holotype**) in a museum or herbarium, or for prokaryotes a living **type strain** deposited in at least two public culture collections in different countries; for a genus, a type species; for a family, a type genus. The type anchors the name: whatever taxon the type ends up in, the name goes with it. If a species is later split, the part containing the holotype keeps the old name.
3. **Priority.** Of two or more names for the same taxon (**synonyms**), the earliest validly published one is correct, unless the relevant body has formally conserved a later one. Two different taxa may not bear the same name (**homonyms**) within one code; the later one must be replaced.
4. **Independence.** The codes are independent of each other. The same genus name may be used for an animal and a plant: *Prunella* is both a genus of songbirds (the dunnock, *Prunella modularis*) and a genus of mints (selfheal, *Prunella vulgaris*). Organisms that once fell between codes, such as the photosynthetic flagellate *Euglena*, have sometimes been named under both.

The codes also differ in details that matter in practice. Zoology allows **tautonyms**, in which genus and epithet are the same (*Gorilla gorilla*, *Bufo bufo*, *Rattus rattus*); botany forbids them. Author citations differ: zoologists write the author's name and year, and put them in parentheses when the species has since been moved to another genus — *Panthera leo* (Linnaeus, 1758), because Linnaeus named it *Felis leo* — whereas botanists use standard abbreviations, cite the original author in parentheses and add the author of the new combination: *Picea abies* (L.) H.Karst., first named *Pinus abies* by Linnaeus ("L.") and moved to *Picea* by Hermann Karsten. Fungi with separate sexual and asexual stages used to be allowed two names; since 2013 the ICN has required one name for one fungus.

::: example Reading a scientific name {#ex-names}
Interpret each of the following: (a) *Homo sapiens* Linnaeus, 1758; (b) *Panthera tigris* (Linnaeus, 1758); (c) *Arabidopsis thaliana* (L.) Heynh.; (d) *Escherichia coli* K-12; (e) "*Candidatus* Pelagibacter ubique"; (f) Hominidae; (g) Rosales.
::: solution
(a) An animal species named by Linnaeus in 1758 and still in his genus (no parentheses); its lectotype, designated by William Stearn in 1959, is Linnaeus himself.

(b) An animal species originally described by Linnaeus in 1758 in another genus (*Felis tigris*) and later transferred, hence the parentheses.

(c) A plant: Linnaeus described it (as *Arabis thaliana*), and Gustav Heynhold moved it to *Arabidopsis* in 1842. Botanical author abbreviations are standardised (here L. and Heynh.).

(d) A bacterial species followed by a strain designation, which is written upright and is not part of the name governed by the code.

(e) A provisional name for an organism (the abundant marine bacterium of the SAR11 clade) that had not been validly named under the ICNP at the time; the status is shown by the word *Candidatus* in italics followed by the name in roman type within quotation marks, and such a name has no standing in priority. (*Pelagibacter* was later grown in culture, but the name remains provisional under the ICNP.)

(f) A family of animals (suffix *-idae*): the great apes including humans. (g) An order of plants (suffix *-ales*) in the ICN — the roses, elms, figs and relatives. The suffix alone does not distinguish botanical from bacterial orders; the context does.
:::
:::

::: warning "The scientific name proves the classification"
Names are labels fixed by rules, not statements of current knowledge. *Pseudomonas* remains a genus name whether or not its species turn out to be closely related; the order Insectivora was a name for a group that turned out to be polyphyletic. Conversely a stable name can survive a dramatic change in understanding — Fungi did not need renaming when molecular data showed that they are more closely related to animals than to plants. When you see a name, ask what evidence supports the group, not what the name implies.
:::

## Ranks and clades

[[evolution/phylogenetics#def-clade]] defined clades (monophyletic groups) and showed why "reptiles" without birds is paraphyletic. The Linnaean ranks and the clades of a phylogeny are two different kinds of thing, and confusing them causes much muddle.

::: definition Rank, clade, crown group and total group {#def-rank-clade}
A **rank** is a level in a classification hierarchy (genus, family, order …). Assigning a taxon to a rank is a convention; there is no requirement in the codes that taxa at the same rank be of the same age, diversity or degree of difference. A **clade** is an ancestor and all its descendants; whether a group is a clade is a fact about the tree, independent of convention. For a clade with living members, the **crown group** is the most recent common ancestor of all *living* members plus all its descendants (living and extinct); the **stem group** consists of extinct lineages that branched off the line leading to the crown after it split from its closest living relative; crown plus stem is the **total group** (or pan-group).
:::

Crown groups matter for dating. "The origin of birds" can mean the origin of the total group, when the lineage leading to birds split from that leading to crocodiles (well over 240 million years ago), or the origin of crown birds, the last common ancestor of all living birds (in the Late Cretaceous, roughly 70–100 million years ago according to most molecular clocks; the oldest crown-bird fossil, *Asteriornis*, is about 66.7 million years old), with *Archaeopteryx* a stem bird between the two. Whenever a divergence date is quoted in later chapters, it refers to a crown group unless stated otherwise.

Modern systematists, following Hennig, insist that named taxa should be clades. Ranks do not prevent that, but they get in the way in two ways. First, the number of ranks is limited, while a well-resolved tree has many nested clades: there are not enough ranks for every node, which is why so many intermediate ranks have been invented. Second, moving a group from one rank to another forces changes in its name's ending and in the names of everything below it. The **PhyloCode**, an alternative code of phylogenetic nomenclature that came into effect in 2020 with the volume *Phylonyms* (Kevin de Queiroz, Philip Cantino and Jacques Gauthier, editors), dispenses with ranks altogether and defines each name by reference to the tree: a **node-based** definition ("the smallest clade containing *A* and *B*"), a **branch-based** definition ("the largest clade containing *A* but not *Z*") or an **apomorphy-based** one ("the clade originating with the first ancestor to have feathers homologous with those of *Passer domesticus*"). It runs alongside the rank-based codes, which remain the system used for almost all names.

::: warning "Taxa of the same rank are comparable"
Counting families or orders is a common way to compare diversity across groups or through time, as in the mass-extinction studies of [[evolution/macroevolution]]. It is a useful proxy only when the ranks have been assigned in comparable ways. A family of beetles, a family of orchids and a family of bacteria are not equivalent units: they differ in age by hundreds of millions of years and in the genetic distance between their members by an order of magnitude. Some proposals tie ranks to divergence time ("temporal banding", John Avise and Glenn Johns, 1999) or, in bacteria, to genome distance (the Genome Taxonomy Database's normalised "relative evolutionary divergence"), but none is universal. Compare clades, with their ages, rather than ranks.
:::

::: quiz
On the tree ((lizards, (crocodiles, birds)), mammals), which of the following groups is a clade?
- [ ] "Reptiles": lizards plus crocodiles
- [x] Crocodiles plus birds (Archosauria)
- [ ] Birds plus mammals ("warm-blooded animals")
- [x] Lizards, crocodiles and birds (Reptilia in the phylogenetic sense)
::: solution
A clade contains an ancestor and all its descendants. The common ancestor of crocodiles and birds has only those two lineages among the taxa shown, so archosaurs form a clade; adding lizards gives the next more inclusive clade, Reptilia in its modern sense (with birds). Lizards plus crocodiles without birds is paraphyletic, and birds plus mammals is polyphyletic: endothermy evolved separately in the two lineages.
:::
:::

## From two kingdoms to three domains

### Kingdoms

Linnaeus recognised two kingdoms of life, Vegetabilia and Animalia (and a third, Lapides, for minerals). Microscopic organisms fitted neither. Ernst Haeckel, in *Generelle Morphologie der Organismen* (1866), proposed a third kingdom, Protista, for single-celled forms, and drew some of the first trees of life with the three kingdoms as branches. The fundamental division between cells with and without a nucleus was recognised by Édouard Chatton, who introduced the terms *procaryotique* and *eucaryotique* (1925, used systematically from 1938), and was established in modern form by Roger Stanier and Cornelis van Niel (1962). Herbert Copeland separated bacteria into a kingdom Monera (1938, developed in 1956).

Robert Whittaker's **five-kingdom** system (*Science*, 1969) became the textbook standard for a generation: Monera (prokaryotes), Protista (unicellular eukaryotes), Fungi, Plantae and Animalia, with the three multicellular kingdoms distinguished by their mode of nutrition — absorption, photosynthesis and ingestion. It was an ecological as much as a phylogenetic scheme, and it was soon overtaken by molecular data.

### The discovery of Archaea

In the 1970s Carl Woese at the University of Illinois began to compare organisms by the sequence of their small-subunit ribosomal RNA (16S rRNA in prokaryotes, 18S in eukaryotes). He chose this molecule because it is present in every cellular organism, performs the same function in all, is large enough to carry much information, has regions that change at very different rates (so that both close and distant relationships can be studied), and is rarely transferred between species. Using catalogues of the oligonucleotides produced by digesting rRNA with ribonuclease T1, Woese and George Fox (1977) found that methane-producing microbes — then regarded as bacteria — were as different from typical bacteria as either was from eukaryotes. They named them archaebacteria and proposed three "primary kingdoms" (urkingdoms).

::: definition The three domains {#def-domains}
In 1990 Woese, Otto Kandler and Mark Wheelis proposed a rank above kingdom, the **domain**, and three domains: **Bacteria**, **Archaea** and **Eucarya** (now usually spelled Eukarya). Bacteria and Archaea are both prokaryotic, but differ in membrane lipids (ester-linked fatty acids on glycerol-3-phosphate in Bacteria; ether-linked isoprenoids on glycerol-1-phosphate in Archaea), cell walls (peptidoglycan in most Bacteria, never in Archaea), and in their machinery for transcription and translation, in which Archaea resemble eukaryotes (multisubunit RNA polymerases, TATA-binding protein, histones in many lineages, eukaryote-like translation initiation factors).
:::

Where is the root of the tree of the three domains? A tree built from one gene family cannot be rooted without an outgroup, and nothing lies outside all of life. The ingenious solution (Johann Peter Gogarten and colleagues, and Naoyuki Iwabe and colleagues, both 1989) was to use pairs of **paralogous genes** that duplicated before the last universal common ancestor (LUCA) — for example the two elongation factors EF-Tu and EF-G, or the catalytic and non-catalytic subunits of the proton-pumping ATPases. Each copy roots the tree of the other. Both studies placed the root between Bacteria and the Archaea–eukaryote lineage, which makes Archaea and eukaryotes sister groups. That rooting is still widely, if not universally, accepted.

### Two domains or three?

The three-domain tree assumes that Archaea form a clade, sister to eukaryotes. An old alternative, the **eocyte hypothesis** of James Lake and colleagues (1984), based on ribosome shape, proposed instead that eukaryotes arose from *within* the Archaea, from relatives of the sulfur-dependent "eocytes" (now Thermoproteota). On that view there are only two primary domains, Bacteria and Archaea, with eukaryotes a branch of the latter.

The debate was transformed by metagenomics. In 2015 Anja Spang, Thijs Ettema and colleagues assembled the genome of an uncultured archaeon, **Lokiarchaeota**, from sediment near the Loki's Castle hydrothermal vents in the Arctic Ocean. It branched next to eukaryotes and encoded many **eukaryotic signature proteins** — homologues of actins, small GTPases and membrane-remodelling machinery once thought unique to eukaryotes. Relatives (Thor-, Odin-, Heimdallarchaeota) followed as the **Asgard archaea** (Katarzyna Zaremba-Niedzwiedzka and colleagues, 2017). In 2020 Hiroyuki Imachi, Masaru Nobu and colleagues grew the first Asgard archaeon, '*Candidatus* Prometheoarchaeum syntrophicum' MK-D1, after twelve years of enrichment: a tiny cell with long protrusions, doubling every 14–25 days in syntrophy with hydrogen-consuming partners. In 2023 Christa Schleper's group cultured *Lokiarchaeum ossiferum* and imaged its actin cytoskeleton.

::: proposition The two-domains tree, as of 2026 {#prop-two-domains}
Most phylogenomic analyses that use many conserved proteins, dense sampling of archaeal diversity and substitution models that account for variation in amino-acid composition across sites and lineages recover eukaryotes **nested within the Archaea**, as the sister group of, or within, the Asgard archaea — in the largest analysis to date, close to the Heimdallarchaeia (Laura Eme and colleagues, *Nature*, 2023; Tom Williams and colleagues, *Nature Ecology & Evolution*, 2020). On this two-domains tree, Archaea in the traditional sense (excluding eukaryotes) are paraphyletic. The result is not unanimous: some analyses have argued that the eukaryote–Asgard grouping is an artefact of fast-evolving sites, compositional bias or contamination of metagenomic genomes (for example Violette Da Cunha and colleagues, 2017), and the exact position of eukaryotes within the Asgard radiation is still debated. The domains Bacteria, Archaea and Eukarya continue to be used as convenient ranks.
:::

What changed after 2015 was not that a two-domains tree became conceivable — it had been proposed in 1984 — but that the archaeal relatives of eukaryotes were finally sampled, which is what it takes to settle where a branch attaches. A corollary is that the eukaryotic cell is a chimera of an Asgard-like archaeal host and an alphaproteobacterial endosymbiont that became the mitochondrion ([[diversity-of-life/protists]]).

::: widget graph
nodes: LUCA@0,2; Bacteria@3,4; Archaea@1.5,1.2; TACK and others@3,2.6; Asgard archaea@2.3,0.6; Heimdallarchaeia@3,1.4; Eukarya@4,0.2
edges: LUCA>Bacteria; LUCA>Archaea; Archaea>TACK and others; Archaea>Asgard archaea; Asgard archaea>Heimdallarchaeia; Asgard archaea>Eukarya
caption: The two-domains tree of life drawn as a directed graph, with arrows running from ancestors to descendants. Eukarya attach inside the Archaea, as a branch of the Asgard archaea; the exact attachment point (sister to Heimdallarchaeia, or within them) is debated, and this sketch shows the simplest version. Drag the nodes to compare with the three-domains tree, in which the Eukarya branch would join the archaeal lineage *before* Archaea diversified. Notice that a group "Archaea" excluding Eukarya would leave out one descendant of the node labelled Archaea — it would be paraphyletic. Branch lengths and positions carry no meaning.
:::

::: quiz
If eukaryotes evolved from within the Asgard archaea, which statement is correct?
- [ ] Eukaryotes are descended from modern Lokiarchaeota.
- [x] Some living archaea are more closely related to eukaryotes than to other archaea.
- [ ] The three-domain classification must stop being used.
- [ ] Bacteria are more closely related to eukaryotes than to archaea.
::: solution
Nesting eukaryotes within Archaea means that the Asgard archaea share a more recent common ancestor with eukaryotes than with, say, *Sulfolobus*. No living species is the ancestor of another: eukaryotes and modern Asgard archaea share an ancestor, which was neither. Ranks can be kept for convenience even when a ranked group is paraphyletic (many classifications retain "Archaea" as a domain); and bacteria remain the outgroup to both under either hypothesis, given the standard rooting.
:::
:::

### Beyond the domains

Other schemes followed: Thomas Cavalier-Smith's six kingdoms (1998) and the seven kingdoms of Michael Ruggiero and colleagues (2015), which knowingly keep some paraphyletic kingdoms such as Protozoa for convenience. Protistologists now prefer rankless **supergroups** defined as clades ([[diversity-of-life/protists]]), and for prokaryotes the **Genome Taxonomy Database** (GTDB; Donovan Parks, Philip Hugenholtz and colleagues, from 2018) classifies hundreds of thousands of genomes from cultures and metagenomes, with ranks normalised by evolutionary divergence — more than 100,000 species clusters in release R220 (2024) ([[diversity-of-life/bacteria-archaea]]).

## Identifying species: morphology and barcodes

Most species are still recognised by morphology, interpreted through the species concepts of [[evolution/speciation#def-bsc]], but DNA increasingly helps. **DNA barcoding** (Paul Hebert and colleagues, 2003) compares a standard short sequence with a reference library: for animals a 648-base-pair region of the mitochondrial gene for cytochrome *c* oxidase subunit I (COI), for plants the plastid genes *rbcL* and *matK* (2009), for fungi the nuclear ribosomal internal transcribed spacer (ITS, 2012). It works when distances within species are consistently smaller than those between species — the **barcode gap** — and fails for recently diverged or hybridising species.

Bacteria and archaea, with little morphology and much horizontal gene transfer, are delimited operationally: two genomes are usually placed in the same species if their **average nucleotide identity** (ANI) is at least about 95 % (Chirag Jain and colleagues, 2018, found a clear gap in ANI among 90,000 genomes at about this value). For 16S rRNA, similarity below about 98.7 % usually indicates different species, and environmental surveys cluster 16S sequences into **operational taxonomic units** (OTUs, often at 97 %) or exact **amplicon sequence variants**.

::: application Barcodes against fraud and trafficking
Barcoding is routine in food authentication and wildlife forensics: surveys of seafood repeatedly find a fraction mislabelled — from a few per cent to over a third, depending on product and place — and enforcement agencies identify ivory, shark fin and timber regulated under CITES, where processed products have no useful morphology. Environmental DNA (eDNA) amplified from water or soil detects rare or invasive species without catching them ([[conservation-biology]]).
:::

## How many species are there?

The number of species on Earth is one of the most basic unknowns in biology. Described species are a biased sample: large, conspicuous, temperate, terrestrial organisms are well known; small, tropical, marine, soil-dwelling and parasitic organisms are not. About 15,000–20,000 new species are described each year, most of them insects. Three types of method are used to estimate the total.

**Extrapolation from well-known groups.** If 1 bird species in 10 is a forest specialist of some region, perhaps insects show the same proportion; or if each plant species hosts a certain number of specialist beetles, multiply. Terry Erwin's famous estimate of 30 million tropical arthropods (1982), obtained by fogging the canopy of Panamanian trees with insecticide and scaling up from host specificity, was of this kind. Later work with better data on host specificity (for example Nigel Stork's estimate of about 5.5 million insect species, 2018, with a range of 2.6–7.8 million) has brought such estimates down.

**Higher-taxon patterns.** Camilo Mora and colleagues (*PLoS Biology*, 2011) noted that higher taxa (phyla, classes, orders, families, genera) are much more completely described than species, because a new family is rarely discovered. Plotting the cumulative number of taxa described over time at each rank, they estimated the asymptote for each higher rank, found that the asymptotic numbers varied predictably with rank, and extrapolated the relationship to the species level. Their estimate for eukaryotes was **8.7 million species (± 1.3 million, standard error)** — about 7.8 million animals, 611,000 fungi, 298,000 plants, 36,400 protozoa and 27,500 chromists — of which about 2.2 million are marine, implying that some 86 % of species on land and 91 % in the ocean were then undescribed. They did not estimate prokaryotes, whose higher taxonomy is not complete enough for the method.

**Sampling-based estimators.** Within a single survey, the pattern of rare species predicts how many species were missed (below).

Each method has been criticised. The higher-taxon method assumes that higher taxa are almost all described and consistently ranked; its plant estimate is already below the roughly 374,000 described plant species counted by Maarten Christenhusz and James Byng (2016), and its fungal estimate far below others (2.2–3.8 million; David Hawksworth and Robert Lücking, 2017). Peter Caley and colleagues (2014) showed that published global estimates have not converged over decades. The honest summary: eukaryotic species number several million to perhaps a few tens of millions, and we have named a minority.

For prokaryotes the uncertainty is larger still, partly because the species concept itself is operational. Kenneth Locey and Jay Lennon (2016), extrapolating a scaling law between the number of individuals in a community and its richness, suggested up to a trillion ($10^{12}$) microbial species; Stilianos Louca and colleagues (2019), from a census of 16S sequences, estimated only about 0.8–1.6 million prokaryotic OTUs. The two figures differ by six orders of magnitude, mainly because they make different assumptions about how many very rare types exist.

::: example A higher-taxon extrapolation for mammals {#ex-higher-taxon}
The Mammal Diversity Database (Connor Burgin and colleagues, 2018) recognised 27 orders, 167 families, 1,314 genera and 6,495 species of mammals. Number the ranks order = 2, family = 3, genus = 4, species = 5. Fit a straight line to $\log_{10}$(number of taxa) against rank for orders, families and genera, and predict the number of species. Compare with the actual count.
::: solution
The logarithms are $\log_{10}27 = 1.431$, $\log_{10}167 = 2.223$ and $\log_{10}1314 = 3.119$. With three equally spaced points, the least-squares slope is $(3.119 - 1.431)/2 = 0.844$ per rank, and the line passes through the mean point (rank 3, $\bar y = 2.258$). At rank 5 the prediction is $2.258 + 2\times0.844 = 3.945$, i.e. $10^{3.945} \approx 8{,}800$ species.

The actual count is 6,495, so the extrapolation overshoots by about 35 %. The ratios between successive ranks are not constant (6.2 families per order, 7.9 genera per family, but only 4.9 species per genus), and a small change in slope changes the prediction by a large factor because it is multiplied up on a logarithmic scale. Mora and colleagues used asymptotic rather than raw counts, fitted a different function, and validated the method on well-catalogued groups, but this example shows why the confidence interval of any such extrapolation must be taken seriously.
:::
:::

### Estimating richness from a sample

Suppose you set light traps for moths on a mountain for a season and identify 120 species. You certainly missed some. How many? The key insight, due to Anne Chao (1984) building on ideas of Alan Turing and I. J. Good, is that the number of species you have seen only once or twice tells you about the number you have not seen at all. If many species are singletons, many more are probably rarer still and were missed; if almost every species was seen many times, the sample is nearly complete.

::: proposition The Chao1 estimator {#prop-chao1}
Let $S_\mathrm{obs}$ be the number of species observed in a sample of individuals, $f_1$ the number of species represented by exactly one individual (singletons) and $f_2$ the number represented by exactly two (doubletons). The **Chao1** estimator of the total number of species in the sampled community is

$$
\hat S_\mathrm{Chao1} = S_\mathrm{obs} + \frac{f_1^2}{2f_2},
$$ {#eq-chao1}

and, in the bias-corrected form used when $f_2$ is small or zero,

$$
\hat S_\mathrm{Chao1,bc} = S_\mathrm{obs} + \frac{f_1(f_1 - 1)}{2(f_2 + 1)}.
$$ {#eq-chao1bc}

$\hat S_\mathrm{Chao1}$ is a **lower bound** on the expected richness under the assumptions below, not an unbiased estimate of it.
:::

::: proof {collapsed}
A sketch. Suppose the sample is $n$ individuals drawn at random from a community in which species $i$ has relative abundance $p_i$, so that the number of individuals of species $i$ caught is approximately Poisson with mean $\lambda_i = np_i$. Then the expected numbers of species caught exactly $k$ times are $\E[f_k] = \sum_i e^{-\lambda_i}\lambda_i^k/k!$, and the expected number missed is $\E[f_0] = \sum_i e^{-\lambda_i}$.

Write $a_i = e^{-\lambda_i}$, so $\E f_0 = \sum a_i$, $\E f_1 = \sum a_i\lambda_i$ and $2\E f_2 = \sum a_i\lambda_i^2$. By the Cauchy–Schwarz inequality,

$$
\Big(\sum_i a_i\lambda_i\Big)^2 = \Big(\sum_i \sqrt{a_i}\cdot\sqrt{a_i}\lambda_i\Big)^2 \le \Big(\sum_i a_i\Big)\Big(\sum_i a_i\lambda_i^2\Big),
$$

that is, $(\E f_1)^2 \le \E f_0 \cdot 2\E f_2$, so $\E f_0 \ge (\E f_1)^2/(2\E f_2)$. Replacing expectations by observed counts gives [[#eq-chao1]]. Equality holds when all species have the same abundance; when abundances are unequal, as they always are, the true number of missed species is larger, hence "lower bound". The bias-corrected form comes from a more careful treatment of finite samples (Chao, 2005).
:::

The assumptions matter: individuals must be sampled independently and at random from a single, closed community, and all species must be detectable. Patchily distributed or seasonal species, and species that the method cannot catch (moths that do not come to light), are not accounted for. Chao1 is a starting point, typically reported with a confidence interval, alongside other estimators (abundance-based coverage, ACE; jackknife estimators) and the extrapolation of species-accumulation curves.

::: example Moths on a mountain {#ex-chao1}
A season of light-trapping yields 120 species, of which 45 are singletons and 20 are doubletons. Estimate the total species richness with Chao1 and with its bias-corrected form.
::: solution
By [[#eq-chao1]], $\hat S = 120 + 45^2/(2\times20) = 120 + 2025/40 = 120 + 50.6 = 170.6$, about 171 species. By [[#eq-chao1bc]], $\hat S = 120 + (45\times44)/(2\times21) = 120 + 47.1 = 167.1$. Either way the survey has detected only about 70 % of the moth species expected to come to light there, and further sampling would add about 50. The high proportion of singletons (45 of 120, 38 %) is typical of tropical insect samples and signals incompleteness.
:::
:::

### Accumulation curves

A **species-accumulation curve** plots the cumulative number of species found against sampling effort (individuals, traps, hours). It rises steeply at first and flattens as fewer new species turn up. One way to estimate total richness is to fit a curve with an asymptote and read off the asymptote. A common choice — an empirical description, with no mechanism behind it — is the hyperbola borrowed from enzyme kinetics,

$$
S(n) = \frac{S_{\max}\,n}{B + n},
$$ {#eq-accum}

where $n$ is the effort, $S_{\max}$ the asymptotic richness and $B$ the effort at which half of it has been found.

::: example Fitting an asymptote {#ex-accum}
After 100 trap-nights a survey has found 60 species, and after 400 trap-nights 120 species. Assuming [[#eq-accum]], estimate $S_{\max}$ and $B$, and predict the number of species after 1,000 trap-nights.
::: solution
From $60 = 100S_{\max}/(B + 100)$ and $120 = 400S_{\max}/(B + 400)$, divide the second by the first: $2 = 4(B + 100)/(B + 400)$, so $2B + 800 = 4B + 400$ and $B = 200$. Then $S_{\max} = 60(200 + 100)/100 = 180$. After 1,000 trap-nights, $S = 180\times1000/1200 = 150$ species. Quadrupling the effort from 100 to 400 nights doubled the species count; going from 400 to 1,000 adds only 30 more. The asymptote of 180 is an extrapolation of the chosen curve: other curves fitted to the same two points would give different values, which is why extrapolated asymptotes should be checked against estimators such as Chao1 and reported with their uncertainty.
:::
:::

::: widget plot
f: S*x/(B + x)
x: 0, 2000
y: 0, 300
sliders: S=180:50:300:5; B=200:20:1000:10
hlines: 180
labels: S(n)
points: 100, 60; 400, 120
caption: The hyperbolic accumulation curve $S(n) = S_{\max} n/(B+n)$ of [[#eq-accum]], with the two observations of [[#ex-accum]] (100 and 400 trap-nights) as points and the fitted asymptote $S_{\max} = 180$ as a horizontal line. Move the sliders: many combinations of $S_{\max}$ and $B$ pass close to two points, but only $S_{\max} = 180$, $B = 200$ passes through both. Notice that a larger $B$ means the curve flattens more slowly, so a survey that is still rising steeply when it stops leaves the asymptote poorly determined.
:::

::: history
Modern taxonomy begins with Carl Linnaeus, whose *Species Plantarum* (1753) and 10th edition of *Systema Naturae* (1758) used binomial names consistently and are the starting points of botanical and zoological nomenclature. Darwin (1859) argued that a natural classification should be genealogical; Ernst Haeckel (1866) coined "phylogeny" and the kingdom Protista. Édouard Chatton (1925, 1938) distinguished prokaryotes from eukaryotes and Robert Whittaker (1969) proposed five kingdoms. Willi Hennig (1950, English 1966) made clades the basis of classification. Carl Woese and George Fox (1977) discovered the Archaea from ribosomal RNA, and Woese, Otto Kandler and Mark Wheelis (1990) proposed three domains; James Lake (1984) had proposed the eocyte, two-domains alternative. Metagenomics brought the Lokiarchaeota (2015), the Asgard archaea (2017) and their first culture (2020), and revived the two-domains tree.
:::

::: summary
- Taxonomy discovers, describes and names species; systematics reconstructs their relationships; nomenclature is the rule system for names. The codes (ICZN, ICN, ICNP, with ICTV for viruses) are independent; they share binomial names, types, priority and the ban on homonyms within a code, and differ in starting dates (1758 for animals, 1753 for most plants, 1980 for prokaryotes) and details such as tautonyms and author citations.
- Ranks are conventions; clades are facts about the tree. Named taxa should be clades, but ranks of the same name are not comparable across groups. Crown groups are defined by living members; total groups add the stem.
- Ribosomal RNA revealed the Archaea (Woese and Fox, 1977) and the three domains (1990). Rooting with ancient paralogues places the root between Bacteria and Archaea + eukaryotes.
- As of 2026, most phylogenomic analyses place eukaryotes within the Asgard archaea, making a two-domains tree, but the result and the exact branching point are still debated; the three domains remain in use as ranks.
- Species are identified by morphology, DNA barcodes (COI in animals, *rbcL* + *matK* in plants, ITS in fungi) and, for prokaryotes, genome identity (ANI ≥ about 95 %).
- About 2.1 million species have names; estimates for eukaryotes range from several million (Mora et al., 2011: 8.7 ± 1.3 million) upwards, and for prokaryotes over six orders of magnitude. Chao1, $S_\mathrm{obs} + f_1^2/2f_2$, is a lower-bound estimate of richness from singletons and doubletons; accumulation curves extrapolate to an asymptote.
:::

## Exercises

::: exercise Singletons and doubletons {level=1 check="59"}
A survey of soil mites finds 50 species, 12 of them singletons and 8 doubletons. What is the Chao1 estimate of species richness?
::: solution
$\hat S = 50 + 12^2/(2\times8) = 50 + 144/16 = 50 + 9 = 59$ species.
:::
:::

::: exercise What is still unknown {level=1 check="86.2"}
If 1.2 million of an estimated 8.7 million eukaryotic species are described, what percentage is undescribed, to one decimal place?
::: solution
$(1 - 1.2/8.7)\times100 = (1 - 0.1379)\times100 = 86.2\,\%$.
:::
:::

::: exercise Writing names correctly {level=1}
Correct the formatting of each name or say why it is already correct: (a) Homo Sapiens; (b) *escherichia coli*; (c) *Drosophila Melanogaster* Meigen 1830; (d) *Rattus rattus*; (e) *Quercus quercus* for an oak; (f) the family *Rosaceae*.
::: solution
(a) *Homo sapiens*: italic, genus capitalised, epithet lower case. (b) *Escherichia coli*: the genus is capitalised. (c) *Drosophila melanogaster* Meigen, 1830: lower-case epithet; the author and year follow the name upright, separated by a comma in zoological usage. (d) Correct: a tautonym, allowed under the zoological code. (e) Not permissible: tautonyms are forbidden under the botanical code. (f) Rosaceae: names above the genus are capitalised but not italicised (in most house styles, including this atlas's).
:::
:::

::: exercise An accumulation curve {level=2 check="120"}
A bird survey finds 40 species after 50 point counts and 80 species after 200 point counts. Assuming $S(n) = S_{\max} n/(B + n)$, find $S_{\max}$.
::: solution
Dividing the two equations: $80/40 = [200/(B + 200)]/[50/(B + 50)]$, so $2 = 4(B + 50)/(B + 200)$, giving $2B + 400 = 4B + 200$ and $B = 100$. Then $S_{\max} = 40(100 + 50)/50 = 120$ species.
:::
:::

::: exercise No doubletons {level=2 check="45"}
A sample of 30 species contains 6 singletons and no doubletons. Why can the classic Chao1 formula not be used? What does the bias-corrected form give?
::: solution
With $f_2 = 0$, $f_1^2/(2f_2)$ is infinite. The bias-corrected form gives $30 + 6\times5/(2\times1) = 30 + 15 = 45$ species.
:::
:::

::: exercise Paraphyletic ranks {level=2}
Assume the two-domains tree of [[#prop-two-domains]]. For each group, say whether it is monophyletic or paraphyletic: (a) Bacteria; (b) Archaea, as traditionally defined (excluding eukaryotes); (c) prokaryotes; (d) Archaea including eukaryotes; (e) Protista in Haeckel's sense (all eukaryotes except plants, animals and fungi). Then explain why a classification might nevertheless keep some of the paraphyletic groups as ranks.
::: solution
(a) Monophyletic, assuming the standard rooting. (b) Paraphyletic: it excludes eukaryotes, which descend from within it. (c) Paraphyletic: Bacteria plus Archaea exclude eukaryotes, descendants of their common ancestor (LUCA). (d) Monophyletic. (e) Paraphyletic: plants, animals and fungi all descend from within the "protists". Classifications sometimes keep paraphyletic groups because they are familiar, correspond to a grade of organisation (unicellular eukaryotes), and match the way scientific communities, collections and databases are organised; but they cannot be used to infer relationships, and many systematists object to them on principle.
:::
:::

::: exercise A higher-taxon estimate {level=3 check="2486"}
In a hypothetical well-studied group there are 10 orders, 60 families and 400 genera. With ranks numbered order = 2, family = 3, genus = 4, fit a least-squares line to $\log_{10}$(count) against rank and predict the number of species (rank 5), to the nearest whole number. Then explain two ways in which the answer could be badly wrong.
::: hint
With three equally spaced $x$ values, the least-squares slope is (last $y$ − first $y$)/2 and the line passes through the mean of the points.
:::
::: solution
$y = \log_{10}$ counts: 1.0000, 1.7782, 2.6021. Slope $(2.6021 - 1.0000)/2 = 0.80103$; mean $\bar y = 1.79342$ at rank 3. At rank 5: $1.79342 + 2\times0.80103 = 3.39546$, so $10^{3.39546} = 2{,}486$ species.

It could be wrong because (1) the relationship between log count and rank need not be linear, and the species-per-genus ratio depends on how "splitting" the taxonomists of the group are; (2) counts of higher taxa may themselves be incomplete or inconsistently ranked; (3) a small error in the slope is magnified by extrapolation on a log scale — a slope of 0.75 instead of 0.80 changes the prediction to about 1,960.
:::
:::

::: exercise Two domains or three {level=3}
Explain (a) why a phylogeny of all life cannot be rooted with an ordinary outgroup, and how ancient paralogues solve this; (b) why the discovery of the Asgard archaea was decisive evidence in the two- versus three-domains debate, rather than simply more data; and (c) why models of protein evolution that allow amino-acid composition to differ among sites tend to change the answer. What kind of result would revive the three-domains tree?
::: solution
(a) An outgroup must lie outside the group being rooted, and nothing lies outside all cellular life. Genes that duplicated in an ancestor of LUCA exist as two copies in every lineage; in a joint tree of both copies, each copy is an outgroup to the other, and the root of each subtree lies on the branch between them.

(b) A branch's position is decided by its closest relatives. Before 2015 those relatives were unsampled, so eukaryotes attached at the end of a long branch, where artefacts are worst; lineages sharing eukaryotic signature proteins and branching next to eukaryotes broke that branch up and supplied specific shared derived features.

(c) Simple models assume one amino-acid composition for all sites, and can group sequences by similar composition rather than ancestry; site-heterogeneous models reduce this artefact and have usually favoured two domains. The three-domains tree would be revived by robust, well-sampled analyses consistently placing eukaryotes outside a monophyletic Archaea, or by evidence that Asgard eukaryotic signature proteins were acquired by horizontal transfer from eukaryotes.
:::
:::

