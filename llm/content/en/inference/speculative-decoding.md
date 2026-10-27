A decode step of a large model reads every weight to produce a single token, and its arithmetic units are mostly idle ([[inference/decoding-sampling#prop-phases]]). Processing *several* positions in that step would cost almost the same time, because the weights are read once however many positions use them ([[inference/batching-serving#prop-linear-intensity]]). Prefill exploits this for the prompt, whose tokens are all known. Generation cannot, because token $t + 1$ depends on token $t$ — unless we can guess the next few tokens cheaply and have the large model check all the guesses in one pass.

**Speculative decoding** does exactly this. A small **draft model** proposes $\gamma$ tokens; the large **target model** scores all of them in a single forward pass; a carefully designed acceptance rule keeps a prefix of the proposals and fixes the first rejected one. The remarkable fact, proved below, is that the rule can be chosen so that the generated text has **exactly the target model's distribution** — not an approximation of it. Speculative decoding is therefore a pure speed optimisation: it changes how fast tokens arrive, never which tokens are likely.

The chapter proves this, derives the acceptance rate and the expected number of tokens per target pass, $(1 - \alpha^{\gamma+1})/(1 - \alpha)$, turns that into a speed-up formula with an optimal number of draft tokens, simulates the whole scheme in plain Python, and then surveys the variants — draft heads such as Medusa and EAGLE, tree verification, lookahead decoding — distinguishing the ones that preserve the distribution from the ones that do not.

## The algorithm {#sec-algorithm}

Write $p(\cdot\mid x_{<t})$ for the target model and $q(\cdot\mid x_{<t})$ for the draft. Both have the same vocabulary. When the target is sampled with temperature and truncation, $p$ means the distribution after those transformations ([[inference/decoding-sampling#def-pipeline]]), and likewise for $q$.

::: algorithm Speculative sampling (Leviathan, Kalman and Matias, 2023; Chen et al., 2023) {#alg-spec}
Given a prefix $x_{<t}$ and a draft length $\gamma\ge1$:

1. **Draft.** For $i = 1,\dots,\gamma$: sample $\tilde x_i\sim q(\cdot\mid x_{<t}, \tilde x_{<i})$, recording the distributions $q_i$.
2. **Score.** Run the target once on $x_{<t}, \tilde x_1,\dots,\tilde x_\gamma$, obtaining $p_i = p(\cdot\mid x_{<t}, \tilde x_{<i})$ for $i = 1,\dots,\gamma + 1$.
3. **Verify.** For $i = 1,\dots,\gamma$: draw $u\sim\mathrm{Uniform}(0, 1)$; if $u < \min\big(1, p_i(\tilde x_i)/q_i(\tilde x_i)\big)$, **accept** $\tilde x_i$ and continue; otherwise **reject** it, sample a replacement from the **residual distribution**

$$
r_i(x) = \frac{\max\big(0,\ p_i(x) - q_i(x)\big)}{\sum_{y}\max\big(0,\ p_i(y) - q_i(y)\big)},
$$ {#eq-residual}

append it, and stop.
4. **Bonus.** If all $\gamma$ drafts were accepted, sample one more token from $p_{\gamma+1}$ and append it.

Each iteration appends between $1$ and $\gamma + 1$ tokens and costs $\gamma$ draft steps and one target pass over $\gamma + 1$ positions.
:::

Step 2 is where the time is saved. Scoring $\gamma + 1$ positions in one pass is like a small prefill: the weights are read once, and the extra positions add arithmetic that a memory-bound step had to spare. The KV cache of the rejected positions is discarded (with a paged cache, the block table is simply truncated, [[inference/kv-cache#def-paged]]).

## Why the distribution is preserved {#sec-exactness}

::: theorem Speculative sampling is exact {#thm-exact}
Let $p$ and $q$ be distributions on a finite vocabulary, with $q(x) > 0$ whenever $p(x) > 0$ (or define $p/q = \infty$ where $q = 0$, which only matters for tokens the draft never proposes). Draw $\tilde x\sim q$, accept it with probability $\min(1, p(\tilde x)/q(\tilde x))$, and otherwise output a sample from $r(x)\propto\max(0, p(x) - q(x))$. The output $X$ has distribution $p$.

Consequently, the sequence produced by [[#alg-spec]] has, for any length, exactly the distribution of ancestral sampling from $p$.
:::

::: proof
Let $\beta = \sum_x\min\big(p(x), q(x)\big)$ be the overall probability of accepting. The probability that $x$ is proposed and accepted is $q(x)\min\big(1, p(x)/q(x)\big) = \min\big(p(x), q(x)\big)$. The probability of rejecting is $1 - \beta$, and

$$
1 - \beta = \sum_x\big(p(x) - \min(p(x), q(x))\big) = \sum_x\max\big(0, p(x) - q(x)\big),
$$

using $\sum_xp(x) = 1$ and $p - \min(p, q) = \max(0, p - q)$. So the normaliser of $r$ is exactly $1 - \beta$ (if $\beta = 1$, then $p = q$ and rejection never happens). Therefore

$$
\Prob(X = x) = \min\big(p(x), q(x)\big) + (1 - \beta)\,\frac{\max\big(0, p(x) - q(x)\big)}{1 - \beta} = \min(p(x), q(x)) + \max(0, p(x) - q(x)) = p(x).
$$

For sequences, argue by induction on the number of tokens produced. Each token of an iteration is produced either by the accept/reject step at position $i$, whose proposal is drawn from $q_i$ conditioned on the tokens accepted so far, so that by the first part it has the conditional distribution $p_i(\cdot\mid\text{everything before it})$; or by the bonus step, which samples from $p_{\gamma+1}$ directly. The decision to stop an iteration depends only on tokens already produced, and the next iteration starts from the produced prefix with fresh randomness. Hence every token has conditional distribution $p(\cdot\mid\text{preceding tokens})$ given all preceding tokens, which is the definition of ancestral sampling from $p$, and the joint distribution of the first $n$ tokens is $\prod_tp(x_t\mid x_{<t})$.
:::

The proof uses nothing about the draft except that it is a distribution; a terrible draft is merely slow. The rule is also the only natural one: it is the maximal coupling of $q$ and $p$, accepting as often as is possible while keeping $p$.

::: example The rule by hand {#ex-rule}
The target gives $p = (0.6, 0.3, 0.1)$ to three tokens A, B, C, and the draft $q = (0.3, 0.5, 0.2)$. Compute the acceptance probability of each proposal, the overall acceptance rate, the residual distribution, and check that the output has distribution $p$.
::: solution
Acceptance probabilities $\min(1, p/q)$: A $\min(1, 2) = 1$, B $0.6$, C $0.5$. Proposed-and-accepted: A $0.3$, B $0.3$, C $0.1$; total $\beta = 0.7$. The residual is $\max(0, p - q) = (0.3, 0, 0)$, normalised to $(1, 0, 0)$: a rejection always yields A. Output: A $0.3 + 0.3\cdot1 = 0.6$, B $0.3$, C $0.1$ — exactly $p$. The draft overrated B and C; rejections convert its excess mass on them into the mass on A that it underrated.
:::
:::

When the target decodes greedily, $p$ is a point mass on the argmax $x^*$, and the rule reduces to: accept a draft token if and only if it equals $x^*$, and otherwise output $x^*$. Speculative greedy decoding then returns exactly the greedy output of the target, a special case first used in blockwise parallel decoding (Stern, Shazeer and Uszkoreit, 2018).

## How many tokens per pass? {#sec-tokens}

::: proposition The acceptance rate is one minus total variation {#prop-alpha}
The probability that a draft token is accepted, $\beta = \sum_x\min(p(x), q(x))$, equals $1 - \operatorname{TV}(p, q)$, where $\operatorname{TV}(p, q) = \tfrac12\sum_x\lvert p(x) - q(x)\rvert$.
:::

::: proof
$\min(a, b) = \tfrac12(a + b - \lvert a - b\rvert)$. Summing over $x$, $\sum_x\min(p, q) = \tfrac12(1 + 1 - \sum_x\lvert p - q\rvert) = 1 - \operatorname{TV}(p, q)$.
:::

The **acceptance rate** $\alpha$ of a draft–target pair is the average of $\beta$ over the contexts met in generation. It depends on the task and on the sampling settings: at low temperature both distributions sharpen, and if they agree on the top token, $\alpha$ approaches $1$; at high temperature their tails differ more.

::: proposition Expected tokens per target pass {#prop-expected}
If each draft token is accepted independently with probability $\alpha < 1$, the expected number of tokens appended per iteration of [[#alg-spec]] is

$$
\E[\text{tokens}] = \sum_{k=0}^{\gamma}\alpha^k = \frac{1 - \alpha^{\gamma+1}}{1 - \alpha}.
$$ {#eq-expected}
:::

::: proof
An iteration appends one token for each accepted draft before the first rejection, plus one more (the residual sample at the rejection, or the bonus token if none is rejected). If $A$ is the number of accepted drafts, the iteration appends $A + 1$ tokens, with $A = \min(G, \gamma)$ where $G$ is the number of successes before the first failure in independent trials of success probability $\alpha$. For $k = 1,\dots,\gamma$, $\Prob(A\ge k) = \alpha^k$ (the first $k$ drafts are all accepted). Then $\E[A] = \sum_{k=1}^\gamma\Prob(A\ge k) = \sum_{k=1}^\gamma\alpha^k$, and $\E[A + 1] = \sum_{k=0}^\gamma\alpha^k = (1 - \alpha^{\gamma+1})/(1 - \alpha)$ by the geometric series.
:::

As $\gamma\to\infty$ the expectation tends to $1/(1 - \alpha)$: with $\alpha = 0.8$, at most $5$ tokens per pass however long the draft. Long drafts have diminishing returns, because a draft token is useful only if every token before it was accepted.

::: widget plot
f: (1-a^(x+1))/(1-a); 1/(1-a)
x: 0, 16
y: 0, 11
sliders: a=0.8:0.3:0.95:0.01
labels: expected tokens per target pass; limit $1/(1-\alpha)$
caption: Expected tokens per target pass against the draft length $\gamma$, for acceptance rate $\alpha$ (slider), from [[#eq-expected]]. At $\gamma = 0$ (no draft) every pass yields one token. The curve saturates at $1/(1 - \alpha)$: $5$ tokens for $\alpha = 0.8$, $10$ for $\alpha = 0.9$. A good draft model matters more than a long draft.
:::

## The speed-up {#sec-speedup}

Tokens per pass is not yet speed: drafting costs time too.

::: proposition Speed-up of speculative decoding {#prop-speedup}
Suppose a target decode step takes time $T$, verifying $\gamma + 1$ positions in one target pass also takes time $T$ (the memory-bound regime), and a draft step takes $cT$. Under the assumptions of [[#prop-expected]], the expected speed-up in tokens per unit time over ordinary decoding is

$$
S(\alpha, \gamma, c) = \frac{1 - \alpha^{\gamma+1}}{(1 - \alpha)(\gamma c + 1)}.
$$ {#eq-speedup}
:::

::: proof
An iteration costs $\gamma$ draft steps and one target pass, $(\gamma c + 1)T$, and yields $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ tokens in expectation. Ordinary decoding yields $1$ token per time $T$. The ratio of expected tokens per unit time is $S$. (Strictly, this is the ratio of the expected tokens to the fixed iteration cost, which is the long-run rate by the renewal reward theorem, since iterations are independent and identically distributed under the assumptions.)
:::

::: example Choosing the draft length {#ex-speedup}
A draft model costs $c = 0.05$ of a target step and has acceptance rate $\alpha = 0.8$. Compute the speed-up for $\gamma = 4$, and find the best integer $\gamma$. What if the draft is a weaker but cheaper model with $\alpha = 0.6$ and $c = 0.2$?
::: solution
$\gamma = 4$: $(1 - 0.8^5)/0.2 = (1 - 0.32768)/0.2 = 3.362$ tokens per iteration, at cost $1 + 4\cdot0.05 = 1.2$: $S = 2.80$. Tabulating [[#eq-speedup]] for $\gamma = 1,\dots,12$: $1.71, 2.22, 2.57, 2.80, 2.95, 3.04, 3.08, 3.09, 3.08, 3.05, 3.00, 2.95$, so $\gamma = 8$ is best, at $S = 3.09$ — barely better than $\gamma = 6$. For $\alpha = 0.6$, $c = 0.2$: $\gamma = 1, 2, 3$ give $1.33, 1.40, 1.36$, so $\gamma = 2$ and a speed-up of only $1.4$. (Despite the name, $c = 0.2$ is not cheap: a draft model a fifth as fast as the target eats most of the gain.)
:::
:::

::: widget plot
f: (1-a^(x+1))/((1-a)*(x*c+1))
x: 0, 16
y: 0, 5
sliders: a=0.8:0.3:0.95:0.01; c=0.05:0.01:0.5:0.01
labels: speed-up $S(\alpha, \gamma, c)$
hlines: 1
caption: Speed-up against draft length $\gamma$, [[#eq-speedup]], for acceptance rate $\alpha$ and relative draft cost $c$ (sliders). Each curve rises, peaks and falls as drafting time overtakes the gain; below the line $S = 1$ speculative decoding is slower than plain decoding. The optimum $\gamma$ grows with $\alpha$ and shrinks with $c$.
:::

::: example A 70-billion-parameter target with an 8-billion-parameter draft {#ex-70b}
A $70$-billion-parameter target in bfloat16 runs on devices with an aggregate $6.7$ TB/s, so a decode step for one request takes about $20.9$ ms ([[inference/decoding-sampling]], exercises). An $8$-billion-parameter draft of the same family runs on the same devices. Assume both are purely memory-bound, the acceptance rate is $\alpha = 0.75$, and verification of $\gamma + 1$ positions costs one target step. Estimate the draft cost ratio $c$, the best $\gamma$ and the resulting tokens per second.
::: solution
The draft reads $16$ GB per step, $16\times10^9/6.7\times10^{12} = 2.4$ ms, so $c = 2.4/20.9 = 0.115$. Evaluating [[#eq-speedup]] for $\gamma = 1,\dots,8$: $1.57, 1.88, 2.03, 2.09, 2.09, 2.05, 2.00, 1.93$, so $\gamma = 4$ (or $5$) is best with $S\approx2.09$. At $\gamma = 4$ an iteration takes $20.9(1 + 4\cdot0.115) = 30.5$ ms and yields $(1 - 0.75^5)/0.25 = 3.05$ tokens: about $100$ tokens per second instead of $48$. A draft ten times smaller than the target is still not free: drafting takes a third of each iteration.
:::
:::

The assumption that verifying $\gamma + 1$ positions costs one target step is what makes the scheme work, and it holds only while the target is memory-bound. In a server running large batches, decode steps approach the compute-bound regime ([[inference/batching-serving#ex-roofline]]), and then scoring $\gamma + 1$ positions per sequence costs up to $\gamma + 1$ times as much arithmetic. Each rejected draft token is then wasted compute that other requests could have used. Speculative decoding therefore helps most for latency-sensitive serving at small batch sizes, and its benefit at high load must be measured; serving systems commonly reduce $\gamma$ or switch speculation off as the batch grows.

::: warning "Speculative decoding trades quality for speed"
The standard algorithm does not change the output distribution at all ([[#thm-exact]]): a poor draft model costs speed, never quality. Quality can change only if the acceptance rule is altered — as in some variants below that accept any "plausible" draft token — or through floating-point effects of scoring several positions at once (the same last-bit differences as batching, [[inference/decoding-sampling#sec-determinism]]). When a method claims a speed-up "without loss of quality", check whether it uses the exact rule or a relaxed one.
:::

## Implementing it {#sec-code}

The listing implements [[#alg-spec]] on a toy target model — a first-order Markov chain over $6$ tokens with random logits — and a draft whose logits are a damped, noisy copy of the target's. It checks exactness by comparing the empirical distribution of the first three generated tokens with the exact target probabilities, measures tokens per target pass, and checks [[#eq-expected]] in a setting where the acceptance rate is constant.

```python
import math, random
V = 6
def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e); return [v / s for v in e]
def sample(p, rng):
    u, acc = rng.random(), 0.0
    for i, v in enumerate(p):
        acc += v
        if u < acc: return i
    return len(p) - 1

# a toy target model p(x_t | x_{t-1}) and a cheaper, imperfect draft q(x_t | x_{t-1})
g = random.Random(42)
TL = [[g.gauss(0, 1.5) for _ in range(V)] for _ in range(V + 1)]   # row V = start of text
DL = [[0.6 * t + g.gauss(0, 0.6) for t in row] for row in TL]
def p_target(prev): return softmax(TL[prev])
def q_draft(prev): return softmax(DL[prev])

def speculative_step(prefix, gamma, rng):
    """One draft-and-verify iteration (Leviathan et al. 2023; Chen et al. 2023).
    Returns the tokens appended: between 1 and gamma + 1 of them."""
    drafts, qs, prev = [], [], prefix[-1]
    for _ in range(gamma):                                   # 1. draft gamma tokens autoregressively
        q = q_draft(prev); x = sample(q, rng)
        drafts.append(x); qs.append(q); prev = x
    out, prev = [], prefix[-1]
    for x, q in zip(drafts, qs):                             # 2. target scores all positions (one pass)
        p = p_target(prev)
        if rng.random() < min(1.0, p[x] / q[x]):             # 3. accept with prob min(1, p/q)
            out.append(x); prev = x
        else:                                                # 4. on rejection, sample the residual
            r = [max(0.0, a - b) for a, b in zip(p, q)]; s = sum(r)
            out.append(sample([v / s for v in r], rng)); return out
    out.append(sample(p_target(prev), rng))                  # 5. all accepted: one bonus token
    return out

def generate(n_tokens, gamma, rng):
    seq, iters = [V], 0
    while len(seq) - 1 < n_tokens:
        seq += speculative_step(seq, gamma, rng); iters += 1
    return seq[1:n_tokens + 1], iters

# (1) the output distribution equals the target's: compare the joint law of the first 3 tokens
exact = {}
for a in range(V):
    for b in range(V):
        for c in range(V):
            exact[(a, b, c)] = p_target(V)[a] * p_target(a)[b] * p_target(b)[c]
rng = random.Random(0); N = 200000; counts = {}
for _ in range(N):
    s, _ = generate(3, 4, rng); counts[tuple(s)] = counts.get(tuple(s), 0) + 1
tv = 0.5 * sum(abs(counts.get(k, 0) / N - v) for k, v in exact.items())
print(f"TV(empirical speculative, exact target) over {V**3} triples: {tv:.4f}")
rng = random.Random(0); counts_q = {}
for _ in range(N):
    prev, s = V, []
    for _ in range(3): x = sample(q_draft(prev), rng); s.append(x); prev = x
    counts_q[tuple(s)] = counts_q.get(tuple(s), 0) + 1
print(f"TV(draft model alone, exact target):              "
      f"{0.5 * sum(abs(counts_q.get(k, 0) / N - v) for k, v in exact.items()):.4f}")
rng = random.Random(1); counts = {}
for _ in range(N):
    s = [sample(p_target(V), rng)]
    for _ in range(2): s.append(sample(p_target(s[-1]), rng))
    counts[tuple(s)] = counts.get(tuple(s), 0) + 1
print(f"TV(direct target sampling, exact target):         "
      f"{0.5 * sum(abs(counts.get(k, 0) / N - v) for k, v in exact.items()):.4f}")

# (2) acceptance rate = 1 - TV(p, q) per context, and tokens per iteration
alphas = [sum(min(a, b) for a, b in zip(p_target(c), q_draft(c))) for c in range(V + 1)]
print("acceptance rate per context:", " ".join(f"{a:.3f}" for a in alphas))
rng = random.Random(2)
for gamma in (1, 2, 4, 8):
    toks, iters = generate(100000, gamma, rng)
    print(f"gamma={gamma}: {len(toks) / iters:.3f} tokens per target pass")

# (3) i.i.d. acceptance (context-free p and q): check E[tokens] = (1 - a^(g+1)) / (1 - a)
p = softmax([2.0, 1.0, 0.5, 0.0, -1.0, -2.0]); q = softmax([1.5, 1.2, 0.3, 0.2, -0.5, -2.5])
a = sum(min(x, y) for x, y in zip(p, q))
def step_iid(gamma, rng):
    for k in range(gamma):
        x = sample(q, rng)
        if rng.random() >= min(1.0, p[x] / q[x]): return k + 1   # k accepted + 1 residual token
    return gamma + 1
rng = random.Random(3)
for gamma in (1, 2, 4, 8):
    sim = sum(step_iid(gamma, rng) for _ in range(200000)) / 200000
    print(f"alpha={a:.4f} gamma={gamma}: simulated {sim:.3f}, formula {(1 - a ** (gamma + 1)) / (1 - a):.3f}")
```

Output:

```
TV(empirical speculative, exact target) over 216 triples: 0.0101
TV(draft model alone, exact target):              0.3688
TV(direct target sampling, exact target):         0.0100
acceptance rate per context: 0.836 0.789 0.825 0.599 0.802 0.749 0.817
gamma=1: 1.757 tokens per target pass
gamma=2: 2.333 tokens per target pass
gamma=4: 3.129 tokens per target pass
gamma=8: 3.854 tokens per target pass
alpha=0.8428 gamma=1: simulated 1.842, formula 1.843
alpha=0.8428 gamma=2: simulated 2.553, formula 2.553
alpha=0.8428 gamma=4: simulated 3.650, formula 3.656
alpha=0.8428 gamma=8: simulated 4.994, formula 4.996
```

The empirical distribution of speculative samples is as close to the exact target distribution ($0.0101$ in total variation) as $200{,}000$ samples drawn *directly* from the target ($0.0100$): what remains is sampling noise. The draft alone is far off ($0.37$), yet speculative decoding inherits none of its error. With context-dependent acceptance rates between $0.60$ and $0.84$, four drafts yield $3.13$ tokens per target pass; with a constant rate the simulation matches [[#eq-expected]] to sampling error.

## Where drafts come from {#sec-drafts}

The draft must be fast and must agree with the target often. Several sources are used.

- **A smaller model of the same family**, sharing the tokeniser: the original setting. Leviathan et al. reported $2$–$3\times$ speed-ups on T5-XXL with T5-small drafts, and Chen et al. $2$–$2.5\times$ on a $70$-billion-parameter Chinchilla model with a $4$-billion-parameter draft, in their experimental settings. Distilling the draft towards the target raises $\alpha$ (DistillSpec, Zhou et al., 2024; [[post-training/distillation]]).
- **The target itself, cut short.** Drafting with a subset of the target's layers — skipping some, or exiting early — needs no second model and shares the cache (Draft & Verify, Zhang et al., 2024; LayerSkip, Elhoushi et al., 2024, which trains the model so that early exits are good drafts; compare [[inference/model-compression#sec-early-exit]]).
- **Retrieval and $n$-grams.** Copying the continuation of an earlier occurrence of the last few tokens — in the prompt, or in a datastore — gives free drafts that are often right when outputs repeat their inputs (editing code, quoting documents). Several open-source engines offer this "prompt lookup" drafting.

### Variants that change the drafter or the verifier

The following are published variants, each evaluated by its authors on particular models; they differ in whether they keep the target distribution exactly.

::: definition Draft heads, tree verification and lookahead decoding {#def-variants}
- **Medusa** (Cai et al., 2024) adds $K$ extra output heads to the target; head $k$ predicts the token $k + 1$ positions ahead from the current hidden state. Their top candidates are combined into a **tree** of continuations verified in one pass using an attention mask in which each candidate attends only to its own ancestors (**tree attention**). Medusa proposed a **typical acceptance** rule that accepts candidates with sufficiently high target probability; this is faster but does not preserve the target distribution. With the exact rule it does.
- **EAGLE** (Li et al., 2024) trains a small one-layer autoregressive draft head that predicts the target's next *hidden feature* from its features and the sampled tokens, and drafts tokens through the target's own output layer; it verifies with the exact rule of [[#alg-spec]] (generalised to trees), so the distribution is preserved. Later versions build the draft tree dynamically from the draft's confidence.
- **Token-tree verification** (SpecInfer, Miao et al., 2024) verifies a tree of candidates from one or several drafts with a multi-candidate generalisation of the acceptance rule that preserves the distribution.
- **Lookahead decoding** (Fu et al., 2024) needs no draft model: it runs **Jacobi iterations** — guessing several future tokens, re-predicting all of them in parallel, and repeating — collects the $n$-grams these iterations produce, and verifies matching $n$-grams in the same pass. In its published form it targets greedy decoding, for which it returns exactly the greedy output.
:::

Some models are trained from the start with extra **multi-token prediction** heads (Gloeckle et al., 2024), which can later serve as drafts; the DeepSeek-V3 technical report (2024) described using its multi-token prediction module this way and reported a high acceptance rate for the second token.

::: quiz
A target decodes at temperature $1$ with a draft whose acceptance rate is only $0.2$. What happens to the distribution of the output and to the speed, compared with plain decoding?
- [ ] The output follows the draft more than the target
- [x] The output has the target's distribution; the speed-up is small or negative
- [ ] The output is a mixture of draft and target distributions weighted by $0.2$ and $0.8$
- [ ] The algorithm fails, since the residual distribution is undefined
::: solution
[[#thm-exact]] holds for any draft. With $\alpha = 0.2$, tokens per pass are at most $1/(1 - 0.2) = 1.25$, and after paying for the draft steps the speed-up is likely below $1$ ([[#prop-speedup]]). The residual is undefined only when $p = q$, in which case rejection never happens.
:::
:::

::: example Tree verification by hand {#ex-tree}
A greedy target's next token is $x^*$. A draft proposes $k$ distinct candidates for the next position, sampled without replacement from its distribution; suppose $x^*$ has draft probability $0.6$, and compare $k = 1$ with $k = 3$ when the draft's other mass is spread over many tokens of tiny probability each. Then estimate the probability that the first candidate is right when the candidates are instead the draft's top $3$ tokens and $x^*$ is the draft's top token with probability $0.6$ over contexts, its second with probability $0.2$ and its third with $0.1$.
::: solution
With one sample, the chance of proposing $x^*$ is $0.6$. With three distinct samples, when the remaining mass is spread thinly, the chance that $x^*$ is among them is close to that of three independent draws, $1 - 0.4^3 = 0.936$. With the top-$3$ list, the chance that $x^*$ is among the candidates is $0.6 + 0.2 + 0.1 = 0.9$. Trees raise the acceptance of each position at the cost of verifying more positions per pass, which remains cheap while the target is memory-bound; methods differ in how they shape the tree to the budget.
:::
:::

::: application Speculation in deployed systems
As of 2026, speculative decoding with small draft models, draft heads or $n$-gram lookup is supported by the major open-source serving engines and is described in the published technical reports of several model families. Its benefit is workload-dependent: highest for predictable text (code, structured output, translation, edits), at low temperature, and at small batch sizes; lowest for creative sampling at high temperature on a heavily loaded server. It composes with quantisation ([[inference/quantisation]]) — a quantised copy of the target is itself a natural draft — and with the latency–throughput trade-offs of [[inference/latency-cost]].
:::

::: history
Stern, Shazeer and Uszkoreit (NeurIPS 2018) proposed blockwise parallel decoding: predict several future tokens with extra heads and keep the longest prefix the model agrees with under greedy decoding. Leviathan, Kalman and Matias (Google; arXiv 2022, ICML 2023) and, independently, Chen, Borgeaud, Irving, Lespiau, Sifre and Jumper (DeepMind, 2023) generalised this to sampling with the acceptance rule of [[#alg-spec]], proving that it preserves the target distribution; the rule is the rejection-sampling scheme of a maximal coupling, known in probability theory long before. Miao and colleagues' SpecInfer (ASPLOS 2024) verified token trees; Cai and colleagues' Medusa (ICML 2024), Li, Wei, Zhang and Zhang's EAGLE (ICML 2024) and Fu, Bailis, Stoica and Zhang's lookahead decoding (ICML 2024) removed or shrank the separate draft model.
:::

::: summary
- **Speculative decoding** drafts $\gamma$ tokens with a cheap model and scores them all in one target pass, which costs about one decode step while the target is memory-bound.
- Accepting a draft token with probability $\min(1, p/q)$ and otherwise sampling the residual $\propto\max(0, p - q)$ yields **exactly** the target distribution, for any draft; under greedy decoding it yields exactly the greedy output.
- The acceptance rate is $1 - \operatorname{TV}(p, q)$; with independent acceptances, a pass yields $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ tokens, at most $1/(1 - \alpha)$.
- The speed-up $\frac{1 - \alpha^{\gamma+1}}{(1 - \alpha)(\gamma c + 1)}$ has an optimal $\gamma$; it shrinks with large batches, where verification is no longer free.
- Drafts come from smaller models, the target's own early layers, draft heads (Medusa, EAGLE), $n$-gram lookup or Jacobi iterations (lookahead). Exact variants preserve the distribution; relaxed acceptance rules (such as typical acceptance) do not.
:::

## Exercises

::: exercise An acceptance rate {level=1 check="0.7"}
For $p = (0.6, 0.3, 0.1)$ and $q = (0.3, 0.5, 0.2)$, what is the probability that a draft token is accepted?
::: solution
$\sum\min(p, q) = 0.3 + 0.3 + 0.1 = 0.7$. Equivalently, $\operatorname{TV} = \tfrac12(0.3 + 0.2 + 0.1) = 0.3$ and $1 - 0.3 = 0.7$ ([[#prop-alpha]]).
:::
:::

::: exercise Tokens per pass {level=1 check="2.533"}
With acceptance rate $\alpha = 0.7$ and $\gamma = 3$ drafts, how many tokens does a target pass yield on average? Give three decimal places.
::: solution
$(1 - 0.7^4)/(1 - 0.7) = (1 - 0.2401)/0.3 = 2.533$.
:::
:::

::: exercise A speed-up {level=1 check="2.801"}
Compute $S(0.8, 4, 0.05)$ from [[#eq-speedup]] to three decimal places.
::: solution
$(1 - 0.8^5)/(0.2\cdot1.2) = 0.67232/0.24 = 2.801$.
:::
:::

::: exercise The best draft length {level=2 check="8"}
For $\alpha = 0.8$ and $c = 0.05$, which integer $\gamma$ maximises $S$?
::: solution
From the table in [[#ex-speedup]], $S(\gamma)$ for $\gamma = 7, 8, 9$ is $3.082, 3.092, 3.078$; the maximum is at $\gamma = 8$. The curve is flat near its peak, so in practice a smaller $\gamma$ that wastes less work on rejected drafts is often chosen.
:::
:::

::: exercise The residual distribution {level=2}
For $p = (0.5, 0.5)$ and $q = (0.9, 0.1)$, compute the acceptance probability of each token, the residual distribution and the output distribution. Why does the residual put all its mass on the second token?
::: solution
Accept the first token with probability $\min(1, 0.5/0.9) = 0.556$, the second always. Proposed-and-accepted mass: $0.9\cdot0.556 = 0.5$ and $0.1$; $\beta = 0.6$. Residual $\max(0, p - q) = (0, 0.4)$, normalised $(0, 1)$. Output: first $0.5$, second $0.1 + 0.4\cdot1 = 0.5$, which is $p$. The draft overrates the first token, so all its rejections come from first-token proposals, and the mass to be restored is entirely on the token the draft underrated.
:::
:::

::: exercise Greedy speculation is exact {level=2}
Show that when the target is greedy ($p$ is a point mass at $x^* = \arg\max$ of the target's logits), [[#alg-spec]] outputs exactly the target's greedy sequence, whatever the draft (including a greedy draft, where $q$ is a point mass too).
::: solution
With $p = \delta_{x^*}$, a draft token $\tilde x\ne x^*$ has $p(\tilde x) = 0$ and is rejected with probability $1$; the residual is $\max(0, \delta_{x^*} - q)\propto\delta_{x^*}$, so the replacement is $x^*$. A draft token equal to $x^*$ has $p/q = 1/q(x^*)\ge1$ and is accepted with probability $1$. The bonus token is sampled from a point mass at the target's argmax. So every appended token is the target's argmax given the preceding tokens — the greedy sequence. A greedy draft is just a point-mass $q$; the argument does not use the form of $q$.
:::
:::

::: exercise The limit of long drafts {level=2}
Show that for fixed $c > 0$, $S(\alpha, \gamma, c)\to0$ as $\gamma\to\infty$, and that for $c = 0$ it increases to $1/(1 - \alpha)$. Interpret both limits.
::: solution
The numerator $(1 - \alpha^{\gamma+1})/(1 - \alpha)$ is bounded by $1/(1 - \alpha)$, while the denominator $\gamma c + 1\to\infty$ for $c > 0$; so $S\to0$: an ever longer draft keeps costing time while adding ever less (each extra draft token is useful only if all earlier ones were accepted). For $c = 0$, $S = \sum_{k=0}^\gamma\alpha^k$, increasing in $\gamma$ with limit $1/(1 - \alpha)$: even a free draft cannot beat the mean run length of acceptances.
:::
:::

::: exercise Speculation at large batch {level=3}
Assume a server whose decode steps are compute-bound, so that scoring $\gamma + 1$ positions per sequence costs $\gamma + 1$ times a normal step for the target, and drafting costs $c$ per draft token relative to a normal target step. Derive the speed-up and show that it is below $1$ for every $\gamma\ge1$ whenever $c\ge0$ and $\alpha < 1$.
::: solution
An iteration costs $(\gamma + 1 + \gamma c)$ normal steps and yields $\sum_{k=0}^\gamma\alpha^k$ tokens, so $S = \sum_{k=0}^\gamma\alpha^k/(\gamma + 1 + \gamma c)$. Since $\alpha^k\le1$ with strict inequality for $k\ge1$, $\sum_{k=0}^\gamma\alpha^k < \gamma + 1\le\gamma + 1 + \gamma c$, so $S < 1$. In the compute-bound regime, every rejected position is arithmetic taken from other requests, and speculation can only lose throughput — though it may still lower the latency of one request at the expense of the others. Real servers sit between the two regimes, which is why the benefit is measured and $\gamma$ adapted to load.
:::
:::

::: exercise A lossy acceptance rule {level=3}
Replace the acceptance test in `speculative_step` by "accept the draft token if the target gives it probability at least $\varepsilon = 0.1$; otherwise sample the replacement from the target $p$" — a rule in the spirit of typical acceptance. Measure the total variation between the distribution of the first two generated tokens and the exact target distribution, with $200{,}000$ seeded samples and $\gamma = 4$.
::: solution
```python
def lossy_step(prefix, gamma, rng, eps=0.1):
    """A lossy rule: accept a draft token whenever the target gives it probability >= eps."""
    out, prev = [], prefix[-1]
    for _ in range(gamma):
        x = sample(q_draft(prev), rng)
        if p_target(prev)[x] >= eps: out.append(x); prev = x
        else: out.append(sample(p_target(prev), rng)); return out
    out.append(sample(p_target(prev), rng)); return out
exact = {}
for a in range(V):
    for b in range(V):
        exact[(a, b)] = p_target(V)[a] * p_target(a)[b]
rng = random.Random(0); N = 200000; counts = {}; iters = 0
for _ in range(N):
    seq = [V]
    while len(seq) < 3: seq += lossy_step(seq, 4, rng); iters += 1
    k = tuple(seq[1:3]); counts[k] = counts.get(k, 0) + 1
print(f"lossy acceptance: TV over pairs {0.5 * sum(abs(counts.get(k, 0) / N - v) for k, v in exact.items()):.4f}")
```

Run after the definitions of the chapter's listing, it prints

```
lossy acceptance: TV over pairs 0.1921
```

against about $0.01$ (sampling noise) for the exact rule. The relaxed rule accepts every plausible draft token, so the output inherits the draft's preferences among plausible tokens: it is faster (more acceptances) but samples a different distribution, closer to the draft's. Whether that matters depends on the application — it may be acceptable for chat, and it is not for evaluation, where results would no longer describe the target model.
:::
:::

::: exercise Candidates from independent draws {level=3 check="0.936"}
A greedy target's next token has draft probability $0.6$. If the verifier checks $3$ candidates drawn *independently* (with replacement) from the draft, what is the probability that at least one equals the target's token? Why do practical tree methods use distinct candidates instead?
::: solution
$1 - (1 - 0.6)^3 = 1 - 0.064 = 0.936$. Independent draws often repeat the same token (here the likeliest one), wasting verification slots on duplicates; drawing distinct candidates, or taking the draft's top tokens ([[#ex-tree]]), covers more of the draft's mass with the same number of slots. For sampling (not greedy) targets, preserving the distribution with several candidates requires a multi-candidate acceptance rule, such as SpecInfer's, rather than accepting whichever candidate matches.
:::
:::
