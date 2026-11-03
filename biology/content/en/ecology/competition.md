In the early 1930s the Russian biologist Georgii Gause grew two species of the ciliate *Paramecium* in test tubes of bacterial broth. Grown separately, *P. aurelia* and *P. caudatum* each increased along the logistic curve of [[ecology/population-growth]] and levelled off. Grown together, both increased at first, but then *P. caudatum* declined and disappeared, every time. The two species were not fighting, and neither ate the other. They were eating the same bacteria, and *P. aurelia* was better at it.

Gause's tubes are the simplest picture of **competition**: an interaction in which organisms are harmed by sharing a limited resource with others. This chapter treats competition within a species, which is the source of the density dependence studied in the previous chapter, and competition between species, which raises one of the oldest questions in ecology: if species compete, why does the best competitor not exclude all the others? We build the Lotka–Volterra model of competition and find exactly when it predicts coexistence, look at the mechanistic theory of competition for resources, and then turn to the evidence from the field — resource partitioning, character displacement and removal experiments — and to the mechanisms that allow competitors to coexist in a variable world. The distinction between resources and conditions, and the fundamental and realised niche, come from [[ecology/organisms-environment]].

## What competition is

::: definition Competition {#def-competition}
**Competition** is an interaction between individuals, brought about by a shared requirement for a resource in limited supply, that reduces the survival, growth or reproduction of at least some of the individuals concerned. It is **intraspecific** when the individuals belong to the same species and **interspecific** when they belong to different species. In **exploitation** competition, individuals interact only indirectly, by depleting a shared resource; in **interference** competition, they interact directly, by preventing others from gaining access to the resource — through aggression, territoriality, overgrowth or chemical inhibition.
:::

The two forms often occur together. Barnacles compete by exploitation for plankton but by interference for space, the *Balanus* in Connell's experiment crushing and undercutting *Chthamalus*. Birds defending territories interfere with one another's access to food, and plants compete by exploitation for water and nutrients below ground while shading one another above it. Some plants interfere chemically, releasing compounds that inhibit their neighbours (allelopathy), although demonstrating this convincingly in the field is notoriously difficult.

Competition is frequently **asymmetric**: the effect of a large plant on a small one is much greater than the reverse, because the large plant intercepts light before it reaches the small one. Asymmetric competition for light is why a crowded stand of seedlings quickly becomes a few large dominants above many suppressed individuals.

## Intraspecific competition

Members of the same species have, almost by definition, the most similar requirements of any organisms, and intraspecific competition is the main source of the negative density dependence that regulates populations. Its effects show up as density-dependent mortality, reduced fecundity, slower growth and smaller size.

In plants, the effects on size are especially striking. As a stand of plants of the same age grows, the larger individuals suppress the smaller ones, which die, and the stand thins itself. Plotting the logarithm of mean plant mass against the logarithm of density for stands undergoing this **self-thinning**, Kyoji Yoda and colleagues (1963) found that the points approached a line of slope about $-3/2$: mean mass $\bar w \propto N^{-3/2}$. This "−3/2 power law" was widely quoted as one of the few laws of ecology; later reanalyses showed that the slopes vary considerably among species and conditions, and a slope of $-4/3$ has been argued from metabolic scaling. It is best treated as an **empirical regularity** with a characteristic but variable slope, not a law.

::: example Self-thinning in a stand of seedlings {#ex-thinning}
A dense stand of pine seedlings has 1000 plants per m² with a mean mass of 0.5 g. Assuming that it follows the self-thinning line $\bar w = cN^{-3/2}$, what is the mean plant mass when competition has thinned it to 100 plants per m², and what has happened to the total biomass?
::: solution
Dividing the relation at the two densities eliminates the constant $c$:

$$
\bar w_2 = \bar w_1\left(\frac{N_2}{N_1}\right)^{-3/2} = 0.5\times(0.1)^{-3/2} = 0.5\times31.6 = 15.8\ \text{g}.
$$

The total biomass $B = N\bar w$ scales as $N^{-1/2}$: it rises from $1000\times0.5 = 500$ g m⁻² to $100\times15.8 = 1580$ g m⁻². Nine in ten plants have died, yet the stand weighs over three times as much — the survivors grow faster than the dying plants are lost. With a slope of $-4/3$ instead, the mean mass would be $0.5\times10^{4/3} = 10.8$ g: the prediction is sensitive to the exponent, which is one reason to treat it as empirical.
:::
:::

A related observation is that, above a certain sowing density, the total yield of a plant stand per unit area is roughly independent of how densely it was sown: more plants simply means smaller plants (the "law of constant final yield").

## Interspecific competition: the Lotka–Volterra model

How should we model two species competing for the same resources? The simplest approach, taken independently by Alfred Lotka (1925) and Vito Volterra (1926), starts from the logistic equation of [[ecology/population-growth#prop-logistic]] and adds the effect of the other species. In the logistic, the term $N/K$ measures how far a population has used up its environment. If individuals of species 2 also use up the environment of species 1, each one doing as much damage as $\alpha_{12}$ individuals of species 1, then the effective crowding of species 1 is $(N_1 + \alpha_{12}N_2)/K_1$.

::: proposition The Lotka–Volterra competition equations {#prop-lv-competition}
Two species with populations $N_1$ and $N_2$ compete according to

$$
\frac{dN_1}{dt} = r_1N_1\left(\frac{K_1 - N_1 - \alpha_{12}N_2}{K_1}\right), \qquad
\frac{dN_2}{dt} = r_2N_2\left(\frac{K_2 - N_2 - \alpha_{21}N_1}{K_2}\right),
$$ {#eq-lvc}

where $r_i$ and $K_i$ are the intrinsic rate of increase and carrying capacity of species $i$ alone, and the **competition coefficient** $\alpha_{ij}$ is the per-capita effect of species $j$ on the growth of species $i$, measured relative to the effect of species $i$ on itself. If $\alpha_{12}\alpha_{21} \neq 1$, the equilibrium with both species present is

$$
N_1^* = \frac{K_1 - \alpha_{12}K_2}{1 - \alpha_{12}\alpha_{21}}, \qquad N_2^* = \frac{K_2 - \alpha_{21}K_1}{1 - \alpha_{12}\alpha_{21}}.
$$ {#eq-lvc-eq}

Assumptions: those of the logistic model for each species (no age structure, constant parameters, instantaneous density dependence), with the effect of competitors linear in their density and constant.
:::

::: proof
At an equilibrium with both species present, both brackets vanish: $N_1 + \alpha_{12}N_2 = K_1$ and $\alpha_{21}N_1 + N_2 = K_2$. Substituting $N_2 = K_2 - \alpha_{21}N_1$ into the first gives $N_1(1 - \alpha_{12}\alpha_{21}) = K_1 - \alpha_{12}K_2$, whence $N_1^*$; $N_2^*$ follows by symmetry.
:::

The model's parameters are phenomenological: $\alpha_{12}$ says *how much* species 2 harms species 1 but not *why*. That is both its weakness (it explains nothing about mechanism) and its strength (it applies to any mechanism of competition, at least near equilibrium).

### Isoclines and the four outcomes

The model is best understood graphically, in the **phase plane** with $N_1$ on the horizontal axis and $N_2$ on the vertical. The **zero-growth isocline** (or nullcline) of species 1 is the set of points where $dN_1/dt = 0$ (other than $N_1 = 0$):

$$
N_1 + \alpha_{12}N_2 = K_1 ,
$$

a straight line from $(K_1, 0)$ on the $N_1$-axis to $(0, K_1/\alpha_{12})$ on the $N_2$-axis. Below and to the left of it, species 1 increases; above and to the right, it decreases. Similarly the isocline of species 2 runs from $(0, K_2)$ to $(K_2/\alpha_{21}, 0)$, and species 2 increases below it.

::: proposition Outcomes of Lotka–Volterra competition {#prop-lvc-outcomes}
For the system [[#eq-lvc]] with positive parameters, the outcome depends on how the two isoclines lie relative to each other, equivalently on comparing each competition coefficient with the ratio of carrying capacities:

1. $\alpha_{21} < K_2/K_1$ and $\alpha_{12} > K_1/K_2$: the isocline of species 2 lies outside that of species 1; **species 2 always wins** and species 1 is excluded.
2. $\alpha_{12} < K_1/K_2$ and $\alpha_{21} > K_2/K_1$: **species 1 always wins**.
3. $\alpha_{12} < K_1/K_2$ and $\alpha_{21} < K_2/K_1$: the isoclines cross and the interior equilibrium [[#eq-lvc-eq]] is **stable**: the species **coexist**.
4. $\alpha_{12} > K_1/K_2$ and $\alpha_{21} > K_2/K_1$: the isoclines cross but the interior equilibrium is an unstable saddle; **one species or the other wins, depending on the starting densities**.

In the symmetric case $K_1 = K_2$, the condition for stable coexistence is $\alpha_{12} < 1$ and $\alpha_{21} < 1$: **each species must limit its own growth more than it limits the other's**.
:::

::: proof
The positions of the isoclines follow from their intercepts. Species 1's isocline meets the $N_1$-axis at $K_1$ and the $N_2$-axis at $K_1/\alpha_{12}$; species 2's meets them at $K_2/\alpha_{21}$ and $K_2$.

Consider case 3. Then $K_1/\alpha_{12} > K_2$ (species 1's isocline is above species 2's on the $N_2$-axis) and $K_2/\alpha_{21} > K_1$ (species 2's is beyond species 1's on the $N_1$-axis), so the lines cross in the positive quadrant, and both numerators in [[#eq-lvc-eq]] are positive, as is the denominator ($\alpha_{12}\alpha_{21} < (K_1/K_2)(K_2/K_1) = 1$). At the boundary equilibrium $(K_1, 0)$, species 2 has per-capita growth $r_2(K_2 - \alpha_{21}K_1)/K_2 > 0$, so it can invade; likewise species 1 can invade $(0, K_2)$. Each species can increase when rare, and the trajectories converge on the interior point. (Formally, the Jacobian at the interior equilibrium has negative trace and positive determinant $r_1r_2N_1^*N_2^*(1 - \alpha_{12}\alpha_{21})/(K_1K_2)$, so both eigenvalues have negative real parts.)

In case 4 the inequalities reverse: neither species can invade the other's equilibrium, the determinant is negative, and the interior point is a saddle whose stable manifold divides the plane into the two basins of attraction. In cases 1 and 2 the isoclines do not cross in the positive quadrant, and every trajectory goes to the single boundary equilibrium of the superior species. Setting $K_1 = K_2$ in case 3 gives $\alpha_{12} < 1$, $\alpha_{21} < 1$.
:::

The symmetric condition is the core lesson of competition theory. Two species coexist when **intraspecific competition is stronger than interspecific competition**: when individuals harm members of their own species more than members of the other. This happens when the species differ in their requirements, so that each is limited mostly by resources the other uses little — that is, when their niches differ.

::: widget phaseplane
f: x*(1 - (x + a12*y)/K1)
g: y*(1 - (y + a21*x)/K2)
x: 0, 160
y: 0, 160
sliders: a12=0.5:0:2:0.05; a21=0.6:0:2:0.05; K1=100:50:150:5; K2=80:50:150:5
points: 10, 10; 150, 20; 20, 150; 140, 140
caption: The Lotka–Volterra competition model [[#eq-lvc]] with $N_1$ horizontal and $N_2$ vertical (both with $r = 1$). The straight nullclines are the zero-growth isoclines of the two species (the axes are also nullclines). With the default values the isoclines cross at a stable equilibrium, $N_1^* \approx 86$, $N_2^* \approx 29$: coexistence. Raise $\alpha_{21}$ above $K_2/K_1 = 0.8$ and species 2 is excluded; raise both coefficients above the ratios of carrying capacities and the outcome depends on where trajectories start. Click to add a trajectory.
:::

::: example Who wins? {#ex-lvc}
Species 1 has $K_1 = 100$ and species 2 has $K_2 = 80$ (individuals per plot), with $\alpha_{12} = 0.5$ and $\alpha_{21} = 0.6$. Determine the outcome of competition and the equilibrium densities. What happens if a change in conditions raises $\alpha_{21}$ to 1.0?
::: solution
The ratios are $K_1/K_2 = 1.25$ and $K_2/K_1 = 0.8$. Since $\alpha_{12} = 0.5 < 1.25$ and $\alpha_{21} = 0.6 < 0.8$, this is case 3: stable coexistence. By [[#eq-lvc-eq]],

$$
N_1^* = \frac{100 - 0.5\times80}{1 - 0.5\times0.6} = \frac{60}{0.7} = 85.7, \qquad
N_2^* = \frac{80 - 0.6\times100}{0.7} = \frac{20}{0.7} = 28.6 .
$$

Both species are reduced below their carrying capacities, species 2 much more so.

If $\alpha_{21} = 1.0 > 0.8$ while $\alpha_{12}$ is still below 1.25, we are in case 2: species 1 wins. Formally, $N_2^* = (80 - 100)/(1 - 0.5) = -40 < 0$, which is not a biologically possible equilibrium; the system goes to $N_1 = 100$, $N_2 = 0$.
:::
:::

::: example Estimating a competition coefficient {#ex-alpha}
In single-species cultures, a flour beetle reaches a carrying capacity of 200 per jar. In mixed cultures that reach a stable equilibrium, it settles at 120 per jar alongside 100 per jar of a second species. Estimate $\alpha_{12}$.
::: solution
At a coexistence equilibrium the bracket for species 1 in [[#eq-lvc]] is zero: $K_1 - N_1^* - \alpha_{12}N_2^* = 0$. Hence

$$
\alpha_{12} = \frac{K_1 - N_1^*}{N_2^*} = \frac{200 - 120}{100} = 0.8 .
$$

Each individual of species 2 reduces the growth of species 1 as much as 0.8 individuals of species 1. This method assumes that the Lotka–Volterra model describes the interaction; in practice, coefficients estimated this way often vary with density, a sign that the model's linearity does not hold.
:::
:::

### The competitive exclusion principle

The conclusion that species too similar in their requirements cannot coexist indefinitely is known as the **competitive exclusion principle** or Gause's principle, a name given by Garrett Hardin in 1960 in the slogan "complete competitors cannot coexist". Gause had illustrated it with his *Paramecium*: *P. aurelia* excluded *P. caudatum* in the same medium, but when he combined *P. caudatum* with *P. bursaria*, the two coexisted, *P. bursaria* feeding mainly on yeast cells at the bottom of the tube and *P. caudatum* on bacteria in the water above.

As a statement, the principle is close to circular: if two species coexist, one can always find *some* difference between them and declare that their niches differ. Its scientific content lies in the quantitative versions — how much difference is needed, along which axes, and under which conditions — that the models in this chapter supply.

::: quiz
In the symmetric Lotka–Volterra model ($K_1 = K_2$), which condition gives stable coexistence?
- [ ] $\alpha_{12} = \alpha_{21} = 1$
- [x] $\alpha_{12} < 1$ and $\alpha_{21} < 1$
- [ ] $\alpha_{12} > 1$ and $\alpha_{21} > 1$
- [ ] $\alpha_{12} < 1$ and $\alpha_{21} > 1$
::: solution
Coexistence requires each species to inhibit its own growth more than the other's: $\alpha_{12}, \alpha_{21} < 1$ ([[#prop-lvc-outcomes]], case 3). If both exceed 1, interspecific competition is stronger than intraspecific, and whichever species starts with the advantage wins (case 4). With one below and one above 1, one species always wins. With both equal to 1 the species are ecologically identical and the model has a whole line of neutral equilibria; in reality drift would eventually eliminate one.
:::
:::

## Competition for resources: the R* rule

The Lotka–Volterra model does not say what the species compete *for*. David Tilman, building on work by Robert MacArthur, developed in the 1970s and 1980s a mechanistic theory in which the resources themselves are modelled. Its central result is simple.

::: proposition The R* rule {#prop-rstar}
Suppose several species are limited by a single resource whose concentration $R$ is depleted by their consumption, and that each species $i$ has a per-capita growth rate $\mu_i(R)$ that increases with $R$ and a constant per-capita loss rate $m_i$ (death, or washout from a chemostat). Each species alone draws the resource down until its growth exactly balances its losses, at the concentration $R_i^*$ defined by

$$
\mu_i(R_i^*) = m_i .
$$ {#eq-rstar}

At equilibrium in competition, **the species with the lowest $R^*$ excludes all others**, because it holds the resource below the level at which the others can replace their losses. For growth following the Monod (Michaelis–Menten) form $\mu_i(R) = \mu_{\max,i}\,R/(K_{s,i} + R)$, with maximum growth rate $\mu_{\max,i}$ and half-saturation constant $K_{s,i}$,

$$
R_i^* = \frac{K_{s,i}\,m_i}{\mu_{\max,i} - m_i}.
$$ {#eq-rstar-monod}

Assumptions: a single limiting resource, a well-mixed habitat with a constant supply, and equilibrium conditions.
:::

::: proof
Species $i$ alone grows while $\mu_i(R) > m_i$, consuming resource and lowering $R$, until $\mu_i(R) = m_i$: that is $R_i^*$. If species 1 has $R_1^* < R_2^*$, then at the equilibrium set by species 1, $R = R_1^*$ and $\mu_2(R_1^*) < \mu_2(R_2^*) = m_2$ (since $\mu_2$ is increasing), so species 2 declines; conversely species 1 can invade species 2's equilibrium because $\mu_1(R_2^*) > m_1$. For the Monod form, solve $\mu_{\max}R/(K_s + R) = m$ for $R$: $\mu_{\max}R = mK_s + mR$, so $R^* = K_sm/(\mu_{\max} - m)$.
:::

::: example The winner need not be the fastest grower {#ex-rstar}
Two species of phytoplankton compete for phosphate in a chemostat with dilution rate $m = 0.25$ per day. Species A has $\mu_{\max} = 1.0$ per day and $K_s = 2.0$ μmol L⁻¹; species B has $\mu_{\max} = 0.6$ per day and $K_s = 0.5$ μmol L⁻¹. Which wins?
::: solution
From [[#eq-rstar-monod]],

$$
R_A^* = \frac{2.0\times0.25}{1.0 - 0.25} = 0.667\ \mu\text{mol L}^{-1}, \qquad R_B^* = \frac{0.5\times0.25}{0.6 - 0.25} = 0.357\ \mu\text{mol L}^{-1}.
$$

Species B has the lower $R^*$ and wins, although species A grows almost twice as fast when phosphate is abundant. When the resource is plentiful (for instance just after a pulse of nutrients), A outgrows B; at equilibrium, the ability to grow on scarce resource is what counts. This is one version of a recurring trade-off between rapid growth and competitive ability.
:::
:::

::: widget plot
f: 1.0*x/(2 + x); 0.6*x/(0.5 + x); m
x: 0, 5
y: 0, 0.8
sliders: m=0.25:0.05:0.55:0.01
labels: \text{species A}; \text{species B}; \text{loss rate } m
caption: Per-capita growth rate (per day) of the two phytoplankton species of [[#ex-rstar]] against phosphate concentration $R$ (μmol L⁻¹), with the loss rate $m$ as a horizontal line. Each species' $R^*$ is where its curve crosses the line; the species whose crossing lies further left wins. With $m = 0.25$, B crosses first even though A has the higher maximum. Raise $m$ above about 0.47 and notice that the order of the crossings reverses, so A becomes the winner.
:::

With **two** essential resources, the theory predicts that two species can coexist stably if each is the better competitor for (has the lower $R^*$ for) a different resource and each consumes relatively more of the resource that limits *itself*, and if the supply ratio of the two resources is intermediate. Tilman tested this in 1977 with two freshwater diatoms, *Asterionella formosa* and *Cyclotella meneghiniana*, grown on silicate and phosphate: *Asterionella* was the better competitor for phosphate and *Cyclotella* for silicate, and the outcome in culture changed from dominance by one, through coexistence, to dominance by the other as the silicate-to-phosphate ratio of the supply was varied, broadly as predicted. The same reasoning extends to plants competing for nitrogen and light in grassland, the subject of Tilman's long-term experiments at Cedar Creek, Minnesota.

## Evidence from nature

Laboratory cultures show that competition *can* exclude species. Do species in nature actually compete, and does competition shape communities?

### Removal and addition experiments

The most direct evidence comes from field experiments that remove one species (or add it) and measure the response of another, as Connell did with barnacles. Reviews of such experiments published in 1983 by Joseph Connell and by Thomas Schoener, covering hundreds of studies, found evidence of interspecific competition in a large proportion of them, more often among plants and sessile marine animals than among herbivorous insects, which are often held below the levels at which they deplete their food by predators and parasitoids. Competition is common but not universal, and its strength varies from place to place and year to year.

### Resource partitioning

Coexisting species often divide resources between them. In a classic study published in 1958, Robert MacArthur found that five species of warbler (*Setophaga*, then *Dendroica*) feeding on insects in the same spruce trees in New England foraged in different parts of the trees — near the top or the bottom, on the outer twigs or near the trunk — and differed in their foraging behaviour and timing of breeding. Such **resource partitioning** is consistent with competition having shaped the species' niches, but by itself it does not prove it: the species might have differed for other reasons. Connell called the appeal to past competition to explain present differences "the ghost of competition past" — plausible, but hard to test.

::: warning "No competition now means competition doesn't matter" — and its converse
Two species that use different resources today may do so *because* competition in the past drove them apart, by evolution or by excluding intermediate species; finding no competition now does not show that competition was unimportant. Conversely, finding that coexisting species differ does not prove that competition caused the differences — species differ for many reasons. Claims about competition need experiments (removals or additions) for the present, and evolutionary evidence such as character displacement for the past.
:::

### Character displacement

If competition favours divergence, then two species should differ more where they occur together (**sympatry**) than where each occurs alone (**allopatry**). This pattern, **character displacement**, was described by William Brown and Edward Wilson in 1956. A famous example is in the ground finches of the Galápagos: on islands where *Geospiza fortis* and *G. fuliginosa* occur together, their beak sizes are distinct, whereas on islands where only one is present, its beak is intermediate, as David Lack noted in 1947.

The most direct demonstration came from Peter and Rosemary Grant's long-term study on the island of Daphne Major. The large ground finch *G. magnirostris* colonised the island in 1982 and its population grew. During a severe drought in 2004–2005, the large-beaked *G. fortis*, which had overlapped with *G. magnirostris* in eating large, hard seeds, suffered heavy mortality, and the surviving *G. fortis* had smaller beaks. The next generation inherited the smaller beaks, a measurable evolutionary shift caused by competition, published in 2006. Natural selection on beaks and its measurement are discussed in [[evolution/natural-selection]].

::: intuition Why similar species cannot share everything
Imagine two species of seed-eating bird whose beaks are suited to the same range of seed sizes. Every seed eaten by one is lost to the other, so each is harmed by the other as much as by its own kind ($\alpha \approx 1$), and the slightly better competitor wins. Now give them different preferences: one is best at small seeds, the other at large. Each now depletes mostly its *own* seeds, so its own numbers limit it more than the other's do ($\alpha < 1$). The same equations that predicted exclusion now predict coexistence. Niche differences make intraspecific competition stronger than interspecific — and that is what coexistence needs.
:::

## How competitors coexist

The equilibrium models above require niche differences for coexistence. But many communities contain far more species than there seem to be distinct resources. Hutchinson in 1961 pointed to the "paradox of the plankton": dozens of species of phytoplankton coexist in a lake, all apparently competing for the same few nutrients and light. Several further mechanisms help explain such diversity.

- **Fluctuating environments.** If conditions change before competitive exclusion is complete, the identity of the superior competitor may keep changing, and no species wins. Hutchinson's own explanation of the paradox of the plankton was of this kind.
- **Disturbance.** Fires, storms, grazing and wave action repeatedly open space. If good competitors are poor colonists, and good colonists poor competitors (a **competition–colonisation trade-off**), both can persist in a landscape of patches at different stages of recovery. The role of disturbance in communities is taken up in [[ecology/communities]].
- **Natural enemies.** A predator or pathogen that attacks the commonest species most heavily prevents it from excluding others. This frequency-dependent mechanism is thought to help maintain tree diversity in tropical forests (the Janzen–Connell hypothesis), and is developed in [[ecology/predation-parasitism]].
- **The storage effect.** Long-lived stages — seeds in a seed bank, long-lived adults — let a species "store" the gains of good years and survive bad ones, so that species favoured in different years can coexist. Peter Chesson formalised this in the 1980s.

Chesson's broader framework (2000), now called **modern coexistence theory**, distinguishes two kinds of difference between competitors. **Stabilising** niche differences make each species limit itself more than its competitors, giving a species an advantage when it is rare (in the Lotka–Volterra model, $\alpha < 1$). **Fitness differences** (better called average competitive ability differences) favour one species regardless of its frequency (in the model, unequal $K$). Coexistence requires stabilising differences large enough to overcome fitness differences — exactly what the inequalities of [[#prop-lvc-outcomes]] say: as $K_1/K_2$ departs from 1, the competition coefficients must be smaller for coexistence.

::: application Competition in agriculture and invasions
Weeds reduce crop yields mainly by competing for light, water and nutrients; the yield loss caused by a given weed density can be described by competition models, and crops sown at higher density or in narrower rows close their canopy faster and suppress weeds. In mixed cropping (intercropping) the logic of niche differences is used deliberately: a cereal and a legume grown together often yield more than the same area divided between monocultures, because the legume fixes its own nitrogen and the two partly use different resources. Competition also shapes the outcome of biological invasions: the invasive grey squirrel (*Sciurus carolinensis*) has replaced the native red squirrel (*S. vulgaris*) over much of Britain through a combination of competition for food — greys can exploit acorns better — and apparent competition through squirrelpox virus, which greys carry with little harm but which is lethal to reds. Invasions are discussed further in [[conservation-biology/invasions-climate]].
:::

::: history
Darwin argued in the *Origin* (1859) that competition is most severe between closely related species, because they have similar habits. The Lotka–Volterra equations (1925–1926) gave this a mathematical form, and Gause's book *The Struggle for Existence* (1934) tested it with protozoa and yeasts. Thomas Park's long series of experiments with flour beetles (*Tribolium*) from the 1940s showed that the winner could depend on temperature and humidity — and in some conditions on chance. Joseph Connell's barnacles (1961) and Robert MacArthur's warblers (1958) took the question into the field, and Hutchinson's niche (1957) and his "paradox of the plankton" (1961) framed it. In the 1970s and 1980s debates over how much competition structures communities led to more rigorous field experiments and null models, while David Tilman's resource-ratio theory (1982) and Peter Chesson's coexistence theory (2000) gave competition a mechanistic and a general framework.
:::

## Where this leads

Competition is one of three basic interactions between species; [[ecology/predation-parasitism]] treats the second, in which one species feeds on the other, and finds that predators can make competitors coexist or exclude one another indirectly (apparent competition). [[ecology/communities]] puts all the interactions together, including the third, mutualism, and asks how they determine which species occur together.

::: summary
- **Competition** is a mutually harmful interaction through a shared limiting resource, by **exploitation** or **interference** ([[#def-competition]]); it is often asymmetric.
- Intraspecific competition causes density dependence; in plants it produces self-thinning, approximately (and empirically) $\bar w \propto N^{-3/2}$.
- The **Lotka–Volterra competition model** ([[#prop-lv-competition]]) adds the competitor's effect $\alpha_{ij}N_j$ to the logistic. Its four outcomes ([[#prop-lvc-outcomes]]) are set by comparing $\alpha_{12}$ with $K_1/K_2$ and $\alpha_{21}$ with $K_2/K_1$. Stable coexistence requires **intraspecific competition to be stronger than interspecific**.
- The **competitive exclusion principle**: complete competitors cannot coexist.
- For a single limiting resource, the species with the lowest **R\*** wins ([[#prop-rstar]]); two species can coexist on two resources if each is the better competitor for one.
- Field evidence comes from removal experiments, resource partitioning and **character displacement** (Galápagos finches); past competition is hard to demonstrate.
- Coexistence of many species also depends on fluctuations, disturbance, natural enemies and the storage effect; modern coexistence theory weighs stabilising niche differences against fitness differences.
:::

## Exercises

::: exercise Isocline intercepts {level=1 check="125"}
In the Lotka–Volterra competition model with $K_1 = 100$ and $\alpha_{12} = 0.8$, where does the zero-growth isocline of species 1 cross the $N_2$-axis?
::: solution
At $N_1 = 0$, $\alpha_{12}N_2 = K_1$, so $N_2 = K_1/\alpha_{12} = 100/0.8 = 125$.
:::
:::

::: exercise A symmetric equilibrium {level=1 check="500/9"}
Two species have $K_1 = K_2 = 100$ and $\alpha_{12} = \alpha_{21} = 0.8$. Find the equilibrium density of species 1.
::: solution
By [[#eq-lvc-eq]], $N_1^* = (100 - 0.8\times100)/(1 - 0.64) = 20/0.36 = 55.6$. Both species have the same equilibrium, and since both coefficients are below 1 it is stable.
:::
:::

::: exercise An R* value {level=1 check="5/7"}
A bacterium grows on glucose with $\mu_{\max} = 0.8$ h⁻¹ and $K_s = 5$ mg L⁻¹ in a chemostat with dilution rate 0.1 h⁻¹. Calculate its $R^*$ in mg L⁻¹.
::: solution
$R^* = K_sm/(\mu_{\max} - m) = 5\times0.1/(0.8 - 0.1) = 0.5/0.7 = 0.714$ mg L⁻¹.
:::
:::

::: exercise Classifying outcomes {level=2}
For each case, state the outcome of Lotka–Volterra competition: (a) $K_1 = 150$, $K_2 = 120$, $\alpha_{12} = 0.6$, $\alpha_{21} = 0.5$; (b) $K_1 = K_2 = 100$, $\alpha_{12} = 1.3$, $\alpha_{21} = 1.2$; (c) $K_1 = 100$, $K_2 = 200$, $\alpha_{12} = 0.4$, $\alpha_{21} = 1.5$. For (a), find the equilibrium.
::: solution
(a) $K_1/K_2 = 1.25 > 0.6$ and $K_2/K_1 = 0.8 > 0.5$: stable coexistence. $N_1^* = (150 - 0.6\times120)/(1 - 0.3) = 78/0.7 = 111.4$; $N_2^* = (120 - 0.5\times150)/0.7 = 45/0.7 = 64.3$.

(b) Both coefficients exceed $K_1/K_2 = K_2/K_1 = 1$: an unstable interior equilibrium; the winner depends on the starting densities.

(c) $K_1/K_2 = 0.5$, and $\alpha_{12} = 0.4 < 0.5$, so species 1 can invade species 2's equilibrium; $K_2/K_1 = 2$, and $\alpha_{21} = 1.5 < 2$, so species 2 can invade species 1's equilibrium. Stable coexistence again, even though species 2 suffers more per individual — its higher carrying capacity compensates.
:::
:::

::: exercise Which phytoplankton wins? {level=2}
In a lake with a constant loss rate of 0.2 per day, three algae compete for nitrate: X ($\mu_{\max} = 1.2$ d⁻¹, $K_s = 4$ μmol L⁻¹), Y ($\mu_{\max} = 0.5$ d⁻¹, $K_s = 1$), Z ($\mu_{\max} = 0.3$ d⁻¹, $K_s = 0.2$). Which wins at equilibrium? Which would you expect to dominate briefly after a large input of nitrate? What happens to the ranking if the loss rate rises to 0.28 d⁻¹?
::: solution
$R^*_X = 4\times0.2/1.0 = 0.8$; $R^*_Y = 1\times0.2/0.3 = 0.667$; $R^*_Z = 0.2\times0.2/0.1 = 0.4$ μmol L⁻¹. Z has the lowest $R^*$ and wins at equilibrium. After a nitrate pulse X, with the highest $\mu_{\max}$, grows fastest and dominates briefly. With $m = 0.28$: $R^*_X = 1.12/0.92 = 1.22$; $R^*_Y = 0.28/0.22 = 1.27$; $R^*_Z = 0.056/0.02 = 2.8$. Now X wins: high loss rates favour fast growers, because a slow grower barely replaces its losses even with plentiful resource. The outcome of competition depends on the environment.
:::
:::

::: exercise Reading a removal experiment {level=2}
In a grassland, an ecologist removes a dominant grass from some plots and leaves it in control plots. After two years, the biomass of a herb is 3.5 times higher in removal plots, but its seed production per plant does not differ. In a second experiment, the dominant grass is removed but its litter is left in place; the herb increases only 1.4-fold. What do you conclude about the mechanism by which the grass affects the herb?
::: solution
The grass strongly suppresses the herb's growth (3.5-fold increase on removal), so the two compete or interact negatively. Leaving the litter cancels much of the benefit, so a large part of the suppression acts through the litter rather than through the living plants — for example by shading seedlings, physically blocking emergence or releasing inhibitory chemicals. The remaining 1.4-fold effect may be exploitation competition for light, water or nutrients by the living grass. The lack of change in seed output per plant suggests the herb responds mainly through numbers or size of plants rather than fecundity per plant.
:::
:::

::: exercise Character displacement or not? {level=2}
On islands where two lizard species co-occur, their mean body lengths are 52 mm and 78 mm. On islands with only one species, the means are 62 mm and 68 mm. (a) Does this suggest character displacement? (b) Give two alternative explanations that you would need to rule out. (c) What observation over time would provide the strongest evidence?
::: solution
(a) Yes: the species differ more in sympatry (26 mm) than in allopatry (6 mm), consistent with competition favouring divergence where they co-occur.

(b) The islands with both species may differ systematically from those with one (in size, food supply, climate), so the body-size differences could be plastic or adaptive responses to the environment rather than to the competitor. Alternatively, only species pairs that were already different may have been able to coexist (ecological sorting), producing the pattern without evolution in sympatry.

(c) Observing an evolutionary change after one species colonises an island occupied by the other — as the Grants observed in *Geospiza fortis* after the arrival of *G. magnirostris* — together with evidence that the change is heritable and that the competitor reduces the fitness of individuals similar to it.
:::
:::

::: exercise Invasion criterion {level=3}
Show that, in the Lotka–Volterra competition model, species 2 can increase when rare in a population of species 1 at its carrying capacity if and only if $\alpha_{21} < K_2/K_1$. Use this "mutual invasibility" criterion to rederive the conditions for stable coexistence, and explain why invasibility is a more general criterion than the position of isoclines.
::: solution
When species 2 is rare ($N_2 \approx 0$), species 1 is at $N_1 = K_1$, and species 2's per-capita growth is $r_2(K_2 - 0 - \alpha_{21}K_1)/K_2$, which is positive if and only if $K_2 > \alpha_{21}K_1$, i.e. $\alpha_{21} < K_2/K_1$. By symmetry, species 1 can invade species 2's equilibrium if and only if $\alpha_{12} < K_1/K_2$. Stable coexistence (case 3) is exactly the case where each can invade the other; exclusion by one species is the case where only it can invade; and the bistable case 4 is where neither can.

The invasibility criterion carries over to models where isoclines are curved, where there are more than two species, and where environments fluctuate (where one asks whether the long-run average growth rate of a rare species is positive). It is the basis of modern coexistence theory.
:::
:::

::: exercise Fitness and niche differences {level=3}
In the symmetric version of the Lotka–Volterra model, set $\alpha_{12} = \alpha_{21} = \alpha$ with $0 < \alpha < 1$. Show that coexistence requires $\alpha < K_1/K_2 < 1/\alpha$. Interpret $1 - \alpha$ as a niche difference and $K_1/K_2$ as a fitness ratio, and explain why species that are very similar in their niches must also be very similar in competitive ability to coexist. What does this imply for two species with $\alpha = 0.9$?
::: solution
The two invasion conditions are $\alpha < K_1/K_2$ (species 1 invades) and $\alpha < K_2/K_1$, i.e. $K_1/K_2 < 1/\alpha$ (species 2 invades). Together: $\alpha < K_1/K_2 < 1/\alpha$.

If $\alpha$ is close to 1 (small niche difference $1 - \alpha$), the interval $(\alpha, 1/\alpha)$ is narrow around 1, so the fitness ratio must be nearly 1. As the niche difference grows ($\alpha \to 0$), the interval widens and very unequal competitors can coexist. For $\alpha = 0.9$, coexistence requires $0.9 < K_1/K_2 < 1.11$: the carrying capacities must agree within about 10 %. Small niche differences can stabilise only small fitness differences — the core idea of modern coexistence theory.
:::
:::
