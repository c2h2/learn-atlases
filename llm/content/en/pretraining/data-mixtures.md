After filtering and deduplication ([[pretraining/training-data]]), a pretraining team has a set of cleaned **domains**: web text, code, scientific papers, books, encyclopaedias, mathematics, dialogue, dozens or hundreds of languages. They differ in size by orders of magnitude and in value per token in ways that are hard to predict. The **data mixture** decides how often the model sees each of them; the **schedule** or **curriculum** decides when. Both have large effects on what the trained model can do, and both are set largely by experiment.

This chapter makes the mixture precise as a sampling distribution over domains, works out how domain weights translate into tokens and epochs, derives temperature sampling for multilingual data, and describes DoReMi as an example of a learned mixture. It then turns to the question that limits the mixture of every large run — what happens when good data must be **repeated** — using the empirical fit of Muennighoff et al. (2023), and ends with data order: annealing on high-quality data at the end of training, curricula, and the use of synthetic data.

## The mixture as a sampling distribution {#sec-mixture}

::: definition Data mixture {#def-mixture}
Let a corpus be partitioned into $K$ domains with $n_1, \dots, n_K$ tokens. A **data mixture** is a vector of **domain weights** $\mathbf{w} = (w_1, \dots, w_K)$ with $w_k\ge0$ and $\sum_kw_k = 1$. Training on a budget of $D$ tokens with mixture $\mathbf{w}$ means that, in expectation, $w_kD$ of the training tokens come from domain $k$; in practice each sequence (or document) is drawn from domain $k$ with probability $w_k$, and within a domain documents are drawn without replacement until the domain is exhausted, after which it is reshuffled.
:::

The **natural mixture** $w_k = n_k/\sum_jn_j$ samples every token equally often. Any other mixture **upsamples** some domains and **downsamples** others.

::: proposition Epochs per domain {#prop-epochs}
Under mixture $\mathbf{w}$ and budget $D$, domain $k$ is traversed

$$
e_k = \frac{w_kD}{n_k}
$$ {#eq-epochs}

times in expectation (its number of **epochs**). Every domain is seen exactly as often as every other, $e_k = D/\sum_jn_j$ for all $k$, if and only if $\mathbf{w}$ is the natural mixture. A domain with $e_k < 1$ is not seen in full; a domain with $e_k > 1$ is repeated.
:::

::: proof
The expected number of tokens drawn from domain $k$ is $w_kD$, by the definition of the mixture and linearity of expectation; dividing by the domain's size $n_k$ gives the number of passes. If $w_k = n_k/N$ with $N = \sum_jn_j$, then $e_k = D/N$ for every $k$. Conversely, if all $e_k$ equal a common value $e$, then $w_k = en_k/D$, and summing over $k$ gives $1 = eN/D$, so $w_k = n_k/N$.
:::

::: example GPT-3's mixture {#ex-gpt3}
Brown et al. (2020) trained GPT-3 on $300$ billion tokens from five sources. Their Table 2.2 lists the sizes and weights below. Compute the epochs from [[#eq-epochs]] and compare with the paper's reported values: Common Crawl $0.44$, WebText2 $2.9$, Books1 $1.9$, Books2 $0.43$, Wikipedia $3.4$.

| source | tokens | weight |
|---|---|---|
| Common Crawl (filtered) | $410$ B | $60\%$ |
| WebText2 | $19$ B | $22\%$ |
| Books1 | $12$ B | $8\%$ |
| Books2 | $55$ B | $8\%$ |
| Wikipedia | $3$ B | $3\%$ |
::: solution
$e = w\cdot300/n$: Common Crawl $0.6\cdot300/410 = 0.44$; WebText2 $0.22\cdot300/19 = 3.5$; Books1 $0.08\cdot300/12 = 2.0$; Books2 $0.08\cdot300/55 = 0.44$; Wikipedia $0.03\cdot300/3 = 3.0$. The large sources agree with the reported epochs; the small ones differ (for example $3.0$ against $3.4$ for Wikipedia) because the weights and sizes in the table are rounded, which matters most for small domains. The pattern is what matters: the filtered crawl, which is $82\%$ of the available tokens, gets $60\%$ of the weight and is not even seen once, while the small curated sources are repeated two to three times. The authors upweighted sources they judged to be of higher quality, accepting some overfitting on them.
:::
:::

The LLaMA models (Touvron et al., 2023) used a similar pattern on $1.4$ trillion tokens: CommonCrawl $67\%$ and C4 $15\%$ of the weight, with GitHub, Wikipedia and books $4.5\%$ each, arXiv $2.5\%$ and Stack Exchange $2\%$; Wikipedia and books were seen about $2.4$ and $2.2$ times, everything else about once. Llama 3 (2024) described its final mixture only in categories: roughly half general knowledge, a quarter mathematics and reasoning, $17\%$ code and $8\%$ multilingual text.

## Choosing domain weights {#sec-weights}

There is no theory that gives the best mixture; there are several ways to search for one.

**Hand-tuning with ablations.** The traditional method is to train small models on candidate mixtures and compare their losses on held-out domains and their scores on downstream benchmarks. It is expensive, it depends on the evaluation chosen, and results at small scale do not always transfer to large models.

**Proxy models and regression.** Several groups fit a model of how loss depends on the weights: Ye et al. (2024) fitted "data mixing laws" of an exponential form, and RegMix (Liu et al., 2024) trained hundreds of tiny models on random mixtures and fitted a regression from weights to validation loss, then chose the predicted optimum. These are research methods (as of 2026), with results reported on particular data and scales.

**Robust optimisation: DoReMi.** Xie et al. (2023) proposed choosing weights so that no domain is learned much worse than a reference model learns it.

::: algorithm DoReMi (Xie et al., 2023) {#alg-doremi}
**Input:** domains $1, \dots, K$; a small **reference** model trained on an initial mixture (for example the natural mixture); step size $\eta$; smoothing $c$; $S$ steps.

1. Initialise $\boldsymbol{\alpha}_0$ to the uniform distribution $\mathbf{u}$ and a small **proxy** model $\theta_0$ (same size as the reference).
2. For $t = 1, \dots, S$:
   1. Sample a batch with examples from every domain. For each domain $k$, compute the **excess loss** $\lambda_t[k]$: the average over the domain's tokens of $\max\big(\ell_\theta(\text{token}) - \ell_{\text{ref}}(\text{token}), 0\big)$.
   2. Update the weights by **exponentiated gradient** ascent: $\alpha'_t[k] = \alpha_{t-1}[k]\exp(\eta\lambda_t[k])$, then normalise and smooth, $\boldsymbol{\alpha}_t = (1-c)\,\boldsymbol{\alpha}'_t/\sum_j\alpha'_t[j] + c\,\mathbf{u}$.
   3. Update the proxy model by a gradient step on the weighted loss $\sum_k\alpha_t[k]\,\mathcal{L}_k(\theta)$.
3. **Output** the averaged weights $\bar{\boldsymbol{\alpha}} = \frac1S\sum_t\boldsymbol{\alpha}_t$, to be used as the mixture for training the large model.
:::

The exponentiated-gradient step is the standard way to optimise over the probability simplex for the minimax problem $\min_\theta\max_{\boldsymbol\alpha}\sum_k\alpha_k(\text{excess loss}_k)$ (**Group DRO**, Sagawa et al., 2020): domains on which the proxy still lags the reference gain weight multiplicatively, and the smoothing keeps every weight above $c/K$. Domains that are easy (already learned as well as the reference) or impossibly hard (high loss for both models, because the text is noisy) have small excess loss and lose weight, which is the intended behaviour: the excess loss is meant to measure what is **learnable but not yet learned**.

::: example One DoReMi step {#ex-doremi}
With $K = 3$ domains, current weights $\boldsymbol{\alpha} = (0.5, 0.3, 0.2)$, excess losses $\boldsymbol\lambda = (0.1, 0.5, 0)$, $\eta = 1$ and $c = 10^{-3}$, compute the new weights.
::: solution
$\alpha' = (0.5e^{0.1}, 0.3e^{0.5}, 0.2e^{0}) = (0.5526, 0.4946, 0.2000)$, with sum $1.2472$; normalised, $(0.4431, 0.3966, 0.1604)$. Smoothing: $0.999\cdot(0.4431, 0.3966, 0.1604) + 0.001/3 = (0.4430, 0.3965, 0.1605)$. The second domain, with the largest excess loss, gains $9.7$ percentage points; the third, already at the reference level, loses $4$ points; the first loses a little because weights are relative.
:::
:::

Xie et al. used a $280$-million-parameter proxy to choose weights for the $22$ domains of the Pile and trained an $8$-billion-parameter model with them. They reported lower perplexity on every domain — including domains that were downweighted — and an average few-shot accuracy $6.5$ points higher than with the Pile's default weights, reaching the baseline's accuracy in $2.6$ times fewer steps. Later work found the weights sensitive to the choice of reference model and proxy size, and as of 2026 DoReMi is best regarded as one research approach among several, not a standard step.

::: warning A lower average loss is not a better mixture
It is tempting to choose the mixture that minimises the average validation loss over domains. That objective is dominated by the domains with the most validation data and the most predictable text, and it says nothing about abilities the validation sets do not cover. Upweighting code can raise the loss on web text while improving reasoning benchmarks; upweighting a high-entropy domain such as dialogue can raise every loss while making the model more useful as an assistant. Choose the evaluation first — losses on held-out domains you care about **and** downstream tasks — and expect trade-offs between them.
:::

## Languages and temperature sampling {#sec-languages}

Multilingual corpora are extremely imbalanced: English may have a thousand times more tokens than a language such as Swahili. The natural mixture would leave low-resource languages almost unseen; a uniform mixture would repeat them hundreds of times. Multilingual models interpolate with **temperature sampling**.

::: definition Temperature sampling of domains {#def-temperature}
Given domain sizes $n_k$ and an exponent $\alpha\in[0, 1]$ (equivalently a temperature $\tau = 1/\alpha$), **temperature sampling** uses the weights

$$
w_k(\alpha) = \frac{n_k^{\alpha}}{\sum_jn_j^{\alpha}}.
$$ {#eq-temperature}

$\alpha = 1$ gives the natural mixture and $\alpha = 0$ the uniform one. XLM-R (Conneau et al., 2020) and mT5 (Xue et al., 2021) used $\alpha = 0.3$.
:::

::: proposition Temperature sampling flattens the mixture {#prop-temperature}
For any two domains with $n_i > n_j$, the ratio $w_i(\alpha)/w_j(\alpha) = (n_i/n_j)^{\alpha}$ is increasing in $\alpha$, equal to $1$ at $\alpha = 0$ and to $n_i/n_j$ at $\alpha = 1$. Consequently the weight of the smallest domain is non-increasing and the weight of the largest domain non-decreasing as $\alpha$ increases from $0$ to $1$.
:::

::: proof
The ratio formula is immediate from [[#eq-temperature]], since the normaliser cancels, and $(n_i/n_j)^\alpha = e^{\alpha\ln(n_i/n_j)}$ is increasing in $\alpha$ because $\ln(n_i/n_j) > 0$. For the smallest domain $s$, $1/w_s(\alpha) = \sum_j(n_j/n_s)^\alpha$ is a sum of non-decreasing functions of $\alpha$ (each $n_j/n_s\ge1$), so $w_s$ is non-increasing; the argument for the largest domain is symmetric, with each ratio $n_j/n_\ell\le1$.
:::

::: widget plot
f: 1000^x/(1000^x + 100^x + 1); 100^x/(1000^x + 100^x + 1); 1/(1000^x + 100^x + 1)
x: 0, 1
y: 0, 1
vlines: 0.3
labels: English ($1000$ B tokens); German ($100$ B); Swahili ($1$ B)
caption: Weights of three languages with $1000$, $100$ and $1$ billion tokens under temperature sampling, as a function of the exponent $\alpha$ ($\alpha = 1$: natural proportions; $\alpha = 0$: uniform). At $\alpha = 0.3$ (vertical line) English gets $61\%$ of the samples instead of $91\%$, and Swahili $7.7\%$ instead of $0.09\%$ — which, over a budget of a trillion tokens, means repeating the Swahili data about $77$ times.
:::

::: example Repetition caused by temperature sampling {#ex-temperature}
For the three languages in the figure and a budget of $D = 1$ trillion tokens, compute the weights at $\alpha = 0.3$ and the epochs of each language.
::: solution
$1000^{0.3} = 7.943$, $100^{0.3} = 3.981$, $1^{0.3} = 1$; the sum is $12.924$, so $\mathbf{w} = (0.6146, 0.3080, 0.0774)$. Epochs by [[#eq-epochs]]: English $0.6146\cdot1000/1000 = 0.61$, German $0.3080\cdot1000/100 = 3.1$, Swahili $0.0774\cdot1000/1 = 77$. Seventy-seven repetitions is far beyond what repeated data is worth ([[#sec-epochs]]), which is why later multilingual work added caps on the number of epochs per language (Chung et al., 2023, proposed "UniMax" sampling: as uniform as possible subject to a maximum number of epochs).
:::
:::

Adding languages also has a cost at fixed model size, which Conneau et al. (2020) called the **curse of multilinguality**: beyond some number of languages, performance on each, including high-resource ones, declines because the languages compete for capacity, while low-resource languages benefit from transfer. The balance shifts with model size.

## Epochs and repetition {#sec-epochs}

High-quality data run out before compute does. Compute-optimal training ([[scaling/compute-optimal-training]]) suggests about $20$ tokens per parameter (Hoffmann et al., 2022), so a $70$-billion-parameter model wants $1.4$ trillion tokens, and models are now often trained on far more tokens than that. The cleanest data — curated sources, the best-scoring fraction of the web — are a small part of the total ([[pretraining/training-data#ex-funnel]]). Upweighting them means repeating them. How much is repetition worth?

Muennighoff et al. (2023) trained several hundred models of up to $9$ billion parameters with up to $1500$ epochs of repeated data and fitted a modified scaling law in which repeated tokens are worth less than fresh ones.

::: proposition Effective data under repetition (empirical fit) {#prop-effective-data}
Muennighoff et al. model a run on $U$ unique tokens repeated for $e$ epochs ($R = e - 1$ repetitions) as equivalent to training on

$$
D' = U + U R^\ast\big(1 - e^{-R/R^\ast}\big)
$$ {#eq-effective}

unique tokens, with a fitted constant $R^\ast\approx15.4$. This expression has three properties:

1. for $R\ll R^\ast$, $D'\approx U(1 + R) = Ue$: early repetitions are worth almost as much as fresh data;
2. $D'$ increases with $R$ but its increments shrink geometrically: the $R$-th repetition adds $U R^\ast(1 - e^{-1/R^\ast})e^{-(R-1)/R^\ast}$;
3. $D' < U(1 + R^\ast)$ for all $R$: however often the data are repeated, they are worth at most $1 + R^\ast\approx16.4$ times their unique size.
:::

::: proof
The formula is an empirical fit, not a theorem; the three properties follow from it. (1) By Taylor expansion, $1 - e^{-x} = x - x^2/2 + O(x^3)$, so $UR^\ast(1 - e^{-R/R^\ast}) = UR - UR^2/(2R^\ast) + \dots$, and the relative loss of value is about $R/(2R^\ast)$. (2) The increment from $R - 1$ to $R$ is $UR^\ast(e^{-(R-1)/R^\ast} - e^{-R/R^\ast}) = UR^\ast(1 - e^{-1/R^\ast})e^{-(R-1)/R^\ast}$, a geometric sequence with ratio $e^{-1/R^\ast} < 1$. (3) $1 - e^{-R/R^\ast} < 1$ for every finite $R$.
:::

::: widget plot
f: 1 + R*(1 - exp(-(x - 1)/R)); x
x: 1, 64
y: 0, 30
sliders: R=15.4:2:40:0.2
labels: effective data $D'/U$; unique data $e$
caption: Effective data $D'/U$ from [[#eq-effective]] against the number of epochs $e$, with the fitted $R^\ast = 15.4$ (slider $R$). Up to about $4$ epochs the curve follows the diagonal — repeated data are nearly as good as new. By $16$ epochs a repeated token is worth about two-thirds of a fresh one on average, and the curve flattens towards $1 + R^\ast$. The fit comes from models up to $9$ billion parameters on particular data; treat the constant as indicative.
:::

The paper's headline finding was that training for up to about $4$ epochs gave losses almost the same as training on the same number of unique tokens, while with many more epochs the value of additional compute decayed towards zero. It also reported that filling up with code, or relaxing filters, were effective ways to extend a limited supply of natural-language data. These conclusions concern loss and the benchmarks they measured; heavy repetition of small sources also raises memorisation of those sources, which matters for privacy and copyright ([[pretraining/training-data#sec-rights]]).

::: example Is repeating worth it? {#ex-repeat}
A team has $100$ billion tokens of high-quality text. Using [[#eq-effective]] with $R^\ast = 15.4$, how much unique data are $4$ epochs and $16$ epochs worth? What fraction of the compute is "wasted" in each case relative to fresh data?
::: solution
Four epochs: $R = 3$, $D' = 100 + 100\cdot15.4\cdot(1 - e^{-3/15.4}) = 100 + 1540\cdot0.1770 = 372.6$ B, against $400$ B seen: $93\%$ value, $7\%$ waste. Sixteen epochs: $R = 15$, $D' = 100 + 1540\cdot(1 - e^{-0.974}) = 100 + 1540\cdot0.6224 = 1058.6$ B against $1600$ B: $66\%$ value, $34\%$ waste. Four epochs of excellent data may well beat one epoch of four times as much mediocre data; sixteen epochs probably do not.
:::
:::

### A mixture in code {#sec-code}

The listing computes epochs per domain for a hypothetical mixture, shows how the realised proportions of a sampled stream approach the weights, applies temperature sampling and tabulates [[#eq-effective]].

```python
import math, random

# 1. a mixture: domain sizes (billions of tokens) and sampling weights
sizes   = {"web": 2000.0, "code": 300.0, "papers": 60.0, "books": 25.0, "wiki": 20.0}
weights = {"web": 0.70, "code": 0.15, "papers": 0.06, "books": 0.05, "wiki": 0.04}
D = 1000.0                                          # token budget, billions
for k in sizes:
    print(f"{k:7s} weight {weights[k]:.2f}  tokens {weights[k] * D:6.0f}B  epochs {weights[k] * D / sizes[k]:.2f}")

# 2. sampling documents for a stream of sequences: realised proportions fluctuate
rng = random.Random(0)
names, w = list(weights), list(weights.values())
for n in [100, 10_000, 1_000_000]:
    draws = rng.choices(names, weights=w, k=n)
    print(f"n = {n:>9,}: " + "  ".join(f"{k} {draws.count(k) / n:.4f}" for k in names))

# 3. temperature sampling of languages: p_k proportional to n_k^alpha
n_lang = {"en": 1000.0, "de": 100.0, "sw": 1.0}     # billions of tokens available
for a in [1.0, 0.7, 0.3, 0.0]:
    z = sum(v ** a for v in n_lang.values())
    print(f"alpha = {a}: " + ", ".join(f"{k} {v ** a / z:.4f}" for k, v in n_lang.items()))

# 4. effective data under repetition (Muennighoff et al. 2023 fit, R* = 15.4)
def effective(U, epochs, Rstar=15.4):
    R = epochs - 1                                  # repetitions beyond the first pass
    return U + U * Rstar * (1 - math.exp(-R / Rstar))
for ep in [1, 2, 4, 8, 16, 40, 100]:
    Deff = effective(100.0, ep)
    print(f"{ep:3d} epochs of 100B unique: {100 * ep:6.0f}B seen, worth {Deff:6.1f}B unique ({Deff / (100 * ep):.0%})")
```

```text
web     weight 0.70  tokens    700B  epochs 0.35
code    weight 0.15  tokens    150B  epochs 0.50
papers  weight 0.06  tokens     60B  epochs 1.00
books   weight 0.05  tokens     50B  epochs 2.00
wiki    weight 0.04  tokens     40B  epochs 2.00
n =       100: web 0.6100  code 0.1800  papers 0.1000  books 0.0600  wiki 0.0500
n =    10,000: web 0.7012  code 0.1535  papers 0.0595  books 0.0484  wiki 0.0374
n = 1,000,000: web 0.7003  code 0.1497  papers 0.0600  books 0.0503  wiki 0.0397
alpha = 1.0: en 0.9083, de 0.0908, sw 0.0009
alpha = 0.7: en 0.8282, de 0.1652, sw 0.0066
alpha = 0.3: en 0.6146, de 0.3080, sw 0.0774
alpha = 0.0: en 0.3333, de 0.3333, sw 0.3333
  1 epochs of 100B unique:    100B seen, worth  100.0B unique (100%)
  2 epochs of 100B unique:    200B seen, worth  196.8B unique (98%)
  4 epochs of 100B unique:    400B seen, worth  372.6B unique (93%)
  8 epochs of 100B unique:    800B seen, worth  662.5B unique (83%)
 16 epochs of 100B unique:   1600B seen, worth 1058.6B unique (66%)
 40 epochs of 100B unique:   4000B seen, worth 1517.6B unique (38%)
100 epochs of 100B unique:  10000B seen, worth 1637.5B unique (16%)
```

With $100$ samples the realised proportions are off by several points (papers $10\%$ instead of $6\%$); with a million they match to three decimals, the $1/\sqrt n$ behaviour of any sampling average. In a real run a batch of a few million tokens holds a few thousand documents, so individual batches have visibly different mixtures, which is one source of the noise in training loss. Many pipelines therefore pre-shuffle the whole token stream once, so that every stretch of training sees close to the target mixture.

::: quiz
A domain of $50$ billion tokens receives weight $0.1$ in a run of $2$ trillion tokens. How many epochs of it does the model see?
- [ ] $0.4$
- [ ] $2.5$
- [x] $4$
- [ ] $40$
::: solution
$e = w D/n = 0.1\cdot2000/50 = 4$ by [[#eq-epochs]] — near the limit up to which Muennighoff et al. found repetition almost free.
:::
:::

## Data order: annealing and curricula {#sec-order}

So far the mixture has been constant during training. It need not be.

::: definition Annealing phase {#def-annealing}
An **annealing** (or **cool-down**, or **mid-training**) phase is a final stage of pretraining, typically a few percent of the token budget, in which the learning rate is decayed towards zero while the data mixture is shifted towards domains judged to be of the highest quality or most relevant to target abilities — curated text, mathematics, code, instruction-like data.
:::

Annealing combines two effects. The learning-rate decay itself lowers the loss sharply at the end of training ([[neural-networks/optimisers#sec-schedules]]); warm-up–stable–decay schedules ([[pretraining/training-loop]]) make it easy to branch several decay phases from one stable checkpoint. And because the learning rate is falling, the data seen last have a lasting effect on the final weights without being overwritten. The Llama 3 report (2024) described annealing on small amounts of high-quality code and mathematics, which improved its $8$-billion-parameter model on mathematics benchmarks while having negligible effect on the $405$-billion-parameter model, and used short annealing runs as a cheap way to judge the value of candidate datasets. MiniCPM (Hu et al., 2024) and OLMo 2 (2024) also describe high-quality data in the decay phase. Because annealing data are chosen to help on particular tasks, they raise the stakes of contamination ([[pretraining/training-data#sec-contamination]]): a few thousand benchmark-like examples late in training can move scores markedly.

**Curricula.** A **curriculum** orders training data from easy to hard (Bengio et al., 2009). For language-model pretraining, the evidence for difficulty-based curricula is mixed: shuffled data remain the default, and gains reported for particular orderings have often been small or hard to reproduce. Two orderings are widely used. **Sequence length** is increased during training — most models are pretrained with a context of a few thousand tokens and extended to longer contexts near the end ([[pretraining/continued-pretraining]]), because attention cost grows with length and long documents are scarce. And the **mixture changes in stages**, with the annealing phase as the main example. Less is known about why these work than about the fact that they do in the reported runs.

## Synthetic data {#sec-synthetic}

A growing share of pretraining data is written by other models. Approaches include generating "textbook-style" explanations and exercises (the phi models, Gunasekar et al., 2023, trained on filtered web data plus synthetic textbooks), **rephrasing** web pages in cleaner styles such as encyclopaedia entries or question–answer pairs (Maini et al., 2024, reported roughly threefold faster training this way), and generating code, mathematics and translations with automatic verification.

Synthetic data can raise quality and cover gaps, but they carry three risks. They can import the generating model's errors and biases. They narrow diversity, since a model's samples are concentrated on its likely outputs. And recursive training — models trained on the outputs of models trained on the outputs of models — can degrade the distribution, losing its tails; Shumailov et al. (2024) called this **model collapse**. Later work (Gerstgrasser et al., 2024) found that collapse is avoided when synthetic data accumulate alongside the original real data rather than replacing them. As the web itself fills with generated text, distinguishing and weighting synthetic content has become part of filtering ([[pretraining/training-data#sec-filtering]]). As of 2026, how much synthetic data helps at large scale, and in what proportion, is an open empirical question.

::: example Mixing synthetic data {#ex-synthetic}
A run of $D = 2$ trillion tokens uses $70\%$ web data ($5$ T available), $15\%$ code ($0.6$ T) and $15\%$ synthetic rephrasings, generated on demand. How many tokens must be generated if each synthetic token is used once, and how many epochs of web and code does the run see? What does generation cost if the generator spends $2N_g$ FLOPs per token with $N_g = 8\times10^9$ parameters?
::: solution
Synthetic: $0.15\cdot2\times10^{12} = 3\times10^{11}$ tokens. Web: $0.7\cdot2/5 = 0.28$ epochs; code: $0.15\cdot2/0.6 = 0.5$ epochs. Generation costs $2\cdot8\times10^9\cdot3\times10^{11} = 4.8\times10^{21}$ FLOPs (ignoring prompt processing) — about $5.7\%$ of the $6ND$ training compute of a $7$-billion-parameter model on $2$ trillion tokens ($6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$; see [[pretraining/training-loop#prop-6nd]]). Synthetic data are not free, but at this scale their cost is modest.
:::
:::

::: history
Upweighting curated sources goes back at least to GPT-2's WebText (2019) and GPT-3 (Brown et al., 2020), whose mixture table set the pattern of repeating small, high-quality domains. Arivazhagan et al. (2019) studied temperature sampling for massively multilingual translation, and XLM-R (Conneau et al., 2020) and mT5 (Xue et al., 2021) adopted $\alpha = 0.3$; Chung et al. (2023) proposed UniMax. Curriculum learning was formalised by Bengio et al. (2009). Xie et al. (2023) introduced DoReMi, building on Group DRO (Sagawa et al., 2020), and Muennighoff et al. (2023) measured the value of repeated data. Annealing and multi-stage mixtures were described in detail in reports such as MiniCPM (2024), Llama 3 (2024) and OLMo 2 (2024), and synthetic data entered pretraining with the phi models (2023) and rephrasing methods (2024), alongside the study of model collapse (Shumailov et al., 2024).
:::

::: summary
- A **data mixture** is a distribution $\mathbf{w}$ over domains; domain $k$ receives $w_kD$ tokens and is seen $e_k = w_kD/n_k$ times. Only the natural mixture gives every token the same number of epochs.
- Large runs upweight small, high-quality domains and repeat them (GPT-3: Wikipedia about three times, the crawl less than once).
- Weights are chosen by ablations on small models, by fitted regressions, or by robust optimisation such as **DoReMi**, which upweights domains with high excess loss over a reference model (research, sensitive to its settings).
- **Temperature sampling** $w_k\propto n_k^\alpha$ interpolates between natural and uniform mixtures of languages ($\alpha = 0.3$ in XLM-R and mT5); low $\alpha$ causes heavy repetition of small languages.
- Repeated data lose value gradually: in the fit of Muennighoff et al. (2023) up to about $4$ epochs are nearly as good as fresh data, and the total value is bounded by about $16$ times the unique data.
- The mixture can change over training: an **annealing** phase on high-quality data with a decaying learning rate is standard; difficulty curricula have mixed evidence; sequence length grows in stages. **Synthetic data** help in reported cases but risk errors, lost diversity and collapse if they replace real data.
:::

## Exercises

::: exercise Epochs of a domain {level=1 check="2.5"}
A $40$-billion-token domain gets weight $0.05$ in a $2$-trillion-token run. How many epochs is it seen?
::: solution
$0.05\cdot2000/40 = 2.5$ epochs by [[#eq-epochs]].
:::
:::

::: exercise Temperature weights {level=1 check="0.0774"}
For languages with $1000$, $100$ and $1$ billion tokens, compute the weight of the smallest under temperature sampling with $\alpha = 0.3$, to four decimal places.
::: solution
$1/(1000^{0.3} + 100^{0.3} + 1) = 1/(7.943 + 3.981 + 1) = 1/12.924 = 0.0774$.
:::
:::

::: exercise Natural mixture {level=1 check="0.125"}
Three domains have $500$, $300$ and $200$ billion tokens and the run lasts $125$ billion tokens with the natural mixture. How many epochs is each domain seen?
::: solution
The natural weights are $0.5, 0.3, 0.2$; every domain gets $e = 125/1000 = 0.125$ epochs ([[#prop-epochs]]).
:::
:::

::: exercise Effective data {level=2 check="662.5"}
Using [[#eq-effective]] with $R^\ast = 15.4$, how many billion tokens of unique data are $8$ epochs of $100$ billion tokens worth? Give one decimal place.
::: solution
$R = 7$: $100 + 1540\cdot(1 - e^{-7/15.4}) = 100 + 1540\cdot(1 - 0.63474) = 100 + 562.5 = 662.5$ billion, $83\%$ of the $800$ billion seen.
:::
:::

::: exercise A DoReMi step {level=2 check="0.4"}
Two domains have weights $(0.5, 0.5)$ and excess losses $(0, \ln1.5)$. With $\eta = 1$ and no smoothing, compute the new weight of the first domain.
::: solution
$\alpha' = (0.5, 0.5\cdot1.5) = (0.5, 0.75)$, sum $1.25$, so the weights become $(0.4, 0.6)$. The first domain's weight is $0.4$.
:::
:::

::: exercise Choosing alpha to cap repetition {level=2}
For the three languages of [[#ex-temperature]] and $D = 1$ trillion tokens, find (numerically, to two decimals) the smallest $\alpha$ for which the smallest language is seen at most $4$ times. What share does English get then?
::: solution
We need $w_{\text{sw}}(\alpha)\cdot1000\le4$, that is $1/(1000^\alpha + 100^\alpha + 1)\le0.004$, or $1000^\alpha + 100^\alpha\ge249$. At $\alpha = 0.75$: $177.8 + 31.6 = 209.4$, too small; at $\alpha = 0.78$: $218.8 + 36.3 = 255.1$, enough; at $\alpha = 0.77$: $204.2 + 34.7 = 238.9$, not enough. So $\alpha\approx0.78$, with $w_{\text{en}} = 218.8/256.1 = 0.854$. Capping repetition forces the mixture close to the natural one, leaving the small language with $0.4\%$ of the data; UniMax-style sampling instead fixes the cap directly and spreads the remaining budget as uniformly as possible.
:::
:::

::: exercise Upper bound on repeated data {level=2 check="16.4"}
According to [[#prop-effective-data]], at most how many times its unique size can a repeated dataset be worth, with $R^\ast = 15.4$?
::: solution
$D' < U(1 + R^\ast) = 16.4\,U$; the bound is approached only as the number of repetitions tends to infinity.
:::
:::

::: exercise Exponentiated gradient stays on the simplex {level=3}
Show that the DoReMi update of [[#alg-doremi]] always produces a probability vector with every entry at least $c/K$, and that, without smoothing, $\log(\alpha_t[i]/\alpha_t[j])$ changes by exactly $\eta(\lambda_t[i] - \lambda_t[j])$. Interpret the second fact.
::: solution
$\alpha'_t[k] > 0$ since it is a positive weight times an exponential; dividing by the sum gives a probability vector $\mathbf{p}$; $(1-c)\mathbf{p} + c\mathbf{u}$ is a convex combination of two probability vectors, hence a probability vector, and each entry is at least $c\cdot1/K$. Without smoothing, $\alpha_t[i]/\alpha_t[j] = \alpha_{t-1}[i]e^{\eta\lambda_t[i]}/(\alpha_{t-1}[j]e^{\eta\lambda_t[j]})$, since the normaliser cancels, so the log-ratio changes by $\eta(\lambda_t[i] - \lambda_t[j])$. The weights are thus a softmax of $\eta$ times the cumulative excess losses: a domain that persistently lags the reference gains weight exponentially fast, which is why smoothing and averaging over steps are needed to keep the final mixture from collapsing onto one domain.
:::
:::

::: exercise A data budget plan {level=3}
A team will train a $30$-billion-parameter model on $D = 3$ trillion tokens. Available after filtering: $8$ T web tokens of which the top-scoring $1.5$ T are "high quality", $0.8$ T code, $0.1$ T curated (papers, books, encyclopaedia), and $0.05$ T mathematics. Propose a mixture for a main phase of $2.85$ T tokens and an annealing phase of $0.15$ T tokens, compute the epochs of every source over the whole run, and justify the choices with [[#prop-effective-data]]. (There are many reasonable answers.)
::: solution
One plan. Main phase ($2.85$ T): high-quality web $45\%$ ($1.28$ T), other web $30\%$ ($0.86$ T), code $17\%$ ($0.48$ T), curated $5\%$ ($0.14$ T), mathematics $3\%$ ($0.086$ T). Annealing ($0.15$ T): high-quality web $40\%$ ($0.06$ T), curated $25\%$ ($0.0375$ T), mathematics $20\%$ ($0.03$ T), code $15\%$ ($0.0225$ T). Epochs over the run: high-quality web $(1.28 + 0.06)/1.5 = 0.90$; other web $0.86/6.5 = 0.13$; code $(0.48 + 0.0225)/0.8 = 0.63$; curated $(0.14 + 0.0375)/0.1 = 1.8$; mathematics $(0.086 + 0.03)/0.05 = 2.3$. Every source stays well below the $\approx4$ epochs at which [[#eq-effective]] starts to discount repetition noticeably, while the curated and mathematical data are upweighted $20$ to $30$ times relative to their natural share. The annealing mix concentrates the most valuable data where the falling learning rate makes their effect last. A team would check the choice with small-scale ablations and keep the annealing data decontaminated against its benchmarks.
:::
:::

::: exercise Sampling noise in a batch {level=3}
A batch of $4$ million tokens is made of $2{,}000$ sequences of $2{,}048$ tokens, each drawn independently from a domain with probability $w_k$. For a domain with $w = 0.05$, compute the mean and standard deviation of its share of the batch, and the probability (by the normal approximation) that its share exceeds $6\%$. How does pre-shuffling a fixed token stream change this?
::: solution
The count of sequences from the domain is Binomial$(2000, 0.05)$: mean $100$, standard deviation $\sqrt{2000\cdot0.05\cdot0.95} = 9.75$, so the share has mean $5\%$ and standard deviation $0.49$ percentage points. A share above $6\%$ means more than $120$ sequences, $z = (120.5 - 100)/9.75 = 2.10$, probability about $0.018$ — roughly one batch in fifty. Pre-shuffling a fixed stream does not remove the randomness of any single batch (it is still a random sample), but it guarantees that over the whole run each domain contributes exactly its planned number of tokens and that no domain is exhausted early or late; stratified batch construction (a fixed number of sequences per domain in every batch) would remove the per-batch fluctuation itself.
:::
:::
