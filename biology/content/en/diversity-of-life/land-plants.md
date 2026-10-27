For the first four billion years of Earth's history the continents were, to the eye, bare: microbial crusts at most, and perhaps some algae in damp places. Then, in the Ordovician period, a lineage of freshwater green algae gave rise to plants that could live on land. Within about 100 million years there were forests, and the land plants transformed the planet: they built soils, drew down atmospheric CO₂, raised oxygen, changed the weathering of rocks and the course of rivers, and created the habitats in which terrestrial animals evolved. Today some 380,000 species of land plants are known — about 300,000 of them flowering plants — and they hold most of the biomass on Earth (about 450 of 550 Gt of carbon; [[diversity-of-life/bacteria-archaea]]).

This chapter follows that history. We start with the problems of living on land and the features that solved them, then define the life cycle that all land plants share — the **alternation of generations** — and follow its transformation through the four great grades: bryophytes, seedless vascular plants, gymnosperms and flowering plants. Quantitative threads include the physics of water loss through stomata, the weight of a water column in a tall tree, the golden angle of leaf arrangement and the rate at which flowering plants diversified. Plant physiology — water transport, nutrition, photosynthesis, hormones — is the subject of [[plant-biology]].

## Out of the water

Land plants (**embryophytes**) belong to the **Streptophyta**, one of two lineages of green plants (Viridiplantae, within Archaeplastida; [[diversity-of-life/protists#def-supergroups]]). The other lineage, the Chlorophyta, contains most "green algae" (*Chlamydomonas*, *Ulva*). Streptophytes include a grade of freshwater **charophyte** algae; phylogenomic studies (Norman Wickett and colleagues, 2014; One Thousand Plant Transcriptomes Initiative, 2019) found that the closest living relatives of land plants are the **Zygnematophyceae**, the conjugating algae such as *Spirogyra* and desmids — unicellular or filamentous algae that look nothing like plants but share with them gene families for responding to desiccation and for building cell walls.

Life on land poses problems that water does not. Air dries out tissues; there is no buoyancy, so a tall body must support itself; sunlight carries more ultraviolet radiation; gases move by diffusion through air, which is fast, but water and nutrients must be taken from the soil and moved through the body; and gametes that swim need a film of water.

::: definition Embryophytes and their synapomorphies {#def-embryophyte}
**Embryophytes** (land plants) are the clade of streptophytes characterised by: (1) a multicellular **embryo** retained in and nourished by the parent plant (the source of the name); (2) **alternation of generations** between multicellular haploid and diploid phases ([[#def-alternation]]); (3) multicellular, jacketed sex organs, the egg-producing **archegonia** and sperm-producing **antheridia** (reduced or lost in seed plants); (4) spores with walls of **sporopollenin**, an extremely resistant polymer, produced in multicellular **sporangia**; (5) a waxy **cuticle** covering the aerial surface, with **stomata** (pores flanked by two guard cells) in all groups except liverworts; and (6) **apical meristems**, regions of dividing cells at the tips of shoots and roots.
:::

The oldest fossil evidence of land plants is microscopic: **cryptospores**, spores in tetrads or pairs with sporopollenin walls, from rocks of the Middle Ordovician, about 470 million years old (Claudia Rubinstein and colleagues, 2010, from Argentina). Fossils of plant bodies appear only in the Silurian: *Cooksonia*, a few centimetres tall, a leafless forked axis ending in sporangia, is about 430 million years old. Molecular clocks place the origin of crown embryophytes earlier, in the Cambrian to Early Ordovician, about 515–470 million years ago (Jennifer Morris and colleagues, 2018), implying a gap in the record for the earliest, probably small and delicate, plants. The Early Devonian **Rhynie chert** in Scotland, about 407 million years old, preserves a whole ecosystem silicified by a hot spring — plants such as *Rhynia* and *Aglaophyton* with their cells, stomata, fungal partners ([[diversity-of-life/fungi]]) and arthropods. By the Late Devonian (about 385 million years ago) there were forests of trees such as *Archaeopteris*, and by the Carboniferous swamp forests of giant lycophytes whose remains became coal.

### Living with dry air

A leaf must let CO₂ in, but every pore that admits CO₂ lets water out. The two gases diffuse through the same stomata, driven by their concentration differences, so the cost of photosynthesis in water can be estimated directly from Fick's law ([[cell-biology/membrane-transport#prop-fick]]).

::: proposition The water cost of carbon {#prop-wue}
Let $c_a$ and $c_i$ be the mole fractions of CO₂ in the air and in the leaf's internal air spaces, and $w_i$ and $w_a$ the mole fractions of water vapour inside the leaf (saturated) and in the air. If CO₂ uptake and water loss both occur by diffusion through the same stomatal pathway, with conductance to water vapour $g$ and to CO₂ $g/1.6$ (CO₂ diffuses about 1.6 times more slowly than water vapour), then the **transpiration ratio**, water lost per CO₂ taken up, is

$$
\frac{E}{A} = \frac{g\,(w_i - w_a)}{(g/1.6)(c_a - c_i)} = \frac{1.6\,(w_i - w_a)}{c_a - c_i}.
$$ {#eq-wue}

Its reciprocal is the intrinsic **water-use efficiency**.
:::

::: example How much water does a leaf lose per CO₂? {#ex-wue}
On a warm afternoon the leaf-to-air vapour pressure difference is 2.0 kPa at an atmospheric pressure of 101.3 kPa. The air contains 420 µmol mol⁻¹ CO₂ and the leaf's internal CO₂ is 280 µmol mol⁻¹. How many molecules of water does the leaf lose per molecule of CO₂ fixed?
::: solution
The water mole-fraction difference is $2.0/101.3 = 0.0197$; the CO₂ difference is $140\times10^{-6}$. By [[#eq-wue]], $E/A = 1.6\times0.0197/(1.40\times10^{-4}) = 226$. A leaf loses over two hundred molecules of water for every CO₂ it fixes — and more in hotter, drier air, since $w_i$ rises steeply with temperature. This is why stomata close in drought, why the cuticle is nearly impermeable, and why C₄ and CAM plants, which keep $c_i$ low or open their stomata only at night, evolved repeatedly in hot, dry habitats ([[plant-biology/c4-and-cam]]).
:::
:::

## Alternation of generations

::: definition Alternation of generations {#def-alternation}
In the life cycle of every land plant, a multicellular diploid **sporophyte** ($2n$) produces haploid **spores** by meiosis in sporangia; each spore grows by mitosis into a multicellular haploid **gametophyte** ($n$), which produces **gametes** by mitosis in archegonia (eggs) and antheridia (sperm); fertilisation gives a diploid **zygote**, which grows by mitosis into the next sporophyte. The two generations differ in form and size; one or the other is dominant (larger, longer-lived, independent) depending on the lineage. Plants whose spores are all of one size are **homosporous**; **heterosporous** plants make small **microspores**, which develop into male gametophytes, and large **megaspores**, which develop into female gametophytes.
:::

Note how this differs from the animal life cycle ([[genetics/chromosomes-meiosis#def-meiosis]]). In animals, meiosis produces gametes directly, and the only multicellular phase is diploid. In plants, meiosis produces spores, and gametes are made by mitosis from a haploid body.

::: widget graph
nodes: Sporophyte (2n)@0,2; Sporangium (2n)@1.5,3.4; Spores (n)@3.5,3.4; Gametophyte (n)@5,2; Gametes (n)@3.5,0.6; Zygote (2n)@1.5,0.6
edges: Sporophyte (2n)>Sporangium (2n); Sporangium (2n)>Spores (n); Spores (n)>Gametophyte (n); Gametophyte (n)>Gametes (n); Gametes (n)>Zygote (2n); Zygote (2n)>Sporophyte (2n)
caption: The alternation of generations as a directed cycle. The arrow from sporangium to spores is meiosis (ploidy halves); the arrow from gametes to zygote is fertilisation (ploidy doubles); every other arrow is growth or differentiation by mitosis, so ploidy is unchanged along it. The upper half of the cycle (spores to gametes) is haploid, the lower diploid. Drag the gametophyte node close to the spores to picture a seed plant, where the gametophyte is reduced to a few cells; drag the sporophyte close to the zygote for a moss, where the sporophyte is a short-lived stalk on the gametophyte.
:::

Across the land plants there is a striking trend:

| group | dominant generation | sporophyte | gametophyte | sperm | spores |
|---|---|---|---|---|---|
| bryophytes | gametophyte | unbranched, attached to and dependent on the gametophyte | free-living, photosynthetic | swim in water | homosporous |
| lycophytes and ferns | sporophyte | large, independent, vascular | small, free-living (prothallus), or reduced inside the spore wall in heterosporous species | swim in water | most homosporous; *Selaginella*, *Isoetes* and water ferns heterosporous |
| gymnosperms | sporophyte | trees and shrubs | microscopic, within the sporophyte's tissues: pollen grain (male), a multicellular female gametophyte in the ovule | carried by pollen tube (swimming sperm released near the egg in cycads and *Ginkgo*) | heterosporous |
| flowering plants | sporophyte | herbs, shrubs, trees | extremely reduced: pollen grain of 2–3 cells; embryo sac of usually 7 cells and 8 nuclei | non-motile, delivered by pollen tube | heterosporous |

Why did the sporophyte come to dominate? Diploidy masks deleterious recessive mutations and may resist ultraviolet damage better; the sporophyte, growing upwards from a gametophyte, can disperse spores from a height; and only the sporophyte evolved vascular tissue. But bryophytes, with their dominant gametophytes, are not failures — they are a successful lineage of some 20,000 species that colonise rock, bark and peat where vascular plants struggle.

::: warning "Mosses are the ancestors of ferns" and "a seed is a spore"
Living bryophytes are not ancestors of vascular plants. Recent phylogenomic analyses (Mark Puttick and colleagues, 2018; One Thousand Plant Transcriptomes Initiative, 2019) mostly recover the three bryophyte groups as a clade, sister to vascular plants; the earliest land plants may have had more complex sporophytes than living bryophytes, some features of which (such as stomata in liverworts) were later lost. Modern mosses have been evolving as long as ferns. And a seed is not a spore: a spore is a single haploid cell, whereas a seed is a multicellular structure containing a diploid embryo of the next sporophyte, a food store, and a protective coat derived from the parent sporophyte — three generations in one package (parent sporophyte, female gametophyte remnants or endosperm, and embryo).
:::

## Bryophytes

The three groups of bryophytes have dominant, often leafy gametophytes and unbranched sporophytes:

- **Liverworts** (Marchantiophyta, about 7,500 species) are flattened (thalloid), like *Marchantia polymorpha*, now a genetic model, or leafy; they lack stomata and their sporophytes are short-lived.
- **Mosses** (Bryophyta, about 13,000 species) have leafy gametophytes and sporophytes with a capsule that opens by a lid and releases spores through a ring of teeth that respond to humidity. The moss *Physcomitrium* (*Physcomitrella*) *patens* is a model organism with efficient homologous recombination. Peat mosses (*Sphagnum*) dominate peatlands, which cover only about 3 % of the land but hold a large share of soil carbon (estimates of several hundred gigatonnes).
- **Hornworts** (Anthocerotophyta, about 200–250 species) have horn-like sporophytes that grow continuously from a basal meristem, chloroplasts with pyrenoids (a CO₂-concentrating mechanism unique among land plants) and cavities that house nitrogen-fixing cyanobacteria (*Nostoc*).

Bryophytes absorb water over their whole surface and lack true vascular tissue (some mosses have simple conducting cells), so they rarely exceed a few centimetres in height. Many tolerate complete desiccation.

## Vascular plants

::: definition Vascular tissue {#def-vascular}
**Vascular plants** (tracheophytes) have **xylem**, which conducts water and minerals upwards and supports the plant, and **phloem**, which conducts sugars and other organic molecules. The water-conducting cells of xylem — **tracheids** in all vascular plants, and also **vessel elements** in flowering plants (and, independently, in gnetophytes and some ferns) — are dead at maturity, with walls thickened and stiffened by **lignin**, a complex phenolic polymer. Vascular plants also have a branched, long-lived sporophyte and, in most groups, true roots and leaves.
:::

Lignified xylem made height possible, and height is the competition for light. Water is pulled up the xylem by evaporation from leaves, under tension, held together by the cohesion of water molecules (the cohesion–tension theory of Henry Dixon and John Joly, 1894; see [[plant-biology/water-transport]]). Gravity alone sets a minimum to that tension.

::: example The weight of a water column {#ex-height}
The tallest living tree, a coast redwood (*Sequoia sempervirens*) in California, is about 116 m tall. (a) What tension (negative pressure) is needed just to hold a static water column to its top? (b) George Koch and colleagues (2004) found that leaves at the top of the tallest redwoods are under water potentials of about −1.8 MPa at midday, small and water-stressed. What does this suggest about the maximum height of trees?
::: solution
(a) The hydrostatic pressure of a water column is $\rho gh = 1000\times9.81\times116 = 1.14\times10^6$ Pa $= 1.14$ MPa. To hold water at the top, the pressure there must be at least 1.14 MPa lower than at the base, about 0.01 MPa per metre — before any allowance for the friction of flow.

(b) Gravity plus flow resistance makes water potential fall with height, so leaves near the top grow under increasing water stress: they are smaller, thicker, and photosynthesise less. Koch and colleagues extrapolated the decline of leaf size and photosynthesis with height and estimated that redwoods cannot grow beyond about 122–130 m — close to the tallest reliably measured trees in history. The limit comes from the physics of water transport, not from the strength of wood.
:::
:::

The first vascular plants were leafless. Two groups survive:

- **Lycophytes** (about 1,300 species: clubmosses *Lycopodium*, spikemosses *Selaginella*, quillworts *Isoetes*) have **microphylls**, small leaves with a single unbranched vein, which evolved from outgrowths of the stem. In the Carboniferous, tree lycophytes such as *Lepidodendron*, 30–40 m tall, dominated swamp forests.
- **Euphyllophytes** have **megaphylls**, leaves with branched veins thought to have evolved from flattened, webbed branch systems (the "telome theory" of Walter Zimmermann, 1930). They include the **ferns** in the broad sense (monilophytes, about 10,500 species, including horsetails, *Equisetum*, and whisk ferns, *Psilotum*) and the seed plants. Ferns have large sporophytes, often with spore-producing sporangia in clusters (sori) on the undersides of leaves, and small, heart-shaped, free-living gametophytes. The Pteridophyte Phylogeny Group (PPG I, 2016) counted 1,338 lycophyte and 10,578 fern species.

**Heterospory** evolved several times among lycophytes, ferns and the ancestors of seed plants. It was the prelude to the seed: if the megaspore is retained on the parent plant and the female gametophyte develops inside it, nourished by the sporophyte, the result is an ovule.

## Seed plants

::: definition Ovule, pollen and seed {#def-seed}
In seed plants (spermatophytes) a single functional megaspore develops into a female gametophyte inside the **megasporangium** (nucellus), which is enclosed in one or two protective layers, the **integuments**, with a small opening, the **micropyle**: the whole structure is an **ovule**. Microspores develop into **pollen grains**, male gametophytes of a few cells that are carried by wind or animals to the ovule (**pollination**), where a **pollen tube** grows to deliver the sperm. After fertilisation, the ovule becomes a **seed**: an embryo (the new sporophyte), a store of food, and a seed coat formed from the integuments.
:::

Seeds freed reproduction from water and allowed it to be postponed. A seed can remain dormant for years — the record is a date palm (*Phoenix dactylifera*) grown from a seed about 2,000 years old found at Masada (Sarah Sallon and colleagues, 2008) — and the embryo begins life with a food supply. The oldest seeds are Late Devonian, about 365 million years old (*Elkinsia polymorpha*, Gar Rothwell and colleagues, 1989), and the first seed plants, the "seed ferns" (an assemblage of extinct lineages), were followed by the living groups of gymnosperms.

### Gymnosperms

**Gymnosperms** ("naked seeds"; about 1,100 living species) bear ovules exposed on the surface of scales or stalks rather than enclosed in an ovary. They comprise four lineages:

- **Cycads** (about 350 species), palm-like plants with large cones, many of them threatened; they retain swimming sperm, as discovered in *Ginkgo* by Sakugoro Hirase and in *Cycas* by Seiichiro Ikeno, both in 1896.
- ***Ginkgo biloba***, the sole survivor of a lineage diverse in the Mesozoic, with fan-shaped leaves; it was known in the wild only from a few refugia in China.
- **Conifers** (about 600–650 species): pines, spruces, firs, cedars, cypresses, yews, redwoods and the southern podocarps and araucarias. They dominate boreal forests and include the tallest (*Sequoia sempervirens*), most massive (*Sequoiadendron giganteum*) and oldest (Great Basin bristlecone pine, *Pinus longaeva*, with individuals over 4,800 years old) trees.
- **Gnetophytes** (about 100 species): *Ephedra*, the tropical vines and trees of *Gnetum*, and the strange *Welwitschia mirabilis* of the Namib desert, with two strap-like leaves that grow throughout a life of centuries. Their vessels and double-fertilisation-like process once suggested a link to flowering plants; molecular phylogenies instead place them with or within the conifers.

A pine takes about two years to complete its cycle: pollen lands on the ovule in one spring, and fertilisation follows about a year later.

### Phyllotaxis and the golden angle

Look down on a pine cone, a sunflower head or a shoot tip and you will see the organs (scales, florets, leaves) arranged in two families of spirals winding in opposite directions. Count them and you will usually find two consecutive numbers of the Fibonacci sequence 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, …: 8 and 13 spirals on a pine cone, 34 and 55 (or 55 and 89) on a sunflower. The reason is that successive organs arise at the shoot apex separated by a nearly constant **divergence angle**, close to the **golden angle**.

::: proposition The golden angle {#prop-golden}
Let $\varphi = (1 + \sqrt5)/2 \approx 1.618$ be the golden ratio. The **golden angle** is the smaller of the two arcs into which a circle is divided in the golden ratio:

$$
\theta_g = 360^\circ\Big(1 - \frac{1}{\varphi}\Big) = \frac{360^\circ}{\varphi^2} \approx 137.508^\circ.
$$ {#eq-golden}

The ratios of consecutive Fibonacci numbers $F_{n+1}/F_n$ converge to $\varphi$, and the convergents $F_{n}/F_{n+2}$ (1/2, 1/3, 2/5, 3/8, 5/13, …) are the best rational approximations to the fraction of a turn $1/\varphi^2 = 0.38197$, which is why spiral counts are Fibonacci numbers.
:::

::: proof
$\varphi$ satisfies $\varphi^2 = \varphi + 1$, so dividing by $\varphi^2$ gives $1 = 1/\varphi + 1/\varphi^2$, that is, $1 - 1/\varphi = 1/\varphi^2$. Hence $360^\circ(1 - 1/\varphi) = 360^\circ/\varphi^2 = 360^\circ\times0.381966 = 137.508^\circ$; the two arcs, $360^\circ/\varphi$ and $360^\circ/\varphi^2$, are in the ratio $\varphi$. For the convergence, $F_{n+1}/F_n$ satisfies $x_{n+1} = 1 + 1/x_n$, whose positive fixed point is $\varphi$, and the map is a contraction near it. The continued fraction of $1/\varphi^2$ is $[0; 2, 1, 1, 1, \dots]$, whose convergents are the ratios $F_n/F_{n+2}$; because all the later partial quotients equal 1, the smallest possible, $\varphi$ is the irrational number most poorly approximated by rationals, the deeper reason why the golden angle avoids the alignment of organs into a few straight rows.
:::

::: example Where do Fibonacci numbers come from? {#ex-phyllotaxis}
Leaves arise one after another at the golden angle, $137.508^\circ$. Leaf 0 is at $0^\circ$. (a) Find the angular positions of leaves 1–13, modulo $360^\circ$. (b) Which leaves come closer in angle to leaf 0 than any earlier leaf? (c) Relate the answer to the spirals seen on a pine cone.
::: solution
(a) Multiplying by 137.508° and reducing modulo 360°: leaf 1 at 137.5°, 2 at 275.0°, 3 at 52.5°, 4 at 190.0°, 5 at 327.5°, 6 at 105.0°, 7 at 242.6°, 8 at 20.1°, 9 at 157.6°, 10 at 295.1°, 11 at 72.6°, 12 at 210.1°, 13 at 347.6°.

(b) The angular distance from leaf 0 (the smaller way round) is 137.5° for leaf 1, then 85.0° (leaf 2), 52.5° (leaf 3), 32.5° (leaf 5), 20.1° (leaf 8) and 12.4° (leaf 13): each record holder is a Fibonacci number, and none of the other leaves (4, 6, 7, 9–12) beats the previous record. Continuing, the next records are leaf 21 (7.7°), 34, 55 ….

(c) On a cone or a capitulum, where organs are packed together, each organ's nearest neighbours are those closest to it in angle among those at similar distance along the axis — so the visible spirals connect organs whose numbers differ by consecutive Fibonacci numbers, such as 8 and 13. Counting the spirals in each direction gives those differences.
:::
:::

Why should a plant use the golden angle? A new primordium forms where there is most room on the growing apex, away from its predecessors, which inhibit it (in molecular terms, where the hormone auxin accumulates, as its transport is redirected by existing primordia). Stéphane Douady and Yves Couder (1992), with a physical model of magnetised drops repelling each other, and later computer simulations, showed that this simple rule of inhibition produces the golden angle and Fibonacci spirals spontaneously as the apex grows. If the divergence were a rational fraction of a turn, say $2/5$, every fifth leaf would sit directly over an earlier one, shading it and leaving gaps; the golden angle packs organs evenly. The Fibonacci pattern is thus an outcome of a growth process, not a target selected for its own sake — although the even packing may well be advantageous.

## Flowering plants

::: definition Flower and double fertilisation {#def-flower}
**Angiosperms** (flowering plants) are seed plants whose ovules are enclosed in a **carpel**, a modified leaf folded and sealed around them; one or more carpels form the **pistil** (ovary, style and stigma), and the ovary matures into a **fruit**. The **flower** is a short shoot bearing, typically, sepals, petals, stamens (microsporangia on filaments) and carpels in successive whorls. In **double fertilisation**, one sperm from the pollen tube fuses with the egg to form the zygote, and a second fuses with the two polar nuclei of the central cell to form a usually triploid **endosperm**, the food tissue of the seed. Double fertilisation was discovered by Sergei Nawaschin (1898) and Léon Guignard (1899).
:::

Angiosperms are by far the largest group of land plants: Maarten Christenhusz and James Byng (2016) counted about 295,000 described species, and the Angiosperm Phylogeny Group's classification (APG IV, 2016) recognises 64 orders and 416 families. The phylogeny is now well resolved. The earliest branches are the **ANA grade**: *Amborella trichopoda*, a shrub of New Caledonia that is sister to all other living angiosperms, then the water lilies (Nymphaeales) and the Austrobaileyales (star anise). Then come the **magnoliids** (magnolias, laurels, black pepper), the **monocots** (about a quarter of species: grasses, orchids, palms, lilies; one seed leaf, parallel-veined leaves, scattered vascular bundles) and the **eudicots** (about three-quarters: roses, beans, sunflowers, oaks; tricolpate pollen with three apertures).

The origin of the flower is still puzzling. The oldest unequivocal angiosperm fossils are pollen grains of the Early Cretaceous, about 135–130 million years old; aquatic *Montsechia* from Spain is about 130 million years old (Bernard Gomez and colleagues, 2015) and *Archaefructus* from China about 125 million years old (Ge Sun and colleagues, 2002). Most molecular clocks give older ages for crown angiosperms, in the Jurassic or even Triassic, a long-standing discrepancy: either early angiosperms were rare and unlikely to fossilise, or rate variation biases the clocks. Then, within some 30 million years of their first appearance, angiosperms spread to dominate many floras. Darwin, in a letter to Joseph Hooker in 1879, called their rapid rise "an abominable mystery".

::: example How fast did flowering plants diversify? {#ex-angiosperm-rate}
Using the estimator of net diversification from the crown age, $\hat r = (\ln N - \ln 2)/t$ ([[evolution/macroevolution#prop-birthdeath]]), compare angiosperms ($N \approx 295{,}000$) with a crown age of 140 Myr or 200 Myr, and gymnosperms ($N \approx 1{,}100$) with a crown age of about 300 Myr.
::: solution
Angiosperms, 140 Myr: $\hat r = (\ln 295{,}000 - \ln 2)/140 = (12.594 - 0.693)/140 = 0.085$ per Myr. With 200 Myr: $11.90/200 = 0.060$ per Myr. Gymnosperms: $(\ln 1100 - 0.693)/300 = (7.003 - 0.693)/300 = 0.021$ per Myr.

Flowering plants have diversified three to four times faster, on average, than gymnosperms, whatever the uncertainty in their age. This is an average over a whole clade; the estimator ignores extinction (which, for gymnosperms, has been heavy — the living species are survivors of a much larger Mesozoic diversity) and hides great variation among subclades (orchids and daisies very fast; *Amborella*, one species after 140 million years, very slow). Proposed causes of the angiosperms' speed include animal pollination and seed dispersal, which favour reproductive isolation; rapid life cycles; vessels and efficient leaves; and repeated whole-genome duplications.
:::
:::

::: widget plot
f: log10(2) + r*x/ln(10); log10(2) + 0.021*x/ln(10)
x: 0, 300
y: 0, 6
sliders: r=0.085:0.01:0.15:0.005
points: 140, 5.47; 300, 3.04
labels: \text{rate } r; \text{gymnosperms, } r = 0.021
caption: Expected number of living species, on a $\log_{10}$ scale, in a clade that started as two lineages $t$ million years ago and grew at constant net diversification rate $r$: $\log_{10}N = \log_{10}2 + rt/\ln 10$. The two points mark angiosperms (about 295,000 species, plotted at a crown age of 140 Myr) and gymnosperms (about 1,100 species at about 300 Myr), from [[#ex-angiosperm-rate]]. With the slider at 0.085 the first line passes through the angiosperm point; the second, fixed line shows the gymnosperm rate. Slide $r$ down to 0.06 to see what a crown age of 200 Myr would imply: the line must reach the same height at $t = 200$.
:::

Angiosperms coevolved with their animal pollinators and seed dispersers ([[evolution/coevolution]]), and much of their floral diversity — colour, scent, shape, nectar — is about recruiting particular animals. About 87.5 % of flowering plant species are pollinated by animals (Jeff Ollerton, Rachael Winfree and Sam Tarrant, 2011). Many also have mechanisms that prevent self-fertilisation, such as genetic **self-incompatibility**, in which pollen carrying the same *S* allele as the pistil is rejected — another system maintained by negative frequency-dependent selection, like the mating types of [[diversity-of-life/fungi#prop-mating]].

::: quiz
In a lily, which of the following structures are haploid?
- [x] The pollen grain
- [ ] The endosperm
- [x] The egg cell in the embryo sac
- [ ] The cells of the petals
- [ ] The embryo
::: solution
The pollen grain (male gametophyte) and the cells of the embryo sac (female gametophyte), including the egg, are haploid. Petals and the embryo are parts of sporophytes, diploid; the endosperm is usually triploid, from the fusion of a sperm with two polar nuclei. (In lilies the endosperm is in fact pentaploid in some species, because of an unusual embryo-sac development — a reminder that "triploid" is a typical, not a universal, rule.)
:::
:::

::: application Plants that feed the world
Three grasses — rice, wheat and maize — provide close to half of the calories eaten by people, and a few dozen crop species most of the rest. Most were domesticated in the last 10,000–12,000 years in a few centres (the Fertile Crescent, China, Mesoamerica, the Andes, New Guinea, Africa), selection changing shattering seed heads into non-shattering ones, and wild teosinte into maize. Many crops, including bread wheat (*Triticum aestivum*, a hexaploid hybrid of three grass species), cotton, potato and banana, are polyploids ([[genetics/chromosome-mutations#def-polyploid]]). The narrow genetic base of modern varieties makes crop wild relatives valuable, and seed banks such as the Svalbard Global Seed Vault (opened 2008) store hundreds of thousands of samples. About two in five plant species may be threatened with extinction (Royal Botanic Gardens, Kew, *State of the World's Plants and Fungi*, 2020) ([[conservation-biology]]).
:::

::: history
Robert Brown (1827) recognised that the ovules of conifers and cycads are naked, defining gymnosperms. Wilhelm Hofmeister (1851) discovered the alternation of generations common to mosses, ferns and seed plants, one of the great unifying discoveries of botany. Hirase and Ikeno (1896) found swimming sperm in *Ginkgo* and cycads; Nawaschin (1898) and Guignard (1899) discovered double fertilisation. Robert Kidston and William Lang described the Rhynie chert plants (1917–1921). Darwin's "abominable mystery" letter (1879) set the problem of angiosperm origins. Zimmermann's telome theory (1930) explained megaphylls. Molecular systematics transformed the classification: the Angiosperm Phylogeny Group's first classification appeared in 1998 (APG IV in 2016), *Amborella* was identified as sister to all other flowering plants in 1999, and the sister group of land plants was shown to be the Zygnematophyceae in the 2010s.
:::

::: summary
- Land plants (embryophytes) evolved from freshwater streptophyte algae; their closest living relatives are the Zygnematophyceae. Cryptospores date them to at least 470 Ma; clocks suggest 515–470 Ma.
- Synapomorphies: retained embryo, alternation of generations, archegonia and antheridia, sporopollenin-walled spores, cuticle and stomata, apical meristems.
- Leaves lose about 200 or more H₂O per CO₂ fixed: $E/A = 1.6(w_i - w_a)/(c_a - c_i)$.
- In alternation of generations, meiosis makes spores and gametophytes make gametes by mitosis. The gametophyte dominates in bryophytes; the sporophyte dominates in vascular plants, and the gametophyte shrinks to a few cells in seed plants.
- Bryophytes (liverworts, mosses, hornworts) are probably a clade sister to vascular plants. Vascular plants have lignified xylem and phloem; lycophytes have microphylls, euphyllophytes (ferns, seed plants) megaphylls. A water column of height $h$ needs $\rho gh \approx 0.01$ MPa per metre; tree height is limited to about 120–130 m.
- Seeds (ovule + integuments, pollen, embryo + food + coat) date from 365 Ma. Gymnosperms (about 1,100 species): cycads, *Ginkgo*, conifers, gnetophytes. Leaves and scales follow the golden angle $360^\circ/\varphi^2 \approx 137.5^\circ$, giving Fibonacci spirals.
- Angiosperms (about 295,000 species): carpels, flowers, fruits, double fertilisation with triploid endosperm; *Amborella* is sister to the rest; unequivocal fossils from about 135–130 Ma. They diversified at about 0.06–0.085 per Myr, three to four times the gymnosperm rate.
:::

## Exercises

::: exercise The golden angle {level=1 check="137.5"}
Compute the golden angle, $360^\circ/\varphi^2$ with $\varphi = (1 + \sqrt5)/2$, in degrees to one decimal place.
::: solution
$\varphi^2 = \varphi + 1 = 2.618$; $360/2.618 = 137.5^\circ$.
:::
:::

::: exercise A water column {level=1 check="0.785"}
What tension, in MPa to three decimal places, is needed to support a static column of water 80 m tall ($\rho = 1000$ kg m⁻³, $g = 9.81$ m s⁻²)?
::: solution
$\rho gh = 1000\times9.81\times80 = 784{,}800$ Pa $= 0.785$ MPa.
:::
:::

::: exercise Ploidy in a fern {level=1}
Give the ploidy ($n$ or $2n$) of: (a) a fern leaf; (b) a spore; (c) the prothallus; (d) a sperm cell; (e) the cells of a sorus that undergo meiosis; (f) a young fern growing from the prothallus.
::: solution
(a) $2n$ (sporophyte). (b) $n$. (c) $n$ (gametophyte). (d) $n$, made by mitosis in an antheridium. (e) $2n$, spore mother cells in the sporangia. (f) $2n$, a new sporophyte from the zygote.
:::
:::

::: exercise Water-use efficiency {level=2 check="197"}
A leaf at a vapour pressure difference of 1.5 kPa (air pressure 101.3 kPa) has an internal CO₂ of 300 µmol mol⁻¹ in air of 420 µmol mol⁻¹. Using [[#eq-wue]], how many water molecules does it lose per CO₂ fixed, to the nearest whole number?
::: solution
$w_i - w_a = 1.5/101.3 = 0.01481$; $c_a - c_i = 120\times10^{-6}$. $E/A = 1.6\times0.01481/(1.2\times10^{-4}) = 197$.
:::
:::

::: exercise Gymnosperm diversification {level=2 check="0.021"}
Using $\hat r = (\ln N - \ln 2)/t$, estimate the net diversification rate of gymnosperms with $N = 1{,}100$ species and a crown age of 300 Myr, to three decimal places (per Myr).
::: solution
$(\ln 1100 - \ln 2)/300 = (7.003 - 0.693)/300 = 0.021$ per Myr.
:::
:::

::: exercise Fibonacci in a sunflower {level=2}
A sunflower head has 34 spirals in one direction and 55 in the other. (a) What is the ratio, and how close is it to $\varphi$? (b) What divergence angle does the fraction 21/55 of a turn correspond to? (c) Why might a larger head show 55 and 89 spirals?
::: solution
(a) $55/34 = 1.6176$, within 0.03 % of $\varphi = 1.6180$.
(b) $360\times21/55 = 137.45^\circ$, close to the golden angle (137.51°); 21/55 is a Fibonacci convergent $F_n/F_{n+2}$ of $1/\varphi^2$.
(c) The visible spirals (parastichies) connect organs that are nearest neighbours. As florets become smaller relative to the head's radius farther from the centre, the nearest neighbours of each floret are separated by larger numbers of steps in the sequence, and the visible spiral counts move up the Fibonacci sequence — 55 and 89, or even 89 and 144 in very large heads.
:::
:::

::: exercise Endosperm genetics {level=2}
In maize, kernel colour is a property of the endosperm. A plant homozygous for a recessive allele *y* (white endosperm) is pollinated by a plant homozygous for the dominant allele *Y* (yellow). (a) What is the genotype of the endosperm of the resulting kernels? (b) What is the genotype of the embryo? (c) Why are the kernels yellow in the same season as pollination, a phenomenon called xenia?
::: solution
(a) The two polar nuclei are from the female gametophyte (*y* and *y*), the sperm from pollen (*Y*): endosperm *yyY*, triploid. (b) The embryo is from egg (*y*) and the other sperm (*Y*): *Yy*. (c) The endosperm is formed by fertilisation and expresses the pollen parent's dominant allele immediately; so the pollen's genotype affects the appearance of the seed on the mother plant in the same season. (Kernel colour in maize was one of the traits used in early genetic studies of double fertilisation.)
:::
:::

::: exercise Why the golden angle? {level=3}
(a) A shoot produces leaves at a divergence of exactly 144° (= 2/5 of a turn). Show that every fifth leaf lies directly above an earlier one, and describe the pattern seen from above. (b) For the golden angle, show that no two leaves ever lie exactly above one another. (c) Explain why "selection for optimal light capture" may not be the right explanation for the golden angle, using the mechanism of primordium formation at the apex.
::: solution
(a) Leaf $k$ is at angle $144k^\circ$ mod 360. Leaf 5 is at $720^\circ = 2$ full turns, directly over leaf 0, and in general leaf $k + 5$ is over leaf $k$. Seen from above, leaves lie in five straight radial rows (orthostichies), with gaps between them.
(b) Leaves $j$ and $k$ coincide if $(k - j)\theta_g$ is a multiple of $360^\circ$, i.e. if $(k - j)/\varphi^2$ is an integer. Since $1/\varphi^2 = (3 - \sqrt5)/2$ is irrational, $(k - j)/\varphi^2$ is never an integer for $k \ne j$: no two leaves coincide.
(c) Primordia form at the apex where the inhibitory influence of earlier primordia is weakest — where auxin accumulates as its transport is redirected towards sites away from existing primordia. Models with only this rule (Douady and Couder, 1992; and models of auxin transport) produce the golden angle automatically as the apex grows, from a wide range of starting conditions. The pattern may therefore be a by-product of a self-organising developmental mechanism. Light capture is affected by internode length, leaf shape and petiole twisting much more than by divergence angle, and many plants with Fibonacci phyllotaxis (cones, sunflower florets) do not use it for light. Selection may act on the mechanism, but the golden angle itself is a generic outcome.
:::
:::

::: exercise Reading the early record {level=3}
The oldest land-plant spores (cryptospores) are about 470 Myr old, the oldest plant megafossils about 430 Myr old, and molecular clocks put crown embryophytes at 515–470 Myr. (a) Give two reasons why megafossils appear 40 Myr after spores. (b) Why might the clock estimate be older than both? (c) How would you test whether the cryptospore producers were bryophyte-like?
::: solution
(a) Spores are produced in vast numbers and have sporopollenin walls that survive and are transported into marine sediments, while small, soft-bodied plants without lignin rarely fossilise and lived in terrestrial settings with poor preservation; also, early plants may genuinely have been tiny, mat-like and inconspicuous.
(b) Fossils give minimum ages, since the first fossil postdates the origin; and the clock reports the crown-group age, which may precede the first appearance of recognisable fossils (the Signor–Lipps effect in reverse; [[evolution/macroevolution#def-record]]). Clock estimates also depend on calibrations and rate models and may be biased old if rates were faster early.
(c) Compare the wall ultrastructure of cryptospores with spores of living liverworts and mosses; find cryptospores in situ in sporangia attached to plant fragments (as in Silurian–Devonian fossils such as *Partitatheca*); and look for associated fossil tissues (liverwort-like thalli) in the same deposits.
:::
:::
