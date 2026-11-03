In 1963 Robert Paine began removing starfish from a stretch of rocky shore at Mukkaw Bay, on the Pacific coast of Washington State. Every few weeks he prised off every *Pisaster ochraceus* he could find in an area about 8 m long and 2 m high, and threw them back into the sea. On an adjacent control area he left them alone. Within months the mussel *Mytilus californianus*, the starfish's main prey, began spreading over the cleared area, smothering and crowding out the barnacles, limpets, chitons and seaweeds. By 1966 the number of species in the removal area had fallen from 15 to 8. Removing one predator, which ate only a few of the species present, had halved the diversity of the community.

Paine's experiment is a demonstration that species in a community are connected: the effect of one can pass through others to reach species it never touches. This chapter treats the **community** as a whole. We first say how its diversity is measured. We then introduce the third great class of interaction, **mutualism**, and assemble interactions into **food webs**, with their keystone species and trophic cascades, and ask whether complexity makes communities more or less stable. We follow communities through time as they recover from disturbance by **succession**, and end with the question in the chapter title: what controls how many species a community holds? Competition and predation, the pairwise building blocks, were treated in [[ecology/competition]] and [[ecology/predation-parasitism]].

## What is a community?

::: definition Community, richness and diversity {#def-community}
An ecological **community** is the set of populations of different species that occur together in space and time and potentially interact. In practice, communities are usually delimited by a taxonomic group (the bird community of a wood) or a place (the community of a rock pool). **Species richness** $S$ is the number of species present. **Species diversity** combines richness with **evenness**, how equally individuals (or biomass) are distributed among species. Given the proportions $p_i$ of individuals belonging to each species $i = 1, \ldots, S$:

- the **Shannon index** is $H' = -\sum_i p_i\ln p_i$;
- the **Simpson index** is $D = \sum_i p_i^2$, the probability that two individuals drawn at random (with replacement) belong to the same species; diversity is reported as $1 - D$ (the Gini–Simpson index) or $1/D$;
- **Pielou's evenness** is $J = H'/\ln S$, which equals 1 when all species are equally abundant.
:::

Both indices weight a species by its abundance, but differently: the Simpson index is dominated by the commonest species, the Shannon index gives more weight to rare ones, and richness counts every species equally however rare. A useful way to compare them is to convert each into an **effective number of species** — the number of equally abundant species that would give the same value: $e^{H'}$ for Shannon and $1/D$ for Simpson. These "Hill numbers", introduced by Mark Hill in 1973, have the same units (species) and can be compared directly.

::: example Comparing two communities {#ex-diversity}
Two plots each contain 100 beetles of 4 species. In plot A the counts are 25, 25, 25 and 25; in plot B they are 85, 5, 5 and 5. Calculate richness, the Shannon index, the Gini–Simpson index, evenness and the effective numbers of species for each.
::: solution
Both have $S = 4$.

Plot A: each $p_i = 0.25$, so $H' = -4\times0.25\ln0.25 = \ln4 = 1.386$; $D = 4\times0.25^2 = 0.25$, so $1 - D = 0.75$; $J = 1.386/\ln4 = 1$; effective numbers $e^{1.386} = 4.0$ and $1/D = 4.0$.

Plot B: $H' = -(0.85\ln0.85 + 3\times0.05\ln0.05) = -(0.85\times(-0.1625) + 3\times0.05\times(-2.996)) = 0.138 + 0.449 = 0.588$; $D = 0.85^2 + 3\times0.05^2 = 0.7225 + 0.0075 = 0.73$, so $1 - D = 0.27$; $J = 0.588/1.386 = 0.42$; effective numbers $e^{0.588} = 1.80$ and $1/D = 1.37$.

The two plots have the same richness, but plot B is far less diverse: by the Shannon measure it is like a community of 1.8 equally common species, by the Simpson measure like one of 1.4. The Simpson value is lower because it is dominated by the very common species.
:::
:::

::: widget plot
f: -(x*ln(x) + (1 - x)*ln(1 - x)); 1 - x^2 - (1 - x)^2
x: 0.001, 0.999
y: 0, 0.8
vlines: 0.5
labels: H'\ (\text{Shannon}); 1 - D\ (\text{Gini–Simpson})
caption: Diversity of a community of two species against the proportion $x$ of individuals belonging to the first. Both indices are greatest when the two species are equally common ($x = 0.5$), where $H' = \ln2 \approx 0.69$ and $1 - D = 0.5$, and fall to zero as one species takes over. Hover to read values. Notice how slowly the Shannon index falls near $x = 0.5$: a community of 70 % and 30 % still has $H' = 0.61$, 88 % of the maximum.
:::

Because rare species are easily missed, observed richness depends on sampling effort: the more individuals counted, the more species found. **Species accumulation curves** (species found against individuals or samples) and **rarefaction**, which compares communities at a common sample size, are used to make fair comparisons, and statistical estimators extrapolate to the number of species present but unseen.

## Mutualism

::: definition Mutualism and other interactions {#def-mutualism}
Pairwise interactions between species can be classified by the sign of the effect of each on the other's fitness or population growth: **competition** $(-,-)$, **predation, herbivory and parasitism** $(+,-)$, **mutualism** $(+,+)$, **commensalism** $(+,0)$ and **amensalism** $(-,0)$. A mutualism is **obligate** for a partner that cannot survive or reproduce without it, and **facultative** if it can. When partners live in close physical association for much of their lives the relationship is called a **symbiosis**, a term that covers parasitic as well as mutualistic associations.
:::

Mutualisms are everywhere. The great majority of land plants form **mycorrhizas** with fungi, which extend the plant's root system and supply phosphorus and other nutrients in exchange for sugars. Legumes house nitrogen-fixing **rhizobia** in root nodules ([[ecology/nutrient-cycles]]). Reef-building corals depend on photosynthetic dinoflagellates of the family Symbiodiniaceae in their tissues; when water is too warm the partnership breaks down, the corals expel the algae and "bleach", and if the heat persists they starve. **Pollination** and **seed dispersal** by animals involve most flowering plants. The guts of herbivores, from termites to cows, contain microbial communities without which they could not digest cellulose (see [[microbiology/microbes-and-hosts]]).

Mutualisms are conveniently classified by what is exchanged: resources for resources (mycorrhizas), resources for services (pollination, in which nectar pays for pollen transport), or services for services (the cleaner fish that removes parasites from a larger fish, which in turn does not eat it). A classic example of services for resources is the bull's-horn acacia of Central America (*Vachellia cornigera*, formerly *Acacia cornigera*), which provides hollow thorns for nesting and protein-rich food bodies to ants of the genus *Pseudomyrmex*; the ants attack herbivores and clear competing vegetation. Daniel Janzen showed in 1966 that acacias from which the ants were removed suffered heavy herbivory and grew poorly.

Mutualisms are not cooperative arrangements between well-meaning partners: each partner is selected to obtain the most benefit at the least cost, and mutualisms are vulnerable to **cheaters** — nectar robbers that bite through flowers without pollinating them, or rhizobia that take carbon but fix little nitrogen. Their stability depends on mechanisms such as partner choice and sanctions, which are treated, with the coevolution of mutualists, in [[evolution/coevolution]].

What does mutualism do to population dynamics? If the Lotka–Volterra competition equations of [[ecology/competition#prop-lv-competition]] are given positive interaction terms, so that each species *raises* the other's growth, then the populations reach a stable equilibrium above both carrying capacities when the mutual benefits are weak ($\alpha_{12}\alpha_{21} < 1$), but grow without bound when they are strong — what Robert May called "an orgy of mutual benefaction". Real mutualisms are bounded by other limits — the benefit saturates, or each partner is limited by something the other does not provide — and models of mutualism therefore need saturating benefits.

## Food webs

### Trophic structure

A **food chain** describes who eats whom in a linear sequence, and the position of a species in it is its **trophic level**: primary producers (plants, algae, photosynthetic bacteria) form the first level, herbivores the second, carnivores eating herbivores the third, and so on. Decomposers and detritivores feed on dead material from all levels. Real feeding relations form a **food web**: most consumers eat several kinds of prey, many feed at more than one level (**omnivory**), and some eat members of their own species.

::: definition Food web descriptors {#def-food-web}
A food web with $S$ species (or "trophic species", groups of species with the same predators and prey) and $L$ feeding links is described by its **linkage density** $L/S$, the average number of links per species, and its **connectance** $C = L/S^2$, the fraction of all possible directed links that are realised. The **length of a food chain** is the number of links from a basal species to a top predator; the trophic position of a consumer is one plus the average trophic position of its prey (weighted by their importance in its diet).
:::

Food chains are short. In most webs the longest chains have four to six links, and most energy passes through two or three. A popular explanation is energetic — at each transfer only about 10 % of energy is passed on, so there is too little left to support another level — and it is discussed with the evidence in [[ecology/ecosystem-energetics]]; but chain length correlates only weakly with productivity, and ecosystem size and the history of disturbance also matter.

::: example Connectance of a food web {#ex-connectance}
A study of a stream food web resolves 25 trophic species with 75 feeding links. Calculate the linkage density and connectance. If a second web with 100 species has the same linkage density, what is its connectance?
::: solution
Linkage density $L/S = 75/25 = 3$ links per species; connectance $C = L/S^2 = 75/625 = 0.12$. The second web has $L = 3\times100 = 300$ links and $C = 300/10\,000 = 0.03$. If linkage density stays constant as webs get larger, connectance falls in inverse proportion to $S$. Compilations of well-resolved food webs suggest that connectance is roughly constant (most often between about 0.05 and 0.3) rather than linkage density, so larger webs have more links per species.
:::
:::

### Keystone species and trophic cascades

Paine coined the term **keystone species** for *Pisaster*: a species whose removal causes changes in the community far out of proportion to its abundance or biomass, as the removal of a keystone collapses an arch. The mechanism at Mukkaw Bay was that the starfish preferentially ate the competitively dominant mussel, preventing it from monopolising space and so allowing weaker competitors to persist. This is **keystone predation**: a predator increasing diversity by preying on a dominant competitor.

When predators control herbivores which control plants, the effect of the top predator reaches the plants: a **trophic cascade**. The best known example involves sea otters (*Enhydra lutris*) in the North Pacific. James Estes and John Palmisano (1974) compared islands in the Aleutians where otters had recovered from the fur trade with islands where they were still absent. Where otters were present, sea urchins were small and scarce and kelp forests flourished; where otters were absent, urchins were abundant and grazed the kelp to "urchin barrens". When killer whales began eating sea otters in the 1990s, otter numbers fell, urchins increased and kelp declined, as the cascade predicts (Estes and colleagues, 1998).

::: definition Top-down and bottom-up control {#def-top-down}
A population is under **top-down control** when its abundance is set mainly by its consumers (predators, parasites, herbivores), and under **bottom-up control** when it is set mainly by its resources. A **trophic cascade** is a top-down effect that propagates across more than one trophic level, so that, for example, an increase in predators reduces herbivores and thereby increases plants.
:::

The relative importance of top-down and bottom-up control varies. Cascades are strongest in aquatic systems — in lakes, adding piscivorous fish can reduce planktivorous fish, increase zooplankton and clear the water of algae, a technique called **biomanipulation** — and in systems with few, strongly interacting species. On land, the evidence is often weaker and more contested. The reintroduction of grey wolves (*Canis lupus*) to Yellowstone National Park in 1995–1996 was followed by changes in the numbers and behaviour of elk and by the regrowth of some aspen and willow, which has been widely presented as a trophic cascade; but researchers continue to debate how much of the vegetation change was caused by wolves rather than by other predators, hunting, climate and the changed hydrology of streams.

Some species have large effects on communities not by eating but by modifying the physical environment: beavers damming streams, corals and trees creating structure, earthworms mixing soil. These are called **ecosystem engineers**.

::: warning "Keystone species are the most abundant or important ones"
A keystone species is defined by an effect disproportionate to its abundance. Abundant species with large effects simply because they are abundant — the dominant trees of a forest, the reef-building corals — are better called **dominant** or **foundation** species. And keystone status is a property of a species *in a particular community*: *Pisaster* is a keystone predator on wave-exposed shores where mussels dominate, but in other places its removal has much smaller effects.
:::

### Complexity and stability

Are complex communities, with many species and many links, more stable than simple ones? The ecologists of the 1950s, notably Robert MacArthur and Charles Elton, argued that they were: with more pathways for energy, the loss or fluctuation of any one species should matter less. In 1972 Robert May tested the argument mathematically and reached the opposite conclusion.

::: proposition May's stability criterion {#prop-may}
Consider a community of $S$ species at an equilibrium, linearised so that small deviations $x$ evolve as $dx/dt = Ax$. Suppose each species is self-regulating (diagonal entries of $A$ equal to $-1$), and that each off-diagonal interaction is present with probability $C$ (the connectance) and, if present, is drawn at random from a distribution with mean zero and standard deviation $\sigma$. Then, for large $S$, the equilibrium is almost certainly stable if

$$
\sigma\sqrt{SC} < 1
$$ {#eq-may}

and almost certainly unstable if $\sigma\sqrt{SC} > 1$.
:::

The result follows from the theory of random matrices: the eigenvalues of the random part of $A$ are spread over a disc of radius $\sigma\sqrt{SC}$ in the complex plane, centred at $-1$ by the self-regulation, so stability requires the radius to be less than 1. We do not prove it here. Its message is that, in a *randomly assembled* community, more species, more connections or stronger interactions all make stability less likely.

::: example Applying May's criterion {#ex-may}
A model community has 50 species, a connectance of 0.1 and interaction strengths with standard deviation $\sigma = 0.4$ (relative to self-regulation). Is it likely to be stable? What happens if the number of species doubles?
::: solution
$\sigma\sqrt{SC} = 0.4\sqrt{50\times0.1} = 0.4\sqrt5 = 0.894 < 1$: stable. With 100 species, $0.4\sqrt{10} = 1.26 > 1$: unstable. For the larger community to be stable at the same connectance, the interaction strengths would have to fall below $\sigma = 1/\sqrt{10} = 0.32$.
:::
:::

May's result does not show that real complex communities are unstable — they plainly persist. It shows that they are not random: real food webs have structure that random matrices lack. Many weak interactions and few strong ones, predator–prey links that come in pairs of opposite sign, compartments of strongly interacting species weakly connected to others, and the patterns of who-eats-whom produced by body size all tend to increase stability. The "complexity–stability debate" has turned into the study of which non-random features of real webs allow so many species to coexist. Different measures of stability (resistance to change, speed of return after a disturbance, variability of total biomass) can also give different answers: experiments in grassland have found that more diverse plant communities have more stable *total* biomass from year to year, even when individual species fluctuate more.

## Succession

When a glacier retreats, a lava flow cools or a field is abandoned, the bare ground is colonised by a sequence of species that replace one another over years to centuries. This directional change in community composition is **succession**.

::: definition Primary and secondary succession {#def-succession}
**Primary succession** occurs on surfaces with no previous soil or biological legacy — new volcanic rock, sand dunes, ground exposed by retreating glaciers. **Secondary succession** follows a disturbance that removes the vegetation but leaves soil, seeds and roots: an abandoned field, a forest after fire or felling. Early species in a succession are called **pioneers**; a community that no longer changes directionally (although its individuals are replaced) is traditionally called a **climax**.
:::

At Glacier Bay in south-east Alaska, the ice has retreated by roughly 100 km since the late eighteenth century, exposing a sequence of surfaces of known age. Ecologists from William Cooper in the 1910s onwards have used this **chronosequence** — sites of different ages standing for the stages of a single succession — to describe primary succession: from mats of cyanobacteria and lichens, through mountain avens (*Dryas*) and willows, to thickets of nitrogen-fixing alder, then Sitka spruce and finally spruce–hemlock forest, over about two centuries. Soil nitrogen and organic matter increase along the sequence.

### Mechanisms of succession

Frederic Clements (1916) saw succession as the development of a "superorganism", in which each stage prepares the way for the next and the whole proceeds towards a climax determined by climate. Henry Gleason (1926) argued instead for an **individualistic** view: each species responds to conditions according to its own tolerances and dispersal, and communities are loose, changing assemblages rather than integrated units. The evidence has favoured Gleason: species have individual distributions along gradients, and the same site can follow different paths depending on which species arrive first.

Joseph Connell and Ralph Slatyer (1977) distilled the possible mechanisms of species replacement into three models.

- **Facilitation.** Early species modify the environment in ways that make it more suitable for later ones — by adding nitrogen, building soil, providing shade — and later species can establish only after this.
- **Tolerance.** Later species are unaffected by earlier ones; they arrive at the same time or later and simply take longer to grow, eventually dominating because they tolerate lower resource levels.
- **Inhibition.** Early species make the environment *less* suitable for later ones, holding the site until they die or are damaged; later species replace them only then.

These are not exclusive. At Glacier Bay, an experimental study by F. Stuart Chapin and colleagues (1994) found that alder both facilitated spruce, by adding nitrogen to the soil, and inhibited it, by competing for light and water; the net effect on spruce depended on the stage and the measure of performance.

### Succession as a Markov chain

A simple and surprisingly useful model treats succession as a **Markov chain**. Henry Horn (1975) recorded, for each species of canopy tree in a forest near Princeton, the species of saplings growing beneath it, and used these as the probabilities that a tree of one species would be replaced by one of another when it died. If replacement probabilities are constant, the composition of the forest converges to a **stationary distribution** that does not depend on the starting composition — a statistical climax.

::: example A Markov model of forest succession {#ex-markov}
In a forest with three tree species — birch (a pioneer), maple and beech — the probability that a canopy tree is replaced by each species when it dies is

| current tree | → birch | → maple | → beech |
|---|---|---|---|
| birch | 0.05 | 0.50 | 0.45 |
| maple | 0.05 | 0.30 | 0.65 |
| beech | 0.05 | 0.15 | 0.80 |

Starting from a stand of pure birch, find the composition after one and two tree generations, and the stationary composition.
::: solution
After one generation the stand is $(0.05, 0.50, 0.45)$, the first row. After two, multiply this row vector by the matrix:
birch $= 0.05(0.05 + 0.50 + 0.45) = 0.05$; maple $= 0.05\times0.50 + 0.50\times0.30 + 0.45\times0.15 = 0.025 + 0.15 + 0.0675 = 0.2425$; beech $= 0.05\times0.45 + 0.50\times0.65 + 0.45\times0.80 = 0.0225 + 0.325 + 0.36 = 0.7075$.

For the stationary distribution $\pi$, we need $\pi = \pi P$. Every species is replaced by birch with probability 0.05, so $\pi_\text{birch} = 0.05$. For maple, $\pi_m = 0.05\times0.50 + 0.30\pi_m + 0.15\pi_b$ with $\pi_b = 0.95 - \pi_m$, which gives $0.85\pi_m = 0.1675$, $\pi_m = 0.197$ and $\pi_b = 0.753$. The forest converges to about 5 % birch, 20 % maple and 75 % beech, whatever its starting state. Birch persists only because some gaps are colonised by it — in reality, gaps created by disturbance.
:::
:::

::: widget markov
matrix: 0.05,0.50,0.45; 0.05,0.30,0.65; 0.05,0.15,0.80
states: Birch; Maple; Beech
start: 0
steps: 20
caption: The forest succession of [[#ex-markov]] as a Markov chain. Each state is the species occupying one spot in the canopy; each step is one tree generation. The simulated walk follows a single spot; the distribution after $n$ steps shows the composition of a stand that started as pure birch; and the stationary distribution — about 5 % birch, 20 % maple and 75 % beech — is the predicted "climax" composition. Notice how quickly the distribution forgets its starting point.
:::

### Disturbance

Disturbance — any discrete event that removes organisms and opens space, such as a fire, a storm, a flood or the trampling of a large animal — resets succession locally and creates a mosaic of patches at different stages. Connell (1978) proposed the **intermediate disturbance hypothesis**: diversity should be highest at intermediate frequencies or intensities of disturbance, because with too little disturbance competitive dominants exclude others, and with too much only a few fast-colonising pioneers survive. The idea has intuitive appeal and fits some data, such as the diversity of algae on boulders of different sizes (and so different frequencies of being overturned by waves) on a Californian shore studied by Wayne Sousa in 1979. But surveys have found that hump-shaped relationships between disturbance and diversity are a minority of observed patterns, and theoretical work has shown that the usual verbal arguments do not, on their own, guarantee coexistence; several ecologists have argued that the hypothesis should be abandoned in its simple form.

## What controls the number of species?

The number of species in a community is the result of processes acting at very different scales.

- **The regional species pool.** A community can contain only species that exist in the region and can reach it. A lake in Africa's Rift Valley holds hundreds of species of cichlid fish because of the explosive speciation there; a similar lake in Scotland cannot. The large-scale patterns in regional pools — the latitudinal gradient and the species–area relationship — are the subject of [[ecology/biogeography]].
- **Dispersal and chance.** Which species arrive first can determine which persist (**priority effects**), so communities in similar environments can differ by chance and history.
- **Environmental filtering.** Conditions and resources at the site exclude species whose niches do not include them ([[ecology/organisms-environment]]).
- **Interactions.** Competition can exclude species; predation, disturbance and niche differences can allow more to coexist ([[ecology/competition]]).
- **Productivity.** The relationship between productivity and diversity is often hump-shaped at local scales — diversity is low on very poor sites and declines again on very fertile ones, where a few competitive species dominate (seen in the long-term fertiliser plots of the Park Grass Experiment at Rothamsted, established in 1856) — but it varies with scale and system, and meta-analyses have found every shape.

An influential counterpoint to niche-based explanations is the **neutral theory of biodiversity** of Stephen Hubbell (2001), which asks how much of the pattern of community composition can be explained if all individuals of all species are ecologically equivalent, and community composition changes only by random births, deaths, dispersal and speciation. Neutral models reproduce some patterns surprisingly well, notably the distribution of abundances among species in tropical tree communities, which shows that matching such patterns is weak evidence for any particular mechanism. Few ecologists think communities are truly neutral; the theory serves as a null model against which niche differences must be demonstrated.

::: quiz
In Paine's experiment, removing a predator *reduced* the number of species. Why?
- [ ] The starfish was a mutualist of the other species
- [x] The starfish preferentially ate the dominant competitor, the mussel, which in its absence excluded other species from space
- [ ] The starfish provided food for many species
- [ ] Removing the starfish increased disturbance
::: solution
*Pisaster* eats mainly the mussel *Mytilus californianus*, which is the best competitor for space on the rock. By keeping mussels in check, the predator allows weaker competitors — barnacles, limpets, chitons, algae — to persist. Without it, mussels take over and exclude them. This is keystone predation: an indirect positive effect of a predator on the species its prey would otherwise outcompete.
:::
:::

::: application Biodiversity and ecosystem functioning
Does the loss of species matter for how ecosystems work? Large experiments since the 1990s — in grassland at Cedar Creek in Minnesota, in the BIODEPTH experiment across eight European countries, and in the Jena Experiment in Germany — have sown plots with different numbers of plant species drawn at random from a regional pool. With more species, the plots on average produced more biomass, captured more of the available nitrogen and varied less in total productivity from year to year, and the effects grew stronger over time. Two mechanisms contribute: **complementarity**, in which species using resources differently together exploit more of them, and **selection** (or sampling), in which a diverse mixture is more likely to include a highly productive species. These results underpin arguments for conserving biodiversity because of its functions, a theme of [[conservation-biology/biodiversity]]. Their application to natural ecosystems, where species are lost non-randomly, is an area of active research.
:::

::: history
Karl Möbius described an oyster bank as a "biocoenosis" — a community — in 1877. In the early twentieth century Frederic Clements's superorganismic view of plant succession (1916) dominated, until Henry Gleason's individualistic concept (1926) and, later, Robert Whittaker's gradient analyses of mountain vegetation in the 1950s, showed that species are distributed individually. Charles Elton's *Animal Ecology* (1927) introduced food chains, the pyramid of numbers and the niche as a role. Robert Paine's starfish removals (1966) and the idea of the keystone species, Estes and Palmisano's sea otters (1974), and Connell's (1978) intermediate disturbance hypothesis brought experiments and field comparisons to community ecology, while Robert May's *Stability and Complexity in Model Ecosystems* (1973) set off the complexity–stability debate. Stephen Hubbell's neutral theory (2001) and the biodiversity–ecosystem function experiments of the 1990s and 2000s are among the most influential later developments.
:::

## Where this leads

Food webs are also channels of energy and nutrients: [[ecology/ecosystem-energetics]] measures the flow of energy through trophic levels, and [[ecology/nutrient-cycles]] follows chemical elements through producers, consumers and decomposers. The large-scale patterns of species richness that set the regional pool are in [[ecology/biogeography]], and the conservation of communities in [[conservation-biology/restoration]].

::: summary
- A **community** is the set of interacting populations in a place; its diversity combines **richness** and **evenness**, measured by the **Shannon** ($H' = -\sum p_i\ln p_i$) and **Simpson** ($D = \sum p_i^2$) indices, best compared as effective numbers of species ($e^{H'}$, $1/D$) ([[#def-community]]).
- Interactions are classified by sign ([[#def-mutualism]]). **Mutualisms** — mycorrhizas, rhizobia, corals and their algae, pollination, ant–plant defence — are widespread and vulnerable to cheaters; simple mutualism models need saturating benefits.
- **Food webs** are described by linkage density and connectance ([[#def-food-web]]); food chains are short.
- **Keystone species** have effects disproportionate to their abundance (Paine's *Pisaster*); **trophic cascades** pass top-down effects across levels (sea otters, urchins and kelp) ([[#def-top-down]]).
- **May's criterion** $\sigma\sqrt{SC} < 1$ ([[#prop-may]]) shows that random complex communities tend to be unstable; real food webs are stabilised by their non-random structure.
- **Succession** ([[#def-succession]]) is primary or secondary; species replace each other by facilitation, tolerance and inhibition (Connell–Slatyer); Markov models predict a stationary composition. Gleason's individualistic view has replaced Clements's superorganism.
- Species number is controlled by the regional pool, dispersal and history, environmental filtering, interactions, disturbance and productivity; neutral theory provides a null model.
:::

## Exercises

::: exercise Shannon index {level=1 check="ln(5)"}
A community has 5 species, each with 20 individuals. What is its Shannon index $H'$?
::: solution
Each $p_i = 0.2$, so $H' = -5\times0.2\ln0.2 = \ln5 = 1.609$.
:::
:::

::: exercise Simpson index {level=1 check="0.7"}
A community has 4 species with proportions 0.4, 0.3, 0.2 and 0.1. Calculate the Gini–Simpson index $1 - D$.
::: solution
$D = 0.16 + 0.09 + 0.04 + 0.01 = 0.30$, so $1 - D = 0.70$ (and $1/D = 3.33$ effective species).
:::
:::

::: exercise Connectance {level=1 check="0.15"}
A food web has 20 species and 60 links. What is its connectance $L/S^2$?
::: solution
$C = 60/400 = 0.15$.
:::
:::

::: exercise Classifying interactions {level=1}
Classify each interaction by the signs of its effects, $(+,+)$, $(+,-)$, $(-,-)$, $(+,0)$ or $(-,0)$: (a) a tick feeding on a deer; (b) an orchid growing on a tree branch without harming it; (c) two species of tit feeding on the same caterpillars; (d) a bee collecting nectar and pollinating a flower; (e) an elephant trampling grasses on its way to water.
::: solution
(a) $(+,-)$, parasitism. (b) $(+,0)$, commensalism (an epiphyte). (c) $(-,-)$, competition. (d) $(+,+)$, mutualism. (e) $(-,0)$, amensalism: the grass is harmed and the elephant unaffected.
:::
:::

::: exercise Effective numbers {level=2}
For the community of [[#ex-diversity]] plot B, a survey misses the three rare species and records only the common one. What are its richness, Shannon index and Simpson effective number? What does this suggest about the sensitivity of each measure to undersampling?
::: solution
With one species recorded, $S = 1$, $H' = 0$ and $1/D = 1$. The true values were $S = 4$, $H' = 0.588$ (effective number 1.80) and $1/D = 1.37$. Richness falls by 75 %, the Shannon effective number by 44 % and the Simpson effective number by 27 %. Richness is the most sensitive to missing rare species, Simpson the least, because it is dominated by common species. This is why richness must be compared at equal sampling effort (rarefaction) or estimated with methods that account for unseen species.
:::
:::

::: exercise A Markov succession {level=2}
A grassland can be in two states: grass (G) or shrubs (S). Each decade, a grass patch becomes shrub with probability 0.2, and a shrub patch is burnt and returns to grass with probability 0.3. (a) Write the transition matrix. (b) Find the stationary proportion of shrubland. (c) If fire suppression lowers the burning probability to 0.05, what is the new stationary proportion?
::: solution
(a) $P = \begin{pmatrix} 0.8 & 0.2 \\ 0.3 & 0.7\end{pmatrix}$, rows "from", columns "to" (G, S).

(b) At stationarity the flows balance: $0.2\pi_G = 0.3\pi_S$, with $\pi_G + \pi_S = 1$. So $\pi_S = 0.2/(0.2 + 0.3) = 0.4$.

(c) $\pi_S = 0.2/(0.2 + 0.05) = 0.8$. Suppressing fire doubles the shrub cover at equilibrium, a pattern seen in many fire-maintained grasslands and savannas.
:::
:::

::: exercise Stability and diversity {level=2 check="0.25"}
In May's model, a community has connectance $C = 0.2$ and interaction strength $\sigma = 0.5$. (a) What is the largest number of species for which it is likely to be stable? (b) What is the largest interaction strength $\sigma$ that would allow 80 species to coexist stably at the same connectance? (The answer box takes (b).)
::: solution
(a) Stability requires $\sigma\sqrt{SC} < 1$, i.e. $S < 1/(\sigma^2C) = 1/(0.25\times0.2) = 20$ species. (b) For $S = 80$, $\sigma < 1/\sqrt{80\times0.2} = 1/\sqrt{16} = 0.25$.
:::
:::

::: exercise Interpreting a cascade {level=2}
In a series of experimental ponds, an ecologist adds predatory fish to half. After a summer, ponds with predatory fish have fewer small planktivorous fish, more large zooplankton (*Daphnia*), and lower chlorophyll concentrations (less phytoplankton) than ponds without. (a) Explain the results as a trophic cascade. (b) Predict the effect of adding nutrients to all ponds. (c) Why might the cascade be weaker if the phytoplankton were dominated by large colonial cyanobacteria?
::: solution
(a) Predatory fish eat planktivorous fish; with fewer planktivores, large zooplankton escape predation and increase; more zooplankton graze down the phytoplankton, so chlorophyll falls. The effect of the top predator alternates in sign down the chain: $-$ on planktivores, $+$ on zooplankton, $-$ on phytoplankton.

(b) Nutrients increase phytoplankton growth (bottom-up). In ponds without predators the extra production should appear mainly as more phytoplankton, since zooplankton are suppressed; in ponds with predators, more of it may pass to zooplankton. Both ponds would probably have more chlorophyll, the difference between them depending on how strongly zooplankton can respond.

(c) Large colonies are hard for zooplankton to eat (and some cyanobacteria are toxic), so an increase in grazers does little to reduce them. Cascades are weakened by inedible or defended prey at any level.
:::
:::

::: exercise Facilitation or inhibition? {level=3}
In a primary succession on a glacial moraine, an ecologist plants spruce seedlings (a late-successional species) in three treatments: (i) bare ground, (ii) under alder thickets, (iii) in plots where alder was removed but its leaf litter left. After five years, survival is 20 %, 50 % and 70 %, and growth (height increment) is 8 cm, 3 cm and 15 cm respectively. (a) Which of the Connell–Slatyer mechanisms do these results support? (b) What component of alder's effect is shown by treatment (iii)? (c) What is the net effect of alder on spruce, and how might it change through time?
::: solution
(a) Both facilitation and inhibition. Survival is higher under alder and in its litter than on bare ground, indicating facilitation; growth is lower under living alder than on bare ground, indicating inhibition by the living plants.

(b) Treatment (iii) separates the soil effect of alder (litter adds nitrogen and organic matter) from the effect of the living plants (shading, root competition). With the soil benefit but no competition, spruce does best in both survival and growth: alder's facilitation acts through the soil and its inhibition through competition.

(c) Under alder, survival is higher but growth slower; the net effect depends on which matters more for reaching the canopy. Early on, facilitation of establishment may dominate; later, as alder thickets age and die, spruce released from competition benefits from the enriched soil. This mixture of positive and negative effects changing over time is what Chapin and colleagues found at Glacier Bay.
:::
:::

::: exercise Keystone or not? {level=3}
In a removal experiment, ecologists remove a species of crab that makes up 2 % of the animal biomass on a mudflat. After two years, the number of species of invertebrate falls from 24 to 15, and a burrowing shrimp that the crab eats increases tenfold. In a second experiment they remove a snail that makes up 40 % of the animal biomass, and the number of species falls from 24 to 20. (a) Calculate for each species a simple index of its importance: the proportional change in species number divided by its proportion of biomass. (b) Which, if either, is a keystone species? (c) Suggest a mechanism for the crab's effect.
::: solution
(a) Crab: proportional change $(24 - 15)/24 = 0.375$; divided by 0.02 gives 18.75. Snail: $(24 - 20)/24 = 0.167$; divided by 0.40 gives 0.42. (This is a simple version of the "community importance" index of Mary Power and colleagues, 1996.)

(b) The crab's effect is nearly 19 times its share of biomass: a keystone species. The snail's effect is less than its share: it is better described as a dominant species whose loss has a modest effect.

(c) As with *Pisaster*, the crab may control a dominant competitor or an ecosystem engineer: the burrowing shrimp, released from predation, may disturb the sediment so much that sensitive species are smothered or displaced. Testing this would need, for example, the removal of the shrimp alongside the crab.
:::
:::
