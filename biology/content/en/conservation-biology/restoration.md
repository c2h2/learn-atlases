For a century, two dams on the Elwha River in Washington State blocked the salmon that had once run from the Pacific into the mountains of the Olympic Peninsula. The Elwha Dam, completed in 1913, and the Glines Canyon Dam, completed in 1927, had no fish passage; the river's runs of Chinook, coho, pink, chum and sockeye salmon and of steelhead, once among the richest on the coast, were confined to the last few kilometres below the dams. Between 2011 and 2014 both dams were taken down — then the largest dam removal ever undertaken. Millions of cubic metres of sediment trapped behind them flowed downstream, rebuilding the river's delta and beaches. Within a year, salmon were spawning above the old dam sites for the first time in a century, and in the years that followed they spread into tributaries throughout the upper watershed, bringing marine nutrients back to the forests and to the bears, otters and birds that feed on them.

The Elwha is an ambitious example of **ecological restoration**: deliberately helping a damaged ecosystem recover. Restoration has become central to conservation because so much has already been lost: protecting what remains ([[conservation-biology/protected-areas]]) cannot by itself reverse a decline. This chapter defines restoration and its goals, explains why degraded ecosystems sometimes cannot recover by themselves, reviews what restoration achieves, and examines two of its most visible forms — the **translocation** of species and **rewilding**. It builds on succession ([[ecology/communities]]), on the population biology of small and founding populations ([[conservation-biology/small-populations]], [[conservation-biology/conservation-genetics]]) and on connectivity ([[conservation-biology/fragmentation]]).

## What restoration is

::: definition Ecological restoration {#def-restoration}
The Society for Ecological Restoration (SER) defines **ecological restoration** as "the process of assisting the recovery of an ecosystem that has been degraded, damaged, or destroyed" (*SER International Primer*, 2004). Restoration is measured against a **reference ecosystem** — a model, based on intact sites, historical records or reconstructions, of the composition, structure and function the restored ecosystem would have had without degradation, adjusted for the changes that are expected in any case. Related activities with narrower aims are:

- **rehabilitation**: repairing ecosystem processes and services (such as soil stability or water retention) without necessarily restoring the original biota;
- **reclamation**: making severely disturbed land, such as a mine site, stable and productive again, often with different vegetation;
- **remediation**: removing or neutralising contaminants.
:::

The *International Principles and Standards for the Practice of Ecological Restoration* (George Gann and colleagues, 2019) describe the goal of restoration as the recovery of six attributes — the absence of threats, physical conditions, species composition, community structure, ecosystem function and external exchanges (connections to the surrounding landscape) — each rated on a five-star scale, and they stress that restoration should be judged by outcomes over time, not by activities such as the number of trees planted.

The reference need not be a frozen historical snapshot. Climate change, extinctions and the arrival of species that cannot be removed mean that some ecosystems have been changed irreversibly; Richard Hobbs and colleagues (2006, 2009) called such systems **novel ecosystems** and argued that in some places the realistic aim is to manage them for biodiversity and function rather than to return them to a past state. Critics fear that the concept can excuse giving up on restorable systems. The practical position adopted by the SER standards is that the reference should be the native ecosystem that would be present today, allowing for unavoidable change.

## Why ecosystems do not always recover

Remove a stress, and an ecosystem will often recover by **succession** — the regrowth of forest on abandoned fields is the commonest example ([[ecology/communities]]). Restoration then consists of removing the stress and waiting, or of speeding the process up. But sometimes removing the stress is not enough, because the degraded state is itself stable.

::: proposition Alternative stable states under grazing {#prop-altstates}
Let $V$ be the biomass of vegetation, growing logistically with intrinsic rate $r$ and carrying capacity $K$, and grazed by herbivores at density $c$ whose consumption rate per herbivore saturates as a sigmoid (type III) function of $V$ (Imanuel Noy-Meir, 1975; Robert May, 1977):

$$
\frac{dV}{dt} = rV\left(1 - \frac{V}{K}\right) - c\,\frac{V^2}{h^2 + V^2}.
$$ {#eq-grazing}

Positive equilibria are the solutions of $c = g(V)$, where

$$
g(V) = r\left(1 - \frac{V}{K}\right)\frac{h^2 + V^2}{V}.
$$

For suitable parameters, $g$ has a local minimum $c_1$ and a local maximum $c_2 > c_1$. Then for $c < c_1$ there is a single stable state with high vegetation; for $c > c_2$ a single stable state with low vegetation; and for $c_1 < c < c_2$ **both** are stable, separated by an unstable threshold. The system shows **hysteresis**: once grazing pressure has pushed it past $c_2$ into the degraded state, reducing grazing below $c_2$ does not restore it; grazing must be reduced below $c_1$.
:::

::: proof
Dividing $dV/dt = 0$ by $V > 0$ gives $r(1 - V/K) = cV/(h^2 + V^2)$, that is $c = r(1 - V/K)(h^2 + V^2)/V = g(V)$. The positive equilibria for a given $c$ are the intersections of the horizontal line at height $c$ with the curve $g(V)$. Where $g$ has a local minimum and a local maximum, a line between them crosses $g$ three times. An equilibrium is stable when $dV/dt$ changes from positive to negative as $V$ increases through it: since $dV/dt = \dfrac{V^2}{h^2 + V^2}\,[g(V) - c]$ has the sign of $g(V) - c$, an equilibrium is stable where $g$ is decreasing and unstable where it is increasing. The outer two intersections lie on decreasing branches of $g$ and are stable; the middle one lies on the increasing branch between the minimum and maximum and is unstable. Outside $(c_1, c_2)$ only one intersection exists.
:::

::: example A grazing threshold {#ex-altstates}
Take $r = 1$ per year, $K = 10$, $h = 1$ (biomass in arbitrary units). (a) Numerically, $g(V)$ has a local minimum $c_1 \approx 1.79$ at $V \approx 1.14$ and a local maximum $c_2 \approx 2.60$ at $V \approx 4.78$. Describe what happens as herbivore density $c$ is slowly raised from 1.5 to 3 and then lowered back. (b) A manager finds a degraded pasture with $c = 2.2$ and vegetation at $V = 0.57$. Will removing a few herbivores, to $c = 2.0$, restore it?
::: solution
(a) Starting at $c = 1.5$, vegetation sits at the high equilibrium ($V \approx 8.2$). As $c$ rises, the high equilibrium declines gradually ($V \approx 7.3$ at $c = 2.0$, $5.8$ at $c = 2.5$). When $c$ exceeds $c_2 \approx 2.60$, the high equilibrium disappears and vegetation collapses to the low state ($V \approx 0.42$ at $c = 2.7$) — a sudden shift caused by a small change. Lowering $c$ back below 2.60 does not bring the vegetation back: the low equilibrium persists ($V \approx 0.68$ at $c = 2.0$) until $c$ falls below $c_1 \approx 1.79$, when it disappears and the vegetation recovers to the high state.

(b) No. At $c = 2.0$ the system is still bistable, and the low state ($V \approx 0.68$) is stable. Restoration requires either reducing grazing below about 1.79, or, at intermediate grazing, raising vegetation biomass above the unstable threshold (around $V = 2$ to $3$ for $c$ near 2.2) — for example by temporarily excluding herbivores with fences while vegetation regrows, after which the high state is self-sustaining even when grazing resumes at $c = 2.2$.
:::
:::

::: widget slopefield
f: y*(1 - y/10) - c*y^2/(1 + y^2)
x: 0, 30
y: 0, 10
points: 0, 0.5; 0, 2; 0, 3; 0, 9
sliders: c=2.2:1:3:0.01
caption: Vegetation biomass $V$ (vertical axis, $y$) over time in years under the grazing model [[#eq-grazing]] with $r = 1$, $K = 10$, $h = 1$ and herbivore density $c$. With the default $c = 2.2$, solutions starting low settle near 0.6 and those starting high settle near 6.9: two stable states. Raise $c$ past 2.6 and the high state vanishes; lower it below 1.8 and the low state vanishes. Click to start new trajectories near the threshold, about $V = 2.6$ at the default.
:::

Alternative stable states are known, or strongly suspected, in shallow lakes (clear water with rooted plants versus turbid water dominated by phytoplankton, each state reinforced by its own feedbacks; Marten Scheffer and colleagues, 2001), in coral reefs that shift to seaweed dominance, in kelp forests and sea-urchin barrens ([[ecology/communities]]), in semi-arid grasslands and shrublands, and in savannas and forests maintained by fire. In each case restoration must overcome a feedback, not just remove a stress. Shallow lakes have been restored by **biomanipulation** — temporarily removing plankton-eating and bottom-feeding fish, so that zooplankton can graze down the algae and the water clears enough for plants to return — but only where nutrient loading has also been reduced; otherwise the lake slips back.

::: intuition A ball in a landscape of valleys
Picture the state of an ecosystem as a ball rolling in a landscape whose valleys are stable states. Stresses such as grazing or nutrient loading tilt the landscape; the valley the ball is in may become shallower until it vanishes and the ball rolls into another. Undoing the tilt does not lift the ball back over the ridge; you must either tilt the landscape much further the other way, so that the degraded valley vanishes in its turn, or push the ball over the ridge — the temporary fencing, planting or fish removal that restoration ecologists call "kick-starting" recovery.
:::

## What restoration achieves

Restoration works, but rarely completely. José María Rey Benayas and colleagues (2009) reviewed 89 assessments across many ecosystem types and found that restoration increased biodiversity by an average of 44 % and ecosystem services by 25 % relative to degraded sites, but that both remained lower than in intact reference ecosystems. David Moreno-Mateos and colleagues (2012) analysed 621 restored and created wetlands and found that, on average, their biological structure (dominated by plant assemblages) and their biogeochemical functioning (such as carbon storage) remained about a quarter lower than in reference wetlands, even a century after restoration. Recovery is slowest for the slowest components: old trees, soil carbon, specialist species with poor dispersal.

::: example How long does forest recovery take? {#ex-recovery}
Lourens Poorter and colleagues (2016) found that Neotropical secondary forests regrowing on abandoned land recovered 90 % of the above-ground biomass of old-growth forest in a median of 66 years. (a) Assuming biomass approaches its maximum as $B(t) = B_\mathrm{max}(1 - e^{-kt})$, estimate $k$. (b) What fraction of old-growth biomass does this model predict after 20 and 30 years? (c) Why is it misleading to treat the recovery of biomass as recovery of the forest?
::: solution
(a) $1 - e^{-66k} = 0.9$ gives $e^{-66k} = 0.1$ and $k = \ln10/66 = 0.0349$ per year.

(b) After 20 years, $1 - e^{-0.698} = 0.50$; after 30 years, $1 - e^{-1.047} = 0.65$. The model is an illustrative simplification (real recovery curves are more sigmoid and vary greatly with rainfall, soil and land-use history), but it captures the observation that secondary forests accumulate carbon rapidly in their first decades.

(c) Biomass recovers faster than many other attributes. Species composition, especially of old-growth specialists and of large, slow-growing or animal-dispersed trees, may take centuries to approach the reference; the structure of very large trees, dead wood and epiphytes takes even longer; and specialist animals recolonise only if source populations remain nearby. A secondary forest with old-growth biomass may still lack much of its biodiversity.
:::
:::

**Passive** restoration (removing the stress and allowing natural regeneration) and **active** restoration (planting, sowing, reintroducing species, reshaping the land) form a continuum. Natural regeneration is cheap and, where seed sources and soil remain, often effective: a meta-analysis by Renato Crouzeilles and colleagues (2017) found that naturally regenerating tropical forests achieved biodiversity and vegetation-structure outcomes at least as good as actively restored ones on average, although the comparison is confounded by the fact that active restoration tends to be used where degradation is worst. Active restoration is needed where barriers prevent recovery — no seed sources, compacted or eroded soil, dominance by invasive grasses, alternative stable states.

::: warning "Planting trees is restoring ecosystems"
Tree planting is one tool, suited to places that were forest. Planted on native grasslands, savannas or peatlands, trees *destroy* biodiversity and can reduce water supplies and soil carbon: Joseph Veldman and colleagues (2015) warned that global afforestation initiatives risked targeting ancient grassy biomes that had been mistaken for degraded forest. Large plantations of a single non-native species store carbon but support little native biodiversity, and young plantations can store less carbon than the vegetation cleared for them. Restoration targets an ecosystem, not a number of trees, and the native reference decides what that ecosystem is.
:::

::: application Restoration in global policy
Restoration has become a major policy goal. The Bonn Challenge (2011) set a goal of bringing 150 million hectares of degraded and deforested land into restoration by 2020 and 350 million by 2030; the United Nations declared 2021–2030 the **Decade on Ecosystem Restoration**; Target 2 of the Kunming–Montreal Global Biodiversity Framework (2022) calls for at least 30 % of areas of degraded ecosystems to be under effective restoration by 2030; and the European Union's Nature Restoration Regulation, in force since August 2024, requires member states to put restoration measures in place on at least 20 % of the EU's land and sea areas by 2030. Where restoration is done matters enormously: Bernardo Strassburg and colleagues (2020) estimated that restoring 15 % of converted lands in the global priority areas they identified could avoid about 60 % of expected extinctions while sequestering a large quantity of carbon, and that choosing areas by biodiversity, carbon and cost together was several times more cost-effective than choosing at random.
:::

::: example Restoration and the extinction debt {#ex-debt}
A region once entirely forested held 100 forest-endemic bird species. Only 20 % of the forest remains, but only 10 species have so far gone extinct. The species–area exponent is $z = 0.25$. (a) How many species does the species–area relationship predict the region will eventually hold if nothing changes? (b) How many if forest is restored to cover 30 % of the region before the debt is paid? (c) Why does the timing of restoration matter?
::: solution
(a) $S = 100\times0.2^{0.25} = 66.9$: about 67 species at equilibrium, so a further $90 - 67 = 23$ species are committed to extinction — an extinction debt ([[ecology/biogeography]]).

(b) $S = 100\times0.3^{0.25} = 74.0$: restoring a tenth of the region raises the equilibrium by about 7 species, cancelling almost a third of the debt.

(c) The calculation applies only to species that are still present: restoration can prevent extinctions that have not happened yet, but cannot reverse those that have. Restored forest also takes decades to become suitable for forest specialists ([[#ex-recovery]]), so restoration must start while the debt is still large and the committed species still survive in the remnants. Restoring forest adjacent to remnants, or reconnecting them, is likely to help most, because it benefits the populations that are most at risk.
:::
:::

::: widget plot
f: 100*x^z; 90
x: 0, 1
y: 0, 100
sliders: z=0.25:0.1:0.4:0.01
labels: \text{equilibrium species } 100A^z; \text{species still present}
caption: The species–area calculation of [[#ex-debt]]: equilibrium number of endemic species (vertical) against the fraction of the region forested (horizontal), with the 90 species still present shown as a horizontal line. At 20 % forest cover the gap between the line and the curve is the extinction debt; moving to the right along the curve shows how many committed extinctions restoration could avert. Larger $z$ means a larger debt and a larger reward for restoration.
:::

## Translocations: putting species back

::: definition Conservation translocation {#def-translocation}
The IUCN *Guidelines for Reintroductions and Other Conservation Translocations* (2013) define a **conservation translocation** as the intentional movement and release of living organisms where the primary objective is a conservation benefit. They distinguish:

- **population restoration**, within the species' indigenous range: **reinforcement** (adding individuals to an existing population, for demographic or genetic reasons, [[conservation-biology/conservation-genetics#def-rescue]]) and **reintroduction** (re-establishing a population where the species has disappeared);
- **conservation introduction**, outside the indigenous range: **assisted colonisation** (to avoid extinction, for example under climate change, [[conservation-biology/invasions-climate]]) and **ecological replacement** (to restore an ecological function lost through extinction, using a related species).

The guidelines require a feasibility study, an assessment of risks (including disease and invasiveness), the removal of the original causes of decline, a monitoring programme and an exit strategy.
:::

Reintroductions have recovered several species that were Extinct in the Wild. The **Arabian oryx** (*Oryx leucoryx*) was exterminated by hunting, the last wild animals being shot in 1972; descendants of a captive "World Herd" were released in Oman from 1982 and later in Saudi Arabia, Israel, Jordan and the United Arab Emirates, and in 2011 the species became the first to be moved on the Red List from Extinct in the Wild back to Vulnerable. **Przewalski's horse**, last seen in the wild in Mongolia in 1969, was reintroduced there from 1992 and is now listed as Endangered. The **California condor** declined to 22 birds by 1982; all the remaining wild condors were captured by 1987, and captive-bred birds have been released in California, Arizona, Utah and Baja California since 1992. By the 2020s there were more than 500 condors, over half of them flying free — but the wild population still depends on intensive management because of continued lead poisoning from ammunition in carcasses, which shows that releasing animals is pointless unless the cause of decline is removed.

Why do translocations fail? Brad Griffith and colleagues (1989) found that translocations of game species succeeded much more often than those of threatened species, and that releases of more individuals, of wild-caught rather than captive-bred animals, into high-quality habitat in the core of the historical range, succeeded more often. The reasons follow from earlier chapters: small releases are vulnerable to demographic stochasticity and Allee effects; captive-bred animals may lack the behaviours needed to find food, avoid predators and migrate, and may have adapted to captivity ([[conservation-biology/conservation-genetics]]); and if the original threat persists, the released animals die of it.

::: example Planning a release {#ex-release}
A reintroduced population is founded with $N_0$ animals and, once established, is expected to grow logistically with $r = 0.15$ per year to a carrying capacity of $K = 400$. (a) How long will it take to reach 200 animals from 20 founders, and from 40? (b) In its first years the population also faces demographic stochasticity with per-capita rates $b = 0.4$ and $d = 0.25$ per year. Estimate its chance of eventual extinction from demographic stochasticity alone for each release size. (c) Recommend a release strategy.
::: solution
(a) The logistic solution ([[ecology/population-growth]]) gives the time to grow from $N_0$ to $N$ as

$$
t = \frac1r\ln\frac{N(K - N_0)}{N_0(K - N)}.
$$

From 20: $t = \tfrac{1}{0.15}\ln\dfrac{200\times380}{20\times200} = 6.67\ln19 = 19.6$ years. From 40: $t = 6.67\ln\dfrac{200\times360}{40\times200} = 6.67\ln9 = 14.6$ years.

(b) Using [[conservation-biology/small-populations#prop-birthdeath]], $P_\mathrm{ext} = (d/b)^{N_0} = 0.625^{N_0}$: for 20 founders, $0.625^{20} = 8.3\times10^{-5}$; for 40, $7\times10^{-9}$. Demographic stochasticity alone is a small risk at these sizes. (This ignores environmental stochasticity, Allee effects and the high mortality typical of animals in their first months after release, which together make the real risk much larger.)

(c) Release as many animals as can be spared without harming the source, preferably over several years (spreading the risk of a bad year and allowing the release method to be refined); prefer wild-caught or well-conditioned animals; release into the best habitat with the threat removed; and monitor survival and breeding closely. Doubling the release shortens the time to 200 animals by five years — years during which the population is small and vulnerable.
:::
:::

::: quiz
A captive-breeding programme has released 300 hand-reared birds of a threatened species over ten years into a forest where they disappeared in the 1980s. Survival in the first year after release is 10 %, and no breeding has been recorded. What should be done first?
- [ ] Release more birds each year to compensate for the mortality.
- [x] Find out what is killing the released birds and whether the original cause of the species' disappearance has been removed.
- [ ] Stop the programme, because reintroductions never work for birds.
- [ ] Switch to releasing eggs instead of birds.
::: solution
Releasing more birds into the same conditions would repeat the failure. The IUCN guidelines require the original threat to be identified and addressed before release, and monitoring is meant to reveal causes of failure: predators, disease, lack of foraging skills in hand-reared birds, or habitat that is no longer suitable. Only once the cause is known can the method be changed — for example by predator control, soft-release enclosures, pre-release training, or using wild-caught birds.
:::
:::

## Rewilding

**Rewilding** is a family of approaches that aim to restore self-sustaining ecosystems with minimal ongoing human management, typically by restoring natural processes — grazing and browsing by large herbivores, predation, flooding, fire, dispersal — rather than targeting particular species or habitats. Michael Soulé and Reed Noss (1998) summarised an early North American version as "cores, corridors and carnivores": large protected cores, connected by corridors, with their top predators restored. **Trophic rewilding** (Jens-Christian Svenning and colleagues, 2016) restores missing species at the top of food webs, or large herbivores, to re-establish their regulatory effects. **Passive rewilding** lets ecosystems develop on land abandoned by farming, which is happening across large parts of Europe as rural populations decline.

::: application Wolves, beavers and the limits of a story
The reintroduction of grey wolves (*Canis lupus*) to Yellowstone in 1995–1996, with 31 animals from Canada and 10 more from Montana in 1997, is the most famous rewilding case. Wolves reduced elk numbers and changed their behaviour, and some studies (William Ripple, Robert Beschta and colleagues) reported recovery of willows and aspen along streams as a result — a **trophic cascade** ([[ecology/communities]]). Others found weaker or no effects on aspen recruitment, and attributed vegetation changes partly to other factors: drought, human hunting of elk outside the park, the recovery of bears and cougars, and the loss of beavers, whose dams had raised water tables. The size of the cascade is still debated, and the honest summary is that wolves have changed Yellowstone, but not as simply as popular accounts suggest.

The Eurasian beaver (*Castor fiber*), hunted out of Britain by the sixteenth century, illustrates how a single species can rebuild habitat. Beaver dams slow and store water, create wetlands, trap sediment and nutrients, and reduce flood peaks downstream, benefiting amphibians, invertebrates and fishes. After an official trial at Knapdale from 2009 and the spread of unofficial populations, beavers became a protected species in Scotland in 2019 and in England in 2022, and licensed wild releases began in England in 2025. Their return has required managing conflicts with landowners whose fields they flood — a reminder that rewilding happens in landscapes where people live ([[conservation-biology/people-and-policy]]).
:::

Rewilding has generated some of conservation's sharpest disputes. At the Oostvaardersplassen in the Netherlands, cattle, horses and red deer were introduced from the 1980s and largely left to their own devices; their populations grew to thousands, and in the hard winter of 2017–2018 large numbers starved or were shot to prevent starvation, leading to public outcry and a change of management. **Pleistocene rewilding** — proposals by Josh Donlan and colleagues (2005) to introduce African and Asian elephants, lions and cheetahs to North America as proxies for species lost in the late Pleistocene ([[conservation-biology/extinction]]) — has been criticised as risky and divorced from present ecosystems. Smaller-scale **ecological replacements** have been more successful: on Île aux Aigrettes off Mauritius, introduced Aldabra giant tortoises (*Aldabrachelys gigantea*) have taken over the grazing and seed-dispersal roles of the extinct Mauritian giant tortoises, helping the regeneration of the endangered ebony trees whose large fruits they eat. And at the Knepp Estate in southern England, a former arable and dairy farm of about 1400 ha left since 2001 to free-roaming cattle, ponies, pigs and deer, scrub and wood pasture developed, and populations of species such as nightingales, turtle doves and purple emperor butterflies rose markedly, making it a reference point for rewilding on farmland.

::: history
Restoration has deep roots in forestry and soil conservation, but its scientific form began with the restoration of tallgrass prairie at the University of Wisconsin Arboretum from 1935, under the guidance of Aldo Leopold and others. The field took the name *restoration ecology* in the 1980s; William Jordan, Michael Gilpin and John Aber's *Restoration Ecology: A Synthetic Approach to Ecological Research* (1987) argued that restoring an ecosystem was the "acid test" of ecological understanding, and the Society for Ecological Restoration was founded in 1988. The theory of alternative stable states (Richard Lewontin, 1969; Crawford Holling, 1973; Robert May, 1977) and its demonstration in lakes and reefs explained why some restorations fail. In species recovery, the release of Arabian oryx in Oman (1982), of California condors (1992) and of wolves into Yellowstone (1995) became landmarks, and the IUCN's reintroduction guidelines (1998, revised 2013) codified practice. Rewilding entered the scientific literature through Soulé and Noss (1998) and became a broad movement in Europe from the 2010s.
:::

## Where this leads

Every chapter so far has ended, sooner or later, with people: who uses the land, who pays for protection, who decides which species to move and which herbivores to cull. The final chapter, [[conservation-biology/people-and-policy]], examines the economics, governance and international agreements through which conservation actually happens.

::: summary
- **Ecological restoration** assists the recovery of degraded ecosystems towards a **reference** ([[#def-restoration]]); rehabilitation, reclamation and remediation have narrower goals; **novel ecosystems** may require different aims.
- Ecosystems can have **alternative stable states** with **hysteresis** ([[#prop-altstates]]): degraded states can persist after the stress is reduced, and restoration must reverse a feedback (by reducing the stress well below the collapse threshold or by "kick-starting" recovery).
- Restoration typically improves biodiversity and services substantially but does not fully reach reference levels, even after decades; biomass recovers faster than composition ([[#ex-recovery]]). Natural regeneration is often effective where seed sources remain. Tree planting is not restoration in grassy biomes.
- **Conservation translocations** ([[#def-translocation]]) include reinforcement, reintroduction, assisted colonisation and ecological replacement; success improves with larger releases, wild-caught animals, good habitat and removal of the original threat. The Arabian oryx, Przewalski's horse and California condor show both success and continuing dependence on management.
- **Rewilding** restores processes rather than lists of species — large herbivores, predators, beavers, flooding — with contested outcomes (the Yellowstone cascade, the Oostvaardersplassen) as well as successes (beavers, ecological replacements, Knepp).
- Policy targets: UN Decade on Ecosystem Restoration (2021–2030), Kunming–Montreal Target 2 (30 % of degraded areas under effective restoration by 2030) and the EU Nature Restoration Regulation (2024).
:::

## Exercises

::: exercise Recovery rate {level=1 check="ln(10)/40"}
A restored grassland recovers 90 % of the plant species richness of reference sites in 40 years. If recovery follows $R(t) = 1 - e^{-kt}$, what is $k$ per year?
::: solution
$e^{-40k} = 0.1$, so $k = \ln10/40 = 0.058$ per year.
:::
:::

::: exercise Logistic recovery {level=1 check="(1/0.2)*ln(9)"}
A reintroduced population grows logistically with $r = 0.2$ per year and $K = 1000$, starting from 100 animals. How many years does it take to reach $K/2$?
::: solution
$t = \frac1r\ln\dfrac{500\times900}{100\times500} = 5\ln9 = 11.0$ years.
:::
:::

::: exercise Kinds of translocation {level=1}
Classify each as reinforcement, reintroduction, assisted colonisation or ecological replacement: (a) releasing Texas pumas into the Florida panther population; (b) releasing captive-bred Arabian oryx in Oman; (c) introducing Aldabra tortoises to a Mauritian islet; (d) moving a butterfly 65 km north of its range in anticipation of climate change.
::: solution
(a) Reinforcement (for genetic rescue). (b) Reintroduction (within the indigenous range, where the species had been extirpated). (c) Ecological replacement (a related species restoring a function lost with an extinct one). (d) Assisted colonisation (outside the indigenous range, to avoid extinction under climate change).
:::
:::

::: exercise Hysteresis {level=2}
In the grazing model of [[#ex-altstates]], a rangeland has been degraded by grazing at $c = 2.8$. (a) What state is it in? (b) The manager reduces grazing to $c = 2.3$. What happens? (c) Propose two different interventions that would restore the high-vegetation state, and explain which is likely to be cheaper.
::: solution
(a) For $c > c_2 \approx 2.60$, only the low state exists: the vegetation is degraded (biomass about 0.4).

(b) At $c = 2.3$ the system is bistable, and since it is in the low state it stays there (biomass about 0.53). Reducing grazing has little visible effect, which might wrongly suggest that grazing was not the cause.

(c) Reduce grazing below $c_1 \approx 1.79$ until the vegetation recovers, then allow grazing to return to an intermediate level below 2.6 — the high state will persist. Or fence out herbivores (or reseed) temporarily to push biomass above the unstable threshold, then resume grazing at 2.3. The second keeps grazing income for most of the land and needs only a temporary, localised intervention, so it is likely to be cheaper, provided the threshold biomass can be reached. In either case, keeping $c$ below about 2.6 afterwards is essential to avoid another collapse.
:::
:::

::: exercise Interpreting restoration outcomes {level=2}
A study compares 30 restored wetlands, aged 5 to 60 years, with 15 natural reference wetlands. The density of breeding waterbirds in restored wetlands equals the reference after about 10 years, plant species richness reaches 80 % of the reference after 30 years and stops increasing, and soil organic carbon reaches 40 % of the reference after 60 years and is still rising. (a) Rank the three attributes by recovery rate and explain the ranking. (b) Is the restoration a success? (c) What is a weakness of using wetlands of different ages to infer a trajectory over time?
::: solution
(a) Waterbirds fastest (mobile animals colonise quickly once open water and food are present); plant richness intermediate (limited by dispersal of wetland plants and by the persistence of weeds); soil carbon slowest (it accumulates over centuries through slow decomposition of organic matter).

(b) Partially. The restoration has recovered the attribute most visible to the public, but plant composition appears to have stalled below the reference — possibly an alternative state or a dispersal barrier — and soil carbon, important for climate regulation, is far from recovered. Success depends on the objectives set at the start; the SER standards would rate each attribute separately.

(c) This **chronosequence** (space-for-time substitution) assumes that the young and old wetlands differ only in age. But older restorations may have been done with different methods, on different soils, or at sites chosen for different reasons; and failed old restorations may not have been included. Following the same sites over time is more reliable.
:::
:::

::: exercise Choosing where to restore {level=2}
A conservation agency can restore 1000 ha of forest in one of three places: (A) adjacent to a large reserve, on degraded pasture with seed sources nearby, cost 1 million dollars; (B) linking two isolated reserves of 500 ha each, on degraded pasture, cost 1.5 million; (C) in an urban fringe with no forest nearby but strong public support, cost 0.8 million. (a) Which option would you expect to gain the most species? (b) Which is most cost-effective for biodiversity? (c) What arguments could justify option C?
::: solution
(a) Probably B: it increases the area of the isolated reserves and connects them, raising colonisation and reducing extinction for both (as in the Levins model of [[conservation-biology/fragmentation]]), and may repay part of their extinction debt. A adds area to a reserve that is already large, so by the species–area relationship the gain per hectare is smaller, though recovery will be quick.

(b) It depends on the size of B's gain relative to its higher cost: A's nearby seed sources make it cheap and fast (natural regeneration may suffice), so it might give more species per dollar in the short term, while B may avert more extinctions in the long term. A formal comparison would estimate expected species retained or extinctions averted per dollar for each.

(c) Biodiversity benefit is not the only objective: restoring nature near cities provides recreation, health benefits, flood control and environmental education to many people, and builds public support for conservation elsewhere. These benefits are real but should be stated as such rather than claimed as biodiversity gains.
:::
:::

::: exercise A release that keeps failing {level=3}
Three releases of captive-bred hares, of 15 animals each, into a restored grassland have all died out within two years. Radio-tracking shows that 70 % of deaths are due to predation by foxes in the first two months after release. (a) Using a birth–death model with $b = 1.2$ and $d = 1.0$ per year, estimate the probability that a release of 15 would go extinct by demographic chance alone, and comment. (b) The post-release mortality is a large additional death rate concentrated in the first months. How does this change the effective founding size? (c) Suggest three changes to the programme.
::: solution
(a) $(d/b)^{15} = (1.0/1.2)^{15} = 0.833^{15} = 0.065$. Demographic chance alone would make failure of all three releases very unlikely ($0.065^3 \approx 3\times10^{-4}$); the failures indicate a systematic problem, not bad luck.

(b) If, say, 80 % of released hares die before they can breed, the effective founding population is about 3, for which $(0.833)^3 = 0.58$ — a high chance of extinction even after the initial losses. Post-release mortality reduces the number of founders that actually enter the breeding population, which is the $N_0$ that matters.

(c) Address the predation: fox control around the release site, at least temporarily; **soft release** in predator-proof enclosures, where hares can acclimatise and breed before being given access to the wider area; release more animals at once, or in quick succession, to swamp predators and to avoid small-population effects; train captive-bred hares to recognise predators before release or use wild-caught hares from a healthy population; and increase cover in the restored grassland. Monitoring should continue so that the effect of each change can be evaluated.
:::
:::

::: exercise Designing a rewilding experiment {level=3}
A government proposes to reintroduce lynx to a forested upland where deer densities are high and tree regeneration is poor. Supporters claim that lynx will reduce deer and restore the forest; opponents fear for sheep farms. (a) What predictions follow from the trophic-cascade hypothesis, and how could they be tested? (b) Why might the cascade not occur even if lynx establish? (c) What non-ecological issues must the plan address?
::: solution
(a) Lynx should reduce deer density and/or change deer behaviour (avoidance of risky areas), which should increase tree seedling survival and regeneration, particularly in places where deer feel most at risk. A before–after–control–impact design comparing the release area with similar uplands without lynx, with deer counts, browsing surveys and fenced exclosures (which show the maximum regeneration possible without browsing), would test each step of the chain.

(b) Lynx may be too few to depress a large deer population, especially if deer are also fed or hunted by people; deer may respond by shifting habitat rather than declining; tree regeneration may be limited by other factors (seed supply, soils, voles, competing vegetation); and human culling of deer may already be the main control. Yellowstone shows that cascades can be weaker and more context-dependent than expected.

(c) The legal status of the lynx and of releases; the risk to sheep and a scheme for prevention (guard dogs, fencing) and compensation; consultation with farmers, landowners, hunters and local communities and their consent; the welfare of the released animals; disease screening; monitoring and an agreed plan for what happens if lynx cause unacceptable conflict or fail to establish. As the next chapter discusses, rewilding succeeds or fails as much on social acceptance as on ecology.
:::
:::
