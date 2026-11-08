Before 1948, engineers took it for granted that noise forces a trade between speed and reliability: to make errors rarer you repeat each bit, or slow down, and to make them vanish you must slow down to zero. Shannon's channel coding theorem overturned that belief. Every noisy channel has a **capacity** $C$, a definite number of bits per use; at any rate below $C$ there are codes whose error probability is as small as you wish, and at any rate above $C$ there are none. A deep-space probe whose signal arrives far below the noise floor, a Wi-Fi link in a crowded flat and a 5G handset at the edge of a cell are all designed by asking how close their codes come to this limit.

This lesson defines capacity for **discrete memoryless channels**, computes it for the standard channels and by the Blahut–Arimoto algorithm, and proves the converse of the coding theorem with Fano's inequality; the achievability half is proved by Shannon's random-coding argument, which we follow in outline. We then derive the capacity of the **Gaussian channel**, $C = \tfrac12\log_2(1 + P/N)$ bits per sample, the band-limited formula $C = B\log_2(1 + S/N)$ quoted in [[communication-systems/signals-spectra-channels]], the Shannon limit $E_b/N_0 \ge -1.59\,\mathrm{dB}$, and the **water-filling** allocation of power across parallel channels used in every OFDM modem. We rely throughout on mutual information, the data-processing inequality, Fano's inequality and the maximum-entropy property of the Gaussian from [[information-theory/entropy-information]], and on typical sequences from [[information-theory/source-coding]].

## Discrete memoryless channels {#sec-dmc}

::: definition Discrete memoryless channel {#def-dmc}
A **discrete memoryless channel** (DMC) has a finite input alphabet $\mathcal X$, a finite output alphabet $\mathcal Y$ and transition probabilities $p(y\mid x)$, usually written as a matrix $W$ with rows indexed by inputs and columns by outputs (each row sums to $1$). Used $n$ times without feedback, it acts independently on each symbol:

$$
p(y_1, \dots, y_n\mid x_1, \dots, x_n) = \prod_{i=1}^n p(y_i\mid x_i) .
$$ {#eq-memoryless}

Its **information capacity** is

$$
C = \max_{p(x)}I(X; Y)\quad\text{bits per channel use} .
$$ {#eq-capacity}
:::

The maximum exists because $I(X; Y)$ is a continuous function of $p(x)$ on the compact simplex of probability vectors; it is moreover **concave** in $p(x)$ (exercise), so any local maximum is global. The four channels below recur throughout the course.

| channel | $W$ | capacity |
|---|---|---|
| binary symmetric (BSC), crossover $p$ | $\begin{pmatrix}1 - p & p\\ p & 1 - p\end{pmatrix}$ | $1 - H_b(p)$ |
| binary erasure (BEC), erasure $\alpha$ | $\begin{pmatrix}1 - \alpha & \alpha & 0\\ 0 & \alpha & 1 - \alpha\end{pmatrix}$ (outputs $0, {?}, 1$) | $1 - \alpha$ |
| Z-channel, miss probability $\varepsilon$ | $\begin{pmatrix}1 & 0\\ \varepsilon & 1 - \varepsilon\end{pmatrix}$ | $\log_2\big(1 + (1 - \varepsilon)\varepsilon^{\varepsilon/(1 - \varepsilon)}\big)$ |
| noisy typewriter, $26$ letters | each letter goes to itself or the next, probability $\tfrac12$ each | $\log_213$ |

The BSC models a hard-decision demodulator: the receiver decides each bit and is sometimes wrong. The BEC models a receiver that knows when it is unsure (or a packet network that drops packets whose checksum fails). The Z-channel was met in [[information-theory/entropy-information#ex-z-design]].

## Computing capacity {#sec-computing}

For channels with enough symmetry, the maximising input is obvious.

::: theorem Capacity of symmetric channels {#thm-symmetric}
Call a DMC **symmetric** if every row of $W$ is a permutation of every other row and every column is a permutation of every other column. Then

$$
C = \log_2\lvert\mathcal Y\rvert - H(\mathbf r),
$$ {#eq-symmetric}

where $H(\mathbf r)$ is the entropy of any row, and capacity is achieved by the uniform input distribution.
:::

::: proof
Because every row is a permutation of $\mathbf r$, $H(Y\mid X = x) = H(\mathbf r)$ for each $x$, so $H(Y\mid X) = H(\mathbf r)$ whatever $p(x)$. Hence $I(X; Y) = H(Y) - H(\mathbf r) \le \log_2\lvert\mathcal Y\rvert - H(\mathbf r)$, by the maximum-entropy bound [[information-theory/entropy-information#cor-max-entropy]]. With uniform input, $p(y) = \frac1{\lvert\mathcal X\rvert}\sum_xp(y\mid x)$ is the column sum divided by $\lvert\mathcal X\rvert$; all columns are permutations of one another and so have the same sum, so $Y$ is uniform and the bound is attained.
:::

For the BSC, $\lvert\mathcal Y\rvert = 2$ and $H(\mathbf r) = H_b(p)$, giving $C = 1 - H_b(p)$. The BEC is not symmetric in this strict sense (its middle column differs), but the direct calculation of [[information-theory/entropy-information]] gives $H(X\mid Y) = \alpha H(X)$, so $I = (1 - \alpha)H(X)$, maximised by a uniform input: $C = 1 - \alpha$.

::: widget plot
f: 1 + x*log2(x) + (1 - x)*log2(1 - x); 1 - x
x: 0.0005, 0.9995
y: 0, 1
labels: \text{BSC}, 1 - H_b(p); \text{BEC}, 1 - \alpha
tangent: 0.11
caption: Capacity of the binary symmetric channel against its crossover probability $p$ (blue) and of the binary erasure channel against its erasure probability $\alpha$ (orange), both in bits per use. A BSC with $p = 0.11$ has the same capacity, $0.5$, as a BEC that erases half its bits: an error you cannot locate costs much more than an erasure you can. Note that the BSC capacity rises again for $p > \tfrac12$ — a channel that is almost always wrong is as good as one that is almost always right, once you invert its output.
:::

::: example The noisy typewriter {#ex-typewriter}
A typewriter with $26$ keys is faulty: each key prints its own letter or the next one in the alphabet (Z wraps round to A), with probability $\tfrac12$ each. Find the capacity, and a code that achieves it with zero error.
::: solution
Every row has two entries $\tfrac12$ and the rest zero, and so does every column (letter $y$ is printed by $y$ and by the letter before it), so the channel is symmetric and [[#eq-symmetric]] gives

$$
C = \log_226 - H_b(\tfrac12) = \log_226 - 1 = \log_213 = 3.70\,\text{bits per keystroke}.
$$

To achieve it, use only the $13$ keys A, C, E, …, Y. Their possible outputs — $\{A, B\}$, $\{C, D\}$, …, $\{Y, Z\}$ — are disjoint, so the receiver always knows which key was pressed: $\log_213$ bits per use with no errors at all. In most channels the outputs of different inputs overlap, so no subset is perfectly distinguishable. Shannon's insight was that *long sequences* of inputs behave like the noisy typewriter's alternate keys: each produces outputs in a "noise ball" of about $2^{nH(Y\mid X)}$ typical sequences, and about $2^{nI(X;Y)}$ non-overlapping balls fit among the $2^{nH(Y)}$ typical outputs.
:::
:::

For a general channel, the optimal input satisfies a set of equations that can be checked, and solved iteratively.

::: theorem Conditions for the capacity-achieving input {#thm-kkt}
An input distribution $p^*(x)$ achieves capacity if and only if, with $p^*(y) = \sum_xp^*(x)p(y\mid x)$,

$$
D\big(p(\cdot\mid x)\,\Vert\,p^*(y)\big) = \sum_yp(y\mid x)\log_2\frac{p(y\mid x)}{p^*(y)}\ \begin{cases} = C & \text{if } p^*(x) > 0,\\ \le C & \text{if } p^*(x) = 0 .\end{cases}
$$ {#eq-kkt}
:::

::: proof
Note that $I(X; Y) = \sum_xp(x)D\big(p(\cdot\mid x)\Vert p(y)\big)$, an average of the divergences on the left. The function $I$ is concave on the simplex, so $p^*$ is a maximum if and only if no feasible direction increases it (the Karush–Kuhn–Tucker conditions). Differentiating $I = \sum_{x, y}p(x)p(y\mid x)\log_2\frac{p(y\mid x)}{\sum_{x'}p(x')p(y\mid x')}$ with respect to $p(x)$ gives $\partial I/\partial p(x) = D\big(p(\cdot\mid x)\Vert p(y)\big) - \log_2e$. The KKT conditions for maximising over $\sum_xp(x) = 1$, $p(x) \ge 0$ require all used inputs to have equal partial derivatives, at least as large as those of unused inputs, which is [[#eq-kkt]] up to the common constant; averaging the equalities with weights $p^*(x)$ shows that the constant is $C$.
:::

The theorem says that at capacity every input that is used "pays" the same information per use — otherwise shifting probability towards the better ones would raise $I$. It also yields an algorithm.

::: algorithm Blahut–Arimoto algorithm {#alg-blahut}
Start from any $p_0(x) > 0$ (uniform, say). For $k = 0, 1, 2, \dots$:
1. Compute the output distribution $p_k(y) = \sum_xp_k(x)p(y\mid x)$.
2. Compute $c_k(x) = 2^{D(p(\cdot\mid x)\Vert p_k(y))}$ for each input.
3. Update $p_{k+1}(x) = p_k(x)c_k(x)/\sum_{x'}p_k(x')c_k(x')$.

The bounds $\log_2\sum_xp_k(x)c_k(x) \le C \le \log_2\max_xc_k(x)$ hold at every step and converge to $C$; stop when they agree to the required accuracy.
:::

::: example A binary asymmetric channel {#ex-asymmetric}
An optical receiver mistakes a $0$ for a $1$ with probability $0.1$ and a $1$ for a $0$ with probability $0.3$. Find the capacity and the optimal input distribution, and compare with equiprobable inputs.
::: solution
$W = \begin{pmatrix}0.9 & 0.1\\ 0.3 & 0.7\end{pmatrix}$. Start with $p_0 = (0.5, 0.5)$: $p_0(y) = (0.6, 0.4)$, and

$$
D_0 = 0.9\log_2\tfrac{0.9}{0.6} + 0.1\log_2\tfrac{0.1}{0.4} = 0.326,\qquad D_1 = 0.3\log_2\tfrac{0.3}{0.6} + 0.7\log_2\tfrac{0.7}{0.4} = 0.265 .
$$

Input $0$ is the better one, so the update raises its probability: $p_1(0) = 2^{0.326}/(2^{0.326} + 2^{0.265}) = 0.511$. Iterating converges to $p^* = (0.528, 0.472)$, with output distribution $(0.617, 0.383)$ and both divergences equal to $0.2967$ bits, as [[#thm-kkt]] requires. So $C = 0.297$ bits per use. Equiprobable inputs give $I = \tfrac12(0.326 + 0.265) = 0.296$ bits — only $0.3\,\%$ less. For most binary channels the uniform input is very nearly optimal, which is why practical codes use equiprobable bits; the Z-channel, with its very unequal reliability, is the extreme case.
:::
:::

## The channel coding theorem {#sec-coding-theorem}

The information capacity is defined by a maximisation. Its operational meaning is the subject of Shannon's theorem.

::: definition Codes and achievable rates {#def-code}
An $(M, n)$ **code** for a channel consists of a message set $\{1, \dots, M\}$, an **encoder** that maps each message $w$ to a codeword $x^n(w)$ of $n$ channel inputs, and a **decoder** $g$ that maps each received sequence $y^n$ to a message estimate $\hat w$. Its **rate** is $R = \frac{\log_2M}n$ bits per channel use and its maximal error probability is $P_e^{(n)} = \max_wP\big(g(Y^n) \ne w\mid w\text{ sent}\big)$. A rate $R$ is **achievable** if there is a sequence of $(\lceil2^{nR}\rceil, n)$ codes with $P_e^{(n)} \to 0$ as $n \to \infty$.
:::

::: theorem Channel coding theorem {#thm-coding}
For a discrete memoryless channel with capacity $C$ given by [[#eq-capacity]]:
1. (Achievability.) Every rate $R < C$ is achievable.
2. (Converse.) Any sequence of $(2^{nR}, n)$ codes with $P_e^{(n)} \to 0$ has $R \le C$. More precisely, the average error probability of any such code satisfies

$$
P_e^{(n)} \ge 1 - \frac CR - \frac1{nR} .
$$ {#eq-converse}
:::

::: proof
**Converse.** Let the message $W$ be uniform on $2^{nR}$ values, so $H(W) = nR$. It passes through the chain $W \to X^n \to Y^n \to \hat W$. Then

$$
nR = H(W) = H(W\mid Y^n) + I(W; Y^n) \le \big(1 + P_e^{(n)}nR\big) + I(X^n; Y^n),
$$

using Fano's inequality [[information-theory/entropy-information#thm-fano]] (weak form, with $\log_2\lvert\mathcal W\rvert = nR$) for the first term and the data-processing inequality [[information-theory/entropy-information#thm-dpi]] for the second. For a memoryless channel without feedback,

$$
I(X^n; Y^n) = H(Y^n) - \sum_{i=1}^nH(Y_i\mid X_i) \le \sum_{i=1}^n\big[H(Y_i) - H(Y_i\mid X_i)\big] = \sum_{i=1}^nI(X_i; Y_i) \le nC,
$$

because $H(Y^n\mid X^n) = \sum_iH(Y_i\mid X_i)$ by [[#eq-memoryless]] and $H(Y^n) \le \sum_iH(Y_i)$. Combining, $nR \le 1 + P_e^{(n)}nR + nC$; dividing by $nR$ gives [[#eq-converse]]. If $R > C$, the error probability is bounded away from zero for all large $n$.

**Achievability (outline).** Fix the input distribution $p(x)$ that achieves $C$, and $\epsilon > 0$.
- *Random codebook.* Draw each of the $2^{nR}$ codewords, independently, as $n$ i.i.d. symbols from $p(x)$. Reveal the codebook to the encoder and decoder.
- *Joint typicality decoding.* The decoder declares $\hat w$ if $x^n(\hat w)$ is the only codeword **jointly typical** with $y^n$ — that is, $-\frac1n\log_2$ of $p(x^n)$, $p(y^n)$ and $p(x^n, y^n)$ are within $\epsilon$ of $H(X)$, $H(Y)$ and $H(X, Y)$ respectively.
- *Error events.* By the AEP [[information-theory/source-coding#thm-aep]], applied to the pairs $(X_i, Y_i)$, the transmitted codeword and the output are jointly typical with probability approaching $1$. Any other codeword $X^n(w')$ is independent of $Y^n$. The probability that an independent pair is jointly typical is the number of jointly typical pairs, at most $2^{n(H(X, Y) + \epsilon)}$, times the probability of each under the product distribution, at most $2^{-n(H(X) - \epsilon)}2^{-n(H(Y) - \epsilon)}$: in all at most $2^{-n(I(X;Y) - 3\epsilon)}$. By the union bound over the $2^{nR} - 1$ wrong codewords, the probability that some wrong codeword is jointly typical is at most $2^{-n(C - R - 3\epsilon)}$, which tends to $0$ when $R < C - 3\epsilon$.
- *From average to a good code.* The error probability averaged over messages and random codebooks tends to zero, so at least one codebook has a small average error; discarding its worse half of codewords (which costs $1/n$ in rate) makes the *maximal* error small too.

The full proof, with the joint AEP stated precisely, is in Cover and Thomas, chapter 7.
:::

The proof is non-constructive: it shows that most long random codes are good but gives no practical way to decode them — joint typicality decoding of a random code means comparing the received sequence with $2^{nR}$ codewords. The rest of this course is the sixty-year search for codes with enough structure to be decoded efficiently and enough randomness to approach capacity: algebraic block codes ([[information-theory/linear-block-codes]], [[information-theory/cyclic-codes]]), convolutional codes ([[information-theory/convolutional-codes]]), and finally turbo, LDPC and polar codes ([[information-theory/modern-codes]]), which come within a fraction of a decibel.

::: warning What the theorem does and does not promise
The theorem promises small error probability for rates below capacity *as the block length grows*; at a fixed short length a gap to capacity is unavoidable (the penalty shrinks roughly like $1/\sqrt n$). It does not promise *zero* error — that is a different, much harder quantity, the zero-error capacity, which is zero for the BSC. And capacity is a rate in **bits per channel use**: to get bits per second, multiply by the number of uses per second. Do not compare a BSC's "$0.5$" with an AWGN channel's "$0.5$" without checking the units.
:::

### Repetition is not the answer

The obvious way to fight errors is to repeat. Sending each bit $n$ times (with $n$ odd) over a BSC and decoding by majority vote fails only if more than half of the copies are flipped:

$$
P_e = \sum_{k=(n+1)/2}^n\binom nkp^k(1 - p)^{n-k} .
$$ {#eq-repetition}

For $p = 0.1$ this is $0.028$ for $n = 3$, $0.0086$ for $n = 5$ and $0.0003$ for $n = 11$: the error probability falls exponentially — but so does the rate, $1/n$. To make $P_e \to 0$, repetition drives the rate to zero. Shannon's theorem says that for $p = 0.1$ we can have $P_e \to 0$ at any rate up to $0.531$.

::: widget plot
f: sum(binom(2*m + 1, k)*x^k*(1 - x)^(2*m + 1 - k), k, m + 1, 2*m + 1); x
x: 0, 0.5
y: 0, 0.5
sliders: m=1:1:15:1
labels: P_e\ \text{(repetition)}; P_e\ \text{(uncoded)}
caption: Bit error probability after majority decoding of a repetition code of length $n = 2m + 1$ over a BSC with crossover $p$ (horizontal axis), compared with sending each bit once. Increase $m$: for every $p < \tfrac12$ the coded error rate drops towards zero, but the rate $1/(2m + 1)$ drops with it. At $p = 0.1$, a rate-$\tfrac1{11}$ code ($m = 5$) reaches $P_e = 3\times10^{-4}$, while the coding theorem promises error rates as small as desired at rate $0.53$.
:::

::: quiz
A BSC has crossover probability $0.11$. Which statement is true?
- [ ] A code of rate $0.6$ can achieve $P_e = 10^{-6}$ if the block length is large enough
- [x] Codes of rate $0.45$ with $P_e \to 0$ exist, but there is no code of rate $0.55$ with $P_e < 0.05$ for large block lengths
- [ ] Every code of rate $0.45$ has $P_e \to 0$ as $n \to \infty$
- [ ] The capacity is $0.89$ bits per use, the probability of correct reception
::: solution
$C = 1 - H_b(0.11) = 0.500$. Rate $0.45 < C$ is achievable, but only by good codes — a bad code (for example, repetition of a rate-$0.45$ code's bits) need not work. For $R = 0.55$, [[#eq-converse]] gives $P_e \ge 1 - 0.5/0.55 - 1/(0.55n) \to 0.091$: the error probability cannot fall below about $9\,\%$. In fact the "strong converse" shows it tends to $1$.
:::
:::

### Source–channel separation

Shannon's two theorems fit together. A source of entropy rate $H$ symbols-worth of bits per channel use can be compressed to about $H$ bits ([[information-theory/source-coding]]), and these bits can be sent reliably if $H < C$. Conversely, if $H > C$, no scheme — however cleverly it combines compression and protection — can deliver the source with vanishing error probability, by a converse argument like the one above. This **source–channel separation theorem** justifies the layered design of digital systems: the compressor need not know the channel and the channel code need not know the source. (Separation can fail at short block lengths, for some multi-user networks and when delay is tightly constrained, which keeps joint source–channel coding an active research topic.)

## The Gaussian channel {#sec-gaussian}

Most physical channels carry voltages, not symbols. The basic model is the discrete-time **additive white Gaussian noise** channel, obtained from a band-limited continuous channel by sampling, as in [[communication-systems/optimal-detection]].

::: definition Discrete-time Gaussian channel {#def-gaussian}
The output of the **Gaussian channel** at time $i$ is $Y_i = X_i + Z_i$, where the noise samples $Z_i \sim \mathcal N(0, N)$ are i.i.d. and independent of the input, and the input satisfies the **power constraint**

$$
\frac1n\sum_{i=1}^nx_i^2(w) \le P \quad\text{for every codeword } w .
$$ {#eq-power}
:::

Without the power constraint the capacity would be infinite: codewords could be spread arbitrarily far apart. With it, the information capacity is $C = \max I(X; Y)$ over input densities with $\E[X^2] \le P$.

::: theorem Capacity of the Gaussian channel {#thm-awgn}
$$
C = \tfrac12\log_2\left(1 + \frac PN\right)\quad\text{bits per channel use},
$$ {#eq-awgn-capacity}

achieved by a Gaussian input $X \sim \mathcal N(0, P)$. The coding theorem and its converse hold with this $C$.
:::

::: proof
$I(X; Y) = h(Y) - h(Y\mid X) = h(Y) - h(X + Z\mid X) = h(Y) - h(Z)$, since given $X$ the only uncertainty in $Y$ is the noise, which is independent of $X$. The noise entropy is $h(Z) = \tfrac12\log_2(2\pi eN)$ by [[information-theory/entropy-information#thm-gauss-maxent]]. The output has variance $\E[Y^2] = \E[X^2] + N \le P + N$ (the cross term vanishes by independence), so by the same theorem $h(Y) \le \tfrac12\log_2\big(2\pi e(P + N)\big)$. Hence

$$
I(X; Y) \le \tfrac12\log_2\big(2\pi e(P + N)\big) - \tfrac12\log_2(2\pi eN) = \tfrac12\log_2\left(1 + \frac PN\right),
$$

with equality when $Y$ is Gaussian, which happens when $X \sim \mathcal N(0, P)$ (a sum of independent Gaussians is Gaussian). The coding theorem follows by the same random-coding argument with Gaussian codewords, and the converse as before, using $\sum_iI(X_i; Y_i) \le \sum_i\tfrac12\log_2(1 + P_i/N) \le \tfrac n2\log_2(1 + P/N)$ by concavity of the logarithm.
:::

The geometric picture is **sphere packing**. A received sequence $y^n$ lies, with high probability, near the surface of a sphere of radius $\sqrt{n(P + N)}$; the noise moves each codeword to a point near the surface of a small sphere of radius $\sqrt{nN}$ around it. At most

$$
\frac{\big(n(P + N)\big)^{n/2}}{(nN)^{n/2}} = \left(1 + \frac PN\right)^{n/2}
$$

non-overlapping noise spheres fit into the large one, so at most $\tfrac n2\log_2(1 + P/N)$ bits can be sent in $n$ uses; random coding shows that this many can be.

### The band-limited channel

A continuous-time channel of bandwidth $B$ hertz with white Gaussian noise of two-sided density $N_0/2$ is described, by the sampling theorem, by $2B$ independent real samples per second. With received signal power $S$ watts, each sample has signal energy-per-sample ratio $S/(2B)$ against noise $N_0/2$, so the signal-to-noise ratio per sample is $S/(N_0B)$ — the ratio of signal power to the noise power in the band. Multiplying [[#eq-awgn-capacity]] by $2B$ samples per second gives the **Shannon–Hartley** formula.

::: theorem Capacity of the band-limited AWGN channel {#thm-shannon-hartley}
$$
C = B\log_2\left(1 + \frac{S}{N_0B}\right)\quad\mathrm{bit/s} .
$$ {#eq-shannon-hartley}

With **spectral efficiency** $\eta = R/B$ (bit/s/Hz) and energy per bit $E_b = S/R$, reliable transmission at rate $R \le C$ requires

$$
\frac{E_b}{N_0} \ge \frac{2^\eta - 1}{\eta}, \qquad\text{and in the wideband limit } \eta \to 0,\quad \frac{E_b}{N_0} \ge \ln2 = 0.693 = -1.59\,\mathrm{dB} .
$$ {#eq-shannon-limit}
:::

::: proof
[[#eq-shannon-hartley]] was derived above. Put $R = \eta B$ and $S = E_bR = E_b\eta B$ into $R \le C$: $\eta \le \log_2(1 + \eta E_b/N_0)$, i.e. $E_b/N_0 \ge (2^\eta - 1)/\eta$. The right-hand side increases with $\eta$, and as $\eta \to 0$, $2^\eta - 1 = e^{\eta\ln2} - 1 \approx \eta\ln2$, so the bound tends to $\ln2$.
:::

Two regimes emerge. In the **bandwidth-limited** regime ($S/N_0B \gg 1$), $C \approx B\log_2(S/N_0B)$: doubling the power adds only $B$ bit/s, and each extra bit per second per hertz costs $3\,\mathrm{dB}$ more SNR. In the **power-limited** regime ($S/N_0B \ll 1$), $C \approx \frac{S}{N_0}\log_2e$: capacity is proportional to power and almost independent of bandwidth, approaching $C_\infty = S/(N_0\ln2)$ as $B \to \infty$. Deep-space links live in the second regime, cable modems and Wi-Fi near the access point in the first.

::: widget plot
f: 10*log10((2^x - 1)/x); 10*log10(log(2))
x: 0.05, 8
y: -3, 20
points: 1,9.6; 2,9.6; 4,13.4; 6,17.8
labels: \text{Shannon bound}; -1.59\ \text{dB}
caption: The minimum $E_b/N_0$ in dB (vertical) for reliable transmission at spectral efficiency $\eta$ bit/s/Hz (horizontal), from [[#eq-shannon-limit]]; no system can operate below the blue curve. The dots are uncoded BPSK, QPSK, 16-QAM and 64-QAM at a bit error rate of $10^{-5}$ (with ideal Nyquist pulses), from [[communication-systems/optimal-detection]]. The horizontal gap from each dot to the curve — about $8\,\mathrm{dB}$ for QPSK — is what error-correcting codes can win back. Hover over the curve near $\eta \to 0$: it flattens at $-1.59\,\mathrm{dB}$.
:::

::: example How far is uncoded QPSK from capacity? {#ex-qpsk-gap}
Uncoded QPSK reaches a bit error rate of $10^{-5}$ at $E_b/N_0 = 9.6\,\mathrm{dB}$ and, with ideal Nyquist pulses, carries $\eta = 2\,\mathrm{bit/s/Hz}$. What is the least $E_b/N_0$ at which $2\,\mathrm{bit/s/Hz}$ could be sent reliably? If instead a rate-$\tfrac12$ code is used with QPSK ($\eta = 1$), what is the limit?
::: solution
By [[#eq-shannon-limit]], at $\eta = 2$: $E_b/N_0 \ge (2^2 - 1)/2 = 1.5 = 1.76\,\mathrm{dB}$. Uncoded QPSK is $9.6 - 1.8 = 7.8\,\mathrm{dB}$ from the limit — it uses six times more energy per bit than necessary. With a rate-$\tfrac12$ code the spectral efficiency is $1\,\mathrm{bit/s/Hz}$ and the limit is $(2 - 1)/1 = 1 = 0\,\mathrm{dB}$. (Restricting the input to the two levels $\pm A$ per dimension, as BPSK and QPSK do, raises the rate-$\tfrac12$ limit slightly, to $0.19\,\mathrm{dB}$, because Gaussian inputs are no longer allowed.) The best LDPC and turbo codes of rate $\tfrac12$ reach $10^{-5}$ within a few tenths of a decibel of this, winning back about $9\,\mathrm{dB}$ — a factor of eight in transmitter power or almost three in range.
:::
:::

::: example Sizing a link {#ex-link-design}
A point-to-point microwave link must carry $10\,\mathrm{Mbit/s}$ in a $2\,\mathrm{MHz}$ channel. (a) What is the minimum signal-to-noise ratio? (b) The receiver's noise density is $N_0 = 4\times10^{-21}\,\mathrm{W/Hz}$ (a noise temperature of about $290\,\mathrm K$). What received power is needed, and how much margin does an implementation that operates $3\,\mathrm{dB}$ from capacity need on top?
::: solution
(a) $\eta = 10/2 = 5\,\mathrm{bit/s/Hz}$, so $\log_2(1 + \mathrm{SNR}) \ge 5$ and $\mathrm{SNR} \ge 2^5 - 1 = 31$, i.e. $14.9\,\mathrm{dB}$.

(b) The noise power in the band is $N_0B = 4\times10^{-21}\times2\times10^6 = 8\times10^{-15}\,\mathrm W$ ($-111\,\mathrm{dBm}$). The minimum received power is $31\times8\times10^{-15} = 2.5\times10^{-13}\,\mathrm W$, or $-96\,\mathrm{dBm}$. A real modem $3\,\mathrm{dB}$ from capacity needs $-93\,\mathrm{dBm}$, and a typical design adds fade margin (say $20\,\mathrm{dB}$ on a microwave hop) for a target of about $-73\,\mathrm{dBm}$. In $E_b/N_0$ terms: $E_b/N_0 = \mathrm{SNR}/\eta = 31/5 = 6.2 = 7.9\,\mathrm{dB}$, matching [[#eq-shannon-limit]] at $\eta = 5$.
:::
:::

## Parallel channels and water-filling {#sec-waterfill}

An OFDM modem divides a frequency-selective channel into hundreds of narrow subchannels, each a Gaussian channel with its own noise level (after scaling by the channel gain). A DSL line has strong attenuation at high frequencies; a radio channel has fades at some frequencies and not others. With a fixed total power, how should it be shared?

::: theorem Water-filling {#thm-waterfill}
For $K$ independent Gaussian channels $Y_k = X_k + Z_k$, $Z_k \sim \mathcal N(0, N_k)$, with total power constraint $\sum_kP_k \le P$, the capacity is

$$
C = \sum_{k=1}^K\tfrac12\log_2\left(1 + \frac{P_k}{N_k}\right), \qquad P_k = (\nu - N_k)^+ ,
$$ {#eq-waterfill}

where $(u)^+ = \max(u, 0)$ and the **water level** $\nu$ is chosen so that $\sum_k(\nu - N_k)^+ = P$.
:::

::: proof
With independent inputs, $I(X_1, \dots, X_K; Y_1, \dots, Y_K) \le \sum_kI(X_k; Y_k) \le \sum_k\tfrac12\log_2(1 + P_k/N_k)$, by [[#thm-awgn]] for each channel, with equality for independent Gaussian inputs of powers $P_k$. It remains to maximise the concave function $\sum_k\tfrac12\log_2(1 + P_k/N_k)$ subject to $\sum_kP_k = P$, $P_k \ge 0$. The Lagrangian condition is

$$
\frac{\partial}{\partial P_k}\left[\sum_j\tfrac12\ln(N_j + P_j) - \lambda\sum_jP_j\right] = \frac1{2(N_k + P_k)} - \lambda \le 0,
$$

with equality where $P_k > 0$. So for every used channel $N_k + P_k = 1/(2\lambda) = \nu$, the same constant, and a channel is unused when $N_k \ge \nu$. Since the objective is concave, these conditions characterise the maximum.
:::

Picture the noise levels $N_k$ as the uneven floor of a vessel and pour in a volume $P$ of water: the water surface is flat at height $\nu$, the depth over channel $k$ is its power, and channels whose floor sticks out above the surface get nothing. Good channels get more power — the opposite of an equaliser, which would boost the weak channels.

::: example Allocating power to three subcarriers {#ex-waterfill}
Three subchannels have noise variances $N = 1, 2, 4$ (in units of $\mathrm{mW}$ after normalising for channel gain), and the total power is $P = 5\,\mathrm{mW}$. Find the water-filling allocation and the capacity, and compare with equal power.
::: solution
Try all three in use: $3\nu - (1 + 2 + 4) = 5$ gives $\nu = 4$, which would make $P_3 = 4 - 4 = 0$. So channel $3$ is (just) off. With channels $1$ and $2$: $2\nu - 3 = 5$, $\nu = 4$; $P_1 = 3\,\mathrm{mW}$, $P_2 = 2\,\mathrm{mW}$, $P_3 = 0$. The capacity is

$$
C = \tfrac12\log_2\tfrac41 + \tfrac12\log_2\tfrac42 = 1 + 0.5 = 1.50\,\text{bits per use of the three channels}.
$$

With equal power $\tfrac53\,\mathrm{mW}$ each: $\tfrac12\big[\log_2(1 + 1.667) + \log_2(1 + 0.833) + \log_2(1 + 0.417)\big] = 0.708 + 0.437 + 0.251 = 1.40$ bits. Water-filling gains $7\,\%$ here; the gain is large when the SNR is low and the noise levels very different, and small at high SNR, where equal power is nearly optimal. Practical OFDM systems approximate water-filling by **bit loading**: each subcarrier gets the largest QAM constellation its SNR supports.
:::
:::

::: application Capacity in real systems
Voyager 2's downlink from beyond Neptune is power-limited: about twenty watts transmitted from billions of kilometres away arrive far below the noise power of any practical receiver bandwidth, and the rate is set by $S/N_0$, not by bandwidth — exactly the regime where coding gains are most valuable, which is why deep-space missions pioneered concatenated Reed–Solomon and convolutional codes and later turbo and LDPC codes. DSL modems measure the SNR of each of thousands of tones during training and bit-load them, a discrete form of water-filling. Wi-Fi and LTE choose a modulation and code rate from a table according to the measured SNR (**adaptive modulation and coding**), so that the throughput follows a staircase a few decibels below the Shannon curve. Multiple-antenna (MIMO) links decompose the channel matrix by its singular values into parallel Gaussian channels and water-fill across them.
:::

## Where this leads {#sec-leads}

Capacity is a promise; codes deliver it. [[information-theory/linear-block-codes]] introduces the algebraic structure — codes as subspaces, decoded by syndromes — that makes encoding and decoding tractable, and measures codes by their minimum distance rather than by mutual information. [[information-theory/cyclic-codes]] adds polynomial structure (CRC, BCH, Reed–Solomon), [[information-theory/convolutional-codes]] introduces trellis codes decoded by the Viterbi algorithm, and [[information-theory/modern-codes]] shows how turbo, LDPC and polar codes close the gap shown in the Shannon-bound figure. The detection theory behind the error-rate dots in that figure is in [[communication-systems/optimal-detection]], and fading channels, where capacity itself becomes random, are treated in [[communication-systems/wireless-communication]].

::: history
Harry Nyquist showed in 1924 and 1928 that a channel of bandwidth $B$ supports $2B$ independent pulses per second, and Ralph Hartley in 1928 measured information by the logarithm of the number of distinguishable levels. In 1948 Claude Shannon defined capacity as maximised mutual information, proved the channel coding theorem by the random-coding argument, and derived $C = W\log_2(1 + P/N)$ for the band-limited Gaussian channel; his 1949 paper "Communication in the Presence of Noise" gave the geometric sphere-packing proof. The strong converse for discrete memoryless channels was proved by Jacob Wolfowitz in 1957. Richard Blahut and Suguru Arimoto independently published their algorithm for computing capacity in 1972. The water-filling solution appeared in Shannon's 1949 paper for coloured noise and was developed for parallel channels in the decades that followed; it became a design tool with multicarrier modems in the 1990s.
:::

::: summary
- A discrete memoryless channel is a transition matrix $p(y\mid x)$; its capacity is $C = \max_{p(x)}I(X; Y)$ bits per use. BSC: $1 - H_b(p)$; BEC: $1 - \alpha$; symmetric channels: $\log_2\lvert\mathcal Y\rvert - H(\text{row})$ with uniform input.
- At capacity every used input has the same divergence $D(p(\cdot\mid x)\Vert p^*(y)) = C$; the Blahut–Arimoto algorithm finds the optimum numerically.
- Channel coding theorem: every rate $R < C$ is achievable with error probability tending to zero (random coding with joint-typicality decoding); for $R > C$ the error probability is at least $1 - C/R - 1/(nR)$ (Fano).
- Repetition codes reduce errors only by driving the rate to zero; good codes keep the rate fixed and let the block length grow.
- Gaussian channel: $C = \tfrac12\log_2(1 + P/N)$ per sample, achieved by Gaussian inputs; band-limited: $C = B\log_2(1 + S/(N_0B))$.
- The Shannon limit is $E_b/N_0 \ge (2^\eta - 1)/\eta$, tending to $-1.59\,\mathrm{dB}$ as $\eta \to 0$; uncoded QPSK is about $8\,\mathrm{dB}$ from it at $10^{-5}$.
- Parallel Gaussian channels are filled to a common water level, $P_k = (\nu - N_k)^+$: the basis of bit loading in OFDM and DSL.
:::

## Exercises

::: exercise Capacity of a BSC {level=1 check="1+0.05*log2(0.05)+0.95*log2(0.95)"}
Find the capacity in bits per use of a BSC with crossover probability $0.05$.
::: solution
$C = 1 - H_b(0.05) = 1 - (0.216 + 0.070) = 0.714$ bits per use.
:::
:::

::: exercise Capacity of a telephone-line channel {level=1 check="3000*log2(1+1000)"}
A voice-band channel has bandwidth $3\,\mathrm{kHz}$ and signal-to-noise ratio $30\,\mathrm{dB}$. Find its Shannon capacity in bit/s.
::: solution
$\mathrm{SNR} = 10^3$, so $C = 3000\log_2(1001) = 3000\times9.97 = 29.9\,\mathrm{kbit/s}$. The V.34 modems of the 1990s reached $28.8$–$33.6\,\mathrm{kbit/s}$ on such lines, close to this limit (they used a slightly wider band than $3\,\mathrm{kHz}$).
:::
:::

::: exercise Required SNR {level=1 check="2^5-1"}
What signal-to-noise ratio (as a power ratio, not in dB) is needed to send $10\,\mathrm{Mbit/s}$ through a $2\,\mathrm{MHz}$ AWGN channel? What is it in dB?
::: solution
$2\times10^6\log_2(1 + \mathrm{SNR}) \ge 10^7$ gives $\mathrm{SNR} \ge 2^5 - 1 = 31$, or $14.9\,\mathrm{dB}$, as in [[#ex-link-design]].
:::
:::

::: exercise Equal capacities {level=2 check="-(0.1*log2(0.1)+0.9*log2(0.9))"}
What erasure probability $\alpha$ gives a binary erasure channel the same capacity as a BSC with crossover $0.1$? Explain why the erasure channel can tolerate so many more "bad" symbols.
::: solution
$1 - \alpha = 1 - H_b(0.1)$, so $\alpha = H_b(0.1) = 0.469$. The BEC can lose almost $47\,\%$ of its bits and still carry as much as a BSC that corrupts $10\,\%$: on the BEC the receiver knows where the losses are, and on the BSC it must also spend redundancy finding the errors. This is why soft-decision receivers, which mark unreliable symbols, outperform hard-decision ones.
:::
:::

::: exercise Infinite bandwidth {level=2 check="1e6/log(2)"}
A link has received power to noise density ratio $S/N_0 = 10^6\,\mathrm{Hz}$ ($60\,\mathrm{dB\,Hz}$). Find the capacity, in bit/s, as $B \to \infty$. What is the capacity with $B = 1\,\mathrm{MHz}$?
::: solution
$C_\infty = \frac{S}{N_0}\log_2e = 10^6/\ln2 = 1.443\,\mathrm{Mbit/s}$. With $B = 1\,\mathrm{MHz}$, $S/(N_0B) = 1$ and $C = 10^6\log_22 = 1.0\,\mathrm{Mbit/s}$: $69\,\%$ of the wideband limit already, since in the power-limited regime more bandwidth helps only slowly.
:::
:::

::: exercise Repetition code {level=2 check="10*0.1^3*0.9^2+5*0.1^4*0.9+0.1^5"}
Each bit is sent five times over a BSC with $p = 0.1$ and decoded by majority. Find the decoded bit error probability and the rate. Compare the rate with the capacity.
::: solution
An error needs at least three flips: $P_e = \binom53p^3(1 - p)^2 + \binom54p^4(1 - p) + p^5 = 0.0081 + 0.00045 + 0.00001 = 0.00856$. The rate is $0.2$, less than $40\,\%$ of the capacity $0.531$, and the error probability is still nearly $10^{-2}$.
:::
:::

::: exercise Water-filling with two channels {level=2 check="0.5*log2(4)+0.5*log2(4/3)"}
Two parallel Gaussian channels have noise variances $1$ and $3$. Find the water-filling allocation and the capacity (bits per use of the pair) for a total power of (a) $P = 1$ and (b) $P = 4$. Give (b) as the numerical answer.
::: solution
(a) Using only channel $1$: $\nu - 1 = 1$, $\nu = 2 < 3$, so channel $2$ is indeed off. $C = \tfrac12\log_2(1 + 1) = 0.5$ bits. (b) Both: $2\nu - 4 = 4$, $\nu = 4 > 3$, so both are on, with $P_1 = 3$, $P_2 = 1$. $C = \tfrac12\log_2\tfrac41 + \tfrac12\log_2\tfrac43 = 1 + 0.2075 = 1.21$ bits.
:::
:::

::: exercise The Shannon limit at half a bit per hertz {level=3 check="10*log10(2*(sqrt(2)-1))"}
::: hint
Start from $R \le B\log_2(1 + E_bR/(N_0B))$ and put $\eta = R/B$.
:::
Derive [[#eq-shannon-limit]] and evaluate the minimum $E_b/N_0$ in dB for $\eta = 0.5\,\mathrm{bit/s/Hz}$. By how many decibels does halving the spectral efficiency from $1$ to $0.5$ reduce the required $E_b/N_0$, and what happens if it is halved again and again?
::: solution
As in the proof of [[#thm-shannon-hartley]], $\eta \le \log_2(1 + \eta E_b/N_0)$ gives $E_b/N_0 \ge (2^\eta - 1)/\eta$. At $\eta = 0.5$: $(\sqrt2 - 1)/0.5 = 0.828 = -0.82\,\mathrm{dB}$. At $\eta = 1$ the limit is $0\,\mathrm{dB}$, so halving $\eta$ saves $0.82\,\mathrm{dB}$. Further halvings give $\eta = 0.25$: $4(2^{0.25} - 1) = 0.757 = -1.21\,\mathrm{dB}$; $\eta = 0.125$: $-1.40\,\mathrm{dB}$; and so on, approaching $-1.59\,\mathrm{dB}$. Each halving of spectral efficiency buys less, which is why deep-space systems settle at rates around $\tfrac16$ to $\tfrac12$ rather than spreading indefinitely.
:::
:::

::: exercise Designing a deep-space link {level=3}
::: hint
Solve $B\log_2(1 + (S/N_0)/B) = R$ numerically for $B$.
:::
A probe's signal arrives with $S/N_0 = 10^5\,\mathrm{Hz}$ ($50\,\mathrm{dB\,Hz}$). (a) What is the highest possible data rate? (b) What is the least bandwidth in which $120\,\mathrm{kbit/s}$ could be sent? (c) With practical codes operating $1\,\mathrm{dB}$ from the limit at rate $\tfrac12$ with BPSK ($\eta \approx 0.5$), what data rate can be supported?
::: solution
(a) $C_\infty = 10^5/\ln2 = 144\,\mathrm{kbit/s}$. (b) Solving $B\log_2(1 + 10^5/B) = 1.2\times10^5$ numerically gives $B = 233\,\mathrm{kHz}$ ($\eta = 0.52$). (c) At $\eta = 0.5$ the limit is $E_b/N_0 = -0.82\,\mathrm{dB}$, so the code needs $+0.18\,\mathrm{dB} = 1.04$. Then $R = (S/N_0)/(E_b/N_0) = 10^5/1.04 = 96\,\mathrm{kbit/s}$, two-thirds of the absolute limit, in a bandwidth of about $2R = 190\,\mathrm{kHz}$. Each decibel of coding gain is worth $26\,\%$ more data rate, which is why missions pay heavily for better codes.
:::
:::

::: exercise Concavity of mutual information {level=3}
::: hint
Write $I(X; Y) = H(Y) - \sum_xp(x)H(Y\mid X = x)$ and note how each term depends on $p(x)$ for a fixed channel.
:::
Show that, for a fixed channel $p(y\mid x)$, $I(X; Y)$ is a concave function of the input distribution $p(x)$. Why does this make the Blahut–Arimoto algorithm, and the KKT conditions of [[#thm-kkt]], reliable?
::: solution
The output distribution $p(y) = \sum_xp(x)p(y\mid x)$ is a linear function of $p(x)$, and $H(Y)$ is a concave function of $p(y)$ (because $-u\log u$ is concave), so $H(Y)$ is concave in $p(x)$. The second term $\sum_xp(x)H(Y\mid X = x)$ is linear in $p(x)$, since $H(Y\mid X = x)$ depends only on the channel. Concave minus linear is concave. A concave function on a convex set has no local maxima other than the global one, so any point that satisfies the first-order (KKT) conditions is a global maximum, and an ascent algorithm such as Blahut–Arimoto cannot get stuck at a false optimum.
:::
:::
