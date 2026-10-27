Children resemble their parents, but not exactly, and brothers and sisters differ from one another. Before 1900 most naturalists explained this by **blending inheritance**: the hereditary material of the two parents was supposed to mix like two colours of paint, so that the offspring were intermediate. Blending has a fatal flaw. If it were true, variation would halve in every generation, a population would become uniform within a few generations, and a trait that disappeared in a child could never reappear in a grandchild. Yet traits do skip generations, and populations stay variable.

The answer was found in the 1850s and 1860s by Gregor Mendel, an Augustinian friar in Brno, by crossing garden peas and — this was the novelty — *counting* the offspring of each kind. From the ratios he inferred that heredity is carried by discrete particles that come in pairs, separate cleanly when gametes form and are reunited at random at fertilisation. This chapter develops Mendel's two laws, the vocabulary of modern genetics, the probability that makes the laws predictive, and the χ² test that tells us whether counted offspring agree with a predicted ratio. Everything later in the course — dominance relations, chromosomes, linkage, pedigrees — is built on these foundations.

## Mendel's experimental system

Mendel chose the garden pea, *Pisum sativum*, for good reasons. Peas are easy to grow, and many varieties were available from seed merchants. Their flowers normally **self-fertilise** (pollen fertilises ovules of the same flower before the flower opens), but they can be cross-fertilised by hand: the anthers of an immature flower are removed and pollen from another plant is brushed on to its stigma. Above all, Mendel first spent two years making sure that his varieties were **true-breeding** — that self-fertilised plants gave offspring identical to themselves, generation after generation, for the trait being studied.

He then chose seven traits, each with two clearly distinct forms: seed shape (round or wrinkled), cotyledon colour (yellow or green), flower colour (violet or white), pod shape (inflated or constricted), unripe pod colour (green or yellow), flower position (axial or terminal) and stem length (tall or dwarf). Distinct, either-or traits meant that every plant could be classified unambiguously, and counting became possible.

::: definition Generations of a cross {#def-generations}
In a genetic cross the parents are the **P generation**. Their offspring are the **first filial generation**, **F1**. Crossing F1 individuals with each other (or, in peas, self-fertilising them) gives the **F2**, and so on. A cross in which the parents differ in one trait is a **monohybrid cross**; a cross between parents differing in two traits is a **dihybrid cross**. **Reciprocal crosses** exchange the sexes of the parents (♀ round × ♂ wrinkled, and ♀ wrinkled × ♂ round).
:::

When Mendel crossed a true-breeding round-seeded line with a true-breeding wrinkled-seeded line, every F1 seed was round, whichever parent supplied the pollen. Wrinkledness had vanished. But when the F1 plants were allowed to self-fertilise, the wrinkled form reappeared in the F2: 5474 round seeds and 1850 wrinkled, a ratio of 2.96 : 1. The other six traits behaved in the same way: one form (which Mendel called **dominant**) appeared alone in the F1, and the other (**recessive**) reappeared in about a quarter of the F2.

| Trait | Dominant | Recessive | F2 dominant | F2 recessive | Ratio |
|---|---|---|---|---|---|
| Seed shape | round | wrinkled | 5474 | 1850 | 2.96 : 1 |
| Cotyledon colour | yellow | green | 6022 | 2001 | 3.01 : 1 |
| Flower colour | violet | white | 705 | 224 | 3.15 : 1 |
| Pod shape | inflated | constricted | 882 | 299 | 2.95 : 1 |
| Pod colour | green | yellow | 428 | 152 | 2.82 : 1 |
| Flower position | axial | terminal | 651 | 207 | 3.14 : 1 |
| Stem length | tall | dwarf | 787 | 277 | 2.84 : 1 |

Three observations needed explaining: the uniformity of the F1, the reappearance of the recessive form unchanged in the F2, and the ratio, which hovers around 3 : 1 in every experiment.

## Segregation

Mendel's explanation, in modern language, runs as follows. Each plant carries two copies of a hereditary factor for each trait. The copies may be alike or different. They separate (**segregate**) when gametes form, so that each gamete carries only one copy, chosen with equal probability. Fertilisation unites two gametes at random, restoring the pair.

::: definition The basic vocabulary {#def-vocabulary}
- A **gene** is a unit of heredity that influences a trait; the place it occupies on a chromosome is its **locus** (plural loci).
- The alternative forms of a gene are its **alleles**.
- An organism's **genotype** is its allelic constitution at the loci being considered; its **phenotype** is the observable trait.
- A diploid with two identical alleles at a locus is **homozygous** (*RR* or *rr*); one with two different alleles is **heterozygous** (*Rr*). A heterozygote is also called a **hybrid** or, for a single locus, a **monohybrid**.
- An allele is **dominant** if the heterozygote has the same phenotype as the homozygote for that allele, and **recessive** if its effect is seen only in the homozygote.
:::

We write genes in italics. In the classical textbook convention used in this chapter, a dominant allele has a capital letter and the recessive allele the same letter in lower case: *R* (round) and *r* (wrinkled). The word "gene" is commonly used both for the locus and for a particular allele ("the gene for wrinkled seeds"); context usually makes the meaning clear. Other organisms have their own conventions, which we meet as they arise: in *Drosophila*, alleles are named after the mutant phenotype and the wild type is marked with a superscript plus (*w* white eyes, *w*$^+$ red); human genes are written in italic capitals (*CFTR*), and their protein products upright (CFTR).

::: proposition Mendel's first law (segregation) {#prop-segregation}
In a diploid, the two alleles at a locus separate during gamete formation, so that each gamete receives one allele; a heterozygote *Aa* produces *A* and *a* gametes with probability $\tfrac12$ each. If gametes combine at random, the cross *Aa* × *Aa* gives offspring genotypes

$$
AA : Aa : aa = \tfrac14 : \tfrac12 : \tfrac14 ,
$$ {#eq-121}

and, if *A* is dominant, phenotypes in the ratio $3 : 1$.

Assumptions: equal segregation (no meiotic drive), equal fertilising ability and survival of all gamete types, random union of gametes, and equal viability of all genotypes up to the time of scoring.
:::

::: proof
Let the allele carried by the egg be $X$ and that carried by the sperm (pollen) be $Y$. By segregation, $P(X = A) = P(X = a) = \tfrac12$ and likewise for $Y$, and by random union $X$ and $Y$ are independent. Then

$$
\begin{aligned}
P(AA) &= P(X=A)\,P(Y=A) = \tfrac12\cdot\tfrac12 = \tfrac14,\\
P(aa) &= P(X=a)\,P(Y=a) = \tfrac14,\\
P(Aa) &= P(X=A)P(Y=a) + P(X=a)P(Y=A) = \tfrac14 + \tfrac14 = \tfrac12 ,
\end{aligned}
$$

where the heterozygote arises in two mutually exclusive ways. With *A* dominant, the phenotype is dominant with probability $\tfrac14 + \tfrac12 = \tfrac34$ and recessive with probability $\tfrac14$.
:::

The **Punnett square**, introduced by Reginald Punnett in the early 1900s, is a bookkeeping device for exactly this calculation: the gametes of one parent label the rows, those of the other label the columns, and each cell is a zygote whose probability is the product of the row and column probabilities.

| | *R* ($\tfrac12$) | *r* ($\tfrac12$) |
|---|---|---|
| ***R*** ($\tfrac12$) | *RR* ($\tfrac14$) round | *Rr* ($\tfrac14$) round |
| ***r*** ($\tfrac12$) | *Rr* ($\tfrac14$) round | *rr* ($\tfrac14$) wrinkled |

The scheme explains all three observations. The P lines are *RR* and *rr*; all F1 are *Rr*, round because *R* is dominant. The recessive allele is not altered by passing through the heterozygote, so *rr* plants reappear in the F2. And the ratio is $3:1$ because of [[#eq-121]].

Mendel's peas are now understood at the molecular level. The *r* allele of seed shape carries an insertion of about 0.8 kb of transposon-like DNA in the gene encoding starch-branching enzyme I (Madan Bhattacharyya and colleagues, 1990). Without the enzyme, *rr* seeds make less amylopectin and accumulate sucrose; they take up more water as they develop and wrinkle as they dry. One functional copy in *Rr* is enough for normal starch synthesis, which is why *R* is dominant — a common pattern for alleles that simply lose function.

::: warning "Dominant" does not mean "common", "stronger" or "better"
Dominance describes the phenotype of a heterozygote, nothing else. It says nothing about how frequent an allele is in a population, nor whether it is advantageous. The dominant allele for polydactyly in humans is rare; the recessive allele for blood group O is the most common *ABO* allele in many populations. Nor does a dominant allele "suppress" or "convert" the recessive one: in *Rr* both alleles are present and transmitted unchanged. Allele frequencies are the subject of [[population-genetics/hardy-weinberg]], where we shall see that dominance alone does not make an allele spread.
:::

### Testing segregation: progeny tests and the test cross

The hypothesis predicts more than a $3:1$ phenotypic ratio. It predicts that the round F2 plants are of two kinds, *RR* and *Rr*, in the ratio $1:2$. Mendel tested this by letting F2 plants self-fertilise and classifying their offspring. Of 565 round-seeded F2 plants, 193 gave only round seeds (true-breeding, *RR*), and 372 gave round and wrinkled seeds in a $3:1$ ratio (*Rr*) — a ratio of 1 : 1.93.

::: proposition Conditional genotype probabilities in the F2 {#prop-two-thirds}
In the F2 of *Aa* × *Aa*, an individual known to have the dominant phenotype is heterozygous with probability $\tfrac23$ and homozygous *AA* with probability $\tfrac13$.
:::

::: proof
By the definition of conditional probability and [[#eq-121]],

$$
P(Aa \mid \text{dominant}) = \frac{P(Aa)}{P(AA) + P(Aa)} = \frac{1/2}{1/4 + 1/2} = \frac23 .
$$
:::

This "two-thirds rule" is one of the most frequently used results in human pedigree analysis ([[genetics/sex-linkage-pedigrees]]): an unaffected brother or sister of a person with a recessive condition, both of whose parents are carriers, is a carrier with probability $\tfrac23$, not $\tfrac12$.

A quicker test of genotype is the **test cross**: cross the individual of unknown genotype with a homozygous recessive. Because the *aa* parent contributes only *a* gametes, the offspring phenotypes reveal the gametes of the tested parent directly: *AA* × *aa* gives all dominant offspring, *Aa* × *aa* gives dominant and recessive in a $1:1$ ratio. A cross of an F1 back to either parent is called a **backcross**; the test cross is the backcross to the recessive parent.

::: quiz
A black guinea pig is crossed with a white one (white is recessive) and produces a litter of four black young. What can we conclude?
- [ ] The black parent is certainly homozygous.
- [x] The black parent is probably, but not certainly, homozygous.
- [ ] The black parent is heterozygous.
- [ ] Nothing, because the litter is too small to see a 3 : 1 ratio.
::: solution
If the black parent were heterozygous, each offspring would be black with probability $\tfrac12$ and four black young would occur with probability $(\tfrac12)^4 = \tfrac1{16} \approx 0.06$. Such a result is unlikely but quite possible, so the evidence favours homozygosity without proving it. A single white offspring, on the other hand, would prove heterozygosity. The expected ratio for a test cross of a heterozygote is $1:1$, not $3:1$.
:::
:::

## Independent assortment

Mendel next crossed plants differing in two traits. A true-breeding line with round, yellow seeds (*RR YY*) crossed with one with wrinkled, green seeds (*rr yy*) gave round, yellow F1 (*Rr Yy*). Of 556 F2 seeds, he counted 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green — close to $9:3:3:1$. Two of the classes, round green and wrinkled yellow, were **recombinant**: they combined traits that had been in different parents.

::: proposition Mendel's second law (independent assortment) {#prop-assortment}
Alleles at different loci segregate independently of one another during gamete formation. A double heterozygote *Aa Bb* therefore produces the four gamete types *AB*, *Ab*, *aB*, *ab* with probability $\tfrac14$ each, and the cross *Aa Bb* × *Aa Bb*, with *A* and *B* dominant, gives the phenotypes

$$
A\text{-}B\text{-} : A\text{-}bb : aaB\text{-} : aabb = 9 : 3 : 3 : 1 ,
$$ {#eq-9331}

where *A-* means "*AA* or *Aa*". Assumptions: those of [[#prop-segregation]] for each locus, plus independence of the two loci. As we shall see in [[genetics/linkage-mapping]], the law holds for loci on different chromosomes and for loci far apart on the same chromosome, but not for loci close together on one chromosome.
:::

::: proof
By independence, the probability of a two-locus gamete is the product of the single-locus probabilities, $\tfrac12\cdot\tfrac12 = \tfrac14$ for each of the four types. In the F2, the genotypes at the two loci are then independent, each following [[#eq-121]]. The phenotype at locus A is dominant with probability $\tfrac34$ and at locus B with probability $\tfrac34$, so

$$
P(A\text{-}B\text{-}) = \tfrac34\cdot\tfrac34 = \tfrac{9}{16},\quad
P(A\text{-}bb) = \tfrac34\cdot\tfrac14 = \tfrac{3}{16},\quad
P(aaB\text{-}) = \tfrac{3}{16},\quad
P(aabb) = \tfrac{1}{16}.
$$
:::

Notice what the proof did *not* need: a 16-cell Punnett square. A $4\times4$ square works for two loci, but for three it has 64 cells and for four 256. The product rule turns any multi-locus problem into a set of one-locus problems.

::: intuition Independent assortment as two coins
Think of the gametes of a double heterozygote as the outcome of tossing two fair coins, one for each locus: heads gives the capital allele, tails the lower-case one. If the coins are independent, the four outcomes are equally likely, and so are the four gamete types. A Punnett square for a dihybrid cross is then just the table of outcomes for four coins — two from each parent. Linkage, later in the course, is what happens when the coins are glued together and come unstuck only occasionally.
:::

## Probability for genetics

Mendel's laws are probabilistic statements, and almost every genetic calculation uses the same three rules.

::: definition Rules of probability used in genetics {#def-prob-rules}
- **Product rule.** If events $E$ and $F$ are independent, $P(E \text{ and } F) = P(E)\,P(F)$. Segregation at different unlinked loci, the gametes of the two parents, and different children of the same parents are independent.
- **Sum rule.** If $E$ and $F$ are mutually exclusive, $P(E \text{ or } F) = P(E) + P(F)$.
- **Conditional probability.** $P(E \mid F) = P(E \text{ and } F)/P(F)$, the probability of $E$ given that $F$ is known to have occurred.

For families of $n$ independent offspring, each of a given kind with probability $p$, the number $X$ of that kind follows the **binomial distribution**

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad k = 0, 1, \dots, n .
$$ {#eq-binomial}
:::

The binomial coefficient $\binom{n}{k} = \dfrac{n!}{k!\,(n-k)!}$ counts the orders in which $k$ offspring of one kind and $n-k$ of the other can be born. These rules are developed properly in [Maths Atlas](/learn/maths/) and in [[biostatistics]]; here we use them.

::: example A trihybrid cross by branch counting {#ex-trihybrid}
Consider *Aa Bb Cc* × *Aa Bb Cc*, with all three loci unlinked and *A*, *B*, *C* dominant. (a) What fraction of the offspring show all three dominant traits? (b) What fraction are *Aa bb Cc*? (c) How many genotypes and how many phenotypes are possible?
::: solution
(a) Each locus independently gives the dominant phenotype with probability $\tfrac34$, so $P(A\text{-}B\text{-}C\text{-}) = (\tfrac34)^3 = \tfrac{27}{64} \approx 0.42$.

(b) $P(Aa) = \tfrac12$, $P(bb) = \tfrac14$, $P(Cc) = \tfrac12$, so $P(Aa\,bb\,Cc) = \tfrac12\cdot\tfrac14\cdot\tfrac12 = \tfrac1{16}$.

(c) Each locus has three genotypes (*AA*, *Aa*, *aa*) and two phenotypes, so there are $3^3 = 27$ genotypes and $2^3 = 8$ phenotypes. In general, $n$ unlinked heterozygous loci give $2^n$ gamete types, $3^n$ genotypes, $2^n$ phenotypes (with complete dominance) and $4^n$ cells in the Punnett square; the phenotypic ratios are the terms of $(3+1)^n$ expanded — $27:9:9:9:3:3:3:1$ for $n=3$.
:::
:::

::: example Children of two carriers {#ex-family}
Cystic fibrosis is inherited as an autosomal recessive trait caused by loss-of-function alleles of the gene *CFTR*. Two unaffected parents who are both heterozygous carriers have four children. (a) What is the probability that exactly one child is affected? (b) That at least one is affected? (c) That the first two are unaffected and the last two affected?
::: solution
Each child is independently affected with probability $p = \tfrac14$.

(a) By [[#eq-binomial]], $P(X=1) = \binom41 (\tfrac14)(\tfrac34)^3 = 4\cdot\tfrac{27}{256} = \tfrac{108}{256} \approx 0.422$.

(b) $P(X \ge 1) = 1 - P(X = 0) = 1 - (\tfrac34)^4 = 1 - \tfrac{81}{256} = \tfrac{175}{256} \approx 0.684$.

(c) A specified order has no binomial coefficient: $(\tfrac34)^2(\tfrac14)^2 = \tfrac{9}{256} \approx 0.035$.

The $\tfrac14$ applies to *each* child independently: having one affected child does not make the next one less likely to be affected — chance has no memory. (This is a textbook probability calculation, not clinical guidance; the genetics of cystic fibrosis in medicine is treated in [Medicine Atlas](/learn/medicine/lesson.php?c=genetics&l=mendelian-inheritance).)
:::
:::

::: widget distribution
dist: binomial
params: n=8, p=0.25
a: 2
b: 2
caption: The number of recessive-phenotype offspring among $n$ children of two heterozygotes, each one independently with probability $p = 1/4$. The shaded bar is $P(X = 2)$ for $n = 8$. Change $n$ to see how rarely a family shows the "expected" one-in-four exactly, and set $p = 0.5$ for a test cross. Even at $n = 8$ the single most likely outcome has probability under 0.32.
:::

::: warning "Three to one" is a probability, not a quota
A $3:1$ ratio does not mean that in every four offspring exactly three show the dominant trait, nor that after three dominant offspring the fourth "must" be recessive. It is a statement about the probability for each offspring independently. Small families and small samples deviate from the expectation, often by a lot; only large samples approach the ratio, and even then never exactly — Mendel's own ratios ranged from 2.82 to 3.15. To decide whether a deviation is too large to be due to chance we need a statistical test.
:::

## Testing a ratio: the χ² goodness-of-fit test

Mendel's 315 : 108 : 101 : 32 is not exactly $9:3:3:1$; nor could it be, since $556$ is not divisible by 16. How large a discrepancy should make us doubt the hypothesis? The standard tool, due to Karl Pearson (1900), is the χ² goodness-of-fit test.

::: definition The χ² goodness-of-fit statistic {#def-chisq}
Suppose $n$ individuals fall into $k$ classes, with observed counts $O_1, \dots, O_k$, and a hypothesis $H_0$ predicts class probabilities $\pi_1, \dots, \pi_k$, hence **expected counts** $E_i = n\pi_i$. The statistic

$$
X^2 = \sum_{i=1}^{k} \frac{(O_i - E_i)^2}{E_i}
$$ {#eq-chisq}

measures the overall discrepancy. If $H_0$ is true and the expected counts are not too small (a common rule: every $E_i \ge 5$), $X^2$ approximately follows a **χ² distribution** with $\nu = k - 1$ **degrees of freedom**, one fewer than the number of classes because the counts are constrained to sum to $n$. The **p-value** is the probability, under $H_0$, of a value of $X^2$ at least as large as the one observed.
:::

Squared deviations are used so that positive and negative deviations do not cancel; dividing by $E_i$ scales each term, since a deviation of 10 matters more in a class expected to hold 30 than in one expected to hold 3000. (Each term is approximately the square of a standard normal deviate, and the sum of $\nu$ such squares has the χ² distribution with $\nu$ degrees of freedom.)

::: algorithm χ² goodness-of-fit test {#alg-chisq}
1. State the genetic hypothesis $H_0$ and the class probabilities it predicts.
2. Compute the expected counts $E_i = n\pi_i$ from the total $n$ (never from percentages). Check that they are not too small; if necessary combine classes.
3. Compute $X^2$ by [[#eq-chisq]] and the degrees of freedom $\nu = k - 1$ (subtract one more for each parameter estimated from the data).
4. Find the p-value $P(\chi^2_\nu \ge X^2)$, or compare $X^2$ with the critical value at the chosen significance level $\alpha$ (usually 0.05): 3.841 for $\nu = 1$, 5.991 for $\nu=2$, 7.815 for $\nu = 3$, 9.488 for $\nu = 4$.
5. If $p < \alpha$, reject $H_0$; otherwise conclude that the data are consistent with $H_0$ — which is not the same as proving it.
:::

::: example Mendel's dihybrid data {#ex-chisq-mendel}
Test whether Mendel's counts 315 round yellow, 108 round green, 101 wrinkled yellow and 32 wrinkled green fit $9:3:3:1$.
::: solution
With $n = 556$ the expected counts are $556\times\tfrac9{16} = 312.75$, $556\times\tfrac3{16} = 104.25$ (twice) and $556\times\tfrac1{16} = 34.75$. Then

$$
X^2 = \frac{(315-312.75)^2}{312.75} + \frac{(108-104.25)^2}{104.25} + \frac{(101-104.25)^2}{104.25} + \frac{(32-34.75)^2}{34.75}
= 0.016 + 0.135 + 0.101 + 0.218 = 0.470 .
$$

With $k = 4$ classes, $\nu = 3$. The critical value at $\alpha = 0.05$ is 7.815, far above 0.470; the exact p-value is $P(\chi^2_3 \ge 0.470) = 0.925$. A discrepancy at least this large would arise by chance in about 93 % of such experiments, so the data agree very well with independent assortment.
:::
:::

::: widget distribution
dist: chisq
params: k=3
a: 7.815
b: 20
caption: The χ² distribution with $k$ degrees of freedom. With $k = 3$ (a four-class ratio such as $9:3:3:1$) the shaded upper tail beyond 7.815 has area 0.05: values of $X^2$ in this region lead to rejection at the 5 % level. Mendel's dihybrid value, 0.470, lies far to the left, where most of the area is. Change $k$ to 1 for a $3:1$ or $1:1$ ratio and see the critical value move to 3.841.
:::

::: example A significant deviation {#ex-chisq-reject}
A student crosses two dihybrid plants and records 220 : 90 : 85 : 45 in the four phenotypic classes (in the order of [[#eq-9331]]). Test the fit to $9:3:3:1$.
::: solution
$n = 440$, so $E = 247.5,\ 82.5,\ 82.5,\ 27.5$. The terms of $X^2$ are $3.056,\ 0.682,\ 0.076,\ 11.136$, giving $X^2 = 14.95$ with $\nu = 3$, and $p = 0.0019$. We reject the hypothesis of $9:3:3:1$ at the 5 % (indeed the 1 %) level. Nearly all of the discrepancy comes from the double-recessive class, which has 45 plants instead of 27.5. Possible explanations are not statistical but biological: linkage of the two loci in coupling (an excess of parental combinations, [[genetics/linkage-mapping]]), misclassification, or differential survival. The test tells us only that something other than chance is probably at work.
:::
:::

```python
# chi-squared goodness of fit in plain Python (scipy.stats.chisquare does the same)
from math import exp, lgamma, log

def chisq_sf(x, df):
    """Upper tail P(chi2_df >= x) by the series for the regularised gamma function."""
    s, z = df / 2, x / 2
    term = total = 1 / s
    n = 1
    while term > 1e-15 * total:
        term *= z / (s + n); total += term; n += 1
    return 1 - total * exp(-z + s * log(z) - lgamma(s))

obs = [315, 108, 101, 32]                     # counts in the four classes
ratio = [9, 3, 3, 1]
n = sum(obs)
exp_ = [n * r / sum(ratio) for r in ratio]    # 312.75, 104.25, 104.25, 34.75
x2 = sum((o - e) ** 2 / e for o, e in zip(obs, exp_))
print(round(x2, 3), round(chisq_sf(x2, len(obs) - 1), 3))   # 0.47 0.925
```

::: warning Things the χ² test cannot do
- **It cannot prove a hypothesis.** A large p-value means only that the data do not contradict $H_0$; other hypotheses may fit equally well, especially with small samples.
- **It must be applied to counts, not to percentages or ratios.** $X^2$ grows with sample size: the same proportional deviation that is insignificant in 40 offspring may be highly significant in 4000.
- **Expected counts must not be too small.** When several $E_i < 5$, the χ² approximation is poor; combine classes or use an exact (binomial or multinomial) test.
- **A significant result does not say which explanation is right.** It says that the deviation is unlikely under $H_0$, not why.
:::

## How Mendel's laws were received

Mendel's paper had little influence for 34 years. Its few readers saw it as a contribution to plant hybridisation, a specialised field, not as a theory of heredity; its algebraic argument was unusual for biology; and the hawkweeds (*Hieracium*) that Mendel later studied at the suggestion of the botanist Carl Nägeli seemed to contradict it — we now know that many hawkweeds set seed without fertilisation (apomixis), so their offspring are clones. In 1900 three botanists, Hugo de Vries, Carl Correns and Erich von Tschermak, reported segregation ratios in their own crosses and drew attention to Mendel's work. William Bateson championed it in Britain, showed with Punnett and Edith Saunders that it applied to animals as well as plants, and named the new science **genetics** (1905, in a letter; publicly in 1906). The Danish botanist Wilhelm Johannsen introduced the words *gene*, *genotype* and *phenotype* in 1909.

::: history
Gregor Mendel (1822–1884) presented his results to the Natural History Society of Brünn (now Brno, Czech Republic) in two lectures on 8 February and 8 March 1865; the paper, *Versuche über Pflanzen-Hybriden* ("Experiments on plant hybrids"), appeared in the Society's *Verhandlungen* for 1865, published in 1866. In 1936 the statistician Ronald Fisher re-analysed Mendel's data and concluded that, taken together, they fit the expected ratios more closely than chance would usually allow — the overall χ² was too small — and that in one set of experiments the results matched a ratio that Mendel's own procedure should not have produced ([[#exr-fisher]]). The controversy continues: Mendel may have stopped counting when ratios looked right, or an assistant may have known what was expected, or the analysis may overstate the case. No one doubts that Mendel's conclusions are correct; they have been confirmed millions of times.
:::

::: application True-breeding lines and hybrid seed
Plant breeders still use Mendel's logic every day. Self-fertilisation halves the proportion of heterozygous loci in each generation, so after six or seven generations of selfing a line is nearly homozygous and breeds true — the basis of pure-line cultivars of wheat, rice, soybean and peas. Conversely, crossing two inbred lines gives a genetically uniform F1, which is the reason commercial **hybrid seed** of maize and many vegetables must be bought anew each year: the F2 from saved seed segregates and is variable. Why F1 hybrids are often more vigorous than either parent (heterosis) is discussed in [[population-genetics/inbreeding]].
:::

::: summary
- Inheritance is particulate: genes come in pairs of alleles in diploids, are not changed by being together in a heterozygote, and are transmitted unchanged.
- **Segregation**: each gamete carries one allele of each pair, with probability $\tfrac12$ for each allele of a heterozygote. *Aa* × *Aa* gives *AA* : *Aa* : *aa* = 1 : 2 : 1 and, with dominance, 3 : 1; among dominant offspring, $\tfrac23$ are heterozygous.
- **Independent assortment**: unlinked loci segregate independently, giving 9 : 3 : 3 : 1 in a dihybrid F2 and, in general, phenotypic ratios $(3+1)^n$.
- A **test cross** to the homozygous recessive reveals the gametes of an individual: $1:1$ for a heterozygote.
- Use the product rule for independent events, the sum rule for exclusive ones, conditional probability for partial information, and the binomial distribution for families.
- The **χ² goodness-of-fit test** compares observed counts with those expected under a hypothesis: $X^2 = \sum (O-E)^2/E$ with $k-1$ degrees of freedom. A small p-value rejects the hypothesis; a large one fails to reject it but proves nothing.
- Dominance describes the heterozygote's phenotype; it says nothing about frequency or fitness.
:::

## Exercises

::: exercise A test cross {level=1 check="1/2"}
A heterozygous tall pea plant (*Tt*) is crossed with a dwarf plant (*tt*). What is the probability that a given offspring is dwarf?
::: solution
The *tt* parent produces only *t* gametes; the *Tt* parent produces *T* and *t* with probability $\tfrac12$ each. The offspring is *tt* (dwarf) when it receives *t* from the heterozygote: probability $\tfrac12$.
:::
:::

::: exercise Four recessives at once {level=1 check="1/256"}
In the cross *Aa Bb Cc Dd* × *Aa Bb Cc Dd*, with all loci unlinked, what fraction of offspring are *aa bb cc dd*?
::: solution
At each locus $P(aa) = \tfrac14$, and the loci are independent, so the fraction is $(\tfrac14)^4 = \tfrac1{256}$.
:::
:::

::: exercise Counting classes {level=1 check="27/64"}
In the F2 of a trihybrid cross (all three loci unlinked, complete dominance), what fraction of plants show the dominant phenotype for all three traits?
::: solution
$(\tfrac34)^3 = \tfrac{27}{64}$, as in [[#ex-trihybrid]].
:::
:::

::: exercise A monohybrid χ² {level=2 check="1.33"}
An F2 contains 290 plants with violet flowers and 110 with white. Compute $X^2$ for the hypothesis of a $3:1$ ratio (two decimal places), and state your conclusion at the 5 % level.
::: solution
$n = 400$, $E = 300$ and $100$. $X^2 = \dfrac{10^2}{300} + \dfrac{10^2}{100} = 0.333 + 1.000 = 1.33$, with $\nu = 1$. Since $1.33 < 3.841$ ($p = 0.25$), the data are consistent with $3:1$.
:::
:::

::: exercise Exactly one in four {level=2 check="0.422"}
Two heterozygous carriers of a recessive allele have four children. What is the probability that exactly one of them shows the recessive phenotype (three decimal places)?
::: solution
$\binom41(\tfrac14)(\tfrac34)^3 = \tfrac{108}{256} = 0.422$ ([[#ex-family]]). Note that this most likely outcome is still less likely than not.
:::
:::

::: exercise Two unaffected siblings {level=2 check="1/9"}
A woman and a man are each the unaffected sibling of a person with an autosomal recessive condition; in each family both parents are unaffected carriers. Neither family has any other relevant history, and the condition is rare enough that marrying-in carriers can be ignored. What is the probability that their first child is affected?
::: hint
Use [[#prop-two-thirds]] for each parent.
:::
::: solution
Each prospective parent is a carrier with probability $\tfrac23$. The child is affected only if both are carriers and the child receives the recessive allele from each: $\tfrac23\cdot\tfrac23\cdot\tfrac14 = \tfrac19$. (Using $\tfrac12$ for the carrier probability, a common error, would give $\tfrac1{16}$.)
:::
:::

::: exercise Interpreting a failed fit {level=2}
In a dihybrid F2 the counts in the classes *A-B-*, *A-bb*, *aaB-*, *aabb* are 152, 39, 53, 6. (a) Test the fit to $9:3:3:1$. (b) Now consider the loci separately: test the $A\text{-} : aa$ ratio and the $B\text{-} : bb$ ratio against $3:1$. (c) What do the results suggest?
::: solution
(a) $n = 250$; $E = 140.625,\ 46.875,\ 46.875,\ 15.625$. $X^2 = 0.920 + 1.323 + 0.800 + 5.929 = 8.97$, $\nu = 3$, $p = 0.030$: reject $9:3:3:1$ at the 5 % level.

(b) Locus A: dominant $152 + 39 = 191$, recessive $53 + 6 = 59$; $E = 187.5,\ 62.5$; $X^2 = 0.065 + 0.196 = 0.26$, $p = 0.61$. Locus B: dominant $152 + 53 = 205$, recessive $39 + 6 = 45$; $X^2 = (205-187.5)^2/187.5 + (45-62.5)^2/62.5 = 1.633 + 4.900 = 6.53$, $p = 0.011$.

(c) Locus A segregates normally. Locus B shows a deficit of *bb* plants (45 instead of 62.5), which accounts for most of the misfit — in particular the shortage of *aabb*. A plausible explanation is reduced viability of *bb* (or difficulty in scoring the *bb* phenotype), rather than a failure of independent assortment. Splitting the data by locus is a standard way to locate the source of a deviation; a proper test of independence between the loci would use a contingency table.
:::
:::

::: exercise How big an F2? {level=3 check="191"}
How many F2 plants from a trihybrid cross (*Aa Bb Cc* selfed, unlinked loci) must a breeder grow to have at least a 95 % chance of obtaining at least one *aa bb cc* plant?
::: solution
Each plant is *aabbcc* with probability $(\tfrac14)^3 = \tfrac1{64}$. The probability that none of $n$ plants is is $(\tfrac{63}{64})^n$, and we need $(\tfrac{63}{64})^n \le 0.05$, i.e. $n \ge \ln 0.05/\ln(63/64) = 190.2$. So 191 plants are needed — about three times the "expected" 64.
:::
:::

::: exercise Fisher's objection {#exr-fisher level=3}
To classify F2 plants with the dominant phenotype as *AA* or *Aa*, Mendel grew 10 offspring from each and called a plant homozygous if all 10 showed the dominant trait. (a) What is the probability that a heterozygote is misclassified as homozygous? (b) Under this procedure, what proportions of dominant F2 plants are expected to be classified as homozygous and heterozygous? (c) In several experiments Mendel reported ratios very close to $1:2$. Why did Fisher regard this as suspicious?
::: solution
(a) A heterozygote's selfed offspring each show the dominant phenotype with probability $\tfrac34$, so all 10 do so with probability $(\tfrac34)^{10} = 0.0563$.

(b) Classified homozygous: $\tfrac13 + \tfrac23(0.0563) = 0.371$; classified heterozygous: $\tfrac23(1-0.0563) = 0.629$ — a ratio of $1:1.70$, not $1:2$.

(c) If Mendel used this procedure, his counts should have scattered around $1:1.70$. They clustered instead around $1:2$, the value expected with no misclassification, which is improbable if the counts were collected exactly as described. Possible explanations include a different protocol from the one described (for example more than 10 offspring scored), selective reporting or unconscious bias. The calculation shows how understanding a classification procedure changes the expected ratio — a point that matters in any genetic experiment.
:::
:::
