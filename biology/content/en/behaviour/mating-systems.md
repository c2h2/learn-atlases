The dunnock (*Prunella modularis*) is a small, brown, inconspicuous bird of European gardens and hedgerows — and, as Nick Davies discovered in the Cambridge University Botanic Garden in the 1980s, one with a startlingly varied sex life. In the same population, some females lived with one male (monogamy), some males with two females (polygyny), some females with two males (polyandry), and some groups of two or three males shared two or three females (polygynandry). These arrangements were not species traits but outcomes of conflict. A female's territory was larger where food was scarce, too large for one male to defend alone, so a second male could settle in it; a dominant (alpha) male tried to guard the female and monopolise matings, while the subordinate (beta) male tried to mate with her when the alpha was not looking. The female, for her part, solicited matings from the beta male — and the beta male helped to feed the chicks in proportion to his share of matings, as estimated from DNA fingerprinting of the young. The mating system emerged from what each individual did to maximise its own reproductive success.

This chapter explains how such systems arise. We define mating systems — distinguishing social arrangements from genetic parentage — and use the ecological theory of Emlen and Oring to explain when polygamy is possible. We work through the polygyny threshold model, then female-defence polygyny and leks, polyandry and the benefits females gain from multiple mating, and the quantitative theory of sperm competition. The second half turns to parental care: which sex cares, why, and the conflicts that care creates between the sexes, between parents and offspring, and among siblings. The basic theory of sexual selection — anisogamy, Bateman gradients, the operational sex ratio and mate choice — is in [[evolution/sexual-selection]] and is assumed here; communication between mates is treated in [[behaviour/communication]].

## Mating systems: social and genetic

::: definition Mating systems {#def-mating}
A population's **mating system** describes how many mates individuals of each sex have in a breeding season and how pairs are formed and maintained:
- **monogamy** — each male and female has one mate (for a season or for life);
- **polygyny** — some males mate with several females, each female with one male;
- **polyandry** — some females mate with several males, each male with one female;
- **polygynandry** — several males and several females share mates within a group;
- **promiscuity** — individuals of both sexes mate with several partners, without lasting bonds.

The **social mating system** describes who associates and breeds together; the **genetic mating system**, revealed by parentage analysis, describes who actually fathers and mothers the offspring.
:::

The distinction between social and genetic mating systems became crucial with the arrival of DNA fingerprinting in the late 1980s. Many birds, long considered faithfully monogamous, turned out to have frequent **extra-pair paternity** (EPP): chicks fathered by a male other than the social mate. Simon Griffith, Ian Owens and Katherine Thuman's 2002 review of socially monogamous birds found extra-pair offspring in most species studied, with an average of about 11 % of offspring and 19 % of broods containing at least one extra-pair chick. Some species, such as the superb fairy-wren (*Malurus cyaneus*) of Australia, have well over half of their offspring sired outside the pair, while others, such as many seabirds, have almost none.

::: example Are extra-pair chicks scattered at random? {#ex-epp}
In a socially monogamous songbird, 11 % of chicks are extra-pair, and broods contain five chicks. If each chick independently had an 11 % chance of being extra-pair, what fraction of broods would contain at least one? The observed fraction is 19 %. What does the difference suggest?
::: solution
The probability that all five chicks are within-pair is $0.89^5 = 0.558$, so a fraction $1 - 0.558 = 0.44$ of broods would contain at least one extra-pair chick. The observed 19 % is far lower: extra-pair chicks are clustered in fewer broods than expected by chance. Some females produce several extra-pair young, most produce none. This pattern indicates that extra-pair paternity depends on the female (or her social male, or her territory and neighbours), not on independent chance for each egg — which is what models of female choice of extra-pair mates predict, for example when females paired with low-quality males seek extra-pair matings with better neighbours.
:::
:::

::: warning "Monogamy means fidelity" and "males are eager, females coy"
Social monogamy does not imply genetic monogamy: in most socially monogamous birds some offspring are sired by other males, often because females seek extra-pair matings. The stereotype of "ardent males and coy females", taken from a simplified reading of Bateman and Trivers, ignores that females of many species mate multiply, solicit matings and benefit from doing so. The direction and strength of sexual selection depend on ecology and on the operational sex ratio ([[evolution/sexual-selection]]), not on a fixed nature of either sex.
:::

## The ecology of mating systems

Why are some species polygynous and others monogamous? Stephen Emlen and Lewis Oring (1977) argued that the answer lies in the **environmental potential for polygamy**: the extent to which individuals of one sex can monopolise several members of the other, which depends on how resources and mates are distributed in space and time.

- When females, or the resources they need, are **clumped in space**, a male can defend several at once: **resource-defence polygyny** (a male holds a territory rich in food or nest sites, and several females settle in it) or **female-defence polygyny** (a male guards a group of females directly, as elephant seals and red deer do).
- When females are **dispersed** and receptive **asynchronously**, a male can find and mate with several in turn; when they are dispersed and receptive **synchronously**, he cannot, and monogamy is more likely.
- When neither resources nor females can be defended economically, males may display at traditional sites, **leks**, where females come to mate.

The potential for polygamy is only realised if individuals can exploit it. Where both parents are needed to raise any young — for example, where chicks are altricial and must be fed at a high rate — a male that deserts loses his offspring, and monogamy with biparental care may be favoured even if the environment would allow polygyny.

### The polygyny threshold model

Suppose males defend territories of different quality, and females arrive one at a time and choose where to settle. A female can pair with an unmated male on a poor territory, or become the second mate of an already-mated male on a good territory. Why would she accept the second option, given that she must share the male's help and the territory's resources? Jared Verner and Mary Willson (1966) and Gordon Orians (1969) proposed an answer.

::: proposition The polygyny threshold {#prop-polygyny}
Let a female's reproductive success on a territory of quality $q$ be $W_m(q)$ if she is the only female and $W_s(q) = W_m(q) - D$ if she is a secondary female, where $D > 0$ is the cost of sharing the male and territory. A female should settle as a secondary female on a territory of quality $q_1$ rather than as the only female on a territory of quality $q_2$ if

$$
W_m(q_1) - D > W_m(q_2).
$$

The difference in territory quality needed, $W_m(q_1) - W_m(q_2) > D$, is the **polygyny threshold**. Polygyny is expected when territories differ enough in quality, and the cost of sharing is small. Assumptions: females choose freely, know territory quality, and the primary female cannot prevent the secondary from settling.
:::

::: example Choosing a territory {#ex-threshold}
In a population of marsh birds, a female's expected number of fledglings is $W_m = 0.5q$, where $q$ is the density of emerging insects on the territory (in arbitrary units), and becoming a secondary female costs $D = 1.5$ fledglings. A mated male holds a territory with $q = 12$; the best unmated male holds one with $q = 8$. Where should the next female settle? How would the answer change if the mated male did not feed nestlings at all, so that sharing him cost little ($D = 0.5$)? What would the primary female prefer?
::: solution
As a secondary female on the good territory she expects $0.5\times12 - 1.5 = 4.5$ fledglings; with the unmated male, $0.5\times8 = 4$. She should become the second mate. The threshold difference in quality is $D/0.5 = 3$ units; here the difference is 4.

With $D = 0.5$ the secondary option yields 5.5, still better, and the threshold is only 1 unit — polygyny is favoured more readily when males contribute little care. The primary female, however, loses by the secondary's arrival (if her own success falls by sharing), so she may try to prevent it by aggression towards prospecting females. The model predicts the *secondary* female's choice; conflict between the females is part of the outcome, as in the dunnock.
:::
:::

::: widget plot
f: 0.5*x; 0.5*x - d
x: 0, 16
y: -1, 9
sliders: d=1.5:0:4:0.1
labels: \text{monogamous female, } W_m(q); \text{secondary female, } W_m(q) - D
points: 8, 4; 12, 4.5
caption: The polygyny threshold model of [[#ex-threshold]]. A female's success against territory quality $q$ as the only female (upper line) and as a secondary female (lower line). The two points compare settling with the unmated male on $q = 8$ and with the mated male on $q = 12$. The secondary option is better whenever the point on the lower line is higher; raise the cost $d$ above 2 and monogamy on the poorer territory becomes the better choice.
:::

Tests of the model have given mixed results. In red-winged blackbirds (*Agelaius phoeniceus*), females on territories with more polygynous males often did as well as monogamous females, as the model predicts if they choose by territory quality. In the pied flycatcher (*Ficedula hypoleuca*), Rauno Alatalo and colleagues found that secondary females raised fewer young than monogamous females; males hold two widely separated territories, and the researchers argued that females may be **deceived** into settling with an already-mated male because they cannot tell that he is mated. The polygyny threshold model is a hypothesis about female choice, and its assumptions — free choice, complete information — must be checked in each case.

### Leks

On a lek, males defend tiny display territories that contain no resources, and females visit, choose and mate, then raise the young alone. Leks occur in birds (sage grouse, black grouse, ruffs, manakins, birds of paradise), mammals (some antelopes, such as the Uganda kob, and fallow deer in some populations), frogs and insects. Mating is usually very skewed: a few males, often those near the centre of the lek, obtain most matings. Why males cluster is still debated. Under the **hotspot** hypothesis, males gather where females are most often encountered; under the **hotshot** hypothesis, less attractive males settle near attractive ones to intercept females; under **female preference**, females prefer to choose among clustered males, which lowers their search costs and predation risk. The evidence differs among species, and several processes probably act together.

The **lek paradox** is a puzzle for theory: if females consistently choose the same few males, additive genetic variation in the preferred traits should be depleted, so that choice ceases to bring genetic benefits — yet females continue to choose. Proposed resolutions include condition dependence (many genes affect condition, and a male's ornament reflects them all, so variation is continuously renewed by mutation; Locke Rowe and David Houle, 1996), and parasite-driven fluctuations in which genotypes are best.

## Polyandry and multiple mating

In the sense of social systems, polyandry — a female with several male partners, each caring for a clutch — is rare. It is found in jacanas, phalaropes and some sandpipers, where females lay clutches for successive males that incubate them alone, and sexual selection on females is correspondingly strong ([[evolution/sexual-selection]]). But **multiple mating by females** in the genetic sense is very common. Why should a female mate with more than one male, given that one mating usually provides enough sperm?

Several kinds of benefit have been proposed and tested.

- **Direct benefits**: nuptial gifts, access to resources on a male's territory, help with care from several males (as in dunnocks), or ensuring sufficient sperm.
- **Genetic benefits**: "trading up" to a better male than the social mate; increasing the genetic diversity of offspring; avoiding the costs of genetic incompatibility, including inbreeding, by letting sperm of several males compete and allowing **cryptic female choice** of sperm inside the reproductive tract.
- **Avoiding costs of resistance**: when males harass females, it may cost less to mate than to resist ("convenience polyandry").

Experimental evidence for genetic benefits exists in several species. Tom Tregenza and Nina Wedell (2002) found that female field crickets (*Gryllus bimaculatus*) mated to several males had higher hatching success than females mated the same number of times to one male, and Jeanne Zeh and David Zeh argued that polyandry is an insurance against genetic incompatibility. Costs include time, energy, risk of predation and disease transmission, and harm from males during mating ([[evolution/sexual-selection]], on sexual conflict).

### Sperm competition

When females mate multiply, the competition between males continues after mating ([[evolution/sexual-selection]]). How much should a male invest in each ejaculate? Geoff Parker's models treat fertilisation as a **raffle**: each sperm is a ticket, and a male's share of fertilisations is proportional to the number of sperm he contributes.

::: proposition Ejaculate investment in a sperm-competition raffle {#prop-raffle}
Suppose $n$ males each mate with a female and compete for fertilisation of eggs worth $V$ in total; a male investing $s$ in sperm, against rivals investing $S$ in total, fertilises a fraction $s/(s + S)$ and pays a cost $cs$ (in lost future matings). At the symmetric ESS, each male invests

$$
s^* = \frac{V}{c}\cdot\frac{n - 1}{n^2}.
$$ {#eq-raffle}

Investment is zero with no competition ($n = 1$; in reality, a minimum needed to fertilise), highest when there are two competitors, and declines slowly as $n$ increases further, because each additional unit of sperm buys a smaller share. Assumptions: a fair raffle (no precedence of first or last male, no cryptic choice), males cannot assess the number of rivals precisely, and costs are linear.
:::

::: proof
A focal male's payoff is $W(s) = V\,s/(s + S) - cs$. Then $W'(s) = V S/(s + S)^2 - c$. At a symmetric ESS all males invest $s^*$, so $S = (n - 1)s^*$ and the focal male's best response must be $s = s^*$: $V(n - 1)s^*/(ns^*)^2 = c$, which gives [[#eq-raffle]]. $W''(s) = -2VS/(s + S)^3 < 0$, so this is a maximum.
:::

The model distinguishes the **risk** of sperm competition (the probability that a female mates with another male), which increases optimal investment, from its **intensity** (the number of competing ejaculates), which beyond two decreases it. Comparative tests largely support the first prediction: across primates, birds, frogs, fishes and butterflies, species in which females mate more often with several males have larger testes relative to body size (Paul Harvey and Alexander Harcourt; Tim Birkhead and Anders Møller). In the dung fly *Scathophaga stercoraria*, Parker found that the last male to mate fertilises most of the eggs laid next; male flies guard females after mating, which reduces the chance of being displaced.

::: example Measuring last-male precedence {#ex-p2}
Parker estimated sperm precedence with the **sterile-male technique**: a female is mated first with a normal male and then with a male sterilised by irradiation, whose sperm fertilise eggs that fail to develop. Of eggs laid by such females, 18 % hatch; of eggs laid by females mated to two normal males, 90 % hatch. Estimate $P_2$, the proportion of eggs fertilised by the second male.
::: solution
Eggs fertilised by the irradiated second male do not hatch; eggs fertilised by the normal first male hatch at the normal rate of 90 %. If a fraction $1 - P_2$ is fertilised by the first male, the hatching rate is $0.90(1 - P_2) = 0.18$, so $1 - P_2 = 0.2$ and $P_2 = 0.8$. The second male fertilises about 80 % of eggs. (The technique assumes that irradiated sperm compete normally, which is checked by reversing the order of matings: then $P_2$ is estimated as the hatching rate divided by the control rate.)
:::
:::

::: widget plot
f: (x - 1)/x^2
x: 1, 12
y: 0, 0.3
labels: s^*\,c/V\ \text{(ejaculate investment per male)}
points: 2, 0.25; 3, 0.2222; 5, 0.16; 10, 0.09
caption: Optimal ejaculate investment in the raffle model [[#eq-raffle]], scaled by $V/c$, against the number $n$ of males competing for a female's eggs (only whole numbers are meaningful; the curve joins them). Investment rises from zero with no competition to a peak with two competitors, then falls slowly: with ten males each invests about a third as much as with two. This intensity effect is distinct from the risk of competition, which raises investment.
:::

## Parental care

Parental care — any behaviour that increases offspring survival at a cost to the parent — varies enormously. In most fishes with care, the male alone cares; in birds, about four-fifths of species have biparental care (Andrew Cockburn, 2006); in mammals, females always lactate, and males help in a minority of species, mainly those that are socially monogamous (fewer than one in ten mammal species, according to Dieter Lukas and Tim Clutton-Brock's 2013 analysis). What determines who cares?

::: definition Parental investment and care {#def-care}
**Parental care** is any behaviour of a parent that increases the fitness of its offspring. **Parental investment** (Robert Trivers, 1972) is care measured by its cost: any investment in an offspring that increases that offspring's chance of surviving, at the cost of the parent's ability to invest in other offspring, current or future. The cost is therefore an **opportunity cost**, which differs between the sexes and with ecology.
:::

Three factors recur in explanations.

1. **Opportunity costs.** A parent that cares forgoes other matings. Where one sex has high potential reproductive rates (usually males), caring costs it more, and desertion is favoured unless care greatly improves offspring survival.
2. **Association with the offspring.** In fishes with external fertilisation, the male is often defending a territory where the female lays her eggs, so he is already present and can guard eggs at little extra cost; the female leaves after spawning. With internal fertilisation, the female holds the eggs or young, and the male may already be gone.
3. **Certainty of parentage.** A male whose paternity is uncertain gains less from caring. The prediction is less straightforward than it seems: if paternity is equally uncertain across all broods a male might sire, caring for the current brood is as valuable as any alternative. Within species, some birds (such as dunnocks) and fishes adjust care to their share of paternity, while others do not.

These factors are combined in game-theoretic models of care, in which each parent's best strategy depends on the other's (John Maynard Smith, 1977).

::: proposition A parental care game {#prop-caregame}
Let $P_0$, $P_1$ and $P_2$ be the probabilities that a brood survives with no, one or two parents caring ($P_0 < P_1 < P_2$). A male that deserts gains a fraction $p$ of an additional brood through new matings. If the female cares, the male should also care if

$$
P_2 > P_1(1 + p),
$$ {#eq-care}

and desert otherwise. The analogous condition, with her own opportunity cost, determines the female's choice. Stable outcomes include biparental care, uniparental care by either sex, and (when $P_0$ is not much less than $P_1$) desertion by both.
:::

::: example To care or to desert? {#ex-care}
In a bird, a brood survives with probability 0.1 with no parent, 0.5 with one and 0.8 with two. If the female cares, should the male care when his chance of a second brood after deserting is (a) $p = 0.4$ and (b) $p = 0.8$? (c) What ecological changes would favour male desertion?
::: solution
(a) Caring gives $P_2 = 0.8$ broods; deserting gives $P_1(1 + p) = 0.5\times1.4 = 0.7$. The male should care.

(b) Deserting gives $0.5\times1.8 = 0.9 > 0.8$: the male should desert.

(c) Anything that raises $p$ — a female-biased operational sex ratio, a long breeding season with females available asynchronously — or reduces the benefit of a second parent ($P_2 - P_1$), for example rich food supplies that let one parent feed the brood alone, or precocial chicks that feed themselves. These are the conditions under which polygyny and uniparental care are found in birds, in agreement with Emlen and Oring's ecological theory.
:::
:::

::: application Mating systems in conservation and captive breeding
Mating systems affect effective population size, because polygyny and lekking concentrate reproduction in few males, increasing genetic drift ([[evolution/mutation-drift-gene-flow]]). Captive breeding programmes for lekking or polygynous species, such as the kakapo (*Strigops habroptilus*) of New Zealand, manage pairings to keep the contributions of males more even than they would be naturally. Disturbance of leks, for example by energy developments near sage-grouse leks in western North America, can reduce attendance and breeding, and protecting lek sites has become a focus of conservation planning for such species.
:::

### Conflict within the family

Care creates conflicts. Parents and offspring do not share identical interests, as Robert Trivers (1974) pointed out. A parent is equally related to all its offspring (by $\tfrac12$ in a diploid species) and should distribute investment to maximise the total. Each offspring is related to itself by 1 but to a full sibling by only $\tfrac12$, so it values its own benefit more than its siblings', and should try to obtain more than the parent would give.

::: proposition Parent–offspring conflict {#prop-poc}
Let a unit of parental investment give a benefit $B$ to the current offspring and a cost $C$ to the parent's future offspring (in units of offspring survival). From the parent's point of view, investment should continue while $B > C$. From the current offspring's point of view, investment should continue while

$$
B > r\,C,
$$

where $r$ is its relatedness to the future offspring ($r = \tfrac12$ for full siblings, $\tfrac14$ for half-siblings). Over the range $rC < B < C$, the offspring favours more investment than the parent: this is the zone of **parent–offspring conflict**. The argument is an application of Hamilton's rule ([[behaviour/cooperation]]).
:::

Conflict over weaning is the classic example: young mammals often protest when their mothers start to refuse milk, and the theory predicts that weaning conflict should be more intense when future siblings are likely to be half-siblings (sired by a different father). The same logic predicts **sibling rivalry**. In some birds of prey, egrets and boobies, chicks hatch asynchronously, and the older chick attacks and sometimes kills the younger (**siblicide**), especially when food is short. Douglas Mock's studies of cattle egrets (*Bubulcus ibis*) and great egrets showed that chicks fight more when food is delivered in small, monopolisable items. Parents typically do not intervene; the younger chick may serve as insurance against the failure of the first.

The most remarkable exploitation of care is **brood parasitism**. The common cuckoo (*Cuculus canorus*) lays its eggs in the nests of other species, and the hatchling ejects the host's eggs and is raised alone. Hosts have evolved to reject eggs that do not match their own, and cuckoos have evolved egg mimicry in response, with different host-specific races (gentes) of cuckoo laying eggs matching their particular hosts — a coevolutionary arms race studied by Nick Davies and Michael Brooke from the 1980s ([[evolution/coevolution]]).

::: quiz
In a mammal in which a mother's successive litters usually have different fathers, how would you expect the intensity of weaning conflict to compare with that in a species where successive litters usually have the same father?
- [x] Greater, because offspring are less related to their future siblings
- [ ] Smaller, because mothers invest less in each litter
- [ ] The same, because the mother is equally related to all her offspring
- [ ] Greater, because the father helps more
::: solution
With different fathers, successive offspring are half-siblings ($r = \tfrac14$ rather than $\tfrac12$). The offspring's threshold for demanding investment falls to $B > C/4$, widening the zone of conflict ($C/4 < B < C$ rather than $C/2 < B < C$). The mother's optimum is unchanged, since she is related by $\tfrac12$ to all her offspring regardless of their father.
:::
:::

::: history
Darwin discussed polygamy in *The Descent of Man* (1871). David Lack's *Ecological Adaptations for Breeding in Birds* (1968) surveyed mating systems and parental care. Verner and Willson (1966) and Orians (1969) proposed the polygyny threshold model; Trivers introduced parental investment (1972) and parent–offspring conflict (1974); Emlen and Oring's ecological classification appeared in 1977, and Maynard Smith's game-theoretic analysis of parental care the same year. Parker's work on dung flies and sperm competition began in 1970. DNA fingerprinting, developed by Alec Jeffreys in 1985, transformed the field from the late 1980s by revealing extra-pair paternity, and Davies's dunnock studies (*Dunnock Behaviour and Social Evolution*, 1992) showed how mating systems emerge from conflicts of interest. Clutton-Brock's *The Evolution of Parental Care* (1991) synthesised the theory of care.
:::

::: summary
- Mating systems (monogamy, polygyny, polyandry, polygynandry, promiscuity) describe social arrangements; parentage analysis reveals the genetic mating system, often with extra-pair paternity clustered in some broods.
- Emlen and Oring: the spatial and temporal distribution of resources and receptive mates sets the potential for polygamy; the need for biparental care can keep species monogamous.
- The polygyny threshold model: a female should accept a mated male if his territory's advantage exceeds the cost of sharing, $W_m(q_1) - D > W_m(q_2)$; tests show both support and deception.
- Leks are aggregations of displaying males without resources, with highly skewed mating; the lek paradox concerns how choice for genetic benefits persists.
- Females commonly mate multiply, for direct benefits, genetic benefits (trading up, diversity, compatibility) or to avoid harassment.
- In a sperm-competition raffle, ejaculate investment peaks with two competitors ($s^* \propto (n - 1)/n^2$); the risk of competition increases investment; last-male precedence is measured with sterile males.
- Who cares depends on opportunity costs, association with offspring and parentage; in a care game the male should care if $P_2 > P_1(1 + p)$.
- Parent–offspring conflict arises when $rC < B < C$; sibling rivalry and siblicide, and brood parasitism, are further conflicts over care.
:::

## Exercises

::: exercise Classifying mating systems {level=1}
Classify each: (a) a male elephant seal guards a group of 40 females on a beach and sires most of their pups; (b) a female red phalarope lays a clutch for one male, which incubates it, then lays a second clutch for another; (c) in an acorn woodpecker group, several males and several females breed together and share parentage; (d) a pair of swans breed together for many years.
::: solution
(a) Female-defence (harem) polygyny. (b) Sequential polyandry, with sex-role reversal. (c) Polygynandry. (d) Social monogamy, long-term; genetic monogamy would need parentage analysis to confirm.
:::
:::

::: exercise Clustering of extra-pair paternity {level=1 check="0.373"}
If 11 % of chicks are extra-pair and broods contain four chicks, what fraction of broods would contain at least one extra-pair chick if extra-pair paternity were independent among chicks (three decimal places)?
::: solution
$1 - 0.89^4 = 1 - 0.627 = 0.373$.
:::
:::

::: exercise Sperm investment {level=1 check="2/9"}
In the raffle model [[#eq-raffle]], what is $s^*c/V$ when three males compete?
::: solution
$(3 - 1)/3^2 = 2/9 \approx 0.222$.
:::
:::

::: exercise Last-male precedence {level=2 check="0.75"}
Females mated first to a normal male and then to an irradiated male have 20 % hatching; females mated to normal males only have 80 % hatching. Estimate $P_2$.
::: solution
$0.80(1 - P_2) = 0.20$, so $1 - P_2 = 0.25$ and $P_2 = 0.75$.
:::
:::

::: exercise A polygyny threshold {level=2 check="2"}
A female's success is $W_m = 0.4q$ on a territory of quality $q$, and being a secondary female costs $D = 0.8$ fledglings. By how many units of quality must a mated male's territory exceed an unmated male's for the female to prefer the mated male?
::: solution
She prefers him if $0.4q_1 - 0.8 > 0.4q_2$, that is $q_1 - q_2 > 0.8/0.4 = 2$ units.
:::
:::

::: exercise Male care decision {level=2}
In a fish, eggs survive with probability 0.2 without care and 0.6 with care by one parent; two parents give no further benefit (0.6). The male can attract another female to his nest while guarding, but the female, if she leaves, can spawn again with probability 0.5. Which parent should care? Explain why male-only care is so common in fishes with external fertilisation.
::: solution
Since a second parent adds nothing ($P_2 = P_1 = 0.6$), at most one parent should care. Guarding a nest does not stop the male attracting further females to spawn in it, so male care costs him almost no matings. The female's opportunity cost of caring is the 0.5 chance of spawning again: if she deserts and the male cares, she expects $0.6\times(1 + 0.5) = 0.9$ broods, against $0.6$ if she cares. So the female should desert and the male care. Male-only care is common in fishes with external fertilisation because males defending nest territories can guard several clutches at once while continuing to court, whereas caring would cost females further spawning.
:::
:::

::: exercise Weaning conflict zone {level=2}
Using [[#prop-poc]], find the zone of parent–offspring conflict (as a range of $B/C$) for full siblings and for half-siblings. Which predicts more conflict, and why?
::: solution
The parent wants investment while $B/C > 1$; a full-sibling offspring while $B/C > \tfrac12$; a half-sibling offspring while $B/C > \tfrac14$. The conflict zones are $\tfrac12 < B/C < 1$ and $\tfrac14 < B/C < 1$. The half-sibling zone is wider: the offspring discounts the cost to future siblings more, since it shares fewer genes with them.
:::
:::

::: exercise Interpreting a removal experiment {level=3}
In a socially monogamous bird, researchers remove the male from some nests after hatching. Broods without males fledge 2.1 chicks on average; control broods fledge 3.4. In another species, removal reduces fledging only from 3.2 to 3.0. (a) What do these results tell you about the value of male care in the two species? (b) In which species would you expect polygyny to be more common, and why? (c) What is a weakness of removal experiments?
::: solution
(a) In the first species, male care substantially improves brood success ($P_2/P_1 = 3.4/2.1 = 1.62$); in the second, it adds little ($3.2/3.0 = 1.07$). (b) Polygyny should be more common in the second: a male that deserts or takes a second female loses little from his first brood, so even a modest chance of extra matings ($p > 0.07$) makes desertion pay, by [[#eq-care]]. In the first species, desertion pays only if $p > 0.62$. (c) Removal may change the female's behaviour (she may compensate partly by feeding more, which underestimates the male's contribution in an intact pair, or she may be stressed), and removed males' territories may be invaded by other males; the effect of removal is not necessarily the same as the effect of the male's natural absence.
:::
:::

::: exercise A model of mate guarding {level=3}
After mating, a male can guard a female for a period (losing time for other matings) or leave. If he leaves, the probability that she remates before laying is $m$, in which case he fertilises only a fraction $1 - P_2$ of her eggs. Guarding prevents remating but means that he forgoes a fraction $g$ of a new mating. Show that guarding pays if $m P_2 > g$, and use this to predict when guarding should be more common.
::: solution
Leaving: he fertilises a fraction $1 - mP_2$ of the current female's eggs (with probability $m$ she remates and he loses $P_2$), plus $g$ of a new female's eggs, in units of one clutch: $1 - mP_2 + g$. Guarding: he fertilises all of the current female's eggs and gains nothing else: $1$. Guarding pays when $1 > 1 - mP_2 + g$, that is $mP_2 > g$. Guarding should be favoured where females are likely to remate (high $m$, as when males are abundant or the operational sex ratio is male-biased), where last-male precedence is strong (high $P_2$, as in dung flies), and where new mates are hard to find (low $g$, as late in the season). Parker's dung flies, with high $P_2$ and many searching males on each cowpat, guard females after mating, as predicted.
:::
:::
