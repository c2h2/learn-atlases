When Voyager 1 and 2 sent back their pictures of Jupiter and Saturn, every bit was protected by a code whose encoder consisted of six flip-flops and two exclusive-OR trees. The same code — rate $\tfrac12$, constraint length $7$, generators $171$ and $133$ in octal — protects the data in every IEEE 802.11a/g Wi-Fi frame forty years later. It is a **convolutional code**: instead of chopping the data into blocks, the encoder slides along the bit stream, and each output bit is a parity of the last few input bits. Its decoder, the **Viterbi algorithm**, finds the most likely transmitted sequence with a fixed amount of work per bit, and — unlike the algebraic decoders of [[information-theory/cyclic-codes]] — it uses soft decisions as easily as hard ones.

This lesson describes convolutional encoders as finite-state machines, draws their **state diagrams** and **trellises**, defines the **free distance** that governs their performance and computes it with the **transfer function**, derives the Viterbi algorithm and proves it optimal, and bounds the bit error rate with soft and hard decisions. It ends with puncturing, termination and the recursive systematic encoders that become the building blocks of turbo codes in [[information-theory/modern-codes]]. We use linear codes, Hamming distance and the coding gain from [[information-theory/linear-block-codes]], the shift registers of [[digital-logic/registers-counters]], and the $Q$-function error rates of [[communication-systems/optimal-detection]].

## Convolutional encoders {#sec-encoders}

::: definition Convolutional encoder {#def-conv-encoder}
A rate-$\tfrac1n$ binary **convolutional encoder** with **memory** $m$ holds the last $m$ input bits in a shift register. At each time $t$ it reads one input bit $u_t$ and emits $n$ output bits

$$
c_t^{(j)} = \sum_{i=0}^m g_i^{(j)}u_{t-i} \pmod 2, \qquad j = 1, \dots, n,
$$ {#eq-conv}

where the binary **generator sequences** $\mathbf g^{(j)} = (g_0^{(j)}, \dots, g_m^{(j)})$ say which register taps feed each output. The **constraint length** is $K = m + 1$, the number of input bits that influence each output. Generators are usually written in octal: $\mathbf g = 111 \to 7$, $\mathbf g = 101 \to 5$.
:::

Each output stream is the **convolution** of the input with a generator — hence the name. In the delay-operator notation $u(D) = \sum_tu_tD^t$ (the $z$-transform of [[dsp/discrete-time-systems]] with $D = z^{-1}$, over $\mathbb F_2$), the encoder is a bank of FIR filters,

$$
c^{(j)}(D) = u(D)\,g^{(j)}(D), \qquad g^{(j)}(D) = g_0^{(j)} + g_1^{(j)}D + \dots + g_m^{(j)}D^m .
$$ {#eq-conv-D}

The code is linear (a sum of input sequences produces the sum of output sequences) and time-invariant (delaying the input delays the output). Rate-$\tfrac kn$ encoders read $k$ bits at a time through $k$ registers; most practical higher-rate codes, however, are obtained from rate-$\tfrac12$ codes by puncturing (see [[#sec-practice]]).

::: example Encoding with the (7, 5) code {#ex-encode75}
The rate-$\tfrac12$, $K = 3$ encoder has $\mathbf g^{(1)} = 111$ and $\mathbf g^{(2)} = 101$: $c^{(1)}_t = u_t + u_{t-1} + u_{t-2}$ and $c^{(2)}_t = u_t + u_{t-2}$. Encode $1011$, followed by two zeros to return the register to the all-zero state.
::: solution
With the register $(u_{t-1}, u_{t-2})$ initially $00$:

| $t$ | $u_t$ | register before | $c^{(1)}c^{(2)}$ | register after |
|---|---|---|---|---|
| $0$ | $1$ | $00$ | $1+0+0,\ 1+0 = 11$ | $10$ |
| $1$ | $0$ | $10$ | $0+1+0,\ 0+0 = 10$ | $01$ |
| $2$ | $1$ | $01$ | $1+0+1,\ 1+1 = 00$ | $10$ |
| $3$ | $1$ | $10$ | $1+1+0,\ 1+0 = 01$ | $11$ |
| $4$ | $0$ | $11$ | $0+1+1,\ 0+1 = 01$ | $01$ |
| $5$ | $0$ | $01$ | $0+0+1,\ 0+1 = 11$ | $00$ |

The code sequence is $11\ 10\ 00\ 01\ 01\ 11$. Check with polynomials: $u(D) = 1 + D^2 + D^3$, and $u(D)(1 + D + D^2) = 1 + D + D^5$ gives the first-output stream $1, 1, 0, 0, 0, 1$; $u(D)(1 + D^2) = 1 + D^3 + D^4 + D^5$ gives $1, 0, 0, 1, 1, 1$. Interleaving them reproduces the table. The two flush zeros (the **tail**) cost rate: $4$ data bits became $12$ code bits, rate $\tfrac13$ rather than $\tfrac12$; for long messages the loss is negligible.
:::
:::

## State diagrams and trellises {#sec-trellis}

The encoder is a finite-state machine (a Mealy machine, in the language of [[digital-logic/finite-state-machines]]). Its **state** is the register contents $(u_{t-1}, \dots, u_{t-m})$, so there are $2^m$ states; each input bit causes a transition to a new state and produces $n$ output bits.

For the $(7, 5)$ code, writing the state as $u_{t-1}u_{t-2}$ and each branch as input/output:

| state | input $0$: output, next | input $1$: output, next |
|---|---|---|
| $00$ | $00$, $00$ | $11$, $10$ |
| $10$ | $10$, $01$ | $01$, $11$ |
| $01$ | $11$, $00$ | $00$, $10$ |
| $11$ | $01$, $01$ | $10$, $11$ |

A **trellis** unrolls the state diagram in time: a column of $2^m$ nodes for each time step, with a branch from each node at time $t$ to the two successor states at time $t + 1$, labelled with the output bits. Every code sequence is a path through the trellis that starts in state $00$, and every path is a code sequence. In the trellis the structure of a convolutional code becomes visible: two paths that leave a common state must travel separately for at least $K$ steps before they can merge again, and while apart they accumulate Hamming distance.

### Free distance and the transfer function

Because the code is linear, the distance properties are those of the paths that leave the all-zero path and later return to it.

::: definition Free distance {#def-free-distance}
The **free distance** $d_{\text{free}}$ of a convolutional code is the minimum Hamming weight of a code sequence produced by an input that starts in state zero, contains at least one $1$, and returns to state zero — equivalently, the minimum distance between any two distinct code sequences.
:::

The free distance plays the role of $d_{\min}$: a maximum-likelihood decoder corrects any pattern of errors in which no stretch of the received sequence contains $\lfloor(d_{\text{free}} - 1)/2\rfloor$ or more errors within one "error event". Finding $d_{\text{free}}$ is a shortest-path problem on the state diagram split open at state $00$.

::: widget graph
nodes: In@0,0; 10@1,1; 11@2,2; 01@3,1; Out@4,0
edges: In>10:2; 10>01:1; 10>11:1; 11>01:1; 11>11:1; 01>10:0; 01>Out:2
algorithm: dijkstra
start: In
caption: The state diagram of the $(7, 5)$ encoder split at state $00$ ("In" is leaving it, "Out" returning), with each branch weighted by the Hamming weight of its two output bits. Step through Dijkstra's algorithm from "In": the shortest path to "Out" has length $5$ — the free distance — along In → 10 → 01 → Out, which is the input $100$ with output $11\,10\,11$. The loop at $11$ and the zero-weight branch $01 \to 10$ create the longer detours counted by the transfer function.
:::

To count *all* paths by weight we solve the state equations of the split diagram, as for a signal-flow graph.

::: theorem Transfer function of the (7, 5) code {#thm-transfer}
Label each branch of the split state diagram by $D^{w}N^{b}$, where $w$ is the output weight and $b$ the input bit. The generating function of the paths from In to Out is

$$
T(D, N) = \sum_{d, b}A_{d,b}D^dN^b = \frac{D^5N}{1 - 2DN} = D^5N + 2D^6N^2 + 4D^7N^3 + \cdots ,
$$ {#eq-transfer}

so there is $A_d = 2^{d-5}$ path of weight $d \ge 5$, $d_{\text{free}} = 5$, and the total number of input ones on paths of weight $d$ is

$$
B_d = \left.\frac{\partial T}{\partial N}\right|_{N=1}\text{ coefficient} :\qquad \frac{D^5}{(1 - 2D)^2} = \sum_{d\ge5}(d - 4)2^{d-5}D^d .
$$ {#eq-bit-weights}
:::

::: proof
Let $X_{10}, X_{01}, X_{11}$ be the generating functions of paths from In to each state. Reading the branches into each state from the table above:

$$
X_{10} = D^2N + N X_{01},\qquad X_{11} = DN X_{10} + DN X_{11},\qquad X_{01} = D X_{10} + D X_{11},\qquad T = D^2 X_{01} .
$$

The second equation gives $X_{11} = \frac{DN}{1 - DN}X_{10}$; then $X_{01} = DX_{10}\big(1 + \frac{DN}{1 - DN}\big) = \frac{D}{1 - DN}X_{10}$. Substituting in the first, $X_{10}\big(1 - \frac{DN}{1 - DN}\big) = D^2N$, so $X_{10} = \frac{D^2N(1 - DN)}{1 - 2DN}$ and $X_{01} = \frac{D^3N}{1 - 2DN}$. Finally $T = D^2X_{01}$, which is [[#eq-transfer]]. Differentiating with respect to $N$ and setting $N = 1$ gives $D^5/(1 - 2D)^2 = D^5\sum_{k\ge0}(k + 1)(2D)^k$, which is [[#eq-bit-weights]] with $d = k + 5$.
:::

For larger codes the same enumeration is done by computer. The $K = 7$ code with generators $171, 133$ has $d_{\text{free}} = 10$, with bit-weight coefficients $B_{10} = 36$, $B_{12} = 211$, $B_{14} = 1404$, $B_{16} = 11633$ (only even weights occur). Tables of the best codes for each $K$ were found by exhaustive search; for rate $\tfrac12$, $d_{\text{free}}$ grows roughly as $K + 2$ to $K + 4$ for small $K$.

::: warning Catastrophic encoders
Not every choice of generators is usable. The encoder with $g^{(1)} = 1 + D$, $g^{(2)} = 1 + D^2 = (1 + D)^2$ maps the infinite all-ones input $u(D) = 1/(1 + D)$ to the *finite* output $c^{(1)} = 1$, $c^{(2)} = 1 + D$, of weight $3$. A few channel errors can therefore make the decoder choose an input sequence that differs from the true one in infinitely many places: an unbounded error burst from a bounded noise event. Massey and Sain showed that a rate-$\tfrac1n$ encoder is **catastrophic** if and only if its generator polynomials have a common factor other than a power of $D$. In the state diagram, a catastrophic encoder has a loop of zero output weight other than the self-loop at state zero. Always check $\gcd\big(g^{(1)}, \dots, g^{(n)}\big) = 1$.
:::

## The Viterbi algorithm {#sec-viterbi}

Given the received sequence $\mathbf r$, the maximum-likelihood decoder chooses the code path $\mathbf c$ that maximises $p(\mathbf r\mid\mathbf c)$. For a memoryless channel the log-likelihood is a sum of **branch metrics** $\lambda_t = \log p(\mathbf r_t\mid\mathbf c_t)$ over the trellis branches. On a BSC, maximising it is the same as minimising the Hamming distance between $\mathbf r$ and $\mathbf c$; on an AWGN channel with BPSK ($0 \to +1$, $1 \to -1$) it is the same as minimising the squared Euclidean distance, or maximising the correlation $\sum_tr_tx_t$. The number of paths grows as $2^L$ for $L$ input bits, but most of them can be discarded early.

::: theorem Principle of optimality on the trellis {#thm-viterbi}
Let $\Gamma_t(s)$ be the best (smallest) accumulated metric of any path from the initial state to state $s$ at time $t$. Then

$$
\Gamma_{t+1}(s') = \min_{s \to s'}\big[\Gamma_t(s) + \lambda_t(s \to s')\big],
$$ {#eq-acs}

the minimum over the branches entering $s'$, and the overall maximum-likelihood path is obtained by keeping, for each state at each time, only the path (the **survivor**) that achieves $\Gamma_t(s)$.
:::

::: proof
Suppose the best path to $s'$ at time $t + 1$ passes through state $s$ at time $t$. Its first part, from the start to $s$, must be a best path to $s$: if a path with a smaller metric reached $s$, replacing the first part by it would give a better path to $s'$ (the metric is additive and the continuation from $s$ does not depend on how $s$ was reached — that is where the Markov structure of the encoder is used). Hence the best path to $s'$ is a survivor at $s$ extended by one branch, and [[#eq-acs]] finds it by comparing the candidates. At the end of a terminated trellis, the survivor at state $00$ is the maximum-likelihood path.
:::

::: algorithm Viterbi decoding {#alg-viterbi}
1. Initialise $\Gamma_0(00) = 0$ and $\Gamma_0(s) = \infty$ for the other states.
2. For each time $t$ and each state $s'$: **add** the branch metric to the metric of each predecessor, **compare** the candidates, **select** the smaller, and store which branch won (one bit per state per step).
3. After the last (tail) bit, **trace back** from state $00$ along the stored decisions to recover the input sequence.

For continuous streams, decisions are released after a fixed **traceback depth** of about $5K$ (more for punctured codes): by then all survivors have almost surely merged into a common history.
:::

The work per decoded bit is $2^m$ add–compare–select operations, independent of the message length: linear in time, exponential in the memory. That is why practical Viterbi decoders use $K \le 9$ ($256$ states); a $K = 7$ decoder runs at gigabits per second in modern silicon.

::: example Decoding two errors by hand {#ex-viterbi}
The code sequence $11\ 10\ 00\ 01\ 01\ 11$ of [[#ex-encode75]] is received over a BSC as $11\ 00\ 00\ 01\ 00\ 11$, with errors in the third and tenth bits. Decode it with the Viterbi algorithm (hard decisions, Hamming metric).
::: solution
The table shows the survivor metrics $\Gamma_t(s)$ after each received pair ($\infty$ for unreachable states). Each entry is the minimum, over the two branches entering the state, of the predecessor's metric plus the Hamming distance between the branch output and the received pair; outputs are read from the state table.

| after pair | received | $00$ | $10$ | $01$ | $11$ |
|---|---|---|---|---|---|
| $1$ | $11$ | $2$ | $0$ | $\infty$ | $\infty$ |
| $2$ | $00$ | $2$ | $4$ | $1$ | $1$ |
| $3$ | $00$ | $2$ | $1$ | $2$ | $2$ |
| $4$ | $01$ | $3$ | $3$ | $2$ | $1$ |
| $5$ | $00$ | $3$ | $2$ | $2$ | $2$ |
| $6$ | $11$ | $2$ | $3$ | $3$ | $3$ |

For instance, after pair $2$: state $01$ is reached only from $10$ with output $10$, distance $1$ from $00$, so $\Gamma = 0 + 1 = 1$; state $00$ is reached from $00$ (output $00$, distance $0$, total $2$) or from $01$ (unreachable), so $\Gamma = 2$. After pair $3$, state $10$ can be reached from $00$ (output $11$: $2 + 2 = 4$) or from $01$ (output $00$: $1 + 0 = 1$); the second survives.

The final metric at state $00$ is $2$ — the number of channel errors — and tracing back the stored decisions gives the state sequence $00 \to 10 \to 01 \to 10 \to 11 \to 01 \to 00$, i.e. the input $1\,0\,1\,1\,0\,0$: both errors corrected. They were far enough apart that each "error event" contained a single error; two errors within a few branches of each other could exceed the correcting power of a code with $d_{\text{free}} = 5$.
:::
:::

::: quiz
A Viterbi decoder for a $K = 7$, rate-$\tfrac12$ code decodes $10^8$ bits per second. How many add–compare–select operations per second does it perform, approximately?
- [ ] $7\times10^8$
- [x] $6.4\times10^9$
- [ ] $1.3\times10^{10}$, because each state has two branches
- [ ] It depends on the length of the message
::: solution
$m = K - 1 = 6$, so $2^6 = 64$ states, each needing one ACS (two additions, one comparison) per decoded bit: $64\times10^8 = 6.4\times10^9$ ACS per second. The work per bit is fixed; the message length affects only memory and latency. Hardware decoders perform the $64$ ACS operations in parallel.
:::
:::

### Soft decisions

The Viterbi algorithm accepts any additive metric, so it can use the demodulator's analog output directly. With BPSK over AWGN, the received value is $r = \pm\sqrt{E_c} + n$, and the branch metric is the correlation $\sum_jr^{(j)}x^{(j)}$ with the branch's $\pm1$ symbols. A practical decoder quantises $r$ to $3$ or $4$ bits, losing only about $0.2\,\mathrm{dB}$ compared with infinite precision; one-bit quantisation (hard decisions) loses about $2\,\mathrm{dB}$ — the data-processing inequality made concrete. Soft decisions are free in the Viterbi algorithm, which is the main reason convolutional codes displaced algebraic block codes on noisy radio links.

::: example When soft decisions save the day {#ex-soft}
The all-zero sequence is sent with the $(7, 5)$ code and BPSK ($0 \to +1$, $1 \to -1$). Over the first three branches the demodulator outputs (normalised so that a noiseless symbol is $\pm1$) are $(-0.2, -0.1)$, $(+1.1, +0.9)$, $(-0.3, +1.2)$. Compare the correct path $00\,00\,00$ with the competing path $11\,10\,11$ (input $100$, which returns to state $00$ after three branches) using hard and soft metrics.
::: solution
*Hard decisions.* Negative values become $1$: the received bits are $11\,00\,10$. The Hamming distance to $00\,00\,00$ is $3$; to $11\,10\,11$ it is $0 + 1 + 1 = 2$. The hard-decision decoder prefers the wrong path and makes an error event — three channel "errors" within the span of a weight-$5$ event exceed what $d_{\text{free}} = 5$ can correct.

*Soft decisions.* The correlation metric $\sum_tr_tx_t$ (larger is better) is, for the all-zero path ($x = +1$ throughout), $-0.2 - 0.1 + 1.1 + 0.9 - 0.3 + 1.2 = 2.6$. For the competitor, $x = (-1, -1, -1, +1, -1, -1)$, giving $0.2 + 0.1 - 1.1 + 0.9 + 0.3 - 1.2 = -0.8$. The soft decoder correctly prefers the all-zero path by a wide margin: the three symbols that crossed zero did so only slightly, while the symbols that favour the correct path are strong. Hard decisions threw away exactly that reliability information.
:::
:::

## Error performance {#sec-performance}

An error occurs when the decoder follows a wrong path that diverges from the correct one and later remerges — an **error event**. By linearity, assume the all-zero sequence was sent. A particular wrong path at Hamming distance $d$ is preferred to the correct one with **pairwise error probability**

$$
P_d = Q\left(\sqrt{\frac{2dRE_b}{N_0}}\right)\quad\text{(soft decisions, BPSK)},
$$ {#eq-pairwise}

because the two paths differ in $d$ code bits, each of energy $E_c = RE_b$, so their Euclidean distance is $2\sqrt{dE_c}$ and the noise must cover half of it, as in [[communication-systems/optimal-detection]]. With hard decisions and crossover probability $p = Q(\sqrt{2RE_b/N_0})$, $P_d$ is the probability that more than half of the $d$ differing bits are flipped (with ties counted as half).

::: theorem Union bound for convolutional codes {#thm-union-conv}
The bit error probability of maximum-likelihood decoding of a rate-$\tfrac kn$ convolutional code satisfies

$$
P_b \le \frac1k\sum_{d\ge d_{\text{free}}}B_dP_d ,
$$ {#eq-union-conv}

where $B_d$ is the total number of input ones on the error events of weight $d$, from the transfer function. At high $E_b/N_0$ the first term dominates, and with soft decisions

$$
P_b \approx \frac{B_{d_{\text{free}}}}{k}\,Q\left(\sqrt{2Rd_{\text{free}}\frac{E_b}{N_0}}\right), \qquad \text{asymptotic coding gain} = 10\log_{10}\big(Rd_{\text{free}}\big)\ \mathrm{dB} .
$$ {#eq-acg}
:::

::: proof
At any time, a bit error can be caused only by an error event that starts there or covers it. Bound the probability of the union of all error events starting at a given node by the sum of their pairwise probabilities, and weight each by the number of input bits in error, $b$; summing over events of weight $d$ gives $\sum_dB_dP_d$ errors per $k$ input bits. Comparing the argument of $Q$ with uncoded BPSK, $Q(\sqrt{2E_b/N_0})$, shows that the code multiplies the effective SNR by $Rd_{\text{free}}$.
:::

::: widget plot
f: log10(0.5*(1 - erf(sqrt(10^(x/10))))); log10(sum((d - 4)*2^(d - 5)*0.5*(1 - erf(sqrt(d*10^(x/10)/2))), d, 5, 40)); log10(36*0.5*(1 - erf(sqrt(10*10^(x/10)/2))) + 211*0.5*(1 - erf(sqrt(12*10^(x/10)/2))) + 1404*0.5*(1 - erf(sqrt(14*10^(x/10)/2))) + 11633*0.5*(1 - erf(sqrt(16*10^(x/10)/2))))
x: 2, 10
y: -8, 0
hlines: -5
labels: \text{uncoded BPSK}; (7,5),\ K=3; (171,133),\ K=7
caption: Union bounds [[#eq-union-conv]] on the bit error rate ($\log_{10}$) of soft-decision Viterbi decoding of two rate-$\tfrac12$ codes, against $E_b/N_0$ in dB, with uncoded BPSK for comparison. The bounds are loose above about $10^{-2}$ but tight at low error rates. At $10^{-5}$ (dashed) the $K = 3$ code needs about $5.9\,\mathrm{dB}$ and the $K = 7$ code about $4.2\,\mathrm{dB}$, against $9.6\,\mathrm{dB}$ uncoded — gains of $3.7$ and $5.4\,\mathrm{dB}$, approaching the asymptotic $4.0$ and $7.0\,\mathrm{dB}$ as the error rate falls.
:::

::: example Choosing a convolutional code for a link {#ex-conv-design}
A satellite modem must deliver a bit error rate of $10^{-5}$ with BPSK at $E_b/N_0 \le 5\,\mathrm{dB}$, at rate $\tfrac12$. Compare the $K = 3$ and $K = 7$ codes with soft and hard decisions and choose a design.
::: solution
Asymptotic gains: $K = 3$, $10\log_{10}(\tfrac12\times5) = 4.0\,\mathrm{dB}$; $K = 7$, $10\log_{10}(\tfrac12\times10) = 7.0\,\mathrm{dB}$. At $10^{-5}$ the full union bounds give the required $E_b/N_0$:

| code | soft decisions | hard decisions |
|---|---|---|
| $(7, 5)$, $K = 3$, $4$ states | $5.9\,\mathrm{dB}$ | $8.1\,\mathrm{dB}$ |
| $(171, 133)$, $K = 7$, $64$ states | $4.2\,\mathrm{dB}$ | $6.5\,\mathrm{dB}$ |

(The hard-decision column uses [[#eq-union-conv]] with the BSC pairwise probabilities.) Only the $K = 7$ code with soft decisions meets the $5\,\mathrm{dB}$ specification, with $0.8\,\mathrm{dB}$ to spare — enough to absorb the $0.2\,\mathrm{dB}$ of $3$-bit quantisation and a few tenths for imperfect synchronisation. Its decoder needs $64$ ACS units and a traceback depth of about $35$–$50$ steps; the decoding delay of a few dozen bits is negligible for a satellite modem. Hard decisions would cost about $2.3\,\mathrm{dB}$ and fail the specification, and the $K = 3$ code is too weak even with soft decisions.
:::
:::

## Practical convolutional coding {#sec-practice}

**Termination.** Appending $m$ zeros returns the encoder to state $00$, so the decoder knows the final state, at a rate cost of $m/(L + m)$ for $L$ data bits. **Tail-biting** avoids the cost for short packets: the encoder starts in the state its last $m$ data bits will leave it in, and the decoder searches over the unknown, but equal, start and end states (LTE control channels do this).

**Puncturing.** Deleting code bits in a periodic pattern raises the rate without changing the encoder or decoder. From the rate-$\tfrac12$ code, deleting one of every four output bits gives rate $\tfrac23$, and deleting two of every six gives rate $\tfrac34$; the decoder inserts zero-metric "erasures" at the deleted positions and runs the ordinary Viterbi algorithm. IEEE 802.11a/g/n derives rates $\tfrac23$ and $\tfrac34$ (and $\tfrac56$ in 802.11n) in exactly this way from the $K = 7$ code, so a single decoder serves every data rate. Punctured codes have smaller $d_{\text{free}}$ — $6$ for rate $\tfrac23$ and $5$ for rate $\tfrac34$ for the 802.11 patterns — trading power efficiency for bandwidth efficiency.

**Recursive systematic encoders.** Feeding back part of the register, $c^{(1)} = u$ and $c^{(2)} = u\,g^{(2)}(D)/g^{(1)}(D)$, gives a **recursive systematic convolutional** (RSC) code with the same set of code sequences (hence the same $d_{\text{free}}$) as the feedforward code with generators $g^{(1)}, g^{(2)}$, but a different mapping of inputs to outputs: a single input $1$ now produces an infinite-weight output, so low-weight code sequences need inputs of weight at least two. This property is what makes RSC encoders the right components for turbo codes in [[information-theory/modern-codes]].

**Concatenation.** The errors left by a Viterbi decoder come in bursts (an error event spans several bits). An outer Reed–Solomon code over bytes, with an interleaver between the two, cleans them up: Forney's **concatenated coding** of 1966. The CCSDS deep-space standard — $K = 7$ inner code and $\mathrm{RS}(255, 223)$ outer code — reaches $10^{-5}$ near $2.5\,\mathrm{dB}$, and DVB-S used the same structure with $\mathrm{RS}(204, 188)$.

::: application Where convolutional codes run
The NASA $K = 7$ rate-$\tfrac12$ code flew on Voyager (with the Reed–Solomon outer code added for the Uranus and Neptune encounters) and became the CCSDS standard. GSM speech channels use a $K = 5$ rate-$\tfrac12$ code; the IS-95 CDMA system used $K = 9$ codes of rates $\tfrac12$ and $\tfrac13$; Wi-Fi (802.11a/g/n/ac) uses the punctured $K = 7$ code for its basic mode; and LTE uses a tail-biting $K = 7$ rate-$\tfrac13$ code for control information. The Viterbi algorithm itself spread far beyond coding: it equalises intersymbol interference in GSM receivers and hard-disk read channels (maximum-likelihood sequence estimation), decodes trellis-coded modulation in telephone modems, and aligns sequences in speech recognition and bioinformatics.
:::

## Where this leads {#sec-leads}

The Viterbi algorithm finds the most likely *sequence*; the BCJR algorithm (Bahl, Cocke, Jelinek and Raviv, 1974) runs forward and backward recursions over the same trellis to compute the probability of each individual *bit*. Those **soft outputs** are what [[information-theory/modern-codes]] needs: turbo codes concatenate two recursive systematic convolutional encoders through an interleaver and decode them by exchanging BCJR outputs. LDPC codes replace the trellis by a sparse graph, and their message-passing decoder is the same sum–product principle applied to a different graph. In communication receivers, trellis decoding also handles channel memory: the equalisers of [[communication-systems/wireless-communication]] are Viterbi decoders whose "encoder" is the multipath channel.

::: history
Peter Elias introduced convolutional codes in 1955 and showed that, like block codes, they can achieve capacity. John Wozencraft proposed sequential decoding in 1957, and Robert Fano's 1963 sequential algorithm decoded long-constraint-length codes; a sequentially decoded $K = 32$ code flew on Pioneer 9 in 1968. Andrew Viterbi published his algorithm in 1967 as a tool for bounding error probabilities; Jim Omura (1969) recognised it as dynamic programming, and David Forney showed in 1973 that it is a maximum-likelihood decoder and popularised the trellis. James Massey and Michael Sain characterised catastrophic encoders in 1968, and Jerrold Heller and Irwin Jacobs demonstrated in 1971 that short-constraint-length codes with soft-decision Viterbi decoding were practical; the Voyager probes, launched in 1977, carried the $K = 7$ code. Viterbi co-founded Linkabit in 1968 and Qualcomm in 1985. Gottfried Ungerboeck's trellis-coded modulation (1982) combined convolutional coding with signal constellations, and Lalit Bahl, John Cocke, Frederick Jelinek and Josef Raviv published the symbol-by-symbol MAP (BCJR) decoder in 1974.
:::

::: summary
- A rate-$\tfrac1n$ convolutional encoder is a shift register of memory $m$ with $n$ XOR trees; each output stream is the input convolved with a generator, $c^{(j)}(D) = u(D)g^{(j)}(D)$, and $K = m + 1$ is the constraint length.
- The encoder is a $2^m$-state machine; the trellis unrolls it in time, and code sequences are paths through it.
- The free distance $d_{\text{free}}$ is the least weight of a path leaving and returning to the zero state; the transfer function (state equations of the split diagram) gives the full spectrum, e.g. $T = D^5N/(1 - 2DN)$ for the $(7, 5)$ code.
- Encoders whose generators share a non-trivial common factor are catastrophic and must be avoided.
- The Viterbi algorithm keeps one survivor per state and performs $2^m$ add–compare–select operations per bit; by the principle of optimality it finds the maximum-likelihood path, with Hamming metrics for hard decisions and correlation metrics for soft decisions.
- The union bound $P_b \le \tfrac1k\sum_dB_dQ(\sqrt{2dRE_b/N_0})$ gives an asymptotic coding gain $10\log_{10}(Rd_{\text{free}})$; the $K = 7$ NASA code gains about $5.4\,\mathrm{dB}$ at $10^{-5}$, and hard decisions cost about $2\,\mathrm{dB}$.
- Puncturing gives higher rates from one decoder; recursive systematic encoders and soft-output trellis decoders lead to turbo codes.
:::

## Exercises

::: exercise Encoding {level=1}
Encode the input $1101$ followed by two tail zeros with the $(7, 5)$ encoder.
::: solution
Using the state table, starting in $00$: input $1$ → output $11$, state $10$; input $1$ → $01$, state $11$; input $0$ → $01$, state $01$; input $1$ → $00$, state $10$; input $0$ → $10$, state $01$; input $0$ → $11$, state $00$. Code sequence: $11\ 01\ 01\ 00\ 10\ 11$. Check with $u(D) = 1 + D + D^3$: $u(1 + D + D^2) = 1 + D + D^3 + D + D^2 + D^4 + D^2 + D^3 + D^5 = 1 + D^4 + D^5$ (first stream $1,0,0,0,1,1$) and $u(1 + D^2) = 1 + D + D^2 + D^5$ (second stream $1,1,1,0,0,1$), which interleave to the same sequence.
:::
:::

::: exercise Number of states and coding gain {level=1 check="10*log10(0.5*10)"}
How many states does the trellis of the $K = 7$, rate-$\tfrac12$ code with $d_{\text{free}} = 10$ have? What is its asymptotic soft-decision coding gain in dB?
::: solution
$m = 6$, so $2^6 = 64$ states. The asymptotic coding gain is $10\log_{10}(Rd_{\text{free}}) = 10\log_{10}5 = 6.99\,\mathrm{dB}$.
:::
:::

::: exercise Catastrophic or not? {level=1}
Which of these rate-$\tfrac12$ encoders are catastrophic: (a) $g = (1 + D + D^2,\ 1 + D^2)$; (b) $g = (1 + D,\ 1 + D + D^2 + D^3)$; (c) $g = (1 + D^2,\ 1 + D + D^2)$?
::: solution
(a) $1 + D + D^2$ is irreducible and does not divide $1 + D^2 = (1 + D)^2$: no common factor, not catastrophic (it is the $(7, 5)$ code). (b) $1 + D + D^2 + D^3 = (1 + D)(1 + D^2) = (1 + D)^3$ shares the factor $1 + D$ with the first generator: catastrophic. (c) The same polynomials as (a) in the other order: not catastrophic.
:::
:::

::: exercise Spectrum from the transfer function {level=2 check="(7-4)*2^(7-5)"}
From [[#eq-transfer]] and [[#eq-bit-weights]], how many error events of weight $7$ does the $(7, 5)$ code have, and what is their total number of input ones, $B_7$? List the input sequences of the weight-$6$ events.
::: solution
$A_7 = 2^{7-5} = 4$ events and $B_7 = (7 - 4)\cdot2^{2} = 12$ input ones. The weight-$6$ events ($A_6 = 2$, $B_6 = 4$) come from the inputs $1100$ (path $00 \to 10 \to 11 \to 01 \to 00$, outputs $11\,01\,01\,11$) and $10100$ (path $00 \to 10 \to 01 \to 10 \to 01 \to 00$, outputs $11\,10\,00\,10\,11$), each with two input ones.
:::
:::

::: exercise Pairwise error probability {level=2 check="0.5*(1-erf(sqrt(2.5*10^0.4)))"}
For the $(7, 5)$ code with soft decisions and BPSK at $E_b/N_0 = 4\,\mathrm{dB}$, compute the pairwise error probability $P_5$ of the minimum-weight error event.
::: solution
$P_5 = Q\big(\sqrt{2\times5\times\tfrac12\times10^{0.4}}\big) = Q(\sqrt{12.56}) = Q(3.54) = 2.0\times10^{-4}$. The union bound at $4\,\mathrm{dB}$ adds the other weights, $\sum_dB_dP_d \approx 9\times10^{-4}$, five times the first term, because $B_d$ doubles with each unit of $d$ while $P_d$ falls only by a factor of about $3$ at this SNR.
:::
:::

::: exercise A Viterbi step {level=2}
In [[#ex-viterbi]], verify the metrics after the fourth received pair ($01$), and state which branch survives into each state.
::: solution
Metrics after pair $3$: $00: 2$, $10: 1$, $01: 2$, $11: 2$. Into $00$: from $00$ (output $00$, distance $1$ from $01$) gives $3$; from $01$ (output $11$, distance $1$) gives $3$ — a tie, broken arbitrarily: $\Gamma = 3$. Into $10$: from $00$ (output $11$, distance $1$): $3$; from $01$ (output $00$, distance $1$): $3$ — again a tie, $\Gamma = 3$. Into $01$: from $10$ (output $10$, distance $2$): $3$; from $11$ (output $01$, distance $0$): $2$ — survivor from $11$, $\Gamma = 2$. Into $11$: from $10$ (output $01$, distance $0$): $1$; from $11$ (output $10$, distance $2$): $4$ — survivor from $10$, $\Gamma = 1$. Ties do not affect the result here because the tied paths are later discarded.
:::
:::

::: exercise Rate after termination and puncturing {level=2 check="100/(2*106)*4/3"}
A packet of $100$ data bits is encoded with the $K = 7$ rate-$\tfrac12$ code, terminated with zeros, and then punctured to rate $\tfrac23$ (one of every four code bits deleted). What is the overall rate?
::: solution
Termination adds $m = 6$ zeros: $106$ input bits give $212$ code bits. Puncturing keeps three of every four: $159$ bits. The overall rate is $100/159 = 0.629$ (the expression $\tfrac{100}{212}\cdot\tfrac43$), slightly below $\tfrac23$ because of the tail.
:::
:::

::: exercise Free distance of a rate-1/3 code {level=3 check="8"}
::: hint
Draw the split state diagram with branch weights equal to the output weight, and find the shortest path; the path for input $1\,0\,0$ is a good first candidate.
:::
The rate-$\tfrac13$, $K = 3$ code has generators $(7, 7, 5)$ in octal. Find its free distance and its asymptotic coding gain.
::: solution
Each branch weight is the total weight of the three output bits. The input $100$ passes the register patterns $(1,0,0)$, $(0,1,0)$, $(0,0,1)$ (current bit first); the generators $111, 111, 101$ give outputs $111$, $110$, $111$, of total weight $8$. The input $1100$ gives patterns $(1,0,0)$, $(1,1,0)$, $(0,1,1)$, $(0,0,1)$ and outputs $111$, $001$, $001$, $111$, weight $8$ again. Every other detour passes through more branches of weight at least $1$ (the loop at state $11$ has output $001$, weight $1$, and the branch $01 \to 10$ has output $110$, weight $2$), so it is heavier. No path has weight below $8$, so $d_{\text{free}} = 8$, and the coding gain is $10\log_{10}(\tfrac13\times8) = 4.26\,\mathrm{dB}$, slightly better than the rate-$\tfrac12$ $(7, 5)$ code's $3.98\,\mathrm{dB}$, at the cost of $50\,\%$ more bandwidth.
:::
:::

::: exercise Recursive systematic form {level=3}
::: hint
Write $c^{(2)}(D) = u(D)(1 + D^2)/(1 + D + D^2)$ and look for inputs $u(D)$ that make it a polynomial.
:::
For the RSC encoder with $c^{(1)} = u$ and $c^{(2)} = u\,(1 + D^2)/(1 + D + D^2)$, show that an input of weight $1$ produces an output of infinite weight, find the lowest-weight input that returns the encoder to the zero state, and compute the weight of the resulting code sequence.
::: solution
For $u = 1$, $c^{(2)} = (1 + D^2)/(1 + D + D^2)$, a non-terminating power series (the feedback register never returns to zero, cycling with period $3$), so the parity stream has infinite weight. The encoder returns to zero exactly when $c^{(2)}$ is a polynomial, i.e. when $(1 + D + D^2) \mid u(D)$. The lowest-weight such inputs are $u = 1 + D + D^2$ (weight $3$) and $u = 1 + D^3 = (1 + D)(1 + D + D^2)$ (weight $2$). For $u = 1 + D^3$, $c^{(2)} = (1 + D)(1 + D^2) = 1 + D + D^2 + D^3$, weight $4$; the total weight is $2 + 4 = 6$. For $u = 1 + D + D^2$, $c^{(2)} = 1 + D^2$, total weight $3 + 2 = 5 = d_{\text{free}}$, the same as the feedforward code, as it must be. The key property for turbo codes is that weight-$1$ inputs never give finite-weight outputs, so an interleaver that separates the two ones of a weight-$2$ input can make low-weight codewords rare.
:::
:::

::: exercise Hard versus soft decisions {level=3}
::: hint
For $d = 5$ on a BSC, the pairwise error probability is the probability of three or more errors in five bits.
:::
For the $(7, 5)$ code at $E_b/N_0 = 6\,\mathrm{dB}$, compute the first term of the union bound with hard decisions and with soft decisions. By how many decibels would the soft-decision first term have to be shifted to match the hard-decision one?
::: solution
$E_b/N_0 = 3.98$; $E_c/N_0 = 1.99$. Hard: $p = Q(\sqrt{3.98}) = Q(1.995) = 0.0230$; $P_5 = \binom53p^3(1 - p)^2 + \binom54p^4(1 - p) + p^5 = 1.16\times10^{-4} + 1.4\times10^{-6} + \dots = 1.17\times10^{-4}$. Soft: $P_5 = Q(\sqrt{2\times5\times1.99}) = Q(4.46) = 4.1\times10^{-6}$. The hard-decision term is about $28$ times larger. The soft-decision term reaches $1.17\times10^{-4}$ at $Q(\sqrt{10E_c/N_0}) = 1.17\times10^{-4}$, i.e. $\sqrt{10E_c/N_0} = 3.68$, $E_c/N_0 = 1.35$, which is $1.7\,\mathrm{dB}$ below $1.99$. So at this SNR hard decisions cost about $1.7\,\mathrm{dB}$ in the leading term; at lower error rates the loss approaches the familiar $2\,\mathrm{dB}$ (asymptotically $3\,\mathrm{dB}$ for the distance term alone, offset by the binomial coefficients).
:::
:::
