A language model does not output a word. It outputs a **probability distribution** over its whole vocabulary — perhaps $0.53$ for *cat*, $0.32$ for *dog*, a little for everything else — and the text you read was *sampled* from that distribution, one token at a time. Its training data are treated as samples from an unknown distribution over text, its loss is an average over random mini-batches, its weights start as random numbers, and many of its evaluation results are estimates with error bars. Probability is the language in which all of this is stated.

This chapter collects the probability used across the atlas: random variables and their distributions, expectation and variance, joint and conditional probability, the chain rule that turns a language model into a product of next-token predictions, Bayes' rule, the Gaussian distribution and how variance propagates through a layer, and how to sample and estimate by simulation. The rigorous development — probability spaces, densities, limit theorems — is in the Maths Atlas [probability course](/learn/maths/lesson.php?c=probability&l=probability-spaces); here the focus is on the parts machine learning leans on.

## Random variables and distributions {#sec-rv}

A **random variable** is a quantity whose value is determined by chance: the next token, the label of a randomly chosen training example, the value of a randomly initialised weight. Formally it is a function on a probability space, but in practice it is described completely by its **distribution**: which values it takes and with what probabilities.

::: definition Discrete and continuous distributions {#def-distribution}
A **discrete** random variable $X$ taking values in a countable set $\mathcal{X}$ has a **probability mass function** $p(x) = \Prob(X = x)$ with $p(x)\ge0$ and $\sum_{x\in\mathcal{X}}p(x) = 1$. A **continuous** random variable on $\R^d$ has a **probability density** $p(\mathbf{x})\ge0$ with $\int p(\mathbf{x})\,d\mathbf{x} = 1$, so that $\Prob(X\in A) = \int_Ap(\mathbf{x})\,d\mathbf{x}$. The **cumulative distribution function** of a real random variable is $F(x) = \Prob(X\le x)$.
:::

The most important distribution in this atlas is the simplest one: a finite list of probabilities.

::: definition Categorical distribution {#def-categorical}
A random variable $X$ with values in $\{1, \dots, K\}$ has the **categorical distribution** with parameter $\mathbf{p} = (p_1, \dots, p_K)$, written $X\sim\operatorname{Cat}(\mathbf{p})$, if $\Prob(X = k) = p_k$, where $p_k\ge0$ and $\sum_kp_k = 1$. The set of all such $\mathbf{p}$ is the **probability simplex** $\Delta^{K-1}$. The case $K = 2$ is the **Bernoulli** distribution, $\Prob(X = 1) = p$, $\Prob(X = 0) = 1 - p$.
:::

A language model's next-token prediction $p_\theta(\cdot\mid x_{<t})$ is a categorical distribution over $K = \lvert\mathcal{V}\rvert$ tokens, typically produced as $\operatorname{softmax}(\mathbf{z})$ of a vector of logits; the softmax is exactly a map from $\R^K$ onto the interior of the simplex. A few other distributions recur often enough to list:

| distribution | values | probabilities or density | mean | variance |
|---|---|---|---|---|
| Bernoulli$(p)$ | $\{0, 1\}$ | $p^x(1-p)^{1-x}$ | $p$ | $p(1-p)$ |
| Binomial$(n, p)$ | $\{0, \dots, n\}$ | $\binom nkp^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Uniform$(a, b)$ | $[a, b]$ | $1/(b - a)$ | $(a + b)/2$ | $(b - a)^2/12$ |
| Normal $\Normal(\mu, \sigma^2)$ | $\R$ | $\frac{1}{\sqrt{2\pi}\sigma}e^{-(x-\mu)^2/2\sigma^2}$ | $\mu$ | $\sigma^2$ |
| Exponential$(\lambda)$ | $[0, \infty)$ | $\lambda e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |

The binomial counts successes in $n$ independent Bernoulli trials — for instance, how many of $n$ benchmark questions a model answers correctly if each is right with probability $p$. The normal (Gaussian) distribution is the default model of continuous noise and the usual distribution of initial weights.

::: widget distribution
dist: binomial
params: n=40, p=0.7
a: 24
b: 32
normal: true
caption: The number of correct answers on $40$ questions for a model that answers each correctly with probability $0.7$ independently: mean $28$, standard deviation $\sqrt{40\cdot0.7\cdot0.3} = 2.9$. The shaded region is $\Prob(24\le X\le32)$. With the normal approximation switched on you can see why accuracy on a small benchmark is uncertain by several percentage points.
:::

::: warning A density is not a probability
A probability mass is at most $1$, but a probability density can be any nonnegative number: the uniform density on $[0, 0.1]$ is $10$ everywhere on that interval. Only integrals of a density are probabilities, and for a continuous variable $\Prob(X = x) = 0$ for every single $x$. This matters when comparing likelihoods: the log-density of a continuous model can be positive, and log-likelihoods of continuous and discrete models are not on the same scale.
:::

## Expectation and variance {#sec-expectation}

::: definition Expectation, variance and covariance {#def-expectation}
The **expectation** (mean) of a function $g$ of a random variable $X$ is

$$
\E[g(X)] = \sum_xg(x)\,p(x)\quad\text{or}\quad\E[g(X)] = \int g(x)\,p(x)\,dx.
$$

The **variance** is $\Var(X) = \E\big[(X - \E X)^2\big] = \E[X^2] - (\E X)^2$, its square root the **standard deviation**, and the **covariance** of $X$ and $Y$ is $\Cov(X, Y) = \E\big[(X - \E X)(Y - \E Y)\big] = \E[XY] - \E X\,\E Y$. For a random vector $\mathbf{X}\in\R^d$ the **covariance matrix** has entries $\Sigma_{ij} = \Cov(X_i, X_j)$.
:::

Machine learning is full of expectations. The training objective is an expected loss, $\E_{(x, y)\sim\text{data}}[\ell(\theta; x, y)]$; a mini-batch average is a random estimate of it; the gradient of the loss is an expectation of per-example gradients. The two rules that make them tractable are these.

::: proposition Linearity of expectation; variance of a sum {#prop-linearity}
For random variables $X_1, \dots, X_n$ and constants $a_1, \dots, a_n$,

$$
\E\Big[\sum_ia_iX_i\Big] = \sum_ia_i\E[X_i],
$$

whether or not the $X_i$ are independent. If they are pairwise uncorrelated (in particular, if they are independent), then

$$
\Var\Big(\sum_ia_iX_i\Big) = \sum_ia_i^2\Var(X_i).
$$
:::

::: proof
Linearity holds because sums and integrals are linear: $\E[aX + bY] = \sum_{x, y}(ax + by)p(x, y) = a\sum_xx\,p(x) + b\sum_yy\,p(y)$, using that summing the joint mass over one variable gives the marginal of the other. For the variance, put $\mu_i = \E X_i$; then

$$
\Var\Big(\sum_ia_iX_i\Big) = \E\Big[\Big(\sum_ia_i(X_i - \mu_i)\Big)^2\Big] = \sum_{i, j}a_ia_j\Cov(X_i, X_j),
$$

and if the covariances with $i\ne j$ vanish, only the terms $a_i^2\Var(X_i)$ remain. Independence implies zero covariance since $\E[X_iX_j] = \E X_i\,\E X_j$ for independent variables.
:::

The second formula has a consequence that runs through all of machine learning: the mean $\bar X = \frac1n\sum_iX_i$ of $n$ independent copies of $X$ has variance $\Var(X)/n$, so its standard deviation shrinks like $1/\sqrt n$. Averaging $100$ times as many samples makes an estimate only $10$ times more precise. This is why mini-batch gradients get less noisy only slowly as the batch grows, and why a benchmark needs thousands of questions to measure accuracy to within a percentage point.

::: example Mean and variance of a categorical variable {#ex-mean-var}
A model's next token is *cat*, *dog* or *car* with probabilities $0.5$, $0.3$, $0.2$. Let $X$ be the number of letters in the sampled word that are vowels, and $L$ the indicator that the token is *cat*. Find $\E L$ and $\Var L$, and the mean and variance of the fraction of *cat* in $n = 400$ independent samples.
::: solution
Each word has exactly one vowel, so $X = 1$ always: $\E X = 1$, $\Var X = 0$ — a random variable can be constant. $L$ is Bernoulli with $p = 0.5$: $\E L = 0.5$ and $\Var L = 0.5\cdot0.5 = 0.25$. The fraction $\bar L$ of *cat* among $400$ samples has mean $0.5$ and variance $0.25/400 = 0.000625$, standard deviation $0.025$: in repeated runs of $400$ samples the observed fraction typically lands between about $0.45$ and $0.55$.
:::
:::

## Joint and conditional probability {#sec-conditional}

::: definition Joint, marginal and conditional distributions {#def-conditional}
For two random variables $X$ and $Y$ the **joint distribution** $p(x, y) = \Prob(X = x, Y = y)$ gives the probability of each pair. The **marginal** of $X$ is $p(x) = \sum_yp(x, y)$. When $p(x) > 0$ the **conditional distribution** of $Y$ given $X = x$ is

$$
p(y\mid x) = \frac{p(x, y)}{p(x)}.
$$

$X$ and $Y$ are **independent** if $p(x, y) = p(x)\,p(y)$ for all $x, y$, equivalently $p(y\mid x) = p(y)$. (For continuous variables replace masses by densities and sums by integrals.)
:::

Conditioning is the operation a language model performs at every step: it reports the distribution of the next token *given* the tokens so far. Rearranging the definition gives $p(x, y) = p(x)\,p(y\mid x)$, and applying this repeatedly gives the identity on which autoregressive language modelling rests.

::: proposition Chain rule of probability {#prop-chain-rule}
For random variables $X_1, \dots, X_T$,

$$
p(x_1, x_2, \dots, x_T) = \prod_{t=1}^Tp(x_t\mid x_1, \dots, x_{t-1}) = \prod_{t=1}^Tp(x_t\mid x_{<t}),
$$ {#eq-chain-rule}

whenever the conditional probabilities are defined (the factor for $t = 1$ is $p(x_1)$).
:::

::: proof
By induction on $T$. For $T = 1$ there is nothing to prove. If the formula holds for $T - 1$, the definition of conditional probability applied to the pair $(X_{<T}, X_T)$ gives $p(x_{<T}, x_T) = p(x_{<T})\,p(x_T\mid x_{<T})$, and substituting the induction hypothesis for $p(x_{<T})$ gives [[#eq-chain-rule]].
:::

The chain rule involves no approximation: *any* distribution over sequences can be written as a product of next-token distributions. A language model $p_\theta(x_t\mid x_{<t})$ therefore defines a full probability distribution over texts, and it can be trained one position at a time while still modelling whole sequences. The approximations lie elsewhere — in the model's limited capacity and context length, not in the factorisation. Earlier $n$-gram models approximated $p(x_t\mid x_{<t})$ by conditioning on only the last $n - 1$ tokens, a **Markov assumption**.

::: example The probability of a sentence {#ex-sentence}
A model assigns $p(\textit{the}) = 0.05$ at the start of a text, $p(\textit{cat}\mid\textit{the}) = 0.01$ and $p(\textit{sat}\mid\textit{the cat}) = 0.2$. What probability does it give to the three-token text *the cat sat*, and what is its log-probability?
::: solution
By [[#eq-chain-rule]], $p = 0.05\cdot0.01\cdot0.2 = 10^{-4}$. The log-probability is $\ln0.05 + \ln0.01 + \ln0.2 = -2.996 - 4.605 - 1.609 = -9.210$. Products of many probabilities underflow quickly — a $1000$-token text easily has probability below $10^{-1000}$, far smaller than any floating-point number — so models always work with sums of log-probabilities. The average negative log-probability per token, here $9.210/3 = 3.07$ nats, is the cross-entropy loss of [[math-for-ml/information-theory]].
:::
:::

::: quiz
Two random variables $X$ and $Y$ have $\Cov(X, Y) = 0$. Which statement must be true?
- [ ] $X$ and $Y$ are independent
- [x] $\Var(X + Y) = \Var(X) + \Var(Y)$
- [ ] $p(y\mid x) = p(y)$ for all $x$ and $y$
- [ ] $\E[XY] = 0$
::: solution
$\Var(X + Y) = \Var X + \Var Y + 2\Cov(X, Y)$, so zero covariance is exactly what is needed for the variances to add. Zero covariance does not imply independence (exercise 6 gives a counterexample), and $\E[XY] = \E X\,\E Y$, which is zero only if one of the means is.
:::
:::

### Bayes' rule {#sec-bayes}

::: theorem Bayes' rule {#thm-bayes}
If $p(y) > 0$, then

$$
p(x\mid y) = \frac{p(y\mid x)\,p(x)}{p(y)} = \frac{p(y\mid x)\,p(x)}{\sum_{x'}p(y\mid x')\,p(x')}.
$$ {#eq-bayes}
:::

::: proof
Both $p(x\mid y)p(y)$ and $p(y\mid x)p(x)$ equal the joint $p(x, y)$ by the definition of conditional probability; divide by $p(y)$. The denominator is the marginal $p(y) = \sum_{x'}p(x', y)$, written with the same identity.
:::

Bayes' rule reverses a conditional: from how likely the evidence $y$ is under each hypothesis $x$ (the **likelihood**) and how likely each hypothesis was beforehand (the **prior**), it gives how likely each hypothesis is after seeing the evidence (the **posterior**). It is the basis of the MAP estimation of [[math-for-ml/estimation]], and of reasoning about classifiers and filters, where it corrects a very common error.

::: example A content filter and the base rate {#ex-bayes}
A classifier flags harmful requests. It flags $90\%$ of harmful requests (sensitivity) and wrongly flags $5\%$ of harmless ones (a $95\%$ specificity). One request in a hundred is harmful. If a request is flagged, what is the probability that it is harmful?
::: solution
Let $H$ be "harmful" and $F$ "flagged". By [[#eq-bayes]],

$$
\Prob(H\mid F) = \frac{\Prob(F\mid H)\Prob(H)}{\Prob(F\mid H)\Prob(H) + \Prob(F\mid\neg H)\Prob(\neg H)} = \frac{0.9\cdot0.01}{0.9\cdot0.01 + 0.05\cdot0.99} = \frac{0.009}{0.0585} = 0.154.
$$

Only about $15\%$ of flagged requests are harmful, although the classifier is "$90\%$ accurate" on harmful ones: harmless requests are so much more common that their $5\%$ false alarms outnumber the true detections more than five to one. In natural frequencies: of $10{,}000$ requests, $100$ are harmful and $90$ of those are flagged, while $495$ of the $9{,}900$ harmless ones are flagged too.
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.9
specificity: 0.95
caption: [[#ex-bayes]] as natural frequencies. Raise the prevalence and the flagged requests become mostly true positives; lower it and even an excellent classifier produces mostly false alarms. Confusing $\Prob(F\mid H)$ with $\Prob(H\mid F)$ is the base-rate fallacy.
:::

## The Gaussian and variance through a layer {#sec-gaussian}

::: definition Multivariate normal distribution {#def-gaussian}
A random vector $\mathbf{X}\in\R^d$ has the **multivariate normal distribution** $\Normal(\boldsymbol{\mu}, \Sigma)$, with mean $\boldsymbol{\mu}$ and positive definite covariance $\Sigma$, if its density is

$$
p(\mathbf{x}) = \frac{1}{(2\pi)^{d/2}\det(\Sigma)^{1/2}}\exp\Big(-\tfrac12(\mathbf{x} - \boldsymbol{\mu})^\top\Sigma^{-1}(\mathbf{x} - \boldsymbol{\mu})\Big).
$$

The **standard normal** is $\Normal(\mathbf{0}, I)$, whose coordinates are independent $\Normal(0, 1)$ variables.
:::

Gaussians are closed under the operations networks perform: if $\mathbf{X}\sim\Normal(\boldsymbol{\mu}, \Sigma)$ then $A\mathbf{X} + \mathbf{b}\sim\Normal(A\boldsymbol{\mu} + \mathbf{b}, A\Sigma A^\top)$, and marginals and conditionals of Gaussians are Gaussian. The level sets of the density are ellipsoids whose axes are the eigenvectors of $\Sigma$ ([[math-for-ml/matrix-decompositions]]). The central limit theorem — a sum of many independent small effects is approximately normal — explains why Gaussians are such a good default.

The most direct use of variance in deep learning is in choosing the scale of random initial weights.

::: proposition Variance through a linear layer {#prop-init}
Let $y = \sum_{j=1}^nW_jx_j$, where the weights $W_j$ are independent with mean $0$ and variance $\sigma_w^2$, independent of the inputs $x_j$, which have $\E[x_j^2] = v$. Then $\E y = 0$ and

$$
\Var(y) = n\,\sigma_w^2\,v.
$$

The output has the same second moment as the inputs when $\sigma_w^2 = 1/n$.
:::

::: proof
$\E[W_jx_j] = \E W_j\,\E x_j = 0$, so $\E y = 0$. The terms $W_jx_j$ are uncorrelated: for $j\ne k$, $\E[W_jx_jW_kx_k] = \E W_j\,\E[x_jW_kx_k] = 0$ since $W_j$ is independent of everything else and has mean zero. By [[#prop-linearity]], $\Var y = \sum_j\Var(W_jx_j) = \sum_j\E[W_j^2]\E[x_j^2] = n\sigma_w^2v$.
:::

Without this scaling, signals would grow or shrink by a factor of $n\sigma_w^2$ at every layer and explode or vanish geometrically with depth. Choosing $\sigma_w^2 = 1/n_{\text{in}}$ is **LeCun initialisation**; Glorot and Bengio (2010) proposed $2/(n_{\text{in}} + n_{\text{out}})$ to balance the forward and backward passes, and He et al. (2015) used $2/n_{\text{in}}$ for ReLU networks, because a ReLU zeroes half of a symmetric input and so halves its second moment.

::: example Initial weights for GPT-2's width {#ex-init}
For a layer with $n_{\text{in}} = 768$ inputs, what standard deviation should the weights have under LeCun and under He initialisation? GPT-2 initialised its weights from $\Normal(0, 0.02^2)$; what output variance does that give for unit-variance inputs?
::: solution
LeCun: $\sigma_w = 1/\sqrt{768} = 0.0361$. He: $\sigma_w = \sqrt{2/768} = 0.0510$. With $\sigma_w = 0.02$, [[#prop-init]] gives $\Var y = 768\cdot0.0004\cdot1 = 0.307$: each such layer, on its own, shrinks the signal's variance to about a third. In a Transformer this is harmless because of the residual connections and normalisation layers of [[transformers/transformer-block]], which keep the scale of the residual stream under control regardless.
:::
:::

## Sampling and Monte Carlo {#sec-sampling}

To generate text a model must draw a token from $\operatorname{Cat}(\mathbf{p})$. The standard method needs only uniform random numbers.

::: algorithm Inverse-CDF sampling from a categorical distribution {#alg-sample}
Input: probabilities $p_1, \dots, p_K$ summing to $1$.

1. Draw $U$ uniformly from $[0, 1)$.
2. Return the smallest $k$ with $U < p_1 + \dots + p_k$.

The result has the distribution $\operatorname{Cat}(\mathbf{p})$, because $U$ falls in the interval $[p_1 + \dots + p_{k-1},\ p_1 + \dots + p_k)$, of length $p_k$, with probability exactly $p_k$.
:::

Decoding strategies reshape $\mathbf{p}$ before sampling: a **temperature** $\tau$ replaces the logits $\mathbf{z}$ by $\mathbf{z}/\tau$, sharpening the distribution for $\tau < 1$ and flattening it for $\tau > 1$; top-$k$ and top-$p$ sampling set the tail to zero and renormalise. The code below samples $10{,}000$ tokens at two temperatures and compares the observed frequencies with the probabilities.

```python
import math, random

def softmax(z, tau=1.0):
    m = max(z)
    e = [math.exp((v - m) / tau) for v in z]
    s = sum(e)
    return [v / s for v in e]

def sample(p, rng):
    # inverse-CDF sampling from a categorical distribution p (a list summing to 1)
    u, c = rng.random(), 0.0              # u is uniform on [0, 1)
    for i, pi in enumerate(p):
        c += pi                            # c is the CDF at i
        if u < c:
            return i
    return len(p) - 1                      # guard against rounding in the last bin

vocab = ["cat", "dog", "car", "sky"]
z = [2.0, 1.5, 0.5, -1.0]                  # logits, shape (|V|,) = (4,)
rng = random.Random(0)
for tau in (1.0, 0.5):
    p = softmax(z, tau)
    n = 10000
    counts = [0] * len(z)
    for _ in range(n):
        counts[sample(p, rng)] += 1
    print("tau", tau, "p", [round(x, 3) for x in p], "freq", [c / n for c in counts])
```

```text
tau 1.0 p [0.532, 0.323, 0.119, 0.026] freq [0.5301, 0.3276, 0.1173, 0.025]
tau 0.5 p [0.704, 0.259, 0.035, 0.002] freq [0.7034, 0.2566, 0.0379, 0.0021]
```

At $\tau = 0.5$ the unlikely token *sky* almost disappears ($0.2\%$), and the most likely one takes $70\%$. The frequencies differ from the probabilities by amounts of order $\sqrt{p(1 - p)/n}$ — about $0.005$ for $p = 0.53$ and $n = 10{,}000$ — as [[#prop-linearity]] predicts. The same rule governs every **Monte Carlo estimate**, an average of a function over random samples used in place of an expectation that cannot be computed exactly: the estimate is unbiased, and its standard error is $\sigma/\sqrt n$.

::: example How many samples? {#ex-monte-carlo}
A per-token loss has standard deviation about $2$ nats across the tokens of a validation set. How many independent tokens are needed to estimate the mean loss to a standard error of $0.02$ nats? And how many questions must a benchmark have for the standard error of an accuracy near $70\%$ to be one percentage point?
::: solution
The standard error is $\sigma/\sqrt n$, so $n = (\sigma/0.02)^2 = (2/0.02)^2 = 10{,}000$ tokens — easy for a loss, which is measured on millions of tokens. For accuracy, each question is a Bernoulli variable with $\sigma = \sqrt{0.7\cdot0.3} = 0.458$, so $n = (0.458/0.01)^2 = 2100$ questions. A benchmark of $200$ questions has a standard error of $\sqrt{0.21/200} = 3.2$ points, and two models whose scores differ by $3$ points on it cannot be told apart reliably (see [[math-for-ml/estimation]]).
:::
:::

::: widget clt
dist: bernoulli
n: 50
samples: 2000
caption: Each bar counts how often the mean of $n$ Bernoulli draws — the accuracy on an $n$-question benchmark of a model that answers each question correctly with probability $0.2$ — takes a given value, over $2000$ simulated benchmarks. The spread shrinks like $1/\sqrt n$ and the shape approaches the normal curve predicted by the central limit theorem. Increase $n$ and watch the histogram narrow.
:::

::: application Randomness in training
Randomness enters training in several places, each with its own distribution: initial weights (Gaussian or uniform, scaled by [[#prop-init]]), the order of the data and the composition of each mini-batch (uniform sampling without replacement), dropout masks (independent Bernoulli variables), and, in reinforcement learning from feedback, the sampled responses of the model itself. Fixing the seeds of the random number generators makes a run reproducible on the same hardware and software, but two runs with different seeds can still differ noticeably on small evaluations — run-to-run variance is itself a quantity to measure and report.
:::

::: history
Probability began with games of chance: the correspondence of Blaise Pascal and Pierre de Fermat in 1654 on how to divide the stakes of an interrupted game. Jacob Bernoulli's *Ars Conjectandi* (published 1713) proved the first law of large numbers, Abraham de Moivre found the normal approximation to the binomial (1733), and Thomas Bayes's essay on inverse probability was published posthumously by Richard Price in 1763; Pierre-Simon Laplace developed Bayesian reasoning and the central limit theorem in his *Théorie analytique des probabilités* (1812). Andrey Markov (1913) analysed the sequence of vowels and consonants in Pushkin's *Eugene Onegin* with the chains now named after him — the first statistical model of text. Andrey Kolmogorov's axioms (1933) put probability on the footing of measure theory, and Monte Carlo methods were named and developed by Stanislaw Ulam, John von Neumann and Nicholas Metropolis in the late 1940s.
:::

::: summary
- A language model's output is a categorical distribution over the vocabulary, usually $\operatorname{softmax}(\mathbf{z})$ of the logits; densities describe continuous variables and may exceed $1$.
- Expectation is linear; variances of uncorrelated variables add, so the mean of $n$ independent samples has standard deviation $\sigma/\sqrt n$.
- $p(y\mid x) = p(x, y)/p(x)$. The chain rule $p(x_{1:T}) = \prod_tp(x_t\mid x_{<t})$ is exact and is the foundation of autoregressive language modelling; work with log-probabilities.
- Bayes' rule turns likelihoods and priors into posteriors, and with a small prior even an accurate detector produces mostly false alarms.
- A linear layer multiplies the variance of its inputs by $n\sigma_w^2$, which sets the scale of initial weights. Sample categorical variables by inverse CDF; Monte Carlo estimates have standard error $\sigma/\sqrt n$.
:::

## Exercises

::: exercise Mean and variance {level=1 check="0.61"}
A random variable takes the values $0$, $1$, $2$ with probabilities $0.5$, $0.3$, $0.2$. Find its mean and variance.
::: solution
$\E X = 0 + 0.3 + 0.4 = 0.7$ and $\E X^2 = 0 + 0.3 + 0.8 = 1.1$, so $\Var X = 1.1 - 0.49 = 0.61$.
:::
:::

::: exercise Log-probability of a text {level=1 check="log(0.1)+log(0.02)+log(0.5)+log(0.3)"}
A model gives next-token probabilities $0.1$, $0.02$, $0.5$ and $0.3$ to the four tokens of a text. What is the natural log-probability of the text, and the average negative log-probability per token?
::: solution
By [[#eq-chain-rule]] the log-probability is $\ln0.1 + \ln0.02 + \ln0.5 + \ln0.3 = -2.303 - 3.912 - 0.693 - 1.204 = -8.112$, so the text has probability $0.1\cdot0.02\cdot0.5\cdot0.3 = 3\times10^{-4}$, and the average negative log-probability is $2.028$ nats per token.
:::
:::

::: exercise Variance of a combination {level=1 check="21"}
$X$ and $Y$ are independent with $\Var X = 1$ and $\Var Y = 3$. What is $\Var(3X - 2Y)$?
::: solution
By [[#prop-linearity]], $\Var(3X - 2Y) = 9\Var X + 4\Var Y = 9 + 12 = 21$. The minus sign does not reduce the variance: the coefficient is squared.
:::
:::

::: exercise A detector's precision {level=2 check="0.019/(0.019+0.098)"}
A detector of machine-generated text flags $95\%$ of generated essays and $10\%$ of human-written ones. In a collection, $2\%$ of the essays are generated. What fraction of flagged essays are generated?
::: solution
By [[#eq-bayes]], $\Prob(G\mid F) = \dfrac{0.95\cdot0.02}{0.95\cdot0.02 + 0.10\cdot0.98} = \dfrac{0.019}{0.019 + 0.098} = 0.162$. More than five in six flagged essays are human-written — a strong reason not to treat such a detector's verdict on an individual essay as proof.
:::
:::

::: exercise Initialisation for a wide layer {level=2 check="1/64"}
A linear layer has $4096$ inputs, each with second moment $1$. What standard deviation must the independent zero-mean weights have for the output to have variance $1$? What is the output variance if the weights have standard deviation $0.02$ instead?
::: solution
By [[#prop-init]] we need $4096\,\sigma_w^2 = 1$, so $\sigma_w = 1/64 = 0.015625$. With $\sigma_w = 0.02$ the output variance is $4096\cdot0.0004 = 1.6384$.
:::
:::

::: exercise Uncorrelated but dependent {level=2}
Let $X$ be uniform on $\{-1, 0, 1\}$ and $Y = X^2$. Show that $\Cov(X, Y) = 0$ but that $X$ and $Y$ are not independent.
::: solution
$\E X = 0$ and $\E[XY] = \E[X^3] = (-1 + 0 + 1)/3 = 0$, so $\Cov(X, Y) = \E[XY] - \E X\,\E Y = 0$. But $\Prob(X = 0, Y = 1) = 0$ while $\Prob(X = 0)\Prob(Y = 1) = \frac13\cdot\frac23 = \frac29$, so they are not independent: $Y$ is even a function of $X$. Covariance measures only *linear* dependence.
:::
:::

::: exercise A tail probability {level=2 check="(1-erf(1/sqrt(2)))/2"}
Pre-activations in a layer are distributed as $\Normal(2, 9)$. What fraction of them exceed $5$? (Use $\Prob(Z > z) = \frac12\big(1 - \operatorname{erf}(z/\sqrt2)\big)$ for a standard normal $Z$.)
::: solution
Standardise: $(5 - 2)/3 = 1$, so the fraction is $\Prob(Z > 1) = \frac12(1 - \operatorname{erf}(1/\sqrt2)) = 0.1587$, about one in six — the familiar "one standard deviation above the mean".
:::
:::

::: exercise Sample size for a comparison {level=2 check="22500"}
The per-example loss of a model has standard deviation $1.5$. How many independent examples are needed for the standard error of the mean loss to be $0.01$?
::: solution
$1.5/\sqrt n = 0.01$ gives $\sqrt n = 150$, so $n = 22{,}500$.
:::
:::

::: exercise The law of total variance {level=3}
Prove that $\Var(Y) = \E\big[\Var(Y\mid X)\big] + \Var\big(\E[Y\mid X]\big)$. Interpret it for the gradient noise of mini-batch training, where $X$ is the choice of training example and $Y$ a coordinate of the per-example gradient computed with dropout.
::: solution
Write $m(X) = \E[Y\mid X]$. Then $\E[Y^2\mid X] = \Var(Y\mid X) + m(X)^2$, and taking expectations (the tower rule $\E[\E[\,\cdot\mid X]] = \E[\,\cdot\,]$) gives $\E Y^2 = \E[\Var(Y\mid X)] + \E[m(X)^2]$. Also $\E Y = \E[m(X)]$, so $\Var Y = \E Y^2 - (\E m(X))^2 = \E[\Var(Y\mid X)] + \big(\E[m(X)^2] - (\E m(X))^2\big)$, and the last bracket is $\Var(m(X))$. For training, the total gradient noise splits into the noise from dropout for a fixed example (first term) and the variation of the expected gradient across examples (second term); averaging over a larger batch reduces both, but only the first can be removed by turning dropout off.
:::
:::

::: exercise The Gumbel-max trick {level=3}
Let $G_1, \dots, G_K$ be independent with the standard Gumbel distribution, $\Prob(G\le g) = \exp(-e^{-g})$. Show that for logits $z_1, \dots, z_K$,

$$
\Prob\Big(\arg\max_k(z_k + G_k) = j\Big) = \frac{e^{z_j}}{\sum_ke^{z_k}}.
$$

What does this say about sampling from a softmax?
::: solution
The density of $G$ is $f(g) = e^{-g}\exp(-e^{-g})$. Index $j$ wins when $z_j + G_j = s$ and every other $z_k + G_k < s$; integrating over $s$,

$$
\Prob(j\text{ wins}) = \int_{-\infty}^\infty f(s - z_j)\prod_{k\ne j}\exp\big(-e^{-(s - z_k)}\big)\,ds = \int_{-\infty}^\infty e^{z_j}e^{-s}\exp\Big(-e^{-s}\sum_ke^{z_k}\Big)\,ds,
$$

where the factor $\exp(-e^{-(s - z_j)})$ from $f(s - z_j)$ has been merged into the product. Substituting $t = e^{-s}$, $dt = -e^{-s}\,ds$, the integral becomes $\int_0^\infty e^{z_j}\exp(-tS)\,dt = e^{z_j}/S$ with $S = \sum_ke^{z_k}$. So sampling from $\operatorname{softmax}(\mathbf{z})$ is the same as adding independent Gumbel noise to the logits and taking the argmax — no normalisation or cumulative sum needed. This is used in parallel sampling on accelerators and, in relaxed form, to differentiate through discrete choices (the Gumbel-softmax).
:::
:::

::: exercise A temperature that matches a target {level=3}
For logits $(2, 0)$, find the temperature $\tau$ at which the more likely token has probability exactly $0.8$, and check by simulation in plain Python with $20{,}000$ samples that its frequency is close to $0.8$.
::: solution
With two logits the probability is $1/(1 + e^{-2/\tau})$. Setting it to $0.8$ gives $e^{-2/\tau} = 0.25$, so $2/\tau = \ln4$ and $\tau = 2/\ln4 = 1/\ln2\approx1.443$.

```python
import math, random

tau = 1 / math.log(2)
p0 = 1 / (1 + math.exp(-2 / tau))          # probability of the first token
rng = random.Random(1)
n = 20000
hits = sum(rng.random() < p0 for _ in range(n))
print(round(tau, 4), round(p0, 4), hits / n)
```

```text
1.4427 0.8 0.7985
```

The standard error of the frequency is $\sqrt{0.8\cdot0.2/20000} = 0.0028$, and the observed $0.7985$ is within about half a standard error of $0.8$.
:::
:::
