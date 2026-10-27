A mushroom is the smallest part of a fungus. Beneath the forest floor, the organism that produced it is a web of threads a few micrometres wide, which may extend for metres or kilometres through soil and wood, digesting what it touches. Fungi are the great decomposers of the living world, the only organisms that break down wood on a large scale; they form partnerships with the roots of most land plants and with algae and cyanobacteria as lichens; they cause most plant diseases, and some devastating diseases of animals; and they have given us bread, beer, wine, cheese, penicillin and the first eukaryotic genome to be sequenced. They are also, as molecular phylogenies showed in the 1990s, more closely related to animals than to plants.

This chapter describes how fungi are built and how they feed, their life cycles and the unusual genetics of their mating systems, their major lineages and their history, and their symbioses with plants and photosynthetic microbes. Quantitative threads include the exponential growth of a branching mycelium, the physics of spore dispersal, and the arithmetic of mating types. Fungal ecology in soils and ecosystems is developed further in [[ecology]]; fungal pathogens of humans belong to [Medicine Atlas](/learn/medicine/course.php?c=microbiology).

## What is a fungus?

::: definition Fungi {#def-fungi}
**Fungi** are a clade of eukaryotes within the Opisthokonta ([[diversity-of-life/protists#def-supergroups]]) that are **heterotrophic by absorption**: they secrete digestive enzymes into their surroundings and absorb the small molecules released. Most grow as **hyphae** — tubular cells or chains of cells, 2–10 µm wide, that extend at their tips and branch — forming a network called a **mycelium**; others, the **yeasts**, are single cells that divide by budding or fission. Fungal cell walls contain **chitin** (a polymer of *N*-acetylglucosamine, also found in arthropod exoskeletons) and β-glucans, and their membranes contain the sterol **ergosterol** rather than cholesterol. Fungi store carbohydrate as glycogen, like animals, not as starch.
:::

The hypha is the key to the fungal way of life. Growth occurs only at the tip, where a cluster of secretory vesicles (the **Spitzenkörper**) delivers new wall and membrane material, driven by the cell's turgor pressure. The tip can push through soil, wood and plant cell walls, and it secretes enzymes as it goes; the absorbed nutrients flow back through the network. In many fungi, hyphae are divided by cross-walls (**septa**) with pores that allow cytoplasm, and even nuclei, to pass; in others they are **coenocytic**, with many nuclei in a continuous cytoplasm. Hyphae of the same individual fuse (**anastomosis**), making the mycelium a connected network that can redistribute water and nutrients over long distances.

A mycelium is mostly surface. Hyphae a few micrometres wide have a surface-to-volume ratio approaching that of bacteria, ideal for absorption, and a gram of soil may contain tens to hundreds of metres of hyphae. The fruiting bodies — mushrooms, brackets, truffles, cups — are dense masses of hyphae built only for producing and dispersing spores.

::: warning "Fungi are plants" and "mushrooms are the fungus"
Fungi were classified as plants until the twentieth century, because they are sedentary and have cell walls. But their walls are chitin, not cellulose, they cannot photosynthesise, they store glycogen, and their flagellated forms (in chytrids) have a single posterior flagellum, as do animal sperm — the defining feature of opisthokonts. Molecular phylogenies place fungi with animals, their common ancestor living roughly a billion years ago or more. And the visible mushroom is only a reproductive structure: the fungus is the mycelium, usually invisible, and many fungi never make conspicuous fruiting bodies at all.
:::

### How a mycelium grows

A single hyphal tip extends at a roughly constant rate, but branching multiplies the number of tips. Anthony Trinci (1974) found that in many fungi the ratio of total hyphal length to the number of tips, the **hyphal growth unit**, stays nearly constant as a young mycelium grows: new branches form so as to keep it constant.

::: proposition Exponential growth of a branching mycelium {#prop-hyphal}
Suppose each tip extends at a constant rate $E$ (length per time) and branching keeps the hyphal growth unit $G = L/n$ constant, where $L$ is the total hyphal length and $n$ the number of tips. Then

$$
L(t) = L_0\,e^{(E/G)t},
$$ {#eq-hyphal}

so the mycelium grows exponentially with specific growth rate $E/G$ and doubling time $G\ln2/E$, even though no individual tip accelerates.
:::

::: proof
All growth is at the tips, so $dL/dt = En$. With $n = L/G$, $dL/dt = (E/G)L$, whose solution is $L = L_0e^{(E/G)t}$. The doubling time follows from $e^{(E/G)t_2} = 2$.
:::

::: example A young mycelium {#ex-hyphal}
A germinating spore of a mould produces hyphae whose tips extend at 5 µm min⁻¹, and the mycelium branches so as to keep a hyphal growth unit of 300 µm. (a) What is the doubling time of total hyphal length? (b) Starting from 300 µm of hypha with one tip, how much hypha and how many tips are there after 6 hours, if growth stays exponential?
::: solution
(a) By [[#prop-hyphal]], the specific growth rate is $E/G = 5/300 = 0.0167$ min⁻¹, so the doubling time is $300\ln2/5 = 41.6$ min.

(b) After 360 min, $L = 300\times e^{0.0167\times360} = 300\times e^{6} = 300\times403 = 1.2\times10^5$ µm, about 12 cm of hypha, with $L/G \approx 400$ tips. Each tip has grown only $5\times360 = 1.8$ mm in that time: the mycelium's growth is exponential because the number of tips is, not because any tip speeds up — the same logic as for a population of dividing cells.
:::
:::

This exponential phase lasts only while the mycelium is small and nutrients are abundant. On an agar plate the colony soon settles into a different regime: its outer margin advances at a constant speed, so its radius grows linearly with time, while the interior, where nutrients are exhausted, stops growing or turns to making spores. In soil, the same pattern produces **fairy rings**: a mycelium spreading outward from a centre, fruiting at its active margin.

::: example How old is the humongous fungus? {#ex-armillaria}
A single genetic individual of the honey fungus *Armillaria ostoyae* in the Malheur National Forest, Oregon, covers about 965 hectares, identified by genotyping samples across the area (Catherine Ferguson and colleagues, 2003). If it spread from one point as a circle, and its margin advances 0.2–1 m per year through the soil and roots, how old is it?
::: solution
The area is $9.65\times10^6$ m², so the radius of an equivalent circle is $\sqrt{9.65\times10^6/\pi} = 1{,}753$ m. At 1 m per year, it would take about 1,750 years; at 0.2 m per year, about 8,800. Ferguson and colleagues gave a range of 1,900 to 8,650 years. The calculation assumes steady spread from a single point; fragmentation by fire and the irregular shape of the real patch make it rough. The individual's biomass is unknown, but on any measure it is among the largest organisms on Earth — the comparison being with clonal plants such as the aspen grove "Pando".
:::
:::

## Life cycles

Fungi reproduce both asexually, by fragmentation or by mitotically produced spores (**conidia** in ascomycetes, **sporangiospores** in mucoromycetes), and sexually. Sexual reproduction has an unusual feature: the two steps of fertilisation are separated in time.

::: definition Plasmogamy, karyogamy and the dikaryon {#def-dikaryon}
In fungal sex, **plasmogamy** — the fusion of the cytoplasm of two compatible cells or hyphae — is followed, sometimes much later, by **karyogamy**, the fusion of their nuclei. Between the two, in ascomycetes and basidiomycetes (together the **Dikarya**), cells carry two genetically different haploid nuclei, one from each parent; such a cell or mycelium is a **dikaryon** ($n + n$). In basidiomycetes the dikaryotic mycelium can grow for years, and it is this mycelium that makes mushrooms. Karyogamy produces a short-lived diploid nucleus ($2n$), which undergoes meiosis at once to produce haploid sexual spores: **ascospores** inside a sac-like **ascus** (typically eight, after a post-meiotic mitosis), or **basidiospores** on the outside of a club-shaped **basidium** (typically four).
:::

In most fungi the diploid phase is a single cell, and the organism is haploid or dikaryotic for almost all of its life — the reverse of animals. Some yeasts, including *Saccharomyces cerevisiae*, can grow vegetatively as either haploids or diploids.

In basidiomycete dikaryons, each cell division must give both daughter cells one nucleus of each type. Many species achieve this with a **clamp connection**: one nucleus divides in a small side-branch that loops back and fuses with the cell behind, so that the two sister nuclei end up in different cells. Clamp connections are a visible sign of a dikaryon, and their fossils date the group (below).

### Mating types

Many fungi are **heterothallic**: two individuals can mate only if they differ at one or more **mating-type** loci. (**Homothallic** fungi can complete a sexual cycle alone.) In ascomycetes such as *Neurospora crassa* and yeast, there is a single mating-type locus with two forms (idiomorphs), *MAT1-1* and *MAT1-2* in *Neurospora* (in budding yeast, **a** and α). In many mushrooms there are two unlinked loci, *A* (encoding homeodomain transcription factors) and *B* (encoding pheromones and pheromone receptors), each with many alleles, and mating requires *different alleles at both loci*. This is the **tetrapolar** system; a single-locus system is **bipolar**.

::: proposition Mating compatibility {#prop-mating}
In a tetrapolar fungus with $a$ equally frequent alleles at the *A* locus and $b$ at the *B* locus (unlinked), there are $ab$ mating types, and the probability that two individuals chosen at random from the population are compatible is

$$
P_\mathrm{random} = \Big(1 - \frac1a\Big)\Big(1 - \frac1b\Big).
$$ {#eq-mating}

For a bipolar fungus with $a$ alleles, $P_\mathrm{random} = 1 - 1/a$. Among the haploid progeny of a single cross, the proportion of compatible sibling pairs is $\tfrac14$ in a tetrapolar fungus and $\tfrac12$ in a bipolar one.
:::

::: proof
Random partners have different *A* alleles with probability $1 - 1/a$ (the second partner has the first's allele with probability $1/a$), and independently different *B* alleles with probability $1 - 1/b$. Among the meiotic progeny of a dikaryon $A_1B_1 + A_2B_2$, the *A* and *B* loci segregate independently, giving four mating types $A_1B_1$, $A_1B_2$, $A_2B_1$, $A_2B_2$ in equal proportions. A given spore is compatible only with the type that differs at both loci, one of the four: probability $\tfrac14$. With one locus and two parental alleles, half the siblings carry the other allele: probability $\tfrac12$.
:::

Multiple alleles make outcrossing easy (with many alleles, almost every unrelated partner is compatible) while making inbreeding hard (only a quarter of siblings are compatible in a tetrapolar fungus). The record is held by the split-gill fungus *Schizophyllum commune*, whose *A* and *B* loci each consist of two linked, recombining subloci; with about 9 and 32 specificities at the two *A* subloci and about 9 at each *B* sublocus, it has more than 23,000 mating types.

::: example The split-gill fungus {#ex-schizophyllum}
Taking 9 × 32 *A* specificities and 9 × 9 *B* specificities for *Schizophyllum commune*, (a) how many mating types are there? (b) What fraction of random pairs is compatible, assuming all types are equally frequent? (c) What fraction of sibling pairs from one mushroom is compatible?
::: solution
(a) $A$: $9\times32 = 288$; $B$: $9\times9 = 81$; total $288\times81 = 23{,}328$ mating types.

(b) By [[#eq-mating]], $(1 - 1/288)(1 - 1/81) = 0.9965\times0.9877 = 0.984$. Practically any two unrelated individuals can mate.

(c) $\tfrac14$, because a single dikaryon carries only two *A* and two *B* specificities. (Recombination between the subloci can create a few new specificities among the progeny, raising this slightly.) The system promotes outbreeding about four-fold relative to random mating among siblings — a fungal analogue of the self-incompatibility systems of flowering plants ([[diversity-of-life/land-plants]]).
:::
:::

::: widget plot
f: (1 - 1/x)^2; 1 - 1/x
x: 2, 40
y: 0, 1
hlines: 0.25; 0.5
labels: \text{tetrapolar, } a = b = x; \text{bipolar, } a = x
caption: The probability that two random individuals can mate, from [[#eq-mating]], against the number $x$ of equally frequent alleles per mating-type locus, for a tetrapolar fungus (two loci, each with $x$ alleles) and a bipolar one (one locus). Both approach 1 as alleles multiply, so outcrossing is almost unrestricted in large populations. The dashed lines show the fixed sibling compatibilities, $\tfrac14$ and $\tfrac12$: with many alleles, a tetrapolar fungus is nearly four times more likely to mate with a stranger than with a sibling.
:::

## The diversity of fungi

About 150,000 species of fungi have been described, but estimates of the total range from about 2 to 4 million (2.2–3.8 million, David Hawksworth and Robert Lücking, 2017), most of them microscopic species known, if at all, from environmental DNA. Joseph Spatafora and colleagues' (2016) phylogenomic classification, with later additions, recognises the following main lineages.

| lineage | features and examples |
|---|---|
| **Cryptomycota** (Rozellomycota), **Aphelida**, **Microsporidia** | early-diverging, mostly intracellular parasites, lacking a chitinous wall during feeding. Microsporidia, obligate intracellular parasites of animals with tiny genomes and reduced mitochondria (mitosomes), inject themselves into host cells through a coiled polar tube. Whether these lineages are true fungi or their closest relatives depends on definitions. |
| **Chytridiomycota** (chytrids) | aquatic and soil fungi with flagellated zoospores; *Batrachochytrium dendrobatidis* causes chytridiomycosis of amphibians. |
| **Blastocladiomycota** | zoosporic; *Allomyces*, with an alternation of haploid and diploid multicellular generations. |
| **Zoopagomycota** | parasites and pathogens of animals and other fungi, including *Entomophthora*, which manipulates the behaviour of infected flies. |
| **Mucoromycota** | including the bread moulds (*Rhizopus*, *Mucor*), with coenocytic hyphae and thick-walled zygospores; and **Glomeromycotina**, the arbuscular mycorrhizal fungi, obligate symbionts of plant roots. |
| **Ascomycota** (sac fungi) | the largest group, about two-thirds of described species: yeasts (*Saccharomyces*, *Candida*), moulds (*Aspergillus*, *Penicillium*, *Neurospora*), cup fungi, morels and truffles, most lichen-forming fungi and many plant pathogens. |
| **Basidiomycota** (club fungi) | most mushrooms, brackets, puffballs, jelly fungi and the rusts and smuts that attack crops; most ectomycorrhizal fungi; the wood-decaying white-rot fungi. |

Flagellated zoospores in the early-diverging lineages, and their absence in the Dikarya, show that the flagellum was lost during fungal evolution — the ancestral fungus was aquatic and flagellated, like the opisthokont ancestor it shared with animals. The relatives of fungi among protists are the nucleariid amoebae, and together they form the **Holomycota**, sister to the Holozoa (animals and their relatives).

### Fungi in the fossil record and in time

Fungal fossils are rare, because hyphae are delicate. Exquisitely preserved fungi in the **Rhynie chert** of Scotland, about 407 million years old, include chytrids, ascomycetes and arbuscule-like structures inside the stems of the early land plant *Aglaophyton* (Winfried Remy and colleagues, 1994): mycorrhiza-like partnerships existed when plants were only a few centimetres high. Older claims include branching filaments from about 1 billion years ago in Arctic Canada (*Ourasphaira giraldae*; Corentin Loron and colleagues, 2019), whose fungal nature is debated. The Devonian *Prototaxites*, trunk-like columns up to 8 m tall, was long interpreted as a giant fungus, but recent chemical and anatomical work has questioned even that. Clamp connections in Carboniferous fossils document basidiomycetes by about 330 million years ago. Molecular clocks place the origin of crown fungi around 1 billion years ago or earlier, with very wide uncertainty.

Fungi may have shaped the carbon cycle. David Hibbett, Dimitrios Floudas and colleagues (2012) used a molecular clock to date the origin of the lignin-degrading peroxidases of white-rot fungi to about 300 million years ago, near the end of the Carboniferous, and suggested that before then wood accumulated undecayed, forming coal. Others have argued that coal formation depended more on tectonics and climate (Matthew Nelsen and colleagues, 2016); the hypothesis is contested.

## Spores and dispersal

A fungus is sedentary; its offspring travel as spores. The numbers are prodigious: Arthur Buller (1909) estimated that a single large giant puffball (*Calvatia gigantea*) contains about 7 trillion ($7\times10^{12}$) spores, and a single field mushroom releases hundreds of millions of spores per hour. Spores are tiny, a few micrometres across, and once airborne they fall so slowly that the faintest breeze can carry them far.

::: proposition Settling velocity of a spore {#prop-stokes}
A small sphere of radius $r$ and density $\rho_s$ falling through air of density $\rho_a$ and viscosity $\eta$ quickly reaches the terminal velocity at which the Stokes drag balances its weight less buoyancy:

$$
v_t = \frac{2(\rho_s - \rho_a)\,g\,r^2}{9\eta}.
$$ {#eq-stokes}

For air, $\eta \approx 1.8\times10^{-5}$ Pa s and $\rho_a \approx 1.2$ kg m⁻³. The formula requires the Reynolds number of the falling spore to be small (it is, at about $10^{-3}$).
:::

::: proof
At terminal velocity the forces balance: weight minus buoyancy, $\tfrac43\pi r^3(\rho_s - \rho_a)g$, equals the Stokes drag $6\pi\eta rv_t$ ([[diversity-of-life/protists#prop-coasting]]). Solving gives [[#eq-stokes]].
:::

::: example How far can a mushroom spore drift? {#ex-spore}
A basidiospore of radius 2 µm and density 1100 kg m⁻³ is released from a gill 10 cm above the ground. (a) What is its settling velocity? (b) How long does it take to fall to the ground in still air? (c) How far would a steady breeze of 1 m s⁻¹ carry it in that time?
::: solution
(a) $v_t = 2\times(1100 - 1.2)\times9.81\times(2\times10^{-6})^2/(9\times1.8\times10^{-5}) = 5.3\times10^{-4}$ m s⁻¹, about half a millimetre per second.

(b) $0.10/5.3\times10^{-4} = 188$ s, about three minutes.

(c) About 190 m. In reality turbulent eddies lift a fraction of spores much higher, into the atmospheric boundary layer, where they can travel hundreds or thousands of kilometres; rust spores of wheat cross oceans. Because $v_t \propto r^2$, a spore twice as large falls four times faster: the tiny size of spores is an adaptation for dispersal.
:::
:::

::: widget plot
f: 1.2111e-4*(p - 1.2)*x^2
x: 0, 10
y: 0, 15
sliders: p=1100:500:2000:10
labels: v_t\ \text{(mm s}^{-1}\text{)}
points: 2, 0.53; 5, 3.33
caption: The terminal settling velocity of a spherical spore in air, from [[#eq-stokes]], in millimetres per second, against its radius in micrometres, for spore density $\rho_s$ (slider $p$, kg m⁻³). The marked points are spores of radius 2 µm (0.53 mm s⁻¹, as in [[#ex-spore]]) and 5 µm (3.3 mm s⁻¹). The quadratic dependence on radius dominates: doubling the radius quadruples the speed, whereas even doubling the density less than doubles it.
:::

Fungi have also evolved remarkable launch mechanisms, studied with high-speed video. Basidiospores are shot off the basidium by the sudden fusion of a drop of fluid (Buller's drop) with the spore surface, which moves the centre of mass abruptly: launch speeds are around a metre per second with accelerations of the order of $10^4\,g$, and the spore travels only a fraction of a millimetre — just far enough to clear the gill before falling. The dung fungus *Pilobolus* squirts its whole sporangium off a pressurised stalk at about 10–25 m s⁻¹, with accelerations reported around $2\times10^4\,g$ (Levi Yafetto, Nicholas Money and colleagues, 2008), landing on vegetation up to 2.5 m away, where grazing animals eat it.

## Symbioses: mycorrhizae and lichens

::: definition Mycorrhiza and lichen {#def-mycorrhiza}
A **mycorrhiza** ("fungus-root") is a symbiotic association between a fungus and the roots of a plant, in which the fungus supplies the plant with mineral nutrients (especially phosphorus and nitrogen) and water, and the plant supplies the fungus with carbon from photosynthesis. In **arbuscular mycorrhizae** (AM), Glomeromycotina fungi penetrate root cortical cells and form branched exchange structures, **arbuscules**, inside them; in **ectomycorrhizae** (ECM), basidiomycete or ascomycete hyphae ensheathe the root tip and grow between, but not into, its cells (the **Hartig net**). A **lichen** is a symbiotic association between a fungus (the **mycobiont**) and a photosynthetic partner (the **photobiont**: a green alga, a cyanobacterium, or both), forming a body (thallus) unlike either partner alone.
:::

Mycorrhizae are the rule, not the exception. In a survey of the mycorrhizal status of vascular plants, Mark Brundrett and Leho Tedersoo (2018) estimated that about 72 % of species have arbuscular mycorrhizae, about 2 % ectomycorrhizae (but they include dominant forest trees — pines, oaks, beeches, eucalypts, dipterocarps), about 1.5 % ericoid mycorrhizae (heathers, blueberries), about 10 % orchid mycorrhizae, and only about 7–8 % none. Orchid seeds are tiny and lack food reserves, and every orchid depends on fungi to germinate; some orchids and other "mycoheterotrophic" plants never photosynthesise and take all their carbon from fungi, which in turn take it from green plants. Hyphae of mycorrhizal fungi connect plants of the same and different species; how much carbon and nutrient moves between plants through these "common mycorrhizal networks", and whether this benefits seedlings, has been overstated in popular accounts and is the subject of active, critical research (Justine Karst and colleagues, 2023).

Lichens are one of the most successful symbioses. About a fifth of described fungi, mostly ascomycetes, form lichens; there are around 20,000 lichen species, named after their fungal partner. They grow on bare rock, bark and soil from the tropics to Antarctica, tolerating complete desiccation and resuming photosynthesis within minutes of wetting, and are pioneers in soil formation. Simon Schwendener (1867) first proposed that lichens are dual organisms, against fierce resistance; Toby Spribille and colleagues (2016) found that many also contain basidiomycete yeasts in their cortex, so a lichen may be an ecosystem rather than a pair. Because they absorb water and dissolved substances over their whole surface, lichens are sensitive indicators of air pollution, especially sulfur dioxide.

::: quiz
A forest tree is dug up and its root tips are found to be enclosed in a mantle of fungal hyphae, with hyphae growing between the outer cortical cells but not inside them. Which statement is correct?
- [ ] It has arbuscular mycorrhizae formed by Glomeromycotina.
- [x] It has ectomycorrhizae, probably formed by a basidiomycete or ascomycete.
- [ ] The fungus is a parasite, since it surrounds the root.
- [ ] The plant must be an orchid.
::: solution
A mantle plus a Hartig net between cortical cells is the definition of an ectomycorrhiza, formed mainly by basidiomycetes (such as boletes, amanitas and russulas) and some ascomycetes (truffles). Arbuscular mycorrhizae penetrate the cells and form no mantle. A mantle is not evidence of parasitism: both partners benefit under typical conditions, though the balance can shift.
:::
:::

## Fungi and people

::: application Food, drugs and disease
Yeast (*Saccharomyces cerevisiae*) ferments sugar to ethanol and CO₂ in brewing, wine-making and baking, and was the first eukaryote whose genome was sequenced (André Goffeau and colleagues, 1996: about 12 million base pairs and 6,000 genes). Moulds ripen cheeses (*Penicillium roqueforti*, *P. camemberti*) and ferment soy (*Aspergillus oryzae*). Alexander Fleming's observation in 1928 that a *Penicillium* mould killed staphylococci led, through Howard Florey and Ernst Chain's work in 1939–1941, to penicillin; other fungal drugs include the immunosuppressant ciclosporin and the cholesterol-lowering statins. On the other side, fungi cause most plant diseases: rice blast (*Pyricularia oryzae*), wheat rusts (the stem-rust race Ug99, detected in Uganda in 1999), chestnut blight (*Cryphonectria parasitica*), which killed several billion American chestnut trees in the first half of the twentieth century, Dutch elm disease and ash dieback. Among animals, *Batrachochytrium dendrobatidis* has contributed to the decline of at least 501 amphibian species, including 90 presumed extinctions (Ben Scheele and colleagues, 2019), and white-nose syndrome (*Pseudogymnoascus destructans*) has killed millions of North American bats since 2006. Global trade moves pathogens to hosts with no co-evolved defences, which is why biosecurity and quarantine regulations matter ([[conservation-biology]]).
:::

::: history
Pier Antonio Micheli (*Nova Plantarum Genera*, 1729) first showed that fungi grow from spores. Elias Fries's *Systema Mycologicum* (1821–1832) is the starting point for the names of many fungi. Anton de Bary (1860s) worked out fungal life cycles, including the alternation of hosts in wheat rust, and showed that *Phytophthora infestans* causes potato blight; Simon Schwendener (1867) proposed the dual nature of lichens, and Albert Bernhard Frank named mycorrhizae (1885). Arthur Buller's *Researches on Fungi* (1909–1950) described spore discharge. Fungal genetics — the "one gene, one enzyme" experiments of George Beadle and Edward Tatum on *Neurospora* (1941) and the mating-type work of Hans Kniep and John Raper — made fungi model organisms, and *S. cerevisiae* became the first sequenced eukaryote (1996). Molecular phylogenies from the early 1990s (Sandra Baldauf and Jeffrey Palmer, 1993) placed fungi with animals in the opisthokonts.
:::

::: summary
- Fungi are absorptive heterotrophic opisthokonts with chitin walls and ergosterol, growing as hyphae (forming a mycelium) or as yeasts; mushrooms are short-lived reproductive structures.
- With constant tip extension rate $E$ and hyphal growth unit $G$, a young mycelium grows exponentially at rate $E/G$; established colonies spread at a constant radial rate (e.g. the 965-ha *Armillaria* individual, aged 1,900–8,650 years).
- Fungal sex separates plasmogamy and karyogamy; Dikarya (Ascomycota and Basidiomycota) have long-lived dikaryotic ($n + n$) stages, and meiosis produces ascospores or basidiospores.
- Mating types restrict inbreeding: tetrapolar compatibility $(1 - 1/a)(1 - 1/b)$ for random pairs but $\tfrac14$ for siblings; *Schizophyllum* has over 23,000 mating types.
- About 150,000 species are described among perhaps 2–4 million; major lineages are Cryptomycota/Microsporidia, Chytridiomycota, Blastocladiomycota, Zoopagomycota, Mucoromycota (with arbuscular mycorrhizal fungi), Ascomycota and Basidiomycota.
- Spores settle at $v_t = 2(\rho_s - \rho_a)gr^2/9\eta$, about 0.5 mm s⁻¹ for a 2 µm spore, so breezes disperse them widely.
- About 72 % of vascular plant species form arbuscular mycorrhizae; lichens are fungi with algal or cyanobacterial partners. Fungi decompose wood, feed and heal people and cause most plant diseases.
:::

## Exercises

::: exercise Counting mating types {level=1 check="200"}
A tetrapolar mushroom has 10 alleles at its *A* locus and 20 at its *B* locus. How many mating types does it have?
::: solution
$10\times20 = 200$ mating types.
:::
:::

::: exercise Random compatibility {level=1 check="0.6"}
In a tetrapolar population with 4 equally frequent *A* alleles and 5 equally frequent *B* alleles, what fraction of random pairs is compatible?
::: solution
$(1 - 1/4)(1 - 1/5) = 0.75\times0.8 = 0.6$.
:::
:::

::: exercise Ploidy through the life cycle {level=1}
Give the nuclear condition ($n$, $n + n$ or $2n$) of each of the following in a typical mushroom-forming basidiomycete: (a) a basidiospore; (b) the mycelium that grows from a single basidiospore; (c) the mycelium after two compatible mycelia have fused; (d) the cells of the mushroom's gills; (e) the young basidium just before meiosis.
::: solution
(a) $n$; (b) $n$ (a monokaryon); (c) $n + n$ (a dikaryon); (d) $n + n$; (e) $2n$, after karyogamy — the only diploid stage, which immediately undergoes meiosis to make four haploid basidiospores.
:::
:::

::: exercise Falling spores {level=2 check="41.7"}
A spore of radius 3 µm and density 1100 kg m⁻³ falls through still air ($\eta = 1.8\times10^{-5}$ Pa s, $\rho_a = 1.2$ kg m⁻³, $g = 9.81$ m s⁻²). How many seconds, to one decimal place, does it take to fall 5 cm?
::: solution
$v_t = 2\times1098.8\times9.81\times9\times10^{-12}/(1.62\times10^{-4}) = 1.198\times10^{-3}$ m s⁻¹. Time $= 0.05/1.198\times10^{-3} = 41.7$ s.
:::
:::

::: exercise Doubling a mycelium {level=2 check="28.9"}
Hyphal tips of a mould extend at 6 µm min⁻¹ and its hyphal growth unit is 250 µm. What is the doubling time of total hyphal length, in minutes to one decimal place?
::: solution
Specific rate $E/G = 6/250 = 0.024$ min⁻¹; doubling time $\ln 2/0.024 = 28.9$ min.
:::
:::

::: exercise A fairy ring's age {level=2 check="1667"}
A fairy ring of radius 500 m is thought to have spread from a central point at 0.3 m per year. How old is it, to the nearest year? What would make the estimate too young or too old?
::: solution
$500/0.3 = 1{,}667$ years. Too young if growth was slower in the past (poorer soil, cooler climates, interruptions by fire or drought); too old if the ring formed by fusion of several mycelia or spread faster early on. Genotyping samples across the ring tests whether it is one individual.
:::
:::

::: exercise Siblings and strangers {level=2}
(a) Show from first principles that a quarter of the meiotic progeny of a tetrapolar dikaryon $A_1B_1 + A_2B_2$ are compatible with any given sibling. (b) Why might selection favour the evolution of a bipolar system from a tetrapolar one in a species that usually reproduces by selfing within a single fruiting body? (c) In ascomycetes with a single mating-type locus and only two idiomorphs, what is the compatibility of random pairs if the two are equally frequent?
::: solution
(a) The *A* and *B* loci are unlinked, so meiosis produces four genotypes $A_1B_1$, $A_1B_2$, $A_2B_1$, $A_2B_2$ in equal frequencies. A spore of genotype $A_1B_1$ is compatible only with $A_2B_2$ (different at both loci): a probability of $\tfrac14$; by symmetry the same holds for each genotype.
(b) Where mates are usually siblings, a system that makes three-quarters of them incompatible hampers reproduction; linkage of the *A* and *B* loci into one segregating unit (as in some basidiomycetes) or loss of the function of one locus raises sibling compatibility to $\tfrac12$, so selection for reproductive assurance can favour bipolarity.
(c) $1 - 1/2 = \tfrac12$.
:::
:::

::: exercise The split-gill fungus {level=3 check="23328"}
Using the subloci numbers given in [[#ex-schizophyllum]], compute the number of mating types of *Schizophyllum commune*. Then explain (a) why the large number of mating types is maintained by **negative frequency-dependent selection**, and (b) what this predicts about the frequencies of alleles in a natural population and about the age of the alleles.
::: solution
$(9\times32)\times(9\times9) = 288\times81 = 23{,}328$.

(a) An individual carrying a rare mating-type allele is compatible with almost all others, whereas one carrying a common allele is incompatible with every individual that shares it; so rare alleles have a mating advantage and increase, while common ones decline. A new allele (a new specificity) has an advantage when it arises and spreads.

(b) At equilibrium, alleles should be at roughly equal frequencies, and the system should hold many alleles, each lost only rarely by drift. Alleles are maintained much longer than neutral variants, so allelic lineages can be older than species: as in plant self-incompatibility and vertebrate MHC genes, the same allele lineages can be shared across related species (trans-specific polymorphism), and allele trees will not match the species tree.
:::
:::

::: exercise Do mycorrhizal fungi help? {level=3}
In a greenhouse experiment, seedlings of a grass were grown in sterilised soil with or without arbuscular mycorrhizal fungi at low and high phosphate. Mean dry mass (g, $n = 10$ per group, standard errors about 0.1 g) was: low P, no fungus 0.8; low P, fungus 1.9; high P, no fungus 2.4; high P, fungus 2.2. (a) Describe the interaction between fungus and phosphate. (b) Explain it biologically. (c) Name two limitations of the experiment for predicting what happens in the field.
::: solution
(a) At low phosphate, the fungus more than doubled growth (+1.1 g, many standard errors); at high phosphate, it had no benefit and perhaps a small cost (−0.2 g). The effect of the fungus depends on phosphate: an interaction, which a two-way ANOVA would test formally ([[biostatistics]]).
(b) Hyphae extend beyond the zone of phosphate depletion around roots and absorb phosphate (which diffuses slowly in soil) from a much larger soil volume, so they help most when phosphate is scarce. The fungus costs the plant carbon — perhaps 4–20 % of its photosynthate; when phosphate is plentiful, the roots alone suffice and the carbon cost is not repaid. The symbiosis lies on a continuum from mutualism to mild parasitism depending on conditions.
(c) Sterilised soil removes the native microbial community, including other fungi and pathogens against which mycorrhizae may protect; a single fungal isolate and a single plant species may not represent natural communities; greenhouse light, water and pot size differ from the field; and seedlings over a few weeks may respond differently from established plants competing with neighbours.
:::
:::
