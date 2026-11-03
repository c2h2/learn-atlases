Every population is finite, so every generation's genes are a sample of the last generation's, and samples differ by chance from what they are drawn from. The course on evolution introduced the consequences ([[evolution/mutation-drift-gene-flow]]): in the Wright–Fisher model the allele frequency has no expected change but a variance $pq/2N$ per generation; heterozygosity decays by a factor $1 - 1/2N$ per generation; a new neutral mutation is fixed with probability $1/2N$; and real populations are described by an effective size $N_e$. This chapter builds the theory of drift properly. We follow the variance of allele frequencies across many generations and replicate populations, and see it in a classic experiment; introduce the Moran model and the diffusion results for times to fixation; and then turn the problem round and look *backwards* in time, at the genealogy of a sample of genes. That backward view, the **coalescent**, is how modern population genetics connects the theory to DNA sequences. We end with a fuller account of effective population size and what its estimates mean.

## Drift across generations

### The variance grows, the expectation stays

Let $p_t$ be the frequency of allele $A$ in generation $t$ of a Wright–Fisher population of $N$ diploid individuals (so $2N$ gene copies), with no selection, mutation or migration. Drift is a random process, so $p_t$ is a random variable: we can think of it as the frequency in one of many replicate populations, all started at $p_0$.

::: proposition Mean and variance of allele frequency under drift {#prop-var}
In the neutral Wright–Fisher model, for all $t \ge 0$,

$$
\E[p_t] = p_0,\qquad \Var(p_t) = p_0q_0\left[1 - \left(1 - \frac{1}{2N}\right)^t\right] \approx p_0q_0\left(1 - e^{-t/2N}\right).
$$ {#eq-var}

As $t \to \infty$ the variance approaches $p_0q_0$, the variance of a quantity that is 1 with probability $p_0$ and 0 otherwise: every replicate is eventually fixed or lost.
:::

::: proof
Given $p_t$, the number of $A$ copies in generation $t + 1$ is binomial with $2N$ trials and probability $p_t$, so $\E[p_{t+1}\mid p_t] = p_t$ and $\Var(p_{t+1}\mid p_t) = p_tq_t/2N$. Taking expectations, $\E[p_{t+1}] = \E[p_t] = \cdots = p_0$.

For the variance, consider $h_t = \E[p_tq_t]$. Conditionally on $p_t$,

$$
\E[p_{t+1}q_{t+1}\mid p_t] = \E[p_{t+1}\mid p_t] - \E[p_{t+1}^2\mid p_t] = p_t - \left(\frac{p_tq_t}{2N} + p_t^2\right) = p_tq_t\left(1 - \frac{1}{2N}\right),
$$

so $h_t = p_0q_0(1 - 1/2N)^t$. Finally $\Var(p_t) = \E[p_t^2] - p_0^2 = \E[p_t] - h_t - p_0^2 = p_0q_0 - h_t$.
:::

The quantity $2h_t$ is the expected heterozygosity, so [[#eq-var]] is the decay of heterozygosity of [[evolution/mutation-drift-gene-flow]] in another guise: what is lost from the heterozygosity *within* populations reappears as variance *between* replicate populations. The fraction lost,

$$
F_t = 1 - \left(1 - \frac{1}{2N}\right)^t,
$$ {#eq-ft}

is the probability that two gene copies in generation $t$ are copies of the same ancestral gene in generation 0, which is the **inbreeding coefficient** due to finite population size ([[population-genetics/inbreeding]]). With it, $\Var(p_t) = p_0q_0F_t$ and $H_t = H_0(1 - F_t)$: drift in a closed population is a form of inbreeding.

### Buri's flies

The most famous test of these predictions is Peter Buri's experiment, published in 1956. He set up 107 replicate populations of *D. melanogaster*, each founded by 16 flies (8 males and 8 females) heterozygous for two alleles of the eye-colour gene *brown*, $bw$ and $bw^{75}$, so every line started at $p_0 = 0.5$. In each generation he chose 8 males and 8 females at random from each line to found the next, for 19 generations. Because the alleles are codominant in their effect on eye colour, he could count allele frequencies directly.

The distribution of $p$ across the 107 lines behaved as the theory predicts: a peak at 0.5 at the start, spreading out generation by generation, becoming nearly flat by about generation 10, and then piling up in the classes $p = 0$ and $p = 1$ as more and more lines lost or fixed $bw^{75}$. The mean frequency stayed near 0.5. The *rate* of spreading, however, was faster than expected for $N = 16$. Fitting [[#eq-var]] or the decline of heterozygosity to the data gives $N_e \approx 11.5$: even in a carefully controlled laboratory population, chance differences in the number of offspring per fly make the effective size smaller than the number of parents.

::: widget plot
f: 0.25*(1 - (1 - 1/(2*N))^x); 0.25*(1 - (1 - 1/(2*M))^x)
x: 0, 60
y: 0, 0.25
sliders: N=16:2:100:0.5; M=11.5:2:100:0.5
labels: \Var(p_t),\ N; \Var(p_t),\ M
hlines: 0.25
caption: The variance in allele frequency among replicate populations started at $p_0 = 0.5$, from [[#eq-var]], for two population sizes $N$ and $M$ — by default the 16 flies per line in Buri's experiment and the effective size of about 11.5 estimated from his data. The dashed ceiling $p_0q_0 = 0.25$ is reached when every line is fixed or lost. Notice that after 19 generations the two curves are clearly separated (0.113 against 0.143): the experiment had enough replicates to tell them apart. Increase $N$ and the curve straightens into the line $p_0q_0\,t/2N$, the regime in which drift is slow.
:::

::: example Spread among replicate lines {#ex-buri}
In a line like Buri's with $N_e = 11.5$ and $p_0 = 0.5$, what are the expected variance and standard deviation of $p$ among lines after 19 generations, and the expected heterozygosity relative to the start? What would they be if $N_e$ were 16?
::: solution
With $2N_e = 23$: $F_{19} = 1 - (22/23)^{19} = 1 - 0.430 = 0.570$. Then $\Var(p_{19}) = 0.25\times0.570 = 0.143$ (standard deviation 0.38), and heterozygosity has fallen to $1 - F = 43$ % of its initial value. With $N_e = 16$: $F_{19} = 1 - (31/32)^{19} = 0.453$, variance 0.113 (standard deviation 0.34), heterozygosity 55 % of the initial value. The difference of 12 percentage points in retained heterozygosity is what allowed the effective size to be estimated. Notice how large the variance is in either case: a standard deviation of more than a third means that after 19 generations of random sampling of 16 parents, the lines are scattered over the whole range from 0 to 1.
:::
:::

### Overlapping generations: the Moran model

The Wright–Fisher model replaces the whole population at once. Patrick Moran (1958) proposed an alternative suited to organisms with overlapping generations: at each time step, one individual chosen at random reproduces and one chosen at random (possibly the parent) dies. For a haploid population of $N$ individuals, the number of $A$ individuals then changes by $+1$, $-1$ or $0$ per event, with

$$
\Prob(+1) = \Prob(-1) = \frac{i}{N}\cdot\frac{N - i}{N},
$$

so the variance of the change in frequency per event is $2pq/N^2$. A "generation" is $N$ events, over which the variance accumulates to about $2pq/N$, twice the Wright–Fisher value $pq/N$ for $N$ haploid copies. A Moran population of size $N$ therefore drifts like a Wright–Fisher population of size $N/2$: its effective size is half its census size. The fixation probability of a neutral allele is still its frequency (by the same martingale argument), and most results carry over with $N_e$ in place of $N$. This illustrates the general rule: **the details of reproduction affect drift only through the effective size.**

## Times to fixation and loss

How long does drift take? The Markov chain of the Wright–Fisher model is awkward to analyse exactly, but when $N$ is large and changes per generation are small, the allele frequency behaves like a continuous **diffusion** process with mean change $M(p)$ and variance $V(p) = pq/2N_e$ per generation. Motoo Kimura developed this approximation in the 1950s and 1960s, building on Fisher's and Wright's earlier use of it; the results below are its most-used consequences, quoted here without the derivation, which needs the backward Kolmogorov equation (see Hartl and Clark, or Ewens, in the references).

::: proposition Mean times under neutral drift {#prop-times}
For a neutral allele at initial frequency $p$ in a population of effective size $N_e$, the diffusion approximation gives, in generations:

$$
\bar t(p) = -4N_e\bigl[p\ln p + q\ln q\bigr]\quad\text{(until fixation or loss)},
$$ {#eq-tabs}

$$
\bar t_1(p) = -\frac{4N_e\,q\ln q}{p}\quad\text{(until fixation, given fixation)},\qquad \bar t_0(p) = -\frac{4N_e\,p\ln p}{q}\quad\text{(until loss, given loss)}.
$$ {#eq-tcond}

For a new mutation, $p = 1/2N$: $\bar t_1 \approx 4N_e$ generations, while $\bar t_0 \approx 2(N_e/N)\ln(2N)$ generations.
:::

Two features stand out. First, the times are proportional to $N_e$: drift is slow in large populations, and **time in population genetics is naturally measured in units of $N_e$ generations**. Second, the fates of new mutations are extremely asymmetric. A new neutral mutation in a population of $N_e = N = 10^4$ is lost with probability $1 - 1/(2\times10^4)$, typically within $2\ln(2\times10^4) \approx 20$ generations; the rare one that fixes takes on average $4\times10^4$ generations to do so. The evolution chapter's simulation for $N = 50$ found a mean fixation time of 194 generations against the predicted $\approx 4N = 200$.

::: example How long until a polymorphism disappears? {#ex-times}
An allele is at frequency 0.5 in an isolated population of effective size 500 with a generation time of 2 years. How long, on average, until the locus is monomorphic? If it is eventually fixed, how long does that take on average?
::: solution
By [[#eq-tabs]], $\bar t(0.5) = -4\times500\times(0.5\ln0.5 + 0.5\ln0.5) = 2000\ln 2 = 1386$ generations, or about 2,800 years. By symmetry the conditional times to fixation and to loss are equal: [[#eq-tcond]] gives $\bar t_1(0.5) = -4\times500\times0.5\ln0.5/0.5 = 2000\times0.693 = 1386$ generations as well. An intermediate-frequency polymorphism in a population of a few hundred lasts for millennia, but not for geological time; in a population of a million it would last millions of years.
:::
:::

## Looking backwards: the coalescent

Forward models ask what happens to the alleles in a population. Data, however, come as a *sample* of DNA sequences, and the sequences are related by a genealogy: going back in time, their ancestral lineages merge, or **coalesce**, until a single common ancestor remains. John Kingman (1982) showed that under the Wright–Fisher model and many others, this genealogy has a simple universal form when the sample is small compared with the population. The coalescent has since become the main tool for simulating and interpreting sequence variation (Richard Hudson and Fumio Tajima developed it for sequence data in 1983).

### Two genes

Take two distinct gene copies in the present generation. In the Wright–Fisher model each picks its parent gene independently and uniformly from the $2N$ copies of the previous generation, so they have the same parent with probability $1/2N$. If they do not, the same holds one generation further back, and so on.

::: proposition Coalescence time of two genes {#prop-pair}
The number of generations $T_2$ back to the common ancestor of two gene copies in a Wright–Fisher population of $2N$ copies has the geometric distribution

$$
\Prob(T_2 = t) = \frac{1}{2N}\left(1 - \frac{1}{2N}\right)^{t-1},\qquad \E[T_2] = 2N,
$$ {#eq-pair}

which for large $N$ is approximately exponential with mean $2N$ generations: $\Prob(T_2 > t) \approx e^{-t/2N}$.
:::

The probability that two genes have *not* yet coalesced by $t$ generations back, $(1 - 1/2N)^t$, is exactly the retained heterozygosity $1 - F_t$ of [[#eq-ft]]: the forward and backward descriptions say the same thing.

Now add neutral mutation at rate $\mu$ per gene per generation. Two sequences differ at a site if a mutation occurred on either branch since their common ancestor. The two branches have total length $2T_2$, so the expected number of differences between them is $2\mu\E[T_2] = 4N\mu$. Writing

$$
\theta = 4N_e\mu,
$$ {#eq-theta}

the **population mutation rate**, we have $\E[\pi] = \theta$ (per site, with $\mu$ per site). Nucleotide diversity estimates the product of effective size and mutation rate, not either alone.

::: example The effective size of humans {#ex-human-ne}
Human nucleotide diversity is about $\pi = 0.001$ per site, and the mutation rate measured in parent–offspring trios is about $\mu = 1.2\times10^{-8}$ per site per generation. Estimate the long-term effective population size and the expected time back to the common ancestor of two copies of a typical neutral site.
::: solution
From $\pi = 4N_e\mu$, $N_e = 0.001/(4\times1.2\times10^{-8}) \approx 21{,}000$. Then $\E[T_2] = 2N_e \approx 42{,}000$ generations, roughly a million years at 25–30 years per generation. This $N_e$ is a long-term average over hundreds of thousands of years, dominated (as a harmonic mean) by periods of small size; it is not a census estimate and is tiny compared with the more than 8 billion people alive in 2026. Published estimates of human $N_e$ are mostly of order $10^4$ and depend on the assumed mutation rate: with the older phylogenetic estimate $\mu \approx 2.5\times10^{-8}$, the same $\pi$ gives $N_e \approx 10{,}000$. Two copies of a typical human gene therefore shared an ancestor long before the origin of *Homo sapiens* about 300,000 years ago ([[evolution/human-evolution]]).
:::
:::

### A sample of $n$ genes

With $n$ gene copies, any of the $\binom k2$ pairs among $k$ lineages could coalesce. When $k$ is small compared with $N$, the probability of a coalescence in one generation is about $\binom k2/2N$, and the chance of two coalescences at once is negligible. Measuring time in units of $2N$ generations makes the result independent of $N$.

::: definition Kingman's coalescent {#def-coalescent}
The genealogy of $n$ neutral gene copies sampled from a population of effective size $N_e$ is, approximately, the following process. Starting with $k = n$ lineages, wait an exponentially distributed time $T_k$ with rate $\binom k2$ (in units of $2N_e$ generations); then choose one pair of lineages uniformly at random and merge them; set $k \to k - 1$ and repeat until $k = 1$, the **most recent common ancestor** (MRCA). In generations, $\E[T_k] = \dfrac{4N_e}{k(k-1)}$. Neutral mutations are then placed on the branches as a Poisson process with rate $\mu$ per generation.
:::

The tree shape (which lineages merge) and the times are independent, and the mutation process is independent of both — the essential simplification of neutrality. Selection or population structure would change the tree itself.

::: proposition Properties of the coalescent {#prop-coalescent}
For a sample of $n$ genes, in generations,

$$
\E[T_\mathrm{MRCA}] = 4N_e\left(1 - \frac1n\right),\qquad \E[T_\mathrm{total}] = 4N_e\sum_{i=1}^{n-1}\frac1i = 4N_e\,a_n,
$$ {#eq-tmrca}

where $T_\mathrm{total}$ is the total length of all branches. The expected number of segregating sites in the sample is

$$
\E[S] = \mu\,\E[T_\mathrm{total}] = \theta\,a_n.
$$ {#eq-es}
:::

::: proof
$T_\mathrm{MRCA} = \sum_{k=2}^nT_k$ and $\E[T_k] = 4N_e/[k(k-1)] = 4N_e\left(\frac{1}{k-1} - \frac1k\right)$; the sum telescopes to $4N_e(1 - 1/n)$. While there are $k$ lineages, the tree has $k$ branches growing, so $T_\mathrm{total} = \sum_k kT_k$ and $\E[T_\mathrm{total}] = \sum_{k=2}^n 4N_e/(k - 1) = 4N_ea_n$. Under the infinite-sites model (each mutation at a new site), every mutation on the tree creates one segregating site, and the expected number of mutations is $\mu$ times the total branch length.
:::

[[#eq-es]] is the basis of Watterson's estimator $\theta_W = S/a_n$, introduced in [[population-genetics/hardy-weinberg]]. Three consequences are worth absorbing.

- **The deepest branches dominate.** $\E[T_2] = 2N_e$ — the time during which only the last two lineages remain — is at least half of $\E[T_\mathrm{MRCA}]$ for any $n$. Adding more sequences adds short twigs near the present but hardly changes the age of the root: $\E[T_\mathrm{MRCA}]$ is $2N_e$ for $n = 2$ and only approaches $4N_e$ as $n \to \infty$.
- **Variation grows slowly with sample size.** $a_n$ grows like $\ln n$, so ten times as many sequences find only about twice as many segregating sites.
- **Genealogies are very variable.** Even with the population size fixed, the coalescence times of a single locus have a large variance, so estimates from one locus are imprecise. Precision comes from averaging over many unlinked loci, each with an independent genealogy.

::: widget distribution
dist: exponential
params: lambda=1
a: 0
b: 1
cdf: true
caption: The distribution of the coalescence time of two genes, in units of $2N_e$ generations: exponential with rate 1, mean 1 ([[#prop-pair]]). The shaded area, $1 - e^{-1} \approx 0.63$, is the probability that the pair has coalesced within $2N_e$ generations; switch to the CDF to read other values. The spread is large — about one pair in seven takes more than twice the mean. Change the rate to $\binom k2$ (3 for $k = 3$ lineages, 6 for $k = 4$, 10 for $k = 5$) to see how much faster the first merger happens in a larger sample.
:::

### Simulating the coalescent

The coalescent is extremely cheap to simulate, because only the sample's ancestors are followed, not the whole population. This standard-library Python program generates genealogies of $n = 10$ genes with $\theta = 5$ and records the age of the MRCA, the total branch length and the number of segregating sites.

```python
import random, math

def coalescent(n, theta, rng):
    """One neutral genealogy of n genes; times in units of 2N generations.
    Returns (T_MRCA, total branch length, number of segregating sites)."""
    t_mrca, length = 0.0, 0.0
    for k in range(n, 1, -1):
        rate = k * (k - 1) / 2             # pairs of lineages that can coalesce
        t = rng.expovariate(rate)          # waiting time while k lineages exist
        t_mrca += t
        length += k * t
    lam = theta / 2 * length               # mutation rate per 2N generations = 2N*mu = theta/2
    S, x = 0, rng.expovariate(1.0)
    while x < lam:                         # Poisson(lam) by exponential gaps
        S += 1
        x += rng.expovariate(1.0)
    return t_mrca, length, S

rng = random.Random(42)
runs = [coalescent(10, 5.0, rng) for _ in range(100000)]
for i, name in enumerate(["T_MRCA", "length", "S"]):
    vals = [r[i] for r in runs]
    m = sum(vals) / len(vals)
    v = sum((x - m) ** 2 for x in vals) / (len(vals) - 1)
    print(f"{name}: mean {m:.3f}, sd {math.sqrt(v):.3f}")
```

::: example Checking the simulation against theory {#ex-coalsim}
The program prints (seed 42): $T_\mathrm{MRCA}$ mean 1.802, sd 1.074; total length mean 5.661, sd 2.476; $S$ mean 14.160, sd 7.259. Compare the means with [[#prop-coalescent]], and explain why the standard deviation of $S$ is so large.
::: solution
In units of $2N_e$ generations, [[#eq-tmrca]] gives $\E[T_\mathrm{MRCA}] = 2(1 - 1/10) = 1.8$ and $\E[T_\mathrm{total}] = 2a_{10} = 2\times2.829 = 5.658$, matching 1.802 and 5.661. [[#eq-es]] gives $\E[S] = \theta a_{10} = 5\times2.829 = 14.14$, matching 14.16.

The variance of $S$ has two sources: Poisson variation in the number of mutations given the tree, and variation in the tree itself. Watterson (1975) showed that $\Var(S) = \theta a_n + \theta^2\sum_{i=1}^{n-1}1/i^2$, which here is $14.14 + 25\times1.540 = 52.64$, a standard deviation of 7.26 — exactly what the simulation found. Most of it comes from the genealogy (the $\theta^2$ term), which is why adding more sequences from the same locus does not make estimates of $\theta$ much more precise, while adding more independent loci does.
:::
:::

::: widget plot
f: 2*(1 - 1/x); 2*(ln(x - 1) + 0.5772 + 1/(2*(x - 1)))
x: 2, 50
y: 0, 10
labels: \E[T_\mathrm{MRCA}]; \E[T_\mathrm{total}]\ (\approx)
hlines: 2
caption: The expected age of the most recent common ancestor of a sample (lower curve) and the expected total branch length of its genealogy (upper curve), in units of $2N_e$ generations, against the sample size $n$. The total length uses the approximation $a_n \approx \ln(n-1) + 0.5772 + 1/(2(n-1))$, accurate to better than 1 % here. Notice that the age of the MRCA is already 1.8 at $n = 10$ and never exceeds 2, while the total length — and with it the expected number of segregating sites — keeps growing like $\ln n$.
:::

## Effective population size

The census number of a population and the amount of drift it experiences are often very different. The **effective population size** $N_e$ is the size of an ideal Wright–Fisher population that would drift at the same rate. Because "rate of drift" can be measured in several ways — by the increase of variance between populations, the increase of inbreeding, the decay of heterozygosity, or the rate of coalescence — there are several definitions (variance, inbreeding and coalescent effective sizes). For a population of constant size they agree; with changing size they can differ, and the coalescent effective size is the one that sequence data estimate.

::: proposition Standard formulas for effective size {#prop-ne}
For a diploid population with discrete generations:

1. **Unequal sex ratio**, $N_m$ males and $N_f$ females breeding: $N_e = \dfrac{4N_mN_f}{N_m + N_f}$.
2. **Fluctuating size** $N_1, \ldots, N_t$: $\dfrac{1}{N_e} = \dfrac1t\displaystyle\sum_{i=1}^t\dfrac{1}{N_i}$ (harmonic mean).
3. **Variance in family size**: with $N$ breeding individuals of constant number and variance $V_k$ in the number of gametes each contributes to the next generation (mean 2),

$$
N_e = \frac{4N - 2}{V_k + 2}.
$$ {#eq-ne-vk}
:::

Items 1 and 2 were used in [[evolution/mutation-drift-gene-flow]]. Item 3 (due to Wright, 1938, and in this form to James Crow) contains the other two as special cases of variance in reproductive success. In the Wright–Fisher model each individual's number of gametes is approximately Poisson with mean 2, so $V_k \approx 2$ and $N_e \approx N$. If every individual contributes exactly two offspring ($V_k = 0$) — as in captive-breeding programmes that equalise family sizes — then $N_e \approx 2N$: drift is halved, because the only sampling left is Mendelian segregation within families. In most natural populations $V_k$ is much larger than 2: a few individuals leave many offspring and many leave none.

::: example A population with very unequal success {#ex-vk}
In a population of 100 breeding fish, the number of offspring surviving to breed has mean 2 per parent but variance 6. What is the effective size? What if a hatchery equalised family sizes?
::: solution
By [[#eq-ne-vk]], $N_e = (400 - 2)/(6 + 2) = 49.75$, about half the census number. With equal family sizes, $V_k = 0$ and $N_e = 398/2 = 199$, about twice the census number. A hatchery that equalises contributions quadruples the effective size relative to the wild-type reproduction assumed here. The reverse also happens: hatchery programmes in which a few parents produce many released offspring can greatly *reduce* the effective size of a wild population they supplement (the Ryman–Laikre effect, 1991).
:::
:::

How large is $N_e$ relative to the census size $N$? A review of nearly 200 estimates in wildlife by Richard Frankham (1995) found that $N_e/N$ averaged only about 0.1 when all factors (fluctuating size, sex ratio, family-size variance) were included. Marine fish with enormous fecundity and huge variance in reproductive success can have ratios several orders of magnitude lower. This is the main reason that conservation genetics works with $N_e$ rather than with counts ([[conservation-biology/small-populations]]). It also explains part of a long-standing puzzle, named by Richard Lewontin in 1974: genetic diversity varies far less among species than census sizes do. Linked selection, which reduces diversity more in large populations, is thought to explain much of the rest ([[population-genetics/neutral-theory]]).

### Bottlenecks and founder events

A temporary reduction in size has two different effects on variation. It reduces heterozygosity in proportion to $1 - 1/2N_b$ per generation of bottleneck, which is a small loss for a short bottleneck; but it can eliminate rare alleles efficiently, because an allele at frequency $p$ is absent from a sample of $2N_b$ founder genes with probability $(1 - p)^{2N_b}$. Masatoshi Nei, Takeo Maruyama and Ranajit Chakraborty (1975) showed that a bottleneck followed by rapid growth reduces the number of alleles much more than heterozygosity, and that recovery of heterozygosity by mutation takes of the order of $1/\mu$ generations.

::: example Ten founders {#ex-founders}
A new island population is founded by 10 diploid individuals drawn at random from a large mainland population. (a) What fraction of the mainland heterozygosity is expected to be retained? (b) What is the probability that an allele with mainland frequency 0.05 is absent from the founders? (c) What about an allele at frequency 0.01?
::: solution
(a) One generation of sampling $2N_b = 20$ genes retains $1 - 1/20 = 95$ % of the heterozygosity.

(b) $(1 - 0.05)^{20} = 0.358$: more than a third of such alleles are lost.

(c) $(0.99)^{20} = 0.818$: most alleles at 1 % are lost. The founders keep most of the heterozygosity, which is dominated by common alleles, but lose most of the rare alleles. Founder populations can then show unusual frequencies of particular rare alleles that happened to be present among the founders — a pattern seen in many isolated human communities and in island populations of animals and plants.
:::
:::

::: widget plot
f: (1 - x)^(2*Nb); 1 - 1/(2*Nb) + 0*x
x: 0, 0.2
y: 0, 1
sliders: Nb=10:1:100:1
labels: \Prob(\text{allele lost}); \text{heterozygosity retained}
caption: The effect of a founder event of $N_b$ diploid individuals: the probability $(1-p)^{2N_b}$ that an allele with source frequency $p$ (horizontal axis) is absent from the founders, and the fraction $1 - 1/2N_b$ of heterozygosity retained (flat line). With the default 10 founders, almost all heterozygosity survives but alleles rarer than a few per cent are usually lost. Slide $N_b$ down to 2 to see a severe bottleneck, and up to 100 to see that even then alleles below about 0.5 % are at risk.
:::

::: warning "Drift matters only in tiny populations"
Drift acts in every finite population, and its effects scale with $1/N_e$, not with the census number. Many species with millions of individuals have effective sizes in the thousands. Even when drift is weak in a single generation, it is the dominant force for alleles whose selection coefficients satisfy $\lvert s\rvert \ll 1/N_e$, which includes a large fraction of all mutations, and its cumulative effect over $N_e$ generations is never small. Conversely, drift is not a "force" with a direction: it does not make populations worse or alleles rarer on average; it makes their frequencies vary.
:::

::: quiz
Which change would *increase* the effective size of a captive population of 40 animals, all else being equal?
- [ ] Letting the dominant pair produce most of the offspring, because they are healthiest.
- [ ] Allowing the population size to cycle between 80 and 10.
- [x] Equalising the number of offspring each animal contributes.
- [ ] Using only 5 males and 35 females.
::: solution
Equalising family sizes reduces $V_k$ towards 0, and by [[#eq-ne-vk]] raises $N_e$ towards $2N - 1 = 79$. Concentrating reproduction raises $V_k$ and lowers $N_e$; cycling between 80 and 10 gives a harmonic mean of about 18; and 5 males with 35 females gives $4\times5\times35/40 = 17.5$.
:::
:::

::: application Genetic management of small populations
Zoos and conservation programmes use the theory of this chapter to slow the loss of diversity in small populations: keeping $N_e$ as large as possible by equalising family sizes and sex ratios, choosing breeding pairs by their mean kinship to the rest of the population (so that under-represented founders' genes are spread), and moving individuals between populations. A common rule of thumb aims to retain 90 % of the founding heterozygosity over 100 years. From [[#eq-ft]], with generation length $L$ years, this requires $(1 - 1/2N_e)^{100/L} \ge 0.9$; for $L = 10$ years that gives $N_e \ge 48$, and since $N_e/N$ is often 0.1–0.3 in captivity, census sizes of a few hundred. These ideas are developed in [[conservation-biology/conservation-genetics]].
:::

::: intuition Two views of the same process
Forward in time, drift is a random walk of allele frequency, ending at 0 or 1. Backward in time, it is the merging of lineages: the probability that two genes trace back to the same parent is $1/2N$ per generation. The two views are the same statement — heterozygosity is lost exactly at the rate at which pairs of genes coalesce. The backward view is far more efficient for data, because a sample's history involves only a handful of ancestral lineages rather than the whole population, and because neutral mutations can be dropped onto a genealogy after it is built.
:::

::: history
Fisher (1922) and Wright (1931) independently analysed random genetic drift — others called it the "Sewall Wright effect", a name Wright disliked — and between them derived the binomial sampling model, the rate of decay of heterozygosity, and the distribution of allele frequencies under mutation, migration and selection. Wright introduced effective population size in 1931 and the variance-in-family-size formula in 1938. Peter Buri's 107 lines of *Drosophila* (1956) confirmed the predictions experimentally. Patrick Moran introduced his overlapping-generation model in 1958; Kimura systematised the diffusion approximation from 1955 onwards, and with Tomoko Ohta derived the mean times to fixation in 1969. The genealogical view was made rigorous by J. F. C. Kingman's "The coalescent" (1982), and Richard Hudson (1983) and Fumio Tajima (1983) applied it to samples of DNA sequences, opening the modern era of inference from sequence data.
:::

::: summary
- Under neutral drift $\E[p_t] = p_0$ and $\Var(p_t) = p_0q_0F_t$ with $F_t = 1 - (1 - 1/2N)^t$: variance lost within populations reappears between them ([[#prop-var]]). Buri's flies confirmed this, with $N_e \approx 11.5$ for 16 parents.
- The Moran model (overlapping generations) has $N_e = N/2$; reproduction details affect drift only through $N_e$.
- A polymorphism at $p$ lasts about $-4N_e(p\ln p + q\ln q)$ generations; a neutral mutation that fixes takes about $4N_e$ generations, while most are lost within about $2\ln(2N)$ ([[#prop-times]]).
- Backwards in time, two genes coalesce with probability $1/2N_e$ per generation, mean $2N_e$ generations; $n$ genes coalesce at rate $\binom k2$ per $2N_e$ generations ([[#def-coalescent]]).
- $\E[T_\mathrm{MRCA}] = 4N_e(1 - 1/n)$ and $\E[S] = \theta a_n$ with $\theta = 4N_e\mu$; $\E[\pi] = \theta$ ([[#prop-coalescent]]).
- $N_e$ is reduced by unequal sex ratios, fluctuating size (harmonic mean) and variance in family size, $N_e = (4N - 2)/(V_k + 2)$; $N_e/N$ is typically about 0.1 in wild populations.
- Bottlenecks lose rare alleles much faster than heterozygosity.
:::

## Exercises

::: exercise Variance after 50 generations {level=1 check="0.0987"}
In a Wright–Fisher population with $N = 50$, an allele starts at $p_0 = 0.5$. What is the variance of its frequency among replicate populations after 50 generations (four decimal places)?
::: solution
$\Var(p_{50}) = 0.25\,[1 - (1 - 1/100)^{50}] = 0.25\times(1 - 0.605) = 0.0987$.
:::
:::

::: exercise A pair's common ancestor {level=1 check="20000"}
In a population with $N_e = 10{,}000$, what is the expected number of generations back to the common ancestor of two gene copies at a neutral locus?
::: solution
$\E[T_2] = 2N_e = 20{,}000$ generations (about 500,000 years at 25 years per generation).
:::
:::

::: exercise Variance in family size {level=1 check="33"}
A population of 50 breeding adults is constant in size, and the number of gametes each contributes to the next generation has variance 4. What is its effective size?
::: solution
$N_e = (4\times50 - 2)/(4 + 2) = 198/6 = 33$.
:::
:::

::: exercise Segregating sites expected {level=2 check="20.8333"}
Five sequences of a neutral locus are sampled from a population in which $\theta = 4N_e\mu = 10$ for the whole locus. How many segregating sites are expected?
::: solution
$a_5 = 1 + \tfrac12 + \tfrac13 + \tfrac14 = 2.0833$, so $\E[S] = 10\times2.0833 = 20.83$.
:::
:::

::: exercise Effective size from diversity {level=2 check="200000"}
Silent-site nucleotide diversity in a species is $0.004$ and the mutation rate is $5\times10^{-9}$ per site per generation. Estimate $N_e$.
::: solution
$N_e = \pi/(4\mu) = 0.004/(2\times10^{-8}) = 2\times10^5$. This assumes neutral silent sites, a constant population size, and an accurate $\mu$; each assumption is a source of error.
:::
:::

::: exercise Losing a rare allele {level=2 check="0.3487"}
A population is re-established from 5 individuals taken from a large source in which an allele has frequency 0.1. What is the probability that the allele is absent from the founders (four decimal places)?
::: solution
The founders carry $2\times5 = 10$ gene copies, so the probability is $0.9^{10} = 0.3487$.
:::
:::

::: exercise Estimating Ne from an experiment {level=2}
In replicate lines maintained with 16 parents per generation, mean heterozygosity falls from 0.500 to 0.215 in 19 generations. (a) Estimate $N_e$. (b) Give two biological reasons why it is less than 16.
::: solution
(a) $(1 - 1/2N_e)^{19} = 0.215/0.500 = 0.430$, so $1 - 1/2N_e = 0.430^{1/19} = 0.9565$, giving $2N_e = 23.0$ and $N_e \approx 11.5$ — Buri's estimate.

(b) Variation in the number of offspring per parent beyond the Poisson expectation (some flies are more fertile or more successful at mating, or their larvae survive better in a crowded vial), and selection on *brown* alleles or linked loci, which can add to the change in frequencies. Unequal numbers of effective males and females would also lower $N_e$.
:::
:::

::: exercise Half the tree is the last two lineages {level=3}
(a) Show that the fraction of the expected time to the MRCA during which only two lineages remain is $\E[T_2]/\E[T_\mathrm{MRCA}] = \dfrac{n}{2(n - 1)}$, and evaluate it for $n = 2$, 10 and 50. (b) Explain why sequencing more individuals from one population barely improves the estimate of the age of the MRCA, and what would.
::: solution
(a) $\E[T_2] = 2N_e$ and $\E[T_\mathrm{MRCA}] = 4N_e(1 - 1/n) = 4N_e(n - 1)/n$, so the ratio is $n/[2(n - 1)]$: 1 for $n = 2$, 0.556 for $n = 10$, 0.510 for $n = 50$. It never falls below one-half.

(b) The age of the root is dominated by $T_2$, the waiting time for the last two lineages, which is exponential with mean $2N_e$ and the same large variance whatever $n$ is: with high probability a moderate sample already contains descendants of both branches at the root, so extra sequences only add short branches near the tips. Precision comes from many independent loci, each with its own genealogy, or from better knowledge of $\mu$ and $N_e$.
:::
:::

::: exercise A cycling population {level=3}
A vole population alternates between 10,000 in peak years and 100 in crash years (one generation per year). (a) Calculate its effective size. (b) How many generations would it take to lose half its heterozygosity? (c) Compare with a population constant at the arithmetic mean size.
::: solution
(a) $1/N_e = \tfrac12(10^{-4} + 10^{-2}) = 0.00505$, so $N_e = 198$.

(b) $t_{1/2} \approx 2N_e\ln 2 = 274$ generations.

(c) The arithmetic mean is 5,050, giving $t_{1/2} \approx 7{,}000$ generations. The crash years dominate: the cycling population loses diversity about 25 times faster than its average size suggests.
:::
:::

::: exercise The Moran model {level=3}
In a haploid Moran model of $N$ individuals, an event chooses one individual to reproduce and one to die, independently and uniformly at random. (a) Show that the frequency $p = i/N$ of type $A$ changes by $+1/N$ with probability $pq$, by $-1/N$ with probability $pq$, and otherwise not at all. (b) Show that the variance of the change in $p$ per event is $2pq/N^2$, and hence that over $N$ events (one generation) the variance is about $2pq/N$. (c) Conclude that the Moran model drifts like a Wright–Fisher haploid population of size $N/2$, and give the expected number of generations for a new neutral mutation that fixes to do so.
::: solution
(a) The $A$ count rises if an $A$ reproduces and an $a$ dies, probability $p\cdot q$; it falls if an $a$ reproduces and an $A$ dies, probability $q\cdot p$.

(b) The mean change is 0, so the variance is $\E[(\Delta p)^2] = 2pq\cdot(1/N)^2 = 2pq/N^2$. Over $N$ events, with $p$ changing little, the variances add: $N\times2pq/N^2 = 2pq/N$.

(c) A haploid Wright–Fisher population of size $M$ has variance $pq/M$ per generation, which equals $2pq/N$ when $M = N/2$. The conditional fixation time of a new mutation in a haploid Wright–Fisher population of $M$ copies is about $2M$ generations (the diploid $4N_e$ with $2N_e = M$), so here about $2\times N/2 = N$ generations, i.e. $N^2$ birth–death events.
:::
:::
