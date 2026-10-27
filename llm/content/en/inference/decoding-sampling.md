[[sequence-models/decoding-basics]] introduced the decoding rules every language model uses: greedy decoding, beam search, temperature, top-$k$ and nucleus (top-$p$) sampling. This chapter takes them for granted and looks at decoding as it happens inside a serving system. A request arrives as a prompt; the system runs the network once over the whole prompt, then once per generated token; between the network and the sampled token sits a chain of small transformations of the logits — biases, penalties, temperature, truncation — whose order matters; and the result is expected to be reproducible, which on parallel hardware it often is not.

We cover the two phases of generation (**prefill** and **decode**) and why they cost so differently, the **logits-processing pipeline** with its penalties and biases, several **truncation rules** proposed after nucleus sampling (min-$p$, $\eta$- and typical sampling), **contrastive decoding**, what sampling does to the **calibration** of a model's probabilities, and finally **determinism**: why "temperature $0$" does not guarantee the same output twice, and what it takes to make it so.

## Two phases: prefill and decode {#sec-phases}

An autoregressive model computes $p_\theta(x_t\mid x_{<t})$. Given a prompt $x_1,\dots,x_P$, the first new token needs the network's output at position $P$, which depends on the keys and values of all $P$ prompt positions in every layer. Those are computed in one pass over the whole prompt, in parallel across positions, exactly as in training. After that, each new token needs only one more position: its own query, key and value, and the stored keys and values of everything before it ([[inference/kv-cache]]).

::: definition Prefill and decode {#def-phases}
Generation from a prompt of $P$ tokens has two phases.

- **Prefill**: one forward pass over the $P$ prompt tokens, in parallel, which stores the keys and values of every layer and produces the distribution of the first new token.
- **Decode**: a loop. Each iteration feeds the most recently generated token as a single new position, appends its keys and values to the cache, produces the next distribution, and selects a token from it. The loop stops at an end-of-sequence token, a stop sequence or a length limit.

The **time to first token** (TTFT) is dominated by prefill; the **time per output token** (TPOT) is the duration of one decode iteration.
:::

The two phases do the same arithmetic per token but have opposite bottlenecks.

::: proposition The cost of the two phases {#prop-phases}
Consider a dense decoder with $N$ parameters (excluding embeddings), $L$ layers of width $d$, stored in $b$ bytes per parameter. Ignoring lower-order terms,

1. prefill of $P$ tokens costs about $2NP + 2LdP^2$ FLOPs and reads the weights once, $Nb$ bytes;
2. one decode step at context length $t$ costs about $2N + 4Ldt$ FLOPs and reads the weights *and* the whole cache, $Nb$ bytes plus the cache.

So prefill performs about $2P/b$ FLOPs per byte of weights read, and a decode step about $2/b$: one FLOP per byte in 16-bit precision.
:::

::: proof
Each weight takes part in one multiply and one add per token that passes through it, $2N$ FLOPs per token, and $2NP$ for $P$ tokens. Attention adds, per layer and per query, $2td$ FLOPs for the scores against $t$ keys and $2td$ for the weighted sum of the values, $4td$ in total ([[transformers/attention-complexity#sec-flops]]). In prefill, query $i$ sees $i$ keys under the causal mask; summing $4di$ over $i = 1,\dots,P$ gives about $2dP^2$ per layer. In a decode step there is one query against $t$ keys, $4dt$ per layer. In prefill the weights are loaded once and used for all $P$ tokens (they are multiplied against a $(P, d)$ matrix of activations); in decode they are loaded to process a single token. Dividing FLOPs by bytes of weights gives the two ratios.
:::

A ratio of one FLOP per byte is far below the ridge point of any current accelerator — the ratio of peak arithmetic to memory bandwidth, $150$–$300$ FLOPs per byte for recent GPUs ([[transformers/attention-complexity#def-roofline]]). A single decode stream is therefore limited by memory bandwidth, and the arithmetic units sit almost idle. That one fact drives most of this course: batching ([[inference/batching-serving]]) shares each weight read among many streams, quantisation ([[inference/quantisation]]) reads fewer bytes, and speculative decoding ([[inference/speculative-decoding]]) checks several tokens per weight read.

::: example Prefill and decode of an 8-billion-parameter model {#ex-phases}
A dense model with $N = 8\times10^9$ parameters in bfloat16 runs on one accelerator with a published peak of $989$ TFLOP/s for dense 16-bit arithmetic and $3.35$ TB/s of memory bandwidth (an H100 SXM, as published by its vendor). Estimate the prefill time of a $2000$-token prompt at $50\%$ of peak arithmetic, and a lower bound on the time per output token for a single request, ignoring attention.
::: solution
Prefill: $2NP = 2\cdot8\times10^9\cdot2000 = 3.2\times10^{13}$ FLOPs; at $0.5\cdot989\times10^{12}$ FLOP/s this takes $0.065$ s. Decode: each step must read all $Nb = 1.6\times10^{10}$ bytes of weights; at $3.35\times10^{12}$ B/s that takes at least $4.8$ ms, so a single stream cannot exceed about $209$ tokens per second. The arithmetic of a decode step, $1.6\times10^{10}$ FLOPs, would take only $16$ µs at full peak: the step is about $300$ times longer than its arithmetic requires. Generating $500$ tokens costs about $2.4$ s of decode against $0.065$ s of prefill, although the prompt has four times as many tokens.
:::
:::

Several practical details of the decode loop matter to users even though they do not change the mathematics.

- **Stopping.** Besides the end-of-sequence token and a maximum length, interfaces accept **stop sequences**: strings at which generation ends. A stop string may span several tokens or end in the middle of one, so it must be matched on the detokenised text, not on token ids.
- **Streaming detokenisation.** Byte-level tokenisers ([[text-and-language]]) can split a multi-byte UTF-8 character across tokens, and some tokenisers attach spaces to the following token. A streaming server therefore holds back text until it forms complete characters, and decodes a sliding window of recent tokens rather than each token alone.
- **Several samples per prompt.** When $n$ samples of the same prompt are wanted (for self-consistency, [[reasoning/self-consistency]], or for a choice of replies), the prompt is prefilled once and its cache shared among the $n$ decode streams.

## The logits-processing pipeline {#sec-pipeline}

Between the network's output $\mathbf{z}\in\mathbb{R}^{\lvert\mathcal{V}\rvert}$ and the chosen token, a serving system applies a sequence of **logits processors**, each a function of the logits and the tokens generated so far.

::: definition Logits processor and sampling pipeline {#def-pipeline}
A **logits processor** is a map $\mathbf{z}\mapsto f(\mathbf{z}, x_{<t})$ that returns modified logits, where entries may be set to $-\infty$ to forbid a token. A **sampling pipeline** applies, in a fixed order,

1. processors that change scores: logit bias, repetition, frequency and presence penalties, grammar masks;
2. temperature: $\mathbf{z}\mapsto\mathbf{z}/\tau$;
3. truncation: top-$k$, top-$p$, min-$p$ and the like, which set the logits of excluded tokens to $-\infty$;

and then draws $x_t$ from $\operatorname{softmax}$ of the result (or takes its argmax when $\tau\to0$).
:::

Order matters because the steps do not commute. Temperature applied before top-$p$ changes which tokens are in the nucleus; applied after, it only reshapes the tokens already chosen. A penalty applied after truncation cannot bring back a token that truncation removed. Implementations differ in their default orders, which is one reason why the same nominal settings give different outputs on different systems.

### Logit bias and penalties {#sec-penalties}

::: definition Logit bias, frequency and presence penalties {#def-penalties}
Let $c_v$ be the number of times token $v$ occurs in the generated text so far (some implementations count the prompt as well).

- A **logit bias** adds a fixed vector: $z_v\mapsto z_v + b_v$. A bias of $-\infty$ bans a token; a large positive bias nearly forces it.
- A **frequency penalty** $\alpha_f$ and a **presence penalty** $\alpha_p$ subtract
$$
z_v\mapsto z_v - \alpha_f\,c_v - \alpha_p\,\mathbb{1}[c_v > 0].
$$ {#eq-penalty}
- The **repetition penalty** of Keskar et al. (2019) instead divides positive logits of seen tokens by $\theta > 1$ and multiplies negative ones by $\theta$ ([[sequence-models/decoding-basics#sec-degeneration]]).
:::

The additive forms have a clean meaning in probability space.

::: proposition Additive penalties reweight probabilities {#prop-reweight}
Applying a bias $\mathbf{b}$ to the logits and then the softmax at temperature $1$ gives

$$
q(v) = \frac{p(v)\,e^{b_v}}{\sum_u p(u)\,e^{b_u}},
$$

where $p = \operatorname{softmax}(\mathbf{z})$. In particular the frequency and presence penalties multiply the probability of a token seen $c$ times by $e^{-\alpha_fc - \alpha_p}$ before renormalising, and the result does not depend on adding a constant to every logit. The multiplicative repetition penalty has neither property.
:::

::: proof
$q(v) = e^{z_v + b_v}/\sum_ue^{z_u + b_u}$. Divide numerator and denominator by $\sum_ue^{z_u}$: the numerator becomes $p(v)e^{b_v}$ and the denominator $\sum_up(u)e^{b_u}$. Adding a constant $c$ to every $z_v$ leaves $p$, and hence $q$, unchanged. For the multiplicative penalty, a seen token with logit $z > 0$ becomes $z/\theta$, a change of $-z(1 - 1/\theta)$ that depends on $z$ itself; shifting all logits by a constant changes $z$, hence the change, hence $q$.
:::

So a frequency penalty of $\alpha_f = 0.5$ cuts the odds of a token that has appeared three times by $e^{-1.5}\approx0.22$ relative to an unseen token — whatever that token is. That is crude: it penalises the repetition of "the", of a variable name in code and of the subject of an essay alike. Penalties are heuristics tuned by eye; for chat models trained with post-training ([[post-training]]) that already rarely loop, they are often left at zero.

::: example Penalties and a ban by hand {#ex-penalties}
Eight tokens "the", "a", "his", "Paris", "London", "it", "banana", "zebra" have logits $(2.0, 1.6, 0.9, 0.7, 0.3, 0.0, -1.5, -3.0)$, so $p = (0.380, 0.255, 0.127, 0.104, 0.069, 0.051, 0.011, 0.003)$. (a) "the" has been generated three times and "a" once; apply $\alpha_f = 0.5$, $\alpha_p = 0.4$. (b) Instead apply a logit bias of $+5$ to "banana" and $-\infty$ to "zebra".
::: solution
(a) "the" loses $0.5\cdot3 + 0.4 = 1.9$, to $0.1$; "a" loses $0.5 + 0.4 = 0.9$, to $0.7$. The new logits $(0.1, 0.7, 0.9, 0.7, 0.3, 0.0, -1.5, -3.0)$ give $(0.108, 0.197, 0.241, 0.197, 0.132, 0.098, 0.022, 0.005)$: "his" is now the most likely token and "the" has fallen from first to fourth. (b) "banana" gets logit $3.5$, "zebra" $-\infty$: $(0.141, 0.095, 0.047, 0.039, 0.026, 0.019, 0.633, 0)$. A bias of $+5$ multiplies the odds of "banana" against any other token by $e^5\approx148$, turning a $1\%$ token into a $63\%$ one. Biases are used to ban tokens (for instance, special tokens that must never appear in user-visible text), to restrict a classifier's answer to a few label tokens, and for constrained decoding ([[prompting-rag/structured-output]]).
:::
:::

::: widget plot
f: exp(2-a*x)/(exp(2-a*x)+12.049)
x: 0, 10
y: 0, 0.5
sliders: a=0.5:0:2:0.05
labels: probability of "the" after $c$ occurrences
caption: The probability of the top token of [[#ex-penalties]] against its count $c$ under a frequency penalty $\alpha_f$ (slider; the other seven logits fixed, their exponentials summing to $12.05$). At $\alpha_f = 0$ it stays at $0.38$; with $\alpha_f = 0.5$ it falls below $0.1$ after three occurrences. A presence penalty would add a single drop at $c = 1$.
:::

### Truncation rules after nucleus sampling {#sec-truncation}

Nucleus sampling keeps the smallest head of the distribution with mass at least $p$ ([[sequence-models/decoding-basics#def-top-p]]). Its weakness is that the cut is defined by *cumulative* mass: when the distribution is flat, a nucleus of $0.9$ can include thousands of tokens of individually tiny probability. Several proposals cut by the probability of each token instead. They are variants, published with evaluations on particular models and tasks, not established improvements; we define them precisely because they are widely implemented.

::: definition Min-p, epsilon, eta and typical sampling {#def-truncation}
Let $p$ be the next-token distribution and $H(p) = -\sum_vp(v)\ln p(v)$ its entropy. Each rule keeps a set $S$ and samples from $p$ restricted to $S$ and renormalised.

- **$\varepsilon$-sampling** (Hewitt, Manning and Liang, 2022): $S = \{v : p(v) > \varepsilon\}$.
- **$\eta$-sampling** (same paper): $S = \{v : p(v) > \eta\}$ with the entropy-dependent threshold $\eta = \min\big(\varepsilon,\ \sqrt{\varepsilon}\,e^{-H(p)}\big)$.
- **Min-$p$ sampling** (Nguyen et al., 2024): $S = \{v : p(v)\ge p_{\text{base}}\cdot\max_up(u)\}$, a threshold proportional to the top probability.
- **Locally typical sampling** (Meister, Pimentel, Wiher and Cotterell, 2023): sort tokens by $\lvert-\ln p(v) - H(p)\rvert$, the distance of their surprisal from the expected surprisal, and keep the shortest prefix of that order with mass at least $\tau_{\text{typ}}$.
:::

Each rule embodies a hypothesis. Hewitt et al. view a trained model as a smoothed version of the true distribution: smoothing spreads a little mass over every token, so tokens below some absolute probability are probably noise, and the threshold should relax when the distribution is genuinely flat (high entropy), hence $\eta$. Min-$p$ scales the threshold with the model's confidence: when the top token has $0.9$, a token at $0.05$ is dubious; when the top token has $0.1$, it is a real alternative. Typical sampling, motivated by the information-theoretic idea that human text keeps its information rate close to the expected one, can *exclude the most probable token* when that token is much less surprising than average.

::: example Four truncation rules on one distribution {#ex-truncation}
For the distribution of [[#ex-penalties]] ($H = 1.617$ nats), find the kept set for min-$p$ with $p_{\text{base}} = 0.2$, $\eta$-sampling with $\varepsilon = 0.02$, typical sampling with $\tau_{\text{typ}} = 0.9$, and top-$p$ with $p = 0.9$.
::: solution
Min-$p$: threshold $0.2\cdot0.380 = 0.076$; kept "the", "a", "his", "Paris" (4 tokens, mass $0.865$). $\eta$: $\sqrt{0.02}\,e^{-1.617} = 0.1414\cdot0.1985 = 0.028$, so $\eta = \min(0.02, 0.028) = 0.02$; kept the six tokens above $0.02$ (mass $0.986$). Typical: the surprisals $-\ln p$ are $0.97, 1.37, 2.07, 2.27, 2.67, 2.97, 4.47, 5.97$; distances from $1.617$ are $0.65, 0.25, 0.45, 0.65, 1.05, 1.35, 2.85, 4.35$. In order of distance: "a" ($0.255$), "his" ($0.382$), then "the" and "Paris", nearly tied at $0.65$ ($0.866$ with both), then "London" ($0.935\ge0.9$): five tokens. Top-$p$: cumulative $0.380, 0.635, 0.762, 0.866, 0.935$: also five tokens. On this moderately flat distribution the rules differ by one or two tokens; their differences show on very peaked or very flat distributions ([[#exr-minp]]).
:::
:::

Every truncation rule changes the distribution being sampled, by an amount that has a simple form.

::: proposition The divergence of truncation {#prop-trunc-kl}
If $q$ is $p$ restricted to a set $S$ and renormalised, with kept mass $Z = \sum_{v\in S}p(v)$, then

$$
\operatorname{KL}(q\,\|\,p) = -\ln Z.
$$ {#eq-trunc-kl}
:::

::: proof
For $v\in S$, $q(v) = p(v)/Z$, and $q(v) = 0$ otherwise. Then $\operatorname{KL}(q\|p) = \sum_{v\in S}q(v)\ln\frac{q(v)}{p(v)} = \sum_{v\in S}q(v)\ln\frac1Z = -\ln Z$, since $\sum_{v\in S}q(v) = 1$.
:::

Truncating to $90\%$ of the mass costs $-\ln0.9 = 0.105$ nats per token of divergence from the model — small per token, but it accumulates over a long output, and it is the price of excluding the tail. (The reverse divergence $\operatorname{KL}(p\|q)$ is infinite whenever any token is excluded: the truncated sampler can never produce text the model considers possible.)

### Contrastive decoding {#sec-contrastive}

A different idea uses two models. A large model's failures — repetition, generic phrasing, short dull continuations — are often shared by a much smaller model, which makes them worse. **Contrastive decoding** (Li et al., 2023) prefers tokens that the large "expert" model likes *more than* a small "amateur" model does.

::: definition Contrastive decoding {#def-contrastive}
Given an expert distribution $p_{\text{E}}$ and an amateur $p_{\text{A}}$ over the same vocabulary, and a plausibility threshold $\alpha\in(0, 1]$, define the head $V_{\text{head}} = \{v : p_{\text{E}}(v)\ge\alpha\max_up_{\text{E}}(u)\}$ and choose

$$
x_t = \operatorname*{arg\,max}_{v\in V_{\text{head}}}\ \big[\ln p_{\text{E}}(v\mid x_{<t}) - \ln p_{\text{A}}(v\mid x_{<t})\big].
$$ {#eq-contrastive}
:::

The plausibility constraint is essential. Without it, a token that both models consider almost impossible could win because the amateur considers it *even more* impossible: the difference of log-probabilities is large for nonsense. The head is the min-$p$ set of the expert, with $\alpha = 0.1$ in the original paper; within it, the score rewards what the larger model knows that the smaller one does not. Li et al. reported gains over greedy decoding and nucleus sampling in human and automatic evaluations of open-ended generation with OPT and GPT-2 families, and O'Brien and Lewis (2023) reported gains on some reasoning benchmarks. The cost is a second forward pass of the amateur model per token. A related variant, DoLa (Chuang et al., 2024), contrasts the final layer of a single model with an earlier layer instead of a second model. (**Contrastive search**, Su et al. 2022, is a different method despite its name: it penalises candidates whose hidden state is similar to earlier ones.)

::: example Contrastive decoding by hand {#ex-contrastive}
The expert is the distribution of [[#ex-penalties]]; the amateur has logits $(2.2, 1.9, 0.2, -0.5, -0.4, 0.4, -1.0, -2.5)$, so $p_{\text{A}}\approx(0.448, 0.332, 0.061, 0.030, 0.033, 0.074, 0.018, 0.004)$. Which token does contrastive decoding with $\alpha = 0.1$ choose?
::: solution
The head: $p_{\text{E}}\ge0.1\cdot0.380 = 0.038$, which keeps the first six tokens. Scores $\ln p_{\text{E}} - \ln p_{\text{A}} = \ln(p_{\text{E}}/p_{\text{A}})$: "the" $\ln(0.380/0.448) = -0.16$, "a" $-0.26$, "his" $0.74$, "Paris" $1.24$, "London" $0.74$, "it" $-0.36$. Contrastive decoding picks "Paris", the specific continuation that the small model underrates, where greedy decoding picks "the". "banana" and "zebra" have ratios below $1$ and are excluded by the head anyway; but an expert–amateur pair can easily give a nonsense token, rated near zero by both, the largest ratio, which is what the head prevents.
:::
:::

## Sampling and calibration {#sec-calibration}

A model is **calibrated** if, among all the events to which it assigns probability $0.8$, about $80\%$ happen ([[ml-fundamentals/evaluation-metrics]]). Pretraining with cross-entropy rewards calibration of the next-token distribution, and Kadavath et al. (2022) found large pretrained models well calibrated on multiple-choice questions when the probability of the answer letter was read off. Two things spoil this at inference time.

First, post-training ([[post-training]]) optimises for preferred outputs rather than for likelihood, and the published reports of several model families (for example the GPT-4 technical report, OpenAI 2023) show calibration of answer probabilities degrading after it. Second, and entirely within the decoder's control, *sampling settings change the distribution being sampled*.

::: proposition Temperature distorts calibrated probabilities {#prop-temp-calib}
Suppose a model is calibrated on a binary question: whenever it assigns probability $\pi$ to answer A, A is correct with probability $\pi$. Sampling at temperature $\tau$ produces A with probability

$$
q_\tau(\pi) = \frac{\pi^{1/\tau}}{\pi^{1/\tau} + (1 - \pi)^{1/\tau}},
$$ {#eq-temp-calib}

which is overconfident (further from $\tfrac12$ than $\pi$) for $\tau < 1$ and underconfident for $\tau > 1$.
:::

::: proof
With logits $(z_A, z_B)$ and $\pi = e^{z_A}/(e^{z_A} + e^{z_B})$, the ratio $\pi/(1 - \pi) = e^{z_A - z_B}$. At temperature $\tau$ the odds become $e^{(z_A - z_B)/\tau} = \big(\pi/(1 - \pi)\big)^{1/\tau}$, which gives [[#eq-temp-calib]]. For $\pi > \tfrac12$ the odds exceed $1$, and raising them to the power $1/\tau > 1$ makes them larger, so $q_\tau(\pi) > \pi$; for $\pi < \tfrac12$ it makes them smaller. For $\tau > 1$ the inequalities reverse.
:::

So the *frequency* with which a model gives an answer across samples is a calibrated estimate of its correctness only at $\tau = 1$ without truncation, and only if the underlying model was calibrated. At $\tau = 0.5$, a calibrated $80\%$ belief is sampled $94\%$ of the time: a user who reruns the query and sees the same answer almost every time is misled about how sure the model is. Truncation has the same effect, since it removes the minority answers in the tail.

::: widget plot
f: x^(1/t)/(x^(1/t)+(1-x)^(1/t)); x
x: 0, 1
y: 0, 1
sliders: t=0.5:0.1:3:0.05
labels: frequency of answer A at temperature $\tau$; calibrated probability
caption: A calibrated model believes answer A with probability $\pi$ (horizontal axis). Sampling at temperature $\tau$ (slider) produces A with the frequency on the curve, [[#eq-temp-calib]]. For $\tau < 1$ the curve is an S-shape above the diagonal for $\pi > \tfrac12$: samples overstate the model's confidence. At $\tau = 1$ it is the diagonal.
:::

This matters for methods that read confidence from samples. Self-consistency ([[reasoning/self-consistency]]) uses the most frequent answer and the agreement rate; **semantic entropy** (Kuhn, Gal and Farquhar, 2023; Farquhar et al., 2024) samples several answers, groups those with the same meaning, and uses the entropy over meanings to flag likely confabulations ([[prompting-rag/hallucination]]). Both should be run with sampling settings that leave the distribution close to the model's — typically $\tau = 1$ or slightly below, with mild truncation — and their thresholds recalibrated whenever those settings change.

::: warning "Temperature 0 gives the model's most confident and most accurate answer"
Greedy decoding returns the most probable *next token* at each step, not the most probable *answer*, and certainly not the most accurate one. For questions answered in many tokens (a chain of reasoning followed by a number) the answer that is most probable when marginalised over all reasoning paths can differ from the one the greedy path reaches, which is why majority voting over samples beats greedy decoding on many reasoning benchmarks (Wang et al., 2023). Low temperature also hides uncertainty ([[#prop-temp-calib]]). Use temperature $0$ for reproducibility and for short, closed-form outputs; do not read its output as a confidence statement.
:::

## Determinism and reproducibility {#sec-determinism}

Users and evaluators often want the same prompt to give the same output: to debug, to compare models fairly, to cache results. There are two separate sources of variation, and only one of them is randomness.

### Reproducible sampling

Sampling needs random numbers; a seed fixes them. In a server handling many requests at once, a single global generator would make each request's draws depend on which other requests ran before it, so reproducible servers keep **one generator per request**, seeded from the request. A neat way to tie the randomness to the position rather than to the order of computation is the **Gumbel-max trick**.

::: proposition Gumbel-max sampling {#prop-gumbel}
Let $U_1,\dots,U_n$ be independent uniform on $(0, 1)$ and $G_i = -\ln(-\ln U_i)$, which are independent standard Gumbel variables. For any logits $\mathbf{a}\in\mathbb{R}^n$,

$$
\Prob\Big(\operatorname*{arg\,max}_i\,(a_i + G_i) = k\Big) = \frac{e^{a_k}}{\sum_je^{a_j}}.
$$
:::

::: proof
$\Prob(G\le g) = \Prob\big(-\ln U\ge e^{-g}\big) = \Prob(U\le e^{-e^{-g}}) = e^{-e^{-g}}$, so $G$ has CDF $F(g) = \exp(-e^{-g})$ and density $f(g) = e^{-g}\exp(-e^{-g})$. Index $k$ wins when $a_j + G_j < a_k + G_k$ for every $j\ne k$. Conditioning on $G_k = g$ and using independence,

$$
\begin{aligned}
\Prob(k\text{ wins}) &= \int_{-\infty}^{\infty}f(g)\prod_{j\ne k}F(g + a_k - a_j)\,dg
= \int_{-\infty}^{\infty}e^{-g}\exp\Big(-e^{-g}\sum_{j}e^{a_j - a_k}\Big)\,dg,
\end{aligned}
$$

where the factor $\exp(-e^{-g})$ from $f$ supplies the $j = k$ term of the sum. Write $S = \sum_je^{a_j - a_k}$ and substitute $u = e^{-g}$, $du = -e^{-g}\,dg$: the integral becomes $\int_0^\infty e^{-Su}\,du = 1/S = e^{a_k}/\sum_je^{a_j}$.
:::

With temperature, use $a_i = z_i/\tau$; as $\tau\to0$ the noise becomes negligible and the rule tends to the argmax. If the uniform numbers are generated by a counter-based generator keyed by (seed, request, position, token), a sample can be reproduced from its position alone, no matter how requests were batched or ordered.

### Floating-point non-determinism

The second source of variation remains even at temperature $0$. Floating-point addition is commutative but **not associative**: $(0.1 + 0.2) + 0.3 = 0.6000000000000001$ in double precision, while $0.1 + (0.2 + 0.3) = 0.6$. A sum of $d$ numbers on a GPU is computed by many threads in a tree whose shape depends on the kernel, the tile sizes and sometimes the order in which threads finish; different shapes round differently.

::: proposition Order-dependent rounding {#prop-fp}
In floating-point arithmetic with unit roundoff $u$ (about $3.9\times10^{-3}$ for bfloat16, $6\times10^{-8}$ for float32, $1.1\times10^{-16}$ for float64), every summation order of $x_1,\dots,x_d$ returns a value $\hat s$ with

$$
\lvert\hat s - s\rvert\le(d - 1)\,u\sum_i\lvert x_i\rvert + O(u^2),
$$

and different orders generally return different values within this bound.
:::

::: proof
Each floating-point addition returns $(a + b)(1 + \delta)$ with $\lvert\delta\rvert\le u$ the standard model of floating-point arithmetic, treated in [Maths Atlas](/learn/maths/). In any order, the sum is formed by $d - 1$ additions, and each $x_i$ passes through at most $d - 1$ of them, so $\hat s = \sum_ix_i\prod_{k}(1 + \delta_{ik})$ with at most $d - 1$ factors per term. Expanding, $\lvert\hat s - s\rvert\le\sum_i\lvert x_i\rvert\big((1 + u)^{d-1} - 1\big) = (d - 1)u\sum_i\lvert x_i\rvert + O(u^2)$. The $\delta$s that occur depend on which partial sums are formed, so different orders give different errors.
:::

The errors are tiny — a few units in the last place of a logit — but decoding is discontinuous: when the top two logits are within that margin, a different summation order picks a different token, and from then on the two outputs share nothing. Over hundreds of tokens, near-ties are common.

Where do different orders come from in a server? Not, mostly, from races between threads: the standard kernels for matrix products and attention are deterministic for a given input shape. They come from **batch dependence**. A request's logits are computed in a batch with whatever other requests are running ([[inference/batching-serving]]), and kernels choose different strategies — tile sizes, whether to split the reduction dimension across processors — for different batch sizes and sequence lengths. The same request therefore follows a different summation order depending on how busy the server is. A 2025 technical report by He and colleagues at Thinking Machines Lab traced the non-determinism of temperature-$0$ outputs on a popular open-source serving engine to this lack of **batch invariance**, and showed that kernels written to use the same reduction order for every batch size (for the matrix products, the normalisation layers and attention) gave bitwise-identical outputs across runs, at some cost in throughput. Other sources include mixture-of-experts routing with per-batch capacity limits, where whether a token is dropped can depend on its batch-mates ([[transformers/mixture-of-experts]]), and differences in hardware, library versions or parallel layout between deployments.

::: definition Batch invariance {#def-batch-invariance}
An inference computation is **batch-invariant** if the output computed for each request is bitwise identical whatever other requests share its batch and whatever its position in the batch.
:::

::: quiz
A team runs an evaluation twice at temperature $0$ on the same server and gets different answers on $3\%$ of the questions. Which explanation is most likely?
- [ ] The server ignores the temperature setting
- [x] The server's batches differed between runs, so kernels summed in different orders and near-tied tokens flipped
- [ ] Greedy decoding is a randomised algorithm
- [ ] The model's weights were updated between runs
::: solution
Greedy decoding is deterministic given exact logits. In a server the logits depend, in their last bits, on the batch the request was computed in, through order-dependent rounding ([[#prop-fp]]); a near-tie then flips, and the output diverges. Running each question alone, or using batch-invariant kernels, removes the effect. Weight updates are possible in principle but would be documented; nothing suggests them here.
:::
:::

## Implementing it {#sec-code}

The listing implements, in plain Python, the processors of this chapter on the eight-token example, contrastive decoding, a check of the Gumbel-max trick by simulation, and a demonstration that three summation orders of the same numbers disagree.

```python
import math, random

def softmax(z, T=1.0):
    m = max(z); e = [math.exp((v - m) / T) if v > -math.inf else 0.0 for v in z]
    s = sum(e); return [v / s for v in e]

def entropy(p): return -sum(q * math.log(q) for q in p if q > 0)

# --- logits processors: each maps (logits, history) -> logits ----------------
def logit_bias(z, bias):                       # bias: {token id: additive bias}
    return [v + bias.get(i, 0.0) for i, v in enumerate(z)]

def freq_presence(z, hist, alpha_f, alpha_p):  # additive frequency and presence penalties
    c = [hist.count(i) for i in range(len(z))]
    return [v - alpha_f * c[i] - alpha_p * (c[i] > 0) for i, v in enumerate(z)]

def renorm(p, keep):
    s = sum(p[i] for i in keep)
    return [p[i] / s if i in keep else 0.0 for i in range(len(p))]

def min_p(p, ratio):                           # keep tokens with p >= ratio * max p
    t = ratio * max(p); return renorm(p, {i for i, q in enumerate(p) if q >= t})

def eta_sampling(p, eps):                      # keep p > min(eps, sqrt(eps) * exp(-H))
    t = min(eps, math.sqrt(eps) * math.exp(-entropy(p)))
    return renorm(p, {i for i, q in enumerate(p) if q > t})

def typical(p, mass):                          # sort by |-log p - H|, keep smallest set >= mass
    H = entropy(p)
    order = sorted((i for i in range(len(p)) if p[i] > 0), key=lambda i: abs(-math.log(p[i]) - H))
    keep, tot = set(), 0.0
    for i in order:
        keep.add(i); tot += p[i]
        if tot >= mass: break
    return renorm(p, keep)

def contrastive(z_exp, z_ama, alpha):          # Li et al. 2023: plausibility head, then difference
    pe, pa = softmax(z_exp), softmax(z_ama)
    head = [i for i, q in enumerate(pe) if q >= alpha * max(pe)]
    return max(head, key=lambda i: math.log(pe[i]) - math.log(pa[i]))

words  = ["the", "a", "his", "Paris", "London", "it", "banana", "zebra"]
logits = [2.0, 1.6, 0.9, 0.7, 0.3, 0.0, -1.5, -3.0]
p = softmax(logits)
print("p      :", " ".join(f"{q:.3f}" for q in p), f" H={entropy(p):.3f}")
for name, q in [("min-p .2", min_p(p, 0.2)), ("eta .02 ", eta_sampling(p, 0.02)),
                ("typ .9  ", typical(p, 0.9))]:
    kept = sum(v > 0 for v in q)
    Z = sum(p[i] for i in range(len(p)) if q[i] > 0)
    print(name, ":", " ".join(f"{v:.3f}" for v in q), f" kept={kept} KL(q||p)={-math.log(Z):.4f}")

hist = [0, 0, 1, 0]                            # "the" generated 3 times, "a" once
z2 = freq_presence(logits, hist, 0.5, 0.4)
print("penalised p:", " ".join(f"{q:.3f}" for q in softmax(z2)))
z3 = logit_bias(logits, {6: 5.0, 7: -math.inf})
print("biased p   :", " ".join(f"{q:.3f}" for q in softmax(z3)))

amateur = [2.2, 1.9, 0.2, -0.5, -0.4, 0.4, -1.0, -2.5]
print("contrastive pick:", words[contrastive(logits, amateur, 0.1)],
      "| greedy pick:", words[max(range(8), key=lambda i: logits[i])])

# --- Gumbel-max: argmax(z/T + G) is a sample from softmax(z/T) -----------------
def gumbel_sample(z, T, rng):
    return max(range(len(z)), key=lambda i: z[i] / T - math.log(-math.log(rng.random())))
rng = random.Random(1234)
N = 200000; counts = [0] * 8
for _ in range(N): counts[gumbel_sample(logits, 1.0, rng)] += 1
print("Gumbel-max freq:", " ".join(f"{c / N:.3f}" for c in counts))

# --- floating-point addition is not associative ------------------------------
print((0.1 + 0.2) + 0.3 == 0.1 + (0.2 + 0.3), (0.1 + 0.2) + 0.3, 0.1 + (0.2 + 0.3))
r = random.Random(0)
xs = [r.gauss(0, 1) * 10 ** r.randint(-3, 3) for _ in range(4096)]
s_seq = 0.0
for x in xs: s_seq += x
def tree(v): return v[0] if len(v) == 1 else tree(v[:len(v)//2]) + tree(v[len(v)//2:])
def chunked(v, c): return sum(sum(v[i:i+c]) for i in range(0, len(v), c))
print(f"sequential {s_seq!r}\ntree       {tree(xs)!r}\nchunks 256 {chunked(xs, 256)!r}\nexact      {math.fsum(xs)!r}")
```

Output:

```
p      : 0.380 0.255 0.127 0.104 0.069 0.051 0.011 0.003  H=1.617
min-p .2 : 0.439 0.295 0.146 0.120 0.000 0.000 0.000 0.000  kept=4 KL(q||p)=0.1449
eta .02  : 0.386 0.258 0.128 0.105 0.070 0.052 0.000 0.000  kept=6 KL(q||p)=0.0141
typ .9   : 0.407 0.273 0.135 0.111 0.074 0.000 0.000 0.000  kept=5 KL(q||p)=0.0677
penalised p: 0.108 0.197 0.241 0.197 0.132 0.098 0.022 0.005
biased p   : 0.141 0.095 0.047 0.039 0.026 0.019 0.633 0.000
contrastive pick: Paris | greedy pick: the
Gumbel-max freq: 0.381 0.255 0.127 0.104 0.069 0.052 0.011 0.002
False 0.6000000000000001 0.6
sequential -27959.426371129703
tree       -27959.426371129695
chunks 256 -27959.42637112969
exact      -27959.42637112969
```

The truncation results match [[#ex-truncation]], and the printed divergences are $-\ln Z$ of [[#prop-trunc-kl]] (min-$p$ kept mass $0.865$, $-\ln0.865 = 0.145$). The Gumbel-max frequencies agree with $p$ to within the sampling error of $200{,}000$ draws (about $\pm0.001$). The three sums of the same $4096$ numbers differ in the last digits even in double precision. Kernels typically accumulate in float32, whose unit roundoff is more than $10^8$ times that of float64, and the logits they produce are then near-tied often enough over hundreds of decode steps for such last-bit differences to flip a token.

::: application Choosing settings in practice
For tasks with one right answer — extraction, classification, code that must pass tests — greedy decoding or a low temperature with a fixed seed is the usual choice, with stop sequences and, where the format matters, constrained decoding. For open-ended writing, $\tau$ between about $0.7$ and $1$ with top-$p$ or min-$p$ truncation is common. For methods that read uncertainty from samples, keep $\tau$ near $1$. Whatever the choice, record the full pipeline — the processors, their order and parameters, the seed and the software version — as part of any reported result; "temperature $0.7$" alone does not determine the sampled distribution.
:::

::: history
Penalties for repetition entered neural generation through the CTRL model of Keskar, McCann, Varshney, Xiong and Socher (2019); additive frequency and presence penalties and logit biases became standard parameters of commercial and open-source generation interfaces from about 2020. After nucleus sampling (Holtzman et al., 2020), Hewitt, Manning and Liang framed truncation as "desmoothing" and proposed $\varepsilon$- and $\eta$-sampling (Findings of EMNLP 2022); Meister, Pimentel, Wiher and Cotterell proposed locally typical sampling (TACL 2023); Nguyen and colleagues proposed min-$p$ (2024, ICLR 2025). Li, Holtzman, Fried, Liang, Eisner, Hashimoto, Zettlemoyer and Lewis introduced contrastive decoding (ACL 2023). The Gumbel-max trick goes back to Gumbel's extreme-value distribution (1954) and to discrete-choice models in economics; its use for sampling was popularised in machine learning by Maddison, Tarlow and Minka (2014) and the Gumbel-softmax of Jang, Gu and Poole (2017). Concern with reproducible inference grew with large-scale evaluation, culminating in batch-invariant kernels (He and colleagues, 2025).
:::

::: summary
- Generation has a **prefill** phase (the whole prompt in parallel, about $2NP$ FLOPs, compute-bound) and a **decode** phase (one token per step, about $2N$ FLOPs but a full read of the weights and cache, memory-bound at about one FLOP per byte in 16 bits).
- Between logits and token sits a **pipeline** of processors — biases, penalties, temperature, truncation — whose order changes the result.
- **Additive penalties and biases** multiply probabilities by $e^{b_v}$ and renormalise; the multiplicative repetition penalty is not shift-invariant. All penalties are heuristics.
- **Min-$p$, $\varepsilon$/$\eta$ and typical sampling** are proposed truncation variants; any truncation to kept mass $Z$ costs $\operatorname{KL}(q\|p) = -\ln Z$.
- **Contrastive decoding** maximises $\ln p_{\text{E}} - \ln p_{\text{A}}$ within the expert's plausible head.
- Temperatures below $1$ and truncation make sampled answers **overconfident** relative to a calibrated model; sample-based confidence needs $\tau\approx1$.
- **Reproducibility** needs per-request seeded randomness (Gumbel-max ties draws to positions) and **batch-invariant** kernels, because floating-point addition is not associative and batch composition changes the summation order.
:::

## Exercises

::: exercise The kept set of min-p {level=1 check="3"}
A distribution has probabilities $0.5, 0.2, 0.15, 0.1, 0.05$. How many tokens does min-$p$ with $p_{\text{base}} = 0.25$ keep?
::: solution
The threshold is $0.25\cdot0.5 = 0.125$. The tokens with $p\ge0.125$ are $0.5$, $0.2$ and $0.15$: three tokens, with kept mass $0.85$.
:::
:::

::: exercise The cost of a nucleus {level=1 check="0.1054"}
Top-$p$ sampling keeps tokens with total mass $0.9$. What is $\operatorname{KL}(q\|p)$ in nats, to four decimal places?
::: solution
By [[#prop-trunc-kl]], $-\ln0.9 = 0.1054$ nats per token.
:::
:::

::: exercise Penalised probability {level=1 check="0.6225"}
Two tokens have logits $(3, 1)$. The first has occurred $4$ times; apply $\alpha_f = 0.25$ and $\alpha_p = 0.5$. What is its new probability, to four decimal places?
::: solution
Its logit falls by $0.25\cdot4 + 0.5 = 1.5$, to $1.5$. The probability is $e^{1.5}/(e^{1.5} + e^1) = 1/(1 + e^{-0.5}) = 0.6225$, down from $1/(1 + e^{-2}) = 0.881$.
:::
:::

::: exercise Overconfident samples {level=2 check="0.7704"}
A calibrated model gives answer A probability $0.7$ on a binary question. With what frequency does sampling at $\tau = 0.7$ produce A? Give four decimal places.
::: solution
By [[#eq-temp-calib]], $q = 0.7^{1/0.7}/(0.7^{1/0.7} + 0.3^{1/0.7})$. $1/0.7 = 1.4286$; $0.7^{1.4286} = e^{1.4286\ln0.7} = e^{-0.5095} = 0.6008$ and $0.3^{1.4286} = e^{-1.7200} = 0.1791$. So $q = 0.6008/0.7799 = 0.7704$: the model's $70\%$ belief is sampled $77\%$ of the time.
:::
:::

::: exercise Decode time of a larger model {level=2 check="20.9"}
A dense model of $70\times10^9$ parameters in bfloat16 is spread over several accelerators with a combined memory bandwidth of $6.7$ TB/s. Ignoring the cache and all overheads, what is the shortest possible time per output token for a single request, in milliseconds, to one decimal place?
::: solution
The weights occupy $70\times10^9\cdot2 = 1.4\times10^{11}$ bytes, all read once per token: $1.4\times10^{11}/6.7\times10^{12} = 0.02090$ s, that is $20.9$ ms, or at most about $48$ tokens per second. In practice communication between devices and the cache add to this.
:::
:::

::: exercise Min-p on peaked and flat distributions {#exr-minp level=2}
Compare top-$p$ with $p = 0.9$ and min-$p$ with $p_{\text{base}} = 0.1$ on (a) a distribution with one token at $0.85$ and $0.15$ spread evenly over $3000$ other tokens; (b) a distribution with $20$ tokens at $0.04$ each and $0.2$ spread evenly over $10{,}000$ others. How many tokens does each keep, and which behaves better?
::: solution
(a) Top-$p$: the top token has $0.85 < 0.9$, so the nucleus must add tail tokens of $5\times10^{-5}$ each until it reaches $0.9$: $0.05/5\times10^{-5} = 1000$ of them, $1001$ tokens in all, with $5.6\%$ of the renormalised mass on noise. Min-$p$: threshold $0.085$, keeps only the top token. (b) Top-$p$: the twenty tokens hold $0.8$; reaching $0.9$ needs $0.1/2\times10^{-5} = 5000$ tail tokens, so $5020$ in total. Min-$p$: threshold $0.004$, keeps the twenty. In both cases top-$p$ is forced deep into a flat tail because it cuts by cumulative mass, while min-$p$ keeps the visibly distinct head. Min-$p$ can fail the other way: if the plausible continuations themselves have very different probabilities (a top token at $0.6$ and several good ones at $0.05$), it discards them.
:::
:::

::: exercise Typical sampling can exclude the top token {level=2}
Construct a distribution for which locally typical sampling with $\tau_{\text{typ}} = 0.5$ does not keep the most probable token, and explain why the method's authors considered this acceptable.
::: solution
Take one token at $0.4$ and $600$ tokens at $0.001$ each. The entropy is $H = -0.4\ln0.4 - 600\cdot0.001\ln0.001 = 0.3665 + 4.1447 = 4.511$ nats. The top token's surprisal is $-\ln0.4 = 0.916$, at distance $3.60$ from $H$; each small token has surprisal $6.908$, at distance $2.40$. The small tokens come first in the typical order; $500$ of them reach mass $0.5$, so the top token is excluded. Meister et al. argue that in such a case the top token carries far less information than the model expects of a typical next token, and that human text tends to keep information content near its expectation; whether this improves text is an empirical question they tested on story generation and summarisation. The example also shows why a minimum like "always keep the top token" is often added in implementations.
:::
:::

::: exercise Gumbel-max with temperature {level=2}
Show that $\operatorname{arg\,max}_i(z_i/\tau + G_i)$ samples from $\operatorname{softmax}(\mathbf{z}/\tau)$ and tends to $\operatorname{arg\,max}_iz_i$ as $\tau\to0$ (assume a unique maximum). Is $\operatorname{arg\,max}_i(z_i + \tau G_i)$ the same rule?
::: solution
Apply [[#prop-gumbel]] with $a_i = z_i/\tau$. As $\tau\to0$, the gap $(z_{(1)} - z_{(2)})/\tau$ between the largest and second-largest scaled logits grows without bound, while the noise $G_i - G_j$ has a fixed distribution, so the probability that the noise overturns the order tends to $0$. And $\operatorname{arg\,max}_i(z_i + \tau G_i) = \operatorname{arg\,max}_i(z_i/\tau + G_i)$, since multiplying every term by $1/\tau > 0$ preserves the argmax: it is the same rule, written so that it is well defined at $\tau = 0$.
:::
:::

::: exercise Calibration under truncation {level=3}
A calibrated model answers a question with three options, with probabilities $0.6$, $0.3$ and $0.1$. (a) With what frequencies does top-$p$ sampling with $p = 0.85$ produce each answer? (b) Over many such questions with this same distribution, what fraction of sampled answers is correct, compared with $\tau = 1$ untruncated sampling? (c) What would a user estimating confidence from the agreement rate of two independent samples see in each case?
::: solution
(a) Cumulative $0.6, 0.9$: the nucleus is the first two answers, renormalised to $2/3$ and $1/3$. (b) Since the model is calibrated, answer $i$ is correct with probability $p_i$. Untruncated: accuracy $\sum_ip_i^2 = 0.36 + 0.09 + 0.01 = 0.46$. Truncated: $\tfrac23\cdot0.6 + \tfrac13\cdot0.3 = 0.5$. Truncation raises accuracy here (it removes a wrong-leaning option) — and greedy decoding, always choosing the first, would give $0.6$. (c) The probability that two samples agree is $\sum_iq_i^2$: $0.46$ untruncated, $\tfrac49 + \tfrac19 = 0.556$ truncated. The agreement rate rises although the model's knowledge is unchanged: sample agreement measured under truncation overstates certainty, and any threshold on it must be recalibrated when sampling settings change.
:::
:::

::: exercise Batch dependence in a toy kernel {level=3}
Write a plain-Python "matrix–vector kernel" that computes each output as a dot product of length $d = 1024$, rounding every product and partial sum to float32 (simulate it with `struct`), and splitting the reduction into chunks that are summed and then combined: one chunk when the batch has one request, chunks of $64$ otherwise (as a kernel might split the reduction differently for different batch sizes). Over $200$ seeded trials, each with $8$ near-identical weight rows (so the $8$ logits are nearly tied), count how many outputs differ between the two cases and how often the argmax flips.
::: solution
```python
import random, struct
f32 = lambda x: struct.unpack('f', struct.pack('f', x))[0]
def dot(w, x, c):                      # chunked reduction, rounding to float32 throughout
    total = 0.0
    for i in range(0, len(w), c):
        part = 0.0
        for a, b in zip(w[i:i+c], x[i:i+c]): part = f32(part + f32(a * b))
        total = f32(total + part)
    return total
rng = random.Random(0); d = 1024; flips = differ = 0; trials = 200
for trial in range(trials):
    x = [rng.gauss(0, 1) for _ in range(d)]
    base = [rng.gauss(0, 1) for _ in range(d)]
    W = [[b + 1e-5 * rng.gauss(0, 1) for b in base] for _ in range(8)]   # 8 near-identical rows
    alone   = [dot(w, x, d) for w in W]      # batch of one: a single chunk
    batched = [dot(w, x, 64) for w in W]     # larger batch: split reduction
    differ += sum(a != b for a, b in zip(alone, batched))
    flips += max(range(8), key=alone.__getitem__) != max(range(8), key=batched.__getitem__)
print(f"outputs that differ: {differ}/{8 * trials}, argmax flips: {flips}/{trials}")
```

Output:

```
outputs that differ: 1502/1600, argmax flips: 8/200
```

Almost every output differs in its last bits between the two reduction orders, and in $4\%$ of the trials the chosen token changes — in a real decode, the point from which the two generations diverge completely. The cure is a kernel that uses the same reduction order whatever the batch size — batch invariance ([[#def-batch-invariance]]). Higher precision alone only makes flips rarer.
:::
:::
