A company that builds robot arms will rarely train a vision-language-action model from nothing. The economics point the other way: a vision-language model costs millions of GPU-hours to pretrain, and a generalist robot model trained on hundreds of thousands of demonstrations from many robots is available, with open weights, from several groups (as of 2026). The practical question is how to take such a model and make it good at *your* tasks on *your* arm — with your kinematics, cameras, gripper and control rate — using a few hundred or a few thousand demonstrations, without destroying what made the pretrained model worth starting from.

This chapter follows the training pipeline of a VLA from the outside in. We describe the stages (VLM pretraining, robot pretraining, post-training), how **pretraining mixtures** of many datasets are weighted, why robot training is **co-trained** with web data, and how data from different robots are made compatible by **cross-embodiment normalisation**. We then turn to the decision a team actually faces: **full fine-tuning** or a **parameter-efficient** method such as LoRA, with the memory and compute worked out, and finish with the amount of data, the hyperparameters and the signs that a fine-tuned policy is overfitting or forgetting. The architectures are those of [[vision-language-action/vla-architectures]]; the data are those of [[vision-language-action/demonstration-data]]. For the general machinery of fine-tuning large models see the LLM Atlas on [instruction tuning](/learn/llm/lesson.php?c=post-training&l=instruction-tuning), [parameter-efficient fine-tuning](/learn/llm/lesson.php?c=post-training&l=parameter-efficient-tuning) and [data mixtures](/learn/llm/lesson.php?c=pretraining&l=data-mixtures).

## The training pipeline {#sec-pipeline}

A VLA is trained in up to three stages, each starting from the weights of the previous one.

1. **VLM pretraining.** A vision encoder and a language model are pretrained separately on web data and joined into a vision-language model trained on image–text pairs, captions and visual question answering. Robot teams usually take this stage as given (PaliGemma, Llama-based Prismatic, Gemini, Eagle and others).
2. **Robot pretraining.** The VLM is trained on a large mixture of robot demonstrations from many embodiments and tasks — public datasets such as Open X-Embodiment and DROID, plus private data — often together with web data. This produces the "base" or "generalist" robot model.
3. **Post-training or fine-tuning.** The base model is trained on a smaller set of high-quality demonstrations for a target robot, task or family of tasks. π0's authors described this split as analogous to pretraining and alignment of language models: broad, diverse, imperfect data in pretraining; curated, consistent data in post-training.

A company typically enters at stage 3, and sometimes runs a light version of stage 2 on its own multi-task data.

## Pretraining mixtures {#sec-mixtures}

The datasets pooled for robot pretraining differ in size by orders of magnitude. Sampling training examples in proportion to dataset size lets the largest dominate; sampling equally over-repeats the smallest.

::: definition Mixture weights and temperature sampling {#def-mixture}
A **data mixture** draws each training example from dataset $i$ with probability $w_i$, $\sum_i w_i = 1$. With **temperature sampling** the weights are
$$
w_i = \frac{n_i^{\alpha}}{\sum_j n_j^{\alpha}},\qquad 0\le\alpha\le1,
$$ {#eq-temperature}
where $n_i$ is the size of dataset $i$ (in episodes, steps or hours): $\alpha = 1$ is proportional sampling and $\alpha = 0$ uniform sampling over datasets. The **effective number of epochs** of dataset $i$ after $S$ sampled examples is $S w_i/n_i$.
:::

In practice, the robot-learning mixtures published with Octo and OpenVLA (2024) were hand-curated: datasets were filtered for quality and relevance (single-arm manipulation, a third-person camera, usable actions), then weighted manually, with some datasets down-weighted for low diversity. Proportional or temperature weights are a sensible starting point when nothing better is known.

::: example Weighting three datasets {#ex-mixture}
A pretraining mixture contains a public dataset of $10^6$ steps, a second of $10^5$ steps and the company's own data of $2\times10^3$ steps. (a) Find the weights for $\alpha = 1$, $0.5$ and $0.3$. (b) For $S = 10^6$ sampled steps with $\alpha = 0.5$, how many epochs is that of each dataset?
::: solution
(a) $\alpha = 1$: weights $\propto 10^6 : 10^5 : 2000$, i.e. $0.907, 0.091, 0.002$. $\alpha = 0.5$: $\propto 1000 : 316.2 : 44.7$, i.e. $0.735, 0.232, 0.033$. $\alpha = 0.3$: $\propto 63.1 : 31.6 : 9.8$, i.e. $0.604, 0.303, 0.094$.
(b) Epochs $= S w_i/n_i$: $10^6\times0.735/10^6 = 0.73$; $10^6\times0.232/10^5 = 2.3$; $10^6\times0.033/2000 = 16$.
Sanity check: as $\alpha$ falls, the small dataset gains weight and is repeated more; 16 epochs of 2,000 steps is already enough to risk memorising it. For data this small relative to the rest, the usual choice is not to up-weight it in pretraining but to use it for fine-tuning afterwards.
:::
:::

::: widget plot
f: 1e6^x/(1e6^x + 1e5^x + 2e3^x); 1e5^x/(1e6^x + 1e5^x + 2e3^x); 2e3^x/(1e6^x + 1e5^x + 2e3^x)
x: 0, 1
y: 0, 1
labels: n = 10^6; n = 10^5; n = 2\times10^3
caption: Temperature-sampling weights of three datasets of very different sizes against the exponent $\alpha$ (horizontal axis). At $\alpha = 1$ the largest dataset takes 91% of the samples; at $\alpha = 0$ each takes a third. Notice how slowly the smallest dataset gains weight until $\alpha$ is well below 0.5.
:::

### Co-training with web data

Training a VLM only on robot actions changes its weights in ways that degrade its language and vision abilities — **catastrophic forgetting**. The robot data contain few words (a short instruction per episode) and a narrow range of images (the same lab table), so the model's broad knowledge, the reason for using a VLM in the first place, erodes. RT-2 (2023) addressed this by **co-fine-tuning**: each batch mixed robot trajectories with the VLM's original web tasks, and its authors found that this improved generalisation to new objects and instructions compared with fine-tuning on robot data alone. π0.5 (2025) co-trained on robot data from many embodiments together with captioning, visual question answering, object detection and high-level subtask prediction, and reported that removing the web data hurt generalisation to unseen objects most.

A second mechanism of forgetting is specific to action-expert models: the gradients of the freshly initialised action expert flow into the pretrained backbone and can disturb it early in training. Physical Intelligence reported in 2025 that blocking these gradients ("knowledge insulation") — training the backbone on discrete action tokens and web data, and the action expert on continuous actions without back-propagating into the backbone — trained faster and preserved language following better. The general lesson: *protect the backbone*, by mixing in its original data, by lower learning rates for its weights, by freezing parts of it, or by limiting which gradients reach it.

## Cross-embodiment training {#sec-embodiment}

Data from different robots differ in action dimension (6, 7 or 14 joints, with or without a mobile base), in action space (joint or end-effector, absolute or delta), in units and frames, in control rate (3 to 50 Hz in Open X-Embodiment) and in camera placement. A model can learn from all of them only if these differences are either removed or made visible to it.

::: definition Per-dataset action normalisation {#def-normalisation}
For each dataset (or embodiment) $e$ and action dimension $j$, compute statistics of the training actions — the mean $\mu^e_j$ and standard deviation $\sigma^e_j$, or the 1st and 99th percentiles $q^e_{01,j}, q^e_{99,j}$ — and train on normalised actions
$$
\bar a_j = \frac{a_j - \mu^e_j}{\sigma^e_j}\qquad\text{or}\qquad \bar a_j = 2\,\frac{a_j - q^e_{01,j}}{q^e_{99,j} - q^e_{01,j}} - 1 ,
$$ {#eq-normalise}
clipping to a fixed range in the second case. At deployment the model's output is un-normalised with the statistics of the embodiment it is running on.
:::

Normalisation puts every robot's actions on a comparable scale, so that one robot's small deltas are not drowned by another's large ones. It does not make the actions *mean* the same thing: a normalised value of 0.8 on the first dimension of a joint-space dataset and of an end-effector dataset command different motions. Models handle this by:

- **padding and masking**: all action vectors are padded with zeros to the largest dimension in the mixture, and the loss is masked on padded entries (π0 pads to the largest action dimension of its robots);
- **embodiment-specific heads or encoders**: separate small input and output layers per embodiment, as in Octo's design for new action spaces and in GR00T N1's embodiment-specific modules, with the shared Transformer in between;
- **conditioning**: an embodiment identifier, the robot state, or a description of the action space given as input;
- **common time base**: re-sampling chunks so that a chunk represents a fixed duration (say 1 s) whatever the control rate.

::: example A normalisation mismatch {#ex-norm}
Robot A records end-effector $x$-deltas with 1st and 99th percentiles $\mp0.020\,\mathrm m$ (at 5 Hz); robot B with $\mp0.005\,\mathrm m$ (at 20 Hz). (a) Normalise a delta of $0.004\,\mathrm m$ from robot B with B's statistics and with A's. (b) A policy fine-tuned for robot B outputs $\bar a = 0.8$; what motion results if the deployment code un-normalises with A's statistics by mistake? (c) Why do the two robots' ranges differ by a factor of four?
::: solution
(a) With B's: $2(0.004 + 0.005)/0.010 - 1 = 0.80$. With A's: $2(0.004 + 0.020)/0.040 - 1 = 0.20$.
(b) Inverting [[#eq-normalise]] with A's statistics: $a = q_{01} + (\bar a + 1)(q_{99} - q_{01})/2 = -0.020 + 1.8\times0.020 = 0.016\,\mathrm m$ — four times the intended $0.004\,\mathrm m$ per step, at 20 Hz a speed of $0.32\,\mathrm{m/s}$ instead of $0.08\,\mathrm{m/s}$.
(c) The control rates differ by four: the same hand speed gives deltas four times smaller at 20 Hz. Sanity check: $0.020\times5 = 0.005\times20 = 0.10\,\mathrm{m/s}$ — both datasets have the same typical speed. Store normalisation statistics *with the model checkpoint and the embodiment name*, and have the deployment code refuse to run if they are missing.
:::
:::

::: warning Normalisation statistics are part of the model
A fine-tuned checkpoint without the action statistics it was trained with is incomplete. Recomputing them from a different dataset (even a newer version of the same one), or using the base model's statistics after fine-tuning on a new arm, scales every motion wrongly — and the error is invisible offline, because training and validation used the right statistics. Version and ship the statistics with the weights, and add a deployment check that the embodiment name matches.
:::

## Full fine-tuning and LoRA {#sec-lora}

**Full fine-tuning** updates every parameter. It gives the model the most freedom to adapt, and is what most published VLA post-training uses when compute allows. Its memory cost is dominated by the optimiser.

::: proposition Memory for full fine-tuning with Adam {#prop-memory}
Training a model of $P$ parameters with the Adam optimiser in mixed precision (bf16 weights and gradients for computation, fp32 master weights and two fp32 moment estimates) needs about
$$
M \approx (2 + 2 + 4 + 4 + 4)\,P = 16P\ \text{bytes}
$$ {#eq-memory}
for weights, gradients and optimiser state, plus the activations, which grow with batch size and sequence length.
:::

::: proof
Count bytes per parameter: the bf16 copy of the weights used in the forward and backward passes, 2; the bf16 gradient, 2; the fp32 master copy that the optimiser updates (so that small updates are not lost to bf16 rounding), 4; Adam's first-moment estimate $m$, 4; and its second-moment estimate $v$, 4. The total is 16. Variants change the count — fp32 gradients add 2, 8-bit optimiser states save about 6, sharding across $G$ GPUs divides the state by $G$ — but the order of magnitude is unchanged. Activations are not proportional to $P$ and are counted separately.
:::

For a 7-billion-parameter model, [[#eq-memory]] gives 112 GB before activations — more than one 80 GB accelerator, so the state must be sharded over several. **Low-rank adaptation** (LoRA; Hu et al., 2021) avoids this by freezing the pretrained weights and learning a small correction.

::: definition Low-rank adaptation (LoRA) {#def-lora}
For a frozen pretrained weight matrix $\mathbf W_0\in\R^{m\times k}$, LoRA learns matrices $\mathbf B\in\R^{m\times r}$ and $\mathbf A\in\R^{r\times k}$ with rank $r\ll\min(m,k)$ and uses
$$
\mathbf W = \mathbf W_0 + \frac{\alpha_{\mathrm L}}{r}\,\mathbf B\mathbf A ,
$$ {#eq-lora}
where $\alpha_{\mathrm L}$ is a fixed scaling constant. $\mathbf B$ is initialised to zero, so training starts from the pretrained model. Only $\mathbf A$ and $\mathbf B$ are trained.
:::

::: proposition LoRA parameter count and merging {#prop-lora}
A LoRA adapter of rank $r$ on an $m\times k$ matrix has $r(m+k)$ trainable parameters, a fraction $r(m+k)/(mk)$ of the matrix. After training, the adapter can be merged, $\mathbf W = \mathbf W_0 + (\alpha_{\mathrm L}/r)\mathbf B\mathbf A$, into a matrix of the original shape, so that inference costs exactly as much as for the original model.
:::

::: proof
$\mathbf B$ has $mr$ entries and $\mathbf A$ has $rk$, total $r(m+k)$; dividing by $mk$ gives the fraction. The product $\mathbf B\mathbf A$ is an $m\times k$ matrix (of rank at most $r$), so $\mathbf W_0 + (\alpha_{\mathrm L}/r)\mathbf B\mathbf A$ is an ordinary $m\times k$ matrix; the layer's output $\mathbf W\mathbf x = \mathbf W_0\mathbf x + (\alpha_{\mathrm L}/r)\mathbf B(\mathbf A\mathbf x)$ is the same whether computed from the merged matrix or from the separate factors.
:::

::: example LoRA on a 7-billion-parameter backbone {#ex-lora}
A Llama-2-7B-type language model has 32 layers of width $d = 4096$ and MLP width $11\,008$; each layer has four $4096\times4096$ attention projections, two $4096\times11\,008$ MLP input projections and one $11\,008\times4096$ output projection. LoRA of rank $r = 32$ is applied to all seven matrices in every layer. (a) Count the trainable parameters. (b) Compare the memory with full fine-tuning (16 bytes per trained parameter, 2 bytes per frozen parameter in bf16). (c) What does 4-bit storage of the frozen weights save?
::: solution
(a) Per layer: attention $4\times32\times(4096 + 4096) = 1\,048\,576$; MLP inputs $2\times32\times(4096 + 11\,008) = 966\,656$; MLP output $32\times(11\,008 + 4096) = 483\,328$; total $2\,498\,560$. Over 32 layers: $79.95\times10^6$, about 80 million — 1.2% of the model's 6.7 billion parameters.
(b) Full fine-tuning: $16\times6.7\times10^9 = 108\,\mathrm{GB}$ (112 GB for a round 7 billion). LoRA: frozen weights $2\times6.7\times10^9 = 13.5\,\mathrm{GB}$, plus $16\times80\times10^6 = 1.3\,\mathrm{GB}$ for the adapters and their optimiser state: about $15\,\mathrm{GB}$ plus activations — feasible on a single 24–48 GB GPU.
(c) Frozen weights in 4 bits take $3.4\,\mathrm{GB}$ instead of $13.5\,\mathrm{GB}$ (the QLoRA approach), at some cost in speed and possibly accuracy; total about $5\,\mathrm{GB}$ plus activations.
Sanity check: the adapter count is linear in $r$; rank 8 gives 20 million and rank 64 gives 160 million. Activations (and with them, batch size and image count) often decide the GPU in practice.
:::
:::

::: widget plot
f: 16*x; 2*x + 16*0.012*x*r/32; 0.5*x + 16*0.012*x*r/32
x: 0.5, 15
y: 0, 250
sliders: r=4:4:128
labels: \text{full fine-tuning}; \text{LoRA, bf16 base}; \text{LoRA, 4-bit base}
caption: Memory for weights, gradients and optimiser state (GB, excluding activations) against model size in billions of parameters, for full fine-tuning with Adam (16 bytes per parameter) and for LoRA of rank $r$ with a frozen base in bf16 or 4 bits (adapter size scaled from the 1.2% of rank 32 in the worked example). Move $r$: even at rank 128 the adapters cost less than the frozen base. The horizontal gridline you care about is your GPU's memory.
:::

Which to choose? The OpenVLA authors reported in 2024 that LoRA fine-tuning matched full fine-tuning on their adaptation tasks at a fraction of the compute. In general, as of 2026, full fine-tuning is preferred when the target data are large and different from pretraining (a new embodiment, high-frequency dexterous control) and compute is available; LoRA when data are modest, when many task-specific variants of one base model must be kept (each adapter is small), or when memory is the constraint. Intermediate options are common: freezing the vision encoder (which already sees well) and fine-tuning the rest; or training the action head and the last layers only.

::: quiz
A team fine-tunes a 3B VLA with LoRA of rank 16 on 150 demonstrations for a new task. Success is 40%, and full fine-tuning on the same data gives 75%. Which explanation is most plausible?
- [ ] LoRA cannot change the behaviour of a model at all.
- [x] The new task needs larger changes than the rank-16 adapters on the chosen layers can express (for example in the action head or a new action space); try a higher rank, adapters on more layers, or training the action head fully.
- [ ] Full fine-tuning always memorises, so the 75% must be an evaluation error.
::: solution
LoRA restricts each weight update to low rank on the chosen matrices. If the action head is newly initialised or the action space differs from pretraining, the needed change may not be low-rank, or may lie in layers without adapters. Training the head fully and putting adapters on all linear layers, or raising $r$, usually closes much of the gap; check also that the learning rate was set for LoRA (typically higher than for full fine-tuning).
:::
:::

## Data, compute and hyperparameters {#sec-hyper}

**How much data.** Reported fine-tuning set sizes for VLAs range from tens of demonstrations for simple pick-and-place on a familiar arm to tens or hundreds of hours for long dexterous tasks (2024–26 reports). A new embodiment — one the base model has never seen — needs more than a new task on a familiar one, since the model must learn a new mapping from intent to joint motion. Diversity (scenes, objects, initial conditions) is worth more than repetitions ([[vision-language-action/demonstration-data]]).

**Compute.** Training a Transformer costs about $6P$ FLOP per token (forward $2P$, backward $4P$) for the trained part; with a frozen base and LoRA, the backward pass still propagates through the frozen layers, so the saving in compute is smaller than the saving in memory.

::: example GPU-hours for a fine-tuning run {#ex-compute}
A 3B VLA is fully fine-tuned for 30,000 steps at batch size 32, each sample having about 850 tokens. (a) Estimate the FLOP and the GPU-hours at an achieved $4\times10^{14}$ FLOP/s per GPU. (b) The dataset has 200 demonstrations of 300 steps each; how many epochs is that?
::: solution
(a) $6\times3\times10^9\times850\times32\times30\,000 = 1.47\times10^{19}$ FLOP; $1.47\times10^{19}/4\times10^{14} = 36\,700\,\mathrm s = 10.2$ GPU-hours — a few hours on a node of eight GPUs.
(b) Samples $200\times300 = 60\,000$; sampled $30\,000\times32 = 960\,000$; 16 epochs.
Sanity check: the cost of fine-tuning is tiny next to pretraining (thousands of GPU-days) but large next to the cost of *evaluating* each checkpoint on a real robot, which takes operator hours; plan the evaluation budget first ([[vision-language-action/policy-evaluation]]).
:::
:::

Typical choices, to be tuned for each model and dataset rather than copied:

- **Optimiser and learning rate**: AdamW with a short warm-up and cosine or constant decay; learning rates of order $10^{-5}$ for full fine-tuning of a large backbone, and higher (of order $10^{-4}$) for LoRA adapters or newly initialised heads; sometimes a lower rate for the vision encoder.
- **Batch size and steps**: as large a batch as memory allows (gradient accumulation if needed); tens of thousands of steps; save checkpoints regularly, because the best closed-loop checkpoint is often not the last.
- **Augmentation**: random crops and small colour jitter on images help against overfitting to the exact scene; geometric augmentations that change the relation between image and action (flips) must be applied consistently to the actions or not at all.
- **Exponential moving average** (EMA) of the weights, used by Diffusion Policy and others, gives smoother, often better checkpoints.
- **Normalisation statistics** recomputed on the fine-tuning data for the target embodiment ([[#def-normalisation]]).

## Overfitting and forgetting {#sec-overfit}

Imitation learning on small datasets overfits easily, and the usual signal — validation loss rising while training loss falls — is a weak guide, because the validation loss of a behaviour-cloning policy correlates only loosely with closed-loop success ([[vision-language-action/imitation-learning]]). Diffusion policies in particular often keep improving on the robot after their validation loss has started to rise. Better signs come from the robot:

- **Memorised trajectories**: the arm replays a demonstration's motion regardless of where the object is; test by moving objects outside the demonstrated positions.
- **Ignored instructions**: the policy does the most common task whatever it is told; test by giving instructions for different tasks in the same scene. This is also the signature of **forgetting** of the backbone's language grounding.
- **Brittleness to distractors** and lighting changes that did not appear in fine-tuning but were handled by the base model.
- **Jerky or hesitant motion** late in training, as the model fits noise in the demonstrations.

Remedies are the familiar ones — more varied data, augmentation, fewer steps, lower learning rate, LoRA or partial freezing, co-training with some pretraining data — and the test of a remedy is always a controlled closed-loop evaluation.

::: algorithm A fine-tuning procedure {#alg-finetune}
1. Choose the base model by matching its pretraining action space, cameras and control rate to your robot as closely as possible; read its licence.
2. Convert your demonstrations to the base model's format; set the action space; compute normalisation statistics on your data.
3. Run a short sanity training (a few hundred steps) on a handful of episodes and check that the model can overfit them — this catches format and normalisation bugs.
4. Fine-tune (full or LoRA), saving checkpoints at intervals; optionally mix in a fraction of pretraining or web data.
5. Evaluate several checkpoints closed-loop on a fixed set of initial conditions, including off-distribution object positions and instructions for other tasks.
6. Choose the checkpoint; record base model, data version, statistics, hyperparameters and evaluation results together.
:::

::: history
Fine-tuning a pretrained network for a new task is the founding practice of modern deep learning: ImageNet-pretrained convolutional networks were fine-tuned for detection and segmentation from 2014, and pretrained language models (BERT and GPT, 2018) for downstream language tasks. LoRA (Hu and colleagues, 2021) and QLoRA (Dettmers and colleagues, 2023) made adaptation of billion-parameter models affordable. In robotics, RT-2's co-fine-tuning (2023) showed the value of keeping web data in the mix, Octo and OpenVLA (2024) released base models intended explicitly for fine-tuning by others, including with LoRA, and π0 (2024) made the split between broad pretraining and curated post-training explicit for robot data.
:::

::: summary
- VLA training: VLM pretraining, robot pretraining on a weighted mixture of many embodiments, then post-training on curated target data.
- Mixture weights $w_i\propto n_i^\alpha$ interpolate between proportional and uniform sampling; watch the epochs of small datasets.
- Co-training with web data, lower backbone learning rates, freezing and gradient insulation protect the VLM's knowledge against forgetting.
- Per-embodiment normalisation (mean/std or quantiles), padding and masking, embodiment-specific heads and a common time base let one model learn from many robots. Ship the normalisation statistics with the checkpoint.
- Full fine-tuning with Adam needs about $16P$ bytes; LoRA trains $r(m+k)$ parameters per matrix (about 1% at rank 32 for a 7B model) and merges at zero inference cost.
- Judge overfitting and forgetting on the robot: memorised trajectories, ignored instructions, brittleness.
:::

## Exercises

::: exercise LoRA on one matrix {#exr-lora1 level=1 check="65536"}
How many trainable parameters does a rank-8 LoRA adapter on a $4096\times4096$ matrix have? (Enter the number.)
::: solution
$r(m+k) = 8\times8192 = 65\,536$, i.e. 0.39% of the matrix's $16.8$ million entries.
:::
:::

::: exercise Full fine-tuning memory {#exr-full level=1 check="52.8"}
Using 16 bytes per parameter, how much memory do weights, gradients and Adam state of a 3.3-billion-parameter model need? (Enter it in GB.)
::: solution
$16\times3.3\times10^9 = 52.8\,\mathrm{GB}$, plus activations.
:::
:::

::: exercise Proportional weights {#exr-prop level=1 check="0.25"}
Two datasets of 300 and 100 episodes are mixed with $\alpha = 1$. What is the weight of the smaller? (Enter it as a fraction.)
::: solution
$100/400 = 0.25$.
:::
:::

::: exercise Square-root weighting {#exr-sqrt level=2 check="0.366"}
The same two datasets are mixed with $\alpha = 0.5$. Find the weight of the smaller. (Enter it to three decimal places.)
::: solution
$\sqrt{100}/(\sqrt{300} + \sqrt{100}) = 10/(17.32 + 10) = 0.366$.
:::
:::

::: exercise Un-normalising {#exr-unnorm level=2 check="0.008"}
A gripper-rotation dimension has 1st and 99th percentiles $-0.04$ and $0.08\,\mathrm{rad}$. The model outputs $\bar a = -0.2$. Find the action. (Enter it in rad.)
::: solution
$a = q_{01} + (\bar a + 1)(q_{99} - q_{01})/2 = -0.04 + 0.8\times0.12/2 = -0.04 + 0.048 = 0.008\,\mathrm{rad}$. Note that $\bar a = 0$ maps to the midpoint of the percentile range, $0.02\,\mathrm{rad}$, not to zero motion: with asymmetric statistics a "neutral" output still moves the joint.
:::
:::

::: exercise Epochs of a small dataset {#exr-epochs level=2 check="40"}
A fine-tuning run takes 20,000 steps at batch size 64 from a dataset of 32,000 samples. How many epochs is that? (Enter the number.)
::: solution
$20\,000\times64/32\,000 = 40$ epochs — a lot for 32,000 highly correlated frames; watch for memorisation.
:::
:::

::: exercise Why LoRA saves less compute than memory {#exr-compute level=3}
Explain why LoRA fine-tuning of a 7B model reduces memory by roughly a factor of seven ([[#ex-lora]]) but reduces training FLOP by much less. Estimate the FLOP per token of LoRA training relative to full fine-tuning.
::: solution
Memory falls because gradients and optimiser state are kept only for the adapters. Compute does not fall as much: the forward pass still costs $2P$ per token through the frozen weights, and the backward pass must still propagate activation gradients through every frozen layer to reach the adapters below (about $2P$), though it skips the weight-gradient computation for frozen matrices (the other $2P$). LoRA training therefore costs roughly $4P$ per token against $6P$ — about two-thirds — plus a small amount for the adapters themselves.
:::
:::

::: exercise A fine-tuning plan for a new arm {#exr-plan level=3}
Your company's new 7-DOF arm has joint-space control at 500 Hz, two wrist cameras and one scene camera. You want to fine-tune an open π0-style base model, pretrained mostly on other arms, for five assembly tasks. Write a plan covering the action space, normalisation, data, full versus LoRA fine-tuning, co-training and evaluation.
::: solution
A good plan: (1) Action space — absolute joint targets (7 + gripper) at a policy rate of 50 Hz in chunks of 50, interpolated to 500 Hz; record end-effector poses too. If the base model's mixture contains joint-space 7-DOF arms, match its conventions (ordering, units). (2) Normalisation statistics from your data per dimension; padding to the model's action dimension with masking. (3) Cameras mapped to the model's camera slots (scene and wrist), consistent placement. (4) Data — a few hundred diverse demonstrations per task with recovery data, plus a shared pool across the five tasks; hold out initial conditions for evaluation. (5) Since the embodiment is new, prefer full fine-tuning (or LoRA with high rank plus a fully trained action expert) if compute permits; one multi-task model rather than five. (6) Mix in a fraction of the base model's pretraining data or web data to protect language following, and test instructions for the wrong task. (7) Evaluate checkpoints closed-loop with matched initial conditions and confidence intervals; ship weights, statistics and evaluation together.
:::
:::
