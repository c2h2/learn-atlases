A weather station on a remote island sends one report a day: "rain" or "dry". If it rains on one day in five, how many bits does a report really carry? A camera sensor produces 12-bit samples, yet a lossless compressor shrinks the file to a third of its size: where did the other bits go? A noisy telemetry link delivers bits of which one in ten is wrong: how much of what was sent survives? These questions all ask for a *measure of information* that depends only on probabilities, not on the meaning of the messages or on how they happen to be written down.

Claude Shannon supplied that measure in 1948. The **entropy** of a random variable is the average number of bits needed to describe its value, and the **mutual information** between two random variables is the number of bits that observing one reveals about the other. This lesson defines both, derives their properties — the chain rule, the inequality $D(p\Vert q) \ge 0$ that underlies nearly every proof in the course, the data-processing inequality and Fano's inequality — and computes them for the binary channels and sources that recur in the rest of the course. We use the discrete probability of [[random-signals/probability-for-engineers]]: random variables with finite alphabets, joint and conditional distributions, expectations and Bayes' rule.

## Information content of an outcome {#sec-self-info}

Suppose a source picks one of $M$ equally likely messages. Naming the message takes $\log_2 M$ binary digits, since $k$ bits can label $2^k$ messages. Ralph Hartley proposed exactly this measure in 1928. But most sources are not uniform: in English text the letter E is about a hundred times more frequent than Z, and a report of "dry" on a dry island tells you little. An outcome should carry *more* information the *less* probable it is.

::: definition Self-information {#def-self-info}
The **self-information** (or **surprisal**) of an outcome $x$ that occurs with probability $p(x) > 0$ is

$$
I(x) = \log_2\frac{1}{p(x)} = -\log_2 p(x)\quad\text{bits}.
$$ {#eq-self-info}

With natural logarithms the unit is the **nat**; $1\,\mathrm{nat} = \log_2 e = 1.443\,\mathrm{bits}$.
:::

A fair coin toss gives $I = 1$ bit, a particular face of a fair die $\log_2 6 = 2.585$ bits, and a certain event ($p = 1$) zero bits. The logarithm is not an arbitrary choice.

::: theorem Uniqueness of the logarithmic measure {#thm-log-unique}
Let $I(p)$, defined for $0 < p \le 1$, be continuous and decreasing, and additive for independent events: $I(pq) = I(p) + I(q)$. Then $I(p) = -k\log p$ for some constant $k > 0$.
:::

::: proof
Put $g(u) = I(e^{-u})$ for $u \ge 0$. Additivity becomes $g(u + v) = g(u) + g(v)$, Cauchy's functional equation. By induction $g(nu) = ng(u)$ for integers $n$, so $g(m/n) = (m/n)g(1)$ for every rational $m/n \ge 0$, and continuity extends this to $g(u) = ug(1)$ for all real $u \ge 0$. Hence $I(p) = g(-\ln p) = -g(1)\ln p$, and $I$ decreasing requires $k = g(1) > 0$. Choosing $k$ so that $I(\tfrac12) = 1$ fixes the unit as the bit.
:::

Additivity is the natural requirement: learning the outcome of two independent experiments should tell you the sum of what each tells you. That single requirement forces the logarithm.

## Entropy {#sec-entropy}

The information of one outcome is itself random. Its average is the quantity that matters for coding long sequences.

::: definition Entropy {#def-entropy}
The **entropy** of a discrete random variable $X$ with alphabet $\mathcal X$ and probability mass function $p(x)$ is

$$
H(X) = \E\left[\log_2\frac{1}{p(X)}\right] = -\sum_{x\in\mathcal X}p(x)\log_2 p(x)\quad\text{bits},
$$ {#eq-entropy}

with the convention $0\log 0 = 0$ (justified by $p\log p \to 0$ as $p \to 0$). For a binary variable with $P(X = 1) = p$ the entropy is the **binary entropy function**

$$
H_b(p) = -p\log_2 p - (1 - p)\log_2(1 - p) .
$$ {#eq-binary-entropy}
:::

Entropy depends only on the probabilities, not on the values: relabelling the outcomes leaves it unchanged, and $H(X)$ is not the same thing as the variance of $X$. It measures **uncertainty before** the observation, which equals the **information gained** by making it.

::: widget plot
f: -x*log2(x) - (1 - x)*log2(1 - x); -log2(x)
x: 0.0005, 0.9995
y: 0, 3
labels: H_b(p); -\log_2 p
tangent: 0.11
caption: The binary entropy function $H_b(p)$ (blue) and the self-information of the outcome $1$ (orange). Drag the tangent point: $H_b$ is concave, symmetric about $p = \tfrac12$ where it reaches its maximum of $1$ bit, and has infinite slope at $p = 0$ and $p = 1$. Notice how steep it is near the ends — $H_b(0.11) \approx 0.5$, so a source that emits a $1$ only $11\,\%$ of the time still carries half a bit per symbol.
:::

::: example Twenty questions {#ex-questions}
A symbol $X$ takes the values $a, b, c, d$ with probabilities $\tfrac12, \tfrac14, \tfrac18, \tfrac18$. Find $H(X)$. Then find a strategy of yes/no questions that identifies $X$ and compute the average number of questions.
::: solution
By [[#eq-entropy]],

$$
H(X) = \tfrac12\log_22 + \tfrac14\log_24 + \tfrac18\log_28 + \tfrac18\log_28 = \tfrac12 + \tfrac12 + \tfrac38 + \tfrac38 = 1.75\,\text{bits}.
$$

Ask first "Is it $a$?" (yes with probability $\tfrac12$: one question). If not, ask "Is it $b$?" (yes: two questions). If not, ask "Is it $c$?" — either answer settles it in three questions. The average is $\tfrac12\cdot1 + \tfrac14\cdot2 + \tfrac14\cdot3 = 1.75$ questions, exactly $H(X)$. Each question was chosen to have a yes probability of $\tfrac12$, so each answer carried a full bit. Writing the answers as bits (yes $= 0$) gives the code $a \to 0$, $b \to 10$, $c \to 110$, $d \to 111$ — a prefix code of the kind constructed in [[information-theory/source-coding]]. When the probabilities are not powers of $\tfrac12$, no question strategy averages exactly $H(X)$, but the entropy remains the lower bound.
:::
:::

The example illustrates the operational meaning that [[information-theory/source-coding]] will prove: $H(X)$ is the smallest average number of bits per symbol with which the source can be described without loss. The next result bounds it.

::: theorem Bounds on entropy {#thm-entropy-bounds}
For a random variable with alphabet of size $\lvert\mathcal X\rvert$,

$$
0 \le H(X) \le \log_2\lvert\mathcal X\rvert .
$$ {#eq-entropy-bounds}

$H(X) = 0$ if and only if $X$ is deterministic (one outcome has probability $1$), and $H(X) = \log_2\lvert\mathcal X\rvert$ if and only if $X$ is uniform.
:::

The lower bound is immediate: each term $-p\log p$ is non-negative and vanishes only at $p = 0$ or $p = 1$. The upper bound follows from Gibbs' inequality below ([[#cor-max-entropy]]). A die has at most $\log_2 6 = 2.585$ bits per throw however it is loaded; the $26$ letters of the alphabet at most $\log_2 26 = 4.70$ bits. The single-letter frequencies of English give about $4.1$ bits, and Shannon's experiments with human predictors in 1951 suggested that, taking context into account, English carries only around one bit per letter — the redundancy that text compressors exploit.

::: quiz
Which source has the larger entropy: $X$ uniform on $\{1, 2, 3, 4\}$, or $Y$ equal to $0$ with probability $\tfrac12$ and otherwise uniform on $\{1, \dots, 8\}$?
- [ ] $X$, because it is uniform
- [x] $Y$: $H(Y) = 2.5$ bits, $H(X) = 2$ bits
- [ ] They are equal
- [ ] $Y$, because its mean is larger
::: solution
$H(X) = \log_24 = 2$. For $Y$: $H(Y) = \tfrac12\log_22 + 8\cdot\tfrac1{16}\log_216 = \tfrac12 + 2 = 2.5$ bits. Uniformity maximises entropy only for a *fixed* alphabet size; $Y$ has nine outcomes. Equivalently, $Y$ is described by first saying whether it is $0$ (one bit) and, half of the time, which of eight values it is (three bits): $1 + \tfrac12\cdot3 = 2.5$. The mean of a variable has nothing to do with its entropy.
:::
:::

## Joint and conditional entropy {#sec-joint}

Communication involves at least two random variables: what was sent and what was received. Their joint entropy is simply the entropy of the pair.

::: definition Joint and conditional entropy {#def-joint-entropy}
For random variables $X, Y$ with joint pmf $p(x, y)$, the **joint entropy** is

$$
H(X, Y) = -\sum_{x, y}p(x, y)\log_2 p(x, y) ,
$$

and the **conditional entropy** of $Y$ given $X$ is the average, over $x$, of the entropy of the conditional distribution $p(y\mid x)$:

$$
H(Y\mid X) = \sum_x p(x)\,H(Y\mid X = x) = -\sum_{x, y}p(x, y)\log_2 p(y\mid x) .
$$ {#eq-cond-entropy}
:::

::: theorem Chain rule for entropy {#thm-chain}
$$
H(X, Y) = H(X) + H(Y\mid X) = H(Y) + H(X\mid Y) .
$$ {#eq-chain}

More generally, $H(X_1, X_2, \dots, X_n) = \sum_{i=1}^n H(X_i\mid X_1, \dots, X_{i-1})$.
:::

::: proof
Take logarithms of $p(x, y) = p(x)p(y\mid x)$: $-\log p(x, y) = -\log p(x) - \log p(y\mid x)$. Taking the expectation over $p(x, y)$ of both sides gives $H(X, Y) = H(X) + H(Y\mid X)$, since $\E[-\log p(X)] = H(X)$ and $\E[-\log p(Y\mid X)] = H(Y\mid X)$ by [[#eq-cond-entropy]]. The other order and the $n$-variable form follow in the same way from $p(x_1, \dots, x_n) = \prod_i p(x_i\mid x_1, \dots, x_{i-1})$.
:::

In words: describing the pair costs as much as describing $X$ and then describing $Y$ to someone who already knows $X$. If $X$ and $Y$ are independent, $p(y\mid x) = p(y)$, so $H(Y\mid X) = H(Y)$ and $H(X, Y) = H(X) + H(Y)$; if $Y = g(X)$ is a function of $X$, $H(Y\mid X) = 0$ and $H(X, Y) = H(X)$. A consequence is $H(g(X)) \le H(X)$: processing a variable by a deterministic function cannot increase its entropy (expand $H(X, g(X))$ both ways).

::: example Weather and forecasts {#ex-weather}
On an island it rains ($X = r$) on $20\,\%$ of days. A forecast $Y$ says "rain" or "dry" with the joint probabilities

| | $Y = $ rain | $Y = $ dry |
|---|---|---|
| $X = r$ | $0.15$ | $0.05$ |
| $X = d$ | $0.10$ | $0.70$ |

Find $H(X)$, $H(Y)$, $H(X, Y)$, $H(X\mid Y)$ and $H(X\mid Y = \text{rain})$.
::: solution
The marginals are $P(X = r) = 0.20$ and $P(Y = \text{rain}) = 0.25$. Hence $H(X) = H_b(0.2) = 0.722$ bits and $H(Y) = H_b(0.25) = 0.811$ bits. The joint entropy is

$$
H(X, Y) = -\big(0.15\log_20.15 + 0.05\log_20.05 + 0.10\log_20.10 + 0.70\log_20.70\big) = 1.319\,\text{bits}.
$$

By the chain rule, $H(X\mid Y) = H(X, Y) - H(Y) = 1.319 - 0.811 = 0.508$ bits: the forecast removes $0.722 - 0.508 = 0.214$ bits of the uncertainty about the weather.

Given a rain forecast, $P(X = r\mid Y = \text{rain}) = 0.15/0.25 = 0.6$, so $H(X\mid Y = \text{rain}) = H_b(0.6) = 0.971$ bits — *more* than $H(X)$. Given a dry forecast, $P(r\mid\text{dry}) = 0.05/0.75 = 0.0667$ and $H(X\mid Y = \text{dry}) = H_b(0.0667) = 0.353$ bits. Their average, $0.25\times0.971 + 0.75\times0.353 = 0.508$ bits, is $H(X\mid Y)$ as [[#eq-cond-entropy]] says.
:::
:::

::: warning Conditioning reduces entropy only on average
We shall prove that $H(X\mid Y) \le H(X)$. It does **not** follow that $H(X\mid Y = y) \le H(X)$ for each $y$: in [[#ex-weather]] a rain forecast leaves you more uncertain (0.971 bits) than you were before (0.722 bits), because it turns a fairly safe bet on dry weather into a near coin toss. Only the average over forecasts is guaranteed to help. A second common slip is to compute $H(X\mid Y)$ as $-\sum_{x,y}p(x\mid y)\log_2p(x\mid y)$, summing the conditional entropies without weighting them; the weight of each term is the *joint* probability $p(x, y)$.
:::

## Relative entropy {#sec-kl}

To prove inequalities such as $H(X\mid Y) \le H(X)$ we need one more quantity, which compares two probability distributions on the same alphabet.

::: definition Relative entropy {#def-kl}
The **relative entropy** (Kullback–Leibler divergence) of a pmf $p$ with respect to a pmf $q$ on the same alphabet is

$$
D(p\Vert q) = \sum_x p(x)\log_2\frac{p(x)}{q(x)} = \E_p\left[\log_2\frac{p(X)}{q(X)}\right],
$$ {#eq-kl}

with $0\log\tfrac0q = 0$ and $p\log\tfrac p0 = \infty$ for $p > 0$.
:::

$D(p\Vert q)$ is the penalty for believing the wrong distribution. If a source has distribution $p$ but you design a code for $q$, giving outcome $x$ a codeword of length $\log_2(1/q(x))$, the average length is $\sum p\log(1/q) = H(p) + D(p\Vert q)$: the divergence is the number of extra bits per symbol you pay ([[information-theory/source-coding]] makes this exact). It is also the exponent of the probability that a long sample from $q$ looks as if it came from $p$, which is why it appears in hypothesis testing and in the error exponents of detection.

::: theorem Gibbs' inequality {#thm-gibbs}
$D(p\Vert q) \ge 0$, with equality if and only if $p = q$.
:::

::: proof
Use $\ln u \le u - 1$ for $u > 0$, with equality only at $u = 1$ (the tangent line of the concave logarithm at $u = 1$ lies above it). Let $S = \{x : p(x) > 0\}$. Then

$$
-D(p\Vert q) = \sum_{x\in S}p(x)\log_2\frac{q(x)}{p(x)} \le \log_2e\sum_{x\in S}p(x)\left(\frac{q(x)}{p(x)} - 1\right) = \log_2e\left(\sum_{x\in S}q(x) - 1\right) \le 0 .
$$

Equality in the first step requires $q(x) = p(x)$ for all $x \in S$, and in the second $\sum_{x\in S}q(x) = 1$; together, $p = q$.
:::

::: corollary Maximum entropy on a finite alphabet {#cor-max-entropy}
$H(X) \le \log_2\lvert\mathcal X\rvert$, with equality if and only if $X$ is uniform.
:::

::: proof
Let $u(x) = 1/\lvert\mathcal X\rvert$. Then $D(p\Vert u) = \sum p\log_2(p\lvert\mathcal X\rvert) = \log_2\lvert\mathcal X\rvert - H(X) \ge 0$, with equality only for $p = u$.
:::

::: warning Relative entropy is not a distance
$D(p\Vert q) \ne D(q\Vert p)$ in general, and the triangle inequality fails. For $p = (0.9, 0.1)$ and $q = (0.5, 0.5)$: $D(p\Vert q) = 1 - H_b(0.1) = 0.531$ bits, but $D(q\Vert p) = 0.5\log_2(0.5/0.9) + 0.5\log_2(0.5/0.1) = 0.737$ bits. Always state which distribution is the "true" one (the first argument, over which the average is taken). $D(p\Vert q)$ is infinite if $q$ assigns probability zero to an outcome that $p$ allows — a code designed for $q$ has no codeword for it.
:::

::: widget plot
f: x*log2(x/q) + (1 - x)*log2((1 - x)/(1 - q)); q*log2(q/x) + (1 - q)*log2((1 - q)/(1 - x))
x: 0.001, 0.999
y: 0, 3
sliders: q=0.5:0.02:0.98:0.01
labels: D(p\Vert q); D(q\Vert p)
caption: Binary relative entropies as functions of $p$ for a fixed $q$ (horizontal axis $p$). Both curves touch zero only at $p = q$, as Gibbs' inequality requires. Move $q$ away from $\tfrac12$ and watch the asymmetry: $D(q\Vert p)$ (orange) blows up as $p \to 0$ or $1$, because the "true" distribution $q$ then has outcomes that $p$ considers nearly impossible.
:::

## Mutual information {#sec-mutual}

How much does observing $Y$ tell us about $X$? The uncertainty about $X$ falls from $H(X)$ to $H(X\mid Y)$, and the difference is the information that $Y$ carries about $X$.

::: definition Mutual information {#def-mutual}
The **mutual information** between $X$ and $Y$ is

$$
I(X; Y) = H(X) - H(X\mid Y) = \sum_{x, y}p(x, y)\log_2\frac{p(x, y)}{p(x)p(y)} = D\big(p(x, y)\,\Vert\,p(x)p(y)\big) .
$$ {#eq-mutual}

The **conditional mutual information** is $I(X; Y\mid Z) = H(X\mid Z) - H(X\mid Y, Z)$.
:::

The three forms are equal: $H(X) - H(X\mid Y) = \E[-\log p(X)] + \E[\log p(X\mid Y)] = \E[\log\tfrac{p(X\mid Y)}{p(X)}] = \E[\log\tfrac{p(X, Y)}{p(X)p(Y)}]$, which is the divergence of the joint distribution from the product of its marginals.

::: theorem Properties of mutual information {#thm-mutual-props}
1. Symmetry: $I(X; Y) = I(Y; X) = H(Y) - H(Y\mid X) = H(X) + H(Y) - H(X, Y)$.
2. Non-negativity: $I(X; Y) \ge 0$, with equality if and only if $X$ and $Y$ are independent. Equivalently, **conditioning reduces entropy**: $H(X\mid Y) \le H(X)$.
3. $I(X; X) = H(X)$: entropy is self-information in the average sense.
4. Chain rule: $I(X; Y_1, Y_2) = I(X; Y_1) + I(X; Y_2\mid Y_1)$.
:::

::: proof
(1) The last form in [[#eq-mutual]] is symmetric in $x$ and $y$; the expressions in entropies follow from the chain rule [[#eq-chain]]. (2) $I(X; Y)$ is a relative entropy, so it is non-negative by [[#thm-gibbs]], and it vanishes exactly when $p(x, y) = p(x)p(y)$. (3) $H(X\mid X) = 0$. (4) By the chain rule for entropy, $H(X\mid Y_1) - H(X\mid Y_1, Y_2) + H(X) - H(X\mid Y_1) = H(X) - H(X\mid Y_1, Y_2)$, which is the left-hand side.
:::

A Venn diagram is a useful mnemonic: draw two overlapping discs of areas $H(X)$ and $H(Y)$. Their union is $H(X, Y)$, the overlap is $I(X; Y)$, and the two crescents are $H(X\mid Y)$ and $H(Y\mid X)$. In [[#ex-weather]], $I(X; Y) = 0.722 + 0.811 - 1.319 = 0.214$ bits per forecast. (The picture fails for three variables, where the central "area" $I(X; Y; Z)$ can be negative.)

::: example The binary symmetric channel {#ex-bsc}
A **binary symmetric channel** (BSC) with crossover probability $p$ delivers its input bit $X$ correctly with probability $1 - p$ and inverted with probability $p$. The input is $1$ with probability $q$. Find $I(X; Y)$. Evaluate it for $p = 0.1$ with equiprobable inputs, and for $p = 0.5$.
::: solution
Write $Y = X \oplus Z$, where the error bit $Z$ is $1$ with probability $p$, independent of $X$. Given $X = x$, $Y$ is $x$ or $\bar x$ with probabilities $1 - p, p$, so $H(Y\mid X = x) = H_b(p)$ for both inputs and $H(Y\mid X) = H_b(p)$. The output is $1$ with probability $r = q(1 - p) + (1 - q)p$. Using the form $I = H(Y) - H(Y\mid X)$,

$$
I(X; Y) = H_b\big(q(1 - p) + (1 - q)p\big) - H_b(p) .
$$ {#eq-bsc-info}

With $q = \tfrac12$ the output is equiprobable too, $H(Y) = 1$, and $I = 1 - H_b(0.1) = 1 - 0.469 = 0.531$ bits per channel use. Only about half a bit of each transmitted bit survives a $10\,\%$ error rate — not $0.9$ bits, as a naive count of "correct bits" would suggest, because the receiver does not know *which* bits are wrong. For $p = 0.5$ the output is independent of the input, $H_b(0.5) = 1$, and $I = 0$ for every $q$.
:::
:::

::: widget plot
f: -(x*(1 - p) + (1 - x)*p)*log2(x*(1 - p) + (1 - x)*p) - (1 - x*(1 - p) - (1 - x)*p)*log2(1 - x*(1 - p) - (1 - x)*p) + p*log2(p) + (1 - p)*log2(1 - p); -x*(1 - e)*log2(x*(1 - e)) - (1 - x*(1 - e))*log2(1 - x*(1 - e)) + x*(e*log2(e) + (1 - e)*log2(1 - e))
x: 0.0005, 0.9995
y: 0, 1
sliders: p=0.1:0.001:0.5:0.001; e=0.5:0.001:0.999:0.001
labels: \text{BSC}, I(X;Y); \text{Z-channel}, I(X;Y)
caption: Mutual information $I(X; Y)$ in bits against the input probability $q = P(X = 1)$ (horizontal axis) for a BSC with crossover $p$ (blue) and a Z-channel in which a $1$ becomes $0$ with probability $\varepsilon$ (orange). The BSC curve always peaks at $q = \tfrac12$, by symmetry. The Z-channel peak lies below $\tfrac12$ — it pays to send the unreliable symbol less often. Set $\varepsilon = 0.5$ and find the peak near $q = 0.4$, $I = 0.32$ bits ([[#ex-z-design]]). The height of each peak is the channel's capacity.
:::

### Choosing the input to maximise information

The mutual information depends on two things: the channel $p(y\mid x)$, which the engineer is usually given, and the input distribution $p(x)$, which the engineer chooses. The best choice gives the **capacity** $C = \max_{p(x)}I(X; Y)$, the subject of [[information-theory/channel-capacity]]. Here is a first instance.

::: example Designing the input of a Z-channel {#ex-z-design}
An optical link sends a $1$ as a light pulse and a $0$ as darkness. Darkness is never mistaken for a pulse, but because of fading a pulse is missed with probability $\varepsilon = 0.5$. Choose the probability $q$ of sending a pulse to maximise $I(X; Y)$, and find the maximum.
::: solution
The output is $1$ only if a pulse is sent and survives: $P(Y = 1) = q(1 - \varepsilon)$. Given $X = 0$ the output is certain ($H = 0$); given $X = 1$ it is a coin with bias $\varepsilon$ ($H = H_b(\varepsilon)$). So

$$
I(q) = H_b\big(q(1 - \varepsilon)\big) - qH_b(\varepsilon) .
$$

Using $H_b'(r) = \log_2\frac{1 - r}{r}$, the condition $\dd I/\dd q = 0$ is

$$
(1 - \varepsilon)\log_2\frac{1 - q(1 - \varepsilon)}{q(1 - \varepsilon)} = H_b(\varepsilon) .
$$

With $\varepsilon = 0.5$ and $H_b(0.5) = 1$: $\log_2\frac{1 - q/2}{q/2} = 2$, so $1 - q/2 = 2q$ and $q = 0.4$. Since $I$ is concave in $q$ (a concave function $H_b$ of a linear function, minus a linear term), this stationary point is the maximum:

$$
I_{\max} = H_b(0.2) - 0.4\times1 = 0.722 - 0.400 = 0.322\,\text{bits} = \log_2\tfrac54 .
$$

Equiprobable inputs would give $H_b(0.25) - 0.5 = 0.311$ bits, about $3.5\,\%$ less. The gain is modest here, but the principle — match the input statistics to the channel — is the same one that leads to water-filling over frequency in [[information-theory/channel-capacity]].
:::
:::

## Information can only be lost {#sec-processing}

A signal passes through a chain of processing stages — a channel, a quantiser, a decoder. Can any stage *add* information about the original message? Intuitively not, and the formal statement is one of the most useful tools of the subject.

::: definition Markov chain {#def-markov}
Random variables $X, Y, Z$ form a **Markov chain** $X \to Y \to Z$ if $Z$ depends on $X$ only through $Y$: $p(x, y, z) = p(x)\,p(y\mid x)\,p(z\mid y)$. Equivalently, $X$ and $Z$ are conditionally independent given $Y$, so $I(X; Z\mid Y) = 0$. Any $Z = g(Y)$ computed from $Y$ alone satisfies this.
:::

::: theorem Data-processing inequality {#thm-dpi}
If $X \to Y \to Z$, then $I(X; Z) \le I(X; Y)$.
:::

::: proof
Expand $I(X; Y, Z)$ by the chain rule ([[#thm-mutual-props]], part 4) in two orders:

$$
I(X; Y, Z) = I(X; Z) + I(X; Y\mid Z) = I(X; Y) + I(X; Z\mid Y) .
$$

The Markov property gives $I(X; Z\mid Y) = 0$, so $I(X; Y) = I(X; Z) + I(X; Y\mid Z) \ge I(X; Z)$, because conditional mutual information is non-negative (it is an average of mutual informations, each a relative entropy).
:::

No clever algorithm applied to a received signal can recover information that the channel destroyed. A hard-decision demodulator that turns a noisy voltage into a bit is such a processing step, and it loses information — this is why the soft-decision decoders of [[information-theory/convolutional-codes]] and [[information-theory/modern-codes]] work with voltages or likelihoods instead of bits. Equality holds when $Z$ is a **sufficient statistic** for $X$, as the matched-filter output is for the transmitted symbol in [[communication-systems/optimal-detection]].

::: example A cascade of channels {#ex-cascade}
A bit is sent over a BSC with crossover $0.1$ to a relay, which forwards whatever it receives over a second, independent BSC with crossover $0.1$. With equiprobable inputs, find $I(X; Y)$ at the relay and $I(X; Z)$ at the destination.
::: solution
At the relay, by [[#ex-bsc]], $I(X; Y) = 1 - H_b(0.1) = 0.531$ bits. The end-to-end channel is a BSC whose output is wrong if exactly one of the two links flips the bit: crossover $p' = 2\times0.1\times0.9 = 0.18$. Hence $I(X; Z) = 1 - H_b(0.18) = 1 - 0.680 = 0.320$ bits, smaller as [[#thm-dpi]] demands. A relay that only forwards bits loses $0.21$ bits per use; one that *decodes* an error-correcting code before forwarding (decode-and-forward) can avoid the cascade loss, which is why regenerative repeaters replaced analog amplifiers on long digital links.
:::
:::

### Fano's inequality

The data-processing inequality says information cannot grow; Fano's inequality says that if little information remains, errors are unavoidable. It is the key to every converse theorem in the course.

::: theorem Fano's inequality {#thm-fano}
Let $\hat X = g(Y)$ be any estimate of $X$ from $Y$, with error probability $P_e = P(\hat X \ne X)$. Then

$$
H(X\mid Y) \le H_b(P_e) + P_e\log_2\big(\lvert\mathcal X\rvert - 1\big) \le 1 + P_e\log_2\lvert\mathcal X\rvert .
$$ {#eq-fano}
:::

::: proof
Let $E$ be the error indicator, $E = 1$ if $\hat X \ne X$. Expand $H(E, X\mid Y)$ in two ways by the chain rule. First, $H(E, X\mid Y) = H(X\mid Y) + H(E\mid X, Y) = H(X\mid Y)$, since $E$ is a function of $X$ and $\hat X = g(Y)$. Second, $H(E, X\mid Y) = H(E\mid Y) + H(X\mid E, Y)$. Here $H(E\mid Y) \le H(E) = H_b(P_e)$ because conditioning reduces entropy. And $H(X\mid E, Y) = P(E = 0)H(X\mid E = 0, Y) + P(E = 1)H(X\mid E = 1, Y)$: when $E = 0$, $X = g(Y)$ is known, so the first term is zero; when $E = 1$, $X$ is one of the $\lvert\mathcal X\rvert - 1$ values other than $g(Y)$, so its conditional entropy is at most $\log_2(\lvert\mathcal X\rvert - 1)$. Combining gives [[#eq-fano]]; the weaker form uses $H_b \le 1$.
:::

Read backwards, Fano's inequality is a lower bound on the error probability: $P_e \ge (H(X\mid Y) - 1)/\log_2\lvert\mathcal X\rvert$. If a channel leaves a lot of uncertainty about a message chosen from many, no receiver can decode it reliably. [[information-theory/channel-capacity]] applies it to a message of $nR$ bits sent in $n$ channel uses to show that rates above capacity force errors.

## Continuous random variables {#sec-differential}

Noise voltages and analog samples are continuous. Replacing the sum in [[#eq-entropy]] by an integral gives a related but different quantity.

::: definition Differential entropy {#def-diff-entropy}
The **differential entropy** of a continuous random variable with density $f(x)$ is

$$
h(X) = -\int_{-\infty}^{\infty}f(x)\log_2 f(x)\,\dd x .
$$ {#eq-diff-entropy}
:::

For $X$ uniform on $[0, a]$, $h(X) = \log_2 a$, which is negative for $a < 1$: differential entropy is not an absolute amount of information. Quantising $X$ with step $\Delta$ gives a discrete variable of entropy approximately $h(X) - \log_2\Delta$, which grows without bound as $\Delta \to 0$ — describing a real number exactly takes infinitely many bits. Differences of differential entropies, however, are meaningful: the mutual information $I(X; Y) = h(Y) - h(Y\mid X)$ of continuous variables is the limit of that of their quantised versions and is non-negative and coordinate-free, just as in the discrete case. That is the quantity used for analog channels.

::: theorem The Gaussian maximises entropy for a given variance {#thm-gauss-maxent}
If $X \sim \mathcal N(\mu, \sigma^2)$, then

$$
h(X) = \tfrac12\log_2\big(2\pi e\sigma^2\big) .
$$ {#eq-gauss-entropy}

Every continuous random variable with variance $\sigma^2$ has $h(X) \le \tfrac12\log_2(2\pi e\sigma^2)$, with equality only for the Gaussian.
:::

::: proof
For the Gaussian density $\phi(x) = (2\pi\sigma^2)^{-1/2}e^{-(x - \mu)^2/2\sigma^2}$,

$$
-\log_2\phi(x) = \tfrac12\log_2(2\pi\sigma^2) + \frac{(x - \mu)^2}{2\sigma^2}\log_2e ,
$$

and averaging with $\E[(X - \mu)^2] = \sigma^2$ gives $\tfrac12\log_2(2\pi\sigma^2) + \tfrac12\log_2e$, which is [[#eq-gauss-entropy]]. Now let $f$ be any density with mean $\mu$ and variance $\sigma^2$. The continuous form of Gibbs' inequality (same proof, with integrals) gives

$$
0 \le D(f\Vert\phi) = \int f\log_2\frac f\phi = -h(f) - \int f\log_2\phi .
$$

Because $-\log_2\phi$ is a quadratic in $x$, $\int f(-\log_2\phi)$ depends only on the mean and variance of $f$, which equal those of $\phi$; so it equals $h(\phi)$. Hence $h(f) \le h(\phi)$, with equality only if $f = \phi$.
:::

This is why Gaussian noise is the worst noise of a given power for a communication link, and why Gaussian-distributed signals are the best ones to send through it: both statements follow from [[#thm-gauss-maxent]] in the derivation of the capacity $C = \tfrac12\log_2(1 + P/N)$ per sample in [[information-theory/channel-capacity]]. Thermal noise, the subject of [[random-signals/gaussian-noise]], is Gaussian — nature has chosen the hardest case.

::: example Information in a noisy measurement {#ex-gauss-info}
A sensor reports $Y = X + N$, where the quantity $X \sim \mathcal N(0, \sigma_X^2)$ and the noise $N \sim \mathcal N(0, \sigma_N^2)$ are independent. Find $I(X; Y)$ in bits for $\sigma_X = 4\,\mathrm{mV}$ and $\sigma_N = 1\,\mathrm{mV}$.
::: solution
$Y$ is Gaussian with variance $\sigma_X^2 + \sigma_N^2$. Given $X = x$, $Y$ is Gaussian with mean $x$ and variance $\sigma_N^2$, so $h(Y\mid X) = h(N)$. By [[#eq-gauss-entropy]],

$$
I(X; Y) = h(Y) - h(Y\mid X) = \tfrac12\log_2\big(2\pi e(\sigma_X^2 + \sigma_N^2)\big) - \tfrac12\log_2\big(2\pi e\sigma_N^2\big) = \tfrac12\log_2\left(1 + \frac{\sigma_X^2}{\sigma_N^2}\right) .
$$

The units cancel inside the ratio: $\sigma_X^2/\sigma_N^2 = 16$, and $I = \tfrac12\log_217 = 2.04$ bits per measurement. A signal-to-noise ratio of $12\,\mathrm{dB}$ is worth about two bits — roughly the rule that each factor of two in amplitude SNR (6 dB) buys one bit, familiar from quantisation in [[communication-systems/pulse-code-modulation]]. This formula, with $\sigma_X^2$ the signal power, is Shannon's capacity per sample.
:::
:::

::: quiz
$X \to Y \to Z$ is a Markov chain with $I(X; Y) = 0.8$ bits. Which of these is possible?
- [ ] $I(X; Z) = 0.9$ bits, if $Z$ is computed by a clever nonlinear function of $Y$
- [x] $I(X; Z) = 0.8$ bits
- [ ] $I(X; Z) = 0.9$ bits, if $Z$ is computed from $Y$ with extra independent random noise
- [ ] $I(X; Z) = -0.1$ bits
::: solution
By the data-processing inequality $0 \le I(X; Z) \le I(X; Y) = 0.8$ bits. Equality is possible: for example $Z = Y$, or $Z$ any invertible function of $Y$, or more generally any sufficient statistic. Neither clever functions nor added randomness can create information about $X$, and mutual information is never negative.
:::
:::

::: application Where entropy is measured in practice
Entropy estimates guide real designs. Image and audio compressors (PNG, FLAC, JPEG's final stage) are judged by how close their output rate comes to the entropy of the prediction residuals they code. Random-number generators for cryptography are rated by **min-entropy**, $-\log_2\max_xp(x)$, a conservative cousin of $H$; a hardware noise source whose bits are biased to $p = 0.6$ has $H_b(0.6) = 0.971$ bits of Shannon entropy per bit but only $-\log_20.6 = 0.737$ bits of min-entropy, and the post-processing "conditioner" compresses accordingly. In machine learning the **cross-entropy** loss $H(p) + D(p\Vert q)$ trains a classifier's predicted distribution $q$ towards the empirical one $p$, and mutual information is used to select informative features.
:::

## Where this leads {#sec-leads}

Entropy becomes an operational limit in [[information-theory/source-coding]], where the asymptotic equipartition property shows that a long sequence from a source is almost certainly one of about $2^{nH}$ "typical" sequences, so $H$ bits per symbol suffice and fewer do not. Mutual information becomes channel capacity in [[information-theory/channel-capacity]], where Fano's inequality proves the converse of the channel coding theorem and the Gaussian maximum-entropy theorem gives $C = B\log_2(1 + S/N)$, the bound quoted throughout [[communication-systems]]. The coding chapters — [[information-theory/linear-block-codes]] onwards — build the practical schemes that approach these limits, and the soft information passed between iterative decoders in [[information-theory/modern-codes]] is a log-likelihood ratio, a direct descendant of the self-information [[#eq-self-info]].

::: history
Harry Nyquist (1924) and Ralph Hartley (1928), both at Bell Labs and its predecessor, related telegraph speed to bandwidth and proposed the logarithm of the number of possible messages as a measure of information. Claude Shannon's "A Mathematical Theory of Communication", published in two parts in the *Bell System Technical Journal* in July and October 1948, defined entropy for sources with unequal probabilities, conditional entropy and the rate of transmission — the mutual information — and proved the coding theorems built on them; the same formula $-\sum p\log p$ had appeared in the statistical mechanics of Ludwig Boltzmann and J. Willard Gibbs. Solomon Kullback and Richard Leibler introduced the divergence that bears their names in 1951, in a paper on statistical sufficiency. Robert Fano taught his inequality in his MIT course in the early 1950s and published it in his 1961 book *Transmission of Information*. In 1951 Shannon estimated the entropy of printed English from experiments in which people guessed the next letter of a text.
:::

::: summary
- The self-information of an outcome is $-\log_2 p$ bits; additivity for independent events forces the logarithm.
- Entropy $H(X) = -\sum p\log_2 p$ is the average uncertainty, between $0$ (deterministic) and $\log_2\lvert\mathcal X\rvert$ (uniform); for a binary source it is $H_b(p)$.
- The chain rule $H(X, Y) = H(X) + H(Y\mid X)$ splits joint uncertainty; conditioning reduces entropy on average, though not for every observed value.
- Relative entropy $D(p\Vert q) \ge 0$ (Gibbs' inequality, from $\ln u \le u - 1$) is the cost of assuming $q$ when the truth is $p$; it is not symmetric.
- Mutual information $I(X; Y) = H(X) - H(X\mid Y) = D(p_{XY}\Vert p_Xp_Y)$ is symmetric and non-negative; for a BSC with equiprobable inputs it is $1 - H_b(p)$.
- Processing cannot create information ($X \to Y \to Z$ implies $I(X; Z) \le I(X; Y)$), and Fano's inequality bounds the error probability from below by the remaining uncertainty.
- Differential entropy $h(X)$ is relative to the unit of measurement, but mutual information of continuous variables is not; the Gaussian has the largest $h$ for a given variance, giving $I = \tfrac12\log_2(1 + \sigma_X^2/\sigma_N^2)$ for a Gaussian signal in Gaussian noise.
:::

## Exercises

::: exercise Entropy of a four-symbol source {level=1 check="-(0.4*log2(0.4)+0.3*log2(0.3)+0.2*log2(0.2)+0.1*log2(0.1))"}
A source emits four symbols with probabilities $0.4$, $0.3$, $0.2$ and $0.1$. Find its entropy in bits.
::: solution
$H = -(0.4\log_20.4 + 0.3\log_20.3 + 0.2\log_20.2 + 0.1\log_20.1) = 0.529 + 0.521 + 0.464 + 0.332 = 1.846$ bits, below the maximum $\log_24 = 2$ bits for four symbols.
:::
:::

::: exercise A biased bit {level=1 check="-(0.25*log2(0.25)+0.75*log2(0.75))"}
A sensor outputs $1$ with probability $0.25$. What is its entropy per output, in bits? How many such outputs can be stored, on average and in the limit of long sequences, in $1000$ bits?
::: solution
$H_b(0.25) = 0.25\times2 + 0.75\times0.415 = 0.811$ bits. A long sequence can be compressed to about $0.811$ bits per output, so roughly $1000/0.811 \approx 1230$ outputs fit in $1000$ bits.
:::
:::

::: exercise Parity of a die {level=1 check="1"}
$X$ is the score of a fair die and $Y = X \bmod 2$ its parity. Find $H(Y)$ in bits, and verify $H(Y) \le H(X)$. What is $H(X\mid Y)$?
::: solution
$Y$ is equiprobable, so $H(Y) = 1$ bit $\le H(X) = \log_26 = 2.585$ bits. Since $Y$ is a function of $X$, $H(X, Y) = H(X)$, and $H(X\mid Y) = H(X) - H(Y) = \log_26 - 1 = \log_23 = 1.585$ bits: given the parity, three equally likely scores remain.
:::
:::

::: exercise The binary erasure channel {level=2 check="0.8"}
In a **binary erasure channel** each input bit is received correctly with probability $1 - \alpha$ and replaced by an erasure symbol "?" with probability $\alpha$; it is never inverted. Show that with equiprobable inputs $I(X; Y) = 1 - \alpha$, and evaluate it for $\alpha = 0.2$ (in bits).
::: solution
Compute $H(X\mid Y)$. If $Y \in \{0, 1\}$ (probability $1 - \alpha$), $X = Y$ is known: entropy $0$. If $Y = {?}$ (probability $\alpha$), the erasure is independent of $X$, so $X$ is still equiprobable: entropy $1$. Hence $H(X\mid Y) = \alpha$ and $I(X; Y) = H(X) - H(X\mid Y) = 1 - \alpha = 0.8$ bits. Unlike the BSC, the erasure channel loses exactly the fraction of bits it erases, because the receiver knows which they are.
:::
:::

::: exercise Mutual information from a table {level=2 check="0.5*log2(0.5/(0.6*0.6))+0.1*log2(0.1/(0.6*0.4))*2+0.3*log2(0.3/(0.4*0.4))"}
$X$ and $Y$ are binary with $p(0, 0) = 0.5$, $p(0, 1) = p(1, 0) = 0.1$ and $p(1, 1) = 0.3$. Find $I(X; Y)$ in bits by two different formulas.
::: solution
The marginals are $P(X = 0) = P(Y = 0) = 0.6$. Directly from [[#eq-mutual]]:

$$
I = 0.5\log_2\frac{0.5}{0.36} + 2\times0.1\log_2\frac{0.1}{0.24} + 0.3\log_2\frac{0.3}{0.16} = 0.2370 - 0.2526 + 0.2721 = 0.256\,\text{bits}.
$$

Check: $H(X) = H(Y) = H_b(0.6) = 0.9710$ and $H(X, Y) = -(0.5\log_20.5 + 0.2\log_20.1 + 0.3\log_20.3) = 0.5 + 0.6644 + 0.5211 = 1.6855$, so $I = 2\times0.9710 - 1.6855 = 0.256$ bits.
:::
:::

::: exercise Differential entropy of thermal noise {level=2 check="0.5*log2(2*pi*e*4)"}
A noise voltage is Gaussian with standard deviation $2$ (in units of $\mu\mathrm V$). Find its differential entropy in bits. How does the answer change if the voltage is expressed in nanovolts, and why does this not affect the mutual information in [[#ex-gauss-info]]?
::: solution
$h = \tfrac12\log_2(2\pi e\cdot4) = \tfrac12\log_2(68.3) = 3.047$ bits. In nanovolts $\sigma = 2000$, so $h$ increases by $\log_21000 = 9.97$ bits: rescaling $X \to aX$ adds $\log_2\lvert a\rvert$ to $h$. Mutual information is a difference $h(Y) - h(Y\mid X)$ of two differential entropies of quantities in the same units, so the $\log_2\lvert a\rvert$ terms cancel.
:::
:::

::: exercise Entropy of independent symbols {level=2}
Show that $H(X_1, \dots, X_n) \le \sum_i H(X_i)$, with equality if and only if the $X_i$ are independent. A text file has $10^6$ characters, each of single-letter entropy $4.1$ bits; what does the inequality say about compressing it, and why do real compressors do better than $4.1\times10^6$ bits?
::: solution
By the chain rule, $H(X_1, \dots, X_n) = \sum_iH(X_i\mid X_1, \dots, X_{i-1})$, and each term is at most $H(X_i)$ because conditioning reduces entropy; equality in every term means each $X_i$ is independent of its predecessors, i.e. the variables are independent. For the file, $4.1\times10^6$ bits is the entropy only if the characters were independent; in English they are strongly dependent (Q is followed by U, words repeat), so the joint entropy is much smaller, and compressors that model context — such as the dictionary methods of [[information-theory/source-coding]] — reach $2$–$2.5$ bits per character or less.
:::
:::

::: exercise Capacity of the Z-channel {level=3 check="log2(1+0.9*0.1^(0.1/0.9))"}
::: hint
Follow [[#ex-z-design]] with general $\varepsilon$, writing $r = q(1 - \varepsilon)$ for the probability of output $1$ and solving the stationarity condition for $r$.
:::
Show that the maximum of $I(X; Y)$ over the input distribution for a Z-channel with miss probability $\varepsilon$ is $C = \log_2\big(1 + (1 - \varepsilon)\varepsilon^{\varepsilon/(1 - \varepsilon)}\big)$, and evaluate it for $\varepsilon = 0.1$ (in bits). What is the optimal $q$?
::: solution
With $r = q(1 - \varepsilon)$, $I = H_b(r) - \frac{r}{1 - \varepsilon}H_b(\varepsilon)$. Write $s = H_b(\varepsilon)/(1 - \varepsilon)$, so $I = H_b(r) - rs$. Setting $\dd I/\dd r = \log_2\frac{1 - r}{r} - s = 0$ gives $\frac{1 - r}{r} = 2^{s}$, so $r = 1/(1 + 2^s)$ and $\log_2(1 - r) = \log_2r + s$. Substituting into $I = -r\log_2r - (1 - r)\log_2(1 - r) - rs$ gives $I = -\log_2r - s(1 - r) - rs = -\log_2r - s = \log_2(1 + 2^s) - s = \log_2(1 + 2^{-s})$. Now $2^{-s} = 2^{-H_b(\varepsilon)/(1 - \varepsilon)} = \big(\varepsilon^\varepsilon(1 - \varepsilon)^{1 - \varepsilon}\big)^{1/(1 - \varepsilon)} = (1 - \varepsilon)\varepsilon^{\varepsilon/(1 - \varepsilon)}$, which proves the formula. For $\varepsilon = 0.1$: $s = 0.469/0.9 = 0.5211$, $2^{-s} = 0.6968$, $C = \log_2 1.6965 = 0.763$ bits, with $r = 1/(1 + 2^{s}) = 0.4107$ and $q = r/0.9 = 0.456$. For $\varepsilon = 0.5$ the formula gives $\log_2(1 + 0.5\times0.5) = \log_21.25$, as in [[#ex-z-design]].
:::
:::

::: exercise Deriving the grouping property {level=3}
::: hint
Let $Y$ indicate whether $X \in \{x_1, x_2\}$ and use the chain rule $H(X) = H(Y) + H(X\mid Y)$.
:::
Show that for a distribution $(p_1, p_2, \dots, p_m)$,

$$
H(p_1, p_2, p_3, \dots, p_m) = H(p_1 + p_2, p_3, \dots, p_m) + (p_1 + p_2)\,H_b\!\left(\frac{p_1}{p_1 + p_2}\right),
$$

and use it to recompute the entropy of [[#ex-questions]] as a sequence of binary questions.
::: solution
Let $Y = 1$ if $X \in \{x_1, x_2\}$ and $Y = X$ otherwise ($Y$ merges the first two outcomes). $Y$ is a function of $X$ and $X$ is determined by $Y$ except when $Y = 1$, so $H(X) = H(Y) + H(X\mid Y) = H(p_1 + p_2, p_3, \dots) + P(Y = 1)H(X\mid Y = 1)$. Given $Y = 1$, $X$ is $x_1$ or $x_2$ with probabilities $p_1/(p_1 + p_2)$ and $p_2/(p_1 + p_2)$, which gives the formula. For $(\tfrac12, \tfrac14, \tfrac18, \tfrac18)$: merge the last two, $H = H(\tfrac12, \tfrac14, \tfrac14) + \tfrac14H_b(\tfrac12) = H(\tfrac12, \tfrac14, \tfrac14) + \tfrac14$; merge again, $H(\tfrac12, \tfrac14, \tfrac14) = H_b(\tfrac12) + \tfrac12H_b(\tfrac12) = 1.5$; total $1.75$ bits — one bit for the first question, plus half a bit (the second question is asked half the time) plus a quarter bit (the third, asked a quarter of the time).
:::
:::

::: exercise Fano's bound for a decision {level=3}
A receiver must decide which of $4$ equally likely messages was sent. The channel output leaves $H(X\mid Y) = 1$ bit of uncertainty. Use the weak form of Fano's inequality to find a lower bound on the error probability, then use the strong form numerically to find a better one.
::: solution
The message has $H(X) = 2$ bits and $I(X; Y) = 1$ bit. Weak form: $1 \le 1 + P_e\log_24$, i.e. $P_e \ge 0$ — useless here. Strong form: $1 \le H_b(P_e) + P_e\log_23$. The right side is increasing in $P_e$ on $[0, \tfrac34]$; at $P_e = 0.1$ it is $0.469 + 0.158 = 0.627$, at $P_e = 0.2$ it is $0.722 + 0.317 = 1.039$, and solving numerically gives $P_e \ge 0.189$. No receiver can do better than about $19\,\%$ errors when half the information has been lost. The weak form is designed for large alphabets, where the $1$ is negligible compared with $P_e\log_2\lvert\mathcal X\rvert$.
:::
:::
