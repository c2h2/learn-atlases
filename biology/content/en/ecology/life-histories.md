A sockeye salmon hatches in a gravel stream in British Columbia, spends a year or two in a lake, migrates to the Pacific, grows there for two or three years, then swims back up the river where it was born, spawns once and dies within weeks. An oak tree in the same latitudes takes decades to produce its first acorns and then produces them, in fluctuating crops, for centuries. A field mouse breeds within weeks of birth and rarely lives a year; an albatross does not breed until it is five or more and may still be raising chicks at sixty. These are different **life histories**: different schedules of growth, reproduction and survival over a lifetime.

Why should they differ? Every organism has a limited supply of energy and materials, obtained from the resources described in [[ecology/organisms-environment]], and what it spends on one function is unavailable for another. Natural selection ([[evolution/natural-selection]]) favours the allocation that maximises the number of descendants an individual leaves, given the risks of its environment. Life-history theory asks what that allocation is: how big and how many offspring to make, when to start reproducing, whether to breed once or repeatedly, and why organisms age. This chapter sets out the trade-offs that constrain life histories, works through the classic models that predict how selection resolves them, and ends with the evolutionary theory of senescence. The life tables needed to measure survival and fecundity schedules precisely are developed in the next chapter, [[ecology/population-growth]].

## Life-history traits and the principle of allocation

::: definition Life history and life-history traits {#def-life-history}
The **life history** of an organism is its schedule of growth, development, reproduction and survival from birth to death. **Life-history traits** are the components of that schedule: size at birth, growth rate, age and size at maturity, the number, size and sex ratio of offspring, the frequency of reproduction, reproductive effort at each age, age-specific survival, and lifespan. A species is **semelparous** if each individual reproduces once and then dies, and **iteroparous** if it reproduces repeatedly.
:::

Semelparity occurs in Pacific salmon (*Oncorhynchus*), mayflies, many annual plants, octopuses, and long-lived plants such as the century plants (*Agave*) and many bamboos, which flower once after decades — in some species after more than a century — and then die. Iteroparity is the rule in most vertebrates, perennial plants and many invertebrates. Annual plants are semelparous by definition; perennials can be either.

The common thread is that resources are finite. Richard Levins and Martin Cody in the 1960s called this the **principle of allocation**: energy and materials devoted to one function, such as reproduction, cannot be devoted to another, such as growth or maintenance.

::: definition Trade-off and reproductive effort {#def-tradeoff}
A **trade-off** is a negative relationship between two components of fitness that arises because both draw on a limited resource (or because one exposes the organism to a risk the other avoids): an increase in one can be obtained only at the expense of the other. **Reproductive effort** is the proportion of an organism's resources (or of its energy budget over a given period) allocated to reproduction. The reduction in future survival or fecundity caused by present reproduction is the **cost of reproduction**.
:::

The three trade-offs that dominate life-history theory are between current reproduction and future survival or reproduction, between the number and the size of offspring, and between reproduction and growth (which, for organisms whose fecundity increases with size, is also a trade-off between present and future reproduction).

### Measuring a trade-off

Trade-offs are harder to detect than one might expect. Across individuals in a natural population, reproduction and survival are often *positively* correlated: individuals in good condition, or with good territories, both reproduce more and survive better. This variation in acquisition masks the underlying trade-off in allocation. The way round it is experiment: change the reproductive effort of individuals at random and measure the consequences.

Brood-size manipulations in birds do exactly this. In a study of kestrels (*Falco tinnunculus*) in the Netherlands, Cor Dijkstra, Serge Daan and colleagues (1990) moved nestlings between nests soon after hatching, creating enlarged, reduced and control broods. Parents raising enlarged broods worked harder, and fewer of them survived to the following breeding season than parents raising reduced broods. Similar experiments on many bird species have found costs of reproduction, although their size varies greatly and they sometimes appear in reduced future fecundity rather than survival.

::: warning "A negative correlation proves a trade-off; no correlation disproves one"
Observational correlations between reproduction and survival mix two effects: differences in how much individuals *acquire* (which make the correlation positive) and differences in how they *allocate* (which make it negative). A population whose members vary mainly in acquisition will show a positive correlation even when every individual faces a strong trade-off; one whose members vary mainly in allocation will show a negative one. Neither pattern alone tells us about the trade-off. Experimental manipulation, or comparison of genotypes reared under identical conditions, is needed.
:::

## How many offspring, and how big?

A parent with a fixed budget for reproduction can make many small offspring or few large ones. Small offspring are cheap but survive poorly; large ones survive better but are expensive. What size maximises the parent's fitness?

::: proposition The Smith–Fretwell model of offspring size {#prop-smith-fretwell}
Suppose a parent allocates a fixed amount $R$ of resource to reproduction, divided equally among offspring of size $s$ (resource per offspring), so that it produces $n = R/s$ offspring. Let $f(s)$ be the fitness of an offspring of size $s$ — its probability of surviving to reproduce, say — an increasing function that is zero below some minimum size and levels off for large $s$. Then the parent's fitness is

$$
W(s) = \frac{R}{s}\,f(s),
$$ {#eq-sf}

and it is maximised at an offspring size $s^*$ satisfying

$$
f'(s^*) = \frac{f(s^*)}{s^*},
$$ {#eq-sf-opt}

that is, where a straight line from the origin is tangent to the curve $f(s)$. The optimal size $s^*$ does not depend on $R$: extra resources should be spent on more offspring of the same size, not on bigger offspring.
:::

::: proof
Differentiating, $W'(s) = R\left[\dfrac{f'(s)}{s} - \dfrac{f(s)}{s^2}\right] = \dfrac{R}{s^2}\bigl[s f'(s) - f(s)\bigr]$. A maximum in the interior requires $W'(s^*) = 0$, which gives $s^* f'(s^*) = f(s^*)$, equation [[#eq-sf-opt]]. The quantity $f(s)/s$ is the slope of the line from the origin to the point $(s, f(s))$; the condition says that this slope equals the slope of the curve, so the line touches the curve there. Since $R$ appears only as a constant factor in $W$, it does not affect where the maximum lies.
:::

The model was published by Christopher Smith and Stephen Fretwell in 1974. Its assumptions are worth listing: all offspring are the same size, the parent's total investment $R$ is fixed, offspring fitness depends only on their own size, and the parent's own survival is not affected by how it splits $R$. The graphical condition is the same marginal-value argument that recurs in optimal foraging theory ([[behaviour/foraging]]): the optimum is where the marginal gain from investing one more unit in an offspring equals the average gain per unit invested.

::: example A tangent from the origin {#ex-sf}
Suppose that offspring fitness is $f(s) = 1 - s_0/s$ for $s > s_0$ and zero otherwise, so an offspring needs at least $s_0$ units of resource to have any chance of surviving and its survival approaches 1 as it gets larger. Find the optimal offspring size. For $s_0 = 2$ mg and $R = 200$ mg, compare the parent's fitness for offspring of 3, 4 and 6 mg.
::: solution
Here $f'(s) = s_0/s^2$, and the optimality condition [[#eq-sf-opt]] becomes

$$
\frac{s_0}{s^2} = \frac{1 - s_0/s}{s} \quad\Longrightarrow\quad \frac{s_0}{s} = 1 - \frac{s_0}{s} \quad\Longrightarrow\quad s^* = 2s_0 .
$$

With $s_0 = 2$ mg, $s^* = 4$ mg. Then:

| size $s$ (mg) | number $n = R/s$ | offspring fitness $f(s)$ | parent's fitness $W = nf$ |
|---|---|---|---|
| 3 | 66.7 | 0.333 | 22.2 |
| 4 | 50 | 0.500 | 25.0 |
| 6 | 33.3 | 0.667 | 22.2 |

Offspring of 4 mg give the parent 25 surviving offspring; making smaller or larger ones gives fewer. Notice that at the optimum each offspring has only a 50 % chance of surviving: maximising the parent's fitness does not mean maximising each offspring's.
:::
:::

::: widget plot
f: max(0, 1 - s0/x); 4*s0*max(0, x - s0)/x^2
x: 0, 20
y: 0, 1.2
sliders: s0=2:0.5:6:0.25
tangent: 6
labels: f(s)=1-s_0/s; W(s)/W_{\max}
caption: The Smith–Fretwell model for $f(s) = 1 - s_0/s$, with offspring size $s$ on the horizontal axis. The first curve is the fitness of one offspring; the second is the parent's fitness $W = (R/s)f(s)$, scaled so its maximum is 1. Drag the tangent along $f$: when its extension passes through the origin, you are at the optimal size $s^* = 2s_0$, exactly where $W$ peaks. Change $s_0$ and notice that the optimum moves in proportion.
:::

The prediction that optimal offspring size is independent of the parent's budget is borne out in some groups — within a population, larger or better-fed females of many fishes and insects produce more eggs rather than bigger ones — but not in others: in many species bigger mothers also produce bigger offspring, which suggests that some of the model's assumptions (for example, that offspring fitness does not depend on the mother's own size or environment) fail there.

### Clutch size

David Lack, studying birds in the 1940s, asked the related question of how many eggs a bird should lay. His hypothesis (1947) was that clutch size is adjusted by natural selection to the largest number of young the parents can on average raise: beyond some point, extra chicks are so poorly fed that fewer young survive overall. The clutch that produces the most surviving young is the **Lack clutch** or most productive clutch.

::: example The most productive clutch {#ex-lack}
In a population of songbirds, the probability that a chick survives to independence falls with clutch size $c$ as $p(c) = 1 - 0.08c$. What is the most productive clutch?
::: solution
The expected number of surviving young is $Y(c) = c\,p(c) = c(1 - 0.08c) = c - 0.08c^2$. Setting $dY/dc = 1 - 0.16c = 0$ gives $c = 6.25$. Clutch sizes are integers, so compare $Y(6) = 6\times0.52 = 3.12$ and $Y(7) = 7\times0.44 = 3.08$: the most productive clutch is 6 eggs.
:::
:::

When the most productive clutch has been compared with what birds actually lay — most famously for great tits (*Parus major*) in Wytham Woods near Oxford, where Lack's group and its successors have followed nest-boxes since 1947 — the commonest clutch is usually somewhat **smaller** than the most productive one. The main explanation is the cost of reproduction: Lack's argument counts only the young of the current year, but raising a large brood can reduce the parents' survival or their success the following year, as in the kestrel experiment. Counting the whole lifetime, the optimal clutch lies below the most productive one. Other contributions come from the costs of laying itself, uncertainty about food later in the season, and the fact that young from large broods may be lighter and survive worse after fledging.

## When to reproduce, and how often

### The value of the future

Should an organism reproduce now, or grow and wait? And should it put everything into one bout of reproduction, or spread it out? The answer depends on how its chances of surviving to reproduce again compare with the value of reproducing now.

LaMont Cole posed the problem sharply in 1954. He pointed out that, for a population growing in discrete years, an annual plant could gain exactly the same rate of increase as an otherwise identical perennial simply by producing **one more seed** — the "seed" that represents the perennial parent itself surviving to the next year. If perenniality were so cheap to match, why are perennials so common? The resolution, by Eric Charnov and William Schaffer in 1973, is that the adult and the seed do not survive equally well.

::: proposition Annual versus perennial: Cole's paradox resolved {#prop-cole}
Consider a plant population censused once a year, just before seeds germinate. Let $c$ be the probability that a seed survives to become a reproducing adult the following year, and $p$ the probability that an adult survives from one year to the next. An annual that produces $B_a$ seeds and dies has a per-year rate of increase

$$
\lambda_a = cB_a ;
$$

a perennial that produces $B_p$ seeds each year and itself survives with probability $p$ has

$$
\lambda_p = cB_p + p .
$$

The two have equal fitness when

$$
B_a = B_p + \frac{p}{c}.
$$ {#eq-cole}

An annual must exceed a perennial's yearly seed output by $p/c$ seeds to do as well. When adult survival is high relative to juvenile survival ($p/c$ large), the perennial (iteroparous) habit is favoured; when juveniles survive almost as well as adults, the annual (semelparous) habit needs only a small extra output to win.
:::

::: proof
Each annual adult is replaced next year by its surviving seedlings, $cB_a$ on average. Each perennial adult is followed next year by $cB_p$ new adults from its seeds plus itself, with probability $p$. These are the rates of increase per year; setting $\lambda_a = \lambda_p$ and solving for $B_a$ gives [[#eq-cole]]. Cole's original argument implicitly took $c = p = 1$, so that $p/c = 1$: one extra seed.
:::

::: example Should this plant be annual? {#ex-cole}
A perennial herb of a grassland produces 30 seeds a year and has an adult survival of 0.8 per year; seeds become adults with probability 0.02. How many seeds would an annual mutant have to produce to do as well? How does the answer change on a disturbed site where seedlings establish easily ($c = 0.4$) and adults rarely survive the winter ($p = 0.2$)?
::: solution
From [[#eq-cole]], in the grassland $B_a = 30 + 0.8/0.02 = 30 + 40 = 70$: the annual must more than double the perennial's seed output, which is unlikely if the perennial is also spending resources on roots and storage. On the disturbed site, $B_a = 30 + 0.2/0.4 = 30.5$: an annual needs only half a seed more, which it can easily achieve by putting all its resources into reproduction. The model predicts annuals on disturbed, open sites and perennials in stable, crowded vegetation — which is broadly what is observed.
:::
:::

The same logic applies to animals. Pacific salmon face an extremely costly and dangerous migration to their spawning grounds; once there, the chance of surviving to repeat it is so low that putting everything into a single spawning is favoured. Atlantic salmon (*Salmo salar*), whose migrations are generally less arduous, are iteroparous, though many individuals still breed only once.

::: quiz
Which situation most favours semelparity (a single bout of reproduction followed by death)?
- [ ] High adult survival and low juvenile survival
- [x] Low adult survival relative to juvenile survival, or a large fixed cost to each bout of breeding
- [ ] A stable environment in which adults rarely die
- [ ] Any long-lived organism
::: solution
By [[#eq-cole]] the advantage of surviving to breed again is worth $p/c$ offspring; when adult survival $p$ is low relative to juvenile survival $c$, that advantage is small, and putting everything into one bout wins. A large fixed cost to each bout — such as the salmon's migration — has a similar effect, because it makes repeated breeding expensive. Long life is not the issue: century plants and bamboos are long-lived and semelparous, building up resources for decades before a single massive reproduction.
:::
:::

### Age at maturity and the role of mortality

Delaying maturity allows an organism to grow larger and, if fecundity increases with size, to produce more offspring when it does breed. The cost is the risk of dying before breeding at all, and a longer generation time. Theory therefore predicts that **high adult mortality favours early maturity and high reproductive effort**, and high juvenile mortality (relative to adult) favours later maturity and lower effort, because the adult has a good chance of breeding again.

The best natural test comes from guppies (*Poecilia reticulata*) in the streams of the Northern Range of Trinidad. Waterfalls divide many streams into lower reaches, where guppies live with a large predatory cichlid (*Crenicichla*) that eats mainly adult guppies, and upper reaches, where the only predator is a small killifish (*Rivulus*, now *Anablepsoides*) that takes mainly juveniles. David Reznick, John Endler and colleagues showed from the late 1970s onwards that guppies from high-predation sites mature earlier and at a smaller size, devote more of their body mass to reproduction, and produce more and smaller offspring per brood — the differences persisting when the fish are reared in the laboratory, so they are genetic. In 1976 guppies were moved from a high-predation site to a previously guppy-free reach above a waterfall where only *Rivulus* lived. Reznick and colleagues sampled their descendants about eleven years later (1990) and found that they had evolved later maturity at a larger size, as the theory predicted — one of the first measurements of life-history evolution in the wild.

### The r–K continuum and its replacement

In 1967 Robert MacArthur and Edward Wilson contrasted selection in uncrowded populations, which favours a high intrinsic rate of increase $r$ (rapid development, early reproduction, many small offspring), with selection in crowded populations near their carrying capacity $K$, which favours competitive ability and efficient use of resources (slower development, later reproduction, fewer larger offspring). Eric Pianka (1970) turned this into a list of correlated traits of **r-selected** and **K-selected** species. The parameters $r$ and $K$ are those of the logistic model in [[ecology/population-growth]].

The scheme is still a useful description of a broad pattern — a **fast–slow continuum** along which mice, annual weeds and many insects lie at one end and elephants, albatrosses and oaks at the other — but as an explanation it has largely been replaced. Its difficulties are that density dependence can act on adults or juveniles with opposite consequences, and that the guppy studies and others show life histories responding to *age-specific mortality* in ways the r–K scheme does not predict: high adult mortality favours "r-like" traits whatever the population density. Modern life-history theory is built on demographic models that track how selection acts through each age-specific rate of survival and fecundity. For plants, Philip Grime's (1977) classification into competitors, stress-tolerators and ruderals (the CSR scheme) adds a second axis, stress, that the r–K scheme lacks.

::: warning "r-selected species have low carrying capacities"
The labels refer to the kind of selection a population has experienced, not to its numbers. A "K-selected" species can be rare and a "r-selected" one abundant — weeds and aphids reach enormous densities. Nor are the traits always correlated as the textbook lists suggest; many species combine "fast" and "slow" traits. The fast–slow continuum describes a statistical tendency across species, mostly driven by body size.
:::

## Senescence

Most organisms deteriorate with age: their mortality rises and their fertility falls. This **senescence** (ageing) is puzzling from an evolutionary point of view, because it lowers fitness. Why has selection not eliminated it?

::: definition Senescence {#def-senescence}
**Senescence** is the decline with age in an organism's physiological function, observable at the population level as an increase in the age-specific mortality rate and a decrease in age-specific fecundity in adults, in conditions where external hazards are constant. Species in which these rates do not change appreciably over the observed adult lifespan are said to show **negligible senescence**.
:::

The modern answer starts from the fact that, in nature, organisms die from external causes — predators, disease, accidents, starvation — whether or not they age. Because individuals are lost to such **extrinsic mortality** at every age, fewer and fewer remain alive at older ages to be affected by any gene acting there.

::: proposition The declining force of selection with age {#prop-force}
Suppose individuals die of extrinsic causes with a constant annual probability $m$, so that the fraction of a cohort surviving to age $x$ is

$$
l_x = (1 - m)^x .
$$ {#eq-lx-const}

A mutation whose effects are expressed only from age $x$ onwards affects only the fraction $l_x$ of the individuals who carry it; in a population of constant size, the strength of selection on a small change in fecundity or survival at age $x$ is proportional to $l_x$ (to the probability of surviving to that age and, for survival, to the reproduction still to come). The force of selection therefore declines with age, and declines faster when extrinsic mortality is high.
:::

This is a heuristic summary of results proved by William Hamilton (1966), who showed from demographic equations that the sensitivity of fitness to age-specific survival falls monotonically with age after the onset of reproduction. Two mechanisms then make senescence evolve.

- **Mutation accumulation** (Peter Medawar, 1952). Mutations with harmful effects confined to late life are only weakly selected against and can drift to appreciable frequencies, so an organism carries a load of late-acting defects.
- **Antagonistic pleiotropy** (George Williams, 1957). An allele that improves early fecundity or survival but harms the organism later is favoured overall, because the early benefit is felt by many more individuals than the late cost. Senescence is then the price of youthful vigour.

A third view, the **disposable soma** theory of Thomas Kirkwood (1977), recasts antagonistic pleiotropy as an allocation problem: resources spent on repair and maintenance of the body are unavailable for reproduction, and where extrinsic mortality is high it does not pay to maintain a body built to last.

::: example How strongly is a late-acting gene selected? {#ex-force}
In a species of small bird with an extrinsic annual mortality of 30 %, what fraction of a cohort survives to age 10? Compare with a seabird whose extrinsic annual mortality is 5 %.
::: solution
From [[#eq-lx-const]], for the small bird $l_{10} = 0.7^{10} = 0.028$: fewer than 3 in 100 individuals live to be affected by a gene acting at age 10, whatever it does. For the seabird, $l_{10} = 0.95^{10} = 0.60$: 60 % survive. A deleterious mutation acting from age 10 is therefore opposed by selection about 21 times more strongly in the seabird. The theory predicts slower senescence in species with low extrinsic mortality — and indeed long-lived seabirds age slowly compared with small passerines of similar size.
:::
:::

::: widget plot
f: (1 - m)^x; (1 - m2)^x
x: 0, 25
y: 0, 1
sliders: m=0.3:0.01:0.8:0.01; m2=0.05:0.01:0.8:0.01
labels: l_x,\ \text{mortality } m; l_x,\ \text{mortality } m_2
caption: The fraction $l_x$ of a cohort still alive at age $x$ (in years) when extrinsic mortality is constant, for two annual mortality rates. Since a gene acting at age $x$ affects only these survivors, the curves show how the force of selection on late-acting genes falls with age. Raise $m$ and see how quickly old age becomes irrelevant to selection.
:::

### Testing the theory

The theory makes a testable comparative prediction: populations or species with lower extrinsic mortality should evolve slower senescence. Steven Austad (1993) compared Virginia opossums (*Didelphis virginiana*) on Sapelo Island, Georgia, which had been isolated for several thousand years without mammalian predators, with mainland opossums; the island animals aged more slowly by several physiological measures and had longer lifespans. Among mammals, bats and birds — which can fly away from many predators — live much longer than ground-dwelling mammals of the same size. Laboratory selection experiments in fruit flies (*Drosophila melanogaster*) in which only eggs laid by old females were used to found each generation produced, within tens of generations, lines with longer lifespans and lower early fecundity, as antagonistic pleiotropy predicts.

Not every species senesces in the same way. Some show little or no detectable increase in mortality with age over long periods of observation — the freshwater cnidarian *Hydra* in the laboratory, and some long-lived turtles and trees in the field — which fits the theory when organisms keep growing, so that fecundity rises with age and the force of selection declines less steeply. Exactly which molecular processes drive ageing in each lineage, and how they relate to these evolutionary explanations, remains an active area of research.

::: warning "Organisms age because their bodies wear out" and "ageing makes room for the young"
Wear and tear is real, but it does not explain why some organisms repair it and others do not: repair is possible (germ lines do not age across generations), so the question is why selection has not favoured more of it. And senescence is not an adaptation "for the good of the species" to clear the way for the young — that argument requires selection between groups to overpower selection within them, and it cannot explain why ageing rates track extrinsic mortality. Senescence evolves because selection is too weak to stop it, or because it is the side effect of genes favoured early in life.
:::

::: application Life histories in fisheries
Intense fishing raises adult mortality in exactly the way that predators do in the guppy streams. In many commercially fished stocks the age and size at maturity have declined over decades; a well-studied case is the Northern cod off Newfoundland and Labrador, which before its collapse in the early 1990s was maturing at progressively younger ages and smaller sizes. Part of such changes can be plastic (faster growth when the population is thinned), but analyses that control for growth suggest that some is evolutionary, a response to selection by fishing. Fishery-induced evolution towards early maturity at small size may lower the yield and slow the recovery of stocks, a consideration now discussed in fisheries management. The demography behind these effects is developed in [[ecology/population-growth]] and its conservation consequences in [[conservation-biology/small-populations]].
:::

::: history
Darwin noted in the *Origin* that species which produce many eggs suffer heavy losses at some stage of life. Life-history theory as a quantitative subject begins with LaMont Cole's paper "The population consequences of life history phenomena" (1954), which posed the paradox resolved by Charnov and Schaffer in 1973. David Lack's work on clutch size in birds (1947) and Peter Medawar's lecture *An Unsolved Problem of Biology* (1952) date from the same period, followed by George Williams's theory of antagonistic pleiotropy (1957), William Hamilton's analysis of the force of selection (1966), MacArthur and Wilson's r and K selection (1967), and the Smith–Fretwell model of offspring size (1974). Field tests of the theory, such as David Reznick and John Endler's work on Trinidadian guppies from the late 1970s and Steven Austad's island opossums (1993), followed.
:::

## Where this leads

Life histories determine the age-specific rates of birth and death that population models are built from. [[ecology/population-growth]] shows how to measure those rates in a life table and how they combine into a population's rate of increase. Fishing and other harvests that change mortality are treated there and in [[conservation-biology/small-populations]]; the evolution of reproductive behaviour, including mating systems and parental care, is treated in [[behaviour/mating-systems]].

::: summary
- A life history is the schedule of growth, reproduction and survival; organisms are **semelparous** (breed once) or **iteroparous** (breed repeatedly) ([[#def-life-history]]).
- Finite resources impose **trade-offs** ([[#def-tradeoff]]): current versus future reproduction, number versus size of offspring, reproduction versus growth. Correlational data can hide them; experiments such as brood-size manipulations reveal **costs of reproduction**.
- The **Smith–Fretwell model** ([[#prop-smith-fretwell]]) predicts the optimal offspring size where a line from the origin is tangent to the offspring fitness curve, independently of the parent's budget.
- Lack's **most productive clutch** is usually larger than the commonest clutch, mainly because of costs to the parents' future.
- **Cole's paradox** and its resolution ([[#prop-cole]]): an annual must out-produce a perennial by $p/c$ offspring; low adult relative to juvenile survival favours semelparity.
- High adult mortality favours early maturity and high reproductive effort (guppies in Trinidad). The r–K scheme describes a fast–slow continuum but has been replaced by age-specific demographic theory.
- **Senescence** evolves because the force of selection declines with age ([[#prop-force]]): through mutation accumulation, antagonistic pleiotropy and the disposable soma. Low extrinsic mortality favours slower ageing.
:::

## Exercises

::: exercise Optimal offspring size {level=1 check="6"}
In the Smith–Fretwell model with offspring fitness $f(s) = 1 - s_0/s$ ($s > s_0$), what is the optimal offspring size when the minimum viable size is $s_0 = 3$ mg?
::: solution
From [[#ex-sf]], $s^* = 2s_0 = 6$ mg.
:::
:::

::: exercise A most productive clutch {level=1 check="5"}
If the probability that each chick survives is $p(c) = 1 - 0.1c$ for a clutch of $c$ eggs, what is the most productive clutch?
::: solution
$Y(c) = c - 0.1c^2$, with $dY/dc = 1 - 0.2c = 0$ at $c = 5$; $Y(5) = 2.5$, larger than $Y(4) = Y(6) = 2.4$.
:::
:::

::: exercise Cole's paradox {level=1 check="6"}
For a plant with seed-to-adult survival $c = 0.1$ and adult survival $p = 0.6$, by how many seeds per year must an annual exceed a perennial's output to have equal fitness?
::: solution
By [[#eq-cole]], $p/c = 0.6/0.1 = 6$ seeds.
:::
:::

::: exercise Survival to age 5 {level=1 check="0.328"}
With a constant extrinsic mortality of 20 % per year, what fraction of a cohort survives to age 5? Give three decimal places.
::: solution
$l_5 = 0.8^5 = 0.328$.
:::
:::

::: exercise An annual competitor {level=2 check="120"}
A perennial produces 30 seeds a year, survives from year to year with probability 0.9, and its seeds become adults with probability 0.01. How many seeds must an annual produce to match it?
::: solution
$B_a = 30 + 0.9/0.01 = 30 + 90 = 120$. With high adult and low juvenile survival, the perennial habit is strongly favoured.
:::
:::

::: exercise The geometry of the Smith–Fretwell optimum {level=2}
Show from [[#eq-sf]] that the optimal offspring size does not change if the parent's budget $R$ doubles, and explain what the parent does with the extra resources. Then suppose that a richer environment shifts the offspring fitness curve so that $f(s) = 1 - s_0/s$ with a *smaller* $s_0$. How does the optimum change?
::: solution
$W(s) = (R/s)f(s)$; doubling $R$ doubles $W$ at every $s$ and so leaves the position of the maximum unchanged. The parent makes twice as many offspring of the same size. If $s_0$ falls (offspring need less to survive, for instance because food is plentiful), the optimum $s^* = 2s_0$ also falls: the model predicts smaller, more numerous offspring in benign environments and larger ones where offspring face harsh conditions — a pattern seen, for example, in the larger eggs of many fishes and insects breeding where food for the young is scarce.
:::
:::

::: exercise Interpreting a brood-size experiment {level=2}
In an experiment on a population of tits, broods were reduced by two chicks, left unchanged, or enlarged by two, at random. The proportion of females that bred again the next year was 0.62, 0.55 and 0.41 respectively; the number of young fledged was 6.8, 8.1 and 8.9. (a) What do the results show? (b) Why was it necessary to manipulate broods rather than compare naturally small and large broods? (c) If a female raising an enlarged brood that survives to breed again has the same success as other survivors, and each surviving female raises on average 8 young per year in future, is enlarging the brood favoured over the unchanged brood when counting this year and next year only?
::: solution
(a) Raising more young increased the number fledged this year but reduced the female's chance of breeding next year: a cost of reproduction.

(b) Females that naturally lay large clutches may be in better condition or have better territories, and would then survive better as well as raise more young; the comparison would confound acquisition with allocation. Random manipulation breaks that association.

(c) Unchanged: $8.1 + 0.55\times8 = 8.1 + 4.4 = 12.5$. Enlarged: $8.9 + 0.41\times8 = 8.9 + 3.28 = 12.18$. Counting the next year, the enlarged brood does worse: the 0.8 extra fledglings this year are outweighed by the 1.12 lost next year, consistent with the commonest clutch being below the most productive one.
:::
:::

::: exercise Guppies and predators {level=2}
Guppies from a high-predation site (where a predator eats mainly adults) are moved to a low-predation site (where a different predator eats mainly juveniles). Predict how age at maturity, size at maturity, reproductive effort and offspring size should evolve, explain each prediction, and state what you would need to do to show that the changes are evolutionary rather than plastic.
::: solution
In the new site adult mortality is lower and juvenile mortality relatively higher. Prediction: later maturity at a larger size (the risk of dying before breeding is lower, and larger females are more fecund), lower reproductive effort per brood (the adult is likely to breed again, so future reproduction is worth more), and fewer, larger offspring (larger young survive the juvenile-eating predator better). To show the change is evolutionary, rear descendants of both populations for two generations in a common laboratory environment with the same food and no predators: differences that persist are genetic. This is what Reznick and colleagues found.
:::
:::

::: exercise Antagonistic pleiotropy in numbers {level=3}
In a population of constant size, individuals survive each year with probability 0.5 and every individual alive at ages $x = 1, 2, 3, \ldots$ produces one offspring that year, so that with $l_x = 0.5^x$ the expected lifetime production of offspring is $R_0 = \sum_{x\ge1} l_x \cdot 1 = 1$. A new allele raises fecundity at age 1 by 10 % but kills its carrier at the start of age 8. (a) Calculate the expected gain and loss in lifetime offspring production. (b) Is the allele favoured? (c) How would your answer change if annual survival were 0.9?
::: solution
(a) Gain: $l_1\times0.1 = 0.5\times0.1 = 0.05$ offspring. Loss: all reproduction from age 8 on, $\sum_{x\ge8}0.5^x = 0.5^8/(1-0.5) = 0.0078$ offspring.

(b) The net change is $+0.042$, about a 4 % increase in lifetime production: the allele spreads, even though it causes death at age 8. This is antagonistic pleiotropy.

(c) With $l_x = 0.9^x$, $R_0 = \sum_{x\ge1}0.9^x = 9$ (for a population of constant size we would need lower fecundity, but the comparison is what matters). Gain: $0.9\times0.1 = 0.09$. Loss: $\sum_{x\ge8}0.9^x = 0.9^8/0.1 = 4.30$. Relative to $R_0$, the gain is 1 % and the loss 48 %; the allele is strongly selected against. Low extrinsic mortality makes late-life costs matter, so species with high adult survival should evolve slower senescence.
:::
:::

::: exercise Island opossums {level=3}
Austad found that opossums on a predator-free island aged more slowly than mainland opossums. (a) Explain how the evolutionary theory of senescence predicts this. (b) Suggest two alternative explanations that a careful study would have to rule out, and how. (c) The island opossums were also reported to have smaller litters. Is this consistent with the disposable soma theory?
::: solution
(a) Lower extrinsic mortality means more individuals survive to old age, so the force of selection against late-acting deleterious effects is stronger (more individuals are affected), and alleles trading late costs for early benefits are less favoured. Selection should produce slower senescence.

(b) The difference could be environmental rather than genetic — for example a milder climate, less disease or better food on the island; a common-garden comparison of animals from both populations raised together would test this. Measures of ageing could also be biased if mainland animals were sampled differently (for example, the oldest mainland animals are rarely caught alive); measuring the same physiological markers (Austad used collagen cross-linking in the tail tendon) in animals of known age from both populations helps.

(c) Yes: the disposable soma theory predicts a trade-off between maintenance and reproduction, so investing more in a durable body should go with lower reproductive output per bout. Smaller litters with slower ageing is the expected combination, although a single comparison of two populations cannot establish the mechanism.
:::
:::
