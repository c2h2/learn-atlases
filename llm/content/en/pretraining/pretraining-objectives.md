A pretrained language model learns from raw text, with no human labels. The text supplies its own supervision: hide part of it, and ask the model to recover what was hidden. Which part is hidden, and how the model is allowed to look at the rest, is the **pretraining objective**. The choice decides what the model can later do. A model trained to predict the next token can generate text and assign a probability to any document. A model trained to fill in masked words builds rich representations of a whole sentence but cannot generate fluently. A model trained to reconstruct corrupted spans sits between the two.

This chapter defines the main objectives exactly: causal language modelling with teacher forcing, masked language modelling, span corruption, prefix language modelling, denoising, fill-in-the-middle and, as a research direction, multi-token prediction. It proves the two facts that make next-token prediction so attractive: the chain rule turns it into an exact model of the probability of text, and minimising its loss is the same as minimising the code length of the text, so a better language model is a better compressor. The architectures that go with each objective were introduced in [[transformers/architecture-families]]; perplexity and its relation to cross-entropy are covered in [[text-and-language/perplexity]].

## Self-supervision {#sec-self-supervision}

Labelled data are expensive: a few million sentences tagged by hand would be a large dataset. Unlabelled text is plentiful: the public web alone offers trillions of tokens ([[pretraining/training-data]]). **Self-supervised learning** turns unlabelled data into a supervised problem by constructing inputs and targets from the data themselves.

::: definition Pretraining objective {#def-objective}
Let $\mathbf{x} = (x_1, \dots, x_T)$ be a sequence of tokens from a vocabulary $\mathcal{V}$, drawn from a corpus with distribution $p_{\text{data}}$. A **pretraining objective** is specified by a (possibly random) **corruption** $c$ that maps $\mathbf{x}$ to a model input $\tilde{\mathbf{x}}$ and a set of target positions $\mathcal{T}$ with target tokens $y_i$, $i \in \mathcal{T}$. The model $p_\theta$ is trained to minimise the expected cross-entropy of the targets given the input,

$$
\mathcal{L}(\theta) = \E_{\mathbf{x}\sim p_{\text{data}}}\,\E_{c}\Big[-\sum_{i\in\mathcal{T}}\log p_\theta\big(y_i \mid \tilde{\mathbf{x}}, \text{context allowed for } i\big)\Big].
$$ {#eq-objective}

In practice the expectation is replaced by an average over mini-batches, and the loss is normalised by the number of targets.
:::

The objectives of this chapter differ in three choices: **what is hidden** (the next token, random tokens, random spans, the middle of a document), **what each prediction may see** (only the past, both sides, a bidirectional prefix), and **how many targets each sequence yields**. The last matters for efficiency: compute is spent on every token of the input, so an objective that makes every position a target extracts more signal per FLOP.

## Causal language modelling {#sec-causal}

The simplest corruption hides the future. At position $t$ the model sees $x_1, \dots, x_t$ and must predict $x_{t+1}$.

::: definition Causal language modelling {#def-clm}
A **causal language model** defines conditional distributions $p_\theta(x_t \mid x_{<t})$ over $\mathcal{V}$ for every $t$, where $x_{<t} = (x_1, \dots, x_{t-1})$ (for $t=1$ the context is empty, or a beginning-of-sequence token). The **causal language-modelling loss** of a sequence is the average next-token cross-entropy

$$
\mathcal{L}_{\text{CLM}}(\theta; \mathbf{x}) = -\frac{1}{T}\sum_{t=1}^{T}\log p_\theta(x_t \mid x_{<t}).
$$ {#eq-clm}
:::

Two facts make this objective special. The first is that it is not an approximation: it models the probability of the whole sequence exactly.

::: proposition The chain-rule factorisation {#prop-chain}
For any joint distribution $p$ on sequences of length $T$,

$$
p(x_1, \dots, x_T) = \prod_{t=1}^{T} p(x_t \mid x_{<t}),
$$ {#eq-chain}

so $T\cdot\mathcal{L}_{\text{CLM}}(\theta; \mathbf{x}) = -\log p_\theta(\mathbf{x})$: the summed causal loss is exactly the negative log-likelihood of the sequence under the model's joint distribution. Conversely, any family of conditionals $p_\theta(\cdot\mid x_{<t})$ that are each probability distributions defines a valid joint distribution by [[#eq-chain]].
:::

::: proof
By the definition of conditional probability, $p(x_1, \dots, x_t) = p(x_t\mid x_{<t})\,p(x_1, \dots, x_{t-1})$ whenever the right-hand side is defined. Applying this for $t = T, T-1, \dots, 2$ and multiplying gives [[#eq-chain]] (this is [[math-for-ml/probability#prop-chain-rule]]). Taking logarithms turns the product into the sum in [[#eq-clm]]. For the converse, define $q(\mathbf{x}) = \prod_t p_\theta(x_t\mid x_{<t})$. It is non-negative, and summing over $x_T$ first, then $x_{T-1}$, and so on, each inner sum $\sum_{x_t}p_\theta(x_t\mid x_{<t})$ equals $1$, so $\sum_{\mathbf{x}}q(\mathbf{x}) = 1$.
:::

The second fact is that the objective has the right minimiser. If the model class is rich enough, the best model is the data distribution itself.

::: proposition Cross-entropy is minimised by the data distribution {#prop-minimiser}
For a fixed context $x_{<t}$, let $p^\star = p_{\text{data}}(\cdot\mid x_{<t})$ and let $q$ be any distribution on $\mathcal{V}$. Then

$$
\E_{x_t\sim p^\star}\big[-\log q(x_t)\big] = H(p^\star) + D_{\mathrm{KL}}(p^\star\,\Vert\,q) \;\ge\; H(p^\star),
$$ {#eq-ce-decomp}

with equality if and only if $q = p^\star$. Hence the expected causal loss is minimised exactly when every conditional of the model matches the data's conditional, and its minimum value is the conditional entropy of the data, which no model can beat.
:::

::: proof
Write $-\log q(x) = -\log p^\star(x) + \log\big(p^\star(x)/q(x)\big)$ and take expectations under $p^\star$: the first term gives the entropy $H(p^\star)$ and the second the Kullback–Leibler divergence. By Gibbs' inequality ([[math-for-ml/information-theory#thm-gibbs]]) the divergence is non-negative and is zero only when $q = p^\star$. The expected loss over contexts is a weighted sum of such terms, each minimised separately.
:::

The irreducible part $H(p^\star)$ is why the loss of a language model never reaches zero: text is genuinely uncertain. Scaling laws ([[scaling/scaling-laws]]) model the loss as this floor plus terms that shrink with model size and data, and only the latter can be reduced by training.

### Teacher forcing {#sec-teacher-forcing}

During training the model is always conditioned on the **true** previous tokens, not on its own predictions.

::: definition Teacher forcing {#def-teacher-forcing}
**Teacher forcing** trains a sequence model by feeding the ground-truth prefix $x_{<t}$ as the context for every prediction of $x_t$, regardless of what the model would have generated. For a sequence of token ids of length $T+1$, the input is the first $T$ tokens and the target the last $T$ tokens, shifted by one position.
:::

With a causal mask ([[transformers/multi-head-attention#def-causal-mask]]), teacher forcing lets a Transformer compute all $T$ conditionals in **one** forward pass: the output at position $t$ depends only on inputs $1, \dots, t$ ([[transformers/multi-head-attention#prop-causal]]), so it can be compared with the target $x_{t+1}$ without leaking the answer. A recurrent network also uses teacher forcing, but must still process the positions one after another ([[sequence-models/recurrent-networks]]). This parallelism is a large part of why Transformers displaced recurrent networks for pretraining.

::: example Shapes of one training step {#ex-shapes}
A batch holds $B = 8$ sequences of $T+1 = 2049$ token ids from a vocabulary of $\lvert\mathcal{V}\rvert = 50{,}257$. Give the shapes of the inputs, targets, logits and losses, and the number of prediction targets in the batch.
::: solution
Inputs are the first $2048$ ids of each row and targets the last $2048$: both have shape $(B, T) = (8, 2048)$. The model returns logits of shape $(B, T, \lvert\mathcal{V}\rvert) = (8, 2048, 50257)$ — about $8.2\times10^8$ numbers, $1.6$ GB in bfloat16, which is why implementations compute the cross-entropy in chunks or fuse it with the output layer. Indexing the log-softmax at the targets gives per-token losses of shape $(8, 2048)$, averaged to one scalar. Every position is a target: $8\cdot2048 = 16{,}384$ targets per batch.
:::
:::

::: example A causal loss by hand {#ex-loss-hand}
A model reads the four-token sequence *the cat sat down* and assigns the probabilities $p(\textit{the}) = 0.05$, $p(\textit{cat}\mid\textit{the}) = 0.01$, $p(\textit{sat}\mid\textit{the cat}) = 0.2$, $p(\textit{down}\mid\textit{the cat sat}) = 0.4$. Compute the log-probability of the sequence, its causal loss per token in nats and bits, and the perplexity.
::: solution
By [[#prop-chain]], $\log p(\mathbf{x}) = \ln0.05 + \ln0.01 + \ln0.2 + \ln0.4 = -2.996 - 4.605 - 1.609 - 0.916 = -10.127$ nats, so $p(\mathbf{x}) = 4\times10^{-5}$ (indeed $0.05\cdot0.01\cdot0.2\cdot0.4 = 4\times10^{-5}$). The loss per token is $10.127/4 = 2.532$ nats, or $2.532/\ln2 = 3.652$ bits (from the unrounded $2.5317$ nats). The perplexity is $e^{2.532} = 12.6$: on average the model is as uncertain as if it were choosing uniformly among about $12.6$ tokens.
:::
:::

::: warning Teacher forcing hides the model's own mistakes
A low training loss means the model predicts the next token well **when its context is real text**. At generation time the context is the model's own output, which may contain errors it never saw during training; this mismatch is called **exposure bias** (Ranzato et al., 2016). Proposals to train on the model's own samples, such as scheduled sampling (Bengio et al., 2015), exist, but large language models are pretrained with plain teacher forcing, and how much exposure bias matters at scale is debated. Do not read a low perplexity as a guarantee that long generated texts will stay coherent.
:::

### Next-token prediction as compression {#sec-compression}

Shannon's source-coding theorem ([[math-for-ml/information-theory#thm-source-coding]]) says that the best possible code for symbols from a distribution $p$ uses about $-\log_2 p(x)$ bits for symbol $x$, and arithmetic coding achieves this to within a couple of bits for a whole message. Applied token by token with a language model, this makes the causal loss a code length.

::: proposition Loss equals code length {#prop-compression}
Let a causal model $p_\theta$ be used with arithmetic coding to encode a sequence $\mathbf{x}$ of $T$ tokens, where encoder and decoder both run the model to obtain each conditional distribution. The length of the code is at most $-\log_2 p_\theta(\mathbf{x}) + 2$ bits, that is, $T\cdot\mathcal{L}_{\text{CLM}}/\ln 2 + 2$ bits. If the text has $n_{\text{bytes}}$ bytes, the compression rate is

$$
\text{bits per byte} = \frac{\mathcal{L}_{\text{CLM}}}{\ln 2}\cdot\frac{T}{n_{\text{bytes}}}.
$$ {#eq-bpb}
:::

::: proof
Arithmetic coding with model probabilities $q(\mathbf{x})$ assigns the message an interval of width $q(\mathbf{x})$ inside $[0, 1)$, and any interval of width $w$ contains a dyadic number with at most $\lceil-\log_2 w\rceil + 1 \le -\log_2 w + 2$ binary digits, which identifies the message. With $q(\mathbf{x}) = p_\theta(\mathbf{x}) = \prod_tp_\theta(x_t\mid x_{<t})$ (by [[#prop-chain]]) the width is $p_\theta(\mathbf{x})$, and $-\log_2p_\theta(\mathbf{x}) = T\mathcal{L}_{\text{CLM}}/\ln2$ by [[#eq-clm]]. The decoder can reconstruct the same intervals because it runs the same model on the tokens it has already decoded. Dividing by the number of bytes gives [[#eq-bpb]].
:::

Bits per byte is the fair way to compare models with different tokenisers: a loss per token depends on how much text a token holds ([[text-and-language/tokenisation]]), but a loss per byte of the original text does not. Delétang et al. (2024) made the compression view concrete by using large language models as general-purpose compressors, including for images and audio fed in as bytes. The view also explains why next-token prediction teaches so much: to compress text about chemistry, translations or programs well, a model must capture the regularities of chemistry, translation and programming. It is a reason to expect learning, not a proof that any particular ability will appear.

::: widget plot
f: -log2(x)
x: 0.001, 1
y: 0, 10
points: 0.5,1; 0.25,2; 0.125,3; 0.01,6.644
labels: code length $-\log_2 p$ in bits
caption: The ideal code length of a token that the model gave probability $p$. A token predicted with probability $1/2$ costs one bit, a token with $1/8$ costs three bits, and a token the model thought nearly impossible ($p = 0.01$) costs $6.6$ bits. The average of this curve over the text is the causal loss in bits, so training the model to raise the probabilities of what actually comes next is training it to compress.
:::

::: example Bits per byte {#ex-bpb}
A model reaches a validation loss of $2.0$ nats per token on English text, where its tokeniser produces on average one token per $4.2$ bytes. What is its compression rate in bits per byte, and how does it compare with general-purpose compressors, which typically reach roughly $2$ to $3$ bits per byte on English text?
::: solution
$2.0/\ln2 = 2.885$ bits per token, and $2.885/4.2 = 0.687$ bits per byte by [[#eq-bpb]] — roughly three to four times better than a typical general-purpose compressor. The comparison is not quite fair, because the decoder must also hold the model, which is many gigabytes; the compression view is about how well the model predicts, not a practical way to store files.
:::
:::

### A tiny causal language model {#sec-code}

The listing trains the smallest causal language model there is — a **bigram** model, whose context is only the previous character — on a public-domain passage from Dickens, by gradient descent on the loss [[#eq-clm]] with teacher forcing. A table $W$ of $V\times V$ logits gives $p_\theta(x_{t+1}\mid x_t) = \operatorname{softmax}(W_{x_t,:})$, and the gradient of the cross-entropy with respect to the logits is the predicted distribution minus the one-hot target ([[math-for-ml/gradients#prop-softmax-ce]]).

```python
import math, random

text = ("it was the best of times, it was the worst of times, it was the age of "
        "wisdom, it was the age of foolishness, it was the epoch of belief, it was "
        "the epoch of incredulity, it was the season of light, it was the season of "
        "darkness, it was the spring of hope, it was the winter of despair, we had "
        "everything before us, we had nothing before us, we were all going direct to "
        "heaven, we were all going direct the other way")   # Dickens, 1859: public domain
chars = sorted(set(text)); V = len(chars)
ids = [chars.index(c) for c in text]                # the token sequence x_1..x_T
inputs, targets = ids[:-1], ids[1:]                 # teacher forcing: predict x_{t+1} from x_t
print(f"T = {len(ids)} characters, vocabulary V = {V}, ln V = {math.log(V):.4f}")

rng = random.Random(0)
W = [[rng.gauss(0, 0.01) for _ in range(V)] for _ in range(V)]   # logits table, shape (V, V)

def loss_and_grad(W):
    G = [[0.0] * V for _ in range(V)]
    total = 0.0
    for a, b in zip(inputs, targets):
        row = W[a]; m = max(row)
        e = [math.exp(z - m) for z in row]; s = sum(e)
        total += -(row[b] - m - math.log(s))         # -log p(b | a)
        for j in range(V):
            G[a][j] += e[j] / s                      # d loss / d logit = p - onehot
        G[a][b] -= 1.0
    n = len(targets)
    return total / n, [[g / n for g in r] for r in G]

lr, curve = 20.0, []
for step in range(301):
    L, G = loss_and_grad(W)
    curve.append(L)
    if step % 50 == 0:
        print(f"step {step:3d}  loss {L:.4f} nats/char  = {L / math.log(2):.3f} bits/char")
    for i in range(V):
        for j in range(V):
            W[i][j] -= lr * G[i][j]

# the best a bigram model can do on this text: the conditional entropy from counts
from collections import Counter
pair, first = Counter(zip(inputs, targets)), Counter(inputs)
H = -sum(c * math.log(c / first[a]) for (a, b), c in pair.items()) / len(targets)
print(f"count-based optimum {H:.4f} nats/char = {H / math.log(2):.3f} bits/char")
print("bits to encode the text:", round(len(targets) * curve[-1] / math.log(2)),
      "vs", round(len(targets) * math.log2(V)), "uniform")
```

```text
T = 416 characters, vocabulary V = 24, ln V = 3.1781
step   0  loss 3.1782 nats/char  = 4.585 bits/char
step  50  loss 1.7263 nats/char  = 2.491 bits/char
step 100  loss 1.6655 nats/char  = 2.403 bits/char
step 150  loss 1.6456 nats/char  = 2.374 bits/char
step 200  loss 1.6362 nats/char  = 2.361 bits/char
step 250  loss 1.6308 nats/char  = 2.353 bits/char
step 300  loss 1.6273 nats/char  = 2.348 bits/char
count-based optimum 1.6115 nats/char = 2.325 bits/char
bits to encode the text: 974 vs 1903 uniform
```

The loss starts at $\ln V = 3.178$, as it must for near-uniform predictions, and approaches the count-based optimum $1.6115$ — the conditional entropy of the next character given the current one on this text, which by [[#prop-minimiser]] is the floor for any bigram model (the counts are the maximum-likelihood bigram estimate, [[math-for-ml/estimation#ex-bigram]]). Read as compression ([[#prop-compression]]), the trained model would encode the $415$ predicted characters in about $974$ bits instead of the $1903$ bits of a uniform code over $24$ symbols. This is a training loss on a tiny text, so it says nothing about generalisation; the point is the mechanics, which are identical for a Transformer with a vocabulary of $10^5$ tokens and a context of $10^4$ — only the function that produces the logits changes.

::: widget plot
f: 1.6115 + 0*x; 3.1781 + 0*x
x: 0, 300
y: 1.4, 3.3
points: 0,3.178; 20,1.873; 40,1.755; 60,1.707; 80,1.681; 100,1.666; 120,1.655; 140,1.648; 160,1.643; 180,1.639; 200,1.636; 220,1.634; 240,1.632; 260,1.630; 280,1.629; 300,1.627
labels: count-based optimum $1.6115$; uniform $\ln 24$
caption: Training loss (nats per character, dots every $20$ steps) of the bigram model in the listing. It falls quickly from the uniform loss $\ln V$ and then creeps towards the best loss a bigram model can reach on this text. The gap that remains is the optimisation error; the floor itself is the conditional entropy of the text under a one-character context, which a model with longer context could go below.
:::

## Masked language modelling {#sec-mlm}

A causal model reads only to the left. For tasks that receive a whole text — classifying it, tagging its words, embedding it for search — it is natural to let every position see both sides. But a bidirectional model cannot be trained to predict the next token, because the next token is visible to it. BERT (Devlin et al., 2019) solved this by hiding tokens instead of the future.

::: definition Masked language modelling (BERT) {#def-mlm}
In **masked language modelling** a random $15\%$ of the positions are chosen as targets. Each chosen token is replaced by a special `[MASK]` token with probability $0.8$, by a uniformly random token with probability $0.1$, and left unchanged with probability $0.1$. A bidirectional encoder reads the corrupted sequence and is trained with the cross-entropy of the original tokens at the target positions only:

$$
\mathcal{L}_{\text{MLM}} = -\frac{1}{\lvert\mathcal{T}\rvert}\sum_{i\in\mathcal{T}}\log p_\theta(x_i\mid\tilde{\mathbf{x}}).
$$
:::

The 80/10/10 rule and its rationale are discussed in [[transformers/architecture-families#def-mlm]]: because `[MASK]` never occurs in real inputs, the model must be prevented from learning good representations only at masked positions. BERT also used a second objective, **next-sentence prediction** (is sentence B the real continuation of sentence A?), which RoBERTa (Liu et al., 2019) found unnecessary; RoBERTa also drew a fresh mask every time a sequence was seen (**dynamic masking**) and trained much longer on more data. **Whole-word masking** masks all sub-word pieces of a word together, so that the model cannot recover *##ing* trivially from *play*.

Masked language modelling pays for bidirectionality twice. It provides only $15\%$ as many targets per sequence as causal modelling ([[transformers/architecture-families#prop-targets]]), and the product of its conditionals is not a joint distribution, so the model cannot generate text or score a document directly. Why not mask more? With a high masking rate too little context remains to make the prediction well defined; with a low one each sequence yields few targets. Wettig et al. (2023) found that rates around $40\%$ can work better than $15\%$ for large BERT-style models, so $15\%$ is a convention rather than an optimum.

::: widget distribution
dist: binomial
params: n=128, p=0.15
a: 15
b: 23
caption: The number of masked positions in a $128$-token sequence when each position is a target independently with probability $0.15$: mean $19.2$, standard deviation $\sqrt{128\cdot0.15\cdot0.85} = 4.04$. Change $p$ to see the trade-off — more targets per sequence, but less visible context for each of them. Implementations often fix the count instead, masking exactly $\operatorname{round}(0.15\,T)$ positions.
:::

**ELECTRA** (Clark et al., 2020) recovers the lost signal differently. A small generator fills masked positions with plausible tokens, and the main model, the **discriminator**, predicts for *every* position whether its token is original or replaced. Every position is now a (binary) target, and ELECTRA matched the downstream accuracy of RoBERTa with a fraction of its training compute. **XLNet** (Yang et al., 2019) took another route, a causal objective over a random permutation of the positions, which keeps a proper joint distribution while giving each token bidirectional context on average.

## Span corruption and denoising {#sec-spans}

Masking individual tokens teaches the model to recover words from their neighbours. Hiding longer **spans** asks for more: a phrase or clause must be reconstructed from the surrounding text. With an encoder–decoder ([[transformers/architecture-families#sec-encdec]]) the output need not have the same length as the input, which allows both shorter inputs and variable-length answers.

::: definition Span corruption (T5) {#def-span-corruption}
In **span corruption** (Raffel et al., 2020), a fraction $r$ of the tokens (T5 used $r = 0.15$) is selected in contiguous spans with mean length $\mu$ (T5: $\mu = 3$). Each span in the input is replaced by a single **sentinel** token, a distinct one per span (`<X>`, `<Y>`, … in the paper; `<extra_id_0>`, `<extra_id_1>`, … in the released vocabulary). The target sequence lists each sentinel followed by the tokens it replaced, and ends with a final sentinel. An encoder reads the corrupted input; a decoder generates the target with the causal loss.
:::

For the sentence *Thank you for inviting me to your party last week*, with *for inviting* and *last* dropped, the input is *Thank you `<X>` me to your party `<Y>` week* and the target is *`<X>` for inviting `<Y>` last `<Z>`*. The decoder's loss is a causal loss over a short target, so every target token, including the sentinels, is trained.

::: example Span corruption in numbers {#ex-span}
A T5 training example has $T = 512$ tokens, corruption rate $r = 0.15$ and mean span length $\mu = 3$. Estimate the number of spans, the length of the encoder input and the length of the decoder target, and compare the cost with masked language modelling.
::: solution
Corrupted tokens: $0.15\cdot512 = 76.8$, in $76.8/3 = 25.6$ spans on average. The encoder input keeps $512 - 76.8 = 435.2$ tokens plus one sentinel per span, $435.2 + 25.6 = 460.8$ tokens. The target holds one sentinel per span, the $76.8$ dropped tokens and a final sentinel: $25.6 + 76.8 + 1 \approx 103.4$ tokens. So span corruption makes the input about $10\%$ shorter than the original and the target only a fifth as long, which Raffel et al. noted as a speed advantage over objectives that reconstruct the whole text. As in masked language modelling, only about $15\%$ of the original tokens are prediction targets.
:::
:::

::: definition Denoising autoencoder objective (BART) {#def-denoising}
A **denoising** objective corrupts a document by one or more noising functions and trains a model — in BART (Lewis et al., 2020), an encoder–decoder — to output the **entire original document** with the causal loss. BART compared token masking, token deletion, **text infilling** (spans with lengths drawn from a Poisson distribution with $\lambda = 3$ are each replaced by a single `[MASK]`, including spans of length zero), sentence permutation and document rotation; its final model used text infilling, masking $30\%$ of the tokens, together with sentence permutation.
:::

Because the decoder must reproduce the whole document, BART's objective resembles causal language modelling conditioned on a noisy copy, which made it strong at generation tasks such as summarisation. Raffel et al. compared many such variants on the same budget and found the differences between reasonable corruption schemes small; the choice of architecture and the amount of data mattered more. UL2 (Tay et al., 2023) proposed training one model on a **mixture of denoisers** — short spans, long spans with heavy corruption, and a prefix-LM-like sequential denoiser — with a token telling the model which mode it is in.

::: definition Prefix language modelling {#def-prefix-lm}
A **prefix language model** splits each sequence at a point $P$ into a prefix $x_{\le P}$ and a continuation $x_{>P}$. Attention is bidirectional within the prefix and causal afterwards, and the loss is the causal loss on the continuation only:

$$
\mathcal{L}_{\text{prefix}} = -\frac{1}{T-P}\sum_{t=P+1}^{T}\log p_\theta(x_t\mid x_{<t}).
$$
:::

The prefix LM (used in UniLM, Dong et al., 2019, and as a variant in T5) reads its input like an encoder and writes its output like a decoder, with a single stack of parameters. Its weakness is the one shared by all conditional objectives: positions in the prefix are not targets, so a split point at the middle of a sequence halves the training signal compared with causal modelling.

::: quiz
For a sequence of $T = 1000$ tokens, which objective gives the most prediction targets per forward pass?
- [x] Causal language modelling
- [ ] Masked language modelling with a $15\%$ rate
- [ ] Span corruption with a $15\%$ rate and mean span $3$
- [ ] A prefix language model with the split point at $P = 500$
::: solution
Causal modelling makes every position a target: $1000$. Masked modelling gives on average $150$; span corruption about $150$ dropped tokens plus about $51$ sentinels in the target; the prefix LM $500$. This is the efficiency argument for causal pretraining ([[transformers/architecture-families#prop-targets]]), though the targets are not equally hard: a masked token with context on both sides is easier to predict than a next token.
:::
:::

## Fill-in-the-middle {#sec-fim}

A causal model generates at the end of a text, but many uses need insertion: completing a function body in the middle of a source file, with code both above and below the cursor. Bavarian et al. (2022) showed that a causal model can learn this with a simple data transformation and no change of architecture or loss.

::: definition Fill-in-the-middle transformation {#def-fim}
With probability $\rho$ (the **FIM rate**), a training document is split at two positions chosen uniformly at random into a prefix, a middle and a suffix. In the **PSM** (prefix–suffix–middle) format the document is rearranged as

`<PRE>` prefix `<SUF>` suffix `<MID>` middle `<EOT>`

with special sentinel tokens, and trained with the ordinary causal loss on the whole rearranged sequence. In the **SPM** variant the suffix comes first. With probability $1-\rho$ the document is left unchanged. At inference time the model is given `<PRE>` prefix `<SUF>` suffix `<MID>` and generates the middle, stopping at `<EOT>`.
:::

Because the middle comes last in the rearranged sequence, generating it is ordinary left-to-right generation, conditioned on both the prefix and the suffix. Bavarian et al. trained models at FIM rates up to $0.9$ and reported that their left-to-right performance was essentially unchanged — they called this "FIM-for-free" — while the models learned to infill; they recommended splitting at the character level rather than at token boundaries, so that the model learns to complete partial tokens. Many code models released since use FIM during pretraining, typically at rates around $0.5$.

::: example A FIM training example {#ex-fim}
Apply the PSM transformation to the line of code `def area(r): return 3.14159 * r * r` with the split points after `def area(r):` and after `return`. What does the model see at inference time to complete the body?
::: solution
Prefix `def area(r):`, middle ` return`, suffix ` 3.14159 * r * r`. The training sequence is `<PRE>def area(r):<SUF> 3.14159 * r * r<MID> return<EOT>`, and the causal loss is applied to all of it — including the prefix and suffix tokens, which are predicted left to right like any text. At inference the model receives `<PRE>def area(r):<SUF> 3.14159 * r * r<MID>` and should generate ` return<EOT>`. Splitting inside a word, for example between `ret` and `urn`, would teach the model to continue partial tokens.
:::
:::

## Multi-token prediction (research) {#sec-mtp}

The causal objective asks for one token at a time. **Multi-token prediction** asks the model, at each position, to predict several future tokens: $x_{t+1}, x_{t+2}, \dots, x_{t+k}$.

::: definition Multi-token prediction {#def-mtp}
A **multi-token prediction** model with horizon $k$ computes a shared representation $\mathbf{h}_t$ of $x_{\le t}$ and has $k$ output heads, head $j$ giving a distribution $p^{(j)}_\theta(x_{t+j}\mid x_{\le t})$. It is trained with the sum of the $k$ cross-entropies

$$
\mathcal{L}_{\text{MTP}} = -\frac{1}{T}\sum_{t}\sum_{j=1}^{k}\log p^{(j)}_\theta(x_{t+j}\mid x_{\le t}).
$$

Head $1$ is an ordinary next-token predictor and is the one used for standard generation.
:::

Gloeckle et al. (2024) trained models with $k = 4$ independent heads on a shared trunk and reported gains on code-generation benchmarks that grew with model size, together with faster inference by using the extra heads to draft tokens for **self-speculative decoding** ([[inference/speculative-decoding]]). DeepSeek-V3 (DeepSeek-AI, 2024) used a variant with small sequential modules predicting one additional token. Earlier related ideas include blockwise parallel decoding (Stern et al., 2018) and ProphetNet (Qi et al., 2020). As of 2026 multi-token prediction is an active research topic, not a settled standard: the reported benefits depend on scale and domain, and on small models it can hurt.

## Choosing an objective {#sec-choosing}

| objective | context seen by a target | targets per $T$ tokens | defines $p(\mathbf{x})$? | typical architecture |
|---|---|---|---|---|
| causal LM | left only | $T$ | yes | decoder |
| masked LM | both sides (corrupted) | $\approx0.15\,T$ | no | encoder |
| span corruption | both sides, spans removed | $\approx0.15\,T$ + sentinels | no | encoder–decoder |
| denoising (BART) | noisy copy of whole text | $T$ (reconstruction) | no | encoder–decoder |
| prefix LM | bidirectional prefix, then left | $T - P$ | conditionally | decoder with prefix mask |
| fill-in-the-middle | prefix and suffix | $T$ (after rearranging) | yes, of the rearranged text | decoder |
| multi-token | left only | $kT$ (research) | head $1$: yes | decoder with extra heads |

Since about 2020, models meant to be general-purpose have mostly been decoders trained with the causal objective, often with fill-in-the-middle for code; Wang et al. (2022) found causal decoders the strongest for zero-shot use after pretraining alone. The reasons are those of this chapter: every token is a target, the model scores and generates text with one mechanism, and the loss is a compression rate with a clean interpretation. Masked and span objectives remain the right choice for encoders used for embeddings and classification ([[prompting-rag/text-embeddings]]) and are compared again in [[pretraining/model-families]].

::: history
Self-supervised pretraining of language models grew out of language modelling itself, which goes back to Shannon's 1951 experiments on predicting English letters. Bengio et al. (2003) trained a neural language model; Collobert and Weston (2008) and word2vec (Mikolov et al., 2013) learned word vectors from context-prediction tasks. Dai and Le (2015) pretrained recurrent networks as language models before fine-tuning, and ELMo (Peters et al., 2018) used bidirectional recurrent language models. In 2018 Radford et al. (GPT) pretrained a Transformer decoder with the causal objective and Devlin et al. (BERT, published at NAACL 2019) introduced masked language modelling, inspired by the cloze test of Taylor (1953). The year 2019 brought RoBERTa, XLNet, UniLM and the systematic comparison of objectives in T5 (Raffel et al., JMLR 2020), and BART (Lewis et al., ACL 2020); ELECTRA (Clark et al., 2020) introduced replaced-token detection. Bavarian et al. (2022) introduced fill-in-the-middle for causal models, Tay et al. (2023) the UL2 mixture of denoisers, and Gloeckle et al. (2024) revived multi-token prediction for large models. Teacher forcing is named after Williams and Zipser (1989).
:::

::: summary
- A pretraining objective corrupts text and trains the model to recover the hidden part with cross-entropy; objectives differ in what is hidden, what each prediction may see, and how many targets a sequence yields.
- **Causal language modelling** predicts each token from its predecessors with **teacher forcing**; by the chain rule its summed loss is exactly $-\log p_\theta(\mathbf{x})$, every position is a target, and a causal Transformer computes all $T$ predictions in one pass.
- The expected cross-entropy equals the data entropy plus a KL divergence, so it is minimised by the data distribution and never falls below the entropy of text.
- With arithmetic coding, the causal loss is a **code length**: bits per byte $= (\mathcal{L}/\ln2)\cdot(\text{tokens}/\text{bytes})$, a tokeniser-independent measure.
- **Masked LM** (BERT: $15\%$, 80/10/10) gives bidirectional representations but fewer targets and no joint probability; **span corruption** (T5: $15\%$, mean span $3$, sentinels) and **denoising** (BART) train encoder–decoders; a **prefix LM** combines both masks in one stack.
- **Fill-in-the-middle** rearranges documents as prefix–suffix–middle so a causal model learns to infill with little cost to left-to-right ability; **multi-token prediction** is a research direction with scale-dependent results.
:::

## Exercises

::: exercise A sequence probability {level=1 check="0.0012"}
A model gives the tokens of a three-token sequence the conditional probabilities $0.1$, $0.03$ and $0.4$. What is the probability of the sequence?
::: solution
By the chain rule [[#eq-chain]], $0.1\cdot0.03\cdot0.4 = 0.0012$.
:::
:::

::: exercise Loss in bits {level=1 check="3.652"}
Compute the per-token loss of the sequence in [[#ex-loss-hand]] in bits per token, directly from the four probabilities, to three decimal places.
::: solution
In bits, $-\tfrac14(\log_20.05 + \log_20.01 + \log_20.2 + \log_20.4) = \tfrac14(4.3219 + 6.6439 + 2.3219 + 1.3219) = 14.6096/4 = 3.652$ bits per token — the same as dividing the loss in nats, $2.5317$, by $\ln2$.
:::
:::

::: exercise Initial loss {level=1 check="10.8249"}
A causal Transformer with a vocabulary of $50{,}257$ tokens is initialised so that its predictions are close to uniform. What loss in nats should the first training step report? Give four decimal places.
::: solution
A uniform prediction gives every target probability $1/50257$, so the loss is $\ln50257 = 10.8249$ nats. A first loss far from this value signals a bug in initialisation or in the shifting of targets, as in [[neural-networks/training-practice#prop-initial-loss]].
:::
:::

::: exercise Bits per byte {level=2 check="0.687"}
In [[#ex-bpb]], compute the compression rate in bits per byte to three decimal places. A second model with a different tokeniser reaches $2.3$ nats per token at $4.9$ bytes per token: which model compresses better?
::: solution
First model: $2.0/(0.6931\cdot4.2) = 0.687$ bits per byte. Second: $2.3/(0.6931\cdot4.9) = 0.677$ bits per byte. The second model compresses slightly better even though its loss per token is higher, because each of its tokens covers more text. This is why losses per token should not be compared across tokenisers.
:::
:::

::: exercise Span corruption lengths {level=2 check="460.8"}
Using the expected values of [[#ex-span]], what is the expected length of the encoder input for a $512$-token example with $r = 0.15$ and $\mu = 3$? How do the encoder and decoder lengths change if $\mu = 10$ with the same $r$?
::: solution
With $\mu = 3$: $512 - 76.8 + 25.6 = 460.8$ tokens. With $\mu = 10$: $76.8/10 = 7.68$ spans, so the input is $512 - 76.8 + 7.68 = 442.9$ tokens and the target $7.68 + 76.8 + 1 = 85.5$ tokens. Longer spans make both sequences shorter, and each prediction harder, since more contiguous text must be reconstructed.
:::
:::

::: exercise The decomposition of cross-entropy {level=2 check="0.0253"}
The next token after some context has data distribution $p^\star = (0.5, 0.3, 0.2)$ over three tokens, and a model predicts $q = (0.4, 0.4, 0.2)$. Compute the entropy $H(p^\star)$, the expected cross-entropy and the KL divergence in nats, and check [[#eq-ce-decomp]]. Give the KL divergence to four decimal places.
::: solution
$H(p^\star) = -(0.5\ln0.5 + 0.3\ln0.3 + 0.2\ln0.2) = 0.3466 + 0.3612 + 0.3219 = 1.0297$. Cross-entropy: $-(0.5\ln0.4 + 0.3\ln0.4 + 0.2\ln0.2) = 0.4581 + 0.2749 + 0.3219 = 1.0549$. KL: $0.5\ln(0.5/0.4) + 0.3\ln(0.3/0.4) + 0.2\ln1 = 0.11157 - 0.08630 = 0.0253$ nats, and indeed $1.0297 + 0.0253 = 1.0550 \approx 1.0549$ (rounding). The model pays $0.0253$ nats per token above the unavoidable entropy for misallocating $0.1$ of probability.
:::
:::

::: exercise FIM rate and left-to-right data {level=2 check="0.5"}
A code model is pretrained on $10^{12}$ tokens with a FIM rate of $0.5$, applied per document. What fraction of documents is seen in plain left-to-right order? Explain why, nevertheless, essentially every token still receives a causal training signal.
::: solution
A fraction $1-\rho = 0.5$. In the transformed documents the rearranged sequence is still trained with the causal loss on every position, so each token — of the prefix, suffix and middle — is still predicted from the tokens before it in the rearranged order. What changes is the context: suffix tokens are predicted after the prefix with a jump, and the middle is predicted with both sides available. Bavarian et al. found that this costs little left-to-right ability.
:::
:::

::: exercise Implementing span corruption {level=3}
Write a plain-Python function `span_corrupt(tokens, rate, mean_len, rng)` that returns the encoder input and decoder target of [[#def-span-corruption]], with sentinels `<0>`, `<1>`, …. Choose the number of corrupted tokens $n = \operatorname{round}(\text{rate}\cdot T)$ and the number of spans $s = \max(1, \operatorname{round}(n/\mu))$, split $n$ into $s$ positive span lengths at random, and interleave them with $s$ random kept segments. Run it on the T5 example sentence.
::: solution
```python
import random

def random_partition(total, parts, rng):
    """Split `total` into `parts` positive integers, uniformly over compositions."""
    cuts = sorted(rng.sample(range(1, total), parts - 1))
    return [b - a for a, b in zip([0] + cuts, cuts + [total])]

def span_corrupt(tokens, rate, mean_len, rng):
    T = len(tokens)
    n = max(1, round(rate * T))
    s = max(1, round(n / mean_len))
    noise = random_partition(n, s, rng)                 # lengths of the dropped spans
    keep = random_partition(T - n, s, rng)              # lengths of the kept segments before each span
    inp, tgt, i = [], [], 0
    for k in range(s):
        inp += tokens[i:i + keep[k]]; i += keep[k]
        inp.append(f"<{k}>"); tgt.append(f"<{k}>")
        tgt += tokens[i:i + noise[k]]; i += noise[k]
    tgt.append(f"<{s}>")
    return inp, tgt

rng = random.Random(1)
words = "Thank you for inviting me to your party last week .".split()
inp, tgt = span_corrupt(words, 0.25, 2, rng)
print(" ".join(inp)); print(" ".join(tgt))
```

```text
Thank you for inviting me <0> your party last <1>
<0> to <1> week . <2>
```

Here $T = 11$, $n = \operatorname{round}(2.75) = 3$, $s = \operatorname{round}(1.5) = 2$: the dropped spans are *to* and *week .*. Every kept segment comes before a span, so in this simplified version the text always ends with a span (T5's implementation also allows a kept segment at the end). The encoder input has $T - n + s = 10$ tokens and the target $n + s + 1 = 6$, matching the count of [[#ex-span]].
:::
:::

::: exercise Why the MLM product is not a probability {level=3}
A masked model on two binary tokens predicts $q(x_1\mid x_2)$ and $q(x_2\mid x_1)$. Suppose both conditionals say "copy the other token with probability $0.9$". Show that the product $q(x_1\mid x_2)\,q(x_2\mid x_1)$, summed over all four sequences, is not $1$, and find a joint distribution consistent with both conditionals. Why does this not happen with the causal factorisation?
::: solution
The product is $0.81$ for the sequences $00$ and $11$ and $0.01$ for $01$ and $10$, summing to $1.64\ne1$, so it is not a distribution. The joint $p(00) = p(11) = 0.45$, $p(01) = p(10) = 0.05$ has conditionals $p(x_1 = x_2\mid x_2) = 0.45/0.5 = 0.9$, consistent with both; the product of conditionals is simply not how a joint is assembled from them. The causal factorisation $p(x_1)p(x_2\mid x_1)$ uses conditionals on *nested* contexts, and [[#prop-chain]] shows that any such product sums to $1$.
:::
:::

::: exercise Targets per FLOP {level=3}
Model the cost of a training step as proportional to the number of input positions processed (encoder plus decoder). Compare the number of prediction targets per processed position for: a causal decoder on $T = 512$ tokens; BERT with $15\%$ masking on $512$ tokens; and T5 span corruption with the numbers of [[#ex-span]], counting the decoder's targets. What does the comparison leave out?
::: solution
Causal: $512$ targets for $512$ positions, ratio $1$. BERT: $76.8$ for $512$, ratio $0.15$. T5: the decoder has $\approx103.4$ targets; positions processed are $460.8 + 103.4 = 564.2$, ratio $0.18$. The causal decoder gets five to seven times as many targets per unit of compute. The comparison leaves out that targets differ in difficulty and usefulness — a bidirectionally conditioned prediction may teach representations that a causal one does not — and that downstream quality, not the count of targets, is the goal. Raffel et al. and Wang et al. (2022) found that which objective is best depends on how the model will be used.
:::
:::

::: exercise Exposure bias in a bigram model {level=2}
The bigram model of [[#sec-code]] is used to generate text by repeatedly sampling the next character from $p_\theta(\cdot\mid x_t)$. Explain why its generations will look locally plausible but globally meaningless, and which part of this failure is due to the short context rather than to teacher forcing.
::: solution
Each character is drawn from the distribution that follows the previous character in the training text, so every adjacent pair is plausible (*th*, *he*, *e␣*), but nothing ties a character to anything two or more positions back, so words and phrases are not preserved. This failure is due to the model's one-character context: even trained perfectly, a bigram model cannot represent longer dependencies. Exposure bias is a separate issue: a model with long context, trained only on real prefixes, may drift when its context contains its own unusual samples. In the bigram model the two coincide, since its "context" is just the last sampled character, which always looks like real text.
:::
:::
