A **circuit** is a part of a network that implements an identifiable piece of its computation: a few attention heads, perhaps some neurons, and the paths between them, together with an account of what each does and how they combine. The circuits programme bets that trained networks are built, at least in part, out of such mechanisms, and that finding them is possible and worthwhile. This chapter presents the best-established examples. **Induction heads** (Olsson et al., 2022) implement in-context copying with two heads in different layers, and their appearance during training coincides with a sudden improvement in in-context learning. The **indirect-object-identification** circuit in GPT-2 small (Wang et al., 2023) involves $26$ heads in seven functional classes, and its study introduced explicit criteria — faithfulness, completeness, minimality — for judging a circuit. **Automated circuit discovery** (ACDC; Conmy et al., 2023) turns the search for circuits into an algorithm. And a one-layer Transformer trained on **modular addition** was found to compute with discrete Fourier transforms and trigonometric identities (Nanda et al., 2023), which made it possible to watch the circuit form during the delayed generalisation known as *grokking*.

The tools are those of [[interpretability/residual-stream]] — QK and OV circuits, composition, direct logit attribution — together with ablation and patching, which [[interpretability/causal-interventions]] develops in full. The laboratory builds an induction circuit by hand and verifies the Fourier algorithm for modular addition on all $113^2$ input pairs.

## What counts as a circuit {#sec-what}

A Transformer's computation can be drawn as a directed acyclic graph: nodes are the embedding, the attention heads (or their query, key and value inputs separately), the feed-forward layers (or individual neurons) and the output; an edge runs from every component to every later component that can read its output from the residual stream. A behaviour is specified by a dataset of prompts and a **metric** — for a completion task, typically the logit difference between the correct token and a plausible wrong one.

::: definition Circuit, faithfulness, completeness, minimality {#def-circuit}
A **circuit** for a task is a subgraph $C$ of the computational graph $G$. To evaluate $C$, run the model with every edge outside $C$ **ablated** — its value replaced by a reference value such as its mean over a dataset, or its value on a corrupted prompt — and compute the task metric $m(C)$. Following Wang et al. (2023):
- $C$ is **faithful** if $m(C)\approx m(G)$: the circuit alone reproduces the model's performance;
- $C$ is **complete** if for every subset $K\subseteq C$, removing $K$ from $C$ and from $G$ has similar effects, $m(C\setminus K)\approx m(G\setminus K)$ — no part of the mechanism is missing outside $C$;
- $C$ is **minimal** if every component of $C$ matters: for each $v\in C$ there is a $K$ such that $m(C\setminus K)$ and $m(C\setminus(K\cup\{v\}))$ differ substantially.
:::

Faithfulness alone is weak evidence: a circuit can reproduce the metric while missing parts that matter on other inputs, and the result depends on the ablation method — zero, mean or resampled values can give different circuits (Zhang and Nanda, 2024, studied these choices systematically). Completeness tests look for components outside the circuit that compensate when the circuit is damaged, which is where the most surprising findings, such as backup heads, came from.

::: example A faithfulness ratio {#ex-faithful}
On an IOI-style dataset, the full model's mean logit difference between the correct name and the repeated name is $3.5$. With all edges outside a candidate circuit mean-ablated, it is $3.0$; with every head mean-ablated (the circuit empty), it is $0.0$. Compute the fraction of performance the circuit recovers. If removing three heads from the circuit lowers $m(C)$ to $1.0$ but lowers the full model's metric only to $3.1$, what does this suggest?
::: solution
The normalised faithfulness is $(m(C) - m(\varnothing))/(m(G) - m(\varnothing)) = 3.0/3.5 = 0.857$: the circuit recovers about $86\%$ of the logit difference. The second observation is a completeness failure: the three heads matter a lot inside the circuit ($3.0\to1.0$) but little in the full model ($3.5\to3.1$), so something outside the circuit compensates for their loss. Wang et al. found exactly this and identified the compensating components as **backup name-mover heads**, which take over when the main name movers are ablated.
:::
:::

## Induction heads {#sec-induction}

Language is full of repeats. A name, a variable or an unusual phrase that has appeared once is much more likely to appear again, followed by the same continuation: after "Mr and Mrs Dursley … Mr", the next token is likely "Dursley". A model that can exploit such repeats predicts better the longer its context, which is the simplest form of in-context learning.

::: definition Induction head {#def-induction}
An **induction head** is an attention head that, at a position holding token $A$, attends to the position *just after* an earlier occurrence of $A$, and increases the logit of the token it attends to. On a sequence $\ldots A\,B\ldots A$ it predicts $B$. Two scores make the definition operational (Olsson et al., 2022): on random token sequences repeated twice, the **prefix-matching score** is the head's average attention from each token in the second repeat to the token after its first occurrence, and the **copying score** measures how much its OV circuit raises the logit of the attended token (positive eigenvalues of $W_EW_{OV}W_U$; [[interpretability/residual-stream]]).
:::

A single head cannot implement this: its query at position $i$ sees token $A$, but a key at position $j$ only knows token $x_j$, not which token preceded it. In a two-layer attention-only model, Elhage et al. (2021) and Olsson et al. found that the mechanism is **K-composition**:

1. A **previous-token head** in layer $1$ attends from each position $j$ to $j - 1$ and, through its OV circuit, writes (an encoding of) the token $x_{j-1}$ into the residual stream at $j$.
2. The **induction head** in layer $2$ uses, through its QK circuit, the current token $x_i$ as its query and the written previous-token information as its key, so position $j$ scores highly when $x_{j-1} = x_i$. Its OV circuit copies $x_j$ to the output.

::: proposition A two-layer induction circuit {#prop-induction}
Let the residual stream contain orthogonal subspaces for the current token (one-hot $\mathbf{e}_{x_i}$), the position (one-hot $\mathbf{p}_i$), a previous-token slot and an output slot read by the unembedding. Let head $1$ have QK circuit $\beta\,\mathbf{p}_i\T\mathbf{p}_{i-1}$-type weights (scoring key position $i - 1$ from query position $i$) and an OV circuit copying the token one-hot into the previous-token slot; let head $2$ have QK circuit $\beta$ times the identity between the query's token subspace and the key's previous-token slot, and an OV circuit copying the token one-hot into the output slot. Then as $\beta\to\infty$, on any sequence in which token $x_i$ occurred exactly once before, at position $j - 1 < i$, head $2$ at position $i$ attends entirely to position $j$ and writes $\mathbf{e}_{x_j}$ into the output slot.
:::

::: proof
Head $1$ at position $j$ has score $\beta$ for key $j - 1$ and $0$ for all others; as $\beta\to\infty$ the softmax concentrates on $j - 1$, so the previous-token slot at $j$ becomes $\mathbf{e}_{x_{j-1}}$ (at position $0$ some fixed placeholder, such as a beginning-of-sequence token, that equals no ordinary token). Head $2$ at position $i$ then has score $\beta\,\mathbf{e}_{x_i}\cdot\mathbf{e}_{x_{j'-1}} = \beta\,[x_{j'-1} = x_i]$ for each key $j'\le i$. By assumption exactly one key, $j$, has $x_{j-1} = x_i$ (position $i$ itself would require $x_{i-1} = x_i$, excluded by the assumption that $x_i$ occurred exactly once before); so as $\beta\to\infty$ the attention concentrates on $j$ and the OV circuit writes $\mathbf{e}_{x_j}$.
:::

The construction is what the laboratory in [[#sec-code]] runs. Trained models implement the same algorithm less cleanly: the previous-token information is written into a shared subspace rather than a dedicated slot, the match is "fuzzy" (similar tokens match too), and many heads contribute.

::: example Tracing an induction head {#ex-trace}
The tokens of "The cat sat. The cat" are at positions $0$–$5$: The, cat, sat, ".", The, cat. Which position does an induction head attend to from position $5$, and what does it predict? What about from position $4$?
::: solution
At position $5$ the token is "cat". Its earlier occurrence is at position $1$, so the position after it is $2$, whose previous token (written by the previous-token head) is "cat" — the key matches the query. The head attends to position $2$ and copies "sat": it predicts "The cat sat. The cat sat". At position $4$ the token "The" occurred at position $0$; the key at position $1$ has previous token "The", so the head attends to $1$ and predicts "cat" — which is indeed the next token.
:::
:::

### The phase change {#sec-phase}

Olsson et al. (2022), *In-context Learning and Induction Heads*, trained many models — attention-only models with one to six layers and full Transformers up to a few billion parameters (and up to about $13$ billion in some measurements) — and recorded their behaviour over training. They measured in-context learning by an **in-context learning score**: the loss on the $500$th token of a context minus the loss on the $50$th, averaged over a dataset; a more negative value means the model gains more from a longer context. Their findings, as reported:

- In every model with more than one layer, a **phase change** occurs early in training (after a few billion tokens in their runs), visible as a bump in the training loss curve. During it, induction heads form (prefix-matching scores jump), and the in-context learning score drops sharply to roughly its final value. One-layer models, which cannot form induction heads by K-composition, show neither.
- Architectural changes that make induction heads easier to form (letting a single head attend to a mix of the previous position's key — "smeared keys") moved the phase change earlier, along with the improvement in in-context learning.
- In small attention-only models, ablating induction heads at test time removed most of the in-context learning; in large models, the evidence was correlational.
- In large models, induction heads also performed **fuzzy** and **abstract** pattern completion — for instance attending to the corresponding token in a translated sentence — suggesting that the same mechanism, generalised, contributes to more abstract in-context learning.

The authors presented six lines of evidence and graded their strength: strong, causal evidence for small attention-only models; suggestive, correlational evidence for large ones. The hypothesis that induction heads are the mechanism for the *majority* of in-context learning in large models was stated as a hypothesis. Later work found additional mechanisms for in-context learning, such as heads that represent the task described by demonstrations as a vector ("function vectors"; Todd et al., 2024), so as of 2026 induction heads are best seen as one important mechanism among several.

::: example An in-context learning score {#ex-icl}
A model's average loss is $4.10$ nats on the $50$th token of documents and $3.55$ nats on the $500$th. Before the phase change the values were $4.30$ and $4.20$. Compute the in-context learning score before and after, and interpret.
::: solution
Before: $4.20 - 4.30 = -0.10$ nats. After: $3.55 - 4.10 = -0.55$ nats. After the phase change the model's prediction of a late token benefits from the preceding $450$ tokens by about $0.55$ nats, against $0.10$ before. The overall loss also fell, but the score isolates the part of the improvement that depends on context length.
:::
:::

## Indirect object identification {#sec-ioi}

Wang, Variengien, Conmy, Shlegeris and Steinhardt (2023), *Interpretability in the Wild*, studied how GPT-2 small completes sentences such as

> When Mary and John went to the store, John gave a drink to

with "Mary", the **indirect object** (IO), rather than "John", the repeated **subject** (S). The metric was the logit difference $\text{logit}(\text{IO}) - \text{logit}(\text{S})$, on a dataset generated from templates with many names, places and objects. Using **path patching** — replacing the activations along specific paths with their values on a corrupted prompt with different names, and measuring the change in the metric ([[interpretability/causal-interventions]]) — they found a circuit of $26$ attention heads grouped into seven classes. In outline, the algorithm the circuit implements is: *identify all names in the sentence, remove those that are duplicated, and output the remaining one*.

- **Duplicate-token heads** and **induction heads**, with **previous-token heads** feeding the latter, detect that S occurs twice and write this information at the position of the second S.
- **S-inhibition heads**, at the final position, read that information and write a signal that reduces attention to S.
- **Name-mover heads**, in late layers, attend from the final position to names and copy them to the output; because of the S-inhibition signal they attend to IO, and they write its logit. Their QK circuits are queried by the S-inhibition output, an example of Q-composition.
- **Negative name-mover heads** attend to names and *lower* their logits, making the model less confident; **backup name-mover heads** normally do little but take over when the main name movers are ablated.

The study reported that the circuit, with everything else mean-ablated, recovered most of the model's logit difference (about $87\%$) and passed several completeness and minimality tests, while some tests revealed gaps — parts of the behaviour not explained by the circuit. It was, at the time, the largest end-to-end reverse-engineering of a natural behaviour in a language model, and it showed several general phenomena: redundancy (backup heads), self-repair after ablation (later studied by McGrath et al., 2023, as the "Hydra effect"), and heads whose function is to suppress — McDougall et al. (2023) explained the negative name movers as **copy-suppression** heads, which lower the logit of tokens that appear earlier in the context and are being predicted.

::: warning A circuit is relative to a task, a metric and an ablation
The IOI circuit explains GPT-2 small's behaviour on a templated distribution, measured by a logit difference, under mean ablation. Change the templates, the metric (probability of IO rather than logit difference), or the ablation (zero or resampling instead of mean), and the circuit found can change. Circuits are therefore not "the" mechanism for a capability in general: they are well-tested hypotheses about a mechanism on a specified distribution. Claims that a circuit generalises — to other phrasings, other models or larger scales — need their own tests.
:::

## Automated circuit discovery {#sec-acdc}

The IOI analysis took months of researcher effort. Conmy et al. (2023), *Towards Automated Circuit Discovery for Mechanistic Interpretability*, observed that its workflow — choose a dataset and metric, patch activations, keep what matters — can be automated.

::: algorithm Automatic Circuit DisCovery (ACDC) {#alg-acdc}
**Input:** computational graph $G$ (nodes: embeddings, the inputs and outputs of heads and MLPs; edges between them), clean prompts and corrupted counterparts, a threshold $\tau > 0$. **Output:** a subgraph $H$.
1. Set $H\leftarrow G$. Order the nodes in reverse topological order (from the output towards the input).
2. For each node $w$ in this order, for each edge $(v, w)\in H$ entering it:
   1. Form $H' = H\setminus\{(v, w)\}$, in which the edge carries its value on the corrupted prompt instead of the clean one.
   2. If $D_{\mathrm{KL}}\bigl(p_G\,\Vert\,p_{H'}\bigr) - D_{\mathrm{KL}}\bigl(p_G\,\Vert\,p_H\bigr) < \tau$ (averaged over prompts), set $H\leftarrow H'$.
3. Remove nodes no longer connected to the output, and return $H$.
:::

The metric need not be KL divergence; Conmy et al. also used task metrics such as logit difference. They evaluated ACDC by whether it recovered circuits previously found by hand — IOI, the "greater-than" circuit in GPT-2 small (Hanna et al., 2023), docstring completion, and induction — treating the hand-found edges as ground truth and plotting ROC curves as $\tau$ varied; ACDC recovered most of the hand-found components on several tasks, though not all, and the comparison is only as good as the hand-found circuits. Each edge test needs a forward pass, so the cost grows with the number of edges; gradient-based approximations such as **edge attribution patching** (Syed, Rager and Conmy, 2023), which linearises the effect of patching each edge, test all edges in a few passes at the cost of accuracy where the linearisation fails. Later work moved from heads and neurons to sparse features as the nodes of the graph ([[interpretability/sparse-features]]).

::: example Pruning by threshold {#ex-prune}
Processing a node, ACDC tests its four incoming edges in turn; the KL divergence of the current subgraph from the full model is $0.010$. Removing edge $1$ would raise it to $0.012$; after that, removing edge $2$ to $0.090$, edge $3$ to $0.013$, and edge $4$ to $0.016$ (each measured from the current subgraph). With $\tau = 0.005$, which edges are kept?
::: solution
Edge $1$: increase $0.002 < 0.005$, removed; KL is now $0.012$. Edge $2$: increase $0.078$, kept; KL stays $0.012$. Edge $3$: $0.013 - 0.012 = 0.001$, removed; KL $0.013$. Edge $4$: $0.016 - 0.013 = 0.003$, removed. Only edge $2$ is kept. Note that small removals accumulate — three removed edges together raised the KL by $0.006$, more than $\tau$ — which is why the result depends on the order of processing and why the final subgraph is checked for faithfulness as a whole.
:::
:::

## Grokking and the Fourier algorithm for modular addition {#sec-grokking}

Power et al. (2022) trained small Transformers on algorithmic tasks such as $a + b \bmod p$ using a fraction of all input pairs, and observed **grokking**: the training loss fell to near zero quickly while test accuracy stayed at chance, and then, long afterwards — after many times more steps, and helped by weight decay — test accuracy suddenly rose to $100\%$. The network had first memorised and later generalised.

Nanda, Chan, Lieberum, Smith and Steinhardt (2023), *Progress Measures for Grokking via Mechanistic Interpretability*, reverse-engineered a one-layer Transformer trained on $a + b\bmod 113$ with $30\%$ of the $113^2$ pairs as training data. They found that it computes the answer with a **discrete Fourier transform**:

1. The embedding maps each input $a$ to (approximately) $\cos(\omega_ka)$ and $\sin(\omega_ka)$ for a handful of **key frequencies** $\omega_k = 2\pi k/p$ — five in the model they analysed, $k\in\{14, 35, 41, 42, 52\}$.
2. Attention and the MLP compute products of these, giving $\cos(\omega_k(a + b))$ and $\sin(\omega_k(a + b))$ by the angle-addition identities.
3. The unembedding computes, for each candidate answer $c$, $\cos(\omega_k(a + b - c)) = \cos(\omega_k(a + b))\cos(\omega_kc) + \sin(\omega_k(a + b))\sin(\omega_kc)$, and sums over the key frequencies.

The logits are therefore approximately $\sum_k\cos(\omega_k(a + b - c))$, which is largest when $c\equiv a + b$. The authors confirmed the description by several independent checks: the embedding and neuron activations were sparse in the Fourier basis; the neuron activations were well approximated by functions of $a + b$ at the key frequencies; and ablating all other frequencies barely hurt performance, while ablating the key ones destroyed it.

::: proposition Correctness of the Fourier algorithm {#prop-fourier}
Let $p$ be prime and $k_1,\dots,k_m\in\{1,\dots,p-1\}$. For inputs $a, b\in\Z_p$ define $L(c) = \sum_{j=1}^m\cos\bigl(2\pi k_j(a + b - c)/p\bigr)$ for $c\in\Z_p$. Then
1. $L$ attains its maximum value $m$ exactly at $c\equiv a + b\pmod p$;
2. the margin $L(a+b) - \max_{c\not\equiv a+b}L(c)$ equals $\min_{d\in\{1,\dots,p-1\}}\sum_j\bigl(1 - \cos(2\pi k_jd/p)\bigr) > 0$, independent of $a$ and $b$;
3. $\sum_{c\in\Z_p}L(c) = 0$, so the average logit is $0$.
:::

::: proof
Write $d = a + b - c\bmod p$. Each term $\cos(2\pi k_jd/p)\le1$, with equality iff $k_jd\equiv0\pmod p$. Because $p$ is prime and $k_j\not\equiv0$, $k_j$ is invertible modulo $p$, so $k_jd\equiv0$ iff $d\equiv0$. Hence $L = m$ at $d = 0$ and every term is strictly below $1$ for $d\ne0$, which proves (1). For (2), $L(a+b) - L(c) = \sum_j(1 - \cos(2\pi k_jd/p))$ depends on $c$ only through $d$, and $d$ ranges over $\{1,\dots,p-1\}$ as $c$ ranges over the wrong answers; each sum is positive by (1). For (3), $\sum_{d=0}^{p-1}\cos(2\pi k_jd/p) = \operatorname{Re}\sum_{d=0}^{p-1}\zeta^d$ with $\zeta = e^{2\pi ik_j/p}\ne1$ a $p$th root of unity, and the geometric series is $(\zeta^p - 1)/(\zeta - 1) = 0$.
:::

The proposition explains why one frequency is enough for correctness but several are needed for confidence: with a single frequency, the wrong answers $d$ with $k d\equiv\pm1$ have $\cos(2\pi/p)$, very close to $1$ for $p = 113$, so the margin is tiny ($1 - \cos(2\pi/113) = 0.0015$); summing several frequencies, wrong answers that nearly agree at one frequency disagree at others — **constructive interference** at the right answer only. The laboratory computes the margins.

::: example Modular addition with $p = 7$ {#ex-p7}
Use the Fourier algorithm with the single frequency $k = 2$ to compute $3 + 5\bmod7$.
::: solution
Here $a + b = 8$, and $L(c) = \cos(4\pi(8 - c)/7)$ for $c = 0,\dots,6$: the values are $-0.223, 1.000, -0.223, -0.901, 0.623, 0.623, -0.901$. The maximum is at $c = 1$, and indeed $8\bmod7 = 1$. The runner-up value $0.623 = \cos(2\pi\cdot2\cdot3/7) = \cos(2\pi/7)$, at $d = \pm3$ (since $2\cdot3 = 6\equiv-1$), gives the margin $1 - \cos(2\pi/7) = 0.377$.
:::
:::

::: widget plot
f: cos(2*pi*14*x/113); (cos(2*pi*14*x/113)+cos(2*pi*35*x/113)+cos(2*pi*41*x/113)+cos(2*pi*42*x/113)+cos(2*pi*52*x/113))/5
x: 0, 113
y: -1.1, 1.1
labels: \text{one frequency } (k=14); \text{five key frequencies, averaged}
caption: Logits of the Fourier algorithm as a function of $d = a + b - c \bmod 113$ (only integer $d$ are answers). With one frequency the logit returns to near its maximum at many wrong answers; averaging the five key frequencies found by Nanda et al. leaves a single sharp peak at $d = 0$ (and $d = 113$, the same residue), with every wrong answer well below it — constructive interference at the right answer.
:::

With the mechanism known, Nanda et al. defined **progress measures** that track it during training. The *restricted loss* keeps only the key-frequency components of the logits and measures how well the Fourier circuit alone performs; the *excluded loss* removes them and measures how much the model relies on everything else (memorisation). These measures showed three phases inside the apparently flat plateau before grokking: **memorisation** of the training set; **circuit formation**, during which the Fourier circuit gradually grows while test accuracy remains poor because the memorisation components still dominate; and **cleanup**, in which weight decay removes the memorisation components, and test accuracy jumps. The sudden generalisation was thus the visible end of a gradual internal process — a result that has been cited as evidence that mechanistic understanding can reveal what loss curves hide.

The algorithm is not unique. Zhong et al. (2023), *The Clock and the Pizza*, found that slightly different architectures and hyperparameters lead to a different algorithm for modular addition ("pizza") alongside the Fourier "clock", and Chughtai, Chan and Nanda (2023) studied networks trained on other finite groups, finding representation-theoretic algorithms of which the Fourier one is a special case. The lesson is that training finds *a* mechanism, not *the* mechanism, which bears on the hypothesis of universality ([[interpretability/interpretability-goals#sec-map]]).

::: quiz
A network trained on $a + b\bmod p$ uses a single key frequency $k$. Which statement is correct?
- [ ] It must fail on some inputs, because one cosine cannot single out one residue among $p$.
- [x] It is correct on all inputs if $p$ is prime, but its margin between the right answer and the best wrong one is small, so its loss is high unless the logits are scaled up enormously.
- [ ] It is correct only if $k = 1$.
- [ ] Its average logit over all answers is $1$.
::: solution
By [[#prop-fourier]], one frequency $k\not\equiv0$ already makes the right answer the unique maximum when $p$ is prime, because $k$ is invertible modulo $p$. But some wrong answer has $kd\equiv\pm1$ and a logit of $\cos(2\pi/p)$, very close to the maximum; reaching low cross-entropy needs either very large logits or more frequencies. The average logit is $0$ (part 3).
:::
:::

## A numerical laboratory {#sec-code}

The first listing implements the hand-built induction circuit of [[#prop-induction]] — a two-layer attention-only Transformer with a $3V + T$-dimensional residual stream — and evaluates it on random sequences of $10$ distinct tokens followed by their repeat.

```python
import math, random
rng = random.Random(4)

# Residual stream: [token one-hot (V) | position one-hot (T) | previous-token slot (V) | output slot (V)]
V, T, BOS = 21, 21, 20                  # token 20 is a beginning-of-sequence marker
D = 3 * V + T
TOK, POS, PREV, OUT = 0, V, V + T, 2 * V + T
BETA = 20.0                             # attention sharpness (scale of the QK weights)

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]

def run(seq):
    n = len(seq)
    X = [[0.0] * D for _ in range(n)]                      # (n, D)
    for i, t in enumerate(seq):
        X[i][TOK + t] = 1.0; X[i][POS + i] = 1.0
    # Layer 1: previous-token head. QK: the query at position i scores the key at
    # position i - 1. OV: copy the key's token one-hot into the PREV slot.
    new = [row[:] for row in X]
    for i in range(n):
        a = softmax([BETA * X[j][POS + i - 1] if i > 0 else 0.0 for j in range(i + 1)])
        for j in range(i + 1):
            for v in range(V):
                new[i][PREV + v] += a[j] * X[j][TOK + v]
    X = new
    # Layer 2: induction head. QK (K-composition): the query's TOK slot against each
    # key's PREV slot. OV: copy the key's token into the OUT slot, read by W_U.
    logits = []
    for i in range(n):
        a = softmax([BETA * sum(X[i][TOK + v] * X[j][PREV + v] for v in range(V)) for j in range(i + 1)])
        out = [sum(a[j] * X[j][TOK + v] for j in range(i + 1)) for v in range(V)]
        logits.append([8.0 * o for o in out])              # unembedding reads the OUT slot only
    return logits

def nll(lg, target): return -math.log(softmax(lg)[target])
H = 10
first, second, correct, n2 = [], [], 0, 0
for _ in range(200):
    half = rng.sample(range(20), H)                        # 10 distinct tokens ...
    seq = [BOS] + half + half                              # ... then repeated
    lg = run(seq)
    for i in range(1, len(seq) - 1):
        if i < H:
            first.append(nll(lg[i], seq[i + 1]))
        elif i > H:                                        # positions whose next token was seen
            second.append(nll(lg[i], seq[i + 1])); n2 += 1
            correct += max(range(V), key=lambda v: lg[i][v]) == seq[i + 1]
print(f"mean loss, first occurrence {sum(first) / len(first):.3f} nats; repeated {sum(second) / len(second):.3f} nats")
print(f"uniform over 20 tokens: {math.log(20):.3f} nats; top-1 accuracy when repeated: {correct / n2:.3f}")
```

```text
mean loss, first occurrence 3.812 nats; repeated 0.007 nats
uniform over 20 tokens: 2.996 nats; top-1 accuracy when repeated: 1.000
```

On the repeat, the circuit predicts every token, with a loss of $0.007$ nats. On the first occurrence it is *worse* than uniform guessing ($3.812$ against $2.996$ nats): with no earlier match, the induction head spreads its attention over the earlier tokens and copies them, but in these sequences an earlier token never comes next. A real model combines induction with other mechanisms and learns when copying pays.

The second listing builds the Fourier algorithm for $a + b\bmod113$ from embedding to logits, as in [[#sec-grokking]], with logits scaled by $10$, and evaluates it on all $12{,}769$ input pairs.

```python
import math

p = 113
KEYS = [14, 35, 41, 42, 52]          # key frequencies reported for one of their trained models
COS = {k: [math.cos(2 * math.pi * k * x / p) for x in range(p)] for k in range(p)}
SIN = {k: [math.sin(2 * math.pi * k * x / p) for x in range(p)] for k in range(p)}

def logits(a, b, keys, scale):
    z = [0.0] * p
    for k in keys:
        ca, sa, cb, sb = COS[k][a], SIN[k][a], COS[k][b], SIN[k][b]   # embedding of a and b
        cab = ca * cb - sa * sb                    # cos w(a+b): products formed in the MLP
        sab = sa * cb + ca * sb                    # sin w(a+b)
        for c in range(p):                         # unembedding: cos w(a+b-c)
            z[c] += scale * (cab * COS[k][c] + sab * SIN[k][c])
    return z

def evaluate(keys, scale=10.0):
    correct, loss, margin = 0, 0.0, float("inf")
    for a in range(p):
        for b in range(p):
            z, t = logits(a, b, keys, scale), (a + b) % p
            correct += max(range(p), key=z.__getitem__) == t
            m = max(z); loss += m + math.log(sum(math.exp(v - m) for v in z)) - z[t]
            margin = min(margin, z[t] - max(z[c] for c in range(p) if c != t))
    return correct / p ** 2, loss / p ** 2, margin

for keys in [[14], KEYS]:
    acc, loss, margin = evaluate(keys)
    print(f"frequencies {keys}: accuracy {acc:.4f}, mean loss {loss:.3g} nats, smallest margin {margin:.4f}")
```

```text
frequencies [14]: accuracy 1.0000, mean loss 2.67 nats, smallest margin 0.0155
frequencies [14, 35, 41, 42, 52]: accuracy 1.0000, mean loss 8.26e-11 nats, smallest margin 24.1018
```

Both versions are always right, as [[#prop-fourier]] guarantees, but with one frequency the margin is $10(1 - \cos(2\pi/113)) = 0.0155$ and the loss ($2.67$ nats) is barely better than spreading probability over the near-ties; five frequencies give a margin of $24.1$ and essentially zero loss. This is why a trained network, minimising cross-entropy, uses several frequencies.

::: history
The circuits programme was set out for vision models by Olah et al. (2020), *Zoom In*, on Distill, with curve detectors as a worked example. Elhage et al. (2021) carried it to Transformers and described induction heads in two-layer attention-only models; Olsson et al. (2022) studied their formation and their role in in-context learning. Wang et al. (2023, ICLR; preprint 2022) reverse-engineered indirect-object identification in GPT-2 small and proposed faithfulness, completeness and minimality; Hanna et al. (2023) found the greater-than circuit; Conmy et al. (2023, NeurIPS) automated circuit discovery with ACDC, and Syed et al. (2023) approximated it with edge attribution patching. Power et al. (2022) reported grokking; Nanda et al. (2023, ICLR) explained modular addition by Fourier features and progress measures, and Zhong et al. (2023) and Chughtai et al. (2023) found alternative algorithms. McGrath et al. (2023) described self-repair, and McDougall et al. (2023) copy suppression. Lieberum et al. (2023) tested how well circuit analysis scales by studying multiple-choice answering in the 70-billion-parameter Chinchilla model, finding identifiable components but also messier, less complete explanations.
:::

::: summary
- A **circuit** is a subgraph of the model's computational graph evaluated by ablating everything else; good circuits are **faithful**, **complete** and **minimal** (Wang et al., 2023), relative to a dataset, metric and ablation method.
- **Induction heads** predict $B$ after $\ldots A\,B\ldots A$ by K-composition: a previous-token head writes $x_{j-1}$ at position $j$, and the induction head matches it against the current token and copies $x_j$. They form in a **phase change** early in training that coincides with a jump in in-context learning (Olsson et al., 2022); the evidence is causal in small models and correlational in large ones.
- The **IOI circuit** in GPT-2 small (26 heads, seven classes) finds names, suppresses the duplicated one and copies the other; it revealed backup heads, self-repair and negative (copy-suppression) heads.
- **ACDC** prunes edges whose patching changes the output distribution by less than a threshold; gradient approximations make it cheaper.
- A one-layer Transformer **grokking** modular addition computes $\sum_k\cos(\omega_k(a + b - c))$ via Fourier features and trigonometric identities; one frequency suffices for correctness when $p$ is prime, several give a large margin. Progress measures revealed memorisation, circuit formation and cleanup behind the sudden generalisation, and other runs find other algorithms.
:::

## Exercises

::: exercise The single-frequency margin {level=1 check="0.0155"}
For the Fourier algorithm with one frequency, $p = 113$ and logits scaled by $10$, show that the smallest margin is $10(1 - \cos(2\pi/113))$ and compute it to four decimal places.
::: solution
By [[#prop-fourier]], the margin is $10\min_{d\ne0}(1 - \cos(2\pi kd/113))$. Since $k$ is invertible modulo $113$, as $d$ runs over the non-zero residues so does $kd$, and the minimum of $1 - \cos(2\pi r/113)$ over $r\ne0$ is at $r = \pm1$. Thus the margin is $10(1 - \cos(2\pi/113)) = 10\times0.001545 = 0.0155$.
:::
:::

::: exercise An in-context learning score {level=1 check="-0.4"}
A model's loss is $3.9$ nats on the $50$th token and $3.5$ on the $500$th. What is its in-context learning score?
::: solution
$3.5 - 3.9 = -0.4$ nats.
:::
:::

::: exercise Where does the induction head look? {level=1}
For the token sequence "A B C D B", positions $0$–$4$, which position does an ideal induction head attend to from position $4$, and what does it predict? What does a previous-token head write at position $2$?
::: solution
At position $4$ the token is B, which occurred at position $1$; the next position, $2$, has previous token B, so the head attends to position $2$ and predicts C. The previous-token head at position $2$ writes an encoding of B, the token at position $1$.
:::
:::

::: exercise Modular addition by hand {level=2 check="4"}
Use the Fourier algorithm with frequencies $k\in\{1, 3\}$ and $p = 7$ to find $6 + 5\bmod7$: compute $L(c)$ for all $c$ and give the maximiser.
::: solution
$a + b = 11$, so $d = 11 - c$ and $L(c) = \cos(2\pi d/7) + \cos(6\pi d/7)$. For $c = 0,\dots,6$, $d\bmod7 = 4, 3, 2, 1, 0, 6, 5$. The values of $\cos(2\pi d/7) + \cos(6\pi d/7)$ for $d = 0,\dots,6$ are $2$, $-0.277$, $0.401$, $-1.123$, $-1.123$, $0.401$, $-0.277$ (for example, at $d = 1$, $\cos(2\pi/7) + \cos(6\pi/7) = 0.623 - 0.901$). So $L(c)$ is maximal ($= 2$) at $c = 4$, and indeed $11\bmod7 = 4$.
:::
:::

::: exercise Faithfulness and completeness {level=2}
A circuit $C$ has $m(C) = 2.8$ against $m(G) = 3.2$ and $m(\varnothing) = 0.2$. Removing a head $v$ from both gives $m(C\setminus v) = 2.7$ and $m(G\setminus v) = 3.1$. Removing a set $K$ of two heads gives $m(C\setminus K) = 0.9$ and $m(G\setminus K) = 3.0$. Compute the normalised faithfulness and comment on completeness.
::: solution
Normalised faithfulness $(2.8 - 0.2)/(3.2 - 0.2) = 2.6/3.0 = 0.867$. For $v$, both drop by $0.1$: consistent. For $K$, the circuit drops by $1.9$ but the full model only by $0.2$: the full model compensates for losing $K$ through components outside $C$, so $C$ is incomplete — it should be extended by whatever backs up $K$ (found, for instance, by patching from $G\setminus K$ to find which outside components change their behaviour).
:::
:::

::: exercise Ablating the previous-token head {level=2}
In the first listing, make the previous-token head write nothing (multiply its contribution by $0$). Predict the loss on the repeated half before running it, then run it.
::: solution
Without previous-token information, every key's PREV slot is zero, so the induction head's scores are all $0$ and it attends uniformly to positions $0,\dots,i$, writing the average of their token one-hots. Every token gets a logit proportional to its number of occurrences among positions $0,\dots,i$ — at most $16/(i + 1)$, since no token occurs more than twice — so the logits are nearly flat and the loss is close to uniform guessing, $\log 20 = 2.996$ nats. Running the modified listing prints a repeated-half loss of $2.994$ nats (first occurrence unchanged at $3.812$): the induction ability is gone. This is the hand-built analogue of the ablation experiments of Olsson et al. — removing the first layer's head destroys the second layer's function, although the second head itself is untouched, which is K-composition.
:::
:::

::: exercise ACDC and the order of edges {level=2}
Explain why the subgraph returned by ACDC can depend on the order in which edges are tested, and give a three-edge example with $\tau = 0.01$ in which two orders give different results.
::: solution
Each test compares the current subgraph with and without one edge, so whether an edge is removed depends on which edges have already been removed. Example: edges $e_1, e_2$ are redundant copies of each other — removing either alone raises the KL by $0.002$, but removing both raises it by $0.5$ — and $e_3$ is irrelevant. Testing $e_1$ first removes it ($0.002 < 0.01$); then removing $e_2$ would cost about $0.5$, so $e_2$ is kept: result $\{e_2\}$. Testing $e_2$ first gives $\{e_1\}$. Redundancy — common in real models, as backup heads show — makes the output order-dependent and means a circuit can omit components that matter in other contexts.
:::
:::

::: exercise Why products need non-linearity {level=3}
In the Fourier algorithm, the network must compute $\cos(\omega a)\cos(\omega b)$ from embeddings that contain $\cos(\omega a)$ and $\cos(\omega b)$ in different positions. Show that a ReLU can produce products from sums: express $xy$ in terms of $(x + y)^2$ and $(x - y)^2$, and explain how squares can be approximated with ReLU units. Why can attention, which takes a weighted *average* of value vectors, not compute the product by itself in an attention-only one-layer model?
::: solution
$xy = \tfrac14\bigl((x + y)^2 - (x - y)^2\bigr)$, so products follow from squares of sums and differences, which are linear in the inputs. On a bounded interval a square is approximated by a piecewise-linear function $\sum_r\alpha_r\operatorname{ReLU}(z - t_r)$ (plus a mirror term for negative $z$), so an MLP layer that receives $x + y$ and $x - y$ (formed linearly from the residual stream, where attention has brought $a$'s and $b$'s embeddings together) can output approximately $xy$. In a one-layer attention-only model the output at the final position is $\sum_jA_{ij}\mathbf{x}_jW_{OV}$ plus the direct path — linear in the value vectors for a fixed pattern, so it contains sums like $\alpha\cos(\omega a) + (1 - \alpha)\cos(\omega b)$, not products; the only non-linearity is the softmax in the pattern, which depends on queries and keys. (Nanda et al. noted that attention patterns do contribute some multiplicative interaction, but the bulk of the product terms in their model was computed by the MLP neurons.)
:::
:::

::: exercise Average logit and calibration {level=3}
Using part (3) of [[#prop-fourier]], compute the cross-entropy loss of the five-frequency algorithm with logit scale $s$ on an input, as a function of the values $L(c)$, and show that the loss tends to $0$ as $s\to\infty$. Then explain why weight decay, which penalises large weights, pushes a trained network to use *several* frequencies rather than one frequency with a huge scale.
::: solution
The loss is $-\log\bigl(e^{sL(t)}/\sum_ce^{sL(c)}\bigr) = \log\bigl(1 + \sum_{c\ne t}e^{-s(L(t) - L(c))}\bigr)$, where $L(t) = m = 5$. Every term has $L(t) - L(c)\ge\Delta$, the margin, so the loss is at most $\log(1 + (p - 1)e^{-s\Delta})\to0$ as $s\to\infty$. To reach a given loss $\varepsilon$, the scale must satisfy roughly $s\Delta\ge\log((p - 1)/\varepsilon)$. With one frequency $\Delta = 1 - \cos(2\pi/113) = 0.0015$, so $s$ must be about $2.41/0.0015\approx1600$ times larger than with $\Delta\approx2.4$ (five frequencies). The logit scale is produced by products of weights, so a huge $s$ requires large weight norms, which weight decay penalises; adding frequencies increases the margin at a cost in weights that grows only linearly with the number of frequencies. Minimising loss plus weight decay therefore favours a few frequencies — consistent with the five that Nanda et al. found, though the precise number depends on training details.
:::
:::
