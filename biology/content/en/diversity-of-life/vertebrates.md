We end the survey of diversity with our own lineage. Vertebrates are a small part of animal diversity — about 75,000 living species against roughly 1.5 million described invertebrates — but they include the largest animals that have ever lived, the fastest, the longest-lived and the most intelligent, and they have been studied longer and in more detail than any other group. Their history, from finger-sized swimmers in the Cambrian to whales and birds, is unusually well documented by fossils, and the major transitions — the origin of jaws, the move onto land, the amniotic egg, flight and the mammalian ear — are among the best-understood events in macroevolution.

This chapter defines chordates and vertebrates, follows the tree from jawless fishes to mammals, and dwells on the transitions. The phylogeny is tied to dates — molecular estimates from TimeTree and minimum ages from fossils — and the physics of two vertebrate problems is worked out: how a fish with a gas-filled swim bladder achieves neutral buoyancy, and how metabolic rate scales with body size (Kleiber's rule, an empirical regularity). Human evolution is treated separately in [[evolution/human-evolution]], and vertebrate physiology in [[animal-physiology]].

## Chordates

::: definition Chordates {#def-chordate}
**Chordates** (Chordata) are deuterostome animals ([[diversity-of-life/invertebrates]]) that have, at least at some stage of life, five synapomorphies: (1) a **notochord**, a flexible rod of vacuolated cells in a sheath, running along the back below the nerve cord; (2) a **dorsal, hollow nerve cord**, formed by infolding of the ectoderm; (3) **pharyngeal slits** (gill slits), openings from the pharynx to the outside, used originally for filter feeding; (4) an **endostyle** (or its derivative, the thyroid gland), a groove in the pharynx floor that secretes mucus and binds iodine; and (5) a muscular **post-anal tail**.
:::

The three living groups of chordates are the **cephalochordates** (lancelets or amphioxus, about 30 species of small, fish-shaped filter feeders that keep all five features as adults), the **tunicates** (sea squirts and their relatives, about 3,000 species, whose larvae are tadpole-like but whose sessile adults lose the notochord and nerve cord) and the **vertebrates**. Anatomy suggested that lancelets were the sister group of vertebrates, but phylogenomic analyses (Frédéric Delsuc and colleagues, 2006) showed that tunicates are: vertebrates and tunicates form the clade **Olfactores**, and the sessile, simplified adult tunicate is a highly derived body plan. Their sister group among deuterostomes is Ambulacraria (echinoderms and hemichordates), which share pharyngeal slits (in hemichordates).

::: definition Vertebrates {#def-vertebrate}
**Vertebrates** (Vertebrata, or Craniata) are chordates with a **cranium** (a skull of cartilage or bone protecting a brain with distinct fore-, mid- and hindbrain), paired sense organs (eyes, ears, nose), and, in all but hagfishes, **vertebrae** — skeletal elements around the nerve cord that partly or wholly replace the notochord. Two embryonic innovations underlie much of this: the **neural crest**, cells that migrate from the edges of the neural tube to form much of the skull, the peripheral nervous system, pigment cells and other tissues; and the **placodes**, thickenings of ectoderm that form sense organs.
:::

Vertebrate genomes also bear the marks of **two rounds of whole-genome duplication** early in the lineage (the "2R" hypothesis, [[evolution/macroevolution]]), which multiplied the developmental toolkit: four *Hox* clusters in mammals against one in amphioxus. The oldest vertebrates are fossils from the Chengjiang biota of China, about 518 million years old — *Myllokunmingia* and *Haikouichthys*, a few centimetres long, with gill pouches, zigzag muscle blocks and possibly a cranium (Shu Degan and colleagues, 1999). The Burgess Shale species *Metaspriggina* (Simon Conway Morris and Jean-Bernard Caron, 2014) has paired eyes and gill bars.

## Jawless and jawed fishes

The living jawless vertebrates, **cyclostomes**, are the hagfishes (about 80 species, scavengers of the sea floor that produce prodigious slime) and the lampreys (about 40–50 species, many parasitic as adults). Morphology suggested that lampreys were closer to jawed vertebrates than hagfishes are, but molecular data unite the two as a clade. Many extinct jawless "ostracoderms" of the Ordovician to Devonian had bony armour.

**Jaws** evolved from an anterior pair of the cartilaginous **pharyngeal arches** that support the gills, the upper and lower jaws developing from the upper and lower parts of the arch. Jawed vertebrates, **gnathostomes**, also have paired pectoral and pelvic fins, three semicircular canals in the inner ear and myelinated nerves. The oldest gnathostome remains are teeth and scales from the early Silurian, about 439 million years ago (*Qianodus*, Plamen Andreev and colleagues, 2022). The armoured **placoderms** of the Silurian and Devonian form a series of stem gnathostomes; *Entelognathus primordialis* from the late Silurian of China, roughly 420 million years old (Zhu Min and colleagues, 2013), had bony jaw elements like those of bony fishes, suggesting that the jaws of living fishes descend from placoderm jaws.

Living gnathostomes form two clades:

- **Chondrichthyes** (about 1,300 species: sharks, rays and chimaeras), with skeletons of cartilage strengthened by mineralised tiles, placoid scales (tooth-like denticles), and internal fertilisation; many have electroreceptors (ampullae of Lorenzini).
- **Osteichthyes**, the bony vertebrates, with skeletons of bone, which include the ray-finned fishes, the lobe-finned fishes and the tetrapods. The oldest articulated one is *Guiyu oneiros*, from the same late Silurian rocks of Yunnan, roughly 420 million years old (Zhu Min and colleagues, 2009). Early bony fishes had lungs or lung-like air sacs; in most ray-finned fishes these became the **swim bladder**.

**Actinopterygii** (ray-finned fishes) have fins supported by thin bony rays. They include about half of all vertebrate species — Eschmeyer's *Catalog of Fishes* lists about 36,000 valid species of fishes in all, most of them **teleosts**, whose ancestor underwent a third whole-genome duplication. **Sarcopterygii** (lobe-finned fishes) have fleshy fins with a central skeleton of a few large bones joined to the girdle by a single bone; they include the coelacanths, the lungfishes and the tetrapods.

### Neutral buoyancy

Fish tissue is denser than water — bone, muscle and protein have densities of about 1.06–1.09 g cm⁻³ in teleosts without their swim bladders — so a fish without a buoyancy mechanism sinks. Sharks offset part of their weight with a huge oily liver and generate lift with their fins as they swim; most teleosts use a gas-filled swim bladder.

::: proposition The swim-bladder volume for neutral buoyancy {#prop-buoyancy}
Let a fish's tissues (everything except the gas) have mean density $\rho_t$, the water density $\rho_w$ and the gas density $\rho_g$. The fish is neutrally buoyant if the gas occupies a fraction

$$
f = \frac{\rho_t - \rho_w}{\rho_t - \rho_g} \approx \frac{\rho_t - \rho_w}{\rho_t}
$$ {#eq-buoyancy}

of its total volume, the approximation holding near the surface, where $\rho_g \ll \rho_t$.
:::

::: proof
By Archimedes' principle the fish floats neutrally when its mean density equals that of the water. With gas volume fraction $f$, the mean density is $(1 - f)\rho_t + f\rho_g$. Setting this equal to $\rho_w$ and solving, $f(\rho_t - \rho_g) = \rho_t - \rho_w$.
:::

::: example How big is a swim bladder? {#ex-buoyancy}
Take $\rho_t = 1.075$ g cm⁻³. (a) What swim-bladder fraction does a marine teleost need in sea water ($\rho_w = 1.026$ g cm⁻³)? (b) And a freshwater teleost ($\rho_w = 1.000$)? (c) What happens to the bladder's volume when a marine fish swims from the surface to 30 m depth, and what must it do?
::: solution
(a) $f \approx (1.075 - 1.026)/1.075 = 0.046$: about 5 % of body volume. (b) $f \approx 0.075/1.075 = 0.070$: about 7 %. Both agree with measured swim-bladder volumes of marine and freshwater teleosts (around 5 % and 7–8 %). Fresh water gives less support, so freshwater fishes need larger bladders.

(c) Each 10 m of sea water adds about 1 atmosphere of pressure, so at 30 m the absolute pressure is about 4 atm and, by Boyle's law, the gas would shrink to a quarter of its surface volume, making the fish sink. To stay neutral, it must secrete gas into the bladder — four times as many moles as at the surface — which teleosts do with a **gas gland** and a countercurrent capillary network, the **rete mirabile**, that concentrates oxygen to high partial pressures. The reverse problem explains why deep-sea fishes brought to the surface quickly suffer from expanding bladders.
:::
:::

::: widget plot
f: (x - 1.026)/x*100; (x - 1)/x*100
x: 1.03, 1.1
y: 0, 10
labels: \text{sea water}; \text{fresh water}
vlines: 1.075
caption: The swim-bladder volume needed for neutral buoyancy, as a percentage of body volume, against the density of the fish's tissues (g cm⁻³), from the approximate form of [[#eq-buoyancy]], in sea water (density 1.026) and in fresh water (1.000). At a typical tissue density of 1.075 (dashed line) a marine fish needs about 4.6 % and a freshwater fish 7.0 %. Notice that the marine curve is much steeper near low densities: a fish whose tissues are only slightly denser than sea water, such as many deep-sea fishes with watery muscles and reduced skeletons, needs little or no gas at all.
:::

## The move onto land

The **tetrapods** — amphibians, reptiles (including birds) and mammals — descend from Devonian lobe-finned fishes. Their closest living relatives are the lungfishes (six species, in Australia, South America and Africa), and next the coelacanths. The living coelacanth *Latimeria chalumnae* was a sensation when a specimen caught off South Africa in December 1938 was recognised by the museum curator Marjorie Courtenay-Latimer and described by J. L. B. Smith (1939): coelacanths had been known only as fossils that disappear from the record after the Cretaceous. A second species, *L. menadoensis*, was discovered in Indonesia in 1997–1999.

Fossils document the transition in unusual detail:

| fossil | age (Ma) | what it shows |
|---|---|---|
| *Eusthenopteron* | about 385 | lobe-finned fish with limb bones (humerus, radius, ulna) in its fins |
| *Panderichthys* | about 385 | flattened head, eyes on top, loss of dorsal fins |
| *Tiktaalik roseae* | about 375 | "fishapod" with gills, scales and fins but a mobile neck, robust shoulder and a wrist-like fin skeleton that could prop the body up (Edward Daeschler, Neil Shubin and Farish Jenkins, 2006) |
| *Acanthostega* | about 365 | limbs with eight digits (Michael Coates and Jennifer Clack, 1990), but internal gills and a tail fin: limbs evolved in water |
| *Ichthyostega* | about 365 | seven digits on the hind limb, robust ribs |

*Tiktaalik* was found by a targeted search: Shubin and colleagues reasoned that intermediates should lie in rocks of the right age (between fishes like *Panderichthys* and tetrapods like *Acanthostega*) formed in shallow freshwater environments, and searched such rocks on Ellesmere Island in the Canadian Arctic for six field seasons. But tetrapod-like trackways from Zachełmie in Poland, about 395 million years old (Grzegorz Niedźwiedzki and colleagues, 2010), are older than *Tiktaalik*, implying that limbed tetrapods already existed and that elpistostegalians such as *Tiktaalik* were late-surviving members of a lineage whose earlier history is unrecorded.

::: warning "Fish crawled out of the sea to conquer the land"
Three misconceptions are bundled together here. First, the early tetrapods were not marine fishes but lived in shallow, often brackish or freshwater, vegetated habitats, and digits evolved in animals that still lived in water — *Acanthostega* probably could not walk on land at all. Second, there was no single moment of emergence: features accumulated piecemeal over tens of millions of years, and many early tetrapods were aquatic. Third, "fish" is a paraphyletic grade: tetrapods are a clade *within* the bony fishes, nested inside Sarcopterygii, so in the cladistic sense humans are lobe-finned fishes ([[evolution/phylogenetics#def-clade]]).
:::

::: example Who are the vertebrates? {#ex-composition}
Approximate numbers of living species are: fishes (all non-tetrapod vertebrates) 36,000; amphibians 8,800; reptiles excluding birds 12,000; birds 11,000; mammals 6,700. (a) What fraction of vertebrate species are "fishes"? (b) What fraction are reptiles in the phylogenetic sense (including birds)? (c) Why does the answer to (a) say nothing about whether "fishes" are a natural group?
::: solution
The total is $36{,}000 + 8{,}800 + 12{,}000 + 11{,}000 + 6{,}700 = 74{,}500$.

(a) $36{,}000/74{,}500 = 0.48$: about half of vertebrate species are fishes, overwhelmingly teleosts.

(b) $(12{,}000 + 11{,}000)/74{,}500 = 0.31$: almost a third are reptiles once birds are counted with them, making Reptilia the largest tetrapod clade.

(c) Whether a group is natural (monophyletic) depends on the tree, not on how many species it holds. "Fishes" excluding tetrapods omit descendants of their common ancestor and so are paraphyletic, however numerous; and species counts depend on taxonomic practice, which differs between groups (birds and mammals are much more completely described than fishes).
:::
:::

**Amphibians** (Lissamphibia, about 8,800 species according to AmphibiaWeb in 2025: frogs about 88 %, salamanders and the limbless caecilians) typically have a life cycle with aquatic larvae and metamorphosis, moist permeable skin used for gas exchange, and eggs without shells that must be laid in water or damp places. They are the most threatened class of vertebrates, with about 41 % of assessed species threatened (Jennifer Luedtke and colleagues, 2023), partly because of the chytrid fungus ([[diversity-of-life/fungi]]).

## Amniotes

::: definition The amniotic egg {#def-amniote}
**Amniotes** (reptiles including birds, and mammals) are tetrapods whose embryos develop within four extraembryonic membranes: the **amnion**, enclosing the embryo in fluid; the **yolk sac**; the **allantois**, which stores waste and, with the **chorion**, exchanges gases; and the chorion surrounding them all. In most reptiles and in monotremes the whole is enclosed in a shell, which allows eggs to develop on land. In therian mammals, the chorion and allantois or yolk sac contribute to the **placenta**. Amniotes also have impermeable, keratinised skin and breathe by moving the ribs (costal ventilation).
:::

The oldest amniotes, such as *Hylonomus lyelli* from the fossilised tree stumps of Joggins, Nova Scotia (about 318–315 million years old), were small, lizard-like animals. Amniotes divided early into two lineages, both present by the late Carboniferous: the **synapsids**, with a single opening in the skull behind the eye, which led to mammals; and the **sauropsids** (reptiles), which led to turtles, lepidosaurs and archosaurs.

### Reptiles and birds

Living reptiles (about 12,000 species in the Reptile Database, excluding birds) are:

- **Lepidosaurs**: squamates (lizards and snakes, by far the largest group) and the tuatara, *Sphenodon punctatus* of New Zealand, the single surviving species of an order that was diverse in the Mesozoic.
- **Turtles**, whose position puzzled anatomists because their skulls lack temporal openings; genome-scale data place them as the sister group of archosaurs (the clade Archelosauria).
- **Archosaurs**: crocodilians and birds.

Birds are dinosaurs. The evidence was first assembled by Thomas Huxley (1868), who noted the similarities of *Archaeopteryx* and small theropods, and returned with John Ostrom's description of the theropod *Deinonychus* (1969). It is now overwhelming: theropods share with birds hollow bones, a wishbone (furcula), three main forward-pointing toes, brooding postures and, since the discovery of *Sinosauropteryx* in China in 1996, **feathers**. Many non-avian theropods were feathered, so feathers evolved before flight, probably for insulation and display. *Archaeopteryx lithographica*, from the Solnhofen limestone of Bavaria (about 150 million years old; first described in 1861), is a feathered theropod near the origin of birds. Crown birds, the most recent common ancestor of living birds and all its descendants, were present before the end of the Cretaceous: *Asteriornis maastrichtensis*, about 66.7 million years old, is a crown bird related to ducks and chickens (Daniel Field and colleagues, 2020). Among dinosaurs, only birds survived the end-Cretaceous extinction ([[evolution/macroevolution]]), and they radiated into about 11,000 living species.

### Mammals

::: definition Mammals {#def-mammal}
**Mammals** (Mammalia) are synapsid amniotes with **hair**, **mammary glands**, a lower jaw formed of a single bone (the **dentary**) articulating with the squamosal bone of the skull, and **three middle-ear ossicles** — the malleus, incus and stapes. The malleus and incus are homologous with the articular and quadrate bones, which form the jaw joint in other amniotes. Most mammals also have differentiated teeth (incisors, canines, premolars, molars) replaced only once, a muscular diaphragm and a four-chambered heart with a left aortic arch.
:::

The transformation of the reptilian jaw joint into mammalian ear bones, inferred from embryology by Karl Reichert (1837) and Ernst Gaupp, is documented by a fine series of fossil cynodonts and early mammals in which the bones behind the dentary shrink, a new dentary–squamosal joint forms beside the old one, and the old jaw bones migrate into the middle ear. Some Mesozoic mammals had an intermediate condition in which the ear bones were still attached to the jaw by cartilage, and the separation seems to have happened more than once.

Living mammals (about 6,500–6,800 species, according to successive versions of the Mammal Diversity Database since 2018) form three groups:

- **Monotremes** (five species: the platypus and four echidnas), which lay eggs and lack nipples (milk is secreted onto patches of skin).
- **Marsupials** (about 380 species, in Australasia and the Americas), with a short gestation and a long period of lactation, often in a pouch.
- **Placentals** (more than 6,000 species), with a long gestation supported by a chorioallantoic placenta. Molecular phylogenies (William Murphy and colleagues, 2001; Ole Madsen and colleagues, 2001) divide them into four superorders: **Afrotheria** (elephants, sea cows, hyraxes, aardvarks, tenrecs — an African radiation), **Xenarthra** (anteaters, sloths, armadillos — South American), **Laurasiatheria** (bats, whales and even-toed ungulates, carnivores, odd-toed ungulates, pangolins, hedgehogs and shrews) and **Euarchontoglires** (primates, rodents, rabbits, tree shrews, colugos). These groupings are geographical as well as genealogical, reflecting the break-up of Gondwana and Laurasia.

Crown mammals originated in the Jurassic; Mesozoic mammals were mostly small, but more diverse ecologically than was once thought (gliders, swimmers, burrowers). Placental orders diversified mostly around and after the end-Cretaceous extinction, though some molecular clocks put the earliest splits in the Cretaceous.

::: quiz
Which of the following groups are clades (monophyletic) in the current understanding of vertebrate phylogeny?
- [x] Amniota (reptiles including birds, and mammals)
- [ ] "Fishes" (all vertebrates except tetrapods)
- [x] Sarcopterygii including tetrapods
- [ ] "Reptiles" excluding birds
- [x] Cyclostomes (hagfishes and lampreys)
::: solution
Amniotes, sarcopterygians with tetrapods, and cyclostomes are clades: each contains an ancestor and all its descendants. "Fishes" without tetrapods and "reptiles" without birds leave out descendants of the group's common ancestor, and are paraphyletic. They remain useful descriptive words for grades.
:::
:::

## A dated tree of vertebrates

Divergence times are estimated with relaxed molecular clocks calibrated with fossils ([[evolution/phylogenetics#sec-dating]]). The **TimeTree** resource (Sudhir Kumar, Blair Hedges and colleagues; TimeTree 5, 2022) synthesises published estimates into median times. Rounded medians for divergences from the human lineage, together with the oldest fossils that constrain them (minimum ages), are:

| divergence of humans from | TimeTree median (Ma, rounded) | fossil minimum for the node |
|---|---|---|
| mouse (Euarchontoglires) | about 87 | — (placental fossils of the Late Cretaceous are debated) |
| chicken (amniote split: synapsids vs sauropsids) | about 319 | *Hylonomus* and contemporaries, about 318–315 Ma, are close to the split |
| frog (crown tetrapods) | about 352 | Early Carboniferous crown tetrapods, about 350–335 Ma |
| zebrafish (crown bony vertebrates) | about 429 | *Guiyu oneiros*, roughly 420 Ma |
| shark (crown jawed vertebrates) | about 462 | Early Silurian chondrichthyan teeth (*Qianodus*), about 439 Ma |

Two patterns are typical. Molecular estimates are older than the oldest fossils, as they must be (a fossil is a minimum), and the gap is largest where early members of a clade were small or lived in poorly preserved environments. And the uncertainty of the molecular dates, often ±10–20 %, is larger than the rounding suggests.

## Scaling: metabolism and body size

Vertebrates span eight orders of magnitude in mass, from a 7 mm frog to a 150-tonne blue whale, and many of their properties scale with body mass as power laws. The most famous is metabolic rate.

::: proposition Kleiber's rule (an empirical regularity) {#prop-kleiber}
Across species of mammals and birds, the basal (resting) metabolic rate $B$ scales approximately as a power of body mass $M$,

$$
B \approx aM^{b},\qquad \log B = \log a + b\log M,
$$ {#eq-kleiber}

with an exponent $b$ close to $\tfrac34$ (Max Kleiber, 1932); for mammals Kleiber's own fit was $B \approx 70M^{0.75}$ kcal per day, with $M$ in kilograms. Mass-specific metabolic rate therefore falls as $B/M \propto M^{-1/4}$. This is an observation from comparative data, not a law of nature: fitted exponents vary between 0.65 and 0.85 depending on the taxa, the temperature, the statistical method and how "basal" is defined, and whether there is a universal exponent, and why, is still debated.
:::

A simple argument predicts a different exponent. If heat loss limits metabolism, and animals are geometrically similar, then $B$ should scale with surface area, as $M^{2/3}$ (Max Rubner's surface law, 1883). Craig White and Roger Seymour (2003), correcting mammal data for body temperature and digestive state, found an exponent close to 2/3. Geoffrey West, James Brown and Brian Enquist (1997) derived 3/4 from a model of branching, space-filling supply networks (blood vessels); critics have disputed both the model's assumptions and the claim that a single exponent applies. What is not disputed is that metabolic rate rises much more slowly than mass, so small animals live faster: a mouse's heart beats about 600 times a minute, an elephant's about 30.

::: example Mice and elephants {#ex-kleiber}
Using $B = 70M^{0.75}$ kcal day⁻¹, compare a 30 g mouse with a 4,000 kg elephant: (a) total basal metabolic rate; (b) mass-specific rate; (c) how much food (at about 4 kcal per gram of dry food) each would need per day to cover basal metabolism alone.
::: solution
(a) Mouse: $70\times0.03^{0.75} = 70\times0.0721 = 5.0$ kcal day⁻¹. Elephant: $70\times4000^{0.75} = 70\times503 = 35{,}200$ kcal day⁻¹.

(b) Mouse: $5.0/0.03 = 168$ kcal kg⁻¹ day⁻¹. Elephant: $35{,}200/4000 = 8.8$ kcal kg⁻¹ day⁻¹. Per kilogram, the mouse burns energy about 19 times as fast, as predicted by $(M_\text{elephant}/M_\text{mouse})^{1/4} = (133{,}000)^{0.25} = 19.1$.

(c) Mouse: $5.0/4 = 1.3$ g of dry food a day, about 4 % of its body mass; elephant: $35{,}200/4 = 8.8$ kg a day, about 0.2 % (real intakes are several times higher, because field metabolic rates exceed basal ones and digestion is incomplete). This is why the smallest mammals and birds (shrews weighing 2 g, hummingbirds) must feed almost continuously, and why small endotherms often use torpor.
:::
:::

::: widget plot
f: log10(70) + b*x; log10(70) + 0.6667*x
x: -2.5, 4
y: -1, 7
sliders: b=0.75:0.5:1:0.01
points: -1.52, 0.70; 1.85, 3.23; 3.60, 4.55
labels: \log_{10}B,\ \text{exponent } b; \log_{10}B,\ \text{exponent } 2/3
caption: Kleiber's rule on log–log axes: $\log_{10}B = \log_{10}70 + b\log_{10}M$ ($B$ in kcal day⁻¹, $M$ in kg on the horizontal axis as $\log_{10}M$), against a surface-law line of slope 2/3 with the same value at 1 kg. The points are the formula's predictions at $b = 0.75$ for a mouse (30 g), a human (70 kg) and an elephant (4,000 kg), so they lie on the first line at its starting value. Move $b$: at $b = 1$ metabolism would be proportional to mass, and the elephant's predicted rate rises more than fortyfold. Over eight orders of magnitude, a difference between 2/3 and 3/4 in the exponent changes predictions by a factor of about four — which is why the exact exponent has been argued over.
:::

Other quantities scale too, often as quarter-powers of mass: lifespan and generation time roughly as $M^{1/4}$, heart rate as $M^{-1/4}$; skeleton mass slightly faster than body mass (about $M^{1.09}$ in mammals), so large animals carry proportionally heavier skeletons, as Galileo argued in 1638. Scaling relationships are used to predict the physiology of extinct animals and to compare species of different sizes ([[animal-physiology/energy-metabolism]]).

::: example A billion heartbeats {#ex-heartbeats}
A mouse's heart beats about 600 times a minute and it lives about 2.5 years in captivity; an elephant's beats about 30 times a minute over a life of about 65 years. (a) Compute the number of heartbeats in each lifetime. (b) Explain the result using the scaling exponents of heart rate and lifespan.
::: solution
(a) Mouse: $600\times60\times24\times365\times2.5 = 7.9\times10^8$. Elephant: $30\times60\times24\times365\times65 = 1.0\times10^9$.

(b) Heart rate scales roughly as $M^{-1/4}$ and lifespan as $M^{1/4}$, so their product, the number of beats per lifetime, scales as $M^0$: it is roughly the same, of order a billion, for mammals of very different sizes. This is an empirical pattern with many exceptions — humans (about $2.5\times10^9$ beats), bats and parrots live far longer than their size predicts — and it does not mean that hearts have a fixed number of beats; it reflects the fact that the pace of physiology as a whole slows with size.
:::
:::

::: application Vertebrates in decline
Vertebrate populations are monitored better than any other group, and the trends are sobering. About 41 % of assessed amphibian species, about a quarter of mammals and about one in eight birds are threatened with extinction on the IUCN Red List (2020s assessments). The Living Planet Index, which aggregates trends in tens of thousands of monitored vertebrate populations, has declined by an average of about 73 % since 1970 (WWF and Zoological Society of London, 2024), though the index is dominated by strongly declining populations and its interpretation is debated. Phylogeny helps to set conservation priorities: the EDGE approach ranks species by their evolutionary distinctiveness (how much unique branch length they represent on the tree) combined with their extinction risk, so that the tuatara, the platypus or the coelacanths count for more than one of many close relatives ([[conservation-biology]]).
:::

::: history
Aristotle distinguished "blooded" (vertebrate) from "bloodless" animals, and Lamarck (1801) separated vertebrates from invertebrates. Georges Cuvier founded comparative anatomy and vertebrate palaeontology; Richard Owen (1840s) defined homology with the vertebrate skeleton as his example. Darwin (1859) and Thomas Huxley (1863, 1868) placed humans among the primates and birds near dinosaurs. Alexander Kowalevsky (1866) showed that tunicate larvae have a notochord, linking them to vertebrates. Karl Reichert (1837) traced the mammalian ear bones to the jaw. The living coelacanth was recognised in 1938. Erik Jarvik's work on *Ichthyostega* (from the 1950s), Jennifer Clack's on *Acanthostega* (1987 onward) and the discovery of *Tiktaalik* (2004, published 2006) illuminated the origin of tetrapods; feathered dinosaurs from Liaoning (from 1996) settled the dinosaurian origin of birds. Molecular phylogenies brought Olfactores (2006) and the four placental superorders (2001).
:::

::: summary
- Chordates have a notochord, dorsal hollow nerve cord, pharyngeal slits, endostyle and post-anal tail; tunicates, not lancelets, are the sister group of vertebrates (Olfactores).
- Vertebrates have a cranium, vertebrae (except hagfishes), neural crest and placodes, and genomes duplicated twice (2R); the oldest are about 518 Ma.
- Cyclostomes (hagfishes, lampreys) are jawless; jaws evolved from pharyngeal arches, with placoderms as stem gnathostomes. Living jawed vertebrates are Chondrichthyes and Osteichthyes (ray-finned fishes; lobe-finned fishes and tetrapods).
- Neutral buoyancy requires a gas fraction $f \approx (\rho_t - \rho_w)/\rho_t$: about 5 % in sea water and 7 % in fresh water.
- Tetrapods evolved from Devonian lobe-finned fishes through *Tiktaalik* (375 Ma), *Acanthostega* and *Ichthyostega* (365 Ma); trackways of 395 Ma show that limbs arose earlier and in water.
- Amniotes (amnion, chorion, allantois, yolk sac) split into synapsids (mammals) and sauropsids (reptiles, including birds, which are theropod dinosaurs). Mammals have hair, milk, a dentary–squamosal jaw joint and three middle-ear bones derived from jaw bones.
- Dated divergences (TimeTree medians): human–mouse about 87 Ma, human–chicken about 319 Ma, human–zebrafish about 429 Ma; fossils give minimum ages.
- Kleiber's rule, $B \approx 70M^{0.75}$ kcal day⁻¹, is an empirical regularity; mass-specific rate falls as $M^{-1/4}$, and the exponent (3/4 or 2/3) is debated.
:::

## Exercises

::: exercise A human's basal metabolism {level=1 check="1694"}
Using $B = 70M^{0.75}$ kcal day⁻¹, estimate the basal metabolic rate of a 70 kg human, to the nearest kcal per day.
::: solution
$70^{0.75} = e^{0.75\ln 70} = e^{3.186} = 24.20$; $B = 70\times24.20 = 1{,}694$ kcal day⁻¹, close to measured values for adults (this is a comparative estimate, not a guide to individual energy needs).
:::
:::

::: exercise A freshwater swim bladder {level=1 check="6.5"}
A freshwater fish has tissue density 1.07 g cm⁻³. What percentage of its volume must its swim bladder occupy for neutral buoyancy, to one decimal place (neglect the density of the gas)?
::: solution
$f = (1.07 - 1.00)/1.07 = 0.0654$, that is 6.5 %.
:::
:::

::: exercise Placing animals {level=1}
For each animal, name the smallest group in this chapter's classification to which it and a human both belong: (a) a lamprey; (b) a shark; (c) a lungfish; (d) a frog; (e) a crocodile; (f) a kangaroo; (g) an elephant.
::: solution
(a) Vertebrata. (b) Gnathostomata. (c) Sarcopterygii. (d) Tetrapoda. (e) Amniota. (f) Theria (marsupials plus placentals) within Mammalia. (g) Placentalia (humans are Euarchontoglires, elephants Afrotheria).
:::
:::

::: exercise Mass-specific metabolism {level=2 check="19.1"}
By what factor is the mass-specific basal metabolic rate of a 30 g mouse greater than that of a 4,000 kg elephant if $B \propto M^{0.75}$? Give one decimal place.
::: solution
$(4000/0.03)^{0.25} = (1.333\times10^5)^{0.25} = 19.1$.
:::
:::

::: exercise Gas at depth {level=2 check="4"}
A marine fish neutrally buoyant at the surface descends to 30 m, where the absolute pressure is about 4 atm. Assuming the swim bladder must keep the same volume, by what factor must the number of moles of gas in it increase?
::: solution
At constant temperature and volume, $n \propto p$ (ideal gas law), so the gas must increase fourfold, from 1 to 4 atm.
:::
:::

::: exercise A ghost lineage {level=2 check="20"}
The Zachełmie trackways (about 395 Ma) record limbed tetrapods, while *Tiktaalik* (about 375 Ma), a member of the lineage from which tetrapods arose, is younger. How long, in millions of years, is the minimum "ghost lineage" — the unrecorded history of the *Tiktaalik* lineage implied by these dates? What does this imply about *Tiktaalik*'s status as an ancestor?
::: solution
The tetrapod lineage had split from the *Tiktaalik* lineage by at least 395 Ma, so the latter's lineage existed unrecorded for at least $395 - 375 = 20$ Myr. *Tiktaalik* is therefore not the ancestor of tetrapods but a late-surviving relative that retains many features of the ancestral condition — as is true of almost every "transitional fossil". Transitional forms are evidence about the sequence of character changes, not literal ancestors.
:::
:::

::: exercise Ear bones from jaws {level=2}
(a) Which bones form the jaw joint in a lizard, and which in a mammal? (b) Which mammalian ear bones are homologous with the lizard's jaw-joint bones? (c) Name two kinds of evidence for this homology.
::: solution
(a) In a lizard, the quadrate (skull) articulates with the articular (lower jaw); in a mammal, the squamosal articulates with the dentary. (b) The incus is the quadrate and the malleus the articular (the stapes is homologous with the columella, already an ear bone in reptiles). (c) Embryology: in mammalian embryos, the malleus and incus develop from the first pharyngeal arch at the back of the lower-jaw cartilage (Meckel's cartilage), in the position of the articular and quadrate, before moving into the ear (Reichert, 1837). Fossils: a series of cynodonts and early mammals shows the post-dentary bones shrinking, a dentary–squamosal joint appearing beside the old joint (in some forms both functioned at once), and early mammals with ear bones still connected to the jaw.
:::
:::

::: exercise Estimating an exponent {level=3 check="0.752"}
A 0.3 kg mammal has a basal metabolic rate of 28 kcal day⁻¹ and a 600 kg mammal one of 8,500 kcal day⁻¹. (a) Estimate the scaling exponent $b$ from these two species, to three decimal places. (b) Why would a comparative biologist not trust an exponent estimated from two species, or even from many species with ordinary least squares, without further analysis?
::: solution
(a) $b = \ln(8500/28)/\ln(600/0.3) = \ln 303.6/\ln 2000 = 5.716/7.601 = 0.752$.

(b) Two points determine any line; random variation in either species (body temperature, diet, measurement conditions) changes $b$ considerably. With many species, (1) species are not independent data points, because related species share traits by descent, so phylogenetic comparative methods (independent contrasts, phylogenetic generalised least squares) are needed; (2) both variables have error, so ordinary least squares on $\log M$ underestimates the slope (reduced major axis or measurement-error models can be used); (3) the relationship may curve on log–log axes, or differ between taxa and temperatures, making a single exponent misleading; and (4) "basal" conditions are hard to achieve for many species. The 2/3 versus 3/4 debate turned largely on such issues.
:::
:::

::: exercise Are birds reptiles? {level=3}
(a) Using the tree in this chapter, explain why, in a phylogenetic classification, birds are reptiles, dinosaurs, theropods and archosaurs. (b) A critic replies that birds are so different from crocodiles that grouping them is absurd, and that "Reptilia" should be defined by scales and ectothermy. Explain what kind of group the critic's Reptilia would be, and the cost of using it. (c) Why is the analogous case of "fish" and tetrapods even more striking?
::: solution
(a) A clade contains an ancestor and all its descendants. Birds descend from the common ancestor of crocodiles and lizards (so are reptiles), from the common ancestor of all dinosaurs (so are dinosaurs), and specifically from theropods, within archosaurs (with crocodiles). Excluding birds from any of these groups leaves out some descendants.
(b) The critic's Reptilia would be a paraphyletic grade defined by shared ancestral features (symplesiomorphies: scales, ectothermy), not by common ancestry alone. It cannot be used for inferences about relationships — for instance, it would wrongly suggest that crocodiles are closer to lizards than to birds, which is false for genes, anatomy and physiology (crocodiles and birds share a four-chambered heart, unidirectional airflow in the lungs and parental care). Grades are fine as descriptive terms, but they mislead when used as taxa.
(c) Tetrapods are nested deep within the bony fishes, inside Sarcopterygii: a coelacanth or lungfish is more closely related to a human than to a tuna. Any group "fishes" excluding tetrapods is paraphyletic, and the descendants left out (all tetrapods) are about half of vertebrate species.
:::
:::
