Why do four offspring of two heterozygous parents sometimes include no recessive individuals at all, when Mendel's ratio says one in four should be? Why did Bortkiewicz's horse-kick deaths follow such a regular pattern, when each death was an accident? Why are so many biological measurements shaped like a bell? The answers all come from probability, the mathematics of chance. Probability is the language in which a statistical model says what data *would* look like if a hypothesis were true, and so it underlies every estimate and every test in this course.

This chapter introduces the rules of probability as they are used in biology, the idea of a random variable and its distribution, and the three distributions that turn up everywhere: the **binomial** for counts of successes among a fixed number of trials, the **Poisson** for counts of rare independent events, and the **normal** for measurements that are sums of many small effects. The formal theory, with proofs, is in Maths Atlas: [probability spaces](/learn/maths/lesson.php?c=probability&l=probability-spaces), [discrete random variables](/learn/maths/lesson.php?c=probability&l=discrete-random-variables), [continuous random variables](/learn/maths/lesson.php?c=probability&l=continuous-random-variables) and [limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems).

## The rules of probability {#rules}

We think of an observation — the genotype of a zygote, the number of eggs in a nest, the mass of a mouse — as the outcome of a **random experiment**, a process whose result cannot be predicted exactly but whose possible results, and their tendencies, can be described. An **event** is a set of outcomes: "the offspring has the recessive phenotype", "the clutch has more than five eggs".

::: definition Probability and its rules {#def-probability}
A **probability** assigns to each event $A$ a number $\Prob(A)$ between 0 and 1, such that the certain event has probability 1 and, for events that cannot both happen (**mutually exclusive** events), probabilities add:

$$
\Prob(A \text{ or } B) = \Prob(A) + \Prob(B) \quad \text{if } A \text{ and } B \text{ are mutually exclusive.}
$$

From these follow the **complement rule** $\Prob(\text{not } A) = 1 - \Prob(A)$ and the **general addition rule** $\Prob(A \text{ or } B) = \Prob(A) + \Prob(B) - \Prob(A \text{ and } B)$.

The **conditional probability** of $A$ given $B$ (with $\Prob(B) > 0$) is
$$
\Prob(A \mid B) = \frac{\Prob(A \text{ and } B)}{\Prob(B)},
$$
so that $\Prob(A \text{ and } B) = \Prob(A \mid B)\,\Prob(B)$ (the **multiplication rule**). Events $A$ and $B$ are **independent** if $\Prob(A \mid B) = \Prob(A)$, equivalently $\Prob(A \text{ and } B) = \Prob(A)\Prob(B)$.
:::

Probabilities can be read as long-run relative frequencies — the fraction of offspring with the recessive phenotype in a very large cross — or as degrees of belief. The rules are the same; the frequency reading is the one used by the classical methods in most of this course, and the Bayesian reading is developed in [Maths Atlas: Bayesian inference](/learn/maths/lesson.php?c=statistics&l=bayesian).

Mendelian genetics is a laboratory of probability. In a cross *Aa* × *Aa*, each parent transmits *A* or *a* with probability ½, independently of the other parent (Mendel's first law, [[genetics/mendelian-inheritance]]). By the multiplication rule each of the four combinations has probability ¼; by the addition rule the probability of a heterozygote, *Aa* or *aA*, is ½, and that of the dominant phenotype (*AA* or *Aa*) is ¾.

::: example A conditional probability in a family {#ex-carrier}
Two unaffected parents have a child with a recessive condition, so both parents must be heterozygous *Aa*. Their second child is unaffected. What is the probability that this second child is a carrier (*Aa*)?
::: solution
Before we know the phenotype, the child is *AA* with probability ¼, *Aa* with ½ and *aa* with ¼. Being told the child is unaffected rules out *aa*, so we condition on the event "*AA* or *Aa*", of probability ¾:
$$
\Prob(Aa \mid \text{unaffected}) = \frac{\Prob(Aa)}{\Prob(\text{unaffected})} = \frac{1/2}{3/4} = \frac23.
$$
The answer is not ½: knowing the phenotype changes the probabilities of the genotypes. This is the simplest example of the reasoning used in pedigree analysis. (Genetic counselling of real families belongs to [Medicine Atlas: genetics](/learn/medicine/course.php?c=genetics).)
:::
:::

::: warning "Independent means mutually exclusive"
Two events that are mutually exclusive cannot both happen, so if one happens the other certainly does not — they are as *dependent* as events can be. Independence means that knowing one happened tells you nothing about the other. Two loci on different chromosomes assort independently; the events "this gamete carries *A*" and "this gamete carries *a*" at the same locus are mutually exclusive. Multiply probabilities of independent events; add probabilities of mutually exclusive ones.
:::

A useful consequence of the complement rule: the probability that something happens *at least once* in $n$ independent tries, each with probability $p$, is $1 - (1 - p)^n$. If each of 1000 independent loci has a 0.1 % chance of an error, the chance of at least one error is $1 - 0.999^{1000} = 0.632$, not 1. The same arithmetic, applied to statistical tests, is the multiple-testing problem of [[biostatistics/hypothesis-testing]].

## Random variables and their distributions {#random-variables}

::: definition Random variable, distribution, mean and variance {#def-random-variable}
A **random variable** $X$ is a numerical quantity determined by the outcome of a random experiment. Its **probability distribution** says how probability is spread over its values:

- for a **discrete** random variable, by the probability mass function $\Prob(X = k)$;
- for a **continuous** random variable, by a probability density $f(x)$, with $\Prob(a \le X \le b) = \int_a^b f(x)\,dx$.

The **expected value** (mean) is $\mu = \E[X] = \sum_k k\,\Prob(X = k)$ or $\int x f(x)\,dx$, and the **variance** is $\sigma^2 = \Var(X) = \E[(X - \mu)^2]$; $\sigma$ is the standard deviation. The **cumulative distribution function** is $F(x) = \Prob(X \le x)$.
:::

These are the population counterparts of the sample mean, variance and histogram of [[biostatistics/data-and-variation]]: a histogram of a large sample approximates the probability distribution, and $\bar x$ and $s^2$ approximate $\mu$ and $\sigma^2$. Two rules for means and variances are used constantly: for constants $a$, $b$, $\E[a + bX] = a + b\E[X]$ and $\Var(a + bX) = b^2\Var(X)$; and for any random variables $\E[X + Y] = \E[X] + \E[Y]$, while for *independent* ones $\Var(X + Y) = \Var(X) + \Var(Y)$. Variances of independent quantities add; standard deviations do not.

## The binomial distribution {#binomial}

Many biological counts are the number of "successes" among a fixed number of independent trials: female offspring in a litter, seeds that germinate out of 50 sown, recessive phenotypes among the offspring of a cross, infected hosts in a sample.

::: definition The binomial distribution {#def-binomial}
Suppose there are $n$ independent trials, each a success with the same probability $p$. The number of successes $X$ has the **binomial distribution** $\Bin(n, p)$:
$$
\Prob(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad k = 0, 1, \dots, n,
$$ {#eq-binomial}
where $\binom nk = \dfrac{n!}{k!\,(n-k)!}$ is the number of ways of choosing which $k$ of the $n$ trials are the successes.
:::

The formula has two parts: $p^k(1-p)^{n-k}$ is the probability of any *particular* sequence with $k$ successes (by the multiplication rule for independent trials), and $\binom nk$ counts the sequences (by the addition rule). The assumptions matter as much as the formula: a fixed $n$, independence, and the same $p$ for every trial. Offspring of one mother may share a uterine environment; seeds from one plant may share a genotype; hosts in one pond may share an infection source. Each violates independence or constant $p$ and usually makes the counts more variable than binomial — **overdispersion**, to which we return in [[biostatistics/linear-models]].

::: proposition Mean and variance of the binomial {#prop-binomial-moments}
If $X \sim \Bin(n, p)$ then $\E[X] = np$ and $\Var(X) = np(1-p)$. The proportion of successes $\hat p = X/n$ therefore has mean $p$ and variance $p(1-p)/n$.
:::

::: proof
Write $X = Y_1 + \dots + Y_n$, where $Y_i = 1$ if trial $i$ is a success and 0 otherwise. Each $Y_i$ has mean $\E[Y_i] = 1\cdot p + 0\cdot(1-p) = p$ and, since $Y_i^2 = Y_i$, variance $\E[Y_i^2] - p^2 = p - p^2 = p(1-p)$. Means add, and because the trials are independent so do variances, giving $np$ and $np(1-p)$. Dividing $X$ by $n$ divides the mean by $n$ and the variance by $n^2$.
:::

::: example Recessive offspring in a family of ten {#ex-binomial}
A cross *Aa* × *Aa* produces ten offspring. Find the distribution of the number $X$ with the recessive phenotype, its mean and standard deviation, and the probabilities that (a) none and (b) five or more are recessive.
::: solution
$X \sim \Bin(10, \tfrac14)$. From [[#eq-binomial]], the probabilities for $k = 0, 1, \dots, 6$ are

| $k$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| $\Prob(X = k)$ | 0.0563 | 0.1877 | 0.2816 | 0.2503 | 0.1460 | 0.0584 | 0.0162 |

and the remaining values sum to 0.0035. The mean is $np = 2.5$ and the standard deviation $\sqrt{10\times0.25\times0.75} = 1.37$.

(a) $\Prob(X = 0) = 0.75^{10} = 0.0563$: about one family in eighteen of this size shows no recessive offspring at all.

(b) $\Prob(X \ge 5) = 0.0584 + 0.0162 + 0.0035 = 0.0781$.

Exactly 2.5 recessives is impossible, and even the most likely count, 2, happens less than 30 % of the time. Small families deviate from Mendelian ratios as a matter of course; that is why Mendel counted thousands of seeds, and why [[biostatistics/categorical-data]] tests whether a deviation is larger than chance would produce.
:::
:::

::: widget distribution
dist: binomial
params: n=10, p=0.25
a: 5
b: 10
normal: true
caption: The binomial distribution of [[#ex-binomial]]: the number of recessive offspring among $n = 10$ from *Aa* × *Aa*. The shaded bars are $\Prob(5 \le X \le 10) \approx 0.078$, and the curve is the normal approximation with the same mean and standard deviation. With $n = 10$ and $p = 0.25$ the bars are visibly skewed and the curve fits poorly. Increase $n$ to 50 or 100 and watch the bars become symmetric and the normal curve fit; move $p$ towards 0.5 and the fit improves faster.
:::

## The Poisson distribution {#poisson}

Some counts have no fixed number of trials: the number of mutations in a gene in one generation, of seedlings in a quadrat, of photons arriving at a photoreceptor in a millisecond, of horse-kick deaths in a corps in a year. There are many opportunities for the event, each with a tiny probability.

::: definition The Poisson distribution {#def-poisson}
A count $X$ has the **Poisson distribution** with mean $\lambda > 0$ if
$$
\Prob(X = k) = \frac{e^{-\lambda}\lambda^k}{k!}, \qquad k = 0, 1, 2, \dots
$$ {#eq-poisson}
Its mean and its variance are both equal to $\lambda$. It describes events that occur independently of one another at a constant average rate in time or space, so that $\lambda$ is the rate multiplied by the length of time, area or volume observed.
:::

::: proposition The Poisson limit of the binomial {#prop-poisson-limit}
If $X \sim \Bin(n, p)$ with $n \to \infty$ and $p \to 0$ in such a way that $np = \lambda$ stays fixed, then $\Prob(X = k) \to e^{-\lambda}\lambda^k/k!$ for each $k$.
:::

::: proof
With $p = \lambda/n$,
$$
\binom nk p^k(1-p)^{n-k} = \frac{n(n-1)\cdots(n-k+1)}{n^k}\cdot\frac{\lambda^k}{k!}\cdot\left(1 - \frac\lambda n\right)^n\left(1 - \frac\lambda n\right)^{-k}.
$$
As $n \to \infty$ with $k$ fixed, the first factor tends to 1, the third to $e^{-\lambda}$ and the fourth to 1.
:::

The Poisson distribution is therefore the law of rare events. Because its variance equals its mean, the ratio $s^2/\bar x$ — the **index of dispersion** — is a quick diagnostic of spatial or temporal pattern. A ratio near 1 is consistent with random (Poisson) occurrence; a ratio well above 1 indicates **clumping** (individuals aggregated, as parasites on hosts or aphids on plants); a ratio well below 1 indicates **regularity** (as territorial birds spaced out, or seedlings competing).

::: example Horse kicks and the Poisson distribution {#ex-horse-poisson}
Bortkiewicz's 200 corps-years ([[biostatistics/data-and-variation#ex-horse-kicks]]) had a mean of 0.61 deaths. Calculate the expected frequencies under a Poisson distribution with $\lambda = 0.61$ and compare them with the observed 109, 65, 22, 3, 1.
::: solution
$e^{-0.61} = 0.5434$. Multiplying [[#eq-poisson]] by 200:

| deaths $k$ | 0 | 1 | 2 | 3 | 4 or more |
|---|---|---|---|---|---|
| observed | 109 | 65 | 22 | 3 | 1 |
| expected $200\,e^{-0.61}0.61^k/k!$ | 108.67 | 66.29 | 20.22 | 4.11 | 0.71 |

(The last column is $200$ minus the sum of the others, so that it includes all $k \ge 4$.) The agreement is remarkably close, and the variance, 0.611, is almost exactly the mean. A formal goodness-of-fit test is in [[biostatistics/categorical-data]]. The fit does not mean that horses kick according to a law; it means that each death was a rare event, independent of the others, occurring at a roughly constant rate across corps and years — the conditions under which the Poisson distribution arises.
:::
:::

::: application The fluctuation test: Poisson reasoning about mutation
In 1943 Salvador Luria and Max Delbrück asked whether bacteriophage-resistant mutants of *Escherichia coli* arise in response to exposure to the phage, or spontaneously before it. If resistance were induced on exposure, each bacterium plated with phage would have the same small chance of becoming resistant, and the numbers of resistant colonies on plates from parallel cultures would be Poisson, with variance about equal to the mean. If mutations happened at random during the growth of each culture, a mutation early in one culture would leave a large clone of resistant descendants — a "jackpot" — and the counts would vary far more than Poisson. Luria and Delbrück found variances many times the mean, the signature of spontaneous mutation. The comparison of a variance with a mean, which this chapter makes routine, earned a share of the 1969 Nobel Prize in Physiology or Medicine and founded bacterial genetics.
:::

## The normal distribution {#normal}

::: definition The normal distribution {#def-normal}
A continuous random variable $X$ has the **normal** (Gaussian) distribution $\Normal(\mu, \sigma^2)$ if its density is
$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x - \mu)^2}{2\sigma^2}\right), \qquad -\infty < x < \infty.
$$ {#eq-normal}
Its mean is $\mu$ and its standard deviation $\sigma$. The **standard normal** distribution is $\Normal(0, 1)$; its cumulative distribution function is written $\Phi(z)$.
:::

The curve is symmetric about $\mu$ and bell-shaped, with points of inflection at $\mu \pm \sigma$. Whatever the values of $\mu$ and $\sigma$, the probability within a given number of standard deviations of the mean is the same: about 68.3 % within one, 95.4 % within two and 99.7 % within three. More exactly, 95 % lies within $\pm1.960\sigma$ — the number behind most 95 % intervals in this course.

::: proposition Standardisation and sums of normal variables {#prop-normal}
If $X \sim \Normal(\mu, \sigma^2)$ then $Z = (X - \mu)/\sigma \sim \Normal(0, 1)$, so $\Prob(X \le x) = \Phi\big((x - \mu)/\sigma\big)$. If $X_1$ and $X_2$ are independent and normal, then $a X_1 + b X_2$ is normal, with mean $a\mu_1 + b\mu_2$ and variance $a^2\sigma_1^2 + b^2\sigma_2^2$. In particular the mean of $n$ independent $\Normal(\mu, \sigma^2)$ observations is exactly $\Normal(\mu, \sigma^2/n)$.
:::

The proof of the closure of the normal family under sums is in [Maths Atlas: joint distributions](/learn/maths/lesson.php?c=probability&l=joint-distributions); the means and variances follow from the rules above. The quantity $z = (x - \mu)/\sigma$ is a **z-score**: the number of standard deviations an observation lies from the mean.

::: example Sepal length in *Iris setosa* {#ex-normal}
Sepal length in Anderson's sample of 50 *Iris setosa* flowers has mean 5.006 cm and standard deviation 0.352 cm, and its distribution is roughly normal. Treating these as the population values, (a) what proportion of flowers have sepals longer than 5.5 cm, and (b) between which lengths do the central 95 % of flowers lie?
::: solution
(a) $z = (5.5 - 5.006)/0.3525 = 1.401$, and $\Prob(Z > 1.401) = 1 - \Phi(1.401) = 0.081$: about 8 % of flowers. In the actual sample, 3 of 50 (6 %) have sepals longer than 5.5 cm, consistent with this given the sampling variation in a sample of 50.

(b) $5.006 \pm 1.960\times0.3525 = 4.32$ to $5.70$ cm. This is a reference range for individual flowers — a statement about the spread of the population, not about the precision of the mean (contrast [[biostatistics/estimation]]).
:::
:::

### Why so many traits are normal

The normal distribution is not a law of nature, but it arises whenever a quantity is the sum of many small, independent contributions. This is the **central limit theorem**, made precise in [[biostatistics/estimation]] and proved in [Maths Atlas: limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems). Galton built a machine to demonstrate it: balls falling through rows of pins, each deflected left or right at random, pile up in a bell shape.

::: widget galton
caption: Galton's board. Each ball is deflected left or right at random at every row of pins, so its final bin is the number of rightward deflections — a binomial count. As balls accumulate, the histogram approaches the normal curve. This is the model behind Ronald Fisher's 1918 explanation of continuous variation: a trait influenced by many genes of small, additive effect (plus environmental effects) is a sum of many small contributions, and is therefore close to normal.
:::

Fisher's 1918 paper "The correlation between relatives on the supposition of Mendelian inheritance" reconciled Mendel's discrete genes with the continuous, bell-shaped variation that Galton and Pearson had measured: many loci, each segregating in Mendelian fashion, add up to a normal distribution of phenotypes. When the small effects *multiply* rather than add — as growth rates compound over time — it is the logarithm of the trait that is a sum, and the trait is log-normal ([[biostatistics/data-and-variation#transformations]]).

### The normal approximation to the binomial

For large $n$, a binomial count is a sum of many independent 0–1 variables, so by the central limit theorem it is approximately normal with mean $np$ and variance $np(1-p)$. A common rule of thumb asks that $np$ and $n(1-p)$ both be at least 5 or 10. Because the binomial is discrete, the approximation is improved by a **continuity correction**: $\Prob(X \le k)$ is approximated by $\Phi\big((k + 0.5 - np)/\sqrt{np(1-p)}\big)$.

::: example Mendel's round and wrinkled seeds {#ex-mendel-normal}
Among 7324 seeds from his monohybrid crosses, Mendel counted 5474 round and 1850 wrinkled. Under a 3 : 1 ratio, how many round seeds are expected, with what standard deviation, and how unusual is the observed count?
::: solution
$X \sim \Bin(7324, \tfrac34)$, with mean $7324\times0.75 = 5493$ and standard deviation $\sqrt{7324\times0.75\times0.25} = 37.06$. The observed count lies $(5474 - 5493)/37.06 = -0.51$ standard deviations from expectation, a very ordinary deviation: about 61 % of samples would deviate at least this much in one direction or the other. The 3 : 1 ratio fits. (Whether Mendel's data as a whole fit *too* well is a famous question raised by Fisher in 1936; see [[biostatistics/categorical-data]].)
:::
:::

::: quiz
Quadrat counts of a plant in a meadow have mean 4.2 per quadrat and variance 12.8. What does this suggest?
- [ ] The plants are randomly distributed, because the counts are discrete.
- [x] The plants are clumped: the variance is about three times the mean, more than a Poisson distribution would give.
- [ ] The plants are regularly spaced, because the variance exceeds the mean.
- [ ] Nothing, because the mean and the variance are measured in different units.
::: solution
For a Poisson (random) pattern the variance equals the mean; here $s^2/\bar x = 12.8/4.2 = 3.0$. Excess variance means that some quadrats have many plants and others few — aggregation, perhaps from seed dispersal close to parents or from patchy soil. Regular spacing would give a ratio below 1. (Whether 3.0 is significantly larger than 1 depends on the number of quadrats; the statistic $(n-1)s^2/\bar x$ is approximately χ² with $n - 1$ degrees of freedom under the Poisson hypothesis.)
:::
:::

### Checking normality

Many methods in later chapters assume that data, or the residuals from a model, are roughly normal. The best check is graphical. A **normal quantile–quantile (Q–Q) plot** plots the ordered observations against the quantiles that a normal distribution would predict for a sample of the same size. Normal data fall close to a straight line; right skew bends the upper end upwards; heavy tails make an S shape; outliers stand off the line at the ends. Formal tests of normality (Shapiro–Wilk, 1965, is the most used) are of limited help: with small samples they rarely detect anything, and with large samples they detect trivial departures that do not matter. Fortunately, as [[biostatistics/estimation]] shows, the methods for means are robust to moderate non-normality when samples are not tiny.

::: warning "Biological data are normally distributed"
Many are not: counts, proportions, survival times, concentrations, abundances and anything with a hard lower bound of zero and a large spread tend to be skewed, and mixtures of groups can be bimodal. The normal distribution is a model to be checked, not an assumption to be made by default. What is often approximately normal is a *mean* of many observations, whatever the shape of the underlying distribution — which is a different statement.
:::

## Other distributions worth knowing {#others}

A few other distributions appear in biology often enough to recognise:

- The **geometric** distribution counts trials until the first success, and the **exponential** distribution is its continuous analogue: the waiting time between events in a Poisson process, such as the time until a radioactive decay, a channel opening ([[cell-biology/membrane-transport]]) or a mutation. It is memoryless: the chance of an event in the next second does not depend on how long one has waited.
- The **negative binomial** distribution is the standard model for overdispersed counts, such as parasite loads or RNA-sequencing read counts, whose variance $\mu + \mu^2/k$ exceeds the mean.
- The **hypergeometric** distribution counts successes in a sample drawn without replacement from a finite population. It underlies Fisher's exact test ([[biostatistics/categorical-data]]) and the gene-set enrichment tests of genomics.
- The **t**, **χ²** and **F** distributions are distributions of *statistics* computed from normal samples rather than models for raw data; they appear in [[biostatistics/estimation]], [[biostatistics/categorical-data]] and [[biostatistics/comparing-groups]].

::: history
Probability began with games of chance: Blaise Pascal and Pierre de Fermat corresponded about gambling problems in 1654, and Jacob Bernoulli's *Ars Conjectandi* (1713) proved the first law of large numbers for what we now call binomial trials. Abraham de Moivre found the normal curve as an approximation to the binomial in 1733; Pierre-Simon Laplace and Carl Friedrich Gauss developed it around 1810 as the law of errors of astronomical measurement. Siméon-Denis Poisson derived his distribution as a limit of the binomial in 1837, and Ladislaus von Bortkiewicz's *Das Gesetz der kleinen Zahlen* (*The Law of Small Numbers*, 1898) made it famous with the horse-kick data. Gregor Mendel's 1866 paper on *Pisum sativum* was, among other things, the first use of probability to explain heredity. Galton described his quincunx in *Natural Inheritance* (1889). Fisher's 1918 paper united Mendelian inheritance with the normal distribution of continuous traits, and Luria and Delbrück's fluctuation test of 1943 used the variance of counts to show that mutations arise spontaneously.
:::

::: summary
- Add probabilities of mutually exclusive events; multiply probabilities of independent events; $\Prob(A \mid B) = \Prob(A \text{ and } B)/\Prob(B)$. The chance of at least one event in $n$ independent tries is $1 - (1-p)^n$.
- A random variable has a distribution with mean $\mu$ and variance $\sigma^2$; means always add, variances add for independent variables.
- Binomial $\Bin(n, p)$: successes in $n$ independent trials with constant $p$; mean $np$, variance $np(1-p)$.
- Poisson: rare independent events at a constant rate; mean = variance = $\lambda$. The index of dispersion $s^2/\bar x$ diagnoses clumping (> 1) or regularity (< 1).
- Normal $\Normal(\mu, \sigma^2)$: sums of many small independent effects; 95 % within $\mu \pm 1.96\sigma$; standardise with $z = (x - \mu)/\sigma$.
- Large binomial counts are approximately normal (with a continuity correction); multiplicative effects give log-normal traits.
- Check distributional assumptions with plots, especially Q–Q plots, rather than assuming them.
:::

## Exercises

::: exercise Four dominant offspring {level=1 check="0.316"}
What is the probability that all four offspring of a cross *Aa* × *Aa* show the dominant phenotype? Give three decimal places.
::: solution
Each offspring independently has the dominant phenotype with probability ¾, so the probability is $(3/4)^4 = 81/256 = 0.316$.
:::
:::

::: exercise An empty quadrat {level=1 check="0.135"}
Seedlings are scattered at random with an average of 2 per quadrat. What is the probability that a quadrat contains none? Give three decimal places.
::: solution
Poisson with $\lambda = 2$: $\Prob(X = 0) = e^{-2} = 0.135$.
:::
:::

::: exercise Exactly two recessives {level=1 check="0.264"}
In five offspring of *Aa* × *Aa*, what is the probability that exactly two have the recessive phenotype? Give three decimal places.
::: solution
$\binom52(0.25)^2(0.75)^3 = 10\times0.0625\times0.4219 = 0.264$.
:::
:::

::: exercise A z-score {level=2 check="0.0228"}
The body mass of adult males of a vole species is approximately normal with mean 42 g and standard deviation 5 g. What proportion weigh more than 52 g? Give four decimal places.
::: solution
$z = (52 - 42)/5 = 2.0$, and $1 - \Phi(2.0) = 0.0228$: about 2.3 %.
:::
:::

::: exercise Germination {level=2}
A seed company states that 80 % of its seeds germinate. You sow 20 and 12 germinate. (a) What are the mean and standard deviation of the number germinating if the claim is true? (b) Calculate $\Prob(X \le 12)$ exactly from the binomial distribution. (c) What assumption of the binomial might fail in a seed tray, and in which direction would it change your conclusion?
::: answer
(a) 16 and 1.79; (b) 0.0321.
:::
::: solution
(a) $np = 16$, $\sqrt{20\times0.8\times0.2} = 1.789$.
(b) Summing [[#eq-binomial]] for $k = 0$ to 12 with $n = 20$, $p = 0.8$ gives 0.0321. Only about 3 % of trays of 20 would do this badly if the claim were true, so the result casts doubt on it.
(c) Independence: seeds in the same tray share water, temperature and possibly fungal infection, so their fates are correlated. That makes counts more variable than binomial, so 12 would be less surprising than (b) suggests. The fair test would use several trays and analyse the variation between trays.
:::
:::

::: exercise A normal approximation with a continuity correction {level=2}
In a cross expected to give ¼ recessive offspring, 100 offspring include 18 recessives. Calculate $\Prob(X \le 18)$ (a) exactly, (b) by the normal approximation with continuity correction and (c) without it.
::: answer
(a) 0.0630; (b) 0.0667; (c) 0.0530.
:::
::: solution
$X \sim \Bin(100, 0.25)$, mean 25, variance 18.75, SD 4.330.
(a) Summing the binomial probabilities from 0 to 18 gives 0.0630.
(b) $\Phi\big((18.5 - 25)/4.330\big) = \Phi(-1.501) = 0.0667$.
(c) $\Phi\big((18 - 25)/4.330\big) = \Phi(-1.617) = 0.0530$.
The corrected approximation is much closer to the exact value. With software the exact binomial is as easy to compute and should be preferred.
:::
:::

::: exercise Recessive carriers among siblings {level=3 check="4/9"}
Extend [[#ex-carrier]]: two heterozygous parents have two unaffected children. Assuming independence between children, what is the probability that both are carriers? Then interpret the following claim: "since each unaffected child has a 2/3 chance of being a carrier, the probability that at least one of them is a carrier is 4/3."
::: solution
Each unaffected child is a carrier with probability $2/3$, independently, so both are carriers with probability $(2/3)^2 = 4/9$. The claim adds probabilities of events that are not mutually exclusive, which can give nonsense like 4/3. Correctly, $\Prob(\text{at least one}) = 1 - \Prob(\text{neither}) = 1 - (1/3)^2 = 8/9$, or by the general addition rule $2/3 + 2/3 - 4/9 = 8/9$.
:::
:::

::: exercise Jackpots in a fluctuation test {level=3}
Twenty parallel cultures of a bacterium are plated on a selective medium, giving the following numbers of resistant colonies: 0, 0, 0, 1, 0, 0, 2, 0, 0, 47, 0, 1, 0, 0, 0, 3, 0, 0, 12, 0 (hypothetical counts in the style of Luria and Delbrück). (a) Calculate the mean and the variance. (b) What would the variance be if the counts were Poisson? (c) Explain what the result implies about when the resistance mutations occurred, and why the number of cultures with zero resistant colonies is nevertheless useful.
::: solution
(a) The counts sum to 66, so $\bar x = 3.30$. $\sum x^2 = 1 + 4 + 2209 + 1 + 9 + 144 = 2368$, so $s^2 = (2368 - 20\times3.3^2)/19 = (2368 - 217.8)/19 = 113.2$.
(b) Under a Poisson model the variance would be about equal to the mean, 3.3. The observed variance is about 34 times larger.
(c) The huge excess variance comes from two "jackpot" cultures (47 and 12), the descendants of mutations that happened early in their growth. If resistance were induced on plating, every cell would have the same small chance and the counts would be Poisson. The data instead fit mutations occurring spontaneously, at random times during growth, before selection. The zero class is useful because a culture has no resistant colonies only if no mutation occurred at all during its growth; under a Poisson model for the number of mutation *events*, $\Prob(0) = e^{-m}$, so the fraction of zero cultures, 14/20, estimates the mean number of mutations per culture as $m = -\ln(0.70) = 0.36$ — the "$p_0$ method" of Luria and Delbrück.
:::
:::
