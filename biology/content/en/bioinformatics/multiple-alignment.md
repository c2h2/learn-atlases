Align a single pair of distantly related globins and you see a scatter of identities that could almost be chance. Align a hundred globins, from bacteria to whales, and a pattern leaps out: a histidine that appears in every sequence at the same place (the proximal histidine that binds the haem iron), a few glycines and prolines at the turns between helices, and a periodic alternation of hydrophobic and polar residues along each helix. A **multiple sequence alignment** puts the evidence of many sequences side by side, and the pattern it reveals is far more informative than any pairwise comparison. It shows which positions are constrained and which are free, it is the input to almost every phylogenetic analysis ([[bioinformatics/phylogenetic-inference]]), and, summarised as a **profile**, it can find new members of the family that no single sequence would detect.

This chapter covers how multiple alignments are scored and built, why exact methods are impractical and how progressive alignment works, how an alignment is turned into a position-specific scoring matrix and a sequence logo, and how **hidden Markov models** — probabilistic machines that we meet here for the first time and use again in [[bioinformatics/gene-finding]] — provide the best current models of protein families. Pairwise alignment and log-odds scores are assumed from [[bioinformatics/pairwise-alignment]].

## Multiple alignments and their scores

::: definition Multiple sequence alignment {#def-msa}
A **multiple sequence alignment** of $N$ sequences is obtained by inserting gaps into each so that all have the same length $L$, written as an $N\times L$ array in which each row is a sequence with gaps and no column consists only of gaps. Each column is a hypothesis that its residues descend from a single residue of the common ancestor (positional homology).
:::

```
seq1   MKV-LAAGWLQE--HGKTC
seq2   MRV-LSAGWIQEPAHGKSC
seq3   MKVQLAAGWLKD--HGRTC
seq4   MKI-IAAGWLQE--HGKSC
```

(An illustrative alignment of four made-up sequences.) Even at a glance it shows invariant positions — the `AGW`, the `HG` and the final `C` — positions where only similar residues occur (`K`/`R`, `L`/`I`, `T`/`S`), and two places where one sequence carries an insertion relative to the others.

How should a multiple alignment be scored? The most common objective extends pairwise scoring in the obvious way.

::: definition Sum-of-pairs score {#def-sp}
The **sum-of-pairs** (SP) score of a multiple alignment is the sum, over all columns and all pairs of sequences $i < j$, of the pairwise score of the two entries: $s(a, b)$ for two residues, a gap penalty for a residue against a gap, and 0 for two gaps. Equivalently, it is the sum of the scores of the $\binom N2$ pairwise alignments induced by the multiple alignment (with gaps scored column by column).
:::

::: example Scoring a column {#ex-sp}
A column of a DNA alignment of five sequences contains `A`, `A`, `G`, `A` and `-`. Score it with match $+1$, mismatch $-1$, residue–gap $-2$ and gap–gap 0.
::: solution
There are $\binom52 = 10$ pairs. The three `A`s form 3 `A`/`A` pairs ($+3$); each `A` pairs with the `G` (3 pairs, $-3$); each of the four residues pairs with the gap (4 pairs, $-8$). The SP score is $3 - 3 - 8 = -8$.
:::
:::

The SP score is simple and widely used, but it has a known flaw: it counts every sequence as an independent witness. A column with one aberrant residue among $N$ identical ones is penalised $N - 1$ times, as though the change had happened $N - 1$ times, whereas on a tree it probably happened once. Sequences are related by a phylogeny, not independent, which is why good alignment programs **weight** sequences, giving less weight to members of large groups of near-identical sequences.

### Exact alignment is out of reach

Needleman–Wunsch generalises directly to $N$ sequences: fill an $N$-dimensional array whose cell $(i_1, \ldots, i_N)$ holds the best score of the prefixes, with each cell's value the maximum over $2^N - 1$ predecessors (each subset of the sequences can contribute a residue to the last column; the others contribute gaps).

::: proposition Cost of exact multiple alignment {#prop-exact}
Exact SP-optimal alignment of $N$ sequences of length about $L$ by dynamic programming takes time $O(2^NL^N)$, times the $O(N^2)$ cost of scoring a column, and space $O(L^N)$. Finding an SP-optimal alignment is NP-hard (Lusheng Wang and Tao Jiang, 1994).
:::

::: proof
The array has $(L + 1)^N$ cells. Each is computed as a maximum over $2^N - 1$ predecessor cells, each requiring the score of a column of $N$ entries, which involves $\binom N2$ pairs. Multiplying gives the time bound; the space is that of the array. (The NP-hardness result is a reduction from a known hard problem and is not reproduced here; see [reductions](/learn/cs/lesson.php?c=theory-of-computation&l=reductions) in Computer Science Atlas for the general method.)
:::

::: example How big is the array? {#ex-exact}
How many cell evaluations does exact alignment of 10 proteins of 300 residues require?
::: solution
$(L + 1)^N\times(2^N - 1) \approx 301^{10}\times1{,}023 \approx 6\times10^{24}\times10^3 = 6\times10^{27}$, each costing $\binom{10}{2} = 45$ pair scores. Even at $10^{12}$ operations per second this would take far longer than the age of the universe. Bounding tricks (Humberto Carrillo and David Lipman, 1988) prune most of the array and make exact alignment feasible for perhaps six to ten short sequences, but no more.
:::
:::

## Progressive alignment

The practical solution, proposed by Paulien Hogeweg and Ben Hesper (1984) and by Da-Fei Feng and Russell Doolittle (1987), is to build the multiple alignment from pairwise alignments, adding sequences in an order that follows their relationships.

::: algorithm Progressive alignment {#alg-progressive}
1. **Distances.** Compute a distance between every pair of sequences, from pairwise alignments (for example $1 -$ fraction identical) or, faster, from shared $k$-mers.
2. **Guide tree.** Build a tree from the distance matrix by a clustering method such as UPGMA or neighbour joining ([[evolution/phylogenetics]], [[bioinformatics/phylogenetic-inference]]).
3. **Align up the tree.** Visit the internal nodes from the tips to the root. At each node, align the two alignments ("profiles") of its child subtrees with each other by dynamic programming, treating each profile column as a unit: the score of aligning two columns is the average of the pairwise scores between their residues, and a gap is inserted into all sequences of a profile at once.
4. The alignment at the root is the result.
:::

The method is fast — $N$ profile alignments instead of one $N$-dimensional problem — and it works well when the sequences are not too divergent, because the most similar sequences, which can be aligned reliably, are aligned first and their consensus guides the placement of more distant ones. Its weakness is greed. Feng and Doolittle's rule "once a gap, always a gap" expresses it: a mistake made early, when two sequences are aligned, is frozen into the profile and propagated to every later step.

Modern programs keep the progressive framework and add corrections.

- **CLUSTAL W** (Julie Thompson, Desmond Higgins and Toby Gibson, 1994) weighted sequences and varied gap penalties by position, lowering them in hydrophilic stretches where loops (and indels) are common. Its successor **Clustal Omega** (2011) aligns profile hidden Markov models and scales to hundreds of thousands of sequences.
- **MUSCLE** (Robert Edgar, 2004) builds a quick draft from $k$-mer distances, re-estimates the tree from the draft and then **iteratively refines** it, repeatedly splitting the alignment into two parts along a tree edge and realigning them.
- **MAFFT** (Kazutaka Katoh and colleagues, 2002) uses the fast Fourier transform to find homologous segments quickly and offers accurate iterative and consistency-based modes.
- **T-Coffee** (Cédric Notredame, Higgins and Jaap Heringa, 2000) introduced **consistency**: before the progressive stage, it builds a library of pairwise alignments and rewards aligning residues $a$ and $c$ if both align to the same residue $b$ of a third sequence. Consistency-based methods, such as ProbCons (2005), are among the most accurate on benchmarks.

Alignment programs are compared on benchmark sets of protein families whose alignment is known from superposed three-dimensional structures, such as BAliBASE (Thompson and colleagues, 1999). The consistent finding is that all methods are accurate for sequences above about 40 % identity and that their accuracy falls, and their disagreements grow, in the twilight zone below 25 %.

::: warning The alignment is an estimate, not data
A multiple alignment looks like data — an array of letters — but it is the output of a heuristic optimisation of a debatable score. Different programs, or the same program with different parameters, give different alignments of divergent sequences, and the differences matter: William Wong, Marc Suchard and John Huelsenbeck (2008) showed that the choice of alignment program could change the inferred phylogeny and the genes inferred to be under positive selection across yeast genomes. Check whether conclusions survive different aligners; remove or downweight unreliable regions (with tools such as Gblocks or trimAl); and, where possible, use methods that treat the alignment as uncertain.
:::

## Profiles

A multiple alignment of a family is a description of what members of the family look like at each position. A **profile** turns that description into a scoring scheme that can be applied to new sequences: instead of one substitution matrix for all positions, each position gets its own scores. Michael Gribskov, Andrew McLachlan and David Eisenberg (1987) introduced profiles for protein families; for short ungapped motifs such as transcription-factor binding sites, the same idea is the **position weight matrix**.

::: definition Position-specific scoring matrix {#def-pssm}
Given an ungapped alignment of $N$ sequences of length $L$, let $n_{ja}$ be the number of times residue $a$ occurs in column $j$. With **pseudocounts** $\beta_a > 0$ (often $\beta_a = 1$, or proportional to background frequency), the estimated probability of $a$ at position $j$ is

$$
\hat f_{ja} = \frac{n_{ja} + \beta_a}{N + \sum_b\beta_b},
$$

and the **position-specific scoring matrix** (PSSM) has entries $M_{ja} = \log_2(\hat f_{ja}/p_a)$, where $p_a$ is the background frequency of $a$. The score of a candidate sequence $x_1\cdots x_L$ is $\sum_jM_{jx_j}$, the log-odds (in bits) of the motif model against the background.
:::

Pseudocounts matter because alignments are small. Without them, a residue that happens not to appear among a few dozen sequences would get probability 0 and score $-\infty$, so a single unusual residue would veto an otherwise excellent match. Better pseudocounts use knowledge of which residues substitute for each other — a column of `I`s and `L`s should give `V` more pseudocount than `D` — through **Dirichlet mixture** priors (Kimmen Sjölander and colleagues, 1996).

::: example A position weight matrix {#ex-pssm}
Six known binding sites of a (here illustrative) DNA-binding protein are `TGACT`, `TGACA`, `TGAGT`, `TTACT`, `TGACT` and `CGACT`. Build the PSSM with one pseudocount per base and equal background frequencies, and score the candidate sites `TGACT`, `CGAGA` and `AATTC`.
::: solution
In column 1, `T` occurs 5 times and `C` once, so $\hat f_\mathtt{T} = (5 + 1)/(6 + 4) = 0.6$, $\hat f_\mathtt{C} = 0.2$ and $\hat f_\mathtt{A} = \hat f_\mathtt{G} = 0.1$. The scores are $\log_2(0.6/0.25) = 1.26$, $\log_2(0.2/0.25) = -0.32$ and $\log_2(0.1/0.25) = -1.32$. Column 3, all `A`, gives $\hat f_\mathtt{A} = 0.7$ and score $\log_2 2.8 = 1.49$. The full matrix is

| | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| `A` | −1.32 | −1.32 | 1.49 | −1.32 | −0.32 |
| `C` | −0.32 | −1.32 | −1.32 | 1.26 | −1.32 |
| `G` | −1.32 | 1.26 | −1.32 | −0.32 | −1.32 |
| `T` | 1.26 | −0.32 | −1.32 | −1.32 | 1.26 |

The consensus `TGACT` scores $4\times1.26 + 1.49 = 6.54$ bits: it is $2^{6.54} \approx 93$ times more probable under the motif model than under the background. `CGAGA`, which agrees with the minority residue at three positions, scores $-0.32 + 1.26 + 1.49 - 0.32 - 0.32 = 1.78$ bits, weakly positive. `AATTC` scores $-6.61$ bits. In a genome scan, a threshold is chosen so that the expected number of chance matches in random sequence is acceptably small ([[bioinformatics/gene-finding]]).
:::
:::

### Information content and sequence logos

How much does a motif constrain each position? Information theory gives a natural measure.

::: definition Information content of a column {#def-information}
For a column with residue frequencies $f_a$ over an alphabet of size $K$, the **information content** is

$$
I = \log_2K - H, \qquad H = -\sum_af_a\log_2f_a,
$$ {#eq-information}

where $H$ is the Shannon entropy of the column. For DNA $I$ ranges from 0 bits (all four bases equally frequent) to 2 bits (a single base); for proteins, from 0 to $\log_220 = 4.32$ bits. (With non-uniform background frequencies $p_a$, the relative entropy $\sum_af_a\log_2(f_a/p_a)$ is used instead.)
:::

A **sequence logo** (Thomas Schneider and Michael Stephens, 1990) draws each column as a stack of letters whose total height is $I$, with each letter's height proportional to its frequency. Conserved positions stand tall; variable ones are low. In the example above, column 3 has $I = 2$ bits and each of the others $I = 2 - H(\tfrac56, \tfrac16) = 2 - 0.650 = 1.35$ bits. Summed over a binding site, information content has a satisfying interpretation: a site carrying $I_\text{tot}$ bits is expected to occur by chance about once every $2^{I_\text{tot}}$ positions, so Schneider and colleagues (1986) observed that the information in many bacterial binding sites is close to $\log_2$ of the genome size divided by the number of sites — just enough for them to be found.

::: widget plot
f: 2 + x*log(x)/log(2) + (1 - x)*log((1 - x)/3)/log(2)
x: 0.001, 0.999
y: 0, 2
labels: I\ \text{(bits)}
vlines: 0.25
caption: Information content of a DNA alignment column in which one base has frequency $f$ (horizontal axis) and the other three share the rest equally, from [[#eq-information]]. At $f = 0.25$ the column is uninformative ($I = 0$); a column that is 90 % one base carries 1.37 bits, and a perfectly conserved one 2 bits. Notice how slowly $I$ rises at first: a column that is 50 % one base carries only 0.21 bits.
:::

::: quiz
A column of a protein alignment of 200 sequences is 100 % cysteine. What is its information content against a uniform background, and what does a high value suggest?
- [ ] 1 bit; the position is unimportant.
- [ ] 2 bits; cysteine is one of two sulfur-containing residues.
- [x] $\log_2 20 \approx 4.32$ bits; the position is probably under strong functional constraint, for example as part of a disulfide bond or a metal-binding site.
- [ ] 0 bits, because there is no variation to measure.
::: solution
With a single residue, $H = 0$ and $I = \log_220 = 4.32$ bits, the maximum. Invariant positions in a diverse alignment are usually structurally or catalytically essential. (Against a realistic background, the relative entropy for cysteine, a rare residue, is even higher, about $\log_2(1/0.014)\approx6$ bits.) One caveat: if the 200 sequences are very closely related, invariance may reflect lack of time to diverge rather than constraint.
:::
:::

## Hidden Markov models

A PSSM handles ungapped motifs. Protein families have insertions and deletions, and different positions tolerate them to different degrees: a loop on the surface may vary in length while the core does not. The tool that handles both position-specific residue preferences and position-specific gaps is the **hidden Markov model**. HMMs were developed in the 1960s and 1970s and made famous by speech recognition; Gary Churchill (1989) applied them to DNA sequence, and Anders Krogh, David Haussler and colleagues (1994) to protein families. Durbin, Eddy, Krogh and Mitchison's *Biological Sequence Analysis* (1998) remains the standard account.

::: definition Hidden Markov model {#def-hmm}
A **hidden Markov model** consists of a set of hidden states $k$; a Markov chain on the states with initial probabilities $a_{0k}$ and transition probabilities $a_{kl} = \Prob(\pi_i = l \mid \pi_{i-1} = k)$; and for each state an **emission** distribution $e_k(b) = \Prob(x_i = b \mid \pi_i = k)$ over the symbols. A sequence $x = x_1\cdots x_n$ is generated by running the chain for $n$ steps, giving a state path $\pi = \pi_1\cdots\pi_n$, and emitting $x_i$ from state $\pi_i$. The joint probability is

$$
\Prob(x, \pi) = a_{0\pi_1}e_{\pi_1}(x_1)\prod_{i=2}^{n}a_{\pi_{i-1}\pi_i}e_{\pi_i}(x_i).
$$ {#eq-hmm-joint}

Only $x$ is observed; the path $\pi$ is hidden.
:::

The Markov chain on hidden states is an ordinary one ([Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains) in Maths Atlas). The two questions we need to answer are: how probable is a sequence under the model, summing over all the paths that could have produced it; and which single path most probably produced it?

::: proposition The forward algorithm {#prop-forward}
Let $f_k(i) = \Prob(x_1\cdots x_i, \pi_i = k)$, the probability of the first $i$ symbols with the path in state $k$ at step $i$. Then

$$
f_k(1) = a_{0k}e_k(x_1),\qquad f_l(i) = e_l(x_i)\sum_kf_k(i-1)\,a_{kl},
$$ {#eq-forward}

and $\Prob(x) = \sum_kf_k(n)$. The computation takes $O(nK^2)$ time for $K$ states, although there are $K^n$ paths.
:::

::: proof
To be in state $l$ at step $i$ having emitted $x_1\cdots x_i$, the path must have been in some state $k$ at step $i - 1$ having emitted $x_1\cdots x_{i-1}$ (probability $f_k(i-1)$), moved to $l$ (probability $a_{kl}$) and emitted $x_i$ from $l$ (probability $e_l(x_i)$). These events for different $k$ are disjoint, so their probabilities add; by the Markov property the factors multiply. Summing $f_k(n)$ over the final state gives $\Prob(x)$. Each of the $nK$ values is a sum of $K$ terms.
:::

::: algorithm The Viterbi algorithm {#alg-viterbi}
To find the most probable path $\pi^* = \arg\max_\pi\Prob(x, \pi)$:

1. $v_k(1) = a_{0k}e_k(x_1)$ for each state $k$.
2. For $i = 2, \ldots, n$ and each state $l$: $v_l(i) = e_l(x_i)\max_k\,v_k(i-1)a_{kl}$, and record the maximising $k$ as the pointer $\mathrm{ptr}_i(l)$.
3. $\Prob(x, \pi^*) = \max_kv_k(n)$; let $\pi_n^*$ be the maximising state.
4. Trace back: $\pi_{i-1}^* = \mathrm{ptr}_i(\pi_i^*)$ for $i = n, \ldots, 2$.

It is the forward algorithm with the sum replaced by a maximum — dynamic programming exactly as in sequence alignment. In practice the computation is done with logarithms, turning products into sums and avoiding numerical underflow on long sequences.
:::

::: example A two-state model {#ex-hmm}
A DNA sequence is modelled with two hidden states: H (GC-rich) emitting `A`, `C`, `G`, `T` with probabilities $0.2, 0.3, 0.3, 0.2$, and L (AT-rich) with $0.3, 0.2, 0.2, 0.3$. Each state persists with probability 0.9 and switches with probability 0.1; the chain starts in either state with probability $\tfrac12$. Compute $\Prob(x)$ and the Viterbi path for $x = $ `GGCA`.
::: solution
Forward: $f_H(1) = 0.5\times0.3 = 0.15$, $f_L(1) = 0.5\times0.2 = 0.10$.

Step 2 (`G`): $f_H(2) = 0.3\,(0.15\times0.9 + 0.10\times0.1) = 0.3\times0.145 = 0.0435$; $f_L(2) = 0.2\,(0.15\times0.1 + 0.10\times0.9) = 0.2\times0.105 = 0.0210$.

Step 3 (`C`): $f_H(3) = 0.3\times0.04125 = 0.012375$; $f_L(3) = 0.2\times0.02325 = 0.00465$.

Step 4 (`A`): $f_H(4) = 0.2\times0.0116025 = 0.0023205$; $f_L(4) = 0.3\times0.0054225 = 0.00162675$.

So $\Prob(x) = 0.0023205 + 0.00162675 = 0.00394725$.

Viterbi: the best path is H H H H, with $\Prob(x, \pi^*) = 0.15\times(0.9\times0.3)^2\times(0.9\times0.2) = 0.0019683$ (switching to L for the final `A` would give $0.15\times0.27^2\times0.1\times0.3 = 0.00033$). Notice that the best path accounts for only $0.0019683/0.00394725 = 50\%$ of the total probability: many other paths are almost as plausible. This is why, for questions about individual positions, the **posterior** probability $\Prob(\pi_i = k\mid x)$ computed with the forward and backward algorithms ([[bioinformatics/gene-finding]]) is often more informative than the single best path.
:::
:::

The same model in Python, decoding a longer sequence with an AT-rich, a GC-rich and another AT-rich stretch:

```python
import math

states = "HL"                                   # H: GC-rich, L: AT-rich
start = {"H": 0.5, "L": 0.5}
trans = {"H": {"H": 0.9, "L": 0.1}, "L": {"H": 0.1, "L": 0.9}}
emit = {"H": {"A": 0.2, "C": 0.3, "G": 0.3, "T": 0.2},
        "L": {"A": 0.3, "C": 0.2, "G": 0.2, "T": 0.3}}

def forward(x):
    """P(x) summed over all state paths."""
    f = {k: start[k] * emit[k][x[0]] for k in states}
    for c in x[1:]:
        f = {l: emit[l][c] * sum(f[k] * trans[k][l] for k in states) for l in states}
    return sum(f.values())

def viterbi(x):
    """Most probable state path, computed with log probabilities."""
    v = {k: math.log(start[k] * emit[k][x[0]]) for k in states}
    back = []
    for c in x[1:]:
        ptr, nv = {}, {}
        for l in states:
            k = max(states, key=lambda k: v[k] + math.log(trans[k][l]))
            ptr[l], nv[l] = k, v[k] + math.log(trans[k][l]) + math.log(emit[l][c])
        back.append(ptr); v = nv
    last = max(states, key=v.get)
    path = [last]
    for ptr in reversed(back):
        path.append(ptr[path[-1]])
    return "".join(reversed(path)), v[last]

print(forward("GGCA"))
print(viterbi("GGCA"))
x = "ATTATAAATAGCGCGGCCGCGCATATTTAAT"
path, logp = viterbi(x)
print(x); print(path)
```

```
0.00394725
('HHHH', -6.230585052945333)
ATTATAAATAGCGCGGCCGCGCATATTTAAT
LLLLLLLLLLHHHHHHHHHHHHLLLLLLLLL
```

The decoded path switches to H at the first `G` of the GC-rich stretch and back to L just after it ends, smoothing over isolated bases because switching costs a factor of $0.1/0.9$ each time.

::: widget markov
matrix: 0.9,0.1; 0.1,0.9
states: GC-rich; AT-rich
start: 0
steps: 40
caption: The hidden chain of the two-state model in [[#ex-hmm]]. Run the simulated walk: the states come in runs whose lengths are geometric with mean $1/(1 - 0.9) = 10$, and the stationary distribution is $(\tfrac12, \tfrac12)$. An HMM hides this walk and shows only the bases each state emits; decoding recovers the runs from the bases. Change the persistence probabilities to see how the run lengths change.
:::

### Profile hidden Markov models

A **profile HMM** turns a multiple alignment into an HMM with a left-to-right structure. Each consensus column $j$ of the alignment becomes three states:

- a **match** state $M_j$ that emits residues with the column's position-specific probabilities (the PSSM of [[#def-pssm]], as probabilities);
- an **insert** state $I_j$ that emits residues, typically with background frequencies, for insertions relative to the consensus between columns $j$ and $j + 1$, and can loop to itself;
- a silent **delete** state $D_j$ that emits nothing, allowing column $j$ to be skipped.

Transitions run $M_j \to M_{j+1}$, $M_j \to I_j$, $M_j \to D_{j+1}$, $I_j \to I_j$, $D_j \to D_{j+1}$ and so on, each with its own probability estimated from the alignment. A column where many sequences have gaps gets a high $M_j \to D_{j+1}$ probability, so a gap there costs little; a column that is never gapped gets a gap cost that is high. Profile HMMs thus provide position-specific gap penalties as well as position-specific residue scores, all on the common scale of log-probabilities. Scoring a sequence by the forward algorithm, summing over all its possible alignments to the model, is more sensitive than scoring only the single best alignment.

The pairwise affine-gap alignment of [[bioinformatics/pairwise-alignment#prop-gotoh]] is itself an HMM of this kind, a **pair HMM** with three states (match, insert in $x$, insert in $y$) that emits two sequences at once; its Viterbi path is the optimal alignment, and the gap-open and gap-extend penalties are the logarithms of its transition probabilities.

::: application Pfam and the annotation of proteomes
Sean Eddy's **HMMER** package builds profile HMMs from alignments and searches sequence databases with them; since version 3 (2010–2011) its heuristic filters make searches about as fast as BLAST. The **Pfam** database (Erik Sonnhammer, Eddy and Richard Durbin, 1997), now part of InterPro at EMBL-EBI, holds a curated seed alignment and profile HMM for each of roughly twenty thousand protein families and domains as of the mid-2020s. Searching a newly sequenced proteome against Pfam assigns domains to most of its proteins, including many with no significant pairwise BLAST hit, and domain architectures are the starting point of genome annotation ([[bioinformatics/gene-finding]]). Comparing HMMs with HMMs (HHpred and HHblits, Johannes Söding and colleagues, from 2005) detects still more distant relationships and is used to find templates for protein structure modelling.
:::

::: history
Margaret Dayhoff aligned protein families by hand in the 1960s, and Russell Doolittle and others built the first computer-assisted multiple alignments in the early 1980s. Progressive alignment was published by Hogeweg and Hesper in 1984 and by Feng and Doolittle in 1987; Desmond Higgins and Paul Sharp's CLUSTAL followed in 1988 and CLUSTAL W in 1994. Gribskov, McLachlan and Eisenberg introduced profiles in 1987, and Schneider and Stephens sequence logos in 1990. Andrew Viterbi published his algorithm for decoding convolutional codes in 1967, Leonard Baum and colleagues the training algorithm for HMMs around 1970, and Lawrence Rabiner's 1989 tutorial brought HMMs to a wide audience; Krogh, Haussler and colleagues' profile HMMs of 1994 brought them into protein biology.
:::

::: summary
- A multiple alignment puts homologous positions of many sequences in columns ([[#def-msa]]); conserved positions stand out, and the alignment is the input to phylogenies and profiles.
- The sum-of-pairs score adds all pairwise column scores ([[#def-sp]]); it treats sequences as independent, so sequence weighting is used.
- Exact alignment costs $O(2^NL^N)$ and is NP-hard ([[#prop-exact]]); progressive alignment aligns profiles up a guide tree ([[#alg-progressive]]), with iterative refinement (MUSCLE, MAFFT) and consistency (T-Coffee) to correct its greedy errors. Alignments of divergent sequences are uncertain estimates.
- A PSSM gives each position its own log-odds scores, $\log_2(\hat f_{ja}/p_a)$, with pseudocounts ([[#def-pssm]]); information content $\log_2K - H$ measures conservation and sets the heights in a sequence logo ([[#def-information]]).
- A hidden Markov model emits symbols from hidden states; the forward algorithm sums over paths to give $\Prob(x)$ ([[#prop-forward]]), and the Viterbi algorithm finds the most probable path ([[#alg-viterbi]]), both in $O(nK^2)$.
- Profile HMMs, with match, insert and delete states per column, model families with position-specific residue and gap scores; HMMER and Pfam use them to annotate proteomes.
:::

## Exercises

::: exercise A sum-of-pairs column {level=1 check="-2"}
Score the column `C`, `C`, `T`, `T` with match $+1$ and mismatch $-1$ (sum of pairs). Compare it with the column `C`, `C`, `C`, `T`.
::: solution
There are $\binom42 = 6$ pairs: one `C`/`C`, one `T`/`T` and four `C`/`T`, giving $2 - 4 = -2$. The column `C`, `C`, `C`, `T` has three `C`/`C` pairs and three `C`/`T` pairs, scoring $3 - 3 = 0$: the more conserved column scores higher, as it should.
:::
:::

::: exercise Information content {level=1 check="1.1887"}
A DNA alignment column contains `A` in 6 of 8 sequences and `G` in 2. What is its information content, in bits (four decimal places)?
::: solution
$H = -(0.75\log_20.75 + 0.25\log_20.25) = 0.75\times0.4150 + 0.25\times2 = 0.3113 + 0.5 = 0.8113$, so $I = 2 - 0.8113 = 1.1887$ bits.
:::
:::

::: exercise Scoring a site {level=1 check="4.95"}
Using the PSSM of [[#ex-pssm]], score the site `TGAGT` (two decimal places).
::: solution
$1.26 + 1.26 + 1.49 - 0.32 + 1.26 = 4.95$ bits (more precisely $1.263\times3 + 1.485 - 0.322 = 4.952$).
:::
:::

::: exercise The forward probability of a short sequence {level=2 check="0.0645"}
For the two-state model of [[#ex-hmm]], compute $\Prob(x)$ for $x = $ `GC`.
::: solution
$f_H(1) = 0.15$, $f_L(1) = 0.10$. Then $f_H(2) = e_H(\mathtt{C})(0.15\times0.9 + 0.10\times0.1) = 0.3\times0.145 = 0.0435$ and $f_L(2) = e_L(\mathtt{C})(0.15\times0.1 + 0.10\times0.9) = 0.2\times0.105 = 0.021$. $\Prob(x) = 0.0645$.
:::
:::

::: exercise Zero counts {level=2}
Suppose the PSSM of [[#ex-pssm]] had been built without pseudocounts. (a) What would the score of `G` at position 3 be? (b) What would that imply for the site `TGGCT`, which differs from the consensus at one position? (c) Why is adding a pseudocount of 1 per base a reasonable fix, and when would it be too large?
::: solution
(a) $\hat f_{3\mathtt{G}} = 0/6 = 0$, so $\log_2(0/0.25) = -\infty$.

(b) `TGGCT` would score $-\infty$ however well it matched elsewhere: it would be declared impossible on the strength of six examples.

(c) A pseudocount is a prior belief that every base is possible; with $\beta = 1$ it is equivalent to having seen each base once more than we did (a uniform Dirichlet prior). With only six sites it substantially flattens the frequencies (the consensus base at column 3 drops from 1.0 to 0.7), which is appropriate for so little data. With thousands of sites the same pseudocount would hardly matter, while with only two or three sites it would dominate the data, and pseudocounts should be scaled to the amount of data or informed by what substitutions are plausible.
:::
:::

::: exercise A guide tree {level=2}
Four sequences have pairwise distances $d(A,B) = 0.1$, $d(C,D) = 0.2$, and all other distances $0.6$. (a) In what order does progressive alignment combine them? (b) Suppose the A–B alignment places a gap at a position where C and D have well-aligned residues. What happens to that gap later, and why is this a weakness?
::: solution
(a) The closest pair, A and B, is aligned first; then C and D; then the A–B profile is aligned with the C–D profile.

(b) The gap is frozen into the A–B profile ("once a gap, always a gap"): when the profiles are aligned, it is placed in both A and B together, and the program cannot reconsider the A–B alignment in the light of C and D. If the gap was misplaced, the error persists. Iterative refinement (realigning subsets of sequences against the rest) and consistency scoring (using evidence from C and D when aligning A with B) were introduced to repair this.
:::
:::

::: exercise Decoding versus posterior {level=3}
In [[#ex-hmm]] the Viterbi path for `GGCA` was H H H H, with $\Prob(x, \pi^*)/\Prob(x) = 0.50$. (a) Explain why the most probable path can have probability well below 1 even when it is the clear winner. (b) Compute $\Prob(\pi_4 = \text{H}\mid x)$ from the forward values. (c) Which quantity would you report for the state of the last base, and why?
::: solution
(a) With $2^4 = 16$ paths, probability is spread among many paths that differ in one or two positions; the best has the largest share but need not have most of it. For long sequences the best path's posterior probability is typically tiny.

(b) Because $x_4$ is the last symbol, $\Prob(\pi_4 = \text{H}, x) = f_H(4) = 0.0023205$, so $\Prob(\pi_4 = \text{H}\mid x) = 0.0023205/0.00394725 = 0.588$.

(c) The posterior, 0.59, because it states the uncertainty: the last base is only somewhat more likely to belong to the GC-rich state. The Viterbi path labels it H without indicating that L is almost as plausible. (For interior positions the posterior needs the backward algorithm as well.)
:::
:::

::: exercise Gaps in a profile HMM {level=3}
In a profile HMM built from 100 sequences, column 37 is a gap in 40 of them and column 52 in none. (a) Estimate (ignoring pseudocounts) the transition probabilities $M_{36}\to D_{37}$ and $M_{51}\to D_{52}$, assuming every sequence present at column 36 or 51 is in a match state there. (b) Convert each into a gap-opening "penalty" in bits, $-\log_2$ of the probability. (c) What does this give that a single substitution matrix with affine gaps cannot?
::: solution
(a) If all 100 sequences are in $M_{36}$ and 40 of them skip column 37, $\Prob(M_{36}\to D_{37}) = 0.40$. For column 52 the count is 0; a pseudocount would give a small positive probability, say about 0.01.

(b) $-\log_20.40 = 1.3$ bits, a cheap deletion; $-\log_20.01 = 6.6$ bits, an expensive one.

(c) Position-specific gap costs: deletions are cheap where the family's members actually vary in length (typically loops) and expensive in the conserved core. A single affine penalty charges the same everywhere, so it either over-penalises gaps in loops or under-penalises them in the core.
:::
:::
