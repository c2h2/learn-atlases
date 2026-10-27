When a language model's training loss falls from $3.0$ to $2.5$, what has improved? The loss is measured in **nats per token**, a unit of information, and the number has a concrete meaning: if the model were used to compress text, $2.5$ nats per token is how many it would need, on average, to encode each token. A better language model is a better compressor, and the quantity both measure — how surprised a predictor is by what actually happens — is the subject of information theory.

This chapter defines the handful of quantities the rest of the atlas uses: information content, **entropy**, **cross-entropy**, the **Kullback–Leibler divergence** and **mutual information**, together with **perplexity**, the form in which language-model losses are often reported. Its central result is Gibbs' inequality, $\operatorname{KL}(p\,\Vert\,q)\ge0$, which explains why minimising cross-entropy fits a model to data, why it is the same as maximum likelihood, and why the loss of a language model can never fall below the entropy of the text it models. Everything here is about discrete distributions, which is what next-token prediction needs; [[math-for-ml/probability]] supplies the probability.

## Surprise and entropy {#sec-entropy}

Suppose an event of probability $p$ occurs. How much information does learning that it occurred convey? A certain event ($p = 1$) conveys none; a rare event conveys a lot; and for two independent events the information should add, while their probabilities multiply. The only functions turning products into sums are logarithms, which leads to the following definition.

::: definition Information content and entropy {#def-entropy}
The **information content** (surprisal) of an outcome of probability $p$ is $-\log p$. The **entropy** of a discrete distribution $p$ on a set $\mathcal{X}$ is the expected information content,

$$
H(p) = -\sum_{x\in\mathcal{X}}p(x)\log p(x) = \E_{x\sim p}\big[-\log p(x)\big],
$$

with the convention $0\log0 = 0$. With $\log_2$ the unit is the **bit**, with the natural logarithm the **nat**; $1\text{ nat} = 1/\ln2\approx1.443$ bits. We also write $H(X)$ for the entropy of the distribution of a random variable $X$.
:::

Entropy measures uncertainty: how unpredictable a draw from $p$ is, on average. A fair coin has entropy $1$ bit; a coin that lands heads $90\%$ of the time has $-0.9\log_20.9 - 0.1\log_20.1 = 0.469$ bits; a coin that always lands heads has $0$. Deep-learning code uses natural logarithms, so losses are in nats unless stated otherwise.

::: widget plot
f: -(x*log(x) + (1-x)*log(1-x))/log(2)
x: 0.001, 0.999
y: 0, 1.1
labels: $H(p)$ in bits
points: 0.5,1; 0.9,0.469
caption: The entropy of a coin that lands heads with probability $p$. It is largest, $1$ bit, for a fair coin and falls to $0$ as the outcome becomes certain. The marked point at $p = 0.9$ has entropy $0.469$ bits: such a coin can be described with less than half a bit per toss on average.
:::

::: example Entropies of small distributions {#ex-entropy}
Compute in bits the entropy of (a) the distribution $(\tfrac12, \tfrac14, \tfrac18, \tfrac18)$ and (b) the uniform distribution over the $50{,}257$ tokens of the GPT-2 vocabulary.
::: solution
(a) $H = \tfrac12\cdot1 + \tfrac14\cdot2 + \tfrac18\cdot3 + \tfrac18\cdot3 = 1.75$ bits. A code that gives the four outcomes the codewords `0`, `10`, `110`, `111` uses exactly $1.75$ bits per outcome on average, and no code can do better (see [[#thm-source-coding]]).

(b) $H = \log_250{,}257 = 15.62$ bits, or $\ln50{,}257 = 10.83$ nats. This is the loss of a model that knows nothing — it assigns probability $1/50{,}257$ to every token — and so the natural starting point of a training curve: an untrained language model's loss is close to $\ln\lvert\mathcal{V}\rvert$.
:::
:::

::: proposition Bounds on entropy {#prop-entropy-bounds}
For any distribution $p$ on $K$ outcomes, $0\le H(p)\le\log K$. The lower bound is attained exactly when $p$ puts all its mass on one outcome, the upper bound exactly when $p$ is uniform.
:::

::: proof
Each term $-p(x)\log p(x)$ is $\ge0$ because $0\le p(x)\le1$, and it is $0$ only if $p(x)\in\{0, 1\}$; all terms vanish only for a point mass. The upper bound follows from Gibbs' inequality below with $q$ uniform: $0\le\operatorname{KL}(p\,\Vert\,u) = \sum_xp(x)\log\big(p(x)K\big) = \log K - H(p)$, with equality only if $p = u$.
:::

## Cross-entropy and KL divergence {#sec-kl}

A model $q$ predicts outcomes that are really drawn from $p$. If we measure the model's surprise, $-\log q(x)$, at outcomes drawn from $p$, we get its cross-entropy.

::: definition Cross-entropy and Kullback–Leibler divergence {#def-kl}
For distributions $p$ and $q$ on the same set, the **cross-entropy** of $q$ relative to $p$ is

$$
H(p, q) = -\sum_xp(x)\log q(x) = \E_{x\sim p}\big[-\log q(x)\big],
$$

and the **Kullback–Leibler divergence** (relative entropy) from $q$ to $p$ is

$$
\operatorname{KL}(p\,\Vert\,q) = \sum_xp(x)\log\frac{p(x)}{q(x)} = H(p, q) - H(p).
$$ {#eq-kl}

They are infinite if $q(x) = 0$ for some $x$ with $p(x) > 0$.
:::

The decomposition [[#eq-kl]] reads: the average surprise of the model is the irreducible uncertainty of the data, $H(p)$, plus a penalty $\operatorname{KL}(p\,\Vert\,q)$ for using the wrong distribution. In coding terms, $H(p, q)$ is the average length of a code designed for $q$ when the data come from $p$, and the KL divergence is the number of extra bits wasted by the mismatch. That penalty is never negative.

::: theorem Gibbs' inequality {#thm-gibbs}
For any distributions $p$ and $q$ on a finite or countable set,

$$
\operatorname{KL}(p\,\Vert\,q)\ge0,
$$

with equality if and only if $p = q$. Equivalently $H(p, q)\ge H(p)$: no model predicts data from $p$ better, on average, than $p$ itself.
:::

::: proof
We use the inequality $\ln t\le t - 1$ for $t > 0$, with equality only at $t = 1$ (the line $t - 1$ is the tangent of the concave function $\ln t$ at $t = 1$). We may assume $q(x) > 0$ wherever $p(x) > 0$, since otherwise the divergence is $+\infty$. Let $S = \{x : p(x) > 0\}$. Then, in nats,

$$
-\operatorname{KL}(p\,\Vert\,q) = \sum_{x\in S}p(x)\ln\frac{q(x)}{p(x)}\le\sum_{x\in S}p(x)\Big(\frac{q(x)}{p(x)} - 1\Big) = \sum_{x\in S}q(x) - \sum_{x\in S}p(x)\le1 - 1 = 0.
$$

(Other bases differ by a positive factor.) Equality requires equality in both steps: $q(x)/p(x) = 1$ for every $x\in S$, and $\sum_{x\in S}q(x) = 1$, so $q$ puts no mass outside $S$. Together these say $q = p$. Conversely $\operatorname{KL}(p\,\Vert\,p) = \sum p\log1 = 0$.
:::

::: warning KL divergence is not a distance
$\operatorname{KL}(p\,\Vert\,q)\ne\operatorname{KL}(q\,\Vert\,p)$ in general, and the divergence does not satisfy the triangle inequality; it is a measure of mismatch, not a metric. It is also unbounded: if the model gives probability $0$ — or, in floating point, a probability that underflows to $0$ — to an outcome that can occur, the divergence and the cross-entropy are infinite. This is one reason a softmax output layer, which never outputs an exact zero, is used, and why losses are computed from logits with log-sum-exp rather than from rounded probabilities.
:::

The asymmetry matters in practice, because the two directions punish different mistakes. $\operatorname{KL}(p\,\Vert\,q)$ averages over $p$: it is large if $q$ is small where $p$ is large, so a model fitted by minimising it spreads its mass to **cover** every region the data occupy. $\operatorname{KL}(q\,\Vert\,p)$ averages over $q$: it is large if $q$ puts mass where $p$ is small, so a model fitted by minimising it **seeks a mode** and may ignore other modes altogether.

::: example Forward and reverse KL {#ex-kl-directions}
The data distribution over three outcomes is bimodal, $p = (0.495, 0.01, 0.495)$. Compare two models: the uniform $q_1 = (\tfrac13, \tfrac13, \tfrac13)$, which covers everything, and $q_2 = (0.98, 0.01, 0.01)$, which picks one mode. Compute both divergences, in nats, for each.
::: solution
Forward: $\operatorname{KL}(p\,\Vert\,q_1) = 2\cdot0.495\ln(0.495\cdot3) + 0.01\ln(0.03) = 0.392 - 0.035 = 0.356$, and $\operatorname{KL}(p\,\Vert\,q_2) = 0.495\ln\frac{0.495}{0.98} + 0 + 0.495\ln\frac{0.495}{0.01} = -0.338 + 1.931 = 1.593$. The forward divergence strongly prefers the covering model $q_1$, because $q_2$ almost ignores a mode that has half the data.

Reverse: $\operatorname{KL}(q_1\,\Vert\,p) = 2\cdot\tfrac13\ln\frac{1/3}{0.495} + \tfrac13\ln\frac{1/3}{0.01} = -0.264 + 1.169 = 0.905$, and $\operatorname{KL}(q_2\,\Vert\,p) = 0.98\ln\frac{0.98}{0.495} + 0 + 0.01\ln\frac{0.01}{0.495} = 0.669 - 0.039 = 0.630$. The reverse divergence prefers the mode-seeking $q_2$, because $q_1$ puts a third of its mass on the outcome that $p$ almost never produces.
:::
:::

Both directions appear in language-model training. Pretraining minimises the forward divergence from the data to the model (next section), which is why base models spread probability over many plausible continuations. Reinforcement learning from human feedback adds a penalty $\beta\operatorname{KL}(\pi_\theta\,\Vert\,\pi_{\text{ref}})$, a reverse-direction divergence of the tuned policy from the reference model, averaged over the policy's own samples; it keeps the tuned model from drifting into regions the reference model considers unlikely, and is part of why tuned models are more deterministic than base models.

## Why language models minimise cross-entropy {#sec-why-ce}

::: proposition Cross-entropy loss, maximum likelihood and KL {#prop-mle-kl}
Let $\hat p$ be the empirical distribution of a data set $x_1, \dots, x_N$ (each observed value has probability equal to its frequency), and let $q_\theta$ be a model. Then the average negative log-likelihood is a cross-entropy,

$$
-\frac1N\sum_{n=1}^N\log q_\theta(x_n) = H(\hat p, q_\theta) = H(\hat p) + \operatorname{KL}(\hat p\,\Vert\,q_\theta),
$$

so maximising the likelihood, minimising the cross-entropy loss and minimising $\operatorname{KL}(\hat p\,\Vert\,q_\theta)$ are the same problem. If the model family contains $\hat p$, the minimum is attained at $q_\theta = \hat p$ and the minimal loss is $H(\hat p)$.
:::

::: proof
Group the sum by value: if $x$ occurs $c(x)$ times then $-\frac1N\sum_n\log q_\theta(x_n) = -\sum_x\frac{c(x)}N\log q_\theta(x) = -\sum_x\hat p(x)\log q_\theta(x) = H(\hat p, q_\theta)$. The decomposition is [[#eq-kl]]. $H(\hat p)$ does not depend on $\theta$, so the three objectives differ by a constant. By [[#thm-gibbs]] the divergence is zero exactly when $q_\theta = \hat p$. (This also proves the categorical MLE of [[math-for-ml/estimation#prop-categorical-mle]] without Lagrange multipliers.)
:::

For a language model the same argument applies to each context: the loss $-\frac1N\sum_t\log p_\theta(x_t\mid x_{<t})$ is the average over contexts of the cross-entropy between the data's next-token distribution and the model's. Replacing the empirical distribution by the true distribution of text — which is what the loss on fresh data estimates — gives a statement about generalisation: the expected loss of any model is at least the **entropy of the text-generating process**, and the excess is the model's KL divergence from it. The loss of a perfect model would not be zero; it would be the irreducible uncertainty of language itself. The empirical scaling laws of [[scaling]] fit exactly such a form, a power law in model size and data plus a constant "irreducible" term — though that constant is a fitted number, not a measured entropy.

::: quiz
A model's validation loss is $2.1$ nats per token, and the entropy of the text source is (somehow) known to be $1.6$ nats per token. What is the model's average KL divergence from the source, per token?
- [ ] $3.7$ nats
- [x] $0.5$ nats
- [ ] $1.31$ nats, the ratio of the two
- [ ] It cannot be determined from these numbers
::: solution
By [[#eq-kl]], cross-entropy = entropy + KL, so the KL divergence is $2.1 - 1.6 = 0.5$ nats per token. This is the part of the loss that a better model could remove; the $1.6$ nats cannot be removed by any model.
:::
:::

## Perplexity {#sec-perplexity}

Language-model losses are often reported as perplexities, which turn an average log-probability back into a number of choices.

::: definition Perplexity {#def-perplexity}
The **perplexity** of a model on a text of $N$ tokens is the exponential of its average negative log-likelihood (in nats),

$$
\operatorname{PPL} = \exp\Big(-\frac1N\sum_{t=1}^N\ln p_\theta(x_t\mid x_{<t})\Big) = \Big(\prod_{t=1}^N\frac{1}{p_\theta(x_t\mid x_{<t})}\Big)^{1/N}.
$$

With the loss in bits, $\operatorname{PPL} = 2^{\text{loss}}$; the value is the same.
:::

Perplexity is the geometric mean of the inverse probabilities the model gave to the actual tokens. A model that spread its probability uniformly over $K$ tokens at every step would have perplexity exactly $K$, so a perplexity of $20$ means the model is, on average, as uncertain as if it were choosing uniformly among $20$ tokens — its **effective branching factor**. Since $\exp$ is increasing, lower perplexity and lower loss are the same thing, but perplexity exaggerates differences at high loss and compresses them at low loss: a loss improvement of $0.1$ nats is a $10\%$ change in perplexity at any level.

::: example Entropy, cross-entropy and perplexity in code {#ex-perplexity}
For the "true" next-token distribution $p = (0.5, 0.25, 0.125, 0.125)$ and a model $q = (0.4, 0.3, 0.2, 0.1)$, compute $H(p)$, $H(p, q)$ and both KL divergences in bits. Then compute the loss and perplexity of a model that gave probabilities $0.2, 0.05, 0.6, 0.1, 0.3$ to the five tokens of a held-out text.
::: solution
```python
import math

def entropy(p):                      # in nats; terms with p_i = 0 contribute 0
    return -sum(pi * math.log(pi) for pi in p if pi > 0)

def cross_entropy(p, q):             # H(p, q) = -sum p_i log q_i
    return -sum(pi * math.log(qi) for pi, qi in zip(p, q) if pi > 0)

def kl(p, q):                        # KL(p || q) = H(p, q) - H(p)
    return sum(pi * math.log(pi / qi) for pi, qi in zip(p, q) if pi > 0)

p = [0.5, 0.25, 0.125, 0.125]        # "true" next-token distribution, shape (4,)
q = [0.4, 0.3, 0.2, 0.1]             # model distribution, shape (4,)
bits = 1 / math.log(2)
print("H(p)    =", round(entropy(p) * bits, 4), "bits")
print("H(p,q)  =", round(cross_entropy(p, q) * bits, 4), "bits")
print("KL(p|q) =", round(kl(p, q) * bits, 4), "bits;  KL(q|p) =", round(kl(q, p) * bits, 4))

# perplexity of a model on a held-out text from the probabilities of its tokens
token_probs = [0.2, 0.05, 0.6, 0.1, 0.3]
loss = -sum(math.log(t) for t in token_probs) / len(token_probs)   # nats per token
print("loss =", round(loss, 4), "nats/token, perplexity =", round(math.exp(loss), 4))
```

```text
H(p)    = 1.75 bits
H(p,q)  = 1.8007 bits
KL(p|q) = 0.0507 bits;  KL(q|p) = 0.0536
loss = 1.7245 nats/token, perplexity = 5.6098
```

The model wastes only $0.05$ bits per token relative to the true distribution, and the two KL directions differ slightly, as they generally do. The held-out perplexity $5.61$ is the geometric mean of $1/0.2, 1/0.05, 1/0.6, 1/0.1, 1/0.3$, that is $(1/0.00018)^{1/5}$; the single token with probability $0.05$ contributes most of the loss.
:::
:::

::: warning Perplexities are only comparable with the same tokeniser
Perplexity is per token, and different tokenisers cut the same text into different numbers of tokens. A model with a large vocabulary uses fewer, longer tokens, each harder to predict, so its per-token perplexity is higher even if it models the text equally well. To compare models with different tokenisers, convert the total log-likelihood of a text to **bits per byte** (or per character): divide the total loss in bits by the number of bytes of the text. The total information is a property of the text and the model, not of how the text was cut up.
:::

::: example Converting units {#ex-bits-per-byte}
A model has a validation loss of $2.0$ nats per token, and its tokeniser produces on average one token per $4$ bytes of text. Give the perplexity, the loss in bits per token, and the bits per byte.
::: solution
Perplexity $e^{2.0} = 7.39$. Bits per token $2.0/\ln2 = 2.885$. Bits per byte $2.885/4 = 0.721$. For comparison, Shannon (1951) estimated from human prediction experiments that printed English carries roughly $0.6$ to $1.3$ bits per character, and a byte of English text is usually one character; general-purpose compressors such as gzip typically achieve a few bits per byte on English.
:::
:::

## Coding and compression {#sec-coding}

The coding interpretation of entropy is a theorem, not a metaphor.

::: theorem Source coding theorem (Shannon, 1948) {#thm-source-coding}
Any uniquely decodable binary code for the outcomes of a distribution $p$ has an average codeword length of at least $H(p)$ bits, and there are codes with average length less than $H(p) + 1$. Encoding long sequences of independent outcomes together, the average length per outcome can be brought arbitrarily close to $H(p)$.
:::

The proof (Cover and Thomas, chapter 5) uses the Kraft inequality, which says that codeword lengths $\ell(x)$ of a uniquely decodable code satisfy $\sum_x2^{-\ell(x)}\le1$; the lengths therefore define a sub-probability distribution $q(x)\propto2^{-\ell(x)}$, and Gibbs' inequality shows that the average length $\sum_xp(x)\ell(x)$ is at least $H(p)$. A code built for a model $q$ — lengths $\lceil-\log_2q(x)\rceil$ — costs $H(p, q)$ bits on average, up to one bit.

**Arithmetic coding** (Rissanen, 1976; Pasco, 1976) removes the rounding: given any sequential model of $p_\theta(x_t\mid x_{<t})$, it encodes a whole sequence in about $-\log_2p_\theta(x_{1:N}) + 2$ bits. A language model with a loss of $L$ bits per token is therefore, together with arithmetic coding, a lossless compressor that uses about $L$ bits per token. Delétang et al. (2024) demonstrated this with large language models, which compress text far better than general-purpose compressors (though the model itself must be counted if it has to be transmitted). Prediction and compression are the same problem.

## Mutual information {#sec-mutual}

::: definition Conditional entropy and mutual information {#def-mutual}
For random variables $X$ and $Y$ with joint distribution $p(x, y)$, the **conditional entropy** is $H(X\mid Y) = -\sum_{x, y}p(x, y)\log p(x\mid y)$, the average uncertainty about $X$ remaining once $Y$ is known. The **mutual information** is

$$
I(X; Y) = \operatorname{KL}\big(p(x, y)\,\Vert\,p(x)p(y)\big) = H(X) - H(X\mid Y) = H(Y) - H(Y\mid X).
$$
:::

Mutual information measures how much knowing one variable reduces uncertainty about the other. By [[#thm-gibbs]] it is never negative, and it is zero exactly when $p(x, y) = p(x)p(y)$, that is when $X$ and $Y$ are independent — unlike covariance, it detects every kind of dependence. Consequently conditioning never increases entropy on average, $H(X\mid Y)\le H(X)$: in language modelling, a longer context can only lower the best achievable loss, which is why models keep improving as they see more context, with diminishing returns.

::: example Mutual information of two binary variables {#ex-mutual}
$X$ and $Y$ are binary with joint probabilities $p(0, 0) = p(1, 1) = 0.4$ and $p(0, 1) = p(1, 0) = 0.1$. Compute $I(X; Y)$ in bits.
::: solution
Both marginals are uniform, so $H(X) = 1$ bit. Given $Y = y$, $X$ equals $y$ with probability $0.4/0.5 = 0.8$, so $H(X\mid Y) = -0.8\log_20.8 - 0.2\log_20.2 = 0.722$ bits. Hence $I(X; Y) = 1 - 0.722 = 0.278$ bits: observing $Y$ removes about a quarter of the uncertainty about $X$.
:::
:::

::: application Distillation and label smoothing
In **knowledge distillation** (Hinton, Vinyals and Dean, 2015) a small model is trained to match the full output distribution of a large one, minimising $H(p_{\text{teacher}}, q_{\text{student}})$ rather than the cross-entropy against one-hot labels. By [[#thm-gibbs]] the minimum is at $q = p_{\text{teacher}}$, so the student learns not only the right answer but the teacher's whole ranking of alternatives — "dark knowledge" that one-hot targets discard. **Label smoothing** (Szegedy et al., 2016) mixes the one-hot target with the uniform distribution, which bounds how confident the trained model can become (exercise 10).
:::

::: widget plot
f: p*log(p/x) + (1-p)*log((1-p)/(1-x))
x: 0.01, 0.99
y: 0, 2
sliders: p=0.3:0.05:0.95:0.05
labels: $\operatorname{KL}(\mathrm{Bern}(p)\,\Vert\,\mathrm{Bern}(q))$ in nats, against $q$
caption: The divergence of a model coin with heads probability $q$ (the horizontal axis) from a true coin with probability $p$ (the slider). It is zero only at $q = p$, as Gibbs' inequality requires, rises slowly near the minimum and steeply as $q$ approaches $0$ or $1$ where the true coin still has mass — overconfidence is punished without bound.
:::

::: history
Ralph Hartley (1928) measured information by the logarithm of the number of possible messages. Claude Shannon's *A Mathematical Theory of Communication* (1948) defined entropy for a probabilistic source, proved the source and channel coding theorems, and illustrated them by generating text from letter and word $n$-gram statistics of English; his *Prediction and Entropy of Printed English* (1951) estimated the entropy of English by asking people to guess the next letter. The same functional form had appeared in statistical mechanics, and Josiah Willard Gibbs proved the inequality now named after him in 1902. Solomon Kullback and Richard Leibler introduced their divergence in 1951. David Huffman (1952) found optimal prefix codes, and Jorma Rissanen and Richard Pasco (1976) introduced arithmetic coding. Perplexity was proposed as a measure of the difficulty of speech-recognition tasks by Jelinek, Mercer, Bahl and Baker (1977), and has been the standard metric of language modelling ever since.
:::

::: summary
- The information content of an outcome is $-\log p$; entropy $H(p)$ is its expectation, between $0$ and $\log K$, in bits or nats ($1$ nat $= 1.443$ bits).
- Cross-entropy $H(p, q)$ is the average surprise of a model $q$ on data from $p$, and $H(p, q) = H(p) + \operatorname{KL}(p\,\Vert\,q)$.
- Gibbs' inequality: $\operatorname{KL}(p\,\Vert\,q)\ge0$ with equality only if $p = q$, proved from $\ln t\le t - 1$. Hence minimising cross-entropy is maximum likelihood is minimising KL from the data, and a model's loss is at least the entropy of the source.
- KL is asymmetric: the forward direction covers modes, the reverse seeks them. Pretraining uses the forward direction; KL penalties in RLHF use the reverse.
- Perplexity is $e^{\text{loss}}$, an effective branching factor; compare models with different tokenisers in bits per byte. A language model with arithmetic coding is a compressor with about its loss in bits per token.
- Mutual information $I(X; Y) = H(X) - H(X\mid Y)\ge0$ measures every kind of dependence; conditioning never increases entropy on average.
:::

## Exercises

::: exercise An entropy {level=1 check="1.5"}
Compute the entropy in bits of the distribution $(\tfrac12, \tfrac14, \tfrac14)$.
::: solution
$H = \tfrac12\log_22 + 2\cdot\tfrac14\log_24 = 0.5 + 1 = 1.5$ bits.
:::
:::

::: exercise From loss to perplexity {level=1 check="exp(3)"}
A model's validation loss is $3.0$ nats per token. What is its perplexity?
::: solution
$\operatorname{PPL} = e^{3.0}\approx20.09$: the model is as uncertain, on average, as a uniform choice among about $20$ tokens.
:::
:::

::: exercise A constant probability {level=1 check="3"}
A model always gives probability $1/8$ to the correct next token. What is its loss in bits per token, and its perplexity?
::: solution
$-\log_2(1/8) = 3$ bits per token at every position, so the loss is $3$ bits ($2.08$ nats) and the perplexity $2^3 = 8$.
:::
:::

::: exercise KL between two coins {level=2 check="0.5*log2(2)+0.5*log2(2/3)"}
Compute $\operatorname{KL}(p\,\Vert\,q)$ in bits for $p = \mathrm{Bern}(0.5)$ and $q = \mathrm{Bern}(0.25)$, and compare it with $\operatorname{KL}(q\,\Vert\,p)$.
::: solution
$\operatorname{KL}(p\,\Vert\,q) = 0.5\log_2\frac{0.5}{0.25} + 0.5\log_2\frac{0.5}{0.75} = 0.5 - 0.292 = 0.2075$ bits. In the other direction, $\operatorname{KL}(q\,\Vert\,p) = 0.25\log_2\frac{0.25}{0.5} + 0.75\log_2\frac{0.75}{0.5} = -0.25 + 0.439 = 0.189$ bits: close, but not equal.
:::
:::

::: exercise A mutual information {level=2 check="1+0.8*log2(0.8)+0.2*log2(0.2)"}
Using [[#ex-mutual]], verify the value of $I(X; Y)$ by computing $\operatorname{KL}\big(p(x, y)\,\Vert\,p(x)p(y)\big)$ directly.
::: solution
The product of the marginals is $0.25$ for each pair. Then $I = 2\cdot0.4\log_2\frac{0.4}{0.25} + 2\cdot0.1\log_2\frac{0.1}{0.25} = 0.8\cdot0.678 + 0.2\cdot(-1.322) = 0.542 - 0.264 = 0.278$ bits, which equals $1 + 0.8\log_20.8 + 0.2\log_20.2$, as in the example.
:::
:::

::: exercise Bits per byte {level=2 check="2/(4*ln(2))"}
Model A has a loss of $2.0$ nats per token with a tokeniser averaging $4$ bytes per token; model B has $1.6$ nats per token with a tokeniser averaging $3$ bytes per token. Which models the text better? Give A's bits per byte.
::: solution
A: $2.0/(4\ln2) = 0.721$ bits per byte. B: $1.6/(3\ln2) = 0.769$ bits per byte. A models the text better, although its per-token loss (and perplexity, $7.39$ against $4.95$) is higher — its tokens are longer.
:::
:::

::: exercise Entropy of independent variables {level=2}
Show that $H(X, Y) = H(X) + H(Y\mid X)$ (the chain rule for entropy), and deduce from $I(X; Y)\ge0$ that $H(X, Y)\le H(X) + H(Y)$, with equality exactly for independent variables. What does the chain rule say about the total loss of a language model on a sequence?
::: solution
$-\log p(x, y) = -\log p(x) - \log p(y\mid x)$; take expectations under $p(x, y)$ to get $H(X, Y) = H(X) + H(Y\mid X)$. Since $I(X; Y) = H(Y) - H(Y\mid X)\ge0$, $H(Y\mid X)\le H(Y)$, so $H(X, Y)\le H(X) + H(Y)$, with equality iff $I = 0$, i.e. iff $X$ and $Y$ are independent. Repeating the chain rule, $H(X_1, \dots, X_T) = \sum_tH(X_t\mid X_{<t})$: the entropy of a sequence is the sum of the next-token conditional entropies, the information-theoretic counterpart of the chain rule of probability that a language model's loss is built on.
:::
:::

::: exercise KL between Gaussians {level=3 check="ln(2)+2/8-1/2"}
For one-dimensional normal distributions with densities $p = \Normal(\mu_1, \sigma_1^2)$ and $q = \Normal(\mu_2, \sigma_2^2)$, the KL divergence is defined by the integral $\int p\log(p/q)\,dx$. Show that

$$
\operatorname{KL}(p\,\Vert\,q) = \ln\frac{\sigma_2}{\sigma_1} + \frac{\sigma_1^2 + (\mu_1 - \mu_2)^2}{2\sigma_2^2} - \frac12,
$$

and evaluate it for $\mu_1 = 0$, $\sigma_1 = 1$, $\mu_2 = 1$, $\sigma_2 = 2$.
::: solution
$\ln p(x) - \ln q(x) = \ln\frac{\sigma_2}{\sigma_1} - \frac{(x - \mu_1)^2}{2\sigma_1^2} + \frac{(x - \mu_2)^2}{2\sigma_2^2}$. Take expectations under $p$: $\E_p[(x - \mu_1)^2] = \sigma_1^2$ and $\E_p[(x - \mu_2)^2] = \sigma_1^2 + (\mu_1 - \mu_2)^2$. So the divergence is $\ln\frac{\sigma_2}{\sigma_1} - \frac12 + \frac{\sigma_1^2 + (\mu_1 - \mu_2)^2}{2\sigma_2^2}$. For the given values: $\ln2 + \frac{1 + 1}{8} - \frac12 = 0.693 + 0.25 - 0.5 = 0.443$ nats. (This formula, summed over coordinates, is the KL term in the loss of a variational autoencoder.)
:::
:::

::: exercise Gibbs from Jensen {level=3}
Jensen's inequality says that $\E[\phi(Z)]\le\phi(\E Z)$ for a concave function $\phi$, with equality (for strictly concave $\phi$) only if $Z$ is constant with probability one. Give a second proof of [[#thm-gibbs]] by applying it to $\phi = \log$ and $Z = q(X)/p(X)$ with $X\sim p$.
::: solution
With $X\sim p$ restricted to $S = \{p > 0\}$, $-\operatorname{KL}(p\,\Vert\,q) = \E\big[\log\frac{q(X)}{p(X)}\big]\le\log\E\big[\frac{q(X)}{p(X)}\big] = \log\sum_{x\in S}q(x)\le\log1 = 0$. Equality in Jensen requires $q(x)/p(x)$ to be the same constant $c$ for all $x\in S$, and equality in the last step requires $\sum_{x\in S}q(x) = 1$; together $c = 1$ and $q = p$. The two proofs are the same idea: $\ln t\le t - 1$ is the tangent-line form of the concavity of $\log$.
:::
:::

::: exercise Label smoothing bounds the loss {level=3 check="-(0.925*ln(0.925)+3*0.025*ln(0.025))"}
With label smoothing $\varepsilon = 0.1$ over $K = 4$ classes, the target for class $1$ is $\mathbf{t} = (1 - \varepsilon)\mathbf{e}_1 + \frac{\varepsilon}{K}\mathbf{1} = (0.925, 0.025, 0.025, 0.025)$, and the loss is $H(\mathbf{t}, \mathbf{q})$. Which model output $\mathbf{q}$ minimises this loss, what is the minimal loss in nats, and what is the largest logit gap $z_1 - z_j$ the model is encouraged to produce?
::: solution
By [[#thm-gibbs]], $H(\mathbf{t}, \mathbf{q}) = H(\mathbf{t}) + \operatorname{KL}(\mathbf{t}\,\Vert\,\mathbf{q})$ is minimised by $\mathbf{q} = \mathbf{t}$, with minimal loss $H(\mathbf{t}) = -(0.925\ln0.925 + 3\cdot0.025\ln0.025) = 0.072 + 0.277 = 0.349$ nats — not zero, unlike with one-hot targets, where the loss approaches $0$ only as the logit of the correct class goes to infinity. A softmax output equal to $\mathbf{t}$ needs $e^{z_1 - z_j} = 0.925/0.025 = 37$, a logit gap of $\ln37 = 3.61$; with one-hot targets there is no finite optimum, and the logits are pushed apart indefinitely.
:::
:::
