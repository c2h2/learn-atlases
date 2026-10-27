Natural selection is the only process that produces adaptation, but it is not the only process that changes allele frequencies. In [[evolution/natural-selection]] we listed the assumptions of the Hardy–Weinberg principle; each one that fails is an evolutionary force. **Mutation** creates new alleles. **Genetic drift** — random change caused by the sampling of a finite number of gametes — changes frequencies in every population that is not infinitely large. **Gene flow** moves alleles between populations. These three forces are not side issues. Mutation is the ultimate source of all variation; drift dominates the fate of most new mutations, beneficial ones included, and determines most of the differences between species' DNA sequences; and gene flow decides whether populations diverge or stay one.

This chapter treats each force quantitatively at the level of a first course. We build the Wright–Fisher model of drift, derive the probability that a new mutation is eventually fixed — $1/2N$ if it is neutral, about $2s$ if it is favoured — and show how mutation and drift together make the neutral theory of molecular evolution and the molecular clock. The full theory, with the diffusion approximation and the coalescent, is in [[population-genetics]].

## Mutation

::: definition Mutation and mutation rate {#def-mutation}
A **mutation** is a heritable change in the DNA sequence: a **point mutation** (substitution of one base for another, a **transition** between purines or between pyrimidines, or a **transversion** between a purine and a pyrimidine), a small **insertion or deletion** (indel), or a larger structural change (duplication, deletion, inversion, translocation of a chromosome segment; insertion of a transposable element; whole-genome duplication). The **mutation rate** $\mu$ is the probability per generation that a given site (or gene) mutates in a gamete, stated per base pair per generation or per locus per generation.
:::

Only mutations in the germ line are inherited in animals; in plants, whose germ line is set aside late, somatic mutations in a growing shoot can reach the flowers. Mutation rates are low and remarkably similar per base across organisms with similar genome sizes: about $10^{-10}$ to $10^{-9}$ per base pair per replication in *E. coli* and yeast, and, from sequencing parents and children, about $1.2\times10^{-8}$ per base pair per generation in humans (Augustine Kong and colleagues, 2012, in Iceland). With a diploid genome of about $6.4\times10^9$ base pairs, each person carries roughly $6.4\times10^9\times1.2\times10^{-8} \approx 77$ new point mutations, in the range of 60–80 found by sequencing; most come from the father, and their number rises with the father's age, because sperm precursors keep dividing throughout adult life.

Most mutations in functional sequences are deleterious or nearly neutral; a small fraction are beneficial. Whether a mutation is good or bad depends on the environment: a mutation that makes a bacterium resistant to an antibiotic usually slows its growth when the antibiotic is absent.

::: warning "Mutations are always harmful" and "mutations happen when they are needed"
Most mutations in protein-coding and regulatory sequences are harmful or neutral, but beneficial mutations are the raw material of every adaptation, and in the large non-coding fraction of many genomes most mutations are neutral. Equally, mutations are not directed: the classic fluctuation test of Luria and Delbrück (1943) and the replica-plating experiment of Joshua and Esther Lederberg (1952) showed that resistant bacteria arise before exposure to the agent that selects them, not in response to it. Mutation is random *with respect to fitness*, even though it is not random in every other sense — some sites, such as methylated CpG dinucleotides, mutate ten or more times faster than others.
:::

### Mutation alone is a weak force

Suppose allele $A$ mutates to $a$ at rate $\mu$ per generation, and nothing else acts. Then $p_{t+1} = p_t(1 - \mu)$, so

$$
p_t = p_0(1 - \mu)^t \approx p_0e^{-\mu t}.
$$ {#eq-mutpressure}

With $\mu = 10^{-5}$ per locus per generation, halving $p$ takes $\ln 2/\mu \approx 69{,}000$ generations. Back mutation ($a\to A$ at rate $\nu$) gives an equilibrium $\hat p = \nu/(\mu + \nu)$, approached just as slowly. Mutation changes allele frequencies far more slowly than even weak selection; its importance lies in supplying new alleles, on which selection and drift act.

### Mutation–selection balance

Deleterious alleles are created by mutation and removed by selection, and they settle at a balance.

::: proposition Mutation–selection balance {#prop-mutsel}
Let $A_2$ be produced from $A_1$ by mutation at rate $\mu$, and let fitnesses be $w_{11} = 1$, $w_{12} = 1 - hs$, $w_{22} = 1 - s$. If $\mu \ll s$, the equilibrium frequency of $A_2$ is approximately

$$
\hat q \approx \frac{\mu}{hs}\quad (h \text{ not close to } 0),\qquad \hat q \approx \sqrt{\frac{\mu}{s}}\quad (h = 0,\ \text{completely recessive}).
$$ {#eq-mutsel}
:::

::: proof
At equilibrium the alleles removed by selection each generation equal those created by mutation, about $\mu p \approx \mu$ (since $q$ is small). By [[evolution/natural-selection#eq-diploid-dp]], selection changes $q$ by $\Delta q = -pq[\,q(w_{22} - w_{12}) + p(w_{12} - w_{11})\,]/\bar w$. With $q$ small, $p \approx 1$ and $\bar w \approx 1$: if $h > 0$ the heterozygote term dominates and $\Delta q \approx -hsq$; setting $hsq = \mu$ gives $\hat q = \mu/(hs)$. If $h = 0$, only homozygotes are selected and $\Delta q \approx -sq^2$; setting $sq^2 = \mu$ gives $\hat q = \sqrt{\mu/s}$.
:::

For $\mu = 10^{-5}$ and $s = 0.1$, a completely recessive allele equilibrates at $\sqrt{10^{-4}} = 0.01$, a hundred times more common than one with $h = 0.1$ ($\hat q = 10^{-5}/0.01 = 0.001$). Recessive deleterious alleles shelter in heterozygotes, which is why every one of us carries several, and why inbreeding, which exposes them as homozygotes, reduces fitness ([[population-genetics]]).

## Genetic drift

Any real population is finite. The genes of the next generation are a *sample* of those of the current one, and sampling introduces chance. In a population of 10 individuals, an allele at frequency 0.5 may easily be at 0.3 or 0.7 next generation; in a population of a million, it will be within a fraction of a per cent of 0.5. The random wandering of frequencies from generation to generation is **genetic drift**.

::: definition The Wright–Fisher model {#def-wf}
In the **Wright–Fisher model** a diploid population of constant size $N$ (so $2N$ gene copies at a locus) reproduces in discrete, non-overlapping generations. Each generation's $2N$ copies are drawn independently, with replacement, from the gene pool of the previous generation. If an allele has $i$ copies, frequency $p = i/2N$, then the number $i'$ of copies in the next generation has a binomial distribution:

$$
\Prob(i' = j) = \binom{2N}{j}p^j(1 - p)^{2N - j},\qquad j = 0, 1, \ldots, 2N.
$$ {#eq-wf}
:::

From the mean and variance of the binomial distribution, the frequency $p' = i'/2N$ in the next generation has

$$
\E[p'] = p, \qquad \Var(p') = \frac{p(1 - p)}{2N}.
$$ {#eq-wf-var}

The expected frequency is unchanged — drift has no direction — but its variance is $p(1 - p)/2N$: large when the population is small. Because the expected change is zero but the variance is not, frequencies wander until they hit 0 (the allele is **lost**) or 1 (**fixed**). Both are absorbing: once an allele is gone, without mutation or migration it cannot come back.

The model, for two copies per individual and two individuals ($2N = 4$), is a Markov chain on the number of copies 0, 1, 2, 3, 4, each row of the transition matrix a binomial distribution from [[#eq-wf]].

::: widget markov
matrix: 1,0,0,0,0; 0.3164,0.4219,0.2109,0.0469,0.0039; 0.0625,0.25,0.375,0.25,0.0625; 0.0039,0.0469,0.2109,0.4219,0.3164; 0,0,0,0,1
states: 0; 1; 2; 3; 4
start: 2
steps: 20
caption: The Wright–Fisher model with $2N = 4$ gene copies as a Markov chain: the state is the number of copies of allele $A$, and each row is a binomial distribution with $p = i/4$ (rounded to four decimals). Start from 2 copies ($p = 0.5$) and step the walk: within a few generations it usually lands in state 0 or 4, from which it never leaves. Look at the distribution after many steps: all the probability ends in the two absorbing states, half in each — the fixation probability of an allele equals its starting frequency.
:::

::: proposition Fixation probability of a neutral allele {#prop-neutralfix}
In the Wright–Fisher model with no selection or mutation, an allele at frequency $p_0$ is eventually fixed with probability $p_0$. In particular, a new neutral mutation, present as a single copy among $2N$, is fixed with probability

$$
u = \frac{1}{2N}.
$$ {#eq-neutralfix}
:::

::: proof
Two arguments, each instructive.

*Symmetry.* Eventually, all $2N$ copies in the population are descended from exactly one of the copies present now (going back in time, lineages merge until one ancestor remains). Without selection, each of the $2N$ present copies is equally likely to be that ancestor, with probability $1/2N$. The allele is fixed if the ancestral copy is one of its $i_0 = 2Np_0$ copies, which has probability $i_0/2N = p_0$.

*Martingale.* By [[#eq-wf-var]], $\E[p_{t+1} \mid p_t] = p_t$, so $\E[p_t] = p_0$ for all $t$. As $t\to\infty$, $p_t$ is 1 with probability $u$ (fixation) and 0 otherwise, so $\E[p_\infty] = u$. Hence $u = p_0$. (Making the limit rigorous needs the bounded convergence theorem.)
:::

The consequences are profound. Of every $2N$ neutral mutations that arise, on average one is fixed and the rest are lost. In a large population a neutral mutation is very unlikely to be fixed — but many more arise. And when it does fix, it takes a long time: Motoo Kimura and Tomoko Ohta showed in 1969, using the diffusion approximation, that a neutral mutation that is going to fix takes on average about $4N$ generations to do so.

### The loss of heterozygosity

Drift destroys genetic variation within populations. Let $H_t$ be the expected heterozygosity, the probability that two gene copies drawn at random (without replacement) from the population in generation $t$ are different alleles.

::: proposition Decay of heterozygosity under drift {#prop-hdecay}
In the Wright–Fisher model with no mutation,

$$
H_t = H_0\left(1 - \frac{1}{2N}\right)^t \approx H_0e^{-t/2N}.
$$ {#eq-hdecay}
:::

::: proof
Take two distinct copies in generation $t + 1$. Each is drawn independently from the $2N$ copies of generation $t$, so with probability $1/2N$ they are copies of the same parental gene, and identical; with probability $1 - 1/2N$ they come from two distinct parental copies, which differ with probability $H_t$. Hence $H_{t+1} = (1 - 1/2N)H_t$.
:::

Heterozygosity therefore decays with a half-life of about $2N\ln 2 \approx 1.4N$ generations. A population of 50 individuals loses half its variation in about 70 generations; a population of $10^6$ would take over a million.

::: widget plot
f: 0.5*(1 - 1/(2*N))^x; 0.5*(1 - 1/(2*M))^x
x: 0, 200
y: 0, 0.5
sliders: N=20:2:500:1; M=200:2:500:1
labels: H_t,\ N; H_t,\ M
caption: Expected heterozygosity from [[#eq-hdecay]] against generations, starting from $H_0 = 0.5$, for two populations of sizes $N$ and $M$. The curves are exponential decays with time constant $2N$. Notice that a tenfold smaller population loses variation ten times faster; set $N = 2$ to see what a bottleneck of a couple of individuals does in a few generations.
:::

::: example Drift simulated {#ex-wfsim}
The following Python program (standard library only) simulates the Wright–Fisher model with $N = 50$ diploid individuals. It introduces 20,000 new neutral mutations, one at a time, and records how many are fixed and how long they take; then it follows 2000 populations of $N = 20$ starting at $p = 0.5$ and averages $2pq$ after $t$ generations. Compare the output with [[#eq-neutralfix]] and [[#eq-hdecay]].

```python
import random

def wright_fisher(N, i0, rng):
    """Run neutral WF from i0 copies among 2N until loss or fixation."""
    i, g = i0, 0
    while 0 < i < 2 * N:
        p = i / (2 * N)
        i = sum(rng.random() < p for _ in range(2 * N))   # binomial(2N, p)
        g += 1
    return i == 2 * N, g

rng = random.Random(2026)
runs = [wright_fisher(50, 1, rng) for _ in range(20000)]
times = [g for fixed, g in runs if fixed]
print(len(times) / 20000, sum(times) / len(times))
```

Output (seed 2026): 207 of the 20,000 mutations were fixed, a fraction **0.01035**, with mean time to fixation **193.9** generations. The heterozygosity run (seed 11) gave mean $2pq$ of 0.385, 0.299 and 0.175 after 10, 20 and 40 generations.
::: solution
Theory: $u = 1/2N = 1/100 = 0.0100$. The simulated fraction, 0.01035, has standard error $\sqrt{0.01\times0.99/20{,}000} = 0.0007$, so it is within half a standard error of the prediction. The mean fixation time for a new mutation is predicted by the diffusion approximation as $-4N\,\frac{1 - p}{p}\ln(1 - p)$ with $p = 1/2N$, which for $N = 50$ is $199$ generations, close to $4N = 200$; the simulated 193.9 agrees within sampling error (fixation times are very variable, and only 207 fixations were seen).

For heterozygosity, [[#eq-hdecay]] with $N = 20$ predicts $0.5\times(39/40)^t$: 0.388, 0.301 and 0.182 at $t = 10$, 20, 40, in good agreement with 0.385, 0.299 and 0.175 (each simulated mean has a standard error of about 0.003). Note that the variation is lost not because any population becomes "less heterozygous" in an orderly way: each replicate wanders, and more and more of them hit 0 or 1.
:::
:::

### Effective population size

Real populations violate the Wright–Fisher assumptions: the sexes may be unequal in number, family sizes vary more than the binomial, and population size changes over time. All these effects are summarised by the **effective population size** $N_e$, the size of an ideal Wright–Fisher population that would show the same amount of drift (for example the same rate of loss of heterozygosity). In [[#eq-wf-var]] and [[#eq-hdecay]], $N$ is replaced by $N_e$.

Two standard results:

- With $N_m$ breeding males and $N_f$ breeding females, $N_e = \dfrac{4N_mN_f}{N_m + N_f}$ (Wright, 1931). Half of every autosomal gene in the next generation comes from the males, however few.
- If the size fluctuates over $t$ generations, $N_e$ is the **harmonic mean**: $\dfrac{1}{N_e} = \dfrac{1}{t}\sum_{i=1}^{t}\dfrac{1}{N_i}$, dominated by the smallest values.

::: example Bottlenecks and harems {#ex-ne}
(a) A population of elephant seals has 10 breeding males and 90 breeding females. What is its effective size? (b) A population is 1000 for one generation, falls to 10 in a bottleneck, then recovers to 1000. What is the effective size over the three generations?
::: solution
(a) $N_e = 4\times10\times90/(10 + 90) = 3600/100 = 36$, although 100 animals breed. Strong competition among males for mates ([[evolution/sexual-selection]]) greatly reduces $N_e$.

(b) $1/N_e = \tfrac13(1/1000 + 1/10 + 1/1000) = \tfrac13(0.102) = 0.034$, so $N_e = 29.4$. The single bottleneck generation dominates. Hunting reduced the northern elephant seal *Mirounga angustirostris* to perhaps a few tens of animals in the 1890s; although it now numbers in the hundreds of thousands, its genetic diversity remains extremely low. A **founder effect** is the same phenomenon when a new population is started by a few individuals.
:::
:::

### Drift and selection together

Every allele, favoured or not, is subject to drift. A new beneficial mutation starts as a single copy and is very likely to be lost by chance in its first few generations, before selection has had time to act.

::: proposition Fixation probability of a beneficial mutation {#prop-haldane}
Consider a new mutation, present as a single copy, which gives its heterozygous carriers a small fitness advantage $s$ ($0 < s \ll 1$; fitnesses $1$, $1 + s$ and $1 + 2s$), in a large population in which the number of offspring of an individual is approximately Poisson-distributed. Its probability of eventual fixation is approximately

$$
u \approx 2s
$$ {#eq-haldane}

(J. B. S. Haldane, 1927). More precisely, Kimura's (1962) diffusion approximation gives, for a population of effective size $N_e = N$ and initial frequency $p = 1/2N$,

$$
u = \frac{1 - e^{-4Nsp}}{1 - e^{-4Ns}} = \frac{1 - e^{-2s}}{1 - e^{-4Ns}},
$$ {#eq-kimura}

which is close to $2s$ when $4Ns \gg 1$ and close to the neutral $1/2N$ when $4N\lvert s\rvert \ll 1$.
:::

::: proof Haldane's branching-process argument
While the mutant is rare, its copies are almost all in heterozygotes, and each copy leaves an independent, approximately Poisson number of copies with mean $1 + s$. Let $x$ be the probability that the descendants of one copy eventually die out. The line dies out if each of its $k$ offspring copies' lines dies out, so

$$
x = \sum_{k\ge0}\frac{e^{-(1+s)}(1 + s)^k}{k!}x^k = e^{-(1+s)(1 - x)}.
$$

Write $u = 1 - x$ for survival. Then $1 - u = e^{-(1+s)u}$. For small $u$, expand the exponential to second order: $1 - u \approx 1 - (1 + s)u + \tfrac12(1 + s)^2u^2$, giving $u \approx 2s/(1 + s)^2 \approx 2s$. Once the mutant has escaped loss and reached a few hundred copies, selection carries it to fixation almost deterministically, so survival of the branching process is the fixation probability.
:::

::: example Most beneficial mutations are lost {#ex-beneficial}
A mutation gives heterozygotes a 5 % advantage in a population of $N = 100$. What is its chance of fixation according to Haldane and to Kimura, and what does a simulation give? Compare with a neutral mutation.
::: solution
Haldane: $u \approx 2s = 0.10$. Kimura: $u = (1 - e^{-0.1})/(1 - e^{-20}) = 0.09516/1 = 0.0952$. The branching-process equation $1 - u = e^{-1.05u}$ solved exactly gives $0.0937$. A Wright–Fisher simulation with selection before binomial sampling (seed 7, 20,000 new mutations) fixed a fraction **0.0918** (standard error 0.002), consistent with these. A neutral mutation would fix with probability $1/200 = 0.005$; the advantage raises the chance about 19-fold — yet more than 90 % of such clearly beneficial mutations are still lost. Adaptation needs the same beneficial mutation to arise many times, which is easy in large populations and hard in small ones.
:::
:::

::: widget plot
f: (1 - exp(-2*x))/(1 - exp(-4*N*x)); 2*x; 1/(2*N)
x: -0.01, 0.03
y: 0, 0.06
sliders: N=100:10:2000:10
labels: u\ \text{(Kimura)}; 2s; 1/2N
caption: The fixation probability [[#eq-kimura]] of a new mutation against its selection coefficient $s$ (horizontal axis), for population size $N$, with Haldane's $2s$ and the neutral $1/2N$ for comparison. Notice the three regimes: for $\lvert s\rvert$ well below $1/(4N)$ the mutation behaves as neutral; for positive $s$ well above $1/(4N)$ the curve follows $2s$; for negative $s$ beyond $-1/(4N)$ fixation becomes almost impossible. Increase $N$ and watch the "effectively neutral" zone shrink towards $s = 0$.
:::

The quantity $N_es$ is the key. Selection dominates drift when $4N_e\lvert s\rvert \gg 1$; drift dominates when $4N_e\lvert s\rvert \ll 1$. The same mutation can be effectively selected in a large population and effectively neutral in a small one. Tomoko Ohta's **nearly neutral theory** (1973) built on this: many mutations are slightly deleterious, with $\lvert s\rvert$ near $1/N_e$, so small populations fix more of them, and their rates of molecular evolution are expected to be faster in proteins.

## Gene flow

**Gene flow** is the movement of alleles between populations by the dispersal of individuals or gametes (pollen, larvae, spores) followed by breeding. It homogenises populations and opposes the divergence caused by drift and local selection.

::: proposition The island model of migration {#prop-migration}
Let a fraction $m$ of the breeding individuals of a population (the island) each generation be immigrants from a large source population (the mainland) in which an allele has constant frequency $p_M$. Then

$$
p_{t+1} = (1 - m)p_t + mp_M,\qquad p_t - p_M = (1 - m)^t(p_0 - p_M).
$$ {#eq-migration}
:::

::: proof
The island's next generation is drawn from a gene pool of which a fraction $1 - m$ is local (frequency $p_t$) and $m$ immigrant (frequency $p_M$), giving the first equation. Subtracting $p_M$ from both sides: $p_{t+1} - p_M = (1 - m)(p_t - p_M)$; iterate.
:::

The difference from the mainland halves in $\ln 2/m$ generations — only 69 generations for $m = 0.01$. Gene flow is a powerful homogenising force.

Balanced against drift, gene flow sets the level of differentiation among populations. In Wright's island model with many populations of size $N$ exchanging migrants at rate $m$, the standard measure of differentiation $F_\mathrm{ST}$ (the fraction of the total genetic variance that lies between populations) reaches the equilibrium

$$
F_\mathrm{ST} \approx \frac{1}{1 + 4Nm}
$$ {#eq-fst}

(neutral alleles, small $m$, no mutation). The striking feature is that it depends on the *number* of migrants per generation, $Nm$, and not on the migration rate alone: about one migrant per generation ($Nm = 1$, $F_\mathrm{ST} = 0.2$) is enough to prevent neutral alleles from becoming fixed for different alleles in different populations, however large the populations are. Against *selection*, gene flow can also swamp local adaptation: an allele favoured locally with advantage $s$ persists on an island receiving migrants only if $m$ is not much larger than $s$ ([[evolution/speciation]]).

::: quiz
Two populations of a plant, each of $N = 10^4$ individuals, receive one migrant each from the other every generation. A third pair, each of $N = 100$, also exchanges one migrant per generation. At equilibrium for neutral loci, which pair is more differentiated?
- [ ] The small pair, because drift is stronger in small populations.
- [ ] The large pair, because one migrant is a smaller fraction of a large population.
- [x] Neither: to a first approximation both have $F_\mathrm{ST} \approx 1/(1 + 4Nm) = 0.2$.
::: solution
Drift is stronger in the small populations, but one migrant is a larger fraction ($m = 0.01$ against $m = 10^{-4}$), and the two effects cancel: $F_\mathrm{ST}$ depends on $Nm$, here 1 in both cases. This is Wright's famous result.
:::
:::

## The neutral theory of molecular evolution

By the mid-1960s, protein electrophoresis and sequencing had revealed two surprises. Populations were far more variable than expected: Richard Lewontin and John Hubby (1966) found that about a third of enzyme loci in *Drosophila pseudoobscura* were polymorphic, and Harry Harris found similar levels in humans the same year. And amino-acid substitutions accumulated between species at a roughly constant rate per year. In 1968 Motoo Kimura proposed that most of this molecular variation and change is **selectively neutral** and governed by mutation and drift; Jack King and Thomas Jukes made the same argument in 1969.

::: definition Substitution {#def-substitution}
A **substitution** is the fixation of a new mutation in a population or species, replacing the previous allele. The **rate of substitution** $k$ is the number of substitutions per site (or per locus) per generation (or per year) along a lineage.
:::

::: proposition The neutral rate of substitution {#prop-neutralrate}
If neutral mutations arise at rate $\mu$ per site per generation in a diploid population of constant size $N$, the rate of substitution of neutral mutations is

$$
k = 2N\mu\times\frac{1}{2N} = \mu,
$$ {#eq-neutralrate}

independent of population size.
:::

::: proof
Each generation, the population's $2N$ gene copies produce on average $2N\mu$ new neutral mutations at the site. By [[#prop-neutralfix]], each is eventually fixed with probability $1/2N$. The long-run rate of fixation is the product.
:::

This is the theoretical basis of the **molecular clock** proposed by Emile Zuckerkandl and Linus Pauling (1962, 1965) from the observation that haemoglobins differed between species roughly in proportion to their time of divergence. If most substitutions are neutral, they accumulate at the mutation rate, which is roughly constant in a lineage, so the number of differences between two species grows linearly with the time since they split. A large population produces more mutations, but each has a smaller chance of fixing; the two effects cancel exactly.

The neutral theory makes testable predictions.

- **Functional constraint.** Sites that matter less should evolve faster, since fewer of their mutations are deleterious. Synonymous sites in codons (which do not change the amino acid) evolve faster than non-synonymous sites; pseudogenes, freed from all constraint, faster still; and in proteins, surface residues faster than active sites. Fibrinopeptides, which are discarded when fibrinogen is activated, evolve hundreds of times faster than histone H4, in which almost every residue matters.
- **Generation-time effects.** If $\mu$ is per generation, short-lived organisms should have faster clocks per year. They do for DNA (rodents faster than primates), though less so for proteins — a pattern that Ohta's nearly neutral theory explains, since short-lived species tend to have larger populations, in which fewer slightly deleterious mutations fix.
- **Variation and substitution are two phases of the same process**: polymorphism within species is a snapshot of mutations on their way to fixation or loss.

The neutral theory is a null hypothesis, not a denial of selection: adaptive substitutions certainly occur, and they leave footprints. The ratio of non-synonymous to synonymous substitution rates, $\omega = d_N/d_S$, is about 1 for neutrally evolving coding sequence, much less than 1 in most genes (purifying selection removes most amino-acid changes), and greater than 1 only where positive selection has repeatedly favoured change, as in some immune and reproductive proteins. How much of molecular evolution is adaptive is still argued: estimates for *Drosophila* suggest that about half of amino-acid substitutions were driven by positive selection, while in hominids the fraction is much smaller.

::: example Dating a divergence with a clock {#ex-clock}
Two species of fruit fly differ at 2.0 % of synonymous sites in a set of genes (after correcting for multiple hits). Assume synonymous mutations are neutral and occur at $\mu = 3\times10^{-9}$ per site per generation, and that there are 10 generations per year. When did the species diverge?
::: solution
Since the two lineages split, each has accumulated substitutions at rate $k = \mu$ per generation, so the expected divergence after $T$ generations is $d = 2\mu T$ (two lineages). The rate per year is $\mu = 3\times10^{-8}$, so

$$
T = \frac{d}{2\mu} = \frac{0.020}{2\times3\times10^{-8}\ \mathrm{yr^{-1}}} = 3.3\times10^5\ \text{years}.
$$

Two caveats. First, the genetic divergence started before the species split, because the ancestral population was already polymorphic; on average the two sequences' common ancestor predates the split by about $2N_e$ generations, which matters when $N_e$ is large relative to the time ([[evolution/human-evolution]]). Second, clocks must be calibrated — with fossils or with measured mutation rates — and rates differ between lineages; modern methods allow for this "relaxed" clock ([[evolution/phylogenetics]]).
:::
:::

::: application Conservation and the genetics of small populations
Drift and inbreeding are practical problems for endangered species. Small captive or wild populations lose heterozygosity at rate $1/2N_e$ per generation, fix slightly deleterious alleles, and express recessive ones through inbreeding. The Florida panther (*Puma concolor coryi*) declined to some 20–30 animals by the early 1990s, with kinked tails, heart defects and poor sperm; eight female pumas from Texas were released in 1995 to restore gene flow ("genetic rescue"), after which numbers, heterozygosity and survival rose. Conservation genetics is developed in [[conservation-biology]].
:::

::: history
Sewall Wright (1931, "Evolution in Mendelian populations") and R. A. Fisher (1922, 1930) founded the theory of random drift; the binomial model of [[#def-wf]] bears both their names. Haldane derived the fixation probability $2s$ in 1927. Wright introduced effective population size and $F$-statistics (1931, 1951). Kimura applied the diffusion equation to gene frequencies in the 1950s and 1960s, giving the fixation probability [[#eq-kimura]] in 1962. Zuckerkandl and Pauling proposed the molecular clock (1962, 1965); Lewontin and Hubby and Harris measured protein polymorphism (1966); Kimura (1968, *Nature*) and King and Jukes (1969, *Science*, "Non-Darwinian evolution") proposed the neutral theory; and Ohta added the nearly neutral theory (1973). Kimura's *The Neutral Theory of Molecular Evolution* (1983) summarised the case, and the long "neutralist–selectionist" debate it started has shaped molecular evolution ever since.
:::

::: summary
- Mutation is the ultimate source of variation; rates are about $10^{-8}$ per base per generation in humans (roughly 60–80 new mutations per person). Mutation pressure alone changes frequencies very slowly.
- Deleterious alleles settle at mutation–selection balance: $\hat q \approx \mu/(hs)$, or $\sqrt{\mu/s}$ if fully recessive.
- Drift: in the Wright–Fisher model, $\E[p'] = p$ and $\Var(p') = pq/2N$; heterozygosity decays as $(1 - 1/2N)^t$.
- A neutral allele fixes with probability equal to its frequency; a new neutral mutation with probability $1/2N$, taking about $4N$ generations if it fixes.
- Effective size $N_e$ replaces $N$: $4N_mN_f/(N_m + N_f)$ for unequal sexes, harmonic mean for fluctuating sizes.
- A new beneficial mutation fixes with probability about $2s$ (Haldane), $(1 - e^{-2s})/(1 - e^{-4Ns})$ (Kimura): most are lost. Selection beats drift when $4N_e\lvert s\rvert \gg 1$.
- Gene flow: $p_t - p_M = (1 - m)^t(p_0 - p_M)$; $F_\mathrm{ST} \approx 1/(1 + 4Nm)$, so about one migrant per generation prevents neutral divergence.
- Neutral theory: substitution rate $k = \mu$, independent of $N$; the basis of the molecular clock. Constrained sites evolve slowly; $d_N/d_S > 1$ signals positive selection.
:::

## Exercises

::: exercise Variance of drift {level=1 check="0.0025"}
In a Wright–Fisher population of $N = 50$ diploid individuals, an allele has frequency 0.5. What is the variance of its frequency in the next generation?
::: solution
$\Var(p') = pq/2N = 0.25/100 = 0.0025$ (a standard deviation of 0.05).
:::
:::

::: exercise A neutral mutation's chance {level=1 check="0.0005"}
What is the probability that a new neutral mutation is eventually fixed in a diploid population of effective size 1000?
::: solution
$1/2N_e = 1/2000 = 0.0005$.
:::
:::

::: exercise Effective size with unequal sexes {level=1 check="64"}
A captive herd has 20 breeding males and 80 breeding females. What is its effective size?
::: solution
$N_e = 4N_mN_f/(N_m + N_f) = 4\times20\times80/100 = 6400/100 = 64$, about two-thirds of the 100 breeding animals.
:::
:::

::: exercise Mutation–selection balance {level=2 check="0.002"}
A completely recessive deleterious allele has $s = 0.25$ and is produced by mutation at $\mu = 10^{-6}$ per generation. What is its approximate equilibrium frequency?
::: solution
$\hat q \approx \sqrt{\mu/s} = \sqrt{4\times10^{-6}} = 0.002$.
:::
:::

::: exercise Halving heterozygosity {level=2 check="34"}
How many generations does it take for expected heterozygosity to halve in a population of effective size 25 (nearest generation, using the exact formula)?
::: solution
With $2N_e = 50$, $(1 - 1/50)^t = 0.5$ gives $t = \ln 0.5/\ln 0.98 = 0.6931/0.02020 = 34.3$, so about 34 generations. The approximation $2N_e\ln 2 = 34.7$ agrees.
:::
:::

::: exercise Island and mainland {level=2 check="0.613"}
An island population has allele frequency 0.9; the mainland has 0.2. With $m = 0.1$ per generation and no other forces, what is the island frequency after 5 generations (three decimal places)?
::: solution
By [[#eq-migration]], $p_5 = 0.2 + (0.9)^5(0.9 - 0.2) = 0.2 + 0.5905\times0.7 = 0.2 + 0.413 = 0.613$. The island has moved about 40 % of the way to the mainland frequency in five generations.
:::
:::

::: exercise A beneficial mutation in a large population {level=2}
A mutation with heterozygous advantage $s = 0.01$ arises once in a population of $N = 10^5$. (a) Estimate its fixation probability. (b) If the mutation rate to this allele is $10^{-8}$ per gene copy per generation, how many such mutations arise per generation, and how many generations should one expect to wait before one that is destined to fix arises?
::: solution
(a) $4Ns = 4000 \gg 1$, so $u \approx 2s = 0.02$ (Kimura's formula gives $(1 - e^{-0.02})/(1 - e^{-4000}) = 0.0198$).
(b) New copies per generation: $2N\mu = 2\times10^5\times10^{-8} = 0.002$. Successful ones per generation: $0.002\times0.02 = 4\times10^{-5}$, so the expected waiting time is $1/(4\times10^{-5}) = 25{,}000$ generations. Adaptation from new mutations can be limited by supply; in very large populations (bacteria, insects) the supply is much higher, and adaptation often uses variation already present.
:::
:::

::: exercise Reading a substitution-rate table {level=3}
Approximate rates of amino-acid substitution, in units of $10^{-9}$ per site per year, are: fibrinopeptides 8.3, haemoglobin α 1.2, cytochrome c 0.3, histone H4 0.01. (a) Under the neutral theory, what determines these differences, given that the mutation rate per site should be similar for all four genes? (b) For each protein, what fraction of amino-acid mutations would be neutral if fibrinopeptides are taken as nearly free of constraint? (c) What observation would suggest that positive selection, not reduced constraint, explains a high rate in some other protein?
::: solution
(a) The rate is $k = f_0\mu$, where $f_0$ is the fraction of mutations that are neutral; the rest are deleterious and eliminated. Proteins with more functional constraint have smaller $f_0$.
(b) Relative to fibrinopeptides: haemoglobin α $1.2/8.3 = 0.14$; cytochrome c $0.3/8.3 = 0.036$; histone H4 $0.01/8.3 = 0.0012$. So only about one amino-acid change in 800 in histone H4 is tolerated.
(c) A rate of non-synonymous substitution *higher* than that of synonymous sites in the same gene ($d_N/d_S > 1$), since neutrality can at most make the two equal. Additional evidence: the excess concentrated at functionally important sites (binding sites of immune receptors, for instance), and signatures of selective sweeps in polymorphism data.
:::
:::

::: exercise Fixation by Haldane's argument {level=3}
(a) Solve $1 - u = e^{-(1+s)u}$ numerically for $s = 0.1$ and compare with $2s$ and with $2s/(1+s)^2$. (b) If offspring number has variance $\sigma^2$ rather than the Poisson value $1 + s \approx 1$, the result generalises to $u \approx 2s/\sigma^2$. Explain why species in which a few individuals leave very many offspring (large variance) have weaker selection relative to drift, and relate this to effective population size.
::: solution
(a) Iterating $u \leftarrow 1 - e^{-1.1u}$ gives $u = 0.176$. Compare $2s = 0.2$ and $2s/(1+s)^2 = 0.165$: for $s = 0.1$ the simple approximation overestimates by about 13 %; for $s = 0.01$ it is accurate to about 1 %.
(b) With high variance in offspring number, a lineage's fate is much more a matter of luck: even a favoured mutant is more likely to be in an individual that leaves no offspring. Survival becomes $2s/\sigma^2$, closer to the neutral value. The same high variance makes $N_e$ much smaller than the census size (as in [[#ex-ne]], where variance in male mating success reduced $N_e$), so drift is stronger relative to selection — the two descriptions are equivalent.
:::
:::
