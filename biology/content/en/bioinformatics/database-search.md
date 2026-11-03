A laboratory has sequenced a gene from a bacterium isolated from a hot spring. Nothing is known about the protein it encodes. The first thing anyone does is to search the public databases for similar sequences: if the protein resembles a known family of enzymes, that is the best available hypothesis about its function, and it costs a few seconds. Searches like this are run millions of times a day, and the tool used for most of them is **BLAST**, the Basic Local Alignment Search Tool of Stephen Altschul, Warren Gish, Webb Miller, Eugene Myers and David Lipman (1990) — one of the most cited scientific papers of the 1990s.

Two problems have to be solved. The first is speed: the Smith–Waterman algorithm of [[bioinformatics/pairwise-alignment]] would find the best local alignment of the query with every database sequence, but a modern protein database is so large that exact alignment against all of it is slow. The second problem is subtler and more important. Every query has a best hit, even a random sequence; the question is whether a hit is better than chance would produce in a search of that size. This chapter covers the heuristics that make BLAST fast and the theory of Samuel Karlin and Altschul (1990) that turns a score into an **E-value**. The logic of hypothesis testing and of multiple comparisons is assumed from [[biostatistics/hypothesis-testing]].

## Why heuristics are needed

Smith–Waterman takes time proportional to the product of the query length $m$ and the total database length $n$. For a protein of 300 residues against a database of $10^{11}$ residues (an illustrative size, of the order of the large non-redundant protein collections in 2026), that is $3\times10^{13}$ matrix cells. Even at $10^{10}$ cell updates per second, the speed of well-vectorised implementations on a modern multi-core processor, one query takes about an hour; a genome's worth of queries takes months. Exact search is used for small databases and for checking, but most searches use heuristics that look only where an alignment is likely to be.

The central observation is that alignments of homologous sequences almost always contain short, high-scoring stretches without gaps. Find those first, cheaply, and spend effort only around them.

## How BLAST works

::: algorithm BLAST (protein search, simplified) {#alg-blast}
Given a query $q$, a database, a substitution matrix, a word length $w$ and a threshold $T$:

1. **Seed words.** For each position of the query, list every word of length $w$ (for proteins $w = 3$) that scores at least $T$ against the query word under the substitution matrix — the query word's **neighbourhood**. Store the words in a lookup table recording where each occurs in the query.
2. **Scan.** Read through the database; at every position look up the database word in the table. Each match is a **hit**: a pair of positions, one in the query and one in the database, on the same diagonal of the alignment matrix.
3. **Two-hit trigger.** Keep only diagonals with two non-overlapping hits within a distance $A$ of each other (typically 40 residues).
4. **Ungapped extension.** Extend the alignment from the hits in both directions without gaps, adding substitution scores and stopping when the running score falls more than $X$ below the best seen ("X-drop"). The result is a **high-scoring segment pair** (HSP).
5. **Gapped extension.** If the HSP scores above a threshold, run a gapped dynamic-programming alignment outward from its centre, again abandoning cells whose score drops too far below the best.
6. **Evaluate** each alignment's statistical significance (below), and report those with E-values below a cut-off, sorted by E-value.
:::

For DNA the seeds are **exact** matches of $w = 11$ bases (or $w = 28$ in the faster *megablast* mode for near-identical sequences), and the neighbourhood step is omitted. The 1990 BLAST extended single hits without gaps; the two-hit trigger and gapped extension were added in the "Gapped BLAST and PSI-BLAST" paper of Altschul and colleagues (1997), which also made the method about three times faster.

The parameters trade speed for sensitivity. A larger $w$ or $T$ means fewer seeds, faster scanning and fewer extensions, but a greater chance of missing a homologous region that happens not to contain a qualifying word. The neighbourhood idea is what lets protein BLAST find distant homologues: a query word `PQG` has a neighbourhood including `PEG` and `PRG` because those words score above $T$ against it, so seeds need not be identical.

::: example How many chance seeds? {#ex-seeds}
A nucleotide query of 1,000 bases is searched against $10^9$ bases of DNA with exact seeds of $w = 11$. Assuming random sequence with equal base frequencies, about how many seed hits occur by chance? What does this imply for the later stages?
::: solution
A given query word and a given database position match with probability $4^{-11} = 2.4\times10^{-7}$. There are about $10^3$ query words and $10^9$ database positions (one strand), so the expected number of chance hits is $10^{12}/4^{11} = 2.4\times10^5$.

Almost all of them are noise: an 11-base exact match carries a score of 11, which is easily reached by chance in a search of $10^{12}$ position pairs. They must be discarded cheaply, by an ungapped extension that stops within a few bases once the score drops, before any expensive gapped alignment is attempted. With $w = 28$ the expected number of chance seeds falls to $10^{12}/4^{28} \approx 10^{-5}$, which is why megablast is so fast — and why it misses all but near-identical matches.
:::
:::

::: example What seeds miss {#ex-sensitivity}
A 100-base region of a homologous gene is 80 % identical to the query, with mismatches scattered independently. What is the probability that it contains at least one run of 11 identical bases (so that a $w = 11$ seed can be found)? Of 28? Compare with 70 % identity.
::: solution
Model each position as identical with probability $p$, independently. The probability of no run of $w$ identities in $L$ positions can be computed by a short dynamic programme over the length of the current run (exercise [[#exr-runs]]). The results are:

| identity | $w = 11$ | $w = 28$ |
|---|---|---|
| 90 % | 0.999 | 0.39 |
| 80 % | 0.87 | 0.030 |
| 70 % | 0.44 | 0.001 |

At 80 % identity an 11-mer seed is found in 87 % of such regions, but a 28-mer in only 3 %. Below about 70 % identity even 11-mers fail more often than not, and nucleotide searches stop being useful; this is one reason why coding sequences should be compared at the protein level (below). Bin Ma, John Tromp and Ming Li (2002) showed that **spaced seeds**, which require matches only at a pattern of positions such as `111010010100110111`, are markedly more sensitive than contiguous seeds of the same weight, because their hits are less correlated with one another.
:::
:::

## The statistics of alignment scores

Suppose BLAST reports a local alignment with score 100. Is that good? The answer depends on the score system, the lengths of the query and database, and the composition of the sequences. Karlin and Altschul's theory answers it for ungapped alignments exactly, in the limit of long sequences; for gapped alignments the same form holds empirically.

The behaviour of the best score is not that of a typical score. In a search we take the **maximum** over an enormous number of possible segment pairs, and maxima have their own distributions. For many independent variables with exponential tails, the maximum follows a Gumbel, or **extreme-value**, distribution, not a normal distribution.

::: proposition Karlin–Altschul statistics {#prop-ka}
Consider two random sequences of lengths $m$ and $n$, with residues drawn independently from background frequencies $p_a$, and a substitution matrix $s(a, b)$ such that

1. the expected score of a random pair is negative, $\sum_{a,b}p_ap_bs(a, b) < 0$, and
2. at least one score $s(a, b)$ is positive.

Let $\lambda$ be the unique positive solution of

$$
\sum_{a,b}p_ap_b\,e^{\lambda s(a, b)} = 1.
$$ {#eq-lambda}

Then for large $m$ and $n$ the number of distinct high-scoring segment pairs with score at least $S$ is approximately Poisson with mean

$$
E = Kmn\,e^{-\lambda S},
$$ {#eq-evalue}

where $K$ is a constant that depends on the score system and composition. Consequently the probability that the best ungapped local alignment scores at least $S$ is $P = 1 - e^{-E}$, a Gumbel distribution for the maximum score.
:::

We shall not prove the theorem, which rests on the theory of random walks with negative drift (Karlin and Altschul 1990; Amir Dembo and Karlin, 1991). The intuition is clear, however. Along any diagonal, the running score of an alignment is a random walk with negative drift. To reach a high score $S$ before falling back requires a run of luck whose probability decays exponentially, like $e^{-\lambda S}$; the rate $\lambda$ is fixed by [[#eq-lambda]], the condition that makes $e^{\lambda\times(\text{score})}$ a fair game. There are about $mn$ places where such a run could start, so the expected number of high-scoring segments is proportional to $mn\,e^{-\lambda S}$, and the constant $K$ corrects for the fact that nearby starting points are not independent.

The two conditions are those needed for local alignment to make sense: with a non-negative expected score, alignments of random sequences would extend indefinitely ([[bioinformatics/pairwise-alignment]]).

::: example λ for a DNA scoring scheme {#ex-lambda}
With equal base frequencies, a random pair of bases matches with probability $\frac14$. Find $\lambda$ for scores of $+1$ for a match and $-1$ for a mismatch.
::: solution
The expected score is $\tfrac14 - \tfrac34 = -\tfrac12 < 0$, so the conditions hold. Equation [[#eq-lambda]] becomes

$$
\tfrac14e^{\lambda} + \tfrac34e^{-\lambda} = 1.
$$

Multiply by $4e^\lambda$: $e^{2\lambda} - 4e^\lambda + 3 = 0$, that is $(e^\lambda - 1)(e^\lambda - 3) = 0$. The root $e^\lambda = 1$ gives $\lambda = 0$, which always solves the equation and is excluded; the positive root is $\lambda = \ln 3 = 1.0986$. So each extra point of score makes a chance segment three times rarer. For the common blastn scheme $+1/-3$ the equation $\tfrac14e^{\lambda} + \tfrac34e^{-3\lambda} = 1$ has no closed form; solving numerically gives $\lambda = 1.374$.
:::
:::

The equation for $\lambda$ has a striking consequence. Define $q_{ab} = p_ap_be^{\lambda s(a,b)}$. By [[#eq-lambda]] these numbers sum to 1, so they form a probability distribution over pairs, and

$$
s(a, b) = \frac{1}{\lambda}\ln\frac{q_{ab}}{p_ap_b}.
$$

**Every** scoring matrix satisfying the two conditions is therefore a log-odds matrix for some target frequencies $q_{ab}$ (Altschul, 1991) — the frequencies of aligned pairs that the matrix is best at detecting. A matrix chosen for convenience still makes an implicit assumption about how similar the sequences it should find are, and it is most sensitive when that assumption matches the truth (see exercise [[#exr-target]]).

### Bit scores and E-values

Raw scores depend on the scale of the matrix, so BLAST reports a normalised score.

::: definition Bit score and E-value {#def-bitscore}
The **bit score** of an alignment with raw score $S$ is

$$
S' = \frac{\lambda S - \ln K}{\ln 2},
$$ {#eq-bits}

and its **E-value** is the expected number of alignments with at least this score in a search of a query of length $m$ against a database of total length $n$ by chance alone:

$$
E = mn\,2^{-S'}.
$$ {#eq-ebits}

The corresponding **P-value**, the probability of at least one such alignment, is $P = 1 - e^{-E}$, which is approximately $E$ when $E$ is small.
:::

Substituting [[#eq-bits]] into [[#eq-ebits]] recovers [[#eq-evalue]], so nothing new has been assumed. The advantage is that a bit score means the same thing whatever the matrix: each extra bit halves the E-value. The quantity $mn$ is the **search space**. In practice BLAST uses slightly smaller **effective lengths**, because an alignment cannot start in the last few residues of a sequence (the "edge effect").

For **gapped** alignments no theory gives $\lambda$ and $K$, but simulations show that the Gumbel form still holds, and BLAST uses values estimated for each matrix and gap penalty: for BLOSUM62 with gap costs 11 and 1, $\lambda = 0.267$ and $K = 0.041$ (per raw-score unit), against $\lambda = 0.318$ and $K = 0.134$ for ungapped alignment. BLAST also applies, by default in protein searches, **composition-based statistics** (introduced by Alejandro Schäffer and colleagues in 2001), adjusting scores for queries or targets of unusual amino-acid composition, which otherwise produce inflated scores.

::: example From raw score to E-value {#ex-evalue}
A protein query of 350 residues is searched with BLOSUM62 and gap costs 11/1 ($\lambda = 0.267$, $K = 0.041$). A hit has raw score 100. Compute its bit score and its E-value against databases of $10^7$, $10^9$ and $10^{11}$ residues, and interpret.
::: solution
By [[#eq-bits]], $S' = (0.267\times100 - \ln0.041)/\ln2 = (26.7 + 3.194)/0.6931 = 43.1$ bits. Then $E = 350\,n\,2^{-43.1}$:

| database size $n$ | $E$ | $P = 1 - e^{-E}$ |
|---|---|---|
| $10^7$ | $3.6\times10^{-4}$ | $3.6\times10^{-4}$ |
| $10^9$ | $0.036$ | $0.036$ |
| $10^{11}$ | $3.6$ | $0.97$ |

The same alignment is convincing in a search of a small, specialised database, marginal against a medium one, and meaningless against a very large one, where between three and four alignments this good are expected by chance. The bit score describes the alignment; the E-value describes the alignment *in the context of the search*. As databases grow, E-values for the same alignment grow in proportion.
:::
:::

::: widget plot
f: lmn - 0.30103*x
x: 20, 120
y: -30, 10
sliders: lmn=11:6:14:0.5
labels: \log_{10}E
hlines: -3; 0
caption: The logarithm of the E-value against bit score $S'$, from [[#eq-ebits]], for a search space $mn = 10^{\text{lmn}}$. Each bit lowers $\log_{10}E$ by $\log_{10}2 = 0.301$; each tenfold increase in the search space raises it by 1, shifting the line upwards. The dashed lines mark $E = 1$ and $E = 10^{-3}$. With $mn = 10^{11}$, a hit needs about 47 bits to reach $E = 10^{-3}$; with $mn = 10^{14}$, a search of a large database, about 57.
:::

::: widget plot
f: exp(-(x - u) - exp(-(x - u))); exp(-(x - u)^2/2)/sqrt(2*pi)
x: -4, 10
y: 0, 0.45
sliders: u=2:0:4:0.1
labels: \text{Gumbel (extreme value)}; \text{normal}
caption: The density of the Gumbel distribution of maximum scores (with $\lambda = 1$ and mode $u$), compared with a normal density of the same location and unit variance. The Gumbel is skewed to the right, with an upper tail that decays only exponentially, like $e^{-(x-u)}$, rather than like $e^{-(x-u)^2/2}$. A score four units above the mode has a Gumbel tail probability of about 0.018, but a normal tail probability of about $3\times10^{-5}$: treating maximum alignment scores as normal (as "Z-scores" sometimes implicitly do) greatly overstates their significance. The mode $u = \ln(Kmn)/\lambda$ moves to the right as the search space grows.
:::

The prediction that the mode of the best score grows like $\ln(mn)/\lambda$ is easy to test by simulation. The listing below solves [[#eq-lambda]] for the $+1/-1$ DNA scheme and then finds the best ungapped local alignment score of pairs of random sequences of three lengths. Each step quadruples the search space $mn$, which should add $\ln4/\lambda = 1.26$ to the mean best score.

```python
import math, random

def solve_lambda(scores, probs):
    """Positive root of sum(p * exp(lambda * s)) = 1, by bisection."""
    f = lambda lam: sum(p * math.exp(lam * s) for s, p in zip(scores, probs)) - 1
    lo, hi = 1e-9, 1.0
    while f(hi) < 0:
        hi *= 2
    for _ in range(100):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if f(mid) < 0 else (lo, mid)
    return (lo + hi) / 2

def best_ungapped(x, y, match=1, mismatch=-1):
    """Score of the maximal ungapped segment pair (Smith-Waterman without gaps)."""
    best, m, n = 0, len(x), len(y)
    for d in range(-(m - 1), n):              # each diagonal j - i = d
        run = 0
        for i in range(max(0, -d), min(m, n - d)):
            run = max(0, run + (match if x[i] == y[i + d] else mismatch))
            best = max(best, run)
    return best

lam = solve_lambda([1, -1], [0.25, 0.75])     # DNA, equal base frequencies
print("lambda =", round(lam, 4))
rng = random.Random(1)
rand_seq = lambda L: "".join(rng.choice("ACGT") for _ in range(L))
for L in (100, 200, 400):                     # search space m*n grows 4-fold each time
    s = [best_ungapped(rand_seq(L), rand_seq(L)) for _ in range(300)]
    print(L, "mean best score", round(sum(s) / len(s), 2))
print("predicted shift per 4-fold search space:", round(math.log(4) / lam, 2))
```

```
lambda = 1.0986
100 mean best score 7.3
200 mean best score 8.52
400 mean best score 9.9
predicted shift per 4-fold search space: 1.26
```

The observed shifts, 1.22 and 1.38, agree with the prediction within the sampling error of 300 replicates. Notice also how high chance scores are: two unrelated sequences of 400 bases typically contain a segment pair scoring about 10, such as 10 consecutive matches.

## Interpreting a search

::: quiz
A protein search reports a hit with E-value 0.02. Which statement is correct?
- [ ] The probability that the hit is a true homologue is 98 %.
- [ ] The two proteins are 2 % different.
- [x] In a search of this size, about 0.02 alignments scoring at least this well would be expected between the query and unrelated sequences.
- [ ] The hit would remain at E = 0.02 if the database doubled in size.
::: solution
The E-value is the expected number of chance alignments at least this good in this search; it says nothing directly about percent identity, and it is not the probability that the hit is real (that would need a prior, as in any Bayesian argument). Doubling the database doubles the search space, so the same alignment would have $E = 0.04$.
:::
:::

What counts as significant? For protein searches, alignments with $E < 10^{-3}$ almost always reflect homology, and many genuine homologues have larger E-values; William Pearson's reviews suggest $10^{-3}$ as a reasonable threshold for a single search, but the right threshold depends on how many searches are made and on the cost of a false lead. Five practical points matter as much as the threshold.

- **Search proteins, not DNA, when sequences code for proteins.** The genetic code's degeneracy means that synonymous sites diverge quickly and add noise to DNA alignments, while substitution matrices capture which amino-acid changes are tolerated. A protein search detects homology across billions of years; a DNA search, typically a few hundred million at best. BLASTX (translated query against proteins) and TBLASTN (protein against translated DNA) cover the mixed cases.
- **Mask low-complexity sequence.** Regions such as poly-glutamine or `CACACA...` repeats violate the assumptions of [[#prop-ka]] and produce high-scoring alignments between unrelated sequences. Filters such as SEG for proteins (John Wootton and Scott Federhen, 1993) and DUST for DNA mask them before searching.
- **Look at the alignment, not just the E-value.** Does the hit cover the region you care about? A significant alignment to one domain of a multidomain protein says nothing about the others.
- **Similarity is evidence of homology, not of shared function.** Homologues can have different functions, especially paralogues after gene duplication, and many database annotations were themselves transferred by similarity from other entries, so errors propagate.
- **Orthologues are not simply best hits.** A common heuristic for identifying orthologues between two genomes is the **reciprocal best hit**: gene $a$ in genome A and gene $b$ in genome B are each other's best hit. It is fast but fails after duplications and gene loss; phylogenetic methods ([[bioinformatics/phylogenetic-inference]]) are more reliable.

::: warning "A low E-value means the same function"
An E-value of $10^{-50}$ is overwhelming evidence that two proteins share an ancestor, but no evidence that they do the same thing. Lens crystallins of vertebrates are homologous to metabolic enzymes such as lactate dehydrogenase and argininosuccinate lyase, recruited to a structural role ("gene sharing", Joram Piatigorsky and Graeme Wistow, 1989). Conversely, a large E-value does not show that proteins are unrelated: many homologues share too little sequence for a pairwise search to detect them, which is what profile methods ([[bioinformatics/multiple-alignment]]) are for. And an E-value is not a probability of error: it is an expected count, valid only under the random-sequence model.
:::

### Faster searches and iterated searches

Several developments extend the BLAST approach.

- **PSI-BLAST** (Position-Specific Iterated BLAST, 1997) builds a profile from the significant hits of a first search and searches again with it, repeating until no new sequences are found. Profiles are much more sensitive than single sequences, but if a false positive enters the profile it can recruit unrelated sequences in later rounds ("profile corruption").
- **DIAMOND** (Benjamin Buchfink, Chao Xie and Daniel Huson, 2015) and **MMseqs2** (Martin Steinegger and Johannes Söding, 2017) use spaced seeds, reduced amino-acid alphabets, double indexing and vectorised alignment to be orders of magnitude faster than BLAST at similar sensitivity, which makes it possible to annotate metagenomes of billions of reads ([[genomics/metagenomics]]).
- **Structure search.** Foldseek (Michel van Kempen, Steinegger and colleagues, published in 2024) encodes local protein structure as a 20-letter alphabet so that predicted structures can be searched with sequence-search machinery, detecting relationships invisible at the sequence level.

::: application Identifying a pathogen in a sample
Metagenomic sequencing of clinical or environmental samples produces millions of reads of unknown origin. Classifying them — which come from humans, which from known bacteria or viruses, and which from nothing in the database — is a database-search problem at enormous scale, solved with $k$-mer-based classifiers and fast aligners such as DIAMOND. The statistics of this chapter matter: with billions of comparisons, chance hits to rare taxa are expected, and a report of a pathogen based on a handful of short, marginal hits must be confirmed by independent evidence. Diagnostic use is regulated and is covered in Medicine Atlas ([infectious diseases](/learn/medicine/course.php?c=infectious-diseases)).
:::

::: history
The first rapid database search programs were David Lipman and William Pearson's FASTP (1985) and FASTA (1988), which seeded alignments with short exact word matches found by hashing. BLAST (1990) combined a cleaner word-based heuristic with the newly derived extreme-value statistics of Karlin and Altschul, published the same year in the *Proceedings of the National Academy of Sciences*, and its E-values gave biologists a common language for significance. Gapped BLAST and PSI-BLAST followed in 1997, and the NCBI's BLAST+ reimplementation in 2009. Earlier, Russell Doolittle's 1983 discovery, by a database search, that the oncogene product of simian sarcoma virus was almost identical to platelet-derived growth factor had shown what database searching could do: it connected a cancer-causing gene to a normal growth signal and made sequence comparison a standard tool of molecular biology.
:::

::: summary
- Exact local alignment against a large database is slow; BLAST seeds alignments with short words (neighbourhood words for proteins, exact $w = 11$ or $28$ for DNA), requires two hits on a diagonal, extends without and then with gaps, and abandons extensions whose score drops ([[#alg-blast]]). Longer seeds are faster but less sensitive.
- For random sequences, the number of local alignments scoring at least $S$ is approximately Poisson with mean $E = Kmn\,e^{-\lambda S}$, where $\lambda$ solves $\sum p_ap_be^{\lambda s(a,b)} = 1$ ([[#prop-ka]]); the maximum score follows a Gumbel distribution, not a normal one.
- Every valid scoring matrix is implicitly a log-odds matrix with target frequencies $q_{ab} = p_ap_be^{\lambda s(a,b)}$.
- The bit score $S' = (\lambda S - \ln K)/\ln 2$ is independent of the matrix scale; $E = mn\,2^{-S'}$ depends on the search space and grows with the database ([[#def-bitscore]]).
- $E < 10^{-3}$ usually indicates homology; search at the protein level, mask low-complexity regions, inspect alignments, and do not equate homology with function.
- PSI-BLAST, DIAMOND, MMseqs2 and structure-based search extend the approach in sensitivity and scale.
:::

## Exercises

::: exercise An E-value from a bit score {level=1 check="0.0546"}
A query of 300 residues is searched against a database of $2\times10^8$ residues. What is the E-value of a hit with a bit score of 40 (three significant figures)?
::: solution
$E = mn\,2^{-S'} = 300\times2\times10^8\times2^{-40} = 6\times10^{10}/1.0995\times10^{12} = 0.0546$.
:::
:::

::: exercise From E to P {level=1 check="0.0488"}
Convert an E-value of 0.05 into a P-value (three significant figures). Then do the same for $E = 3$.
::: solution
$P = 1 - e^{-0.05} = 0.0488$, very close to $E$. For $E = 3$, $P = 1 - e^{-3} = 0.950$: when $E$ is large, $P$ approaches 1 and stops distinguishing between poor and very poor hits, which is one reason BLAST reports E-values.
:::
:::

::: exercise Doubling the database {level=1}
A hit has a bit score of 52 and an E-value of $2\times10^{-4}$. The database then doubles in size. What happens to the bit score and to the E-value?
::: solution
The bit score depends only on the alignment and the score system, so it stays at 52. The E-value is proportional to the search space, so it doubles to $4\times10^{-4}$.
:::
:::

::: exercise λ for another scoring scheme {level=2 check="0.6337"}
Find $\lambda$ for DNA scores of $+2$ for a match and $-3$ for a mismatch, with equal base frequencies, to four decimal places.
::: hint
Solve $\tfrac14e^{2\lambda} + \tfrac34e^{-3\lambda} = 1$ numerically, for example by bisection as in the listing.
:::
::: solution
The expected score is $\tfrac14\times2 - \tfrac34\times3 = -1.75 < 0$, so a positive root exists. Bisection gives $\lambda = 0.6337$. (Check: $\tfrac14e^{1.2675} + \tfrac34e^{-1.9011} = 0.888 + 0.112 = 1.000$.)
:::
:::

::: exercise Implied target frequencies {#exr-target level=2}
Using $q_{ab} = p_ap_be^{\lambda s(a,b)}$, find the frequency of identities in the alignments for which each DNA scoring scheme is optimal: (a) $+1/-1$ ($\lambda = \ln3$); (b) $+1/-3$ ($\lambda = 1.374$); (c) $+2/-3$ ($\lambda = 0.6337$). Which would you choose to find homologous genes in two mammals that are about 85 % identical, and which to map reads to their own genome?
::: solution
The total target frequency of identities is $4\times\tfrac1{16}e^{\lambda s_\text{match}} = \tfrac14e^{\lambda s_\text{match}}$.

(a) $\tfrac14\times3 = 0.75$: the scheme is tuned to 75 % identity.
(b) $\tfrac14e^{1.374} = 0.988$: tuned to about 99 % identity.
(c) $\tfrac14e^{1.2675} = 0.888$: tuned to about 89 % identity.

For genes about 85 % identical, $+2/-3$ is the closest match. For reads mapped to their own genome, which differ by sequencing errors and a few variants, $+1/-3$ (as megablast uses) is appropriate. Using $+1/-3$ for 75 % identical sequences would penalise their many mismatches so heavily that alignments would break into short fragments.
:::
:::

::: exercise Runs of identities {#exr-runs level=2}
Explain how to compute the probability that $L$ independent positions, each identical with probability $p$, contain no run of $w$ consecutive identities. Use your method to check that for $L = 4$, $w = 2$ and $p = \tfrac12$ the probability is $\tfrac{8}{16}$.
::: solution
Keep a vector $u_r$, $r = 0, \ldots, w-1$, of probabilities that the sequence so far contains no run of $w$ and ends in a run of exactly $r$ identities. Start with $u_0 = 1$. At each new position, a mismatch (probability $1 - p$) moves every state to $r = 0$, and an identity moves $r$ to $r + 1$, the mass reaching $r = w$ being discarded. After $L$ steps, $\sum_ru_r$ is the answer.

For $L = 4$, $w = 2$, $p = \tfrac12$: start $(u_0, u_1) = (1, 0)$; after one step $(\tfrac12, \tfrac12)$; after two, $(\tfrac12, \tfrac14)$; after three, $(\tfrac38, \tfrac14)$; after four, $(\tfrac{5}{16}, \tfrac{3}{16})$, total $\tfrac{8}{16}$. Directly: of the 16 binary strings of length 4, those without `11` are 0000, 0001, 0010, 0100, 0101, 1000, 1001, 1010 — eight.
:::
:::

::: exercise Reading a hit list {level=3}
A BLASTP search with a 420-residue query against a protein database of $10^9$ residues returns, among others, the following (illustrative) hits, with E-values computed as $mn\,2^{-S'}$:

| hit | bit score | E-value | identity | query coverage |
|---|---|---|---|---|
| 1 | 690 | 0 | 82 % | 99 % |
| 2 | 154 | $2\times10^{-35}$ | 31 % | 95 % |
| 3 | 61 | $2\times10^{-7}$ | 24 % | 30 % (residues 15–140) |
| 4 | 38 | 1.5 | 45 % | 6 % (residues 300–324) |
| 5 | 33 | 49 | 28 % | 20 % |

(a) Which hits are evidence of homology? (b) Hit 4 has the highest identity after hit 1. Why is it not convincing? (c) What does hit 3 tell you that hit 2 does not? (d) Hit 1's E-value is reported as 0. What does that mean?
::: solution
(a) Hits 1, 2 and 3 have E-values far below $10^{-3}$, so homology is well supported. Hits 4 and 5 are consistent with chance.

(b) It is short (25 residues): high identity over a short stretch is easily produced by chance in a large search. Residues 300–324 should also be checked for low complexity, a common cause of such hits. Percent identity is meaningless without length and the search space, which is exactly what the E-value combines.

(c) Hit 2 is homologous over almost the entire query. Hit 3 matches only residues 15–140: it probably shares a single domain, so any function inferred from it applies to that domain only.

(d) By the formula, $E = 4.2\times10^{11}\times2^{-690} \approx 10^{-196}$, smaller than the smallest value the program prints, so it is shown as 0. It does not mean that the probability of a chance match is literally zero.
:::
:::

::: exercise Many searches {level=3}
A genome project searches each of its 4,000 predicted proteins against a database and calls a protein "annotated" if its best hit has $E < 0.01$. (a) About how many proteins with no homologue in the database will nevertheless be annotated by chance? (b) How would you set the threshold so that the expected number of false annotations across the whole project is below 1? (c) Why does lowering the threshold have a cost?
::: solution
(a) For a protein with no homologue, the chance of a hit with $E < 0.01$ is $P = 1 - e^{-0.01} \approx 0.01$. If, say, 1,000 of the 4,000 proteins have no homologues, about 10 will be annotated wrongly. (Every protein makes its own search, so the per-search E-value does not account for the project-wide number of tests.)

(b) Require $E < 1/4{,}000 = 2.5\times10^{-4}$, a Bonferroni-style correction ([[biostatistics/hypothesis-testing]]); then the expected number of false annotations is below $4{,}000\times2.5\times10^{-4} = 1$.

(c) A stricter threshold loses true but distant homologues whose E-values lie between $2.5\times10^{-4}$ and $0.01$. Profile methods, which give such homologues much smaller E-values, are a better remedy than a looser threshold.
:::
:::
