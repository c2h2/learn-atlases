In 1992 a dentist in Florida was suspected of having transmitted HIV to several of his patients. Epidemiology could not settle the question: the patients had no other known contact with him, but HIV infection was common enough that coincidence was conceivable. The decisive evidence came from a tree. Chin-Yih Ou and colleagues at the US Centers for Disease Control sequenced part of the viral envelope gene from the dentist, his patients and other people with HIV in the same area, and inferred the phylogeny of the viruses. Viruses from five of the patients clustered with the dentist's, apart from the local controls, a pattern very unlikely if they had been infected independently. The analysis was contested, and has been re-examined with better methods since, but it showed that a phylogeny inferred from sequences could be evidence about events that no one had witnessed.

The course on evolution introduced trees and the first methods for building them: reading clades, counting trees, Fitch parsimony, UPGMA, the Jukes–Cantor correction and the ideas of likelihood, Bayesian inference and the bootstrap ([[evolution/phylogenetics]]). This chapter develops the statistical machinery that modern phylogenetics actually uses. We define substitution models as continuous-time Markov chains, derive distances from them, build trees by neighbour joining, compute likelihoods with Felsenstein's pruning algorithm, search tree space, choose models, measure support and sample trees by Markov chain Monte Carlo. The input to all of it is a multiple alignment, and its errors become the tree's ([[bioinformatics/multiple-alignment]]).

## Models of substitution

Every model-based method rests on a description of how a site changes along a branch. The standard description is a Markov process in continuous time: the base at a site changes at random moments, the probability of a change in a short interval depends only on the current base, and different sites (in the simplest models) evolve independently and identically.

::: definition Substitution model {#def-qmatrix}
A **substitution model** for nucleotides is a continuous-time Markov chain on $\{\mathtt{A}, \mathtt{C}, \mathtt{G}, \mathtt{T}\}$ with an **instantaneous rate matrix** $Q = (q_{ij})$: for $i \ne j$, $q_{ij}\,dt$ is the probability that base $i$ changes to base $j$ in a short time $dt$, and $q_{ii} = -\sum_{j\ne i}q_{ij}$. The **transition probabilities** over a branch of length $t$ are the entries of the matrix exponential

$$
P(t) = e^{Qt},\qquad P_{ij}(t) = \Prob(\text{base } j \text{ at the end} \mid \text{base } i \text{ at the start}).
$$ {#eq-pt}

$Q$ is scaled so that the expected number of substitutions per unit time at equilibrium, $-\sum_i\pi_iq_{ii}$, is 1, where $\pi$ is the stationary distribution ($\pi Q = 0$). Branch lengths $t$ are then measured in **expected substitutions per site**.
:::

The models in common use form a nested family.

- **JC69** (Thomas Jukes and Charles Cantor, 1969): every change has the same rate, and $\pi_i = \tfrac14$. Its transition probabilities, derived in [[population-genetics/neutral-theory]], are $P_{ii}(t) = \tfrac14 + \tfrac34e^{-4t/3}$ and $P_{ij}(t) = \tfrac14 - \tfrac14e^{-4t/3}$ for $i \ne j$.
- **K80** (Motoo Kimura, 1980): **transitions** (purine↔purine, `A`↔`G`, and pyrimidine↔pyrimidine, `C`↔`T`) occur at rate $\alpha$, each **transversion** at rate $\beta$; the ratio $\kappa = \alpha/\beta$ is typically 2–10 in real DNA, because transitions arise more easily by mutation.
- **HKY85** (Masami Hasegawa, Hirohisa Kishino and Taka-aki Yano, 1985) adds unequal base frequencies $\pi_i$ to K80; **GTR** (the general time-reversible model, Simon Tavaré, 1986) allows six exchange rates and four frequencies, $q_{ij} = r_{ij}\pi_j$ with $r_{ij} = r_{ji}$.
- **Rate variation among sites.** Codon third positions and loops change fast, active sites slowly. Ziheng Yang (1993, 1994) modelled this by multiplying each site's rates by a factor drawn from a gamma distribution with mean 1 and shape $\alpha_\Gamma$ (small $\alpha_\Gamma$, strong variation), approximated by four or so discrete rate categories; a proportion of **invariant sites** ("+I") is sometimes added. These are written GTR+Γ, HKY+I+Γ and so on.

All these models are **time-reversible**: $\pi_iq_{ij} = \pi_jq_{ji}$, so the process run backwards looks the same as forwards. Reversibility is assumed for convenience rather than because it is known to hold, and it has an important consequence for likelihood calculations ([[#prop-pulley]]). For proteins, empirical rate matrices with 20 states, such as WAG (Simon Whelan and Nick Goldman, 2001) and LG (Si Quang Le and Olivier Gascuel, 2008), play the role of GTR.

::: proposition The K80 distance {#prop-k80}
Under the K80 model, let $P$ and $Q$ be the proportions of sites at which two sequences differ by a transition and by a transversion. The maximum-likelihood estimate of the distance, in expected substitutions per site, is

$$
\hat d = -\tfrac12\ln(1 - 2P - Q) - \tfrac14\ln(1 - 2Q).
$$ {#eq-k80}

It reduces to the Jukes–Cantor distance when transitions make up one third of all differences, $P = Q/2$.
:::

::: proof
Write $T = 2t$ for the total time separating the sequences. Solving the K80 chain (with rates $\alpha$ for the one transition and $\beta$ for each of the two transversions from each base) gives the probabilities of a transition difference and of a transversion difference,

$$
P(T) = \tfrac14 + \tfrac14e^{-4\beta T} - \tfrac12e^{-2(\alpha+\beta)T},\qquad Q(T) = \tfrac12 - \tfrac12e^{-4\beta T}.
$$

Hence $e^{-4\beta T} = 1 - 2Q$ and $e^{-2(\alpha+\beta)T} = 1 - 2P - Q$. The distance is the expected number of substitutions, $d = (\alpha + 2\beta)T = \tfrac12\cdot2(\alpha+\beta)T + \tfrac14\cdot4\beta T$, and substituting the logarithms of the two expressions gives [[#eq-k80]]. Since $P$ and $Q$ are the maximum-likelihood estimates of the two probabilities and $d$ is a function of them, $\hat d$ is the maximum-likelihood estimate of $d$. If $P = Q/2$, then $1 - 2P - Q = 1 - 2Q$ and $\hat d = -\tfrac34\ln(1 - 2Q) = -\tfrac34\ln(1 - \tfrac43p)$ with $p = P + Q = \tfrac32Q$.
:::

::: example Correcting for transitions {#ex-k80}
Two aligned sequences differ at 20 % of sites: 15 % by transitions and 5 % by transversions. Compare the uncorrected, Jukes–Cantor and K80 distances.
::: solution
Uncorrected: $p = 0.20$. Jukes–Cantor: $\hat d = -\tfrac34\ln(1 - \tfrac43\times0.20) = -0.75\ln0.7333 = 0.233$. K80, by [[#eq-k80]]:

$$
\hat d = -\tfrac12\ln(1 - 0.30 - 0.05) - \tfrac14\ln(1 - 0.10) = 0.5\times0.4308 + 0.25\times0.1054 = 0.242.
$$

Transitions are three times as common as transversions here, whereas JC assumes they make up a third of changes. Because transitions saturate faster, more of them have been hidden by multiple hits than JC allows, and the K80 distance is larger. The differences between corrections grow quickly with divergence.
:::
:::

::: widget plot
f: 0.25 + 0.25*exp(-4*x/(k + 2)) + 0.5*exp(-2*(k + 1)*x/(k + 2)); 0.25 + 0.25*exp(-4*x/(k + 2)) - 0.5*exp(-2*(k + 1)*x/(k + 2)); 0.5 - 0.5*exp(-4*x/(k + 2))
x: 0, 3
y: 0, 1
sliders: k=2:1:20:0.5
labels: \text{same base}; \text{transition difference}; \text{transversion difference}
caption: Under the K80 model with transition/transversion rate ratio $\kappa$ (slider k), the probabilities that two sequences separated by $d$ expected substitutions per site (horizontal axis) carry the same base, differ by a transition, or differ by a transversion. Set $\kappa = 1$ (the Jukes–Cantor case) and the transition curve sits below the transversion curve, since there are two transversions for every transition. Raise $\kappa$: transition differences rise quickly and level off near 0.25 while transversions accumulate slowly towards 0.5. Saturated transitions carry little information about deep branches — one reason why deep phylogenies often rely on transversions or amino acids.
:::

## Distance methods and neighbour joining

A distance method first reduces the alignment to a matrix of pairwise distances, each corrected for multiple hits under a model, and then finds a tree whose path lengths fit the matrix. UPGMA ([[evolution/phylogenetics]]) does this assuming a molecular clock; when rates differ among lineages it can join the wrong pairs. The fix is to fit an **additive** tree without a clock.

::: proposition The four-point condition {#prop-fourpoint}
A matrix of distances is **additive** — exactly equal to the path lengths of some tree with positive branch lengths — if and only if for every four taxa $i, j, k, l$, the three sums

$$
d_{ij} + d_{kl},\qquad d_{ik} + d_{jl},\qquad d_{il} + d_{jk}
$$

are such that the two largest are equal (Peter Buneman, 1971). The smallest sum identifies the split of the four taxa in the tree: if $d_{ij} + d_{kl}$ is smallest, the tree separates $\{i, j\}$ from $\{k, l\}$.
:::

::: proof
For the "only if" direction, take a tree in which the paths from $i$ and $j$ meet before joining the path between $k$ and $l$, the two meeting points being joined by an internal path of length $b > 0$. In $d_{ik} + d_{jl}$ and $d_{il} + d_{jk}$, each external path is counted once and the internal path twice, so both sums equal $E + 2b$, where $E$ is the total length of the four external paths; in $d_{ij} + d_{kl}$ the internal path is not used, giving $E$. So the two largest sums are equal, and the smallest identifies the split. The converse, that a matrix satisfying the condition for all quartets comes from a tree, is proved by constructing the tree one taxon at a time and is omitted.
:::

Real distances, estimated from finite data under imperfect models, are never exactly additive. **Neighbour joining** (Naruya Saitou and Masatoshi Nei, 1987, in the form given by James Studier and Karl Keppler, 1988) builds a tree from them quickly and recovers the right tree whenever the distances are additive, or nearly so.

::: algorithm Neighbour joining {#alg-nj}
Start with all $n$ taxa as nodes, joined to no one, and their distance matrix $d$.

1. For each node $i$ compute $r_i = \sum_kd_{ik}$, its total distance to all other current nodes.
2. For each pair compute
$$
Q_{ij} = (n - 2)\,d_{ij} - r_i - r_j,
$$ {#eq-njq}
and choose the pair $i, j$ with the smallest $Q_{ij}$.
3. Join $i$ and $j$ to a new node $u$, with branch lengths
$$
\ell_{iu} = \tfrac12d_{ij} + \frac{r_i - r_j}{2(n - 2)},\qquad \ell_{ju} = d_{ij} - \ell_{iu}.
$$
4. Set $d_{uk} = \tfrac12(d_{ik} + d_{jk} - d_{ij})$ for every other node $k$, remove $i$ and $j$, add $u$, and decrease $n$ by 1.
5. Repeat until two nodes remain; join them with a branch of length equal to their distance.

The result is an unrooted tree. Each round costs $O(n^2)$, so the algorithm takes $O(n^3)$ time.
:::

Why $Q_{ij}$ and not simply the smallest $d_{ij}$? Two taxa can be close because both sit on short branches without being neighbours, as when one lineage has evolved slowly. Subtracting $r_i$ and $r_j$ corrects for this: a taxon far from everything (on a long branch) has a large $r_i$, which makes its $Q$ values smaller and lets it be joined to its true neighbour despite a large distance. The branch-length formula apportions $d_{ij}$ between $i$ and $j$ according to how far each is from the rest.

::: example Neighbour joining five taxa {#ex-nj}
Build the neighbour-joining tree for the distance matrix

| | A | B | C | D | E |
|---|---|---|---|---|---|
| A | 0 | 5 | 8 | 7 | 8 |
| B | 5 | 0 | 9 | 8 | 9 |
| C | 8 | 9 | 0 | 7 | 8 |
| D | 7 | 8 | 7 | 0 | 5 |
| E | 8 | 9 | 8 | 5 | 0 |
::: solution
**Round 1** ($n = 5$). The row sums are $r_A = 28$, $r_B = 31$, $r_C = 32$, $r_D = 27$, $r_E = 30$. Then $Q_{AB} = 3\times5 - 28 - 31 = -44$, $Q_{DE} = 3\times5 - 27 - 30 = -42$, $Q_{CD} = Q_{CE} = -38$, and every other $Q$ is $-36$ or $-34$. Join A and B to a node $u$, with $\ell_{Au} = \tfrac52 + (28 - 31)/6 = 2$ and $\ell_{Bu} = 3$. New distances: $d_{uC} = \tfrac12(8 + 9 - 5) = 6$, $d_{uD} = 5$, $d_{uE} = 6$.

**Round 2** ($n = 4$: $u$, C, D, E). Row sums $r_u = 17$, $r_C = 21$, $r_D = 17$, $r_E = 19$. $Q_{Cu} = 2\times6 - 21 - 17 = -26$ and $Q_{DE} = 2\times5 - 17 - 19 = -26$ tie for smallest; with four nodes, joining either pair produces the same tree. Join C and $u$ to $v$: $\ell_{Cv} = 3 + (21 - 17)/4 = 4$, $\ell_{uv} = 2$; $d_{vD} = \tfrac12(7 + 5 - 6) = 3$, $d_{vE} = 4$.

**Round 3** ($n = 3$: $v$, D, E). All $Q$ values are equal ($-12$); join D and E to $w$ with $\ell_{Dw} = \tfrac52 + (8 - 9)/2 = 2$ and $\ell_{Ew} = 3$; then $d_{vw} = \tfrac12(3 + 4 - 5) = 1$.

The tree is A–$u$ 2, B–$u$ 3, $u$–$v$ 2, C–$v$ 4, $v$–$w$ 1, D–$w$ 2, E–$w$ 3. Every path length in it equals the corresponding matrix entry (for example A to D: $2 + 2 + 1 + 2 = 7$): the matrix was additive, and neighbour joining has recovered its tree exactly. Notice that A and B are joined first although their distance, 5, is no smaller than that of D and E.
:::
:::

::: widget graph
nodes: A@0,1; B@0,-1; u@1,0; v@2.5,0; C@2.5,1.5; w@4,0; D@5,1; E@5,-1
edges: A-u:2; B-u:3; u-v:2; C-v:4; v-w:1; D-w:2; E-w:3
algorithm: dijkstra
start: A
caption: The neighbour-joining tree of [[#ex-nj]], with branch lengths on the edges and internal nodes $u$, $v$, $w$. Run Dijkstra's algorithm from A (or choose another start): the shortest-path distances to the other leaves, 5, 8, 7 and 8, reproduce row A of the distance matrix, because the matrix is additive. In a tree there is only one path between two nodes, so "shortest path" here is simply "the path".
:::

Neighbour joining remains the fastest reasonable method, and is used for very large data sets, for guide trees in alignment ([[bioinformatics/multiple-alignment#alg-progressive]]) and as a starting tree for likelihood searches. Its weakness is the reduction to distances: a matrix of $\binom n2$ numbers discards most of the information in the alignment, and distances between distant taxa are estimated with large variances that the method does not take into account. Weighted variants such as BIONJ (Gascuel, 1997) and minimum-evolution methods (FastME) reduce, but do not remove, these problems.

## Maximum likelihood

The likelihood approach uses the whole alignment. Given a tree topology $\tau$, its branch lengths $\mathbf{t}$ and a substitution model with parameters $\theta$, the probability of the observed alignment $X$ is the **likelihood** $L(\tau, \mathbf t, \theta) = \Prob(X\mid\tau, \mathbf t, \theta)$, and the maximum-likelihood tree is the one that, with its best branch lengths and parameters, makes the data most probable. Because sites are assumed to evolve independently, $L = \prod_{\text{sites }s}\Prob(X_s\mid\tau, \mathbf t, \theta)$, and one works with $\ln L$, a sum over sites.

The likelihood of a single site requires summing over all possible bases at the internal nodes of the tree — $4^{n-2}$ combinations for an unrooted tree of $n$ taxa. Joseph Felsenstein (1981) showed that this sum can be organised, like a parsimony count, from the tips towards the root.

::: algorithm Felsenstein's pruning algorithm {#alg-pruning}
Root the tree at any node. For each node $v$ and base $a$, let $L_v(a)$ be the probability of the observed bases at the tips below $v$, given that $v$ has base $a$.

1. **Tips.** $L_v(a) = 1$ if the observed base at tip $v$ is $a$, and 0 otherwise. (For a gap or an ambiguous base, $L_v(a) = 1$ for every compatible $a$.)
2. **Internal nodes**, visited after their children: for a node $v$ with children $c$ at branch lengths $t_c$,
$$
L_v(a) = \prod_{c}\left(\sum_bP_{ab}(t_c)\,L_c(b)\right).
$$ {#eq-pruning}
3. **Root.** The site likelihood is $\sum_a\pi_a\,L_\text{root}(a)$.

The work per site is $O(n\cdot4^2)$ for $n$ taxa, linear in the size of the tree.
:::

The children's contributions multiply because, given the base at $v$, the evolution of different subtrees is independent; within each, the sum over $b$ accounts for every base the child might have. Each internal node is thus visited once, rather than every combination of internal bases being enumerated.

::: proposition The pulley principle {#prop-pulley}
For a time-reversible model at equilibrium, the likelihood of an unrooted tree does not depend on where the root is placed. Equivalently, only the sum of the two branch lengths beside the root can be estimated.
:::

::: proof
Consider a root on the branch between nodes $x$ and $y$, at distances $t_1$ and $t_2$ from them. Summing over the root base $r$, the contribution is $\sum_r\pi_rP_{rx}(t_1)P_{ry}(t_2)$ for bases $x$ and $y$ at the two nodes. Reversibility, $\pi_rP_{rx}(t) = \pi_xP_{xr}(t)$, turns this into $\pi_x\sum_rP_{xr}(t_1)P_{ry}(t_2) = \pi_xP_{xy}(t_1 + t_2)$ by the Chapman–Kolmogorov equation. Only $t_1 + t_2$ appears, so moving the root along the branch (or onto another branch, by the same argument repeatedly) leaves the likelihood unchanged.
:::

This is why likelihood and most Bayesian programs produce **unrooted** trees, which must be rooted afterwards, usually with an **outgroup** known to lie outside the group of interest.

::: example A site on two four-taxon trees {#ex-pruning}
Under JC69 with every branch of length 0.1, compute the likelihood of the site pattern `AAGG` (taxa 1–4) on the tree ((1,2),(3,4)), and compare it with the tree ((1,3),(2,4)).
::: solution
For $t = 0.1$, $e^{-4t/3} = 0.8752$, so $P_{aa} = 0.25 + 0.75\times0.8752 = 0.9064$ and $P_{ab} = 0.25 - 0.25\times0.8752 = 0.0312$ for $a\ne b$.

On ((1,2),(3,4)) put the root at the node $u$ joining 1 and 2, with the other internal node $w$ (joining 3 and 4) as a child. For the cherry at $w$, both tips are `G`: $L_w(\mathtt{G}) = 0.9064^2 = 0.8215$ and $L_w(a) = 0.0312^2 = 0.00097$ for $a \ne \mathtt{G}$. At $u$, with tips `A`, `A` and child $w$ at distance 0.1,

$$
L_u(a) = P_{a\mathtt{A}}(0.1)^2\sum_bP_{ab}(0.1)L_w(b).
$$

The dominant terms are $a = \mathtt{A}$ (two matching tips, one change on the internal branch) and $a = \mathtt{G}$ (one change on each of two tip branches, i.e. two changes). Summing over $a$ with weights $\tfrac14$ gives $5.65\times10^{-3}$ for this site. On ((1,3),(2,4)) the pattern requires at least two changes on separate tip branches, and the likelihood is $3.77\times10^{-4}$, fifteen times smaller. The site therefore supports the grouping of the taxa sharing a base, as parsimony would — but likelihood also weighs how probable the required changes are given the branch lengths, which is what protects it from long-branch attraction when the model is adequate.
:::
:::

The computation in Python, with the tree written as nested lists of (child, branch length) pairs:

```python
import math

BASES = "ACGT"

def p_jc(t):
    """Jukes-Cantor transition probabilities for a branch of t substitutions/site."""
    same = 0.25 + 0.75 * math.exp(-4 * t / 3)
    diff = 0.25 - 0.25 * math.exp(-4 * t / 3)
    return lambda a, b: same if a == b else diff

def partial(node, site):
    """Felsenstein's pruning: L[a] = P(data below node | node has base a)."""
    if isinstance(node, str):                      # a leaf: its observed base
        return {a: 1.0 if site[node] == a else 0.0 for a in BASES}
    L = {a: 1.0 for a in BASES}
    for child, t in node:                          # an internal node: list of (child, branch length)
        Lc, P = partial(child, site), p_jc(t)
        for a in BASES:
            L[a] *= sum(P(a, b) * Lc[b] for b in BASES)
    return L

def site_likelihood(tree, site):
    L = partial(tree, site)
    return sum(0.25 * L[a] for a in BASES)         # equilibrium frequencies at the root

# unrooted four-taxon trees, rooted at one internal node; all branches 0.1
T1 = [("1", 0.1), ("2", 0.1), ([("3", 0.1), ("4", 0.1)], 0.1)]   # ((1,2),(3,4))
T2 = [("1", 0.1), ("3", 0.1), ([("2", 0.1), ("4", 0.1)], 0.1)]   # ((1,3),(2,4))
for pattern in ["AAGG", "AGAG", "AAAA"]:
    site = dict(zip("1234", pattern))
    print(pattern, f"{site_likelihood(T1, site):.3e}", f"{site_likelihood(T2, site):.3e}")
```

```
AAGG 5.653e-03 3.772e-04
AGAG 3.772e-04 5.653e-03
AAAA 1.530e-01 1.530e-01
```

Constant sites (`AAAA`) are equally probable on both trees: they carry information about branch lengths and rates but not about topology. Only sites whose pattern splits the taxa discriminate between trees.

### Searching tree space

Computing the likelihood of one tree, with branch lengths optimised numerically, is fast. Finding the best tree is not: the number of unrooted trees of $n$ taxa is $(2n - 5)!! = 3\times5\times\cdots\times(2n - 5)$ ([[evolution/phylogenetics]]), more than $10^{20}$ for 20 taxa, and the problem is NP-hard. Programs therefore climb from a good starting tree (often neighbour joining or a parsimony tree) by rearrangements:

- **Nearest-neighbour interchange** (NNI) swaps two subtrees across an internal branch, giving $2(n - 3)$ neighbours of each tree;
- **Subtree pruning and regrafting** (SPR) cuts off a subtree and reattaches it on any other branch;
- **Tree bisection and reconnection** (TBR) cuts the tree in two and reconnects any branch of one part to any branch of the other.

Larger moves escape more local optima at greater cost per step. PhyML (Stéphane Guindon and Olivier Gascuel, 2003), RAxML (Alexandros Stamatakis, 2006) and IQ-TREE (Lam-Tung Nguyen, Bui Quang Minh and colleagues, 2015) combine fast NNI hill-climbing with occasional larger perturbations and restarts, and analyse alignments of thousands of taxa and millions of sites. None can guarantee the global optimum; independent searches that reach the same tree are the practical check.

### Choosing a model

More complex models always fit better, so likelihood alone cannot choose among them. The standard criteria penalise parameters ([[biostatistics/linear-models]]): Akaike's information criterion $\mathrm{AIC} = 2k - 2\ln L$ and the Bayesian information criterion $\mathrm{BIC} = k\ln N - 2\ln L$ for $k$ free parameters and $N$ sites, the lower value being preferred. Programs such as ModelFinder (Subha Kalyaanamoorthy and colleagues, 2017) fit dozens of models and report the best.

::: example Choosing a substitution model {#ex-aic}
For one alignment and tree (illustrative numbers), the maximised log-likelihoods are: JC69 $-5210.4$; K80 $-5120.7$; HKY85 $-5101.2$; GTR $-5098.9$; GTR+Γ $-5021.3$. Counting only the substitution-model parameters (branch lengths are common to all, so they cancel in comparisons), these models have 0, 1, 4, 8 and 9 free parameters. Which does AIC prefer?
::: solution
$\mathrm{AIC} = 2k - 2\ln L$: JC69 $10{,}420.8$; K80 $2 + 10{,}241.4 = 10{,}243.4$; HKY85 $8 + 10{,}202.4 = 10{,}210.4$; GTR $16 + 10{,}197.8 = 10{,}213.8$; GTR+Γ $18 + 10{,}042.6 = 10{,}060.6$. GTR+Γ is preferred by a wide margin, mainly because of rate variation among sites (the drop of about 78 log-likelihood units for one extra parameter). Note that GTR without Γ is slightly worse than HKY85: its four extra exchange rates improve $\ln L$ by only 2.3 units, less than the penalty of 8 AIC units. Rate heterogeneity is almost always the most important addition to a model.
:::
:::

## How confident should we be?

A maximum-likelihood tree is a point estimate. Felsenstein's **bootstrap** (1985), introduced in [[evolution/phylogenetics]], assesses its sampling variability by resampling alignment columns with replacement. It is computationally heavy — a full tree search per replicate — so faster approximations are now common: the **ultrafast bootstrap** (Minh, Minh Anh Thi Nguyen and Arndt von Haeseler, 2013) reuses trees visited during the search, and the **SH-like approximate likelihood-ratio test** (Guindon and colleagues, 2010) assesses each branch by comparing the best tree with its NNI neighbours. Their values are calibrated differently: the standard bootstrap is conservative, ultrafast bootstrap values are higher for the same clade, and its authors advise trusting a clade only above about 95 %, compared with the 70 % often used as a rule of thumb for the standard bootstrap. Support values from different methods should not be compared as if they were on one scale.

::: warning Support is not truth
A bootstrap value measures how consistently the data, resampled, give a clade under one method and model. It is not the probability that the clade is correct, and it does not measure systematic error. With genome-scale data, sampling error becomes tiny, every clade can reach 100 % support, and a wrong model — one that ignores changes in base composition between lineages, for example, or that is fooled by long branches — can give a wrong tree with complete confidence. Bayesian posterior probabilities have the same limitation and tend to be higher than bootstrap values for the same clade. Confidence in a clade comes from its recovery by different data, models and methods, not from one large number.
:::

### Bayesian inference

Bayesian phylogenetics treats the tree, branch lengths and model parameters as random variables with prior distributions and computes their joint posterior distribution,

$$
\Prob(\tau, \mathbf t, \theta\mid X) = \frac{\Prob(X\mid\tau, \mathbf t, \theta)\,\Prob(\tau, \mathbf t, \theta)}{\Prob(X)}.
$$

The denominator, a sum over all trees and an integral over all parameters, cannot be computed. **Markov chain Monte Carlo** (MCMC) avoids it: a Markov chain is constructed whose stationary distribution is the posterior, and the states it visits are a sample from it. In the **Metropolis–Hastings** algorithm the chain proposes a change — a new branch length, a new $\kappa$, an NNI or SPR move — and accepts it with probability

$$
\min\left(1,\ \frac{\Prob(X\mid\text{new})\Prob(\text{new})}{\Prob(X\mid\text{old})\Prob(\text{old})}\cdot\frac{q(\text{old}\mid\text{new})}{q(\text{new}\mid\text{old})}\right),
$$

where $q$ is the proposal distribution; $\Prob(X)$ cancels. After a "burn-in" period, the proportion of sampled trees containing a clade estimates its **posterior probability**. Bayesian methods were introduced by Bruce Rannala and Ziheng Yang (1996), Bob Mau, Michael Newton and Bret Larget (1997) and Shuying Li (1996), and made widely available by MrBayes (John Huelsenbeck and Fredrik Ronquist, 2001). BEAST (Alexei Drummond and Andrew Rambaut, 2007) adds relaxed molecular clocks, sampling dates and population models, which is why it dominates the dating of trees and the study of epidemics ([[evolution/phylogenetics]]). The practical difficulties are convergence — chains must run long enough, which is checked by comparing independent runs and by effective sample sizes — and priors, which can affect branch lengths and dates noticeably.

::: quiz
In a Bayesian analysis, a clade appears in 9,400 of 10,000 trees sampled after burn-in. What is its estimated posterior probability, and what does it depend on?
- [ ] 0.94, and it depends only on the data.
- [x] 0.94, and it depends on the data, the substitution model and the priors, assuming the chain has converged.
- [ ] 0.06, since this is the probability that the clade is wrong.
- [ ] It cannot be computed without the marginal likelihood $\Prob(X)$.
::: solution
The proportion of sampled trees containing the clade, 0.94, estimates its posterior probability, provided the chain has converged and mixed well. Like every posterior it is conditional on the model and the priors: if the model is wrong, the posterior can be confidently wrong. $\Prob(X)$ is not needed, because MCMC samples from the posterior without normalising it.
:::
:::

## Systematic error and genome-scale data

Two kinds of error remain when sampling error has been made small by abundant data.

**Model misspecification.** Long-branch attraction ([[evolution/phylogenetics]]) is the famous example: under some branch-length combinations parsimony is inconsistent, and likelihood under an inadequate model can be too. Other violations are as dangerous: lineages that have independently drifted to similar base or amino-acid compositions are drawn together by models that assume constant composition; rate shifts across the tree ("heterotachy") mislead models that assume each site's rate is fixed. Richer models — site-heterogeneous mixtures for proteins, non-stationary models for composition — and careful taxon sampling (adding taxa that break up long branches) are the main defences.

**Gene trees are not species trees.** Different genes can have different histories because of incomplete lineage sorting, hybridisation and horizontal gene transfer ([[evolution/phylogenetics]]). Concatenating many genes into one alignment can then give a confident but wrong species tree, especially when internal branches are short. **Coalescent-based** methods estimate the species tree from many gene trees while allowing them to differ; ASTRAL (Siavash Mirarab and colleagues, 2014) finds the species tree that agrees with the largest number of quartets of taxa across gene trees and is consistent under the multispecies coalescent.

::: application Phylodynamics of epidemics
Pathogen genomes sampled at known dates evolve measurably during an epidemic, so time-calibrated phylogenies can estimate when an outbreak began, how fast it grew, and how lineages moved between places. During the COVID-19 pandemic, millions of SARS-CoV-2 genomes were analysed this way; the Nextstrain platform (James Hadfield, Trevor Bedford, Richard Neher and colleagues, 2018) updated phylogenies of circulating lineages continually, and variants such as Alpha and Omicron were recognised partly from the long branches leading to them. Such analyses inform public-health decisions, which are discussed in Medicine Atlas ([infectious diseases](/learn/medicine/course.php?c=infectious-diseases)); the methods are those of this chapter, applied at very large scale.
:::

::: history
Luca Cavalli-Sforza and Anthony Edwards proposed both parsimony and maximum likelihood for trees of human populations in the mid-1960s, and Walter Fitch and Emanuel Margoliash (1967) built a distance tree from cytochrome c sequences of 20 species. Kimura's two-parameter model appeared in 1980; Felsenstein published the pruning algorithm for DNA likelihood in 1981 and the bootstrap in 1985; neighbour joining followed in 1987. Yang introduced gamma-distributed rates in 1993–94, and Bayesian phylogenetics appeared in 1996–97, becoming widespread with MrBayes in 2001. Phylogenomic analyses of hundreds of genes became routine in the 2000s, and from the 2010s coalescent-aware methods and site-heterogeneous models addressed the systematic errors that large data sets had exposed.
:::

::: summary
- Substitution models are continuous-time Markov chains with rate matrix $Q$ and transition probabilities $P(t) = e^{Qt}$, branch lengths in expected substitutions per site ([[#def-qmatrix]]); JC69, K80, HKY85 and GTR form a nested family, usually with gamma-distributed rates among sites.
- Model-corrected distances such as K80's ([[#prop-k80]]) undo multiple hits. A distance matrix is tree-like if it satisfies the four-point condition ([[#prop-fourpoint]]).
- Neighbour joining chooses pairs by $Q_{ij} = (n-2)d_{ij} - r_i - r_j$, does not assume a clock and recovers additive trees exactly in $O(n^3)$ time ([[#alg-nj]]).
- Maximum likelihood scores trees by $\Prob(\text{alignment}\mid\text{tree, model})$, computed site by site with Felsenstein's pruning algorithm ([[#alg-pruning]]); reversible models give unrooted trees ([[#prop-pulley]]). Tree space is searched heuristically by NNI, SPR and TBR, and models are chosen by AIC or BIC.
- The bootstrap and its fast approximations measure sampling variability; Bayesian MCMC samples trees in proportion to their posterior probability. Neither measures systematic error, which comes from model misspecification and gene-tree discordance and is addressed by better models, taxon sampling and coalescent methods.
:::

## Exercises

::: exercise A K80 distance {level=1 check="0.1581"}
Two sequences differ by transitions at 10 % of sites and by transversions at 4 %. Compute the K80 distance (four decimal places).
::: solution
$\hat d = -\tfrac12\ln(1 - 0.20 - 0.04) - \tfrac14\ln(1 - 0.08) = 0.5\times0.2744 + 0.25\times0.0834 = 0.1372 + 0.0208 = 0.1581$.
:::
:::

::: exercise A Jukes–Cantor transition probability {level=1 check="0.7527"}
Under JC69, what is the probability that a site has the same base at both ends of a branch of length 0.3 (four decimal places)?
::: solution
$P_{ii}(0.3) = 0.25 + 0.75e^{-0.4} = 0.25 + 0.75\times0.6703 = 0.7527$. (It is not $1 - 0.3$: some of the 0.3 expected changes are multiple hits or reversals, and a change can also land back on the original base.)
:::
:::

::: exercise The four-point condition {level=1}
For taxa A, B, C, D of [[#ex-nj]], compute the three sums of the four-point condition and say which split they indicate.
::: solution
$d_{AB} + d_{CD} = 5 + 7 = 12$; $d_{AC} + d_{BD} = 8 + 8 = 16$; $d_{AD} + d_{BC} = 7 + 9 = 16$. The two largest are equal, as additivity requires, and the smallest, $d_{AB} + d_{CD}$, indicates the split AB | CD. The difference $16 - 12 = 4$ is twice the length of the internal branch that separates the two pairs in the subtree spanned by these four taxa, the branch $u$–$v$ of length 2. (The branch $v$–$w$ lies on the path to D alone, so for this quartet it is part of D's external path.)
:::
:::

::: exercise Neighbour joining with four taxa {level=2}
For taxa A, B, C and D of [[#ex-nj]] alone, compute $Q_{ij}$ for all pairs and the branch lengths of the first pair joined.
::: solution
With $n = 4$: $r_A = 5 + 8 + 7 = 20$, $r_B = 22$, $r_C = 24$, $r_D = 22$. $Q_{AB} = 2\times5 - 20 - 22 = -32$; $Q_{CD} = 2\times7 - 24 - 22 = -32$; $Q_{AC} = 16 - 44 = -28$; $Q_{AD} = 14 - 42 = -28$; $Q_{BC} = 18 - 46 = -28$; $Q_{BD} = 16 - 44 = -28$. AB and CD tie (as they must for four taxa, both identifying the same split). Joining A and B: $\ell_A = \tfrac52 + (20 - 22)/4 = 2$, $\ell_B = 3$, the same as in the five-taxon tree.
:::
:::

::: exercise Bootstrap columns {level=2 check="0.366"}
In a bootstrap replicate of an alignment of 100 columns, what is the probability that a particular column is not sampled at all (three decimal places)? What does this become for a very long alignment?
::: solution
Each of the 100 draws misses the column with probability $0.99$, so the probability is $0.99^{100} = 0.366$. For long alignments $(1 - 1/n)^n \to e^{-1} = 0.368$: each replicate omits about 37 % of the original columns and includes others several times, which is how it mimics sampling a new data set.
:::
:::

::: exercise A cherry likelihood {level=2}
Under JC69 with branches of length 0.1, compute the partial likelihoods $L_u(a)$ at the node $u$ joining two tips carrying `A` and `G`. Which ancestral bases are most plausible, and why are two of them equally so?
::: solution
With $P_{aa} = 0.9064$ and $P_{ab} = 0.0312$: $L_u(\mathtt{A}) = P_{\mathtt{AA}}P_{\mathtt{AG}} = 0.9064\times0.0312 = 0.0283$, and likewise $L_u(\mathtt{G}) = 0.0283$; $L_u(\mathtt{C}) = L_u(\mathtt{T}) = 0.0312^2 = 0.00097$. An ancestral `A` or `G` needs one change; `C` or `T` needs two. Under JC with equal branch lengths, `A` and `G` are symmetric. (Under K80 with $\kappa > 1$, `A` and `G` would still be favoured, and `C`/`T` would be even less likely, since they need two transversions.)
:::
:::

::: exercise A Metropolis–Hastings step {level=3 check="0.1003"}
An MCMC sampler for trees is at a tree with log-likelihood $-1000.0$. It proposes, by a symmetric move, a neighbouring tree with log-likelihood $-1002.3$. Both trees have equal prior probability. What is the probability that the move is accepted (four decimal places)? Why must such "downhill" moves sometimes be accepted?
::: solution
The acceptance probability is $\min(1, e^{-1002.3 - (-1000.0)}) = e^{-2.3} = 0.1003$. If only uphill moves were accepted, the chain would climb to a local optimum and stop — a hill-climbing search, not a sample. Accepting downhill moves in proportion to the ratio of posterior densities makes the chain spend time in each region of tree space in proportion to its posterior probability, which is what lets visit frequencies estimate posterior probabilities.
:::
:::

::: exercise Conflicting signals {level=3}
A study of 12 species builds trees from (i) a concatenated alignment of 1,500 genes by maximum likelihood (GTR+Γ), which groups species X with Y with 100 % bootstrap support; (ii) the same genes by a coalescent method (ASTRAL), which groups X with Z with local posterior probability 0.98; and (iii) amino-acid sequences under a site-heterogeneous model, which also groups X with Z. X and Y both have unusually high GC content and long branches. (a) Give two reasons why the concatenated analysis might be wrong despite 100 % support. (b) Which grouping is more credible, and what further analyses would you do?
::: solution
(a) Long-branch attraction combined with compositional convergence: if X and Y have independently become GC-rich, a model that assumes stationary composition will interpret their shared GC-rich sites as shared history. Second, if the internal branch is short, incomplete lineage sorting can make many gene trees differ from the species tree, and concatenation can be inconsistent in this "anomaly zone"; 100 % bootstrap support reflects the large number of sites, not freedom from these biases.

(b) X + Z, because it is supported by two analyses that address the two suspected biases (gene-tree heterogeneity and compositional effects). Further checks: recode nucleotides into purines and pyrimidines (RY coding) or remove third codon positions to reduce compositional bias; use non-stationary models; add taxa that break the long branches of X and Y; examine the distribution of gene-tree topologies; and test whether the result is driven by a few genes with strong signal.
:::
:::
