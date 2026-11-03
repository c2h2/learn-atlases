Natural selection is the one evolutionary force that is systematically related to how well organisms work, and population genetics was founded largely to understand it. The course on evolution derived the basic equations — selection in haploids, the one-locus diploid recurrence, dominance, the recessive lethal and heterozygote advantage ([[evolution/natural-selection]]). This chapter takes them further. We separate the components of fitness and ask what "fitness" must mean for the models to work; rewrite the dynamics in terms of the marginal fitnesses of alleles, which makes multi-allele and general results transparent; approximate them in continuous time to get closed-form sweep times; analyse equilibria and their stability systematically; meet Fisher's fundamental theorem in its one-locus form; and add two complications that matter in nature, frequency-dependent selection and fluctuating environments. We finish with how selection is measured.

Throughout, the population is large enough that drift can be ignored, mating is random and generations are discrete. Drift is added in [[population-genetics/genetic-drift]], and the interplay of the two is one of the main themes of the rest of the course.

## What fitness means

An individual's contribution to the next generation is the product of several stages of a life cycle: surviving from zygote to adult (**viability**), obtaining mates (**mating success**), and producing gametes or offspring (**fecundity** or fertility). Selection can act at any of them, and also among gametes or within the genome itself.

::: definition Fitness components and measures of fitness {#def-fitness-components}
For a genotype $G$, the **absolute fitness** $W_G$ is the expected number of zygotes in the next generation contributed per zygote of genotype $G$ in this one, counted at the same stage of the life cycle in both. With viability $v_G$ (probability of surviving to reproduce), mating success $m_G$ and fecundity $f_G$ acting independently, $W_G = v_Gm_Gf_G$. The **relative fitness** is $w_G = W_G/W_\mathrm{ref}$ for a chosen reference genotype. In continuous time, the **Malthusian fitness** is the per-capita growth rate $r_G = \ln W_G$ per generation, and selection depends on differences $r_G - r_\mathrm{ref}$.
:::

Three consequences of the definition are worth stating, because they are often violated in careless arguments.

- **Fitness must be counted across a whole generation** and at the same stage. Counting survivors to adulthood in one genotype but eggs in another, or measuring fitness over different lengths of time, gives meaningless comparisons.
- **Only relative fitness matters** for the change in frequencies (the equations depend on ratios of fitnesses), but absolute fitness matters for whether the population persists. A population can evolve ever better relative performance while declining to extinction.
- **The simple models assume fitness is a property of the individual's genotype.** If fecundity depends on the *pair* — for example, if matings between two particular genotypes are less fertile — selection acts on mating combinations, and zygotes may depart from Hardy–Weinberg proportions. Fertility selection of this kind needs more elaborate models (the classic case is maternal–foetal incompatibility at the Rh blood-group locus).

### Selection below the level of the individual

Mendel's first law is itself an assumption. **Meiotic drive** (segregation distortion) occurs when a heterozygote transmits one allele to more than half its gametes. The *t*-haplotypes of the house mouse, *Mus musculus*, are transmitted by heterozygous males to up to about 90 % or more of their offspring, and the *Segregation Distorter* system of *D. melanogaster* similarly kills sperm carrying the sensitive chromosome. Such "selfish" elements can spread even if they lower the fitness of their carriers, a point we return to in the warning below. Engineered gene drives use the same principle ([[biotechnology]]).

## The dynamics, in terms of marginal fitness

The diploid recurrence of [[evolution/natural-selection]] can be written in a form that makes its meaning clear and generalises at once to many alleles.

::: definition Marginal fitness of an allele {#def-marginal}
In a random-mating population with allele frequencies $p_1, \ldots, p_k$ and genotype fitnesses $w_{ij}$, the **marginal fitness** of allele $A_i$ is the average fitness of the genotypes that carry it, weighted by the probability that a copy of $A_i$ finds itself in each:

$$
w_i = \sum_{j} p_j\,w_{ij}.
$$ {#eq-marginal}

The mean fitness is $\bar w = \sum_i p_iw_i = \sum_{i,j}p_ip_jw_{ij}$.
:::

A copy of $A_i$ is paired with a random gamete from the population, which carries $A_j$ with probability $p_j$; so $w_i$ is the expected fitness of the individual that copy finds itself in.

::: proposition One-locus selection in marginal-fitness form {#prop-marginal}
Under viability selection with random mating and Hardy–Weinberg proportions at the zygote stage,

$$
p_i' = p_i\,\frac{w_i}{\bar w},\qquad \Delta p_i = \frac{p_i\,(w_i - \bar w)}{\bar w}.
$$ {#eq-marginal-dp}

With two alleles, writing $\alpha = w_1 - w_2$ for the difference in marginal fitnesses,

$$
\Delta p = \frac{pq\,\alpha}{\bar w},\qquad \alpha = p(w_{11} - w_{12}) + q(w_{12} - w_{22}).
$$ {#eq-alpha}
:::

::: proof
Among zygotes, genotype $A_iA_j$ has frequency $p_ip_j$ for each ordered pair (so $p_i^2$ for homozygotes, $2p_ip_j$ for heterozygotes). After selection, the frequency of $A_i$ among survivors is the fraction of surviving gene copies that are $A_i$. Each ordered pair contributes its first copy; the first copy is $A_i$ with weight $\sum_j p_ip_jw_{ij} = p_iw_i$, and the total weight is $\sum_ip_iw_i = \bar w$. So $p_i' = p_iw_i/\bar w$. With two alleles, $\bar w = pw_1 + qw_2$ and $w_1 - \bar w = q(w_1 - w_2)$, giving $\Delta p = pq(w_1 - w_2)/\bar w$; and $w_1 - w_2 = pw_{11} + qw_{12} - pw_{12} - qw_{22}$.
:::

[[#eq-marginal-dp]] says that **an allele increases exactly when its carriers are, on average, fitter than the population**. Equilibria with all alleles present are therefore the points where all marginal fitnesses are equal. The quantity $\alpha$ — the difference between the average fitnesses of carriers of $A_1$ and $A_2$ — is called the **average excess** of $A_1$ (for fitness). Under random mating it equals the **average effect** of substituting $A_1$ for $A_2$, a concept that reappears in quantitative genetics ([[population-genetics/quantitative-traits]]).

### Continuous time and sweep times

When selection is weak ($s \ll 1$), allele frequencies change little each generation and we can replace the difference equation by a differential equation. With the parametrisation $w_{11} = 1 + s$, $w_{12} = 1 + hs$, $w_{22} = 1$ we have $\alpha = s[h + p(1 - 2h)]$ and $\bar w \approx 1$, so

$$
\frac{dp}{dt} \approx s\,p\,q\,[\,h + p(1 - 2h)\,].
$$ {#eq-continuous}

This can be integrated by partial fractions for the three classic cases.

::: proposition Duration of a selective sweep {#prop-sweep}
Under [[#eq-continuous]], the number of generations for the frequency of the favoured allele to rise from $p_0$ to $p_1$ is, with $L = \ln\dfrac{p_1q_0}{p_0q_1}$:

$$
t \approx
\begin{cases}
\dfrac{2}{s}\,L & h = \tfrac12\ \text{(additive)},\\[2ex]
\dfrac{1}{s}\left(L + \dfrac{1}{p_0} - \dfrac{1}{p_1}\right) & h = 0\ \text{(recessive)},\\[2ex]
\dfrac{1}{s}\left(L + \dfrac{1}{q_1} - \dfrac{1}{q_0}\right) & h = 1\ \text{(dominant)}.
\end{cases}
$$ {#eq-sweep}
:::

::: proof
Separate variables: $t = \int_{p_0}^{p_1}\frac{dp}{s\,pq\,[h + p(1-2h)]}$. For $h = \tfrac12$ the integrand is $\frac{2}{s}\cdot\frac{1}{pq}$, and $\frac{1}{pq} = \frac1p + \frac1q$ integrates to $\ln\frac{p}{q}$. For $h = 0$ it is $\frac{1}{s}\cdot\frac{1}{p^2q}$, and $\frac{1}{p^2q} = \frac{1}{p^2} + \frac{1}{p} + \frac{1}{q}$ integrates to $-\frac1p + \ln\frac pq$. For $h = 1$ it is $\frac1s\cdot\frac{1}{pq^2}$, and $\frac{1}{pq^2} = \frac{1}{q^2} + \frac1p + \frac1q$ integrates to $\frac1q + \ln\frac pq$. Evaluating between the limits gives [[#eq-sweep]].
:::

The extra terms $1/p_0$ and $1/q_1$ are the signatures of the two bottlenecks of dominance: a favoured recessive allele is invisible while rare, and a favoured dominant allele cannot find the last recessive copies hiding in heterozygotes.

::: example Testing the continuous approximation {#ex-sweep}
A new allele gives a 5 % advantage to homozygotes ($s = 0.05$). How long does it take to rise from $p = 0.01$ to $0.99$ if it is additive, recessive or dominant? Compare with exact iteration of the discrete recurrence, which gives 377, 2171 and 2265 generations.
::: solution
Here $L = \ln\frac{0.99\times0.99}{0.01\times0.01} = \ln 9801 = 9.190$.

- Additive: $t \approx (2/0.05)\times9.190 = 368$ generations (exact 377).
- Recessive: $t \approx 20\,(9.190 + 100 - 1.010) = 2164$ (exact 2171).
- Dominant: $t \approx 20\,(9.190 + 100 - 1.010) = 2164$ (exact 2265).

The approximation is good to within 3 % in the first two cases. For the dominant allele it is 5 % short: most of that sweep is spent near $p = 1$, where the mean fitness is close to $1 + s = 1.05$ rather than 1, and the factor $1/\bar w$ that we dropped slows the discrete process by about 5 %. The recessive allele spends most of its time near $p = 0$, where $\bar w \approx 1$ and the approximation is excellent. In both of these cases most of the time is spent in the terms $1/p_0$ or $1/q_1$ — that is, in the slow phase — and only about 9 % in the logistic part $L$.
:::
:::

::: widget slopefield
f: s*y*(1 - y)*(h + y*(1 - 2*h))
x: 0, 400
y: 0, 1
sliders: s=0.05:0.005:0.2:0.005; h=0.5:0:1:0.05
points: 0, 0.01; 0, 0.1; 0, 0.5
caption: The direction field of [[#eq-continuous]], with allele frequency $p$ (vertical) against generations (horizontal), and solution curves from $p = 0.01$, 0.1 and 0.5. Click to start more curves. At $h = 0.5$ the curves are symmetric S-shapes. Slide $h$ to 0 (recessive) and the field becomes almost flat near $p = 0$, so the curve from 0.01 hardly moves in 400 generations; slide it to 1 (dominant) and the flat zone moves to the top, where the curves creep towards fixation. Doubling $s$ halves every time scale.
:::

## Equilibria and their stability

For two alleles the equilibria of [[#eq-alpha]] are $p = 0$, $p = 1$, and any interior $\hat p$ at which $\alpha(\hat p) = 0$, that is $w_1 = w_2$. Since $\alpha$ is linear in $p$, there is at most one interior equilibrium (unless fitnesses are all equal):

$$
\hat p = \frac{w_{22} - w_{12}}{w_{11} - 2w_{12} + w_{22}},
$$ {#eq-interior}

which lies between 0 and 1 exactly when $w_{12}$ is either larger than both homozygote fitnesses (overdominance) or smaller than both (underdominance).

To decide whether an equilibrium is stable, we linearise. A discrete map $p' = f(p)$ with fixed point $\hat p$ is locally stable if $\lvert f'(\hat p)\rvert < 1$, unstable if $\lvert f'(\hat p)\rvert > 1$, and the approach is monotone if $0 < f'(\hat p) < 1$ (difference equations are treated in [Maths Atlas](/learn/maths/)).

::: proposition Stability of the one-locus equilibria {#prop-stability}
For two alleles with fitnesses $w_{11}, w_{12}, w_{22}$:

1. $p = 0$ is stable if $w_{12} < w_{22}$ and unstable if $w_{12} > w_{22}$; $p = 1$ is stable if $w_{12} < w_{11}$ and unstable if $w_{12} > w_{11}$. Near $p = 0$, $p' \approx (w_{12}/w_{22})\,p$.
2. The interior equilibrium [[#eq-interior]] is stable under overdominance and unstable under underdominance. Near it,

$$
p' - \hat p \approx \left(1 - \frac{\hat p\hat q\,(2w_{12} - w_{11} - w_{22})}{\bar w(\hat p)}\right)(p - \hat p).
$$ {#eq-stability}
:::

::: proof
(1) When $A_1$ is rare almost all its copies are in heterozygotes, so $w_1 \approx w_{12}$ and $\bar w \approx w_{22}$; [[#eq-marginal-dp]] gives $p' \approx p\,w_{12}/w_{22}$, which grows if $w_{12} > w_{22}$ and shrinks otherwise. The case $p = 1$ is symmetric.

(2) Write $\Delta p = g(p) = pq\,\alpha(p)/\bar w$. Since $\alpha(\hat p) = 0$, the derivative at $\hat p$ is $g'(\hat p) = \hat p\hat q\,\alpha'(\hat p)/\bar w(\hat p)$, where $\alpha'(p) = w_{11} - 2w_{12} + w_{22}$. Then $f'(\hat p) = 1 + g'(\hat p)$, which is [[#eq-stability]]. Under overdominance $\alpha' < 0$, so $f'(\hat p) < 1$. It is also non-negative: with $w_{12} = 1$, $w_{11} = 1 - s$, $w_{22} = 1 - t$ ($0 < s, t \le 1$) we have $\hat p\hat q(s + t) = st/(s + t) = 1 - \bar w(\hat p)$, so $f'(\hat p) = 1 - (1 - \bar w)/\bar w = (2\bar w - 1)/\bar w$, which lies in $[0, 1)$ because $\bar w \ge \tfrac12$. The equilibrium is stable and approached monotonically. Under underdominance $\alpha' > 0$ and $f'(\hat p) > 1$: unstable.
:::

Result (1) is the **invasion criterion** and is worth remembering on its own: whether a rare allele can enter a population depends only on how its heterozygotes compare with the resident homozygote. If both $p = 0$ and $p = 1$ are unstable, each allele can invade the other, and the population is held in a **protected polymorphism**.

::: example Warfarin resistance in rats {#ex-warfarin}
The anticoagulant warfarin was widely used against Norway rats, *Rattus norvegicus*, from the 1950s, and resistant populations appeared in Britain and elsewhere within a decade or so. Resistance is due to variants of the gene *Vkorc1*, which encodes the target enzyme of warfarin. Resistant homozygotes have a much higher dietary requirement for vitamin K, so where warfarin is used, both homozygotes are at a disadvantage: susceptible rats are poisoned, and resistant homozygotes suffer vitamin K deficiency. Take illustrative fitnesses where warfarin is in use of $w_{SS} = 0.68$, $w_{SR} = 1$, $w_{RR} = 0.37$. Find the equilibrium, check its stability, and give the mean fitness.
::: solution
In the notation $w_{11} = 1 - s$, $w_{12} = 1$, $w_{22} = 1 - t$ with $A_1 = S$: $s = 0.32$, $t = 0.63$. By [[#eq-interior]] (or [[evolution/natural-selection]]), $\hat p_S = t/(s + t) = 0.63/0.95 = 0.663$ and $\hat q_R = 0.337$. The mean fitness there is $\bar w = 1 - st/(s + t) = 1 - 0.2016/0.95 = 0.788$.

For stability, $2w_{12} - w_{11} - w_{22} = s + t = 0.95$, and by [[#eq-stability]]

$$
f'(\hat p) = 1 - \frac{0.663\times0.337\times0.95}{0.788} = 1 - 0.269 = 0.731.
$$

Since $0 < 0.731 < 1$, the equilibrium is stable and approached monotonically; a deviation shrinks by about 27 % per generation. The model predicts that resistance stays polymorphic as long as warfarin is used, and declines when it stops — both observed in Welsh rat populations studied in the 1970s. Rodent control then moved to second-generation anticoagulants, which in turn selected new *Vkorc1* variants: a lesson in the evolutionary management of resistance.
:::
:::

::: widget cobweb
g: (x^2*(1 - s) + x*(1 - x))/(x^2*(1 - s) + 2*x*(1 - x) + (1 - x)^2*(1 - t))
x0: 0.05
steps: 30
sliders: s=0.32:-0.5:0.9:0.01; t=0.63:-0.5:0.9:0.01
x: 0, 1
y: 0, 1
caption: The one-generation map $p' = f(p)$ for genotype fitnesses $1 - s$, $1$ and $1 - t$, with the orbit from $p_0 = 0.05$ drawn as a cobweb against the diagonal. The default values are those of [[#ex-warfarin]]: the orbit climbs to the stable equilibrium $\hat p = t/(s+t) \approx 0.66$, where the map crosses the diagonal with slope less than 1. Make both $s$ and $t$ negative (heterozygote least fit): the interior crossing becomes steeper than the diagonal, the equilibrium becomes unstable, and the orbit runs to 0 or 1 depending on which side of it it starts. With $s < 0 < t$, $A_1$ simply goes to fixation.
:::

::: example An underdominant chromosome rearrangement {#ex-underdominance}
A reciprocal translocation reduces the fertility of heterozygotes, which produce some unbalanced gametes. Suppose $w_{11} = 1$ (translocation homozygotes, which are fully fertile and slightly better adapted), $w_{12} = 0.8$ and $w_{22} = 0.9$ (standard homozygotes). Find the threshold, and say what happens to a translocation arising as a single copy in a large population.
::: solution
By [[#eq-interior]], $\hat p = (0.9 - 0.8)/(1 - 1.6 + 0.9) = 0.1/0.3 = 1/3$. Since $w_{12}$ is below both homozygotes, this equilibrium is unstable: from $p > 1/3$ the translocation goes to fixation, from $p < 1/3$ it is lost. A new translocation starts at a frequency close to 0, where by [[#prop-stability]] $p' \approx (0.8/0.9)\,p$ and it is eliminated, although the population would be fitter if it were fixed ($\bar w = 1$ against $0.9$). In a large population selection cannot cross the valley; in a small one, drift can occasionally carry the rearrangement past the threshold ([[population-genetics/genetic-drift]]), which is one reason chromosomal rearrangements fix more often in species with small, subdivided populations. The same threshold logic is exploited by proposed "underdominance" gene drives for insect control, which spread only if released above the threshold and so stay local.
:::
:::

## Mean fitness and Fisher's fundamental theorem

The second form of the diploid recurrence in [[evolution/natural-selection]], $\Delta p = \frac{pq}{2\bar w}\frac{d\bar w}{dp}$, says that $p$ climbs the curve $\bar w(p)$. Equilibria are where $\bar w$ is stationary: a peak under overdominance, a trough under underdominance. Plotting $\bar w$ against $p$ draws Sewall Wright's **adaptive landscape** for one locus.

::: widget plot
f: 1 - s*x^2 - t*(1 - x)^2
x: 0, 1
sliders: s=0.32:-0.5:0.9:0.01; t=0.63:-0.5:0.9:0.01
labels: \bar w(p)
caption: Mean fitness $\bar w = (1-s)p^2 + 2pq + (1-t)q^2 = 1 - sp^2 - tq^2$ against the frequency $p$ of $A_1$, for the same fitnesses as the cobweb plot. Under selection $p$ moves uphill. With $s, t > 0$ the curve has a single peak at $\hat p = t/(s+t)$, which is the stable equilibrium, and its height is $1 - st/(s+t)$ — below 1, because the population cannot consist only of heterozygotes. With $s, t < 0$ the curve has a valley in the middle and two peaks at the ends: the population climbs whichever slope it starts on, even if it ends on the lower peak.
:::

How fast does mean fitness increase? For two alleles, the average excess $\alpha$ defines the **additive genetic variance in fitness**,

$$
V_A = 2pq\,\alpha^2,
$$ {#eq-va-fitness}

the variance of fitness explained by a linear regression of fitness on the number of $A_1$ copies an individual carries (this definition is developed for any trait in [[population-genetics/quantitative-traits]]).

::: proposition Fisher's fundamental theorem, one-locus form {#prop-fisher}
For two alleles under constant viability selection with random mating, to first order in $\Delta p$,

$$
\Delta\bar w \approx \frac{V_A}{\bar w} = \frac{2pq\,\alpha^2}{\bar w}.
$$ {#eq-fisher}

It is exact when the alleles act additively on fitness. Mean fitness never decreases under this model.
:::

::: proof
Since $\bar w$ is a quadratic function of $p$ with $d\bar w/dp = 2\alpha$ (differentiate $\bar w = p^2w_{11} + 2pqw_{12} + q^2w_{22}$ with $q = 1 - p$ and compare with [[#eq-alpha]]),

$$
\Delta\bar w = 2\alpha\,\Delta p + \tfrac12\bar w''(\Delta p)^2 = \frac{2pq\,\alpha^2}{\bar w} + O\bigl((\Delta p)^2\bigr),
$$

using $\Delta p = pq\alpha/\bar w$. For additive fitnesses $\bar w$ is linear in $p$ ($\bar w'' = 0$), and the result is exact. The leading term is never negative; the correction is of order $s^2$, so for weak selection $\bar w$ increases whenever $V_A > 0$. (The exact statement that $\bar w$ never decreases for any constant fitnesses at one locus, with any number of alleles, was proved in 1959 by P. A. G. Scheuer and S. P. H. Mandel and independently by H. P. Mulholland and C. A. B. Smith, and extended by J. F. C. Kingman in 1961.)
:::

R. A. Fisher stated his theorem in 1930 in words — "the rate of increase in fitness of any organism at any time is equal to its genetic variance in fitness at that time" — and called it as fundamental to biology as the second law of thermodynamics is to physics. Its exact meaning was debated for decades. George Price (1972) and Anthony Edwards showed that Fisher meant only the *partial* change due to the change in allele frequencies, holding the "environment" (including dominance and epistatic interactions and the frequencies of other genotypes) constant. In that reading the theorem is exact and general; the *total* change in mean fitness can be negative, because the environment deteriorates as the population evolves.

::: warning "Selection maximises mean fitness" and "selection acts for the good of the species"
The adaptive landscape picture is exact only for a single locus with constant fitnesses and random mating. With frequency-dependent fitness, mean fitness can fall while selection proceeds (the next section has an example); with two or more loci and linkage, or with non-random mating, $\bar w$ need not be maximised; and in [[#ex-underdominance]] selection holds the population on a lower peak. Selection acts through the reproductive success of individuals and the transmission of alleles, not for the benefit of the population: a meiotic driver that distorts segregation spreads because it is transmitted more often, even if it lowers fertility, and in principle such an element can drive a population to extinction. Some engineered gene drives are designed to do exactly that.
:::

## Frequency-dependent selection

The fitness of a genotype often depends on how common it is. **Negative frequency-dependent selection** (rare types fitter) maintains polymorphism without any heterozygote advantage; **positive frequency-dependent selection** (common types fitter) eliminates it.

Classic negative cases are self-incompatibility alleles in plants, where pollen carrying an *S*-allele cannot fertilise a plant carrying the same allele, so rare alleles find more compatible partners (Sewall Wright analysed this in 1939); parasites and pathogens adapted to the commonest host genotypes ([[evolution/coevolution]]); and the scale-eating cichlid fish *Perissodus microlepis* of Lake Tanganyika, whose mouths are bent to the left or right. Michio Hori (1993) found that the commoner type was less successful, because prey fish learn to guard the flank attacked more often; the frequency of the two morphs oscillated around one-half over a decade of observations. Positive frequency dependence is seen in warning colouration: predators learn to avoid the common pattern, so a rare pattern is attacked more ([[evolution/coevolution]]).

A haploid model shows the essentials. Let type $A$ (frequency $p$) and type $a$ have fitnesses

$$
w_A = 1 + b\left(\tfrac12 - p\right),\qquad w_a = 1 - b\left(\tfrac12 - p\right),\qquad 0 < b \le 2,
$$

so each type does better when it is rare. Then $p' = p\,w_A/\bar w$ has an interior equilibrium at $p = \tfrac12$, where the fitnesses are equal. Near it, writing $p = \tfrac12 + \varepsilon$, $p' \approx \tfrac12 + \varepsilon(1 - b/2)$, so the slope of the map is $1 - b/2$, between 0 and 1: the equilibrium is stable ([[#exr-fds]]). Notice that the mean fitness, $\bar w = pw_A + qw_a = 1 - 2b(p - \tfrac12)^2$, is *maximal* at the equilibrium in this symmetric model, but with asymmetric frequency dependence the equilibrium need not be where $\bar w$ is greatest — selection equalises the fitnesses of the types, not the average.

## Selection in a changing environment

Fitnesses vary from year to year with weather, food and predators. Which type wins in the long run?

::: proposition Geometric-mean fitness {#prop-geometric}
In a haploid population, let types $A$ and $a$ have fitnesses $w_A(t)$ and $w_a(t)$ in generation $t$. Then after $T$ generations

$$
\frac{p_T}{q_T} = \frac{p_0}{q_0}\prod_{t=0}^{T-1}\frac{w_A(t)}{w_a(t)},
$$ {#eq-geometric}

so $A$ replaces $a$ in the long run if and only if the **geometric mean** of its fitness exceeds that of $a$, $\bigl(\prod_t w_A(t)\bigr)^{1/T} > \bigl(\prod_t w_a(t)\bigr)^{1/T}$, or equivalently if the average of $\ln w_A - \ln w_a$ is positive.
:::

::: proof
In each generation $p_{t+1}/q_{t+1} = (p_t/q_t)\,w_A(t)/w_a(t)$, because $\bar w$ cancels in the ratio. Multiply over $t$. The ratio grows without bound or shrinks to zero according to the sign of $\sum_t[\ln w_A(t) - \ln w_a(t)]$, i.e. according to which geometric mean is larger.
:::

Since the geometric mean is always less than the arithmetic mean, and more so the more fitness varies, **variance in fitness is costly**. A genotype that does very well in good years and badly in bad ones can lose to a steadier one with lower average success.

::: example A risky strategy loses {#ex-geometric}
In a habitat with good and bad years alternating, haploid type $A$ has fitness 1.5 in good years and 0.6 in bad years; type $a$ has fitness 1.0 in both. Which type wins? Starting from $p = 0.5$, what is the frequency of $A$ after 20 years?
::: solution
Arithmetic mean fitness of $A$: $(1.5 + 0.6)/2 = 1.05$, higher than that of $a$. But its geometric mean is $\sqrt{1.5\times0.6} = \sqrt{0.90} = 0.949 < 1$. By [[#eq-geometric]] each pair of years multiplies $p/q$ by $0.90$, so after 10 pairs $p/q = 0.9^{10} = 0.349$, and $p = 0.349/1.349 = 0.26$. Type $A$ is declining and will be lost. This is the logic of **bet hedging**: traits such as delayed germination of a fraction of seeds in annual desert plants reduce arithmetic-mean fitness but also its variance, and can raise geometric-mean fitness. In diploids, temporal variation can even maintain a polymorphism if heterozygotes have the highest geometric-mean fitness although they are never the fittest in any one year (J. B. S. Haldane and S. D. Jayakar, 1963).
:::
:::

::: quiz
Two genotypes of an annual plant have fitnesses over four years of $(2, 2, 0.25, 2)$ for genotype $X$ and $(1.2, 1.2, 1.2, 1.2)$ for $Y$. Which increases in frequency over the four years?
- [ ] $X$, because its average fitness (1.56) is higher.
- [x] $Y$, because its geometric-mean fitness is higher.
- [ ] Neither: with fluctuating selection frequencies return to where they started.
- [ ] It depends on the order of the years.
::: solution
The product for $X$ is $2\times2\times0.25\times2 = 2$, geometric mean $2^{1/4} = 1.19$. For $Y$ it is $1.2^4 = 2.07$, geometric mean $1.2$. Over four years the ratio $X/Y$ is multiplied by $2/2.07 = 0.96$, so $Y$ increases slightly, whatever the order of years (the product does not depend on order). One catastrophic year outweighs three good ones.
:::
:::

## Measuring selection

Selection coefficients of a few per cent are invisible in a single generation but measurable over many, or in controlled competition.

**From a time series.** In a haploid population, [[evolution/natural-selection]] showed that $\ln(p/q)$ increases by $\ln(1 + s) \approx s$ each generation. For a diploid with additive effects ($h = \tfrac12$), [[#eq-continuous]] gives $\frac{d}{dt}\ln\frac pq = \frac{1}{pq}\frac{dp}{dt} = \frac s2$, so the logit rises linearly with slope $s/2$. Regressing $\ln(p_t/q_t)$ on $t$ therefore estimates the selection coefficient.

::: example Estimating s from allele frequencies {#ex-logit}
An allele conferring insecticide resistance is monitored in a pest population, which has about one generation a month: generation 0, $p = 0.050$; generation 20, $0.108$; generation 40, $0.203$; generation 60, $0.372$. Estimate the selection coefficient, assuming additive effects on fitness.
::: solution
The logits $\ln(p/q)$ are $-2.944$, $-2.111$, $-1.368$ and $-0.524$. The least-squares slope ([[biostatistics/regression]]) of logit on generation is $0.0400$ per generation. With additive effects the slope is $s/2$, so $s \approx 0.080$: resistant homozygotes have about 8 % higher fitness than susceptible ones, and heterozygotes about 4 %. (If the organism were haploid, the slope would be $\ln(1 + s)$, giving $s = 0.041$.) Two cautions: sampling error in each $p$ should be included in a proper analysis (weighting each logit by its precision), and a straight line on the logit scale is itself a test of the model — a curving logit would indicate dominance or changing selection.
:::
:::

**Competition experiments.** In microbial evolution experiments, an evolved strain and its ancestor, distinguishable by a neutral marker, are grown together. If the populations of the two grow from $N_A(0)$ to $N_A(1)$ and from $N_B(0)$ to $N_B(1)$ during the competition, the relative fitness of $A$ is the ratio of their realised Malthusian parameters,

$$
w = \frac{\ln[N_A(1)/N_A(0)]}{\ln[N_B(1)/N_B(0)]},
$$ {#eq-lenski}

the measure used by Richard Lenski and colleagues (1991) in the long-term evolution experiment with *E. coli*.

::: example A competition assay {#ex-assay}
An evolved *E. coli* clone and its marked ancestor are mixed, each at $5\times10^6$ cells, and grown for one day. At the end there are $1.0\times10^9$ evolved and $5.0\times10^8$ ancestral cells. What is the relative fitness of the evolved clone?
::: solution
The evolved clone increased 200-fold, the ancestor 100-fold. By [[#eq-lenski]], $w = \ln 200/\ln 100 = 5.298/4.605 = 1.15$. The evolved clone has a 15 % higher growth rate over the competition. In the long-term experiment, fitness relative to the ancestor rose rapidly at first and then ever more slowly, yet without a clear plateau over tens of thousands of generations (Michael Wiser, Noah Ribeck and Lenski, 2013).
:::
:::

**In the wild**, selection is estimated from survival or reproductive success of marked individuals of known genotype, from changes in frequency across life stages, or from patterns of DNA variation left by past selection ([[population-genetics/linkage-disequilibrium]], [[population-genetics/neutral-theory]]). Selection on continuous traits is estimated by regression of fitness on phenotype ([[population-genetics/response-to-selection]]).

::: application Resistance management
Insecticides, herbicides, antibiotics and anticoagulants are selective agents, and the models of this chapter guide their use. Because the fitness of resistance alleles depends on the environment, resistance is usually costly where the agent is absent ($w_{RR} < w_{SS}$ there), and a mixture of treated and untreated habitats or periods generates exactly the spatially or temporally varying selection analysed above. Refuges of non-*Bt* crops rely on resistance to *Bt* toxins being recessive ($h \approx 0$), so that heterozygotes, which dominate while resistance is rare, are killed. Rotations and mixtures of drugs aim to make the geometric-mean fitness of every resistant genotype less than 1. Compensatory mutations that reduce the cost of resistance, observed repeatedly in bacteria, can make resistance persist after the agent is withdrawn.
:::

::: history
The first quantitative treatment of selection was a table of rates of change for dominant and recessive genes computed by the mathematician H. T. J. Norton and published in Reginald Punnett's *Mimicry in Butterflies* (1915). J. B. S. Haldane's series "A mathematical theory of natural and artificial selection" (ten parts, 1924–1934) derived most of the one-locus results of this chapter, including the times of sweeps for dominant and recessive alleles and an estimate of the selective advantage of the melanic peppered moth. R. A. Fisher's *The Genetical Theory of Natural Selection* (1930) introduced the fundamental theorem and the average effect; Sewall Wright's adaptive landscape appeared in 1932. The proof that one-locus mean fitness never decreases (1959) and Kingman's analysis of multi-allele equilibria (1961) completed the deterministic one-locus theory. Haldane and Jayakar's paper on fluctuating selection appeared in 1963, and George Price's covariance formulation (1970, 1972) clarified what Fisher's theorem says.
:::

::: summary
- Fitness combines viability, mating success and fecundity over a whole generation; only relative fitness determines changes in frequency ([[#def-fitness-components]]).
- An allele's marginal fitness $w_i = \sum_jp_jw_{ij}$ is the average fitness of its carriers; $\Delta p_i = p_i(w_i - \bar w)/\bar w$, and with two alleles $\Delta p = pq\alpha/\bar w$, with average excess $\alpha = w_1 - w_2$ ([[#prop-marginal]]).
- For weak selection, $dp/dt \approx spq[h + p(1-2h)]$; sweeps take about $(2/s)\ln\frac{p_1q_0}{p_0q_1}$ generations for additive alleles and much longer for recessive or dominant ones ([[#prop-sweep]]).
- The interior equilibrium exists only under over- or underdominance; it is stable under overdominance, unstable (a threshold) under underdominance. A rare allele invades if its heterozygote is fitter than the resident homozygote ([[#prop-stability]]).
- Mean fitness rises at the rate $V_A/\bar w$ (Fisher's theorem, [[#prop-fisher]]), but selection does not in general maximise $\bar w$ or act for the good of the population.
- Negative frequency dependence maintains polymorphism; in a fluctuating environment the type with the larger geometric-mean fitness wins ([[#prop-geometric]]).
- Selection is measured from logit time series (slope $s$ for haploids, $s/2$ for additive diploids) and from competition assays (ratio of Malthusian parameters).
:::

## Exercises

::: exercise Marginal fitnesses {level=1 check="0.027"}
Genotype fitnesses are $w_{11} = 1$, $w_{12} = 0.95$ and $w_{22} = 0.8$, and $p = 0.5$. Calculate $w_1$, $w_2$, $\bar w$ and $\Delta p$ (three decimal places).
::: solution
$w_1 = 0.5\times1 + 0.5\times0.95 = 0.975$; $w_2 = 0.5\times0.95 + 0.5\times0.8 = 0.875$; $\bar w = 0.5\times0.975 + 0.5\times0.875 = 0.925$. Then $\Delta p = pq(w_1 - w_2)/\bar w = 0.25\times0.1/0.925 = 0.027$. As a check, $\Delta p = p(w_1 - \bar w)/\bar w = 0.5\times0.05/0.925$ gives the same value.
:::
:::

::: exercise An overdominant equilibrium {level=1 check="0.25"}
Fitnesses are $w_{11} = 0.7$, $w_{12} = 1$ and $w_{22} = 0.9$. What is the equilibrium frequency of $A_1$?
::: solution
With $s = 0.3$ and $t = 0.1$, $\hat p = t/(s + t) = 0.1/0.4 = 0.25$. Check with [[#eq-interior]]: $(0.9 - 1)/(0.7 - 2 + 0.9) = -0.1/-0.4 = 0.25$.
:::
:::

::: exercise Relative fitness from competition {level=1 check="0.7"}
In a competition assay, a mutant grows from $10^6$ to $10^{8.1}$ cells while its competitor grows from $10^6$ to $10^{9}$. What is the relative fitness of the mutant?
::: solution
The mutant increased by a factor $10^{2.1}$ and the competitor by $10^{3}$. By [[#eq-lenski]], $w = \ln(10^{2.1})/\ln(10^{3}) = 2.1/3 = 0.7$ (the base of the logarithm cancels). The mutant grows 30 % more slowly — typical of a costly resistance mutation measured in the absence of the drug.
:::
:::

::: exercise A threshold {level=2 check="0.25"}
Fitnesses are $w_{11} = 1$, $w_{12} = 0.7$ and $w_{22} = 0.8$. Find the interior equilibrium, state whether it is stable, and predict the outcome starting from $p = 0.3$ and from $p = 0.2$.
::: solution
$\hat p = (0.8 - 0.7)/(1 - 1.4 + 0.8) = 0.1/0.4 = 0.25$. The heterozygote is least fit, so the equilibrium is unstable. From $p = 0.3$, $\alpha = 0.3\times0.3 + 0.7\times(-0.1) = 0.02 > 0$ and $A_1$ goes to fixation; from $p = 0.2$, $\alpha = 0.06 - 0.08 = -0.02 < 0$ and $A_1$ is lost.
:::
:::

::: exercise A recessive sweep {level=2 check="1026"}
A favoured recessive allele with $s = 0.1$ rises from $p = 0.01$ to $p = 0.5$. Use [[#eq-sweep]] to estimate the number of generations (nearest whole number).
::: solution
$L = \ln\frac{0.5\times0.99}{0.01\times0.5} = \ln 99 = 4.595$. Then $t \approx \frac{1}{0.1}(4.595 + 100 - 2) = 10\times102.595 = 1026$ generations. An additive allele with the same $s$ would take $(2/0.1)\times4.595 = 92$ generations. Nearly all the recessive's time is spent at low frequency.
:::
:::

::: exercise Bet hedging {level=2}
In a desert annual, a genotype that germinates all its seeds each year has fitness 3 in wet years and 0.1 in dry years; one that keeps half its seeds dormant has fitness 1.6 in wet years and 0.6 in dry years. Wet and dry years are equally frequent. Which genotype wins in the long run? Which has the higher arithmetic-mean fitness?
::: solution
Arithmetic means: $(3 + 0.1)/2 = 1.55$ against $(1.6 + 0.6)/2 = 1.1$, so the all-germinating genotype has the higher average. Geometric means: $\sqrt{0.3} = 0.548$ against $\sqrt{0.96} = 0.980$. By [[#prop-geometric]] the dormant genotype wins, since the ratio of the two types changes by a factor $0.3/0.96 = 0.31$ per pair of years in its favour. (Both geometric means are below 1, so in this illustration the population would also decline; real populations are regulated by density, which changes absolute but not the comparison of relative fitnesses here.)
:::
:::

::: exercise Reading a logit plot {level=2}
The frequency of a melanic form of a moth, controlled by a dominant allele, is recorded over 50 years in a polluted region. Its logit $\ln(p/q)$ rises steeply at first and then levels off, although the melanic form continues to survive better than the pale form. (a) Is this consistent with constant selection? (b) Explain using [[#eq-sweep]] or [[#eq-continuous]].
::: solution
(a) Yes. The plotted quantity is the logit of the *phenotype* frequency or of the allele frequency; for a dominant allele, constant selection does not give a straight logit line.

(b) For $h = 1$, $\frac{d}{dt}\ln\frac pq = \frac{1}{pq}\frac{dp}{dt} = sq$. When the dominant allele is rare, $q \approx 1$ and the logit rises at rate $s$; as it becomes common, $q \to 0$ and the slope falls to zero. Selection is unchanged, but it acts only on the shrinking number of $aa$ homozygotes, the only individuals whose phenotype differs. A straight logit line is expected only for haploids or additive alleles.
:::
:::

::: exercise Fisher's theorem checked {level=3}
Take additive fitnesses $w_{11} = 1.2$, $w_{12} = 1.1$, $w_{22} = 1.0$ and $p = 0.3$. (a) Compute $\bar w$, $\alpha$, $\Delta p$ and $V_A$. (b) Compute the new mean fitness directly and compare $\Delta\bar w$ with $V_A/\bar w$. (c) Repeat the comparison for the overdominant fitnesses $w_{11} = 0.9$, $w_{12} = 1$, $w_{22} = 0.8$ at $p = 0.3$, and explain the small discrepancy.
::: solution
(a) $\bar w = 0.09\times1.2 + 0.42\times1.1 + 0.49 = 1.06$ (equivalently $1 + 0.2p$). $w_1 = 0.3\times1.2 + 0.7\times1.1 = 1.13$, $w_2 = 0.3\times1.1 + 0.7 = 1.03$, $\alpha = 0.10$. $\Delta p = 0.21\times0.1/1.06 = 0.01981$. $V_A = 2\times0.21\times0.01 = 0.0042$.

(b) $\bar w' = 1 + 0.2\times0.31981 = 1.063962$, so $\Delta\bar w = 0.003962$, and $V_A/\bar w = 0.0042/1.06 = 0.003962$: identical, as [[#prop-fisher]] says for additive fitness.

(c) $\bar w = 0.09\times0.9 + 0.42 + 0.49\times0.8 = 0.893$. $\alpha = 0.3(0.9 - 1) + 0.7(1 - 0.8) = 0.11$. $\Delta p = 0.21\times0.11/0.893 = 0.025868$. $V_A/\bar w = 2\times0.21\times0.0121/0.893 = 0.005691$. With $p' = 0.325868$, $\bar w' = 0.106190\times0.9 + 2\times0.325868\times0.674132 + 0.454454\times0.8 = 0.095571 + 0.439357 + 0.363563 = 0.898491$, so $\Delta\bar w = 0.005491$. The direct change is slightly smaller, because $\bar w$ is concave here ($\bar w'' = 2(w_{11} - 2w_{12} + w_{22}) = -0.6$) and the second-order term $\tfrac12\bar w''(\Delta p)^2 = -0.0002$ accounts for the difference.
:::
:::

::: exercise Frequency-dependent selection {#exr-fds level=3}
In the haploid model with $w_A = 1 + b(\tfrac12 - p)$ and $w_a = 1 - b(\tfrac12 - p)$, $0 < b \le 2$: (a) show that $\bar w = 1 - 2b(p - \tfrac12)^2$; (b) show that the map $p' = pw_A/\bar w$ has slope $1 - b/2$ at $p = \tfrac12$, and hence that the equilibrium is stable; (c) for $b = 1$, starting from $p = 0.9$, compute $p'$.
::: solution
(a) With $u = \tfrac12 - p$, $\bar w = p(1 + bu) + (1 - p)(1 - bu) = 1 + bu(2p - 1) = 1 - 2bu^2$.

(b) Let $p = \tfrac12 + \varepsilon$, so $u = -\varepsilon$. Then $p' = (\tfrac12 + \varepsilon)(1 - b\varepsilon)/(1 - 2b\varepsilon^2) = \tfrac12 + \varepsilon - \tfrac12 b\varepsilon + O(\varepsilon^2)$. The slope is $1 - b/2$, which lies in $[0, 1)$ for $0 < b \le 2$, so deviations shrink: the equilibrium is stable, and approached without oscillation.

(c) $u = -0.4$, $w_A = 0.6$, $w_a = 1.4$, $\bar w = 0.9\times0.6 + 0.1\times1.4 = 0.68$, $p' = 0.54/0.68 = 0.794$. The common type loses ground quickly.
:::
:::
