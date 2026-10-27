Recurrent networks process a sequence one step at a time, which makes their training slow on parallel hardware, and their nonlinear state update makes long-range learning hard ([[sequence-models/long-range-dependencies]]). Attention avoids both problems but pays with a cost that grows quadratically in the length of the context, and with a memory — the key–value cache — that grows linearly during generation ([[transformers/attention-complexity]]). This chapter is about two other families of sequence models, which aim for the training parallelism of attention and the constant-size state of a recurrent network.

**Temporal convolutional networks** apply causal convolutions, stacked with exponentially growing dilations, so that a few layers see thousands of steps back. **Linear recurrences** and **state-space models** (SSMs) drop the nonlinearity from the recurrence. That single change makes the recurrence equivalent to a convolution — the central theorem of this chapter — so it can be trained in parallel and run as an RNN at generation time. S4 made such models trainable on very long sequences; **Mamba** made their parameters depend on the input, recovering the content-based selection that a time-invariant model lacks; and linear attention, RWKV and related models turn out to be members of the same family. We implement the duality, a parallel scan and a selective recurrence in plain Python, and end with what is and is not known, as of 2026, about how these models compare with Transformers.

## Temporal convolutions {#sec-tcn}

A one-dimensional convolution ([[neural-networks/convolutional-networks#def-conv]]) slides a kernel of $k$ taps along the sequence. For sequence modelling it must be **causal**: the output at time $t$ may depend only on inputs at times $\le t$, so that it can serve as a language model.

::: definition Causal dilated convolution {#def-causal-conv}
A **causal convolution** with kernel size $k$ and **dilation** $d$ maps a sequence $\mathbf{x}_1, \dots, \mathbf{x}_T\in\R^{c}$ to

$$
\mathbf{y}_t = \sum_{i=0}^{k-1}W_i\,\mathbf{x}_{t - d\,i} + \mathbf{b},
$$

with $W_i\in\R^{c'\times c}$ and $\mathbf{x}_s = \mathbf{0}$ for $s\le0$ (left padding). A **temporal convolutional network** (TCN) stacks such layers with nonlinearities and residual connections, typically with dilations $1, 2, 4, \dots, 2^{L-1}$.
:::

::: proposition Receptive field of a dilated stack {#prop-receptive}
A stack of $L$ causal convolutions with kernel size $k$ and dilations $d_1, \dots, d_L$ has a receptive field of $1 + (k - 1)\sum_{\ell=1}^Ld_\ell$ time steps. With $d_\ell = 2^{\ell-1}$ this is $1 + (k - 1)(2^L - 1)$, exponential in depth; without dilation ($d_\ell = 1$) it is $1 + (k - 1)L$, linear in depth.
:::

::: proof
By induction on $L$. One layer with dilation $d_1$ reads $\mathbf{x}_{t-d_1(k-1)}, \dots, \mathbf{x}_t$, a span of $1 + (k - 1)d_1$ steps. If the output of the first $L - 1$ layers at time $s$ depends on the inputs at times $s - R_{L-1} + 1, \dots, s$, then layer $L$ combines those outputs at times $t, t - d_L, \dots, t - (k - 1)d_L$, so its output depends on inputs from $t - (k - 1)d_L - R_{L-1} + 1$ to $t$, a span of $R_L = R_{L-1} + (k - 1)d_L$. Unrolling gives $R_L = 1 + (k - 1)\sum_\ell d_\ell$, and $\sum_{\ell=1}^L2^{\ell-1} = 2^L - 1$.
:::

::: widget graph
nodes: x1@0,0; x2@1,0; x3@2,0; x4@3,0; x5@4,0; x6@5,0; x7@6,0; x8@7,0; a2@1,1; a4@3,1; a6@5,1; a8@7,1; b4@3,2; b8@7,2; c8@7,3
edges: c8>b8; c8>b4; b8>a8; b8>a6; b4>a4; b4>a2; a8>x8; a8>x7; a6>x6; a6>x5; a4>x4; a4>x3; a2>x2; a2>x1
algorithm: bfs
start: c8
caption: The dependencies of one output $c_8$ in a stack of three causal convolutions with kernel size $2$ and dilations $1$, $2$, $4$ (layers $a$, $b$, $c$; only the units that $c_8$ depends on are drawn, and arrows point from a unit to the inputs it reads). Breadth-first search from $c_8$ reaches all eight inputs at depth $3$: the receptive field is $1 + (2 - 1)(2^3 - 1) = 8$, as [[#prop-receptive]] says. Without dilation, three layers would reach only four inputs back.
:::

**WaveNet** (van den Oord et al., 2016) generated raw audio this way — $16{,}000$ samples per second, each predicted by a softmax over $256$ quantised amplitude levels — with blocks of ten layers of dilations $1, 2, \dots, 512$ repeated several times, gated activations $\tanh(W_f * \mathbf{x})\odot\sigma(W_g * \mathbf{x})$ (an LSTM-style gate in a convolution), and residual and skip connections. In text, ByteNet (Kalchbrenner et al., 2016) and the convolutional sequence-to-sequence model of Gehring et al. (2017) applied dilated or stacked convolutions to translation, and Bai, Kolter and Koltun (2018) found that a generic TCN matched or outperformed LSTMs and GRUs of similar size on a broad set of sequence-modelling benchmarks, with longer effective memory.

::: example The receptive field of WaveNet {#ex-wavenet}
A block of ten layers with kernel size $2$ and dilations $1, 2, \dots, 512$ is repeated three times. What is the receptive field in samples, and in milliseconds at $16$ kHz?
::: solution
One block: $1 + (2 - 1)(1 + 2 + \dots + 512) = 1 + 1{,}023 = 1{,}024$ samples. Three blocks add $3\cdot1{,}023$ to the initial $1$: $3{,}070$ samples, $3{,}070/16{,}000 = 0.19$ s. Thirty layers see $192$ ms of audio; an undilated stack of thirty layers would see $31$ samples, about $2$ ms.
:::
:::

Convolutions train in parallel — every output position is computed at once — but their memory is bounded by the receptive field, fixed by the architecture, and generation is still step by step: each new sample requires running the stack at one new position (cheap if the intermediate activations are cached). The models of the rest of the chapter keep the parallel training while letting the memory be, in principle, unbounded.

## Linear recurrences {#sec-linear}

The nonlinearity inside $\tanh(W_{hh}\mathbf{h}_{t-1} + W_{xh}\mathbf{x}_t)$ is what makes an RNN sequential: $\mathbf{h}_t$ cannot be computed without $\mathbf{h}_{t-1}$. Remove it.

::: definition Linear recurrent layer {#def-linear-rnn}
A **linear recurrent layer** with state size $N$ maps inputs $u_1, \dots, u_T$ to outputs $y_1, \dots, y_T$ by

$$
\mathbf{x}_t = \bar A\,\mathbf{x}_{t-1} + \bar B\,u_t,\qquad y_t = C\,\mathbf{x}_t + D\,u_t,\qquad \mathbf{x}_0 = \mathbf{0},
$$ {#eq-linear-rnn}

with $\bar A\in\R^{N\times N}$ (or $\C^{N\times N}$), $\bar B\in\R^{N\times1}$, $C\in\R^{1\times N}$, $D\in\R$, for a single input channel; a layer for $c$ channels applies $c$ such systems (or one with matrix-valued $\bar B$, $C$). It is **time-invariant** (LTI) if $\bar A, \bar B, C, D$ do not depend on $t$. Nonlinearities and channel mixing are applied *between* such layers, never inside the recurrence.
:::

A stack of linear recurrent layers separated by position-wise MLPs is still a nonlinear sequence model — just as a convolutional network is nonlinear although each convolution is linear. The linearity is confined to the time direction, and it buys three things.

::: theorem Recurrence–convolution duality {#thm-duality}
For an LTI layer [[#eq-linear-rnn]], the output is the causal convolution of the input with the kernel $\bar K = (\bar K_0, \bar K_1, \dots)$, $\bar K_j = C\bar A^j\bar B$:

$$
y_t = \sum_{j=0}^{t-1}\bar K_j\,u_{t-j} + D\,u_t = \sum_{j=0}^{t-1}C\bar A^j\bar B\,u_{t-j} + D\,u_t .
$$ {#eq-duality}
:::

::: proof
We show by induction that $\mathbf{x}_t = \sum_{j=0}^{t-1}\bar A^j\bar Bu_{t-j}$. For $t = 1$, $\mathbf{x}_1 = \bar A\mathbf{x}_0 + \bar Bu_1 = \bar Bu_1$, the sum with the single term $j = 0$. If it holds for $t$, then

$$
\mathbf{x}_{t+1} = \bar A\sum_{j=0}^{t-1}\bar A^j\bar Bu_{t-j} + \bar Bu_{t+1} = \sum_{j=0}^{t-1}\bar A^{j+1}\bar Bu_{t-j} + \bar A^0\bar Bu_{t+1} = \sum_{j'=0}^{t}\bar A^{j'}\bar Bu_{t+1-j'},
$$

substituting $j' = j + 1$ in the sum and identifying the last term as $j' = 0$. Applying $C$ and adding $Du_t$ gives [[#eq-duality]]. Time-invariance is essential: each power $\bar A^j$ is the same matrix wherever the window sits, which is what makes $\bar K$ a single kernel.
:::

The theorem gives two ways to compute the same function. **As a recurrence**, the layer costs $O(N^2)$ per step ($O(N)$ for diagonal $\bar A$) and needs only the current state — ideal for generation, one token at a time, with memory that does not grow with the context. **As a convolution**, all outputs are computed at once: build the kernel $\bar K$ of length $T$, then convolve, in $O(T\log T)$ with the fast Fourier transform — ideal for training on whole sequences in parallel. The third benefit is that linear dynamics can be *analysed*: memory, stability and time scales are properties of the eigenvalues of $\bar A$.

::: example Both ways by hand {#ex-duality}
A scalar LTI layer has $\bar a = 0.5$, $\bar b = 1$, $c = 1$, $D = 0$. Compute $y_1, y_2, y_3$ for $u = (1, 2, 0)$ by the recurrence and by the convolution.
::: solution
Recurrence: $x_1 = 1$, $x_2 = 0.5\cdot1 + 2 = 2.5$, $x_3 = 0.5\cdot2.5 + 0 = 1.25$, so $y = (1, 2.5, 1.25)$. Kernel: $\bar K_j = 0.5^j$, i.e. $(1, 0.5, 0.25)$. Convolution: $y_1 = 1\cdot1 = 1$; $y_2 = 1\cdot2 + 0.5\cdot1 = 2.5$; $y_3 = 1\cdot0 + 0.5\cdot2 + 0.25\cdot1 = 1.25$. The same numbers: the recurrence stores in $x_t$ exactly the weighted sum that the convolution computes explicitly.
:::
:::

### Parallel scans {#sec-scan}

Even without the convolution form — and the time-varying models below have none — a linear recurrence can be computed in parallel, because composing affine maps is associative.

::: proposition Linear recurrences are associative scans {#prop-scan}
Represent step $t$ of $\mathbf{x}_t = \bar A_t\mathbf{x}_{t-1} + \mathbf{b}_t$ by the pair $e_t = (\bar A_t, \mathbf{b}_t)$, meaning the map $\mathbf{x}\mapsto\bar A_t\mathbf{x} + \mathbf{b}_t$, and define $(A_1, \mathbf{b}_1)\bullet(A_2, \mathbf{b}_2) = (A_2A_1, A_2\mathbf{b}_1 + \mathbf{b}_2)$ ("apply the first, then the second"). Then $\bullet$ is associative, and $\mathbf{x}_t$ is the second component of $e_1\bullet e_2\bullet\dots\bullet e_t$ (with $\mathbf{x}_0 = \mathbf{0}$). Consequently all $T$ states can be computed by a parallel prefix scan in $O(\log T)$ sequential rounds.
:::

::: proof
$(A_1, \mathbf{b}_1)\bullet(A_2, \mathbf{b}_2)$ represents the composition $\mathbf{x}\mapsto A_2(A_1\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = A_2A_1\mathbf{x} + (A_2\mathbf{b}_1 + \mathbf{b}_2)$, and composition of functions is associative, so $\bullet$ is too. Applying the composed map $e_1\bullet\dots\bullet e_t$ to $\mathbf{x}_0 = \mathbf{0}$ gives its translation part, which is $\mathbf{x}_t$ by definition of the recurrence. For an associative operator, all prefix products can be computed by recursive doubling — in round $r$, combine each element with the one $2^{r-1}$ positions earlier — in $\lceil\log_2T\rceil$ rounds, each fully parallel (Blelloch, 1990, gives a work-efficient version with $O(T)$ total operations).
:::

Martin and Cundy (2018) used this to train linear recurrent networks in parallel over the sequence length, and it is how time-varying SSMs such as S5 and Mamba are trained. For a diagonal $\bar A_t$ each combination costs $O(N)$, the same as one sequential step.

## State-space models {#sec-ssm}

How should $\bar A$, $\bar B$ and $C$ be chosen? A random linear recurrence either forgets in a few steps or blows up. State-space models obtain them by discretising a continuous-time linear system, which gives the parameters an interpretation and a principled initialisation.

::: definition State-space model {#def-ssm}
A (continuous-time, linear) **state-space model** maps an input signal $u(t)$ to an output $y(t)$ through a state $\mathbf{x}(t)\in\C^N$:

$$
\mathbf{x}'(t) = A\mathbf{x}(t) + Bu(t),\qquad y(t) = C\mathbf{x}(t) + Du(t).
$$ {#eq-ssm}

Given a **step size** $\Delta > 0$, the **zero-order hold** (ZOH) discretisation, which assumes $u$ constant on each interval of length $\Delta$, is

$$
\bar A = e^{\Delta A},\qquad \bar B = (\Delta A)^{-1}\big(e^{\Delta A} - I\big)\Delta B ,
$$ {#eq-zoh}

and the **bilinear** discretisation is $\bar A = (I - \frac\Delta2A)^{-1}(I + \frac\Delta2A)$, $\bar B = (I - \frac\Delta2A)^{-1}\Delta B$. Either gives a linear recurrent layer [[#eq-linear-rnn]] with sample $t$ standing for time $t\Delta$.
:::

::: proposition Zero-order hold is exact, and stability {#prop-zoh}
(1) If $u$ is constant, equal to $u_t$, on $(t\Delta - \Delta, t\Delta]$, then the solution of [[#eq-ssm]] satisfies $\mathbf{x}(t\Delta) = \bar A\,\mathbf{x}(t\Delta - \Delta) + \bar Bu_t$ exactly, with $\bar A, \bar B$ from [[#eq-zoh]] ($A$ invertible). (2) For diagonal $A = \operatorname{diag}(\lambda_1, \dots, \lambda_N)$, $\lvert\bar a_n\rvert = e^{\Delta\operatorname{Re}\lambda_n}$, so the discrete recurrence is stable ($\lvert\bar a_n\rvert < 1$) for every $\Delta > 0$ if and only if $\operatorname{Re}\lambda_n < 0$, and mode $n$ forgets with time constant $1/(\Delta\lvert\operatorname{Re}\lambda_n\rvert)$ steps.
:::

::: proof
(1) By variation of constants, $\mathbf{x}(s + \Delta) = e^{\Delta A}\mathbf{x}(s) + \int_0^\Delta e^{(\Delta - \tau)A}B\,u(s + \tau)\,d\tau$. With $u = u_t$ constant the integral is $\big(\int_0^\Delta e^{\sigma A}d\sigma\big)Bu_t = A^{-1}(e^{\Delta A} - I)Bu_t$, which equals $(\Delta A)^{-1}(e^{\Delta A} - I)\Delta Bu_t$. (2) $e^{\Delta\lambda} = e^{\Delta\operatorname{Re}\lambda}e^{i\Delta\operatorname{Im}\lambda}$ has modulus $e^{\Delta\operatorname{Re}\lambda}$, below $1$ for all $\Delta > 0$ exactly when $\operatorname{Re}\lambda < 0$. After $k$ steps a mode is multiplied by $e^{-k\Delta\lvert\operatorname{Re}\lambda\rvert}$, which falls to $e^{-1}$ at $k = 1/(\Delta\lvert\operatorname{Re}\lambda\rvert)$.
:::

The step size is therefore a time scale: a small $\Delta$ makes a mode remember for many steps, a large $\Delta$ makes it forget quickly. The imaginary part of $\lambda$ makes the mode oscillate, so that the kernel $\bar K_j = \sum_nc_n\bar a_n^j\bar b_n$ is a sum of damped oscillations — a basis in which long, smooth kernels can be expressed with few parameters.

::: example Discretising one mode {#ex-zoh}
For $\lambda = -1$, $B = 1$ and $\Delta = 0.1$, compute $\bar a$ and $\bar b$ by ZOH and by the bilinear rule. How many steps does this mode remember?
::: solution
ZOH: $\bar a = e^{-0.1} = 0.904837$, $\bar b = (e^{-0.1} - 1)/(-1) = 0.095163$. Bilinear: $\bar a = (1 - 0.05)/(1 + 0.05) = 0.904762$, $\bar b = 0.1/1.05 = 0.095238$. The two agree to four digits, as they must for small $\Delta\lvert\lambda\rvert$. In both, $\bar a + \bar b\approx1$: a constant input $u$ drives the state to $u$, so the mode is an exponential moving average with time constant $1/(\Delta\lvert\lambda\rvert) = 10$ steps.
:::
:::

::: widget plot
f: exp(d*a*x)*cos(d*w*x)
x: 0, 200
y: -1, 1
sliders: a=-0.5:-3:0:0.05; w=3.14:0:20:0.01; d=0.1:0.005:1:0.005
hlines: 0
caption: The contribution of one diagonal mode to the SSM kernel, $\operatorname{Re}\,\bar a^j = e^{\Delta\operatorname{Re}\lambda\,j}\cos(\Delta\operatorname{Im}\lambda\,j)$, against the lag $j$, for $\lambda = a + iw$ and step $\Delta = d$. The real part sets how fast the mode forgets, the imaginary part how fast it oscillates, and the step size stretches or compresses both. A layer's kernel is a learned linear combination of $N$ such modes; making $\Delta$ small extends the memory without adding parameters.
:::

### S4 and its successors {#sec-s4}

Early experiments with linear state-space layers (Gu et al., 2021) used a special matrix $A$ derived from the **HiPPO** theory (Gu, Dao, Ermon, Rudra and Ré, 2020), under which the state $\mathbf{x}(t)$ holds the coefficients of an optimal polynomial approximation of the input's entire history — a principled long-term memory. The obstacle was computational: computing the kernel $\bar K$ from a dense $N\times N$ matrix $\bar A$ needs $T$ matrix powers. **S4** (Gu, Goel and Ré, ICLR 2022) resolved it by writing the HiPPO matrix as a normal matrix plus a low-rank correction, which reduces the kernel computation to a few Cauchy-kernel evaluations, and by learning $\Delta$ per channel. On the Long Range Arena benchmark (Tay et al., 2021), whose tasks involve sequences of $1{,}000$ to $16{,}000$ elements, S4 improved substantially on all previous models and was the first to perform better than chance on Path-X, a $16{,}384$-step image-path task.

Simpler versions followed quickly, and showed that much of S4's machinery could be dropped. DSS (Gupta, Gu and Berant, 2022) and **S4D** (Gu, Gupta, Goel and Ré, 2022) used a *diagonal* $A$ with complex eigenvalues — for example $\lambda_n = -\frac12 + i\pi n$, the "S4D-Lin" initialisation used in the listing below — and computed the kernel directly as a sum of geometric sequences. S5 (Smith, Warrington and Linderman, 2023) ran a multi-input diagonal SSM with a parallel scan instead of a convolution. Orvieto et al.'s **LRU** (2023) showed that a plain linear recurrent layer with diagonal complex weights, parameterised so that $\lvert\bar a_n\rvert < 1$ and initialised close to the unit circle, matches S4 on Long Range Arena — so the essential ingredients are linearity, diagonal (complex) structure, stable parameterisation and slow decay at initialisation, more than the continuous-time derivation. Convolutional models with long implicit kernels, such as H3 (Fu, Dao et al., 2023) and Hyena (Poli et al., 2023), explored the convolutional side of the duality for language.

## Selectivity: Mamba {#sec-mamba}

Time-invariant models have a basic limitation. By [[#thm-duality]], an LTI layer applies the *same* kernel at every position: how much it remembers of the token $j$ steps back depends on $j$, never on *what* that token was. It cannot decide to store an important token and ignore filler, a capability that synthetic tasks such as **selective copying** (reproduce the marked tokens of a sequence, whatever their spacing) and **associative recall** (after "… $k$ $v$ …", answer $v$ when queried with $k$) require, and that attention provides by content-based lookup. On language modelling, LTI SSMs lagged behind Transformers of the same size.

::: definition Selective state-space model {#def-selective}
A **selective** SSM makes the discretisation step and the input and output maps functions of the current input: for each position $t$, with $\mathbf{u}_t\in\R^c$ the layer's input,

$$
\Delta_t = \operatorname{softplus}(\mathbf{w}_\Delta^\top\mathbf{u}_t + b_\Delta),\quad B_t = W_B\mathbf{u}_t,\quad C_t = W_C\mathbf{u}_t,\qquad
\mathbf{x}_t = e^{\Delta_tA}\mathbf{x}_{t-1} + \Delta_tB_t\,u_t,\quad y_t = C_t\mathbf{x}_t ,
$$ {#eq-selective}

per channel, with a diagonal $A$ with negative real entries and the simplified input discretisation $\bar B_t\approx\Delta_tB_t$. The recurrence is linear in $\mathbf{x}$ but time-varying, so it has no convolution form; it is computed by a parallel scan ([[#prop-scan]]).
:::

::: proposition The step size is a gate {#prop-gate}
For a scalar mode with $A = a < 0$ and ZOH input $\bar b_t = (1 - e^{\Delta_ta})/(-a)\cdot b$, let $g_t = 1 - e^{\Delta_ta}\in(0, 1)$. Then $x_t = (1 - g_t)x_{t-1} + g_t\,(b/(-a))\,u_t$. As $\Delta_t\to0$, $g_t\to0$ and the state is kept unchanged, ignoring $u_t$; as $\Delta_t\to\infty$, $g_t\to1$ and the state is reset to (a multiple of) the current input.
:::

::: proof
With $\bar a_t = e^{\Delta_ta}$ we have $1 - \bar a_t = g_t$, and the ZOH input coefficient is $\bar b_t = (\bar a_t - 1)b/a = g_t\,b/(-a)$, so $x_t = \bar a_tx_{t-1} + \bar b_tu_t$ takes the stated form. Since $a < 0$, $e^{\Delta_ta}\to1$ as $\Delta_t\to0$ and $\to0$ as $\Delta_t\to\infty$.
:::

This is the GRU's interpolation $\mathbf{h}_t = \mathbf{z}_t\odot\mathbf{h}_{t-1} + (1 - \mathbf{z}_t)\odot\tilde{\mathbf{h}}_t$ ([[sequence-models/long-range-dependencies#def-gru]]) with the gate computed from the input alone and a *linear* candidate — the decay $e^{\Delta_ta}$ is a forget gate. Gu and Dao (2023) called the resulting model **Mamba**. Its block combines a selective SSM with a short causal convolution, a gating branch and expansion and output projections, and is stacked without attention or separate MLP layers. Because the recurrence is time-varying, training uses a parallel scan, implemented as a fused GPU kernel that keeps the expanded state in fast on-chip memory instead of writing it to main memory. The paper reported that Mamba solved selective copying and induction-head tasks that LTI models could not, and that in language modelling a $3$-billion-parameter Mamba matched Transformers about twice its size on the authors' pretraining and downstream evaluations, with several times higher generation throughput. **Mamba-2** (Dao and Gu, 2024) restricted $A$ to a scalar times the identity per head and showed that the resulting model can be written as a form of masked linear attention — the "state space duality" — which allows it to be trained with matrix multiplications.

::: example State versus cache {#ex-state}
A hypothetical layer has model width $2{,}560$, expanded to $5{,}120$ inner channels, each with an SSM state of $N = 16$. Compare its recurrent state with the key–value cache of an attention layer of the same width (keys and values of $2{,}560$ numbers each per token) for a context of $100{,}000$ tokens.
::: solution
The SSM state is $5{,}120\cdot16 = 81{,}920$ numbers per layer (plus a few thousand for the short convolution's buffer), whatever the context length. The KV cache grows by $2\cdot2{,}560 = 5{,}120$ numbers per token: it equals the SSM state after $16$ tokens and is $100{,}000\cdot5{,}120/81{,}920 = 6{,}250$ times larger at $100{,}000$ tokens. That is the attraction of recurrent layers for long contexts — and also their limitation, because $81{,}920$ numbers must summarise $100{,}000$ tokens, whereas the cache keeps every one of them ([[transformers/efficient-attention]]).
:::
:::

## The same family: linear attention and RWKV {#sec-family}

Several other lines of work arrived at linear recurrences from different directions.

**Linear attention.** Katharopoulos et al. (2020) replaced the softmax in causal attention by a kernel feature map $\phi$, so that $\mathbf{o}_t = \sum_{s\le t}\phi(\mathbf{q}_t)^\top\phi(\mathbf{k}_s)\mathbf{v}_s/\dots$. The sum over the past can then be accumulated in a matrix-valued state $S_t = S_{t-1} + \phi(\mathbf{k}_t)\mathbf{v}_t^\top$, read out by the query — an RNN with an outer-product update ([[transformers/efficient-attention#prop-linear-rnn]]). Adding a decay, $S_t = \gamma S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$, gives RetNet (Sun et al., 2023); making the decay data-dependent gives gated linear attention (Yang et al., 2024), which is close to Mamba-2.

**RWKV** (Peng et al., 2023) was designed as "an RNN with Transformer-level performance": its time-mixing layer keeps, per channel, exponentially decayed running sums of $e^{k_s}v_s$ and $e^{k_s}$ with a learned decay rate, and takes their ratio — a normalised linear attention with per-channel decay — and it was trained in parallel like a Transformer and run as an RNN for generation; RWKV models were trained up to $14$ billion parameters. Earlier, the quasi-recurrent network (Bradbury et al., 2017) and the simple recurrent unit (Lei et al., 2018) had already used gated *elementwise* linear recurrences after convolutional or linear layers to make RNN training fast, and xLSTM (Beck et al., 2024) revisited the LSTM with exponential gates and a matrix memory.

The common form is a **gated linear recurrence**, $\mathbf{x}_t = \mathbf{a}_t\odot\mathbf{x}_{t-1} + \mathbf{b}_t$ (or its matrix-state version), where the decay $\mathbf{a}_t$ is fixed (LTI SSMs, RetNet) or computed from the input (Mamba, gated linear attention, RWKV's later versions), and where the state is read out by a projection of the current input. The models differ in the size and structure of the state, in how the decay is parameterised, and in their hardware-efficient training algorithms.

| model | training | generation cost per token | memory of the past |
|---|---|---|---|
| RNN / LSTM | sequential, $O(T)$ steps | $O(H^2)$, constant | fixed-size state |
| causal CNN / TCN | parallel | $O(\text{layers}\cdot k)$ with caching | bounded receptive field |
| softmax attention | parallel, $O(T^2)$ | $O(T)$, cache grows | every past token |
| LTI SSM (S4, S4D) | parallel, convolution $O(T\log T)$ | $O(N)$ per channel, constant | fixed-size state, content-independent |
| selective SSM (Mamba), gated linear attention | parallel scan or chunked matmuls | constant | fixed-size state, content-dependent |

::: quiz
Why can a selective SSM such as Mamba not be computed as a single convolution, while S4 can?
- [ ] Because Mamba uses a nonlinearity inside the recurrence.
- [x] Because its parameters $\Delta_t, B_t, C_t$ depend on the input, so the recurrence is time-varying and there is no single kernel.
- [ ] Because Mamba's state is larger than S4's.
- [ ] Because convolutions cannot be computed on GPUs.
::: solution
[[#thm-duality]] needs time-invariance: the kernel $C\bar A^j\bar B$ must be the same at every position. In a selective SSM the matrices change with $t$, so the effect of $u_s$ on $y_t$ is $C_t\bar A_t\cdots\bar A_{s+1}\bar B_s$, which depends on $s$ and $t$ separately. The recurrence is still *linear* in the state, so a parallel scan works ([[#prop-scan]]); there is no nonlinearity inside it.
:::
:::

## Implementing the duality {#sec-code}

The listing builds a diagonal complex SSM with $N = 4$ modes and the S4D-Lin initialisation, discretises it by ZOH, and computes its output on a random input both as a recurrence and as a convolution with the kernel of [[#thm-duality]]. It then computes the same states with the associative scan of [[#prop-scan]] (by recursive doubling, written sequentially), and finally runs a scalar *selective* recurrence whose step size depends on the input.

```python
import cmath, math, random

rng = random.Random(0)
N, L = 4, 64                                   # state size (diagonal, complex), length
# continuous-time diagonal SSM: x'(t) = A x + B u, y = Re(C x); A = diag(lam), Re(lam) < 0
lam = [complex(-0.5, math.pi * n) for n in range(N)]         # S4D-Lin style initialisation
B = [1.0 + 0j] * N
C = [complex(rng.gauss(0, 0.5), rng.gauss(0, 0.5)) for _ in range(N)]
dt = 0.1

# zero-order hold: A_bar = exp(dt*lam), B_bar = (exp(dt*lam) - 1) / lam * B
Ab = [cmath.exp(dt * l) for l in lam]
Bb = [(cmath.exp(dt * l) - 1) / l * b for l, b in zip(lam, B)]

u = [rng.gauss(0, 1) for _ in range(L)]        # input sequence

# (1) as a recurrence: O(L N) work, O(N) memory, sequential
x, y_rec = [0j] * N, []
for t in range(L):
    x = [a * xi + b * u[t] for a, xi, b in zip(Ab, x, Bb)]
    y_rec.append(sum(c * xi for c, xi in zip(C, x)).real)

# (2) as a convolution with the kernel K[j] = Re(sum_n C_n A_bar_n^j B_bar_n)
K = [sum(c * a ** j * b for c, a, b in zip(C, Ab, Bb)).real for j in range(L)]
y_conv = [sum(K[j] * u[t - j] for j in range(t + 1)) for t in range(L)]
print("max |recurrence - convolution| =", max(abs(a - b) for a, b in zip(y_rec, y_conv)))
print("kernel K[0..5] =", [round(k, 4) for k in K[:6]], " |A_bar| =", [round(abs(a), 4) for a in Ab])

# (3) the same recurrence by an associative scan: elements (a, b) mean x -> a*x + b
def combine(e1, e2):                           # apply e1, then e2
    (a1, b1), (a2, b2) = e1, e2
    return (a2 * a1, a2 * b1 + b2)
def scan(elems):                               # inclusive scan, recursive doubling
    out, step = list(elems), 1
    while step < len(out):                     # log2(L) rounds; each round is parallel
        out = [out[i] if i < step else combine(out[i - step], out[i]) for i in range(len(out))]
        step *= 2
    return out
n0 = [scan([(Ab[0], Bb[0] * u[t]) for t in range(L)])[t][1] for t in range(L)]
x0, err = 0j, 0.0
for t in range(L):
    x0 = Ab[0] * x0 + Bb[0] * u[t]; err = max(err, abs(x0 - n0[t]))
print("max |sequential - scan| for state 0 =", err)

# (4) a selective (input-dependent) scalar recurrence: the step dt_t depends on u_t
def scalar_ssm(u, dts, a=-1.0):                         # ZOH with B = -a, so B_bar = 1 - A_bar
    x, ys = 0.0, []
    for ut, d in zip(u, dts):
        ab = math.exp(d * a)                            # decay in (0, 1): a forget gate
        x = ab * x + (1 - ab) * ut
        ys.append(x)
    return ys
softplus = lambda v: math.log1p(math.exp(v))
seq = [0.1, 3.0, 0.1, -0.2, 0.1, 0.0, 0.2, -0.1]
sel = [softplus(2.0 * abs(v) - 4.0) for v in seq]      # large |u| -> large step: write
print("input           ", seq)
print("selective dt    ", [round(d, 3) for d in sel])
print("selective output", [round(v, 3) for v in scalar_ssm(seq, sel)])
for d in (0.05, 1.0):                                   # time-invariant: one dt for all
    print(f"LTI dt={d:<4}     ", [round(v, 3) for v in scalar_ssm(seq, [d] * len(seq))])
```

Output:

```
max |recurrence - convolution| = 1.249000902703301e-16
kernel K[0..5] = [-0.0097, 0.0212, 0.0316, 0.0275, 0.026, 0.037]  |A_bar| = [0.9512, 0.9512, 0.9512, 0.9512]
max |sequential - scan| for state 0 = 1.6653345369377348e-16
input            [0.1, 3.0, 0.1, -0.2, 0.1, 0.0, 0.2, -0.1]
selective dt     [0.022, 2.127, 0.022, 0.027, 0.022, 0.018, 0.027, 0.022]
selective output [0.002, 2.643, 2.587, 2.513, 2.46, 2.416, 2.357, 2.303]
LTI dt=0.05      [0.005, 0.151, 0.148, 0.131, 0.13, 0.124, 0.127, 0.116]
LTI dt=1.0       [0.063, 1.92, 0.769, 0.157, 0.121, 0.044, 0.143, -0.011]
```

The recurrence, the convolution and the scan agree to within rounding ($10^{-16}$), which is [[#thm-duality]] and [[#prop-scan]] in action; every mode has $\lvert\bar a\rvert = e^{-0.05} = 0.9512$, as [[#prop-zoh]] predicts for $\operatorname{Re}\lambda = -0.5$, $\Delta = 0.1$. The last three lines show what selectivity buys. The selective recurrence takes a large step ($\Delta = 2.1$) at the large input $3.0$, writing it almost entirely into the state ($2.64$), and tiny steps ($\Delta\approx0.02$) at the small inputs, so it *holds* the value: after six more steps it still reads $2.30$. No time-invariant choice does both: with $\Delta = 0.05$ the state barely registers the important input ($0.15$), with $\Delta = 1$ it registers it ($1.92$) and then forgets it within three steps.

::: warning "State-space models have replaced Transformers" — or "they cannot compete"
Neither claim is supported by the published evidence as of 2026. Selective SSMs and gated linear-attention models have matched Transformers of similar size on many language-modelling benchmarks in published studies, with constant memory per generated token. But controlled comparisons also find systematic weaknesses on tasks that require retrieving or copying specific information from long contexts — associative recall (Arora et al., 2023), copying long strings (Jelassi et al., 2024), some few-shot evaluations — which a fixed-size state handles less well than a cache of every token. A large study by Waleffe et al. (2024) found that a pure Mamba-2 model at $8$ billion parameters lagged a Transformer on such tasks, while a **hybrid** with a small fraction of attention layers matched or exceeded it on the standard tasks they evaluated. Several openly released models (for example Jamba, Lieber et al., 2024) combine SSM and attention layers. The publicly documented frontier language models have mostly remained Transformer-based, and how far recurrent layers will replace attention is an open research question. Judge each claim by its evaluation: which tasks, which sizes, which context lengths.
:::

::: history
Linear state-space models are the language of control theory and signal processing: Kalman's state-space formulation (1960) and the Kalman filter, and the theory of linear time-invariant systems whose impulse response is a convolution kernel. In deep learning, convolutional sequence models rose in 2016–2017 with WaveNet (van den Oord et al., 2016), ByteNet and convolutional translation (Gehring et al., 2017), and Bai, Kolter and Koltun's (2018) argument that convolutions should be the default for sequences. Linear recurrences were revisited for speed — quasi-RNNs (2017), SRU (2018), and Martin and Cundy's parallel scans (2018). Albert Gu and colleagues at Stanford developed HiPPO (2020) and the linear state-space layer (2021), and S4 (posted October 2021, ICLR 2022) made SSMs work on very long sequences; diagonal variants (DSS, S4D, S5, LRU) followed in 2022–2023. Linear attention (2020), RetNet and RWKV (2023) approached the same models from the attention side. Albert Gu and Tri Dao's Mamba (December 2023) introduced selectivity and a hardware-aware scan, and Mamba-2 (2024) connected SSMs and attention through state space duality. Hybrid architectures combining these layers with attention were an active area of development in 2024–2026.
:::

::: summary
- **Temporal convolutions** with dilations $1, 2, 4, \dots$ reach a receptive field of $1 + (k - 1)(2^L - 1)$ steps with $L$ layers; they train in parallel but have bounded memory (WaveNet, TCN).
- A **linear recurrence** $\mathbf{x}_t = \bar A\mathbf{x}_{t-1} + \bar Bu_t$, $y_t = C\mathbf{x}_t$ keeps nonlinearity between layers, not inside time. If it is time-invariant, it **equals a convolution** with kernel $\bar K_j = C\bar A^j\bar B$: train as a convolution (FFT), generate as an RNN.
- Any linear recurrence, time-varying or not, is an **associative scan** and can be computed in $O(\log T)$ parallel rounds.
- **State-space models** discretise $\mathbf{x}' = A\mathbf{x} + Bu$ with a step $\Delta$; ZOH is exact for piecewise-constant input, stability needs $\operatorname{Re}\lambda < 0$, and $\Delta$ sets the time scale. S4 made them trainable on very long sequences; diagonal versions (S4D, LRU) are simpler and as good.
- **Selective SSMs** (Mamba) compute $\Delta_t, B_t, C_t$ from the input; the decay $e^{\Delta_ta}$ acts as a forget gate, enabling content-dependent memory, at the price of losing the convolution form.
- Linear attention, RetNet, gated linear attention and RWKV are **gated linear recurrences** too. As of 2026 they and SSMs are competitive on many benchmarks and efficient for long contexts, weaker at exact recall from long contexts, and often used in hybrids with attention.
:::

## Exercises

::: exercise A receptive field {level=1 check="1+2*(1+2+4+8+16)"}
A causal convolution stack has kernel size $3$ and dilations $1, 2, 4, 8, 16$. What is its receptive field?
::: solution
$1 + (3 - 1)(1 + 2 + 4 + 8 + 16) = 1 + 2\cdot31 = 63$ steps.
:::
:::

::: exercise A kernel entry {level=1 check="0.8^3*2"}
A scalar LTI layer has $\bar a = 0.8$, $\bar b = 2$, $c = 1$. What is the kernel entry $\bar K_3$?
::: solution
$\bar K_3 = c\,\bar a^3\,\bar b = 0.512\cdot2 = 1.024$.
:::
:::

::: exercise Time constant of a mode {level=1 check="1/(0.01*0.5)"}
A diagonal SSM mode has $\lambda = -0.5 + 3i$ and step $\Delta = 0.01$. After how many steps has its magnitude fallen by a factor $e$?
::: solution
$\lvert\bar a\rvert = e^{\Delta\operatorname{Re}\lambda} = e^{-0.005}$ per step, so the magnitude falls by $e$ after $1/(\Delta\lvert\operatorname{Re}\lambda\rvert) = 1/0.005 = 200$ steps. The imaginary part does not affect the decay, only the oscillation, with period $2\pi/(\Delta\cdot3)\approx209$ steps.
:::
:::

::: exercise Composing two steps {level=2}
For scalar steps $e_1 = (0.5, 1)$ and $e_2 = (0.2, 3)$, compute $e_1\bullet e_2$ and check that applying it to $x_0 = 0$ gives the same $x_2$ as running the recurrence. Then compute $(e_1\bullet e_2)\bullet e_3$ and $e_1\bullet(e_2\bullet e_3)$ for $e_3 = (2, -1)$.
::: solution
$e_1\bullet e_2 = (0.2\cdot0.5, 0.2\cdot1 + 3) = (0.1, 3.2)$; applied to $0$ gives $3.2$. The recurrence: $x_1 = 0.5\cdot0 + 1 = 1$, $x_2 = 0.2\cdot1 + 3 = 3.2$. Next, $(0.1, 3.2)\bullet(2, -1) = (0.2, 6.4 - 1) = (0.2, 5.4)$. And $e_2\bullet e_3 = (0.4, 6 - 1) = (0.4, 5)$, so $e_1\bullet(0.4, 5) = (0.4\cdot0.5, 0.4\cdot1 + 5) = (0.2, 5.4)$. Equal, as associativity requires; $x_3 = 5.4$.
:::
:::

::: exercise ZOH versus Euler {level=2 check="1-0.1*2"}
The forward Euler discretisation of $x' = \lambda x + u$ is $\bar a = 1 + \Delta\lambda$, $\bar b = \Delta$. For $\lambda = -2$ and $\Delta = 0.1$, compute $\bar a$, and compare with ZOH. For which $\Delta$ does Euler become unstable while ZOH remains stable?
::: solution
Euler: $\bar a = 1 - 0.2 = 0.8$; ZOH: $e^{-0.2} = 0.8187$. Euler is unstable when $\lvert1 + \Delta\lambda\rvert > 1$, i.e. $\Delta > 2/\lvert\lambda\rvert = 1$ here; ZOH gives $\lvert\bar a\rvert = e^{-2\Delta} < 1$ for every $\Delta > 0$. Since selective SSMs make $\Delta_t$ large to reset the state, an unconditionally stable discretisation matters.
:::
:::

::: exercise Recurrence or convolution? {level=2}
For an LTI layer with diagonal $\bar A$ of size $N$, sequence length $T$ and one channel, compare the arithmetic of (a) the recurrence, (b) computing the kernel and convolving directly, (c) computing the kernel and convolving with the FFT. Which is best for training on long sequences on a GPU, and which for generating one token at a time?
::: solution
(a) $O(TN)$ operations but $T$ sequential steps. (b) Kernel $O(TN)$, direct convolution $O(T^2)$, fully parallel. (c) Kernel $O(TN)$ plus FFT convolution $O(T\log T)$, parallel. For training on long sequences, (c) — or a parallel scan, $O(TN)$ work in $O(\log T)$ rounds — uses the GPU's parallelism; the sequential recurrence would leave it idle. For generation, each new token needs only one recurrence step, $O(N)$, with no dependence on how many tokens came before, so (a) is best.
:::
:::

::: exercise What an LTI layer cannot do {level=2}
Show that an LTI layer cannot solve the following task for arbitrary spacing: the input is a sequence of zeros containing one marked value $v$ at an unknown position $s$ and, at the last position $T$, a query; the output at $T$ must be $v$. What does a selective model change?
::: solution
By [[#thm-duality]], $y_T = \sum_j\bar K_ju_{T-j} + Du_T$. With the single nonzero input $v$ at position $s$ (ignoring the query's own contribution), $y_T = \bar K_{T-s}v + (\text{query term})$, so the output scales $v$ by a factor that depends on the unknown distance $T - s$. Unless $\bar K_j$ is constant for all $j$ — a layer that never forgets, which then also accumulates everything else — the answer is wrong for most spacings. A selective model can set $\Delta_t$ large at the marked position (write $v$) and tiny elsewhere (hold it), as in the listing's last lines, so that the state at $T$ is about $v$ regardless of $s$.
:::
:::

::: exercise Linear attention as a linear recurrence {level=3}
For causal linear attention without normalisation, $\mathbf{o}_t = \sum_{s\le t}(\mathbf{q}_t^\top\mathbf{k}_s)\mathbf{v}_s$, show that $\mathbf{o}_t = S_t^\top\mathbf{q}_t$ with $S_t = S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$. Write the state update as a scan element in the sense of [[#prop-scan]], and show how a decay $\gamma\in(0, 1)$ turns it into RetNet's recurrence. What is the size of the state for $d_k = d_v = 128$, compared with the KV cache after $T$ tokens?
::: solution
$S_t = \sum_{s\le t}\mathbf{k}_s\mathbf{v}_s^\top$ by unrolling, so $S_t^\top\mathbf{q}_t = \sum_s\mathbf{v}_s\mathbf{k}_s^\top\mathbf{q}_t = \sum_s(\mathbf{q}_t^\top\mathbf{k}_s)\mathbf{v}_s = \mathbf{o}_t$. The update is $S_t = I\cdot S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$: a scan element $(I, \mathbf{k}_t\mathbf{v}_t^\top)$ acting on matrix states, with the identity as the "decay". RetNet uses $S_t = \gamma S_{t-1} + \mathbf{k}_t\mathbf{v}_t^\top$, the element $(\gamma, \mathbf{k}_t\mathbf{v}_t^\top)$, which by [[#thm-duality]] (applied entrywise) equals $\mathbf{o}_t = \sum_s\gamma^{t-s}(\mathbf{q}_t^\top\mathbf{k}_s)\mathbf{v}_s$ — attention with an exponential decay mask. The state has $d_kd_v = 16{,}384$ numbers per head, whatever $T$; the KV cache has $(d_k + d_v)T = 256T$ numbers per head, which exceeds the state after $64$ tokens.
:::
:::

::: exercise A selective scan is still a scan {level=3}
Modify the listing's `scan` to compute the selective recurrence of part (4) — scan elements $(\bar a_t, (1 - \bar a_t)u_t)$ with $\bar a_t = e^{-\Delta_t}$ — and verify that it reproduces the printed "selective output". Then explain why the time-varying model needs the scan (or a sequential loop) and cannot use the kernel $\bar K$.
::: solution
```python
abar = [math.exp(-d) for d in sel]
out = scan([(a, (1 - a) * ut) for a, ut in zip(abar, seq)])
print([round(b, 3) for _, b in out])
# [0.002, 2.643, 2.587, 2.513, 2.46, 2.416, 2.357, 2.303]
```
The second components of the prefix compositions are the states, identical to the loop's output because the composition rule is the recurrence ([[#prop-scan]] does not need time-invariance). A kernel would require the influence of $u_s$ on $y_t$ to depend only on $t - s$; here it is $\big(\prod_{r=s+1}^t\bar a_r\big)(1 - \bar a_s)$, which depends on all the step sizes in between — on the content of the sequence — so no fixed $\bar K$ exists.
:::
:::
