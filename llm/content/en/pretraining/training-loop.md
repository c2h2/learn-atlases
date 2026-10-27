A pretraining run is a loop executed a few hundred thousand times: take a batch of token sequences, compute the loss of [[pretraining/pretraining-objectives#def-clm]], backpropagate, clip the gradient, take an optimiser step at the learning rate the schedule prescribes, log, and now and then save a checkpoint. Every ingredient has been met in [[neural-networks/optimisers]] and [[neural-networks/training-practice]]. What changes in pretraining is scale. A batch holds millions of tokens; the model and its optimiser state do not fit on one accelerator; the run takes weeks on thousands of devices, some of which will fail; and there is usually only one chance to get it right, because the full run is too expensive to repeat.

This chapter does the arithmetic that governs such a run. It derives the rule that training costs about $6ND$ floating-point operations for $N$ parameters and $D$ tokens, turns it into a training-time estimate through **model FLOPs utilisation**, defines the learning-rate schedules used in practice, explains data, tensor and pipeline parallelism and derives the memory saved by sharding with ZeRO and FSDP, and works out how often to checkpoint when hardware fails. A complete miniature loop in plain Python, with resumption from a checkpoint, closes the chapter. The systems side — interconnects, kernels, the details of parallel schedules — is treated in [[scaling/flops-memory]], [[scaling/data-parallelism]] and [[scaling/model-parallelism]].

## Batches of tokens {#sec-batches}

::: definition Global batch {#def-batch}
A training step processes a **global batch** of $B$ sequences of $T$ tokens, so $B\cdot T$ **tokens per batch** (each a prediction target under the causal objective). The global batch is assembled as

$$
B = b_{\text{micro}}\times A\times n_{\text{DP}},
$$

where $b_{\text{micro}}$ sequences (the **micro-batch**) fit through the model on one device at once, $A$ micro-batches are accumulated before each update ([[neural-networks/training-practice#sec-accumulation]]), and $n_{\text{DP}}$ data-parallel replicas each process their own micro-batches. A run of $D$ tokens takes $S = D/(BT)$ optimiser steps.
:::

Documents rarely have exactly $T$ tokens. Pretraining pipelines **pack** them: documents are concatenated with an end-of-document token between them and the stream is cut into rows of $T$ tokens, so no compute is wasted on padding. Attention may either cross document boundaries (simple, and common) or be masked within each document; both are used, and masking matters more when long contexts are trained.

::: example Batch arithmetic {#ex-batch}
A run uses sequences of $T = 4096$ tokens, a micro-batch of $b_{\text{micro}} = 4$, $A = 2$ accumulation steps and $n_{\text{DP}} = 128$ data-parallel replicas. How many tokens are in a batch, and how many steps does a budget of $D = 2$ trillion tokens take?
::: solution
$B = 4\cdot2\cdot128 = 1024$ sequences, $BT = 1024\cdot4096 = 4{,}194{,}304\approx4.2$ million tokens per batch. Steps: $2\times10^{12}/4{,}194{,}304 = 476{,}837$, about half a million. Published runs are of this order: Llama 2 (2023) used batches of $4$ million tokens for $2$ trillion tokens, and Llama 3's largest model began at $4$ million tokens per batch and increased to $16$ million later in training.
:::
:::

Why so large? The gradient noise of a mini-batch falls as $1/\sqrt{B}$, and up to a **critical batch size** (McCandlish et al., 2018) a larger batch lets the learning rate grow and the number of steps shrink almost proportionally, so the run finishes sooner on more devices. Beyond it, extra batch buys little. The critical batch size grows as the loss falls, which is one reason some runs start with a smaller batch and **ramp it up**: GPT-3 increased its batch from $32$ thousand tokens to its full $3.2$ million over the first $4$ to $12$ billion tokens.

## The cost of a step: 6ND {#sec-flops}

A matrix–vector product with a $d_{\text{out}}\times d_{\text{in}}$ weight matrix costs $d_{\text{out}}d_{\text{in}}$ multiplications and as many additions, that is **two FLOPs per weight** ([[math-for-ml/vectors-matrices#prop-flops]]). Almost all of a Transformer's parameters sit in such matrices, which gives the most useful formula in large-scale training.

::: proposition Training compute is about 6ND {#prop-6nd}
Let a Transformer have $N$ parameters in its weight matrices (excluding embedding look-ups), $n_{\text{layer}}$ layers of width $d$, and context length $T$. Training on $D$ tokens costs approximately

$$
C\approx6ND + 6\,n_{\text{layer}}\,T\,d\,D\ \text{FLOPs},
$$ {#eq-6nd}

and the first term dominates when $T\ll N/(n_{\text{layer}}d)$, which for large models means $C\approx6ND$.
:::

::: proof
**Forward pass.** Each token is multiplied by every weight matrix once, costing $2$ FLOPs per parameter: $2N$ per token. Attention adds the products $QK^\top$ and the weighted sum of values, which are not parameter multiplications. A query at position $t$ is compared with $t$ keys of total width $d$ across heads ($2td$ FLOPs) and mixes $t$ value vectors of width $d$ ($2td$ FLOPs). With the causal mask, $t$ averages about $T/2$ over the positions of a sequence, so the average cost is $2Td$ per token per layer, $2n_{\text{layer}}Td$ per token — the term $2n_{\text{layer}}n_{\text{ctx}}d_{\text{attn}}$ of Kaplan et al. (2020). (Kernels that compute the full $T\times T$ score matrix and then mask it do twice this work.) Norms, activations and the softmax cost $O(d)$ per token per layer and are negligible.

**Backward pass.** For a linear layer $\mathbf{y} = W\mathbf{x}$, backpropagation computes the gradient with respect to the input, $W^\top\bar{\mathbf{y}}$, and with respect to the weights, $\bar{\mathbf{y}}\mathbf{x}^\top$ ([[math-for-ml/gradients#prop-linear-grad]]); each costs as much as the forward product. So the backward pass costs twice the forward pass, and forward plus backward is three times the forward: $3\cdot(2N + 2n_{\text{layer}}Td) = 6N + 6n_{\text{layer}}Td$ per token. Multiplying by $D$ tokens gives [[#eq-6nd]]. The ratio of the two terms is $n_{\text{layer}}Td/N$; with $N\approx12n_{\text{layer}}d^2$ ([[transformers/transformer-block#prop-block-params]]) it is $T/(12d)$, small when the context is short compared with $12d$.
:::

The optimiser step costs $O(N)$ FLOPs per step, not per token, and is negligible. The estimate counts only the computation the model needs; **activation recomputation** ([[#sec-memory]]) repeats part of the forward pass and adds work that $6ND$ does not count.

::: example The compute of a 7-billion-parameter run {#ex-compute}
A model with $N = 7\times10^9$ parameters, $n_{\text{layer}} = 32$, $d = 4096$ and $T = 4096$ is trained on $D = 2\times10^{12}$ tokens. Compute $6ND$ and the attention correction.
::: solution
$6ND = 6\cdot7\times10^9\cdot2\times10^{12} = 8.4\times10^{22}$ FLOPs. The attention term per token is $6\cdot32\cdot4096\cdot4096 = 3.2\times10^9$ FLOPs against $6N = 4.2\times10^{10}$, so it adds $7.7\%$ — consistent with $T/(12d) = 4096/49152 = 8.3\%$ for a model whose $N$ is close to $12n_{\text{layer}}d^2 = 6.4\times10^9$. For contexts of $32$ thousand tokens the correction would exceed $60\%$, which is why long-context training is expensive.
:::
:::

## Utilisation and training time {#sec-mfu}

Accelerators are rated by their **peak** throughput — for dense 16-bit matrix multiplication, of the order of $10^{15}$ FLOP/s ($1$ PFLOP/s) per device for datacentre accelerators of the mid-2020s. Real training reaches a fraction of it: time is spent in communication, memory-bound operations (normalisation, softmax, element-wise functions), pipeline bubbles and recomputation.

::: definition Model FLOPs utilisation {#def-mfu}
The **model FLOPs utilisation** (MFU; Chowdhery et al., 2022) of a training run is

$$
\text{MFU} = \frac{6N\cdot(\text{tokens processed per second})}{n_{\text{dev}}\cdot\text{peak FLOP/s per device}},
$$

the fraction of the hardware's peak spent on the FLOPs the model strictly requires (optionally including the attention term of [[#eq-6nd]]). **Hardware FLOPs utilisation** counts all FLOPs actually executed, including recomputation, and is therefore higher.
:::

Because MFU counts only necessary work, it is comparable across implementations: a run that recomputes activations does not get credit for the recomputation. Published values for large dense models are typically between $30\%$ and $55\%$; PaLM reported $46.2\%$ for its $540$-billion-parameter model (2022), and the Llama 3 report gave $38$–$43\%$ for its $405$-billion-parameter model on up to $16{,}384$ accelerators (2024).

::: proposition Training time {#prop-time}
A run of $C = 6ND$ FLOPs on $n_{\text{dev}}$ devices with peak throughput $F$ FLOP/s at utilisation $U$ takes

$$
t = \frac{6ND}{n_{\text{dev}}\,F\,U}\ \text{seconds}.
$$ {#eq-time}
:::

::: proof
By [[#def-mfu]], the run achieves $n_{\text{dev}}FU$ model FLOPs per second, and it must perform $6ND$ of them.
:::

::: example MFU from a throughput measurement {#ex-mfu}
The $7$-billion-parameter model of [[#ex-compute]] is trained on $1024$ accelerators with a peak of $10^{15}$ dense bfloat16 FLOP/s each, and the logs report $10^7$ tokens per second. What is the MFU (ignoring the attention term), and how long will the run of $2\times10^{12}$ tokens take?
::: solution
Model FLOP/s: $6\cdot7\times10^9\cdot10^7 = 4.2\times10^{17}$. Peak: $1024\cdot10^{15} = 1.024\times10^{18}$. MFU $= 4.2/10.24 = 41\%$. Time: $2\times10^{12}/10^7 = 2\times10^5$ s, $2.3$ days, the same as [[#eq-time]] gives: $8.4\times10^{22}/(1.024\times10^{18}\cdot0.41) = 2.0\times10^5$ s. Including the attention term, the MFU would be $41\%\cdot1.077 = 44\%$; reports should say which convention they use.
:::
:::

::: widget plot
f: 8.4e22/(n*1e15*x)/86400
x: 0.1, 0.7
y: 0, 30
sliders: n=1024:128:8192:128
labels: training days for $6ND = 8.4\times10^{22}$ FLOPs
caption: Training time from [[#eq-time]] for the run of [[#ex-compute]] against MFU, for $n$ devices with a peak of $10^{15}$ FLOP/s each. Doubling utilisation halves the time and the cost, which is why so much engineering goes into communication overlap and fused kernels. Adding devices helps only if MFU does not fall, and in practice it falls slowly as communication grows.
:::

## Learning-rate schedules {#sec-schedules}

Pretraining uses AdamW ([[neural-networks/optimisers#sec-adamw]]) with hyperparameters that have become conventional: $\beta_1 = 0.9$, $\beta_2 = 0.95$ (lower than the default $0.999$, so the second moment adapts faster to changes in gradient scale), weight decay $0.1$, and global gradient-norm clipping at $1.0$ ([[neural-networks/optimisers#def-clipping]]); GPT-3 and the LLaMA models report these values. The learning rate follows a schedule.

::: definition Pretraining schedules {#def-schedules}
With peak learning rate $\eta_{\max}$, warm-up length $S_w$ steps and total length $S$:

- **Linear warm-up**: $\eta_t = \eta_{\max}\,t/S_w$ for $t\le S_w$.
- **Cosine decay** to a floor $\eta_{\min}$ (often $0.1\,\eta_{\max}$): $\eta_t = \eta_{\min} + \tfrac12(\eta_{\max} - \eta_{\min})\big(1 + \cos\big(\pi\frac{t - S_w}{S - S_w}\big)\big)$ for $S_w < t\le S$.
- **Warm-up–stable–decay** (WSD): after warm-up, hold $\eta_t = \eta_{\max}$ until step $S - S_d$, then decay (linearly, or by another short curve) to $\eta_{\min}$ over the last $S_d$ steps, typically $10$–$20\%$ of the run.
:::

Warm-up matters because early gradients are large and Adam's second-moment estimate is unreliable until it has seen many steps; a high learning rate at step $1$ can push the model into a bad region from which it never recovers ([[pretraining/training-stability]]). Cosine decay was the standard for years; Hoffmann et al. (2022) found that the cosine cycle should match the length of the run — a cosine schedule set for a longer run and stopped early gives worse loss — which makes cosine awkward when the final length is not known in advance. **WSD** (Hu et al., 2024; analysed by Hägele et al., 2024) removes that problem: the stable phase can be continued as long as wanted, and a decay can be branched off any checkpoint to obtain a finished model, which is also how annealing on special data is done ([[pretraining/data-mixtures#def-annealing]]). Hägele et al. found that WSD with a cool-down of about $20\%$ matched cosine schedules at the same compute.

::: widget plot
f: max(0, min(x/5, 0.1 + 0.45*(1 + cos(pi*(x - 5)/95)))); max(0, min(x/5, 1, 0.1 + 0.9*(100 - x)/d))
x: 0, 100
y: 0, 1.1
sliders: d=20:5:60:1
labels: warm-up then cosine to $10\%$; WSD with decay over the last $d\%$
caption: Learning rate as a fraction of $\eta_{\max}$ over a run (percent of steps), with a $5\%$ warm-up. Cosine decays from the end of warm-up; WSD holds the peak and decays linearly over the last $d\%$. The loss of a WSD run stays higher than the cosine run's during the stable phase and drops sharply during the decay, ending at about the same value — so intermediate WSD checkpoints underestimate the final model's quality, a point to remember when evaluating during training ([[pretraining/in-training-evaluation]]).
:::

The peak learning rate is usually chosen by sweeps on small models and extrapolated; it falls with model size (GPT-3 used $6\times10^{-4}$ for its $125$-million-parameter model and $0.6\times10^{-4}$ for $175$ billion). Parametrisations such as $\mu$P aim to make the optimum transfer across widths ([[pretraining/training-stability#sec-mup]]).

## Parallelism and memory {#sec-memory}

A model of $N$ parameters trained with mixed-precision Adam needs memory for its parameters, gradients and optimiser state before storing a single activation.

::: proposition Sixteen bytes per parameter {#prop-16-bytes}
With bfloat16 weights and gradients, a float32 master copy of the weights and float32 Adam moments, training state takes $16$ bytes per parameter: $2N$ bytes of weights, $2N$ of gradients and $12N$ of optimiser state.
:::

::: proof
Count per parameter: the working weight in bfloat16 is $2$ bytes; its gradient in bfloat16 is $2$ bytes; the float32 master weight, to which updates are applied without loss of small increments ([[neural-networks/training-practice#prop-swamping]]), is $4$ bytes; Adam's first and second moments in float32 are $4$ bytes each. The sum is $2 + 2 + 4 + 4 + 4 = 16$; the last three terms form the $12$ bytes of "optimiser state". (This is the accounting of Rajbhandari et al., 2020, and [[neural-networks/training-practice#ex-memory]].)
:::

A $70$-billion-parameter model thus needs $1.12$ TB of training state, more than ten times the memory of one accelerator. Three kinds of parallelism split the work.

::: definition Data, tensor and pipeline parallelism {#def-parallelism}
- **Data parallelism** (DP): $n_{\text{DP}}$ replicas of the model each process a different part of the global batch; after the backward pass their gradients are averaged with an **all-reduce**, so every replica takes the same step.
- **Tensor parallelism** (TP; Shoeybi et al., 2019, Megatron-LM): each weight matrix is split across $n_{\text{TP}}$ devices — in the feed-forward block, the first matrix by columns and the second by rows — so each device holds $1/n_{\text{TP}}$ of the layer, at the cost of an all-reduce of activations in every attention and feed-forward block, forward and backward.
- **Pipeline parallelism** (PP; Huang et al., 2019, GPipe): the layers are divided into $p$ consecutive **stages** on different devices; each micro-batch flows through the stages in turn, and $m$ micro-batches are pipelined so that stages work on different micro-batches at once.
:::

The three are combined ("3D parallelism"): tensor parallelism within a server, where links are fastest, pipeline parallelism across a few servers, and data parallelism across the rest, so that $n_{\text{dev}} = n_{\text{DP}}n_{\text{TP}}p$. Mixture-of-experts models add **expert parallelism**, placing different experts on different devices ([[transformers/mixture-of-experts#sec-systems]]).

::: proposition Pipeline bubble {#prop-bubble}
In a synchronous pipeline schedule with $p$ stages, $m$ micro-batches per step, and equal time $t$ per stage per micro-batch (forward and backward combined), each step takes $(m + p - 1)t$, and the fraction of device time idle (the **bubble**) is

$$
\frac{p - 1}{m + p - 1}.
$$
:::

::: proof
The first micro-batch reaches the last stage after $p - 1$ stage times; thereafter one micro-batch leaves the pipeline per stage time, so the last of the $m$ finishes after $(p - 1) + m$ stage times (for forward and backward together, with the schedule mirrored for the backward pass). Each stage is busy for $mt$ of the $(m + p - 1)t$, so the idle fraction is $(p - 1)/(m + p - 1)$.
:::

::: example Choosing micro-batches {#ex-bubble}
A model is split into $p = 8$ pipeline stages. What is the bubble with $m = 8$ and with $m = 32$ micro-batches per step?
::: solution
$m = 8$: $7/15 = 47\%$ idle — nearly half the hardware wasted. $m = 32$: $7/39 = 18\%$. More micro-batches shrink the bubble but require a larger global batch (or smaller micro-batches, which use the hardware less efficiently). Interleaved schedules that give each device several non-adjacent stages (Narayanan et al., 2021) reduce the bubble further.
:::
:::

**Sharding the state.** Plain data parallelism stores all $16N$ bytes on every replica, which is redundant: each replica holds identical optimiser state. **ZeRO** (Rajbhandari et al., 2020) partitions it across the $n_{\text{DP}}$ replicas, each keeping only the shard it updates.

::: proposition ZeRO memory per device {#prop-zero}
With $N$ parameters, $n_{\text{DP}}$ data-parallel devices and the accounting of [[#prop-16-bytes]], the training state per device is

| stage | sharded | bytes per device |
|---|---|---|
| none (plain DP) | — | $16N$ |
| ZeRO-1 | optimiser state | $4N + 12N/n_{\text{DP}}$ |
| ZeRO-2 | optimiser state, gradients | $2N + 14N/n_{\text{DP}}$ |
| ZeRO-3 / FSDP | optimiser state, gradients, weights | $16N/n_{\text{DP}}$ |
:::

::: proof
Each stage keeps the unsharded items in full and $1/n_{\text{DP}}$ of the sharded ones. ZeRO-1 keeps weights and gradients ($2N + 2N$) and shards the $12N$ of optimiser state. ZeRO-2 keeps weights ($2N$) and shards gradients and optimiser state ($2N + 12N = 14N$): gradients are **reduce-scattered** so that each device receives the averaged gradient only for its own shard, which costs no more communication than an all-reduce. ZeRO-3 shards everything; weights are **all-gathered** layer by layer just before they are needed in the forward and backward passes and discarded afterwards, adding about $50\%$ to data-parallel communication. PyTorch's Fully Sharded Data Parallel (FSDP; Zhao et al., 2023) implements the ZeRO-3 scheme.
:::

::: example Fitting a 70-billion-parameter model {#ex-zero}
For $N = 7\times10^{10}$ and $n_{\text{DP}} = 64$, compute the training state per device without sharding and with each ZeRO stage.
::: solution
Plain DP: $16\cdot7\times10^{10} = 1120$ GB. ZeRO-1: $4N + 12N/64 = 280 + 13.1 = 293$ GB. ZeRO-2: $2N + 14N/64 = 140 + 15.3 = 155$ GB. ZeRO-3: $1120/64 = 17.5$ GB. Only full sharding (or sharding combined with tensor and pipeline parallelism) brings the state within the memory of a single accelerator, with room left for activations.
:::
:::

**Activations.** The backward pass needs the activations of the forward pass, and for long sequences and large batches they can exceed the training state. **Activation checkpointing** (recomputation; Chen et al., 2016) stores only the inputs of each block and recomputes the rest during the backward pass, trading memory for one extra forward pass — about a third more compute ($8ND$ instead of $6ND$) if everything is recomputed, less with **selective** recomputation of only the cheap-to-recompute, memory-hungry parts such as attention scores (Korthikanti et al., 2022).

::: quiz
Which of these reduces the memory needed per device for Adam's moment estimates?
- [ ] Gradient accumulation
- [x] ZeRO stage 1
- [ ] Activation checkpointing
- [x] Tensor parallelism
::: solution
ZeRO-1 shards the optimiser state across data-parallel replicas, and tensor parallelism splits each weight matrix — and therefore its optimiser state — across devices. Gradient accumulation reduces activation memory per step by using smaller micro-batches, and activation checkpointing reduces activation memory by recomputation; neither changes the optimiser state.
:::
:::

## Checkpoints and failures {#sec-checkpoints}

A run on thousands of devices for weeks will be interrupted. The Llama 3 report (2024) recorded $466$ job interruptions in a $54$-day period of pretraining on up to $16{,}384$ accelerators, $419$ of them unexpected — mostly hardware failures — and still achieved more than $90\%$ effective training time through automation. The defence is the **checkpoint**: everything needed to resume exactly — weights (usually the float32 master copy), optimiser moments, step counter and scheduler state, random-generator states, and the position in the data stream ([[neural-networks/training-practice#sec-reproducibility]]). For a $70$-billion-parameter model that is about $12$ bytes per parameter, $840$ GB.

How often to save? Saving costs time; saving rarely loses more work per failure.

::: proposition Optimal checkpoint interval (Young, 1974) {#prop-young}
Suppose saving a checkpoint takes time $\delta$, failures occur at random with mean time between failures $M\gg\delta$, and after a failure the run resumes from the last checkpoint. With checkpoints every $\tau$ units of compute time, the fraction of time lost is approximately

$$
f(\tau) = \frac{\delta}{\tau} + \frac{\tau}{2M},
$$ {#eq-young}

which is minimised at $\tau^\ast = \sqrt{2\delta M}$, where $f(\tau^\ast) = \sqrt{2\delta/M}$.
:::

::: proof
Each interval of $\tau$ productive time costs an extra $\delta$ for saving, a fraction $\delta/\tau$. A failure strikes at a time roughly uniform within an interval, so on average $\tau/2$ of work since the last checkpoint is lost; failures happen at rate $1/M$, so the expected loss per unit time is $\tau/(2M)$ (ignoring restart time and failures during saving, which is accurate when $\tau, \delta\ll M$). Setting $f'(\tau) = -\delta/\tau^2 + 1/(2M) = 0$ gives $\tau^\ast = \sqrt{2\delta M}$; $f'' > 0$ so it is a minimum, and substituting gives $\delta/\sqrt{2\delta M} + \sqrt{2\delta M}/(2M) = 2\sqrt{\delta/(2M)} = \sqrt{2\delta/M}$.
:::

::: example How often to checkpoint {#ex-young}
Take the failure rate implied by the Llama 3 figures — $419$ unexpected interruptions in $54$ days, $M = 54\cdot24/419 = 3.1$ hours — and a checkpoint that blocks training for $\delta = 5$ minutes. What interval minimises lost time, and what fraction is lost? What if asynchronous saving reduces the blocking time to $1$ minute?
::: solution
$\delta = 5/60$ h: $\tau^\ast = \sqrt{2\cdot0.0833\cdot3.09} = 0.72$ h, about $43$ minutes, and $f = \sqrt{2\cdot0.0833/3.09} = 23\%$ of the time lost — far too much. With $\delta = 1$ minute: $\tau^\ast = 19$ minutes and $f = 10\%$. Restart time adds to this. Large runs therefore save asynchronously (copying state to host memory and writing it in the background), keep in-memory copies on peer devices, and invest in detecting and replacing failed nodes quickly, which together bring the effective time above $90\%$.
:::
:::

**Monitoring.** Besides checkpoints, a run logs at every step the training loss, the gradient norm before clipping, the learning rate, throughput and MFU; at intervals, validation losses per domain and downstream evaluations ([[pretraining/in-training-evaluation]]); and statistics that warn of instability, such as the largest attention logits and the norm of the output logits ([[pretraining/training-stability]]).

::: warning A smooth loss curve is not evidence that the data pipeline is right
Many of the most expensive mistakes in pretraining are invisible in the loss: a data loader that silently repeats one shard, a shuffling bug that feeds domains in blocks, a tokeniser mismatch between training and evaluation, a resumed run that restarts the data stream from the beginning, or documents truncated at a fixed length. The loss keeps falling in all of these cases. Log which data each step consumed, check the realised mixture against the plan ([[pretraining/data-mixtures#sec-code]]), and compare per-domain validation losses rather than only the aggregate.
:::

## A miniature loop {#sec-code}

The listing puts the pieces together at toy scale: the bigram model of [[pretraining/pretraining-objectives#sec-code]], trained on the Dickens passage with random batches of $B = 32$ sequences of $T = 8$ characters (so $256$ targets per step), AdamW with $\beta_2 = 0.95$ and weight decay $0.1$, global-norm clipping at $1.0$, warm-up for $20$ steps and cosine decay to $10\%$. The last $56$ characters are held out for validation. Finally it saves a checkpoint after $150$ steps, "crashes", resumes, and checks that the result equals the uninterrupted run exactly.

```python
import copy, math, random

text = ("it was the best of times, it was the worst of times, it was the age of "
        "wisdom, it was the age of foolishness, it was the epoch of belief, it was "
        "the epoch of incredulity, it was the season of light, it was the season of "
        "darkness, it was the spring of hope, it was the winter of despair, we had "
        "everything before us, we had nothing before us, we were all going direct to "
        "heaven, we were all going direct the other way")   # Dickens, 1859: public domain
chars = sorted(set(text)); V = len(chars)
ids = [chars.index(ch) for ch in text]
train, val = ids[:360], ids[360:]                         # last 56 characters held out

def lr_at(step, peak=0.1, warmup=20, total=300, floor=0.1):   # warm-up + cosine to 10%
    if step < warmup: return peak * (step + 1) / warmup
    p = (step - warmup) / (total - warmup)
    return peak * (floor + (1 - floor) * 0.5 * (1 + math.cos(math.pi * p)))

def loss_grad(W, pairs):
    G = [[0.0] * V for _ in range(V)]; L = 0.0
    for a, b in pairs:
        m = max(W[a]); e = [math.exp(z - m) for z in W[a]]; s = sum(e)
        L -= W[a][b] - m - math.log(s)
        for j in range(V): G[a][j] += e[j] / s / len(pairs)
        G[a][b] -= 1 / len(pairs)
    return L / len(pairs), G

def new_state(seed):
    rng = random.Random(seed)
    return {"step": 0, "W": [[rng.gauss(0, 0.02) for _ in range(V)] for _ in range(V)],
            "m": [[0.0] * V for _ in range(V)], "v": [[0.0] * V for _ in range(V)],
            "rng": rng.getstate(), "log": []}

def train_steps(state, n, B=32, T=8, b1=0.9, b2=0.95, eps=1e-8, wd=0.1, clip=1.0, total=300):
    rng = random.Random(); rng.setstate(state["rng"])
    W, m, v = state["W"], state["m"], state["v"]
    for _ in range(n):
        t = state["step"]
        starts = [rng.randrange(len(train) - T) for _ in range(B)]       # B sequences of T+1 ids
        pairs = [(train[s + i], train[s + i + 1]) for s in starts for i in range(T)]
        L, G = loss_grad(W, pairs)                                        # B*T = 256 targets
        gnorm = math.sqrt(sum(g * g for row in G for g in row))
        scale = min(1.0, clip / (gnorm + 1e-12))                          # global-norm clipping
        lr = lr_at(t, total=total)
        for i in range(V):
            for j in range(V):
                g = G[i][j] * scale
                m[i][j] = b1 * m[i][j] + (1 - b1) * g
                v[i][j] = b2 * v[i][j] + (1 - b2) * g * g
                mh, vh = m[i][j] / (1 - b1 ** (t + 1)), v[i][j] / (1 - b2 ** (t + 1))
                W[i][j] -= lr * (mh / (math.sqrt(vh) + eps) + wd * W[i][j])   # AdamW
        state["step"] = t + 1
        if (t + 1) % 25 == 0 or t == 0:
            vl, _ = loss_grad(W, list(zip(val[:-1], val[1:])))
            state["log"].append((t + 1, round(L, 4), round(vl, 4), round(gnorm, 3), round(lr, 4)))
    state["rng"] = rng.getstate()
    return state

run = train_steps(new_state(0), 300)
print("step  train   val     grad-norm  lr")
for row in run["log"]: print(*row, sep="  ")

# checkpoint after 150 steps, "crash", resume from the checkpoint: identical result
a = train_steps(new_state(0), 150)
ckpt = copy.deepcopy(a)                   # weights, Adam moments, step, data-RNG state
b = train_steps(ckpt, 150)
print("resumed run matches uninterrupted run:", b["W"] == run["W"])
```

```text
step  train   val     grad-norm  lr
1  3.1797  3.172  0.132  0.005
25  1.9263  2.4806  0.087  0.1
50  1.482  2.5551  0.048  0.0976
75  1.5471  2.6199  0.044  0.092
100  1.5344  2.6845  0.045  0.0835
125  1.6085  2.7953  0.047  0.0727
150  1.6062  2.8471  0.057  0.0605
175  1.6465  2.8967  0.046  0.048
200  1.489  2.9175  0.055  0.0359
225  1.4939  2.9647  0.048  0.0254
250  1.5709  3.0027  0.044  0.0172
275  1.589  3.0146  0.06  0.0119
300  1.6453  3.0338  0.051  0.01
resumed run matches uninterrupted run: True
```

The first loss is $\ln 24 = 3.18$, as expected. The training loss fluctuates around $1.5$–$1.6$ from batch to batch, because each batch is a different random sample of $256$ pairs, while the validation loss reaches its minimum of $2.48$ near step $25$ and then rises steadily: by step $300$ the model has seen $76{,}800$ targets from a $360$-character text, more than $200$ epochs, and is memorising it — an extreme case of the repetition discussed in [[pretraining/data-mixtures#sec-epochs]]. The gradient norm never exceeds $1$, so clipping never acts here; in large runs it acts mainly during spikes. The resumed run is bit-for-bit identical because the checkpoint holds the optimiser moments, the step counter (which fixes the learning rate and Adam's bias correction) and the state of the data sampler; leave out any of them and the two runs diverge.

::: history
Large-batch synchronous data parallelism became practical with Goyal et al. (2017), who trained an image model in an hour with linear learning-rate scaling and warm-up. Shoeybi et al. (2019) introduced Megatron-LM's tensor parallelism and Huang et al. (2019) GPipe's pipeline parallelism; Narayanan et al. (2021) combined them with data parallelism to train models with a trillion parameters. Rajbhandari et al. (2020) introduced ZeRO, implemented in DeepSpeed, and PyTorch's FSDP (Zhao et al., 2023) brought the same sharding to a mainstream framework. Chen et al. (2016) introduced activation checkpointing. Kaplan et al. (2020) popularised the $6ND$ estimate of training compute, Chowdhery et al. (2022) defined MFU in the PaLM report, and Hoffmann et al. (2022) studied matching cosine schedules to run length; Hu et al. (2024) introduced WSD schedules with MiniCPM. Young (1974) derived the optimal checkpoint interval for long computations long before neural networks needed it.
:::

::: summary
- A step processes $B\cdot T$ tokens, with $B = b_{\text{micro}}\cdot A\cdot n_{\text{DP}}$; documents are packed into fixed-length rows; a run takes $D/(BT)$ steps, typically hundreds of thousands with batches of millions of tokens.
- Training costs $C\approx6ND$ FLOPs: $2N$ per token forward and twice that backward, plus an attention term of relative size about $T/(12d)$.
- **MFU** is model FLOPs per second over peak; training time is $6ND/(n_{\text{dev}}FU)$, and large runs report MFU of roughly $30$–$55\%$.
- AdamW ($\beta_2 = 0.95$, weight decay $0.1$, clipping at $1$) with **warm-up** and **cosine** or **WSD** decay is the standard recipe; WSD allows decays to be branched off any checkpoint.
- Mixed-precision Adam needs **16 bytes per parameter**; **data, tensor and pipeline parallelism** split the work (pipeline bubble $(p-1)/(m+p-1)$), and **ZeRO/FSDP** shard the state down to $16N/n_{\text{DP}}$ bytes per device; activation checkpointing trades compute for activation memory.
- **Checkpoints** must hold everything needed for exact resumption; with failures every $M$ hours and save time $\delta$, the best interval is about $\sqrt{2\delta M}$, which pushes large runs towards fast asynchronous saving.
:::

## Exercises

::: exercise Tokens per batch {level=1 check="2097152"}
A batch holds $512$ sequences of $4096$ tokens. How many tokens is that?
::: solution
$512\cdot4096 = 2{,}097{,}152$, about $2.1$ million tokens.
:::
:::

::: exercise Training compute {level=1 check="3.15e23"}
Using $C = 6ND$, how many FLOPs does it take to train a $70$-billion-parameter model on $750$ billion tokens? Give three significant figures.
::: solution
$6\cdot7\times10^{10}\cdot7.5\times10^{11} = 3.15\times10^{23}$ FLOPs.
:::
:::

::: exercise Pipeline bubble {level=1 check="0.2"}
What fraction of time is idle in a pipeline with $p = 5$ stages and $m = 16$ micro-batches?
::: solution
$(p-1)/(m+p-1) = 4/20 = 0.2$, by [[#prop-bubble]].
:::
:::

::: exercise MFU {level=2 check="0.45"}
A $13$-billion-parameter model trains at $5.77\times10^6$ tokens per second on $1000$ devices with a peak of $10^{15}$ FLOP/s each. Compute its MFU to two decimal places, ignoring the attention term.
::: solution
$6\cdot1.3\times10^{10}\cdot5.77\times10^6 = 4.50\times10^{17}$ model FLOP/s, over a peak of $10^{18}$: MFU $= 0.45$.
:::
:::

::: exercise ZeRO-2 memory {level=2 check="30.47"}
A model has $N = 1.25\times10^{10}$ parameters and is trained with $n_{\text{DP}} = 32$ data-parallel devices. How many gigabytes ($10^9$ bytes) of training state does each device hold under ZeRO-2? Give two decimal places.
::: solution
$2N + 14N/32 = 25 + 5.46875 = 30.47$ GB. (Without sharding it would be $16N = 200$ GB.)
:::
:::

::: exercise Steps and warm-up {level=2}
A run of $3$ trillion tokens uses batches of $6$ million tokens and a warm-up of $2000$ steps. How many steps does it take, how many tokens are spent in warm-up, and what fraction of the run is that? GPT-3 warmed up over $375$ million tokens; compare.
::: solution
$3\times10^{12}/6\times10^6 = 500{,}000$ steps. Warm-up: $2000\cdot6\times10^6 = 1.2\times10^{10}$ tokens, $0.4\%$ of the run. GPT-3's $375$ million tokens was about $0.1\%$ of its $300$ billion. Warm-up is short in both cases; its purpose is to get through the first unstable steps, not to shape the run.
:::
:::

::: exercise Checkpoint interval {level=2 check="0.4"}
Failures occur on average every $M = 8$ hours and a blocking checkpoint takes $\delta = 0.01$ hours. Find the optimal interval $\tau^\ast$ in hours from [[#prop-young]], and the lost fraction.
::: solution
$\tau^\ast = \sqrt{2\cdot0.01\cdot8} = \sqrt{0.16} = 0.4$ h ($24$ minutes); $f = \sqrt{2\cdot0.01/8} = 0.05$, so $5\%$ of the time is lost to saving and recomputation.
:::
:::

::: exercise The attention term {level=2}
For a model with $d = 8192$ and $n_{\text{layer}} = 80$ ($N\approx12n_{\text{layer}}d^2$), at what context length does the attention term of [[#eq-6nd]] equal $25\%$ of $6N$? Discuss what this means for long-context pretraining.
::: solution
The ratio is $n_{\text{layer}}Td/N = T/(12d)$, which equals $0.25$ at $T = 3d = 24{,}576$ tokens. At $T = 8192$ the term adds $8\%$, at $128$K tokens $130\%$. Training at long context is therefore done only for a small part of the run (and with attention kernels that avoid materialising the $T\times T$ score matrix, [[transformers/attention-complexity#sec-flash]]); most tokens are processed at a few thousand tokens of context ([[pretraining/continued-pretraining]]).
:::
:::

::: exercise All-reduce traffic {level=3}
In a ring all-reduce over $n$ devices, each device sends and receives $2(n-1)/n$ times the size of the buffer. For plain data parallelism on a $7$-billion-parameter model with bfloat16 gradients, how many bytes does each device send per step for $n = 64$? If each device's link sustains $50$ GB/s and the step's computation takes $1.5$ s, can communication be hidden by overlapping it with the backward pass? How does ZeRO-3 change the traffic?
::: solution
Buffer: $2\cdot7\times10^9 = 14$ GB. Traffic: $2\cdot(63/64)\cdot14 = 27.6$ GB per device per step, taking $27.6/50 = 0.55$ s. That is less than the $1.5$ s of computation, and since gradients of late layers are ready early in the backward pass, buckets of gradients can be all-reduced while earlier layers are still being differentiated, so most of it can be hidden. ZeRO-3 replaces the all-reduce by a reduce-scatter of gradients (half the traffic, $13.8$ GB) plus all-gathers of the weights in the forward and backward passes ($2\cdot13.8$ GB), for about $41$ GB in total, $1.5$ times as much — the price of storing only $1/64$ of the state.
:::
:::

::: exercise Deriving 6 from the backward pass {level=3}
For a single linear layer $Y = XW$ with $X\in\R^{n\times d_{\text{in}}}$, $W\in\R^{d_{\text{in}}\times d_{\text{out}}}$, count the FLOPs of the forward product, of $\bar X = \bar YW^\top$ and of $\bar W = X^\top\bar Y$, and show that the total is $6$ FLOPs per parameter per row of $X$. Which of the two backward products could be skipped for the first layer of a network, and why does that not change $6ND$ appreciably?
::: solution
Each of the three products multiplies matrices with inner dimension $d_{\text{in}}$ or $d_{\text{out}}$ or $n$ and costs $2nd_{\text{in}}d_{\text{out}}$ FLOPs: forward $XW$ ($n\times d_{\text{in}}$ times $d_{\text{in}}\times d_{\text{out}}$), $\bar YW^\top$ ($n\times d_{\text{out}}$ times $d_{\text{out}}\times d_{\text{in}}$), and $X^\top\bar Y$ ($d_{\text{in}}\times n$ times $n\times d_{\text{out}}$). Total $6nd_{\text{in}}d_{\text{out}}$, that is $6$ FLOPs per parameter per row (token). For the first layer the gradient with respect to the input is not needed — the inputs are embeddings looked up from a table, whose gradient is obtained by scattering $\bar X$, or are data — so $\bar X$ can be skipped there. That saves $2nd_{\text{in}}d_{\text{out}}$ for one layer out of hundreds of matrices, a negligible fraction of $6ND$.
:::
:::
