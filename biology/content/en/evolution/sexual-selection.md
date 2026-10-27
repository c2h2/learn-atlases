The tail of a peacock troubled Darwin. "The sight of a feather in a peacock's tail, whenever I gaze at it, makes me sick!", he wrote to the botanist Asa Gray in 1860. A train of some two hundred elongated feathers, each with an iridescent eyespot, is costly to grow, conspicuous to predators and an encumbrance in flight. It is hard to see how it could help a bird survive. Darwin's answer, set out in *The Descent of Man, and Selection in Relation to Sex* (1871), was that it does not need to: it helps a male to *mate*. Traits that increase success in competition for mates can spread even if they reduce survival, because reproduction, not survival, is what natural selection counts.

This chapter develops that idea. We begin with why the sexes differ at all — the asymmetry in the size of their gametes — and how it leads to competition for mates and to choosiness, and measure the strength of sexual selection with Bateman gradients and the operational sex ratio. We then treat the two great branches of sexual selection: competition within a sex, and mate choice by the other sex, with the main hypotheses for why choosers prefer elaborate traits. We end with sexual conflict, and with Fisher's argument for why most species produce sons and daughters in equal numbers. The tools of [[evolution/natural-selection]] are used throughout.

## Why the sexes differ

::: definition Sexual selection {#def-sexsel}
**Sexual selection** is selection arising from differences in reproductive success caused by competition for mates or for fertilisations. It has two main forms: **intrasexual selection**, competition among members of one sex (usually males) for access to mates, by fighting, display, or sperm competition; and **intersexual selection** (mate choice), in which members of one sex (usually females) choose among potential mates. Traits favoured by sexual selection — weapons, ornaments, displays — are **secondary sexual characters**.
:::

Sexual selection is a component of natural selection in the broad sense (it is differential reproduction of heritable variants), but it is useful to separate it because it can favour traits that reduce survival.

The asymmetry between the sexes starts with gametes. By definition, **females** are the sex that produces the larger gametes (eggs or ovules) and **males** the sex that produces the smaller ones (sperm or pollen). This **anisogamy** is thought to have evolved from equal gametes (isogamy, still found in many algae and fungi) by disruptive selection: small gametes can be made in great numbers, large gametes provision the zygote, and intermediate gametes do neither well (Geoff Parker, Robin Baker and Vic Smith, 1972). Once it exists, it has a consequence. A male can fertilise far more eggs than one female can produce, so male reproductive success is usually limited by the number of mates he obtains, while a female's is limited by her resources for making eggs and caring for young.

Robert Trivers (1972) generalised this as **parental investment**: whichever sex invests more in each offspring becomes a limiting resource for the other. In most mammals females invest gestation and lactation, males often nothing after mating, and males compete for females. Where the roles are reversed, so is sexual selection. In pipefishes and seahorses the male broods the eggs in a pouch; in some pipefish species (*Syngnathus typhle*) females compete for males and are the more ornamented sex. In jacanas and phalaropes, males incubate the eggs, and females are larger, more brightly coloured and compete for mates.

### Measuring sexual selection

In 1948 Angus Bateman counted offspring and mates in small populations of *Drosophila melanogaster* using genetic markers. He reported that males' reproductive success was more variable than females', and rose more steeply with the number of mates. Bateman's data and analysis have since been criticised (Patricia Gowaty and colleagues re-examined them in 2012 and found biases in how offspring were assigned), but his framework has proved durable, and modern parentage analysis with DNA markers allows it to be applied properly.

::: definition Bateman gradient and the opportunity for selection {#def-bateman}
The **Bateman gradient** $\beta_{ss}$ of a sex is the slope of the least-squares regression of reproductive success (number of offspring) on mating success (number of mates). The **opportunity for selection** $I = \Var(W)/\bar W^2$ is the variance in reproductive success divided by the square of its mean (the variance in relative fitness); the **opportunity for sexual selection** $I_s$ is the same quantity calculated for mating success. These measure the potential for selection: the upper limit on how much selection could change any trait, in standardised units.
:::

The key point is that sexual selection is strong in a sex when *both* conditions hold: mating success varies ($I_s$ large) and reproductive success depends on it (steep $\beta_{ss}$). Their product, $\beta_{ss}^2 I_s$ in suitable units, bounds the strength of sexual selection on any trait (Adam Jones, 2009).

::: example Bateman gradients from parentage data {#ex-bateman}
Parentage analysis in a small population of 8 males and 8 females gives the following numbers of mates and offspring.

| individual | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 |
|---|---|---|---|---|---|---|---|---|
| mates | 0 | 0 | 1 | 1 | 2 | 2 | 3 | 4 |
| offspring | 0 | 0 | 5 | 4 | 9 | 11 | 14 | 19 |

| individual | F1 | F2 | F3 | F4 | F5 | F6 | F7 | F8 |
|---|---|---|---|---|---|---|---|---|
| mates | 0 | 1 | 1 | 1 | 2 | 2 | 3 | 3 |
| offspring | 0 | 8 | 8 | 7 | 9 | 10 | 10 | 10 |

Calculate each sex's Bateman gradient, opportunity for selection and opportunity for sexual selection.
::: solution
Both sexes have 13 matings and 62 offspring in total, as they must: every offspring has one mother and one father, and every mating involves one of each.

**Males.** Mean mates 1.625; mean offspring 7.75. By least squares, the slope of offspring on mates is $\beta_{ss} = 4.77$ offspring per mate ($R^2 = 0.99$). Variance in offspring number is 39.94, so $I = 39.94/7.75^2 = 0.665$. Variance in mates is 1.734, so $I_s = 1.734/1.625^2 = 0.657$.

**Females.** Mean mates 1.625, mean offspring 7.75. The slope is $\beta_{ss} = 2.57$, but almost all of it comes from the one unmated female: among mated females the slope is only 1.21 (a second or third mate adds little). Variance in offspring is 9.69, so $I = 0.161$; variance in mates is 0.984, so $I_s = 0.373$.

Males have about four times the variance in relative reproductive success, and their success rises steeply and almost linearly with mates; females' success saturates after the first mating. The potential for sexual selection is much greater in males. Means are equal in the two sexes, as they must be; it is the *variances* that differ.
:::
:::

The figure lets you fit the male regression yourself.

::: widget regression
points: 0,0; 0,0.3; 1,5; 1,4; 2,9; 2,11; 3,14; 4,19
degree: 1
x: -0.5, 5
y: -2, 22
caption: Offspring against number of mates for the eight males of [[#ex-bateman]] (one of the two unmated males is drawn at 0.3 offspring so that both points are visible; this changes the slope only slightly). The least-squares slope is the Bateman gradient, about 4.7 offspring per mate here (4.77 with both unmated males at zero). Drag points to the female values (offspring 8, 8, 7, 9, 10, 10, 10 for 1, 1, 1, 2, 2, 3, 3 mates) and see how the line flattens; drag the unmated male up to see how sensitive a gradient based on few individuals is to one point.
:::

### The operational sex ratio

Sexual selection is intensified when the ratio of sexually active males to receptive females — the **operational sex ratio** (OSR), introduced by Stephen Emlen and Lewis Oring in 1977 — is biased. Even with equal numbers of adult males and females, the OSR can be strongly male-biased if females spend longer out of the mating pool, while pregnant, incubating or caring for young, than males do.

::: example An operational sex ratio from time-outs {#ex-osr}
In a population with equal numbers of adult males and females, each female, after mating, spends 40 days caring for her brood before she can mate again; each male needs 4 days to replenish sperm. Mating itself takes about a day. What is the operational sex ratio, and which sex is expected to compete for mates?
::: solution
Each individual cycles between "available" (time in) and "unavailable" (time out). If mating takes 1 day and a female is then out for 40, she is available for about $1/41$ of her time; a male is available $1/5$ of his. With equal adult numbers, the OSR is

$$
\frac{\text{available males}}{\text{available females}} = \frac{1/5}{1/41} = \frac{41}{5} = 8.2.
$$

About eight males compete for every receptive female, so strong competition among males and choosiness in females are expected. This is the logic of Tim Clutton-Brock and Amanda Vincent (1991) and Clutton-Brock and Geoff Parker (1992): the sex with the higher **potential reproductive rate** competes, the other chooses. Reverse the time-outs, as in pipefish whose males brood, and the prediction reverses.
:::
:::

## Competition within a sex

**Contests** favour size, strength and weapons. Northern elephant seals (*Mirounga angustirostris*) are among the most extreme cases: adult males are several times the mass of females and fight for control of groups of females on breeding beaches; Burney Le Boeuf's long-term studies in California showed that a small fraction of males sire most pups in a season, while most males sire none. Deer antlers, the horns of beetles, and the enlarged claw of fiddler crabs are weapons; the giant extinct deer *Megaloceros giganteus* carried antlers spanning more than three metres.

Competition need not involve fighting. Males may compete in **scrambles** to find females first (favouring sensory and locomotor ability rather than size: in many insects males are smaller than females and emerge earlier), in **endurance** (staying longest on the breeding ground), or by **display** at leks, aggregations in which males defend tiny territories with no resources and females visit to choose.

### Sperm competition

When a female mates with more than one male, competition continues after mating. Geoff Parker recognised this **sperm competition** in 1970. It explains why males of polyandrous species have larger testes relative to body size — chimpanzees, whose females mate with many males, have far larger testes for their size than gorillas, whose males guard harems — and the extraordinary diversity of male genitalia and ejaculates. Male damselflies (*Calopteryx*) use spines on the penis to scoop out rivals' sperm before transferring their own; males of many insects guard females after mating or plug their reproductive tracts. Females are not passive: **cryptic female choice** — biasing fertilisation among the sperm of different males — has been shown in several species.

## Mate choice

Choice is expected wherever choosers can gain by being selective. The hypotheses for what they gain form a spectrum, and several can apply at once.

::: definition Benefits of mate choice {#def-choice}
**Direct benefits**: a choosy female gains resources that increase her own survival or fecundity — food, territory, protection, parental care, fewer parasites caught from her mate. **Indirect (genetic) benefits**: her offspring inherit genes that make them more attractive (**Fisherian runaway**, "sexy sons") or more viable (**good genes**, including **handicap** and **parasite-resistance** models). **Sensory bias**: a preference evolved for other reasons — finding food, avoiding predators — and males evolve traits that exploit it, with no benefit to the chooser needed.
:::

**Direct benefits** are the easiest to understand. Female hanging flies (*Hylobittacus apicalis*) mate only with males that bring a large insect as a nuptial gift, and copulate longer — receiving more sperm from him — the larger the gift (Randy Thornhill, 1976). In birds with biparental care, females often prefer males that defend good territories or feed young at high rates.

**Experiments with ornaments.** Malte Andersson's 1982 experiment with the long-tailed widowbird *Euplectes progne* in Kenya is a model of how to test mate choice in the field. Males have tails about half a metre long; Andersson cut the tails of some males and glued the clipped pieces onto the tails of others, creating males with shortened, normal (cut and reglued) and elongated tails. Males with experimentally elongated tails attracted more females to nest in their territories than controls, and those with shortened tails fewer. Females preferred tails longer than any that occur naturally, suggesting that natural selection, not female preference, limits tail length.

::: example Where sexual and natural selection balance {#ex-balance}
Suppose a male's mating success is proportional to his tail length $L$, while his probability of surviving to the breeding season falls as $e^{-kL}$, with $k = 2\ \mathrm{m^{-1}}$. Which tail length maximises his expected number of matings, and what is his survival then, relative to a male with no tail?
::: solution
Expected matings are proportional to $W(L) = L\,e^{-kL}$. Then $dW/dL = e^{-kL}(1 - kL)$, which is zero at $L^* = 1/k = 0.5$ m; $W$ increases below and decreases above, so this is the maximum. At $L^* = 0.5$ m, survival relative to a tailless male is $e^{-kL^*} = e^{-1} = 0.37$: the optimal male accepts a 63 % lower chance of surviving, because surviving males with long tails mate much more. Natural selection alone (survival) would favour $L = 0$; sexual selection alone, ever-longer tails; their product sets an intermediate optimum — the result Andersson's experiment suggests for widowbirds. If predators become commoner ($k$ larger), the optimum shortens.
:::
:::

### Fisher's runaway

R. A. Fisher (1915, and in *The Genetical Theory of Natural Selection*, 1930) proposed that a female preference and a male trait can reinforce each other. Suppose that, for whatever initial reason, some females prefer males with longer tails, and that both the preference and the tail are heritable. Females with the preference mate with long-tailed males, so their offspring carry both the genes for long tails and the genes for the preference: the two become **genetically correlated**. Any selection favouring long tails then carries the preference along with it, which increases the advantage of long tails further. The process can "run away", exaggerating both until natural selection against the trait balances it. A female benefits because her sons inherit the attractive trait — the "sexy son" — even if the trait carries no other advantage. Russell Lande (1981) and Mark Kirkpatrick (1982) put the argument on a quantitative footing, showing that it yields a line of possible equilibria and can be unstable.

### Good genes and handicaps

Alternatively, ornaments may advertise heritable quality. Amotz Zahavi's **handicap principle** (1975) proposed that an ornament is a reliable signal precisely *because* it is costly: only males in good condition can afford to produce a large one, so it cannot be faked. Initially controversial, the idea was given a formal basis by Alan Grafen in 1990, with the condition that the cost of signalling must be greater for lower-quality individuals. W. D. Hamilton and Marlene Zuk (1982) suggested that showy ornaments advertise resistance to parasites, which varies heritably because hosts and parasites coevolve ([[evolution/coevolution]]); across North American passerine birds they found that species with heavier blood-parasite loads had brighter males.

Tests of good genes compare offspring sired by preferred and non-preferred males with the mother held constant. Allison Welch, Raymond Semlitsch and Carl Gerhardt (1998) split clutches of eggs of female grey treefrogs (*Hyla versicolor*) and fertilised them artificially with sperm from males with long or short calls (females prefer long calls). Offspring of long-calling males grew faster and performed better as tadpoles and juveniles. In peafowl, Marion Petrie (1994) found that offspring of males with more elaborate trains grew faster and survived better when released in a park.

::: warning "Ornaments must be adaptations for the good of the species" and "females choose consciously"
Sexual selection favours traits that win mates for their bearers, often at a cost to survival and to the population (a population of males burdened with costly trains may be more vulnerable to predators or to environmental change). Nothing in the theory requires the trait to benefit the species. Nor do choice models require conscious decision or aesthetic judgement: a female "chooses" whenever some males are more likely than others to mate with her because of their phenotype — through a preference in her sensory system, a tendency to approach louder calls, or a resistance to mating with persistent males.
:::

### Sensory bias

A preference can exist before the trait it favours. Females of the túngara frog *Engystomops pustulosus* (formerly *Physalaemus pustulosus*) prefer calls that end with "chucks", which only males of this species produce. Michael Ryan and colleagues (1990) found that females of a related species, *P. coloradorum*, whose males do not make chucks, also prefer calls with chucks added artificially. The preference appears to be a property of the female auditory system that predates the chuck. Alexandra Basolo (1990) showed the same with swordtail fishes: female platyfish (*Xiphophorus maculatus*), whose males lack the sword of their relatives, prefer males fitted with artificial swords; mapping the traits on a phylogeny suggested the preference arose before the sword.

::: quiz
In a species of moth, males release a pheromone, and females are attracted most strongly to males that release the most. Researchers find that females mated to high-emitting males produce offspring with higher survival, even when all offspring are raised in the same conditions without the father. Which hypothesis does this support most directly?
- [ ] Direct benefits
- [x] Good genes (indirect benefits for offspring viability)
- [ ] Sensory bias
- [ ] Fisherian runaway alone
::: solution
The benefit appears in offspring raised without the father, so it is not a direct benefit to the female, and it concerns viability rather than attractiveness, so it goes beyond pure Fisherian runaway (which predicts attractive sons, not better survivors). It does not test sensory bias, which concerns the origin of the preference. The result is the kind of evidence offered for good-genes models — though a confound is possible if females mated to preferred males invest more in eggs (**differential allocation**), which must be controlled.
:::
:::

## Sexual conflict

The evolutionary interests of the two sexes are not identical. A male's fitness may be increased by traits that make his mate lay more eggs immediately or refuse other males, even if they shorten her life; a female's by resisting matings that cost her more than they give. This is **sexual conflict**, and it can drive coevolution between the sexes like an arms race.

In *Drosophila melanogaster*, proteins in male seminal fluid increase the female's egg-laying and reduce her receptivity to other males, but also shorten her life. William Rice (1996) prevented females from evolving for about 40 generations, by repeatedly mating evolving males with females from an unchanging stock; the males evolved to be more successful in sperm competition and more harmful to females — an arms race in which the females had been prevented from replying. Conversely, Brett Holland and Rice (1999) enforced monogamy, removing the conflict, and males evolved to be less harmful. In water striders (*Gerris*), males have grasping structures and females anti-grasping spines, and the balance between them across species predicts mating rates (Göran Arnqvist and Locke Rowe). In bed bugs (*Cimex lectularius*), males inseminate by piercing the female's abdominal wall ("traumatic insemination"), and females have evolved a special organ, the spermalege, that reduces the damage.

::: application Sexual selection in conservation and breeding
Because sexual selection can make one sex expendable, it changes effective population size ([[evolution/mutation-drift-gene-flow#ex-ne]]): a population in which a few males sire most young loses genetic diversity faster. Captive breeding programmes choose pairings to equalise family sizes for this reason. Hunting that selectively removes males with the largest horns or tusks can impose strong artificial selection on those traits: in bighorn sheep (*Ovis canadensis*) on Ram Mountain, Alberta, trophy hunting over three decades was associated with declining horn size (David Coltman and colleagues, 2003), and in several African elephant populations heavy poaching has increased the frequency of tuskless females.
:::

## Why equal numbers of sons and daughters?

Sexual selection is about competition for mates, which depends on how many of each sex there are. Why are there usually about equal numbers? It is not because it is "good for the species": a population with one male per ten females would grow faster. Carl Düsing (1884) and, in its famous form, Fisher (1930) gave the answer.

::: proposition Fisher's principle of equal investment {#prop-fisher}
In a large, randomly mating population, let a fraction $r$ of offspring be male. Because every offspring has exactly one father and one mother, the sons and the daughters of the current generation together supply, as fathers and mothers, all the genes of the generation after. A parent that produces a fraction $x$ of sons among its offspring therefore has expected fitness (through grandchildren) proportional to

$$
W(x) \propto \frac{x}{r} + \frac{1 - x}{1 - r}.
$$ {#eq-fisher}

If $r < \tfrac12$, parents producing more sons do better; if $r > \tfrac12$, parents producing more daughters do. The only sex ratio that cannot be invaded by a mutant producing a different ratio is $r = \tfrac12$. With unequal costs of sons and daughters, the stable state is equal *investment* in the two sexes, not equal numbers. Assumptions: random mating in a large population, the sex ratio controlled by the parents, and the costs and benefits of each sex not depending on anything else (no local mate competition, no inheritance of condition).
:::

::: proof
Let the next generation's total reproductive output be $T$ offspring. Each has one father and one mother, so males collectively and females collectively each contribute $T$ parentages. With $nr$ males and $n(1-r)$ females among $n$ young, an average son has $T/(nr)$ offspring and an average daughter $T/(n(1-r))$. A parent producing $k$ young of which $kx$ are sons has expected grandchildren $kx\cdot T/(nr) + k(1-x)\cdot T/(n(1-r))$, which is proportional to [[#eq-fisher]]. This is linear in $x$, with slope $1/r - 1/(1 - r)$: positive if $r < \tfrac12$, negative if $r > \tfrac12$. So the rarer sex is always favoured, and the population ratio is pushed to $\tfrac12$, where the slope is zero and no mutant does better. If a son costs $c$ times as much as a daughter, a parent with a fixed budget trades $c$ daughters for one son, and the same argument applied to investment gives equality of total investment in sons and daughters.
:::

::: widget plot
f: x/r + (1 - x)/(1 - r)
x: 0, 1
y: 0, 6
sliders: r=0.4:0.1:0.9:0.01
labels: W(x)\ \text{for population sex ratio } r
vlines: 0.5
caption: The relative fitness [[#eq-fisher]] of a parent producing a fraction $x$ of sons (horizontal axis), in a population whose sex ratio is $r$. With $r = 0.4$ (sons rare) the line slopes upwards: parents producing sons do better, and the population ratio rises. Move $r$ above 0.5 and the slope reverses. At exactly $r = 0.5$ the line is flat — every strategy has the same fitness, and no mutant can invade.
:::

::: example When sons are rare {#ex-fisher}
In a population where 40 % of young are male, how much more valuable, in expected offspring, is a son than a daughter? What happens to a mutant that produces only sons?
::: solution
By [[#eq-fisher]], a son is worth $1/r = 2.5$ and a daughter $1/(1 - r) = 1.67$ (in units of offspring per average individual). A son is $2.5/1.67 = 1.5$ times as valuable. A parent producing only sons has fitness $1/0.4 = 2.5$, against $0.4\times2.5 + 0.6\times1.67 = 2.0$ for a parent with the population ratio: a 25 % advantage. As such genes spread, $r$ rises towards 0.5 and the advantage disappears.
:::
:::

Fisher's argument is a classic piece of **frequency-dependent** reasoning: the value of a strategy depends on what others do. W. D. Hamilton (1967) showed when it fails. In fig wasps and many parasitoid wasps, a few females lay eggs in one fig or host, and their offspring mate among themselves before the daughters disperse. Then sons compete with their own brothers for mates (**local mate competition**), and a mother does best producing just enough sons to fertilise her daughters. In Hamilton's model for diploids, with $n$ foundresses laying in each patch, the stable fraction of sons is

$$
x^* = \frac{n - 1}{2n},
$$ {#eq-lmc}

which is 0 for a single foundress (strictly, the minimum number of sons needed), 0.25 for two, and approaches $\tfrac12$ as $n$ grows. (Haplodiploidy, as in wasps, modifies the formula slightly.) Female-biased sex ratios that track foundress number in this way have been found in fig wasps and parasitoids, a quantitative confirmation of the theory.

::: history
Darwin introduced sexual selection in the *Origin* (1859) and developed it fully in *The Descent of Man* (1871). Wallace accepted male–male competition but doubted female choice, and for most of a century choice was neglected. Fisher proposed the runaway process in 1915 and formalised it, together with the sex-ratio argument, in 1930. Bateman's *Drosophila* study appeared in 1948, Parker's account of sperm competition in 1970, Trivers's theory of parental investment in 1972, Zahavi's handicap principle in 1975, Emlen and Oring's ecological theory of mating systems in 1977, and Andersson's widowbird experiment and Hamilton and Zuk's parasite hypothesis both in 1982. Andersson's monograph *Sexual Selection* (1994) consolidated the field. Since the 1990s, DNA parentage analysis has revealed that "extra-pair" fertilisations are widespread even in socially monogamous birds, transforming estimates of the strength of sexual selection.
:::

::: summary
- Sexual selection is differential reproduction due to competition for mates or fertilisations: intrasexual competition and intersexual choice. It can favour traits that reduce survival.
- Anisogamy defines the sexes; the sex with higher parental investment and lower potential reproductive rate (usually females) is limiting, so the other sex competes. Role-reversed species (pipefish, jacanas) confirm the logic.
- The Bateman gradient (offspring on mates) and the opportunities for selection $I = \Var(W)/\bar W^2$ and $I_s$ measure its potential; the operational sex ratio sets its intensity.
- Competition favours weapons, size, scramble ability, endurance and, after mating, sperm competition (large testes in polyandrous species).
- Mate choice may yield direct benefits, Fisherian "sexy sons", good genes (handicaps, parasite resistance) or exploit sensory biases; field experiments (widowbirds, treefrogs, swordtails, túngara frogs) test them.
- Sexual conflict produces coevolutionary arms races between the sexes, demonstrated by experimental evolution in *Drosophila*.
- Fisher's principle: with random mating, the rarer sex is worth more, so the stable sex ratio is equal investment; local mate competition gives female-biased ratios $(n-1)/2n$.
:::

## Exercises

::: exercise The opportunity for selection {level=1 check="0.5"}
In a population of males, the mean number of offspring is 4 and the variance is 8. What is the opportunity for selection $I$?
::: solution
$I = \Var(W)/\bar W^2 = 8/16 = 0.5$.
:::
:::

::: exercise A biased sex ratio {level=1 check="3"}
In a population in which 25 % of young are male, how many times more valuable, in expected offspring, is a son than a daughter?
::: solution
By [[#eq-fisher]], a son is worth $1/r = 1/0.25 = 4$ and a daughter $1/(1 - r) = 1/0.75 = 1.33$, so a son is worth $4/1.333 = 3$ daughters. In general the ratio is $(1 - r)/r$.
:::
:::

::: exercise Local mate competition {level=1 check="0.4"}
Using [[#eq-lmc]], what proportion of sons should a mother produce if five foundresses lay eggs in each patch?
::: solution
$x^* = (5 - 1)/(2\times5) = 4/10 = 0.4$.
:::
:::

::: exercise Operational sex ratio {level=2 check="4"}
Adult sex ratio is equal. After each mating, females are unavailable for 15 days and males for 3 days; mating takes 1 day. What is the operational sex ratio (males per available female)?
::: solution
Females are available $1/16$ of the time, males $1/4$, so OSR $= (1/4)/(1/16) = 4$ males per receptive female.
:::
:::

::: exercise Effective size under polygyny {level=2 check="19"}
In a lekking bird, 5 males sire all the young of 95 females in a season. Using the effective-size formula of [[evolution/mutation-drift-gene-flow]], what is $N_e$ (nearest whole number)?
::: solution
$N_e = 4N_mN_f/(N_m + N_f) = 4\times5\times95/100 = 19$. The strong sexual selection reduces the effective size to a fifth of the hundred breeding birds.
:::
:::

::: exercise Interpreting a manipulation experiment {level=2}
In an experiment like Andersson's, tails of male birds are shortened, left intact (cut and reglued) or lengthened. The mean numbers of nests per male in the following weeks are 0.5, 1.3 and 1.9 respectively; before manipulation the three groups did not differ. (a) Why was a "cut and reglued" control needed? (b) What do the results show about female preference? (c) If females prefer tails longer than any natural tail, why are natural tails not longer?
::: solution
(a) Cutting and handling might themselves affect behaviour or attractiveness; the reglued control has the same treatment but normal length, so differences from it are due to length alone. Measuring the groups before manipulation also shows that they did not differ at the start.
(b) Mating success increased with tail length across the whole range tested, including beyond the natural range: females prefer longer tails, and the preference is open-ended (directional).
(c) Other costs of long tails — energetic cost of growth, reduced flight performance, greater predation, possibly costs of maintenance — impose natural selection against length. The observed tail length is a balance between sexual selection for longer tails and natural selection for shorter ones.
:::
:::

::: exercise A fitness-neutral sex ratio? {level=2}
Using [[#eq-fisher]], show that when $r = \tfrac12$ every value of $x$ gives the same fitness. Does that mean that a population at $r = \tfrac12$ will stay there if drift moves it slightly away? Explain.
::: solution
At $r = \tfrac12$, $W(x) \propto 2x + 2(1 - x) = 2$, independent of $x$: no strategy is better than another. But if the population ratio drifts to $r = 0.49$, sons become slightly more valuable ($1/0.49 > 1/0.51$), so genes for producing more sons are favoured, pushing $r$ back up; similarly for $r > 0.5$. Selection on the sex ratio is weak near $\tfrac12$ but always restoring, so the equilibrium is stable: it is an evolutionarily stable strategy in the sense that the population state is protected from invasion and restored after perturbation.
:::
:::

::: exercise Hypotheses for an ornament {level=3}
In a species of fish, males have a red belly patch. Design observations or experiments to distinguish (a) direct benefits, (b) good genes, (c) Fisherian runaway and (d) sensory bias as explanations for female preference for redder males. For each, say what result would support the hypothesis.
::: solution
(a) **Direct benefits**: measure whether redder males provide better care, territories or fewer parasites to their mates, e.g. by comparing egg survival in nests of red and dull males with egg source controlled. Support: redder males' nests have higher success for reasons attributable to the male's behaviour or resources.
(b) **Good genes**: split clutches of one female and fertilise them *in vitro* with sperm of red and dull males, rearing all offspring without fathers. Support: offspring of red males survive or grow better.
(c) **Fisherian runaway**: test for a genetic correlation between male redness and female preference — e.g. artificially select lines for redness and see whether female preference changes correspondingly; or show that sons of red males have higher mating success but no viability advantage. Support: the correlation, and the attractiveness of sons.
(d) **Sensory bias**: test whether female sensitivity to red evolved for another purpose (red food items, as in sticklebacks feeding on red prey), and whether related species whose males lack red patches also have females preferring red. Support: the preference exists in species where the trait does not, and the phylogeny shows it is older than the trait.
The hypotheses are not mutually exclusive; several may operate together.
:::
:::

::: exercise Investment, not numbers {level=3 check="0.333"}
In a species in which a son costs twice as much to raise as a daughter, what fraction of the young produced should be sons at the stable sex ratio, according to Fisher's principle (three decimal places)? Explain why.
::: solution
Fisher's principle equalises total investment in the two sexes. If the fraction of sons is $x$ and a son costs 2 units, a daughter 1, equality requires $2x = 1\times(1 - x)$, so $x = 1/3 = 0.333$. In numbers, daughters outnumber sons two to one, but the investment in each sex is equal. The reason: with fewer sons, each son is worth more ($1/r$), exactly compensating for his greater cost — the value per unit of investment is then the same for both sexes, so no change in allocation helps.
:::
:::
