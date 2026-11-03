In 2004 the Great Barrier Reef Marine Park in Australia was rezoned. Before, less than 5 % of the park was closed to fishing, and the closed areas were concentrated where they caused least inconvenience — on remote reefs few people visited. Planners had divided the park into 70 bioregions, distinct types of reef and seabed habitat identified from biological and physical data, and set the rule that at least a fifth of each bioregion should be included in a no-take "green zone". They then used a computer algorithm to search among thousands of possible zoning plans for those that met every target while displacing as little fishing as possible, and revised the result through several rounds of public consultation. The final plan closed about a third of the park to fishing, in a network that represented every bioregion. It was one of the first large-scale applications of **systematic conservation planning**, the subject of the central part of this chapter.

Protected areas are the oldest and most widespread tool of conservation, and they are the core of the Kunming–Montreal target to conserve 30 % of the planet by 2030. This chapter asks what a protected area is, where protected areas are and where they should be, how a network of them can be designed to represent biodiversity efficiently and to keep it viable, and — a harder question than it looks — whether they work. It draws on the measures of biodiversity in [[conservation-biology/biodiversity]], on the population requirements of [[conservation-biology/small-populations]], and on the edge effects and connectivity of [[conservation-biology/fragmentation]].

## What a protected area is

::: definition Protected area and OECM {#def-pa}
The IUCN defines a **protected area** as "a clearly defined geographical space, recognised, dedicated and managed, through legal or other effective means, to achieve the long-term conservation of nature with associated ecosystem services and cultural values" (2008). Protected areas are classified by their management objectives into **IUCN categories**:

| category | name | main objective |
|---|---|---|
| Ia | strict nature reserve | science, minimal human visitation |
| Ib | wilderness area | large, unmodified areas without permanent habitation |
| II | national park | ecosystem protection and recreation |
| III | natural monument or feature | a specific feature such as a cave or a sacred grove |
| IV | habitat/species management area | active management for particular habitats or species |
| V | protected landscape or seascape | landscapes shaped by long interaction of people and nature |
| VI | protected area with sustainable use | conservation together with sustainable use of resources |

An **other effective area-based conservation measure** (OECM), defined by the Convention on Biological Diversity in 2018, is an area that is not a protected area but is governed and managed in ways that achieve positive and sustained long-term outcomes for biodiversity — for example, a military training ground, a watershed protected for drinking water, or a sacred forest — whether or not conservation is its primary purpose.
:::

The categories describe management aims, not effectiveness: a category II park may be heavily poached, and a category V landscape well managed. Protected areas also differ in **governance**: by governments, shared between governments and others, by private owners, or by Indigenous peoples and local communities. The last are increasingly recognised: Stephen Garnett and colleagues (2018) estimated that Indigenous peoples manage or have tenure rights over at least a quarter of the world's land surface, intersecting about 40 % of all terrestrial protected areas and much of the remaining intact land ([[conservation-biology/people-and-policy]]).

### How much is protected?

According to the *Protected Planet Report 2024* of UNEP-WCMC and IUCN, protected areas and OECMs covered 17.6 % of the world's land and inland waters and 8.4 % of the ocean and coastal areas. Most of the marine coverage lies within national waters; the high seas beyond national jurisdiction, almost two-thirds of the ocean, have had almost no protection, which the Agreement on Marine Biological Diversity of Areas beyond National Jurisdiction (the "High Seas Treaty", adopted in 2023 and in force from January 2026) is designed to change. Target 3 of the Kunming–Montreal Global Biodiversity Framework (2022) calls for at least 30 % of land and inland waters and of coastal and marine areas to be "effectively conserved and managed through ecologically representative, well-connected and equitably governed systems of protected areas and other effective area-based conservation measures" by 2030 — a target whose qualifying words matter as much as its number. These coverage figures change with every update of the World Database on Protected Areas; consult the current one for later values.

Coverage is biased. Lucas Joppa and Alexander Pfaff (2009) found that protected areas around the world are disproportionately located "high and far" — at high elevations, on steep slopes and far from roads and cities — where land is cheap and least likely to be converted anyway. Many threatened species and ecosystems, particularly in lowlands and fertile valleys, are poorly protected, and a substantial fraction of **Key Biodiversity Areas** — sites identified under an IUCN standard (2016) as contributing significantly to the global persistence of biodiversity — lie wholly outside protected areas.

## Where to protect: priorities

At the global scale, organisations have tried to identify where conservation would achieve most. Two ideas dominate.

**Hotspots.** Norman Myers (1988) argued that conservation should concentrate where many endemic species are under severe threat. Myers and colleagues (2000) defined a **biodiversity hotspot** as a region with at least 1500 endemic species of vascular plant (0.5 % of the world total) that has lost at least 70 % of its original vegetation, and identified 25 hotspots; their remaining natural vegetation covered only 1.4 % of the land surface but held, as endemics, about 44 % of all vascular plant species and 35 % of terrestrial vertebrate species. The list has since grown to 36. **Wilderness areas.** At the other extreme, large intact areas — Amazonia, the Congo basin, the boreal forests, the Arctic — hold fewer endemics per unit area but are vital for wide-ranging species, carbon storage and ecological processes, and are cheapest to protect before they are fragmented. The two approaches are complementary: the hotspots are where species will be lost soonest, the wildernesses where whole ecosystems can still be kept intact.

Global priority maps are coarse. Choosing actual sites requires local data and a method.

## Systematic conservation planning

Chris Margules and Robert Pressey (2000) described conservation planning as a sequence of explicit steps: compile data on biodiversity, threats and costs in the planning region; set quantitative **targets** (for example, 20 % of each bioregion or at least three populations of each species); review what existing reserves already achieve; select additional areas to meet the targets; implement; and monitor and revise. The selection step uses principles that are easiest to understand through an example.

::: definition Principles of reserve selection {#def-selection}
- **Representation**: a reserve network should include examples of every biodiversity feature (species, habitat type, bioregion) — usually expressed as a target for each feature.
- **Complementarity**: sites are valued by how much they *add* to what the network already contains, not by their own richness ([[conservation-biology/biodiversity#def-beta]]).
- **Efficiency**: targets should be met at the least cost — in area, money or lost production.
- **Irreplaceability**: a site's irreplaceability is the extent to which it is needed to meet the targets; a site that is the only location of a feature is totally irreplaceable, while one whose features occur in many other sites has low irreplaceability.
- **Adequacy** (or persistence): the network should contain enough habitat, in large enough and well-enough connected units, for the features to persist.
:::

The selection problem can be stated mathematically. Let $x_j \in \{0, 1\}$ indicate whether site $j$ is selected, $c_j$ its cost and $a_{ij}$ the amount of feature $i$ it contains. The **minimum-set problem** is to

$$
\text{minimise } \sum_j c_jx_j \quad\text{subject to}\quad \sum_j a_{ij}x_j \ge t_i \text{ for every feature } i,
$$ {#eq-minset}

where $t_i$ is the target for feature $i$. This is an integer linear programme — a version of the **set-cover problem** of computer science — which can be solved exactly for moderate sizes but becomes very hard for thousands of sites. Practical planning therefore uses heuristics.

::: algorithm Greedy complementarity {#alg-greedy}
To choose sites until every feature meets its target:
1. Set the network to the existing reserves (or to empty).
2. For each unselected site, compute its **complementarity**: the amount it would contribute towards the features whose targets are not yet met.
3. Add the site with the largest complementarity (or, if costs differ, the largest complementarity per unit cost); break ties by preferring sites with rarer features.
4. Update the shortfalls of each feature. If any target remains unmet, return to step 2; otherwise stop.
5. Optionally, remove any selected site whose removal leaves every target met (a "redundancy check").
:::

::: example Richness versus complementarity {#ex-greedy}
Four sites contain the following species (each target is one occurrence):

| site | species present | richness |
|---|---|---|
| A | 1, 2, 3, 4, 5 | 5 |
| B | 1, 2, 3, 4, 6 | 5 |
| C | 5, 6, 7 | 3 |
| D | 1, 2, 8 | 3 |

(a) Choose sites in order of richness until all eight species are represented. (b) Apply the greedy complementarity algorithm. (c) Which sites are irreplaceable?
::: solution
(a) Ranking by richness selects A and B first (5 species each); together they hold species 1–6. Species 7 requires C and species 8 requires D, so all four sites are needed.

(b) Start with A (richest, 5 new species). The remaining species are 6, 7 and 8. Complementarities: B adds only 6 (1 species), C adds 6 and 7 (2), D adds 8 (1). Choose C. Only species 8 remains; D is the only site with it. The network {A, C, D} represents all eight species with three sites instead of four. (B could replace A — {B, C, D} also works.)

(c) C is the only site with species 7 and D the only site with species 8, so both are **totally irreplaceable**; A and B are each replaceable by the other. Irreplaceable sites should be secured first, because no alternative exists.

Choosing by richness wasted a site because A and B largely duplicate each other. Real data sets with hundreds of sites and species show the same effect on a larger scale: complementarity-based networks typically represent all features in a fraction of the area that richness-based or ad hoc selection would need.
:::
:::

Greedy algorithms are fast but not guaranteed to be optimal (see the exercises). The widely used program **Marxan** (Ian Ball and Hugh Possingham, 2000) uses **simulated annealing**, a stochastic search that occasionally accepts worse solutions to escape local optima, to minimise an objective combining the cost of the sites, a penalty for unmet targets and a penalty for the length of the reserve boundary — the last term encouraging compact, connected networks with less edge ([[conservation-biology/fragmentation#prop-core]]). Marxan was used in the Great Barrier Reef rezoning and in hundreds of other plans. Alternative tools, such as Zonation, rank every site in a landscape by its priority rather than selecting a set for fixed targets.

::: example Cost-effectiveness {#ex-cost}
A land trust has 3 million dollars to buy land for an endangered orchid. Site P holds 400 plants and costs 2 million dollars; site Q holds 250 plants and costs 0.5 million; site R holds 300 plants and costs 1 million. (a) Rank the sites by plants protected per million dollars. (b) Which combination protects the most plants within the budget? (c) Why might the trust nonetheless decide to buy P?
::: solution
(a) P: $400/2 = 200$ plants per million; Q: $250/0.5 = 500$; R: $300/1 = 300$. Ranking: Q, R, P.

(b) The combinations within 3 million dollars are: P + Q (2.5 million, 650 plants), P + R (3 million, 700 plants), Q + R (1.5 million, 550 plants), and P alone, Q alone or R alone. P + R protects most, 700 plants. Note that the greedy choice by cost-effectiveness, Q then R (550 plants, leaving 1.5 million unspent but not enough for P), is not optimal here: budget constraints make the problem a knapsack problem, in which ranking by ratio can fail.

(c) Plant numbers are not the only measure of value. If P's population is the most genetically diverse, the largest single population (the most viable, [[conservation-biology/small-populations]]), or the most secure from future threats, it may contribute more to persistence than its count suggests. Including the probability that each population persists, rather than counting plants, gives a better objective. Conversely, if Q and R are in different places, buying both spreads the risk of catastrophe.
:::
:::

### Adequacy: how big and how many?

Representation alone is not enough: a reserve that contains a species today but is too small to sustain it will lose it. William Newmark (1987) analysed sighting records of mammals in national parks in western North America and found that many parks had lost species since their establishment, with more losses in smaller parks — an extinction debt being paid inside protected areas. Large carnivores, migratory ungulates and wide-ranging birds need the largest areas.

::: example A reserve for a carnivore {#ex-carnivore}
Adult females of a carnivore hold exclusive territories of 300 km² each; males hold larger territories that overlap those of several females. Planners want a population of 500 adults, half of them females (an effective size of perhaps 50–100, given the usual $N_e/N$ ratios of [[conservation-biology/conservation-genetics]]). (a) What area is needed? (b) Compare this with a large national park of 9000 km². (c) What strategies could provide the population without a single reserve of that size?
::: solution
(a) The limiting requirement is space for the females: 250 territories of 300 km² need $250\times300 = 75\,000$ km² — roughly the area of Ireland — assuming that all the land is suitable and fully occupied.

(b) A park of 9000 km² holds $9000/300 = 30$ female territories (and so about 60 adults): an eighth of the requirement, and far too few for long-term viability alone.

(c) Linking several reserves by corridors so that they function as one metapopulation; managing the land *between* reserves to be permeable and tolerable for the carnivore (compensation for livestock losses, reduced persecution); cooperation across national borders in **transboundary** conservation areas; and, where necessary, translocations between isolated populations to maintain gene flow. Large carnivores are the classic case in which conservation must reach beyond protected-area boundaries.
:::
:::

### Single large or several small?

Jared Diamond (1975), drawing on island biogeography ([[ecology/biogeography]]), proposed rules for reserve design: large rather than small, one large rather than several small of the same total area, close together rather than far apart, connected by corridors, and round rather than elongated. Daniel Simberloff and Lawrence Abele (1976) objected that if small reserves contain different species, several small ones might together hold more species than one large one. The ensuing **SLOSS debate** (single large or several small) clarified what the answer depends on, which the following toy model makes explicit.

::: proposition A toy model of SLOSS {#prop-sloss}
Suppose a single reserve of area $A$ holds $S_L = cA^z$ species. Divide the same area into $n$ equal reserves; each holds $c(A/n)^z$ species, and suppose that each additional reserve contributes a fraction $u$ of its species that are not found in any of the others. Then the several small reserves together hold

$$
\frac{S_n}{S_L} = n^{-z}\,\bigl(1 + (n - 1)u\bigr)
$$ {#eq-sloss}

times as many species as the single large one. Several small reserves hold more species if $1 + (n - 1)u > n^z$; for $n = 2$, this requires $u > 2^z - 1$ (about 0.19 for $z = 0.25$).

This is an illustrative model, not a law: it ignores the limit set by the regional species pool, assumes every species in a small reserve can persist there, and counts species without regard to which ones they are.
:::

::: widget plot
f: x^(-z)*(1 + (x - 1)*u); 1
x: 1, 16
y: 0, 3
sliders: z=0.25:0.1:0.4:0.01; u=0.2:0:1:0.05
labels: S_n/S_L \text{ (several small)}; \text{single large}
caption: The toy model of [[#prop-sloss]]: species held by $n$ small reserves (horizontal axis) relative to one large reserve of the same total area. With $u = 0$ — every small reserve holds a subset of the same species, a **nested** pattern — several small always lose. Increase $u$, the fraction of new species each extra reserve adds, and several small win. Remember what the model leaves out: species that need large areas, and edge effects, both of which favour the single large reserve.
:::

Empirically, Lenore Fahrig (2020) reviewed comparisons of single large and several small sets of habitat patches and found that, for the same total area, the several small sets usually contained at least as many species — because separate patches sample more habitats and spread risk. But counts of species are not the only criterion. Species that need large, intact areas or interior habitat — large carnivores, forest-interior birds, migratory herds — are found only in large reserves, and species found in small patches are often the widespread ones. The modern consensus is that the debate as posed has no general answer: networks need both large core areas for area-demanding species and many smaller sites to capture beta diversity and rare habitats, connected where possible.

::: warning "Protecting the richest sites protects the most species"
A ranking of sites by species richness ignores overlap: the two richest sites may share most of their species, and a species-poor site may hold the only population of something found nowhere else. As [[#ex-greedy]] shows, choosing by richness can need more sites than choosing by complementarity to represent the same species. Richness is a property of a site; conservation value depends on the network.
:::

## Do protected areas work?

That protected areas have less deforestation, more wildlife or more fish than other places is easy to show and almost meaningless, because protected areas are not placed at random. If they are "high and far", they would have lost less forest even without protection. The question that matters is a **counterfactual**: how much less habitat was lost, or how many more animals survive, *than would have been the case without protection*? Answering it requires methods from the evaluation of medical and social programmes ([[biostatistics/experimental-design]]).

::: definition Counterfactual evaluation and matching {#def-matching}
The **effect** of protection on an outcome (such as deforestation) is the difference between the outcome in protected areas and the outcome those same areas would have had without protection. Because the latter cannot be observed, it is estimated from **controls**: unprotected areas chosen to resemble the protected ones in the covariates that influence the outcome — slope, elevation, distance to roads and towns, soil, initial forest cover. **Matching** pairs each protected unit with one or more unprotected units with similar covariates; the estimated effect is the mean difference within matched pairs. A **before–after–control–impact** (BACI) design adds a comparison of changes before and after protection, removing pre-existing differences.
:::

::: example Naive and matched estimates {#ex-matching}
Between 1990 and 2010, 6 % of the forest in a country's protected areas was cleared, compared with 30 % of the forest outside them. The protected areas lie mostly on steep, remote land. A matched sample of unprotected forest with the same slope, elevation and distance to roads lost 10 % over the same period. (a) Estimate the effect of protection naively and by matching. (b) For a protected area of 50 000 ha of forest, how much deforestation was avoided under each estimate? (c) What does the difference mean?
::: solution
(a) Naive estimate: $30 - 6 = 24$ percentage points. Matched estimate: $10 - 6 = 4$ percentage points.

(b) Naive: $0.24\times50\,000 = 12\,000$ ha avoided; matched: $0.04\times50\,000 = 2000$ ha.

(c) Most of the naive difference arises because the protected forest was in places that would have been cleared slowly anyway; the effect attributable to protection is a sixth of the naive estimate. Protection still worked — it prevented 2000 ha of clearing — but it would be wrong to claim 12 000 ha. The matched estimate is itself only as good as the covariates: if an unmeasured factor (for example, land tenure) also differed, some bias remains. This is the pattern Kwaw Andam and colleagues (2008) found in Costa Rica: protection reduced deforestation, preventing the clearance of roughly 10 % of the protected forest between 1960 and 1997, but conventional comparisons had overestimated its effect substantially.
:::
:::

::: widget plot
f: a*exp(-x/L); a*(1 - k)*exp(-x/L)
x: 0, 100
y: 0, 0.5
sliders: a=0.4:0.1:0.5:0.01; L=25:5:60:1; k=0.4:0:1:0.05
labels: \text{unprotected}; \text{protected}
caption: An illustrative model of deforestation risk over 20 years (vertical axis) declining with distance from the nearest road in km (horizontal axis), outside and inside protected areas; $k$ is the proportional reduction caused by protection. If protected areas lie mostly 60–100 km from roads and unprotected forest mostly within 20 km, comparing their average rates hugely overstates the effect of protection; comparing the two curves at the *same* distance — matching — recovers it. Set $k = 0$ to see how a naive comparison could show a "protection effect" where there is none.
:::

With such methods, a large body of evidence now shows that protected areas, on average, reduce habitat conversion relative to matched controls, but by less than naive comparisons suggest; that the effect is largest where pressure is high (near roads, in lowlands); and that it varies greatly between countries and management regimes. For populations of animals, evidence is patchier. Many parks lack the staff or budgets to manage threats: a protected area that exists only on a map is called a **paper park**. Kendall Jones and colleagues (2018) estimated that about a third of the world's protected land, some 6 million km², was under intense human pressure from roads, farming, settlements and other infrastructure. Studies of management effectiveness find that outcomes depend on enforcement, funding, staffing and the support of local people ([[conservation-biology/people-and-policy]]).

::: application Marine reserves and fisheries
No-take marine reserves provide some of the clearest evidence of protection working, because fishing is a direct, measurable threat that reserves remove. Sarah Lester and colleagues (2009) synthesised studies of 124 no-take reserves in 29 countries and found that, on average, the biomass of fishes and invertebrates inside was several times that in comparable fished areas, with increases also in density, body size and species richness. Graham Edgar and colleagues (2014) showed that the benefits depend on five features — **no take**, good **enforcement**, **old** age (over 10 years), **large** size (over 100 km²) and **isolation** by deep water or sand — and that reserves with four or five of these "NEOLI" features had far greater biomass of large fishes and sharks than fished sites, while reserves with one or two were barely different. Reserves can also benefit fisheries outside their borders through **spillover** of adults and export of larvae, as documented for reefs in the Philippines and the Mediterranean, although whether a reserve network increases the total catch depends on how heavily the fishery outside is exploited.
:::

::: quiz
A study finds that bird populations in national parks declined by 10 % over 20 years, while those in nearby unprotected land declined by 40 %. What can be concluded about the effect of the parks?
- [ ] Parks reduced the decline by 30 percentage points.
- [ ] Parks had no effect, because the populations still declined.
- [x] The parks may have reduced declines, but the 30-point difference is an unbiased estimate only if the parks and the unprotected land were otherwise similar.
- [ ] The parks caused the decline outside by attracting birds away from it.
::: solution
The comparison is naive: if parks are in places where the drivers of decline (farming, development) were weaker, part or all of the difference would have occurred without protection. A matched or before–after–control–impact comparison is needed. That populations declined inside parks too does not mean the parks failed: without them the decline might have been larger.
:::
:::

## Land sparing, land sharing and the wider landscape

Protected areas cover a minority of the land, so most biodiversity lives, and will continue to live, in landscapes used for production. Rhys Green and colleagues (2005) framed a choice: **land sparing**, farming intensively on a smaller area to leave more land as unfarmed habitat, or **land sharing**, farming less intensively over a larger area with more wildlife on the farms themselves. Which is better depends on how each species' population density responds to farm yield. In studies of birds and trees in Ghana and northern India, Ben Phalan and colleagues (2011) found that most species had higher total populations under land sparing, because many forest species could not survive even in low-intensity farmland. Others argue that sparing works only if the spared land is actually protected, that intensive farming has its own costs (pollution, soil degradation) and that much biodiversity — pollinators, farmland birds — depends on shared landscapes. In practice, plans combine large protected areas with wildlife-friendly management of the matrix.

Climate change adds a further complication: as species' ranges shift, the places that hold them today may not hold them in 2100. Reserve networks are increasingly designed to protect environmental gradients, climatic refugia and connections along which species can move, rather than only current distributions ([[conservation-biology/invasions-climate]]).

::: intuition A protected area is a bet on the future
A reserve is chosen on today's information to protect features that must persist for decades or centuries. Its value depends on what it adds to the network (complementarity), on whether its populations can persist within it (adequacy), on whether it would have been lost without protection (counterfactual threat), on whether protection is enforced (effectiveness) and on whether it will still contain suitable conditions as the climate changes (resilience). Each criterion corrects a different way of overvaluing a site: richness without complementarity, area without adequacy, remoteness without threat, designation without management.
:::

::: history
Royal hunting forests and sacred groves protected land for centuries, but the modern protected area began with Yellowstone National Park (1872), followed by national parks in Australia (Royal National Park, 1879), Canada (Banff, 1885) and many other countries. Colonial-era game reserves in Africa and Asia often excluded local people, a legacy that shaped later debates about conservation and justice. The IUCN, founded in 1948, developed the system of management categories (1978, revised 1994). Diamond's design principles (1975) and the SLOSS debate brought island biogeography into reserve design; Bob Pressey, Chris Margules and colleagues developed complementarity-based selection in Australia in the 1980s and 1990s; Myers's hotspots (1988) and the Margules–Pressey framework (2000) shaped global and regional priorities; and counterfactual evaluation of protected areas grew from about 2008 with studies in Costa Rica, Thailand, Brazil and elsewhere.
:::

## Where this leads

Protected areas keep what remains. Much has already been degraded, and in many places what is left is too small or too isolated to persist without help. The next chapter, [[conservation-biology/restoration]], considers how damaged ecosystems can be restored and lost species returned to them. Before that, [[conservation-biology/invasions-climate]] examines two threats that do not stop at a reserve boundary.

::: summary
- A **protected area** ([[#def-pa]]) is dedicated and managed for long-term conservation; **IUCN categories** describe aims, not effectiveness; **OECMs** conserve biodiversity under other primary purposes. As of the *Protected Planet Report 2024*, 17.6 % of land and inland waters and 8.4 % of the ocean were covered; the Kunming–Montreal target is 30 % of each by 2030, effectively managed, representative, connected and equitably governed.
- Protected areas are biased towards land that is "high and far"; **hotspots** and **wilderness** areas are complementary global priorities.
- **Systematic conservation planning** sets explicit targets and selects sites by **complementarity**, **efficiency** and **irreplaceability** ([[#def-selection]]); the minimum-set problem is an integer programme solved by heuristics such as greedy complementarity ([[#alg-greedy]]) or simulated annealing (Marxan).
- **Adequacy** requires reserves large enough for viable populations; large carnivores need areas beyond most single parks. The **SLOSS** debate has no general answer ([[#prop-sloss]]): networks need large cores and many complementary sites.
- Evaluating protected areas requires a **counterfactual** ([[#def-matching]]): matched comparisons show real but smaller effects than naive ones. Effectiveness depends on enforcement and resources; "paper parks" are common. No-take marine reserves with the NEOLI features have large benefits.
:::

## Exercises

::: exercise Cost-effectiveness {level=1 check="150"}
A wetland of 200 ha costs 1.2 million dollars and holds 180 pairs of a threatened wader. How many pairs are protected per million dollars?
::: solution
$180/1.2 = 150$ pairs per million dollars.
:::
:::

::: exercise A matched estimate {level=1}
Over ten years, 2 % of a protected forest was cleared, against 12 % of all unprotected forest and 5 % of unprotected forest matched for slope and access. Give the naive and the matched estimates of the effect of protection.
::: solution
Naive: $12 - 2 = 10$ percentage points. Matched: $5 - 2 = 3$ percentage points. The matched estimate is the better estimate of the effect of protection.
:::
:::

::: exercise SLOSS threshold {level=1 check="2^0.3 - 1"}
In the toy model [[#eq-sloss]] with $z = 0.3$, what fraction $u$ of unique species must a second reserve contribute for two reserves of half the area to hold more species than one large reserve?
::: solution
$u > 2^{0.3} - 1 = 1.231 - 1 = 0.231$.
:::
:::

::: exercise When greedy fails {level=2}
Five sites contain these species: P {1, 2, 3, 4}, Q {1, 2, 5}, R {3, 4, 6}, S {5}, T {6}. Each species must be represented once. (a) Apply the greedy complementarity algorithm (breaking ties alphabetically). (b) Find the optimal solution. (c) Why does greedy fail here?
::: solution
(a) Greedy picks P first (4 species). Remaining: 5, 6. Q adds 5, R adds 6, S adds 5, T adds 6 — each adds 1. Choose Q (alphabetical); then 6 remains: R or T. Greedy uses three sites: {P, Q, R}. The redundancy check now finds that P can be removed — Q and R together hold all six species — leaving {Q, R}.

(b) {Q, R} covers $\{1, 2, 5\} \cup \{3, 4, 6\}$, all six species, with two sites.

(c) The richest site P looks best at the start but is made redundant by two sites that each hold half of it plus a unique species. Greedy choices are made one at a time and never reconsidered, so they can miss solutions in which no single site is outstanding. This is why exact methods or stochastic searches such as simulated annealing are used for real problems, and why a redundancy check is worth adding.
:::
:::

::: exercise Interpreting a reserve network {level=2}
A government reports that its protected areas cover 22 % of its land, above the 17 % target set in 2010. A review finds that 80 % of the protected area lies above 2000 m, that two of its seven ecoregions have less than 2 % protection, and that no management plans exist for half of the reserves. Evaluate the claim that the country has met its protected-area commitments.
::: solution
The area target is met but the qualifying conditions are not. The bias to high elevations suggests the protected areas are where threats are lowest (the "high and far" pattern), so their counterfactual effect may be small. Two ecoregions are almost unrepresented, failing the principle of representation (both the 2010 Aichi Target 11 and the Kunming–Montreal Target 3 require "ecologically representative" systems). Without management plans, half the reserves may be paper parks, failing "effectively managed". A useful assessment would report coverage by ecoregion and by threatened species, the effect of protection estimated by matched comparisons, and management-effectiveness scores, not total area.
:::
:::

::: exercise Irreplaceability {level=2}
In a region of 20 sites, a frog occurs at 2 sites, a lizard at 10 and an orchid at 1. Targets are one site for each species. (a) Which site(s) have the highest irreplaceability, and why? (b) If the target for the frog were raised to two sites, how would its sites' irreplaceability change? (c) Why is it sensible to protect highly irreplaceable sites first?
::: solution
(a) The orchid's single site is totally irreplaceable: any network meeting the targets must include it. The frog's two sites are each partly irreplaceable (either can be chosen); the lizard's sites have low irreplaceability.

(b) Both frog sites become totally irreplaceable, since both are needed to meet a target of two.

(c) If an irreplaceable site is lost, the target can never be met; if a replaceable site is lost, another can substitute. Protecting irreplaceable and highly threatened sites first maximises the options that remain — a principle formalised in planning as scheduling by irreplaceability and vulnerability.
:::
:::

::: exercise Reserve size and persistence {level=3}
A forest bird holds territories of 4 ha, and edge effects make the outer 150 m of forest unsuitable. An analysis suggests that 300 territories are needed for long-term persistence. (a) What is the smallest square reserve that would hold 300 territories in its core? (b) How would your answer change if the reserve were a circle? (c) Two existing square reserves of 600 ha each are 5 km apart. Could connecting them meet the requirement? What would you need to know?
::: solution
(a) 300 territories need 1200 ha = $1.2\times10^7$ m² of core. Core side $= \sqrt{1.2\times10^7} = 3464$ m; reserve side $= 3464 + 300 = 3764$ m, area $= 1417$ ha.

(b) Core radius $= \sqrt{1.2\times10^7/\pi} = 1954$ m; reserve radius $= 2104$ m; area $= \pi\times2104^2 = 1391$ ha, slightly less.

(c) Each 600-ha square (side 2449 m) has core $(2449 - 300)^2 = 4.62\times10^6$ m² $= 462$ ha, or 115 territories; together 230 territories — short of 300. Connecting them would make them function as one population (if birds disperse through the corridor and breed in both reserves), but would not add enough core habitat; enlarging at least one reserve, or restoring forest between them so that they merge, would be needed. One would need to know the bird's dispersal behaviour (will it cross or use a corridor?), whether 300 territories is a robust requirement (it rests on a PVA with its own uncertainties), and whether the corridor itself would add edge habitat that serves as a sink.
:::
:::

::: exercise Designing an evaluation {level=3}
A conservation organisation wants to know whether the community-managed forests it supports in a mountainous region reduce deforestation. It has satellite maps of forest cover for 2000 and 2020, maps of roads, slope and village locations, and the boundaries of the community forests, which were established between 2005 and 2010. (a) Design an analysis that estimates the effect of community management. (b) Identify two possible sources of bias that matching on the available covariates would not remove. (c) Suggest an additional outcome, beyond forest cover, that would show whether the forests are conserving biodiversity.
::: solution
(a) Divide the region into pixels or small units; for each community-forest unit, find unprotected units with similar slope, elevation, distance to roads and villages, and forest cover in 2000 (matching, for instance on a propensity score); compare forest loss from 2000 (or from the year of establishment) to 2020 between matched treated and control units. Because the forests were established after 2000, a before–after–control–impact design can compare the change in the rate of loss before and after establishment in both groups.

(b) Communities that chose to set up managed forests may differ in ways not on the maps — stronger institutions, less outside pressure, different land rights — which also affect deforestation (selection bias). **Leakage**: protecting one forest may displace clearing to nearby unprotected forest, inflating the apparent effect when those neighbours serve as controls; choosing controls farther away or estimating leakage directly helps.

(c) Satellite images detect clearing but not degradation, hunting or loss of species from standing forest ("empty forests"). Surveys of key species — camera traps for mammals, acoustic monitoring for birds, or environmental DNA — inside and outside the community forests would show whether biodiversity, and not just tree cover, is being conserved.
:::
:::
