Most of what we eat is the product of plant reproduction. Grains of wheat, rice and maize are fruits, each containing one seed; beans, peas and lentils are seeds; apples, tomatoes, oranges and cucumbers are fruits; and the oils of olive, sunflower and rapeseed are stored in seeds and fruits to feed the next generation of plants. Behind each of these lies a sequence of events that is unique to flowering plants: a flower is formed from a shoot meristem; pollen, carried by wind or animals, lands on the stigma of a compatible flower; a pollen tube grows through the tissues of the pistil and delivers two sperm cells to an embryo sac; one sperm fertilises the egg and the other the central cell, a **double fertilisation** that produces both an embryo and its food supply, the endosperm; the ovule becomes a seed and the ovary a fruit; the seed is dispersed, waits — sometimes for years — and germinates when conditions are right.

This chapter follows that sequence. We start with the genetic control of flower development, summarised in the **ABC(E) model**, then follow the formation of the male and female gametophytes, pollination and the mechanisms that prevent self-fertilisation, the journey of the pollen tube, double fertilisation and the peculiar genetics of the endosperm. We end with seeds and fruits — their development, dormancy, longevity and dispersal — and with germination. The quantitative threads are the genetics of self-incompatibility, the ploidy arithmetic of the endosperm, seed dispersal by wind and the decline of seed viability in storage. The alternation of generations and the basic structure of the angiosperm life cycle were introduced in [[diversity-of-life/land-plants]], and the control of flowering time by day length, temperature and florigen in [[plant-biology/plant-responses]].

## Making a flower

When the shoot apical meristem receives the signal to flower — FT protein arriving through the phloem — it becomes an inflorescence meristem, and the primordia on its flanks become **floral meristems** instead of leaves. Two transcription factors, **LEAFY** (LFY) and **APETALA1** (AP1), confer floral meristem identity in *Arabidopsis thaliana*: in *lfy* mutants, flowers are replaced by leafy shoots. Unlike the shoot meristem, a floral meristem is **determinate**: it produces a fixed set of organs in concentric rings (**whorls**) and then stops.

A typical flower has four whorls: **sepals** (collectively the calyx) outermost, which protect the bud; **petals** (the corolla), often coloured to attract pollinators; **stamens**, each an anther on a filament, where pollen is made; and in the centre the **carpels**, fused in many species into a **pistil** consisting of a stigma that receives pollen, a style, and an ovary containing the **ovules**. All four organs are modified leaves — Goethe's insight of 1790, confirmed by the genetics: remove the genes that specify floral organ identity, and the flower is made of leaves.

### The ABC(E) model

In the late 1980s, Elliot Meyerowitz's group working on *Arabidopsis* and Enrico Coen's group working on snapdragon (*Antirrhinum majus*) studied **homeotic mutants**, in which one type of floral organ is replaced by another. The mutants fell into three classes, each affecting two adjacent whorls, and in 1991 Coen and Meyerowitz proposed a simple combinatorial model to explain them.

::: definition The ABC(E) model of floral organ identity {#def-abc}
Three classes of organ-identity genes act in overlapping domains of the floral meristem: **A** in whorls 1 and 2, **B** in whorls 2 and 3, **C** in whorls 3 and 4. Their combinations specify the organs:

- A alone → **sepals** (whorl 1);
- A + B → **petals** (whorl 2);
- B + C → **stamens** (whorl 3);
- C alone → **carpels** (whorl 4).

A and C are mutually antagonistic: A activity prevents C in whorls 1 and 2, and C prevents A in whorls 3 and 4; if one is lost, the other expands into all four whorls. C activity also terminates the floral meristem. The **E**-class (SEPALLATA) genes are required in all four whorls together with A, B and C; without them all organs develop as sepal-like leaves. In *Arabidopsis*, A = *APETALA1* and *APETALA2*; B = *APETALA3* and *PISTILLATA*; C = *AGAMOUS*; E = *SEPALLATA1–4*.
:::

Most of these genes encode **MADS-box** transcription factors, which bind DNA as tetramers: different combinations of A, B, C and E proteins form "floral quartets" (Günter Theißen, 2001) that recognise target genes for each organ type — a molecular version of the combinatorial code.

::: example Predicting homeotic mutants {#ex-abc}
Using [[#def-abc]], predict the organs in whorls 1–4 of (a) a B-class mutant (*ap3*), (b) a C-class mutant (*ag*), (c) an A-class mutant (*ap2*), (d) a *ap3 ag* double mutant, and (e) a triple mutant lacking A, B and C activity.
::: solution
(a) Without B: whorl 1 A → sepal; whorl 2 A → sepal; whorl 3 C → carpel; whorl 4 C → carpel. **Sepals, sepals, carpels, carpels.**

(b) Without C, A expands into all whorls: whorl 1 A → sepal; whorl 2 A + B → petal; whorl 3 A + B → petal; whorl 4 A → sepal. And because C normally terminates the meristem, the centre continues to produce further whorls: a "flower within a flower", **sepals, petals, petals**, repeated indefinitely — the double flowers of many garden roses and camellias are often due to reduced C function.

(c) Without A, C expands: whorl 1 C → carpel; whorl 2 B + C → stamen; whorl 3 B + C → stamen; whorl 4 C → carpel. **Carpels, stamens, stamens, carpels.** (In *Arabidopsis* *ap2* mutants the outer organs are indeed carpelloid.)

(d) No B, no C; A in all whorls: **sepals in every whorl**, indeterminate.

(e) No organ identity at all: **leaves** in every whorl — Goethe's floral leaves made visible (Bowman, Smyth and Meyerowitz, 1991).

Four predictions from one table, all confirmed — the model's strength. (The A function has proved the least general: in snapdragon and many other species, the genes corresponding to *AP1* and *AP2* do not behave as clear A-class genes, and the A function is debated.)
:::
:::

C function also ends the flower. *AGAMOUS*, expressed in the centre of the floral meristem, represses *WUSCHEL* (via the zinc-finger protein KNUCKLES) after the carpels are initiated, stopping stem-cell renewal ([[plant-biology/plant-form#def-wus-clv]]). This is why *ag* flowers are indeterminate.

## Gametophytes

Flowering plants produce their gametes in tiny gametophytes — the male gametophyte is the pollen grain, the female gametophyte the **embryo sac** — formed within the sporophyte's anthers and ovules ([[diversity-of-life/land-plants#def-alternation]]).

**Pollen.** Inside each anther, diploid microspore mother cells divide by meiosis to give tetrads of haploid microspores. Each microspore divides asymmetrically by mitosis into a large **vegetative cell** and a small **generative cell**, which is engulfed by the vegetative cell. The generative cell divides once more to form **two sperm cells**: before pollen is shed in about 30 % of flowering plant families (including grasses and *Arabidopsis*: tricellular pollen), or later in the pollen tube in the rest (bicellular pollen). The pollen wall has an inner layer of cellulose and pectin and an outer layer, the **exine**, of sporopollenin, sculptured in patterns specific to each species — so characteristic and so durable that fossil pollen records the vegetation of the past (palynology). The innermost layer of the anther wall, the tapetum, nourishes the developing pollen and deposits materials on its surface.

**The embryo sac.** In each ovule, one diploid megaspore mother cell divides by meiosis; in the commonest arrangement (the *Polygonum* type, found in about 70 % of flowering plants), three of the four megaspores die and the surviving one undergoes three rounds of mitosis without cell walls, giving eight haploid nuclei. Walls then form, producing a seven-celled embryo sac: at the end near the opening of the ovule (the micropyle), the **egg cell** flanked by two **synergids**; in the middle, the large **central cell** with two **polar nuclei** (which fuse in many species before fertilisation); and at the opposite end three **antipodal cells**. The ovule's own diploid tissues — the nucellus and the integuments that will become the seed coat — surround it.

## Pollination

**Pollination** is the transfer of pollen from an anther to a stigma; it is not the same as fertilisation, which follows hours to months later (in some oaks, more than a year). About 87.5 % of flowering plant species are pollinated by animals (Jeff Ollerton, Rachael Winfree and Sam Tarrant, 2011) — mostly insects, but also birds, bats and other mammals — and the rest mostly by wind (grasses, many temperate trees such as oaks, birches and hazels) or, rarely, by water. Floral traits often correlate with the pollinator: bee-pollinated flowers tend to be blue or yellow with ultraviolet guides and landing platforms; bird-pollinated flowers red, tubular, scentless and nectar-rich; bat-pollinated flowers large, pale, night-opening and musty-scented; wind-pollinated flowers small, without petals, with exposed anthers producing vast quantities of light pollen and feathery stigmas. Such **pollination syndromes** are tendencies, not rules — many flowers are visited by a range of animals.

### Avoiding self-fertilisation

Most flowers are **hermaphrodite**, with both stamens and carpels, which makes self-pollination easy. Selfing has advantages — reproductive assurance when mates or pollinators are scarce — but over generations it leads to **inbreeding depression**, the reduced fitness of offspring homozygous for deleterious recessive alleles. Plants have evolved many ways to promote outcrossing: separating the sexes in time (**dichogamy**: anthers and stigmas mature at different times) or in space (**herkogamy**; **heterostyly**, the long- and short-styled flower forms of primroses that Darwin studied; separate male and female flowers on one plant, **monoecy**, as in maize; or on separate plants, **dioecy**, in about 6 % of species, such as holly, willows and kiwifruit). The most precise is genetic.

::: definition Self-incompatibility {#def-si}
**Self-incompatibility** (SI) is the genetically controlled ability of a fertile hermaphrodite plant to recognise and reject its own pollen (and that of plants sharing the same alleles), usually at a single multi-allelic **S locus**.

- In **gametophytic SI** (GSI), the pollen's incompatibility phenotype is determined by its own haploid genotype: a pollen grain is rejected if its *S* allele matches either of the two *S* alleles of the pistil. In the Solanaceae, Rosaceae and Plantaginaceae the pistil makes a cytotoxic ribonuclease (S-RNase) that enters all pollen tubes; pollen with a non-matching allele detoxifies it using F-box proteins encoded at the *S* locus, while self pollen tubes are killed in the style.
- In **sporophytic SI** (SSI), as in the Brassicaceae, the pollen's phenotype is determined by the diploid genotype of the plant that produced it, because the pollen-coat protein SCR/SP11 is made by the anther's tapetum. A stigma receptor kinase, SRK, binds SCR of the same haplotype and triggers rejection on the stigma surface; dominance relationships between alleles complicate the outcome.
:::

::: example Compatibility in gametophytic SI {#ex-gsi}
In a species with gametophytic self-incompatibility, predict the fraction of pollen grains that can achieve fertilisation, and the genotypes of the offspring, in the crosses (female × male): (a) $S_1S_2 \times S_1S_2$; (b) $S_1S_2 \times S_1S_3$; (c) $S_1S_2 \times S_3S_4$.
::: solution
(a) The male produces $S_1$ and $S_2$ pollen in equal numbers; both match the pistil and are rejected: **0 % compatible**, no seed. Self-pollination is the same as this cross.

(b) $S_1$ pollen is rejected; $S_3$ pollen grows. **50 % compatible**; offspring receive $S_1$ or $S_2$ from the egg and $S_3$ from the pollen: $S_1S_3$ and $S_2S_3$ in a 1 : 1 ratio. No offspring can be homozygous at the *S* locus, and none can carry the male's $S_1$ allele from the pollen.

(c) Both $S_3$ and $S_4$ pollen are compatible: **100 %**; offspring $S_1S_3$, $S_1S_4$, $S_2S_3$, $S_2S_4$ in equal proportions.
:::
:::

How many *S* alleles does a population need? If there are $k$ alleles, a plant carries two of them, and a random pollen grain is rejected if it carries either.

::: proposition Compatible pollen under gametophytic SI {#prop-gsi}
In a population with $k$ *S* alleles at equal frequencies, every plant heterozygous (as GSI enforces), the probability that a pollen grain from a randomly chosen donor is compatible with a randomly chosen pistil is

$$
p_\text{compatible} = 1 - \frac{2}{k}.
$$ {#eq-gsi}

A rare allele has an advantage, since pollen carrying it is accepted by almost all pistils; this **negative frequency-dependent selection** increases the number of alleles until it is balanced by drift (Sewall Wright, 1939).
:::

::: proof
A pollen grain carries one allele, equally likely to be any of the $k$ (by symmetry, since all alleles have equal frequency). The pistil carries two distinct alleles. The grain is rejected if its allele is one of these two, with probability $2/k$, and accepted otherwise.
:::

With $k = 5$, only 60 % of pollen is compatible; with $k = 30$, 93 %. Natural populations of Solanaceae and Brassicaceae typically carry tens of *S* alleles, which ancient trans-specific polymorphism shows can persist for millions of years, longer than the species themselves.

## Fertilisation

### The journey of the pollen tube

A compatible pollen grain landing on a receptive stigma takes up water from it, germinates and extends a **pollen tube**, a single cell that grows only at its tip, guided through the stigma and the transmitting tract of the style to an ovule. Pollen tubes are among the fastest-growing cells known, typically of the order of a centimetre per hour in maize, whose tubes may have to traverse silks 20–30 cm long. Tip growth depends on a steep gradient of cytosolic Ca²⁺ at the tip, on exocytosis of wall material, and on cytoplasmic streaming; the vegetative nucleus and sperm cells move along near the tip, and the older parts of the tube are sealed off by callose plugs.

Near the ovule the tube follows chemical signals. In the flowering plant *Torenia fournieri*, whose embryo sac protrudes from the ovule and can be observed directly, Satohiro Okuda, Tetsuya Higashiyama and colleagues (2009) showed that the synergid cells secrete small cysteine-rich peptides, **LUREs**, that attract pollen tubes; destroying the synergids with a laser abolishes attraction. The tube enters the embryo sac through the micropyle and grows into one synergid, which receives the tube, causes it to burst, and dies, releasing the two sperm cells.

### Double fertilisation

::: definition Double fertilisation {#def-double}
In **double fertilisation**, one sperm cell fuses with the egg cell, forming the diploid **zygote**, which develops into the embryo; the other fuses with the central cell, whose nucleus contains two polar nuclei, forming the (usually triploid) primary **endosperm** nucleus, which develops into the endosperm, the nutritive tissue of the seed. Double fertilisation was discovered independently by Sergei Nawaschin (1898) in *Lilium* and *Fritillaria* and by Léon Guignard (1899).
:::

The endosperm of the *Polygonum*-type embryo sac therefore contains two maternal genomes for every paternal one: **2m : 1p**. This ratio turns out to matter, because many genes are expressed in the endosperm from only one parental copy — **genomic imprinting**. Imprinted genes are silenced on one parental allele by epigenetic marks (DNA methylation, Polycomb histone methylation) set in the central cell or the sperm. In *Arabidopsis*, the Polycomb-group gene *MEDEA* is expressed only from the maternal allele, and mutant seeds whose mother carries *medea* develop overgrown endosperm and abort whatever the father's genotype. The **parental conflict** (or kinship) theory of David Haig and Mark Westoby (1989) proposes that imprinting evolved because paternal genes benefit from extracting more resources from the mother for their seed, and maternal genes from distributing resources evenly among her seeds; paternally expressed genes tend to promote endosperm growth and maternally expressed genes to restrain it.

::: example Interploidy crosses and the endosperm {#ex-endosperm}
A diploid ($2x$) and a tetraploid ($4x$) plant of the same species are crossed reciprocally. Find the ploidy of the embryo and endosperm, and the maternal : paternal genome ratio in the endosperm, for (a) $2x$ female × $2x$ male, (b) $4x$ female × $2x$ male, (c) $2x$ female × $4x$ male. What do you predict about seed development?
::: solution
Each gamete carries half the parent's chromosome sets; the central cell carries two copies of the female gamete's genome.

(a) Egg $x$, central cell $2x$, sperm $x$. Embryo $2x$; endosperm $3x$; ratio **2m : 1p**, normal.

(b) Egg $2x$, central cell $4x$, sperm $x$. Embryo $3x$; endosperm $5x$; ratio **4m : 1p**, maternal excess. Prediction: small endosperm, early cellularisation, small seeds.

(c) Egg $x$, central cell $2x$, sperm $2x$. Embryo $3x$; endosperm $4x$; ratio **2m : 2p** = 1 : 1, paternal excess. Prediction: overgrown endosperm that fails to cellularise; often seed abortion.

These reciprocal effects, observed in maize, *Arabidopsis* and many other species (the **triploid block** to hybridisation between plants of different ploidy), show that the endosperm is sensitive not to its ploidy as such but to the balance of maternal and paternal genomes — as expected if imprinted genes act there. The barrier contributes to the reproductive isolation of new polyploids from their diploid parents.
:::
:::

## Seeds

After fertilisation, the ovule develops into a **seed** with three components of different origin and genotype: the **embryo** (from the zygote; diploid, with maternal and paternal genomes); the **endosperm** (from the fertilised central cell; usually triploid); and the **seed coat** (from the integuments of the ovule; purely maternal tissue).

**Embryogenesis.** In *Arabidopsis* the zygote elongates and divides asymmetrically into a small **apical cell**, which gives rise to almost all of the embryo, and a larger **basal cell**, which forms the **suspensor** — a stalk that pushes the embryo into the endosperm and transports nutrients — and the uppermost cell of which (the hypophysis) contributes to the root meristem. The embryo passes through the globular, heart and torpedo stages, during which the main axis (shoot meristem, hypocotyl, root meristem), the cotyledons and the radial tissue layers are set up — guided by auxin flow, as in so much of plant development ([[plant-biology/plant-hormones]]). In many eudicots, such as pea and bean, the endosperm is consumed during seed development and the food reserves end up in the large cotyledons; in cereals and castor bean the endosperm persists as the main store.

**Maturation and desiccation.** Late in development the seed accumulates storage reserves — starch, storage proteins in protein storage vacuoles, oils in oil bodies — and then, in most species, **desiccates** to about 5–15 % water content, becoming metabolically quiescent. ABA rises during maturation and induces late-embryogenesis-abundant (LEA) proteins and sugars that protect membranes and proteins in the dry state, and it prevents premature germination (vivipary). Seeds that survive drying are **orthodox**; **recalcitrant** seeds, such as those of oak, avocado, cacao and many tropical trees, die if dried and cannot be stored in conventional seed banks.

**Dormancy.** A seed is **dormant** if it fails to germinate under conditions that would otherwise allow it. Dormancy spreads germination over time and space, ensuring that seedlings appear in the right season — after winter, or after rain — and that some seeds remain in the soil as a **seed bank** if the first cohort fails. It can be imposed by the seed coat (hard coats impermeable to water, broken by abrasion or fire) or by the embryo's own physiology, controlled by the balance of ABA (which maintains dormancy) and gibberellin (which promotes germination), and released by cold, warm dry storage (after-ripening), light acting through phytochrome ([[plant-biology/plant-responses]]), smoke compounds (karrikins) after fire, or nitrate.

### How long do seeds live?

Dry seeds age: their membranes, proteins and DNA accumulate damage, and their viability declines. For orthodox seeds stored at constant moisture and temperature, Richard Ellis and Eric Roberts (1980) found that the distribution of individual seed lifespans in a seed lot is approximately normal.

::: proposition The seed viability equation (empirical) {#prop-viability}
For a seed lot stored under constant conditions, the proportion of seeds still viable after storage period $p$ is

$$
V(p) = \Phi\!\left(K_i - \frac{p}{\sigma}\right),
$$ {#eq-viability}

where $\Phi$ is the standard normal cumulative distribution function, $K_i$ the initial viability of the lot on the probit (normal-deviate) scale, and $\sigma$ the standard deviation of the distribution of seed deaths in time, which depends on the species and decreases steeply with rising storage temperature and moisture content. Half the seeds have died after $p_{50} = K_i\sigma$. This is a fitted empirical relationship, not derived from mechanism.
:::

::: example A seed bank's storage plan {#ex-viability}
A lot of wheat seed has initial viability $K_i = 2.5$ probits (99.4 % germination) and, in the bank's storage conditions, $\sigma = 10$ years. (a) What percentage germinate after 20 years? (b) When will viability fall to 50 %? (c) The bank's rule is to regenerate a sample (grow it out and harvest fresh seed) when viability falls to 85 % of the initial value. When should this lot be regenerated?
::: solution
(a) $V = \Phi(2.5 - 20/10) = \Phi(0.5) = 0.69$: **69 %**.

(b) $V = 0.5$ when $K_i - p/\sigma = 0$, at $p_{50} = K_i\sigma = 25$ years.

(c) 85 % of 99.4 % is 84.5 %, which is $\Phi(1.015)$. Solve $2.5 - p/10 = 1.015$: $p = 14.9$ years, so after about **15 years**. Viability stays above 95 % for the first decade and then falls ever faster, as the bulk of the normal distribution of lifespans is reached — which is why germination must be tested regularly: a lot that looks perfectly healthy may be close to the steep part of the curve.
:::
:::

::: widget plot
f: 100*0.5*(1 + erf((k - x/s)/sqrt(2)))
x: 0, 60
y: 0, 100
sliders: k=2.5:0:4:0.1; s=10:2:40:1
points: 20, 69.1; 25, 50
hlines: 85
labels: V(p) = \Phi(K_i - p/\sigma)
caption: Seed viability (% germinating, vertical) against storage time (years, horizontal) from the Ellis–Roberts equation [[#eq-viability]], with initial viability $K_i$ (slider $k$, in probits) and $\sigma$ (slider $s$, years). The marked points are [[#ex-viability]]; the horizontal line marks 85 %, a typical regeneration threshold. The curve is a falling normal CDF: almost flat at first, then steep. Increase $\sigma$ — as colder, drier storage does — and the whole curve stretches to the right; lower $k$, as a poor-quality harvest would, and the decline starts earlier.
:::

Under ideal conditions seeds can last for a very long time. A date palm seed from excavations at Masada, radiocarbon-dated to about 2,000 years ago, germinated in 2005 (Sarah Sallon and colleagues, 2008), and plants of *Silene stenophylla* were regenerated, by tissue culture, from immature fruit tissue preserved in Siberian permafrost for about 32,000 years (Svetlana Yashina and colleagues, 2012). Seed banks exploit the same physics: the Svalbard Global Seed Vault (opened 2008) and the Millennium Seed Bank at Wakehurst, England, store orthodox seeds dried to low moisture and frozen at about −18 °C, conditions under which the viability equation predicts lifespans of decades to centuries for many species.

::: application Seeds, hybrids and pollinators
Modern agriculture depends on controlling plant reproduction. **Hybrid** crops — most maize, much rice in China, sorghum, sunflower and many vegetables — exploit **heterosis**, the vigour of F₁ hybrids between inbred lines; to produce hybrid seed on a large scale, breeders must prevent self-pollination of the female parent, by removing the tassels of maize by hand or machine, or by using **cytoplasmic male sterility**, a mitochondrially encoded defect in pollen development, together with nuclear restorer genes. Seeds of hybrids do not breed true, so farmers buy new seed each year. Insect pollination contributes to the production of about three-quarters of the leading global food crops by number, though these account for about a third of crop production by volume (Alexandra-Maria Klein and colleagues, 2007); declines of wild and managed pollinators therefore threaten the supply of fruits, nuts and vegetables more than of staple grains, most of which are wind-pollinated or self-pollinated. And seed banks — over 1,700 genebanks hold some 7 million samples worldwide (FAO, 2010s figures) — preserve the genetic diversity of crops and their wild relatives against loss.
:::

## Fruits and dispersal

A **fruit** is a mature ovary, sometimes with other floral parts; its wall, the **pericarp**, develops from the ovary wall. Fruit growth is triggered by fertilisation, through hormones (auxin and gibberellin) made by the developing seeds; fruits that develop without fertilisation are **parthenocarpic** (seedless bananas, some cucumbers and tomatoes, and grapes treated with gibberellin). Fruits are classified as **fleshy** (berries, drupes such as cherries and olives, pomes such as apples, whose flesh develops largely from the floral receptacle) or **dry**, either **dehiscent** (opening to release seeds: pods of beans, capsules of poppies, siliques of *Arabidopsis*) or **indehiscent** (nuts, achenes, the grains — caryopses — of grasses).

Seeds and fruits are dispersed by **wind** (the plumed achenes of dandelion, the winged samaras of maples and ashes, the dust-like seeds of orchids), **water** (coconut), **animals** — either eaten (fleshy fruits, whose seeds survive passage through the gut: endozoochory) or carried on fur and feathers (hooked burrs: epizoochory), or by ants attracted by lipid-rich appendages (elaiosomes) — or **ballistically**, by explosive dehiscence (the pods of gorse, the capsules of *Impatiens*, the squirting cucumber). Dispersal reduces competition with the parent and among siblings, escapes pests that accumulate near the parent, and colonises new sites.

How far can wind carry a seed? A simple estimate treats the seed as falling at a constant speed through a uniform horizontal wind.

::: proposition Ballistic estimate of wind dispersal distance {#prop-dispersal}
A seed released at height $H$, falling at its terminal velocity $v_t$ in a steady horizontal wind of speed $U$, travels a horizontal distance

$$
d = \frac{H\,U}{v_t}.
$$ {#eq-dispersal}

The assumptions are that the seed reaches terminal velocity immediately, the wind is uniform with height and steady, and there is no vertical air movement. Real winds decrease towards the ground and are turbulent; updrafts can carry light seeds kilometres, so the formula describes typical distances, not the long tail of the dispersal distribution.
:::

::: example Maple, dandelion and the wind {#ex-dispersal}
(a) A maple samara (terminal velocity about 1 m s⁻¹) is released from 15 m in a 5 m s⁻¹ wind. (b) A dandelion achene (terminal velocity about 0.3 m s⁻¹) is released from a seed head 0.3 m tall in the same wind. Estimate the dispersal distances. (c) Why do the long-distance records of dandelion dispersal exceed your estimate by orders of magnitude?
::: solution
(a) $d = 15\times5/1 = 75$ m.

(b) $d = 0.3\times5/0.3 = 5$ m.

(c) The ballistic model ignores turbulence. The plumed achene's low terminal velocity means that even modest updrafts — gusts, thermals over warm ground — exceed it, lifting the seed upwards; once aloft, it can travel kilometres. A study of dandelion flight (Cathal Cummins, Naomi Nakayama and colleagues, 2018) showed that the plume generates a stable, detached vortex ring that greatly increases drag per unit of bristle area, keeping the terminal velocity low with very little material. For species whose dispersal depends on rare long-distance events, the tail of the distribution, not the typical distance, governs colonisation and migration in response to climate change.
:::
:::

## Germination

**Germination** begins with water uptake by the dry seed (**imbibition**) and ends when the radicle (embryonic root) emerges through the seed coat. Water uptake is **triphasic**: rapid imbibition driven by the very low matric potential of dry seed tissue (phase I); a plateau during which metabolism, DNA repair and protein synthesis resume and, in non-dormant seeds, cell expansion is prepared (phase II); and renewed uptake as the radicle grows (phase III) — strictly, a post-germination event. During germination, the balance of gibberellin and ABA decides the outcome: GA induces enzymes that weaken the tissues covering the radicle (the endosperm cap in many species) and promotes embryo growth, while ABA opposes both.

After germination, the seedling mobilises its reserves. In cereal grains, gibberellin made in the embryo diffuses to the **aleurone layer**, which secretes α-amylase, proteases and other hydrolases into the starchy endosperm; the sugars and amino acids released are absorbed by the scutellum (the cotyledon of grasses) and fed to the growing seedling. The response of isolated aleurone layers to GA, worked out in barley from the 1960s, became a classic system for studying hormone action and the basis of the malting industry ([[plant-biology/plant-hormones]]). In oilseeds, stored triacylglycerols are converted to sugar through the glyoxylate cycle in **glyoxysomes**, a specialised form of peroxisome — a pathway that animals lack, which is why we cannot make sugar from fat.

Seedlings emerge in two ways: in **epigeal** germination (bean, sunflower) the hypocotyl elongates and lifts the cotyledons above the soil, where they turn green; in **hypogeal** germination (pea, maize) the cotyledons stay below ground and the epicotyl (or, in grasses, the coleoptile) pushes the shoot up. Once above ground, the seedling de-etiolates in the light ([[plant-biology/plant-responses]]), and the cycle begins again.

::: warning Pollination is not fertilisation, and a fruit is not a vegetable
Two confusions are common. First, **pollination** (delivery of pollen to the stigma) and **fertilisation** (fusion of gametes in the embryo sac) are separate events, separated by pollen tube growth that takes from minutes to months; pollination can occur without fertilisation (incompatible pollen, a failure of tube growth), and fruit can develop without either (parthenocarpy). Second, "fruit" in botany means a ripened ovary, whatever its taste: tomatoes, cucumbers, peppers, aubergines, pea pods, cereal grains and nuts are all fruits; "vegetable" is a culinary category with no botanical meaning. Strawberries, conversely, are not botanically berries: the red flesh is the swollen receptacle, and the true fruits are the small achenes on its surface.
:::

::: quiz
A plant has flowers with only sepals and carpels, the carpels occupying whorls 3 and 4. Which gene function is missing, according to the ABC model?
- [ ] A
- [x] B
- [ ] C
- [ ] E
::: solution
B function is required for petals (A + B) and stamens (B + C). Without it, whorl 2 has only A (sepals) and whorl 3 only C (carpels): sepals, sepals, carpels, carpels. This is the phenotype of *apetala3* and *pistillata* mutants of *Arabidopsis* and of *deficiens* and *globosa* of snapdragon.
:::
:::

::: history
Rudolf Jakob Camerarius demonstrated plant sexuality in 1694, showing that female plants of dioecious species such as mulberry set no seed without pollen. Joseph Gottlieb Kölreuter made the first systematic plant hybridisations (1761–1766) and described insect pollination; Christian Konrad Sprengel's *The Secret of Nature Revealed* (1793) interpreted floral structure as adaptation to pollinators, and Darwin's *On the Various Contrivances by which British and Foreign Orchids are Fertilised by Insects* (1862) and *The Different Forms of Flowers on Plants of the Same Species* (1877) developed the theme. Giovanni Battista Amici observed pollen tubes in 1823–1824; Eduard Strasburger described fertilisation in flowering plants in 1884; Nawaschin (1898) and Guignard (1899) discovered double fertilisation. Johann Wolfgang von Goethe's *Versuch die Metamorphose der Pflanzen zu erklären* (1790) proposed that floral organs are modified leaves, and the ABC model (Coen and Meyerowitz, 1991), the SEPALLATA genes (Soraya Pelaz, Martin Yanofsky and colleagues, 2000) and the floral quartet model gave that idea its molecular form.
:::

## Summary

::: summary
- Floral meristems (LFY, AP1) are determinate and make four whorls: sepals, petals, stamens, carpels. The **ABC(E) model**: A → sepals, A + B → petals, B + C → stamens, C → carpels; A and C antagonistic; E (SEPALLATA) needed throughout; C (AGAMOUS) also terminates the meristem by repressing WUS. Mostly MADS-box proteins acting as quartets.
- Pollen (male gametophyte): vegetative cell plus two sperm. Embryo sac (female gametophyte, *Polygonum* type): egg, two synergids, central cell with two polar nuclei, three antipodals.
- About 87.5 % of species are animal-pollinated. Outcrossing is promoted by dichogamy, herkogamy, heterostyly, dioecy and **self-incompatibility**: gametophytic (S-RNase; pollen rejected if its allele matches either pistil allele) or sporophytic (SRK–SCR). With $k$ equal-frequency alleles, $1 - 2/k$ of pollen is compatible.
- Pollen tubes grow at their tips, guided by synergid LUREs. **Double fertilisation**: sperm + egg → zygote; sperm + central cell → triploid endosperm (2m : 1p). Imprinting makes the endosperm sensitive to the parental genome ratio (triploid block).
- Seeds: embryo, endosperm, maternal seed coat; maturation with reserves, LEA proteins, desiccation; dormancy controlled by ABA/GA and released by cold, after-ripening, light or smoke. Viability declines as $\Phi(K_i - p/\sigma)$; orthodox seeds can be banked, recalcitrant seeds cannot.
- Fruits are mature ovaries; dispersal by wind ($d \approx HU/v_t$, plus a long turbulent tail), water, animals and explosive dehiscence.
- Germination: triphasic water uptake, GA versus ABA, radicle emergence; reserves mobilised by GA-induced aleurone hydrolases in cereals and by the glyoxylate cycle in oilseeds.
:::

This completes the plant life cycle. The interactions of plants with each other, with animals and with their physical environment, and their role in ecosystems, are taken up in [[ecology]].

## Exercises

::: exercise Compatible pollen {level=1 check="0.8"}
A gametophytic SI species has 10 *S* alleles at equal frequencies. What fraction of random pollen is compatible with a random pistil?
::: solution
$1 - 2/10 = 0.8$ ([[#eq-gsi]]).
:::
:::

::: exercise A samara in the wind {level=1 check="66.7"}
An ash samara with terminal velocity 1.2 m s⁻¹ is released from 10 m in an 8 m s⁻¹ wind. Estimate its dispersal distance, in metres to one decimal place.
::: solution
$d = HU/v_t = 10\times8/1.2 = 66.7$ m.
:::
:::

::: exercise Seed lifespan {level=1 check="16"}
A seed lot has $K_i = 2.0$ probits and $\sigma = 8$ years. After how many years is viability 50 %?
::: solution
$p_{50} = K_i\sigma = 2.0\times8 = 16$ years.
:::
:::

::: exercise Whose genes? {level=1}
State the ploidy and the parental origin of the genomes of each of the following in a maize kernel: (a) the embryo; (b) the endosperm; (c) the pericarp (the kernel's outer layer); (d) the aleurone layer.
::: solution
(a) Diploid: one maternal and one paternal genome. (b) Triploid: two maternal genomes (from the polar nuclei) and one paternal. (c) Diploid, entirely maternal — the pericarp is the ovary wall of the mother plant, which is why pericarp colour follows the mother's genotype. (d) Triploid, like the rest of the endosperm, of which it is the outer layer: aleurone colour (as in the coloured kernels studied by Barbara McClintock) can therefore show the father's alleles in the same season (xenia; [[diversity-of-life/land-plants]]).
:::
:::

::: exercise More homeotic mutants {level=2}
Using the ABC(E) model, predict the floral organs in whorls 1–4 of: (a) an *ap2 pi* double mutant (A and B lost); (b) a plant in which the B genes are expressed in all four whorls; (c) a plant in which *AGAMOUS* is expressed in all four whorls; (d) a *sep1 sep2 sep3* triple mutant.
::: solution
(a) Without A, C expands to all whorls; without B, C alone everywhere: **carpels in all four whorls**.
(b) Whorl 1 A + B → petal; 2 A + B → petal; 3 B + C → stamen; 4 B + C → stamen: **petals, petals, stamens, stamens**.
(c) C everywhere represses A: whorl 1 C → carpel; 2 B + C → stamen; 3 B + C → stamen; 4 C → carpel: **carpels, stamens, stamens, carpels** (like an A mutant).
(d) Without E function the B and C genes cannot act: **sepal-like organs in all whorls**, and the flower is indeterminate (Pelaz and colleagues, 2000).
:::
:::

::: exercise Sporophytic SI {level=2}
In a *Brassica* species with sporophytic SI, the *S* alleles show dominance in the pollen: $S_1$ is dominant to $S_2$. A plant of genotype $S_1S_2$ is used as the pollen parent on a pistil of genotype $S_2S_3$, in which $S_2$ and $S_3$ are codominant. (a) What is the pollen's incompatibility phenotype? (b) Is the cross compatible? (c) Contrast this with the outcome under gametophytic SI.
::: solution
(a) All pollen grains from the $S_1S_2$ plant carry the pollen coat made by the diploid tapetum; with $S_1$ dominant, every grain expresses the $S_1$ phenotype, whether it carries $S_1$ or $S_2$.
(b) The pistil expresses $S_2$ and $S_3$; pollen phenotype $S_1$ does not match: **all pollen compatible**, and half the offspring receive $S_2$ from the pollen.
(c) Under GSI the $S_2$ pollen (genotype $S_2$) would be rejected by the $S_2S_3$ pistil, and only $S_1$ pollen would succeed: 50 % compatible.
:::
:::

::: exercise Interploidy seeds {level=2}
In *Arabidopsis*, crossing a diploid mother with a hexaploid father produces seeds that almost always abort, while crossing a hexaploid mother with a diploid father produces small but viable seeds. (a) Calculate the maternal : paternal genome ratio in the endosperm of each cross. (b) Interpret the results using the parental conflict theory. (c) Why might a mutation in a paternally expressed imprinted gene rescue the diploid × hexaploid seeds?
::: solution
(a) Diploid ♀ × hexaploid ♂: central cell $2x$ (two copies of $x$), sperm $3x$ → $2m : 3p$. Hexaploid ♀ × diploid ♂: central cell $2\times3x = 6x$, sperm $x$ → $6m : 1p$.
(b) Paternal excess (2 : 3) overstimulates endosperm proliferation and delays cellularisation, starving the embryo — abortion. Maternal excess (6 : 1) restrains endosperm growth — small seeds, but enough to survive. The asymmetry fits the idea that paternally expressed genes promote, and maternally expressed genes restrain, resource acquisition by the endosperm.
(c) If the excess paternal genomes cause abortion by over-expressing growth-promoting paternally expressed genes, removing one such gene (from the father) would reduce the effective paternal dose; such suppressor mutations (for example in the paternally expressed gene *ADMETOS*, and others) have indeed been found to rescue triploid seeds in *Arabidopsis*.
:::
:::

::: exercise Regenerate in time {level=2 check="12.5"}
A seed lot has $K_i = 2.0$ probits (initial viability $\Phi(2.0) = 97.7$ %) and, in storage, $\sigma = 12$ years. The seed bank regenerates when viability falls to 85 % of its initial value. Given that $\Phi(0.957) = 0.831$, after how many years should the lot be regenerated? Give one decimal place.
::: solution
The threshold is $0.85\times0.977 = 0.831 = \Phi(0.957)$. Solve $2.0 - p/12 = 0.957$: $p = 12\times1.043 = 12.5$ years.
:::
:::

::: exercise Is the pollinator the problem? {level=3}
A self-incompatible wildflower in fragmented meadows sets fewer seeds per flower in small populations than in large ones. Ecologists compare open-pollinated flowers with flowers hand-pollinated with plenty of pollen from distant plants. In large populations, open and hand-pollinated flowers set 70 and 75 % of ovules as seed; in small populations, 30 and 72 %. (a) What does the comparison show about the cause of low seed set in small populations? (b) Give two non-exclusive explanations, one ecological and one genetic, for why open pollination is less effective in small populations of a self-incompatible species. (c) How could you distinguish them experimentally?
::: solution
(a) Hand-pollination restores seed set in small populations to the level of large ones (72 versus 75 %), so the plants can make seed: their reproduction is **pollen-limited** — either too little pollen arrives, or too little of it is compatible.
(b) Ecological: small, isolated patches attract fewer pollinator visits, so less pollen arrives. Genetic: small populations lose *S* alleles by drift; with few alleles, a large fraction of the pollen that arrives is incompatible ([[#eq-gsi]]: with $k = 4$ only half is compatible), and many plants share alleles — the "S-Allee effect".
(c) Count pollinator visits and pollen grains deposited on stigmas in small and large populations (the ecological explanation predicts fewer grains). Then hand-pollinate with pollen from *within* the small population (from several donors) versus from large populations: if within-population pollen gives low seed set despite abundant pollen, mating incompatibility is responsible. Genotyping the *S* locus in each population gives $k$ directly.
:::
:::

::: exercise Planning a seed vault {level=3}
For many orthodox seeds, the Ellis–Roberts parameter $\sigma$ increases roughly ten-fold for each 20 °C fall in storage temperature at constant low moisture (a rule of thumb within the range of data). A lot has $K_i = 2.5$ and $\sigma = 10$ years at 20 °C. (a) Estimate $p_{50}$ at 20 °C and at −20 °C. (b) What practical reasons limit how long a seed bank can actually rely on such predictions? (c) Why can recalcitrant seeds not be conserved this way, and what alternatives exist?
::: solution
(a) At 20 °C, $p_{50} = 2.5\times10 = 25$ years. At −20 °C (40 °C colder), $\sigma \approx 10\times10^2 = 1000$ years, so $p_{50} \approx 2500$ years — a theoretical figure.
(b) The relationship is extrapolated far beyond the times over which it has been tested (decades); it varies between species and between seed lots of the same species (initial quality, harvest conditions); low-temperature behaviour may change (for example, lipid crystallisation or glass transitions in the seed cytoplasm); and practical events — freezer failures, contamination, mislabelling — matter more than chemistry over long periods. Regular germination testing and regeneration remain necessary.
(c) Recalcitrant seeds die when dried to the low moisture contents needed for freezing, and at high moisture they cannot be frozen without ice damage. Alternatives include living collections in field genebanks and botanic gardens, in vitro tissue culture, and cryopreservation of excised embryos or shoot tips in liquid nitrogen after special treatments that allow vitrification.
:::
:::
