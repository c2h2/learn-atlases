No species evolves alone. The environment that selects a gazelle's speed includes cheetahs, whose own speed is selected by gazelles; a plant's chemical defences are selected by the insects that eat it, and the insects' detoxifying enzymes by the plant; a flower's shape is selected by its pollinators and the pollinators' mouthparts by the flower. When two lineages exert selection on each other, each adapts to a target that moves as the other adapts, and the result is **coevolution**: arms races that escalate, cycles that never settle, and partnerships so close that neither partner can live without the other.

This chapter looks at coevolution between enemies — predators and prey, hosts and parasites — and between mutualists. We use the selection models of [[evolution/natural-selection]] with fitnesses that depend on the other species, which makes selection **frequency-dependent**, and see why that produces cycles; we look at the evidence for arms races and for the Red Queen hypothesis, including its role in explaining sex; we treat the evolution of virulence; and we ask how mutualisms resist cheating. Ecological interactions themselves are treated in [[ecology]].

## What coevolution is

::: definition Coevolution {#def-coevolution}
**Coevolution** is reciprocal evolutionary change in interacting species: an evolutionary change in a trait of one species in response to a trait of another, followed by an evolutionary response of the second species to the change in the first (Daniel Janzen, 1980). **Pairwise (specific) coevolution** involves two species; **diffuse (guild) coevolution** involves groups of species that exert selection jointly, such as many insect herbivores on many plants. **Cospeciation** is the parallel splitting of the lineages of two interacting groups, so that their phylogenies match.
:::

Janzen's definition is strict on purpose. That two species fit each other is not evidence of coevolution: a bee may visit a flower adapted to it without the bee having adapted to the flower. Coevolution requires evidence of reciprocal selection and response, which is why it is easier to demonstrate in fast-evolving systems — bacteria and their viruses, or plants and their pathogens — than in long-lived animals.

The idea itself is much older. In 1862, in a book on orchid pollination, Darwin described the Madagascan star orchid *Angraecum sesquipedale*, whose nectar lies at the bottom of a spur about 30 cm long, and predicted that a moth with a proboscis of similar length must exist to pollinate it. The hawkmoth *Xanthopan morganii praedicta* — named for the prediction — was described in 1903, and was finally filmed visiting the orchid in the 1990s. A long spur is favoured because a moth whose proboscis does not quite reach the nectar must press its head against the flower, picking up pollen; a longer proboscis is favoured because it reaches more nectar. Each favours lengthening of the other.

Paul Ehrlich and Peter Raven (1964) generalised the idea in their study of butterflies and their food plants. Butterfly families tend to feed on particular plant families with characteristic chemical defences — the cabbage whites (Pierinae) on mustards and their relatives, which make glucosinolates. They proposed an **escape-and-radiate** process: a plant lineage evolving a new defence escapes its herbivores and diversifies; eventually an insect lineage evolves a way around the defence and radiates onto the new plants. Phylogenetic work on Pierinae and Brassicales (Hanna Wheat and colleagues, 2007; Patrick Edger and colleagues, 2015) has supported this for glucosinolates and the enzyme that allows the butterflies to detoxify them.

## Arms races between predators and prey

The common garter snake *Thamnophis sirtalis* in western North America eats the rough-skinned newt *Taricha granulosa*, whose skin contains tetrodotoxin (TTX), a neurotoxin that blocks voltage-gated sodium channels ([[cell-biology/membrane-transport]]). A single newt from the most toxic populations contains enough to kill many snakes. Edmund Brodie Jr. and Edmund Brodie III found that snakes in those populations are hundreds of times more resistant to TTX than snakes from areas without toxic newts. Resistance is due to amino-acid substitutions in the snake's skeletal-muscle sodium channel, Na$_\mathrm{v}$1.4, at the sites where TTX binds (Shana Geffeney and colleagues, 2002, 2005). The resistance is costly: highly resistant snakes crawl more slowly. Across the range, newt toxicity and snake resistance are matched in some regions — coevolutionary "hot spots" — and mismatched in others, where one species has escalated beyond the other or neither has escalated at all.

That geographical pattern is general. John Thompson's **geographic mosaic theory of coevolution** (1994, 2005) proposes that an interaction varies in strength and even in sign from place to place, so that reciprocal selection is strong in some populations and absent in others, and gene flow among them mixes the outcomes. Coevolution is therefore best studied across many populations, not in one.

Predator–prey arms races can also be read in the fossil record. Geerat Vermeij's **escalation** hypothesis (1987) points to the increase, through the Mesozoic, of shell-crushing predators (crabs, rays, teleost fish) and the parallel increase in thick, spiny and tightly coiled shells of gastropods — the "Mesozoic marine revolution".

### The ecological backdrop

Arms races play out against population dynamics, which can themselves cycle. The simplest model of a predator and its prey is that of Alfred Lotka (1925) and Vito Volterra (1926).

::: proposition The Lotka–Volterra predator–prey model {#prop-lv}
Let $N$ be the number of prey and $P$ of predators. If prey grow exponentially at rate $r$ in the absence of predators and are killed at rate $aNP$, and predators convert prey eaten into new predators with efficiency $b$ and die at rate $m$, then

$$
\frac{dN}{dt} = rN - aNP,\qquad \frac{dP}{dt} = baNP - mP.
$$ {#eq-lv}

The interior equilibrium is $N^* = m/(ba)$, $P^* = r/a$. All other positive solutions are closed cycles around it, with predator peaks lagging prey peaks by about a quarter of a cycle. Assumptions: no density dependence in the prey, a linear (type I) functional response, no age structure, and constant parameters — which makes the neutral cycles structurally fragile; with prey self-limitation they become damped spirals.
:::

The prey equilibrium is set by *predator* parameters ($m$, $a$, $b$), and the predator equilibrium by the prey's growth rate — a counter-intuitive feature that matters for coevolution: if prey evolve to grow faster, the model predicts more predators, not more prey.

::: widget phaseplane
f: r*x - a*x*y
g: b*a*x*y - m*y
x: 0, 600
y: 0, 150
sliders: r=0.5:0.1:1:0.05; a=0.01:0.005:0.02:0.001; b=0.1:0.05:0.3:0.01; m=0.2:0.1:0.5:0.01
points: 300, 50; 400, 50; 200, 20
caption: The Lotka–Volterra model [[#eq-lv]] with prey $N$ on the horizontal axis and predators $P$ on the vertical. With the default values the equilibrium is at $N^* = m/(ba) = 200$, $P^* = r/a = 50$, where the nullclines cross. Trajectories are closed loops around it: prey increase, then predators, then prey crash, then predators. Click to start new trajectories. Increase the prey growth rate $r$ and notice that the equilibrium moves *up* (more predators), not right.
:::

::: example Predator and prey equilibria {#ex-lv}
For the parameters $r = 0.5$ per month, $a = 0.01$ per predator per month, $b = 0.1$ and $m = 0.2$ per month, find the equilibrium. If the prey evolve a defence that halves the attack rate $a$, how do the equilibria change?
::: solution
$N^* = m/(ba) = 0.2/(0.1\times0.01) = 200$ prey, and $P^* = r/a = 0.5/0.01 = 50$ predators. Halving $a$ to 0.005 doubles both: $N^* = 400$, $P^* = 100$. The prey defence benefits the prey population, but it also supports twice as many predators, which in turn select for predators able to overcome the defence: an arms race in which the selective pressure on the predator increases as the prey improves.
:::
:::

## Hosts and parasites

Parasites — including pathogens — usually have shorter generation times and larger populations than their hosts, and they are under intense selection to infect. Hosts are under selection to resist. The genetics of the interaction determine the dynamics, and two idealised models bracket the possibilities.

::: definition Gene-for-gene and matching-alleles interactions {#def-gfg}
In a **gene-for-gene** interaction, discovered by Harold Flor in the 1940s–1950s in flax (*Linum usitatissimum*) and its rust fungus *Melampsora lini*, a host carrying a **resistance** allele $R$ recognises a pathogen carrying the corresponding **avirulence** allele $Avr$, and resists it; every other combination leads to infection. A pathogen that has lost $Avr$ (is **virulent**) infects every host at that locus. In a **matching-alleles** interaction, infection requires a match: a parasite genotype can infect only hosts with a corresponding genotype, as in self/non-self recognition systems, and no parasite genotype infects all hosts.
:::

In both models, a host genotype's fitness depends on how common the parasite genotypes that infect it are, and a parasite genotype's fitness on how common the hosts it can infect are. A host allele that is common becomes the target of the parasites that can infect it, which then increase, so the common host allele declines: **negative frequency-dependent selection**, with a time lag. The result is cycles in allele frequencies.

::: example One generation of matching-alleles selection {#ex-matching}
A haploid host has alleles $H_1$ and $H_2$, at frequencies $x = 0.7$ and $0.3$; a parasite has $P_1$ (infects only $H_1$) and $P_2$ (infects only $H_2$), at frequencies $y = 0.6$ and $0.4$. Infection reduces host fitness by $s = 0.3$; a parasite that meets a host it cannot infect has fitness reduced by $c = 0.5$. Assuming each host meets one random parasite and vice versa, find the frequencies after one generation.
::: solution
Host fitnesses: $H_1$ is infected when it meets $P_1$, so $w_{H_1} = 1 - sy = 1 - 0.3\times0.6 = 0.82$; $w_{H_2} = 1 - s(1 - y) = 1 - 0.12 = 0.88$. By [[evolution/natural-selection#eq-haploid]],

$$
x' = \frac{0.7\times0.82}{0.7\times0.82 + 0.3\times0.88} = \frac{0.574}{0.838} = 0.685.
$$

Parasite fitnesses: $P_1$ succeeds when it meets $H_1$, so $w_{P_1} = (1 - c) + cx = 0.5 + 0.35 = 0.85$ and $w_{P_2} = 0.5 + 0.15 = 0.65$. Then

$$
y' = \frac{0.6\times0.85}{0.6\times0.85 + 0.4\times0.65} = \frac{0.51}{0.77} = 0.662.
$$

The common host allele $H_1$ declines because the parasite that attacks it is common; the parasite $P_1$ increases because its host is common. Iterating (below) gives cycles: $P_1$ keeps rising until $H_1$ becomes rare, then $P_1$ declines, $H_1$ recovers, and so on.
:::
:::

Iterating the model of [[#ex-matching]] for 60 generations (in Python, no randomness involved) gives, every five generations, $(x, y)$ = (0.70, 0.60), (0.53, 0.80), (0.29, 0.71), (0.24, 0.31), (0.48, 0.12), (0.77, 0.21), (0.84, 0.70), (0.61, 0.94), (0.25, 0.92), (0.10, 0.54), (0.18, 0.08), (0.53, 0.02), (0.86, 0.07). The cycle has a period of roughly 30 generations, and the host cycle leads the parasite cycle (the host allele peaks at generation 30, the parasite allele at 35). Notice that its amplitude *grows*: in discrete generations the oscillations spiral outwards until an allele is nearly lost, when drift in a real population would remove it. In continuous time the same model gives neutral cycles, as in the figure below; mutation, migration between populations, or a cost of resistance can stabilise them.

::: widget phaseplane
f: s*x*(1-x)*(1-2*y)
g: c*y*(1-y)*(2*x-1)
x: 0, 1
y: 0, 1
sliders: s=0.3:0.05:1:0.05; c=0.5:0.05:1:0.05
points: 0.7, 0.6; 0.6, 0.5; 0.9, 0.5
caption: A continuous-time version of the matching-alleles model: frequency $x$ of host allele $H_1$ (horizontal) and frequency $y$ of the parasite allele $P_1$ that infects it (vertical). Each frequency changes at a rate proportional to its variance ($x(1-x)$ or $y(1-y)$) and to the fitness difference it experiences. Trajectories circle the equilibrium $(0.5, 0.5)$ anticlockwise: when $H_1$ is common the parasite $P_1$ increases, which makes $H_1$ decline, which makes $P_1$ decline. Change the strengths of selection $s$ (host) and $c$ (parasite) and notice that the cycles change shape but never converge.
:::

### The Red Queen

In 1973 Leigh Van Valen analysed the durations of fossil genera and families and found that, within a group, the probability of extinction was roughly constant regardless of how long a lineage had already existed ([[evolution/macroevolution]]). Lineages did not get better at surviving. He proposed that each species' environment deteriorates continually because its competitors, predators and parasites evolve, so that it must keep evolving merely to keep its fitness unchanged — like the Red Queen in Lewis Carroll's *Through the Looking-Glass*, who tells Alice that "it takes all the running you can do, to keep in the same place". The **Red Queen hypothesis** now refers more broadly to the continual coevolution of antagonists.

The most direct tests come from experiments with fast-reproducing organisms. Angus Buckling and Paul Rainey (2002) cultured the bacterium *Pseudomonas fluorescens* SBW25 with a lytic bacteriophage, $\Phi$2, for about 50 transfers, freezing samples. Testing bacteria from each time point against phages from the past, present and future showed that bacteria were more resistant to past phages and phages more infective to past bacteria: an arms race in which both partners ratcheted up their range. In the water flea *Daphnia magna* and its bacterial parasite *Pasteuria ramosa*, Ellen Decaestecker and colleagues (2007) hatched resting eggs and revived parasite spores from dated layers of pond sediment covering decades, and found that parasites were best at infecting hosts from their own time — the signature of Red Queen cycles.

### Coevolution and the maintenance of sex

Sexual reproduction is costly: a sexual female producing sons as well as daughters has, all else equal, half the rate of increase of an asexual female producing only daughters (John Maynard Smith's "twofold cost of males", 1978). One of the leading explanations for why sex nevertheless persists is the Red Queen. If parasites track common host genotypes, a host that produces genetically varied offspring by recombination gives its offspring rare genotypes, which escape infection (W. D. Hamilton, 1980; Graham Bell, 1982).

Evidence comes from nature and from experiments. In New Zealand lakes, the freshwater snail *Potamopyrgus antipodarum* has both sexual and asexual populations; Curtis Lively (1987) found that males (and hence sexual reproduction) were more common where trematode parasites were more common, and later work showed that common asexual clones became disproportionately infected and then declined. Levi Morran and colleagues (2011) manipulated the mating system of the nematode *Caenorhabditis elegans*, which can either self-fertilise or outcross, and exposed populations to the bacterial parasite *Serratia marcescens*. Obligately selfing populations exposed to a coevolving parasite were driven extinct within 20 generations, while outcrossing populations persisted; with a parasite that was not allowed to evolve, outcrossing gave little advantage.

::: quiz
A plant population has resistance alleles at a gene-for-gene locus, and a costly resistance allele $R$ is at high frequency. Its pathogen evolves to lose the corresponding avirulence allele $Avr$, so that $R$ no longer protects. What do you expect to happen next to the frequency of $R$ in the plant?
- [ ] It rises further, because resistance is always favoured.
- [x] It falls, because $R$ now carries its cost without providing protection.
- [ ] It stays constant, because the pathogen and plant are now matched.
::: solution
Once the pathogen is virulent (lacking $Avr$), $R$ no longer gives resistance but still has its cost (a fitness reduction even in the absence of disease, documented for many plant resistance genes), so plants without it do better and $R$ declines. As $R$ becomes rare, the cost to the pathogen of lacking $Avr$ (if any) may favour pathogens that regain it — giving cycles. Costs on both sides are what make gene-for-gene coevolution cycle rather than escalate indefinitely.
:::
:::

### The evolution of virulence

A naive expectation is that parasites should evolve to be harmless, because killing the host also kills the parasite's home. Evolutionary theory instead predicts that virulence (harm to the host) evolves to whatever level maximises the parasite's transmission, which depends on how transmission and harm are linked. This is treated here only as a conceptual model; the medical side belongs to [Medicine Atlas](/learn/medicine/).

The classic natural experiment is the myxoma virus, released in Australia in 1950 (and in Europe in 1952) to control introduced European rabbits (*Oryctolagus cuniculus*). The original strain killed more than 99 % of infected rabbits. Frank Fenner and colleagues sampled field strains each year and tested them in standard laboratory rabbits: within a few years most strains were of intermediate virulence, killing roughly 70–95 % of infected rabbits but more slowly, while the most and least virulent strains were rare. At the same time the rabbits evolved resistance. The explanation was transmission: the virus is spread by mosquitoes and fleas from the skin lesions of living rabbits, so a strain that kills its host very quickly has less time to be transmitted, and one that does little harm produces few lesions and is transmitted poorly.

::: example A transmission–virulence trade-off {#ex-tradeoff}
In a simple model of a parasite that spreads between hosts, the number of new infections caused by one infection in a fully susceptible population is $R_0 = \beta/(\alpha + d)$, where $\beta$ is the transmission rate, $\alpha$ the extra host death rate due to the parasite (its virulence) and $d$ the rate at which infections end for other reasons (host death from other causes, or recovery). Suppose transmission rises with virulence but with diminishing returns, $\beta = k\sqrt\alpha$. Which virulence maximises $R_0$?
::: solution
$R_0(\alpha) = k\sqrt\alpha/(\alpha + d)$. Differentiate:

$$
\frac{dR_0}{d\alpha} = k\,\frac{\tfrac12\alpha^{-1/2}(\alpha + d) - \alpha^{1/2}}{(\alpha + d)^2} = k\,\frac{d - \alpha}{2\sqrt\alpha\,(\alpha + d)^2},
$$

which is zero at $\alpha^* = d$, positive below and negative above: an intermediate optimum. If infections otherwise last about 10 days ($d = 0.1$ per day), the model predicts a virulence of $\alpha^* = 0.1$ per day — the parasite should kill about as fast as infections end for other reasons. The prediction depends entirely on the shape of the trade-off: if transmission does not depend on host survival (as for some parasites with durable free-living stages), higher virulence can be favoured. Roy Anderson and Robert May (1982) used this reasoning to explain the myxoma results.
:::
:::

### Brood parasites

Common cuckoos (*Cuculus canorus*) lay their eggs in the nests of other birds, and the hosts raise the cuckoo chick, which ejects the hosts' own eggs. Hosts have evolved to recognise and reject foreign eggs, and cuckoos have evolved eggs that mimic those of their hosts. Female cuckoos belong to host-specific races (**gentes**), each laying eggs matching one host species — reed warblers, meadow pipits, redstarts — while males mate across gentes; the trait appears to be inherited through the female line (Nicholas Davies and colleagues). Host species that have long been parasitised reject non-matching eggs more strongly than populations or species that have not, and hosts that are not currently parasitised, but have been in the past, may retain rejection — the trail of an arms race.

## Mutualism

Many of the most important interactions in nature are mutualisms, in which each partner benefits. Roughly 80 % of land-plant species form mycorrhizae with fungi that supply phosphorus and nitrogen in exchange for sugars; legumes host nitrogen-fixing rhizobia in root nodules; flowering plants depend on animal pollinators; reef-building corals on photosynthetic dinoflagellate symbionts; aphids on the bacterium *Buchnera aphidicola*, which makes essential amino acids missing from plant sap. Mitochondria and chloroplasts are the descendants of ancient bacterial mutualists ([[cell-biology/organelles]]).

**Obligate pollination mutualisms** show coevolution in its most specialised form. Each of the 750 or so species of figs (*Ficus*) is pollinated by one or a few species of tiny agaonid wasps, which breed only inside its figs: the female wasp enters a young fig, pollinates its flowers and lays eggs in some of them; her offspring develop in the galled flowers, mate inside the fig, and the females fly off carrying pollen. Yuccas are pollinated by yucca moths (*Tegeticula* and *Parategeticula*), whose females actively gather pollen with special mouthparts, push it into the stigma of a flower and lay eggs in the ovary; the larvae eat some, but not all, of the developing seeds.

::: definition Cheating and sanctions {#def-sanctions}
A **cheater** in a mutualism is a partner that takes the benefit without paying the cost — a pollinator that takes nectar without pollinating, a symbiont that takes sugars without supplying nutrients. A mutualism is stable only if mechanisms keep cheaters at a disadvantage: **partner choice** (choosing cooperative partners before interaction), **sanctions** (reducing rewards to partners that fail to cooperate), or **partner fidelity feedback** (when the fortunes of partners are linked, so that harming a partner harms oneself, as for vertically transmitted symbionts).
:::

Sanctions have been demonstrated experimentally. Yuccas selectively abort flowers that contain many moth eggs, killing the larvae, so that moths laying too many eggs per flower lose offspring (Olle Pellmyr and Chad Huth, 1994). Toby Kiers and colleagues (2003) placed soybean nodules in an atmosphere without nitrogen, so that their rhizobia could not fix nitrogen, and found that the plant reduced the oxygen supply to those nodules, and the rhizobia in them reproduced less: plants sanction non-fixing symbionts. Vertically transmitted symbionts like *Buchnera*, passed from mother to offspring, are an example of partner fidelity: a symbiont's reproduction depends entirely on its host's, and their phylogenies match exactly — the aphid and *Buchnera* trees are congruent, the clearest case of cospeciation (Nancy Moran and colleagues, 1993).

::: example Testing for cospeciation {#ex-cospeciation}
Mark Hafner and Steven Nadler (1988) compared phylogenies of pocket gophers (Geomyidae) and their chewing lice (Trichodectidae). Suppose that among 8 gopher–louse pairs, a reconciliation of the two trees shows 6 cospeciation events (nodes where host and parasite lineages split together) and that 1000 random louse trees, each reconciled with the gopher tree, show 6 or more cospeciations in only 7 cases. What do you conclude, and what other events can make parasite trees differ from host trees?
::: solution
The proportion of random trees giving at least as many cospeciation events is $7/1000 = 0.007$, a permutation P-value well below 0.05: the observed congruence is far greater than chance, which supports repeated cospeciation of gophers and lice. (This is the logic of tree-reconciliation tests such as Roderic Page's TreeMap; the numbers here are illustrative.) Parasite and host trees can also disagree because of **host switching** (a parasite colonising an unrelated host), **duplication** (the parasite speciating on one host), **sorting/extinction** (a parasite lineage lost from a host lineage) and "missing the boat" (a host lineage founded without its parasite). Lice on gophers are transmitted by direct contact between parents and young, which explains why switching is rare and cospeciation common.
:::
:::

::: warning "Mutualists are altruists" and "coevolution makes partners perfect"
Mutualism is reciprocal exploitation: each partner is selected to maximise its own fitness, and benefits the other only as long as that pays. The fig wasp and yucca moth larvae eat the seeds their mothers' pollination produced. Many mutualisms have exploiters — non-pollinating fig wasps, yucca moth species that lay eggs but have lost the pollinating behaviour (*Tegeticula intermedia*), nectar robbers — and the interaction can shift towards parasitism when conditions change (mycorrhizae can cost plants more than they give in very fertile soil). Nor does coevolution produce perfect matching: time lags, gene flow and conflicting selection from other species keep partners out of step.
:::

::: application Coevolution in agriculture and medicine
Breeding crops for single major resistance genes is a gene-for-gene arms race in which the pathogen usually wins: a new resistance gene deployed over large areas is often overcome by virulent strains within a few years ("boom-and-bust" cycles in cereal rusts). Strategies informed by coevolutionary theory include deploying several resistance genes together ("pyramiding"), mixtures of varieties, and quantitative resistance that imposes weaker, more diffuse selection. Phage therapy — using bacteriophages against bacterial infections — must contend with bacteria–phage coevolution of the kind Buckling and Rainey observed, and the use of cocktails of phages is a response to it.
:::

::: history
Darwin predicted the hawkmoth pollinator of *Angraecum sesquipedale* in 1862; it was described in 1903. Lotka and Volterra formulated their predator–prey equations in 1925–1926. Flor proposed the gene-for-gene hypothesis from crosses of flax and flax rust in the 1940s and published his synthesis in 1956. Ehrlich and Raven coined the modern sense of "coevolution" in their 1964 paper on butterflies and plants, and Janzen defined it strictly in 1980. Van Valen published the Red Queen hypothesis in 1973; Hamilton's parasite theory of sex appeared in 1980; Anderson and May's analysis of virulence and transmission in 1982. Lively's snail study appeared in 1987, Thompson's geographic mosaic theory in 1994, and Buckling and Rainey's phage–bacteria arms race in 2002; Morran and colleagues' experiment on sex and parasites in *C. elegans* followed in 2011.
:::

::: summary
- Coevolution is reciprocal evolutionary change between interacting species; fit between species is not by itself evidence of it.
- Predator–prey arms races (garter snakes and TTX-laden newts) vary geographically: the geographic mosaic of hot spots and cold spots.
- Lotka–Volterra dynamics: $N^* = m/(ba)$, $P^* = r/a$; improved prey defences can increase predator numbers.
- Host–parasite genetics range from gene-for-gene (one pathogen genotype can infect all hosts) to matching-alleles (no universal infector); both produce negative frequency-dependent selection and cycles.
- The Red Queen: antagonists must keep evolving to stand still; time-shift experiments (*Pseudomonas*–phage, *Daphnia*–*Pasteuria*) show it directly. Parasites can favour sex because recombination produces rare genotypes (*Potamopyrgus*, *C. elegans*).
- Virulence evolves to maximise transmission given trade-offs; with $\beta \propto \sqrt\alpha$, $R_0$ is maximised at $\alpha^* = d$ (myxoma in Australia).
- Mutualisms (figs and fig wasps, yuccas and yucca moths, rhizobia, mycorrhizae, *Buchnera*) persist because of partner choice, sanctions and partner fidelity, and can cospeciate.
:::

## Exercises

::: exercise Predator–prey equilibrium {level=1 check="40"}
In the Lotka–Volterra model [[#eq-lv]] with $r = 0.8$ per year and $a = 0.02$ per predator per year, what is the equilibrium number of predators?
::: solution
$P^* = r/a = 0.8/0.02 = 40$.
:::
:::

::: exercise Prey at equilibrium {level=1 check="250"}
With $m = 0.5$ per year, $b = 0.1$ and $a = 0.02$, what is the equilibrium number of prey?
::: solution
$N^* = m/(ba) = 0.5/(0.1\times0.02) = 0.5/0.002 = 250$.
:::
:::

::: exercise Host fitness under matching alleles {level=1 check="0.85"}
In the model of [[#ex-matching]] with $s = 0.25$, what is the fitness of host allele $H_1$ when the parasite allele $P_1$ that infects it has frequency 0.6?
::: solution
$w_{H_1} = 1 - sy = 1 - 0.25\times0.6 = 0.85$.
:::
:::

::: exercise Optimal virulence {level=2 check="0.05"}
In the trade-off model of [[#ex-tradeoff]], infections end for other reasons after 20 days on average. What virulence (per day) maximises $R_0$?
::: solution
$d = 1/20 = 0.05$ per day, and $\alpha^* = d = 0.05$ per day.
:::
:::

::: exercise A host allele after selection {level=2 check="0.5"}
In the matching-alleles model with $s = 0.3$, a host allele $H_1$ has frequency $x = 0.5$ and the parasite allele $P_1$ has frequency $y = 0.5$. What is $x$ after one generation? Interpret.
::: solution
$w_{H_1} = 1 - 0.15 = 0.85 = w_{H_2}$, so $x' = 0.5\times0.85/0.85 = 0.5$. At $(0.5, 0.5)$ both host alleles are attacked equally often, and likewise for parasites, so neither frequency changes: this is the equilibrium around which the cycles turn.
:::
:::

::: exercise Gene-for-gene infection table {level=2}
At one locus, plants are $R$ (resistant) or $r$ and pathogens are $Avr$ or $avr$. (a) Write the 2 × 2 table of infection outcomes. (b) Which pathogen genotype is favoured when $R$ is common, and which plant genotype when $avr$ is common, if resistance has a cost $c$ and virulence (lacking $Avr$) a cost $k$? (c) Why does this lead to cycles?
::: solution
(a) $R$ × $Avr$: resistance (no infection). $R$ × $avr$: infection. $r$ × $Avr$: infection. $r$ × $avr$: infection.
(b) When $R$ is common, $avr$ pathogens infect far more hosts and are favoured despite their cost $k$. When $avr$ is common, $R$ gives no protection, so it is pure cost $c$, and $r$ plants are favoured.
(c) $R$ common → $avr$ rises → $R$ useless → $R$ falls → with few $R$ plants, $avr$'s cost $k$ outweighs its benefit → $Avr$ rises → $R$ useful again → $R$ rises. The costs on both sides prevent either side's allele from simply fixing, and the time lags make the frequencies cycle.
:::
:::

::: exercise Reading a time-shift experiment {level=2}
Bacteria and phages are sampled from a coevolving culture at transfers 0, 10, 20, 30 and 40. Each bacterial sample is tested against phages from every time point. Bacteria from transfer 20 resist 100 % of phages from transfers 0 and 10, 60 % from transfer 20, and 20 % from transfers 30 and 40. (a) What does this pattern indicate? (b) How would a pattern of "fluctuating selection" (cycles of the matching-alleles type) differ? (c) Why must the samples be frozen?
::: solution
(a) Bacteria resist past phages and are susceptible to future phages: an **arms race** (directional escalation), in which each phage generation infects a wider range and bacteria resist a widening range, as in Buckling and Rainey (2002).
(b) Under fluctuating selection, the parasites are best adapted to *contemporary* hosts, and resistance to past phages does not accumulate: bacteria might be susceptible to phages from some distant past times again, as old genotypes return. The resistance profile across time would oscillate rather than increase monotonically.
(c) The test requires reviving organisms from different times simultaneously, which is possible only if samples are preserved without further evolution — by freezing bacteria and phages, or in nature by dormant stages in sediment, as for *Daphnia* and *Pasteuria*.
:::
:::

::: exercise The twofold cost of sex {level=3}
(a) A population consists of sexual females, each producing 2 surviving offspring (half sons, half daughters), and their mates. A mutant asexual female produces 2 surviving daughters, each also asexual. Starting from one asexual female among 1000 sexual females, how many generations until asexual females outnumber sexual ones, if nothing else differs? (b) Explain how coevolving parasites could offset this cost, referring to frequency dependence.
::: solution
(a) Sexual females: each generation, 1000 females produce 2000 offspring, 1000 of them daughters — the number of sexual females stays 1000. Asexual: $1\to2\to4\to\ldots$, doubling each generation. They outnumber sexual females when $2^t > 1000$, i.e. $t = 10$ generations ($2^{10} = 1024$). This is the twofold cost: asexuals double their share each generation.
(b) The asexual clone is genetically uniform, and as it becomes common it is the most common host genotype. Parasites adapted to it increase (negative frequency dependence), reducing its fitness, while sexual females produce genetically varied, often rare, offspring that escape infection. If parasite-induced mortality of common clones is more than half, sex wins despite its twofold cost. The Red Queen view predicts sex to be common where parasites are common, as in *Potamopyrgus*, and the advantage to depend on the parasites coevolving, as in Morran's experiment.
:::
:::

::: exercise Cheating in a mutualism {level=3}
A yucca moth female lays eggs in a flower she has pollinated. Each larva eats 10 seeds. A flower makes 200 seeds if pollinated. The plant aborts any flower containing more than 6 eggs, killing all larvae in it. (a) How many eggs per flower maximise a moth's offspring from one flower? (b) What fraction of the seed crop does the moth then consume? (c) What would happen to the mutualism if the plant could not abort flowers?
::: solution
(a) Larval survival is all-or-none at the threshold: up to 6 eggs, all survive; at 7 or more, none. A moth laying in one flower maximises surviving larvae at 6 eggs (assuming she can control her clutch and no other moth lays there).
(b) $6\times10 = 60$ of 200 seeds, 30 %; the plant keeps 140 seeds.
(c) Without abortion, moths would be selected to lay as many eggs as possible per flower, consuming most or all seeds; the plant's benefit from pollination would shrink to zero or become negative, and the interaction would drift towards parasitism. Sanctions like flower abortion stabilise the mutualism by making overexploitation costly to the moth (Pellmyr and Huth, 1994).
:::
:::
