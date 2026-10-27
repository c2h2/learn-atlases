An organism has many more genes than chromosomes — *Drosophila* has about 14,000 protein-coding genes on four chromosomes, humans about 20,000 on 23. Genes on the same chromosome cannot all assort independently: if chromosomes were passed on intact, all the genes of one chromosome would travel together as a block. In fact they do not travel together completely, because homologous chromosomes exchange segments by crossing over in meiosis ([[genetics/chromosomes-meiosis]]). Genes on the same chromosome are therefore **linked** — inherited together more often than independent assortment predicts — but not absolutely.

In 1911 Thomas Hunt Morgan suggested that the closer two genes lie on a chromosome, the less often a crossover will fall between them and separate them. Two years later his undergraduate student Alfred Sturtevant realised that the frequency of recombination could be used as a measure of distance, and in one evening constructed the first genetic map. This chapter develops that idea: how to detect linkage, how to measure recombination frequency, why it cannot exceed 50 %, how to turn it into a map distance with a **mapping function**, how three-point crosses determine gene order and reveal **interference**, and how linkage is detected in human families with **LOD scores**.

## Linkage and recombination

The first sign of linkage was found by William Bateson, Edith Saunders and Reginald Punnett in 1905. In sweet peas, crosses involving purple versus red flowers and long versus round pollen grains gave dihybrid F2 ratios far from $9:3:3:1$, with a large excess of the parental combinations. They called this "partial coupling" but did not explain it.

::: definition Linkage, phase and recombination frequency {#def-linkage}
Two loci are **linked** if they are on the same chromosome close enough that their alleles are not transmitted independently. In a double heterozygote, the alleles can be arranged in **coupling** (*cis*), with the two dominant (or two wild-type) alleles on one homologue, $\frac{A\ B}{a\ b}$, or in **repulsion** (*trans*), $\frac{A\ b}{a\ B}$; the arrangement is the **linkage phase**. A gamete is **parental** (non-recombinant) if it carries an allele combination present on one of the homologues the individual received from its parents, and **recombinant** otherwise. The **recombination frequency** $r$ between two loci is the proportion of recombinant gametes.
:::

The genotype notation with a horizontal line, $\frac{A\ B}{a\ b}$, shows the two homologues one above the other; it is often written on one line as *AB*/*ab*. For unlinked loci, recombinant and parental gametes are equally frequent and $r = \tfrac12$. For linked loci $r < \tfrac12$.

::: definition The two-point test cross {#def-testcross}
To measure $r$, cross the double heterozygote with a double homozygous recessive, *ab*/*ab*. Every offspring receives *ab* from the tester, so its phenotype reveals the gamete from the heterozygote. With $N$ offspring of which $R$ are recombinant,

$$
\hat r = \frac{R}{N}, \qquad \mathrm{SE}(\hat r) = \sqrt{\frac{\hat r(1-\hat r)}{N}} .
$$ {#eq-rhat}
:::

The standard error follows from the binomial distribution of $R$ ([[genetics/mendelian-inheritance#eq-binomial]]). In *Drosophila* the heterozygote must be the female, because there is no meiotic crossing over in *Drosophila* males — a fact Morgan discovered early and exploited.

::: example A two-point cross in Drosophila {#ex-two-point}
The recessive alleles *b* (black body) and *vg* (vestigial wings) are on chromosome 2 of *Drosophila melanogaster*. A female from a cross of a wild-type stock with a black vestigial stock, *b*$^+$*vg*$^+$/*b vg*, is crossed with a *b vg*/*b vg* male. The 1000 offspring are 412 wild type, 398 black vestigial, 92 black with normal wings and 98 grey (wild-type body) with vestigial wings. (a) Are the loci linked? (b) Estimate $r$ and its standard error.
::: solution
(a) For unlinked loci the four classes would be equally frequent (250 each). Here two classes are much larger: these are the parental types, *b*$^+$*vg*$^+$ and *b vg*, as expected since the female received *b*$^+$*vg*$^+$ from one parent and *b vg* from the other. A χ² test against $1:1:1:1$ gives $X^2 = 384.9$, $\nu = 3$, $p < 10^{-80}$. A better test of linkage is a $2\times2$ test of independence between the two loci, which is not disturbed if one mutant has reduced viability; it gives $X^2 = 384.4$, $\nu = 1$ — overwhelming evidence of linkage.

(b) The recombinant classes are black normal and grey vestigial: $R = 92 + 98 = 190$, so $\hat r = 0.190$ and $\mathrm{SE} = \sqrt{0.19\times0.81/1000} = 0.012$. The loci are about 19 map units apart. (The accepted map positions of *b* and *vg* on chromosome 2 are 48.5 and 67.0, about 18.5 units apart.)
:::
:::

::: warning "If $r = 0.5$, the genes are on different chromosomes"
A recombination frequency of 50 % means only that the loci assort independently. Loci on different chromosomes do so, but so do loci far apart on the same chromosome, which nearly always have at least one crossover between them. Such loci are **syntenic** (on the same chromosome) without being detectably linked, and their common location can be shown only by mapping intermediate loci, each linked to its neighbours. Conversely, recombination frequency is not the same as physical distance: it depends on where crossovers happen, which varies along chromosomes and between the sexes.
:::

## Why recombination frequency cannot exceed one half

Crossing over takes place at the four-chromatid stage. Each crossover involves one chromatid of each homologue and leaves the other two untouched ([[genetics/chromosomes-meiosis]]). So a meiosis with exactly one crossover between two loci yields two recombinant and two parental chromatids: recombination frequency $\tfrac12$ *among the products of that meiosis*. A meiosis with no crossover between the loci yields none. Multiple crossovers can restore parental combinations.

::: proposition Mather's formula {#prop-mather}
Suppose crossovers between two loci involve pairs of non-sister chromatids chosen at random and independently of one another (**no chromatid interference**). Let $p_0$ be the probability that a meiosis has no crossover in the interval. Then

$$
r = \tfrac12\,(1 - p_0) .
$$ {#eq-mather}

In particular $0 \le r \le \tfrac12$, with $r \to \tfrac12$ as the interval becomes long.
:::

::: proof
Condition on the number $k \ge 1$ of crossovers in the interval of a meiosis, and follow one chromatid chosen at random from the four. Each crossover involves the chosen chromatid with probability $\tfrac12$ (two of the four chromatids take part). The chromatid is recombinant for the two end loci if it has been involved in an odd number of crossovers. With no chromatid interference, its involvement in the $k$ crossovers is a sequence of $k$ independent events of probability $\tfrac12$, so the number of involvements is binomial($k$, $\tfrac12$) and the probability that it is odd is

$$
\sum_{j\ \text{odd}} \binom{k}{j}\left(\tfrac12\right)^k = 2^{k-1}\left(\tfrac12\right)^k = \tfrac12 \qquad (k \ge 1),
$$

using $\sum_{j\ \text{odd}}\binom kj = 2^{k-1}$ (half of all $2^k$ subsets of $k$ objects have odd size). So every meiosis with at least one crossover gives recombinant products with probability exactly $\tfrac12$, and a meiosis with none gives probability $0$. Averaging, $r = \tfrac12(1 - p_0) + 0\cdot p_0$.
:::

This is why $\tfrac12$ is the ceiling: however many crossovers happen, the four strands are reshuffled at random, and half of them on average end up recombinant.

## Map distance and mapping functions

Sturtevant's idea was to define distance additively. If crossovers are like points scattered along a chromosome, the *average number of crossovers* in an interval is additive — the number in the interval from A to C is the number from A to B plus the number from B to C. Recombination frequency is not additive, because double crossovers between A and C are invisible.

::: definition Map distance {#def-map-distance}
The **map distance** $d$ between two loci is the mean number of crossovers per chromatid in the interval between them (equivalently half the mean number of crossovers per meiosis, since each crossover involves two of the four chromatids). It is measured in **morgans** (M); one **centimorgan** (cM, also called a **map unit**) is 0.01 M. For short intervals, in which double crossovers are rare, $d \approx r$: 1 cM corresponds to 1 % recombination.
:::

A **mapping function** gives $r$ as a function of $d$. The simplest assumes that crossovers occur at random, independently of each other.

::: proposition Haldane's mapping function {#prop-haldane}
If crossovers along the chromosome form a Poisson process (no **crossover interference**) and there is no chromatid interference, then

$$
r = \tfrac12\left(1 - e^{-2d}\right), \qquad d = -\tfrac12\ln(1 - 2r),
$$ {#eq-haldane}

with $d$ in morgans.
:::

::: proof
By definition the mean number of crossovers per chromatid in the interval is $d$, so the mean number per meiosis (per bivalent) is $2d$. If crossovers occur as a Poisson process, the number in the interval in one meiosis is Poisson with mean $2d$, and the probability of none is $p_0 = e^{-2d}$. Mather's formula [[#eq-mather]] gives $r = \tfrac12(1 - e^{-2d})$. Solving for $d$: $1 - 2r = e^{-2d}$, so $d = -\tfrac12\ln(1 - 2r)$.
:::

For small $d$, $e^{-2d} \approx 1 - 2d$, so $r \approx d$; as $d \to \infty$, $r \to \tfrac12$. Real chromosomes show **positive crossover interference**: a crossover reduces the chance of another nearby, so double crossovers in short intervals are rarer than the Poisson model predicts. A mapping function allowing for this, proposed by the Indian mathematician D. D. Kosambi in 1944, is

$$
r = \tfrac12\tanh(2d), \qquad d = \tfrac14\ln\frac{1 + 2r}{1 - 2r} .
$$ {#eq-kosambi}

Kosambi's function is not derived from a mechanistic model of crossing over; it was chosen so that interference decreases with distance in a simple way, and it fits many organisms better than Haldane's. Both agree with $r \approx d$ for small distances. Haldane's function gives the larger distance for a given $r$, because it assumes the most undetected double crossovers.

| $r$ | 0.05 | 0.10 | 0.20 | 0.30 | 0.40 | 0.45 |
|---|---|---|---|---|---|---|
| Haldane $d$ (cM) | 5.3 | 11.2 | 25.5 | 45.8 | 80.5 | 115.1 |
| Kosambi $d$ (cM) | 5.0 | 10.1 | 21.2 | 34.7 | 54.9 | 73.6 |

::: widget plot
f: 0.5*(1 - exp(-2*x)); 0.5*tanh(2*x); x
x: 0, 1.5
y: 0, 0.6
labels: Haldane; Kosambi; $r = d$
hlines: 0.5
caption: Recombination frequency $r$ against map distance $d$ in morgans for Haldane's function (no interference), Kosambi's function (interference that weakens with distance) and the naive line $r = d$. All three agree below about 0.1 M (10 cM). Beyond that, $r$ bends over towards the ceiling of 0.5, and the same observed $r$ corresponds to a longer map distance under Haldane than under Kosambi.
:::

::: example Converting recombination frequencies {#ex-mapping}
Two loci show 30 % recombination. Estimate the map distance under (a) the naive assumption $d = r$, (b) Haldane's and (c) Kosambi's function.
::: solution
(a) 30 cM. (b) $d = -\tfrac12\ln(1 - 0.6) = -\tfrac12\ln 0.4 = 0.458$ M $= 45.8$ cM. (c) $d = \tfrac14\ln(1.6/0.4) = \tfrac14\ln4 = 0.347$ M $= 34.7$ cM. The large spread shows why long intervals should be mapped by adding short ones, in which the functions agree, rather than estimated directly.
:::
:::

## Sturtevant's map and three-point crosses

Sturtevant (1913) used six X-linked recessive mutations of *Drosophila* — yellow body (*y*), white eyes (*w*), vermilion eyes (*v*), miniature wings (*m*) and rudimentary wings (*r*), plus eosin, which later proved to be an allele of white — and found that their pairwise recombination frequencies could be arranged in a single line in which distances were nearly additive. His map placed *y* at 0, *w* at 1.0, *v* at 30.7, *m* at 33.7 and *r* at 57.6. The near-additivity of short intervals showed that genes are arranged in a line; the shortfall for long intervals — the recombination frequency between distant genes was smaller than the sum of the short intervals between them — revealed double crossing over.

A **three-point test cross**, using a triple heterozygote, determines gene order and two distances in one experiment and measures interference directly.

::: algorithm Analysing a three-point test cross {#alg-three-point}
1. Group the eight phenotypic classes into four reciprocal pairs (classes that are complementary at all three loci).
2. The largest pair is the **parental** class; it gives the arrangement of alleles on the two homologues of the heterozygote.
3. The smallest pair is the **double-crossover** class. Compare it with the parental class: the locus whose allele has switched is in the **middle**.
4. Rewrite all classes in the correct gene order. The two remaining pairs are single crossovers in region I (between the first and middle loci) and region II (between the middle and last loci).
5. $r_\mathrm{I} = (\text{SCO}_\mathrm{I} + \text{DCO})/N$ and $r_\mathrm{II} = (\text{SCO}_\mathrm{II} + \text{DCO})/N$ — double crossovers are recombinant in *both* regions.
6. The **coefficient of coincidence** is $c = \dfrac{\text{observed DCO}}{r_\mathrm{I}\,r_\mathrm{II}\,N}$, and the **interference** is $I = 1 - c$.
:::

::: example A three-point cross on chromosome 2 {#ex-three-point}
Females heterozygous for *b* (black), *vg* (vestigial) and *pr* (purple eyes), from a cross of a wild-type with a triple-mutant stock, are test-crossed to *b pr vg* males. The 2000 offspring are:

| Phenotype (at *b*, *vg*, *pr*) | Number |
|---|---|
| + + + | 822 |
| *b vg pr* | 817 |
| + *vg* + | 118 |
| *b* + *pr* | 123 |
| *b* + + | 57 |
| + *vg pr* | 54 |
| *b vg* + | 4 |
| + + *pr* | 5 |

Determine the gene order, the map distances and the interference.
::: solution
Pairs: (822, 817) parental, +++ / *b vg pr*; (118, 123); (57, 54); (4, 5) double crossovers.

Order: the DCO classes are *b vg* + and + + *pr*. Compared with the parental *b vg pr* and + + +, only the allele at *pr* has switched, so *pr* is in the middle: the order is *b*–*pr*–*vg*.

Regions, rewritten in this order: (*b* + +, + *pr vg*) = 57 + 54 = 111 is a crossover between *b* and *pr* (region I); (+ + *vg*, *b pr* +) = 118 + 123 = 241 is between *pr* and *vg* (region II).

$$
r_{b\text{–}pr} = \frac{111 + 9}{2000} = 0.060, \qquad r_{pr\text{–}vg} = \frac{241 + 9}{2000} = 0.125 .
$$

So *b* and *pr* are 6.0 cM apart and *pr* and *vg* 12.5 cM. The recombination frequency measured directly between the outside loci *b* and *vg* is $(111 + 241)/2000 = 0.176$, less than the sum 0.185 by $2\times9/2000$: the double crossovers are not recombinant for the outside loci.

Expected DCOs with no interference: $0.060\times0.125\times2000 = 15$. Observed 9, so $c = 9/15 = 0.60$ and $I = 0.40$: a crossover in one region reduced the chance of a crossover in the other by 40 %.
:::
:::

::: quiz
In a three-point cross the parental classes are *a B c* and *A b C*, and the double-crossover classes are *a b c* and *A B C*. Which gene is in the middle?
- [ ] A
- [x] B
- [ ] C
- [ ] It cannot be determined without the single-crossover counts
::: solution
Compare *a B c* (parental) with *a b c* (double crossover): only the allele at B differs. A double crossover exchanges just the middle segment, so B is in the middle; the order is A–B–C (or C–B–A).
:::
:::

::: definition Crossover interference {#def-interference}
**Crossover interference** is the non-independence of crossovers in neighbouring intervals of the same meiosis. It is measured by the coefficient of coincidence $c$ (observed over expected double crossovers) and the interference $I = 1 - c$. **Positive interference** ($I > 0$), the usual case, means fewer double crossovers than expected; $I = 1$ means complete interference. **Negative interference** ($I < 0$), an excess of double crossovers, is seen in some fungi and phage crosses over very short intervals.
:::

Positive interference is a property of the crossover pathway: once a crossover is designated at one site, nearby sites are inhibited, which spaces crossovers evenly and helps ensure that each bivalent gets at least one (the obligate crossover). The mechanism, involving the synaptonemal complex and pro-crossover proteins, is an active research area.

## Mapping in humans: LOD scores

Human geneticists cannot set up test crosses. They must use families as they come, in which phase is often unknown and only a few meioses are informative. The standard method, developed by Newton Morton in 1955 on the basis of Abraham Wald's sequential probability ratio test, compares the likelihood of the family data under linkage with recombination frequency $r$ to its likelihood under no linkage ($r = \tfrac12$).

::: definition LOD score {#def-lod}
For pedigree data $D$ and a recombination frequency $r$, the **LOD score** (logarithm of the odds) is

$$
Z(r) = \log_{10}\frac{L(r)}{L(\tfrac12)},
$$ {#eq-lod}

where $L(r) = P(D \mid r)$ is the likelihood. For $N$ meioses in which phase is known and $R$ are recombinant, $L(r) = r^R(1 - r)^{N-R}$, so

$$
Z(r) = R\log_{10} r + (N - R)\log_{10}(1 - r) + N\log_{10} 2 .
$$ {#eq-lod-phase-known}

The **maximum likelihood estimate** of $r$ is the value $\hat r$ that maximises $Z$ (for phase-known data $\hat r = R/N$). By convention a maximum LOD of $3$ or more (odds of 1000 : 1 in favour of linkage) is taken as significant evidence of linkage, and $Z \le -2$ at a given $r$ as evidence against linkage at that distance. LOD scores from independent families add.
:::

The threshold of 3 seems strict, but it is chosen because the prior probability that two random loci are linked is low (only a few per cent of random pairs of human loci lie close enough), so strong evidence is needed for a reasonably high posterior probability of linkage. With $Z = 3$, the error rate in practice is about 5 %. For genome-wide scans testing many markers, higher thresholds apply.

::: example A LOD score from a small family set {#ex-lod}
In a set of families with a dominant trait and a DNA marker, 20 meioses are phase-known and informative, of which 2 are recombinant. Compute $\hat r$ and the maximum LOD score. Is there significant evidence of linkage?
::: solution
$\hat r = 2/20 = 0.10$. By [[#eq-lod-phase-known]],

$$
Z(0.1) = 2\log_{10}0.1 + 18\log_{10}0.9 + 20\log_{10}2 = -2.000 - 0.824 + 6.021 = 3.20 .
$$

Since $3.20 \ge 3$, there is significant evidence of linkage at about 10 cM. For comparison $Z(0.05) = 3.02$ and $Z(0.2) = 2.88$, so the data favour a distance near 10 cM but cannot pin it down precisely; an approximate support interval is the range of $r$ over which $Z$ is within 1 unit of its maximum. Note that $Z(0) = -\infty$: a single recombinant rules out $r = 0$.
:::
:::

::: widget plot
f: R*log10(x) + (N - R)*log10(1 - x) + N*log10(2)
x: 0.005, 0.5
y: -4, 6
sliders: N=20:1:60:1; R=2:0:30:1
hlines: 3; -2
caption: The LOD score [[#eq-lod-phase-known]] against the recombination frequency $r$ for $N$ phase-known meioses of which $R$ are recombinant. The curve peaks at $\hat r = R/N$ and is zero at $r = 0.5$. The horizontal lines mark the conventional thresholds: $Z \ge 3$ for linkage, $Z \le -2$ for exclusion. With $N = 20$ and $R = 2$ the peak just clears 3; try $N = 10$, $R = 0$ (peak 3.0 at $r \to 0$), and see how many meioses are needed when $R/N$ is 0.2 or more. Keep $R \le N$.
:::

```python
# LOD score for phase-known meioses and its maximum (no numpy needed)
from math import log10

def lod(r, N, R):
    """Z(r) = log10 L(r)/L(1/2) for N meioses with R recombinants, 0 < r <= 0.5."""
    return R * log10(r) + (N - R) * log10(1 - r) + N * log10(2)

N, R = 20, 2
grid = [i / 1000 for i in range(1, 501)]           # r from 0.001 to 0.5
best = max(grid, key=lambda r: lod(r, N, R))
print(best, round(lod(best, N, R), 2))             # 0.1 3.2
```

The method extends to phase-unknown families (the likelihood averages over the two possible phases), to incomplete penetrance and to many markers at once (multipoint linkage analysis). In the 1980s and 1990s linkage analysis with DNA markers — following the proposal by David Botstein, Ray White, Mark Skolnick and Ronald Davis (1980) to use restriction fragment length polymorphisms as markers — located the genes for Huntington's disease (1983), cystic fibrosis (1985–89) and many other Mendelian conditions, leading to their cloning. The human genetic map is about 3600 cM long in total (sex-averaged; the female map is roughly 1.6 times longer than the male), so with a genome of $3.1\times10^9$ bp, 1 cM corresponds on average to roughly 1 Mb — but crossovers cluster in **hotspots** a few kilobases wide, positioned in humans and mice largely by the protein PRDM9, so the local relation between genetic and physical distance varies enormously. Linkage disequilibrium mapping in populations is treated in [[population-genetics/linkage-disequilibrium]].

::: application Marker-assisted breeding
Plant and animal breeders use linkage to select for genes they cannot easily score. If a disease-resistance allele lies 2 cM from a DNA marker, selecting seedlings that carry the marker allele in coupling with resistance selects the resistance allele in 98 % of cases, without exposing the plants to the pathogen. Two flanking markers, one on each side, raise the accuracy further, since an error now requires a double crossover. Such **marker-assisted selection** has been used to introduce resistance and quality genes into rice, wheat and maize lines.
:::

::: history
Bateson, Saunders and Punnett reported partial coupling in sweet peas in 1905. Frans Alfons Janssens proposed in 1909 (the "chiasmatype theory") that chiasmata are sites of exchange between chromatids. Morgan, studying X-linked genes in *Drosophila*, proposed in 1911 that genes are arranged linearly and separated by crossing over in proportion to their distance, and Alfred Sturtevant published *The linear arrangement of six sex-linked factors in* Drosophila, *as shown by their mode of association* in 1913. Hermann Muller analysed interference in 1916. J. B. S. Haldane derived his mapping function in 1919 and D. D. Kosambi published his in 1944. Harriet Creighton and Barbara McClintock in maize, and Curt Stern in *Drosophila*, showed in 1931 that genetic recombination is accompanied by exchange of visibly marked chromosome segments. Newton Morton introduced sequential LOD-score testing for human linkage in 1955.
:::

::: summary
- Linked loci are transmitted together more often than independent assortment predicts. Phase may be coupling (*AB*/*ab*) or repulsion (*Ab*/*aB*); recombinant gametes carry new combinations.
- The recombination frequency $r$ is estimated from a test cross as $R/N$; it lies between 0 and $\tfrac12$, because a crossover at the four-strand stage makes only two of four chromatids recombinant (Mather: $r = \tfrac12(1 - p_0)$).
- Map distance is the mean number of crossovers per chromatid, in morgans; 1 cM ≈ 1 % recombination for short intervals. Haldane: $r = \tfrac12(1 - e^{-2d})$, derived from a Poisson process of crossovers; Kosambi: $r = \tfrac12\tanh(2d)$, allowing interference.
- In a three-point cross the parental classes are most frequent and the double crossovers least; the switched allele in the DCO identifies the middle gene. Double crossovers count in both intervals. Interference $I = 1 - c$, with $c$ = observed/expected DCO.
- In human families linkage is assessed by the LOD score $Z(r) = \log_{10}[L(r)/L(\tfrac12)]$; $Z \ge 3$ is significant, and scores from independent families add.
- Genetic and physical distances are related only on average (about 1 cM per Mb in humans), because crossovers cluster in hotspots and differ between the sexes.
:::

## Exercises

::: exercise A recombination frequency {level=1 check="0.15"}
A test cross of *AB*/*ab* × *ab*/*ab* gives 425 *AB*, 425 *ab*, 76 *Ab* and 74 *aB* offspring. What is $\hat r$?
::: solution
Recombinants are *Ab* and *aB*: $R = 150$, $N = 1000$, $\hat r = 0.15$, i.e. 15 cM.
:::
:::

::: exercise Gametes from a repulsion heterozygote {level=1 check="0.1"}
Two loci are 20 cM apart (assume $r = 0.20$). What fraction of the gametes of an *Ab*/*aB* individual are *AB*?
::: solution
*AB* is recombinant for a repulsion heterozygote. The two recombinant types *AB* and *ab* share $r = 0.20$ equally, so *AB* is $0.10$.
:::
:::

::: exercise Haldane distance {level=1 check="25.5"}
Using Haldane's mapping function, what map distance in cM corresponds to $r = 0.20$ (one decimal place)?
::: solution
$d = -\tfrac12\ln(1 - 0.4) = -\tfrac12\ln0.6 = 0.2554$ M $= 25.5$ cM.
:::
:::

::: exercise An F2 with linkage {level=2 check="0.16"}
A coupling double heterozygote *AB*/*ab* with $r = 0.20$ in both sexes is self-fertilised. What fraction of the offspring are *ab*/*ab*?
::: solution
The *ab* gamete is parental, with frequency $(1 - r)/2 = 0.40$ in each sex. An *ab*/*ab* zygote needs *ab* from both: $0.40^2 = 0.16$, compared with $\tfrac1{16} = 0.0625$ for unlinked loci. (For a repulsion heterozygote it would be $0.10^2 = 0.01$; the frequency of the double recessive class in an F2 is a standard way to estimate $r$ in plants.)
:::
:::

::: exercise Kosambi distance {level=2 check="34.7"}
Using Kosambi's mapping function, convert $r = 0.30$ into a map distance in cM (one decimal place).
::: solution
$d = \tfrac14\ln\dfrac{1.6}{0.4} = \tfrac14\ln4 = 0.3466$ M $= 34.7$ cM.
:::
:::

::: exercise A three-point cross with unknown phase {level=2}
A triple heterozygote for recessive alleles *x*, *y*, *z* of unknown phase is test-crossed. The 1000 offspring are: *x* + *z* 360, + *y* + 348, *x* + + 82, + *y z* 78, *x y* + 64, + + *z* 58, *x y z* 6, + + + 4. (a) Give the arrangement of alleles in the heterozygote and the gene order. (b) Calculate the map distances. (c) Calculate the coefficient of coincidence and the interference.
::: solution
(a) Parental classes (largest): *x* + *z* and + *y* +, so the heterozygote was *x* + *z* / + *y* +. Double crossovers (smallest): *x y z* and + + +. Comparing *x y z* with *x* + *z*, only *y* has switched, so *y* is in the middle: order *x*–*y*–*z*, and the heterozygote is *x* + *z* / + *y* +.

(b) Region *x*–*y*: crossovers here turn *x* + *z* into *x y* + and + *y* + into + + *z*: $64 + 58 = 122$. Region *y*–*z*: *x* + + and + *y z*: $82 + 78 = 160$. So $r_{xy} = (122 + 10)/1000 = 0.132$ (13.2 cM) and $r_{yz} = (160 + 10)/1000 = 0.170$ (17.0 cM).

(c) Expected DCO $= 0.132\times0.170\times1000 = 22.4$; observed 10; $c = 0.45$, $I = 0.55$.
:::
:::

::: exercise LOD for ten non-recombinants {level=2 check="3.01"}
Ten phase-known meioses show no recombination between a trait locus and a marker. What is the maximum LOD score (two decimal places)? At what $r$ is it attained?
::: solution
With $R = 0$, $Z(r) = 10\log_{10}(1 - r) + 10\log_{10}2$, which is largest at $r = 0$: $Z_{\max} = 10\log_{10}2 = 3.01$. Ten non-recombinant phase-known meioses are just enough for significant linkage.
:::
:::

::: exercise Interpreting a failed additivity {level=3}
Pairwise test crosses give the recombination frequencies $r_{AB} = 0.10$, $r_{BC} = 0.25$ and $r_{AC} = 0.30$. (a) What is the gene order? (b) Explain why $r_{AC} < r_{AB} + r_{BC}$. (c) Under Haldane's function, convert each frequency into a map distance and check whether the distances are additive. What does the result suggest about interference?
::: solution
(a) The largest frequency is between A and C, so B is in the middle: A–B–C.

(b) Double crossovers, one in A–B and one in B–C, are recombinant in both short intervals but restore the parental combination for A and C, so they are counted in $r_{AB}$ and $r_{BC}$ but not in $r_{AC}$.

(c) $d_{AB} = -\tfrac12\ln0.8 = 11.2$ cM, $d_{BC} = -\tfrac12\ln0.5 = 34.7$ cM, $d_{AC} = -\tfrac12\ln0.4 = 45.8$ cM. Since $11.2 + 34.7 = 45.8$, Haldane distances are additive here (to rounding): indeed $1 - 2r_{AC} = 0.4 = (1 - 2r_{AB})(1 - 2r_{BC}) = 0.8\times0.5$, which is exactly the relation implied by no interference. The data therefore show no evidence of interference; in general $r_{AC} = r_{AB} + r_{BC} - 2c\,r_{AB}r_{BC}$, which here gives $c = 1$; with positive interference ($c < 1$), $r_{AC}$ would have been larger than 0.30.
:::
:::

::: exercise Planning a linkage study {level=3}
A marker is suspected to lie about 10 cM from a trait locus ($r = 0.1$). (a) For $N$ phase-known meioses, the expected LOD score at the true $r$ is $N[r\log_{10}(2r) + (1-r)\log_{10}(2(1-r))]$. Explain where this comes from. (b) How many phase-known meioses are needed for the expected LOD to reach 3? (c) Why would more be needed in practice?
::: solution
(a) Each meiosis contributes $\log_{10}(2r)$ if recombinant and $\log_{10}(2(1-r))$ if not ([[#eq-lod-phase-known]] with $N = 1$). At the true $r$, a meiosis is recombinant with probability $r$, so the expected contribution per meiosis is $r\log_{10}(2r) + (1-r)\log_{10}(2(1-r))$, and expectations add over meioses.

(b) Per meiosis: $0.1\log_{10}0.2 + 0.9\log_{10}1.8 = -0.0699 + 0.2297 = 0.1598$. So $N = 3/0.1598 = 18.8$: about 19 meioses.

(c) Real families include meioses of unknown phase, uninformative (homozygous) markers, uncertain diagnoses and incomplete penetrance, all of which reduce the information per meiosis; and an expected LOD of 3 means a substantial chance that the observed LOD falls short. Studies are therefore designed with power calculations, often by simulation.
:::
:::
