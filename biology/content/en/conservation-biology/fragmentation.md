In 1979, north of Manaus in the Brazilian Amazon, ranchers were clearing forest for cattle pasture under a law that required them to keep half of each property forested. Thomas Lovejoy persuaded them to leave the forest in square blocks of 1, 10 and 100 hectares, surveyed before the surrounding trees were felled, and to let scientists follow what happened to them. The Biological Dynamics of Forest Fragments Project became the largest and longest experiment in landscape ecology. Within a few years the fragments had lost many of their understorey birds, primates and dung beetles; army-ant colonies, which need hundreds of hectares to forage, disappeared from the smaller fragments, and with them the birds that follow the ants. Near the new edges, hot, dry winds from the pasture penetrated the forest, large trees died at several times their former rate, and lianas and pioneer trees took over. Over three decades, William Laurance and colleagues (2011) found, the smallest fragments became shadows of the forest they had been part of — while fragments surrounded by regrowing secondary forest, rather than pasture, recovered some of what they had lost.

Most habitat on Earth now exists as pieces. Nick Haddad and colleagues (2015) calculated that 70 % of the world's remaining forest lies within 1 km of a forest edge. This chapter is about what happens to populations and communities when habitat is broken up: the distinction between loss and fragmentation, edge effects, the dynamics of **metapopulations** of linked populations in patches, sources and sinks, and the restoration of **connectivity** by corridors and stepping stones. It builds on the island biogeography and species–area relationship of [[ecology/biogeography]] and on the risks of small populations in [[conservation-biology/small-populations]] and [[conservation-biology/conservation-genetics]].

## Habitat loss and fragmentation

When a landscape is converted to farmland, roads or towns, four things happen at once. The total **amount** of habitat falls; what remains is divided into a larger number of smaller **patches**; the patches become more **isolated** from one another; and a larger fraction of each patch lies close to an **edge**. These effects are correlated in real landscapes, but they are logically distinct.

::: definition Habitat loss, fragmentation and the matrix {#def-fragmentation}
**Habitat loss** is a reduction in the total area of a habitat type in a landscape. **Habitat fragmentation** in the broad sense is the process by which a continuous habitat is reduced and divided into smaller, more isolated patches; **fragmentation per se** is the breaking apart of habitat *for a given amount* of habitat — more, smaller patches rather than fewer, larger ones. The land between the patches is the **matrix**; its quality — whether animals can move through it, feed in it or live in it — strongly modifies the effects of fragmentation.
:::

The distinction matters because the remedies differ: habitat loss is reversed only by restoring habitat, whereas the effects of fragmentation per se might be mitigated by connecting patches. It also matters for interpreting evidence. Lenore Fahrig (2003, 2017) reviewed studies that separated the two and concluded that habitat amount usually has much larger effects on biodiversity than its configuration, and that the effects of fragmentation per se, where detectable, are as often positive as negative — for instance because several patches spread risk and include more varied habitats. Other ecologists (Robert Fletcher and colleagues, 2018) responded that such analyses underweight edge effects, isolation and long time lags, and that fragmentation experiments, which can control habitat amount, consistently show harm: Haddad's synthesis of experiments on five continents found reductions in biodiversity of 13–75 % in fragmented compared with continuous habitat, with effects growing over time. The debate continues; there is no disagreement that losing habitat is the primary damage.

::: warning "Fragmentation is just habitat loss by another name"
Treating the two as the same leads to poor decisions in both directions. If fragmentation per se is harmless, a landscape plan that keeps 30 % of forest in a thousand scattered woodlots is as good as one that keeps it in three large blocks; if it is the main problem, connecting existing patches would substitute for protecting more habitat. Neither is generally true. Area is usually the dominant effect, but species with large area requirements, sensitivity to edges or poor dispersal suffer additionally from fragmentation, while others benefit from heterogeneous patchy landscapes. Ask which species, and which component of fragmentation.
:::

## Edge effects

The boundary between a habitat patch and the matrix is not a line but a zone in which physical and biological conditions are altered.

::: definition Edge effect {#def-edge}
An **edge effect** is any change in physical conditions, species composition, abundance or ecological processes near the boundary of a habitat patch, caused by the influence of the adjacent matrix. The **edge depth** $d$ is the distance into the patch over which the effect is detectable; the remaining area farther than $d$ from any edge is the **core area**.
:::

Edge effects are of three kinds. **Abiotic**: more light, wind, heat and drying near forest edges, which in Amazonia raised tree mortality up to about 100–300 m from the edge and made fragments more vulnerable to fire. **Direct biological**: changes in the distribution and abundance of species — light-demanding pioneers and lianas increase, shade-tolerant interior species decline, generalist predators and brood parasites from the matrix invade. In North American woodlands, nest predation by raccoons, crows and jays and brood parasitism by brown-headed cowbirds are much higher within tens to hundreds of metres of edges, so songbirds nesting in small woodlots may produce too few young to replace themselves. **Indirect**: changes in interactions — seed dispersal, pollination, herbivory — that follow from these. Edge depths range from a few metres for some microclimatic variables to over a kilometre for hunting pressure from roads.

::: proposition Core area of a patch {#prop-core}
If edge effects penetrate a uniform distance $d$, a square patch of side $L$ has core area $(L - 2d)^2$ and a circular patch of radius $R$ has core area $\pi(R - d)^2$, both zero when the patch is too small. For a patch of given area, the core fraction is largest for a circle and decreases as the patch becomes more elongated or irregular, and for a given shape it falls steeply as area decreases.
:::

::: proof
The points of a square farther than $d$ from every side form a concentric square of side $L - 2d$; those of a circle farther than $d$ from its boundary form a concentric circle of radius $R - d$. Among plane shapes of a given area the circle has the smallest perimeter (the isoperimetric inequality), so the band of width $d$ inside its boundary is the smallest possible to first order in $d$. For the square, the core fraction is $(1 - 2d/L)^2$, which decreases as $L$ falls and reaches zero at $L = 2d$.
:::

::: example Edge depth and reserve size {#ex-core}
Edge effects on a forest bird extend $d = 100$ m into the forest. Compare the core area of (a) one square reserve of 100 ha, (b) ten square reserves of 10 ha each, (c) one circular reserve of 100 ha, and (d) one rectangular reserve of 100 ha measuring 4000 m × 250 m.
::: solution
(a) Side $L = 1000$ m: core $= (1000 - 200)^2 = 640\,000$ m² $= 64$ ha, 64 % of the reserve.

(b) Each 10-ha square has side $\sqrt{100\,000} = 316$ m and core $(316 - 200)^2 = 13\,500$ m² $= 1.35$ ha; ten of them have 13.5 ha of core, 13.5 % of the total.

(c) Radius $R = \sqrt{10^6/\pi} = 564$ m: core $= \pi(464)^2 = 676\,900$ m² $= 67.7$ ha.

(d) Core $= (4000 - 200)(250 - 200) = 190\,000$ m² $= 19$ ha.

The same total area provides almost five times as much interior habitat in one compact block as in ten small ones or one long strip. For species that need the interior, area and shape matter much more than a simple area total suggests. (For species that live at edges or move among patches, the comparison can come out differently.)
:::
:::

## Metapopulations

Many species do not live in a single population but in a network of local populations in patches of habitat, each of which may go extinct and be recolonised from the others. Richard Levins (1969), thinking about the control of agricultural pests, called such a population of populations a **metapopulation** and wrote down the simplest model of it.

::: proposition The Levins metapopulation model {#prop-levins}
Consider a very large number of identical habitat patches, each either occupied or empty, and let $p$ be the fraction occupied. Suppose each occupied patch sends out colonists that establish in empty patches at rate $c$ per occupied patch, and each local population goes extinct at rate $e$. Then

$$
\frac{dp}{dt} = c\,p\,(1 - p) - e\,p .
$$ {#eq-levins}

If $c > e$ there is a stable equilibrium

$$
p^* = 1 - \frac{e}{c},
$$ {#eq-levins-eq}

and the metapopulation persists although every local population is doomed to eventual extinction; if $c \le e$ the metapopulation goes extinct. If a fraction $D$ of the patches is permanently destroyed, the colonisation term becomes $c\,p\,(1 - D - p)$ and

$$
p^* = 1 - D - \frac{e}{c},
$$ {#eq-levins-d}

so the metapopulation goes extinct when $D \ge 1 - e/c$, while suitable habitat — a fraction $e/c$ of the original patches — still remains.
:::

::: proof
[[#eq-levins]] can be written $dp/dt = (c - e)p - cp^2$, a logistic equation ([[ecology/population-growth]]) with intrinsic rate $c - e$ and carrying capacity $(c - e)/c = 1 - e/c$. When $c > e$ this equilibrium is positive and stable and $p = 0$ is unstable; when $c \le e$ the only non-negative equilibrium is $p = 0$, which is then stable. With a fraction $D$ destroyed, colonists can establish only in the remaining empty suitable patches, a fraction $1 - D - p$ of the total, so $dp/dt = (c(1 - D) - e)p - cp^2$, with positive equilibrium $1 - D - e/c$ provided $c(1 - D) > e$.
:::

The model has two counter-intuitive implications. First, at equilibrium a fraction $e/c$ of suitable patches is always **empty**, so finding unoccupied habitat does not mean it is unnecessary: those patches are the future homes of a metapopulation that persists by recolonisation. Second, there is an **extinction threshold**: destroying habitat reduces occupancy linearly, and the metapopulation dies out before all habitat is gone. David Tilman, Robert May, Clarence Lehman and Martin Nowak (1994) extended the model to many competing species and showed that habitat destruction could cause an **extinction debt** in which the competitively superior species — often the poorer colonisers — are the first to be lost, possibly generations after the destruction.

::: example An extinction threshold {#ex-levins}
A butterfly occupies a network of meadows with colonisation rate $c = 0.5$ and local extinction rate $e = 0.1$ per year. (a) What fraction of the meadows is occupied at equilibrium? (b) If half the meadows are ploughed, what is the new equilibrium? (c) What fraction of meadows can be destroyed before the metapopulation goes extinct? (d) A survey after the ploughing finds 60 % of the remaining meadows empty. A developer argues that these are "surplus". What do you reply?
::: solution
(a) $p^* = 1 - 0.1/0.5 = 0.8$.

(b) $p^* = 1 - 0.5 - 0.2 = 0.3$ of all original meadows, which is $0.3/0.5 = 60$ % of the remaining ones.

(c) $D_c = 1 - e/c = 0.8$: the butterfly is lost once 80 % of the meadows are gone, with 20 % of the habitat remaining.

(d) In the model, the empty meadows are not surplus: they are part of the dynamic equilibrium, and the fraction $e/c$ of the original patches must always remain available for the metapopulation to persist. In fact, after the ploughing, 40 % of the remaining meadows are occupied, not the predicted 60 %, which suggests the metapopulation is still declining towards its new equilibrium of 0.3 — or that it is already below it and falling. Destroying more meadows moves it towards the threshold at $D = 0.8$.
:::
:::

::: widget slopefield
f: c*y*(1 - D - y) - e*y
x: 0, 40
y: 0, 1
points: 0, 0.8; 0, 0.05; 0, 0.5
sliders: c=0.5:0.05:1:0.01; e=0.1:0.01:0.5:0.01; D=0.5:0:1:0.01
caption: The Levins model with habitat destruction, [[#eq-levins-d]]: the fraction of patches occupied $p$ (vertical axis, $y$) against time in years (horizontal axis). The solution curves start from 80 %, 50 % and 5 % occupancy and converge on $p^* = 1 - D - e/c$, which is 0.3 with the defaults. Raise $D$ beyond $1 - e/c$ and every curve falls to zero although habitat remains; then raise $c$ — better connectivity — to bring the metapopulation back.
:::

### Real metapopulations

Real patches differ in size and isolation. Ilkka Hanski's **incidence function model** (1994) makes extinction probability decrease with patch area and colonisation probability increase with the connectivity of a patch to occupied patches, weighting each source by its size and its distance through a dispersal kernel. Hanski and colleagues tested it on the Glanville fritillary butterfly (*Melitaea cinxia*) in the Åland Islands of Finland, where some 4000 dry meadows have been surveyed every year since 1993; local populations wink in and out, and the model predicts which patches will be occupied from their area and connectivity. Hanski and Otso Ovaskainen (2000) generalised the extinction threshold of [[#prop-levins]] to such heterogeneous networks: a metapopulation persists if the **metapopulation capacity** of the landscape, the leading eigenvalue of a matrix built from patch areas and inter-patch distances, exceeds a threshold set by the species' extinction and colonisation rates. The capacity measures how good a fragmented landscape is for a species, and it can be used to rank which patches contribute most to persistence.

Two further processes link local populations. Through the **rescue effect** (James Brown and Astrid Kodric-Brown, 1977), immigrants arriving in a declining patch reduce its extinction risk, both demographically and, as genetic rescue, by relieving inbreeding ([[conservation-biology/conservation-genetics]]). And patches differ in quality, so that some are net exporters of individuals and others net importers.

::: definition Sources and sinks {#def-source-sink}
In a **source** habitat, local births exceed deaths ($\lambda > 1$ at low density) and the population produces a surplus of emigrants. In a **sink**, local reproduction is insufficient to balance mortality ($\lambda < 1$), and the population persists only because of immigration from sources (H. Ronald Pulliam, 1988). An **ecological trap** is a sink that individuals prefer, because cues they use to choose habitat have become decoupled from its quality.
:::

::: example A sink sustained by immigration {#ex-sink}
A woodlot near a town is a sink for a songbird, because of high nest predation by cats: its population would decline by 20 % a year without immigrants ($\lambda = 0.8$). Five young birds arrive from a large forest each year. (a) What is the equilibrium population of the woodlot? (b) What happens to it if the forest is cleared? (c) What does this imply for interpreting bird counts in the woodlot?
::: solution
(a) $N_{t+1} = 0.8N_t + 5$, with equilibrium $N^* = 5/(1 - 0.8) = 25$ birds.

(b) Without immigrants the woodlot population declines geometrically to extinction: halving every $\ln2/\ln(1/0.8) = 3.1$ years.

(c) A stable count of 25 birds says nothing about whether the woodlot can sustain the species. Abundance can be high in a sink, and protecting the woodlot alone, while losing the source forest, would not save the population. Demographic data — nest success, survival — are needed to identify sources and sinks.
:::
:::

::: application Ecological traps
Ecological traps are surprisingly common in human-modified landscapes. Aquatic insects lay eggs on wet roads, car roofs and dark solar panels, because these reflect horizontally polarised light that the insects use to recognise water; mayflies and caddisflies that lay eggs on asphalt lose the whole clutch. Grassland birds settle in hayfields that look like prairie but are mown during the nesting season. Sea-turtle hatchlings crawl towards lit beachfront buildings instead of the sea. Because animals prefer traps, a trap can draw individuals out of good habitat and drive a population down faster than a sink that they avoid; recognising one often requires measuring reproductive success, not just occupancy.
:::

## Connectivity and corridors

Connectivity is the degree to which a landscape facilitates the movement of organisms between patches of habitat. **Structural connectivity** describes the physical arrangement of habitat — corridors, hedgerows, stepping stones; **functional connectivity** describes how a particular species actually moves, which depends on its behaviour and on how it perceives the matrix. A hedgerow may be a highway for a dormouse and irrelevant to a bat that flies over open fields.

**Corridors** are strips of habitat that link patches. Their effectiveness was long debated — they were proposed on theoretical grounds, and critics argued they could also spread fire, disease and invasive species — until replicated experiments tested them. At the Savannah River Site in South Carolina, Nick Haddad, Joshua Tewksbury, Ellen Damschen and colleagues cleared patches of open longleaf pine habitat in a matrix of pine plantation, connecting some by corridors 150 m long and 25 m wide and leaving others unconnected. Butterflies moved more often between connected patches, bird-dispersed seeds and pollen travelled further along corridors, and over 18 years the plant diversity of connected patches rose steadily above that of unconnected ones (Damschen and colleagues, 2019), mainly because colonisations increased and local extinctions decreased. A meta-analysis by Lindsay Gilbert-Norton and colleagues (2010) found that corridors increased movement between patches by about 50 % on average compared with unconnected patches.

Planning connectivity across real landscapes uses models of movement cost. A **resistance surface** assigns to each cell of a map a cost of moving through it for a given species — low in forest, higher in farmland, very high across a motorway or a town — and the **least-cost path** between two patches is the route that minimises the summed cost. **Circuit theory**, introduced to landscape ecology by Brad McRae and colleagues (2008), treats the landscape as an electrical circuit in which current flows along all possible routes in proportion to their conductance, identifying "pinch points" where movement is concentrated. Both methods represent the landscape as a **graph**: patches are nodes and potential movement routes are edges weighted by cost (the graph algorithms of [Maths Atlas](/learn/maths/) supply the tools).

::: example A least-cost route between reserves {#ex-leastcost}
A large reserve R and a small patch F are separated by farmland with four woodlots A–D. The costs of moving between neighbouring sites, estimated from the resistance of the intervening land to a forest mammal, are R–A 4, R–B 2, A–B 3, A–C 3, A–D 5, B–D 6, C–F 4 and D–F 2. Find the least-cost route from R to F and its cost. Which single link would it be most valuable to improve?
::: solution
Dijkstra's algorithm settles nodes in order of their least cost from R: B (2); then A, reached directly at cost 4 (via B would cost $2 + 3 = 5$); then C ($4 + 3 = 7$); then D ($\min(2 + 6, 4 + 5) = 8$); and finally F ($\min(7 + 4, 8 + 2) = 10$). The least-cost route is R–B–D–F with total cost 10; the next best, R–A–C–F, costs 11.

The two routes are close, so connectivity is not concentrated on one corridor. The link B–D carries the best route and is its costliest step (6); restoring habitat along it (say, reducing its cost to 3) would make R–B–D–F cost 7, well below any alternative. But reducing C–F would strengthen a second, independent route, providing redundancy if one route is lost. Planners often favour such redundancy; circuit-theory models capture it by counting all routes rather than only the best.
:::
:::

::: widget graph
nodes: R@0,0; A@2,1.2; B@2,-1.2; C@4,1.5; D@4,-1.2; F@6,0
edges: R-A:4; R-B:2; A-B:3; A-C:3; A-D:5; B-D:6; C-F:4; D-F:2
algorithm: dijkstra
start: R
caption: The landscape of [[#ex-leastcost]] as a graph: patches are nodes and the edge weights are costs of movement between them. Step through Dijkstra's algorithm from the reserve R and watch the least-cost distances settle — F is reached last, at cost 10, via B and D. Drag nodes to rearrange the picture; the costs are set by the edges, not by the drawn distances.
:::

::: quiz
Which observation provides the strongest evidence that a corridor is functioning for a forest mammal?
- [ ] The corridor contains forest vegetation along its whole length.
- [ ] Individuals of the species are seen in the corridor.
- [x] Genotyped individuals or their offspring are found in a patch other than the one they were born in, at higher rates between connected than unconnected patches.
- [ ] The patches it connects have similar numbers of the species.
::: solution
Structural continuity (first option) does not mean animals use it; sightings (second) could be of residents living in the corridor; similar abundances (fourth) could arise for many reasons. Evidence of successful dispersal and breeding — **functional** connectivity — comes from tracking or genetic data showing movement and gene flow between patches, compared with a control without a corridor.
:::
:::

### Roads, fences and the matrix

Roads are among the most pervasive agents of fragmentation. They kill animals directly — wildlife–vehicle collisions are a leading cause of death for many large mammals, amphibians and reptiles — and act as barriers through noise, light, and avoidance; they also open forests to hunting, logging and settlement, so that the effects of a road extend far beyond its width. Wildlife crossing structures can restore some connectivity. Along the Trans-Canada Highway in Banff National Park, combined fencing and over- and underpasses, built from the 1980s onwards, reduced collisions between vehicles and elk, deer and other ungulates by more than 80 %, and monitoring by Anthony Clevenger and colleagues recorded crossings by bears, wolves, cougars, elk and deer, with genetic evidence that grizzly and black bears using the crossings bred on both sides of the road.

The matrix itself can be managed. In the countryside of southern Costa Rica, Chase Mendenhall and colleagues (2014) found that many forest species of birds, bats and other mammals used tree-rich farmland, so the effective size of forest "islands" was larger than their forest area. Trees in pastures, hedgerows, riparian strips and agroforestry can make the matrix permeable, provide stepping stones, and reduce edge effects. How to balance a matrix rich in wildlife against producing food on less land — **land sharing** versus **land sparing** — is discussed in [[conservation-biology/protected-areas]].

::: intuition Three scales of a fragmented landscape
Fragmentation acts at three nested scales. Within a patch, the question is how much core habitat remains after edge effects; this is a matter of **area and shape**. Among patches, the question is whether local extinctions can be balanced by recolonisation; this is a matter of **connectivity** relative to the species' dispersal ($c$ against $e$ in the Levins model). Across the landscape, the question is whether enough habitat remains in total for the metapopulation to persist; this is a matter of **habitat amount** relative to the extinction threshold. A conservation plan must ask which scale is limiting for the species of concern.
:::

::: history
Fragmentation became a central concern of conservation in the 1970s, when island biogeography theory ([[ecology/biogeography]]) suggested that nature reserves were islands in a sea of altered land and would lose species. Richard Levins's metapopulation model (1969), Brown and Kodric-Brown's rescue effect (1977) and Pulliam's sources and sinks (1988) provided the population theory; Lovejoy's Biological Dynamics of Forest Fragments Project (from 1979) and later experiments, such as the Savannah River corridors (from 2000) and the Wog Wog experiment in Australian eucalypt forest (from 1985), tested it. Hanski's work on the Glanville fritillary from the early 1990s and his monograph *Metapopulation Ecology* (1999) turned metapopulation theory into a quantitative tool, and landscape ecology — the study of the causes and consequences of spatial pattern, which developed in Europe and North America in the 1980s — supplied the maps, resistance surfaces and graph and circuit models now used to plan connectivity.
:::

## Where this leads

Fragmentation analysis tells us what makes a landscape good for a species: enough habitat, in patches large and compact enough to have a core, connected enough for recolonisation. The next chapter, [[conservation-biology/protected-areas]], asks how to choose and design the places that will be protected, and whether protection works.

::: summary
- **Habitat loss** reduces the amount of habitat; **fragmentation per se** breaks it into more, smaller, more isolated patches for a given amount ([[#def-fragmentation]]). Habitat amount usually has the larger effect, but fragmentation adds harm for area-demanding, edge-sensitive and poorly dispersing species; the matrix modifies both.
- **Edge effects** ([[#def-edge]]) penetrate tens to hundreds of metres; core area is $(L - 2d)^2$ for a square and $\pi(R - d)^2$ for a circle ([[#prop-core]]), so small or elongated patches have little interior.
- In the **Levins model** ([[#prop-levins]]), $p^* = 1 - D - e/c$: metapopulations persist by recolonisation, always leave a fraction $e/c$ of suitable patches empty, and go extinct before all habitat is destroyed.
- The **incidence function model** and **metapopulation capacity** extend this to heterogeneous patches; the Glanville fritillary in Åland is the classic test.
- **Sources and sinks** ([[#def-source-sink]]): abundance does not reveal habitat quality; a sink with growth factor $\lambda$ and $I$ immigrants a year holds $I/(1 - \lambda)$ individuals. Ecological traps are preferred sinks.
- **Corridors** increase movement and, over time, diversity; least-cost and circuit-theory models on resistance surfaces plan connectivity, and crossing structures mitigate roads.
:::

## Exercises

::: exercise Levins equilibrium {level=1 check="1 - 0.2/0.6"}
A pond-breeding newt has a colonisation rate $c = 0.6$ and a local extinction rate $e = 0.2$ per year in a network of ponds. What fraction of the ponds is occupied at equilibrium?
::: solution
$p^* = 1 - e/c = 1 - 0.333 = 0.667$.
:::
:::

::: exercise Extinction threshold {level=1 check="1 - 0.2/0.6"}
For the newt of the previous exercise, what fraction of the ponds can be destroyed before the metapopulation goes extinct?
::: solution
$D_c = 1 - e/c = 0.667$: once two-thirds of the ponds are gone, the network cannot sustain the newt, though a third of the ponds remain. (Note that $D_c$ equals the undisturbed $p^*$.)
:::
:::

::: exercise Core area {level=1 check="(500 - 2*50)^2/10000"}
A square woodland of 25 ha (500 m × 500 m) experiences edge effects to 50 m. What is its core area in hectares?
::: solution
$(500 - 100)^2 = 160\,000$ m² $= 16$ ha, 64 % of the wood.
:::
:::

::: exercise Shapes and edges {level=2}
For an edge depth of 100 m, find the smallest square reserve that has any core area, and the area of a square reserve that has 50 % of its area as core. Explain what this implies for the minimum size of reserves for edge-sensitive species.
::: solution
A square has core only if $L > 2d = 200$ m, that is, an area over 4 ha. For a core fraction of 0.5, $(1 - 2d/L)^2 = 0.5$, so $1 - 200/L = 0.707$ and $L = 200/0.293 = 683$ m, an area of 46.6 ha. For species that need interior conditions, reserves of a few hectares are almost all edge, and at least tens of hectares are needed before most of the reserve is interior; with deeper edge effects (several hundred metres for wind damage in Amazonia, or kilometres for hunting) the minimum size rises with the square of the depth.
:::
:::

::: exercise Sources and sinks {level=2}
A landscape contains a source population that produces 30 surplus juveniles per year and two sink woodlots with $\lambda = 0.7$ and $\lambda = 0.9$. The juveniles disperse equally to the two woodlots. (a) Find the equilibrium population of each woodlot. (b) Which woodlot appears to be the better habitat from a census alone, and why is this misleading? (c) Management can raise $\lambda$ in one woodlot to 1.1. Which should be chosen, and what then happens?
::: solution
(a) Each receives 15 a year. Woodlot 1: $15/(1 - 0.7) = 50$; woodlot 2: $15/(1 - 0.9) = 150$.

(b) Woodlot 2 holds three times as many birds, but both are sinks; neither could persist alone. Abundance reflects the balance of immigration and local loss, not the ability to sustain a population.

(c) Raising $\lambda$ to 1.1 turns a woodlot into a source, which would then grow until limited by density dependence and export individuals itself. Woodlot 2 is closer to $\lambda = 1$ and so needs a smaller improvement (from 0.9 to 1.1) than woodlot 1 (from 0.7 to 1.1); if the cost of improvement is proportional to the change, woodlot 2 is the better choice. The landscape would then have two sources, reducing its dependence on one.
:::
:::

::: exercise Interpreting a fragmentation study {level=2}
A study surveys forest birds in 60 landscapes of 1 km² differing in their percentage of forest cover (from 5 % to 80 %) and in the number of forest patches (from 1 to 40). In a regression, richness increases strongly with forest cover, and, for a given cover, increases weakly with the number of patches. (a) What does each result suggest? (b) Why might the number of patches have a *positive* effect? (c) Give two reasons why this study might miss negative effects of fragmentation.
::: solution
(a) Habitat amount is the dominant influence on richness. Fragmentation per se, measured by the number of patches at a given cover, has a small positive effect in this landscape.

(b) More, smaller patches mean more edge, which favours edge species; they spread risk among patches (fires or disease are less likely to hit all); they may include more varied habitat; and they shorten distances between patches, increasing connectivity for some species.

(c) Richness counts all species equally, so the replacement of interior specialists by edge generalists can leave it unchanged or increase it; analysing forest specialists or composition might show a negative effect. Time lags (extinction debt) mean that fragmented landscapes may not yet have lost the species they eventually will. Landscapes of 1 km² may be too small for area-demanding species. And observational studies cannot fully separate fragmentation from correlated factors such as land use history.
:::
:::

::: exercise Improving connectivity {level=3}
In the Levins model with destruction, $p^* = 1 - D - e/c$. A landscape has lost 60 % of its habitat patches ($D = 0.6$), and a species has $e = 0.15$ and $c = 0.4$. (a) What is $p^*$? (b) Two strategies are possible: restore patches to bring $D$ down to 0.5, or improve the matrix so that $c$ rises to 0.6. Compare them. (c) Which parameter would you most want to measure better before choosing, and why?
::: solution
(a) $p^* = 1 - 0.6 - 0.375 = 0.025$: the metapopulation is barely above its threshold, occupying 2.5 % of the original patches.

(b) Restoring patches: $p^* = 1 - 0.5 - 0.375 = 0.125$. Improving the matrix: $p^* = 1 - 0.6 - 0.25 = 0.15$. Here improving colonisation does slightly better, because the term $e/c$ is large; for a species with high colonisation ability the reverse would hold, and in reality both strategies interact (restored patches also shorten distances, raising $c$).

(c) The ratio $e/c$, which determines both the threshold and the benefit of raising $c$: with $e/c = 0.375$ the metapopulation is near its threshold and very sensitive to error. Colonisation rates are especially hard to estimate and depend on how the species actually moves through the matrix — functional connectivity — which could be measured by tracking or genetic studies. The Levins model also ignores differences in patch size and position, so a spatially explicit model (an incidence function model, or a calculation of metapopulation capacity) would show which patches to restore.
:::
:::

::: exercise Relaxation after isolation {level=3}
A 100-ha forest fragment held 120 species of bird when isolated. The species–area relationship predicts that it will eventually hold 70. Assume the number of species declines exponentially towards this equilibrium, $S(t) = 70 + 50e^{-kt}$. Twenty years after isolation, it holds 95 species. (a) Estimate $k$ and the "half-life" of the excess species. (b) How many species are expected after 50 years? (c) What could be done in the meantime, and why is the extinction debt an opportunity as well as a threat?
::: solution
(a) $95 = 70 + 50e^{-20k}$ gives $e^{-20k} = 0.5$, so $k = \ln2/20 = 0.0347$ per year, and the half-life of the excess is 20 years.

(b) $S(50) = 70 + 50\times0.5^{2.5} = 70 + 50\times0.177 = 78.8$, about 79 species.

(c) The species still present but committed to extinction can be saved if the conditions that commit them are changed before they disappear: by reconnecting the fragment to other forest (raising immigration, the rescue effect), restoring forest around it (increasing its area and reducing edge effects), or controlling hunting and fire. The debt is a threat because the losses will continue after the clearance has stopped; it is an opportunity because it is not yet paid, and the decades of lag are the time available for restoration.
:::
:::
