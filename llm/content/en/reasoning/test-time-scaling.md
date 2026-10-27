For most of the history of language models, the way to get better answers was to train a bigger model on more data, and the scaling laws of [[scaling]] described how loss falls as training compute grows. The methods of this course add a second dial. Sampling more solutions, voting, searching and thinking longer all spend more computation **at inference**, per question, and accuracy keeps rising as they do. That raises quantitative questions with real money attached. How fast does accuracy grow with test-time compute? When is it better to spend a fixed budget on a larger model, and when on more samples from a smaller one? How should a budget be split between easy and hard questions, and between parallel samples and longer chains? And how much does a reasoning model's thinking cost to serve?

This chapter answers these questions with the published evidence and the mathematics behind it. It sets up the compute accounting, studies **coverage** — the probability that at least one of $k$ samples is correct — and proves that a benchmark mixing easy and hard problems produces power-law coverage curves even though each problem's curve is exponential. It derives the optimal allocation of samples across problems, presents the compute-optimal analysis of Snell et al. (2024) and the repeated-sampling results of Brown et al. (2024), covers sequential scaling and **budget forcing** (s1; Muennighoff et al., 2025), and ends with the cost arithmetic of reasoning models and the limits of test-time scaling. Speculative decoding and other serving optimisations that reduce the cost per token are in [[inference]]; here the question is how many tokens to spend.

## Compute accounting {#sec-accounting}

The basic unit is the floating-point operation. A dense model with $N$ parameters costs about $6N$ FLOPs per token to train (forward and backward pass) and $2N$ FLOPs per token to run forward ([[scaling]]); attention adds a term that grows with context length, which matters for very long chains of thought and is ignored below.

::: proposition Matching test-time compute to model size {#prop-flops-match}
Let a model of $N$ parameters be pretrained on $D_{\text{pre}}$ tokens and used to generate $D_{\text{inf}}$ tokens in total over its deployment, and let $R = D_{\text{inf}}/D_{\text{pre}}$. A model $M$ times larger, trained on the same data and generating the same tokens, costs the same total compute as the smaller model generating $k$ times as many inference tokens when

$$
k = \frac{M(3 + R) - 3}{R}.
$$ {#eq-flops-match}

For $R\to\infty$ (inference-dominated use) $k\to M$; for $R\to0$ (little inference) $k\to\infty$.
:::

::: proof
The total compute of the small model with $k$-fold inference is $6ND_{\text{pre}} + 2NkD_{\text{inf}}$; that of the large model is $6MND_{\text{pre}} + 2MND_{\text{inf}}$. Setting them equal and dividing by $2ND_{\text{pre}}$ gives $3 + kR = M(3 + R)$, which is [[#eq-flops-match]]. The limits follow by inspection.
:::

Snell et al. (2024) used exactly this accounting to compare "more test-time compute" with "a bigger model" at equal total FLOPs. The ratio $R$ matters: if a model will serve far more tokens than it was trained on, every extra inference token is multiplied across the deployment, and a bigger model is relatively cheaper; if it will be used little, spending at inference time is the cheaper way to buy accuracy.

::: example How many samples is a bigger model worth? {#ex-match}
A model is $14$ times larger than another. For $R = 1$ and for $R = 100$, how many times more inference tokens can the smaller model generate at the same total compute?
::: solution
$R = 1$: $k = (14\cdot4 - 3)/1 = 53$. $R = 100$: $k = (14\cdot103 - 3)/100 = 14.39$. When inference is a small share of total compute, the small model can afford about $53$ times as many tokens as the large one — for example $53$ samples per question instead of one. When inference dominates, the budgets are nearly proportional to model size.
:::
:::

## Coverage and repeated sampling {#sec-coverage}

Recall pass@$k$ from [[reasoning/self-consistency#def-passk]]: for a problem with single-sample success probability $p$, the probability that at least one of $k$ independent samples is correct is $1 - (1-p)^k$. Brown et al. (2024) call its benchmark average **coverage** and asked how far it keeps growing.

Their answer, in *Large Language Monkeys*, was: very far. Across mathematics word problems, competition programming, formal proofs and real-world software-engineering tasks, and across several open model families, coverage rose steadily as the number of samples grew over four orders of magnitude, often roughly **linearly in $\log k$**. On SWE-bench Lite, a benchmark of GitHub issues, an open code model's success rose from $15.9\%$ with one sample to $56\%$ with $250$, above the $43\%$ single-attempt state of the art at the time; and in their cost comparison, five samples from a cheaper open model solved more issues than one sample from more expensive frontier models of the time. They modelled coverage as an **exponentiated power law**,

$$
c(k)\approx\exp\big(a\,k^{b}\big),\qquad a < 0,\ b < 0,
$$ {#eq-epl}

an empirical fit with two parameters per model and task.

Why should coverage grow so slowly and so regularly, when each problem's own curve $1 - (1-p)^k$ approaches $1$ exponentially fast? Because a benchmark mixes problems of very different difficulty, and the hardest problems — those with tiny $p$ — dominate at large $k$.

::: theorem Coverage under a Beta distribution of difficulty {#thm-beta-coverage}
Let a benchmark's single-sample success probabilities $p$ follow a $\mathrm{Beta}(\alpha, \beta)$ distribution. Then the expected fraction of problems not solved by $k$ samples is

$$
1 - c(k) = \E\big[(1-p)^k\big] = \frac{B(\alpha, \beta + k)}{B(\alpha, \beta)} = \frac{\Gamma(\alpha+\beta)\,\Gamma(\beta+k)}{\Gamma(\beta)\,\Gamma(\alpha+\beta+k)},
$$ {#eq-beta-cov}

and as $k\to\infty$,

$$
1 - c(k)\sim\frac{\Gamma(\alpha+\beta)}{\Gamma(\beta)}\,k^{-\alpha}.
$$ {#eq-power-tail}

So the unsolved fraction decays as a **power law** in $k$, with exponent equal to the shape parameter $\alpha$ that governs how much probability lies near $p = 0$.
:::

::: proof
With density $p^{\alpha-1}(1-p)^{\beta-1}/B(\alpha,\beta)$,

$$
\E\big[(1-p)^k\big] = \frac1{B(\alpha,\beta)}\int_0^1p^{\alpha-1}(1-p)^{\beta+k-1}\,dp = \frac{B(\alpha,\beta+k)}{B(\alpha,\beta)},
$$

by the definition of the Beta function, and $B(u,v) = \Gamma(u)\Gamma(v)/\Gamma(u+v)$ gives the Gamma form (the factors $\Gamma(\alpha)$ cancel). For the asymptotics, the standard consequence of Stirling's formula $\Gamma(z + s)/\Gamma(z + t)\sim z^{s-t}$ as $z\to\infty$, applied with $z = k$, $s = \beta$, $t = \alpha + \beta$, gives $\Gamma(\beta+k)/\Gamma(\alpha+\beta+k)\sim k^{-\alpha}$.
:::

Taking logarithms of [[#eq-power-tail]], $\log(1 - c)\approx\text{const} - \alpha\log k$: a straight line on log–log axes. Schaeffer et al. (2025) made this argument in detail for the Large Language Monkeys data: per-problem success rates fall exponentially in $k$, and the aggregate power law arises from a heavy left tail of the distribution of single-attempt success rates. A practical corollary is that the power-law exponent can be estimated from a moderate number of samples per problem, without running $10{,}000$ samples on every problem.

::: example Extrapolating coverage {#ex-extrapolate}
On a benchmark, $40\%$ of problems are unsolved with $10$ samples and $20\%$ with $100$. Assuming a power-law tail, what coverage do you predict at $1000$ samples, and what does that require of the problems?
::: solution
A power law $1 - c = Ck^{-\alpha}$ halves the unsolved fraction every time $k$ grows tenfold if $10^{-\alpha} = 1/2$, so $\alpha = \log_{10}2 = 0.301$. At $k = 1000$ the unsolved fraction is $0.1$, coverage $0.9$. The extrapolation assumes that the distribution of per-problem success rates continues smoothly towards $0$; if some problems are truly unsolvable by the model ($p = 0$ exactly), coverage instead plateaus at the fraction of solvable problems.
:::
:::

::: widget plot
f: exp(a*(10^x)^b); 1 - (1 - exp(a))^(10^x)
x: 0, 4
y: 0, 1
sliders: a=-1.6:-3:-0.2:0.05; b=-0.33:-0.8:-0.05:0.01
labels: exponentiated power law $\exp(ak^b)$; every problem equally hard, $1-(1-p)^k$
caption: Coverage against $\log_{10}k$, the number of samples from $1$ to $10{,}000$. The first curve is the empirical form [[#eq-epl]] fitted by Brown et al. (2024); it rises slowly and almost linearly in $\log k$ over orders of magnitude. The second is what coverage would be if every problem had the same single-sample success rate $p = e^a$: it jumps to $1$ within about one order of magnitude. The difference is the spread of difficulty across problems ([[#thm-beta-coverage]]). Make $b$ closer to $0$ to see coverage flatten.
:::

### Coverage is not accuracy {#sec-verification}

Coverage assumes that a correct sample, once generated, is recognised. Brown et al. found that with automatic checkers (unit tests, proof checkers) the gains of repeated sampling were realised, but on GSM8K and MATH, where answers must be *selected*, majority voting and reward-model selection improved only up to a few hundred samples and then plateaued far below coverage. This is [[reasoning/self-consistency#prop-bon]] at scale: selection is bounded by coverage, and the gap between them is the value of a better verifier. Test-time scaling by sampling is therefore most powerful exactly where reinforcement learning with verifiable rewards is ([[reasoning/verifiable-rewards]]): where answers can be checked.

## Allocating compute across problems {#sec-allocation}

A fixed budget of samples, spent uniformly, wastes effort on problems that are already solved after a few attempts and on problems that will not be solved at any budget. If the success probability of each problem were known, the optimal allocation would follow from a simple property.

::: theorem Greedy allocation is optimal {#thm-greedy-alloc}
Let problems $i = 1,\dots,m$ have success probabilities $p_i$, and let a budget of $B$ samples be split as $n_1 + \dots + n_m = B$, with a perfect verifier. The expected number of problems solved, $S(n) = \sum_i\big(1 - (1-p_i)^{n_i}\big)$, is maximised by the greedy rule: assign samples one at a time, each to the problem whose **marginal gain** $g_i(n_i) = p_i(1-p_i)^{n_i}$ is currently largest.
:::

::: proof
Problem $i$'s contribution after $n_i$ samples is the sum of its first $n_i$ marginal gains, $1 - (1-p_i)^{n_i} = \sum_{j=0}^{n_i-1}p_i(1-p_i)^j$, and these gains are non-increasing in $j$. Any allocation therefore selects, from each problem's non-increasing list of gains, an initial segment, $B$ gains in total, and $S$ is the sum of the selected gains. The sum of any $B$ gains is at most the sum of the $B$ largest gains overall. Because each list is non-increasing, the $B$ largest gains (with ties broken consistently) form an initial segment of every list, so they are achievable by an allocation; the greedy rule selects exactly them. Hence greedy is optimal.
:::

The marginal gain $p(1-p)^n$ has a revealing shape. For the first sample, it is $p$ — so easy problems are sampled first. But it decays fastest for easy problems, so after a few samples the budget moves to problems of intermediate difficulty, and problems with tiny $p$ may get nothing at all: a sample there is almost always wasted. The listing below shows this with four problems. In practice $p_i$ is unknown and must be *predicted* — from a verifier's scores on a few initial samples, from the agreement of votes, or from a model of difficulty — and the predictions are imperfect; adaptive methods that stop sampling once votes agree (Aggarwal et al., 2023) are a practical version.

::: example Splitting forty samples {#ex-alloc}
Four problems have $p = 0.5, 0.2, 0.05, 0.01$, and the budget is $40$ samples with a perfect checker. Compare the uniform allocation $(10, 10, 10, 10)$ with the greedy one.
::: solution
Uniform: $(1 - 0.5^{10}) + (1 - 0.8^{10}) + (1 - 0.95^{10}) + (1 - 0.99^{10}) = 0.999 + 0.893 + 0.401 + 0.096 = 2.389$. Greedy (computed in the listing): $(5, 12, 23, 0)$, giving $0.969 + 0.931 + 0.693 + 0 = 2.593$. Greedy gives the hardest problem *nothing*: its first sample's gain, $0.01$, is smaller than the gain of the $23$rd sample on the $p = 0.05$ problem, $0.05\cdot0.95^{22} = 0.016$. With a larger budget it would eventually be sampled too.
:::
:::

::: widget plot
f: 0.5*0.5^x; 0.2*0.8^x; 0.05*0.95^x; p*(1 - p)^x
x: 0, 40
y: 0, 0.12
sliders: p=0.01:0.005:0.3:0.005
labels: $p = 0.5$; $p = 0.2$; $p = 0.05$; adjustable $p$
caption: Marginal gain $p(1-p)^n$ of the $(n+1)$-th sample for problems of different difficulty. By [[#thm-greedy-alloc]], an optimal allocation draws a horizontal line and gives each problem the samples whose gains lie above it. Easy problems get a few samples, intermediate ones many, and very hard ones none until the budget is large. Move $p$ to see where a problem of a given difficulty enters.
:::

### Snell et al.: compute-optimal test-time scaling {#sec-snell}

Snell et al. (2024) studied these trade-offs systematically on the MATH benchmark with PaLM 2 models. They compared two ways of spending test-time compute — **searching against a PRM** (best-of-$N$, step-level beam search, lookahead search; [[reasoning/search#alg-beam]]) and **revising** a proposal sequentially with a model fine-tuned to correct its previous attempts — and divided questions into five difficulty levels according to the base model's pass@1. Their main findings, as reported:

- The best method depends on difficulty. On easier questions, sequential revisions did better than parallel sampling; on harder questions, a mix of parallel and sequential was best. Beam search beat best-of-$N$ at low budgets and on harder questions, while best-of-$N$ caught up at high budgets on easy ones.
- Choosing the strategy and budget per difficulty level — a **compute-optimal** policy, using difficulty predicted from the verifier rather than the oracle — improved efficiency by more than $4\times$ compared with a best-of-$N$ baseline.
- In a FLOPs-matched comparison using [[#prop-flops-match]], a smaller model with compute-optimal test-time scaling outperformed a model $14$ times larger on questions where the small model already had non-trivial success, when inference was a small part of total compute ($R\ll1$). On the hardest questions, or when $R$ was large, pretraining the larger model was the better use of compute.

The paper's conclusion is a careful one: test-time compute and pretraining compute are not interchangeable in general, but on problems within a model's reach, test-time compute is often the cheaper way to improve. Later analyses of "inference scaling laws" (Wu et al., 2024) reached a compatible conclusion: at a fixed inference budget, a smaller model with a good search strategy can be on the cost–accuracy frontier.

## Sequential scaling: thinking longer {#sec-sequential}

Reasoning models trained with reinforcement learning ([[reasoning/verifiable-rewards]]) spend test-time compute *sequentially*, in one long chain of thought. OpenAI's o1 announcement (September 2024) showed accuracy on a mathematics competition rising roughly linearly with the logarithm of test-time compute; the DeepSeek-R1 report documented response length growing during training as accuracy rose. Sequential compute is naturally adaptive — a model can stop early on easy problems — but it is harder to control, and its latency grows with its length because tokens are generated one after another.

Muennighoff et al. (2025) asked how simple sequential test-time scaling can be. Their **s1** recipe fine-tuned an open $32$-billion-parameter instruction model (Qwen2.5-32B-Instruct) on **s1K**, $1{,}000$ questions selected for difficulty, diversity and quality, with reasoning traces generated by another reasoning model; the fine-tuning took $26$ minutes on $16$ H100 GPUs. They then controlled the length of thinking at test time by **budget forcing**.

::: algorithm Budget forcing (s1) {#alg-budget}
**Input:** a model that thinks between delimiters, a minimum and a maximum number of thinking tokens.
1. Generate thinking tokens.
2. **To cap thinking:** if the maximum is reached, append the end-of-thinking delimiter (and a cue such as "Final Answer:"), and let the model answer.
3. **To extend thinking:** if the model emits the end-of-thinking delimiter before the minimum, suppress it and append "Wait", so that the model continues reasoning; repeat as needed.
4. Extract the answer after the delimiter.
:::

With budget forcing, s1-32B's accuracy on AIME 2024 rose from $50\%$ to $57\%$ when the model was forced to continue thinking, and the authors reported that it exceeded o1-preview on competition mathematics by up to $27\%$. They also observed limits: forcing "Wait" too many times eventually stopped helping, with the model falling into repetitive loops, so sequential scaling flattens. Other ways of controlling the length of thinking include training with length-conditioned rewards (for example Aggarwal and Welleck's L1, 2025) and, in deployed systems, settings for "reasoning effort" or a maximum thinking budget, whose implementations are generally not documented in detail.

::: warning More thinking is not always better
Test-time scaling curves are averages over benchmarks on which longer reasoning helps. On some tasks it hurts: Gema et al. (2025) constructed tasks — simple counting with distracting information, regression with spurious features, deduction with many constraints — on which several reasoning models became *less* accurate as their reasoning budget grew. Overthinking easy problems wastes tokens ([[reasoning/verifiable-rewards#sec-length]]), and long chains accumulate errors and can talk themselves out of correct answers. Measure accuracy as a function of budget on your own task before assuming that more is better.
:::

## The economics of reasoning {#sec-cost}

Every thinking token is an output token. For serving, three costs scale with it.

::: proposition Serving costs of a chain of thought {#prop-serve}
For a request with $n$ prompt tokens and $m$ generated tokens (thinking plus answer) on a model with $N$ parameters, $L$ layers, $n_{\text{kv}}$ key–value heads of dimension $d_k$ and $b$ bytes per stored number:

- generation compute is about $2Nm$ FLOPs, plus attention over a context that grows to $n + m$;
- the key–value cache at the end holds $2Ln_{\text{kv}}d_k b\,(n + m)$ bytes;
- latency is at least $m$ sequential decoding steps; at $v$ tokens per second it is $m/v$ seconds.

With price $c_{\text{out}}$ per output token and accuracy $A$, the **cost per correct answer** is $m\,c_{\text{out}}/A$ (plus input costs).
:::

::: proof
The compute and latency statements are as in [[reasoning/chain-of-thought#prop-cost]]. Each layer stores a key and a value vector for each KV head and each token, $2Ln_{\text{kv}}d_k$ numbers per token, each of $b$ bytes ([[inference]]). If each request succeeds with probability $A$, the expected number of requests per correct answer is $1/A$.
:::

The key–value cache is often the binding constraint: a long chain of thought occupies memory for its whole duration, so fewer requests fit on an accelerator at once, and throughput falls. Parallel sampling multiplies compute and memory by $k$ but not latency; sequential thinking multiplies latency.

::: example A long thought in memory {#ex-kv}
A model has $L = 64$ layers, $n_{\text{kv}} = 8$ key–value heads of dimension $d_k = 128$, and stores the cache in $16$-bit numbers. How much cache does one request use after $32{,}768$ tokens of thinking? How many such requests fit in $80$ GB alongside $40$ GB of weights?
::: solution
Per token: $2\cdot64\cdot8\cdot128\cdot2 = 262{,}144$ bytes $= 256$ KiB. For $32{,}768$ tokens: $2^{18}\cdot2^{15} = 2^{33}$ bytes $= 8$ GiB. With $40$ GB free, about $40\times10^9/8.59\times10^9\approx4$ requests fit. The same accelerator could hold over a hundred requests of $1{,}000$ tokens each; long reasoning reduces the batch size, and with it the throughput, by more than an order of magnitude ([[inference]]).
:::
:::

::: example Cost per correct answer {#ex-cost-correct}
A large model answers a task correctly $80\%$ of the time with one $1{,}500$-token response at $10$ times the per-token price of a small model, which is correct $70\%$ of the time per sample. Compare the cost per correct answer of the large model with majority votes of $1$, $5$ and $9$ samples of the small model (assume binary right/wrong and independent samples).
::: solution
Large model: $1500\cdot10/0.8 = 18{,}750$ units. Small model, one sample: $1500/0.7 = 2{,}143$; vote of $5$: accuracy $P_5(0.7) = 0.837$ ([[reasoning/self-consistency#thm-condorcet]]), cost $7500/0.837 = 8{,}961$; vote of $9$: accuracy $0.901$, cost $13{,}500/0.901 = 14{,}980$. Voting with the small model beats the large model in accuracy *and* cost per correct answer here. Two caveats: real errors are correlated, so voting gains less ([[reasoning/self-consistency#thm-mixture]]); and latency and throughput are not captured by price. The comparison has to be redone with measured accuracies on the actual task.
:::
:::

## A numerical laboratory {#sec-code}

The listing checks [[#thm-beta-coverage]] on a simulated benchmark of $5000$ problems with $\mathrm{Beta}(0.3, 3)$ difficulties, fits the slope of $\log(1 - c)$ against $\log k$, computes the greedy allocation of [[#ex-alloc]], and the cost table of [[#ex-cost-correct]].

```python
import math, random
rng = random.Random(7)

# 1. Coverage of repeated sampling when per-problem success rates p ~ Beta(a, b)
a, b = 0.3, 3.0
def coverage_exact(k):                         # 1 - E(1-p)^k = 1 - B(a, b+k) / B(a, b)
    return 1 - math.exp(math.lgamma(a + b) + math.lgamma(b + k) - math.lgamma(b) - math.lgamma(a + b + k))
ps = [rng.betavariate(a, b) for _ in range(5000)]   # a simulated benchmark of 5000 problems
print("     k   coverage (exact)   simulated   power-law tail 1 - C k^-a")
C = math.exp(math.lgamma(a + b) - math.lgamma(b))
for k in [1, 10, 100, 1000, 10000]:
    sim = sum(1 - (1 - p)**k for p in ps) / len(ps)
    print(f"{k:6d}   {coverage_exact(k):16.4f}   {sim:9.4f}   {1 - C * k**-a:12.4f}")

# least-squares fit of log(1 - coverage) against log k on k = 10..10000
xs = [math.log(k) for k in [10, 30, 100, 300, 1000, 3000, 10000]]
ys = [math.log(1 - coverage_exact(round(math.exp(x)))) for x in xs]
mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
slope = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx)**2 for x in xs)
print(f"fitted slope of log(1 - coverage) vs log k: {slope:.3f}  (theory: -a = {-a})")

# 2. Allocating a budget of samples across problems of different difficulty
probs = [0.5, 0.2, 0.05, 0.01]                # single-sample success rates of four problems
budget = 40
def solved(alloc):                            # expected number solved with a perfect verifier
    return sum(1 - (1 - p)**n for p, n in zip(probs, alloc))
uniform = [budget // len(probs)] * len(probs)
alloc = [0] * len(probs)
for _ in range(budget):                       # greedy: next sample where the marginal gain is largest
    gains = [p * (1 - p)**n for p, n in zip(probs, alloc)]
    alloc[gains.index(max(gains))] += 1
print(f"\nuniform {uniform}: expected solved {solved(uniform):.3f}")
print(f"greedy  {alloc}: expected solved {solved(alloc):.3f}")

# 3. Cost per correct answer: a large model once vs a small model with voting
def majority(p, n):
    return sum(math.comb(n, k) * p**k * (1 - p)**(n - k) for k in range(n // 2 + 1, n + 1))
print("\nsetting                       accuracy  tokens/question  cost per correct (relative)")
big = (0.80, 1 * 1500, 10.0)                  # accuracy, output tokens, price per token (relative)
print(f"large model, 1 sample          {big[0]:.3f}  {big[1]:15d}  {big[1] * big[2] / big[0]:10.0f}")
for n in [1, 5, 9]:
    acc = majority(0.70, n)
    toks = n * 1500
    print(f"small model, vote of {n}        {acc:.3f}  {toks:15d}  {toks * 1.0 / acc:10.0f}")
```

```text
     k   coverage (exact)   simulated   power-law tail 1 - C k^-a
     1             0.0909      0.0908        -0.3417
    10             0.3734      0.3708         0.3275
   100             0.6656      0.6629         0.6630
  1000             0.8312      0.8300         0.8311
 10000             0.9154      0.9134         0.9153
fitted slope of log(1 - coverage) vs log k: -0.292  (theory: -a = -0.3)

uniform [10, 10, 10, 10]: expected solved 2.389
greedy  [5, 12, 23, 0]: expected solved 2.593

setting                       accuracy  tokens/question  cost per correct (relative)
large model, 1 sample          0.800             1500       18750
small model, vote of 1        0.700             1500        2143
small model, vote of 5        0.837             7500        8961
small model, vote of 9        0.901            13500       14980
```

Coverage starts at the mean success rate $0.3/3.3 = 0.091$ and grows by roughly the same amount per tenfold increase in $k$ — the log-linear pattern Brown et al. observed — while the power-law approximation [[#eq-power-tail]], useless at $k = 1$, is accurate from $k = 100$ on, and the fitted slope approaches $-\alpha$. The greedy allocation solves $0.2$ more problems in expectation from the same $40$ samples, and the cost table reproduces [[#ex-cost-correct]].

::: quiz
A team has a fixed inference budget per question and a verifier that is only moderately reliable. Which statements are supported by this chapter? (Select all that apply.)
- [x] Coverage with many samples overstates the accuracy they will get, because selection is bounded by coverage and limited by the verifier.
- [x] Spending more samples on questions of intermediate difficulty, and fewer on very easy or hopeless ones, can increase the number solved.
- [ ] Doubling the thinking budget of a reasoning model always increases accuracy.
- [ ] A model $14$ times larger is always better than $14$ samples from the smaller model at the same compute.
::: solution
Selection is bounded by coverage and saturates with imperfect verifiers ([[#sec-verification]]); greedy allocation favours intermediate difficulty ([[#thm-greedy-alloc]]). Longer thinking can hurt on some tasks, and whether a bigger model beats more samples depends on difficulty and on the ratio $R$ ([[#sec-snell]]).
:::
:::

::: history
Repeated sampling with a filter was central to AlphaCode (Li et al., 2022), which generated up to millions of programs per competition problem and filtered them with example tests. Chen et al. (2021) introduced the unbiased pass@$k$ estimator, and Wang et al. (2022) self-consistency. In 2024 Brown et al. measured coverage up to $10{,}000$ samples (*Large Language Monkeys*), Snell et al. analysed compute-optimal test-time scaling, Wu et al. studied inference scaling laws, and OpenAI's o1 announcement (September 2024) presented accuracy as a function of test-time compute for a reasoning model. In 2025 the DeepSeek-R1 report described the growth of thinking length during reinforcement learning, Muennighoff et al. introduced s1 and budget forcing, Schaeffer et al. explained the power-law form of coverage curves, and Gema et al. documented inverse scaling of accuracy with reasoning length on some tasks.
:::

::: summary
- Inference costs about $2N$ FLOPs per token; a model $M$ times larger matches $k = (M(3+R) - 3)/R$ times as many inference tokens of the smaller one at equal total compute, where $R$ is the ratio of inference to pretraining tokens.
- **Coverage** (pass@$k$ averaged over problems) grows roughly log-linearly in $k$ over orders of magnitude; Brown et al. fitted $\exp(ak^b)$. If difficulties are $\mathrm{Beta}(\alpha,\beta)$, the unsolved fraction is $B(\alpha,\beta+k)/B(\alpha,\beta)\sim\frac{\Gamma(\alpha+\beta)}{\Gamma(\beta)}k^{-\alpha}$: a power law from a mixture of exponentials.
- Selection without an exact checker saturates far below coverage; repeated sampling pays most where answers can be verified.
- With known success rates, **greedy allocation** by marginal gain $p(1-p)^n$ is optimal; it favours intermediate difficulty. Snell et al. found compute-optimal, difficulty-dependent strategies more than $4\times$ as efficient as best-of-$N$, and able to beat a $14\times$ larger model on problems within the small model's reach.
- **Sequential** scaling (longer chains) adapts to the problem but adds latency; **budget forcing** caps thinking with the end-of-thinking delimiter and extends it with "Wait" (s1), with gains that eventually flatten.
- Serving cost scales with thinking tokens in compute, KV-cache memory ($2Ln_{\text{kv}}d_kb$ bytes per token) and latency; compare systems by **cost per correct answer**, and remember that more thinking can hurt.
:::

## Exercises

::: exercise Coverage of one problem {level=1 check="0.6415"}
A problem is solved by one sample with probability $0.05$. What is the probability that at least one of $20$ independent samples solves it? Give four decimal places.
::: solution
$1 - 0.95^{20} = 1 - 0.3585 = 0.6415$.
:::
:::

::: exercise A FLOPs-matched budget {level=1 check="53"}
Using [[#eq-flops-match]], with $M = 14$ and $R = 1$, how many times as many inference tokens can the smaller model generate at the same total compute?
::: solution
$k = (14\cdot(3+1) - 3)/1 = 53$.
:::
:::

::: exercise Cache for a long thought {level=1 check="8"}
With $L = 64$, $n_{\text{kv}} = 8$, $d_k = 128$ and $2$ bytes per number, how many GiB of key–value cache does a sequence of $32{,}768$ tokens occupy?
::: solution
$2\cdot64\cdot8\cdot128\cdot2 = 262{,}144$ bytes per token; times $32{,}768$ gives $8{,}589{,}934{,}592$ bytes $= 8$ GiB.
:::
:::

::: exercise Uniform difficulty {level=2 check="0.99"}
If single-sample success rates are uniformly distributed on $[0,1]$ ($\alpha = \beta = 1$), show from [[#eq-beta-cov]] that coverage is $k/(k+1)$, and evaluate it at $k = 99$.
::: solution
$B(1, 1+k)/B(1,1) = \Gamma(2)\Gamma(1+k)/(\Gamma(1)\Gamma(2+k)) = k!/(k+1)! = 1/(k+1)$, so $c(k) = 1 - 1/(k+1) = k/(k+1)$, and $c(99) = 0.99$. The exponent of the power law is $\alpha = 1$: the unsolved fraction falls tenfold for every tenfold increase in $k$.
:::
:::

::: exercise Extrapolating a power law {level=2 check="0.9"}
Unsolved fractions are $0.4$ at $k = 10$ and $0.2$ at $k = 100$. Assuming $1 - c = Ck^{-\alpha}$, predict coverage at $k = 1000$.
::: solution
$10^{-\alpha} = 0.2/0.4$, so $\alpha = \log_{10}2$, and the unsolved fraction at $k = 1000$ is $0.2/2 = 0.1$: coverage $0.9$.
:::
:::

::: exercise Two problems, three samples {level=2 check="0.875"}
Two problems have $p = 0.5$ and $p = 0.1$. Using [[#thm-greedy-alloc]], allocate $3$ samples and give the expected number of problems solved.
::: solution
Marginal gains: first problem $0.5, 0.25, 0.125, \dots$; second $0.1, 0.09, 0.081, \dots$. The three largest are $0.5$, $0.25$ and $0.125$, all from the first problem, so the allocation is $(3, 0)$ with expected number solved $0.5 + 0.25 + 0.125 = 0.875$. (The allocation $(2, 1)$ gives $0.75 + 0.1 = 0.85$.)
:::
:::

::: exercise Fitting an exponentiated power law {level=2 check="0.924"}
Coverage is $0.2$ at $k = 1$ and $0.7$ at $k = 100$. Fit $c(k) = \exp(ak^b)$ through these two points and predict coverage at $k = 10{,}000$ to three decimal places.
::: solution
At $k = 1$: $a = \ln0.2 = -1.6094$. At $k = 100$: $\ln0.7 = -0.35667 = a\cdot100^b$, so $100^b = 0.22162$ and $b = \ln0.22162/\ln100 = -0.3272$. At $k = 10^4$: $10^{4b} = (100^b)^2 = 0.049115$, and $c = \exp(-1.6094\cdot0.049115) = \exp(-0.07905) = 0.924$.
:::
:::

::: exercise Parallel or sequential? {level=2}
A reasoning model reaches $60\%$ accuracy with a $4{,}000$-token budget and $66\%$ with $16{,}000$ tokens. Alternatively, majority voting over four $4{,}000$-token samples is possible. For an application with a strict latency limit of $10$ seconds at $1{,}000$ tokens per second, and one that only cares about throughput, which would you choose, and what would you measure first?
::: solution
With a $10$-second limit at $1{,}000$ tokens per second, a $16{,}000$-token chain takes $16$ seconds and is ruled out; four parallel $4{,}000$-token samples take about $4$ seconds of wall-clock time (on enough hardware), so voting is the only option that uses more compute within the limit. For throughput-only use, the two options cost the same number of tokens, but long chains hold more KV-cache memory per request at a time ([[#prop-serve]]) while parallel samples share the prompt's cache. What to measure first: the accuracy of a four-sample vote on this task (with correlated errors it may be well below what independence predicts, [[reasoning/self-consistency#thm-mixture]]), and accuracy as a function of budget for the long chain, which may flatten or even fall ([[#sec-sequential]]).
:::
:::

::: exercise Adaptive voting {level=3}
Write a plain-Python simulation of **adaptive consistency**: draw samples one at a time and stop when the leading answer is ahead of the runner-up by $3$ votes (or after $40$ samples). Wrong answers are spread uniformly over $5$ values. Compare its accuracy and mean number of samples with a fixed vote of $15$ for single-sample accuracies $0.9$, $0.6$ and $0.35$, and explain the pattern.
::: solution
```python
import random
rng = random.Random(8)

def sample_answer(p_correct):
    """One sampled answer: 0 is correct; wrong answers are spread over 1..5."""
    return 0 if rng.random() < p_correct else rng.randint(1, 5)

def adaptive_vote(p_correct, lead=3, max_n=40):
    counts = {}
    for n in range(1, max_n + 1):
        a = sample_answer(p_correct)
        counts[a] = counts.get(a, 0) + 1
        top = sorted(counts.values(), reverse=True) + [0]
        if top[0] - top[1] >= lead:
            break
    return max(counts, key=counts.get) == 0, n

def fixed_vote(p_correct, n):
    counts = {}
    for _ in range(n):
        a = sample_answer(p_correct)
        counts[a] = counts.get(a, 0) + 1
    best = max(counts.values())
    return rng.choice([a for a, c in counts.items() if c == best]) == 0, n

for p in [0.9, 0.6, 0.35]:
    for name, f in [("fixed n = 15  ", lambda: fixed_vote(p, 15)), ("stop at lead 3", lambda: adaptive_vote(p))]:
        res = [f() for _ in range(20000)]
        acc = sum(r[0] for r in res) / len(res); n = sum(r[1] for r in res) / len(res)
        print(f"p = {p:.2f}  {name}  accuracy {acc:.3f}  mean samples {n:5.1f}")
```

```text
p = 0.90  fixed n = 15    accuracy 1.000  mean samples  15.0
p = 0.90  stop at lead 3  accuracy 1.000  mean samples   3.7
p = 0.60  fixed n = 15    accuracy 0.991  mean samples  15.0
p = 0.60  stop at lead 3  accuracy 0.993  mean samples   7.3
p = 0.35  fixed n = 15    accuracy 0.731  mean samples  15.0
p = 0.35  stop at lead 3  accuracy 0.876  mean samples  17.5
```

On easy questions the adaptive rule stops after about four samples with no loss of accuracy; on medium ones it halves the cost; on hard ones it automatically spends *more* than $15$ samples and gains accuracy. It is a data-driven version of [[#thm-greedy-alloc]]: the agreement of the votes serves as the estimate of difficulty, which needs no knowledge of $p$ — but, as [[reasoning/self-consistency#sec-correlated]] warns, it would stop early and confidently on a question with a systematic wrong answer.
:::
:::
