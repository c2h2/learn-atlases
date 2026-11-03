In the winter of 1965–1966, foresters cut down every tree in one small catchment of the Hubbard Brook Experimental Forest in the White Mountains of New Hampshire, left the timber where it fell, and for the next three years sprayed herbicide to stop any regrowth. Gene Likens, Herbert Bormann and their colleagues had been measuring what entered the catchment in rain and snow and what left it in the stream since 1963, in this and neighbouring catchments that were left intact, each draining over impermeable bedrock so that the stream carried away everything that left. After the felling, the stream from the cleared catchment ran higher, and its concentration of nitrate rose by tens of times, far above drinking-water standards for a time; calcium, potassium and other nutrients were lost in large quantities too. Without living plants to take them up, the nutrients released by decomposition simply washed away.

The Hubbard Brook experiment showed that an ecosystem's living vegetation is what holds its nutrients in place. This chapter follows those nutrients — the chemical elements that organisms need, besides the hydrogen and oxygen of water — on their paths between the living and non-living parts of ecosystems. In contrast to energy, which flows through and is lost as heat ([[ecology/ecosystem-energetics]]), elements are used again and again. We describe a cycle as a set of pools and fluxes, and derive the residence time of an element in a pool; study **decomposition**, the process that releases elements from dead organic matter; and then trace the three great cycles of biology — carbon, nitrogen and phosphorus — including how human activity has altered each one. The microorganisms that carry out many of the transformations are described in [[microbiology/microbial-ecology]] and [[microbiology/microbial-metabolism]].

## Pools, fluxes and residence times

::: definition Biogeochemical cycle {#def-cycle}
A **biogeochemical cycle** is the set of pathways by which a chemical element moves between living organisms and the atmosphere, water, soils and rocks. It is described by **pools** (or reservoirs) — the amounts of the element held in each compartment, such as the atmosphere, plant biomass or soil organic matter, in units such as Pg (10¹⁵ g) — and **fluxes** — the rates of transfer between pools, in units such as Pg yr⁻¹. The **residence time** of an element in a pool is the pool size divided by the total flux into it (or out of it, if it is at steady state): the average time an atom spends in the pool.
:::

At the scale of an ecosystem, it is useful to distinguish **inputs** (from the atmosphere as gases, dust, rain and snow, from the weathering of rock, and, for nitrogen, from biological fixation), **internal cycling** between plants, animals, microbes and soil, and **outputs** (in stream water, by leaching to groundwater, as gases, or in harvested material). In a mature forest, internal cycling dwarfs inputs and outputs: most of the nitrogen a tree takes up each year comes from the decomposition of last year's litter, not from new inputs. The Hubbard Brook felling broke the internal cycle at the uptake step, and outputs soared.

The simplest model of a pool is a single box with a constant input and a loss proportional to the amount present.

::: proposition A one-box model {#prop-box}
Let a pool hold an amount $X$ of an element, receive a constant input flux $I$, and lose the element at a rate proportional to its size, $kX$, with **turnover rate** $k$ (per unit time). Then

$$
\frac{dX}{dt} = I - kX ,
$$ {#eq-box}

whose solution from $X(0) = X_0$ is

$$
X(t) = \frac{I}{k} + \left(X_0 - \frac{I}{k}\right)e^{-kt}.
$$ {#eq-box-sol}

The pool approaches the **steady state** $X^* = I/k$, at which input equals output, and the residence time is

$$
\tau = \frac{X^*}{I} = \frac1k .
$$ {#eq-residence}

The time constant of approach to steady state is also $1/k$: after a perturbation, about 63 % of the gap is closed in time $1/k$ and 95 % in $3/k$.
:::

::: proof
The equation is linear; with $Y = X - I/k$ it becomes $dY/dt = -kY$, so $Y = Y_0e^{-kt}$, which gives [[#eq-box-sol]]. As $t \to \infty$, $X \to I/k$. At steady state the outflow $kX^*$ equals the inflow $I$, and $X^*/I = 1/k$. After time $1/k$ the remaining gap is $e^{-1} = 37$ %, and after $3/k$, $e^{-3} = 5$ %.
:::

Two consequences of [[#eq-residence]] recur throughout this chapter. A pool with a long residence time responds slowly: its steady-state size changes in proportion to a change in input, but reaching the new steady state takes several residence times. And a pool's size can be changed equally by changing its input or its turnover rate: soil carbon increases if more litter falls *or* if decomposition slows.

::: widget slopefield
f: I - k*y
x: 0, 20
y: 0, 2500
sliders: I=400:100:800:10; k=0.25:0.1:1:0.01
points: 0, 0; 0, 2400; 0, 800
caption: The one-box model $dX/dt = I - kX$ for the litter on a forest floor, with time in years horizontally and litter mass (g m⁻²) vertically; $I$ is the annual litterfall (g m⁻² yr⁻¹) and $k$ the decomposition rate (per year). Every solution approaches the steady state $I/k$ — 1600 g m⁻² with the defaults. Raise $k$ to mimic a warm, wet tropical forest and see how thin the litter layer becomes and how quickly it gets there; raise $I$ and the steady state rises in proportion.
:::

## Decomposition

::: definition Decomposition and mineralisation {#def-decomposition}
**Decomposition** is the breakdown of dead organic matter (**detritus**: dead plant tissues, animal remains, faeces) by **leaching** of soluble compounds, **fragmentation** by detritivores, and **chemical alteration**, mainly by the enzymes of fungi and bacteria. **Mineralisation** is the conversion of an element from organic form into inorganic form — organic nitrogen to ammonium, organic phosphorus to phosphate, organic carbon to CO₂ — which makes it available again to plants. **Immobilisation** is the reverse: the uptake of inorganic nutrients by microbes into their own biomass.
:::

The rate of decomposition depends on three groups of factors: the **physical environment** (it is fastest when warm and moist, and is slowed by cold, drought and waterlogging, which excludes oxygen); the **quality of the litter** (litter rich in nitrogen and poor in lignin and phenolic compounds decomposes fast, while woody, lignin-rich or nutrient-poor litter decays slowly); and the **decomposer community**, including the presence of fungi able to degrade lignin and of earthworms and other detritivores that fragment litter and mix it into the soil. Decomposers are themselves a diverse community; see [[microbiology/microbial-ecology]].

A simple and widely used description of the mass loss of litter was given by Jerry Olson in 1963.

::: proposition Exponential litter decay {#prop-olson}
If a fixed fraction of the remaining litter decomposes per unit time, the mass remaining after time $t$ is

$$
X_t = X_0\,e^{-kt},
$$ {#eq-olson}

where $k$ is the **decomposition constant**. The half-life of the litter is $\ln2/k$ and its mean residence time $1/k$. For a forest floor receiving an annual litterfall $I$, the steady-state mass of litter is $I/k$ ([[#prop-box]]), so $k$ can be estimated as the ratio of annual litterfall to the mass of the litter layer. This single-exponential model is an approximation: litter contains fractions that decay at different rates, so decay is often fast at first (leaching and loss of sugars) and slower later (lignin and humified material).
:::

::: example Leaf litter on two forest floors {#ex-decay}
Oak leaves in a temperate forest decompose with $k = 0.5$ per year. (a) What fraction remains after 2 years, and what is the half-life? (b) How long until 95 % of the mass is lost? (c) If the forest's annual litterfall is 400 g m⁻² and its average $k$ is 0.25 yr⁻¹, what is the steady-state mass of the litter layer? Compare a tropical forest with the same litterfall and $k = 3$ yr⁻¹.
::: solution
(a) $X_2/X_0 = e^{-0.5\times2} = e^{-1} = 0.37$; the half-life is $\ln2/0.5 = 1.39$ years.

(b) We need $e^{-0.5t} = 0.05$, so $t = \ln20/0.5 = 6.0$ years.

(c) Temperate: $I/k = 400/0.25 = 1600$ g m⁻². Tropical: $400/3 = 133$ g m⁻². With the same input, the tropical floor holds one-twelfth as much litter, because each leaf lasts a few months rather than years. This is why tropical rain-forest soils often hold surprisingly little organic matter and why so much of the ecosystem's nutrient capital is in the living vegetation — with serious consequences when the forest is cleared.
:::
:::

::: widget plot
f: exp(-k1*x); exp(-k2*x)
x: 0, 10
y: 0, 1
sliders: k1=0.5:0.05:3:0.05; k2=0.2:0.05:3:0.05
hlines: 0.5
labels: \text{litter 1}; \text{litter 2}
caption: The fraction of litter mass remaining against time in years for two litter types decaying exponentially, $X_t/X_0 = e^{-kt}$. Each curve crosses the horizontal line at its half-life, $\ln 2/k$. The defaults compare oak leaves ($k = 0.5$ yr⁻¹) with pine needles ($k = 0.2$ yr⁻¹); set one $k$ to 3 to see tropical leaf litter vanish within a year.
:::

### Mineralisation or immobilisation?

Whether decomposition *releases* nutrients for plants or *locks them up* in microbes depends on the ratio of carbon to nutrients in the litter. Microbes need nitrogen to build their own biomass, which has a low carbon-to-nitrogen ratio (roughly 5–10 for bacteria, somewhat higher for fungi), and they respire a large part of the carbon they consume. If the litter contains less nitrogen than the microbes need to process its carbon, they take up inorganic nitrogen from the soil (immobilisation), competing with plants; if it contains more, the excess is released as ammonium (mineralisation).

::: example The critical C:N ratio {#ex-cn}
Soil microbes have a biomass C:N ratio of 8 and a carbon-use efficiency of 0.4 (40 % of the carbon they take up becomes biomass, 60 % is respired). What is the C:N ratio of litter at which decomposition neither releases nor takes up inorganic nitrogen? Will wheat straw with C:N = 80 lead to net mineralisation or immobilisation?
::: solution
Consider 100 g of litter carbon. The microbes convert 40 g into biomass, which needs $40/8 = 5$ g of nitrogen. If the litter supplies exactly that, its C:N is $100/5 = 20$. In general the critical ratio is (microbial C:N)/(carbon-use efficiency) $= 8/0.4 = 20$.

Straw with C:N = 80 supplies only $100/80 = 1.25$ g of nitrogen per 100 g of carbon, far less than the 5 g needed, so microbes immobilise inorganic nitrogen from the soil. Ploughing in straw can therefore temporarily reduce the nitrogen available to a crop. As decomposition proceeds, carbon is respired and the remaining material's C:N falls until it passes the critical value and net mineralisation begins.
:::
:::

## The carbon cycle

Carbon is the element of organic matter, and its cycle is coupled to the flows of energy: photosynthesis fixes carbon as it captures energy, and respiration releases both.

The main pools of the global carbon cycle are, approximately (in Pg C; values rounded from the assessment of the Intergovernmental Panel on Climate Change, AR6, 2021, and updated for the atmosphere):

| pool | carbon (Pg C) |
|---|---|
| atmosphere (as CO₂, at about 425 ppm in 2024–2025) | about 900 |
| land vegetation | 450–650 |
| soils (top metre, excluding permafrost) | about 1500–2400 |
| permafrost | about 1400 |
| surface ocean | about 900 |
| intermediate and deep ocean (mainly dissolved inorganic carbon) | about 37 000 |
| fossil fuel reserves | about 1000 |

The largest annual fluxes are the exchange between the atmosphere and land vegetation — global GPP is about 120–130 Pg C yr⁻¹, returned by plant and soil respiration and fire — and the gross exchange of CO₂ between atmosphere and ocean, about 80–90 Pg C yr⁻¹ in each direction. Before the industrial era these large fluxes were nearly balanced, and the atmospheric concentration of CO₂ stayed at about 280 ppm for thousands of years, as air bubbles trapped in Antarctic ice show.

::: example How long does a carbon atom stay in the air? {#ex-residence}
The atmosphere contains about 900 Pg C. It exchanges about 120 Pg C yr⁻¹ with land vegetation (as GPP) and about 90 Pg C yr⁻¹ with the ocean. What is the residence time of a carbon atom in the atmosphere? Does this mean that an excess of CO₂ added to the atmosphere disappears within that time?
::: solution
The total flux out of the atmosphere is about $120 + 90 = 210$ Pg C yr⁻¹, so by [[#eq-residence]] the residence time is $900/210 \approx 4$ years. An individual CO₂ molecule is exchanged with the land or ocean within a few years.

But this does *not* mean that an excess is removed in a few years. The exchange is two-way: the molecules taken up are replaced by others returned by respiration and outgassing. What removes an *excess* is the small *net* difference between the gross fluxes, governed by much slower processes — mixing of surface water into the deep ocean (centuries), dissolution of carbonate sediments (thousands of years) and rock weathering (hundreds of thousands of years). The perturbation lifetime of added CO₂ is therefore far longer than the residence time of a molecule: a substantial fraction of an emission remains in the atmosphere for many centuries. Confusing these two time scales is a common error.
:::
:::

### Human perturbation of the carbon cycle

Since 1958, when Charles David Keeling began continuous measurements at Mauna Loa in Hawaii, the atmospheric CO₂ concentration has risen every year, from about 315 ppm to an annual mean of about 425 ppm in 2024 (NOAA). Superimposed on the rise is a seasonal oscillation of several ppm, the "breathing" of the Northern Hemisphere's vegetation, which takes up CO₂ in the northern summer and releases it in winter. The rise is caused by the burning of fossil fuels and cement production and by land-use change, mainly deforestation.

Annual carbon budgets compiled by the Global Carbon Project account for where the emitted carbon goes. Averaged over 2014–2023 (Global Carbon Budget 2024), emissions from fossil fuels and industry were about 10 Pg C yr⁻¹ and from land-use change about 1 Pg C yr⁻¹. Of this, about 5 Pg C yr⁻¹ accumulated in the atmosphere, about 3 Pg C yr⁻¹ was taken up by the ocean and about 3 Pg C yr⁻¹ by land ecosystems (these numbers do not sum exactly; the difference is the "budget imbalance" that measures our uncertainty). Natural sinks have so far removed a little over half of human emissions. Whether they continue to do so as the climate warms — for example, whether warming accelerates soil respiration and the thaw of permafrost releases its carbon — is one of the central questions for climate projections.

::: example The airborne fraction {#ex-airborne}
In one year, human activities emit 11 Pg C, and the atmospheric CO₂ concentration rises by 2.45 ppm. Given that 1 ppm of atmospheric CO₂ corresponds to 2.12 Pg C, what fraction of the emissions remained in the atmosphere?
::: solution
The atmospheric increase is $2.45\times2.12 = 5.2$ Pg C. The **airborne fraction** is $5.2/11 = 0.47$: 47 % of the emission stayed in the air, and the remaining 53 % (about 5.8 Pg C) was taken up by the ocean and land. Year-to-year variation in the airborne fraction is large — the land sink weakens in El Niño years — but its long-term average has stayed between about 40 and 50 %.
:::
:::

::: warning "The ocean and forests will absorb whatever we emit"
The land and ocean sinks are responses to the elevated CO₂ concentration, not fixed services. The ocean's uptake is limited by the slow mixing of surface water into the deep ocean and is reduced as seawater warms and its carbonate chemistry shifts (the same chemistry that makes the ocean more acidic as it absorbs CO₂). The land sink depends on plant growth stimulated by CO₂ and nitrogen deposition, on forest regrowth and on fire and drought regimes, all of which can change. Models project that the *fraction* of emissions absorbed by natural sinks declines in high-emission scenarios.
:::

## The nitrogen cycle

Nitrogen is a component of every amino acid and nucleotide, and after water it is the resource that most often limits plant growth on land and phytoplankton growth in the sea. The paradox is that 78 % of the atmosphere is dinitrogen, N₂ — but the triple bond of N₂ is so strong that only a few organisms can break it.

The main transformations are as follows; most are carried out by microorganisms.

- **Nitrogen fixation**: the reduction of N₂ to ammonia, by the enzyme nitrogenase, found only in some bacteria and archaea. Some fixers are free-living (cyanobacteria in the oceans, *Azotobacter* in soil); others live in symbiosis — rhizobia in the root nodules of legumes, *Frankia* in alder roots, cyanobacteria in lichens and in the water fern *Azolla*. Nitrogenase is inactivated by oxygen and the process is energetically expensive, consuming at least 16 ATP per N₂ fixed. Lightning fixes a small additional amount.
- **Ammonification**: the release of ammonium (NH₄⁺) from organic nitrogen during decomposition, part of mineralisation.
- **Nitrification**: the oxidation of ammonium to nitrite (NO₂⁻) and then nitrate (NO₃⁻), by chemoautotrophic bacteria and archaea that use the energy released. It was long thought to require two groups of organisms; in 2015 bacteria of the genus *Nitrospira* were found that carry out the complete oxidation alone ("comammox"). Nitrate is mobile in soil and easily leached.
- **Assimilation**: uptake of ammonium and nitrate by plants and microbes.
- **Denitrification**: the reduction of nitrate, via nitrite, nitric oxide and nitrous oxide (N₂O), to N₂, by bacteria using nitrate in place of oxygen for respiration in waterlogged soils and sediments. It returns fixed nitrogen to the atmosphere.
- **Anammox** (anaerobic ammonium oxidation): the reaction of ammonium with nitrite to give N₂, discovered in a wastewater treatment plant in the 1990s and now known to account for a large share of nitrogen loss from marine sediments and oxygen-minimum zones.

Biological fixation and denitrification are the gateways between the huge atmospheric pool of N₂ and the small pool of **reactive nitrogen** (all other forms) used by organisms. In an undisturbed ecosystem they roughly balance over long periods.

### The Haber–Bosch process and its consequences

In 1909 Fritz Haber showed how to synthesise ammonia from N₂ and hydrogen at high pressure and temperature over a catalyst, and Carl Bosch scaled the process up for industry; the first plant opened in Germany in 1913. Synthetic fertiliser from the Haber–Bosch process now underpins food production for a large fraction of the human population. Together with the cultivation of nitrogen-fixing crops and the release of nitrogen oxides from combustion, human activities now create roughly as much reactive nitrogen each year as all natural processes on land combined, or more. Much of this nitrogen does not end up in food: it leaches as nitrate into rivers and groundwater, is lost as ammonia and nitrogen oxides to the air and deposited elsewhere, or is denitrified, partly to N₂O, a powerful greenhouse gas that also depletes stratospheric ozone.

The ecological consequences include the **eutrophication** of rivers, lakes and coastal seas (excessive growth of algae, followed by oxygen depletion as they decompose), seasonal **hypoxic zones** ("dead zones") in coastal waters such as the northern Gulf of Mexico at the mouth of the Mississippi, acidification of soils and freshwaters, and loss of plant species from nutrient-poor habitats as nitrogen deposition favours fast-growing species. These are among the human impacts treated in [[conservation-biology/invasions-climate]].

::: application Legumes, crop rotation and fertiliser
Farmers knew long before the discovery of rhizobia (by Hermann Hellriegel and Hermann Wilfarth in 1886) that growing clover, beans or peas improved the soil for the following crop. A legume crop with effective nodules can fix on the order of 100 kg N ha⁻¹ per year or more, part of which is left in its roots and residues. Crop rotations with legumes, and intercropping of cereals with legumes, remain central to low-input agriculture, and the efficiency of nitrogen use in agriculture — the fraction of applied nitrogen that ends up in the harvested crop, often well under half — is a major target for reducing pollution.
:::

## The phosphorus cycle

Phosphorus is essential for nucleic acids, ATP and phospholipids. Unlike carbon and nitrogen, it has no significant gaseous phase, so it cannot be "fixed" from the air: all phosphorus in ecosystems comes ultimately from the **weathering** of phosphate minerals such as apatite in rocks, apart from small inputs in dust. Its global cycle is therefore largely **sedimentary**: phosphorus weathered from rocks is carried by rivers to the sea, deposited in sediments, and returns to land only when sediments are uplifted into new rock, over millions of years. Within ecosystems it cycles rapidly between organisms, soil organic matter and solution, but in soil it is also bound strongly to iron and aluminium oxides and to calcium, making much of it unavailable to plants.

Because phosphorus comes from rock, its supply changes as soils age. Thomas Walker and Keith Syers proposed in 1976 a model of soil development in which young soils on fresh rock are rich in mineral phosphorus but poor in nitrogen (which must accumulate from the atmosphere by fixation), while very old, highly weathered soils have lost much of their phosphorus by leaching and have the rest locked in unavailable forms. Studies of a sequence of lava flows of different ages in Hawaii, by Peter Vitousek and colleagues, confirmed the prediction: forests on young flows (a few hundred years old) were limited by nitrogen and on the oldest flow (about 4 million years old) by phosphorus. Many ancient, highly weathered landscapes, including much of Australia and lowland tropical forests on old soils, are phosphorus-poor.

### Phosphorus and eutrophication

In fresh waters, phosphorus is usually the nutrient that limits the growth of algae. The most famous demonstration was a whole-lake experiment led by David Schindler at the Experimental Lakes Area in north-western Ontario. In 1973 Lake 226, which has two basins, was divided with a plastic curtain. One basin received carbon, nitrogen and phosphorus; the other carbon and nitrogen only. Within weeks the basin receiving phosphorus developed a dense algal bloom, while the other did not. The aerial photograph of the bright green and dark blue halves of the lake became an icon of environmental science and helped persuade governments in North America and Europe to limit phosphates in detergents and remove phosphorus at sewage treatment works.

### Stoichiometry: the Redfield ratio

Organisms need elements in roughly fixed proportions. Alfred Redfield noted in 1934 that the ratio of carbon, nitrogen and phosphorus atoms in marine plankton, about $106 : 16 : 1$, is close to the ratio of nitrate to phosphate dissolved in deep seawater — because the deep-water nutrients come largely from the decomposition of plankton. This **Redfield ratio** is an average with considerable variation among species and conditions, but it provides a yardstick for diagnosing which nutrient is in short supply: water with a dissolved inorganic N:P ratio well below 16 is likely to be nitrogen-limited, and well above 16 phosphorus-limited.

::: example Which nutrient limits the algae? {#ex-redfield}
A lake contains 20 μmol L⁻¹ of dissolved inorganic nitrogen and 0.5 μmol L⁻¹ of phosphate. A coastal lagoon contains 5 μmol L⁻¹ of nitrogen and 1 μmol L⁻¹ of phosphate. Using the Redfield ratio as a guide, which nutrient is likely to limit algal growth in each? If algae take up nutrients in the ratio 16 : 1 until one is exhausted, how much algal carbon could the lake water support per litre?
::: solution
The lake has N:P $= 20/0.5 = 40$, well above 16: phosphorus is likely to run out first. The lagoon has $5/1 = 5$, below 16: nitrogen is likely limiting.

In the lake, 0.5 μmol of P would be used with $16\times0.5 = 8$ μmol of N, leaving 12 μmol of N unused. The algae could contain $106\times0.5 = 53$ μmol of carbon per litre, about 0.64 mg C L⁻¹. Adding nitrogen would not increase this; adding phosphorus would — as in Lake 226.
:::
:::

::: quiz
Why does the phosphorus cycle differ fundamentally from the nitrogen and carbon cycles?
- [ ] Phosphorus is not needed by plants
- [x] Phosphorus has no significant atmospheric gas phase, so it enters ecosystems mainly from the weathering of rock
- [ ] Phosphorus is not recycled within ecosystems
- [ ] Phosphorus is fixed from the air by bacteria in root nodules
::: solution
Carbon and nitrogen both have large atmospheric pools (CO₂ and N₂) that organisms can draw on by photosynthesis or fixation. Phosphorus has none to speak of, so its ultimate source is rock weathering, and losses from an ecosystem can be replaced only slowly. Within ecosystems it is recycled efficiently, like other nutrients.
:::
:::

::: history
The idea that elements circulate between living things and the environment goes back to the chemists of the eighteenth and nineteenth centuries — Antoine Lavoisier, Justus von Liebig and Jean-Baptiste Boussingault, who showed in the 1830s that legumes gain nitrogen from the air. Sergei Winogradsky (1880s–1890s) discovered chemoautotrophic bacteria, including the nitrifiers, and Hellriegel and Wilfarth (1886) showed that legume nodules fix nitrogen. Vladimir Vernadsky's *The Biosphere* (1926) presented life as a geological force shaping the chemistry of the planet. Redfield's ratio (1934), Keeling's CO₂ record from 1958, the Hubbard Brook small-catchment studies from 1963, and Schindler's whole-lake experiments at the Experimental Lakes Area from 1968 founded quantitative biogeochemistry. The global budgets of carbon and nitrogen and their human alteration have been assembled since the 1990s by large international collaborations.
:::

## Where this leads

Nutrient supply sets the limits to primary production discussed in [[ecology/ecosystem-energetics]], and the global distribution of climates and soils shapes the biomes in [[ecology/biogeography]]. Climate change, nitrogen deposition and eutrophication as threats to biodiversity are treated in [[conservation-biology/invasions-climate]], and the restoration of damaged ecosystems in [[conservation-biology/restoration]].

::: summary
- Nutrients cycle between living and non-living pools; a cycle is described by **pools** and **fluxes** ([[#def-cycle]]). In a one-box model $dX/dt = I - kX$, the pool approaches $X^* = I/k$, and the **residence time** is $1/k$ ([[#prop-box]]).
- **Decomposition** ([[#def-decomposition]]) releases nutrients by **mineralisation**; it is controlled by climate, litter quality and the decomposer community. Litter mass often decays approximately as $e^{-kt}$ ([[#prop-olson]]). Litter with C:N above a critical value (about 20–30) causes net **immobilisation**.
- **Carbon**: the atmosphere (about 900 Pg C) exchanges about 200 Pg C yr⁻¹ with land and ocean, so a molecule stays for about 4 years, but an excess persists for centuries. CO₂ has risen from 280 ppm to about 425 ppm (2024); about half of human emissions has been absorbed by land and ocean sinks.
- **Nitrogen**: fixation, ammonification, nitrification, denitrification and anammox, mostly microbial; human fixation (Haber–Bosch, legumes, combustion) now rivals or exceeds natural terrestrial fixation, causing eutrophication, hypoxia and N₂O emissions.
- **Phosphorus** has no gas phase; it comes from rock weathering, and old soils become phosphorus-limited. Phosphorus usually limits freshwater algae (Lake 226). The **Redfield ratio** C:N:P = 106:16:1 is a guide to nutrient limitation.
:::

## Exercises

::: exercise Residence time {level=1 check="10"}
A lake contains 500 t of phosphorus and receives 50 t yr⁻¹ from its catchment, losing the same amount to its outflow and sediments. What is the residence time of phosphorus in the lake, in years?
::: solution
$\tau = 500/50 = 10$ years.
:::
:::

::: exercise Half-life of litter {level=1 check="ln(2)/0.2"}
Pine needles decompose with $k = 0.2$ yr⁻¹. What is their half-life in years?
::: solution
$\ln2/0.2 = 3.47$ years.
:::
:::

::: exercise Steady-state litter {level=1 check="2000"}
A boreal forest has an annual litterfall of 300 g m⁻² and a decomposition constant of 0.15 yr⁻¹. What is the steady-state mass of the litter layer, in g m⁻²?
::: solution
$I/k = 300/0.15 = 2000$ g m⁻².
:::
:::

::: exercise From ppm to petagrams {level=1 check="2.12*140"}
The atmospheric CO₂ concentration has risen from about 280 ppm before the industrial era to about 420 ppm. How much carbon (in Pg C) has been added to the atmosphere, using 2.12 Pg C per ppm?
::: solution
$(420 - 280)\times2.12 = 140\times2.12 = 297$ Pg C.
:::
:::

::: exercise Critical C:N {level=2 check="33.33"}
Fungal decomposers have a biomass C:N of 10 and a carbon-use efficiency of 0.3. What is the critical C:N ratio of litter above which they immobilise nitrogen? Give two decimal places.
::: solution
The critical ratio is $10/0.3 = 33.33$. Fungi, with a higher biomass C:N and lower carbon-use efficiency than bacteria, can decompose litter of higher C:N without immobilising nitrogen — one reason fungi dominate the decomposition of wood and nutrient-poor litter.
:::
:::

::: exercise Interpreting the Hubbard Brook experiment {level=2}
After the forest of Watershed 2 at Hubbard Brook was cut and regrowth suppressed, stream nitrate rose sharply, and so did losses of calcium and potassium. (a) Explain why removing the vegetation increased nitrate export, naming the microbial processes involved. (b) Why did losses of calcium and potassium increase too? (c) Why was it important to compare the treated catchment with an untreated reference catchment rather than only before and after?
::: solution
(a) Decomposition and mineralisation continued (indeed, accelerated, since the soil was warmer and wetter without trees transpiring), producing ammonium, which nitrifying bacteria and archaea oxidised to nitrate. Without plant uptake, nitrate — a mobile anion — accumulated and was leached into the stream, and the increased water flow (no transpiration) carried more out.

(b) Nitrification releases hydrogen ions; these displace calcium and potassium cations from exchange sites on soil particles, and nitrate leaching carries these cations with it to maintain electrical balance. With no plant uptake, the cations were also not retained.

(c) Stream chemistry varies from year to year with weather; a before–after comparison alone could confuse a wet year with a treatment effect. Comparing with a reference catchment measured at the same time controls for such variation (a before–after–control–impact design).
:::
:::

::: exercise Nutrient limitation in the ocean {level=2}
Seawater from three stations has the following dissolved inorganic nitrogen and phosphate concentrations (μmol L⁻¹): (A) 0.1 N, 0.05 P; (B) 25 N, 1.6 P with very low chlorophyll; (C) 2 N, 0.5 P. For each, suggest what limits phytoplankton growth and how you would test it.
::: solution
(A) N:P = 2, and both nutrients are very low: likely nitrogen-limited, typical of stratified subtropical gyres (with phosphorus close to limiting too). Test: incubate water samples with added N, added P, and both, and measure chlorophyll growth.

(B) N:P = 15.6, close to Redfield, but both nutrients are abundant and chlorophyll low: a high-nutrient, low-chlorophyll region, likely iron-limited (or limited by grazing or light). Test with iron additions, as in IronEx.

(C) N:P = 4: likely nitrogen-limited, with phosphate in relative excess. Test with N and P additions; nitrogen-fixing cyanobacteria might be favoured here.
:::
:::

::: exercise Soil carbon and warming {level=3}
A soil carbon pool is at steady state with input $I = 300$ g C m⁻² yr⁻¹ from litter and a turnover rate $k = 0.02$ yr⁻¹. (a) What is the pool size and residence time? (b) Warming increases $k$ by 10 % while $I$ is unchanged. What is the new steady state, and how much carbon is lost per square metre? (c) If instead warming also increases plant productivity so that $I$ rises by 10 %, what happens? (d) Using [[#eq-box-sol]], roughly how long would it take to lose half of the carbon lost in (b)?
::: solution
(a) $X^* = I/k = 300/0.02 = 15\,000$ g C m⁻²; residence time $1/k = 50$ years.

(b) $k = 0.022$: $X^* = 300/0.022 = 13\,636$ g C m⁻², a loss of 1364 g C m⁻² (9 %), released to the atmosphere as CO₂ — a positive feedback to warming.

(c) $X^* = 330/0.022 = 15\,000$: no net change. The outcome depends on whether productivity or decomposition responds more to warming, which is why the response of soil carbon is uncertain.

(d) The approach to the new steady state has time constant $1/k = 1/0.022 = 45$ years; half the change occurs in $\ln2/0.022 = 31.5$ years. Soil carbon losses from warming unfold over decades.
:::
:::

::: exercise Whole-lake experiments {level=3}
In Schindler's experiment on Lake 226, one basin received carbon, nitrogen and phosphorus, the other carbon and nitrogen. (a) Why was carbon added to both? (b) Why was a single, divided lake more convincing than two different lakes? (c) What is the main weakness of the design, and how does the history of other lakes in the Experimental Lakes Area address it? (d) Later experiments in another lake, fertilised with phosphorus and progressively less nitrogen, found that nitrogen-fixing cyanobacteria increased. Why does this matter for management?
::: solution
(a) Some scientists had argued that carbon, not phosphorus, limited algae in lakes (because of low dissolved CO₂). Adding carbon to both basins controlled for that possibility, so any difference had to be due to phosphorus.

(b) The two basins share climate, geology, history and biota; comparing two separate lakes would confound the treatment with all their other differences.

(c) There is only one replicate of each treatment (n = 1), so the result could in principle reflect some unknown difference between the basins. The weakness is mitigated by the size and consistency of the effect and by replication across time and other lakes at the ELA, which responded similarly to phosphorus additions.

(d) Cutting nitrogen inputs alone may not reduce eutrophication, because nitrogen-fixing cyanobacteria can make up the shortfall from the atmosphere, as long as phosphorus is available. Controlling phosphorus is therefore essential for lakes. (In coastal and marine systems, nitrogen is often more limiting, so both may need to be controlled.)
:::
:::
