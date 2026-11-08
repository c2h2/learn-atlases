For forty years after Shannon, the best practical codes stayed about $3\,\mathrm{dB}$ away from capacity. Then, in 1993, Berrou, Glavieux and Thitimajshima reported a code that reached a bit error rate of $10^{-5}$ at $E_b/N_0 \approx 0.7\,\mathrm{dB}$ with rate $\tfrac12$ — within about half a decibel of the limit — using two simple convolutional encoders and a decoder that passed probabilities back and forth between them. Many experts at first suspected a mistake. Within a few years the **turbo principle** had been understood, Gallager's forgotten **low-density parity-check** (LDPC) codes of 1960 had been rediscovered and shown to do even better, and the gap to capacity had closed to hundredths of a decibel. In 2009 Arıkan added **polar codes**, the first explicit codes *proved* to achieve capacity with low complexity. Today LDPC codes carry the data in 5G New Radio, Wi-Fi, DVB-S2 satellite television and 10-gigabit Ethernet, polar codes carry the 5G control channels, and turbo codes served 3G and 4G.

What these codes share is **iterative soft decoding on a graph**. Instead of one decoder making hard decisions, many simple local decoders exchange **log-likelihood ratios** — how much more likely a bit is to be $0$ than $1$ — and refine them until they agree. This lesson develops log-likelihood ratios and the rule for combining them through a parity check, introduces LDPC codes and their **Tanner graphs**, analyses iterative decoding exactly on the erasure channel by **density evolution**, describes **belief propagation** on the Gaussian channel, explains turbo codes, and ends with **channel polarisation** and polar codes. It builds on the parity-check matrices of [[information-theory/linear-block-codes]], the recursive systematic encoders and soft decisions of [[information-theory/convolutional-codes]], and the capacity limits of [[information-theory/channel-capacity]].

## Log-likelihood ratios {#sec-llr}

Soft decoders need a common currency for "how sure are we about this bit?". The most convenient is a logarithm.

::: definition Log-likelihood ratio {#def-llr}
The **log-likelihood ratio** (LLR) of a bit $x \in \{0, 1\}$ given an observation $y$ is

$$
L(x\mid y) = \ln\frac{P(x = 0\mid y)}{P(x = 1\mid y)} .
$$ {#eq-llr}

Its sign is the hard decision ($L > 0$ means $0$ is more likely), and its magnitude is the reliability. Conversely, $P(x = 0\mid y) = e^{L}/(1 + e^{L})$ and $P(x = 0) - P(x = 1) = \tanh(L/2)$.
:::

With equiprobable bits and independent observations, LLRs **add**: if $y_1$ and $y_2$ are independent observations of the same bit, $L(x\mid y_1, y_2) = L(x\mid y_1) + L(x\mid y_2)$, because the likelihoods multiply and the logarithm turns products into sums. That is the variable-node rule of every iterative decoder.

::: theorem Channel LLR for BPSK in Gaussian noise {#thm-channel-llr}
If the bit is sent as $s = +1$ for $x = 0$ and $s = -1$ for $x = 1$ (equiprobable), and received as $y = s + n$ with $n \sim \mathcal N(0, \sigma^2)$, then

$$
L(x\mid y) = \frac{2y}{\sigma^2} .
$$ {#eq-channel-llr}
:::

::: proof
By Bayes' rule with equal priors, $L = \ln\frac{p(y\mid s = +1)}{p(y\mid s = -1)} = \frac{-(y - 1)^2 + (y + 1)^2}{2\sigma^2} = \frac{4y}{2\sigma^2}$.
:::

The demodulator output, scaled by $2/\sigma^2$, is already an LLR — which is why a receiver needs an estimate of the noise variance for soft decoding. On a BSC with crossover $p$, the channel LLR is $\pm\ln\frac{1 - p}{p}$; on the BEC it is $\pm\infty$ for received bits and $0$ for erasures.

The second rule tells us what a parity check says about one of its bits, given the others.

::: theorem The tanh rule {#thm-tanh}
Let $x_1, \dots, x_k$ be independent bits with LLRs $L_1, \dots, L_k$. The LLR of their sum $x_1 \oplus \dots \oplus x_k$ is

$$
L(x_1 \oplus \dots \oplus x_k) = 2\operatorname{atanh}\left(\prod_{i=1}^k\tanh\frac{L_i}2\right) \approx \left(\prod_{i=1}^k\operatorname{sign}L_i\right)\min_i\lvert L_i\rvert .
$$ {#eq-tanh}

The exact form is written $L_1 \boxplus L_2 \boxplus \dots \boxplus L_k$ ("box-plus"); the approximation is the **min-sum** rule.
:::

::: proof
Let $\delta_i = P(x_i = 0) - P(x_i = 1) = \tanh(L_i/2)$. For two bits, $P(x_1 \oplus x_2 = 0) - P(x_1 \oplus x_2 = 1) = [p_1p_2 + q_1q_2] - [p_1q_2 + q_1p_2] = (p_1 - q_1)(p_2 - q_2) = \delta_1\delta_2$, with $p_i = P(x_i = 0)$, $q_i = 1 - p_i$. By induction the difference for the sum of $k$ bits is $\prod_i\delta_i$, and converting back with $L = 2\operatorname{atanh}(\delta)$ gives [[#eq-tanh]]. For the approximation, $\lvert\tanh(L/2)\rvert$ is close to $1$ for large $\lvert L\rvert$, so the product is dominated by the least reliable factor.
:::

The parity of several bits is never more reliable than its least reliable bit, and one completely unreliable bit ($L = 0$) makes the parity completely unknown.

::: widget plot
f: 2*atanh(tanh(a/2)*tanh(x/2)); sign(x)*min(abs(x), a); x
x: -8, 8
y: -8, 8
sliders: a=2:0.1:8:0.1
labels: L_1\boxplus L_2\ \text{(exact)}; \text{min-sum}; L_2
caption: The LLR of $x_1 \oplus x_2$ as a function of $L_2$ (horizontal axis) for a fixed $L_1 = a > 0$. The exact box-plus (blue) saturates at $\pm a$: a parity check can be no more certain than its weakest input. Min-sum (orange) follows the same shape but overestimates the magnitude where $\lvert L_2\rvert \approx a$ — by up to $\ln 2 \approx 0.69$ — which is why practical min-sum decoders scale or offset their check-node outputs. Make $a$ small and both curves flatten towards zero.
:::

::: example A single parity check corrects a bit {#ex-spc}
Three bits satisfy $x_1 \oplus x_2 \oplus x_3 = 0$. Their channel LLRs are $L_1 = 2.0$, $L_2 = -0.5$, $L_3 = 1.5$. Hard decisions give $0, 1, 0$, which violates the check. Compute the **extrinsic** LLR that the check provides for each bit (from the other two), and the updated LLRs.
::: solution
Since $x_2 = x_1 \oplus x_3$, the check's message to bit $2$ is $L_1 \boxplus L_3 = 2\operatorname{atanh}\big(\tanh1.0\times\tanh0.75\big) = 2\operatorname{atanh}(0.7616\times0.6351) = 2\operatorname{atanh}(0.4837) = 1.056$. Adding it to the channel value gives $-0.5 + 1.056 = +0.556$: bit $2$ flips to $0$. Similarly, bit $1$ receives $L_2 \boxplus L_3 = -0.314$, updated to $2.0 - 0.314 = 1.686$, and bit $3$ receives $L_1 \boxplus L_2 = -0.377$, updated to $1.123$. The decisions are now $0, 0, 0$, which satisfy the check: the weakest bit was corrected, and the two strong bits lost a little confidence. Min-sum would give $+1.5$, $-0.5$ and $-0.5$ instead — the same signs, larger magnitudes.
:::
:::

## Low-density parity-check codes {#sec-ldpc}

::: definition LDPC code and Tanner graph {#def-ldpc}
A **low-density parity-check code** is a linear block code defined by a parity-check matrix $H$ in which each column has a small number $d_v$ of ones and each row a small number $d_c$ of ones, independent of the block length $n$. (For a **regular** $(d_v, d_c)$ code these numbers are fixed; irregular codes allow a distribution.) Its **Tanner graph** is a bipartite graph with a **variable node** for each code bit, a **check node** for each row of $H$, and an edge wherever $H_{ji} = 1$. The **design rate** is $R = 1 - d_v/d_c$ (the actual rate is higher if some rows of $H$ are dependent).
:::

A regular $(3, 6)$ code of length $n = 10\,000$ has $5000$ checks, each involving $6$ bits, and $30\,000$ edges — a matrix with $5\times10^7$ entries of which $99.94\,\%$ are zero. Sparsity is the whole point: the decoder's work per iteration is proportional to the number of edges, so it grows only linearly with $n$. Gallager showed that random regular LDPC codes with $d_v \ge 3$ have minimum distance growing linearly with $n$, so they are good codes; the question is whether a local decoder can exploit that.

### Decoding on the erasure channel

On the BEC every received bit is either known exactly or erased. A parity check with exactly one erased bit determines it: the erased bit equals the XOR of the others. The **peeling decoder** repeats this: find a check with one erased neighbour, fill it in, and continue until no such check remains. It succeeds if all erasures are filled; it stalls if every remaining check has two or more erasures (a **stopping set**).

How often does it stall? For long random codes, the local neighbourhood of a node up to a fixed depth is a tree with high probability, and the messages on the tree are independent. That makes an exact analysis possible.

::: theorem Density evolution on the BEC {#thm-de}
For a regular $(d_v, d_c)$ LDPC ensemble on a BEC with erasure probability $\varepsilon$, under the tree assumption, the probability $x_\ell$ that a variable-to-check message is still an erasure after $\ell$ iterations obeys

$$
x_\ell = \varepsilon\big[1 - (1 - x_{\ell-1})^{d_c - 1}\big]^{d_v - 1}, \qquad x_0 = \varepsilon .
$$ {#eq-de}

Decoding succeeds (with $x_\ell \to 0$) if and only if $\varepsilon\big[1 - (1 - x)^{d_c-1}\big]^{d_v-1} < x$ for all $x \in (0, \varepsilon]$. The largest such $\varepsilon$ is the **threshold** $\varepsilon^*$.
:::

::: proof
A check node sends a non-erased message to a variable node exactly when all its *other* $d_c - 1$ incoming messages are non-erased; under the tree assumption these are independent, each erased with probability $x_{\ell-1}$, so the check-to-variable message is erased with probability $y_\ell = 1 - (1 - x_{\ell-1})^{d_c-1}$. A variable node sends an erased message exactly when its channel value is erased (probability $\varepsilon$) *and* all its other $d_v - 1$ incoming check messages are erased, giving $x_\ell = \varepsilon y_\ell^{d_v-1}$. The recursion is a monotone iteration of the increasing function $f(x) = \varepsilon[1 - (1 - x)^{d_c-1}]^{d_v-1}$ starting from $x_0 = \varepsilon$; it converges to the largest fixed point of $f$ in $[0, \varepsilon]$, which is $0$ exactly when $f(x) < x$ throughout $(0, \varepsilon]$. (That the tree assumption holds for a fixed number of iterations as $n \to \infty$, and that a random code's performance concentrates around the ensemble average, are theorems of Richardson and Urbanke.)
:::

::: widget plot
f: e*(1 - (1 - x)^5)^2; x
x: 0, 0.5
y: 0, 0.5
sliders: e=0.40:0.30:0.50:0.002
labels: f(x) = \varepsilon[1-(1-x)^5]^2; x
caption: Density evolution for the regular $(3, 6)$ LDPC code on a BEC. Iterating $x \mapsto f(x)$ is a staircase between the blue curve and the diagonal, starting at $x = \varepsilon$. While the curve stays below the diagonal, the staircase runs down to $0$ and decoding succeeds. Raise $\varepsilon$ to about $0.4294$: the curve touches the diagonal near $x \approx 0.26$, a fixed point appears, and decoding stalls in a "tunnel" there. Capacity would allow $\varepsilon$ up to $0.5$ at this rate.
:::

::: example Choosing a regular LDPC ensemble {#ex-ldpc-design}
A storage system loses packets independently with probability $\varepsilon = 0.40$, and must recover them with a rate-$\tfrac12$ LDPC code decoded by peeling. Compare the $(3, 6)$ and $(4, 8)$ ensembles, and estimate the number of iterations needed.
::: solution
Both have rate $1 - \tfrac36 = 1 - \tfrac48 = \tfrac12$, and capacity would allow $\varepsilon < 0.5$. Solving for the thresholds by iterating [[#eq-de]] numerically gives $\varepsilon^*_{(3,6)} = 0.4294$ and $\varepsilon^*_{(4,8)} = 0.3834$. At $\varepsilon = 0.40$ the $(3, 6)$ code works and the $(4, 8)$ code fails — more edges per node do not help: higher degrees make each check more likely to contain a second erasure.

For $(3, 6)$ at $\varepsilon = 0.40$: $x_1 = 0.4[1 - 0.6^5]^2 = 0.4\times0.9222^2 = 0.340$, $x_2 = 0.4[1 - 0.660^5]^2 = 0.4\times0.8745^2 = 0.306$, and so on; the erasure probability falls below $10^{-6}$ after $18$ iterations (the passage near the narrow "tunnel" takes most of them). A design operating closer to the threshold would need many more iterations, and finite block lengths shift the practical threshold a little lower; a margin of a few hundredths in $\varepsilon$ is usual. Irregular degree distributions, optimised with the same density-evolution tool, push the threshold to within $0.001$ of capacity.
:::
:::

### Belief propagation on the Gaussian channel

On channels with soft outputs the same message-passing schedule carries LLRs instead of erasure flags.

::: algorithm Sum–product (belief-propagation) decoding of LDPC codes {#alg-bp}
Input: channel LLRs $L_i^{\text{ch}}$ for each bit $i$ (from [[#eq-channel-llr]]).
1. **Initialise** every variable-to-check message $m_{i\to j} = L_i^{\text{ch}}$.
2. **Check-node update.** Each check $j$ sends to each neighbour $i$ the box-plus of its *other* incoming messages: $m_{j\to i} = \boxplus_{i'\in N(j)\setminus i}\,m_{i'\to j}$ (or the min-sum approximation).
3. **Variable-node update.** Each bit sends to each check the sum of its channel LLR and the *other* incoming check messages: $m_{i\to j} = L_i^{\text{ch}} + \sum_{j'\in N(i)\setminus j}m_{j'\to i}$.
4. **Decision.** Compute $L_i = L_i^{\text{ch}} + \sum_{j\in N(i)}m_{j\to i}$ and $\hat x_i = 0$ if $L_i \ge 0$. If $\hat{\mathbf x}H^{\T} = \mathbf 0$, stop; otherwise return to step 2, up to a maximum number of iterations.
:::

Excluding the recipient's own message ("extrinsic" information) is essential: a node must not be told back what it has just said, or the decoder would reinforce its own errors. On a cycle-free graph the algorithm computes the exact a-posteriori probability of every bit; real Tanner graphs have cycles, but if the shortest cycle (the **girth**) is long, the messages are nearly independent for many iterations, and density evolution — now tracking probability densities of LLRs rather than a single number — predicts thresholds accurately. For the regular $(3, 6)$ code on the binary-input AWGN channel the threshold is about $E_b/N_0 = 1.1\,\mathrm{dB}$, against the rate-$\tfrac12$ limit of $0.19\,\mathrm{dB}$; optimised irregular codes reach within $0.0045\,\mathrm{dB}$ of the limit in simulation at block lengths of $10^7$ bits (Chung, Forney, Richardson and Urbanke, 2001).

::: warning Error floors and cycles
Iterative decoders do not minimise the error probability exactly, and finite codes have structures — short cycles, small stopping sets, "trapping sets" — on which belief propagation converges to a wrong answer. The bit error rate then stops falling steeply and flattens into an **error floor**, often around $10^{-6}$ to $10^{-10}$. Systems that need lower error rates either design the graph to avoid harmful structures (large girth, structured "protograph" constructions) or add an outer algebraic code: DVB-S2 places a BCH code outside its LDPC code for exactly this reason. Do not extrapolate a waterfall curve measured at $10^{-5}$ down to $10^{-12}$.
:::

## Turbo codes {#sec-turbo}

The turbo encoder combines two recursive systematic convolutional (RSC) encoders, from [[information-theory/convolutional-codes]], in parallel.

::: definition Turbo code {#def-turbo}
A **parallel concatenated (turbo) code** encodes the information block $\mathbf u$ of length $K$ three ways: the systematic bits $\mathbf u$ themselves; the parity bits $\mathbf p^{(1)}$ of an RSC encoder fed with $\mathbf u$; and the parity bits $\mathbf p^{(2)}$ of a second RSC encoder fed with $\pi(\mathbf u)$, a pseudo-random permutation (**interleaver**) of $\mathbf u$. The rate is $\tfrac13$, raised to $\tfrac12$ or more by puncturing the parity streams.
:::

The interleaver is the key. A low-weight codeword needs a low-weight parity sequence from *both* encoders. An RSC encoder produces a low-weight parity sequence only for special inputs (weight-$2$ inputs whose ones are a multiple of the feedback period apart, for example); after a good random interleaver, it is unlikely that the permuted input is special too. Turbo codes therefore have few low-weight codewords — the number shrinks roughly as $1/K$ with the interleaver length (**interleaver gain**) — even though their minimum distance is not large.

The decoder runs two soft-input soft-output component decoders, each computing bit LLRs over its trellis with the BCJR (forward–backward) algorithm. Each decoder's output LLR splits into three parts,

$$
L(u_t) = L_t^{\text{ch}} + L_t^{\text{a}} + L_t^{\text{e}},
$$ {#eq-turbo-llr}

the channel value of the systematic bit, the a-priori value supplied by the other decoder, and the new **extrinsic** information derived from the parity bits and the trellis. Only $L^{\text{e}}$ is passed on, interleaved or de-interleaved, to serve as the other decoder's a-priori input. After $6$–$10$ iterations the two decoders agree, and the decisions are the signs of $L(u_t)$. The name refers to this feedback, likened to the exhaust-driven compressor of a turbocharged engine. The behaviour is visualised by **EXIT charts** (Stephan ten Brink, 2001), which plot each decoder's output mutual information against its input mutual information; decoding converges when the two curves leave an open tunnel between them — the same picture as the density-evolution figure above.

::: example Rate and puncturing of a turbo code {#ex-turbo-rate}
An LTE-style turbo code encodes $K = 6144$ information bits with two $8$-state RSC encoders, each terminated with $3$ tail bits that produce $3$ tail-systematic and $3$ tail-parity bits. (a) What is the exact rate before puncturing? (b) To obtain rate $\tfrac12$, how many parity bits must be removed?
::: solution
(a) Systematic $6144$, parity $6144 + 6144$, plus $2\times(3 + 3) = 12$ tail bits: $18\,444$ code bits, rate $6144/18\,444 = 0.3331$. (b) Rate $\tfrac12$ means $12\,288$ code bits, so $18\,444 - 12\,288 = 6156$ bits are removed, essentially half of the parity bits — for example, alternately deleting a bit of $\mathbf p^{(1)}$ and of $\mathbf p^{(2)}$, so every information bit keeps one parity bit. The systematic bits are never punctured; they are the bits both decoders share. (LTE actually uses a circular buffer from which any rate can be read out, which amounts to the same thing.)
:::
:::

::: quiz
Why must an iterative decoder pass only *extrinsic* information between its component decoders?
- [ ] Because the channel LLRs are not available to the second decoder
- [x] Because feeding a decoder's own input back to it counts the same evidence twice, making the decoder overconfident in its errors
- [ ] Because extrinsic LLRs are smaller and avoid numerical overflow
- [ ] Because the interleaver cannot permute a-posteriori values
::: solution
Iterative decoding treats the incoming messages as independent pieces of evidence and adds them. If a decoder received back its own previous output, that evidence would be added again and again — a positive feedback loop that drives LLRs to large magnitudes whether they are right or wrong. Subtracting the input (keeping only what the decoder learned from *other* information: the parity bits, the code constraints) keeps the evidence approximately independent.
:::
:::

## Polar codes {#sec-polar}

Turbo and LDPC codes approach capacity in practice, but their optimality is supported by simulation and by density evolution of ensembles, not by a proof for a specific code. Arıkan's polar codes achieve capacity *provably*, with encoding and decoding complexity $O(N\log N)$, through a strikingly simple idea: transform $N$ copies of a channel into $N$ synthetic channels that are almost all either perfect or useless, and send data only on the perfect ones.

::: definition The polar transform {#def-polar}
Take two independent uses of a binary-input channel $W$. Combine two bits $u_1, u_2$ as

$$
x_1 = u_1 \oplus u_2, \qquad x_2 = u_2,
$$ {#eq-polar-kernel}

and send $x_1, x_2$ over $W$, receiving $y_1, y_2$. This defines two **synthetic channels**: $W^-$, from $u_1$ to $(y_1, y_2)$ with $u_2$ unknown, and $W^+$, from $u_2$ to $(y_1, y_2, u_1)$, in which $u_1$ is assumed already decoded. Applying the construction recursively $n$ times to $N = 2^n$ copies (matrix $G_N = F^{\otimes n}$ with $F = \begin{bmatrix}1 & 0\\ 1 & 1\end{bmatrix}$) gives $N$ synthetic channels $W_N^{(i)}$.
:::

::: theorem Conservation and polarisation {#thm-polar}
For any binary-input memoryless channel $W$ with symmetric capacity $I(W)$:
1. $I(W^-) + I(W^+) = 2I(W)$ and $I(W^-) \le I(W) \le I(W^+)$.
2. For the BEC with erasure probability $\varepsilon$, $W^-$ is a BEC with erasure probability $2\varepsilon - \varepsilon^2$ and $W^+$ a BEC with erasure probability $\varepsilon^2$.
3. (Arıkan.) As $N \to \infty$, for any $\delta > 0$ the fraction of synthetic channels with $I(W_N^{(i)}) > 1 - \delta$ tends to $I(W)$, and the fraction with $I(W_N^{(i)}) < \delta$ tends to $1 - I(W)$.
:::

::: proof
(1) The map $(u_1, u_2) \mapsto (x_1, x_2)$ is invertible, so with uniform independent inputs, $2I(W) = I(X_1, X_2; Y_1, Y_2) = I(U_1, U_2; Y_1, Y_2) = I(U_1; Y_1, Y_2) + I(U_2; Y_1, Y_2\mid U_1)$ by the chain rule [[information-theory/entropy-information#thm-mutual-props]]. Since $U_1$ and $U_2$ are independent, $I(U_2; Y_1, Y_2\mid U_1) = I(U_2; Y_1, Y_2, U_1) = I(W^+)$, and the first term is $I(W^-)$. Further, $I(W^+) \ge I(U_2; Y_2) = I(W)$ because $u_2 = x_2$ is seen through $y_2$ alone at least; conservation then gives $I(W^-) \le I(W)$.
(2) On the BEC, $u_1 = x_1 \oplus x_2$ is known exactly when both $y_1$ and $y_2$ are unerased, probability $(1 - \varepsilon)^2$, so $W^-$ erases with probability $1 - (1 - \varepsilon)^2 = 2\varepsilon - \varepsilon^2$. Given $u_1$, $u_2$ is known from $y_2$ directly, or from $y_1 \oplus u_1$; it is erased only if both are erased, probability $\varepsilon^2$.
(3) Choosing $-$ or $+$ at random at each of the $n$ levels makes $I(W_N^{(i)})$ a bounded martingale, by part 1; it converges almost surely, and the only fixed points of the transform are the perfect and useless channels, so the limit is $0$ or $1$ with probabilities $1 - I(W)$ and $I(W)$. The full argument, with the rate of polarisation, is in Arıkan's 2009 paper.
:::

::: widget plot
f: 2*x - x^2; x^2; x
x: 0, 1
y: 0, 1
labels: \varepsilon^- = 2\varepsilon - \varepsilon^2; \varepsilon^+ = \varepsilon^2; \varepsilon
caption: One step of polarisation on the BEC: the erasure probability of the worse channel $W^-$ (blue) and the better channel $W^+$ (orange) against that of the original channel. Their average is always $\varepsilon$ (the diagonal) — capacity is conserved — but they move apart. Iterating, start at $\varepsilon = 0.5$: one step gives $0.75$ and $0.25$, two steps $0.9375, 0.5625, 0.4375, 0.0625$, and with each further step the values crowd towards $0$ and $1$, the only fixed points.
:::

A **polar code** of length $N$ and dimension $K$ puts the $K$ information bits on the synthetic channels with the smallest error probabilities and **freezes** the others to known values (zeros). The **successive-cancellation** (SC) decoder estimates $u_1, u_2, \dots, u_N$ in order, each from the received sequence and the previous decisions — exactly the conditioning that defines the $W^+$ channels — using box-plus at "$-$" nodes and LLR addition at "$+$" nodes of the butterfly graph, in $O(N\log N)$ operations. Arıkan showed that the block error probability of SC decoding at any fixed rate $R < I(W)$ falls roughly as $2^{-\sqrt N}$.

::: example A length-8 polar code on the BEC {#ex-polar8}
Construct a rate-$\tfrac12$ polar code of length $8$ for a BEC with $\varepsilon = 0.5$.
::: solution
Apply part 2 of [[#thm-polar]] three times. Level $1$: $0.75$, $0.25$. Level $2$: from $0.75$: $0.9375, 0.5625$; from $0.25$: $0.4375, 0.0625$. Level $3$ gives the eight synthetic erasure probabilities, in the natural index order $i = 1, \dots, 8$:

| $i$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ |
|---|---|---|---|---|---|---|---|---|
| $\varepsilon_i$ | $0.996$ | $0.879$ | $0.809$ | $0.316$ | $0.684$ | $0.191$ | $0.121$ | $0.004$ |

Their average is $0.5$, as conservation requires. The four best are $i = 8, 7, 6, 4$; these carry the information bits, and $u_1, u_2, u_3, u_5$ are frozen to $0$. The sum of the chosen erasure probabilities, $0.004 + 0.121 + 0.191 + 0.316 = 0.633$, is a union bound on the SC block error probability — far from small. At $N = 8$ polarisation has barely begun (channel $4$ is still poor). At $N = 1024$ most channels are within $10^{-3}$ of $0$ or $1$, and practical polar codes of a few hundred to a few thousand bits use a better decoder, below.
:::
:::

Plain SC decoding is weak at practical lengths because an early wrong decision cannot be undone. **Successive-cancellation list** (SCL) decoding (Tal and Vardy, 2011) keeps the $L$ most likely partial paths (typically $L = 8$) instead of one, and a short **CRC** appended to the information bits picks the right path from the final list. CRC-aided SCL polar codes match or beat LDPC and turbo codes at short block lengths, which is why 3GPP chose them for the 5G control channels, whose messages are only tens to a few hundred bits long.

::: application Modern codes in standards
- **Turbo codes:** 3G UMTS and CDMA2000, 4G LTE data channels (block lengths up to $6144$ bits, $8$-state component codes), and the CCSDS deep-space standard.
- **LDPC codes:** DVB-S2/S2X satellite television (block lengths $16\,200$ and $64\,800$ bits, with an outer BCH code), IEEE 802.11n/ac/ax Wi-Fi, 10GBASE-T Ethernet, ITU G.hn home networking, 5G NR data channels (quasi-cyclic codes from two base graphs supporting many rates and lengths), solid-state-drive controllers, and the CCSDS near-Earth standard.
- **Polar codes:** 5G NR control channels and broadcast channel, with CRC-aided list decoding.

Structured **quasi-cyclic** LDPC codes — whose $H$ consists of cyclically shifted identity blocks — dominate hardware because the shifts map onto barrel shifters and the blocks onto parallel processing units, reaching throughputs of tens of gigabits per second.
:::

## Where this leads {#sec-leads}

With codes operating within a few tenths of a decibel of the Shannon limit, the remaining gains in communication systems come from elsewhere: from **coded modulation** (bit-interleaved coded modulation, used with QAM in Wi-Fi and 5G, and probabilistic constellation shaping in optical fibre), from multiple antennas and adaptive modulation in [[communication-systems/wireless-communication]], and from short-block-length design for low-latency control traffic. The iterative principle itself — local soft computations exchanging extrinsic information on a graph — is the sum–product algorithm on factor graphs, which also performs turbo equalisation, joint channel estimation and decoding, and inference in the probabilistic models of [[random-signals/estimation-kalman]] (the Kalman filter is belief propagation on a Gaussian chain). The capacity limits of [[information-theory/channel-capacity]] remain the yardstick for every new scheme.

::: history
Robert Gallager introduced low-density parity-check codes and iterative probabilistic decoding in his 1960 MIT doctoral thesis (published as a monograph in 1963); too complex for the hardware of the day, they were largely forgotten, though Michael Tanner described their graphs in 1981. Claude Berrou, Alain Glavieux and Punya Thitimajshima presented turbo codes at the IEEE International Conference on Communications in Geneva in 1993. David MacKay and Radford Neal rediscovered LDPC codes in 1995–96 and showed that they rival turbo codes. Thomas Richardson and Rüdiger Urbanke developed density evolution in 2001, and with Amin Shokrollahi designed irregular codes approaching capacity; Sae-Young Chung, David Forney, Richardson and Urbanke reported a code within $0.0045\,\mathrm{dB}$ of the Shannon limit in 2001. Michael Luby and colleagues' work on erasure codes (1997–2001) led to fountain codes. Erdal Arıkan published polar codes in 2009; Ido Tal and Alexander Vardy introduced list decoding in 2011, and in 2016 3GPP adopted LDPC codes for 5G data and polar codes for control.
:::

::: summary
- Soft decoders exchange log-likelihood ratios $L = \ln\frac{P(0)}{P(1)}$; for BPSK in Gaussian noise $L = 2y/\sigma^2$. Independent evidence adds; through a parity check, LLRs combine by the tanh rule (box-plus), approximated by min-sum.
- LDPC codes have sparse parity-check matrices; their Tanner graphs connect variable and check nodes, and decoding costs time proportional to the number of edges.
- On the BEC, peeling and density evolution $x_\ell = \varepsilon[1 - (1 - x_{\ell-1})^{d_c-1}]^{d_v-1}$ give exact thresholds: $0.4294$ for the $(3, 6)$ code against a capacity limit of $0.5$; irregular codes come within $0.001$.
- Belief propagation passes extrinsic messages — box-plus at checks, sums at variables — and is exact on trees, near-optimal on graphs of large girth, but subject to error floors.
- Turbo codes concatenate two recursive systematic convolutional encoders through an interleaver and decode by exchanging extrinsic LLRs between BCJR decoders.
- Polar codes combine channels pairwise; mutual information is conserved, $I(W^-) + I(W^+) = 2I(W)$, while the synthetic channels polarise to perfect or useless; data go on the good ones, decoded by successive cancellation (with lists and a CRC in 5G).
:::

## Exercises

::: exercise A channel LLR {level=1 check="2*0.4/0.25"}
A BPSK receiver observes $y = 0.4$ with noise variance $\sigma^2 = 0.25$ (symbols $\pm1$). Find the LLR of the bit and the probability that it is $0$.
::: solution
$L = 2y/\sigma^2 = 0.8/0.25 = 3.2$. $P(x = 0\mid y) = e^{3.2}/(1 + e^{3.2}) = 0.961$.
:::
:::

::: exercise Counting a Tanner graph {level=1 check="3000"}
A regular $(3, 6)$ LDPC code has length $n = 1000$. How many check nodes and edges does its Tanner graph have, and what is its design rate? Give the number of edges as the answer.
::: solution
Edges $= nd_v = 3000$; checks $= 3000/d_c = 500$; design rate $1 - 500/1000 = \tfrac12$.
:::
:::

::: exercise One polarisation step {level=1 check="2*0.3-0.3^2"}
A BEC has $\varepsilon = 0.3$. Find the erasure probabilities of $W^-$ and $W^+$ and check that capacity is conserved. Give $\varepsilon^-$ as the answer.
::: solution
$\varepsilon^- = 0.6 - 0.09 = 0.51$, $\varepsilon^+ = 0.09$. Capacities $0.49 + 0.91 = 1.40 = 2\times0.7$.
:::
:::

::: exercise Box-plus {level=2 check="2*atanh(tanh(0.5)*tanh(1))"}
Compute $L_1 \boxplus L_2$ for $L_1 = 1$ and $L_2 = 2$ exactly, and compare with min-sum.
::: solution
$2\operatorname{atanh}(\tanh0.5\times\tanh1) = 2\operatorname{atanh}(0.4621\times0.7616) = 2\operatorname{atanh}(0.3520) = 0.735$. Min-sum gives $\min(1, 2) = 1$, an overestimate by $0.265$.
:::
:::

::: exercise Peeling by hand {level=2}
A code has the parity checks $x_1 \oplus x_2 \oplus x_4 = 0$, $x_2 \oplus x_3 \oplus x_5 = 0$, $x_1 \oplus x_3 \oplus x_6 = 0$, $x_4 \oplus x_5 \oplus x_6 = 0$. Over a BEC the word $(1, ?, 0, ?, ?, 1)$ is received. Decode it by peeling. Would $(?, ?, 0, ?, 1, ?)$ be decodable?
::: solution
Check $3$ involves $x_1, x_3, x_6 = 1, 0, 1$: satisfied, no erasures. Check $1$: $x_1 \oplus x_2 \oplus x_4$ has two erasures; check $2$: $x_2, x_5$ erased; check $4$: $x_4, x_5$ erased. Every check with an erasure has two — a stopping set $\{2, 4, 5\}$ — and peeling stalls. (Indeed both $(1, 0, 0, 1, 0, 1)$ and $(1, 1, 0, 0, 1, 1)$ satisfy all checks, so no decoder could resolve it.) For $(?, ?, 0, ?, 1, ?)$: check $2$ has only $x_2$ erased: $x_2 = 0 \oplus 1 = 1$. Then check $1$ has $x_1, x_4$; check $3$ has $x_1, x_6$; check $4$ has $x_4, x_6$ — two each, stalled again, with the stopping set $\{1, 4, 6\}$. It is not decodable by peeling (and, since two codewords fit, not by any decoder).
:::
:::

::: exercise Density evolution steps {level=2 check="0.45*(1-(1-0.45)^5)^2"}
For the $(3, 6)$ code on a BEC with $\varepsilon = 0.45$ (above threshold), compute $x_1$ from [[#eq-de]] and describe what happens as the iteration continues.
::: solution
$x_1 = 0.45[1 - 0.55^5]^2 = 0.45\times0.9497^2 = 0.406$. Continuing: $0.386$, $0.375$, $0.368$, $0.364$, … converging to a non-zero fixed point near $0.35$: a fraction of the erasures is never resolved, because $\varepsilon > \varepsilon^* = 0.4294$.
:::
:::

::: exercise Why weight-2 inputs matter {level=2}
Explain why the low-weight codewords of a turbo code come mostly from information sequences of weight $2$, and how the interleaver length affects their number.
::: solution
A recursive encoder returns to the zero state only for inputs divisible by its feedback polynomial; weight-$1$ inputs never do, so they always give long (high-weight) parity sequences. The lightest returning inputs are weight-$2$ inputs with their ones separated by a multiple of the feedback period $p$. A codeword of low weight needs such a pattern in $\mathbf u$ *and* in $\pi(\mathbf u)$. For a random interleaver of length $K$, the probability that a given separated pair is mapped to another pair with separation a multiple of $p$ (and small) is of order $1/K$, so the expected number of such low-weight codewords stays roughly constant while the number of information bits grows as $K$: the error coefficient per bit falls as $1/K$, the interleaver gain.
:::
:::

::: exercise Threshold of a degree-2 ensemble {level=3 check="1/3"}
::: hint
For $d_v = 2$, $f(x) = \varepsilon[1 - (1 - x)^{d_c - 1}]$ is concave in $x$; compare its slope at $x = 0$ with the diagonal.
:::
Show that for a regular $(2, d_c)$ ensemble on the BEC, density evolution converges to $0$ if and only if $\varepsilon < 1/(d_c - 1)$. Evaluate the threshold for $d_c = 4$ (rate $\tfrac12$) and compare with the $(3, 6)$ code.
::: solution
With $d_v = 2$, $f(x) = \varepsilon[1 - (1 - x)^{d_c-1}]$ is increasing and concave on $[0, 1]$ with $f(0) = 0$ and $f'(0) = \varepsilon(d_c - 1)$. A concave function through the origin lies below the line $x$ on $(0, \varepsilon]$ if and only if its slope at the origin is at most $1$ (if $f'(0) > 1$ it rises above the diagonal near $0$; if $f'(0) \le 1$, concavity keeps it below, strictly when $f'(0) < 1$). So the threshold is $\varepsilon^* = 1/(d_c - 1)$; for $d_c = 4$, $\varepsilon^* = \tfrac13$, well below the $(3, 6)$ code's $0.429$. Degree-$2$ variable nodes make decoding fragile at small erasure densities — the "stability condition" that limits the fraction of degree-$2$ nodes in optimised irregular codes.
:::
:::

::: exercise A length-4 polar code {level=3 check="0.0625+0.4375"}
::: hint
Use the level-2 values from the polarisation figure caption.
:::
For $N = 4$ and a BEC with $\varepsilon = 0.5$, list the four synthetic erasure probabilities, choose the information set for a rate-$\tfrac12$ code, and give the union bound on the SC block error probability.
::: solution
From $\varepsilon = 0.5$: level $1$ gives $0.75$ ($-$) and $0.25$ ($+$); level $2$ gives $u_1$: $0.9375$, $u_2$: $0.5625$, $u_3$: $0.4375$, $u_4$: $0.0625$. The two best are $u_4$ and $u_3$; freeze $u_1, u_2$. The union bound is $0.0625 + 0.4375 = 0.5$ — at this tiny length the code is little better than uncoded transmission; polarisation needs long blocks.
:::
:::

::: exercise Conservation for a general channel {level=3}
Show from the chain rule that $I(W^-) + I(W^+) = 2I(W)$ for any binary-input memoryless channel with uniform inputs, and deduce that the polar transform loses no capacity. Why, nevertheless, does a practical polar code of finite length operate below capacity?
::: solution
As in the proof of [[#thm-polar]]: $(U_1, U_2) \leftrightarrow (X_1, X_2)$ is a bijection, so $I(U_1U_2; Y_1Y_2) = I(X_1X_2; Y_1Y_2) = I(X_1; Y_1) + I(X_2; Y_2) = 2I(W)$ (memoryless channel, independent uniform $X_1, X_2$). The chain rule splits the left side into $I(U_1; Y_1Y_2) + I(U_2; Y_1Y_2\mid U_1)$, and independence of $U_1, U_2$ turns the second term into $I(U_2; Y_1Y_2U_1) = I(W^+)$. Applied recursively, the $N$ synthetic capacities sum to $NI(W)$: nothing is lost. At finite $N$, however, many channels are only partly polarised; a code that must achieve a small block error probability can use only the channels that are nearly perfect, and the capacity in the partly polarised ones is wasted. The gap closes as $N$ grows, but only like $N^{-1/\mu}$ with $\mu \approx 3.6$ for the BEC — slower than for random codes — which list decoding and CRCs partly offset.
:::
:::
