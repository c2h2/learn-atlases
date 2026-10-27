A **language model** assigns a probability to every piece of text. That sounds like an odd thing to want, but almost every use of language technology needs it: a speech recogniser must decide whether it heard *recognise speech* or *wreck a nice beach*, a translation system must choose the more fluent of several outputs, a keyboard must guess the next word, and a large language model generates text by repeatedly asking which token is likely to come next. This chapter builds the oldest family of language models, **$n$-gram models**, which estimate the probability of a word from the $n - 1$ words before it by counting.

The models are simple enough to train by hand, and their failures are instructive. Counting gives zero probability to everything that was not seen, and [[text-and-language/text-as-data#prop-hapax]] says that most of what is possible is never seen. The cure, **smoothing**, occupied statistical language modelling for two decades and culminated in **Kneser–Ney smoothing**; its key idea — that the right back-off distribution counts contexts, not occurrences — is derived below. Neural language models ([[sequence-models]]) replaced counting by learned representations, but they solve the same estimation problem, and the vocabulary, notation and evaluation of this chapter carry over unchanged. Evaluation itself, by perplexity, is the subject of [[text-and-language/perplexity]].

## The chain rule and the end of the sentence {#sec-chain}

Let a sentence be a sequence of tokens $w_1, \dots, w_T$ from a vocabulary $\mathcal{V}$ (words here; subword tokens, [[text-and-language/tokenisation]], in modern models). Any joint distribution can be factorised by the chain rule of probability ([[math-for-ml/probability]]):

$$
P(w_1, \dots, w_T) = P(w_1)\,P(w_2\mid w_1)\,P(w_3\mid w_1, w_2)\cdots P(w_T\mid w_1, \dots, w_{T-1}) = \prod_{t=1}^{T}P(w_t\mid w_{<t}).
$$ {#eq-chain}

This is an identity, not an assumption, and it says that a model of text is the same thing as a next-token predictor. Two details make it a model of *sentences* rather than of sequences of a fixed length: a start symbol `<s>`, placed before $w_1$ so that every token, including the first, has a context, and an end symbol `</s>`, which the model predicts like any other token when the sentence is complete.

::: definition Language model {#def-lm}
Let $\mathcal{V}$ be a finite vocabulary and `</s>` $\notin\mathcal{V}$. A **(sentence-level) language model** is a probability distribution $P$ on the set $\mathcal{V}^*$ of finite sequences of tokens. It is usually specified by **conditional next-token distributions** $P(\cdot\mid h)$ on $\mathcal{V}\cup\{\texttt{</s>}\}$, one for each history $h\in\mathcal{V}^*$, through

$$
P(w_1, \dots, w_T) = \Big(\prod_{t=1}^{T}P(w_t\mid w_{<t})\Big)\,P(\texttt{</s>}\mid w_{1:T}).
$$ {#eq-lm}
:::

::: proposition The end symbol makes a distribution {#prop-eos}
Let conditional distributions $P(\cdot\mid h)$ on $\mathcal{V}\cup\{\texttt{</s>}\}$ be given, and generate a sentence by drawing tokens one at a time from $P(\cdot\mid\text{tokens so far})$ until `</s>` is drawn. Then the numbers [[#eq-lm]] are the probabilities of the sentences, and

$$
\sum_{\mathbf{w}\in\mathcal{V}^*}P(\mathbf{w}) = \Prob(\text{generation stops after finitely many tokens})\le1,
$$

with equality if and only if generation stops with probability one. Without an end symbol, the products [[#eq-chain]] for all sequences of all lengths would sum to infinity.
:::

::: proof
The generation process produces exactly the sentence $\mathbf{w} = w_{1:T}$ when it draws $w_1, \dots, w_T$ in turn and then `</s>`, which by the multiplication rule for sequential draws has probability [[#eq-lm]]. Distinct sentences are disjoint events, so the sum over all sentences of length at most $L$ is the probability that generation stops within $L + 1$ draws; letting $L\to\infty$ and using continuity of probability, the full sum is the probability that it ever stops. Without `</s>`, the chain-rule products over all sequences of a fixed length $T$ sum to $1$ for every $T$, so the sum over all lengths diverges.
:::

The condition is not an empty formality: a model that almost never predicts `</s>` puts most of its probability on infinitely long "sentences". For the count-based models below it holds automatically whenever every word seen in training can reach `</s>` (exercise 10 computes the expected length of a sentence).

## The Markov assumption and $n$-grams {#sec-markov}

A distribution $P(w_t\mid w_{<t})$ for every possible history cannot be estimated: almost every history of a real sentence is unique. Andrey Markov's idea, applied by him to the letters of Pushkin in 1913, is to forget all but the most recent part of the history.

::: definition $n$-gram model {#def-ngram}
An **$n$-gram** is a sequence of $n$ consecutive tokens. An **$n$-gram language model** makes the **Markov assumption** of order $n - 1$:

$$
P(w_t\mid w_{<t}) = P(w_t\mid w_{t-n+1:t-1}),
$$

where the history is padded with $n - 1$ start symbols `<s>` at the beginning of the sentence. For $n = 1, 2, 3$ the models are called **unigram**, **bigram** and **trigram** models. The model is specified by one distribution over $\mathcal{V}\cup\{\texttt{</s>}\}$ for each of the at most $\lvert\mathcal{V}\rvert^{n-1}$ histories.
:::

A bigram model is a Markov chain whose states are the words; a trigram model is a Markov chain whose states are pairs of words. The assumption is false — the choice between *was* and *were* in *the keys to the cabinet …* depends on a word five positions back — and is made because it turns an impossible estimation problem into a merely hard one.

## Estimation by counting {#sec-mle}

Write $c(\cdot)$ for counts in a training corpus of sentences: $c(v\,w)$ is the number of times $w$ follows $v$, and $c(v) = \sum_wc(v\,w)$ is the number of times $v$ occurs as a history (counting `<s>`, not counting `</s>`).

::: proposition Maximum-likelihood $n$-gram estimates {#prop-ngram-mle}
Among all bigram models, the likelihood of a training corpus is maximised by

$$
P_{\text{MLE}}(w\mid v) = \frac{c(v\,w)}{c(v)}
$$ {#eq-bigram-mle}

for every history $v$ with $c(v) > 0$; for an $n$-gram model, likewise $P_{\text{MLE}}(w\mid h) = c(h\,w)/c(h)$ for each history $h$ of $n - 1$ tokens.
:::

::: proof
By [[#eq-lm]] and the Markov assumption, the log-likelihood of the corpus is $\sum_{t}\log P(w_t\mid w_{t-1})$ over all predicted positions (including each `</s>`). Grouping terms by history,

$$
\log L = \sum_v\sum_wc(v\,w)\log P(w\mid v).
$$

The parameters for different histories appear in separate terms and are constrained separately ($\sum_wP(w\mid v) = 1$ for each $v$), so each history can be optimised on its own. For fixed $v$, $\sum_wc(v\,w)\log P(w\mid v) = c(v)\sum_w\hat p_v(w)\log P(w\mid v)$ with $\hat p_v(w) = c(v\,w)/c(v)$, which is $-c(v)$ times the cross-entropy $H(\hat p_v, P(\cdot\mid v))$. By Gibbs' inequality ([[math-for-ml/information-theory]]) the cross-entropy is minimised exactly at $P(\cdot\mid v) = \hat p_v$. The argument is the same for longer histories.
:::

::: example A bigram model by hand {#ex-bigram}
Train a bigram model on the four sentences *the cat sat on the mat*, *the dog sat on the cat*, *the cat ran*, *the dog ran on the mat*. Compute the probabilities of *the cat sat on the mat*, of *the cat ran on the mat* (not in the corpus), and of *the mat ran*.
::: solution
With `<s>` and `</s>` added, the history counts are $c(\texttt{<s>}) = 4$, $c(\textit{the}) = 7$, $c(\textit{cat}) = 3$, $c(\textit{on}) = 3$ and $c = 2$ for *dog*, *sat*, *ran*, *mat*. The bigram counts give

| history | next-token distribution |
|---|---|
| `<s>` | *the* $1$ |
| *the* | *cat* $3/7$, *dog* $2/7$, *mat* $2/7$ |
| *cat* | *sat* $1/3$, *ran* $1/3$, `</s>` $1/3$ |
| *dog* | *sat* $1/2$, *ran* $1/2$ |
| *sat* | *on* $1$ |
| *ran* | *on* $1/2$, `</s>` $1/2$ |
| *on* | *the* $1$ |
| *mat* | `</s>` $1$ |

Then

$$
\begin{aligned}
P(\textit{the cat sat on the mat}) &= 1\cdot\tfrac37\cdot\tfrac13\cdot1\cdot1\cdot\tfrac27\cdot1 = \tfrac{2}{49}\approx0.041,\\
P(\textit{the cat ran on the mat}) &= 1\cdot\tfrac37\cdot\tfrac13\cdot\tfrac12\cdot1\cdot\tfrac27\cdot1 = \tfrac{1}{49}\approx0.020,
\end{aligned}
$$

and $P(\textit{the mat ran}) = 0$ because the bigram *mat ran* was never seen. The model generalises — it gives probability to a sentence not in the corpus, by recombining bigrams that were — but it gives zero to anything containing an unseen bigram, however plausible.
:::
:::

The bigram model of this example is a Markov chain, and generating text from it is a random walk. In the figure, `</s>` is drawn with an arrow back to *the*, so that the walk produces one sentence after another.

::: widget markov
matrix: 0,3/7,2/7,2/7,0,0,0,0; 0,0,0,0,1/3,1/3,0,1/3; 0,0,0,0,1/2,1/2,0,0; 0,0,0,0,0,0,0,1; 0,0,0,0,0,0,1,0; 0,0,0,0,0,0,1/2,1/2; 1,0,0,0,0,0,0,0; 1,0,0,0,0,0,0,0
states: the; cat; dog; mat; sat; ran; on; </s>
start: 0
steps: 30
caption: The bigram model of [[#ex-bigram]] as a Markov chain on words (the start symbol is merged with `</s>`, which always leads to *the*). A walk generates sentences such as *the dog ran on the cat*. The stationary distribution gives the long-run share of each word in generated text; *the* is the most frequent state, as it is in the corpus.
:::

On a real corpus the same counting produces text that is locally plausible and globally aimless. Here is a trigram model of *Moby-Dick* (Project Gutenberg eBook #2701, as in [[text-and-language/text-as-data#sec-zipf]]), treating the whole book as one stream of lower-cased words and punctuation marks, trained on the first $90\%$:

```python
import re, random, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())
cut = int(0.9 * len(tokens))
train, test = tokens[:cut], tokens[cut:]
print(len(tokens), "tokens;", len(train), "train,", len(test), "test")

def ngrams(seq, n):
    return [tuple(seq[i:i + n]) for i in range(len(seq) - n + 1)]

for n in (1, 2, 3, 4):
    seen = set(ngrams(train, n))
    t = ngrams(test, n)
    unseen = sum(1 for g in t if g not in seen)
    print(f"n = {n}: {len(seen):>7} distinct in train; {unseen / len(t):.1%} of test {n}-grams unseen")

# a trigram model: for each pair of previous tokens, the list of observed next tokens
nxt = collections.defaultdict(list)
for a, b, c in ngrams(train, 3):
    nxt[a, b].append(c)                # sampling uniformly from this list = sampling from the MLE

rng = random.Random(0)
for start in [("call", "me"), ("the", "whale")]:
    out = list(start)
    while len(out) < 40:
        out.append(rng.choice(nxt[out[-2], out[-1]]))
    print(" ".join(out))
```

```text
250966 tokens; 225869 train, 25097 test
n = 1:   16729 distinct in train; 2.9% of test 1-grams unseen
n = 2:  102851 distinct in train; 35.8% of test 2-grams unseen
n = 3:  185796 distinct in train; 77.2% of test 3-grams unseen
n = 4:  216413 distinct in train; 94.9% of test 4-grams unseen
call me a green simple boy , how few vast as the anak of the spell in which a noah’s flood is not down in his descent , fell into the boats ! luff ! cried stationary elijah , hailing
the whale hunt . he is of a place as any mountain spring , the end . no , thought i , the other like red men , is to be cæsar . was there ever such another bunger in
```

Every three consecutive tokens of the generated text occur somewhere in the book, and the result has Melville's vocabulary and rhythm but no meaning. The counts printed above it are the real lesson. Only $2.9\%$ of the test words are new, but $35.8\%$ of the test bigrams, $77.2\%$ of the trigrams and $94.9\%$ of the 4-grams never occur in the training text. A maximum-likelihood trigram model gives probability zero to the last $10\%$ of the book, because most of its trigrams are unseen — and this is with about a quarter of a million tokens. More data helps only slowly: with $\lvert\mathcal{V}\rvert\approx17{,}000$ there are $17{,}000^3\approx4.9\times10^{12}$ possible trigrams.

::: warning Zero is not a small probability
A single unseen $n$-gram makes the probability of a whole test text zero and its log-likelihood $-\infty$, so the perplexity of a maximum-likelihood $n$-gram model on new text is infinite. It is tempting to replace zeros by a tiny constant such as $10^{-10}$; but then the distributions no longer sum to one, and comparisons between models become meaningless (a model can "improve" just by raising the constant). Every smoothing method below takes probability mass from seen events and gives it to unseen ones, keeping each $P(\cdot\mid h)$ a distribution.
:::

## Add-$k$ smoothing {#sec-addk}

The simplest repair pretends that every possible next token was seen $k$ more times than it was.

::: definition Add-$k$ (Laplace) smoothing {#def-addk}
For $k > 0$ and next-token vocabulary of size $V$ (including `</s>`), the **add-$k$** estimate is

$$
P_{+k}(w\mid h) = \frac{c(h\,w) + k}{c(h) + kV}.
$$ {#eq-addk}

With $k = 1$ it is **Laplace's rule of succession** ("add-one smoothing").
:::

::: proposition Add-$k$ is a posterior mean {#prop-addk}
Fix a history $h$ and let $\boldsymbol{\theta} = P(\cdot\mid h)$ be unknown, with a symmetric Dirichlet prior $\operatorname{Dir}(k, \dots, k)$ on the probability simplex. Given the counts $c(h\,w)$, the posterior is $\operatorname{Dir}\big(c(h\,w_1) + k, \dots, c(h\,w_V) + k\big)$ and its mean is the add-$k$ estimate [[#eq-addk]].
:::

::: proof
The Dirichlet density is proportional to $\prod_w\theta_w^{k-1}$, and the likelihood of the observed continuations is $\prod_w\theta_w^{c(h\,w)}$. Their product, $\prod_w\theta_w^{c(h\,w) + k - 1}$, is proportional to the stated Dirichlet density, so that is the posterior. The mean of $\operatorname{Dir}(\alpha_1, \dots, \alpha_V)$ is $\alpha_w/\sum_u\alpha_u$; here $\sum_u\alpha_u = c(h) + kV$.
:::

The proposition explains both the appeal and the weakness of add-$k$. It is principled, but the prior says that before any data every word is equally likely to follow every history — and with $V$ in the tens of thousands, $kV$ pseudo-counts swamp the real counts of all but the most frequent histories.

::: example How much mass add-one moves {#ex-add-one}
In [[#ex-bigram]] ($V = 8$ possible next tokens), compute $P_{+1}(\textit{cat}\mid\textit{the})$ and $P_{+1}(\textit{sat}\mid\textit{the})$, and the total probability that add-one gives to the five continuations of *the* that were never seen.
::: solution
$c(\textit{the}) = 7$, so the denominator is $7 + 8 = 15$. $P_{+1}(\textit{cat}\mid\textit{the}) = (3 + 1)/15 = 0.267$, down from the MLE $3/7 = 0.429$; $P_{+1}(\textit{sat}\mid\textit{the}) = 1/15 = 0.067$. The five unseen continuations receive $5/15 = 1/3$ of the probability, although *the* was followed by only three different words in seven occurrences. In a real vocabulary of $17{,}000$ types, a history seen $7$ times would give $17{,}000 - 3$ of $17{,}007$ parts to unseen words — nearly everything.
:::
:::

::: widget plot
f: (3+x)/(7+8*x); x/(7+8*x)
x: 0, 2
y: 0, 0.5
labels: $P_{+k}(\text{cat}\mid\text{the})$, seen 3 times; $P_{+k}(\text{sat}\mid\text{the})$, unseen
caption: Add-$k$ smoothing in the toy corpus as a function of $k$ (horizontal axis). At $k = 0$ the estimate is the MLE ($3/7$ and $0$); as $k$ grows every continuation approaches the uniform $1/8$. Small $k$ (for example $0.01$–$0.1$), tuned on held-out data, works much better than $k = 1$ for language, but no single $k$ suits frequent and rare histories alike.
:::

**Good–Turing estimation** (Good, 1953, crediting Alan Turing) gives a better answer to the question "how much mass should unseen events get?". Its central estimate is that the total probability of all events not seen in a sample of size $N$ is about $N_1/N$, where $N_1$ is the number of event types seen exactly once: the rate of new types in the past predicts the rate in the future. For the words of *Moby-Dick* that is $7{,}650/216{,}625 = 3.5\%$ (exercise 7). Good–Turing adjusts every count $r$ to $r^* = (r + 1)N_{r+1}/N_r$; it is accurate for small $r$, noisy for large $r$ where $N_r$ is erratic, and was used inside Katz's (1987) back-off model.

## Back-off and interpolation {#sec-interpolation}

A better source of information about an unseen trigram $u\,v\,w$ than a uniform prior is the bigram $v\,w$, and failing that the unigram $w$. Two ways of combining orders are used.

- **Back-off** (Katz, 1987): use the highest-order estimate whose count is positive, discounted to leave some mass, and give the leftover mass to the next lower order, renormalised over the words unseen at the higher order.
- **Interpolation** (Jelinek and Mercer, 1980): always mix all orders,

$$
P_{\text{interp}}(w\mid u\,v) = \lambda_3P_{\text{MLE}}(w\mid u\,v) + \lambda_2P_{\text{MLE}}(w\mid v) + \lambda_1P_{\text{MLE}}(w),\qquad\lambda_1 + \lambda_2 + \lambda_3 = 1,
$$

  with the weights $\lambda_i\ge0$ (possibly depending on the history's count) fitted on held-out data, for instance by EM.

::: example Interpolating a bigram and a unigram model {#ex-interp}
In the corpus of [[#ex-bigram]], interpolate the bigram MLE with the unigram MLE using $\lambda_2 = 0.7$ and $\lambda_1 = 0.3$. Compute $P(\textit{cat}\mid\textit{the})$ and $P(\textit{on}\mid\textit{the})$.
::: solution
The unigram model is estimated from the $21$ words and $4$ end symbols, $25$ predicted tokens in all; *cat* and *on* occur $3$ times each, so $P_{\text{MLE}}(\textit{cat}) = P_{\text{MLE}}(\textit{on}) = 3/25 = 0.12$. Then

$$
P(\textit{cat}\mid\textit{the}) = 0.7\cdot\tfrac37 + 0.3\cdot0.12 = 0.300 + 0.036 = 0.336,\qquad P(\textit{on}\mid\textit{the}) = 0.7\cdot0 + 0.3\cdot0.12 = 0.036.
$$

The unseen bigram *the on* now has probability $0.036$ — rather a lot for a word that never follows *the* in English, because the unigram model knows only that *on* is common. Kneser–Ney, below, gives it $0.046$ in this tiny corpus but corrects the problem systematically in large ones.
:::
:::

A convex combination of distributions is a distribution, so interpolation needs no renormalisation, and the unigram term guarantees that every word seen in training gets positive probability in every context. The remaining questions are how much to subtract from the observed counts and what the lower-order distribution should be. Kneser–Ney smoothing answers both.

## Kneser–Ney smoothing {#sec-kn}

**Absolute discounting** (Ney, Essen and Kneser, 1994) subtracts a fixed amount $d\in(0, 1]$ from every positive count. The motivation is empirical: Church and Gale (1991) compared bigram counts in two halves of a large corpus and found that bigrams seen $r\ge2$ times in the first half occurred on average about $r - 0.75$ times in the second. The subtracted mass is given to a lower-order distribution. Kneser and Ney (1995) observed that the ordinary unigram distribution is the wrong lower-order distribution.

Their example is *Francisco*, a fairly frequent word that almost always follows *San*. The lower-order distribution is used only when the bigram was **not** seen, that is, for a history other than *San* — and in such contexts *Francisco* is very unlikely, however frequent it is overall. *Moby-Dick* has a perfect instance: *dick* occurs $83$ times, always after *moby*. What the lower order should measure is not how often $w$ occurs but **in how many different contexts it occurs**.

::: definition Interpolated Kneser–Ney (bigram) {#def-kn}
Let $N_{1+}(\bullet\,w) = \lvert\{v : c(v\,w) > 0\}\rvert$ be the number of distinct words preceding $w$, $N_{1+}(v\,\bullet) = \lvert\{w : c(v\,w) > 0\}\rvert$ the number of distinct words following $v$, and $N_{1+}(\bullet\,\bullet)$ the number of distinct bigram types. The **continuation probability** is

$$
P_{\text{cont}}(w) = \frac{N_{1+}(\bullet\,w)}{N_{1+}(\bullet\,\bullet)},
$$

and the **interpolated Kneser–Ney** estimate with discount $d\in(0, 1]$ is

$$
P_{\text{KN}}(w\mid v) = \frac{\max\big(c(v\,w) - d,\ 0\big)}{c(v)} + \lambda(v)\,P_{\text{cont}}(w),\qquad\lambda(v) = \frac{d\,N_{1+}(v\,\bullet)}{c(v)}.
$$ {#eq-kn}

For higher orders the definition is recursive: the highest order uses discounted counts as above, and each lower order uses the same formula with **continuation counts** $N_{1+}(\bullet\,h\,w)$ in place of counts $c(h\,w)$, down to the continuation unigram.
:::

::: proposition Kneser–Ney gives a distribution {#prop-kn}
For every history $v$ with $c(v) > 0$ and every $d\in(0, 1]$, the values $P_{\text{KN}}(w\mid v)$ are non-negative and sum to one over $w$. Every word with $N_{1+}(\bullet\,w) > 0$ has positive probability after every history.
:::

::: proof
Non-negativity is clear. Every positive count is at least $1\ge d$, so $\max(c(v\,w) - d, 0) = c(v\,w) - d$ for the $N_{1+}(v\,\bullet)$ words seen after $v$, and $0$ for the others. Hence

$$
\sum_w\frac{\max(c(v\,w) - d, 0)}{c(v)} = \frac{c(v) - d\,N_{1+}(v\,\bullet)}{c(v)} = 1 - \lambda(v).
$$

Since $\sum_wN_{1+}(\bullet\,w) = N_{1+}(\bullet\,\bullet)$ (each bigram type is counted once, at its second word), $\sum_wP_{\text{cont}}(w) = 1$, and the second term contributes $\lambda(v)$. The total is $1$. Finally $\lambda(v) > 0$ because $v$ has at least one successor, so $\lambda(v)P_{\text{cont}}(w) > 0$ whenever $w$ has at least one predecessor.
:::

The discount reserves exactly $d$ for each distinct continuation of $v$, so a history followed by many different words (*the*) gives much weight to the lower order, while one always followed by the same word (*moby*) gives little: $\lambda(v)$ measures how open-ended the history is.

::: example Kneser–Ney by hand {#ex-kn}
In the corpus of [[#ex-bigram]] with $d = 0.75$, compute $P_{\text{KN}}(\textit{cat}\mid\textit{the})$ and $P_{\text{KN}}(\textit{on}\mid\textit{the})$.
::: solution
There are $N_{1+}(\bullet\,\bullet) = 14$ distinct bigram types (count the rows of the table in [[#ex-bigram]]: $1 + 3 + 3 + 2 + 1 + 2 + 1 + 1$). *cat* follows *the* only, so $N_{1+}(\bullet\,\textit{cat}) = 1$ and $P_{\text{cont}}(\textit{cat}) = 1/14$; *on* follows *sat* and *ran*, so $P_{\text{cont}}(\textit{on}) = 2/14$. *the* occurs $7$ times as a history with $3$ distinct successors, so $\lambda(\textit{the}) = 0.75\cdot3/7 = 9/28$. Then

$$
P_{\text{KN}}(\textit{cat}\mid\textit{the}) = \frac{3 - 0.75}{7} + \frac{9}{28}\cdot\frac1{14} = \frac{126 + 9}{392} = \frac{135}{392}\approx0.344,
\qquad
P_{\text{KN}}(\textit{on}\mid\textit{the}) = 0 + \frac{9}{28}\cdot\frac{2}{14} = \frac{9}{196}\approx0.046.
$$

The unseen *the on* gets a small positive probability, and *cat* keeps most of its maximum-likelihood $0.429$.
:::
:::

On *Moby-Dick* the difference between the two lower-order distributions is visible directly:

```python
import re, collections

raw = open("pg2701.txt", encoding="utf-8").read()       # Moby-Dick, Project Gutenberg #2701
text = raw[raw.index("\n", raw.index("*** START OF")) + 1:raw.index("*** END OF")]
tokens = re.findall(r"[^\W\d_]+(?:['’][^\W\d_]+)*|[.,;:!?]", text.lower())

big = collections.Counter(zip(tokens, tokens[1:]))      # c(v w)
hist = collections.Counter(tokens[:-1])                 # c(v) as a history
follow = collections.Counter(v for v, w in big)         # N1+(v .): distinct successors
cont = collections.Counter(w for v, w in big)           # N1+(. w): distinct predecessors
n_types = len(big)                                      # N1+(. .)
d = 0.75
uni = collections.Counter(tokens)
N = len(tokens)

def p_kn(w, v):
    """Interpolated Kneser-Ney bigram probability P(w | v)."""
    lam = d * follow[v] / hist[v]
    return max(big[v, w] - d, 0) / hist[v] + lam * cont[w] / n_types

def p_abs(w, v):
    """Absolute discounting interpolated with the ordinary unigram distribution."""
    lam = d * follow[v] / hist[v]
    return max(big[v, w] - d, 0) / hist[v] + lam * uni[w] / N

for v, w in [("moby", "dick"), ("the", "dick"), ("the", "whale"), ("white", "whale")]:
    print(f"P({w:>5} | {v:>5}):  MLE {big[v, w] / hist[v]:.3e}  abs. disc. {p_abs(w, v):.3e}"
          f"  Kneser-Ney {p_kn(w, v):.3e}")
vocab = set(tokens)
print("sum over w of P_KN(w | the) =", round(sum(p_kn(w, "the") for w in vocab), 10))
```

```text
P( dick |  moby):  MLE 9.765e-01  abs. disc. 9.677e-01  Kneser-Ney 9.676e-01
P( dick |   the):  MLE 0.000e+00  abs. disc. 7.026e-05  Kneser-Ney 1.906e-06
P(whale |   the):  MLE 2.484e-02  abs. disc. 2.572e-02  Kneser-Ney 2.516e-02
P(whale | white):  MLE 3.345e-01  abs. disc. 3.333e-01  Kneser-Ney 3.324e-01
sum over w of P_KN(w | the) = 1.0
```

For seen bigrams the three estimates are close: discounting changes large counts little. The difference is in unseen bigrams: after *the*, absolute discounting with the unigram distribution gives *dick* a probability $37$ times larger than Kneser–Ney does, because *dick* is frequent — but only after *moby*, which is exactly the context in which the lower order is not consulted. Kneser–Ney gives *dick* the probability of a word that has been seen after one context out of $111{,}428$ bigram types.

::: intuition Why continuation counts are right
The lower-order distribution in an interpolated model answers the question "what is likely to come next in a context where this exact history has not told us much?". A word's chance of appearing after a new history is better predicted by the number of different histories it has appeared after than by its raw frequency: *whale* follows $199$ different words in *Moby-Dick*, *dick* one. Kneser and Ney derived the continuation distribution as the one that makes the smoothed model's bigram marginals match the observed unigram frequencies; later work (Teh, 2006) showed that interpolated Kneser–Ney is an approximation to inference in a hierarchical Pitman–Yor process, a Bayesian model whose power-law behaviour matches Zipf's law.
:::

Chen and Goodman's empirical study (1998 technical report; journal version 1999) compared the smoothing methods of the time on several corpora and training-set sizes, by held-out cross-entropy, and found interpolated Kneser–Ney consistently best. They proposed **modified Kneser–Ney**, which uses three discounts $d_1$, $d_2$, $d_{3+}$ for counts $1$, $2$ and $\ge3$, estimated from the count-of-counts $N_1, \dots, N_4$, and which remained the standard $n$-gram method until neural models took over. At web scale, Brants et al. (2007) found that a crude scheme without normalisation, "stupid back-off", worked as well as Kneser–Ney for machine translation once trained on trillions of words: with enough data, the choice of smoothing matters less.

::: quiz
In an interpolated Kneser–Ney bigram model, which history gives the largest weight $\lambda(v)$ to the continuation distribution?
- [ ] A frequent history that is always followed by the same word
- [x] A history seen a few times, followed by a different word each time
- [ ] A history seen many times, followed by a few different words
- [ ] All histories get the same weight $d$
::: solution
$\lambda(v) = d\,N_{1+}(v\,\bullet)/c(v)$. If every occurrence of $v$ is followed by a different word, $N_{1+}(v\,\bullet) = c(v)$ and $\lambda(v) = d$, its largest possible value: the history has not revealed a preferred continuation, so the model leans on the lower order. A history always followed by the same word has $\lambda = d/c(v)$, small when $c(v)$ is large.
:::
:::

## What $n$-gram models cannot do {#sec-limits}

Even with perfect smoothing, an $n$-gram model has two structural limits. Its context is at most $n - 1$ tokens, and increasing $n$ makes the counts sparser — in the listing, $95\%$ of test 4-grams were unseen. And it has no notion of similarity: seeing *the cat sat on the mat* tells it nothing about *the dog sat on the rug* except through shared $n$-grams, because *cat* and *dog* are unrelated symbols. Bengio et al. (2003) addressed the second limit by giving each word a learned vector and predicting the next word with a neural network from the vectors of the previous words, so that similar words share statistical strength; [[text-and-language/word-embeddings]] studies such vectors, and [[sequence-models]] the networks that removed the fixed context window. Until the mid-2010s, though, large Kneser–Ney models were the language models in production speech recognition and machine translation, and they are still a strong, cheap baseline and a useful tool for data filtering (as of 2026).

::: application $n$-gram statistics in the age of neural models
$n$-gram counting survives inside modern pipelines. Pretraining data are deduplicated by comparing sets of long $n$-grams (for example via MinHash), and some web-data filters score documents with a small Kneser–Ney model trained on high-quality text, keeping documents of low perplexity ([[pretraining/training-data]]). Contamination of benchmarks by training data is often detected by searching for overlapping $13$-grams or similar ([[evaluation/contamination]]). And "infini-gram" style indexes over trillions of tokens (Liu et al., 2024) compute $n$-gram counts for arbitrarily long $n$ on demand, as a tool for analysing what language models have seen.
:::

::: history
Markov (1913) counted vowel–consonant transitions in the first $20{,}000$ letters of *Eugene Onegin*, the first application of Markov chains. Shannon (1948) generated "approximations to English" from letter and word $n$-gram statistics, and in 1951 used human predictions to estimate the entropy of English. Good (1953) published the frequency estimates he had developed with Turing at Bletchley Park. Jelinek and colleagues at IBM built trigram models into speech recognition in the 1970s and 1980s, and Jelinek and Mercer (1980) introduced interpolation with held-out weights; Katz (1987) introduced back-off. Ney, Essen and Kneser (1994) proposed absolute discounting and Kneser and Ney (1995) the continuation distribution; Chen and Goodman (1998, 1999) compared the methods and introduced modified Kneser–Ney. Brants et al. (2007) trained $n$-gram models on two trillion tokens of web text for translation, and Bengio et al. (2003) introduced the neural probabilistic language model that began the transition to neural methods.
:::

::: summary
- By the chain rule a language model is a next-token predictor; `<s>` and `</s>` make it a distribution over finite sentences, provided generation stops with probability one.
- An $n$-gram model conditions on the previous $n - 1$ tokens; its maximum-likelihood estimate is $c(h\,w)/c(h)$, proved per history from Gibbs' inequality.
- Counts are sparse: on *Moby-Dick*, $36\%$ of test bigrams and $77\%$ of test trigrams are unseen, so unsmoothed models give zero probability to new text.
- Add-$k$ is the posterior mean under a Dirichlet prior but over-smooths; Good–Turing estimates the unseen mass as $N_1/N$; interpolation and back-off combine orders.
- Interpolated Kneser–Ney subtracts a discount $d$ from each seen count and redistributes it by the continuation probability $N_{1+}(\bullet\,w)/N_{1+}(\bullet\,\bullet)$ — how many contexts a word appears in — and is a proper distribution. Modified Kneser–Ney was the best $n$-gram method in Chen and Goodman's comparison.
- $n$-gram models have a short fixed context and no notion of word similarity, the two limits that neural language models remove.
:::

## Exercises

::: exercise A bigram probability {level=1 check="2/7"}
In [[#ex-bigram]], what is $P_{\text{MLE}}(\textit{dog}\mid\textit{the})$?
::: solution
*the* occurs $7$ times as a history, followed by *dog* twice: $2/7$.
:::
:::

::: exercise A sentence probability {level=1 check="1/14"}
Compute the bigram probability of *the dog ran* in the model of [[#ex-bigram]], including the end symbol.
::: solution
$P(\textit{the}\mid\texttt{<s>})P(\textit{dog}\mid\textit{the})P(\textit{ran}\mid\textit{dog})P(\texttt{</s>}\mid\textit{ran}) = 1\cdot\tfrac27\cdot\tfrac12\cdot\tfrac12 = \tfrac1{14}$.
:::
:::

::: exercise Add-one for an unseen bigram {level=1 check="1/15"}
With add-one smoothing and $V = 8$ possible next tokens, compute $P_{+1}(\textit{the}\mid\textit{the})$ in the corpus of [[#ex-bigram]].
::: solution
$c(\textit{the the}) = 0$ and $c(\textit{the}) = 7$, so $P_{+1} = (0 + 1)/(7 + 8) = 1/15$.
:::
:::

::: exercise Counting possible $n$-grams {level=2 check="17000^3"}
With a vocabulary of $17{,}000$ word types, how many distinct trigrams are possible? Compare with the $185{,}796$ distinct trigrams observed in the training part of *Moby-Dick*.
::: solution
$17{,}000^3 = 4.913\times10^{12}$. The book uses about $1.9\times10^{5}$ of them, a fraction $4\times10^{-8}$. Most possible trigrams are ungrammatical, but even the plausible ones are vastly more numerous than any corpus could display.
:::
:::

::: exercise An unseen bigram under Kneser–Ney {level=2 check="9/196"}
Verify $P_{\text{KN}}(\textit{on}\mid\textit{the}) = 9/196$ in [[#ex-kn]], and compute $P_{\text{KN}}(\texttt{</s>}\mid\textit{on})$.
::: solution
*the on* is unseen, so only the interpolation term remains: $\lambda(\textit{the})P_{\text{cont}}(\textit{on}) = \tfrac{9}{28}\cdot\tfrac{2}{14} = \tfrac{9}{196}$. For *on*: $c(\textit{on}) = 3$, one successor (*the*), so $\lambda(\textit{on}) = 0.75/3 = 1/4$; `</s>` follows *cat*, *mat* and *ran*, so $P_{\text{cont}}(\texttt{</s>}) = 3/14$. Hence $P_{\text{KN}}(\texttt{</s>}\mid\textit{on}) = \tfrac14\cdot\tfrac3{14} = \tfrac3{56}\approx0.054$.
:::
:::

::: exercise Limits of add-$k$ {level=2}
Show that for a fixed history $h$, the add-$k$ estimate [[#eq-addk]] tends to the uniform distribution as $k\to\infty$ and to the MLE as $k\to0$, and that for fixed $k$ it tends to the MLE as the counts grow in proportion, $c(h\,w) = N\hat p(w)$ with $N\to\infty$. Interpret $kV$ as a number of pseudo-observations.
::: solution
Dividing numerator and denominator by $k$: $\big(c(h\,w)/k + 1\big)/\big(c(h)/k + V\big)\to1/V$ as $k\to\infty$. At $k\to0$ the expression is $c(h\,w)/c(h)$. With $c(h\,w) = N\hat p(w)$ and $c(h) = N$: $(N\hat p(w) + k)/(N + kV)\to\hat p(w)$. The estimate is a weighted average, $\frac{N}{N + kV}\hat p(w) + \frac{kV}{N + kV}\cdot\frac1V$: the data count $N$ times and the uniform prior counts as $kV$ imaginary observations, so the prior dominates until $N\gg kV$ — with $V = 17{,}000$ and $k = 1$, until a history has been seen tens of thousands of times.
:::
:::

::: exercise Good–Turing's missing mass {level=2 check="7650/216625"}
In *Moby-Dick* ([[text-and-language/text-as-data#sec-zipf]]) there are $N = 216{,}625$ word tokens, of which $7{,}650$ types occur once. Estimate the probability that the next word of a continuation of the text is a type not seen so far. Justify the estimate by a leave-one-out argument.
::: solution
$N_1/N = 7{,}650/216{,}625 = 0.0353$. Leave-one-out: remove one token at random and ask whether its type appears elsewhere in the text. It does not exactly when the removed token was a hapax legomenon, which happens with probability $N_1/N$. Each token, held out, plays the role of a "next word", so $N_1/N$ estimates the probability that a new word is unseen.
:::
:::

::: exercise Bigram MLE with Lagrange multipliers {level=3}
Derive [[#eq-bigram-mle]] by maximising $\sum_wc(v\,w)\log\theta_w$ subject to $\sum_w\theta_w = 1$ with a Lagrange multiplier, and explain why words with $c(v\,w) = 0$ receive $\theta_w = 0$.
::: solution
The Lagrangian is $\sum_wc(v\,w)\log\theta_w - \mu\big(\sum_w\theta_w - 1\big)$. For words with $c(v\,w) > 0$, setting the derivative to zero gives $c(v\,w)/\theta_w = \mu$, so $\theta_w = c(v\,w)/\mu$. For words with zero count the objective does not depend on $\theta_w$ while the constraint charges for it, so the maximum puts $\theta_w = 0$ (a boundary maximum). Summing, $\sum_wc(v\,w)/\mu = 1$, so $\mu = c(v)$ and $\theta_w = c(v\,w)/c(v)$. The objective is concave, so this stationary point is the global maximum. The zero for unseen words is exactly the problem smoothing addresses: likelihood alone has no reason to reserve mass for what was not observed.
:::
:::

::: exercise A Kneser–Ney language model {level=3}
Implement interpolated Kneser–Ney for *trigrams* on the corpus of [[#ex-bigram]]: the trigram level uses discounted counts $c(u\,v\,w)$, the bigram level the continuation counts $N_{1+}(\bullet\,v\,w)$ with its own discount, and the unigram level $P_{\text{cont}}$. Verify numerically that $\sum_wP_{\text{KN}}(w\mid u\,v) = 1$ for every seen history.
::: solution
```python
import collections
corpus = ["the cat sat on the mat", "the dog sat on the cat", "the cat ran", "the dog ran on the mat"]
sents = [["<s>", "<s>"] + s.split() + ["</s>"] for s in corpus]
tri = collections.Counter((a, b, c) for s in sents for a, b, c in zip(s, s[1:], s[2:]))
V = sorted({w for s in sents for w in s[2:]})
d = 0.75

# bigram level from continuation counts N1+(. v w)
cont_bi = collections.Counter((b, c) for a, b, c in tri)
cont_uni = collections.Counter(c for b, c in cont_bi)            # N1+(. . w) via bigram types

def p_uni(w):
    return cont_uni[w] / sum(cont_uni.values())

def p_bi(w, v):
    tot = sum(n for (b, c), n in cont_bi.items() if b == v)
    if tot == 0:
        return p_uni(w)
    types = sum(1 for (b, c) in cont_bi if b == v)
    return max(cont_bi[v, w] - d, 0) / tot + d * types / tot * p_uni(w)

def p_tri(w, u, v):
    tot = sum(n for (a, b, c), n in tri.items() if (a, b) == (u, v))
    types = sum(1 for (a, b, c) in tri if (a, b) == (u, v))
    return max(tri[u, v, w] - d, 0) / tot + d * types / tot * p_bi(w, v)

for (u, v) in sorted({(a, b) for a, b, c in tri}):
    print(u, v, round(sum(p_tri(w, u, v) for w in V), 12))
print(p_tri("mat", "on", "the"), p_tri("dog", "on", "the"))
```

```text
<s> <s> 1.0
<s> the 1.0
cat ran 1.0
cat sat 1.0
dog ran 1.0
dog sat 1.0
on the 1.0
ran on 1.0
sat on 1.0
the cat 1.0
the dog 1.0
the mat 1.0
0.4680059523809524 0.05133928571428571
```

Every history seen in training gives a distribution summing to one. The last line shows $P_{\text{KN}}(\textit{mat}\mid\textit{on the}) = 0.468$ (the trigram was seen twice, out of three occurrences of *on the*) and $P_{\text{KN}}(\textit{dog}\mid\textit{on the}) = 0.051$ (unseen after *on the*, supplied by the lower orders). Each level sums to one for the reason given in [[#prop-kn]]: the discounted counts sum to $1 - \lambda$, and the lower-order distribution, itself normalised, receives weight $\lambda$. Recursion preserves normalisation from the bottom up.
:::
:::

::: exercise Expected sentence length {level=3 check="21/4"}
For the bigram model of [[#ex-bigram]], let $E_x$ be the expected number of words generated from the moment the chain is in state $x$ until `</s>` (counting $x$). Set up the linear equations, solve them for $E_{\textit{the}}$, the expected length of a generated sentence, and compare with the average length of the training sentences.
::: solution
$E_{\textit{mat}} = 1$, $E_{\textit{on}} = 1 + E_{\textit{the}}$, $E_{\textit{sat}} = 1 + E_{\textit{on}} = 2 + E_{\textit{the}}$, $E_{\textit{ran}} = 1 + \tfrac12E_{\textit{on}} = \tfrac32 + \tfrac12E_{\textit{the}}$, $E_{\textit{cat}} = 1 + \tfrac13E_{\textit{sat}} + \tfrac13E_{\textit{ran}}$, $E_{\textit{dog}} = 1 + \tfrac12E_{\textit{sat}} + \tfrac12E_{\textit{ran}}$ and $E_{\textit{the}} = 1 + \tfrac37E_{\textit{cat}} + \tfrac27E_{\textit{dog}} + \tfrac27E_{\textit{mat}}$. Writing $T = E_{\textit{the}}$: $E_{\textit{cat}} = \tfrac{13}{6} + \tfrac12T$ and $E_{\textit{dog}} = \tfrac{11}{4} + \tfrac34T$, so $T = 1 + \tfrac{13}{14} + \tfrac{3}{14}T + \tfrac{11}{14} + \tfrac{3}{14}T + \tfrac27$, i.e. $\tfrac{8}{14}T = 3$ and $T = \tfrac{21}{4} = 5.25$. The training sentences have lengths $6, 6, 3, 6$, average $21/4$ as well. This is no coincidence: for a maximum-likelihood bigram model the counts per sentence $c(w)/S$ satisfy the same balance equations ($c(w)$ equals the sum of counts of the bigrams ending in $w$) as the expected numbers of visits, which have a unique solution for a chain that is absorbed in `</s>`.
:::
:::
