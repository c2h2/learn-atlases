Pretraining a model from scratch costs months and an amount of compute few organisations have. Most specialised models are therefore not trained from scratch: they start from a pretrained checkpoint and **continue pretraining** on new data — biomedical papers, source code, mathematics, a language the original model saw little of, or longer documents that teach it to use a longer context. Continued pretraining uses the same objective and the same loop as the original run ([[pretraining/training-loop]]); what makes it a subject of its own is that it must add something without destroying what is already there.

This chapter covers the three most common adaptations. **Domain-adaptive pretraining** shifts a model towards a domain's text, and its main hazard is **catastrophic forgetting**, which we analyse with a quadratic approximation and counter with **replay** and learning-rate **re-warming**. **Context-length extension** lets a model trained on a few thousand tokens handle tens or hundreds of thousands; we work through the rotary-position mathematics of position interpolation, NTK-aware scaling and YaRN. **Tokeniser extension** adds vocabulary for a new language or domain. Supervised fine-tuning and preference training, which adapt a model's behaviour rather than its knowledge, belong to [[post-training]].

## Domain-adaptive pretraining {#sec-dapt}

::: definition Continued pretraining {#def-continued}
**Continued pretraining** starts from the parameters $\theta_0$ of a pretrained model and minimises the pretraining loss ([[pretraining/pretraining-objectives#def-objective]]) on a new data distribution $q$ — a domain corpus, possibly mixed with **replay** data from the original distribution $p$:

$$
\mathcal{L}_{\text{CPT}}(\theta) = (1-\rho)\,\E_{\mathbf x\sim q}\big[\mathcal L(\theta;\mathbf x)\big] + \rho\,\E_{\mathbf x\sim p}\big[\mathcal L(\theta;\mathbf x)\big],\qquad0\le\rho<1.
$$

**Domain-adaptive pretraining** (DAPT) uses a large corpus from the target domain; **task-adaptive pretraining** (TAPT) uses the unlabelled text of a specific task's training set.
:::

Gururangan et al. (2020) continued pretraining RoBERTa ([[pretraining/model-families#sec-encoders]]) on four domains — biomedical papers, computer-science papers, news and product reviews — and evaluated on eight classification tasks. Domain-adaptive pretraining improved every task in its own domain, and pretraining on an *unrelated* domain often hurt; task-adaptive pretraining on the much smaller task text also helped, and the combination of both was best. Their title, "Don't stop pretraining", became a summary of the practice.

Many specialised language models have been built this way. Minerva (Lewkowycz et al., 2022) continued PaLM on $38.5$ billion tokens of mathematical web pages and arXiv papers; Code Llama (Rozière et al., 2023) continued Llama 2 on $500$ billion tokens of mostly code; Llemma (Azerbayev et al., 2023) continued Code Llama on Proof-Pile-2, a corpus of mathematics. Compared with training from scratch, continued pretraining reuses the general knowledge and language ability of the base model and needs a fraction of the compute; the cost is that the result inherits the base model's tokeniser, architecture and any weaknesses.

::: example Is it worth continuing? {#ex-cpt-cost}
A team has a $7$-billion-parameter base model trained on $2$ trillion tokens and $50$ billion tokens of legal text. Compare the compute of (a) continuing pretraining for two epochs of the legal text mixed with $25\%$ replay, and (b) training a new model from scratch on $2$ trillion tokens that include the legal text.
::: solution
(a) Two epochs of $50$ billion legal tokens are $100$ billion tokens, which is $75\%$ of the continued run if replay is $25\%$, so the run has $133$ billion tokens: $6\cdot7\times10^9\cdot1.33\times10^{11} = 5.6\times10^{21}$ FLOPs ([[pretraining/training-loop#prop-6nd]]). (b) $6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$ FLOPs, $15$ times as much. Continued pretraining costs about $7\%$ of a new run — which is why it is the default unless the base model's tokeniser or architecture is unsuitable.
:::
:::

## Catastrophic forgetting {#sec-forgetting}

Training on a new distribution moves the parameters to where the new loss is low, and nothing in the new loss keeps them where the old loss was low. Neural networks can lose old abilities quickly when this happens — **catastrophic forgetting** (McCloskey and Cohen, 1989). For a language model, continued pretraining on code can degrade its prose, and pretraining on a new language can degrade its English.

::: proposition Forgetting to second order {#prop-forgetting}
Let $\theta_0$ be a minimum of the old loss $\mathcal L_p$ with Hessian $H_p = \nabla^2\mathcal L_p(\theta_0)$ (positive semi-definite). If continued pretraining moves the parameters to $\theta_0 + \Delta$, then

$$
\mathcal L_p(\theta_0 + \Delta) - \mathcal L_p(\theta_0) = \tfrac12\,\Delta^\top H_p\,\Delta + O(\norm{\Delta}^3).
$$ {#eq-forgetting}

Forgetting is therefore small when the update lies mostly in directions of low curvature of the old loss and large when it moves along directions of high curvature, and for small updates it grows quadratically with the step size.
:::

::: proof
Taylor's theorem at $\theta_0$ gives $\mathcal L_p(\theta_0 + \Delta) = \mathcal L_p(\theta_0) + \nabla\mathcal L_p(\theta_0)^\top\Delta + \tfrac12\Delta^\top H_p\Delta + O(\norm\Delta^3)$ for a three-times differentiable loss. At a minimum the gradient vanishes, leaving [[#eq-forgetting]]. Writing $\Delta = \sum_k c_k\mathbf u_k$ in the eigenvectors of $H_p$ with eigenvalues $\lambda_k\ge0$, the quadratic term is $\tfrac12\sum_k\lambda_kc_k^2$: components along high-curvature directions dominate, and scaling $\Delta$ by $a$ scales the term by $a^2$.
:::

The proposition motivates the main remedies. **Regularisation towards $\theta_0$** penalises movement along the directions that matter for the old task: elastic weight consolidation (EWC; Kirkpatrick et al., 2017) adds $\frac\lambda2\sum_iF_i(\theta_i - \theta_{0,i})^2$, where $F_i$ is a diagonal estimate of the curvature (the Fisher information), which is exactly [[#eq-forgetting]] with $H_p$ replaced by a diagonal approximation. **Replay** keeps the old loss in the objective: with $\rho > 0$ in [[#def-continued]], the gradient of $\mathcal L_p$ pulls back whenever the update starts to increase it. **Small or few steps** limit $\norm\Delta$. For large language models, replay is the simplest and most widely used; EWC-style penalties need curvature estimates for billions of parameters and are rarely used at scale.

::: example Curvature and forgetting {#ex-curvature}
Near $\theta_0$, the old loss of a two-parameter model has Hessian $H_p = \operatorname{diag}(10, 0.1)$. Two continued-pretraining runs end at $\Delta_1 = (0.1, 0)$ and $\Delta_2 = (0, 1)$. Which forgets more, by [[#eq-forgetting]]?
::: solution
$\tfrac12\Delta_1^\top H_p\Delta_1 = \tfrac12\cdot10\cdot0.01 = 0.05$; $\tfrac12\Delta_2^\top H_p\Delta_2 = \tfrac12\cdot0.1\cdot1 = 0.05$. They forget equally, although $\Delta_2$ is ten times longer: a small move in a stiff direction costs as much as a large move in a flat one. A replay or EWC penalty would steer the update towards the flat direction.
:::
:::

### Replay and re-warming {#sec-replay}

Continued pretraining typically starts from a checkpoint whose learning rate has been decayed to near zero. To learn the new distribution, the learning rate must rise again — **re-warming** — and then decay — **re-decaying**. Gupta et al. (2023) found that re-warming initially raises the loss on the original data, whatever the warm-up length, but improves the final loss on the new data. Ibrahim et al. (2024) showed that the combination of re-warming, re-decaying and replay of a fraction of the original data — a few percent when the new data resemble the old, up to about a quarter for a strong shift such as a new language — matched the performance of retraining from scratch on the union of the data, for a fraction of the compute. Schedules without a final decay in the base run, such as warm-up–stable–decay ([[pretraining/training-loop#def-schedules]]), make continuation easier, because one can branch from a stable-phase checkpoint where the learning rate is still high.

The listing below makes forgetting and replay visible in the smallest possible setting: the character-bigram model of [[pretraining/pretraining-objectives#sec-code]], "pretrained" on the Dickens passage and then continued on the opening of Melville's *Moby-Dick* (1851, also public domain), with different fractions of replayed Dickens.

```python
import math, random

old = ("it was the best of times, it was the worst of times, it was the age of "
       "wisdom, it was the age of foolishness, it was the epoch of belief, it was "
       "the epoch of incredulity, it was the season of light, it was the season of "
       "darkness, it was the spring of hope, it was the winter of despair")   # Dickens, 1859
new = ("call me ishmael. some years ago, never mind how long precisely, having little "
       "or no money in my purse, and nothing particular to interest me on shore, i "
       "thought i would sail about a little and see the watery part of the world")  # Melville, 1851
chars = sorted(set(old + new)); V = len(chars)
enc = lambda s: [chars.index(c) for c in s]
old_ids, new_ids = enc(old), enc(new)

def pairs(ids): return list(zip(ids[:-1], ids[1:]))
def loss(W, P):
    t = 0.0
    for a, b in P:
        m = max(W[a]); t -= W[a][b] - m - math.log(sum(math.exp(z - m) for z in W[a]))
    return t / len(P)
def sgd(W, P, steps, lr, rng, batch=64):
    for _ in range(steps):
        B = [rng.choice(P) for _ in range(batch)]
        for a, b in B:
            m = max(W[a]); e = [math.exp(z - m) for z in W[a]]; s = sum(e)
            for j in range(V): W[a][j] -= lr * (e[j] / s - (j == b)) / batch
    return W

rng = random.Random(0)
W0 = sgd([[0.0] * V for _ in range(V)], pairs(old_ids), 3000, 5.0, rng)    # "pretraining" on Dickens
print(f"V = {V}; after pretraining:   old {loss(W0, pairs(old_ids)):.3f}   new {loss(W0, pairs(new_ids)):.3f}")
for replay in [0.0, 0.1, 0.25, 0.5]:
    W = [row[:] for row in W0]
    r = random.Random(1)
    n_old = int(round(replay * 1000))
    mix = [r.choice(pairs(old_ids)) for _ in range(n_old)] + [r.choice(pairs(new_ids)) for _ in range(1000 - n_old)]
    W = sgd(W, mix, 3000, 5.0, r)                                             # continued pretraining
    print(f"replay {replay:4.0%}:  old {loss(W, pairs(old_ids)):.3f}   new {loss(W, pairs(new_ids)):.3f}")
```

```text
V = 25; after pretraining:   old 1.420   new 4.329
replay   0%:  old 3.075   new 1.844
replay  10%:  old 2.550   new 1.880
replay  25%:  old 2.114   new 1.968
replay  50%:  old 1.761   new 2.248
```

After "pretraining" the model fits the Dickens text (loss $1.42$ nats per character) and is poor on Melville ($4.33$, worse than the uniform $\ln25 = 3.22$, because it confidently predicts Dickens's character pairs). Continuing on Melville alone halves the Melville loss to $1.84$ but more than doubles the Dickens loss to $3.08$: catastrophic forgetting. Replaying $10\%$ Dickens recovers a third of the lost ground on the old text at a cost of $0.04$ nats on the new one; $25\%$ replay keeps the old loss at $2.11$ for $0.12$ nats on the new. The trade-off is continuous, and the right fraction depends on how much each distribution matters. A bigram model has so few parameters that the two texts compete directly for the same table entries; large models have far more spare capacity, and forget less per token of new data — but they do forget, and the same trade-off appears in the results of Ibrahim et al.

::: warning Low loss on the new domain is not the goal by itself
A continued-pretraining run is easy to judge by the loss on the new domain, which falls quickly. That number says nothing about what was lost. Before and after, evaluate the base model's general abilities — held-out web text, code, reasoning and knowledge benchmarks, the languages it served — alongside the domain metrics ([[pretraining/in-training-evaluation]]). A domain model that is $2$ points better on domain questions and $10$ points worse on everything else is rarely what was wanted, and the regression may be invisible in the domain loss.
:::

## Extending the context length {#sec-context}

Models are pretrained mostly on sequences of a few thousand tokens, because attention cost grows with length ([[pretraining/training-loop#sec-flops]]) and long documents are scarce. Longer contexts are added at the end, in a continued-pretraining phase on long documents. The obstacle is the positional encoding: a model with rotary position embeddings (RoPE, [[transformers/positional-encoding#def-rope]]) has seen relative rotations only up to its training length $L$, and beyond it attention behaves unpredictably — simply running on longer inputs ("extrapolation") usually makes the loss blow up.

Recall that RoPE rotates each pair $i = 0, \dots, d/2-1$ of query and key coordinates at position $m$ by the angle $m\theta_i$, with frequencies

$$
\theta_i = b^{-2i/d},\qquad\lambda_i = \frac{2\pi}{\theta_i} = 2\pi\,b^{2i/d},
$$ {#eq-rope-freq}

where $b$ is the **base** (often $10{,}000$) and $\lambda_i$ the **wavelength** in tokens. The score between positions $m$ and $n$ depends on the angles $(m - n)\theta_i$ ([[transformers/positional-encoding#prop-rope]]).

::: example Which frequencies see a full rotation? {#ex-wavelengths}
For head dimension $d = 128$, base $b = 10{,}000$ and training length $L = 4096$, compute the shortest, middle and longest wavelengths, and count the pairs whose wavelength exceeds $L$.
::: solution
$\lambda_0 = 2\pi = 6.28$ tokens; $\lambda_{32} = 2\pi\cdot10{,}000^{1/2} = 628$; $\lambda_{63} = 2\pi\cdot10{,}000^{126/128} = 54{,}410$ tokens. The wavelength exceeds $4096$ when $10{,}000^{2i/128} > 4096/2\pi = 651.9$, that is $2i/128 > \log_{10}651.9/4 = 0.7036$, $i > 45.03$: pairs $46$ to $63$, $18$ of the $64$. For these low-frequency pairs, training never showed a full rotation; at positions beyond $L$ they produce angles the model has never seen, which is where extrapolation fails.
:::
:::

::: widget plot
f: log10(2*pi*b^(2*x/128)); log10(4096) + 0*x
x: 0, 63
y: 0, 7
sliders: b=10000:10000:1000000:10000
labels: $\log_{10}\lambda_i$, wavelength of pair $i$; training length $4096$
caption: Wavelengths of the $64$ RoPE frequency pairs for $d = 128$ on a logarithmic scale, against the training length $L = 4096$ (horizontal line). Pairs above the line never complete a rotation during training. Raising the base $b$ — Code Llama used $10^6$ — stretches all wavelengths, so that more pairs vary slowly; it is one of the simplest ways to prepare a model for longer contexts.
:::

::: definition Position interpolation (Chen et al., 2023) {#def-pi}
To extend a RoPE model trained on length $L$ to length $L' = sL$ ($s > 1$), **position interpolation** replaces each position $m$ by $m/s$ before computing the rotations — equivalently, divides every frequency by $s$: $\theta_i' = \theta_i/s$. The model is then briefly trained on long sequences.
:::

::: proposition Interpolation keeps angles in range {#prop-pi}
Under position interpolation with factor $s = L'/L$, the angle of every pair at every relative distance $\lvert m - n\rvert < L'$ satisfies $\lvert m - n\rvert\,\theta_i' < L\theta_i$: all relative rotations lie within the range seen in training. Without interpolation, distances up to $L'$ produce angles up to $s$ times larger.
:::

::: proof
$\lvert m - n\rvert\theta_i' = \lvert m - n\rvert\theta_i/s < L'\theta_i/s = L\theta_i$, and during training relative distances ranged over $0, \dots, L - 1$, so angles over $[0, (L-1)\theta_i]$; the interpolated angles lie in $[0, L\theta_i)$, which differs from the trained range by at most one step of $\theta_i$. Without interpolation the largest angle is $(L'-1)\theta_i\approx sL\theta_i$.
:::

Chen et al. extended LLaMA models from $2048$ to up to $32{,}768$ tokens with interpolation and about $1000$ fine-tuning steps, and showed that interpolated attention scores are bounded far more tightly than extrapolated ones. Interpolation has a cost: it compresses the **high** frequencies too, so that neighbouring tokens, which the shortest wavelengths distinguish, become $s$ times harder to tell apart. Two refinements address this.

::: definition NTK-aware scaling and YaRN {#def-yarn}
**NTK-aware scaling** (proposed in 2023 in open-source discussions and analysed by Peng et al.) changes the base instead of the positions: $b' = b\,s^{d/(d-2)}$. **YaRN** (Peng et al., 2024) interpolates each pair according to its wavelength: with $r_i = L/\lambda_i$ (the number of full rotations in the training context) and a ramp $\gamma(r) = 0$ for $r < \alpha$, $1$ for $r > \beta$ and linear in between ($\alpha = 1$, $\beta = 32$ for LLaMA models),

$$
\theta_i' = \big(1 - \gamma(r_i)\big)\,\frac{\theta_i}{s} + \gamma(r_i)\,\theta_i,
$$

so that high-frequency pairs (many rotations) are left unchanged and low-frequency pairs (less than one rotation) are fully interpolated. YaRN also divides the attention logits by a temperature $t$ with $\sqrt{1/t} = 0.1\ln s + 1$.
:::

::: proposition NTK-aware scaling interpolates only the lowest frequencies {#prop-ntk}
With $b' = b\,s^{d/(d-2)}$, the highest frequency is unchanged, $\theta_0' = \theta_0 = 1$, and the lowest is divided by exactly $s$, $\theta_{d/2-1}' = \theta_{d/2-1}/s$, as under position interpolation; the frequencies in between are divided by $s^{2i/(d-2)}$, interpolating smoothly between the two.
:::

::: proof
$\theta_i' = (b')^{-2i/d} = b^{-2i/d}s^{-(d/(d-2))(2i/d)} = \theta_i\,s^{-2i/(d-2)}$. For $i = 0$ the factor is $1$; for $i = d/2 - 1$ the exponent is $-(d-2)/(d-2) = -1$, so the factor is $1/s$.
:::

::: example Choosing the scaling {#ex-scaling}
Extend the model of [[#ex-wavelengths]] from $4096$ to $32{,}768$ tokens. Give the scale factor, the frequencies of the first and last pairs under position interpolation and NTK-aware scaling, the new NTK base, and YaRN's temperature factor.
::: solution
$s = 8$. Position interpolation divides all frequencies by $8$: $\theta_0' = 0.125$ (wavelength $50$ tokens instead of $6.3$), $\theta_{63}' = \theta_{63}/8$. NTK-aware: $b' = 10{,}000\cdot8^{128/126} = 82{,}685$; $\theta_0' = 1$ unchanged and $\theta_{63}' = \theta_{63}/8$, as [[#prop-ntk]] says. YaRN: $\sqrt{1/t} = 0.1\ln8 + 1 = 1.208$, so the logits are multiplied by $1/t = 1.459$ — implemented by multiplying queries and keys each by $1.208$ — which sharpens attention to counter the flattening that comes from attending over more tokens. Position interpolation blurs local word order; NTK-aware scaling and YaRN keep it.
:::
:::

::: widget plot
f: 1/s + 0*x; s^(-2*x/126); (1 - min(1, max(0, (4096/(2*pi*10000^(2*x/128)) - 1)/31)))/s + min(1, max(0, (4096/(2*pi*10000^(2*x/128)) - 1)/31))
x: 0, 63
y: 0, 1.05
sliders: s=8:2:32:1
labels: position interpolation; NTK-aware; YaRN (NTK-by-parts)
caption: The factor $\theta_i'/\theta_i$ by which each RoPE frequency is multiplied when extending a $d = 128$, $b = 10{,}000$, $L = 4096$ model by a factor $s$. Position interpolation shrinks every frequency by $1/s$; NTK-aware scaling leaves the highest frequencies ($i$ near $0$) alone and shrinks the lowest by $1/s$, smoothly in between; YaRN leaves every pair with more than $32$ rotations in the training context untouched, fully interpolates pairs with less than one, and ramps between them.
:::

In practice, several methods change the base and continue training: Code Llama raised the base from $10{,}000$ to $1{,}000{,}000$ and trained on $16$K-token sequences; Xiong et al. (2023) used a base of $500{,}000$ for long-context Llama 2 models; Llama 3.1 extended its context from $8$K to $128$K tokens in six stages over about $800$ billion tokens. Fu et al. (2024) found that a few billion tokens of continued pretraining suffice if long documents are upsampled **within each source**, keeping the domain mixture fixed — upsampling only the sources that happen to have long documents, such as books, shifted the mixture and hurt. Long-context ability must be evaluated with tasks that require the whole context — retrieving a fact placed anywhere in a long input ("needle in a haystack") is a minimum, and suites such as RULER (Hsieh et al., 2024) test multi-hop retrieval and aggregation — since perplexity on long documents can improve while the model ignores most of its context. Serving long contexts raises its own costs ([[inference/long-context]]).

::: quiz
A RoPE model trained at $4096$ tokens is extended to $16{,}384$ by position interpolation. Which statements are true? (Select all that apply.)
- [x] Every relative rotation angle at distances below $16{,}384$ lies within the range seen in training.
- [x] Adjacent tokens become harder to distinguish through the highest-frequency pairs.
- [ ] No further training is needed for good performance.
- [ ] The attention cost per token stays the same as at $4096$ tokens.
::: solution
Interpolation divides all frequencies by $s = 4$, keeping angles in range ([[#prop-pi]]) but also compressing the highest frequencies, which encode local order. Chen et al. still fine-tuned for about $1000$ steps, and quality improves with training on long data. Attention over four times as many tokens costs about four times as much per token.
:::
:::

## Extending the tokeniser {#sec-tokeniser}

A tokeniser trained mostly on English splits text in other scripts into many short pieces: a sentence in a low-resource language may need several times as many tokens as its English translation ([[text-and-language/tokenisation]]). This makes such languages slower and more expensive to process, shortens their effective context, and may hurt quality. One remedy, when adapting a model to a new language or domain, is to **add tokens**.

::: algorithm Vocabulary extension {#alg-vocab}
1. Train a sub-word tokeniser on target-language (or domain) text and select new tokens not in the original vocabulary, typically a few thousand to a few tens of thousands.
2. Append them to the vocabulary, adding rows to the input embedding matrix and the output layer.
3. Initialise each new row — commonly as the mean of the embeddings of the original tokens that the new token's string was split into, so that the model initially treats the new token like its old decomposition (a random or zero initialisation also works but needs more training).
4. Continue pretraining on target-language data with replay; optionally train only the embeddings first, then all parameters.
:::

Cui et al. (2023) added about $20{,}000$ Chinese tokens to LLaMA's $32{,}000$-token vocabulary, roughly halving the number of tokens needed to encode Chinese text, and continued pretraining on Chinese corpora. Vocabulary extension has costs: the new embeddings start untrained, the output softmax grows, and the model's original ability in the new language — learned through the old decomposition — must be transferred to the new tokens. Whether to extend or to keep the original tokeniser and simply continue pretraining is an empirical choice that depends on how badly the original tokeniser fragments the language.

::: example The cost and benefit of new tokens {#ex-vocab}
A model with $d = 4096$ and untied embeddings gains $20{,}000$ tokens. How many parameters are added? If target-language text drops from $2.0$ to $1.1$ tokens per character, by what factor do training and inference cost per character fall, and how much more text fits in a $4096$-token context?
::: solution
Parameters: $2\cdot20{,}000\cdot4096 = 163{,}840{,}000$ — about $2.4\%$ of a $7$-billion-parameter model. Compute per character scales with tokens per character (for a fixed model, [[pretraining/training-loop#prop-6nd]]), so it falls by $2.0/1.1 = 1.82$. A $4096$-token context held $2048$ characters and now holds $3724$, $1.82$ times as much. Attention cost per character falls even more, since attention grows with the square of the sequence length.
:::
:::

::: history
Catastrophic forgetting was described by McCloskey and Cohen (1989) and Ratcliff (1990) and surveyed by French (1999); Kirkpatrick et al. (2017) proposed elastic weight consolidation, and replay (rehearsal) goes back to Robins (1995). For pretrained language models, domain-specific continued pretraining produced BioBERT (Lee et al., 2019) and SciBERT (Beltagy et al., 2019), and Gururangan et al. (2020) systematised domain- and task-adaptive pretraining. Large-scale examples include Minerva (2022), Code Llama (2023) and Llemma (2023). Gupta et al. (2023) and Ibrahim et al. (2024) studied re-warming and replay for continual pretraining of large models. For context extension, Chen et al. (2023) introduced position interpolation; NTK-aware scaling emerged from open-source experiments in 2023; Peng et al. (2023, published 2024) introduced YaRN, and Xiong et al. (2023) and Fu et al. (2024) studied the base frequency and data for long-context continued pretraining. Cui et al. (2023) extended LLaMA's vocabulary for Chinese.
:::

::: summary
- **Continued pretraining** reuses a base model and trains it with the pretraining loss on new data, at a few percent of the cost of a new run; **domain-adaptive** and **task-adaptive** pretraining improve in-domain performance (Gururangan et al., 2020).
- **Catastrophic forgetting** is, to second order, $\frac12\Delta^\top H_p\Delta$: moving along high-curvature directions of the old loss costs most. **Replay** of original data, **re-warming and re-decaying** the learning rate, and penalties such as EWC limit it; replay is the standard at scale.
- **Context extension** for RoPE models must keep rotation angles in the trained range: **position interpolation** divides all frequencies by $s$; **NTK-aware scaling** ($b' = bs^{d/(d-2)}$) interpolates only low frequencies; **YaRN** interpolates by wavelength and rescales attention; raising the base and training on long documents (upsampled within each source) is common.
- Evaluate long context with tasks that need the whole context, not only perplexity.
- **Tokeniser extension** adds tokens for a new language or domain, initialised from their old decompositions, cutting tokens per character at the cost of new untrained embeddings.
- Always measure what the adaptation costs on the base model's general abilities, not just what it gains on the target.
:::

## Exercises

::: exercise Replay fraction {level=1 check="40"}
A continued-pretraining run has $200$ billion tokens with $20\%$ replay. How many billion tokens of original data are replayed?
::: solution
$0.2\cdot200 = 40$ billion tokens.
:::
:::

::: exercise Interpolation factor {level=1 check="16"}
A RoPE model trained at $8192$ tokens is extended to $131{,}072$ tokens by position interpolation. What is the factor $s$ by which frequencies are divided?
::: solution
$s = 131{,}072/8192 = 16$.
:::
:::

::: exercise Forgetting estimate {level=1 check="0.065"}
The old loss has Hessian $H_p = \operatorname{diag}(4, 1)$ at $\theta_0$ and continued pretraining moves the parameters by $\Delta = (0.1, 0.3)$. Estimate the increase in the old loss with [[#eq-forgetting]].
::: solution
$\tfrac12\Delta^\top H_p\Delta = \tfrac12(4\cdot0.1^2 + 1\cdot0.3^2) = \tfrac12(0.04 + 0.09) = 0.065$. The larger move along the flat direction contributes more than twice as much as the small move along the stiff one.
:::
:::

::: exercise NTK base {level=2 check="1.75e5"}
For head dimension $d = 64$, base $b = 10{,}000$ and extension factor $s = 16$, compute the NTK-aware base $b' = bs^{d/(d-2)}$ to three significant figures.
::: solution
$d/(d-2) = 64/62 = 1.0323$; $16^{1.0323} = e^{1.0323\cdot2.7726} = e^{2.8620} = 17.50$; $b' = 10{,}000\cdot17.50 = 175{,}000$ (more precisely $174{,}970$). The exponent slightly above $1$ makes the lowest frequency fall by exactly $16$.
:::
:::

::: exercise Wavelength beyond the context {level=2 check="45"}
In [[#ex-wavelengths]], the pairs with wavelength greater than $L = 4096$ are $i > 45.03$. What is the largest index $i$ whose wavelength is at most $4096$?
::: solution
$i = 45$: $\lambda_{45} = 2\pi\cdot10{,}000^{90/128} = 2\pi\cdot649.4 = 4080$ tokens, just under $4096$; $\lambda_{46} = 2\pi\cdot10{,}000^{92/128} = 2\pi\cdot749.9 = 4712$.
:::
:::

::: exercise YaRN's ramp {level=2}
For the model of [[#ex-wavelengths]] ($L = 4096$) with $\alpha = 1$, $\beta = 32$, classify the pairs $i = 0$, $20$, $35$ and $50$ by YaRN's ramp: which are left unchanged, which fully interpolated, and which partly?
::: solution
$r_i = L/\lambda_i = 4096/(2\pi\cdot10{,}000^{2i/128})$. $i = 0$: $r = 652$, above $\beta$, unchanged. $i = 20$: $\lambda = 2\pi\cdot10{,}000^{0.3125} = 2\pi\cdot17.78 = 111.7$, $r = 36.7 > 32$, unchanged. $i = 35$: $\lambda = 2\pi\cdot10{,}000^{0.5469} = 2\pi\cdot153.9 = 967$, $r = 4.24$, between $1$ and $32$: $\gamma = (4.24 - 1)/31 = 0.104$, mostly interpolated. $i = 50$: $\lambda = 2\pi\cdot10{,}000^{0.78125} = 2\pi\cdot1333.5 = 8379$, $r = 0.49 < 1$, fully interpolated.
:::
:::

::: exercise Embedding initialisation {level=2}
A new token "tion" was previously split into "ti" and "on", whose input embeddings are $\mathbf e_{\text{ti}}$ and $\mathbf e_{\text{on}}$. Explain why initialising the new embedding as $\frac12(\mathbf e_{\text{ti}} + \mathbf e_{\text{on}})$ is better than a random vector, and what problem remains for the output embedding.
::: solution
The model has learned to process "ti" followed by "on" as the string "tion"; after the first layers its representation of such a pair carries the meaning of "tion". The mean of the two embeddings is not identical to that two-token computation, but it lies in the region of embedding space the model knows, carrying features of both pieces, so the first forward passes produce sensible representations and the token can be refined quickly; a random vector is initially meaningless noise of the wrong scale. For the output layer, the new row determines how often "tion" is predicted: initialised like the inputs, it competes with the old pieces "ti" and "on", and the model must learn to prefer the single new token where the tokeniser will now produce it. Until it does, the probabilities of the new token are miscalibrated, which is one reason vocabulary extension needs continued pretraining rather than just a tokeniser swap.
:::
:::

::: exercise Replay as a mixture {level=3}
Show that the gradient of $\mathcal{L}_{\text{CPT}}$ in [[#def-continued]] at $\theta_0$ (a minimum of the old loss) is $(1-\rho)\nabla\mathcal L_q(\theta_0)$, so that replay does not slow the start of adaptation; then use [[#prop-forgetting]] to explain why replay nevertheless limits forgetting later. In the listing, how did the new-domain loss and the old-domain loss change between $0\%$ and $25\%$ replay?
::: solution
$\nabla\mathcal L_{\text{CPT}} = (1-\rho)\nabla\mathcal L_q + \rho\nabla\mathcal L_p$, and $\nabla\mathcal L_p(\theta_0) = 0$ at a minimum, leaving $(1-\rho)\nabla\mathcal L_q(\theta_0)$: the first steps go in the direction of the new loss, only slightly shortened. As the parameters move by $\Delta$, $\nabla\mathcal L_p(\theta_0 + \Delta)\approx H_p\Delta$ grows, pulling back along exactly the high-curvature directions that [[#eq-forgetting]] says are costly. The run settles where $(1-\rho)\nabla\mathcal L_q = -\rho H_p\Delta$, a compromise that moves less along stiff directions of the old loss. In the listing, $25\%$ replay raised the new-domain loss from $1.844$ to $1.968$ ($+0.12$) and lowered the old-domain loss from $3.075$ to $2.114$ ($-0.96$).
:::
:::

::: exercise Planning a long-context extension {level=3}
A team wants to extend a $7$-billion-parameter model from $8$K to $64$K tokens with $5$ billion tokens of continued pretraining. Using $C\approx(6N + 6n_{\text{layer}}Td)$ per token with $n_{\text{layer}} = 32$, $d = 4096$ ([[pretraining/training-loop#prop-6nd]]), estimate the compute at $T = 65{,}536$, and compare it with the same number of tokens at $T = 8192$. Then describe the data it should use and how it should be evaluated.
::: solution
At $T = 65{,}536$: per token $6\cdot7\times10^9 + 6\cdot32\cdot65{,}536\cdot4096 = 4.2\times10^{10} + 5.15\times10^{10} = 9.35\times10^{10}$ FLOPs; for $5\times10^9$ tokens, $4.7\times10^{20}$ FLOPs. At $T = 8192$: $4.2\times10^{10} + 6.4\times10^9 = 4.84\times10^{10}$ per token, $2.4\times10^{20}$ in all. Long sequences nearly double the cost per token, but the total is still well under $1\%$ of the base model's pretraining ($8.4\times10^{22}$ for $2$ trillion tokens). Data: the base mixture with long documents upsampled within each source (books, long web pages, code repositories concatenated by project), plus replay of short data so short-context ability is kept; the RoPE base raised or YaRN applied. Evaluation: short-context benchmarks before and after (to detect forgetting), perplexity as a function of position in long documents, needle-in-a-haystack retrieval across depths and lengths, and harder long-context suites such as RULER.
:::
:::
