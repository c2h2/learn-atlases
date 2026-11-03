On 1 September 1914 a passenger pigeon named Martha died in her cage at the Cincinnati Zoo. She was the last of her species. A century earlier, *Ectopistes migratorius* had probably been the most abundant bird in North America, with a population usually estimated at three to five billion; the ornithologist Alexander Wilson described a single migrating flock in 1810 that took hours to pass and that he reckoned at over two billion birds. Commercial netting and shooting for city markets, carried by the new railways and telegraph, and the clearance of the eastern hardwood forests on whose mast the flocks fed, brought the species from superabundance to nothing in about fifty years. Martha's date of death is known to the day. That is unusual: most extinctions happen unobserved, to species no one has named, and their dates must be inferred from the last time anyone saw them.

This chapter places modern extinctions in the context of the history of life. We define extinction and the rates at which it is measured, compare present rates with the **background rate** recorded by fossils and with the five **mass extinctions** of the Phanerozoic, describe how the **IUCN Red List** assesses the risk that a species will go extinct, and analyse the principal drivers — habitat loss, overexploitation, invasive species, pollution and climate change — and why some species are more vulnerable than others. The measures of biodiversity on which this all rests were introduced in [[conservation-biology/biodiversity]].

## Kinds of extinction

::: definition Extinction and related terms {#def-extinction}
- A species is **extinct** when its last individual has died. The IUCN Red List classifies a species as Extinct (EX) "when there is no reasonable doubt that the last individual has died", which in practice requires exhaustive surveys in the species' known and expected habitat over a time frame appropriate to its life cycle.
- **Extinct in the Wild** (EW): surviving only in cultivation, in captivity or as a naturalised population well outside its past range.
- **Local extinction** (**extirpation**): loss of a population or of a species from part of its range while it survives elsewhere.
- **Functional (ecological) extinction**: a species persists, but at densities too low to perform its ecological role — dispersing seeds, controlling prey, grazing reefs.
- **Committed to extinction** (**extinction debt**, [[ecology/biogeography]]): species still alive but whose populations are no longer viable after a change already made, so they are expected to disappear.
:::

Extinction is the fate of almost every species that has ever lived; well over 99 % of all species that have existed are extinct. What concerns conservation is not that species go extinct but the **rate** at which they are doing so now, and the cause.

### Proving a negative

Declaring a species extinct is difficult, because absence of evidence is not evidence of absence. The coelacanth, known only from fossils and thought to have died out with the dinosaurs, was caught off South Africa in 1938; the takahē, a flightless New Zealand rail last seen in 1898, was rediscovered in 1948; and the Lord Howe Island stick insect *Dryococelus australis*, believed exterminated by rats after 1918, was found in 2001 on Ball's Pyramid, a sea stack 23 km away. Such **Lazarus taxa** make biologists cautious. One way to make the judgement quantitative is to ask how surprising the recent run of non-sightings would be if the species still existed.

::: proposition A test for extinction from sightings (Solow, 1993) {#prop-solow}
Suppose a species is recorded $n$ times in an observation period $(0, T]$, at times $t_1 < t_2 < \dots < t_n$, and that while it survives, sightings occur as a Poisson process with a constant (unknown) rate. Under the null hypothesis that the species is still extant at $T$, the probability that the last sighting falls as early as $t_n$ or earlier is

$$
p = \left(\frac{t_n}{T}\right)^{n}.
$$ {#eq-solow}

A small $p$ is evidence that the species went extinct before $T$. The test assumes that search effort, and hence the sighting rate, was constant throughout; declining effort or a declining population both violate the assumption, the second making the test too lenient.
:::

::: proof
Conditional on the number of sightings $n$ in $(0, T]$, the times of the events of a homogeneous Poisson process are independently and uniformly distributed on $(0, T]$. The last of $n$ independent uniform times is at most $t$ exactly when all of them are, which has probability $(t/T)^n$. Setting $t = t_n$ gives [[#eq-solow]].
:::

::: example Has the frog gone? {#ex-solow}
A stream frog was recorded on 10 occasions between the start of systematic surveys in 1900 and 1960, the last record being in 1960. Surveys have continued at the same intensity to 2025 with no further record. (a) Calculate Solow's $p$. (b) What would $p$ be if there had been only 3 records in total, the last in 1960? (c) Why might the conclusion in (a) be too confident?
::: solution
Measure time from 1900, so $t_n = 60$ years and $T = 125$ years.

(a) $p = (60/125)^{10} = 0.48^{10} = 6.5\times10^{-4}$. If the frog had persisted with an unchanged sighting rate, a 65-year gap after ten sightings in 60 years would be very unlikely; the data support extinction.

(b) $p = 0.48^3 = 0.11$. With only three records the gap is unremarkable — a rarely seen species can easily go 65 years unrecorded.

(c) If the population had already been declining before 1960, sightings would have become rarer even while the frog survived, and the earlier records would make the post-1960 silence look more surprising than it should. Changes in survey methods or effort have similar effects. Extensions of the test allow for declining sighting rates and for uncertain records, and the IUCN combines such analyses with information on threats and the adequacy of surveys before listing a species as Extinct.
:::
:::

::: widget plot
f: if(x < tn, 1, (tn/x)^n)
x: 0, 200
y: 0, 1
sliders: n=10:1:30:1; tn=60:10:150:5
hlines: 0.05
labels: p = (t_n/T)^n
caption: Solow's test of [[#prop-solow]]: the $p$-value for "still extant" as the end of observation $T$ (horizontal axis, years from the start of records) moves beyond the last of $n$ sightings at $t_n$. The horizontal line marks $p = 0.05$. With many sightings the curve plunges soon after $t_n$; with few, decades of silence remain consistent with survival. Notice that doubling $n$ squares $p$.
:::

## Background rates and the fossil record

Fossil species have finite durations: they appear, persist and disappear. For marine invertebrates with good fossil records, typical species durations are of the order of 1–10 million years; for mammals, closer to 1–2 million years. Conservation biologists convert such durations into a common unit.

::: definition Extinction rate in E/MSY {#def-emsy}
The extinction rate of a group is expressed in **extinctions per million species-years** (E/MSY): the number of extinctions observed divided by the total time, in millions of years, summed over all species under observation. If species durations are exponentially distributed with mean $\tau$ million years, every species has a constant per-capita extinction rate $\mu = 1/\tau$ per million years, and a rate of 1 E/MSY corresponds to a mean species lifetime of 1 million years.
:::

Estimates of the **background rate**, the rate between mass extinctions, have generally been put at around 0.1–1 E/MSY. Jurriaan de Vos and colleagues (2015), using molecular phylogenies as well as fossils, suggested a typical value of about 0.1 E/MSY, at the low end. Over a short interval, extinctions under a constant rate are rare independent events, so their number follows a **Poisson distribution** with mean equal to rate times species-years ([[biostatistics/probability-distributions]]).

::: example Birds since 1500 {#ex-birds}
About 160 bird species are known to have gone extinct since 1500, among roughly 11 000 species. (a) Calculate the observed rate in E/MSY over the 525 years to 2025. (b) How many extinctions would be expected at a background rate of 1 E/MSY? (c) How improbable is the observed number under that background rate?
::: solution
(a) Species-years: $11\,000\times525 = 5.78\times10^6$, that is 5.78 million species-years. The rate is $160/5.78 = 28$ E/MSY.

(b) At 1 E/MSY the expected number is $\lambda = 5.8$ extinctions; at 0.1 E/MSY, 0.6.

(c) Under a Poisson distribution with mean 5.8, the probability of 160 or more events is dominated by its first term, $e^{-5.8}5.8^{160}/160! \approx 10^{-165}$. The observed number is not a chance fluctuation of the background: the modern rate for birds is roughly 30 times the higher background estimate and nearly 300 times the lower one. The true rate is higher still, because extinctions of species never described, or of species lost before 1500 (such as most of the island birds wiped out after human colonisation of the Pacific), are not counted, while the denominator includes species that may already be committed to extinction.
:::
:::

Calculations of this kind across groups led Stuart Pimm and colleagues (2014) to estimate current extinction rates of about 100 E/MSY — around 1000 times their background estimate — with future rates potentially higher, and Gerardo Ceballos and colleagues (2015), using deliberately conservative assumptions, to conclude that vertebrate extinctions since 1900 have run at up to 100 times the background rate. The precise multiplier depends on the background value chosen, but every analysis finds present rates far above it.

### The five mass extinctions

Five times in the past 450 million years, extinction rates rose so far above background that a large majority of species disappeared within a geologically brief interval. Anthony Barnosky and colleagues (2011) defined a **mass extinction** as the loss of more than about three-quarters of species in an interval of less than about 2 million years. Estimates of the losses are uncertain, especially for the oldest events, and vary between studies; those below are approximate.

| event | age (million years ago) | estimated species lost | leading explanation |
|---|---|---|---|
| End-Ordovician | ~445 | ~85 % | glaciation and falling sea level |
| Late Devonian | ~372 (a series of pulses) | ~75 % | ocean anoxia, perhaps linked to the spread of land plants |
| End-Permian | ~252 | ~80–95 % of marine species | Siberian Traps volcanism: warming, acidification, anoxia |
| End-Triassic | ~201 | ~75–80 % | volcanism of the Central Atlantic Magmatic Province |
| End-Cretaceous | ~66 | ~75 % | Chicxulub asteroid impact, with Deccan Traps volcanism |

The asteroid hypothesis for the end-Cretaceous event was proposed by Luis and Walter Alvarez and colleagues in 1980, from a layer enriched in iridium at the Cretaceous–Palaeogene boundary; the Chicxulub crater in Yucatán was identified as the impact site in 1991. Three features of mass extinctions matter for conservation. They were **selective**, killing some groups far more than others, so that the survivors were not simply the "fittest" in normal times. **Recovery took millions of years**: diversity took about 10 million years to recover after the end-Permian event. And they were driven by **rapid environmental change** — warming, acidification and deoxygenation of the oceans feature in several — whose modern analogues are being produced by human activity.

::: warning "We are already in the sixth mass extinction"
Present extinction *rates* are comparable with those during mass extinctions, but the cumulative *magnitude* is not: documented extinctions since 1500 amount to around 1–2 % of the species in well-assessed groups such as birds, mammals and amphibians, far from 75 %. What the evidence supports is that the present rate, if sustained, would produce a mass extinction: Barnosky and colleagues estimated that if all species currently classified as threatened were lost, the 75 % threshold could be reached in as little as a few centuries. Saying that a sixth mass extinction is *under way* is a statement about trajectory, not about losses already incurred — and the difference is the room left for conservation to act.
:::

### Extinctions caused by people before the modern era

Human-caused extinction is not new. During the late Pleistocene, between about 50 000 and 10 000 years ago, about two-thirds of the world's genera of large mammals (over 44 kg) disappeared — mammoths, giant ground sloths, glyptodonts, diprotodons and many more. The losses were greatest in Australia and the Americas and smallest in Africa, where large mammals had evolved alongside hominins, and their timing tracks the arrival of modern humans more closely than it tracks climate, though climate change probably contributed in several regions and the relative roles remain debated. On islands the evidence is clearer. The nine species of moa in New Zealand were extinct within about two centuries of Polynesian settlement around 1300 CE, and the colonisation of the Pacific islands by people and the rats that travelled with them eliminated many hundreds of species of flightless rails and other birds.

## Assessing extinction risk: the IUCN Red List

To prevent extinctions, we need to know which species are closest to them. Since 1964 the International Union for Conservation of Nature (IUCN) has compiled assessments of species' conservation status, and since 1994 these have used quantitative criteria (revised in 2001, version 3.1) so that assessments of a beetle and a whale are comparable.

::: definition IUCN Red List categories and criteria {#def-redlist}
A species is evaluated against five criteria and placed in the **highest category of threat for which it meets any criterion**. The categories are Extinct (EX), Extinct in the Wild (EW), the three **threatened** categories — Critically Endangered (CR), Endangered (EN) and Vulnerable (VU) — Near Threatened (NT), Least Concern (LC) and Data Deficient (DD). The main thresholds are:

| criterion | CR | EN | VU |
|---|---|---|---|
| **A** population reduction over 10 years or 3 generations (whichever is longer), where the causes may not have ceased (A2–A4) | ≥ 80 % | ≥ 50 % | ≥ 30 % |
| **B** geographic range: extent of occurrence (B1) | < 100 km² | < 5000 km² | < 20 000 km² |
| … or area of occupancy (B2), each also requiring two of: severe fragmentation or few locations (1, ≤ 5, ≤ 10), continuing decline, extreme fluctuations | < 10 km² | < 500 km² | < 2000 km² |
| **C** small population with continuing decline (mature individuals) | < 250 | < 2500 | < 10 000 |
| **D** very small population (mature individuals) | < 50 | < 250 | < 1000 |
| **E** quantitative analysis: probability of extinction | ≥ 50 % in 10 years or 3 generations | ≥ 20 % in 20 years or 5 generations | ≥ 10 % in 100 years |

For reductions whose causes are reversible, understood and have ceased (A1), the thresholds are higher (90, 70 and 50 %). Criterion E uses a population viability analysis ([[conservation-biology/small-populations]]); the time windows of criteria A and E are capped at 100 years.
:::

Using generation length rather than calendar years is deliberate: a 30 % decline in ten years means something very different for a mouse, which has lived through ten or more generations, and for an albatross, which has not completed one. The rules also require **precaution under uncertainty**: assessors use the best available estimates, give plausible ranges, and may list a species on inferred or projected declines.

::: example Classifying a tortoise {#ex-redlist}
A tortoise has a generation length of 25 years. Surveys estimated 12 000 mature individuals in 1950 and 2600 in 2025, and the decline, caused by collection for the pet trade and by habitat loss, continues. Its extent of occurrence is 4000 km², it is known from four locations, and its habitat is still declining in quality. Classify it.
::: solution
**Criterion A.** Three generations is 75 years, exactly 1950–2025. The reduction is $(12\,000 - 2600)/12\,000 = 78$ %. The causes have not ceased, so the A2 thresholds apply: 78 % is at least 50 % but less than 80 %, so the species qualifies as **EN** under A2.

**Criterion B.** The extent of occurrence, 4000 km², is under 5000 km²; there are four locations (≤ 5) and a continuing decline in habitat quality, so two of the subconditions are met: **EN** under B1ab.

**Criterion C.** 2600 mature individuals is over the EN threshold of 2500, so C gives at most **VU**. **Criterion D** does not apply (more than 1000 individuals). No quantitative analysis is available for E.

The highest category met by any criterion is Endangered: the tortoise is listed as **EN A2; B1ab**. If the next survey found the reduction over 75 years had reached 80 %, it would move to CR under criterion A.
:::
:::

### What the Red List shows

As of version 2024-2 of the Red List (October 2024), 166 061 species had been assessed, of which 46 337 — 28 % — were in a threatened category; each update adds assessments, and these totals have continued to grow since (consult the current version at iucnredlist.org). Coverage is very uneven: almost all known mammals, birds, amphibians and reef-building corals have been assessed, but only a small fraction of the world's insects, fungi or plants. Among comprehensively assessed groups, the proportions threatened in assessments of 2021–2024 were roughly: birds 11–12 %, mammals about 26 %, sharks and rays about 37 %, amphibians about 41 % and reef-building corals about 44 %, with cycads, at around 70 %, among the most threatened groups of all. More than 900 species are listed as Extinct since 1500. Because the threatened fraction of a poorly sampled group cannot be taken from the species assessed so far (assessors tend to target species already of concern), estimates for all life — such as the IPBES (2019) figure of about one million animal and plant species threatened with extinction, out of an estimated eight million — use extrapolations from well-assessed groups and carry wide uncertainty.

A different indicator, the **Living Planet Index** of WWF and the Zoological Society of London, follows trends in monitored vertebrate *populations*. Its 2024 report found an average decline of 73 % across about 35 000 populations of 5495 species between 1970 and 2020. This is a geometric mean of relative changes in population size, not a statement that 73 % of all vertebrate animals have disappeared: a few populations collapsing to near zero can dominate the average, and the populations monitored are not a random sample.

::: quiz
A species of seabird has a generation length of 20 years. Its population fell from 50 000 to 30 000 mature individuals between 1965 and 2025, and the cause (bycatch in longline fisheries) continues. Under criterion A alone, what is its category?
- [ ] Least Concern, because 30 000 is a large population
- [x] Vulnerable
- [ ] Endangered
- [ ] It cannot be assessed until 100 years of data are available
::: solution
Three generations is 60 years (1965–2025). The reduction is $(50\,000 - 30\,000)/50\,000 = 40$ %, at least 30 % but under 50 %, giving VU under A2. Population size is irrelevant to criterion A, which measures the rate of decline; the species could also be assessed under other criteria, and the highest category met applies.
:::
:::

## The drivers of extinction

E. O. Wilson summarised the threats to biodiversity with the acronym **HIPPO**: Habitat destruction, Invasive species, Pollution, human Population and Overexploitation. Climate change has since joined the list as a driver in its own right. The IPBES Global Assessment (2019) ranked the **direct drivers** of biodiversity loss, globally, as (1) changes in land and sea use, (2) direct exploitation of organisms, (3) climate change, (4) pollution and (5) invasive alien species, all of them in turn driven by **indirect drivers** — the growth of human population and consumption, trade, technology and governance. Sean Maxwell and colleagues (2016) analysed the threats recorded for 8688 threatened or near-threatened species on the Red List and found overexploitation affecting 72 % of them and agricultural activity 62 %, while climate change was recorded for 19 % — not because climate is unimportant but because its effects, so far, are smaller than those of "guns, nets and bulldozers", and are expected to grow.

### Habitat loss and degradation

Most species are threatened above all by the conversion of the places they live. Agriculture occupies more than a third of the Earth's land surface, and IPBES estimated that about three-quarters of the land surface had been significantly altered by human activity and over 85 % of the area of wetlands present in 1700 had been lost by 2000. The FAO's Global Forest Resources Assessment 2020 estimated net deforestation of about 10 million hectares a year in 2015–2020, down from 16 million hectares a year in the 1990s, most of it in the tropics, where forests hold the greatest share of terrestrial species. The species–area relationship gives a first estimate of the consequences ([[ecology/biogeography]]): if an area is reduced to a fraction $1 - x$ of its original extent, the expected fraction of its species eventually lost is

$$
1 - (1 - x)^z ,
$$ {#eq-sar-loss}

with $z$ typically 0.15–0.35. Losing half of a habitat therefore costs, eventually, around 10–20 % of its endemic species; losing 90 % costs 40–55 %. Most of the damage comes at the end, when the last fragments are destroyed. Loss is compounded by **degradation** — logging, fire, grazing, drainage — and by **fragmentation** of what remains, the subject of [[conservation-biology/fragmentation]].

::: widget plot
f: 1 - (1 - x)^z; x
x: 0, 1
y: 0, 1
sliders: z=0.25:0.1:0.5:0.01
labels: \text{fraction of species lost}; \text{fraction of habitat lost}
caption: The species–area prediction [[#eq-sar-loss]]: the fraction of a region's endemic species eventually lost (vertical) against the fraction of its habitat destroyed (horizontal). The straight line is the fraction of habitat lost, for comparison. The curve stays low until most of the habitat has gone and then rises steeply — the last tenth of a habitat carries a disproportionate share of its species. Change $z$ to see the effect of stronger or weaker species turnover.
:::

### Overexploitation

Hunting, fishing, logging and collecting have caused many of the best-documented extinctions. Steller's sea cow, a giant relative of dugongs described by Georg Steller in 1741 in the Commander Islands, was hunted for meat by fur traders and extinct by 1768. The great auk, a flightless seabird of the North Atlantic, was killed for food, feathers and oil; the last confirmed pair was killed on the island of Eldey off Iceland in 1844. In the oceans, Nathan Pacoureau and colleagues (2021) estimated that the global abundance of oceanic sharks and rays had fallen by 71 % since 1970, driven by an 18-fold increase in fishing pressure. Today's commercial trade in wildlife — pangolin scales, ivory, rhino horn, songbirds, timber, ornamental fishes and orchids — is regulated by CITES ([[conservation-biology/people-and-policy]]) but remains a leading threat for many species.

Why are slow-breeding species so vulnerable? A population with intrinsic rate of increase $r$ ([[ecology/population-growth]]) can sustain, at low density, a proportional harvest of at most $r$ per unit time; any higher rate $h$ makes it decline exponentially at rate $h - r$. Large animals have low $r$ — a few per cent per year for whales, elephants or albatrosses — so harvest rates that would be trivial for a rabbit or a sardine drive them down.

::: example Harvesting a slow-breeding species {#ex-harvest}
A population of a large seabird has a maximum intrinsic rate of increase $r = 0.04$ per year. Hunters take 6 % of the population each year. Assuming exponential dynamics at low density, how long does it take the population to halve, and to fall by 90 %? What harvest rate would be sustainable at low density for a species with $r = 0.8$ per year?
::: solution
Net rate of change: $r - h = 0.04 - 0.06 = -0.02$ per year. The population falls as $N(t) = N_0e^{-0.02t}$; it halves in $\ln2/0.02 = 34.7$ years and falls by 90 % in $\ln10/0.02 = 115$ years.

For $r = 0.8$ per year, any proportional harvest below 80 % per year would leave a positive growth rate at low density (with density dependence the sustainable yield is lower — see [[conservation-biology/people-and-policy]]).

A decline of 2 % a year is barely detectable from year to year in noisy counts, yet it would move the seabird into a threatened category within a few generations (a 30 % decline takes $\ln(1/0.7)/0.02 = 18$ years). The same hunting pressure would be harmless for a fast-breeding species, which is why exploitation selectively removes large, slow-reproducing animals.
:::
:::

### Invasive species

Species introduced by people beyond their native ranges are, after habitat loss and exploitation, one of the main causes of documented extinctions — and the leading cause on islands. The IPBES assessment of invasive alien species (2023) found that invasive species had contributed to 60 % of the global animal and plant extinctions it recorded and were the sole driver in 16 %. The brown tree snake *Boiga irregularis*, accidentally introduced to Guam from New Guinea around the end of the Second World War, eliminated most of the island's native forest birds within four decades. The Nile perch, introduced into Lake Victoria in the 1950s, contributed to the disappearance of perhaps two hundred species of endemic haplochromine cichlid fish, together with eutrophication. Rats, cats and pigs have destroyed the seabird colonies and land birds of countless islands. Disease is a special case: the chytrid fungus *Batrachochytrium dendrobatidis*, spread around the world probably through the trade in amphibians, has been associated with the decline of hundreds of amphibian species (Ben Scheele and colleagues, 2019, attributed declines in at least 501 species and 90 presumed extinctions to the disease, though the magnitude of these figures has been debated). Invasions are treated in detail in [[conservation-biology/invasions-climate]].

### Pollution

Pollutants kill directly or by disrupting physiology. In the 1950s and 1960s, organochlorine pesticides such as DDT accumulated up food chains and caused eggshell thinning in birds of prey, which Derek Ratcliffe (1967) documented in peregrine falcons and sparrowhawks in Britain; populations of peregrines, ospreys and bald eagles recovered after the pesticides were banned in the 1970s. In South Asia, populations of three species of *Gyps* vulture fell by more than 95 % in the 1990s and 2000s; Lindsay Oaks and colleagues (2004) showed that the birds were dying of kidney failure after feeding on carcasses of livestock treated with the anti-inflammatory drug diclofenac. Veterinary use of the drug was banned in India, Pakistan and Nepal in 2006, and the declines slowed. Today, nitrogen deposition from fertilisers and combustion reduces plant diversity in nutrient-poor grasslands and heaths across Europe and North America, excess nutrients cause coastal "dead zones", and the effects of insecticides such as neonicotinoids on pollinators, of plastics on marine animals and of artificial light on nocturnal insects are active areas of research.

### Climate change

Climate change is so far a less frequent proximate cause of extinction than habitat loss or exploitation, but it is the driver expected to grow fastest. The Bramble Cay melomys, a rodent known only from a small coral cay in the Torres Strait, was declared extinct by the Queensland government in 2016 after repeated storm surges, driven by rising sea levels, inundated its habitat — the first mammal extinction attributed chiefly to anthropogenic climate change. The responses of species to a warming world, and the extinctions projected under different scenarios, are discussed in [[conservation-biology/invasions-climate]].

::: intuition Drivers act together
A single cause is seldom enough. Habitat loss shrinks a population; small populations are more exposed to hunting, disease and bad years; a warming climate pushes the remaining habitat uphill or poleward, where the land may already be farmed; an invasive predator arrives along a new road. Drivers interact **synergistically**, each making the others more damaging. Barry Brook, Navjot Sodhi and Corey Bradshaw (2008) reviewed many such synergies and argued that conservation must address several threats at once — protecting habitat does little for a species being hunted out of it.
:::

## Which species go extinct?

Extinction risk is not random across species. Comparative analyses — Andy Purvis and colleagues (2000) for mammals, and many studies since — consistently find that the species at greatest risk tend to have:

- **small geographic ranges**, especially island endemics or species restricted to single lakes or mountains;
- **large body size** and **slow life histories** (late maturity, few offspring, long generation times), giving low $r$ and slow recovery;
- **low population density** and **high trophic level**, as in large carnivores, which need large areas;
- **ecological specialisation** — dependence on one habitat, food, host or mutualist;
- **behaviour that exposes them**, such as colonial breeding or migration through bottlenecks, and lack of evolved defences against new predators (the tameness of island birds).

The importance of each trait depends on the threat: large body size predicts vulnerability to hunting, small range predicts vulnerability to habitat loss, and the two together are especially dangerous. These correlates are used to anticipate risk in species that have not yet been assessed.

Extinction can also cascade through ecological dependencies. **Coextinction** occurs when the loss of one species causes the loss of another that depends on it — host-specific parasites, pollinators and the plants that rely on them, or mutualistic fungi. Lian Pin Koh and colleagues (2004) estimated that thousands of affiliated species, many of them insects and parasites, might be committed to coextinction alongside the hosts listed as threatened. Coextinctions are hard to document: a louse named *Columbicola extinctus* because it was thought to have died with the passenger pigeon was later found living on band-tailed pigeons.

::: application Using the Red List in conservation
The Red List does not by itself set priorities: a Critically Endangered species may be impossible or very costly to save, while modest effort could secure several Vulnerable ones. It is nevertheless used by governments, development banks and businesses to screen projects for impacts on threatened species, by conservation organisations to target resources, and by the Convention on Biological Diversity through the **Red List Index**, which tracks the average change in category of all species in a group over time and is an indicator for the Kunming–Montreal targets ([[conservation-biology/people-and-policy]]). Genuine improvements in status are recorded as well as deteriorations: Friederike Bolam and colleagues (2021) estimated that conservation action had prevented between 21 and 32 bird and 7 and 16 mammal extinctions since 1993.
:::

::: history
The reality of extinction was established by Georges Cuvier, who showed in 1796 that the mammoth and the American mastodon were distinct from living elephants and had died out, and who argued for a series of catastrophes in Earth's history. Darwin treated extinction as the gradual counterpart of speciation. Norman Newell in the 1960s, and David Raup and Jack Sepkoski in a quantitative compilation of marine fossil families (1982), identified the five mass extinctions. The Alvarez impact hypothesis (1980) for the end-Cretaceous event showed that mass extinctions could have sudden external causes. On the modern side, the IUCN's Red Data Books, begun in the 1960s, became the Red List with quantitative criteria devised largely by Georgina Mace and Russell Lande (1991) and adopted in 1994. Global syntheses — the Millennium Ecosystem Assessment (2005) and the IPBES Global Assessment (2019) — set the modern extinction rate against the background and ranked its drivers.
:::

## Where this leads

Extinction is ultimately a population process: a species disappears when its last population does. Most of the drivers in this chapter act by making populations smaller and more isolated, and small populations face hazards of their own — chance variation in births, deaths and environments, and the loss of genetic variation. The next three chapters analyse these hazards: [[conservation-biology/small-populations]], [[conservation-biology/conservation-genetics]] and [[conservation-biology/fragmentation]].

::: summary
- Extinction may be global, in the wild, local, or functional; species may be **committed** to extinction before they disappear ([[#def-extinction]]). Declaring extinction needs care; Solow's test $p = (t_n/T)^n$ quantifies a gap in sightings ([[#prop-solow]]).
- Rates are measured in **E/MSY** ([[#def-emsy]]); background rates are about 0.1–1 E/MSY. Documented bird extinctions since 1500 imply about 28 E/MSY, tens to hundreds of times background ([[#ex-birds]]).
- The **Big Five** mass extinctions each removed about 75 % or more of species, were selective, were linked to rapid environmental change, and were followed by millions of years of recovery. The present **rate** is comparable; the cumulative **magnitude** is not yet.
- The **IUCN Red List** ([[#def-redlist]]) places species in the highest category met under criteria of decline (A), range (B), small declining population (C), very small population (D) or quantitative risk (E). As of version 2024-2, 46 337 of 166 061 assessed species were threatened.
- The main **drivers** are land- and sea-use change, direct exploitation, climate change, pollution and invasive species; they act synergistically. Slow-breeding species cannot withstand harvest rates above their low $r$ ([[#ex-harvest]]).
- Extinction-prone species tend to have small ranges, large bodies, slow life histories, low densities, high trophic levels and specialised requirements.
:::

## Exercises

::: exercise Rates in E/MSY {level=1 check="10"}
A group of 2000 species of freshwater fish has lost 3 species in the past 150 years. What is the observed extinction rate in E/MSY?
::: solution
Species-years: $2000\times150 = 3\times10^5 = 0.3$ million species-years. Rate: $3/0.3 = 10$ E/MSY, ten to a hundred times the background estimates.
:::
:::

::: exercise Habitat loss and species {level=1 check="1 - 0.3^0.25"}
A region has lost 70 % of its native forest. With $z = 0.25$, what fraction of its forest-endemic species does [[#eq-sar-loss]] predict will eventually be lost?
::: solution
$1 - 0.3^{0.25} = 1 - 0.740 = 0.260$, about 26 %.
:::
:::

::: exercise Solow's test {level=1}
An orchid was recorded 5 times between 1950 and 1990 (the last in 1990), with surveys continuing at a steady rate until 2025. Taking 1950 as the start of observation, calculate $p$. Would you list it as Extinct on this basis?
::: solution
$t_n = 40$, $T = 75$: $p = (40/75)^5 = 0.533^5 = 0.043$. This is below 0.05, but only just, the number of records is small and the assumption of constant effort may not hold. A $p$-value of this size is grounds for targeted surveys, not for declaring extinction; the IUCN would require exhaustive searches of suitable habitat at the right season (orchids may persist for years as underground tubers without flowering).
:::
:::

::: exercise Red List criterion A {level=2}
A freshwater turtle has a generation length of 15 years. Counts at nesting beaches were 8000 nesting females in 1980 and 3500 in 2025; the decline is due to egg collection, which continues. (a) Over what period should the decline be measured? (b) Estimate the reduction over that period, assuming exponential decline. (c) Classify the species under criterion A.
::: solution
(a) Three generations is 45 years, longer than 10 years, so the window is 45 years: 1980–2025.

(b) The reduction is $(8000 - 3500)/8000 = 56$ %; no extrapolation is needed because the data span exactly three generations. (The exponential rate is $\ln(3500/8000)/45 = -0.0184$ per year.)

(c) At least 50 % but less than 80 %, with a continuing cause: **EN** under A2.
:::
:::

::: exercise Interpreting the Living Planet Index {level=2}
A newspaper reports the Living Planet Index result as "wildlife numbers have fallen by 73 % since 1970". (a) Explain why this is a misreading. (b) Construct a small numerical example with three populations in which the geometric mean of relative changes falls by more than 70 % while the total number of animals rises. (c) What does the index nonetheless tell us?
::: solution
(a) The index is the geometric mean of relative changes across monitored populations, each weighted by a scheme that balances regions and taxa, not the change in the total number of individual animals. Large populations and small ones count equally, and a few steep declines pull the geometric mean down strongly.

(b) Population 1 grows from 10 000 to 11 000 (ratio 1.1); populations 2 and 3, each of 100 animals, fall to 1 animal (ratio 0.01). The geometric mean ratio is $(1.1\times0.01\times0.01)^{1/3} = (1.1\times10^{-4})^{1/3} = 0.048$, a 95 % "decline"; the total rose from 10 200 to 11 002.

(c) That declines are widespread and typical across monitored vertebrate populations, that many populations have fallen steeply, and how this differs among regions and habitats (freshwater and tropical populations show the largest average declines). It is an indicator of the state of populations, not a census of animals.
:::
:::

::: exercise Choosing the most threatened {level=2}
For each pair, say which species you would expect to be more vulnerable and to which driver, and why: (a) an albatross and a gull of similar range, both caught as bycatch on longlines; (b) a forest frog found on one mountain and a forest frog found across a lowland basin, both affected by clearance for agriculture; (c) a generalist and a specialist butterfly in a landscape where the specialist's host plant is declining.
::: solution
(a) The albatross: late maturity, one egg every one or two years and very low $r$ mean that the same bycatch rate causes a much faster decline and slower recovery than in the faster-breeding gull.

(b) The mountain endemic: its whole population can be removed by habitat loss in one place, and climate change will push its habitat uphill with nowhere to go; the lowland species has a larger range and population and can persist in remnants elsewhere.

(c) The specialist: it depends on one resource and declines with it (and its decline may be a coextinction if the host disappears), while the generalist can switch to other hosts.
:::
:::

::: exercise Background expectation {level=3}
Mammals number about 6400 living species. (a) At a background rate of 0.5 E/MSY, how many mammal extinctions would be expected between 1500 and 2025? (b) More than 80 mammal species are listed as Extinct since 1500. Using the Poisson distribution, explain why this number cannot be attributed to chance. (c) Give two reasons why the documented number is likely to *underestimate* the true number of mammal extinctions in this period, and one reason why a rate calculated from it might *overstate* the comparison with the fossil background.
::: solution
(a) Species-years: $6400\times525 = 3.36\times10^6$; expected extinctions $= 0.5\times3.36 = 1.7$.

(b) With a Poisson mean of 1.7, the probability of 80 or more extinctions is about $e^{-1.7}1.7^{80}/80! \approx 10^{-101}$ — effectively zero. The observed rate, about $80/3.36 = 24$ E/MSY, is roughly 50 times the assumed background.

(c) Underestimate: many small mammals (bats, rodents, shrews) of poorly surveyed tropical islands and forests may have gone extinct before being described or without anyone noticing, and the IUCN requires strong evidence before listing a species as Extinct, so many "possibly extinct" species are listed as Critically Endangered. Overstate: fossil durations are measured for morphospecies, often at genus level and over long time bins that smooth out short bursts, and short-lived or rare species are underrepresented in the fossil record, which biases background rates downwards; comparing a rate measured over centuries with one measured over millions of years is therefore not exactly like with like. (These biases are discussed in the papers cited; most analyses conclude that they cannot explain away the difference.)
:::
:::

::: exercise Multiple criteria {level=3}
A lizard is known from a single offshore island of 8 km², all of which it occupies. Its population is estimated at 900 mature individuals and is stable, but an invasive rat has recently been found on the island and, from experience on similar islands, is expected to cause a decline of 90 % within ten years unless eradicated. (a) Assess the lizard under criteria B, C, D and A. (b) What category results? (c) What management action does the assessment point to, and what would happen to its category if the action succeeded?
::: solution
(a) **B**: area of occupancy at most 8 km² (< 10 km²) and one location; but criterion B also requires a continuing decline or extreme fluctuations. A projected decline due to the rat counts as an inferred continuing decline, so B2ab qualifies as **CR**. **C**: 900 is under 2500 (EN) but not under 250, and with continuing decline gives **EN**. **D**: 900 < 1000 gives **VU** under D1; a single location under plausible threat also qualifies for VU D2. **A**: A3 allows a *projected* reduction over the next 10 years or 3 generations; a projected 90 % reduction is ≥ 80 %: **CR** under A3.

(b) The highest category met is **Critically Endangered** (A3; B2ab).

(c) Eradicate the rat, and prevent its return by biosecurity on boats visiting the island. Rat eradications on islands of this size are routine and usually successful. If the rat were eliminated and the threat removed, the projected decline would no longer apply, and the lizard would fall to **VU** under D1–D2 (small population and single location remain), which still marks it as vulnerable to any future introduction.
:::
:::
