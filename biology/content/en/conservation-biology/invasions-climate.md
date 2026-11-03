In June 1935, 101 cane toads (*Rhinella marina*) arrived in Queensland from Hawaii, where they had been introduced to eat beetle pests of sugar cane. Within months their offspring, some three thousand young toads, were released into the cane fields. They did not control the beetles. Instead they spread — slowly at first, at perhaps 10 km a year in the 1940s, then ever faster, until by the early 2000s the invasion front in the tropical north was advancing by more than 50 km a year. Benjamin Phillips and colleagues (2006) found the reason: toads at the front had longer legs than those in long-established populations, and moved further each night. The fastest dispersers inevitably end up at the front, where they breed with each other, so the invasion had been accelerating itself by a kind of evolution in space. The toads are highly toxic, and as the front reached each new area, populations of predators that tried to eat them — northern quolls, freshwater crocodiles, large goannas — crashed.

The cane toad shows both of this chapter's themes. **Biological invasions** move species to places they could never have reached alone; **climate change** moves the conditions that species are adapted to. In both cases species find themselves in the wrong place relative to their environment and to each other, and in both cases the outcome depends on population growth, dispersal and adaptation. We take invasions first — their stages, why some introduced species succeed, how fast they spread, what damage they do and how they can be managed — and then the responses of species and ecosystems to a changing climate. The extinctions these drivers cause were introduced in [[conservation-biology/extinction]].

## Biological invasions

::: definition Alien and invasive species {#def-invasive}
A species is **native** to a region if it arrived there without human assistance. An **alien** (non-native, introduced) species is one moved by human action, intentional or accidental, beyond the limits of its native range. An alien that forms self-sustaining populations is **established** (naturalised). An **invasive** alien species is one that spreads widely from its points of introduction and, in the usage of the Convention on Biological Diversity and IPBES, has negative impacts on biodiversity, ecosystem services or human well-being. Most alien species are not invasive.
:::

Tim Blackburn and colleagues (2011) unified earlier schemes into a sequence of **stages**, each a barrier that most species fail to cross:

1. **Transport**: a species is taken up and carried outside its native range — as a crop, pet, ornamental plant, game animal or biological control agent, or accidentally as a contaminant of goods, a stowaway in ballast water or packaging, or along a new canal or road.
2. **Introduction**: it is released or escapes into the wild.
3. **Establishment**: the founding population survives and reproduces to become self-sustaining.
4. **Spread**: it expands its range from the sites of introduction.

Impact can occur at any stage after introduction but is usually associated with established, spreading populations.

Mark Williamson and Alastair Fitter (1996) proposed the **tens rule**: roughly one in ten species passes each stage — one in ten imported species appears in the wild, one in ten of those becomes established, and one in ten of those becomes a pest. It is a rough empirical regularity, not a law. For vertebrates the proportions are much higher: Jonathan Jeschke and David Strayer (2005) found that about half of the vertebrates introduced between Europe and North America became established, and about half of those spread. Anything deliberately released in large numbers by people who want it to succeed — game animals, sport fish — beats the tens rule easily.

::: warning "Most introduced species are harmless, so introductions are a minor problem"
It is true that most aliens never establish or cause measurable harm; but the minority that do can be catastrophic and irreversible, and we cannot reliably predict which they will be. The IPBES assessment of invasive alien species (2023) estimated that more than 37 000 alien species had become established worldwide, more than 3500 of them recorded as harmful invasives, and that invasive species had played a role in 60 % of the recorded global extinctions of plants and animals and were the sole driver in 16 %. Its estimate of their annual cost to the global economy exceeded 423 billion US dollars in 2019, having roughly quadrupled every decade since 1970. A low per-species probability of harm, multiplied by an ever-increasing number of introductions, gives a large and growing problem.
:::

### Why do some introductions succeed?

**Propagule pressure** — the number of individuals released and the number of release events — is the most consistent predictor of establishment (Julie Lockwood, Phillip Cassey and Tim Blackburn, 2005). Records of bird introductions to New Zealand and Australia, for instance, show that species released in larger numbers more often established. The reason is the stochastic demography of small populations ([[conservation-biology/small-populations]]).

::: proposition Establishment and propagule pressure {#prop-propagule}
Suppose an introduced population grows as a linear birth–death process with per-capita birth rate $b$ and death rate $d < b$ in its new range. By [[conservation-biology/small-populations#prop-birthdeath]], the probability that a release of $N$ individuals establishes (avoids eventual extinction) is

$$
P_\mathrm{est}(N) = 1 - \left(\frac{d}{b}\right)^{N},
$$ {#eq-propagule}

which rises steeply with $N$ and saturates. If propagules arrive in $k$ independent release events of $N$ individuals each, the probability that at least one establishes is $1 - (d/b)^{kN}$. With an **Allee effect**, small releases succeed less often than this, and $P_\mathrm{est}$ becomes a sigmoid function of $N$.
:::

::: example How many founders? {#ex-propagule}
A songbird released into a new region has per-capita birth and death rates $b = 1.0$ and $d = 0.8$ per year in its new range. (a) What is the probability that a release of 3 birds establishes? Of 10? Of 20? (b) What do the results imply for biosecurity, and for reintroductions of threatened species?
::: solution
(a) $d/b = 0.8$. $P_\mathrm{est}(3) = 1 - 0.8^3 = 0.49$; $P_\mathrm{est}(10) = 1 - 0.8^{10} = 0.89$; $P_\mathrm{est}(20) = 1 - 0.8^{20} = 0.99$.

(b) Even a species well suited to its new range often fails to establish when only a few individuals arrive, so reducing the number and size of arrivals — inspecting cargo, treating ballast water, banning trade in high-risk species — lowers the risk of invasion substantially even if it cannot prevent every arrival. Conversely, a conservation reintroduction ([[conservation-biology/restoration]]) should release enough individuals, perhaps over several years, to make establishment likely; the same mathematics works for and against conservation.
:::
:::

::: widget plot
f: 1 - (m/b)^x; 1 - (m/b)^(2*x)
x: 0, 30
y: 0, 1
sliders: b=1:0.2:2:0.05; m=0.8:0.1:2:0.05
labels: \text{one release of } N; \text{two independent releases of } N
caption: The probability that an introduction establishes, [[#eq-propagule]], against the number of individuals released $N$, for birth rate $b$ and death rate $m$ (the $d$ of the text). The second curve shows two independent releases of the same size. Move $m$ close to $b$ — a species barely able to grow in its new range — and see how much propagule pressure is needed. If you set $m > b$ the formula no longer applies: no release can establish.
:::

Propagule pressure explains *how often* establishment occurs but not *which* species become dominant. Several hypotheses address that:

- **Enemy release**: invaders leave behind the specialist herbivores, parasites and pathogens of their native range (Richard Keane and Michael Crawley, 2002). Charles Mitchell and Alison Power (2003) found that 473 plant species naturalised in the United States had on average 84 % fewer fungal and 24 % fewer viral pathogen species in their new range than in Europe.
- **Novel weapons**: some invaders produce chemicals to which native competitors or enemies have not evolved tolerance; the suggestion that spotted knapweed (*Centaurea stoebe*) suppresses North American grasses with root exudates is a well-known and contested example.
- **Empty niches and naïve prey**: invaders may use resources no native uses, or prey on species without defences against them, as with mammalian predators on oceanic islands that had none, or the brown tree snake on Guam.
- **Disturbance and resource fluctuations**: Mark Davis and colleagues (2000) proposed that a community becomes more invasible whenever the supply of unused resources increases, through disturbance, nutrient enrichment or loss of native species.
- **Biotic resistance**: Charles Elton (1958) argued that species-rich communities resist invasion because they leave fewer resources unused. Small-scale experiments often support this, but at landscape scales rich regions also tend to have many invaders, because the same favourable conditions support both — the **invasion paradox**.

### How fast do invaders spread?

John Skellam (1951) analysed the spread of the muskrat (*Ondatra zibethicus*), which escaped from a few animals released near Prague in 1905 and spread across central Europe. He modelled the population as growing exponentially while individuals moved randomly, which leads to a **reaction–diffusion** equation.

::: proposition Fisher–Skellam spread {#prop-skellam}
Let $N(\mathbf x, t)$ be the population density at position $\mathbf x$ in a plane, growing exponentially at intrinsic rate $r$ and dispersing by random movement with diffusion coefficient $D$:

$$
\frac{\partial N}{\partial t} = D\left(\frac{\partial^2 N}{\partial x^2} + \frac{\partial^2 N}{\partial y^2}\right) + rN .
$$ {#eq-skellam}

A population released at a point expands as a circle whose radius, defined by any fixed detection threshold of density, eventually increases linearly in time at the asymptotic speed

$$
c = 2\sqrt{rD}.
$$ {#eq-speed}

The same speed holds for a travelling front of the logistic version, $\partial N/\partial t = D\nabla^2 N + rN(1 - N/K)$ (Ronald Fisher, 1937; Andrei Kolmogorov, Ivan Petrovsky and Nikolai Piskunov, 1937). The square root of the occupied area therefore increases linearly with time.
:::

::: proof
For a point release of $N_0$ individuals, the solution of [[#eq-skellam]] is a Gaussian spreading kernel multiplied by exponential growth:

$$
N(\mathbf x, t) = \frac{N_0}{4\pi Dt}\exp\!\left(rt - \frac{\lvert\mathbf x\rvert^2}{4Dt}\right),
$$

as can be checked by differentiation. The density equals a detection threshold $N_c$ at the radius $R(t)$ where $rt - R^2/(4Dt) = \ln\bigl(4\pi DtN_c/N_0\bigr)$, so

$$
R(t) = \sqrt{4rD\,t^2 - 4Dt\ln\bigl(4\pi DtN_c/N_0\bigr)} = 2\sqrt{rD}\,t\,\sqrt{1 - \frac{\ln\bigl(4\pi DtN_c/N_0\bigr)}{rt}}.
$$

As $t \to \infty$, the logarithmic term divided by $rt$ tends to zero, so $R(t)/t \to 2\sqrt{rD}$. (That the logistic equation has the same front speed requires a separate argument, because at the leading edge, where $N \ll K$, the logistic equation reduces to the linear one, which sets the speed.)
:::

::: example Fitting a spread rate {#ex-skellam}
An invasive plant was first found in a valley in year 0. The areas it occupied were mapped every five years and converted to the radius of a circle of the same area, $\sqrt{A/\pi}$:

| years since detection | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|
| equivalent radius (km) | 12 | 41 | 60 | 95 | 118 | 150 |

(a) Estimate the rate of spread. (b) If the plant's intrinsic rate of increase at low density is $r = 0.4$ per year, estimate its diffusion coefficient. (c) Why might the radius extrapolate to a negative value at year 0?
::: solution
(a) A least-squares line through the six points has slope 5.46 km per year and intercept −16.3 km, with $R^2 = 0.996$. The plant is spreading at about 5.5 km a year, and the linear increase of the radius supports the Skellam model.

(b) From [[#eq-speed]], $D = c^2/4r = 5.46^2/1.6 = 18.7$ km² per year.

(c) Spread usually begins slowly: in the first years the population is small and the front has not reached its asymptotic speed (the logarithmic correction in the proof), and populations may be held back by Allee effects or by a lag while they adapt to the new range. The early points therefore lie below the eventual straight line, and the line extrapolates to a negative radius at year 0. Such **lag phases** are common in invasions — and they are the window in which eradication is cheapest.
:::
:::

::: widget regression
points: 5,12; 10,41; 15,60; 20,95; 25,118; 30,150
degree: 1
caption: The spread data of [[#ex-skellam]]: equivalent radius of the invaded area (km) against years since detection. The slope of the least-squares line, about 5.5 km per year, estimates the speed $c = 2\sqrt{rD}$. Drag the last two points upwards to imitate an accelerating invasion — a fat-tailed dispersal kernel or the spatial sorting seen in cane toads — and notice that a straight line no longer fits.
:::

Many invasions spread faster than the diffusion model predicts, or accelerate. The reason is usually **long-distance dispersal**: if a small fraction of propagules travel much further than the rest (seeds carried by birds or vehicles, insects in shipments), new satellite populations ahead of the front coalesce and the invasion accelerates; Mark Kot, Mark Lewis and Pauline van den Driessche (1996) showed that dispersal kernels with "fat" tails give accelerating rather than constant speeds. Spatial sorting of dispersal ability, as in the cane toad, is another cause.

### Managing invasions

The cost and difficulty of management rise steeply through the stages of invasion, so the order of preference is:

1. **Prevention**: regulating trade in risky species (with risk assessments based on traits and invasion history elsewhere), treating ballast water, inspecting cargo and enforcing biosecurity at borders.
2. **Early detection and rapid response**: surveillance at likely points of entry, increasingly with environmental DNA ([[conservation-biology/conservation-genetics]]), followed by immediate eradication while populations are small.
3. **Eradication** of established populations, feasible mainly on islands and for populations in the lag phase. More than a thousand eradications of invasive rodents, cats, goats, pigs and other mammals from islands have been recorded, and the removal of rats from South Georgia, an island of 3900 km² in the South Atlantic, declared successful in 2018, was then the largest ever undertaken.
4. **Containment and control**: keeping populations below damaging levels by hunting, trapping, herbicides, physical removal or **biological control** with natural enemies from the invader's native range.

::: application Biological control: successes and disasters
Classical biological control introduces a specialist natural enemy of an invader. Its successes are spectacular: the moth *Cactoblastis cactorum*, released in Australia from 1926, destroyed most of the prickly pear (*Opuntia*) that had overrun some 24 million hectares of Queensland and New South Wales; and the parasitoid wasp *Anagyrus lopezi*, released in Africa from 1981, brought the cassava mealybug under control across the continent's cassava belt, a programme led by Hans Herren that protected the staple food of millions of people. The failures are equally instructive. The cane toad, the small Indian mongoose released on Caribbean and Pacific islands to control rats, and the predatory snail *Euglandina rosea* released in Hawaii and French Polynesia to control the giant African land snail all attacked native species instead; *Euglandina* drove dozens of endemic *Partula* tree snails to extinction. Modern programmes test candidate agents for host specificity before release — the generalist predators of the early twentieth century would not be approved today — and the rate of serious non-target effects of rigorously screened agents is low.
:::

::: example How many water samples? {#ex-edna}
A single 1-litre water sample from a pond containing an invasive crayfish yields its DNA with probability $p = 0.3$. (a) What is the probability of detecting it with 5 samples? (b) How many samples are needed for a 95 % chance of detection if it is present? (c) After 9 negative samples, can managers conclude it is absent?
::: solution
(a) Assuming independent samples, $P = 1 - (1 - 0.3)^5 = 1 - 0.168 = 0.83$.

(b) $1 - 0.7^k \ge 0.95$ requires $0.7^k \le 0.05$, so $k \ge \ln0.05/\ln0.7 = 8.4$: nine samples.

(c) Nine negatives would have only a 4 % chance of occurring if the crayfish were present at a density giving $p = 0.3$, so absence at that density is likely. But detection probability falls at low density — just when an early invasion matters most — so a very sparse population could be missed. Managers would report "not detected, with 95 % confidence of detection if present at densities giving $p \ge 0.3$", and repeat the survey. (A Bayesian analysis would combine this with the prior probability that the crayfish had arrived, as in [[conservation-biology/extinction#prop-solow]] for the reverse question.)
:::
:::

## Climate change

The Earth's climate has always changed, but the present change is unusually fast. The IPCC's Sixth Assessment Report (2021) estimated that global surface temperature in 2011–2020 was about 1.1 °C above the 1850–1900 average, and the World Meteorological Organization reported that 2024 was the first calendar year more than 1.5 °C above pre-industrial levels (about 1.55 °C). Warming is greater over land than over the ocean and greatest in the Arctic; it is accompanied by changes in rainfall, more frequent and intense heatwaves, droughts and fires, rising sea level, the loss of sea ice and glaciers, and, because the ocean absorbs about a quarter of emitted carbon dioxide, **ocean acidification**: surface ocean pH has fallen by about 0.1 since pre-industrial times, an increase of about 30 % in hydrogen-ion concentration ([[ecology/nutrient-cycles]]).

A species facing a changing climate has four options: **move** to track suitable conditions, **adjust** through phenotypic plasticity, **adapt** by evolution, or decline to extinction. All four are happening.

### Moving: range shifts

::: definition Velocity of climate change {#def-velocity}
The **velocity of climate change** at a place is the speed at which a species would have to move across the landscape to remain in constant temperature (or another climatic variable):

$$
v = \frac{dT/dt}{\lvert\nabla T\rvert},
$$ {#eq-velocity}

the rate of warming divided by the spatial gradient of temperature. Velocities are low in mountains, where temperature changes steeply over short distances, and high in flat lowlands, where a species may have to travel hundreds of kilometres to find the same climate. Scott Loarie and colleagues (2009) estimated a global mean velocity of about 0.42 km per year for the second half of the twenty-first century under a mid-range emissions scenario.
:::

::: example Uphill and poleward {#ex-velocity}
A region is warming at 0.3 °C per decade. (a) On a mountainside where temperature falls with altitude at 6.5 °C per km, how fast do isotherms move upslope? (b) On a plain where temperature falls with latitude by 0.6 °C per degree of latitude (111 km), how fast do they move poleward? (c) Meta-analysis has found average observed shifts of 11 m per decade upslope and 17 km per decade poleward. Compare.
::: solution
(a) $v = 0.3/6.5 = 0.046$ km per decade, that is 46 m per decade upslope.

(b) The gradient is $0.6/111 = 0.0054$ °C per km, so $v = 0.3/0.0054 = 56$ km per decade.

(c) Observed average shifts are about a quarter (upslope) to a third (poleward) of these values. Part of the difference reflects differing local warming rates and gradients, but much reflects **lags**: species are not keeping up with the climate, accumulating a "climatic debt". Lags arise from limited dispersal, fragmented habitat in the way ([[conservation-biology/fragmentation]]), long generation times, dependence on slower-moving species (trees, hosts) and the persistence of adults in places where they can no longer recruit.
:::
:::

The figures in part (c) come from I-Ching Chen and colleagues (2011), who found median shifts of 11.0 m per decade upwards and 16.9 km per decade towards the poles across more than a thousand species responses, with larger shifts in regions that had warmed more. Vincent Devictor and colleagues (2012) calculated that, over two decades, the bird and butterfly communities of Europe had shifted north by 37 and 114 km respectively, while temperature had shifted by 249 km, leaving them lagging by over 200 km for birds and 135 km for butterflies. Species at the tops of mountains, or at the poleward edges of continents and islands, have nowhere left to go. On the Cerro de Pantiacolla in Peru, Benjamin Freeman and colleagues (2018) found that the elevational ranges of birds had shifted upslope over a few decades and that several species near the summit had declined sharply — an "escalator to extinction".

### Adjusting and adapting

Many species have changed the timing of seasonal events — **phenology**. Camille Parmesan and Gary Yohe (2003) found an average advance of spring events (flowering, egg-laying, migration arrival) of 2.3 days per decade across hundreds of species. Because species respond to different cues — temperature, day length, snowmelt — their responses differ, and interacting species can become mismatched. In the Netherlands, the peak of caterpillars on oaks, the food of pied flycatcher (*Ficedula hypoleuca*) nestlings, advanced with warming springs, but the flycatchers, which time their return from West Africa partly by day length, advanced less. Christiaan Both and colleagues (2006) found that populations declined by about 90 % over two decades in the areas with the earliest caterpillar peaks, and much less where the peak was later.

Evolution is also occurring. William Bradshaw and Christina Holzapfel (2001) showed that the photoperiod at which pitcher-plant mosquitoes (*Wyeomyia smithii*) enter winter dormancy had evolved, over a few decades, to shorter day lengths in northern populations — a genetic response to longer growing seasons. In Finland, the brown morph of the tawny owl (*Strix aluco*), which survives less well than the grey morph in snowy winters, increased in frequency as winters became milder (Patrik Karell and colleagues, 2011). Such responses show that evolutionary adaptation can help, but the species most at risk — long-lived, slowly reproducing species with small populations — are those least able to adapt fast enough ([[conservation-biology/conservation-genetics]]).

::: quiz
A species of alpine plant has moved 30 m upslope in 40 years, while the isotherms on its mountain have moved 150 m. What is the most likely interpretation?
- [ ] The species is insensitive to temperature.
- [x] The species is lagging behind its climate, possibly because of slow dispersal and long-lived adults; it carries a climatic debt.
- [ ] The species has evolved complete tolerance of warmer temperatures.
- [ ] The isotherms are moving faster than physics allows.
::: solution
A shift in the right direction but much smaller than the climatic shift indicates a lag. Long-lived perennial plants can persist for decades where they can no longer recruit, and their seeds may disperse only metres per generation. Plasticity or adaptation might explain part of the difference, but complete tolerance would predict no shift at all; testing it requires measuring performance across elevations, for instance by transplant experiments.
:::
:::

### Ecosystems under stress

Some ecosystems are especially vulnerable because their dominant species live close to their thermal limits. Reef-building corals depend on symbiotic algae; when water temperatures stay more than about 1 °C above the usual summer maximum for weeks, the symbiosis breaks down and the corals **bleach**, often dying. Mass bleaching, unknown before the 1980s, has struck the Great Barrier Reef repeatedly since 1998, including back-to-back events in 2016 and 2017 that killed a large fraction of the shallow-water corals, especially on the northern reef, and further events in 2020, 2022, 2024 and 2025. NOAA declared a fourth global bleaching event in April 2024; by April 2025 bleaching-level heat stress had affected about 84 % of the world's reef area (NOAA Coral Reef Watch and the International Coral Reef Initiative, 2025). Other systems at risk include sea-ice ecosystems, high mountains, kelp forests in marine heatwaves, and forests subject to drought, fire and insect outbreaks favoured by warmer winters — such as the mountain pine beetle outbreak that killed pine trees over more than 18 million hectares of British Columbia from the late 1990s.

Climate and invasions interact: warming allows species introduced in cooler regions to establish and spread, and extreme events disturb native communities, opening them to invaders. Climate change also acts synergistically with habitat loss, as fragmented landscapes block the range shifts on which species depend.

### Projecting the future

**Species distribution models** (SDMs) relate the present occurrences of a species to environmental variables — temperature, rainfall, soils — and project where suitable conditions will lie under future climates. Correlative SDMs (such as those fitted with the maximum-entropy method MaxEnt) are easy to build from occurrence records and climate layers, and have been used for tens of thousands of species. Their assumptions are strong: that the species' present range is in equilibrium with climate, that its niche will not evolve, that it can (or cannot) disperse to newly suitable areas, and that biotic interactions do not limit it. Chris Thomas and colleagues (2004) used SDMs and species–area reasoning to suggest that 15–37 % of species in their sample of regions might be "committed to extinction" by 2050 under mid-range scenarios; the figures attracted much criticism of method. A meta-analysis of 131 studies by Mark Urban (2015) estimated that 7.9 % of species were predicted to be threatened with climate-related extinction on average, rising to about one in six species under a high-emissions scenario with about 4.3 °C of warming, with the highest risks in South America, Australia and New Zealand.

::: warning "A species distribution model predicts where a species will live"
An SDM predicts where the climate will resemble the climate a species occupies now. Whether the species will actually live there depends on whether it can get there (dispersal, barriers, habitat), whether it can establish (soils, competitors, mutualists, enemies), whether its niche is wider than its present range suggests (many ranges are limited by history or interactions, not climate) and whether it adapts. SDM projections are hypotheses about potential distributions, best combined with mechanistic models of physiology and demography and tested against observed range shifts.
:::

### Responding

Conservation responses to climate change include reducing other stresses so that populations are larger and more resilient; protecting **climatic refugia**, places where conditions will change least (cool valleys, north-facing slopes, upwelling zones); maintaining and restoring **connectivity** along climatic gradients so that species can move; and, where species cannot move by themselves, **assisted colonisation** (assisted migration), the deliberate movement of a species beyond its native range to places projected to become suitable. Stephen Willis and colleagues (2009) introduced two butterflies, the marbled white and the small skipper, to sites in northern England about 35 and 65 km beyond their range margins, where climate models predicted suitable conditions; both established and expanded. Assisted colonisation is controversial because it deliberately creates an alien population, with all the risks this chapter has described, and frameworks (Ove Hoegh-Guldberg and colleagues, 2008; the IUCN translocation guidelines, 2013) weigh the risk of extinction without the move against the probability of success and the risk of harm to the recipient ecosystem ([[conservation-biology/restoration]]). Ultimately, the scale of the threat depends on how much emissions are reduced ([[conservation-biology/people-and-policy]]).

::: intuition The same equations, run forwards and backwards
An invasion and a climate-driven range shift are the same process seen from opposite ends. An invader is a species whose environment suits it in a place it has just reached; a species under climate change is one whose environment is leaving the place it occupies. In both, the outcome is set by population growth at low density ($r$), dispersal ($D$, and the tail of the dispersal kernel) and adaptation. A high $2\sqrt{rD}$ is what makes an invader dangerous — and what a native species needs to keep pace with a moving climate.
:::

::: history
Charles Elton's *The Ecology of Invasions by Animals and Plants* (1958) founded invasion biology, arguing that the mixing of the world's biota by people was one of the great convulsions in the history of life. Skellam's analysis of the muskrat (1951), building on Fisher's wave of advance (1937), gave the field its central model of spread; the SCOPE programme of the 1980s, Williamson's *Biological Invasions* (1996) and the IPBES assessment (2023) synthesised the evidence. On the climate side, Svante Arrhenius estimated the warming from doubled carbon dioxide in 1896, and Charles David Keeling's measurements at Mauna Loa from 1958 showed its rise. Camille Parmesan's study of the northward and upward shift of Edith's checkerspot butterfly in western North America (1996) was among the first to attribute a range shift to climate change, and the global syntheses of Parmesan and Yohe (2003), Root and colleagues (2003) and Chen and colleagues (2011) showed the fingerprint of warming across thousands of species.
:::

## Where this leads

Prevention and protection are not enough where ecosystems are already degraded, invaded or shifting. The next chapter, [[conservation-biology/restoration]], examines how ecosystems can be restored and species returned to places they have lost — including the translocations that climate change may increasingly require.

::: summary
- **Alien** species are moved by people; **invasive** ones spread and cause harm ([[#def-invasive]]). Invasions pass through transport, introduction, establishment and spread; the **tens rule** is a rough regularity with many exceptions. As of the IPBES assessment (2023), more than 37 000 aliens were established worldwide, invasives contributed to 60 % of recorded extinctions, and costs exceeded 423 billion US dollars a year (2019).
- **Propagule pressure** predicts establishment: $P_\mathrm{est} = 1 - (d/b)^N$ in a birth–death model ([[#prop-propagule]]). Enemy release, novel weapons, naïve prey and resource fluctuations help explain dominance; biotic resistance acts locally.
- Spread follows **Fisher–Skellam** dynamics with speed $c = 2\sqrt{rD}$ ([[#prop-skellam]]): the equivalent radius grows linearly after a lag. Long-distance dispersal and spatial sorting accelerate invasions.
- Management is cheapest at the earliest stage: prevention, early detection (eDNA), eradication (especially on islands), then control; screened biological control can succeed, unscreened generalists have caused extinctions.
- Climate is changing fast (about 1.1 °C in 2011–2020, IPCC; 2024 about 1.55 °C, WMO). Species are shifting ranges (median 11 m and 17 km per decade) but lagging the **velocity of climate change** ([[#def-velocity]]), shifting **phenology** (2.3 days per decade), becoming mismatched and, in some cases, adapting.
- Corals and other thermally limited systems are already suffering mass mortality. **SDMs** project potential, not realised, distributions. Responses: reduce other stresses, protect refugia, restore connectivity, and consider assisted colonisation with care.
:::

## Exercises

::: exercise Spread speed {level=1 check="2*sqrt(0.5*50)"}
An invader has intrinsic rate of increase $r = 0.5$ per year and diffusion coefficient $D = 50$ km² per year. What is its asymptotic rate of spread in km per year?
::: solution
$c = 2\sqrt{0.5\times50} = 2\sqrt{25} = 10$ km per year.
:::
:::

::: exercise Establishment {level=1 check="1 - 0.9^5"}
A fish introduced to a lake has $b = 1.0$ and $d = 0.9$ per year. What is the probability that a release of 5 fish establishes?
::: solution
$1 - 0.9^5 = 1 - 0.590 = 0.41$.
:::
:::

::: exercise Velocity of climate change {level=1 check="0.2/5"}
A mountain region warms at 0.2 °C per decade and its lapse rate is 5 °C per km. How fast, in km per decade, do isotherms move upslope?
::: solution
$v = 0.2/5 = 0.04$ km per decade, that is 40 m per decade.
:::
:::

::: exercise The tens rule {level=2}
A country imports 2000 species of ornamental plant. (a) Using the tens rule, how many would you expect to become pests? (b) Why might the actual number differ? (c) The government can afford to screen 200 species in detail. How should it choose which?
::: solution
(a) $2000\times0.1\times0.1\times0.1 = 2$ pests (and 20 established, 200 in the wild).

(b) The rule is a rough average with wide variation: plants with traits associated with invasiveness (fast growth, many small seeds, vegetative spread, a history of invasion elsewhere) and those planted widely (high propagule pressure) are far more likely to escape and spread; climate matching between the native and new ranges matters; and some plants take decades to emerge from a lag phase, so the eventual number may be larger than current records suggest.

(c) Prioritise by risk: species that are invasive elsewhere (the best single predictor), species with invasive close relatives, species from regions with a similar climate, and those to be imported in large numbers or planted in or near natural habitats. Weed risk assessment systems combine such traits into a score.
:::
:::

::: exercise Interpreting a phenology study {level=2}
Over 30 years, the date of peak caterpillar abundance in a forest advanced by 15 days, while the mean laying date of a songbird advanced by 5 days. (a) Calculate the change in mismatch. (b) Predict the consequences for breeding success and population size. (c) What evidence would show whether the bird's shift is plastic or evolved?
::: solution
(a) The caterpillar peak moved 10 days further ahead of the birds: the mismatch increased by 10 days (if the two were matched at the start, nestlings now hatch 10 days after the peak food supply).

(b) Chicks are now fed during a declining food supply: fewer and lighter fledglings, lower survival, and population decline, as observed in pied flycatchers. Selection should favour earlier laying.

(c) If individual females lay earlier in warmer springs (a within-individual response to temperature), the shift is at least partly **plastic**. Evidence of **evolution** would be a change in breeding values for laying date across generations, estimated from pedigrees with an animal model ([[population-genetics/quantitative-traits]]), or a shift in the response measured in common-garden conditions. Long-term studies of great tits in the Netherlands and the United Kingdom have found mostly plastic responses, with selection for earlier laying where mismatch is greatest.
:::
:::

::: exercise eDNA surveillance {level=2}
A port authority samples water at a harbour each month for the DNA of an invasive mussel. Each sample detects the mussel, if present, with probability $p = 0.2$. (a) How many samples per month give a 90 % chance of detection if present? (b) If the mussel arrives undetected and its population grows by a factor of 3 per month, why does early detection matter so much? (c) What would make the detection probability per sample higher over time?
::: solution
(a) $1 - 0.8^k \ge 0.9$, so $k \ge \ln0.1/\ln0.8 = 10.3$: 11 samples.

(b) A population growing threefold a month increases $3^6 = 729$-fold in six months; the cost and difficulty of eradication rise steeply with area and numbers, and once spawning disperses larvae through the harbour, eradication becomes impossible. Detection in the first month or two may be the difference between a local removal and a permanent invasion.

(c) As the population grows, more DNA is shed and $p$ rises, so detection becomes easier — but later. Better methods (larger water volumes, sampling where currents concentrate DNA, more sensitive assays such as qPCR or digital PCR) raise $p$ at low density, which is what matters.
:::
:::

::: exercise Acceleration {level=3}
The cane toad's front in northern Australia advanced at about 10 km per year in the 1940s and over 50 km per year in the early 2000s. (a) If $r$ had stayed constant, by what factor must $D$ have increased to explain this under the Fisher–Skellam model? (b) Explain how spatial sorting could produce such an increase without natural selection in the usual sense. (c) What prediction about toads at the front could test the explanation, and what did Phillips and colleagues find?
::: solution
(a) $c = 2\sqrt{rD}$, so $c^2 \propto D$: a fivefold increase in $c$ requires a 25-fold increase in $D$ (or a combination of increases in $r$ and $D$ with $rD$ up 25-fold). Changes in habitat (the wet–dry tropics) contributed, but such a large increase invites a biological explanation.

(b) At an expanding front, the individuals that disperse furthest are the ones that arrive first, so the front is always composed of the best dispersers, which mate with each other. Their offspring inherit dispersal ability, and the process repeats each generation. This **spatial sorting** increases dispersal at the front even if dispersers have no reproductive advantage; it is distinct from natural selection, which requires differences in fitness, although low density at the front (fewer competitors) may add a fitness advantage too.

(c) Toads at the front should be morphologically and behaviourally better dispersers than those behind it, and the difference should be heritable. Phillips and colleagues (2006) found that toads at the front had longer legs relative to body size, moved further, and that leg length correlated with speed; later common-garden studies found that offspring of toads from the front also dispersed further, consistent with a genetic basis.
:::
:::

::: exercise Assisted colonisation {level=3}
A mountaintop salamander is projected to lose all its climatically suitable habitat by 2080. A mountain range 200 km to the north is projected to become suitable, but no salamander could disperse there unaided. (a) List the information needed to decide whether to move it. (b) Describe the risks to the recipient ecosystem. (c) Suggest an alternative or complementary action.
::: solution
(a) The strength of the evidence that the salamander will be lost without intervention (the projections' uncertainty, its physiological limits, the possibility of microrefugia or adaptation in place); whether the recipient site will really suit it (climate, habitat, food, diseases, competitors), ideally tested by experimental releases or by its performance in enclosures; the genetic composition of the founders (enough individuals and diversity, [[conservation-biology/conservation-genetics]]); the legal and social acceptability of the move; and a plan for monitoring and, if necessary, removal.

(b) The salamander could become a predator or competitor of native amphibians and invertebrates in the recipient range, or carry pathogens (such as chytrid fungi) to which local species are susceptible; it could hybridise with relatives; and its introduction could open a precedent for less careful moves. In short, it could become an invasive species, exactly the risk discussed earlier in this chapter.

(c) Protecting any cool microrefugia on the present mountain (shaded ravines, north-facing slopes) and reducing other stresses; establishing a captive or seed population (here, a breeding colony) as insurance; studying its thermal tolerance and potential for adaptation; and, above all, reducing emissions, which lower the warming that drives the projected loss.
:::
:::
