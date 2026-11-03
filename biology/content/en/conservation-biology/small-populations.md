By 1908 the heath hen, the eastern subspecies of the greater prairie chicken (*Tympanuchus cupido cupido*), survived only on the island of Martha's Vineyard off Massachusetts, where perhaps 50 birds remained. Hunting had eliminated it from the mainland. A reserve was created, hunting was banned and predators were controlled, and the population responded: by 1915 there were around 2000 birds. Then, in 1916, a fire swept through the breeding grounds during the nesting season, a hard winter followed, an unusual influx of goshawks took many of the survivors, and a poultry disease, blackhead, appeared. The population fell back to a few hundred and then a few dozen, among which males greatly outnumbered females, and the birds that remained bred poorly. The last heath hen, a male, was seen on 11 March 1932. Protection had removed the original cause of decline, but a small population on one island was at the mercy of chance.

This chapter is about that chance. A large population can absorb a bad year or an unlucky run of births; a small one may not. We distinguish the kinds of random variation that threaten small populations, model each one, and show how they are combined in a **population viability analysis** (PVA) to estimate the probability that a population will fall below a given size within a given time — the quantity used in criterion E of the Red List ([[conservation-biology/extinction]]). The deterministic models of [[ecology/population-growth]] — exponential and logistic growth, life tables and the Leslie matrix — are the starting point; here we add randomness. The genetic hazards of small size are the subject of the next chapter, [[conservation-biology/conservation-genetics]].

## Two paradigms

Graeme Caughley (1994) pointed out that conservation biology had grown along two lines. The **declining-population paradigm** asks why a population is shrinking and what can be done about it: its tools are field ecology and experiment, and its answer is to identify and remove the cause — the hunting, the habitat loss, the invasive predator. The **small-population paradigm** asks what happens to a population *because* it is small, whatever made it so: its tools are stochastic models and population genetics. Caughley argued that the first paradigm had too little theory and the second too little contact with real populations. Both are needed. Most species become threatened through deterministic declines, which must be stopped first; but once a population is small, as the heath hen shows, it faces new hazards even after the original cause has gone.

## Sources of risk in small populations

::: definition Kinds of stochasticity {#def-stochasticity}
- **Demographic stochasticity**: chance variation in the fates of *individuals* — whether a given individual survives, how many offspring it has, what sex they are — even when every individual has the same probabilities. Its effect on the population growth rate shrinks as $1/N$.
- **Environmental stochasticity**: variation in the vital rates of the *whole population* from year to year — good and bad years caused by weather, food supply, predators or disease — which affects all individuals together and does not average out in large populations.
- **Catastrophes**: rare, extreme environmental events — fires, hurricanes, epidemics, oil spills — that kill a large fraction of the population at once.
- **Genetic stochasticity**: the random loss of genetic variation by drift and the fixation of deleterious alleles, leading to inbreeding depression and reduced adaptability ([[conservation-biology/conservation-genetics]]).
:::

To these random effects must be added deterministic effects that become important only at low density, the **Allee effects** of [[ecology/population-growth]]: difficulty in finding mates, failure of cooperative breeding or defence (as in African wild dogs, whose packs need enough adults to hunt and to guard pups), or inadequate pollination of sparse plants. An Allee effect creates a threshold density below which the population tends to decline even without chance events, so it greatly amplifies the effect of stochasticity.

## Demographic stochasticity

The simplest model of a population in which individuals live and reproduce independently is the **linear birth–death process**. Each individual gives birth (to one offspring) at rate $b$ and dies at rate $d$, independently of all others, in continuous time. Deterministically, $N$ would change as $dN/dt = (b - d)N$, so a population with $b > d$ would grow forever. Stochastically, it might go extinct by an unlucky run of deaths before it gets large.

::: proposition Extinction in the linear birth–death process {#prop-birthdeath}
In a linear birth–death process with per-capita birth rate $b$ and death rate $d$, starting from $N_0$ individuals, the probability that the population eventually goes extinct is

$$
P_\mathrm{ext} = \begin{cases} 1 & \text{if } b \le d, \\[2pt] \left(\dfrac{d}{b}\right)^{N_0} & \text{if } b > d. \end{cases}
$$ {#eq-birthdeath}

The risk falls *geometrically* with the initial population size, so demographic stochasticity is a serious threat only to very small populations.
:::

::: proof
Because individuals act independently, the descendants of each of the $N_0$ founders form independent copies of the process started from one individual, and the population goes extinct only if every one of these lineages does. So $P_\mathrm{ext} = q^{N_0}$, where $q$ is the extinction probability of a lineage started by one individual.

To find $q$, consider the first event in the life of that individual. It is a birth with probability $b/(b + d)$, leaving two independent lineages, both of which must die out (probability $q^2$), or a death with probability $d/(b + d)$, ending the lineage. Hence

$$
q = \frac{d}{b + d} + \frac{b}{b + d}\,q^2, \qquad\text{that is}\qquad b q^2 - (b + d) q + d = 0 = (q - 1)(bq - d).
$$

The roots are $q = 1$ and $q = d/b$. The extinction probability of a branching process is the smallest non-negative root of this equation, so $q = d/b$ when $b > d$ and $q = 1$ otherwise.
:::

::: example How small is too small? {#ex-birthdeath}
A newly founded population has per-capita birth and death rates $b = 0.5$ and $d = 0.4$ per year, so it would grow at 10 % per year in a deterministic world. What is its probability of eventual extinction from demographic stochasticity alone if it is founded with 5, 20 or 50 individuals?
::: solution
$d/b = 0.8$. From [[#eq-birthdeath]] — that is, $P = 0.8^{N_0}$:

- $N_0 = 5$: $0.8^5 = 0.33$;
- $N_0 = 20$: $0.8^{20} = 0.012$;
- $N_0 = 50$: $0.8^{50} = 1.4\times10^{-5}$.

A third of five-individual populations would vanish by chance although their expected growth is positive; with 50 founders demographic chance is negligible. This is why reintroduction programmes release enough individuals, and why the early years after founding are the riskiest.
:::
:::

::: widget plot
f: if(m < b, (m/b)^x, 1)
x: 0, 50
y: 0, 1
sliders: b=0.5:0.1:1:0.01; m=0.4:0.05:1:0.01
labels: P_\mathrm{ext} = (d/b)^{N_0}
caption: Probability of eventual extinction of a linear birth–death process ([[#prop-birthdeath]]) against the initial number of individuals $N_0$, for birth rate $b$ and death rate $m$ (the $d$ of the text). Bring $m$ close to $b$ to see how slowly the risk falls for a population that is barely growing; set $m \ge b$ and extinction becomes certain whatever the starting size.
:::

### Chance in the sex ratio

In sexually reproducing species, demographic stochasticity also acts through the sex of offspring. With a 1 : 1 primary sex ratio, the probability that all of $n$ offspring are of the same sex is $2\times(1/2)^n$: 1 in 16 for five offspring. A small population can therefore end with only one sex. The dusky seaside sparrow (*Ammodramus maritimus nigrescens*) of Florida declined through the draining and flooding of its marshes; when the last five known birds were taken into captivity around 1980, all were males. The last one died in 1987.

::: warning "A growing population is a safe population"
A positive expected growth rate does not guarantee persistence. In [[#ex-birthdeath]] a population expected to grow by 10 % a year has a one-in-three chance of extinction from five founders, and in the next section a population whose *average* annual growth factor exceeds 1 can still be certain to decline. Persistence depends on the variability of growth and on population size, not only on its mean.
:::

## Environmental stochasticity

Demographic stochasticity averages out in large populations because individual fates are independent. Environmental stochasticity does not: in a bad year everyone suffers. Its consequence is captured by a simple model in which the population is multiplied each year by a random growth factor $\lambda_t$:

$$
N_{t+1} = \lambda_t N_t, \qquad\text{so}\qquad N_t = N_0\,\lambda_0\lambda_1\cdots\lambda_{t-1}.
$$ {#eq-stoch-geom}

::: proposition The long-run growth rate in a random environment {#prop-geomean}
Let the annual growth factors $\lambda_t$ be independent and identically distributed with arithmetic mean $\bar\lambda$ and variance $\sigma_\lambda^2$. Then $\ln N_t = \ln N_0 + \sum_{i<t}\ln\lambda_i$ is a random walk, and the population's long-run growth is governed not by $\bar\lambda$ but by

$$
\mu = \E[\ln\lambda] \;\approx\; \ln\bar\lambda - \frac{\sigma_\lambda^2}{2\bar\lambda^2},
$$ {#eq-mu}

equivalently by the **geometric mean** growth factor $\lambda_G = e^{\mu}$. Almost every realisation grows if $\mu > 0$ and declines to extinction if $\mu < 0$, even when $\bar\lambda > 1$. The approximation in [[#eq-mu]] holds when the variation is small relative to the mean.
:::

::: proof
By the law of large numbers, $\frac1t\ln(N_t/N_0) = \frac1t\sum_{i<t}\ln\lambda_i \to \E[\ln\lambda] = \mu$ with probability 1, so $N_t$ behaves like $N_0e^{\mu t}$ in the long run. For the approximation, expand $\ln\lambda$ around $\bar\lambda$ to second order: $\ln\lambda \approx \ln\bar\lambda + (\lambda - \bar\lambda)/\bar\lambda - (\lambda - \bar\lambda)^2/(2\bar\lambda^2)$, and take expectations: the linear term vanishes and the quadratic term contributes $-\sigma_\lambda^2/(2\bar\lambda^2)$. Since $\ln$ is concave, Jensen's inequality gives $\E[\ln\lambda] \le \ln\E[\lambda]$ exactly, with equality only if $\lambda$ never varies.
:::

::: example Good years and bad years {#ex-geomean}
A population of a desert annual plant multiplies by 1.5 in wet years and by 0.6 in dry years, which occur with equal probability, independently. (a) What is the arithmetic mean growth factor? (b) What is the long-run growth factor per year? (c) What happens to the population in the long run?
::: solution
(a) $\bar\lambda = (1.5 + 0.6)/2 = 1.05$, suggesting 5 % growth per year.

(b) $\mu = \tfrac12(\ln1.5 + \ln0.6) = \tfrac12\ln0.9 = -0.0527$, so $\lambda_G = \sqrt{1.5\times0.6} = \sqrt{0.9} = 0.949$. (The approximation [[#eq-mu]] gives $\ln1.05 - 0.2025/(2\times1.1025) = 0.0488 - 0.0918 = -0.043$, a rough approximation here because the variation is large.)

(c) A wet year followed by a dry one leaves the population at $1.5\times0.6 = 0.9$ of its starting size. In the long run it declines by about 5 % a year and will go extinct, even though its *expected* size — the average over many hypothetical populations — grows by 5 % a year. The expectation is dominated by a few very lucky populations; the typical population shrinks. This is why many desert annuals keep a persistent seed bank, spreading germination over years: it reduces the variance of $\lambda$ and raises $\mu$ (an example of evolutionary **bet-hedging**).
:::
:::

::: quiz
Two populations have the same arithmetic mean growth factor, 1.02 per year. Population A has growth factors that vary only slightly from year to year; population B varies widely. Which statement is correct?
- [ ] Both have the same long-run growth rate, because their means are equal.
- [x] B has the lower long-run growth rate and the higher risk of decline.
- [ ] B has the higher long-run growth rate, because good years compensate for bad ones.
- [ ] Environmental variation matters only in populations of fewer than 50 individuals.
::: solution
By [[#prop-geomean]], the long-run rate $\mu \approx \ln\bar\lambda - \sigma_\lambda^2/2\bar\lambda^2$ falls as the variance rises, so B grows more slowly and may decline. Environmental variation affects all individuals together and matters at any population size.
:::
:::

### Extinction under environmental stochasticity: the diffusion approximation

When $\ln N$ follows a random walk with drift $\mu$ and variance $\sigma^2$ per year, we can ask how likely it is to fall below some low level. Conservation analyses usually use a **quasi-extinction threshold** $N_x$ — a size at which the population would be considered functionally extinct or in need of emergency action, often 10 to 50 individuals — rather than $N = 0$, because at very small sizes demographic stochasticity, Allee effects and inbreeding take over and the model no longer applies. Approximating the random walk by Brownian motion gives explicit results (Russell Lande and Steven Orzack, 1988; Brian Dennis, Patricia Munholland and Michael Scott, 1991).

::: proposition Probability of quasi-extinction {#prop-diffusion}
Suppose $\ln N_t$ is Brownian motion with drift $\mu$ and variance $\sigma^2$ per unit time, starting from $\ln N_0$, and let $x_d = \ln(N_0/N_x) > 0$ be the log distance to the threshold. Then:

1. the probability of ever reaching the threshold is $1$ if $\mu \le 0$ and $\exp(-2\mu x_d/\sigma^2)$ if $\mu > 0$;
2. if $\mu < 0$, the mean time to reach it is $x_d/\lvert\mu\rvert$;
3. the probability of reaching it by time $T$ is

$$
G(T) = \Phi\!\left(\frac{-x_d - \mu T}{\sigma\sqrt T}\right) + \exp\!\left(\frac{-2\mu x_d}{\sigma^2}\right)\Phi\!\left(\frac{-x_d + \mu T}{\sigma\sqrt T}\right),
$$ {#eq-diffusion}

where $\Phi$ is the standard normal distribution function.

The parameters can be estimated from a series of annual counts: $\hat\mu$ is the mean and $\hat\sigma^2$ the sample variance of the log growth rates $\ln(N_{t+1}/N_t)$.
:::

These are standard results for the first passage of Brownian motion through a fixed level (the inverse Gaussian distribution of passage times); a derivation can be found in Morris and Doak's *Quantitative Conservation Biology* (2002). Notice in part 1 the ratio $\mu/\sigma^2$: a population with positive drift is safer the larger its growth rate *relative to its variability*, and the risk falls exponentially with the log distance to the threshold — not with the distance itself — so doubling a population adds only $\ln 2$ to $x_d$. This is the deep reason why environmental stochasticity is so much more dangerous than demographic stochasticity: under demographic stochasticity risk falls geometrically with $N$, under environmental stochasticity only as a power of $N$.

::: example A count-based PVA {#ex-pva}
Annual counts of a population of a rare antelope over eleven years were

120, 132, 110, 125, 98, 104, 90, 101, 85, 88, 79.

(a) Estimate $\mu$ and $\sigma^2$. (b) Taking a quasi-extinction threshold of 20 animals, estimate the probability of reaching it within 20 years and within 50 years, and the mean time to reach it. (c) What would criterion E of the Red List say?
::: solution
(a) The ten log growth rates $\ln(N_{t+1}/N_t)$ are $0.095, -0.182, 0.128, -0.243, 0.059, -0.145, 0.115, -0.172, 0.035, -0.108$. Their mean is $\hat\mu = -0.0418$ per year — necessarily equal to $\ln(79/120)/10$ — and their sample variance is $\hat\sigma^2 = 0.0201$ ($\hat\sigma = 0.142$).

(b) $x_d = \ln(79/20) = 1.374$. Since $\hat\mu < 0$, quasi-extinction is certain eventually, with mean time $1.374/0.0418 = 33$ years. From [[#eq-diffusion]], with $\sigma\sqrt T = 0.142\sqrt{20} = 0.634$ and $\exp(-2\mu x_d/\sigma^2) = \exp(5.72) = 305$:

$$
G(20) = \Phi\!\left(\frac{-1.374 + 0.836}{0.634}\right) + 305\,\Phi\!\left(\frac{-1.374 - 0.836}{0.634}\right) = \Phi(-0.85) + 305\,\Phi(-3.49) = 0.199 + 0.074 = 0.27.
$$

The same calculation gives $G(50) = 0.85$.

(c) Criterion E for Endangered requires a probability of extinction of at least 20 % within 20 years or 5 generations. Strictly, these probabilities are for falling to 20 animals, not to zero, so an assessor would use them as a precautionary indicator alongside the other criteria. With only ten transitions, $\hat\mu$ is very uncertain (its standard error is $\hat\sigma/\sqrt{10} = 0.045$, as large as $\hat\mu$ itself), so the confidence interval for $G(20)$ is wide. The most robust conclusion is the direction: the population is declining, and the cause must be found.
:::
:::

::: widget plot
f: 0.5*(1 + erf((-d - mu*x)/(s*sqrt(2*x)))) + exp(-2*mu*d/s^2)*0.5*(1 + erf((-d + mu*x)/(s*sqrt(2*x))))
x: 0.1, 100
y: 0, 1
sliders: mu=-0.04:-0.1:0.1:0.005; s=0.14:0.14:0.5:0.01; d=1.4:0.2:2.5:0.1
labels: G(T)
caption: The cumulative probability of quasi-extinction $G(T)$ of [[#eq-diffusion]] against the time horizon $T$ in years, for drift $\mu$, standard deviation $s = \sigma$ of the annual log growth rate, and log distance $d = x_d$ to the threshold. The defaults are the antelope of [[#ex-pva]]. Make $\mu$ positive and the curve levels off below 1 at $e^{-2\mu x_d/\sigma^2}$; raise $s$ with $\mu$ fixed and the near-term risk rises sharply.
:::

The same calculation can be done by simulation, which is easily extended to more realistic models:

```python
import math, random

counts = [120, 132, 110, 125, 98, 104, 90, 101, 85, 88, 79]   # annual census, individuals
r = [math.log(b / a) for a, b in zip(counts, counts[1:])]     # 10 log growth rates
mu = sum(r) / len(r)                                          # mean log growth rate, per year
s2 = sum((x - mu) ** 2 for x in r) / (len(r) - 1)             # its variance, per year

random.seed(2026)
N0, Nq, years, runs = counts[-1], 20, 20, 10_000
hit = 0
for _ in range(runs):
    logN = math.log(N0)
    for t in range(years):
        logN += random.gauss(mu, math.sqrt(s2))                # one year of stochastic growth
        if logN <= math.log(Nq):                               # fell to the threshold
            hit += 1
            break
print(f"mu = {mu:.4f}, sigma^2 = {s2:.4f}")
print(f"P(N <= {Nq} within {years} years) = {hit / runs:.2f}")
# mu = -0.0418, sigma^2 = 0.0201
# P(N <= 20 within 20 years) = 0.23
```

The simulated probability (0.23) is a little lower than the diffusion result (0.27) because the simulation checks the population only once a year, while Brownian motion can cross the threshold between census dates; real populations are counted, and managed, in discrete time.

## Population viability analysis

::: definition Population viability analysis {#def-pva}
A **population viability analysis** is the use of a quantitative model of a population, incorporating the relevant sources of stochasticity, to estimate its probability of extinction or quasi-extinction within a specified time, its expected time to extinction, or its expected size, under one or more management scenarios. The main types are:

- **count-based** models, fitted to a time series of censuses, as in [[#ex-pva]];
- **demographic** (stage- or age-structured matrix) models, built from estimates of survival and fecundity for each class, with random variation in the vital rates;
- **individual-based** models, which follow every individual — its age, sex, genotype and location — and can include demographic, environmental, catastrophic and genetic stochasticity together (the program Vortex, developed by Robert Lacy, is widely used);
- **spatially explicit** and **metapopulation** models, which add the arrangement of habitat patches and dispersal between them ([[conservation-biology/fragmentation]]).
:::

PVAs have been criticised because their absolute predictions depend on parameters that are rarely well estimated, and because environmental conditions change. Barry Brook and colleagues (2000) tested PVAs retrospectively on 21 long-term data sets, building models from the first half of each series and comparing their predictions with the second half, and found that the predicted risks of decline and the final population sizes were on average surprisingly accurate; others (Tim Coulson and colleagues, 2001) argued that such tests flattered the method. The prevailing view is that PVAs are most reliable for **comparing management options** — which scenario reduces risk most — and for identifying which parameters matter, rather than for predicting a precise probability of extinction.

### Which vital rate matters most? Sensitivity and elasticity

A demographic model can tell us where management will have most effect. In a stage-structured matrix model $\mathbf n_{t+1} = \mathbf A\mathbf n_t$, the long-run growth rate is the dominant eigenvalue $\lambda$ of $\mathbf A$ ([[ecology/population-growth]]). The **sensitivity** of $\lambda$ to an entry $a_{ij}$ is $\partial\lambda/\partial a_{ij}$, the absolute change in $\lambda$ per unit change in $a_{ij}$. Because survival probabilities and fecundities are measured on different scales, it is often more useful to compare **elasticities**,

$$
e_{ij} = \frac{a_{ij}}{\lambda}\frac{\partial\lambda}{\partial a_{ij}} ,
$$ {#eq-elasticity}

the proportional change in $\lambda$ per proportional change in $a_{ij}$. Elasticities of all entries sum to 1, so they can be read as the share of $\lambda$ "attributable" to each transition.

::: proposition Elasticities in a two-stage model {#prop-twostage}
Consider juveniles that mature after one year with probability $g$, and adults that survive each year with probability $s$ and produce $F$ surviving juveniles per adult per year:

$$
\mathbf A = \begin{pmatrix} 0 & F \\ g & s \end{pmatrix}.
$$

Then $\lambda$ is the positive root of $\lambda^2 - s\lambda - Fg = 0$,

$$
\lambda = \tfrac12\left(s + \sqrt{s^2 + 4Fg}\right),
$$ {#eq-twostage}

and the elasticities are

$$
e_s = \frac{s}{2\lambda - s}, \qquad e_F = e_g = \frac{Fg}{\lambda(2\lambda - s)},
$$

which sum to 1.
:::

::: proof
The characteristic equation $\det(\mathbf A - \lambda\mathbf I) = -\lambda(s - \lambda) - Fg = 0$ gives $\lambda^2 - s\lambda - Fg = 0$ and [[#eq-twostage]]. Differentiating it implicitly with respect to $s$: $2\lambda\,\partial\lambda - s\,\partial\lambda - \lambda\,\partial s = 0$, so $\partial\lambda/\partial s = \lambda/(2\lambda - s)$ and $e_s = s/(2\lambda - s)$. With respect to $F$: $(2\lambda - s)\,\partial\lambda = g\,\partial F$, so $e_F = (F/\lambda)\,g/(2\lambda - s)$, and by symmetry $e_g$ is the same. Finally, using $Fg = \lambda^2 - s\lambda$,

$$
e_s + 2e_F = \frac{s\lambda + 2(\lambda^2 - s\lambda)}{\lambda(2\lambda - s)} = \frac{2\lambda^2 - s\lambda}{\lambda(2\lambda - s)} = 1.
$$
:::

::: example Protect the nests or the adults? {#ex-elasticity}
A long-lived turtle population has $F = 0.5$, $g = 0.3$ and $s = 0.8$. (a) Find $\lambda$ and the elasticities. (b) Managers can either protect nests, raising $F$ by 20 %, or fit fishing nets with devices that let turtles escape, raising adult survival from 0.80 to 0.85. Which is better?
::: solution
(a) $\lambda = \tfrac12\bigl(0.8 + \sqrt{0.64 + 0.6}\bigr) = \tfrac12(0.8 + 1.114) = 0.957$: the population declines by about 4 % a year. With $2\lambda - s = 1.114$: $e_s = 0.8/1.114 = 0.72$ and $e_F = e_g = 0.15/(0.957\times1.114) = 0.14$.

(b) Raising $F$ to 0.6: $\lambda = \tfrac12\bigl(0.8 + \sqrt{0.64 + 0.72}\bigr) = 0.983$, still declining. Raising $s$ to 0.85 (a 6 % increase): $\lambda = \tfrac12\bigl(0.85 + \sqrt{0.7225 + 0.6}\bigr) = \tfrac12(0.85 + 1.15) = 1.000$, a stable population. A small increase in adult survival achieves more than a large increase in fecundity, as the elasticities predict ($0.72$ versus $0.14$).

This is the logic of the analysis by Deborah Crouse, Larry Crowder and Hal Caswell (1987) for loggerhead sea turtles (*Caretta caretta*) in the south-eastern United States. Their stage-structured model showed that even complete protection of eggs on nesting beaches could not reverse the decline, while modest improvements in the survival of large juveniles and subadults, many of which drowned in shrimp trawls, could. The analysis supported the requirement, from 1989, that shrimp trawlers in US waters carry turtle excluder devices.
:::
:::

::: application Intensive management of the kākāpō
The kākāpō (*Strigops habroptilus*), a flightless, nocturnal parrot of New Zealand, declined after the arrival of people and of introduced cats, stoats and rats, until by 1995 only 51 birds were known. All were moved to predator-free offshore islands. Every bird is now individually monitored; nests are watched by night, eggs and chicks at risk are hand-reared, supplementary food is provided, and matings are planned to minimise inbreeding using the genome sequences of every individual. Kākāpō breed only in years when certain trees, notably rimu, fruit heavily, which makes their reproduction strongly episodic — an extreme case of environmental stochasticity in the vital rates. Under this programme the population had risen to more than 200 birds by the 2020s. The kākāpō shows both what intensive management can achieve for a very small population and how much it costs.
:::

## Minimum viable populations and the extinction vortex

Mark Shaffer (1981) asked how large a population must be to be reasonably safe, and defined the **minimum viable population** (MVP) as the smallest isolated population having a 99 % chance of remaining extant for 1000 years despite the foreseeable effects of demographic, environmental and genetic stochasticity and of catastrophes. Both numbers in the definition are conventions; others use 95 % over 100 years.

Two lines of evidence have been used to estimate MVPs. Genetic arguments, starting with Ian Franklin's "50/500" rule (1980), proposed effective population sizes of at least 50 to avoid short-term inbreeding depression and 500 to retain long-term evolutionary potential; Richard Frankham, Corey Bradshaw and Barry Brook (2014) argued from later data that these should be raised to at least 100 and 1000 ([[conservation-biology/conservation-genetics]]). Demographic PVAs give census numbers: a meta-analysis of published PVAs for more than two hundred species by Lochran Traill, Bradshaw and Brook (2007) found a median MVP of about 4000 individuals, with very wide variation among species.

::: warning "There is a magic number for viability"
No single MVP applies to all species, or even to one species in all places. MVP depends on the variability of the environment, the species' life history, the frequency of catastrophes, the time horizon and the level of risk accepted. A meta-analytic median is a description of past analyses, not a target: a short-lived invertebrate in a fluctuating environment may need tens of thousands of individuals, and a long-lived tree in a stable one far fewer. MVPs are best used as rough guides to the *scale* of population needed and as warnings when a population is far below any plausible value.
:::

Michael Gilpin and Michael Soulé (1986) described how the hazards of small size reinforce one another in an **extinction vortex**: a small population loses genetic variation and suffers inbreeding depression, which lowers survival and fecundity; lower vital rates make the population smaller and more variable; greater demographic and environmental stochasticity make it smaller still; and each turn of the cycle accelerates the next. Populations caught in a vortex show accelerating declines and increasing variability in the years before extinction, which William Fagan and Elizabeth Holmes (2006) detected in the final years of time series of vertebrate populations that went extinct.

::: intuition Why being small is dangerous, in one picture
Imagine $\ln N$ as a walker on a line, with an absorbing cliff at the quasi-extinction threshold. Deterministic decline tilts the ground towards the cliff. Environmental stochasticity makes the walker stagger, with steps of a size independent of where it is. Demographic stochasticity adds extra stagger that grows as the walker approaches the cliff (because it scales as $1/N$), and Allee effects and inbreeding steepen the ground near the edge. Conservation acts by tilting the ground away from the cliff (raising $\mu$), damping the stagger (reducing $\sigma^2$, for example by spreading the population over several sites so that one disaster cannot hit all of them) and moving the walker back from the edge (increasing $N$ by translocation or captive breeding).
:::

::: history
Theoretical work on chance extinction began with branching processes — Francis Galton and Henry Watson's analysis of the extinction of family surnames (1874) — and with William Feller's and David Kendall's work on birth–death processes in the 1940s. Robert MacArthur and Edward Wilson (1967) and Egbert Leigh (1981) derived mean times to extinction for small populations on islands. The conservation applications came together around 1980: Franklin's genetic rule (1980), Shaffer's definition of the minimum viable population (1981), Soulé's edited volume *Viable Populations for Conservation* (1987), Gilpin and Soulé's extinction vortex (1986) and Russell Lande's review "Genetics and demography in biological conservation" (1988), which argued that demographic factors would usually determine the fate of small populations before genetic ones did. Lande (1993) showed how mean extinction times scale differently with population size under demographic stochasticity, environmental stochasticity and catastrophes; Dennis, Munholland and Scott (1991) made the diffusion approximation a practical tool, and the Red List's criterion E (1994) gave PVA a formal place in assessing risk.
:::

## Where this leads

Small populations face a further hazard that this chapter has set aside: the loss of genetic variation and the expression of harmful recessive alleles. The next chapter, [[conservation-biology/conservation-genetics]], quantifies them and their remedies. The chapter after it, [[conservation-biology/fragmentation]], shows how dividing a population among patches of habitat changes its risk — sometimes spreading it, often concentrating it.

::: summary
- Populations become threatened mainly by deterministic declines (the declining-population paradigm), but once small they face **demographic, environmental, catastrophic and genetic stochasticity** and Allee effects (the small-population paradigm) ([[#def-stochasticity]]).
- Under **demographic stochasticity**, a birth–death process with $b > d$ goes extinct with probability $(d/b)^{N_0}$ ([[#prop-birthdeath]]): the risk falls geometrically with size and matters mainly below a few tens of individuals.
- Under **environmental stochasticity**, long-run growth is governed by $\mu = \E[\ln\lambda] \approx \ln\bar\lambda - \sigma_\lambda^2/2\bar\lambda^2$ ([[#prop-geomean]]); variability lowers growth, and a population with mean growth above 1 can decline to extinction.
- The **diffusion approximation** ([[#prop-diffusion]]) gives the probability of reaching a quasi-extinction threshold from estimates of $\mu$ and $\sigma^2$ made from counts; risk falls only with $\ln N$.
- **PVA** ([[#def-pva]]) is most reliable for comparing management options; **elasticities** identify the vital rates that matter most — for long-lived species usually adult or subadult survival ([[#prop-twostage]], [[#ex-elasticity]]).
- **Minimum viable populations** depend on species and context; the **extinction vortex** describes how small-population hazards reinforce each other.
:::

## Exercises

::: exercise Founders and extinction {level=1 check="0.9^10"}
A reintroduced population has $b = 1.0$ and $d = 0.9$ per year. What is its probability of eventual extinction from demographic stochasticity if 10 animals are released?
::: solution
$(d/b)^{N_0} = 0.9^{10} = 0.35$.
:::
:::

::: exercise A geometric mean {level=1 check="(1.3*1.3*0.7)^(1/3)"}
A population multiplies by 1.3 in two years out of three and by 0.7 in the third, in a repeating cycle. What is its long-run growth factor per year?
::: solution
Over three years it is multiplied by $1.3\times1.3\times0.7 = 1.183$, so the geometric mean is $1.183^{1/3} = 1.058$ per year. (The arithmetic mean is $1.1$.)
:::
:::

::: exercise All one sex {level=1 check="1/32"}
Six chicks hatch in the last surviving nest of a species with a 1 : 1 sex ratio. What is the probability that all six are of the same sex?
::: solution
$2\times(1/2)^6 = 1/32 = 0.031$.
:::
:::

::: exercise Ultimate risk with positive drift {level=2 check="exp(-2*0.02*ln(10)/0.04)"}
A population of 500 has log growth rates with mean $\mu = 0.02$ and variance $\sigma^2 = 0.04$ per year. What is the probability that it ever falls to 50, under the diffusion approximation?
::: solution
$x_d = \ln(500/50) = \ln10 = 2.303$. The probability is $\exp(-2\times0.02\times2.303/0.04) = \exp(-2.303) = 0.10$. With these parameters, the probability of ever falling to a tenth of the present size equals $(1/10)^{2\mu/\sigma^2} = 0.1^{1} = 0.1$. Even a growing population carries a one-in-ten risk of a tenfold decline at some point.
:::
:::

::: exercise Estimating the parameters {level=2}
Counts of a bird population in six successive years were 400, 360, 410, 330, 350, 300. (a) Estimate $\mu$ and $\sigma^2$ from the log growth rates. (b) Estimate the mean time to fall to 100 birds. (c) Why should you be cautious about this estimate?
::: solution
(a) Log growth rates: $\ln(360/400) = -0.105$, $\ln(410/360) = 0.130$, $\ln(330/410) = -0.217$, $\ln(350/330) = 0.059$, $\ln(300/350) = -0.154$. Mean $\hat\mu = \ln(300/400)/5 = -0.0575$; sample variance $\hat\sigma^2 = 0.0215$.

(b) $x_d = \ln(300/100) = 1.099$; mean time $= 1.099/0.0575 = 19$ years.

(c) Five transitions give a very imprecise estimate of $\mu$: its standard error is $\sqrt{0.0215/5} = 0.066$, larger than $\hat\mu$, so the data cannot even establish that the population is declining. Counts also contain observation error, which inflates $\hat\sigma^2$; the model assumes no density dependence and constant conditions; and the result is for the threshold of 100, not for extinction.
:::
:::

::: exercise Elasticities {level=2}
For the two-stage model of [[#prop-twostage]] with $F = 2$, $g = 0.2$ and $s = 0.3$ — a short-lived species — calculate $\lambda$ and the elasticities, and compare them with the turtle of [[#ex-elasticity]]. What general pattern do they illustrate?
::: solution
$\lambda = \tfrac12\bigl(0.3 + \sqrt{0.09 + 1.6}\bigr) = \tfrac12(0.3 + 1.300) = 0.800$. $2\lambda - s = 1.300$; $e_s = 0.3/1.3 = 0.23$; $e_F = e_g = 0.4/(0.8\times1.3) = 0.38$. Check: $0.23 + 2\times0.38 = 1.0$.

For the short-lived species, fecundity and juvenile survival have the largest elasticities; for the long-lived turtle, adult survival dominates ($0.72$). In general, the vital rates that matter most for $\lambda$ are those of the life stage in which individuals spend most of their lives — adult survival for long-lived species, reproduction and early survival for short-lived ones. Management should target accordingly.
:::
:::

::: exercise Interpreting a PVA {level=2}
A PVA for a population of 300 mountain gazelles compares three scenarios over 50 years: (A) no action, probability of quasi-extinction 0.45; (B) halving poaching, 0.12; (C) a fenced captive-breeding enclosure adding 10 animals a year, 0.30. The vital rates are estimated from five years of data. (a) Which management option does the PVA support, and how confident can one be in the ranking? (b) How confident can one be that the probability under scenario A is 0.45? (c) Suggest an analysis that would test the robustness of the ranking.
::: solution
(a) Halving poaching (B) reduces risk most. Rankings are generally more robust than absolute values, because errors in parameters shared by all scenarios tend to affect them similarly.

(b) Not very: five years of data give imprecise estimates of mean growth and especially of its variance, and the probability of quasi-extinction is sensitive to both; the true value could be far from 0.45.

(c) A **sensitivity analysis**: rerun the model across the plausible range of each uncertain parameter (or sample parameters from their estimated uncertainty distributions) and check whether B remains the best scenario in all or most runs. Including alternative model structures (density dependence, catastrophes) tests the ranking against assumptions as well as parameters.
:::
:::

::: exercise Splitting a population {level=3}
A population of 200 animals lives in one place. Managers propose splitting it into two populations of 100 at sites far enough apart that their environmental fluctuations are independent. Each local population, alone, has a probability $p$ of going extinct in the next 50 years; the single population of 200 has probability $p_{200}$. (a) Assuming no movement between the two sites, write the probability that the species is lost from both sites. (b) If $p = 0.2$ and $p_{200} = 0.1$, which option is safer? (c) What would change if the sites' fluctuations were strongly correlated, or if catastrophes were the main threat?
::: solution
(a) With independent fates, the probability that both go extinct is $p^2$.

(b) $p^2 = 0.04 < 0.1$: splitting is safer. Spreading the risk across independent sites reduces the chance of total loss, even though each fragment is individually more vulnerable.

(c) With strongly correlated fluctuations the two sites tend to have bad years together, so the probability of joint extinction approaches $p = 0.2$, worse than a single population of 200. Where catastrophes (fire, disease, hurricanes) are the main threat and are local, splitting is especially valuable — never keep all the individuals in one place (the kākāpō are spread over several islands for this reason). Where demographic stochasticity, Allee effects or inbreeding dominate, which all worsen as each population shrinks, keeping the population together is better. The question is a version of the SLOSS debate of [[conservation-biology/protected-areas]].
:::
:::

::: exercise Deriving the lineage extinction probability {level=3}
In a discrete-generation branching process each individual independently leaves 0 offspring with probability $1/4$, 1 with probability $1/4$ and 2 with probability $1/2$. (a) What is the mean number of offspring? (b) The extinction probability $q$ of a lineage is the smallest non-negative root of $q = \sum_k p_k q^k$. Find it. (c) What is the probability that a population founded by 8 individuals goes extinct?
::: solution
(a) Mean $= 0\times\tfrac14 + 1\times\tfrac14 + 2\times\tfrac12 = 1.25$.

(b) $q = \tfrac14 + \tfrac14q + \tfrac12q^2$, that is $2q^2 - 3q + 1 = 0 = (2q - 1)(q - 1)$. The roots are $q = 1/2$ and $q = 1$; the smallest is $q = 1/2$. Each lineage has a 50 % chance of dying out even though the population is expected to grow by 25 % per generation.

(c) $(1/2)^8 = 1/256 = 0.0039$.
:::
:::
