How good is a language model? One could ask people to rate its outputs, or test it on downstream tasks, and later courses do both ([[evaluation]]). But a language model is first of all a probability distribution over text, and there is a direct, cheap and objective way to evaluate a distribution: give it text it has not seen and measure how much probability it assigns. A model that finds real text unsurprising has learned something about the process that produced it. This single number — reported as a **cross-entropy** in bits or nats per token, as a **perplexity**, or as **bits per byte** — has been the main yardstick of language modelling from Jelinek's speech recognisers in the 1970s to the training curves of today's large models.

This chapter defines these quantities for sequences, proves that held-out cross-entropy bounds the entropy of the text source from above (and that the obvious in-sample estimate is biased the other way), shows how to convert between tokens, characters and bytes so that models with different tokenisers can be compared fairly, evaluates the $n$-gram models of [[text-and-language/ngram-models]] on *Moby-Dick*, and states accurately what Shannon's famous 1951 experiments on the entropy of English did and found. The information-theoretic definitions — entropy, cross-entropy, KL divergence and Gibbs' inequality — are in [[math-for-ml/information-theory]]; here they are applied to whole texts.

## Likelihood of held-out text {#sec-likelihood}

A language model $q$ assigns a probability to a text $x_1, \dots, x_N$ (tokens, including end symbols) by the chain rule, $q(x_{1:N}) = \prod_{t=1}^{N}q(x_t\mid x_{<t})$. This probability is astronomically small for any text of interesting length and shrinks with $N$, so we normalise by length and take logarithms.

::: definition Cross-entropy and perplexity of a model on a text {#def-ppl}
The **cross-entropy** (average negative log-likelihood, or **log loss**) of a model $q$ on a text $x_{1:N}$ is

$$
\hat H(q; x_{1:N}) = -\frac1N\sum_{t=1}^{N}\log_2q(x_t\mid x_{<t})\quad\text{bits per token},
$$ {#eq-ce}

and its **perplexity** is

$$
\operatorname{PPL}(q; x_{1:N}) = 2^{\hat H(q;\,x_{1:N})} = q(x_{1:N})^{-1/N} = \Big(\prod_{t=1}^{N}\frac{1}{q(x_t\mid x_{<t})}\Big)^{1/N}.
$$ {#eq-ppl}

With natural logarithms the cross-entropy is in nats per token and $\operatorname{PPL} = e^{\hat H}$; the perplexity is the same in either unit. The text must be **held out**: not used to fit the model or to choose its hyperparameters.
:::

Three readings of the perplexity are useful. It is the reciprocal of the **geometric mean** of the probabilities the model gave to the tokens that actually occurred. It is an **effective branching factor**: a model that at every step spread its probability uniformly over $K$ candidates, one of them correct, would have perplexity exactly $K$. And because it is an exponential of the cross-entropy, a constant improvement in loss is a constant *factor* in perplexity: $0.1$ bits per token less is $7\%$ lower perplexity at any level.

::: example A perplexity by hand {#ex-ppl-hand}
A model assigns probabilities $\tfrac12$, $\tfrac14$, $\tfrac18$ and $\tfrac1{16}$ to the four tokens of a held-out text. Compute its cross-entropy in bits and nats and its perplexity. What is the perplexity of a model that is uniform over a vocabulary of $9{,}243$ tokens?
::: solution
The surprisals are $1, 2, 3, 4$ bits, so $\hat H = (1 + 2 + 3 + 4)/4 = 2.5$ bits per token, or $2.5\ln2 = 1.733$ nats. The perplexity is $2^{2.5} = 5.66$, equivalently $(2\cdot4\cdot8\cdot16)^{1/4} = 1024^{1/4} = 5.66$. A uniform model gives every token probability $1/9{,}243$, so its cross-entropy is $\log_29{,}243 = 13.17$ bits and its perplexity $9{,}243$: the perplexity of knowing nothing is the vocabulary size.
:::
:::

## What cross-entropy measures {#sec-bound}

Why should a low cross-entropy on held-out text mean a good model? Suppose the text is produced by a random source $P$ — a distribution over sequences, unknown to us — and the model is $Q$. The expected value of the log loss decomposes exactly as in the one-step case.

::: theorem Cross-entropy bounds the entropy of the source {#thm-ce-bound}
Let $X_{1:N}$ be drawn from a distribution $P$ on sequences of length $N$, and let $Q$ be any model of such sequences (with $Q(x_{1:N}) = \prod_tQ(x_t\mid x_{<t})$). Then

$$
\E_P\Big[-\frac1N\log Q(X_{1:N})\Big] = \frac1N\sum_{t=1}^{N}\E_P\big[-\log Q(X_t\mid X_{<t})\big] = \frac1NH(X_{1:N}) + \frac1N\operatorname{KL}(P\,\Vert\,Q)\ \ge\ \frac1NH(X_{1:N}),
$$

with equality if and only if $Q = P$. Moreover $\frac1NH(X_{1:N}) = \frac1N\sum_tH(X_t\mid X_{<t})$, the average conditional entropy of the next token given the past.
:::

::: proof
The first equality is the chain rule $\log Q(x_{1:N}) = \sum_t\log Q(x_t\mid x_{<t})$ and linearity of expectation. For the second, $-\log Q(x_{1:N}) = -\log P(x_{1:N}) + \log\frac{P(x_{1:N})}{Q(x_{1:N})}$; taking expectations under $P$ gives $H(X_{1:N}) + \operatorname{KL}(P\,\Vert\,Q)$, where both are for the joint distributions of the whole sequence. By Gibbs' inequality the divergence is non-negative and is zero only if $Q = P$. The last statement is the chain rule for entropy, $H(X_{1:N}) = \sum_tH(X_t\mid X_{<t})$, obtained by taking expectations of $-\log P(x_{1:N}) = -\sum_t\log P(x_t\mid x_{<t})$.
:::

::: example The decomposition in numbers {#ex-decomposition}
A source emits independent tokens, *a* with probability $0.75$ and *b* with probability $0.25$. A model predicts both with probability $\tfrac12$ at every step, whatever the history. Compute the model's expected cross-entropy per token, the source's entropy per token and the divergence, in bits.
::: solution
The model's surprisal is $1$ bit on every token, so its expected cross-entropy is $1$ bit per token. For independent tokens $H(X_{1:N}) = NH(X_1)$, with $H(X_1) = -0.75\log_20.75 - 0.25\log_20.25 = 0.811$ bits. The divergence per token is $0.75\log_2\frac{0.75}{0.5} + 0.25\log_2\frac{0.25}{0.5} = 0.439 - 0.25 = 0.189$ bits, and indeed $0.811 + 0.189 = 1$. No model can average fewer than $0.811$ bits per token on this source; the uniform model wastes $0.189$. Its perplexity is $2$, the source's own $2^{0.811} = 1.75$.
:::
:::

So the expected cross-entropy of a model is the source's entropy per token plus a penalty for the model's mismatch, and no model can beat the source itself. For a long text, the observed cross-entropy is close to its expectation: if the source is **stationary and ergodic** — its statistics do not change over time, and one long sample is representative — the Shannon–McMillan–Breiman theorem and its extension to cross-entropy (Algoet and Cover, 1988; see Cover and Thomas, chapter 16) say that $-\frac1N\log Q(X_{1:N})$ converges with probability one, for well-behaved models $Q$, to a limit that is at least the **entropy rate** $\lim_N\frac1NH(X_{1:N})$. Natural text is neither exactly stationary nor exactly ergodic, so these results describe an idealisation; but they justify the practice: **held-out cross-entropy estimates an upper bound on the entropy of the text source, and lowering it means getting closer to the source.**

The bound needs the text to be held out. Evaluate a model on its own training text and the inequality can fail badly, because the model has memorised the sample rather than learned the source. Even the most direct estimate of entropy, computing the entropy of the empirical distribution of a sample, is biased.

::: proposition The plug-in entropy estimate is biased downwards {#prop-plugin}
Let $\hat p$ be the empirical distribution of $n$ independent draws from a distribution $p$ on a finite set. Then $\E[H(\hat p)]\le H(p)$, with strict inequality unless $p$ is a point mass.
:::

::: proof
Each $\hat p(x)$ is an average of indicators with mean $p(x)$, so $\E[\hat p] = p$ as vectors. Entropy is a concave function of the distribution: $H(\lambda p_1 + (1 - \lambda)p_2)\ge\lambda H(p_1) + (1 - \lambda)H(p_2)$, because $-t\log t$ is concave in $t$ and $H$ is a sum of such terms. Jensen's inequality for concave functions gives $\E[H(\hat p)]\le H(\E\hat p) = H(p)$. The function $-t\log t$ is strictly concave, so equality requires $\hat p$ to be almost surely constant, which happens only when $p$ is a point mass.
:::

The bias is severe exactly where language lives: in the tail. For an $n$-gram distribution with millions of possible $n$-grams, a sample sees most of them at most once, and the empirical distribution looks far more predictable than the source.

## Letters of *Moby-Dick*: in-sample versus held-out {#sec-letters}

Shannon (1951) defined $F_N$, the conditional entropy of a letter given the $N - 1$ letters before it, and estimated it from published letter, digram and trigram frequency tables. Here are the same quantities for *Moby-Dick* (Project Gutenberg eBook #2701), reduced to Shannon's $27$-symbol alphabet of $26$ letters and the space. The in-sample estimate is the plug-in $F_N = H(N\text{-grams}) - H((N - 1)\text{-grams})$ on the whole book:

```python
import re, math, collections, gzip, bz2, lzma

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]

# Shannon's 27-symbol alphabet: 26 letters and the space
s = re.sub(r"[^a-z]+", " ", text.lower()).strip()
print(len(s), "symbols;", len(set(s)), "distinct")

def block_entropy(s, n):                    # H of the empirical distribution of n-grams, in bits
    if n == 0:
        return 0.0
    c = collections.Counter(s[i:i + n] for i in range(len(s) - n + 1))
    tot = sum(c.values())
    return -sum(k / tot * math.log2(k / tot) for k in c.values())

print(f"F_0 = log2 27 = {math.log2(27):.2f}")
for n in range(1, 8):                       # F_n = H(n-grams) - H((n-1)-grams): next letter given n-1
    print(f"F_{n} = {block_entropy(s, n) - block_entropy(s, n - 1):.2f} bits/letter")

data = text.encode("utf-8")                 # general-purpose compressors on the full text
for name, f in [("gzip", gzip.compress), ("bz2", bz2.compress), ("lzma", lzma.compress)]:
    print(f"{name:<5} {8 * len(f(data)) / len(data):.2f} bits/byte")
```

```text
1174222 symbols; 27 distinct
F_0 = log2 27 = 4.75
F_1 = 4.09 bits/letter
F_2 = 3.32 bits/letter
F_3 = 2.72 bits/letter
F_4 = 2.18 bits/letter
F_5 = 1.82 bits/letter
F_6 = 1.53 bits/letter
F_7 = 1.25 bits/letter
gzip  3.24 bits/byte
bz2   2.48 bits/byte
lzma  2.65 bits/byte
```

$F_1 = 4.09$ and $F_2 = 3.32$ agree well with Shannon's $4.03$ and $3.32$ for his $27$-letter alphabet. But the steady fall to $1.25$ bits at $N = 7$ is partly an artefact of [[#prop-plugin]]: with $27^6\approx3.9\times10^{8}$ possible six-letter contexts and about a million letters, most long contexts are seen once or a few times, and a context seen once "predicts" its next letter perfectly. Now train smoothed letter $n$-gram models on the first $90\%$ of the book and measure cross-entropy on the last $10\%$:

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
s = re.sub(r"[^a-z]+", " ", text.lower()).strip()      # 27 symbols
cut = int(0.9 * len(s))
train, test = s[:cut], s[cut:]
k = 0.1                                                 # add-k smoothing over 27 symbols

for n in range(1, 9):                                   # order n: predict a letter from n-1 before it
    ctx = collections.Counter(train[i:i + n - 1] for i in range(len(train) - n + 1))
    full = collections.Counter(train[i:i + n] for i in range(len(train) - n + 1))
    bits = 0.0
    for i in range(n - 1, len(test)):
        h, g = test[i - n + 1:i], test[i - n + 1:i + 1]
        bits -= math.log2((full[g] + k) / (ctx[h] + 27 * k))
    print(f"n = {n}: held-out {bits / (len(test) - n + 1):.3f} bits/letter")
```

```text
n = 1: held-out 4.077 bits/letter
n = 2: held-out 3.299 bits/letter
n = 3: held-out 2.708 bits/letter
n = 4: held-out 2.224 bits/letter
n = 5: held-out 2.041 bits/letter
n = 6: held-out 2.136 bits/letter
n = 7: held-out 2.428 bits/letter
n = 8: held-out 2.815 bits/letter
```

For short contexts the held-out and in-sample numbers agree; for long ones they diverge. The held-out cross-entropy is lowest, $2.04$ bits per letter, at $n = 5$, and then *rises*: longer contexts are seen too rarely in a million letters for add-$k$ estimates to be reliable, and the model overfits. Only the held-out numbers are honest upper bounds in the sense of [[#thm-ce-bound]]. (The general-purpose compressors, on the full UTF-8 text with capitals and punctuation, achieve $2.5$–$3.2$ bits per byte; a compressor is a predictor whose model is built on the fly, and with arithmetic coding any predictive model is a compressor — [[math-for-ml/information-theory]].)

::: widget regression
points: 1,4.077; 2,3.299; 3,2.708; 4,2.224; 5,2.041; 6,2.136; 7,2.428; 8,2.815
degree: 2
x: 0, 9
y: 1, 4.5
caption: Held-out cross-entropy (bits per letter) of add-$0.1$ letter $n$-gram models of *Moby-Dick* against the order $n$, from the listing; a quadratic is fitted as a guide. Longer contexts help until about $n = 5$, after which the counts become too sparse and the held-out loss rises, although the in-sample estimate keeps falling (to $1.25$ bits at $n = 7$). Better smoothing (interpolated Kneser–Ney) pushes the minimum lower and later, but the shape — a trade-off between context and data — is the general one.
:::

::: warning In-sample numbers flatter the model
The loss of a model on the data it was trained on, or on data used to tune its hyperparameters, is not an estimate of anything about the source; it rewards memorisation. Report held-out cross-entropy on text that played no part in training or tuning — and check that it really did not, since a test passage that also appears in a web-scale training corpus (a quotation, a licence text, a famous novel) is effectively in-sample. This problem, **contamination**, is the subject of [[evaluation/contamination]].
:::

## Evaluating the $n$-gram models {#sec-eval-ngrams}

The word-level models of [[text-and-language/ngram-models]] can be compared in the same way. A closed vocabulary is needed: here every training type seen at least twice is kept, all others become `<unk>`, and the same map is applied to the test text.

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())
cut = int(0.9 * len(tokens))
train, test = tokens[:cut], tokens[cut:]

# closed vocabulary: training types seen at least twice; everything else becomes <unk>
freq = collections.Counter(train)
vocab = {w for w, c in freq.items() if c >= 2} | {"<unk>"}
unk = lambda seq: [w if w in vocab else "<unk>" for w in seq]
chars = sum(len(w) + 1 for w in test)                             # test text joined by spaces
train, test = unk(train), unk(test)
V = len(vocab)
print(f"V = {V}, test tokens = {len(test)}, test <unk> rate = {test.count('<unk>') / len(test):.1%}")

uni = collections.Counter(train)
big = collections.Counter(zip(train, train[1:]))
tri = collections.Counter(zip(train, train[1:], train[2:]))
hist1 = collections.Counter(train[:-1])
hist2 = collections.Counter(zip(train[:-2], train[1:-1]))
d = 0.75

# Kneser-Ney statistics
cont_uni = collections.Counter(w for v, w in big)                 # N1+(. w)
n_bigram_types = len(big)
follow1 = collections.Counter(v for v, w in big)                  # N1+(v .)
cont_bi = collections.Counter((v, w) for u, v, w in tri)          # N1+(. v w)
cont_bi_tot = collections.Counter(v for u, v, w in tri)           # N1+(. v .)
cont_bi_follow = collections.Counter(v for (v, w) in cont_bi)     # N1+(v .) among continuation bigrams
follow2 = collections.Counter((u, v) for u, v, w in tri)          # N1+(u v .)

def p_uniform(w, h): return 1 / V
def p_unigram(w, h): return (uni[w] + 1) / (len(train) + V)
def p_add_k(w, h, k=0.01):
    v = h[-1]
    return (big[v, w] + k) / (hist1[v] + k * V)
def p_cont(w): return cont_uni[w] / n_bigram_types if cont_uni[w] else 1 / V
def p_kn2(w, h):
    v = h[-1]
    if hist1[v] == 0: return p_cont(w)
    return max(big[v, w] - d, 0) / hist1[v] + d * follow1[v] / hist1[v] * p_cont(w)
def p_kn2_lower(w, v):                                            # bigram level of the trigram model
    tot = cont_bi_tot[v]
    if tot == 0: return p_cont(w)
    return max(cont_bi[v, w] - d, 0) / tot + d * cont_bi_follow[v] / tot * p_cont(w)
def p_kn3(w, h):
    u, v = h
    if hist2[u, v] == 0: return p_kn2_lower(w, v)
    return (max(tri[u, v, w] - d, 0) / hist2[u, v]
            + d * follow2[u, v] / hist2[u, v] * p_kn2_lower(w, v))

for name, p in [("uniform", p_uniform), ("unigram add-1", p_unigram), ("bigram add-0.01", p_add_k),
                ("bigram Kneser-Ney", p_kn2), ("trigram Kneser-Ney", p_kn3)]:
    bits = -sum(math.log2(p(test[t], tuple(test[t - 2:t]))) for t in range(2, len(test)))
    n = len(test) - 2
    print(f"{name:<20} {bits / n:6.3f} bits/token  perplexity {2 ** (bits / n):8.1f}"
          f"  {bits / chars:5.3f} bits/char")
```

```text
V = 9243, test tokens = 25097, test <unk> rate = 4.9%
uniform              13.174 bits/token  perplexity   9243.0  2.743 bits/char
unigram add-1         8.848 bits/token  perplexity    460.9  1.842 bits/char
bigram add-0.01       8.767 bits/token  perplexity    435.7  1.825 bits/char
bigram Kneser-Ney     7.806 bits/token  perplexity    223.8  1.625 bits/char
trigram Kneser-Ney    7.796 bits/token  perplexity    222.2  1.623 bits/char
```

Kneser–Ney halves the perplexity of add-$k$, consistent with Chen and Goodman's comparisons. The trigram model barely improves on the bigram: with $2\times10^{5}$ training tokens, $77\%$ of test trigrams are unseen ([[text-and-language/ngram-models#sec-mle]]), so the trigram level rarely has anything to contribute; on corpora of hundreds of millions of words, trigram and higher-order Kneser–Ney models are clearly better than bigrams. The bits-per-character column divides the same total by the number of characters of the original test text (with single spaces); it is *not* a complete character-level measurement, because the $4.9\%$ of test words mapped to `<unk>` were predicted only as "some rare word", without paying for their spelling.

## Changing units: tokens, characters and bytes {#sec-units}

A model's loss per token depends on what a token is. To compare models with different tokenisers one needs a unit tied to the text itself.

::: proposition Converting between units {#prop-units}
Let a model assign total log-probability $\log_2q = -B$ bits to a text of $N_{\text{tok}}$ tokens, $N_{\text{char}}$ characters and $N_{\text{byte}}$ UTF-8 bytes. Then

$$
\text{bits per token} = \frac{B}{N_{\text{tok}}},\qquad \text{bits per byte} = \frac{B}{N_{\text{byte}}} = \frac{\text{bits per token}}{N_{\text{byte}}/N_{\text{tok}}},\qquad \operatorname{PPL}_{\text{tok}} = 2^{B/N_{\text{tok}}} = \big(2^{B/N_{\text{byte}}}\big)^{N_{\text{byte}}/N_{\text{tok}}},
$$

and likewise for characters. In nats, divide by $\ln2$ to convert to bits. If two models with different lossless tokenisers assign the same probability to the text, they have the same bits per byte, whatever their per-token losses.
:::

::: proof
All the quantities are the same total $B$ divided by different counts; the perplexity identity is $2^{B/N_{\text{tok}}} = 2^{(B/N_{\text{byte}})\cdot(N_{\text{byte}}/N_{\text{tok}})}$. The last statement holds because $B$ depends only on the probability of the text, and $N_{\text{byte}}$ only on the text.
:::

::: example Comparing models with different tokenisers {#ex-compare}
Model A has a held-out loss of $2.0$ nats per token with a tokeniser averaging $4.2$ bytes per token; model B has $1.7$ nats per token with $3.4$ bytes per token, on the same text. Which assigns the text higher probability? What are their perplexities?
::: solution
A: $2.0/\ln2 = 2.885$ bits per token, divided by $4.2$: $0.687$ bits per byte. B: $1.7/\ln2 = 2.453$ bits per token, divided by $3.4$: $0.721$ bits per byte. A assigns the text higher probability ($0.687 < 0.721$) although its per-token loss and perplexity are higher ($e^{2.0} = 7.39$ against $e^{1.7} = 5.47$). Per-token perplexities of models with different tokenisers cannot be compared directly.
:::
:::

::: widget plot
f: 2^(b*x)
x: 0.4, 1.6
y: 0, 120
sliders: b=4:1:8:0.1
labels: $\operatorname{PPL}_{\text{tok}} = 2^{b\cdot\text{bpb}}$
caption: The per-token perplexity implied by a given number of bits per byte (horizontal axis) when tokens average $b$ bytes (slider). At $0.8$ bits per byte, four-byte tokens give perplexity $2^{3.2} = 9.2$ and eight-byte tokens $2^{6.4} = 84$: the same model quality looks ten times worse per token with longer tokens. Bits per byte is the comparable quantity.
:::

**Bits per byte** is the preferred unit for comparing language models with different tokenisers; it was the headline metric of the Pile benchmark (Gao et al., 2020), and is standard in work on byte-level and tokenisation-free models. Bits per character is common for character-level benchmarks such as text8 and enwik8; for ASCII text the two coincide. Two subtleties remain. First, a token-level model gives a string the sum of the probabilities of all token sequences that decode to it, but evaluation scores only the tokeniser's canonical segmentation, so the reported bits per byte is a slight overestimate (exercise 9). Second, the comparison is only fair on the same text, with the same normalisation, and with the same treatment of document boundaries and context: a Transformer evaluated on fixed windows with no preceding context scores worse than one evaluated with a sliding window that gives each token a long history.

::: warning Perplexities that cannot be compared
Perplexities are comparable only for the same test text, the same tokenisation and the same vocabulary. A closed-vocabulary model can lower its perplexity simply by shrinking the vocabulary: a model whose vocabulary is just `<unk>` predicts every token with probability one and has perplexity $1$. Word-level results on the Penn Treebank, for instance, are always quoted for its fixed $10{,}000$-word vocabulary. When vocabularies differ, convert to bits per byte, and make sure unknown words pay for their spelling.
:::

## Shannon and the entropy of English {#sec-shannon}

Shannon's *Prediction and Entropy of Printed English* (Bell System Technical Journal, 1951) asked how many bits per letter English really needs. It used two methods, and it is often misquoted.

The first method used statistics. From published tables of letter, digram and trigram frequencies, and of word frequencies, Shannon computed $F_0 = \log_227 = 4.76$, $F_1 = 4.03$, $F_2 = 3.32$ and $F_3 = 3.1$ bits per letter for a $27$-symbol alphabet (letters and space), and $2.62$ bits per letter from a word-frequency model ($11.82$ bits per word at $4.5$ letters per word). These are the conditional entropies $F_N$ of the previous section, estimated from large tables.

The second method used people as the model. A subject was shown the first $N - 1$ letters of a passage (taken from Dumas Malone's *Jefferson the Virginian*) and asked to guess the next letter, guessing again until correct; the number of guesses needed was recorded, for $N$ from $1$ to $15$ and for $N = 100$. Since a person who knows the language well ranks the possible next letters in the order of their probability, the distribution of the number of guesses determines bounds on the entropy. Shannon proved that if $q_i^N$ is the frequency with which the correct letter was the $i$-th guess with $N - 1$ letters of context, then

$$
\sum_{i}i\,\big(q_i^N - q_{i+1}^N\big)\log_2i\ \le\ F_N\ \le\ -\sum_iq_i^N\log_2q_i^N.
$$

The upper bound is the entropy of the guess-number distribution: the guess number determines the letter, given an ideal predictor that always ranks the same way. With $100$ letters of context the experiments gave an upper bound of about $1.3$ and a lower bound of about $0.6$ bits per letter. Shannon's own summary was that long-range statistical effects, up to $100$ letters, reduce the entropy "to something of the order of one bit per letter", corresponding to a redundancy of roughly $75\%$.

::: example Shannon's bounds from a guessing experiment {#ex-shannon-bounds}
Suppose that, with some fixed amount of context, subjects guess the next letter right at the first attempt $60\%$ of the time, at the second $20\%$, at the third $10\%$ and at the fourth $10\%$. Compute Shannon's upper and lower bounds on $F_N$.
::: solution
Upper bound: the entropy of the guess-number distribution, $-(0.6\log_20.6 + 0.2\log_20.2 + 2\cdot0.1\log_20.1) = 0.442 + 0.464 + 0.664 = 1.571$ bits. Lower bound, with $q_5 = 0$: $\sum_ii(q_i - q_{i+1})\log_2i = 1\cdot0.4\cdot0 + 2\cdot0.1\cdot1 + 3\cdot0\cdot\log_23 + 4\cdot0.1\cdot2 = 0.2 + 0.8 = 1.0$ bit. So $1.0\le F_N\le1.571$ bits per letter. The bounds are far apart when the guess distribution has a long tail; Shannon's $0.6$–$1.3$ range at $N = 100$ reflects the same gap.
:::
:::

Three points of accuracy. The estimates are for a $27$-symbol alphabet without capitals, digits or punctuation, so they are not directly bits per byte of real text. The bounds rest on assumptions — that the subject behaves like an ideal ranker, and that a handful of passages from one book are representative — and the sample was small. And "about one bit per letter" is a range, $0.6$ to $1.3$, not a measurement. Later work refined the approach: Cover and King (1978) had subjects place bets on the next letter, giving an estimate of about $1.3$ bits per character, and Brown et al. (1992) used a word trigram model trained on hundreds of millions of words to obtain an upper bound of $1.75$ bits per character for printed English. Large language models today are evaluated in essentially the same way, on held-out text, in bits per byte.

::: quiz
A model reports $3.2$ nats per token on a test set. Its tokeniser averages $4$ bytes per token, and the text is ASCII. Which statements are correct?
- [x] Its perplexity is $e^{3.2}\approx24.5$
- [x] It achieves about $1.15$ bits per character
- [ ] Its perplexity in bits is $2^{3.2}\approx9.2$
- [ ] It is worse than a model with $2.9$ nats per token, whatever that model's tokeniser
::: solution
$e^{3.2} = 24.5$; the perplexity does not depend on the unit, so computing $2^{3.2}$ mixes nats with base $2$. In bits, $3.2/\ln2 = 4.617$ bits per token, and $4.617/4 = 1.154$ bits per byte, which equals bits per character for ASCII. A model with $2.9$ nats per token but $3$ bytes per token has $2.9/(3\ln2) = 1.39$ bits per byte and is worse; per-token numbers cannot be compared across tokenisers.
:::
:::

::: history
Perplexity was introduced as a measure of the difficulty of speech-recognition tasks by Jelinek, Mercer, Bahl and Baker (1977) at IBM, as the effective number of word choices a recogniser faces; the IBM group made held-out perplexity the standard criterion for language models in the 1980s. Shannon (1948) defined entropy and illustrated the idea with $n$-gram approximations to English, and his 1951 paper estimated the entropy of English with statistics and with human prediction; Cover and King (1978) and Brown et al. (1992) followed with gambling and model-based estimates. Algoet and Cover (1988) proved the sandwich form of the Shannon–McMillan–Breiman theorem relevant to the cross-entropy of models. Bits per character became standard on character-level benchmarks derived from Wikipedia (the Hutter Prize's enwik8, 2006), and bits per byte on mixed-domain corpora such as the Pile (Gao et al., 2020).
:::

::: summary
- The cross-entropy of a model on held-out text is $-\frac1N\sum_t\log_2q(x_t\mid x_{<t})$ bits per token; the perplexity is $2$ to that power, the inverse geometric mean of the probabilities of the actual tokens, an effective branching factor. A uniform model has perplexity $\lvert\mathcal{V}\rvert$.
- Expected cross-entropy equals the source's entropy per token plus $\frac1N\operatorname{KL}(P\,\Vert\,Q)$, so held-out cross-entropy estimates an upper bound on the entropy of the source. In-sample estimates are biased downwards (plug-in entropy, by Jensen) and reward memorisation.
- On the letters of *Moby-Dick*, held-out cross-entropy of smoothed letter $n$-grams is lowest ($2.04$ bits per letter) at $n = 5$ and rises after, while the in-sample estimate keeps falling. On words, interpolated Kneser–Ney halves the perplexity of add-$k$.
- Per-token losses depend on the tokeniser; bits per byte (or per character) $= $ total bits $/$ bytes is comparable across tokenisers. Perplexities are comparable only with identical text, tokenisation and vocabulary.
- Shannon (1951) estimated $F_1 = 4.03$, $F_2 = 3.32$, $F_3 = 3.1$ bits per letter from statistics, and bounds of about $0.6$–$1.3$ bits per letter from human prediction with $100$ letters of context — "of the order of one bit per letter".
:::

## Exercises

::: exercise Perplexity of three predictions {level=1 check="4"}
A model gives probabilities $\tfrac12$, $\tfrac14$ and $\tfrac18$ to the three tokens of a text. What is its perplexity?
::: solution
The surprisals are $1, 2, 3$ bits, average $2$ bits, so $\operatorname{PPL} = 2^2 = 4$; equivalently $(2\cdot4\cdot8)^{1/3} = 64^{1/3} = 4$.
:::
:::

::: exercise A uniform model {level=1 check="log2(9243)"}
What is the cross-entropy in bits per token of a uniform model over the $9{,}243$-token vocabulary of the listing in [[#sec-eval-ngrams]]?
::: solution
$\log_29{,}243 = 13.174$ bits per token, as printed; the perplexity is $9{,}243$.
:::
:::

::: exercise Bits to nats {level=1 check="7.806*ln(2)"}
The bigram Kneser–Ney model scored $7.806$ bits per token. Express this in nats per token and check that the perplexity is the same.
::: solution
$7.806\ln2 = 5.411$ nats. $e^{5.411} = 223.8 = 2^{7.806}$, as printed.
:::
:::

::: exercise Bits per byte {level=2 check="2.2/(3.8*ln(2))"}
A model has a held-out loss of $2.2$ nats per token, and its tokeniser produces $3.8$ bytes per token on the test text. Compute its bits per byte.
::: solution
$2.2/\ln2 = 3.174$ bits per token; divided by $3.8$ bytes per token, $0.835$ bits per byte.
:::
:::

::: exercise The bias of the plug-in estimate {level=2 check="0.5"}
A fair coin is tossed twice and the entropy of the empirical distribution is computed in bits. What is its expected value? Compare with the true entropy.
::: solution
With probability $\tfrac12$ the tosses differ and $\hat p = (\tfrac12, \tfrac12)$ with entropy $1$ bit; with probability $\tfrac12$ they agree and the entropy is $0$. The expectation is $0.5$ bits, half the true $1$ bit — the downward bias of [[#prop-plugin]].
:::
:::

::: exercise Shannon's word estimate {level=2 check="11.82/4.5"}
Shannon estimated $11.82$ bits per word from word frequencies and used an average word length of $4.5$ letters. What estimate of bits per letter does this give? Why does the result, $2.62$, lie below $F_3 = 3.1$?
::: solution
$11.82/4.5 = 2.627$ bits per letter (Shannon reports $2.62$). A word model predicts whole words, so it effectively uses context within the word longer than two letters — it knows that *th* is usually followed by *e* in *the* and that only certain letter strings are words — whereas $F_3$ uses only the two previous letters.
:::
:::

::: exercise A mixture never does worse than its parts on average {level=2}
For two models $q_1$, $q_2$ and $\lambda\in[0, 1]$, let $q = \lambda q_1 + (1 - \lambda)q_2$. Show that on any text, the cross-entropy of $q$ is at most $\lambda\hat H(q_1) + (1 - \lambda)\hat H(q_2)$, and therefore at most the larger of the two. Use the $\lambda$ table of the listing below to illustrate, where bigram and unigram models are interpolated on *Moby-Dick* (trained on the first $80\%$, $\lambda$ chosen on the next $10\%$, tested on the last $10\%$).

```python
import re, math, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())
a, b = int(0.8 * len(tokens)), int(0.9 * len(tokens))
train, dev, test = tokens[:a], tokens[a:b], tokens[b:]
vocab = {w for w, c in collections.Counter(train).items() if c >= 2} | {"<unk>"}
unk = lambda seq: [w if w in vocab else "<unk>" for w in seq]
train, dev, test = unk(train), unk(dev), unk(test)
V = len(vocab)
uni = collections.Counter(train)
big = collections.Counter(zip(train, train[1:]))
hist = collections.Counter(train[:-1])

def bits_per_token(seq, lam):
    tot = 0.0
    for v, w in zip(seq, seq[1:]):
        p_bi = big[v, w] / hist[v] if hist[v] else 0.0
        p_uni = (uni[w] + 1) / (len(train) + V)
        tot -= math.log2(lam * p_bi + (1 - lam) * p_uni)
    return tot / (len(seq) - 1)

for lam in (0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 0.95):
    print(f"lambda = {lam:.2f}: dev {bits_per_token(dev, lam):.3f} bits/token")
best = min((bits_per_token(dev, l / 20), l / 20) for l in range(20))
print(f"best lambda on dev = {best[1]:.2f}; test {bits_per_token(test, best[1]):.3f} bits/token,"
      f" perplexity {2 ** bits_per_token(test, best[1]):.1f}")
```

```text
lambda = 0.00: dev 8.661 bits/token
lambda = 0.20: dev 8.056 bits/token
lambda = 0.40: dev 7.885 bits/token
lambda = 0.50: dev 7.853 bits/token
lambda = 0.60: dev 7.853 bits/token
lambda = 0.80: dev 7.987 bits/token
lambda = 0.95: dev 8.461 bits/token
best lambda on dev = 0.55; test 7.925 bits/token, perplexity 243.1
```
::: solution
$-\log_2$ is convex, so for each token $-\log_2\big(\lambda q_1(x_t\mid\cdot) + (1 - \lambda)q_2(x_t\mid\cdot)\big)\le-\lambda\log_2q_1(x_t\mid\cdot) - (1 - \lambda)\log_2q_2(x_t\mid\cdot)$. Averaging over tokens gives the claim, and a weighted average is at most the maximum. The mixture can be much better than both parts: the pure bigram MLE ($\lambda = 1$) has infinite cross-entropy because of unseen bigrams, the smoothed unigram has $8.661$ bits per token, and the mixture with $\lambda = 0.55$ (chosen on the development set, not the test set) reaches $7.925$ bits per token on the test text — close to, but worse than, the Kneser–Ney bigram of [[#sec-eval-ngrams]], which was also trained on more data.
:::
:::

::: exercise Shrinking the vocabulary {level=2}
A word-level model maps every word outside its vocabulary to `<unk>`. Show that by enlarging the set of words mapped to `<unk>` one can lower the model's perplexity without improving its knowledge of the language, and describe two ways to report results so that this cannot happen.
::: solution
Merging a set of words into `<unk>` replaces the events "word $w_1$", "word $w_2$", … by their union, whose probability is at least that of each; the probability assigned to the actual token can only rise, so the perplexity can only fall. In the extreme, a vocabulary consisting of `<unk>` alone has perplexity $1$. Remedies: (1) compare models only with an identical vocabulary and `<unk>` map, as on standard benchmarks; (2) make the model pay for unknown words, for example by spelling them out with a character model, $q(w) = q(\texttt{<unk>})\,q_{\text{char}}(w)$, or use an open-vocabulary tokeniser (subwords or bytes), and report bits per byte of the original text.
:::
:::

::: exercise Canonical tokenisation gives an upper bound {level=3}
A token-level model $q$ and a lossless tokeniser define a probability for a string $s$ by $q(s) = \sum_{\mathbf{t}:\operatorname{dec}(\mathbf{t}) = s}q(\mathbf{t})$, including the end symbol. Show that $-\log_2q(\operatorname{enc}(s))\ge-\log_2q(s)$, so that bits per byte computed from the canonical encoding overestimates the model's true bits per byte. When is the overestimate zero?
::: solution
The canonical encoding $\operatorname{enc}(s)$ is one of the token sequences that decode to $s$, and all terms of the sum are non-negative, so $q(s)\ge q(\operatorname{enc}(s))$; taking $-\log_2$ reverses the inequality. Dividing by the byte length gives the statement about bits per byte. The overestimate is zero exactly when the model gives probability zero to every non-canonical segmentation of $s$. Trained models put very little mass on non-canonical segmentations, because they never see them in training, so the difference is usually small; it can be measured by sampling or bounding the sum (Cao and Rimell, 2021, studied the gap in this sense).
:::
:::

::: exercise Perplexity and the effective branching factor {level=3}
(a) Show that if at every step a model distributes its probability uniformly over a set of $K_t$ candidate tokens containing the correct one, its perplexity is the geometric mean of the $K_t$. (b) Show that the perplexity of a fixed model on a text never exceeds the arithmetic mean of the inverse probabilities $1/q(x_t\mid x_{<t})$, and give a two-token example where they differ by a factor of more than $2$.
::: solution
(a) Each correct token gets probability $1/K_t$, so $\operatorname{PPL} = \big(\prod_tK_t\big)^{1/N}$, the geometric mean. (b) The geometric mean of positive numbers is at most their arithmetic mean (AM–GM), so $\operatorname{PPL} = \big(\prod_t1/q_t\big)^{1/N}\le\frac1N\sum_t1/q_t$. For $q_1 = 1$, $q_2 = 1/100$: $\operatorname{PPL} = \sqrt{100} = 10$, but the arithmetic mean of inverse probabilities is $(1 + 100)/2 = 50.5$. Perplexity is dominated less by rare, badly predicted tokens than an arithmetic average would be — though each badly predicted token still costs its full surprisal in the cross-entropy.
:::
:::
