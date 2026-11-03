Raymond Lindeman spent the years 1936 to 1938 studying Cedar Bog Lake, a small, shallow lake in Minnesota that was filling in with peat. Instead of listing its species, he asked how much energy entered the lake as sunlight captured by its plants and algae, how much of that passed to the animals that ate them, how much to the animals that ate those animals, and how much was lost along the way. His paper "The trophic-dynamic aspect of ecology", published in 1942 after his death at the age of 27, treated a whole ecosystem as a machine for transforming energy, and showed that at each step up the food chain most of the energy disappears.

This chapter takes Lindeman's point of view. An **ecosystem** — a term introduced by Arthur Tansley in 1935 — is a community together with its physical environment, considered as a single system through which energy flows and matter cycles. We define primary production and the factors that limit it, from sunlight and water on land to nutrients and iron in the oceans; follow energy into consumers and decomposers; derive the efficiency of transfer between trophic levels; and explain why that efficiency limits the length of food chains and the number of top predators an ecosystem can support. The food webs whose energy flow we measure were introduced in [[ecology/communities]], and the biochemistry of photosynthesis and respiration is in [[plant-biology/photosynthesis]] and [[biochemistry/bioenergetics]]. The cycling of matter, the other half of ecosystem ecology, is the subject of [[ecology/nutrient-cycles]].

## Energy flows, matter cycles

Almost all energy in ecosystems enters as sunlight, is fixed by photosynthesis into the chemical energy of organic compounds, passes from organism to organism as they eat one another, and leaves as heat, released by respiration at every step. Energy cannot be recycled: by the second law of thermodynamics, each transformation degrades some of it to heat, which organisms cannot use to do work. Ecosystems therefore need a continuous input of energy. Chemical elements, by contrast — carbon, nitrogen, phosphorus — are taken up from the environment, passed along the same food chains, and returned to the environment by decomposition, to be used again. **Energy flows; matter cycles.**

The exceptions are instructive. Ecosystems at deep-sea hydrothermal vents, discovered in 1977 on the Galápagos Rift, are fuelled not by sunlight but by **chemosynthesis**: bacteria and archaea oxidise hydrogen sulfide, methane or hydrogen from the vent fluid and use the energy to fix carbon dioxide, supporting dense communities of tubeworms, clams and shrimp. Even there, however, the oxygen the bacteria use to oxidise sulfide comes ultimately from photosynthesis at the surface.

::: warning "Energy is recycled in ecosystems"
Nutrients are recycled, energy is not. When a decomposer breaks down a dead leaf, it releases the nitrogen and phosphorus for plants to use again, but the energy in the leaf's organic compounds is used by the decomposer and lost as heat. No organism can make use of that heat to build biomass. Every ecosystem is therefore dependent on a continuous supply of energy from outside — sunlight, or the chemical energy of vent fluids — while it can run indefinitely on the same atoms.
:::

## Primary production

::: definition Primary production {#def-production}
**Gross primary production** (GPP) is the rate at which an ecosystem's autotrophs fix carbon (or energy) by photosynthesis or chemosynthesis. Part of it is used by the autotrophs themselves in respiration ($R_a$, **autotrophic respiration**). The remainder,

$$
\text{NPP} = \text{GPP} - R_a ,
$$ {#eq-npp}

is **net primary production**, the rate at which new plant biomass is produced, and the energy available to all other organisms. **Net ecosystem production** is NPP minus the respiration of heterotrophs, $R_h$ (consumers and decomposers):

$$
\text{NEP} = \text{NPP} - R_h = \text{GPP} - R_a - R_h ;
$$ {#eq-nep}

it is positive when an ecosystem is accumulating organic matter (a carbon sink) and negative when it is losing it (a carbon source). Production is a *rate*, expressed per unit area and time — in g C m⁻² yr⁻¹, g dry mass m⁻² yr⁻¹ or kJ m⁻² yr⁻¹ — and must be distinguished from the **standing crop** or biomass, the amount present at one time (g m⁻²).
:::

Roughly half of GPP is respired by plants themselves; the fraction is somewhat higher in tropical forests with large living biomass to maintain and lower in some crops. The distinction between production (a flow) and biomass (a stock) matters constantly. A temperate forest has a biomass of tens of kilograms of dry matter per square metre but an NPP of only about one kilogram per square metre per year; the phytoplankton of the open ocean have a tiny standing crop but produce many times their own biomass each year, because each cell divides about once a day and is eaten almost as fast. The ratio of production to biomass is the inverse of the mean **turnover time** of the biomass.

### How much and where

Estimates combining satellite measurements of ocean colour and of the greenness of land vegetation with models put global NPP at about 105 Pg C per year (1 Pg = 10¹⁵ g), almost equally divided between land (about 56 Pg C) and oceans (about 49 Pg C), according to a widely cited analysis by Christopher Field and colleagues (1998). The oceans achieve this with less than 1 % of the planet's plant biomass, because of the rapid turnover of phytoplankton.

Per unit area, production varies enormously between ecosystems. The following values are approximate means of NPP compiled by Robert Whittaker in 1975, in grams of dry matter per square metre per year; they are rough, and more recent estimates differ in detail, but the ranking has stood up:

| ecosystem | NPP (g dry mass m⁻² yr⁻¹) |
|---|---|
| algal beds and reefs | 2500 |
| tropical rain forest | 2200 |
| estuaries | 1500 |
| temperate deciduous forest | 1200 |
| boreal forest | 800 |
| cultivated land | 650 |
| temperate grassland | 600 |
| continental shelf | 360 |
| tundra and alpine | 140 |
| open ocean | 125 |
| desert and semi-desert scrub | 90 |

The open ocean is among the least productive ecosystems per unit area — a "desert" — but because it covers about two-thirds of the planet, its total production is very large.

### What limits primary production

On land, NPP is limited mainly by **water** and **temperature**, through the length of the growing season and the rate of photosynthesis, and then by **nutrients**, especially nitrogen and phosphorus. Across the globe, NPP correlates closely with actual evapotranspiration — the amount of water that evaporates from the soil and transpires from plants, which combines water supply with the energy available to evaporate it — as Michael Rosenzweig showed in 1968. Within a region, it often rises almost linearly with annual precipitation, especially in grasslands and deserts.

::: example Rain-use efficiency in grasslands {#ex-rain}
Aboveground NPP was measured at seven grassland sites along a rainfall gradient:

| mean annual precipitation (mm) | 200 | 300 | 400 | 500 | 600 | 700 | 800 |
|---|---|---|---|---|---|---|---|
| aboveground NPP (g m⁻² yr⁻¹) | 90 | 140 | 170 | 240 | 260 | 330 | 350 |

Estimate the increase in production per millimetre of rain and predict the NPP of a site receiving 450 mm.
::: solution
Least-squares regression gives $\text{ANPP} = 2.5 + 0.446\times\text{MAP}$, with $R^2 = 0.99$. Each additional millimetre of annual precipitation adds about 0.45 g m⁻² of aboveground production, the **rain-use efficiency** of these grasslands. At 450 mm, the prediction is $2.5 + 0.446\times450 = 203$ g m⁻² yr⁻¹. (Extrapolating to very wet sites would be unwise, since other factors — nutrients, light, temperature — take over as limits.)
:::
:::

::: widget regression
points: 200,90; 300,140; 400,170; 500,240; 600,260; 700,330; 800,350
degree: 1
caption: Aboveground net primary production (g m⁻² yr⁻¹) against mean annual precipitation (mm) for the grassland sites of [[#ex-rain]], with the least-squares line, whose slope is the rain-use efficiency. Drag the wettest site downwards to imitate nutrient limitation at high rainfall and watch the slope fall; try a quadratic fit (degree 2) to see a saturating relationship.
:::

In the oceans, light limits production below the **euphotic zone**, typically the upper 50–200 m, and nutrients limit it within it. Because organic particles sink, nutrients are carried out of the surface waters and regenerated at depth; production is therefore highest where deep water is brought to the surface — in **upwelling** zones off the western coasts of continents, around Antarctica, and in coastal waters receiving nutrients from rivers — and lowest in the permanently stratified central gyres. Nitrogen is the commonest limiting nutrient in the sea, but in some large regions (the Southern Ocean, the equatorial and subarctic Pacific) nitrate is abundant yet phytoplankton are scarce. These **high-nutrient, low-chlorophyll** regions were proposed by John Martin in the late 1980s to be limited by **iron**, which is needed for photosynthetic and nitrogen-assimilating enzymes and is supplied mainly in wind-blown dust. A series of open-ocean iron-addition experiments from 1993 onwards, beginning with IronEx I in the equatorial Pacific, produced phytoplankton blooms, confirming iron limitation.

### Photosynthetic efficiency

How efficiently do plants convert sunlight into biomass? Only about 45 % of solar radiation lies in the photosynthetically active wavelengths (400–700 nm), not all of that is absorbed, and the photochemistry and biochemistry of carbon fixation, photorespiration and plant respiration all take their share.

::: example The efficiency of a crop {#ex-efficiency}
A wheat field receives 1800 MJ m⁻² of photosynthetically active radiation over a year, and produces a total NPP (shoots and roots) of 1500 g of dry matter per square metre. Taking the energy content of plant dry matter as 18 kJ g⁻¹, what fraction of the incident PAR is stored in NPP?
::: solution
The energy in NPP is $1500\times18 = 27\,000$ kJ $= 27$ MJ m⁻². The efficiency is $27/1800 = 0.015$, or 1.5 % of incident PAR — and about half that as a fraction of total solar radiation. A well-fertilised, well-watered crop is among the most efficient of ecosystems; averaged over the globe, natural vegetation stores well under 1 % of the solar energy reaching it, because of drought, cold seasons, nutrient shortage and incomplete canopies.
:::
:::

### Measuring production

On land, NPP is estimated by harvesting the biomass produced in a year (difficult for roots, and for losses to herbivores and litter fall during the year), by following the growth of tree stems, or by measuring the exchange of CO₂ between the ecosystem and the atmosphere with **eddy covariance** towers, which measure net ecosystem exchange continuously from the turbulent fluctuations of wind and CO₂ concentration above the canopy; hundreds of such sites have been operated worldwide, coordinated through networks such as FLUXNET. In water, production is measured by the uptake of radioactive or stable-isotope-labelled carbon, or by the changes in oxygen in light and dark bottles. At global scale, satellites measure the fraction of light absorbed by green vegetation from the reflectance in red and near-infrared wavelengths (the normalised difference vegetation index, NDVI) and the concentration of chlorophyll in surface waters from ocean colour, and models convert these into estimates of NPP.

## Secondary production and the fate of energy

Heterotrophs — consumers and decomposers — use the energy fixed by primary producers. Their production of new biomass is **secondary production**. To follow energy through a consumer we draw up its energy budget.

::: definition The energy budget of a consumer {#def-budget}
Of the energy **consumed** ($C$) by an animal, part is not absorbed by the gut and is lost in faeces, the **egested** energy $F$. The remainder is **assimilated**, $A = C - F$ (strictly, part of it is then lost in urine as nitrogenous waste, which we ignore here). Assimilated energy is used either for **respiration** $R$ — maintenance, activity and, in endotherms, heat production — or for **production** $P$ of new tissue, gametes and offspring:

$$
C = F + A, \qquad A = R + P .
$$ {#eq-budget}

From these flows three efficiencies are defined: the **assimilation efficiency** $A/C$, the **production efficiency** (net growth efficiency) $P/A$, and the **gross growth efficiency** $P/C$.
:::

The efficiencies differ systematically between kinds of animal and food. **Assimilation efficiency** depends on food quality: carnivores eating animal tissue assimilate about 80 % of it, herbivores eating seeds and young leaves 50–80 %, and those eating mature leaves, grass or wood often only 20–50 %, because cellulose and lignin are hard to digest and much passes through as faeces. **Production efficiency** depends mainly on metabolism: endotherms (birds and mammals) spend most of their assimilated energy on keeping warm and produce only a few per cent of it as new tissue, whereas ectotherms, especially invertebrates, can convert tens of per cent into production. Small endotherms, with high surface-to-volume ratios, have the lowest production efficiencies of all.

::: example Energy budgets of a caterpillar and a vole {#ex-budget}
A caterpillar eats leaves containing 200 J, produces frass (faeces) containing 120 J and respires 50 J; a vole eats seeds containing 200 J, egests 60 J and respires 136 J. Calculate the assimilation, production and gross growth efficiencies of each.
::: solution
Caterpillar: $A = 200 - 120 = 80$ J, so $A/C = 40$ %; $P = 80 - 50 = 30$ J, so $P/A = 37.5$ % and $P/C = 15$ %.

Vole: $A = 200 - 60 = 140$ J, so $A/C = 70$ %; $P = 140 - 136 = 4$ J, so $P/A = 2.9$ % and $P/C = 2$ %.

The vole digests its food much better than the caterpillar does, but turns far less of it into new tissue, because it spends almost everything it assimilates on staying warm and active. Gram for gram of food, the ectotherm produces seven times as much biomass.
:::
:::

### Transfer between trophic levels

Not all of the production at one trophic level is eaten by the next: some dies uneaten and passes to the decomposers. Combining this with the consumer's efficiencies gives the efficiency of the whole transfer.

::: proposition Trophic transfer efficiency {#prop-te}
Let $P_n$ be the production of trophic level $n$. Define the **consumption efficiency** $\text{CE} = I_{n+1}/P_n$, the fraction of the production of level $n$ that is ingested by level $n+1$; the **assimilation efficiency** $\text{AE} = A_{n+1}/I_{n+1}$; and the **production efficiency** $\text{PE} = P_{n+1}/A_{n+1}$. Then the **trophic transfer efficiency** — the fraction of the production of one level that becomes production at the next — is

$$
\text{TE} = \frac{P_{n+1}}{P_n} = \text{CE}\times\text{AE}\times\text{PE}.
$$ {#eq-te}

If the transfer efficiency is the same, $\text{TE}$, at every step, the production at trophic level $n$ (with primary producers at level 1) is

$$
P_n = P_1\,\text{TE}^{\,n-1}.
$$ {#eq-pyramid}
:::

::: proof
The three ratios telescope: $\dfrac{I_{n+1}}{P_n}\cdot\dfrac{A_{n+1}}{I_{n+1}}\cdot\dfrac{P_{n+1}}{A_{n+1}} = \dfrac{P_{n+1}}{P_n}$. Applying $P_{k+1} = \text{TE}\,P_k$ repeatedly from $k = 1$ to $k = n - 1$ gives [[#eq-pyramid]].
:::

How large is TE in practice? Lindeman's estimates and many later ones are often summarised by the "10 % rule", and a compilation of aquatic food-web models by Daniel Pauly and Villy Christensen (1995) found a mean transfer efficiency of about 10 %, though with a wide spread among systems. The rule is an **empirical generalisation**, not a law: transfer efficiencies range from below 1 % (for example, from grassland plants to large mammal herbivores, which eat only a small part of plant production) to over 20 % in some aquatic food chains dominated by ectotherms eating easily digested prey.

::: widget plot
f: P1*TE^(x - 1)
x: 1, 5
y: 0, 10000
sliders: P1=10000:2000:10000:100; TE=0.1:0.02:0.3:0.01
points: 1, 10000; 2, 1000; 3, 100; 4, 10
caption: Production (kJ m⁻² yr⁻¹) at trophic level $n$ when the producers make $P_1$ and each transfer has efficiency TE, $P_n = P_1\,\mathrm{TE}^{\,n-1}$. The marked points are for TE = 10 %: 10 000 at level 1, 1000 for herbivores, 100 for carnivores, 10 for top carnivores. Raise TE to 20 % and see how much more energy reaches level 4 — eight times as much. Even then, the curve shows why little is left beyond the fourth or fifth level.
:::

::: example How many top predators? {#ex-pyramid}
A lake's phytoplankton have a net production of 10 000 kJ m⁻² yr⁻¹. The transfer efficiencies are $\text{CE} = 0.5$, $\text{AE} = 0.6$ and $\text{PE} = 0.3$ at every step. How much production is available to the piscivorous fish at trophic level 4? A pike needs about 2000 kJ of prey production per year to support it; how many pike can 10 hectares of the lake support?
::: solution
By [[#eq-te]], $\text{TE} = 0.5\times0.6\times0.3 = 0.09$. By [[#eq-pyramid]], $P_4 = 10\,000\times0.09^3 = 7.29$ kJ m⁻² yr⁻¹ — less than 0.1 % of primary production. The fish at level 4 are the pike's prey, so the pike (level 5) would be supported by this production: 10 ha is $10^5$ m², so the prey production is $7.29\times10^5$ kJ yr⁻¹, enough for about $7.29\times10^5/2000 \approx 360$ pike — and in practice fewer, since the pike cannot capture all the production of its prey and must share it with other predators and with decomposers.
:::
:::

### Why food chains are short

[[#eq-pyramid]] shows that energy declines geometrically up the food chain. With TE = 10 %, the fourth level receives 0.1 % of primary production and the sixth 0.001 %. Charles Elton (1927) argued that this explains why food chains are short, why large predators are rare, and why the numbers or biomass of organisms typically form **pyramids**, decreasing with each level. The **energetic hypothesis** predicts that food chains should be longer in more productive ecosystems.

The evidence is mixed. Within some groups of ecosystems, such as lakes, food-chain length increases more with **ecosystem size** (the volume of the lake) than with productivity, as David Post and colleagues reported in 2000, perhaps because large ecosystems support larger, more stable populations of top predators and more habitat diversity. Experiments in small containers such as water-filled tree holes, where productivity can be manipulated, suggest that productivity matters mainly at the low end, where very poor habitats support fewer levels. Disturbance may also shorten chains, since top predators recover slowly. Food-chain length is probably set by a combination of energy, ecosystem size, disturbance and the body sizes that predators need to eat their prey.

### Ecological pyramids

Pyramids of energy flow (production) are always upright, by [[#prop-te]]. Pyramids of **numbers** need not be: a single oak supports thousands of caterpillars. Pyramids of **biomass** are usually upright on land, but in the open ocean they are often **inverted**: the standing biomass of zooplankton exceeds that of the phytoplankton they eat. This is possible because the phytoplankton turn over so quickly — each day, the zooplankton eat roughly what grew that day — whereas zooplankton live longer and accumulate biomass. The paradox disappears once we remember the distinction between production (a rate) and biomass (a stock).

::: quiz
In a lake, the biomass of zooplankton is greater than that of the phytoplankton they eat. Which statement best explains this?
- [ ] Zooplankton have a higher production efficiency than phytoplankton
- [ ] The zooplankton must be feeding mainly on something other than phytoplankton
- [x] Phytoplankton have a much shorter turnover time, so a small standing crop can sustain a larger production
- [ ] The second law of thermodynamics does not apply to aquatic ecosystems
::: solution
Biomass is a stock and production a rate. Phytoplankton divide roughly daily and are eaten almost as fast as they grow, so their standing crop is small even though their annual production is many times larger than the production of the zooplankton. The pyramid of production remains upright; only the pyramid of biomass is inverted.
:::
:::

## Decomposers and the detrital pathway

Most net primary production is not eaten while alive. In forests, grasslands and many lakes and rivers, most NPP dies — as fallen leaves, dead roots, wood and uneaten algae — and enters the **detrital food chain**, fed on by **detritivores** (earthworms, woodlice, millipedes, many insect larvae) and **decomposers** (fungi and bacteria). The **grazing food chain** of herbivores and their predators typically processes a smaller fraction, and a much higher one only in some systems: in the open ocean, zooplankton eat most phytoplankton production, and in heavily grazed grasslands, large herbivores can eat over half the aboveground production.

The decomposer community is enormously diverse — a gram of soil contains thousands of species of bacteria and many metres of fungal hyphae — and its respiration, $R_h$, is the main term subtracted from NPP in [[#eq-nep]]. In a forest at equilibrium, NEP is close to zero over the long term: decomposition releases about as much CO₂ as the trees fix. Ecosystems with positive NEP accumulate organic matter, in growing trees, in peat or in sediments. Peatlands, where waterlogging and low temperature slow decomposition, have accumulated a large share of the world's soil carbon in this way, and the processes of decomposition and their dependence on temperature, moisture and litter quality are described in [[ecology/nutrient-cycles]].

::: intuition An ecosystem as an economy
Think of GPP as the income of a household and $R_a$ as the household's own living costs; what is left, NPP, is the household's saving, which is all that anyone else can borrow. Consumers and decomposers live on that saving, each passing on to the next only what it does not spend on its own living costs. Energy flows downhill through the economy and is spent at every step. An ecosystem accumulates wealth — organic matter — only when total spending, $R_a + R_h$, is less than income, GPP.
:::

## Energy, body size and human use

Because metabolic rate scales with body mass, the energy budgets of animals depend strongly on size. Across species, the resting metabolic rate of mammals and birds increases approximately as $M^{3/4}$ (Kleiber's law; see [[animal-physiology/energy-metabolism]]) — an empirical regularity whose exact exponent and explanation remain debated. A consequence is that a small animal needs more energy per gram of body mass than a large one, so a given amount of food supports more total biomass of large animals than of small ones, but far fewer individuals.

::: application Human appropriation of primary production and fisheries
Humans use a large and growing share of the planet's primary production. One widely cited estimate, by Helmut Haberl and colleagues (2007), put the human appropriation of NPP — the production harvested as crops, timber and fodder, plus the production lost because land use has replaced natural vegetation with less productive systems — at about a quarter of the potential terrestrial NPP in the year 2000. What remains supports all other terrestrial species.

The same energetic reasoning applies to the sea. Pauly and Christensen (1995) estimated, using trophic levels and a transfer efficiency of 10 %, that the world's fisheries of the early 1990s required about 8 % of global aquatic primary production, and a much larger share in the productive upwelling and shelf systems where most fish are caught. Each step down the food chain multiplies the food available roughly tenfold: a tonne of a top predator such as tuna (trophic level about 4) represents the use of about a thousand tonnes of plankton production, while a tonne of anchovy (level about 3) represents about a hundred. Fishing has progressively removed large predators, a trend called "fishing down marine food webs" (Pauly and colleagues, 1998). The consequences for conservation are discussed in [[conservation-biology/people-and-policy]].
:::

The flows of energy through an ecosystem can be followed with a few lines of code, which makes it easy to explore how changes in efficiency propagate:

```python
P1 = 10_000.0                 # net primary production, kJ m^-2 yr^-1
CE, AE, PE = 0.5, 0.6, 0.3    # consumption, assimilation, production efficiencies

P = P1
for level in range(1, 6):     # trophic levels 1 (producers) to 5
    print(f"level {level}: production {P:10.2f} kJ m^-2 yr^-1")
    P *= CE * AE * PE         # transfer efficiency TE = 0.09 per step
# level 1: production   10000.00 kJ m^-2 yr^-1
# level 2: production     900.00 kJ m^-2 yr^-1
# level 3: production      81.00 kJ m^-2 yr^-1
# level 4: production       7.29 kJ m^-2 yr^-1
# level 5: production       0.66 kJ m^-2 yr^-1
```

::: history
The idea of a food chain and a pyramid of numbers came from Charles Elton's *Animal Ecology* (1927), and the word *ecosystem* from Arthur Tansley (1935). Raymond Lindeman's trophic-dynamic paper (1942), supervised in part by G. Evelyn Hutchinson, made energy flow the organising principle of ecosystem ecology; Howard and Eugene Odum measured energy flow through whole ecosystems, including a coral reef at Enewetak Atoll (1955), and Eugene Odum's textbook *Fundamentals of Ecology* (1953) spread the approach. The International Biological Programme (1964–1974) measured primary production in ecosystems around the world, giving the data behind compilations such as Whittaker's. From the late 1970s satellites made it possible to estimate production globally, and from the 1990s networks of eddy-covariance towers have measured ecosystem carbon exchange continuously.
:::

## Where this leads

The carbon fixed as primary production is part of a global cycle linking ecosystems, oceans and atmosphere, traced in [[ecology/nutrient-cycles]] along with the nitrogen and phosphorus that limit production. The geographical pattern of production underlies the distribution of biomes in [[ecology/biogeography]]. The physiology of energy use by individual animals is developed in [[animal-physiology/energy-metabolism]].

::: summary
- Energy flows through ecosystems and is lost as heat; matter cycles. Almost all ecosystems are powered by sunlight; hydrothermal vents by chemosynthesis.
- **NPP = GPP − $R_a$** and **NEP = NPP − $R_h$** ([[#def-production]]). Production is a rate, biomass a stock; their ratio is the turnover rate.
- Global NPP is about 105 Pg C yr⁻¹, split roughly equally between land and ocean. Per area, reefs, swamps and tropical forests are most productive; deserts and the open ocean least.
- On land, production is limited mainly by water, temperature and nutrients; in the sea by light, nitrogen, phosphorus and — in high-nutrient, low-chlorophyll regions — iron. Plants store only around 1 % of incident light.
- A consumer's energy budget is $C = F + A$, $A = R + P$ ([[#def-budget]]); carnivores assimilate efficiently, endotherms have low production efficiencies.
- **Trophic transfer efficiency** $\text{TE} = \text{CE}\times\text{AE}\times\text{PE}$ ([[#prop-te]]), often about 10 % (empirically, with wide variation); production declines as $P_1\,\text{TE}^{n-1}$, which helps explain short food chains and rare top predators. Biomass pyramids can be inverted where producers turn over quickly.
- Most NPP in many ecosystems passes through the **detrital** pathway to decomposers.
:::

## Exercises

::: exercise Net primary production {level=1 check="900"}
A forest has a gross primary production of 2000 g C m⁻² yr⁻¹ and autotrophic respiration of 1100 g C m⁻² yr⁻¹. What is its NPP?
::: solution
$\text{NPP} = 2000 - 1100 = 900$ g C m⁻² yr⁻¹.
:::
:::

::: exercise Net ecosystem production {level=1 check="-50"}
A peatland has NPP of 300 g C m⁻² yr⁻¹ and heterotrophic respiration of 350 g C m⁻² yr⁻¹ after drainage. What is its NEP, and is it a carbon source or sink?
::: solution
$\text{NEP} = 300 - 350 = -50$ g C m⁻² yr⁻¹: negative, so the drained peatland is a carbon source, losing stored carbon to the atmosphere as decomposition speeds up.
:::
:::

::: exercise Assimilation efficiency {level=1 check="0.25"}
A grasshopper eats grass containing 400 J and egests 300 J. What is its assimilation efficiency?
::: solution
$A = 400 - 300 = 100$ J, so $A/C = 100/400 = 0.25$.
:::
:::

::: exercise A trophic pyramid {level=1 check="40"}
Primary production is 40 000 kJ m⁻² yr⁻¹ and the transfer efficiency is 10 % at every step. What is the production of the fourth trophic level?
::: solution
$P_4 = 40\,000\times0.1^3 = 40$ kJ m⁻² yr⁻¹.
:::
:::

::: exercise Turnover time {level=2}
The standing biomass of phytoplankton in a lake is 2 g C m⁻², and their NPP is 400 g C m⁻² yr⁻¹. The zooplankton biomass is 5 g C m⁻² and their production 40 g C m⁻² yr⁻¹. (a) Calculate the turnover time of each. (b) Draw (in words) the pyramids of biomass and of production. (c) Explain why only one of them is inverted.
::: solution
(a) Turnover time = biomass / production: phytoplankton $2/400 = 0.005$ yr, about 1.8 days; zooplankton $5/40 = 0.125$ yr, about 46 days.

(b) Biomass: zooplankton (5) above phytoplankton (2) — inverted. Production: phytoplankton (400) above zooplankton (40) — upright, with a transfer of 10 %.

(c) Production is a flow and must decrease up the chain, since each level can only produce from what it obtains from the level below. Biomass is a stock: a fast-turning-over level can have a smaller stock than a slow one that feeds on it.
:::
:::

::: exercise Efficiencies of a herbivore {level=2}
A deer eats 3000 MJ of plant material per year, egests 1200 MJ and loses 150 MJ in urine and methane; it respires 1600 MJ. (a) Calculate its assimilation efficiency (including the urinary and methane losses as not assimilated), production and production efficiency. (b) Its population consumes 5 % of the NPP of its forest. What is the transfer efficiency from plants to deer, and what happens to the rest of the NPP?
::: solution
(a) Assimilated energy available for metabolism: $3000 - 1200 - 150 = 1650$ MJ, an assimilation efficiency of $1650/3000 = 55$ %. Production $1650 - 1600 = 50$ MJ, so $\text{PE} = 50/1650 = 3.0$ %.

(b) $\text{TE} = \text{CE}\times\text{AE}\times\text{PE} = 0.05\times0.55\times0.030 = 0.00083$, under 0.1 %. Most NPP is never eaten by deer: it falls as litter or dies and is consumed by detritivores and decomposers, or is eaten by insect herbivores. A large endothermic herbivore is a very inefficient converter of forest production.
:::
:::

::: exercise Eating lower in the food chain {level=2}
A tonne of fish production at trophic level 3 requires, with a transfer efficiency of 10 %, about 100 tonnes of primary production. (a) How much primary production would a tonne of fish at trophic level 4.2 require? (b) If transfer efficiency were 15 % instead, how much would a tonne of level-3 fish require? (c) Use your answers to explain why estimates of the share of primary production used by fisheries are uncertain.
::: solution
(a) $1/0.1^{4.2 - 1} = 10^{3.2} = 1585$ tonnes.

(b) $1/0.15^{2} = 44.4$ tonnes.

(c) The required primary production depends exponentially on both the trophic level and the transfer efficiency: changing TE from 10 % to 15 % more than halves the requirement for level-3 fish, and the effect is larger at higher levels. Since both quantities are uncertain and vary between ecosystems, estimates of the share used by fisheries vary by factors of two or more.
:::
:::

::: exercise Iron fertilisation {level=3}
Iron-addition experiments in high-nutrient, low-chlorophyll regions produced phytoplankton blooms. (a) Why does this show iron limitation of primary production? (b) It has been proposed to fertilise the Southern Ocean with iron to remove CO₂ from the atmosphere. For this to work, what must happen to the extra organic carbon produced? (c) Give two ecological reasons why the proposal is controversial.
::: solution
(a) In these regions nitrate and phosphate are abundant but phytoplankton biomass is low. If adding iron alone increases production, iron must have been the limiting factor (in the sense of Liebig's law; see [[ecology/organisms-environment]]).

(b) To remove CO₂ from the atmosphere for a long time, the extra organic carbon must sink into the deep ocean (below the depth of winter mixing) or into sediments before being respired. If the bloom is eaten and respired in the surface water, the CO₂ returns to the atmosphere within weeks or months. Experiments found that only a variable and often small fraction of bloom carbon was exported to depth.

(c) Large-scale fertilisation could change the species composition of phytoplankton (favouring some, possibly toxic, species), deplete oxygen at depth where the extra organic matter decomposes, and reduce nutrients available to ecosystems downstream in ocean currents; and it is hard to verify how much carbon is sequestered. International agreements (the London Convention and Protocol) restrict ocean fertilisation to legitimate scientific research.
:::
:::

::: exercise Food-chain length {level=3}
Two hypotheses explain food-chain length: the energetic hypothesis (more productive ecosystems have longer chains) and the ecosystem-size hypothesis (larger ecosystems have longer chains). (a) Design a comparative study of lakes that could distinguish them. (b) Using [[#eq-pyramid]], explain why the energetic hypothesis predicts only a weak effect of productivity on chain length. (c) Why might ecosystem size matter?
::: solution
(a) Measure food-chain length (for example, the trophic position of the top predator, estimated from stable nitrogen isotopes, which increase by about 3–4 ‰ per trophic level) in many lakes chosen so that productivity and size vary independently — including small productive lakes and large unproductive ones. Then fit a model with both predictors and ask which explains more variation.

(b) Each additional level requires the production of the previous one to be multiplied by TE, about 0.1: to support one more level at the same production, primary production must be about ten times higher. Productivity differs among lakes by perhaps one or two orders of magnitude, so the energetic hypothesis predicts at most one or two extra levels across that whole range, and any additional level could be offset by changes in transfer efficiency.

(c) Large ecosystems hold larger populations of top predators, which are less likely to go extinct by chance; they contain more habitats, allowing more species and more levels; and they are less often disturbed throughout. Top predators also need large areas to find enough prey, so small ecosystems may simply be too small to support them.
:::
:::
