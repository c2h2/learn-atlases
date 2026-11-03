In 1856 Alfred Russel Wallace sailed from Bali to Lombok, two islands of the Malay Archipelago separated by a strait about 35 km wide. On Bali the birds were those of Java and the Asian mainland — barbets, woodpeckers, bulbuls. On Lombok, he noticed, many of these disappeared, and cockatoos, honeyeaters and other birds of Australian affinity took their place. The line he later drew between Bali and Lombok, and north between Borneo and Sulawesi, separates two great faunas that had evolved apart for tens of millions of years and met only recently. Wallace's line is a boundary in the distribution of life that no map of climate or vegetation would predict.

**Biogeography** studies the distribution of organisms over the surface of the Earth, and the related field of **macroecology** studies statistical patterns in the abundance, distribution and diversity of species at large scales. Both look for the processes behind the patterns, which act on two kinds of time scale: ecological processes — climate, dispersal, colonisation and extinction — operating over years to millennia, and historical ones — continental drift, speciation and the long-term movement of lineages — operating over millions of years. This chapter covers the largest ecological units, the **biomes**, and the historical division of the world into biogeographic realms; the **species–area relationship**, one of the few near-universal patterns in ecology; the **equilibrium theory of island biogeography**; and the **latitudinal gradient** in diversity. Earlier chapters supply the pieces: climate from [[ecology/organisms-environment]], primary production from [[ecology/ecosystem-energetics]], and community assembly from [[ecology/communities]]. The evolutionary history of lineages is treated in [[evolution/macroevolution]] and [[evolution/speciation]].

## Biomes

::: definition Biome {#def-biome}
A **biome** is a major type of terrestrial ecosystem recognised by the growth forms of its dominant vegetation — forest, grassland, shrubland, desert, tundra — and found wherever similar climatic conditions occur. Biomes are defined by structure and function, not by species: the deserts of North America and southern Africa belong to the same biome although their plants are largely unrelated.
:::

The distribution of biomes follows climate, especially mean annual temperature and precipitation. Robert Whittaker (1975) plotted the major biomes in a space with these two axes:

- **Tropical rain forest** — hot and wet all year (typically over about 2000 mm of rain); tall, evergreen, multi-layered forest with the highest species richness of any biome (Amazonia, the Congo basin, South-East Asia).
- **Tropical seasonal forest and savanna** — hot with a long dry season; deciduous forest, or grassland with scattered trees, maintained in many places by fire and large herbivores.
- **Hot desert** — low rainfall (often under 250 mm) and high evaporation, centred near 30° latitude under the descending air of the Hadley cells; succulents, drought-deciduous shrubs and ephemeral annuals.
- **Temperate grassland** — cold winters, hot summers and moderate rain falling mainly in summer (the prairies, steppes and pampas); deep, fertile soils.
- **Mediterranean shrubland** — mild wet winters and hot dry summers on the western sides of continents at 30–40° latitude (California, Chile, the Cape of South Africa, south-western Australia and the Mediterranean basin); evergreen, fire-adapted shrubs.
- **Temperate deciduous forest** — warm summers, cold winters and rain throughout the year; trees shed their leaves in winter.
- **Temperate rain forest** — mild and very wet (the Pacific north-west of North America, southern Chile, New Zealand); huge conifers or evergreen broadleaved trees.
- **Boreal forest (taiga)** — long, very cold winters and short summers; dominated by a few species of conifer, with acidic soils and slow decomposition.
- **Tundra** — too cold for trees; low shrubs, sedges, mosses and lichens over permafrost.

Two cautions apply. First, temperature and precipitation are not the whole story: seasonality, fire, soils and grazing decide, for example, whether a region with intermediate rainfall supports savanna or forest, and the same climate can support either in different places. Second, the boundaries between biomes are gradual, and much of the land surface has been converted to farmland, pasture and cities — sometimes treated as **anthromes**, human-shaped biomes.

The similarity of growth forms in similar climates on different continents is a striking example of **convergent evolution**. The stem-succulent cacti of the Americas and the succulent euphorbias of Africa look remarkably alike, though their flowers betray their distant relationship; the shrubs of the five Mediterranean-climate regions share small, tough, evergreen leaves.

### Biogeographic realms

Biomes reflect present climate; the identities of the species in them reflect history. Philip Sclater (1858, for birds) and Wallace (*The Geographical Distribution of Animals*, 1876) divided the world into **biogeographic realms** — the Palaearctic, Nearctic, Neotropical, Ethiopian (Afrotropical), Oriental (Indomalayan) and Australian — whose faunas are distinct because barriers of ocean, desert and mountain have kept them apart. A 2013 update by Ben Holt and colleagues, based on the distributions and phylogenetic relationships of over 21 000 species of amphibians, birds and mammals, recognised 11 realms, broadly confirming Wallace's scheme.

These differences are explained by the history of the continents. The theory of plate tectonics, accepted in the 1960s, showed that the southern continents formed the supercontinent **Gondwana** until it broke up during the Mesozoic, which explains why lungfishes, the southern beeches (*Nothofagus*), marsupials and ratite birds have distributions spanning continents now separated by oceans. A lineage may come to occupy separated areas either by **vicariance** (a once-continuous range is split by a new barrier, such as an opening ocean) or by **dispersal** across an existing barrier. Molecular dating has shown that both are important: many supposed vicariant patterns in fact date to dispersal events long after the continents separated, as with the arrival of monkeys and rodents in South America from Africa across the Atlantic.

## The species–area relationship

Larger areas contain more species. This is perhaps the oldest and best-supported generalisation in ecology, noted for plants by Hewett Watson in 1859 and quantified as a power law by Olof Arrhenius in 1921.

::: proposition The species–area relationship {#prop-sar}
Over a wide range of areas, the number of species $S$ found in an area $A$ is approximately

$$
S = cA^z ,
$$ {#eq-sar}

or, taking logarithms,

$$
\log S = \log c + z\log A ,
$$ {#eq-sar-log}

a straight line on log–log axes with slope $z$. Empirically, $z$ typically lies between about 0.2 and 0.35 for islands in an archipelago and is usually lower, about 0.1–0.2, for nested samples of increasing size within a continuous mainland region. This is an **empirical regularity**, not a law: the relationship is not always a power function (semi-logarithmic and sigmoid forms often fit as well or better), and $c$ and $z$ depend on the taxon, the region and the sampling design.
:::

Three processes contribute to the relationship. Larger areas contain more **habitats**, each with its own species. Larger areas hold larger **populations**, which are less likely to go extinct. And a larger area is a larger **sample** of individuals from the regional pool, so even a random placement of individuals would produce more species in larger areas. Distinguishing these is difficult; all probably operate.

A simple rule of thumb follows from [[#eq-sar]]. Multiplying the area by 10 multiplies the number of species by $10^z$; with $z = 0.3$ this is $10^{0.3} \approx 2$. Philip Darlington noted in 1957 that, for the reptiles and amphibians of the West Indies, a tenfold increase in island area roughly doubled the number of species.

::: example Darlington's rule {#ex-darlington}
If a tenfold increase in area doubles the number of species, what is $z$? How many times more species would you expect on an island 100 times larger than another, and on one 1000 times larger?
::: solution
From [[#eq-sar]], $S_2/S_1 = (A_2/A_1)^z$. With $A_2/A_1 = 10$ and $S_2/S_1 = 2$, $10^z = 2$, so $z = \log_{10}2 = 0.301$. For a 100-fold larger island, $100^{0.301} = 4.0$ times as many species; for a 1000-fold larger one, $1000^{0.301} = 8.0$. Each factor of ten in area doubles richness again: species number grows very slowly with area, which is why even very large areas hold a finite number of species and why small fragments still retain a substantial fraction of the species of a large region.
:::
:::

::: example Fitting a species–area curve {#ex-sar}
The numbers of species of reptiles and amphibians on seven islands of a (hypothetical) archipelago are:

| area (km²) | 3 | 25 | 120 | 800 | 4500 | 30 000 | 110 000 |
|---|---|---|---|---|---|---|---|
| species | 5 | 12 | 17 | 35 | 49 | 95 | 128 |

Estimate $z$ and $c$, and predict the number of species on an island of 10 000 km².
::: solution
Taking $\log_{10}$ of both variables and fitting a least-squares line [[#eq-sar-log]] (code below) gives slope $z = 0.303$ and intercept $\log_{10}c = 0.607$, so $c = 4.05$, with $R^2 = 0.99$. The prediction for 10 000 km² is

$$
S = 4.05\times10\,000^{0.303} = 4.05\times16.3 = 66\ \text{species}.
$$

With $z \approx 0.3$, these islands follow Darlington's rule: ten times the area, twice the species.
:::
:::

```python
import math

area    = [3, 25, 120, 800, 4500, 30000, 110000]   # island area, km^2
species = [5, 12, 17, 35, 49, 95, 128]             # species of reptiles and amphibians

x = [math.log10(a) for a in area]                  # log10 A
y = [math.log10(s) for s in species]               # log10 S
n = len(x)
mx, my = sum(x) / n, sum(y) / n
z = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y)) / sum((xi - mx) ** 2 for xi in x)
c = 10 ** (my - z * mx)                            # S = c * A^z
print(f"z = {z:.3f}, c = {c:.2f}")
print(f"predicted S for 10 000 km^2: {c * 10_000 ** z:.0f}")
# z = 0.303, c = 4.05
# predicted S for 10 000 km^2: 66
```

::: widget regression
points: 0.48,0.70; 1.40,1.08; 2.08,1.23; 2.90,1.54; 3.65,1.69; 4.48,1.98; 5.04,2.11
degree: 1
caption: The species–area data of [[#ex-sar]] on logarithmic axes: $\log_{10}$ of island area (km²) horizontally and $\log_{10}$ of the number of species vertically. The slope of the least-squares line is the exponent $z \approx 0.30$ and its intercept is $\log_{10} c \approx 0.61$. Drag the smallest island upwards — as if it lay close to a species-rich mainland — and notice how the slope flattens.
:::

::: application Species–area curves and habitat loss
If the species–area relationship describes how many species an area can hold, it should also predict how many will eventually be lost when habitat is destroyed. Reducing an area from $A$ to $A'$ reduces the expected number of species by the factor $(A'/A)^z$. With $z = 0.25$, losing 90 % of a habitat leaves $0.1^{0.25} = 0.56$ of its species: 44 % are eventually lost — far fewer than 90 %, but a great many. This reasoning underlies many estimates of extinction caused by deforestation. It must be used with care. Extinctions after habitat loss are not immediate: species may persist for decades in remnants too small to support them in the long run, an **extinction debt** to be paid later. The relationship for the whole area may not apply to the loss of a part of it, and some analyses (Fangliang He and Stephen Hubbell, 2011) have argued that using the ordinary species–area curve in reverse overestimates extinctions, whereas others find it underestimates them for species confined to the lost habitat. Habitat loss and fragmentation are treated in [[conservation-biology/fragmentation]].
:::

::: example Predicting extinctions and an extinction debt {#ex-debt}
A region has lost 80 % of its original forest over the past 50 years. It held 100 species of forest bird found nowhere else, and the species–area exponent for forest birds in the region is $z = 0.2$. How many of these species does the species–area relationship predict will eventually be lost? So far, 5 have gone extinct. What does this suggest?
::: solution
The remaining area is 20 % of the original, so the expected fraction of species retained is $0.2^{0.2} = 0.725$, and the expected loss is $100\times(1 - 0.725) = 27.5$, about 28 species. With only 5 extinctions so far, about 23 species may be "committed" to extinction but still present — an extinction debt — if the prediction is right. The figure is uncertain (the value of $z$, the assumption that the remaining forest is as good as the original, and the shape of the relationship all matter), but it signals that conservation action in the remaining forest, such as reconnecting fragments and restoring habitat, could still prevent extinctions that have not yet happened.
:::
:::

## The equilibrium theory of island biogeography

Why should islands have the numbers of species they do? Robert MacArthur and Edward Wilson proposed in 1963, and developed in their book *The Theory of Island Biogeography* (1967), that the number of species on an island reflects a **dynamic equilibrium** between the immigration of new species and the extinction of species already present.

Consider an island near a mainland that holds a pool of $P$ species capable of reaching it. When the island is empty, every arriving species is new, and the rate of immigration of new species is at its highest. As the island fills, more arrivals belong to species already present, and the immigration rate of *new* species falls, reaching zero when all $P$ species are present. Meanwhile, the more species are present, the more there are to go extinct, and each population is smaller as they share the island's resources, so the extinction rate rises with the number of species.

::: proposition The MacArthur–Wilson equilibrium {#prop-ibt}
Suppose that the rate of immigration of new species falls linearly with the number of species $S$ present, and the rate of extinction rises linearly:

$$
I(S) = I_0\left(1 - \frac{S}{P}\right), \qquad E(S) = E_0\,\frac{S}{P},
$$ {#eq-ibt-rates}

where $I_0$ is the immigration rate onto an empty island and $E_0$ the extinction rate when all $P$ species are present. Then

$$
\frac{dS}{dt} = I(S) - E(S)
$$ {#eq-ibt}

has a single, stable equilibrium

$$
\hat S = \frac{I_0}{I_0 + E_0}\,P ,
$$ {#eq-ibt-eq}

at which species continue to arrive and go extinct at the **turnover rate** $I(\hat S) = E(\hat S) = I_0E_0/(I_0 + E_0)$. An island approaches $\hat S$ exponentially with time constant $P/(I_0 + E_0)$. Because extinction rates are lower on **larger** islands (larger populations) and immigration rates higher on **nearer** islands, the model predicts more species on large and near islands than on small and distant ones.
:::

::: proof
Setting $I(S) = E(S)$: $I_0 - I_0S/P = E_0S/P$, so $S(I_0 + E_0)/P = I_0$, giving [[#eq-ibt-eq]]. The turnover rate is $E(\hat S) = E_0\hat S/P = I_0E_0/(I_0 + E_0)$. Writing [[#eq-ibt]] as

$$
\frac{dS}{dt} = I_0 - \frac{I_0 + E_0}{P}\,S
$$

shows that it has the form of the one-box model of [[ecology/nutrient-cycles#prop-box]], with input $I_0$ and turnover rate $k = (I_0 + E_0)/P$; it therefore approaches $\hat S = I_0/k$ exponentially with time constant $1/k = P/(I_0 + E_0)$, and the equilibrium is stable. Raising $E_0$ (smaller island) or lowering $I_0$ (more distant island) lowers $\hat S$.
:::

The linear rates are a simplification; MacArthur and Wilson drew the curves as concave, since the first species to arrive tend to be the best dispersers and the first to go extinct the rarest. The qualitative predictions do not depend on the exact shapes.

::: widget plot
f: I0*(1 - x/100); E0*x/100
x: 0, 100
y: 0, 6
sliders: I0=5:0.5:6:0.1; E0=2:0.5:6:0.1
labels: \text{immigration } I(S); \text{extinction } E(S)
caption: The MacArthur–Wilson model with a mainland pool of $P = 100$ species: the rates of immigration of new species and of extinction (species per year) against the number of species $S$ on the island. The curves cross at the equilibrium $\hat S$ — about 71 species with the defaults — and their height there is the turnover rate. Lower $I_0$ to represent a more distant island, or raise $E_0$ to represent a smaller one, and see the crossing move left.
:::

::: example Near and far, large and small {#ex-ibt}
A mainland pool holds $P = 100$ species of bird. A small island near the coast has $I_0 = 5$ species per year and $E_0 = 2$ species per year. (a) Find its equilibrium number of species and the turnover rate. (b) A small island far from the coast has $I_0 = 1$ and the same $E_0$; a large island near the coast has $I_0 = 5$ and $E_0 = 0.5$. Find their equilibria. (c) How long does it take the near small island to recover two-thirds of the way to equilibrium after a hurricane removes all its birds?
::: solution
(a) $\hat S = 5\times100/(5 + 2) = 71.4$ species. Turnover: $I_0E_0/(I_0 + E_0) = 10/7 = 1.43$ species per year — at equilibrium, roughly one or two species are lost and replaced every year.

(b) Far small island: $\hat S = 1\times100/3 = 33.3$. Near large island: $\hat S = 500/5.5 = 90.9$. Distance and size each change the equilibrium substantially.

(c) The time constant is $P/(I_0 + E_0) = 100/7 = 14.3$ years, the time to close $1 - e^{-1} = 63$ %, roughly two-thirds, of the gap. After a hurricane, the island needs a decade and a half to recover most of its species — and its new species list need not be the same as the old.
:::
:::

### Testing the theory

The most direct test was an experiment by Daniel Simberloff and Edward Wilson (1969) in the Florida Keys. They selected several small islands of red mangrove (each a single clump of trees, 11–25 m across), surveyed their arthropods, covered each island with a tent and fumigated it with methyl bromide to remove every arthropod, and then followed recolonisation. Within about a year, most islands had returned to roughly their original numbers of species, with the nearest island ending up with the most and the most distant with the fewest; but the species lists differed considerably from those before the fumigation, and species continued to arrive and disappear — as the equilibrium theory predicts, a stable number but a changing composition.

Natural experiments support the theory too. After the eruption of Krakatau in 1883 sterilised the remnants of the island, plants, birds and insects recolonised it over the following decades, and the numbers of resident bird species levelled off within a few decades while the identities of the species continued to change. The theory has been extended to "islands" of habitat on the mainland — mountaintops, lakes, patches of forest surrounded by farmland — with the important caveat that the "sea" around a habitat island is rarely completely hostile, so species can live in, move through and colonise from the surrounding matrix.

::: warning "The equilibrium theory explains all island faunas"
The theory assumes that islands are colonised from a mainland pool and that evolution on the island is negligible. On remote islands and archipelagos — Hawaii, the Galápagos, Madagascar — many species arose on the islands themselves by speciation, and the number of species reflects the history of colonisation and diversification over millions of years, not only an ecological balance. Newer theory, such as the "general dynamic model" of Robert Whittaker and colleagues (2008), adds speciation and the geological life cycle of volcanic islands. The equilibrium theory is a powerful first model, not the final explanation, and assuming that every island is at equilibrium is itself a hypothesis to test.
:::

::: quiz
According to the equilibrium theory, which island should have the most species?
- [ ] A small island far from the mainland
- [ ] A small island close to the mainland
- [ ] A large island far from the mainland
- [x] A large island close to the mainland
::: solution
Closeness raises the immigration curve and size lowers the extinction curve; both move the equilibrium [[#eq-ibt-eq]] to more species. A large island close to the mainland combines both advantages. The comparison between a small near island and a large far one depends on the relative strengths of the two effects.
:::
:::

## The latitudinal diversity gradient

Most groups of organisms are more diverse in the tropics than at high latitudes. A single hectare of lowland Amazonian rain forest can contain more than 250 species of tree, while a hectare of temperate forest in Europe or North America typically contains fewer than 20; there are more species of ant on a single tree in Peruvian rain forest than in some whole countries of northern Europe. The gradient holds for birds, mammals, amphibians, reptiles, fishes, most insects, plants and many marine groups, both on land and in the sea, though there are exceptions (some groups, such as aphids, sawflies and some seabirds, are richest at mid or high latitudes). It was described by Humboldt and Wallace, and it is one of the oldest unexplained patterns in biology.

Dozens of hypotheses have been proposed. They can be grouped by the process they invoke.

- **Area and time.** The tropics are the largest biome, and for much of the past 50 million years, when the Earth was warmer, tropical climates extended much further from the equator. Lineages have therefore had more area and more time in which to diversify in tropical climates. Because most clades originated in the tropics and many have not evolved tolerance of cold (**tropical niche conservatism**), relatively few have colonised high latitudes.
- **Energy and productivity.** More energy (solar radiation, warmth) and higher productivity may support more individuals and therefore more species, and higher temperatures may speed up metabolism, generation time and the rate of molecular evolution and speciation.
- **Diversification rates.** Speciation may be faster or extinction slower in the tropics. Phylogenetic and fossil analyses for several groups suggest higher net diversification rates in the tropics, though the evidence differs among groups and methods.
- **Climatic stability.** Tropical climates have been more stable through the glacial cycles of the past few million years, which repeatedly drove high-latitude species from much of their range.
- **Biotic interactions.** Intense pressure from specialist natural enemies, pathogens and competitors in the tropics may maintain diversity locally (the Janzen–Connell effect of [[ecology/competition]]) and promote speciation.

These are not mutually exclusive, and they operate at different scales: some explain why tropical regions accumulate more species over evolutionary time, others why more species can coexist in a tropical hectare. Most ecologists now think that history (area, time and niche conservatism) and diversification rates explain much of the regional gradient, and that local mechanisms modulate it; a synthesis by Gary Mittelbach and colleagues in 2007 emphasised the evolutionary explanations. Similar gradients in richness occur with elevation, often peaking at mid-elevations rather than at the foot of a mountain.

::: intuition Two ingredients: how many species a region produces, and how many a place can hold
The richness of any local community is limited from two sides. From above, by the regional pool — the species that have evolved in or reached the region over its history, which is where area, time and diversification rates act. From below, by the local processes of [[ecology/competition]] and [[ecology/predation-parasitism]], which decide how many of those species can coexist in a given place. The latitudinal gradient appears at both scales, and its explanation needs both.
:::

## Macroecology

**Macroecology**, a term introduced by James Brown and Brian Maurer in 1989, looks for statistical regularities across many species at large scales, often using data on the body sizes, ranges and abundances of whole faunas. Among its patterns:

- **Abundance and range size are positively related**: species that are locally abundant also tend to be widespread, and locally rare species tend to have small ranges. Several mechanisms, from niche breadth to sampling, can produce this.
- **Bergmann's rule** (1847): within groups of related endothermic animals, individuals tend to be larger in colder climates. It holds as a trend in many birds and mammals, perhaps because larger bodies have a smaller surface area relative to volume and lose heat more slowly, but it has many exceptions and other explanations (such as food availability) have been proposed.
- **Rapoport's rule**: range sizes tend to be larger at higher latitudes, at least in some groups of the Northern Hemisphere. Its generality has been questioned.
- **Scaling of abundance with body size**: across species, population density tends to decline with body mass; combined with metabolic scaling ([[ecology/ecosystem-energetics]]), this suggests that the energy used by populations varies less with body size than either quantity alone — an argument made by John Damuth in 1981, which remains debated.

::: application Designing reserves
The equilibrium theory was quickly applied to the design of nature reserves, which are islands of habitat in a sea of altered land. It suggested that reserves should be large (low extinction), close together or linked by corridors (high immigration), and compact. A long debate followed over whether a **single large or several small** reserves of the same total area (the "SLOSS" debate) would protect more species: several small reserves may hold more species in total if they sample different habitats, while a single large one better protects species that need large areas or are vulnerable at edges. The answer depends on the species and the landscape, and the question has given way to more detailed analyses of reserve networks, connectivity and the role of the surrounding landscape. These are the subject of [[conservation-biology/protected-areas]].
:::

::: history
Alexander von Humboldt's work on plant geography (1805–1807) related vegetation to climate along altitudinal and latitudinal gradients, and Augustin Pyramus de Candolle and Joseph Hooker developed botanical geography in the nineteenth century. Charles Darwin and Alfred Russel Wallace both used biogeography as key evidence for evolution; Wallace's *The Geographical Distribution of Animals* (1876) founded zoogeography and established the realms. Alfred Wegener's theory of continental drift (1912) was accepted, in the form of plate tectonics, only in the 1960s, transforming historical biogeography. Olof Arrhenius (1921) and Frank Preston (1962) described the species–area relationship quantitatively; MacArthur and Wilson's equilibrium theory (1963, 1967) and its test by Simberloff and Wilson (1969) made biogeography an experimental and theoretical science, and Brown and Maurer's macroecology (1989) brought large data sets to the study of continental patterns.
:::

## Where this leads

Biogeography links ecology to evolution and to conservation. The historical processes behind the realms and the diversification of lineages are covered in [[evolution/macroevolution]] and [[evolution/speciation]]; the effects of climate change on the distributions of species, and the use of species–area relationships and island theory in protecting biodiversity, are developed in [[conservation-biology/fragmentation]], [[conservation-biology/protected-areas]] and [[conservation-biology/invasions-climate]].

::: summary
- **Biomes** ([[#def-biome]]) are defined by vegetation structure and follow climate (temperature, precipitation, seasonality), modified by fire, soils and grazing; similar climates produce convergent growth forms.
- **Biogeographic realms** reflect history: plate tectonics, vicariance and dispersal. Wallace's line separates Asian and Australian faunas.
- The **species–area relationship** $S = cA^z$ ([[#prop-sar]]) is an empirical regularity with $z$ about 0.2–0.35 for islands and lower for mainland samples; a tenfold increase in area roughly doubles species when $z \approx 0.3$. It is used, with caution, to predict extinctions after habitat loss.
- **Island biogeography** ([[#prop-ibt]]): richness is a dynamic equilibrium $\hat S = I_0P/(I_0 + E_0)$ between immigration (higher on near islands) and extinction (lower on large islands), with continual turnover; tested by the defaunation of mangrove islands.
- The **latitudinal diversity gradient** has many proposed causes — area and time with tropical niche conservatism, energy, diversification rates, climatic stability and biotic interactions — acting at regional and local scales.
- **Macroecology** studies large-scale statistical patterns: abundance–range relationships, Bergmann's and Rapoport's rules, and the scaling of abundance with body size.
:::

## Exercises

::: exercise Doubling the area {level=1 check="2^0.3"}
For a species–area relationship with $z = 0.3$, by what factor does the number of species increase when the area doubles?
::: solution
$S_2/S_1 = 2^{0.3} = 1.23$: a 23 % increase.
:::
:::

::: exercise Area for twice the species {level=1 check="16"}
With $z = 0.25$, by what factor must the area increase to double the number of species?
::: solution
We need $k^{0.25} = 2$, so $k = 2^{1/0.25} = 2^4 = 16$.
:::
:::

::: exercise Equilibrium species number {level=1 check="60"}
An island receives new species at $I_0 = 3$ per year when empty, the extinction rate with the whole pool present is $E_0 = 2$ per year, and the pool holds $P = 100$ species. What is the equilibrium number of species?
::: solution
$\hat S = 3\times100/(3 + 2) = 60$.
:::
:::

::: exercise Habitat loss {level=1 check="1 - 0.5^0.3"}
A forest loses half its area. With $z = 0.3$, what fraction of its species is eventually expected to be lost?
::: solution
$1 - 0.5^{0.3} = 1 - 0.812 = 0.188$, about 19 %.
:::
:::

::: exercise Turnover at equilibrium {level=2}
For the island in the previous exercise, calculate the turnover rate at equilibrium and the time constant of approach to equilibrium. If the island lay twice as far from the mainland, halving $I_0$, how would the equilibrium, the turnover rate and the time constant change?
::: solution
Turnover: $I_0E_0/(I_0 + E_0) = 6/5 = 1.2$ species per year. Time constant: $P/(I_0 + E_0) = 100/5 = 20$ years.

With $I_0 = 1.5$: $\hat S = 150/3.5 = 42.9$; turnover $3/3.5 = 0.86$ species per year; time constant $100/3.5 = 28.6$ years. The more distant island has fewer species, slower turnover and takes longer to recover from disturbance.
:::
:::

::: exercise Biome or realm? {level=2}
The deserts of Arizona and of Namibia have similar climates and similar-looking vegetation, but almost no species in common. The forests of Japan and of New England share many genera of trees. (a) Explain these observations in terms of biomes and biogeographic realms. (b) Why do the forests of eastern Asia and eastern North America share so many genera?
::: solution
(a) Arizona and Namibia lie in the same biome (hot desert), defined by climate and growth form, so their plants have converged on similar forms (succulents, small leaves, spines). But they lie in different realms with separate evolutionary histories, so their species — and many of their families — differ. Japan and New England are both in the temperate deciduous forest biome *and* belong to the Holarctic region, whose floras were connected in the past.

(b) In the warmer climates of the early and middle Cenozoic, a broadly continuous temperate forest spread around the Northern Hemisphere, connected via land bridges across the Bering region and the North Atlantic. Later cooling and the glaciations fragmented it, leaving related genera (magnolias, tulip trees, hickories, sassafras) in the two regions with similar climates — a famous disjunction first emphasised by Asa Gray in the nineteenth century.
:::
:::

::: exercise Interpreting a defaunation experiment {level=2}
In a Simberloff–Wilson-type experiment, an island had 39 arthropod species before fumigation. Recolonisation gave 8, 20, 30, 36 and 38 species after 1, 3, 6, 9 and 12 months; but only 24 of the 38 species present after a year were among the original 39. (a) Does this support the equilibrium theory? (b) Estimate roughly the time constant of approach to equilibrium. (c) What alternative explanation of the return to 38 species would the low overlap in species composition help rule out?
::: solution
(a) Yes. The number of species returned close to its previous value, consistent with an equilibrium set by the island's size and distance, while the composition differed, consistent with continuing turnover and a dynamic (not fixed) equilibrium.

(b) The gap from 0 to about 39 species is 63 % closed (about 25 species) between 3 and 6 months — roughly 4 months, so the time constant is about 4 months, interpolating between the 3- and 6-month counts. (Fitting $S(t) = \hat S(1 - e^{-t/\tau})$ to all points would give a better estimate.)

(c) That each island holds a fixed set of species determined by its particular habitats, which simply re-establish themselves. If that were true, the same species would return. The different composition suggests that the number of species, not their identity, is what is regulated — as the theory predicts — though some compositional change could also reflect chance in the order of arrival.
:::
:::

::: exercise The latitudinal gradient {level=3}
A study finds that, among clades of birds, those originating in the tropics are still mostly tropical, and that the oldest clades in a region are mostly tropical. (a) Which hypothesis for the latitudinal gradient does this support, and why? (b) What additional evidence would show that diversification rates also differ between tropical and temperate regions? (c) Why might local experiments on species coexistence, however careful, fail to explain the regional gradient?
::: solution
(a) Tropical niche conservatism with the time-and-area hypothesis: lineages originating in the tropics have had a long time to diversify there, and few have evolved the cold tolerance needed to colonise high latitudes, so tropical regions accumulate more species. The pattern of old clades being tropical and young ones temperate fits this.

(b) Estimates of speciation and extinction rates from dated phylogenies (or the fossil record) for tropical and temperate lineages, showing higher net diversification in the tropics independently of the time available — for example, by comparing sister clades of similar age in the two zones.

(c) The regional pool sets the number of species available; local coexistence mechanisms determine how many of them can live together in a small area. Experiments can show how many species a tropical hectare can hold, but not why the tropics produced so many species over millions of years — a question about speciation, extinction, dispersal and history that local experiments cannot address.
:::
:::

::: exercise A habitat island {level=3}
A nature reserve is a patch of forest of 1000 ha surrounded by farmland. Studies show $z = 0.25$ for forest birds in the region, and the original continuous forest of 100 000 ha held 120 species. (a) How many species does the species–area relationship predict for the reserve at equilibrium? (b) A survey finds 95 species in the reserve 20 years after it was isolated. Interpret this. (c) Suggest two management actions suggested by island biogeography theory and say which parameter each would change.
::: solution
(a) $S = 120\times(1000/100\,000)^{0.25} = 120\times0.01^{0.25} = 120\times0.316 = 38$ species.

(b) The reserve holds far more species than its equilibrium prediction, which suggests an **extinction debt**: many species are still present but in populations too small to persist, and are expected to disappear over time (alternatively, the farmland matrix may provide more habitat and connectivity than assumed, or the species–area relationship may overestimate losses; long-term monitoring would distinguish these).

(c) Connecting the reserve by corridors or stepping stones to other forest raises the immigration rate ($I_0$), rescuing declining populations; enlarging the reserve, or restoring forest around it, lowers the extinction rate ($E_0$). Making the surrounding land more hospitable (hedgerows, agroforestry) does both.
:::
:::
