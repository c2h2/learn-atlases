Human haemoglobin β and sperm-whale myoglobin are both oxygen-binding proteins of about 150 amino acids, and at roughly a quarter of the positions they carry the same residue. That is far more than two unrelated proteins would share by chance, and it is the evidence — confirmed by their almost identical three-dimensional folds — that the two genes descend from a common ancestral globin. But the statement "a quarter of the positions" hides a problem. Over hundreds of millions of years, residues have been inserted and deleted as well as substituted, so position 50 of one protein does not correspond to position 50 of the other. Before we can count anything we must decide which residues correspond: we must **align** the sequences.

Pairwise alignment is the most important single operation in bioinformatics. It is how a new gene is compared with a known one, how reads are placed on a genome, how mutations are named, and how distances for trees are measured. This chapter defines an alignment and its score, shows where substitution matrices such as BLOSUM62 come from, and develops the dynamic-programming algorithms of Needleman and Wunsch (global alignment) and Smith and Waterman (local alignment), with the affine gap penalties used in practice. Dynamic programming in general is treated in Computer Science Atlas ([dynamic programming](/learn/cs/lesson.php?c=algorithms&l=dynamic-programming)); here we concentrate on what is particular to sequences. The sequence conventions are those of [[bioinformatics/sequences-databases]].

## Alignments and their scores

::: definition Pairwise alignment {#def-alignment}
An **alignment** of sequences $x = x_1\cdots x_m$ and $y = y_1\cdots y_n$ is obtained by inserting gap symbols `-` into each so that they have the same length, writing one above the other, and requiring that no column contain two gaps. Each column is then a **match** or **mismatch** (two residues, said to be aligned), or an **indel** (a residue against a gap). The order of residues in each sequence is preserved.
:::

```
GAATTC
G-ATTA
```

In this alignment of `GAATTC` with `GATTA`, five columns pair residues (four identities, one mismatch `C`/`A`) and one column pairs the second `A` of the first sequence with a gap. Biologically, an alignment is a hypothesis: aligned residues descend from the same residue in the common ancestor, and indels mark insertions or deletions in one lineage or the other. (An alignment cannot tell which: a gap in $y$ is either a deletion in $y$'s lineage or an insertion in $x$'s.)

To choose among alignments we score them.

::: definition Alignment score {#def-score}
With a **substitution matrix** $s(a, b)$ giving the score of aligning residues $a$ and $b$, and a **gap penalty** $\gamma(g) \le 0$ for a run of $g$ consecutive gap symbols in one sequence, the score of an alignment is the sum of $s$ over aligned pairs plus the sum of $\gamma$ over maximal runs of gaps. The gap penalty is **linear** if $\gamma(g) = -gd$, and **affine** if

$$
\gamma(g) = -d - (g - 1)e, \qquad d \ge e > 0,
$$ {#eq-affine}

with $d$ the cost of opening a gap and $e$ the cost of extending it. An **optimal** alignment is one of maximum score.
:::

With the simple DNA scores match $+1$, mismatch $-1$ and linear gap $d = 2$, the alignment above scores $4\times1 - 1 - 2 = 1$. Conventions for the affine penalty differ between programs: NCBI BLAST, for example, charges $a + bg$ for a gap of length $g$ ("existence" $a$, "extension" $b$), so that its protein default of 11 and 1 costs 12 for a single gap. Always check what a program's parameters mean.

### Too many alignments to try

Why not simply score every alignment and keep the best? Because there are too many.

::: proposition The number of alignments {#prop-count}
The number $D(m, n)$ of alignments of sequences of lengths $m$ and $n$ satisfies

$$
D(m, n) = D(m - 1, n) + D(m, n - 1) + D(m - 1, n - 1),\qquad D(m, 0) = D(0, n) = 1.
$$

These are the Delannoy numbers. $D(n, n)$ grows like $(3 + 2\sqrt2)^n/\sqrt n \approx 5.83^n/\sqrt n$.
:::

::: proof
The last column of an alignment is $x_m$ over $y_n$, $x_m$ over a gap, or a gap over $y_n$; removing it leaves an alignment of $x_{1..m-1}$ with $y_{1..n-1}$, of $x_{1..m-1}$ with $y$, or of $x$ with $y_{1..n-1}$ respectively, and every alignment arises exactly once this way. If one sequence is empty, the only alignment puts every residue of the other against gaps. The asymptotic form follows from the generating function of the Delannoy numbers and is not needed here.
:::

For two sequences of length 3 there are already 63 alignments; for length 10, 8,097,453; for two proteins of 100 residues, about $2\times10^{75}$. Enumeration is hopeless. But the recurrence in the proof contains the key to an efficient algorithm: the best alignment ending in a given column is built from the best alignment of shorter prefixes.

## Where substitution scores come from

Should aligning leucine with isoleucine earn a reward or a penalty? It depends on how often such pairs occur in alignments of genuinely related proteins compared with how often they would occur by chance. This leads to the central idea of scoring.

::: proposition Scores as log-odds ratios {#prop-logodds}
Compare two models for an ungapped pair of aligned sequences. Under the **related** model, each aligned pair of residues $(a, b)$ occurs independently with probability $q_{ab}$, the frequency of the pair in alignments of homologous proteins. Under the **random** model, residues occur independently with background frequencies $p_a$ and $p_b$. The log-likelihood ratio of the two models for an alignment is the sum over columns of

$$
s(a, b) = \frac{1}{\lambda}\log\frac{q_{ab}}{p_ap_b},
$$ {#eq-logodds}

where the constant $\lambda$ sets the units (for scores in bits, $1/\lambda = 1/\ln 2$; for half-bits, $2/\ln 2$). An alignment with a positive total score is more probable under the related model.
:::

::: proof
Under the related model the probability of the alignment is $\prod_i q_{x_iy_i}$; under the random model it is $\prod_i p_{x_i}\prod_ip_{y_i} = \prod_i p_{x_i}p_{y_i}$. The logarithm of their ratio is $\sum_i\log(q_{x_iy_i}/p_{x_i}p_{y_i})$, a sum of one term per column. Multiplying by a positive constant changes the units but not which alignment scores highest.
:::

The proposition explains the shape of every substitution matrix. Identities score highly because related proteins share residues far more often than chance; chemically similar replacements (`I`/`L`, `D`/`E`, `K`/`R`) score positively because selection tolerates them; rare residues such as tryptophan get large identity scores because a chance match between rare residues is unlikely. It also says what a matrix assumes: independence of columns, and a particular degree of divergence for which $q_{ab}$ was estimated.

::: example Log-odds scores from pair frequencies {#ex-logodds}
In a (here illustrative) collection of aligned protein blocks, isoleucine and leucine have background frequencies $p_\mathtt{I} = 0.07$ and $p_\mathtt{L} = 0.10$, and the unordered pair {`I`, `L`} makes up a fraction $0.028$ of all aligned pairs. Tryptophan has $p_\mathtt{W} = 0.013$, and `W`/`W` pairs make up $0.0065$ of aligned pairs. Compute both scores in half-bits, rounded to integers, as BLOSUM matrices are.
::: solution
For an unordered pair of different residues the chance expectation is $2p_\mathtt{I}p_\mathtt{L} = 2\times0.07\times0.10 = 0.014$ (the pair can occur as `I` over `L` or `L` over `I`). The ratio is $0.028/0.014 = 2$, which is $\log_2 2 = 1$ bit, or 2 half-bits: $s(\mathtt{I},\mathtt{L}) = 2$.

For `W`/`W` the expectation is $p_\mathtt{W}^2 = 1.69\times10^{-4}$, the ratio is $0.0065/1.69\times10^{-4} = 38.5$, and $2\log_2 38.5 = 10.5$, which rounds to $11$. These happen to be the values in BLOSUM62, where `I`/`L` scores 2 and `W`/`W` scores 11, while the much commoner alanine scores only 4 against itself.
:::
:::

Two families of matrices are in common use, differing in how $q_{ab}$ was estimated.

- **PAM matrices** (Margaret Dayhoff, Robert Schwartz and Bruce Orcutt, 1978) were built from 71 families of closely related proteins, whose alignments were unambiguous. Counting the replacements on a phylogeny gave a Markov transition matrix for an evolutionary distance of **1 PAM**, one accepted point mutation per hundred residues. Matrices for greater distances were obtained by raising it to a power: PAM250, the 250th power, corresponds to sequences that retain only about 20 % identity. Extrapolating from close relatives is the weakness of PAM: errors in the short-distance matrix are magnified.
- **BLOSUM matrices** (Steven and Jorja Henikoff, 1992) were estimated directly from conserved, ungapped blocks of aligned protein families in the BLOCKS database, with sequences more than a threshold percentage identical clustered together so that near-duplicates do not dominate. BLOSUM62 uses a 62 % threshold and is the default of most protein search programs; BLOSUM80 suits close relatives and BLOSUM45 distant ones (note that the numbering runs in the opposite direction to PAM).

For DNA, simple match/mismatch scores (such as $+1/-3$ or $+2/-3$, or $+5/-4$) are usual, sometimes with transitions penalised less than transversions.

::: quiz
Why does `W`/`W` score 11 in BLOSUM62 while `L`/`L` scores only 4?
- [ ] Tryptophan is more important for protein function than leucine.
- [x] Tryptophan is rare, so a chance `W`/`W` pair is much less likely than a chance `L`/`L` pair, and the log-odds ratio is larger.
- [ ] Tryptophan never mutates.
- [ ] The matrix was scaled to give aromatic residues higher scores.
::: solution
By [[#prop-logodds]] the score depends on the ratio of the observed pair frequency to the frequency expected by chance, $p_a^2$ for an identity. Tryptophan's background frequency is about 1 %, so $p_\mathtt{W}^2$ is tiny and even a modest conservation gives a large ratio. Leucine is the commonest amino acid, so `L`/`L` pairs are frequent even between unrelated sequences.
:::
:::

## Global alignment: the Needleman–Wunsch algorithm

Let $F(i, j)$ be the score of the best alignment of the prefixes $x_1\cdots x_i$ and $y_1\cdots y_j$. Consider the last column of such an alignment. It is $x_i$ aligned with $y_j$, or $x_i$ against a gap, or $y_j$ against a gap; and whatever it is, the rest must be an optimal alignment of the correspondingly shorter prefixes — otherwise we could replace it with a better one and improve the total. This property, **optimal substructure**, gives a recurrence.

::: algorithm Needleman–Wunsch (global alignment, linear gaps) {#alg-nw}
Given $x$ of length $m$, $y$ of length $n$, scores $s(a, b)$ and gap penalty $d$:

1. **Initialise.** $F(0, 0) = 0$, $F(i, 0) = -id$ for $i = 1, \ldots, m$, and $F(0, j) = -jd$ for $j = 1, \ldots, n$.
2. **Fill** the matrix row by row, for $i = 1, \ldots, m$ and $j = 1, \ldots, n$:
$$
F(i, j) = \max\begin{cases} F(i-1, j-1) + s(x_i, y_j) & \text{(align } x_i \text{ with } y_j)\\ F(i-1, j) - d & (x_i \text{ against a gap})\\ F(i, j-1) - d & (y_j \text{ against a gap})\end{cases}
$$ {#eq-nw}
3. **Terminate.** $F(m, n)$ is the optimal score.
4. **Trace back** from $(m, n)$ to $(0, 0)$, at each cell moving to a predecessor that achieved the maximum (diagonal: emit $x_i$ over $y_j$; up: $x_i$ over `-`; left: `-` over $y_j$), and read the alignment in reverse.

The matrix has $(m + 1)(n + 1)$ cells, each computed in constant time, so the algorithm takes $O(mn)$ time and space.
:::

::: proposition Correctness of the recurrence {#prop-nw-correct}
$F(i, j)$ computed by [[#eq-nw]] is the maximum score over all alignments of $x_{1..i}$ with $y_{1..j}$.
:::

::: proof
By induction on $i + j$. The boundary values are correct, since the only alignment of a prefix with the empty sequence uses gaps throughout. For $i, j \ge 1$, any alignment of the prefixes ends in one of three kinds of column. If it ends with $x_i$ over $y_j$, its score is $s(x_i, y_j)$ plus the score of an alignment of $x_{1..i-1}$ with $y_{1..j-1}$, which is at most $F(i - 1, j - 1)$ by the induction hypothesis; similarly for the other two cases. So no alignment scores more than the right-hand side of [[#eq-nw]], and the alignment obtained by extending an optimal alignment of the appropriate prefixes attains it.
:::

The scores of a linear gap penalty add column by column, which is what makes the recurrence work. (With an affine penalty they do not, and we will need more bookkeeping below.)

::: example Aligning GAATTC with GATTA {#ex-nw}
Align $x = $ `GAATTC` with $y = $ `GATTA` globally, with match $+1$, mismatch $-1$ and linear gap penalty $d = 2$.
::: solution
The rows correspond to $x$ and the columns to $y$; the first row and column hold the gap penalties $0, -2, -4, \ldots$. Filling by [[#eq-nw]] gives:

| | – | G | A | T | T | A |
|---|---|---|---|---|---|---|
| **–** | 0 | −2 | −4 | −6 | −8 | −10 |
| **G** | −2 | **1** | −1 | −3 | −5 | −7 |
| **A** | −4 | −1 | **2** | 0 | −2 | −4 |
| **A** | −6 | −3 | **0** | 1 | −1 | −1 |
| **T** | −8 | −5 | −2 | **1** | 2 | 0 |
| **T** | −10 | −7 | −4 | −1 | **2** | 1 |
| **C** | −12 | −9 | −6 | −3 | 0 | **1** |

For example, the cell for `A` (row 2) against `A` (column 2) is $\max(1 + 1, -1 - 2, -1 - 2) = 2$: the diagonal move from the `G`/`G` cell, plus a match.

The optimal score is $F(6, 5) = 1$. Tracing back along the bold cells: `C`/`A` (diagonal, $1 = 2 - 1$), `T`/`T`, `T`/`T`, then from the cell $(3, 2)$, value 0, the predecessor is $(2, 2)$ by a vertical move ($0 = 2 - 2$), putting the second `A` of $x$ against a gap; then `A`/`A` and `G`/`G`. The alignment is

```
GAATTC
G-ATTA
```

with score $4 - 1 - 2 = 1$. At $(3, 2)$ a diagonal predecessor would also have worked ($0 = F(2, 1) + 1 = -1 + 1$), giving the equally good alignment `GAATTC` over `GA-TTA`. Optimal alignments are often not unique, and which one a program reports depends on how it breaks ties.
:::
:::

The same computation in standard-library Python:

```python
def nw(x, y, match=1, mismatch=-1, gap=-2):
    """Needleman-Wunsch global alignment with a linear gap penalty."""
    m, n = len(x), len(y)
    F = [[0] * (n + 1) for _ in range(m + 1)]   # F[i][j]: best score of x[:i] vs y[:j]
    for i in range(1, m + 1):
        F[i][0] = i * gap
    for j in range(1, n + 1):
        F[0][j] = j * gap
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            s = match if x[i - 1] == y[j - 1] else mismatch
            F[i][j] = max(F[i - 1][j - 1] + s,     # align x_i with y_j
                          F[i - 1][j] + gap,       # x_i against a gap
                          F[i][j - 1] + gap)       # y_j against a gap
    # traceback from the bottom-right corner
    a, b, i, j = [], [], m, n
    while i > 0 or j > 0:
        s = match if i and j and x[i - 1] == y[j - 1] else mismatch
        if i and j and F[i][j] == F[i - 1][j - 1] + s:
            a.append(x[i - 1]); b.append(y[j - 1]); i, j = i - 1, j - 1
        elif i and F[i][j] == F[i - 1][j] + gap:
            a.append(x[i - 1]); b.append("-"); i -= 1
        else:
            a.append("-"); b.append(y[j - 1]); j -= 1
    return F, "".join(reversed(a)), "".join(reversed(b))

F, a, b = nw("GAATTC", "GATTA")
print(a); print(b); print("score", F[-1][-1])
```

which prints

```
GAATTC
G-ATTA
score 1
```

### Alignment as a path

The matrix has a geometric reading that helps in thinking about every variant of the algorithm. Each cell $(i, j)$ is a vertex; a diagonal step aligns two residues, a vertical step puts a residue of $x$ against a gap, and a horizontal step a residue of $y$. Every alignment is a path from the top-left corner to the bottom-right, and the optimal alignment is the highest-scoring path. Equivalently, if we count **costs** instead of scores — 0 for a match and 1 for a mismatch or an indel — the optimal alignment is a shortest path, and its cost is the **edit distance** (Levenshtein distance) between the sequences.

::: widget graph
nodes: 00@0,0; 01@1,0; 02@2,0; 03@3,0; 10@0,-1; 11@1,-1; 12@2,-1; 13@3,-1; 20@0,-2; 21@1,-2; 22@2,-2; 23@3,-2; 30@0,-3; 31@1,-3; 32@2,-3; 33@3,-3; 40@0,-4; 41@1,-4; 42@2,-4; 43@3,-4
edges: 00>01:1; 00>10:1; 00>11:0; 01>02:1; 01>11:1; 01>12:1; 02>03:1; 02>12:1; 02>13:1; 03>13:1; 10>11:1; 10>20:1; 10>21:1; 11>12:1; 11>21:1; 11>22:1; 12>13:1; 12>22:1; 12>23:1; 13>23:1; 20>21:1; 20>30:1; 20>31:1; 21>22:1; 21>31:1; 21>32:0; 22>23:1; 22>32:1; 22>33:1; 23>33:1; 30>31:1; 30>40:1; 30>41:1; 31>32:1; 31>41:1; 31>42:1; 32>33:1; 32>42:1; 32>43:0; 33>43:1; 40>41:1; 41>42:1; 42>43:1
algorithm: dijkstra
start: 00
caption: The edit graph for aligning $x = $ `ACGT` (rows, top to bottom) with $y = $ `AGT` (columns, left to right). Vertex $ij$ stands for the cell $(i, j)$ of the dynamic-programming matrix. Horizontal and vertical edges (indels) cost 1; diagonal edges cost 0 where the residues match (`A`/`A`, `G`/`G`, `T`/`T`) and 1 where they differ. Step through Dijkstra's algorithm from $00$: the shortest distance to the corner $43$ is 1, the edit distance, and the path through it — diagonal, down, diagonal, diagonal — is the alignment `ACGT` over `A-GT`. Because the graph is acyclic, the dynamic programme computes the same distances in a single sweep without a priority queue.
:::

## Local alignment: the Smith–Waterman algorithm

Global alignment assumes the sequences are related along their entire length. Often they are not. Two proteins may share a single domain embedded in different contexts; a short read matches only a small part of a chromosome; a gene matches only its homologue's coding exons. Forcing a global alignment then buries the real similarity under the penalties for aligning unrelated flanks. What we want is the best-scoring pair of **segments**, one from each sequence.

::: algorithm Smith–Waterman (local alignment) {#alg-sw}
Fill a matrix $H$ with $H(i, 0) = H(0, j) = 0$ and

$$
H(i, j) = \max\begin{cases}0\\ H(i-1, j-1) + s(x_i, y_j)\\ H(i-1, j) - d\\ H(i, j-1) - d.\end{cases}
$$ {#eq-sw}

The optimal local score is the largest entry of $H$ anywhere in the matrix. Trace back from that cell until a cell with value 0 is reached; the path gives the optimal local alignment. Time and space are $O(mn)$.
:::

Two changes do all the work. The option $0$ lets an alignment start afresh anywhere: a prefix with negative score is never worth keeping. And taking the maximum over the whole matrix lets it end anywhere. For local alignment to be meaningful, the expected score of aligning two random residues, $\sum_{a,b}p_ap_bs(a,b)$, must be **negative**; otherwise long random stretches would accumulate positive scores and the "local" alignment would extend over everything. Log-odds matrices satisfy this automatically: the expected score per column under the random model is $-1/\lambda$ times a relative entropy, which is negative.

::: example A shared segment {#ex-sw}
Find the best local alignment of $x = $ `CCATGACGT` and $y = $ `TTATGCCGTTT` with match $+2$, mismatch $-1$ and linear gap penalty $d = 2$.
::: solution
Filling the $10\times12$ matrix by [[#eq-sw]] (or running a program), most cells are 0 or small, but a ridge of increasing values runs diagonally from $x_3 = $ `A`, $y_3 = $ `A` to the largest entry, $H(9, 9) = 11$, at the final `T` of $x$ and the ninth residue of $y$. Along it the values are $2, 4, 6, 5, 7, 9, 11$: five matches add 2 each, the mismatch `A`/`C` subtracts 1, and the final two matches bring it to 11. Tracing back to the first zero gives

```
ATGACGT
ATGCCGT
```

covering $x_{3..9}$ and $y_{3..9}$, with six identities and one mismatch: $6\times2 - 1 = 11$. The unrelated flanks (`CC` and `TT` at the left, `TT` at the right end of $y$) are simply left out. A global alignment would have had to account for them, and for the two extra residues of $y$, with gaps.
:::
:::

::: quiz
Which situation calls for a local rather than a global alignment?
- [ ] Comparing the complete sequences of human and chimpanzee cytochrome c.
- [x] Finding a kinase domain of a 1,200-residue receptor in a 350-residue soluble kinase.
- [ ] Checking that a cloned gene matches its database sequence over its full length.
- [ ] Measuring the edit distance between two versions of the same short barcode.
::: solution
The receptor and the soluble kinase share only the kinase domain; the receptor's extracellular and transmembrane regions have no counterpart. A local alignment finds the shared domain without penalising the unrelated parts. The other three compare sequences expected to correspond end to end, for which global alignment is appropriate.
:::
:::

Between the two lies **semi-global** (or "glocal", overlap) alignment, in which gaps at the ends of one or both sequences are free. It is what read mappers need: the whole of a read should be aligned, but only to a part of the genome. It is obtained from Needleman–Wunsch by initialising the boundary of the long sequence to zero and taking the best score in the last row rather than the corner.

## Affine gaps

A linear gap penalty treats one gap of length 6 like six separate gaps of length 1. Biologically this is wrong: a single insertion or deletion event commonly adds or removes several residues at once, for example a loop in a protein or a repeat unit in DNA, so one long gap is much more plausible than many short ones. The affine penalty [[#eq-affine]] captures this by making the opening of a gap expensive and its extension cheap.

The recurrence of [[#alg-nw]] no longer works directly, because the cost of a gap symbol depends on whether the previous column was also a gap. Osamu Gotoh (1982) showed how to restore an $O(mn)$ algorithm by keeping track of the state of the last column.

::: proposition Gotoh's recurrences for affine gaps {#prop-gotoh}
Let $M(i, j)$, $I_x(i, j)$ and $I_y(i, j)$ be the best scores of alignments of $x_{1..i}$ with $y_{1..j}$ that end with $x_i$ aligned to $y_j$, with $x_i$ against a gap, and with $y_j$ against a gap, respectively. With the affine penalty $\gamma(g) = -d - (g - 1)e$,

$$
\begin{aligned}
M(i, j) &= s(x_i, y_j) + \max\{M(i-1, j-1),\ I_x(i-1, j-1),\ I_y(i-1, j-1)\},\\
I_x(i, j) &= \max\{M(i-1, j) - d,\ I_x(i-1, j) - e\},\\
I_y(i, j) &= \max\{M(i, j-1) - d,\ I_y(i, j-1) - e\},
\end{aligned}
$$ {#eq-gotoh}

and the optimal global score is $\max\{M(m, n), I_x(m, n), I_y(m, n)\}$. The algorithm takes $O(mn)$ time.
:::

::: proof
An alignment ending in an aligned pair consists of an optimal alignment of the shorter prefixes, ending in any of the three states, plus the pair's score. An alignment ending with $x_i$ against a gap either opens that gap now — the previous column is an aligned pair, costing $d$ — or extends a gap already open in the previous column, costing $e$. (Here a gap in one sequence is not allowed to follow directly a gap in the other; allowing it adds the terms $I_y(i-1, j) - d$ and $I_x(i, j-1) - d$ and rarely matters.) The induction is as in [[#prop-nw-correct]]. Each of the $3(m+1)(n+1)$ values takes constant time.
:::

The three matrices are three states of a small machine — "in an aligned pair", "in a gap in $y$", "in a gap in $x$" — with transitions between them. In [[bioinformatics/multiple-alignment]] we shall see that this machine is exactly a **pair hidden Markov model**, and that the scores are log-probabilities of its transitions.

::: widget plot
f: -d*x; -(o + e*(x - 1))
x: 1, 20
y: -40, 0
sliders: d=2:0.5:5:0.5; o=10:1:15:1; e=1:0.5:3:0.5
labels: \text{linear } -dg; \text{affine } -o-(g-1)e
caption: Gap penalty against gap length $g$ (read at whole numbers). With the defaults a linear penalty of 2 per position is cheaper for gaps of up to 8 residues, equal at 9 and dearer beyond; the affine penalty, with opening cost $o = 10$ and extension cost $e = 1$, makes a single long gap far cheaper than several short ones of the same total length. Raise $e$ towards $d$ and notice the two lines become parallel: the only remaining difference is the opening charge.
:::

::: example One gap or two? {#ex-affine}
Two alignments of the same pair of sequences have identical aligned pairs scoring 40 in total. Alignment A contains one gap of length 4; alignment B contains two gaps of length 2. Score both with (a) a linear penalty of 2 per gap symbol and (b) an affine penalty with $d = 5$, $e = 1$ ([[#eq-affine]]).
::: solution
(a) Linear: both have four gap symbols, costing 8, so both score $40 - 8 = 32$; the scoring cannot choose between them.

(b) Affine: A pays $\gamma(4) = -(5 + 3\times1) = -8$ and scores 32; B pays $2\gamma(2) = -2(5 + 1) = -12$ and scores 28. The affine penalty prefers the single indel event — usually the biologically more plausible hypothesis.
:::
:::

## Cost, variants and limits

Dynamic programming takes $O(mn)$ time. For two proteins of 500 residues that is a quarter of a million cells, trivial for a computer. For a gene of $10^4$ bases against a genome of $3\times10^9$ it is $3\times10^{13}$ cells, which is why database searches use heuristics ([[bioinformatics/database-search]]) and read mappers use indexes ([[bioinformatics/assembly-variants]]). Space can be the binding constraint before time is: aligning two bacterial genomes of 5 Mb would need $2.5\times10^{13}$ cells. Several standard tricks help.

- **Linear space.** The score alone needs only the previous row, $O(n)$ memory. Daniel Hirschberg's divide-and-conquer method (1975, adapted to sequence alignment by Eugene Myers and Webb Miller in 1988) recovers the alignment itself in $O(m + n)$ space at about twice the time, by finding where the optimal path crosses the middle row and recursing on the two halves.
- **Banded alignment.** If the sequences are known to be similar, the optimal path stays near the diagonal, and only a band of width $w$ around it need be filled, in $O(wn)$ time.
- **Hardware.** Smith–Waterman parallelises well across the anti-diagonals of the matrix, and vectorised implementations on CPUs and GPUs (such as Michael Farrar's striped method of 2007) make exact local alignment practical for many tasks.

### How similar is similar enough?

Every pair of sequences has an optimal alignment, including unrelated ones. Two random residues are identical with probability $\sum_ap_a^2$, about 6 % for typical amino-acid frequencies, but an optimal alignment of two random proteins shows considerably more identity than that, simply because the algorithm picks the best of an astronomical number of alignments; locally, the best segment pair of random sequences scores well above zero. An optimal score is therefore evidence of homology only if it is higher than chance would give. Russell Doolittle (1986) called the range of roughly 20–30 % identity the **twilight zone**: above it, alignments of reasonable length almost always reflect homology; within it, true and chance alignments overlap; below it, identity alone cannot distinguish them, although structure often still can. Burkhard Rost (1999) refined this with a length-dependent threshold — short alignments need much higher identity to be convincing. The rigorous way to judge a score is by its statistical significance, which is the subject of the next chapter.

::: warning "Percent homology" and the true alignment
Homology means descent from a common ancestor. It is a yes-or-no historical statement, not a quantity: two sequences are homologous or they are not, so "70 % homologous" is a misuse — the measurable quantities are percent **identity** and **similarity** (positive-scoring pairs). Similarity is the evidence for homology, not the same thing. Equally, the optimal alignment is not necessarily the true one. It is the best under a particular scoring scheme, and changing the matrix or gap penalties can move gaps and change aligned pairs, especially in poorly conserved regions. Treat alignments of divergent sequences as hypotheses, and check that conclusions do not depend on the parameters.
:::

::: application Naming mutations
Clinical and research reports describe variants relative to a reference transcript using HGVS notation, such as `c.1521_1523del` for the three-base deletion that removes Phe508 in the most common cystic fibrosis allele of *CFTR*. Producing such a name is an alignment problem: where exactly is a deletion in a run of repeated bases? The sequence `CTTT` versus `CTT` is consistent with deleting any of the three `T`s. Every placement gives an optimal alignment, so conventions choose one — HGVS shifts indels as far 3′ as possible, while VCF files left-align them — and tools must normalise variants before comparing them. The clinical meaning of such variants belongs to Medicine Atlas ([genetics](/learn/medicine/course.php?c=genetics)).
:::

::: history
The dynamic-programming approach to comparing sequences was published by Saul Needleman and Christian Wunsch in 1970, for proteins; Vladimir Levenshtein had defined the edit distance between strings in 1965 (published in English in 1966), and similar algorithms were found independently in speech recognition and computer science in the late 1960s and early 1970s. Peter Sellers (1974) put the comparison on a metric footing, Temple Smith and Michael Waterman published the local alignment algorithm in 1981, and Osamu Gotoh the efficient treatment of affine gaps in 1982. Dayhoff's PAM matrices appeared in 1978 and the Henikoffs' BLOSUM matrices in 1992, and the statistical interpretation of scores as log-odds ratios was made explicit by Stephen Altschul in 1991.
:::

::: summary
- An alignment pairs residues of two sequences in order, with gaps; it is a hypothesis about which residues share an ancestor ([[#def-alignment]]). Its score sums substitution scores and gap penalties ([[#def-score]]).
- There are exponentially many alignments ([[#prop-count]]), but optimal substructure allows dynamic programming in $O(mn)$ time.
- Substitution scores are log-odds ratios $\frac1\lambda\log(q_{ab}/p_ap_b)$ of pair frequencies in related versus random sequences ([[#prop-logodds]]); PAM matrices are extrapolated from close relatives, BLOSUM matrices estimated from blocks clustered at a threshold identity (BLOSUM62).
- Needleman–Wunsch finds the optimal global alignment ([[#alg-nw]]), Smith–Waterman the optimal local alignment by allowing a fresh start (0) and taking the maximum anywhere ([[#alg-sw]]); semi-global alignment frees the end gaps.
- Affine gap penalties $-d - (g-1)e$ favour single long indels and need three coupled matrices ([[#prop-gotoh]]).
- Linear-space and banded variants reduce memory and time. An optimal alignment exists for any pair of sequences; whether its score indicates homology must be judged statistically. Homology is not a percentage.
:::

## Exercises

::: exercise Scoring an alignment {level=1 check="2"}
Score the alignment

```
ACGTTGA
A-GTCGA
```

with match $+1$, mismatch $-1$ and a linear gap penalty of 2.
::: solution
Columns: `A`/`A` $+1$, `C`/`-` $-2$, `G`/`G` $+1$, `T`/`T` $+1$, `T`/`C` $-1$, `G`/`G` $+1$, `A`/`A` $+1$. Total $5 - 1 - 2 = 2$.
:::
:::

::: exercise Counting alignments {level=1 check="63"}
Use the recurrence of [[#prop-count]] to find the number of alignments of two sequences of length 3.
::: solution
$D(1,1) = 1 + 1 + 1 = 3$; $D(2,1) = D(1,1) + D(2,0) + D(1,0) = 3 + 1 + 1 = 5$, and likewise $D(1,2) = 5$; $D(2,2) = 5 + 5 + 3 = 13$; $D(3,1) = 7$, $D(3,2) = D(2,2) + D(3,1) + D(2,1) = 13 + 7 + 5 = 25$, likewise $D(2,3) = 25$; $D(3,3) = 25 + 25 + 13 = 63$.
:::
:::

::: exercise A small dynamic programme {level=1}
Fill the Needleman–Wunsch matrix for $x = $ `GAT` and $y = $ `GT` with match $+1$, mismatch $-1$ and gap penalty 2, and give the optimal alignment.
::: solution
Rows `–`, `G`, `A`, `T`; columns `–`, `G`, `T`:

| | – | G | T |
|---|---|---|---|
| – | 0 | −2 | −4 |
| G | −2 | 1 | −1 |
| A | −4 | −1 | 0 |
| T | −6 | −3 | 0 |

For instance $F(2,2) = \max(F(1,1) - 1, F(1,2) - 2, F(2,1) - 2) = \max(0, -3, -3) = 0$ and $F(3,2) = \max(F(2,1) + 1, F(2,2) - 2, F(3,1) - 2) = \max(0, -2, -5) = 0$. The optimal score is 0, and tracing back from $(3,2)$ diagonally to $(2,1)$ ($-1 + 1 = 0$), then up to $(1,1)$ ($1 - 2 = -1$), then diagonally to $(0,0)$ gives `GAT` over `G-T`: two matches and one gap, $2 - 2 = 0$.
:::
:::

::: exercise Affine penalties {level=2 check="-25"}
With NCBI BLAST's convention, a gap of length $g$ costs $a + bg$ with $a = 11$ and $b = 1$. What is the total gap score of an alignment containing one gap of length 1 and one gap of length 2? Write it as a negative number. How would the answer change if the two gaps were merged into one gap of length 3?
::: solution
The gaps cost $11 + 1 = 12$ and $11 + 2 = 13$, so the gap score is $-25$. A single gap of length 3 would cost $11 + 3 = 14$, almost half as much: under affine penalties, one indel event of three residues is far cheaper than two separate events.
:::
:::

::: exercise A log-odds score {level=2 check="-3"}
In a set of alignments, aspartate has background frequency $p_\mathtt{D} = 0.05$ and leucine $p_\mathtt{L} = 0.10$, and the unordered pair {`D`, `L`} accounts for $0.0035$ of all aligned pairs. Compute the score in half-bits, rounded to the nearest integer, and interpret its sign.
::: solution
The chance expectation for the unordered pair is $2p_\mathtt{D}p_\mathtt{L} = 0.01$. The ratio is $0.0035/0.01 = 0.35$, and $2\log_2 0.35 = 2\times(-1.515) = -3.03$, which rounds to $-3$. A negative score means the pair is seen less often in related sequences than by chance: replacing a charged residue with a hydrophobic one is usually selected against.
:::
:::

::: exercise Global or local? {level=2}
A 300-residue protein from a newly sequenced bacterium is compared with a 900-residue protein in Swiss-Prot. The global alignment scores $-45$ and the local alignment scores $+180$, covering residues 20–290 of the new protein and 410–690 of the known one. (a) Interpret the two scores. (b) What would you look for next?
::: solution
(a) The global score is negative because the alignment must include about 600 unmatched residues of the longer protein, costing gap penalties, and the poorly matching ends. That does not argue against homology. The local alignment shows a strongly similar region of about 270 residues, which most likely corresponds to a shared domain; the known protein has additional regions (perhaps other domains) absent from the new one.

(b) Whether the local score is significant (an E-value, [[bioinformatics/database-search]]); what domain the region 410–690 contains in the known protein (Pfam, InterPro); and whether residues known to be essential for function in that domain are conserved in the new protein. Function should be transferred only for the shared domain, and cautiously.
:::
:::

::: exercise The memory wall {level=3}
(a) How much memory would a full Needleman–Wunsch matrix need to align two bacterial genomes of $5\times10^6$ bases, storing 4 bytes per cell? (b) How much is needed to compute the optimal score alone? (c) Outline how Hirschberg's method recovers the alignment in linear space.
::: solution
(a) $(5\times10^6)^2\times4 = 10^{14}$ bytes, about 100 TB — impossible on ordinary computers.

(b) Each row depends only on the previous one, so two rows of $5\times10^6$ cells, 40 MB, suffice for the score.

(c) Compute, in linear space, the scores of optimal alignments of the first half of $x$ with every prefix of $y$ (forward pass), and of the second half of $x$ with every suffix of $y$ (a pass on the reversed sequences). The optimal path crosses the middle row at the column $j$ that maximises the sum of the two. Record that point, then recurse on the two subproblems (first half of $x$ with $y_{1..j}$, second half with $y_{j+1..n}$). The subproblems have total area half of the original, so the total time is at most about twice that of a single pass, $O(mn)$, and memory stays $O(m + n)$. In practice, whole genomes are aligned by anchoring on exact matches and filling the gaps between anchors.
:::
:::

::: exercise Free end gaps {level=3}
You want to align a sequencing read $x$ of 150 bases to a 2,000-base region $y$ of a reference, so that the whole read is aligned but only part of the reference is used. (a) How should the initialisation and termination of [[#alg-nw]] be changed? (b) Why is Smith–Waterman not quite right for this task? (c) Two reads from the same position differ only in that one ends in 20 bases of adapter sequence. How would global, semi-global and local alignment treat them?
::: solution
(a) Set $F(0, j) = 0$ for all $j$, so the read may start anywhere in the reference at no cost, keep $F(i, 0) = -id$ so that skipping read bases is penalised, and take the best score in the last row, $\max_jF(m, j)$, so that the read may end anywhere. Trace back from that cell to row 0.

(b) Smith–Waterman may drop poorly matching ends of the read ("soft clipping"), reporting only its best-matching part. Sometimes that is desirable, but it does not force the whole read to be explained, so true mismatches near the ends — which may be variants — can be hidden.

(c) Global alignment against the 2,000-base region would be dominated by gaps for the reference and is inappropriate. Semi-global alignment would force the 20 adapter bases to be aligned, as mismatches or gaps, lowering the score and possibly distorting the alignment near the end. Local alignment would align the genomic part and clip the adapter. This is why read mappers use local or clipped alignment, and why adapters are usually trimmed before mapping.
:::
:::
