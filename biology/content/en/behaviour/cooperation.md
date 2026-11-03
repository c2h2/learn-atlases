When a Belding's ground squirrel (*Urocitellus beldingi*) in the meadows of the Sierra Nevada sees a weasel or a coyote approaching, it may stand up and give a shrill alarm call. Calling is dangerous: Paul Sherman, who watched marked squirrels at Tioga Pass in the 1970s, found that callers were stalked and killed by predators more often than non-callers. Yet not all squirrels called equally. Adult females, which stay and breed near where they were born and so live among their mothers, daughters and sisters, called far more often than males, which disperse and live among unrelated neighbours. Females with close relatives nearby called more than females without. Sherman's 1977 paper concluded that alarm calling is favoured because it warns kin.

Behaviour that helps others at a cost to oneself is the central puzzle of social evolution. Darwin recognised it as a potential difficulty for his theory, above all in the sterile workers of ants and bees, which do not reproduce at all. This chapter explains how such behaviour evolves. We begin by classifying social behaviours by their effects on actor and recipient, then develop W. D. Hamilton's theory of kin selection and Hamilton's rule, with the calculation of relatedness and the evidence from kin discrimination and cooperative breeding. We then turn to cooperation between non-relatives — reciprocity, the repeated prisoner's dilemma, and the role of enforcement — and finally to eusociality, the most extreme form of cooperation, in ants, bees, wasps, termites and a few other animals. The game theory of [[behaviour/conflict-game-theory]] and the family conflicts of [[behaviour/mating-systems]] are used throughout.

## A classification of social behaviour

::: definition Social behaviours by their fitness effects {#def-social-acts}
A social behaviour has a lifetime fitness effect on the actor and on the recipient. Classified by the signs of these effects (Hamilton, 1964; Stuart West, Ashleigh Griffin and Andy Gardner, 2007):

| | recipient gains | recipient loses |
|---|---|---|
| **actor gains** | mutual benefit (+/+) | selfishness (+/−) |
| **actor loses** | altruism (−/+) | spite (−/−) |

**Cooperation** is behaviour that benefits another individual and has evolved at least partly because of that benefit; it includes both mutually beneficial behaviour and altruism. **Altruism** in the evolutionary sense is defined by its lifetime fitness consequences, not by intentions.
:::

Mutually beneficial behaviour poses no special problem: lions that hunt together may each catch more than they would alone. Selfish behaviour is the default expectation. Altruism and spite require explanation, because a gene for paying a cost to help another would seem to decline in frequency. The resolution came from thinking about genes rather than individuals.

## Kin selection

### Hamilton's rule

Hamilton's insight (1964) was that a gene can increase its frequency not only by improving the reproduction of its bearer but also by helping other individuals that carry copies of it. Relatives are more likely than random members of the population to share a gene, because they inherit copies from common ancestors.

::: definition Coefficient of relatedness {#def-relatedness}
The **coefficient of relatedness** $r$ between an actor and a recipient is a measure of their genetic similarity relative to the population average: in the simplest case, the probability that a gene in the recipient is identical by descent to a gene at the same locus in the actor, above the probability for two random members of the population. In a diploid outbred population, parent and offspring and full siblings have $r = \tfrac12$; half-siblings, grandparent and grandchild, and uncle and nephew have $r = \tfrac14$; first cousins have $r = \tfrac18$. More generally, $r$ is the regression coefficient of the recipient's genetic value for the trait on the actor's.
:::

For a simple pedigree, $r$ is calculated by tracing the paths of descent connecting the two individuals through common ancestors, multiplying $\tfrac12$ for each generation step along each path, and adding over paths. Full siblings are connected by two paths (through the mother and through the father), each of two steps: $2\times(\tfrac12)^2 = \tfrac12$.

::: theorem Hamilton's rule {#thm-hamilton}
A gene causing its bearer to perform a social behaviour that costs the actor $c$ offspring and gives a recipient an extra $b$ offspring is favoured by selection if

$$
r\,b > c,
$$ {#eq-hamilton}

where $r$ is the relatedness of the recipient to the actor. Equivalently, the behaviour increases the actor's **inclusive fitness**: its own reproduction plus its effects on the reproduction of others, each weighted by relatedness. Assumptions: costs and benefits add (no strong non-additive interactions), selection is weak, and $r$ measures the genetic association between actor and recipient at the locus concerned.
:::

::: proof {collapsed}
A sketch, following the logic of the Price equation. Let individuals carry a gene for helping at frequency $p_i$ (0, ½ or 1 in a diploid). Suppose each individual's fitness is $w_i = w_0 - c\,p_i + b\,p_i'$, where $p_i'$ is the gene frequency in the individual that acts on $i$ (its social partner). The change in mean gene frequency over one generation is proportional to the covariance between gene frequency and fitness, $\Delta\bar p \propto \mathrm{Cov}(p_i, w_i) = -c\,\Var(p_i) + b\,\mathrm{Cov}(p_i, p_i')$. This is positive when $b\,\mathrm{Cov}(p_i, p_i')/\Var(p_i) > c$. The ratio $\mathrm{Cov}(p_i, p_i')/\Var(p_i)$ is the regression of the partner's gene frequency on the focal individual's — the relatedness $r$ — which gives $rb > c$. Relatedness here is a statistical association between interactants; it may arise from common descent, as in kin, or from any other process that makes helpers more likely to interact with helpers.
:::

The rule has three variables, and each can be measured. It explains not only altruism (benefits to relatives outweigh costs) but also when selfishness should be restrained (an action harming a relative by $b$ for a gain $c$ to oneself is disfavoured if $rb > c$) — the logic behind parent–offspring conflict ([[behaviour/mating-systems#prop-poc]]).

::: widget plot
f: c/x
x: 0.01, 1
y: 0, 10
sliders: c=1:0.2:3:0.1
labels: \text{minimum benefit } b = c/r
vlines: 0.125; 0.25; 0.5
caption: Hamilton's rule. For a behaviour costing the actor $c$ offspring, the curve shows the benefit $b$ to a recipient of relatedness $r$ (horizontal axis) above which helping is favoured. The vertical lines mark first cousins ($\tfrac18$), half-siblings ($\tfrac14$) and full siblings or offspring ($\tfrac12$). With $c = 1$, helping a full sibling needs $b > 2$, a half-sibling $b > 4$ and a cousin $b > 8$. As $r \to 0$ the required benefit grows without bound: altruism towards non-relatives cannot be explained by kin selection.
:::

::: example An alarm call {#ex-alarm}
A ground squirrel's alarm call raises her risk of being killed by 0.05 (in units of expected offspring lost, $c = 0.05$). It raises the survival of each of four nearby relatives by enough to give each an extra 0.03 offspring. (a) Is calling favoured if the four are her daughters or sisters? (b) If they are cousins? (c) What does this predict about calling by males?
::: solution
(a) With $r = \tfrac12$, $rb = \tfrac12\times4\times0.03 = 0.06 > 0.05$: calling is favoured. (Benefits to several recipients add.)

(b) With $r = \tfrac18$, $rb = 0.015 < 0.05$: calling is disfavoured.

(c) Males disperse from their birth area, so the squirrels near them are mostly unrelated; Hamilton's rule predicts that they should call rarely, as Sherman observed. The analysis assumes that the call's only benefits are to others. Alternative hypotheses — that callers benefit directly, for instance by causing the predator to give up — predict calling regardless of kinship, and can be tested by comparing calling rates of individuals with and without kin nearby.
:::
:::

::: warning Kin selection does not require animals to know or calculate relatedness
Hamilton's rule describes the conditions under which a gene for helping spreads. It does not imply that animals calculate $r$, know their kin, or intend to help them. Kin-biased helping can arise from simple rules — help individuals you grew up with, or individuals living near your birthplace — that work because, in the species' normal environment, such individuals are usually relatives. It is also not true that kin selection is "selection for the good of the family": the rule is about the spread of genes, and it equally predicts conflict within families wherever $r < 1$.
:::

### Recognising kin

For kin selection to favour discrimination — helping kin more than non-kin — animals must be able to tell them apart, directly or indirectly. Three mechanisms are known. **Spatial cues**: help anyone in your nest, as many birds do (which is why cuckoos can exploit them). **Familiarity**: treat as kin those you were raised with. **Phenotype matching**: compare others with a template learned from yourself or your known relatives. Warren Holmes and Paul Sherman (1982) cross-fostered Belding's ground squirrel pups between litters soon after birth. Squirrels reared together treated each other as siblings whether related or not — familiarity — but among unrelated squirrels reared apart, full sisters were less aggressive to each other than half-sisters, showing that they could also recognise kin they had never met, presumably by phenotype matching.

### Cooperative breeding

In about 9 % of bird species and fewer mammals, some individuals help others to breed, usually by feeding young that are not their own. Helpers are often grown offspring that remain on their parents' territory and help to raise their younger siblings. Two questions arise: why stay rather than leave, and why help rather than do nothing?

The **ecological constraints** hypothesis (Stephen Emlen, 1982) answers the first: young adults stay because breeding vacancies are scarce — all good territories are taken — so the chance of breeding independently is low. Jan Komdeur's experiments with the Seychelles warbler (*Acrocephalus sechellensis*) are the classic test. On Cousin Island, all suitable habitat was occupied, and many young birds stayed as helpers. When Komdeur moved some birds to unoccupied islands (from 1988, as part of a conservation programme), birds there bred independently; and when vacancies were created on Cousin by removing breeders, helpers left to fill them. Helpers on high-quality territories, where their help raised more young, were more likely to stay.

Kin selection answers the second question in many species. Stephen Emlen and Peter Wrege (1988) found that white-fronted bee-eaters (*Merops bullockoides*) in Kenya, which live in extended family clans, help at the nests of the closest relatives available to them. But helping also brings direct benefits in some species — experience, a chance of inheriting the territory, or acceptance in the group — and in some cooperative breeders helpers are often unrelated to the young they feed.

::: example To breed or to help? {#ex-helper}
A yearling bird can (a) leave and try to breed: the chance of finding a vacant territory is 0.3, and a pair that breeds raises 2 offspring, to which the yearling is related by $\tfrac12$; or (b) stay and help its parents, whose breeding success it raises by 0.8 additional fledglings, its full siblings. Which option gives higher inclusive fitness in this season? How would the answer change if vacancies became common (probability 0.7)?
::: solution
(a) Leaving: $0.3\times2\times\tfrac12 = 0.3$ offspring-equivalents. (b) Helping: $0.8\times\tfrac12 = 0.4$ sibling-equivalents, and siblings are worth the same as offspring because $r = \tfrac12$ in both cases. Helping is better. With a vacancy probability of 0.7, leaving gives $0.7\times2\times\tfrac12 = 0.7 > 0.4$: the yearling should leave. This is exactly the change Komdeur observed when he created vacant habitat: helpers left to breed. Note that a complete analysis would add future benefits — the helper's chance of inheriting the territory, and its survival in each option.
:::
:::

## Cooperation among non-relatives

Kin selection cannot explain help given to unrelated individuals. Other mechanisms can. In **by-product mutualism**, helping benefits the actor directly and the benefit to others is incidental — as when individuals hunt together because each catches more. In **reciprocity**, help is returned later. In **enforcement**, partners or third parties punish those who fail to cooperate, or reward those who do.

### Reciprocity and the prisoner's dilemma

Robert Trivers (1971) proposed that altruism among non-relatives could evolve if acts were reciprocated — "reciprocal altruism" — provided individuals interact repeatedly and can discriminate against those who do not reciprocate. The problem is captured by the **prisoner's dilemma**. Two players each choose to cooperate (C) or defect (D). The payoffs to the row player are

| | C | D |
|---|---|---|
| **C** | $R$ (reward) | $S$ (sucker's payoff) |
| **D** | $T$ (temptation) | $P$ (punishment) |

with $T > R > P > S$ (and $2R > T + S$). Whatever the other does, defecting pays more, so in a single encounter mutual defection is the only ESS — although both would do better by cooperating. In the **iterated** game, however, the same pair meets repeatedly, with a probability $w$ that each round is followed by another.

::: proposition Tit for Tat and the shadow of the future {#prop-tft}
In the iterated prisoner's dilemma, **Tit for Tat** (TFT: cooperate in the first round, then copy the partner's last move) cannot be invaded by **Always Defect** (ALLD) if

$$
w > \frac{T - R}{T - P}.
$$ {#eq-tft}

In a population of TFT players, each TFT player receives $R/(1 - w)$ over the game, while an ALLD mutant receives $T + wP/(1 - w)$.
:::

::: proof
The expected number of rounds is $1 + w + w^2 + \dots = 1/(1 - w)$. Two TFT players cooperate in every round: payoff $R/(1 - w)$. ALLD against TFT gets $T$ in the first round, after which TFT defects and both get $P$ in every later round: $T + wP + w^2P + \dots = T + wP/(1 - w)$. TFT resists invasion if $R/(1 - w) > T + wP/(1 - w)$, that is $R > T(1 - w) + wP$, or $w(T - P) > T - R$, which is [[#eq-tft]]. (TFT is not strictly an ESS, since a population of TFT can drift to "always cooperate", which ALLD can then invade; but it is stable against ALLD.)
:::

::: example How long must the relationship last? {#ex-tft}
Take $T = 5$, $R = 3$, $P = 1$ and $S = 0$, the values used by Robert Axelrod in his computer tournaments. (a) What continuation probability $w$ makes TFT stable against ALLD? (b) With $w = 0.9$, compare the payoffs of TFT and ALLD in a TFT population. (c) Why should reciprocity be expected mainly in long-lived animals in stable groups?
::: solution
(a) $w > (5 - 3)/(5 - 1) = 0.5$: the relationship must be expected to continue for more than two rounds on average.

(b) TFT: $3/0.1 = 30$. ALLD: $5 + 0.9\times1/0.1 = 14$. Cooperating with cooperators pays far better than exploiting them once.

(c) Reciprocity requires repeated interaction with the same partners (high $w$) and the ability to recognise them and remember their past behaviour. These conditions hold in long-lived animals that live in stable groups — primates, bats, some birds — and fail where encounters are brief and anonymous.
:::
:::

::: widget plot
f: r/(1 - x); 5 + x*1/(1 - x)
x: 0, 0.95
y: 0, 60
sliders: r=3:1:4.9:0.1
labels: \text{TFT among TFT}; \text{ALLD among TFT}
vlines: 0.5
caption: Total payoffs in the iterated prisoner's dilemma with $T = 5$, $P = 1$ and reward $R = r$, against the probability $w$ that the game continues (horizontal axis). Where the TFT curve is above the ALLD curve, Tit for Tat resists invasion. With $r = 3$ the curves cross at $w = 0.5$ (the vertical line); raise $r$ towards $T = 5$ and the crossing moves left, because the temptation to defect is then small.
:::

Axelrod and Hamilton (1981) showed in *Science*, using computer tournaments in which strategies submitted by game theorists played one another, that TFT was remarkably successful — nice (never first to defect), retaliatory and forgiving. Later analysis found that in noisy environments, where moves are sometimes mistaken, more forgiving strategies such as "generous TFT" or "win–stay, lose–shift" (Martin Nowak and Karl Sigmund, 1993) do better.

Convincing evidence of reciprocity in nature is surprisingly scarce. The best case is food sharing in vampire bats (*Desmodus rotundus*), which die if they fail to feed for two or three nights. Gerald Wilkinson (1984) found that bats that had fed regurgitated blood to roostmates that had not, and that sharing occurred mostly between relatives and between frequent associates. Gerald Carter and Wilkinson (2013) showed in captivity that a bat's past donations to a partner predicted the help it later received from that partner better than relatedness did. Many other proposed examples have proved to be mutualism or kin selection on closer inspection.

### Enforcement and partner choice

Cooperation can also be maintained when partners react to cheating. On coral reefs, cleaner wrasse (*Labroides dimidiatus*) eat parasites from client fish, but prefer to eat the client's protective mucus — cheating. Redouan Bshary and Alexandra Grutter showed that clients respond to cheating by chasing the cleaner or leaving to visit another cleaning station, and that cleaners cooperate more when being watched by potential clients. Clients' ability to choose their cleaner — a **biological market** — and to punish keeps cheating in check. Among plants and microbes, too, legumes reduce the oxygen supplied to root nodules whose rhizobia fix little nitrogen (Toby Kiers and colleagues, 2003): a form of sanction.

## Eusociality

::: definition Eusociality {#def-eusocial}
A species is **eusocial** if it has (1) **reproductive division of labour**, with some individuals (workers) reproducing little or not at all while others (queens, kings) reproduce; (2) **overlapping generations**, with offspring helping their parents; and (3) **cooperative care of young**. In the most advanced forms, workers are morphologically distinct and permanently sterile.
:::

Eusociality occurs in all ants and termites, in some bees and wasps, in some aphids and thrips, in snapping shrimps of the genus *Synalpheus*, in the naked mole-rat (*Heterocephalus glaber*; described as eusocial by Jennifer Jarvis in 1981) and the Damaraland mole-rat. Within the Hymenoptera (ants, bees and wasps), eusociality has evolved several times independently — once in the ants, more than once in bees and in wasps.

### The haplodiploidy hypothesis

Hymenoptera are **haplodiploid**: females develop from fertilised eggs and are diploid, males from unfertilised eggs and are haploid. Hamilton (1964) noticed a consequence. A male passes his whole genome to every daughter, so two sisters with the same father share all of their paternal genes and, on average, half of their maternal genes. Their relatedness is $\tfrac12\times1 + \tfrac12\times\tfrac12 = \tfrac34$, higher than the $\tfrac12$ between a mother and her daughters. A worker would then transmit more of her genes by raising sisters than by raising daughters — a predisposition to eusociality.

The argument has a flaw, which Robert Trivers and Hope Hare (1976) pointed out. Workers also raise brothers, to whom they are related by only $\tfrac14$ (a brother has no genes from the father). With an equal sex ratio, the average relatedness of a worker to her siblings is $\tfrac12(\tfrac34 + \tfrac14) = \tfrac12$, the same as to her own offspring. The advantage reappears only if workers can bias the colony's investment towards sisters. Trivers and Hare predicted that, in colonies with a single, once-mated queen, workers should favour a 3 : 1 ratio of investment in females to males (the ratio of their relatednesses), whereas the queen, equally related to sons and daughters, favours 1 : 1. Across ant species, investment ratios in such colonies were female-biased, closer to the workers' optimum — evidence that workers control sex allocation, and a confirmation of kin selection theory. Later work by Liselotte Sundström (1994) on the wood ant *Formica truncorum* found that workers in colonies with a singly mated queen biased investment towards females, while those in colonies with a multiply mated queen (where sisters are less related) did not, as predicted.

::: proposition Relatedness among hymenopteran sisters {#prop-haplo}
In a haplodiploid colony headed by one queen who mated with $k$ males, each fathering an equal share of the workers, the average relatedness between two workers is

$$
\bar r = \frac14 + \frac{1}{2k},
$$ {#eq-haplo}

which is $\tfrac34$ for $k = 1$, $\tfrac12$ for $k = 2$, and approaches $\tfrac14$ as $k$ becomes large. A worker's relatedness to a brother is $\tfrac14$ regardless of $k$.
:::

::: proof
Two workers share maternal genes with probability $\tfrac12$ at each locus, contributing $\tfrac12\times\tfrac12 = \tfrac14$ (each inherits half her genome from the mother). With probability $1/k$ they have the same father, in which case their paternal halves are identical, contributing $\tfrac12\times1$; otherwise their paternal genes are unrelated (assuming unrelated fathers). The total is $\tfrac14 + \tfrac12\cdot\tfrac1k$. A brother inherits only maternal genes; the probability that a gene in him is identical to one drawn from the worker's maternal half is $\tfrac12$, and the worker's genome is half maternal, giving $\tfrac14$ in the life-for-life measure used here.
:::

Honeybee queens mate with many males — typically more than ten — so the average relatedness of honeybee workers to their sisters is close to $\tfrac14 + \tfrac1{2k} \approx 0.3$, *lower* than to their own offspring. Haplodiploidy alone cannot explain why honeybee workers remain sterile.

::: example Worker policing {#ex-policing}
Honeybee workers have ovaries and can lay unfertilised eggs that develop into males. Should a worker prefer the colony to raise the queen's sons (her brothers) or other workers' sons (her nephews)? Calculate for $k = 1$ and $k = 15$ fathers, using relatedness $\tfrac14$ to a brother, $\tfrac38$ to a full sister's son and $\tfrac18$ to a half-sister's son.
::: solution
With $k$ fathers, a random other worker is a full sister with probability $1/k$, so the average relatedness to a worker-produced male is $\tfrac1k\cdot\tfrac38 + (1 - \tfrac1k)\cdot\tfrac18 = \tfrac18 + \tfrac1{4k}$.

For $k = 1$: $\tfrac18 + \tfrac14 = \tfrac38 > \tfrac14$ — workers should prefer nephews and tolerate worker reproduction.

For $k = 15$: $\tfrac18 + \tfrac1{60} = 0.142 < 0.25$ — workers should prefer brothers and remove other workers' eggs. The crossover is at $k = 2$. Francis Ratnieks predicted this in 1988, and Ratnieks and Kirk Visscher (1989) showed that honeybee workers do indeed remove eggs laid by other workers while leaving the queen's eggs — **worker policing**. As a result, although many workers have active ovaries, very few males in a honeybee colony are workers' sons. Policing, not high relatedness, enforces the sterility of most workers in this species.
:::
:::

### Monogamy and the origins of eusociality

If high relatedness among sisters is not essential, what was? Jacobus Boomsma (2007) argued that the crucial condition was lifetime **monogamy** of the founding queen: only then are a female's own offspring and her siblings equally valuable ($r = \tfrac12$ to both, in either a diploid or a haplodiploid species), so that even a small efficiency gain from helping tips Hamilton's rule in favour of staying and helping. William Hughes, Benjamin Oldroyd, Madeleine Beekman and Francis Ratnieks (2008) reconstructed mating systems across the phylogeny of ants, bees and wasps and found that single mating was ancestral in every eusocial lineage; multiple mating, as in honeybees, evolved later, after workers had become irreversibly specialised. Termites, which are diploid, have colonies founded by a monogamous king and queen. The current view is therefore that eusociality arose from monogamous families under ecological conditions — a defensible, valuable nest; food that could be shared — that made help very effective, with kin selection the evolutionary mechanism.

::: warning Eusociality and group selection
Eusocial colonies are sometimes called "superorganisms", and some authors have argued that their evolution requires group selection rather than kin selection (Martin Nowak, Corina Tarnita and E. O. Wilson, 2010). The large majority of researchers in the field responded (Patrick Abbot and more than 130 co-authors, 2011) that inclusive fitness theory explains the data and makes testable predictions — sex-ratio conflict, worker policing, the monogamy pattern — that the alternative models do not. Multilevel (group) selection and kin selection are, when formulated correctly, different ways of partitioning the same gene-frequency change, and they make the same predictions for the same assumptions; what is incorrect is the older idea that traits evolve because they benefit the group at the expense of the individual's inclusive fitness.
:::

::: quiz
In a species of wasp, colonies are founded by a single queen who mated once, but in some populations queens mate with three males. In which populations would you expect workers to bias colony investment more strongly towards females?
- [x] Populations with singly mated queens
- [ ] Populations with triply mated queens
- [ ] No difference, because workers are equally related to all siblings
- [ ] Populations with triply mated queens, because there are more workers
::: solution
With a single father, workers are related to sisters by $\tfrac34$ and to brothers by $\tfrac14$, favouring a 3 : 1 investment ratio. With three fathers, sister relatedness falls to $\tfrac14 + \tfrac16 = \tfrac5{12}$, giving a preferred ratio of $(5/12)/(1/4) = 5 : 3$. The female bias favoured by workers is weaker when queens mate multiply — the pattern Sundström found in wood ants.
:::
:::

::: application Cooperation in microbes and medicine
Kin selection theory applies to microbes. Many bacteria secrete public goods — enzymes, iron-scavenging siderophores, biofilm matrix — that benefit neighbouring cells. Ashleigh Griffin, Stuart West and Angus Buckling (2004) showed in *Pseudomonas aeruginosa* that cooperators producing siderophores outcompete non-producing cheats when populations are kept highly related, but lose to them when relatedness is low. Cheating mutants arise in chronic infections, which has suggested strategies of introducing cheats to weaken pathogenic populations (conceptual so far, and the details belong to medical research). In conservation, cooperative breeders such as African wild dogs (*Lycaon pictus*) need a minimum group size to hunt and raise pups successfully, so small packs suffer an Allee effect, a consideration in reintroduction planning.
:::

::: history
Darwin, in the *Origin* (1859), called the sterile castes of social insects "the one special difficulty, which at first appeared to me insuperable", and suggested that selection could act on families. J. B. S. Haldane noted in 1955 that he would risk his life for "two brothers or eight cousins". Hamilton's 1964 papers in the *Journal of Theoretical Biology* gave the general theory of inclusive fitness. Trivers proposed reciprocal altruism (1971) and, with Hare, the sex-ratio test (1976). E. O. Wilson's *The Insect Societies* (1971) and *Sociobiology* (1975) synthesised the field. Axelrod and Hamilton's analysis of the iterated prisoner's dilemma appeared in 1981, Ratnieks and Visscher's discovery of worker policing in 1989, and the phylogenetic evidence for ancestral monogamy in 2008.
:::

::: summary
- Social behaviours are classified by fitness effects on actor and recipient: mutual benefit, selfishness, altruism and spite. Altruism and spite need special explanation.
- Hamilton's rule: a social behaviour is favoured when $rb > c$, where $r$ is relatedness; behaviour evolves to maximise inclusive fitness. Relatedness is computed from pedigrees ($\tfrac12$ for full siblings, $\tfrac14$ for half-siblings, $\tfrac18$ for cousins).
- Kin discrimination uses spatial cues, familiarity or phenotype matching; alarm calling in ground squirrels and helping in bee-eaters follow relatedness.
- Cooperative breeding is promoted by ecological constraints on independent breeding (Seychelles warbler translocations) and by kin-selected and direct benefits of helping.
- Among non-relatives, cooperation can be maintained by mutualism, reciprocity and enforcement. In the iterated prisoner's dilemma, TFT resists ALLD when $w > (T - R)/(T - P)$; vampire bats and cleaner fish provide evidence.
- Haplodiploidy makes full sisters related by $\tfrac34$, but brothers by $\tfrac14$; worker-controlled sex ratios are female-biased, as Trivers and Hare predicted. Multiple mating lowers sister relatedness ($\tfrac14 + 1/2k$) and favours worker policing.
- Eusociality arose in lineages with lifetime monogamous founders, under ecological conditions that made helping efficient — consistent with kin selection.
:::

## Exercises

::: exercise Relatedness {level=1 check="1/8"}
What is the coefficient of relatedness between an individual and its first cousin in an outbred diploid population?
::: solution
First cousins share a pair of grandparents. There are two paths (through the grandmother and through the grandfather), each with four steps (up to the parent, up to the grandparent, down to the uncle or aunt, down to the cousin): $2\times(\tfrac12)^4 = \tfrac18$.
:::
:::

::: exercise Hamilton's rule {level=1}
An act costs the actor 1 offspring and gives a half-sibling 3 extra offspring. Is it favoured?
::: solution
$rb = \tfrac14\times3 = 0.75 < c = 1$: no. It would be favoured towards a full sibling ($\tfrac12\times3 = 1.5 > 1$).
:::
:::

::: exercise The shadow of the future {level=1 check="2/3"}
In a prisoner's dilemma with $T = 7$, $R = 5$, $P = 4$ and $S = 0$, what is the minimum continuation probability $w$ for TFT to resist invasion by ALLD?
::: solution
$w > (T - R)/(T - P) = (7 - 5)/(7 - 4) = 2/3$.
:::
:::

::: exercise Sisters with several fathers {level=2 check="5/12"}
A hymenopteran queen mates with three males that father equal numbers of workers. What is the average relatedness between two of her workers?
::: solution
By [[#eq-haplo]], $\tfrac14 + \tfrac1{2\times3} = \tfrac14 + \tfrac16 = \tfrac5{12} \approx 0.417$.
:::
:::

::: exercise Policing threshold {level=2}
Using the result of [[#ex-policing]], show that workers should prefer the queen's sons to other workers' sons whenever the queen mates with more than two males.
::: solution
Workers prefer brothers when $\tfrac14 > \tfrac18 + \tfrac1{4k}$, i.e. $\tfrac18 > \tfrac1{4k}$, i.e. $k > 2$. At $k = 2$ the two are equal ($\tfrac18 + \tfrac18 = \tfrac14$).
:::
:::

::: exercise Helping or breeding {level=2}
A young male bird can help his parents, increasing their output by 1.2 full siblings, or leave and breed with probability $p$, raising 2.5 offspring if he does. Above what value of $p$ should he leave? If his parents divorce and he would be helping his mother and a new stepfather, raising half-siblings, how does the answer change?
::: solution
Helping gives $1.2\times\tfrac12 = 0.6$; leaving gives $p\times2.5\times\tfrac12 = 1.25p$. He should leave if $p > 0.6/1.25 = 0.48$. With half-siblings, helping gives $1.2\times\tfrac14 = 0.3$, so he should leave if $p > 0.24$. In some cooperative breeders, such as the long-tailed tit and the white-fronted bee-eater, helpers are indeed less likely to help when the young are less closely related.
:::
:::

::: exercise Interpreting vampire-bat data {level=2}
In a captive colony of vampire bats, each bat is fasted in turn and the donors that feed it are recorded. Across all pairs, the amount a bat donates to a partner correlates with relatedness ($r$ between 0 and 0.5) and, more strongly, with the amount it previously received from that partner. In a model including both, past receipt explains much more of the variation than relatedness. What do these results suggest, and what alternative explanation should be considered?
::: solution
They suggest that sharing is maintained partly by reciprocity — bats give to those that have given to them — and not only by kin selection, though kinship also contributes. An alternative is that donation and receipt are both driven by a third factor: bats that associate often (roosting together, grooming) both give and receive more, so past receipt may reflect association rather than a contingent response to help. Experiments that manipulate whether a partner has helped (for example, preventing a bat from donating to a particular partner and observing whether that partner reduces its donations in return) are needed to show that help is contingent.
:::
:::

::: exercise A sex-ratio test {level=3}
In an ant species with singly mated queens, colonies with a queen invest 3 : 1 in females to males. Queenless colonies, in which workers produce males, are also found. Explain why the 3 : 1 ratio supports worker control of investment, and predict the investment ratio favoured by workers if queens mated with two males each fathering half the workers.
::: solution
A queen is related equally ($\tfrac12$) to her sons and daughters and favours equal investment, 1 : 1. Workers are related to sisters by $\tfrac34$ and to brothers by $\tfrac14$ and favour investment in the ratio of these relatednesses, 3 : 1. The observed 3 : 1 matches the workers' optimum, implying that workers control allocation (for example, by selectively rearing female larvae or by killing male larvae). With two fathers, sister relatedness is $\tfrac14 + \tfrac14 = \tfrac12$, and workers favour $(1/2)/(1/4) = 2 : 1$. (These "preferred ratios" come from Trivers and Hare's argument that each party should allocate investment in proportion to relatedness, given that in a population at equilibrium the reproductive value of the sexes balances.)
:::
:::

::: exercise Can reciprocity get started? {level=3}
In a population of ALLD players, a single TFT mutant appears. Explain why it cannot invade, even if $w$ is high. How could reciprocity nonetheless become established?
::: solution
A rare TFT meets only ALLD players: it receives $S$ in the first round and $P$ thereafter, $S + wP/(1 - w)$, less than the ALLD players' $P/(1 - w)$, so it is selected against. ALLD is an ESS too. TFT can spread if TFT players interact with each other more often than at random — for instance, if mutants are clustered (because relatives live near each other, giving a positive relatedness between partners), or if population structure (small groups, limited dispersal) brings TFT players together. With a probability $\rho$ that a TFT meets another TFT, TFT invades when $\rho\,R/(1 - w) + (1 - \rho)(S + wP/(1 - w)) > P/(1 - w)$. Kin structure can therefore start reciprocity off, after which it is maintained by the repeated interaction — an example of how the mechanisms of cooperation can combine.
:::
:::
