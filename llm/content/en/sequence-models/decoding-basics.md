A trained language model — conditional, as in [[sequence-models/seq2seq]], or unconditional — does not output text. It outputs, at each step, a probability distribution over the next token given the tokens so far. Turning those distributions into a sequence is **decoding**, and the choice of decoding method changes the output as much as many changes to the model do. Two goals pull in different directions. For translation or speech recognition we want *the* best output, the most probable sequence, and decoding is a search problem. For open-ended generation — stories, dialogue, a model's answer to a prompt — the most probable sequence turns out to be bland and repetitive, and we want a *sample* that looks like human text, so decoding is a sampling problem with knobs.

This chapter treats both. It defines the search problem, shows why it cannot be solved exactly and why greedy decoding is not optimal, develops **beam search** with its length bias and the normalisations that correct it, and then turns to sampling: **temperature**, **top-$k$** and **nucleus (top-$p$)** sampling, and the problem of repetition. Everything here applies unchanged to Transformer language models; [[inference/decoding-sampling]] builds on it with the engineering of fast generation.

## The search problem {#sec-search}

Throughout, $p_\theta(y_t\mid y_{<t})$ is the model's next-token distribution (for a conditional model add "$, \mathbf{x}$" everywhere), outputs end with $\langle\text{eos}\rangle$, and the probability of a complete output is the product of its conditionals ([[sequence-models/seq2seq#def-clm]]).

::: definition MAP decoding {#def-map}
**Maximum a posteriori (MAP) decoding** seeks

$$
\hat{\mathbf{y}} = \operatorname*{arg\,max}_{\mathbf{y}}\ \log p_\theta(\mathbf{y}) = \operatorname*{arg\,max}_{\mathbf{y}}\ \sum_{t=1}^{\lvert\mathbf{y}\rvert}\log p_\theta(y_t\mid y_{<t}),
$$ {#eq-map}

the maximum over all sequences ending in $\langle\text{eos}\rangle$ (in practice, of at most some length $T_{\max}$).
:::

There are $\lvert\mathcal{V}\rvert^{T}$ sequences of length $T$ — for a vocabulary of $32{,}000$ and $T = 20$, about $10^{90}$. Unlike an $n$-gram or hidden Markov model, a recurrent or Transformer decoder's state depends on the *entire* prefix, so there is no small set of states over which dynamic programming (the Viterbi algorithm) could share work: every prefix is its own state. Exact MAP decoding is intractable in general, and practical decoders are heuristics.

The simplest heuristic commits to the best token at each step.

::: algorithm Greedy decoding {#alg-greedy}
1. Set $\mathbf{y}\leftarrow()$.
2. Repeat until $y_t = \langle\text{eos}\rangle$ or $\lvert\mathbf{y}\rvert = T_{\max}$: append $y_t = \operatorname*{arg\,max}_vp_\theta(v\mid\mathbf{y})$.
3. Return $\mathbf{y}$.

It costs one model step per output token.
:::

::: proposition Greedy decoding is not optimal {#prop-greedy}
There are models for which the greedy output is not the most probable sequence.
:::

::: proof
A single example suffices. Let the vocabulary be $\{a, b, \langle\text{eos}\rangle\}$ with $p(a) = 0.6$, $p(b) = 0.4$ at the first step; after $a$: $p(a\mid a) = 0.4$, $p(b\mid a) = 0.3$, $p(\langle\text{eos}\rangle\mid a) = 0.3$; after $b$: $p(b\mid b) = 0.9$, $p(\langle\text{eos}\rangle\mid b) = 0.1$; and $\langle\text{eos}\rangle$ with probability $1$ after any two tokens. Greedy picks $a$, then $a$, then $\langle\text{eos}\rangle$, with probability $0.6\cdot0.4 = 0.24$. But $p(bb) = 0.4\cdot0.9 = 0.36 > 0.24$, and no other sequence beats $0.36$ ($ab$ and $a$ each have $0.18$, $b$ has $0.04$). The greedy choice at step $1$ looked best but led to a part of the tree where all continuations are mediocre.
:::

Searching for the most probable sequence is a shortest-path problem: give each edge from a prefix to its extension the cost $-\log p(y_t\mid y_{<t})\ge0$, and the most probable complete output is the cheapest path from the empty prefix to an "ended" node. On the small tree of the proof, Dijkstra's algorithm — uniform-cost search — finds it exactly by expanding prefixes in order of their cost. On a real model the tree is far too large, and the frontier would grow without bound; beam search caps it.

::: widget graph
nodes: root@0,1; a@1,2; b@1,0; aa@2,3; ab@2,2.2; aE@2,1.4; bb@2,0.6; bE@2,-0.2; aaE@3,3; abE@3,2.2; bbE@3,0.6
edges: root>a:0.511; root>b:0.916; a>aa:0.916; a>ab:1.204; a>aE:1.204; b>bb:0.105; b>bE:2.303; aa>aaE:0; ab>abE:0; bb>bbE:0
algorithm: dijkstra
start: root
caption: The search tree of [[#prop-greedy]]. Each node is a prefix ("E" marks $\langle\text{eos}\rangle$, so "aE" is the finished output "a"), and each edge costs $-\ln p$ of its token. Run Dijkstra's algorithm from the root: the cheapest finished node is "bbE" at distance $1.022 = -\ln0.36$, while greedy decoding follows the cheapest *first* edge to "a" and ends at "aaE" with distance $1.427 = -\ln0.24$. Beam search with width $2$ keeps both "a" and "b" after the first step and finds "bb".
:::

## Beam search {#sec-beam}

::: algorithm Beam search {#alg-beam}
Input: beam width $k$, maximum length $T_{\max}$.

1. Start with the beam $B = \{()\}$, the empty prefix with score $0$, and an empty list $F$ of finished hypotheses.
2. For $t = 1, \dots, T_{\max}$, while $B$ is not empty:
   - **Expand**: form all candidates $\mathbf{y}\,v$ for $\mathbf{y}\in B$ and $v\in\mathcal{V}$, with score $s(\mathbf{y}v) = s(\mathbf{y}) + \log p_\theta(v\mid\mathbf{y})$.
   - **Prune**: go through the candidates in decreasing order of score; move those ending in $\langle\text{eos}\rangle$ to $F$, and keep the others in the new beam until it holds $k$ hypotheses.
3. Return the hypothesis in $F$ with the best final score (raw, or length-normalised as in [[#sec-length]]).

Each step costs $k$ model evaluations (batched together) and a selection of the top $k$ among $k\lvert\mathcal{V}\rvert$ candidates.
:::

With $k = 1$ beam search is greedy decoding. With $k\ge\lvert\mathcal{V}\rvert^{T_{\max}-1}$ no candidate is ever pruned, and beam search enumerates every sequence of length up to $T_{\max}$ — exact but useless. In between it trades computation for search quality, and in neural machine translation small beams ($k = 4$ to $10$) gave most of the gain: Sutskever et al. (2014) reported that most of the benefit of their beam of $12$ was already obtained with a beam of $2$.

A useful property makes early stopping possible.

::: proposition Scores only decrease {#prop-monotone}
For any prefix $\mathbf{y}$ and any extension $\mathbf{y}\mathbf{z}$, $\log p_\theta(\mathbf{y}\mathbf{z})\le\log p_\theta(\mathbf{y})$. Consequently, once the best finished hypothesis has a raw score at least as high as every hypothesis in the beam, no further step can produce a better raw-scored output, and beam search may stop.
:::

::: proof
$\log p_\theta(\mathbf{y}\mathbf{z}) = \log p_\theta(\mathbf{y}) + \sum_j\log p_\theta(z_j\mid\mathbf{y}z_{<j})$, and every term of the sum is $\le0$ because probabilities are at most $1$. Every future candidate extends a hypothesis currently in the beam, so its score is at most that hypothesis's current score, which is at most the best finished score.
:::

The same proposition reveals a flaw. Because every token costs a non-positive log-probability, *longer outputs have lower scores*, other things equal. Beam search with raw scores therefore favours short outputs, and the larger the beam, the more likely it is to find a short hypothesis — perhaps ending after a single token — that beats every complete, adequate one.

::: example Beam search by hand {#ex-beam}
Run beam search with $k = 2$ on the model of [[#prop-greedy]].
::: solution
Step 1: candidates $a$ ($\ln0.6 = -0.511$) and $b$ ($\ln0.4 = -0.916$); both are kept. Step 2: expanding $a$ gives $aa$ ($-0.511 - 0.916 = -1.427$), $ab$ ($-1.715$) and $a\langle\text{eos}\rangle$ ($-1.715$); expanding $b$ gives $bb$ ($-0.916 - 0.105 = -1.022$) and $b\langle\text{eos}\rangle$ ($-3.219$). In order: $bb$ ($-1.022$) enters the beam, $aa$ ($-1.427$) enters the beam, which is now full. Step 3: both can only end, giving finished $bb$ with $-1.022$ and $aa$ with $-1.427$. The answer is $bb$, probability $e^{-1.022} = 0.36$: the beam kept the second-best first token alive long enough for its strong continuation to show. The listing in [[#sec-code]] does exactly this.
:::
:::

### Length normalisation {#sec-length}

::: definition Length-normalised scores {#def-length-norm}
A **length-normalised** beam search ranks finished hypotheses by

$$
\operatorname{score}(\mathbf{y}) = \frac{\log p_\theta(\mathbf{y})}{\operatorname{lp}(\lvert\mathbf{y}\rvert)},
$$

with a length penalty such as $\operatorname{lp}(n) = n^\alpha$ ($\alpha = 1$ is the average log-probability per token, $\alpha = 0$ the raw score), or the form used in Google's neural translation system (Wu et al., 2016), $\operatorname{lp}(n) = (5 + n)^\alpha/(5 + 1)^\alpha$ with $\alpha$ around $0.6$–$0.7$, tuned on held-out data.
:::

Normalisation changes only how *finished* hypotheses are compared; pruning within the beam still uses raw scores, which is fine because all open hypotheses at a given step have the same length. Wu et al. also added a **coverage penalty** that favours translations attending to every source word, and Murray and Chiang (2018) proposed a per-word reward instead of a division; all are corrections for the same bias.

::: example Choosing between a short and a long output {#ex-length}
Two finished hypotheses: A has $3$ tokens (including $\langle\text{eos}\rangle$) and $\log p = -2.1$; B has $8$ tokens and $\log p = -3.0$. Which wins with raw scores, with $\alpha = 1$, and with the GNMT penalty at $\alpha = 0.6$?
::: solution
Raw: A ($-2.1 > -3.0$). Per token ($\alpha = 1$): A has $-0.700$, B has $-0.375$, so B wins. GNMT: $\operatorname{lp}(3) = (8/6)^{0.6} = 1.188$ and $\operatorname{lp}(8) = (13/6)^{0.6} = 1.590$, so A scores $-2.1/1.188 = -1.767$ and B scores $-3.0/1.590 = -1.886$: A wins again. The decision depends on a hyperparameter, which is why $\alpha$ is tuned on a development set for each system — the normalisation is a correction factor, not something derived from the model.
:::
:::

### The beam search curse {#sec-curse}

If the model were perfect, finding its most probable output would be the right goal and wider beams would only help. With real models, wider beams often make outputs *worse*. Koehn and Knowles (2017) found that, for several language pairs, translation quality peaked at moderate beam widths and then declined as the beam grew, largely because wider beams found shorter translations. Stahlberg and Byrne (2019) went to the limit: with an exact search algorithm for a Transformer translation model, they found that the single most probable output was the **empty translation** — $\langle\text{eos}\rangle$ immediately — for more than half of the test sentences. The model's mode is degenerate; beam search works *because* it is an inexact search that stays in the region of typical, adequate outputs.

::: warning "Beam search finds the best output, so wider is always better"
Beam search approximates the *model's* most probable sequence, and the model's most probable sequence is often not a good output: it can be empty, too short, or repetitive. A wider beam is a better search for the wrong objective. In translation, moderate beams with length normalisation are standard; in open-ended generation beam search is generally avoided altogether ([[#sec-degeneration]]). When quality falls as the beam widens, the cause is the model's distribution (model error), not the search (search error).
:::

## Sampling {#sec-sampling}

For open-ended generation there is no single right answer, and we want outputs that are varied and read like human text. The natural method draws each token from the model's distribution.

::: definition Ancestral sampling and temperature {#def-temperature}
**Ancestral sampling** generates $y_t\sim p_\theta(\cdot\mid y_{<t})$ for $t = 1, 2, \dots$ until $\langle\text{eos}\rangle$; it draws a whole sequence exactly from $p_\theta(\mathbf{y})$. With logits $\mathbf{z}_t$ and **temperature** $\tau > 0$, it samples instead from

$$
p_\tau(v\mid y_{<t}) = \operatorname{softmax}(\mathbf{z}_t/\tau)_v = \frac{\exp(z_{t,v}/\tau)}{\sum_u\exp(z_{t,u}/\tau)} .
$$ {#eq-temperature}

$\tau < 1$ sharpens the distribution, $\tau > 1$ flattens it, and $\tau = 1$ is the model's own distribution.
:::

::: proposition Temperature interpolates between argmax and uniform {#prop-entropy}
Let $H(\tau)$ be the entropy of $p_\tau$ for fixed logits $\mathbf{z}$. Then (1) as $\tau\to0^+$, $p_\tau$ converges to the uniform distribution on the tokens of maximal logit (to the argmax, if it is unique); (2) as $\tau\to\infty$, $p_\tau$ converges to the uniform distribution on $\mathcal{V}$; and (3) $H(\tau)$ is non-decreasing in $\tau$, strictly increasing unless all logits are equal.
:::

::: proof
Write $\beta = 1/\tau$ and $m = \max_vz_v$. (1) $p_\tau(v) = e^{\beta(z_v - m)}/\sum_ue^{\beta(z_u - m)}$; as $\beta\to\infty$, terms with $z_u < m$ tend to $0$ and terms with $z_u = m$ equal $1$, so $p_\tau(v)\to1/M$ for the $M$ maximal tokens and $0$ for the rest. (2) As $\beta\to0$, every $e^{\beta z_v}\to1$, so $p_\tau(v)\to1/\lvert\mathcal{V}\rvert$. (3) With $Z(\beta) = \sum_ue^{\beta z_u}$ we have $\log p_v = \beta z_v - \log Z$, so $H = -\sum_vp_v\log p_v = \log Z - \beta\,\E_p[z]$. Differentiating, $\frac{d}{d\beta}\log Z = \E_p[z]$ and $\frac{d}{d\beta}\E_p[z] = \E_p[z^2] - \E_p[z]^2 = \Var_p(z)$, so

$$
\frac{dH}{d\beta} = \E_p[z] - \E_p[z] - \beta\Var_p(z) = -\beta\Var_p(z)\le0 .
$$

Entropy therefore decreases in $\beta$ and increases in $\tau = 1/\beta$; the variance is zero only if $z$ is constant on the support, i.e. all logits are equal.
:::

::: example Temperature by hand {#ex-temperature}
Logits $(2, 1, 0)$ over three tokens. Compute the distribution and its entropy at $\tau = 0.5, 1, 2$.
::: solution
$\tau = 1$: $e^2, e^1, e^0 = 7.389, 2.718, 1$, sum $11.107$: $(0.665, 0.245, 0.090)$, entropy $0.832$ nats.
$\tau = 0.5$: logits become $(4, 2, 0)$: $54.598, 7.389, 1$, sum $62.987$: $(0.867, 0.117, 0.016)$, entropy $0.441$.
$\tau = 2$: logits $(1, 0.5, 0)$: $2.718, 1.649, 1$, sum $5.367$: $(0.506, 0.307, 0.186)$, entropy $1.020$.
The order of the tokens never changes; only how much the top token dominates. The maximum possible entropy is $\ln3 = 1.099$.
:::
:::

::: widget plot
f: exp(3/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x)); exp(2.5/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x)); exp(1/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x)); exp(-1/x)/(exp(3/x)+exp(2.5/x)+exp(1/x)+exp(0.5/x)+exp(0/x)+exp(-1/x))
x: 0.1, 5
y: 0, 1
labels: mat (logit 3); rug (logit 2.5); sofa (logit 1); idea (logit −1)
vlines: 1
caption: Probabilities of four of the six tokens of the listing's example (logits $3, 2.5, 1, 0.5, 0, -1$) against the temperature $\tau$. At $\tau = 1$ (dashed line) "mat" has $0.53$. As $\tau\to0$ all mass goes to the top token, which is greedy decoding; as $\tau$ grows every token, including the absurd "idea", approaches $1/6$. Low temperatures give safe, repetitive text; high temperatures give varied text that drifts into nonsense.
:::

### Truncation: top-$k$ and nucleus sampling {#sec-truncation}

Pure sampling at $\tau = 1$ has a specific failure. A language model's distribution has a long **tail** of tokens that are individually unlikely but together carry real probability mass; at every step there is a fair chance of drawing one of them, and over a hundred steps it is almost certain. One bad draw can derail the text, which the model then dutifully continues. **Truncation** methods sample only from the head of the distribution.

::: definition Top-k and nucleus (top-p) sampling {#def-top-p}
Let $p$ be the next-token distribution, with tokens sorted so that $p_{(1)}\ge p_{(2)}\ge\dots$.

- **Top-$k$ sampling** (Fan, Lewis and Dauphin, 2018) keeps the $k$ most probable tokens, sets the others to zero and renormalises.
- **Nucleus** or **top-$p$ sampling** (Holtzman et al., 2020) keeps the smallest set $V^{(p)}$ of most probable tokens whose total mass is at least $p$, i.e. the first $m$ tokens in sorted order with $m = \min\{j : \sum_{i\le j}p_{(i)}\ge p\}$, and samples from

$$
q(v) = \begin{cases}p(v)/\sum_{u\in V^{(p)}}p(u) & v\in V^{(p)}\\ 0 & \text{otherwise.}\end{cases}
$$ {#eq-top-p}

Temperature is usually applied to the logits first, and truncation to the resulting distribution.
:::

The difference is that top-$p$ adapts to the shape of the distribution. When the model is confident ("the capital of France is" → "Paris"), the nucleus may contain a single token; when many continuations are plausible (the first word of a story), it contains hundreds. A fixed $k$ is too many in the first case and too few in the second. Holtzman et al. found nucleus sampling with $p$ around $0.9$–$0.95$ to produce text whose statistics (perplexity, repetition, vocabulary distribution) were closest to human text among the methods they compared.

::: example Nucleus sampling by hand {#ex-top-p}
At $\tau = 1$ the six tokens of the listing have probabilities $0.529, 0.321, 0.072, 0.043, 0.026, 0.010$ ("mat", "rug", "sofa", "floor", "moon", "idea"). Which tokens survive top-$p$ with $p = 0.9$, and with what probabilities? Compare with top-$k$, $k = 2$.
::: solution
Cumulative sums in order: $0.529$, $0.850$, $0.922$. The first prefix reaching $0.9$ has three tokens, so the nucleus is {mat, rug, sofa} with mass $0.922$; dividing, $q = (0.574, 0.348, 0.078)$. Top-$2$ keeps only mat and rug, $(0.622, 0.378)$, discarding "sofa" — a perfectly reasonable continuation — because $k$ was fixed in advance. "floor", "moon" and "idea" never appear under either rule.
:::
:::

::: quiz
For a fixed distribution $p$, which statement about top-$p$ sampling is correct?
- [ ] It always keeps the same number of tokens for a given $p$.
- [x] Raising $p$ can only add tokens to the nucleus, never remove them.
- [ ] With $p = 1$ it is the same as greedy decoding.
- [ ] It changes the relative probabilities of the tokens it keeps.
::: solution
The nucleus is the shortest prefix of the sorted tokens whose mass reaches $p$; a larger $p$ needs a prefix at least as long, so it contains the smaller nucleus. The number of tokens depends on the shape of $p$, not only on $p$. With $p = 1$ every token with positive probability is kept: pure sampling. Renormalisation divides all kept probabilities by the same number, so their ratios are unchanged.
:::
:::

## Degeneration and repetition {#sec-degeneration}

Holtzman et al. (2020) titled their paper "The curious case of neural text degeneration". Using a large Transformer language model (GPT-2), they showed that maximisation-based decoding — greedy and beam search — produces text that is generic and, above all, **repetitive**: the same phrase or sentence recurs in a loop. Two observations explain it. Human text is not the most probable text: the per-token probability of human writing fluctuates and is often far below the model's top choice, whereas beam search output has uniformly high probability. And repetition reinforces itself: the more times a phrase has occurred in the context, the higher the probability the model assigns to repeating it again, a positive feedback loop that greedy decoding follows to the end.

Besides switching to sampling, several direct countermeasures are used.

- **$n$-gram blocking** (used in summarisation by Paulus, Xiong and Socher, 2018): during beam search, set to zero the probability of any token that would complete an $n$-gram (typically $n = 3$) that already occurs in the output.
- **Repetition penalties** (Keskar et al., 2019, for the CTRL model): divide the logits of tokens that already occur in the context by a factor such as $1.2$ (implementations apply it so that the logit always moves down, dividing positive logits and multiplying negative ones), which lowers their probability.
- **Frequency and presence penalties**, exposed by several generation interfaces: subtract from each token's logit a multiple of its count so far, and a constant if it has occurred at all.
- **Training-time fixes**, such as unlikelihood training (Welleck et al., 2020), which adds a loss pushing down the probability of tokens that would repeat.

All penalties are heuristics that also suppress legitimate repetition — of a name, of a variable in code — and their strengths are tuned by eye. Newer truncation rules continue to be proposed; for example, **min-$p$ sampling** (Nguyen et al., 2024) keeps the tokens whose probability is at least a fixed fraction of the top token's. As of 2026, generation interfaces for large language models commonly expose temperature and top-$p$, often top-$k$ and repetition or frequency penalties; beam search remains standard in machine translation and speech recognition, while open-ended and chat generation mostly sample.

::: application Decoding for reasoning
Sampling also enables a different use of a model: draw several independent answers to the same question and combine them. **Self-consistency** (Wang et al., 2023) samples many chains of reasoning at a moderate temperature and returns the final answer that occurs most often, which improved accuracy on arithmetic and commonsense benchmarks over greedy decoding of a single chain. This trades extra computation at inference time for accuracy, an idea developed in [[reasoning]].
:::

## Implementing it {#sec-code}

The listing implements greedy decoding and beam search over any function `next_dist(prefix)`, here the toy model of [[#prop-greedy]], and the sampling transformations of [[#def-temperature]] and [[#def-top-p]], with a check that seeded top-$p$ draws follow [[#eq-top-p]].

```python
import math, random

# A toy conditional model: next-token distributions given the prefix (tuple of tokens).
MODEL = {
    ():         {"a": 0.6, "b": 0.4},
    ("a",):     {"a": 0.4, "b": 0.3, "<eos>": 0.3},
    ("b",):     {"b": 0.9, "<eos>": 0.1},
    ("a", "a"): {"<eos>": 1.0},
    ("a", "b"): {"<eos>": 1.0},
    ("b", "b"): {"<eos>": 1.0},
}
def next_dist(prefix): return MODEL[tuple(prefix)]

def greedy(next_dist, max_len=10):
    seq, logp = [], 0.0
    while len(seq) < max_len:
        tok, p = max(next_dist(seq).items(), key=lambda kv: kv[1])
        logp += math.log(p)
        if tok == "<eos>": break
        seq.append(tok)
    return seq, logp

def beam_search(next_dist, k, max_len=10, alpha=0.0):
    """Keeps the k best partial hypotheses by log-probability. Finished ones are
    scored by logp / len^alpha (len counts <eos>); alpha = 0 is no normalisation."""
    beam, finished = [((), 0.0)], []
    for _ in range(max_len):
        cand = [(seq + (tok,), lp + math.log(p))
                for seq, lp in beam for tok, p in next_dist(seq).items()]
        cand.sort(key=lambda c: -c[1])
        beam = []
        for seq, lp in cand:
            if seq[-1] == "<eos>": finished.append((seq[:-1], lp, lp / len(seq) ** alpha))
            else: beam.append((seq, lp))
            if len(beam) == k: break
        if not beam: break                      # every surviving hypothesis has ended
    return max(finished, key=lambda f: f[2])

seq, lp = greedy(next_dist)
print(f"greedy        ({seq}, logp {lp:.4f}, p {math.exp(lp):.3f})")
for k in (1, 2):
    seq, lp, score = beam_search(next_dist, k)
    print(f"beam k={k}      ({list(seq)}, logp {lp:.4f}, p {math.exp(lp):.3f})")

# --- sampling: temperature, top-k and top-p (nucleus) --------------------------
def softmax(z, T=1.0):
    m = max(z); e = [math.exp((v - m) / T) for v in z]; s = sum(e)
    return [v / s for v in e]

def filter_top_k(p, k):
    keep = sorted(range(len(p)), key=lambda i: -p[i])[:k]
    q = [p[i] if i in keep else 0.0 for i in range(len(p))]
    s = sum(q); return [v / s for v in q]

def filter_top_p(p, top_p):
    order = sorted(range(len(p)), key=lambda i: -p[i])
    keep, total = [], 0.0
    for i in order:                      # smallest set whose mass reaches top_p
        keep.append(i); total += p[i]
        if total >= top_p: break
    q = [p[i] if i in keep else 0.0 for i in range(len(p))]
    s = sum(q); return [v / s for v in q]

def sample(p, rng):
    u, acc = rng.random(), 0.0
    for i, v in enumerate(p):
        acc += v
        if u < acc: return i
    return len(p) - 1

logits = [3.0, 2.5, 1.0, 0.5, 0.0, -1.0]
words = ["mat", "rug", "sofa", "floor", "moon", "idea"]
for T in (0.5, 1.0, 2.0):
    print(f"T={T}:", " ".join(f"{w} {q:.3f}" for w, q in zip(words, softmax(logits, T))))
p = softmax(logits)
print("top-k=2:  ", " ".join(f"{q:.3f}" for q in filter_top_k(p, 2)))
q = filter_top_p(p, 0.9)
print("top-p=0.9:", " ".join(f"{v:.3f}" for v in q))
rng = random.Random(0)
counts = [0] * len(words)
for _ in range(10000): counts[sample(q, rng)] += 1
print("10000 top-p draws:", dict(zip(words, counts)))
```

Output:

```
greedy        (['a', 'a'], logp -1.4271, p 0.240)
beam k=1      (['a', 'a'], logp -1.4271, p 0.240)
beam k=2      (['b', 'b'], logp -1.0217, p 0.360)
T=0.5: mat 0.716 rug 0.264 sofa 0.013 floor 0.005 moon 0.002 idea 0.000
T=1.0: mat 0.529 rug 0.321 sofa 0.072 floor 0.043 moon 0.026 idea 0.010
T=2.0: mat 0.358 rug 0.279 sofa 0.132 floor 0.103 moon 0.080 idea 0.048
top-k=2:   0.622 0.378 0.000 0.000 0.000 0.000
top-p=0.9: 0.574 0.348 0.078 0.000 0.000 0.000
10000 top-p draws: {'mat': 5724, 'rug': 3521, 'sofa': 755, 'floor': 0, 'moon': 0, 'idea': 0}
```

Beam search with $k = 1$ reproduces greedy decoding, and $k = 2$ finds the better sequence of [[#ex-beam]]. The sampled frequencies $0.572$, $0.352$, $0.076$ match the nucleus distribution $0.574$, $0.348$, $0.078$ to within the sampling error of $10{,}000$ draws (about $\pm0.005$ for the largest), and the truncated tokens never appear. In a real decoder, `next_dist` is a forward step of the network on a batch of $k$ prefixes, the hidden states (or key–value caches, [[inference/kv-cache]]) of the surviving hypotheses are copied when the beam is reordered, and all of this is vectorised.

::: example The cost of beam search {#ex-beam-cost}
A translation model has $\lvert\mathcal{V}\rvert = 32{,}000$ and an output layer of width $512$. Decoding a $50$-token output with $k = 5$, how many candidate scores are formed per step, and how many FLOPs does the output layer cost over the whole output? How does this compare with greedy decoding?
::: solution
Each step scores $k\lvert\mathcal{V}\rvert = 160{,}000$ candidates. The output layer is a $(5\times512)\cdot(512\times32{,}000)$ product per step, $2\cdot5\cdot512\cdot32{,}000\approx1.64\times10^8$ FLOPs, and over $50$ steps about $8.2\times10^9$ FLOPs. Greedy decoding costs a fifth of that. The selection of the top $5$ among $160{,}000$ scores is cheap by comparison (a partial sort, linear in the number of candidates). Because the $k$ hypotheses are processed as one batch, the wall-clock cost of a beam on a GPU is often much less than $k$ times that of greedy decoding, as small-batch decoding is limited by memory bandwidth rather than arithmetic.
:::
:::

::: history
Beam search is older than neural networks: it was used in the Harpy speech-understanding system at Carnegie Mellon in the 1970s (Lowerre, 1976) and became the standard decoder of statistical speech recognition and phrase-based translation, where it was combined with dynamic programming over $n$-gram states. Neural translation inherited it (Sutskever et al., 2014; Bahdanau et al., 2015), together with length normalisation (Wu et al., 2016, for GNMT). As neural language models began generating long texts, the failure of maximisation became evident: Fan, Lewis and Dauphin (2018) introduced top-$k$ sampling for story generation, Holtzman, Buys, Du, Forbes and Choi (ICLR 2020) diagnosed degeneration and proposed nucleus sampling, and Stahlberg and Byrne (2019) and Meister, Cotterell and Vieira (2020) asked why beam search works well despite targeting a degenerate mode, the latter suggesting that it implicitly favours outputs whose information is spread evenly over the tokens. Temperature itself comes from statistical physics, by way of the Boltzmann distribution $e^{-E/kT}$, through simulated annealing and Boltzmann machines.
:::

::: summary
- **Decoding** turns next-token distributions into an output. MAP decoding (the most probable sequence) is intractable for neural decoders, whose state depends on the whole prefix.
- **Greedy decoding** is cheap and not optimal. **Beam search** keeps the $k$ best prefixes per step; $k = 1$ is greedy. Scores only decrease with length, which allows early stopping and causes a bias towards short outputs.
- **Length normalisation** divides the score by $n^\alpha$ or the GNMT penalty; $\alpha$ is tuned. Wider beams can hurt: the model's mode is often short or even empty (the beam search curse).
- **Temperature** $\tau$ rescales logits; entropy increases with $\tau$, from argmax ($\tau\to0$) to uniform ($\tau\to\infty$).
- **Top-$k$** keeps a fixed number of tokens, **nucleus (top-$p$)** the smallest set of mass $\ge p$, adapting to the distribution's shape. They cut the unreliable tail.
- Maximisation produces **repetitive, degenerate** text in open-ended generation; sampling with truncation, $n$-gram blocking and repetition penalties are the usual remedies, each a heuristic.
:::

## Exercises

::: exercise Probability of a beam hypothesis {level=1 check="0.5*0.6*0.8"}
A hypothesis "the cat ⟨eos⟩" has conditional probabilities $0.5$, $0.6$ and $0.8$. What is its probability?
::: solution
$0.5\cdot0.6\cdot0.8 = 0.24$; its log-probability is $\ln0.24 = -1.427$.
:::
:::

::: exercise Temperature and the top token {level=1 check="exp(2)/(exp(2)+exp(1)+1)"}
Logits $(4, 2, 0)$ are sampled at temperature $\tau = 2$. What probability does the first token get?
::: solution
Dividing by $\tau$ gives $(2, 1, 0)$, so the probability is $e^2/(e^2 + e + 1) = 7.389/11.107 = 0.665$ — the same as for logits $(2, 1, 0)$ at $\tau = 1$, since only the ratio $\mathbf{z}/\tau$ matters.
:::
:::

::: exercise The size of a nucleus {level=1 check="4"}
A distribution has sorted probabilities $0.30, 0.25, 0.20, 0.10, 0.08, 0.07$. How many tokens does the nucleus with $p = 0.8$ contain?
::: solution
Cumulative sums: $0.30$, $0.55$, $0.75$, $0.85$. The first to reach $0.8$ is the fourth, so the nucleus has $4$ tokens with mass $0.85$.
:::
:::

::: exercise Greedy can be arbitrarily bad {level=2}
Construct, for any $\delta > 0$, a model over sequences of length $2$ (then $\langle\text{eos}\rangle$) for which the greedy output has probability less than $\delta$ times that of the best output.
::: solution
At step 1 let $p(a) = 0.5 + \eta$ and $p(b) = 0.5 - \eta$ for a small $\eta > 0$. After $a$, spread the mass uniformly over $N$ tokens, each $1/N$; after $b$, put probability $1$ on a single token $c$. Greedy picks $a$ and then any of the $N$ tokens, probability $(0.5 + \eta)/N$. The best output is $bc$ with probability $0.5 - \eta$. The ratio is $(0.5 + \eta)/\big(N(0.5 - \eta)\big)$, which is below $\delta$ once $N > (0.5 + \eta)/\big(\delta(0.5 - \eta)\big)$. Beam search with $k = 2$ would find $bc$; but by nesting the construction one can defeat any fixed beam width.
:::
:::

::: exercise Length normalisation flips a decision {level=2 check="log(3.2/2.4)/log(9/4)"}
Hypothesis A has $4$ tokens and $\log p = -2.4$; hypothesis B has $9$ tokens and $\log p = -3.2$. For the penalty $\operatorname{lp}(n) = n^\alpha$, find the value of $\alpha$ at which the two scores are equal. Which hypothesis wins for larger $\alpha$?
::: solution
Equal scores: $-2.4/4^\alpha = -3.2/9^\alpha$, i.e. $(9/4)^\alpha = 3.2/2.4 = 4/3$, so $\alpha = \ln(4/3)/\ln(9/4) = 0.2877/0.8109 = 0.355$. For $\alpha > 0.355$ the longer hypothesis B wins (its score is divided by a faster-growing penalty); for smaller $\alpha$, including raw scores, A wins.
:::
:::

::: exercise Entropy at two temperatures {level=2}
For two tokens with logits $(z, 0)$, write the entropy $H(\tau)$ explicitly and verify the derivative formula of [[#prop-entropy]] at $z = 1$, $\tau = 1$.
::: solution
$p = \sigma(z/\tau)$ for the first token, and $H = -p\ln p - (1 - p)\ln(1 - p)$. With $\beta = 1/\tau$, $\Var_p(z) = z^2p(1 - p)$ (a two-point distribution at $z$ and $0$), so the formula predicts $dH/d\beta = -\beta z^2p(1 - p)$. At $z = 1$, $\beta = 1$: $p = \sigma(1) = 0.731$, so $dH/d\beta = -0.731\cdot0.269 = -0.197$. Directly, $dH/dp = \ln\frac{1 - p}{p} = -1$ at $p = \sigma(1)$ (since $\ln\frac{p}{1 - p} = \beta z = 1$), and $dp/d\beta = zp(1 - p) = 0.197$, so $dH/d\beta = -0.197$. They agree.
:::
:::

::: exercise Top-k and top-p on flat and peaked distributions {level=2}
Compare top-$k$ with $k = 10$ and top-$p$ with $p = 0.9$ on (a) a peaked distribution with $p_{(1)} = 0.95$ and the remaining $0.05$ spread evenly over $999$ tokens, and (b) a flat distribution, uniform over $1{,}000$ tokens. Which method behaves sensibly in each case?
::: solution
(a) Top-$p$: the first token already has mass $0.95\ge0.9$, so the nucleus is that one token and sampling is deterministic, as it should be. Top-$10$ keeps the top token and nine tail tokens of probability $0.05/999\approx5\times10^{-5}$ each; after renormalising, the tail gets $9\cdot5.0\times10^{-5}/0.95045\approx4.7\times10^{-4}$ — harmless here, but top-$k$ has not adapted. (b) Top-$p$ keeps $900$ tokens, reflecting genuine uncertainty. Top-$10$ keeps $10$ arbitrary tokens out of $1{,}000$ equally plausible ones, sharply and unjustifiably narrowing the distribution. Top-$p$ behaves sensibly in both; top-$k$ is too wide in (a) in principle and too narrow in (b).
:::
:::

::: exercise Beam search with length normalisation {level=3}
Modify `beam_search` so that it can stop early when `alpha > 0`. Show that the stopping rule of [[#prop-monotone]] is not valid for normalised scores by giving two hypotheses where a longer extension has a better normalised score than its prefix, and propose a valid bound when $T_{\max}$ is known.
::: solution
With $\alpha = 1$, a prefix with $2$ tokens and $\log p = -2.0$ scores $-1.0$; extending it by a token of probability $0.9$ gives $3$ tokens and $\log p = -2.105$, score $-0.702$ — better. So a finished hypothesis that beats every open hypothesis's *current* normalised score can still be overtaken. A valid bound: an open hypothesis of length $n$ with raw score $s\le0$ can at best keep its raw score $s$ (all further tokens with probability $1$) and reach length $T_{\max}$, so its best possible normalised score is $s/T_{\max}^\alpha$ (dividing a non-positive number by the largest penalty). Stop when the best finished normalised score is at least $\max_{\text{open}}s/T_{\max}^\alpha$. This bound is loose, which is why implementations often simply run until all $k$ hypotheses have finished or $T_{\max}$ is reached.
:::
:::

::: exercise Implement a repetition penalty {level=3}
Add to the listing a function that applies the CTRL-style repetition penalty $\theta$ to logits, given the tokens generated so far: for each previously generated token, divide its logit by $\theta$ if it is positive and multiply it by $\theta$ if it is negative. Apply it with $\theta = 1.2$ to the logits $(3, 2.5, 1, 0.5, 0, -1)$ when "mat" and "idea" have already been generated, and compute the new probability of "mat" at $\tau = 1$. Why does the rule treat positive and negative logits differently?
::: solution
```python
def repetition_penalty(z, seen, theta):
    return [(v / theta if v > 0 else v * theta) if i in seen else v
            for i, v in enumerate(z)]
z = repetition_penalty([3.0, 2.5, 1.0, 0.5, 0.0, -1.0], {0, 5}, 1.2)
print([round(v, 3) for v in z], round(softmax(z)[0], 3))   # [2.5, 2.5, 1.0, 0.5, 0.0, -1.2] 0.406
```
"mat" falls from $0.529$ to $0.406$ and is now tied with "rug". Dividing a *negative* logit by $\theta > 1$ would move it towards $0$, i.e. *raise* its probability, the opposite of the intent; multiplying it by $\theta$ makes it more negative. The rule is not invariant to adding a constant to all logits (which leaves the softmax unchanged), a sign that it is a heuristic rather than a principled transformation of the distribution.
:::
:::
